// ข้อสอบ IoT Final — 115 ข้อ  (รูปแบบ: Q(หมวด, โจทย์, ตัวเลือกที่ถูก, [ตัวเลือกผิด x3], คำอธิบาย))
// ตัวเลือกถูกเขียนไว้ก่อน แล้วระบบจะสลับลำดับแบบสุ่มทุกครั้งที่ทำข้อสอบ
window.TOPICS = {
  rest: "REST API · Hono · WebSocket",
  mqtt: "MQTT",
  amqp: "AMQP · RabbitMQ",
  coap: "CoAP",
  lora: "Telecom · LoRa · LoRaWAN",
  wifi: "Wi-Fi",
  pi: "Raspberry Pi · GPIO · ADC · PWM",
  sens: "Sensor · I2C",
  ai: "AI & IoT · MCP"
};
window.QS = [];
function Q(t, q, a, w, why) { window.QS.push({ t: t, q: q, a: a, w: w, why: why }); }

/* ===================== REST API · Hono · WebSocket (10) ===================== */
Q("rest", "ข้อใดเป็นคุณสมบัติของ RESTful API ตามสไลด์?",
  "Stateless และอิงตาม Resource ผ่าน HTTP/HTTPS",
  ["เก็บ Session ของ client ไว้ที่ server ตลอดเวลา", "ใช้ได้เฉพาะ XML เท่านั้น", "ต้องเปิด TCP connection ค้างไว้ตลอดการใช้งาน"],
  "REST ใช้ HTTP/HTTPS, Stateless (ไม่เก็บ session), Resource-based, ส่งข้อมูลเป็น JSON หรือ XML และแยก Client-Server");

Q("rest", "จาก URL https://www.services.com/api/v1/books/1 ส่วน \"v1\" และ \"1\" คืออะไรตามลำดับ?",
  "เวอร์ชันของ API และ ID ของ resource",
  ["ID ของ resource และเวอร์ชันของ API", "ชื่อ database และชื่อ table", "พอร์ตและโปรโตคอล"],
  "v1 คือ API versioning ส่วน /books/1 คือ resource 'books' ตัวที่มี ID = 1");

Q("rest", "ข้อใดอธิบาย Hono ได้ถูกต้องที่สุด?",
  "Web framework สมัยใหม่สำหรับสร้าง Web App/API ด้วย TypeScript/JavaScript เน้นความเร็วและเรียบง่าย รองรับหลาย runtime",
  ["ฐานข้อมูล NoSQL สำหรับเก็บข้อมูลเซนเซอร์", "MQTT Broker แบบ open-source", "Library สำหรับสร้าง UI แบบ Virtual DOM"],
  "Hono เป็น unopinionated web framework แรงบันดาลใจจาก Express แต่เน้นความเร็ว มี adapters หลาย runtime");

Q("rest", "Framework ใดในสไลด์ที่ถูกอธิบายว่า \"opinionated, battery included\" และออกแบบแบบ MVC คล้าย Laravel?",
  "Adonis.js",
  ["Elysia.js", "Express.js", "Hono"],
  "Adonis.js คล้าย Laravel ใช้ MVC และมีเครื่องมือครบ ส่วน Elysia เน้น type-safety, Express เน้นเรียบง่าย/ชุมชนใหญ่, Nest.js เป็น opinionated อีกตัว");

Q("rest", "ข้อใดอธิบายบทบาทของ Vite ได้ถูกต้อง?",
  "เป็น Build tool ที่มี compiler/bundler และ dev server พร้อม HMR ในตัว ใช้ร่วมกับ React, Vue, Svelte",
  ["เป็น UI library ที่ใช้ JSX และ Virtual DOM", "เป็น database migration tool", "เป็น cloud platform สำหรับ deploy serverless"],
  "React คือ UI library ส่วน Vite เป็นเครื่องมือ build/dev server ไม่ใช่ library UI");

Q("rest", "ในสไลด์ Week 2 ข้อใดเป็นวิธี \"Polling\" เพื่อรับข้อมูล (เกือบ) real-time?",
  "Client ส่ง request ไปถาม Server ซ้ำๆ (Short/Long Polling)",
  ["Server เปิด Full-duplex socket ผ่าน ws://", "Client subscribe topic กับ MQTT Broker", "Server ใช้ UDP ส่งข้อมูลให้ client โดยตรง"],
  "Polling คือ client เป็นฝ่ายถามเอง ส่วน WebSocket/Pushing คือ server ส่งข้อมูลให้");

Q("rest", "คุณสมบัติของ WebSocket ข้อใดถูกต้อง?",
  "Full-duplex, real-time, ทำงานบน TCP โดยเริ่มจาก HTTP Upgrade handshake และใช้ ws:// หรือ wss://",
  ["Half-duplex และทำงานบน UDP", "ต้องส่ง HTTP request ใหม่ทุกครั้งที่ต้องการข้อมูล", "ใช้ได้เฉพาะระหว่าง server กับ server"],
  "WebSocket เริ่มด้วย HTTP handshake แล้ว Upgrade เป็น WebSocket สื่อสารสองทางบน TCP");

Q("rest", "Vercel ในสไลด์ Week 1 คืออะไร?",
  "Cloud platform สำหรับ deploy static website และ serverless function มี free tier และ CI/CD",
  ["โปรแกรมจัดการ database (เหมือน DBeaver)", "MQTT broker ของ KMITL", "Code editor ที่แนะนำสำหรับ lab"],
  "Vercel ใช้ deploy แอป ส่วน DBeaver/HeidiSQL/Navicat คือ Database manager และ VS Code คือ IDE");

Q("rest", "ข้อใดอยู่ในหัวข้อที่ต้องทำต่อใน Backend (Error Handling ฯลฯ) ตามสไลด์ Week 1 ท้ายเอกสาร?",
  "CORS, User Authentication, Database Migration",
  ["LoRa Spreading Factor, Fresnel zone, ADR", "QoS 0/1/2, LWT, Keep Alive", "Exchange, Binding, Routing key"],
  "ท้ายสไลด์ Week 1 รายการหัวข้อ: Error Handling, CORS, User Authentication, Database Migration");

Q("rest", "ถ้า Week 2 ต้องแสดงข้อมูลจากเซนเซอร์บนเว็บแบบ near real-time วิธีใดที่สไลด์ระบุให้ใช้ดึงข้อมูลจาก Web Server?",
  "WebSocket หรือ Polling",
  ["Port forwarding", "SPI / I2C", "Chirp Spread Spectrum"],
  "Example Web Service with Data from Sensor: 'Use WebSocket or Polling to get (near) real-time data from Web Server'");

/* ===================== MQTT (15) ===================== */
Q("mqtt", "MQTT ย่อมาจากอะไร?",
  "Message Queuing Telemetry Transport",
  ["Multi-Queue Transfer Technology", "Machine Query Transfer Time", "Message Queue Transmission Table"],
  "MQTT = Message Queuing Telemetry Transport");

Q("mqtt", "MQTT ถูกคิดค้นโดยใครและเมื่อใด?",
  "Andy Stanford-Clark (IBM) และ Arlen Nipper (Eurotech) ปี 1999",
  ["Nicolas Sornin และ Olivier Seller ปี 2009", "Guido van Rossum ปี 1989", "Philips Semiconductors ปี 1982"],
  "MQTT เดิมออกแบบสำหรับ link ผ่านดาวเทียมของท่อส่งน้ำมัน (oil pipeline)");

