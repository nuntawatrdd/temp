IOT.reg({
  id: "ai",
  title: "AI & IoT · MCP",
  th: "รูปแบบการใช้ AI กับ IoT, แนวทางเชื่อมต่อ, Model Context Protocol (Tools/Resources/Prompts, stdio/Streamable HTTP) และแล็บ MCP + Raspberry Pi",
  summary: `
<ul>
<li><b>4 รูปแบบ AI + IoT</b>: (1) Natural Language AI Control (2) AI Data Analytics &amp; Decision Support (3) Edge AI / TinyML (4) AI Vision &amp; Sensor Fusion</li>
<li>(1) User พิมพ์ภาษาธรรมชาติ → LLM → เรียก tool → สั่งอุปกรณ์ (เช่น "เปิดไฟ" → AI → Arduino ผ่าน MQTT)</li>
<li>(2) วิเคราะห์ข้อมูลเซนเซอร์: Anomaly Detection, Classification, ให้ LLM สรุปรายงาน · (3) รัน AI บนอุปกรณ์: Realtime, ไม่ต้องพึ่ง Cloud แต่ถูกจำกัด CPU/RAM/พลังงาน · (4) Pi Camera + OpenCV Object Detection</li>
<li><b>6 แนวทางเชื่อมต่อ</b>: Cloud AI Integration (REST/HTTPS + <b>API Key</b>) · MQTT-based AIoT (Pub/Sub ผ่าน Broker) · Edge AI/Local (offline, latency ต่ำ) · LLM Tool/Function Calling (function schema + parameters เช่น <code>set_led()</code>) · <b>MCP</b> · AIoT Gateway (protocol bridging, logging, monitoring, error handling)</li>
<li><b>MCP</b> = มาตรฐานกลางให้ AI เรียกใช้เครื่องมือ/ข้อมูลภายนอก (รวมถึง IoT) · <b>MCP Client</b> = AI application · <b>MCP Server</b> = ให้ Tools, Resources, Prompts</li>
<li><b>Tools</b> = ให้ AI ลงมือทำ/อ่านค่า (Action): <code>set_led(action)</code>, <code>get_temperature()</code>, <code>count_people()</code>, <code>capture_image()</code></li>
<li><b>Resources</b> = ข้อมูล/เอกสารให้ AI อ่านเป็น context ผ่าน URI (PDF, Database, Log) · <b>Prompts</b> = แม่แบบ prompt สำเร็จรูป (<code>analyze_room</code>, <code>daily_energy_report</code>, <code>inspect_camera</code>)</li>
<li><b>Transport 2 แบบ</b>: <b>stdio</b> (Client รัน Server เป็น process, สื่อสารผ่าน stdin/stdout, เครื่องเดียวกัน) · <b>Streamable HTTP</b> (HTTP endpoint เช่น <code>/mcp</code>, เข้าถึงผ่านเครือข่าย, หลายผู้ใช้)</li>
<li><b>Authentication</b> = ยืนยันว่าคุณคือใคร · <b>Authorization</b> = กำหนดว่าทำอะไรได้บ้าง</li>
<li>Tool ใน Python: <code>@mcp.tool()</code> + <b>docstring</b> (AI อ่านเพื่อเข้าใจว่าใช้เมื่อไร/พารามิเตอร์คืออะไร) · ตรวจ <code>action</code> ให้เป็น on/off เท่านั้น แล้ว publish MQTT (qos=1)</li>
<li>Flow: User พิมพ์ → AI Chatbot เลือก tool → MCP Client เรียก MCP Server → server ทำงาน (MQTT publish) → ผลตอบกลับ → AI ตอบผู้ใช้</li>
<li><b>แล็บ</b>: Pi ติดตั้ง <code>python3-venv</code> → venv <code>~/iot-mcp</code> → <code>pip3 install "mcp[cli]" paho-mqtt RPi.GPIO</code> → สร้าง tunnel → รัน <code>server.py</code> → ใส่ URL + <code>/mcp</code> ใน Chatbot → LED subscribe topic <code>{DEVICE_ID}/command</code></li>
<li><b>Tunnel</b> (เมื่อ Pi อยู่หลัง NAT/Private IP): Ngrok, localhost.run, tunnl.gg · <code>ssh -t -R 80:127.0.0.1:8000 stable@proxy.tunnl.gg</code> (<code>-R</code> = reverse tunnel) · ได้ Public URL</li>
</ul>`,
  sections: [
    { t: "4 รูปแบบการใช้ AI ร่วมกับ IoT", html: `
<table>
<tr><th>รูปแบบ</th><th>แนวคิด</th><th>ตัวอย่าง</th></tr>
<tr><td><b>1. Natural Language AI Control</b></td><td>ผู้ใช้สั่งงานเป็นภาษามนุษย์ LLM ตีความแล้วเรียก tool ไปควบคุมอุปกรณ์</td><td>"เปิดไฟ" → AI → ส่งคำสั่งผ่าน MQTT ไป Arduino</td></tr>
<tr><td><b>2. AI Data Analytics &amp; Decision Support</b></td><td>ใช้ AI วิเคราะห์ข้อมูลเซนเซอร์ที่สะสม ตรวจความผิดปกติ จำแนกกลุ่ม และให้ LLM สรุปเป็นรายงาน</td><td>Anomaly Detection, Classification</td></tr>
<tr><td><b>3. Edge AI / TinyML</b></td><td>รันโมเดล AI บนอุปกรณ์ปลายทางเอง ตอบสนองแบบ Realtime ไม่ต้องส่งทุกอย่างไป Cloud</td><td>จำกัด CPU, RAM, พลังงาน; ต้องคำนึง Latency</td></tr>
<tr><td><b>4. AI Vision &amp; Sensor Fusion</b></td><td>ใช้ Computer Vision กับภาพจากกล้องและรวมกับข้อมูลเซนเซอร์อื่น</td><td>Raspberry Pi Camera + OpenCV ทำ Object Detection นับคน</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Edge AI: ประมวลผลบนอุปกรณ์ → latency ต่ำ, ใช้งาน offline ได้, ลดข้อมูลที่ต้องส่ง แต่ <b>ทรัพยากรจำกัด</b> (CPU, RAM, พลังงาน)</li>
<li>AI Vision บน Pi ใช้ Pi Camera + OpenCV (Object Detection)</li>
<li>การ "ควบคุมด้วยภาษาธรรมชาติ" ต้องอาศัยกลไกเรียกฟังก์ชัน/tool เพราะ LLM ไม่ได้สั่ง GPIO ได้เอง</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ในรูปแบบที่ 1 ตัวอย่างสไลด์คือ User → LLM → เรียก tool → ส่งคำสั่งผ่าน MQTT ไปยังอุปกรณ์ เช่น Arduino</div>` },

    { t: "6 แนวทางการเชื่อมต่อ AI กับ IoT", html: `
<table>
<tr><th>แนวทาง</th><th>หลักการ / จุดเด่น</th></tr>
<tr><td><b>Cloud AI Integration</b></td><td>อุปกรณ์ IoT ส่งข้อมูลไปยัง AI Model บน Cloud ผ่าน <b>REST API / HTTPS</b> ใช้ <b>API Key</b> ยืนยันตัวตน</td></tr>
<tr><td><b>MQTT-Based AIoT</b></td><td>ใช้ <b>Publish/Subscribe</b> ผ่าน MQTT Broker: อุปกรณ์ publish ข้อมูล, AI Model subscribe มาประมวลผล แล้ว publish ผลกลับ</td></tr>
<tr><td><b>Edge AI &amp; Local Integration</b></td><td>รันโมเดลบนอุปกรณ์/Server ในเครือข่ายภายใน ใช้ได้เมื่อ <b>offline</b>, latency ต่ำ, ข้อมูลไม่ออกนอกระบบ</td></tr>
<tr><td><b>LLM Tool Calling / Function Calling</b></td><td>LLM เลือกเรียกฟังก์ชันที่นิยามไว้ ผ่าน <b>function schema + parameters</b> เช่น <code>set_led()</code> โปรแกรมเป็นผู้รันจริง</td></tr>
<tr><td><b>Model Context Protocol (MCP)</b></td><td>มาตรฐานเชื่อมต่อ AI กับเครื่องมือ/ข้อมูลภายนอก ผ่าน MCP Client ↔ MCP Server (Tools, Resources, Prompts) ด้วย transport stdio หรือ Streamable HTTP</td></tr>
<tr><td><b>AIoT Gateway &amp; System Integration</b></td><td>จุดกลางที่รวม AI, IoT, MQTT, API เข้าด้วยกัน ทำ <b>Protocol Bridging</b>, Logging, Monitoring, Error Handling</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Cloud AI = <b>REST/HTTPS + API Key</b> · MQTT-based = <b>Pub/Sub + Broker</b></li>
<li>Function Calling = ต้องมี <b>function schema + parameters</b> · LLM แค่ "ขอ" เรียก ไม่ได้รันโค้ดเอง</li>
<li>Gateway ทำหน้าที่ <b>Protocol Bridging</b>, Logging, Monitoring, Error Handling</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> อย่าสับสน: Function Calling คือกลไกของ LLM (นิยามฟังก์ชันเฉพาะแอป) ส่วน MCP เป็น <b>โปรโตคอลมาตรฐาน</b> สำหรับให้ AI Client ใดๆ ใช้ Server เดียวกันได้</div>` },

    { t: "Model Context Protocol (MCP): Client และ Server", html: `
<h4>MCP คืออะไร</h4>
<p>โปรโตคอลมาตรฐานที่ทำให้ AI Model เชื่อมต่อกับเครื่องมือและข้อมูลภายนอก รวมถึงอุปกรณ์ IoT โดยไม่ต้องเขียนการเชื่อมต่อเฉพาะสำหรับ AI แต่ละตัว</p>
<ul>
<li><b>MCP Client</b>: AI Application (เช่น AI Chatbot) ที่เชื่อมต่อ MCP Server และเรียก Tool</li>
<li><b>MCP Server</b>: ให้ความสามารถ (Tool/Resource/Prompt) แก่ Client ภายในจะเรียก Python function, MQTT, Database, API ของระบบ IoT ก็ได้</li>
<li>MCP Server ที่ทำงานบน Raspberry Pi ทำให้ AI ควบคุม LED/เซนเซอร์ผ่าน MQTT ได้</li>
</ul>
<h4>ขั้นตอนเมื่อผู้ใช้สั่งงาน</h4>
<pre><code>User: "เปิดไฟ LED"
  → AI Chatbot เลือก tool set_led, action = "on"
  → MCP Client เรียก MCP Server
  → MCP Server (Python) ตรวจ action แล้ว publish "ON" ไป MQTT topic
  → อุปกรณ์ที่ subscribe topic เปิด LED
  → MCP Server ส่งผลลัพธ์กลับ → AI ตอบผู้ใช้</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Client = ฝั่ง AI · Server = ฝั่งให้ Tool/Resource/Prompt</li>
<li>AI ไม่ได้ต่อ GPIO/MQTT ตรงๆ แต่เรียกผ่าน Tool ที่ Server เปิดให้</li>
</ul></div>` },

    { t: "Tools · Resources · Prompts", html: `
<table>
<tr><th>องค์ประกอบ</th><th>หน้าที่</th><th>ตัวอย่าง</th></tr>
<tr><td><b>Tools</b></td><td>ความสามารถที่ AI <b>ลงมือทำ</b> (Action) หรืออ่านค่าสดจากระบบ เช่น สั่งอุปกรณ์ ถ่ายภาพ</td><td><code>set_led(action)</code>, <code>get_temperature()</code>, <code>count_people()</code>, <code>capture_image()</code></td></tr>
<tr><td><b>Resources</b></td><td>ข้อมูล/เอกสารที่ AI <b>อ่านเป็น context</b> อ้างอิงด้วย URI (ไม่ใช่การสั่งงาน)</td><td>ไฟล์ PDF, ฐานข้อมูล (Database), ไฟล์ Log</td></tr>
<tr><td><b>Prompts</b></td><td><b>แม่แบบ prompt สำเร็จรูป</b> (shortcut) เพื่อให้ได้ผลลัพธ์รูปแบบที่ต้องการอย่างสม่ำเสมอ</td><td><code>analyze_room</code>, <code>daily_energy_report</code>, <code>inspect_camera</code></td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>จะ "ทำ/สั่ง" = <b>Tool</b> · จะ "อ่านข้อมูลอ้างอิง" = <b>Resource</b> · จะ "ใช้แม่แบบคำสั่ง" = <b>Prompt</b></li>
<li>ชื่อ tool ที่ควรจำ: set_led, get_temperature, count_people, capture_image</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> การนับคนจากภาพ (count_people) ไม่ใช่ Resource เพราะต้อง "ประมวลผล ณ ขณะเรียก" ถ้าต้องการให้ AI อ่านรายงานย้อนหลังจาก Log จึงเหมาะกับ Resource</div>` },

    { t: "Transport และ Authentication/Authorization", html: `
<table>
<tr><th>Transport</th><th>วิธีทำงาน</th><th>เหมาะกับ</th></tr>
<tr><td><b>stdio</b> (Standard Input/Output)</td><td>MCP Client รัน MCP Server เป็น <b>process</b> บนเครื่องเดียวกัน แล้วสื่อสารผ่าน stdin/stdout</td><td>ใช้ในเครื่อง/ทดสอบ ไม่เปิดพอร์ตเครือข่าย</td></tr>
<tr><td><b>Streamable HTTP</b></td><td>Client เรียก <b>HTTP Endpoint</b> ของ Server (เช่น <code>/mcp</code>)</td><td>เข้าถึงผ่านเครือข่ายได้ (Network accessibility), รองรับหลายผู้ใช้ (Multi-user)</td></tr>
</table>
<h4>Authentication vs Authorization</h4>
<ul>
<li><b>Authentication</b>: ยืนยันตัวตนว่าใครคือผู้เรียก (ทั้ง AI Client/ผู้ใช้ที่เชื่อมต่อ MCP Server)</li>
<li><b>Authorization</b>: กำหนดสิทธิ์ว่าผู้ใช้/Client นั้น <b>ทำอะไรได้บ้าง</b> เช่น เรียก tool ไหนได้</li>
<li>เหตุผลที่ต้องมี: MCP Server เปิดให้ AI เรียก Tool ที่ทำงานกับอุปกรณ์จริง และผู้ใช้ AI Chatbot ก็มีหลายคน</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>stdio = process เดียวกันเครื่องเดียว · Streamable HTTP = ผ่านเครือข่าย + หลายผู้ใช้ (endpoint <code>/mcp</code>)</li>
<li>Authentication = "คุณคือใคร" · Authorization = "คุณทำอะไรได้"</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> MCP Server บน Pi ที่อยู่หลัง NAT ใช้ stdio ให้ Chatbot บน Cloud เรียกไม่ได้ ต้องใช้ Streamable HTTP ร่วมกับ tunnel หรือ port forwarding</div>` },

    { t: "เขียน MCP Tool ด้วย Python", html: `
<pre><code>@mcp.tool()
def set_led(action: str) -&gt; str:
    """Turn the IoT LED on or off.
    action must be exactly 'on' or 'off'."""
    action = action.strip().lower()
    if action not in ("on", "off"):
        return "Error: action must be on or off"
    # publish เฉพาะคำสั่งที่อนุญาต
    info = mqtt_client.publish(COMMAND_TOPIC, action.upper(), qos=1)
    info.wait_for_publish(timeout=5)
    if info.rc != mqtt.MQTT_ERR_SUCCESS:
        return "MQTT publish failed"
    return f"Sent LED command: {action.upper()}"</code></pre>
<ul>
<li><code>@mcp.tool()</code> ประกาศให้ฟังก์ชันเป็น Tool ของ MCP Server</li>
<li><b>docstring</b> เป็นคำอธิบายที่ AI ใช้ตัดสินใจว่า tool ทำอะไร เมื่อไรควรเรียก พารามิเตอร์ <code>action</code> ต้องเป็นค่าอะไร (on / off)</li>
<li>ตรวจค่าก่อน (normalize ด้วย <code>strip().lower()</code> + whitelist) เพราะค่าที่ AI ส่งมาไม่ควรถูกเชื่อถือ 100%</li>
<li>publish ด้วย <code>qos=1</code> (ส่งอย่างน้อย 1 ครั้ง) แล้ว <code>wait_for_publish(timeout=5)</code> เพื่อยืนยัน และตรวจ <code>rc</code></li>
<li>ผลลัพธ์ที่ return คือสิ่งที่ AI นำไปตอบผู้ใช้</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>input <code>"  ON "</code> → <code>strip().lower()</code> → <code>"on"</code> → publish <code>"ON"</code> → return <code>Sent LED command: ON</code></li>
<li>input นอกเหนือ on/off → return <code>Error: action must be on or off</code> และ <b>ไม่ publish</b></li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> การตรวจ action คือการจำกัดความสามารถของ Tool ให้เป็นเฉพาะคำสั่งที่ปลอดภัย เป็นหลักการด้านความปลอดภัยของระบบที่ให้ AI สั่งอุปกรณ์จริง</div>` },

    { t: "แล็บ: MCP Server บน Raspberry Pi + Tunnel", html: `
<h4>ขั้นตอนหลัก</h4>
<ol>
<li><b>เตรียม library</b> บน Pi:
<pre><code>$ sudo apt update
$ sudo apt install python3-pip python3-full python3-venv -y
$ mkdir -p ~/iot-mcp
$ python3 -m venv ~/iot-mcp
$ source ~/iot-mcp/bin/activate
(iot-mcp) $ pip3 install "mcp[cli]" paho-mqtt
(iot-mcp) $ pip3 install RPi.GPIO</code></pre></li>
<li><b>สร้าง tunnel</b> (Pi มี Private IP ต้องการ Public URL) ใน terminal ใหม่:
<pre><code>$ ssh-keygen -t ed25519
$ ssh -t -R 80:127.0.0.1:8000 stable@proxy.tunnl.gg</code></pre></li>
<li>แก้ <code>server.py</code> (ใส่ Device ID, Client ID, ข้อมูล tunnel) แล้วรัน <code>python3 server.py</code></li>
<li>ต่อ LED กับ GPIO ตามโค้ด subscriber · subscribe topic <code>{DEVICE_ID}/command</code> (ทดสอบรับข้อความได้ด้วย Web Browser ที่ MQTT Broker เช่น mqtt-dashboard.com)</li>
<li>ใน AI Chatbot (เช่น ai.kmitl.ac.th) เพิ่ม MCP Server โดยใช้ URL ของ tunnel ต่อท้ายด้วย <code>/mcp</code> แล้วพิมพ์ prompt สั่งงาน เช่น เรียก tool <code>set_led</code></li>
</ol>
<h4>Tunneling</h4>
<ul>
<li>ปัญหา: อุปกรณ์ Private IP หลัง router/firewall ถูกเข้าจาก Internet ไม่ได้</li>
<li>ทางแก้: <b>Port Forwarding</b> ที่ Router หรือบริการ tunnel เช่น <b>Ngrok</b>, <b>localhost.run</b>, <b>tunnl.gg</b></li>
<li><code>-R</code> = <b>reverse tunnel</b>: <code>80:127.0.0.1:8000</code> ส่งต่อพอร์ต 80 ของ tunnl.gg มายัง <code>127.0.0.1:8000</code> ของเครื่องเรา (บริการที่รันบน localhost:8000) · เมื่อรันเสร็จจะได้ Public URL เช่น <code>xxxx.tunnl.gg</code></li>
<li>ปิด terminal ที่เปิด SSH tunnel = tunnel หยุดทำงาน และ URL อาจเปลี่ยนเมื่อสร้างใหม่</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>URL ที่ใช้ใน Chatbot = Public URL ของ tunnel + <b>/mcp</b></li>
<li>ต้องเปิด 2 terminal: อันหนึ่งรัน tunnel อีกอันรัน <code>server.py</code> (ใน venv ที่ activate แล้ว)</li>
<li>ห่วงโซ่ทั้งหมด: Chatbot → Tunnel → MCP Server (Pi) → MQTT Broker → อุปกรณ์ที่ subscribe → LED</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ถ้า LED ไม่ติดแต่ Broker เห็นข้อความ <code>ON</code> บน topic แล้ว แปลว่าส่วน MCP/tunnel ใช้ได้ ให้ไล่ปัญหาฝั่ง subscriber/GPIO/วงจร LED</div>` }
  ],
  ex: [
    { type: "choice",
      story: "โรงงานต้องการตรวจชิ้นงานบกพร่องบนสายพานด้วยกล้องที่ติดกับอุปกรณ์ ต้องตัดสินใจภายในไม่กี่มิลลิวินาที เครือข่ายอินเทอร์เน็ตของโรงงานไม่เสถียรและบางครั้งขาดหาย และข้อมูลภาพเป็นความลับ",
      q: "แนวทางการเชื่อมต่อ AI ใดเหมาะสมที่สุด?",
      opts: [
        { t: "Cloud AI Integration ส่งภาพทุกเฟรมไปยัง API ผ่าน HTTPS พร้อม API Key", why: "ผิด ต้องพึ่งอินเทอร์เน็ตที่ไม่เสถียร เพิ่ม latency และภาพออกนอกโรงงาน" },
        { t: "MQTT-based AIoT โดยให้โมเดลบน Cloud subscribe ภาพจาก Broker", why: "ผิด ยังต้องส่งข้อมูลผ่านอินเทอร์เน็ตไปยัง Cloud จึงมีปัญหาเดียวกัน" },
        { t: "Edge AI / Local Integration รันโมเดลบนอุปกรณ์หรือ Server ในโรงงานเอง", why: "ถูก ประมวลผลในพื้นที่ ใช้งาน offline ได้ latency ต่ำ และข้อมูลไม่ออกนอกระบบ (แลกกับข้อจำกัด CPU/RAM)" },
        { t: "LLM Tool Calling ให้ LLM บน Cloud เรียกฟังก์ชันตรวจภาพ", why: "ผิด Tool Calling เป็นกลไกให้ LLM สั่งฟังก์ชัน ไม่แก้ปัญหา latency และความไม่เสถียรของเครือข่าย" }
      ], ans: 2 },

    { type: "choice",
      story: "ทีมต้องการให้ผู้ใช้พิมพ์ว่า \"ช่วยเปิดไฟ LED หน่อย\" ใน AI Chatbot แล้วไฟที่ต่อกับ Raspberry Pi ติดจริง โดยใช้ MCP",
      q: "ควรเปิดความสามารถนี้เป็นองค์ประกอบใดของ MCP Server?",
      opts: [
        { t: "Tool เช่น set_led(action) ที่ทำงาน (publish MQTT) เมื่อ AI เรียก", why: "ถูก การสั่งงาน/ทำให้เกิดผลกับโลกจริงคือหน้าที่ของ Tool" },
        { t: "Resource ที่เก็บสถานะ LED เป็นไฟล์ข้อความ", why: "ผิด Resource ใช้ให้ AI อ่านข้อมูลเป็น context ไม่ใช่การสั่งให้ไฟติด" },
        { t: "Prompt ชื่อ turn_on_led ที่เก็บข้อความแม่แบบ", why: "ผิด Prompt เป็นแม่แบบคำสั่งสำหรับ AI ไม่ได้ทำให้อุปกรณ์ทำงาน" },
        { t: "MCP Client บน Pi ที่คอยฟังคำสั่ง", why: "ผิด Client คือฝั่ง AI Application ส่วนความสามารถที่ให้เรียกต้องอยู่ที่ Server" }
      ], ans: 0 },

    { type: "choice",
      story: "นักศึกษารัน MCP Server (พอร์ต 8000) บน Raspberry Pi ที่อยู่ในเครือข่ายหอพัก (Private IP 192.168.1.20) แล้วใส่ URL <code>http://192.168.1.20:8000/mcp</code> ลงใน AI Chatbot ที่ทำงานบนอินเทอร์เน็ต พบว่าเชื่อมต่อไม่ได้",
      q: "ควรแก้อย่างไรให้เหมาะสมที่สุด?",
      opts: [
        { t: "เปลี่ยน transport เป็น stdio เพื่อให้ Chatbot บน Cloud เรียกผ่านเครือข่าย", why: "ผิด stdio ใช้ process ในเครื่องเดียวกัน ไม่ใช่การเรียกข้ามเครือข่าย" },
        { t: "เพิ่ม API Key ให้ Chatbot", why: "ผิด ปัญหาคือเข้าถึงเครือข่ายไม่ถึง (Private IP) ไม่ใช่เรื่องยืนยันตัวตน" },
        { t: "เปลี่ยน endpoint จาก /mcp เป็น /api", why: "ผิด endpoint ที่ใช้คือ /mcp และปัญหาไม่ได้อยู่ที่ path" },
        { t: "สร้าง tunnel (เช่น ssh -R ไป tunnl.gg) เพื่อให้มี Public URL แล้วใช้ URL นั้นต่อท้ายด้วย /mcp", why: "ถูก Private IP เรียกจากอินเทอร์เน็ตไม่ได้ tunnel ส่งต่อทราฟฟิกจาก Public URL มายัง localhost:8000 ของ Pi" }
      ], ans: 3 },

    { type: "choice",
      story: "ทีมพัฒนาโปรแกรม AI บนเครื่องโน้ตบุ๊กเครื่องเดียวและต้องการให้โปรแกรมเรียก MCP Server ที่เขียนไว้บนเครื่องเดียวกัน โดยไม่ต้องการเปิดพอร์ตเครือข่ายและมีผู้ใช้แค่คนเดียว",
      q: "transport ใดของ MCP เหมาะสมที่สุด?",
      opts: [
        { t: "Streamable HTTP พร้อมเปิด endpoint /mcp ให้ทั้งโลก", why: "ผิด เกินความจำเป็นและเพิ่มความเสี่ยงโดยไม่จำเป็น เหมาะกับกรณีเข้าถึงผ่านเครือข่ายหรือหลายผู้ใช้" },
        { t: "stdio ให้ Client รัน Server เป็น process แล้วคุยผ่าน stdin/stdout", why: "ถูก เหมาะกับการใช้ในเครื่องเดียว ไม่ต้องเปิดพอร์ต" },
        { t: "MQTT เพราะเป็นโปรโตคอลของ IoT", why: "ผิด MQTT ไม่ใช่ transport ของ MCP (MCP ใช้ stdio หรือ Streamable HTTP)" },
        { t: "CoAP over UDP", why: "ผิด ไม่ใช่ transport ที่ MCP กำหนด" }
      ], ans: 1 },

    { type: "choice",
      story: "MCP Server มี tool ดังนี้<pre><code>@mcp.tool()\ndef set_led(action: str) -&gt; str:\n    action = action.strip().lower()\n    if action not in (\"on\", \"off\"):\n        return \"Error: action must be on or off\"\n    info = mqtt_client.publish(COMMAND_TOPIC, action.upper(), qos=1)\n    info.wait_for_publish(timeout=5)\n    if info.rc != mqtt.MQTT_ERR_SUCCESS:\n        return \"MQTT publish failed\"\n    return f\"Sent LED command: {action.upper()}\"</code></pre>AI เรียก <code>set_led(\"  Blink \")</code> และอีกครั้งเรียก <code>set_led(\" On \")</code> (สมมติ MQTT ปกติ)",
      q: "ผลลัพธ์ของสองการเรียกตามลำดับคือข้อใด?",
      opts: [
        { t: "publish \"BLINK\" แล้วคืน Sent LED command: BLINK / publish \"ON\" แล้วคืน Sent LED command: ON", why: "ผิด \"blink\" ไม่อยู่ใน whitelist (on/off) จึงไม่ถูก publish" },
        { t: "คืน MQTT publish failed / คืน Sent LED command: On", why: "ผิด การเรียกแรกไม่ได้ไปถึงขั้น publish และการเรียกที่สองถูก normalize เป็น ON (ตัวพิมพ์ใหญ่)" },
        { t: "คืน Error: action must be on or off (ไม่ publish) / publish \"ON\" แล้วคืน Sent LED command: ON", why: "ถูก \"  Blink \" → \"blink\" ไม่อยู่ใน (on, off) จึง return error ส่วน \" On \" → \"on\" ผ่าน และ publish ด้วย upper() เป็น ON" },
        { t: "เกิด Exception เพราะ action มีช่องว่าง", why: "ผิด strip() ตัดช่องว่างให้แล้ว ไม่เกิด Exception" }
      ], ans: 2 },

    { type: "choice",
      story: "เพื่อนในทีมเสนอให้ลบโค้ดตรวจ <code>if action not in (\"on\", \"off\")</code> ออกจาก tool set_led โดยให้เหตุผลว่า \"LLM ฉลาดอยู่แล้ว จะส่งแต่ on/off\" และให้ publish ค่า action ที่ได้รับไปที่ MQTT topic ตรงๆ",
      q: "ข้อใดอธิบายเหตุผลที่ควรเก็บการตรวจสอบนี้ไว้ได้ถูกต้องที่สุด?",
      opts: [
        { t: "เพราะการตรวจทำให้ MQTT ส่งข้อความเร็วขึ้น", why: "ผิด การตรวจค่าไม่ได้ทำให้ส่งเร็วขึ้น" },
        { t: "เพราะค่าที่ LLM ส่งมาเป็น input ที่ควบคุมไม่ได้เต็มที่ ควร publish เฉพาะคำสั่งที่อนุญาตเพื่อความปลอดภัยของอุปกรณ์", why: "ถูก LLM อาจส่งค่าผิดรูปแบบหรือถูกชักจูงจากข้อความผู้ใช้ จึงต้อง whitelist ก่อนส่งคำสั่งเข้าระบบจริง" },
        { t: "เพราะ Python บังคับให้ตรวจ str ก่อนทุกครั้ง", why: "ผิด Python ไม่ได้บังคับการตรวจแบบนี้ เป็นการออกแบบของผู้เขียน" },
        { t: "เพราะ docstring จะไม่ทำงานถ้าไม่มี if", why: "ผิด docstring เป็นคำอธิบายให้ AI อ่าน ไม่เกี่ยวกับการมี if" }
      ], ans: 1 },

    { type: "choice",
      story: "ระบบ MCP บน Pi เปิดให้ผู้ใช้หลายคนผ่าน Streamable HTTP ผู้ใช้ A ล็อกอินสำเร็จ (ระบบรู้ว่าเป็น A) แต่ถูกกำหนดให้เรียกได้เฉพาะ get_temperature เมื่อ A พยายามเรียก set_led ระบบปฏิเสธ",
      q: "กลไกที่ปฏิเสธการเรียก set_led คือส่วนใด?",
      opts: [
        { t: "Authentication ยืนยันตัวตนผู้ใช้ว่าเป็น A", why: "ผิด การยืนยันตัวตนผ่านแล้ว (ระบบรู้ว่าเป็น A) ส่วนที่ปฏิเสธเป็นอีกกลไก" },
        { t: "Tunnel ที่บล็อกการเรียกบาง tool", why: "ผิด tunnel เพียงส่งต่อทราฟฟิก ไม่ตัดสินสิทธิ์ราย tool" },
        { t: "transport แบบ stdio", why: "ผิด สถานการณ์นี้ใช้ Streamable HTTP และ transport ไม่ได้กำหนดสิทธิ์" },
        { t: "Authorization กำหนดสิทธิ์ว่าผู้ใช้นั้นเรียก tool ใดได้บ้าง", why: "ถูก Authorization คือการอนุญาตว่า \"ทำอะไรได้\" หลังจากรู้แล้วว่าเป็นใคร" }
      ], ans: 3 },

    { type: "choice",
      story: "หลังตั้งค่าแล้ว ผู้ใช้สั่งใน Chatbot ว่า \"เปิดไฟ\" ระบบตอบว่า <code>Sent LED command: ON</code> และเมื่อเปิด MQTT Dashboard ในเบราว์เซอร์ที่ subscribe topic <code>{DEVICE_ID}/command</code> ก็เห็นข้อความ <code>ON</code> เข้ามา แต่ LED ที่ต่อกับ Pi ไม่ติด",
      q: "ควรตรวจสอบส่วนใดเป็นอันดับแรก?",
      opts: [
        { t: "ฝั่ง subscriber/GPIO บน Pi: ขา LED, ขั้วและตัวต้านทาน, และโค้ดที่ตอบสนองข้อความ ON", why: "ถูก Chatbot → MCP → tunnel → MQTT ทำงานครบแล้ว (เห็น ON ที่ Broker) ปัญหาอยู่ที่ปลายทางที่ควบคุม LED" },
        { t: "สร้าง tunnel ใหม่เพื่อให้ได้ Public URL ใหม่", why: "ผิด tunnel ใช้ได้แล้ว เพราะ MCP Server ได้รับคำสั่งและ publish ออกไป" },
        { t: "เพิ่ม docstring ใน tool ให้ละเอียดขึ้น", why: "ผิด docstring มีผลต่อการที่ AI เลือกเรียก tool แต่ AI เรียกถูกแล้ว" },
        { t: "เปลี่ยน transport จาก Streamable HTTP เป็น stdio", why: "ผิด การเรียกผ่านสำเร็จแล้ว การเปลี่ยน transport ไม่แก้ปัญหาการขับ LED" }
      ], ans: 0 },

    { type: "multi",
      story: "องค์ประกอบของ MCP ที่ใช้กับระบบ IoT",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Tool เป็นความสามารถที่ AI เรียกให้ลงมือทำ เช่น set_led() หรือ capture_image()", ok: true, why: "ถูก Tool = Action" },
        { t: "Resource ใช้สั่งเปิด/ปิดอุปกรณ์โดยตรง", ok: false, why: "ผิด Resource คือข้อมูล/เอกสารให้ AI อ่านเป็น context" },
        { t: "Resource เหมาะกับข้อมูลอ้างอิง เช่น PDF คู่มือ ฐานข้อมูล หรือไฟล์ Log ที่อ้างด้วย URI", ok: true, why: "ถูก" },
        { t: "Prompt คือแม่แบบ prompt สำเร็จรูป เช่น analyze_room หรือ daily_energy_report", ok: true, why: "ถูก ช่วยให้ผลลัพธ์สม่ำเสมอ" },
        { t: "MCP Client คือโปรแกรมบน Pi ที่เปิด Tool ให้ AI เรียก", ok: false, why: "ผิด สิ่งที่เปิด Tool ให้เรียกคือ MCP Server ส่วน Client คือฝั่ง AI Application" },
        { t: "MCP รองรับ transport แบบ MQTT เป็นหนึ่งในสองแบบมาตรฐาน", ok: false, why: "ผิด สองแบบคือ stdio และ Streamable HTTP (MQTT เป็นช่องทางที่ Server ใช้คุยกับอุปกรณ์ภายใน)" }
      ] },

    { type: "multi",
      story: "ทีมกำลังเลือกใช้ Edge AI / TinyML กับอุปกรณ์เซนเซอร์ในโรงงาน",
      q: "เลือกทุกข้อที่เป็นเหตุผลสนับสนุนหรือข้อควรระวังที่ถูกต้อง",
      opts: [
        { t: "ตอบสนองแบบ Realtime ได้เพราะไม่ต้องรอไปกลับ Cloud", ok: true, why: "ถูก ประมวลผลบนอุปกรณ์ลด latency" },
        { t: "ใช้งานต่อได้แม้อินเทอร์เน็ตขาด (offline)", ok: true, why: "ถูก โมเดลรันในพื้นที่" },
        { t: "อุปกรณ์ปลายทางมีทรัพยากร CPU/RAM/พลังงาน จำกัด จึงต้องเลือกโมเดลให้เล็กพอ", ok: true, why: "ถูก เป็นข้อแลกเปลี่ยนสำคัญของ Edge AI" },
        { t: "Edge AI ไม่มีข้อจำกัดด้านขนาดโมเดลหรือพลังงานเลย", ok: false, why: "ผิด ตรงข้ามกับความจริงของ TinyML" },
        { t: "จำเป็นต้องมี API Key เพื่อเรียกโมเดลบน Cloud ทุกครั้งที่ทำนาย", ok: false, why: "ผิด นั่นคือ Cloud AI ไม่ใช่ Edge AI ที่โมเดลรันบนอุปกรณ์" }
      ] },

    { type: "blank",
      text: "ในการสร้าง tunnel ใช้คำสั่ง <code>ssh -t {1} 80:127.0.0.1:{2} stable@proxy.tunnl.gg</code> โดยตัวเลือกแรกคือ reverse tunnel และพอร์ตท้ายคือพอร์ตของบริการบนเครื่องเรา เมื่อได้ Public URL แล้ว URL ที่ใส่ใน Chatbot ต้องต่อท้ายด้วย {3}",
      blanks: [
        { opts: ["-L", "-R", "-D", "-X"], ans: 1, why: "-R คือ reverse tunnel (remote forward)" },
        { opts: ["80", "443", "8000", "22"], ans: 2, why: "บริการ MCP Server รันที่ 127.0.0.1:8000" },
        { opts: ["/api", "/mcp", "/tool", "/sse"], ans: 1, why: "Streamable HTTP endpoint ของ MCP Server คือ /mcp" }
      ] },

    { type: "blank",
      text: "MCP Server ติดต่อกับ Client ผ่าน {1} เมื่อ Client รัน Server เป็น process เดียวกันบนเครื่องเดียว หรือผ่าน {2} เมื่อต้องการให้เข้าถึงผ่านเครือข่ายและรองรับหลายผู้ใช้ ส่วนการประกาศฟังก์ชัน Python ให้เป็น Tool ใช้ decorator {3}",
      blanks: [
        { opts: ["Streamable HTTP", "stdio", "MQTT", "CoAP"], ans: 1, why: "stdio สื่อสารผ่าน stdin/stdout ของ process" },
        { opts: ["stdio", "AMQP", "Streamable HTTP", "WebRTC"], ans: 2, why: "Streamable HTTP ใช้ HTTP endpoint เข้าถึงผ่านเครือข่ายได้" },
        { opts: ["@mcp.tool()", "@app.route()", "@client.call", "@mqtt.publish"], ans: 0, why: "@mcp.tool() ประกาศ Tool ของ MCP Server" }
      ] },

    { type: "blank",
      text: "เตรียมสภาพแวดล้อมบน Pi: สร้าง virtual environment ด้วย <code>python3 -m {1} ~/iot-mcp</code> เปิดใช้งานด้วย <code>{2} ~/iot-mcp/bin/activate</code> แล้วติดตั้ง library ด้วย <code>pip3 install \"{3}\" paho-mqtt</code>",
      blanks: [
        { opts: ["virtual", "env", "venv", "pipenv"], ans: 2, why: "โมดูลมาตรฐานคือ venv" },
        { opts: ["run", "exec", "source", "cd"], ans: 2, why: "source ใช้ activate environment" },
        { opts: ["flask", "mcp[cli]", "openai", "requests"], ans: 1, why: "mcp[cli] คือ library MCP ส่วน paho-mqtt ใช้ส่ง MQTT" }
      ] },

    { type: "match",
      q: "จับคู่แนวทางเชื่อมต่อ AI กับ IoT กับลักษณะเด่น",
      pairs: [
        ["Cloud AI Integration", "ส่งข้อมูลผ่าน REST API / HTTPS และยืนยันตัวตนด้วย API Key"],
        ["MQTT-Based AIoT", "ใช้ Publish/Subscribe ผ่าน Broker ระหว่างอุปกรณ์กับ AI Model"],
        ["Edge AI / Local", "รันโมเดลในพื้นที่ ใช้ offline ได้ latency ต่ำ"],
        ["LLM Function Calling", "นิยาม function schema และ parameters เช่น set_led() ให้ LLM เลือกเรียก"],
        ["AIoT Gateway", "Protocol bridging พร้อม logging, monitoring, error handling"]
      ],
      why: "แต่ละแนวทางมีจุดเด่นต่างกัน: Cloud ใช้ HTTPS + API Key, MQTT ใช้ Pub/Sub, Edge ลด latency และทำงาน offline, Function Calling ใช้ schema ของฟังก์ชัน, Gateway เป็นจุดกลางเชื่อมหลายระบบ" }
  ]
});
