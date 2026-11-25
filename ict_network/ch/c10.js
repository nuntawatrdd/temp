IOT.reg({
  id: "c10",
  title: "Network Address Translation (NAT)",
  th: "Public/Private address, NAT 5 แบบ (Static, Dynamic, NAPT, Easy IP, NAT Server) และการ config บน Huawei router",
  summary: `
<ul>
<li><b>ปัญหา</b>: IPv4 public address ไม่พอ → องค์กรใช้ <b>private address</b> ภายใน และใช้ <b>NAT</b> แปลงเป็น public เมื่อออก Internet; NAT ทำงานบน <b>border router</b></li>
<li><b>Private range</b>: Class A <b>10.0.0.0/8</b>, Class B <b>172.16.0.0 - 172.31.255.255</b> (172.16.0.0/12), Class C <b>192.168.0.0/16</b>; router บน Internet ไม่มี route ไปยัง private address</li>
<li><b>ข้อดี</b>: ประหยัด public IP (NAPT), เปลี่ยน ISP ได้โดยไม่ต้องเปลี่ยน IP ภายใน, ซ่อน intranet จาก Internet (ปลอดภัยขึ้น)</li>
<li><b>ข้อเสีย</b>: router ต้องแก้ L3 + L4 header และเก็บ mapping table (delay เพิ่ม, กิน resource), ติดตาม end-to-end ไม่ได้, ภายนอกเข้าหาเครื่อง private ไม่ได้ถ้าไม่ทำ port mapping, บางแอป (เช่น IPSec) ใช้ไม่ได้</li>
<li><b>Static NAT</b>: map <b>1:1</b> คงที่, ไม่ประหยัด public IP, รองรับ <b>2 ทิศทาง</b> (ภายนอกเข้าหา intranet ได้)</li>
<li><b>Dynamic NAT</b>: ใช้ <b>address pool</b> + ACL, ได้ address ชั่วคราวตามใครมาก่อน, ยัง 1:1 ขณะใช้งาน, ภายนอกเริ่มติดต่อเข้ามาไม่ได้; ถ้า pool หมด host ที่เหลือออกไม่ได้</li>
<li><b>NAPT</b>: แปล <b>IP + port</b>, many-to-one/few ประหยัด public IP สูงสุด; router เก็บตาราง (private IP:port ↔ public IP:port), ภายนอกเริ่มเข้ามาไม่ได้</li>
<li><b>Easy IP</b>: เหมือน NAPT แต่ <b>ไม่มี pool</b> ใช้ IP ของ <b>outbound interface</b> (เหมาะกับ interface ที่ได้ IP จาก DHCP/PPPoE)</li>
<li><b>NAT Server</b>: map <b>[public IP:port] ↔ [private IP:port]</b> แบบ static ให้ภายนอกเข้าถึง server ใน intranet (เช่น HTTP 80, RDP 3389)</li>
</ul>
<table>
<tr><th>ชนิด</th><th>การ map</th><th>แปล port?</th><th>ประหยัด public IP?</th><th>ภายนอกเริ่มเข้ามาได้?</th></tr>
<tr><td>Static NAT</td><td>1 private : 1 public (ถาวร)</td><td>ไม่</td><td>ไม่</td><td>ได้</td></tr>
<tr><td>Dynamic NAT (no-pat)</td><td>1:1 ชั่วคราวจาก pool</td><td>ไม่</td><td>ไม่</td><td>ไม่ได้</td></tr>
<tr><td>NAPT</td><td>many : pool</td><td>ใช่</td><td>ใช่</td><td>ไม่ได้</td></tr>
<tr><td>Easy IP</td><td>many : 1 (IP ของ interface)</td><td>ใช่</td><td>ใช่ (มากสุด)</td><td>ไม่ได้</td></tr>
<tr><td>NAT Server</td><td>[IP:port] : [IP:port] static</td><td>ใช่ (กำหนดเอง)</td><td>-</td><td>ได้ (เฉพาะ port ที่ map)</td></tr>
</table>
<pre><code>nat static global 12.2.2.2 inside 192.168.0.2        # Static NAT
nat address-group 1 12.2.2.2 12.2.2.3                # pool
acl 2000 / rule 5 permit source 192.168.0.0 0.0.0.255
nat outbound 2000 address-group 1 [no-pat]           # NAPT (มี no-pat = Dynamic NAT)
nat outbound 2000                                    # Easy IP
nat server protocol tcp global 12.2.2.8 www inside 192.168.0.2 www</code></pre>`,
  sections: [
    {
      t: "10.1 Public Address และ Private Address",
      ref: "หน้า 342-344",
      html: `
<h4>ทำไมต้องมี NAT</h4>
<p>จำนวน IPv4 public address ไม่เพียงพอและกระจายไม่สม่ำเสมอ องค์กรจึงใช้ <b>private address</b> ใน intranet แล้วใช้ <b>NAT (Network Address Translation)</b> ให้เครื่องเหล่านั้นออก Internet ได้ NAT ช่วยทั้งบรรเทาปัญหา address ไม่พอ และทำให้ภายนอกเข้ามาหาเครื่องที่ใช้ private address โดยตรงไม่ได้ (เพิ่มความปลอดภัย)</p>
<h4>Public vs Private</h4>
<ul>
<li><b>Public address</b>: address ที่วางแผนทั่วโลก ห้ามซ้ำกัน; router บน Internet forward packet ที่ปลายทางเป็น public ได้</li>
<li><b>Private address</b>: ใช้ได้เฉพาะภายใน intranet ห้ามปรากฏบน Internet; router บน Internet <b>ไม่มี route</b> ไปหา private address</li>
</ul>
<table>
<tr><th>Class</th><th>ช่วง private</th><th>CIDR</th><th>เหมาะกับ</th></tr>
<tr><td>A</td><td>10.0.0.0 - 10.255.255.255</td><td>10.0.0.0/8</td><td>องค์กรใหญ่</td></tr>
<tr><td>B</td><td>172.16.0.0 - 172.31.255.255</td><td>172.16.0.0/12</td><td>องค์กรกลาง-ใหญ่</td></tr>
<tr><td>C</td><td>192.168.0.0 - 192.168.255.255</td><td>192.168.0.0/16</td><td>บ้าน / องค์กรเล็ก</td></tr>
</table>
<figure><img src="i/p343_1.webp" alt="School A และ B ใช้ 10.0.0.0/8 ซ้ำกัน, School C ใช้ 192.168.1.0/24 ผ่าน NAT ไปยัง Internet" loading="lazy"><figcaption>Fig. 10.1 Private addresses: แต่ละโรงเรียนใช้ private address ของตนเองได้ แม้ซ้ำกัน (A และ B ใช้ 10.0.0.0/8) ตราบใดที่ไม่ต้องติดต่อกันโดยตรง</figcaption></figure>
<div class="note"><b>จุดสังเกต</b>: ถ้า School A และ B ต้องเชื่อมต่อถึงกันในอนาคต จะใช้ address ซ้ำกันไม่ได้ ต้อง renumber ใหม่ (นี่คือเหตุผลที่ NAT ไม่ใช่ทางแก้ของการ merge เครือข่าย)</div>
<h4>ข้อดีของ NAT</h4>
<ul>
<li>ใช้ NAPT ทำให้ทั้ง private network ใช้ public address ไม่กี่ตัว ประหยัด public IP</li>
<li>เปลี่ยน ISP แล้วไม่ต้องเปลี่ยน IP ภายใน เพราะแก้เฉพาะ public address ที่ NAT</li>
<li>เครือข่าย private ถูกซ่อน เข้าถึงจาก Internet โดยตรงไม่ได้ จึงปลอดภัยขึ้น</li>
</ul>
<h4>ข้อเสียของ NAT</h4>
<ul>
<li>router ต้องแก้ทั้ง network layer และ transport layer ของ packet และต้องเก็บตารางแปลง port → <b>delay สูงกว่า routing ธรรมดา</b> และใช้ resource มากขึ้น</li>
<li>source address ถูกแทนด้วย public address จึง <b>ติดตาม end-to-end ไม่ได้</b> (forum เห็นแค่ IP ของโรงเรียน ไม่รู้ว่าเครื่องไหน)</li>
<li>ภายนอกเข้ามาหาเครื่อง private ไม่ได้ ต้องทำ <b>port mapping</b> ถ้าต้องการ</li>
<li>บางแอปรันไม่ได้ เช่น <b>IPSec</b> ที่ไม่อนุญาตให้อุปกรณ์กลางแก้ไข packet</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Private: <b>10/8, 172.16-172.31, 192.168/16</b></li>
<li>NAT อยู่บน border router ที่ต่อกับ Internet</li>
<li>ข้อดี 3 ข้อ (ประหยัด IP, เปลี่ยน ISP ง่าย, ปลอดภัย) และข้อเสีย 4 ข้อ (delay/resource, trace ไม่ได้, ภายนอกเข้าไม่ได้, IPSec)</li>
</ul></div>`
    },
    {
      t: "10.2 ชนิดของ NAT: Static, Dynamic, NAPT, Easy IP",
      ref: "หน้า 344-348",
      html: `
<p>NAT แบ่งเป็น 5 แบบ: <b>Static NAT, Dynamic NAT, NAPT, Easy IP, NAT Server</b> ในหัวข้อนี้ 4 แบบแรกใช้เมื่อ intranet <b>เริ่ม</b>ติดต่อออกไปภายนอก ส่วน NAT Server (หัวข้อ 10.5) ใช้เมื่อภายนอกต้องเข้ามาหา server ใน intranet</p>
<h4>1) Static NAT</h4>
<p>config บน router ที่ต่อ private กับ public แต่ละ private address มี public address <b>คู่กันตายตัว</b> (one-to-one) จึง <b>ไม่ประหยัด public IP</b> แต่รองรับ <b>การเข้าถึงสองทิศทาง</b>: ขาออกแปล source, ขาเข้าแปล destination กลับเป็น private</p>
<figure><img src="i/p345_1.webp" alt="Static NAT: PC1 192.168.1.2 ถูกแปลเป็น 12.2.2.2 และ PC2 เป็น 12.2.2.3, PC3 ไม่มี mapping" loading="lazy"><figcaption>Fig. 10.2 Static NAT illustration: R1 map 192.168.1.2 ↔ 12.2.2.2 และ 192.168.1.3 ↔ 12.2.2.3; PC3 (192.168.1.4) ไม่มี mapping จึงออก Internet ไม่ได้</figcaption></figure>
<ul>
<li>ขาออก PC1 → Web server: source 192.168.1.2 ถูกแทนเป็น 12.2.2.2 (destination ไม่เปลี่ยน)</li>
<li>ขาเข้า Web server → 12.2.2.2: destination ถูกแปลกลับเป็น 192.168.1.2</li>
<li>คอมพิวเตอร์บน Internet เข้าถึง PC1 ได้โดยใช้ 12.2.2.2</li>
</ul>
<h4>2) Dynamic NAT</h4>
<p>Static NAT เปลือง address เพราะ public IP ถูกจองไว้แม้เครื่องปิดอยู่ Dynamic NAT จึงใช้ <b>address pool</b> (กลุ่ม public address ที่ใช้ได้) เมื่อ host ภายในจะออก Internet router เลือก address ที่ยังว่างจาก pool มาให้ชั่วคราวและ mark เป็น "In Use" เมื่อเลิกใช้จะคืนเป็น "Not Use"</p>
<ul>
<li>ใช้ <b>ACL</b> กำหนดว่า private address ไหนมีสิทธิ์ถูกแปล และ <b>ไม่</b>ระบุว่า private ตัวไหนจะได้ public ตัวไหน</li>
<li>อนุญาตเฉพาะ intranet <b>เริ่ม</b>ติดต่อ Internet; ภายนอกเข้ามาเองไม่ได้ (ต่างจาก Static NAT)</li>
</ul>
<figure><img src="i/p346_1.webp" alt="Dynamic NAT: 4 PC ใน intranet แต่ pool มี 3 address, PC4 ออกไม่ได้" loading="lazy"><figcaption>Fig. 10.3 Dynamic NAT: intranet 4 เครื่อง แต่ pool มี public address 3 ตัว จึงออกพร้อมกันได้แค่ 3 เครื่อง (ใครออนไลน์ก่อนได้ก่อน) PC4 ไม่มี address ว่างจึงออกไม่ได้</figcaption></figure>
<h4>3) NAPT (Network Address and Port Translation)</h4>
<p>Dynamic NAT ยังเป็น 1:1 ขณะใช้งาน จึงไม่เพิ่มประสิทธิภาพการใช้ public IP NAPT แปลทั้ง <b>IP address และ port</b> ทำให้ public address หนึ่งตัวรองรับ private หลายเครื่องพร้อมกัน (one-to-many) router เก็บ <b>ตารางแปล address-port</b> และกำหนด public port ให้ไม่ซ้ำกัน เมื่อ packet ตอบกลับมา router ดู <b>destination port</b> เพื่อตัดสินใจส่งให้เครื่องไหนใน intranet</p>
<figure><img src="i/p347_1.webp" alt="ตาราง NAPT: private IP:port ถูกแปลเป็น public IP กับ public port ต่างกัน" loading="lazy"><figcaption>Fig. 10.4 Network address port translation: หลายเครื่องแชร์ public IP เดียวกัน แต่แยกด้วย public port ที่ router กำหนด</figcaption></figure>
<table>
<tr><th>ทิศทาง</th><th>ที่ router ทำ</th></tr>
<tr><td>ขาออก (private → Internet)</td><td>แทน source IP และ source port ด้วย public IP:port แล้วบันทึกลงตาราง</td></tr>
<tr><td>ขาเข้า (ตอบกลับ)</td><td>ใช้ destination port ค้นตาราง แปลกลับเป็น private IP:port แล้วส่งต่อ</td></tr>
</table>
<p>NAPT อนุญาตเฉพาะการ <b>เริ่ม</b>ติดต่อจาก intranet; ภายนอกเริ่มเข้ามาไม่ได้ จึงทำให้ intranet "มองไม่เห็น" จาก Internet</p>
<h4>4) Easy IP</h4>
<p>หลักการเหมือน NAPT (แปลทั้ง IP และ port) แต่ <b>ไม่มี address pool</b> ใช้ IP ของ <b>outbound interface</b> เป็น public address เหมาะกับกรณีที่ไม่มี public address คงที่ เช่น egress ที่ได้ address จาก <b>DHCP</b> หรือ <b>PPPoE dial-up</b> ถ้า IP ของ interface เปลี่ยน public IP ในตารางจะเปลี่ยนตามอัตโนมัติ</p>
<figure><img src="i/p348_1.webp" alt="Easy IP: ใช้ IP ของ interface GE0/0/1 ของ R1 เป็น public address" loading="lazy"><figcaption>Fig. 10.5 Easy IP: ไม่ต้องสร้าง pool ใช้ IP ของ interface GE 0/0/1 (ตั้งเองหรือได้จาก DHCP ก็ได้) เป็น public address</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li><b>Static</b>: 1:1 ถาวร, สองทิศทาง, ไม่ประหยัด IP</li>
<li><b>Dynamic</b>: pool + ACL, 1:1 ชั่วคราว, ถ้า pool หมดเครื่องที่เหลือออกไม่ได้, address ใน pool ไม่ถูกใช้ร่วมกันพร้อมกัน</li>
<li><b>NAPT</b>: แปล port ด้วย, ประหยัด IP, ใช้ pool</li>
<li><b>Easy IP</b>: NAPT ที่ไม่มี pool ใช้ IP ของ interface</li>
<li>Dynamic, NAPT, Easy IP: ภายนอก <b>ไม่</b>สามารถเริ่ม connection เข้ามาได้</li>
</ul></div>`
    },
    {
      t: "10.3 Config Static NAT",
      ref: "หน้า 348-350",
      html: `
<p>โจทย์: intranet 192.168.0.0/24, router AR1 ต่อ ISP (AR2) ด้วย default route ไปยัง GE 0/0/0 ของ AR2 ซึ่งไม่มี route ไปยัง private network ISP ให้ public address 3 ตัว: 12.2.2.1, 12.2.2.2, 12.2.2.3 โดย <b>12.2.2.1 ใช้กับ interface GE 0/0/1 ของ AR1 แล้ว</b> จึงเหลือ 12.2.2.2 และ 12.2.2.3 สำหรับ mapping</p>
<figure><img src="i/p348_2.webp" alt="Topology: PC1-PC3 ใน 192.168.0.0/24 ต่อ AR1 ซึ่งต่อ AR2 (ISP) และ PC4 บน Internet" loading="lazy"><figcaption>Fig. 10.6 Configure static NAT: AR1 (GE 0/0/1 = 12.2.2.1) เชื่อมกับ AR2 ของ ISP และ PC4 (20.1.2.2) บน Internet</figcaption></figure>
<div class="note"><b>คิดให้ออก</b>: ก่อน config ทำไม PC ภายในถึง ping Internet ไม่ได้? ไม่ใช่เพราะ packet ขาไปไม่ถึง (AR1 มี default route) แต่เพราะ <b>packet ตอบกลับ</b>: ปลายทางคือ private address ซึ่ง AR2/Internet ไม่มี route จึงตอบกลับไม่ได้ NAT แก้ตรงนี้ด้วยการเปลี่ยน source เป็น public</div>
<h4>วิธี config 2 แบบ</h4>
<p>แบบที่ 1: config ใน interface view</p>
<pre><code>[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]nat static global 12.2.2.2 inside 192.168.0.2
[AR1-GigabitEthernet0/0/1]nat static global 12.2.2.3 inside 192.168.0.3</code></pre>
<p>แบบที่ 2: config mapping ใน system view แล้ว enable ที่ interface</p>
<pre><code>[AR1]nat static global 12.2.2.2 inside 192.168.0.2
[AR1]nat static global 12.2.2.3 inside 192.168.0.3
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]nat static enable</code></pre>
<p>ตรวจสอบด้วย <code>display nat static</code> จะเห็น Global IP (12.2.2.2), Inside IP (192.168.0.2), Netmask 255.255.255.255 ต่อหนึ่ง mapping และ Total: 2</p>
<ul>
<li>PC1 และ PC2 ping 20.1.2.2 (PC4 บน Internet) ได้</li>
<li>PC3 ping ไม่ได้ เพราะไม่มี mapping</li>
<li>PC4 เข้าถึง PC1 ผ่าน 12.2.2.2 และ PC2 ผ่าน 12.2.2.3 ได้ (สองทิศทาง)</li>
</ul>
<h4>การลบ config</h4>
<pre><code># interface view
[AR1-GigabitEthernet0/0/1]undo nat static global 12.2.2.2 inside 192.168.0.2
# system view
[AR1]undo nat static global 12.2.2.2 inside 192.168.0.2
[AR1-GigabitEthernet0/0/1]undo nat static enable</code></pre>
<div class="must"><b>ต้องจำ</b><ul>
<li>รูปแบบคำสั่ง: <b>nat static global [public] inside [private]</b></li>
<li>address ที่ถูกใช้เป็น IP ของ interface แล้ว (12.2.2.1) เอามา map static ไม่ได้</li>
<li>ตรวจสอบ: <b>display nat static</b></li>
</ul></div>`
    },
    {
      t: "10.4 Config NAPT และ Easy IP",
      ref: "หน้า 350-351",
      html: `
<h4>NAPT (ใช้ address pool)</h4>
<p>ใช้ topology เดิม (Fig. 10.6) ISP ให้ 12.2.2.1 (ใช้กับ GE 0/0/1) ส่วน 12.2.2.2 และ 12.2.2.3 นำมาทำ pool</p>
<ol>
<li>สร้าง public address pool</li>
<li>สร้าง ACL กำหนด segment ที่อนุญาตให้ออก (ใช้ <b>wildcard mask</b> ใน ACL)</li>
<li>เรียก <b>nat outbound</b> ที่ interface ขาออก</li>
</ol>
<pre><code>[AR1]nat address-group 1 12.2.2.2 12.2.2.3        # start-address end-address
[AR1]acl 2000
[AR1-acl-basic-2000]rule 5 permit source 192.168.0.0 0.0.0.255
[AR1-acl-basic-2000]rule deny
[AR1-acl-basic-2000]quit
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]nat outbound 2000 address-group 1          # NAPT
[AR1-GigabitEthernet0/0/1]nat outbound 2000 address-group 1 no-pat   # Dynamic NAT (ไม่แปล port)</code></pre>
<div class="must"><b>ต้องจำ</b>: <code>nat outbound ... address-group N</code> <b>ไม่มี</b> no-pat = <b>NAPT</b>, <b>มี</b> no-pat = <b>Dynamic NAT</b></div>
<h4>Easy IP</h4>
<p>ISP ให้ public address เพียง 12.2.2.1/24 ซึ่งอยู่ที่ interface GE 0/0/1 ของ AR1 ให้ intranet ใช้ address นี้ออก Internet</p>
<figure><img src="i/p351_1.webp" alt="Topology Easy IP: intranet 192.168.0.0/24 ต่อ AR1 (12.2.2.1) ไป AR2 และ PC4" loading="lazy"><figcaption>Fig. 10.7 Use an extranet interface address for NAPT: ใช้ IP ของ interface ขาออกเป็น public address</figcaption></figure>
<pre><code>[AR1]acl 2000
[AR1-acl-basic-2000]rule 5 permit source 192.168.0.0 0.0.0.255
[AR1-acl-basic-2000]rule deny
[AR1-acl-basic-2000]quit
[AR1]interface GigabitEthernet 0/0/1
[AR1-GigabitEthernet0/0/1]nat outbound 2000          # ไม่มี address-group = Easy IP</code></pre>
<table>
<tr><th>คำสั่งที่ interface ขาออก</th><th>ผลลัพธ์</th></tr>
<tr><td>nat outbound 2000 address-group 1</td><td>NAPT (pool)</td></tr>
<tr><td>nat outbound 2000 address-group 1 no-pat</td><td>Dynamic NAT</td></tr>
<tr><td>nat outbound 2000</td><td>Easy IP</td></tr>
</table>
<div class="warn"><b>ระวัง</b>: คำสั่ง <code>nat outbound</code> ต้องตั้งที่ interface ฝั่ง <b>ขาออกสู่ Internet</b> (GE 0/0/1) ไม่ใช่ฝั่ง intranet และ ACL ต้อง permit เครือข่ายภายในด้วย wildcard mask (0.0.0.255 สำหรับ /24) ถ้า ACL ไม่ match จะไม่ถูกแปล</div>`
    },
    {
      t: "10.5 NAT Server",
      ref: "หน้า 352-355",
      html: `
<h4>เมื่อไรต้องใช้ NAT Server</h4>
<p>ถ้า server อยู่ใน private network แต่ต้องให้ผู้ใช้ Internet เข้ามาใช้บริการ ต้องทำ <b>NAT Server</b> บน router: กำหนด mapping แบบ one-to-one ระหว่าง <b>[public address:port]</b> กับ <b>[private address:port]</b> ภายนอกเข้าที่ [public address:port] แล้ว router แปลเป็น server ใน intranet ให้ โดยแท้จริงคือการเพิ่ม <b>static NAT mapping</b> ลงในตาราง</p>
<figure><img src="i/p352_1.webp" alt="NAT server: PC4 เข้า 12.2.2.8:80 แล้ว RA แปลไปยัง Web server ใน intranet" loading="lazy"><figcaption>Fig. 10.8 NAT server: PC4 เข้า TCP port 80 ของ 12.2.2.8, router RA ค้นตารางแล้วแปล destination IP และ port ไปยัง Web server ภายใน</figcaption></figure>
<ul>
<li>ขาเข้า (PC4 → server): แปล <b>destination</b> IP:port จาก public เป็น private</li>
<li>ขาตอบกลับ (server → PC4): แปล <b>source</b> IP:port จาก private กลับเป็น public</li>
</ul>
<h4>ตัวอย่าง config</h4>
<p>intranet 192.168.0.0/24 ต่อ Internet ผ่าน AR1 (interface GE 0/0/1 = 12.2.2.1) ใช้ <b>Easy IP</b> ให้เครื่องภายในออก Internet แล้วใช้ public address อีกตัว <b>12.2.2.8</b> เป็น NAT Server address:</p>
<figure><img src="i/p353_1.webp" alt="Topology NAT server: Web server 192.168.0.2, Server1 192.168.0.3, PC3 192.168.0.4 หลัง AR1" loading="lazy"><figcaption>Fig. 10.9 Configure NAT server: เปิดเว็บไซต์ (HTTP) และ remote desktop (RDP) ของเครื่องใน intranet ให้เข้าได้จาก Internet</figcaption></figure>
<table>
<tr><th>บริการ</th><th>Public (12.2.2.8)</th><th>Private</th></tr>
<tr><td>Web (HTTP, TCP 80)</td><td>TCP 80</td><td>192.168.0.2 : 80</td></tr>
<tr><td>RDP ไป Server1 (TCP 3389)</td><td>TCP 3389</td><td>192.168.0.3 : 3389</td></tr>
<tr><td>RDP ไป PC3</td><td>TCP <b>4000</b></td><td>192.168.0.4 : 3389</td></tr>
</table>
<p>เนื่องจาก public port 3389 ถูก map ให้ Server1 แล้ว จะใช้ซ้ำสำหรับ PC3 ไม่ได้ จึงเปลี่ยน <b>public port</b> เป็น 4000 แต่ <b>private port</b> ยังเป็น 3389 (เพราะ RDP ของ PC3 ฟังที่ 3389)</p>
<pre><code>[AR1-GigabitEthernet0/0/1]nat server protocol tcp global 12.2.2.8 www inside 192.168.0.2 www
Warning: The port 80 is well-known port. ... Continue? [Y/N]: y
[AR1-GigabitEthernet0/0/1]nat server protocol tcp global 12.2.2.8 3389 inside 192.168.0.3 3389
[AR1-GigabitEthernet0/0/1]nat server protocol tcp global 12.2.2.8 4000 inside 192.168.0.4 3389
&lt;AR1&gt;display nat server interface GigabitEthernet 0/0/1</code></pre>
<p>ผลของ <code>display nat server</code> ระบุ Global IP/Port, Inside IP/Port, Protocol 6 (tcp) และ Total: 3 ตามจำนวน mapping ที่ตั้งไว้ (คำว่า <code>www</code> เท่ากับ port 80)</p>
<div class="note"><b>Well-known port</b>: www = 80, ftp = 21, telnet = 23, smtp = 25, pop3 = 110 ใช้ชื่อแทนตัวเลขได้ใน <code>nat server</code></div>
<div class="must"><b>ต้องจำ</b><ul>
<li>NAT Server ใช้เมื่อ <b>ภายนอกต้องเริ่ม</b>ติดต่อ server ใน intranet</li>
<li>รูปแบบ: <b>nat server protocol tcp global [pub IP] [pub port] inside [priv IP] [priv port]</b></li>
<li>ต้อง map เฉพาะ [IP:port] ที่ต้องการเปิด ไม่ได้เปิดทุก port ของเครื่อง</li>
<li>public port ซ้ำกันไม่ได้ (ต่อ public IP เดียวกัน) แต่ private port ซ้ำได้ถ้าเป็นคนละเครื่อง</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `บริษัทมีเครื่องภายใน 50 เครื่องใช้ 192.168.10.0/24 แต่ ISP ให้ public address เพียง <b>1 ตัว</b> ซึ่งอยู่ที่ interface ขาออกของ router และ IP นี้ได้จาก DHCP จาก ISP (เปลี่ยนได้)`,
      q: "ควรเลือก NAT แบบใดเพื่อให้ทุกเครื่องออก Internet พร้อมกันได้และไม่ต้องแก้ config เมื่อ IP เปลี่ยน?",
      opts: [
        { t: "Easy IP", why: "ถูก: แปล IP และ port โดยใช้ IP ของ interface ขาออก ซึ่งตามการเปลี่ยนของ IP อัตโนมัติ และรองรับ 50 เครื่องด้วย port ที่ต่างกัน" },
        { t: "Static NAT", why: "ผิด: ต้องใช้ public 1 ตัวต่อ private 1 ตัว มีแค่ 1 public จึงรองรับได้ 1 เครื่อง" },
        { t: "Dynamic NAT (no-pat)", why: "ผิด: pool มี address เดียว ออกได้ครั้งละ 1 เครื่อง และ pool ที่ใช้ IP เปลี่ยนได้ไม่เหมาะ" },
        { t: "NAT Server", why: "ผิด: ใช้เมื่อต้องการให้ภายนอกเข้ามาหา server ไม่ใช่ให้ภายในออกไป" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router R1 ทำ Dynamic NAT แบบไม่แปล port ด้วย pool 2 address (12.2.2.2 - 12.2.2.3) PC-A และ PC-B ออก Internet อยู่และใช้ pool หมดแล้ว ต่อมา PC-C ต้องการออก Internet`,
      q: "เกิดอะไรขึ้นกับ PC-C?",
      opts: [
        { t: "PC-C ออก Internet ไม่ได้จนกว่าจะมี address ว่างคืนเข้า pool", why: "ถูก: Dynamic NAT ไม่แปล port เป็น 1:1 ขณะใช้งาน ถ้า pool หมดเครื่องใหม่ไม่ถูกแปล" },
        { t: "PC-A ถูกตัดออกและ PC-C ใช้ address ของ PC-A แทน", why: "ผิด: router ไม่ไล่ session เดิมออกเพื่อให้เครื่องใหม่" },
        { t: "PC-C แชร์ address เดียวกับ PC-B โดยใช้ port ต่างกัน", why: "ผิด: การแชร์ด้วย port เป็นพฤติกรรมของ NAPT ไม่ใช่ Dynamic NAT แบบ no-pat" },
        { t: "ทุกเครื่องผลัดกันใช้ address และทั้งสามออกได้พร้อมกัน", why: "ผิด: address ใน pool ถูกจองต่อ 1 เครื่อง ไม่หมุนเวียนระหว่างที่ session ยังใช้อยู่" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการให้ Host A ใน intranet (192.168.1.2) ออก Internet ได้ และให้ผู้ใช้บน Internet เริ่ม connection เข้ามาที่ Host A ได้ด้วย โดยมี public address ว่างหนึ่งตัวสำหรับ Host A โดยเฉพาะ`,
      q: "ควรตั้ง NAT แบบใดบน router?",
      opts: [
        { t: "Static NAT (map 192.168.1.2 กับ public address ตัวนั้น)", why: "ถูก: Static NAT 1:1 รองรับสองทิศทาง ภายนอกเริ่มเข้ามาโดยใช้ public address ได้" },
        { t: "Dynamic NAT", why: "ผิด: อนุญาตเฉพาะ intranet เริ่มติดต่อ ภายนอกเข้ามาเองไม่ได้" },
        { t: "NAPT", why: "ผิด: ภายนอกไม่สามารถเริ่ม connection ได้ เพราะไม่มี mapping ถาวรเมื่อไม่มี session ขาออก" },
        { t: "Easy IP", why: "ผิด: หลักการเดียวกับ NAPT ภายนอกเริ่มเข้ามาไม่ได้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ตาราง NAPT บน R1 (public IP 12.2.2.2) มีรายการ: 192.168.1.2:1025 → 12.2.2.2:2001, 192.168.1.3:1025 → 12.2.2.2:2002 ทั้งสองเครื่องเปิด connection ไปยัง Web server เดียวกันที่ TCP 80 แล้ว Web server ตอบกลับ packet หนึ่งมายัง <b>12.2.2.2:2002</b>`,
      q: "R1 จะส่ง packet นี้ต่อไปยังที่ใด และแปลอย่างไร?",
      opts: [
        { t: "ส่งให้ 192.168.1.3 โดยแปล destination เป็น 192.168.1.3:1025", why: "ถูก: ใช้ destination port 2002 ค้นตาราง ตรงกับรายการของ 192.168.1.3:1025" },
        { t: "ส่งให้ 192.168.1.2 โดยแปล destination เป็น 192.168.1.2:1025", why: "ผิด: 192.168.1.2 ใช้ public port 2001 ไม่ใช่ 2002" },
        { t: "broadcast ไปทุกเครื่องใน intranet", why: "ผิด: NAPT ใช้ตารางตัดสินปลายทางแบบเจาะจง ไม่ broadcast" },
        { t: "drop เพราะ destination IP เหมือนกันกับอีกเครื่อง", why: "ผิด: public IP เดียวกันได้ ที่แยกเครื่องคือ port" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `วิศวกรต้องการอนุญาตเฉพาะเครือข่าย 192.168.0.0/24 ให้ถูกแปลด้วย NAPT จึงเขียน ACL: <code>acl 2000</code> / <code>rule 5 permit source 192.168.0.0 0.0.0.255</code> / <code>rule deny</code> จากนั้น host 192.168.1.10 ใน intranet อีก segment ที่ router เดียวกันพยายามออก Internet`,
      q: "ผลเป็นอย่างไร และ 0.0.0.255 คืออะไร?",
      opts: [
        { t: "192.168.1.10 ไม่ match rule permit จึงไม่ถูกแปล; 0.0.0.255 เป็น wildcard mask (3 octet แรกต้องตรง octet สุดท้ายอะไรก็ได้)", why: "ถูก: wildcard 0 = ต้องตรง, 255 = ไม่สน จึงครอบคลุม 192.168.0.0 - 192.168.0.255 เท่านั้น" },
        { t: "192.168.1.10 ถูกแปลปกติ เพราะ 0.0.0.255 หมายถึงทั้ง 192.168.0.0/16", why: "ผิด: wildcard 0.0.0.255 ครอบคลุมแค่ /24 ถ้าจะให้ครอบคลุมทั้ง /16 ต้องใช้ 0.0.255.255" },
        { t: "0.0.0.255 คือ subnet mask ของ /24 จึงถูกแปลทุก segment", why: "ผิด: ACL ใช้ wildcard (กลับค่าจาก subnet mask) ไม่ใช่ subnet mask" },
        { t: "rule deny ทำให้ทั้งเครือข่ายออกไม่ได้รวมถึง 192.168.0.0/24", why: "ผิด: rule 5 permit ถูกตรวจก่อนและ match ก่อน rule deny ท้ายสุดจะทำงานกับสิ่งที่ไม่ match เท่านั้น" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `แผนก IT ต้องการให้พนักงาน remote desktop (TCP 3389) เข้า Server1 (192.168.0.3) และ PC3 (192.168.0.4) ได้จากบ้าน โดยมี public address 12.2.2.8 เพียงตัวเดียวสำหรับ NAT Server และ TCP 3389 ของ 12.2.2.8 ถูก map ให้ Server1 ไปแล้ว`,
      q: "ควร map PC3 อย่างไร?",
      opts: [
        { t: "nat server protocol tcp global 12.2.2.8 4000 inside 192.168.0.4 3389", why: "ถูก: ใช้ public port อื่น (4000) แล้วแปลไปยัง private port 3389 ของ PC3 ซึ่ง RDP ฟังอยู่" },
        { t: "nat server protocol tcp global 12.2.2.8 3389 inside 192.168.0.4 3389", why: "ผิด: public 12.2.2.8:3389 ถูกใช้โดย Server1 แล้ว ซ้ำกันไม่ได้" },
        { t: "nat server protocol tcp global 12.2.2.8 4000 inside 192.168.0.4 4000", why: "ผิด: RDP บน PC3 ฟังที่ 3389 ไม่ใช่ 4000 การเชื่อมต่อจะล้มเหลว" },
        { t: "nat static global 12.2.2.8 inside 192.168.0.4", why: "ผิด: จะ map ทั้ง IP แบบ 1:1 ซึ่งชนกับ NAT Server ของ 12.2.2.8 และเปิดทุก port ของเครื่อง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `หลัง config NAT Server ผู้ใช้ภายนอกเข้า http://12.2.2.8 ได้ แต่เครื่องภายใน 192.168.0.5 ซึ่งไม่ได้ถูก map ใน NAT Server พยายามออก Internet ไม่ได้ ทั้งที่ router มี default route ไป ISP`,
      q: "สาเหตุที่น่าจะเป็นมากที่สุดคือข้อใด?",
      opts: [
        { t: "ยังไม่ได้ตั้ง NAT ขาออก (เช่น Easy IP/NAPT) NAT Server ทำหน้าที่ให้ภายนอกเข้ามาเท่านั้น", why: "ถูก: NAT Server เป็น mapping เฉพาะ [IP:port] ที่ระบุ เครื่องอื่นต้องมี NAT ขาออกแยกต่างหาก" },
        { t: "192.168.0.5 เป็น private address จึงห้ามใช้ใน router", why: "ผิด: private address ใช้ใน intranet ได้ปกติ" },
        { t: "ต้อง map ทุก port ของ 192.168.0.5 ด้วย nat server ก่อน", why: "ผิด: ไม่เกี่ยวกับการออก Internet ของเครื่อง" },
        { t: "ต้องเปลี่ยน default route เป็น static NAT", why: "ผิด: default route กับ NAT เป็นคนละหน้าที่" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `องค์กรหนึ่งใช้ NAPT ให้ intranet ออก Internet ผ่าน public IP เดียว`,
      q: "เลือกทุกข้อที่เป็นความจริงเกี่ยวกับสถานการณ์นี้",
      opts: [
        { t: "router ต้องเก็บตาราง mapping ของ IP และ port", ok: true, why: "ถูก: ใช้เพื่อส่ง packet ตอบกลับไปยังเครื่องที่ถูกต้อง" },
        { t: "server ภายนอกเห็น source IP เป็น public address ของ router ไม่ใช่ IP จริงของเครื่อง", ok: true, why: "ถูก: จึงติดตาม end-to-end ไม่ได้ว่าเครื่องไหนเป็นผู้ส่ง" },
        { t: "ผู้ใช้ Internet เริ่ม connection เข้าหาเครื่องภายในได้โดยตรงถ้ารู้ public IP", ok: false, why: "ผิด: NAPT ไม่มี mapping ถาวร ภายนอกเริ่มเข้ามาไม่ได้" },
        { t: "เพิ่ม delay มากกว่าการ route ธรรมดา เพราะต้องแก้ header ชั้น 3 และ 4", ok: true, why: "ถูก: ข้อเสียของ NAT ตามตำรา" },
        { t: "IPSec ที่ห้ามแก้ไข packet ระหว่างทางทำงานผ่าน NAT ได้ไม่มีปัญหา", ok: false, why: "ผิด: NAT แก้ packet จึงมีปัญหากับ IPSec" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลกำลังเลือกระหว่าง Static NAT กับ Dynamic NAT สำหรับเครือข่ายที่มีเครื่อง 20 เครื่องแต่ใช้ออก Internet พร้อมกันไม่เกิน 5 เครื่อง และมี public address 5 ตัว`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Dynamic NAT เหมาะกว่า Static NAT เพราะ address ไม่ถูกจองไว้เมื่อเครื่องไม่ได้ใช้งาน", ok: true, why: "ถูก: pool ให้ address ชั่วคราวและคืนเมื่อเลิกใช้" },
        { t: "Static NAT ต้องการ public address 20 ตัวถ้าต้องการให้ทั้ง 20 เครื่องออกได้", ok: true, why: "ถูก: map 1:1 ถาวร" },
        { t: "ใน Dynamic NAT ต้องกำหนดชัดว่า private ตัวไหนใช้ public ตัวไหน", ok: false, why: "ผิด: ไม่ระบุ router เลือก address ที่ว่างให้เอง" },
        { t: "ถ้ามีเครื่องที่ 6 พยายามออกขณะที่ 5 เครื่องแรกยังใช้อยู่ เครื่องที่ 6 จะออกไม่ได้", ok: true, why: "ถูก: pool หมด (ไม่แปล port)" },
        { t: "ถ้าใช้ NAPT แทน จะรองรับได้หลายเครื่องกว่า 5 เครื่องด้วย address เดิม", ok: true, why: "ถูก: NAPT แชร์ address ด้วยการแยก port" }
      ]
    },
    {
      type: "multi",
      story: `ทีมเครือข่ายกำลังตรวจ config บน Huawei router: <code>nat address-group 1 12.2.2.2 12.2.2.3</code>, <code>acl 2000</code> / <code>rule 5 permit source 192.168.0.0 0.0.0.255</code>, และ <code>nat outbound 2000 address-group 1</code> ที่ interface GE 0/0/1 ซึ่งต่อกับ Internet`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "นี่คือ NAPT เพราะไม่มี no-pat ท้ายคำสั่ง", ok: true, why: "ถูก: ไม่มี no-pat = แปล port ด้วย" },
        { t: "ถ้าเพิ่ม no-pat ท้ายคำสั่ง จะกลายเป็น Dynamic NAT", ok: true, why: "ถูก: no-pat = ไม่ใช้ PAT" },
        { t: "ถ้าตัด address-group 1 ออก (nat outbound 2000) จะกลายเป็น Easy IP โดยใช้ IP ของ GE 0/0/1", ok: true, why: "ถูก: ไม่ระบุ pool ใช้ IP ของ interface" },
        { t: "คำสั่ง nat outbound ต้องตั้งที่ interface ฝั่ง intranet", ok: false, why: "ผิด: ต้องตั้งที่ interface ขาออกสู่ Internet" },
        { t: "ACL 2000 ใช้ wildcard mask 0.0.0.255 ครอบคลุม 192.168.0.0 - 192.168.0.255", ok: true, why: "ถูก: octet สุดท้ายเป็น don't care" }
      ]
    },
    {
      type: "multi",
      story: `บริษัทต้องการให้ลูกค้าเข้าเว็บ (TCP 80) และ FTP (TCP 21) ของเครื่อง 192.168.0.2 ผ่าน public address 12.2.2.8`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับการทำ NAT Server",
      opts: [
        { t: "ต้องสร้าง mapping แยกกัน 2 รายการ (port 80 และ port 21)", ok: true, why: "ถูก: NAT Server map ทีละ [public IP:port] ↔ [private IP:port]" },
        { t: "เมื่อลูกค้าเข้า 12.2.2.8:80 router แปล destination IP และ port เป็น 192.168.0.2:80", ok: true, why: "ถูก: ขาเข้าแปล destination" },
        { t: "ตอบกลับจาก server จะถูกแปล source กลับเป็น 12.2.2.8:80", ok: true, why: "ถูก: ขาตอบกลับแปล source ตามตาราง" },
        { t: "ต้องใช้ Dynamic NAT เพื่อให้ลูกค้าเข้ามาได้", ok: false, why: "ผิด: Dynamic NAT ไม่ให้ภายนอกเริ่มติดต่อ ต้องใช้ NAT Server หรือ Static NAT" },
        { t: "การ map ทำให้ทุก port ของ 192.168.0.2 เปิดสู่ Internet", ok: false, why: "ผิด: เปิดเฉพาะ port ที่ระบุใน mapping" }
      ]
    },
    {
      type: "blank",
      story: `ให้ config NAT บน AR1 ตาม Fig. 10.6 โดย PC1 (192.168.0.2) ใช้ 12.2.2.2 และต้องการให้ภายนอกเข้า PC1 ได้ด้วย`,
      text: `คำสั่งคือ <code>nat {1} global 12.2.2.2 {2} 192.168.0.2</code> และถ้า config ใน system view ต้องเข้า interface แล้วสั่ง <code>nat static {3}</code>`,
      blanks: [
        { opts: ["static", "server", "outbound", "address-group"], ans: 0, why: "Static NAT ใช้ nat static global ... inside ..." },
        { opts: ["outside", "inside", "local", "private"], ans: 1, why: "ใช้คีย์เวิร์ด inside นำหน้า private address" },
        { opts: ["enable", "outbound", "global", "server"], ans: 0, why: "system view ต้อง nat static enable ที่ interface จึงจะทำงาน" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์ pool และ ACL ของ NAPT`,
      text: `pool ที่มี public 12.2.2.2 ถึง 12.2.2.3 สร้างด้วยคำสั่ง <code>nat {1} 1 12.2.2.2 12.2.2.3</code> ส่วน ACL ที่ permit 192.168.0.0/24 ต้องใช้ wildcard mask {2} และเรียกใช้ที่ interface ด้วย <code>nat {3} 2000 address-group 1</code>`,
      blanks: [
        { opts: ["address-group", "pool", "global-range", "static"], ans: 0, why: "คำสั่งสร้าง pool คือ nat address-group" },
        { opts: ["255.255.255.0", "0.0.0.255", "0.0.255.255", "255.255.255.255"], ans: 1, why: "wildcard ของ /24 คือ 0.0.0.255" },
        { opts: ["outbound", "server", "static", "inside"], ans: 0, why: "nat outbound ผูก ACL กับ pool ที่ interface ขาออก" }
      ]
    },
    {
      type: "blank",
      story: `สรุปคุณสมบัติของ NAT แต่ละแบบ`,
      text: `NAT ที่ไม่ประหยัด public address แต่รองรับสองทิศทางคือ {1}; NAT ที่แปล port และใช้ IP ของ interface คือ {2}; ส่วนการเปิด [public IP:port] ให้เข้าถึง server ภายในใช้ {3}`,
      blanks: [
        { opts: ["Static NAT", "NAPT", "Easy IP", "Dynamic NAT"], ans: 0, why: "Static NAT เป็น 1:1 ถาวร ไม่ประหยัด IP และเข้าถึงได้สองทาง" },
        { opts: ["Easy IP", "Static NAT", "Dynamic NAT", "NAT Server"], ans: 0, why: "Easy IP ไม่มี pool ใช้ IP ของ interface" },
        { opts: ["NAT Server", "Dynamic NAT", "Easy IP", "NAPT"], ans: 0, why: "NAT Server map [IP:port] แบบ static" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ NAT กับคำอธิบาย",
      pairs: [
        ["Static NAT", "private 1 ตัวต่อ public 1 ตัวคงที่ และภายนอกเริ่มเข้ามาได้"],
        ["Dynamic NAT", "ใช้ pool + ACL ให้ address ชั่วคราว ไม่แปล port"],
        ["NAPT", "แปลทั้ง IP และ port ใช้ pool หลายเครื่องแชร์ address เดียวได้"],
        ["Easy IP", "แปล IP และ port โดยใช้ IP ของ interface ขาออก ไม่มี pool"],
        ["NAT Server", "map [public IP:port] กับ [private IP:port] ให้ภายนอกเข้าถึง server"]
      ],
      why: "ห้าแบบต่างกันที่รูปแบบการ map (1:1, pool, port, interface IP, [IP:port])"
    },
    {
      type: "match",
      q: "จับคู่ private address กับ Class/CIDR ที่ถูกต้อง",
      pairs: [
        ["10.0.0.0 - 10.255.255.255", "Class A private (10.0.0.0/8)"],
        ["172.16.0.0 - 172.31.255.255", "Class B private (172.16.0.0/12)"],
        ["192.168.0.0 - 192.168.255.255", "Class C private (192.168.0.0/16)"],
        ["172.32.1.1", "ไม่ใช่ private (เป็น public)"]
      ],
      why: "172.32.x.x อยู่นอกช่วง 172.16 - 172.31 จึงเป็น public address"
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการตั้ง Static NAT map 192.168.0.2 กับ 12.2.2.1 แต่ 12.2.2.1 ถูกตั้งเป็น IP ของ interface GE 0/0/1 ของ router เอง`,
      q: "ควรทำอย่างไร?",
      opts: [
        { t: "เลือก public address อื่นที่ว่าง เช่น 12.2.2.2 เพราะ address ที่ถูกใช้กับ interface แล้ว map static ไม่ได้", why: "ถูก: ตามโจทย์ในตำรา 12.2.2.1 ถูกใช้แล้ว ใช้ได้เฉพาะ 12.2.2.2 และ 12.2.2.3" },
        { t: "map ต่อไปได้ เพราะ router แยกแยะ interface IP กับ NAT IP เองได้", why: "ผิด: ซ้ำกับ address ของ interface และทำงานไม่ถูกต้อง" },
        { t: "เปลี่ยนเป็น Dynamic NAT เพื่อให้ใช้ 12.2.2.1 ได้", why: "ผิด: ปัญหาอยู่ที่ address ซ้ำกับ interface ไม่เกี่ยวกับชนิดของ NAT" },
        { t: "ลบ default route ออก", why: "ผิด: ไม่เกี่ยวข้อง และจะทำให้ออก Internet ไม่ได้" }
      ],
      ans: 0
    }
  ]
});