Q("mqtt", "ข้อใดเป็นรูปแบบการสื่อสารหลักของ MQTT?",
  "Publish/Subscribe ผ่าน Broker แบบ asynchronous",
  ["Request/Response โดยตรงระหว่าง client กับ server", "Point-to-point ผ่าน UDP", "Broadcast ทุกอุปกรณ์ในเครือข่ายโดยไม่มี broker"],
  "MQTT ใช้ Broker เป็นตัวกลาง Publisher ส่งไปยัง topic และ Subscriber ที่ subscribe topic จะได้รับ");

Q("mqtt", "ข้อดีด้าน Overhead ของ MQTT คืออะไร?",
  "Fixed header เล็กเพียง 2 bytes ประหยัด bandwidth",
  ["Header ใหญ่ 100 bytes เพื่อความปลอดภัย", "ไม่มี header เลย", "Header ขนาดแปรผันตามขนาด payload เสมอ"],
  "MQTT Header ขั้นต่ำ 2 bytes และใช้ Persistent TCP connection");

Q("mqtt", "Topic ใน MQTT คืออะไร?",
  "สตริง UTF-8 ที่ Broker ใช้กรองข้อความ แบ่งเป็นหลาย level ด้วยเครื่องหมาย /",
  ["หมายเลขพอร์ตของ Broker", "ID แบบตัวเลข 16 บิตของ client", "ชื่อ queue ที่เก็บข้อความถาวร"],
  "Topic เช่น home/livingroom/temp แต่ละ level คั่นด้วย forward slash");

Q("mqtt", "QoS 0 ของ MQTT หมายถึงข้อใด?",
  "At most once — ส่งแบบ best effort ไม่มี ACK และไม่ส่งซ้ำ",
  ["At least once — ส่งซ้ำจนกว่าจะได้ PUBACK", "Exactly once — ใช้ handshake 4 ขั้น", "ส่งโดยเข้ารหัสด้วย TLS"],
  "QoS 0 เร็วที่สุด overhead ต่ำสุด แต่ข้อความอาจหาย");

Q("mqtt", "QoS 1 ใช้ข้อความ acknowledgement ชื่ออะไร?",
  "PUBACK",
  ["PUBREC", "PUBCOMP", "PINGRESP"],
  "QoS 1 (at least once): ผู้ส่งเก็บข้อความไว้จนกว่าจะได้ PUBACK อาจเกิดข้อความซ้ำ (duplicate)");

Q("mqtt", "ลำดับ packet ของ QoS 2 (Exactly once) ที่ถูกต้องคือข้อใด?",
  "PUBLISH → PUBREC → PUBREL → PUBCOMP",
  ["PUBLISH → PUBACK", "PUBLISH → PUBCOMP → PUBREC → PUBREL", "PUBREL → PUBLISH → PUBACK → PUBCOMP"],
  "QoS 2 ใช้ handshake 4 ขั้น: Publish, Publish Received, Publish Release, Publish Complete ช้าที่สุดแต่ไม่ซ้ำ");

Q("mqtt", "Publisher ส่งด้วย QoS 2 แต่ Subscriber subscribe ด้วย QoS 1 ข้อความที่ส่งถึง Subscriber จะใช้ QoS เท่าใด?",
  "QoS 1",
  ["QoS 2", "QoS 0", "QoS 3"],
  "Effective QoS = min(Publish QoS, Subscribe QoS) = min(2,1) = 1");

Q("mqtt", "Retain flag ใน MQTT ทำหน้าที่อะไร?",
  "Broker เก็บข้อความล่าสุดของ topic ไว้ ส่งให้ subscriber ใหม่ทันทีที่ subscribe",
  ["บังคับให้ข้อความถูกส่งซ้ำทุก 60 วินาที", "เข้ารหัสข้อความ", "ป้องกันไม่ให้ subscriber อื่นรับข้อความ"],
  "Retained message = last known good value ของ topic นั้น");

Q("mqtt", "Last Will and Testament (LWT) ทำงานเมื่อใด?",
  "เมื่อ client หลุดการเชื่อมต่อแบบไม่ปกติ เช่น network ล่ม หรือ keep-alive หมดเวลา Broker จะ publish will message",
  ["เมื่อ client ส่ง DISCONNECT ตามปกติเสมอ", "เมื่อ client subscribe topic ใหม่", "ทุกครั้งที่ client publish ข้อความ"],
  "LWT ตั้งไว้ตอน CONNECT ใช้แจ้งสถานะ offline ของอุปกรณ์ ตัวอย่างในแล็บใช้ will_set(\"test/status\", \"offline\")");

Q("mqtt", "ถ้า Keep Alive = 60 วินาที และ client ไม่มี packet อื่นส่ง client ต้องทำอย่างไรเพื่อรักษาการเชื่อมต่อ?",
  "ส่ง PINGREQ ให้ Broker และรอรับ PINGRESP",
  ["ส่ง PUBREL", "เชื่อมต่อใหม่ทุก 60 วินาที", "ส่ง UNSUBSCRIBE"],
  "ถ้า Broker ไม่ได้รับ packet ภายใน ~1.5 เท่าของ Keep Alive จะถือว่า client หลุดและ trigger LWT");

Q("mqtt", "การเก็บ Session ไว้เมื่อ subscriber ออฟไลน์ (MQTT v5) ต้องตั้งค่าอย่างไร?",
  "ใช้ Client ID คงที่, clean_start=False และกำหนด Session Expiry Interval",
  ["ใช้ Client ID สุ่มทุกครั้ง และ clean_start=True", "ตั้ง retain=True ที่ subscriber", "ตั้ง QoS 0 ที่ publisher"],
  "ตามโค้ด sub_session.py: client_id=\"panwit-sub\", protocol=MQTTv5, clean_start=False, SessionExpiryInterval=3600");

Q("mqtt", "โค้ด Python (paho-mqtt) ข้อใดใช้ subscribe topic \"test/pub\" ด้วย QoS 1?",
  "mqttc.subscribe(\"test/pub\", qos=1)",
  ["mqttc.publish(\"test/pub\", qos=1)", "mqttc.will_set(\"test/pub\", qos=1)", "mqttc.connect(\"test/pub\", 1)"],
  "subscribe() ใช้รับข้อความ ต้องเรียก loop_forever() เพื่อให้ callback on_message ทำงาน");

Q("mqtt", "\"Payload agnostic\" ของ MQTT หมายความว่าอย่างไร?",
  "MQTT ไม่สนใจชนิดข้อมูลใน payload จะเป็น String, JSON, XML หรือ binary ก็ได้ (array of bytes)",
  ["Payload ต้องเป็น JSON เท่านั้น", "Payload จำกัดขนาดไม่เกิน 2 bytes", "Payload ถูกเข้ารหัสอัตโนมัติ"],
  "MQTT มองว่า payload เป็น array of bytes");

/* ===================== AMQP · RabbitMQ (10) ===================== */
Q("amqp", "AMQP ย่อมาจากอะไร และเป็นโปรโตคอลแบบใด?",
  "Advanced Message Queuing Protocol — Message-Oriented Middleware",
  ["Asynchronous Memory Query Protocol — Database protocol", "Automatic Message Queue Process — Web protocol", "Advanced MQTT Packet — Transport layer protocol"],
  "AMQP เป็น Message-Oriented Middleware ตัวอย่างซอฟต์แวร์คือ RabbitMQ");

