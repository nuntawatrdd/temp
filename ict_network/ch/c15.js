IOT.reg({
  id: "c15",
  title: "Campus Network: สถาปัตยกรรมและกรณีศึกษา",
  th: "ความหมาย campus network, hierarchical design (core/aggregation/access/egress), small/medium/large, lifecycle, กรณีศึกษาวางแผน ติดตั้ง ดูแล และ optimize เครือข่ายขนาดเล็ก",
  summary: `
<ul>
<li><b>Campus network</b> = LAN ที่เชื่อมคนและอุปกรณ์ในพื้นที่จำกัด โดยมี <b>management body เดียว</b> (หลายหน่วยงานดูแล = หลาย campus); ขนาดใหญ่สุดราวไม่กี่ตารางกิโลเมตร ใหญ่กว่านั้นเป็น MAN/WAN</li>
<li>LAN technology: <b>Ethernet IEEE 802.3</b> (wired) และ <b>Wi-Fi IEEE 802.11</b> (wireless)</li>
<li><b>หลักออกแบบ</b>: hierarchical, regional, modular; แบ่งชั้นตามตำแหน่ง: terminal, <b>access</b>, <b>aggregation</b>, <b>core</b> และตามหน้าที่: network management, security, DMZ, data center, <b>egress</b></li>
<li><b>Core</b>: backbone แลกเปลี่ยนข้อมูล เชื่อม aggregation/data center/egress/management; <b>Aggregation</b>: รวม traffic, routing, QoS, security; <b>Access</b>: ให้ผู้ใช้เข้า network (ขอบ campus); <b>Egress</b>: ขอบเขตกับ network ภายนอก (firewall, IPS, Anti-DDoS); <b>Data center</b>: server; <b>Management area</b>: SDN controller, wireless AC, eLOG</li>
<li><b>ขนาด</b>: small = ไม่กี่ถึงหลายสิบ user ไม่แบ่งชั้น; medium = 200-2000 user, 25-100 devices, 3 ชั้น + data center + egress; large = หลายอาคาร/หลาย campus, modules ครบ (มี VPN, branch, cloud DC)</li>
<li><b>เทคโนโลยีแต่ละชั้น</b>: core = stacking, OSPF, static route, ACL; aggregation = DHCP, stacking, link aggregation, STP, OSPF, static route; access = VLAN, STP, AAA, link aggregation; egress = NAT, OSPF, static route, PPPoE; management = SNMP (NETCONF)</li>
<li><b>Lifecycle (วนซ้ำ)</b>: Planning and design → Deployment and implementation → Operation and maintenance → Network optimization (ขับเคลื่อนด้วย requirement ที่เปลี่ยน)</li>
<li><b>กรณีศึกษา</b>: บริษัท ~200 คน, topology ง่าย, wired สำหรับพนักงาน + Wi-Fi สำหรับ guest, traffic control ง่าย, security ระดับหนึ่ง; อุปกรณ์: access S3700, aggregation S5700 (gateway), core+egress รวมกัน AR2240</li>
<li><b>VLAN</b>: 1 guest/WLAN service, 2 R&D, 3 marketing, 4 administration, 100 L2 management, 101 WLAN management, 102 interconnection Agg-S1 ↔ CORE-R1; แยก service / management / interconnection; หมายเลขต่อเนื่อง</li>
<li><b>IP plan</b>: gateway ใช้ address แรกหรือสุดท้ายของ segment (เช่น .254), service VLAN ใช้ /24, interconnect ใช้ <b>/30</b> (core ใช้ address ค่าน้อยกว่า), loopback /32, management address ในเครือข่ายเดียวกัน, address ต่อเนื่องเพื่อ aggregate</li>
<li><b>การแจก IP</b>: WAN interface = จาก carrier (static/DHCP/PPPoE); server/printer/อุปกรณ์พิเศษ = static (หรือ bind MAC); user terminal = DHCP จาก gateway; อุปกรณ์เครือข่าย = static (ยกเว้น AP)</li>
<li><b>Routing</b>: ภายในใช้ static ได้; Agg-S1 มี default route → CORE-R1 (192.168.102.1); CORE-R1 มี default ไป ISP (22.1.2.1) และ summary route 192.168.0.0/16 → Agg-S1 (192.168.102.2)</li>
<li><b>WLAN</b>: Layer 2 networking แบบ bypass (AC ไม่อยู่บนเส้นทางข้อมูล), control message ผ่าน <b>CAPWAP tunnel</b>, data แบบ <b>direct forwarding</b>; ต้องมี coverage / capacity / AP layout design</li>
<li><b>Reliability</b>: port-level (link aggregation, LACP, ใช้ในกรณีนี้ ประหยัด) vs device-level (dual device, iStack/CSS); <b>Loop</b>: เปิด RSTP และตั้ง Agg-S1 เป็น root bridge</li>
<li><b>NAT</b>: static NAT, dynamic NAT (pool), NAPT, <b>Easy IP</b> (ใช้ address ของ interface ที่ได้แบบ dynamic) , NAT server; กรณีนี้เลือก <b>Easy IP</b></li>
<li><b>Security</b>: traffic control (ACL + traffic-filter/traffic-policy + NAPT), <b>DHCP snooping</b> (uplink = trusted port), network management security (ACL จำกัด admin IP บน VTY, SNMPv3)</li>
<li><b>การจัดการ</b>: traditional (Telnet/Web/SSH, SNMP) หรือ <b>iMaster NCE</b> (OpenFlow, NETCONF, Telemetry)</li>
<li><b>Test</b>: connectivity (L1/L2/L3), high reliability (loop avoidance, path switching), service performance (service traffic, access control)</li>
<li><b>O&M เกณฑ์</b>: ห้องเซิร์ฟเวอร์ 0 ถึง 45 °C (ระยะยาว), 10-95% RH; CPU และ memory &lt; 80%; interface utilization &gt; 80% ต้องบันทึก; debug off; running config = saved config; เปลี่ยนรหัสผ่านทุก quarter, password cipher ยาวกว่า 6 หลัก; เวลาต่างจริงไม่เกิน 5 นาที; interface ที่ใช้ UP, ที่ไม่ใช้ shutdown</li>
<li><b>Optimization</b>: device performance, network infrastructure (เช่น single → dual link, direct → tunnel forwarding, static → dynamic routing), service quality (QoS, bandwidth reservation)</li>
</ul>`,
  sections: [
    {
      t: "15.1.1 Campus Network คืออะไร",
      ref: "หน้า 483-484",
      html: `
<p><b>Campus network</b> คือ LAN ที่เชื่อมต่อ <b>คน และสิ่งของ</b> ในพื้นที่จำกัด โดยปกติมี <b>หน่วยงานเดียวบริหาร</b> ถ้ามีหลายหน่วยงานบริหาร ถือเป็นหลาย campus network ขนาดตั้งแต่เล็ก (SOHO, ร้านกาแฟที่มี Wi-Fi) ถึงใหญ่ (มหาวิทยาลัย นิคมอุตสาหกรรม ห้างสรรพสินค้า) ซึ่งขนาดใหญ่สุดมักไม่เกินไม่กี่ตารางกิโลเมตร ถ้าใหญ่กว่านั้นเรียกเป็น <b>MAN</b> และต้องใช้เทคโนโลยี WAN</p>
<figure><img src="i/p484_1.webp" alt="campus network ในองค์กร โรงเรียน หน่วยงานรัฐ ธนาคาร อาคารสำนักงาน" loading="lazy"><figcaption>Fig. 15.1 Campus network (ใช้ได้ในองค์กร สถานศึกษา รัฐ ธนาคาร อาคารสำนักงาน)</figcaption></figure>
<h4>การออกแบบเชิงชั้นและเชิงพื้นที่ (hierarchical และ regional / modular)</h4>
<ul>
<li>แบ่งตามตำแหน่งอุปกรณ์: <b>terminal layer</b> (PC, โทรศัพท์) → <b>access layer</b> → <b>aggregation layer</b> → <b>core layer</b></li>
<li>แบ่งตามหน้าที่: <b>network management</b>, <b>network security</b>, <b>DMZ</b>, <b>data center zone</b></li>
<li>ส่วนที่เชื่อมออกนอก campus คือ <b>egress layer</b> เชื่อมสาขา campus อื่น ผู้ใช้ระยะไกล private/public cloud ผ่าน Internet และ WAN</li>
</ul>
<h4>LAN technology ที่ใช้</h4>
<table>
<tr><th>แบบ</th><th>มาตรฐาน</th></tr>
<tr><td>Wired Ethernet</td><td>IEEE 802.3</td></tr>
<tr><td>Wireless Wi-Fi</td><td>IEEE 802.11</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Campus network = LAN + หน่วยงานบริหารเดียว</li>
<li>802.3 = Ethernet, 802.11 = Wi-Fi</li>
<li>หลักออกแบบ: hierarchical + regional + modular</li>
</ul></div>`
    },
    {
      t: "15.1.2 สถาปัตยกรรมมาตรฐาน: ชั้นและพื้นที่ (Core, Aggregation, Access, Egress, DC, Management)",
      ref: "หน้า 484-485",
      html: `
<p>Campus network ตามหลัก hierarchical / regional / modular แบ่งขนาดตามจำนวน end user หรือ network element (router, switch, AC, AP ฯลฯ) เป็น small, medium และ large</p>
<figure><img src="i/p485_1.webp" alt="สถาปัตยกรรม campus network: access, aggregation, core, egress, data center, management area, branch campus" loading="lazy"><figcaption>Fig. 15.2 Typical campus network architecture (access, aggregation, core, egress area, data center, network management area, branch campus)</figcaption></figure>
<table>
<tr><th>ชั้น/พื้นที่</th><th>หน้าที่</th><th>ตัวอย่างอุปกรณ์/บริการ</th></tr>
<tr><td><b>Core layer</b></td><td>backbone ของ campus; แกนกลางของการแลกเปลี่ยนข้อมูล เชื่อม aggregation, data center, egress, management</td><td>core switch</td></tr>
<tr><td><b>Aggregation layer</b></td><td>ชั้นกลาง: รวม/แลกเปลี่ยนข้อมูล และให้ฟังก์ชันสำคัญ เช่น routing, QoS, security</td><td>aggregation switch (มักเป็น gateway)</td></tr>
<tr><td><b>Access layer</b></td><td>ให้ผู้ใช้เข้าสู่ campus network; เป็นขอบของ campus</td><td>access switch, AP</td></tr>
<tr><td><b>Egress area</b></td><td>ขอบระหว่าง campus กับ network ภายนอก ทั้งผู้ใช้ภายในออกไปและผู้ใช้ภายนอกเข้ามา ติดตั้ง security จำนวนมาก</td><td>Firewall, IPS, Anti-DDoS, router</td></tr>
<tr><td><b>Data center area</b></td><td>ที่ตั้ง server และ application ให้บริการข้อมูล</td><td>server, DC switch</td></tr>
<tr><td><b>Network management area</b></td><td>จัดการและเฝ้าดู campus ทั้งหมด</td><td>SDN controller, wireless controller (AC), eLOG, network management system</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>ลำดับล่างขึ้นบน: access → aggregation → core; egress เชื่อมออกภายนอกจาก core</li>
<li>Security ของ egress: Firewall, IPS, Anti-DDoS</li>
<li>Management area: controller, AC, log server</li>
</ul></div>`
    },
    {
      t: "สถาปัตยกรรม Small, Medium และ Large Campus Network",
      ref: "หน้า 485-487",
      html: `
<table>
<tr><th>ขนาด</th><th>จำนวนผู้ใช้/อุปกรณ์</th><th>ลักษณะ</th></tr>
<tr><td><b>Small</b></td><td>ไม่กี่ถึงหลายสิบ user</td><td>จุดเดียว, <b>ไม่แบ่งชั้น</b>, ความต้องการง่าย, เน้นให้เข้าถึง resource ภายใน</td></tr>
<tr><td><b>Medium</b></td><td>user 200-2000 และอุปกรณ์ 25-100</td><td>เริ่มแบ่ง area ตามหน้าที่ (modular) ปกติเป็น 3 ชั้น core/aggregation/access + 2 พื้นที่: <b>data center</b> และ <b>egress</b></td></tr>
<tr><td><b>Large</b></td><td>จำนวน user มาก</td><td>หลายอาคาร หรือหลาย campus ในเมืองเชื่อมด้วย WAN; module ครบ: access, aggregation, core, egress, data center, network management; รองรับสาขา cloud DC และผู้ใช้เดินทาง/ทำงานที่บ้านผ่าน VPN</td></tr>
</table>
<h4>Small</h4>
<figure><img src="i/p486_1.webp" alt="small campus: router ต่อ switch ตัวเดียวที่เชื่อมคอมพิวเตอร์และ AP" loading="lazy"><figcaption>Fig. 15.3 Small campus network architecture (router, switch เดียว, AP และเครื่องผู้ใช้ ไม่แบ่งชั้น)</figcaption></figure>
<h4>Medium</h4>
<ul>
<li>ใช้ในสถานการณ์ส่วนใหญ่; data center วาง server องค์กร (intranet web, office system, database)</li>
<li>Egress layer เชื่อม Internet กับ core, ติด <b>firewall</b> ควบคุม traffic จาก intranet ไป Internet และป้องกันการบุกรุก และทำ <b>NAT</b> ที่ egress</li>
</ul>
<figure><img src="i/p487_1.webp" alt="medium campus: core, aggregation, access พร้อม data center และ egress" loading="lazy"><figcaption>Fig. 15.4 Medium campus network architecture (3 ชั้น + data center + egress พร้อม firewall)</figcaption></figure>
<h4>Large</h4>
<ul>
<li>ลักษณะ: coverage กว้าง user มาก ความต้องการซับซ้อน module ครบ ลำดับชั้นหลากหลาย</li>
<li>ที่ egress ต่อ cloud data center และสาขาผ่าน Internet/WAN; คนเดินทางและ work from home เข้ามาทาง Internet</li>
</ul>
<figure><img src="i/p487_2.webp" alt="large campus: headquarters ครบทุก module เชื่อมสาขา cloud และผู้ใช้ระยะไกล" loading="lazy"><figcaption>Fig. 15.5 Large campus network architecture (headquarters ครบทุก module เชื่อม branch, cloud DC และ remote user)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>Medium: 200-2000 user, 25-100 devices; Small ไม่แบ่งชั้น</li>
<li>Medium มี 2 พื้นที่ฟังก์ชัน: data center และ egress</li>
<li>Large มี network management area และต่อ branch / cloud / remote access</li>
</ul></div>`
    },
    {
      t: "15.1.3 Protocol และเทคโนโลยีที่ใช้ในแต่ละชั้น",
      ref: "หน้า 488-489",
      html: `
<figure><img src="i/p488_1.webp" alt="protocol และเทคโนโลยีที่ใช้ในแต่ละชั้นของ campus network" loading="lazy"><figcaption>Fig. 15.6 Protocols or technologies commonly used in campus networks</figcaption></figure>
<table>
<tr><th>ชั้น/พื้นที่</th><th>เทคโนโลยี</th></tr>
<tr><td><b>Access</b></td><td>VLAN, spanning tree, AAA, link aggregation</td></tr>
<tr><td><b>Aggregation</b></td><td>DHCP, stacking, link aggregation, spanning tree, OSPF, static routing</td></tr>
<tr><td><b>Core</b></td><td>stacking, OSPF, static routing, ACL</td></tr>
<tr><td><b>Egress</b></td><td>NAT, OSPF, static routing, PPPoE</td></tr>
<tr><td><b>Network management</b></td><td>SNMP (และ NETCONF), WLAN protocols สำหรับ AC/AP</td></tr>
</table>
<h4>ใช้ทำอะไร</h4>
<ul>
<li>core, aggregation switch, firewall และ router ที่ egress ต้องตั้ง <b>static หรือ dynamic routing</b> เพื่อให้ intranet คุยกันและออก Internet</li>
<li>Router ที่ egress ใช้ <b>NAT/NAPT</b> ให้ intranet ออก Internet และ <b>NAT Server</b> ให้เครื่องใน Internet เข้าถึง server ภายใน</li>
<li>Link ไปหา ISP เป็น WAN link อาจใช้ <b>PPPoE</b> หรือ PPP</li>
<li>Aggregation และ access switch ใช้ <b>spanning tree</b> ป้องกัน loop</li>
<li>Aggregation switch ทำ <b>inter-VLAN routing</b> และแจก IP ด้วย <b>DHCP</b></li>
<li>FIT AP ถูก configure จาก AC ผ่าน WLAN protocol; อุปกรณ์ถูก monitor ด้วย <b>SNMP</b> หรือ <b>NETCONF</b></li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Access: VLAN, STP, AAA, link aggregation</li>
<li>Aggregation: DHCP, inter-VLAN routing, STP, link aggregation</li>
<li>Egress: NAT, PPPoE, routing</li>
</ul></div>`
    },
    {
      t: "15.2 Lifecycle ของ Campus Network",
      ref: "หน้า 489",
      html: `
<p>Lifecycle เป็น <b>วงจรวนซ้ำ</b> ที่ถูกขับเคลื่อนโดยความต้องการของ application ที่เปลี่ยนไป แต่ละรอบมี 4 phase:</p>
<table>
<tr><th>Phase</th><th>งานหลัก</th></tr>
<tr><td><b>1. Planning and design</b></td><td>จุดเริ่มต้นของโครงการ: กำหนด physical topology, logical topology, เทคโนโลยีและ protocol ที่ใช้</td></tr>
<tr><td><b>2. Deployment and implementation</b></td><td>ส่งมอบงานจริง: ติดตั้งอุปกรณ์, stand-alone commissioning, interconnection testing, cutover และ grid connection</td></tr>
<tr><td><b>3. Operation and maintenance</b></td><td>ดูแลประจำวัน: maintenance, backup software และ configuration, centralized monitoring, upgrade software, troubleshooting</td></tr>
<tr><td><b>4. Network optimization</b></td><td>เมื่อ network ไม่ตอบโจทย์ธุรกิจหรือพบปัญหาแอบแฝง: ปรับปรุง security และ user experience</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>ลำดับ: Planning/Design → Deployment/Implementation → O&M → Optimization แล้ววนใหม่</li>
<li>Phase ที่เป็นจุดเริ่มต้นและวางรากฐาน = Planning and design</li>
</ul></div>`
    },
    {
      t: "15.3.1-15.3.2 กรณีศึกษา: ความต้องการ และ Networking Plan, VLAN, IP Address",
      ref: "หน้า 490-494",
      html: `
<h4>ความต้องการ (บริษัทราว 200 คน)</h4>
<ol>
<li>ตอบโจทย์ธุรกิจปัจจุบัน</li>
<li>topology ง่าย ดูแลง่าย</li>
<li>wired สำหรับพนักงานในสำนักงาน และ Wi-Fi สำหรับ visitor</li>
<li>จัดการ traffic แบบง่าย</li>
<li>ความปลอดภัยในระดับหนึ่ง</li>
</ol>
<h4>หัวข้อที่ต้องออกแบบ (8 เรื่อง)</h4>
<ol>
<li>Networking plan (เลือกอุปกรณ์, physical topology, ตั้งชื่ออุปกรณ์)</li>
<li>Basic service (VLAN, IP address, วิธีแจก IP, routing)</li>
<li>WLAN (networking, data forwarding)</li>
<li>Reliability</li>
<li>Layer 2 loop avoidance</li>
<li>Egress NAT</li>
<li>Security (traffic control, DHCP security, network management security)</li>
<li>Operation, maintenance, management (traditional / iMaster NCE)</li>
</ol>
<h4>1) Networking plan</h4>
<figure><img src="i/p491_1.webp" alt="topology: CORE-R1, Agg-S1, AC1, Acc-S1 ถึง Acc-S4 พร้อม AP และแผนกต่าง ๆ" loading="lazy"><figcaption>Fig. 15.7 Network topology (CORE-R1 รวม egress+core, Agg-S1, AC1, Acc-S1 ถึง Acc-S4)</figcaption></figure>
<ul>
<li>ใช้ <b>Layer 3 architecture</b>; <b>access</b> = S3700 (ให้ PC/printer เชื่อม), <b>aggregation</b> = S5700 ทำหน้าที่ gateway ของ Layer 2 network, <b>core + egress รวมกัน</b> = router AR2240</li>
<li>ตั้งชื่อให้จำง่ายและขยายได้: Acc-S1, Acc-S2, ... สำหรับ access (Acc = Access) และ Agg-S1, ... สำหรับ aggregation (Agg = Aggregation)</li>
<li>เลือก interface เชื่อมให้เพียงพอกับ bandwidth</li>
</ul>
<h4>2a) VLAN design</h4>
<ul>
<li>เลข VLAN ควรต่อเนื่อง; แยกชนิด: <b>service VLAN</b>, <b>management VLAN</b>, <b>interconnection VLAN</b></li>
<li>Service VLAN แบ่งได้ตามพื้นที่ทางภูมิศาสตร์, logical, โครงสร้างบุคลากร, ชนิดบริการ</li>
<li>Management VLAN: ใช้ remote management ต้องมี IP/mask/default route; switch ใน L2 domain เดียวกันควรใช้ management VLAN เดียวกันและ address segment เดียวกัน ปกติใช้ <b>VLANIF address</b></li>
</ul>
<table>
<tr><th>VLAN</th><th>คำอธิบาย</th><th>ประเภท</th></tr>
<tr><td>1</td><td>Guest VLAN / service VLAN ของ WLAN</td><td>Service</td></tr>
<tr><td>2</td><td>R&amp;D</td><td>Service</td></tr>
<tr><td>3</td><td>Marketing</td><td>Service</td></tr>
<tr><td>4</td><td>Administration</td><td>Service</td></tr>
<tr><td>100</td><td>Management VLAN ของ Layer 2 device</td><td>Management</td></tr>
<tr><td>101</td><td>Management VLAN ของ WLAN (AP-AC, CAPWAP)</td><td>Management</td></tr>
<tr><td>102</td><td>Interconnection ระหว่าง Agg-S1 กับ CORE-R1</td><td>Interconnection</td></tr>
</table>
<h4>2b) IP address design</h4>
<ul>
<li><b>Gateway</b> ใช้ address ที่ใช้ได้ <b>ตัวสุดท้ายหรือตัวแรก</b> ของ segment (เช่น 192.168.80.0/24 ใช้ .254 หรือ .1) เพื่อไม่ชนเครื่องลูกข่าย</li>
<li>แต่ละ service VLAN ควรมี address ที่ต่อเนื่องและ aggregate ได้ เพื่อ route summarization</li>
<li>แนะนำ mask <b>/24</b> สำหรับ service segment; ต้องเผื่อจำนวนผู้ใช้</li>
<li>Management address ของ switch ควรอยู่ segment เดียวกัน</li>
<li>การเชื่อมระหว่างอุปกรณ์เครือข่ายใช้ mask <b>/30</b> และให้อุปกรณ์ core ใช้ address ที่น้อยกว่า</li>
</ul>
<table>
<tr><th>Segment</th><th>Gateway</th><th>VLAN</th><th>หมายเหตุ</th></tr>
<tr><td>192.168.1.0/24</td><td>192.168.1.254</td><td>1</td><td>Guest wireless, gateway อยู่ที่ Agg-S1</td></tr>
<tr><td>192.168.2.0/24</td><td>192.168.2.254</td><td>2</td><td>R&amp;D</td></tr>
<tr><td>192.168.3.0/24</td><td>192.168.3.254</td><td>3</td><td>Marketing</td></tr>
<tr><td>192.168.4.0/24</td><td>192.168.4.254</td><td>4</td><td>Administration</td></tr>
<tr><td>192.168.100.0/24</td><td>192.168.100.254</td><td>100</td><td>Management ของ L2 device</td></tr>
<tr><td>192.168.101.0/24</td><td>192.168.101.254</td><td>101</td><td>Management ของ WLAN (AC ใช้ .1)</td></tr>
<tr><td>192.168.102.0/30</td><td>-</td><td>102</td><td>Agg-S1 (.2) ↔ CORE-R1 GE0/0/1 (.1)</td></tr>
<tr><td>1.1.1.1/32</td><td>-</td><td>-</td><td>Loopback ของ CORE-R1 ใช้เป็น management IP</td></tr>
</table>
<div class="note"><b>หมายเหตุ</b> Link /30 มี host ได้ 2 ตัว (192.168.102.1 และ 192.168.102.2) พอดีกับ router ปลายทั้งสอง</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>Core+egress รวมกันในเครือข่ายเล็ก = AR2240; Agg-S1 เป็น gateway ของทุก VLAN</li>
<li>VLAN แยก service / management / interconnection</li>
<li>Gateway = address แรกหรือสุดท้าย; interconnection = /30</li>
</ul></div>`
    },
    {
      t: "การแจก IP Address และ Routing Design",
      ref: "หน้า 493-495",
      html: `
<h4>วิธีแจก IP (หลักการ)</h4>
<table>
<tr><th>กลุ่ม</th><th>วิธีที่แนะนำ</th></tr>
<tr><td>WAN interface</td><td>carrier กำหนด: static หรือ dynamic (DHCP/PPPoE) ต้องประสานกับ carrier ล่วงหน้า</td></tr>
<tr><td>server, printer, IP camera, เครื่องตอกบัตร</td><td><b>Static</b> (หรือ bind IP กับ MAC ผ่าน DHCP)</td></tr>
<tr><td>user terminal (PC, IP phone)</td><td><b>DHCP</b> จาก gateway รวมศูนย์</td></tr>
<tr><td>อุปกรณ์เครือข่าย</td><td>Static (ยกเว้น AP ที่ใช้ DHCP)</td></tr>
</table>
<table>
<tr><th>Segment / interface</th><th>วิธี</th><th>รายละเอียด</th></tr>
<tr><td>192.168.1.0/24, 2.0, 3.0, 4.0</td><td>DHCP</td><td>แจกโดย Agg-S1; server/printer ใช้ fixed IP</td></tr>
<tr><td>192.168.100.0/24</td><td>Static</td><td>management IP ของอุปกรณ์</td></tr>
<tr><td>192.168.101.0/24</td><td>DHCP</td><td>AP แจกโดย Agg-S1; AC ใช้ static</td></tr>
<tr><td>192.168.102.0/30</td><td>Static</td><td>interconnection</td></tr>
<tr><td>CORE-R1 GE0/0/0</td><td>PPPoE</td><td>address จาก carrier</td></tr>
</table>
<h4>Route design</h4>
<ul>
<li><b>Internal routing</b>: เครือข่ายเล็ก จึงใช้ <b>static route</b> ได้ ไม่ต้องใช้ routing protocol ซับซ้อน; AP สร้าง default route อัตโนมัติเมื่อได้ IP จาก DHCP</li>
<li><b>Egress routing</b>: ให้ผู้ใช้ภายในเข้า Internet/WAN ได้ แนะนำ <b>static default route</b> ที่ egress device</li>
</ul>
<figure><img src="i/p495_1.webp" alt="topology พร้อม VLANIF address และ static route บน Agg-S1 และ CORE-R1" loading="lazy"><figcaption>Fig. 15.8 Interface address and routing configuration (VLANIF 1-4, 100-102 บน Agg-S1; default route และ summary route 192.168.0.0/16)</figcaption></figure>
<pre><code>[Agg-S1]ip route-static 0.0.0.0 0 192.168.102.1               --default ไป CORE-R1
[CORE-R1]ip route-static 0.0.0.0 0 22.1.2.1                   --default ไป ISP-R1
[CORE-R1]ip route-static 192.168.0.0 16 192.168.102.2         --summary เข้า intranet ผ่าน Agg-S1</code></pre>
<ul>
<li>Agg-S1 มี default route ไปที่ <b>192.168.102.1</b> (GE0/0/1 ของ CORE-R1)</li>
<li>CORE-R1 มี default route ไป <b>22.1.2.1</b> (ISP-R1) และ route สรุป intranet เป็น <b>192.168.0.0/16</b> ชี้ next hop ไป <b>192.168.102.2</b> (VLANIF 102 ของ Agg-S1) ซึ่งสรุปรวม 192.168.1.0 ถึง 192.168.102.x ได้ทั้งหมด</li>
<li>Switch access และ AC ต้องมี default route ไปหา gateway ของ management VLAN เพื่อให้ admin เข้าถึงข้าม segment ได้ (เช่น 0.0.0.0 ไป 192.168.100.254 และ 192.168.101.254)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>เครือข่ายเล็ก: static route เพียงพอ และ egress ใช้ static default route</li>
<li>CORE-R1: default ไป ISP + summary 192.168.0.0/16 กลับ intranet</li>
<li>Terminal ใช้ DHCP, server/printer ใช้ static (หรือ bind MAC)</li>
</ul></div>`
    },
    {
      t: "WLAN Design",
      ref: "หน้า 495-497",
      html: `
<h4>(a) WLAN networking: 4 แบบ</h4>
<p>แบ่งตาม IP ของ AC และ AP และตามว่าข้อมูลผ่าน AC หรือไม่: <b>directly connected Layer 2</b>, <b>Layer 2 แบบ bypass</b>, <b>directly connected Layer 3</b>, <b>Layer 3 แบบ bypass</b> กรณีนี้เลือก <b>Layer 2 networking แบบ bypass</b> (AC ต่อแยกไว้ข้างเครือข่าย ไม่อยู่บนเส้นทางข้อมูล)</p>
<figure><img src="i/p495_2.webp" alt="Layer 2 bypass: AC ต่อกับ Agg-S1 ที่เป็น DHCP server, AP ได้ address 192.168.101.X" loading="lazy"><figcaption>Fig. 15.9 Layer 2 networking in bypass mode (AC 192.168.101.1, Agg-S1 เป็น DHCP server, AP อยู่ใน 192.168.101.0/24)</figcaption></figure>
<h4>(b) Data forwarding mode</h4>
<ul>
<li>ข้อมูลใน WLAN มี <b>control message</b> และ <b>data message</b></li>
<li>Control message ส่งผ่าน <b>CAPWAP tunnel</b> ระหว่าง AP กับ AC เสมอ</li>
<li>Data message ส่งได้ 2 แบบ: <b>tunnel forwarding</b> (ผ่าน AC) หรือ <b>direct forwarding</b> (ออกทาง switch ตรง ไม่ผ่าน AC) กรณีนี้เลือก <b>direct forwarding</b></li>
</ul>
<figure><img src="i/p496_1.webp" alt="CAPWAP tunnel ส่ง control message ระหว่าง AP กับ AC ส่วนข้อมูลผู้ใช้ไปทางตรง" loading="lazy"><figcaption>Fig. 15.10 Direct forwarding (control ผ่าน CAPWAP tunnel ไป AC, data ผู้ใช้ส่งตรงออก network)</figcaption></figure>
<h4>(c) ออกแบบอื่น ๆ</h4>
<ul>
<li><b>Coverage</b>: signal ครอบคลุมพื้นที่และแก้ปัญหา co-channel interference ระหว่าง AP ข้างเคียง</li>
<li><b>Capacity</b>: จำนวน AP ตาม bandwidth ที่ต้องการ จำนวน terminal จำนวนที่ใช้พร้อมกัน และสมรรถนะของ AP แต่ละตัว</li>
<li><b>AP layout</b>: ตำแหน่ง วิธีติดตั้ง และการจ่ายไฟ</li>
<li>ยังมี WLAN security และ roaming design (ไม่ลงรายละเอียดในบท)</li>
</ul>
<h4>ตารางรายการ configure WLAN ของกรณีนี้</h4>
<table>
<tr><th>รายการ</th><th>ค่า</th></tr>
<tr><td>AP management VLAN</td><td>VLAN 101</td></tr>
<tr><td>STA service VLAN</td><td>VLAN 1</td></tr>
<tr><td>DHCP server</td><td>Agg-S1 (แจกทั้ง AP และ STA); gateway ของ STA = 192.168.1.254</td></tr>
<tr><td>AP address pool</td><td>192.168.101.2 - 192.168.101.253/24</td></tr>
<tr><td>STA address pool</td><td>192.168.1.1 - 192.168.1.253/24</td></tr>
<tr><td>AC source interface</td><td>VLANIF 101: 192.168.101.1/24</td></tr>
<tr><td>AP group</td><td>ap-group1 อ้างอิง VAP profile WLAN-Guest และ regulatory domain profile default</td></tr>
<tr><td>Regulatory domain profile</td><td>default (country code CN)</td></tr>
<tr><td>SSID profile</td><td>WLAN-Guest (SSID: WLAN-Guest)</td></tr>
<tr><td>Security profile</td><td>WLAN-Guest: WPA-WPA2 + PSK + AES</td></tr>
<tr><td>VAP profile</td><td>WLAN-Guest: direct forwarding, service VLAN 1, อ้าง SSID และ security profile</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Control ผ่าน CAPWAP tunnel; data ใช้ direct forwarding หรือ tunnel forwarding</li>
<li>กรณีศึกษา: Layer 2 bypass + direct forwarding; AP management VLAN 101, STA VLAN 1</li>
<li>Coverage / capacity / AP layout เป็น 3 งานออกแบบ wireless</li>
</ul></div>`
    },
    {
      t: "Reliability และ Layer 2 Loop Avoidance",
      ref: "หน้า 496-499",
      html: `
<h4>Network reliability</h4>
<p>access และ aggregation ใช้ switch เป็นหลัก reliability แบ่งเป็น 2 ระดับ</p>
<table>
<tr><th>ระดับ</th><th>วิธี</th><th>ข้อดี/ข้อสังเกต</th></tr>
<tr><td><b>Port-level</b></td><td>Ethernet <b>link aggregation</b> (Eth-Trunk, LACP) ระหว่าง access ↔ aggregation, AC ↔ Agg, AP ↔ access</td><td>เพิ่ม reliability และ bandwidth ใช้อุปกรณ์น้อย ประหยัด</td></tr>
<tr><td><b>Device-level</b></td><td>dual aggregation / dual core layer หรือ iStack / CSS</td><td>ทนอุปกรณ์เสียทั้งตัว แต่ใช้อุปกรณ์มากขึ้น ค่าใช้จ่ายสูง</td></tr>
</table>
<figure><img src="i/p498_1.webp" alt="link aggregation ระหว่าง Agg-S1 กับ AC1 และ Acc-S1 ถึง Acc-S4 และระหว่าง AP กับ Acc-S1" loading="lazy"><figcaption>Fig. 15.11 Port-level reliability (link aggregation ระหว่าง Agg-S1 กับ AC1/Acc-S1 ถึง Acc-S4 และ AP1/AP2 กับ Acc-S1)</figcaption></figure>
<figure><img src="i/p498_2.webp" alt="device-level reliability ด้วยอุปกรณ์ aggregation คู่" loading="lazy"><figcaption>Fig. 15.12 Device-level reliability (อุปกรณ์คู่ในชั้น aggregation/core)</figcaption></figure>
<p>กรณีนี้เลือก <b>port-level</b> เพราะใช้อุปกรณ์น้อยกว่าและประหยัดต้นทุนกว่า</p>
<h4>Layer 2 loop avoidance</h4>
<ul>
<li>เมื่อใช้ port-level ไม่มี redundant link ใน segment จึง <b>ไม่มี loop</b> โดยการออกแบบ</li>
<li>แต่พนักงานอาจเสียบสาย switch สองตัวเข้าหากันโดยไม่ตั้งใจ จึงเกิด loop ได้</li>
<li>แก้ด้วยเปิด spanning tree: ใช้ <b>RSTP</b> และ <b>กำหนด Agg-S1 เป็น root bridge ด้วยมือ</b></li>
</ul>
<figure><img src="i/p499_1.webp" alt="loop avoidance: RSTP บน switch และ Agg-S1 เป็น root bridge" loading="lazy"><figcaption>Fig. 15.13 Loop avoidance (เปิด RSTP ทุก switch, Agg-S1 เป็น root bridge)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>Port-level = link aggregation; Device-level = อุปกรณ์สำรอง/stack (iStack, CSS)</li>
<li>กรณีนี้: port-level + RSTP + Agg-S1 เป็น root bridge</li>
<li>Link aggregation เพิ่มทั้ง reliability และ bandwidth</li>
</ul></div>`
    },
    {
      t: "Egress NAT Design",
      ref: "หน้า 499-500",
      html: `
<p>Intranet ใช้ private address จึงต้อง <b>NAT</b> ที่ router ซึ่งต่อ Internet (มี public address) ชนิดของ NAT และสถานการณ์ที่เหมาะ:</p>
<table>
<tr><th>ชนิด</th><th>เหมาะกับ</th><th>ลักษณะสำคัญ</th></tr>
<tr><td><b>Static NAT</b></td><td>มี public IP คงที่จำนวนมาก และเครื่องในต้องใช้ address คงที่</td><td>1:1; Internet เข้าถึงเครื่องข้างในผ่าน public address ได้</td></tr>
<tr><td><b>Dynamic NAT</b> (address pool)</td><td>มี pool ของ public address</td><td>intranet เริ่มออก Internet ได้ แต่ Internet เริ่มเข้ามาไม่ได้; public address 1 ตัวแปลงให้เครื่องเดียวในขณะนั้น</td></tr>
<tr><td><b>NAPT</b></td><td>public address ใน pool มีจำกัด และเครื่องในมากกว่า address</td><td>แปลง port ด้วย ประหยัด public address ใช้ address ได้คุ้มค่า</td></tr>
<tr><td><b>Easy IP</b></td><td>interface ที่ต่อ Internet ได้ address แบบ <b>dynamic</b></td><td>ใช้ address ของ interface ทำ NAPT ไม่ต้องมี pool</td></tr>
<tr><td><b>NAT Server</b></td><td>เครื่องใน intranet ให้บริการแก่ Internet (เช่น web server)</td><td>Internet เข้าถึง service ภายในผ่าน public address ของ router</td></tr>
</table>
<p>กรณีนี้เลือก <b>Easy IP</b> (CORE-R1 dial PPPoE ได้ public address ไม่คงที่ทุกครั้ง) และไม่ต้องตั้ง NAT Server</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Address dynamic จาก PPPoE/DHCP → Easy IP</li>
<li>เปิดบริการให้ Internet เข้าถึง → NAT Server</li>
<li>address น้อยกว่าเครื่อง → NAPT</li>
</ul></div>`
    },
    {
      t: "Security Design และ Operation/Management Design",
      ref: "หน้า 500-502",
      html: `
<p>Security ในกรณีนี้มี 3 ด้าน ใช้ router และ switch ทำได้: traffic control, DHCP security และ network management security</p>
<h4>(a) Traffic control</h4>
<figure><img src="i/p500_1.webp" alt="R&D marketing administration คุยกันได้แต่ออก Internet ไม่ได้ guest ออก Internet ได้แต่เข้า intranet ไม่ได้" loading="lazy"><figcaption>Fig. 15.14 Traffic control (แผนกใน intranet คุยกันได้ แต่ไม่ออก Internet; guest ออก Internet ได้ แต่เข้า intranet ไม่ได้)</figcaption></figure>
<ul>
<li>เป้าหมาย: R&amp;D / marketing / administration เข้าถึงกันได้ แต่ <b>ไม่ออก Internet</b>; guest <b>ออก Internet ได้ แต่ไม่เข้า campus network</b></li>
<li>ใช้ <b>traffic-policy / traffic-filter</b> ควบคุม traffic และ <b>NAPT</b> ให้ guest ออก Internet (ACL กำหนด segment ที่ NAT ได้)</li>
<li>ACL เพียง 2 rule: อนุญาต guest และ deny ที่เหลือ แล้วตั้ง Easy IP ที่ egress</li>
</ul>
<pre><code>[CORE-R1]acl 2000
[CORE-R1-acl-basic-2000]rule 5 permit source 192.168.1.0 0.0.0.255
[CORE-R1-acl-basic-2000]rule 10 deny
[CORE-R1-GigabitEthernet0/0/0]nat outbound 2000   --Easy IP ตาม ACL 2000</code></pre>
<p><code>0.0.0.255</code> เป็น <b>wildcard mask</b> (แบบกลับของ 255.255.255.0) ใช้จับ 192.168.1.0/24 ทั้ง segment</p>
<h4>(b) DHCP security: DHCP Snooping</h4>
<p>ปัญหาที่พบบ่อย: พนักงานเสียบ <b>home router ที่เปิด DHCP</b> ทำให้เครื่องอื่นได้ address ผิด เกิด address conflict และออก Internet ไม่ได้ แก้ด้วย <b>DHCP Snooping</b> บน access switch โดยตั้ง <b>uplink port เป็น trusted</b></p>
<figure><img src="i/p501_1.webp" alt="Acc-S4 เปิด DHCP snooping ให้ E0/0/1 ไป Agg-S1 เป็น trusted port ส่วน home router ถูกกัน" loading="lazy"><figcaption>Fig. 15.15 DHCP security (DHCP snooping บน access switch, trusted port ชี้ไปหา DHCP server จริงที่ Agg-S1)</figcaption></figure>
<pre><code>[Acc-S4]dhcp enable
[Acc-S4]dhcp snooping enable
[Acc-S4]vlan 4
[Acc-S4-vlan4]dhcp snooping enable
[Acc-S4]interface Ethernet 0/0/1
[Acc-S4-Ethernet0/0/1]dhcp snooping trusted</code></pre>
<p>ผล: DHCP reply รับได้เฉพาะจาก trusted port; DHCP request ของ PC ถูกส่งไปทาง trusted port เท่านั้น</p>
<h4>(c) Network management security</h4>
<ul>
<li>ใช้ <b>ACL</b> จำกัดให้เฉพาะ admin (IP คงที่) login ผ่าน Telnet/Web ได้ (ACL ผูกที่ VTY)</li>
<li>การจัดการรวมศูนย์ใช้ <b>SNMP</b>; <b>SNMPv3</b> เพิ่ม authentication และ encryption ปลอดภัยกว่า</li>
</ul>
<h4>Operation, maintenance, management design</h4>
<ul>
<li><b>Traditional</b>: เข้า device โดยตรงด้วย Telnet, Web, SSH (admin ต้อง reach IP ของอุปกรณ์ได้); ถ้าอุปกรณ์มากใช้ซอฟต์แวร์รวมศูนย์แบบ SNMP</li>
<li><b>iMaster NCE</b>: จัดการแบบ "autopilot" ผ่าน <b>OpenFlow, NETCONF, Telemetry</b></li>
</ul>
<figure><img src="i/p502_x1.webp" alt="การจัดการแบบดั้งเดิมผ่าน Telnet, Web, SSH, SNMP ผ่าน LAN" loading="lazy"><figcaption>Fig. 15.16 Traditional device management (Telnet, Web, SSH, SNMP ผ่าน LAN)</figcaption></figure>
<figure><img src="i/p502_2.webp" alt="iMaster NCE จัดการอุปกรณ์ผ่าน OpenFlow, Telemetry, NETCONF" loading="lazy"><figcaption>Fig. 15.17 iMaster NCE platform management (OpenFlow, Telemetry, NETCONF)</figcaption></figure>
<p>กรณีนี้เลือก <b>traditional device management</b></p>
<div class="must"><b>ต้องจำ</b><ul>
<li>ACL 2000: rule 5 permit 192.168.1.0 0.0.0.255, rule 10 deny; ผูก <code>nat outbound 2000</code></li>
<li>DHCP snooping: เปิดที่ switch/VLAN และตั้ง uplink เป็น <code>dhcp snooping trusted</code></li>
<li>SNMPv3 > SNMPv1/v2c ด้านความปลอดภัย; iMaster NCE ใช้ NETCONF/Telemetry/OpenFlow</li>
</ul></div>`
    },
    {
      t: "15.3.3 Deployment: ขั้นตอน Configure และ Test",
      ref: "หน้า 503-508",
      html: `
<p>ก่อน configure ให้ <b>ทำรายการ (table) ของค่าที่จะตั้ง</b> เพื่อลดความผิดพลาด แล้ว configure ตามรายการ จากนั้น <b>test</b> ว่าทำงานตามที่ออกแบบ</p>
<h4>(a) Port และ link aggregation</h4>
<ul>
<li>กำหนดเลข Eth-Trunk, mode, member port, description ในตาราง ตัวอย่าง: Acc-S1 ถึง Acc-S4 และ AC1 ต่อ Agg-S1 ด้วย Eth-Trunk แบบ <b>LACP-static</b> มี member 3 พอร์ตต่อ trunk (ฝั่ง access ใช้ GE0/0/1, 0/0/2, 0/0/3; ฝั่ง Agg-S1 เช่น Eth-Trunk 1 ใช้ GE0/0/3, 0/0/7, 0/0/8 ไปหา Acc-S1 และ Eth-Trunk 2 ถึง 4 ทำนองเดียวกันไป Acc-S2 ถึง Acc-S4)</li>
<li>Description เช่น <code>to Agg-S1's eth-trunk 1</code>; ควรเขียนให้ชัดเจนทุกพอร์ต</li>
</ul>
<h4>(b) VLAN และชนิดพอร์ต</h4>
<ul>
<li>สร้าง 4 service VLAN, 2 management VLAN, 1 interconnection VLAN (ตามตาราง VLAN)</li>
<li>Eth-Trunk เป็น <b>Trunk</b> และ <b>PVID 100</b> เหมือนกัน และ <b>allow-pass เฉพาะ VLAN ที่จำเป็น</b></li>
<li>ตัวอย่าง: Acc-S1 Eth-Trunk 1 → allow 1, 100, 101; Acc-S2 → allow 2, 100; Acc-S3 → allow 3, 100; Acc-S4 → allow 4, 100; พอร์ตที่ต่อ AP ใช้ PVID 101 (allow 1, 101); พอร์ตผู้ใช้เป็น <b>Access</b> ที่ default VLAN ของแผนก (2, 3, 4)</li>
<li>บน Agg-S1: GE0/0/1 ไป AC1 (access VLAN 101), GE0/0/2 ไป CORE-R1 (access VLAN 102)</li>
</ul>
<h4>(c) Static address (VLANIF)</h4>
<table>
<tr><th>อุปกรณ์</th><th>Interface</th><th>Address</th></tr>
<tr><td>Agg-S1</td><td>VLANIF 1, 2, 3, 4</td><td>192.168.1.254, 2.254, 3.254, 4.254 /24 (address สุดท้ายของ VLAN)</td></tr>
<tr><td>Agg-S1</td><td>VLANIF 100, 101</td><td>192.168.100.254/24, 192.168.101.254/24</td></tr>
<tr><td>Agg-S1</td><td>VLANIF 102</td><td>192.168.102.2/30</td></tr>
<tr><td>CORE-R1</td><td>GE0/0/1</td><td>192.168.102.1/30</td></tr>
<tr><td>CORE-R1</td><td>GE0/0/0</td><td>PPPoE (ไม่ใช่ static)</td></tr>
<tr><td>CORE-R1</td><td>Loopback 0</td><td>1.1.1.1/32</td></tr>
<tr><td>Access switch</td><td>VLANIF 100</td><td>192.168.100.1 ถึง .4 /24 (management)</td></tr>
<tr><td>AC1</td><td>VLANIF 101</td><td>192.168.101.1/24</td></tr>
</table>
<h4>(d) DHCP บน Agg-S1</h4>
<ul>
<li>สร้าง pool สำหรับ VLAN 1-4 (guest, R&amp;D, marketing, administration) และ pool ของ AP ใน management VLAN 101 (หนังสือเขียนว่า "4 pool" แต่ Table 15.10 แสดง 5 segment: 1, 2, 3, 4 และ 101)</li>
<li>แต่ละ pool ต้องมี <b>gateway, DNS, lease time</b> ตามระยะเวลาที่ terminal อยู่ในเครือข่าย</li>
<li>อุปกรณ์ที่ต้องได้ IP คงที่ (printer, FTP server, admin PC): <b>bind IP กับ MAC</b></li>
<li>address ที่ถูกใช้แล้ว (เช่น AC 192.168.101.1) ต้อง <b>exclude</b> ออกจาก pool</li>
</ul>
<h4>(e) Routing</h4>
<ul>
<li>Access switch และ AC1: default route ไปยัง gateway ของ management VLAN (192.168.100.254 หรือ 192.168.101.254) เพื่อให้ admin เข้าถึงข้าม segment</li>
<li>Agg-S1: default route ไป CORE-R1 (192.168.102.1)</li>
<li>CORE-R1: summary route 192.168.0.0/16 → 192.168.102.2 และ default route ออก Internet</li>
</ul>
<h4>(f) Network management, (g) Egress, (h) WLAN, (i) Security</h4>
<ul>
<li>จัดการด้วย <b>Telnet</b> และ authentication แบบ <b>local AAA</b>: สร้าง user, ตั้ง password, อนุญาต Telnet, กำหนด privilege level; ใช้ username/password ที่ซับซ้อนและไม่ซ้ำกัน บันทึกไว้</li>
<li>Egress: CORE-R1 GE0/0/0 dial <b>PPPoE</b> + <b>Easy IP</b> (public address ไม่คงที่)</li>
<li>WLAN: configure ตามตารางออกแบบ (AP group, SSID, security, VAP profile)</li>
<li>Security: <b>basic ACL + NAT</b> บน CORE-R1 (permit 192.168.1.0/24), <b>advanced ACL + traffic-filter</b> (block source 192.168.1.0/24 ไป intranet segment, อนุญาตอื่น), <b>ACL ที่ VTY</b> (permit เฉพาะ IP admin wildcard 0), <b>DHCP snooping</b> บน access switch ทุกตัวและ uplink เป็น trusted</li>
</ul>
<h4>Network testing</h4>
<table>
<tr><th>ประเภท</th><th>รายการ</th></tr>
<tr><td><b>Connectivity</b></td><td>link interconnection, Layer 2 interconnection, Layer 3 interconnection</td></tr>
<tr><td><b>High reliability</b></td><td>loop avoidance function, path switching</td></tr>
<tr><td><b>Service performance</b></td><td>service traffic, access control</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>เตรียมตาราง configuration ก่อนตั้งค่าเสมอ</li>
<li>Trunk ของ Eth-Trunk: PVID 100 และ allow-pass เฉพาะ VLAN ที่ใช้</li>
<li>Test 3 กลุ่ม: connectivity, high reliability, service performance</li>
</ul></div>`
    },
    {
      t: "15.3.4 Operation and Maintenance ของ Campus Network ขนาดเล็ก",
      ref: "หน้า 508-511",
      html: `
<p>เมื่อระบบ online เข้าสู่ phase operation and maintenance: การตรวจและบำรุงรักษาอุปกรณ์เป็น <b>งานป้องกันประจำวัน</b> เพื่อพบและกำจัดข้อบกพร่องก่อนเกิดปัญหา ให้ระบบเสถียรและปลอดภัยระยะยาว</p>
<h4>1) สภาพแวดล้อมห้องเซิร์ฟเวอร์</h4>
<table>
<tr><th>ปัจจัย</th><th>ระยะยาว</th><th>ระยะสั้น</th></tr>
<tr><td>อุณหภูมิ</td><td>0 ถึง 45 °C</td><td>-5 ถึง 55 °C</td></tr>
<tr><td>ความชื้นสัมพัทธ์ (RH)</td><td>10% ถึง 95%</td><td>5% ถึง 95%</td></tr>
</table>
<ul>
<li>อุณหภูมิเกินระยะยาว: ตรวจ/ซ่อม/เปลี่ยนแอร์ ตรวจ switch ที่เกี่ยวข้อง</li>
<li>ความชื้นสูง: ติด dehumidifier; แห้งไป: ติด humidifier</li>
</ul>
<h4>2) ฮาร์ดแวร์</h4>
<ul>
<li><b>ความสะอาด</b>: ไม่มีฝุ่นเกาะ มี dust net ที่ตัวเครื่อง ภายใน และใน rack ทำความสะอาด/เปลี่ยนสม่ำเสมอ</li>
<li><b>ระบายความร้อน</b>: พัดลมต้องทำงานตลอด (ยกเว้นตอนทำความสะอาด) ห้ามปิดเอง ห้ามวางของที่ช่องลม</li>
<li><b>สายไฟ/สายสัญญาณ</b>: วางแยกกัน เป็นระเบียบ</li>
<li><b>ป้ายสาย</b> ชัดเจนถูกต้องตามมาตรฐาน</li>
<li><b>ลักษณะอุปกรณ์</b>: ครบถ้วน; slot ว่างต้องมีแผ่นปิด (dummy panel)</li>
</ul>
<h4>3) Alarm และ configuration</h4>
<table>
<tr><th>รายการ</th><th>เกณฑ์/แนวปฏิบัติ</th></tr>
<tr><td>Alarm</td><td>ปกติไม่ควรมี; ถ้ามีต้องบันทึก และ alarm ร้ายแรงวิเคราะห์ทันที</td></tr>
<tr><td>Log</td><td>ไม่ควรมีข้อความซ้ำจำนวนมาก; ถ้ามีวิเคราะห์ทันที</td></tr>
<tr><td>CPU</td><td>ควรต่ำกว่า <b>80%</b>; สูงนานให้ตรวจสาเหตุ</td></tr>
<tr><td>Memory</td><td>ควรต่ำกว่า <b>80%</b></td></tr>
<tr><td>Interface traffic</td><td>utilization เกิน <b>80%</b> ของ bandwidth ต้องบันทึกและยืนยัน; ดู error counter ขาเข้า/ออก โดยเฉพาะที่เพิ่มขึ้น</td></tr>
<tr><td>Interface/link status</td><td>ที่ใช้งาน = UP; ที่ไม่ใช้ = SHUTDOWN</td></tr>
<tr><td>Debug switch</td><td>ปกติ <b>ปิดทั้งหมด</b></td></tr>
<tr><td>Configuration file</td><td>running config ต้องเหมือน saved config</td></tr>
<tr><td>Flash</td><td>ไฟล์ใน Flash ต้องมีประโยชน์ ที่ไม่ใช่ให้ลบ (delete/unreserved)</td></tr>
<tr><td>Admin-level user</td><td>ต้องตั้ง password แบบ <b>cipher</b> ยาวกว่า 6 หลัก</td></tr>
<tr><td>Telnet login</td><td>ต้อง authenticate, password cipher และไม่ง่ายเกินไป</td></tr>
<tr><td>Telnet และ serial</td><td>ทดสอบให้ login ได้ทั้งสองทาง</td></tr>
<tr><td>เปลี่ยน password</td><td>เปลี่ยนเป็นระยะ แนะนำทุก <b>quarter</b></td></tr>
<tr><td>Interface config</td><td>interface DOWN (ที่ไม่ใช่ SHUTDOWN) ไม่ควรมี config; interface UP ต้องมี config</td></tr>
<tr><td>Interface description</td><td>แนะนำรูปแบบ: <code>Local device_Local port -&gt; Peer device_Peer port_Port rate</code></td></tr>
<tr><td>Interface mode</td><td>rate/duplex ต้องตรงกับ peer; Trunk/Access ต้องตรงกัน (ตรวจด้วย <code>display interface</code>)</td></tr>
<tr><td>System time</td><td>ตรวจด้วย <code>display clock</code> ต้องตรงเวลาจริง ผิดไม่เกิน <b>5 นาที</b></td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>CPU, memory &lt; 80%; interface utilization &gt; 80% ต้องบันทึก</li>
<li>ห้องเซิร์ฟเวอร์ 0-45 °C และ 10-95% RH (ระยะยาว)</li>
<li>เวลาคลาดเคลื่อนไม่เกิน 5 นาที; เปลี่ยน password ทุก quarter; running = saved config</li>
</ul></div>`
    },
    {
      t: "15.3.5 Network Optimization",
      ref: "หน้า 511-512",
      html: `
<p>เมื่อ requirement เปลี่ยนต้องวางแผน optimization ที่เหมาะกับสถานการณ์จริง ตัวอย่างในกรณีศึกษา: ศูนย์ต้อนรับ (reception center) ต้องการควบคุมและรักษาความปลอดภัยของ guest มากขึ้น และจำกัด bandwidth ต่อ guest จึงต้องติด <b>firewall ที่ egress</b> เพื่อตั้ง security policy และ bandwidth restriction อีกตัวอย่าง: จำนวน guest เพิ่ม ทำให้ CORE-R1 ประสิทธิภาพไม่พอ ต้อง <b>upgrade</b> อุปกรณ์</p>
<table>
<tr><th>แนวทาง optimization</th><th>ตัวอย่าง</th></tr>
<tr><td><b>Device performance</b></td><td>อัพเกรดฮาร์ดแวร์, เปลี่ยนเป็นรุ่นที่แรงขึ้น, อัพเดทซอฟต์แวร์เวอร์ชัน</td></tr>
<tr><td><b>Network infrastructure</b></td><td>ปรับสถาปัตยกรรม เช่น single link → dual link ออก Internet, WLAN data forwarding จาก direct เป็น tunnel; ปรับ routing เช่น static → dynamic routing ใน intranet</td></tr>
<tr><td><b>Service quality</b></td><td>สำรอง bandwidth สูงให้ guest บางกลุ่ม, ให้ priority กับ voice และ video</td></tr>
</table>
<div class="note"><b>หมายเหตุ</b> ผลของ optimization คือเพิ่มความปลอดภัยและความน่าเชื่อถือโดยรวม เพื่อสนับสนุนธุรกิจ แล้วเข้าสู่วงจร lifecycle รอบถัดไป</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>3 แนวทาง: device performance, network infrastructure, service quality</li>
<li>Static → dynamic routing = การปรับ routing protocol (infrastructure optimization)</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `บริษัทหนึ่งมีสำนักงานใหญ่ 3 อาคารในเมืองเดียวกัน เชื่อมด้วย WAN และมีผู้ใช้ราว 8,000 คน ต้องการ VPN ให้พนักงานเดินทางและทำงานที่บ้าน มี data center และ network management area ครบถ้วน และต่อ cloud DC`,
      q: "ควรจัดเครือข่ายนี้ในขนาดใด?",
      opts: [
        { t: "Large campus network", why: "ถูก: หลายอาคาร/หลาย campus เชื่อมด้วย WAN, ผู้ใช้มาก, module ครบ, มี VPN และ cloud DC" },
        { t: "Medium campus network", why: "ผิด: medium คือ 200-2000 user และ 25-100 อุปกรณ์ และมี module น้อยกว่า" },
        { t: "Small campus network", why: "ผิด: small ไม่แบ่งชั้น ผู้ใช้ไม่กี่ถึงหลายสิบ" },
        { t: "ไม่ใช่ campus network เพราะเกิน 1 อาคาร", why: "ผิด: หลายอาคารยังเป็น campus ได้ (large campus)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องวาง firewall, IPS และ Anti-DDoS เพื่อป้องกันการโจมตีจาก Internet ก่อนเข้าสู่ intranet`,
      q: "ควรวางอุปกรณ์เหล่านี้ใน area ใดของ campus network?",
      opts: [
        { t: "Egress area", why: "ถูก: เป็นขอบ campus กับ network ภายนอก จึงรวม security device จำนวนมาก" },
        { t: "Access layer", why: "ผิด: access ให้ผู้ใช้เข้า network; การป้องกันขอบนอกอยู่ที่ egress" },
        { t: "Network management area", why: "ผิด: เป็น area สำหรับ controller, AC, log server" },
        { t: "Data center area", why: "ผิด: เป็นที่ตั้ง server ไม่ใช่ชุดป้องกันจาก Internet" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรต้องวางแผน IP สำหรับ link ระหว่าง Agg-S1 กับ CORE-R1 ซึ่งมีอุปกรณ์สองตัวเท่านั้น ต้องการประหยัด address ตามคำแนะนำของบท`,
      q: "ควรใช้ mask ใดและ address ใดที่ CORE-R1 (อุปกรณ์ core) ถ้าใช้ segment 192.168.102.0?",
      opts: [
        { t: "/30; CORE-R1 = 192.168.102.1 และ Agg-S1 = 192.168.102.2", why: "ถูก: /30 มี host ใช้ได้ 2 ตัว (.1, .2) และ core ใช้ address ที่น้อยกว่า" },
        { t: "/24; CORE-R1 = 192.168.102.254", why: "ผิด: /24 สิ้นเปลือง address สำหรับ link สองอุปกรณ์" },
        { t: "/29; CORE-R1 = 192.168.102.6", why: "ผิด: ไม่ตรงคำแนะนำ /30 และ core ควรใช้ address ที่น้อยกว่า" },
        { t: "/32 ทั้งสองฝั่ง", why: "ผิด: /32 ใช้กับ loopback ไม่ใช้เป็น subnet ของ link ที่มี 2 host" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ต้องการสร้าง VLAN ใหม่สำหรับแผนกบัญชีบนโครงสร้างในกรณีศึกษา (VLAN 1-4 ถูกใช้แล้ว VLAN 100-102 เป็น management/interconnection) โดยคำนึงถึงคำแนะนำของบท`,
      q: "การออกแบบใดสอดคล้องกับหลักการที่สุด?",
      opts: [
        { t: "ใช้ VLAN 5 เป็น service VLAN, segment 192.168.5.0/24 และ gateway 192.168.5.254 บน Agg-S1", why: "ถูก: VLAN ต่อเนื่อง, /24, gateway เป็น address สุดท้าย และยัง aggregate ใน 192.168.0.0/16 ได้" },
        { t: "ใช้ VLAN 4000 และ segment 10.9.9.0/28 เพราะไม่ซ้ำ", why: "ผิด: ไม่ต่อเนื่องและไม่ aggregate กับ plan เดิม" },
        { t: "ใช้ VLAN 100 ร่วมกับ management ของ switch", why: "ผิด: ไม่ควรปนกับ management VLAN" },
        { t: "ใช้ address 192.168.5.0 เป็น gateway", why: "ผิด: นั่นคือ network address ไม่ใช่ address ที่ใช้งานได้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `VLAN 2 (R&D) ใช้ 192.168.2.0/24 และ gateway 192.168.2.254 (บน Agg-S1) แผนกมีเครื่องใหม่เพิ่มจนต้องการ DHCP แจกให้ได้สูงสุดเท่าไรเมื่อ exclude เฉพาะ gateway (.254) และ network/broadcast ไม่ใช้อยู่แล้ว`,
      q: "จำนวน address สูงสุดที่ DHCP pool แจกได้คือเท่าใด?",
      opts: [
        { t: "253 address", why: "ถูก: /24 มี 254 host address (.1 ถึง .254) หัก gateway .254 = 253" },
        { t: "254 address", why: "ผิด: ยังไม่หัก gateway" },
        { t: "256 address", why: "ผิด: .0 (network) และ .255 (broadcast) ใช้เป็น host ไม่ได้" },
        { t: "252 address", why: "ผิด: นั่นคือกรณีหัก gateway และ AC อีกตัว (เช่น pool ของ VLAN 101)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Pool ของ AP ใน VLAN 101 คือ 192.168.101.2 ถึง 192.168.101.253 (AC ใช้ .1, gateway ใช้ .254)`,
      q: "pool นี้แจก address ได้กี่ตัว?",
      opts: [
        { t: "252 ตัว", why: "ถูก: 253 - 2 + 1 = 252" },
        { t: "253 ตัว", why: "ผิด: นับ .2 ถึง .253 ได้ 252 ตัว ไม่ใช่ 253" },
        { t: "254 ตัว", why: "ผิด: นี่คือ host ทั้งหมดของ /24 ก่อนหัก AC และ gateway" },
        { t: "250 ตัว", why: "ผิด: ไม่ตรงกับช่วงที่ระบุ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `CORE-R1 ต้องมี route ให้ traffic ปลายทาง 192.168.1.0 ถึง 192.168.4.0, 192.168.100.0, 192.168.101.0 ไปยัง Agg-S1 (192.168.102.2) ด้วย route เดียว ตามที่บทออกแบบ`,
      q: "route สรุปที่ใช้ในบทคืออะไร?",
      opts: [
        { t: "ip route-static 192.168.0.0 16 192.168.102.2", why: "ถูก: /16 ครอบคลุม 192.168.x.x ทั้งหมดที่ใช้ใน intranet" },
        { t: "ip route-static 0.0.0.0 0 192.168.102.2", why: "ผิด: default route ต้องชี้ไป ISP (22.1.2.1) ไม่ใช่เข้า intranet" },
        { t: "ip route-static 192.168.1.0 24 192.168.102.2", why: "ผิด: ครอบคลุมเพียง VLAN 1 อย่างเดียว" },
        { t: "ip route-static 192.168.0.0 24 22.1.2.1", why: "ผิด: next hop ไป ISP ไม่ใช่ Agg-S1 และ /24 แคบเกินไป" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Guest ผ่าน Wi-Fi ใช้ AP ที่ต่อ AC1 แบบ bypass และตั้ง direct forwarding ผู้ดูแลต้องการทราบ traffic ใดไม่ผ่าน AC`,
      q: "ข้อใดถูกต้อง?",
      opts: [
        { t: "Control message ของ AP ผ่าน CAPWAP tunnel ไปที่ AC แต่ data ของผู้ใช้ส่งตรงออก network ไม่ผ่าน AC", why: "ถูก: direct forwarding ให้ data ไปทางตรง" },
        { t: "ทั้ง control และ data ผ่าน CAPWAP tunnel ไป AC", why: "ผิด: เป็น tunnel forwarding" },
        { t: "ไม่มี control message เพราะ AP ทำงานเองทั้งหมด", why: "ผิด: FIT AP ถูก configure/ควบคุมโดย AC ผ่าน CAPWAP" },
        { t: "data ผ่าน AC แต่ control ไม่ผ่าน", why: "ผิด: สลับกัน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Acc-S2 ต่อ Agg-S1 ด้วย Eth-Trunk ที่มี 3 member link ความเร็ว 1 Gbit/s ต่อ link แล้วมี 1 link ขัดข้อง`,
      q: "bandwidth รวมสูงสุดของ trunk (ในทางทฤษฎี) ก่อนและหลังขัดข้องเป็นเท่าใด และ trunk ยังใช้งานได้หรือไม่?",
      opts: [
        { t: "3 Gbit/s เหลือ 2 Gbit/s และ trunk ยังใช้งานได้", why: "ถูก: 3 x 1 = 3, ขาด 1 link เหลือ 2 x 1 = 2 trunk ยังทำงานต่อด้วย link ที่เหลือ" },
        { t: "3 Gbit/s เหลือ 0 เพราะ trunk ล่มทั้งกลุ่ม", why: "ผิด: link aggregation ทนต่อการเสียของ member บางส่วน" },
        { t: "1 Gbit/s ตลอดเพราะใช้ได้ทีละ link", why: "ผิด: Eth-Trunk รวม bandwidth ของ member" },
        { t: "3 Gbit/s ยังเท่าเดิมหลังขัดข้อง", why: "ผิด: bandwidth ลดตามจำนวน link ที่เหลือ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router egress ต่อ Internet ด้วย PPPoE ทุกครั้งที่ dial ได้ public IP ไม่เหมือนเดิม และ intranet ใช้ private address ทั้งหมดต้องออก Internet พร้อมกัน`,
      q: "NAT ชนิดใดเหมาะที่สุด?",
      opts: [
        { t: "Easy IP", why: "ถูก: ใช้ address ของ interface ที่ได้แบบ dynamic ทำ NAPT ไม่ต้องกำหนด pool" },
        { t: "Static NAT", why: "ผิด: ต้องมี public IP คงที่หลายตัว" },
        { t: "Dynamic NAT แบบ 1:1 ด้วย pool", why: "ผิด: ไม่มี pool ของ public address และ 1:1 ไม่คุ้ม address" },
        { t: "NAT Server", why: "ผิด: ใช้เผยแพร่ service ภายในให้ Internet ไม่ใช่ให้ intranet ออก" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ต้องการ ACL สำหรับ NAT ที่ CORE-R1 ให้เฉพาะ guest segment 192.168.1.0/24 ออก Internet ได้ ส่วน segment อื่นไม่ผ่าน NAT`,
      q: "ชุดคำสั่ง ACL ใดถูกต้อง?",
      opts: [
        { t: "acl 2000; rule 5 permit source 192.168.1.0 0.0.0.255; rule 10 deny; แล้ว nat outbound 2000 บน GE0/0/0", why: "ถูก: basic ACL ใช้ wildcard 0.0.0.255 ให้ตรงกับ /24; rule สุดท้าย deny ส่วนอื่น" },
        { t: "acl 2000; rule 5 permit source 192.168.1.0 255.255.255.0", why: "ผิด: ACL ใช้ wildcard mask ไม่ใช่ subnet mask ปกติ" },
        { t: "acl 2000; rule 5 permit source 192.168.0.0 0.0.255.255", why: "ผิด: อนุญาตทั้ง 192.168.0.0/16 ซึ่งรวม intranet ทั้งหมด ไม่ใช่เฉพาะ guest" },
        { t: "nat outbound 2000 โดยไม่สร้าง ACL", why: "ผิด: nat outbound ต้องอ้างอิง ACL ที่มีอยู่เพื่อกำหนด segment" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `พนักงานแผนก administration เสียบ home router ที่เปิด DHCP เข้ากับพอร์ตของ Acc-S4 PC ในแผนกบางเครื่องได้ IP 192.168.0.x และออก Internet ไม่ได้ ขณะ DHCP server จริงอยู่ที่ Agg-S1`,
      q: "ควรแก้ปัญหาอย่างไร?",
      opts: [
        { t: "เปิด DHCP Snooping บน Acc-S4 (ทั้ง switch และ VLAN 4) และตั้ง E0/0/1 ซึ่งต่อขึ้น Agg-S1 เป็น trusted port", why: "ถูก: switch จะรับ DHCP reply เฉพาะจาก trusted port ที่ไปหา DHCP server จริง" },
        { t: "ตั้งพอร์ตที่ต่อ home router เป็น trusted port", why: "ผิด: ทำให้ DHCP ปลอมได้รับการเชื่อถือ" },
        { t: "ปิด DHCP บน Agg-S1", why: "ผิด: จะไม่มีใครแจก address ที่ถูกต้อง" },
        { t: "เปลี่ยน mask ของ VLAN 4 เป็น /30", why: "ผิด: ไม่เกี่ยวกับ rogue DHCP และทำให้ใช้งานไม่พอ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ตรวจสอบประจำเดือนพบ CPU ของ CORE-R1 สูงกว่า 80% ต่อเนื่องหลายสัปดาห์ หลังจำนวน guest เพิ่มขึ้นมาก`,
      q: "ควรจัดเป็นงานของ phase ใดและทำอย่างไร?",
      opts: [
        { t: "Network optimization: วิเคราะห์สาเหตุและอาจ upgrade อุปกรณ์ที่ประสิทธิภาพไม่พอ", why: "ถูก: ตามตัวอย่างในบท ถ้าอุปกรณ์ไม่พอกับ requirement ที่เพิ่ม ใช้ device performance optimization" },
        { t: "Planning and design: ออกแบบใหม่ทั้งหมดโดยไม่ตรวจสอบ", why: "ผิด: เป็นการปรับระบบที่ใช้งานอยู่ ใช้ optimization (แม้ cycle ถัดไปจะวนกลับไป planning)" },
        { t: "Deployment: ตั้ง cutover ใหม่ทันที", why: "ผิด: ยังไม่มีแผน/ข้อสรุปว่าต้องแก้อะไร" },
        { t: "ไม่ต้องทำอะไร เพราะ CPU สูงเป็นเรื่องปกติ", why: "ผิด: เกณฑ์ปกติต่ำกว่า 80% ถ้าสูงนานต้องตรวจหาสาเหตุ" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลกำลังตรวจรายการ O&M ประจำเดือนของ campus network ขนาดเล็ก`,
      q: "เลือกทุกข้อที่เป็นเกณฑ์ปกติตามบท",
      opts: [
        { t: "CPU และ memory occupancy ต่ำกว่า 80%", ok: true, why: "ถูก" },
        { t: "running configuration ต้องตรงกับ saved configuration", ok: true, why: "ถูก" },
        { t: "debug switch ปิดทั้งหมดในสภาวะปกติ", ok: true, why: "ถูก" },
        { t: "interface ที่ไม่ใช้งานควรเป็น SHUTDOWN", ok: true, why: "ถูก" },
        { t: "เวลาของ device อาจต่างจากเวลาจริงได้ 1 ชั่วโมง", ok: false, why: "ผิด: ต้องต่างไม่เกิน 5 นาที" }
      ]
    },
    {
      type: "multi",
      story: `ในกรณีศึกษา เลือกใช้ Agg-S1 เป็น DHCP server และ gateway ของทุก VLAN`,
      q: "เลือกทุกข้อที่ถูกต้องตามการออกแบบในบท",
      opts: [
        { t: "Gateway ของ VLAN 1-4 ใช้ address .254 ของ segment", ok: true, why: "ถูก" },
        { t: "AP ได้ IP จาก DHCP (192.168.101.0/24) และ AC ใช้ 192.168.101.1 แบบ static ที่ถูก exclude จาก pool", ok: true, why: "ถูก" },
        { t: "Printer และ FTP server ได้ fixed IP โดย bind IP กับ MAC", ok: true, why: "ถูก" },
        { t: "ทุกอุปกรณ์รวม server ควรใช้ DHCP แบบสุ่ม", ok: false, why: "ผิด: server/printer ควร static หรือ bind" },
        { t: "link Agg-S1 ถึง CORE-R1 ใช้ /24", ok: false, why: "ผิด: ใช้ /30 (192.168.102.0/30)" }
      ]
    },
    {
      type: "multi",
      story: `ทีมออกแบบ security ให้กรณีศึกษา`,
      q: "เลือกทุกมาตรการที่ตรงกับบทและจับคู่กับปัญหาได้ถูก",
      opts: [
        { t: "ACL + NAPT/Easy IP เพื่อให้เฉพาะ guest ออก Internet", ok: true, why: "ถูก" },
        { t: "traffic-filter กัน guest เข้า intranet", ok: true, why: "ถูก" },
        { t: "DHCP snooping บน access switch กัน DHCP server ปลอม", ok: true, why: "ถูก" },
        { t: "SNMPv3 เพิ่ม authentication และ encryption ให้การจัดการ", ok: true, why: "ถูก" },
        { t: "ใช้ NAT server เพื่อให้ guest เข้า intranet", ok: false, why: "ผิด: NAT server ให้ Internet เข้าถึง service ภายใน ไม่ได้ช่วยกัน guest" }
      ]
    },
    {
      type: "blank",
      story: `Lifecycle ของ campus network`,
      text: `ลำดับ: {1} → Deployment and implementation → {2} → {3} แล้ววนกลับ ขับเคลื่อนด้วย requirement ที่เปลี่ยน`,
      blanks: [
        { opts: ["Planning and design", "Operation and maintenance", "Network optimization"], ans: 0, why: "เริ่มจากวางแผนและออกแบบ" },
        { opts: ["Planning and design", "Operation and maintenance", "Network optimization"], ans: 1, why: "หลัง deploy เป็นงาน O&M" },
        { opts: ["Planning and design", "Operation and maintenance", "Network optimization"], ans: 2, why: "ปรับปรุงเมื่อไม่ตอบโจทย์ แล้วเริ่มรอบใหม่" }
      ]
    },
    {
      type: "blank",
      story: `จำค่าในกรณีศึกษา`,
      text: `Port ของ Eth-Trunk ที่ต่อกับ switch ใช้ PVID {1}; ผู้ใช้ guest อยู่ VLAN {2}; WLAN management ใช้ VLAN {3}; RSTP กำหนดให้ {4} เป็น root bridge`,
      blanks: [
        { opts: ["100", "101", "1", "4"], ans: 0, why: "Trunk ของ access ใช้ PVID 100 (management VLAN)" },
        { opts: ["100", "101", "1", "4"], ans: 2, why: "VLAN 1 คือ guest/service VLAN ของ WLAN" },
        { opts: ["100", "101", "1", "4"], ans: 1, why: "VLAN 101 คือ management VLAN ของ WLAN" },
        { opts: ["Agg-S1", "Acc-S1", "AC1", "CORE-R1"], ans: 0, why: "ตั้ง Agg-S1 เป็น root bridge ด้วยมือ" }
      ]
    },
    {
      type: "match",
      q: "จับคู่สถานการณ์ NAT กับชนิดที่เหมาะสม",
      pairs: [
        ["interface ได้ public IP แบบ dynamic จาก PPPoE", "Easy IP"],
        ["เปิด web server ภายในให้ Internet เข้าถึง", "NAT Server"],
        ["public address น้อยกว่าจำนวนเครื่องภายใน", "NAPT"],
        ["มี public IP คงที่มาก ต้องการ mapping 1:1 สองทิศทาง", "Static NAT"],
        ["pool address ให้เครื่องภายในเริ่มออก Internet (Internet เริ่มเข้ามาไม่ได้)", "Dynamic NAT"]
      ],
      why: "ชนิดของ NAT เลือกตามลักษณะ address และทิศทางการเริ่มสื่อสาร"
    },
    {
      type: "match",
      q: "จับคู่ชั้น/พื้นที่กับหน้าที่",
      pairs: [
        ["Core layer", "backbone แลกเปลี่ยนข้อมูลของ campus"],
        ["Aggregation layer", "รวม traffic และให้ routing, QoS, security พื้นฐาน"],
        ["Access layer", "ให้ผู้ใช้เข้าสู่ campus network"],
        ["Egress area", "ขอบเชื่อมกับ network ภายนอก มี firewall, IPS"],
        ["Network management area", "SDN controller, AC, eLOG"]
      ],
      why: "แต่ละชั้นและพื้นที่มีหน้าที่เฉพาะตามบท"
    }
  ]
});
