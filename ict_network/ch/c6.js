IOT.reg({
  id: "c6",
  title: "Dynamic Routing: OSPF",
  th: "การแบ่งประเภท dynamic routing, หลักการ OSPF (SPF, LSDB, cost, Router-ID, Hello, DR/BDR, area) และการตั้งค่า single-area / multi-area",
  summary: `
<ul>
<li><b>Dynamic routing</b> แลกข้อมูลเส้นทางเองและปรับตาม topology; แต่กิน bandwidth/resource และ <b>ปลอดภัยน้อยกว่า</b> static; เหมาะกับเครือข่ายซับซ้อนที่มี link สำรอง</li>
<li><b>แบ่งตามอัลกอริทึม</b>: <b>Distance vector</b> (RIP, BGP; ส่งทั้ง routing table เป็นช่วง ๆ, metric = hop count, converge ช้า) กับ <b>Link state</b> (OSPF, IS-IS; แต่ละ router สร้าง topology เองแล้วคำนวณ)</li>
<li><b>แบ่งตามขอบเขต</b>: <b>IGP</b> ภายใน AS (RIP, OSPF, IS-IS) กับ <b>EGP</b> ระหว่าง AS (BGP); AS = กลุ่มเครือข่ายภายใต้การจัดการเดียว</li>
<li><b>OSPF</b>: link state, ทุก router ใน area มี <b>LSDB เหมือนกัน</b>, ใช้ <b>SPF</b> คำนวณ shortest path tree โดยมีตัวเองเป็น root, ไม่เกิด loop, converge เร็ว, รองรับ VLSM และ summarization, ไม่จำกัด hop, ใช้ <b>cost</b> (ตาม bandwidth)</li>
<li><b>Cost</b> = 100 Mbit/s ÷ bandwidth (bit/s) (ปัดเป็นจำนวนเต็ม); 10M = 10, 100M = 1, 1G = 1; cost สะสม = บวก cost <b>ขาออก</b> ของ interface ตลอดทาง (นับ network ปลายทางด้วย); ตั้งเองได้ และชนะค่าอัตโนมัติ</li>
<li><b>Router-ID</b> (รูปแบบ IP, ห้ามซ้ำ): ลำดับ (1) ตั้งมือ (2) IP ที่ <b>มากที่สุด</b> ของ active loopback (3) IP มากที่สุดของ active physical interface</li>
<li><b>Hello</b> ทุก 10 วินาที (multicast), ไม่ได้รับ 40 วินาที = neighbor down; เห็น Router-ID ตัวเองใน Hello ของอีกฝั่ง = two-way</li>
<li><b>3 ตาราง</b>: neighbor table (<code>display ospf peer</code>), LSDB (<code>display ospf lsdb</code>), routing table (<code>display ospf routing</code> / <code>display ip routing-table protocol ospf</code>); OSPF preference = 10</li>
<li><b>State</b>: Down → Init → Two-way → Exchange → Loading → Full (Full = LSDB sync)</li>
<li><b>5 message</b>: 1 Hello, 2 DD (สรุป LSDB), 3 LSR (ขอรายละเอียด), 4 LSU (ส่งรายละเอียด), 5 LSAck (ยืนยัน LSU)</li>
<li><b>Network type</b>: P2P (PPP), BMA/Broadcast (Ethernet), NBMA (Frame Relay), P2MP (ต้องตั้งเอง); ปลายสองฝั่งของ link ต้อง type เดียวกัน; <code>ospf network-type { broadcast | nbma | p2mp | p2p }</code></li>
<li><b>DR/BDR</b> เลือกเฉพาะ broadcast/NBMA: priority สูงสุดชนะ → ถ้าเท่ากัน Router-ID สูงสุดชนะ; priority 0 ไม่มีสิทธิ์; <b>ไม่ preempt</b>; DRother จับ adjacency กับ DR/BDR เท่านั้น (คู่ DRother ค้าง two-way)</li>
<li><b>Area</b>: ต้องมี <b>Area 0 (0.0.0.0) = backbone</b>; ทุก area ต้องต่อกับ backbone; <b>ABR</b> = เชื่อมหลาย area (ทำ summarization), <b>ASBR</b> = เชื่อม AS อื่น; แนะนำไม่เกิน ~200 router ต่อ area</li>
<li><b>Config</b>: <code>ospf 1 router-id x.x.x.x</code> → <code>area 0</code> → <code>network address wildcard-mask</code>; wildcard = ตรงข้าม mask (0.0.0.255 = /24)</li>
<li><b>LSA</b> 1 router-LSA (ทุก router), 2 network-LSA (DR), 3 network-summary-LSA (ABR), 4 ASBR-summary, 5 AS-external</li>
<li><b>ABR summary</b>: <code>abr-summary address mask cost n</code> ใน area view; cost ที่ router อื่นเห็น = cost ถึง ABR + cost ที่ตั้ง</li>
</ul>`,
  sections: [
    {
      t: "ประเภทของ Dynamic Routing Protocol",
      ref: "หน้า 206-208",
      html: `
<p>static routing ปรับตามการเปลี่ยนแปลงไม่ได้ และเครือข่ายใหญ่จัดการ routing table ด้วยมือเสี่ยงผิดพลาด จึงมี <b>dynamic routing</b> ผู้ดูแลแค่เปิด protocol บนทุก router แล้ว router แลกข้อมูลกันเองเพื่อสร้างและดูแล routing table หา path ที่ดีที่สุด และอัปเดตเองเมื่อ topology เปลี่ยน</p>
<ul>
<li><b>ข้อดี</b>: สร้างตาราง ดูแลข้อมูล เลือก path ดีที่สุดและปรับตามสภาพเครือข่ายได้เอง</li>
<li><b>ข้อเสีย</b>: ต้องแลกข้อมูล จึงกิน bandwidth และทรัพยากรเครื่อง และ <b>ปลอดภัยน้อยกว่า static routing</b></li>
<li>เหมาะกับเครือข่ายซับซ้อนที่มี link สำรอง (redundant) และการ reach ปลายทางขึ้นกับสถานะเครือข่าย</li>
</ul>
<h4>1) แบ่งตามกลไก/อัลกอริทึม</h4>
<table>
<tr><th></th><th>Distance Vector (DV)</th><th>Link State (LS)</th></tr>
<tr><td>ตัวอย่าง</td><td>RIP, BGP</td><td>OSPF, IS-IS</td></tr>
<tr><td>แลกอะไรกัน</td><td>ส่ง <b>routing table ทั้งหมด</b> ให้ neighbor ที่ต่อตรง เป็นช่วง ๆ (periodic update)</td><td>แต่ละ router รวบรวม <b>link state</b> จากทุก router ใน area สร้าง topology แล้วคำนวณ route เอง</td></tr>
<tr><td>Metric</td><td>hop count อย่างเดียว ไม่พิจารณา bandwidth/delay (เชื่อถือต่ำ อาจเลือก link ช้าที่ hop น้อย)</td><td>พิจารณา bandwidth (OSPF ใช้ cost)</td></tr>
<tr><td>ขนาดเครือข่าย</td><td>ตารางที่แลกใหญ่ ทำให้ traffic เยอะ converge ช้า</td><td>แบ่งเป็น area ได้ เหมาะเครือข่ายใหญ่</td></tr>
</table>
<h4>2) แบ่งตามขอบเขตการทำงาน</h4>
<p><b>Autonomous System (AS)</b> = กลุ่มเครือข่ายที่แลก routing information กันด้วย routing protocol ที่เป็นหนึ่งเดียว (เช่น เครือข่ายภายในของ ISP) Internet คือ AS หลายตัวเชื่อมกัน</p>
<ul>
<li><b>IGP</b> (Interior Gateway Protocol): routing <b>ภายใน AS</b> ทุก router ใช้วิธีแทนข้อมูลและกฎการประกาศเดียวกัน หน้าที่หลักคือ <b>ค้นหาและคำนวณ route</b> ตัวอย่าง: RIP, OSPF, IS-IS</li>
<li><b>EGP</b> (Exterior Gateway Protocol): แลกข้อมูลเส้นทาง/การ reach <b>ระหว่าง AS</b> หน้าที่หลักคือ <b>ส่งต่อ (delivering) route</b> ตัวอย่าง: EGP (เก่า ไม่มีประสิทธิภาพ), <b>BGP</b> (BGP-4 รองรับ CIDR และ route aggregation รวม AS path)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>DV: RIP, BGP (ส่งทั้งตาราง, hop count, converge ช้า); LS: OSPF, IS-IS (สร้าง topology)</li>
<li>IGP (ภายใน AS): RIP, OSPF, IS-IS; EGP (ระหว่าง AS): BGP</li>
<li>Dynamic routing กิน bandwidth/resource และปลอดภัยน้อยกว่า static</li>
</ul></div>`
    },
    {
      t: "OSPF เบื้องต้น และ Shortest Path First",
      ref: "หน้า 208-211",
      html: `
<h4>OSPF คืออะไร</h4>
<p><b>OSPF (Open Shortest Path First)</b> เป็น link state routing protocol แบบมาตรฐาน router ที่รัน OSPF ไม่แลก "route" กันตรง ๆ แต่แลก <b>link state</b> แล้วเก็บไว้ใน <b>LSDB (Link State DataBase)</b> ทุก router ใน area เดียวกันมี LSDB <b>เหมือนกัน</b> (topology เดียวกัน) จากนั้นแต่ละตัวใช้ <b>SPF algorithm</b> คำนวณ shortest path ไปทุก network แล้วนำ route ที่ได้ลง routing table</p>
<h4>ข้อดีของ OSPF</h4>
<ol>
<li>รองรับ <b>VLSM</b> และ manual route summarization</li>
<li><b>ป้องกัน routing loop</b> เพราะทุก router ใช้ SPF บน LSDB (shortest path tree ไม่มี loop)</li>
<li><b>Converge เร็ว</b> ส่งการเปลี่ยนแปลงไปทั่ว AS ในเวลาสั้น</li>
<li><b>เหมาะเครือข่ายใหญ่</b>: ไม่จำกัด hop count และแบ่ง area ได้</li>
<li>ใช้ <b>cost</b> เป็น metric: cost แปรผกผันกับ bandwidth (bandwidth สูง = cost ต่ำ) จึงเลือกเส้นตาม bandwidth</li>
</ol>
<h4>Shortest path tree และ routing table</h4>
<p>จาก LSDB ทุก router วาด topology เดียวกัน (ตัวเลขบน link คือ cost ที่คำนวณจาก bandwidth)</p>
<figure><img src="i/p209_1.webp" alt="topology ของ router RA ถึง RH และ network segment A ถึง H พร้อม cost บนแต่ละ link" loading="lazy"><figcaption>Fig. 6.1 Network topology generated from the link state database (ทุก router ได้ topology เดียวกันจาก LSDB)</figcaption></figure>
<p>แต่ละ router คำนวณ <b>shortest path tree</b> แบบไม่มี loop โดยมี <b>ตัวเองเป็น root</b> (root ต่างกัน tree ก็ต่างกัน แม้ LSDB เหมือนกัน)</p>
<figure><img src="i/p210_1.webp" alt="shortest path tree ของ RA แสดงเส้นทาง cost ต่ำสุดไปแต่ละ network" loading="lazy"><figcaption>Fig. 6.2 Shortest path tree of Router RA</figcaption></figure>
<table>
<tr><th>จาก RA ไป</th><th>เส้นทาง</th><th>Cumulative cost</th></tr>
<tr><td>Network B</td><td>RA, RB</td><td>2</td></tr>
<tr><td>Network C</td><td>RA, RB, RC</td><td>7</td></tr>
<tr><td>Network D</td><td>RA, RH, RE, RD</td><td>7</td></tr>
<tr><td>Network E</td><td>RA, RH, RE</td><td>5</td></tr>
<tr><td>Network F</td><td>RA, RB, RG, RF</td><td>6</td></tr>
<tr><td>Network G</td><td>RA, RB, RG</td><td>4</td></tr>
<tr><td>Network H</td><td>RA, RH</td><td>4</td></tr>
</table>
<figure><img src="i/p211_1.webp" alt="shortest path tree ของ RH" loading="lazy"><figcaption>Fig. 6.3 Shortest path tree of Router RH (ต่างจาก RA เพราะ root ต่างกัน)</figcaption></figure>
<figure><img src="i/p211_2.webp" alt="routing table ของ RA: destination, cumulative cost, next hop" loading="lazy"><figcaption>Fig. 6.4 Generate a routing table (จาก tree ได้ตาราง: destination, cumulative cost, next hop)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>OSPF แลก <b>link state</b> (ไม่ใช่ routing table) เก็บใน LSDB ซึ่ง router ทุกตัวใน area มีเหมือนกัน</li>
<li>แต่ละ router ใช้ SPF คำนวณ tree โดยตัวเองเป็น root → ได้ route ที่ loop-free</li>
<li>ข้อดี: VLSM, no loop, converge เร็ว, ขยายได้ (area), cost ตาม bandwidth</li>
</ul></div>`
    },
    {
      t: "ศัพท์ OSPF: Router-ID, Cost, Link, Link State, Neighbor",
      ref: "หน้า 210-213",
      html: `
<h4>1) Router-ID</h4>
<p>ทุก router ที่รัน OSPF ต้องมี <b>Router-ID</b> ที่ไม่ซ้ำกันในเครือข่าย (เขียนในรูป IP address) เพราะ link state ทุกตัวมี Router-ID ของผู้ส่ง ถ้าซ้ำ router จะแยกผู้ส่งไม่ได้ วิธีกำหนด (ตามลำดับความสำคัญ):</p>
<ol>
<li><b>ตั้งเอง</b> (manual) - ที่นิยมในงานจริง มักตั้งให้ตรงกับ IP ของ loopback</li>
<li>ถ้าไม่ตั้ง: IP ที่ <b>มากที่สุด</b> ของ active loopback interface</li>
<li>ถ้าไม่มี loopback: IP ที่มากที่สุดของ active physical interface (interface ที่ไม่ active ใช้ไม่ได้)</li>
</ol>
<h4>2) Metric: cost</h4>
<p>OSPF ใช้ <b>cost</b> เป็น metric แต่ละ interface ที่เปิด OSPF มี interface cost:</p>
<pre><code>cost = 100 Mbit/s / interface bandwidth   (reference 100 Mbit/s, ปรับได้; หน่วยเป็น bit/s)
10 Mbit/s  : 100000000 / 10000000  = 10
100 Mbit/s : 100000000 / 100000000 = 1
1000 Mbit/s: ผลหารเป็น 0.1 แต่ cost ต้องเป็นจำนวนเต็ม จึงได้ 1 (เท่ากับ 100 Mbit/s)</code></pre>
<ul>
<li>Bandwidth สูง = cost ต่ำ; path ที่ดีที่สุด = cost สะสมต่ำสุด</li>
<li>cost สะสมคือผลรวมของ cost <b>interface ขาออก</b> ตลอดทาง (ไม่นับ interface ขาเข้า)</li>
<li>OSPF คำนวณ cost อัตโนมัติ แต่ <b>ตั้งเองได้ และค่าที่ตั้งชนะค่าอัตโนมัติ</b></li>
</ul>
<figure><img src="i/p212_1.webp" alt="ตัวอย่าง cost ของ interface: FE=1, GE=1, Serial 1.544Mbps=64 และ cost สะสมจาก R3 ไป 1.1.1.0/24 = 10+1+64=75" loading="lazy"><figcaption>Fig. 6.5 Interface cost and cumulative cost (R3 ไป 1.1.1.0/24: 10 + 1 + 64 = 75)</figcaption></figure>
<h4>3) Link และ 4) Link state</h4>
<ul>
<li><b>Link</b> = interface ของ router ที่ทำงานภายใต้ OSPF process</li>
<li><b>Link state</b> = ข้อมูลอธิบาย interface เช่น IP address, mask, network type, cost สิ่งที่ router OSPF แลกเปลี่ยนกันคือ link state ไม่ใช่ routing table</li>
</ul>
<h4>5) Neighbor และ 6) Neighbor state</h4>
<ul>
<li><b>Neighbor</b>: router ใน network segment เดียวกันที่รัน OSPF ค้นพบกันด้วย <b>Hello</b> ซึ่งส่งเป็นช่วง ๆ แบบ IP multicast ที่ interface เมื่อ router เห็น Router-ID ของตัวเองใน Hello ของอีกฝั่ง ก็เป็น neighbor ซึ่งต้อง <b>ยืนยันทั้งสองฝั่ง</b></li>
<li>หลังแลก DD, LSR, LSU, LSAck แล้ว LSDB ของสองฝั่งเหมือนกัน → เข้าสู่ <b>neighbor state</b> (Full)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Router-ID: ตั้งเอง &gt; loopback IP มากสุด &gt; physical IP มากสุด (เฉพาะ interface ที่ active)</li>
<li>cost = 100 Mbit/s / bandwidth; 100M และ 1G ได้ cost = 1 เท่ากัน; cost สะสม = ผลรวมของ interface <b>ขาออก</b></li>
<li>OSPF แลก link state (ไม่ใช่ routing table)</li>
</ul></div>
<div class="warn"><b>ระวัง</b> reference bandwidth ค่าเริ่มต้น 100 Mbit/s ทำให้ link 100M กับ 1G/10G ดูเท่ากัน (cost = 1) หากเครือข่ายมี link เร็วต้องปรับ reference หรือตั้ง cost เอง ไม่เช่นนั้น OSPF จะเลือก path ผิดจริง</div>`
    },
    {
      t: "ขั้นตอนทำงานของ OSPF และชนิดของ Message",
      ref: "หน้า 213-215",
      html: `
<p>router OSPF มี 3 ตาราง: neighbor table, link state table (LSDB), routing table การทำงานคือสร้างทั้งสามตามลำดับ</p>
<figure><img src="i/p214_1.webp" alt="แผนภาพเวลา R1 กับ R2: Hello, Database Description, Link State Request/Update/Acknowledgement จน Full และคำนวณ route" loading="lazy"><figcaption>Fig. 6.6 Working process of OSPF protocol (สร้าง neighbor table → สร้าง LSDB → คำนวณ shortest path และ routing table)</figcaption></figure>
<h4>1) สร้าง neighbor table (Hello)</h4>
<ul>
<li>router ส่ง <b>Hello ทุก 10 วินาที</b> เพื่อรู้ว่า neighbor ตัวไหนทำงานอยู่</li>
<li>ถ้าไม่ได้รับ Hello จาก neighbor นาน <b>40 วินาที</b> ถือว่า neighbor ใช้ไม่ได้ จึงแก้ LSDB และคำนวณ routing table ใหม่ทันที</li>
<li><b>Down</b> → ส่ง Hello (ยังไม่เห็น router อื่น) → <b>Init</b> → ได้รับ Hello ที่มี Router-ID ของตัวเองอยู่ใน neighbor list → <b>Two-way</b> (เป็น neighbor แล้ว)</li>
</ul>
<h4>2) สร้าง link state table (LSDB)</h4>
<ul>
<li><b>Exchange</b>: ส่ง <b>DD (Database Description)</b> ซึ่งเป็นสรุปรายการใน LSDB (Router-ID ทั้งหมดที่ตนรู้จัก)</li>
<li><b>Loading</b>: ใช้ <b>LSR</b> ขอรายละเอียด link state ของ router ที่ตนขาด และอีกฝั่งตอบด้วย <b>LSU</b> พร้อม <b>LSAck</b> ยืนยัน</li>
<li><b>Full</b>: LSDB ของทั้งสองฝั่งซิงก์ครบ ทุก router รู้ topology ทั้งหมด</li>
</ul>
<h4>3) สร้าง routing table</h4>
<p>จาก LSDB ใช้ SPF คำนวณ tree ที่มีตัวเองเป็น root แล้วได้ route ไปแต่ละ network</p>
<h4>5 ชนิดของ OSPF message</h4>
<table>
<tr><th>Type</th><th>ชื่อ</th><th>หน้าที่</th></tr>
<tr><td>1</td><td>Hello</td><td>ค้นหาและรักษา neighbor</td></tr>
<tr><td>2</td><td>Database Description (DD)</td><td>ส่ง <b>สรุป</b> ของ link state ทั้งหมดใน LSDB ให้ neighbor</td></tr>
<tr><td>3</td><td>Link State Request (LSR)</td><td>ขอรายละเอียด link state ที่ขาด</td></tr>
<tr><td>4</td><td>Link State Update (LSU)</td><td>ส่งรายละเอียด link state</td></tr>
<tr><td>5</td><td>Link State Acknowledgement (LSAck)</td><td>ยืนยันการได้รับ LSU (OSPF ต้อง ack ชัดเจนเฉพาะ LSU)</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Hello ทุก 10 วินาที; 40 วินาทีไม่ได้รับ = neighbor ใช้ไม่ได้</li>
<li>State: Down → Init → Two-way → Exchange → Loading → Full</li>
<li>Message: 1 Hello, 2 DD, 3 LSR, 4 LSU, 5 LSAck</li>
<li>DD = สรุปรายชื่อ; LSR = ขอรายละเอียด; LSU = ส่งรายละเอียด</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ตามมาตรฐาน RFC ก่อน Exchange มีขั้น ExStart (เลือก master/slave สำหรับ DD) หนังสือรวมไว้ใน Exchange ในข้อสอบให้ยึดลำดับในหนังสือ</div>`
    },
    {
      t: "Network Type, DR และ BDR",
      ref: "หน้า 215-218",
      html: `
<h4>Network type ที่ OSPF กำหนด</h4>
<p>Network type เป็นตัวแปรของ interface ที่กำหนดวิธีส่ง OSPF message และว่าต้องเลือก DR/BDR หรือไม่ ค่าเริ่มต้นขึ้นกับ data link encapsulation และเปลี่ยนได้ด้วย <code>ospf network-type</code> โดย <b>ปลายสองฝั่งของ link ต้องใช้ type เดียวกัน</b> ไม่งั้นไม่เป็น neighbor</p>
<table>
<tr><th>Type</th><th>ลักษณะ</th><th>ตัวอย่าง</th><th>DR/BDR</th></tr>
<tr><td>P2P</td><td>ต่ออุปกรณ์ได้ 2 ตัวต่อ link</td><td>PPP (default เมื่อ encapsulate PPP)</td><td>ไม่มี</td></tr>
<tr><td>BMA (Broadcast)</td><td>หลายอุปกรณ์ และรองรับ broadcast</td><td>Ethernet (default)</td><td>มี</td></tr>
<tr><td>NBMA</td><td>หลายอุปกรณ์ แต่ไม่รองรับ broadcast</td><td>Frame Relay</td><td>มี</td></tr>
<tr><td>P2MP</td><td>เหมือนรวมปลายหนึ่งของ P2P หลายเส้น; ไม่มีค่าเริ่มต้น ต้องตั้ง (เช่น แปลง NBMA ที่ไม่ full mesh)</td><td>-</td><td>ไม่มี</td></tr>
</table>
<figure><img src="i/p216_1.webp" alt="แผนภาพ P2P และ broadcast network" loading="lazy"><figcaption>Fig. 6.7 P2P and broadcast networks</figcaption></figure>
<figure><img src="i/p216_2.webp" alt="แผนภาพ NBMA และ P2MP" loading="lazy"><figcaption>Fig. 6.8 NBMA and P2MP</figcaption></figure>
<pre><code>[R1-GigabitEthernet0/0/0]ospf network-type ?
  broadcast  Specify OSPF broadcast network
  nbma       Specify OSPF NBMA network
  p2mp       Specify OSPF point-to-multipoint network
  p2p        Specify OSPF point-to-point network</code></pre>
<h4>ทำไมต้องมี DR และ BDR</h4>
<p>ใน multi-access network (BMA, NBMA) ถ้าทุก router ตั้ง neighbor กันครบทุกคู่ จะมีจำนวน neighbor relationship มหาศาล เพิ่มภาระเครื่องและ OSPF message ที่ flood เมื่อ topology เปลี่ยน OSPF จึงกำหนด 3 บทบาท: <b>DR</b> (Designated Router), <b>BDR</b> (Backup DR) และ <b>DRother</b></p>
<figure><img src="i/p217_1.webp" alt="multi-access network ที่ทุก router เป็น neighbor กันหมด" loading="lazy"><figcaption>Fig. 6.9 Multi-access network neighbor relationship (ถ้าจับคู่ทุกตัว จำนวน relationship เพิ่มเร็วมาก)</figcaption></figure>
<figure><img src="i/p218_1.webp" alt="R1 เป็น DR, R2 เป็น BDR, R3 R4 R5 เป็น DRother เชื่อมกับ DR และ BDR เท่านั้น" loading="lazy"><figcaption>Fig. 6.10 Neighbor relationship (DRother แลก LSA กับ DR และ BDR เท่านั้น แล้ว DR กระจายต่อ)</figcaption></figure>
<ul>
<li>DRother จะสร้าง neighbor (adjacency) กับ <b>DR และ BDR เท่านั้น</b> ระหว่าง DRother กันเองค้างที่ <b>two-way</b></li>
<li>BDR คอยดู DR และ <b>รับช่วงต่อ</b> เมื่อ DR ล้มเหลว</li>
<li>ถ้าสองจุดเชื่อมกันตรงด้วย Ethernet ตั้ง type เป็น <b>P2P</b> ได้เพื่อไม่ต้องมี DR/BDR election</li>
</ul>
<h4>กฎการเลือก DR/BDR</h4>
<ol>
<li>เลือกผ่าน Hello โดยทุก router ใน segment เดียวกัน เฉพาะ router ที่ <b>priority &gt; 0</b> มีสิทธิ์ (priority 0 ไม่เป็นทั้ง DR และ BDR)</li>
<li><b>Priority สูงกว่าชนะ</b></li>
<li>ถ้า priority เท่ากัน <b>Router-ID มากกว่าชนะ</b></li>
<li>เลือกเฉพาะบน interface แบบ <b>broadcast หรือ NBMA</b> (ไม่มีบน P2P/P2MP)</li>
<li>DR เป็นแนวคิดต่อ <b>interface/segment</b>: router หนึ่งเป็น DR บน interface หนึ่ง แต่เป็น BDR หรือ DRother บนอีก interface ได้</li>
<li><b>ไม่ preempt</b>: เมื่อเลือกแล้ว แม้ router priority สูงกว่าเข้ามาทีหลังก็ไม่แทน DR/BDR เดิม; DR ไม่จำเป็นต้องเป็น router ที่ priority สูงสุดเสมอไป</li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>Type: P2P (PPP), Broadcast/BMA (Ethernet), NBMA (Frame Relay), P2MP; ต้องตรงกันทั้งสองฝั่ง</li>
<li>DR/BDR เลือกบน broadcast/NBMA เท่านั้น; priority สูงสุด → Router-ID สูงสุด; priority 0 ไม่มีสิทธิ์; ไม่ preempt</li>
<li>DRother ↔ DRother ค้าง two-way; adjacency ต่อ DR และ BDR เท่านั้น</li>
</ul></div>`
    },
    {
      t: "สามตารางของ OSPF และ OSPF Area",
      ref: "หน้า 218-220",
      html: `
<h4>สามตารางของ OSPF</h4>
<table>
<tr><th>ตาราง</th><th>เก็บอะไร</th><th>คำสั่ง Huawei</th></tr>
<tr><td>Neighbor table</td><td>สถานะ neighbor (สร้างจากการแลก Hello)</td><td><code>display ospf peer</code> (หรือ <code>display ospf peer brief</code>)</td></tr>
<tr><td>LSDB</td><td>LSA ที่สร้างเองและรับจาก neighbor = ความเข้าใจ topology ทั้งหมด</td><td><code>display ospf lsdb</code></td></tr>
<tr><td>OSPF routing table</td><td>route ที่ได้จากการรัน SPF บน LSDB (จะเข้า IP routing table หรือไม่ ขึ้นกับ preference)</td><td><code>display ospf routing</code>, <code>display ip routing-table protocol ospf</code></td></tr>
</table>
<h4>OSPF Area</h4>
<p>เพื่อให้ OSPF ใช้ในเครือข่ายขนาดใหญ่มาก จึงแบ่ง AS เป็น <b>area</b> ย่อย ข้อดี: ควบคุมขอบเขตการ flood link state ให้อยู่ใน area ลด traffic, ลดขนาด LSDB, ขยายเครือข่ายง่ายขึ้น และ converge เร็ว router ภายใน area รู้ topology เต็มของ area ตัวเองเท่านั้น</p>
<ul>
<li>เมื่อมีหลาย area ต้องมี <b>Area 0 (backbone area)</b> เสมอ และ <b>ทุก area ต้องต่อ (จริงหรือ logical) กับ backbone</b> เพราะ route จากทุก area รวมเข้า backbone ก่อนแจกจ่ายไป area อื่น</li>
<li>Area ID ยาว 32 bit เขียนแบบ dotted decimal: Area 0 = 0.0.0.0, Area 1 = 0.0.0.1</li>
<li>ควรให้ area หนึ่งมี router ไม่เกิน ~200 ตัว</li>
<li>ใช้ร่วมกับการวางแผน IP: address ใน area ต้องต่อเนื่อง เพื่อ summarize ที่ขอบ area</li>
</ul>
<figure><img src="i/p220_1.webp" alt="AS ที่มี backbone area 0.0.0.0 และ area 1, 2 โดยมี ABR R4 R5 และ ASBR R3" loading="lazy"><figcaption>Fig. 6.12 Autonomous system and OSPF areas (backbone 0.0.0.0, ABR = R4/R5, ASBR = R3)</figcaption></figure>
<h4>บทบาทของ router</h4>
<table>
<tr><th>บทบาท</th><th>คำอธิบาย</th></tr>
<tr><td>Backbone router</td><td>router ที่อยู่ใน backbone area (R1-R5 ในรูป); อาจเป็น ABR ด้วย</td></tr>
<tr><td><b>ABR</b> (Area Border Router)</td><td>เชื่อม backbone กับ non-backbone area; summarize route ของ area แล้วส่งเข้า area อื่น; ทุก area ควรมีอย่างน้อย 1 ABR</td></tr>
<tr><td><b>ASBR</b> (AS Boundary Router)</td><td>แลก route กับ AS อื่น</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>3 ตาราง: neighbor (<code>display ospf peer</code>), LSDB (<code>display ospf lsdb</code>), routing (<code>display ospf routing</code>)</li>
<li>Area 0 = backbone (0.0.0.0); ทุก area ต้องต่อกับ backbone</li>
<li>ABR เชื่อมหลาย area (backbone + non-backbone), ASBR เชื่อม AS อื่น</li>
<li>Area ช่วยจำกัดขอบเขต flood, ลดขนาด LSDB, converge เร็ว</li>
</ul></div>`
    },
    {
      t: "ตั้งค่า OSPF แบบ Single-Area และชนิดของ LSA",
      ref: "หน้า 220-224",
      html: `
<p>เครือข่ายเล็กถึงกลางใช้ area เดียวได้ ส่วนองค์กรใหญ่ที่มีลำดับชั้นชัดเจนควรใช้ multi-area ถ้ามี area เดียว <b>ต้องเป็น backbone (Area 0 หรือ 0.0.0.0)</b></p>
<figure><img src="i/p221_1.webp" alt="topology R1 ถึง R5 ที่ใช้ตัวอย่าง OSPF single area" loading="lazy"><figcaption>Fig. 6.13 Configure network topology for OSPF protocol</figcaption></figure>
<h4>ขั้นตอนบน R1</h4>
<pre><code>[R1]display router id                   -- ดู Router-ID ปัจจุบัน
RouterID:172.16.1.1
[R1]ospf 1 router-id 1.1.1.1            -- เปิด process 1 พร้อมกำหนด Router-ID
[R1-ospf-1]area 0.0.0.0                 -- สร้าง/เข้า area 0
[R1-ospf-1-area-0.0.0.0]network 172.16.0.0 0.0.255.255   -- บอกว่า interface ใดรัน OSPF ใน area นี้
[R1-ospf-1-area-0.0.0.0]quit</code></pre>
<ol>
<li><code>ospf 1</code>: เลข process 1-65535 (ค่าเริ่มต้นเมื่อไม่ระบุคือ 1); <code>router-id</code> ถ้าไม่ระบุตอนเปิด ใช้ค่าจากคำสั่ง <code>router-id</code> หรือเลือกอัตโนมัติ</li>
<li><code>area</code>: ฟิลด์ area ในแพ็กเก็ตยาว 4 byte จึงเขียนเป็นตัวเลขหรือ dotted decimal ก็ได้ (Area 0 = 0.0.0.0, Area 1 = 0.0.0.1)</li>
<li><code>network address wildcard-mask</code>: interface ที่มี IP อยู่ในช่วงนี้จะรัน OSPF (ใน area นั้น)</li>
</ol>
<h4>Wildcard mask</h4>
<p>wildcard mask ใช้จำกัด host bit: bit 1 เรียงต่อเนื่องจากขวาไปซ้าย (ห้ามมี 0 คั่น) = host bit ที่ไม่ต้องเทียบ เป็น "ตรงข้าม" ของ subnet mask</p>
<table>
<tr><th>Subnet mask</th><th>Wildcard</th><th>ครอบ</th></tr>
<tr><td>/16 (255.255.0.0)</td><td>0.0.255.255</td><td>172.16.0.0 - 172.16.255.255</td></tr>
<tr><td>/24 (255.255.255.0)</td><td>0.0.0.255</td><td>172.16.1.0 - 172.16.1.255</td></tr>
<tr><td>/30 (255.255.255.252)</td><td>0.0.0.3</td><td>4 address เช่น 172.16.0.0 - 172.16.0.3</td></tr>
<tr><td>/32</td><td>0.0.0.0</td><td>เฉพาะ address นั้น</td></tr>
<tr><td>/0</td><td>255.255.255.255</td><td>ทุก address (เช่น <code>network 0.0.0.0 255.255.255.255</code>)</td></tr>
</table>
<p>วิธีหา wildcard = 255.255.255.255 - subnet mask (ทีละ octet)</p>
<pre><code>[R1-ospf-1-area-0.0.0.0]network 172.16.1.0 0.0.0.255     -- เขียนแยกทีละ interface (แม่นกว่า)
[R1-ospf-1-area-0.0.0.0]network 172.16.0.0 0.0.0.3
[R1-ospf-1-area-0.0.0.0]network 172.16.0.16 0.0.0.3

[R3-ospf-1-area-0.0.0.0]network 172.16.0.6 0.0.0.0       -- ระบุ IP ของ interface ตรง ๆ (ถ้าเปลี่ยน IP ต้องแก้ใหม่)
[R5-ospf-1-area-0.0.0.0]network 0.0.0.0 255.255.255.255  -- ครอบทุก interface</code></pre>
<p>ถ้า interface อยู่ต่าง area ต้องระบุแยกใน area แต่ละอัน; ตรวจ interface ที่รัน OSPF ด้วย <code>display ospf interface</code> (แสดง IP, Type, State, Cost, Pri, DR, BDR)</p>
<h4>ชนิดของ LSA</h4>
<table>
<tr><th>Type</th><th>ชื่อ</th><th>ใครสร้าง</th><th>หมายเหตุ</th></tr>
<tr><td>1</td><td>Router-LSA</td><td>ทุก router</td><td>router หนึ่งสร้างหนึ่ง LSA ต่อ area; flood ได้ถึงขอบ ABR; "แนะนำตัว": link ไหนรัน OSPF, neighbor คือใคร, ต่อกันอย่างไร, network ระหว่างกัน</td></tr>
<tr><td>2</td><td>Network-LSA</td><td><b>DR</b></td><td>สร้างหนึ่งอันต่อ MA network; P2P ไม่มี LSA type 2</td></tr>
<tr><td>3</td><td>Network-summary-LSA</td><td><b>ABR</b> เท่านั้น</td><td>ABR แปลง LSA 1 และ 2 ของ area ที่รับมาเป็น LSA 3 ส่งไป area อื่น (ใน LSDB แสดงเป็น Sum-Net)</td></tr>
<tr><td>4</td><td>ASBR-summary-LSA</td><td>ABR</td><td>ไม่ลงรายละเอียด</td></tr>
<tr><td>5</td><td>AS-external-LSA</td><td>ASBR</td><td>ไม่ลงรายละเอียด</td></tr>
</table>
<p>ดู LSA type 1 ของ router ใด ด้วย <code>display ospf lsdb router x.x.x.x</code> ผลจะแสดง Link Type (P-2-P, StubNet), Link ID, Metric ของแต่ละ link เช่น P-2-P ไป 2.2.2.2 metric 48 และ StubNet 172.16.1.0/24 metric 1</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>ขั้นตอน: <code>ospf 1 router-id x.x.x.x</code> → <code>area 0</code> → <code>network address wildcard</code></li>
<li>wildcard = ตรงข้าม mask: /24 = 0.0.0.255, /16 = 0.0.255.255, /30 = 0.0.0.3, host = 0.0.0.0</li>
<li>LSA 1 ทุก router, LSA 2 DR, LSA 3 ABR</li>
</ul></div>
<div class="warn"><b>ระวัง</b> network statement ที่ไม่ครอบ IP ของ interface จะทำให้ interface นั้นไม่รัน OSPF และไม่มี Hello/neighbor เช่น <code>network 192.168.1.0 0.0.0.3</code> ครอบแค่ 192.168.1.0-.3 ไม่ครอบ 192.168.1.5</div>`
    },
    {
      t: "ตั้งค่า OSPF แบบ Multi-Area และตรวจสอบสามตาราง",
      ref: "หน้า 224-229",
      html: `
<p>ตัวอย่าง: 3 area โดยวางแผน address ต่อเนื่องในแต่ละ area: Area 0 = 40.0.0.0/16, Area 1 = 40.1.0.0/16, Area 2 = 40.2.0.0/16 เพื่อให้ summarize ที่ ABR ได้ (area กับการวางแผน IP ต้องไปด้วยกัน)</p>
<figure><img src="i/p225_1.webp" alt="topology R1-R7 แบ่งเป็น Area 0, Area 1, Area 2 โดย R2 R3 เป็น ABR" loading="lazy"><figcaption>Fig. 6.14 Multi-area OSPF network topology (R2 เป็น ABR ของ Area 0/1, R3 เป็น ABR ของ Area 0/2)</figcaption></figure>
<pre><code>-- R1 (backbone router)
[R1]ospf 1 router-id 1.1.1.1
[R1-ospf-1]area 0.0.0.0
[R1-ospf-1-area-0.0.0.0]network 40.0.0.0 0.0.255.255

-- R2 (ABR: Area 0 และ Area 1)
[R2]ospf 1 router-id 2.2.2.2
[R2-ospf-1]area 0
[R2-ospf-1-area-0.0.0.0]network 40.0.0.0 0.0.255.255
[R2-ospf-1-area-0.0.0.0]quit
[R2-ospf-1]area 0.0.0.1
[R2-ospf-1-area-0.0.0.1]network 40.1.0.0 0.0.255.255

-- R3 (ABR: Area 0 และ Area 2, ระบุ interface ตรง ๆ ด้วย wildcard 0.0.0.0)
[R3]ospf 1 router-id 3.3.3.3
[R3-ospf-1]area 0.0.0.0
[R3-ospf-1-area-0.0.0.0]network 40.0.0.0 0.0.255.255
[R3-ospf-1-area-0.0.0.0]quit
[R3-ospf-1]area 0.0.0.2
[R3-ospf-1-area-0.0.0.2]network 40.2.0.1 0.0.0.0
[R3-ospf-1-area-0.0.0.2]network 40.2.1.1 0.0.0.0

-- R4, R5 (Area 1) ใช้ network 40.1.0.0 0.0.255.255 ใน area 1
-- R6, R7 (Area 2) ใช้ network 40.2.0.0 0.0.255.255 ใน area 2</code></pre>
<p>บน R2 ใช้ <code>display this</code> ใน OSPF view เพื่อดู config ที่ตั้งไว้ (ospf 1 router-id 2.2.2.2 / area 0.0.0.0 / network 40.0.0.0 ... / area 0.0.0.1 / network 40.1.0.0 ...)</p>
<h4>ตรวจสอบสามตารางบน R1</h4>
<pre><code>&lt;R1&gt;display ospf peer brief            -- 1) neighbor table
 Area Id      Interface    Neighbor id   State
 0.0.0.0      Serial2/0/0  2.2.2.2       Full
 0.0.0.0      Serial2/0/1  3.3.3.3       Full</code></pre>
<ul>
<li><b>Full</b> = LSDB ของ R1 กับ neighbor ซิงก์กัน</li>
<li><code>display ospf lsdb</code> (LSDB): ใน area 0 ของ R1 จะเห็น Router LSA (1.1.1.1, 2.2.2.2, 3.3.3.3) และ <b>Sum-Net</b> ของ network ใน Area 1 และ Area 2 ซึ่ง ABR (2.2.2.2 และ 3.3.3.3) เป็นผู้ประกาศ (AdvRouter)</li>
<li><code>display ip routing-table protocol ospf</code>: Proto = OSPF, <b>Pre = 10</b>, cost = cost สะสมตาม bandwidth (เช่น 40.1.0.0/24 cost 96 ผ่าน Serial2/0/0)</li>
<li><code>display ospf routing</code>: แสดง route เฉพาะ OSPF พร้อม AdvRouter และ Type: <b>Stub</b> (network ต่อตรงใน area; cost 1 สำหรับ Ethernet, 48 สำหรับ Serial), <b>Inter-area</b> (network ใน area อื่นผ่าน ABR)</li>
</ul>
<table>
<tr><th>Destination</th><th>Cost</th><th>Type</th><th>NextHop</th><th>AdvRouter</th></tr>
<tr><td>40.0.1.0/24</td><td>48</td><td>Stub</td><td>40.0.1.1</td><td>1.1.1.1</td></tr>
<tr><td>40.1.0.0/24</td><td>96</td><td>Inter-area</td><td>40.0.1.2</td><td>2.2.2.2</td></tr>
<tr><td>40.2.2.0/24</td><td>97</td><td>Inter-area</td><td>40.0.2.2</td><td>3.3.3.3</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>ABR ใช้ network statement ของ <b>ทั้งสอง area</b> (area 0 และ non-backbone area) ใน process เดียว</li>
<li>Neighbor พร้อมใช้ = state <b>Full</b>; route ใน OSPF มี preference <b>10</b></li>
<li>Route จาก area อื่นแสดงเป็น <b>Inter-area</b> (LSA 3, Sum-Net); network ต่อตรงเป็น <b>Stub</b></li>
</ul></div>`
    },
    {
      t: "Route Summarization บน ABR",
      ref: "หน้า 229-230",
      html: `
<p>เมื่อ address ใน area ต่อเนื่อง ABR สามารถ <b>รวม</b> network ของ area เป็นก้อนเดียว ส่งเข้า area อื่นเป็น LSA 3 เพียงอันเดียว ลดขนาด LSDB และ routing table ของ router อื่น คำสั่ง <code>abr-summary</code> ทำใน area view โดยระบุ cost ได้</p>
<pre><code>[R2]ospf 1
[R2-ospf-1]area 1
[R2-ospf-1-area-0.0.0.1]abr-summary 40.1.0.0 255.255.0.0 cost 10
[R2-ospf-1-area-0.0.0.1]quit
[R2-ospf-1]area 0
[R2-ospf-1-area-0.0.0.0]abr-summary 40.0.0.0 255.255.0.0 cost 10

[R3]ospf 1
[R3-ospf-1]area 0
[R3-ospf-1-area-0.0.0.0]abr-summary 40.0.0.0 255.255.0.0 cost 10
[R3-ospf-1-area-0.0.0.0]quit
[R3-ospf-1]area 2
[R3-ospf-1-area-0.0.0.2]abr-summary 40.2.0.0 255.255.0.0 cost 20</code></pre>
<ul>
<li>ก่อนทำ summary R1 เห็น Sum-Net หลายรายการ (40.1.0.0, 40.1.1.0, 40.1.2.0, 40.1.3.0, 40.2.x.x ...)</li>
<li>หลังทำ: LSDB ของ R1 มี Sum-Net แค่ <b>40.1.0.0 (cost 10, จาก 2.2.2.2)</b> และ <b>40.2.0.0 (cost 20, จาก 3.3.3.3)</b> หนึ่งรายการต่อ area</li>
<li>routing table ของ R1: <b>40.1.0.0/16 cost 58</b> (Inter-area) และ <b>40.2.0.0/16 cost 68</b></li>
</ul>
<table>
<tr><th>Route</th><th>cost ถึง ABR (link serial)</th><th>cost ที่ตั้งใน abr-summary</th><th>cost ที่ R1 เห็น</th></tr>
<tr><td>40.1.0.0/16 (Area 1 ผ่าน R2)</td><td>48</td><td>10</td><td>58</td></tr>
<tr><td>40.2.0.0/16 (Area 2 ผ่าน R3)</td><td>48</td><td>20</td><td>68</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Summarize ที่ ABR ด้วย <code>abr-summary address mask [cost n]</code> ในมุมมอง area ที่ต้องการรวม</li>
<li>cost ที่ router อื่นเห็น = cost ไปถึง ABR + cost ที่ตั้งใน summary (48 + 10 = 58; 48 + 20 = 68)</li>
<li>ผล: LSDB และ routing table ของ router อื่นเล็กลง (หนึ่ง Sum-Net ต่อ area)</li>
<li>ได้ผลเมื่อวางแผน address ต่อเนื่องใน area (เช่น 40.1.0.0/16)</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `R1 ต้องไปถึง LAN ที่ต่ออยู่ที่ R3 (LAN ต่อผ่าน interface GE ของ R3) มีสองเส้นทาง: เส้น A: R1 ออกทาง FE (100 Mbit/s) ไป R2, R2 ออกทาง link 10 Mbit/s ไป R3; เส้น B: R1 ออก serial 1.544 Mbit/s (cost 64) ตรงไป R3 ทุกอย่างใช้ reference 100 Mbit/s และนับ cost ขาออกของแต่ละ interface รวม interface GE ของ R3 ที่ต่อ LAN`,
      q: "OSPF เลือกเส้นไหน และ cost สะสมเท่าใด?",
      opts: [
        { t: "เส้น A: 1 + 10 + 1 = 12", why: "ถูก: FE = 1, link 10M = 10, GE ที่ต่อ LAN = 1 รวม 12; เส้น B = 64 + 1 = 65 จึงแพ้" },
        { t: "เส้น B: 64 + 1 = 65 เพราะ hop น้อยกว่า", why: "ผิด: OSPF ไม่ได้ใช้ hop count แต่ใช้ cost สะสม ซึ่งเส้น B สูงกว่า" },
        { t: "เส้น A: 1 + 10 = 11", why: "ผิด: ลืมนับ cost ของ interface ขาออกที่ต่อกับ network ปลายทาง (GE = 1) ซึ่งต้องรวมด้วย" },
        { t: "เส้น B เพราะเป็น link ตรง", why: "ผิด: ความตรงไม่เกี่ยว ดู cost สะสม" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เครือข่ายมี link 100 Mbit/s และ link 10 Gbit/s ปนกัน OSPF ใช้ reference bandwidth ค่าเริ่มต้น (100 Mbit/s) และผู้ดูแลพบว่า router เลือก path ผ่าน link 100M บ้าง 10G บ้างสลับกัน`,
      q: "สาเหตุคืออะไร?",
      opts: [
        { t: "cost ของ 100M และ 10G ปัดเป็น 1 เท่ากัน จึงดูเสมอกัน; ต้องปรับ reference bandwidth หรือตั้ง cost เอง", why: "ถูก: cost ต้องเป็นจำนวนเต็ม 100M/100M = 1 และ 100M/10G ปัดเป็น 1 จึงแยกไม่ออก" },
        { t: "OSPF ไม่รองรับ link ความเร็วต่างกัน", why: "ผิด: รองรับ แต่ต้องปรับให้ cost สะท้อน bandwidth" },
        { t: "10G มี cost 10 จึงสูงกว่า", why: "ผิด: bandwidth สูง = cost ต่ำ ไม่ใช่สูง" },
        { t: "ต้องเปลี่ยนเป็น RIP เพราะ RIP นับ bandwidth", why: "ผิด: RIP ใช้ hop count ไม่ใช้ bandwidth" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router R9 ไม่ได้ตั้ง Router-ID เอง มี Loopback0 = 10.0.0.1, Loopback1 = 10.0.0.9, GE0/0/0 = 192.168.1.1 (up), GE0/0/1 = 200.5.5.1 (up) แล้วเปิด OSPF`,
      q: "Router-ID ของ R9 คืออะไร?",
      opts: [
        { t: "10.0.0.9", why: "ถูก: ถ้าไม่ตั้งเอง เลือก IP ที่มากที่สุดของ active loopback ก่อน (10.0.0.9 &gt; 10.0.0.1) แม้ physical จะมีค่ามากกว่า" },
        { t: "200.5.5.1", why: "ผิด: IP ของ physical มากกว่า แต่ loopback มีลำดับความสำคัญสูงกว่า" },
        { t: "10.0.0.1", why: "ผิด: เลือกตัวที่มากที่สุด ไม่ใช่น้อยที่สุด" },
        { t: "192.168.1.1", why: "ผิด: ไม่ใช่ทั้ง loopback ที่มากสุดและ physical ที่มากสุด" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router R8 ไม่ได้ตั้ง Router-ID และไม่มี loopback มี interface: GE0/0/0 = 172.16.1.1 (up), GE0/0/1 = 192.168.5.1 (up), Serial = 10.1.1.1 (up), GE0/0/2 = 200.1.1.1 (shutdown)`,
      q: "Router-ID ที่ OSPF เลือกคือข้อใด?",
      opts: [
        { t: "192.168.5.1", why: "ถูก: ไม่มี loopback → เลือก IP มากที่สุดของ interface ที่ active ซึ่งต้องเป็น 192.168.5.1 (200.1.1.1 ถูก shutdown จึงใช้ไม่ได้)" },
        { t: "200.1.1.1", why: "ผิด: interface นี้ถูก shutdown (inactive) จึงใช้เป็น Router-ID ไม่ได้" },
        { t: "10.1.1.1", why: "ผิด: เป็นค่าน้อยที่สุดในกลุ่ม ไม่ใช่มากที่สุด" },
        { t: "172.16.1.1", why: "ผิด: ไม่ใช่ค่าที่มากที่สุดของ interface ที่ active" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บน Ethernet segment เดียวกัน มี R1 (priority 100, Router-ID 1.1.1.1), R2 (priority 100, Router-ID 2.2.2.2), R3 (priority 1, Router-ID 9.9.9.9), R4 (priority 0, Router-ID 8.8.8.8) เปิด OSPF พร้อมกัน`,
      q: "ผลการเลือก DR/BDR คือข้อใด?",
      opts: [
        { t: "DR = R2, BDR = R1; R3 และ R4 เป็น DRother", why: "ถูก: priority 100 สูงสุด (R1, R2) → Router-ID สูงกว่าชนะ (R2 เป็น DR, R1 เป็น BDR); R4 priority 0 ไม่มีสิทธิ์; R3 เหลือเป็น DRother" },
        { t: "DR = R3 เพราะ Router-ID สูงสุด", why: "ผิด: ต้องดู priority ก่อน Router-ID" },
        { t: "DR = R1, BDR = R2 เพราะ R1 ตั้งต้นก่อน", why: "ผิด: เมื่อ priority เท่ากัน Router-ID สูงกว่าชนะ จึงเป็น R2 ไม่ใช่ R1" },
        { t: "DR = R4 เพราะ priority 0 คือสูงสุด", why: "ผิด: priority 0 หมายถึงไม่มีสิทธิ์เป็น DR/BDR" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `จากข้อก่อนหน้า (DR = R2, BDR = R1) ต่อมามี R5 priority 200 เข้า segment นี้ (เปิด OSPF ทีหลัง) ขณะที่ R2 และ R1 ยังทำงานปกติ`,
      q: "บทบาท DR/BDR เป็นอย่างไร?",
      opts: [
        { t: "R5 เป็น DRother; DR/BDR เดิมไม่ถูกแทน เพราะการเลือกไม่ preempt", why: "ถูก: เมื่อเลือกแล้ว router ที่ priority สูงกว่าเข้ามาภายหลังก็ไม่แทน DR/BDR" },
        { t: "R5 กลายเป็น DR ทันที เพราะ priority 200 สูงสุด", why: "ผิด: OSPF DR election ไม่ preempt" },
        { t: "R5 เป็น BDR แทน R1", why: "ผิด: ไม่มีการแทนเช่นกัน" },
        { t: "R5 เป็น DR และ R2 ลดลงเป็น BDR", why: "ผิด: ไม่มีการสลับบทบาทเมื่อมี router ใหม่เข้ามา (non-preemptive)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Ethernet segment หนึ่งมี router 6 ตัวทำงาน OSPF ผู้ดูแลต้องการประเมินจำนวน adjacency (Full) บน segment นี้ ถ้าทุกตัวต่อ Full กับทุกตัวจะมี 6x5/2 = 15 คู่`,
      q: "เมื่อใช้ DR/BDR (DR 1 ตัว BDR 1 ตัว DRother 4 ตัว) จะมี Full adjacency กี่คู่?",
      opts: [
        { t: "9 คู่", why: "ถูก: DR-BDR 1 คู่ + DR กับ DRother 4 คู่ + BDR กับ DRother 4 คู่ = 9 (สูตร 1 + 2(n-2) = 9); คู่ DRother-DRother 6 คู่ค้างที่ two-way" },
        { t: "15 คู่", why: "ผิด: นั่นคือจำนวนกรณีไม่มี DR/BDR (full mesh)" },
        { t: "5 คู่", why: "ผิด: คิดเฉพาะ DR กับตัวอื่น แต่ BDR ก็ต้องจับคู่ Full กับทุกตัวด้วย" },
        { t: "4 คู่", why: "ผิด: ไม่ครอบคลุม adjacency ของ BDR" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `R1 ตั้งค่า <code>[R1-ospf-1-area-0.0.0.0]network 10.1.4.0 0.0.3.255</code> และมี interface ที่ IP ต่างกัน`,
      q: "เลือกทุก interface ที่ <b>จะรัน OSPF</b> จากคำสั่งนี้",
      opts: [
        { t: "10.1.4.1", ok: true, why: "อยู่ใน 10.1.4.0 - 10.1.7.255 (wildcard 0.0.3.255 = /22)" },
        { t: "10.1.5.1", ok: true, why: "octet 3 = 5 อยู่ในช่วง 4-7" },
        { t: "10.1.7.254", ok: true, why: "octet 3 = 7 ยังอยู่ในช่วง" },
        { t: "10.1.8.1", ok: false, why: "octet 3 = 8 เกินช่วง 4-7" },
        { t: "10.1.3.1", ok: false, why: "octet 3 = 3 ต่ำกว่าช่วง" }
      ]
    },
    {
      type: "choice",
      story: `R1 (Area 0) และ R2 เชื่อมต่อกันตรงด้วย Ethernet R1 ตั้ง <code>area 0</code> ครอบ interface นี้ ส่วน R2 ตั้ง <code>area 1</code> ครอบ interface เดียวกัน ผ่านไปหลายนาที ไม่มี neighbor ขึ้นสถานะ Full และไม่มี route ใหม่`,
      q: "สาเหตุที่เป็นไปได้มากที่สุดคือข้อใด?",
      opts: [
        { t: "area ID ของ interface สองฝั่งไม่ตรงกัน จึงไม่สร้าง neighbor", why: "ถูก: ข้อมูลใน Hello ต้องสอดคล้องกัน (รวม area ID) หนังสือระบุว่า area ID ต่างกันเป็นสาเหตุที่ router เรียนรู้ route ไม่ได้" },
        { t: "OSPF ต้องการ Router-ID ที่เท่ากันทั้งสองฝั่ง", why: "ผิด: Router-ID ต้อง <b>ไม่ซ้ำ</b> ในเครือข่าย" },
        { t: "ต้องตั้ง DR priority เป็น 0", why: "ผิด: ไม่เกี่ยวกับการไม่เกิด neighbor" },
        { t: "Ethernet ไม่รองรับ OSPF", why: "ผิด: Ethernet เป็น BMA และเป็น network type ปกติของ OSPF" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลตั้งค่า OSPF บน R1 เป็น <code>network 192.168.1.0 0.0.0.3</code> แต่ interface ขาออกของ R1 มี IP เป็น 192.168.1.5/30 ผลคือไม่มี neighbor บน link นี้`,
      q: "สาเหตุคืออะไร?",
      opts: [
        { t: "network statement ครอบ 192.168.1.0-.3 เท่านั้น ไม่ครอบ 192.168.1.5 จึงไม่เปิด OSPF บน interface นี้", why: "ถูก: ต้องเป็น network 192.168.1.4 0.0.0.3 (ครอบ .4-.7) หรือใช้ network 192.168.1.5 0.0.0.0" },
        { t: "wildcard 0.0.0.3 ผิดรูปแบบ", why: "ผิด: 0.0.0.3 ถูกรูปแบบ (bit 1 ต่อเนื่องจากขวา) = /30" },
        { t: "ต้องใช้ subnet mask แทน wildcard", why: "ผิด: คำสั่ง network ใช้ wildcard-mask" },
        { t: "interface ต้องเป็น loopback", why: "ผิด: interface จริงรัน OSPF ได้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `R2 (ABR) summarize Area 1 ด้วย <code>abr-summary 40.1.0.0 255.255.0.0 cost 15</code> ส่วน link serial จาก R1 ถึง R2 มี cost 48`,
      q: "R1 จะเห็น route ไป 40.1.0.0/16 ด้วย cost เท่าใด?",
      opts: [
        { t: "63", why: "ถูก: cost ถึง ABR (48) + cost ที่ตั้งใน summary (15) = 63 (เช่นเดียวกับตัวอย่าง 48 + 10 = 58)" },
        { t: "15", why: "ผิด: ต้องบวก cost ของ link จาก R1 ไปถึง ABR ด้วย" },
        { t: "48", why: "ผิด: ไม่รวม cost ที่ตั้งใน summary" },
        { t: "96", why: "ผิด: 96 เป็นค่า cost ของ route ละเอียดก่อน summarize ในตัวอย่างหนังสือ ไม่ใช่ผลจากสูตรนี้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router AR2200 เรียนรู้ route ไปเครือข่ายเดียวกัน (สอง route ที่ destination/mask เหมือนกัน) จาก OSPF (cost 4882) และ RIPv2 (hop 4) นอกจากนี้ยังมี static route ไปปลายทางเดียวกันด้วยค่า preference เริ่มต้น`,
      q: "route ใดอยู่ใน IP routing table?",
      opts: [
        { t: "route จาก OSPF", why: "ถูก: ข้าม protocol เทียบด้วย preference: OSPF 10 &lt; static 60 &lt; RIP 100; cost 4882 กับ hop 4 เปรียบเทียบกันไม่ได้" },
        { t: "route จาก RIPv2 เพราะ hop 4 น้อยกว่า cost 4882", why: "ผิด: cost คนละ protocol เทียบกันไม่ได้" },
        { t: "static route เพราะตั้งเอง", why: "ผิด: preference 60 แย่กว่า OSPF (10)" },
        { t: "ทั้ง OSPF และ RIPv2 เพราะ cost ต่างกัน", why: "ผิด: มีเพียง route เดียวที่ชนะ preference" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ตรวจสอบความเข้าใจเรื่อง LSA และบทบาท router ใน OSPF multi-area`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Router-LSA (type 1) ถูกสร้างโดยทุก router และ flood ได้ถึงขอบ ABR", ok: true, why: "ถูก: type 1 อยู่ภายใน area" },
        { t: "Network-LSA (type 2) ถูกสร้างโดย DR และไม่มีใน P2P network", ok: true, why: "ถูก: P2P ไม่มี DR จึงไม่มี LSA 2" },
        { t: "Network-summary-LSA (type 3) ถูกสร้างโดย ABR", ok: true, why: "ถูก: ABR แปลง LSA 1/2 ของ area หนึ่งเป็น LSA 3 ส่งไป area อื่น" },
        { t: "ASBR เชื่อม backbone กับ non-backbone area", ok: false, why: "ผิด: นั่นคือ ABR; ASBR เชื่อมกับ AS อื่น" },
        { t: "ทุก area ต้องต่อกับ Area 0 (physical หรือ logical)", ok: true, why: "ถูก: backbone เป็นศูนย์กลางของทุก area" }
      ]
    },
    {
      type: "blank",
      story: `สถานะของ OSPF neighbor บน link ระหว่าง R1 กับ R2`,
      text: `router ส่ง Hello ทุก {1} วินาที; ถ้าไม่ได้รับ Hello จาก neighbor นาน {2} วินาทีถือว่า neighbor ใช้ไม่ได้; เมื่อ LSDB ของสองฝั่งตรงกันแล้ว neighbor จะอยู่ใน state {3}`,
      blanks: [
        { opts: ["5", "10", "30", "40"], ans: 1, why: "Hello interval = 10 วินาที" },
        { opts: ["20", "30", "40", "60"], ans: 2, why: "ไม่ได้รับ Hello 40 วินาที (4 เท่า) ถือว่า neighbor down" },
        { opts: ["Init", "Two-way", "Loading", "Full"], ans: 3, why: "Full = LSDB ซิงก์ครบ" }
      ]
    },
    {
      type: "blank",
      story: `การเลือก DR บน Ethernet segment`,
      text: `DR election ดู {1} ก่อน ถ้าเท่ากันดู {2}; router ที่มีค่า {3} จะไม่มีสิทธิ์เป็นทั้ง DR และ BDR`,
      blanks: [
        { opts: ["priority", "Router-ID", "cost", "Area ID"], ans: 0, why: "ตรวจ priority ที่สูงสุดก่อน" },
        { opts: ["priority", "Router-ID", "cost", "จำนวน interface"], ans: 1, why: "เท่ากันใช้ Router-ID ที่มากกว่า" },
        { opts: ["priority 0", "priority 1", "Router-ID 0.0.0.0", "cost 0"], ans: 0, why: "priority 0 = ไม่มีสิทธิ์ (ต้อง priority &gt; 0)" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ชนิด OSPF message กับหน้าที่",
      pairs: [
        ["Hello (type 1)", "ค้นหาและรักษา neighbor ส่งเป็นช่วง ๆ ด้วย multicast"],
        ["Database Description (type 2)", "ส่งสรุปรายการใน LSDB ให้ neighbor"],
        ["Link State Request (type 3)", "ขอรายละเอียด link state ที่ตนยังขาด"],
        ["Link State Update (type 4)", "ส่งรายละเอียด link state"],
        ["Link State Acknowledgement (type 5)", "ยืนยันการได้รับ LSU"]
      ],
      why: "ลำดับการทำงาน: Hello → DD (สรุป) → LSR (ขอ) → LSU (ส่ง) → LSAck (ยืนยัน)"
    },
    {
      type: "match",
      q: "จับคู่ค่าที่ตั้ง/พบ กับความหมาย",
      pairs: [
        ["network 172.16.1.0 0.0.0.255", "ครอบ interface ที่มี IP 172.16.1.0 - 172.16.1.255 (/24)"],
        ["network 0.0.0.0 255.255.255.255", "ครอบทุก interface ของ router"],
        ["Area 0.0.0.0", "backbone area ที่ทุก area ต้องต่อถึง"],
        ["Inter-area (ใน display ospf routing)", "route ที่เรียนรู้จาก area อื่นผ่าน ABR"],
        ["Stub (ใน display ospf routing)", "network ที่ต่อตรงกับ router ใน area เดียวกัน"]
      ],
      why: "wildcard เป็นตรงข้ามของ mask; Area 0 เป็นศูนย์กลาง; Inter-area มาจาก LSA 3 ของ ABR"
    }
  ]
});