Q("amqp", "ข้อดีของ Message-Oriented Middleware เทียบกับ Direct Communication คืออะไร?",
  "ใช้ Queue เป็น buffer สื่อสารแบบ asynchronous ลดปัญหา server overload เมื่อ consumer ยังไม่พร้อม",
  ["Producer ต้องรอ Consumer ตอบทันทีเสมอ", "ลดจำนวน component ในระบบ", "ไม่จำเป็นต้องมี broker"],
  "Producer และ Consumer ไม่ต้องออนไลน์พร้อมกัน ข้อความถูกเก็บใน Queue");

Q("amqp", "ใน AMQP Producer ส่งข้อความไปที่ส่วนใดก่อน?",
  "Exchange",
  ["Queue โดยตรง", "Consumer โดยตรง", "Binding"],
  "Producer → Exchange → (ตาม Binding) → Queue → Consumer");

Q("amqp", "Binding ทำหน้าที่อะไร?",
  "เชื่อม Exchange กับ Queue โดยใช้ Binding key เพื่อกำหนดว่าข้อความไหนเข้า Queue ใด",
  ["เก็บข้อความถาวรบนดิสก์", "ยืนยันการรับข้อความของ consumer", "เข้ารหัสข้อความ"],
  "Exchange เทียบ Routing key ของข้อความกับ Binding key เพื่อเลือก Queue");

Q("amqp", "Exchange type ใดส่งข้อความไปยังทุก Queue ที่ผูกอยู่โดยไม่สนใจ routing key?",
  "Fanout",
  ["Direct", "Topic", "Headers"],
  "Fanout = broadcast ไปทุก Queue");

Q("amqp", "Topic exchange: pattern \"sports.*\" จะ match routing key ข้อใด?",
  "sports.tennis",
  ["sports", "sports.tennis.mens", "news.sports"],
  "* match พอดี 1 คำ, # match 0 คำขึ้นไป ดังนั้น sports.# จึง match ทั้ง sports, sports.tennis, sports.tennis.mens");

Q("amqp", "Topic exchange: pattern \"sports.#\" จะ match routing key ข้อใดได้บ้าง?",
  "ทั้ง sports และ sports.tennis",
  ["เฉพาะ sports.tennis", "เฉพาะ sports", "ไม่ match ข้อใดเลย"],
  "# (hash) match ศูนย์คำหรือมากกว่า");

Q("amqp", "Headers exchange ใช้อะไรในการ route และ x-match: all ต่างจาก any อย่างไร?",
  "ใช้ header properties ของข้อความ; all = ต้อง match ทุก property, any = match อย่างน้อยหนึ่ง property",
  ["ใช้ routing key; all = ทุก queue, any = queue เดียว", "ใช้ขนาดข้อความ; all = ข้อความใหญ่, any = ข้อความเล็ก", "ใช้ IP address ของ producer"],
  "Headers exchange ไม่ใช้ routing key ตัวอย่าง header: genre='fantasy', author='...'");

Q("amqp", "ใน RabbitMQ ความแตกต่างระหว่าง Durable กับ Transient คืออะไร?",
  "Durable ยังคงอยู่หลัง RabbitMQ restart ส่วน Transient จะหายไป (แต่ข้อความต้องตั้ง Persistent เองด้วยจึงจะไม่หาย)",
  ["Durable หายเมื่อ restart ส่วน Transient คงอยู่", "Durable ใช้กับ Fanout เท่านั้น", "ไม่มีความแตกต่าง"],
  "Note ในสไลด์: Durable แล้วข้อความก็ยังต้อง Persistent ด้วย");

Q("amqp", "ใน library pika ฟังก์ชันใดใช้ส่ง message และฟังก์ชันใดใช้ ack หลัง consumer ประมวลผลสำเร็จ?",
  "basic_publish() และ basic_ack()",
  ["basic_consume() และ basic_nack()", "queue_declare() และ exchange_declare()", "channel() และ BlockingConnection()"],
  "basic_consume ใช้เริ่มรับข้อความ, basic_nack ใช้ปฏิเสธ/ให้ retry, exchange_declare/queue_declare ใช้สร้าง exchange/queue");

/* ===================== CoAP (13) ===================== */
Q("coap", "CoAP ย่อมาจากอะไร และออกแบบมาเพื่ออะไร?",
  "Constrained Application Protocol — สำหรับอุปกรณ์ IoT ที่ทรัพยากรจำกัด (พลังงาน/หน่วยความจำต่ำ)",
  ["Controlled Access Port — สำหรับ firewall", "Common Application Packet — สำหรับ Web server ขนาดใหญ่", "Constrained Audio Protocol — สำหรับสตรีมเสียง"],
  "CoAP ถูกกำหนดใน RFC 7252 (IETF) ใช้ได้กับ Arduino, ESP8266, ESP32");

Q("coap", "CoAP ใช้ transport layer ใด?",
  "UDP",
  ["TCP", "SCTP", "ICMP"],
  "CoAP ทำงานบน UDP (IPv4/IPv6) เพื่อลด overhead ต่างจาก MQTT ที่ใช้ TCP");

Q("coap", "รูปแบบสถาปัตยกรรมของ CoAP คืออะไร?",
  "Client–Server แบบ Request/Response คล้าย HTTP และเข้าถึง Resource ผ่าน URI",
  ["Publish/Subscribe ผ่าน Broker", "Peer-to-peer แบบ mesh เท่านั้น", "Message Queue ผ่าน Exchange"],
  "ตัวอย่าง URI: coap://192.168.1.10/led — ต่างจาก MQTT ที่เป็น Pub/Sub");

Q("coap", "CoAP method ใดเหมาะกับการ \"สั่งเปิด/ปิด LED\" (แก้ไขสถานะ resource /led)?",
  "PUT",
  ["GET", "DELETE", "OBSERVE"],
  "GET อ่านค่า, POST สร้าง, PUT แก้ไข/ตั้งค่า, DELETE ลบ");

Q("coap", "Response code 2.05 ของ CoAP หมายถึงอะไร?",
  "Content — ตอบกลับสำหรับ GET สำเร็จ (เช่น GET /temperature)",
  ["Changed — ตอบกลับสำหรับ PUT", "Not Found", "Created"],
  "2.01 Created (POST), 2.02 Deleted (DELETE), 2.03 Valid, 2.04 Changed (PUT), 2.05 Content (GET)");

Q("coap", "Response code 2.04 ใช้ตอบกลับเมื่อใด?",
  "Resource ถูกเปลี่ยนแปลงสำเร็จ เช่น PUT /led",
  ["Resource ถูกสร้างใหม่", "ไม่พบ resource", "Server ล่ม"],
  "2.04 Changed ในตัวอย่างโค้ด LEDResource.render_put ตอบ Code.CHANGED พร้อม payload b\"OK\"");

Q("coap", "Response code 4.04 หมายถึงอะไร?",
  "Not Found — ไม่พบ resource",
  ["Forbidden", "Method Not Allowed", "Bad Gateway"],
  "4.03 Forbidden, 4.05 Method Not Allowed, 5.02 Bad Gateway");

Q("coap", "Response code ที่ขึ้นต้นด้วย 5.xx หมายถึงข้อใด?",
  "Server Error เช่น 5.00 Internal Server Error, 5.03 Service Unavailable",
  ["Client Error", "Success", "Redirection"],
  "2.xx = สำเร็จ, 4.xx = Client Error, 5.xx = Server Error");

Q("coap", "ฟีเจอร์ Observe ของ CoAP คืออะไร?",
  "Client \"subscribe\" resource เพื่อให้ Server ส่ง notification เมื่อสถานะ resource เปลี่ยน",
  ["Server ตรวจสอบสถานะ client ทุก 1 วินาที", "การเข้ารหัสด้วย DTLS", "การลบ resource อัตโนมัติ"],
  "Observe ทำให้ CoAP ได้ผลคล้าย publish/subscribe สำหรับค่าเซนเซอร์แบบ real-time");

