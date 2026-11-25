IOT.reg({
  id: "c3",
  title: "VRP Fundamentals",
  th: "ระบบปฏิบัติการ VRP ของ Huawei: command line, view, level, การ login ผ่าน Console/Telnet/SSH/Web, ตั้งค่าพื้นฐาน, configuration file และ file system",
  summary: `
<ul>
<li><b>VRP</b> = Versatile Routing Platform: network OS ของ Huawei ใช้กับ router, switch, firewall ฯลฯ มี user interface/management interface สอดคล้องกัน, แกนกลางคือ TCP/IP stack</li>
<li><b>Command</b> = keyword + parameter; ระดับ command: <b>0 visit, 1 monitoring, 2 configuration, 3 management</b>; ระดับ user <b>0-15</b> (level 3 ขึ้นไปทำได้ทุกคำสั่งโดย default); user ใช้ command ระดับ <b>เท่ากับหรือต่ำกว่า</b>ตนเอง</li>
<li><b>View</b>: user view <code>&lt;R1&gt;</code>, system view <code>[R1]</code> (<code>system-view</code>), interface view <code>[R1-GigabitEthernet0/0/0]</code>, และ protocol/AAA/ACL/address pool view (ต้องเข้าผ่าน system view)</li>
<li><b>ออกจาก view</b>: <code>quit</code> = ถอยหนึ่งชั้น, <code>return</code> หรือ <b>Ctrl+Z</b> = กลับ user view ทันที</li>
<li><b>Input</b>: ยาวสุด 510 ตัวอักษร, keyword ไม่ case-sensitive, พิมพ์ย่อได้ถ้าไม่กำกวม (<code>dis cu</code> ได้ แต่ <code>dis c</code> ไม่ได้)</li>
<li><b>Online help</b>: <code>?</code>; full help (เว้นวรรคแล้ว <code>?</code>) เช่น <code>display ?</code>; partial help (ติดกับตัวอักษร) เช่น <code>dis?</code>; <b>Tab</b> เติม keyword อัตโนมัติ</li>
<li><b>undo</b> นำหน้าคำสั่ง = คืนค่า default / ปิด function / ลบ config</li>
<li><b>User interface</b>: Console (CON 0, absolute 0), VTY (VTY 0-14, absolute 129-143, default เปิด 5), Web, XML; ระบบให้เลขน้อยสุดที่ว่าง</li>
<li><b>Authentication</b>: <b>password</b> (default, ใส่แค่รหัส), <b>AAA</b> (username + password; ใช้กับ Telnet), <b>none</b> (ไม่แนะนำ); user ที่ login ด้วย Telnet มี level 0 โดย default</li>
<li><b>Console</b>: RJ45 ตาม RS232, ต่อ COM port (laptop ใช้ USB to RS232), ใช้ SecureCRT แบบ Serial; ใช้ตอน config ครั้งแรก</li>
<li><b>Telnet</b>: TCP port 23, plain text ไม่ปลอดภัย; <b>SSH</b> เข้ารหัส (password-based และ key-based); Web: <code>http server enable</code> แล้วเข้า https://IP</li>
<li><b>ตั้งค่าพื้นฐาน</b>: <code>sysname</code> (default Huawei), <code>clock timezone BJ add 8:00</code> และ <code>clock datetime 16:37:00 2020-10-19</code> (ทำใน user view), <code>ip address ip {mask | length}</code> ใน interface view, <code>undo shutdown</code>, <code>display ip interface brief</code></li>
<li><b>Configuration</b>: current configuration อยู่ใน <b>memory</b> (หายเมื่อ reboot), saved configuration อยู่ใน <b>flash</b> เป็น <code>*.cfg</code> / <code>*.zip</code> default <b>vrpcfg.zip</b></li>
<li><b>save</b> ใน user view; <code>save backup.zip</code>; <code>startup saved-configuration file</code> กำหนดไฟล์ที่ใช้ boot ครั้งถัดไป; <code>display startup</code>, <code>display current-configuration</code>, <code>display saved-configuration</code></li>
<li><b>Autosave</b> default ปิด; <code>autosave interval on</code> (default 1440 นาที) กับ <code>autosave time on</code> (default 08:00:00) เปิดพร้อมกันไม่ได้</li>
<li><b>File</b>: <code>dir [/all]</code>, <code>mkdir</code>, <code>copy</code>, <code>move</code>, <code>cd</code>, <code>pwd</code>, <code>delete</code> (ไปที่ recycle bin, <code>undelete</code> กู้ได้), <code>delete /unreserved</code> (ลบถาวร), <code>reset recycle-bin</code>; system software ไฟล์ <code>.cc</code> ต้องอยู่ root ของ external memory</li>
</ul>`,
  sections: [
    {
      t: "ภาพรวมของ VRP",
      ref: "หน้า 88-89",
      html: `
<p>การ config อุปกรณ์ Huawei (router, switch, firewall) ต้องรู้จัก <b>VRP (Versatile Routing Platform)</b> ซึ่งเป็น network operating system กลางของ Huawei ที่ Huawei พัฒนาเองทั้งหมด ลดต้นทุนการเรียนรู้ของ IT เพราะอุปกรณ์หลายชนิดใช้ OS เดียวกัน เปรียบได้กับ Windows หรือ iOS</p>
<p>VRP ทำงานบนหลายแพลตฟอร์ม เช่น router, LAN switch, ATM switch, dial-up access server, IP telephony gateway, firewall มี network interface, user interface และ management interface ที่ <b>สอดคล้องกัน</b> แกนกลางคือ <b>TCP/IP protocol stack</b> และรวมฟังก์ชัน routing, switching, QoS, security, IP voice ไว้ในระบบ พร้อม IP forwarding engine</p>
<figure><img src="i/p089_1.webp" alt="VRP รองรับอุปกรณ์หลายแบบในโซลูชันต่าง ๆ" loading="lazy"><figcaption>Fig. 3.1 VRP application solutions: VRP ทำงานบนอุปกรณ์หลายประเภท</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>VRP = <b>Versatile Routing Platform</b> (ข้อสอบมักถามชื่อเต็ม)</li>
<li>VRP ให้ CLI (Command-Line Interface) เป็นช่องทางจัดการอุปกรณ์</li>
<li>Config ครั้งแรกผ่าน Console port; หลังตั้งค่าแล้ว login ผ่าน Telnet, SSH หรือ Web ได้</li>
</ul></div>`
    },
    {
      t: "Command Line: keyword, view และ level",
      ref: "หน้า 89-92",
      html: `
<p>คำสั่ง VRP ประกอบด้วย <b>keyword</b> (คำที่ระบุคำสั่ง ตัวหนาในหนังสือ) และ <b>parameter</b> (ค่า เช่น ตัวเลข string หรือ enum) เช่น <code>ping ip-address</code> มี <code>ping</code> เป็น keyword และ <code>ip-address</code> เป็น parameter อุปกรณ์ใหม่ถูกตั้งค่าเป็นว่าง ต้องเข้า CLI ไป config ให้ทำงานได้</p>
<figure><img src="i/p091_1.webp" alt="หน้าจอ command line interface ของ VRP" loading="lazy"><figcaption>Fig. 3.2 VRP command line interface</figcaption></figure>
<h4>Command view</h4>
<p>คำสั่งถูกลงทะเบียนไว้ตาม view ตามประเภทฟังก์ชัน ต้องเข้า view ที่คำสั่งนั้นอยู่ก่อน</p>
<table>
<tr><th>View</th><th>Prompt</th><th>ทำอะไรได้</th></tr>
<tr><td><b>User view</b></td><td><code>&lt;R1&gt;</code> (<code>&lt;&gt;</code> = user view, R1 = hostname)</td><td>ดูข้อมูลและสถานะ ทำ config ฟังก์ชัน service ไม่ได้</td></tr>
<tr><td><b>System view</b></td><td><code>[R1]</code></td><td>คำสั่ง config พื้นฐานและ global parameter เช่น hostname; เข้าด้วย <code>system-view</code></td></tr>
<tr><td>Interface view</td><td><code>[R1-GigabitEthernet0/0/0]</code></td><td>config พารามิเตอร์ของ interface เช่น IP</td></tr>
<tr><td>Protocol / AAA / ACL / address pool view</td><td><code>[R1-ospf-1]</code>, <code>[R1-aaa]</code> ฯลฯ</td><td>config protocol, AAA, ACL, IP pool</td></tr>
</table>
<figure><img src="i/p091_2.webp" alt="user view เข้า system view แล้วแยกไป interface, protocol, AAA, ACL, address pool view" loading="lazy"><figcaption>Fig. 3.3 The command line views: ทุก view ย่อยเข้าผ่าน system view</figcaption></figure>
<p>จาก system view จึงเข้า interface/protocol/AAA view ได้ ถ้าจะเข้า view อื่นต้องผ่าน system view ก่อน prompt เปลี่ยนตาม view และใน interface view จะต่อชื่อชนิดและเลข interface</p>
<pre><code>[R1]interface GigabitEthernet 0/0/0
[R1-GigabitEthernet0/0/0]ip address 192.168.10.111 24</code></pre>
<h4>Command level และ User privilege level</h4>
<p>Command มี 4 ระดับ ส่วน user มี 16 ระดับ (0-15)</p>
<table>
<tr><th>User level</th><th>Command level ที่ใช้ได้</th><th>ชื่อ command level และตัวอย่าง</th></tr>
<tr><td>0</td><td>0</td><td><b>Visit</b>: network diagnostic (ping, tracert), telnet ไปอุปกรณ์อื่น</td></tr>
<tr><td>1</td><td>0, 1</td><td><b>Monitoring</b>: system maintenance เช่น display (แต่ <code>display current-configuration</code> และ <code>display saved-configuration</code> เป็น level management)</td></tr>
<tr><td>2</td><td>0, 1, 2</td><td><b>Configuration</b>: service config เช่น routing และคำสั่งของแต่ละ network layer</td></tr>
<tr><td>3-15</td><td>0, 1, 2, 3</td><td><b>Management</b>: file system, FTP download, สลับ config file, จัดการ user, ตั้ง command level, ตั้ง system parameter และ debugging</td></tr>
</table>
<figure><img src="i/p092_1.webp" alt="ตารางความสัมพันธ์ระหว่าง user privilege level และ command level" loading="lazy"><figcaption>Table 3.1 Correspondence between user privilege levels and command levels</figcaption></figure>
<p>User ใช้ได้เฉพาะ command ที่ระดับ<b>เท่ากับหรือต่ำกว่า</b>ระดับตน โดย default user level 3 ใช้ได้ทุกคำสั่ง ดังนั้น level 4 ถึง 15 ก็ได้สิทธิ์เท่า level 3 โดย default level 4-15 มีไว้ใช้ร่วมกับการ "ยก level" ของคำสั่งสำคัญ เช่น ยกเป็น level 15 เพื่อกัน admin level 3 ทั่วไปไม่ให้ใช้</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Command level: 0 visit, 1 monitoring, 2 configuration, 3 management</li>
<li>ตอน login ครั้งแรกเข้า <b>user view</b> ก่อน</li>
<li>คำสั่งเกี่ยวกับ file system / FTP / config file เป็น level 3 (management); level 2 config service ได้แต่ไม่ยุ่งกับ file system</li>
</ul></div>`
    },
    {
      t: "การใช้ Command Line: เข้า/ออก view, ย่อ keyword, help, undo",
      ref: "หน้า 92-97",
      html: `
<h4>เข้า-ออก view</h4>
<pre><code>&lt;Huawei&gt;system-view                         # เข้า system view
[Huawei]interface gigabitethernet 1/0/0       # เข้า interface view
[Huawei-GigabitEthernet1/0/0]quit             # ถอยกลับ system view
[Huawei]quit                                  # ถอยกลับ user view
&lt;Huawei&gt;
[Huawei-GigabitEthernet1/0/0]return           # กลับ user view ทันที</code></pre>
<ul>
<li><code>quit</code>: ออกไป view ระดับก่อนหน้า (ทีละชั้น)</li>
<li><code>return</code> หรือ <b>Ctrl+Z</b>: กลับ user view ทันทีจากทุก view</li>
</ul>
<h4>การพิมพ์คำสั่ง</h4>
<ul>
<li>รองรับหลายบรรทัด ความยาวสูงสุด <b>510 ตัวอักษร</b>; keyword <b>ไม่ case-sensitive</b></li>
<li><b>Incomplete keyword</b>: พิมพ์ย่อได้เมื่อตัวอักษรที่พิมพ์ตรงกับ keyword ได้เพียงตัวเดียว เช่น <code>display current-configuration</code> พิมพ์เป็น <code>d cu</code>, <code>di cu</code>, <code>dis cu</code> ได้ แต่ <code>d c</code> หรือ <code>dis c</code> ไม่ได้ เพราะมีหลายคำสั่งขึ้นต้นเหมือนกัน (<code>display cpu-defend</code>, <code>display clock</code>, <code>display current-configuration</code>)</li>
</ul>
<table>
<tr><th>ปุ่ม</th><th>หน้าที่ (ตัวอย่างจาก Table 3.2/3.3)</th></tr>
<tr><td>Backspace</td><td>ลบตัวอักษรก่อนหน้า cursor</td></tr>
<tr><td>Ctrl+B / ลูกศรซ้าย, Ctrl+F / ลูกศรขวา</td><td>เลื่อน cursor ซ้าย/ขวา</td></tr>
<tr><td>Ctrl+P / ลูกศรขึ้น, Ctrl+N / ลูกศรลง</td><td>เรียก history command ก่อนหน้า/ถัดไป</td></tr>
<tr><td>Ctrl+A / Ctrl+E</td><td>ไปต้น/ท้ายบรรทัด</td></tr>
<tr><td>Ctrl+C</td><td>หยุดการทำงานปัจจุบัน</td></tr>
<tr><td>Ctrl+Z</td><td>กลับ user view (เท่ากับ <code>return</code>)</td></tr>
<tr><td>Tab</td><td>เติม keyword ที่พิมพ์ไม่ครบให้อัตโนมัติ (partial help)</td></tr>
</table>
<p>VRP มี shortcut ที่ระบบกำหนดซึ่งแก้ไม่ได้ และยอมให้ผู้ใช้กำหนดเองได้ แต่ไม่แนะนำเพราะอาจสับสนกับคำสั่งจริง</p>
<h4>Online help ด้วย ?</h4>
<ul>
<li><b>Full help</b>: พิมพ์ <code>?</code> ที่ prompt จะแสดงคำสั่งทั้งหมดของ view นั้น และพิมพ์ keyword เว้นวรรคแล้ว <code>?</code> (เช่น <code>display ?</code>) จะแสดง keyword ถัดไปทั้งหมด</li>
<li><b>Partial help</b>: พิมพ์ตัวอักษรต้นแล้วใส่ <code>?</code> ทันที (ไม่เว้นวรรค) เช่น <code>dis?</code> ได้ <code>display</code>; <code>dis c?</code> แสดง keyword ที่ขึ้นต้นด้วย c ต่อจาก display</li>
</ul>
<pre><code>&lt;Huawei&gt;display ?        # full help: แสดงทุก keyword ที่ตามหลัง display
&lt;Huawei&gt;dis?            # partial help: display Display information
&lt;Huawei&gt;dis c?          # keyword ที่ขึ้นต้นด้วย c: clock, config, cpu-usage, current-configuration ...</code></pre>
<h4>undo command</h4>
<p>เติม <code>undo</code> หน้าคำสั่งเพื่อ <b>คืนค่า default, ปิด function หรือลบ configuration</b></p>
<pre><code>&lt;Huawei&gt;system-view
[Huawei]sysname Server
[Server]undo sysname                  # คืนชื่อ default "Huawei"
[Huawei]ftp server enable
[Huawei]undo ftp server               # ปิด function
[Huawei]interface g0/0/1
[Huawei-GigabitEthernet0/0/1]ip address 192.168.1.1 24
[Huawei-GigabitEthernet0/0/1]undo ip address   # ลบ config</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Full help = เว้นวรรคก่อน <code>?</code> | Partial help = ไม่เว้นวรรค</li>
<li>ถ้า keyword ที่ย่อกำกวม ระบบไม่รับ (<code>dis c</code> ใช้ไม่ได้)</li>
<li>Ctrl+Z = return | quit = ถอยทีละชั้น</li>
</ul></div>`
    },
    {
      t: "User Interface: เลขอินเทอร์เฟซ, Authentication และ Privilege",
      ref: "หน้า 97-100",
      html: `
<p>ผู้ใช้แต่ละคนมี <b>user interface</b> ของตนเอง: ผู้ใช้ผ่าน Console ใช้ user interface ที่ตรงกับ Console port, ผู้ใช้ผ่าน Telnet ใช้ <b>VTY (Virtual Type Terminal)</b> จำนวน VTY ขึ้นกับอุปกรณ์ ถ้าจะคุมการ login ต้องเข้า user interface view ก่อนแล้ว config (เช่น privilege level, username, password)</p>
<pre><code>&lt;Huawei&gt;system-view
[Huawei]user-interface console 0
[Huawei-ui-console0]user privilege level 3</code></pre>
<h4>เลขของ user interface</h4>
<p>เมื่อ login ระบบจะให้ user interface ที่ <b>เลขน้อยที่สุดที่ว่าง</b>ของชนิดนั้น มี 2 แบบ</p>
<table>
<tr><th>แบบ</th><th>รูปแบบ</th><th>ตัวอย่าง</th></tr>
<tr><td><b>Relative number</b></td><td>ชนิด + ลำดับ</td><td>Console: <b>CON 0</b> (มี 1 port; plug-in บางรุ่นหลาย port); VTY: <b>VTY 0, VTY 1, ... VTY 14</b> (ปกติ 15 ตัว, default เปิด 5)</td></tr>
<tr><td><b>Absolute number</b></td><td>ตัวเลขเดียวระบุ UI แบบ 1 ต่อ 1</td><td>CON 0 = <b>0</b>; VTY 0 ถึง VTY 14 = <b>129 ถึง 143</b></td></tr>
</table>
<pre><code>&lt;Huawei&gt;display user-interface
  Idx   Type     Tx/Rx  Modem Privi ActualPrivi Auth Int
+ 0     CON 0    9600   -     15    15          P    -
+ 129   VTY 0           -     2     2           A    -
  130   VTY 1           -     2     -           A    -
  132   VTY 3           -     0     -           P    -
  150   Web 0    9600   -     15    -           A    -</code></pre>
<p>คอลัมน์ Idx = absolute number, Type = relative number; <b>Auth</b>: <b>P</b> = ใช้ password ของ UI, <b>A</b> = AAA (username + password), <b>N</b> = ไม่ต้อง authenticate</p>
<h4>User authentication 3 โหมด</h4>
<table>
<tr><th>โหมด</th><th>ลักษณะ</th><th>หมายเหตุ</th></tr>
<tr><td><b>Password</b></td><td>ใส่แค่ password</td><td>เป็น <b>default</b>; ถ้าไม่ตั้ง password จะ login ไม่ได้</td></tr>
<tr><td><b>AAA</b></td><td>ใส่ username และ password</td><td>ปลอดภัยกว่า แยกผู้ใช้และกำหนด privilege ต่างกันได้; <b>นิยมใช้กับ Telnet</b></td></tr>
<tr><td><b>None</b></td><td>login ได้เลย ไม่ตรวจสอบ</td><td>ไม่แนะนำเพราะความปลอดภัย</td></tr>
</table>
<p>ผู้ใช้ที่ login ด้วย Telnet มี privilege level <b>0 โดย default</b> ตั้ง level ได้ด้วย <code>user privilege level level</code> ใน user-interface view; level 3 ขึ้นไปใช้ได้ทุกคำสั่ง</p>
<div class="warn"><b>⚠️ ระวัง</b> Idx (absolute) กับ Type (relative) ต่างกัน: VTY 0 คือ absolute 129 ไม่ใช่ 0 | Console ใช้ password, Telnet ใช้ AAA เป็นหลัก</div>`
    },
    {
      t: "Login ผ่าน Console Port",
      ref: "หน้า 100-103",
      html: `
<p>การ config ครั้งแรกต้องต่อ <b>console cable</b> จาก console port ของ router/switch เข้า COM port ของคอมพิวเตอร์ Console port เป็น <b>RJ45 ตามมาตรฐาน RS232</b> เดสก์ท็อปมี COM port ส่วนโน้ตบุ๊กต้องใช้ <b>USB to RS232 converter</b> (จะแสดงเป็น COM3 ใน Device Manager)</p>
<figure><img src="i/p100_1.webp" alt="สาย console จาก COM port ของ PC ไป console port ของ router AR2220" loading="lazy"><figcaption>Fig. 3.4 ต่อ router ผ่าน console cable (DB9 ฝั่ง PC, RJ45 ฝั่ง console port)</figcaption></figure>
<p>ใช้โปรแกรม terminal emulation เช่น <b>SecureCRT</b> เลือก protocol เป็น <b>Serial</b> และเลือก port ที่ตรงกับ COM ที่ USB จำลองขึ้น</p>
<figure><img src="i/p101_2.webp" alt="หน้าจอเลือก protocol Serial ใน SecureCRT" loading="lazy"><figcaption>Fig. 3.6 เลือก protocol (Serial) ใน SecureCRT</figcaption></figure>
<p>ผู้ใช้ Console มักเป็น administrator ที่ต้องการ privilege สูงสุด และใช้ <b>password authentication</b></p>
<pre><code>[Huawei]user-interface console 0
[Huawei-ui-console0]authentication-mode ?
  aaa       AAA authentication
  password  Authentication through the password of a user terminal interface
[Huawei-ui-console0]authentication-mode password
Please configure the login password (maximum length 16):huawei

# ตั้ง/เปลี่ยน password แบบเก็บเป็น cipher
[Huawei-ui-console0]set authentication password cipher huawei.com</code></pre>
<p>ดู config ส่วน user-interface:</p>
<pre><code>&lt;Huawei&gt;display current-configuration section user-interface
user-interface con 0
 authentication-mode password
 set authentication password cipher %$%$...%$%$
user-interface vty 0 4
user-interface vty 16 20</code></pre>
<div class="note"><b>💡 หมายเหตุ</b> keyword <b>cipher</b> = password ถูกเก็บใน configuration file เป็น cipher text ไม่ใช่ข้อความตรง ๆ | ถ้าไม่ save ค่าที่ config จะอยู่แค่ใน memory และหายเมื่อ reboot</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>คำสั่ง: <code>user-interface console 0</code> แล้ว <code>authentication-mode password</code> และ <code>set authentication password cipher ...</code></li>
<li>รูปแบบ: <code>authentication-mode {aaa | password}</code> (วงเล็บปีกกา = เลือกหนึ่ง)</li>
</ul></div>`
    },
    {
      t: "Login ผ่าน Telnet และ SSH",
      ref: "หน้า 103-109",
      html: `
<h4>Telnet</h4>
<p>VTY user interface รองรับผู้ใช้ Telnet เนื่องจาก Telnet เป็น remote login ที่เสี่ยง จึงใช้ <b>AAA authentication</b> ช่วงติดตั้งมีคนหลายคนต้อง login จึงมักตั้ง VTY สูงสุด <b>15</b> และตั้ง user level เป็น <b>2</b> (configuration level) เพื่อ config service ได้</p>
<pre><code>[Huawei]user-interface maximum-vty 15
[Huawei]user-interface vty 0 14
[Huawei-ui-vty0-14]user privilege level 2
[Huawei-ui-vty0-14]authentication-mode aaa
[Huawei-ui-vty0-14]quit
[Huawei]aaa
[Huawei-aaa]local-user admin password cipher admin@123
[Huawei-aaa]local-user admin service-type telnet
[Huawei-aaa]quit</code></pre>
<p>รูปแบบ: <code>user-interface vty first-ui-number [last-ui-number]</code> (วงเล็บเหลี่ยม = optional) | <code>local-user user-name password cipher password</code> | <code>local-user user-name service-type telnet</code></p>
<p>Telnet ทำงานแบบ server/client ผ่าน <b>TCP port 23</b> (default) VRP รองรับทั้ง Telnet server และ client จึง login เข้าอุปกรณ์หนึ่งแล้ว telnet ต่อไปยังอุปกรณ์อื่นได้</p>
<figure><img src="i/p105_1.webp" alt="PC telnet ไป R1 แล้ว R1 telnet ต่อไป R2" loading="lazy"><figcaption>Fig. 3.8 Telnet secondary connection: R1 เป็น Telnet server ให้ PC และเป็น Telnet client ให้ R2</figcaption></figure>
<p>จาก Windows ใช้ <code>telnet ip-address</code> แล้วใส่ account/password เช่น <code>telnet 192.168.10.111</code> แล้ว <code>telnet 172.16.1.2</code> เพื่อต่อไป R2 ออกด้วย <code>quit</code></p>
<figure><img src="i/p106_1.webp" alt="ใช้ command prompt ของ Windows telnet เข้า router แล้ว telnet ต่อไป R2" loading="lazy"><figcaption>Fig. 3.9 Login to the router via Telnet on Windows</figcaption></figure>
<h4>SSH (Secure Shell)</h4>
<p>Telnet ส่ง account และ password เป็น <b>plain text</b> จึงไม่ปลอดภัย <b>SSH</b> พัฒนาโดย IETF ใช้ป้องกันข้อมูลรั่วไหลระหว่าง remote management มี authentication 2 ระดับ:</p>
<ul>
<li><b>Password-based</b>: รู้ account/password ก็ login ได้ ข้อมูลเข้ารหัส แต่ไม่รับประกันว่าเป็น server ที่ต้องการ อาจโดน <b>man-in-the-middle</b></li>
<li><b>Key-based</b>: สร้าง key pair เก็บ public key ไว้ที่ server; server ส่ง "challenge" ที่เข้ารหัสด้วย public key client ถอดด้วย private key แล้วส่งกลับ ไม่ต้องส่ง passphrase ผ่าน network</li>
</ul>
<pre><code>[Huawei-aaa]local-user admin service-type ssh
[Huawei-aaa]quit
[Huawei]ssh user admin authentication-type password   # SSH user ใช้ password authentication
[Huawei]stelnet server enable                          # เปิดบริการ SSH
[Huawei]rsa local-key-pair create                      # สร้าง local key
[Huawei]user-interface vty 0 14
[Huawei-ui-vty0-14]authentication-mode aaa
[Huawei-ui-vty0-14]protocol inbound ssh                # VTY ใช้ SSH</code></pre>
<p>จากฝั่ง client เปิด SecureCRT สร้าง connection ใหม่ เลือก protocol <b>SSH2</b> ระบุ hostname, port, username แล้วใส่ password เมื่อ login สำเร็จจะเข้า user view</p>
<table>
<tr><th>เทียบ</th><th>Telnet</th><th>SSH</th></tr>
<tr><td>การส่งข้อมูล</td><td>plain text</td><td>เข้ารหัส</td></tr>
<tr><td>port</td><td>TCP 23</td><td>TCP 22 (ค่า default ทั่วไป)</td></tr>
<tr><td>service-type ที่ตั้งใน AAA</td><td>telnet</td><td>ssh</td></tr>
<tr><td>เตรียมเพิ่ม</td><td>-</td><td>stelnet server enable, rsa local-key-pair create, protocol inbound ssh</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ</b> หนังสือไม่ได้ระบุเลข port ของ SSH; TCP 22 เป็นค่า default ที่ใช้กันทั่วไปในอุตสาหกรรม</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Telnet = TCP 23, plain text, ใช้ AAA | SSH = ปลอดภัยกว่า</li>
<li>ลำดับ config Telnet: maximum-vty, vty view, privilege level, authentication-mode aaa, local-user + service-type telnet</li>
<li>ผู้ใช้ Telnet ได้ VTY ที่ว่างและมีเลขน้อยที่สุด</li>
</ul></div>`
    },
    {
      t: "Login ผ่าน Web",
      ref: "หน้า 109-111",
      html: `
<p>อุปกรณ์ Huawei บางรุ่น login ผ่าน Web ได้ ขั้นตอน:</p>
<ol>
<li>Login ผ่าน console port</li>
<li>ตั้ง management IP</li>
<li>สร้าง Web user (service-type http, privilege 15)</li>
<li>เปิด Web network management</li>
<li>เปิด browser เข้า <code>https://10.1.1.1</code></li>
</ol>
<pre><code>&lt;Huawei&gt; system-view
[Huawei] interface gigabitethernet 0/0/0
[Huawei-GigabitEthernet0/0/0] ip address 10.1.1.1 24
[Huawei-GigabitEthernet0/0/0] quit
[Huawei] aaa
[Huawei-aaa] local-user admin password cipher huawei
[Huawei-aaa] local-user admin privilege level 15
[Huawei-aaa] local-user admin service-type http
[Huawei-aaa] quit
[Huawei] http server enable
Info: Succeeded in starting the HTTP server</code></pre>
<figure><img src="i/p111_1.webp" alt="หน้า login ของ Web network management" loading="lazy"><figcaption>Fig. 3.14 Login interface ของ Web management</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Web login ต้องตั้ง IP ก่อน, service-type <b>http</b>, และ <code>http server enable</code></li>
<li>ช่องทาง login 4 แบบ: Console, Telnet, SSH, Web</li>
</ul></div>`
    },
    {
      t: "Basic Configuration: ชื่ออุปกรณ์, นาฬิกา, IP address",
      ref: "หน้า 111-114",
      html: `
<h4>Device name</h4>
<p>ชื่อที่แสดงใน prompt (hostname) ระบุอุปกรณ์แต่ละตัว default คือ <b>Huawei</b> ตั้งด้วย <code>sysname hostname</code> ใน system view</p>
<pre><code>&lt;Huawei&gt;system-view
[Huawei]sysname Huawei-AR-01
[Huawei-AR-01]</code></pre>
<h4>Device clock</h4>
<p>System clock = <b>UTC + time zone offset</b> อุปกรณ์ Huawei ใช้ UTC เป็น default แต่ไม่ได้ตั้ง time zone จึงต้องรู้เขตเวลาก่อน รองรับระบบ <b>24 ชั่วโมงเท่านั้น</b> และตั้งใน <b>user view</b></p>
<pre><code>&lt;Huawei&gt;clock timezone BJ add 8:00              # รูปแบบ: clock timezone name {add | minus} offset
&lt;Huawei&gt;clock datetime 16:37:00 2020-10-19     # รูปแบบ: clock datetime HH:MM:SS YYYY-MM-DD
&lt;Huawei&gt;display clock
2020-10-19 16:37:07
Monday
Time Zone(BJ) : UTC+08:00</code></pre>
<p><b>add</b> = เวลาท้องถิ่นเร็วกว่า UTC (บวก offset), <b>minus</b> = ช้ากว่า UTC (ลบ offset)</p>
<h4>Interface IP address</h4>
<p>ต้องมี IP address ที่ interface จึงรัน IP service ได้ ปกติ interface มี 1 address ถ้าตั้งใหม่จะ<b>แทนที่</b>ของเดิม รูปแบบ <code>ip address ip-address {mask | mask-length}</code></p>
<pre><code>[Huawei]interface Ethernet 0/0/0
[Huawei-Ethernet0/0/0]ip address 192.168.1.1 255.255.255.0   # หรือ ... 24
[Huawei-Ethernet0/0/0]undo shutdown                           # เปิด interface (ปกติ up อยู่แล้ว)
[Huawei-Ethernet0/0/0]ip address 192.168.2.1 24 sub           # address ที่สอง (sub) ต้องอยู่คนละ network
[Huawei-Ethernet0/0/0]display this
interface Ethernet0/0/0
 ip address 192.168.1.1 255.255.255.0
 ip address 192.168.2.1 255.255.255.0 sub
[Huawei-Ethernet0/0/0]undo ip address                         # ลบ address</code></pre>
<p>กรณีต้องมีหลาย address: PC1, PC2 อยู่ 192.168.1.0/24 และ PC3, PC4 อยู่ 192.168.2.0/24 ต่อ switch SW1 เดียวกัน (physical segment เดียว แต่ <b>logical segment สอง</b>) การสื่อสารข้ามกลุ่มต้องผ่าน router จึงต้องตั้ง 2 address บน Ethernet0/0/0 ของ AR1 เป็น gateway ของทั้งสองกลุ่ม</p>
<figure><img src="i/p113_1.webp" alt="physical network segment เดียวแต่แบ่งเป็นสอง logical segment และ router AR1 มีสอง IP บน interface เดียว" loading="lazy"><figcaption>Fig. 3.15 Physical network segments และ logical network segments</figcaption></figure>
<pre><code>&lt;Huawei&gt;display ip interface brief
Interface       IP Address/Mask    Physical  Protocol
Ethernet0/0/0   192.168.1.1/24     up        up
NULL0           unassigned         up        up(s)
Vlanif1         192.168.10.1/24    up        up</code></pre>
<p><code>display ip interface brief</code> ดูสรุป IP ของทุก interface และสถานะ <b>Physical</b> กับ <b>Protocol</b> ถ้า interface ถูก shutdown ด้วยมือต้อง <code>undo shutdown</code> หลังตั้ง IP; <b>Loopback</b> เป็น interface เชิงตรรกะ ใช้จำลอง network/host และเป็น management interface เพราะเสถียร</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><code>sysname</code> ทำใน system view | <code>clock</code> ทำใน user view | <code>ip address</code> ทำใน interface view</li>
<li>ตั้ง IP ใหม่ทับของเดิม; หลาย address ใช้ keyword <b>sub</b></li>
<li><code>shutdown</code> ปิด interface, <code>undo shutdown</code> เปิด; <code>undo ip address</code> ลบ IP</li>
</ul></div>`
    },
    {
      t: "Configuration File และการ save",
      ref: "หน้า 114-119",
      html: `
<p>config ใหม่มีผลทันที (เรียก <b>current configuration</b>) แต่เก็บอยู่ใน memory ถ้าไฟดับหรือ reboot จะหาย ต้อง save ลง external memory (flash) จึงคงอยู่</p>
<table>
<tr><th>แนวคิด</th><th>ที่เก็บ</th><th>รายละเอียด</th></tr>
<tr><td><b>Current configuration</b></td><td>memory</td><td>ค่าที่ใช้งานอยู่ แก้ใน system view; หายเมื่อ reboot</td></tr>
<tr><td><b>Configuration file</b></td><td>external memory (flash, ไม่ใช่ memory)</td><td>ไฟล์ <code>*.cfg</code> หรือ <code>*.zip</code>; ชื่อ default <b>vrpcfg.zip</b> ใน root directory; ใช้ backup/ย้าย config ไปอุปกรณ์อื่นได้</td></tr>
<tr><td><b>Config file ของการ startup ครั้งถัดไป</b></td><td>flash</td><td>default คือ vrpcfg.zip; กำหนดเปลี่ยนได้</td></tr>
</table>
<p>เมื่ออุปกรณ์ boot จะโหลดไฟล์ config จาก storage ถ้าไม่มีไฟล์ จะใช้พารามิเตอร์ default</p>
<h4>Manual save</h4>
<p>รูปแบบ <code>save [configuration-file]</code> (ชื่อไฟล์ต้องเป็น *.cfg หรือ *.zip) ถ้าไม่ระบุชื่อจะเป็น vrpcfg.zip ทำใน user view แล้วตอบ <code>y</code></p>
<pre><code>&lt;R1&gt;save
The current configuration will be written to the device.
Are you sure to continue? (y/n)[n]:y
Configuration file had been saved successfully

&lt;Huawei&gt;save backup.zip          # save เป็นอีกไฟล์ (backup)
Are you sure to save the configuration to backup.zip? (y/n)[n]:y</code></pre>
<h4>Autosave</h4>
<p>ช่วยลดความเสี่ยงที่ลืม save เป็น <b>default ปิด</b> มี 2 แบบ ซึ่ง<b>เปิดพร้อมกันไม่ได้</b></p>
<table>
<tr><th>แบบ</th><th>เปิด</th><th>ตั้งค่า</th><th>Default</th></tr>
<tr><td><b>autosave interval</b></td><td><code>autosave interval on</code></td><td><code>autosave interval time</code> (นาที)</td><td>1440 นาที (24 ชม.); save ทุกช่วงเวลาไม่ว่า config เปลี่ยนหรือไม่</td></tr>
<tr><td><b>autosave time</b></td><td><code>autosave time on</code></td><td><code>autosave time hh:mm:ss</code></td><td>08:00:00 save วันละครั้งตามเวลา</td></tr>
</table>
<pre><code>&lt;R1&gt;autosave interval on
&lt;R1&gt;autosave interval 120             # ทุก 120 นาที
&lt;R1&gt;autosave interval off
&lt;R1&gt;autosave time on
&lt;R1&gt;autosave time 12:00:00            # ทุกวันเวลา 12:00</code></pre>
<h4>กำหนด config file สำหรับ boot ถัดไป</h4>
<p>ไฟล์ *.cfg หรือ *.zip ใน root ของ external memory ตั้งเป็น config ของ startup ถัดไปได้ด้วย <code>startup saved-configuration configuration-file</code> ถ้าไฟล์ไม่อยู่ใน root จะตั้งไม่สำเร็จ</p>
<pre><code>&lt;R1&gt;startup saved-configuration backup.zip
Info: Succeeded in setting the file for booting system
&lt;R1&gt;display startup
Startup saved-configuration file:       flash:/vrpcfg.zip
Next startup saved-configuration file:  flash:/backup.zip</code></pre>
<div class="warn"><b>⚠️ ระวัง</b> หลังตั้งไฟล์ boot ถัดไปแล้ว การ save (รวมถึง autosave) จะเขียนทับไฟล์นั้นโดย default ไม่ใช่ vrpcfg.zip</div>
<h4>คำสั่ง display</h4>
<ul>
<li><code>display current-configuration</code>: config ที่ใช้อยู่ตอนนี้ (เพิ่ม <code>section user-interface</code> เพื่อดูบางส่วน)</li>
<li><code>display saved-configuration</code>: config ที่ save ไว้</li>
<li><code>display startup</code>: ไฟล์ที่เกี่ยวกับ startup ปัจจุบันและครั้งถัดไป (system software, config, license, patch, voice); "Startup saved-configuration file" = ใช้ boot รอบนี้, "Next startup ..." = รอบหน้า</li>
</ul>
<p>ถ้ายังไม่ save current กับ saved อาจต่างกัน; ถ้า save แล้วไม่ config เพิ่มจะเหมือนกัน</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>save = บันทึก <b>configuration</b> ลง flash (ไม่ใช่เวลาระบบ) ที่ <code>vrpcfg.zip</code> default</li>
<li>current config อยู่ใน memory; saved config อยู่ใน flash</li>
<li>interval กับ time autosave เปิดพร้อมกันไม่ได้; default ปิดทั้งคู่</li>
</ul></div>`
    },
    {
      t: "File Management บน VRP",
      ref: "หน้า 119-121",
      html: `
<p>VRP จัดการไฟล์ทั้งหมด (config file, system file, license, patch) และ directory ผ่าน <b>file system</b> เพื่อ create, delete, modify, copy, display ไฟล์ ซึ่งเก็บใน external memory: router ใช้ <b>Flash และ SD card</b>, switch ใช้ <b>Flash และ CF card</b> (Flash เทียบกับ harddisk ของคอมพิวเตอร์)</p>
<p>ไฟล์ <b>system software</b> นามสกุล <b>.cc</b> สำคัญที่สุดเพราะเป็นตัว VRP OS เอง ต้องอยู่ใน <b>root directory</b> ของ external memory และถูกโหลดเข้า memory ตอน boot</p>
<table>
<tr><th>งาน</th><th>คำสั่ง</th></tr>
<tr><td>ดูไฟล์</td><td><code>dir [/all] [filename | directory]</code> (/all รวมไฟล์ใน recycle bin)</td></tr>
<tr><td>สร้าง directory</td><td><code>mkdir directory</code></td></tr>
<tr><td>copy</td><td><code>copy source-filename destination-filename</code></td></tr>
<tr><td>ย้าย/เปลี่ยนชื่อ</td><td><code>move source destination</code> (ใน directory เดียวกันคือ rename)</td></tr>
<tr><td>เปลี่ยน/ดู path</td><td><code>cd directory</code>, <code>pwd</code></td></tr>
<tr><td>ลบ (ไป recycle bin)</td><td><code>delete filename</code> กู้ด้วย <code>undelete</code></td></tr>
<tr><td>ลบถาวร</td><td><code>delete /unreserved filename</code></td></tr>
<tr><td>ลบโดยไม่ถาม</td><td><code>delete /force filename</code></td></tr>
<tr><td>ล้าง recycle bin</td><td><code>reset recycle-bin</code> (ถาวร กู้ไม่ได้)</td></tr>
</table>
<pre><code>&lt;R1&gt;dir
Directory of flash:/
  0 drw-       - May 01 2018 02:51:18   dhcp          # d = directory
  6 -rw-     872 May 01 2018 07:27:28   vrpcfg.zip

&lt;R1&gt;mkdir /backup
&lt;R1&gt;copy vrpcfg.zip flash:/backup/cfgbak.zip          # backup config
&lt;R1&gt;dir flash:/backup/
&lt;R1&gt;delete backup.zip                                 # ไป recycle bin
&lt;R1&gt;dir /all                                           # เห็น [backup.zip] ใน recycle bin
&lt;R1&gt;reset recycle-bin                                  # ลบถาวร
&lt;R1&gt;move backup.zip flash:/backup/backup1.zip
&lt;R1&gt;cd backup/
&lt;R1&gt;pwd
flash:/backup
&lt;R1&gt;move backup1.zip backup2.zip                       # rename</code></pre>
<div class="warn"><b>⚠️ ระวัง</b> ไฟล์ที่ <code>delete</code> ธรรมดาไป recycle bin <b>ยังกินพื้นที่</b> ต้อง <code>reset recycle-bin</code> หรือใช้ <code>delete /unreserved</code> เพื่อคืนพื้นที่จริง</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลบถาวร: <code>delete /unreserved</code> | กู้ไฟล์: <code>undelete</code> | ล้างถังขยะ: <code>reset recycle-bin</code></li>
<li>VRP system software = <code>.cc</code> ใน root; config = <code>*.cfg</code>/<code>*.zip</code></li>
<li>Backup config: <code>copy vrpcfg.zip flash:/backup/cfgbak.zip</code></li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `วิศวกรเพิ่งแกะกล่อง router Huawei เครื่องใหม่ ยังไม่มี IP ใด ๆ และไม่เคยตั้งค่ามาก่อน เขาต้องการเข้าไป config ครั้งแรก`,
      q: "ควร login ด้วยช่องทางใด?",
      opts: [
        { t: "Console port ด้วยสาย console ต่อเข้า COM port (หรือ USB to RS232)", why: "ถูก: ตอน config ครั้งแรกใช้ Console port เพราะ Telnet/SSH/Web ต้องมี IP และ config ก่อน" },
        { t: "Telnet ไปยัง IP default ของ router", why: "ผิด: อุปกรณ์ใหม่เป็น config ว่าง ไม่มี IP และ VTY ยังไม่ได้ตั้งค่า" },
        { t: "SSH ผ่าน VTY ทันที", why: "ผิด: ต้องตั้ง AAA, rsa key และ stelnet ก่อน" },
        { t: "Web เข้า https://10.1.1.1", why: "ผิด: ต้องตั้ง management IP และเปิด http server ก่อน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลล็อกอิน router แล้วเห็น prompt เป็น &lt;R1&gt; เขาพิมพ์ sysname Core-R1`,
      q: "จะเกิดอะไรขึ้น และต้องทำอย่างไรให้เปลี่ยนชื่อได้?",
      opts: [
        { t: "คำสั่งใช้ไม่ได้เพราะอยู่ใน user view ต้อง system-view ก่อนแล้วจึง sysname Core-R1", why: "ถูก: sysname เป็นคำสั่ง config ใน system view; หลังเปลี่ยน prompt จะเป็น [Core-R1]" },
        { t: "เปลี่ยนได้ทันที prompt เป็น <Core-R1>", why: "ผิด: user view ทำ config ฟังก์ชัน service ไม่ได้" },
        { t: "ต้อง interface view ก่อน", why: "ผิด: ชื่ออุปกรณ์เป็น global parameter ใน system view" },
        { t: "ต้องใช้ save ก่อน", why: "ผิด: save เก็บ config ลง flash ไม่เกี่ยวกับการเข้า view" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการตั้ง IP ให้ GigabitEthernet0/0/0 เป็น 192.168.10.1/24 โดยอยู่ที่ prompt [R1]`,
      q: "ลำดับคำสั่งข้อใดถูกต้อง?",
      opts: [
        { t: "interface GigabitEthernet 0/0/0 แล้ว ip address 192.168.10.1 24", why: "ถูก: ต้องเข้า interface view ก่อนจึงตั้ง ip address (24 หรือ 255.255.255.0 ก็ได้)" },
        { t: "ip address 192.168.10.1 24 ที่ [R1] ได้เลย", why: "ผิด: ip address ใช้ใน interface view ไม่ใช่ system view" },
        { t: "ip address GigabitEthernet 0/0/0 192.168.10.1 24", why: "ผิด: รูปแบบคำสั่งไม่ถูก ชื่อ interface ไม่ใช่ parameter ของ ip address" },
        { t: "set ip 192.168.10.1/24 GigabitEthernet0/0/0", why: "ผิด: ไม่ใช่ syntax ของ VRP" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลพิมพ์ dis c ที่ &lt;Huawei&gt; เพื่อหวังจะรัน display current-configuration แต่ระบบแจ้งว่าคำสั่งกำกวม`,
      q: "สาเหตุคืออะไร และแก้อย่างไร?",
      opts: [
        { t: "มีหลายคำสั่งขึ้นต้นด้วย dis c (display clock, display cpu-defend ฯลฯ) ต้องพิมพ์เพิ่มเป็น dis cu", why: "ถูก: incomplete keyword ใช้ได้เมื่อระบุ keyword ได้เพียงตัวเดียว" },
        { t: "keyword ต้องพิมพ์ตัวใหญ่", why: "ผิด: keyword ไม่ case-sensitive" },
        { t: "ย่อคำสั่งไม่ได้เลยใน VRP", why: "ผิด: VRP รองรับการย่อถ้าไม่กำกวม" },
        { t: "ต้องใช้ system-view ก่อน", why: "ผิด: display ใช้ใน user view ได้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลจำได้ว่าคำสั่งขึ้นต้นด้วย "dis" แต่ไม่แน่ใจว่าเต็ม ๆ คืออะไร และไม่รู้ว่าหลังจากนั้น keyword ไหนมีให้เลือก`,
      q: "ขั้นตอนใดที่ถูกต้องเพื่อดู keyword ที่ตามหลัง display ทั้งหมด?",
      opts: [
        { t: "พิมพ์ display ? (เว้นวรรคก่อน ?)", why: "ถูก: full help แสดง keyword ถัดไปทั้งหมด" },
        { t: "พิมพ์ display? (ติดกัน)", why: "ผิด: ติดกันเป็น partial help แสดง keyword ที่ขึ้นต้นด้วยข้อความที่พิมพ์ (ในที่นี้ display เอง)" },
        { t: "พิมพ์ help display", why: "ผิด: VRP ใช้ ? เป็น online help" },
        { t: "กด Ctrl+Z", why: "ผิด: Ctrl+Z คือกลับ user view" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลกำลังอยู่ที่ [R1-GigabitEthernet0/0/0] ในระหว่างตั้ง IP มี view ซ้อนหลายชั้น และต้องการกลับ user view &lt;R1&gt; ให้เร็วที่สุดเพื่อรัน save`,
      q: "วิธีใดทำได้ทันทีโดยไม่ต้องสั่งหลายครั้ง?",
      opts: [
        { t: "return หรือ Ctrl+Z", why: "ถูก: กลับ user view ทันทีจากทุก view" },
        { t: "quit ครั้งเดียว", why: "ผิด: quit ถอยกลับเพียงหนึ่งชั้น (ไป system view)" },
        { t: "undo system-view", why: "ผิด: undo ใช้ลบ/ปิด config ไม่ใช่เปลี่ยน view (และไม่ใช่วิธีกลับ user view)" },
        { t: "Ctrl+C", why: "ผิด: Ctrl+C หยุดการทำงานที่กำลังรัน ไม่ใช่การเปลี่ยน view" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลเคยตั้ง ftp server enable ไว้ แต่ต่อมานโยบายความปลอดภัยกำหนดให้ปิดบริการ FTP`,
      q: "ควรใช้คำสั่งใดใน system view?",
      opts: [
        { t: "undo ftp server", why: "ถูก: undo ใช้ปิด function ที่เปิดไว้" },
        { t: "ftp server disable", why: "ผิด: VRP ใช้ undo นำหน้าคำสั่งเดิม ไม่ใช้ disable" },
        { t: "shutdown ftp", why: "ผิด: shutdown ใช้กับ interface" },
        { t: "delete ftp server", why: "ผิด: delete เป็นคำสั่งของ file system" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลที่มี user level 2 พยายามรัน save และ copy ไฟล์ config ในอุปกรณ์ แต่ระบบปฏิเสธคำสั่ง`,
      q: "สาเหตุใดสอดคล้องกับหนังสือที่สุด?",
      opts: [
        { t: "คำสั่งเกี่ยวกับ file system/config file เป็น command level 3 (management) ซึ่ง user level 2 ใช้ไม่ได้", why: "ถูก: user ใช้ได้เฉพาะ command ระดับเท่ากับหรือต่ำกว่าตน level 2 ทำ config service ได้แต่ไม่ถึง management" },
        { t: "user level 2 ใช้ได้ทุกคำสั่ง", why: "ผิด: ใช้ได้ทุกคำสั่งตั้งแต่ level 3" },
        { t: "คำสั่งเหล่านี้เป็น visit level", why: "ผิด: visit level คือ ping, tracert, telnet" },
        { t: "ต้องรีบูตก่อนจึงใช้ได้", why: "ผิด: ไม่เกี่ยวกับการรีบูต" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการให้ผู้ดูแลหลายคน login Telnet ได้พร้อมกัน 15 คน ผู้ใช้ต้อง config service ได้แต่ไม่ต้องสิทธิ์สูงสุด และต้องตรวจสอบด้วย username/password`,
      q: "ชุดคำสั่งใดตรงกับความต้องการที่สุด?",
      opts: [
        { t: "user-interface maximum-vty 15; user-interface vty 0 14; user privilege level 2; authentication-mode aaa", why: "ถูก: VTY 0-14 รวม 15 ตัว, level 2 คือ configuration, AAA ต้องใส่ username/password" },
        { t: "user-interface vty 0 15; user privilege level 3; authentication-mode password", why: "ผิด: VTY ที่เลขสูงสุดคือ 14 (15 ตัว), level 3 สูงเกินความต้องการ และ password ไม่ได้ตรวจ username" },
        { t: "user-interface console 0; user privilege level 2; authentication-mode aaa", why: "ผิด: console คือ UI ของ port ทางกายภาพ ไม่ใช่ Telnet" },
        { t: "user-interface vty 0 14; user privilege level 0; authentication-mode none", why: "ผิด: level 0 config ไม่ได้และ none ไม่มีการตรวจสอบ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลสร้าง local-user admin เพื่อใช้ Telnet แล้วตั้ง authentication-mode aaa บน VTY 0 14 แล้ว แต่ login ด้วย Telnet ไม่ผ่านแม้ใส่ username และ password ถูกต้อง การตรวจสอบพบว่ามีเพียง local-user admin password cipher admin@123 ที่ตั้งไว้`,
      q: "ขาดคำสั่งใดที่สำคัญที่สุด?",
      opts: [
        { t: "local-user admin service-type telnet", why: "ถูก: ต้องกำหนด service type ให้ user เพื่ออนุญาตการเข้าด้วย Telnet" },
        { t: "rsa local-key-pair create", why: "ผิด: ใช้กับ SSH ไม่ใช่ Telnet" },
        { t: "http server enable", why: "ผิด: ใช้กับ Web login" },
        { t: "undo shutdown", why: "ผิด: ใช้เปิด interface ซึ่งปกติ up อยู่แล้ว" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทตรวจพบว่าการ login ระยะไกลด้วย Telnet ทำให้ username และ password ถูกดักได้บน network จึงต้องเปลี่ยนวิธี`,
      q: "ควรเปลี่ยนเป็นอะไร และต้องทำคำสั่งใดเพิ่มบน VTY?",
      opts: [
        { t: "SSH; ตั้ง service-type ssh, stelnet server enable, rsa local-key-pair create และ protocol inbound ssh บน VTY", why: "ถูก: SSH เข้ารหัสข้อมูล ส่วนขั้นตอนเหล่านี้คือชุด config ของ SSH" },
        { t: "Telnet แต่ใช้ authentication-mode none", why: "ผิด: ยิ่งไม่ปลอดภัย" },
        { t: "Console เท่านั้น โดยเปิด http server", why: "ผิด: http server ไม่เกี่ยวกับ Console และไม่แก้ปัญหา remote" },
        { t: "ปิด AAA แล้วใช้ password เดียว", why: "ผิด: ข้อมูลยังเป็น plain text" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการตั้งนาฬิกา router ที่ติดตั้งที่กรุงเทพ (UTC+7) ให้เป็นเวลา 09:30:00 วันที่ 2024-03-15`,
      q: "ชุดคำสั่งใดถูกต้องและ prompt ที่ใช้คือแบบใด?",
      opts: [
        { t: "<Huawei>clock timezone BKK add 7:00 และ <Huawei>clock datetime 09:30:00 2024-03-15 (user view)", why: "ถูก: UTC+7 ใช้ add 7:00; รูปแบบ datetime HH:MM:SS YYYY-MM-DD และทำใน user view" },
        { t: "[Huawei]clock timezone BKK minus 7:00 และ clock datetime 2024-03-15 09:30:00", why: "ผิด: UTC+7 ใช้ add ไม่ใช่ minus, ลำดับ datetime ผิด และคำสั่งนี้อยู่ใน user view" },
        { t: "<Huawei>clock datetime 9:30 PM 2024-03-15", why: "ผิด: รองรับเฉพาะระบบ 24 ชั่วโมง" },
        { t: "[Huawei]sysname BKK", why: "ผิด: นี่คือตั้งชื่ออุปกรณ์ ไม่ใช่นาฬิกา" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลแก้ config หลายอย่างบน router แล้วไฟฟ้าดับ เมื่อเครื่องกลับมา config ที่เพิ่งแก้หายไป เขาไม่เคยรันคำสั่ง save และไม่เคยเปิด autosave`,
      q: "เกิดเพราะเหตุใด?",
      opts: [
        { t: "current configuration อยู่ใน memory และไม่ได้ save ลง flash เมื่อไฟดับจึงหาย", why: "ถูก: ต้อง save (หรือเปิด autosave) จึงเก็บใน configuration file" },
        { t: "config ถูกเก็บใน flash อยู่แล้ว แต่ระบบลบเมื่อ boot", why: "ผิด: ไม่ save ค่าไม่ได้ลง flash" },
        { t: "autosave เปิดเป็น default จึงสำรองให้ตลอด", why: "ผิด: autosave default ปิด" },
        { t: "vrpcfg.zip ถูกลบเพราะไฟดับ", why: "ผิด: ไฟล์เก่ายังอยู่ แค่ไม่มีค่าใหม่" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลรัน &lt;R1&gt;save backup.zip แล้วรัน startup saved-configuration backup.zip จากนั้นแก้ config เพิ่มและรัน save โดยไม่ระบุชื่อไฟล์`,
      q: "การ save ครั้งล่าสุดเขียนลงไฟล์ใด?",
      opts: [
        { t: "backup.zip เพราะเป็น config file ของ startup ถัดไป", why: "ถูก: หลังกำหนด next startup file การ save จะเขียนลงไฟล์นั้นโดย default (ทับเนื้อหาเดิม)" },
        { t: "vrpcfg.zip เสมอ", why: "ผิด: vrpcfg.zip เป็นเพียง default ก่อนที่จะกำหนดไฟล์ startup ใหม่" },
        { t: "ไม่ save ที่ใดเลย", why: "ผิด: save สำเร็จได้ตามปกติ" },
        { t: "ไฟล์ใหม่ที่ระบบตั้งชื่อเอง", why: "ผิด: ไม่มีการสร้างไฟล์ชื่อสุ่ม" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการ save config ทุกวันเวลา 12:00:00 โดยก่อนหน้านี้เปิด autosave interval ไว้`,
      q: "ลำดับคำสั่งที่ถูกต้องคืออะไร?",
      opts: [
        { t: "autosave interval off; autosave time on; autosave time 12:00:00", why: "ถูก: interval กับ time เปิดพร้อมกันไม่ได้ ต้องปิดตัวแรกก่อน" },
        { t: "autosave time on; autosave time 12:00:00 โดยไม่ปิด interval", why: "ผิด: เปิดพร้อมกันไม่ได้" },
        { t: "autosave interval 12:00:00", why: "ผิด: interval หน่วยเป็นนาที ไม่ใช่เวลาของวัน" },
        { t: "save time 12:00:00", why: "ผิด: ไม่มีคำสั่งนี้" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `flash มีพื้นที่ใกล้เต็ม ผู้ดูแลต้องการลดพื้นที่ที่ใช้จริงโดยลบไฟล์ patch.zip เก่า ซึ่งไม่ต้องการกู้คืนอีก`,
      q: "คำสั่งใดทำให้ไฟล์หายถาวรและคืนพื้นที่ทันที?",
      opts: [
        { t: "delete /unreserved patch.zip", why: "ถูก: /unreserved ลบถาวรโดยไม่เข้า recycle bin" },
        { t: "delete patch.zip", why: "ผิด: ไฟล์ไป recycle bin และยังกินพื้นที่" },
        { t: "delete /force patch.zip", why: "ผิด: /force แค่ข้ามการถามยืนยัน ไฟล์ยังเข้า recycle bin" },
        { t: "undelete patch.zip", why: "ผิด: undelete คือกู้ไฟล์" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องการวิเคราะห์หน้า display user-interface ซึ่งมีแถว "+ 129 VTY 0 ... Privi 2 ... A" และ "+ 0 CON 0 ... Privi 15 ... P"`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "VTY 0 มี absolute number 129", ok: true, why: "ถูก: VTY 0-14 = absolute 129-143" },
        { t: "CON 0 login ด้วย password authentication", ok: true, why: "ถูก: P = ใช้ password ของ UI" },
        { t: "VTY 0 ใช้ AAA ต้องใส่ username และ password", ok: true, why: "ถูก: A = AAA" },
        { t: "VTY 0 มี privilege level 2 จึงใช้ command ระดับ 0 ถึง 2 ได้", ok: true, why: "ถูก: ใช้ได้ระดับเท่ากับหรือต่ำกว่า" },
        { t: "CON 0 มี absolute number 129", ok: false, why: "ผิด: CON 0 absolute = 0" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องจัดการ command line ของ VRP ประจำวัน`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับการใช้ command line",
      opts: [
        { t: "Keyword ไม่ case-sensitive", ok: true, why: "ถูก" },
        { t: "พิมพ์ได้ยาวสูงสุด 510 ตัวอักษรต่อ command", ok: true, why: "ถูก" },
        { t: "กด Tab เพื่อให้ระบบเติม keyword ที่ไม่ครบอัตโนมัติ", ok: true, why: "ถูก" },
        { t: "ใช้ quit เพื่อกลับ user view ได้ทันทีจากทุก view", ok: false, why: "ผิด: quit ถอยทีละชั้น ใช้ return หรือ Ctrl+Z เพื่อกลับ user view ทันที" },
        { t: "คำสั่ง undo นำหน้าใช้คืนค่า default หรือลบ config ได้", ok: true, why: "ถูก" }
      ]
    },
    {
      type: "multi",
      story: `ต้องการสร้างผู้ใช้ han ให้ config router ผ่าน Telnet ด้วย privilege level 3 โดยอยู่ใน AAA view`,
      q: "เลือกทุกคำสั่งที่จำเป็นต้องมี (เลือกครบ)",
      opts: [
        { t: "local-user han password cipher huawei3", ok: true, why: "ถูก: กำหนด password (ถ้าทำพร้อม privilege ระบุ level 3 ได้ในบรรทัดเดียวกัน)" },
        { t: "local-user han privilege level 3", ok: true, why: "ถูก: กำหนด privilege level ของผู้ใช้" },
        { t: "local-user han service-type telnet", ok: true, why: "ถูก: อนุญาตการเข้าแบบ Telnet" },
        { t: "local-user han service-type http", ok: false, why: "ผิด: http ใช้กับ Web ไม่ใช่ Telnet" },
        { t: "rsa local-key-pair create", ok: false, why: "ผิด: ใช้กับ SSH" }
      ]
    },
    {
      type: "multi",
      story: `ตรวจสอบความเข้าใจเรื่อง configuration file`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ไฟล์ config ชื่อ default คือ vrpcfg.zip ใน root ของ flash", ok: true, why: "ถูก" },
        { t: "current configuration เก็บใน memory และหายเมื่อ reboot", ok: true, why: "ถูก" },
        { t: "display saved-configuration ดู config ที่ save ไว้", ok: true, why: "ถูก" },
        { t: "ชื่อไฟล์ที่ save ต้องเป็น *.cfg หรือ *.zip", ok: true, why: "ถูก" },
        { t: "save คือคำสั่งบันทึกเวลาของระบบ", ok: false, why: "ผิด: save บันทึก configuration ไม่ใช่เวลา" }
      ]
    },
    {
      type: "blank",
      story: `สรุประดับ command และ privilege`,
      text: `VRP command มี {1} ระดับ ได้แก่ visit, monitoring, configuration และ management; user privilege level มีตั้งแต่ 0 ถึง {2}; โดย default user level {3} ขึ้นไปใช้ได้ทุกคำสั่ง; ผู้ใช้ Telnet มี level เริ่มต้นเป็น {4}`,
      blanks: [
        { opts: ["3", "4", "8", "16"], ans: 1, why: "level 0-3 รวม 4 ระดับ" },
        { opts: ["3", "7", "15", "16"], ans: 2, why: "user มี 16 ระดับ คือ 0 ถึง 15" },
        { opts: ["1", "2", "3", "15"], ans: 2, why: "level 3 ขึ้นไปใช้ได้ทุกคำสั่ง" },
        { opts: ["0", "1", "2", "3"], ans: 0, why: "ผู้ใช้ Telnet default level 0" }
      ]
    },
    {
      type: "blank",
      story: `เติมเลขของ user interface`,
      text: `Console มี relative number {1} และ absolute number {2}; VTY 0 มี absolute number {3}; VTY ตัวสุดท้ายในกลุ่ม 15 ตัวคือ VTY {4}`,
      blanks: [
        { opts: ["CON 0", "CON 1", "VTY 0", "AUX 0"], ans: 0, why: "Console คือ CON 0" },
        { opts: ["0", "1", "128", "129"], ans: 0, why: "absolute ของ CON 0 = 0" },
        { opts: ["0", "1", "129", "143"], ans: 2, why: "VTY 0 = 129" },
        { opts: ["10", "14", "15", "16"], ans: 1, why: "VTY 0-14 = 15 ตัว" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์ขั้นตอนการ login ผ่านช่องทางต่าง ๆ`,
      text: `Telnet ใช้ TCP port {1} และส่งข้อมูลแบบ {2}; จึงควรใช้ {3} ที่เข้ารหัสแทน; ส่วน Web login ต้องรันคำสั่ง {4} ก่อนเข้า https://IP`,
      blanks: [
        { opts: ["21", "22", "23", "80"], ans: 2, why: "Telnet = 23" },
        { opts: ["plain text", "cipher text", "binary เข้ารหัส", "บีบอัด"], ans: 0, why: "Telnet ไม่เข้ารหัส" },
        { opts: ["SSH", "FTP", "TFTP", "HTTP"], ans: 0, why: "SSH เข้ารหัสและปลอดภัยกว่า" },
        { opts: ["http server enable", "stelnet server enable", "telnet server enable", "web enable"], ans: 0, why: "ต้องเปิด http server" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์ไฟล์และการลบ`,
      text: `ไฟล์ที่ลบด้วย delete ธรรมดาจะไปอยู่ใน {1} และยังกินพื้นที่; กู้ไฟล์ด้วย {2}; ลบถาวรทันทีด้วย {3}; ล้างถังขยะด้วย {4}`,
      blanks: [
        { opts: ["recycle bin", "RAM", "NVRAM", "SD card"], ans: 0, why: "ไฟล์ที่ถูกลบจะอยู่ใน recycle bin" },
        { opts: ["undelete", "restore", "recover", "unreserved"], ans: 0, why: "undelete กู้ไฟล์จาก recycle bin" },
        { opts: ["delete /unreserved", "delete /force", "reset recycle-bin", "undo delete"], ans: 0, why: "/unreserved ข้าม recycle bin" },
        { opts: ["reset recycle-bin", "clear flash", "undelete /all", "format"], ans: 0, why: "reset recycle-bin ลบทั้งหมดถาวร" }
      ]
    },
    {
      type: "match",
      q: "จับคู่คำสั่งกับ view ที่ต้องใช้",
      pairs: [
        ["sysname R1", "system view"],
        ["ip address 10.1.1.1 24", "interface view"],
        ["clock timezone BJ add 8:00", "user view"],
        ["authentication-mode password", "user-interface view"],
        ["local-user admin service-type telnet", "AAA view"]
      ],
      why: "แต่ละ view รองรับคำสั่งตามประเภทฟังก์ชันที่ลงทะเบียนไว้"
    },
    {
      type: "match",
      q: "จับคู่คำสั่งกับหน้าที่",
      pairs: [
        ["display current-configuration", "ดู config ที่ใช้อยู่ใน memory"],
        ["display saved-configuration", "ดู config ที่ save ไว้ใน flash"],
        ["display startup", "ดูไฟล์ที่ใช้ boot ปัจจุบันและครั้งถัดไป"],
        ["startup saved-configuration backup.zip", "กำหนด config file ที่โหลดตอน boot ครั้งถัดไป"],
        ["display ip interface brief", "ดูสรุป IP และสถานะ Physical/Protocol ของ interface"]
      ],
      why: "คำสั่ง display ดูสถานะ ส่วน startup saved-configuration เปลี่ยนค่าที่ใช้ตอน boot"
    }
  ]
});
