IOT.reg({
  id: "mqtt",
  title: "MQTT",
  th: "โปรโตคอล publish/subscribe น้ำหนักเบาสำหรับ IoT: Topic, QoS 0/1/2, Retain, LWT, Session, Keep Alive และการใช้ paho-mqtt",
  summary: `
<ul>
<li><b>MQTT</b> = Message Queuing Telemetry Transport · คิดค้นโดย Andy Stanford-Clark (IBM) + Arlen Nipper (Eurotech) ปี <b>1999</b> · ออกแบบแรกเริ่มสำหรับ link ผ่านดาวเทียมของ oil pipeline (SCADA)</li>
<li>รูปแบบ <b>Publish/Subscribe</b> ผ่าน <b>Broker</b> · สื่อสารสองทางแบบ asynchronous "push" · ใช้ <b>persistent TCP connection</b> · header ขั้นต่ำ <b>2 bytes</b> (overhead ต่ำ ประหยัด bandwidth)</li>
<li><b>Topic</b> = UTF-8 string แบ่งระดับด้วย <code>/</code> · wildcard: <code>+</code> = 1 ระดับ, <code>#</code> = หลายระดับ (ท้ายสุด)</li>
<li>Payload = array of bytes (data-agnostic: string, JSON, XML, binary, รูป ฯลฯ)</li>
<li>Fields: Topic, QoS, Retain flag, Payload, DUP flag, Packet Identifier (DUP/Packet ID ใช้เมื่อ QoS &gt; 0 เท่านั้น)</li>
</ul>
<table><tr><th>QoS</th><th>ความหมาย</th><th>Packet</th><th>ลักษณะ</th></tr>
<tr><td>0</td><td>At most once</td><td>PUBLISH</td><td>เร็วสุด ไม่ ack อาจหาย</td></tr>
<tr><td>1</td><td>At least once</td><td>PUBLISH → PUBACK</td><td>ถึงอย่างน้อย 1 ครั้ง อาจซ้ำ</td></tr>
<tr><td>2</td><td>Exactly once</td><td>PUBLISH → PUBREC → PUBREL → PUBCOMP</td><td>ช้าสุด ปลอดภัยสุด ไม่ซ้ำ</td></tr></table>
<ul>
<li><b>Effective QoS = min(Publish QoS, Subscribe QoS)</b></li>
<li><b>Retain</b>: broker เก็บ message ล่าสุดของ topic (last known good) ส่งให้ subscriber ใหม่ทันทีหลัง subscribe</li>
<li><b>LWT</b> (Last Will and Testament): client ตั้งไว้ตอน connect; broker publish ให้เมื่อ client หลุดแบบไม่ปกติ (network ขาด, crash, keep-alive timeout)</li>
<li><b>Session</b> (MQTT v5): Client ID คงที่ + <code>clean_start=False</code> + Session Expiry Interval → broker เก็บ subscription/message ระหว่าง offline</li>
<li><b>Keep Alive</b>: client ต้องส่ง packet อย่างน้อยทุกช่วง Keep Alive (ไม่มีข้อมูลก็ส่ง PINGREQ ↔ PINGRESP) · broker ตัดการเชื่อมต่อถ้าเงียบเกิน <b>1.5 × Keep Alive</b> แล้ว trigger LWT</li>
<li>พอร์ต (lab): MQTT <b>1883</b> · WebSocket <b>8884</b> (MQTT over WebSocket ใช้กับเบราว์เซอร์) · library: <code>paho-mqtt</code></li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>ลำดับ QoS 2: PUBLISH → PUBREC → PUBREL → PUBCOMP (4 packet)</li><li>QoS 1 ack = PUBACK</li><li>Timeout ของ broker = 1.5 × Keep Alive</li><li>Effective QoS = min(pub, sub)</li></ul></div>`,
  sections: [
  { t: "ภาพรวมและ Publish/Subscribe", html: `
<h4>MQTT คืออะไร</h4>
<p><b>MQTT</b> (Message Queuing Telemetry Transport) เป็น IoT protocol ที่ถูกคิดค้นโดย Andy Stanford-Clark (IBM) และ Arlen Nipper (Eurotech) ปี 1999 เดิมออกแบบสำหรับการสื่อสารผ่านดาวเทียมของท่อส่งน้ำมัน (ระบบ SCADA) ซึ่ง bandwidth น้อยและไม่เสถียร</p>
<h4>เหตุที่เหมาะกับ IoT</h4>
<ul><li>Header ขั้นต่ำเพียง <b>2 bytes</b> → overhead ต่ำ ประหยัด bandwidth และพลังงาน</li><li>ใช้ <b>persistent TCP connection</b> ระหว่าง client กับ broker ไม่ต้องเปิด-ปิดซ้ำทุกข้อความ</li><li>Header = ข้อมูลควบคุมของ packet, Overhead = ส่วนที่ไม่ใช่ payload (header+trailer)</li></ul>
<h4>Publish/Subscribe</h4>
<p>ผู้ส่ง (<b>Publisher</b>) กับผู้รับ (<b>Subscriber</b>) <b>ไม่รู้จักกันโดยตรง</b> ทุกอย่างผ่าน <b>Broker</b> Publisher ส่งข้อความไปที่ topic; Subscriber ที่ subscribe topic นั้นจะได้รับ เป็นการสื่อสารสองทิศทางแบบ asynchronous push</p>
<table><tr><th>บทบาท</th><th>หน้าที่</th></tr>
<tr><td>Publisher</td><td>ส่ง message ไปยัง topic</td></tr>
<tr><td>Subscriber</td><td>subscribe topic ที่สนใจ แล้วรับ message</td></tr>
<tr><td>Broker</td><td>รับ message กรองตาม topic แล้วส่งต่อให้ subscriber, เก็บ retained/session</td></tr></table>
<div class="note"><b>💡 หมายเหตุ</b> client เดียวเป็นได้ทั้ง publisher และ subscriber — เช่น Raspberry Pi รับคำสั่งเปิด LED และ publish สถานะกลับ</div>` },
  { t: "Topic, Wildcard และโครงสร้าง Message", html: `
<h4>Topic</h4>
<p>Topic คือ UTF-8 string ที่ broker ใช้กรอง message ให้ client แต่ละราย ประกอบด้วยหนึ่งระดับขึ้นไป คั่นด้วย <code>/</code> เช่น <code>home/livingroom/temperature</code></p>
<h4>Wildcard (เฉพาะตอน subscribe)</h4>
<table><tr><th>สัญลักษณ์</th><th>ความหมาย</th><th>ตัวอย่าง <code>home/+/temp</code> / <code>home/#</code></th></tr>
<tr><td><code>+</code></td><td>แทน <b>1 ระดับ</b></td><td><code>home/+/temp</code> ตรง <code>home/kitchen/temp</code> แต่ไม่ตรง <code>home/kitchen/oven/temp</code></td></tr>
<tr><td><code>#</code></td><td>แทน <b>หลายระดับ</b> ใช้ท้าย topic เท่านั้น</td><td><code>home/#</code> ตรงทุก topic ที่ขึ้นต้น home/</td></tr></table>
<h4>องค์ประกอบของ message</h4>
<ul><li><b>Topic</b> — ปลายทางเชิงตรรกะ</li><li><b>QoS</b> — ระดับการรับประกัน 0/1/2</li><li><b>Retain flag</b> — ให้ broker เก็บค่าล่าสุด</li><li><b>Payload</b> — เนื้อหา (array of bytes, data-agnostic: string/JSON/XML/binary)</li><li><b>DUP flag</b> — บอกว่าเป็นข้อความส่งซ้ำเพราะไม่ได้รับ ack (เฉพาะ QoS &gt; 0)</li><li><b>Packet Identifier</b> — ID ใช้จับคู่ flow ของข้อความ (เฉพาะ QoS &gt; 0)</li></ul>
<div class="warn"><b>⚠️ ระวัง</b> Wildcard ใช้ตอน <b>subscribe</b> เท่านั้น — publish ต้องระบุ topic ชัดเจน และ MQTT ไม่สนใจรูปแบบ payload ผู้ส่ง/ผู้รับต้องตกลงกันเอง</div>` },
  { t: "QoS 0 / 1 / 2", html: `
<h4>เปรียบเทียบ</h4>
<table><tr><th>QoS</th><th>ชื่อ</th><th>Flow</th><th>ข้อดี</th><th>ข้อเสีย</th></tr>
<tr><td>0</td><td>At most once</td><td>ส่ง PUBLISH ครั้งเดียว ไม่มี ack ผู้ส่งไม่เก็บ/ไม่ส่งซ้ำ</td><td>latency ต่ำสุด overhead ต่ำสุด</td><td>อาจสูญหาย</td></tr>
<tr><td>1</td><td>At least once</td><td>PUBLISH → <b>PUBACK</b>; ผู้ส่งเก็บข้อความไว้จนได้ ack ถ้าไม่ได้จะส่งซ้ำ (DUP)</td><td>ไม่หาย</td><td>อาจ <b>ซ้ำ</b></td></tr>
<tr><td>2</td><td>Exactly once</td><td>PUBLISH → <b>PUBREC</b> → <b>PUBREL</b> → <b>PUBCOMP</b> (4-way)</td><td>ไม่หาย ไม่ซ้ำ</td><td>latency และ network overhead สูงสุด</td></tr></table>
<ul><li>PUBACK = Publish Acknowledgement · PUBREC = Publish Received · PUBREL = Publish Release · PUBCOMP = Publish Complete</li></ul>
<h4>Effective QoS</h4>
<p>QoS ที่ได้จริงระหว่าง broker กับ subscriber = <b>min(Publish QoS, Subscribe QoS)</b> เช่น publish QoS 2 แต่ subscribe QoS 1 → ส่งถึง subscriber ด้วย QoS 1 (ขาที่ publisher→broker ยังเป็น QoS 2)</p>
<h4>เลือกใช้อย่างไร</h4>
<ul><li>ค่าเซนเซอร์ส่งถี่ สูญเสียบ้างไม่เป็นไร → QoS 0</li><li>ต้องไม่ตกหล่นและซ้ำได้ (idempotent) → QoS 1</li><li>ซ้ำไม่ได้ (เช่น คำสั่งที่มีผลซ้ำ/การนับเงิน) → QoS 2</li></ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>QoS 1 → PUBACK; QoS 2 → PUBREC, PUBREL, PUBCOMP</li><li>QoS สูง = เชื่อถือได้ขึ้น แต่ช้าและกิน bandwidth มากขึ้น</li></ul></div>` },
  { t: "Retain Message", html: `
<h4>หลักการ</h4>
<p>เมื่อ publish ด้วย <b>retain flag</b> broker จะเก็บ message ล่าสุดของ topic นั้นไว้ (last known good value) และเมื่อมี subscriber <b>ใหม่</b> subscribe topic นั้น จะได้รับ retained message ทันทีโดยไม่ต้องรอรอบ publish ถัดไป</p>
<h4>ใช้เมื่อใด</h4>
<ul><li>ค่าสถานะที่เปลี่ยนไม่บ่อย: online/offline, สถานะสวิตช์, ค่าตั้ง</li><li>dashboard ที่เพิ่งเปิดต้องแสดงค่าล่าสุดทันที</li></ul>
<h4>ข้อควรรู้</h4>
<ul><li>broker เก็บเพียง <b>1 message ล่าสุด</b>ต่อ topic</li><li>ใช้คู่กับ LWT ได้: LWT ตั้ง retain=True เพื่อให้ subscriber ที่มาทีหลังเห็นสถานะ offline</li></ul>
<div class="note"><b>💡 หมายเหตุ</b> Retain ไม่ใช่ Session — Retain คือค่าล่าสุดของ <i>topic</i> (ใช้กับ subscriber ใหม่ทุกคน) ส่วน Session คือสิ่งที่ broker เก็บให้ <i>client รายหนึ่ง</i> ขณะ offline</div>` },
  { t: "Last Will and Testament (LWT)", html: `
<h4>แนวคิด</h4>
<p>LWT คือ "พินัยกรรม" ที่ client ลงทะเบียนกับ broker ตอน connect (ระบุ will topic, payload, QoS, retain) เมื่อ client หายไปแบบไม่ปกติ broker จะ <b>publish</b> will นั้นแทน เพื่อให้ผู้อื่นรู้ว่าอุปกรณ์ล่ม</p>
<h4>เมื่อไรจึงเกิด LWT</h4>
<ul><li>network หลุด/ถอดสาย/ไฟดับ</li><li>client crash</li><li>keep-alive timeout (broker ไม่ได้ยินเกิน 1.5 × Keep Alive)</li><li><b>ไม่เกิด</b> เมื่อ client เรียก DISCONNECT ตามปกติ</li></ul>
<h4>โค้ด paho</h4>
<pre><code>mqttc.will_set("test/status", payload="offline", qos=1, retain=True)
mqttc.connect("mqtt-dashboard.com", 1883)</code></pre>
<p>ต้องเรียก <code>will_set</code> <b>ก่อน</b> connect เพราะ will ถูกส่งไปกับ CONNECT packet</p>
<h4>รูปแบบที่นิยม</h4>
<p>ตอน online client publish "online" (retain) ที่ status topic เดียวกัน; will เป็น "offline" (retain) → subscriber ใหม่เห็นสถานะปัจจุบันเสมอ</p>
<div class="warn"><b>⚠️ ระวัง</b> LWT ไม่ได้ส่งโดยตัว client (มันตายแล้ว) แต่ส่งโดย <b>broker</b></div>` },
  { t: "Session Management และ Keep Alive", html: `
<h4>Session (Stateful connection)</h4>
<ul><li>broker จำ session ของ client ได้ → ถ้า client offline ชั่วคราว (Wi-Fi/Internet หลุด) ข้อความที่ subscribe ไว้ (QoS ≥ 1) จะถูกเก็บและส่งให้เมื่อกลับมา</li><li>ฟีเจอร์ session ที่ครบอยู่ใน MQTT <b>v5</b></li><li>เงื่อนไข: <b>Client ID คงเดิม</b> · <code>clean_start=False</code> (default คือ True = เริ่ม session ใหม่ทุกครั้ง) · ตั้ง <b>Session Expiry Interval</b> ว่า broker เก็บ session นานเท่าใดหลัง disconnect</li></ul>
<pre><code>mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2,
                    client_id="panwit-sub", protocol=mqtt.MQTTv5)
properties = mqtt.Properties(mqtt.PacketTypes.CONNECT)
properties.SessionExpiryInterval = 3600
mqttc.connect("mqtt-dashboard.com", 1883,
              clean_start=False, properties=properties)
mqttc.subscribe("test/pub", qos=1)</code></pre>
<h4>Keep Alive</h4>
<ul><li>Client บอก broker ว่าจะส่ง packet อย่างน้อยทุก Keep Alive วินาที เช่น 60 s</li><li>ถ้าไม่มีข้อมูลต้องส่ง (PUBLISH/SUBSCRIBE/PUBACK ฯลฯ) client ส่ง <b>PINGREQ</b> และ broker ตอบ <b>PINGRESP</b></li><li>broker ไม่ได้รับ packet ใดเกิน <b>1.5 × Keep Alive</b> → ถือว่า client ตาย ตัด connection และ trigger LWT</li><li>ตัวอย่าง: Keep Alive = 60 s → ตรวจพบเมื่อเงียบเกิน 90 s</li></ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Session ต้องการ Client ID เดิม + clean_start=False + Session Expiry</li><li>PINGREQ/PINGRESP รักษา connection · timeout = 1.5 × Keep Alive</li></ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ถ้า Session Expiry สั้นกว่าเวลาที่ offline broker จะลบ session ไปแล้ว ข้อความที่เกิดระหว่างนั้นจะไม่ถูกเก็บให้</div>` },
  { t: "Lab: paho-mqtt, Broker และ MQTT over WebSocket", html: `
<h4>paho-mqtt บน Raspberry Pi</h4>
<pre><code>sudo apt install python3-paho-mqtt

# publisher
mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.connect("mqtt-dashboard.com", 1883)
mqttc.publish("test/pub", "Hello", qos=1)

# subscriber
def on_message(client, userdata, msg):
    print(msg.topic, msg.payload.decode(), msg.qos, msg.retain)
mqttc.on_message = on_message
mqttc.subscribe("test/pub", qos=1)
mqttc.loop_forever()</code></pre>
<ul><li><code>msg.payload</code> เป็น bytes ต้อง <code>.decode()</code> เป็น string</li><li><code>loop_forever()</code> ทำให้โปรแกรม subscriber รันค้างเพื่อรอรับ message</li><li>เบราว์เซอร์ทดสอบ: HiveMQ websocket client</li></ul>
<h4>Port</h4>
<table><tr><th>บริการ</th><th>Port</th></tr><tr><td>MQTT (TCP)</td><td>1883</td></tr><tr><td>MQTT over WebSocket (lab)</td><td>8884</td></tr></table>
<h4>MQTT over WebSocket</h4>
<p>เบราว์เซอร์ไม่เปิด TCP socket ดิบ จึงต่อ broker ผ่าน WebSocket (สองทาง, real-time) แล้วส่ง MQTT ผ่านมัน — ตัวอย่างหน้า <code>control_rev1.html</code> กำหนด <code>MQTTbroker</code>, <code>MQTTport = 8884</code>, topic แล้วปุ่ม ON/OFF และ slider จะ publish ไปควบคุม LED บน Raspi ที่ subscribe topic เดียวกัน</p>
<div class="note"><b>💡 หมายเหตุ</b> broker ต้องเปิดรองรับ WebSocket ด้วย จึงจะควบคุมจากหน้าเว็บได้</div>` }
  ],
  ex: [
  { type:"choice", story:`ระบบจ่ายยาอัตโนมัติรับคำสั่งทาง MQTT "จ่ายยา 1 โดส" หากคำสั่งเดียวกันถูกส่งถึงอุปกรณ์สองครั้งจะเป็นอันตราย แต่ก็ห้ามสูญหายเช่นกัน`, q:"ควรเลือก QoS ใดสำหรับคำสั่งนี้?", opts:[
    {t:"QoS 0 เพราะเร็วและ overhead ต่ำที่สุด", why:"ผิด อาจสูญหายโดยไม่มีใครรู้"},
    {t:"QoS 1 เพราะมี PUBACK ยืนยัน", why:"ผิด QoS 1 รับประกันอย่างน้อย 1 ครั้ง อาจส่งซ้ำ (DUP) ถ้า ack หาย"},
    {t:"QoS 2 เพราะ exactly once ไม่หายและไม่ซ้ำ", why:"ถูก flow PUBLISH→PUBREC→PUBREL→PUBCOMP ป้องกันการซ้ำ แลกกับ latency สูงขึ้น"},
    {t:"QoS 0 แล้วให้ publisher ส่งซ้ำ 3 ครั้งเพื่อความมั่นใจ", why:"ผิด ทำให้ซ้ำได้โดยไม่มีกลไกควบคุม"}], ans:2 },
  { type:"choice", story:`Publisher ส่งค่าด้วย <code>qos=2</code> ไปยัง topic <code>plant/line1/temp</code> ส่วน Subscriber ตัวหนึ่งเรียก <code>subscribe("plant/line1/temp", qos=0)</code>`, q:"ข้อความที่ broker ส่งไปยัง Subscriber ตัวนี้จะเป็นอย่างไร?", opts:[
    {t:"QoS 2 เพราะใช้ QoS ของ publisher", why:"ผิด ขา broker→subscriber ถูกจำกัดโดย QoS ที่ subscribe"},
    {t:"QoS 0 ส่งครั้งเดียวไม่มี ack จึงอาจสูญหายที่ขาสุดท้าย", why:"ถูก effective QoS = min(2,0) = 0"},
    {t:"QoS 1 เพราะ broker เลือกค่ากลาง", why:"ผิด ไม่มีการเลือกค่ากลาง ใช้ค่าต่ำสุดของสองฝั่ง"},
    {t:"broker ปฏิเสธเพราะ QoS ไม่ตรงกัน", why:"ผิด MQTT อนุญาตให้ QoS ต่างกันได้"}], ans:1 },
  { type:"choice", story:`Sensor node ตั้ง Keep Alive = 30 วินาที และส่ง packet ล่าสุดที่ t = 0 จากนั้นไฟดับทันที`, q:"อย่างช้าที่สุด broker จะถือว่า client ตายและ publish LWT ที่เวลาใด (โดยประมาณ)?", opts:[
    {t:"ทันทีที่ t = 0", why:"ผิด broker ไม่รู้ว่าไฟดับ จนกว่าจะหมดเวลารอ"},
    {t:"t = 30 s", why:"ผิด 30 s คือช่วง Keep Alive ที่ client ควรส่ง ไม่ใช่เวลาตัดสินของ broker"},
    {t:"t = 60 s", why:"ผิด เป็น 2 × Keep Alive ซึ่งไม่ใช่ค่ามาตรฐาน"},
    {t:"t = 45 s", why:"ถูก timeout = 1.5 × 30 = 45 วินาที"}], ans:3 },
  { type:"choice", story:`Dashboard แสดงสถานะประตู (open/closed) ซึ่งเปลี่ยนเพียงไม่กี่ครั้งต่อวัน ผู้ใช้เปิดหน้าเว็บใหม่แล้วเห็นช่อง "สถานะ" ว่างเปล่าจนกว่าประตูจะเปลี่ยนสถานะครั้งถัดไป อุปกรณ์ publish ที่ topic <code>door/status</code> ด้วย retain=False`, q:"แก้อย่างไรให้ dashboard ที่เพิ่งเปิดเห็นสถานะล่าสุดทันที?", opts:[
    {t:"เพิ่ม Keep Alive ของ dashboard", why:"ผิด Keep Alive เกี่ยวกับการตรวจ connection ไม่ใช่ข้อมูลเก่า"},
    {t:"เปลี่ยน publish เป็น retain=True", why:"ถูก broker เก็บค่าล่าสุดของ topic และส่งให้ subscriber ใหม่ทันทีหลัง subscribe"},
    {t:"เปลี่ยนเป็น QoS 0", why:"ผิด QoS ไม่ทำให้ subscriber ใหม่ได้ข้อมูลที่ publish ไปก่อนหน้า"},
    {t:"ให้ dashboard ตั้ง clean_start=True", why:"ผิด ไม่ทำให้เห็นค่าที่ผ่านมา"}], ans:1 },
  { type:"choice", story:`Subscriber เชื่อมต่อด้วยโค้ด:<pre><code>client_id="meter-01", protocol=mqtt.MQTTv5
properties.SessionExpiryInterval = 300
mqttc.connect(host, 1883, clean_start=False, properties=properties)
mqttc.subscribe("meter/data", qos=1)</code></pre>Subscriber offline 10 นาทีแล้วกลับมา connect ด้วย Client ID เดิม ระหว่างนั้น publisher ส่งด้วย QoS 1 ตลอด`, q:"จะเกิดอะไรขึ้นกับข้อความช่วงที่ offline?", opts:[
    {t:"ได้รับครบทุกข้อความ เพราะ clean_start=False", why:"ผิด session หมดอายุไปแล้ว (300 s &lt; 600 s)"},
    {t:"ได้รับเฉพาะข้อความ 5 นาทีสุดท้าย", why:"ผิด session ถูกลบทั้งชุด ไม่ได้เก็บแบบเลื่อนช่วงเวลา"},
    {t:"ไม่ได้รับข้อความที่ค้างไว้ เพราะ broker ลบ session หลังหมด Session Expiry (5 นาที)", why:"ถูก offline 10 นาที &gt; 5 นาที session ถูกลบ ข้อความค้างหายไป ต้องเพิ่ม Session Expiry Interval"},
    {t:"ได้รับครบเพราะ QoS 1 เก็บถาวร", why:"ผิด QoS 1 ไม่ได้เก็บข้ามการหมดอายุของ session"}], ans:2 },
  { type:"choice", story:`ระบบบ้านอัจฉริยะ publish ที่ topic:<br><code>home/kitchen/temp</code>, <code>home/kitchen/oven/temp</code>, <code>home/temp</code>, <code>home/bedroom/temp</code><br>Subscriber ใช้ <code>subscribe("home/+/temp")</code>`, q:"Subscriber จะได้รับข้อความจาก topic ใดบ้าง?", opts:[
    {t:"ทั้ง 4 topic", why:"ผิด + แทนได้แค่ 1 ระดับ จึงไม่ครอบคลุม home/temp และ home/kitchen/oven/temp"},
    {t:"home/kitchen/temp และ home/bedroom/temp", why:"ถูก ตรงรูปแบบ home/&lt;1 ระดับ&gt;/temp เท่านั้น"},
    {t:"home/kitchen/temp, home/kitchen/oven/temp, home/bedroom/temp", why:"ผิด oven/temp มี 2 ระดับระหว่าง home กับ temp ต้องใช้ #"},
    {t:"home/temp เท่านั้น", why:"ผิด home/temp ไม่มีระดับตรงกลางให้ + จับ"}], ans:1 },
  { type:"choice", story:`Publisher ตั้ง LWT ที่ <code>test/status</code> = "offline" (qos=1, retain=True) ตอน connect ปกติจะ publish "online" ที่ topic เดียวกัน เวลา 10:00 ไฟดับจนกระทั่ง broker ตรวจพบ keep-alive timeout จากนั้นเวลา 10:30 มี Subscriber ใหม่ subscribe <code>test/status</code>`, q:"Subscriber ใหม่จะเห็นอะไรเมื่อ subscribe?", opts:[
    {t:"ไม่ได้รับอะไร เพราะ LWT ส่งไปแล้วก่อนที่จะ subscribe", why:"ผิด retain=True ทำให้ broker เก็บ will ไว้ให้ subscriber ใหม่"},
    {t:"\"online\" เพราะเป็นค่าที่ retain ก่อนหน้า", why:"ผิด will (offline) ถูก publish ภายหลัง จึงแทนที่ค่า retained เดิม"},
    {t:"error เพราะ client ที่เป็นเจ้าของ will ไม่ได้เชื่อมต่อ", why:"ผิด broker เป็นผู้ publish will จึงไม่ต้องรอ client"},
    {t:"\"offline\" ทันทีหลัง subscribe", why:"ถูก will ถูก publish แบบ retain โดย broker เมื่อ client หลุด และถูกส่งให้ subscriber ใหม่ทันที"}], ans:3 },
  { type:"multi", story:`อุปกรณ์ตั้ง LWT ไว้ตอน connect ไปยัง broker`, q:"เลือกทุกเหตุการณ์ที่ทำให้ broker publish LWT", opts:[
    {t:"ถอดสายเครือข่ายของอุปกรณ์ โดย client ไม่ได้ส่ง DISCONNECT", ok:true, why:"ถูก connection ขาดโดยไม่ปกติ"},
    {t:"โปรแกรมบนอุปกรณ์ crash", ok:true, why:"ถูก ไม่มี DISCONNECT และ keep-alive หมดเวลา"},
    {t:"broker ไม่ได้รับ packet ใดๆ เกิน 1.5 × Keep Alive", ok:true, why:"ถูก keep-alive timeout trigger LWT"},
    {t:"client เรียก disconnect() ตามปกติ", ok:false, why:"ผิด การปิดแบบปกติไม่ส่ง will"},
    {t:"มี subscriber ใหม่เข้ามา subscribe topic ของอุปกรณ์", ok:false, why:"ผิด ไม่เกี่ยวกับสถานะของ client ที่ตั้ง will"}] },
  { type:"multi", story:`ทีมกำลังประเมินคุณสมบัติของ MQTT`, q:"เลือกทุกข้อที่ถูกต้อง", opts:[
    {t:"Header ขั้นต่ำ 2 bytes และใช้ persistent TCP connection ระหว่าง client กับ broker", ok:true, why:"ถูก ทำให้ overhead ต่ำ"},
    {t:"Payload เป็น array of bytes จึงส่ง JSON หรือไฟล์รูปก็ได้", ok:true, why:"ถูก data-agnostic"},
    {t:"DUP flag และ Packet Identifier ใช้เมื่อ QoS มากกว่า 0", ok:true, why:"ถูก QoS 0 ไม่มี ack จึงไม่ต้องมี"},
    {t:"QoS 1 รับประกันว่าข้อความถึงผู้รับ \"พอดีหนึ่งครั้ง\"", ok:false, why:"ผิด QoS 1 = at least once อาจซ้ำ"},
    {t:"Publisher ต้องรู้ IP ของ Subscriber เพื่อส่งข้อความตรง", ok:false, why:"ผิด สื่อสารผ่าน broker โดยใช้ topic"}] },
  { type:"blank", story:"", text:`QoS 1 ใช้ {1} เป็น acknowledgement ส่วน QoS 2 ใช้ลำดับ PUBLISH → {2} → PUBREL → {3} และ QoS ที่ได้จริงระหว่าง broker กับ subscriber เท่ากับ {4} ของ publish QoS และ subscribe QoS`, blanks:[
    {opts:["PINGREQ","PUBACK","PUBCOMP","CONNACK"], ans:1, why:"QoS 1: PUBLISH → PUBACK"},
    {opts:["PUBACK","PUBREC","SUBACK","PINGRESP"], ans:1, why:"PUBREC = Publish Received"},
    {opts:["PUBCOMP","PUBACK","UNSUBACK","DISCONNECT"], ans:0, why:"PUBCOMP = Publish Complete ปิด flow"},
    {opts:["ค่าสูงสุด (max)","ค่าต่ำสุด (min)","ค่าเฉลี่ย","ผลรวม"], ans:1, why:"Effective QoS = min"}] },
  { type:"blank", story:`Keep Alive ของ client ตั้งไว้ 60 วินาที`, text:`ถ้าไม่มีข้อมูลให้ส่ง client จะส่ง {1} และ broker ตอบ {2}; ถ้า broker เงียบเกิน {3} วินาที จะตัดการเชื่อมต่อและ trigger LWT`, blanks:[
    {opts:["PINGREQ","PUBREL","CONNECT","SUBSCRIBE"], ans:0, why:"ping ด้วย PINGREQ"},
    {opts:["PUBACK","PINGRESP","CONNACK","PUBCOMP"], ans:1, why:"ตอบด้วย PINGRESP"},
    {opts:["60","120","90","180"], ans:2, why:"1.5 × 60 = 90 วินาที"}] },
  { type:"blank", story:`เติมโค้ด paho-mqtt ให้ได้ทั้ง Last Will และ Persistent Session`, text:`<pre><code>mqttc.will_set("test/status", payload="offline", qos=1, {1}=True)
properties.{2} = 3600
mqttc.connect("mqtt-dashboard.com", 1883, {3}=False, properties=properties)</code></pre>`, blanks:[
    {opts:["dup","retain","keepalive","topic"], ans:1, why:"retain=True ทำให้ broker เก็บ will ไว้ให้ subscriber ใหม่"},
    {opts:["SessionExpiryInterval","KeepAlive","PacketIdentifier","WillDelay"], ans:0, why:"กำหนดเวลาที่ broker เก็บ session"},
    {opts:["retain","clean_start","qos","protocol"], ans:1, why:"clean_start=False เพื่อให้ใช้ session เดิมต่อ"}] },
  { type:"match", q:"จับคู่ Packet / กลไกกับหน้าที่", pairs:[
    ["PUBACK","ยืนยันรับข้อความใน QoS 1"],
    ["PUBREL","ผู้ส่งอนุญาตปล่อยข้อความใน QoS 2 (ขั้นที่ 3)"],
    ["PINGREQ","client ถามเพื่อคง connection เมื่อไม่มีข้อมูลส่ง"],
    ["LWT","broker publish ข้อความที่ลงทะเบียนไว้เมื่อ client หลุดไม่ปกติ"],
    ["Retain flag","broker เก็บค่าล่าสุดของ topic ส่งให้ subscriber ใหม่"]], why:"PUBACK = ack ของ QoS 1; PUBREL คือขั้นที่ 3 ของ QoS 2 (หลัง PUBREC ก่อน PUBCOMP); PINGREQ/PINGRESP รักษา connection ภายใต้ Keep Alive; LWT ถูกส่งโดย broker; Retain ให้ subscriber ใหม่เห็นค่าล่าสุด" }
  ]
});
