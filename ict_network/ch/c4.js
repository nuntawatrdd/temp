IOT.reg({
  id: "c4",
  title: "IP Addresses and Subnetting",
  th: "binary/decimal, โครงสร้าง IPv4, subnet mask, gateway, class A-E, public/private, FLSM/VLSM, การรวม network segment และหา network ของ address",
  summary: `
<ul>
<li><b>IPv4</b> = 32 bit แบ่งเป็น <b>network part</b> + <b>host part</b>; เขียนแบบ dotted decimal 4 octet (แต่ละ octet 0-255); <b>subnet mask</b> ใช้บอกว่า bit ไหนเป็น network (เขียน 255.255.255.0 หรือ /24)</li>
<li><b>ตารางเลขที่ต้องจำ</b>: 128, 192, 224, 240, 248, 252, 254, 255 (= 1 เรียงจากซ้าย 1,2,3,4,5,6,7,8 ตัว); ขนาด block = 256 - ค่า octet ของ mask</li>
<li><b>MAC vs IP</b>: destination IP ระบุเครื่องปลายทางสุดท้าย, destination MAC ระบุ next hop เท่านั้น; ต่างเครือข่าย frame ถูกสร้าง MAC ใหม่ทุก hop ส่วน IP คงเดิม</li>
<li><b>ส่งเครื่องเดียวกัน segment?</b> IP AND mask เทียบกับปลายทาง AND mask; ถ้า segment เดียวกัน = ARP หา MAC ปลายทางตรง, ถ้าไม่ = ส่งไป MAC ของ <b>gateway</b></li>
<li><b>Class</b>: A = 1-126 (/8), B = 128-191 (/16), C = 192-223 (/24), D = 224-239 (multicast), E = 240-254; 127 = loopback</li>
<li><b>จำนวน host ใช้ได้ = 2<sup>n</sup> - 2</b> (n = host bit); host bit ทั้งหมด 0 = network address, ทั้งหมด 1 = broadcast address</li>
<li><b>Special</b>: 127.0.0.1 loopback, 169.254.0.0/16 APIPA (DHCP ล้มเหลว), 0.0.0.0 (address ชนกัน / ยังไม่มี IP)</li>
<li><b>Private</b>: 10.0.0.0/8, 172.16.0.0 - 172.31.0.0 (/16 จำนวน 16 ก้อน = 172.16.0.0/12), 192.168.0.0 - 192.168.255.0 (/24 จำนวน 256 ก้อน); ออก Internet ต้องใช้ NAT</li>
<li><b>FLSM</b>: แบ่งเท่า ๆ กัน; แบ่งเป็น 2<sup>n</sup> subnet = เลื่อน mask ไปขวา n bit; <b>VLSM</b>: ขนาดต่างกัน เลือก mask ตามจำนวน host ของแต่ละ segment (point-to-point link ใช้ /30)</li>
<li><b>Merge (supernet)</b>: เลื่อน mask ไปซ้าย n bit รวม 2<sup>n</sup> segment; รวมได้เมื่อเลข network ของ segment แรก <b>หารด้วย 2<sup>n</sup> ลงตัว</b> (2 segment: หาร 2, 4 segment: หาร 4, 8 segment: หาร 8)</li>
<li><b>หา network ของ address</b>: set host bit เป็น 0 (เช่น 192.168.0.101/26 อยู่ใน 192.168.0.64/26 เพราะ block ละ 64)</li>
</ul>`,
  sections: [
    {
      t: "พื้นฐาน Binary และ Decimal",
      ref: "หน้า 127-131",
      html: `
<p>การทำ subnetting ต้องแปลง binary กับ decimal ได้คล่อง ใน IPv4 ทุก address เป็นเลข binary 32 bit ผู้เรียนต้องเห็น mask แบบ decimal แล้วนับได้ว่ามี bit 1 กี่ตัว และเห็น mask แบบ binary แล้วเขียนเป็น decimal ได้</p>
<h4>เลขยกกำลัง 2 ที่ต้องจำ</h4>
<p>เมื่อ bit 1 เลื่อนไปทางซ้าย 1 ตำแหน่ง ค่า decimal คูณ 2</p>
<table>
<tr><th>Binary</th><th>Decimal</th><th>Binary</th><th>Decimal</th></tr>
<tr><td>1</td><td>1</td><td>10000</td><td>16</td></tr>
<tr><td>10</td><td>2</td><td>100000</td><td>32</td></tr>
<tr><td>100</td><td>4</td><td>1000000</td><td>64</td></tr>
<tr><td>1000</td><td>8</td><td>10000000</td><td>128</td></tr>
</table>
<h4>ค่า octet ของ subnet mask</h4>
<table>
<tr><th>Binary (8 bit)</th><th>Decimal</th><th>วิธีคิด</th></tr>
<tr><td>1000 0000</td><td>128</td><td>128</td></tr>
<tr><td>1100 0000</td><td>192</td><td>128 + 64</td></tr>
<tr><td>1110 0000</td><td>224</td><td>128 + 64 + 32</td></tr>
<tr><td>1111 0000</td><td>240</td><td>+ 16</td></tr>
<tr><td>1111 1000</td><td>248</td><td>+ 8</td></tr>
<tr><td>1111 1100</td><td>252</td><td>+ 4</td></tr>
<tr><td>1111 1110</td><td>254</td><td>+ 2</td></tr>
<tr><td>1111 1111</td><td>255</td><td>+ 1 (ครบ 8 ตัว = 255)</td></tr>
</table>
<figure><img src="i/p129_1.webp" alt="เส้นจำนวน 0-255 แสดงจุดแบ่งครึ่ง 128, 192, 224" loading="lazy"><figcaption>Fig. 4.1 Correlation between binary and decimal numbers (ลากเส้น 0-255 แล้วแบ่งครึ่งซ้ำ: 128, 192, 224 ...)</figcaption></figure>
<p>ถ้าลืมตาราง ให้ลากเส้นจำนวน 0 ถึง 255 (รวม 256 ค่า) กลางเส้นคือ 128 (<code>1000 0000</code>) ก่อน 128 bit ซ้ายสุดเป็น 0 หลัง 128 bit ซ้ายสุดเป็น 1 กลางของ 128-255 คือ 192 (bit ซ้ายสุด 2 ตัวเป็น 1) กลางของ 192-255 คือ 224 (3 ตัวเป็น 1) ทำแบบนี้ต่อไปได้ทุกค่า</p>
<h4>กฎหาเลข binary ท้ายของ decimal</h4>
<p>จำเป็นตอน <b>รวม network segment</b> ซึ่งต้องรู้ bit ท้าย ๆ ของเลข network</p>
<ul>
<li>หารด้วย 2 ลงตัว: bit ท้าย 1 ตัวเป็น <code>0</code>; เศษ 1: เป็น <code>1</code></li>
<li>หารด้วย 4 ลงตัว: bit ท้าย 2 ตัวเป็น <code>00</code></li>
<li>หารด้วย 8 ลงตัว: bit ท้าย 3 ตัวเป็น <code>000</code></li>
<li>หารด้วย 16 ลงตัว: bit ท้าย 4 ตัวเป็น <code>0000</code></li>
<li>สรุป: bit ท้าย n ตัว = (เลข mod 2<sup>n</sup>) เขียนเป็น binary n หลัก</li>
</ul>
<p><b>ตัวอย่าง</b>: 242 mod 16 = 2 (242 = 15 x 16 + 2) เขียนเป็น 4 หลักคือ <code>0010</code> ดังนั้น 242 = <code>1111 0010</code> (4 bit ท้ายคือ 0010)</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>mask octet: 128, 192, 224, 240, 248, 252, 254, 255 = มี bit 1 เรียงจากซ้าย 1 ถึง 8 ตัว</li>
<li>เลขหารด้วย 2<sup>n</sup> ลงตัว = bit ท้าย n ตัวเป็น 0 (ใช้ตัดสินว่า segment ไหนรวมกันได้)</li>
</ul></div>`
    },
    {
      t: "MAC Address กับ IP Address",
      ref: "หน้า 131-132",
      html: `
<p>การ์ดเครือข่ายมี MAC address อยู่แล้ว แต่ยังต้องมี IP address เพราะ IP ใช้ระบุตำแหน่งในเครือข่ายที่มีหลาย segment และเป็นข้อมูลที่ router ใช้ตัดสินใจส่งต่อ</p>
<figure><img src="i/p131_1.webp" alt="เครือข่าย 3 segment ต่อด้วย router 2 ตัว แสดง MAC และ IP ของแต่ละ hop" loading="lazy"><figcaption>Fig. 4.2 The role of MAC addresses and IP addresses (IP ปลายทางคงเดิมทั้งทาง ส่วน MAC เปลี่ยนทุก hop)</figcaption></figure>
<p>ตัวอย่าง Computer A (10.0.0.2) ส่งถึง Computer F (12.0.0.2) ผ่าน Router 1 และ Router 2</p>
<table>
<tr><th>ช่วง</th><th>Src IP</th><th>Dst IP</th><th>Src MAC</th><th>Dst MAC</th></tr>
<tr><td>A ถึง Router 1</td><td>10.0.0.2</td><td>12.0.0.2</td><td>MA</td><td>M1 (gateway)</td></tr>
<tr><td>Router 1 ถึง Router 2</td><td>10.0.0.2</td><td>12.0.0.2</td><td>M2</td><td>M3</td></tr>
<tr><td>Router 2 ถึง F</td><td>10.0.0.2</td><td>12.0.0.2</td><td>M4</td><td>MF</td></tr>
</table>
<ul>
<li><b>Destination IP</b> กำหนดว่า packet จะไปถึงเครื่องใดในที่สุด</li>
<li><b>Destination MAC</b> กำหนดว่า hop ถัดไปคืออุปกรณ์ใด (ไม่จำเป็นต้องเป็นปลายทาง)</li>
<li>ทุกครั้งที่ผ่าน router จะ <b>สร้าง frame ใหม่</b> (เปลี่ยน MAC) แต่ IP header คงเดิม</li>
</ul>
<h4>ทำไมไม่ใช้ MAC อย่างเดียวทั้งโลก</h4>
<p>ถ้าทั้งโลกเป็น Ethernet เดียว broadcast frame ของเครื่องหนึ่งจะถึงทุกเครื่องและใช้แบนด์วิดท์จนหมด จึงต้องมีอุปกรณ์ Layer 3 (router, L3 switch) คั่นเพื่อ <b>แยก broadcast domain</b> โดย router ไม่ forward broadcast frame ต่างเครือข่ายโดยปริยาย</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Dst IP = ปลายทางสุดท้าย (คงที่), Dst MAC = hop ถัดไป (เปลี่ยนทุก hop)</li>
<li>Router แยก broadcast domain; switch (L2) ไม่แยก</li>
</ul></div>`
    },
    {
      t: "โครงสร้าง IP, Subnet Mask และ Gateway",
      ref: "หน้า 132-140",
      html: `
<h4>Network ID และ Host ID</h4>
<p>เปรียบเทียบกับเบอร์โทรศัพท์ซึ่งมี area code + เลขท้องถิ่น IP address ก็มี <b>network ID</b> (เหมือน area code) และ <b>host ID</b> เครื่องใน segment เดียวกันมี network part เหมือนกัน router เชื่อมต่างเครือข่าย ส่วน switch เชื่อมเครื่องใน segment เดียวกัน</p>
<figure><img src="i/p133_1.webp" alt="เครือข่ายสอง segment แสดง network ID, host ID และ gateway" loading="lazy"><figcaption>Fig. 4.4 Network IDs, host IDs and gateways (เครื่องใน segment เดียวกัน network ID เหมือนกัน; gateway คือ interface ของ router)</figcaption></figure>
<h4>Dotted decimal</h4>
<p>binary 32 bit แบ่งเป็น 4 ส่วน ส่วนละ 8 bit คั่นด้วยจุด เช่น <code>10101100.00010000.00011110.00111000</code> = <b>172.16.30.56</b> ค่าสูงสุดของแต่ละส่วนคือ 255</p>
<h4>Subnet mask</h4>
<p>subnet mask มี <b>หน้าที่เดียว</b> คือแบ่ง IP เป็น network part กับ host part เขียนได้ 2 แบบ: dotted decimal (255.255.255.128) หรือ prefix length (/25 = จำนวน bit 1)</p>
<figure><img src="i/p136_1.webp" alt="หน้าต่างตั้งค่า IPv4 แสดง IP 131.107.41.6 mask 255.255.255.0 network part และ host part" loading="lazy"><figcaption>Fig. 4.6 The function of subnet mask (1) (131.107.41.6 / 255.255.255.0: network part คือ 131.107.41, host part คือ 6)</figcaption></figure>
<table>
<tr><th>IP</th><th>Mask</th><th>Network ที่เครื่องอยู่</th><th>เครื่องที่อยู่ segment เดียวกัน</th></tr>
<tr><td>131.107.41.6</td><td>255.255.255.0 (/24)</td><td>131.107.41.0/24</td><td>131.107.41.123 ใช่, 131.107.42.123 ไม่ใช่</td></tr>
<tr><td>131.107.41.6</td><td>255.255.0.0 (/16)</td><td>131.107.0.0/16</td><td>131.107.42.123 ใช่, 131.108.42.123 ไม่ใช่</td></tr>
<tr><td>131.107.41.6</td><td>255.0.0.0 (/8)</td><td>131.0.0.0/8</td><td>131.108.42.123 ใช่, 132.108.42.123 ไม่ใช่</td></tr>
</table>
<h4>การ AND ระหว่าง IP กับ mask</h4>
<p>เครื่องคำนวณ network ของตนด้วย <b>AND</b> ของ IP กับ mask ทีละ bit (1 AND 1 = 1, นอกนั้น = 0) ผลคือ host bit กลายเป็น 0 ทั้งหมด ส่วน network bit คงเดิม</p>
<figure><img src="i/p138_2.webp" alt="การ AND ของ IP 131.107.41.6 กับ mask 255.255.255.0 ได้ 131.107.41.0" loading="lazy"><figcaption>Fig. 4.9 The function of subnet mask (4) (IP AND mask = network address)</figcaption></figure>
<h4>Gateway และขั้นตอนก่อนส่ง</h4>
<p>ก่อนส่ง เครื่องต้องรู้ว่าปลายทางอยู่ segment เดียวกันหรือไม่: (src IP AND mask) เทียบกับ (dst IP AND mask)</p>
<ul>
<li><b>เหมือนกัน</b>: ส่ง frame ตรงไปยัง MAC ของปลายทาง (หาด้วย ARP)</li>
<li><b>ต่างกัน</b>: ใช้ <b>MAC ของ gateway</b> เป็น destination MAC เพื่อให้ switch ส่งถึง router</li>
<li>ถ้าไม่ตั้ง gateway เครื่องจะส่งข้ามเครือข่ายไม่ได้ เพราะไม่รู้ next hop</li>
<li>gateway คือ address ของ interface router/L3 ใน segment นั้น มักใช้ address ใช้งานได้ตัวแรกหรือตัวสุดท้าย เพื่อลดโอกาสซ้ำกับเครื่องอื่น; interface ของ router ต้องตั้ง mask ด้วย</li>
</ul>
<figure><img src="i/p139_1.webp" alt="router ต่อสอง segment 131.107.41.0/24 และ 131.107.42.0/24 พร้อม gateway" loading="lazy"><figcaption>Fig. 4.10 The function of subnet masks and gateways</figcaption></figure>
<h4>กรณี mask ไม่ตรงกัน (ไม่ตั้ง gateway ทั้งคู่)</h4>
<p>เครือข่ายใช้งานได้ก็ต่อเมื่อ <b>packet ไปถึงและส่งกลับได้</b></p>
<ul>
<li>A = 131.107.41.6/16, B = 131.107.41.28/24: A คิดว่า B อยู่ segment เดียวกัน (131.107.0.0/16) ส่งตรง; B ตอบกลับโดยคิดว่า A (131.107.41.6) อยู่ใน 131.107.41.0/24 เหมือนกัน ส่งตรง = <b>สื่อสารได้</b></li>
<li>A = 131.107.42.6/16, B = 131.107.41.28/24: A ส่งถึง B ได้ (อยู่ใน 131.107.0.0/16) แต่ B เห็นว่า 131.107.42.6 ไม่อยู่ใน 131.107.41.0/24 ต้องส่งไป gateway ซึ่งไม่ได้ตั้ง = <b>ตอบกลับไม่ได้ ใช้งานไม่ได้</b></li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>เครื่องตัดสิน "segment เดียวกันหรือไม่" ด้วย mask ของตัวเองเท่านั้น</li>
<li>ปลายทางคนละ segment: dst MAC = MAC ของ gateway (ไม่ใช่ MAC ปลายทางจริง)</li>
<li>Network address = IP AND mask (host bit เป็น 0 ทั้งหมด)</li>
</ul></div>
<div class="warn"><b>ระวัง</b> ฝั่งหนึ่งส่งได้แต่อีกฝั่งตอบกลับไม่ได้ ถือว่าเครือข่าย "ไม่ติด" ให้ตรวจ mask/gateway ของ <b>ทั้งสองฝั่ง</b> เสมอ</div>`
    },
    {
      t: "Class ของ IP Address และ Address พิเศษ",
      ref: "หน้า 140-143",
      html: `
<p>แรกเริ่ม IP แบ่งเป็น 5 class ดูจาก bit นำหน้าก็รู้ mask ทันที</p>
<table>
<tr><th>Class</th><th>bit นำหน้า</th><th>octet แรก</th><th>Default mask</th><th>Host ใช้ได้</th></tr>
<tr><td>A</td><td>0</td><td>1 - 126</td><td>255.0.0.0 (/8)</td><td>2<sup>24</sup> - 2 = 16,777,214</td></tr>
<tr><td>B</td><td>10</td><td>128 - 191</td><td>255.255.0.0 (/16)</td><td>2<sup>16</sup> - 2 = 65,534</td></tr>
<tr><td>C</td><td>110</td><td>192 - 223</td><td>255.255.255.0 (/24)</td><td>2<sup>8</sup> - 2 = 254</td></tr>
<tr><td>D</td><td>1110</td><td>224 - 239</td><td>ไม่มี mask</td><td>multicast (ใช้เป็น destination เท่านั้น)</td></tr>
<tr><td>E</td><td>1111</td><td>240 - 254</td><td>ไม่แยก network/host</td><td>สำรองไว้ใช้อนาคต</td></tr>
</table>
<figure><img src="i/p140_1.webp" alt="โครงสร้าง Class A: network 8 bit host 24 bit" loading="lazy"><figcaption>Fig. 4.13 Network ID and host ID of Class A address</figcaption></figure>
<figure><img src="i/p141_1.webp" alt="โครงสร้าง Class B" loading="lazy"><figcaption>Fig. 4.14 Network ID and host ID of Class B address</figcaption></figure>
<figure><img src="i/p141_2.webp" alt="โครงสร้าง Class C" loading="lazy"><figcaption>Fig. 4.15 Network ID and host ID of Class C address</figcaption></figure>
<figure><img src="i/p142_1.webp" alt="เส้นจำนวน 0-255 แสดงช่วงของ class A ถึง E" loading="lazy"><figcaption>Fig. 4.18 A chart to help remember IP address classification (ช่วง octet แรกของ class A-E)</figcaption></figure>
<ul>
<li>Class A ไม่ใช้ 0 (network ID ทั้งหมดเป็น 0) และ 127 (reserved) จึงเหลือ 1-126</li>
<li>จำนวน address ใช้ได้ = <b>2<sup>n</sup> - 2</b> (n = host bit) เพราะต้องเว้น network address และ broadcast address</li>
<li>จำช่วง multicast (224-239) ไว้ เพราะตอน capture packet ต้องแยก multicast ออกจาก broadcast</li>
</ul>
<h4>Address พิเศษ</h4>
<table>
<tr><th>Address</th><th>ความหมาย</th></tr>
<tr><td>host bit ทั้งหมด 0 (เช่น 192.168.10.0/24)</td><td><b>Network address</b> ใช้แทน segment ทั้งก้อน ห้ามใช้กับเครื่อง</td></tr>
<tr><td>host bit ทั้งหมด 1 (เช่น 192.168.10.255)</td><td><b>Broadcast address</b> ถึงทุกเครื่องใน segment (dst MAC = FF-FF-FF-FF-FF-FF) ห้ามใช้กับเครื่อง</td></tr>
<tr><td>127.0.0.1</td><td><b>Loopback</b> อยู่ใน IP stack ของเครื่อง ไม่ผ่านเครือข่าย ping ได้แปลว่า TCP/IP stack ปกติ (แม้ไม่มี NIC)</td></tr>
<tr><td>169.254.0.0/16</td><td><b>APIPA</b>: Windows ตั้งให้เองเมื่อขอ IP ไม่ได้ (mask 255.255.0.0) เครื่องที่ได้ 169.254.x.x คุยกันเองใน segment ได้</td></tr>
<tr><td>0.0.0.0</td><td>เครื่องที่ address ชนกับเครื่องอื่น ipconfig จะแสดง 0.0.0.0 (หรือยังไม่มี IP)</td></tr>
</table>
<figure><img src="i/p145_1.webp" alt="ipconfig แสดง autoconfiguration IP 169.254.91.34 mask 255.255.0.0" loading="lazy"><figcaption>Fig. 4.20 IP address automatically configured by Windows (APIPA 169.254.x.x)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>A 1-126, B 128-191, C 192-223, D 224-239 (multicast), E 240-254</li>
<li>host ใช้ได้ = 2<sup>n</sup> - 2; ตัดทิ้ง network address (host bit 0) และ broadcast (host bit 1)</li>
<li>127.0.0.1 = ทดสอบ stack ของตัวเอง; 169.254.x.x = ขอ IP จาก DHCP ไม่ได้</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> เมื่อใช้ subnet/CIDR แล้ว address ที่ "ดูเหมือน" broadcast หรือ network อาจใช้ได้จริง เช่น 192.168.0.255/23 ใช้เป็น host ได้ ต้องดู host bit ทั้งหมดใน binary ไม่ใช่ดูแค่ octet สุดท้าย</div>`
    },
    {
      t: "Public Address และ Private Address",
      ref: "หน้า 143-146",
      html: `
<h4>Public address</h4>
<p>address ที่วางแผนและจัดสรรทั่วโลก <b>ห้ามซ้ำกัน</b> ISP แต่ละระดับขอจากองค์กรกลาง (InterNIC) เมื่อรู้ IP จึงตามได้ว่าอยู่ ISP และเมืองใด (เช่น ใช้เว็บค้นหา location ของ IP ที่โจมตีเว็บไซต์)</p>
<h4>Private address</h4>
<p>ใช้ในเครือข่ายภายใน (องค์กร, โรงเรียน) ไม่มี route ใน Internet องค์กรต่างกันใช้ซ้ำกันได้ ช่วยประหยัด public address และปลอดภัยกว่าเพราะเข้าถึงจาก Internet ตรง ๆ ไม่ได้ ต้องใช้ <b>NAT</b> เมื่อออก Internet</p>
<table>
<tr><th>Class</th><th>ช่วง</th><th>จำนวน network ที่สงวน</th></tr>
<tr><td>A</td><td>10.0.0.0/8</td><td>1 ก้อน</td></tr>
<tr><td>B</td><td>172.16.0.0/16 ถึง 172.31.0.0/16</td><td>16 ก้อน (รวมเป็น 172.16.0.0/12)</td></tr>
<tr><td>C</td><td>192.168.0.0/24 ถึง 192.168.255.0/24</td><td>256 ก้อน (รวมเป็น 192.168.0.0/16)</td></tr>
</table>
<ul>
<li>7 แผนก แผนกละไม่เกิน 200 เครื่อง: ใช้ Class C private ก็พอ</li>
<li>เครือข่ายขนาดใหญ่ (กรมศึกษาธิการ + โรงเรียนหลายร้อยแห่ง): ใช้ 10.0.0.0 แล้วแบ่ง /24 ได้ 65,536 subnet (2<sup>16</sup>) subnet ละ 254 host</li>
</ul>
<div class="warn"><b>ระวัง</b> 172.15.x.x และ 172.32.x.x <b>ไม่ใช่</b> private (private คือ 172.16-172.31 เท่านั้น); 192.169.x.x ก็ไม่ใช่</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>Private: 10/8, 172.16-172.31 (/12), 192.168/16</li>
<li>Private ไม่มี route ใน Internet ต้องใช้ NAT</li>
</ul></div>`
    },
    {
      t: "Subnetting แบบ FLSM (แบ่งเท่ากัน)",
      ref: "หน้า 147-153",
      html: `
<h4>ทำไมต้อง subnet</h4>
<p>IPv4 มี 2<sup>32</sup> = 4,294,967,296 address แต่หมดแล้ว ตัด class D/E กับ private ออกยิ่งเหลือน้อย ตามหลัก class ถ้ามี 400 เครื่อง Class C ไม่พอ (254) แต่ Class B ใช้ได้ 65,534 address ซึ่ง <b>สิ้นเปลืองมาก</b> จึงต้อง <b>ยืม host bit มาเป็น subnet bit</b> เพื่อให้จำนวน address ใกล้เคียงจำนวนเครื่อง</p>
<figure><img src="i/p147_1.webp" alt="ตัวอย่าง address สิ้นเปลือง Class C กับ Class B" loading="lazy"><figcaption>Fig. 4.23 Address waste (400 เครื่องแต่ได้ Class B 65,534 address)</figcaption></figure>
<p>งานของ subnetting มี 2 อย่าง: (1) กำหนดความยาว subnet mask (2) หา address แรกและสุดท้ายที่ใช้ได้ในแต่ละ subnet</p>
<h4>กฎสำคัญ</h4>
<div class="must"><b>ต้องจำ</b><ul>
<li>แบ่งเป็น <b>2<sup>n</sup> subnet เท่า ๆ กัน</b> = เลื่อน mask ไปทางขวา <b>n bit</b> (จำนวน bit 1 เพิ่ม n)</li>
<li>แต่ละ subnet = 1/2<sup>n</sup> ของเดิม; ขนาด block = 2<sup>host bit</sup></li>
<li>address แรกของ block = network address, address สุดท้าย = broadcast; host ใช้ได้ = แรก+1 ถึง สุดท้าย-1</li>
</ul></div>
<h4>แบ่ง 192.168.0.0/24 เป็น 2 subnet (/25)</h4>
<figure><img src="i/p149_1.webp" alt="bit แรกของ octet ที่ 4 เป็น 0 คือ subnet A เป็น 1 คือ subnet B, mask 255.255.255.128" loading="lazy"><figcaption>Fig. 4.25 Equally divide the network into two subnets (ใช้ bit แรกของ host แบ่งที่จุด 128)</figcaption></figure>
<table>
<tr><th>Subnet</th><th>Network</th><th>Host ใช้ได้</th><th>Broadcast</th></tr>
<tr><td>A</td><td>192.168.0.0/25</td><td>.1 - .126</td><td>.127</td></tr>
<tr><td>B</td><td>192.168.0.128/25</td><td>.129 - .254</td><td>.255</td></tr>
</table>
<p>mask = 255.255.255.128</p>
<h4>แบ่งเป็น 4 subnet (/26, mask 255.255.255.192)</h4>
<figure><img src="i/p150_2.webp" alt="แบ่ง Class C เป็น 4 subnet ใช้ 2 bit แรกของ host" loading="lazy"><figcaption>Fig. 4.28 Equally divide the network into four subnets</figcaption></figure>
<table>
<tr><th>Subnet</th><th>Network</th><th>Host ใช้ได้</th><th>Broadcast</th></tr>
<tr><td>A</td><td>.0/26</td><td>.1 - .62</td><td>.63</td></tr>
<tr><td>B</td><td>.64/26</td><td>.65 - .126</td><td>.127</td></tr>
<tr><td>C</td><td>.128/26</td><td>.129 - .190</td><td>.191</td></tr>
<tr><td>D</td><td>.192/26</td><td>.193 - .254</td><td>.255</td></tr>
</table>
<h4>แบ่งเป็น 8 subnet (/27, mask 255.255.255.224)</h4>
<figure><img src="i/p151_2.webp" alt="แบ่ง Class C เป็น 8 subnet ใช้ 3 bit แรกของ host" loading="lazy"><figcaption>Fig. 4.30 Equally divide the network into eight subnets (block ละ 32)</figcaption></figure>
<p>block ละ 32: network .0, .32, .64, .96, .128, .160, .192, .224; broadcast .31, .63, .95, .127, .159, .191, .223, .255; host ใช้ได้ ตัวอย่าง A คือ .1 - .30, B คือ .33 - .62</p>
<h4>Class B: 131.107.0.0/16 แบ่งเป็น 2 subnet</h4>
<figure><img src="i/p152_2.webp" alt="แบ่ง Class B 131.107.0.0/16 เป็นสอง subnet mask 255.255.128.0" loading="lazy"><figcaption>Fig. 4.31 Subnetting of Class B network</figcaption></figure>
<p>mask = 255.255.128.0 (/17) Subnet A = 131.107.0.0/17 ใช้ได้ 131.107.0.1 - 131.107.127.254 ส่วน Subnet B = 131.107.128.0/17 ใช้ได้ 131.107.128.1 - 131.107.255.254</p>
<figure><img src="i/p153_1.webp" alt="host bit ของ subnet A เขียนเป็น binary เพื่อหา address แรกและสุดท้าย" loading="lazy"><figcaption>Fig. 4.32 Address range of Subnet A (เขียน host bit เป็น binary เพื่อกัน error)</figcaption></figure>
<div class="warn"><b>ระวัง</b> 131.107.0.255/17 <b>ใช้เป็น host ได้</b> เพราะ host bit ทั้ง 15 ตัวไม่ได้เป็น 1 ทั้งหมด (octet 3 เป็น 0) อย่าตัดสินจากการเห็น .255 ท้ายเลข</div>
<div class="note"><b>หมายเหตุ</b> ถ้ายังไม่คล่อง ให้เขียน host bit เป็น binary ทุกครั้ง: host bit ห้ามเป็น 0 ทั้งหมด (network) หรือ 1 ทั้งหมด (broadcast)</div>`
    },
    {
      t: "Subnetting แบบ VLSM (ขนาดไม่เท่ากัน)",
      ref: "หน้า 153-156",
      html: `
<p>เมื่อแต่ละ segment มีจำนวนเครื่องไม่เท่ากัน ต้องแบ่งเป็น subnet ขนาดต่างกัน = <b>VLSM</b> (mask ของแต่ละ subnet ต่างกันได้) ทำให้ ISP แบ่ง block ใหญ่ให้พอดีลูกค้า และ mask ไม่จำกัดที่ขอบ octet</p>
<p>โจทย์ของหนังสือ: Class C 192.168.0.0/24 ต้องแบ่งเป็น 5 segment: LAN 20 เครื่อง (A), 50 เครื่อง (B), 100 เครื่อง (C) และ link ระหว่าง router อีก 2 link (D, E) ที่แต่ละ link ใช้ 2 address</p>
<figure><img src="i/p154_1.webp" alt="VLSM: เส้นจำนวน 0-255 แบ่งเป็น 128-255 สำหรับ 100 เครื่อง, 64-127 สำหรับ 50 เครื่อง, 32-63 สำหรับ 20 เครื่อง" loading="lazy"><figcaption>Fig. 4.34 VLSM subnetting (จัดบนเส้นจำนวน เริ่มจาก segment ใหญ่สุด)</figcaption></figure>
<h4>ขั้นตอนที่ใช้ได้เสมอ</h4>
<ol>
<li>หา host bit ที่ต้องใช้ของแต่ละ segment (2<sup>n</sup> - 2 &gt;= จำนวนเครื่อง) แล้วได้ prefix = 32 - n</li>
<li>จัดจากก้อน <b>ใหญ่ไปเล็ก</b> วางบนเส้นจำนวน 0-255 ให้ตรงขอบ block ของตัวเอง ไม่ซ้อนกัน</li>
<li>เขียน network, host แรก-สุดท้าย, broadcast</li>
</ol>
<table>
<tr><th>Segment</th><th>ต้องการ</th><th>Prefix</th><th>Mask</th><th>Network</th><th>Host ใช้ได้</th></tr>
<tr><td>C</td><td>100 host</td><td>/25 (126)</td><td>255.255.255.128</td><td>192.168.0.128/25</td><td>.129 - .254</td></tr>
<tr><td>B</td><td>50 host</td><td>/26 (62)</td><td>255.255.255.192</td><td>192.168.0.64/26</td><td>.65 - .126</td></tr>
<tr><td>A</td><td>20 host</td><td>/27 (30)</td><td>255.255.255.224</td><td>192.168.0.32/27</td><td>.33 - .62</td></tr>
<tr><td>D (link)</td><td>2 host</td><td>/30 (2)</td><td>255.255.255.252</td><td>192.168.0.0/30</td><td>.1 - .2 (broadcast .3)</td></tr>
<tr><td>E (link)</td><td>2 host</td><td>/30 (2)</td><td>255.255.255.252</td><td>192.168.0.4/30</td><td>.5 - .6 (broadcast .7)</td></tr>
</table>
<p>ยังเหลือ block .8 - .31 ไม่ได้ใช้ ซึ่งเก็บไว้ขยายได้ (วิธีจัดแบบอื่นก็ได้ เช่น 100 เครื่องใช้ 0-127, 50 เครื่องใช้ 128-191, 20 เครื่องใช้ 192-223)</p>
<figure><img src="i/p155_1.webp" alt="broadcast address ของ subnet /30 ที่ 192.168.0.3" loading="lazy"><figcaption>Fig. 4.37 Broadcast address (192.168.0.0/30: .3 คือ broadcast จึงเหลือ .1 กับ .2 ให้ router สองฝั่ง)</figcaption></figure>
<h4>Link ระหว่าง router ต้องใช้ /30</h4>
<p>link point-to-point ต้องการ 2 address (ฝั่งละ 1) ดังนั้น host bit = 2 (4 address: network + 2 host + broadcast) = <b>/30 = 255.255.255.252</b> (เลื่อน mask 6 bit จาก /24 จึงเหลือ 1/64 ของเดิม)</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>เลือก prefix จากจำนวน host: 2<sup>n</sup> - 2 &gt;= host; /30 = 2 host, /29 = 6, /28 = 14, /27 = 30, /26 = 62, /25 = 126, /24 = 254</li>
<li>VLSM: จัด block ใหญ่ก่อน, block ต้องเริ่มที่ตัวคูณของขนาดตัวเอง และห้ามซ้อนกัน</li>
<li>Link point-to-point = /30 (2 host)</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ในหนังสือเรียกว่า variable length subnet mask เขียนเป็น "/n" เช่น 131.107.23.32/25 ตัวเลขหลังเครื่องหมาย / คือจำนวน network bit</div>`
    },
    {
      t: "รวม Network Segment (Merge / Supernet)",
      ref: "หน้า 156-161",
      html: `
<p>ตรงข้ามกับ subnetting: แทนที่จะยืม host bit มาเป็น network bit ก็ <b>คืน network bit เป็น host bit</b> เพื่อรวมหลาย segment เป็นก้อนใหญ่ เหมาะเมื่อเครื่องเพิ่มจนเกิน segment เดิม</p>
<p>ตัวอย่าง: segment 192.168.0.0/24 มี 200 เครื่อง ขยายเป็น 400 เครื่อง ถ้าเพิ่ม 192.168.1.0/24 เป็น segment ที่สอง ทั้งที่อยู่ switch ชุดเดียวกัน เครื่องสองกลุ่มต้องผ่าน router เพื่อคุยกัน (ไม่มีประสิทธิภาพ) ทางที่ดีกว่าคือรวมเป็น 192.168.0.0/23</p>
<figure><img src="i/p157_2.webp" alt="รวม 192.168.0.0/24 กับ 192.168.1.0/24: เลื่อน mask ไปซ้าย 1 bit ได้ /23 (255.255.254.0)" loading="lazy"><figcaption>Fig. 4.40 Merge two subnets (เลื่อน mask ไปซ้าย 1 bit, network part ของสอง segment กลายเป็นเหมือนกัน)</figcaption></figure>
<ul>
<li>Network ที่รวมแล้ว = 192.168.0.0/23, mask 255.255.254.0, host ใช้ได้ 192.168.0.1 - 192.168.1.254</li>
<li>192.168.0.255/23 <b>ใช้เป็น host ได้</b> เพราะ host bit ไม่ได้เป็น 1 ทั้งหมด (octet 3 เป็น 0)</li>
</ul>
<h4>กฎการรวม: ไม่ใช่ติดกันแล้วรวมได้ทุกคู่</h4>
<p>192.168.1.0/24 กับ 192.168.2.0/24 ติดกันแต่ <b>รวมด้วย /23 ไม่ได้</b> เพราะเลข octet 3 เป็น <code>00000001</code> กับ <code>00000010</code> เมื่อเลื่อน mask ซ้าย 1 bit ส่วน network จะเหลือ 7 bit แรกของ octet 3 ซึ่งยังต่างกัน (0000000 กับ 0000001)</p>
<figure><img src="i/p159_1.webp" alt="192.168.1.0 กับ 192.168.2.0 เลื่อน mask 1 bit แล้ว network part ยังต่างกัน" loading="lazy"><figcaption>Fig. 4.43 The rule of merging network segments (1) (1 กับ 2 รวมด้วย /23 ไม่ได้)</figcaption></figure>
<figure><img src="i/p159_2.webp" alt="ต้องเลื่อน mask 2 bit จึงรวมได้ แต่กลายเป็นรวม 4 segment" loading="lazy"><figcaption>Fig. 4.44 The rule of merging network segments (2) (ต้องเลื่อน 2 bit ซึ่งรวมไปถึง 4 segment)</figcaption></figure>
<table>
<tr><th>จำนวน segment</th><th>เลื่อน mask</th><th>เงื่อนไข (เลข octet ของ segment แรก)</th><th>ตัวอย่าง</th></tr>
<tr><td>2</td><td>ซ้าย 1 bit</td><td>หารด้วย <b>2</b> ลงตัว (bit ท้าย = 0)</td><td>192.168.2.0 + 3.0 = 192.168.2.0/23 (ได้); 31.0 + 32.0 (ไม่ได้, 31 เป็นเลขคี่); 142.0 + 143.0 (ได้)</td></tr>
<tr><td>4</td><td>ซ้าย 2 bit</td><td>หารด้วย <b>4</b> ลงตัว (bit ท้าย = 00)</td><td>192.168.0-3.0 = 192.168.0.0/22; 192.168.4-7.0 = 192.168.4.0/22</td></tr>
<tr><td>8</td><td>ซ้าย 3 bit</td><td>หารด้วย <b>8</b> ลงตัว</td><td>192.168.8-15.0 = 192.168.8.0/21</td></tr>
<tr><td>2<sup>n</sup></td><td>ซ้าย n bit</td><td>หารด้วย 2<sup>n</sup> ลงตัว</td><td></td></tr>
</table>
<figure><img src="i/p159_3.webp" alt="รวม 192.168.0.0/24 และ 192.168.1.0/24" loading="lazy"><figcaption>Fig. 4.45 Merge 192.168.0.0/24 and 192.168.1.0/24</figcaption></figure>
<figure><img src="i/p160_1.webp" alt="รวมสี่ segment 192.168.0-3.0/24 เป็น 192.168.0.0/22" loading="lazy"><figcaption>Fig. 4.47 Merge four network segments (เลื่อน mask ซ้าย 2 bit)</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>รวม 2<sup>n</sup> segment ที่ติดกัน = เลื่อน mask ซ้าย n bit; ต้องจัดให้ <b>ตรงขอบ</b>: เลข network แรกหารด้วย 2<sup>n</sup> ลงตัว</li>
<li>Network ที่รวมแล้วใช้ network address ของ segment แรก เช่น 192.168.4.0/22 สำหรับ 4.0-7.0</li>
</ul></div>
<div class="warn"><b>ระวัง</b> รวมที่ไม่ตรงขอบจะกินเลข segment อื่นเข้ามาด้วย เช่น 192.168.1.0 - 192.168.2.0 ถ้าจะรวมต้องใช้ /22 ซึ่งกิน 192.168.0.0 - 192.168.3.0</div>`
    },
    {
      t: "หาว่า IP หนึ่ง ๆ อยู่ Network ไหน",
      ref: "หน้า 161-162",
      html: `
<p>วิธี: <b>ตั้ง host bit เป็น 0 ทั้งหมด</b> (= IP AND mask) แต่ทางลัดคือหา block size แล้วหาว่า IP อยู่ใน block ไหน</p>
<h4>ตัวอย่าง 192.168.0.101/26</h4>
<ul>
<li>/26 = เลื่อน mask 2 bit จาก /24 = 4 subnet ขนาด 64: 0, 64, 128, 192</li>
<li>101 อยู่ระหว่าง 64 กับ 127 จึงเป็น <b>192.168.0.64/26</b> (broadcast .127, host .65-.126)</li>
</ul>
<figure><img src="i/p161_2.webp" alt="192.168.0.101/26 AND mask ได้ 192.168.0.64" loading="lazy"><figcaption>Fig. 4.49 192.168.0.101/26 อยู่ใน subnet 192.168.0.64 (ตั้ง host bit เป็น 0)</figcaption></figure>
<h4>ตัวอย่าง 192.168.0.101/27</h4>
<ul>
<li>/27 = block ละ 32: 0, 32, 64, 96, 128, ...</li>
<li>101 อยู่ระหว่าง 96 กับ 127 จึงเป็น <b>192.168.0.96/27</b> (broadcast .127, host .97-.126)</li>
</ul>
<figure><img src="i/p162_1.webp" alt="192.168.0.101/27 AND mask ได้ 192.168.0.96" loading="lazy"><figcaption>Fig. 4.50 192.168.0.101/27 อยู่ใน subnet 192.168.0.96</figcaption></figure>
<h4>วิธีลัดสำหรับ mask ที่ไม่ลงตัว 8 bit</h4>
<ol>
<li>หา octet ที่ mask ไม่เป็น 255 และไม่ใช่ 0 (octet "น่าสนใจ")</li>
<li>block size = 256 - ค่า mask ใน octet นั้น (เช่น 252 ได้ 4, 248 ได้ 8, 240 ได้ 16)</li>
<li>network = ตัวคูณของ block size ที่ไม่เกินค่า octet ของ IP; broadcast = network + block size - 1 (ใน octet นั้น แล้ว octet หลังจากนั้นเป็น 255)</li>
</ol>
<p><b>ตัวอย่าง</b> 180.80.77.55/22 (mask 255.255.252.0): octet 3 block = 4, 77 อยู่ใน 76-79 จึง network = 180.80.76.0/22 และ broadcast = <b>180.80.79.255</b></p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Network = ตั้ง host bit เป็น 0; Broadcast = ตั้ง host bit เป็น 1</li>
<li>block size = 256 - mask octet; host แรก = network + 1, host สุดท้าย = broadcast - 1</li>
<li>/25 = 128, /26 = 64, /27 = 32, /28 = 16, /29 = 8, /30 = 4 (ใน octet 4)</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `PC1 ตั้งค่า 10.0.0.2/24 gateway 10.0.0.1 ต้องการส่งข้อมูลไปยังเว็บเซิร์ฟเวอร์ 12.0.0.2 ซึ่งอยู่หลัง router สองตัว`,
      q: "frame แรกที่ PC1 ส่งออกจาก NIC ควรมี destination IP และ destination MAC เป็นอะไร?",
      opts: [
        { t: "dst IP = 12.0.0.2, dst MAC = MAC ของ gateway 10.0.0.1", why: "ถูก: ปลายทางอยู่คนละ segment (10.0.0.0/24 ไม่ครอบ 12.0.0.2) จึงส่งให้ gateway; IP ยังเป็นปลายทางจริง ส่วน MAC เป็นของ hop ถัดไป" },
        { t: "dst IP = 10.0.0.1, dst MAC = MAC ของ gateway", why: "ผิด: dst IP ต้องเป็นปลายทางสุดท้ายคือ 12.0.0.2 ไม่ใช่ gateway" },
        { t: "dst IP = 12.0.0.2, dst MAC = MAC ของ 12.0.0.2", why: "ผิด: PC1 ไม่มีทางรู้ (ARP ข้าม router ไม่ได้) MAC ของเว็บเซิร์ฟเวอร์ ใช้ได้เฉพาะ segment เดียวกัน" },
        { t: "dst IP = 12.0.0.2, dst MAC = FF-FF-FF-FF-FF-FF", why: "ผิด: broadcast MAC ใช้ตอน ARP หา MAC ไม่ใช่การส่งข้อมูลปกติ และ router ไม่ forward broadcast ข้ามเครือข่าย" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เครื่อง A มี IP 192.168.10.77 mask 255.255.255.192 ผู้ดูแลต้องการรู้ network address, host ที่ใช้ได้ และ broadcast ของ subnet ที่เครื่อง A อยู่`,
      q: "ข้อใดถูกต้อง?",
      opts: [
        { t: "network 192.168.10.64/26, host .65 - .126, broadcast .127", why: "ถูก: /26 block ละ 64, 77 อยู่ใน 64-127 → network .64, broadcast .127, host .65-.126" },
        { t: "network 192.168.10.0/26, host .1 - .62, broadcast .63", why: "ผิด: 77 ไม่อยู่ในช่วง 0-63" },
        { t: "network 192.168.10.64/26, host .65 - .127, broadcast .128", why: "ผิด: address สุดท้ายของ block คือ broadcast (.127) ไม่ใช่ .128 ซึ่งเป็น network ของ block ถัดไป" },
        { t: "network 192.168.10.76/26, host .77 - .126, broadcast .127", why: "ผิด: network ต้องเป็นตัวคูณของ 64 (host bit เป็น 0 ทั้งหมด)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทแบ่ง 192.168.1.0/24 เป็น 6 subnet เท่า ๆ กัน (FLSM) โดยแต่ละ subnet ต้องรองรับไม่เกิน 25 host`,
      q: "mask ที่เหมาะสมและจำนวน host ต่อ subnet ที่ได้คือข้อใด?",
      opts: [
        { t: "255.255.255.224 (/27) ได้ 8 subnet, 30 host ต่อ subnet", why: "ถูก: 6 subnet ต้องยืม 3 bit (2^3 = 8 &gt;= 6), host bit เหลือ 5 → 2^5 - 2 = 30 &gt;= 25" },
        { t: "255.255.255.192 (/26) ได้ 4 subnet, 62 host ต่อ subnet", why: "ผิด: ได้แค่ 4 subnet ไม่พอ 6" },
        { t: "255.255.255.240 (/28) ได้ 16 subnet, 14 host ต่อ subnet", why: "ผิด: จำนวน subnet พอ แต่ 14 host &lt; 25" },
        { t: "255.255.255.248 (/29) ได้ 32 subnet, 6 host ต่อ subnet", why: "ผิด: 6 host น้อยเกินไป" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ในเครือข่าย 172.16.8.0/21 (172.16.8.0 ถึง 172.16.15.255) ผู้ดูแลกำลังจะกำหนด IP ให้เครื่อง`,
      q: "เลือก address ที่ <b>ใช้กำหนดให้เครื่องไม่ได้</b> ทุกข้อ",
      opts: [
        { t: "172.16.8.0", ok: true, why: "เป็น network address (host bit ทั้งหมด 0)" },
        { t: "172.16.15.255", ok: true, why: "เป็น broadcast address (host bit ทั้งหมด 1)" },
        { t: "172.16.9.255", ok: false, why: "ใช้ได้: host bit ไม่ใช่ 1 ทั้งหมด เพราะ octet 3 = 9 (00001001) ไม่ใช่ 15" },
        { t: "172.16.12.0", ok: false, why: "ใช้ได้: host bit ไม่ใช่ 0 ทั้งหมด เพราะ octet 3 = 12 (00001100) มี bit 1 อยู่ในส่วน host" },
        { t: "172.16.15.254", ok: false, why: "ใช้ได้: เป็น host สุดท้ายที่ใช้ได้ของ subnet" }
      ]
    },
    {
      type: "choice",
      story: `เครื่อง A = 10.1.1.10/24 และเครื่อง B = 10.1.1.200/25 ต่อ switch ตัวเดียวกัน ทั้งสองเครื่องไม่ได้ตั้ง gateway`,
      q: "ผลการ ping จาก A ไป B เป็นอย่างไร?",
      opts: [
        { t: "A ส่งถึง B ได้ แต่ B ตอบกลับไม่ได้ จึง ping ไม่ติด", why: "ถูก: A เห็น B อยู่ใน 10.1.1.0/24 จึงส่งตรง; B มี mask /25 → network ของ B = 10.1.1.128/25 ซึ่งไม่ครอบ 10.1.1.10 จึงต้องส่งผ่าน gateway ที่ไม่ได้ตั้ง" },
        { t: "ping ติด เพราะอยู่ switch เดียวกัน", why: "ผิด: การตัดสินว่าจะส่งตรงหรือไม่ใช้ IP + mask ไม่ใช่ topology จริงของ switch" },
        { t: "A ส่งถึง B ไม่ได้ตั้งแต่ต้น", why: "ผิด: ฝั่ง A ส่งถึง B ได้ ปัญหาอยู่ที่ขากลับ" },
        { t: "ping ติดเพราะ mask เป็นของใครของมัน ไม่ต้องตรงกัน", why: "ผิด: mask ไม่ต้องเท่ากันก็จริง แต่ผลลัพธ์ทั้งสองทิศต้องเข้าเงื่อนไขส่งตรง ในที่นี้ขากลับไม่เข้า" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เครื่อง A มี IP 192.168.1.130 mask 255.255.255.128 และตั้ง gateway เป็น 192.168.1.1 แต่เข้าถึงเครือข่ายอื่นไม่ได้ ใน segment เดียวกันคุยกับเครื่องอื่นได้ปกติ`,
      q: "สาเหตุที่เป็นไปได้มากที่สุดคือข้อใด?",
      opts: [
        { t: "gateway 192.168.1.1 อยู่คนละ subnet กับเครื่อง A", why: "ถูก: A อยู่ใน 192.168.1.128/25 (128-255) แต่ gateway .1 อยู่ใน 192.168.1.0/25 จึงไม่ใช่ next hop ที่อยู่ segment เดียวกัน ส่งให้ไม่ได้" },
        { t: "192.168.1.130 เป็น broadcast address", why: "ผิด: broadcast ของ /25 นี้คือ 192.168.1.255" },
        { t: "mask 255.255.255.128 ใช้ไม่ได้กับ Class C", why: "ผิด: subnet ได้ทุก class (ไม่จำกัด 8 bit)" },
        { t: "ต้องเปลี่ยนเป็น mask 255.255.255.0 เสมอ", why: "ผิด: ปัญหาอยู่ที่ gateway ที่ไม่อยู่ใน subnet ไม่ใช่ที่ mask ผิด" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลมี 4 เครือข่ายติดกัน 172.20.8.0/24, 172.20.9.0/24, 172.20.10.0/24, 172.20.11.0/24 ต้องการ summarize เป็นก้อนเดียวโดยไม่ครอบ address นอกกลุ่ม`,
      q: "ข้อใดเป็นผลที่ถูกต้อง?",
      opts: [
        { t: "172.20.8.0/22", why: "ถูก: 8 หารด้วย 4 ลงตัว เลื่อน mask ซ้าย 2 bit จาก /24 ได้ /22 ครอบ 8-11 พอดี" },
        { t: "172.20.8.0/21", why: "ผิด: /21 ครอบ 8-15 กินเกินไป 4 segment" },
        { t: "172.20.10.0/22", why: "ผิด: 10 ไม่ใช่ตัวคูณของ 4 ไม่ใช่ network address ที่ถูกต้องของ /22" },
        { t: "172.20.8.0/23", why: "ผิด: /23 ครอบแค่ 8-9 ไม่ครบ 4 segment" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `มี 4 เครือข่ายติดกัน 172.20.10.0/24, 172.20.11.0/24, 172.20.12.0/24, 172.20.13.0/24 และต้องการลดจำนวน route โดยห้ามครอบ address ที่ไม่ใช่ของกลุ่มนี้`,
      q: "ทางเลือกใดดีที่สุด?",
      opts: [
        { t: "สอง route: 172.20.10.0/23 และ 172.20.12.0/23", why: "ถูก: 10 และ 12 หารด้วย 2 ลงตัว รวมคู่ได้ แต่ 10 หารด้วย 4 ไม่ลงตัวจึงรวม 4 ก้อนเป็น /22 ไม่ได้ ได้ 2 route คือจำนวนน้อยสุดที่ไม่ครอบเกิน" },
        { t: "route เดียว 172.20.10.0/22", why: "ผิด: 172.20.10.0 ไม่ใช่ขอบของ /22 (ขอบคือ 8.0, 12.0)" },
        { t: "route เดียว 172.20.8.0/22", why: "ผิด: ครอบ 8-11 ไม่ครอบ 12 และ 13 ทั้งยังรวม 8 และ 9 ที่ไม่ใช่ของกลุ่ม" },
        { t: "route เดียว 172.20.8.0/21", why: "ผิด: ครอบ 8-15 มี address นอกกลุ่ม 4 segment" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องการรวมคู่ /24 ที่ติดกันให้เป็น /23 (เลื่อน mask ซ้าย 1 bit) ต่อไปนี้คือคู่ที่เสนอมา`,
      q: "เลือกทุกคู่ที่ <b>รวมเป็น /23 ได้จริง</b>",
      opts: [
        { t: "10.1.4.0/24 + 10.1.5.0/24", ok: true, why: "4 หารด้วย 2 ลงตัว → 10.1.4.0/23" },
        { t: "10.1.3.0/24 + 10.1.4.0/24", ok: false, why: "3 เป็นเลขคี่ (00000011) รวมไม่ได้" },
        { t: "10.1.6.0/24 + 10.1.7.0/24", ok: true, why: "6 หารด้วย 2 ลงตัว → 10.1.6.0/23" },
        { t: "10.1.5.0/24 + 10.1.6.0/24", ok: false, why: "5 เป็นเลขคี่ รวมไม่ได้ (5 อยู่คู่กับ 4 ส่วน 6 อยู่คู่กับ 7)" },
        { t: "10.1.142.0/24 + 10.1.143.0/24", ok: true, why: "142 หารด้วย 2 ลงตัว → 10.1.142.0/23" }
      ]
    },
    {
      type: "choice",
      story: `ต้องแบ่ง 192.168.5.0/24 ให้ LAN 100 เครื่อง, LAN 50 เครื่อง, LAN 25 เครื่อง และ link ระหว่าง router 2 เส้น (เส้นละ 2 address)`,
      q: "แผน address ใดถูกต้อง (ไม่ซ้อนกันและพอ host)?",
      opts: [
        { t: "100: 192.168.5.0/25, 50: 192.168.5.128/26, 25: 192.168.5.192/27, link: 192.168.5.224/30 และ 192.168.5.228/30", why: "ถูก: /25 (126), /26 (62), /27 (30) ไม่ซ้อนกัน และ /30 สองก้อนอยู่ในส่วนที่เหลือ .224-.255" },
        { t: "100: 192.168.5.0/26, 50: 192.168.5.64/26, 25: 192.168.5.128/27, link: .160/30 และ .164/30", why: "ผิด: /26 มีแค่ 62 host ไม่พอสำหรับ 100 เครื่อง" },
        { t: "100: 192.168.5.0/25, 50: 192.168.5.64/26, 25: 192.168.5.192/27, link: .224/30 และ .228/30", why: "ผิด: 192.168.5.64/26 อยู่ในช่วง 0-127 ซึ่งซ้อนกับ /25 ของ LAN 100 เครื่อง" },
        { t: "100: 192.168.5.0/25, 50: 192.168.5.128/26, 25: 192.168.5.192/28, link: .208/30 และ .212/30", why: "ผิด: /28 มีแค่ 14 host ไม่พอสำหรับ 25 เครื่อง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `โฮสต์หนึ่งมี IP 10.20.45.9 mask 255.255.248.0 และต้องส่ง directed broadcast ไปยัง subnet ของตัวเอง`,
      q: "destination IP ที่ถูกต้องคือข้อใด?",
      opts: [
        { t: "10.20.47.255", why: "ถูก: mask 248 ที่ octet 3 → block ละ 8, 45 อยู่ใน 40-47 จึง network = 10.20.40.0/21 และ broadcast = 10.20.47.255" },
        { t: "10.20.45.255", why: "ผิด: นี่เป็น broadcast ของ /24 ถ้า mask เป็น /21 ไม่ใช่ broadcast ของ subnet นี้" },
        { t: "10.20.40.255", why: "ผิด: .255 ตัวนี้อยู่กลางช่วงของ subnet ไม่ใช่ address สุดท้าย" },
        { t: "10.20.48.255", why: "ผิด: อยู่ใน subnet ถัดไป (10.20.48.0/21)" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `บริษัทออกแบบเครือข่ายจาก Class B 172.16.0.0/16 ต้องการอย่างน้อย 300 subnet และแต่ละ subnet ต้องรองรับ host ได้สูงสุด 50 เครื่อง`,
      q: "เลือกทุก mask ที่ตอบโจทย์ได้",
      opts: [
        { t: "255.255.255.128 (/25)", ok: true, why: "ยืม 9 bit → 512 subnet (&gt;= 300), host 7 bit → 126 host (&gt;= 50)" },
        { t: "255.255.255.192 (/26)", ok: true, why: "ยืม 10 bit → 1024 subnet, host 6 bit → 62 host (&gt;= 50)" },
        { t: "255.255.255.0 (/24)", ok: false, why: "ยืม 8 bit ได้ 256 subnet &lt; 300" },
        { t: "255.255.255.224 (/27)", ok: false, why: "ยืม 11 bit ได้ 2048 subnet แต่ host 5 bit เหลือ 30 &lt; 50" }
      ]
    },
    {
      type: "choice",
      story: `ผู้ดูแลทดสอบเครื่องที่ใช้งานเครือข่ายไม่ได้ พบว่า <code>ping 127.0.0.1</code> สำเร็จ แต่ <code>ping</code> ไปเครื่องข้าง ๆ ใน segment เดียวกันไม่สำเร็จ`,
      q: "ผล ping 127.0.0.1 บอกอะไรได้?",
      opts: [
        { t: "TCP/IP stack ภายในเครื่องทำงานปกติ แต่ไม่ได้พิสูจน์ว่า NIC, สาย หรือ IP/mask ถูกต้อง", why: "ถูก: loopback อยู่ใน IP stack ไม่ออกสู่เครือข่ายจริง (แม้ไม่มี NIC ก็ ping ได้)" },
        { t: "NIC และสายใช้งานได้ปกติ", why: "ผิด: loopback ไม่ผ่าน NIC จึงไม่ได้ทดสอบ NIC หรือสาย" },
        { t: "gateway ตั้งค่าถูกต้อง", why: "ผิด: loopback ไม่เกี่ยวกับ gateway" },
        { t: "เครื่องปลายทางต้องเปิด firewall", why: "ผิด: loopback ไม่เกี่ยวกับเครื่องอื่นเลย" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `หลังเสียบสายเข้าเครือข่ายออฟฟิศ เครื่อง Windows หลายเครื่องแสดง IP 169.254.x.x mask 255.255.0.0 และเข้า Internet ไม่ได้ แต่เครื่องที่ได้ 169.254.x.x ด้วยกันคุยกันเองได้`,
      q: "สาเหตุที่เป็นไปได้มากที่สุดคือข้อใด?",
      opts: [
        { t: "เครื่องขอ IP อัตโนมัติ (เช่น จาก DHCP server) ไม่สำเร็จ จึงใช้ APIPA ตั้งให้เอง", why: "ถูก: 169.254.0.0/16 คือ automatic private IP ที่ OS ตั้งเมื่อไม่ได้ address; ไม่มี gateway จึงออก Internet ไม่ได้" },
        { t: "IP ซ้ำกับเครื่องอื่น", why: "ผิด: กรณี address ชนกันมักแสดง 0.0.0.0 ไม่ใช่ 169.254.x.x" },
        { t: "ISP ปิดการใช้งาน Class B", why: "ผิด: 169.254.x.x ไม่ได้มาจาก ISP" },
        { t: "ผู้ดูแลตั้ง mask ผิดเป็น /16", why: "ผิด: ค่านี้เป็นค่าที่ OS ตั้งเองอัตโนมัติ" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องเลือก address ภายในองค์กร`,
      q: "เลือกทุก address ที่เป็น <b>private</b> (ใช้ภายในได้โดยไม่ซ้ำกับ public)",
      opts: [
        { t: "172.16.5.1", ok: true, why: "อยู่ใน 172.16.0.0 - 172.31.255.255" },
        { t: "172.31.255.254", ok: true, why: "ยังอยู่ในช่วง 172.16-172.31" },
        { t: "172.32.1.1", ok: false, why: "ผิด: อยู่นอกช่วง private (สิ้นสุดที่ 172.31.x.x)" },
        { t: "192.168.200.3", ok: true, why: "อยู่ใน 192.168.0.0/16" },
        { t: "192.169.1.1", ok: false, why: "ผิด: private คือ 192.168 เท่านั้น" },
        { t: "10.255.0.1", ok: true, why: "อยู่ใน 10.0.0.0/8" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์ mask 255.255.248.0`,
      text: `255.255.248.0 เขียนเป็น prefix ได้ /{1} จำนวน host bit คือ {2} bit และจำนวน host ที่กำหนดให้เครื่องได้ต่อ subnet คือ {3}`,
      blanks: [
        { opts: ["19", "20", "21", "22"], ans: 2, why: "16 bit + octet 3 (248 = 11111000 มี 5 ตัว) = 21" },
        { opts: ["10", "11", "12", "13"], ans: 1, why: "32 - 21 = 11" },
        { opts: ["1022", "2046", "2048", "4094"], ans: 1, why: "2^11 - 2 = 2046 (หัก network และ broadcast)" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์ที่อยู่ 192.168.0.101/27`,
      text: `192.168.0.101/27 อยู่ใน subnet {1}; broadcast ของ subnet นี้คือ {2}; และ host ตัวแรกที่ใช้ได้คือ {3}`,
      blanks: [
        { opts: ["192.168.0.64/27", "192.168.0.96/27", "192.168.0.100/27", "192.168.0.0/27"], ans: 1, why: "/27 block ละ 32: 96-127 ครอบ 101" },
        { opts: ["192.168.0.111", "192.168.0.127", "192.168.0.128", "192.168.0.101"], ans: 1, why: "address สุดท้ายของ block 96-127 = 127" },
        { opts: ["192.168.0.96", "192.168.0.97", "192.168.0.98", "192.168.0.101"], ans: 1, why: "network = .96 ดังนั้น host แรก = .97" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ address กับประเภท/ความหมาย",
      pairs: [
        ["85.10.3.4", "Class A (octet แรก 1-126)"],
        ["172.20.1.1", "Class B (octet แรก 128-191) และเป็น private"],
        ["203.0.113.5", "Class C (octet แรก 192-223)"],
        ["232.1.1.1", "Class D multicast (ใช้เป็น destination เท่านั้น)"],
        ["127.0.0.1", "Loopback ทดสอบ TCP/IP stack ของเครื่อง"],
        ["169.254.10.5", "APIPA: ขอ IP อัตโนมัติไม่สำเร็จ"]
      ],
      why: "ดู octet แรกเทียบช่วง class และจำ address พิเศษ 127.0.0.1 / 169.254.0.0/16"
    }
  ]
});
