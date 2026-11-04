IOT.reg({
  id: "amqp",
  title: "AMQP · RabbitMQ",
  th: "Message-Oriented Middleware ด้วย AMQP/RabbitMQ: Producer, Exchange (4 ชนิด), Binding, Queue, Durable และการใช้ pika",
  summary: `
<ul>
<li><b>MOM</b> (Message-Oriented Middleware): ผู้ส่ง (Producer) กับผู้รับ (Consumer) คุยผ่านตัวกลางแบบ <b>asynchronous</b> มี <b>Queue</b> เป็น buffer → Consumer ช้า/offline ก็ไม่ทำให้ข้อความหาย และไม่ overload server</li>
<li><b>AMQP</b> = Advanced Message Queuing Protocol · ตัวอย่างซอฟต์แวร์: <b>RabbitMQ</b> · library Python: <b>pika</b> (AMQP 0-9-1)</li>
<li>เส้นทาง: <b>Producer → Exchange → (Binding) → Queue → Consumer</b> · Producer ส่งเข้า <b>Exchange</b> พร้อม <b>Routing Key</b> ไม่ส่งเข้า Queue โดยตรง</li>
<li>Exchange เทียบ Routing Key ของ message กับ <b>Binding Key</b> ที่ผูกกับ Queue → ตรงกันจึงส่งเข้า Queue</li>
</ul>
<table><tr><th>Exchange</th><th>กฎ</th></tr>
<tr><td><b>Direct</b></td><td>routing key = binding key (ตรงเป๊ะ)</td></tr>
<tr><td><b>Fanout</b></td><td>broadcast ทุก Queue ที่ผูก (ไม่สนใจ key)</td></tr>
<tr><td><b>Topic</b></td><td>pattern: <code>*</code> = <b>1 word</b>, <code>#</code> = <b>0 หรือหลาย word</b> (คั่นด้วย .)</td></tr>
<tr><td><b>Headers</b></td><td>ดู header ของ message (ไม่ใช้ routing key) · <code>x-match: all</code> ต้องตรงทุกตัว / <code>any</code> ตรงอย่างน้อย 1</td></tr>
<tr><td>Default</td><td>ไม่มี binding key; ใช้ <b>ชื่อ Queue</b> เป็น routing key</td></tr></table>
<ul>
<li>ตัวอย่าง topic: <code>sports.*</code> ตรง sports.tennis · <code>sports.#</code> ตรง sports, sports.tennis, sports.tennis.final</li>
<li><b>Durable</b> = Exchange/Queue อยู่รอดหลัง RabbitMQ restart · <b>Transient</b> = หายเมื่อ restart · message ต้อง <b>Persistent</b> ด้วยจึงรอด</li>
<li>pika: <code>BlockingConnection()</code> → <code>channel()</code> → <code>exchange_declare()</code> / <code>queue_declare()</code> → <code>basic_publish()</code> (Producer) / <code>basic_consume()</code> (Consumer) → <code>basic_ack()</code> / <code>basic_nack()</code></li>
<li>MQTT = pub/sub ด้วย topic (เบา) · AMQP = Exchange/Queue/Binding (route ละเอียด, buffer ใน queue)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Producer ส่งเข้า Exchange ไม่ใช่ Queue</li><li><code>*</code> = พอดี 1 word · <code>#</code> = 0 หรือมากกว่า</li><li>Fanout ไม่สน routing key</li><li>Durable queue + Persistent message จึงรอด restart</li></ul></div>`,
  sections: [
  { t: "Message-Oriented Middleware", html: `
<h4>Direct communication มีปัญหาอะไร</h4>
<ul><li>A ต้องรู้ที่อยู่ของ B และ B ต้องพร้อมรับในเวลานั้น</li><li>ผู้ส่งต้อง <b>รอ</b> ผู้รับ (synchronous)</li><li>ผู้ส่งจำนวนมาก (client) รุมผู้รับ (server) → server overload</li><li>ผู้รับล่ม = ข้อมูลหาย</li></ul>
<h4>Message-Oriented Middleware (MOM)</h4>
<p>A ส่ง <b>message</b> เข้า middleware แล้วทำงานต่อได้ทันที ส่วน B มารับเมื่อพร้อม</p>
<ul><li>ผู้ส่ง = <b>Producer</b>, ผู้รับ = <b>Consumer</b></li><li>สื่อสารแบบ <b>Asynchronous</b></li><li>มี <b>Queue</b> เป็น buffer เก็บ message ระหว่างรอ</li><li>Consumer ดึงงานตามความสามารถของตัวเอง ช่วย smooth load</li></ul>
<div class="note"><b>💡 หมายเหตุ</b> ข้อดีหลักของ MOM คือ decoupling: Producer กับ Consumer ไม่ต้องออนไลน์พร้อมกันและไม่ต้องรู้จักกัน</div>` },
  { t: "AMQP และองค์ประกอบ", html: `
<h4>AMQP</h4>
<p><b>AMQP</b> (Advanced Message Queuing Protocol) เป็นโปรโตคอลของ MOM สำหรับส่ง message ระหว่าง application แบบ asynchronous โดยมี Queue เก็บ/จัดการ message ตัวอย่าง broker: <b>RabbitMQ</b></p>
<table><tr><th>Component</th><th>หน้าที่</th></tr>
<tr><td>Producer</td><td>แอปที่สร้างและส่ง message เข้า Exchange พร้อม Routing Key</td></tr>
<tr><td>Consumer</td><td>แอปที่รับ message จาก Queue</td></tr>
<tr><td>Broker</td><td>เซิร์ฟเวอร์กลาง (เช่น RabbitMQ) ที่มี Exchange และ Queue</td></tr>
<tr><td>Message</td><td>ข้อมูลที่ส่ง</td></tr>
<tr><td>Exchange</td><td>รับ message จาก Producer แล้วตัดสินใจส่งเข้า Queue ใด</td></tr>
<tr><td>Queue</td><td>ที่พัก message (buffer) รอ Consumer</td></tr>
<tr><td>Routing Key</td><td>"label" ที่ติดกับ message ใช้ตัดสินเส้นทาง</td></tr>
<tr><td>Binding</td><td>การผูก Queue เข้ากับ Exchange พร้อม Binding Key</td></tr></table>
<h4>ลำดับการทำงาน</h4>
<ol><li>Producer ส่ง message เข้า Exchange พร้อม Routing Key</li><li>Exchange เทียบ Routing Key กับ Binding Key ของแต่ละ Binding</li><li>ตรงกัน → ส่งเข้า Queue นั้น</li><li>Consumer ดึง message จาก Queue</li></ol>
<div class="warn"><b>⚠️ ระวัง</b> Producer ไม่ส่งเข้า Queue โดยตรง (ยกเว้นผ่าน Default exchange) และถ้า message ไม่ตรงกับ binding ใดเลย โดย default จะไม่มี Queue ใดได้รับ (message ถูกทิ้ง)</div>` },
  { t: "ชนิดของ Exchange (4 + Default)", html: `
<h4>Direct</h4>
<p>ส่งเข้า Queue ที่ <b>Binding Key = Routing Key</b> ตรงเป๊ะ เช่น key "red" → Queue ที่ bind "red"</p>
<h4>Fanout</h4>
<p><b>Broadcast</b> เข้าทุก Queue ที่ผูกกับ exchange <b>โดยไม่สนใจ routing key</b></p>
<h4>Topic</h4>
<p>Routing key เป็นคำคั่นด้วยจุด (เช่น <code>sensor.room1.temp</code>) Binding key ใช้ wildcard</p>
<ul><li><code>*</code> แทน <b>พอดี 1 word</b></li><li><code>#</code> แทน <b>0 หรือมากกว่า word</b></li></ul>
<table><tr><th>Binding</th><th>Routing key</th><th>ตรงไหม</th></tr>
<tr><td><code>sports.*</code></td><td>sports.tennis</td><td>ตรง</td></tr>
<tr><td><code>sports.*</code></td><td>sports</td><td>ไม่ตรง (ต้องมี 1 word)</td></tr>
<tr><td><code>sports.*</code></td><td>sports.tennis.final</td><td>ไม่ตรง (เกิน 1 word)</td></tr>
<tr><td><code>sports.#</code></td><td>sports</td><td>ตรง (# = 0 word)</td></tr>
<tr><td><code>sports.#</code></td><td>sports.tennis.final</td><td>ตรง</td></tr></table>
<h4>Headers</h4>
<p>ไม่ใช้ routing key ให้ดู <b>header properties</b> ของ message (เช่น genre: fantasy, author: ...) และ binding ระบุ <code>x-match</code></p>
<ul><li><code>x-match: all</code> — ทุก header ที่ระบุต้องตรง</li><li><code>x-match: any</code> — ตรงอย่างน้อย 1 ตัว</li></ul>
<h4>Default exchange</h4>
<p>ไม่ต้อง bind เอง; RabbitMQ ใช้ <b>ชื่อ Queue</b> เป็น routing key โดยอัตโนมัติ (publish ไปที่ exchange "" ด้วย routing key = ชื่อ queue)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Direct = ตรงเป๊ะ · Fanout = ทุก queue · Topic = wildcard (* 1, # 0+) · Headers = ดู header</li><li>x-match all/any</li></ul></div>` },
  { t: "Durable, Transient และ Persistent", html: `
<h4>ตอนสร้าง Exchange / Queue</h4>
<table><tr><th>ตัวเลือก</th><th>ความหมาย</th></tr>
<tr><td><b>Durable</b></td><td>Exchange/Queue ยังอยู่หลัง RabbitMQ restart</td></tr>
<tr><td><b>Transient</b></td><td>หายไปเมื่อ RabbitMQ restart</td></tr>
<tr><td>Auto delete</td><td>ลบอัตโนมัติเมื่อไม่มีใครใช้แล้ว (lab เลือก No)</td></tr>
<tr><td>Internal</td><td>exchange ที่ Producer publish เข้าตรงไม่ได้ (lab เลือก No)</td></tr></table>
<p>Lab: สร้าง Exchange type direct (Durable, Auto delete = No, Internal = No) และ Queue type Classic (Durable)</p>
<div class="warn"><b>⚠️ ระวัง</b> <b>Durable ไม่ได้ทำให้ message ถาวรเอง</b> — ต้องส่ง message แบบ <b>Persistent</b> (delivery_mode = 2) ด้วย มิฉะนั้นเมื่อ restart queue ยังอยู่แต่ message ในนั้นหายไป</div>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Message จะรอด restart ได้ต้อง: Queue durable + Message persistent (และ exchange durable เพื่อให้ binding ยังอยู่)</li></ul></div>` },
  { t: "RabbitMQ Management UI (Lab)", html: `
<h4>ขั้นตอนทดลองใน Management UI</h4>
<ol>
<li><b>Exchanges</b> → Add a new exchange: ตั้งชื่อ, type direct, Durable</li>
<li><b>Queues and Streams</b> → Add a new queue: type Classic, ตั้งชื่อ, Durable</li>
<li>เลือก Queue → <b>Bindings</b>: From exchange = exchange ที่สร้าง, Routing key = เช่น <code>red</code> → Bind</li>
<li>เลือก Exchange → <b>Publish message</b>: ใส่ Routing key และ Payload</li>
<li>เลือก Queue → <b>Get messages</b>: เลือก Ack Mode แล้วดูข้อความ</li>
</ol>
<h4>Ack Mode ตอน Get message</h4>
<ul><li><b>Automatic ack</b> — ดึงแล้วถือว่ารับแล้ว ข้อความถูกลบจาก queue</li><li><b>Nack message requeue true</b> — ดูข้อความแล้วคืนเข้า queue (ข้อความยังอยู่)</li></ul>
<h4>คำถามที่พบในแล็บ</h4>
<ul><li>Publish ด้วย routing key ที่ไม่มี queue ใด bind ไว้ (direct) → ไม่มีใครได้รับ</li><li>Publish ด้วย key เช่น <code>red.*</code> บน direct exchange จะ <b>ไม่</b> ทำงานแบบ pattern (เทียบแบบตรงเป๊ะ) — ต้องใช้ Topic exchange</li></ul>
<div class="note"><b>💡 หมายเหตุ</b> Built-in exchange อย่าง <code>amq.direct</code> ใช้งานได้ทันทีโดยไม่ต้องสร้างเอง (โค้ดตัวอย่างใช้ <code>EXCHANGE_NAME = "amq.direct"</code>)</div>` },
  { t: "Python (pika) และ MQTT vs AMQP", html: `
<h4>pika</h4>
<p>pure-Python implementation ของ AMQP 0-9-1 ใช้กับ RabbitMQ ติดตั้ง <code>sudo apt install python3-pika</code></p>
<table><tr><th>Method</th><th>หน้าที่</th></tr>
<tr><td><code>BlockingConnection()</code></td><td>เชื่อมต่อ RabbitMQ</td></tr>
<tr><td><code>channel()</code></td><td>สร้าง Channel</td></tr>
<tr><td><code>exchange_declare()</code></td><td>สร้าง/ประกาศ Exchange</td></tr>
<tr><td><code>queue_declare()</code></td><td>สร้าง/ประกาศ Queue</td></tr>
<tr><td><code>basic_publish()</code></td><td>Producer ส่ง message</td></tr>
<tr><td><code>basic_consume()</code></td><td>Consumer ลงทะเบียนรับ message</td></tr>
<tr><td><code>basic_ack()</code></td><td>Consumer แจ้งว่าประมวลผลสำเร็จ</td></tr>
<tr><td><code>basic_nack()</code></td><td>Consumer แจ้งว่าไม่สำเร็จ (ขอ requeue/retry ได้)</td></tr></table>
<pre><code>channel.basic_publish(exchange="amq.direct",
                      routing_key="red",   # ต้องตรงกับ binding key ของ queue
                      body=json_payload)</code></pre>
<p>ตัวอย่าง lab: Producer ส่ง JSON เช่น <code>{"machine_id": "M01", "temperature": 94.9, ...}</code>; Consumer แยกตามค่า (เช่น temperature สูง) ไปตัดสินใจ</p>
<h4>MQTT vs AMQP</h4>
<table><tr><th></th><th>MQTT</th><th>AMQP</th></tr>
<tr><td>แนวคิด</td><td>Pub/Sub ด้วย Topic</td><td>Exchange / Queue / Binding</td></tr>
<tr><td>การ route</td><td>topic + wildcard (+, #)</td><td>4 ชนิด exchange (direct/fanout/topic/headers)</td></tr>
<tr><td>จุดเด่น</td><td>เบา ประหยัด bandwidth เหมาะอุปกรณ์เล็ก</td><td>Queue buffer, route ละเอียด, ส่งงานให้ worker</td></tr></table>
<div class="note"><b>💡 หมายเหตุ</b> ถ้า Consumer ใช้ manual ack และ crash ก่อน basic_ack → broker จะนำ message กลับเข้า queue ให้ส่งใหม่ จึงไม่หาย</div>` }
  ],
  ex: [
  { type:"choice", story:`Topic exchange มี 3 queue ผูกด้วย binding key ดังรูป`, fig:`<svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg"><rect class="bx" x="10" y="70" width="90" height="44"/><text class="t" x="55" y="96" text-anchor="middle">Producer</text><rect class="bx hd" x="170" y="70" width="110" height="44"/><text class="t" x="225" y="96" text-anchor="middle">Topic Exchange</text><line class="ln" x1="100" y1="92" x2="170" y2="92"/><line class="ln" x1="280" y1="80" x2="360" y2="30"/><line class="ln" x1="280" y1="92" x2="360" y2="92"/><line class="ln" x1="280" y1="104" x2="360" y2="154"/><rect class="bx" x="360" y="10" width="150" height="40"/><text class="t" x="435" y="34" text-anchor="middle">q1: sensor.*.temp</text><rect class="bx" x="360" y="72" width="150" height="40"/><text class="t" x="435" y="96" text-anchor="middle">q2: sensor.#</text><rect class="bx" x="360" y="134" width="150" height="40"/><text class="t" x="435" y="158" text-anchor="middle">q3: *.room1.*</text></svg>`, q:"Producer publish ด้วย routing key = sensor.temp (2 word) message จะเข้า queue ใดบ้าง?", opts:[
    {t:"q1, q2 และ q3 ทั้งหมด", why:"ผิด q1 และ q3 ต้องมี 3 word แต่ key นี้มี 2 word"},
    {t:"q1 และ q2", why:"ผิด q1 = sensor.&lt;1 word&gt;.temp ต้องมี 3 word จึงไม่ตรงกับ sensor.temp"},
    {t:"ไม่เข้า queue ใดเลย", why:"ผิด q2 (sensor.#) ตรงเพราะ # แทน word ได้ 1 ตัวขึ้นไปหรือ 0"},
    {t:"เฉพาะ q2", why:"ถูก sensor.# ตรงกับ sensor.temp (# = 1 word ที่นี่) ส่วน q1 และ q3 ต้องการ 3 word"}], ans:3 },
  { type:"choice", story:`มี direct exchange ชื่อ <code>alerts</code> และ queue <code>q-red</code> ที่ bind ด้วย routing key <code>red</code> เพียงตัวเดียว Producer publish ไปที่ <code>alerts</code> ด้วย routing key <code>yellow</code>`, q:"ผลลัพธ์คืออะไร?", opts:[
    {t:"message เข้า q-red เพราะเป็น queue เดียวที่ผูกอยู่", why:"ผิด direct ต้อง key ตรงกัน เป๊ะ"},
    {t:"RabbitMQ สร้าง queue ชื่อ yellow ให้อัตโนมัติ", why:"ผิด exchange ไม่สร้าง queue ให้เอง"},
    {t:"ไม่มี queue ใดได้รับ message (unroutable ถูกทิ้ง) ต้องเพิ่ม binding yellow จึงจะได้รับ", why:"ถูก ไม่มี binding key ตรงกับ yellow"},
    {t:"message ค้างอยู่ใน exchange รอจนมี binding ใหม่", why:"ผิด exchange ไม่เก็บ message; เก็บได้เฉพาะ queue"}], ans:2 },
  { type:"choice", story:`โรงงานประกาศ queue <code>jobs</code> เป็น Durable และ exchange เป็น Durable แล้ว Producer ส่ง message เข้าตามปกติ ปรากฏว่าหลัง restart RabbitMQ queue ยังอยู่แต่ message ที่ค้างอยู่ใน queue หายหมด`, q:"สาเหตุที่เป็นไปได้มากที่สุด?", opts:[
    {t:"Queue ชนิด Classic ไม่รองรับ Durable", why:"ผิด Classic รองรับ Durable (ใน lab ก็ตั้ง Durable)"},
    {t:"Message ไม่ได้ถูกส่งแบบ Persistent (delivery_mode = 2)", why:"ถูก Durable รักษาเฉพาะ queue/exchange ส่วน message ต้อง Persistent ด้วย"},
    {t:"Auto delete = No ทำให้ลบ message", why:"ผิด Auto delete เกี่ยวกับการลบ queue เมื่อไม่มีผู้ใช้ ไม่ใช่ message"},
    {t:"ใช้ exchange แบบ direct", why:"ผิด ชนิด exchange ไม่เกี่ยวกับการคงอยู่ของ message"}], ans:1 },
  { type:"choice", story:`Consumer ใช้ <code>basic_consume</code> แบบ manual ack (auto_ack=False) ตัวหนึ่งรับ message จาก queue แล้วเกิด crash ระหว่างประมวลผล <b>ก่อน</b>เรียก <code>basic_ack</code>`, q:"broker จะทำอย่างไรกับ message นั้น?", opts:[
    {t:"นำ message กลับเข้า queue เพื่อส่งให้ consumer ใหม่ เพราะยังไม่ได้ ack", why:"ถูก connection ปิดโดยยังไม่ ack → broker requeue message จึงไม่สูญหาย"},
    {t:"ลบ message ทิ้งเพราะส่งออกไปแล้ว", why:"ผิด นั่นคือพฤติกรรมของ auto ack"},
    {t:"ย้ายไป exchange อื่นอัตโนมัติ", why:"ผิด ไม่มีการย้ายไป exchange อื่น"},
    {t:"ส่ง basic_ack แทน consumer", why:"ผิด ack ต้องมาจาก consumer เท่านั้น"}], ans:0 },
  { type:"choice", story:`ระบบจัดการห้องสมุด publish message ที่มี header <code>genre='fantasy'</code> และ <code>author='Sarah J. Mass'</code> Service หนึ่งต้องการรับเฉพาะหนังสือที่ <b>genre เป็น fantasy และ author ตรงกัน ทั้งสองเงื่อนไข</b> โดยไม่ต้องใช้ routing key`, q:"ควรตั้ง exchange และ binding อย่างไร?", opts:[
    {t:"Fanout exchange แล้ว filter ฝั่ง consumer", why:"ผิด ได้ทุกเรื่อง ต้องมาคัดเองและสิ้นเปลือง"},
    {t:"Direct exchange โดยใช้ routing key = fantasy", why:"ผิด ใช้ได้แค่ key เดียว และไม่ได้ดู author"},
    {t:"Headers exchange โดย binding ระบุ genre และ author พร้อม x-match = all", why:"ถูก headers ใช้ header properties และ all = ต้องตรงทุกตัว"},
    {t:"Headers exchange โดยตั้ง x-match = any", why:"ผิด any ตรงอย่างน้อยหนึ่ง จะรับหนังสือ fantasy ของนักเขียนอื่นด้วย"}], ans:2 },
  { type:"choice", story:`โครงงานมี 2 ส่วน (ก) เซนเซอร์ขนาดเล็กบนแบตเตอรี่ส่งค่าอุณหภูมิผ่าน Wi-Fi ที่สัญญาณไม่เสถียร (ข) backend ในโรงงานรับข้อมูลไปคำนวณ ต้องมีที่พักข้อมูลเมื่อ worker ช้า และต้อง route ข้อมูลตามหลายเงื่อนไขไปยังหลาย service`, q:"การเลือก protocol ใดเหมาะสมที่สุด?", opts:[
    {t:"ใช้ AMQP ทั้งสองส่วน เพราะ feature เยอะที่สุด", why:"ผิด อุปกรณ์เล็กได้ประโยชน์จาก overhead ต่ำของ MQTT"},
    {t:"ใช้ MQTT ทั้งสองส่วน เพราะ header เล็ก", why:"ผิด ฝั่ง backend ต้องการ queue buffer และ routing ละเอียดซึ่ง AMQP เหมาะกว่า"},
    {t:"ใช้ HTTP polling ทั้งสองส่วน", why:"ผิด เปลืองพลังงาน/bandwidth และไม่มี queue/routing ในตัว"},
    {t:"เซนเซอร์ใช้ MQTT ส่งเข้า broker ส่วน backend ใช้ AMQP (RabbitMQ) กระจายงานผ่าน exchange/queue", why:"ถูก MQTT เบาเหมาะ edge ส่วน AMQP มี Queue buffer และ exchange route ตามเงื่อนไข"}], ans:3 },
  { type:"choice", story:`ต้องการส่ง message ไปยัง queue ชื่อ <code>orders</code> อย่างรวดเร็วโดยไม่สร้าง exchange และ binding เอง`, q:"ทำอย่างไรได้?", opts:[
    {t:"Publish ไปที่ exchange ชื่อ fanout โดยใส่ key ใดก็ได้", why:"ผิด ต้องมีการ bind queue เข้ากับ fanout ก่อน"},
    {t:"Publish ไปที่ Default exchange (\"\") โดยใช้ routing key = orders", why:"ถูก Default exchange ใช้ชื่อ queue เป็น routing key"},
    {t:"Publish ไปที่ Headers exchange โดยไม่ใส่ header", why:"ผิด ต้องมี binding และ header ที่ตรง"},
    {t:"Publish ด้วย routing key = # ไปที่ direct exchange", why:"ผิด # ใช้เป็น wildcard ได้เฉพาะ topic exchange"}], ans:1 },
  { type:"multi", story:`ทีมกำลังเลือกชนิด exchange ให้ถูกต้อง`, q:"เลือกทุกข้อที่ถูกต้อง", opts:[
    {t:"Fanout ส่ง message เข้าทุก queue ที่ผูกไว้โดยไม่สนใจ routing key", ok:true, why:"ถูก broadcast"},
    {t:"Direct ส่งเข้า queue ที่ binding key เท่ากับ routing key พอดี", ok:true, why:"ถูก"},
    {t:"Topic ใช้ * แทน 1 word และ # แทน 0 หรือมากกว่า", ok:true, why:"ถูก"},
    {t:"Headers exchange ตัดสินจาก routing key เป็นหลัก", ok:false, why:"ผิด ใช้ header properties แทน routing key"},
    {t:"Producer ต้องส่ง message เข้า queue โดยตรงเสมอ", ok:false, why:"ผิด ส่งเข้า exchange"}] },
  { type:"multi", story:`Queue <code>q-sports</code> ผูกกับ topic exchange ด้วย binding key <code>sports.#</code>`, q:"เลือกทุก routing key ที่ message จะเข้า q-sports", opts:[
    {t:"sports", ok:true, why:"ถูก # แทน 0 word ได้"},
    {t:"sports.tennis", ok:true, why:"ถูก"},
    {t:"sports.tennis.final", ok:true, why:"ถูก # แทนหลาย word"},
    {t:"news.sports", ok:false, why:"ผิด ต้องขึ้นต้นด้วย sports"},
    {t:"sport.tennis", ok:false, why:"ผิด word แรกเป็น sport ไม่ใช่ sports"},
    {t:"tennis.sports.final", ok:false, why:"ผิด word แรกไม่ใช่ sports"}] },
  { type:"blank", story:"", text:`ใน topic exchange สัญลักษณ์ {1} แทน word พอดี 1 ตัว และ {2} แทน 0 หรือมากกว่า word ส่วน exchange ชนิด {3} จะ broadcast ไปทุก queue โดยไม่สน routing key`, blanks:[
    {opts:["#","*","+","?"], ans:1, why:"* = พอดี 1 word"},
    {opts:["*","+","#","."], ans:2, why:"# = 0 หรือมากกว่า"},
    {opts:["direct","headers","topic","fanout"], ans:3, why:"fanout = broadcast"}] },
  { type:"blank", story:`ฝั่ง Producer และ Consumer ด้วย pika`, text:`<pre><code>connection = pika.{1}(params)
channel = connection.channel()
channel.{2}(exchange="amq.direct", routing_key="red", body=msg)   # Producer
channel.{3}(queue="q1", on_message_callback=cb)                   # Consumer</code></pre>`, blanks:[
    {opts:["BlockingConnection","basic_ack","queue_declare","Exchange"], ans:0, why:"เชื่อมต่อด้วย BlockingConnection"},
    {opts:["basic_consume","basic_publish","exchange_declare","basic_nack"], ans:1, why:"Producer ส่งด้วย basic_publish"},
    {opts:["basic_publish","queue_declare","basic_consume","basic_ack"], ans:2, why:"Consumer ลงทะเบียนรับด้วย basic_consume"}] },
  { type:"blank", story:`การคงอยู่ของข้อมูลเมื่อ RabbitMQ restart`, text:`Exchange/Queue แบบ {1} จะอยู่รอดหลัง restart ส่วนแบบ {2} จะหายไป แต่ message จะรอดได้ต้องส่งแบบ {3} ด้วย`, blanks:[
    {opts:["Transient","Durable","Auto delete","Internal"], ans:1, why:"Durable = อยู่รอด"},
    {opts:["Durable","Persistent","Transient","Classic"], ans:2, why:"Transient = หายเมื่อ restart"},
    {opts:["Transient","Auto delete","Internal","Persistent"], ans:3, why:"message ต้อง Persistent"}] },
  { type:"match", q:"จับคู่ Component ของ AMQP กับหน้าที่", pairs:[
    ["Producer","สร้างและส่ง message เข้า Exchange"],
    ["Exchange","เทียบ routing key กับ binding แล้วเลือก queue ปลายทาง"],
    ["Queue","buffer เก็บ message รอ Consumer"],
    ["Binding","การผูก queue กับ exchange พร้อม binding key"],
    ["Consumer","รับ message จาก queue แล้ว ack/nack"]], why:"เส้นทางคือ Producer → Exchange → (Binding) → Queue → Consumer; Exchange ไม่เก็บ message ส่วน Queue เป็นผู้เก็บ" }
  ]
});
