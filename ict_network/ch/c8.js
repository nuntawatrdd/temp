IOT.reg({
  id: "c8",
  title: "Advanced Ethernet Switching: STP, Link Aggregation, Smart Link",
  th: "ปัญหา loop (broadcast storm, MAC flapping), STP/RSTP/MSTP, การเลือก root bridge/root port/designated port, port state, Eth-Trunk (manual/LACP, load-balance), Smart Link และ Monitor Link",
  summary: `
<ul>
<li><b>Loop</b> ใน Layer 2 (จากการต่อซ้ำซ้อน) ทำให้เกิด <b>broadcast storm</b> และ <b>MAC address flapping</b>; STP แก้โดย <b>block port</b> ให้เหลือโครงสร้างต้นไม้ที่ไม่มี loop</li>
<li><b>STP versions</b>: STP (802.1D, ช้าเป็นสิบวินาที, ทุก VLAN ใช้ tree เดียว), <b>RSTP</b> (802.1w, converge เร็วระดับวินาที, 3 state: discarding/learning/forwarding), <b>MSTP</b> (802.1s, instance/region, load balance ระหว่าง VLAN); Huawei default = <b>MSTP</b></li>
<li><b>Bridge ID (BID)</b> = priority 2 byte (default <b>32768</b>) + bridge MAC 6 byte; priority ปรับเป็น <b>ทวีคูณของ 4096</b> (0-61440); <b>Port ID</b> ของ Huawei = port priority 1 byte (default 128) + port number 1 byte</li>
<li><b>4 ขั้น</b>: (1) เลือก <b>root bridge</b> = BID เล็กสุด (2) เลือก <b>root port</b> ของ non-root bridge ทุกตัว (ตัวเดียว) (3) เลือก <b>designated port</b> ของทุก segment (4) ที่เหลือ = <b>alternate port</b> ถูก block</li>
<li><b>Root port</b>: เทียบ <b>RPC</b> ต่ำสุด → BID ของ upstream switch → PID; RPC = ผลรวม path cost (10M = 2,000,000; 100M = 200,000; 1G = 20,000; 10G = 2,000)</li>
<li><b>Designated port</b>: RPC เล็กสุด → BID → PID; port ทุกตัวของ root bridge เป็น designated; port ที่ต่อ PC ก็เป็น designated</li>
<li><b>BPDU</b> ส่ง multicast 01-80-C2-00-00-00; <b>Configuration BPDU</b> (Hello 2 s, MaxAge 20 s, Forward Delay 15 s) และ <b>TCN BPDU</b>; เมื่อรับ TC ลด aging ของ MAC table จาก 300 s เหลือ 15 s</li>
<li><b>STP port states</b>: Blocking → Listening (15 s) → Learning (15 s) → Forwarding (รวม 30 s); Disabled; ค่า default ตอนเปิดเครื่องคือ blocking</li>
<li><b>Link Aggregation (Eth-Trunk)</b>: รวมหลาย link เป็น logical link เดียว เพิ่ม bandwidth + redundancy + load balance; STP จะ block link ซ้ำ ถ้าไม่ทำ Eth-Trunk</li>
<li><b>Harmful disorder</b> แก้โดยส่ง flow เดียวกัน (hash ตาม MAC/IP) ผ่าน link เดียวกัน; ผลคือ load ไม่เท่ากันเสมอไป</li>
<li><b>Mode</b>: <b>Manual</b> (ตรวจแค่ physical state, ตรวจ miswire ไม่ได้) vs <b>LACP</b> (<code>mode lacp-static</code>, negotiate ด้วย LACPDU)</li>
<li><b>Load-balance</b>: src/dst/src-dst ของ MAC หรือ IP; เลือกตามฟิลด์ที่มีค่าหลากหลายมาก; มีผลเฉพาะ traffic ขาออกของ switch นั้น</li>
<li>Member port ต้องเหมือนกัน: speed, duplex, link-type, PVID/allow-pass VLAN</li>
<li><b>Smart Link</b>: dual-uplink, master active / slave inactive, switch ระดับมิลลิวินาที, ใช้ <b>flush frame</b> (dst 01-0F-E2-00-00-04, ใน control VLAN) ให้ upstream ล้าง MAC entry; <b>ใช้ร่วมกับ STP ไม่ได้</b> (ต้อง <code>stp disable</code> บน port); restore เป็น option, wtr default 60 s</li>
<li><b>Monitor Link</b>: 1 uplink + หลาย downlink; uplink ล้ม → downlink down ทั้งหมด เพื่อกระตุ้น Smart Link ฝั่งล่างให้ switch</li>
<li><b>ทางเลือกแทน STP</b>: Link aggregation, Smart Link, iStack/CSS (รวม switch เป็นตัวเดียว), ออกแบบไม่ให้มี Layer 2 loop</li>
</ul>
<table>
<tr><th>Port State (STP)</th><th>ส่ง/รับ BPDU</th><th>เรียน MAC</th><th>ส่ง user data</th></tr>
<tr><td>Blocking</td><td>รับอย่างเดียว</td><td>ไม่</td><td>ไม่</td></tr>
<tr><td>Listening</td><td>ส่ง/รับ</td><td>ไม่</td><td>ไม่</td></tr>
<tr><td>Learning</td><td>ส่ง/รับ</td><td>ใช่</td><td>ไม่</td></tr>
<tr><td>Forwarding</td><td>ส่ง/รับ</td><td>ใช่</td><td>ใช่</td></tr>
</table>`,
  sections: [
    {
      t: "ปัญหา loop ใน switch network",
      ref: "หน้า 279-280",
      html: `
<h4>Single point of failure และการเพิ่ม redundancy</h4>
<p>ถ้า access switch ต่อกับ aggregation switch ตัวเดียว (Fig. 8.1) การเสียของ aggregation switch ทำให้ access switch ทั้งสองคุยกันไม่ได้ จึงติดตั้ง aggregation switch คู่ (Fig. 8.2) แต่เมื่อมีหลายเส้นทาง switch network จะเกิด <b>physical loop</b></p>
<figure><img src="i/p279_1.webp" alt="เครือข่ายที่มี aggregation switch ตัวเดียว เป็น single point of failure" loading="lazy"><figcaption>Fig. 8.1 Single aggregation layer network (aggregation switch เสียแล้วเครือข่ายขาด)</figcaption></figure>
<figure><img src="i/p279_2.webp" alt="เครือข่ายที่มี aggregation switch คู่ เกิด loop และ MAC flapping" loading="lazy"><figcaption>Fig. 8.2 Dual aggregation layer network (redundant แต่เกิด loop ที่เห็นการ flap ของ MAC3 ที่ access switch 2)</figcaption></figure>
<h4>Broadcast storm</h4>
<p>เมื่อ PC3 ส่ง broadcast switch ที่ได้รับ flood ออกทุก port broadcast จึงวนใน loop ไปเรื่อย ๆ ใช้ bandwidth และทรัพยากรของ switch จนเครื่องรับ frame ปกติไม่ได้ (Ethernet frame ไม่มี TTL จึงวนไม่จบ)</p>
<h4>MAC address flapping</h4>
<p>จาก Fig. 8.2: เวลา 1 Access switch 2 รับ broadcast ของ PC3 ที่ GE0/0/1 เรียน MAC3-GE0/0/1, เวลา 2 รับ copy ที่วนกลับมาที่ GE0/0/2 เปลี่ยนเป็น MAC3-GE0/0/2, เวลา 3 รับที่ GE0/0/3 เปลี่ยนเป็น MAC3-GE0/0/3 entry ของ MAC เดียวเปลี่ยน port รัว ๆ เรียกว่า <b>MAC address flapping</b> กินทรัพยากรประมวลผลและอาจทำให้ switch ล่มได้</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Redundant link ใน Layer 2 = loop → <b>broadcast storm</b> + <b>MAC flapping</b></li>
<li>Switch แก้ด้วย <b>STP</b> โดย block port</li>
</ul></div>`
    },
    {
      t: "ภาพรวม STP: เวอร์ชัน, BID และ PID",
      ref: "หน้า 280-282",
      html: `
<p>STP สร้างโครงสร้าง tree ที่ไม่มี loop ในเครือข่าย Layer 2 โดยแลกเปลี่ยน <b>BPDU (Bridge Protocol Data Unit)</b> เพื่อเลือก <b>root bridge</b>, <b>root port</b> และ <b>designated port</b>; port ที่เป็น root port และ designated port อยู่ใน forwarding ส่วนที่เหลือถูก block ถ้า topology เปลี่ยนจะคำนวณ tree ใหม่ STP ใช้ได้กับอุปกรณ์ทุกค่าย หลักการเหมือนกัน</p>
<h4>3 เวอร์ชัน</h4>
<table>
<tr><th>เวอร์ชัน</th><th>มาตรฐาน</th><th>จุดสำคัญ</th></tr>
<tr><td><b>STP</b></td><td>IEEE 802.1D</td><td>ทุก VLAN ใช้ tree เดียว traffic เส้นทางเดียวกัน; converge ช้า (หลายสิบวินาที)</td></tr>
<tr><td><b>RSTP</b></td><td>IEEE 802.1w</td><td>converge เร็ว (ปกติไม่กี่วินาที); port state เหลือ 3: <b>discarding, learning, forwarding</b>; ใช้แทน STP ในปัจจุบัน</td></tr>
<tr><td><b>MSTP</b></td><td>IEEE 802.1s</td><td>มี <b>instance</b> (กลุ่ม VLAN) และ <b>region</b>; แต่ละ instance คำนวณ tree ของตัวเอง จึง <b>load balance</b> ได้ และไม่เสีย bandwidth ของ link ที่ถูก block ทุก VLAN</td></tr>
</table>
<p><b>Huawei switch ใช้ MSTP เป็น default</b></p>
<h4>คำศัพท์พื้นฐาน</h4>
<ul>
<li><b>Bridge</b>: ชื่อเดิมของ switch (IEEE ยังใช้คำนี้ หมายถึง switch กี่ port ก็ได้)</li>
<li><b>Bridge MAC address</b>: ปกติใช้ MAC ของ port ที่มีหมายเลขน้อยสุด</li>
<li><b>Bridge ID (BID)</b> = <b>Bridge priority (2 byte, default 32768)</b> + <b>Bridge MAC (6 byte)</b></li>
<li><b>Port ID (PID)</b> ของ Huawei = Port priority (1 byte, default 128) + Port number (1 byte)</li>
</ul>
<figure><img src="i/p282_1.webp" alt="โครงสร้าง Bridge ID ประกอบด้วย priority และ MAC" loading="lazy"><figcaption>Fig. 8.3 BID composition (2 byte priority + 6 byte MAC)</figcaption></figure>
<figure><img src="i/p282_2.webp" alt="โครงสร้าง Port ID สองแบบ" loading="lazy"><figcaption>Fig. 8.4 PID composition (Huawei ใช้แบบ priority 1 byte + port number 1 byte)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>BID default = 32768.MAC; priority ปรับเป็น <b>ทวีคูณ 4096</b> ได้ 0-61440</li>
<li>RSTP มี 3 state; MSTP ใช้ instance เพื่อ load balance; Huawei default = MSTP</li>
</ul></div>`
    },
    {
      t: "หลักการทำงาน STP: เลือก root bridge, root port, designated port",
      ref: "หน้า 282-287",
      html: `
<p>STP ทำงาน 4 ขั้นตอนตามตัวอย่าง Fig. 8.5 (switch A-E)</p>
<figure><img src="i/p283_1.webp" alt="ตัวอย่างเครือข่าย 5 switch ที่ใช้อธิบายการทำงานของ STP" loading="lazy"><figcaption>Fig. 8.5 Working process of Spanning Tree Protocol</figcaption></figure>
<h4>ขั้น 1: เลือก Root Bridge</h4>
<ul>
<li>ตอนเปิดเครื่อง ทุก switch คิดว่าตนเป็น root และประกาศใน BPDU (ส่งทุก 2 s)</li>
<li>เมื่อรับ BPDU จะเทียบ BID ของ root ที่ประกาศกับตนเอง switch ที่มี <b>BID เล็กสุด</b> ชนะ (เทียบ priority ก่อน ถ้าเท่ากันเทียบ MAC)</li>
<li>ตัวอย่าง: A และ B priority เท่ากัน MAC ของ B (4c1f-cc82-6053) เล็กกว่า A (4c1f-ccc4-3dad) B จึงเป็น root</li>
<li>ควรกำหนดล่วงหน้าให้ switch ที่แรงและใกล้ศูนย์กลางเป็น root (primary) และอีกตัวเป็น backup (secondary) ด้วยการปรับ priority</li>
</ul>
<h4>ขั้น 2: เลือก Root Port ของ non-root bridge</h4>
<p>non-root bridge แต่ละตัวมี <b>root port ได้ไม่เกิน 1 port</b> คือ port ที่อยู่ใกล้ root bridge ที่สุด เกณฑ์เรียงตามลำดับ:</p>
<ol>
<li><b>Root Path Cost (RPC)</b> ต่ำสุด (ผลรวม path cost ของทุก link ไปถึง root)</li>
<li>ถ้าเท่ากัน เทียบ <b>BID ของ upstream switch</b> (BID ใน BPDU ที่รับ) เล็กกว่าชนะ</li>
<li>ถ้ายังเท่ากัน เทียบ <b>PID</b> (ตามตัวอย่างในหนังสือ เทียบ PID ของ port ฝั่ง upstream ที่ส่ง BPDU มา)</li>
</ol>
<table>
<tr><th>Port bandwidth</th><th>Path cost (IEEE 802.1t)</th></tr>
<tr><td>10 Mbit/s</td><td>2,000,000</td></tr>
<tr><td>100 Mbit/s</td><td>200,000</td></tr>
<tr><td>1000 Mbit/s</td><td>20,000</td></tr>
<tr><td>10 Gbit/s</td><td>2,000</td></tr>
</table>
<p>bandwidth ยิ่งสูง cost ยิ่งต่ำ</p>
<figure><img src="i/p285_2.webp" alt="เลือก root port: S1 เป็น root มี Path 1 และ Path 2 ไปยัง S4" loading="lazy"><figcaption>Fig. 8.6 Determine the root port (ถ้า cost ของสองเส้นทางเท่ากัน S4 เทียบ BID ของ S2 กับ S3)</figcaption></figure>
<h4>ขั้น 3: เลือก Designated Port ของแต่ละ segment</h4>
<p>ทุก link (segment) ต้องมี designated port 1 ตัว (ฝั่งที่ชนะ) เกณฑ์: <b>RPC เล็กกว่า</b> → <b>BID เล็กกว่า</b> → <b>PID เล็กกว่า</b></p>
<ul>
<li><b>ทุก port ของ root bridge เป็น designated port</b></li>
<li>port ที่ต่อ PC (segment ที่มี switch ตัวเดียว) เป็น designated port</li>
<li>ถ้า LAN เป็น hub ให้ถือ hub เป็นสาย ไม่ร่วม STP ถ้า switch ตัวเดียวต่อ 2 port เข้า hub ให้เทียบ PID ของ 2 port นั้น</li>
</ul>
<figure><img src="i/p286_1.webp" alt="เลือก designated port ระหว่าง S2 และ S3 และ LAN ที่ต่อ hub" loading="lazy"><figcaption>Fig. 8.7 Determine the designated port (S2 BID เล็กกว่า S3 จึงเป็น designated port ของ segment ระหว่างทั้งสอง)</figcaption></figure>
<h4>ขั้น 4: Block alternate port</h4>
<p>port ที่ไม่เป็นทั้ง root port และ designated port = <b>alternate port</b> ถูก block เชิง logical: ไม่ forward user data frame แต่ <b>ยังรับและประมวลผล BPDU</b> ได้ ส่วน root และ designated port ทั้ง รับ/ส่ง BPDU และ forward ข้อมูล เมื่อ block ครบ tree ที่ไม่มี loop ก็เสร็จ</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลำดับ: root bridge (BID) → root port (RPC, upstream BID, PID) → designated port (RPC, BID, PID) → block alternate</li>
<li>root bridge: ทุก port เป็น designated; non-root bridge: root port ได้สูงสุด 1</li>
<li>alternate port ยังรับ BPDU ได้ แต่ไม่ส่งข้อมูลผู้ใช้</li>
</ul></div>`
    },
    {
      t: "ชนิด BPDU และการแจ้ง topology change",
      ref: "หน้า 287-288",
      html: `
<p>STP ใช้ frame รูปแบบ <b>IEEE 802.3</b> พก <b>BPDU</b> เป็น payload ส่งแบบ <b>multicast ที่ MAC 01-80-C2-00-00-00</b> สร้าง/ส่ง/รับ/ประมวลผลโดยตัว switch เอง ไม่ใช่เครื่องผู้ใช้</p>
<table>
<tr><th>ชนิด</th><th>ใช้ทำอะไร</th></tr>
<tr><td><b>Configuration BPDU</b></td><td>คำนวณ spanning tree (ส่งเป็นระยะ Hello Time = 2 s)</td></tr>
<tr><td><b>TCN BPDU</b> (Topology Change Notification)</td><td>แจ้ง topology เปลี่ยน เพื่อย่นเวลา aging ของ MAC table จาก 300 s เหลือ 15 s</td></tr>
</table>
<h4>การส่ง Configuration BPDU</h4>
<ul>
<li>ช่วงสร้าง tree ครั้งแรก ทุก switch ส่งเอง ทุก 2 s</li>
<li>เมื่อเสถียรแล้ว <b>เฉพาะ root bridge</b> ส่งทุก Hello Time (2 s) switch อื่นรับที่ root port แล้วสร้างของตนส่งออก designated port (เหมือน BPDU ส่งผ่านทีละ hop)</li>
</ul>
<h4>กระบวนการแจ้ง topology change</h4>
<ol>
<li>switch ที่ link เสียรู้ได้ทันที ส่ง <b>TCN BPDU</b> ออก root port ไปหา upstream ทุก Hello Time จนกว่าจะได้ ACK (configuration BPDU ที่ตั้ง flag <b>TCA</b> = 1)</li>
<li>upstream ตอบ TCA ทาง designated port และส่ง TCN ต่อขึ้นไปทาง root port ทำซ้ำจนถึง root bridge</li>
<li>root bridge ส่ง configuration BPDU ที่ตั้ง flag <b>TC</b> = 1 ให้ทุก switch</li>
<li>switch ที่ได้รับ TC=1 ลด aging ของ MAC table จาก 300 s เหลือเท่า <b>Forward Delay (15 s)</b> เพื่อให้ entry เก่าที่ผิดหมดอายุเร็ว</li>
</ol>
<figure><img src="i/p288_1.webp" alt="กระบวนการแจ้ง topology change ด้วย TCN และ TC" loading="lazy"><figcaption>Fig. 8.8 Network topology change advertisement process (TCN ส่งขึ้นไปหา root แล้ว root แจ้ง TC ลงมา)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>BPDU dst = <b>01-80-C2-00-00-00</b>; Hello 2 s, MaxAge 20 s, Forward Delay 15 s</li>
<li>TCN วิ่งขึ้นไป root; TC=1 วิ่งลงจาก root; ผลคือ MAC aging 300 s → 15 s</li>
</ul></div>`
    },
    {
      t: "Port state ของ STP",
      ref: "หน้า 288-289",
      html: `
<p>port บน switch ที่รัน STP เปลี่ยนระหว่าง 5 state</p>
<table>
<tr><th>State</th><th>พฤติกรรม</th></tr>
<tr><td><b>Blocking</b></td><td>ไม่ forward frame ฟัง BPDU เท่านั้น; <b>ค่าเริ่มต้นของทุก port ตอนเปิดเครื่อง</b></td></tr>
<tr><td><b>Listening</b></td><td>ฟัง BPDU เพื่อยืนยันว่าไม่เกิด loop ก่อนส่งข้อมูล ยังไม่มี MAC table</td></tr>
<tr><td><b>Learning</b></td><td>ฟัง BPDU และ <b>เรียน MAC</b> แต่ยังไม่ forward ข้อมูล</td></tr>
<tr><td><b>Forwarding</b></td><td>ส่งและรับ data frame ทั้งหมด (ถ้ายังเป็น designated หรือ root port ตอนจบ learning)</td></tr>
<tr><td><b>Disabled</b></td><td>ถูกปิดโดยผู้ดูแล ไม่ทำงาน</td></tr>
</table>
<ul>
<li><b>Forward Delay</b> = เวลาจาก listening → learning และ learning → forwarding แต่ละช่วง default <b>15 s</b> ดูได้จาก <code>display stp</code></li>
<li>รวม blocking → forwarding ใช้ประมาณ <b>30 s</b> (ไม่รวมเวลารอ MaxAge ตอน topology เปลี่ยน)</li>
<li>ปกติ port อยู่ใน blocking หรือ forwarding ส่วน listening/learning เห็นเฉพาะตอน topology เปลี่ยน</li>
<li>port ที่ blocked ยังรับ BPDU ได้แต่ไม่ส่ง user frame</li>
</ul>
<div class="note"><b>เทียบ RSTP</b> RSTP รวม blocking/listening/disabled เป็น <b>discarding</b> เหลือ 3 state: discarding, learning, forwarding จึง converge เร็วกว่า (ในจอแสดงผล Huawei จะเห็น DISCARDING)</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>STP 5 state: blocking, listening, learning, forwarding, disabled</li>
<li>learning เรียน MAC แต่ไม่ forward; forwarding ทำทุกอย่าง (รับ/ส่ง BPDU, เรียน MAC, forward ข้อมูล)</li>
<li>Forward Delay default 15 s ต่อช่วง</li>
</ul></div>`
    },
    {
      t: "ตั้งค่าและตรวจสอบ STP บน Huawei",
      ref: "หน้า 289-293",
      html: `
<p>ตัวอย่าง switch S1, S2, S3 ต่อเป็นวง (Fig. 8.9) งาน: เปิด STP, ดู root bridge, ตรวจ state, เปลี่ยน mode เป็น RSTP, ตั้ง S2 เป็น root และ S1 เป็น backup</p>
<figure><img src="i/p289_1.webp" alt="topology ทดลอง STP มี S1 S2 S3 ต่อเป็นวง" loading="lazy"><figcaption>Fig. 8.9 Spanning tree experimental network topology</figcaption></figure>
<pre><code>[S1]display stp                 # ดูข้อมูล STP ทั้งหมด
-------[CIST Global Info][Mode MSTP]-------      # default mode = MSTP
CIST Bridge  :32768.4c1f-cc82-6053               # BID ของตัวเอง
Config Times :Hello 2s MaxAge 20s FwDly 15s MaxHop 20
CIST Root/ERPC :32768.4c1f-cc82-6053 / 0         # root bridge ID (S1 เป็น root)
----[Port1(GigabitEthernet0/0/1)][FORWARDING]----
Port Role :Designated Port
Port Priority :128                                # default 128
Port Cost(Dot1T ) :Config=auto / Active=20000     # 1G = 20000

[S1]display stp brief            # ดู role/state ของ port แบบย่อ
MSTID Port                   Role  STP State   Protection
0     GigabitEthernet0/0/1   DESI  FORWARDING  NONE

[S1]stp disable                  # ปิด STP (ใช้เมื่อไม่มี loop)
[S1]stp enable                   # เปิด STP (default เปิดอยู่)
[S1]stp mode rstp                # mode: mstp | rstp | stp

[S2]stp priority 0               # ช่วง 0-61440 ทวีคูณ 4096 -> S2 เป็น root
[S1]stp priority 4096            # S1 เป็น backup root
# หรือ
[S2]stp root primary             # = priority 0
[S1]stp root secondary           # = priority 4096</code></pre>
<p>บน root switch <b>ทุก port เป็น designated port</b> รวมถึง port ที่ต่อ PC ด้วย ถ้าไม่มี loop ระหว่าง switch จะสั่ง <code>stp disable</code> เพื่อให้ port เข้า forwarding ทันทีได้</p>
<h4>อ่านผลบน S3</h4>
<pre><code>&lt;S3&gt;display stp brief
MSTID Port                  Role  STP State   Protection
0     GigabitEthernet0/0/1  ALTE  DISCARDING  NONE
0     GigabitEthernet0/0/2  ROOT  FORWARDING  NONE
0     GigabitEthernet0/0/3  DESI  FORWARDING  NONE</code></pre>
<ul>
<li><b>ROOT</b> = root port; <b>DESI</b> = designated port; <b>ALTE</b> = alternate port (DISCARDING = ถูก block)</li>
<li>ถ้า <code>shutdown</code> แล้ว <code>undo shutdown</code> port จะเริ่มที่ DISCARDING แล้ว 15 s เข้า learning และ 30 s จึง forwarding</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><code>display stp</code> / <code>display stp brief</code> / <code>stp mode rstp</code> / <code>stp priority N</code> (ทวีคูณ 4096) / <code>stp root primary|secondary</code></li>
<li>บริบท Huawei default: STP enable, mode MSTP, priority 32768, port priority 128</li>
<li>ต่อ PC ก็ยังเป็น port ที่ร่วม STP (มีบทบาท designated)</li>
</ul></div>`
    },
    {
      t: "Link Aggregation: แนวคิดและสถานการณ์ใช้งาน",
      ref: "หน้า 293-295",
      html: `
<h4>ทำไมต้องมี</h4>
<p>Ethernet ใช้ bandwidth เพิ่มทีละ 10 เท่า: 10 M, 100 M, 1 G, 10 G, 100 G ถ้า access switch ต่อ aggregation switch ด้วย GE link อยู่แล้ว และอยากเพิ่ม bandwidth การเพิ่มสายอีกเส้นตามทฤษฎีก็ได้ แต่ <b>STP จะ block port ของ link ใดเส้นหนึ่ง</b> ทำให้ไม่ได้ bandwidth เพิ่ม</p>
<figure><img src="i/p294_1.webp" alt="STP block หนึ่งพอร์ตเมื่อมี uplink หลายเส้น" loading="lazy"><figcaption>Fig. 8.10 Block a port of one of the links of the multi-uplink STP</figcaption></figure>
<p><b>Eth-Trunk</b> (Link Aggregation / Link Trunking / Link Bonding) รวมหลาย link ระหว่างอุปกรณ์เป็น <b>logical link เดียว</b> เพิ่ม bandwidth เช่น GE สองเส้นเป็น 2000 Mbit/s ไม่ต้องซื้ออุปกรณ์ 10 G ถ้า 2 G พอ Eth-Trunk port ทำงานเหมือน port ปกติ แต่เมื่อส่งข้อมูลต้องเลือก member port จริง (physical) หนึ่งหรือหลาย port เพื่อทำ <b>load balance</b> และ <b>link redundancy</b></p>
<figure><img src="i/p294_2.webp" alt="รวมสอง GE link เป็น aggregation link 2000 Mbit/s" loading="lazy"><figcaption>Fig. 8.11 Link aggregation (2 x 1000 Mbit/s = aggregation link 2000 Mbit/s)</figcaption></figure>
<h4>ใช้ได้ระหว่างอุปกรณ์ใดบ้าง</h4>
<p>switch-switch, switch-router, router-router, switch-server, router-server และ server-server (ทฤษฎีใช้กับ PC ได้ แต่ไม่ทำเพราะค่าใช้จ่าย) <b>server</b> มักใช้ link aggregation เพราะต้องการ reliability สูง</p>
<figure><img src="i/p295_1.webp" alt="สถานการณ์ใช้งาน link aggregation ระหว่างอุปกรณ์ต่าง ๆ" loading="lazy"><figcaption>Fig. 8.12 Application scenarios of link aggregation technology</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Eth-Trunk = รวมหลาย link เป็น 1 logical link: เพิ่ม bandwidth, load balance, redundancy; STP จะไม่ block member link</li>
<li>ใช้กับ Ethernet link เท่านั้น; ใช้ได้ switch/router/server</li>
</ul></div>`
    },
    {
      t: "หลักการของ Link Aggregation และปัญหา disorder",
      ref: "หน้า 295-297",
      html: `
<p>แต่ละปลายของ aggregation link มี <b>aggregation port</b> ที่มี queue ส่งและ queue รับ ฝั่งส่งใช้ <b>frame distributor</b> กระจาย frame จาก queue ไปยัง physical port ต่าง ๆ ฝั่งรับรวม frame เข้า queue เดียวแล้วส่งต่อ จึงเป็น &quot;traffic sharing&quot; ถ้า member link ใดล้ม traffic ทั้งหมดจะถูกแบ่งให้ link ที่เหลือ</p>
<figure><img src="i/p296_1.webp" alt="การส่งและรับ frame บน aggregation link ผ่าน frame distributor" loading="lazy"><figcaption>Fig. 8.13 The process of sending and receiving frames on an aggregation link</figcaption></figure>
<h4>Harmful disorder</h4>
<p>ถ้า frame ที่ส่งตามลำดับ (I, love, you) ถูกแจกคนละ link ความยาว frame ต่างกันอาจถึงปลายทางคนละลำดับ (love, I, you) ทำให้ลำดับ frame ของ flow เดียวเพี้ยน เรียก <b>harmful disorder</b></p>
<figure><img src="i/p296_2.webp" alt="frame ที่ส่งผ่านหลาย link ถึงปลายทางผิดลำดับ" loading="lazy"><figcaption>Fig. 8.14 Harmful disorder</figcaption></figure>
<h4>Harmless disorder: วิธีแก้</h4>
<p>แก้โดยให้ frame ที่ไปยัง <b>destination MAC เดียวกัน ผ่าน link เดียวกัน</b> (ใช้ hash ตาม MAC/IP) frame ไป C เรียงถูก frame ไป D เรียงถูก แม้ภาพรวมจะ &quot;ปนกัน&quot; (harmless disorder) ราคาที่ต้องจ่ายคือ <b>load ไม่รับประกันว่าเท่ากัน</b> บาง link อาจไม่มี traffic เลย</p>
<figure><img src="i/p297_1.webp" alt="frame ของ flow เดียวกันไปทาง link เดียวกัน เป็น harmless disorder" loading="lazy"><figcaption>Fig. 8.15 Harmless disorder (แต่ละปลายทางเรียงถูก แต่ link ล่างไม่มี traffic)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Harmful disorder = flow เดียวกันแตกไปหลาย link แล้วถึงผิดลำดับ</li>
<li>แก้ด้วย hash: flow เดียวกันไป link เดียวกัน (harmless disorder) แลกกับ load อาจไม่เท่ากัน</li>
</ul></div>`
    },
    {
      t: "โหมดของ Link Aggregation: Manual และ LACP",
      ref: "หน้า 297-299",
      html: `
<p>ทุก member port ต้องมี peer port อยู่ในอุปกรณ์เดียวกัน และอยู่ใน aggregation port เดียวกัน มี 2 วิธีสร้าง:</p>
<table>
<tr><th>หัวข้อ</th><th>Manual mode</th><th>LACP mode</th></tr>
<tr><td>การสร้าง</td><td>ผู้ดูแลสร้าง Eth-Trunk และเพิ่ม port เองทั้งสองฝั่ง ไม่แลกเปลี่ยน protocol</td><td>negotiate ด้วย <b>LACPDU</b> (Link Aggregation Control Protocol); ใน Huawei เรียก <code>mode lacp-static</code></td></tr>
<tr><td>ตรวจสถานะ</td><td>ดูจาก <b>physical state</b> เท่านั้น</td><td>ยืนยันว่า peer เป็นอุปกรณ์/aggregation port เดียวกัน</td></tr>
<tr><td>สายต่อผิด</td><td>ตรวจไม่ได้ ยังส่ง frame ผ่าน port นั้น ทำให้ frame สูญหาย</td><td>ตรวจได้ port ที่ต่อผิดไม่ถูกนำมาใช้</td></tr>
<tr><td>link เสียจริง</td><td>ตรวจได้ (physical down) หยุดใช้ link นั้น</td><td>ตรวจได้</td></tr>
<tr><td>ข้อควรใช้</td><td>อุปกรณ์เก่าที่ไม่รองรับ LACP</td><td>ใช้ทั่วไปเพราะปลอดภัยกว่า</td></tr>
</table>
<figure><img src="i/p298_1.webp" alt="manual mode ตรวจ port จาก physical state เท่านั้น" loading="lazy"><figcaption>Fig. 8.16 In manual mode, whether the port is working properly can only be determined by its physical state</figcaption></figure>
<figure><img src="i/p298_2.webp" alt="ต่อ Eth-Trunk ผิดไปยัง switch อีกตัวทำให้สื่อสารผิดปกติ" loading="lazy"><figcaption>Fig. 8.17 In manual mode, Eth-trunk error connection results in abnormal communication (SW1 GE0/0/2 ถูกต่อไป SW3 ผิด)</figcaption></figure>
<p>ตัวอย่างความเสี่ยง: ผู้ดูแลต่อ GE0/0/2 ของ SW1 ไป SW3 โดยไม่ตั้งใจ SW1 ไม่รู้ ยังกระจาย frame ผ่าน port นั้น frame บางส่วนไปไม่ถึง SW2 ถ้าใช้ LACP SW1 กับ SW2 แลก LACPDU และรู้ว่าสายนั้นไม่ใช่ peer เดียวกัน</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Manual: ไม่มี protocol ตรวจ miswire ไม่ได้; LACP: negotiate ด้วย LACPDU ตรวจ peer ได้</li>
<li>Huawei: <code>mode manual load-balance</code> หรือ <code>mode lacp-static</code></li>
</ul></div>`
    },
    {
      t: "Load-balance mode และตัวอย่างการตั้งค่า Eth-Trunk",
      ref: "หน้า 299-302",
      html: `
<h4>Load-balance mode</h4>
<p>Eth-Trunk กระจาย traffic ตามค่า hash ของ <b>IP หรือ MAC</b> ของ packet: <code>src-mac</code>, <code>dst-mac</code>, <code>src-dst-mac</code>, <code>src-ip</code>, <code>dst-ip</code>, <code>src-dst-ip</code> โหมดมีผลเฉพาะ <b>traffic ขาออกของ switch ตัวที่ตั้ง</b> และตั้งแยกกันแต่ละฝั่งได้</p>
<div class="warn"><b>หลักเลือก</b> เลือก field ที่ <b>ค่าหลากหลายมาก</b> ใน traffic นั้น ถ้าเลือกผิดเช่นเลือก src-mac ในขณะที่ source MAC มีค่าเดียว traffic ทั้งหมดไปที่ link เดียว และ link อื่นว่าง</div>
<p>ตัวอย่างที่ 1: PC จำนวนมากในพื้นที่ A เข้าถึง server เดียวในพื้นที่ B (SW1 ฝั่ง A, SW2 ฝั่ง B)</p>
<ul>
<li>SW1 (ส่งจาก A ไป B): source MAC มีมากจึงใช้ <code>src-mac</code></li>
<li>SW2 (ส่งจาก server ไป A): source MAC มีค่าเดียว จึงห้ามใช้ src-mac ให้ใช้ <code>dst-mac</code> เพราะ destination MAC (PC) มีมาก</li>
</ul>
<figure><img src="i/p300_1.webp" alt="load-balance ตาม source MAC ที่ SW1 และ destination MAC ที่ SW2" loading="lazy"><figcaption>Fig. 8.18 Load-balance mode based on source MAC address and destination MAC address</figcaption></figure>
<p>ตัวอย่างที่ 2: PC ในพื้นที่ A เข้า Internet จำนวนเครื่องใน Internet มากกว่ามาก ดังนั้น SW1 (ขาออกไป Internet) ใช้ <code>dst-ip</code> และ SW2 (ขาออกลงมาหาพื้นที่ A) ใช้ <code>src-ip</code></p>
<figure><img src="i/p300_2.webp" alt="load-balance ตาม destination IP ที่ SW1 และ source IP ที่ SW2 เมื่อเข้า Internet" loading="lazy"><figcaption>Fig. 8.19 Load-balance mode based on source IP address and destination IP address</figcaption></figure>
<h4>เงื่อนไข member port</h4>
<p>port ที่เข้า Eth-Trunk ต้องมี <b>bandwidth, duplex, VLAN configuration เหมือนกัน</b> และเป็น access ทั้งหมดหรือ trunk ทั้งหมด ถ้าเป็น access ต้องมี default VLAN เดียวกัน ถ้าเป็น trunk ต้องมี PVID และ allow-pass VLAN เหมือนกัน</p>
<h4>Configuration</h4>
<figure><img src="i/p301_1.webp" alt="Eth-Trunk รวม GE0/0/1 ถึง GE0/0/3 ระหว่าง SW1 และ SW2" loading="lazy"><figcaption>Fig. 8.20 Eth-Trunk configuration illustration</figcaption></figure>
<pre><code>[SW1]interface Eth-Trunk 1                         # เลข Eth-Trunk ควรตรงกับอีกฝั่ง
[SW1-Eth-Trunk1]mode manual load-balance           # หรือ mode lacp-static
[SW1-Eth-Trunk1]trunkport GigabitEthernet 0/0/1 to 0/0/3   # เพิ่ม member
[SW1-Eth-Trunk1]load-balance src-mac               # dst-ip | dst-mac | src-dst-ip | src-dst-mac | src-ip | src-mac
[SW1-Eth-Trunk1]port link-type trunk
[SW1-Eth-Trunk1]port trunk allow-pass vlan all
# ตั้ง SW2 เหมือนกัน แล้วตรวจสอบ
[SW1]display eth-trunk 1
WorkingMode: NORMAL        Hash arithmetic: According to SA
Least Active-linknumber: 1  Operate status: up   Number Of Up Port In Trunk: 3</code></pre>
<ul>
<li><b>WorkingMode: NORMAL</b> = manual mode</li>
<li><b>Least Active-linknumber</b> = จำนวน member ที่ต้อง up ขั้นต่ำ ถ้าน้อยกว่านี้ Eth-Trunk ถูกตัดและ traffic ย้ายไปเส้นทางอื่นของ network</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Load-balance ทำงานกับ traffic ขาออกของ switch นั้น; เลือก field ที่หลากหลายที่สุด</li>
<li>member port ต้องมี speed/duplex/link-type/PVID/allow-pass ตรงกัน</li>
<li><code>interface Eth-Trunk N</code> + <code>trunkport ...</code> + <code>mode ...</code> + <code>load-balance ...</code></li>
</ul></div>`
    },
    {
      t: "Smart Link: หลักการ",
      ref: "หน้า 302-309",
      html: `
<h4>ปัญหาของ STP ในสถานการณ์ dual uplink</h4>
<p>access switch S4 ต่อ aggregation S2 และ S3 (dual uplink) ถ้าใช้ STP แล้ว Link2-4 ล่ม Link3-4 จะเข้ามาในต้นไม้ แต่ STP converge ช้า (ระดับวินาที) ข้อมูลที่ส่งผ่าน link เร็วจะหายมาก กระทบบริการที่ไวต่อ packet loss</p>
<figure><img src="i/p303_1.webp" alt="ใช้ STP กำจัด loop ใน dual uplink" loading="lazy"><figcaption>Fig. 8.21 Eliminate working loops using STP</figcaption></figure>
<h4>Smart Link (Huawei private protocol)</h4>
<ul>
<li><b>Smart Link group</b> ประกอบด้วย 2 interface: <b>master</b> และ <b>slave</b></li>
<li>ปกติ master เป็น <b>active</b> (forward) และ slave เป็น <b>standby/inactive</b> (blocked) จึงไม่เกิด loop</li>
<li>เมื่อ master ล้มหรือ link ล่ม master ถูก block และ slave เปลี่ยนเป็น active ทันที (<b>ระดับมิลลิวินาที</b>)</li>
<li>ใช้ในเครือข่าย dual uplink; <b>Smart Link กับ STP ไม่ใช้ร่วมกัน</b> (mutually exclusive)</li>
</ul>
<figure><img src="i/p304_1.webp" alt="Smart Link group บน S4 ที่มี GE1/0/1 เป็น master และ GE1/0/2 เป็น slave" loading="lazy"><figcaption>Fig. 8.22 Basic principle of Smart Link (ปกติ Link3-4 ไม่ทำงาน; master ล้ม slave เปิดทันที)</figcaption></figure>
<h4>ปัญหา MAC table เก่า และ flush frame</h4>
<p>ปัญหา: หลัง switch link S1 ยังมี entry MAC-1 ชี้ไป GE1/0/3 (ฝั่ง S2) ที่ link ล่มแล้ว จนกว่า aging 300 s จะหมด frame จาก router ถึง MAC-1 ถูกส่งไป link ที่ขาดและสูญหาย</p>
<figure><img src="i/p305_1.webp" alt="ที่เวลา t S1 เรียน MAC-1 ที่ GE1/0/3 aging 300 s" loading="lazy"><figcaption>Fig. 8.23 Situation at moment t (S1 เรียน MAC-1 = GE1/0/3, aging 300 s)</figcaption></figure>
<figure><img src="i/p306_1.webp" alt="ที่ t+5 s Link2-4 ล่ม slave interface เปิดใช้งาน" loading="lazy"><figcaption>Fig. 8.24 Situation at moment t + 5 s (Link2-4 ล่ม, GE1/0/2 เปลี่ยนเป็น forwarding, entry MAC-1 ยังเหลือ 295 s)</figcaption></figure>
<figure><img src="i/p307_1.webp" alt="ที่ t+10 s frame ถึง MAC-1 ถูกส่งไป link ที่ล่ม" loading="lazy"><figcaption>Fig. 8.25 Situation at moment t + 10 s (frame ไป MAC-1 ออก GE1/0/3 แล้วสูญหาย)</figcaption></figure>
<p>Smart Link แก้ด้วย <b>flush frame</b> (destination = multicast <b>01-0F-E2-00-00-04</b>) ซึ่ง S4 ส่งทันทีจาก slave interface ที่เพิ่ม active เพื่อให้ switch ที่เกี่ยวข้อง <b>ล้าง MAC entry ผิดทันที</b> ผลคือ S1 ไม่มี MAC-1 และ <b>flood</b> frame ไป GE1/0/3 และ GE1/0/4 ซึ่งอย่างน้อยทางหนึ่ง (Link1-3 และ Link3-4) ไปถึง PC1</p>
<figure><img src="i/p307_2.webp" alt="S4 ส่ง flush frame ผ่าน slave interface ไปยัง S1 เพื่อล้าง MAC entry" loading="lazy"><figcaption>Fig. 8.26 Return to moment t + 5 s (flush frame ทำให้ S1 ล้าง entry MAC-1)</figcaption></figure>
<figure><img src="i/p308_1.webp" alt="หลัง flush ที่ t+10 s S1 flood frame ไปถึง PC1" loading="lazy"><figcaption>Fig. 8.27 Return to moment t + 10 s (S1 flood จึงถึง PC1 ผ่าน Link1-3 และ Link3-4)</figcaption></figure>
<ul>
<li><b>Control VLAN</b>: flush frame ต้องติด tag ของ control VLAN; อุปกรณ์ที่ต้องรับต้องตั้งค่าให้รับ/ประมวลผล มิฉะนั้นทิ้ง</li>
<li><b>Restore</b>: เมื่อ master กลับมา up จะ <b>ไม่</b> สลับกลับอัตโนมัติ ต้องเปิด <code>restore enable</code> ล่วงหน้า และมี <b>wait-to-restore (wtr) time</b> default <b>60 s</b> เพราะ link อาจยังไม่เสถียร (flap)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Smart Link: master/slave, สลับระดับ ms, <b>ห้ามรันร่วมกับ STP</b></li>
<li>flush frame (01-0F-E2-00-00-04, อยู่ใน control VLAN) ให้ upstream ล้าง MAC table ทันที</li>
<li>restore ไม่ auto ต้อง enable; wtr default 60 s</li>
</ul></div>`
    },
    {
      t: "ตั้งค่า Smart Link",
      ref: "หน้า 309-311",
      html: `
<p>S1-S4 เป็นวง; ต้องตั้ง Smart Link group บน S4 ให้ GE0/0/1 เป็น master และ GE0/0/2 เป็น slave</p>
<figure><img src="i/p310_1.webp" alt="ตัวอย่าง Smart Link บน S4 กับ S1 S2 S3" loading="lazy"><figcaption>Fig. 8.28 Smart Link configuration example</figcaption></figure>
<h4>Roadmap</h4>
<ol>
<li>สร้าง Smart Link group, เพิ่ม interface และกำหนด role</li>
<li>เปิดการส่ง flush frame</li>
<li>เปิดการรับ flush frame (บนอุปกรณ์ upstream)</li>
<li>เปิด restore</li>
<li>เปิด Smart Link</li>
</ol>
<pre><code># ก่อนอื่นปิด STP บน port ที่จะใช้ (Smart Link ใช้ร่วมกับ STP ไม่ได้)
[S4]interface GigabitEthernet 0/0/1
[S4-GigabitEthernet0/0/1]stp disable
[S4]interface GigabitEthernet 0/0/2
[S4-GigabitEthernet0/0/2]stp disable

[S4]smart-link group 1
[S4-smlk-group1]port GigabitEthernet 0/0/1 master
[S4-smlk-group1]port GigabitEthernet 0/0/2 slave
[S4-smlk-group1]restore enable
[S4-smlk-group1]smart-link enable
[S4-smlk-group1]timer wtr 30
[S4-smlk-group1]flush send control-vlan 10 password simple huawei

# S1, S2, S3 ตั้งรับ flush frame บน port ที่เกี่ยวข้อง
[S2]interface GigabitEthernet 0/0/1
[S2-GigabitEthernet0/0/1]smart-link flush receive control-vlan 10 password simple huawei

&lt;S4&gt;display smart-link group 1
GigabitEthernet0/0/1  Master  Active
GigabitEthernet0/0/2  Slave   Inactive</code></pre>
<div class="note"><b>จุดสังเกต</b> control VLAN และ password ฝั่งส่ง (S4) กับฝั่งรับ (S1-S3) ต้องตรงกัน; ตรวจผลด้วย <code>display smart-link group N</code> ที่ master เป็น Active และ slave เป็น Inactive</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><code>smart-link group N</code> + <code>port ... master|slave</code> + <code>restore enable</code> + <code>smart-link enable</code> + <code>timer wtr</code></li>
<li>ส่ง: <code>flush send control-vlan N password simple ...</code>; รับ: <code>smart-link flush receive control-vlan N password simple ...</code> (บน interface ของอุปกรณ์ upstream)</li>
<li>ต้อง <code>stp disable</code> บน port ที่เข้า Smart Link group</li>
</ul></div>`
    },
    {
      t: "Monitor Link",
      ref: "หน้า 312-316",
      html: `
<h4>ปัญหาที่ Smart Link แก้ไม่ได้ด้วยตัวเอง</h4>
<p>ถ้า link ที่ล่มอยู่เหนือขึ้นไป (เช่น GE1/0/1 ของ S2 ล่ม ทำให้ Link1-2 ขาด) S4 มองไม่เห็นการล่มนั้น master port ของ S4 ยัง up จึงไม่สลับ frame ทั้งหมดจาก master สูญหาย</p>
<p><b>Monitor Link</b> ใช้คู่กับ Smart Link แก้ปัญหานี้ <b>Monitor Link group</b> มี <b>1 uplink interface</b> และ <b>หลาย downlink interface</b> (สูงสุด 24) ถ้า uplink ทำงานไม่ปกติ downlink ทุกตัวจะถูกสั่งเป็น <b>Down</b> ทันที (linkage) เมื่อ uplink กลับมา downlink ก็ขึ้น up อัตโนมัติ (มี restore และ wtr ตั้งได้)</p>
<figure><img src="i/p312_1.webp" alt="Monitor Link บน S2 ทำให้ downlink ดับเมื่อ uplink ล่ม และ S4 สลับ slave" loading="lazy"><figcaption>Fig. 8.29 Basic principle of Monitor Link (uplink ของ S2 ล่ม downlink ดับ S4 จึงสลับไป slave)</figcaption></figure>
<p>ในกรณีซับซ้อน (Fig. 8.30) ที่ S2/S3 เองมี Smart Link group ด้วย ให้ถือ <b>Smart Link group ทั้งกลุ่มเป็น uplink</b> ของ Monitor Link downlink จะ down ต่อเมื่อ <b>ทั้ง master และ slave</b> ของ Smart Link group นั้นใช้ไม่ได้ ถ้า master ล่มอย่างเดียว slave เข้ามาแทนและ Monitor Link ไม่ต้องทำอะไร</p>
<figure><img src="i/p313_1.webp" alt="Monitor Link ผสม Smart Link หลายชั้นในสถานการณ์ซับซ้อน" loading="lazy"><figcaption>Fig. 8.30 Monitor Link and Smart Link in a complex situation</figcaption></figure>
<h4>Configuration</h4>
<figure><img src="i/p315_1.webp" alt="ตัวอย่างการตั้งค่า Monitor Link บน S2 และ S3" loading="lazy"><figcaption>Fig. 8.31 Monitor Link configuration illustration</figcaption></figure>
<pre><code>[S2]monitor-link group 1
[S2-mtlk-group1]smart-link group 1 uplink          # ใช้ Smart Link group เป็น uplink
[S2-mtlk-group1]port GigabitEthernet 2/0/1 downlink 1   # downlink index 1-24
[S3]monitor-link group 2
[S3-mtlk-group2]port GigabitEthernet 1/0/1 uplink
[S3-mtlk-group2]port GigabitEthernet 2/0/1 downlink 1
[S2-mtlk-group1]timer recover-time 10
[S3-mtlk-group2]timer recover-time 10
display smart-link group all
display monitor-link group all</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Monitor Link: 1 uplink + หลาย downlink; uplink fail → downlink down; uplink กลับ → downlink up</li>
<li>ใช้คู่กับ Smart Link เพื่อให้ switch ฝั่งล่างรู้ว่า upstream ล่ม</li>
<li>ถ้า uplink คือ Smart Link group ต้องล้มทั้ง master และ slave ถึงจะสั่ง downlink down</li>
</ul></div>`
    },
    {
      t: "ทางเลือกแทน STP และข้อแนะนำการออกแบบ",
      ref: "หน้า 316",
      html: `
<table>
<tr><th>ทางเลือก</th><th>หลักการ</th><th>หมายเหตุ</th></tr>
<tr><td><b>Link aggregation</b></td><td>รวม interface เป็น logical interface; กระจาย traffic ตามนโยบาย; link ล่มก็คำนวณใหม่; กลับมา up ก็ใช้ต่อ</td><td>เพิ่ม bandwidth, resilience, redundancy และเสมือนไม่มี loop</td></tr>
<tr><td><b>Smart Link</b></td><td>dual uplink: master active, slave blocked; switch ระดับ ms</td><td>ตั้งง่ายและเร็ว แต่ใช้ได้เฉพาะ topology เฉพาะ</td></tr>
<tr><td><b>iStack / CSS</b></td><td>iStack = stack box switch ของ Huawei; CSS = cluster ของ frame switch; รวมหลายตัวเป็นอุปกรณ์เดียวเชิง logical</td><td>ไม่ต้อง block port</td></tr>
<tr><td><b>ไม่มี Layer 2 loop</b></td><td>ออกแบบ/ตัด loop ด้วยมือ</td><td>เลี่ยง STP</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>4 ทางเลือกแทน STP: Link aggregation, Smart Link, iStack/CSS, ออกแบบไม่ให้เกิด Layer 2 loop</li>
<li>Smart Link: เฉพาะ dual uplink เท่านั้น</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `บริษัทเพิ่ม aggregation switch ตัวที่สองและต่อ access switch เข้ากับทั้งสองตัวเพื่อกัน single point of failure ไม่กี่นาทีหลังจากเปิดเครื่อง ผู้ใช้ทั้งชั้นรายงานว่าเครือข่ายช้ามาก LED ของทุก port กะพริบรัว และ log ของ switch แจ้งว่า MAC address ของ PC เครื่องหนึ่งสลับ port ไปมาตลอด`,
      q: "สาเหตุที่เป็นไปได้มากที่สุดและวิธีแก้ที่เหมาะสมคืออะไร?",
      opts: [
        { t: "เกิด Layer 2 loop (broadcast storm + MAC flapping) ควรเปิด STP/RSTP ให้ block port ซ้ำซ้อน", why: "ถูก: redundant link ทำให้ frame broadcast วนเป็นวง entry ของ MAC สลับตาม port ที่รับ copy ได้ STP แก้โดย block alternate port" },
        { t: "aging time สั้นเกินไป ควรเพิ่มเป็น 3000 s", why: "ผิด: aging ไม่ใช่สาเหตุของ port flapping ที่เกิดจาก frame เดียวกันวนกลับ" },
        { t: "VLAN 1 ถูกลบจึงเกิดปัญหา", why: "ผิด: VLAN 1 ลบไม่ได้ และไม่ทำให้เกิดอาการนี้" },
        { t: "ต้องเปลี่ยน trunk เป็น access", why: "ผิด: การเปลี่ยนชนิด port ไม่แก้ loop" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Switch 3 ตัวในวง: SW1 priority 32768 MAC 00e0-fc00-0003, SW2 priority 4096 MAC 00e0-fc00-0009, SW3 priority 32768 MAC 00e0-fc00-0001`,
      q: "switch ตัวใดเป็น root bridge?",
      opts: [
        { t: "SW2", why: "ถูก: เทียบ priority ก่อน (4096 ต่ำสุด) MAC ใช้ตัดสินเมื่อ priority เท่ากันเท่านั้น" },
        { t: "SW3", why: "ผิด: SW3 มี MAC เล็กสุดแต่ priority 32768 สูงกว่า SW2 จึงแพ้" },
        { t: "SW1", why: "ผิด: SW1 ทั้ง priority และ MAC ไม่ได้ดีกว่าตัวอื่น" },
        { t: "ตัวที่เปิดเครื่องก่อน", why: "ผิด: STP ตัดสินจาก BID ไม่ใช่เวลาเปิดเครื่อง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `S1 เป็น root bridge S4 มี port GE0/0/1 ต่อ S2 และ GE0/0/2 ต่อ S3 ลิงก์ S1-S2 และ S2-S4 เป็น 1000 Mbit/s; ลิงก์ S1-S3 เป็น 100 Mbit/s และ S3-S4 เป็น 1000 Mbit/s (path cost: 1G = 20,000, 100M = 200,000)`,
      q: "S4 เลือก root port และ RPC เป็นอย่างไร?",
      opts: [
        { t: "GE0/0/1 ด้วย RPC = 40,000", why: "ถูก: ผ่าน S2 = 20,000 + 20,000 = 40,000 ส่วนผ่าน S3 = 200,000 + 20,000 = 220,000" },
        { t: "GE0/0/2 ด้วย RPC = 220,000", why: "ผิด: RPC ต้องเลือกที่เล็กที่สุด ไม่ใช่ใหญ่สุด" },
        { t: "GE0/0/1 ด้วย RPC = 20,000", why: "ผิด: RPC เป็นผลรวมทุก link ไปถึง root ต้องบวกทั้ง S2-S4 และ S1-S2" },
        { t: "ทั้งสอง port เป็น root port", why: "ผิด: non-root bridge มี root port ได้สูงสุด 1" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `S4 มีสองเส้นทางไป root S1 ผ่าน S2 และ S3 โดย RPC เท่ากัน BID ของ S2 = 32768.4c1f-cc00-0002 และ BID ของ S3 = 32768.4c1f-cc00-0003`,
      q: "S4 เลือก root port ต่อ upstream ตัวใด และเพราะเหตุใด?",
      opts: [
        { t: "port ที่ต่อ S2 เพราะ BID ของ upstream เล็กกว่า", why: "ถูก: เมื่อ RPC เท่ากัน เทียบ BID ของ upstream switch ตัวที่เล็กกว่าชนะ (MAC ...0002 < ...0003)" },
        { t: "port ที่ต่อ S3 เพราะ BID ใหญ่กว่าแสดงว่าแรงกว่า", why: "ผิด: STP ชอบ BID เล็กกว่า" },
        { t: "ต้องเทียบ PID ของ S4 ก่อน", why: "ผิด: PID ใช้เป็นลำดับสุดท้าย หลัง RPC และ BID ของ upstream" },
        { t: "block ทั้งสอง port", why: "ผิด: ต้องมี root port 1 ตัวเพื่อเชื่อมไป root" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `S1 เป็น root; S2 และ S3 ต่อกันผ่าน link หนึ่ง (S2 GE0/0/2 - S3 GE0/0/2) และต่างก็มี root port ที่ GE0/0/1 ผ่าน cost เท่ากัน; BID ของ S2 เล็กกว่า S3`,
      q: "บน link ระหว่าง S2 กับ S3 บทบาทของ port ทั้งสองเป็นอย่างไร?",
      opts: [
        { t: "S2 GE0/0/2 เป็น designated port (forwarding) และ S3 GE0/0/2 เป็น alternate port (blocked)", why: "ถูก: RPC เท่ากันจึงเทียบ BID, S2 เล็กกว่าเป็น designated; อีกฝั่งไม่ใช่ root port และไม่ใช่ designated จึงเป็น alternate" },
        { t: "ทั้งสอง port เป็น designated port", why: "ผิด: แต่ละ segment มี designated port เพียงตัวเดียว" },
        { t: "S3 GE0/0/2 เป็น designated port เพราะ BID ใหญ่กว่า", why: "ผิด: BID เล็กกว่าชนะ" },
        { t: "ทั้งสองถูก block", why: "ผิด: ต้องมี designated port บนทุก segment" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลทำ shutdown แล้ว undo shutdown บน port ที่เป็น designated port ใน STP mode (ค่า Forward Delay default) แล้วสั่ง display stp brief ทันที`,
      q: "พฤติกรรมของ port เป็นอย่างไร?",
      opts: [
        { t: "เริ่ม DISCARDING แล้ว learning หลังประมาณ 15 s และ forwarding หลังประมาณ 30 s", why: "ถูก: ต้องผ่าน listening และ learning อย่างละ Forward Delay 15 s" },
        { t: "เข้า forwarding ทันที", why: "ผิด: STP ไม่ยอม forward ทันทีเพื่อกัน loop" },
        { t: "เข้า forwarding หลัง 300 s", why: "ผิด: 300 s คือ aging time ของ MAC table ไม่เกี่ยวกับ state" },
        { t: "อยู่ใน disabled จนกว่าจะ restart", why: "ผิด: undo shutdown เปิด port ใหม่ให้เริ่มวงจรปกติ" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลทบทวนค่า timer ใน display stp: Hello 2s MaxAge 20s FwDly 15s`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "เมื่อ topology เสถียรแล้ว root bridge ส่ง Configuration BPDU ทุก 2 s", ok: true, why: "ถูก: Hello Time ปรับได้บน root" },
        { t: "Configuration BPDU ใช้ multicast MAC 01-80-C2-00-00-00", ok: true, why: "ถูก: STP frame เป็น multicast frame" },
        { t: "port ที่เป็น alternate รับ BPDU ได้แต่ไม่ส่ง user data", ok: true, why: "ถูก: block เชิง logical" },
        { t: "Switch ที่ link เสียส่ง TCN BPDU ออก designated port ไปหาลูกข่าย", ok: false, why: "ผิด: TCN ส่งออก root port ไปหา upstream (ขึ้นไป root)" },
        { t: "เมื่อรับ TC=1 switch ลด aging ของ MAC table เหลือ 15 s", ok: true, why: "ถูก: เท่ากับ Forward Delay" }
      ]
    },
    {
      type: "choice",
      story: `ทีมออกแบบ campus ที่มี VLAN 10-50 ต้องการให้ traffic ของ VLAN 10-30 ใช้ uplink A และ VLAN 40-50 ใช้ uplink B ทั้งสองเส้นต้องใช้งานได้พร้อมกัน และยังต้องการ loop prevention`,
      q: "ควรเลือก STP เวอร์ชันใด?",
      opts: [
        { t: "MSTP โดยแบ่ง VLAN เป็น 2 instance คำนวณ tree แยกกัน", why: "ถูก: MSTP map หลาย VLAN เข้า instance และแต่ละ instance มี topology เป็นของตัวเอง จึงกระจาย load ได้" },
        { t: "STP (802.1D) เพราะ VLAN ใช้ tree เดียว", why: "ผิด: tree เดียวทำให้ link หนึ่งถูก block ทุก VLAN" },
        { t: "RSTP เพราะมี 3 state", why: "ผิด: RSTP เร็วกว่าแต่ยังมี tree เดียวสำหรับทุก VLAN" },
        { t: "ปิด STP เพราะ Huawei มี default เป็น MSTP", why: "ผิด: ถ้ามี loop แล้วปิด STP จะเกิด broadcast storm" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Access switch ต่อ aggregation switch ด้วย GE link 3 เส้นที่ตั้งเป็น Eth-Trunk (manual mode) ทุก link ปกติ แล้ว link หนึ่งเส้นเสียหาย`,
      q: "ผลที่ตามมาเป็นอย่างไร?",
      opts: [
        { t: "bandwidth รวมลดจาก 3000 เหลือ 2000 Mbit/s และ traffic ถูกแจกให้ 2 link ที่เหลือ โดยการสื่อสารไม่ขาด", why: "ถูก: aggregation link ทนต่อ member ล้ม (redundancy) แม้ bandwidth ลดลง" },
        { t: "Eth-Trunk ทั้งกลุ่มดับ", why: "ผิด: จะดับก็ต่อเมื่อจำนวน link ที่ up น้อยกว่า Least Active-linknumber" },
        { t: "STP จะ block link ที่เหลืออีกเส้น", why: "ผิด: member ของ Eth-Trunk ไม่ถูก STP block ทีละเส้น" },
        { t: "ต้องรอ 300 s จึงจะส่งข้อมูลได้", why: "ผิด: 300 s เป็น aging ของ MAC table ไม่ใช่เวลาฟื้นฟู Eth-Trunk" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `PC จำนวนมากใน Area A คุยกับ file server เครื่องเดียวใน Area B ผ่าน Eth-Trunk 3 link ระหว่าง SW1 (ฝั่ง A) และ SW2 (ฝั่ง B) ทีมงานตั้ง SW1 เป็น load-balance src-mac และตั้ง SW2 เป็น src-mac เช่นกัน`,
      q: "ผลที่เกิดขึ้นกับ traffic จาก server กลับมายัง Area A คืออะไร?",
      opts: [
        { t: "traffic ขาออกของ SW2 ใช้ link เดียวเพราะ source MAC มีเพียงค่าเดียว (server) ควรเปลี่ยนเป็น dst-mac", why: "ถูก: hash ตาม src-mac ของ server ได้ค่าเดียว ทุก frame ไป link เดียว dst-mac มีหลากหลายตาม PC จึงกระจายได้" },
        { t: "กระจายสม่ำเสมอ 3 link เพราะ SW1 ตั้งไว้แล้ว", why: "ผิด: load-balance มีผลเฉพาะขาออกของ switch ที่ตั้งเท่านั้น" },
        { t: "frame ถูกทิ้งทั้งหมด", why: "ผิด: ยังส่งได้ แต่ไม่ได้กระจาย" },
        { t: "ต้องเปลี่ยน SW1 เป็น dst-mac", why: "ผิด: SW1 ขาออกมี source MAC หลากหลาย src-mac เหมาะสมอยู่แล้ว" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `PC จำนวนหลายร้อยใน Area A เข้า Internet ผ่าน router ที่ต่อกับ SW2 โดย SW1 (ฝั่ง Area A) และ SW2 (ฝั่ง router) ต่อกันด้วย Eth-Trunk ปลายทางใน Internet มีจำนวนมากกว่า PC ใน Area A มาก`,
      q: "load-balance mode ที่เหมาะสมคือข้อใด?",
      opts: [
        { t: "SW1 ใช้ dst-ip และ SW2 ใช้ src-ip", why: "ถูก: ขาออกของ SW1 ไป Internet มี destination IP หลากหลายที่สุด; ขาออกของ SW2 ลงมา Area A มี source IP (เครื่องใน Internet) หลากหลายที่สุด" },
        { t: "SW1 ใช้ src-ip และ SW2 ใช้ dst-ip", why: "ผิด: สลับ field ที่มีความหลากหลายน้อยกว่าของแต่ละทิศ" },
        { t: "ทั้งคู่ใช้ src-mac", why: "ผิด: source MAC ที่ SW2 เห็นคือ router ตัวเดียว ทุก frame ขาออกจึงไป link เดียว" },
        { t: "ทั้งคู่ใช้ dst-mac", why: "ผิด: ถ้า destination MAC ฝั่ง Internet คือ router เดียว (default gateway) ก็ไม่หลากหลาย" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ช่างต่อสาย Eth-Trunk (manual mode) ระหว่าง SW1 กับ SW2 จำนวน 3 เส้น แต่เผลอเสียบเส้นที่ 2 ปลายฝั่ง SW2 ไปที่ SW3 แทน ผู้ใช้บางส่วนรายงานว่าการเชื่อมต่อบางส่วนล่มเป็นระยะ ๆ ทั้งที่ทุก port ขึ้น up`,
      q: "ข้อใดอธิบายและแก้ปัญหาได้ถูกต้อง?",
      opts: [
        { t: "manual mode ตรวจ miswire ไม่ได้ จึงยังกระจาย frame ผ่านสายผิด ควรเปลี่ยนเป็น LACP (mode lacp-static) เพื่อ negotiate ตรวจ peer", why: "ถูก: manual ดูแค่ physical state; LACP ใช้ LACPDU ยืนยัน peer เดียวกัน" },
        { t: "ปัญหาเกิดจาก load-balance mode ควรเปลี่ยนเป็น src-dst-mac", why: "ผิด: load-balance mode ไม่ใช่สาเหตุ ปัญหาคือ member ต่อผิดอุปกรณ์" },
        { t: "ปัญหาเกิดจาก STP block port ที่ 2", why: "ผิด: member ของ Eth-Trunk ไม่ใช่เรื่อง STP block" },
        { t: "ปัญหาเกิดจาก PVID ของ trunk ต่างกัน", why: "ผิด: ไม่มีข้อมูลบ่งชี้ และอาการที่ port ขึ้น up แต่ใช้การได้บางส่วนตรงกับ miswire" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการเพิ่ม GE0/0/4 เข้า Eth-Trunk 1 ที่ใช้ trunk allow-pass vlan all, member เดิม 3 ตัวเป็น 1000 Mbit/s full-duplex PVID 1 แต่ GE0/0/4 ถูกตั้งเป็น 100 Mbit/s และ link-type access`,
      q: "ควรทำอย่างไรจึงจะรวม GE0/0/4 ได้?",
      opts: [
        { t: "ปรับ GE0/0/4 ให้ speed, duplex, link-type (trunk), PVID และ allow-pass VLAN ตรงกับ member เดิม", why: "ถูก: member ต้องมี bandwidth, duplex, ชนิด port และ VLAN configuration เหมือนกัน" },
        { t: "เพิ่มเข้าไปได้เลยเพราะ Eth-Trunk ปรับให้เอง", why: "ผิด: ต้องตั้งค่าให้ตรงกันก่อน" },
        { t: "ตั้ง GE0/0/4 เป็น access อย่างเดียวพอ", why: "ผิด: member ต้องเป็นชนิดเดียวกันทั้งหมด (ที่นี่คือ trunk)" },
        { t: "ตั้ง load-balance เป็น src-dst-ip", why: "ผิด: load-balance ไม่เกี่ยวกับเงื่อนไขของ member port" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `access switch S4 ต่อ S2 (Link2-4, ผ่าน master GE1/0/1) และ S3 (Link3-4, slave GE1/0/2) โดยตั้ง Smart Link group; S1 อยู่เหนือ S2/S3 และ PC1 ส่งข้อมูลออก Internet ผ่าน Link2-4 และ S1 เรียน MAC-1 = GE1/0/3`,
      q: "เมื่อ Link2-4 ล่ม เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "master GE1/0/1 ถูก block และ slave GE1/0/2 เปลี่ยนเป็น forwarding ทันที", ok: true, why: "ถูก: กลไก Smart Link switchover ระดับ ms" },
        { t: "S4 ส่ง flush frame ใน control VLAN เพื่อให้ S1 ล้าง entry MAC-1 ที่ชี้ไป link เก่า", ok: true, why: "ถูก: ป้องกัน frame ถึง MAC-1 ถูกส่งไป link ที่ขาด" },
        { t: "ไม่ต้องทำอะไร เพราะ S1 จะเรียน MAC ใหม่เองทันทีโดยไม่ต้องรอ aging", ok: false, why: "ผิด: ถ้าไม่ได้รับ flush entry เก่าจะค้างจนกว่า PC1 ส่งใหม่หรือ aging 300 s หมด" },
        { t: "ทั้ง Smart Link และ STP ต้องเปิดบน port เหล่านี้เพื่อความปลอดภัย", ok: false, why: "ผิด: สองโปรโตคอลนี้ใช้ร่วมกันไม่ได้ ต้อง stp disable" },
        { t: "ถ้า master กลับ up จะสลับกลับทันทีโดยอัตโนมัติ", ok: false, why: "ผิด: ต้องตั้ง restore enable และรอ wtr (default 60 s)" }
      ]
    },
    {
      type: "choice",
      story: `S2 อยู่ระหว่าง S1 (core) กับ S4 (access ที่ตั้ง Smart Link) ผ่าน GE1/0/1 (ขึ้นไป S1) และ GE1/0/2 (ลงมา S4) พอ GE1/0/1 ของ S2 ล่ม S4 ไม่รู้เรื่องเพราะ GE1/0/2 ยัง up จึงสูญเสียข้อมูลทั้งหมดผ่านเส้นนั้น`,
      q: "ควรตั้งค่าอย่างไรบน S2?",
      opts: [
        { t: "สร้าง Monitor Link group: GE1/0/1 เป็น uplink และ GE1/0/2 เป็น downlink", why: "ถูก: uplink ล่ม downlink จะถูก down ทำให้ master ของ S4 down และ Smart Link สลับไป slave" },
        { t: "เปิด STP บน S2 และ S4 เพิ่ม", why: "ผิด: STP ใช้ร่วมกับ Smart Link ไม่ได้ และไม่ใช่แนวทางแก้ปัญหา" },
        { t: "สร้าง Monitor Link group โดยให้ GE1/0/2 เป็น uplink และ GE1/0/1 เป็น downlink", why: "ผิด: ทิศสลับ เพราะต้องดูสถานะ link ที่ขึ้นไป core" },
        { t: "ลด wtr ของ Smart Link ที่ S4 เป็น 0", why: "ผิด: wtr เกี่ยวกับการสลับกลับหลัง master กลับมา ไม่ช่วยตรวจจับ upstream ล่ม" }
      ],
      ans: 0
    },
    {
      type: "blank",
      story: `ผู้ดูแลตั้ง Smart Link group บน S4 ด้วย GE0/0/1 เป็น master และ GE0/0/2 เป็น slave เพื่อลด downtime`,
      text: `ก่อนตั้งค่า ต้องใช้คำสั่ง {1} บน port เหล่านั้น เพราะ Smart Link ใช้ร่วมกับ STP ไม่ได้; flush frame มี destination MAC เป็น {2}; ค่า wait-to-restore time เริ่มต้นคือ {3} s และถ้าไม่ได้ตั้ง {4} master จะไม่ถูกสลับกลับอัตโนมัติ`,
      blanks: [
        { opts: ["stp disable", "stp enable", "shutdown", "undo vlan 1"], ans: 0, why: "ปิด STP บน port ที่เข้า Smart Link group" },
        { opts: ["FF-FF-FF-FF-FF-FF", "01-80-C2-00-00-00", "01-0F-E2-00-00-04", "00-00-00-00-00-00"], ans: 2, why: "flush frame ใช้ multicast 01-0F-E2-00-00-04; 01-80-C2-00-00-00 เป็นของ STP BPDU" },
        { opts: ["15", "30", "60", "300"], ans: 2, why: "default wtr = 60 s (ในตัวอย่างหนังสือตั้งเป็น 30 s)" },
        { opts: ["restore enable", "smart-link enable", "flush send", "stp enable"], ans: 0, why: "ต้องเปิด restore เพื่อให้สลับกลับหลัง master กลับมา" }
      ]
    },
    {
      type: "match",
      q: "จับคู่คำศัพท์กับความหมาย",
      pairs: [
        ["Root port", "port ของ non-root bridge ที่มี RPC ต่ำสุดไปยัง root bridge"],
        ["Alternate port", "port ที่ถูก block เพราะไม่เป็นทั้ง root port และ designated port"],
        ["TCN BPDU", "แจ้ง upstream ว่า topology เปลี่ยน เพื่อย่น aging ของ MAC table"],
        ["Eth-Trunk (LACP)", "รวมหลาย link และ negotiate ด้วย LACPDU เพื่อตรวจ peer"],
        ["Monitor Link", "ทำให้ downlink down ตามเมื่อ uplink ล้ม เพื่อกระตุ้น Smart Link"]
      ],
      why: "แต่ละคำเป็นกลไกเฉพาะของ STP, Link Aggregation หรือ Smart/Monitor Link"
    }
  ]
});
