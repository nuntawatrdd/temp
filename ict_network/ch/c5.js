IOT.reg({
  id: "c5",
  title: "IP Routing Fundamentals",
  th: "routing table, direct/static/dynamic route, preference กับ cost, static route และ floating route, route summarization, longest prefix match, default route และ TTL",
  summary: `
<ul>
<li><b>Router</b> ส่งต่อ packet ตาม <b>routing table</b> (มีเฉพาะ host, router, L3 device; L2 switch ไม่มี) แต่ละ entry มี Destination/Mask, Proto, Pre, Cost, Flags, NextHop, Interface</li>
<li><b>แหล่ง route 3 แบบ</b>: Direct (เห็นเอง เมื่อ interface UP + มี IP, cost 0), Static (ตั้งมือ), Dynamic (routing protocol เช่น RIP, OSPF)</li>
<li><b>Preference (ค่าน้อย = ดีกว่า)</b>: Direct 0, OSPF 10, IS-IS 15, Static 60, RIP 100, BGP 255; ใช้เปรียบเทียบ <b>ต่างแหล่ง</b> ของ destination/mask เดียวกัน</li>
<li><b>Cost</b> เปรียบเทียบได้เฉพาะ <b>ภายใน protocol เดียวกัน</b> (RIP = hop count; OSPF = bandwidth); cost เท่ากัน = equal-cost route, load balance</li>
<li><b>ลำดับตัดสิน</b>: (1) แต่ละ protocol เลือก cost ต่ำสุด (2) เทียบ preference ข้าม protocol (3) ตอน forward ใช้ <b>longest prefix match</b></li>
<li><b>Unobstructed network</b>: packet ไปถึงและ <b>ตอบกลับ</b> ได้ = ทุก router ตลอดทางต้องมี route ไปและกลับ</li>
<li><b>Static route</b>: <code>ip route-static ip-address {mask | mask-length} {next-hop | interface [next-hop]} [preference n]</code>; next hop = interface ของ router ที่ต่อตรงกับเรา; ลบ: <code>undo ip route-static</code></li>
<li><b>Ethernet</b> ควรระบุ next hop IP; <b>P2P</b> ระบุแค่ outgoing interface ได้; destination ต้องเป็น network address (host bit = 0); host route ใช้ /32</li>
<li><b>Floating static route</b> = backup: ตั้ง preference ของ backup ให้ <b>สูงกว่า</b> (เช่น 100) ของ primary (60); เมื่อ primary down backup ถูกนำเข้า routing table</li>
<li><b>Route summarization</b>: รวม segment ติดกันเป็น route เดียว (2<sup>n</sup> segment, เลื่อน mask ซ้าย n bit, ต้องตรงขอบ) ลด routing table; ต้องวางแผน address ต่อเนื่อง</li>
<li><b>Longest Prefix Match</b>: เลือก entry ที่ prefix ตรงยาวที่สุด (mask ยาวสุด); ใช้ทำ route exception เช่น 172.16.10.0/24 ใน 172.16.0.0/16</li>
<li><b>Default route</b> = <code>0.0.0.0/0</code> (<code>ip route-static 0.0.0.0 0.0.0.0 next-hop</code>) prefix สั้นที่สุด ใช้เมื่อไม่มี entry อื่นตรง; ไม่มี default และไม่ match = <b>discard</b></li>
<li><b>หลักวางแผน</b>: router ฝั่ง backbone ใช้ summarization, router ปลายเครือข่าย (stub) ใช้ default route</li>
<li><b>Default route ผิดที่ทำให้ loop</b>: packet วน จน <b>TTL = 0</b> แล้ว router ทิ้งและส่ง <b>ICMP time exceeded</b> กลับ (TTL ลดทีละ 1 ต่อ router; ค่าแนะนำ 64, สูงสุด 255)</li>
<li><b>Host</b>: ตั้ง gateway = เพิ่ม default route; ดู routing table ด้วย <code>route print</code> / <code>netstat -r</code>; ห้ามตั้ง default 2 เส้นไป next hop ต่างกัน (กลายเป็น equal-cost)</li>
</ul>`,
  sections: [
    {
      t: "Route และ Routing Table",
      ref: "หน้า 168-170",
      html: `
<p><b>Route</b> คือเส้นทางที่ packet เดินจากอุปกรณ์หนึ่งไปยังปลายทาง (เป็นศัพท์ระดับ network layer) <b>Router</b> (หรือ L3 device) เลือกเส้นทางโดยอ้างอิง <b>routing table</b> ซึ่งแต่ละบรรทัดเรียกว่า routing entry routing table มีเฉพาะใน host และ router/L3 device <b>ไม่มีใน L2 switch</b></p>
<figure><img src="i/p169_1.webp" alt="PC1 ส่งไป PC2 ผ่าน R1 R2 R3 แต่ละตัวดู routing table เพื่อหา next hop" loading="lazy"><figcaption>Fig. 5.1 IP routing (แต่ละ router ดู routing table ไปยัง 12.1.1.0/24 แล้วส่งต่อ next hop ถัดไป)</figcaption></figure>
<p>ตัวอย่าง PC1 (11.1.1.2) ส่งถึง PC2 (12.1.1.2): R1 พบ route 12.1.1.0/24 next hop 172.16.0.2 (ออก GE0/0/0) → R2 พบ next hop 172.16.1.2 (ออก GE0/0/1) → R3 พบ next hop 12.1.1.1 ซึ่งเป็น address ของ interface ตัวเอง (ต่อตรงกับเครือข่ายปลายทาง) → ส่งถึง PC2 ขาตอบกลับก็ต้องผ่าน routing table ของทุกตัวอีกครั้ง</p>
<ul>
<li>ถ้า next hop ของ entry เป็น IP ของ interface ขาออกเอง = interface นั้น <b>ต่อตรงกับ network ปลายทาง</b></li>
<li>host ของ next hop ต้องอยู่ใน <b>Layer 2 broadcast domain เดียวกัน</b> กับ interface ขาออก</li>
</ul>
<h4>อ่าน display ip routing-table</h4>
<pre><code>[AR1]display ip routing-table
Destination/Mask    Proto   Pre  Cost  Flags NextHop       Interface
172.16.0.0/24       Direct  0    0     D     172.16.0.1     Serial2/0/0
172.16.1.0/24       OSPF    10   96    D     172.16.0.2     Serial2/0/0
192.168.0.0/24      Direct  0    0     D     192.168.0.1    Vlanif1
192.168.10.0/24     Static  60   0     RD    172.16.0.2     Serial2/0/0</code></pre>
<table>
<tr><th>Field</th><th>ความหมาย</th></tr>
<tr><td>Destination/Mask</td><td>เครือข่ายปลายทางและ mask</td></tr>
<tr><td>Proto</td><td>แหล่งที่มาของ route: Direct (ต่อตรง, ค้นพบเอง), Static (ตั้งมือ), OSPF (dynamic)</td></tr>
<tr><td>Pre</td><td>Preference ของแหล่ง route (ค่าน้อยดีกว่า)</td></tr>
<tr><td>Cost</td><td>ต้นทุนของเส้นทาง; เลือกเส้นที่ cost ต่ำสุด</td></tr>
<tr><td>Flags</td><td>R = iterative (relay) route, D = ถูกส่งลง FIB</td></tr>
<tr><td>NextHop</td><td>router ถัดไปที่ใกล้ที่สุดบนเส้นทาง</td></tr>
<tr><td>Interface</td><td>interface ขาออกไปยัง next hop</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Routing table มีเฉพาะ router/L3 device และ host (ไม่มีใน L2 switch)</li>
<li>Field หลัก: Destination/Mask, Proto, Pre, Cost, NextHop, Interface</li>
<li>ดู routing table บน Huawei: <code>display ip routing-table</code></li>
</ul></div>`
    },
    {
      t: "แหล่งที่มาของ Route: Direct, Static, Dynamic",
      ref: "หน้า 170-173",
      html: `
<h4>1) Direct route</h4>
<p>เมื่อ interface ของ router อยู่ในสถานะ <b>UP</b> และมี IP/mask router จะใส่ network ของ interface นั้นลง routing table เอง Proto = Direct, Cost = <b>0</b> เสมอ, next hop = IP ของ interface ขาออกเอง</p>
<figure><img src="i/p171_1.webp" alt="R1 ค้นพบ direct route 11.1.1.0/24 จาก interface GE0/0/1" loading="lazy"><figcaption>Fig. 5.2 Direct routes (R1 สร้าง 11.1.1.0/24 ออก GE0/0/1 และ 172.16.0.0/24 ออก GE0/0/0 เอง)</figcaption></figure>
<h4>2) Static route</h4>
<p>เครือข่ายที่ไม่ได้ต่อตรง ผู้ดูแลต้องใส่เอง เหมาะกับเครือข่ายเล็กหรือค่อนข้างคงที่ ข้อควรระวังคือ <b>next hop</b> ต้องเป็น interface ของ router ที่ <b>ต่อตรงกับเรา</b> ไม่ใช่ router ที่อยู่ไกลออกไป (ผู้เริ่มต้นสับสนบ่อย)</p>
<figure><img src="i/p172_1.webp" alt="สี่ network สาม router ต้องเพิ่ม static route ให้ network ที่ไม่ได้ต่อตรง" loading="lazy"><figcaption>Fig. 5.3 Configure static routes (R1 ไป 12.1.1.0/24 ต้องใช้ next hop 172.16.0.2 ของ R2 ไม่ใช่ของ R3)</figcaption></figure>
<h4>3) Dynamic route</h4>
<p>ได้จาก <b>routing protocol</b> (RIP, OSPF ฯลฯ) เหมาะกับเครือข่ายใหญ่ ปรับเส้นทางที่ดีที่สุดเองเมื่อ topology เปลี่ยน; static route ไม่ปรับตัว ถ้า link เสียหรือโครงสร้างเปลี่ยนต้องแก้มือ "routing protocol" กับ "dynamic routing protocol" คือสิ่งเดียวกัน</p>
<p>router เดียวรันได้หลาย protocol พร้อมกัน แต่ละ protocol มีตาราง route ของตนเอง (RIP routing table, OSPF routing table) แล้ว route ที่ดีที่สุดจากแต่ละตารางจะถูกนำไปเปรียบเทียบ preference เพื่อเข้า <b>IP routing table</b> ซึ่งเป็นตารางเดียวที่ใช้ forward จริง</p>
<figure><img src="i/p172_2.webp" alt="R2 รัน RIP และ OSPF ได้ route ไป 24.6.10.0/24 ทั้งสอง OSPF ถูกเลือกเข้า IP routing table" loading="lazy"><figcaption>Fig. 5.4 Dynamic route preference (route จาก OSPF ชนะ RIP เพราะ preference สูงกว่า)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>Direct: ค้นพบเอง เมื่อ interface UP + มี IP, cost = 0</li>
<li>Static: ตั้งมือ ไม่ปรับตัวเมื่อ network เปลี่ยน เหมาะเครือข่ายเล็ก/คงที่</li>
<li>Dynamic: ได้จาก routing protocol ปรับตัวได้ เหมาะเครือข่ายใหญ่</li>
<li>Next hop ของ static route = interface ของ router ที่ <b>อยู่ติดกัน</b></li>
</ul></div>`
    },
    {
      t: "Route Preference และ Route Cost",
      ref: "หน้า 173-175",
      html: `
<h4>Preference: เลือกข้ามแหล่งที่มา</h4>
<p>ถ้าอุปกรณ์ได้ route ไปปลายทาง/mask เดียวกัน จากหลายแหล่ง (RIP, OSPF, ตั้ง static) ตัวที่ <b>preference ต่ำสุด</b> (ค่าน้อย = ดีกว่า) ชนะและเข้า IP routing table ที่เหลือ inactive และไม่แสดงใน routing table ค่า preference มีค่า 0-255 และเปลี่ยนได้</p>
<table>
<tr><th>แหล่ง route</th><th>Default preference (Huawei AR)</th></tr>
<tr><td>Direct</td><td>0</td></tr>
<tr><td>OSPF</td><td>10</td></tr>
<tr><td>IS-IS</td><td>15</td></tr>
<tr><td>Static</td><td>60</td></tr>
<tr><td>RIP</td><td>100</td></tr>
<tr><td>BGP</td><td>255</td></tr>
</table>
<p>ลำดับจากดีสุดไปแย่สุด: <b>Direct &gt; OSPF &gt; IS-IS &gt; Static &gt; RIP &gt; BGP</b></p>
<h4>Cost: เลือกภายใน protocol เดียวกัน</h4>
<p>cost คือค่าที่ต้อง "จ่าย" เพื่อไปถึงปลายทาง นิยามต่างกันตาม protocol เช่น <b>RIP ใช้ hop count</b> (จำนวน router ที่ต้องผ่าน)</p>
<figure><img src="i/p174_2.webp" alt="R1 ไป 2.0.0.0/8 มีสองเส้นทาง hop count 3 กับ 2 เลือกเส้นที่ 2" loading="lazy"><figcaption>Fig. 5.5 RIP protocol uses "hop count" as the cost of the route (เส้นทางผ่าน R4, R5 มี cost 2 ต่ำกว่าเส้นผ่าน R2, R3, R5 ที่ cost 3)</figcaption></figure>
<p>ถ้า cost <b>เท่ากัน</b> เรียกว่า <b>equal-cost route</b> ทั้งสองเส้นเข้า routing table และ traffic ถูกแบ่งใช้ทั้งสองเส้น (<b>load balance</b>)</p>
<figure><img src="i/p175_1.webp" alt="R1 ไป 2.0.0.0/8 สองเส้นทาง cost เท่ากัน" loading="lazy"><figcaption>Fig. 5.6 Equal-cost routes (load balance)</figcaption></figure>
<div class="warn"><b>ระวัง</b> cost ของคนละ protocol เปรียบเทียบกันไม่ได้และไม่มีสูตรแปลง (RIP hop 4 กับ OSPF cost 4882 ไม่ใช่การเทียบ 4 กับ 4882) ข้าม protocol ใช้ <b>preference</b> ตัดสิน</div>
<h4>ขั้นตอนเลือก route เข้า IP routing table</h4>
<ol>
<li>แต่ละ routing protocol เทียบ cost แล้วเก็บเส้นที่ cost ต่ำสุดไว้ในตารางของตัวเอง</li>
<li>ตัวแทนของทุก protocol (รวม direct และ static) ถูกเทียบด้วย preference ตัวที่ค่าน้อยสุดชนะเข้า IP routing table</li>
<li>ตอน forward packet ใช้ IP routing table ด้วย <b>longest prefix match</b> (หัวข้อ route summarization)</li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>Preference: Direct 0, OSPF 10, IS-IS 15, Static 60, RIP 100, BGP 255 (ค่าน้อยดีกว่า)</li>
<li>Cost เทียบได้เฉพาะ protocol เดียวกัน; RIP = hop count</li>
<li>Cost เท่ากัน = equal-cost, load balance</li>
</ul></div>`
    },
    {
      t: "เงื่อนไขของเครือข่ายที่ติดต่อกันได้ (Unobstructed Network)",
      ref: "หน้า 175-176",
      html: `
<p>เครือข่ายจะ "ติด" เมื่อ <b>packet ส่งไปถึงและตอบกลับมาได้</b> นี่คือพื้นฐานของการ troubleshoot</p>
<figure><img src="i/p176_1.webp" alt="Computer A กับ B ต้องมี route ทั้งไปและกลับบน router ตลอดทาง" loading="lazy"><figcaption>Fig. 5.7 Conditions for an unobstructed network (route ไป 192.168.1.0/24 และ route กลับ 192.168.0.0/24 ต้องมีครบ)</figcaption></figure>
<ul>
<li>A (192.168.0.0/24) ถึง B (192.168.1.0/24): ทุก router ตลอดทางต้องมี route ไป <b>192.168.1.0/24</b></li>
<li>B ตอบกลับ A: ทุก router ตลอดทางต้องมี route ไป <b>192.168.0.0/24</b></li>
</ul>
<h4>ลำดับตรวจเมื่อ ping ไม่ติด</h4>
<ol>
<li>เครื่องต้นทางและปลายทางตั้ง IP, mask, gateway ถูกต้องหรือไม่</li>
<li>routing table ของ router แต่ละตัวบนเส้นทาง <b>ขาไป</b> มี route ไปปลายทางหรือไม่</li>
<li>routing table ของ router แต่ละตัวบนเส้นทาง <b>ขากลับ</b> มี route ไปต้นทางหรือไม่</li>
</ol>
<div class="warn"><b>ระวัง</b> "Request timeout" ไม่ได้มาจาก routing เสมอไป อาจเกิดจากปลายทางเปิด firewall หรือปิดเครื่องอยู่</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>ติดต่อได้ = ไปถึง + ตอบกลับได้; ต้องตรวจ route ทั้ง <b>ขาไปและขากลับ</b></li>
<li>ตรวจตามลำดับ: IP/mask/gateway ของ host → route ขาไป → route ขากลับ</li>
</ul></div>`
    },
    {
      t: "Static Routing: คำสั่งและตัวอย่าง Configuration",
      ref: "หน้า 176-181",
      html: `
<h4>ลักษณะของ static routing</h4>
<ul>
<li><b>ข้อดี</b>: ปลอดภัย/เป็นความลับ (ไม่แลกเปลี่ยน routing table จึงไม่เปิดเผย topology), ไม่มี update traffic ไม่กินแบนด์วิดท์</li>
<li><b>ข้อเสีย</b>: ไม่เหมาะกับเครือข่ายใหญ่/ซับซ้อน ผู้ดูแลต้องรู้ topology ทั้งหมด เมื่อ topology หรือ link เปลี่ยนต้องแก้มาก และ <b>ไม่ reroute อัตโนมัติ</b> เมื่อ link ล่ม</li>
</ul>
<h4>หลักการ: ทุก router ต้องมี route ไปทุก network</h4>
<p>Direct route ได้เอง ส่วน network ที่ไม่ได้ต่อตรงต้องเพิ่มเอง</p>
<figure><img src="i/p177_1.webp" alt="สี่ network A B C D กับ router AR1 AR2 AR3 พร้อม address" loading="lazy"><figcaption>Fig. 5.8 Commands for adding static routes (AR1 ต่อตรงกับ A และ B ต้องเพิ่ม C และ D)</figcaption></figure>
<h4>รูปแบบคำสั่ง (system view)</h4>
<pre><code>ip route-static ip-address { mask | mask-length } { nexthop-address | interface-type interface-number [ nexthop-address ] } [ preference preference ]</code></pre>
<ul>
<li>ip-address mask = destination/mask; nexthop-address = IP next hop; interface = ขาออก; preference = ค่า preference (1-255, ค่าเริ่มต้น 60)</li>
<li>แบบ <b>point-to-point</b> (Serial/PPP): ระบุ outgoing interface ได้เลย ไม่ต้องมี next hop เพราะปลายอีกฝั่งมีตัวเดียว</li>
<li>แบบ <b>Ethernet</b>: ควรระบุ <b>next hop address</b> เพราะ Ethernet มีหลายอุปกรณ์ ถ้าระบุแค่ interface จะไม่รู้ว่า MAC ปลายทางของ hop ถัดไปคือเครื่องไหน</li>
</ul>
<figure><img src="i/p178_1.webp" alt="ตัวอย่างระบุ exit interface Serial 2/0/0 บน AR2 สำหรับ point-to-point link" loading="lazy"><figcaption>Fig. 5.9 Configure exit information for point to point link routing</figcaption></figure>
<figure><img src="i/p178_2.webp" alt="router ต่อกันด้วย Ethernet ควรระบุ next hop address" loading="lazy"><figcaption>Fig. 5.10 It is suggested to add the next hop address for Ethernet interface</figcaption></figure>
<h4>Destination ต้องเป็น network address</h4>
<pre><code>[AR1]ip route-static 172.16.1.2 24 172.16.0.2
Info: The destination address and mask of the configured static
route mismatched, and the static route 172.16.1.0/24 was generated.

[AR1]ip route-static 172.16.1.2 32 172.16.0.2   -- host route (/32)</code></pre>
<p>172.16.1.2/24 ไม่ใช่ network (host bit ไม่เป็น 0) ระบบจะแก้เป็น 172.16.1.0/24 ให้ ถ้าต้องการ route ไป <b>เครื่องเดียว</b> ใช้ mask /32 (255.255.255.255)</p>
<h4>ตัวอย่าง topology 4 network</h4>
<figure><img src="i/p179_1.webp" alt="PC1 AR1 AR2 AR3 PC2 สี่ network" loading="lazy"><figcaption>Fig. 5.11 Static routing network topology</figcaption></figure>
<p>AR1 ต่อตรงกับ 192.168.0.0/24 และ 172.16.0.0/24 (ลง routing table เอง) ต้องเพิ่ม 172.16.1.0/24 และ 192.168.1.0/24</p>
<pre><code>[AR1]ip route-static 172.16.1.0 24 172.16.0.2          -- ระบุ next hop
[AR1]ip route-static 192.168.1.0 255.255.255.0 Serial 2/0/0   -- ระบุ interface
[AR1]display ip routing-table protocol static          -- ดูเฉพาะ static (Active / Inactive)

[AR2]ip route-static 192.168.0.0 24 172.16.0.1
[AR2]ip route-static 192.168.1.0 24 172.16.1.2

[AR3]ip route-static 192.168.0.0 24 172.16.1.1
[AR3]ip route-static 172.16.0.0 24 172.16.1.1

[AR2]undo ip route-static 192.168.1.0 24     -- ลบ route (ไม่ต้องระบุ next hop)</code></pre>
<div class="must"><b>ต้องจำ</b><ul>
<li>คำสั่ง: <code>ip route-static</code> (ลบด้วย <code>undo ip route-static</code>)</li>
<li>Ethernet: ระบุ next hop address; P2P: ระบุ exit interface ได้</li>
<li>destination ต้องเป็น network address (host bit = 0); host route ใช้ /32</li>
<li>ดูเฉพาะ static: <code>display ip routing-table protocol static</code></li>
</ul></div>`
    },
    {
      t: "Floating Static Route (Backup Route)",
      ref: "หน้า 181-183",
      html: `
<p><b>Floating static route</b> = static route สำรอง ใช้เมื่อมีหลายเส้นทางไปเครือข่ายเดียวกัน กำหนด primary กับ backup ด้วยการตั้ง <b>preference ต่างกัน</b> ปกติเฉพาะ route ที่ preference ต่ำสุด (ดีที่สุด) อยู่ใน routing table เมื่อ primary ใช้ไม่ได้ route สำรองจึงถูกนำเข้าแทนและ packet ไปทางสำรอง</p>
<figure><img src="i/p181_1.webp" alt="AR1 ไป AR3 ตรง เป็นทางหลัก ทางสำรองคือ AR1 ไป AR2 ไป AR3" loading="lazy"><figcaption>Fig. 5.12 Alternate path (ทางหลัก AR1 ไป AR3; ทางสำรอง AR1 ไป AR2 ไป AR3)</figcaption></figure>
<pre><code>[AR1]ip route-static 192.168.1.0 24 172.16.2.2                 -- primary, preference 60 (default)
[AR1]ip route-static 192.168.1.0 24 172.16.0.2 preference 100  -- backup

[AR3]ip route-static 192.168.0.0 24 172.16.2.1
[AR3]ip route-static 192.168.0.0 24 172.16.1.1 preference 100</code></pre>
<ul>
<li>บน AR1 ใน <code>display ip routing-table</code> เห็นเฉพาะ route หลัก (Static 60 ผ่าน GE0/0/1)</li>
<li><code>display ip routing-table protocol static</code> แสดง <b>Active</b> (เข้า IP routing table) = route Pre 60 และ <b>Inactive</b> (ไม่เข้า) = route Pre 100</li>
<li>เมื่อ <code>shutdown</code> interface ของทางหลัก route Pre 100 ผ่าน GE0/0/0 จึงโผล่ใน routing table</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Backup ต้องมี preference <b>มากกว่า</b> (ค่ามากกว่า = ด้อยกว่า) ของ primary เช่น 100 เทียบกับ 60</li>
<li>Active = อยู่ใน IP routing table, Inactive = ไม่อยู่</li>
<li>ต้องตั้งทั้ง 2 ทิศ (ไปและกลับ) เพื่อให้ network ยังติดเมื่อสลับเส้น</li>
</ul></div>
<div class="warn"><b>ระวัง</b> ถ้าตั้ง backup ให้ preference น้อยกว่า 60 (เช่น 40) route "สำรอง" จะกลายเป็น route หลักทันที (ค่าเริ่มต้นของ static คือ 60 และ direct คือ 0)</div>`
    },
    {
      t: "Route Summarization, Longest Prefix Match และ CIDR",
      ref: "หน้า 183-189",
      html: `
<p>routing table ของ Internet ถ้าใส่ทุก network จะใหญ่มาก และการค้นตารางต่อ packet ทำให้ delay เพิ่ม ถ้าจัด address ต่อเนื่องให้กับพื้นที่ที่อยู่ติดกัน จะ <b>รวมหลาย network เป็น route เดียว</b> ที่ขอบเครือข่ายได้ เรียกว่า <b>route summarization</b> (ใช้หลักเดียวกับการรวม segment ในบทที่ 4)</p>
<h4>ตัวอย่าง Beijing กับ Shijiazhuang</h4>
<figure><img src="i/p184_1.webp" alt="Beijing ใช้ 192.168.0.0/24 ถึง 192.168.255.0/24 และ Shijiazhuang ใช้ 172.16.0.0/24 ถึง 172.16.255.0/24" loading="lazy"><figcaption>Fig. 5.13 Address planning (วางแผน address ต่อเนื่องในแต่ละเมือง)</figcaption></figure>
<ul>
<li>Shijiazhuang ใช้ 172.16.0.0/24 ... 172.16.255.0/24 (256 network) รวมเป็น <b>172.16.0.0/16</b> route เดียว แทน 256 route</li>
<li>Beijing ใช้ 192.168.0.0/24 ... 192.168.255.0/24 รวมเป็น <b>192.168.0.0/16</b></li>
<li>เลื่อน mask ซ้าย 8 bit = รวม 2<sup>8</sup> = 256 network</li>
</ul>
<figure><img src="i/p185_1.webp" alt="route summarization ทำได้หลังวางแผน address เหลือ route เดียวต่อฝั่ง" loading="lazy"><figcaption>Fig. 5.14 Route summarization can be performed after address planning (R4 และ R5 มีแค่ route เดียวไปอีกเมือง)</figcaption></figure>
<figure><img src="i/p185_2.webp" alt="ถ้าใช้ 172.0.0.0/16 ถึง 172.255.0.0/16 รวมเป็น 172.0.0.0/8" loading="lazy"><figcaption>Fig. 5.15 Route summarization (ยิ่ง prefix สั้น ยิ่งรวมได้มาก เช่น 172.0.0.0/8)</figcaption></figure>
<p><b>กฎ</b>: ยิ่งจำนวน network bit น้อย (จำนวน 1 ใน mask น้อย) ยิ่ง summarize ได้ครอบคลุมมาก</p>
<h4>Longest Prefix Match (LPM)</h4>
<p>entry ใน routing table อาจซ้อนทับกัน destination เดียวอาจ match หลาย entry router เทียบ destination IP ทีละ bit และเลือก entry ที่ <b>match ยาวที่สุด</b> (mask ยาวสุด) นี่คือกลไกที่เกือบทุก router ใช้โดยปริยาย</p>
<figure><img src="i/p186_1.webp" alt="Beijing ใช้ 172.16.10.0/24 เป็นข้อยกเว้นภายใน 172.16.0.0/16 ของ Shijiazhuang" loading="lazy"><figcaption>Fig. 5.16 Route summarization exception (route 172.16.0.0/16 ไป R2 กับ route ข้อยกเว้น 172.16.10.0/24)</figcaption></figure>
<p>ถ้ามี network ข้อยกเว้นอยู่ในก้อนที่ summarize (เช่น 172.16.10.0/24 อยู่ใน Beijing) ยังใช้ summary route ได้ แต่ <b>ต้องเพิ่ม route เฉพาะ</b> ให้ข้อยกเว้น packet ไป 172.16.10.2 match ทั้งสอง entry แต่ router เลือก /24 ที่เจาะจงกว่า</p>
<pre><code>[R1]ip route-static 172.0.0.0      255.0.0.0       10.0.0.2   -- Route 1 (/8)
[R1]ip route-static 172.16.0.0     255.255.0.0     10.0.1.2   -- Route 2 (/16)
[R1]ip route-static 172.16.10.0    255.255.255.0   10.0.3.2   -- Route 3 (/24)
[R1]ip route-static 172.16.10.10   255.255.255.255 10.0.4.2   -- Route 4 (/32)</code></pre>
<table>
<tr><th>Destination ของ packet</th><th>Route ที่ใช้</th><th>เหตุผล</th></tr>
<tr><td>172.16.10.10</td><td>Route 4</td><td>/32 ตรงเป๊ะ</td></tr>
<tr><td>172.16.10.12</td><td>Route 3</td><td>/24 ตรงยาวสุดที่ match (ไม่ตรง /32)</td></tr>
<tr><td>172.16.50.1</td><td>Route 2</td><td>match แค่ /16 และ /8, เลือก /16</td></tr>
<tr><td>172.18.17.12</td><td>Route 1</td><td>match แค่ /8</td></tr>
</table>
<h4>CIDR</h4>
<p>ตัวอย่างข้างบนใช้การเลื่อน 8 bit เพื่อให้เข้าใจง่าย แต่ <b>CIDR (Classless Inter-Domain Routing)</b> ใช้ network ID ความยาวผันแปรแทน 8/16/24 bit ของ class A/B/C จึงเลื่อน mask ซ้าย 1 bit รวม 2 segment, 2 bit รวม 4, 3 bit รวม 8 หรือ n bit รวม 2<sup>n</sup> segment</p>
<figure><img src="i/p188_1.webp" alt="Area A รวม 4 Class C เป็น 192.168.16.0/22, Area B รวม 2 segment เป็น 10.7.78.0/23" loading="lazy"><figcaption>Fig. 5.17 Simplify routing table using CIDR (192.168.16.0/22 จาก 4 /24; 10.7.78.0/23 จาก 2 /24)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>Summarization ต้องวางแผน address ให้ต่อเนื่อง และ block ตรงขอบ (เลข network แรกหารด้วย 2<sup>n</sup> ลงตัว)</li>
<li>LPM: เลือก entry ที่ prefix ยาวที่สุดเสมอ; ใช้ทำ exception route</li>
<li>CIDR: เลื่อน mask ซ้าย n bit รวม 2<sup>n</sup> network</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> LPM ใช้ตัดสินใจตอน <b>forward</b> ส่วน preference ใช้ตัดสินระหว่างแหล่ง route ของ <b>destination/mask เดียวกัน</b> สองเรื่องนี้ไม่ใช่เรื่องเดียวกัน</div>`
    },
    {
      t: "Default Route และการลดขนาด Routing Table",
      ref: "หน้า 188-192",
      html: `
<h4>Default route คืออะไร</h4>
<p>default route เป็น static route พิเศษ ใช้เมื่อ <b>ไม่มี entry ใดตรง</b> กับ destination ถ้าไม่มี default route packet ที่ไม่ match อะไรเลยจะ <b>ถูกทิ้ง</b></p>
<p>ลองเรียงจากเล็กไปใหญ่: /24 (256 address), /16, /8 ยิ่ง mask สั้น ยิ่งครอบ address มาก ถ้า mask เป็น <b>0.0.0.0 (/0)</b> host bit ทั้ง 32 bit ครอบ <b>ทุก address</b> จึงเป็น network ใหญ่ที่สุดในโลก</p>
<pre><code>[R1]ip route-static 0.0.0.0 0.0.0.0 10.0.0.2    -- default route (0.0.0.0/0)</code></pre>
<p>เพราะ prefix สั้นที่สุด (0 bit) ตามหลัก longest prefix match มันจึงถูกเลือกเป็น <b>ตัวสุดท้าย</b> เมื่อไม่มี entry ที่เจาะจงกว่า</p>
<h4>ตัวอย่างองค์กร: intranet 4 router และ 6 network</h4>
<p>intranet มี router A, B, C, D กับ network 10.1.0.0/24 - 10.6.0.0/24 (10.6.0.0/24 ต่อออก Internet) ต้องให้ทุก network คุยกันและออก Internet ได้</p>
<figure><img src="i/p190_1.webp" alt="สี่ router A B C D และหกเครือข่าย ใช้ default route ลด routing table" loading="lazy"><figcaption>Fig. 5.18 Simplify routing tables by default route</figcaption></figure>
<ul>
<li>Router B และ D (router ปลายทาง ต่อ 2 network): ส่งทุกอย่างไป C เหมือนกันหมด ใส่ <b>default route เดียว</b></li>
<li>Router C: ใส่ route เฉพาะ 10.1.0.0/24 และ 10.4.0.0/24 แล้วใช้ default ไป A สำหรับที่เหลือ/Internet</li>
<li>Router A: ใส่ route ไป intranet แยกกัน และ default route ไป Internet</li>
</ul>
<figure><img src="i/p191_1.webp" alt="Router A รวม intranet เป็น 10.0.0.0/8 และใช้ default route" loading="lazy"><figcaption>Fig. 5.19 Route summarization of routers and simplify routing table by default routing (router A รวม intranet เป็น 10.0.0.0/8 เหลือ route เดียว)</figcaption></figure>
<h4>วางแผนทั้ง Internet: summarization + default</h4>
<p>ประเทศใช้ block ใหญ่ เช่น จีน 40.0.0.0/8, อังกฤษ 30.0.0.0/8, สหรัฐ 20.0.0.0/8; จีนแบ่งต่อเป็นมณฑล เช่น Hebei 40.2.0.0/16, Henan 40.1.0.0/16 และในมณฑลแบ่งเป็นพื้นที่ เช่น 40.2.1.0/24, 40.2.2.0/24, 40.2.3.0/24</p>
<figure><img src="i/p192_1.webp" alt="การวางแผน address ของสามประเทศ จีน อังกฤษ สหรัฐ แยกตามมณฑลและพื้นที่" loading="lazy"><figcaption>Fig. 5.20 Internet address planning illustration</figcaption></figure>
<figure><img src="i/p193_1.webp" alt="router ระดับประเทศใช้ summarization router ปลายทางใช้ default route" loading="lazy"><figcaption>Fig. 5.21 Simplify routing by route summarization and default routing</figcaption></figure>
<ul>
<li>Router ทางออกระหว่างประเทศ: route เดียวต่อประเทศ (40.0.0.0/8, 30.0.0.0/8, 20.0.0.0/8) + route มณฑลสำหรับจีน</li>
<li>Router จังหวัด/มณฑล (C): route ไปพื้นที่ในมณฑล + <b>default ไป A</b> สำหรับทุกอย่างที่เหลือ</li>
<li>Router ปลาย (H, G, F): default route ไป router มณฑลก็พอ</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Default route = <code>ip route-static 0.0.0.0 0.0.0.0 next-hop</code> (0.0.0.0/0); prefix สั้นที่สุด ถูกเลือกท้ายสุด</li>
<li>ไม่มี default และไม่ match = discard</li>
<li>Router backbone ใช้ summarization; router ปลายเครือข่ายใช้ default route</li>
</ul></div>`
    },
    {
      t: "ปัญหา Routing Loop จาก Default Route และ TTL",
      ref: "หน้า 192-195",
      html: `
<h4>Ring ที่ใช้ default route</h4>
<p>router RA-RF ต่อเป็นวง ใส่ default route ชี้ไป router ถัดไปตามเข็มนาฬิกา เครือข่ายจะติดกันหมดเพราะ packet วนไปจนถึงปลายทาง</p>
<figure><img src="i/p193_2.webp" alt="router หกตัวต่อเป็นวง แต่ละตัวมี default route ไป router ถัดไป" loading="lazy"><figcaption>Fig. 5.22 Ring network using default routes</figcaption></figure>
<figure><img src="i/p194_1.webp" alt="ขาไปจาก A ไป B ผ่าน RF RA RB RC RD RE แต่ขากลับ B ไป A ผ่านแค่ RE RF" loading="lazy"><figcaption>Fig. 5.23 Packet round trip path (ขาไปและขากลับไม่จำเป็นต้องเป็นเส้นทางเดียวกัน)</figcaption></figure>
<p>ขาไปจาก A ถึง B ผ่าน RF, RA, RB, RC, RD, RE แต่ขากลับ B ถึง A ผ่านแค่ RE, RF เส้นทางขึ้นกับ routing table ล้วน ๆ</p>
<h4>ปัญหา: ปลายทางที่ไม่มีอยู่จริง</h4>
<p>ถ้า A ping 40.0.0.2 ซึ่งไม่มีในวงนี้ ทุก router ส่งต่อด้วย default route packet จะ <b>วนไม่หยุด</b> (routing loop) กินแบนด์วิดท์ ตัวช่วยคือ <b>TTL (Time To Live)</b> ใน IP header</p>
<ul>
<li>TTL ตั้งโดยผู้ส่ง (ค่าสูงสุด 255, แนะนำ 64) ความจริงคือ <b>จำนวน router</b> ที่ packet ผ่านได้</li>
<li>router ทุกตัวลด TTL ลง 1 ก่อน forward</li>
<li>ถ้า TTL ลดเหลือ 0 ก่อนถึงปลายทาง router จะ <b>ทิ้ง</b> packet และส่ง <b>ICMP time exceeded</b> ไปให้ผู้ส่ง</li>
</ul>
<h4>แบบสั้นที่สุด: 2 router ชี้หากัน</h4>
<figure><img src="i/p195_1.webp" alt="RA และ RB มี default route ชี้หากัน packet ไป 40.0.0.2 วนระหว่างสอง router" loading="lazy"><figcaption>Fig. 5.24 Problems arising from default routing (RA ส่ง RB, RB ส่งกลับ RA ... จน TTL = 0)</figcaption></figure>
<p>RA ตั้ง default ไป RB และ RB ตั้ง default ไป RA เครือข่ายทั้งสามติดกัน แต่ถ้า ping 40.0.0.2 (ไม่มีจริง) packet จะเด้งไปมาระหว่างสอง router จน TTL = 0</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>TTL: ลด 1 ต่อ router; เป็น 0 → ทิ้ง + ส่ง <b>ICMP time exceeded</b>; ใช้ป้องกัน loop (ค่าแนะนำ 64, สูงสุด 255)</li>
<li>Default route ที่ชี้หากัน (ring หรือ 2 router) ทำให้ packet ไปปลายทางที่ไม่มีอยู่จริงวนจน TTL หมด</li>
<li>ขาไปและขากลับอาจคนละเส้นทางได้ เพราะแต่ละ router ตัดสินใจด้วย routing table ของตัวเอง</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ใช้ <code>tracert</code> (Windows) เพื่อดูเส้นทางที่ packet ผ่านจริง; TTL หมด จึงเป็นกลไกที่ tracert ใช้ค้นหา router ตลอดทาง</div>`
    },
    {
      t: "Default Route และ Gateway บน Host",
      ref: "หน้า 195-197",
      html: `
<p>host (Windows, Linux) ก็มี routing table: ใน Windows ดูได้ด้วย <code>route print</code> หรือ <code>netstat -r</code></p>
<p><b>การตั้ง gateway ให้เครื่อง = การเพิ่ม default route</b> gateway ปกติคือ address ของ router interface ใน segment นั้น ถ้าไม่ตั้ง gateway เครื่องจะไม่รู้ next hop และส่งข้าม segment ไม่ได้</p>
<figure><img src="i/p196_1.webp" alt="การตั้ง gateway ในหน้าต่าง TCP/IP เทียบเท่ากับ default route ใน routing table" loading="lazy"><figcaption>Fig. 5.25 A gateway equals a default route.</figcaption></figure>
<figure><img src="i/p196_2.webp" alt="routing table ของ Windows เมื่อไม่ตั้ง gateway ไม่มี default route" loading="lazy"><figcaption>Fig. 5.26 View the routing table (ถอด gateway แล้วไม่เห็น default route 0.0.0.0)</figcaption></figure>
<h4>คำสั่ง route ใน Windows</h4>
<pre><code>route print                                              -- ดู routing table
route add 0.0.0.0 mask 0.0.0.0 192.168.80.1 -p           -- เพิ่ม default route แบบถาวร (-p)
route add 172.16.0.0 mask 255.255.255.0 192.168.1.2      -- เพิ่ม static route
route delete 172.16.0.0 mask 255.255.255.0               -- ลบ route
route change ...                                         -- แก้ route เดิม</code></pre>
<p><code>-p</code> = persistent (ยังอยู่หลังรีสตาร์ต); ไม่ใส่ route จะหายเมื่อ reboot; mask ถ้าไม่ระบุ ใช้ 255.255.255.255</p>
<h4>กรณีใช้งานจริง: Web server กับ database server บน intranet</h4>
<p>เว็บเซิร์ฟเวอร์ต้องเข้าถึง database ซึ่งอยู่ intranet แยก แต่ router ของบริษัทและของ telecom ไม่ยอมเพิ่ม route ไป intranet วิธี: บน web server ตั้ง <b>default route ไป Internet</b> และเพิ่ม <b>static route ไป intranet</b> ผ่าน router ที่ต่อ intranet</p>
<figure><img src="i/p198_2.webp" alt="Web server ใน server room ของ telecom ต้องเข้าถึง database server ใน intranet" loading="lazy"><figcaption>Fig. 5.28 A static route needs to be added.</figcaption></figure>
<figure><img src="i/p199_1.webp" alt="เพิ่ม static route ไป intranet และ default route ไป Internet บน web server" loading="lazy"><figcaption>Fig. 5.29 Add a static route and a default route</figcaption></figure>
<div class="warn"><b>ระวัง</b> ห้ามตั้ง default route สองเส้นบน host ไปยัง next hop ต่างกัน (เช่น 132.108.10.1 และ 132.108.10.254) หรือตั้ง default gateway สองตัวในการ์ดเดียว เพราะกลายเป็น equal-cost route ไป Internet traffic ครึ่งหนึ่งจะถูกส่งไป router ที่ผิด (ในตัวอย่างคือ enterprise router) แล้วถูกทิ้ง</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>gateway ของ host = default route (0.0.0.0/0)</li>
<li>Windows: <code>route print</code> / <code>netstat -r</code> ดูตาราง; <code>route add ... -p</code> เพิ่มแบบถาวร; <code>route delete</code> ลบ</li>
<li>Host ที่ต้องเข้าถึงทั้ง Internet และ intranet: default route ไป Internet + static route ไป intranet (อย่าตั้ง default สองเส้น)</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `Router AR1 (Huawei AR) รัน OSPF และ RIP พร้อมกัน ได้ route ไป 10.9.0.0/16 จาก OSPF (cost 20), จาก RIP (hop 2) และผู้ดูแลตั้ง static route ไป 10.9.0.0/16 ด้วยค่า preference เริ่มต้น`,
      q: "route ใดจะถูกใช้ใน IP routing table และเพราะอะไร?",
      opts: [
        { t: "OSPF เพราะ preference 10 ต่ำกว่า static (60) และ RIP (100)", why: "ถูก: ข้ามแหล่ง route เทียบด้วย preference ค่าน้อยชนะ; cost ของ OSPF กับ RIP เทียบกันไม่ได้" },
        { t: "RIP เพราะ hop count 2 ต่ำกว่า cost 20", why: "ผิด: cost คนละ protocol เทียบกันไม่ได้ ต้องใช้ preference" },
        { t: "Static เพราะผู้ดูแลตั้งเอง", why: "ผิด: static มี preference 60 ซึ่งแย่กว่า OSPF (10) โดยปริยาย ต้องตั้ง preference ต่ำกว่า 10 ถึงจะชนะ" },
        { t: "ทั้งสามเส้นถูกใส่ใน routing table และ load balance", why: "ผิด: load balance เกิดเฉพาะ equal-cost ภายใน protocol เดียวกัน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เพื่อบังคับให้ traffic ไป 10.9.0.0/16 ใช้ static route แทน OSPF ผู้ดูแลเพิ่มคำสั่ง <code>ip route-static 10.9.0.0 16 192.168.1.2 preference 5</code>`,
      q: "ผลคืออะไร?",
      opts: [
        { t: "static (preference 5) ชนะ OSPF (10) และถูกใช้ใน routing table", why: "ถูก: preference 5 น้อยกว่า 10 จึงดีกว่า (และไม่ต้องสนใจ cost)" },
        { t: "OSPF ยังชนะ เพราะ OSPF เป็น dynamic protocol", why: "ผิด: ไม่เกี่ยวว่า dynamic หรือ static ตัดสินด้วย preference ล้วน ๆ" },
        { t: "คำสั่งผิดเพราะ preference ต้องมากกว่า 60", why: "ผิด: ช่วงที่ใช้ได้คือ 1-255 ตั้งน้อยกว่า 60 ได้" },
        { t: "ทั้งสอง route ถูกใช้พร้อมกัน", why: "ผิด: ใช้เฉพาะ route ที่ preference ต่ำสุด" }
      ],
      ans: 0
    },
    {
      type: "match",
      q: "Router มี entry ต่อไปนี้: 10.0.0.0/8 via A, 10.1.0.0/16 via B, 10.1.2.0/24 via C, 0.0.0.0/0 via D จับคู่ destination กับ next hop ที่ router เลือก (longest prefix match)",
      pairs: [
        ["10.1.2.77", "C (ตรง /24 ยาวสุด)"],
        ["10.1.3.9", "B (ตรง /16 ยาวสุด)"],
        ["10.200.1.1", "A (ตรงแค่ /8)"],
        ["11.1.1.1", "D (ไม่ตรง entry ใด ใช้ default route)"]
      ],
      why: "เลือก entry ที่ prefix ยาวสุดที่ครอบ destination และ 0.0.0.0/0 ครอบทุก address แต่ถูกเลือกท้ายสุด"
    },
    {
      type: "choice",
      story: `Router R1 มี routing table: 172.16.0.0/16 via 10.0.0.2 (ไป Shijiazhuang) และ 172.16.10.0/24 via 10.0.1.2 (network ข้อยกเว้นในเมือง Beijing) packet ที่ปลายทาง 172.16.10.9 มาถึง R1`,
      q: "R1 ส่งต่อไปทางใด และเพราะอะไร?",
      opts: [
        { t: "via 10.0.1.2 เพราะ /24 เจาะจงกว่า /16 (longest prefix match)", why: "ถูก: destination match ทั้งสอง entry แต่เลือก prefix ที่ยาวกว่า" },
        { t: "via 10.0.0.2 เพราะ /16 อยู่ก่อนใน routing table", why: "ผิด: ลำดับที่เพิ่มไม่เกี่ยว เลือกตาม prefix ยาวสุด" },
        { t: "ทิ้ง packet เพราะ match สอง entry ขัดแย้งกัน", why: "ผิด: LPM ตัดสินได้เสมอ ไม่เกิดความขัดแย้ง" },
        { t: "ส่งทั้งสองทางแบบ load balance", why: "ผิด: load balance ใช้กับ equal-cost ที่ prefix เดียวกัน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR1 ต่อ AR2 ด้วย Ethernet (GE0/0/0) ผู้ดูแลต้องเพิ่ม static route ไป 192.168.5.0/24 ผ่าน AR2 (ซึ่ง interface ฝั่ง AR2 คือ 172.16.0.2) และมีอุปกรณ์อื่นต่อใน segment Ethernet นี้ด้วย`,
      q: "การกำหนดค่าแบบใดเหมาะสม?",
      opts: [
        { t: "ip route-static 192.168.5.0 24 172.16.0.2 (ระบุ next hop)", why: "ถูก: บน Ethernet ต้องรู้ next hop IP จึง ARP หา MAC ได้ว่าจะส่ง frame ให้ใคร" },
        { t: "ip route-static 192.168.5.0 24 GigabitEthernet 0/0/0 (ระบุแค่ interface)", why: "ผิด: Ethernet มีหลายอุปกรณ์ router ไม่รู้ว่าจะส่ง frame ให้เครื่องไหน (ไม่มี next hop IP ให้ ARP หา MAC)" },
        { t: "ip route-static 172.16.0.2 24 192.168.5.0", why: "ผิด: สลับ destination กับ next hop" },
        { t: "ip route-static 192.168.5.1 24 172.16.0.2", why: "ผิด: destination ต้องเป็น network address (192.168.5.0) ไม่ใช่ host address" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการ route ไปเครื่อง server เครื่องเดียว คือ 172.16.1.2 ผ่าน next hop 172.16.0.2`,
      q: "คำสั่งใดถูกต้อง?",
      opts: [
        { t: "ip route-static 172.16.1.2 32 172.16.0.2", why: "ถูก: host route ใช้ mask /32 (255.255.255.255)" },
        { t: "ip route-static 172.16.1.2 24 172.16.0.2", why: "ผิด: /24 ทำให้ระบบแก้เป็น network 172.16.1.0/24 ทั้งก้อน ไม่ใช่เครื่องเดียว" },
        { t: "ip route-static 172.16.1.2 0 172.16.0.2", why: "ผิด: /0 คือ default route ครอบทุก address" },
        { t: "ip route-static 172.16.0.2 32 172.16.1.2", why: "ผิด: สลับ destination กับ next hop" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `PC1 (192.168.0.10) ping PC2 (192.168.1.10) ไม่ติด ตรวจพบว่า AR1 และ AR2 มี route ไป 192.168.1.0/24 ครบ แต่ AR3 (ต่อ PC2) มี route ไป 172.16.0.0/24 เท่านั้น ไม่มี route ไป 192.168.0.0/24`,
      q: "ปัญหาคืออะไร และแก้ที่ไหน?",
      opts: [
        { t: "ขากลับไม่มี route: เพิ่ม route ไป 192.168.0.0/24 บน AR3 (และตรวจ AR2 ขากลับ)", why: "ถูก: เครือข่ายติดเมื่อไปถึงและตอบกลับได้ AR3 ไม่รู้ทางกลับไป PC1 reply จึงถูกทิ้ง" },
        { t: "เพิ่ม route ไป 192.168.1.0/24 บน AR1 อีกครั้ง", why: "ผิด: ฝั่งขาไปมี route ครบแล้ว" },
        { t: "เปลี่ยน mask ของ PC1", why: "ผิด: ไม่เกี่ยวกับการขาดตารางเส้นทางขากลับ" },
        { t: "เปิด firewall ที่ PC2", why: "ผิด: ไม่ใช่สาเหตุตามข้อมูลที่ตรวจพบ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR1 มี primary route ไป 192.168.1.0/24 ผ่าน GE0/0/1 (preference 60 ค่าเริ่มต้น) ผู้ดูแลเพิ่ม route สำรองผ่าน GE0/0/0 และตั้ง <code>preference 40</code> โดยตั้งใจให้เป็น backup`,
      q: "เกิดอะไรขึ้นเมื่อ link ปกติทุกเส้น (ไม่มีอะไรเสีย)?",
      opts: [
        { t: "route ที่ตั้งเป็น backup (pre 40) กลายเป็นทางหลัก ส่วนทางเดิม (pre 60) เป็น inactive", why: "ถูก: ค่าน้อย = ดีกว่า ต้องตั้ง backup เป็นค่ามากกว่า เช่น 100" },
        { t: "ทางเดิมยังเป็นทางหลัก เพราะตั้งก่อน", why: "ผิด: ลำดับการตั้งไม่เกี่ยว ตัดสินด้วย preference" },
        { t: "ทั้งสองทางถูกใช้พร้อมกัน", why: "ผิด: ไม่ใช่ equal-cost เพราะ preference ต่างกัน" },
        { t: "ไม่มีผลเพราะ preference ต่ำกว่า 60 ใช้ไม่ได้", why: "ผิด: ช่วงที่ใช้ได้คือ 1-255" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลกำลังเปรียบเทียบ static routing กับ dynamic routing สำหรับองค์กรหนึ่ง`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "static route ไม่สร้าง update traffic และไม่เปิดเผย topology ผ่านการแลก routing table", ok: true, why: "ถูก: เป็นข้อดีด้านความปลอดภัยและแบนด์วิดท์" },
        { t: "เมื่อ link ที่ static route ใช้ล่ม router จะ reroute ไปทางอื่นอัตโนมัติ", ok: false, why: "ผิด: static ไม่ปรับตัวเอง ยกเว้นตั้ง floating static route ไว้ล่วงหน้า" },
        { t: "dynamic routing ปรับ route เองเมื่อเพิ่ม/ลบ network หรือ topology เปลี่ยน", ok: true, why: "ถูก: เหมาะกับเครือข่ายใหญ่และซับซ้อน" },
        { t: "static route เหมาะกับเครือข่ายขนาดใหญ่ที่เปลี่ยนบ่อย", ok: false, why: "ผิด: ต้องแก้ทีละ router เป็นงานมหาศาล" },
        { t: "Direct route มี cost เป็น 0 เสมอ", ok: true, why: "ถูก: router ค้นพบเองเมื่อ interface UP" }
      ]
    },
    {
      type: "choice",
      story: `ผู้ดูแลมี network ต่อเนื่อง 4 ก้อน 192.168.20.0/24, 192.168.21.0/24, 192.168.22.0/24, 192.168.23.0/24 และต้องการ summarize เป็น route เดียวที่ router ฝั่งตรงข้าม`,
      q: "route สรุปที่ถูกต้องคือข้อใด?",
      opts: [
        { t: "192.168.20.0/22", why: "ถูก: 20 หารด้วย 4 ลงตัว เลื่อน mask ซ้าย 2 bit จาก /24 → /22 ครอบ 20-23 พอดี" },
        { t: "192.168.20.0/23", why: "ผิด: /23 ครอบแค่ 20-21" },
        { t: "192.168.20.0/21", why: "ผิด: /21 ครอบ 16-23 กินเกิน" },
        { t: "192.168.21.0/22", why: "ผิด: 21 ไม่ใช่ network address ที่ถูกต้องของ /22 (ขอบคือ 20)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `สาขาใช้ network 10.4.0.0/16, 10.5.0.0/16, 10.6.0.0/16 และ 10.7.0.0/16 (สี่ก้อน /16 ที่ต่อเนื่อง) ต้องการ summarize ที่ router ของสำนักงานใหญ่`,
      q: "route สรุปที่ถูกต้องคือข้อใด?",
      opts: [
        { t: "10.4.0.0/14", why: "ถูก: 4 หารด้วย 4 ลงตัว, 4 ก้อน /16 = เลื่อน mask ซ้าย 2 bit → /14 ครอบ 10.4.0.0 - 10.7.255.255" },
        { t: "10.4.0.0/15", why: "ผิด: /15 ครอบแค่ 10.4 - 10.5" },
        { t: "10.0.0.0/8", why: "ผิด: ครอบ 10.x ทั้งหมด กินเกินกว่าสี่ก้อนนี้มาก" },
        { t: "10.4.0.0/18", why: "ผิด: /18 แคบกว่า /16 จึงไม่ครอบสี่ก้อน /16" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router R2 ที่ปลายเครือข่ายสาขา ต่อ 2 LAN ในสาขา และมี uplink เส้นเดียวไป router สำนักงานใหญ่ (10.0.0.1) ที่รู้จักทุกอย่าง ผู้ดูแลต้องการให้ routing table ของ R2 เล็กที่สุด`,
      q: "ควรตั้งค่าอย่างไร?",
      opts: [
        { t: "ip route-static 0.0.0.0 0.0.0.0 10.0.0.1 (default route เดียว)", why: "ถูก: router ปลายเครือข่ายที่ทุก traffic ออกทางเดียว ใช้ default route เส้นเดียวแทนการลง route ทุก network" },
        { t: "ใส่ static route ไปทุก network ในองค์กรทีละก้อน", why: "ผิด: ได้ผลแต่ตารางใหญ่และดูแลยาก ขัดกับเป้าหมาย" },
        { t: "ip route-static 10.0.0.1 0 0.0.0.0", why: "ผิด: สลับ destination กับ next hop" },
        { t: "ไม่ต้องตั้งอะไร เพราะ direct route พอ", why: "ผิด: direct route มีเฉพาะ network ที่ต่อตรง ไม่ครอบ network อื่นหรือ Internet" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router RA และ RB ต่อกันตรง RA ตั้ง default route ไป RB และ RB ตั้ง default route ไป RA ทั้งคู่ไม่มี network 40.0.0.0/8 ผู้ใช้ ping 40.0.0.2 จากเครื่องใน LAN ของ RA (TTL เริ่มต้น 64)`,
      q: "ผลที่ผู้ใช้เห็นคืออะไร?",
      opts: [
        { t: "packet วนระหว่าง RA กับ RB จน TTL = 0 แล้ว router ทิ้งและส่ง ICMP time exceeded กลับผู้ส่ง", why: "ถูก: default route ชี้หากันทำให้เกิด loop TTL ลดลงทุก hop และทำหน้าที่ตัดวง" },
        { t: "RA ทิ้ง packet ทันทีเพราะไม่มี route ไป 40.0.0.0/8", why: "ผิด: RA มี default route จึงส่งต่อให้ RB (ไม่ได้ทิ้งทันที)" },
        { t: "packet ไปถึงปลายทางผ่าน Internet", why: "ผิด: ไม่มีเส้นทางจริงไปยัง 40.0.0.0/8 ในตัวอย่าง" },
        { t: "packet วนตลอดไปไม่มีวันหยุด", why: "ผิด: TTL ลดทุก hop จึงหยุดแน่นอน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เครื่อง Web server ใน server room มี NIC เดียว ผู้ดูแลต้องการให้เข้าถึง Internet ผ่าน router A (132.108.10.1) และเข้าถึง intranet 172.16.0.0/24 ผ่าน router B (132.108.10.254) เพื่อความง่ายจึงเพิ่ม default route ไปทั้งสอง router`,
      q: "ผลคืออะไร และควรแก้อย่างไร?",
      opts: [
        { t: "เป็น equal-cost default สองเส้น traffic ไป Internet ราวครึ่งหนึ่งไปผิด router; ควรมี default route เส้นเดียวไป router A และ static route 172.16.0.0/24 ไป router B", why: "ถูก: อย่าตั้ง default สองเส้นบน host; ใช้ default เดียว + static route เฉพาะ network ที่ต้องไปทางอื่น (LPM เลือก /24 ก่อน default)" },
        { t: "ใช้ได้ดีเพราะ load balance ได้ Internet เร็วขึ้นสองเท่า", why: "ผิด: บางส่วนไปที่ router B ซึ่งไม่มี route ออก Internet จึงถูกทิ้ง" },
        { t: "ระบบจะเลือกเส้นที่แรกที่เพิ่ม และเส้นที่สองไม่มีผล", why: "ผิด: เมื่อ metric เท่ากันจะกลายเป็น equal-cost" },
        { t: "ต้องเปลี่ยนเป็นสอง NIC ก่อนจึงจะตั้งได้", why: "ผิด: ตั้ง static route ผ่าน NIC เดียวได้" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ในการกำหนด route บน host Windows ผู้ดูแลใช้คำสั่ง <code>route add 0.0.0.0 mask 0.0.0.0 192.168.80.1 -p</code>`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "เพิ่ม default route ไปยัง gateway 192.168.80.1", ok: true, why: "ถูก: 0.0.0.0/0 คือ default route และ next hop คือ 192.168.80.1" },
        { t: "-p ทำให้ route คงอยู่หลังรีสตาร์ตเครื่อง", ok: true, why: "ถูก: -p = persistent" },
        { t: "เทียบเท่ากับการตั้ง default gateway ในหน้าต่าง TCP/IP", ok: true, why: "ถูก: gateway = default route" },
        { t: "ใช้ดู routing table ของเครื่อง", ok: false, why: "ผิด: ดู routing table ใช้ route print หรือ netstat -r" },
        { t: "ลบ default route เดิมทั้งหมดของเครื่องโดยอัตโนมัติ", ok: false, why: "ผิด: คำสั่ง add เพิ่ม route เท่านั้น ถ้าต้องลบใช้ route delete" }
      ]
    },
    {
      type: "blank",
      story: `ตั้งค่า Huawei router`,
      text: `คำสั่งสร้าง default route ไป next hop 10.0.0.2 คือ <code>ip {1} 0.0.0.0 {2} 10.0.0.2</code> destination/mask นี้ครอบ address {3} ทั้งหมด`,
      blanks: [
        { opts: ["route-static", "route", "static-route", "default-route"], ans: 0, why: "คำสั่งคือ ip route-static" },
        { opts: ["0.0.0.0", "255.255.255.255", "255.0.0.0", "0.0.0.255"], ans: 0, why: "default route ใช้ mask 0.0.0.0 (หรือ /0) เพื่อให้ network bit เป็น 0" },
        { opts: ["IPv4", "Class A เท่านั้น", "ภายใน subnet เดียว", "private"], ans: 0, why: "0.0.0.0/0 ครอบทุก IPv4 address จึงเป็นตัวสุดท้ายที่ถูก match" }
      ]
    },
    {
      type: "blank",
      story: `TTL และ ICMP`,
      text: `router ทุกตัวลด TTL ลง {1} ก่อนส่งต่อ; เมื่อ TTL เป็น {2} router จะทิ้ง packet และส่ง ICMP {3} กลับไปยังผู้ส่ง`,
      blanks: [
        { opts: ["1", "2", "64", "255"], ans: 0, why: "ลดทีละ 1 ต่อ router" },
        { opts: ["0", "1", "64", "255"], ans: 0, why: "TTL ลดเหลือ 0 ก่อนถึงปลายทาง ถูกทิ้ง" },
        { opts: ["time exceeded", "echo request", "host unreachable", "redirect"], ans: 0, why: "ICMP time exceeded" }
      ]
    },
    {
      type: "match",
      q: "จับคู่แหล่ง route กับ default preference บน Huawei AR",
      pairs: [
        ["Direct", "0"],
        ["OSPF", "10"],
        ["Static", "60"],
        ["RIP", "100"]
      ],
      why: "ค่าน้อย = ดีกว่า: Direct (0) &lt; OSPF (10) &lt; Static (60) &lt; RIP (100) (BGP = 255)"
    }
  ]
});
