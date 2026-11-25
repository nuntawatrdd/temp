IOT.reg({
  id: "c14",
  title: "WAN Fundamentals: PPP และ PPPoE",
  th: "WAN เทียบ LAN, PPP frame, LCP/PAP/CHAP/IPCP, การ configure PPP บน Huawei, PPPoE discovery และ session, การ dial-up",
  summary: `
<ul>
<li><b>LAN vs WAN</b>: LAN องค์กรสร้างและดูแลเอง; WAN ดูแลโดยผู้ให้บริการ (carrier) คิดค่าบริการ ครอบคลุมระยะไกล; router ต่อ WAN ผ่าน <b>Serial interface</b></li>
<li>แต่ละ link ใช้ data link protocol ต่างกันได้ (Ethernet, HDLC, PPP, Frame Relay); packet ถูก <b>encapsulate ใหม่ทุก link</b></li>
<li><b>PPP</b>: protocol data link สำหรับ point-to-point แบบ full-duplex, ใช้กันแพร่หลายที่สุดสำหรับ Internet access, รองรับ authentication และกำหนด IP ให้ฝั่งตรงข้าม</li>
<li><b>PPP frame</b>: Flag 0x7E (1) | Address 0xFF (1) | Control 0x03 (1) | Protocol (2) | Information (≤1500, MRU default 1500) | FCS (2) | Flag 0x7E (1); ต่างจาก HDLC ตรงที่มีฟิลด์ <b>Protocol</b></li>
<li><b>Protocol field</b>: 0xC021 = LCP, 0xC023 = PAP, 0xC223 = CHAP</li>
<li><b>PPP ประกอบด้วย</b>: LCP (เจรจา link: MRU, authentication mode, magic number), authentication (PAP/CHAP), NCP (เช่น IPCP สำหรับ IPv4, IPv6CP)</li>
<li><b>3 stage</b>: (1) link layer negotiation ด้วย LCP, (2) authentication (optional), (3) network layer negotiation ด้วย NCP/IPCP</li>
<li><b>5 phase</b>: Dead, Link Establishment, Authentication, Network Layer Protocol, Link Termination; ล้มเหลวตอน authenticate → link termination</li>
<li><b>LCP messages</b>: Configure-Request / Ack (รับได้ทุก parameter) / Nak (parameter รับไม่ได้ พร้อมค่าที่รับได้) ; ไม่มีตอบ ส่งซ้ำทุก <b>3 วินาที</b> ครบ <b>10 ครั้ง</b> ถือว่า peer ใช้ไม่ได้</li>
<li><b>Magic number</b>: เลขสุ่มตรวจ loop และความผิดปกติ</li>
<li><b>PAP</b>: 2-way handshake, ส่ง username+password เป็น <b>plain text</b> (Authenticate-Request, ตอบ Ack/Nak)</li>
<li><b>CHAP</b>: 3-way handshake, Challenge (ID + random) → Response (MD5 ของ ID + random + password, 16 byte + username) → Success/Failure; <b>ไม่ส่ง password ผ่านสาย</b> ปลอดภัยกว่า PAP (แต่ MD5 เองก็ถือว่าอ่อน)</li>
<li><b>IPCP</b>: static (แต่ละฝั่งส่ง Configure-Request พร้อม IP ของตน) และ dynamic (ส่ง 0.0.0.0 ขอ IP, peer ตอบ Nak พร้อม IP ใหม่, ส่ง Request ใหม่, ได้ Ack)</li>
<li><b>Huawei CLI</b>: <code>link-protocol ppp</code>; <code>ppp authentication-mode pap|chap</code> (ฝั่ง authenticator); PAP: <code>ppp pap local-user U password cipher P</code> (ฝั่ง authenticatee); CHAP: <code>ppp chap user U</code> + <code>ppp chap password cipher P</code>; user ใน <code>aaa</code>: <code>local-user U password cipher P</code> และ <code>local-user U service-type ppp</code></li>
<li><b>PPPoE</b>: ห่อ PPP ใน Ethernet เพื่อให้ ISP authenticate/คิดเงินผู้ใช้แต่ละราย; client = <b>Host</b>, server = <b>AC</b> (Access Concentrator)</li>
<li><b>PPPoE message</b>: Ethernet Type <b>0x8863</b> (Discovery) / <b>0x8864</b> (Session); header: VER 0x1, Type 0x1, Code, Session-ID, Length; payload = PPP (Protocol + Information เท่านั้น)</li>
<li><b>Discovery 4 ข้อความ</b>: PADI (Code 0x09, <b>broadcast</b>, Session-ID 0) → PADO (0x07, unicast) → PADR (0x19, unicast, Session-ID 0) → PADS (0x65, unicast, <b>กำหนด Session-ID</b>)</li>
<li><b>PPP Session phase</b>: Ethernet Type 0x8864, Code 0x00, Session-ID คงที่ที่ได้จาก PADS</li>
<li><b>PPPoE server บน Huawei</b>: ip pool + <code>interface Virtual-Template</code> (remote address pool, ip address, ppp ipcp dns) + <code>pppoe-server bind virtual-template 1</code> ที่ interface Ethernet (ที่ไม่มี IP); ดู session ด้วย <code>display pppoe-server session all</code></li>
<li>Client ที่ dial-up ได้ mask <b>255.255.255.255</b> และ default gateway 0.0.0.0 บน Windows</li>
</ul>`,
  sections: [
    {
      t: "14.1 ภาพรวมของ WAN",
      ref: "หน้า 454-456",
      html: `
<p>องค์กรมีหลายสาขา แต่ละสาขาเป็น LAN ของตัวเอง การเชื่อมสาขาที่อยู่ห่างกันต้องใช้ <b>WAN (Wide Area Network)</b> ซึ่งครอบคลุมระยะตั้งแต่ไม่กี่กิโลเมตรถึงข้ามทวีป WAN ในอดีตเริ่มจาก X.25 (64 kbit/s) ผ่าน DDN, Frame Relay, ATM จนมาเป็น WAN แบบ IP ที่ 10 Gbit/s ขึ้นไป</p>
<figure><img src="i/p455_1.webp" alt="บริษัทมี LAN สามแห่ง ปักกิ่ง เซี่ยงไฮ้ เซินเจิ้น เชื่อมกันผ่านเครือข่ายผู้ให้บริการ" loading="lazy"><figcaption>Fig. 14.1 LAN and WAN illustration (LAN ของแต่ละสาขาเชื่อมผ่านเครือข่าย WAN ของ carrier)</figcaption></figure>
<table>
<tr><th>หัวข้อ</th><th>LAN</th><th>WAN</th></tr>
<tr><td>ผู้สร้าง/ดูแล</td><td>องค์กรเองซื้อ router/switch</td><td>บริษัทโทรคมนาคม (carrier)</td></tr>
<tr><td>ค่าใช้จ่าย</td><td>ลงทุนอุปกรณ์เอง</td><td>บริการเชิงพาณิชย์ นับ traffic และ billing</td></tr>
<tr><td>ระยะ</td><td>ใกล้ (ภายในอาคาร/campus)</td><td>ไกลหลาย km ถึงข้ามประเทศ</td></tr>
<tr><td>ตัวอย่าง</td><td>Ethernet, Wi-Fi</td><td>Dial-up, fiber ที่บ้านเข้า Internet, leased line</td></tr>
</table>
<h4>Serial interface และ data link protocol ของ WAN</h4>
<ul>
<li>Router ต่อกับ WAN ผ่าน <b>Serial interface</b> (มีหลายมาตรฐาน เช่น asynchronous/synchronous, non-channelized E1/T1)</li>
<li>WAN link ใช้ protocol ได้หลากหลาย: <b>HDLC</b>, <b>PPP</b> (ใช้กับ link point-to-point ปกติ), <b>X.25</b>, <b>Frame Relay</b></li>
</ul>
<figure><img src="i/p456_1.webp" alt="AR1-AR2 ใช้ HDLC, AR2-AR3 ใช้ PPP, AR3-AR4 ผ่าน Frame Relay switch" loading="lazy"><figcaption>Fig. 14.2 WAN illustration (แต่ละ link ใช้ data link protocol ต่างกัน: HDLC, PPP, Frame Relay)</figcaption></figure>
<p>จากรูป packet จาก PC1 ไป PC2 ถูก encapsulate ทีละ link: Ethernet frame (PC1 ถึง AR1) → HDLC frame (AR1-AR2) → PPP frame (AR2-AR3) → Frame Relay frame (AR3-AR4) → Ethernet frame (AR4 ถึง PC2) โดย IP packet ภายในเหมือนเดิม เปลี่ยนเฉพาะ frame ภายนอกในแต่ละ link</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>WAN สร้าง/ดูแลโดย carrier และคิดค่าบริการ; LAN องค์กรดูแลเอง</li>
<li>Router เชื่อม WAN ผ่าน Serial interface; แต่ละ link ใช้ data link protocol ได้ต่างกัน</li>
<li>PPP เป็น protocol มาตรฐานของ point-to-point link</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> หนังสือพิมพ์ว่า WAN ใช้ "GSMA/CD" ในบทนำ ซึ่งเป็นการสะกดผิด: CSMA/CD เป็นกลไกของ Ethernet (LAN) ที่ไม่รองรับ authentication ของอุปกรณ์ ต่างจาก PPP ที่ authenticate ได้</div>`
    },
    {
      t: "14.2.1-14.2.2 PPP คืออะไรและรูปแบบ Frame",
      ref: "หน้า 456-458",
      html: `
<h4>PPP (Point-to-Point Protocol)</h4>
<ul>
<li>เป็น data link layer protocol สำหรับส่งข้อมูลแบบ point-to-point บน link <b>full-duplex</b> ปัจจุบันใช้กันมากที่สุดในการเข้า Internet (ตั้งแต่ยุค 1990 แทน SLIP และ CSLIP)</li>
<li>มี <b>LCP</b> (Link Control Protocol) เจรจา parameter ของ link (MRU, authentication mode, magic number), มี <b>PAP</b>/<b>CHAP</b> สำหรับ authentication และมี <b>NCP</b> (เช่น <b>IPCP</b>) เจรจา parameter ของ network layer</li>
<li>ขยายได้ดี: รวมกับ ADSL, cable modem, LAN ได้ เช่น <b>PPPoE</b> (ใช้บ้านมากที่สุด) ซึ่งรัน PPP บน Ethernet</li>
<li>CSMA/CD ทำงานกับ Ethernet interface/link ส่วน PPP ทำงานกับ <b>serial interface/link</b> (เช่น RS-232, RS-422, V.35) ขอเพียง full-duplex และ rate ที่สองฝั่ง <b>ตรงกัน</b></li>
</ul>
<h4>PPP frame format</h4>
<figure><img src="i/p457_1.webp" alt="PPP frame: Flag 0x7E, Address 0xFF, Control 0x03, Protocol 2 byte, Information, FCS 2 byte, Flag 0x7E" loading="lazy"><figcaption>Fig. 14.3 PPP frame format (header 5 byte, footer 3 byte, Information ไม่เกิน 1500 byte)</figcaption></figure>
<table>
<tr><th>ฟิลด์</th><th>ขนาด</th><th>ค่า/ความหมาย</th></tr>
<tr><td>Flag</td><td>1 byte</td><td>0x7E เริ่ม frame</td></tr>
<tr><td>Address</td><td>1 byte</td><td>0xFF (all 1s = ทุก interface บน link) เพราะ point-to-point ไม่ต้องระบุผู้รับ</td></tr>
<tr><td>Control</td><td>1 byte</td><td>0x03 ค่าคงที่</td></tr>
<tr><td>Protocol</td><td>2 byte</td><td>บอกชนิดของ Information เช่น 0xC021 LCP, 0xC023 PAP, 0xC223 CHAP</td></tr>
<tr><td>Information</td><td>ไม่เกิน 1500 byte</td><td>ข้อมูล (เช่น IP packet) ความยาวสูงสุดเรียกว่า MRU</td></tr>
<tr><td>FCS</td><td>2 byte</td><td>Frame Check Sequence</td></tr>
<tr><td>Flag</td><td>1 byte</td><td>0x7E จบ frame</td></tr>
</table>
<p>PPP ยืมรูปแบบ <b>Flag และ FCS จาก HDLC</b> แต่เพิ่มฟิลด์ <b>Protocol</b> (HDLC ไม่มี) เพื่อรองรับหลาย network protocol</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Flag 0x7E, Address 0xFF, Control 0x03</li>
<li>Header 5 byte + footer 3 byte = overhead 8 byte ต่อ frame</li>
<li>Protocol: 0xC021 LCP, 0xC023 PAP, 0xC223 CHAP</li>
<li>MRU เริ่มต้น 1500 (บน VRP แสดงด้วยค่า MTU ของ interface)</li>
</ul></div>`
    },
    {
      t: "14.2.3-14.2.4 ขั้นตอนเจรจา PPP: 3 Stage และ 5 Phase",
      ref: "หน้า 458-459",
      html: `
<h4>3 Stage ของการเจรจา</h4>
<ol>
<li><b>Link layer negotiation</b> ด้วย <b>LCP</b>: เจรจา MRU, authentication mode, magic number (parameter ที่ไม่เจรจาใช้ค่า default)</li>
<li><b>Authentication</b> (optional): ใช้โหมดที่เจรจาได้ในขั้นแรก ฝ่ายที่ต้องการให้ตรวจสอบ (authenticator) ให้อีกฝ่าย (authenticatee) แสดง account/password; โปรโตคอลที่ใช้บ่อยคือ PAP และ CHAP</li>
<li><b>Network layer negotiation</b> ด้วย <b>NCP</b>: NCP ไม่ใช่ protocol เดียว แต่เป็นชุด protocol ตามชนิดของ network layer: IPv4 → <b>IPCP</b>, IPv6 → <b>IPv6CP</b>, IPX → IPXCP, AppleTalk → ATCP; IPCP เจรจา เช่น การบีบอัด header, algorithm และ <b>IPv4 address ของ interface</b></li>
</ol>
<h4>5 Phase ของ PPP</h4>
<table>
<tr><th>Phase</th><th>เกิดอะไรขึ้น</th></tr>
<tr><td>1. Link Dead</td><td>ก่อนติดต่อ physical layer ของ interface ยังไม่พร้อม; เมื่อทั้งสองฝั่ง physical ปกติจึงเข้าสู่ phase ถัดไป</td></tr>
<tr><td>2. Link Establishment</td><td>ส่ง LCP เจรจา MRU, auth mode, magic number; สำเร็จ link เป็น <b>Opened</b></td></tr>
<tr><td>3. Authentication</td><td>ถ้ามีการตั้งค่า authentication ตรวจด้วย PAP หรือ CHAP; ไม่ตั้งค่าก็ข้ามไป phase ถัดไป ถ้า <b>ล้มเหลว</b> ไป Link Termination และ LCP เป็น Down</td></tr>
<tr><td>4. Network Layer Protocol</td><td>NCP เจรจาเลือก/ตั้งค่า network protocol และ parameter (เช่น IP address)</td></tr>
<tr><td>5. Link Termination</td><td>ปล่อย resource ทั้งหมดแล้วกลับเข้า Dead; เกิดได้ทุกเวลา เช่น physical link หลุด, authentication fail, timer เจรจาหมดเวลา, admin ปิด</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>3 stage: LCP, Authentication (optional), NCP</li>
<li>5 phase: Dead, Link Establishment, Authentication, Network Layer Protocol, Link Termination</li>
<li>ถ้าไม่ตั้ง authentication จะข้าม Authentication phase ไปที่ Network phase</li>
<li>Authentication ล้มเหลวทำให้ link terminate (ไม่ไปถึงขั้น IP)</li>
</ul></div>`
    },
    {
      t: "ขั้นที่ 1: Link Establishment ด้วย LCP",
      ref: "หน้า 459-461",
      html: `
<p>เมื่อ physical layer ของทั้งสองฝั่งพร้อม ทั้งคู่ส่ง PPP frame ที่มี LCP message ถึงกัน Protocol field = <b>0xC021</b> และมีฟิลด์ <b>Code</b> ระบุชนิด LCP message</p>
<figure><img src="i/p460_1.webp" alt="รูปแบบ LCP message: Code, Identifier, Length, Data" loading="lazy"><figcaption>Fig. 14.4 LCP message format (Protocol 0xC021; Code, Identifier, Length, Data แบบ TLV)</figcaption></figure>
<ul>
<li><b>Identifier</b> (1 byte): จับคู่ request กับ response</li>
<li><b>Length</b>: ความยาว LCP message ทั้งหมด</li>
<li><b>Data</b>: parameter ในรูป <b>TLV</b> (Type, Length, Value)</li>
</ul>
<h4>Parameter ที่เจรจาบ่อย</h4>
<table>
<tr><th>Parameter</th><th>ความหมาย</th></tr>
<tr><td>MRU</td><td>ขนาด Information สูงสุดที่รับได้ (default 1500); บน VRP แสดงด้วยค่า MTU ของ interface</td></tr>
<tr><td>Authentication protocol</td><td>PAP หรือ CHAP (ทั้งสองฝั่งใช้ต่างกันได้ แต่ authenticatee ต้องรองรับและตั้ง account ให้ถูก)</td></tr>
<tr><td>Magic number</td><td>เลขสุ่มตรวจ loop และความผิดปกติ โอกาสซ้ำกันทั้งสองฝั่งต่ำมาก</td></tr>
</table>
<h4>กระบวนการเจรจา LCP</h4>
<figure><img src="i/p461_1.webp" alt="RA เสนอ MRU=2000, RB ตอบ Nak ให้ใช้ 1500, RA ส่งใหม่ MRU=1500 แล้ว RB Ack" loading="lazy"><figcaption>Fig. 14.5 LCP negotiation process (Request, Nak พร้อมค่า MRU 1500, Request ใหม่, Ack)</figcaption></figure>
<ol>
<li>RA ส่ง <b>Configure-Request</b> พร้อม parameter ของตน (ตัวอย่าง MRU=2000, PAP, magic number a)</li>
<li>RB ถ้ารับ parameter ทั้งหมดได้ ตอบ <b>Configure-Ack</b>; ถ้ารับบางตัวไม่ได้ ตอบ <b>Configure-Nak</b> พร้อมค่าที่รับได้ (ตัวอย่าง RB รับ MRU ไม่ได้ เสนอ 1500)</li>
<li>RA ปรับ parameter ตาม Nak แล้วส่ง Configure-Request ใหม่ (MRU=1500)</li>
<li>RB ตอบ Configure-Ack</li>
<li>RB ส่ง Configure-Request ของตนเองถึง RA (ทิศทางกลับ) และ RA ตอบ Ack ถ้ารับได้</li>
</ol>
<div class="warn"><b>ระวัง</b> LCP เจรจา <b>แยกกันสองทิศ</b> แต่ละฝั่งส่ง request ของตัวเอง และอีกฝั่งต้อง Ack จึงจะ open ทั้งสองทิศ</div>
<p><b>Timeout</b>: ถ้า RA ไม่ได้รับทั้ง Ack และ Nak จะส่ง Configure-Request ซ้ำ <b>ทุก 3 วินาที</b> ถ้าส่ง <b>10 ครั้งติดต่อกัน</b> ไม่ได้ Ack ถือว่า RB ใช้ไม่ได้และหยุดส่ง</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Configure-Request: เสนอ; Configure-Ack: รับทุกอย่าง; Configure-Nak: ขอแก้ค่าบางตัว (บอกค่าที่รับได้)</li>
<li>Resend ทุก 3 s, สูงสุด 10 ครั้ง</li>
<li>Frame ที่ Ack จะมี magic number ตรงกับ Request ที่มันตอบ</li>
</ul></div>`
    },
    {
      t: "ขั้นที่ 2: Authentication (PAP และ CHAP)",
      ref: "หน้า 461-463",
      html: `
<p>หลัง LCP สำเร็จ ถ้าฝ่ายหนึ่งขอให้ authenticate (เสนอ auth protocol ใน LCP) ฝ่ายนั้นคือ <b>authenticator</b> และอีกฝ่ายคือ <b>authenticatee</b> (ผู้พิสูจน์ตัว) สองฝั่งไม่จำเป็นต้องใช้โหมดเดียวกันและตรวจกันทั้งสองทางได้</p>
<h4>PAP: Password Authentication Protocol</h4>
<figure><img src="i/p462_1.webp" alt="PAP: authenticatee ส่ง username และ password แบบ plain text, authenticator ตอบ Ack หรือ Nak" loading="lazy"><figcaption>Fig. 14.6 PAP authentication (2-way handshake, password ส่งแบบ plain text)</figcaption></figure>
<ol>
<li>Authenticatee ส่ง <b>Authenticate-Request</b> มี username + password เป็น <b>plain text</b></li>
<li>Authenticator ตรวจกับฐานข้อมูล local: ตรงกัน ตอบ <b>Authenticate-Ack</b>, ไม่ตรง ตอบ <b>Authenticate-Nak</b></li>
</ol>
<div class="note"><b>หมายเหตุ</b> ในหนังสือเขียนข้อความตอบสำเร็จของ PAP ว่า "Authenticate-Request" ซึ่งเป็นการพิมพ์ผิด ที่ถูกคือ Authenticate-Ack (ดูได้จาก packet capture ที่ Frame 7)</div>
<h4>CHAP: Challenge Handshake Authentication Protocol</h4>
<figure><img src="i/p462_2.webp" alt="CHAP: Challenge มี ID และ random, Response มี MD5 digest และ username, Success" loading="lazy"><figcaption>Fig. 14.7 CHAP authentication (3-way handshake: Challenge, Response พร้อม MD5, Success)</figcaption></figure>
<ol>
<li>Authenticator ส่ง <b>Challenge</b> มี <b>ID</b> และ <b>random number</b></li>
<li>Authenticatee คำนวณ <b>MD5(ID + random + password)</b> ได้ digest 16 byte ส่ง <b>Response</b> พร้อม CHAP username</li>
<li>Authenticator หา password ตาม username จากฐานข้อมูล คำนวณแบบเดียวกันแล้วเทียบ digest: ตรงกัน = Success, ไม่ตรง = Failure</li>
</ol>
<table>
<tr><th></th><th>PAP</th><th>CHAP</th></tr>
<tr><td>Handshake</td><td>2-way</td><td>3-way</td></tr>
<tr><td>Password บนสาย</td><td>plain text</td><td>ไม่ส่ง ส่งเฉพาะ MD5 digest</td></tr>
<tr><td>ใครเริ่ม</td><td>Authenticatee ส่ง credential ก่อน</td><td>Authenticator ส่ง Challenge ก่อน</td></tr>
<tr><td>ความปลอดภัย</td><td>ต่ำ (ดักได้)</td><td>สูงกว่า (random ใหม่ทุกครั้ง)</td></tr>
</table>
<div class="warn"><b>ระวัง</b> MD5 ถือว่าไม่ปลอดภัยเพียงพอในงาน security สมัยใหม่ หนังสือแนะนำใช้ algorithm ที่แข็งแรงกว่า เช่น AES, SHA2, HMAC-SHA2 ถ้า protocol รองรับ</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>PAP: 2-way, plain text; CHAP: 3-way, MD5, ไม่ส่ง password</li>
<li>Code ใน CHAP: Challenge (1), Response (2), Success (3)</li>
<li>Authentication ผิดพลาด: authenticator ตอบ Nak (PAP) / Failure (CHAP) และ link ถูก terminate</li>
</ul></div>`
    },
    {
      t: "ขั้นที่ 3: Network Layer ด้วย IPCP (Static และ Dynamic IP)",
      ref: "หน้า 463-465",
      html: `
<p>หลัง authenticate ผ่านสองฝั่งเข้า network layer protocol phase เพื่อเจรจา format และชนิด packet ที่จะส่ง ใช้ <b>IPCP</b> สำหรับ IPv4 แบ่งเป็น 2 แบบ</p>
<h4>Static IP address negotiation</h4>
<p>ตั้ง IP ที่ทั้งสองฝั่งด้วยมือ</p>
<figure><img src="i/p463_1.webp" alt="ทั้งสองฝั่งส่ง Configure-Request พร้อม IP ของตนแล้วตอบ Ack" loading="lazy"><figcaption>Fig. 14.8 Static IP address negotiation (แต่ละฝั่งส่ง Request พร้อม IP ตนเอง และ Ack ให้อีกฝั่ง)</figcaption></figure>
<ul>
<li>แต่ละฝั่งส่ง <b>Configure-Request</b> ที่มี IP ที่ตั้งไว้</li>
<li>ผู้รับตรวจว่าเป็น <b>unicast ที่ถูกต้อง</b> และ <b>ไม่ซ้ำ</b> กับ IP ตนเอง ถ้าใช่ตอบ <b>Configure-Ack</b></li>
</ul>
<h4>Dynamic IP address negotiation</h4>
<p>ให้ฝ่ายหนึ่งกำหนด IP ให้อีกฝ่าย (เหมือนที่ ISP กำหนด IP ให้ลูกค้า)</p>
<figure><img src="i/p464_1.webp" alt="RA ขอ IP ด้วย 0.0.0.0 RB ตอบ Nak พร้อม 10.1.1.1 แล้ว RA ส่ง Request ใหม่ ได้ Ack" loading="lazy"><figcaption>Fig. 14.9 Dynamic IP address negotiation (ขอด้วย 0.0.0.0, Nak พร้อม IP ที่กำหนด, Request ใหม่, Ack)</figcaption></figure>
<ol>
<li>RA ส่ง Configure-Request ที่ IP = <b>0.0.0.0</b> หมายถึงขอ IP จาก peer</li>
<li>RB ถือว่า 0.0.0.0 ไม่ถูกต้อง จึงตอบ <b>Configure-Nak</b> พร้อม IP ที่ให้ (ตัวอย่าง 10.1.1.1)</li>
<li>RA เปลี่ยน IP เป็น 10.1.1.1 แล้วส่ง Configure-Request ใหม่</li>
<li>RB ตอบ <b>Configure-Ack</b></li>
<li>ขณะเดียวกัน RB ส่ง Configure-Request ของตนเอง (IP ของ RB) ให้ RA ตรวจและ Ack</li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>ขอ IP: ส่ง 0.0.0.0 → ได้ Nak พร้อมค่าใหม่ → ส่งซ้ำ → Ack</li>
<li>Static: ต้องไม่ซ้ำ IP และเป็น unicast ที่ถูกต้อง</li>
<li>บน interface ที่ขอ IP ใช้คำสั่ง <code>ip address ppp-negotiate</code> (ขอ address จาก peer)</li>
</ul></div>`
    },
    {
      t: "14.2.5-14.2.6 Configure PPP บน Huawei: PAP และ CHAP",
      ref: "หน้า 465-468",
      html: `
<h4>เลือก data link protocol ของ Serial interface</h4>
<pre><code>[AR1]interface Serial 2/0/0
[AR1-Serial2/0/0]link-protocol ?
  fr    Select FR as line protocol
  hdlc  Enable HDLC protocol
  lapb  LAPB(X.25 level 2 protocol)
  ppp   Point-to-Point protocol
  sdlc  SDLC protocol
  x25   X.25 protocol
[AR1-Serial2/0/0]link-protocol ppp</code></pre>
<p>Serial interface ของ Huawei ใช้ PPP เป็นค่าเริ่มต้นอยู่แล้ว ตรวจด้วย <code>display interface Serial 2/0/0</code> สถานะ <b>current state : UP</b> = physical UP และ <b>Line protocol current state : UP</b> = data link UP (protocol ของสองฝั่งตรงกัน) พร้อมแสดง <i>Link layer protocol is PPP</i> และสถานะ LCP</p>
<h4>PAP: AR1 ตรวจ AR2 (AR1 = authenticator)</h4>
<figure><img src="i/p465_1.webp" alt="topology AR1 Serial 2/0/0 เชื่อม AR2 Serial 2/0/1 สำหรับ PAP" loading="lazy"><figcaption>Fig. 14.10 Configure PPP: PAP mode for authentication (AR1 ตรวจสอบ AR2)</figcaption></figure>
<pre><code>--ฝั่ง authenticator (AR1)
[AR1]aaa
[AR1-aaa]local-user Auser password cipher Huawei123
[AR1-aaa]local-user Auser service-type ppp
[AR1-aaa]quit
[AR1]interface Serial 2/0/0
[AR1-Serial2/0/0]ppp authentication-mode pap

--ฝั่ง authenticatee (AR2)
[AR2]interface Serial 2/0/1
[AR2-Serial2/0/1]link-protocol ppp
[AR2-Serial2/0/1]ppp pap local-user Auser password cipher Huawei123</code></pre>
<p>ถอด authentication ที่ AR1: <code>undo ppp authentication-mode pap</code></p>
<h4>CHAP: AR2 ตรวจ AR1 (AR2 = authenticator)</h4>
<figure><img src="i/p467_1.webp" alt="topology สำหรับ CHAP ที่ AR2 ตรวจ AR1" loading="lazy"><figcaption>Fig. 14.11 Configure PPP: CHAP mode for authentication (AR2 ตรวจสอบ AR1)</figcaption></figure>
<pre><code>--ฝั่ง authenticator (AR2)
[AR2]aaa
[AR2-aaa]local-user Buser password cipher huawei@123
[AR2-aaa]local-user Buser service-type ppp
[AR2]interface Serial 2/0/1
[AR2-Serial2/0/1]ppp authentication-mode chap

--ฝั่ง authenticatee (AR1)
[AR1]interface Serial 2/0/0
[AR1-Serial2/0/0]ppp chap user Buser
[AR1-Serial2/0/0]ppp chap password cipher huawei@123</code></pre>
<table>
<tr><th>บทบาท</th><th>PAP ต้องทำ</th><th>CHAP ต้องทำ</th></tr>
<tr><td>Authenticator</td><td>สร้าง user ใน aaa (service-type ppp) + <code>ppp authentication-mode pap</code></td><td>สร้าง user ใน aaa (service-type ppp) + <code>ppp authentication-mode chap</code></td></tr>
<tr><td>Authenticatee</td><td><code>ppp pap local-user U password cipher P</code></td><td><code>ppp chap user U</code> และ <code>ppp chap password cipher P</code></td></tr>
</table>
<div class="warn"><b>ระวัง</b> ถ้า authenticatee (AR2 ในตัวอย่าง PAP) ไม่ได้ตั้ง <code>ppp authentication-mode</code> เอง ก็แปลว่า AR1 ไม่ต้องแสดง account ให้ AR2 ตรวจ: การตรวจทำเฉพาะทิศที่ authenticator เป็นผู้ขอ ถ้าต้องการตรวจสองทาง ต้องตั้งทั้งสองฝั่ง</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>Link protocol: <code>link-protocol ppp</code> (ไม่ใช่ encapsulation ppp)</li>
<li>User ที่ใช้ตรวจ PPP ต้องมี <code>service-type ppp</code></li>
<li>Authenticator ตั้ง mode, authenticatee ตั้ง credential</li>
</ul></div>`
    },
    {
      t: "14.2.7 วิเคราะห์ Packet Capture ของการสร้าง PPP link",
      ref: "หน้า 468-471",
      html: `
<p>จับ packet บน link ของ AR1-AR2 หลัง config PAP จะเห็นลำดับ 3 phase ชัดเจน (frame 1-5 LCP, 6-7 PAP, 8-11 IPCP และ frame 12 ขึ้นไปเป็น IP packet/ICMP)</p>
<figure><img src="i/p468_1.webp" alt="Wireshark แสดง LCP, PAP, IPCP ตามลำดับ แล้วเป็น ICMP" loading="lazy"><figcaption>Fig. 14.12 Three phases of PPP link establishment (LCP, PAP, IPCP แล้วจึงส่ง IP ได้)</figcaption></figure>
<table>
<tr><th>Frame</th><th>Phase</th><th>เนื้อหา</th></tr>
<tr><td>1-5</td><td>Link establishment (LCP)</td><td>Configuration Request/Ack ของทั้งสองฝั่ง</td></tr>
<tr><td>6-7</td><td>Authentication (PAP)</td><td>Authenticate-Request (มี Peer-ID และ Password แบบ plain text) และ Authenticate-Ack</td></tr>
<tr><td>8-11</td><td>Network layer (IPCP)</td><td>Configuration Request พร้อม IP ของแต่ละ interface และ Ack</td></tr>
<tr><td>12 ขึ้นไป</td><td>Data</td><td>IP packet (ICMP ping)</td></tr>
</table>
<h4>รายละเอียดแต่ละ frame</h4>
<ul>
<li><b>Frame 2</b> (AR1 ส่ง Configuration Request): Protocol = LCP, Code = Configuration Request, parameter 3 ตัว: <b>MRU 1500</b>, <b>Authentication Protocol = PAP</b>, <b>Magic number 0x328c2356</b> (สุ่มโดย AR1)</li>
<li><b>Frame 3</b>: AR2 ตอบ Configuration Ack ซึ่ง magic number ตรงกับ Frame 2 เพื่อยืนยันว่า Ack ของ request ตัวไหน และมี parameter ครบ</li>
<li><b>Frame 4-5</b>: AR2 ส่ง Request ของตนมีแค่ <b>MRU</b> และ <b>magic number</b> (ไม่มี auth protocol เพราะ AR2 ไม่ต้องตรวจ AR1) แล้ว AR1 ตอบ Ack (magic number ตรงกัน)</li>
</ul>
<figure><img src="i/p469_1.webp" alt="Frame 2 Configuration Request ของ AR1: MRU 1500, PAP, magic number" loading="lazy"><figcaption>Fig. 14.13 Link establishment phase: AR1 interface parameter negotiation (MRU, PAP, magic number)</figcaption></figure>
<figure><img src="i/p470_1.webp" alt="Frame 4 Configuration Request ของ AR2 มีแค่ MRU และ magic number" loading="lazy"><figcaption>Fig. 14.14 Link establishment phase: AR2 interface parameter negotiation (MRU และ magic number)</figcaption></figure>
<ul>
<li><b>Frame 6</b> (AR2 ส่งให้ AR1): Protocol = PAP, Data มี username <b>Auser</b> และ password <b>Huawei123</b> เห็นเป็น <b>plain text</b>; AR1 ตรวจแล้วตอบ <b>Frame 7</b> (Authenticate-Ack)</li>
</ul>
<figure><img src="i/p470_2.webp" alt="Frame 6 PAP Authenticate-Request เห็น username และ password เป็น plain text" loading="lazy"><figcaption>Fig. 14.15 Authentication phase: AR1 authenticates AR2 (password มองเห็นได้ใน packet)</figcaption></figure>
<ul>
<li><b>Frame 8-9</b>: IPCP Configuration Request มี Options ใส่ IP ของ Serial 2/0/0 (AR1) และ Serial 2/0/1 (AR2); ผู้รับตรวจว่า IP ไม่ชนและอยู่ network เดียวกันก่อน Ack</li>
<li><b>Frame 10-11</b>: Configuration Ack ตอบกลับทั้งสองทิศ</li>
</ul>
<figure><img src="i/p471_1.webp" alt="IPCP Configuration Request พร้อม IP address option" loading="lazy"><figcaption>Fig. 14.16 Network protocol phase: send configuration request (IPCP พร้อม IP address)</figcaption></figure>
<figure><img src="i/p471_2.webp" alt="IPCP Configuration Ack ตอบกลับ" loading="lazy"><figcaption>Fig. 14.17 Network protocol phase: send configuration acknowledgement</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>ใน capture: LCP กี่ frame (5), PAP (2), IPCP (4) ก่อนมี IP data</li>
<li>PAP username/password มองเห็นใน capture เป็น plain text เป็นหลักฐานว่า PAP ไม่ปลอดภัย</li>
</ul></div>`
    },
    {
      t: "14.3.1-14.3.2 PPPoE: ที่มา สถาปัตยกรรม และรูปแบบ Message",
      ref: "หน้า 471-474",
      html: `
<h4>ปัญหาของ ISP ที่ PPPoE แก้</h4>
<p>บ้านใช้ PC → HG (Home Gateway) → ADSL ผ่านสายโทรศัพท์ → <b>IP-DSLAM</b> (เป็น Layer 2 aggregation switch) → GE → <b>AC</b> (Access Concentrator) ของ carrier ปัญหาคือ Ethernet frame ที่มาถึง AC ไม่มี username/password และแยกไม่ได้ว่ามาจาก HG ไหน carrier จึง billing และควบคุมการเข้าถึงไม่ได้</p>
<figure><img src="i/p472_1.webp" alt="PC ต่อ Home Gateway ผ่าน ADSL เข้า IP-DSLAM แล้วเข้า AC ของ carrier" loading="lazy"><figcaption>Fig. 14.18 A networking scenario for home users to access the Internet (PC, HG, ADSL, IP-DSLAM, AC)</figcaption></figure>
<p>PPP authenticate ได้ แต่ใช้ได้เฉพาะ <b>point-to-point</b> ส่วนเครือข่ายระหว่าง HG กับ AC เป็น <b>multi-access Ethernet</b> จึงเกิด <b>PPPoE (PPP over Ethernet)</b>: สร้าง "อุโมงค์ point-to-point" เสมือนระหว่างสอง Ethernet interface ใน broadcast domain เดียวกัน โดยห่อ PPP frame ไว้ใน Ethernet frame</p>
<figure><img src="i/p473_1.webp" alt="มุมมอง PPPoE: Host หลายเครื่องกับ AC ใน Ethernet เดียว" loading="lazy"><figcaption>Fig. 14.19 View the access network from the perspective of PPPoE (Host = PPPoE client, AC = PPPoE server)</figcaption></figure>
<ul>
<li>Client/Server model: อุปกรณ์ที่รัน client เรียก <b>Host</b> (HG หรือ PC), server เรียก <b>AC</b> (router ของ carrier)</li>
<li>ได้ link PPP แบบ "เสมือน" ระหว่าง Host กับ AC: PPP frame วิ่งไปกับ Ethernet frame ไม่ใช่สาย PPP จริง</li>
</ul>
<h4>รูปแบบ PPPoE message</h4>
<figure><img src="i/p474_1.webp" alt="PPPoE header: VER, Type, Code, Session-ID, Length ตามด้วย payload" loading="lazy"><figcaption>Fig. 14.20 PPPoE message format (VER 0x1, Type 0x1, Code, Session-ID, Length, Payload)</figcaption></figure>
<table>
<tr><th>ฟิลด์</th><th>ค่า/ความหมาย</th></tr>
<tr><td>Ethernet Type</td><td><b>0x8863</b> = Discovery stage, <b>0x8864</b> = PPP Session stage</td></tr>
<tr><td>VER</td><td>0x1 เสมอ</td></tr>
<tr><td>Type</td><td>0x1 เสมอ</td></tr>
<tr><td>Code</td><td>ระบุชนิด message (PADI 0x09, PADO 0x07, PADR 0x19, PADS 0x65, session data 0x00)</td></tr>
<tr><td>Session-ID</td><td>แยก PPPoE session ต่าง ๆ</td></tr>
<tr><td>Length</td><td>ความยาว payload</td></tr>
<tr><td>Payload</td><td>PPP frame (ใน session phase)</td></tr>
</table>
<div class="note"><b>หมายเหตุ</b> ที่ต้องห่อ PPP ใน Ethernet เพราะ NIC ห่อข้อมูลได้เฉพาะ Ethernet frame ไม่รู้จัก PPP frame จึงต้อง "ห่อซ้อน": PPP frame อยู่ใน payload ของ PPPoE ซึ่งอยู่ใน Ethernet frame</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>PPPoE: Host (client) กับ AC (server); ใช้เพื่อ authenticate/billing ผู้ใช้บน Ethernet</li>
<li>Type 0x8863 Discovery, 0x8864 Session</li>
<li>VER และ Type เป็น 0x1 เสมอ</li>
</ul></div>`
    },
    {
      t: "14.3.3 การทำงานของ PPPoE: Discovery และ PPP Session",
      ref: "หน้า 474-477",
      html: `
<h4>Phase 1: Discovery (4 message)</h4>
<figure><img src="i/p474_2.webp" alt="Host ส่ง PADI broadcast, AC ตอบ PADO, Host ส่ง PADR, AC ตอบ PADS" loading="lazy"><figcaption>Fig. 14.21 Discovery phase of PPPoE (PADI broadcast, PADO, PADR, PADS แบบ unicast; ในภาพสะกดผิดเป็น PAID)</figcaption></figure>
<table>
<tr><th>#</th><th>Message</th><th>Code</th><th>ส่งแบบ</th><th>จาก</th><th>หน้าที่</th></tr>
<tr><td>1</td><td><b>PADI</b> (Active Discovery Initiation)</td><td>0x09</td><td><b>Broadcast</b></td><td>Host</td><td>หา AC และบอกบริการที่ต้องการ; Session-ID = 0</td></tr>
<tr><td>2</td><td><b>PADO</b> (Active Discovery Offer)</td><td>0x07</td><td>Unicast</td><td>AC</td><td>เสนอตัว (ถ้าให้บริการที่ขอได้; ไม่ได้ก็ไม่ตอบ)</td></tr>
<tr><td>3</td><td><b>PADR</b> (Active Discovery Request)</td><td>0x19</td><td>Unicast</td><td>Host</td><td>เลือก AC (ปกติเลือก PADO ที่มาถึงก่อน) ขอ session; Session-ID = 0</td></tr>
<tr><td>4</td><td><b>PADS</b> (Active Discovery Session-confirmation)</td><td>0x65</td><td>Unicast</td><td>AC</td><td>กำหนด <b>Session-ID</b> (0xXXXX) แจ้ง Host</td></tr>
</table>
<figure><img src="i/p475_1.webp" alt="รูปแบบ PADI: Ethernet broadcast, Code 0x09, Session-ID 0, payload เป็น tag แบบ TLV" loading="lazy"><figcaption>Fig. 14.22 PADI message format (destination broadcast, Code 0x09, Session-ID 0, Tag TLV)</figcaption></figure>
<ul>
<li>Payload ของ PADI มีหลาย <b>Tag</b> แบบ TLV บอกบริการที่ Host ต้องการ</li>
<li>ถ้ามีหลาย AC อาจได้ PADO หลายตัว Host มักเลือกตัวแรกที่มาถึง</li>
<li>เมื่อ Host ได้ PADS (มี Session-ID) แสดงว่า PPPoE session สร้างสำเร็จ จึงเข้า phase ถัดไป</li>
</ul>
<h4>Phase 2: PPP Session</h4>
<figure><img src="i/p476_1.webp" alt="Ethernet frame Type 0x8864 ห่อ PPPoE header Code 0x00 และ PPP Protocol กับ Information" loading="lazy"><figcaption>Fig. 14.23 Ethernet data frame carrying a PPP frame (Type 0x8864, Code 0x00, Session-ID คงที่)</figcaption></figure>
<ul>
<li>Ethernet frame มี <b>Type = 0x8864</b> (ต่างจาก discovery ที่เป็น 0x8863 เสมอ)</li>
<li>PPPoE Code = <b>0x00</b>, Session-ID = ค่าที่ได้จาก PADS</li>
<li>PPPoE Payload ไม่ใช่ PPP frame เต็มรูป แต่มีเฉพาะ <b>Protocol และ Information</b> เพราะ Flag/Address/Control/FCS ไม่จำเป็นบน virtual link (Ethernet มี CRC อยู่แล้ว)</li>
<li>ภายใน session ทั้งสองฝั่งทำ PPP ครบ 3 phase: LCP, Authentication (PAP/CHAP), IPCP</li>
</ul>
<table>
<tr><th>เปรียบเทียบ</th><th>Discovery</th><th>PPP Session</th></tr>
<tr><td>Ethernet Type</td><td>0x8863</td><td>0x8864</td></tr>
<tr><td>Code</td><td>0x09, 0x07, 0x19, 0x65</td><td>0x00</td></tr>
<tr><td>Session-ID</td><td>0 (PADI, PADR) / กำหนดใน PADS</td><td>ค่าคงที่จาก PADS</td></tr>
<tr><td>ประเภท</td><td>PADI broadcast ที่เหลือ unicast</td><td>unicast</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>PADI (broadcast, 0x09) → PADO (0x07) → PADR (0x19) → PADS (0x65, ให้ Session-ID)</li>
<li>Session-ID ใช้แยกหลาย session ใน Ethernet interface เดียว; Session-ID ของ PADI และ PADR = 0</li>
<li>ใน session ใช้ Type 0x8864 และ payload = Protocol + Information ของ PPP</li>
<li>PPPoE overhead (ตามมาตรฐาน RFC 2516, ไม่ได้ระบุในหนังสือ): PPPoE header 6 byte + Protocol 2 byte ทำให้ MTU ฝั่ง PPP เหลือ 1492</li>
</ul></div>`
    },
    {
      t: "14.3.4 Configure PPPoE Server (Huawei) และ Windows Dial-up",
      ref: "หน้า 477-481",
      html: `
<p>สถานการณ์: PC1, PC2 ในองค์กรต่อ switch LSW1 ไปยัง router AR1 และออก Internet ต้องยืนยันตัวตนก่อน จึงตั้ง AR1 เป็น <b>PPPoE Server</b> และให้ PC เป็น <b>PPPoE client</b> ที่ dial-up</p>
<figure><img src="i/p476_2.webp" alt="PC1 PC2 ต่อ LSW1 ไป AR1 ซึ่งเป็น PPPoE server" loading="lazy"><figcaption>Fig. 14.24 PPPoE experimental network topology (AR1 เป็น PPPoE server, PC1 และ PC2 เป็น client)</figcaption></figure>
<pre><code>--1) สร้าง account สำหรับ dial-up
[AR1]aaa
[AR1-aaa]local-user hanligang password cipher huawei@123
[AR1-aaa]local-user lishengchun password cipher Huawei123
[AR1-aaa]local-user hanligang service-type ppp
[AR1-aaa]local-user lishengchun service-type ppp
[AR1-aaa]quit

--2) address pool สำหรับ client ที่ dial สำเร็จ
[AR1]ip pool PPPoE1
[AR1-ip-pool-PPPoE1]network 192.168.10.0 mask 24
[AR1-ip-pool-PPPoE1]quit

--3) Virtual-Template (ผูกกับหลาย physical interface ได้)
[AR1]interface Virtual-Template 1
[AR1-Virtual-Template1]remote address pool PPPoE1
[AR1-Virtual-Template1]ip address 192.168.10.100 24
[AR1-Virtual-Template1]ppp ipcp dns 8.8.8.8 114.114.114.114
[AR1-Virtual-Template1]quit

--4) ผูก template กับ interface Ethernet (ไม่ต้องมี IP)
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]undo ip address
[AR1-GigabitEthernet0/0/0]pppoe-server bind virtual-template 1</code></pre>
<ul>
<li><b>Virtual-Template</b> คือแม่แบบ interface เสมือน (หมายเลข 0-1023) ผูกกับหลาย physical interface ได้เมื่อมีหลาย Ethernet segment ที่ต้อง dial-up และแจก address pool เดียวกัน</li>
<li><code>remote address pool</code> = pool ที่แจกให้ client; <code>ppp ipcp dns</code> = DNS หลัก/รอง ที่ส่งให้ client ผ่าน IPCP</li>
</ul>
<figure><img src="i/p478_1.webp" alt="router AR1 มี Ethernet interface สองพอร์ตที่ผูกกับ virtual template เดียวกัน" loading="lazy"><figcaption>Fig. 14.25 Topology for binding a virtual interface template to a physical interface (template เดียวผูกหลายพอร์ต)</figcaption></figure>
<h4>Windows เป็น PPPoE client</h4>
<ol>
<li>Network and Sharing Center, Set up a new connection or network</li>
<li>Connect to the Internet, Broadband (PPPoE)</li>
<li>ใส่ username, password, ชื่อ connection แล้ว Connect</li>
<li><code>ipconfig /all</code> ดู address และ DNS ที่ได้ใน adapter "PPP adaptor"</li>
</ol>
<figure><img src="i/p479_1.webp" alt="หน้าจอ Windows ใส่ username และ password สำหรับ PPPoE dial-up" loading="lazy"><figcaption>Fig. 14.26 Enter the PPPoE dial-up user name and password (Windows Broadband PPPoE)</figcaption></figure>
<p>ผลที่ได้: IPv4 address เช่น 192.168.10.254, <b>subnet mask 255.255.255.255</b>, default gateway 0.0.0.0, DNS 8.8.8.8 และ 114.114.114.114 (mask /32 เพราะเป็น link แบบ point-to-point)</p>
<h4>ตรวจสอบบน server</h4>
<pre><code>&lt;AR1&gt;display pppoe-server session all
SID Intf                State OIntf    RemMAC          LocMAC
1   Virtual-Template1:0 UP    GE0/0/0  000c.2920.c578  00e0.fc4d.3146</code></pre>
<p>เห็น client ที่ dial เข้ามา, interface ออกจริง (OIntf) และ <b>RemMAC</b> (MAC ของ client) ส่วน capture ของ packet ที่ client ส่งไป ping 24.12.8.1 จะเห็น Ethernet Type 0x8864, PPPoE header และ Session-ID <b>0x0001</b></p>
<figure><img src="i/p480_1.webp" alt="Wireshark แสดง PPPoE session ID 0x0001 ใน Ethernet type 0x8864" loading="lazy"><figcaption>Fig. 14.27 View the frame format of PPPoE packet (Ethernet Type 0x8864, Session-ID 0x0001)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>ขั้น config server: aaa user (service-type ppp), ip pool, Virtual-Template (remote address pool, ip address, ppp ipcp dns), <code>pppoe-server bind virtual-template N</code> ที่ interface</li>
<li>ตรวจ: <code>display pppoe-server session all</code></li>
<li>Client ได้ mask /32 และ gateway 0.0.0.0</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `ที่ router มี Serial interface ที่ต่อกับ router อีกตัวโดยตรงด้วย link point-to-point แบบ full-duplex ผู้ดูแลต้องการ protocol ที่ authenticate ฝั่งตรงข้ามได้และกำหนด IP ให้ฝั่งตรงข้ามได้`,
      q: "ควรใช้ data link protocol ใด?",
      opts: [
        { t: "PPP", why: "ถูก: PPP มี authentication (PAP/CHAP) และ IPCP ที่ negotiate/กำหนด IP ได้" },
        { t: "Ethernet (CSMA/CD)", why: "ผิด: CSMA/CD ใช้บน Ethernet ไม่รองรับ authentication ของอุปกรณ์ที่เข้าถึง" },
        { t: "HDLC", why: "ผิด: HDLC ไม่มี authentication และไม่มีฟิลด์ Protocol จึงไม่ได้ negotiate network layer แบบ PPP" },
        { t: "ARP", why: "ผิด: ARP เป็น protocol หา MAC ไม่ใช่ WAN data link protocol" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `PPP frame ที่ส่ง IP packet ขนาด 1500 byte (เท่ากับ MRU) ผ่าน link หนึ่ง นักศึกษาต้องการรู้ขนาดรวมของ frame โดยนับตามรูปแบบในบท (Flag 1, Address 1, Control 1, Protocol 2, Information, FCS 2, Flag 1)`,
      q: "ขนาด PPP frame รวมกี่ byte?",
      opts: [
        { t: "1508 byte", why: "ถูก: overhead 5 (header) + 3 (footer) = 8 byte; 1500 + 8 = 1508" },
        { t: "1505 byte", why: "ผิด: นับเฉพาะ header 5 byte ลืม footer 3 byte (FCS 2 + Flag 1)" },
        { t: "1504 byte", why: "ผิด: นับ header 4 byte และ footer ไม่ครบ" },
        { t: "1500 byte", why: "ผิด: 1500 คือขนาด Information อย่างเดียว ยังไม่รวม overhead" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรกรอง packet ที่ capture บน serial link ด้วย Protocol field = 0xC223`,
      q: "packet ที่เห็นคืออะไร?",
      opts: [
        { t: "ข้อความ CHAP authentication", why: "ถูก: 0xC223 = CHAP (0xC023 = PAP, 0xC021 = LCP)" },
        { t: "ข้อความ PAP authentication", why: "ผิด: PAP คือ 0xC023" },
        { t: "ข้อความ LCP", why: "ผิด: LCP คือ 0xC021" },
        { t: "IP packet", why: "ผิด: IP data มี Protocol field เป็นค่าอื่นของ network protocol ไม่ใช่ 0xC223" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ระหว่างเจรจา LCP RA ส่ง Configure-Request ด้วย MRU = 2000 แต่ RB รองรับได้สูงสุด 1500`,
      q: "RB ควรตอบอย่างไรและขั้นต่อไปเป็นอย่างไร?",
      opts: [
        { t: "ตอบ Configure-Nak พร้อม MRU = 1500 แล้ว RA ส่ง Configure-Request ใหม่ด้วย MRU = 1500", why: "ถูก: Nak แจ้งค่าที่รับได้ ให้อีกฝั่งส่ง request ใหม่ และเมื่อรับได้ทั้งหมดจึงตอบ Ack" },
        { t: "ตอบ Configure-Ack เพื่อยอมรับ MRU = 2000 ทันที", why: "ผิด: Ack ใช้เมื่อรับ parameter ได้ทุกตัว" },
        { t: "ตอบ Authenticate-Nak", why: "ผิด: Authenticate-Nak เป็นของ PAP ใน authentication phase ไม่ใช่ LCP" },
        { t: "ไม่ตอบอะไร แล้ว RA จะหยุดส่งทันที", why: "ผิด: ถ้าไม่ตอบ RA จะส่งซ้ำทุก 3 วินาที สูงสุด 10 ครั้ง ไม่ใช่หยุดทันที" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `RA ส่ง Configure-Request ไป RB แต่ RB ไม่ตอบเลย (สาย physical ปกติ แต่ RB ปิด interface) RA ส่งซ้ำทุก 3 วินาที`,
      q: "การส่ง Configure-Request ครั้งที่ 10 (ครั้งสุดท้ายก่อนถือว่า RB ใช้ไม่ได้) เกิดหลังการส่งครั้งแรกกี่วินาที?",
      opts: [
        { t: "27 วินาที", why: "ถูก: ครั้งแรกที่ t=0 แล้วส่งซ้ำอีก 9 ครั้ง ห่างกันครั้งละ 3 วินาที ครั้งที่ 10 จึงเกิดที่ 9 x 3 = 27 วินาที" },
        { t: "10 วินาที", why: "ผิด: 10 คือจำนวนครั้ง ไม่ใช่วินาที" },
        { t: "3 วินาที", why: "ผิด: 3 วินาทีคือรอบการส่งซ้ำแต่ละครั้ง" },
        { t: "300 วินาที", why: "ผิด: ไม่ตรงกับ 3 s x 10 ครั้ง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR2 ถูกตั้งเป็น authenticator แบบ PAP แต่ user บน AR1 (authenticatee) ใช้รหัสผ่านผิด`,
      q: "AR2 จะตอบอย่างไร และผลต่อ link เป็นอะไร?",
      opts: [
        { t: "Authenticate-Nak และ link เข้า Link Termination (LCP Down)", why: "ถูก: authentication ล้มเหลวทำให้ลิงก์ถูกปิด ไม่ไปถึง network layer phase" },
        { t: "Authenticate-Ack แล้วไป IPCP ต่อ", why: "ผิด: Ack ใช้เมื่อสำเร็จ" },
        { t: "Configure-Nak และเจรจา LCP ใหม่ตลอด", why: "ผิด: Configure-Nak เป็นของ LCP/IPCP ไม่ใช่ PAP" },
        { t: "ไม่ตอบ และ link ยังใช้งานได้ปกติ", why: "ผิด: เมื่อ authenticate ไม่ผ่านจะไม่เข้าสู่ network phase" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการให้ AR1 (Serial 2/0/0) ตรวจสอบ AR2 ด้วย CHAP โดยมี user ชื่อ Cuser รหัสผ่าน Pass@123 ใน local database ของ AR1 และ AR2 ใช้ Serial 2/0/1`,
      q: "ชุดคำสั่งที่ถูกต้องคืออะไร?",
      opts: [
        { t: "AR1: aaa local-user Cuser password cipher Pass@123 + service-type ppp และ ppp authentication-mode chap บน Serial 2/0/0; AR2: ppp chap user Cuser และ ppp chap password cipher Pass@123 บน Serial 2/0/1", why: "ถูก: authenticator ตั้ง user และโหมด; authenticatee ระบุ username/password ที่จะแสดง" },
        { t: "AR1: ppp chap user Cuser บน Serial 2/0/0; AR2: ppp authentication-mode chap", why: "ผิด: สลับบทบาท authenticator และ authenticatee" },
        { t: "AR1 และ AR2: ppp authentication-mode pap เท่านั้น", why: "ผิด: โจทย์ใช้ CHAP และ PAP ต้องมี ppp pap local-user ฝั่ง authenticatee" },
        { t: "ตั้ง local-user บน AR2 เท่านั้น", why: "ผิด: database ที่ใช้ตรวจอยู่ฝั่ง authenticator (AR1)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลตั้งค่า authenticator ครบ (aaa user + ppp authentication-mode pap) แต่ลืมสั่ง service-type ppp ให้ user และ link ยังไม่ผ่าน authentication`,
      q: "สาเหตุที่เป็นไปได้ที่สุดคืออะไร?",
      opts: [
        { t: "user ไม่ได้ถูกกำหนด service-type ppp จึงใช้สำหรับ PPP authentication ไม่ได้", why: "ถูก: ต้อง local-user U service-type ppp" },
        { t: "MRU ของสองฝั่งไม่เท่ากัน", why: "ผิด: LCP ปรับด้วย Nak ได้ และไม่เกี่ยวกับ user" },
        { t: "ต้องใช้ link-protocol hdlc", why: "ผิด: PPP เท่านั้นที่ authenticate ด้วย PAP/CHAP" },
        { t: "IP address ซ้ำกัน", why: "ผิด: ปัญหานี้เกิดใน IPCP หลัง authentication ผ่านแล้ว" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ตรวจ display interface Serial 2/0/0 พบ <i>current state : UP</i> แต่ <i>Line protocol current state : DOWN</i> และ LCP reqsent`,
      q: "ข้อสรุปใดสมเหตุสมผลที่สุด?",
      opts: [
        { t: "Physical ปกติ แต่ PPP ยังเจรจาไม่สำเร็จ (เช่น parameter, authentication หรือ protocol ไม่ตรงกับอีกฝั่ง)", why: "ถูก: Physical UP แต่ data link DOWN แปลว่าโปรโตคอลที่สองฝั่งยังไม่สอดคล้องหรือ LCP ยังไม่ Open" },
        { t: "สายขาด", why: "ผิด: ถ้าสายขาด physical state จะเป็น DOWN" },
        { t: "เสียที่ IP address เท่านั้น", why: "ผิด: IP ไม่ได้ทำให้ Line protocol DOWN ที่ระดับ LCP" },
        { t: "ทุกอย่างปกติ", why: "ผิด: ต้อง UP ทั้งสองระดับ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ในการเจรจา IPCP แบบ dynamic client RA ส่ง Configure-Request ด้วย IP 0.0.0.0 ไปยัง RB ซึ่งต้องการให้ RA ใช้ 10.1.1.1`,
      q: "RB ควรตอบข้อความใดและขั้นต่อไปคืออะไร?",
      opts: [
        { t: "Configure-Nak พร้อม 10.1.1.1 แล้ว RA ส่ง Configure-Request ด้วย 10.1.1.1 และได้ Configure-Ack", why: "ถูก: 0.0.0.0 ถือว่าไม่ถูกต้อง RB จึง Nak พร้อมค่าที่ให้ใช้" },
        { t: "Configure-Ack ทันที", why: "ผิด: 0.0.0.0 ไม่ใช่ IP ที่ใช้งานได้" },
        { t: "Authenticate-Ack", why: "ผิด: เป็นข้อความของ PAP" },
        { t: "Challenge", why: "ผิด: Challenge เป็นของ CHAP" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Host ต้องหา PPPoE server ในเครือข่าย Ethernet แต่ยังไม่รู้ MAC ของ AC ใด ๆ`,
      q: "ข้อความแรกที่ Host ส่งคืออะไรและส่งแบบใด?",
      opts: [
        { t: "PADI แบบ broadcast (Code 0x09, Session-ID 0)", why: "ถูก: Host ต้อง broadcast เพื่อหา AC" },
        { t: "PADO แบบ unicast", why: "ผิด: PADO เป็นข้อความตอบของ AC" },
        { t: "PADR แบบ broadcast", why: "ผิด: PADR เป็น unicast ไปหา AC ที่เลือกแล้ว" },
        { t: "PADS แบบ unicast", why: "ผิด: PADS เป็นข้อความของ AC ตอนยืนยัน session" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ตรวจ capture พบ Ethernet frame ที่ Type = 0x8864 มี PPPoE Code = 0x00 และ Session-ID = 0x0001`,
      q: "frame นี้อยู่ในขั้นใดของ PPPoE และ payload คืออะไร?",
      opts: [
        { t: "PPP Session phase; payload คือ Protocol และ Information ของ PPP", why: "ถูก: 0x8864 = session, Code 0x00 = ข้อมูลใน session และ Session-ID ได้จาก PADS" },
        { t: "Discovery phase; payload คือ PADI", why: "ผิด: Discovery ใช้ Type 0x8863" },
        { t: "Discovery phase; payload คือ LCP เท่านั้น", why: "ผิด: LCP ส่งใน session phase เท่านั้น และ Type ของ Discovery เป็น 0x8863" },
        { t: "ไม่ใช่ PPPoE เลย", why: "ผิด: 0x8863 และ 0x8864 คือ PPPoE" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Windows client ที่ dial PPPoE สำเร็จ แล้วผู้ดูแลเปิด ipconfig /all เห็น IPv4 192.168.10.254 และ subnet mask`,
      q: "subnet mask และ default gateway ที่คาดว่าจะเห็นคืออะไร?",
      opts: [
        { t: "255.255.255.255 และ 0.0.0.0", why: "ถูก: หนังสือแสดง PPP adapter ได้ mask /32 และ gateway 0.0.0.0 เพราะเป็น point-to-point" },
        { t: "255.255.255.0 และ 192.168.10.100", why: "ผิด: แม้ pool เป็น /24 แต่ที่ client เห็นคือ /32 และ gateway 0.0.0.0" },
        { t: "255.255.0.0 และ 192.168.0.1", why: "ผิด: ไม่เกี่ยวกับ pool นี้" },
        { t: "ไม่มี address เลย", why: "ผิด: PPPoE dial สำเร็จแล้วได้ address" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR1 มี GE0/0/0 และ GE0/0/1 ต่อ Ethernet สองวง ผู้ใช้ทั้งสองวงต้อง dial PPPoE ได้ และให้ IP จาก pool 192.168.10.0/24 เดียวกัน ผู้ดูแลจะลดงาน config`,
      q: "วิธีใดเหมาะสมที่สุด?",
      opts: [
        { t: "สร้าง Virtual-Template 1 หนึ่งตัว แล้วสั่ง pppoe-server bind virtual-template 1 บนทั้งสอง interface (ไม่ต้องมี IP บน interface)", why: "ถูก: template เดียวผูกกับหลาย physical interface ได้" },
        { t: "สร้าง template สองตัวที่ใช้ pool คนละชุดเสมอ", why: "ผิด: ไม่จำเป็น และโจทย์ต้องการ pool เดียวกัน" },
        { t: "ใส่ IP 192.168.10.100 บนทั้งสอง physical interface", why: "ผิด: interface ที่ bind PPPoE ไม่ต้องมี IP (ใช้ undo ip address)" },
        { t: "ใช้ PAP ที่ Serial interface", why: "ผิด: ใช้ Ethernet ไม่ใช่ Serial และเป็น PPPoE" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `สรุปคุณสมบัติ PAP เทียบ CHAP`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "PAP ส่ง password เป็น plain text", ok: true, why: "ถูก" },
        { t: "CHAP ใช้ MD5 คำนวณจาก ID + random + password", ok: true, why: "ถูก" },
        { t: "CHAP เป็น 3-way handshake", ok: true, why: "ถูก: Challenge, Response, Success/Failure" },
        { t: "PAP เป็น 3-way handshake และเข้ารหัส password", ok: false, why: "ผิด: PAP เป็น 2-way และไม่เข้ารหัส" },
        { t: "CHAP ส่ง password จริงในข้อความ Response", ok: false, why: "ผิด: ส่งเฉพาะ username และ digest" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องการตั้ง PAP ระหว่าง AR1 (authenticator) กับ AR2 (authenticatee)`,
      q: "เลือกทุกขั้นตอนที่จำเป็น",
      opts: [
        { t: "ตั้ง encapsulation ของ interface ที่ต่อกันเป็น PPP (link-protocol ppp)", ok: true, why: "ถูก: ต้องใช้ PPP" },
        { t: "สร้าง user/password ของ authenticatee ใน local database ของ authenticator", ok: true, why: "ถูก (aaa local-user ... service-type ppp)" },
        { t: "ตั้ง ppp authentication-mode pap บน authenticator", ok: true, why: "ถูก" },
        { t: "ตั้ง username/password ให้ authenticatee ส่งให้ authenticator", ok: true, why: "ถูก (ppp pap local-user ... password cipher ...)" },
        { t: "ตั้ง ppp authentication-mode chap", ok: false, why: "ผิด: เป็นโหมดของ CHAP ไม่ใช่ PAP" }
      ]
    },
    {
      type: "multi",
      story: `ตรวจเนื้อหาของ PPPoE discovery`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "PADI เป็น broadcast และ Session-ID = 0", ok: true, why: "ถูก" },
        { t: "PADO เป็น unicast และ AC จะไม่ตอบถ้าให้บริการที่ขอไม่ได้", ok: true, why: "ถูก" },
        { t: "PADS มี Session-ID ที่ AC กำหนดให้", ok: true, why: "ถูก" },
        { t: "Host มักเลือก AC ที่ส่ง PADO มาถึงก่อน", ok: true, why: "ถูก" },
        { t: "PADR เป็น broadcast", ok: false, why: "ผิด: PADR เป็น unicast ถึง AC ที่เลือก" }
      ]
    },
    {
      type: "blank",
      story: `จำ Code ของ message ใน PPPoE`,
      text: `PADI Code = {1}, PADO Code = {2}, PADR Code = {3}, PADS Code = {4}`,
      blanks: [
        { opts: ["0x09", "0x07", "0x19", "0x65"], ans: 0, why: "PADI = 0x09" },
        { opts: ["0x09", "0x07", "0x19", "0x65"], ans: 1, why: "PADO = 0x07" },
        { opts: ["0x09", "0x07", "0x19", "0x65"], ans: 2, why: "PADR = 0x19" },
        { opts: ["0x09", "0x07", "0x19", "0x65"], ans: 3, why: "PADS = 0x65" }
      ]
    },
    {
      type: "blank",
      story: `จำ 5 phase ของ PPP ตามลำดับ`,
      text: `Link Dead → {1} → Authentication → {2} → {3}; ถ้า authentication ล้มเหลวจะข้ามไปเข้าขั้นสุดท้ายนี้ทันที`,
      blanks: [
        { opts: ["Link Establishment", "Network Layer Protocol", "Link Termination", "NCP"], ans: 0, why: "หลังจาก Dead (physical พร้อม) คือ Link Establishment ใช้ LCP" },
        { opts: ["Link Establishment", "Network Layer Protocol", "Link Termination", "NCP"], ans: 1, why: "หลัง authentication ผ่านคือ Network Layer Protocol (NCP/IPCP)" },
        { opts: ["Link Establishment", "Network Layer Protocol", "Link Termination", "NCP"], ans: 2, why: "สุดท้าย release resource ที่ Link Termination" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ข้อความกับ protocol/phase ที่ใช้",
      pairs: [
        ["Configure-Request/Ack/Nak", "LCP (และ IPCP) เจรจา parameter"],
        ["Authenticate-Request (username/password)", "PAP แบบ plain text"],
        ["Challenge / Response / Success", "CHAP 3-way handshake"],
        ["PADI / PADO / PADR / PADS", "PPPoE Discovery phase"],
        ["Ethernet Type 0x8864", "PPPoE PPP Session phase"]
      ],
      why: "แต่ละข้อความเป็นของ protocol เฉพาะตามที่อธิบายในบท"
    }
  ]
});
