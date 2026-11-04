// สรุปเนื้อหารายบท — id ต้องตรงกับ key ใน TOPICS (questions.js)
window.NOTES = [
{ id: "rest", title: "REST API · Hono · WebSocket", src: "IOT RESTAPI Week 1 & 2", html: `
<h2>RESTful API</h2><ul>
<li>ใช้ HTTP/HTTPS, ใช้ HTTP Method (CRUD) และ Response Code</li>
<li><b>Stateless</b> (ไม่เก็บ session), <b>Resource-based</b>, ส่ง JSON/XML, แยก Client–Server</li>
<li>URL: <code>/api/v1/books/1</code> → v1 = เวอร์ชัน API, books = resource, 1 = ID</li></ul>
<h2>Hono & ทางเลือก</h2><ul>
<li>Hono = web framework (TS/JS) เร็ว เรียบง่าย หลาย runtime แรงบันดาลใจจาก Express</li>
<li>Elysia.js = type-safe · Express = เก่า ชุมชนใหญ่ · Nest.js = opinionated · Adonis.js = MVC แบบ Laravel</li></ul>
<h2>Deploy & Database</h2><ul>
<li>Database: PostgreSQL, SQLite (local) · เครื่องมือ: DBeaver / HeidiSQL / Navicat</li>
<li>Deploy: Railway / Vercel (static, serverless, free tier, CI/CD)</li>
<li>ต้องศึกษาต่อ: Error Handling, CORS, Authentication, Migration</li></ul>
<h2>Frontend (Week 2)</h2><ul>
<li>React = UI library (JSX, Virtual DOM) · Vite = build tool (bundler, dev server, HMR)</li>
<li><code>npm install</code> → copy <code>.env.example</code> → <code>npm run dev</code> (localhost:5173)</li></ul>
<h2>Real-time บนเว็บ</h2><ul>
<li><b>Polling</b> (short/long): client ถามซ้ำ · <b>WebSocket</b>: full-duplex, TCP, เริ่มจาก HTTP Upgrade, <code>ws://</code> / <code>wss://</code></li></ul>` },

{ id: "mqtt", title: "MQTT", src: "IoT69-MQTT_Protocol", html: `
<h2>พื้นฐาน</h2><ul>
<li>Message Queuing Telemetry Transport · คิดค้นปี 1999 โดย Andy Stanford-Clark (IBM) และ Arlen Nipper (Eurotech) สำหรับ oil pipeline ผ่านดาวเทียม</li>
<li><b>Publish/Subscribe</b> ผ่าน <b>Broker</b>, asynchronous, ใช้ TCP ค้างไว้ · Fixed header เพียง <b>2 bytes</b></li>
<li>Topic = สตริง UTF-8 คั่น level ด้วย <code>/</code> · Payload = array of bytes (agnostic: String/JSON/XML/binary)</li></ul>
<h2>QoS</h2>
<table><tr><th>QoS</th><th>ความหมาย</th><th>Packet</th></tr>
<tr><td>0</td><td>At most once (best effort)</td><td>ไม่มี ACK</td></tr>
<tr><td>1</td><td>At least once (อาจซ้ำ)</td><td>PUBLISH → PUBACK</td></tr>
<tr><td>2</td><td>Exactly once (ช้าสุด)</td><td>PUBLISH → PUBREC → PUBREL → PUBCOMP</td></tr></table>
<ul><li><b>Effective QoS = min(Publish QoS, Subscribe QoS)</b></li><li>DUP flag และ Packet Identifier ใช้เฉพาะ QoS &gt; 0</li></ul>
<h2>Feature สำคัญ</h2><ul>
<li><b>Retain</b>: Broker เก็บข้อความล่าสุดของ topic ส่งให้ subscriber ใหม่ทันที</li>
<li><b>LWT</b>: ตั้งตอน CONNECT — ถ้า client หลุดผิดปกติ Broker จะ publish will message (ใช้บอก offline)</li>
<li><b>Session</b> (v5): Client ID คงที่ + <code>clean_start=False</code> + Session Expiry Interval → รับข้อความที่พลาดตอน offline</li>
<li><b>Keep Alive</b>: ไม่มี packet → ส่ง PINGREQ ได้ PINGRESP · เกิน ~1.5× Keep Alive ถือว่าหลุด → trigger LWT</li></ul>
<h2>Python (paho-mqtt)</h2><ul>
<li><code>connect(host,1883)</code>, <code>publish(topic,payload,qos)</code>, <code>subscribe(topic,qos)</code>, <code>on_message</code>, <code>loop_forever()</code>, <code>will_set(...)</code></li>
<li>พอร์ต: MQTT 1883 · WebSocket 8884 (SSL) · MQTT over WebSocket ใช้ควบคุมจากหน้าเว็บ</li></ul>` },

{ id: "amqp", title: "AMQP · RabbitMQ", src: "IoT69-AMQP-rev1", html: `
<h2>แนวคิด</h2><ul>
<li>Message-Oriented Middleware: Producer → Broker (มี Queue เป็น buffer) → Consumer · asynchronous ไม่ต้องออนไลน์พร้อมกัน ลด server overload</li>
<li>AMQP = Advanced Message Queuing Protocol · ตัวอย่างซอฟต์แวร์ <b>RabbitMQ</b></li></ul>
<h2>องค์ประกอบ</h2><ul>
<li><b>Producer</b> → <b>Exchange</b> → (<b>Binding</b> + Binding key) → <b>Queue</b> → <b>Consumer</b></li>
<li>Exchange เทียบ <b>Routing key</b> ของข้อความกับ <b>Binding key</b> เพื่อเลือก Queue</li></ul>
<h2>Exchange 4 ชนิด</h2>
<table><tr><th>ชนิด</th><th>การ route</th></tr>
<tr><td>Direct</td><td>Routing key = Binding key ตรงตัว</td></tr>
<tr><td>Fanout</td><td>Broadcast ทุก Queue</td></tr>
<tr><td>Topic</td><td>pattern: <code>*</code> = 1 คำพอดี, <code>#</code> = 0 คำขึ้นไป</td></tr>
<tr><td>Headers</td><td>ใช้ header ของข้อความ; <code>x-match: all</code> ครบทุกตัว / <code>any</code> อย่างน้อยหนึ่ง</td></tr></table>
<ul><li><code>sports.*</code> ↔ sports.tennis · <code>sports.#</code> ↔ sports, sports.tennis, sports.tennis.mens</li>
<li>Default exchange: binding key = ชื่อ queue</li></ul>
<h2>RabbitMQ & pika</h2><ul>
<li><b>Durable</b> = อยู่รอดหลัง restart · Transient = หาย · (ข้อความต้อง Persistent ด้วย)</li>
<li>pika: <code>BlockingConnection</code>, <code>channel()</code>, <code>exchange_declare</code>, <code>queue_declare</code>, <code>basic_publish</code>, <code>basic_consume</code>, <code>basic_ack</code>, <code>basic_nack</code></li>
<li>MQTT = Pub/Sub topic · AMQP = Exchange/Queue/Binding (route ละเอียดกว่า)</li></ul>` },

{ id: "coap", title: "CoAP", src: "IoT69-CoAP-rev3", html: `
<h2>พื้นฐาน</h2><ul>
<li>Constrained Application Protocol (RFC 7252, IETF) สำหรับอุปกรณ์ทรัพยากรจำกัด (Arduino, ESP8266/ESP32) · ทำงานบน <b>UDP</b></li>
<li>Client–Server แบบ Request/Response (คล้าย HTTP) เข้าถึง Resource ผ่าน URI เช่น <code>coap://192.168.1.10/led</code> · พอร์ตมาตรฐาน 5683</li></ul>
<h2>Method</h2>
<table><tr><th>Method</th><th>ใช้ทำ</th></tr>
<tr><td>GET</td><td>อ่านค่า (/sensor/temp)</td></tr><tr><td>POST</td><td>สร้าง (/device/register)</td></tr>
<tr><td>PUT</td><td>แก้ไข/สั่งงาน (/led/state)</td></tr><tr><td>DELETE</td><td>ลบ</td></tr></table>
<h2>Observe</h2><ul><li>Client "subscribe" resource → Server ส่ง notification เมื่อค่าเปลี่ยน · ตั้ง <code>request.opt.observe = 0</code> ใน GET</li></ul>
<h2>Response code</h2>
<table><tr><th>รหัส</th><th>ความหมาย</th></tr>
<tr><td>2.01 / 2.02 / 2.03</td><td>Created / Deleted / Valid</td></tr>
<tr><td>2.04</td><td>Changed (PUT สำเร็จ)</td></tr><tr><td>2.05</td><td>Content (GET สำเร็จ)</td></tr>
<tr><td>4.00–4.13</td><td>Client error: 4.01 Unauthorized, 4.03 Forbidden, <b>4.04 Not Found</b>, 4.05 Method Not Allowed</td></tr>
<tr><td>5.xx</td><td>Server error: 5.00 Internal, 5.01 Not Implemented, 5.03 Unavailable</td></tr></table>
<h2>aiocoap (Python)</h2><ul>
<li>Server: <code>Context.create_server_context(root, bind=(ip,5683))</code>, <code>root.add_resource(["led"], LEDResource())</code>, <code>render_get/post/put/delete</code></li>
<li>Client: <code>Context.create_client_context()</code>, <code>Message(code=Code.GET, uri=...)</code>, <code>await protocol.request(req).response</code></li></ul>
<h2>Arduino (coap-simple)</h2><ul>
<li>Server: <code>coap.start()</code>, <code>coap.loop()</code>, <code>coap.server(callback,"res")</code>, <code>coap.sendResponse(...)</code></li>
<li>Client: <code>coap.get/post/put/delete</code>, <code>coap.response(cb)</code>, <code>coap.observe()</code></li></ul>` },

{ id: "lora", title: "Telecom · LoRa · LoRaWAN", src: "IoT69-Lora-wireless-rev1", html: `
<h2>พื้นฐานสื่อสาร & Modulation</h2><ul>
<li>ช่องสัญญาณมี loss/noise (Free Space Path Loss, Fading, Interference) · Channel encoder เพิ่ม redundant bits (Hamming, Parity)</li>
<li>Analog: AM, FM, PM · Digital→Analog: ASK, FSK, PSK, QAM · Line coding: NRZ, RZ, Manchester</li>
<li>Wi-Fi ใช้ QAM: Wi-Fi 5 = 256-QAM · Wi-Fi 6 = 1024-QAM (10 bit) · Wi-Fi 7 = 4096-QAM (12 bit)</li></ul>
<h2>LoRa (Physical layer)</h2><ul>
<li>Proprietary modulation ของ <b>Semtech</b> ใช้ <b>Chirp Spread Spectrum (CSS)</b> · เริ่ม 2009 (Sornin, Seller) · chip: SX1272/SX1276, gateway SX1301/SX1303</li>
<li><b>LoRaWAN</b> = LoRa + network protocol (LoRa Alliance, 2015) · LPWAN: ไกล ประหยัดพลังงาน</li></ul>
<h2>พารามิเตอร์</h2><ul>
<li><b>SF</b> (7–12): chip/symbol = 2<sup>SF</sup>, bit/symbol = SF · SF สูง = ไกล/sensitivity ดี แต่ช้า, Time on Air นาน (SF7 ≈ 1 ms, SF12 ≈ 32.8 ms ต่อ chirp)</li>
<li><b>Bandwidth</b> (125/250/500 kHz): chip rate = BW · กว้าง = เร็วแต่ sensitivity แย่ลง</li>
<li><b>Coding Rate</b> 4/5–4/8: FEC · ค่ามาก = ทนผิดพลาดดี ช้าลง</li>
<li>สูตร: Symbol rate = BW/2<sup>SF</sup> · Bit rate = SF×Symbol rate · Data rate = Bit rate×CR (SF7, 125 kHz ≈ 6,836 bps ก่อนคูณ CR)</li>
<li>ISM band = ความถี่ unlicensed (อุตสาหกรรม/วิทยาศาสตร์/การแพทย์)</li>
<li><b>Link Margin = RSSI − Sensitivity</b> · <b>Fresnel zone</b> ต้องโล่ง (LOS) ระหว่าง node กับ gateway</li></ul>
<h2>สถาปัตยกรรม LoRaWAN</h2><ul>
<li>End device → Gateway (RF→IP) → Network Server → Application Server</li>
<li><b>Class A</b>: uplink ได้ตลอด + รับ downlink 2 ช่วงสั้นหลังส่ง (ประหยัดสุด) · <b>Class B</b>: มี beacon ตามเวลา · <b>Class C</b>: เปิดรับตลอด (กินสุด)</li>
<li>Network Server: dedup, security, Join, ADR, MAC command, downlink scheduling · Application Server: ถอดรหัส payload ด้วย <b>AppSKey (AES-128)</b>, decoder, dashboard</li>
<li>Join: <b>OTAA</b> (DevEUI, AppEUI/JoinEUI, AppKey) และ <b>ABP</b> · DevEUI/AppEUI = little-endian, AppKey = big-endian</li></ul>
<h2>Lab</h2><ul>
<li>Library: RadioHead (P2P) และ MCCI LMIC (LoRaWAN) · ChirpStack = open-source Network Server</li>
<li>Uplink topic: <code>application/{app_id}/device/{dev_eui}/event/up</code> · Downlink: <code>.../command/down</code> (JSON: devEui, confirmed, fPort, data เป็น Base64 — ON = T04=)</li></ul>` },

{ id: "wifi", title: "Wi-Fi", src: "IoT69-WiFi-rev1", html: `
<h2>รุ่นและมาตรฐาน</h2>
<table><tr><th>Wi-Fi</th><th>IEEE</th><th>PHY</th><th>QAM สูงสุด</th></tr>
<tr><td>4</td><td>802.11n</td><td>HT</td><td>64</td></tr><tr><td>5</td><td>802.11ac</td><td>VHT</td><td>256 (8 bit)</td></tr>
<tr><td>6 / 6E</td><td>802.11ax</td><td>HE</td><td>1024 (10 bit)</td></tr><tr><td>7</td><td>802.11be</td><td>EHT</td><td>4096 (12 bit)</td></tr></table>
<ul><li>IEEE = พัฒนามาตรฐาน · Wi-Fi Alliance = ตั้งชื่อ/รับรอง · 6E = ax บนย่าน 6 GHz</li></ul>
<h2>สัญญาณ & Path Loss</h2><ul>
<li>FSPL 1 เมตรแรก: 2.4 GHz ≈ −40 dB · 5 GHz ≈ −47 · 6 GHz ≈ −48 dB</li>
<li>ระยะ ×2 = −6 dB · ระยะ ×10 = −20 dB (เช่น 100 m = −40 dB, 800 m = −58 dB)</li>
<li>EIRP สูงสุดไทย (NBTC): 2.4 GHz 100 mW (20 dBm) · 5.15–5.35 GHz 200 mW · 5.47–5.725 500 mW · 6 GHz 250 mW</li>
<li>RSSI สูงขึ้นเมื่อ polarization ตรงกัน · วัสดุ (โลหะ น้ำ) ลดสัญญาณ</li></ul>
<h2>Channel</h2><ul>
<li>2.4 GHz: 3 ช่องไม่ซ้อน (1, 6, 11) → CCI สูง ควรผลัก client ไป 5/6 GHz</li>
<li>Channel bonding (20→40→80→160→320 MHz) · กว้างขึ้นต้องการ RSSI/SNR สูงขึ้น</li>
<li>6 GHz ไทย: 3×160 MHz หรือ 1×320 MHz (US: 7×160, 3×320)</li></ul>
<h2>เทคโนโลยี</h2><ul>
<li><b>MIMO / Spatial stream</b> เพิ่ม data rate</li>
<li>Wi-Fi 6: <b>MU-MIMO</b> + <b>OFDMA</b> (แบ่ง channel เป็น Resource Unit ให้หลาย user)</li>
<li>Wi-Fi 7: <b>320 MHz</b> (6 GHz เท่านั้น), <b>4K-QAM</b>, <b>MLO</b> (Alternating/Concurrent), <b>Puncturing + Multi-RU</b></li></ul>
<h2>Design</h2><ul>
<li>Wi-Fi ทำงานเหมือน HUB: client ช้าตัวเดียวทำให้ทุกคนช้า → ออกแบบ <b>Capacity ไม่ใช่แค่ Coverage</b></li>
<li>AP ห่าง ~8–12 m · cell size −55 ถึง −65 dBm · ลด CCI ด้วย channel plan/reuse (เช่น AirMatch) · อัปเดต client driver</li></ul>` },

{ id: "pi", title: "Raspberry Pi · GPIO · ADC · PWM", src: "IoT69-Raspi-01, 02", html: `
<h2>Raspberry Pi</h2><ul>
<li>คอมพิวเตอร์ขนาดบัตรเครดิต · Pi 4 B (2019): Cortex-A72 1.5 GHz quad-core, RAM 1/2/4 GB, <b>40 GPIO</b>, Bluetooth 5.0, Wi-Fi dual-band</li>
<li>ลง OS ด้วย <b>Raspberry Pi Imager</b> (ตั้ง hostname, user, Wi-Fi, SSH) · เข้าเครื่องด้วย SSH (PuTTY, port 22, <code>raspberrypi.local</code>)</li>
<li>คำสั่ง: <code>ls, cd, df -h, nmtui, ifconfig, passwd, raspi-config</code> · Static IP แก้ที่ <code>/etc/dhcpcd.conf</code></li></ul>
<h2>GPIO (RPi.GPIO)</h2><ul>
<li><code>GPIO.setmode(GPIO.BCM)</code> = เลข GPIO ตามชิป · <code>GPIO.BOARD</code> = เลข pin บนบอร์ด</li>
<li>Output: <code>GPIO.setup(p, GPIO.OUT)</code> + <code>GPIO.output(p, True/False)</code> · Input: <code>GPIO.setup(p, GPIO.IN)</code> + <code>GPIO.input(p)</code></li>
<li>Pull-up: ไม่กด = HIGH, กด = LOW · Pull-down: ตรงข้าม · GPIO ใช้ระดับ 3.3 V</li></ul>
<h2>Analog → Digital</h2><ul>
<li>ขั้นตอน: Sampling (fs ≥ 2fm) → Quantize/Encoding · Resolution n bit → 2<sup>n</sup> ระดับ (0…2<sup>n</sup>−1)</li>
<li>แรงดัน = ADC × Vref / 2<sup>n</sup> · MCP3208: 12 bit (0–4095), 8 channel, 100 kS/s, Vref 3.3 V → 1 LSB ≈ 0.8056 mV</li></ul>
<h2>SPI & MCP3208</h2><ul>
<li>SPI: synchronous, full-duplex · MOSI (M→S), MISO (S→M), SCK, CS</li>
<li>spidev: <code>spi.open(0,0)</code>, <code>spi.xfer2([6|(ch&4)>>2, (ch&3)<<6, 0])</code> ส่ง/รับ 3 byte</li>
<li>ค่า 12 bit: <code>((adc[1] &amp; 15) &lt;&lt; 8) + adc[2]</code></li></ul>
<h2>PWM</h2><ul>
<li>ปรับ <b>Duty cycle</b> ควบคุมความสว่าง LED/ความเร็วมอเตอร์</li>
<li><code>p = GPIO.PWM(pin, freq)</code>, <code>p.start(dc)</code>, <code>p.ChangeDutyCycle(dc)</code> (0–100), <code>p.ChangeFrequency(f)</code>, <code>p.stop()</code></li></ul>` },

{ id: "sens", title: "Sensor · I2C", src: "IoT69-Raspi-03, 04", html: `
<h2>Sensor vs Transducer</h2><ul>
<li><b>Sensor</b>: ตรวจจับปริมาณกายภาพ → เปลี่ยนค่าไฟฟ้า (Thermistor, LDR, Flex, Touch)</li>
<li><b>Transducer</b>: แปลงพลังงานรูปแบบหนึ่งเป็นอีกแบบ (Microphone, Solar cell, Speaker, Motor, LED)</li></ul>
<h2>เซนเซอร์ที่เรียน</h2><ul>
<li><b>LDR</b> (แสง): ความต้านทานเปลี่ยนตามแสง · อ่านผ่าน ADC (A0→CH0) หรือ D0 (digital)</li>
<li><b>Thermistor NTC</b>: อุณหภูมิ↑ ความต้านทาน↓ · มีค่า B (Beta) ในสมการ · TTC05103 = 10 kΩ @25 °C, B=4050 K · ต่อเป็นวงจรแบ่งแรงดันแล้วอ่าน ADC</li>
<li><b>Infrared obstacle</b>: OUT = LOW เมื่อเจอสิ่งกีดขวาง · EN ต้อง HIGH</li>
<li><b>Joystick XY</b>: 2 แกน analog (VRx, VRy → ADC) + ปุ่ม digital (SW)</li>
<li><b>Ultrasonic HC-SR04</b>: TRIG HIGH 10 µs → วัดความกว้างพัลส์ ECHO · ระยะ = เวลา × 17150 (cm) (ความเร็วเสียง 343 m/s, หาร 2 เพราะไป-กลับ) · ECHO 5 V ต้องใช้ตัวแบ่งแรงดัน 1k/2k → ≈3.3 V</li></ul>
<h2>I2C</h2><ul>
<li>Inter-Integrated Circuit · synchronous serial 2 สาย: <b>SDA</b> (data) + <b>SCL</b> (clock) · Master/Slave แยกด้วย <b>address</b> (คิดค้นโดย Philips)</li>
<li>เปิดใช้: <code>sudo raspi-config</code> → Interface Options → I2C</li>
<li>i2c-tools: <code>i2cdetect -y 1</code> (สแกน), <code>i2cget</code>, <code>i2cset</code>, <code>i2ctransfer</code> · bus 1 บน Pi 4</li>
<li>Library Python: <b>smbus3</b> (<code>SMBus(1)</code>, <code>i2c_wr</code>, <code>i2c_rd</code>)</li></ul>
<h2>อุปกรณ์ I2C</h2><ul>
<li><b>LCD 16×2</b> (ชิป PCF8574, address 0x27) ใช้ library <b>RPLCD</b>: <code>CharLCD('PCF8574',0x27)</code>, <code>write_string</code>, <code>crlf</code>, <code>clear</code></li>
<li><b>SHT31</b> (อุณหภูมิ/ความชื้น, address 0x44): ส่ง <code>[0x2C,0x06]</code> แล้วอ่าน 6 byte (T MSB/LSB/CRC, H MSB/LSB/CRC)</li>
<li>T = −45 + 175 × raw/65535 · RH = 100 × raw/65535 · raw = MSB×256 + LSB</li>
<li>Clock stretching: slave ดึง clock LOW ขอเวลาประมวลผล</li></ul>` },

{ id: "ai", title: "AI & IoT · MCP", src: "IoT69-AI-IoT-rev2", html: `
<h2>รูปแบบ AI + IoT</h2><ul>
<li>Natural Language AI Control (สั่งงานด้วยภาษาธรรมชาติผ่าน LLM)</li>
<li>AI Data Analytics (anomaly detection, classification, สรุปผล)</li>
<li>Edge AI / TinyML (ประมวลผลบนอุปกรณ์ ลด latency ทำงาน offline)</li>
<li>AI Vision & Sensor Fusion (Pi Camera + OpenCV object detection)</li></ul>
<h2>รูปแบบการเชื่อมต่อ</h2><ul>
<li>Cloud AI (REST API/HTTPS + API Key) · MQTT-based AIoT · Edge/Local AI · LLM Tool/Function Calling · MCP · AIoT Gateway</li></ul>
<h2>Model Context Protocol (MCP)</h2><ul>
<li>มาตรฐานให้ AI เชื่อมกับเครื่องมือ/ข้อมูลภายนอก · <b>MCP Client</b> (AI app) ↔ <b>MCP Server</b> (เปิดความสามารถ)</li>
<li>Server เปิด 3 อย่าง: <b>Tools</b> (ฟังก์ชันสั่งงาน เช่น set_led, get_temperature) · <b>Resources</b> (ข้อมูลให้อ่านผ่าน URI) · <b>Prompts</b> (เทมเพลตสำเร็จรูป)</li>
<li>Transport: <b>stdio</b> (process เดียวกัน) และ <b>Streamable HTTP</b> (endpoint <code>/mcp</code> ผ่านเครือข่าย)</li>
<li>ต้องมี Authentication & Authorization · ตรวจ input (whitelist "on"/"off") ก่อนสั่งงาน</li></ul>
<h2>Lab: MCP + Raspberry Pi</h2><ul>
<li>เขียน tool ด้วย <code>@mcp.tool()</code> + docstring อธิบายให้ AI เข้าใจ</li>
<li>Flow: AI Chatbot → MCP Server (บน Pi) → publish MQTT (qos=1) → อุปกรณ์ subscribe → LED</li>
<li>Pi อยู่หลัง private IP → ใช้ <b>Tunnel</b> (ngrok, localhost.run, tunnl.gg) <code>ssh -t -R 80:127.0.0.1:8000 stable@proxy.tunnl.gg</code> (<code>-R</code> = reverse tunnel)</li>
<li>ติดตั้ง: python3-venv, <code>pip install "mcp[cli]" paho-mqtt RPi.GPIO</code></li></ul>` }
];