Q("coap", "ใน aiocoap เมธอดใดของ Resource class ถูกเรียกเมื่อมี GET request?",
  "render_get(self, request)",
  ["on_get()", "handle_get()", "do_get()"],
  "มี render_get / render_post / render_put / render_delete ตามชื่อ method");

Q("coap", "ในโค้ด aiocoap ข้อใดเป็นการสร้าง CoAP Server context?",
  "Context.create_server_context(root, bind=(\"192.168.1.100\", 5683))",
  ["Context.create_client_context()", "root.add_resource()", "protocol.request(request).response"],
  "create_server_context ใช้ทำ server ส่วน create_client_context ใช้ฝั่ง client; พอร์ตมาตรฐานของ CoAP คือ 5683");

Q("coap", "ใน Arduino library coap-simple ฟังก์ชันใดต้องเรียกใน loop() เพื่อประมวลผล packet?",
  "coap.loop()",
  ["coap.start()", "coap.server()", "coap.observe()"],
  "coap.start() เริ่ม server, coap.loop() ประมวลผล packet, coap.server(callback, \"resource\") ลงทะเบียน resource");

Q("coap", "ใน aiocoap ถ้าต้องการให้ GET เป็นแบบ Observe ฝั่ง client ต้องตั้ง option ใด?",
  "request.opt.observe = 0",
  ["request.opt.observe = 1", "request.code = Code.OBSERVE", "request.payload = b\"observe\""],
  "ตั้ง Observe option = 0 ใน GET เพื่อลงทะเบียน (register)");

/* ===================== Telecom · LoRa · LoRaWAN (18) ===================== */
Q("lora", "LoRa ใช้เทคนิค modulation แบบใด?",
  "Chirp Spread Spectrum (CSS)",
  ["Frequency Shift Keying (FSK) เท่านั้น", "Amplitude Modulation (AM)", "OFDM"],
  "LoRa เป็น proprietary modulation ของ Semtech บนพื้นฐาน CSS");

Q("lora", "ความสัมพันธ์ระหว่าง LoRa กับ LoRaWAN คือข้อใด?",
  "LoRa คือ Physical layer (modulation) ส่วน LoRaWAN คือ network protocol (device, gateway, security, uplink/downlink)",
  ["LoRa คือ network protocol ส่วน LoRaWAN คือ chip", "ทั้งสองเป็นสิ่งเดียวกัน", "LoRaWAN คือ modulation ส่วน LoRa คือ server"],
  "LoRa + Network protocol = LoRaWAN โดย LoRa Alliance เปิดตัว LoRaWAN ปี 2015");

Q("lora", "Spreading Factor (SF) สูงขึ้น (เช่น SF7 → SF12) ส่งผลอย่างไร?",
  "ระยะไกลขึ้น และ sensitivity ดีขึ้น แต่ bit rate ลดลงและ Time on Air นานขึ้น",
  ["ระยะใกล้ลง bit rate สูงขึ้น", "Bit rate สูงขึ้นและ Time on Air สั้นลง", "ไม่มีผลต่อระยะและเวลา"],
  "SF สูง = chirp ยาวขึ้น (SF12 ≈ 32.768 ms vs SF7 ≈ 1.024 ms ตามสไลด์) ได้ระยะไกลแต่ช้า");

Q("lora", "เมื่อ SF = 7 หนึ่ง Symbol มีกี่ chip และแทนข้อมูลกี่ bit?",
  "128 chips และ 7 bits",
  ["7 chips และ 128 bits", "64 chips และ 6 bits", "256 chips และ 8 bits"],
  "จำนวน chip ต่อ symbol = 2^SF = 2^7 = 128 และ SF = จำนวน bit ต่อ symbol");

Q("lora", "ถ้า Bandwidth = 125 kHz และ SF = 7 Symbol rate เท่ากับเท่าใด?",
  "125,000 / 128 ≈ 976.56 symbols/s",
  ["125,000 × 128 symbols/s", "125,000 / 7 symbols/s", "128 / 125,000 symbols/s"],
  "Chip rate = BW = 125,000 chips/s; Symbol rate = Chip rate / 2^SF; Bit rate = SF × Symbol rate; Data rate = Bit rate × Code rate");

Q("lora", "Bit rate (ก่อนคูณ Code Rate) ของ LoRa ที่ BW = 125 kHz, SF = 7 คือเท่าใด?",
  "7 × (125,000/128) ≈ 6,836 bps",
  ["125,000 bps", "7 × 125,000 bps", "128 × 7 bps"],
  "Bit rate = SF × (BW / 2^SF) = 7 × 976.56 ≈ 6,836 bps");

Q("lora", "Coding Rate (CR) 4/5, 4/6, 4/7, 4/8 ของ LoRa เกี่ยวข้องกับอะไร?",
  "Forward Error Correction (เพิ่ม bit แก้ไขข้อผิดพลาด) — ค่ายิ่งมาก (4/8) ทนต่อ error ได้ดีแต่ส่งช้ากว่า",
  ["การเข้ารหัสลับ AES", "การเลือกช่องความถี่", "กำลังส่ง (TX Power)"],
  "ตัวอย่างในสไลด์: CR = 5/7 หมายถึง bit ข้อมูล 5 bit และ bit error correction 2 bit");

Q("lora", "ย่านความถี่ ISM Band คืออะไร?",
  "ช่วงความถี่ที่สงวนทั่วโลกสำหรับงานอุตสาหกรรม วิทยาศาสตร์ และการแพทย์ (ไม่ใช่โทรคมนาคม) ใช้ได้โดยไม่ต้องขอใบอนุญาต (unlicensed)",
  ["ย่านที่ต้องประมูลคลื่นความถี่เท่านั้น", "ย่านความถี่เฉพาะของโทรศัพท์มือถือ 5G", "ย่านความถี่ของเรดาร์ทหาร"],
  "ISM = Industrial, Scientific, and Medical");

Q("lora", "การเพิ่ม Bandwidth ของ LoRa (เช่น 125 → 500 kHz) ส่งผลอย่างไร?",
  "Data rate สูงขึ้น Time on Air สั้นลง แต่ sensitivity แย่ลง (รับ noise มากขึ้น)",
  ["Data rate ลดลงและระยะไกลขึ้น", "Sensitivity ดีขึ้นทุกกรณี", "ไม่มีผลต่อ chip rate"],
  "Bandwidth กว้าง = noise เข้ามากขึ้น sensitivity แย่ลง; Chip rate = Bandwidth");

Q("lora", "Link Margin คำนวณจากสูตรใด?",
  "Link Margin = RSSI − Receiver Sensitivity",
  ["Link Margin = RSSI + Sensitivity", "Link Margin = SF × BW", "Link Margin = TX Power / Path Loss"],
  "ถ้า RSSI สูงกว่า Sensitivity (Link Margin เป็นบวก) แสดงว่า demodulate ได้");

Q("lora", "Fresnel Zone เกี่ยวข้องกับสิ่งใดในการติดตั้ง End Node และ Gateway?",
  "บริเวณรอบเส้น Line of Sight ที่ควรปราศจากสิ่งกีดขวาง (อย่างน้อยประมาณ 60% ของรัศมีโล่ง; สไลด์ระบุสิ่งกีดขวางไม่ควรเกิน 40%)",
  ["ความถี่ที่ใช้ใน Class C", "ขนาดของ payload", "ระยะเวลา OTAA join"],
  "ต้องคำนึงถึง Fresnel zone radius และ Earth Curvature Allowance (เช่น ระยะ 30 km ≈ 13.2 m)");

