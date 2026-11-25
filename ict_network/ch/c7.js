IOT.reg({
  id: "c7",
  title: "Ethernet Switching Technologies & VLAN",
  th: "วิวัฒนาการ Ethernet, MAC address, Ethernet frame, การเรียนรู้ MAC table ของ switch, VLAN (access/trunk/hybrid, PVID), การตั้งค่า VLAN และ inter-VLAN routing",
  summary: `
<ul>
<li><b>วิวัฒนาการ</b>: coaxial bus / hub (shared medium, ใช้ <b>CSMA/CD</b>, แบ่ง bandwidth) → <b>switch</b> (มี MAC table, ส่งตาม MAC, แต่ละ port มี bandwidth เป็นของตัวเอง, full-duplex ไม่ใช้ CSMA/CD, store-and-forward)</li>
<li><b>Broadcast domain</b>: switch ทั้งวง (และแต่ละ VLAN) เป็น 1 broadcast domain, <b>router แยก broadcast</b>; ทุก port ของ switch เป็น collision domain ของตัวเอง</li>
<li><b>MAC address</b>: 48 bit (6 byte), OUI = 3 byte แรก (เฉพาะ unicast), BIA ถูกเผาใน ROM; unicast / multicast / broadcast (FF-FF-FF-FF-FF-FF)</li>
<li><b>Ethernet II frame</b>: Dst MAC (6) + Src MAC (6) + Type (2) + Data (46-1500) + CRC (4); Type 0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP, 0x8848 = MPLS; Src MAC ต้องเป็น unicast เท่านั้น</li>
<li><b>MAC table</b>: เรียนรู้จาก <b>source MAC</b> ของ frame ที่เข้ามา (self-learning); aging time ปกติ <b>300 s</b>; ดูด้วย <code>display mac-address</code></li>
<li><b>3 การกระทำ</b>: <b>Flooding</b> (unknown unicast, broadcast, multicast → ทุก port ยกเว้น port ขาเข้า), <b>Forwarding</b> (known unicast → port เดียว), <b>Discarding</b> (dst อยู่ port เดียวกับขาเข้า)</li>
<li><b>VLAN</b> = broadcast domain แบบ logical (Layer 2), VID 12 bit ใช้ได้ <b>1-4094</b>; VLAN 1 = default ลบไม่ได้; ต่าง VLAN คุยกันต้องผ่าน Layer 3</li>
<li><b>Access port</b> = ต่อเครื่องปลายทาง, รับ/ส่ง untagged, อยู่ได้ 1 VLAN; <b>Trunk port</b> = ต่อ switch, ผ่านได้หลาย VLAN ต้องกำหนด allow-pass; <b>Hybrid</b> = มี untagged list + tagged list</li>
<li><b>PVID</b> (default 1): untagged frame ที่เข้า port จะถูกใส่ VID = PVID; frame ที่ออก port ถ้า VID = PVID (trunk) หรือ VID อยู่ใน untagged list (hybrid) จะถอด tag</li>
<li><b>802.1Q tag</b>: แทรกระหว่าง Src MAC กับ Type; มี TPID 0x8100 และ VID 12 bit</li>
<li><b>VLAN types</b>: port-based (นิยมสุด), MAC-based (ต้องใช้ hybrid port, ความปลอดภัยต่ำกว่า), protocol-based</li>
<li><b>Inter-VLAN routing</b>: multi-armed router (1 port ต่อ 1 VLAN), <b>one-armed router</b> (sub-interface + <code>dot1q termination vid</code> + <code>arp broadcast enable</code>, switch ต้องเป็น trunk), <b>Layer 3 switch</b> (<code>interface Vlanif N</code>)</li>
</ul>
<table>
<tr><th>Port</th><th>รับ untagged</th><th>รับ tagged</th><th>ส่งออก</th></tr>
<tr><td>Access</td><td>ใส่ tag = PVID</td><td>รับเฉพาะ VID = PVID</td><td>ถอด tag เสมอ</td></tr>
<tr><td>Trunk</td><td>ใส่ tag = PVID ถ้า PVID อยู่ใน allow-pass</td><td>รับถ้า VID อยู่ใน allow-pass</td><td>VID = PVID ถอด tag, ไม่ใช่ก็คง tag</td></tr>
<tr><td>Hybrid</td><td>ใส่ tag = PVID ถ้าอยู่ใน list ใด list หนึ่ง</td><td>รับถ้าอยู่ใน list ใด list หนึ่ง</td><td>อยู่ untagged list ถอด tag, อยู่ tagged list คง tag</td></tr>
</table>`,
  sections: [
    {
      t: "วิวัฒนาการของ Ethernet: จาก bus/hub สู่ switch",
      ref: "หน้า 235-238",
      html: `
<h4>Shared medium: coaxial bus และ hub</h4>
<p>LAN ยุคแรกใช้สาย coaxial แบบ <b>bus</b> ทุกเครื่องต่อบนสายเส้นเดียว สัญญาณที่ส่งไปจะถึงทุกเครื่อง (<b>broadcast channel</b>) จึงต้องใส่ source/destination address ใน frame และ NIC แต่ละใบต้องมี <b>MAC address</b> ที่ไม่ซ้ำกัน NIC จะรับ frame เฉพาะเมื่อ destination MAC ตรงกับของตน นอกนั้นทิ้ง</p>
<figure><img src="i/p235_1.webp" alt="Ethernet แบบ bus ใช้สาย coaxial ต่อทุกเครื่อง" loading="lazy"><figcaption>Fig. 7.1 Bus Ethernet (ทุกเครื่องใช้สายร่วมกัน สัญญาณถึงทุกเครื่อง)</figcaption></figure>
<p>เมื่อหลายเครื่องส่งพร้อมกันสัญญาณจะซ้อนกัน (collision) จึงใช้ <b>CSMA/CD</b> (Carrier Sense Multiple Access with Collision Detection): ฟังสายก่อนส่ง ถ้าว่างจึงส่ง ถ้าไม่ว่างรอ ระหว่างส่งตรวจ collision ถ้าชนให้รอเวลาสุ่มแล้วส่งใหม่ <b>Hub</b> เปลี่ยนรูปเป็น star แต่ยังทำงานเหมือน bus คือส่งสัญญาณออกทุก port ทุกเครื่องจึงต้องใช้ CSMA/CD และแบ่ง bandwidth ร่วมกัน (ยิ่งมีเครื่องมาก ยิ่งได้ bandwidth ต่อเครื่องน้อย)</p>
<figure><img src="i/p235_2.webp" alt="hub แบบ star ส่งสัญญาณออกทุก port" loading="lazy"><figcaption>Fig. 7.2 Star broadcast channel (hub ส่งออกทุก port เหมือน bus)</figcaption></figure>
<h4>ข้อดีของ switch เทียบกับ hub</h4>
<figure><img src="i/p236_1.webp" alt="ข้อดีของการใช้ switch: ส่งเฉพาะ port ปลายทาง" loading="lazy"><figcaption>Fig. 7.3 Advantages of switch networking (switch ส่ง frame เฉพาะ port ปลายทางตาม MAC table)</figcaption></figure>
<table>
<tr><th>ข้อดี</th><th>อธิบาย</th></tr>
<tr><td>Port exclusive bandwidth</td><td>ทุก port มี bandwidth เต็มของตนเอง เช่น switch 10 Mbit/s 24 port มี switching capacity รวม 240 Mbit/s</td></tr>
<tr><td>Security</td><td>frame unicast ถูกส่งเฉพาะ port ปลายทาง เครื่องอื่นดักจับ (packet capture) ไม่ได้</td></tr>
<tr><td>Full-duplex</td><td>port ต่อกับเครื่องโดยตรง ส่งและรับพร้อมกันได้</td></tr>
<tr><td>ไม่ใช้ CSMA/CD</td><td>เมื่อ full-duplex ไม่เกิด collision จึงไม่ต้องใช้ CSMA/CD แต่ยังเรียก Ethernet เพราะ frame format เหมือนเดิม</td></tr>
<tr><td>ต่าง rate ได้</td><td>เพราะเป็น <b>store-and-forward</b> port ที่ต่อ server/uplink มักเร็วกว่า port ของ PC</td></tr>
<tr><td>Forward broadcast</td><td>broadcast ถูกส่งออกทุก port ยกเว้นขาเข้า ดังนั้นทั้ง switch เป็น <b>broadcast domain</b> เดียว</td></tr>
</table>
<h4>Broadcast domain กับ collision domain</h4>
<p>Broadcast frame มี destination MAC เป็น <b>FF-FF-FF-FF-FF-FF</b> (ทุก bit เป็น 1) เช่น ARP request ไวรัสบางชนิดก็ส่ง broadcast จนเครือข่ายติดขัด <b>Router ไม่ส่งต่อ broadcast</b> จึงเป็นตัวแบ่ง broadcast domain</p>
<figure><img src="i/p238_1.webp" alt="broadcast domain และ collision domain ในเครือข่ายที่มี router switch และ hub" loading="lazy"><figcaption>Fig. 7.4 Broadcast domain and collision domain (router แยก broadcast, แต่ละ port ของ switch แยก collision, hub รวมเป็น collision domain เดียว)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Hub = shared bandwidth + CSMA/CD; Switch = bandwidth ต่อ port + MAC table + full-duplex ไม่ต้อง CSMA/CD</li>
<li>Switch ทั้งตัว (ไม่มี VLAN) = 1 broadcast domain; <b>Router แยก broadcast domain</b></li>
<li>Switch ใช้ store-and-forward จึงต่อ port ต่าง rate ได้</li>
</ul></div>`
    },
    {
      t: "MAC address และ Ethernet frame",
      ref: "หน้า 238-241",
      html: `
<h4>MAC address</h4>
<p>มาตรฐาน IEEE 802 (Project 802 เริ่ม กุมภาพันธ์ 1980 จึงเป็น 80 และ 2) กำหนด MAC address ยาว <b>48 bit (6 byte)</b> ทุก NIC ต้องมี ผู้ผลิตต้องขอ <b>OUI</b> (Organizationally Unique Identifier) 24 bit จาก IEEE แล้วเผา <b>BIA (burned-in address)</b> ลง ROM โดย 3 byte แรกคือ OUI และ 3 byte หลังผู้ผลิตกำหนดไม่ให้ซ้ำ BIA แก้ไม่ได้ Router port ที่ต่อ Ethernet ก็มี MAC address เช่นกัน</p>
<figure><img src="i/p239_1.webp" alt="การจัดประเภท MAC address เป็น unicast multicast broadcast" loading="lazy"><figcaption>Fig. 7.6 MAC address classification and format (bit ที่ 8 ของ byte แรก: 0 = unicast, 1 = multicast, ทุก bit เป็น 1 = broadcast)</figcaption></figure>
<table>
<tr><th>ชนิด</th><th>กฎ</th><th>ตัวอย่าง</th></tr>
<tr><td>Unicast</td><td>bit ที่ 8 ของ byte แรกเป็น 0 (byte แรกเป็นเลขคู่ใน hex)</td><td>00-1E-10-DD-DD-02</td></tr>
<tr><td>Multicast</td><td>bit ที่ 8 ของ byte แรกเป็น 1 (byte แรกเป็นเลขคี่)</td><td>01-80-C2-00-00-01</td></tr>
<tr><td>Broadcast</td><td>ทุก bit เป็น 1 (กรณีพิเศษของ multicast)</td><td>FF-FF-FF-FF-FF-FF</td></tr>
</table>
<p>เฉพาะ <b>unicast</b> เท่านั้นที่ 3 byte แรกคือ OUI ส่วน multicast/broadcast ไม่ใช่ OUI การเขียนใช้ hex 6 กลุ่ม (กลุ่มละ 2 หลัก ต่อด้วย -) หรือ 3 กลุ่ม (กลุ่มละ 4 หลัก) เช่น 00-1E-10-DD-DD-02 = 001E-10DD-DD02</p>
<figure><img src="i/p240_1.webp" alt="ตัวอย่าง MAC address unicast multicast broadcast ในรูปแบบ binary และ hex" loading="lazy"><figcaption>Fig. 7.7 MAC address representation (ตัวอย่างการเขียน MAC แบบ binary และ hex)</figcaption></figure>
<h4>Ethernet frame format</h4>
<p>มี 2 มาตรฐาน: <b>IEEE 802.3</b> และ <b>Ethernet II (DIX)</b> ซึ่งเป็นที่นิยมกว่ามาก อุปกรณ์รองรับทั้งสองแบบ ส่วน 802.3 มักใช้กับ frame ที่พก protocol พิเศษ (เช่น STP BPDU)</p>
<figure><img src="i/p240_3.webp" alt="โครงสร้าง Ethernet II frame" loading="lazy"><figcaption>Fig. 7.9 Ethernet II format (Dst MAC 6, Src MAC 6, Type 2, Data 46-1500, CRC 4 byte)</figcaption></figure>
<figure><img src="i/p240_2.webp" alt="โครงสร้าง IEEE 802.3 frame มี Length DSAP SSAP" loading="lazy"><figcaption>Fig. 7.8 IEEE 802.3 format (ใช้ Length แทน Type และมี DSAP/SSAP/ctrl)</figcaption></figure>
<table>
<tr><th>Field</th><th>ขนาด</th><th>หน้าที่</th></tr>
<tr><td>Destination MAC</td><td>6 B</td><td>ผู้รับ: unicast, multicast หรือ broadcast ก็ได้</td></tr>
<tr><td>Source MAC</td><td>6 B</td><td>ผู้ส่ง: เป็น <b>unicast เท่านั้น</b></td></tr>
<tr><td>Type</td><td>2 B</td><td>ชนิดของ payload: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP, 0x8848 MPLS</td></tr>
<tr><td>Data (load)</td><td>46-1500 B</td><td>payload</td></tr>
<tr><td>CRC</td><td>4 B</td><td>Cyclic Redundancy Check ตรวจ error</td></tr>
</table>
<p>NIC กรอง frame ด้วย hardware: ตรวจ destination MAC ถ้าเป็นของตน (หรือ broadcast/multicast ที่สมัครไว้) จึงรับ ไม่เช่นนั้นทิ้ง เพื่อไม่ให้ CPU เปลืองเวลา แบ่ง frame เป็น unicast frame, multicast frame และ broadcast frame ตามชนิดของ destination MAC</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>MAC = 48 bit; OUI = 24 bit แรก; BIA เปลี่ยนไม่ได้</li>
<li>Source MAC เป็น unicast เสมอ; Destination เป็นได้ทั้ง 3 แบบ</li>
<li>Payload ของ Ethernet II = <b>46-1500 byte</b>; Type 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6</li>
</ul></div>`
    },
    {
      t: "MAC address table และ aging",
      ref: "หน้า 242-243",
      html: `
<h4>MAC address table</h4>
<p>Switch เก็บตาราง <b>MAC address table</b> (หรือ mapping table) ที่ map <b>MAC address → port</b> ใช้ตัดสินใจส่ง unicast frame ดูด้วย <code>display mac-address</code></p>
<figure><img src="i/p242_1.webp" alt="ตัวอย่างผลลัพธ์ display mac-address บน SW2" loading="lazy"><figcaption>Fig. 7.10 View MAC address table (SW2 พอร์ต GE0/0/1 เรียนรู้ MAC ของ PC ที่อยู่หลัง SW1)</figcaption></figure>
<pre><code>&lt;SW2&gt;display mac-address
MAC Address     VLAN/  PEVLAN CEVLAN Port       Type
5489-9853-3b60  1      -      -      GE0/0/1    dynamic
5489-9851-0fbe  1      -      -      Eth0/0/1   dynamic
...
[SW2]display mac-address aging-time
Aging time: 300 seconds</code></pre>
<ul>
<li>Type <b>dynamic</b> = เรียนรู้เอง และจะถูกลบเมื่อครบ aging time; หลาย MAC บน port เดียว (เช่น GE0/0/1) แปลว่า port นั้นต่อไปยัง switch อื่น</li>
<li>ความจุ: low-end หลักพัน, mid-end หลักหมื่น, high-end หลักแสน entry</li>
</ul>
<h4>ทำไมต้องมี aging</h4>
<ol>
<li>ตำแหน่งเครื่อง/switch อาจย้าย entry เก่าจะผิด</li>
<li>entry มากเกินทำให้ค้นช้า กระทบ forwarding speed</li>
</ol>
<p>Default aging = <b>300 s</b> (ปรับได้) ถ้า aging สั้น switch เรียนรู้ตำแหน่งใหม่เร็ว แต่ถ้าเครือข่ายนิ่งแล้วตั้ง aging สั้นเกินไป entry จะหายเร็วและ switch ต้อง flood บ่อยขึ้น</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>MAC table เรียนรู้จาก <b>source MAC</b>; aging default <b>300 s</b></li>
<li>ดูตาราง: <code>display mac-address</code>; ดู aging: <code>display mac-address aging-time</code></li>
</ul></div>`
    },
    {
      t: "3 การกระทำของ switch และการเรียนรู้ของ switch ตัวเดียว",
      ref: "หน้า 243-247",
      html: `
<h4>Flooding, Forwarding, Discarding</h4>
<figure><img src="i/p244_1.webp" alt="การกระทำ 3 แบบของ switch คือ flooding forwarding discarding" loading="lazy"><figcaption>Fig. 7.11 Three frame forwarding actions of the switch</figcaption></figure>
<table>
<tr><th>Action</th><th>ความหมาย</th><th>เกิดเมื่อ</th></tr>
<tr><td><b>Flooding</b></td><td>ส่งออกทุก port ยกเว้น port ที่ frame เข้ามา (point-to-multipoint)</td><td>unknown unicast, broadcast, multicast</td></tr>
<tr><td><b>Forwarding</b></td><td>ส่งออก port เดียวตาม MAC table (point-to-point)</td><td>known unicast ที่ปลายทางอยู่คนละ port กับขาเข้า</td></tr>
<tr><td><b>Discarding</b></td><td>ทิ้ง frame</td><td>dst อยู่บน port เดียวกับที่ frame เข้ามา</td></tr>
</table>
<h4>Self-learning ของ switch 4 port</h4>
<p>เริ่มต้น MAC table ว่าง switch เรียนรู้จาก <b>source MAC</b> ของทุก frame แล้วค่อยใช้ forward</p>
<figure><img src="i/p245_1.webp" alt="switch 4 port ที่ MAC table ยังว่าง" loading="lazy"><figcaption>Fig. 7.12 The MAC address table building process of a switch (เริ่มจากตารางว่าง)</figcaption></figure>
<ol>
<li>PC1 ส่ง Frame X ไป PC3 (Src MAC1, Dst MAC3): ยังไม่รู้ MAC3 จึง <b>flood</b> และเรียนรู้ MAC1 = Port1 (PC2, PC4 ได้รับแต่ทิ้ง)</li>
<li>PC4 ส่ง Frame Y ไป PC1: พบ MAC1 = Port1 จึง <b>forward</b> ตรงไป Port1 และเรียนรู้ MAC4 = Port4</li>
<li>PC3 ส่ง broadcast (Dst = FF-FF-FF-FF-FF-FF): switch ไม่ดู MAC table <b>flood</b> ทันที แต่ยังเรียนรู้ MAC3 = Port3</li>
</ol>
<figure><img src="i/p246_1.webp" alt="PC1 ส่ง frame ไป PC3 แล้ว switch flood" loading="lazy"><figcaption>Fig. 7.13 Flooding (unknown unicast ถูก flood และ switch เรียนรู้ MAC1)</figcaption></figure>
<figure><img src="i/p246_2.webp" alt="PC4 ส่ง frame ไป PC1 switch forward ตาม MAC table" loading="lazy"><figcaption>Fig. 7.14 Forwarding according to the MAC address table</figcaption></figure>
<figure><img src="i/p247_1.webp" alt="PC3 ส่ง broadcast frame switch flood" loading="lazy"><figcaption>Fig. 7.15 PC3 sends a broadcast frame (broadcast ไม่ค้น MAC table แต่ยังเรียนรู้ source)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>เรียนรู้จาก <b>source MAC</b>, ตัดสินใจ forward จาก <b>destination MAC</b></li>
<li>Broadcast ไม่ถูกค้น MAC table และไม่มีทางเป็น source MAC จึงไม่ถูกเรียนรู้</li>
<li>&quot;Forwarding&quot; ในความหมายกว้าง = flooding + forwarding + discarding</li>
</ul></div>`
    },
    {
      t: "การเรียนรู้ MAC ของหลาย switch และสถาปัตยกรรม campus",
      ref: "หน้า 247-251",
      html: `
<h4>Multi-switch networking</h4>
<p>ตัวอย่าง 3 switch และ 4 PC (Fig. 7.16) เริ่มจาก MAC table ว่างทั้งหมด หลักการแต่ละตัวเหมือน switch เดี่ยว</p>
<figure><img src="i/p248_1.webp" alt="เครือข่ายที่มี 3 switch ต่อกับ 4 PC" loading="lazy"><figcaption>Fig. 7.16 Multi-switch networking</figcaption></figure>
<ol>
<li><b>PC1 → PC3</b> (ตารางว่าง): Switch1 flood และเรียนรู้ MAC1 = Port1, Switch2 flood เรียนรู้ MAC1 = Port1, Switch3 flood เรียนรู้ MAC1 = Port3 PC2/PC4 ได้รับแต่ทิ้ง</li>
<li><b>PC4 → PC1</b>: ทุก switch รู้ MAC1 แล้วจึง forward ตรงทีละ hop พร้อมเรียนรู้ MAC4 บนขาเข้าของตน</li>
<li><b>PC2 → PC1</b>: Switch1 ยังไม่รู้ MAC1 จึง flood; Switch2 รู้ว่า MAC1 อยู่ port ที่ frame เข้ามาแล้ว จึง <b>discard</b></li>
<li><b>PC3 ส่ง broadcast</b>: ทุก switch flood และเรียนรู้ MAC3 ที่ port ขาเข้า PC ทุกเครื่องได้รับ เพราะทั้งหมดเป็น broadcast domain เดียว</li>
</ol>
<figure><img src="i/p249_1.webp" alt="PC1 ส่ง unicast ไป PC3 ทุก switch flood และเรียนรู้" loading="lazy"><figcaption>Fig. 7.17 PC1 sends a unicast frame to PC3</figcaption></figure>
<figure><img src="i/p249_2.webp" alt="PC4 ส่ง unicast ไป PC1 forward ตามตาราง" loading="lazy"><figcaption>Fig. 7.18 PC4 sends a unicast frame to PC1</figcaption></figure>
<figure><img src="i/p250_1.webp" alt="PC2 ส่ง frame ไป PC1 switch2 discard" loading="lazy"><figcaption>Fig. 7.19 PC2 sends a unicast frame to PC1 (Switch 2 discard เพราะปลายทางอยู่ port เดียวกับขาเข้า)</figcaption></figure>
<figure><img src="i/p250_2.webp" alt="PC3 ส่ง broadcast ผ่านหลาย switch" loading="lazy"><figcaption>Fig. 7.20 PC3 sends a broadcast frame</figcaption></figure>
<h4>Campus network architecture</h4>
<p>โครงสร้างทั่วไปมี <b>access layer</b> (ต่อผู้ใช้), <b>aggregation layer</b>, <b>core layer</b> และ <b>exit layer</b> (router 2 ตัวออก Internet) โดย firewall อยู่ที่ core เพื่อความมั่นคง และใช้อุปกรณ์คู่ (dual aggregation, dual core, dual router, dual link) เพื่อกัน single point of failure</p>
<figure><img src="i/p251_1.webp" alt="สถาปัตยกรรม campus แบบ access aggregation core exit" loading="lazy"><figcaption>Fig. 7.21 Typical campus network architecture</figcaption></figure>
<div class="note"><b>หมายเหตุ</b> อุปกรณ์คู่ทำให้เกิด loop ใน Layer 2 ซึ่งต้องแก้ด้วย STP (บทที่ 8)</div>`
    },
    {
      t: "VLAN: แนวคิด, หลาย VLAN บน switch เดียว, VLAN ข้าม switch",
      ref: "หน้า 251-257",
      html: `
<h4>VLAN คืออะไร</h4>
<p><b>VLAN (Virtual LAN)</b> คือกลุ่มอุปกรณ์/ผู้ใช้เชิง logical ที่ไม่ผูกกับตำแหน่งทางกายภาพ แบ่ง LAN เดียวออกเป็นหลาย <b>broadcast domain</b> ตามแผนก/ความปลอดภัย ทำงานที่ Layer 2 (และเกี่ยวข้อง Layer 3) ต่าง VLAN สื่อสารกันได้ต้องผ่าน <b>router หรือ Layer 3 switch</b></p>
<figure><img src="i/p252_1.webp" alt="สร้าง VLAN ตามแผนกบน switch หลายชั้น" loading="lazy"><figcaption>Fig. 7.22 VLAN illustration (แต่ละแผนกอยู่คนละ VLAN แม้กระจายหลายชั้น)</figcaption></figure>
<table>
<tr><th>ประโยชน์</th><th>อธิบาย</th></tr>
<tr><td>คุมขอบเขต broadcast</td><td>broadcast ไม่ข้าม VLAN</td></tr>
<tr><td>Security</td><td>แยกเครื่องความลับออกจากคนอื่น; ต่าง VLAN คุยกันไม่ได้ที่ data link layer ต้องผ่าน Layer 3 ที่คุม traffic ได้</td></tr>
<tr><td>Performance</td><td>ลด traffic ที่ไม่จำเป็นด้วยการแบ่ง flat network</td></tr>
<tr><td>IT productivity</td><td>จัดการง่าย ผู้ใช้ความต้องการคล้ายกันอยู่ VLAN เดียวกัน</td></tr>
</table>
<h4>หลาย VLAN บน switch เดียว</h4>
<p>ทุก port เริ่มต้นอยู่ <b>VLAN 1</b> (default VLAN ลบไม่ได้) Frame ที่เข้า port จะถูก <b>ติด tag ของ VLAN ที่ port นั้นสังกัด</b> และ tag จะถูกถอดเมื่อออกจาก port ปลายทาง เครื่องปลายทางไม่รู้เรื่อง tag เลย</p>
<figure><img src="i/p253_1.webp" alt="ทุก port ของ switch เริ่มต้นอยู่ VLAN 1" loading="lazy"><figcaption>Fig. 7.23 Switch port belongs to VLAN 1 by default</figcaption></figure>
<figure><img src="i/p254_1.webp" alt="การสื่อสารภายใน VLAN เดียวกันบน switch" loading="lazy"><figcaption>Fig. 7.24 Same VLAN communication process of the switch (ติด tag ขาเข้า ถอด tag ขาออก)</figcaption></figure>
<p>การแบ่ง VLAN เท่ากับแยก switch เป็น switch เสมือนหลายตัว (S1-VLAN1, S1-VLAN2) ดังรูป ถึงตั้ง IP อยู่ subnet เดียวกันก็คุยกันไม่ได้ ต้องกำหนด <b>subnet ต่างกัน</b> (เช่น 192.168.1.0/24 และ 192.168.2.0/24) และผ่าน router</p>
<figure><img src="i/p254_2.webp" alt="แผนภาพเทียบเท่า VLAN เป็น switch แยกกันและ router เชื่อม" loading="lazy"><figcaption>Fig. 7.25 VLAN equivalence diagram</figcaption></figure>
<h4>VLAN ข้าม switch และ trunk</h4>
<p>เครื่องแผนกเดียวกันอาจอยู่คนละ switch จึงต้องให้ VLAN <b>ข้าม switch</b> วิธีตรงไปตรงมาคือใช้สายแยกต่อ VLAN ละเส้น แต่สิ้นเปลือง จึงใช้ <b>trunk link</b> เส้นเดียวส่งหลาย VLAN โดย frame บน trunk มี VLAN tag เพื่อให้อีกฝั่งรู้ว่า frame เป็นของ VLAN ใด</p>
<figure><img src="i/p255_1.webp" alt="VLAN ข้าม switch ใช้สายแยกต่อ VLAN" loading="lazy"><figcaption>Fig. 7.26 Cross-switch VLAN (แยกสายต่อ VLAN)</figcaption></figure>
<figure><img src="i/p256_1.webp" alt="trunk link ส่ง frame หลาย VLAN พร้อม tag" loading="lazy"><figcaption>Fig. 7.27 Trunk link frames with VLAN tags (VLAN information ไม่หายเมื่อผ่าน trunk)</figcaption></figure>
<ul>
<li><b>Access link</b> (เครื่อง - switch): frame เป็น untagged</li>
<li><b>Trunk link</b> (switch - switch): frame มี tag ได้ ผ่านหลาย VLAN</li>
</ul>
<h4>ข้อผิดพลาดคลาสสิก: ใช้ access port ต่อ switch</h4>
<p>ถ้าต่อ switch ด้วย access port ที่ VLAN ต่างกันที่สองฝั่ง (เช่น S1 port เป็น VLAN 1, S2 port เป็น VLAN 2) frame ถอด tag แล้วไปถูกติด tag VLAN ใหม่ ทำให้ broadcast ของ VLAN หนึ่งหลุดไปอีก VLAN ซึ่งทำลายการแยก broadcast และเกิดปัญหาอธิบายยาก</p>
<figure><img src="i/p257_1.webp" alt="การต่อ switch ด้วย access port ทำให้ broadcast ข้าม VLAN" loading="lazy"><figcaption>Fig. 7.28 Do not use access port to connect switches (broadcast รั่วไปหลาย VLAN)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>VLAN = broadcast domain; ต่าง VLAN ต้อง routing (router / L3 switch) และต้องต่าง subnet</li>
<li>VLAN 1 = default, ลบไม่ได้; ทุก port เริ่มอยู่ VLAN 1</li>
<li>ต่อ switch กับ switch ที่ต้องส่งหลาย VLAN ให้ใช้ <b>trunk</b> ไม่ใช่ access</li>
</ul></div>`
    },
    {
      t: "Link type และ port type: access, trunk, hybrid และ PVID",
      ref: "หน้า 257-260",
      html: `
<h4>แนวคิด tagged / untagged / PVID</h4>
<p>Frame ที่วิ่งบนสายอาจ <b>tagged</b> หรือ <b>untagged</b> ก็ได้ แต่ frame ที่เคลื่อนระหว่าง port ภายใน switch ต้อง <b>tagged เสมอ</b> เมื่อ frame ไม่มี tag switch ต้องจัดเข้า VLAN ตามหลักการหนึ่ง (เช่น port ที่เข้ามา) แต่ละ port (access/trunk/hybrid) ต้องมี <b>PVID (Port VLAN ID)</b> = VLAN ที่ untagged frame ขาเข้าจะถูกจัดให้ (default = 1) VLAN ID ที่ใช้ได้ 1-4094</p>
<h4>กฎของแต่ละ port</h4>
<p><b>1. Access port</b> (ต่อเครื่องปลายทาง อยู่ได้ 1 VLAN)</p>
<ul>
<li>รับ untagged: ใส่ tag VID = PVID แล้วส่งต่อ</li>
<li>รับ tagged: ถ้า VID = PVID ส่งต่อ ไม่ใช่ทิ้ง</li>
<li>ส่งออก (frame tagged จาก port อื่นใน switch): ถ้า VID = PVID ถอด tag แล้วส่ง ไม่ใช่ทิ้ง</li>
</ul>
<p><b>2. Trunk port</b> (ต้องมี PVID และ list ของ VLAN ที่อนุญาต allow-pass)</p>
<ul>
<li>รับ untagged: ใส่ tag = PVID แล้วตรวจว่า PVID อยู่ใน allow-pass ถ้าใช่ส่งต่อ ไม่ใช่ทิ้ง</li>
<li>รับ tagged: ถ้า VID อยู่ใน allow-pass ส่งต่อ ไม่ใช่ทิ้ง</li>
<li>ส่งออก: VID ไม่อยู่ใน list = ทิ้ง; อยู่ใน list และ VID = PVID = <b>ถอด tag</b>; อยู่ใน list แต่ VID ≠ PVID = <b>คง tag</b></li>
</ul>
<p><b>3. Hybrid port</b> (PVID + untagged list + tagged list)</p>
<ul>
<li>รับ untagged: ใส่ tag = PVID แล้วตรวจว่าอยู่ใน list ใดก็ได้ ถ้าไม่อยู่ทิ้ง</li>
<li>รับ tagged: VID ต้องอยู่ใน untagged list หรือ tagged list</li>
<li>ส่งออก: VID อยู่ใน untagged list = ถอด tag; อยู่ใน tagged list = คง tag; ไม่อยู่ทั้งสอง = ทิ้ง</li>
</ul>
<div class="note"><b>ความสัมพันธ์</b> Access และ Trunk เป็นกรณีพิเศษของ Hybrid: ถ้า untagged list มีเฉพาะ PVID = เหมือน trunk; ถ้าเช่นนั้นและ tagged list ว่าง = เหมือน access</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Access ส่งออกเป็น untagged เสมอ; Trunk ส่งออก tag ยกเว้น VID = PVID</li>
<li><b>PVID ของ trunk สองฝั่งต้องตรงกัน</b> ไม่เช่นนั้น VLAN ของ untagged frame จะเปลี่ยนข้าม switch</li>
<li>Hybrid ใช้ในกรณีต้องการควบคุม tag ราย VLAN เช่น MAC-based VLAN</li>
</ul></div>
<div class="warn"><b>ระวัง</b> frame untagged ที่ออกจาก trunk (VID = PVID) ถ้าอีกฝั่งมี PVID ต่างกัน จะถูกจัดเข้า VLAN อื่น เป็นสาเหตุหนึ่งของ VLAN รั่ว</div>`
    },
    {
      t: "ชนิดของ VLAN",
      ref: "หน้า 260-261",
      html: `
<p>Frame จากเครื่องผู้ใช้เป็น untagged เสมอ switch จึงต้องมีหลักการจัดเข้า VLAN ซึ่งแบ่งเป็นชนิด:</p>
<table>
<tr><th>ชนิด</th><th>หลักการ</th><th>จุดเด่น/จุดด้อย</th></tr>
<tr><td><b>Port-based</b> (Layer 1 VLAN)</td><td>VLAN ID ผูกกับ port ที่ frame เข้ามา</td><td>ง่าย ปลอดภัย เชื่อถือได้ <b>ใช้มากที่สุด</b>; ย้ายเครื่องไป port อื่น VLAN อาจเปลี่ยน</td></tr>
<tr><td><b>MAC-based</b> (Layer 2 VLAN)</td><td>ตาราง MAC → VLAN ID ในตัว switch ดู source MAC</td><td>ยืดหยุ่น ย้าย port แล้ว VLAN ไม่เปลี่ยน; ความปลอดภัยต่ำกว่า เพราะปลอม MAC ได้</td></tr>
<tr><td><b>Protocol-based</b> (Layer 3 VLAN)</td><td>ดู Type field เช่น 0x0800 ไป VLAN หนึ่ง, 0x86DD ไปอีก VLAN</td><td>แยก IPv4 / IPv6 เป็นคนละ VLAN</td></tr>
</table>
<div class="note"><b>หมายเหตุ</b> ในบทเรียน เมื่อกล่าวถึง VLAN โดยไม่ระบุ หมายถึง port-based VLAN</div>`
    },
    {
      t: "Configure port-based VLAN ข้าม switch",
      ref: "หน้า 261-265",
      html: `
<h4>โจทย์ตัวอย่าง</h4>
<p>LSW1 (aggregation) ต่อ LSW2 และ LSW3 (access) มี 6 PC: PC1/PC2 อยู่ VLAN 1, PC3/PC4 อยู่ VLAN 2, PC5/PC6 อยู่ VLAN 3 ต้องสร้าง VLAN, กำหนด port เป็น access, port ระหว่าง switch เป็น trunk ผ่าน VLAN 1-3 และดู tagged frame</p>
<figure><img src="i/p261_1.webp" alt="topology VLAN ข้าม switch ที่มี LSW1 LSW2 LSW3 และ 6 PC" loading="lazy"><figcaption>Fig. 7.29 Cross-switch VLAN (LSW1 เป็น aggregation; LSW2, LSW3 เป็น access)</figcaption></figure>
<div class="warn"><b>กฎการวาง VLAN</b> ทั้ง 3 switch ต้องสร้าง VLAN ให้ตรงกัน แม้ LSW1 (aggregation) จะไม่มีเครื่องอยู่ VLAN 2 และ 3 ก็ต้องสร้าง; และ PVID ของ trunk ที่เชื่อมกันต้องตรงกัน</div>
<h4>สร้าง VLAN</h4>
<pre><code>[LSW2]vlan 2
[LSW2-vlan2]quit
[LSW2]vlan 3
[LSW2-vlan3]quit
[LSW2]display vlan summary          # ดูจำนวน VLAN
[LSW2]vlan batch 4 5 6              # สร้างหลาย VLAN พร้อมกัน (4, 5, 6)
[LSW2]vlan batch 10 to 20           # สร้าง VLAN 10 ถึง 20 (11 VLAN)
[LSW2]undo vlan batch 4 5 6         # ลบหลาย VLAN</code></pre>
<p>VLAN 1 เป็น default ไม่ต้องสร้าง</p>
<h4>กำหนด access port ด้วย port-group</h4>
<pre><code>[LSW2]port-group vlan2port
[LSW2-port-group-vlan2port]group-member Ethernet0/0/6 to Ethernet0/0/10
[LSW2-port-group-vlan2port]port link-type access
[LSW2-port-group-vlan2port]port default vlan 2    # PVID ของ port เหล่านี้เป็น 2
[LSW2-port-group-vlan2port]quit</code></pre>
<p>ชนิด port ที่เลือกได้: <code>access</code>, <code>trunk</code>, <code>hybrid</code>, <code>dot1q-tunnel</code> (QinQ)</p>
<h4>กำหนด trunk port</h4>
<pre><code>[LSW2]interface GigabitEthernet0/0/1
[LSW2-GigabitEthernet0/0/1]port link-type trunk
[LSW2-GigabitEthernet0/0/1]port trunk allow-pass vlan 1 2 3   # หรือ vlan all
[LSW2-GigabitEthernet0/0/1]port trunk pvid vlan 2             # เปลี่ยน PVID ของ trunk (default 1)</code></pre>
<h4>ตรวจสอบ</h4>
<pre><code>[LSW2]display interface Ethernet0/0/1    # ดู PVID ของ port
[LSW2]display vlan
VID Type   Ports
1   common UT:Eth0/0/1(U) ... GE0/0/1(U)       # UT = untagged (PVID 1 ผ่านโดยไม่มี tag)
2   common UT:Eth0/0/6(U) ... TG:GE0/0/1(U)    # TG = tagged (VLAN 2 ผ่าน trunk มี tag)</code></pre>
<h4>802.1Q tag</h4>
<p>จากการดักจับบน trunk พบว่า switch Huawei แทรก VLAN tag <b>ระหว่าง data link layer และ network layer</b> ตามรูปแบบ <b>IEEE 802.1Q</b> VLAN ID มี <b>12 bit</b> ค่า 0 และ 4095 สงวนไว้ จึงใช้ได้ <b>1-4094</b></p>
<figure><img src="i/p265_1.webp" alt="โครงสร้าง tagged VLAN frame แบบ 802.1Q จาก packet capture" loading="lazy"><figcaption>Fig. 7.30 Tagged VLAN frame structure (802.1Q tag ของ VLAN 2 แทรกใน frame)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ต่อเครื่อง = <code>port link-type access</code> + <code>port default vlan N</code>; ต่อ switch = <code>port link-type trunk</code> + <code>port trunk allow-pass vlan ...</code></li>
<li><code>vlan batch 10 to 20</code> = 11 VLAN; <code>vlan batch 10 20</code> = 2 VLAN</li>
<li>VLAN 1 ลบไม่ได้; ค่า VID สงวน 0 และ 4095</li>
</ul></div>`
    },
    {
      t: "Configure MAC address-based VLAN",
      ref: "หน้า 265-267",
      html: `
<p>เหมาะกับอุปกรณ์เคลื่อนที่ที่เสียบสายเข้า network เช่น laptop ที่ใช้ได้ในห้องประชุมหลายห้อง ไม่ว่าเสียบ port ไหน switch จัดเข้า VLAN ที่กำหนดตาม MAC</p>
<p>ตัวอย่าง: Laptop1 (0001-00ef-00c0) อยู่ VLAN 100 และ Laptop2 (0001-00ef-00c1) อยู่ VLAN 200 ต่อเข้าห้องประชุมที่ SwitchA/SwitchB port GE1/0/1 และต้องเข้าถึง server ของแผนกตนเท่านั้น</p>
<figure><img src="i/p266_1.webp" alt="topology MAC-based VLAN มี SwitchA SwitchB SwitchC และ laptop 2 เครื่อง" loading="lazy"><figcaption>Fig. 7.31 MAC address-based VLAN (laptop ย้ายห้องแต่ยังอยู่ VLAN เดิมตาม MAC)</figcaption></figure>
<pre><code>[SwitchA]vlan batch 100 200
[SwitchA]interface gigabitethernet 1/0/2
[SwitchA-GigabitEthernet1/0/2]port link-type trunk
[SwitchA-GigabitEthernet1/0/2]port trunk allow-pass vlan 100 200
[SwitchA]vlan 100
[SwitchA-vlan100]mac-vlan mac-address 0001-00ef-00c0     # MAC นี้ไป VLAN 100
[SwitchA]vlan 200
[SwitchA-vlan200]mac-vlan mac-address 0001-00ef-00c1     # MAC นี้ไป VLAN 200
[SwitchA]interface gigabitethernet1/0/1
[SwitchA-GigabitEthernet1/0/1]port link-type hybrid       # MAC-based ใช้ได้เฉพาะ hybrid
[SwitchA-GigabitEthernet1/0/1]port hybrid untagged vlan 100 200
[SwitchA-GigabitEthernet1/0/1]mac-vlan enable
[SwitchA]display mac-vlan mac-address all</code></pre>
<ul>
<li>port ที่ต่อ laptop ต้องเป็น <b>hybrid</b> และ <b>untagged vlan 100 200</b> (ถอด tag ก่อนส่งให้ laptop) และเปิด <code>mac-vlan enable</code></li>
<li>SwitchC (ต่อ server): port ไป SwitchA/B เป็น trunk ผ่าน VLAN 100 200; port ต่อ server เป็น access (เช่น <code>port default vlan 100</code>)</li>
<li>ปัญหา: ปลอม MAC ได้ จึงปลอดภัยน้อยกว่า port-based</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>MAC-based VLAN: <code>mac-vlan mac-address</code> ใน vlan view + hybrid port + <code>mac-vlan enable</code></li>
<li>ใช้กับ laptop ที่ย้ายตำแหน่ง; ข้อเสียคือความปลอดภัยต่ำ</li>
</ul></div>`
    },
    {
      t: "Inter-VLAN routing: router, one-armed router และ Layer 3 switch",
      ref: "หน้า 267-273",
      html: `
<h4>ทำไมต้องมี</h4>
<p>VLAN แยก broadcast domain และแยก traffic ต้องใช้ <b>Layer 3 device</b> (router หรือ Layer 3 switch) ส่ง packet ข้าม VLAN แต่ละ VLAN ใช้ subnet ต่างกัน และ default gateway ของเครื่องใน VLAN คือ IP ของ interface ฝั่ง router ที่อยู่ VLAN นั้น</p>
<h4>วิธีที่ 1: multi-armed router</h4>
<p>ต่อ port จริงของ router 1 port ต่อ 1 VLAN (แต่ละ port ต่อ access port ของ switch) แต่ละเส้นเรียกว่า &quot;arm&quot; ข้อเสีย: ใช้ port ของ router มาก ขยาย VLAN ยาก</p>
<figure><img src="i/p268_1.webp" alt="inter-VLAN routing ด้วย multi-armed router" loading="lazy"><figcaption>Fig. 7.32 Implement inter-VLAN routing with a multi-armed router</figcaption></figure>
<h4>วิธีที่ 2: one-armed router (router on a stick)</h4>
<p>ต่อ port เดียวของ router เข้า <b>trunk port</b> ของ switch แล้วแบ่ง port เป็น <b>sub-interface</b> ต่อ 1 VLAN ใช้ IP ของ sub-interface เป็น gateway ของ VLAN นั้น frame ที่ผ่านลิงก์จะมี VLAN tag ของแต่ละ VLAN (ยกเว้น VLAN ของ PVID)</p>
<figure><img src="i/p269_1.webp" alt="inter-VLAN routing ด้วย one-armed router ผ่าน trunk" loading="lazy"><figcaption>Fig. 7.33 Implement inter-VLAN routing with a one-armed router</figcaption></figure>
<figure><img src="i/p270_1.webp" alt="ตัวอย่างการตั้งค่า one-armed router กับ LSW1 และ AR1" loading="lazy"><figcaption>Fig. 7.34 Implement inter-VLAN routing by using a one-armed router (GE0/0/0 เป็น gateway VLAN 1, .2 VLAN 2, .3 VLAN 3)</figcaption></figure>
<pre><code># Switch: ต่อ router ด้วย trunk
[LSW1]interface GigabitEthernet0/0/3
[LSW1-GigabitEthernet0/0/3]port link-type trunk
[LSW1-GigabitEthernet0/0/3]port trunk allow-pass vlan all

# Router AR1
[AR1]interface GigabitEthernet0/0/0            # physical = gateway ของ VLAN 1 (PVID 1, untagged)
[AR1-GigabitEthernet0/0/0]ip address 192.168.1.1 24
[AR1]interface GigabitEthernet0/0/0.2          # sub-interface
[AR1-GigabitEthernet0/0/0.2]ip address 192.168.2.1 24
[AR1-GigabitEthernet0/0/0.2]dot1q termination vid 2   # ผูกกับ VLAN 2
[AR1-GigabitEthernet0/0/0.2]arp broadcast enable      # ต้องเปิด
[AR1]interface GigabitEthernet0/0/0.3
[AR1-GigabitEthernet0/0/0.3]ip address 192.168.3.1 24
[AR1-GigabitEthernet0/0/0.3]dot1q termination vid 3
[AR1-GigabitEthernet0/0/0.3]arp broadcast enable</code></pre>
<div class="warn"><b>arp broadcast enable</b> ปิดไว้เป็นค่า default ถ้าไม่เปิด sub-interface จะทิ้ง IP packet (เหมือน black hole) เพราะ router ส่ง ARP broadcast แบบมี tag ออก sub-interface ไม่ได้ ถ้าเปิด router จะสร้าง tagged ARP broadcast ส่งออก</div>
<p>เลข sub-interface ไม่จำเป็นต้องตรงกับเลข VLAN แต่ตั้งให้ตรงเพื่อจำง่าย VLAN ที่ตรงกับ PVID ของ trunk ฝั่ง switch (VLAN 1) ใช้ physical interface รับ untagged frame</p>
<h4>วิธีที่ 3: Layer 3 switch และ Vlanif</h4>
<p>Layer 3 switch ใส่โมดูล routing ใน switch ใช้ ASIC ทำ hardware forwarding เร็วกว่ามาก ให้นึกว่าเป็น &quot;router เสมือน + switch&quot; ซึ่ง router เสมือนมี <b>Vlanif</b> เป็น virtual interface เชื่อมแต่ละ VLAN ไม่กิน port จริง เพียงกำหนด IP และ mask ให้ Vlanif เป็น gateway ของ VLAN</p>
<figure><img src="i/p272_1.webp" alt="แผนภาพเทียบเท่า Layer 3 switch เป็น router เสมือนที่มี Vlanif" loading="lazy"><figcaption>Fig. 7.35 Layer 3 switch equivalence diagram (router เสมือนมองไม่เห็น Vlanif 1, Vlanif 2 ต่อเข้า VLAN)</figcaption></figure>
<pre><code>[LSW1]interface Vlanif 1
[LSW1-Vlanif1]ip address 192.168.1.1 24
[LSW1]interface Vlanif 2
[LSW1-Vlanif2]ip address 192.168.2.1 24
[LSW1]interface Vlanif 3
[LSW1-Vlanif3]ip address 192.168.3.1 24
&lt;LSW1&gt;display ip interface brief</code></pre>
<table>
<tr><th>วิธี</th><th>จุดเด่น</th><th>ข้อจำกัด</th></tr>
<tr><td>Multi-armed router</td><td>เข้าใจง่าย</td><td>1 VLAN ต่อ 1 physical port</td></tr>
<tr><td>One-armed router</td><td>ใช้ port เดียว (sub-interface)</td><td>bandwidth เส้นเดียวร่วมกัน, ต้องมี trunk, dot1q termination, arp broadcast</td></tr>
<tr><td>Layer 3 switch</td><td>เร็ว (hardware), ไม่ต้องใช้ port, ตั้งง่าย</td><td>ต้องมีอุปกรณ์ L3</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ต่าง VLAN = ต่าง subnet + ต้องผ่าน Layer 3</li>
<li>One-armed router: switch ฝั่ง router เป็น trunk; router ใช้ sub-interface + <code>dot1q termination vid N</code> + <code>arp broadcast enable</code></li>
<li>Router รับ frame tag VLAN A ถอด tag แล้ว route ติด tag VLAN B แล้วส่ง (บนลิงก์เดียวกัน)</li>
<li>Layer 3 switch: <code>interface Vlanif N</code> + IP = gateway ของ VLAN N</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `Switch ตัวหนึ่งเพิ่งเปิดเครื่อง MAC table ว่าง PC1 (MAC1) ต่อ Port1 ส่ง unicast frame ไป PC3 (MAC3) ซึ่งต่อ Port3 โดย switch มี Port1-Port4`,
      q: "switch ทำอย่างไรกับ frame นี้ และเรียนรู้อะไร?",
      opts: [
        { t: "flood ออก Port2, Port3, Port4 และเรียนรู้ MAC1 = Port1", why: "ถูก: ยังไม่รู้ MAC3 (unknown unicast) จึง flood ออกทุก port ยกเว้นขาเข้า และเรียนรู้จาก source MAC (MAC1 อยู่ Port1)" },
        { t: "forward ออก Port3 เท่านั้นและเรียนรู้ MAC3 = Port3", why: "ผิด: ยังไม่เคยเห็น MAC3 จึงไม่รู้ว่าอยู่ port ใด และการเรียนรู้ใช้ source MAC ไม่ใช่ destination MAC" },
        { t: "ทิ้ง frame เพราะ MAC table ว่าง", why: "ผิด: switch ไม่ทิ้ง unknown unicast แต่ flood" },
        { t: "flood ออกทุก port รวม Port1 ด้วย", why: "ผิด: flooding ไม่ส่งกลับ port ที่ frame เข้ามา" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `SW1: Port1-PC1, Port2-PC2, Port3 ต่อไป SW2 ; SW2: Port1 ต่อไป SW1, Port2-PC3 MAC table ทุกเครื่องว่าง PC1 ส่ง frame ไป PC3 จากนั้น PC3 ตอบกลับ PC1 (ไม่มี frame อื่น)`,
      q: "หลังจบทั้งสอง frame MAC table ของ SW1 และ SW2 มี entry ใดบ้าง?",
      opts: [
        { t: "SW1: MAC1-Port1, MAC3-Port3 ; SW2: MAC1-Port1, MAC3-Port2", why: "ถูก: frame แรก SW1 เรียน MAC1 ที่ Port1, SW2 เรียน MAC1 ที่ Port1; frame ตอบกลับ SW2 เรียน MAC3 ที่ Port2 และ SW1 เรียน MAC3 ที่ Port3" },
        { t: "SW1: MAC1-Port1 เท่านั้น ; SW2: MAC3-Port2 เท่านั้น", why: "ผิด: frame ตอบกลับผ่านทั้งสอง switch จึงเรียน MAC3 ที่ SW1 ด้วย และ frame แรกผ่าน SW2 จึงเรียน MAC1 ที่ SW2 ด้วย" },
        { t: "SW1: MAC3-Port1, MAC1-Port3 ; SW2: MAC3-Port1, MAC1-Port2", why: "ผิด: สลับ port และ MAC; ต้องเรียนจาก source MAC ที่ port ขาเข้า" },
        { t: "SW1 และ SW2 ว่าง เพราะ frame ถูก flood", why: "ผิด: การ flood ไม่ได้ห้ามการเรียนรู้ ทุก switch เรียนรู้ source MAC ทุกครั้ง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `SW2 มี entry MAC1-Port1 อยู่แล้ว (Port1 ต่อไป SW1) PC2 ซึ่งอยู่หลัง SW1 ส่ง unicast ไป PC1 (MAC1) ซึ่งอยู่หลัง SW1 เช่นกัน และ SW1 flood frame นี้ไป SW2 ผ่าน Port1 ของ SW2`,
      q: "SW2 ทำอย่างไรกับ frame นี้?",
      opts: [
        { t: "discard เพราะ MAC1 อยู่ Port1 ซึ่งเป็น port ที่ frame เข้ามา", why: "ถูก: ปลายทางอยู่ทิศเดียวกับขาเข้า ไม่ต้องส่งกลับ" },
        { t: "flood ออกทุก port ยกเว้น Port1", why: "ผิด: flood เฉพาะกรณีไม่รู้ปลายทาง หรือ broadcast/multicast" },
        { t: "forward ออก Port1 กลับไป", why: "ผิด: switch ไม่ส่ง frame กลับ port ที่รับเข้ามา" },
        { t: "ลบ entry MAC1 แล้วเรียนรู้ใหม่", why: "ผิด: source ของ frame คือ MAC2 ไม่ใช่ MAC1 entry MAC1 ไม่เปลี่ยน" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องจำแนก MAC address 4 ค่า: A = 0100-5E00-0001, B = 5489-9853-3B60, C = FFFF-FFFF-FFFF, D = 00-1E-10-DD-DD-02`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "A เป็น multicast MAC (byte แรก 0x01 มี bit ท้ายเป็น 1)", ok: true, why: "ถูก: byte แรกเป็นเลขคี่ = multicast" },
        { t: "B เป็น unicast MAC (byte แรก 0x54 เป็นเลขคู่) ที่ 3 byte แรก 54-89-98 คือ OUI", ok: true, why: "ถูก: unicast จึงมี OUI เป็น 3 byte แรก" },
        { t: "C เป็น broadcast MAC และใช้เป็น source MAC ได้", ok: false, why: "ผิด: C เป็น broadcast จริง แต่ source MAC ต้องเป็น unicast เท่านั้น" },
        { t: "D เป็น unicast MAC", ok: true, why: "ถูก: byte แรก 0x00 เป็นเลขคู่" },
        { t: "A มี 3 byte แรกเป็น OUI ของผู้ผลิต", ok: false, why: "ผิด: OUI ใช้เฉพาะ unicast ส่วน multicast ไม่ใช่ OUI" }
      ]
    },
    {
      type: "blank",
      story: `วิศวกรอ่านข้อมูลจาก packet capture บน Ethernet II frame ที่พก ARP request ไปยัง broadcast`,
      text: `destination MAC = {1} ; ฟิลด์ Type = {2} ; payload ขั้นต่ำของ frame = {3} byte ; ฟิลด์ CRC ยาว {4} byte`,
      blanks: [
        { opts: ["FF-FF-FF-FF-FF-FF", "00-00-00-00-00-00", "01-80-C2-00-00-00", "00-1E-10-DD-DD-02"], ans: 0, why: "ARP request เป็น broadcast frame ใช้ MAC ที่ทุก bit เป็น 1" },
        { opts: ["0x0800", "0x0806", "0x86DD", "0x8848"], ans: 1, why: "0x0806 = ARP; 0x0800 = IPv4; 0x86DD = IPv6; 0x8848 = MPLS" },
        { opts: ["0", "18", "46", "64"], ans: 2, why: "Ethernet II data field 46-1500 byte (ถ้าน้อยกว่าต้อง padding)" },
        { opts: ["2", "4", "6", "8"], ans: 1, why: "CRC ยาว 4 byte" }
      ]
    },
    {
      type: "choice",
      story: `ผู้ดูแลรัน display mac-address บน switch พบว่า port GE0/0/1 มี MAC 5 รายการ และเครื่องผู้ใช้ 3 เครื่องที่ต่อกับ Eth0/0/1-3 มีรายการละ 1 MAC ส่วนที่เหลือทั้งหมดอยู่ GE0/0/1 และ Type = dynamic`,
      q: "ข้อสรุปใดสมเหตุสมผลที่สุด?",
      opts: [
        { t: "GE0/0/1 ต่อไปยัง switch อีกตัว และ entry จะถูกลบเองถ้าไม่ถูกใช้เกิน 300 s (default)", why: "ถูก: หลาย MAC บน port เดียวแสดงว่าอยู่หลัง switch อื่น; dynamic entry มี aging time 300 s" },
        { t: "GE0/0/1 ต่อเครื่องเดียวที่ปลอม MAC 5 ค่า และ entry ถาวร", why: "ผิด: ไม่มีหลักฐานการปลอม และ dynamic ไม่ใช่ถาวร" },
        { t: "entry เป็น dynamic จึงไม่หมดอายุ", why: "ผิด: dynamic คือหมดอายุได้ตาม aging time" },
        { t: "GE0/0/1 เป็น collision domain เดียวกับ Eth0/0/1-3", why: "ผิด: แต่ละ port ของ switch เป็น collision domain แยก" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Access port G0/0/5 ของ SWA ตั้ง PVID = 10 มี host ต่ออยู่ ผู้ทดสอบส่ง frame ที่มี 802.1Q tag VID = 20 เข้าไปที่ port นี้`,
      q: "switch จัดการ frame นี้อย่างไร?",
      opts: [
        { t: "discard เพราะ access port รับ tagged frame เฉพาะที่ VID = PVID", why: "ถูก: VID 20 ไม่เท่ากับ PVID 10 จึงทิ้ง" },
        { t: "จัดเข้า VLAN 20 และส่งต่อ", why: "ผิด: access port ไม่ยอมรับ tag ที่ไม่ตรง PVID" },
        { t: "ถอด tag แล้วจัดเข้า VLAN 10", why: "ผิด: switch ไม่แปลง VID ให้เอง ถ้า VID ไม่ตรงจะทิ้ง" },
        { t: "ส่งออกทุก VLAN เพราะไม่ทราบ", why: "ผิด: ไม่มีพฤติกรรมนี้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Trunk port G0/0/1 ของ SW1 ตั้ง PVID = 2 และ allow-pass vlan 1 2 3 มี frame ภายใน switch 3 เฟรม จะออกที่ port นี้: frame ของ VLAN 2, VLAN 3 และ VLAN 5`,
      q: "ผลที่สายเป็นอย่างไร?",
      opts: [
        { t: "VLAN 2 ออกแบบ untagged, VLAN 3 ออกแบบ tagged (VID 3), VLAN 5 ถูกทิ้ง", why: "ถูก: VID = PVID ถอด tag; VID อยู่ใน allow-pass แต่ไม่เท่า PVID คง tag; VID ไม่อยู่ใน list ทิ้ง" },
        { t: "ทั้ง VLAN 2 และ VLAN 3 ออก untagged ส่วน VLAN 5 tagged", why: "ผิด: ถอด tag เฉพาะ VID ที่เท่ากับ PVID และ VLAN 5 ไม่อยู่ใน allow-pass" },
        { t: "VLAN 2 ออกแบบ tagged, VLAN 3 ออกแบบ untagged, VLAN 5 ออกแบบ tagged", why: "ผิด: สลับ ความจริงคือ VLAN 2 (PVID) ไม่มี tag" },
        { t: "ทั้งสามออก tagged เสมอ", why: "ผิด: trunk ไม่ใส่ tag ให้ VID ที่เท่ากับ PVID" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Host A ต่อ SWA G0/0/1 (access PVID 2), Host B ต่อ SWB G0/0/1 (access PVID 2), Host C ต่อ SWB G0/0/3 (access PVID 3) ทั้งสามอยู่ subnet เดียวกัน SWA G0/0/2 และ SWB G0/0/2 เป็น trunk ที่ allow all VLAN โดย SWA G0/0/2 PVID 2 แต่ SWB G0/0/2 PVID 3`,
      q: "การสื่อสารของ Host A เป็นอย่างไร?",
      opts: [
        { t: "A ติดต่อได้เฉพาะ C", why: "ถูก: frame VLAN 2 ออกจาก SWA trunk (PVID 2) แบบ untagged เข้า SWB trunk (PVID 3) ถูกติด tag VLAN 3 จึงไปถึง C (VLAN 3) แต่ไม่ถึง B (VLAN 2); ขากลับ C ส่งออก trunk untagged แล้ว SWA จัดเข้า VLAN 2 ถึง A" },
        { t: "A ติดต่อได้เฉพาะ B", why: "ผิด: A กับ B อยู่ VLAN เดียวกันแต่ SWB รับ frame จาก trunk เป็น VLAN 3 เนื่องจาก PVID ไม่ตรงกัน" },
        { t: "A ติดต่อได้ทั้ง B และ C", why: "ผิด: frame เข้า SWB ถูกจัดเป็น VLAN 3 เท่านั้น B อยู่ VLAN 2 จะไม่ได้รับ" },
        { t: "A ติดต่อไม่ได้กับทั้งคู่", why: "ผิด: ยังติดต่อกับ C ได้เพราะ PVID สองฝั่ง mismatch ทำให้ VLAN รั่วไปเป็น VLAN 3" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลสังเกตว่า SWA กับ SWB ต่อกันด้วย trunk เส้นเดียว: Host A กับ Host C (VLAN 10) คุยกันผ่าน trunk โดย frame เป็น untagged ส่วน Host B กับ Host D (VLAN 20) คุยกันผ่าน trunk โดย frame ติด tag VID = 20 ทุก VLAN ผ่านได้`,
      q: "ข้อใดสรุปการตั้งค่า trunk port ของ SWA ได้ถูกต้อง?",
      opts: [
        { t: "PVID ของ trunk port เท่ากับ 10 และ allow-pass รวม VLAN 10 และ 20", why: "ถูก: VLAN 10 ผ่านแบบ untagged แสดงว่า VID = PVID = 10 ส่วน VLAN 20 ที่คง tag ต้อง ≠ PVID และอยู่ใน allow-pass" },
        { t: "PVID ของ trunk port เท่ากับ 20", why: "ผิด: ถ้า PVID = 20 ฝั่ง VLAN 20 จะ untagged ไม่ใช่ VLAN 10" },
        { t: "PVID ของ trunk port เท่ากับ 1", why: "ผิด: VLAN 1 ไม่ใช่ VLAN ที่ untagged ในเหตุการณ์ที่เห็น" },
        { t: "trunk port ไม่อนุญาต VLAN 10 ผ่าน", why: "ผิด: VLAN 10 ผ่านได้ โดยเป็น untagged" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `S1 พอร์ต F1 (access VLAN 10) ต่อกับ S2 พอร์ต F1 (access VLAN 20) เพราะช่างต่อสายผิด PC-A (VLAN 10 บน S1) ส่ง broadcast ARP`,
      q: "ผลลัพธ์ใดน่าจะเกิดขึ้น?",
      opts: [
        { t: "broadcast รั่วเข้า VLAN 20 บน S2 และ PC ใน VLAN 20 ได้รับ", why: "ถูก: ออกจาก access port แบบ untagged เข้าอีกฝั่งถูกติด tag VLAN 20 ทำให้ broadcast domain สองอันรวมกัน" },
        { t: "frame ถูกทิ้งที่ S2 เพราะ VLAN ไม่ตรง", why: "ผิด: frame ที่ออกจาก access port ไม่มี tag จึง S2 รับเป็น untagged แล้วติด PVID 20" },
        { t: "S2 ส่งกลับไป VLAN 10 อัตโนมัติ", why: "ผิด: ไม่มีกลไกนี้" },
        { t: "VLAN 10 และ VLAN 20 ถูกรวมเป็น VLAN 1", why: "ผิด: VLAN ไม่ถูกรวมเป็น VLAN 1 เพียงแต่ traffic รั่วตาม PVID" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Hybrid port G0/0/9 มี PVID = 10, untagged list = {10, 20}, tagged list = {30} ภายใน switch มี frame ของ VLAN 20, VLAN 30 และ VLAN 40 ที่จะออก port นี้`,
      q: "ผลที่สายเป็นอย่างไร?",
      opts: [
        { t: "VLAN 20 ออกแบบ untagged, VLAN 30 ออกแบบ tagged, VLAN 40 ถูกทิ้ง", why: "ถูก: ตาม untagged list ถอด tag, tagged list คง tag, ไม่อยู่ทั้งสอง list ทิ้ง" },
        { t: "VLAN 20 ถูกทิ้งเพราะไม่เท่า PVID", why: "ผิด: hybrid ไม่ได้อ้างอิง PVID อย่างเดียว ใช้ untagged/tagged list" },
        { t: "ทั้ง 3 ออกแบบ untagged", why: "ผิด: VLAN 30 อยู่ tagged list จึงคง tag และ VLAN 40 ไม่อยู่ใน list" },
        { t: "VLAN 40 ออกแบบ tagged ตาม default", why: "ผิด: VLAN ที่ไม่อยู่ใน list ใดจะถูกทิ้ง" }
      ],
      ans: 0
    },
    {
      type: "blank",
      story: `วิศวกรสร้าง VLAN ด้วยคำสั่งต่อไปนี้บนสวิตช์ที่ยังไม่มี VLAN ใดนอกจาก VLAN 1`,
      text: `vlan batch 10 20 สร้าง {1} VLAN ; vlan batch 10 to 20 สร้าง {2} VLAN ; vlan batch 10 to 14 30 สร้าง {3} VLAN ; ค่า VID ที่ใช้ได้สูงสุดคือ {4}`,
      blanks: [
        { opts: ["2", "10", "11", "20"], ans: 0, why: "ไม่มีคำว่า to จึงสร้างเฉพาะ 10 และ 20" },
        { opts: ["2", "10", "11", "20"], ans: 2, why: "10 ถึง 20 = 11 VLAN" },
        { opts: ["2", "5", "6", "7"], ans: 2, why: "10,11,12,13,14 (5 VLAN) บวก 30 = 6 VLAN" },
        { opts: ["1024", "4094", "4095", "65535"], ans: 1, why: "VID 12 bit แต่ 0 และ 4095 สงวน ใช้ได้ 1-4094" }
      ]
    },
    {
      type: "choice",
      story: `One-armed router AR1 ต่อ trunk กับ switch; sub-interface G0/0/0.2 เป็น gateway VLAN 20 (192.168.20.1/24) และ G0/0/0.1 เป็น gateway VLAN 10 โดยตั้ง dot1q termination vid ถูกต้อง PC-B (VLAN 20) ส่ง packet ไป PC-A (VLAN 10)`,
      q: "AR1 ทำอย่างไรกับ frame ที่รับเข้า sub-interface G0/0/0.2?",
      opts: [
        { t: "ถอด tag VLAN 20, route ตาม routing table แล้วติด tag VLAN 10 ส่งออก G0/0/0.1", why: "ถูก: router terminate tag ขาเข้า ทำ Layer 3 routing แล้วเข้ารหัส tag ใหม่ของ VLAN ปลายทางที่ sub-interface ปลายทาง" },
        { t: "ส่งต่อ frame ออก G0/0/0.1 ทั้งที่ยังมี tag 20", why: "ผิด: router ไม่ bridge ข้าม sub-interface; จะ routing แล้วเปลี่ยน tag เป็น 10" },
        { t: "ถอด tag แล้วส่งออกแบบ untagged", why: "ผิด: VLAN 10 ถ้าไม่ใช่ PVID ของ trunk ต้องติด tag 10" },
        { t: "ทิ้ง frame เพราะ sub-interface ต่าง VLAN คุยกันไม่ได้", why: "ผิด: นั่นคือหน้าที่ของ inter-VLAN routing" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `หลังตั้ง one-armed router เสร็จ PC ใน VLAN 2 ping gateway ไม่ได้ ผู้ดูแลตรวจพบว่า sub-interface G0/0/0.2 ตั้ง ip address และ dot1q termination vid 2 ถูกต้อง switch trunk ก็ถูกต้อง แต่ไม่ได้ตั้ง arp broadcast enable`,
      q: "สาเหตุที่น่าจะเป็นจริงที่สุดคืออะไร?",
      opts: [
        { t: "sub-interface ไม่ส่ง ARP broadcast แบบ tagged จึงหา MAC ไม่ได้และทิ้ง IP packet (black hole)", why: "ถูก: ค่า default ปิด arp broadcast ที่ sub-interface; ต้องเปิดด้วย arp broadcast enable" },
        { t: "ต้องเปลี่ยน sub-interface ให้ตรงกับเลขของ VLAN เท่านั้นจึงจะทำงาน", why: "ผิด: เลข sub-interface ไม่ต้องตรงกับเลข VLAN (แค่ตั้งให้ตรงเพื่อจำง่าย)" },
        { t: "VLAN 2 ลืมสร้างบน router", why: "ผิด: router ไม่สร้าง VLAN ใช้ dot1q termination" },
        { t: "ต้องใช้ access port แทน trunk", why: "ผิด: one-armed router ต้องใช้ trunk" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทมีพนักงานใช้ laptop เดินไปทำงานห้องประชุมต่าง ๆ และเสียบสาย LAN ที่ port ใดก็ได้ แต่ต้องอยู่ VLAN ของแผนกตนเสมอ`,
      q: "ควรใช้ VLAN แบบใด และตั้ง port อย่างไร?",
      opts: [
        { t: "MAC-based VLAN โดย port เป็น hybrid, untagged VLAN ที่เกี่ยวข้อง และ mac-vlan enable", why: "ถูก: VLAN ผูกกับ MAC ของ laptop จึงไม่เปลี่ยนเมื่อย้าย port และ MAC-based ใช้ได้เฉพาะ hybrid port" },
        { t: "Port-based VLAN โดยตั้ง access port ทุก port เป็น VLAN เดียวกัน", why: "ผิด: ไม่สามารถแยกแผนกตามเครื่องได้ เพราะ VLAN ผูกกับ port ไม่ใช่เครื่อง" },
        { t: "Protocol-based VLAN ตาม Type 0x0800", why: "ผิด: แยกตามชนิดโปรโตคอล ไม่ใช่ตามเครื่องหรือแผนก" },
        { t: "ใช้ trunk port ทุก port", why: "ผิด: trunk ใช้เชื่อม switch ไม่ใช่ต่อเครื่องปลายทาง" }
      ],
      ans: 0
    },
    {
      type: "match",
      q: "จับคู่คำสั่ง/คำศัพท์กับความหมาย",
      pairs: [
        ["display mac-address", "ดู MAC address table ของ switch"],
        ["port trunk allow-pass vlan 1 2 3", "อนุญาตให้ VLAN 1, 2, 3 ผ่าน trunk port"],
        ["port default vlan 2", "กำหนด PVID/VLAN ของ access port เป็น 2"],
        ["dot1q termination vid 3", "ผูก sub-interface ของ router กับ VLAN 3"],
        ["interface Vlanif 2", "สร้าง virtual interface เป็น gateway VLAN 2 บน Layer 3 switch"]
      ],
      why: "คำสั่งแต่ละตัวทำหน้าที่ต่างกัน: ดูตาราง, ตั้ง trunk, ตั้ง access, ตั้ง sub-interface และตั้ง Vlanif"
    }
  ]
});
