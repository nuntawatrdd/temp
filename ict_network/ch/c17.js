IOT.reg({
  id: "c17",
  title: "SDN and NFV",
  th: "ข้อจำกัดของ traditional network, แนวคิด SDN, OpenFlow และ flow table, สถาปัตยกรรม SDN 3 ชั้น, NFV (NFVI, VNF, MANO) และโซลูชันของ Huawei",
  summary: `
<ul>
<li><b>Traditional network</b> = distributed, peer-to-peer control: ทุกอุปกรณ์มี <b>management plane, control plane, forwarding plane</b> ของตนเอง; control plane คุย routing protocol กับเพื่อนบ้านแล้วสร้าง forwarding plane เอง</li>
<li>ข้อดี: decoupling อุปกรณ์กับ protocol, เข้ากันได้ข้ามผู้ผลิต, protocol ช่วย convergence เมื่อล่ม; ข้อเสีย: แต่ละเครื่องคำนวณเส้นทางเอง ขาดมุมมองรวม</li>
<li><b>4 ปัญหา</b>: (1) congestion ง่าย (คำนวณเส้นทางจาก bandwidth คงที่) (2) เทคโนโลยีซับซ้อน (RFC ~2500 ฉบับ, คำสั่งกว่า 10,000 บรรทัด) (3) หา/วินิจฉัย fault ยาก (เฉลี่ย 76 นาที, เกิน 85% รู้เมื่อมีคนร้องเรียน) (4) deploy service ช้า</li>
<li><b>SDN</b> เสนอโดย Clean Slate Research Group, Stanford ปี 2006; 3 features: <b>แยก control กับ forwarding, centralized control, open programming interface</b>; แก่นคือ network programmability ไม่ใช่แค่ OpenFlow</li>
<li><b>OpenFlow</b> = southbound protocol ระหว่าง controller กับ switch ส่งต่อด้วย <b>flow table</b>; ตาราง Table0-Table255 match เริ่มจาก Table0; ใน table เดียวกันตาม priority สูงก่อน</li>
<li><b>3 ชนิดข้อความ</b>: Controller-to-switch (Features, Configuration, Modify-State, Read-State, Send-Packet), Asynchronous (Packet-in, Packet-out, Flow-Removed, Port-status), Symmetric (Hello, Echo, Error)</li>
<li><b>Flow entry</b>: Match fields, Priority, Counters, Instructions, Timeout (idle / hard), Cookie, Flags; ที่สำคัญที่สุดคือ <b>match fields + instructions</b>; OpenFlow 1.5.1 รองรับ 45 match fields</li>
<li><b>SDN 3 ชั้น</b>: Collaborative application layer (OSS, OpenStack), Controller layer (service orchestration), Device layer (forwarding); <b>NBI</b> (northbound, RESTful, JSON/XML) และ <b>SBI</b> (southbound: NETCONF, SNMP, OpenFlow, OVSDB)</li>
<li><b>NFV</b>: เอา network function ไปรันเป็น software บน VM ในฮาร์ดแวร์ทั่วไป; เกิดจาก carrier 13 ราย (ต.ค. 2012) แล้ว ETSI NFV ISG; OPNFV เปิดตัว 2015</li>
<li><b>คุณค่า NFV 4 ข้อ</b>: ลดเวลา launch service, ลดต้นทุนสร้างเครือข่าย, เพิ่มประสิทธิภาพ O&amp;M, สร้าง open ecosystem</li>
<li><b>เทคโนโลยีหลัก</b>: virtualization (partitioning, isolation, encapsulation, hardware-independent) และ cloudization (on-demand self-service, extensive network access, resource pooling, rapid elasticity, measured service)</li>
<li><b>สถาปัตยกรรม NFV</b>: OSS/BSS, <b>VNF</b>, <b>NFVI</b> (COTS + CloudOS), <b>MANO</b> = NFVO + VNFM + VIM</li>
<li><b>Huawei</b>: Huawei CloudStack (FusionCompute, FusionStorage, FusionNetwork) = NFVI; VNF: CloudBB, Cloud DSL/OLT, CloudEdge, CloudCore, 5G Core; FusionSphere OpenStack + OM</li>
</ul>
<table>
<tr><th>เรื่อง</th><th>Traditional</th><th>SDN</th></tr>
<tr><td>Control plane</td><td>กระจายในทุกอุปกรณ์</td><td>รวมศูนย์ที่ controller</td></tr>
<tr><td>Device</td><td>มีครบ 3 plane</td><td>ส่วนใหญ่เหลือ forwarding plane</td></tr>
<tr><td>การเปลี่ยน policy</td><td>CLI ทีละอุปกรณ์</td><td>โปรแกรมผ่าน NBI</td></tr>
<tr><td>มุมมองเครือข่าย</td><td>เฉพาะ local</td><td>global</td></tr>
</table>`,
  sections: [
    {
      t: "17.1.1 Traditional Network และ Distributed Control",
      ref: "หน้า 532-534",
      html: `
<p>Traditional network (classical IP network) เป็นเครือข่ายแบบ <b>distributed, peer-to-peer control</b> อุปกรณ์แต่ละตัวมี 3 plane แยกกัน: control plane ของอุปกรณ์แลกเปลี่ยน routing protocol กับเพื่อนบ้านแล้ว <b>สร้าง forwarding plane ด้วยตนเอง</b> เพื่อนำทางการส่งแพ็กเก็ต</p>
<figure><img src="i/p533_1.webp" alt="อุปกรณ์แต่ละตัวมี management, control, forwarding plane" loading="lazy"><figcaption>Fig. 17.1 Distributed control architecture of traditional network: แต่ละ router มี plane ครบทั้ง 3</figcaption></figure>
<table>
<tr><th>Plane</th><th>หน้าที่</th><th>ตัวอย่าง (switch)</th></tr>
<tr><td><b>Management plane</b></td><td>device management system (topology, interface, ส่ง config script) และ service management system (service performance, alarm)</td><td>monitor สถานะ/สิ่งแวดล้อม, log/alarm, system load/upgrade; จัดการผ่าน Telnet, SSH, SNMP; ตั้งค่า parameter ล่วงหน้าให้ control plane</td></tr>
<tr><td><b>Control plane</b></td><td>protocol processing และ computation เช่น routing protocol คำนวณ routing table</td><td>protocol/service processing, routing, forwarding control, scheduling, traffic statistics, security</td></tr>
<tr><td><b>Forwarding plane</b></td><td>ส่งและประมวลผลข้อมูลผู้ใช้ตามคำสั่งจาก control plane</td><td>ช่องทางความเร็วสูง ทำ L2/L3/ACL/QoS/multicast/security protection</td></tr>
</table>
<p><b>Distributed control</b> หมายถึง control plane (คำนวณ protocol) และ forwarding plane (ส่งแพ็กเก็ต) อยู่ในอุปกรณ์เดียวกัน เมื่อ topology เปลี่ยน ทุกเครื่องต้องคำนวณเส้นทางใหม่เอง แต่ละเครื่องรวบรวมข้อมูลและคำนวณเองโดยสนใจเฉพาะเส้นทางของตน</p>
<ul>
<li><b>ข้อดี</b>: อุปกรณ์แยกออกจาก protocol (decoupling), เข้ากันได้ดีข้ามผู้ผลิต, protocol รับประกัน convergence เมื่อเกิด failure</li>
<li><b>ข้อเสีย</b>: การคำนวณเส้นทางของอุปกรณ์ทุกตัว <b>ไม่เป็นเอกภาพ</b> ไม่มีมุมมอง global</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>3 plane: management, control, forwarding</li>
<li>Traditional = control plane + forwarding plane อยู่ในอุปกรณ์เดียวกัน (distributed control)</li>
</ul></div>`
    },
    {
      t: "17.1.2 ปัญหาของ Traditional Network",
      ref: "หน้า 534-535",
      html: `
<h4>1) เกิด congestion ง่าย</h4>
<p>การหาเส้นทางโดยอิง bandwidth คงที่ทำให้เกิด congestion เช่น router C ส่งไป D ผ่าน link C-D ซึ่งสั้นที่สุด เมื่อ traffic เกิน bandwidth แล้วเริ่ม packet loss อัลกอริทึมก็ยังเลือกเส้นทางสั้นที่สุดอยู่ทั้งที่มี link อื่นว่าง ถ้ามองระดับ global เส้นทางที่เหมาะสมคือ <b>C-A-D</b> ทางแก้คือคำนวณเส้นทางจาก <b>real-time bandwidth</b></p>
<figure><img src="i/p534_1.webp" alt="link C-D ใช้ 6G จาก 5G แต่เส้นทาง C-A-D ว่าง" loading="lazy"><figcaption>Fig. 17.2 Network congestion: C-D ใช้ 6G/5G (เกินความจุ) ขณะที่ C-A ใช้เพียง 1G/5G; เส้นทาง C-A-D เหมาะกว่า</figcaption></figure>
<h4>2) เทคโนโลยีซับซ้อนเกินไป</h4>
<p>ต้องอ่าน RFC ที่เกี่ยวกับอุปกรณ์เครือข่ายราว <b>2500 ฉบับ</b> ถ้าอ่านวันละ 1 ฉบับใช้เวลา 6 ปี และเป็นเพียง 1/3 ของ RFC ทั้งหมด ยังมีคำสั่ง configure ของผู้ผลิตรายเดียวกว่า <b>10,000 บรรทัด</b> และเพิ่มขึ้นเรื่อย ๆ</p>
<h4>3) หา fault และวินิจฉัยยาก</h4>
<ul>
<li>O&amp;M แบบเดิมพึ่งการระบุ/ตรวจจับ/วินิจฉัยด้วยมือ สถิติ Data Center: ใช้เฉลี่ย <b>76 นาที</b> เพื่อหาตำแหน่ง fault และ <b>เกิน 85%</b> ของ fault ถูกพบหลังมีคนร้องเรียน</li>
<li>มอนิเตอร์แค่ตัวชี้วัดของอุปกรณ์ ไม่มี correlation analysis ระหว่างผู้ใช้กับเครือข่าย บางครั้งตัวชี้วัดปกติแต่ผู้ใช้ประสบการณ์แย่</li>
</ul>
<h4>4) Deploy service ช้า</h4>
<figure><img src="i/p535_1.webp" alt="ชั้น network strategy, service network, physical network ที่ต้องตั้งค่าทีละอุปกรณ์" loading="lazy"><figcaption>Fig. 17.3 Traditional network service deployment: แก้ policy ซับซ้อน, deploy service ใหม่ใช้เวลานาน, physical network ตั้งค่าทีละอุปกรณ์ด้วย CLI</figcaption></figure>
<p>เป้าหมายที่ต้องการ: network policy ทำให้ service ย้ายได้อิสระโดยไม่ผูกกับตำแหน่งจริง service ใหม่ deploy เร็ว และ physical network รองรับ <b>zero-configuration / plug-and-play</b></p>
<div class="must"><b>ต้องจำ</b><ul>
<li>4 ปัญหา: congestion, ซับซ้อน, fault ยาก (76 นาที / 85%), deploy ช้า</li>
<li>แนวทางแก้ congestion = คำนวณเส้นทางจาก real-time bandwidth ในมุมมอง global</li>
</ul></div>`
    },
    {
      t: "17.2.1 แนวคิด SDN",
      ref: "หน้า 535-536",
      html: `
<p><b>SDN (Software Defined Network)</b> เป็นสถาปัตยกรรมเครือข่ายใหม่ที่ Clean Slate Research Group ของ Stanford University เสนอเมื่อปี <b>2006</b> มี 3 features:</p>
<ol>
<li><b>แยก forwarding ออกจาก control</b> (separation of transfer and control)</li>
<li><b>Centralized control</b></li>
<li><b>Open programming interface</b></li>
</ol>
<figure><img src="i/p536_1.webp" alt="SDN application, OpenFlow controller, OpenFlow switches" loading="lazy"><figcaption>Fig. 17.4 SDN architecture: control plane ถูกย้ายไป OpenFlow controller; OpenFlow switch เหลือเฉพาะ forwarding plane เชื่อมกันด้วย OpenFlow</figcaption></figure>
<ul>
<li>แก่นคือแยก control plane ออกจาก forwarding plane แล้ว <b>รวมศูนย์ control plane</b> เพื่อรองรับนวัตกรรมของแอปพลิเคชันเครือข่าย</li>
<li>เปรียบเทียบ: ถ้าเครือข่ายปัจจุบันคือโทรศัพท์มือถือเครื่องหนึ่ง SDN คือการสร้าง "Android" ให้โลกของเครือข่าย ปรับแก้ได้เหมือนติดตั้งหรืออัปเกรด software</li>
<li>แก่นแท้ของ SDN คือทำให้เครือข่ายเหมือน software และเพิ่ม <b>programmability</b> SDN คือการ <b>reconfigure สถาปัตยกรรม</b> ไม่ใช่ feature ใหม่</li>
</ul>
<div class="warn"><b>ระวัง</b> อย่าเท่ากับ SDN = OpenFlow หรือ SDN = การแยก control/forwarding การแยก control กับ forwarding และการแยก management กับ control เป็นเพียง <b>วิธีการ</b> ส่วน OpenFlow เป็นเพียง <b>protocol หนึ่ง</b> ที่ตอบโจทย์ SDN</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>SDN: Stanford 2006; 3 features: แยก control/forwarding, centralized control, open programmable interface</li>
</ul></div>`
    },
    {
      t: "17.2.2 OpenFlow Protocol และ Message ทั้ง 3 ชนิด",
      ref: "หน้า 536-538",
      html: `
<p>SDN ใช้ <b>OpenFlow</b> ซึ่งส่งต่อทราฟฟิกด้วย <b>flow table</b> โดยปกติ flow table ถูกคำนวณโดย OpenFlow controller แล้วส่งลง switch ซึ่งค้นตารางเพื่อ forward flow table มีความยาวไม่คงที่ และมี matching rule กับ forwarding rule หลากหลาย อุปกรณ์หนึ่งมีหลาย flow table</p>
<figure><img src="i/p537_1.webp" alt="Table0 ถึง TableN และโครงสร้าง flow table entry" loading="lazy"><figcaption>Fig. 17.5 Flow tables in a network device: pipeline Table0, Table1, ... TableN และฟิลด์ของ flow entry</figcaption></figure>
<ul>
<li>มี Table0 ถึง <b>Table255</b>; การ match <b>เริ่มจาก Table0</b></li>
<li>ใน table เดียวกัน entry ที่ <b>priority สูงกว่า</b> ถูก match ก่อน</li>
<li>OpenFlow เป็น <b>southbound interface protocol</b> ระหว่าง controller กับ switch</li>
</ul>
<h4>ข้อความของ OpenFlow 3 ชนิด</h4>
<table>
<tr><th>ชนิด</th><th>ผู้เริ่ม</th><th>Subtype และหน้าที่</th></tr>
<tr><td><b>Controller-to-switch</b></td><td>Controller</td><td>
<b>Features</b>: หลังตั้ง SSL/TCP session controller ขอข้อมูล switch (ชื่อ/MAC/ความเร็วของ interface), switch ต้องตอบ<br>
<b>Configuration</b>: ตั้ง/ดูสถานะ switch<br>
<b>Modify-State</b>: เพิ่ม ลบ แก้ flow table และตั้ง property ของ interface<br>
<b>Read-State</b>: เก็บสถิติจาก switch<br>
<b>Send-Packet</b>: ส่งแพ็กเก็ตออก interface ที่ระบุ</td></tr>
<tr><td><b>Asynchronous</b></td><td>Switch</td><td>
<b>Packet-in</b>: ส่งไป controller เมื่อไม่มี entry ตรงกัน (table-miss) หรือ match action "send to Controller"<br>
<b>Packet-out</b>: ข้อความตอบจาก controller<br>
<b>Flow-Removed</b>: entry หมดอายุ (timeout) หรือถูกลบ<br>
<b>Port-status</b>: interface ถูกเพิ่ม ลบ แก้ไข</td></tr>
<tr><td><b>Symmetric</b></td><td>ใครก็ได้</td><td>
<b>Hello</b>: ส่งทันทีเมื่อเชื่อมต่อ ใส่ version สูงสุดที่รองรับ ฝั่งรับเลือก version ที่ <b>ต่ำกว่า</b> ของสองฝั่ง ถ้าไม่รองรับ ตอบ OFPT_ERROR (OFPET_HELLO_FAILED)<br>
<b>Echo</b>: request/reply ใช้วัด latency และตรวจ connectivity (heartbeat)<br>
<b>Error</b>: แจ้งปัญหาไปยัง controller</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Packet-in = switch ถาม controller เมื่อ table-miss; Packet-out = controller ตอบ</li>
<li>Hello เลือก version ที่ต่ำกว่า; Echo = heartbeat</li>
<li>Match เริ่มจาก Table0; priority สูงก่อน</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ลำดับเหตุการณ์ทั่วไป: แพ็กเก็ตแรกของ flow ใหม่ไม่ match entry ใดเลย → switch ส่ง <b>Packet-in</b> → controller คำนวณเส้นทาง → ส่ง <b>Modify-State</b> เพื่อลง flow entry (และ/หรือ Packet-out) → แพ็กเก็ตต่อ ๆ ไปถูก forward ตามตารางโดยไม่ต้องถาม controller</div>`
    },
    {
      t: "17.2.3 Flow Table Entry",
      ref: "หน้า 538-539",
      html: `
<p>OpenFlow switch ส่งต่อแพ็กเก็ตตาม flow table แต่ละ entry ประกอบด้วย: <b>match fields, priority, counters, instructions, timeout, cookie, flags</b> โดยสององค์ประกอบสำคัญที่สุดคือ <b>match fields และ instructions</b></p>
<figure><img src="i/p539_1.webp" alt="ฟิลด์ของ flow entry และตัวอย่าง match fields" loading="lazy"><figcaption>Fig. 17.6 Composition of flow entries: ตัวอย่าง match fields เช่น Ingress Port, Ether Source/Dst, VLAN ID, IP Src/Dst, TCP Src/Dst Port (กำหนดเองได้)</figcaption></figure>
<table>
<tr><th>ฟิลด์</th><th>ความหมาย</th></tr>
<tr><td><b>Match fields</b></td><td>กฎการจับคู่ ปรับแต่งได้; OpenFlow 1.5.1 รองรับ 45 ฟิลด์ เช่น ingress port, L2 header, L3 header, L4 port</td></tr>
<tr><td><b>Priority</b></td><td>ลำดับการ match entry สูงกว่าถูก match ก่อน</td></tr>
<tr><td><b>Counters</b></td><td>นับจำนวนแพ็กเก็ตและ byte ที่ match entry นี้</td></tr>
<tr><td><b>Instructions</b></td><td>สิ่งที่ทำกับแพ็กเก็ตที่ match (กระทบแพ็กเก็ต, instruction set, และ pipeline)</td></tr>
<tr><td><b>Timeouts</b></td><td><b>Idle time</b>: ถ้าไม่มีแพ็กเก็ต match ภายในเวลาที่กำหนด entry ถูกลบ; <b>Hard time</b>: ครบเวลาแล้วลบ ไม่ว่าจะมีแพ็กเก็ต match หรือไม่</td></tr>
<tr><td><b>Cookie</b></td><td>identifier ของ entry ที่ controller ส่งมา</td></tr>
<tr><td><b>Flags</b></td><td>เปลี่ยนวิธีจัดการ entry</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>องค์ประกอบสำคัญของ forwarding: <b>match fields + instructions</b></li>
<li>Idle timeout = ไม่มีแพ็กเก็ต match จึงลบ; Hard timeout = หมดเวลาลบทันที</li>
</ul></div>
<div class="note"><b>ตัวอย่างตามรูป</b> entry หนึ่ง match: ingress port 3, Ether source MAC1, Ether dst MAC2, type 0x8100, VLAN ID 10, VLAN priority 7, IP src IP1, IP dst IP2, TCP src port 5321, TCP dst port 8080; จะมีแต่แพ็กเก็ตที่ตรงทุกฟิลด์ที่กำหนดเท่านั้นที่ใช้ entry นี้</div>`
    },
    {
      t: "17.2.4 สถาปัตยกรรมเครือข่าย SDN",
      ref: "หน้า 539-541",
      html: `
<p>SDN เปลี่ยนสถาปัตยกรรมจาก <b>distributed control</b> เป็น <b>centralized control</b> แบ่งเป็น 3 ชั้น และ 2 interface</p>
<figure><img src="i/p540_1.webp" alt="3 ชั้นของ SDN พร้อม NBI และ SBI" loading="lazy"><figcaption>Fig. 17.7 SDN network architecture: Collaborative application layer, Controller layer, Device layer เชื่อมด้วย NBI (ด้านบน) และ SBI (ด้านล่าง)</figcaption></figure>
<table>
<tr><th>ชั้น/Interface</th><th>หน้าที่</th></tr>
<tr><td><b>Collaborative application layer</b></td><td>แอปด้านบนตอบความต้องการผู้ใช้ เช่น <b>OSS</b> (ประสานงาน service ทั้งเครือข่าย) และ <b>OpenStack</b> (data center: ประสานงาน network, computing, storage)</td></tr>
<tr><td><b>Controller layer</b></td><td>SDN controller เป็น "สมอง" หน้าที่หลักคือ <b>service orchestration</b></td></tr>
<tr><td><b>Device layer</b></td><td>รับคำสั่งจาก controller แล้ว forward ข้อมูล</td></tr>
<tr><td><b>Northbound interface (NBI)</b></td><td>controller ↔ application layer ส่วนมากเป็น <b>RESTful</b> (HTTP, นิยามด้วย XML หรือ JSON)</td></tr>
<tr><td><b>Southbound interface (SBI)</b></td><td>controller ↔ device: <b>NETCONF, SNMP, OpenFlow, OVSDB</b> ฯลฯ</td></tr>
</table>
<p><b>ตัวอย่าง:</b> แอปด้าน security ต้องการบล็อกทราฟฟิกโดยไม่สนว่าอุปกรณ์อยู่ที่ใด แอปเรียก northbound interface ของ controller เช่น <code>Block(source IP, Dest IP)</code> จากนั้น controller แปลงเป็นคำสั่งไปยังอุปกรณ์แต่ละตัว ตามชนิดของ southbound protocol ที่ใช้</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>3 ชั้น: Application, Controller, Device; Northbound (RESTful) อยู่ระหว่าง application กับ controller; Southbound อยู่ระหว่าง controller กับ device</li>
<li>OpenFlow เป็นเพียงหนึ่งใน southbound protocol (ยังมี NETCONF, SNMP, OVSDB)</li>
</ul></div>
<div class="warn"><b>ระวัง</b> ทิศ "เหนือ" คือด้านแอป และ "ใต้" คือด้านอุปกรณ์ จำไว้ว่า controller อยู่ตรงกลาง ข้อสอบมักสลับให้ north/south</div>`
    },
    {
      t: "17.3.1-17.3.2 NFV: แนวคิด ประวัติ และคุณค่า",
      ref: "หน้า 541-543",
      html: `
<p>ด้วยการเติบโตของ virtualization และ cloud computing แอปพลิเคชันแบบเดิมค่อย ๆ ย้ายขึ้น cloud (private, public, hybrid) เป็นแบบ software <b>NFV (Network Function Virtualization)</b> สร้าง Data Center Network (DCN) จากอุปกรณ์หลายชนิด (server, switch, storage) ทำ virtualization เป็น <b>VM</b> แล้ว deploy service แบบ CT (Communications Technology) เดิมลงบน VM</p>
<ul>
<li><b>VNF (Virtualized Network Function)</b>: network function ที่ถูกทำเป็น virtual เช่น IMS ของ carrier, CPE และ network element อื่น ๆ (server, storage, switch, router)</li>
<li>หลัง hardware กลายเป็นทั่วไป network element ไม่ใช่ผลิตภัณฑ์ที่ฝัง hardware+software อีกต่อไป แต่เป็น <b>software ล้วน</b> ที่ติดตั้งบน <b>NFVI</b></li>
</ul>
<h4>ประวัติ</h4>
<table>
<tr><th>ปี</th><th>เหตุการณ์</th></tr>
<tr><td>ต.ค. 2012</td><td>13 carrier ใหญ่ (AT&amp;T, Verizon, VDF, DT, T-Mobile, BT, Telefonica ฯลฯ) ออก NFV white paper ฉบับแรกที่ SDN and OpenFlow World Congress และตั้ง ISG เพื่อกำหนด requirement และสถาปัตยกรรม</td></tr>
<tr><td>2013</td><td>ETSI NFV ISG ศึกษาเฟสแรก กำหนด requirement/architecture และจัดระเบียบมาตรฐาน interface ต่าง ๆ</td></tr>
<tr><td>2015</td><td>เฟสสอง: สร้าง NFV ecosystem ที่ interoperable; ชี้แจงความสัมพันธ์ NFV กับ SDN และ open-source; 5 working group: IFA, EVE, REL, SEC, TST; ETSI + Linux Foundation เปิดตัว <b>OPNFV</b> (reference platform) ฉบับแรกปี 2015</td></tr>
</table>
<h4>คุณค่าของ NFV (4 ข้อ)</h4>
<ol>
<li><b>ลดเวลา launch service</b>: เพิ่ม node ใหม่ง่าย ไม่ต้องสำรวจหน้างานและติดตั้ง hardware เพียงขอ virtual resource (compute, storage, network) และโหลด software; อัปเดต service logic ด้วยการอัปเดต software หรือโหลด module ใหม่</li>
<li><b>ลดต้นทุนการสร้างเครือข่าย</b>: รวม network element เสมือนไว้ในอุปกรณ์ทั่วไป (economies of scale) และเพิ่มการใช้ทรัพยากร ด้วย unified resource pool บน hardware ทั่วไป จัดสรรตามความต้องการจริง เช่น ขยาย/ลดอัตโนมัติรับมือ tidal effect ของ traffic</li>
<li><b>เพิ่มประสิทธิภาพ O&amp;M</b>: บริหารรวมศูนย์อัตโนมัติ, lifecycle management ของแอปผ่าน <b>MANO</b>, network automation จากการร่วมมือ NFV/SDN</li>
<li><b>สร้าง open ecosystem</b>: จากระบบปิดที่ผูก hardware+software เฉพาะ เป็นแพลตฟอร์ม standard hardware และ virtualized software ที่เปิดให้ third-party developer</li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>NFV เสนอโดย carrier เพื่อแก้ปัญหา hardware เฉพาะทาง deploy/O&amp;M ซับซ้อน และสร้าง service ใหม่ยาก</li>
<li>NFV แก้ด้วยการเอา network function ไปเป็น software บน hardware ทั่วไป (VM)</li>
</ul></div>`
    },
    {
      t: "17.3.3 เทคโนโลยีหลักของ NFV: Virtualization และ Cloudization",
      ref: "หน้า 544-545",
      html: `
<p>บนเส้นทาง NFV: <b>virtualization เป็นรากฐาน และ cloudization เป็นกุญแจ</b></p>
<h4>1) Virtualization</h4>
<p>เครือข่าย telecom เดิมทำ network element ด้วย hardware เฉพาะ ปัญหาคือต้องทดสอบ interoperability และติดตั้ง/config hardware หลายชนิดมาก และ service innovation ต้องพึ่งผู้ผลิตซึ่งช้า จึงนำ virtualization มาให้ network element เหมือน software บน infrastructure ทั่วไป (server, storage, switch)</p>
<figure><img src="i/p543_1.webp" alt="4 คุณสมบัติของ virtualization" loading="lazy"><figcaption>Fig. 17.8 Virtualization characteristics: partitioning, isolation, encapsulation, independent of hardware</figcaption></figure>
<table>
<tr><th>คุณสมบัติ</th><th>ความหมาย</th></tr>
<tr><td><b>Partitioning</b></td><td>รัน VM หลายตัวบน server จริงเครื่องเดียว</td></tr>
<tr><td><b>Isolation</b></td><td>VM แต่ละตัวแยกจากกัน</td></tr>
<tr><td><b>Encapsulation</b></td><td>VM ทั้งตัวเก็บเป็นไฟล์ ย้ายและ copy ได้</td></tr>
<tr><td><b>Hardware independent</b></td><td>รันบน server เครื่องใดก็ได้โดยไม่ต้องแก้ไข</td></tr>
</table>
<p>ผลลัพธ์จาก hardware ทั่วไป: ลดต้นทุนจัดซื้อ hardware เฉพาะ, พัฒนา software ได้เร็วและวนปรับปรุงถี่ ทำให้ service ใหม่เร็วขึ้น, และเปิดทางให้ operator เข้าตลาด cloud computing</p>
<h4>2) Cloudization</h4>
<p>คือการย้าย service เดิมไปยัง cloud computing platform โดยนิยามของ NIST cloud computing คือโมเดลให้เข้าถึง shared pool ของทรัพยากรที่ configure ได้ตามต้องการ เร็ว และใช้ความพยายามจัดการน้อยที่สุด คุณลักษณะ 5 ข้อ:</p>
<ul>
<li><b>On-demand self-service</b>: ขอและคืนทรัพยากรได้เอง โดยไม่ต้องรอ IT admin</li>
<li><b>Extensive network access</b>: เข้าถึงได้ทุกที่ทุกเวลาเมื่อมีเครือข่าย</li>
<li><b>Resource pooling</b>: ทรัพยากร network/server/storage อยู่ใน pool ให้ผู้ใช้</li>
<li><b>Fast resilient scaling</b>: จัดสรร/คืนได้อย่างรวดเร็ว</li>
<li><b>Measurable service</b>: วัดการใช้ได้ จึงคิดเงินได้ (จำนวน CPU, พื้นที่ storage, bandwidth ต่อชั่วโมง)</li>
</ul>
<p>การทำ cloudization ของ network function ใน carrier ใช้ประโยชน์หลักจาก <b>resource pooling</b> และ <b>fast resilient scaling</b></p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Virtualization = partitioning, isolation, encapsulation, hardware independent</li>
<li>Cloud 5 ข้อ: on-demand self-service, extensive network access, resource pooling, fast resilient scaling, measurable service</li>
</ul></div>`
    },
    {
      t: "17.3.4-17.3.5 สถาปัตยกรรม NFV และโซลูชัน Huawei",
      ref: "หน้า 545-547",
      html: `
<p>สถาปัตยกรรม NFV แบ่งเป็นโมดูล <b>NFVI, VNF, MANO</b> และรองรับ OSS/BSS เดิม</p>
<figure><img src="i/p544_1.webp" alt="OSS/BSS, VNF, NFVI และ MANO" loading="lazy"><figcaption>Fig. 17.9 NFV architecture: OSS/BSS, VNF (software network elements), NFVI (cloud resource pool) และ MANO (orchestration, management)</figcaption></figure>
<table>
<tr><th>โมดูล</th><th>หน้าที่</th></tr>
<tr><td><b>OSS/BSS</b></td><td>ระบบบริหารของ service provider ไม่ใช่องค์ประกอบภายในกรอบ NFV แต่ MANO และ network element ต้องมี interface รองรับ</td></tr>
<tr><td><b>VNF</b></td><td>VM และ network element/network function software ที่ deploy บน VM เปรียบเหมือน "แอป" ของ network function ต่าง ๆ (IMS, EPC, BRAS, CPE)</td></tr>
<tr><td><b>NFVI</b></td><td>hardware layer + virtualization layer ให้สภาพแวดล้อมรัน VNF; เรียกอีกอย่างว่า <b>COTS + CloudOS</b></td></tr>
<tr><td>&nbsp;&nbsp;COTS</td><td>Commercial Off-The-Shelf = hardware ทั่วไป หาง่าย ใช้อเนกประสงค์ (เช่น Huawei FusionServer)</td></tr>
<tr><td>&nbsp;&nbsp;CloudOS</td><td>ซอฟต์แวร์แพลตฟอร์ม cloud ทำ virtualize hardware ให้ทรัพยากร compute/storage/network เป็น virtual resource (เช่น Huawei FusionSphere)</td></tr>
<tr><td><b>MANO</b></td><td>Management and Orchestration แก้ปัญหาการส่งมอบ service ในสภาพแวดล้อมหลายผู้ผลิต CT/IT</td></tr>
</table>
<h4>MANO ประกอบด้วย 3 ส่วน</h4>
<table>
<tr><th>ส่วน</th><th>หน้าที่</th></tr>
<tr><td><b>NFVO</b> (NFV Orchestrator)</td><td>orchestrate และบริหาร NFV infrastructure, software resource และ network service ทั้งหมด</td></tr>
<tr><td><b>VNFM</b> (VNF Manager)</td><td>บริหาร <b>lifecycle ของ VNF</b>: instantiation, configuration, shutdown</td></tr>
<tr><td><b>VIM</b> (Virtualized Infrastructure Manager)</td><td>บริหารทรัพยากรของ NFVI (ปกติรันที่ infrastructure site): resource discovery, จัดสรร virtual resource, จัดการ fault</td></tr>
</table>
<p>solution ของแต่ละโมดูลมาจากผู้ผลิตต่างรายได้ ซึ่งเพิ่มความยืดหยุ่นแต่ทำให้ system integration ซับซ้อนขึ้น</p>
<h4>โซลูชัน NFV ของ Huawei</h4>
<figure><img src="i/p546_1.webp" alt="Huawei NFV solution: VNF, Huawei Cloud Stack, MANO" loading="lazy"><figcaption>Fig. 17.10 Huawei NFV solution: VNF (CloudBB, Cloud DSL/OLT, CloudEdge, CloudCore, 5G Core), NFVI (Huawei Cloud Stack: FusionCompute, FusionStorage, FusionNetwork) และ MANO (CloudOpera: NFVO, VNFM; FusionSphere OpenStack+OM)</figcaption></figure>
<ul>
<li><b>Huawei CloudStack</b> ให้ฟังก์ชันของ NFVI: computing = <b>FusionCompute</b>, storage = <b>FusionStorage</b>, network = <b>FusionNetwork</b> (ไม่ใช่ผลิตภัณฑ์เฉพาะ แต่เป็นคำเรียกรวมของโมดูล network virtualization / software-defined network)</li>
<li>CloudStack ทำ virtualization ครบทั้ง compute, storage, network และบริหาร/มอนิเตอร์/ปรับแต่ง resource ที่ virtualize จาก hardware จริงแบบรวม</li>
<li><b>VNF</b> ของ Huawei: CloudBB, Cloud DSL/OLT, CloudEdge, CloudCore, 5G Core สำหรับ network element เสมือนของ core network ประเภทต่าง ๆ (DSL = digital subscriber line, OLT = optical line terminal)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>NFV architecture: OSS/BSS, VNF, NFVI (COTS + CloudOS), MANO (NFVO + VNFM + VIM)</li>
<li>VNFM = lifecycle ของ VNF; VIM = ทรัพยากร NFVI; NFVO = orchestrate ทั้งหมด</li>
</ul></div>
<div class="note"><b>ความสัมพันธ์ SDN กับ NFV</b> เป็นแนวคิดที่เสริมกันแต่เป็นอิสระ: SDN แยก control ออกจาก forwarding เพื่อควบคุมเครือข่ายด้วย software ส่วน NFV เอา network function ไปรันเป็น software บน hardware ทั่วไป ทั้งสองทำงานร่วมกันเพื่อ network automation (ตามที่บทระบุเรื่อง NFV/SDN collaboration)</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `ในเครือข่ายดั้งเดิมของบริษัท router C ส่งทราฟฟิกไป router D ผ่าน link C-D (ที่ OSPF มองว่าสั้นที่สุด) link C-D ใช้ 6G จากความจุ 5G และมี packet loss ขณะที่เส้นทาง C-A-D ใช้เพียง 1G/5G บน C-A และ A-D ว่าง`,
      q: "ทำไม router จึงยังคงส่งผ่าน C-D และ SDN ช่วยได้อย่างไร?",
      opts: [
        { t: "เพราะ router ต่างคำนวณเส้นทางเองจาก bandwidth คงที่ ไม่เห็นภาพรวม; SDN controller รวมศูนย์ข้อมูลและคำนวณเส้นทางจาก real-time bandwidth ได้ เช่น เลือก C-A-D", why: "ถูก: ปัญหา congestion ของ traditional network มาจากการคำนวณแบบ distributed ตาม bandwidth คงที่ SDN ใช้มุมมอง global" },
        { t: "เพราะ link C-D ถูกตั้งเป็น backup โดย SDN", why: "ผิด: ไม่มีข้อมูลว่าเป็น backup และ SDN ไม่ได้เกี่ยวกับการตั้ง backup แบบนั้น" },
        { t: "เพราะ forwarding plane ของ router C เสีย", why: "ผิด: ปัญหาอยู่ที่ control plane เลือกเส้นทางโดยไม่รู้ load" },
        { t: "SDN ช่วยด้วยการเพิ่ม bandwidth ของ link C-D เอง", why: "ผิด: SDN ไม่ได้เพิ่มความจุ link แต่ช่วย orchestrate เส้นทางได้ดีกว่า" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรกำลังอธิบายสถาปัตยกรรมให้ทีมใหม่ฟัง: ใน OpenFlow switch ไม่มีโปรเซสคำนวณ routing protocol บนอุปกรณ์ อุปกรณ์รับ flow entry จากส่วนกลางแล้ว forward ตาม`,
      q: "plane ใดถูกย้ายออกจากอุปกรณ์ไปอยู่ที่ controller?",
      opts: [
        { t: "Forwarding plane", why: "ผิด: forwarding plane ยังอยู่บน switch เพราะต้องส่งแพ็กเก็ตจริง" },
        { t: "Control plane", why: "ถูก: SDN แยก control plane ออกมารวมศูนย์ที่ controller เหลือ forwarding plane บนอุปกรณ์" },
        { t: "ทั้ง control และ forwarding plane", why: "ผิด: ถ้าย้าย forwarding ไปด้วย switch จะส่งแพ็กเก็ตไม่ได้" },
        { t: "Management plane เท่านั้น", why: "ผิด: SDN แยก control ออกจาก forwarding เป็นแก่น" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `แอปความปลอดภัยของบริษัทต้องการบล็อกทราฟฟิกจาก IP 10.1.1.5 ไป 10.2.2.9 โดยไม่ต้องรู้ว่า switch ตัวใดอยู่ตรงไหน แอปจึงส่งคำสั่ง Block(source IP, Dest IP) ไปที่ controller ผ่าน REST API (JSON)`,
      q: "REST API ที่แอปใช้เรียกว่า interface อะไร และ controller จะสั่ง switch ผ่านอะไร?",
      opts: [
        { t: "Southbound interface; controller สั่ง switch ผ่าน RESTful", why: "ผิด: REST ที่แอปเรียกคือ northbound และฝั่ง switch ใช้ southbound protocol" },
        { t: "Northbound interface (RESTful); controller แปลงเป็นคำสั่งผ่าน southbound protocol เช่น OpenFlow หรือ NETCONF", why: "ถูก: NBI เชื่อม controller กับ application layer ส่วน SBI เชื่อม controller กับ device" },
        { t: "Northbound interface; controller สั่ง switch ผ่าน NBI เหมือนเดิม", why: "ผิด: ฝั่ง device ใช้ SBI" },
        { t: "Eastbound interface; ใช้ OVSDB เท่านั้น", why: "ผิด: บทนี้ไม่มี eastbound และ OVSDB เป็นแค่หนึ่งใน southbound" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `Flow table ของ OpenFlow switch มี entry ดังนี้ใน Table0: (A) match dst IP 10.0.0.0/24, priority 100, action = forward port 1; (B) match ทุกแพ็กเก็ต (wildcard), priority 1, action = send to controller. แพ็กเก็ตหนึ่งมี dst IP 10.0.0.7`,
      q: "แพ็กเก็ตนี้ถูกจัดการอย่างไร?",
      opts: [
        { t: "ถูกส่งไป controller เพราะ entry B ครอบทุกแพ็กเก็ต", why: "ผิด: entry A priority สูงกว่าและ match ก่อน" },
        { t: "ถูก forward ออก port 1 ตาม entry A เพราะ priority 100 สูงกว่า 1 และถูก match ก่อน", why: "ถูก: ใน table เดียวกัน entry priority สูงถูก match ก่อน" },
        { t: "ถูกทิ้ง เพราะมี match สองรายการ", why: "ผิด: หลาย entry ตรงกันได้ ใช้ตัวที่ priority สูงสุด" },
        { t: "ถูกส่งทั้งไป port 1 และ controller", why: "ผิด: ใช้ entry เดียวที่ priority สูงสุด" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `แพ็กเก็ตแรกของ flow ใหม่ (dst IP ที่ไม่เคยเห็น) เข้ามาที่ OpenFlow switch ซึ่งไม่มี entry ใดตรงกัน`,
      q: "สิ่งแรกที่ switch ทำคือข้อใด และใครเป็นผู้เริ่มส่งข้อความ?",
      opts: [
        { t: "ส่ง Packet-in ไปที่ controller (switch เป็นผู้เริ่ม, ชนิด asynchronous)", why: "ถูก: เมื่อไม่มี entry ตรง switch ส่ง Packet-in หา controller" },
        { t: "ส่ง Modify-State ไปที่ controller", why: "ผิด: Modify-State เป็นข้อความ controller-to-switch สำหรับแก้ flow table" },
        { t: "ทิ้งแพ็กเก็ตทันทีโดยไม่แจ้งใคร", why: "ผิด: ตามหนังสือต้องแจ้ง controller ผ่าน Packet-in" },
        { t: "ส่ง Features reply ให้ controller", why: "ผิด: Features ตอบคำขอตอนตั้ง session ไม่เกี่ยวกับ table-miss" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Controller เพิ่ม flow entry หนึ่งด้วย idle timeout 30 วินาที และ hard timeout 300 วินาที ลูกค้าส่งแพ็กเก็ตที่ match entry นี้ต่อเนื่องทุก 5 วินาทีเป็นเวลานาน`,
      q: "entry นี้จะถูกลบเมื่อใด และ switch จะทำอะไรเมื่อถูกลบ?",
      opts: [
        { t: "ถูกลบหลัง 30 วินาที เพราะ idle timeout", why: "ผิด: มีแพ็กเก็ต match เป็นระยะ idle timer จึงถูกรีเซ็ตตลอด" },
        { t: "ไม่ถูกลบเลย ตราบใดที่ยังมีทราฟฟิก", why: "ผิด: hard timeout ลบไม่ว่าจะมีทราฟฟิกหรือไม่" },
        { t: "ถูกลบเมื่อครบ 300 วินาที (hard timeout) และ switch ส่ง Flow-Removed ไปที่ controller", why: "ถูก: idle ไม่หมดเพราะมี traffic แต่ hard timeout ลบแน่นอน และมีข้อความ Flow-Removed" },
        { t: "ถูกลบหลัง 330 วินาที เพราะบวกกัน", why: "ผิด: timeout สองตัวนับแยกกัน ไม่บวกกัน" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `Controller และ switch เพิ่งเชื่อมต่อกัน controller รองรับ OpenFlow version สูงสุดที่ 1.5 ส่วน switch รองรับสูงสุด 1.3 ทั้งสองฝั่งส่ง Hello ใส่ version สูงสุดของตน`,
      q: "ผลลัพธ์ที่ถูกต้องคืออะไร?",
      opts: [
        { t: "ใช้ version 1.5 เพราะ controller เป็นฝ่ายควบคุม", why: "ผิด: switch ไม่รองรับ 1.5" },
        { t: "เจรจาได้ที่ version 1.3 (เลือกค่าที่ต่ำกว่า) และเชื่อมต่อสำเร็จถ้าทั้งคู่รองรับ 1.3", why: "ถูก: ฝั่งรับเลือก version ที่ต่ำกว่าของสองฝั่ง ถ้ารองรับก็เชื่อมต่อต่อ ถ้าไม่ ตอบ OFPT_ERROR (HELLO_FAILED)" },
        { t: "เชื่อมต่อล้มเหลวเสมอ เพราะ version ไม่ตรงกัน", why: "ผิด: มีกลไกเลือก version ต่ำกว่า" },
        { t: "ใช้ version ที่ switch ระบุ 1.3 โดยไม่ต้องตรวจสอบกับ controller", why: "ผิด: ต้องคำนวณและยืนยันว่าฝั่งรับรองรับ version นั้นจริง ถ้าไม่ได้ ต้องตอบ error" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการตรวจว่า control channel ระหว่าง controller กับ switch ยังมีชีวิตอยู่ และวัด latency ระหว่างกัน`,
      q: "ควรใช้ข้อความ OpenFlow ชนิดใด?",
      opts: [
        { t: "Echo request/reply (symmetric message)", why: "ถูก: Echo ใช้เป็น heartbeat วัด latency และ connectivity; ฝั่งใดก็เริ่มได้ แต่ผู้รับต้องตอบ" },
        { t: "Port-status", why: "ผิด: ใช้แจ้งการเพิ่ม/ลบ/แก้ interface ของ switch" },
        { t: "Read-State", why: "ผิด: ใช้เก็บสถิติจาก switch" },
        { t: "Flow-Removed", why: "ผิด: ใช้แจ้งว่า entry ถูกลบหรือหมดอายุ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ให้บริการโทรคมนาคมรายหนึ่งต้องการลดเวลาเปิดบริการใหม่ จากเดิมที่ต้องสำรวจหน้างาน สั่งซื้อและติดตั้งอุปกรณ์เฉพาะทาง ให้เหลือเพียงขอทรัพยากรและโหลดซอฟต์แวร์ และต้องการให้ขยาย/ลดทรัพยากรอัตโนมัติตามช่วงเวลาที่ผู้ใช้มาก`,
      q: "แนวทางใดตรงที่สุด และเพราะเหตุใด?",
      opts: [
        { t: "NFV: ทำ network function เป็น VNF บน hardware ทั่วไป และใช้ resource pool/ elastic scaling ตาม tidal effect", why: "ถูก: คุณค่าของ NFV คือลดเวลา launch และลดต้นทุนด้วยการแชร์ทรัพยากรแบบ dynamic" },
        { t: "เพิ่มอุปกรณ์ hardware เฉพาะทางให้มากพอรองรับ peak", why: "ผิด: ยังต้องติดตั้งนาน และทรัพยากรใช้ไม่เต็มช่วงปกติ" },
        { t: "ใช้ Telnet ตั้งค่าทีละเครื่องให้เร็วขึ้น", why: "ผิด: ไม่แก้ที่ต้นเหตุเรื่อง hardware เฉพาะทางและการสเกล" },
        { t: "ใช้ SNMP Trap เพื่อให้ NMS ขยายทรัพยากรเอง", why: "ผิด: Trap เป็นการแจ้ง event ไม่ใช่กลไกจัดสรร virtual resource" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ในระบบ NFV ของ carrier ต้องการสร้าง VNF (เช่น vCPE) ใหม่ ตั้งค่า และปิดเมื่อไม่ใช้ โดยแยกจากงานจัดสรร CPU/memory/storage ของ virtual infrastructure ที่อยู่ในแต่ละ data center`,
      q: "องค์ประกอบ MANO ใดรับผิดชอบสองงานนี้ ตามลำดับ?",
      opts: [
        { t: "VIM จัดการ lifecycle ของ VNF; VNFM จัดสรรทรัพยากร NFVI", why: "ผิด: สลับหน้าที่ VIM กับ VNFM" },
        { t: "NFVO ทำทั้งสองอย่าง", why: "ผิด: NFVO orchestrate ภาพรวม ส่วนรายละเอียดมอบให้ VNFM และ VIM" },
        { t: "VNFM จัดการ lifecycle ของ VNF (instantiate, configure, shutdown); VIM จัดสรร/จัดการทรัพยากร NFVI", why: "ถูก: VNFM = lifecycle ของ VNF; VIM = resource management ของ NFVI (รันที่ infrastructure site)" },
        { t: "OSS/BSS เป็นผู้ทำทั้งสอง", why: "ผิด: OSS/BSS ไม่ใช่องค์ประกอบภายในกรอบ NFV" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `ทีมงานต้องการเลือกคอมโพเนนต์สำหรับ NFVI ของ Huawei ที่ให้บริการ compute, storage และ network ตามลำดับ`,
      q: "ชุดใดถูกต้อง?",
      opts: [
        { t: "FusionNetwork, FusionStorage, FusionCompute", why: "ผิด: สลับ compute กับ network" },
        { t: "FusionStorage, FusionCompute, FusionNetwork", why: "ผิด: สลับ compute กับ storage" },
        { t: "CloudEdge, CloudCore, CloudBB", why: "ผิด: เหล่านี้เป็น VNF solution ไม่ใช่ NFVI" },
        { t: "FusionCompute, FusionStorage, FusionNetwork", why: "ถูก: Huawei CloudStack ให้ computing = FusionCompute, storage = FusionStorage, network = FusionNetwork" }
      ],
      ans: 3
    },
    {
      type: "multi",
      story: `ทีมพัฒนาอธิบายปัญหาของ traditional network ให้ผู้บริหารฟัง`,
      q: "เลือกทุกข้อที่เป็นปัญหาของ traditional network ตามบท",
      opts: [
        { t: "คำนวณเส้นทางจาก bandwidth คงที่ จึงเกิด congestion ได้ง่าย", ok: true, why: "ถูก" },
        { t: "ผู้ผลิตแต่ละรายใช้ protocol ที่เข้ากันไม่ได้เลย จึงข้ามผู้ผลิตไม่ได้", ok: false, why: "ผิด: ข้อดีของ traditional คือ decoupling อุปกรณ์/protocol และเข้ากันได้ดีข้ามผู้ผลิต" },
        { t: "ต้องเรียนรู้ RFC จำนวนมากและคำสั่ง config หลายหมื่นบรรทัด", ok: true, why: "ถูก: ความซับซ้อนสูง" },
        { t: "fault ส่วนมากถูกพบหลังผู้ใช้ร้องเรียน และหาตำแหน่งใช้เวลาเฉลี่ย 76 นาที", ok: true, why: "ถูก: ตามสถิติ data center ในบท" },
        { t: "การ deploy service ใหม่เร็วมากเพราะทุกอุปกรณ์ตั้งค่าอัตโนมัติ", ok: false, why: "ผิด: traditional deploy ช้าและต้องตั้งค่าทีละอุปกรณ์" }
      ]
    },
    {
      type: "multi",
      story: `สถาปนิกกำลังเตรียมอธิบาย OpenFlow flow table`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "การ match เริ่มจาก Table0 และไล่ตามลำดับ pipeline", ok: true, why: "ถูก" },
        { t: "Entry ใน table เดียวกันที่ priority สูงกว่าถูก match ก่อน", ok: true, why: "ถูก" },
        { t: "Counters เก็บจำนวนแพ็กเก็ตและ byte ที่ match entry", ok: true, why: "ถูก" },
        { t: "Cookie เป็นตัวระบุ entry ที่ controller ส่งลงมา และใช้เป็นเงื่อนไข match แพ็กเก็ตได้โดยตรง", ok: false, why: "ผิด: cookie เป็น identifier ที่ controller ใช้อ้างอิง entry ไม่ใช่ฟิลด์ match ของแพ็กเก็ต" },
        { t: "OpenFlow เป็น northbound protocol ระหว่าง controller กับแอป", ok: false, why: "ผิด: OpenFlow เป็น southbound ระหว่าง controller กับ switch" }
      ]
    },
    {
      type: "multi",
      story: `ผู้บริหารถามว่าทำไมบริษัทโทรคมนาคมควรย้ายมาใช้ NFV`,
      q: "เลือกทุกข้อที่เป็นคุณค่าของ NFV ตามบท",
      opts: [
        { t: "ลดเวลา launch service ใหม่", ok: true, why: "ถูก" },
        { t: "ลดต้นทุนสร้างเครือข่ายด้วย resource pool บน hardware ทั่วไป", ok: true, why: "ถูก" },
        { t: "เพิ่มประสิทธิภาพ O&M ด้วยการบริหารอัตโนมัติและ MANO", ok: true, why: "ถูก" },
        { t: "สร้าง open ecosystem กับ third-party", ok: true, why: "ถูก" },
        { t: "ทำให้ไม่ต้องใช้ hardware ใด ๆ อีกต่อไป", ok: false, why: "ผิด: ยังต้องมี hardware ทั่วไป (COTS) ใน NFVI เพียงไม่ใช่ hardware เฉพาะทางเท่านั้น" }
      ]
    },
    {
      type: "blank",
      story: `สรุปสถาปัตยกรรม SDN`,
      text: `SDN แบ่งเป็น 3 ชั้น: collaborative application layer, {1} layer ซึ่งเป็นสมอง ทำ service orchestration และ device layer; interface ด้านที่เชื่อมกับแอปเรียก {2} ส่วนมากเป็น RESTful และด้านที่เชื่อมกับอุปกรณ์เรียก {3} เช่น NETCONF, SNMP, OpenFlow`,
      blanks: [
        { opts: ["controller", "management", "forwarding", "session"], ans: 0, why: "ชั้นกลางคือ controller layer" },
        { opts: ["northbound interface", "southbound interface", "eastbound interface", "loopback interface"], ans: 0, why: "NBI เชื่อมกับ application layer" },
        { opts: ["northbound interface", "southbound interface", "westbound interface", "console"], ans: 1, why: "SBI เชื่อม controller กับ device" }
      ]
    },
    {
      type: "blank",
      story: `สรุปองค์ประกอบ NFV`,
      text: `NFVI ประกอบด้วยฮาร์ดแวร์ทั่วไปที่เรียกว่า {1} และซอฟต์แวร์ virtualize ที่เรียกว่า {2}; ส่วนที่ทำ lifecycle ของ VNF คือ {3}`,
      blanks: [
        { opts: ["COTS", "VNF", "OSS", "NFVO"], ans: 0, why: "COTS = Commercial Off-The-Shelf" },
        { opts: ["CloudOS", "OSS/BSS", "VIM", "VNFM"], ans: 0, why: "CloudOS ทำ virtualization ทรัพยากรให้ชั้นบน" },
        { opts: ["VNFM", "VIM", "COTS", "CloudOS"], ans: 0, why: "VNFM บริหาร lifecycle ของ VNF" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ข้อความ OpenFlow กับหน้าที่",
      pairs: [
        ["Packet-in", "switch แจ้ง controller เมื่อไม่มี entry ตรงกันหรือ match 'send to Controller'"],
        ["Modify-State", "controller เพิ่ม ลบ แก้ flow table"],
        ["Flow-Removed", "switch แจ้งว่า entry หมดอายุหรือถูกลบ"],
        ["Echo", "heartbeat วัด latency และ connectivity ระหว่าง controller กับ switch"],
        ["Features", "controller ขอข้อมูลความสามารถของ switch หลังตั้ง session"]
      ],
      why: "ข้อความแต่ละชนิดมีบทบาทเฉพาะใน control channel ระหว่าง controller กับ switch"
    }
  ]
});
