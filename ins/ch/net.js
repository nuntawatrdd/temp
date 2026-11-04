IOT.reg({
  id: "net",
  title: "Network Layer: Data Plane (Router, IP, NAT, IPv6, SDN)",
  th: "การทำงานของ network layer ฝั่ง data plane: สถาปัตยกรรม router, IPv4/CIDR/DHCP/NAT, IPv6 และ generalized forwarding (OpenFlow)",
  summary: `
<h4>ภาพรวม</h4>
<ul>
<li><b>Forwarding</b> = ย้าย packet จาก input port ไป output port ที่ถูกต้อง (data plane, local ต่อ router, ระดับ nanosecond, hardware). <b>Routing</b> = หาเส้นทาง end-to-end (control plane, network-wide, ระดับ millisecond, software)</li>
<li>Control plane มี 2 แบบ: routing algorithm ในแต่ละ router (traditional) หรือ SDN (remote controller + control agents)</li>
<li>Internet service model = <b>best effort</b>: ไม่รับประกัน bandwidth / loss / order / timing, ไม่มี congestion feedback</li>
</ul>
<h4>Router</h4>
<ul>
<li>Input port: line termination, link layer, <b>lookup + forwarding</b> (match plus action), queueing; ต้องทำที่ line speed</li>
<li>Longest prefix matching: ใช้ prefix ที่ยาวที่สุดที่ match; ทำด้วย <b>TCAM</b> (หนึ่ง clock cycle ไม่ขึ้นกับขนาดตาราง)</li>
<li>Switching fabric 3 แบบ: memory (2 bus crossings, จำกัดด้วย memory bandwidth), bus (bus contention), crossbar/interconnection network (แบ่งเป็น fixed-length cell). N inputs: ต้องการ switching rate N เท่าของ line rate</li>
<li>Input queue: <b>HOL blocking</b>; Output port: buffering + scheduling เมื่อ arrival rate &gt; line rate (loss เมื่อ buffer เต็ม)</li>
<li>Buffer rule of thumb: RTT x C; มี N flows: RTT x C / &radic;N</li>
<li>Scheduling: FIFO (+ discard: tail drop / priority / random), priority, Round Robin, WFQ</li>
</ul>
<h4>IPv4</h4>
<table>
<tr><th>เรื่อง</th><th>ข้อมูลสำคัญ</th></tr>
<tr><td>Header</td><td>20 bytes (ไม่มี options): ver, head len, ToS, total length, 16-bit ID, flags, fragment offset, TTL, upper-layer protocol, header checksum, src IP, dst IP. TCP+IP overhead = 40 bytes</td></tr>
<tr><td>Fragmentation</td><td>เกิดเมื่อ datagram &gt; MTU; reassemble เฉพาะที่ <b>destination</b>; offset หน่วย 8 bytes. 4000 B, MTU 1500 &rarr; 3 fragments: length 1500/1500/1040, offset 0/185/370, flag 1/1/0</td></tr>
<tr><td>Address</td><td>32 bits ต่อ <b>interface</b>; subnet part (high-order) + host part (low-order); CIDR a.b.c.d/x</td></tr>
<tr><td>Subnet</td><td>host ใน /n มี 2^(32-n) addresses, ใช้ได้ 2^(32-n) - 2 (network + broadcast)</td></tr>
<tr><td>Aggregation</td><td>ISP 200.23.16.0/20 &rarr; 8 org x /23 (200.23.16.0, .18.0, .20.0 ... .30.0); ISP อื่นประกาศ more specific route ได้ (longest prefix match)</td></tr>
<tr><td>DHCP</td><td>Discover &rarr; Offer &rarr; Request &rarr; ACK (UDP port 67 server / 68 client; discover: src 0.0.0.0, dst 255.255.255.255); ให้ IP + subnet mask + first-hop router + DNS + lease time</td></tr>
<tr><td>NAT</td><td>แปลง (src IP, port) &harr; (NAT IP, new port) เก็บใน NAT translation table; port 16-bit &rarr; ~60,000 connections; ขัด end-to-end argument</td></tr>
</table>
<h4>IPv6</h4>
<ul>
<li>header คงที่ <b>40 bytes</b>, address <b>128 bits</b>; fields: ver, priority, flow label, payload len, next header, hop limit, src, dst</li>
<li>ตัด checksum, ตัด fragmentation ใน router (ใช้ ICMPv6 "Packet Too Big"), options อยู่นอก header ผ่าน Next Header</li>
<li>Transition ด้วย <b>tunneling</b> (IPv6 datagram เป็น payload ของ IPv4 datagram), ไม่มี "flag day"</li>
</ul>
<h4>Generalized forwarding / OpenFlow</h4>
<ul>
<li>Flow table entry = <b>Pattern (match) + Actions + Priority + Counters</b>; actions: forward, drop, modify field, send to controller</li>
<li>match+action รวม router (longest dst prefix &rarr; forward), switch (dst MAC &rarr; forward/flood), firewall (IP+port &rarr; permit/deny), NAT (IP+port &rarr; rewrite)</li>
</ul>
`,
  sections: [
    { t: "Network layer: Data plane vs Control plane", html: `
<p>Network layer ทำหน้าที่ขนส่ง <b>segment</b> จาก host ต้นทางไปปลายทาง: ฝั่งส่งห่อ segment เป็น <b>datagram</b>, ฝั่งรับส่ง segment ขึ้น transport layer. Network layer protocol อยู่ในทุก host และทุก router; router ตรวจ header field ของทุก IP datagram ที่ผ่าน</p>
<h4>2 หน้าที่หลัก (analogy: การเดินทาง)</h4>
<table>
<tr><th></th><th>Forwarding (data plane)</th><th>Routing (control plane)</th></tr>
<tr><td>ทำอะไร</td><td>ย้าย packet จาก input ไป output ที่เหมาะสมของ router เดียว</td><td>กำหนดเส้นทางจาก source ถึง destination</td></tr>
<tr><td>ขอบเขต</td><td>local, ต่อ router</td><td>network-wide</td></tr>
<tr><td>analogy</td><td>ผ่านทางแยกหนึ่งแห่ง</td><td>วางแผนการเดินทางทั้งหมด</td></tr>
<tr><td>เวลา</td><td>nanosecond (hardware)</td><td>millisecond (software)</td></tr>
</table>
<p>Data plane ดู <b>ค่าใน header</b> ของ packet ที่เข้ามา แล้วค้น <b>forwarding table</b> เพื่อเลือก output port. ตารางนี้ถูกเติมโดย control plane.</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Control plane มี 2 วิธี: (1) <b>per-router</b> routing algorithm อยู่ในทุก router และคุยกันเอง (2) <b>SDN</b> logically centralized controller (remote) คุยกับ control agent (CA) ในแต่ละ router</li>
<li>Internet = <b>best effort</b>: bandwidth none, loss no, order no, timing no, congestion feedback no (รู้จาก loss เท่านั้น)</li>
<li>ATM มีหลาย model เช่น CBR (constant rate, รับประกันทุกอย่าง), ABR (guaranteed minimum), UBR (ไม่รับประกัน)</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> Service ที่ network layer อาจให้ได้: ต่อ datagram (guaranteed delivery, delay &lt; 40 ms) และต่อ flow (in-order delivery, guaranteed min bandwidth, จำกัดการเปลี่ยน inter-packet spacing) แต่ Internet ไม่ให้ตัวใดเลย</div>
` },
    { t: "ภายใน Router: Input port & Longest prefix matching", html: `
<div class="dg"><div class="dgt">🖼️ สถาปัตยกรรม router โดยรวม</div>
<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect class="bx hd" x="180" y="10" width="280" height="40"/>
<text class="t b" x="320" y="35" text-anchor="middle">Routing processor (control plane, ms)</text>
<rect class="bx" x="20" y="90" width="150" height="110"/>
<text class="t b" x="95" y="110" text-anchor="middle">Input ports</text>
<text class="t sm" x="95" y="135" text-anchor="middle">line termination</text>
<text class="t sm" x="95" y="152" text-anchor="middle">link layer</text>
<text class="t sm" x="95" y="169" text-anchor="middle">lookup + forwarding</text>
<text class="t sm" x="95" y="186" text-anchor="middle">queueing</text>
<rect class="bx ok" x="240" y="90" width="160" height="110"/>
<text class="t b" x="320" y="140" text-anchor="middle">Switching fabric</text>
<text class="t sm" x="320" y="160" text-anchor="middle">(hardware, ns)</text>
<rect class="bx" x="470" y="90" width="150" height="110"/>
<text class="t b" x="545" y="110" text-anchor="middle">Output ports</text>
<text class="t sm" x="545" y="135" text-anchor="middle">datagram buffer</text>
<text class="t sm" x="545" y="152" text-anchor="middle">scheduling</text>
<text class="t sm" x="545" y="169" text-anchor="middle">link layer (send)</text>
<text class="t sm" x="545" y="186" text-anchor="middle">line termination</text>
<line class="ln" x1="170" y1="145" x2="240" y2="145"/>
<line class="ln" x1="400" y1="145" x2="470" y2="145"/>
<line class="ln" x1="320" y1="50" x2="320" y2="90"/>
<text class="t sm" x="320" y="235" text-anchor="middle">data plane: input &rarr; fabric &rarr; output</text>
</svg></div>
<h4>Input port</h4>
<ul>
<li>Physical layer รับ bit, link layer (เช่น Ethernet), แล้ว <b>lookup/forwarding</b> ด้วยตารางที่เก็บใน memory ของ input port เอง (<b>decentralized switching</b>, "match plus action")</li>
<li>เป้าหมาย: ทำให้เสร็จที่ <b>line speed</b>; ถ้า datagram มาเร็วกว่าที่ส่งเข้า fabric ได้ &rarr; queue</li>
<li><b>Destination-based forwarding</b>: ดูแค่ destination IP (แบบดั้งเดิม). <b>Generalized forwarding</b>: ดู header field ใดก็ได้</li>
</ul>
<h4>Longest prefix matching</h4>
<p>ตาราง forwarding เก็บเป็น prefix ไม่ใช่ range ที่ลงตัวเสมอ. กฎ: เมื่อหลายรายการ match ให้ใช้ <b>prefix ที่ยาวที่สุด</b>.</p>
<pre><code>Prefix                            Interface
11001000 00010111 00010***  ****   0
11001000 00010111 00011000  ****   1
11001000 00010111 00011***  ****   2
otherwise                          3

DA 11001000 00010111 00010110 10100001 -> match แถว 0 เท่านั้น (00010...) -> interface 0
DA 11001000 00010111 00011000 10101010 -> match แถว 1 (24 bits) และแถว 2 (21 bits) -> เลือกแถว 1 -> interface 1</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Longest prefix matching ทำด้วย <b>TCAM</b> (ternary content addressable memory): ส่ง address เข้าไป ได้คำตอบใน <b>1 clock cycle</b> ไม่ว่าตารางใหญ่แค่ไหน (Cisco Catalyst รองรับได้ราว 1M entries)</li>
<li>ที่ต้องใช้ longest prefix เพราะ hierarchical addressing/route aggregation ทำให้มี prefix ซ้อนกัน (ดูหัวข้อ CIDR)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> "เลือกรายการแรกที่ match" หรือ "เลือกรายการที่เลขน้อยสุด" ผิด; ต้องเทียบจำนวน bit ของ prefix ที่ match จริง</div>
` },
    { t: "Switching fabric, Queueing & Scheduling", html: `
<h4>Switching fabric</h4>
<p>ย้าย packet จาก input buffer ไป output buffer ที่ถูกต้อง. <b>Switching rate</b> = อัตราที่โอน packet จาก input ไป output (มักวัดเป็นทวีคูณของ line rate); ถ้ามี N inputs ต้องการ <b>N เท่าของ line rate</b>.</p>
<table>
<tr><th>แบบ</th><th>การทำงาน</th><th>ข้อจำกัด</th></tr>
<tr><td>Memory</td><td>router รุ่นแรก; CPU ควบคุม, copy packet เข้า system memory</td><td>memory bandwidth (ข้าม bus 2 ครั้งต่อ datagram)</td></tr>
<tr><td>Bus</td><td>datagram จาก input memory ไป output memory ผ่าน shared bus</td><td>bus contention; เช่น Cisco 5600 ใช้ 32 Gbps bus พอสำหรับ access/enterprise router</td></tr>
<tr><td>Interconnection network (crossbar, banyan)</td><td>เอาชนะข้อจำกัด bus; แบ่ง datagram เป็น fixed-length cell แล้วสลับผ่าน fabric</td><td>เช่น Cisco 12000 ได้ 60 Gbps</td></tr>
</table>
<h4>Input port queueing</h4>
<p>ถ้า fabric ช้ากว่าผลรวมของ input &rarr; queue ที่ input (delay และ loss จาก buffer overflow). <b>Head-of-the-Line (HOL) blocking</b>: packet หัวคิวที่ถูก block (เพราะ output port contention) ขวาง packet หลังมัน แม้ output ปลายทางของ packet หลังนั้นว่าง.</p>
<h4>Output port queueing</h4>
<ul>
<li>ต้องมี buffer เมื่อ datagram มาจาก fabric เร็วกว่า transmission rate ของ link; buffer เต็ม &rarr; <b>datagram loss</b></li>
<li><b>Scheduling discipline</b> เลือก datagram ที่รอคิวเพื่อส่ง (ผูกกับ network neutrality)</li>
</ul>
<h4>ต้องมี buffer เท่าไร</h4>
<p>RFC 3439: average buffering = RTT ทั่วไป (เช่น 250 ms) x link capacity C. ตัวอย่าง C = 10 Gbps: 0.25 s x 10 Gbps = <b>2.5 Gbit</b>. คำแนะนำใหม่ เมื่อมี N flows: <b>RTT x C / &radic;N</b>. เช่น N = 10,000 &rarr; 2.5 Gbit / 100 = <b>25 Mbit</b>.</p>
<h4>Scheduling mechanisms</h4>
<ul>
<li><b>FIFO</b>: ส่งตามลำดับมาถึง. Discard policy เมื่อ queue เต็ม: tail drop (ทิ้ง packet ที่เพิ่งมา), priority (ทิ้งตาม priority), random</li>
<li><b>Priority scheduling</b>: หลาย class (classify จาก marking, IP src/dst, port ฯลฯ); ส่ง packet ใน class ที่ priority สูงสุดที่มีคิวอยู่ก่อนเสมอ</li>
<li><b>Round Robin (RR)</b>: วนดูแต่ละ class ส่ง 1 packet เต็ม ๆ จากแต่ละ class (ถ้ามี)</li>
<li><b>Weighted Fair Queueing (WFQ)</b>: RR แบบ generalized; แต่ละ class ได้บริการตามน้ำหนักในแต่ละรอบ</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>HOL blocking เกิดที่ <b>input</b> queue; buffering/scheduling/loss จาก output contention เกิดที่ <b>output</b> port</li>
<li>Buffer: RTT x C (rule of thumb) และ RTT x C / &radic;N (N flows)</li>
<li>Memory: 2 bus crossings; Bus: shared-bus contention; Crossbar: ขนานได้ + แบ่งเป็น cell</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ตัวอย่าง: คิว class A มี a1 a2 a3 และ class B มี b1 (มาถึงพร้อมกัน). Priority (A สูงกว่า): a1 a2 a3 b1. Round Robin: a1 b1 a2 a3.</div>
` },
    { t: "IPv4 datagram format & Fragmentation", html: `
<p>Network layer ของ Internet: ฝั่ง host/router มี (1) <b>IP protocol</b> (addressing, datagram format, packet handling), (2) <b>routing protocols</b> (RIP, OSPF, BGP) เติม forwarding table, (3) <b>ICMP</b> (error reporting, router "signaling").</p>
<h4>IPv4 header fields</h4>
<table>
<tr><th>Field</th><th>หน้าที่</th></tr>
<tr><td>ver</td><td>เวอร์ชัน (4)</td></tr>
<tr><td>head. len</td><td>ความยาว header (ตัวบอกว่ามี options หรือไม่)</td></tr>
<tr><td>type of service</td><td>"type" ของข้อมูล</td></tr>
<tr><td>length</td><td>ความยาว datagram ทั้งหมด (bytes)</td></tr>
<tr><td>16-bit identifier, flgs, fragment offset</td><td>ใช้ fragmentation/reassembly</td></tr>
<tr><td>time to live (TTL)</td><td>จำนวน hop สูงสุดที่เหลือ ลดลง 1 ที่ทุก router</td></tr>
<tr><td>upper layer</td><td>protocol ปลายทางของ payload (TCP/UDP)</td></tr>
<tr><td>header checksum</td><td>ตรวจ header</td></tr>
<tr><td>32-bit source / destination IP</td><td>ที่อยู่ต้นทาง/ปลายทาง</td></tr>
<tr><td>options (ถ้ามี)</td><td>เช่น timestamp, record route, list of routers to visit</td></tr>
</table>
<p><b>Overhead</b>: IP 20 bytes + TCP 20 bytes = 40 bytes ต่อ packet (ยังไม่รวม application layer overhead).</p>
<h4>Fragmentation & Reassembly</h4>
<ul>
<li>แต่ละ link type มี <b>MTU</b> (largest possible link-level frame / max transfer size) ต่างกัน</li>
<li>datagram ใหญ่ถูกแบ่ง ("fragmented") ภายในเครือข่าย: 1 datagram &rarr; หลาย datagram</li>
<li><b>Reassemble เฉพาะที่ final destination</b> ไม่ใช่ที่ router ระหว่างทาง</li>
<li>ใช้ header bits (ID เดียวกัน, flag, offset) ระบุและเรียงลำดับ fragment</li>
</ul>
<h4>ตัวอย่าง: datagram 4000 bytes, MTU = 1500</h4>
<p>Header 20 bytes &rarr; data 3980 bytes. แต่ละ fragment มี data สูงสุด 1480 bytes (1500 - 20).</p>
<table>
<tr><th>Fragment</th><th>data</th><th>length</th><th>ID</th><th>fragflag</th><th>offset</th></tr>
<tr><td>1</td><td>1480</td><td>1500</td><td>x</td><td>1</td><td>0</td></tr>
<tr><td>2</td><td>1480</td><td>1500</td><td>x</td><td>1</td><td>185 (=1480/8)</td></tr>
<tr><td>3</td><td>1020</td><td>1040</td><td>x</td><td>0</td><td>370 (=2960/8)</td></tr>
</table>
<h4>ตัวอย่างคำนวณเพิ่ม: 5000 bytes, MTU = 1400</h4>
<pre><code>data รวม = 5000 - 20 = 4980 bytes
data ต่อ fragment สูงสุด = 1400 - 20 = 1380 -> ต้องหาร 8 ลงตัว -> 1376 (=172 x 8)
fragment 1-3: data 1376, length 1396, offset 0 / 172 / 344, MF = 1
เหลือ data = 4980 - 3 x 1376 = 852
fragment 4: data 852, length 872, offset 516, MF = 0   (รวม 4 fragments)</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>offset มีหน่วย <b>8 bytes</b> = (byte ที่ fragment เริ่มใน data เดิม) / 8</li>
<li>fragment ล่าสุด flag = 0, ตัวอื่น flag = 1; ทุก fragment มี ID เดียวกัน</li>
<li>fragment ต้องมี IP header ของตัวเอง (20 bytes) ดังนั้น data รวมของ fragments = data เดิม แต่ผลรวม length มากกว่าเดิม</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ถ้า fragment หายไปแม้ชิ้นเดียว destination ประกอบ datagram เดิมไม่ได้ และทั้ง datagram ใช้ไม่ได้. IPv6 จึงตัดการ fragment ใน router ออก</div>
` },
    { t: "IPv4 Addressing, Subnets & CIDR", html: `
<p><b>IP address</b> = identifier 32 bits ของ <b>interface</b> (จุดเชื่อมระหว่าง host/router กับ physical link) ไม่ใช่ของ host. Router มักมีหลาย interface; host มักมี 1-2 (เช่น Ethernet และ 802.11). ตัวอย่าง: 223.1.1.1 = 11011111 00000001 00000001 00000001.</p>
<h4>Subnet</h4>
<ul>
<li>address แบ่งเป็น <b>subnet part</b> (high-order bits) และ <b>host part</b> (low-order bits)</li>
<li>Subnet = กลุ่ม interface ที่มี subnet part เดียวกัน และสื่อสารถึงกันได้โดย <b>ไม่ต้องผ่าน router</b></li>
<li>วิธีหา subnet: ถอด interface ออกจาก host/router ให้เป็นเกาะเครือข่ายที่แยกกัน แต่ละเกาะคือ 1 subnet. ตัวอย่าง: 223.1.1.0/24, 223.1.2.0/24, 223.1.3.0/24 (3 subnets); subnet mask = /24; link ระหว่าง router สองตัวก็นับเป็น subnet</li>
</ul>
<h4>CIDR (Classless InterDomain Routing)</h4>
<p>Subnet portion ยาวเท่าไรก็ได้: <b>a.b.c.d/x</b> (x = จำนวน bit ของ subnet portion). เช่น 200.23.16.0/23 = 11001000 00010111 0001000<b>0</b> 00000000.</p>
<pre><code>/x  -> host bits = 32 - x
จำนวน address = 2^(32-x)
host ใช้ได้   = 2^(32-x) - 2   (ลบ network address และ broadcast address)

/24 -> 256 addr, 254 host      /25 -> 128 addr, 126 host
/26 -> 64 addr,  62 host       /23 -> 512 addr, 510 host
/20 -> 4096 addr               /30 -> 4 addr,   2 host</code></pre>
<h4>Network ได้ subnet part มาจากไหน</h4>
<p>ได้เป็นส่วนหนึ่งของ address space ของ <b>ISP</b>. ตัวอย่าง: ISP block 200.23.16.0/20 แบ่งให้ 8 องค์กร (/23 ละ 1):</p>
<table>
<tr><th>Org</th><th>Prefix</th><th>ช่วง address</th></tr>
<tr><td>0</td><td>200.23.16.0/23</td><td>200.23.16.0 - 200.23.17.255</td></tr>
<tr><td>1</td><td>200.23.18.0/23</td><td>200.23.18.0 - 200.23.19.255</td></tr>
<tr><td>2</td><td>200.23.20.0/23</td><td>200.23.20.0 - 200.23.21.255</td></tr>
<tr><td>...</td><td>...</td><td>...</td></tr>
<tr><td>7</td><td>200.23.30.0/23</td><td>200.23.30.0 - 200.23.31.255</td></tr>
</table>
<h4>Route aggregation และ more specific route</h4>
<ul>
<li><b>Hierarchical addressing</b>: Fly-By-Night-ISP ประกาศเพียง "ส่งทุกอย่างที่ขึ้นต้น 200.23.16.0/20 มาให้ฉัน" แทนการประกาศ 8 prefix</li>
<li>ถ้า Organization 1 (200.23.18.0/23) ย้ายไปใช้ ISPs-R-Us, ISPs-R-Us ประกาศ 199.31.0.0/16 <b>และ</b> 200.23.18.0/23; Internet ส่ง traffic ของ org 1 ไปหา ISPs-R-Us เพราะ <b>longest prefix match</b> (/23 ยาวกว่า /20)</li>
<li>ICANN เป็นผู้จัดสรร address block ให้ ISP, ดูแล DNS, กำหนด domain name และแก้ข้อพิพาท</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>IP address เป็นของ interface; subnet = interface ที่ใช้ prefix เดียวกันและไม่ต้องผ่าน router</li>
<li>host ใช้ได้ = 2^(32-x) - 2; ต้องการ H hosts ให้หาค่า h น้อยสุดที่ 2^h - 2 &ge; H แล้ว prefix = 32 - h</li>
<li>ตัวอย่างคำนวณ: ต้องการ 70 hosts &rarr; h = 7 (126 hosts) &rarr; /25; ถ้าใช้ /26 มีแค่ 62 ไม่พอ</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ลืมลบ 2 (network + broadcast) เป็นข้อผิดบ่อย; และ /23 ไม่ใช่ boundary ของ octet: 200.23.18.0/23 ครอบคลุมทั้ง 18.x และ 19.x</div>
` },
    { t: "DHCP", html: `
<p>Address ของ host ตั้งได้ 2 แบบ: (1) system admin ตั้งเอง (hard-coded ในไฟล์/Control Panel) (2) <b>DHCP</b> (Dynamic Host Configuration Protocol) ได้ address จาก server แบบ "plug-and-play".</p>
<h4>เป้าหมายของ DHCP</h4>
<ul>
<li>host ขอ IP address จาก server อัตโนมัติเมื่อเข้าเครือข่าย</li>
<li>ต่ออายุ (<b>renew lease</b>) address ที่ใช้อยู่ได้</li>
<li>reuse address ได้ (ถือ address เฉพาะตอนที่ connected/"on")</li>
<li>รองรับ mobile user ที่เข้าร่วมเครือข่าย</li>
</ul>
<h4>4 ขั้นตอน</h4>
<ol>
<li><b>DHCP discover</b>: host broadcast "มี DHCP server ไหม" (optional)</li>
<li><b>DHCP offer</b>: server ตอบพร้อม address ที่เสนอ (optional)</li>
<li><b>DHCP request</b>: host ขอ address ที่เลือก</li>
<li><b>DHCP ACK</b>: server ยืนยันและให้ address</li>
</ol>
<pre><code>Discover  src: 0.0.0.0, 68     dest: 255.255.255.255, 67   yiaddr: 0.0.0.0   transaction ID: 654
Offer     src: 223.1.2.5, 67   dest: 255.255.255.255, 68   yiaddr: 223.1.2.4 transaction ID: 654  lifetime: 3600 s
Request   src: 0.0.0.0, 68     dest: 255.255.255.255, 67   yiaddr: 223.1.2.4 transaction ID: 655  lifetime: 3600 s
ACK       src: 223.1.2.5, 67   dest: 255.255.255.255, 68   yiaddr: 223.1.2.4 transaction ID: 655  lifetime: 3600 s</code></pre>
<p>เหตุผล: client ยังไม่มี IP (src = 0.0.0.0) และยังไม่รู้ว่า server อยู่ที่ไหน (dest = broadcast 255.255.255.255). Server ใช้ UDP port 67, client ใช้ port 68.</p>
<h4>DHCP ให้มากกว่า IP address</h4>
<ul>
<li>address ของ <b>first-hop router</b> (default gateway)</li>
<li>ชื่อและ IP address ของ <b>DNS server</b></li>
<li><b>network mask</b> (ส่วน network เทียบกับ host)</li>
</ul>
<h4>ตัวอย่าง: laptop เข้า LAN</h4>
<ul>
<li>DHCP request ถูกห่อใน UDP, ใน IP, ใน Ethernet frame; frame ถูก <b>broadcast</b> บน LAN (dest MAC FF:FF:FF:FF:FF:FF) ไปถึง router ที่มี DHCP server</li>
<li>Router demux: Ethernet &rarr; IP &rarr; UDP &rarr; DHCP; server สร้าง DHCP ACK ที่มี IP ของ client, IP ของ first-hop router, ชื่อ+IP ของ DNS server แล้วส่งกลับ</li>
<li>จากนั้น client รู้ IP ของตัวเอง, DNS server และ default gateway แล้ว (ในตัวอย่าง Wireshark: subnet mask 255.255.255.0, router 192.168.1.1)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลำดับ: Discover &rarr; Offer &rarr; Request &rarr; ACK; Discover/Request ใช้ src 0.0.0.0 และ dest 255.255.255.255</li>
<li>UDP: server port 67, client port 68; ข้อความมี transaction ID และ lifetime</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> โดยทั่วไป Discover/Offer เป็น "optional" ได้ (เช่น client รู้ address ที่จะขอต่ออยู่แล้ว), ส่วน Request/ACK ขาดไม่ได้</div>
` },
    { t: "NAT: Network Address Translation", html: `
<p>เครือข่ายท้องถิ่น (เช่น 10.0.0.0/24) ใช้ address private ภายใน แต่ datagram ที่ออกไปข้างนอกทั้งหมดมี source IP เดียวกัน (เช่น 138.76.29.7) แต่ใช้ <b>source port ต่างกัน</b>.</p>
<div class="dg"><div class="dgt">🖼️ NAT translation (ตัวอย่าง)</div>
<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="60" width="150" height="100"/>
<text class="t b" x="85" y="85" text-anchor="middle">Host 10.0.0.1</text>
<text class="t sm" x="85" y="105" text-anchor="middle">LAN 10.0.0/24</text>
<rect class="bx hd" x="230" y="40" width="190" height="140"/>
<text class="t b" x="325" y="62" text-anchor="middle">NAT router 138.76.29.7</text>
<text class="t sm" x="325" y="90" text-anchor="middle">WAN side         LAN side</text>
<text class="t sm" x="325" y="110" text-anchor="middle">138.76.29.7, 5001 = 10.0.0.1, 3345</text>
<rect class="bx ok" x="490" y="60" width="140" height="100"/>
<text class="t b" x="560" y="90" text-anchor="middle">Server</text>
<text class="t sm" x="560" y="110" text-anchor="middle">128.119.40.186:80</text>
<line class="ln" x1="160" y1="90" x2="230" y2="90"/>
<line class="ln" x1="420" y1="90" x2="490" y2="90"/>
<text class="t sm" x="195" y="80" text-anchor="middle">S: 10.0.0.1,3345</text>
<text class="t sm" x="455" y="80" text-anchor="middle">S: 138.76.29.7,5001</text>
<text class="t sm" x="195" y="150" text-anchor="middle">D: 10.0.0.1,3345</text>
<text class="t sm" x="455" y="150" text-anchor="middle">D: 138.76.29.7,5001</text>
<line class="ln ok" x1="230" y1="130" x2="160" y2="130"/>
<line class="ln ok" x1="490" y1="130" x2="420" y2="130"/>
<text class="t sm" x="325" y="210" text-anchor="middle">ขาออก: แปลง source | ขาเข้า: แปลง destination กลับ</text>
</svg></div>
<h4>แรงจูงใจ</h4>
<ul>
<li>ใช้ IP address เดียวสำหรับทุกอุปกรณ์ ไม่ต้องขอ range จาก ISP</li>
<li>เปลี่ยน address ของอุปกรณ์ภายในได้โดยไม่ต้องบอกโลกภายนอก</li>
<li>เปลี่ยน ISP ได้โดยไม่ต้องเปลี่ยน address ภายใน</li>
<li>อุปกรณ์ภายใน <b>ไม่ถูก address ได้โดยตรง/มองไม่เห็นจากภายนอก</b> (ข้อดีด้านความปลอดภัย)</li>
</ul>
<h4>NAT router ต้องทำ 3 อย่าง</h4>
<ol>
<li><b>Outgoing</b>: แทน (source IP, port) เป็น (NAT IP, new port)</li>
<li><b>จำ</b> pair ใน NAT translation table</li>
<li><b>Incoming</b>: แทน (NAT IP, new port) ใน dest field ด้วย (source IP, port) เดิมจากตาราง</li>
</ol>
<pre><code>1: host 10.0.0.1 ส่งไป 128.119.40.186:80          S: 10.0.0.1, 3345      D: 128.119.40.186, 80
2: NAT แปลง source + บันทึกตาราง                   S: 138.76.29.7, 5001   D: 128.119.40.186, 80
   ตาราง: WAN 138.76.29.7, 5001  <->  LAN 10.0.0.1, 3345
3: reply มาถึง                                      S: 128.119.40.186, 80  D: 138.76.29.7, 5001
4: NAT แปลง dest กลับ                               S: 128.119.40.186, 80  D: 10.0.0.1, 3345</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>port field 16 bits &rarr; รองรับ ~<b>60,000</b> connection พร้อมกันด้วย address เดียว</li>
<li>เหตุที่ NAT ถูกวิจารณ์: router ควรประมวลผลถึง layer 3 เท่านั้น (NAT แตะ port = layer 4), ปัญหา address ขาดควรแก้ด้วย IPv6, <b>ขัด end-to-end argument</b>, ต้องคิดถึงตอนออกแบบ application เช่น P2P</li>
<li><b>NAT traversal</b>: ปัญหาเมื่อ client ภายนอกอยากต่อเข้า server หลัง NAT</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ถ้ามี packet ขาเข้าที่ไม่มี entry ในตาราง (ไม่มีใครภายในเริ่มคุยก่อน) NAT ไม่รู้ว่าจะส่งให้ใคร จึงทิ้ง &rarr; server ภายใน LAN ที่อยากให้คนข้างนอกเข้าถึงต้องมี entry ตั้งไว้ล่วงหน้า (static/port forwarding)</div>
` },
    { t: "IPv6 & Transition (Tunneling)", html: `
<h4>เหตุผลที่มี IPv6</h4>
<ul>
<li>แรงจูงใจแรก: address space 32-bit ใกล้ถูกจัดสรรหมด</li>
<li>เพิ่มเติม: header format ที่ช่วยให้ประมวลผล/forward เร็ว และ header เปลี่ยนเพื่อรองรับ QoS</li>
</ul>
<h4>IPv6 datagram format</h4>
<ul>
<li>header <b>ความยาวคงที่ 40 bytes</b></li>
<li><b>ไม่อนุญาตให้ fragment</b> (ใน router ระหว่างทาง)</li>
<li>fields: <b>ver</b>, <b>priority</b> (ระบุความสำคัญระหว่าง datagram ใน flow), <b>flow label</b> (ระบุ datagram ใน "flow" เดียวกัน; แนวคิด flow ยังไม่ชัดเจน), <b>payload len</b>, <b>next header</b> (ระบุ upper layer protocol), <b>hop limit</b>, source address (128 bits), destination address (128 bits), data</li>
</ul>
<h4>ต่างจาก IPv4 อย่างไร</h4>
<table>
<tr><th>เรื่อง</th><th>IPv4</th><th>IPv6</th></tr>
<tr><td>Address</td><td>32 bits</td><td>128 bits</td></tr>
<tr><td>Header</td><td>20 bytes + options</td><td>40 bytes คงที่</td></tr>
<tr><td>Checksum</td><td>มี (ต้องคำนวณใหม่ทุก hop เพราะ TTL เปลี่ยน)</td><td><b>ตัดออก</b> เพื่อลดเวลาประมวลผลต่อ hop</td></tr>
<tr><td>Options</td><td>ใน header</td><td>อยู่นอก header ชี้ด้วย Next Header</td></tr>
<tr><td>Fragmentation</td><td>router แบ่งได้</td><td>ไม่อนุญาต; ส่ง ICMPv6 "Packet Too Big"</td></tr>
<tr><td>ICMP</td><td>ICMP</td><td>ICMPv6: เพิ่ม message type และ multicast group management</td></tr>
</table>
<h4>Transition: ไม่มี "flag day"</h4>
<p>ทุก router อัปเกรดพร้อมกันไม่ได้ จึงใช้ <b>tunneling</b>: IPv6 datagram ถูกบรรทุกเป็น <b>payload ของ IPv4 datagram</b> ระหว่าง IPv4 router.</p>
<pre><code>เส้นทาง A - B - C - D - E - F   (B, E เป็น IPv6; C, D เป็น IPv4 เท่านั้น)

A -> B   IPv6:           Src A, Dst F, flow X, data
B -> C   IPv4 ห่อ IPv6:  [IPv4 src B, dst E]  [IPv6 src A, dst F, flow X]  data
C -> D   เหมือนเดิม (C, D forward ตาม IPv4 dst = E)
E -> F   E แกะ IPv4 ออก ส่ง IPv6 ต่อ: Src A, Dst F, flow X</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>IPv6: 40 bytes, 128-bit address, ไม่มี checksum, ไม่ fragment ใน router, options ผ่าน next header</li>
<li>Tunnel เริ่ม/จบที่ router IPv6; router IPv4 ตรงกลางมองเห็นแค่ IPv4 header (src = ปลายอุโมงค์ต้นทาง, dst = ปลายอุโมงค์ปลายทาง)</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> การ deploy IPv6 ใช้เวลานานมาก (20 ปีและยังไม่จบ ณ ช่วงที่เขียนตำรา: Google ราว 8% ของ client ใช้ IPv6; NIST ราว 1/3 ของโดเมนรัฐบาลสหรัฐฯ รองรับ IPv6) เพราะต้องเปลี่ยนที่ network layer ซึ่งอยู่ลึกกว่าการเปลี่ยนที่ application</div>
` },
    { t: "Generalized Forwarding, SDN & OpenFlow", html: `
<p>แต่ละ router มี <b>flow table</b> ที่คำนวณและแจกจ่ายโดย <b>logically centralized routing controller</b> (control plane อยู่ใน remote controller; data plane อยู่ที่ router/switch).</p>
<h4>OpenFlow data plane abstraction</h4>
<ul>
<li><b>Flow</b> นิยามด้วย header fields; generalized forwarding = กฎจัดการ packet แบบง่าย</li>
<li><b>Pattern (match)</b>: ค่าใน header fields (wildcard * ได้)</li>
<li><b>Actions</b>: drop, forward, modify, หรือส่ง matched packet ไป controller</li>
<li><b>Priority</b>: แก้ความกำกวมเมื่อ pattern ซ้อนกัน</li>
<li><b>Counters</b>: จำนวน bytes และ packets</li>
</ul>
<p>Entry ประกอบด้วย Rule (match), Action, Stats. Header ที่ match ได้: Switch Port, VLAN ID, MAC src/dst, Eth type (link layer), IP src/dst/protocol (network layer), TCP/UDP sport/dport (transport layer). Actions: forward ไป port, encapsulate แล้วส่ง controller, drop, ส่งเข้า normal processing pipeline, modify fields.</p>
<h4>ตัวอย่าง rule</h4>
<pre><code>1. src=1.2.*.*, dest=3.4.5.*       -> drop
2. src=*.*.*.*, dest=3.4.*.*       -> forward(2)
3. src=10.1.2.3, dest=*.*.*.*      -> send to controller

Destination-based forwarding: IP Dst = 51.6.0.8            -> forward port 6
Firewall (block ssh):         TCP dport = 22                -> drop
Block a host:                 IP Src = 128.119.1.1          -> drop
Layer 2 forwarding:           MAC src = 22:A7:23:11:E1:02   -> forward port 3</code></pre>
<h4>match+action รวมอุปกรณ์หลายชนิด</h4>
<table>
<tr><th>อุปกรณ์</th><th>match</th><th>action</th></tr>
<tr><td>Router</td><td>longest destination IP prefix</td><td>forward out a link</td></tr>
<tr><td>Switch</td><td>destination MAC address</td><td>forward or flood</td></tr>
<tr><td>Firewall</td><td>IP addresses + TCP/UDP port</td><td>permit or deny</td></tr>
<tr><td>NAT</td><td>IP address + port</td><td>rewrite address and port</td></tr>
</table>
<h4>ตัวอย่าง OpenFlow (3 switch s1, s2, s3)</h4>
<p>ต้องการให้ datagram จาก h5 (10.3.0.5) และ h6 (10.3.0.6) ไป h3 (10.2.0.3) หรือ h4 (10.2.0.4) ผ่าน s1 แล้วไป s2:</p>
<pre><code>s3:  match IP Src=10.3.*.*, IP Dst=10.2.*.*                         -> forward(3)   (ส่งไป s1)
s1:  match ingress port=1, IP Src=10.3.*.*, IP Dst=10.2.*.*          -> forward(4)   (ส่งไป s2)
s2:  match ingress port=2, IP Dst=10.2.0.3                           -> forward(3)   (ไป h3)
s2:  match ingress port=2, IP Dst=10.2.0.4                           -> forward(4)   (ไป h4)</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Flow table entry = Pattern + Actions + Priority + Counters</li>
<li>Destination-based forwarding ดูแค่ dest IP; Generalized forwarding ดูได้หลาย layer (L2/L3/L4) พร้อมกัน</li>
<li>Forwarding table / flow table ถูกคำนวณโดย <b>control plane</b></li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> เมื่อ packet match หลายกฎ ผลขึ้นกับ <b>priority</b> ไม่ใช่ลำดับในตาราง และไม่ใช่ prefix ยาวสุดเสมอไป (longest prefix เป็นเพียง match ของ router)</div>
` }
  ],
  ex: [
    { type: "choice",
      story: "Router R มี forwarding table ดังนี้ (CIDR):<pre><code>200.23.16.0/20  -> interface 0\n200.23.18.0/23  -> interface 1\n200.23.18.64/26 -> interface 2\n0.0.0.0/0       -> interface 3</code></pre>มี datagram ที่ destination IP = 200.23.18.77 เข้ามา",
      q: "Router จะส่ง datagram นี้ออก interface ใด และเพราะอะไร",
      opts: [
        { t: "interface 0 เพราะเป็น prefix ที่ครอบคลุม address กว้างที่สุด", why: "ผิด: กฎคือ longest prefix match ไม่ใช่ prefix กว้างสุด" },
        { t: "interface 1 เพราะ 200.23.18.77 อยู่ใน 200.23.18.0/23 และมาก่อน /26 ในตาราง", why: "ผิด: ลำดับในตารางไม่สำคัญ แม้อยู่ใน /23 ก็ตาม แต่ยังมีรายการที่ยาวกว่า" },
        { t: "interface 2 เพราะ 77 อยู่ในช่วง 64-127 ของ 200.23.18.64/26 ซึ่งเป็น prefix ที่ match และยาวที่สุด (26 bits)", why: "ถูก: match ทั้ง /20, /23 และ /26 -> เลือก /26" },
        { t: "interface 3 เพราะ default route ใช้เมื่อ address อยู่ใน subnet ภายใน", why: "ผิด: default ใช้เมื่อไม่มี prefix อื่น match เลย แต่ที่นี่มี" }
      ], ans: 2 },
    { type: "choice",
      story: "Host A ส่ง IP datagram ขนาดรวม 5000 bytes (header 20 bytes ไม่มี options) ผ่านลิงก์ที่ MTU = 1400 bytes. Router แบ่ง datagram เป็น fragment โดยแต่ละ fragment ที่ไม่ใช่ชิ้นสุดท้ายบรรทุก data มากที่สุดเท่าที่ทำได้ (ต้องหาร 8 ลงตัว).",
      q: "fragment ชิ้นสุดท้ายมีค่า length, MF flag และ offset เป็นเท่าใด",
      opts: [
        { t: "length = 872, MF = 1, offset = 516", why: "ผิด: ชิ้นสุดท้ายต้อง MF = 0" },
        { t: "length = 872, MF = 0, offset = 516", why: "ถูก: data ต่อชิ้น 1376 (=172x8) x3 = 4128; เหลือ 4980-4128 = 852; length = 852+20 = 872; offset = 4128/8 = 516" },
        { t: "length = 892, MF = 0, offset = 516", why: "ผิด: เอา header 20 บวกซ้ำสองรอบ data จริงเหลือแค่ 852" },
        { t: "length = 872, MF = 0, offset = 4128", why: "ผิด: offset ต้องมีหน่วย 8 bytes ไม่ใช่ bytes" }
      ], ans: 1 },
    { type: "choice",
      story: "Router มี input port 1, 2, 3 และ output port A, B. ณ เวลา t หัวคิวของ input 1 และ input 2 ต่างมี packet ที่ต้องไป output A. Fabric ส่งได้ทีละ 1 packet ต่อ output ต่อ packet time และเลือกส่งจาก input 1. packet ถัดมาในคิว input 2 (หลังหัวคิว) ต้องไป output B ซึ่งว่างอยู่",
      q: "เกิดอะไรขึ้นกับ packet ที่ต้องไป output B ใน input 2",
      opts: [
        { t: "ถูกส่งไป B ทันทีเพราะ fabric ส่งแบบขนานได้เสมอ", why: "ผิด: input queue เป็น FIFO หัวคิวยังไม่ถูกส่ง packet ข้างหลังเลยออกไม่ได้" },
        { t: "ถูกทิ้งเพราะ output A ไม่ว่าง", why: "ผิด: ไม่ถูกทิ้งแค่รอ (จะ loss ก็ต่อเมื่อ buffer เต็ม)" },
        { t: "ถูกขวางรอหลังหัวคิวที่ติด output contention ทั้งที่ B ว่าง เรียกว่า HOL blocking", why: "ถูก: Head-of-the-Line blocking" },
        { t: "router ย้ายไป output port buffer ของ B ก่อนเพื่อลด delay", why: "ผิด: packet อยู่ที่ input queue ต้องผ่าน fabric ตามลำดับคิว" }
      ], ans: 2 },
    { type: "choice",
      story: "NAT router มี WAN address 138.76.29.7 และ NAT translation table ปัจจุบัน:<pre><code>WAN side             LAN side\n138.76.29.7, 5001    10.0.0.2, 4000\n138.76.29.7, 5002    10.0.0.3, 4000</code></pre>Host สองเครื่องใช้ source port 4000 เหมือนกันคุยกับ server 93.184.216.34 port 443. มี reply จาก server เข้ามาที่ NAT: S = 93.184.216.34:443, D = 138.76.29.7:5002",
      q: "NAT จะเขียน destination ของ datagram นี้ใหม่เป็นอะไร",
      opts: [
        { t: "10.0.0.2:4000", why: "ผิด: 10.0.0.2 ถูกแมปกับ port 5001 ไม่ใช่ 5002" },
        { t: "10.0.0.3:4000", why: "ถูก: ค้นตารางด้วย (138.76.29.7, 5002) -> (10.0.0.3, 4000)" },
        { t: "10.0.0.3:5002", why: "ผิด: NAT คืน port เดิมของ host ด้วย ไม่ใช่ port ที่ NAT ออกให้" },
        { t: "broadcast ทั้ง LAN เพราะไม่ทราบว่าเป็นของ host ใด", why: "ผิด: มี entry ชัดเจน NAT ไม่ broadcast" }
      ], ans: 1 },
    { type: "choice",
      story: "ผู้ดูแลตั้ง web server ที่ 10.0.0.4 port 80 หลัง NAT router (WAN IP 138.76.29.7). พนักงานใน LAN เปิดเว็บได้ปกติ แต่ผู้ใช้จากอินเทอร์เน็ตเปิด http://138.76.29.7 แล้ว connection timeout. ทั้งสองฝั่งไม่มี firewall ตัวอื่น",
      q: "สาเหตุและวิธีแก้ที่เหมาะสมที่สุดคือข้อใด",
      opts: [
        { t: "web server ต้องเปลี่ยนไปใช้ IPv4 address ที่เป็น public ให้ NAT router ตัวเดียวกันเสมอ", why: "ผิด: ไม่ใช่ปัญหา address type; ปัญหาคือไม่มี mapping" },
        { t: "datagram ขาเข้าไม่มี entry ใน NAT translation table (ไม่มีใครภายในเริ่มคุย) NAT จึงทิ้ง; ต้องตั้ง static entry/port forwarding 138.76.29.7:80 -> 10.0.0.4:80", why: "ถูก: NAT traversal ปัญหาเมื่อ client ภายนอกเข้า server หลัง NAT" },
        { t: "ปัญหาอยู่ที่ MTU ต้องเปิด fragmentation ที่ NAT", why: "ผิด: ถ้าเป็น MTU คนใน LAN ก็น่าจะเจอ และไม่ใช่อาการ timeout ทุกครั้งของ SYN" },
        { t: "ต้องปิด checksum ใน IP header ของ web server เพราะ NAT แก้ header", why: "ผิด: IPv4 ต้องมี checksum NAT คำนวณใหม่เอง ไม่เกี่ยวกับ timeout นี้" }
      ], ans: 1 },
    { type: "choice",
      story: "Laptop ต่อเข้า Wi-Fi/LAN ใหม่ โดยยังไม่มี IP address แล้วส่ง DHCP discover ออกมา:<pre><code>src: 0.0.0.0, port 68\ndest: 255.255.255.255, port 67\ntransaction ID: 654</code></pre>",
      q: "ทำไม discover จึงใช้ src 0.0.0.0 และ dest 255.255.255.255",
      opts: [
        { t: "laptop ยังไม่มี IP ของตัวเอง และยังไม่รู้ว่า DHCP server อยู่ที่ไหน จึงต้อง broadcast ภายใน subnet นี้", why: "ถูก" },
        { t: "เพื่อให้ NAT router แปลง address ให้ภายหลัง", why: "ผิด: ไม่เกี่ยวกับ NAT" },
        { t: "เพราะ DHCP ใช้ TCP และต้องการ three-way handshake แบบ broadcast", why: "ผิด: DHCP ใช้ UDP (port 67/68)" },
        { t: "เพราะ client ใช้ port 67 ส่งแล้ว server ตอบ port 68 ให้ตรงกับ port ปลายทางเดียวกัน", why: "ผิด: client ใช้ source port 68 และ server ใช้ 67 ตรงกันข้ามกับที่ข้อนี้บอก" }
      ], ans: 0 },
    { type: "choice",
      story: "ฝ่ายไอทีต้องจัดสรร subnet สำหรับแผนกที่มีเครื่อง 70 เครื่อง (ต้องการ address ให้ทุกเครื่องและต้องเผื่อ network/broadcast address) จาก block 192.168.5.0/24 โดยใช้ subnet ที่เล็กที่สุดที่เพียงพอ",
      q: "ควรใช้ prefix ใดและช่วง host ที่ใช้ได้ของ subnet แรกคือเท่าใด",
      opts: [
        { t: "/26 : 192.168.5.1 - 192.168.5.62", why: "ผิด: /26 ใช้ได้ 62 host ไม่พอสำหรับ 70" },
        { t: "/24 : 192.168.5.1 - 192.168.5.254", why: "ผิด: ใหญ่เกินจำเป็นแม้จะเพียงพอ ไม่ใช่เล็กที่สุด" },
        { t: "/25 : 192.168.5.1 - 192.168.5.126 (broadcast 192.168.5.127)", why: "ถูก: 2^7 - 2 = 126 >= 70; /26 ได้แค่ 62" },
        { t: "/27 : 192.168.5.1 - 192.168.5.30", why: "ผิด: /27 ได้ 30 host เท่านั้น" }
      ], ans: 2 },
    { type: "choice",
      story: "ลิงก์ core ของ router มี C = 10 Gbps และ RTT ทั่วไป = 250 ms. มี flow ที่ผ่านลิงก์พร้อมกัน N = 10,000 flows. ใช้คำแนะนำล่าสุดสำหรับขนาด buffer เมื่อมีหลาย flow",
      q: "ขนาด buffer ที่ output port ควรเป็นประมาณเท่าใด",
      opts: [
        { t: "2.5 Gbit", why: "ผิด: นี่คือ RTT x C (rule of thumb เดิม) ยังไม่ได้หารด้วย sqrt(N)" },
        { t: "250 Mbit", why: "ผิด: ไม่ใช่สูตร (เหมือนหารด้วยเลขสุ่ม 10)" },
        { t: "25 Mbit", why: "ถูก: RTT x C / sqrt(N) = 2.5 Gbit / 100 = 25 Mbit" },
        { t: "0.25 Mbit", why: "ผิด: เป็นการหารด้วย N (10,000) ไม่ใช่ sqrt(N)" }
      ], ans: 2 },
    { type: "choice",
      story: "เครือข่ายใช้ IPv6 เป็นเกาะ ๆ มี IPv4 router (C, D) คั่นกลางระหว่าง IPv6 router B และ E. Host A (IPv6) ส่ง datagram ถึง F (IPv6) ผ่านเส้นทาง A-B-C-D-E-F โดยใช้ tunnel B ถึง E",
      q: "datagram ที่เดินทางจาก B ไป C มีหน้าตาอย่างไร และ C ใช้ฟิลด์ใด forward",
      opts: [
        { t: "IPv6 อย่างเดียว src A dst F; C forward ตาม IPv6 dst เพราะรองรับ IPv6 แบบ backward-compatible", why: "ผิด: C เป็น IPv4-only ไม่เข้าใจ IPv6 header" },
        { t: "IPv4 header (src B, dst E) ห่อ IPv6 datagram (src A, dst F); C forward ตาม IPv4 dst = E", why: "ถูก: tunneling; IPv6 เป็น payload ของ IPv4" },
        { t: "IPv4 header (src A, dst F) ห่อ IPv6; C forward ตาม dst F", why: "ผิด: A, F เป็น IPv6 address ใส่ใน IPv4 header ไม่ได้ (128 bit vs 32 bit)" },
        { t: "IPv6 header ซ้อน IPv6 header (src B, dst E) ; C แปลงเป็น IPv4 ก่อน forward", why: "ผิด: tunnel ใช้ IPv4 เป็นตัวห่อ ไม่ใช่ IPv6 ซ้อน และ C ไม่แปลง" }
      ], ans: 1 },
    { type: "choice",
      story: "OpenFlow switch มี flow table (priority มากกว่า = สำคัญกว่า):<pre><code>R1 prio 30: src=1.2.*.*,  dst=3.4.5.*   -> drop\nR2 prio 10: src=*.*.*.*,  dst=3.4.*.*   -> forward(2)\nR3 prio 20: src=10.1.2.3, dst=*.*.*.*   -> send to controller</code></pre>Packet: src = 10.1.2.3, dst = 3.4.5.9",
      q: "switch จะทำ action ใด",
      opts: [
        { t: "drop เพราะ dst อยู่ใน 3.4.5.*", why: "ผิด: R1 ต้อง match src=1.2.*.* ด้วย แต่ src เป็น 10.1.2.3" },
        { t: "forward(2) เพราะ dst match 3.4.*.* และ R2 เป็น forwarding rule", why: "ผิด: R2 match จริงแต่ priority ต่ำกว่า R3" },
        { t: "ทั้ง forward(2) และ send to controller พร้อมกัน", why: "ผิด: ใช้เฉพาะกฎที่ priority สูงสุดที่ match" },
        { t: "send to controller เพราะ R2 และ R3 match แต่ R3 priority สูงกว่า", why: "ถูก" }
      ], ans: 3 },
    { type: "multi",
      story: "Router ตัวหนึ่งต้องรองรับ 8 input port ที่แต่ละตัว line rate 10 Gbps",
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับสถาปัตยกรรม router",
      opts: [
        { t: "ต้องการ switching rate ราว 80 Gbps (N เท่าของ line rate) เพื่อไม่ให้ fabric เป็นคอขวด", ok: true, why: "N inputs ต้องการ N x line rate" },
        { t: "bus 32 Gbps แบบ shared ไม่พอสำหรับกรณีนี้เพราะมี bus contention", ok: true, why: "80 > 32 Gbps; bus จำกัดด้วย bandwidth" },
        { t: "crossbar/interconnection network ช่วยได้เพราะโอน cell แบบขนานได้ ไม่ต้องใช้ bus เดียว", ok: true, why: "ออกแบบมาเอาชนะข้อจำกัด bus" },
        { t: "Memory switching (CPU copy) ใช้ memory bus แค่ครั้งเดียวต่อ datagram จึงเร็วที่สุด", ok: false, why: "ต้องข้าม bus 2 ครั้งต่อ datagram และเป็นรุ่นแรกที่ช้า" },
        { t: "HOL blocking เกิดที่ output port เมื่อ buffer เต็ม", ok: false, why: "HOL blocking เกิดที่ input queue" },
        { t: "Lookup/forwarding ที่ input port ใช้ routing algorithm คำนวณทุก packet แบบ software ระดับ millisecond", ok: false, why: "forwarding เป็น hardware ระดับ ns ใช้ตารางที่ control plane เตรียมไว้" }
      ] },
    { type: "multi",
      story: "บ้านหนึ่งใช้ NAT router (WAN IP เดียว) ให้อุปกรณ์ 10.0.0.0/24 หลายเครื่องออกอินเทอร์เน็ต",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ขาออก NAT เปลี่ยน (source IP, port) เป็น (NAT IP, new port) และจดลง translation table", ok: true, why: "หน้าที่หลัก" },
        { t: "ขาเข้า NAT ต้องดู destination (NAT IP, port) แล้วแปลงกลับด้วยตาราง", ok: true, why: "ถ้าไม่มี entry ไม่มีที่ไปให้" },
        { t: "port 16 bits ทำให้รองรับ connection พร้อมกันราว 60,000 ด้วย IP เดียว", ok: true, why: "ประมาณการมาตรฐานของ NAT" },
        { t: "อุปกรณ์ภายในถูกมองจากภายนอกได้โดยตรง จึงเป็นข้อเสียด้านความปลอดภัย", ok: false, why: "ตรงกันข้าม: มองไม่เห็นโดยตรงเป็นข้อดีด้านความปลอดภัย" },
        { t: "NAT ทำให้ต้องขอ IP block จาก ISP ใหญ่ขึ้นตามจำนวนอุปกรณ์", ok: false, why: "ตรงกันข้าม ใช้ address เดียวพอ" },
        { t: "NAT ขัด end-to-end argument และเป็นปัญหากับ P2P application", ok: true, why: "ข้อวิจารณ์ NAT" }
      ] },
    { type: "blank",
      story: "ISP ได้รับ block 200.23.16.0/20 และแบ่งให้องค์กรเป็น subnet ขนาด /23",
      text: "block /20 แบ่งเป็น /23 ได้ {1} subnet; แต่ละ subnet มี address ทั้งหมด {2} ตัว (ใช้เป็น host ได้ {3} ตัว); Organization 3 ได้ prefix {4}",
      blanks: [
        { opts: ["4", "8", "16", "32"], ans: 1, why: "จำนวน subnet = 2^(23-20) = 8" },
        { opts: ["256", "512", "1024", "128"], ans: 1, why: "2^(32-23) = 2^9 = 512" },
        { opts: ["512", "511", "510", "508"], ans: 2, why: "512 - 2 (network + broadcast) = 510" },
        { opts: ["200.23.20.0/23", "200.23.21.0/23", "200.23.22.0/23", "200.23.24.0/23"], ans: 2, why: "org0=16, org1=18, org2=20, org3=22 (เพิ่มทีละ 2 ในไบต์ที่สาม)" }
      ] },
    { type: "blank",
      story: "เปรียบเทียบ IPv6 กับ IPv4 เพื่อเขียนรายงานการย้ายระบบ",
      text: "IPv6 header มีความยาวคงที่ {1} bytes และ address ยาว {2} bits; ฟิลด์ที่ถูกตัดออกทั้งหมดเพื่อลดเวลาประมวลผลต่อ hop คือ {3}; router ระหว่างทางไม่อนุญาตให้ทำ {4}",
      blanks: [
        { opts: ["20", "32", "40", "64"], ans: 2, why: "fixed-length 40 bytes" },
        { opts: ["64", "96", "128", "256"], ans: 2, why: "128-bit source/destination address" },
        { opts: ["TTL/hop limit", "header checksum", "next header", "flow label"], ans: 1, why: "checksum ถูกตัดออก ส่วน hop limit ยังอยู่" },
        { opts: ["tunneling", "fragmentation", "forwarding", "multicast"], ans: 1, why: "ไม่อนุญาต fragmentation ใน router (ส่ง ICMPv6 Packet Too Big)" }
      ] },
    { type: "blank",
      story: "Output port ของ router มี 2 class: class A (priority สูง) มี packet a1 a2 a3 และ class B มี packet b1 ในคิวพร้อมกัน",
      text: "ถ้าใช้ priority scheduling ลำดับส่งคือ {1}; ถ้าใช้ Round Robin ลำดับส่งคือ {2}; ส่วน {3} คือ Round Robin ที่แต่ละ class ได้บริการตามน้ำหนักในแต่ละรอบ",
      blanks: [
        { opts: ["a1 b1 a2 a3", "a1 a2 a3 b1", "b1 a1 a2 a3", "a1 a2 b1 a3"], ans: 1, why: "class สูงสุดที่มีคิวส่งก่อนจนหมด" },
        { opts: ["a1 a2 a3 b1", "b1 a1 a2 a3", "a1 b1 a2 a3", "a1 a2 b1 a3"], ans: 2, why: "RR วน 1 packet ต่อ class: a1, b1, a2, a3 (B หมดแล้ว)" },
        { opts: ["FIFO", "WFQ", "tail drop", "TCAM"], ans: 1, why: "Weighted Fair Queueing = generalized RR" }
      ] },
    { type: "match",
      q: "จับคู่คำศัพท์กับความหมายที่ถูกต้อง",
      pairs: [
        ["Data plane", "forwarding แบบ local ต่อ router ระดับ nanosecond (hardware)"],
        ["Control plane", "ตรรกะระดับ network-wide กำหนดเส้นทาง (routing algorithm / SDN controller)"],
        ["TCAM", "ค้น longest prefix match ใน 1 clock cycle ไม่ขึ้นกับขนาดตาราง"],
        ["HOL blocking", "packet หัวคิว input ที่ติด contention ขวาง packet ข้างหลัง"],
        ["DHCP ACK", "ยืนยัน IP พร้อม first-hop router, DNS server และ lease time"]
      ],
      why: "แต่ละคำเป็นกลไกหรือแนวคิดคนละส่วนของ network layer: data/control plane แยกตามขอบเขตและความเร็ว, TCAM ใช้ใน input port lookup, HOL blocking เป็นปัญหา input queue, DHCP ACK คือขั้นสุดท้ายของการขอ address" }
  ]
});