Q("lora", "ข้อใดเป็นองค์ประกอบของโครงสร้าง LoRaWAN ตามลำดับการไหลของข้อมูล uplink?",
  "End device → Gateway → Network Server → Application Server",
  ["End device → Application Server → Gateway → Network Server", "Gateway → End device → Network Server", "Network Server → End device → Application Server → Gateway"],
  "Gateway แปลง RF เป็น IP packet ส่งไป Network Server ซึ่งส่ง payload ต่อให้ Application Server");

Q("lora", "End device Class A ทำงานอย่างไร?",
  "ส่ง uplink ได้ทุกเวลา แล้วเปิดช่วงรับ downlink สั้นๆ 2 ช่วงหลังส่ง — ประหยัดพลังงานที่สุด",
  ["เปิดรับ downlink ตลอดเวลา", "รับ downlink ตาม beacon ที่ sync กับ gateway", "ไม่สามารถส่ง uplink ได้"],
  "Class B = มี beacon จัดเวลารับ downlink เป็นระยะ; Class C = เปิดรับตลอด (กินพลังงานสูงสุด) ยกเว้นขณะส่ง");

Q("lora", "End device Class C มีลักษณะใด?",
  "เปิดรับ downlink ตลอดเวลา (ยกเว้นขณะส่ง uplink) ใช้พลังงานมากที่สุด",
  ["Sleep เกือบตลอดเวลา", "รับ downlink เฉพาะช่วง beacon", "ไม่รองรับ downlink"],
  "Class A < Class B < Class C ในด้านการใช้พลังงาน");

Q("lora", "Join procedure ของ LoRaWAN มีวิธีใดบ้าง?",
  "OTAA (Over The Air Activation) และ ABP (Activation By Personalization)",
  ["PSK และ ECDSA", "OTAA และ CSMA/CA", "ABP และ TCP handshake"],
  "OTAA ใช้ DevEUI, AppEUI/JoinEUI, AppKey ทำ join request/accept");

Q("lora", "การเข้ารหัส payload ระหว่าง End device กับ Application Server ใช้กุญแจใด?",
  "AppSKey (Application Session Key) แบบ AES-128",
  ["NwkSKey ที่ Gateway ถอดรหัสได้", "RSA-2048 public key", "ไม่มีการเข้ารหัส"],
  "Gateway เห็นเพียง metadata (RSSI, SNR ฯลฯ) ส่วน payload ถอดรหัสที่ Application Server");

Q("lora", "ใน ChirpStack topic ที่ใช้ subscribe รับข้อมูล uplink ของ device คือข้อใด?",
  "application/{application_id}/device/{device_eui}/event/up",
  ["application/{application_id}/device/{device_eui}/command/down", "device/{device_eui}/uplink", "lora/up/{gateway_id}"],
  "ส่วน downlink publish ที่ .../command/down โดย payload JSON มี devEui, confirmed, fPort, data (Base64)");

Q("lora", "ในการ publish downlink ผ่าน ChirpStack ฟิลด์ \"data\" ต้องอยู่ในรูปแบบใด?",
  "Base64 encoded (เช่น ON = \"T04=\", OFF = \"T0ZG\")",
  ["ข้อความธรรมดา \"ON\"", "Hex string", "Binary 8 bit"],
  "confirmed=true ให้ device ตอบ ACK, false ไม่ต้องตอบ; fPort คือ application port");

/* ===================== Wi-Fi (17) ===================== */
Q("wifi", "Wi-Fi 6 มาตรฐาน IEEE ใดและ Wi-Fi 7 มาตรฐาน IEEE ใด?",
  "802.11ax และ 802.11be",
  ["802.11ac และ 802.11ax", "802.11n และ 802.11ac", "802.11be และ 802.11ax"],
  "Wi-Fi 4 = 802.11n, Wi-Fi 5 = 802.11ac, Wi-Fi 6 = 802.11ax, Wi-Fi 6E = 802.11ax บน 6 GHz, Wi-Fi 7 = 802.11be");

Q("wifi", "ใครรับผิดชอบการตั้งชื่อ Wi-Fi 4/5/6 และการรับรองผลิตภัณฑ์?",
  "Wi-Fi Alliance (ส่วน IEEE เป็นผู้พัฒนามาตรฐาน)",
  ["IEEE", "IETF", "ITU เท่านั้น"],
  "IEEE ทำมาตรฐาน; Wi-Fi Alliance ทำ branding และ certification");

Q("wifi", "Wi-Fi 6E ต่างจาก Wi-Fi 6 อย่างไร?",
  "Wi-Fi 6E ทำงานบนย่านความถี่ 6 GHz เพิ่มเติม",
  ["Wi-Fi 6E ใช้ 1024-QAM แต่ Wi-Fi 6 ใช้ 256-QAM", "Wi-Fi 6E ใช้มาตรฐาน 802.11be", "Wi-Fi 6E ทำงานเฉพาะ 2.4 GHz"],
  "Wi-Fi 6E = 802.11ax operating in 6 GHz");

Q("wifi", "จำนวน bit ต่อ symbol ของ 256-QAM และ 1024-QAM คือเท่าใดตามลำดับ?",
  "8 bits และ 10 bits",
  ["6 bits และ 8 bits", "10 bits และ 12 bits", "4 bits และ 6 bits"],
  "BPSK 1, QPSK 2, 16QAM 4, 64QAM 6, 256QAM 8, 1024QAM 10, 4096QAM 12");

Q("wifi", "Wi-Fi 7 ใช้ modulation สูงสุดใด?",
  "4096-QAM (4K-QAM) 12 bits ต่อ tone",
  ["1024-QAM", "256-QAM", "64-QAM"],
  "Wi-Fi 5 = 256-QAM, Wi-Fi 6 = 1024-QAM, Wi-Fi 7 = 4096-QAM (ต้องการ SNR สูงกว่า)");

Q("wifi", "ในแต่ละรุ่น Wi-Fi ชื่อ PHY (Physical layer) ที่ถูกต้องคือข้อใด?",
  "Wi-Fi 4 = HT, Wi-Fi 5 = VHT, Wi-Fi 6 = HE, Wi-Fi 7 = EHT",
  ["Wi-Fi 4 = VHT, Wi-Fi 5 = HT, Wi-Fi 6 = EHT, Wi-Fi 7 = HE", "Wi-Fi 4 = HE, Wi-Fi 5 = HT, Wi-Fi 6 = VHT, Wi-Fi 7 = EHT", "Wi-Fi 4 = EHT, Wi-Fi 5 = HE, Wi-Fi 6 = HT, Wi-Fi 7 = VHT"],
  "HT = High Throughput, VHT = Very High Throughput, HE = High Efficiency, EHT = Extremely High Throughput");

Q("wifi", "Free Space Path Loss: เมื่อระยะทางเพิ่มเป็น 2 เท่า สัญญาณลดลงประมาณกี่ dB?",
  "6 dB",
  ["3 dB", "10 dB", "20 dB"],
  "ระยะ ×2 = −6 dB, ระยะ ×10 = −20 dB (Inverse square law)");

Q("wifi", "ตามกฎของสไลด์ การเดินทางของสัญญาณในอวกาศเสรีระยะ 100 m (หลังเมตรแรก) จะสูญเสียกี่ dB?",
  "40 dB",
  ["20 dB", "60 dB", "12 dB"],
  "100 m = 10 × 10 → 20 dB + 20 dB = 40 dB");

