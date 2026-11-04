IOT.reg({
  id: "coap",
  title: "CoAP",
  th: "โปรโตคอล RESTful บน UDP สำหรับอุปกรณ์ IoT ทรัพยากรจำกัด (Method, Observe, Response code, aiocoap, coap-simple)",
  summary: `
<ul>
<li><b>CoAP</b> = Constrained Application Protocol · <b>RFC 7252</b> (IETF) · ออกแบบสำหรับ M2M / อุปกรณ์ low-power low-memory (Arduino, ESP8266, ESP32) · ทำงานบน <b>UDP</b> (IPv4/IPv6) · พอร์ตมาตรฐาน <b>5683</b></li>
<li>โมเดล <b>Client–Server แบบ Request/Response</b> (คล้าย HTTP, ไม่มี broker เหมือน MQTT) · Server เก็บ <b>Resource</b> ระบุด้วย URI เช่น <code>coap://192.168.1.10/led</code> · ผ่าน proxy แปลงกับ HTTP ได้</li>
<li>Client = ผู้ส่ง request (เช่น Raspberry Pi) · Server = อุปกรณ์ sensor/actuator ที่ถือ resource (บทเรียนนี้ Server คือ ESP/Pi ที่ต่อ LED/sensor)</li>
</ul>
<table>
<tr><th>Method</th><th>ใช้ทำอะไร</th><th>Response สำเร็จ</th></tr>
<tr><td>GET</td><td>อ่านค่า /sensor/temp</td><td>2.05 Content</td></tr>
<tr><td>POST</td><td>สร้าง /device/register</td><td>2.01 Created</td></tr>
<tr><td>PUT</td><td>แก้ไข/สั่งงาน /led/state</td><td>2.04 Changed</td></tr>
<tr><td>DELETE</td><td>ลบ resource /config</td><td>2.02 Deleted</td></tr>
</table>
<ul>
<li><b>Observe</b>: Client "subscribe" resource → Server ส่ง notification ทุกครั้งที่ค่าเปลี่ยน · ตั้ง <code>request.opt.observe = 0</code> บน GET (Arduino: <code>coap.observe()</code> / <code>coap.cancelObserve()</code> · ฝั่ง server <code>coap.notify()</code> / <code>self.updated_state()</code>)</li>
<li>Non-confirmable message = ไม่มี ACK คล้าย <b>QoS 0</b> ของ MQTT</li>
<li>Response code: <b>2.xx สำเร็จ · 4.xx client error · 5.xx server error</b> (4.04 Not Found, 4.05 Method Not Allowed, 5.03 Service Unavailable)</li>
<li>aiocoap (Python): server <code>create_server_context</code> + <code>add_resource</code> + <code>render_get/post/put/delete</code> · client <code>create_client_context</code> + <code>Message</code> + <code>await protocol.request(req).response</code></li>
<li>coap-simple (Arduino): <code>start()</code>, <code>loop()</code>, <code>server(cb,"res")</code>, <code>sendResponse()</code> · client <code>get/post/put/delete</code>, <code>response(cb)</code></li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>CoAP = UDP · RFC 7252 · port 5683 · RESTful 4 method (GET/POST/PUT/DELETE)</li><li>2.01 Created · 2.02 Deleted · 2.03 Valid · 2.04 Changed · 2.05 Content</li><li>4.04 = ไม่พบ resource (path ผิด) · 4.05 = method ที่ resource ไม่รองรับ</li></ul></div>`,
  sections: [
    { t: "พื้นฐาน CoAP และเหตุผลที่ใช้", html: `
<p>CoAP ถูกออกแบบโดย IETF (RFC 7252) ให้ใช้ใน <b>M2M</b> เช่น smart energy, building automation กับอุปกรณ์และเครือข่ายที่ทรัพยากรจำกัด (low-power / low-memory) โดยยังเชื่อมกับ HTTP ได้ผ่าน proxy อย่างง่าย</p>
<ul>
<li>ใช้ <b>UDP</b> (header เล็ก ไม่มี handshake แบบ TCP) จึงเบากว่า HTTP/TCP บน MCU อย่าง ESP8266/ESP32/Arduino</li>
<li>นำแนวคิดเว็บมาใช้ซ้ำ: <b>URI</b> และ Internet media type · เรียก resource แบบ RESTful</li>
<li>รูปแบบ <b>Client–Server (Request/Response)</b>: Client ส่ง request ไป Server แล้ว Server ตอบ response · Server ถือ <b>Resource</b> (เช่น sensor, LED) และ client ใช้ URI/Path เข้าถึง</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>RFC 7252 · UDP · port 5683 · URI รูปแบบ <code>coap://host:5683/path</code></li><li>Resource = สิ่งที่ server เปิดให้เข้าถึง (ระบุด้วย URI/path)</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ต่างจาก MQTT: MQTT เป็น Publish/Subscribe ต้องมี <b>broker</b> กลาง ส่วน CoAP เป็น Client–Server ตรงๆ ระหว่างอุปกรณ์ (ไม่มี broker) ทั้งสองต่างเบาและเหมาะกับ IoT</div>` },
    { t: "CoAP Method และการออกแบบ Resource", html: `
<table>
<tr><th>Method</th><th>ความหมาย</th><th>ตัวอย่าง</th></tr>
<tr><td>GET</td><td>ขออ่านค่า resource</td><td>GET /sensor/temp</td></tr>
<tr><td>POST</td><td>สร้างข้อมูล/ลงทะเบียน</td><td>POST /device/register</td></tr>
<tr><td>PUT</td><td>แก้ไข/ตั้งค่า/สั่งงาน</td><td>PUT /led/state (payload ON/OFF)</td></tr>
<tr><td>DELETE</td><td>ลบ</td><td>DELETE /config</td></tr>
</table>
<ul>
<li>เลือก method ตามความหมาย: อ่าน sensor = GET, สั่งเปิด/ปิดอุปกรณ์ = PUT (หรือ POST), ลงทะเบียน device ใหม่ = POST</li>
<li>Payload ที่ส่งไป-มาเป็น <b>bytes</b> เช่น <code>b"ON"</code>, <code>"25.6".encode()</code> และต้อง <code>decode()</code> ฝั่งรับ</li>
<li>ถ้าเรียก method ที่ resource ไม่ได้ implement จะได้ <b>4.05 Method Not Allowed</b> · ถ้า path ไม่มี resource จะได้ <b>4.04 Not Found</b></li>
</ul>
<div class="warn"><b>⚠️ ระวัง</b> GET สำเร็จ = 2.05 Content แต่ PUT สำเร็จ = 2.04 Changed (ไม่ใช่ 2.05) และ POST สร้างสำเร็จ = 2.01 Created</div>` },
    { t: "Observe และชนิดของ Message", html: `
<p><b>Observe</b> เป็น extension ที่ให้ client "subscribe" resource บน server: เมื่อสถานะของ URI นั้นเปลี่ยน server จะ <b>push notification</b> ให้ client เอง โดย client ไม่ต้อง polling GET ซ้ำๆ</p>
<ul>
<li>เหมาะกับข้อมูล sensor แบบ <b>real-time</b> / event (อุณหภูมิเปลี่ยนแล้วค่อยแจ้ง) ประหยัด traffic และพลังงานเมื่อเทียบกับ polling</li>
<li>Python (aiocoap): ตั้ง <code>request.opt.observe = 0</code> ใน GET request · ฝั่ง server เรียก <code>self.updated_state()</code> เมื่อค่าเปลี่ยน</li>
<li>Arduino (coap-simple): client <code>coap.observe(ip, port, "resource")</code> · server <code>coap.notify("resource")</code> · ยกเลิกด้วย <code>coap.cancelObserve()</code></li>
<li><b>Non-confirmable</b> message: ไม่มี acknowledgement (ส่งแล้วจบ) คล้าย <b>QoS 0</b> ของ MQTT · ส่วน <b>Confirmable</b> ต้องมี ACK และส่งซ้ำถ้าไม่ได้รับ (ความรู้ทั่วไปของ CoAP ที่ทำให้เชื่อถือได้บน UDP)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Observe = subscribe + server push เมื่อ resource เปลี่ยน · <code>opt.observe = 0</code> ใน GET</li><li>Non-confirmable = ไม่มี ACK ≈ QoS 0</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> Observe ของ CoAP คล้าย subscribe ของ MQTT ในแง่ผลลัพธ์ แต่ CoAP ยังเป็น client–server ตรงๆ ไม่มี broker คั่นกลาง</div>` },
    { t: "Response Code", html: `
<p>Response code อยู่ในรูป <code>class.detail</code> เช่น 2.05 ใช้ class บอกกลุ่มผลลัพธ์ก่อน (คล้าย HTTP 200/404/500)</p>
<table>
<tr><th>Code</th><th>ชื่อ</th><th>ความหมาย / ตัวอย่าง</th></tr>
<tr><td>2.01</td><td>Created</td><td>สร้าง resource สำเร็จ (POST /device)</td></tr>
<tr><td>2.02</td><td>Deleted</td><td>ลบสำเร็จ (DELETE /device)</td></tr>
<tr><td>2.03</td><td>Valid</td><td>cache validation: resource ยังใช้ได้</td></tr>
<tr><td>2.04</td><td>Changed</td><td>แก้ไขสำเร็จ (PUT /led)</td></tr>
<tr><td>2.05</td><td>Content</td><td>GET สำเร็จ ส่งเนื้อหากลับ (GET /temperature)</td></tr>
<tr><td>4.00</td><td>Bad Request</td><td>request ผิดรูปแบบ</td></tr>
<tr><td>4.01</td><td>Unauthorized</td><td>ไม่มีสิทธิ์/ยังไม่ยืนยันตัวตน</td></tr>
<tr><td>4.02</td><td>Bad Option</td><td>option ไม่ถูกต้อง/ไม่รู้จัก</td></tr>
<tr><td>4.03</td><td>Forbidden</td><td>ห้ามเข้าถึง resource</td></tr>
<tr><td>4.04</td><td>Not Found</td><td>ไม่พบ resource (path ผิด)</td></tr>
<tr><td>4.05</td><td>Method Not Allowed</td><td>method นี้ใช้กับ resource ไม่ได้</td></tr>
<tr><td>4.06</td><td>Not Acceptable</td><td>ให้ตามที่ client ขอไม่ได้</td></tr>
<tr><td>4.08 / 4.12 / 4.13</td><td>Entity Incomplete / Precondition Failed / Entity Too Large</td><td>ข้อมูล request ไม่ครบ / เงื่อนไขไม่ผ่าน / ใหญ่เกิน</td></tr>
<tr><td>5.00</td><td>Internal Server Error</td><td>server ผิดพลาดภายใน</td></tr>
<tr><td>5.01</td><td>Not Implemented</td><td>server ไม่รองรับ</td></tr>
<tr><td>5.02 / 5.03 / 5.04 / 5.05</td><td>Bad Gateway / Service Unavailable / Gateway Timeout / Proxying Not Supported</td><td>ปัญหาที่ gateway/proxy หรือ server ไม่พร้อม</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>2.xx = สำเร็จ · 4.xx = ความผิดฝั่ง client · 5.xx = ความผิดฝั่ง server</li><li>GET→2.05 · PUT→2.04 · POST→2.01 · DELETE→2.02</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ใน aiocoap ใช้ชื่อ constant เช่น <code>Code.CONTENT</code> (2.05), <code>Code.CHANGED</code> (2.04)</div>` },
    { t: "aiocoap (Python) บน Raspberry Pi", html: `
<p>aiocoap คือ library CoAP ของ Python แบบ <b>asynchronous</b> (aio = Asynchronous I/O) ติดตั้งใน virtual environment: <code>python3 -m venv ~/coap-env</code> → <code>source ~/coap-env/bin/activate</code> → <code>pip3 install aiocoap RPi.GPIO</code></p>
<h4>ฝั่ง Server</h4>
<ul>
<li><code>Context.create_server_context(root, bind=("192.168.1.100", 5683))</code> เริ่ม CoAP server (ต้อง bind IP ของเครื่อง server)</li>
<li><code>root.add_resource(["temperature"], TemperatureResource())</code> ผูก URI <code>coap://IP:5683/temperature</code> เข้ากับ class</li>
<li>class สืบจาก <code>resource.Resource</code> แล้ว define <code>render_get / render_post / render_put / render_delete</code> (async) · รับ <code>request.payload</code> (bytes), <code>request.code</code>, <code>request.remote</code></li>
<li>ตอบกลับด้วย <code>Message(code=aiocoap.Code.CONTENT, payload=...)</code></li>
</ul>
<pre><code>class LEDResource(resource.Resource):
    async def render_put(self, request):
        command = request.payload.decode()
        if command == "ON":
            GPIO.output(LIGHT, True)
        return Message(code=aiocoap.Code.CHANGED, payload=b"OK")</code></pre>
<h4>ฝั่ง Client</h4>
<pre><code>protocol = await Context.create_client_context()
request = Message(code=aiocoap.Code.PUT,
                  uri="coap://192.168.1.164:5683/led",
                  payload=b"ON")
response = await protocol.request(request).response</code></pre>
<ul>
<li><code>protocol.request(request)</code> ส่ง request ไปยัง server · <code>.response</code> คือรอรับ response (ต้อง <code>await</code>)</li>
<li>Observe: ตั้ง <code>request.opt.observe = 0</code> บน GET</li>
</ul>
<div class="warn"><b>⚠️ ระวัง</b> payload ต้องเป็น bytes (<code>b"ON"</code> หรือ <code>.encode()</code>) · ถ้า resource ไม่มี <code>render_put</code> แล้ว client ส่ง PUT จะได้ 4.05 · ถ้า server bind IP/พอร์ตไม่ตรงกับที่ client เรียก จะไม่มี response (UDP)</div>` },
    { t: "coap-simple (Arduino/ESP)", html: `
<p>Library <b>coap-simple.h</b> (hirotakaster/CoAP-simple-library) ติดตั้งผ่าน Library Manager ใช้กับ ESP8266/ESP32 ต่อ Wi-Fi แล้วดู IP ด้วย <code>WiFi.localIP()</code></p>
<table>
<tr><th>ฝั่ง</th><th>ฟังก์ชัน</th><th>หน้าที่</th></tr>
<tr><td>Server</td><td><code>coap.start()</code></td><td>เริ่ม CoAP server (เรียกใน setup)</td></tr>
<tr><td>Server</td><td><code>coap.loop()</code></td><td>ประมวลผล packet ที่เข้ามา (เรียกใน loop ทุกรอบ)</td></tr>
<tr><td>Server</td><td><code>coap.server(callback, "resource")</code></td><td>ลงทะเบียน callback ให้ resource (URI path)</td></tr>
<tr><td>Server</td><td><code>coap.sendResponse(ip, port, messageid, payload)</code></td><td>ตอบ client</td></tr>
<tr><td>Server</td><td><code>coap.notify("resource")</code></td><td>ส่ง notification ให้ client ที่ observe</td></tr>
<tr><td>Client</td><td><code>coap.get / post / put / delete</code></td><td>ส่ง request (<code>coap.get(ip, port, "res")</code>, <code>coap.put(ip, port, "res", payload, len)</code>)</td></tr>
<tr><td>Client</td><td><code>coap.response(responseCallback)</code></td><td>ลงทะเบียน callback รับ response จาก server</td></tr>
<tr><td>Client</td><td><code>coap.observe(ip, port, "res")</code> / <code>coap.cancelObserve()</code></td><td>subscribe / ยกเลิก</td></tr>
</table>
<p>Callback ฝั่ง server: <code>void callback(CoapPacket &amp;packet, IPAddress ip, int port)</code> — <code>packet.code</code> (method), <code>packet.payload</code>, <code>packet.payloadlen</code>, <code>packet.messageid</code> · ip/port = ของ client ที่ส่งมา</p>
<div class="warn"><b>⚠️ ระวัง</b> ถ้าลืม <code>coap.loop()</code> ใน <code>loop()</code> จะไม่ได้รับ packet/ไม่มี callback ถูกเรียก · การตอบต้องใช้ ip, port, messageid ของ request นั้น</div>` },
    { t: "แล็บและ Troubleshooting ที่ควรรู้", html: `
<ul>
<li>แล็บ: GET <code>/temperature</code> ได้ "25.6" (2.05) · PUT <code>/led</code> payload ON/OFF สั่ง LED (2.04) · Arduino: GET <code>ping</code> ตอบ <code>pong</code>, PUT <code>led</code> เปิด/ปิด built-in LED, อ่าน analogRead (0–5 V) แล้ว PUT เป็นค่า 0–100 ไปคุมความสว่าง (PWM duty cycle) และ GET + Observe</li>
<li>เครื่อง server และ client ต้องอยู่เครือข่ายเดียวกัน (เช่น Hot Spot) · แก้ <code>SERVER_IP</code> ใน client ให้ตรง IP ของ server</li>
</ul>
<table>
<tr><th>อาการ</th><th>สาเหตุที่น่าจะเป็น</th></tr>
<tr><td>ได้ 4.04</td><td>path ใน URI ไม่ตรงกับที่ <code>add_resource</code>/<code>coap.server</code> ลงทะเบียน</td></tr>
<tr><td>ได้ 4.05</td><td>resource ไม่มี method นั้น (เช่นไม่มี render_put)</td></tr>
<tr><td>timeout ไม่มีคำตอบ</td><td>IP/port ผิด · server ไม่ได้รัน · bind ผิด · ลืม loop()</td></tr>
<tr><td>ได้ 5.00</td><td>exception ใน handler ฝั่ง server</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ</b> สั่งอุปกรณ์ที่ต้องการ "ตอบรับ" ให้ใช้ PUT/POST แล้วตรวจ response code ฝั่ง client เสมอ</div>` }
  ],
  ex: [
    { type: "choice",
      story: "ทีมต้องให้ Raspberry Pi อ่านอุณหภูมิจาก ESP32 และสั่งเปิดหลอดไฟโดยตรงในวง LAN เดียวกัน ไม่ต้องการตั้ง server กลางเพิ่ม และ ESP32 มี RAM น้อย",
      q: "เลือกโปรโตคอลใดเหมาะที่สุด",
      opts: [
        { t: "MQTT เพราะ publish/subscribe ใช้ง่ายที่สุด", why: "MQTT ต้องมี broker กลาง (ซึ่งโจทย์ไม่ต้องการ) และใช้ TCP จึงไม่ตรงเงื่อนไขที่สุด" },
        { t: "HTTP REST ผ่าน TCP เต็มรูปแบบ", why: "HTTP/TCP หนักกว่าสำหรับอุปกรณ์ทรัพยากรจำกัด" },
        { t: "CoAP เรียก resource ผ่าน URI ด้วย GET/PUT", why: "ถูก: CoAP เป็น RESTful client–server บน UDP ออกแบบสำหรับ constrained device ไม่ต้องมี broker" },
        { t: "AMQP เพราะมี exchange/queue จัดเส้นทางได้ละเอียด", why: "AMQP ต้องมี broker (เช่น RabbitMQ) และหนักเกินความต้องการ" }
      ], ans: 2 },
    { type: "choice",
      story: `Server และ Client ของ aiocoap:
<pre><code># server
class LEDResource(resource.Resource):
    async def render_put(self, request):
        command = request.payload.decode()
        if command == "ON":
            GPIO.output(LIGHT, True)
        return Message(code=aiocoap.Code.CHANGED, payload=b"OK")

# client
request = Message(code=aiocoap.Code.PUT, uri="coap://192.168.1.100:5683/led", payload=b"ON")
response = await protocol.request(request).response
print(response.code)</code></pre>`,
      q: "ถ้า server ลงทะเบียน resource /led ถูกต้องและรันอยู่ client จะพิมพ์รหัสตอบกลับใด",
      opts: [
        { t: "2.01 Created", why: "2.01 ใช้เมื่อสร้าง resource ใหม่ (POST) ไม่ใช่การ PUT สั่ง LED" },
        { t: "2.04 Changed", why: "ถูก: Code.CHANGED = 2.04 ซึ่งเป็น response ของ PUT ที่สำเร็จ" },
        { t: "2.05 Content", why: "2.05 เป็นของ GET ที่ส่งเนื้อหากลับ" },
        { t: "4.05 Method Not Allowed", why: "resource นี้มี render_put จึงรองรับ PUT จะไม่เกิด 4.05" }
      ], ans: 1 },
    { type: "choice",
      story: `Server ลงทะเบียน resource ดังนี้:
<pre><code>root.add_resource(["temperature"], TemperatureResource())
root.add_resource(["led"], LEDResource())</code></pre>
Client เรียก <code>GET coap://192.168.1.100:5683/humidity</code>`,
      q: "Client ได้ response code ใด",
      opts: [
        { t: "2.05 Content ด้วยค่าเริ่มต้น", why: "ไม่มี resource humidity จึงไม่มีเนื้อหาให้ส่ง" },
        { t: "4.05 Method Not Allowed", why: "4.05 เกิดเมื่อ resource มีอยู่แต่ไม่รองรับ method · ที่นี่ resource ไม่มีอยู่เลย" },
        { t: "5.01 Not Implemented", why: "นี่เป็นความผิดของ path ที่ client ระบุ (4.xx) ไม่ใช่ server ไม่รองรับ" },
        { t: "4.04 Not Found", why: "ถูก: path /humidity ไม่ตรงกับ resource ที่ลงทะเบียนไว้ จึงเป็น client error แบบ Not Found" }
      ], ans: 3 },
    { type: "choice",
      story: `Server มี resource /temperature ที่ define เฉพาะ <code>render_get</code> (ไม่มี render_put/post) นักศึกษาเขียน client ส่ง <code>Message(code=Code.POST, uri=".../temperature", payload=b"30")</code>`,
      q: "ผลที่คาดหวังคืออะไร",
      opts: [
        { t: "4.05 Method Not Allowed เพราะ resource ไม่รองรับ POST", why: "ถูก: resource มีอยู่แต่ไม่ได้ implement method POST จึงตอบ 4.05" },
        { t: "2.01 Created เพราะ POST สร้างข้อมูลได้เสมอ", why: "POST สำเร็จได้ก็ต่อเมื่อ resource มี handler สำหรับ POST" },
        { t: "4.04 Not Found เพราะ path ผิด", why: "path /temperature ถูกต้องและมีอยู่ ปัญหาอยู่ที่ method" },
        { t: "5.03 Service Unavailable เพราะ server ไม่ว่าง", why: "ไม่มีข้อบ่งชี้ว่า server ล้นมือ ความผิดอยู่ที่ client เลือก method" }
      ], ans: 0 },
    { type: "choice",
      story: `Sketch ESP32 ฝั่ง server:
<pre><code>void setup() {
  // ... ต่อ WiFi ...
  coap.server(callback_led, "led");
  coap.start();
}
void loop() {
  delay(1000);
}</code></pre>
Client ส่ง PUT /led แล้ว timeout เสมอ ทั้งที่ IP ถูกต้อง`,
      q: "ควรแก้อะไร",
      opts: [
        { t: "เปลี่ยน resource เป็นชื่ออื่น", why: "ชื่อ resource ตรงกับที่ client เรียก (led) แล้ว ถ้า path ผิดจะได้ 4.04 ไม่ใช่ timeout" },
        { t: "เพิ่ม coap.notify(\"led\") ใน loop", why: "notify ใช้ส่ง Observe notification ไม่เกี่ยวกับการรับ request" },
        { t: "เรียก coap.loop() ใน loop() ทุกรอบ", why: "ถูก: coap.loop() คือตัวประมวลผล packet ที่เข้ามาและเรียก callback ถ้าไม่เรียกจะไม่เคยรับ/ตอบ request" },
        { t: "เปลี่ยนจาก PUT เป็น GET", why: "ปัญหาไม่ได้อยู่ที่ method เพราะ server ไม่ได้รับ packet เลย" }
      ], ans: 2 },
    { type: "choice",
      story: "Pi (192.168.1.100) รัน aiocoap server ด้วย bind=(\"127.0.0.1\", 5683) ทดสอบบนเครื่องเดียวกันได้ปกติ แต่ ESP32 ในวง LAN เดียวกันส่ง GET ไปที่ coap://192.168.1.100:5683/temperature แล้วไม่ได้รับ response",
      q: "สาเหตุที่น่าจะเป็นที่สุดคืออะไร",
      opts: [
        { t: "CoAP ใช้ TCP ซึ่งถูก firewall ปิด", why: "CoAP ใช้ UDP ไม่ใช่ TCP" },
        { t: "bind ที่ 127.0.0.1 รับเฉพาะ loopback จากเครื่องตัวเอง ควร bind IP ของ LAN (192.168.1.100)", why: "ถูก: server ที่ bind loopback จะไม่รับ packet จากเครื่องอื่น ต้อง bind ที่ IP ของเครื่อง (ตามที่แล็บกำหนด)" },
        { t: "ต้องใช้พอร์ต 80 แทน 5683", why: "5683 คือพอร์ตมาตรฐานของ CoAP พอร์ต 80 เป็นของ HTTP" },
        { t: "payload ของ GET ต้องไม่ว่าง", why: "GET ไม่จำเป็นต้องมี payload" }
      ], ans: 1 },
    { type: "choice",
      story: "Dashboard ต้องแสดงอุณหภูมิจาก sensor node ทันทีที่ค่าเปลี่ยน ปัจจุบัน dashboard ส่ง GET ทุก 1 วินาที ทำให้ node ต้องตื่นและตอบบ่อยจนแบตหมดเร็ว และค่าที่ไม่เปลี่ยนก็ถูกส่งซ้ำ",
      q: "ควรปรับด้วยวิธีใดโดยยังใช้ CoAP",
      opts: [
        { t: "ใช้ DELETE เพื่อล้างค่าเก่าก่อนอ่านทุกครั้ง", why: "DELETE ลบ resource ไม่ช่วยลด polling" },
        { t: "เปลี่ยนเป็น POST ทุกครั้งแทน GET", why: "ยังเป็นการ polling เหมือนเดิมและ POST ไม่ได้มีความหมายว่าอ่านค่า" },
        { t: "ลดช่วง polling เป็น 0.1 วินาที", why: "ยิ่งเพิ่มภาระและพลังงานของ node" },
        { t: "ส่ง GET พร้อม request.opt.observe = 0 แล้วให้ server เรียก updated_state()/notify เมื่อค่าเปลี่ยน", why: "ถูก: Observe ให้ client subscribe แล้ว server push เฉพาะเมื่อค่าเปลี่ยน ลด traffic และพลังงาน" }
      ], ans: 3 },
    { type: "multi",
      story: "พิจารณาข้อความเกี่ยวกับ CoAP",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ทำงานบน UDP และกำหนดใน RFC 7252", ok: true, why: "ถูก" },
        { t: "ต้องมี broker กลางเสมอเหมือน MQTT", ok: false, why: "CoAP เป็น client–server ตรงๆ ไม่ต้องมี broker" },
        { t: "ใช้ method GET/POST/PUT/DELETE แบบเดียวกับ REST ของ HTTP", ok: true, why: "ถูก เป็น RESTful API" },
        { t: "Non-confirmable message ไม่มี acknowledgement คล้าย QoS 0 ของ MQTT", ok: true, why: "ถูก" },
        { t: "response code 5.xx แปลว่าความผิดพลาดอยู่ที่ฝั่ง client", ok: false, why: "5.xx คือ server error ส่วน client error คือ 4.xx" },
        { t: "ต้องใช้ HTTP header ทุก request เพื่อให้ proxy เข้าใจ", ok: false, why: "CoAP มี format ของตัวเอง proxy แปลงกับ HTTP ให้" }
      ] },
    { type: "multi",
      story: "client ส่ง request ไป CoAP server แล้วได้ response ในกลุ่ม 4.xx",
      q: "เหตุการณ์ใดบ้างที่ทำให้ได้ response กลุ่ม 4.xx (client error)",
      opts: [
        { t: "ระบุ path ของ resource ผิด (4.04)", ok: true, why: "ถูก" },
        { t: "ใช้ method ที่ resource ไม่รองรับ (4.05)", ok: true, why: "ถูก" },
        { t: "ส่ง payload ใหญ่เกินที่ server รับได้ (4.13)", ok: true, why: "ถูก Request Entity Too Large" },
        { t: "handler ฝั่ง server เกิด exception ภายใน (5.00)", ok: false, why: "เป็น server error (5.xx)" },
        { t: "proxy ติดต่อ server ปลายทางไม่ทันเวลา (5.04)", ok: false, why: "เป็น gateway timeout ใน 5.xx" },
        { t: "server ไม่รองรับฟีเจอร์ที่ถูกร้องขอ (5.01)", ok: false, why: "เป็น server error (5.xx)" }
      ] },
    { type: "blank",
      story: "ตรวจ response code ของ request ที่สำเร็จ",
      text: "GET /temperature สำเร็จได้ {1} · PUT /led สำเร็จได้ {2} · POST /device สร้าง resource ได้ {3}",
      blanks: [
        { opts: ["2.01 Created", "2.04 Changed", "2.05 Content", "2.02 Deleted"], ans: 2, why: "GET ได้ 2.05 Content" },
        { opts: ["2.05 Content", "2.04 Changed", "2.03 Valid", "2.01 Created"], ans: 1, why: "PUT ได้ 2.04 Changed" },
        { opts: ["2.02 Deleted", "2.04 Changed", "4.05", "2.01 Created"], ans: 3, why: "POST สร้างสำเร็จ 2.01 Created" }
      ] },
    { type: "blank",
      story: "เติมโค้ด aiocoap ฝั่ง client เพื่อสั่งเปิด LED และ observe",
      text: "<pre><code>request = Message(code=aiocoap.Code.{1}, uri=\"coap://192.168.1.164:5683/led\", payload=b\"ON\")\nresponse = await protocol.request(request).{2}\n# เมื่อต้องการ subscribe บน GET:\nrequest.opt.{3} = 0</code></pre>",
      blanks: [
        { opts: ["GET", "DELETE", "PUT", "POST"], ans: 2, why: "สั่งงาน/แก้ค่า resource LED ใช้ PUT ตามแล็บ" },
        { opts: ["payload", "response", "code", "remote"], ans: 1, why: ".response คือการรอรับ response จาก server" },
        { opts: ["observe", "payload", "uri", "timeout"], ans: 0, why: "ตั้ง opt.observe = 0 เพื่อ subscribe" }
      ] },
    { type: "blank",
      story: "ESP32 coap-simple ฝั่ง server",
      text: "ต้องเรียก coap.{1}() ครั้งเดียวใน setup เพื่อเริ่ม server · เรียก coap.{2}() ใน loop ทุกรอบเพื่อรับ packet · ใน callback ตอบ client ด้วย coap.{3}(ip, port, packet.messageid, msg)",
      blanks: [
        { opts: ["response", "start", "observe", "notify"], ans: 1, why: "coap.start() เริ่ม CoAP server" },
        { opts: ["loop", "get", "server", "cancelObserve"], ans: 0, why: "coap.loop() ประมวลผล packet" },
        { opts: ["get", "put", "observe", "sendResponse"], ans: 3, why: "sendResponse ส่ง response กลับ client" }
      ] },
    { type: "match",
      q: "จับคู่ฟังก์ชัน/ตัวแปรกับหน้าที่",
      pairs: [
        ["Context.create_server_context()", "เริ่ม CoAP server (aiocoap)"],
        ["root.add_resource([\"led\"], ...)", "ผูก URI path กับ class ของ resource"],
        ["render_put(self, request)", "จัดการ PUT request ที่เข้ามา"],
        ["await protocol.request(req).response", "ส่ง request แล้วรอ response จาก server"],
        ["coap.observe(ip, port, \"res\")", "subscribe รับ notification (Arduino)"]
      ],
      why: "ชุดฟังก์ชันของ aiocoap ฝั่ง server/client และ coap-simple ใช้ตามบทบาท: create_server_context เริ่ม server, add_resource ผูก path, render_xxx คือ handler ของ method, .response รอ response, coap.observe คือ Observe ฝั่ง Arduino" }
  ]
});
