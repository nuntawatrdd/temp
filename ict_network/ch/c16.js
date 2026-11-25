IOT.reg({
  id: "c16",
  title: "Network Management, Operation and Maintenance: SNMP และ NTP",
  th: "หน้าที่ของ network management, องค์ประกอบและการทำงานของ SNMP (Get/Set/Trap/Inform), การตั้งค่า SNMPv2c บน Huawei, หลักการ NTP, stratum และการตั้งค่า NTP client/server",
  summary: `
<ul>
<li><b>5 หน้าที่ของ network management (OSI)</b>: Configuration, Performance, Fault, Security, Billing (Accounting)</li>
<li>การล็อกอินทีละอุปกรณ์ (Console, Telnet/SSH) ไม่เหมาะกับการดูแลทั้งเครือข่ายทุกวัน เพราะไม่รู้ล่วงหน้าว่าจะเสียที่ไหน อุปกรณ์สำรองสลับงานแล้วผู้ดูแลก็ไม่รู้ จึงต้องมีระบบจัดการแบบรวมศูนย์ (NMS + SNMP)</li>
<li><b>SNMP</b> = มาตรฐานสื่อสารระหว่าง NMS กับอุปกรณ์ มี 3 เวอร์ชัน: <b>v1</b> (community, ฟีเจอร์น้อย), <b>v2c</b> (community + GetBulk + Inform + Counter64), <b>v3</b> (USM = authentication/encryption, VACM = access control)</li>
<li><b>4 องค์ประกอบ</b>: NMS, SNMP Agent, MIB, Managed Object; MIB เป็น tree, แต่ละ node ระบุด้วย <b>OID</b> (system = 1.3.6.1.2.1.1, interfaces = 1.3.6.1.2.1.2, private = 1.3.6.1.4)</li>
<li><b>MIB view</b> = subset ของ MIB ใช้จำกัดสิ่งที่ NMS เข้าถึงได้ (include / exclude)</li>
<li><b>Query</b>: Get, GetNext, GetBulk (v1 ไม่มี GetBulk); <b>Set</b>: Set เดียว; <b>Trap/Inform</b>: agent รายงานเองไปยัง NMS (v1 ไม่มี Inform)</li>
<li><b>Port</b>: agent รับ Get/Set ที่ <b>UDP 161</b>; NMS รับ Trap/Inform ที่ <b>UDP 162</b>; SNMP ใช้ <b>UDP</b> ไม่ใช่ TCP</li>
<li><b>Trap</b> = ส่งแล้วจบ ไม่มี ack (ประหยัด); <b>Inform</b> = ต้องมี InformResponse ถ้าไม่ได้รับจะเก็บใน inform cache และส่งซ้ำจนครบจำนวนสูงสุด (กินทรัพยากรมากกว่า)</li>
<li><b>Config SNMPv2c</b>: <code>snmp-agent</code>, <code>snmp-agent sys-info version v1 v2c</code>, <code>snmp-agent community read/write NAME acl 2000</code>, <code>snmp-agent target-host trap-hostname ...</code>; ใช้ basic ACL จำกัด IP ของ NMS (ไม่ต้องสนใจทิศ)</li>
<li>Community name ต้องยาว 6 ตัวอักษรขึ้นไป และมีอย่างน้อย 2 ชนิดอักขระ; เก็บใน config แบบ cipher text</li>
<li><b>NTP</b>: sync เวลาอุปกรณ์ทั้งเครือข่าย, ทำงานที่ application layer บน <b>UDP port 123</b>, เวอร์ชันล่าสุด NTPv4 (รองรับ IPv6)</li>
<li>จุดใช้ NTP: วิเคราะห์ log, billing, หลายระบบทำงานร่วมกัน, incremental backup, เวลาล็อกอิน/แก้ไฟล์</li>
<li><b>คำนวณ</b>: Delay = ((T4 - T1) - (T3 - T2)) / 2; Offset = ((T2 - T1) + (T3 - T4)) / 2</li>
<li><b>Stratum</b> 1-16: ยิ่งน้อยยิ่งแม่นยำ, 1 = สูงสุด (master time server), <b>16 = ยังไม่ sync</b>; ลูกข่ายจะ sync กับ server ที่ stratum น้อยกว่าตนเท่านั้น</li>
<li><b>NTP modes</b>: unicast client/server, peer (P2P), broadcast, multicast; client ใช้ Mode 3, server ตอบ Mode 4; server ไม่เก็บ state</li>
<li><b>Config NTP</b>: server <code>ntp-service refclock-master [ip] [stratum]</code>, client <code>ntp-service unicast-server IP</code>; ตรวจด้วย <code>display ntp-service status</code> และ <code>display ntp-service sessions</code></li>
</ul>
<table>
<tr><th>เรื่อง</th><th>Get/Set</th><th>Trap</th><th>Inform</th></tr>
<tr><td>ผู้เริ่ม</td><td>NMS</td><td>Agent</td><td>Agent</td></tr>
<tr><td>UDP port ปลายทาง</td><td>161 (agent)</td><td>162 (NMS)</td><td>162 (NMS)</td></tr>
<tr><td>มี ack</td><td>มี Response</td><td>ไม่มี</td><td>มี (InformResponse)</td></tr>
<tr><td>v1 รองรับ</td><td>ใช่</td><td>ใช่</td><td>ไม่</td></tr>
</table>`,
  sections: [
    {
      t: "16.1 ภาพรวม Network Management, Operation and Maintenance",
      ref: "หน้า 513-515",
      html: `
<p>เมื่อเครือข่ายใหญ่ขึ้นและมีอุปกรณ์หลากหลายชนิด การดูแลให้บริการคุณภาพสูงเป็นเรื่องยาก บทนี้เน้นการใช้ <b>network management system (NMS)</b> เพื่อบริหารและเฝ้าดูอุปกรณ์ทั้งองค์กรแบบรวมศูนย์ โดยใช้ SNMP และ NTP</p>
<h4>5 functional models ของ network management (OSI)</h4>
<table>
<tr><th>หน้าที่</th><th>เป้าหมาย</th></tr>
<tr><td><b>Configuration management</b></td><td>เฝ้าดู/สร้าง/ค้นหา/แก้ไข parameter และสถานะของ hardware, software และ service</td></tr>
<tr><td><b>Performance management</b></td><td>ใช้ performance เป็นแนวทาง ให้เครือข่ายสื่อสารได้ต่อเนื่องน่าเชื่อถือโดยใช้ทรัพยากรน้อย และ latency ต่ำ</td></tr>
<tr><td><b>Fault management</b></td><td>ให้เครือข่าย available ตลอดเวลา และซ่อมให้เร็วที่สุดเมื่อเกิดความผิดปกติ</td></tr>
<tr><td><b>Security management</b></td><td>ป้องกันเครือข่ายและระบบจาก unauthorized access และการโจมตี</td></tr>
<tr><td><b>Billing management</b></td><td>ติดตามและควบคุมการใช้ทรัพยากรของผู้ใช้ เก็บลง operation log database เป็นฐานคิดค่าบริการ</td></tr>
</table>
<h4>ทำไมล็อกอินทีละเครื่องจึงไม่พอ</h4>
<p>การจัดการอุปกรณ์มี 2 แบบดั้งเดิม: (1) ผ่าน <b>Console / MiniUSB</b> ด้วยโปรแกรม terminal เช่น SecureCRT และ (2) <b>Telnet/SSH</b> ผ่านพอร์ตที่ใช้ส่งข้อมูล ทั้งสองต้อง <b>เชื่อมต่อและทำทีละอุปกรณ์</b> เหมาะกับโปรเจกต์ใหม่หรือช่วงเปลี่ยนแปลงเครือข่าย (ช่างรู้ชัดว่าจะทำอะไรกับเครื่องไหน) แต่ไม่เหมาะกับการดูแลประจำวัน เพราะคาดเดาไม่ได้ว่าจะเกิด fault หรือ attack ที่ส่วนไหนของอุปกรณ์ใด</p>
<p>ตัวอย่างในหนังสือ: ติดตั้ง primary + standby device พร้อมเทคโนโลยี high availability เมื่อ primary พัง ระบบสลับไป standby อย่างเงียบ ๆ ไม่มีผู้ใช้สังเกต และ <b>ผู้ดูแลก็ไม่รู้ว่ามีอุปกรณ์เสีย</b> จะรู้ก็ต่อเมื่อ standby พังตามแล้วผู้ใช้ร้องเรียน สรุปคือ redundancy อย่างเดียวไม่ช่วยให้ availability ดีเต็มที่ ถ้าไม่มีการมอนิเตอร์</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>5 หน้าที่: Configuration, Performance, Fault, Security, Billing</li>
<li>แนวทางที่เหมาะกับเครือข่ายใหญ่: โปรแกรมจัดการที่เห็นสถานะอุปกรณ์ทั้งหมดและสั่ง configure ผ่านหน้าจอเดียว โดยใช้มาตรฐาน <b>SNMP</b></li>
<li>ล็อกอินทีละเครื่อง (Console, Telnet/SSH) เหมาะกับ project ใหม่/ช่วงเปลี่ยนแปลง ไม่เหมาะกับการดูแลประจำวัน</li>
</ul></div>`
    },
    {
      t: "16.2.1-16.2.2 SNMP: เวอร์ชันและองค์ประกอบ",
      ref: "หน้า 515-517",
      html: `
<h4>SNMP คืออะไร</h4>
<p>อุปกรณ์ต่างชนิด/ต่างผู้ผลิตมี management interface (เช่น CLI) ไม่เหมือนกัน การจัดการจึงซับซ้อน <b>SNMP (Simple Network Management Protocol)</b> เป็น standard protocol ใน TCP/IP network ที่ให้ interface เดียวกันสำหรับจัดการอุปกรณ์ทุกยี่ห้อ</p>
<h4>3 เวอร์ชัน</h4>
<table>
<tr><th>เวอร์ชัน</th><th>การพิสูจน์ตัวตน</th><th>ลักษณะเด่น</th></tr>
<tr><td><b>SNMPv1</b></td><td>community name</td><td>ฟีเจอร์ขั้นต่ำ ปลอดภัยน้อย error code น้อย; <b>ไม่มี GetBulk และ Inform</b></td></tr>
<tr><td><b>SNMPv2c</b></td><td>community name</td><td>เพิ่ม <b>GetBulk, Inform</b>, error code มากขึ้น, data type เพิ่ม (Counter32, Counter64)</td></tr>
<tr><td><b>SNMPv3</b></td><td>USM + VACM</td><td>เน้นความปลอดภัย: <b>USM</b> (User Security Model) ทำ authentication/encryption, <b>VACM</b> (View-based Access Control Model) ควบคุมสิทธิ์; operation เหมือน v2c</td></tr>
</table>
<h4>4 องค์ประกอบของระบบ SNMP</h4>
<p>อุปกรณ์ที่ถูกจัดการแต่ละตัวมี <b>SNMP Agent, MIB และ managed object หลายตัว</b> NMS คุยกับ agent และ agent ไปทำงานกับ MIB ของอุปกรณ์</p>
<ol>
<li><b>NMS</b>: ผู้ดูแล รันบน NMS server ส่ง request ไปยัง agent เพื่อค้นหา/แก้ค่า parameter และรับ Trap ที่ agent ส่งมาเอง</li>
<li><b>SNMP Agent</b>: process ในอุปกรณ์ ดูแลข้อมูลของอุปกรณ์ ตอบ request จาก NMS โดยใช้ MIB และส่ง Trap เมื่อเกิดเหตุการณ์</li>
<li><b>MIB (Management Information Base)</b>: ฐานข้อมูลของตัวแปรที่อุปกรณ์ดูแล (ชื่อ สถานะ สิทธิ์ data type) ถือเป็น interface ระหว่าง NMS กับ agent</li>
<li><b>Managed object</b>: อาจเป็น hardware หรือชุด parameter ที่ตั้งบน hardware/software เช่น routing protocol</li>
</ol>
<h4>MIB tree และ OID</h4>
<p>MIB เก็บข้อมูลแบบ <b>tree</b> แต่ละ node คือ managed object ระบุด้วย path จาก root เรียกว่า <b>OID (Object IDentifier)</b> subtree ระบุด้วย OID ของ root node ของมันได้</p>
<figure><img src="i/p517_1.webp" alt="โครงสร้าง OID tree ของ MIB" loading="lazy"><figcaption>Fig. 16.2 OID tree structure (system = 1.3.6.1.2.1.1, interfaces = 1.3.6.1.2.1.2, private/enterprises = 1.3.6.1.4.1)</figcaption></figure>
<table>
<tr><th>Object</th><th>OID</th></tr>
<tr><td>mgmt</td><td>1.3.6.1.2</td></tr>
<tr><td>system</td><td>1.3.6.1.2.1.1</td></tr>
<tr><td>interfaces</td><td>1.3.6.1.2.1.2</td></tr>
<tr><td>private</td><td>1.3.6.1.4</td></tr>
<tr><td>enterprises (ของผู้ผลิต)</td><td>1.3.6.1.4.1</td></tr>
</table>
<p><b>MIB view</b> คือ subset ของ MIB ที่ตั้งไว้เพื่อจำกัดว่า NMS เข้าถึง managed object ใดได้บ้าง โดยกำหนดแต่ละ subtree เป็น <b>include</b> (รวมทุก node ใต้ subtree) หรือ <b>exclude</b> (ตัดทุก node ใต้ subtree ออก)</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>4 องค์ประกอบ: NMS, SNMP Agent, MIB, Managed Object</li>
<li>v1/v2c ใช้ community name; v3 มี USM (authentication + encryption) และ VACM (access control); เฉพาะ v3 ที่ encrypt ได้</li>
<li>OID ของ system = 1.3.6.1.2.1.1, interfaces = 1.3.6.1.2.1.2, private = 1.3.6.1.4</li>
</ul></div>`
    },
    {
      t: "16.2.3-16.2.4 SNMP Query และ Set",
      ref: "หน้า 517-519",
      html: `
<h4>Query (NMS ถาม agent)</h4>
<p>NMS เป็นฝ่ายเริ่มส่ง request agent ทำงานตาม MIB แล้วตอบกลับ มี 3 operation:</p>
<ul>
<li><b>Get</b>: ขอค่า parameter ตั้งแต่ 1 ตัวขึ้นไป</li>
<li><b>GetNext</b>: ขอค่าของ parameter <b>ถัดไป</b> จากที่ระบุ (ใช้เดิน/walk ผ่าน MIB)</li>
<li><b>GetBulk</b>: เหมือนทำ GetNext ต่อเนื่องหลายครั้งในข้อความเดียว จำนวนรอบตั้งที่ NMS (v1 ไม่รองรับ)</li>
</ul>
<figure><img src="i/p517_2.webp" alt="NMS ส่ง GetRequest GetNextRequest GetBulkRequest ไป UDP 161 ของ agent" loading="lazy"><figcaption>Fig. 16.3 SNMP query: GetRequest / GetNextRequest / GetBulkRequest ไปที่ UDP port 161 ของ agent และได้ Response กลับ</figcaption></figure>
<p><b>ตัวอย่าง Get แบบ SNMPv2c</b> (ขอค่า sysContact ด้วย readable community "public"):</p>
<ol>
<li>NMS ส่ง Get request: version = SNMPv2c, community = public, PDU type = Get, variable binding = sysContact</li>
<li>Agent ตรวจ version และ community ถ้าผ่านจึงอ่าน sysContact จาก MIB ใส่ใน PDU ของ Response ส่งกลับ ถ้าไม่สำเร็จส่ง error response</li>
</ol>
<h4>Set (NMS สั่งแก้ค่า)</h4>
<p>มี operation เดียวคือ <b>Set</b> ใช้ตั้งค่า parameter ใน agent ตั้งแต่ 1 ตัวขึ้นไป หลักการคล้าย query ต่างกันที่ v3 เพิ่ม authentication และ encryption</p>
<figure><img src="i/p518_1.webp" alt="NMS ส่ง SetRequest และรับ Response" loading="lazy"><figcaption>Fig. 16.4 SNMP set: NMS ส่ง SetRequest ไปที่ UDP port 161 แล้ว agent ตอบ Response</figcaption></figure>
<p><b>ตัวอย่าง Set แบบ SNMPv3</b> (ตั้ง sysName = HUAWEI):</p>
<ol>
<li>NMS ส่ง Set request <b>แบบไม่มี security parameter</b> เพื่อขอข้อมูล engine ของอุปกรณ์</li>
<li>Agent ตอบ parameter ที่ขอ</li>
<li>NMS ส่ง Set request อีกครั้ง โดยใส่: Version = SNMPv3, message header (ระบุ mode ของ authentication/encryption), security parameters (คำนวณด้วย algorithm ที่ตั้งไว้), PDU (ใส่ Context EngineID, Context Name, PDU type = Set, variable binding = sysName/HUAWEI แล้ว encrypt PDU)</li>
<li>Agent ตรวจสอบ ถ้าผ่านจึงแก้ค่าใน MIB แล้วส่ง Response; ถ้าไม่สำเร็จส่ง error response</li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>Get / GetNext / GetBulk (query), Set (setting) เริ่มโดย <b>NMS</b> ไปที่ <b>UDP 161</b> ของ agent</li>
<li>v3 ต้องคุยรอบแรกเพื่อรับ engine information ก่อนส่ง Set ที่มี security parameter</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ส่วน Response ที่ agent ส่งกลับตอบ Get/Set เป็นข้อความที่ agent ส่งไป NMS เช่นกัน อย่าสับสนกับ Trap ซึ่ง agent เป็นฝ่ายเริ่มเอง</div>`
    },
    {
      t: "16.2.5 SNMP Trap และ Inform",
      ref: "หน้า 519-520",
      html: `
<p>Trap/Inform คือกลไกที่ <b>agent รายงาน alarm หรือ event ไปยัง NMS เอง</b> โดยไม่รอให้ NMS ถาม เพื่อให้ผู้ดูแลรู้สถานะอุปกรณ์ทันเวลา</p>
<figure><img src="i/p520_1.webp" alt="Trap ส่งไป UDP 162 และ Inform พร้อม InformResponse" loading="lazy"><figcaption>Fig. 16.5 SNMP traps: Trap ไม่มี ack; InformRequest ต้องมี InformResponse; NMS รับที่ UDP port 162</figcaption></figure>
<table>
<tr><th>หัวข้อ</th><th>Trap</th><th>Inform</th></tr>
<tr><td>ผู้ส่ง</td><td>Agent (ทำเอง ไม่ใช่ operation พื้นฐานของ NMS)</td><td>Agent</td></tr>
<tr><td>ack</td><td>ไม่มี</td><td>NMS ต้องตอบ InformResponse</td></tr>
<tr><td>ถ้าไม่ได้ ack</td><td>-</td><td>เก็บใน inform cache, ส่งซ้ำจน NMS ack หรือครบ max retransmission, สร้าง log ในอุปกรณ์</td></tr>
<tr><td>ทรัพยากร</td><td>ใช้น้อย</td><td>ใช้ระบบมากกว่า</td></tr>
<tr><td>เวอร์ชัน</td><td>v1, v2c, v3</td><td>v2c, v3 (v1 ไม่มี)</td></tr>
</table>
<ul>
<li>Trap ถูกส่งเมื่อ module ของอุปกรณ์ถึงเงื่อนไข alarm ที่กำหนดไว้เท่านั้น เช่น agent ส่ง trap <code>warmStart</code> หลัง warm start ข้อดีคือเกิดเฉพาะเหตุการณ์สำคัญ จึงลด traffic ของข้อความบริหาร</li>
<li>Inform เชื่อถือได้กว่า (มี ack + retransmit) แต่แลกด้วยทรัพยากรที่มากกว่า</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>NMS รับ Trap/Inform ที่ <b>UDP 162</b>; agent รับ Get/Set ที่ <b>UDP 161</b></li>
<li>Trap = ไม่มี acknowledgement; Inform = ต้องมี InformResponse</li>
<li>SNMPv1 ไม่รองรับ Inform และ GetBulk</li>
</ul></div>
<div class="warn"><b>ระวัง</b> เมื่อเกิด exception บนอุปกรณ์ สิ่งที่ NMS จะได้รับคือ <b>Trap</b> ไม่ใช่ Get Response หรือ Get Request ข้อสอบมักถามว่า message ใดถูกส่งจาก agent ไป NMS</div>`
    },
    {
      t: "16.2.6 การตั้งค่า SNMPv2c บน Huawei",
      ref: "หน้า 520-522",
      html: `
<p>เมื่อสร้างเครือข่ายเสร็จเข้าสู่ช่วง operation and maintenance ยิ่งอุปกรณ์มาก ภาระดูแล interface, สายสัญญาณ, dynamic routing ยิ่งสูง วิธีลดภาระคือเปิด <b>SNMP agent</b> บนอุปกรณ์และ deploy NMS ล่วงหน้า ตัวอย่าง: เปิด SNMPv2c บน AR1 และให้ NMS จัดการ (ตัวอย่างวาง AR1 กับ NMS ใน subnet เดียวกันเพื่อไม่ต้องสนใจ routing แต่ในงานจริงต้องมั่นใจก่อนว่า IP communication ใช้ได้)</p>
<h4>จำกัดว่า NMS ใดใช้ SNMP ได้ด้วย basic ACL</h4>
<p>อนุญาต IP ของ NMS และ deny ที่เหลือ เมื่อ apply ACL กับ SNMP agent IP ที่ permit คือ IP ของ NMS และ <b>ไม่ต้องคำนึงถึงทิศทาง</b> ของ ACL</p>
<pre><code>[AR1]acl 2000
[AR1-acl-basic-2000]rule permit source 192.168.56.12 0.0.0.0
[AR1-acl-basic-2000]rule deny source any</code></pre>
<h4>คำสั่งเปิด SNMP agent</h4>
<pre><code>[AR1]snmp-agent                                  # เปิด agent (default เปิดอยู่แล้ว)
[AR1]snmp-agent sys-info version v1 v2c          # กำหนดเวอร์ชันที่รองรับ
[AR1]snmp-agent sys-info contact hanligang@huawei.com   # optional
[AR1]snmp-agent sys-info location Office101             # optional
[AR1]snmp-agent community read public acl 2000   # readable community
[AR1]snmp-agent community write private acl 2000 # writable community
[AR1]snmp-agent target-host trap-hostname windows10 address 192.168.80.112 udp-port 161 trap-paramsname public</code></pre>
<table>
<tr><th>คำสั่ง</th><th>ความหมาย</th></tr>
<tr><td><code>snmp-agent</code></td><td>เปิด agent (default เปิดทุกเวอร์ชัน)</td></tr>
<tr><td><code>sys-info version v1 v2c</code></td><td>เปลี่ยนเวอร์ชันที่รองรับ</td></tr>
<tr><td><code>sys-info contact / location</code></td><td>ข้อมูลผู้ดูแลและที่ตั้ง (optional)</td></tr>
<tr><td><code>community {read | write} NAME acl N</code></td><td>กำหนด community สำหรับอ่าน/เขียน และใช้ ACL จำกัด NMS ที่ใช้ community นี้ได้</td></tr>
<tr><td><code>target-host trap-hostname ...</code></td><td>กำหนด NMS ปลายทางที่ให้ส่ง trap</td></tr>
</table>
<ul>
<li>Community name ต้องผ่านเงื่อนไขความซับซ้อน: <b>อย่างน้อย 6 ตัวอักษร</b> และประกอบด้วย <b>อย่างน้อย 2 ชนิด</b> (ตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ ตัวเลข อักขระพิเศษที่ไม่ใช่ space)</li>
<li>เมื่อตั้งสำเร็จ จะเก็บใน configuration ของ router เป็น <b>cipher text</b></li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li><code>snmp-agent community read|write NAME acl N</code> ทั้ง "สิทธิ์ read/write" และ "ACL จำกัด NMS" อยู่ในคำสั่งเดียว</li>
<li>basic ACL ใช้จำกัด IP ของ NMS; IP ที่ไม่ได้ permit จะใช้ SNMP service ไม่ได้ (ตามข้อสอบในบท)</li>
</ul></div>
<div class="warn"><b>ระวัง</b> v1/v2c ส่ง community name แบบ plain text ไม่เข้ารหัส การจำกัดด้วย ACL จึงสำคัญ และถ้าต้องการ encryption ต้องใช้ SNMPv3</div>`
    },
    {
      t: "16.3.1-16.3.2 NTP: ภาพรวมและหลักการคำนวณเวลา",
      ref: "หน้า 522-525",
      html: `
<h4>ทำไมต้องมี NTP</h4>
<p>เมื่อ topology ซับซ้อนขึ้น การ sync นาฬิกาของอุปกรณ์ทั้งเครือข่ายสำคัญ การตั้งเวลาด้วยมือทำให้งานเยอะและความแม่นยำไม่พอ <b>NTP (Network Time Protocol)</b> จึงถูกสร้างเพื่อ sync system clock ของอุปกรณ์ในเครือข่าย ใช้เมื่อเวลาของอุปกรณ์ต้องตรงกันในกรณี:</p>
<ul>
<li><b>Network management</b>: วิเคราะห์ log/debug จากหลาย router ต้องอ้างเวลาเดียวกัน</li>
<li><b>Billing system</b>: ทุกเครื่องต้องใช้เวลาตรงกัน</li>
<li><b>หลายระบบทำงานร่วมกัน</b> ใน event เดียวกัน เพื่อให้ลำดับการทำงานถูกต้อง</li>
<li><b>Incremental backup</b> ระหว่าง backup server กับ client</li>
<li><b>System time</b>: ใครล็อกอินเมื่อไร ไฟล์ถูกแก้เมื่อไร</li>
</ul>
<h4>ลักษณะของโปรโตคอล</h4>
<ul>
<li>เป็น <b>application layer protocol</b> ของ TCP/IP พัฒนาจาก time protocols และ ICMP timestamp โดยเน้น accuracy และ robustness</li>
<li>มี 5 เวอร์ชัน (NTPv0-v4); <b>NTPv4</b> รองรับ <b>IPv6</b> เพิ่มความปลอดภัย และ backward compatible กับ v3</li>
<li>ใช้ <b>UDP port 123</b></li>
<li>มี 2 ชนิดข้อความ: synchronization message และ control message อุปกรณ์ดู <b>Mode field</b> ใน NTP message เพื่อรู้โหมดของผู้ส่งและชนิดข้อความ</li>
<li>อุปกรณ์หลักเช่น AC, AP, firewall, router, switch, server เป็น NTP client ได้ และบางตัวเป็น time server ได้</li>
</ul>
<h4>หลักการ sync (สมมติ clock ของทั้งสองฝั่งแม่นยำสมบูรณ์)</h4>
<figure><img src="i/p524_1.webp" alt="ลำดับ timestamp T1 T2 T3 T4 ระหว่าง NTP client กับ server" loading="lazy"><figcaption>Fig. 16.7 NTP clock synchronization process: client ส่ง T1, server รับ T2 ส่ง T3, client รับ T4</figcaption></figure>
<ol>
<li>Client ส่ง NTP request ที่เวลา <b>T1</b> (ใส่ T1 ในข้อความ)</li>
<li>Server รับที่ <b>T2</b> ประมวลผลแล้วส่ง response ที่ <b>T3</b> โดยข้อความมี T1, T2, T3</li>
<li>Client รับ response ที่ <b>T4</b></li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li><b>Delay = ((T4 - T1) - (T3 - T2)) / 2</b> (สมมติเวลาไป-กลับเท่ากัน)</li>
<li><b>Offset = ((T2 - T1) + (T3 - T4)) / 2</b></li>
<li>Client ปรับนาฬิกาตาม Offset ให้ตรงกับ server</li>
</ul></div>
<p><b>ที่มาของสูตร:</b> ที่เวลา T4 ฝั่ง server อยู่ที่ T3 + Delay ดังนั้น T4 + Offset = T3 + Delay จึงได้ Offset = T3 + Delay - T4 แล้วแทน Delay ก็จะได้สูตรข้างบน</p>
<p><b>ตัวอย่างจากรูป</b>: T1 = 8:10:00 (clock client), T2 = 10:10:01, T3 = 10:10:05 (clock server), T4 = 8:10:06</p>
<pre><code>Delay  = ((T4 - T1) - (T3 - T2)) / 2 = ((6 s) - (4 s)) / 2 = 1 s
Offset = ((T2 - T1) + (T3 - T4)) / 2
       = ((2:00:01) + (1:59:59)) / 2 = 4:00:00 / 2 = +2 ชั่วโมง
client ปรับเป็น 8:10:06 + 2:00:00 = 10:10:06</code></pre>
<div class="note"><b>หมายเหตุ</b> สังเกตว่าในสูตร Offset ค่าที่เป็น delay ของ path ถูกหักล้างกันเอง (อาศัยสมมติฐานว่าไป-กลับใช้เวลาเท่ากัน) จึงแม่นยำเมื่อ path สมมาตร</div>`
    },
    {
      t: "16.3.3-16.3.4 NTP Architecture, Stratum และ Working Modes",
      ref: "หน้า 525-527",
      html: `
<h4>Network architecture</h4>
<figure><img src="i/p525_1.webp" alt="โครงสร้าง NTP แบบลำดับชั้น SwitchA stratum 1" loading="lazy"><figcaption>Fig. 16.8 NTP network structure: SwitchA เป็น primary time server (stratum 1), SwitchB/D stratum 2, SwitchC/E stratum 3, ลงไปถึง PC</figcaption></figure>
<ul>
<li><b>Synchronization subnet</b>: master time server + secondary time server + PC client + เส้นทางเชื่อมระหว่างกัน</li>
<li><b>Master (primary) time server</b>: sync กับ standard reference clock โดยตรงทางสายหรือคลื่นวิทยุ เช่น radio clock หรือ GPS อยู่ที่ root</li>
<li><b>Secondary time server</b>: sync กับ master หรือ secondary ตัวอื่น และส่งต่อเวลาให้ host ใน LAN อยู่ใกล้ leaf</li>
<li><b>Stratum</b>: ระดับชั้นของ clock บอกความแม่นยำ ค่า <b>1-16</b>: ยิ่งน้อยยิ่งแม่น, <b>1 = แม่นสุด, 16 = ยังไม่ sync</b></li>
</ul>
<p>ยิ่ง stratum ใหญ่ ความแม่นยำยิ่งลดลง ซึ่งขึ้นกับ network path และความเสถียรของ local clock</p>
<h4>4 working modes</h4>
<table>
<tr><th>Mode</th><th>ลักษณะ</th></tr>
<tr><td><b>Unicast server/client</b></td><td>client รู้ IP ของ server ล่วงหน้า ส่ง unicast (บทนี้เน้นโหมดนี้)</td></tr>
<tr><td><b>Peer (P2P)</b></td><td>เพื่อนระดับเดียวกัน sync ซึ่งกันและกันได้</td></tr>
<tr><td><b>Broadcast</b></td><td>server ส่ง broadcast ให้ client ใน segment</td></tr>
<tr><td><b>Multicast</b></td><td>server ส่ง multicast ให้ client ที่เข้าร่วมกลุ่ม</td></tr>
</table>
<h4>Unicast server/client mode</h4>
<figure><img src="i/p527_1.webp" alt="client ส่ง Mode 3 server ตอบ Mode 4" loading="lazy"><figcaption>Fig. 16.9 NTP unicast server/client mode: client ส่ง Mode 3, server ทำงานเป็น server แล้วตอบ Mode 4, client ทำ clock filtering/selection แล้ว sync</figcaption></figure>
<ul>
<li><b>Client</b>: ส่งข้อความเป็นระยะโดยตั้ง Mode = <b>3</b> (client mode) sync ตาม clock ของอีกฝั่ง แต่ <b>ไม่แก้ clock ของ server</b></li>
<li><b>Server</b>: รับและตอบข้อความ Mode = <b>4</b> (server mode) ให้ข้อมูลเวลากับ client โดยไม่แก้ clock ตนเอง</li>
<li>Client ส่งตอน restart และเป็นระยะหลังจากนั้น เลือกช่วงเวลาได้เอง</li>
<li>Server <b>สลับ</b> destination IP/port กับ source IP/port ของข้อความ ใส่ข้อมูลที่ต้องการแล้วส่งกลับ และ <b>ไม่ต้องเก็บ state</b> ใด ๆ</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Stratum 1 = แม่นที่สุด (ต่อกับ GPS/radio clock), 16 = unsynchronized; ยิ่งลงไปยิ่งเลขเพิ่มทีละ 1</li>
<li>Client mode = 3, Server mode = 4, ใช้ UDP 123</li>
<li>Unicast client/server: ต้องระบุ IP ของ server ล่วงหน้า และ server ไม่ sync กลับมาหา client</li>
</ul></div>`
    },
    {
      t: "16.3.5 การตั้งค่า NTP บน Huawei",
      ref: "หน้า 527-530",
      html: `
<p>บน Internet มี time server สาธารณะมากมาย เช่น Alibaba Cloud ให้ <code>ntp1.aliyun.com</code> ถึง <code>ntp7.aliyun.com</code> ตัวอย่างในหนังสือ: AR1 เป็น gateway ที่ต่อ Internet (public IP 202.108.0.1/30) ใช้ unicast client/server mode sync กับ Alibaba cloud time server และทำหน้าที่เป็น <b>NTP time server ภายในองค์กร</b> ให้ AR2 ซึ่งเป็น client</p>
<div class="must"><b>ต้องจำ (กฎของ unicast mode)</b><ul>
<li>Clock sync ได้ทางเดียว: <b>client sync กับ server</b> ไม่ใช่ server sync กับ client</li>
<li>อุปกรณ์ที่จะเป็น NTP server ของวงในต้อง <b>sync ตัวเองให้เสร็จก่อน</b></li>
<li>Client จะ sync ก็ต่อเมื่อ <b>stratum ของ server น้อยกว่า stratum ของ client</b></li>
</ul></div>
<h4>คำสั่งสำคัญ (system view)</h4>
<table>
<tr><th>คำสั่ง</th><th>ใช้ที่</th><th>ความหมาย</th></tr>
<tr><td><code>ntp-service unicast-server IP</code></td><td>NTP client</td><td>ระบุ IP ของ time server</td></tr>
<tr><td><code>ntp-service refclock-master [ip-address] [stratum]</code></td><td>NTP server</td><td>ตั้ง local clock เป็น master clock และระบุ stratum ได้ (ถ้า sync จากแหล่งภายนอกแล้ว ไม่ต้องระบุ stratum เอง)</td></tr>
</table>
<pre><code># AR1: sync กับ ntp1.aliyun.com (120.25.115.20) และเป็น server ให้วงใน
[AR1]ntp-service unicast-server 120.25.115.20
[AR1]ntp-service refclock-master

# AR2: เป็น client ของ AR1
[AR2]ntp-service unicast-server 192.168.11.1</code></pre>
<p>ก่อนทำต้องแน่ใจว่า AR1 ตั้ง interface address และ route และเข้า Internet ได้</p>
<h4>ตรวจสอบสถานะ</h4>
<pre><code>&lt;AR1&gt;display ntp-service status
 clock status: synchronized
 clock stratum: 3
 reference clock ID: 120.25.115.20
 ...
[AR2]display ntp-service status
 clock status: synchronized
 clock stratum: 4
 reference clock ID: 192.168.11.1

[AR2]display ntp-service sessions
 source           reference     stra reach poll now offset delay disper
 [12345]192.168.11.1 120.25.115.20 3   63    64   -  -8h  111.0 1.0</code></pre>
<ul>
<li>AR1: <b>clock status synchronized</b>, <b>stratum 3</b> (ได้จาก server ที่ stratum 2), reference clock = IP ของ server ที่ตั้งเอง</li>
<li>AR2: synchronized, <b>stratum 4</b> (เพิ่มจาก AR1 อีก 1), reference clock = 192.168.11.1</li>
<li><code>display ntp-service sessions</code> แสดงสถิติ session ในโหมด unicast client/server ทุก session ถูก <b>เพิ่มด้วยมือ</b> (configured)</li>
</ul>
<div class="warn"><b>ระวัง</b> ถ้า clock status ไม่ใช่ synchronized (ยัง stratum 16) อุปกรณ์นั้นยังเป็น NTP server ให้คนอื่นไม่ได้ ให้ตรวจ route ไปยัง server, IP ที่ตั้งใน <code>unicast-server</code> และ UDP 123 ที่อาจถูก ACL/firewall ปิดกั้น</div>
<div class="note"><b>หมายเหตุ</b> ลำดับชั้นในตัวอย่าง: Alibaba server (stratum 2) → AR1 (stratum 3) → AR2 (stratum 4) แต่ละ hop เพิ่ม stratum ทีละ 1</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `ผู้ดูแลเครือข่ายขององค์กรต้องการให้ NMS รู้ทันทีที่ switch ตัวหนึ่งเกิด alarm โดยไม่ต้องสอบถาม (poll) ทุก ๆ นาที และไม่อยากให้เกิด traffic เพิ่มโดยไม่จำเป็น`,
      q: "กลไกใดตรงโจทย์ที่สุด และ agent ส่งไปที่ port ใดของ NMS?",
      opts: [
        { t: "Trap ส่งไป UDP 162", why: "ถูก: Trap เป็นการที่ agent รายงานเองเมื่อถึงเงื่อนไข alarm จึงไม่ต้อง poll และส่งเฉพาะเหตุการณ์สำคัญ NMS รับที่ UDP 162" },
        { t: "Get ส่งไป UDP 161", why: "ผิด: Get เป็น query ที่ NMS เริ่มเอง ต้อง poll ทุกรอบ และ 161 คือ port ฝั่ง agent" },
        { t: "Set ส่งไป UDP 162", why: "ผิด: Set ใช้แก้ค่าโดย NMS ไม่ใช่การรายงาน alarm" },
        { t: "GetBulk ส่งไป TCP 162", why: "ผิด: GetBulk เป็นการ query จาก NMS และ SNMP ใช้ UDP ไม่ใช่ TCP" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ในเครือข่ายโรงพยาบาล alarm บางอย่าง เช่น link ไป core ล่ม สำคัญมาก ห้ามตกหล่น ผู้ดูแลต้องการให้ agent ส่งซ้ำจนกว่า NMS จะยืนยันว่าได้รับ ทุกอุปกรณ์ใช้ SNMPv2c`,
      q: "ควรเลือกวิธีรายงานใด และผลข้างเคียงคืออะไร?",
      opts: [
        { t: "Trap เพราะ NMS ตอบกลับอัตโนมัติ", why: "ผิด: Trap ไม่มี acknowledgement จึงไม่รู้ว่า NMS ได้รับหรือไม่" },
        { t: "Inform; agent เก็บใน inform cache และส่งซ้ำจนได้ InformResponse หรือครบ max retransmission แต่ใช้ทรัพยากรมากกว่า", why: "ถูก: Inform ต้องมี InformResponse ถ้าไม่ได้รับจะ cache และส่งซ้ำ แลกด้วยทรัพยากรระบบที่มากขึ้น" },
        { t: "Get; NMS เป็นฝ่าย poll ได้ความเชื่อถือสูงกว่า", why: "ผิด: Get ไม่ใช่การรายงานเหตุการณ์โดย agent และไม่ได้ช่วยให้ alarm ถึงทันที" },
        { t: "Inform บน SNMPv1", why: "ผิด: SNMPv1 ไม่รองรับ Inform (แต่โจทย์ใช้ v2c ซึ่งรองรับ)" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `องค์กรหนึ่งต้องการให้ NMS ดึงค่า counter ของ interface หลายร้อยแถวในตาราง interfaces ให้เร็ว โดยลดจำนวนรอบ request/response ลง อุปกรณ์รองรับ SNMPv2c`,
      q: "operation ใดเหมาะที่สุด?",
      opts: [
        { t: "Get ทีละแถว", why: "ผิด: ต้องส่ง request จำนวนมาก ไม่ลดจำนวนรอบ" },
        { t: "Set", why: "ผิด: Set ใช้เขียนค่า ไม่ใช่อ่านค่า" },
        { t: "GetBulk", why: "ถูก: GetBulk เทียบเท่า GetNext ต่อเนื่องหลายครั้งในข้อความเดียว ลดจำนวนรอบได้ (v2c รองรับ แต่ v1 ไม่รองรับ)" },
        { t: "Trap", why: "ผิด: Trap เป็นการที่ agent รายงานเอง ไม่ใช่การ query ตาราง" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `บริษัทหนึ่งตรวจพบว่ามีคนดักจับ community name "public" ที่วิ่งบนเครือข่ายแล้วใช้มันอ่านค่าจากอุปกรณ์ ผู้ดูแลต้องการมาตรการที่ทั้งเข้ารหัสและมี access control ต่อ MIB view ตามผู้ใช้`,
      q: "ควรทำอย่างไร?",
      opts: [
        { t: "เปลี่ยน community name ให้ยาวขึ้นแล้วใช้ v2c ต่อ", why: "ผิด: community name ใน v1/v2c ส่งแบบ plain text ยังถูกดักได้ ถึงจะยาวแค่ไหนก็ตาม" },
        { t: "ย้ายไปใช้ SNMPv3 (USM สำหรับ authentication/encryption และ VACM สำหรับ access control)", why: "ถูก: SNMPv3 เพิ่มความปลอดภัยด้วย USM และ VACM" },
        { t: "ใช้ SNMPv1 เพราะ error code น้อยกว่า", why: "ผิด: v1 ปลอดภัยน้อยที่สุด ใช้ community เหมือนกัน" },
        { t: "ปิด agent แล้วใช้ Trap อย่างเดียว", why: "ผิด: Trap ก็ยังส่งโดยใช้ community (v1/v2c) และไม่ใช่การแก้ปัญหาการเข้ารหัส" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `ผู้ดูแลตั้งค่า basic ACL 2000 ดังนี้ แล้ว apply เข้ากับ snmp-agent community:
<pre><code>acl 2000
 rule 5 permit source 192.168.1.2 0
 rule 10 permit source 192.168.1.3 0
 rule 15 permit source 192.168.1.4 0</code></pre>`,
      q: "ข้อใดไม่ถูกต้องตามหลักของบท (ใช้ ACL นี้จำกัดว่า IP ใดใช้ SNMP ได้)?",
      opts: [
        { t: "192.168.1.5 ใช้ SNMP service ได้", why: "ข้อนี้คือคำตอบที่ผิด: ไม่มี rule ที่ permit 192.168.1.5 ในรายการ จึงใช้ SNMP service ไม่ได้ (ตามข้อสอบของบทนี้)" },
        { t: "192.168.1.3 ใช้ SNMP service ได้", why: "ถูกต้อง: rule 10 permit ไว้ จึงไม่ใช่ข้อที่ผิด" },
        { t: "192.168.1.4 ใช้ SNMP service ได้", why: "ถูกต้อง: rule 15 permit ไว้" },
        { t: "192.168.1.2 ใช้ SNMP service ได้", why: "ถูกต้อง: rule 5 permit ไว้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรกำหนด community สำหรับ NMS ใหม่ของบริษัท ด้วยคำสั่ง snmp-agent community write abc acl 2000 แล้วอุปกรณ์ปฏิเสธคำสั่งนี้`,
      q: "สาเหตุที่น่าจะเป็นที่สุดคืออะไร และควรแก้อย่างไร?",
      opts: [
        { t: "ACL 2000 ต้องเป็น advanced ACL จึงใช้ได้", why: "ผิด: SNMP ใช้ basic ACL ในการจำกัด IP ของ NMS" },
        { t: "ต้องใช้ community read ก่อนเสมอ ห้ามตั้ง write โดยตรง", why: "ผิด: ตั้งแยกกันได้อิสระ" },
        { t: "community name ไม่ผ่านเงื่อนไขความซับซ้อน (ต้องยาวอย่างน้อย 6 ตัว และมีอย่างน้อย 2 ชนิดอักขระ) เช่นใช้ Abc@2024", why: "ถูก: abc มีแค่ 3 ตัวและชนิดเดียว ไม่ผ่าน ต้องเปลี่ยนเป็นเช่น Abc@2024" },
        { t: "ต้องใช้ udp-port 162 ในคำสั่งนี้", why: "ผิด: 162 เกี่ยวกับ trap และไม่ได้อยู่ในคำสั่ง community" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `NMS ต้องการแก้ค่า sysName ของอุปกรณ์เป็น "CORE-SW1" แต่ผู้ดูแลตั้ง community เป็นแบบ read เท่านั้น และ NMS ใช้ SNMPv2c`,
      q: "ผลของการส่ง Set request ด้วย read community คือข้อใด?",
      opts: [
        { t: "สำเร็จ เพราะ Set ใช้ community อะไรก็ได้", why: "ผิด: สิทธิ์เขียนต้องใช้ writable community" },
        { t: "agent ส่ง error response เพราะ community ที่ใช้ไม่มีสิทธิ์เขียน ต้องตั้ง snmp-agent community write ... เพิ่ม", why: "ถูก: agent ตรวจ version/community ก่อน ถ้าไม่ผ่านสิทธิ์จะตอบ error response; แก้ด้วยการตั้ง writable community" },
        { t: "agent เงียบ และ NMS ต้องส่ง Inform แทน", why: "ผิด: Inform เป็นข้อความที่ agent ส่งไป NMS ไม่ใช่ทางที่ NMS ใช้แก้ค่า" },
        { t: "อุปกรณ์รีสตาร์ทเองเพื่อเปลี่ยนค่า", why: "ผิด: ไม่มีพฤติกรรมเช่นนั้น" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `วิศวกรวัด timestamp ได้ T1 = 09:00:00.000, T2 = 09:00:00.120, T3 = 09:00:00.130, T4 = 09:00:00.050 (หน่วยวินาที T1 และ T4 เป็นเวลาบน client, T2 และ T3 เป็นเวลาบน server)`,
      q: "Delay และ Offset ที่คำนวณได้ คือเท่าใด?",
      opts: [
        { t: "Delay = 20 ms, Offset = +100 ms", why: "ถูก: Delay = ((50) - (10)) / 2 = 20 ms; Offset = ((120) + (130 - 50)) / 2 = (120 + 80) / 2 = 100 ms (client ช้ากว่า server 100 ms)" },
        { t: "Delay = 40 ms, Offset = +100 ms", why: "ผิด: ลืมหาร 2 ของ delay (40 คือผลต่างก่อนหาร)" },
        { t: "Delay = 20 ms, Offset = -100 ms", why: "ผิด: เครื่องหมาย offset ผิด; T2 - T1 มากกว่า T3 - T4 จึงเป็นบวก" },
        { t: "Delay = 90 ms, Offset = 20 ms", why: "ผิด: สลับสูตร delay กับ offset" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `จากรูป NTP ในบท T1 = 8:10:00, T2 = 10:10:01, T3 = 10:10:05, T4 = 8:10:06`,
      q: "หลัง client ปรับตาม Offset แล้ว เวลาบน client ณ จังหวะ T4 ควรเป็นเท่าใด?",
      opts: [
        { t: "10:10:05", why: "ผิด: นี่คือ T3 ของ server ไม่ใช่เวลาหลังปรับ client" },
        { t: "10:10:06", why: "ถูก: Offset = ((2:00:01) + (1:59:59)) / 2 = +2:00:00 ดังนั้น 8:10:06 + 2:00:00 = 10:10:06 (ตรงกับ T3 + Delay = 10:10:05 + 1 s)" },
        { t: "8:10:07", why: "ผิด: ไม่ได้ปรับ offset เลย" },
        { t: "10:10:07", why: "ผิด: เกินไป 1 วินาที เพราะบวก delay ซ้ำสองรอบ" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `ตามรูปโครงสร้างในบท SwitchA คือ primary time server (stratum 1), SwitchB เป็น stratum 2, SwitchC sync จาก SwitchB, และมี PC1/PC2 ใช้ SwitchC เป็น NTP server`,
      q: "stratum ของ SwitchC เป็นเท่าใด และ PC1 ควรมี stratum ที่เห็นเท่าใดเมื่อ sync สำเร็จ?",
      opts: [
        { t: "SwitchC = 3, PC1 = 4", why: "ถูก: sync จาก stratum 2 จึงเป็น 3 และ client ที่ sync กับ stratum 3 จะเป็น 4" },
        { t: "SwitchC = 2, PC1 = 3", why: "ผิด: stratum เพิ่มทุก hop ของการ sync SwitchC อยู่ถัดจาก SwitchB ซึ่งเป็น 2" },
        { t: "SwitchC = 1, PC1 = 2", why: "ผิด: stratum 1 สงวนไว้สำหรับ server ที่ต่อ reference clock โดยตรง" },
        { t: "SwitchC = 16, PC1 = 16", why: "ผิด: 16 หมายถึงยังไม่ sync" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR2 ถูกตั้ง ntp-service unicast-server 192.168.11.1 แล้ว แต่ display ntp-service status ขึ้นว่า clock status: unsynchronized, stratum 16 ผู้ดูแลตรวจพบว่า AR1 (192.168.11.1) ก็ยังไม่ได้ sync กับ Internet`,
      q: "สาเหตุหลักและแนวทางแก้คืออะไร?",
      opts: [
        { t: "AR2 ต้องตั้ง refclock-master ก่อน จึงจะ sync กับ AR1 ได้", why: "ผิด: ตัว client ไม่จำเป็นต้องเป็น master clock" },
        { t: "AR1 ยังไม่ sync จึงยังเป็น time server ที่เชื่อถือไม่ได้ ต้องแก้ให้ AR1 sync กับ time server ภายนอกก่อน (เช่น route/Internet ไปยัง 120.25.115.20) หรือกำหนด refclock-master บน AR1", why: "ถูก: อุปกรณ์ที่จะเป็น server ต้อง sync ตัวเองเสร็จก่อน และต้องมี stratum น้อยกว่า client; ถ้าไม่มีแหล่งภายนอกอาจใช้ refclock-master ตั้ง local clock เป็น master" },
        { t: "ต้องเปลี่ยนเป็นโหมด broadcast เท่านั้น", why: "ผิด: unicast ใช้งานได้ ปัญหาอยู่ที่ server ยังไม่ sync" },
        { t: "ต้องเปลี่ยน UDP port เป็น 161", why: "ผิด: NTP ใช้ UDP 123 ส่วน 161 เป็นของ SNMP" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `ผู้ดูแลรวม log จาก router 3 ตัวเพื่อสืบสวนเหตุการณ์ พบว่าเหตุการณ์เดียวกันมี timestamp ต่างกันหลายนาที ทำให้เรียงลำดับเหตุการณ์ไม่ได้`,
      q: "ควรแก้ที่ต้นเหตุอย่างไรให้ยั่งยืนที่สุด?",
      opts: [
        { t: "ตั้งเวลาด้วยมือใหม่ทุกสัปดาห์", why: "ผิด: งานเยอะและความแม่นยำไม่พอ เพราะ clock จะเพี้ยนอีก" },
        { t: "ตั้งให้ router ทั้งหมดเป็นลูกข่ายของ NTP time server เดียวกัน (UDP 123)", why: "ถูก: NTP ทำให้เวลาของทุกอุปกรณ์สอดคล้องกัน ซึ่งเป็นกรณีใช้งานหลักคือการวิเคราะห์ log" },
        { t: "ใช้ SNMP Get ดึงเวลาไปเทียบ", why: "ผิด: SNMP ไม่ได้ sync clock ให้อุปกรณ์ แค่อ่านค่า" },
        { t: "ปิด log timestamp", why: "ผิด: ทำให้วิเคราะห์ไม่ได้ยิ่งกว่าเดิม" }
      ],
      ans: 1
    },
    {
      type: "multi",
      story: `ทีม NOC กำลังตั้งค่า SNMPv2c ให้ router เพื่อให้ NMS ที่ IP 192.168.56.12 จัดการ และรับ trap`,
      q: "เลือกทุกข้อที่เป็นความจริง",
      opts: [
        { t: "ใช้ basic ACL permit เฉพาะ 192.168.56.12 แล้วผูกกับ community ด้วยคำสั่ง snmp-agent community ... acl N", ok: true, why: "ถูก: ACL ถูก apply ในคำสั่ง community เพื่อจำกัด NMS" },
        { t: "ACL ในกรณีนี้ต้องคำนึงถึงทิศทาง inbound/outbound", ok: false, why: "ผิด: ตามหนังสือไม่ต้องคำนึงถึงทิศทาง" },
        { t: "Agent รับ Get/Set ที่ UDP 161 และ NMS รับ Trap ที่ UDP 162", ok: true, why: "ถูก: ตามรูป 16.3-16.5" },
        { t: "ใช้ snmp-agent sys-info version v1 v2c เพื่อจำกัดเวอร์ชันที่รองรับ", ok: true, why: "ถูก: default เปิดทุกเวอร์ชัน คำสั่งนี้เปลี่ยนให้เหลือ v1 และ v2c" },
        { t: "community name ที่ตั้งสำเร็จจะถูกเก็บใน config แบบ plain text ให้อ่านง่าย", ok: false, why: "ผิด: เก็บเป็น cipher text" }
      ]
    },
    {
      type: "multi",
      story: `ทีมความปลอดภัยต้องการเข้าใจความแตกต่างระหว่าง SNMPv1, v2c และ v3`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "SNMPv1 ไม่รองรับ GetBulk และ Inform", ok: true, why: "ถูก: v2c เพิ่มสองอย่างนี้" },
        { t: "SNMPv2c ใช้ community name เหมือน v1 แต่รองรับ data type เช่น Counter64", ok: true, why: "ถูก" },
        { t: "เฉพาะ SNMPv3 ที่มี USM และ VACM", ok: true, why: "ถูก: USM = authentication/encryption, VACM = access control" },
        { t: "SNMPv3 มี operation ชุดใหม่ทั้งหมดที่ v2c ไม่มี", ok: false, why: "ผิด: operation ของ v3 เหมือน v2c เพิ่มเรื่อง security" },
        { t: "SNMP ส่งข้อความด้วย TCP", ok: false, why: "ผิด: ใช้ UDP" }
      ]
    },
    {
      type: "multi",
      story: `ทีมโครงสร้างพื้นฐานวางแผน NTP สำหรับองค์กร`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับ NTP ในบทนี้",
      opts: [
        { t: "ใช้ UDP port 123 และเป็น application layer protocol", ok: true, why: "ถูก" },
        { t: "Stratum เลขน้อยแม่นยำกว่า และ 16 คือยังไม่ sync", ok: true, why: "ถูก" },
        { t: "NTP server ใน unicast client/server mode ต้องเก็บ state ของ client ทุกตัว", ok: false, why: "ผิด: server ไม่ต้องเก็บ state ใด ๆ" },
        { t: "Client จะ sync กับ server ก็ต่อเมื่อ stratum ของ server น้อยกว่าของ client", ok: true, why: "ถูก" },
        { t: "Client mode ใช้ Mode = 4 และ server ใช้ Mode = 3", ok: false, why: "ผิด: client = 3, server = 4" }
      ]
    },
    {
      type: "blank",
      story: `ตัวอย่าง SNMP query แบบ SNMPv2c`,
      text: `NMS ต้องการอ่านค่า sysContact จึงส่ง {1} request ไปที่ UDP port {2} ของ agent โดยใส่ community เป็น "public"; agent ตรวจ version และ community แล้วตอบด้วยข้อความ {3}`,
      blanks: [
        { opts: ["Get", "Trap", "Inform", "Set"], ans: 0, why: "การอ่านค่า node เดียวใช้ Get" },
        { opts: ["161", "162", "123", "23"], ans: 0, why: "Agent รับ request ที่ UDP 161" },
        { opts: ["Response", "Trap", "InformRequest", "Hello"], ans: 0, why: "ตอบกลับค่าใน PDU ของ Response (ถ้าล้มเหลวเป็น error response)" }
      ]
    },
    {
      type: "blank",
      story: `สรุปคำสั่ง Huawei ที่ใช้ตั้งค่า NTP`,
      text: `บน server ใช้คำสั่ง ntp-service {1} เพื่อกำหนด local clock เป็น master; บน client ใช้ ntp-service {2} IP-address เพื่อบอกว่าจะ sync กับ server ใด; และตรวจสถานะด้วย display ntp-service {3}`,
      blanks: [
        { opts: ["refclock-master", "unicast-server", "stratum-set", "sessions"], ans: 0, why: "refclock-master ตั้ง master clock และระบุ stratum ได้" },
        { opts: ["refclock-master", "unicast-server", "broadcast", "trap"], ans: 1, why: "unicast-server ระบุ IP ของ time server บน client" },
        { opts: ["status / sessions", "version", "community", "view"], ans: 0, why: "status ดูสถานะ clock และ stratum; sessions ดูสถิติ session" }
      ]
    },
    {
      type: "match",
      q: "จับคู่คำศัพท์กับความหมาย",
      pairs: [
        ["OID", "ตัวระบุ path ของ node ใน MIB tree เช่น 1.3.6.1.2.1.1"],
        ["Trap", "agent รายงาน event เองโดยไม่มี acknowledgement"],
        ["Inform", "agent รายงาน event และต้องได้ InformResponse จาก NMS"],
        ["Stratum 16", "NTP clock ยังไม่ได้ synchronize"],
        ["GetBulk", "ทำ GetNext ต่อเนื่องหลายครั้งในข้อความเดียว"]
      ],
      why: "แต่ละคำเป็นแนวคิดเฉพาะของ SNMP/NTP ตามที่ระบุในบท"
    }
  ]
});