Q("wifi", "ตัวอย่างในสไลด์: สัญญาณเดินทาง 800 m ในอวกาศเสรี (หลังเมตรแรก) loss รวมเท่าใด?",
  "58 dB",
  ["40 dB", "46 dB", "66 dB"],
  "800 = 10×10×2×2×2 → 20+20+6+6+6 = 58 dB (ที่ 2.4 GHz รวม loss เมตรแรก −40 dB เป็น −98 dB)");

Q("wifi", "ข้อใดถูกต้องเกี่ยวกับ Free Space Path Loss ใน 1 เมตรแรกเมื่อเทียบความถี่?",
  "ความถี่สูงขึ้น loss ใน 1 เมตรแรกมากขึ้น (2.4 GHz ≈ −40 dB, 5 GHz ≈ −47 dB, 6 GHz ≈ −48 dB)",
  ["ทุกความถี่ loss เท่ากันที่ −40 dB", "ความถี่สูงขึ้น loss น้อยลง", "ขึ้นกับสีของเสาอากาศเท่านั้น"],
  "FSPL ขึ้นกับความถี่และระยะ");

Q("wifi", "EIRP สูงสุดตามข้อกำหนดของ NBTC (ประเทศไทย) สำหรับย่าน 2.4 GHz คือเท่าใด?",
  "100 mW (20 dBm)",
  ["200 mW (23 dBm)", "500 mW (27 dBm)", "250 mW (24 dBm)"],
  "ตามสไลด์: 2.400–2.483 GHz = 100 mW; 5.150–5.350 = 200 mW; 5.470–5.725 = 500 mW; 5.925–6.425 = 250 mW");

Q("wifi", "ช่องสัญญาณ 20 MHz ที่ไม่ซ้อนทับกันในย่าน 2.4 GHz มีกี่ช่อง?",
  "3 ช่อง (1, 6, 11)",
  ["6 ช่อง", "13 ช่อง", "1 ช่อง"],
  "2.4 GHz มีช่องที่ใช้งานได้จริงน้อย จึงเกิด Co-Channel Interference (CCI) สูง ควรผลัก client ไปใช้ 5/6 GHz");

Q("wifi", "ข้อใดคือเทคโนโลยี Multi-User ของ Wi-Fi 6?",
  "MU-MIMO และ OFDMA",
  ["MLO และ Puncturing", "CSMA/CA และ DSSS", "320 MHz และ 4K-QAM"],
  "OFDMA แบ่ง channel เป็น Resource Unit (RU) ให้หลาย user ใช้พร้อมกัน");

Q("wifi", "ข้อใดอธิบาย OFDMA ได้ถูกต้อง?",
  "แบ่ง channel เป็น sub-channel (Resource Unit) ให้หลายผู้ใช้ส่ง/รับพร้อมกันใน channel เดียวกัน",
  ["ให้ผู้ใช้คนเดียวใช้ channel เต็มความกว้างในเวลาหนึ่ง", "ใช้หลายเสาอากาศเพื่อเพิ่ม gain เท่านั้น", "เพิ่ม bit ต่อ symbol เป็น 12 bits"],
  "OFDM = 1 user ต่อ channel ต่อครั้ง; OFDMA = หลาย user ผ่าน RU");

Q("wifi", "Multi-Link Operation (MLO) เป็นฟีเจอร์ของ Wi-Fi รุ่นใด และทำอะไร?",
  "Wi-Fi 7 — ใช้หลาย link/band พร้อมกันหรือสลับ เพื่อเพิ่ม throughput ลด latency และเพิ่มความน่าเชื่อถือ",
  ["Wi-Fi 5 — เพิ่ม modulation เป็น 256-QAM", "Wi-Fi 6 — แบ่ง RU", "Wi-Fi 4 — ใช้ MIMO ครั้งแรก"],
  "MLO มี Alternating (สลับ link) และ Concurrent (รวมหลาย band); ความแตกต่างหลักของ Wi-Fi 7: 320 MHz, 4K-QAM, MLO, Puncturing");

Q("wifi", "ช่องกว้างสูงสุดของ Wi-Fi 7 และใช้ได้ในย่านใด?",
  "320 MHz เฉพาะย่าน 6 GHz",
  ["160 MHz ในย่าน 5 GHz", "320 MHz ในย่าน 2.4 GHz", "80 MHz ในย่าน 6 GHz"],
  "Wi-Fi 7 ใช้ 320 MHz ได้เฉพาะ 6 GHz (ไทยมี 500 MHz ทำให้ได้ 3×160 MHz หรือ 1×320 MHz ตามสไลด์)");

Q("wifi", "ตามสไลด์ แนวทางออกแบบ Wi-Fi ที่ดีควรเน้นอะไร?",
  "ออกแบบเพื่อ Capacity ไม่ใช่แค่ Coverage ลด Co-Channel Interference และผลัก client ไป 5/6 GHz",
  ["ใช้ AP น้อยตัวที่สุดและเพิ่ม Tx power สูงสุดเพื่อให้ครอบคลุมทั้งอาคาร", "ให้ 1 AP รองรับ 100 อุปกรณ์ในห้องเรียน", "คงให้ client ทั้งหมดใช้ 2.4 GHz"],
  "Wi-Fi ทำงานเหมือน HUB (client ช้าตัวเดียวทำให้ทุกคนช้า) จึงใช้ small cell, AP ห่างกัน ~8–12 m, cell size −55 ถึง −65 dBm");

/* ===================== Raspberry Pi · GPIO · ADC · PWM (12) ===================== */
Q("pi", "Raspberry Pi 4 Model B มี GPIO กี่ pin?",
  "40 pin",
  ["26 pin", "20 pin", "64 pin"],
  "Pi 4 เปิดตัว June 2019 CPU 1.5 GHz Cortex-A72 quad-core; Pi 3 และ Pi 4 ต่างก็มี 40 GPIO pins");

Q("pi", "ข้อใดเป็นเครื่องมือที่ใช้เขียน OS ลง microSD card ของ Raspberry Pi?",
  "Raspberry Pi Imager",
  ["PuTTY", "DBeaver", "Vite"],
  "PuTTY ใช้ SSH เข้าเครื่อง (port 22) ผ่าน raspberrypi.local หรือ IP");

Q("pi", "ในโค้ด RPi.GPIO ความแตกต่างระหว่าง GPIO.BCM กับ GPIO.BOARD คืออะไร?",
  "BCM ใช้หมายเลข GPIO ตามชิป Broadcom ส่วน BOARD ใช้หมายเลขตำแหน่ง pin บนบอร์ด",
  ["BCM ใช้กับ Pi 4 เท่านั้น ส่วน BOARD ใช้กับ Pi 3", "BCM ใช้ PWM ส่วน BOARD ใช้ Digital", "ไม่มีความแตกต่าง"],
  "เช่น GPIO4 (BCM) คือ pin 7 บนบอร์ด และ GPIO18 คือ pin 12");

Q("pi", "ถ้าต้องการให้ GPIO4 เป็นขา Input อ่านค่าสวิตช์ ต้องเขียนคำสั่งใด?",
  "GPIO.setup(4, GPIO.IN)",
  ["GPIO.output(4, GPIO.IN)", "GPIO.input(4, GPIO.OUT)", "GPIO.setmode(4)"],
  "ใช้ GPIO.input(4) อ่านค่า True/False ส่วน GPIO.output() ใช้สั่ง HIGH/LOW");

