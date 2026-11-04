// แผนภาพประกอบสรุปรายบท (SVG สร้างด้วย JS) — แทรกไว้ต้นแต่ละบทใน NOTES
(function () {
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function svg(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker></defs>' + body + '</svg>';
  }
  function T(x, y, s, c, a) { return '<text x="' + x + '" y="' + y + '" class="t ' + (c || "") + '" text-anchor="' + (a || "middle") + '">' + esc(s) + '</text>'; }
  function B(x, y, w, h, s, c) {
    var lines = String(s).split("\n"), t = "";
    lines.forEach(function (l, i) { t += T(x + w / 2, y + h / 2 + 5 + (i - (lines.length - 1) / 2) * 16, l); });
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" class="bx ' + (c || "") + '"/>' + t;
  }
  function A(x1, y1, x2, y2, lab, c, dash) {
    var s = '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="ln ' + (c || "") + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + ' marker-end="url(#ar)"/>';
    if (lab) s += T((x1 + x2) / 2, (y1 + y2) / 2 - 6, lab, "sm " + (c || ""));
    return s;
  }
  // sequence diagram: actors [names], msgs [[from,to,label,cls]]
  function seq(actors, msgs, w) {
    w = w || 640; var gap = w / actors.length, xs = actors.map(function (_, i) { return gap * i + gap / 2; }), h = 50 + msgs.length * 34 + 10, s = "";
    actors.forEach(function (a, i) { s += B(xs[i] - Math.min(55, gap / 2 - 4), 4, Math.min(110, gap - 8), 30, a, "hd") + '<line x1="' + xs[i] + '" y1="34" x2="' + xs[i] + '" y2="' + (h - 4) + '" class="ln lf" stroke-dasharray="3 4"/>'; });
    msgs.forEach(function (m, i) { var y = 58 + i * 34; s += A(xs[m[0]], y, xs[m[1]], y, m[2], m[3]); });
    return svg(w, h, s);
  }
  function fig(title, svgs, note) { return '<div class="dg"><div class="dgt">🖼️ ' + esc(title) + '</div>' + svgs + (note ? '<div class="dgn">' + note + '</div>' : '') + '</div>'; }

  var D = {};

  D.rest = fig("Polling vs WebSocket",
    '<div class="two">' +
    seq(["Client", "Server"], [[0, 1, "ขอข้อมูลไหม?"], [1, 0, "ยังไม่มี", "bad"], [0, 1, "ขอข้อมูลไหม?"], [1, 0, "ยังไม่มี", "bad"], [0, 1, "ขอข้อมูลไหม?"], [1, 0, "มีแล้ว!", "ok"]], 300) +
    seq(["Client", "Server"], [[0, 1, "HTTP Upgrade"], [1, 0, "101 Switching", "ok"], [1, 0, "data (push)", "ok"], [0, 1, "data", "ok"], [1, 0, "data (push)", "ok"]], 300) +
    '</div>', "ซ้าย: Polling — client ถามซ้ำเอง เปลือง request · ขวา: WebSocket — handshake ครั้งเดียว แล้วสองฝั่งส่งหากันได้ทันที (full-duplex)");

  D.mqtt = fig("Publish / Subscribe ผ่าน Broker",
    svg(640, 190,
      B(20, 20, 120, 44, "Publisher\n(เซนเซอร์)") + B(20, 120, 120, 44, "Publisher 2", "") +
      B(250, 55, 140, 80, "MQTT Broker\nกรองตาม Topic", "hd") +
      B(500, 20, 120, 44, "Subscriber A\n(sub home/#)") + B(500, 120, 120, 44, "Subscriber B\n(sub home/temp)") +
      A(140, 42, 250, 80, "publish home/temp") + A(140, 142, 250, 110, "publish home/led") +
      A(390, 80, 500, 42, "ส่งต่อ") + A(390, 110, 500, 142, "ส่งต่อ")) +
    '<br>' + fig("QoS 0 / 1 / 2", '<div class="three">' +
      seq(["Sender", "Receiver"], [[0, 1, "PUBLISH"]], 210) +
      seq(["Sender", "Receiver"], [[0, 1, "PUBLISH"], [1, 0, "PUBACK", "ok"]], 210) +
      seq(["Sender", "Receiver"], [[0, 1, "PUBLISH"], [1, 0, "PUBREC", "ok"], [0, 1, "PUBREL"], [1, 0, "PUBCOMP", "ok"]], 210) + '</div>',
      "QoS 0 ส่งทีเดียว · QoS 1 มี ACK (อาจซ้ำ) · QoS 2 สี่ขั้น ไม่ซ้ำ ช้าสุด").replace('class="dg"', 'class="dg in"') +
    '<br>' + fig("Last Will (LWT)", seq(["Client (ตั้ง LWT)", "Broker", "Subscriber"], [[0, 1, "CONNECT + will: offline"], [0, 1, "PUBLISH ปกติ"], [1, 2, "ส่งต่อ"], [0, 1, "หลุด! (ไม่ DISCONNECT)", "bad"], [1, 2, "will: offline", "bad"]], 640)).replace('class="dg"', 'class="dg in"'),
    "Publisher/Subscriber ไม่รู้จักกัน — คุยผ่าน Topic เท่านั้น");

  D.amqp = fig("เส้นทางข้อความใน AMQP",
    svg(660, 230,
      B(10, 85, 100, 50, "Producer") +
      B(190, 70, 110, 80, "Exchange\n(direct/topic\n/fanout/headers)", "hd") +
      B(420, 15, 110, 44, "Queue 1") + B(420, 93, 110, 44, "Queue 2") + B(420, 171, 110, 44, "Queue 3") +
      B(570, 15, 85, 44, "Consumer") + B(570, 93, 85, 44, "Consumer") + B(570, 171, 85, 44, "Consumer") +
      A(110, 110, 190, 110, "routing key=red") +
      A(300, 90, 420, 37, "binding: red", "ok") + A(300, 112, 420, 115, "binding: red.*", "ok") + A(300, 135, 420, 193, "binding: blue", "bad") +
      A(530, 37, 570, 37) + A(530, 115, 570, 115) + A(530, 193, 570, 193)),
    "Producer ไม่ส่งเข้า Queue ตรงๆ — Exchange เทียบ routing key กับ binding key แล้วเลือก Queue (ตัวอย่าง direct: red → Queue 1 เท่านั้น)");

  D.coap = fig("CoAP: Request/Response และ Observe",
    '<div class="two">' + seq(["Client", "Server (Resource /led)"], [[0, 1, "PUT /led \"ON\""], [1, 0, "2.04 Changed", "ok"], [0, 1, "GET /temperature"], [1, 0, "2.05 Content: 25.6", "ok"]], 330) +
    seq(["Client", "Server"], [[0, 1, "GET /temp (Observe=0)"], [1, 0, "2.05 ค่าแรก", "ok"], [1, 0, "notify: ค่าเปลี่ยน", "ok"], [1, 0, "notify: ค่าเปลี่ยน", "ok"]], 330) + '</div>',
    "ทำงานบน UDP · ซ้าย: ถาม–ตอบแบบ HTTP · ขวา: Observe = สมัครรับแจ้งเมื่อค่าเปลี่ยน (คล้าย subscribe)");

  D.lora = fig("สถาปัตยกรรม LoRaWAN (uplink)",
    svg(680, 130,
      B(5, 40, 110, 50, "End device\n(MCU+LoRa)") + B(170, 40, 100, 50, "Gateway") + B(335, 40, 110, 50, "Network\nServer", "hd") + B(510, 40, 110, 50, "Application\nServer") +
      A(115, 65, 170, 65, "RF (LoRa)") + A(270, 65, 335, 65, "IP") + A(445, 65, 510, 65, "payload") +
      T(60, 20, "Class A/B/C", "sm") + T(220, 20, "RF→IP + metadata", "sm") + T(390, 20, "dedup·join·ADR", "sm") + T(565, 20, "AppSKey ถอดรหัส", "sm") +
      T(340, 120, "downlink ย้อนกลับทางเดิม", "sm")) +
    fig("SF สูง ↔ ไกลแต่ช้า", svg(640, 110,
      B(10, 10, 130, 30, "SF7", "ok") + B(150, 10, 130, 30, "SF9") + B(290, 10, 130, 30, "SF10") + B(430, 10, 190, 30, "SF12", "bad") +
      A(10, 70, 620, 70, "") + T(60, 95, "เร็ว · ใกล้ · Time on Air สั้น", "sm", "start") + T(630, 95, "ช้า · ไกล · Time on Air นาน", "sm", "end")), "").replace('class="dg"', 'class="dg in"') +
    fig("Class ของ End device", svg(640, 120,
      T(8, 20, "Class A", "b", "start") + '<rect x="90" y="8" width="40" height="18" class="bx ok"/><rect x="132" y="8" width="30" height="18" class="bx"/><rect x="164" y="8" width="30" height="18" class="bx"/>' + T(210, 22, "uplink → RX1 → RX2 แล้วหลับ", "sm", "start") +
      T(8, 60, "Class B", "b", "start") + '<rect x="90" y="48" width="40" height="18" class="bx ok"/><rect x="132" y="48" width="14" height="18" class="bx hd"/><rect x="230" y="48" width="14" height="18" class="bx hd"/>' + T(260, 62, "beacon ตามเวลา → รับ downlink เป็นช่วง", "sm", "start") +
      T(8, 100, "Class C", "b", "start") + '<rect x="90" y="88" width="300" height="18" class="bx ok"/>' + T(400, 102, "เปิดรับตลอด (กินไฟมากสุด)", "sm", "start")), "").replace('class="dg"', 'class="dg in"'),
    "Gateway ไม่ถอดรหัส payload — มีแต่ Application Server ที่ถอดด้วย AppSKey");

  D.wifi = fig("OFDM vs OFDMA (Wi-Fi 6)",
    '<div class="two">' + svg(300, 170,
      T(150, 14, "OFDM: 1 user ต่อครั้ง", "b") + '<rect x="30" y="24" width="60" height="110" class="bx ok"/><rect x="90" y="24" width="60" height="110" class="bx"/><rect x="150" y="24" width="60" height="110" class="bx hd"/><rect x="210" y="24" width="60" height="110" class="bx bad"/>' +
      T(60, 85, "U1") + T(120, 85, "U2") + T(180, 85, "U3") + T(240, 85, "U4") + T(150, 155, "เวลา →", "sm")) +
    svg(300, 170,
      T(150, 14, "OFDMA: แบ่งเป็น RU พร้อมกัน", "b") + '<rect x="30" y="24" width="240" height="28" class="bx ok"/><rect x="30" y="52" width="240" height="28" class="bx"/><rect x="30" y="80" width="240" height="28" class="bx hd"/><rect x="30" y="108" width="240" height="28" class="bx bad"/>' +
      T(150, 43, "RU user 1") + T(150, 71, "RU user 2") + T(150, 99, "RU user 3") + T(150, 127, "RU user 4") + T(150, 155, "เวลา → (ความถี่แบ่งเป็น RU)", "sm")) + '</div>',
    "OFDMA แบ่ง channel เป็นช่องย่อย (Resource Unit) ให้หลายคนส่งพร้อมกัน ลดการรอคิว")
    + fig("Path Loss: ระยะ ×2 = −6 dB", svg(640, 120,
      B(10, 40, 80, 40, "AP") + B(180, 40, 80, 40, "1 m") + B(320, 40, 80, 40, "2 m") + B(460, 40, 80, 40, "4 m") + B(580, 40, 55, 40, "8 m") +
      T(220, 105, "−40 dB (2.4G)", "sm") + T(360, 105, "−46", "sm") + T(500, 105, "−52", "sm") + T(607, 105, "−58", "sm") +
      A(90, 60, 180, 60) + A(260, 60, 320, 60, "−6") + A(400, 60, 460, 60, "−6") + A(540, 60, 580, 60, "−6")), "").replace('class="dg"', 'class="dg in"');

  D.pi = fig("Analog → Digital (ADC)",
    svg(640, 190,
      '<polyline points="30,150 80,150 80,115 160,115 160,80 240,80 240,45 320,45" fill="none" class="ln"/>' +
      '<path d="M30 150 C 100 150, 150 40, 320 40" fill="none" class="ln ok" stroke-dasharray="4 3"/>' +
      T(55, 170, "00", "sm") + T(120, 170, "01", "sm") + T(200, 170, "10", "sm") + T(280, 170, "11", "sm") +
      T(170, 188, "ตัวอย่าง ADC 2 bit: 4 ระดับ (เส้นประ = analog จริง)", "sm") +
      B(380, 20, 250, 60, "V = ADC × Vref / 2ⁿ\nMCP3208: n=12, Vref=3.3 V", "hd") +
      B(380, 100, 250, 60, "ADC = 2048 → 1.65 V\n1 LSB ≈ 0.8056 mV")) ,
    "Resolution n bit → 2ⁿ ระดับ (12 bit = 0–4095)")
    + fig("SPI: Raspberry Pi ↔ MCP3208", svg(640, 180,
      B(20, 20, 150, 140, "Raspberry Pi\n(Master)", "hd") + B(470, 20, 150, 140, "MCP3208\n(Slave)", "hd") +
      A(170, 40, 470, 40, "MOSI → DIN") + A(470, 75, 170, 75, "DOUT → MISO") + A(170, 110, 470, 110, "SCLK → CLK") + A(170, 145, 470, 145, "CE0 → CS")), "").replace('class="dg"', 'class="dg in"')
    + fig("PWM: Duty cycle", svg(640, 170,
      '<polyline points="20,70 20,30 60,30 60,70 140,70 140,30 180,30 180,70 260,70" fill="none" class="ln ok"/>' + T(140, 95, "Duty 25% → LED หรี่", "sm") +
      '<polyline points="340,70 340,30 420,30 420,70 440,70 440,30 520,30 520,70 540,70" fill="none" class="ln bad"/>' + T(440, 95, "Duty 80% → LED สว่าง", "sm") + T(320, 140, "Duty cycle = เวลา HIGH ÷ คาบ × 100%", "sm")), "").replace('class="dg"', 'class="dg in"');

  D.sens = fig("I2C: 2 สาย หลายอุปกรณ์",
    svg(640, 190,
      B(20, 60, 130, 70, "Raspberry Pi\n(Master)", "hd") +
      '<line x1="150" y1="80" x2="620" y2="80" class="ln"/><line x1="150" y1="115" x2="620" y2="115" class="ln"/>' + T(620, 72, "SDA", "sm", "end") + T(620, 132, "SCL", "sm", "end") +
      B(230, 10, 120, 40, "LCD 0x27", "") + B(400, 10, 120, 40, "SHT31 0x44", "") +
      '<line x1="290" y1="50" x2="290" y2="80" class="ln"/><line x1="460" y1="50" x2="460" y2="80" class="ln"/>' +
      T(320, 170, "ทุกอุปกรณ์ใช้สายร่วมกัน แยกกันด้วย address", "sm")),
    "ตรวจ address ด้วย sudo i2cdetect -y 1")
    + fig("HC-SR04 วัดระยะ", seq(["Raspberry Pi", "HC-SR04"], [[0, 1, "TRIG HIGH 10 µs"], [1, 1, "ส่งคลื่น 40 kHz ออกไป"], [1, 0, "ECHO HIGH (นาน = ไป-กลับ)", "ok"]], 640) +
      '<div class="dgn">ระยะ (cm) = เวลา ECHO × 17150 · ECHO 5 V → ตัวแบ่งแรงดัน 1k/2k → ≈ 3.3 V ก่อนเข้า GPIO</div>', "").replace('class="dg"', 'class="dg in"');

  D.ai = fig("AI สั่ง LED ผ่าน MCP + MQTT",
    svg(700, 130,
      B(5, 40, 100, 50, "AI Chatbot\n(MCP Client)") + B(150, 40, 120, 50, "MCP Server\non Raspberry Pi", "hd") + B(320, 40, 100, 50, "MQTT\nBroker") + B(470, 40, 110, 50, "อุปกรณ์/Pi\nsubscribe") + B(615, 40, 80, 50, "LED", "ok") +
      A(105, 65, 150, 65, "tool call") + A(270, 65, 320, 65, "publish") + A(420, 65, 470, 65) + A(580, 65, 615, 65) +
      T(105, 30, "set_led(\"on\")", "sm") + T(210, 118, "ผ่าน Tunnel/HTTPS (/mcp)", "sm"))
    + '<br>' + fig("MCP Server เปิด 3 อย่าง", svg(640, 110,
      B(10, 30, 130, 50, "MCP Server", "hd") + B(240, 5, 180, 30, "Tools: set_led()", "ok") + B(240, 40, 180, 30, "Resources: log, DB") + B(240, 75, 180, 30, "Prompts: analyze_room") +
      A(140, 55, 240, 20) + A(140, 55, 240, 55) + A(140, 55, 240, 90) +
      T(540, 55, "Transport:", "b") + T(540, 75, "stdio · Streamable HTTP", "sm")), "").replace('class="dg"', 'class="dg in"'),
    "Tool = ให้ AI ลงมือทำ · Resource = ให้ AI อ่านข้อมูล · Prompt = เทมเพลตคำสั่ง");

  if (window.NOTES) window.NOTES.forEach(function (n) { if (D[n.id]) n.html = D[n.id] + n.html; });
})();
