IOT.reg({
  id: "c1",
  title: "Network Fundamentals",
  th: "แนวคิด network และ Internet, topology, ประเภทเครือข่าย (LAN/MAN/WAN), อุปกรณ์เครือข่าย, การออกแบบ Layer 2/Layer 3 enterprise LAN และ WAN",
  summary: `
<ul>
<li><b>Switch</b> เชื่อมคอมพิวเตอร์ใน network เดียวกัน; <b>Router</b> เชื่อมหลาย network ผ่าน WAN port; หลาย network ต่อกันด้วย router = <b>Internet</b></li>
<li><b>Topology</b>: star, bus, ring, tree, full mesh, partial mesh, hybrid; องค์กรมักใช้ <b>tree หรือ hybrid</b></li>
<li><b>Star</b>: ต่อเพิ่มง่าย monitor ง่าย แต่ central node ล่ม = ทั้งเครือข่ายล่ม | <b>Bus</b>: สายน้อย แต่ bus เสีย = ล่มทั้งหมด และ security ต่ำ | <b>Ring</b>: สายน้อย แต่เพิ่ม node ยาก | <b>Tree</b>: ขยายง่าย แต่ node ระดับบนเสียแล้วกระทบหนัก | <b>Full mesh</b>: reliable สุด แต่แพง ใช้ port/สายมาก (n(n-1)/2 links) | <b>Partial mesh</b>: ถูกกว่า reliable น้อยกว่า | <b>Hybrid</b>: รวม star + tree + partial mesh แต่ต้นทุนสูง</li>
<li><b>LAN</b>: ไม่กี่ตร.กม. องค์กรซื้ออุปกรณ์เอง (Ethernet, Wi-Fi) | <b>WAN</b>: สิบถึงพัน กม. เช่า leased line จาก ISP (PPP, PPPoE, HDLC) | <b>MAN</b>: ระหว่าง LAN กับ WAN (Ethernet 10/100 Gbit/s, WiMAX)</li>
<li><b>Public network</b> (เช่น Internet) ใครจ่ายเงินก็ใช้ได้ | <b>Private network</b> สร้างเพื่องานเฉพาะขององค์กร (ทหาร รถไฟ ไฟฟ้า)</li>
<li><b>Switch</b>: ใกล้ผู้ใช้ที่สุด, 1 switch network = 1 <b>broadcast domain</b></li>
<li><b>Router</b>: forward ตาม destination IP, <b>แยก broadcast domain</b>, รัน routing protocol, สร้าง/ดูแล routing table, ต่อ WAN, ทำ NAT</li>
<li><b>Firewall</b>: คุมการสื่อสารระหว่าง network ที่ trust ต่างกัน, access control, authentication, VPN/encryption, NAT</li>
<li><b>AP</b>: fat AP (บ้าน ทำงานอิสระ), fit AP (องค์กร ต้องมี AC), cloud AP (จัดการผ่าน cloud) | <b>AC</b>: ควบคุม AP หลายตัว, อยู่ที่ aggregation layer</li>
<li><b>Layered design</b>: access, aggregation, core; Layer 2 LAN = access + aggregation (เครือข่ายเล็ก), Layer 3 LAN = access + aggregation + core (เครือข่ายใหญ่); aggregation port ต้อง bandwidth สูงกว่า access</li>
<li><b>Enterprise LAN</b> ซื้ออุปกรณ์เอง (10/100/1000 Mbit/s) ดูแลเอง พื้นที่เล็ก | <b>Enterprise WAN</b> เช่า leased line ของ carrier จ่ายค่า bandwidth รายปี</li>
</ul>`,
  sections: [
    {
      t: "Network และ Internet",
      ref: "หน้า 18-19",
      html: `
<p>เชื่อมคอมพิวเตอร์ 2 เครื่องได้ด้วยสายตรง แต่ถ้ามี 3 เครื่องขึ้นไปต้องมี <b>network device</b> โดยเครื่องที่อยู่ใกล้กันต่อเข้า <b>switch</b> ด้วยสายก็เป็น network หนึ่ง</p>
<figure><img src="i/p019_1.webp" alt="คอมพิวเตอร์หลายเครื่องต่อเข้ากับ switch ตัวเดียว" loading="lazy"><figcaption>Fig. 1.1 Network illustration: คอมพิวเตอร์ใกล้กันต่อ switch เป็น network</figcaption></figure>
<p>การสื่อสารระหว่าง network ที่อยู่ต่างสถานที่ต้องผ่าน <b>router</b> ซึ่งมี <b>WAN port</b> สำหรับส่งข้อมูลระยะไกลและ forward packet ระหว่าง network หลาย network ที่ต่อกันด้วย router จึงเกิดเป็น <b>Internet</b></p>
<figure><img src="i/p019_2.webp" alt="หลาย network เชื่อมกันด้วย router เป็น Internet" loading="lazy"><figcaption>Fig. 1.2 Illustration of internet: network หลายแห่งเชื่อมกันด้วย router</figcaption></figure>
<p>Internet เริ่มจากการเชื่อมเครือข่ายของมหาวิทยาลัยและสถาบันวิจัยในสหรัฐฯ แล้วขยายไปทั่วโลกผ่านสายใยแก้วใต้ทะเลและดาวเทียม จนเป็น <b>Internet ระดับโลก</b> ซึ่งเป็น network ที่ใหญ่ที่สุดในปัจจุบัน</p>
<figure><img src="i/p020_1.webp" alt="ภาพประกอบ Internet ระดับโลก" loading="lazy"><figcaption>Fig. 1.3 Illustration of the internet: Internet ทั่วโลก</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Switch = เชื่อมเครื่องใน network เดียวกัน; Router = เชื่อมระหว่าง network (มี WAN port)</li>
<li>Internet = หลาย network ต่อกันด้วย router; ภารกิจของ network engineer: วางแผน network, config อุปกรณ์, เลือก best path ให้ packet</li>
</ul></div>`
    },
    {
      t: "Network Topology",
      ref: "หน้า 19-21",
      html: `
<p>อุปกรณ์ (computer, router, switch) เชื่อมกันผ่านสื่อ (twisted pair, optical fiber) เป็นรูปแบบต่าง ๆ เรียกว่า <b>topology</b> แต่ละแบบมีข้อดีข้อเสียต่างกัน</p>
<figure><img src="i/p020_2.webp" alt="topology แบบ star bus ring tree full mesh partial mesh hybrid" loading="lazy"><figcaption>Fig. 1.4 Network topologies: star, bus, ring, tree, full mesh, partial mesh, hybrid</figcaption></figure>
<table>
<tr><th>Topology</th><th>ลักษณะ</th><th>ข้อดี</th><th>ข้อเสีย</th></tr>
<tr><td><b>Star</b></td><td>ทุก node ต่อเข้า central node</td><td>เพิ่ม node ง่าย; ข้อมูลผ่าน central node จึง monitor ง่าย</td><td>central node ล่ม ทั้งเครือข่ายกระทบ</td></tr>
<tr><td><b>Bus</b></td><td>ทุก node ต่อกับ bus เส้นเดียว (เช่น coaxial)</td><td>ติดตั้งง่าย ใช้สายน้อย; node หนึ่งเสียมักไม่กระทบทั้งหมด</td><td>bus เสียล่มทั้งหมด; ข้อความจาก node หนึ่งทุก node รับได้ จึง security ต่ำ</td></tr>
<tr><td><b>Ring</b></td><td>ทุก node ต่อเป็นวงปิด</td><td>ใช้สายน้อย</td><td>เพิ่ม node ลำบาก ต้องตัดวงแล้วต่อใหม่</td></tr>
<tr><td><b>Tree</b></td><td>star ซ้อนเป็นชั้น</td><td>ต่อหลาย star เข้าด้วยกันเร็ว แบ่งชั้นได้ ขยายง่าย</td><td>node ระดับสูงยิ่งเสีย ปัญหายิ่งรุนแรง</td></tr>
<tr><td><b>Full mesh</b></td><td>ทุก node ต่อถึงกันหมด</td><td>reliability และ efficiency สูง</td><td>ต้องใช้ port และสายมาก ต้นทุนสูง ขยายยาก</td></tr>
<tr><td><b>Partial mesh</b></td><td>เชื่อมกันเฉพาะ node สำคัญ</td><td>ต้นทุนต่ำกว่า full mesh</td><td>reliability ต่ำกว่า full mesh</td></tr>
<tr><td><b>Hybrid</b></td><td>รวม star + tree + partial mesh</td><td>เพิ่ม node และ monitor ง่ายแบบ star, แบ่งชั้นแบบ tree, reliable แบบ partial mesh</td><td>ต้องมี redundant อุปกรณ์/สาย ต้นทุนสูง</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ</b> จำนวน link ของ full mesh ที่มี n node คือ <b>n(n-1)/2</b> เช่น 5 node = 10 link, 10 node = 45 link และแต่ละ node ต้องมีอย่างน้อย n-1 port จึงแพงเมื่อ n โต</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Enterprise network มักออกแบบเป็น <b>tree</b> หรือ <b>hybrid</b></li>
<li>จุดอ่อนเฉพาะตัว: star = central node, bus = สาย bus และความปลอดภัย, ring = เพิ่ม node ยาก, full mesh = ค่าใช้จ่าย</li>
</ul></div>`
    },
    {
      t: "Network Types: LAN, MAN, WAN, Public/Private",
      ref: "หน้า 21-23",
      html: `
<h4>แบ่งตามพื้นที่ครอบคลุม</h4>
<table>
<tr><th>ชนิด</th><th>พื้นที่</th><th>ลักษณะ</th><th>เทคโนโลยี</th></tr>
<tr><td><b>LAN</b></td><td>ไม่กี่ตารางกิโลเมตร (บ้าน อาคาร campus)</td><td>เชื่อมเครื่องที่อยู่ใกล้กัน องค์กร<b>ซื้ออุปกรณ์เอง</b></td><td>Ethernet, Wi-Fi</td></tr>
<tr><td><b>MAN</b></td><td>ระดับเมือง/มหาวิทยาลัย</td><td>LAN ขนาดใหญ่ ต้นทุนสูงกว่า เร็วกว่า เชื่อม host, database, LAN ในเมืองเดียวกัน</td><td>Ethernet 10/100 Gbit/s, WiMAX</td></tr>
<tr><td><b>WAN</b></td><td>สิบถึงพันกิโลเมตร ข้ามเมือง ประเทศ ทวีป</td><td>ต้อง<b>เช่า line ของ ISP</b> จ่ายค่า bandwidth รายปี bandwidth สัมพันธ์กับค่าใช้จ่าย</td><td>PPP, PPPoE, HDLC</td></tr>
</table>
<p>ตัวอย่าง WAN: องค์กรมี LAN ที่ Beijing และ Shanghai เมื่อเชื่อม 2 LAN เข้าด้วยกันก็เกิด WAN ในอดีตครัวเรือนใช้ ADSL dial up ซึ่งมีแพ็กเกจ 2, 4, 8 Mbit/s ราคาต่างกันตาม bandwidth</p>
<h4>แบ่งตามผู้ใช้</h4>
<ul>
<li><b>Public network</b>: สร้างโดยบริษัทโทรคมนาคม ใครจ่ายตามเงื่อนไขก็ใช้ได้ <b>Internet</b> คือ public network ที่ใหญ่ที่สุด</li>
<li><b>Private network</b>: สร้างเพื่อธุรกิจเฉพาะขององค์กร ไม่ให้บริการคนนอก เช่น ทหาร รถไฟ ไฟฟ้า</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>LAN = องค์กรเป็นเจ้าของอุปกรณ์; WAN = เช่า leased line จาก ISP</li>
<li>MAN อยู่ระหว่าง LAN กับ WAN ใช้เทคโนโลยีคล้าย LAN</li>
<li>เทคโนโลยี LAN: Ethernet, Wi-Fi | WAN: PPP, PPPoE, HDLC</li>
</ul></div>`
    },
    {
      t: "Networking Equipment: Switch, Router, Firewall, Wireless",
      ref: "หน้า 23-26",
      html: `
<p>เครือข่ายองค์กรทั่วไปมองเป็นโครงสร้าง 3 ชั้น คือ <b>access, aggregation, core</b> แต่เพื่อกัน <b>single point of failure</b> จึงใช้ dual aggregation และ dual core ที่ขอบออก Internet (egress) วาง firewall และต่อ Internet ด้วย 2 link</p>
<figure><img src="i/p023_1.webp" alt="เครือข่ายองค์กรแบบ access aggregation core พร้อม firewall และ Internet สองเส้นทาง" loading="lazy"><figcaption>Fig. 1.5 Enterprise computer network: 3 ชั้น + dual core/aggregation + firewall ที่ egress</figcaption></figure>
<h4>1. Switch</h4>
<p>ใน campus network switch มักเป็นอุปกรณ์ที่<b>ใกล้ผู้ใช้ที่สุด</b> network ที่เกิดจาก Ethernet switch เป็น <b>broadcast domain</b> เดียว คือ broadcast frame จาก node หนึ่ง node อื่นทุกตัวได้รับ</p>
<figure><img src="i/p024_1.webp" alt="คอมพิวเตอร์ต่อเข้า switch อยู่ใน broadcast domain เดียวกัน" loading="lazy"><figcaption>Fig. 1.6 Switch: network ของ switch เป็น broadcast domain เดียว</figcaption></figure>
<h4>2. Router</h4>
<p>Router ส่งต่อ message ระหว่าง network segment โดยเลือกเส้นทางตาม <b>destination IP address</b> ไปยัง router ถัดไปหรือปลายทาง และ router ตัวสุดท้ายส่งให้ host ปลายทาง</p>
<ul>
<li><b>แยก broadcast domain</b></li>
<li>รัน routing protocol, สร้างและดูแล routing table</li>
<li>Forward IP message, เชื่อม WAN, ทำ <b>NAT</b></li>
<li>ต่อกับ network ที่เกิดจาก switch</li>
</ul>
<figure><img src="i/p024_2.webp" alt="router เชื่อมหลาย network segment" loading="lazy"><figcaption>Fig. 1.7 Router: forward packet ระหว่าง network segment ตาม destination IP</figcaption></figure>
<h4>3. Firewall</h4>
<p>อุปกรณ์ความปลอดภัยที่คุมการสื่อสารระหว่าง network ที่มีระดับความเชื่อถือต่างกัน (เช่น ภายในองค์กรกับ Internet) โดยกำหนด <b>security policy</b> ตรวจ จำกัด และแก้ไข data flow ที่ผ่าน เพื่อกันผู้ไม่หวังดีเข้าถึงทรัพยากรภายใน</p>
<figure><img src="i/p025_1.webp" alt="firewall คั่นระหว่างเครือข่ายภายในกับ Internet" loading="lazy"><figcaption>Fig. 1.8 Firewall: คั่นระหว่าง network ที่ trust ต่างกัน</figcaption></figure>
<ul>
<li>แยก network ที่มี security level ต่างกัน</li>
<li>ทำ access control (security policy) ระหว่าง network</li>
<li>User authentication, remote access</li>
<li>Data encryption และ VPN</li>
<li>NAT และฟังก์ชัน security อื่น ๆ</li>
</ul>
<h4>4. Wireless devices: AP และ AC</h4>
<p><b>Access Point (AP)</b> คือ "switch ของ wireless network" ให้เครื่องมือถือเข้าถึง wired network ครอบคลุมสิบถึงร้อยเมตร ใช้ในบ้าน อาคาร campus รองรับ 3 โหมด</p>
<figure><img src="i/p026_1.webp" alt="เปรียบเทียบ fat AP, fit AP และ cloud AP" loading="lazy"><figcaption>Fig. 1.9 Access points: Fat AP, Fit AP, Cloud AP</figcaption></figure>
<table>
<tr><th>โหมด</th><th>เหมาะกับ</th><th>ลักษณะ</th></tr>
<tr><td><b>Fat AP</b></td><td>บ้าน</td><td>ทำงานอิสระ config แยกทีละตัว ฟังก์ชันเดียว ราคาถูก</td></tr>
<tr><td><b>Fit AP</b></td><td>องค์กรขนาดกลาง-ใหญ่</td><td>ใช้ร่วมกับ <b>AC</b> จัดการและ config รวมศูนย์ ฟังก์ชันหลากหลาย</td></tr>
<tr><td><b>Cloud AP</b></td><td>องค์กรที่มีหลายสาขา (ร้านค้า โรงแรม SME)</td><td>ต่อ cloud management platform, plug-and-play, ดูแลระยะไกลผ่าน cloud</td></tr>
</table>
<p><b>Access Controller (AC)</b> คืออุปกรณ์ควบคุม AP ของ WLAN รวมและส่งข้อมูลจากหลาย AP ออก Internet, จัดการ config ของ AP และควบคุม authentication, management, broadband access, security ของผู้ใช้ไร้สาย โดยปกติวางที่ <b>aggregation layer</b></p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Switch: 1 broadcast domain | Router: แยก broadcast domain, ตัดสินใจจาก destination IP</li>
<li>Fit AP ต้องมี AC | Fat AP อิสระ | Cloud AP ใช้ cloud platform</li>
<li>Firewall วางที่ egress ระหว่าง LAN กับ Internet</li>
</ul></div>`
    },
    {
      t: "Enterprise LAN: Layer 2 และ Layer 3 Design",
      ref: "หน้า 27-29",
      html: `
<p>Enterprise network ออกแบบเป็น Layer 2 หรือ Layer 3 ตามขนาดและการกระจายตัวของเครื่อง มักเป็น topology แบบ tree หรือ hybrid Layer 2 มีขีดความสามารถจำกัด เหมาะกับ LAN เล็ก ส่วน Layer 3 สร้างเครือข่ายใหญ่ได้ เป้าหมายของ layered model คือ <b>expandable, reliable, cost-effective</b></p>
<h4>Layer 2 LAN</h4>
<ul>
<li><b>Access layer</b>: ติดตั้ง switch ในแต่ละ office ต่อคอมพิวเตอร์ ต้องมี port มาก (ปัจจุบันมักต่อเครื่องที่ 100 Mbit/s)</li>
<li><b>Aggregation layer</b>: switch ใน server room รวม traffic จาก access switch ของทุก office และต่อ server ภายใน แล้วออก Internet ผ่าน router ใช้ port น้อยแต่ <b>bandwidth ต่อ port ต้องสูงกว่า access</b> ไม่เช่นนั้นเป็น bottleneck</li>
<li>ที่ aggregation จะใช้ router หรือ switch ก็ได้ ถ้าเป็น switch มักเป็น Layer 3 ที่ทำ IP forwarding</li>
</ul>
<figure><img src="i/p028_1.webp" alt="Layer 2 LAN: access switch ใน office ต่อกับ aggregation switch และ router" loading="lazy"><figcaption>Fig. 1.10 Layer-2 LAN: access layer + aggregation layer</figcaption></figure>
<h4>Layer 3 LAN</h4>
<p>องค์กรใหญ่ใช้ 3 ชั้น: access, aggregation และ <b>core</b> ตัวอย่าง: บริษัทมี 3 สาขา แต่ละสาขามีอาคารและ server room ของตน aggregation switch ของแต่ละสาขาต่อเข้า switch ที่ network center ซึ่งเรียกว่า <b>core layer switch</b> และ server ของบริษัทต่อที่ core เพื่อให้บริการทั้ง 3 สาขา ชั้น aggregation และ core ใช้ router หรือ Layer 3 switch ก็ได้</p>
<figure><img src="i/p029_1.webp" alt="Layer 3 LAN มี access aggregation และ core layer ของหลายสาขา" loading="lazy"><figcaption>Fig. 1.11 Layer 3 LAN: access + aggregation + core, network center ต่อสาขาและ Internet</figcaption></figure>
<table>
<tr><th>เทียบ</th><th>Layer 2 LAN</th><th>Layer 3 LAN</th></tr>
<tr><td>ชั้น</td><td>access + aggregation</td><td>access + aggregation + core</td></tr>
<tr><td>ขนาด</td><td>LAN เล็ก</td><td>เครือข่ายใหญ่หลายอาคาร/สาขา</td></tr>
<tr><td>Server ต่อที่</td><td>aggregation (server room)</td><td>core (network center)</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> aggregation switch port น้อยแต่ต้องเร็วกว่า access switch เพราะรวม traffic ของหลาย access switch ถ้า bandwidth เท่ากันจะเกิด bottleneck</div>`
    },
    {
      t: "Enterprise WAN",
      ref: "หน้า 29-30",
      html: `
<p>ตัวอย่างโรงงานรถที่ Shijiazhuang และ Tangshan แต่ละโรงงานวางแผน network ตามแผนก (แต่ละแผนก = 1 network segment) ใช้ core layer switch (ทำหน้าที่เทียบเท่า router) เชื่อม segment ของทุกแผนก และ server ต่อที่ Layer 3 switch นี่คือ <b>enterprise LAN</b></p>
<p>เมื่อโรงงานหนึ่งต้องเข้าถึง server ของอีกโรงงาน ต้องเชื่อม network ทั้งสองเข้าด้วยกัน ซึ่งการวางสายหรือใยแก้วเองมีต้นทุนก่อสร้างและดูแลสูงมาก องค์กรจึงมัก<b>เช่า line ของ carrier</b> และจ่ายค่าบริการรายปี เกิดเป็น <b>enterprise WAN</b></p>
<figure><img src="i/p030_1.webp" alt="LAN ของสองโรงงานเชื่อมกันด้วย WAN leased line" loading="lazy"><figcaption>Fig. 1.12 LAN and WAN: LAN สองแห่งเชื่อมกันผ่านสายเช่าเป็น WAN</figcaption></figure>
<table>
<tr><th>เทียบ</th><th>Enterprise LAN</th><th>Enterprise WAN</th></tr>
<tr><td>อุปกรณ์/สาย</td><td>องค์กรจ่ายและซื้อเอง</td><td>เช่า leased line จาก carrier</td></tr>
<tr><td>Bandwidth ทั่วไป</td><td>10, 100, 1000 Mbit/s</td><td>จ่ายตาม bandwidth ที่ต้องการ</td></tr>
<tr><td>การดูแล</td><td>องค์กรดูแลเอง</td><td>ใช้บริการ carrier</td></tr>
<tr><td>พื้นที่</td><td>เล็ก</td><td>ระยะไกล</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ภายใน LAN ใช้ <b>switch</b>; เชื่อม WAN ใช้ <b>router</b></li>
<li>Enterprise WAN เกิดจากการเช่าสายของ carrier แทนการวางสายเอง</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `บริษัทหนึ่งมีสำนักงาน 5 แห่งและต้องการให้ทุกสำนักงานติดต่อกันได้โดยตรงทุกคู่ด้วย link เฉพาะ (full mesh)`,
      q: "ต้องใช้ link ทั้งหมดกี่เส้น และแต่ละสำนักงานต้องมี port สำหรับ link ระหว่างสำนักงานอย่างน้อยกี่ port?",
      opts: [
        { t: "10 link, 4 port ต่อสำนักงาน", why: "ถูก: n(n-1)/2 = 5x4/2 = 10 และแต่ละแห่งต่อกับอีก n-1 = 4 แห่ง" },
        { t: "5 link, 2 port ต่อสำนักงาน", why: "ผิด: นั่นคือ ring ที่แต่ละ node ต่อ 2 เส้น" },
        { t: "20 link, 4 port ต่อสำนักงาน", why: "ผิด: 5x4 = 20 นับ link ซ้ำสองทิศทาง ต้องหารด้วย 2" },
        { t: "25 link, 5 port ต่อสำนักงาน", why: "ผิด: ไม่ต้องต่อกับตัวเอง จึงเป็น n-1 ไม่ใช่ n" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ห้องปฏิบัติการมี 6 เครื่องต่อเข้า switch ตัวกลางตัวเดียว เกิดไฟดับเฉพาะ switch ตัวนั้น`,
      q: "ผลที่เกิดขึ้นสอดคล้องกับ topology ใด และคืออะไร?",
      opts: [
        { t: "Star: central node ล่ม การสื่อสารของทั้งเครือข่ายหยุด", why: "ถูก: ข้อเสียของ star คือ central node เป็น single point of failure" },
        { t: "Bus: เฉพาะเครื่องที่ใกล้ switch หยุดทำงาน", why: "ผิด: ภาพนี้ไม่ใช่ bus ซึ่งใช้สายร่วมเส้นเดียว" },
        { t: "Full mesh: เครื่องยังคุยกันเองได้ผ่านเส้นทางอื่น", why: "ผิด: full mesh ต่อทุกคู่โดยตรง ไม่มี central node" },
        { t: "Ring: วงถูกตัด แต่ข้อมูลวิ่งทางอ้อมได้", why: "ผิด: ไม่ใช่ ring และไม่มีเส้นทางสำรอง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `มหาวิทยาลัยแห่งหนึ่งต้องการ topology ที่ขยายเป็นชั้นตามคณะและภาควิชาได้ง่าย ต้นทุนต่ำ ไม่ต้องการ redundancy มากนัก`,
      q: "topology ใดเหมาะที่สุด?",
      opts: [
        { t: "Tree", why: "ถูก: star ซ้อนกันเป็นชั้น ต่อ star หลายกลุ่มเข้าด้วยกันได้เร็วและขยายง่าย" },
        { t: "Full mesh", why: "ผิด: ต้นทุนสูงและขยายยาก" },
        { t: "Ring", why: "ผิด: เพิ่ม node ต้องตัดวงแล้วต่อใหม่ ไม่เหมาะกับการขยาย" },
        { t: "Hybrid", why: "ผิด: ต้องใช้ redundant อุปกรณ์และสายจึงแพงกว่าที่โจทย์ต้องการ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลพบว่าในเครือข่ายแบบ bus ผู้ใช้คนหนึ่งใช้ซอฟต์แวร์ดักข้อมูลที่ส่งระหว่างผู้ใช้อื่นได้ทุกคน`,
      q: "ข้อเสียของ topology แบบ bus ข้อใดอธิบายเหตุการณ์นี้?",
      opts: [
        { t: "ข้อความที่ node หนึ่งส่ง node อื่นทุกตัวรับได้ จึง security ต่ำ", why: "ถูก: เป็นข้อเสียที่ระบุของ bus" },
        { t: "ต้องตัดวงก่อนเพิ่ม node", why: "ผิด: นั่นเป็นข้อเสียของ ring" },
        { t: "central node เป็น single point of failure", why: "ผิด: bus ไม่มี central node" },
        { t: "ต้นทุนสูงเพราะต้องใช้ port มาก", why: "ผิด: นั่นคือ full mesh" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทก่อสร้างมีสำนักงานใหญ่ที่เชียงใหม่และไซต์งานที่ภูเก็ต ต้องการให้เข้าถึง server เดียวกัน การวางใยแก้วเองข้ามประเทศมีต้นทุนสูงมาก`,
      q: "แนวทางปกติสำหรับสถานการณ์นี้คืออะไร?",
      opts: [
        { t: "เช่า leased line จาก ISP/carrier เชื่อม LAN สองแห่งเป็น WAN และจ่ายค่าบริการรายปี", why: "ถูก: WAN โดยปกติเช่า line และจ่ายตาม bandwidth" },
        { t: "ใช้ switch ตัวเดียวต่อสองไซต์ด้วยสาย UTP", why: "ผิด: ระยะไกลและ switch ใช้ภายใน LAN" },
        { t: "ใช้ hub กลางที่ต่อ Wi-Fi ทั้งสองแห่ง", why: "ผิด: Wi-Fi เป็นเทคโนโลยี LAN ครอบคลุมสิบถึงร้อยเมตร" },
        { t: "สร้าง MAN ของตนเองข้ามจังหวัด", why: "ผิด: MAN ครอบคลุมระดับเมือง และไม่ใช่ทางเลือกที่ถูกกว่า" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ในอาคารหนึ่งมีเครื่อง 40 เครื่องต่อ switch ตัวเดียว เครื่อง A ส่ง broadcast frame ออกมา`,
      q: "ข้อใดถูกต้อง?",
      opts: [
        { t: "ทุกเครื่องที่ต่อ switch ตัวเดียวกัน (broadcast domain เดียว) ได้รับ frame นั้น", why: "ถูก: network ของ Ethernet switch เป็น broadcast domain เดียว" },
        { t: "เฉพาะเครื่องที่มี IP ในกลุ่มเดียวกับ A ได้รับ", why: "ผิด: switch ไม่ได้ตัดสินจาก IP แต่ flood ภายใน broadcast domain" },
        { t: "ไม่มีเครื่องใดได้รับ เพราะ switch กรอง broadcast", why: "ผิด: switch ไม่กรอง broadcast, router ต่างหากที่แยก broadcast domain" },
        { t: "เฉพาะ gateway เท่านั้นได้รับ", why: "ผิด: broadcast ถึงทุก node" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการลดขนาด broadcast domain ของเครือข่ายที่ใหญ่เกินไปโดยแบ่งเป็น 2 network segment`,
      q: "อุปกรณ์ใดที่แยก broadcast domain ได้ตามบทนี้?",
      opts: [
        { t: "Router", why: "ถูก: router forward ตาม destination IP และแยก broadcast domain" },
        { t: "Switch", why: "ผิด: switch ตัวเดียวคือ broadcast domain เดียว" },
        { t: "Access Point", why: "ผิด: AP เป็น wireless switch ของ WLAN" },
        { t: "Access Controller", why: "ผิด: AC ควบคุมและ config AP ไม่ใช่ตัวแยก domain" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `โรงแรมเครือหนึ่งมี 80 สาขาทั่วประเทศ แต่ละสาขามี AP ไม่กี่ตัวและไม่มีผู้ดูแลเครือข่ายประจำ ต้องการติดตั้งแบบ plug-and-play และดูแลระยะไกลจากส่วนกลาง`,
      q: "AP แบบใดเหมาะที่สุด?",
      opts: [
        { t: "Cloud AP พร้อม cloud management platform", why: "ถูก: เหมาะกับองค์กรหลายสาขา เช่น โรงแรม ร้านค้า SME" },
        { t: "Fat AP", why: "ผิด: ต้อง config ทีละตัว ไม่เหมาะกับ 80 สาขา" },
        { t: "Fit AP ร่วมกับ AC ในแต่ละสาขา", why: "ผิด: ต้องมี AC และดูแลรวมศูนย์ระดับองค์กร ไม่ใช่ plug-and-play ผ่าน cloud" },
        { t: "ใช้ router แทน AP", why: "ผิด: router ไม่ใช่อุปกรณ์เข้าถึง wireless" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทขนาดกลางติดตั้ง AP 120 ตัวทั่วอาคาร ต้องการ config และจัดการ authentication ของผู้ใช้ไร้สายแบบรวมศูนย์จากอุปกรณ์ตัวเดียวที่ aggregation layer`,
      q: "ควรเลือกชุดอุปกรณ์ใด?",
      opts: [
        { t: "Fit AP ร่วมกับ AC", why: "ถูก: AC รวมการ config และควบคุมผู้ใช้ของ AP หลายตัว วางที่ aggregation layer" },
        { t: "Fat AP ทั้งหมด", why: "ผิด: fat AP ต้อง config แยกทีละตัว" },
        { t: "Firewall อย่างเดียว", why: "ผิด: firewall คุม security ระหว่าง network ไม่ได้บริหาร AP" },
        { t: "Switch อย่างเดียวไม่ใช้ AP", why: "ผิด: ผู้ใช้ไร้สายต้องผ่าน AP" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ออฟฟิศ 3 ห้อง ห้องละ 30 เครื่อง ต่อ access switch ห้องละตัว (port 100 Mbit/s) แล้วต่อเข้า switch ใน server room เพื่อออก Internet ผ่าน router ผู้ดูแลต้องเลือก port ของ switch ใน server room`,
      q: "ข้อใดเป็นการออกแบบที่ถูกต้อง?",
      opts: [
        { t: "ใช้ port จำนวนน้อยแต่ bandwidth ต่อ port สูงกว่า access switch", why: "ถูก: aggregation รวม traffic จากหลาย access จึงต้องกว้างกว่า ไม่งั้นเป็น bottleneck" },
        { t: "ใช้ port จำนวนมาก bandwidth เท่ากับ access switch", why: "ผิด: aggregation ไม่ต้องการ port มาก และ bandwidth เท่าเดิมทำให้คอขวด" },
        { t: "ใช้ port 10 Mbit/s เพื่อประหยัด", why: "ผิด: ช้ากว่า access จึงเป็นคอขวดแน่นอน" },
        { t: "ข้าม aggregation แล้วต่อ access switch เข้า router โดยตรงเสมอ", why: "ผิด: โครงสร้าง layer 2 LAN ในบทนี้ใช้ aggregation layer รวม traffic" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทมี 3 สาขา แต่ละสาขามีอาคาร server room และ aggregation switch ของตัวเอง ส่วนกลางมี network center ที่ให้ Internet และ server กลางกับทุกสาขา`,
      q: "switch ที่ network center ที่เชื่อม aggregation switch ของทุกสาขาอยู่ชั้นใด และ server กลางควรต่อที่ใด?",
      opts: [
        { t: "Core layer, server ต่อที่ core layer switch", why: "ถูก: ตามตัวอย่าง Layer 3 LAN" },
        { t: "Access layer, server ต่อที่ access", why: "ผิด: access ต่อเครื่องผู้ใช้ปลายทาง" },
        { t: "Aggregation layer, server ต่อที่ access", why: "ผิด: switch ที่รวมหลายสาขาคือ core" },
        { t: "ไม่มีชั้นนี้ ใช้ Layer 2 LAN ก็พอ", why: "ผิด: เครือข่ายหลายสาขาขนาดใหญ่ใช้ Layer 3 LAN 3 ชั้น" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการป้องกันไม่ให้ผู้ใช้จาก Internet เข้าถึงทรัพยากรภายใน และต้องการให้พนักงานเข้ามาจากระยะไกลผ่าน VPN`,
      q: "อุปกรณ์ใดที่ตอบโจทย์ทั้งสองอย่างได้โดยตรง?",
      opts: [
        { t: "Firewall", why: "ถูก: access control, remote access, encryption/VPN เป็นหน้าที่ของ firewall" },
        { t: "Access point", why: "ผิด: AP ให้เข้าถึง wired network แบบไร้สาย" },
        { t: "Switch ชั้น access", why: "ผิด: switch ไม่ทำ security policy ระหว่าง network ที่ trust ต่างกัน" },
        { t: "Fat AP", why: "ผิด: ไม่ใช่อุปกรณ์ security" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `องค์กรหนึ่งกำลังประเมิน topology แบบ full mesh สำหรับเชื่อมสำนักงานสำคัญ 8 แห่ง`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ต้องมี link 28 เส้น", ok: true, why: "ถูก: 8x7/2 = 28" },
        { t: "แต่ละสำนักงานต้องมี port เพื่อต่อ link อย่างน้อย 7 port", ok: true, why: "ถูก: ต่อกับอีก 7 แห่ง" },
        { t: "reliability สูงเพราะมีหลายเส้นทาง", ok: true, why: "ถูก: ข้อดีของ full mesh" },
        { t: "ขยายเพิ่มสำนักงานใหม่ได้ง่ายเพราะต่อเส้นเดียว", ok: false, why: "ผิด: สำนักงานใหม่ต้องต่อกับทุกแห่ง ขยายยากและแพง" },
        { t: "ต้นทุนต่ำกว่า partial mesh", ok: false, why: "ผิด: partial mesh ถูกกว่า" }
      ]
    },
    {
      type: "multi",
      story: `ทีม IT กำลังเปรียบเทียบ LAN และ WAN ขององค์กรที่มีสองเมือง`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "LAN องค์กรมักซื้ออุปกรณ์และดูแลเอง", ok: true, why: "ถูก" },
        { t: "WAN มักเช่า line จาก ISP และจ่ายตาม bandwidth", ok: true, why: "ถูก" },
        { t: "Ethernet และ Wi-Fi เป็นเทคโนโลยีของ LAN", ok: true, why: "ถูก" },
        { t: "PPP และ HDLC เป็นเทคโนโลยีที่ใช้ใน WAN", ok: true, why: "ถูก: PPP, PPPoE, HDLC เป็นเทคโนโลยี WAN" },
        { t: "WAN ครอบคลุมพื้นที่เพียงไม่กี่ตารางกิโลเมตร", ok: false, why: "ผิด: นั่นคือ LAN WAN ครอบคลุมสิบถึงพันกิโลเมตร" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลตรวจสอบหน้าที่ของ router ในเครือข่ายองค์กร`,
      q: "เลือกทุกหน้าที่ที่เป็นของ router",
      opts: [
        { t: "Forward IP message ตาม destination IP", ok: true, why: "ถูก" },
        { t: "สร้างและดูแล routing table", ok: true, why: "ถูก" },
        { t: "แยก broadcast domain", ok: true, why: "ถูก" },
        { t: "ทำ NAT และเชื่อม WAN", ok: true, why: "ถูก" },
        { t: "ควบคุมและ config AP ทั้งหมดของ WLAN โดยตรง", ok: false, why: "ผิด: เป็นหน้าที่ของ AC" }
      ]
    },
    {
      type: "blank",
      story: `ออกแบบ enterprise LAN แบบ Layer 3`,
      text: `LAN ขนาดใหญ่มี 3 ชั้นคือ {1}, aggregation และ core; switch ที่ต่อคอมพิวเตอร์ผู้ใช้อยู่ชั้น {2} ส่วน AC ปกติวางที่ชั้น {3}`,
      blanks: [
        { opts: ["access", "edge", "transport", "session"], ans: 0, why: "สามชั้นคือ access, aggregation, core" },
        { opts: ["access", "core", "aggregation", "egress"], ans: 0, why: "access layer switch ต่อเครื่องผู้ใช้โดยตรง" },
        { opts: ["access", "aggregation", "core", "ไม่มี"], ans: 1, why: "AC อยู่ที่ aggregation layer ของเครือข่าย" }
      ]
    },
    {
      type: "blank",
      text: `สำหรับบ้านเหมาะกับ {1} AP ที่ทำงานอิสระ; องค์กรกลางถึงใหญ่ใช้ {2} AP ร่วมกับ AC; องค์กรหลายสาขาที่ต้องการดูแลระยะไกลใช้ {3} AP`,
      blanks: [
        { opts: ["fat", "fit", "cloud", "core"], ans: 0, why: "fat AP ทำงานอิสระ ราคาถูก ฟังก์ชันเดียว" },
        { opts: ["fat", "fit", "cloud", "thin"], ans: 1, why: "fit AP ต้องอยู่ภายใต้ AC" },
        { opts: ["fat", "fit", "cloud", "star"], ans: 2, why: "cloud AP จัดการผ่าน cloud platform" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์ topology แบบ hybrid`,
      text: `hybrid network รวม star, {1} และ partial mesh; ข้อดีคือ monitor ง่ายเหมือน star, ขยายเป็นชั้นเหมือน tree และ {2} เหมือน partial mesh; ข้อเสียคือต้องมี {3} จึงต้นทุนสูง`,
      blanks: [
        { opts: ["tree", "bus", "ring", "full mesh"], ans: 0, why: "hybrid = star + tree + partial mesh" },
        { opts: ["เชื่อถือได้สูง", "ไม่ต้องใช้สาย", "ราคาถูกที่สุด", "ไม่มีจุดล่ม"], ans: 0, why: "ได้ reliability แบบ partial mesh" },
        { opts: ["อุปกรณ์และสายสำรอง (redundant)", "บริการ ISP", "ซอฟต์แวร์พิเศษ", "AP จำนวนมาก"], ans: 0, why: "ต้องมี redundant equipment and cables" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ topology กับข้อเสียหลัก",
      pairs: [
        ["Star", "central node ล่ม ทั้งเครือข่ายกระทบ"],
        ["Bus", "bus เสียทั้งเครือข่ายล่ม และ node อื่นรับข้อมูลได้ (security ต่ำ)"],
        ["Ring", "เพิ่ม node ต้องตัดวงเดิมแล้วต่อใหม่"],
        ["Tree", "node ระดับสูงขึ้น ปัญหายิ่งรุนแรง"],
        ["Full mesh", "ต้องใช้ port และสายจำนวนมาก ต้นทุนสูง ขยายยาก"]
      ],
      why: "ข้อเสียแต่ละแบบเป็นผลโดยตรงจากโครงสร้างการต่อ"
    },
    {
      type: "match",
      q: "จับคู่อุปกรณ์กับหน้าที่",
      pairs: [
        ["Switch", "อุปกรณ์ใกล้ผู้ใช้ที่สุด สร้าง broadcast domain เดียว"],
        ["Router", "เลือกเส้นทางตาม destination IP และเชื่อม WAN"],
        ["Firewall", "คุมการสื่อสารระหว่าง network ที่ trust ต่างกัน"],
        ["AP", "ให้อุปกรณ์ไร้สายเข้าถึง wired network"],
        ["AC", "รวมและควบคุม config/authentication ของ AP หลายตัว"]
      ],
      why: "แต่ละอุปกรณ์มีบทบาทเฉพาะใน enterprise network"
    }
  ]
});
