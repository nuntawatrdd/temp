IOT.reg({
  id: "c9",
  title: "ACL and AAA",
  th: "Access Control List (basic/advanced, rule-id, wildcard mask, การผูกกับ interface) และ AAA (Authentication, Authorization, Accounting) แบบ local และ RADIUS",
  summary: `
<ul>
<li><b>ACL</b> = ชุดกฎ <code>permit | deny</code> ที่ router/switch ใช้จับคู่กับ packet; ตรวจเรียงตาม <b>rule-id จากน้อยไปมาก</b> เจอ rule แรกที่ match แล้ว <b>หยุด</b> ไม่ดู rule ถัดไป</li>
<li>ถ้าไม่ match rule ใดเลย: Huawei router ใช้ <b>implicit default = permit</b> (จึงมักใส่ <code>deny</code> ท้ายสุดเอง)</li>
<li><b>rule-id</b>: กำหนดเองหรือรันเอง; default <b>step = 5</b> (5, 10, 15 ...); เว้นช่วงไว้เพื่อ <b>insert</b> rule ใหม่</li>
<li><b>ชนิดและเลข</b>: Basic <b>2000-2999</b> (ดูแค่ source IP, fragment, time-range); Advanced <b>3000-3999</b> (source/destination IP, protocol, port, DSCP ...); Layer 2 <b>4000-4999</b>; User-defined <b>5000-5999</b></li>
<li><b>Wildcard mask</b>: bit <b>0 = ต้องตรง (match)</b>, bit <b>1 = ไม่สน (ignore)</b>; 0.0.0.0 = เครื่องเดียว (host); 255.255.255.255 = ทุก address; ต่างจาก subnet mask และ 0/1 ไม่ต้องต่อเนื่องก็ได้ (เช่น 0.0.0.254 จับ address เลขคี่)</li>
<li><b>หลักวาง rule</b>: ถ้า address ซ้อนกัน วาง rule ที่ <b>เฉพาะเจาะจงกว่า (ช่วงเล็กกว่า) ไว้ก่อน</b></li>
<li><b>ผูก ACL</b>: <code>traffic-filter inbound|outbound acl N</code> ต่อ interface; ต่อ 1 interface 1 ทิศมี ACL ได้ <b>1 ตัว</b>; ACL 1 ตัวผูกได้หลาย interface; ทิศมองจากมุม router (เข้า = inbound)</li>
<li>การลบ ACL (<code>undo acl</code>) <b>ไม่ลบ binding</b> ที่ interface ต้อง <code>undo traffic-filter inbound|outbound</code> เอง</li>
<li><b>Basic ACL</b> ควรวางใกล้ปลายทาง (ตามตัวอย่างในหนังสือ) เพราะดูแค่ source; Advanced ACL เจาะจงได้ละเอียด</li>
<li><b>Port ที่ใช้บ่อย</b>: DNS = UDP 53; HTTP = TCP 80 (<code>www</code>); HTTPS = TCP 443; ICMP (ping) เป็น protocol ของตัวเอง</li>
<li><b>AAA</b> = Authentication (พิสูจน์ตัวตน), Authorization (ให้สิทธิ์), Accounting (บันทึกการใช้งาน)</li>
<li><b>Mode</b>: <b>Local</b> (user/password ในอุปกรณ์เอง) และ <b>AAA server</b> (RADIUS, HWTACACS); network ใหญ่ใช้ server เพราะ <b>scalable</b> และจัดการรวมศูนย์; ในโปรโตคอล RADIUS อุปกรณ์เป็น <b>RADIUS client</b></li>
<li><b>Local AAA บน Huawei</b>: default authentication-scheme <code>default</code> = local; domain <code>default_admin</code>; <code>local-user NAME password cipher PW</code>, <code>local-user NAME service-type telnet</code>, <code>privilege level 0-15</code> (default 0, สูงสุด 15), <code>user-interface vty 0 4</code> + <code>authentication-mode aaa</code></li>
</ul>
<table>
<tr><th>ชนิด ACL</th><th>เลข</th><th>จับคู่จาก</th></tr>
<tr><td>Basic</td><td>2000-2999</td><td>source IP</td></tr>
<tr><td>Advanced</td><td>3000-3999</td><td>src/dst IP, protocol, TCP/UDP port, DSCP, length ...</td></tr>
<tr><td>Layer 2</td><td>4000-4999</td><td>MAC, VLAN ฯลฯ</td></tr>
<tr><td>User-defined</td><td>5000-5999</td><td>กำหนดเอง</td></tr>
</table>`,
  sections: [
    {
      t: "ACL คืออะไร และโครงสร้างของ ACL",
      ref: "หน้า 320-322",
      html: `
<h4>ภาพรวม</h4>
<p><b>ACL (Access Control List)</b> คืออุปกรณ์ที่ตั้ง ACL จะนำ packet ที่ผ่านมาเทียบกับ <b>กฎจับคู่ (matching rules)</b> แล้วทำ <b>action</b> ตามที่กำหนด ACL ควบคุมพฤติกรรมการเข้าถึง ป้องกันการโจมตี และเพิ่มประสิทธิภาพ bandwidth ได้เมื่อใช้ร่วมกับเทคโนโลยีอื่น เช่น firewall, routing policy, QoS, traffic filter ในบทนี้เน้น ACL ของ Huawei เพื่อ traffic control</p>
<h4>องค์ประกอบ</h4>
<p>ACL ประกอบด้วยคำสั่ง <b>deny | permit</b> หลายบรรทัด แต่ละบรรทัดคือ 1 <b>rule</b> ความหมายของ permit/deny ขึ้นกับเทคโนโลยีที่ใช้ร่วม เช่น กับ traffic-filter, permit = อนุญาตให้ผ่าน, deny = ไม่ให้ผ่าน</p>
<figure><img src="i/p321_1.webp" alt="โครงสร้างของ ACL เป็นชุดคำสั่ง permit deny" loading="lazy"><figcaption>Fig. 9.1 Composition of ACL (rule หลายข้อ แต่ละข้อมี action permit หรือ deny)</figcaption></figure>
<h4>วิธีจับคู่</h4>
<ol>
<li>รับ packet แล้วเทียบ rule ทีละข้อ <b>ตามลำดับ rule-id จากน้อยไปมาก</b></li>
<li>ไม่ match rule ปัจจุบัน ไปเทียบ rule ถัดไป</li>
<li>เมื่อ match แล้ว ทำ action (permit หรือ deny) และ <b>หยุดเทียบ</b> rule ที่เหลือ</li>
<li>ถ้าไม่ match rule ใดเลย อุปกรณ์ <b>permit</b> (implicit default rule ของ Huawei router คือ permit any)</li>
</ol>
<div class="note"><b>เทคนิค</b> เพิ่ม rule <code>deny</code> any ท้าย ACL เองเพื่อให้ implicit default ไม่ถูกใช้ (ตัวอย่าง Fig. 9.4 ใช้ rule 4 เป็น deny)</div>
<h4>rule-id และ step</h4>
<ul>
<li>ทุก rule มี <b>rule-id</b> ถ้าไม่ระบุ อุปกรณ์จะให้เอง</li>
<li><b>step</b> = ช่วงห่างระหว่าง rule-id ที่อยู่ติดกัน default = <b>5</b> (5, 10, 15, 20 ...) ถ้าตั้ง step 10 ได้ 10, 20, 30 ...; step 2 ได้ 2, 4, 6 ...</li>
<li>ช่องว่างไว้เพื่อ <b>insert</b> rule ใหม่ระหว่างสอง rule (เช่น rule 2 อยู่ก่อน rule 5)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>เทียบ rule ตามลำดับ <b>rule-id น้อย → มาก</b> ไม่ใช่ตามลำดับที่พิมพ์; match แล้วหยุด</li>
<li>ไม่ match = <b>permit</b> (implicit default ของ Huawei router); default step = 5</li>
</ul></div>`
    },
    {
      t: "ชนิดของ ACL และรูปแบบคำสั่ง rule",
      ref: "หน้า 322-323",
      html: `
<h4>ชนิดและช่วงเลข</h4>
<table>
<tr><th>ชนิด</th><th>ช่วงเลข</th><th>ใช้จับคู่</th></tr>
<tr><td><b>Basic ACL</b></td><td>2000-2999</td><td>source IP, fragment flag, time-range เท่านั้น</td></tr>
<tr><td><b>Advanced ACL</b></td><td>3000-3999</td><td>source IP, destination IP, protocol, priority, length, TCP/UDP source/destination port</td></tr>
<tr><td><b>Layer 2 ACL</b></td><td>4000-4999</td><td>ข้อมูล Layer 2</td></tr>
<tr><td><b>User-defined ACL</b></td><td>5000-5999</td><td>ผู้ใช้กำหนด</td></tr>
</table>
<p>ชนิดของ ACL ต้องสอดคล้องกับช่วงเลข (ใส่เลข 2xxx ได้ basic ACL) basic ACL เป็น subset ของ advanced ACL; advanced จึงเจาะจงกว่า</p>
<h4>รูปแบบ rule ของ Basic ACL</h4>
<pre><code>rule [rule-id] { deny | permit } [ source { source-address source-wildcard | any } | logging | time-range time-name ]</code></pre>
<ul>
<li><b>rule-id</b>: หมายเลข rule; <b>deny | permit</b>: action</li>
<li><b>source address + wildcard</b>: ชุด IP ที่ต้องการจับ; <b>any</b>: ทุก address</li>
<li><b>logging</b>: บันทึก log ของ packet ที่ match; <b>time-range</b>: ช่วงเวลาที่ rule มีผล</li>
</ul>
<h4>รูปแบบ rule ของ Advanced ACL (แบบย่อสำหรับ IP ทั้งหมด)</h4>
<pre><code>rule [rule-id] { deny | permit } ip [ destination { destination-address destination-wildcard | any } ] [ source { source-address source-wildcard | any } ]</code></pre>
<p>ถ้าเป็น ICMP, TCP, UDP รูปแบบคำสั่งจะต่างกันออกไป โดย TCP/UDP ระบุ port ได้ (ตัวดำเนินการ <code>eq</code>, <code>gt</code>, <code>lt</code>, <code>range</code>)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Basic 2000-2999 (source IP เท่านั้น), Advanced 3000-3999, Layer 2 4000-4999, User-defined 5000-5999</li>
<li>ถ้าต้องการควบคุมด้วย destination IP, protocol หรือ port ต้องใช้ <b>Advanced ACL</b></li>
</ul></div>`
    },
    {
      t: "Wildcard mask",
      ref: "หน้า 323-325",
      html: `
<p><b>Wildcard-mask</b> ขนาด 32 bit เมื่อรวมกับ IP address แทนเซ็ตของ address หลายตัว เขียนแบบ dotted decimal เหมือน subnet mask แต่ <b>ความหมายตรงข้าม</b>: bit <b>0 = match (ต้องตรง)</b> และ bit <b>1 = ignore (ไม่สนใจ)</b></p>
<figure><img src="i/p323_1.webp" alt="wildcard mask 0.0.0.255 ของ 192.168.1.0 หมายถึง 192.168.1.0/24" loading="lazy"><figcaption>Fig. 9.2 Wildcard-mask (192.168.1.0 กับ 0.0.0.255 = network 192.168.1.0/24)</figcaption></figure>
<pre><code>[AR1]acl 2000
[AR1-acl-basic-2000]rule 5  deny   source 10.1.1.1 0.0.0.0           # host เดียว 10.1.1.1
[AR1-acl-basic-2000]rule 10 permit source 192.168.1.0 0.0.0.255     # 192.168.1.0/24
[AR1-acl-basic-2000]rule 15 permit source 172.16.0.0 0.0.255.255    # 172.16.0.0/16
[AR1-acl-basic-2000]rule 20 deny   source 0.0.0.0 255.255.255.255   # ทุก address (0.0.0.0/0)</code></pre>
<table>
<tr><th>Wildcard</th><th>ความหมาย</th></tr>
<tr><td>0.0.0.0</td><td>ทุก bit ต้องตรง = เครื่องเดียว</td></tr>
<tr><td>0.0.0.255</td><td>octet สุดท้ายเป็นอะไรก็ได้ (/24)</td></tr>
<tr><td>0.0.255.255</td><td>2 octet ท้ายอะไรก็ได้ (/16)</td></tr>
<tr><td>255.255.255.255</td><td>ไม่สนใจทุก bit = ทุก address</td></tr>
</table>
<h4>Wildcard ที่ 0/1 ไม่ต่อเนื่อง</h4>
<p>ใช้จับ address เลขคี่ใน 192.168.1.0/24 (.1, .3, .5 ...) ทุก address เลขคี่ลงท้ายด้วย bit 1 ต้องจับ bit สุดท้ายให้ตรง bit อื่นไม่สน: <code>192.168.1.1 0.0.0.254</code> (0.0.0.11111110) ส่วน address เลขคู่: <code>192.168.1.0 0.0.0.254</code></p>
<figure><img src="i/p325_1.webp" alt="การเขียน wildcard mask ที่ bit 0 และ 1 ไม่ต่อเนื่องเพื่อจับ address เลขคี่" loading="lazy"><figcaption>Fig. 9.3 The 0s and 1s in wildcard-mask can be discontinuous</figcaption></figure>
<h4>วิธีคำนวณ</h4>
<ol>
<li>เขียนช่วง address ที่ต้องการเป็น binary หา bit ที่ <b>คงที่</b> (ใช้ 0) และ bit ที่ <b>เปลี่ยนได้</b> (ใช้ 1)</li>
<li>สำหรับ block ปกติ: wildcard = 255.255.255.255 ลบ subnet mask เช่น /22 (255.255.252.0) → wildcard 0.0.3.255</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>wildcard: <b>0 = ตรง, 1 = ไม่สน</b> (ตรงข้ามกับ subnet mask)</li>
<li><code>0.0.0.0</code> = host เดียว; <code>255.255.255.255</code> = any; <code>0.0.0.255</code> = /24</li>
<li>เลขคี่/คู่ใน /24: <code>x.x.x.1 0.0.0.254</code> / <code>x.x.x.0 0.0.0.254</code></li>
</ul></div>`
    },
    {
      t: "แนวทางออกแบบ ACL",
      ref: "หน้า 325-327",
      html: `
<h4>ขั้นตอนคิด</h4>
<ol>
<li><b>เลือกชนิด</b>: ถ้าควบคุมจาก <b>source IP อย่างเดียว</b> ใช้ basic ACL; ถ้าต้องใช้ source IP, destination IP, protocol, port ใช้ advanced ACL</li>
<li><b>เลือกจุด</b>: router ตัวไหน, interface ไหน, ทิศไหน (inbound/outbound) ซึ่งจะกำหนดว่า source/destination ใน rule คืออะไร</li>
<li><b>เรียงลำดับ rule</b>: ถ้า address ใน rule ไม่ซ้อนกัน ลำดับไม่สำคัญ; ถ้าซ้อนกัน ให้ rule ที่ <b>ช่วงเล็กกว่า</b> ไว้ข้างหน้า</li>
</ol>
<ul>
<li>แต่ละ interface มี ACL ได้ <b>1 ตัวต่อ 1 ทิศ</b> (inbound 1 และ outbound 1) แต่ ACL 1 ตัวผูกได้หลาย interface</li>
<li>ทิศมองจากมุม router: <b>เข้า router ผ่าน port = inbound</b>, <b>ออกจาก router ผ่าน port = outbound</b></li>
</ul>
<h4>ตัวอย่าง Fig. 9.4</h4>
<p>ควบคุมการเข้า Internet ของ intranet โดยใช้ <b>source IP</b> อย่างเดียว จึงใช้ basic ACL; intranet ผ่าน R1 และ R2 สร้าง ACL บน R2 ผูกที่ <b>inbound ของ GE0/0/0</b> ของ R2 (ถ้าสร้างบน R1 ต้องผูกที่ outbound ของ GE0/0/1 ของ R1)</p>
<figure><img src="i/p326_1.webp" alt="ตัวอย่าง ACL ควบคุม intranet ออก Internet ผ่าน R1 และ R2" loading="lazy"><figcaption>Fig. 9.4 ACL example (Host A อยู่ใน Subnet B จึงต้องวาง rule ของ Host A ก่อน)</figcaption></figure>
<ul>
<li>rule 1 (Host A) และ rule 2 (Subnet B) <b>ซ้อนกัน</b> (Host A อยู่ใน Subnet B) จึงต้องวาง rule ของ Host A ก่อน ถ้ากลับลำดับ rule ของ Host A จะไม่มีโอกาสถูก match</li>
<li>rule 4 เป็น deny any จึงทำให้ implicit default (permit) ไม่ถูกใช้ ส่วน Subnet C มา match rule 3 = permit; Subnet E ไม่อยู่ใน rule ที่ระบุ จึง match rule 4 = deny</li>
<li><b>คำถาม</b>: ผูกที่ outbound ของ GE0/0/1 ของ R2 ได้ไหม? ได้ เพราะ source address ยังเป็นของ intranet; แต่ <b>ผูก inbound ของ GE0/0/1 ไม่ได้</b> เพราะทิศนั้นรับ packet จาก Internet (source ไม่ใช่ intranet) rule ที่เขียนไว้จึงไม่ตรงกับ traffic ที่ต้องการควบคุม</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>rule ที่ address ซ้อนกัน: เฉพาะเจาะจงกว่า (เล็กกว่า) ไว้ก่อน</li>
<li>1 interface 1 ทิศ มี ACL ได้ 1 ตัว; ทิศมองจาก router; source/destination ต้องสอดคล้องกับทิศที่ผูก</li>
</ul></div>`
    },
    {
      t: "Configure Basic ACL",
      ref: "หน้า 327-329",
      html: `
<h4>โจทย์ (Fig. 9.5)</h4>
<p>องค์กรมี 3 segment: VLAN 10 = finance server, VLAN 20 = engineering, VLAN 30 = finance; router AR1 ต่อ Internet ที่ GE0/0/0 ต้องทำ: (1) packet ที่ source เป็น <b>private address</b> ห้ามเข้าจาก Internet (2) finance server เข้าถึงได้เฉพาะเครื่องของ finance</p>
<figure><img src="i/p327_1.webp" alt="เครือข่ายองค์กรมี VLAN 10 server VLAN 20 engineering VLAN 30 finance และ router AR1" loading="lazy"><figcaption>Fig. 9.5 Enterprise network</figcaption></figure>
<p>ต้องสร้าง ACL 2 ตัว: ACL 2000 ผูก <b>inbound ที่ GE0/0/0</b> และ ACL 2010 ผูก <b>outbound ที่ Vlanif 10</b></p>
<pre><code>[AR1]acl 2000
[AR1-acl-basic-2000]rule deny source 10.0.0.0 0.255.255.255      # private 10.0.0.0/8
[AR1-acl-basic-2000]rule deny source 172.16.0.0 0.15.255.255     # private 172.16.0.0/12
[AR1-acl-basic-2000]rule deny source 192.168.0.0 0.0.255.255     # private 192.168.0.0/16
[AR1]acl 2010
[AR1-acl-basic-2010]rule permit source 10.10.30.0 0.0.0.255      # finance (VLAN 30)
[AR1-acl-basic-2010]rule 20 deny source any                      # ระบุ rule-id เอง
[AR1]display acl all                                              # ดู ACL ทั้งหมด
[AR1]display acl 2000
# ผูกกับ interface
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]traffic-filter inbound acl 2000
[AR1]interface Vlanif 10
[AR1-Vlanif10]traffic-filter outbound acl 2010</code></pre>
<p>ผลของ <code>display acl all</code>: rule ที่ไม่ได้ระบุ id จะได้ 5, 10, 15 ตาม step 5 (ACL 2000 มี rule 5, 10, 15; ACL 2010 มี rule 5 และ 20)</p>
<h4>แก้ไข ACL</h4>
<pre><code>[AR1]acl 2000
[AR1-acl-basic-2000]undo rule 10                                   # ลบ rule 10
[AR1-acl-basic-2000]rule 2 permit source 10.30.30.0 0.0.0.255      # แทรก rule 2 (น้อยกว่า 5 จึงอยู่ก่อน)
[AR1-acl-basic-2000]rule 15 permit source 192.168.0.0 0.0.255.255  # แก้ rule 15 เป็น permit
[AR1-acl-basic-2000]display this</code></pre>
<p>rule 2 ที่ permit 10.30.30.0/24 ต้องอยู่ <b>ก่อน</b> rule 5 ที่ deny 10.0.0.0/8 (ซึ่งครอบคลุม 10.30.30.0) ไม่เช่นนั้น rule permit จะไม่มีวันถูกใช้ จึงต้องใช้ id ที่น้อยกว่า 5</p>
<div class="warn"><b>การลบ ACL ไม่ลบ binding</b> หลัง <code>undo acl 2000</code> จะเห็นว่า <code>traffic-filter inbound acl 2000</code> ยังอยู่ใน interface ต้องใช้ <code>undo traffic-filter inbound</code> ลบการผูกเอง</div>
<pre><code>[AR1]undo acl 2000
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]undo traffic-filter inbound</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><code>acl N</code> + <code>rule [id] permit|deny source ADDR WILDCARD</code>; ผูกด้วย <code>traffic-filter inbound|outbound acl N</code></li>
<li>แทรก rule ให้ใช้ rule-id ที่เล็กกว่า rule เป้าหมาย; ดูผลด้วย <code>display acl all</code>, <code>display this</code></li>
<li>ลบ ACL แล้วต้อง <code>undo traffic-filter</code> ที่ interface ด้วย</li>
</ul></div>`
    },
    {
      t: "Configure Advanced ACL",
      ref: "หน้า 329-331",
      html: `
<h4>โจทย์ (Fig. 9.6)</h4>
<p>บน AR1 (ผูก <b>outbound ที่ GE0/0/0</b>): อนุญาต engineering ออก Internet ได้ทั้งหมด, อนุญาต finance ออก Internet <b>เฉพาะ</b> เว็บและอีเมล, อนุญาต finance ใช้ <code>ping</code> และ <b>ห้าม</b> finance server ออก Internet</p>
<figure><img src="i/p330_1.webp" alt="การประยุกต์ advanced ACL ที่ router AR1 ควบคุมแผนก engineering finance และ server" loading="lazy"><figcaption>Fig. 9.6 Application of advanced ACL</figcaption></figure>
<p>การเข้าเว็บต้องใช้ DNS (<b>UDP 53</b>), HTTP (<b>TCP 80</b>, ชื่อ <code>www</code>) และ HTTPS (<b>TCP 443</b>) ก่อนสร้างให้ลบ ACL เดิมและ binding ของ ACL เดิมเพื่อไม่ให้รบกวน</p>
<pre><code>[AR1]undo acl all
[AR1]interface Vlanif 10
[AR1-Vlanif10]undo traffic-filter outbound
[AR1]acl 3000
[AR1-acl-adv-3000]rule 5  permit ip  source 10.10.20.0 0.0.0.255 destination any        # engineering ทุกอย่าง
[AR1-acl-adv-3000]rule 10 permit udp source 10.10.30.0 0.0.0.255 destination any destination-port eq dns   # DNS
[AR1-acl-adv-3000]rule 15 permit tcp source 10.10.30.0 0.0.0.255 destination-port eq www       # HTTP 80
[AR1-acl-adv-3000]rule 20 permit tcp source 10.10.30.0 0.0.0.255 destination-port eq 443       # HTTPS
[AR1-acl-adv-3000]rule 25 permit icmp source 10.10.30.0 0.0.0.255                              # ping
[AR1-acl-adv-3000]rule 30 deny ip                                                              # ที่เหลือ deny
[AR1]interface GigabitEthernet 0/0/0
[AR1-GigabitEthernet0/0/0]traffic-filter outbound acl 3000</code></pre>
<ul>
<li>ตัวดำเนินการ port: <code>eq</code> (เท่ากับ), <code>gt</code> (มากกว่า), <code>lt</code> (น้อยกว่า), <code>range</code> (ช่วง); ระบุเป็นเลขหรือชื่อ (dns, www, ...)</li>
<li>protocol: <code>ip</code> (รวมทุกชนิด), <code>tcp</code> (6), <code>udp</code> (17), <code>icmp</code> (1), <code>gre</code> (47), <code>ospf</code> (89) ฯลฯ</li>
<li>การ deny ท้ายสุด (<code>rule 30 deny ip</code>) ทำให้ finance server (และเครื่องอื่นที่ไม่ได้ permit) ถูกบล็อกเมื่อ ไม่ match rule 5-25</li>
<li>การค้นหาว่า finance ท่องเว็บไม่ได้ ให้ตรวจก่อนว่า DNS (UDP 53) ถูก permit หรือไม่ เพราะถ้าขาด จะเข้าเว็บด้วยชื่อไม่ได้</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>เว็บ = DNS (UDP 53) + HTTP (TCP 80) + HTTPS (TCP 443); ping = ICMP</li>
<li>rule <code>tcp/udp</code> ระบุ <code>destination-port eq ...</code>; <code>deny ip</code> ท้ายสุดเพื่อกันของที่ไม่ได้อนุญาต</li>
<li>Advanced ACL ใช้ 3000-3999 และผูกด้วย <code>traffic-filter</code> เช่นเดียวกับ basic</li>
</ul></div>`
    },
    {
      t: "AAA: แนวคิดและรูปแบบการทำงาน",
      ref: "หน้า 332-334",
      html: `
<p>ผู้ใช้หลายคนเข้าถึงอุปกรณ์หรือระบบปฏิบัติการ ต้องกำหนดสิทธิ์ต่างกันและติดตามการเข้าถึง จึงมี <b>AAA</b> ซึ่งเป็นฟังก์ชันความปลอดภัยที่แยกกัน 3 อย่าง</p>
<table>
<tr><th>A</th><th>ชื่อ</th><th>ความหมาย</th></tr>
<tr><td>1</td><td><b>Authentication</b></td><td>พิสูจน์ตัวตน (username + password)</td></tr>
<tr><td>2</td><td><b>Authorization</b></td><td>กำหนดสิทธิ์ที่ผู้ใช้แต่ละคนทำได้</td></tr>
<tr><td>3</td><td><b>Accounting</b></td><td>บันทึกการเข้าถึง/การเปลี่ยนแปลงหลัง login (หนังสือไม่อธิบายละเอียด)</td></tr>
</table>
<h4>2 โหมดการทำงาน</h4>
<ul>
<li><b>Local</b>: อุปกรณ์ตรวจ username/password จาก <b>database ภายในตัวเอง</b></li>
<li><b>AAA server</b>: อุปกรณ์ส่ง query ไปหา AAA server ที่ระบุ ให้ server ตัดสินว่าอนุญาตหรือไม่และมีสิทธิ์อะไร</li>
</ul>
<figure><img src="i/p332_1.webp" alt="การทำงานของ local AAA บนอุปกรณ์เครือข่าย" loading="lazy"><figcaption>Fig. 9.7 Illustration of how local AAA works</figcaption></figure>
<figure><img src="i/p333_1.webp" alt="การทำงานของ AAA โดยใช้ AAA server ภายนอก" loading="lazy"><figcaption>Fig. 9.8 Illustration of how AAA works using an AAA server</figcaption></figure>
<table>
<tr><th>หัวข้อ</th><th>Local</th><th>AAA server (RADIUS)</th></tr>
<tr><td>ที่เก็บ user</td><td>ในแต่ละอุปกรณ์</td><td>ศูนย์กลางที่ server</td></tr>
<tr><td>ข้อดี</td><td>ง่าย ไม่ต้องมี server</td><td><b>Scalability</b>, จัดการรวมศูนย์ เหมาะ network กลาง-ใหญ่</td></tr>
<tr><td>Protocol</td><td>-</td><td><b>RADIUS</b> (Remote Authentication Dial-in User Service): อุปกรณ์เป็น <b>RADIUS client</b> และ AAA server เป็น <b>RADIUS server</b></td></tr>
</table>
<p>Authentication mode ที่เลือกได้ใน Huawei: <code>local</code>, <code>radius</code>, <code>hwtacacs</code>, <code>none</code></p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>AAA = Authentication / Authorization / Accounting</li>
<li>local vs server: network ใหญ่ใช้ server (RADIUS) เพราะ <b>scalable + centralized</b></li>
<li>RADIUS: อุปกรณ์ที่ถูกจัดการ = client, AAA server = RADIUS server</li>
</ul></div>`
    },
    {
      t: "ตั้งค่า AAA local authentication สำหรับ Telnet",
      ref: "หน้า 334-337",
      html: `
<p>ถ้า Telnet เข้า router ด้วย password ธรรมดา จะกำหนดสิทธิ์ต่างกันตามผู้ใช้ไม่ได้ จึงใช้ AAA local authentication (Fig. 9.9) เพื่อเพิ่มความปลอดภัยและกำหนดสิทธิ์รายคน</p>
<h4>ค่า default ที่เกี่ยวข้อง</h4>
<pre><code>[AR1]aaa
[AR1-aaa]display this
 authentication-scheme default
 authorization-scheme default
 accounting-scheme default
 domain default
 domain default_admin
 local-user admin password cipher ...
 local-user admin service-type http</code></pre>
<ul>
<li><b>authentication-scheme default</b>: ลบไม่ได้แต่แก้ได้; โหมด default = <b>local</b> (<code>authentication-mode local</code>; ตัวเลือก: hwtacacs | local | none | radius)</li>
<li><b>domain default_admin</b>: domain ของผู้ใช้ที่ login เพื่อจัดการอุปกรณ์ผ่าน HTTP, SSH, Telnet, Terminal, FTP ซึ่งใช้ authentication-scheme default (local) อยู่แล้ว จึงไม่ต้องแก้ไขอะไรเพิ่ม</li>
</ul>
<h4>สร้าง local user และเปิดใช้ AAA ที่ VTY</h4>
<pre><code>[AR1]aaa
[AR1-aaa]local-user user1 password cipher huawei111
[AR1-aaa]local-user user1 service-type telnet
[AR1-aaa]local-user user2 privilege level 15 password cipher huawei222
[AR1-aaa]local-user user2 service-type telnet
[AR1]user-interface vty 0 4
[AR1-ui-vty0-4]authentication-mode aaa</code></pre>
<ul>
<li><b>user1</b> ไม่ระบุ privilege จึงได้ <b>level 0</b> (ต่ำสุด) เห็นคำสั่งน้อยมาก (Fig. 9.10)</li>
<li><b>user2</b> ตั้ง <b>privilege level 15</b> (สูงสุด) ใช้ได้ทุกคำสั่ง (Fig. 9.11)</li>
<li><code>user-interface vty 0 4</code> + <code>authentication-mode aaa</code> ทำให้ VTY (Telnet) ใช้ AAA แทน password เดี่ยว</li>
</ul>
<figure><img src="i/p336_1.webp" alt="ทดสอบ login ด้วย user1 ระดับ 0 เห็นคำสั่งน้อย" loading="lazy"><figcaption>Fig. 9.10 Login test using user1 (level 0, คำสั่งที่ใช้ได้ถูกจำกัดมาก)</figcaption></figure>
<figure><img src="i/p337_1.webp" alt="ทดสอบ login ด้วย user2 ระดับ 15 ใช้คำสั่งได้ครบ" loading="lazy"><figcaption>Fig. 9.11 Login test with user2 (level 15, ใช้ได้ทุกคำสั่ง)</figcaption></figure>
<h4>ตรวจสอบ</h4>
<pre><code>[AR1]display local-user
User-name  State AuthMask AdminLevel
admin      A     H        -
user1      A     T        -
user2      A     T        15
[AR1]display local-user user name user2</code></pre>
<ul>
<li><b>State</b>: A = active, B = blocked</li>
<li><b>AuthMask</b> (ชนิดการเข้าถึง): H = HTTP, T = Telnet, S = SSH, F = FTP</li>
<li><b>AdminLevel</b>: ระดับสิทธิ์ของ user</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>local AAA สำหรับ Telnet: <code>local-user</code> + <code>service-type telnet</code> + (<code>privilege level</code>) + VTY <code>authentication-mode aaa</code></li>
<li>privilege level default = <b>0</b>, สูงสุด = <b>15</b></li>
<li>default scheme/domain (default, default_admin) ใช้ local อยู่แล้ว ไม่ต้องแก้</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `ผู้ดูแลต้องการให้ router บล็อกเฉพาะ web (TCP 80) ไปยัง server 202.100.1.12 จาก Host A (10.1.1.10) โดยไม่กระทบ Host อื่นหรือบริการอื่นของ server นี้`,
      q: "ควรใช้ ACL ชนิดใด และ rule ใดเหมาะสมที่สุด?",
      opts: [
        { t: "Advanced ACL: rule deny tcp source 10.1.1.10 0.0.0.0 destination 202.100.1.12 0.0.0.0 destination-port eq 80", why: "ถูก: ต้องจับ destination IP และ port จึงใช้ advanced ACL (3000-3999) และ web = TCP 80" },
        { t: "Basic ACL: rule deny source 10.1.1.10 0.0.0.0", why: "ผิด: basic ดูแค่ source IP จึงบล็อก Host A ทุกบริการและทุกปลายทาง" },
        { t: "Advanced ACL: rule deny udp ... destination-port eq 80", why: "ผิด: HTTP ใช้ TCP ไม่ใช่ UDP" },
        { t: "Advanced ACL: rule deny tcp ... destination-port eq 21", why: "ผิด: TCP 21 คือ FTP ไม่ใช่เว็บ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บน AR1 พิมพ์คำสั่งตามลำดับดังนี้:
acl 2001
rule 20 permit source 20.1.1.0 0.0.0.255
rule 10 deny source 20.1.1.0 0.0.0.255
จากนั้นมี packet จาก 20.1.1.5 เข้ามาผ่าน interface ที่ผูก ACL 2001`,
      q: "ผลเป็นอย่างไร?",
      opts: [
        { t: "ถูก deny เพราะ rule 10 ถูกเทียบก่อน rule 20 แม้พิมพ์ทีหลัง", why: "ถูก: เรียงตาม rule-id น้อยไปมาก ไม่ใช่ลำดับที่พิมพ์" },
        { t: "ถูก permit เพราะ rule 20 พิมพ์ก่อน", why: "ผิด: ลำดับการพิมพ์ไม่มีผล" },
        { t: "คำสั่งผิดเพราะต้องพิมพ์ rule-id จากน้อยไปมาก", why: "ผิด: พิมพ์ลำดับใดก็ได้ ระบบเรียงตาม rule-id" },
        { t: "ระบบเปลี่ยน rule 10 เป็น 5", why: "ผิด: ไม่ปรับหมายเลขให้เอง" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ACL 2002 สร้างโดยใช้ rule ที่ไม่ระบุ rule-id สองข้อตามลำดับ: permit source 20.1.1.10 และ permit source 30.1.1.10 บน router ที่ใช้ step default`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "rule แรกได้ rule-id = 5", ok: true, why: "ถูก: default step = 5 จึงเริ่มที่ 5" },
        { t: "rule ที่สองได้ rule-id = 10", ok: true, why: "ถูก: ห่างกันตาม step = 5 จึงเป็น 10" },
        { t: "rule แรกได้ rule-id = 1", ok: false, why: "ผิด: เริ่มที่ค่า step ไม่ใช่ 1" },
        { t: "ถ้าตั้ง step เป็น 10 ก่อนสร้าง จะได้ 10 และ 20", ok: true, why: "ถูก: rule-id เพิ่มทีละ step" },
        { t: "สามารถแทรก rule 3 ไว้ก่อน rule แรกได้ภายหลัง", ok: true, why: "ถูก: ช่องว่างและ id ที่น้อยกว่า 5 ใช้แทรกได้" }
      ]
    },
    {
      type: "multi",
      story: `ACL มีบรรทัด rule 10 permit source 172.16.32.0 0.0.15.255`,
      q: "เลือกทุก address ที่ match rule นี้",
      opts: [
        { t: "172.16.40.7", ok: true, why: "ถูก: octet ที่ 3 = 40 อยู่ในช่วง 32-47" },
        { t: "172.16.47.200", ok: true, why: "ถูก: 47 อยู่ในช่วง (wildcard 15 ครอบคลุม bit 4 ล่างของ octet ที่ 3: 32-47)" },
        { t: "172.16.48.1", ok: false, why: "ผิด: octet ที่ 3 = 48 เกินช่วง" },
        { t: "172.16.31.255", ok: false, why: "ผิด: octet ที่ 3 = 31 น้อยกว่า 32" },
        { t: "172.17.40.7", ok: false, why: "ผิด: octet ที่ 2 ต้องตรง (wildcard 0) = 16" }
      ]
    },
    {
      type: "choice",
      story: `ต้องเขียน ACL ให้จับทั้ง network 10.1.4.0/22 (10.1.4.0 ถึง 10.1.7.255)`,
      q: "wildcard mask ที่ถูกต้องคืออะไร?",
      opts: [
        { t: "10.1.4.0 0.0.3.255", why: "ถูก: /22 มี subnet mask 255.255.252.0 ดังนั้น wildcard = 255.255.255.255 - 255.255.252.0 = 0.0.3.255" },
        { t: "10.1.4.0 0.0.0.255", why: "ผิด: ครอบคลุมแค่ 10.1.4.0/24" },
        { t: "10.1.4.0 255.255.252.0", why: "ผิด: นี่คือ subnet mask ไม่ใช่ wildcard (ความหมายตรงข้าม)" },
        { t: "10.1.4.0 0.0.7.255", why: "ผิด: จะครอบคลุม 10.1.0.0-10.1.7.255 บางส่วนเกินและ network address ไม่ตรงบล็อก (เป็น /21)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ต้องการจับเฉพาะ address ที่ลงท้ายเลขคู่ใน 192.168.1.0/24 (192.168.1.0, .2, .4, ...)`,
      q: "rule ใดถูกต้อง?",
      opts: [
        { t: "source 192.168.1.0 0.0.0.254", why: "ถูก: bit สุดท้ายต้องเป็น 0 (ตรง) bit อื่นไม่สน (wildcard 11111110 = 254)" },
        { t: "source 192.168.1.1 0.0.0.254", why: "ผิด: นี่ใช้จับ address เลขคี่ (bit สุดท้ายต้องเป็น 1)" },
        { t: "source 192.168.1.0 0.0.0.255", why: "ผิด: จับทั้ง /24 ไม่เลือกเฉพาะเลขคู่" },
        { t: "source 192.168.1.0 0.0.0.1", why: "ผิด: จับแค่ .0 และ .1 (bit สุดท้ายไม่สน แต่ bit ที่เหลือต้องเป็น 0)" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ACL 2003 มีเพียงบรรทัดเดียว: rule 5 deny source 10.1.1.0 0.0.0.255 และผูก inbound ที่ GE0/0/1 ของ Huawei router มี packet จาก 20.1.1.1 เข้ามา`,
      q: "packet นี้ถูกจัดการอย่างไร?",
      opts: [
        { t: "ผ่าน (permit) เพราะไม่ match rule ใดและ implicit default ของ Huawei คือ permit", why: "ถูก: ไม่ match rule ใดจึงเป็นไปตามกฎ default permit" },
        { t: "ถูกทิ้งเพราะ ACL มี implicit deny ท้ายสุด", why: "ผิด: implicit deny เป็นพฤติกรรมของ ACL ค่ายอื่น ในหนังสือ (Huawei) default เป็น permit" },
        { t: "ถูกทิ้งเพราะ ACL ต้องมี permit อย่างน้อยหนึ่งข้อ", why: "ผิด: ไม่มีข้อบังคับนี้" },
        { t: "ถูกส่งไปตรวจกับ ACL อื่น", why: "ผิด: ต่อ 1 ทิศมี ACL เดียว" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ACL 2000 มี rule 5 deny source 10.1.1.0 0.0.0.255 และ rule 10 permit source 10.1.1.5 0.0.0.0 ผู้ดูแลต้องการให้ Host 10.1.1.5 ผ่านได้ แต่ที่เหลือใน 10.1.1.0/24 ถูกบล็อก ทว่า 10.1.1.5 ยังถูกบล็อกอยู่`,
      q: "แก้ปัญหาอย่างไรโดยไม่ต้องลบ rule เดิม?",
      opts: [
        { t: "เพิ่ม rule 2 permit source 10.1.1.5 0.0.0.0 ให้อยู่ก่อน rule 5", why: "ถูก: rule 5 ครอบคลุม host ก่อนจึง match และ deny; ต้องใช้ id ที่เล็กกว่า 5 เพื่อให้ host ถูก permit ก่อน" },
        { t: "เพิ่ม rule 15 permit source 10.1.1.5 0.0.0.0", why: "ผิด: id มากกว่า 5 จึงถูกเทียบหลัง rule 5 ซึ่ง match และหยุดไปแล้ว" },
        { t: "เปลี่ยน wildcard ของ rule 5 เป็น 0.0.0.0", why: "ผิด: จะทำให้ rule 5 จับเฉพาะ 10.1.1.0 ไม่ใช่ทั้ง subnet" },
        { t: "ไม่ต้องแก้ เพราะ permit ชนะ deny เสมอ", why: "ผิด: ตัดสินตามลำดับ rule-id ไม่ใช่ชนิด action" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `intranet ต้องผ่าน R2 ไป Internet เพื่อควบคุมว่า source ใดออกได้ ผู้ดูแลสร้าง basic ACL ที่อ้างอิง source ของ intranet ทั้งหมด (rule permit/deny เฉพาะ intranet และ deny any ท้ายสุด) บน R2 ซึ่ง GE0/0/0 หันเข้า intranet และ GE0/0/1 หันออก Internet`,
      q: "ควรผูก ACL อย่างไรจึงจะควบคุมได้ถูกต้อง?",
      opts: [
        { t: "ผูก inbound ที่ GE0/0/0 (หรือ outbound ที่ GE0/0/1)", why: "ถูก: ทั้งสองจุดเห็น packet ที่ source เป็น intranet ตามที่ rule เขียนไว้" },
        { t: "ผูก inbound ที่ GE0/0/1", why: "ผิด: ทิศนี้รับ packet จาก Internet ที่ source ไม่ใช่ intranet จึงไม่ตรงกับ rule" },
        { t: "ผูก outbound ที่ GE0/0/0", why: "ผิด: ทิศนี้คือ packet ที่ส่งเข้า intranet (source เป็น Internet)" },
        { t: "ผูกได้ทุก interface ทุกทิศผลเท่ากัน", why: "ผิด: ผลขึ้นกับทิศและ interface ที่เห็น source นั้น" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการเลิกใช้ ACL 2000 จึงสั่ง undo acl 2000 แล้วตรวจ display this ที่ interface GE0/0/0 พบว่ายังมีบรรทัด traffic-filter inbound acl 2000 อยู่`,
      q: "ขั้นตอนทำความสะอาดที่ถูกต้องคือข้อใด?",
      opts: [
        { t: "เข้า interface แล้วใช้ undo traffic-filter inbound เพื่อลบ binding เอง", why: "ถูก: การลบ ACL ไม่ลบ binding อัตโนมัติ ต้องลบที่ interface" },
        { t: "ไม่ต้องทำอะไร เพราะ binding หายเอง", why: "ผิด: หนังสือแสดงว่า binding ยังค้างอยู่" },
        { t: "สั่ง undo acl 2000 อีกครั้ง", why: "ผิด: ACL ถูกลบแล้ว แต่ binding อยู่คนละที่" },
        { t: "รีสตาร์ท interface ด้วย shutdown", why: "ผิด: shutdown ไม่ลบการตั้งค่า traffic-filter" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ACL 3000 ถูกตั้งตามตัวอย่างของแผนก finance (10.10.30.0/24): permit tcp www, permit tcp 443, permit icmp, deny ip แต่ผู้ดูแลลืมใส่ rule permit udp destination-port eq dns ผู้ใช้ finance รายงานว่าพิมพ์ URL ไม่ได้ แต่พิมพ์ IP ของเว็บเข้าได้`,
      q: "เหตุผลและวิธีแก้คืออะไร?",
      opts: [
        { t: "ขาด permit UDP 53 (DNS) จึง resolve ชื่อไม่ได้; ต้องเพิ่ม rule permit udp ... destination-port eq dns ก่อน deny ip", why: "ถูก: เข้าเว็บด้วยชื่อต้องใช้ DNS (UDP 53); HTTP/HTTPS ผ่านแล้วจึงเข้า IP ตรงได้" },
        { t: "ขาด permit tcp 53 ต้องเพิ่ม rule tcp destination-port eq 53", why: "ผิด: การค้นชื่อทั่วไปใช้ UDP 53 ตามตัวอย่าง" },
        { t: "rule permit icmp ทำให้ DNS พัง", why: "ผิด: icmp ไม่เกี่ยวกับ DNS" },
        { t: "ต้องลบ rule deny ip", why: "ผิด: rule นั้นจำเป็นเพื่อบล็อกที่ไม่ได้อนุญาต แก้โดยเพิ่ม permit DNS" }
      ],
      ans: 0
    },
    {
      type: "blank",
      story: `วิศวกรเขียน ACL สำหรับ router Huawei เพื่อควบคุมการออก Internet ของแผนกบัญชี`,
      text: `ACL ที่ต้องดู source/destination IP และ port ต้องใช้หมายเลขช่วง {1}; DNS ใช้ {2} port 53; HTTPS ใช้ TCP port {3}; การผูก ACL เข้า interface ใช้คำสั่ง {4}`,
      blanks: [
        { opts: ["2000-2999", "3000-3999", "4000-4999", "5000-5999"], ans: 1, why: "Advanced ACL = 3000-3999 (basic 2000-2999 ดูแค่ source IP)" },
        { opts: ["TCP", "UDP", "ICMP", "OSPF"], ans: 1, why: "DNS ใช้ UDP 53 ตามตัวอย่างในหนังสือ" },
        { opts: ["21", "80", "443", "53"], ans: 2, why: "HTTPS = TCP 443 (HTTP = TCP 80)" },
        { opts: ["acl bind", "traffic-filter", "access-group", "filter-policy"], ans: 1, why: "ใช้ traffic-filter inbound|outbound acl N" }
      ]
    },
    {
      type: "choice",
      story: `บริษัทมีสาขา 80 แห่งและ router/switch หลายร้อยตัว ผู้ดูแลต้องการเพิ่ม/ลบ/เปลี่ยนสิทธิ์ผู้ดูแลระบบจากจุดเดียว และเก็บ log การใช้งาน`,
      q: "ควรเลือกรูปแบบ AAA ใด?",
      opts: [
        { t: "AAA server (RADIUS) ที่จัดการรวมศูนย์ โดยอุปกรณ์เป็น RADIUS client", why: "ถูก: scalable และ centralized เหมาะกับ network ขนาดกลาง-ใหญ่" },
        { t: "Local AAA บนทุกอุปกรณ์", why: "ผิด: ต้องแก้ทีละเครื่อง ไม่ scalable" },
        { t: "ใช้ password ธรรมดาที่ VTY", why: "ผิด: ไม่แยกสิทธิ์ราย user ไม่มีการบันทึก" },
        { t: "authentication-mode none", why: "ผิด: ไม่มีการตรวจสอบตัวตนเลย" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลสร้าง local-user user1 (service-type telnet, ไม่ระบุ privilege) และ user2 (privilege level 15, telnet) และตั้ง VTY ด้วย authentication-mode aaa จากนั้นให้ทั้งสองคน Telnet เข้า AR1`,
      q: "ผลที่คาดว่าจะเห็นเมื่อทั้งสองเข้าแล้วกด ? คืออะไร?",
      opts: [
        { t: "user1 เห็นคำสั่งจำกัดมาก (level 0) ส่วน user2 เห็นคำสั่งได้ครบ (level 15)", why: "ถูก: default privilege level = 0 (ต่ำสุด) และ 15 = สูงสุด" },
        { t: "ทั้งสองเห็นคำสั่งเท่ากัน เพราะ AAA ไม่แยกสิทธิ์", why: "ผิด: AAA ใช้กำหนดสิทธิ์ราย user ได้" },
        { t: "user1 สูงกว่า user2 เพราะสร้างก่อน", why: "ผิด: สิทธิ์ขึ้นกับ privilege level ไม่ใช่ลำดับการสร้าง" },
        { t: "ทั้งสอง login ไม่ได้ เพราะ domain ต้องสร้างใหม่", why: "ผิด: ใช้ domain default_admin และ scheme default (local) ได้เลย" }
      ],
      ans: 0
    },
    {
      type: "match",
      q: "จับคู่คำสั่ง/คำศัพท์กับความหมาย",
      pairs: [
        ["wildcard 0.0.0.0", "ทุก bit ต้องตรง หมายถึง host เดียว"],
        ["rule-id step = 5", "ช่วงห่างของ rule-id อัตโนมัติ เช่น 5, 10, 15"],
        ["traffic-filter outbound acl 2010", "ผูก ACL 2010 กับ interface ทิศขาออก"],
        ["authentication-mode aaa", "ให้ VTY ใช้ AAA ตรวจสอบผู้ใช้ที่ login"],
        ["RADIUS", "protocol มาตรฐานระหว่างอุปกรณ์ (client) กับ AAA server"]
      ],
      why: "แต่ละรายการคือแนวคิดหรือคำสั่งหลักของ ACL และ AAA"
    }
  ]
});