Q("pi", "วงจร Pull-up ที่ต่อ Vcc = 3.3 V ผ่าน R และต่อสวิตช์ลง GND: เมื่อสวิตช์ถูกกด Vout เป็นอะไร?",
  "LOW",
  ["HIGH", "Floating", "3.3 V"],
  "Pull-up: ไม่กด = HIGH, กด = LOW (ตรงข้ามกับ Pull-down) — ดังนั้นโค้ดตรวจ 'กดสวิตช์' ด้วย GPIO.input(...) == False");

Q("pi", "Resolution ของ ADC 12 bit แทนค่าดิจิทัลได้ตั้งแต่เท่าใดถึงเท่าใด?",
  "0 ถึง 4095",
  ["0 ถึง 4096", "0 ถึง 1023", "0 ถึง 255"],
  "ค่าที่เป็นไปได้ = 2^12 = 4096 ระดับ คือ 0..4095");

Q("pi", "MCP3208 ใช้ VREF = 3.3 V ถ้า ADC อ่านได้ 2048 แรงดันอินพุตประมาณเท่าใด?",
  "ประมาณ 1.65 V",
  ["3.3 V", "0.8 V", "2.48 V"],
  "V = ADC × 3.3 / 4096 = 2048 × 3.3/4096 = 1.65 V (1 LSB ≈ 0.8056 mV)");

Q("pi", "MCP3208 เชื่อมต่อกับ Raspberry Pi ผ่านบัสใด และมีกี่ channel?",
  "SPI, 8 channels (12-bit)",
  ["I2C, 4 channels", "UART, 8 channels", "SPI, 16 channels"],
  "ขา: CLK, DOUT, DIN, CS, DGND; sampling 100 kSample/s");

Q("pi", "ขา SPI ใดที่ Master ส่งข้อมูลออกไปยัง Slave?",
  "MOSI (Master Out Slave In)",
  ["MISO (Master In Slave Out)", "SCK", "CS"],
  "MISO = Slave→Master, MOSI = Master→Slave, SCK = นาฬิกา, CS = เลือก Slave");

Q("pi", "ในโค้ดอ่าน MCP3208 ด้วย spidev คำสั่ง spi.xfer2([6 | (channel & 4) >> 2, (channel & 3) << 6, 0]) ส่ง/รับข้อมูลกี่ byte และข้อมูล 12 bit ได้จากสูตรใด?",
  "3 byte; data = ((adc[1] & 15) << 8) + adc[2]",
  ["2 byte; data = adc[0] + adc[1]", "3 byte; data = adc[0] * adc[2]", "1 byte; data = adc[0] & 15"],
  "adc[1] เหลือเฉพาะ 4 bit ล่าง (D11–D8) shift ซ้าย 8 รวมกับ adc[2] (D7–D0)");

Q("pi", "PWM (Pulse Width Modulation) ควบคุมความสว่าง LED โดยปรับค่าใด?",
  "Duty cycle (สัดส่วนเวลา HIGH ต่อคาบ)",
  ["แรงดันของ Vcc ตรงๆ", "ความถี่ของสัญญาณ clock SPI", "ค่า Resolution ของ ADC"],
  "Duty cycle สูง = LED สว่างขึ้น");

Q("pi", "ในโค้ด RPi.GPIO ข้อใดใช้เปลี่ยน duty cycle ของ PWM instance ชื่อ p?",
  "p.ChangeDutyCycle(dc) โดย 0.0 ≤ dc ≤ 100.0",
  ["p.ChangeFrequency(dc)", "p.start(dc) ทุกครั้งที่เปลี่ยน", "p.stop(dc)"],
  "สร้างด้วย GPIO.PWM(channel, frequency), เริ่มด้วย p.start(dc), เปลี่ยนความถี่ด้วย ChangeFrequency, หยุดด้วย p.stop()");

/* ===================== Sensor · I2C (10) ===================== */
Q("sens", "Sensor กับ Transducer ต่างกันอย่างไรตามสไลด์?",
  "Sensor ตรวจจับปริมาณทางกายภาพแล้วเปลี่ยนค่าทางไฟฟ้า (เช่นความต้านทาน) ส่วน Transducer แปลงพลังงานจากรูปแบบหนึ่งเป็นอีกรูปแบบ (รวม output เช่น ลำโพง มอเตอร์ LED)",
  ["Sensor เป็น output อย่างเดียว ส่วน Transducer เป็น input อย่างเดียว", "ไม่มีความแตกต่าง", "Transducer ใช้ได้เฉพาะวงจรดิจิทัล"],
  "ตัวอย่าง Sensor: Thermistor, LDR; Transducer: Microphone, Solar cell, Speaker, Motor, LED");

Q("sens", "Thermistor แบบ NTC เมื่ออุณหภูมิเพิ่มขึ้น ค่าความต้านทานจะเป็นอย่างไร?",
  "ลดลง",
  ["เพิ่มขึ้น", "คงที่", "เป็นศูนย์"],
  "NTC = Negative Temperature Coefficient; ค่าเบต้า B ใช้ในสมการ Thermistor");

Q("sens", "โมดูลวัดระยะ HC-SR04 ต้องส่งพัลส์ TRIG HIGH นานเท่าใดเพื่อเริ่มวัด?",
  "10 ไมโครวินาที",
  ["10 มิลลิวินาที", "1 วินาที", "40 kHz ต่อเนื่อง"],
  "จากนั้นวัดความกว้างพัลส์ ECHO; distance = pulse_duration × 17150 (cm) เมื่อความเร็วเสียง 343 m/s");

Q("sens", "ทำไมต้องใช้ตัวต้านทานแบ่งแรงดัน (1k + 2k) ที่ขา ECHO ของ HC-SR04 กับ Raspberry Pi?",
  "ECHO ให้ระดับ 5 V แต่ GPIO ของ Pi ทนได้ 3.3 V จึงลดเหลือ ≈ 3.33 V",
  ["เพื่อเพิ่มความถี่ 40 kHz", "เพื่อเพิ่มระยะวัด", "เพื่อให้ ADC มี resolution มากขึ้น"],
  "Vout = 2/(1+2) × 5 V ≈ 3.33 V");

Q("sens", "ถ้า pulse ของ ECHO กว้าง 0.01 วินาที ระยะทางตามสูตรในสไลด์ (× 17150) เป็นเท่าใด?",
  "171.5 cm",
  ["17.15 cm", "1715 cm", "343 cm"],
  "distance = 0.01 × 17150 = 171.5 cm (หารสอง เพราะเสียงเดินทางไป-กลับ: 34300/2 = 17150)");

Q("sens", "I2C ใช้สายสัญญาณอะไรบ้าง?",
  "SDA (Serial Data) และ SCL (Serial Clock)",
  ["MOSI, MISO, SCK, CS", "TX และ RX", "CLK, DOUT, DIN, CS"],
  "I2C เป็น synchronous serial แบบ 2 สายพัฒนาโดย Philips ใช้ address แยก device (Master/Slave)");

Q("sens", "คำสั่งใดใช้สแกนหา I2C device และแสดง address บน bus 1 ของ Raspberry Pi?",
  "sudo i2cdetect -y 1",
  ["sudo i2cget -y 1", "sudo raspi-config nonint get_i2c", "sudo spidetect 1"],
  "I2C LCD (PCF8574) ปรากฏที่ address 0x27 และ SHT31 ที่ 0x44");

