IOT.reg({
  id: "rest",
  title: "REST API · Hono · WebSocket",
  th: "หลักการ RESTful API, การเขียน API ด้วย Hono (TypeScript) และการรับข้อมูล real-time ด้วย Polling / WebSocket",
  summary: `
<ul>
<li><b>REST</b> = สถาปัตยกรรม · <b>RESTful API</b> = API ที่ทำตามหลัก REST: ใช้ HTTP/HTTPS, ใช้ <b>HTTP Method</b> แทนการกระทำ (CRUD) และ <b>HTTP Status Code</b> แทนผลลัพธ์</li>
<li>คุณสมบัติ: <b>Stateless</b> (ไม่เก็บ session ฝั่ง server) · <b>Resource-based</b> · ข้อมูลเป็น JSON/XML · <b>Client-Server</b> แยกกัน</li>
<li>URL: <code>https://host/api/<b>v1</b>/books/<b>1</b></code> → <code>v1</code> = version ของ API, <code>books</code> = resource, <code>1</code> = ID ของ resource</li>
<li>Versioning ใน URL (v9, v10) ทำให้ client เก่ายังใช้ได้เมื่อมี breaking change</li>
</ul>
<table><tr><th>Method</th><th>CRUD</th><th>ตัวอย่าง</th><th>Status ที่พบบ่อย</th></tr>
<tr><td>GET</td><td>Read</td><td>GET /books/1</td><td>200, 404</td></tr>
<tr><td>POST</td><td>Create</td><td>POST /books</td><td>201, 400</td></tr>
<tr><td>PUT / PATCH</td><td>Update</td><td>PUT /books/1</td><td>200, 404</td></tr>
<tr><td>DELETE</td><td>Delete</td><td>DELETE /books/1</td><td>200/204, 404</td></tr></table>
<ul>
<li><b>Hono</b> = web framework (TS/JS) เร็ว เรียบง่าย unopinionated หลาย runtime แรงบันดาลใจจาก Express · ทางเลือก: Elysia.js (type-safe), Express.js (community ใหญ่), Nest.js (opinionated, battery included), Adonis.js (MVC แบบ Laravel)</li>
<li><b>React</b> = library สร้าง UI (JSX, Virtual DOM) · <b>Vite</b> = build tool (dev server, HMR, bundler) · dev server ที่ <code>localhost:5173</code> · Node.js 24 LTS</li>
<li>Deploy: <b>Vercel</b> (serverless, free tier) / Railway · DB: PostgreSQL (production), SQLite (local)</li>
<li>หัวข้อ backend ต่อยอด: Error Handling, <b>CORS</b>, Authentication, Database Migration</li>
<li>Real-time: <b>Short polling</b> (ถามซ้ำทุก n วินาที) · <b>Long polling</b> (ค้าง connection รอจนมีข้อมูล/timeout) · <b>Push</b> · <b>WebSocket</b></li>
<li><b>WebSocket</b>: full-duplex, real-time, บน TCP, เริ่มด้วย HTTP request แล้ว <b>Upgrade</b> (handshake) · URI <code>ws://</code> และ <code>wss://</code> (TLS)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Stateless = ทุก request ต้องมีข้อมูลครบในตัวเอง</li><li>POST=Create, GET=Read, PUT/PATCH=Update, DELETE=Delete</li><li>WebSocket: ws:// / wss:// + HTTP Upgrade + full-duplex</li></ul></div>`,
  sections: [
  { t: "REST และ RESTful API", html: `
<h4>แนวคิด</h4>
<p><b>REST</b> เป็นแนวคิด/สถาปัตยกรรมในการออกแบบการสื่อสารระหว่างระบบ ส่วน <b>RESTful API</b> คือ API ที่ออกแบบตามหลัก REST ใน IoT เราใช้ API เพื่อให้ Sensor/Node, Server, Web App และ Mobile App คุยกันได้ด้วยโปรโตคอลที่เบาแต่ปลอดภัย (HTTPS)</p>
<h4>คุณสมบัติของ RESTful API</h4>
<ul>
<li>ใช้โปรโตคอล <b>HTTP / HTTPS</b></li>
<li>ใช้ <b>HTTP Status Code</b> บอกผลลัพธ์ และใช้ <b>HTTP Method</b> บอกการกระทำ (CRUD)</li>
<li><b>Stateless</b>: server ไม่จำ session ของ client ระหว่าง request — ข้อมูลยืนยันตัวตน/บริบทต้องส่งมากับทุก request (เช่น token ใน header)</li>
<li><b>Resource-based</b>: ทุกอย่างคือ resource (books, devices, readings) ระบุด้วย URL</li>
<li>แลกเปลี่ยนข้อมูลเป็น <b>JSON</b> หรือ XML</li>
<li><b>Client-Server</b>: ผู้ขอ (client) และผู้ให้บริการ (server) แยกจากกัน พัฒนา/ขยายได้อิสระ</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Stateless ช่วยให้ scale ได้ง่าย: request ไป server ตัวไหนก็ได้</li><li>REST = แนวคิด, RESTful = สิ่งที่ทำตามแนวคิด</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> Stateless ไม่ได้แปลว่าไม่มีการ login — แต่สถานะต้องอยู่ที่ client (token) หรือ storage กลาง ไม่ใช่ memory ของ server instance เดียว</div>` },
  { t: "ออกแบบ URL, Method, Status Code และ Versioning", html: `
<h4>โครงสร้าง URL</h4>
<p><code>https://www.services.com/api/v1/books/1</code></p>
<ul><li><code>v1</code> = version ของ API</li><li><code>books</code> = resource (ใช้คำนาม พหูพจน์)</li><li><code>1</code> = ID ของ resource ที่ต้องการ (ถ้าไม่ใส่ = ทั้ง collection)</li></ul>
<h4>Method ↔ CRUD</h4>
<table><tr><th>การกระทำ</th><th>Method</th><th>URL</th></tr>
<tr><td>ดูรายการ</td><td>GET</td><td>/api/v1/books</td></tr>
<tr><td>ดูรายการเดียว</td><td>GET</td><td>/api/v1/books/1</td></tr>
<tr><td>สร้างใหม่</td><td>POST</td><td>/api/v1/books</td></tr>
<tr><td>แก้ไข</td><td>PUT / PATCH</td><td>/api/v1/books/1</td></tr>
<tr><td>ลบ</td><td>DELETE</td><td>/api/v1/books/1</td></tr></table>
<h4>Status Code ที่ควรรู้</h4>
<table><tr><th>Code</th><th>ความหมาย</th></tr>
<tr><td>200 OK</td><td>สำเร็จ</td></tr><tr><td>201 Created</td><td>สร้าง resource สำเร็จ</td></tr>
<tr><td>400 Bad Request</td><td>request ผิดรูปแบบ/ข้อมูลไม่ถูกต้อง</td></tr>
<tr><td>401 / 403</td><td>ยังไม่ยืนยันตัวตน / ไม่มีสิทธิ์</td></tr>
<tr><td>404 Not Found</td><td>ไม่พบ resource/route</td></tr>
<tr><td>500</td><td>server error</td></tr></table>
<h4>Versioning</h4>
<p>เมื่อต้องเปลี่ยน API แบบไม่เข้ากับของเดิม (breaking change) ให้ออก version ใหม่ เช่น <code>/api/v9/guilds/1234</code> และ <code>/api/v10/guilds/1234</code> อยู่ร่วมกัน client เก่ายังเรียก v9 ได้ ส่วน client ใหม่ย้ายไป v10</p>
<div class="warn"><b>⚠️ ระวัง</b> อย่าใส่คำกริยาใน URL เช่น <code>/getBooks</code> หรือ <code>/deleteBook</code> — ให้ใช้ Method บอกการกระทำ</div>` },
  { t: "Hono Framework (TypeScript)", html: `
<h4>Hono คืออะไร</h4>
<ul><li>web framework สมัยใหม่สำหรับสร้าง web app และ API ด้วย TypeScript/JavaScript</li><li><b>unopinionated</b> — ไม่บังคับโครงสร้างโปรเจกต์</li><li>แรงบันดาลใจจาก Express แต่เน้นความเร็วและความเรียบง่าย</li><li>รองรับหลาย runtime และมี adapters/tools/examples</li></ul>
<h4>ตัวอย่างโค้ด</h4>
<pre><code>import { Hono } from 'hono'
const app = new Hono()

app.get('/api/v1/books/:id', (c) =&gt; {
  const id = c.req.param('id')       // อ่าน path parameter
  return c.json({ id, title: 'IoT' }) // ตอบ JSON (status 200)
})

app.post('/api/v1/books', async (c) =&gt; {
  const body = await c.req.json()    // อ่าน JSON body
  return c.json(body, 201)           // ตอบ 201 Created
})
export default app</code></pre>
<p>Route ที่ไม่ได้ลงทะเบียน (หรือ method ที่ไม่ได้ลงทะเบียน) Hono ตอบ <b>404 Not Found</b> เป็นค่า default</p>
<h4>ทางเลือกอื่น</h4>
<table><tr><th>Framework</th><th>จุดเด่น</th></tr>
<tr><td>Elysia.js</td><td>developer friendly, type-safety</td></tr>
<tr><td>Express.js</td><td>เรียบง่าย community ใหญ่ แต่เก่าและดูแลไม่ค่อยดี</td></tr>
<tr><td>Nest.js</td><td>opinionated, battery included</td></tr>
<tr><td>Adonis.js</td><td>คล้าย Laravel ใช้ MVC, battery included</td></tr></table>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Hono: unopinionated, เร็ว, หลาย runtime, ได้แรงบันดาลใจจาก Express</li><li>Nest/Adonis = opinionated + battery included</li></ul></div>` },
  { t: "Frontend (React + Vite) และการตั้งค่าโปรเจกต์", html: `
<h4>React</h4>
<ul><li>JavaScript library สำหรับสร้าง UI ที่โต้ตอบกับผู้ใช้</li><li>แบ่ง UI เป็น <b>Component</b>, เขียนด้วย <b>JSX</b> (JavaScript XML — เขียนแท็กคล้าย HTML ใน JS)</li><li>ใช้ <b>Virtual DOM</b> เพื่ออัปเดตเฉพาะส่วนที่เปลี่ยน</li><li>ต้องมี compiler/transpiler + bundler (Babel, Vite, Webpack)</li></ul>
<h4>Vite</h4>
<ul><li>เป็น <b>build tool</b> ใช้ได้กับ React, Vue, Svelte ฯลฯ</li><li>มี compiler/transpiler และ bundler ในตัว, dev server + <b>HMR</b> (Hot Module Replacement)</li><li>รองรับ SSR และ TypeScript</li></ul>
<h4>ขั้นตอน Setup Frontend</h4>
<ol><li>ติดตั้ง Node.js 24 LTS</li><li>ดึง repository ล่าสุด แล้ว cd เข้าโฟลเดอร์ frontend</li><li><code>npm install</code></li><li>คัดลอก <code>.env.example</code> เป็น <code>.env</code> แล้วแก้ค่า (เช่น URL ของ API)</li><li><code>npm run dev</code> → เปิดที่ <code>localhost:5173</code></li></ol>
<div class="note"><b>💡 หมายเหตุ</b> Frontend (5173) กับ API คนละ origin → เบราว์เซอร์จะบล็อกถ้า server ไม่เปิด CORS</div>` },
  { t: "Database, Deploy และหัวข้อ Backend", html: `
<h4>เก็บข้อมูล</h4>
<ul><li>ข้อมูลจากเซนเซอร์ต้อง "เก็บ" ลง Database: <b>PostgreSQL</b> (production) หรือ <b>SQLite</b> (local)</li><li>เครื่องมือจัดการ DB: DBeaver (แนะนำ), HeidiSQL, Navicat</li><li><b>Database Migration</b> = จัดการ/ติดตามการเปลี่ยนโครงสร้าง schema เป็นเวอร์ชัน</li></ul>
<h4>Deploy</h4>
<ul><li><b>Vercel</b>: cloud platform สำหรับ static website และ Serverless Function, มี free tier, ทำ CI/CD ให้, ไม่ต้องดูแล server เอง; ข้อควรระวังคือ vendor lock-in</li><li><b>Railway</b>: ทางเลือกสำหรับ deploy + PostgreSQL</li></ul>
<h4>หัวข้อ Backend ต่อยอด</h4>
<ul><li><b>Error Handling</b> — ตอบ status/ข้อความที่เหมาะสม</li><li><b>CORS</b> (Cross-Origin Resource Sharing) — กลไกของเบราว์เซอร์ที่ server ต้องอนุญาต origin อื่นให้เรียก API ได้</li><li><b>User Authentication</b></li><li><b>Database Migration</b></li></ul>
<div class="warn"><b>⚠️ ระวัง</b> CORS เป็นข้อจำกัดของ <b>เบราว์เซอร์</b> — เรียก API ด้วย curl/Postman ผ่านแต่หน้าเว็บ fetch ไม่ผ่าน แปลว่าต้องแก้ฝั่ง server (ใส่ CORS header) ไม่ใช่แก้ฝั่งเซนเซอร์</div>` },
  { t: "Real-time: Polling vs Push", html: `
<h4>จะได้ข้อมูล real-time จาก server อย่างไร</h4>
<table><tr><th>วิธี</th><th>ลักษณะ</th></tr>
<tr><td><b>Short Polling</b></td><td>client ส่ง request ถามซ้ำทุกช่วงเวลาคงที่ (เช่น 5 วินาที) server ตอบทันทีแม้ไม่มีข้อมูลใหม่</td></tr>
<tr><td><b>Long Polling</b></td><td>client ส่ง request แล้ว server <b>ค้าง connection</b> ไว้จนมีข้อมูลใหม่หรือ timeout แล้ว client ถามใหม่</td></tr>
<tr><td><b>Pushing</b></td><td>server ส่งข้อมูลให้ client เองโดยไม่ต้องรอ request</td></tr>
<tr><td><b>WebSocket</b></td><td>connection สองทางถาวร เหมาะกับ real-time</td></tr></table>
<h4>การเลือกใช้</h4>
<ul><li>จำนวน request ของ short polling = <code>จำนวน client ÷ ช่วงเวลา</code> (เช่น 1000 client ทุก 2 s = 500 req/s) — ส่วนใหญ่เปลืองเพราะตอบว่า "ไม่มีอะไรใหม่"</li><li>ข้อมูลเปลี่ยนไม่บ่อยหรือยอมช้าได้ → short polling เขียนง่ายที่สุด</li><li>ต้องการเร็วและ server ส่งเองได้ → WebSocket</li></ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Polling = client เป็นฝ่ายถาม · Push/WebSocket = server ส่งให้</li><li>Long polling ต่างจาก short polling ตรง server ค้าง connection</li></ul></div>` },
  { t: "WebSocket", html: `
<h4>คุณสมบัติ</h4>
<ul><li>เป็นโปรโตคอลสำหรับ Web Service</li><li><b>Full-Duplex</b>: ส่งได้ทั้งสองทิศทางพร้อมกัน</li><li><b>Real-Time</b></li><li>ทำงานบน <b>TCP</b></li><li>เริ่มจาก <b>HTTP request</b> ที่ขอ <b>Upgrade</b> → handshake สำเร็จ (server ตอบ 101 Switching Protocols) → ใช้ connection เดิมเป็น WebSocket</li><li>URI: <code>ws://</code> (ไม่เข้ารหัส) และ <code>wss://</code> (เข้ารหัส TLS เหมือน https)</li></ul>
<h4>WebSocket vs HTTP</h4>
<table><tr><th></th><th>HTTP (1.1)</th><th>WebSocket</th></tr>
<tr><td>ทิศทาง</td><td>client ขอ → server ตอบ</td><td>สองทางอิสระ</td></tr>
<tr><td>Connection</td><td>request/response ต่อรอบ</td><td>เปิดค้างไว้ใช้ต่อเนื่อง</td></tr>
<tr><td>Overhead</td><td>header ทุก request</td><td>handshake ครั้งเดียว</td></tr>
<tr><td>Server ส่งเอง</td><td>ไม่ได้ (ต้องรอถาม)</td><td>ได้</td></tr></table>
<h4>การใช้งานใน IoT</h4>
<ul><li>เว็บแสดงข้อมูลเซนเซอร์แบบ real-time โดยไม่ต้อง refresh</li><li>MQTT over WebSocket: เบราว์เซอร์ต่อ broker ผ่านพอร์ต WebSocket (เช่น 8884) เพื่อ publish/subscribe</li></ul>
<div class="warn"><b>⚠️ ระวัง</b> WebSocket ไม่ใช่ HTTP ทุก request — HTTP ใช้แค่ตอน handshake เท่านั้น หลังจากนั้นเป็นโปรโตคอล WebSocket บน TCP connection เดิม</div>` }
  ],
  ex: [
  { type:"choice", story:`API ด้วย Hono:<pre><code>const app = new Hono()
app.get('/api/v1/devices/:id', (c) =&gt; {
  const id = c.req.param('id')
  if (id !== '7') return c.json({ error: 'not found' }, 404)
  return c.json({ id, temp: 28.5 })
})</code></pre>`, q:"Client ส่ง POST /api/v1/devices/7 (ไม่มี body) จะได้ผลลัพธ์ใด?", opts:[
    {t:"200 พร้อม JSON {id:\"7\", temp:28.5}", why:"ผิด เพราะ handler ลงทะเบียนไว้เฉพาะ GET ไม่ได้ผูกกับ POST"},
    {t:"404 Not Found เพราะไม่มี route ที่ตรงกับ method POST", why:"ถูก Hono match ทั้ง path และ method; เมื่อไม่มี handler สำหรับ POST จะตอบ 404 เป็นค่า default"},
    {t:"405 Method Not Allowed ที่ framework สร้างให้อัตโนมัติ", why:"ผิด Hono ไม่สร้าง 405 ให้เองโดย default (ต้องเขียนเอง)"},
    {t:"500 Internal Server Error เพราะ POST ไม่มี body", why:"ผิด ไม่มีโค้ดใดอ่าน body จึงไม่มี error; request ไม่ถึง handler ด้วยซ้ำ"}], ans:1 },
  { type:"choice", story:`หน้า dashboard ของโรงงานต้องแสดงค่าอุณหภูมิที่เปลี่ยนทุกวินาที มีผู้ใช้เปิดพร้อมกัน 500 คน ทีมใช้ short polling ทุก 1 วินาที แล้ว server load สูงมาก ส่วนใหญ่ response ตอบว่าไม่มีข้อมูลใหม่`, q:"ควรปรับอย่างไรที่เหมาะสมที่สุด?", opts:[
    {t:"เปลี่ยนเป็น WebSocket ให้ server push ค่าใหม่เมื่อมีข้อมูล", why:"ถูก ใช้ connection สองทางค้างไว้ ไม่ต้องถามซ้ำ 500 req/s และส่งทันทีที่ข้อมูลเปลี่ยน"},
    {t:"เพิ่มความถี่ polling เป็นทุก 0.1 วินาทีเพื่อให้ได้ข้อมูลทัน", why:"ผิด จะเพิ่ม request เป็น 5000 req/s ทำให้ load แย่ลง"},
    {t:"เปลี่ยน method จาก GET เป็น POST", why:"ผิด Method ไม่ได้ลดจำนวน request; GET เหมาะกับการอ่านข้อมูลอยู่แล้ว"},
    {t:"เปลี่ยน URL เป็น http:// เพื่อลด overhead ของ TLS", why:"ผิด ไม่แก้ต้นเหตุ (จำนวน request ที่ไร้ประโยชน์) และลดความปลอดภัย"}], ans:0 },
  { type:"choice", story:`Node เซนเซอร์ต้องส่งค่าวัดใหม่เข้าระบบ โดย API ใช้ base เป็น <code>/api/v1/readings</code>`, q:"การออกแบบ endpoint และผลลัพธ์ใดตรงกับหลัก RESTful มากที่สุด?", opts:[
    {t:"GET /api/v1/addReading?temp=28 ตอบ 200", why:"ผิด ใช้ GET สร้างข้อมูลและมีคำกริยาใน URL"},
    {t:"POST /api/v1/createReading ตอบ 200 เสมอแม้ error", why:"ผิด มีคำกริยาใน URL และไม่ใช้ status code บอกผลลัพธ์"},
    {t:"DELETE /api/v1/readings/28 แล้วสร้างใหม่ฝั่ง server", why:"ผิด DELETE มีความหมายว่าลบ ไม่ใช่สร้าง"},
    {t:"POST /api/v1/readings พร้อม JSON body ตอบ 201 Created", why:"ถูก resource เป็นคำนามพหูพจน์ ใช้ POST = Create และ 201 บอกว่าสร้างสำเร็จ"}], ans:3 },
  { type:"choice", story:`Frontend React รันที่ <code>http://localhost:5173</code> เรียก <code>fetch('https://api.example.com/api/v1/devices')</code> แล้ว Console ขึ้นข้อผิดพลาด CORS แต่เมื่อทดสอบ API เดียวกันด้วย curl ได้ 200 ปกติ`, q:"ควรแก้ที่ใด?", opts:[
    {t:"ลง Node.js เวอร์ชันใหม่ฝั่ง frontend", why:"ผิด เวอร์ชัน Node ไม่เกี่ยวกับนโยบาย cross-origin ของเบราว์เซอร์"},
    {t:"เปลี่ยน Vite เป็น Webpack", why:"ผิด build tool ไม่ได้กำหนดสิทธิ์ cross-origin"},
    {t:"เพิ่ม CORS header/middleware ฝั่ง API ให้อนุญาต origin ของ frontend", why:"ถูก CORS บังคับโดยเบราว์เซอร์ ต้องให้ server ประกาศอนุญาต origin; curl ไม่ผ่านเบราว์เซอร์จึงไม่ถูกบล็อก"},
    {t:"เปลี่ยน GET เป็น POST ใน fetch", why:"ผิด เปลี่ยน method ไม่ทำให้ข้ามการตรวจ CORS"}], ans:2 },
  { type:"choice", story:`API login เก็บ session ไว้ใน memory ของ server แล้ว deploy 2 instance หลัง load balancer ผู้ใช้ login สำเร็จแต่ request ถัดไปบางครั้งถูกตอบ 401`, q:"สาเหตุและแนวทางแก้ที่สอดคล้องกับ REST ที่สุดคือ?", opts:[
    {t:"ลดเหลือ instance เดียวตลอดไปและห้าม scale", why:"แก้ได้เฉพาะหน้าแต่เสียความสามารถ scale และขัดกับข้อดีของ stateless"},
    {t:"Session อยู่ใน memory ของ instance เดียว จึงควรให้ client ส่ง token ที่ตรวจสอบได้ในทุก request (stateless)", why:"ถูก request ที่ไปตกอีก instance ไม่มี session นั้น; การใช้ token/storage กลางทำให้ instance ใดตอบก็ได้"},
    {t:"เปลี่ยน JSON เป็น XML", why:"ผิด รูปแบบข้อมูลไม่เกี่ยวกับการจำ session"},
    {t:"เพิ่ม version เป็น /v2", why:"ผิด versioning ไม่เกี่ยวกับการยืนยันตัวตนข้าม instance"}], ans:1 },
  { type:"choice", story:`เว็บเฝ้าระวังมี 2,000 ผู้ใช้เปิดหน้าพร้อมกัน ใช้ short polling ทุก 5 วินาที โดยแต่ละ request ตอบเฉลี่ย 2 KB`, q:"server ต้องรับ request เฉลี่ยกี่ครั้งต่อวินาที?", opts:[
    {t:"10 req/s", why:"ผิด คำนวณไม่ถูกต้อง"},
    {t:"2,000 req/s", why:"ผิด นั่นคือกรณีทุก 1 วินาที"},
    {t:"10,000 req/s", why:"ผิด เป็นการคูณ 2000 × 5 แทนที่จะหาร"},
    {t:"400 req/s", why:"ถูก 2000 client ÷ 5 วินาที = 400 req/s (ราว 800 KB/s ของ response)"}], ans:3 },
  { type:"choice", story:`ผู้ให้บริการ API ต้องเปลี่ยนชื่อ field จาก <code>temp</code> เป็น <code>temperature</code> ซึ่งทำให้ mobile app เวอร์ชันเก่าพัง ปัจจุบันเรียกที่ <code>/api/v1/readings</code>`, q:"แนวทางที่เหมาะสมที่สุด?", opts:[
    {t:"แก้ v1 ทันทีแล้วให้ผู้ใช้อัปเดตแอปเอง", why:"ผิด แอปเก่าจะพังทันที"},
    {t:"เปลี่ยน method จาก GET เป็น PUT", why:"ผิด ไม่เกี่ยวกับการเปลี่ยนโครงสร้างข้อมูล"},
    {t:"ออก /api/v2/readings ด้วยชื่อ field ใหม่ และคง v1 ไว้ระยะหนึ่ง", why:"ถูก versioning ใน URL ให้ client เก่าและใหม่ใช้งานคู่กันได้ แล้วค่อยเลิก v1 ภายหลัง"},
    {t:"ลบ endpoint v1 แล้วใช้ path เดิม", why:"ผิด เป็น breaking change โดยไม่แจ้งให้ client เก่า"}], ans:2 },
  { type:"multi", story:`ทีมกำลังเลือกใช้ WebSocket เพื่อส่งค่าเซนเซอร์ไปยังหน้าเว็บ`, q:"เลือกทุกข้อที่ถูกต้องเกี่ยวกับ WebSocket", opts:[
    {t:"เริ่มด้วย HTTP request ที่ขอ Upgrade แล้วเปลี่ยนเป็น WebSocket", ok:true, why:"ถูก handshake ผ่าน HTTP แล้ว upgrade connection"},
    {t:"เป็น full-duplex server ส่งข้อมูลให้ client ได้เอง", ok:true, why:"ถูก ส่งได้สองทิศทางอิสระ"},
    {t:"ถ้าต้องการเข้ารหัสให้ใช้ URI แบบ wss://", ok:true, why:"ถูก wss = WebSocket over TLS"},
    {t:"ทำงานบน UDP จึงไม่มีการรับประกันลำดับ", ok:false, why:"ผิด WebSocket ทำงานบน TCP"},
    {t:"ทุกข้อความต้องส่ง HTTP header ครบเหมือน request ปกติ", ok:false, why:"ผิด header ใช้ตอน handshake ครั้งเดียว"}] },
  { type:"multi", story:`ออกแบบ API จัดการอุปกรณ์ IoT (resource = devices)`, q:"เลือกทุกข้อที่เป็นการออกแบบที่ถูกต้องตามหลัก RESTful", opts:[
    {t:"GET /api/v1/devices/12 เพื่ออ่านข้อมูลอุปกรณ์หมายเลข 12", ok:true, why:"ถูก GET = Read, ระบุ ID ท้าย URL"},
    {t:"DELETE /api/v1/devices/12 เพื่อลบอุปกรณ์", ok:true, why:"ถูก DELETE = Delete"},
    {t:"ตอบ 404 เมื่อไม่พบอุปกรณ์ที่ร้องขอ", ok:true, why:"ถูก ใช้ status code บอกผลลัพธ์"},
    {t:"GET /api/v1/deleteDevice?id=12", ok:false, why:"ผิด มีกริยาใน URL และใช้ GET ทำการลบ"},
    {t:"เก็บ session ใน memory ของ server และอ้างอิงด้วย cookie เพื่อรู้ว่าผู้ใช้เป็นใคร โดยไม่ส่ง credential อีก", ok:false, why:"ผิด ขัดกับ stateless"}] },
  { type:"blank", story:"", text:`WebSocket เริ่มจาก HTTP request ที่ขอ {1} แล้วเมื่อ handshake สำเร็จจะสื่อสารแบบ {2} บน {3} และถ้าต้องการเข้ารหัสใช้ URI ขึ้นต้นด้วย wss://`, blanks:[
    {opts:["Redirect","Upgrade","Cache","Proxy"], ans:1, why:"ใช้ HTTP Upgrade เพื่อเปลี่ยน protocol"},
    {opts:["half-duplex","simplex","full-duplex","request-response"], ans:2, why:"WebSocket เป็น full-duplex"},
    {opts:["UDP","ICMP","TCP","BLE"], ans:2, why:"ทำงานบน TCP connection"}] },
  { type:"blank", story:`ตารางจับคู่ CRUD กับ HTTP Method`, text:`สร้างข้อมูลใหม่ใช้ {1} · อ่านข้อมูลใช้ {2} · แก้ไขข้อมูลใช้ {3} · ลบข้อมูลใช้ {4}`, blanks:[
    {opts:["GET","POST","DELETE","HEAD"], ans:1, why:"POST = Create"},
    {opts:["GET","PUT","POST","DELETE"], ans:0, why:"GET = Read"},
    {opts:["GET","DELETE","PUT/PATCH","POST"], ans:2, why:"PUT/PATCH = Update"},
    {opts:["POST","GET","PATCH","DELETE"], ans:3, why:"DELETE = Delete"}] },
  { type:"blank", story:`เติมโค้ด Hono ให้ endpoint รับข้อมูลเซนเซอร์แล้วตอบว่าสร้างสำเร็จ`, text:`<pre><code>app.{1}('/api/v1/readings', async (c) =&gt; {
  const body = await c.req.{2}()
  return c.json(body, {3})
})</code></pre>`, blanks:[
    {opts:["get","delete","post","options"], ans:2, why:"การสร้างข้อมูลใช้ POST"},
    {opts:["text","json","param","query"], ans:1, why:"อ่านเนื้อหา JSON ด้วย c.req.json()"},
    {opts:["200","404","500","201"], ans:3, why:"สร้างสำเร็จควรตอบ 201 Created"}] },
  { type:"match", q:"จับคู่ Framework/เครื่องมือกับลักษณะเด่น", pairs:[
    ["Hono","unopinionated เร็ว เรียบง่าย หลาย runtime"],
    ["Nest.js","opinionated มีเครื่องมือครบ (battery included)"],
    ["Adonis.js","MVC คล้าย Laravel"],
    ["Elysia.js","developer friendly เน้น type-safety"],
    ["Vite","build tool: dev server + HMR + bundler"]], why:"Nest.js และ Adonis.js เป็น opinionated แบบ battery included ส่วน Hono ไม่บังคับโครงสร้าง; Vite ไม่ใช่ web framework ฝั่ง server แต่เป็น build tool ฝั่ง frontend" }
  ]
});
