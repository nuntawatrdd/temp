var _h = function (x, y, l, c, w) { w = w || 60; return "<rect class='bx" + (c ? " " + c : "") + "' x='" + x + "' y='" + y + "' width='" + w + "' height='30' rx='5'/><text class='t b' x='" + (x + w / 2) + "' y='" + (y + 20) + "' text-anchor='middle'>" + l + "</text>"; };
var _l = function (x1, y1, x2, y2, c) { return "<line class='ln" + (c ? " " + c : "") + "' x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "'/>"; };
var _t = function (x, y, s, c) { return "<text class='t" + (c ? " " + c : "") + "' x='" + x + "' y='" + y + "' text-anchor='middle'>" + s + "</text>"; };
var _svg = function (w, h, b) { return "<svg viewBox='0 0 " + w + " " + h + "' xmlns='http://www.w3.org/2000/svg'>" + b + "</svg>"; };

/* F1: four hosts on one switch */
var F1 = _svg(460, 190,
  _l(80, 30, 190, 88) + _l(380, 30, 270, 88) + _l(80, 160, 190, 102) + _l(380, 160, 270, 102) +
  _h(190, 80, "Switch", "hd", 80) + _h(20, 15, "A") + _h(380, 15, "B") + _h(20, 145, "C") + _h(380, 145, "D") +
  _t(125, 50, "port 1", "sm") + _t(335, 50, "port 2", "sm") + _t(125, 150, "port 3", "sm") + _t(335, 150, "port 4", "sm"));

/* F2: A,B on a hub, hub on switch port 1; C port 2; D port 3 */
var F2 = _svg(540, 180,
  _l(60, 30, 110, 75) + _l(60, 130, 110, 95) + _l(170, 80, 250, 80) + _l(330, 72, 420, 30) + _l(330, 88, 420, 130) +
  _h(10, 15, "A", "", 50) + _h(10, 115, "B", "", 50) + _h(110, 65, "Hub", "hd", 60) + _h(250, 65, "Switch", "hd", 80) +
  _h(420, 15, "C", "", 60) + _h(420, 115, "D", "", 60) +
  _t(210, 68, "port 1", "sm") + _t(385, 42, "port 2", "sm") + _t(385, 125, "port 3", "sm"));

/* F3: one switch, VLAN 10 and VLAN 20 */
var F3 = _svg(480, 200,
  _l(110, 35, 190, 85) + _l(370, 35, 290, 85) + _l(240, 110, 240, 150) +
  _h(190, 80, "Switch", "hd", 100) + _h(10, 10, "A  VLAN 10", "ok", 100) + _h(370, 10, "B  VLAN 10", "ok", 100) + _h(190, 150, "C  VLAN 20", "bad", 100) +
  _t(150, 52, "port 1", "sm") + _t(330, 52, "port 2", "sm") + _t(280, 135, "port 3", "sm"));

/* F4: two switches joined by two cables */
var F4 = _svg(460, 180,
  _l(110, 68, 340, 68, "bad") + _l(110, 92, 340, 92, "bad") + _l(75, 90, 75, 130) + _l(375, 90, 375, 130) +
  _h(40, 60, "SW1", "hd", 70) + _h(340, 60, "SW2", "hd", 70) + _h(40, 130, "A", "", 70) + _h(340, 130, "B", "", 70) +
  _t(225, 60, "link 1", "sm") + _t(225, 108, "link 2", "sm"));

/* F5: hidden terminal */
var F5 = _svg(480, 170,
  _l(80, 75, 200, 75, "ok") + _l(300, 75, 420, 75, "ok") + _l(50, 90, 50, 135, "bad") + _l(50, 135, 450, 135, "bad") + _l(450, 135, 450, 90, "bad") +
  _h(20, 60, "A", "", 60) + _h(200, 60, "AP", "hd", 100) + _h(420, 60, "C", "", 60) +
  _t(250, 125, "A และ C ไม่ได้ยินกัน (กำแพง/ไกลเกินระยะ)", "sm") + _t(140, 65, "ได้ยิน", "sm") + _t(360, 65, "ได้ยิน", "sm"));

/* F6: 802.11 path H1 - AP - switch - R1 - Internet */
var F6 = _svg(560, 130,
  _l(70, 75, 115, 75, "ok") + _l(175, 75, 220, 75) + _l(280, 75, 325, 75) + _l(385, 75, 430, 75) +
  _h(10, 60, "H1", "", 60) + _h(115, 60, "AP", "hd", 60) + _h(220, 60, "Switch", "hd", 60) + _h(325, 60, "R1", "", 60) + _h(430, 60, "Internet", "ok", 100) +
  _t(92, 52, "air 802.11", "sm") + _t(252, 52, "wire 802.3", "sm"));

/* F7: two switches joined by a router */
var F7 = _svg(540, 190,
  _l(60, 30, 150, 85) + _l(60, 160, 150, 100) + _l(210, 92, 250, 92) + _l(330, 92, 370, 92) + _l(430, 85, 480, 30) + _l(430, 100, 480, 160) +
  _h(10, 15, "A", "", 50) + _h(10, 145, "B", "", 50) + _h(150, 77, "SW1", "hd", 60) + _h(250, 77, "Router", "hd", 80) + _h(370, 77, "SW2", "hd", 60) +
  _h(480, 15, "C", "", 50) + _h(480, 145, "D", "", 50) +
  _t(110, 40, "192.168.1.0/24", "sm") + _t(450, 40, "192.168.2.0/24", "sm"));

IOT.reg({
  id: "ll3",
  title: "Multiple Access, Ethernet, Switch, VLAN & Wi-Fi (Link Layer 3)",
  th: "หลายสถานีแชร์ช่องสัญญาณ (ALOHA, CSMA/CD), เฟรม Ethernet, switch เรียนรู้ MAC, ARP, VLAN, STP และ Wi-Fi (CSMA/CA, BSS/ESS, 802.11 สามที่อยู่)",
  summary: `
<ul>
<li><b>Multiple access 3 ตระกูล:</b> Partitioning (TDM, FDM: ไม่ชน แต่ช่องว่างเสียเปล่า, คนเดียวได้ 1/N), Random access (ALOHA, CSMA, CSMA/CD: ชนได้ ต้องกู้ภายหลัง), Taking turns (polling, token passing: ไม่ชน แต่มีต้นทุน/จุดล้ม)</li>
<li><b>ALOHA:</b> pure = ส่งเมื่อพร้อม, vulnerable period 2 เฟรม, ประสิทธิภาพสูงสุด 1/(2e) &asymp; 18%; slotted = เริ่มส่งเฉพาะขอบ slot, vulnerable 1 เฟรม, 1/e &asymp; 37% (ต้องมีนาฬิการ่วม)</li>
<li><b>CSMA:</b> ฟังก่อนส่ง แต่ยังชนได้เพราะ <b>propagation delay</b> (สองสถานีได้ยินเงียบพร้อมกัน). <b>CSMA/CD:</b> ฟังขณะส่ง ถ้าชน หยุด+ส่ง jam signal แล้ว backoff</li>
<li><b>Binary exponential backoff:</b> ชนครั้งที่ n เลือก K จาก 0 ถึง 2<sup>n</sup>&minus;1 (สูงสุด 0-1023), รอ K x 512 bit times (10 Mbps: 51.2 &micro;s ต่อหน่วย); ชนครั้งที่ 16 เลิก; ไม่ยุติธรรมสมบูรณ์ (capture effect)</li>
<li><b>Min frame 64 B:</b> 512 bits = RTT เลวร้ายสุด 51.2 &micro;s ที่ 10 Mbps ผู้ส่งต้องยังส่งอยู่ตอนข่าวการชนกลับมา; 100 Mbps = 5.12 &micro;s (diameter เล็กลง 10 เท่า); payload ขั้นต่ำ 46 B (6+6+2+4 = 18 B header/trailer; 46+18 = 64) แล้ว pad</li>
<li><b>เฟรม Ethernet:</b> Preamble 7 + SFD 1 + Dst MAC 6 + Src MAC 6 + Type 2 + Data 46-1500 (MTU 1500) + CRC 4. Type: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP</li>
<li><b>Hub:</b> repeater, 1 collision domain, ต้องใช้ CSMA/CD. <b>Switch:</b> อ่าน Dst MAC, 1 collision domain ต่อพอร์ต, full duplex ไม่ต้อง CSMA/CD. ปัจจุบันแทบไม่มี collision บน switched Ethernet</li>
<li><b>Switch 3 กฎ:</b> (1) <b>Learn</b> src MAC + พอร์ตขาเข้า (2) <b>Filter/Forward</b> dst รู้ = ออกพอร์ตนั้นพอร์ตเดียว; dst อยู่พอร์ตเดียวกับขาเข้า = ทิ้ง (3) <b>Flood</b> dst ไม่รู้/broadcast/multicast = ทุกพอร์ตยกเว้นขาเข้า. entry หมดอายุ ~5 นาที; plug and play</li>
<li><b>Switch แบ่ง collision domain, Router (และ VLAN) แบ่ง broadcast domain.</b> Switch = L2 MAC, ตารางเรียนรู้เอง; Router = L3 IP, ตั้งค่า/routing protocol, ไม่ forward broadcast</li>
<li><b>Loop:</b> เฟรม L2 ไม่มี TTL/hop count &rarr; broadcast ทวีคูณ = <b>broadcast storm</b>. แก้ด้วย <b>STP</b> (เลือก root, block ลิงก์เกิน, สำรองไว้ใช้เมื่อ active ล้ม; classic 30-50 s, Rapid STP เร็วกว่า)</li>
<li><b>VLAN:</b> แบ่ง switch เป็นหลาย broadcast domain ด้วย software; ต่าง VLAN คุยกันที่ L2 ไม่ได้ ต้องผ่าน router. <b>802.1Q tag 4 B</b> (VLAN ID 12 บิต, ใช้ได้ 4094, 0/4095 สงวน); trunk = ติด tag, access = ถอด tag; ขนาดสูงสุด 1518&rarr;1522 B</li>
<li><b>Wi-Fi ตรวจ collision ไม่ได้:</b> (1) ส่งแรงกว่าที่ได้ยิน ~ล้านเท่า ฟังขณะส่งไม่ได้ (2) collision เกิดที่<b>ผู้รับ</b> ไม่ใช่ผู้ส่ง &rarr; <b>CSMA/CA</b>: ว่างพอ (DIFS) ส่งทั้งเฟรม, ไม่ว่าง random backoff นับถอยหลัง<b>เฉพาะตอนว่าง (freeze)</b>, ถึง 0 ส่ง, unicast ทุกเฟรมต้องมี <b>ACK</b> (SIFS) ไม่มี ACK = retransmit (backoff window x2)</li>
<li><b>Hidden terminal:</b> A กับ C ไม่ได้ยินกันแต่ถึง AP &rarr; ชนที่ AP. แก้ด้วย <b>RTS/CTS</b> (AP ส่ง CTS ให้ทุกคนได้ยิน; Duration field ให้ผู้ฟังเงียบ) เสีย overhead 2 เฟรมจึงเปิดเฉพาะเฟรมใหญ่</li>
<li><b>Wi-Fi:</b> BSS = 1 AP + สถานี (SSID ชื่อ, BSSID = MAC ของ AP); ESS = หลาย AP ใช้ SSID เดียวต่อด้วย distribution system; IBSS/ad hoc = ไม่มี AP (hotspot มือถือ <b>ไม่ใช่</b> ad hoc). Beacon ~10 ครั้ง/วินาที (102.4 ms). Passive scan = ฟัง beacon; active = ส่ง probe request (broadcast). Join: scan &rarr; choose &rarr; associate &rarr; WPA2/3 &rarr; DHCP &rarr; ARP gateway</li>
<li><b>802.11 frame:</b> FC 2, Duration 2, Addr1 6, Addr2 6, Addr3 6, Seq 2, Addr4 6 (AP-AP), payload 0-2312, CRC-32 4. Addr1 = ผู้รับบนอากาศ, Addr2 = ผู้ส่งบนอากาศ, Addr3 = อุปกรณ์ฝั่งสาย (uplink = dst บน LAN; downlink = src เดิม). H1&rarr;AP&rarr;R1: Addr1=AP, Addr2=H1, Addr3=R1; บนสาย dst = R1, src = H1 (ไม่มี MAC ของ AP). AP คือ bridge ไม่ใช่ router</li>
<li><b>Roaming ใน subnet เดียว:</b> reassociate กับ AP ใหม่ (BSSID ใหม่, SSID เดิม), IP คงเดิม, switch เรียนรู้พอร์ตใหม่จากเฟรมแรก</li>
</ul>
<table><tr><th></th><th>Ethernet (switched)</th><th>Wi-Fi</th></tr>
<tr><td>Contention</td><td>CSMA/CD (ปิดอยู่ เพราะ full duplex)</td><td>CSMA/CA</td></tr>
<tr><td>ACK</td><td>ไม่มี</td><td>ทุก unicast frame</td></tr>
<tr><td>Duplex</td><td>full</td><td>half</td></tr>
<tr><td>เห็น collision?</td><td>ที่ผู้ส่ง (แทบไม่เกิด)</td><td>ไม่ได้ เกิดที่ผู้รับ ปกติและต่อเนื่อง</td></tr></table>`,
  sections: [
    { t: "Multiple access: ทางแก้มีแค่สามตระกูล", html: `
<p>ช่องสัญญาณเดียว หลายผู้ส่ง ไม่มีผู้ควบคุม (เหมือนประชุมออนไลน์ที่คนปลดไมค์พร้อมกัน): Wi-Fi, Ethernet แบบสายร่วม, uplink ดาวเทียม/เซลลูลาร์ <b>collision</b> ไม่ใช่การ "ชน" แต่คือสัญญาณ<b>บวกกัน</b> ผู้รับได้ผลรวมที่ไม่ตรงกับเฟรมใดเลย ทั้งสองเฟรมเสีย (CRC ไม่ผ่านทิ้ง) และเกิดที่<b>ผู้รับ</b> ไม่ใช่ผู้ส่ง</p>
<p>โปรโตคอลที่ดีควรได้: ผู้ส่งคนเดียวได้เต็มอัตรา, หลายคนแบ่งยุติธรรม, ไม่มี master/นาฬิกากลาง, ง่ายพอสำหรับ hardware — ไม่มีโปรโตคอลใดได้ครบทั้งสี่</p>
<table><tr><th>ตระกูล</th><th>ตัวอย่าง</th><th>ดีเมื่อ</th><th>แย่เมื่อ</th><th>ชน?</th></tr>
<tr><td>Partitioning</td><td>TDM, FDM</td><td>โหลดหนักคงที่ รู้จำนวนโหนด</td><td>โหนดว่างยังถือส่วนแบ่ง; ส่งคนเดียวได้แค่ 1/N</td><td>ไม่</td></tr>
<tr><td>Random access</td><td>ALOHA, CSMA, CSMA/CD</td><td>โหลดเบา เป็นช่วง ๆ ไม่รู้จำนวนโหนด</td><td>ประสิทธิภาพล่มเมื่อโหลดสูง</td><td>ใช่ (ออกแบบไว้)</td></tr>
<tr><td>Taking turns</td><td>Polling (Bluetooth), Token passing</td><td>ต้องการ delay ที่คาดได้ (โรงงาน)</td><td>ต้นทุนประสานงาน; token หาย/ master ล้ม</td><td>ไม่</td></tr></table>
<h4>Partitioning</h4>
<p><b>TDM</b> ตัดเวลาเป็น slot ให้โหนดละ slot; <b>FDM</b> ตัดความถี่ (Wi-Fi ช่อง 1, 6, 11 ของ 2.4 GHz ไม่ทับกัน); ตัวอย่าง: ช่อง 6 Mbps แบ่ง 6 โหนด TDM, ถ้าส่งอยู่โหนดเดียวก็ได้แค่ 1 Mbps</p>
<h4>Random access: ALOHA</h4>
<ul>
<li><b>Pure ALOHA:</b> มีเฟรมก็ส่ง; vulnerable period = 2 เฟรม (เฟรมที่เริ่มก่อนหรือระหว่างส่งทำให้เสีย); efficiency สูงสุด 1/(2e) &asymp; 18%; ชนแล้วรอ random (ถ้าส่งใหม่ทันทีจะชนตลอด)</li>
<li><b>Slotted ALOHA:</b> เริ่มส่งเฉพาะขอบ slot; vulnerable period = 1 เฟรม; 1/e &asymp; 37% (ต้องมีนาฬิการ่วม)</li>
<li>ช่อง 10 Mbps: ได้ผลจริงสูงสุด &asymp; 1.84 Mbps (pure) / 3.68 Mbps (slotted)</li>
</ul>
<h4>Taking turns</h4>
<p><b>Polling:</b> master เชิญทีละโหนด (master เป็นจุดล้มเหลวเดียว, polling เสียเวลา). <b>Token passing:</b> เฟรมพิเศษหมุนเวียน ผู้ถือเท่านั้นส่งได้ (ไม่มี master, delay สูงสุดจำกัด, token หายแล้วหยุดทั้งระบบ)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>pure ALOHA 18% (1/2e), slotted 37% (1/e)</li>
<li>Wi-Fi สมัยใหม่ผสมกัน: FDM แยกเครือข่ายข้างเคียง + CSMA/CA แชร์ภายในช่อง + reservation (RTS/CTS)</li>
<li>ตอบสอบ: ระบุตระกูล + จุดแข็งหนึ่งข้อ + จุดอ่อนหนึ่งข้อ</li>
</ul></div>` },

    { t: "CSMA, CSMA/CD, backoff และขนาดเฟรมขั้นต่ำ", html: `
<h4>CSMA: ฟังก่อนพูด</h4>
<p>ฟังช่อง ถ้าว่างส่งทั้งเฟรม ถ้าไม่ว่างรอ แต่ยังชนได้ เพราะ<b>propagation delay</b>: A ส่งไปแล้วแต่สัญญาณยังไม่ถึง D, D ฟังแล้ว "เงียบ" จริงตรงที่ D จึงส่งด้วย — ทั้งคู่พูดความจริง. สายยิ่งยาว ช่วงที่สองโหนดพลาดพร้อมกันยิ่งกว้าง ดังนั้นความยาวสายสูงสุดของ Ethernet จึงเป็นเงื่อนไขให้ protocol ทำงาน</p>
<h4>CSMA/CD (Ethernet แบบสายร่วม)</h4>
<ol>
<li>ฟังต่อขณะส่ง (เทียบสิ่งที่ได้ยินกับที่ส่ง)</li>
<li>ต่างกัน = collision</li>
<li><b>หยุดทันที</b> และส่ง jam signal ให้ทุกคนรู้ (เฟรมเสียแล้ว ส่งต่อให้จบเปลืองช่อง)</li>
<li>รอเวลาสุ่ม (backoff) แล้วลองใหม่</li>
</ol>
<p>ต้องส่งและฟังพร้อมกันบนสื่อเดียว — บนสายทำได้ แต่บน Wi-Fi ทำไม่ได้</p>
<h4>Binary exponential backoff</h4>
<table><tr><th>ชนครั้งที่</th><th>เลือก K จาก</th><th>รอสูงสุดที่ 10 Mbps</th></tr>
<tr><td>1</td><td>0-1</td><td>51.2 &micro;s</td></tr>
<tr><td>2</td><td>0-3</td><td>153.6 &micro;s</td></tr>
<tr><td>3</td><td>0-7</td><td>358.4 &micro;s</td></tr>
<tr><td>4</td><td>0-15</td><td>768 &micro;s</td></tr>
<tr><td>10</td><td>0-1023</td><td>หลายสิบ ms</td></tr>
<tr><td>16</td><td>เลิก รายงานความล้มเหลว</td><td>&mdash;</td></tr></table>
<p>เวลารอ = K x 512 bit times (10 Mbps: 512 บิต = 51.2 &micro;s). ชนซ้ำคือหลักฐานว่าคู่แข่งมาก จึงขยายช่วงสุ่มเป็นสองเท่า (ประเมินโหลดจากความล้มเหลวของตัวเอง). ต้องสุ่ม ไม่ใช่รอคงที่ (ไม่งั้นชนซ้ำตลอด). ไม่ยุติธรรมสมบูรณ์: ผู้เพิ่งสำเร็จรีเซ็ตช่วงและชนะผู้ที่ถอยไปแล้ว (<b>capture effect</b>)</p>
<p>ตัวอย่างคำนวณ: A และ D ชนกันครั้งแรก ทั้งคู่เลือก K &isin; {0,1} ความน่าจะเป็นที่เลือกเท่ากัน (ชนอีก) = 2/4 = 1/2; หากชนอีก ช่วงขยายเป็น 0-3 รอสูงสุด 3 x 51.2 = 153.6 &micro;s</p>
<h4>ทำไมเฟรมต้องไม่ต่ำกว่า 64 ไบต์</h4>
<p>ผู้ส่งต้อง<b>ยังส่งอยู่</b>ตอนข่าวการชนเดินทางกลับมา ไม่งั้นไม่รู้ว่าเฟรมเสียและไม่มีใครฟัง. RTT เลวร้ายสุด 51.2 &micro;s ที่ 10 Mbps = 512 บิต = 64 ไบต์; เฟรมสั้นกว่านี้ต้อง pad. ที่ 100 Mbps 512 บิตใช้เวลาแค่ 5.12 &micro;s &rarr; ขนาดเครือข่ายสูงสุดลดลง 10 เท่า</p>
<pre><code>Header+trailer = 6 + 6 + 2 + 4 = 18 B   (Dst, Src, Type, CRC)
payload ต่ำสุด 46 B  ->  46 + 18 = 64 B
ตัวอย่าง: ARP request payload 28 B  -> pad 46-28 = 18 B  -> เฟรม 64 B</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Backoff: wait = K x 512 bit times; K &isin; [0, 2<sup>n</sup>&minus;1]; สูงสุด 1023; ยอมแพ้ที่ครั้งที่ 16</li>
<li>64 B = 512 bits = 51.2 &micro;s @10 Mbps (5.12 &micro;s @100 Mbps)</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> คำถามหลอก: CSMA ที่ฟังก่อนส่ง "ทำไมยังชน" คำตอบคือ propagation delay ไม่ใช่ noise หรือ CRC อ่อน</div>` },

    { t: "Ethernet frame, Hub และ Switch", html: `
<p>เฟรม Ethernet เหมือนเดิมตั้งแต่ปี 1973 ขณะที่ความเร็วเพิ่ม 40,000 เท่า (10 Mbps 1983 &rarr; 100 Mbps 1995 &rarr; 1 Gbps 1999 &rarr; 10 Gbps 2002 &rarr; 100 Gbps 2010 &rarr; 400 Gbps 2017) ส่วนรูปทรงเครือข่ายเปลี่ยน: bus (coax สายเดียว 1973 - ต้นยุค 90) &rarr; star + hub (ยังเป็น bus ทางไฟฟ้า) &rarr; star + switch (ทุกพอร์ตเป็นเซกเมนต์ของตัวเอง, full duplex)</p>
<pre><code>Preamble | SFD | Dest MAC | Src MAC | Type | Data (payload) | CRC
 7 B       1 B     6 B       6 B      2 B    46 - 1500 B      4 B
Type: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP
1500 = MTU (ปรากฏอีกตอน L3 ต้อง fragment)</code></pre>
<p>ชื่อมาตรฐาน: <code>1000BASE-T</code> = 1000 Mbps, BASE = baseband, T = twisted pair (S/L = ใยแก้วคลื่นสั้น/ยาว) เช่น 10BASE-T Cat3 100 m, 100BASE-TX Cat5 100 m, 1000BASE-T Cat5e/6 100 m, 10GBASE-T Cat6a, 1000BASE-LX single-mode 5 km, 10GBASE-SR multi-mode 300 m — ทุกแถวใช้เฟรมเดียวกัน</p>
<h4>Hub vs Switch</h4>
<table><tr><th></th><th>Hub</th><th>Switch</th></tr>
<tr><td>ดูอะไร</td><td>ไม่ดูอะไรเลย</td><td>Dst MAC</td></tr>
<tr><td>ทำอะไร</td><td>คัดลอกทุกบิตออกทุกพอร์ตอื่น</td><td>ส่งออกพอร์ตเดียว</td></tr>
<tr><td>Collision domain</td><td>1 อันร่วมกัน</td><td>1 อันต่อพอร์ต</td></tr>
<tr><td>CSMA/CD</td><td>จำเป็น</td><td>ไม่จำเป็น (full duplex)</td></tr>
<tr><td>Capacity</td><td>คุยได้ทีละคู่</td><td>หลายคู่เต็มความเร็วพร้อมกัน</td></tr>
<tr><td>Privacy</td><td>ทุกคนอ่านทุกอย่างได้</td><td>เห็นเฉพาะทราฟฟิกตัวเอง</td></tr></table>
<h4>Collision domain vs Broadcast domain</h4>
<p>ตัวอย่าง: hub 1 ตัวต่อ A, B และ switch พอร์ต 1; C พอร์ต 2; D พอร์ต 3 &rarr; collision domain = 3 (ชุด hub+A+B+พอร์ต1, ลิงก์ C, ลิงก์ D); broadcast domain = 1 (ไม่มี router/VLAN)</p>
<div class="dg"><div class="dgt">🖼️ A, B อยู่หลัง hub ต่อเข้า switch พอร์ต 1</div>` + F2 + `</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><b>Switch แบ่ง collision domain; Router แบ่ง broadcast domain</b> (VLAN ก็แบ่ง broadcast domain ด้วย software)</li>
<li>Switch 4 PC = 4 collision domain, 1 broadcast domain; Hub 4 PC = 1 และ 1</li>
</ul></div>
<h4>Switch vs Router</h4>
<table><tr><th></th><th>Switch</th><th>Router</th></tr>
<tr><td>อ่านถึงชั้น</td><td>L2 (เฟรม)</td><td>L3 (packet)</td></tr>
<tr><td>ที่อยู่</td><td>MAC แบน 48 บิต</td><td>IP ลำดับชั้น</td></tr>
<tr><td>ตาราง</td><td>เรียนรู้เองจากทราฟฟิก</td><td>ตั้งค่า/routing protocol</td></tr>
<tr><td>ขอบเขต</td><td>ใน LAN เดียว</td><td>ระหว่างเครือข่าย</td></tr>
<tr><td>Broadcast</td><td>flood ทุกที่</td><td>หยุด</td></tr></table>
<div class="note"><b>💡 หมายเหตุ</b> "Layer 3 switch" คือ router พอร์ตเยอะ forward ด้วย hardware ไม่ใช่อุปกรณ์ชนิดที่สี่</div>` },

    { t: "Switch: Learn, Forward, Flood (พร้อมตัวอย่างตาราง)", html: `
<p>Switch ไม่ต้องตั้งค่า (plug and play) ทำสามกฎเท่านั้น:</p>
<ol>
<li><b>Learn:</b> เฟรมที่เข้ามาบอกว่าผู้ส่งอยู่ไหน บันทึก <i>Src MAC &rarr; พอร์ตขาเข้า</i></li>
<li><b>Filter/Forward:</b> Dst อยู่ในตาราง &rarr; ส่งออกพอร์ตนั้นพอร์ตเดียว; ถ้าพอร์ตนั้นคือพอร์ตขาเข้าเอง &rarr; <b>ทิ้ง</b> (อยู่ segment เดียวกันแล้ว)</li>
<li><b>Flood:</b> Dst ไม่รู้ / broadcast (FF:FF:FF:FF:FF:FF) / multicast &rarr; ทุกพอร์ต<b>ยกเว้นพอร์ตขาเข้า</b></li>
</ol>
<p>entry หมดอายุประมาณ 5 นาที ทำให้อุปกรณ์ที่ย้ายถูกค้นพบใหม่</p>
<div class="dg"><div class="dgt">🖼️ ตัวอย่างพื้นฐาน: 4 host บน switch ตัวเดียว (ตาราง MAC ว่างตอนเริ่ม)</div>` + F1 + `</div>
<h4>ตัวอย่าง: ส่ง 6 เฟรมตามลำดับ</h4>
<table><tr><th>#</th><th>เฟรม (src&rarr;dst)</th><th>ตารางหลัง learn</th><th>Lookup</th><th>การกระทำ</th></tr>
<tr><td>1</td><td>A&rarr;B</td><td>A:1</td><td>B ไม่รู้</td><td>FLOOD ออก 2, 3, 4</td></tr>
<tr><td>2</td><td>B&rarr;A</td><td>A:1 B:2</td><td>A รู้</td><td>ส่งพอร์ต 1</td></tr>
<tr><td>3</td><td>C&rarr;A</td><td>A:1 B:2 C:3</td><td>A รู้</td><td>ส่งพอร์ต 1 (B, D ไม่เห็น)</td></tr>
<tr><td>4</td><td>A&rarr;B</td><td>เหมือนเดิม</td><td>B รู้</td><td>ส่งพอร์ต 2</td></tr>
<tr><td>5</td><td>D&rarr;A</td><td>A:1 B:2 C:3 D:4</td><td>A รู้</td><td>ส่งพอร์ต 1</td></tr>
<tr><td>6</td><td>A&rarr;broadcast</td><td>เหมือนเดิม</td><td>broadcast</td><td>FLOOD ออก 2, 3, 4</td></tr></table>
<ul>
<li>เฟรมแรกไปหาอุปกรณ์ที่ยังไม่เคยพูดจะถูก flood เสมอ; พอมันตอบ ทุกคนก็รู้</li>
<li>A คุยกับ B พร้อมกับที่ C คุยกับ D ได้เต็มความเร็ว (hub ทำไม่ได้)</li>
<li>Broadcast ไปทุกพอร์ตเสมอ ตารางช่วยไม่ได้</li>
</ul>
<h4>ตัวอย่างที่ host สองตัวอยู่หลัง hub เดียวกัน</h4>
<p>ถ้า A และ B ต่อ hub เดียวที่พอร์ต 1 และตารางมี A:1, B:1 เมื่อ A ส่งให้ B เฟรมเข้าพอร์ต 1 แล้ว Dst ก็อยู่พอร์ต 1 &rarr; switch <b>ทิ้ง</b> (ไม่ส่งกลับพอร์ตเดิม) B ได้รับอยู่แล้วผ่าน hub; C และ D ไม่ได้รับ</p>
<div class="warn"><b>⚠️ ระวัง</b> สองข้อผิดคลาสสิก: ส่งต่อก่อนที่จะ learn (ต้อง learn จาก src ก่อน lookup dst) และส่งเฟรมกลับออกพอร์ตที่เข้ามา</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Learn จาก <b>Source</b> MAC; ตัดสินใจจาก <b>Destination</b> MAC</li>
<li>Unknown unicast, broadcast, multicast = flood (ยกเว้นพอร์ตขาเข้า)</li>
<li>ตารางที่เรียนรู้เองจากทราฟฟิกปกติ ไม่ต้องมีผู้ดูแลหรือโปรโตคอลระหว่าง switch</li>
</ul></div>` },

    { t: "ARP ใน LAN ที่ใช้ switch: ใครเห็นอะไร", html: `
<p>ARP แปลง IP &rarr; MAC <b>ภายใน subnet เดียว</b> (ข้าม subnet ให้ ARP หา default gateway). ARP request ส่งเป็น broadcast (Dst = FF:FF:FF:FF:FF:FF, Type 0x0806) ARP reply ส่งเป็น unicast กลับผู้ถาม</p>
<h4>สถานการณ์: ใช้ topology 4 host (A=.1, B=.2, C=.3, D=.4) subnet เดียว, switch ว่าง, ARP cache ว่าง</h4>
<div class="dg"><div class="dgt">🖼️ A ต้องการส่งข้อมูลให้ C (192.168.1.3)</div>` + F1 + `</div>
<ol>
<li>A ไม่รู้ MAC ของ C &rarr; broadcast ARP request "ใครคือ 192.168.1.3?" เข้าพอร์ต 1</li>
<li>Switch <b>learn A:1</b>; dst เป็น broadcast &rarr; <b>flood</b> ออกพอร์ต 2, 3, 4 (B และ D รับแต่ไม่ใช่ IP ของตัวเอง ก็เมินไป)</li>
<li>C ตอบ ARP reply แบบ <b>unicast</b> ไปที่ MAC ของ A เข้าพอร์ต 3</li>
<li>Switch <b>learn C:3</b>; dst A รู้อยู่ที่ 1 &rarr; ส่งพอร์ต 1 <b>พอร์ตเดียว</b> (B, D ไม่เห็น reply)</li>
<li>จากนี้ข้อมูล A&harr;C เป็น unicast ผ่านพอร์ต 1 และ 3 เท่านั้น ตาราง: A:1, C:3</li>
</ol>
<h4>ต่อมา C ต้องคุยกับ B</h4>
<p>C รู้ MAC ของ A (จาก request ที่เคยได้) แต่ไม่รู้ของ B &rarr; C broadcast ARP request หา .2 &rarr; switch flood ออก 1, 2, 4 (ไม่ส่งกลับ 3) &rarr; B ตอบ unicast ถึง C ทางพอร์ต 2&rarr;3 &rarr; switch <b>learn B:2</b> ตารางเป็น A:1, C:3, B:2; A และ D เห็นเฉพาะ request</p>
<div class="warn"><b>⚠️ ระวัง</b> ARP request เป็น broadcast เสมอ flood ทุกพอร์ต; ARP reply เป็น unicast ไม่ flood (เมื่อ switch รู้ MAC ผู้ถามแล้ว ซึ่ง learn ได้จาก request ที่เพิ่งผ่านมา). ใน VLAN/subnet ต่างกัน broadcast ข้ามไม่ได้</div>
<h4>เมื่อ A คุยกับอุปกรณ์นอก subnet</h4>
<p>A ARP หา MAC ของ <b>default gateway</b> (router) แล้วส่งเฟรมไปให้ router เปลี่ยน MAC ทุก hop ส่วน IP (end-to-end) คงเดิม</p>` },

    { t: "Loop, Broadcast Storm และ Spanning Tree", html: `
<p>เพิ่มสายที่สองระหว่างสอง switch เพื่อสำรอง ดูสมเหตุสมผลแต่ล่มทั้งเครือข่ายในไม่กี่วินาที:</p>
<div class="dg"><div class="dgt">🖼️ SW1 กับ SW2 ต่อกันด้วยสองสาย (loop)</div>` + F4 + `</div>
<ol>
<li>A ส่ง broadcast หนึ่งเฟรม SW1 flood ออก<b>ทั้งสอง</b>ลิงก์</li>
<li>SW2 ได้สองสำเนา flood แต่ละสำเนา รวมถึงกลับไปทางลิงก์อีกเส้น</li>
<li>SW1 ได้กลับมาอีก flood อีก ไม่มีอะไรบอกว่าเฟรมนี้เคยเห็นแล้ว สำเนาเพิ่ม 1, 2, 4, 8, 16 ...</li>
<li>ลิงก์เต็ม CPU switch 100% ตาราง MAC สั่นเพราะ src เดิมโผล่หลายพอร์ต</li>
</ol>
<p>ต้นเหตุ: <b>เฟรม L2 ไม่มี hop count/TTL</b> (L3 มี TTL) เฟรมไม่ "ตาย" แต่<b>ทวีคูณ</b> = <b>broadcast storm</b></p>
<h4>Spanning Tree Protocol (STP)</h4>
<ul>
<li>เลือก <b>root</b></li>
<li>แต่ละ switch หาทางที่ถูกที่สุดไป root</li>
<li>ลิงก์ที่ไม่จำเป็นเข้าสถานะ <b>blocking</b> (ยังเสียบอยู่ แต่ไม่ส่งเฟรมข้อมูล)</li>
<li>ถ้าลิงก์ active ล้ม ลิงก์ blocking ถูกปลดมาใช้แทน = สำรองโดยไม่มี loop</li>
</ul>
<p>Classic STP ใช้ 30-50 s ในการ converge จึงมี Rapid STP. จะบอก "อย่าสร้าง loop" ไม่พอ เพราะ patch สายผิดตู้เป็นเรื่องที่เกิดได้จริง protocol ต้องสมมติว่ามันเกิดขึ้น</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Loop + broadcast = storm เพราะ L2 ไม่มี TTL</li>
<li>STP: root, block ลิงก์เกิน, เก็บเป็น redundancy</li>
</ul></div>` },

    { t: "VLAN และ 802.1Q", html: `
<p>ปัญหา: broadcast domain ใหญ่ (ทุก ARP ของทุกเครื่องไปถึงทุกเครื่อง เสียงานเปล่า ใครก็ดู/ตอบ broadcast ได้ เช่น ARP spoofing) ทางตรงคือซื้อ router แยกเครือข่ายจริง แพงและย้ายคนต้องเดินสายใหม่ ทางออกคือ <b>VLAN</b>: แบ่ง switch จริงเป็นหลาย switch เสมือนด้วย software เช่น พอร์ต 1-8 = VLAN 10, พอร์ต 9-16 = VLAN 20</p>
<ul>
<li>เฟรม VLAN 10 ไม่ออกพอร์ต VLAN 20 <b>แม้แต่ broadcast</b></li>
<li>ต่าง VLAN คุยกันที่ L2 ไม่ได้ ต้องผ่าน <b>router</b> (inter-VLAN routing) — เป็นการควบคุมที่ต้องการ</li>
<li>แต่ละ VLAN เป็น IP subnet ของตัวเอง ทำ firewall ต่างกันได้</li>
<li>ได้: containment (ไวรัสของนักศึกษาไปถึงแอร์ไม่ได้), blast radius เล็ก (storm ในห้องแล็บไม่กระทบทั้งวิทยาเขต), ย้ายคนเป็นการตั้งค่า</li>
</ul>
<div class="dg"><div class="dgt">🖼️ switch ตัวเดียว มี VLAN 10 (A, B) และ VLAN 20 (C)</div>` + F3 + `</div>
<p>ถ้า A ส่ง ARP broadcast หา B &rarr; flood เฉพาะพอร์ตใน VLAN 10 (พอร์ต 2) C ไม่เห็น; A ส่งหา C ซึ่งอยู่ VLAN 20 &rarr; ARP ไม่มีวันถึง C ติดต่อไม่ได้จนกว่าจะมี router</p>
<h4>802.1Q tag</h4>
<pre><code>Dst MAC | Src MAC | 802.1Q TAG (4 B) | Type | Data 46-1500 | CRC
                    TPID / PCP / DEI / VLAN ID (12 บิต)
VLAN ID 12 บิต -> ใช้ได้ 4094 อัน (0 และ 4095 สงวน)
ขนาดสูงสุด 1518 -> 1522 B (payload ขั้นต่ำ/สูงสุดเท่าเดิม)</code></pre>
<ul>
<li><b>Trunk:</b> switch&harr;switch (หรือ switch&harr;AP) หลาย VLAN บนสายเดียว, เฟรมมี tag</li>
<li><b>Access:</b> ไปหาโน้ตบุ๊ก VLAN เดียว, <b>ถอด tag</b> (โน้ตบุ๊กไม่รู้จัก VLAN, tag จะทำให้เฟรมอ่านไม่ออก)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>VLAN ID 12 บิต = 4094 ใช้งานได้; tag 4 ไบต์; 1518 &rarr; 1522 ไบต์</li>
<li>VLAN แบ่ง broadcast domain; ข้าม VLAN ต้องผ่าน router</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> AP ตัวเดียวทำหลาย SSID ได้ แต่ละ SSID ผูกกับ VLAN ต่างกัน (เช่น Staff = VLAN 10, Student = VLAN 20, Guest = VLAN 50) แล้วส่งขึ้น trunk 802.1Q: อากาศเดียวกัน แต่ broadcast domain แยก (ชื่อ SSID/เลข VLAN เป็นเพียงตัวอย่าง)</div>` },

    { t: "Wi-Fi: CSMA/CA, Hidden terminal, RTS/CTS", html: `
<p>Wi-Fi <b>ตรวจ collision ไม่ได้</b> ด้วยสองเหตุผลที่ต้องจำทั้งคู่:</p>
<ol>
<li>วิทยุ<b>ฟังขณะส่งไม่ได้</b>: สัญญาณตัวเองแรงกว่าที่พยายามฟังราวล้านเท่า (เหมือนตะโกนแล้วหวังได้ยินเสียงกระซิบ; full-duplex radio มีแต่ในแล็บ)</li>
<li>Collision เกิดที่<b>ผู้รับ</b> ไม่ใช่ที่ผู้ส่ง: สองสถานีห่างกันจนไม่ได้ยินกันแต่ถึง AP ทั้งคู่ ฟังที่ผู้ส่งไม่มีวันรู้</li>
</ol>
<p>จึงต้อง<b>หลีกเลี่ยง</b> collision: <b>CSMA/CA</b></p>
<h4>กฎ 4 ข้อ</h4>
<ol>
<li><b>Sense แล้วส่งทั้งเฟรม:</b> ช่องว่างตลอดช่วง DIFS ส่งทั้งเฟรม (ไม่มี abort กลางทาง)</li>
<li><b>Freeze:</b> ช่องไม่ว่าง สุ่ม backoff count แล้วนับถอยหลังเฉพาะตอนช่องว่าง; มีคนเริ่มส่ง = หยุดนับ จบแล้วนับต่อ</li>
<li><b>ศูนย์ = ไป:</b> ตัวนับหยุด (ไม่รีสตาร์ต) ใครรอนานสุดได้ก่อน = ยุติธรรม</li>
<li><b>ผู้รับต้องยืนยัน:</b> unicast ทุกเฟรมต้องมี ACK (หลัง SIFS); ไม่มี ACK = เฟรมหาย &rarr; retransmit ด้วย backoff window <b>เพิ่มเป็นสองเท่า</b></li>
</ol>
<p>นี่คือเหตุที่ Wi-Fi มี reliable delivery ที่ L2 (wireless เสียเฟรมบ่อย รอ TCP ช้าเกิน) ต้นทุนคือ airtime ทำให้ throughput จริงต่ำกว่าตัวเลขบนกล่องมาก</p>
<h4>Hidden terminal</h4>
<div class="dg"><div class="dgt">🖼️ A และ C ไม่ได้ยินกัน แต่ทั้งคู่ถึง AP</div>` + F5 + `</div>
<p>A ฟัง = เงียบ (ถูกต้อง ที่ A ไม่ได้ยินอะไร) C ก็เช่นกัน ทั้งคู่ส่ง &rarr; ชนที่ AP carrier sensing ไม่เพียงไม่ช่วย แต่หลอกทั้งคู่ (กำแพงคอนกรีตก็ทำเช่นเดียวกัน)</p>
<h4>RTS/CTS</h4>
<pre><code>A  -> AP : RTS  "ขอช่อง 2 ms"
AP -> ทุกคน : CTS "A ใช้ช่องได้ 2 ms"   (C ได้ยิน CTS -> เงียบ 2 ms ตาม Duration field)
A  -> AP : DATA
AP -> A  : ACK</code></pre>
<p>AP คือโหนดเดียวที่ทุกคนได้ยิน จึงเป็นผู้ตัดสิน; ต้นทุน = เฟรมเพิ่มสองเฟรม จึงมักเปิดเฉพาะเฟรมที่เกิน threshold และหลายเครือข่ายปิดไว้ ตระกูลของมันคือ random access (ให้ RTS ผ่าน) แล้วตามด้วย reservation</p>
<h4>เปรียบเทียบ Ethernet กับ Wi-Fi</h4>
<table><tr><th></th><th>Ethernet (switched)</th><th>Wi-Fi 802.11</th></tr>
<tr><td>Frame idea / MAC / CRC</td><td colspan="2">เหมือนกัน</td></tr>
<tr><td>Contention</td><td>CSMA/CD ตรวจและหยุด</td><td>CSMA/CA หลีกเลี่ยง ไม่ abort</td></tr>
<tr><td>ACK</td><td>ไม่มี</td><td>ทุก unicast frame</td></tr>
<tr><td>Medium</td><td>พอร์ตเฉพาะต่ออุปกรณ์</td><td>อากาศร่วม</td></tr>
<tr><td>Duplex</td><td>full</td><td>half</td></tr>
<tr><td>เห็น collision?</td><td>ที่ผู้ส่ง แต่แทบไม่เกิด</td><td>ไม่ เกิดที่ผู้รับ ปกติและต่อเนื่อง</td></tr></table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>เหตุผลสองข้อที่ Wi-Fi ตรวจ collision ไม่ได้: ฟังขณะส่งไม่ได้ + collision เกิดที่ผู้รับ</li>
<li>Counter freeze ตอนช่องไม่ว่าง; no ACK &rarr; retransmit, window x2</li>
<li>Hidden terminal แก้ด้วย RTS/CTS</li>
</ul></div>` },

    { t: "Wi-Fi: BSS, ESS, การ join, 802.11 frame และ roaming", html: `
<h4>องค์ประกอบ</h4>
<ul>
<li><b>Wireless host</b> (โน้ตบุ๊ก มือถือ — wireless ไม่จำเป็นต้อง mobile), <b>Base station = AP</b> (relay เฟรมระหว่างอากาศและสาย), <b>Wireless link</b> (อากาศ + CSMA/CA), <b>Network infrastructure</b> (LAN ด้านหลัง AP: switch, router, VLAN)</li>
<li><b>BSS (cell):</b> AP หนึ่งตัว + สถานี. เฟรมทุกอันผ่าน AP แม้ระหว่างมือถือสองเครื่องที่อยู่ห่างกัน 1 เมตร (ข้าม air สองครั้ง). AP เป็น <b>bridge</b> ไม่ใช่ router: แปลง 802.11 &harr; 802.3 โดยไม่อ่าน IP. <b>SSID</b> = ชื่อเครือข่าย, <b>BSSID</b> = MAC ของวิทยุ AP</li>
<li><b>ESS:</b> หลาย AP SSID เดียวกัน BSSID ต่างกัน เชื่อมด้วย distribution system (switch Ethernet; สำหรับ switch AP คือ host ตัวหนึ่งบนพอร์ต)</li>
<li><b>Infrastructure mode</b> (BSS/ESS มี AP) vs <b>ad hoc / IBSS</b> (ไม่มี AP สถานีคุยกันตรง; ไกลกว่าระยะวิทยุต้อง forward ให้กัน). Personal hotspot มือถือ<b>ไม่ใช่</b> ad hoc: มือถือกลายเป็น AP และโน้ตบุ๊ก join แบบ infrastructure</li>
</ul>
<h4>ช่อง, beacon, scanning</h4>
<ul>
<li>2.4 GHz แบ่งเป็นช่องทับซ้อน (ศูนย์กลางห่าง 5 MHz แต่สัญญาณกว้าง ~22 MHz) ใช้ 1, 6, 11 ไม่ทับกัน (ไทยมีช่อง 1-13). เครือข่ายข้างเคียงช่องเดียวกันแชร์กันด้วย CSMA/CA; ช่องทับซ้อน (เช่น 3 ข้าง 6) แย่กว่า เพราะเป็นแค่ noise ต่อกัน; 5 GHz มีช่องสะอาดมากกว่า</li>
<li><b>Beacon</b> ประมาณ 10 ครั้ง/วินาที (interval 102.4 ms): SSID, BSSID, channel, data rates, security (WPA2/WPA3); ส่งที่ rate ต่ำให้ทุกเครื่องถอดรหัสได้; SSID "ซ่อน" ไม่ได้ซ่อนจริง (มือถือส่ง probe ถามชื่อ = broadcast ชื่อออกมาเอง)</li>
<li><b>Passive scan:</b> ฟัง beacon ทุกช่อง (เงียบแต่ช้า). <b>Active scan:</b> broadcast probe request (dst FF:FF:FF:FF:FF:FF) รอ probe response (เร็วแต่ส่งเสียง; มือถือสุ่ม MAC ตอน scan)</li>
</ul>
<h4>จากไม่มี Wi-Fi ถึงออนไลน์ 6 ขั้น</h4>
<ol>
<li><b>Scan</b> (beacon / probe request)</li>
<li><b>Choose</b> (มักเป็นเครือข่ายที่รู้จักและ AP สัญญาณแรงสุด)</li>
<li><b>Associate</b> (association request/response; AP รู้ MAC และจะ relay เฟรมให้)</li>
<li><b>Prove who you are</b> (WPA2/WPA3 key exchange)</li>
<li><b>DHCP</b> (DISCOVER broadcast ถูก relay ลงสาย)</li>
<li><b>ARP หา gateway</b> &rarr; ออนไลน์</li>
</ol>
<p>ขั้น 1-4 คือ 802.11 ขั้น 5-6 คือ Ethernet ธรรมดา AP ทำให้อากาศเหมือน LAN ปกติ</p>
<h4>802.11 frame</h4>
<pre><code>FC 2 | Duration 2 | Addr1 6 | Addr2 6 | Addr3 6 | Seq 2 | Addr4 6 | Payload 0-2312 | CRC 4
(Addr4 ใช้เฉพาะ AP ส่งต่อให้ AP ผ่านอากาศ; ข้อมูลทั่วไปมีสามที่อยู่)
Ethernet: Dst 6 | Src 6 | Type 2 | Payload 46-1500 | CRC 4</code></pre>
<p>CRC-32 เหมือน Ethernet, payload ใหญ่กว่า (2312 vs 1500), ไม่มี preamble ในเฟรม (sync ทำที่ Physical layer)</p>
<ul>
<li><b>Addr1</b> = ผู้รับบนอากาศใน hop นี้ (AP หรือสถานี)</li>
<li><b>Addr2</b> = ผู้ส่งบนอากาศ (และผู้ได้รับ ACK)</li>
<li><b>Addr3</b> = อุปกรณ์ฝั่งสาย (ขาขึ้น: Dst บน LAN; ขาลง: Src เดิม)</li>
</ul>
<table><tr><th>ทิศทาง</th><th>Addr1</th><th>Addr2</th><th>Addr3</th></tr>
<tr><td>สถานี &rarr; AP (ไปสาย)</td><td>AP</td><td>สถานี</td><td>Dst บน LAN</td></tr>
<tr><td>AP &rarr; สถานี (จากสาย)</td><td>สถานี</td><td>AP</td><td>Src บน LAN</td></tr></table>
<div class="dg"><div class="dgt">🖼️ H1 ส่ง IP packet ออก Internet ผ่าน R1</div>` + F6 + `</div>
<pre><code>บนอากาศ (802.11) :  Addr1 = AP    Addr2 = H1    Addr3 = R1
AP แปลงเป็น 802.3 : Dst = R1 (คัดลอกจาก Addr3)   Src = H1   Payload = IP packet
(ไม่มี MAC ของ AP บนสาย; switch จะ learn ว่า H1 อยู่หลังพอร์ตของ AP)

ขากลับ R1 -> H1 : สาย  Dst = H1  Src = R1
                  อากาศ Addr1 = H1  Addr2 = AP  Addr3 = R1</code></pre>
<p>Addr1 และ Addr2 คือสองวิทยุบน hop นี้เสมอ; Addr3 คืออุปกรณ์ฝั่งสาย. ฟิลด์อื่น: <b>Frame control</b> (type/subtype, To DS/From DS, Retry), <b>Duration</b> (ผู้ฟังตั้ง timer เงียบ = หลักการของ RTS/CTS), <b>Seq control</b> (retransmit เพราะ ACK หาย &rarr; ผู้รับทิ้งเฟรมซ้ำที่เลขเดิม)</p>
<h4>Roaming ใน subnet เดียวกัน</h4>
<p>H1 เดินจาก BSS1 ไป BSS2: สัญญาณ AP1 อ่อนลง AP2 แรงขึ้น &rarr; reassociate กับ AP2 (SSID เดิม BSSID ใหม่ = ยังเป็น ESS เดียว) &rarr; <b>IP เดิม</b> (สอง AP อยู่ subnet เดียว) &rarr; เฟรมแรกของ H1 เข้า switch ทางพอร์ตของ AP2 &rarr; switch อัปเดตตาราง H1 จากพอร์ต 1 เป็นพอร์ต 2 (กฎ learn ล้วน ๆ). ย้ายข้าม subnet จะเปลี่ยน IP เป็นเรื่อง L3</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>H1&rarr;AP&rarr;R1: Addr1 = AP, Addr2 = H1, Addr3 = R1; ฝั่งสาย Dst = R1, Src = H1</li>
<li>BSSID = MAC ของ AP; SSID = ชื่อ; ESS = หลาย AP SSID เดียว</li>
<li>Beacon ~ทุก 102.4 ms; passive = ฟัง, active = probe request</li>
<li>Roaming: IP เท่าเดิม, switch re-learn พอร์ต</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> อย่าสับสน Address 3 กับ MAC ของ AP: AP ไม่ใช่ปลายทางสุดท้ายและไม่อยู่ในเฟรมบนสาย</div>
<div class="dg"><div class="dgt">🖼️ ตรวจความเข้าใจ: switch สองตัวคั่น router (ใช้นับ domain)</div>` + F7 + `</div>
<p>รูปนี้: collision domain = 6 (A, B, ลิงก์ SW1&ndash;R, ลิงก์ R&ndash;SW2, C, D แต่ละพอร์ต/ลิงก์), broadcast domain = 2 (ซ้ายและขวาของ router)</p>` }
  ],
  ex: [
    { type: "choice", story: "switch ใหม่ MAC table ว่าง เฟรมที่ผ่านเข้ามาตามลำดับ (src&rarr;dst): (1) A&rarr;B (2) B&rarr;A (3) C&rarr;B (4) D&rarr;C", fig: F1,
      q: "เฟรมใดถูก flood และเมื่อจบทั้ง 4 เฟรม table มีกี่รายการ",
      opts: [
        { t: "ทุกเฟรมถูก flood เพราะ table ว่างตอนเริ่ม", why: "ผิด: table เติมระหว่างทางจาก src ของแต่ละเฟรม เฟรมหลัง ๆ ใช้ table ได้" },
        { t: "เฟรม 1 เท่านั้น; table มี 4 รายการ (A:1, B:2, C:3, D:4)", why: "ถูก: เฟรม 1 B ไม่รู้ &rarr; flood; เฟรม 2 รู้ A; เฟรม 3 รู้ B (learn จากเฟรม 2); เฟรม 4 รู้ C (learn จากเฟรม 3) และทุกเฟรมสอน src ของตัวเอง" },
        { t: "เฟรม 1 และ 3; table มี 3 รายการ", why: "ผิด: เฟรม 3 ไป B ซึ่ง learn แล้วจากเฟรม 2 จึงไม่ flood และ table มี 4 รายการ" },
        { t: "เฟรม 1 เท่านั้น; table มี 2 รายการ (เรียนรู้เฉพาะผู้ตอบ)", why: "ผิด: switch learn จาก src ของทุกเฟรมที่ผ่าน ไม่ใช่เฉพาะผู้ตอบ" }
      ], ans: 1 },
    { type: "choice", story: "LAN เดียว subnet 192.168.1.0/24 ตามรูป (A=.1, B=.2, C=.3, D=.4) switch ว่าง และ ARP cache ของทุกเครื่องว่าง A ต้องการส่งข้อมูลให้ C (192.168.1.3) เป็นครั้งแรก", fig: F1,
      q: "เมื่อ ARP request และ reply เสร็จสิ้น ข้อใดถูกต้อง",
      opts: [
        { t: "ทั้ง request และ reply ถูก flood ไปทุกพอร์ต ทำให้ B และ D เห็นทั้งสอง", why: "ผิด: reply เป็น unicast ถึง A และ switch รู้พอร์ตของ A แล้ว (learn จาก request) จึงส่งพอร์ต 1 พอร์ตเดียว" },
        { t: "request ถูกส่งเฉพาะพอร์ต 3 เพราะ switch รู้ C อยู่แล้ว", why: "ผิด: ตอนนี้ switch ว่าง และ request เป็น broadcast จึงต้อง flood" },
        { t: "request ถูก flood ออกพอร์ต 2, 3, 4 ส่วน reply ไปพอร์ต 1 พอร์ตเดียว; ตารางได้ A:1 และ C:3; B กับ D เห็นเฉพาะ request", why: "ถูก: request broadcast &rarr; learn A:1 &rarr; flood ยกเว้นพอร์ต 1; reply unicast &rarr; learn C:3 &rarr; ส่งพอร์ต 1" },
        { t: "ตารางจะมีทั้ง A, B, C, D เพราะทุกเครื่องรับ request", why: "ผิด: B และ D ไม่ได้ส่งเฟรมใด switch จึงไม่รู้พอร์ตของพวกเขา" }
      ], ans: 2 },
    { type: "choice", story: "ต่อจากสถานการณ์ข้างต้น (ตารางของ switch: A:1, C:3) ตอนนี้ C ต้องส่งข้อมูลให้ B (192.168.1.2) ซึ่ง C ไม่เคยติดต่อมาก่อน (ARP cache ของ C มีแค่ A)", fig: F1,
      q: "เกิดอะไรขึ้น",
      opts: [
        { t: "C broadcast ARP request หา .2; switch flood ออกพอร์ต 1, 2, 4 (ไม่ส่งกลับพอร์ต 3); B ตอบ unicast ถึง C ทางพอร์ต 3 พอร์ตเดียว และ switch learn B:2", why: "ถูก: C ไม่รู้ MAC ของ B ต้อง broadcast; reply ของ B สอน switch ว่า B อยู่พอร์ต 2; A และ D เห็นเฉพาะ request" },
        { t: "C ส่งเฟรมตรงไป B ได้เลยเพราะ switch รู้เส้นทางไปทุกเครื่อง", why: "ผิด: switch ยังไม่รู้ B และที่สำคัญ C ต้องรู้ MAC ของ B ก่อนจึงจะสร้างเฟรมได้ (ARP)" },
        { t: "C ส่ง ARP request แบบ unicast ไปถาม A ว่า .2 คือใคร", why: "ผิด: ARP request เป็น broadcast และ A ไม่ใช่ผู้ที่รู้คำตอบ" },
        { t: "switch ส่ง ARP request เฉพาะพอร์ต 2 เพราะ IP .2 อยู่ติดกับ B", why: "ผิด: switch ทำงานด้วย MAC ไม่ใช่ IP และ dst เป็น broadcast จึงต้อง flood" }
      ], ans: 0 },
    { type: "choice", story: "A และ B ต่ออยู่หลัง hub ตัวเดียวกัน ซึ่งต่อเข้า switch พอร์ต 1 ตาราง switch ปัจจุบัน: A:1, B:1, C:2, D:3 A ส่ง unicast ให้ B", fig: F2,
      q: "switch ทำอะไรกับเฟรมนี้",
      opts: [
        { t: "ส่งออกพอร์ต 1 กลับไปอีกครั้ง เพราะ B อยู่พอร์ต 1", why: "ผิด: ห้ามส่งกลับพอร์ตที่เฟรมเข้ามา" },
        { t: "flood ไปพอร์ต 2 และ 3 เพราะ B อยู่หลัง hub", why: "ผิด: switch รู้อยู่แล้วว่า B อยู่พอร์ต 1 ไม่ใช่ unknown" },
        { t: "ลบ entry ของ A แล้วเรียนรู้ใหม่", why: "ผิด: ไม่มีกฎนี้ entry ของ A ถูกต้องและถูก refresh" },
        { t: "ทิ้งเฟรม (filter) เพราะ B อยู่ segment เดียวกับ A แล้ว B ได้รับผ่าน hub; C กับ D ไม่ได้รับ", why: "ถูก: dst อยู่พอร์ตเดียวกับพอร์ตขาเข้า = ทิ้ง ไม่ต้องส่งต่อ" }
      ], ans: 3 },
    { type: "choice", story: "ตามรูป A และ B ต่อ hub ซึ่งเสียบ switch พอร์ต 1, C เสียบพอร์ต 2, D เสียบพอร์ต 3 ไม่มี router และไม่มี VLAN", fig: F2,
      q: "มี collision domain และ broadcast domain อย่างละกี่อัน",
      opts: [
        { t: "5 collision domain และ 1 broadcast domain", why: "ผิด: A และ B อยู่หลัง hub จึงอยู่ collision domain เดียวกัน ไม่นับแยกเป็นรายเครื่อง" },
        { t: "1 และ 1", why: "ผิด: switch แบ่ง collision domain ต่อพอร์ต จึงมากกว่า 1" },
        { t: "3 collision domain และ 1 broadcast domain", why: "ถูก: (hub + A + B + พอร์ต 1), ลิงก์ C, ลิงก์ D = 3; switch ไม่แบ่ง broadcast domain" },
        { t: "3 และ 3", why: "ผิด: switch ไม่แบ่ง broadcast domain ต้องใช้ router หรือ VLAN" }
      ], ans: 2 },
    { type: "choice", story: "LAN สองฝั่งต่อกันด้วย router: ฝั่งซ้าย SW1 มี A (192.168.1.1) และ B ใน 192.168.1.0/24; ฝั่งขวา SW2 มี C (192.168.2.3) และ D ใน 192.168.2.0/24 A ต้องการส่งข้อมูลให้ C", fig: F7,
      q: "A ควรทำอย่างไรระดับ L2 และใครได้รับ broadcast ของ A",
      opts: [
        { t: "A ARP หา MAC ของ default gateway (router) broadcast ของ A ไปถึง B และ router แต่ไม่ถึง C, D เพราะ router ไม่ forward broadcast (มี 2 broadcast domain)", why: "ถูก: C อยู่คนละ subnet; เฟรมต้องส่งให้ router ก่อน (IP ยังเป็น C แต่ MAC ปลายทางคือ router)" },
        { t: "A broadcast ARP หา 192.168.2.3 โดยตรง และ C ตอบกลับ", why: "ผิด: broadcast ไม่ข้าม router จึงไม่ถึง C" },
        { t: "A ส่งเฟรมไป FF:FF:FF:FF:FF:FF เพื่อให้ถึงทุกเครื่อง", why: "ผิด: broadcast ถูกจำกัดอยู่ใน broadcast domain ของตัวเอง" },
        { t: "SW1 flood ไปถึง SW2 โดยตรงเพราะ switch เรียนรู้ MAC ของ C", why: "ผิด: SW1 ไม่ได้เชื่อมกับ SW2 ที่ L2 ตรงนั้น มี router คั่น" }
      ], ans: 0 },
    { type: "choice", story: "ผู้ดูแลเพิ่มสายที่สองระหว่าง SW1 และ SW2 เพื่อสำรอง ไม่กี่วินาทีต่อมาเครือข่ายทั้งอาคารค้าง ไฟลิงก์กระพริบถี่ CPU ของ switch 100% มี A ส่ง ARP broadcast ก่อนหน้านั้นไม่นาน", fig: F4,
      q: "สาเหตุและวิธีแก้ที่ยังคงเป้าหมายการสำรองไว้คืออะไร",
      opts: [
        { t: "CSMA/CD collision ระหว่างสองสาย; แก้ด้วย backoff ที่นานขึ้น", why: "ผิด: switch เป็น full duplex ไม่ใช้ CSMA/CD ปัญหาคือ loop ไม่ใช่ collision" },
        { t: "ตาราง MAC เต็ม; แก้ด้วยเพิ่ม aging time", why: "ผิด: ตารางสั่นเป็นอาการ ไม่ใช่สาเหตุ" },
        { t: "สายที่สองทำให้ IP ซ้ำ; แก้ด้วย DHCP", why: "ผิด: L2 loop ไม่เกี่ยวกับ IP" },
        { t: "เกิด loop ที่ L2 และเฟรม Ethernet ไม่มี TTL broadcast จึงวนซ้ำและทวีคูณ (storm); แก้ด้วย Spanning Tree Protocol ให้ block ลิงก์หนึ่งแต่เก็บไว้สำรอง", why: "ถูก: STP เลือก root แล้ว block ลิงก์เกิน เปิดใช้เมื่อลิงก์หลักล้ม" }
      ], ans: 3 },
    { type: "choice", story: "ตามรูป switch มี VLAN 10 (A, B) และ VLAN 20 (C) แต่ผู้ดูแลตั้ง IP ทั้งสามเครื่องใน 192.168.1.0/24 เดียวกัน A ping 192.168.1.3 (C) แล้วเจอ Destination host unreachable ขณะที่ ping B ได้ปกติ", fig: F3,
      q: "สาเหตุและวิธีแก้ที่ถูกต้อง",
      opts: [
        { t: "switch ทิ้งเฟรมเพราะ MAC ซ้ำ; แก้ด้วยเปลี่ยน MAC", why: "ผิด: ไม่มี MAC ซ้ำ และ ping B ผ่านอยู่" },
        { t: "ARP broadcast ของ A ค้างใน VLAN 10 ไม่ถึง C (VLAN 20) จึงไม่มี reply; แก้โดยให้แต่ละ VLAN มี subnet ของตัวเองและใช้ router (inter-VLAN routing) เชื่อม", why: "ถูก: ต่าง VLAN คุยที่ L2 ไม่ได้ ต้องผ่าน router" },
        { t: "ลืมเปิด Spanning Tree; แก้ด้วยเปิด STP", why: "ผิด: STP ป้องกัน loop ไม่เกี่ยวกับการข้าม VLAN" },
        { t: "CSMA/CD ชนกันระหว่าง VLAN; แก้ด้วยลดจำนวนเครื่อง", why: "ผิด: switch แยก collision domain ต่อพอร์ตอยู่แล้ว" }
      ], ans: 1 },
    { type: "choice", story: "สถานี A และ C เชื่อม Wi-Fi กับ AP เดียวกัน แต่ A กับ C อยู่คนละฝั่งตึกและกำแพงคอนกรีตกั้นจนไม่ได้ยินกัน ทั้งคู่ฟังช่องก่อนส่ง (CSMA/CA) ตรวจเจอ 'ว่าง' ทุกครั้งแต่เฟรมจำนวนมากไม่ได้รับ ACK", fig: F5,
      q: "อะไรเกิดขึ้น และเครื่องมือใดช่วย",
      opts: [
        { t: "Hidden terminal: A และ C ไม่ได้ยินกันจึงเห็นว่าง ส่งพร้อมกันแล้วชนที่ AP; เปิด RTS/CTS ให้ AP ส่ง CTS ให้ทุกคนได้ยินและเงียบตาม Duration", why: "ถูก: AP เป็นโหนดเดียวที่ทุกคนได้ยิน จึงเป็นผู้จองช่อง" },
        { t: "เฟรมเสียจาก propagation delay ใน CSMA/CD; แก้ด้วยลดความยาวสาย", why: "ผิด: นี่คือ Wi-Fi ซึ่งไม่ใช้ CSMA/CD และสาเหตุคือสองสถานีมองไม่เห็นกัน" },
        { t: "CRC ของ Wi-Fi อ่อน; แก้ด้วยเพิ่ม CRC", why: "ผิด: เฟรมเสียเพราะชนที่ผู้รับ ไม่ใช่ CRC อ่อน" },
        { t: "ต้องเปลี่ยน AP เป็น hub", why: "ผิด: hub ไม่เกี่ยวกับการเข้าถึงสื่อไร้สาย" }
      ], ans: 0 },
    { type: "choice", story: "H1 (Wi-Fi) ส่ง IP packet ไป Internet ผ่าน AP แล้ว switch แล้ว router R1 (default gateway) ตามรูป", fig: F6,
      q: "ค่า Address 1/2/3 ของเฟรม 802.11 ที่ H1 ส่ง และ Dst/Src ของเฟรม 802.3 ที่ AP ส่งลงสายคืออะไร",
      opts: [
        { t: "Addr1 = R1, Addr2 = H1, Addr3 = AP; สาย Dst = R1, Src = H1", why: "ผิด: Addr1 ต้องเป็นผู้รับบนอากาศ (AP) และ Addr3 คืออุปกรณ์ฝั่งสาย (R1)" },
        { t: "Addr1 = H1, Addr2 = AP, Addr3 = R1; สาย Dst = R1, Src = AP", why: "ผิด: นี่คือรูปแบบขาลง (AP&rarr;H1) และ AP ไม่ใช่ Src บนสาย" },
        { t: "Addr1 = AP, Addr2 = H1, Addr3 = R1; สาย Dst = R1, Src = H1", why: "ถูก: Addr1/2 คือสองวิทยุใน hop นี้, Addr3 = ปลายทางฝั่ง LAN คัดลอกเป็น Dst บนสาย และ Src ยังเป็น H1 (MAC ของ AP หายไป)" },
        { t: "Addr1 = AP, Addr2 = H1, Addr3 = R1; สาย Dst = AP, Src = H1", why: "ผิด: AP เป็น bridge ไม่อ่าน IP ถ้า Dst เป็น AP จะไม่มีใครส่งต่อให้ router" }
      ], ans: 2 },
    { type: "multi", story: "ผู้ดูแลเปรียบเทียบ hub, switch และ router ใน LAN หนึ่ง", q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Switch เรียนรู้ตำแหน่งอุปกรณ์จาก Source MAC ของเฟรมที่ผ่านเข้ามา", ok: true, why: "กฎ learn" },
        { t: "ถ้า Destination MAC ไม่อยู่ในตาราง switch จะ flood ทุกพอร์ตยกเว้นพอร์ตขาเข้า", ok: true, why: "กฎ flood" },
        { t: "Broadcast frame ถูกส่งพอร์ตเดียวเมื่อ switch มีตารางครบแล้ว", ok: false, why: "broadcast flood เสมอ ตารางช่วยไม่ได้" },
        { t: "Router แบ่ง broadcast domain และ switch แบ่ง collision domain", ok: true, why: "จดไว้ว่า switch = collision, router/VLAN = broadcast" },
        { t: "Hub แต่ละพอร์ตเป็น collision domain ของตัวเอง", ok: false, why: "hub ทั้งตัวเป็น collision domain เดียว" },
        { t: "ในเครือข่าย switched แบบ full duplex ไม่จำเป็นต้องใช้ CSMA/CD", ok: true, why: "ไม่มีการแย่งสื่อในพอร์ตเฉพาะ" }
      ] },
    { type: "multi", story: "วิศวกรกำลังออกแบบ Wi-Fi ให้ตึกใหญ่และต้องเข้าใจกลไกการเข้าถึงสื่อ", q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Wi-Fi ตรวจ collision ขณะส่งไม่ได้ เพราะวิทยุฟังขณะส่งไม่ได้ (สัญญาณตัวเองแรงกว่ามาก)", ok: true, why: "เหตุผลที่หนึ่ง" },
        { t: "collision ใน Wi-Fi เกิดที่ผู้รับ ผู้ส่งจึงมองไม่เห็น", ok: true, why: "เหตุผลที่สอง" },
        { t: "ใน CSMA/CA ตัวนับ backoff จะรีสตาร์ตใหม่ทุกครั้งที่ช่องไม่ว่าง", ok: false, why: "ตัวนับ freeze แล้วนับต่อ ไม่รีสตาร์ต" },
        { t: "ถ้า unicast frame ไม่ได้รับ ACK ผู้ส่งจะ retransmit พร้อมเพิ่ม backoff window", ok: true, why: "กฎข้อ 4 ของ CSMA/CA" },
        { t: "personal hotspot ของมือถือทำงานเป็น ad hoc (IBSS)", ok: false, why: "มือถือกลายเป็น AP แล้วโน้ตบุ๊ก join แบบ infrastructure" },
        { t: "บน AP เดียวกัน SSID ต่างกันผูกกับ VLAN ต่างกันได้ ทำให้ staff กับ guest แยก broadcast domain", ok: true, why: "SSID เลือก VLAN แล้ว AP ติด tag 802.1Q ขึ้น trunk" }
      ] },
    { type: "blank", story: "สถานีสองสถานีบนสาย Ethernet แบบ shared medium (CSMA/CD, 10 Mbps) เกิด collision ซ้ำ ๆ", text: "ถ้าสถานีหนึ่งชนเป็นครั้งที่ 3 มันเลือก K จากช่วง {1} ; เวลารอสูงสุดเท่ากับ {2} &micro;s (หน่วยละ 51.2 &micro;s) ; และถ้าสองสถานีชนครั้งแรกแล้วต่างเลือก K จาก {0,1} โอกาสที่ชนซ้ำอีกคือ {3}", blanks: [
      { opts: ["0-3", "0-7", "0-15", "0-1023"], ans: 1, why: "ชนครั้งที่ n เลือกจาก 0 ถึง 2^n - 1; n = 3 ได้ 0-7" },
      { opts: ["153.6", "768", "51.2", "358.4"], ans: 3, why: "7 x 51.2 = 358.4 &micro;s" },
      { opts: ["1/4", "1/8", "0", "1/2"], ans: 3, why: "เลือกเหมือนกัน 2 ใน 4 รูปแบบ = 1/2" }
    ] },
    { type: "blank", story: "การออกแบบขนาดเฟรมขั้นต่ำของ Ethernet", text: "เฟรมต้องไม่ต่ำกว่า 512 บิต (64 ไบต์) ที่ 10 Mbps คือ 51.2 &micro;s ที่ 100 Mbps 512 บิตใช้เวลา {1} &micro;s ทำให้ขนาดเครือข่ายสูงสุดลดลง {2} เท่า และ ARP request ที่มี payload 28 ไบต์ต้อง pad เพิ่ม {3} ไบต์", blanks: [
      { opts: ["51.2", "0.512", "5.12", "512"], ans: 2, why: "512 บิต / 100 Mbps = 5.12 &micro;s" },
      { opts: ["2", "10", "100", "5"], ans: 1, why: "เวลา 51.2 &rarr; 5.12 &micro;s = ลดสิบเท่า" },
      { opts: ["18", "46", "28", "64"], ans: 0, why: "payload ขั้นต่ำ 46 ไบต์: 46 - 28 = 18" }
    ] },
    { type: "blank", story: "สรุปการทำงานของ switch และ router", text: "Switch เรียนรู้ตำแหน่งอุปกรณ์จาก {1} ของเฟรมที่เข้ามา ถ้า destination ไม่รู้หรือเป็น broadcast จะ {2} ส่วนอุปกรณ์ที่แบ่ง broadcast domain คือ {3}", blanks: [
      { opts: ["Destination MAC", "IP address", "Source MAC", "VLAN ID"], ans: 2, why: "learn จาก Source MAC + พอร์ตขาเข้า" },
      { opts: ["ทิ้งเฟรม", "flood ทุกพอร์ตยกเว้นพอร์ตขาเข้า", "ส่งกลับพอร์ตเดิม", "ถาม router"], ans: 1, why: "กฎ flood" },
      { opts: ["hub", "repeater", "router (และ VLAN)", "สาย Ethernet"], ans: 2, why: "router/VLAN แบ่ง broadcast domain; switch แบ่ง collision domain" }
    ] },
    { type: "match", q: "จับคู่แนวคิดกับคำอธิบาย", pairs: [
      ["TDM / FDM", "partitioning: ไม่ชน แต่ช่องว่างเสียเปล่า"],
      ["Slotted ALOHA / CSMA/CD", "random access: ยอมให้ชนแล้วกู้ภายหลัง"],
      ["Polling / Token passing", "taking turns: มีผู้ถือสิทธิ์ส่งทีละคน"],
      ["Switch", "แบ่ง collision domain ต่อพอร์ต"],
      ["Router (และ VLAN)", "แบ่ง broadcast domain"]
    ], why: "ตระกูลของ multiple access แบ่งเป็น partitioning, random access และ taking turns; ส่วน switch แบ่ง collision domain ขณะที่ router/VLAN แบ่ง broadcast domain" }
  ]
});
