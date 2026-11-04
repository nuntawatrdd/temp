IOT.reg({
  id: "ll1",
  title: "Link Layer Intro, MAC Address & ARP",
  th: "ทบทวน layer 7-3, encapsulation, บริการของ link layer, MAC address, ARP, การส่งข้ามเครือข่ายผ่าน router และ ARP spoofing",
  summary: `
<ul>
<li><b>Layer</b>: Application (message) → Transport (segment) → Network (datagram) → Link (<b>frame</b>) → Physical (bits); Internet model มี 5 ชั้น (รวม 5-7 เป็น application)</li>
<li><b>Encapsulation</b>: ขาลงแต่ละ layer เพิ่ม header, ขาขึ้นแต่ละ layer ลบ header; <b>Host</b> ประมวลผลทุก layer, <b>Router</b> ถึง L3, <b>Switch</b> ถึง L2</li>
<li><b>IP คงเดิมตลอดเส้นทาง (end to end) แต่ MAC เปลี่ยนทุก hop</b> (หนึ่ง link)</li>
<li>Link layer: node = host/router/switch/AP; link = ช่องสื่อสารระหว่าง node ที่อยู่ติดกัน (wired, wireless, LAN); frame ข้าม <b>หนึ่ง link</b></li>
<li>Link มี 2 แบบ: point-to-point และ broadcast (shared: Wi-Fi, cellular, satellite)</li>
<li>บริการ: framing, link access, reliable delivery (บาง link เช่น wireless), error detection</li>
<li>Link layer อยู่ใน <b>NIC/adaptor</b> (hardware + software + firmware); Wi-Fi กับ Ethernet คือ NIC แยกกัน มี MAC แยกกัน</li>
<li><b>Ethernet frame</b>: Preamble 8 B | Dst MAC 6 B | Src MAC 6 B | Type 2 B | Data 46-1500 B | CRC 4 B; Type: <b>0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP</b></li>
<li><b>MAC address</b>: 48 bit (6 byte hex), 2<sup>48</sup> ≈ 281 ล้านล้าน; 24 bit แรก = <b>OUI</b> (ผู้ผลิต, IEEE กำหนด); <b>FF:FF:FF:FF:FF:FF = broadcast</b></li>
<li>byte แรก: bit ต่ำสุด 0 = unicast / 1 = group; bit ถัดไป 0 = ผู้ผลิตกำหนด / 1 = locally administered (hex ตัวที่ 2 เป็น 2, 6, A, E = MAC สุ่มของ phone)</li>
<li>NIC รับ frame ถ้า dst = MAC ตนเอง / broadcast / multicast group ที่เข้าร่วม (เช่น 01:00:5E:...) ไม่งั้น drop เงียบ ๆ; error → drop</li>
<li>ต้องมี MAC เพราะ: ใช้ก่อนมี IP (DHCP), ARP ไม่ใช่ IP packet, ไม่ต้อง assign (ติดมากับ NIC); ไม่ใช้ MAC แทน IP เพราะ flat address aggregate ไม่ได้</li>
<li><b>ARP</b>: IP → MAC <b>ภายใน subnet เดียว</b>; request = broadcast (dst FF:..), reply = unicast; ARP message อยู่ใน Ethernet frame โดยตรง (Type 0x0806); Operation 1 = request, 2 = reply; target MAC ใน request = 00:00:00:00:00:00; มี ARP table + TTL</li>
<li>ตัดสินใจ: dst IP AND mask = network ตนเอง? <b>ใช่</b> → ARP หา dst โดยตรง; <b>ไม่</b> → ARP หา <b>default gateway</b></li>
<li>ส่งผ่าน router: IP src/dst คงเดิม; MAC dst = router interface (link แรก), ที่ router สร้าง frame ใหม่ src = MAC ฝั่งออกของ router, dst = MAC ของ B</li>
<li><b>ARP spoofing</b>: ARP ไม่มี authentication; ป้องกันด้วย DHCP snooping + Dynamic ARP Inspection, static ARP, encryption (TLS/VPN)</li>
<li>Web request: DHCP (L7) → ARP (หา MAC gateway) → DNS → TCP 3-way → TLS → HTTP</li>
</ul>`,
  sections: [
    {
      t: "ทบทวน Layer 7 ถึง 3 และ Encapsulation",
      html: `
<h4>เหตุผลที่แบ่ง layer</h4>
<p>Divide and conquer (แต่ละ layer แก้ปัญหาเดียว), clear interfaces (ใช้บริการจากชั้นล่าง ให้บริการชั้นบน), และเปลี่ยน layer หนึ่งได้โดยไม่กระทบอื่น (เปลี่ยน Wi-Fi เป็น Ethernet ได้ แต่ browser ไม่ต้องเปลี่ยน) ราคาที่ต้องจ่ายคือ <b>overhead จาก header ทุกชั้น</b> และงานบางอย่าง เช่น error checking ถูกทำซ้ำหลาย layer</p>
<table>
<tr><th>Layer</th><th>ทำอะไร</th><th>ตัวอย่าง / unit</th></tr>
<tr><td>7 Application</td><td>ข้อความที่ผู้ใช้สนใจ</td><td>HTTP, DNS, SMTP / message</td></tr>
<tr><td>6 Presentation</td><td>format, compression, encryption</td><td>UTF-8, TLS</td></tr>
<tr><td>5 Session</td><td>เปิด/ดูแล/ปิด/กู้การสนทนา</td><td>session setup, checkpoint</td></tr>
<tr><td>4 Transport</td><td>แบ่ง segment, port ส่งถึง app</td><td>TCP, UDP / segment</td></tr>
<tr><td>3 Network</td><td>IP address, forwarding table, NAT</td><td>IP, router / datagram</td></tr>
<tr><td>2 Data Link</td><td>ส่ง frame ข้าม 1 link, MAC, error detection</td><td>Ethernet, Wi-Fi / frame</td></tr>
<tr><td>1 Physical</td><td>ส่ง bit เป็นสัญญาณ</td><td>copper, fiber, radio / bits</td></tr>
</table>
<p>Kurose ใช้ Internet model 5 ชั้น (รวม 5-7 เป็น application); สามชั้นล่างเหมือนกันทั้งสองโมเดล</p>
<table>
<tr><th>TCP</th><th>UDP</th></tr>
<tr><td>handshake, ส่งซ้ำเมื่อหาย, จัดลำดับ, header 20 B+</td><td>ไม่มี setup, ไม่รับประกัน, header 8 B</td></tr>
<tr><td>เว็บ, email, ไฟล์ (HTTP 80, HTTPS 443, SSH 22)</td><td>DNS 53, DHCP 67/68, video call, game</td></tr>
</table>
<h4>Encapsulation และใครอ่าน layer ไหน</h4>
<p>ขาลง L7 message → L4 segment (+TCP header) → L3 datagram (+IP header) → L2 frame (+MAC header + trailer) → L1 bits ขาขึ้นแต่ละ layer ลบ header ของตน</p>
<ul>
<li><b>Host</b>: ทุก layer (5 ชั้น)</li>
<li><b>Router</b>: ถึง Layer 3 (อ่าน IP)</li>
<li><b>Switch</b>: ถึง Layer 2 (อ่าน MAC)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>IP = end to end (src/dst IP เหมือนเดิมตลอดทาง)</li>
<li>MAC = one hop only (ถูกเขียนใหม่ทุก hop)</li>
<li>Router อ่านเฉพาะ network part ของ IP เพื่อเลือก next hop</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> เปรียบเทียบพัสดุ: label ที่อยู่ (IP) ไม่เปลี่ยน แต่ใบเที่ยวรถ (MAC) เปลี่ยนทุกเที่ยว ที่ analogy ไม่ตรง: router drop packet โดยไม่แจ้ง, packet อาจไปคนละเส้นและมาไม่เรียงกัน, และข้อมูลถูก "คัดลอกส่งต่อ" ไม่ได้ถูกขนไปตรง ๆ</div>`
    },
    {
      t: "Link Layer: Node, Link, Frame และ NIC",
      html: `
<h4>ศัพท์</h4>
<ul>
<li><b>Node</b>: อุปกรณ์ใด ๆ ที่รัน link layer (host, router, switch, access point)</li>
<li><b>Link</b>: ช่องสื่อสารระหว่าง node ที่อยู่ติดกัน (wired, wireless, LAN)</li>
<li><b>Frame</b>: packet ของ Layer 2 ห่อ datagram 1 ตัวข้าม 1 link; link แต่ละอันใช้ protocol L2 ต่างกันได้ (Wi-Fi แล้ว Ethernet แล้ว fiber)</li>
</ul>
<p>Link layer รับผิดชอบการส่ง datagram จาก node หนึ่งไปยัง node ที่อยู่ติดกันทางกายภาพ</p>
<h4>ชนิดของ link</h4>
<ul>
<li><b>Point-to-point</b>: ผู้ส่ง 1 ผู้รับ 1 (fiber ระหว่าง router, สายจากคอมไปพอร์ต switch) — ไม่มีปัญหา sharing</li>
<li><b>Broadcast (shared)</b>: หลาย node ใช้ช่องเดียวกัน ทุกคนได้ยินทุกอย่าง (Wi-Fi, cellular, satellite, Ethernet แบบ shared cable เก่า) — ต้องมี rule ว่าใครส่งเมื่อไร</li>
</ul>
<h4>บริการของ link layer</h4>
<table>
<tr><th>บริการ</th><th>ความหมาย</th></tr>
<tr><td>Framing</td><td>ใส่ datagram ลง frame พร้อม header/trailer</td></tr>
<tr><td>Link access</td><td>กติกาว่าใครส่งได้เมื่อหลายคนแชร์ช่อง</td></tr>
<tr><td>Reliable delivery</td><td>บาง link (เช่น wireless) ส่ง frame ที่หายซ้ำทันที</td></tr>
<tr><td>Error detection</td><td>ผู้รับตรวจว่า bit พลิกหรือไม่</td></tr>
</table>
<h4>Link layer อยู่ที่ไหน</h4>
<p>อยู่ใน <b>ทุก host</b> โดยส่วนใหญ่ใน <b>NIC / adaptor</b> (Ethernet card, 802.11 card, chipset) ซึ่งเป็นการผสมของ hardware, software, firmware เสียบกับ system bus (เช่น PCI) และ implement ทั้ง link และ physical layer บางส่วนยังเป็น driver (เช่นใส่ address) Wi-Fi และ Ethernet เป็น NIC แยก มี MAC แยก</p>
<h4>สิ่งที่ NIC ทำ</h4>
<table>
<tr><th>NIC ผู้ส่ง</th><th>NIC ผู้รับ</th></tr>
<tr><td>1) รับ datagram จาก L3<br>2) สร้าง frame (header + error-check bits)<br>3) ทำตามกติกาเข้าถึง link<br>4) ส่ง bits</td><td>1) รับ bits<br>2) ตรวจ error<br>3) dst MAC เป็นของเรา (หรือ broadcast) ไหม<br>4) ลอก frame ส่ง datagram ขึ้นบน</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>เจอ error หรือ dst MAC ไม่ใช่ของเรา → <b>drop เงียบ ๆ</b></li>
<li>Link layer ทำที่ NIC เป็นหลัก ไม่ใช่ใน OS</li>
</ul></div>`
    },
    {
      t: "Ethernet Frame และ MAC Address",
      html: `
<h4>Ethernet frame</h4>
<div class="dg"><div class="dgt">🖼️ โครงสร้าง Ethernet frame</div>
<svg viewBox="0 0 520 90" xmlns="http://www.w3.org/2000/svg">
<rect class="bx hd" x="5" y="20" width="70" height="36"/><text class="t sm" x="40" y="42" text-anchor="middle">Preamble</text>
<rect class="bx" x="75" y="20" width="75" height="36"/><text class="t sm" x="112" y="42" text-anchor="middle">Dst MAC</text>
<rect class="bx" x="150" y="20" width="75" height="36"/><text class="t sm" x="187" y="42" text-anchor="middle">Src MAC</text>
<rect class="bx" x="225" y="20" width="55" height="36"/><text class="t sm" x="252" y="42" text-anchor="middle">Type</text>
<rect class="bx ok" x="280" y="20" width="150" height="36"/><text class="t sm" x="355" y="42" text-anchor="middle">Data (datagram)</text>
<rect class="bx hd" x="430" y="20" width="85" height="36"/><text class="t sm" x="472" y="42" text-anchor="middle">CRC</text>
<text class="t sm" x="40" y="74" text-anchor="middle">8 B</text><text class="t sm" x="112" y="74" text-anchor="middle">6 B</text><text class="t sm" x="187" y="74" text-anchor="middle">6 B</text><text class="t sm" x="252" y="74" text-anchor="middle">2 B</text><text class="t sm" x="355" y="74" text-anchor="middle">46-1500 B</text><text class="t sm" x="472" y="74" text-anchor="middle">4 B</text>
</svg></div>
<ul>
<li><b>Preamble</b>: ปลุกผู้รับและ sync clock</li>
<li><b>Dst MAC มาก่อน</b>: NIC หยุดอ่านเร็วได้ถ้า frame ไม่ใช่ของตน</li>
<li><b>Type</b>: 0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP</li>
<li><b>CRC</b>: ผู้ส่งคำนวณ ผู้รับตรวจ (ตรวจ error)</li>
</ul>
<h4>MAC address</h4>
<p>เรียกอีกชื่อว่า LAN / physical / hardware address ตัวอย่าง <code>3C:22:FB:9A:41:07</code></p>
<ul>
<li><b>48 bit</b> เขียนเป็น 6 byte hex; 2<sup>48</sup> ≈ 281 ล้านล้านค่า</li>
<li><b>24 bit แรก = OUI</b> บอกผู้ผลิต (IEEE กำหนด); 24 bit หลังผู้ผลิตกำหนดต่อเครื่อง</li>
<li><b>FF:FF:FF:FF:FF:FF</b> = broadcast "ถึงทุกคนใน LAN"</li>
<li>เป็น <b>flat address</b> มีความหมายเฉพาะบน link เดียว</li>
</ul>
<h4>Bit พิเศษใน byte แรก</h4>
<p>bit ต่ำสุด: 0 = individual (unicast), 1 = group; bit ถัดมา: 0 = ผู้ผลิตกำหนด, 1 = locally administered (software สร้าง) ดังนั้นถ้า hex ตัวที่สองของ byte แรกเป็น <b>2, 6, A หรือ E</b> (เช่น 3A:.. หรือ 5E:..) แปลว่า MAC สุ่ม</p>
<p><b>Private Wi-Fi address</b>: phone ประกาศ MAC ตอนค้นหา Wi-Fi จึงถูกติดตามได้ จึงสุ่ม MAC ต่างกันต่อเครือข่าย (เปิดเป็นค่าเริ่มต้นตั้งแต่ iOS 14, Android 10) ผลข้างเคียง: เครือข่ายที่ระบุอุปกรณ์ด้วย MAC อาจเห็นเครื่องเดิมเป็นเครื่องใหม่</p>
<h4>NIC ตัดสินว่า frame เป็นของเราหรือไม่</h4>
<table>
<tr><th>Destination MAC</th><th>ผล</th></tr>
<tr><td>= MAC ของเรา</td><td>Accept (unicast)</td></tr>
<tr><td>= FF:FF:FF:FF:FF:FF</td><td>Accept (broadcast)</td></tr>
<tr><td>= group ที่เราเข้าร่วม (เช่น 01:00:5E:...)</td><td>Accept (multicast)</td></tr>
<tr><td>อื่น ๆ</td><td>Drop</td></tr>
</table>
<h4>ทำไมต้องมี MAC ทั้งที่มี IP</h4>
<ul>
<li><b>ใช้ก่อนมี IP</b>: laptop เข้า Wi-Fi ยังไม่มี IP แต่ต้องส่ง DHCP request และรับ reply กลับ — ใช้ IP เพื่อขอ IP ไม่ได้</li>
<li><b>ARP พิสูจน์ในตัว</b>: ARP frame ไม่ใช่ IP packet (Type 0x0806) ถ้าต้องใช้ IP จึงจะส่งได้ protocol ที่หา MAC จาก IP ก็ทำงานไม่ได้</li>
<li><b>ไม่ต้อง assign</b>: ติดมากับ NIC unique ทั่วโลก ส่วน IP ต้องมีเจ้าของเครือข่ายจัดสรร</li>
<li>ทำไมไม่ใช้ MAC แทน IP: flat address aggregate ไม่ได้ router ต้องมีหนึ่งแถวต่ออุปกรณ์ทั่วโลก (IP มี prefix)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>MAC = 48 bit; OUI = 24 bit แรก; broadcast = FF:FF:FF:FF:FF:FF</li>
<li>EtherType: IPv4 0x0800, IPv6 0x86DD, ARP 0x0806</li>
<li>ข้อมูลใน Ethernet frame: 46–1500 bytes; header+trailer รวม preamble ตามรูป</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> "NIC กรอง frame ด้วย hardware ได้" ไม่ใช่เหตุผลที่ต้องมี MAC เพราะ NIC กรองด้วย field อื่นที่ offset คงที่ (เช่น IP) ได้เช่นกัน</div>`
    },
    {
      t: "ARP: จาก IP ไปเป็น MAC",
      html: `
<h4>ปัญหา</h4>
<p>ก่อนส่ง frame NIC ต้องใส่ dst MAC แต่ host รู้แค่ dst IP (จาก DNS หรือ application) ARP ตอบคำถาม "MAC ไหนเป็นของ IP นี้ บน subnet ของฉัน" และทำงาน <b>เฉพาะภายใน subnet เดียว</b></p>
<table>
<tr><th></th><th>DNS</th><th>ARP</th></tr>
<tr><td>ถามว่า</td><td>ชื่อนี้ IP อะไร</td><td>IP นี้ MAC อะไร</td></tr>
<tr><td>Scope</td><td>ทั้ง Internet</td><td>subnet เดียว</td></tr>
<tr><td>ทำงานที่</td><td>Application layer (over UDP)</td><td>ระหว่าง L2 และ L3 ใน frame โดยตรง</td></tr>
<tr><td>ผู้ตอบ</td><td>DNS server</td><td>เจ้าของ IP นั้น</td></tr>
<tr><td>Cache</td><td>มี</td><td>มี (ARP table)</td></tr>
</table>
<h4>ARP message</h4>
<ul>
<li>ส่งใน Ethernet frame Type <b>0x0806</b> (ไม่ได้อยู่ใน IP)</li>
<li>ฟิลด์: Hardware type (1 = Ethernet), Protocol type (0x0800 = IPv4), HW length = 6, Protocol length = 4, <b>Operation</b> (1 = request, 2 = reply), Sender MAC/IP, Target MAC/IP</li>
<li>ใน request, Target MAC = <b>00:00:00:00:00:00</b> (สิ่งที่ต้องการรู้); ใน reply ทั้งสี่ address ถูกเติมครบ</li>
</ul>
<h4>ขั้นตอน (A = 192.168.1.10 หา 192.168.1.7)</h4>
<ol>
<li><b>ARP query</b>: <b>broadcast</b> ถึง FF:FF:FF:FF:FF:FF "Who has 192.168.1.7? Tell 192.168.1.10" ทุก host ใน LAN ได้รับ</li>
<li><b>ARP reply</b>: <b>unicast</b> กลับไปหา A เท่านั้น "192.168.1.7 is at 58:1C:0A:22:B3:7E"</li>
<li>A เก็บคำตอบใน <b>ARP table</b> (IP, MAC, TTL) แล้วส่ง frame จริง</li>
</ol>
<ul>
<li>Entry หมดอายุตาม <b>TTL</b> เพื่อให้ตารางทันสมัย (ตัวอย่าง 14 นาที, 20 นาที)</li>
<li>Plug-and-play ไม่ต้องมีผู้ดูแล</li>
<li><b>B เรียนรู้ MAC ของ A จาก query ด้วย</b> จึงตอบแบบ unicast ได้ทันที ไม่ต้อง ARP ซ้ำ</li>
<li>ครั้งที่สองไม่ต้อง broadcast เพราะมี cache; broadcast ทำให้ทุกอุปกรณ์เสียแรงเล็กน้อย (ถ้า 1,000 เครื่องใน LAN เดียวควรแบ่งเป็น broadcast domain เล็กลง เช่น VLAN)</li>
</ul>
<h4>A ตัดสินใจอย่างไรว่าจะ ARP หาอะไร</h4>
<p>A (192.168.1.10, mask 255.255.255.0 → network 192.168.1.0) นำ dst IP มา AND กับ subnet mask แล้วเทียบกับ network ของตน</p>
<ul>
<li><b>เท่ากัน</b> (เช่น 192.168.1.7) → ARP หา dst นั้นโดยตรง</li>
<li><b>ไม่เท่ากัน</b> (เช่น 10.0.0.20 → 10.0.0.0) → ARP หา <b>default gateway</b> (192.168.1.1) เพราะ A ไม่ ARP หา address นอก subnet ของตน</li>
</ul>
<p><b>ตัวอย่าง /25</b>: A = 192.168.1.130/25 (mask 255.255.255.128) → network = 130 AND 128 = 128 → 192.168.1.128/25 ถ้า dst = 192.168.1.20 → 20 AND 128 = 0 → 192.168.1.0 ≠ 192.168.1.128 → ต้อง ARP หา gateway แม้ 3 octet แรกเหมือนกัน</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ARP request = broadcast; ARP reply = unicast</li>
<li>ARP ใช้ได้ใน subnet เดียว; นอก subnet → ARP หา gateway</li>
<li>Type 0x0806, Operation 1/2, ARP table มี TTL</li>
</ul></div>`
    },
    {
      t: "Addressing เมื่อส่งข้ามเครือข่ายผ่าน Router",
      html: `
<p>สมมติ A รู้ IP ของ B และรู้ IP กับ MAC ของ first-hop router R (ผ่าน DHCP และ ARP)</p>
<div class="dg"><div class="dgt">🖼️ A → R → B: IP คงเดิม MAC เปลี่ยน</div>
<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg">
<rect class="bx hd" x="10" y="20" width="130" height="50"/><text class="t b" x="75" y="40" text-anchor="middle">A</text><text class="t sm" x="75" y="55" text-anchor="middle">IP 111.111.111.111</text>
<rect class="bx" x="215" y="20" width="130" height="50"/><text class="t b" x="280" y="40" text-anchor="middle">R</text><text class="t sm" x="280" y="55" text-anchor="middle">.110 | .220</text>
<rect class="bx hd" x="420" y="20" width="130" height="50"/><text class="t b" x="485" y="40" text-anchor="middle">B</text><text class="t sm" x="485" y="55" text-anchor="middle">IP 222.222.222.222</text>
<line class="ln" x1="140" y1="45" x2="215" y2="45"/><line class="ln" x1="345" y1="45" x2="420" y2="45"/>
<text class="t sm" x="177" y="105" text-anchor="middle">Frame 1</text>
<text class="t sm" x="177" y="120" text-anchor="middle">MAC src 74-29-9C-E8-FF-55</text>
<text class="t sm" x="177" y="135" text-anchor="middle">MAC dst E6-E9-00-17-BB-4B (R)</text>
<text class="t sm" x="382" y="105" text-anchor="middle">Frame 2</text>
<text class="t sm" x="382" y="120" text-anchor="middle">MAC src 1A-23-F9-CD-06-9B (R)</text>
<text class="t sm" x="382" y="135" text-anchor="middle">MAC dst 49-BD-D2-C7-56-2A (B)</text>
<text class="t sm" x="280" y="170" text-anchor="middle">IP src 111.111.111.111, IP dst 222.222.222.222 (ทั้งสอง frame)</text>
</svg></div>
<ol>
<li>A สร้าง IP datagram (src = A, dst = B)</li>
<li>A สร้าง frame โดย <b>dst MAC = MAC ของ R (interface ฝั่ง A)</b> ไม่ใช่ MAC ของ B; src MAC = MAC ของ A</li>
<li>R รับ frame ลอกออก ส่ง datagram ขึ้นไป IP, ดู forwarding table เลือก interface ออก</li>
<li>R สร้าง frame ใหม่: src MAC = MAC ของ R (interface ฝั่ง B), dst MAC = MAC ของ B; IP datagram เหมือนเดิม</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>IP src/dst ไม่เปลี่ยนที่ router (ยกเว้น NAT)</li>
<li>MAC src/dst ถูกเขียนใหม่ทุก link; R มี MAC แยกต่อ interface</li>
<li>A ใช้ MAC ของ R เป็น dst เมื่อ B อยู่ต่าง subnet</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ผิดบ่อย: เข้าใจว่า dst MAC ของ frame แรกเป็น MAC ของ B ปลายทาง ซึ่ง A ไม่มีทางรู้ MAC ของ B ที่อยู่ subnet อื่น</div>`
    },
    {
      t: "ARP Spoofing และการป้องกัน",
      html: `
<p>ARP <b>ไม่มี authentication</b>: ผู้ส่งเชื่อ ARP reply ทุกอัน แม้ไม่มีใครถาม ผู้โจมตี (MAC-X) ส่ง reply ปลอมให้เหยื่อว่า "192.168.1.1 (gateway) อยู่ที่ MAC-X" เหยื่อจึงส่งทราฟฟิกไปหาผู้โจมตีแทน gateway (man-in-the-middle)</p>
<h4>การป้องกัน</h4>
<ul>
<li><b>DHCP snooping</b>: switch ดู DHCP แล้วสร้าง <b>binding table</b> (IP, MAC, port) ว่าใครได้ IP อะไร</li>
<li><b>Dynamic ARP Inspection (DAI)</b>: ตรวจทุก ARP message เทียบกับ table — ตรง → forward, ไม่ตรง → drop, log, disable port</li>
<li><b>Static ARP</b> สำหรับอุปกรณ์สำคัญ</li>
<li><b>Encryption</b> (TLS, VPN) ทำให้ข้อมูลที่ถูกดักอ่านไม่ได้</li>
</ul>
<p><b>ตัวอย่าง</b>: binding table: 192.168.1.1 = R1 ที่ port 1 (trusted), 192.168.1.10 = A ที่ port 3, 192.168.1.66 = X ที่ port 5 ถ้าเครื่องที่ port 5 ส่ง ARP ว่า "ฉันคือ 192.168.1.1, MAC = X" → table บอกว่า 192.168.1.1 = R1 ที่ port 1 → mismatch → drop</p>
<h4>ภาพรวม "A day in the life of a web request"</h4>
<ol>
<li>เข้า Wi-Fi: DHCP ให้ IP (ยังไม่มี IP จึง broadcast ด้วย MAC)</li>
<li>หา router: ARP ได้ MAC ของ gateway</li>
<li>หา server: DNS แปลง ชื่อ เป็น IP</li>
<li>เชื่อมต่อ: TCP 3-way handshake</li>
<li>เข้ารหัส: TLS</li>
<li>ขอหน้าเว็บ: HTTP request/response</li>
</ol>
<p>ทุก packet ถูกทำเป็น frame ในทุก link (L2) และส่งเป็นสัญญาณ (L1)</p>
<div class="note"><b>💡 หมายเหตุ</b> การทดลอง ARP spoofing บนเครือข่ายโดยไม่ได้รับอนุญาตผิดกฎหมาย</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `Host A: IP 192.168.1.10, mask 255.255.255.0, default gateway 192.168.1.1 ต้องการส่งข้อมูลไปยัง 10.0.0.20 (ยังไม่มีรายการใน ARP table)`,
      q: "A จะส่ง ARP request ถามหา MAC ของ IP ใด?",
      opts: [
        { t: "10.0.0.20 เพราะนั่นคือปลายทาง", why: "ผิด: 10.0.0.20 อยู่นอก subnet ARP broadcast ข้ามไปไม่ถึง และ A ไม่ ARP หา address นอก subnet" },
        { t: "192.168.1.1 (default gateway)", why: "ถูก: 10.0.0.20 AND 255.255.255.0 = 10.0.0.0 ≠ 192.168.1.0 จึงต้องส่ง frame ถึง gateway และใช้ ARP หา MAC ของ gateway" },
        { t: "ส่ง ARP ไปยัง DNS server", why: "ผิด: DNS ใช้แปลงชื่อเป็น IP ไม่เกี่ยวกับการหา MAC" },
        { t: "ไม่ต้อง ARP ใช้ FF:FF:FF:FF:FF:FF เป็น dst ของ frame ข้อมูลเลย", why: "ผิด: broadcast frame ไม่ได้ถูกส่งต่อข้าม router และเป็นการส่งข้อมูลถึงทุกคนใน LAN" }
      ],
      ans: 1
    },
    {
      type: "choice",
      fig: `<svg viewBox="0 0 560 130" xmlns="http://www.w3.org/2000/svg"><rect class="bx hd" x="10" y="20" width="140" height="60"/><text class="t b" x="80" y="40" text-anchor="middle">A</text><text class="t sm" x="80" y="55" text-anchor="middle">111.111.111.111</text><text class="t sm" x="80" y="70" text-anchor="middle">74-29-9C-E8-FF-55</text><rect class="bx" x="210" y="20" width="140" height="60"/><text class="t b" x="280" y="38" text-anchor="middle">R</text><text class="t sm" x="280" y="52" text-anchor="middle">L: E6-E9-00-17-BB-4B</text><text class="t sm" x="280" y="68" text-anchor="middle">R: 1A-23-F9-CD-06-9B</text><rect class="bx hd" x="410" y="20" width="140" height="60"/><text class="t b" x="480" y="40" text-anchor="middle">B</text><text class="t sm" x="480" y="55" text-anchor="middle">222.222.222.222</text><text class="t sm" x="480" y="70" text-anchor="middle">49-BD-D2-C7-56-2A</text><line class="ln" x1="150" y1="50" x2="210" y2="50"/><line class="ln" x1="350" y1="50" x2="410" y2="50"/></svg>`,
      story: `A ส่ง datagram ไปยัง B (222.222.222.222) ผ่าน router R ตามรูป A รู้ MAC ของ R ฝั่งซ้ายแล้ว`,
      q: "frame ที่เดินบน link ระหว่าง R กับ B มี MAC src, MAC dst, IP src, IP dst เป็นอย่างไร?",
      opts: [
        { t: "MAC src = 74-29-9C-E8-FF-55, MAC dst = 49-BD-D2-C7-56-2A, IP ไม่เปลี่ยน", why: "ผิด: MAC src ต้องเป็น MAC ของ R ฝั่งขวา เพราะ frame ถูกสร้างใหม่ทุก link" },
        { t: "MAC src = 1A-23-F9-CD-06-9B, MAC dst = 49-BD-D2-C7-56-2A, IP src = R, IP dst = B", why: "ผิด: R ไม่เปลี่ยน IP src เป็นของตน (เว้นแต่ทำ NAT) IP src ยังเป็น A" },
        { t: "MAC src = 1A-23-F9-CD-06-9B, MAC dst = 49-BD-D2-C7-56-2A, IP src = 111.111.111.111, IP dst = 222.222.222.222", why: "ถูก: MAC เปลี่ยนเป็นของ link นี้ (R ขวา → B) แต่ IP end-to-end ยังเป็น A → B" },
        { t: "MAC src = E6-E9-00-17-BB-4B, MAC dst = 49-BD-D2-C7-56-2A, IP src = 111.111.111.111, IP dst = 222.222.222.222", why: "ผิด: E6-E9-... เป็น MAC ของ interface ฝั่ง A ไม่ได้อยู่บน link ฝั่ง B" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `Host H เชื่อมกับ LAN เดียวกันซึ่งมี MAC ของตนคือ 3C:22:FB:9A:41:07 และเข้าร่วม multicast group ที่ใช้ MAC 01:00:5E:00:00:FB NIC ของ H ได้ยิน frame สี่อันที่มี dst MAC ต่างกัน: (1) 3C:22:FB:9A:41:07 (2) FF:FF:FF:FF:FF:FF (3) 58:1C:0A:22:B3:7E (4) 01:00:5E:00:00:FB`,
      q: "NIC ของ H จะส่ง frame ใดขึ้นไปให้ชั้นบนประมวลผล?",
      opts: [
        { t: "(1), (2) และ (4)", why: "ถูก: unicast ถึงตน, broadcast, และ multicast group ที่เข้าร่วม ส่วน (3) เป็นของเครื่องอื่นจึง drop" },
        { t: "(1) เท่านั้น", why: "ผิด: broadcast และ multicast group ที่เข้าร่วมก็รับด้วย" },
        { t: "(1) และ (2) เท่านั้น", why: "ผิด: ลืม multicast ที่เข้าร่วมไว้" },
        { t: "ทั้ง (1)-(4) เพราะ NIC รับทุกอย่างบน shared link", why: "ผิด: NIC กรองด้วย dst MAC และ drop frame ที่ไม่ใช่ของตน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลเครือข่ายหอพักใช้ MAC filtering อนุญาตเฉพาะ MAC ที่ลงทะเบียน นักศึกษาสองคนเปิด Wi-Fi แล้วพบว่า phone ที่เคยเชื่อมต่อได้ถูกมองเป็น "อุปกรณ์ใหม่" เมื่อย้ายไป SSID อื่น และ MAC ของ phone แสดงเป็น 5E:7A:11:C2:90:3D`,
      q: "สาเหตุและข้อสรุปที่ถูกต้องที่สุดคืออะไร?",
      opts: [
        { t: "NIC ของ phone เสียและเปลี่ยน OUI", why: "ผิด: ไม่ได้บ่งชี้ว่า NIC เสีย" },
        { t: "ผู้ผลิตกำหนด MAC ใหม่ให้ทุกครั้งที่ boot", why: "ผิด: MAC ที่ผู้ผลิตกำหนดคงที่ ไม่ได้เปลี่ยนตามเครือข่าย" },
        { t: "DHCP server เป็นผู้กำหนด MAC ให้", why: "ผิด: DHCP แจก IP ไม่ใช่ MAC" },
        { t: "hex ตัวที่สองของ byte แรกเป็น E ซึ่งแปลว่า locally administered — phone ใช้ private (randomized) MAC ต่างกันต่อเครือข่าย MAC จึงไม่ใช่ ID ที่เชื่อถือได้สำหรับผู้ดูแลอีกต่อไป", why: "ถูก: ตัวที่สองเป็น 2, 6, A, E = bit locally administered เปิด; ใช้เพื่อกันการติดตามแต่ทำให้ MAC filtering ไม่น่าเชื่อถือ" }
      ],
      ans: 3
    },
    {
      type: "choice",
      story: `switch ที่เปิด DHCP snooping และ Dynamic ARP Inspection มี binding table: 192.168.1.1 = MAC R1 (port 1, trusted); 192.168.1.10 = MAC A (port 3); 192.168.1.66 = MAC X (port 5) ต่อมามี ARP reply เข้ามาทาง port 5 ระบุว่า "192.168.1.1 is at MAC X"`,
      q: "switch จะทำอย่างไรกับ ARP message นี้?",
      opts: [
        { t: "forward ต่อ เพราะ ARP ไม่ต้องตรวจสอบ", why: "ผิด: DAI ตรวจ ARP ทุกอันเทียบกับ binding table" },
        { t: "drop, log และอาจปิด port เพราะ table ระบุว่า 192.168.1.1 เป็นของ R1 ที่ port 1 ไม่ตรงกับที่อ้าง", why: "ถูก: mismatch ระหว่าง IP-MAC-port จึงถือเป็น ARP spoofing" },
        { t: "อัปเดต binding table ให้ 192.168.1.1 = X", why: "ผิด: table มาจาก DHCP snooping ที่เชื่อถือได้ ไม่ใช่จากข้อความ ARP ที่ไม่ผ่านการยืนยัน" },
        { t: "ส่งเป็น broadcast ไปทุก port เพื่อถามความเห็น", why: "ผิด: ไม่ใช่พฤติกรรมของ DAI" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `นักศึกษาเปิด laptop เข้า Wi-Fi ครั้งแรก ตอนนั้น laptop ยังไม่ได้รับ IP ใด ๆ และต้องส่ง DHCP request ให้ server ตอบกลับมายังการ์ดนี้โดยเฉพาะ`,
      q: "ข้อใดอธิบายได้ดีที่สุดว่า link layer ทำให้เรื่องนี้เป็นไปได้อย่างไร?",
      opts: [
        { t: "ใช้ IP address 0.0.0.0 เป็นตัวระบุ laptop ทั้งขาไปขากลับ", why: "ผิด: 0.0.0.0 ไม่ใช่ตัวระบุเฉพาะเครื่อง server จะตอบกลับเครื่องเฉพาะไม่ได้" },
        { t: "ใช้ DNS ถามหา IP ที่ว่างก่อน", why: "ผิด: DNS แปลงชื่อเป็น IP ใช้ IP อยู่แล้ว" },
        { t: "ใช้ MAC address ของ NIC ซึ่งมีมาตั้งแต่ผลิตและไม่ต้องมี IP: request ส่งแบบ broadcast ด้วย MAC และ reply กลับมายังการ์ดเฉพาะนั้น", why: "ถูก: MAC คือชื่อของ interface ก่อนมีการตั้งค่า ใช้ IP เพื่อขอ IP ไม่ได้" },
        { t: "ใช้ ARP เพื่อขอ IP จาก gateway", why: "ผิด: ARP แปลง IP เป็น MAC ไม่ได้แจก IP" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `Host A มี IP 192.168.1.130 และ subnet mask 255.255.255.128 (/25) default gateway 192.168.1.129 A ต้องการส่งข้อมูลไปยัง 192.168.1.20`,
      q: "A จะ ARP หาอะไร?",
      opts: [
        { t: "192.168.1.20 เพราะ 3 octet แรกเหมือนกัน", why: "ผิด: ต้องใช้ mask /25 ไม่ใช่ดู octet" },
        { t: "ไม่ต้อง ARP ใช้ broadcast ส่งข้อมูลไปเลย", why: "ผิด: ไม่เป็นไปตามกติกาของ host" },
        { t: "192.168.1.255", why: "ผิด: ไม่ใช่ address ที่ต้องการ" },
        { t: "192.168.1.129 (gateway) เพราะ network ของ A คือ 192.168.1.128/25 ส่วน 192.168.1.20 อยู่ใน 192.168.1.0/25", why: "ถูก: 130 AND 128 = 128 แต่ 20 AND 128 = 0 จึงอยู่ต่าง subnet ต้องส่งผ่าน gateway" }
      ],
      ans: 3
    },
    {
      type: "choice",
      story: `Host A (192.168.1.10) ส่ง ARP request หา 192.168.1.7 (host B) และได้รับ reply แล้ว ภายหลัง B ต้องส่งข้อมูลกลับให้ A (ยังอยู่ใน TTL ของทุก entry ที่เกี่ยวข้อง)`,
      q: "B ต้อง ARP หา MAC ของ A อีกหรือไม่ และเพราะอะไร?",
      opts: [
        { t: "ไม่ต้อง เพราะ B เรียนรู้ MAC และ IP ของ A จาก ARP query ที่ A ส่งมา (Sender MAC/IP) และเก็บไว้ใน ARP table แล้ว", why: "ถูก: query ติด Sender MAC/IP มาด้วย B จึงส่ง unicast ได้ทันที" },
        { t: "ต้อง เพราะ ARP reply ไม่มีข้อมูลของ A", why: "ผิด: reply ถูกส่งไปหา A ตามที่ B เรียนรู้จาก query" },
        { t: "ต้อง เพราะ ARP table เก็บเฉพาะ gateway", why: "ผิด: ARP table เก็บทุก entry ที่เรียนรู้" },
        { t: "ไม่ต้อง เพราะ B ใช้ broadcast ส่งข้อมูลเสมอ", why: "ผิด: ข้อมูลทั่วไปส่งแบบ unicast" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลตั้ง firewall บนเครื่อง server ให้ drop ทุก IP packet ที่ไม่ได้มาจาก subnet เดียวกัน แต่ server ยังตอบ ARP request ได้ตามปกติ ผู้ดูแลสงสัยว่า firewall ที่กรอง IP ไม่เห็นการสื่อสารแบบ ARP เลย`,
      q: "ข้อใดอธิบายได้ถูกต้อง?",
      opts: [
        { t: "ARP อยู่ใน payload ของ IP แต่ firewall ละเว้นเป็นกรณีพิเศษ", why: "ผิด: ARP ไม่ได้อยู่ใน IP" },
        { t: "ARP ทำงานผ่าน UDP port 53", why: "ผิด: port 53 คือ DNS" },
        { t: "ARP ถูกส่งใน Ethernet frame โดยตรง (Type 0x0806) ไม่ใช่ IP packet จึงไม่ถูก filter ระดับ IP", why: "ถูก: ARP อยู่ระหว่าง L2 กับ L3 ใน frame ของมันเอง ไม่ใช่ IPv4 (0x0800)" },
        { t: "firewall IP กรอง ARP ได้เสมอเพราะ ARP คือ IP", why: "ผิด: ARP ไม่ใช่ IP packet" }
      ],
      ans: 2
    },
    {
      type: "multi",
      story: `Host หนึ่งใน LAN ใช้ ARP`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับ ARP",
      opts: [
        { t: "ARP request ถูกส่งแบบ broadcast ไปที่ FF:FF:FF:FF:FF:FF", ok: true, why: "ถูก: ไม่รู้ MAC เป้าหมายจึงถามทุกคน" },
        { t: "ARP reply ถูกส่งแบบ unicast กลับหาผู้ถาม", ok: true, why: "ถูก: ผู้ตอบรู้ MAC ผู้ถามจาก query" },
        { t: "ARP ใช้หา MAC ของเครื่องที่อยู่นอก subnet ได้โดยตรง", ok: false, why: "ผิด: ARP ใช้ภายใน subnet เดียว นอก subnet ให้ ARP หา gateway" },
        { t: "รายการใน ARP table มี TTL และหมดอายุได้", ok: true, why: "ถูก: เพื่อให้ตารางทันสมัย" },
        { t: "ARP reply ถูกตรวจสอบ authentication ก่อนยอมรับ", ok: false, why: "ผิด: ARP ไม่มี authentication จึงเกิด ARP spoofing ได้" },
        { t: "ARP message อยู่ใน Ethernet frame ที่มี Type 0x0806", ok: true, why: "ถูก: ไม่ได้อยู่ใน IP packet" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลระบบวิเคราะห์การเดินทางของ packet จาก host A ไปยัง server ที่อยู่ต่างเครือข่าย ผ่าน switch หนึ่งตัวและ router สองตัว`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "IP source และ destination ไม่เปลี่ยนระหว่างทาง (ถ้าไม่มี NAT)", ok: true, why: "ถูก: IP เป็น end to end" },
        { t: "MAC address ใน frame ถูกเขียนใหม่ในแต่ละ link", ok: true, why: "ถูก: MAC ใช้ในหนึ่ง hop เท่านั้น" },
        { t: "Switch อ่าน IP header เพื่อตัดสินใจส่งต่อ", ok: false, why: "ผิด: switch ทำงานถึง Layer 2 อ่าน MAC" },
        { t: "Router อ่านถึง Layer 3 เพื่อเลือก next hop จาก network part ของ IP", ok: true, why: "ถูก: ใช้ forwarding table" },
        { t: "Frame ที่ NIC ตรวจพบ error จะถูก drop โดยไม่แจ้งเตือน", ok: true, why: "ถูก: error หรือ dst MAC ไม่ใช่ของตน → drop เงียบ ๆ" }
      ]
    },
    {
      type: "blank",
      text: `MAC address ยาว {1} bit, 24 bit แรกเรียกว่า {2} ซึ่งบอกผู้ผลิต และ address {3} หมายถึงส่งถึงทุกเครื่องใน LAN`,
      blanks: [
        { opts: ["32", "48", "64", "128"], ans: 1, why: "MAC = 48 bit (6 byte)" },
        { opts: ["ISN", "OUI", "TTL", "MSS"], ans: 1, why: "OUI ถูก IEEE กำหนดให้ผู้ผลิต" },
        { opts: ["00:00:00:00:00:00", "01:00:5E:00:00:FB", "FF:FF:FF:FF:FF:FF", "3C:22:FB:9A:41:07"], ans: 2, why: "ทุก bit เป็น 1 = broadcast" }
      ]
    },
    {
      type: "blank",
      story: `ARP request จาก 192.168.1.10 (3C:22:FB:9A:41:07) ที่ต้องการหา MAC ของ 192.168.1.7`,
      text: `ARP request ส่งใน frame ที่มี Type = {1} และ dst MAC = {2}; ในข้อความมี Operation = {3} และ Target MAC เป็นศูนย์ทั้งหมดเพราะเป็นสิ่งที่ต้องการรู้`,
      blanks: [
        { opts: ["0x0800", "0x86DD", "0x0806", "0x0035"], ans: 2, why: "0x0806 = ARP" },
        { opts: ["3C:22:FB:9A:41:07", "FF:FF:FF:FF:FF:FF", "00:00:00:00:00:00", "58:1C:0A:22:B3:7E"], ans: 1, why: "request เป็น broadcast" },
        { opts: ["1", "2", "3", "0"], ans: 0, why: "1 = request, 2 = reply" }
      ]
    },
    {
      type: "blank",
      text: `เมื่อ packet ข้าม router: IP source/destination {1} ตลอดเส้นทาง แต่ MAC address {2} ในทุก hop; ในการส่ง switch ทำงานถึง Layer {3}`,
      blanks: [
        { opts: ["เปลี่ยนทุก hop", "ไม่เปลี่ยน", "ถูกลบ", "ถูกเข้ารหัส"], ans: 1, why: "IP เป็น end to end" },
        { opts: ["ไม่เปลี่ยน", "ถูกเขียนใหม่", "ถูกลบ", "ใช้ซ้ำกับ IP"], ans: 1, why: "MAC ใช้ในหนึ่ง link เท่านั้น" },
        { opts: ["1", "2", "3", "4"], ans: 1, why: "switch อ่าน frame/MAC (L2); router ถึง L3" }
      ]
    },
    {
      type: "match",
      q: "จับคู่คำศัพท์กับความหมาย",
      pairs: [
        ["Node", "อุปกรณ์ที่รัน link layer เช่น host, router, switch, AP"],
        ["Frame", "packet ของ Layer 2 ที่ห่อ datagram ข้าม link เดียว"],
        ["OUI", "24 bit แรกของ MAC ที่ระบุผู้ผลิต"],
        ["Dynamic ARP Inspection", "switch ตรวจ ARP เทียบกับ binding table จาก DHCP snooping"],
        ["Default gateway", "router ที่ host ใช้ ARP หา MAC เมื่อปลายทางอยู่นอก subnet"]
      ],
      why: "แต่ละคำเป็นแนวคิดหลักของ link layer, MAC และ ARP"
    }
  ]
});
