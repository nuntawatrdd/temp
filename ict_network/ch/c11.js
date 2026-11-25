IOT.reg({
  id: "c11",
  title: "DHCP",
  th: "Static vs Dynamic address, DORA (Discover/Offer/Request/ACK), lease renewal, config DHCP server (global/interface pool) และ DHCP relay",
  summary: `
<ul>
<li><b>Static address</b>: กำหนดมือ เหมาะกับเครื่องที่ตำแหน่งไม่เปลี่ยนและ <b>server</b> (Web, FTP, DNS, file server, domain controller); <b>Dynamic address</b>: ได้จาก DHCP server เหมาะกับเครื่องที่ย้ายที่บ่อย, Wi-Fi, มือถือ</li>
<li>ปัญหาของ static: พารามิเตอร์เข้าใจยาก, ภาระ admin สูง, <b>IP ใช้ไม่คุ้ม</b>, ไม่ยืดหยุ่นเมื่อย้าย segment, address ชนกันง่าย</li>
<li><b>DHCP</b> = Dynamic Host Configuration Protocol, สถาปัตยกรรม <b>Client/Server</b>; client ตั้งโหมด obtain automatically (ค่า default) server เป็น Windows/Linux server หรือ Huawei L3 device/router</li>
<li>ข้อดี: <b>บริหารจัดการรวมศูนย์</b> (บันทึกว่า IP ไหนถูกใช้) และ <b>lease period</b> (ไม่ต่ออายุ = server เรียก IP คืน)</li>
<li><b>4 ข้อความ (DORA)</b>: <b>Discover</b> (client broadcast; src 0.0.0.0, dst 255.255.255.255) → <b>Offer</b> (server) → <b>Request</b> (client broadcast เลือก server และ address) → <b>ACK</b> (server ยืนยัน lease)</li>
<li>เหตุที่ client ต้องส่ง Request ทั้งที่ได้ Offer แล้ว: เพื่อ <b>แจ้ง server อื่นด้วย broadcast</b> ว่าเลือก server ตัวนี้ แล้ว server อื่นจะเก็บ address ที่ offer ไว้คืนเข้า pool</li>
<li>ต้องขอ IP ใหม่เมื่อ: ครั้งแรก, IP ถูกเรียกคืนไปให้คนอื่น, client release เอง, เปลี่ยน NIC, ย้ายไป segment อื่น</li>
<li><b>Lease renewal</b>: ที่ <b>50%</b> ของ lease client ส่ง Request แบบ <b>unicast</b> ไป server เดิม (ส่งซ้ำได้ 3 ครั้งที่ 4, 8, 16 วินาที); ถ้าไม่ตอบ ที่ <b>87.5%</b> ส่ง Request แบบ <b>broadcast</b> (rebinding) server ไหนตอบก็ได้; หมด lease ต้องหยุดใช้ IP และเริ่ม DORA ใหม่; manual: <code>ipconfig /renew</code></li>
<li><b>Global pool</b>: <code>ip pool</code> + <code>network</code> + <code>gateway-list</code> + <code>dns-list</code> + <code>lease</code> + <code>excluded-ip-address</code> แล้ว <code>dhcp select global</code> ที่ interface; <b>Interface pool</b>: <code>dhcp select interface</code> ใช้ segment ของ interface เอง</li>
<li>1 segment สร้าง pool ได้ <b>1 pool</b>; gateway จะ exclude ไม่ได้; remote segment pool ต้องตั้ง <b>gateway-list</b></li>
<li><b>DHCP relay</b>: router ที่ไม่มี DHCP server ใน segment รับ broadcast แล้วแปลงเป็น <b>unicast</b> ส่งไป server (src = IP ของ interface relay, ให้ server รู้ว่ามาจาก segment ไหน)</li>
<li>ถ้าติดต่อ DHCP server ไม่ได้ Windows จะสร้าง address <b>169.254.0.0/16</b> เอง (ไม่ใช่ 127.254.x.x)</li>
</ul>
<table>
<tr><th>ข้อความ</th><th>จาก</th><th>ชนิดการส่ง</th><th>หน้าที่</th></tr>
<tr><td>Discover</td><td>Client</td><td>Broadcast</td><td>หา DHCP server</td></tr>
<tr><td>Offer</td><td>Server</td><td>ตอบกลับ (ตำราระบุ broadcast)</td><td>เสนอ IP และพารามิเตอร์</td></tr>
<tr><td>Request</td><td>Client</td><td>Broadcast</td><td>เลือก/ขอ address ที่ได้รับเสนอ</td></tr>
<tr><td>ACK</td><td>Server</td><td>ตอบกลับ</td><td>ยืนยัน lease และ config</td></tr>
</table>
<pre><code>dhcp enable
ip pool vlan1
 network 192.168.1.0 mask 24
 gateway-list 192.168.1.1
 dns-list 8.8.8.8
 lease day 0 hour 8 minute 0
 excluded-ip-address 192.168.1.2 192.168.1.10
interface Vlanif 1
 dhcp select global          # หรือ dhcp select interface / dhcp select relay
 dhcp relay server-ip 10.2.2.1</code></pre>`,
  sections: [
    {
      t: "11.1 Static Address vs Dynamic Address",
      ref: "หน้า 358-360",
      html: `
<p>คอมพิวเตอร์ต้องมี IP address, subnet mask, gateway และ DNS จึงใช้งานเครือข่ายได้ ซึ่งตั้งได้ 2 วิธี: <b>static</b> (กำหนดเอง) และ <b>dynamic</b> (ขอจาก DHCP server)</p>
<h4>ปัญหาของการตั้งค่าเอง</h4>
<ul>
<li><b>พารามิเตอร์เข้าใจยาก</b>: ผู้ใช้ทั่วไปอยากแค่เสียบสายหรือต่อ Wi-Fi แล้วใช้ได้; admin ต้องหา IP ที่ยังว่างให้ทุกครั้ง</li>
<li><b>ภาระสูง</b>: เครื่องจำนวนมากต้องวางแผน address และตั้งค่าทีละเครื่อง</li>
<li><b>ใช้ IP ไม่คุ้ม</b>: ทุกคนมี IP ประจำ แม้บางคนไม่อยู่นาน (เช่น ไปเดินทางหนึ่งเดือน) IP นั้นว่างเปล่า ขณะที่พนักงานใหม่ต้องการ IP</li>
<li><b>ไม่ยืดหยุ่น</b>: WLAN ทำให้อุปกรณ์ย้ายตำแหน่ง ย้ายไปอีก segment แล้วต้องตั้งใหม่; ตั้งเองเสี่ยง address ชนกับเครื่องอื่น</li>
</ul>
<h4>เมื่อไรใช้ Static</h4>
<ul>
<li>เครื่องที่ <b>ไม่ย้ายตำแหน่ง</b> เช่น desktop ในห้องแล็บ (อาจกำหนด IP ตามลำดับแถว/คอลัมน์ให้จำง่าย)</li>
<li><b>Server</b> ขององค์กร: Web, FTP, domain controller, file server, DNS เพราะผู้ใช้ต้องเข้าด้วย IP ที่คงที่</li>
</ul>
<h4>เมื่อไรใช้ Dynamic</h4>
<ul>
<li>เครื่องที่ย้ายที่ เช่น นักศึกษาย้ายห้อง 202 (10.7.202.0/24) ไปห้อง 204 (10.7.204.0/24) ให้ DHCP แจก address ใหม่ตาม segment จึงไม่ชนกัน</li>
<li>อุปกรณ์ที่ต่อผ่าน <b>Wi-Fi</b> และมือถือ (4G/5G) ที่เข้า-ออกชั่วคราว</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Server ใช้ <b>static</b>; client ที่ย้ายบ่อย/Wi-Fi ใช้ <b>dynamic (DHCP)</b></li>
<li>เหตุผลที่ใช้ DHCP: ลดงาน admin, ลด address ชน, ใช้ IP คุ้มขึ้น, รองรับการย้ายที่</li>
</ul></div>`
    },
    {
      t: "11.2 หลักการทำงานของ DHCP",
      ref: "หน้า 360-364",
      html: `
<h4>แนวคิดพื้นฐาน</h4>
<p><b>DHCP (Dynamic Host Configuration Protocol)</b> ใช้สถาปัตยกรรม <b>Client/Server</b> host เพียงตั้งโหมด "obtain an IP address automatically" (ค่า default) ก็เป็น DHCP client ส่วน DHCP server อาจเป็น Windows server, Linux server หรืออุปกรณ์ Layer 3 / router ของ Huawei client ส่งคำขอ server ตอบด้วย IP address พร้อม subnet mask, gateway, DNS</p>
<figure><img src="i/p360_1.webp" alt="DHCP client (มือถือ, laptop, desktop) ส่งคำขอไปยัง DHCP server แล้วได้รับ address" loading="lazy"><figcaption>Fig. 11.1 DHCP working illustration: client ส่ง DHCP request, server ตอบด้วย IP address และพารามิเตอร์ (mask, gateway, DNS)</figcaption></figure>
<h4>ข้อดีของ DHCP</h4>
<ol>
<li><b>บริหารรวมศูนย์</b>: address มาจาก pool บน server ซึ่งบันทึกว่า address ไหนใช้แล้วหรือยังว่าง</li>
<li><b>Lease period</b>: ถ้า client ไม่ต่ออายุเมื่อ lease หมด server ถือว่าไม่ต้องใช้ address แล้ว จึงเรียกคืนเพื่อแจกเครื่องอื่น</li>
</ol>
<h4>เมื่อไรที่ client ต้องขอ IP ใหม่</h4>
<ul>
<li>ครั้งแรกที่ขอ IP จาก server</li>
<li>IP เดิมที่เช่าไว้ถูก server เรียกคืนไปให้เครื่องอื่นแล้ว</li>
<li>client release IP เดิมและขอใหม่</li>
<li>เปลี่ยน network interface card</li>
<li>ย้ายไป network segment อื่น</li>
</ul>
<h4>ข้อความ 4 ชนิด (DORA)</h4>
<figure><img src="i/p361_1.webp" alt="ลำดับ DHCP Discover, Offer, Request, ACK ระหว่าง client กับ server" loading="lazy"><figcaption>Fig. 11.2 DHCP working process: Discover → Offer → Request → ACK</figcaption></figure>
<table>
<tr><th>ลำดับ</th><th>ข้อความ</th><th>รายละเอียด</th></tr>
<tr><td>1</td><td><b>DHCP Discover</b></td><td>client ยังไม่มี address และไม่รู้ว่า server คือใคร จึง <b>broadcast</b> หา server; <b>source = 0.0.0.0, destination = 255.255.255.255</b></td></tr>
<tr><td>2</td><td><b>DHCP Offer</b></td><td>DHCP server ทุกตัวที่ได้รับ Discover ตอบด้วย Offer ซึ่งมี address ที่เสนอให้ client</td></tr>
<tr><td>3</td><td><b>DHCP Request</b></td><td>client เลือก Offer แล้ว <b>broadcast</b> Request ที่ระบุตัว server ที่เลือก ให้ server อื่นถอนข้อเสนอ</td></tr>
<tr><td>4</td><td><b>DHCP ACK</b></td><td>server ที่ถูกเลือกยืนยัน lease (มีระยะเวลา lease และพารามิเตอร์) client ใช้ IP ได้หลังได้รับ ACK</td></tr>
</table>
<div class="note"><b>ทำไมต้องส่ง Request ทั้งที่ได้ Offer แล้ว?</b> เพราะอาจมี DHCP server หลายตัวส่ง Offer มา การ broadcast Request ทำให้ server ตัวอื่นรู้ว่า client เลือก server ไหนแล้ว จึงเรียก address ที่เคย offer ไว้คืนไปใช้กับ client อื่นได้</div>
<div class="note"><b>เสริม</b>: DHCP ทำงานบน UDP port 67 (server) และ 68 (client) และเมื่อ client ต้องการเลิกใช้ address ก่อนหมด lease จะส่ง <b>DHCP Release</b> ไปยัง server</div>
<h4>Lease Renewal</h4>
<figure><img src="i/p363_1.webp" alt="ไทม์ไลน์ lease renewal: 50% unicast request, 87.5% broadcast request (rebinding), หมด lease เริ่มใหม่" loading="lazy"><figcaption>Fig. 11.3 DHCP lease renewal: client ต่ออายุที่ 50% ของ lease, ถ้าไม่สำเร็จ rebind ที่ 87.5%</figcaption></figure>
<ul>
<li><b>Automatic</b>: เมื่อผ่านไป <b>50%</b> ของ lease client ส่ง Request <b>ตรงไปยัง server เดิม</b> (unicast) ส่งซ้ำได้สูงสุด 3 ครั้งที่ 4, 8, 16 วินาที ถ้า server ตอบรับ client ใช้ข้อมูลใหม่และทำงานต่อ</li>
<li>ถ้าไม่มีการตอบจาก server เดิม ที่ <b>87.5%</b> ของ lease client <b>broadcast</b> Request ให้ server ใดตอบก็ได้ เรียกว่า <b>rebinding</b></li>
<li>ถ้า lease หมดแล้วยังติดต่อ server ไม่ได้ client ต้อง <b>หยุดใช้ IP ทันที</b> แล้วเริ่มกระบวนการขอ IP ใหม่ตั้งแต่ต้น (Discover)</li>
<li><b>Manual</b>: สั่ง <code>ipconfig /renew</code> บน client เพื่ออัปเดตข้อมูลทันที (เช่น ต้องการ gateway ของ router ใหม่)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li><b>DORA</b>: Discover, Offer, Request, ACK</li>
<li>Discover: src <b>0.0.0.0</b> dst <b>255.255.255.255</b> (broadcast)</li>
<li>Renew ที่ <b>50%</b> (unicast), rebind ที่ <b>87.5%</b> (broadcast)</li>
<li>เปลี่ยน NIC หรือย้าย segment ต้องขอ IP ใหม่</li>
<li><code>ipconfig /renew</code> = ต่ออายุเอง</li>
</ul></div>`
    },
    {
      t: "11.3 Config DHCP Server (Global Address Pool)",
      ref: "หน้า 364-367",
      html: `
<p>โจทย์: บริษัทมี 3 แผนก: Sales 192.168.1.0/24, Marketing 192.168.2.0/24, R&amp;D 172.16.5.0/24 ให้ AR1 เป็น DHCP server แจก address ให้ทั้งสามแผนก</p>
<figure><img src="i/p364_1.webp" alt="Topology DHCP: AR1 ต่อสาม VLAN ของ Sales, Marketing, R&amp;D" loading="lazy"><figcaption>Fig. 11.4 DHCP network topology: AR1 เป็น DHCP server ให้ 3 แผนก</figcaption></figure>
<h4>สร้าง pool ของ Sales</h4>
<pre><code>[AR1]dhcp enable                                   # เปิด DHCP ทั้งอุปกรณ์
[AR1]ip pool vlan1                                 # ชื่อ pool ตั้งตามใจ
[AR1-ip-pool-vlan1]network 192.168.1.0 mask 24     # segment ของ pool
[AR1-ip-pool-vlan1]gateway-list 192.168.1.1        # gateway
[AR1-ip-pool-vlan1]dns-list 8.8.8.8
[AR1-ip-pool-vlan1]dns-list 222.222.222.222        # DNS ตัวที่ 2
[AR1-ip-pool-vlan1]lease day 0 hour 8 minute 0     # lease 8 ชั่วโมง
[AR1-ip-pool-vlan1]excluded-ip-address 192.168.1.1 192.168.1.10
Error: The gateway cannot be excluded.             # gateway exclude ไม่ได้
[AR1-ip-pool-vlan1]excluded-ip-address 192.168.1.2 192.168.1.10
[AR1-ip-pool-vlan1]excluded-ip-address 192.168.1.50 192.168.1.60
[AR1]interface Vlanif 1
[AR1-Vlanif1]dhcp select global                    # ใช้ global pool</code></pre>
<ul>
<li><b>1 network segment สร้าง pool ได้ 1 pool</b></li>
<li>address ที่ถูกใช้งานแล้ว (เช่น server, printer) ต้อง <b>exclude</b> ออกจาก pool เพื่อไม่ให้แจกซ้ำ</li>
<li><b>gateway ต้องไม่ถูก exclude</b> (ระบบจะแจ้ง error)</li>
<li>เลือก lease ให้เหมาะกับสภาพ: เครื่องเปลี่ยนบ่อย (ห้องเรียนที่ย้ายทุก 2 ชั่วโมง) ใช้ lease <b>สั้น</b>; เครื่องคงที่ใช้ lease <b>ยาว</b></li>
</ul>
<h4>pool ของ Marketing และคำสั่งตรวจสอบ</h4>
<pre><code>[AR1]ip pool vlan2
[AR1-ip-pool-vlan2]network 192.168.2.0 mask 24
[AR1-ip-pool-vlan2]gateway-list 192.168.2.1
[AR1-ip-pool-vlan2]dns-list 114.114.114.114
[AR1-ip-pool-vlan2]lease day 0 hour 2 minute 0
[AR1]interface Vlanif 2
[AR1-Vlanif2]dhcp select global

&lt;AR1&gt;display ip pool                    # สรุป pool และสถิติ address
&lt;AR1&gt;display ip pool name vlan1 used    # ตาราง IP, MAC, lease ที่แจกไปแล้ว</code></pre>
<p>ใน <code>display ip pool name vlan1 used</code> จะเห็น Total <b>253</b> (254 address ที่ใช้ได้ลบ gateway 1 ตัว), Used 2, Idle 231, <b>Disable 20</b> (excluded 2-10 = 9 ตัว และ 50-60 = 11 ตัว) และแต่ละ lease แสดง IP คู่กับ MAC ของ client เช่น 192.168.1.253 ↔ 5489-9851-4a95</p>
<figure><img src="i/p367_1.webp" alt="Packet capture เห็น DHCP Discover, Offer, Request, ACK" loading="lazy"><figcaption>Fig. 11.5 The working process of DHCP protocol: capture บน Windows 10 (โหมดอัตโนมัติ) เห็นสี่ packet DORA</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>ขั้นตอน: <b>dhcp enable</b> → <b>ip pool</b> (network/gateway-list/dns-list/lease/excluded) → <b>dhcp select global</b> ที่ interface</li>
<li>excluded-ip-address = กันไม่ให้แจก; gateway exclude ไม่ได้</li>
<li><b>display ip pool</b> / <b>display ip pool name X used</b> ดูสถานะ</li>
</ul></div>`
    },
    {
      t: "11.4 Interface Address Pool",
      ref: "หน้า 367-369",
      html: `
<p>ถ้า router แจก address ให้ <b>segment ที่ต่อตรง</b> กับ interface ของมันเอง ไม่ต้องสร้าง pool เอง เพราะ interface มี IP และ mask อยู่แล้ว จึงใช้ segment ของ interface เป็น pool ได้เลย ด้วย <code>dhcp select interface</code></p>
<figure><img src="i/p368_1.webp" alt="AR1 ต่อสอง segment 192.168.1.0/24 และ 192.168.2.0/24 ผ่าน GE0/0/0 และ GE0/0/1" loading="lazy"><figcaption>Fig. 11.6 Topology for assigning addresses to directly connected segments using interface address pools</figcaption></figure>
<pre><code>[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]ip address 192.168.1.1 24
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]ip address 192.168.2.1 24

[AR1]dhcp enable
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]dhcp select interface
[AR1-GigabitEthernet0/0/0]dhcp server dns-list 114.114.114.114
[AR1-GigabitEthernet0/0/0]dhcp server excluded-ip-address 192.168.1.2 192.168.1.20

[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]dhcp select interface
[AR1-GigabitEthernet0/0/1]dhcp server dns-list 8.8.8.8
[AR1-GigabitEthernet0/0/1]dhcp server lease day 0 hour 4 minute 0</code></pre>
<table>
<tr><th>เรื่อง</th><th>Global address pool</th><th>Interface address pool</th></tr>
<tr><td>การสร้าง pool</td><td>สร้างเองด้วย <code>ip pool</code></td><td>ไม่ต้อง ใช้ segment ของ interface</td></tr>
<tr><td>คำสั่งที่ interface</td><td><code>dhcp select global</code></td><td><code>dhcp select interface</code></td></tr>
<tr><td>พารามิเตอร์</td><td>ตั้งใน ip-pool view (dns-list, lease, ...)</td><td>ตั้งด้วย <code>dhcp server ...</code> ที่ interface</td></tr>
<tr><td>เหมาะกับ</td><td>segment ที่ router เป็น gateway และ segment ที่เข้ามาผ่าน relay</td><td>segment ที่ต่อตรงกับ interface</td></tr>
</table>
<div class="note"><b>ลำดับความสำคัญ</b>: ตามเฉลยแบบฝึกหัดของตำรา interface address pool มี priority สูงกว่า global address pool</div>
<div class="must"><b>ต้องจำ</b>: interface pool ใช้ <b>dhcp select interface</b> และตั้งพารามิเตอร์ด้วย <b>dhcp server ...</b> (dns-list, lease, excluded-ip-address) ที่ interface</div>`
    },
    {
      t: "11.5 DHCP Relay",
      ref: "หน้า 369-371",
      html: `
<h4>ทำไมต้องมี Relay</h4>
<p>Router ไม่ forward <b>broadcast</b> ดังนั้น ถ้า DHCP server ไม่ได้อยู่ใน segment เดียวกับ client ข้อความ DHCP Discover จะไปไม่ถึง server <b>DHCP relay</b> ช่วยให้ server เดียวแจก address ให้หลาย segment ที่ไม่ได้ต่อตรงได้</p>
<figure><img src="i/p369_1.webp" alt="AR2 ทำ DHCP relay ส่ง unicast จาก Vlanif1 ไปหา DHCP server AR1" loading="lazy"><figcaption>Fig. 11.7 DHCP relay illustration: AR2 (relay) แปลง Discover ที่เป็น broadcast จาก R&amp;D ให้เป็น unicast ไปหา AR1 (DHCP server)</figcaption></figure>
<h4>หลักการ</h4>
<ol>
<li>client เริ่มต้นแล้วส่ง DHCP Discover ใน LAN</li>
<li>ถ้ามี DHCP server ใน LAN ก็ทำงานได้ตรง ๆ ไม่ต้อง relay</li>
<li>ถ้าไม่มี อุปกรณ์ที่เปิด relay ใน LAN นั้นจะรับ broadcast แล้ว <b>forward เป็น unicast</b> ไปยัง DHCP server ที่ระบุ โดย <b>destination = IP ของ server</b>, <b>source = IP ของ interface relay</b> (Vlanif 1 ของ AR2) ซึ่งทำให้ server รู้ว่าคำขอมาจาก segment ไหน</li>
<li>server ตอบด้วย config ผ่าน relay กลับไปยัง client</li>
</ol>
<p>relay แก้ไข field ใน DHCP message เปลี่ยน broadcast เป็น unicast และแปลงข้อความระหว่าง server กับ client</p>
<h4>ตัวอย่าง config</h4>
<p>R&amp;D (172.16.5.0/24) ไม่ได้ต่อตรงกับ AR1 (DHCP server, 10.2.2.1) ให้ AR2 เปิด relay ที่ Vlanif 1 (172.16.5.1) ซึ่งจะส่ง Discover แบบ directed ที่ source 172.16.5.1 destination 10.2.2.1 AR1 จึงรู้ว่ามาจาก 172.16.5.0/24 และเลือก address จาก pool remoteNet</p>
<pre><code># AR1 (DHCP server)
[AR1]ip pool remoteNet
[AR1-ip-pool-remoteNet]network 172.16.5.0 mask 24
[AR1-ip-pool-remoteNet]gateway-list 172.16.5.1      # remote segment ต้องมี gateway
[AR1-ip-pool-remoteNet]dns-list 8.8.8.8
[AR1-ip-pool-remoteNet]lease day 0 hour 2 minute 0
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]dhcp select global

# AR2 (DHCP relay)
[AR2]dhcp enable
[AR2]interface Vlanif 1
[AR2-Vlanif1]dhcp select relay
[AR2-Vlanif1]dhcp relay server-ip 10.2.2.1</code></pre>
<p>ตรวจสอบด้วย <code>ipconfig</code> บน PC5 ถ้าไม่สำเร็จให้เช็ก routing table ของ AR1 และ AR2 ให้ network สื่อสารถึงกัน (route กลับไป 172.16.5.0/24 จาก AR1 ต้องมี)</p>
<div class="warn"><b>ระวัง</b>: relay ต้อง config ที่ interface ฝั่ง client (ที่ gateway ของ segment นั้น) ไม่ใช่ฝั่ง server และ pool บน server ต้อง match กับ <b>network ของ source IP ของ interface relay</b> ถ้าไม่ match server จะไม่รู้ว่าจะแจก pool ไหน</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>Relay: <b>dhcp select relay</b> + <b>dhcp relay server-ip X</b> ที่ interface ฝั่ง client</li>
<li>Discover (broadcast) → ถูกเปลี่ยนเป็น unicast ไปหา server</li>
<li>Pool ของ remote segment ต้อง set <b>gateway-list</b></li>
<li>Router ไม่ส่งต่อ broadcast จึงต้องใช้ relay</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `นักศึกษาเสียบสาย LAN ในห้อง 204 (10.7.204.0/24) ด้วยโน้ตบุ๊กที่ตั้งเป็น obtain IP address automatically เป็นครั้งแรก โน้ตบุ๊กยังไม่มี IP และไม่รู้ว่า DHCP server อยู่ที่ไหน`,
      q: "ข้อความแรกที่โน้ตบุ๊กส่งออกมาคือข้อใด?",
      opts: [
        { t: "DHCP Discover แบบ broadcast (src 0.0.0.0, dst 255.255.255.255)", why: "ถูก: client ไม่มี address และไม่รู้ server จึงต้อง broadcast เพื่อค้นหา" },
        { t: "DHCP Request แบบ unicast ไป DHCP server", why: "ผิด: ยังไม่รู้ว่า server คือใคร และ Request ใช้หลังได้ Offer แล้ว (ยกเว้นต่ออายุ)" },
        { t: "DHCP Offer แบบ broadcast", why: "ผิด: Offer ส่งโดย server" },
        { t: "DHCP ACK ไปยัง gateway", why: "ผิด: ACK ส่งโดย server เมื่อยืนยัน lease" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ใน segment เดียวมี DHCP server 2 ตัว (S1 และ S2) client ส่ง Discover แล้วได้ Offer จากทั้งสองตัว client เลือก Offer ของ S1`,
      q: "client ต้องทำอะไรต่อ และ S2 จะทำอย่างไร?",
      opts: [
        { t: "broadcast DHCP Request ที่ระบุ S1; S2 เห็นแล้วถอน Offer ของตน และเก็บ address คืน pool", why: "ถูก: Request แบบ broadcast ทำให้ server อื่นรู้ว่าไม่ถูกเลือก" },
        { t: "ใช้ IP จาก Offer ของ S1 ได้ทันทีโดยไม่ต้องส่งอะไรอีก", why: "ผิด: ต้องส่ง Request และรอ ACK ก่อนใช้งาน" },
        { t: "ส่ง Discover ใหม่เพื่อตัดสินใจ", why: "ผิด: Discover ใช้หา server ตอนเริ่ม ไม่ใช่เพื่อเลือก" },
        { t: "ส่ง ACK ให้ S1", why: "ผิด: ACK ส่งโดย server ไม่ใช่ client" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `DHCP pool มี lease = 8 ชั่วโมง client ได้รับ IP ที่เวลา 08:00 และ server ปกติดี`,
      q: "client จะเริ่มส่ง Request เพื่อต่ออายุ (unicast ไป server เดิม) ครั้งแรกเมื่อใด และถ้า server เดิมไม่ตอบเลย จะ rebind (broadcast) เมื่อใด?",
      opts: [
        { t: "12:00 (50%) และ 15:00 (87.5%)", why: "ถูก: 50% ของ 8 ชม. = 4 ชม. → 12:00; 87.5% = 7 ชม. → 15:00" },
        { t: "10:00 (25%) และ 14:00 (75%)", why: "ผิด: DHCP ใช้ 50% และ 87.5% ตามตำรา" },
        { t: "16:00 (100%) และ 17:00", why: "ผิด: ต้องเริ่มต่อก่อนหมด lease ไม่ใช่รอจนหมด" },
        { t: "08:00 ทุกชั่วโมง", why: "ผิด: ไม่มีการต่อทุกชั่วโมง ใช้เวลาเป็นสัดส่วนของ lease" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ห้องเรียนหนึ่งนักศึกษาย้ายห้องทุก 2 ชั่วโมง ผู้ดูแลต้องการให้ address ถูกเรียกคืนเร็วและกลับมาใช้กับห้องอื่นได้ ขณะที่ห้องแล็บถาวรมีเครื่องคงที่`,
      q: "ควรกำหนด lease อย่างไร?",
      opts: [
        { t: "ห้องเรียนที่ย้ายบ่อยใช้ lease สั้น (เช่น 2 ชั่วโมง) ส่วนห้องแล็บเครื่องคงที่ใช้ lease ยาว", why: "ถูก: ตามหลักของตำรา เครื่องเปลี่ยนบ่อยใช้ lease สั้น เครื่องนิ่งใช้ยาว" },
        { t: "ทุกที่ใช้ lease 30 วัน", why: "ผิด: address ของนักศึกษาที่ย้ายออกจะถูกจองค้างไว้นาน" },
        { t: "ห้องเรียนใช้ lease ยาวที่สุด ห้องแล็บใช้ lease สั้น", why: "ผิด: กลับด้าน" },
        { t: "ไม่ต้องกำหนด lease เพราะ DHCP ไม่มี lease", why: "ผิด: lease period เป็นข้อดีหลักของ DHCP" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Pool vlan1 บน AR1: network 192.168.1.0/24, gateway 192.168.1.1, excluded 192.168.1.2 - 192.168.1.10 และ 192.168.1.50 - 192.168.1.60 ตั้งตามตัวอย่างในตำรา`,
      q: "address ที่ DHCP แจกให้ client ได้จริงมีกี่ตัว (ไม่นับที่ถูกใช้ไปแล้ว)?",
      opts: [
        { t: "233", why: "ถูก: ใช้ได้ 254 ตัว (.1 - .254) ลบ gateway 1 ตัว ลบ exclude 9 + 11 = 20 ตัว ได้ 254 - 1 - 20 = 233" },
        { t: "254", why: "ผิด: ยังไม่ได้หัก gateway และ excluded" },
        { t: "253", why: "ผิด: หัก gateway อย่างเดียว ยังไม่หัก excluded 20 ตัว" },
        { t: "234", why: "ผิด: นับ exclude 2 - 10 และ 50 - 60 ผิด (9 และ 11 ไม่ใช่ 8 และ 11)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลพิมพ์ <code>excluded-ip-address 192.168.1.1 192.168.1.10</code> ใน pool ที่ gateway-list คือ 192.168.1.1 แล้วพบข้อความ error`,
      q: "ข้อความ error และวิธีแก้ที่ถูกต้องคืออะไร?",
      opts: [
        { t: "gateway ห้ามถูก exclude; แก้เป็น exclude 192.168.1.2 - 192.168.1.10", why: "ถูก: ตามตัวอย่างในตำรา ระบบแจ้ง Error: The gateway cannot be excluded" },
        { t: "ช่วง exclude ต้องมีขนาดอย่างน้อย 20 address", why: "ผิด: ไม่มีข้อกำหนดนี้" },
        { t: "ต้องปิด dhcp enable ก่อน", why: "ผิด: ไม่เกี่ยวกัน" },
        { t: "ต้องเปลี่ยน gateway-list เป็น 192.168.1.0", why: "ผิด: .0 เป็น network address ใช้เป็น gateway ไม่ได้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AR1 (DHCP server 10.2.2.1) ต้องแจก address ให้ PC5 ใน R&D (172.16.5.0/24) ซึ่งต่อกับ AR2 ที่ interface Vlanif 1 (172.16.5.1) ไม่ได้ต่อตรงกับ AR1 pool remoteNet ถูกสร้างแล้ว แต่ PC5 ไม่ได้ IP`,
      q: "ขั้นตอนที่ขาดอยู่และต้องตั้งบน AR2 คือข้อใด?",
      opts: [
        { t: "dhcp enable; ที่ Vlanif 1: dhcp select relay และ dhcp relay server-ip 10.2.2.1", why: "ถูก: relay ต้องเปิดที่ interface ฝั่ง client และระบุ IP ของ server" },
        { t: "ที่ Vlanif 1: dhcp select global", why: "ผิด: ใช้เมื่อ router เป็น server เอง ไม่ใช่ relay" },
        { t: "สร้าง ip pool remoteNet บน AR2 อีกชุด", why: "ผิด: AR2 ไม่ต้องมี pool ในกรณี relay" },
        { t: "ที่ Vlanif 1: dhcp relay server-ip 172.16.5.1", why: "ผิด: ต้องระบุ IP ของ DHCP server (10.2.2.1) และต้องเปิด select relay ก่อน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการให้ PC2 ใน 192.168.3.0/24 ซึ่งต่อกับ RB ที่ interface GE 0/0/0 ได้ address จาก RA (DHCP server 192.168.2.1) ซึ่งมี pool ของ 192.168.3.0/24 อยู่แล้ว`,
      q: "บน RB ต้อง config อย่างไร?",
      opts: [
        { t: "dhcp enable; interface GE 0/0/0: dhcp select relay; dhcp relay server-ip 192.168.2.1", why: "ถูก: เปิดใช้ DHCP และ relay ที่ interface ที่ต่อกับ PC2 ชี้ไปที่ IP ของ server" },
        { t: "dhcp enable; interface GE 0/0/0: dhcp select global", why: "ผิด: RB ไม่มี pool ของตนเอง ต้อง relay" },
        { t: "ไม่ต้อง dhcp enable แค่ใส่ relay server-ip ก็พอ", why: "ผิด: ต้องเปิด DHCP ทั้งอุปกรณ์ก่อน" },
        { t: "ตั้ง relay ที่ interface อีกฝั่ง (ฝั่งที่ต่อไปหา RA)", why: "ผิด: relay ต้องอยู่ที่ interface ที่รับ broadcast จาก client" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `หลังติดตั้ง DHCP server ผู้ดูแลพบว่าเครื่อง PC-X มี IP เป็น 169.254.12.7 ทั้งที่ pool กำหนดเป็น 192.168.1.0/24`,
      q: "สาเหตุที่เป็นไปได้มากที่สุดคือข้อใด?",
      opts: [
        { t: "PC-X ติดต่อ DHCP server ไม่ได้ (สายหลวม, VLAN ผิด, server ล่ม) ระบบจึงสร้าง address 169.254.0.0/16 เอง", why: "ถูก: ตามข้อสอบของตำรา address ในช่วง 169.254.0.0 เกิดจาก client สร้างเองเมื่อติดต่อ server ไม่ได้" },
        { t: "DHCP server แจก 169.254.x.x ให้เพราะ pool กำหนดผิด", why: "ผิด: ช่วงนี้ client generate เอง" },
        { t: "เป็นช่วง private ที่ NAT กำหนด", why: "ผิด: ไม่เกี่ยวกับ NAT" },
        { t: "เป็น address 127.254.0.0 ที่ loopback สร้าง", why: "ผิด: ช่วงนั้นไม่ใช่ link-local; 169.254.0.0/16 ถึงจะถูก" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลกำลังชั่งใจระหว่างแจก IP แบบ static กับ DHCP ในองค์กรที่มีทั้ง server, desktop ประจำที่ และ laptop ที่พนักงานพกไปมา รวมทั้ง Wi-Fi สำหรับแขก`,
      q: "เลือกทุกข้อที่เหมาะสม",
      opts: [
        { t: "Web server, DNS server และ file server ควรใช้ static address", ok: true, why: "ถูก: ผู้ใช้เข้าถึงด้วย IP คงที่" },
        { t: "laptop ของพนักงานที่ย้ายระหว่างห้องควรใช้ DHCP", ok: true, why: "ถูก: ลดงานแก้ IP เมื่อย้าย segment และไม่ชน address" },
        { t: "Wi-Fi สำหรับแขกควรให้แขกตั้ง IP เอง", ok: false, why: "ผิด: ควรใช้ DHCP เพราะการต่อ Wi-Fi ควรใช้ได้ทันทีโดยไม่ต้องตั้งค่า" },
        { t: "desktop ในห้องแล็บที่ตำแหน่งคงที่ ใช้ static ได้", ok: true, why: "ถูก: ตำราระบุว่าเครื่องที่ไม่เปลี่ยนตำแหน่งใช้ static ได้" },
        { t: "DHCP ช่วยลดโอกาส address ชนกัน", ok: true, why: "ถูก: server บันทึกการใช้ address ทั้งหมด" }
      ]
    },
    {
      type: "multi",
      story: `client ได้ IP จาก DHCP server เมื่อ 09:00 โดย lease = 10 ชั่วโมง`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับ lease renewal",
      opts: [
        { t: "ที่ 14:00 client ส่ง Request ไปยัง server เดิมโดยตรง (unicast) เพื่อต่ออายุ", ok: true, why: "ถูก: 50% ของ 10 ชม. = 5 ชม." },
        { t: "ถ้า server เดิมไม่ตอบ ที่ 17:45 client broadcast Request (rebinding)", ok: true, why: "ถูก: 87.5% ของ 10 ชม. = 8.75 ชม. = 17:45" },
        { t: "ถ้าหมด lease ที่ 19:00 โดยยังไม่ได้ต่อ client ต้องหยุดใช้ IP และเริ่ม DORA ใหม่", ok: true, why: "ถูก: ต้องหยุดทันทีและขอ address ใหม่" },
        { t: "สั่ง ipconfig /renew บน client เพื่อต่ออายุเองได้ทันที", ok: true, why: "ถูก: เป็นวิธี manual renewal" },
        { t: "client ต้องรอจนครบ 100% ของ lease ก่อนจึงจะเริ่มต่อได้", ok: false, why: "ผิด: เริ่มที่ 50%" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแล config DHCP บน Huawei router ด้วย global pool: <code>ip pool vlan1</code>, <code>network 192.168.1.0 mask 24</code>, <code>gateway-list 192.168.1.1</code> และบน Vlanif 1 สั่ง <code>dhcp select global</code>`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ต้องสั่ง dhcp enable ก่อนจึงจะใช้ DHCP service ได้", ok: true, why: "ถูก: เปิดบริการ DHCP ทั้งระบบ" },
        { t: "ถ้าเปลี่ยนเป็น interface pool จะใช้คำสั่ง dhcp select interface แทน", ok: true, why: "ถูก: ใช้ segment ของ interface ไม่ต้องสร้าง ip pool" },
        { t: "segment เดียวสร้าง pool ได้หลาย pool เพื่อกระจายภาระ", ok: false, why: "ผิด: ตำราระบุว่า network segment หนึ่งสร้างได้เพียง 1 pool" },
        { t: "ถ้า client ใน Vlan1 ต้องใช้ DNS ต้องใส่ dns-list ใน pool", ok: true, why: "ถูก: dns-list เป็นพารามิเตอร์ที่แจกให้ client" },
        { t: "ใช้ display ip pool name vlan1 used ดู IP ที่แจกไปแล้วพร้อม MAC ได้", ok: true, why: "ถูก: แสดง IP, MAC, lease และสถานะ" }
      ]
    },
    {
      type: "blank",
      story: `อธิบายลำดับข้อความ DHCP ครั้งแรกของ client`,
      text: `client ส่ง {1} แบบ broadcast ด้วย source IP {2} จากนั้น server ตอบ {3} เสนอ address และ client ส่ง Request เพื่อเลือก ก่อนที่ server จะยืนยันด้วย ACK`,
      blanks: [
        { opts: ["DHCP Discover", "DHCP Offer", "DHCP ACK", "DHCP Release"], ans: 0, why: "ข้อความแรกคือ Discover เพื่อค้นหา server" },
        { opts: ["0.0.0.0", "255.255.255.255", "127.0.0.1", "169.254.0.0"], ans: 0, why: "client ยังไม่มี IP จึงใช้ 0.0.0.0 (destination คือ 255.255.255.255)" },
        { opts: ["DHCP Offer", "DHCP Discover", "DHCP Request", "DHCP Release"], ans: 0, why: "server ตอบ Discover ด้วย Offer" }
      ]
    },
    {
      type: "blank",
      story: `สร้าง DHCP pool ตามแผนก`,
      text: `ขั้นแรกสั่ง <code>{1}</code> เพื่อเปิดบริการ DHCP จากนั้นสร้าง <code>ip pool</code> ระบุ segment ด้วย <code>network 192.168.2.0 mask 24</code> ตั้ง gateway ด้วย <code>{2} 192.168.2.1</code> และให้ interface ใช้ pool นี้ด้วย <code>dhcp select {3}</code>`,
      blanks: [
        { opts: ["dhcp enable", "dhcp select global", "ip pool enable", "dhcp server on"], ans: 0, why: "dhcp enable คือการเปิด DHCP ทั้งอุปกรณ์" },
        { opts: ["gateway-list", "gateway", "default-router", "dns-list"], ans: 0, why: "ใน ip pool ของ Huawei ใช้ gateway-list" },
        { opts: ["global", "relay", "client", "static"], ans: 0, why: "pool ที่สร้างเองด้วย ip pool คือ global pool" }
      ]
    },
    {
      type: "blank",
      story: `เปรียบเทียบการต่ออายุ lease`,
      text: `client ต่ออายุที่ {1} ของ lease โดยส่ง Request แบบ {2} ไปยัง server เดิม แต่ถ้าไม่สำเร็จจะ rebind ที่ {3} ของ lease โดย broadcast`,
      blanks: [
        { opts: ["50%", "25%", "75%", "100%"], ans: 0, why: "เริ่มต่อเมื่อผ่านไปครึ่งหนึ่งของ lease" },
        { opts: ["unicast", "broadcast", "multicast", "anycast"], ans: 0, why: "ต่ออายุแรกส่งตรงไป server เดิม" },
        { opts: ["87.5%", "50%", "62.5%", "100%"], ans: 0, why: "rebinding ที่ 87.5%" }
      ]
    },
    {
      type: "match",
      q: "จับคู่คำสั่ง/ค่ากับความหมาย",
      pairs: [
        ["dhcp select interface", "ใช้ segment ของ interface เป็น pool โดยไม่ต้องสร้าง ip pool"],
        ["dhcp select relay", "ให้ interface เป็นตัวส่งต่อ Discover แบบ unicast ไปหา server"],
        ["excluded-ip-address", "กัน address ช่วงหนึ่งไม่ให้ DHCP แจก"],
        ["ipconfig /renew", "สั่ง client ต่ออายุ lease ทันที"],
        ["169.254.0.0/16", "address ที่ client สร้างเองเมื่อติดต่อ DHCP server ไม่ได้"]
      ],
      why: "แต่ละรายการเป็นคำสั่งหรือค่าที่ใช้งานจริงในบทนี้"
    },
    {
      type: "match",
      q: "จับคู่เหตุการณ์กับการตอบสนองของ client",
      pairs: [
        ["ย้ายไป network segment อื่น", "ต้องขอ IP ใหม่ด้วย DORA"],
        ["ผ่านไป 50% ของ lease", "ส่ง Request unicast ไป server เดิมเพื่อต่ออายุ"],
        ["ผ่านไป 87.5% ของ lease และ server เดิมไม่ตอบ", "broadcast Request ให้ server ใดก็ได้ตอบ (rebinding)"],
        ["lease หมดโดยยังต่อไม่ได้", "หยุดใช้ IP ทันทีแล้วเริ่มขอใหม่ตั้งแต่ Discover"]
      ],
      why: "เป็นไปตามกลไก lease และ renewal ของ DHCP"
    }
  ]
});
