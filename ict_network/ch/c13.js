IOT.reg({
  id: "c13",
  title: "IPv6",
  th: "ทำไมต้อง IPv6, base/extension header, รูปแบบและชนิดของ address, EUI-64, NDP, SLAAC/DHCPv6, static route และ OSPFv3",
  summary: `
<ul>
<li><b>สาเหตุ</b>: IANA แจก IPv4 block สุดท้ายเมื่อ 3 ก.พ. 2011; NAT และ CIDR แค่ชะลอการหมด ไม่ได้แก้ที่ต้นเหตุ; 5 RIR = RIPE, LACNIC, ARIN, AFRINIC, APNIC</li>
<li><b>IPv6 address = 128 bit</b> (IPv4 = 32 bit), เขียนเป็น hex 8 กลุ่ม กลุ่มละ 16 bit คั่นด้วย <code>:</code>; prefix 64 bit + interface ID 64 bit สำหรับ unicast</li>
<li><b>ข้อดี</b>: address มหาศาล, hierarchical (aggregate ได้), plug-and-play (SLAAC), end-to-end (ไม่ต้อง NAT), IPsec ออกแบบมาด้วย, extension header, mobility ดีขึ้น, Flow Label สำหรับ QoS</li>
<li><b>Base header ยาวคงที่ 40 bytes มี 8 ฟิลด์</b>: Version(4 bit, =6), Traffic Class(8), Flow Label(20), Payload Length(16), Next Header(8), Hop Limit(8), Source(128), Destination(128)</li>
<li>ที่ตัดออกจาก IPv4: Header Length, Total Length (เป็น Payload Length), Identification/Flags/Fragment Offset (ไปอยู่ Fragment header), <b>Checksum</b>, Options; TTL เปลี่ยนชื่อเป็น <b>Hop Limit</b>; Protocol เปลี่ยนเป็น <b>Next Header</b></li>
<li><b>Next Header</b>: 6 = TCP, 17 = UDP, 58 = ICMPv6; extension: 0 Hop-by-Hop, 60 Destination Options, 43 Routing, 44 Fragment, 51 AH, 50 ESP, 59 No next header</li>
<li>Router ไม่ประมวลผล extension header ระหว่างทาง ยกเว้น <b>Hop-by-Hop options</b></li>
<li><b>ย่อ address</b>: ตัด 0 นำหน้าในแต่ละกลุ่มได้; ใช้ <code>::</code> แทนกลุ่ม 0 ที่ติดกันตั้งแต่ 2 กลุ่มขึ้นไป ได้ <b>เพียงครั้งเดียว</b> ต่อ address</li>
<li><b>ชนิด</b>: unicast, multicast, anycast; <b>ไม่มี broadcast</b> (ใช้ multicast แทน)</li>
<li><b>Prefix สำคัญ</b>: GUA <code>2000::/3</code>, ULA <code>FC00::/7</code> (ใช้จริง <code>FD00::/8</code>), Link-local <code>FE80::/10</code>, Multicast <code>FF00::/8</code>, doc <code>2001:DB8::/32</code>, unspecified <code>::/128</code>, loopback <code>::1/128</code></li>
<li><b>EUI-64</b>: แทรก <code>FFFE</code> ตรงกลาง MAC แล้ว <b>กลับบิตที่ 7</b> (U/L bit) ของ byte แรก; ข้อเสีย: เดา MAC จาก IPv6 ได้</li>
<li><b>Multicast</b> <code>FF</code> + flags(4) + scope(4) + reserved 80 bit (=0) + group ID 32 bit; scope: 1 interface, 2 link, 5 site, 8 organization, E global</li>
<li>Well-known: all nodes <code>FF02::1</code>, all routers <code>FF02::2</code>, OSPF <code>FF02::5</code>, OSPF DR <code>FF02::6</code>, RIP <code>FF02::9</code>, DHCPv6 servers/relays <code>FF02::1:2</code></li>
<li><b>Solicited-node multicast</b> = <code>FF02::1:FF</code> + 24 bit ท้ายของ unicast/anycast address (/104); ใช้ทำ address resolution และ DAD</li>
<li><b>Anycast</b>: unicast address เดียวกันตั้งบนหลาย interface ส่งถึงตัว "ใกล้สุด" (routing cost ต่ำสุด) ได้ redundancy + latency ต่ำ</li>
<li><b>NDP</b> (ICMPv6) แทน ARP: RS=133, RA=134, NS=135, NA=136; หน้าที่: address resolution (NS/NA), DAD (NS/NA), prefix advertisement/SLAAC (RS/RA)</li>
<li>ลำดับบน interface: address configuration, DAD, address resolution, forward data</li>
<li><b>RA flags</b>: M=0,O=0 → SLAAC (stateless); M=1 → ขอ address จาก DHCPv6 (stateful); O=1 → ขอ DNS ฯลฯ จาก DHCPv6; M=0,O=1 ไม่มีความหมายในที่นี้</li>
<li><b>RS</b> ส่งไป <code>FF02::2</code>; <b>RA</b> ส่งไป <code>FF02::1</code> (หรือ unicast ตอบ RS); DHCPv6 Solicit ส่งไป <code>FF02::1:2</code></li>
<li>Huawei: RA ถูก <b>halt เป็นค่าเริ่มต้น</b> ต้อง <code>undo ipv6 nd ra halt</code>; stateful ใช้ <code>ipv6 nd autoconfig managed-address-flag</code> และ <code>other-flag</code></li>
<li><b>Static route</b>: <code>ipv6 route-static 2018:6:8:: 64 2018:6:7::2</code>; default route = <code>ipv6 route-static :: 0 &lt;next-hop&gt;</code></li>
<li><b>OSPFv3</b>: <code>ospfv3 1</code> + <code>router-id</code> (ต้องตั้งเอง) แล้วเปิดที่ interface <code>ospfv3 1 area 0</code>; ใช้ link-local เป็น source/next hop</li>
</ul>`,
  sections: [
    {
      t: "13.1 ทำไมต้อง IPv6: ปัญหาของ IPv4 และข้อดีของ IPv6",
      ref: "หน้า 418-421",
      html: `
<h4>IPv4 กำลังเจอทางตัน</h4>
<p>วันที่ <b>3 กุมภาพันธ์ 2011</b> IANA ประกาศแจก IPv4 block สุดท้าย (ราว 4.68 ล้าน address) เท่า ๆ กันให้ 5 RIR (Regional Internet Registry) หลังจากนั้น IANA ไม่มี IPv4 เหลือให้แจกอีก และปัจจุบัน RIR ทั้ง 5 ก็แจกหมดแล้วเช่นกัน</p>
<figure><img src="i/p419_1.webp" alt="การแจก IPv4 block สุดท้ายของ IANA ให้ RIR ทั้ง 5" loading="lazy"><figcaption>Fig. 13.1 Assignment of the final IPv4 addresses (IANA แจก block สุดท้ายให้ RIR)</figcaption></figure>
<table>
<tr><th>RIR</th><th>ดูแลภูมิภาค</th></tr>
<tr><td>RIPE</td><td>ยุโรป ตะวันออกกลาง เอเชียกลาง</td></tr>
<tr><td>LACNIC</td><td>อเมริกากลาง/ใต้ และแคริบเบียน</td></tr>
<tr><td>ARIN</td><td>อเมริกาเหนือ และบางส่วนของแคริบเบียน</td></tr>
<tr><td>AFRINIC</td><td>แอฟริกา</td></tr>
<tr><td>APNIC</td><td>เอเชียและแปซิฟิก (รวมไทย)</td></tr>
</table>
<ul>
<li>ผู้ออกแบบ IPv4 ประเมินการเติบโตของ Internet ต่ำเกินไป และการแจก address แบบ "first-come, first-served" ทำให้กระจุกตัวในประเทศ/ภูมิภาคที่พัฒนาก่อน</li>
<li>เทคโนโลยี <b>NAT</b> และ <b>CIDR</b> (ยุค 1990) แค่ <b>ชะลอ</b> ความเร็วการหมด ไม่ได้แก้ที่ต้นเหตุ</li>
<li>ความต้องการด้าน security, QoS และ configuration ที่ง่ายขึ้นก็ผลักดันให้ต้องมี protocol ใหม่</li>
</ul>
<h4>ข้อดีของ IPv6 (IPng, Next Generation)</h4>
<table>
<tr><th>ข้อดี</th><th>อธิบาย</th></tr>
<tr><td>Address space มหาศาล</td><td>128 bit มากกว่า IPv4 ราว 2<sup>96</sup> เท่า รองรับ IoT/5G ทุกอุปกรณ์</td></tr>
<tr><td>โครงสร้างเป็นลำดับชั้น</td><td>แบ่ง address ตามการใช้งาน ต้องต่อเนื่องเพื่อ route aggregation ลดขนาด routing table</td></tr>
<tr><td>Plug-and-play</td><td>นอกจาก manual และ DHCP ยังมี <b>SLAAC</b> (StateLess Address AutoConfiguration)</td></tr>
<tr><td>End-to-end integrity</td><td>ไม่ต้องใช้ NAT จึงไม่ทำลาย end-to-end connection ทำให้การจัดการ/กำกับดูแลง่ายขึ้น</td></tr>
<tr><td>Security</td><td>IPsec ออกแบบมาคู่กับ IPv6 (ในทางปฏิบัติความปลอดภัยของข้อมูลเทียบเท่า IPv4 + IPsec)</td></tr>
<tr><td>Scalability</td><td>extension header แทรกระหว่าง base header กับ payload เมื่อจำเป็น (encryption, mobility, QoS ฯลฯ)</td></tr>
<tr><td>Mobility</td><td>ไม่ต้องวิ่งผ่าน "triangular routing" ส่งตรงได้ ลด overhead</td></tr>
<tr><td>QoS</td><td>คง QoS ของ IPv4 และเพิ่ม <b>Flow Label</b> สำหรับแยก flow/จัดสรรทรัพยากร (ยังไม่แพร่หลาย)</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>IPv6 = 128 bit; IPv4 = 32 bit</li>
<li>NAT/CIDR เป็นเพียงทางแก้ชั่วคราว; IPv6 ไม่ต้องใช้ NAT</li>
<li>SLAAC คือวิธีให้ host สร้าง address เองโดยไม่ต้องมี DHCP server</li>
</ul></div>`
    },
    {
      t: "IPv6 Protocol Stack และ Base Header",
      ref: "หน้า 421-423",
      html: `
<h4>Protocol stack เทียบกับ IPv4</h4>
<p>TCP/IPv6 stack ทำหน้าที่เหมือน TCP/IPv4 ทุกอย่าง ต่างกันเฉพาะ <b>network layer</b> ซึ่งไม่มี ARP และ IGMP แต่ฟังก์ชันเหล่านั้นถูกรวมเข้า ICMPv6</p>
<figure><img src="i/p421_1.webp" alt="เปรียบเทียบ protocol stack ของ IPv4 และ IPv6" loading="lazy"><figcaption>Fig. 13.2 IPv4 protocol stack and IPv6 protocol stack (IPv6 ไม่มี ARP/IGMP)</figcaption></figure>
<table>
<tr><th>IPv4</th><th>IPv6</th><th>หน้าที่</th></tr>
<tr><td>ICMP</td><td><b>ICMPv6</b></td><td>ทดสอบและรายงาน error ของเครือข่าย (ขยายความสามารถมาก)</td></tr>
<tr><td>ARP</td><td><b>NDP</b> (Neighbor Discovery Protocol)</td><td>หา MAC ของ next hop, auto configuration, DAD</td></tr>
<tr><td>IGMP</td><td><b>MLD</b> (Multicast Listener Discovery)</td><td>จัดการสมาชิก multicast group</td></tr>
</table>
<h4>โครงสร้าง packet</h4>
<p>IPv6 packet = base header + extension header (0 ตัวหรือมากกว่า) + upper-layer data โดย <b>extension header ไม่นับเป็นส่วนของ header</b> แต่นับรวมกับ data เป็น <b>payload</b></p>
<figure><img src="i/p421_2.webp" alt="base header ตามด้วย extension header และ data" loading="lazy"><figcaption>Fig. 13.3 Base and extension headers (base header + extension headers + data)</figcaption></figure>
<h4>Base header (40 bytes คงที่)</h4>
<figure><img src="i/p422_1.webp" alt="รูปแบบ IPv6 base header 40 bytes มี 8 ฟิลด์" loading="lazy"><figcaption>Fig. 13.4 IPv6 base header (Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, Source, Destination)</figcaption></figure>
<table>
<tr><th>ฟิลด์</th><th>ขนาด</th><th>ความหมาย</th></tr>
<tr><td>Version</td><td>4 bit</td><td>ค่า 6</td></tr>
<tr><td>Traffic Class</td><td>8 bit</td><td>เทียบเท่า QoS/ToS ของ IPv4 ระบุ class/priority</td></tr>
<tr><td>Flow Label</td><td>20 bit</td><td>ฟิลด์ใหม่ แยก real-time flow; Flow Label + Source address ระบุ flow ได้ unique</td></tr>
<tr><td>Payload Length</td><td>16 bit</td><td>ความยาวส่วนที่ตามหลัง base header (extension header + upper-layer PDU)</td></tr>
<tr><td>Next Header</td><td>8 bit</td><td>บอกชนิด extension header แรก หรือ protocol ชั้นบน (คล้าย Protocol ของ IPv4)</td></tr>
<tr><td>Hop Limit</td><td>8 bit</td><td>เหมือน TTL: router ลดทีละ 1 ถึง 0 ถูกทิ้ง</td></tr>
<tr><td>Source / Destination</td><td>128 bit</td><td>address ผู้ส่ง / ผู้รับ</td></tr>
</table>
<h4>เทียบการเปลี่ยนแปลงจาก IPv4</h4>
<table>
<tr><th>ฟิลด์ IPv4</th><th>สิ่งที่เกิดใน IPv6</th></tr>
<tr><td>Header Length</td><td>ตัดออก เพราะ header ยาวคงที่ 40 bytes</td></tr>
<tr><td>Service Type</td><td>ตัดออก ใช้ Traffic Class + Flow Label แทน</td></tr>
<tr><td>Total Length</td><td>เปลี่ยนเป็น Payload Length</td></tr>
<tr><td>Identification / Flags / Fragment Offset</td><td>ตัดออก ไปอยู่ใน Fragment extension header</td></tr>
<tr><td>TTL</td><td>เปลี่ยนชื่อเป็น Hop Limit (หน้าที่เดิม)</td></tr>
<tr><td>Protocol</td><td>เปลี่ยนเป็น Next Header</td></tr>
<tr><td>Header Checksum</td><td>ตัดออก ให้ router ประมวลผลเร็วขึ้น ไปตรวจที่ data link และ transport layer แทน</td></tr>
<tr><td>Options</td><td>ตัดออก ย้ายไปเป็น extension header</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>IPv6 base header ยาว <b>40 bytes</b> คงที่ มี <b>8 ฟิลด์</b> (ฟิลด์น้อยลงแต่ header ใหญ่ขึ้นเป็นสองเท่าของ 20 bytes เพราะ address 128 bit)</li>
<li>ไม่มี checksum ใน IPv6 header</li>
<li>Router ลด Hop Limit ทีละ 1 และทิ้ง packet เมื่อเป็น 0</li>
</ul></div>`
    },
    {
      t: "IPv6 Extension Headers",
      ref: "หน้า 423-425",
      html: `
<p>ใน IPv4 options ใน header ต้องถูกตรวจโดย <b>ทุก router</b> ตลอดเส้นทาง ทำให้ช้า ทั้งที่หลาย option router ไม่จำเป็นต้องดู IPv6 จึงย้าย option ไปไว้ใน <b>extension header</b> ซึ่งประมวลผลที่ <b>ต้นทางและปลายทาง</b> เท่านั้น router ระหว่างทางไม่แตะ (ยกเว้น Hop-by-Hop)</p>
<table>
<tr><th>Extension header</th><th>Next Header</th><th>หน้าที่</th></tr>
<tr><td>Hop-by-Hop options</td><td>0</td><td>กำหนดพารามิเตอร์ที่ <b>ทุก hop</b> ต้องอ่านและประมวลผล</td></tr>
<tr><td>Destination options</td><td>60</td><td>ข้อมูลที่ปลายทางเท่านั้นประมวลผล</td></tr>
<tr><td>Routing</td><td>43</td><td>ให้ source บังคับ packet ผ่านอุปกรณ์ที่กำหนด</td></tr>
<tr><td>Fragment</td><td>44</td><td>ส่งเป็นชิ้นเมื่อ packet เกิน MTU</td></tr>
<tr><td>Authentication (AH)</td><td>51</td><td>IPsec: authentication, integrity, replay protection</td></tr>
<tr><td>Encapsulating Security Payload (ESP)</td><td>50</td><td>IPsec: เหมือน AH และเพิ่ม confidentiality</td></tr>
<tr><td>No next header</td><td>59</td><td>ไม่มีอะไรตามหลัง</td></tr>
</table>
<figure><img src="i/p424_1.webp" alt="ตารางค่า Next Header ของ extension header แต่ละชนิด" loading="lazy"><figcaption>Table 13.1 Header values corresponding to extension headers (ค่า Next Header)</figcaption></figure>
<ul>
<li>ถ้าใช้ extension header หลายตัวต้องเรียงตามลำดับ: Hop-by-Hop, Destination options, Routing, Fragment, AH, ESP (ตามตารางด้านบน)</li>
<li>ฟิลด์แรกของ extension header ทุกตัวคือ <b>Next Header (8 bit)</b> บอกว่าตัวต่อไปคืออะไร จึงต่อกันเป็น "โซ่"</li>
<li>Next Header ใน base header ยังใช้ระบุ protocol ชั้นบน: <b>6 = TCP</b>, <b>17 = UDP</b>, <b>58 = ICMPv6</b></li>
</ul>
<figure><img src="i/p425_1.webp" alt="ตัวอย่าง packet ที่มี routing header และ fragment header ต่อเป็นโซ่ด้วย Next Header" loading="lazy"><figcaption>Fig. 13.5 IPv6 extension header (Next Header ต่อ base header, routing header, fragment header, TCP)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>จำค่า: 0 Hop-by-Hop, 43 Routing, 44 Fragment, 50 ESP, 51 AH, 59 None, 60 Destination options</li>
<li>Router ประมวลผล extension header เฉพาะ <b>Hop-by-Hop</b> ส่วนอื่นประมวลผลที่ปลายทาง (หรือ node ที่ระบุ)</li>
<li>การ fragment ใน IPv6 ทำที่ <b>source</b> ผ่าน Fragment header</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ในข้อสอบ Next Header 59 หมายถึง "ไม่มี header ตามหลัง" ไม่ใช่ error</div>`
    },
    {
      t: "13.2.1 รูปแบบ IPv6 Address และการย่อ (Compression)",
      ref: "หน้า 424-426",
      html: `
<h4>รูปแบบ</h4>
<p>IPv6 address ยาว 128 bit เขียนเป็น <code>xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx</code> คือ <b>8 กลุ่ม</b> กลุ่มละ 4 hex digit (16 bit) แบ่งเป็น <b>network prefix</b> + <b>interface identifier</b> จำนวน address IPv6 = 340,282,366,920,938,463,374,607,431,768,211,456 (2<sup>128</sup>) เทียบ IPv4 4,294,967,296 (2<sup>32</sup>)</p>
<figure><img src="i/p425_2.webp" alt="โครงสร้าง IPv6 address ประกอบด้วย network prefix และ interface identifier" loading="lazy"><figcaption>Fig. 13.6 IPv6 address composition (network prefix + interface identifier)</figcaption></figure>
<h4>กฎการย่อ 2 ข้อ</h4>
<ol>
<li><b>ตัด 0 นำหน้า</b> ในแต่ละกลุ่ม 16 bit ได้ (<code>0DB8</code> เป็น <code>DB8</code>, <code>0000</code> เป็น <code>0</code>)</li>
<li>กลุ่ม 0 ที่ <b>ติดกันตั้งแต่ 2 กลุ่มขึ้นไป</b> แทนด้วย <code>::</code> ได้ <b>เพียงครั้งเดียว</b> ต่อ address ไม่เช่นนั้นอุปกรณ์ไม่รู้ว่าแต่ละ <code>::</code> แทน 0 กี่กลุ่ม</li>
</ol>
<figure><img src="i/p426_1.webp" alt="ตัวอย่างการย่อ address 2001:0DB8:0000:0000:0000:0346:8D58 ทีละขั้น" loading="lazy"><figcaption>Fig. 13.7 Simplified IPv6 address representation (ย่อทีละขั้นด้วย 2 กฎ)</figcaption></figure>
<table>
<tr><th>ต้นฉบับ</th><th>ย่อแล้ว</th><th>หมายเหตุ</th></tr>
<tr><td><code>2001:0DB8:0000:0000:0000:0000:0346:8D58</code></td><td><code>2001:DB8::346:8D58</code></td><td>4 กลุ่ม 0 ติดกัน แทนด้วย ::</td></tr>
<tr><td><code>FE80:0000:0000:0000:02E0:FCFF:FE29:31F0</code></td><td><code>FE80::2E0:FCFF:FE29:31F0</code></td><td>link-local</td></tr>
<tr><td><code>0000:0000:0000:0000:0000:0000:0000:0001</code></td><td><code>::1</code></td><td>loopback</td></tr>
<tr><td><code>2001:0DB8:0000:0001:0000:0000:0000:0001</code></td><td><code>2001:DB8:0:1::1</code></td><td>มี 2 ชุดของ 0 ให้เลือกชุดที่ <b>ยาวกว่า</b> ใช้ ::</td></tr>
</table>
<h4>Prefix length</h4>
<p>เขียนเป็น <code>address/prefix-length</code> เช่น <code>F00D:4598:7304:6540:FEDC:BA98:7654:3210/64</code> prefix 64 bit คือ network segment <code>F00D:4598:7304:6540::/64</code> (ไม่มี subnet mask แบบ dotted)</p>
<div class="warn"><b>ระวัง</b> <code>2031::720C::9E:839A:130B</code> ผิด เพราะใช้ <code>::</code> สองครั้ง และห้ามย่อ <code>10</code> เป็น <code>1</code> (ตัดได้เฉพาะ 0 นำหน้า ไม่ใช่ 0 ท้ายกลุ่ม: <code>1200</code> ต้องเขียน <code>1200</code> ห้ามเป็น <code>12</code>)</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>8 กลุ่ม x 16 bit; :: ใช้ได้ครั้งเดียว; ตัดเฉพาะ 0 นำหน้า</li>
<li>การคืนรูป: นับกลุ่มที่มี แล้วเติม 0 ให้ครบ 8 กลุ่มตรง ::</li>
</ul></div>`
    },
    {
      t: "13.2.2-13.2.3 ชนิดของ Address และ Unicast (GUA, ULA, LLA, EUI-64)",
      ref: "หน้า 426-429",
      html: `
<h4>การจำแนก</h4>
<p>IPv6 address แบ่งเป็น <b>unicast</b>, <b>multicast</b> และ <b>anycast</b> <b>ไม่มี broadcast</b> เพราะทุกกรณีที่เคยใช้ broadcast เปลี่ยนไปใช้ multicast (ส่งเฉพาะกลุ่มที่เกี่ยวข้อง ไม่รบกวนทุกเครื่อง)</p>
<figure><img src="i/p426_2.webp" alt="แผนผังการจำแนกชนิด IPv6 address" loading="lazy"><figcaption>Fig. 13.8 IPv6 address classification (unicast: GUA 2000::/3, ULA FD00::/8, link-local FE80::/10; ไม่มี broadcast)</figcaption></figure>
<h4>Unicast address</h4>
<p>ระบุ interface เดียว ประกอบด้วย <b>network prefix (n bit)</b> + <b>interface ID (128-n bit)</b> ตามปกติ unicast ใช้ prefix 64 bit และ interface ID 64 bit</p>
<table>
<tr><th>ชนิด</th><th>Prefix</th><th>ขอบเขต / ลักษณะ</th></tr>
<tr><td><b>Global Unicast (GUA)</b></td><td><code>2000::/3</code></td><td>unique ทั่วโลก route บน Internet ได้ เทียบเท่า public IPv4</td></tr>
<tr><td><b>Unique Local (ULA)</b></td><td><code>FC00::/7</code> (ใช้จริง <code>FD00::/8</code>)</td><td>private ใช้ภายในองค์กร route บน Internet ไม่ได้ แต่ prefix สุ่มจึงชนกันยาก</td></tr>
<tr><td><b>Link-Local (LLA)</b></td><td><code>FE80::/10</code></td><td>ใช้ภายใน link เดียว (auto-config, NDP, node ที่ไม่มี router) router <b>ไม่ forward</b> ข้าม link</td></tr>
</table>
<h4>โครงสร้าง Global Unicast</h4>
<ul>
<li><b>Global routing prefix</b>: ISP ให้องค์กร ปกติอย่างน้อย 45 bit</li>
<li><b>Subnet ID</b>: องค์กรแบ่ง subnet เอง</li>
<li><b>Interface ID</b>: 64 bit ระบุ interface</li>
<li>ลำดับการแจก: TLA (ISP ใหญ่/หน่วยงานกลาง) แจกให้ NLA (ISP กลาง/เล็ก) แจกให้ SLA (site/subnet) และผู้ใช้</li>
<li>RIR prefix: <code>2400::/12</code> APNIC, <code>2600::/12</code> ARIN, <code>2800::/12</code> LACNIC, <code>2A00::/12</code> RIPE, <code>2C00::/12</code> AFRINIC; <code>2001:0DB8::/32</code> สงวนไว้เป็นตัวอย่างในเอกสาร</li>
</ul>
<div class="note"><b>หมายเหตุ</b> เมื่อ configure unicast address บน interface ระบบสร้าง <b>link-local address อัตโนมัติ</b> และ link-local อยู่ร่วมกับ routable address ได้ ดังนั้น host ที่ใช้ IPv6 มักมีอย่างน้อย 2 address</div>
<h4>การสร้าง Interface ID</h4>
<p>มี 3 วิธี: <b>manual</b>, <b>ระบบสร้างเอง</b> (สุ่ม), และ <b>IEEE EUI-64</b> (นิยมที่สุด) ซึ่งแปลง MAC 48 bit เป็น interface ID 64 bit:</p>
<ol>
<li>แยก MAC ออกเป็นสองครึ่ง (3 byte + 3 byte)</li>
<li>แทรก <code>FF-FE</code> ตรงกลาง</li>
<li><b>กลับบิตที่ 7</b> ของ byte แรก (U/L bit) คือ 0 เป็น 1, 1 เป็น 0</li>
</ol>
<figure><img src="i/p429_1.webp" alt="การแปลง MAC เป็น EUI-64 โดยแทรก FFFE และกลับบิตที่ 7" loading="lazy"><figcaption>Fig. 13.13 EUI-64 specification (MAC 3C-52-82-49-7E-9D เป็น 3E-52-82-FF-FE-49-7E-9D)</figcaption></figure>
<p><b>ตัวอย่าง</b>: MAC <code>00E0-FC29-31F0</code> → byte แรก 00 = 0000 0000 กลับบิตที่ 7 เป็น 0000 0010 = 02 → แทรก FFFE → <code>02E0:FCFF:FE29:31F0</code> → link-local <code>FE80::2E0:FCFF:FE29:31F0</code> (ตรงกับตัวอย่างบน router Huawei ในหนังสือ)</p>
<div class="warn"><b>ข้อเสียของ EUI-64</b> ผู้ไม่หวังดีเดา MAC (Layer 2) ได้จาก IPv6 address (Layer 3) ข้อดีคือลดงาน config เพราะ SLAAC ต้องรู้แค่ prefix</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>GUA 2000::/3, ULA FC00::/7 (FD00::/8), LLA FE80::/10, Multicast FF00::/8</li>
<li>EUI-64 = แทรก FFFE + กลับบิตที่ 7 ของ byte แรก (ถ้าบิตเดิมเป็น 0 ค่า byte แรกจะเพิ่มขึ้น 2 เช่น 00 เป็น 02, 3C เป็น 3E)</li>
<li>Unicast ใช้ prefix 64 + interface ID 64</li>
</ul></div>`
    },
    {
      t: "13.2.4-13.2.6 Multicast, Solicited-Node, Anycast และตารางสรุป",
      ref: "หน้า 429-433",
      html: `
<h4>Multicast (one-to-many)</h4>
<p>เปรียบเหมือน "ช่องวิทยุ": ผู้ส่งส่งไปที่ multicast address ผู้ที่ <b>join group</b> (ผูก NIC กับ address และ MAC multicast ที่สอดคล้อง) จึงรับและประมวลผล เครื่องอื่นเมินข้อมูล</p>
<figure><img src="i/p430_1.webp" alt="ภาพ multicast: ต้นทางส่งเฉพาะผู้รับที่ join group และฟิลด์ Scope Reserved Group ID" loading="lazy"><figcaption>Fig. 13.14-13.15 Multicast illustration and composition (Scope / Reserved 80 bit / Group ID 32 bit)</figcaption></figure>
<p>รูปแบบ: <code>FF</code> (8 bit) | <b>Flags</b> (4 bit) | <b>Scope</b> (4 bit) | <b>Reserved</b> 80 bit = 0 | <b>Group ID</b> 32 bit (รวม 128 bit)</p>
<ul>
<li>Flags: <code>0000</code> = permanent/well-known, <code>0001</code> = temporary</li>
</ul>
<table>
<tr><th>Scope</th><th>ความหมาย</th></tr>
<tr><td>1</td><td>Interface-local (เฉพาะ loopback ภายใน interface เดียว)</td></tr>
<tr><td>2</td><td>Link-local (เช่น <code>FF02::1</code>)</td></tr>
<tr><td>5</td><td>Site-local</td></tr>
<tr><td>8</td><td>Organization-local</td></tr>
<tr><td>E</td><td>Global</td></tr>
</table>
<div class="note"><b>หมายเหตุ</b> ตาราง Table 13.3 ในหนังสือสลับค่า 5/8/E คลาดเคลื่อน ในตารางข้างบนใช้ค่ามาตรฐาน RFC (1 interface, 2 link, 5 site, 8 organization, E global)</div>
<h4>Solicited-Node Multicast</h4>
<p>node ที่มี unicast หรือ anycast address จะสร้างและ join solicited-node multicast address ของตนเสมอ ใช้สำหรับ <b>address resolution</b> (แทน ARP) และ <b>DAD</b> รูปแบบ: <code>FF02::1:FF</code> (104 bit คงที่, /104) + <b>24 bit ท้าย</b> ของ unicast address</p>
<figure><img src="i/p431_1.webp" alt="solicited-node multicast: prefix FF02::1:FF 104 bit ต่อด้วย 24 bit ท้ายของ unicast" loading="lazy"><figcaption>Fig. 13.16 Composition of solicited-node multicast address (104 bit คงที่ + 24 bit ท้าย)</figcaption></figure>
<p><b>ตัวอย่าง</b>: <code>2001::1234:5678</code> → 24 bit ท้าย = <code>34:5678</code> → <code>FF02::1:FF34:5678</code></p>
<p>ข้อดี: มี node เดียวใน link ที่ฟัง address นี้ (โดยทั่วไป) จึงไม่รบกวนเครื่องอื่น ต่างจาก ARP broadcast ที่ทุกเครื่องต้องประมวลผล</p>
<h4>Anycast</h4>
<p>Unicast address เดียวกันตั้งบน <b>หลาย interface/อุปกรณ์</b> packet ส่งไปยัง interface ที่ <b>"ใกล้ที่สุด"</b> (routing cost ต่ำสุด) เพียงตัวเดียว ไม่ใช่ทุกตัวเหมือน multicast</p>
<figure><img src="i/p432_1.webp" alt="Web Server สองเครื่องใช้ address เดียวกัน 2001:0DB8::84C2 ผู้ใช้ไปยังเครื่องที่ใกล้ที่สุด" loading="lazy"><figcaption>Fig. 13.17 Role of anycast addresses (2001:0DB8::84C2 บน Web Server 2 เครื่อง ผู้ใช้เข้าตัวที่ใกล้ที่สุด)</figcaption></figure>
<ul>
<li>รูปแบบเหมือน unicast ทุกประการ ต่างที่ถูกตั้งบนหลาย interface และต้อง <b>configure ให้ node รู้ว่าเป็น anycast</b></li>
<li>ประโยชน์: <b>service redundancy</b> (เครื่องหนึ่งล้ม อีกเครื่องรับแทนโดยไม่ต้องเปลี่ยน address) และ <b>คุณภาพบริการดีขึ้น</b> (ใช้ server ใกล้ ลด latency)</li>
</ul>
<h4>ตารางสรุป address ที่ต้องรู้</h4>
<table>
<tr><th>Range</th><th>ชนิด</th></tr>
<tr><td><code>2000::/3</code></td><td>Global unicast</td></tr>
<tr><td><code>2001:0DB8::/32</code></td><td>Reserved (เอกสาร/ตัวอย่าง)</td></tr>
<tr><td><code>FE80::/10</code></td><td>Link-local</td></tr>
<tr><td><code>FF00::/8</code></td><td>Multicast</td></tr>
<tr><td><code>::/128</code></td><td>Unspecified (เทียบ 0.0.0.0)</td></tr>
<tr><td><code>::1/128</code></td><td>Loopback (เทียบ 127.0.0.1)</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>Solicited-node = FF02::1:FF + 24 bit ท้าย; ใช้กับ address resolution และ DAD</li>
<li>Anycast: ส่งถึงตัวที่ใกล้สุดเพียงตัวเดียว; Multicast: ส่งถึงทุกสมาชิก</li>
<li>Well-known: FF02::1 all nodes, FF02::2 all routers, FF02::5 OSPF, FF02::6 OSPF DR, FF02::9 RIP</li>
</ul></div>`
    },
    {
      t: "13.3 การตั้งค่า Address และ NDP",
      ref: "หน้า 434-437",
      html: `
<h4>Interface ที่เปิด IPv6 จะ join multicast group เหล่านี้อัตโนมัติ</h4>
<table>
<tr><th>Group</th><th>Address</th></tr>
<tr><td>All nodes</td><td><code>FF02::1</code></td></tr>
<tr><td>All routers</td><td><code>FF02::2</code></td></tr>
<tr><td>Solicited-node</td><td><code>FF02::1:FFxx:xxxx</code></td></tr>
<tr><td>All OSPF routers</td><td><code>FF02::5</code></td></tr>
<tr><td>All OSPF DR/BDR</td><td><code>FF02::6</code></td></tr>
<tr><td>All RIP routers</td><td><code>FF02::9</code></td></tr>
</table>
<figure><img src="i/p434_1.webp" alt="ตัวอย่าง address และ multicast group ที่ computer กับ router interface join" loading="lazy"><figcaption>Fig. 13.18 IPv6 interface addresses and the specific multicast groups joined (ทั้ง host และ router มี solicited-node 2 ตัว: จาก link-local และจาก global unicast)</figcaption></figure>
<p>ทั้ง host และ router สร้าง solicited-node multicast <b>2 ตัว</b> ตัวหนึ่งจาก link-local address อีกตัวจาก global unicast address ที่ตั้งโดย admin</p>
<h4>4 ขั้นก่อนส่งข้อมูล IPv6</h4>
<figure><img src="i/p435_1.webp" alt="ลำดับ: address configuration, DAD, address resolution, forwarding" loading="lazy"><figcaption>Fig. 13.19 The process of configuring IPv6 addresses on an interface (config, DAD, address resolution, forward data)</figcaption></figure>
<ol>
<li><b>Address configuration</b>: GUA ตั้งได้ด้วย manual, stateless (NDP) หรือ stateful (NDP + DHCPv6); link-local มักสร้างโดยระบบด้วย EUI-64 ไม่ค่อย config เอง</li>
<li><b>DAD</b> (Duplicate Address Detection): ตรวจว่า address ซ้ำกับ interface อื่นหรือไม่ คล้าย gratuitous ARP ของ IPv4 (ใช้ NS/NA)</li>
<li><b>Address resolution</b>: map IPv6 กับ MAC ผ่าน ICMPv6 คล้าย ARP request (ใช้ NS/NA)</li>
<li><b>Forwarding</b>: ส่ง IPv6 data</li>
</ol>
<h4>NDP (Neighbor Discovery Protocol)</h4>
<p>NDP คือ protocol พื้นฐานของ IPv6 ทำงาน <b>บน ICMPv6</b> แยกชนิดข้อความด้วยฟิลด์ Type</p>
<figure><img src="i/p435_2.webp" alt="หน้าที่ของ NDP: autoconfiguration, DAD, address resolution" loading="lazy"><figcaption>Fig. 13.20 NDP functions (stateless autoconfiguration, DAD, address resolution)</figcaption></figure>
<table>
<tr><th>ICMPv6 Type</th><th>ข้อความ</th><th>ใช้ใน</th></tr>
<tr><td>133</td><td>Router Solicitation (RS)</td><td>prefix advertisement / SLAAC</td></tr>
<tr><td>134</td><td>Router Advertisement (RA)</td><td>prefix advertisement / SLAAC</td></tr>
<tr><td>135</td><td>Neighbor Solicitation (NS)</td><td>address resolution, DAD</td></tr>
<tr><td>136</td><td>Neighbor Advertisement (NA)</td><td>address resolution, DAD</td></tr>
</table>
<figure><img src="i/p436_1.webp" alt="ตาราง ICMPv6 type ของ NDP และกลไกที่ใช้ RS RA NS NA" loading="lazy"><figcaption>Table 13.5-13.6 ICMPv6 messages used by NDP (RS/RA สำหรับ prefix, NS/NA สำหรับ address resolution และ DAD)</figcaption></figure>
<ul>
<li><b>Stateless autoconfiguration</b>: ใช้ RS/RA ทำให้ plug-and-play ไม่ต้องมี DHCP server</li>
<li><b>DAD</b>: ทุก interface ต้องทำ DAD ก่อนใช้ unicast address</li>
<li><b>Address resolution</b>: แทน ARP และใช้ neighbor unreachability detection ดูสถานะ neighbor ด้วย</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>RS 133, RA 134, NS 135, NA 136 (ไล่เรียงตามลำดับ)</li>
<li>Address resolution และ DAD ใช้ NS+NA; prefix advertisement ใช้ RS+RA</li>
<li>NDP แทน ARP, ใช้งานบน ICMPv6 (ไม่ใช่ UDP/TCP)</li>
</ul></div>`
    },
    {
      t: "SLAAC (Stateless) กับ DHCPv6 (Stateful) และ M/O Flag",
      ref: "หน้า 436-439",
      html: `
<p>Host ตั้ง address ได้ 2 แบบ: <b>manual (static)</b> หรือ <b>automatic</b> ซึ่งแบ่งเป็น stateless กับ stateful โดยพฤติกรรมถูกควบคุมจาก flag ใน <b>RA</b> ที่ router ส่ง</p>
<table>
<tr><th>Flag</th><th>ค่า 0</th><th>ค่า 1</th></tr>
<tr><td><b>M</b> (Managed Address Configuration)</td><td>ไม่ใช้ DHCPv6 สำหรับ address (stateless เช่น ND)</td><td>รับ address เต็ม 128 bit จาก <b>DHCPv6</b> (stateful)</td></tr>
<tr><td><b>O</b> (Other Configuration)</td><td>ได้ข้อมูลอื่นผ่าน stateless (ND)</td><td>รับข้อมูลอื่น เช่น DNS, SIP server จาก <b>DHCPv6</b></td></tr>
</table>
<ul>
<li>หนังสือระบุว่าการใช้ M=0, O=1 ไม่มีความหมาย (ไม่นิยมใช้ร่วมกัน)</li>
<li>M=0, O=0 = <b>SLAAC</b> ไม่ต้องมี DHCPv6 server</li>
<li>M=1, O=1 = <b>Stateful (DHCPv6)</b></li>
</ul>
<h4>SLAAC ขั้นตอน (M=0, O=0)</h4>
<figure><img src="i/p438_1.webp" alt="PC1 ส่ง RS ไปที่ AR1 และ AR1 ตอบ RA" loading="lazy"><figcaption>Fig. 13.22 IPv6 stateless autoconfiguration illustration (1: RS, 2: RA)</figcaption></figure>
<ol>
<li>Interface เปิด: host สร้าง <b>link-local</b> จาก <code>FE80::/64</code> + EUI-64 interface ID แล้วทำ DAD ถ้าชนต้อง config link-local เอง ไม่เช่นนั้น interface ใช้ไม่ได้</li>
<li>PC1 ส่ง <b>RS</b> (ไปที่ <code>FF02::2</code>) ขอ prefix</li>
<li>Router ตอบ <b>RA</b> แบบ unicast (M=0, O=0, มี prefix) และยังส่ง RA multicast เป็นระยะ</li>
<li>PC1 สร้าง address ชั่วคราว (tentative) = prefix + interface ID แล้วส่ง <b>NS</b> เพื่อ DAD</li>
<li>ถ้ามีผู้ใช้ address นั้นจะตอบ <b>NA</b> ถ้าไม่มีใครตอบ address ถือว่า unique เปลี่ยนสถานะเป็น <b>valid</b> และใช้ได้</li>
</ol>
<p>จุดสำคัญ: router <b>ไม่สนสถานะของ host</b> (ไม่เก็บว่าใครได้ address อะไร) จึงเรียก "stateless" เหมาะกับ IoT และ terminal ที่ไม่ต้องการพารามิเตอร์อื่น</p>
<h4>Stateful (DHCPv6) ขั้นตอน</h4>
<figure><img src="i/p439_1.webp" alt="PC1 ส่ง RS ได้ RA แล้วทำ DHCPv6 กับ server" loading="lazy"><figcaption>Fig. 13.23 Stateful autoconfiguration illustration (RS, RA M=1 O=1, DHCPv6 solicit, DHCPv6 reply)</figcaption></figure>
<ol>
<li>PC1 ส่ง RS</li>
<li>Router ส่ง RA ที่ M=1, O=1 บอกว่าให้ขอ address และข้อมูลอื่นจาก DHCPv6</li>
<li>PC1 ส่ง <b>DHCPv6 Solicit</b> แบบ multicast ไปที่ <code>FF02::1:2</code> (all DHCPv6 servers and relay agents)</li>
<li>DHCPv6 server ให้ address + DNS ฯลฯ และ <b>บันทึกการแจก</b> (นี่คือที่มาของคำว่า stateful)</li>
</ol>
<table>
<tr><th></th><th>Stateless (SLAAC)</th><th>Stateful (DHCPv6)</th></tr>
<tr><td>M / O</td><td>0 / 0</td><td>1 / 1</td></tr>
<tr><td>ต้องมี DHCPv6 server</td><td>ไม่ต้อง</td><td>ต้อง</td></tr>
<tr><td>Server จำสถานะ client</td><td>ไม่จำ</td><td>จำ (บันทึกการแจก)</td></tr>
<tr><td>Interface ID</td><td>host สร้างเอง (EUI-64/สุ่ม)</td><td>server กำหนด</td></tr>
<tr><td>เหมาะกับ</td><td>IoT, terminal ทั่วไป</td><td>เครื่องใน LAN องค์กร ต้องการคุมการแจก</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>M=1 บอกให้ใช้ DHCPv6 ขอ <b>address</b>; O=1 บอกให้ใช้ DHCPv6 ขอ <b>ข้อมูลอื่น (DNS)</b></li>
<li>DHCPv6 Solicit ส่งไป FF02::1:2</li>
<li>DHCPv6 ใช้ UDP (หนังสือเฉลย: DHCPv6 messages ถูกห่อด้วย UDP)</li>
</ul></div>`
    },
    {
      t: "13.4 การ Configure และวิเคราะห์ Packet: SLAAC และ DHCPv6",
      ref: "หน้า 439-448",
      html: `
<h4>Configure SLAAC บน Huawei router (AR1)</h4>
<pre><code>[AR1]ipv6                                   --เปิด IPv6 ทั้งเครื่อง
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]ipv6 enable       --เปิด IPv6 บน interface
[AR1-GigabitEthernet0/0/0]ipv6 address 2018:6:6::1 64
[AR1-GigabitEthernet0/0/0]ipv6 address auto link-local
[AR1-GigabitEthernet0/0/0]undo ipv6 nd ra halt  --ให้ส่ง RA (ค่าเริ่มต้นคือไม่ส่ง)
[AR1]display ipv6 interface GigabitEthernet 0/0/0</code></pre>
<p>ผลของ <code>display ipv6 interface</code> ที่ควรเห็น: link-local <code>FE80::2E0:FCFF:FE29:31F0</code>, global unicast <code>2018:6:6::1</code> และ joined group <code>FF02::1:FF00:1</code>, <code>FF02::2</code>, <code>FF02::1</code>, <code>FF02::1:FF29:31F0</code>; ท้ายสุดบอก <i>Hosts use stateless autoconfig for addresses</i></p>
<div class="warn"><b>ระวัง</b> ค่าเริ่มต้นของ router Huawei คือ <b>ไม่ส่ง RA</b> ถ้าลืม <code>undo ipv6 nd ra halt</code> host จะไม่ได้ prefix และไม่สร้าง GUA (เป็นข้อผิดพลาดที่พบบ่อย)</div>
<p>บน Windows ตั้ง "Obtain IPv6 address automatically" แล้วดู <code>ipconfig /all</code> จะเห็น GUA ที่เกิดจาก SLAAC, link-local และ default gateway ซึ่งเป็น <b>link-local address ของ router interface</b></p>
<figure><img src="i/p441_1.webp" alt="ipconfig /all บน Windows แสดง IPv6 address ที่ได้จาก SLAAC และ gateway เป็น link-local" loading="lazy"><figcaption>Fig. 13.25 IPv6 address generated by stateless auto-configuration (gateway เป็น link-local ของ router)</figcaption></figure>
<h4>วิเคราะห์ RS และ RA ด้วย packet capture</h4>
<ul>
<li>Router ส่ง RA แบบ multicast เป็นระยะ (Type <b>134</b>); host ส่ง RS (Type <b>133</b>) เพื่อไม่ต้องรอ router จะตอบ RA ทันที</li>
<li>Wireshark filter: <code>icmpv6.type == 133</code> และ <code>icmpv6.type == 134</code></li>
<li><b>RS</b>: source = link-local ของ host, destination = <code>ff02::2</code> (all routers)</li>
<li><b>RA</b>: destination = <code>ff02::1</code> (all nodes) ใน frame นั้น M=0, O=0, prefix 2018:6:6::/64</li>
</ul>
<figure><img src="i/p442_1.webp" alt="packet RS: ICMPv6 type 133 ส่งไปที่ ff02::2" loading="lazy"><figcaption>Fig. 13.26 RS packet (Type 133, destination ff02::2)</figcaption></figure>
<figure><img src="i/p443_1.webp" alt="packet RA: type 134 มี flag M และ O ไม่ถูกตั้งค่า และ prefix 2018:6:6::/64" loading="lazy"><figcaption>Fig. 13.27 Router advertisement (RA) packet (M flag และ O flag = 0, ได้ prefix 2018:6:6::)</figcaption></figure>
<p>บน Windows: <code>netsh</code> → <code>interface ipv6</code> → <code>show interface 4</code> จะเห็น Managed Address Configuration = disabled และ Other Stateful Configuration = disabled สำหรับ stateless</p>
<h4>Configure DHCPv6 server (stateful)</h4>
<figure><img src="i/p444_2.webp" alt="topology ที่ AR1 เป็น DHCPv6 server ให้ Windows 10" loading="lazy"><figcaption>Fig. 13.29 Network topology with stateful autoconfiguration (AR1 เป็น DHCPv6 server)</figcaption></figure>
<pre><code>[AR1]ipv6
[AR1]dhcp enable
[AR1]dhcpv6 duid llt                         --สร้าง DUID (unique DHCP ID) แบบ LLT
[AR1]dhcpv6 pool localnet                    --สร้าง pool
[AR1-dhcpv6-pool-localnet]address prefix 2018:6:6::/64
[AR1-dhcpv6-pool-localnet]excluded-address 2018:6:6::1
[AR1-dhcpv6-pool-localnet]dns-domain-name huawei.com
[AR1-dhcpv6-pool-localnet]dns-server 2018:6:6::2000
[AR1-dhcpv6-pool-localnet]quit
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]ipv6 enable
[AR1-GigabitEthernet0/0/0]dhcpv6 server localnet
[AR1-GigabitEthernet0/0/0]undo ipv6 nd ra halt
[AR1-GigabitEthernet0/0/0]ipv6 nd autoconfig managed-address-flag   --M = 1
[AR1-GigabitEthernet0/0/0]ipv6 nd autoconfig other-flag             --O = 1</code></pre>
<ul>
<li>DUID แบบที่ตั้งได้บน VRP: <b>DUID-LL</b> และ <b>DUID-LLT</b></li>
<li><code>display dhcpv6 pool</code> ดู pool: prefix, lifetime (valid / preferred), จำนวนที่ใช้งาน, excluded address, DNS</li>
<li>ผล: RA มี M=1 O=1 (ยังโฆษณา prefix อยู่ แต่ client ไปขอ address จาก DHCPv6); <code>ipconfig /all</code> เห็น address, DNS suffix <code>huawei.com</code>, lease; <code>netsh</code> เห็น managed และ other stateful = enabled</li>
</ul>
<figure><img src="i/p446_1.webp" alt="RA ที่ capture ได้เมื่อ M และ O เป็น 1" loading="lazy"><figcaption>Fig. 13.30 RA packet captured (M = 1, O = 1)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>SLAAC: <code>undo ipv6 nd ra halt</code></li>
<li>DHCPv6: เพิ่ม <code>ipv6 nd autoconfig managed-address-flag</code> และ <code>other-flag</code> + <code>dhcpv6 server &lt;pool&gt;</code></li>
<li>ตรวจ: <code>display ipv6 interface</code>, <code>display dhcpv6 pool</code></li>
</ul></div>`
    },
    {
      t: "13.5 IPv6 Routing: Static Route และ OSPFv3",
      ref: "หน้า 446-451",
      html: `
<p>เงื่อนไขเหมือน IPv4: เครือข่ายจะติดต่อกันได้ต้องมีเส้นทาง <b>ไปและกลับ</b> สำหรับ network ที่ไม่ต่อตรง ต้องใช้ static route หรือ dynamic routing protocol รุ่นที่รองรับ IPv6 (OSPFv3 สำหรับ IPv6, OSPFv2 สำหรับ IPv4)</p>
<h4>IPv6 Static Route</h4>
<figure><img src="i/p448_2.webp" alt="topology 3 network ที่เชื่อมด้วย router AR1 และ AR2" loading="lazy"><figcaption>Fig. 13.33 Network topology for static routing (2018:6:6::/64 - AR1 - 2018:6:7::/64 - AR2 - 2018:6:8::/64)</figcaption></figure>
<pre><code>[AR1]ipv6
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]ipv6 enable
[AR1-GigabitEthernet0/0/0]ipv6 address 2018:6:6::1 64
[AR1-GigabitEthernet0/0/0]undo ipv6 nd ra halt
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]ipv6 enable
[AR1-GigabitEthernet0/0/1]ipv6 address 2018:6:7::1 64
[AR1]ipv6 route-static 2018:6:8:: 64 2018:6:7::2   --ไป 2018:6:8::/64 ผ่าน next hop
[AR2]ipv6 route-static 2018:6:6:: 64 2018:6:7::1   --เส้นทางกลับ
[AR1]display ipv6 routing-table protocol static
&lt;AR1&gt;ping ipv6 2018:6:8::1
[AR1]undo ipv6 route-static 2018:6:8:: 64</code></pre>
<ul>
<li>รูปแบบ: <code>ipv6 route-static &lt;dest-prefix&gt; &lt;prefix-length&gt; &lt;next-hop&gt;</code> (ใส่ prefix length เป็นตัวเลขแยก ไม่ใช่ /)</li>
<li>Static route มี <b>Preference 60</b> (ใน routing table ผลแสดง Preference 60, Protocol Static)</li>
<li><b>Default route</b>: <code>ipv6 route-static :: 0 &lt;next-hop&gt;</code> (destination <code>::</code> prefix length 0)</li>
</ul>
<h4>OSPFv3</h4>
<p>แนวคิดเหมือน OSPFv2: link-state, แบ่ง area ได้ แต่ปรับให้รองรับ IPv6</p>
<ul>
<li><b>Router ID ต้องตั้งเองด้วยมือ</b> (32 bit รูป IPv4) เพราะ IPv6 address 128 bit ใช้สร้าง RID ไม่ได้</li>
<li>ใช้ <b>link-local address</b> เป็น source ของข้อความ และเป็น <b>next hop</b></li>
<li>ใช้ multicast: <code>FF02::5</code> (OSPF routers), <code>FF02::6</code> (DR/BDR) เทียบ 224.0.0.5 / 224.0.0.6</li>
<li>เปิด OSPFv3 ที่ <b>interface</b> โดยตรง (<code>ospfv3 1 area 0</code>) ไม่ใช้คำสั่ง network</li>
</ul>
<figure><img src="i/p450_1.webp" alt="topology สำหรับ configure OSPFv3 บน AR1 และ AR2" loading="lazy"><figcaption>Fig. 13.34 Configure OSPFv3 (AR1 router-id 1.1.1.1 และ AR2 router-id 1.1.1.2 ใน area 0)</figcaption></figure>
<pre><code>[AR1]ospfv3 1                       --process ID 1
[AR1-ospfv3-1]router-id 1.1.1.1     --ต้อง unique
[AR1-ospfv3-1]quit
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]ospfv3 1 area 0
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]ospfv3 1 area 0
[AR1]display ipv6 routing-table protocol ospfv3</code></pre>
<p>ผลที่เห็น: route <code>2018:6:8::/64</code> next hop เป็น link-local <code>FE80::...</code> ของ AR2, <b>Preference 10</b>, Cost 2, Protocol OSPFv3</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Static route preference 60; OSPF preference 10 (ค่าน้อยกว่า = เชื่อถือกว่า)</li>
<li>OSPFv3: router-id ตั้งเอง, เปิดที่ interface, link-local เป็น next hop</li>
<li>ทดสอบด้วย <code>ping ipv6</code></li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `วิศวกรต้องย่อ address <code>2001:0DB8:0000:0000:0000:0000:0346:8D58</code> ให้สั้นที่สุดตามกฎของ IPv6`,
      q: "ข้อใดคือรูปที่ย่อถูกต้องและสั้นที่สุด?",
      opts: [
        { t: "2001:DB8::346:8D58", why: "ถูก: ตัด 0 นำหน้าของ 0DB8 และ 0346 แล้วแทน 4 กลุ่ม 0 ที่ติดกันด้วย :: หนึ่งครั้ง" },
        { t: "2001:DB8::0346:8D58", why: "ผิด: ยังไม่ตัด 0 นำหน้าของกลุ่ม 0346 ซึ่งตัดได้ (ไม่ผิดกฎแต่ไม่ใช่รูปที่สั้นที่สุด)" },
        { t: "2001:DB8:0:0:0:0:346:8D58", why: "ผิด: ใช้ได้แต่ไม่ใช่รูปที่สั้นที่สุด เพราะยังไม่ได้ใช้ :: แทนกลุ่ม 0 ที่ติดกัน" },
        { t: "2001::DB8::346:8D58", why: "ผิด: ใช้ :: สองครั้ง อุปกรณ์ไม่สามารถรู้ว่าแต่ละ :: แทน 0 กี่กลุ่ม" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `address <code>2031:0000:720C:0000:0000:09E0:839A:130B</code> มีกลุ่ม 0 สองชุด คือกลุ่มที่ 2 (1 กลุ่ม) และกลุ่มที่ 4-5 (2 กลุ่ม)`,
      q: "ข้อใดคือรูปที่สั้นที่สุด (ใช้ :: กับชุด 0 ที่ยาวกว่า)?",
      opts: [
        { t: "2031:0:720C::9E0:839A:130B", why: "ถูก: ตัด 0 ของ 09E0, กลุ่ม 0 เดี่ยวเขียนเป็น 0 และ :: แทนสองกลุ่ม 0 ที่ติดกัน" },
        { t: "2031::720C::9E0:839A:130B", why: "ผิด: :: ซ้ำสองครั้ง ห้ามใช้" },
        { t: "2031:0:720C:0:0:9E0:839A:130B", why: "ผิด: เป็นรูปที่ถูกต้องตามกฎตัด 0 นำหน้า แต่ยังไม่ได้ใช้ :: แทนกลุ่ม 0 ที่ติดกัน จึงไม่ใช่รูปที่สั้นที่สุด" },
        { t: "2031:0:720C::9E:839A:130B", why: "ผิด: ห้ามตัด 0 ท้าย 09E0 เหลือ 9E เพราะกลุ่มเปลี่ยนค่า (9E0 ไม่เท่ากับ 9E)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Interface หนึ่งมี MAC address <code>00E0-FC29-31F0</code> และใช้ EUI-64 เพื่อสร้าง link-local address อัตโนมัติ`,
      q: "link-local address ที่ได้คืออะไร?",
      opts: [
        { t: "FE80::2E0:FCFF:FE29:31F0", why: "ถูก: แทรก FFFE ระหว่าง 00E0FC และ 2931F0 และกลับบิตที่ 7 ของ byte แรก (00 เป็น 02) ได้ interface ID 02E0:FCFF:FE29:31F0" },
        { t: "FE80::E0:FCFF:FE29:31F0", why: "ผิด: ลืมกลับบิตที่ 7 ของ byte แรก (ต้องเป็น 02 ไม่ใช่ 00)" },
        { t: "FE80::2E0:FC29:31F0", why: "ผิด: ไม่ได้แทรก FF-FE กลางค่า MAC ทำให้ interface ID เหลือเพียง 48 bit" },
        { t: "2001::2E0:FCFF:FE29:31F0", why: "ผิด: link-local ต้องใช้ prefix FE80::/10 ไม่ใช่ 2001::" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `MAC address ของ NIC เครื่องหนึ่งคือ <code>3C-52-82-49-7E-9D</code>`,
      q: "interface ID แบบ EUI-64 ที่ได้คืออะไร?",
      opts: [
        { t: "3E52:82FF:FE49:7E9D", why: "ถูก: 3C = 0011 1100 กลับบิตที่ 7 เป็น 0011 1110 = 3E; แทรก FFFE ตรงกลาง" },
        { t: "3C52:82FF:FE49:7E9D", why: "ผิด: ไม่ได้กลับบิตที่ 7" },
        { t: "3E52:82FE:FF49:7E9D", why: "ผิด: ต้องแทรกเป็น FF แล้วตามด้วย FE (FF-FE) ไม่ใช่ FE-FF" },
        { t: "3D52:82FF:FE49:7E9D", why: "ผิด: 3C กลับบิตที่ 7 (ค่า 2) ได้ 3E ไม่ใช่ 3D" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลระบบอยากทราบ solicited-node multicast address ของ host ที่มี address <code>2001::1234:5678/64</code> เพื่อ filter ใน packet capture`,
      q: "address ที่ถูกต้องคืออะไร?",
      opts: [
        { t: "FF02::1:FF34:5678", why: "ถูก: 24 bit ท้ายของ ...1234:5678 คือ 34:5678 ต่อท้าย FF02::1:FF" },
        { t: "FF02::1:FF12:3456", why: "ผิด: ต้องใช้ 24 bit ท้ายสุด ไม่ใช่ตรงกลางของ address" },
        { t: "FF02::2", why: "ผิด: นี่คือ all routers ไม่ใช่ solicited-node ของ host" },
        { t: "FF02::1:2", why: "ผิด: เป็น multicast ของ DHCPv6 server/relay" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรตรวจ address ของ interface หนึ่ง พบ <code>FE80::2E0:FCFF:FE99:1285</code> และ <code>2001::1977</code> ที่ตั้งโดย admin`,
      q: "interface นี้ต้องมี solicited-node multicast address กี่ตัวที่ join อยู่ และมีอะไรบ้าง?",
      opts: [
        { t: "2 ตัว: FF02::1:FF99:1285 (จาก link-local) และ FF02::1:FF00:1977 (จาก 2001::1977)", why: "ถูก: ทุก unicast address ต้องมี solicited-node ของตนเอง คำนวณจาก 24 bit ท้าย" },
        { t: "1 ตัว: FF02::1 อย่างเดียว", why: "ผิด: FF02::1 คือ all nodes ส่วน solicited-node ต้องมีเพิ่มต่ออีก address" },
        { t: "ไม่มี เพราะ solicited-node ใช้เฉพาะ router", why: "ผิด: host ก็สร้างและ join เพื่อรับ NS ของ address resolution/DAD" },
        { t: "1 ตัว เพราะ link-local กับ global ใช้ร่วมกันได้", why: "ผิด: 24 bit ท้ายต่างกัน จึงเป็นคนละ group" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ตรวจ packet capture พบ IPv6 packet หนึ่งมี Next Header ใน base header = 43 และใน extension header ตัวแรกมี Next Header = 44 และใน extension ตัวที่สองมี Next Header = 6`,
      q: "ลำดับของ header ใน packet เป็นอย่างไร?",
      opts: [
        { t: "Base header, Routing header, Fragment header, TCP", why: "ถูก: 43 = Routing, 44 = Fragment, 6 = TCP ต่อกันเป็นโซ่ตาม Next Header" },
        { t: "Base header, Fragment header, Routing header, TCP", why: "ผิด: สลับลำดับ 43 กับ 44" },
        { t: "Base header, Hop-by-Hop, Destination options, UDP", why: "ผิด: Hop-by-Hop คือ 0, Destination options คือ 60 และ UDP คือ 17" },
        { t: "Base header, AH, ESP, ICMPv6", why: "ผิด: AH = 51, ESP = 50, ICMPv6 = 58" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ทีมเครือข่ายเปรียบเทียบ IPv4 กับ IPv6 header เพื่ออธิบายว่าทำไม router ประมวลผล IPv6 ได้เร็วขึ้น`,
      q: "เหตุผลใดที่หนังสือระบุว่าช่วยให้ router ทำงานเร็วขึ้น?",
      opts: [
        { t: "header ยาวคงที่ 40 bytes ตัด checksum ออก และ extension header ไม่ถูกตรวจโดย router ทั่วไป", why: "ถูก: ไม่ต้องอ่าน header length/คำนวณ checksum ใหม่ทุก hop และ option ส่วนใหญ่ไม่ต้องอ่านระหว่างทาง" },
        { t: "ลดความยาว address ลงเหลือ 64 bit", why: "ผิด: address ยาวขึ้นเป็น 128 bit" },
        { t: "ใช้ TTL แทน Hop Limit เพื่อให้ลดค่าเร็วขึ้น", why: "ผิด: จริง ๆ แค่เปลี่ยนชื่อ TTL เป็น Hop Limit หน้าที่เหมือนเดิม" },
        { t: "ใช้ broadcast เพิ่มขึ้นเพื่อกระจายข้อมูล", why: "ผิด: IPv6 ไม่มี broadcast" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลระบบเปิด IPv6 บน interface GE0/0/0 ของ router Huawei และตั้ง address <code>2018:6:6::1/64</code> แล้ว แต่ PC ใน LAN ที่ตั้ง Obtain IPv6 automatically ไม่ได้ global address มีแค่ link-local`,
      q: "สาเหตุที่น่าจะเป็นที่สุดและวิธีแก้คืออะไร?",
      opts: [
        { t: "Router ยังไม่ส่ง RA เพราะ ค่าเริ่มต้น halt ต้องสั่ง undo ipv6 nd ra halt บน interface", why: "ถูก: SLAAC ต้องอาศัย RA ที่มี prefix; Huawei ปิดการส่ง RA เป็นค่าเริ่มต้น" },
        { t: "ต้องตั้ง M flag = 1 เพื่อให้ SLAAC ทำงาน", why: "ผิด: SLAAC ใช้ M=0, O=0 ไม่ใช่ M=1 ซึ่งเป็น stateful" },
        { t: "PC ต้องเปลี่ยน MAC ให้ตรงกับ EUI-64", why: "ผิด: PC สร้าง interface ID เองจาก MAC อยู่แล้ว" },
        { t: "ต้องเปิด NAT บน router", why: "ผิด: IPv6 ไม่ต้องใช้ NAT สำหรับการได้ address" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทต้องการแจก IPv6 address ให้เครื่องใน LAN โดยต้องบันทึกว่าเครื่องใดได้ address ไหน และต้องแจก DNS server ด้วย`,
      q: "ควรตั้ง RA flag และกลไกใด?",
      opts: [
        { t: "M = 1, O = 1 และใช้ DHCPv6 server (stateful)", why: "ถูก: M=1 ขอ address จาก DHCPv6 และ O=1 ขอ DNS; server บันทึกการแจกได้" },
        { t: "M = 0, O = 0 และใช้ SLAAC", why: "ผิด: SLAAC ไม่มี server เก็บสถานะ และไม่ได้แจก DNS" },
        { t: "ปิด RA ทั้งหมด", why: "ผิด: ถ้าไม่มี RA host ไม่รู้ว่าให้ใช้ DHCPv6" },
        { t: "ใช้ ARP ขอ address", why: "ผิด: IPv6 ไม่มี ARP และ ARP ไม่แจก address" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR1 มี GE0/0/1 = 2018:6:7::1/64 ต่อกับ AR2 (2018:6:7::2/64) และ AR2 ต่อกับ network 2018:6:8::/64 ที่ GE0/0/0 = 2018:6:8::1 ต้องการให้ AR1 ส่ง packet ไป network ฝั่ง AR2`,
      q: "คำสั่ง static route บน AR1 ข้อใดถูกต้อง?",
      opts: [
        { t: "ipv6 route-static 2018:6:8:: 64 2018:6:7::2", why: "ถูก: ระบุ destination prefix, prefix length และ next hop ที่อยู่บน link ที่ต่อตรง" },
        { t: "ipv6 route-static 2018:6:8::/64 2018:6:7::2", why: "ผิด: รูปแบบ Huawei ใช้ prefix length เป็นตัวเลขแยก ไม่ใช่ /64 ติดกับ address" },
        { t: "ipv6 route-static 2018:6:7:: 64 2018:6:8::1", why: "ผิด: สลับ destination กับ next hop และ next hop 2018:6:8::1 ไม่ได้ต่อตรงกับ AR1" },
        { t: "ipv6 route-static 2018:6:8::1 128 2018:6:7::1", why: "ผิด: next hop คือ interface ของ AR1 เอง ไม่ใช่ AR2" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรตั้ง static route บน AR1 ไปยัง 2018:6:8::/64 แล้ว ping 2018:6:8::1 จาก PC1 (2018:6:6::2) ไม่ได้ตอบกลับ ทั้งที่ packet ขาไปถึง AR2 ได้ ขณะที่ AR2 ยังไม่มี route ไป 2018:6:6::/64 (2018:6:7::/64 และ 2018:6:8::/64 ต่อตรงอยู่แล้ว)`,
      q: "ปัญหาน่าจะเกิดจากอะไร?",
      opts: [
        { t: "ไม่มี route กลับบน AR2 ไปยัง 2018:6:6::/64 (ต้องเพิ่ม ipv6 route-static 2018:6:6:: 64 2018:6:7::1)", why: "ถูก: ต้องมี route ทั้งไปและกลับ; AR2 ต้องรู้เส้นทางไปหา source" },
        { t: "IPv6 ต้องเปิด NAT บน AR1 ก่อน", why: "ผิด: ไม่เกี่ยวกับ NAT" },
        { t: "Hop limit เป็น 0", why: "ผิด: ค่าเริ่มต้นของ ping ปกติ (เช่น 64) มากพอ" },
        { t: "ต้องแก้ prefix length เป็น 128", why: "ผิด: network ปลายทางเป็น /64" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router ที่เปิด OSPFv3 สองตัวถูกตั้งค่า process ID 1 และเปิด area 0 บนทุก interface แล้ว แต่ OSPFv3 ไม่ขึ้นเพราะลืมตั้งค่าอย่างหนึ่ง`,
      q: "ข้อใดคือสิ่งที่ต้อง configure เองเสมอและไม่ได้มาจาก IPv6 address?",
      opts: [
        { t: "router-id (32 bit ในรูป x.x.x.x) ที่ unique", why: "ถูก: OSPFv3 ต้องกำหนด RID เอง เพราะ IPv6 address 128 bit ใช้สร้าง RID ไม่ได้" },
        { t: "network statement ใต้ process", why: "ผิด: OSPFv3 เปิดที่ interface ด้วย ospfv3 1 area 0 ไม่ใช้ network" },
        { t: "multicast address FF02::5 ด้วยมือ", why: "ผิด: ใช้ FF02::5 และ FF02::6 อัตโนมัติ" },
        { t: "NAT66 เพื่อให้ neighbor เห็นกัน", why: "ผิด: neighbor ใช้ link-local ในการสื่อสารอยู่แล้ว" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ทีมโครงการเตรียมเสนอผู้บริหารว่าทำไมควรย้ายไป IPv6`,
      q: "เลือกทุกข้อที่เป็นเหตุผลที่ถูกต้องตามเนื้อหา",
      opts: [
        { t: "Address space ใหญ่มาก รองรับอุปกรณ์ IoT จำนวนมาก", ok: true, why: "ถูก: 128 bit" },
        { t: "ไม่ต้องพึ่ง NAT จึงรักษา end-to-end connectivity", ok: true, why: "ถูก: ต่างจาก IPv4 ที่ใช้ NAT เป็นวงกว้าง" },
        { t: "รองรับ SLAAC ให้ host ตั้ง address เองได้", ok: true, why: "ถูก: plug-and-play" },
        { t: "IPv6 มี broadcast ที่มีประสิทธิภาพมากกว่า IPv4", ok: false, why: "ผิด: IPv6 ไม่มี broadcast ใช้ multicast แทน" },
        { t: "header ของ IPv6 มีฟิลด์ checksum ที่ครอบคลุมข้อมูลทั้งหมด", ok: false, why: "ผิด: ตัด header checksum ออก" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องการ configure address บน router interface ด้วยมือ`,
      q: "เลือกทุก address ที่ตั้งเป็น unicast address ใช้งานบน interface ได้จริงตามหลักการชนิด address",
      opts: [
        { t: "2001:12E3:1B02::21/64", ok: true, why: "ถูก: อยู่ใน 2000::/3 เป็น global unicast" },
        { t: "FD00:1234:5678:1::1/64", ok: true, why: "ถูก: อยู่ใน FD00::/8 เป็น unique local address" },
        { t: "FF00:8A3C::9B/64", ok: false, why: "ผิด: FF00::/8 คือ multicast ตั้งเป็น unicast ของ interface ไม่ได้" },
        { t: "192.168.1.1/24", ok: false, why: "ผิด: เป็น IPv4 ไม่ใช่ IPv6" },
        { t: "::/128", ok: false, why: "ผิด: unspecified address ไม่ถูกกำหนดให้ interface ใช้งาน" }
      ]
    },
    {
      type: "multi",
      story: `ตรวจสอบการทำงานของ NDP ใน network หนึ่ง`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับ NDP",
      opts: [
        { t: "NS (135) และ NA (136) ใช้ทั้ง address resolution และ DAD", ok: true, why: "ถูก" },
        { t: "RS (133) และ RA (134) ใช้ prefix advertisement/SLAAC", ok: true, why: "ถูก" },
        { t: "NDP ทำงานบน ICMPv6", ok: true, why: "ถูก: แยกชนิดข้อความด้วย Type field" },
        { t: "NDP ใช้ TCP port 546", ok: false, why: "ผิด: NDP ไม่ใช้ TCP/UDP เป็น transport อยู่บน ICMPv6" },
        { t: "ARP ยังคงจำเป็นสำหรับ IPv6 address resolution", ok: false, why: "ผิด: NDP แทน ARP" }
      ]
    },
    {
      type: "blank",
      story: `สรุป M/O flag ใน RA`,
      text: `ถ้า RA มี M = {1} และ O = {2} host จะใช้ SLAAC ไม่ต้องมี DHCPv6 server; ถ้า M = {3} host ต้องขอ address จาก DHCPv6 server โดยส่ง Solicit ไปที่ multicast {4}`,
      blanks: [
        { opts: ["0", "1"], ans: 0, why: "M=0 คือ stateless address assignment" },
        { opts: ["0", "1"], ans: 0, why: "O=0 หมายถึงไม่ต้องขอข้อมูลอื่นจาก DHCPv6" },
        { opts: ["0", "1"], ans: 1, why: "M=1 คือ stateful ใช้ DHCPv6" },
        { opts: ["FF02::1", "FF02::2", "FF02::5", "FF02::1:2"], ans: 3, why: "FF02::1:2 คือ all DHCPv6 servers and relay agents" }
      ]
    },
    {
      type: "blank",
      story: `จำค่า Next Header`,
      text: `ใน IPv6 base header Next Header = {1} หมายถึง TCP, = {2} หมายถึง UDP, = {3} หมายถึง ICMPv6 และ extension header แบบ Fragment ใช้ค่า {4}`,
      blanks: [
        { opts: ["6", "17", "58", "44"], ans: 0, why: "TCP = 6" },
        { opts: ["6", "17", "58", "44"], ans: 1, why: "UDP = 17" },
        { opts: ["6", "17", "58", "44"], ans: 2, why: "ICMPv6 = 58" },
        { opts: ["6", "17", "58", "44"], ans: 3, why: "Fragment header = 44" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ prefix กับชนิด address",
      pairs: [
        ["2000::/3", "Global unicast address"],
        ["FE80::/10", "Link-local address"],
        ["FD00::/8", "Unique local address ที่ใช้งานจริง"],
        ["FF00::/8", "Multicast address"],
        ["::1/128", "Loopback address"]
      ],
      why: "prefix เหล่านี้ใช้แยกชนิด address ตามที่ตารางสรุป"
    },
    {
      type: "match",
      q: "จับคู่ฟิลด์หรือกลไกกับหน้าที่",
      pairs: [
        ["Hop Limit", "ลดค่าทีละ 1 ที่ทุก router และทิ้ง packet เมื่อเป็น 0"],
        ["Flow Label", "ฟิลด์ 20 bit แยก flow ของ real-time traffic"],
        ["DAD", "ตรวจว่า address ที่จะใช้ซ้ำกับผู้อื่นหรือไม่ (ใช้ NS/NA)"],
        ["Anycast", "ส่งไปยัง interface ที่ใกล้ที่สุดในกลุ่มที่ใช้ address เดียวกัน"],
        ["OSPFv3 router-id", "ต้อง configure เอง ใช้ค่ารูป 32 bit"]
      ],
      why: "แต่ละคำเป็นกลไกเฉพาะของ IPv6 ตามที่อธิบายในบท"
    }
  ]
});