Q("sens", "จอ LCD 16x2 แบบ I2C ที่ใช้ชิป PCF8574 ใช้ library ใดใน Python ในสไลด์?",
  "RPLCD (CharLCD)",
  ["spidev", "aiocoap", "paho-mqtt"],
  "lcd = CharLCD('PCF8574', 0x27); lcd.write_string(...), lcd.crlf(), lcd.clear()");

Q("sens", "เซนเซอร์ SHT31 วัดค่าอะไร และสื่อสารด้วยบัสใด?",
  "อุณหภูมิและความชื้นสัมพัทธ์ ผ่าน I2C",
  ["ระยะทางและแสง ผ่าน SPI", "แรงดันไฟฟ้า ผ่าน UART", "ความเร่ง ผ่าน GPIO"],
  "address 0x44 ส่งคำสั่งวัด [0x2C, 0x06] แล้วอ่าน 6 byte (Temp MSB, LSB, CRC, Hum MSB, LSB, CRC)");

Q("sens", "จากข้อมูลดิบ SHT31: Humidity bytes = 0x8B, 0x3C (35,644) ความชื้นสัมพัทธ์ตามสูตร 100 × (raw / 65535) ได้ประมาณเท่าใด?",
  "≈ 54.4 %RH",
  ["≈ 27.6 %RH", "≈ 35.6 %RH", "≈ 100 %RH"],
  "100 × 35644/65535 = 54.41 %; ส่วนอุณหภูมิ = −45 + 175 × (27187/65535) = 27.64 °C");

/* ===================== AI & IoT · MCP (10) ===================== */
Q("ai", "MCP ย่อมาจากอะไร?",
  "Model Context Protocol",
  ["Microcontroller Control Protocol", "Message Channel Protocol", "Machine Communication Port"],
  "MCP เป็นมาตรฐานให้ AI เชื่อมต่อกับเครื่องมือ (tools) ข้อมูล และระบบภายนอก เช่น IoT");

Q("ai", "องค์ประกอบสามอย่างที่ MCP Server เปิดให้ AI ใช้คืออะไร?",
  "Tools, Resources และ Prompts",
  ["Exchange, Queue และ Binding", "Publisher, Subscriber และ Broker", "Uplink, Downlink และ Beacon"],
  "Tools = ฟังก์ชันที่ AI เรียกทำงาน (เช่น set_led), Resources = ข้อมูลให้ AI อ่าน, Prompts = เทมเพลต prompt สำเร็จรูป");

Q("ai", "ในตัวอย่าง `set_led(action)` ของ MCP Server จัดเป็นองค์ประกอบใด?",
  "Tool (ฟังก์ชันที่ AI เรียกเพื่อทำ action)",
  ["Resource", "Prompt", "Transport"],
  "ใช้ decorator @mcp.tool() และ docstring อธิบายให้ AI เข้าใจวิธีใช้ พารามิเตอร์ action ต้องเป็น 'on' หรือ 'off'");

Q("ai", "MCP Client สื่อสารกับ MCP Server ได้ผ่าน transport แบบใดบ้างตามสไลด์?",
  "stdio และ Streamable HTTP",
  ["MQTT และ AMQP", "UART และ SPI", "LoRa และ Wi-Fi"],
  "stdio = ผ่าน stdin/stdout ของ process เดียวกัน; Streamable HTTP = ผ่าน HTTP endpoint (เช่น /mcp) เหมาะกับการเข้าถึงผ่านเครือข่ายและหลายผู้ใช้");

Q("ai", "ทำไมใน lab จึงต้องใช้ Tunnel (เช่น tunnl.gg, ngrok) กับ MCP Server บน Raspberry Pi?",
  "Raspberry Pi อยู่หลัง Private IP/ไม่มี Public IP จึงต้องมี tunnel เพื่อให้ AI บน Internet เข้าถึง MCP Server ได้",
  ["เพื่อเพิ่มความเร็ว CPU ของ Pi", "เพื่อเข้ารหัส payload ด้วย AES-128", "เพื่อ flash OS ลง SD card"],
  "ตัวอย่างคำสั่ง: ssh -t -R 80:127.0.0.1:8000 stable@proxy.tunnl.gg โดย -R คือ reverse tunnel");

Q("ai", "ใน lab MCP + Raspberry Pi เมื่อ AI Chatbot เรียก tool set_led(\"on\") ระบบ IoT ส่งคำสั่งไปถึง LED อย่างไร?",
  "MCP Server publish คำสั่งไปที่ MQTT topic แล้ว Raspberry Pi ที่ subscribe topic นั้นควบคุม LED",
  ["Chatbot ส่ง SPI ตรงไปที่ LED", "MCP Server ส่ง CoAP GET ไปที่ LED", "Chatbot เขียนไฟล์ลง SD card"],
  "โค้ดใช้ mqtt_client.publish(COMMAND_TOPIC, action.upper(), qos=1) และ Pi subscribe {DEVICE_ID}/command");

Q("ai", "ข้อใดเป็นแนวทางด้านความปลอดภัยที่ปรากฏในโค้ด set_led ของสไลด์?",
  "ตรวจสอบ input ให้เป็นเฉพาะ \"on\"/\"off\" ก่อน publish (whitelist) เพื่อป้องกันคำสั่งที่ไม่อนุญาต",
  ["ส่ง input จากผู้ใช้ไป publish ตรงๆ โดยไม่ตรวจ", "ปิด authentication ทั้งหมด", "เก็บ password ในข้อความ prompt"],
  "action.strip().lower() แล้วเช็ค not in (\"on\",\"off\") → return Error; อีกทั้งควรมี Authentication/Authorization ใน MCP Server");

Q("ai", "รูปแบบการใช้ AI ร่วมกับ IoT แบบ \"Edge AI / TinyML\" มีจุดเด่นอย่างไร?",
  "ประมวลผลโมเดลบนอุปกรณ์ปลายทาง ลด latency และทำงาน offline ได้ ไม่ต้องส่งข้อมูลทั้งหมดไป Cloud",
  ["ต้องส่งข้อมูลทุกอย่างไป Cloud ก่อนเสมอ", "ใช้ได้เฉพาะกับ LoRaWAN", "ต้องใช้ RAM เป็นหลายสิบ GB"],
  "Edge AI เหมาะกับงาน realtime; Cloud AI Integration ใช้ REST API/HTTPS + API Key");

Q("ai", "\"LLM Tool Calling / Function Calling\" คืออะไร?",
  "LLM เลือกเรียกฟังก์ชันที่นักพัฒนาประกาศไว้ (มี function schema และ parameters) เช่น set_led() เพื่อทำ action จริง",
  ["LLM แปลงภาษาไทยเป็นอังกฤษเท่านั้น", "LLM เขียนทับ firmware ของ MCU โดยตรง", "LLM ทำหน้าที่ MQTT Broker"],
  "เป็นกลไกพื้นฐานที่ทำให้ AI สั่งงาน IoT ได้ และ MCP ช่วยทำให้เป็นมาตรฐาน");

Q("ai", "ข้อใดเป็นตัวอย่าง use case \"AI Vision & Sensor Fusion\" ตามสไลด์?",
  "ใช้ Raspberry Pi Camera ร่วมกับ OpenCV เพื่อทำ Object Detection แล้วรวมกับข้อมูลเซนเซอร์อื่น",
  ["ใช้ LLM สั่งเปิดไฟด้วยข้อความ", "ใช้ RabbitMQ เก็บ log", "ใช้ LoRa เพื่อส่งภาพวิดีโอ HD"],
  "การสั่งงานด้วยภาษาธรรมชาติเป็นอีกหมวดคือ Natural Language AI Control");
