IOT.reg({
  id: "c12",
  title: "WLAN Technologies",
  th: "WLAN/Wi-Fi, 802.11 และ Wi-Fi 4/5/6, FAT AP vs AC+FIT AP, CAPWAP, channel 2.4 GHz, BSS/SSID/VAP/ESS, AP go online, STA access, forwarding และตัวอย่าง config",
  summary: `
<ul>
<li><b>WLAN</b> = LAN ที่ใช้คลื่นวิทยุ ฯลฯ แทนสาย; ในหนังสือเน้น <b>IEEE 802.11 / Wi-Fi</b> (2.4 GHz และ 5 GHz); IEEE 802.11 ครอบคลุม <b>2 layer ล่าง</b> (Data link + Physical); <b>Wi-Fi</b> = เครื่องหมายการค้าของ <b>Wi-Fi Alliance</b> (รับรอง interoperability)</li>
<li><b>ประเภท</b>: WPAN (Bluetooth, ZigBee, NFC), WLAN (Wi-Fi), WMAN (WiMax), WWAN (GSM, CDMA, LTE, 5G)</li>
<li><b>Wi-Fi version</b>: 802.11b = Wi-Fi 2 (2.4G, 11M), 802.11a/g = Wi-Fi 3 (54M), <b>802.11n = Wi-Fi 4</b> (300M, 2.4+5G), <b>802.11ac = Wi-Fi 5</b> (5G; wave1 1.3G, wave2 6.9G), <b>802.11ax = Wi-Fi 6</b> (2.4+5G, 9.6G; HEW)</li>
<li><b>Wi-Fi 6</b>: OFDMA, MU-MIMO (UL), 1024-QAM; ความจุ/ผู้ใช้พร้อมกันเพิ่ม (multi-user concurrent x4), backward compatible</li>
<li><b>FAT AP</b>: autonomous, ทำงานเดี่ยว เหมาะบ้าน, ดูแลยากเมื่อมีหลายตัว; <b>AC + FIT AP</b>: AC ควบคุมรวมศูนย์ (access control, forwarding, config, roaming, security), FIT AP ทำ 802.11 encrypt/decrypt + PHY; เหมาะองค์กรกลาง-ใหญ่; <b>Agile distributed</b>: AC + central AP + RF unit</li>
<li><b>CAPWAP</b> (IETF): application layer บน <b>UDP</b>; <b>control = UDP 5246</b>, <b>data = UDP 5247</b>; control/data channel เลือก encrypt ด้วย <b>DTLS</b> ได้</li>
<li><b>AP-AC networking</b>: Layer 2 (ต่อตรง/L2, ง่าย เหมาะเล็ก) vs Layer 3 (ต้องค้นหา AC ผ่าน DHCP/DNS/static); <b>AC connection</b>: Direct (AC อยู่ใน forwarding path เสี่ยง bottleneck) vs <b>Bypass</b> (AC แยกออกมา, ขยายง่าย, ใช้บ่อยกว่า)</li>
<li><b>Channel 2.4 GHz</b>: 14 channel (13 ที่ใช้ทั่วไป), กว้าง 20 MHz + กันชน 2 MHz; <b>non-overlapping 1, 6, 11</b> (หรือ 2-7-12, 3-8-13, 4-9-14); 5 GHz (5.15-5.35, 5.725-5.85 GHz)</li>
<li><b>BSS</b> = AP + STA (พื้นที่ครอบคลุม), <b>BSSID</b> = MAC ของ AP, <b>SSID</b> = ชื่อเครือข่าย, <b>VAP</b> = AP เสมือนหลาย BSS ต่อ AP หนึ่งตัว (แชร์ resource/channel เดียวกัน), <b>ESS</b> = หลาย BSS ที่ SSID เดียวกัน รองรับ <b>roaming</b></li>
<li><b>WLAN 4 phase</b>: AP go online → deliver WLAN service config → STA access → data forwarding</li>
<li><b>AP go online</b>: AP ได้ IP (static/DHCP) → <b>discover AC</b> (static หรือ dynamic: DHCP Option 43, DNS, broadcast) ด้วย Discovery Request/Response → <b>Join Request/Response</b> (AC authenticate AP: MAC / SN / no-auth) → <b>version upgrade</b> (Image Data Request/Response) → tunnel maintenance (Keepalive UDP 5247 = data, Echo UDP 5246 = control)</li>
<li><b>Profile</b>: AP group/AP อ้าง <b>regulatory domain</b>, <b>RF</b>, <b>VAP</b> profile; VAP profile อ้าง <b>SSID</b>, <b>security</b> profile + forwarding mode + service VLAN; AP เดียวอยู่ได้ <b>group เดียว</b>; config ของ AP เองมี priority เหนือ group</li>
<li><b>STA access 6 ขั้น</b>: scanning → link authentication → association → access authentication → DHCP address → user authentication (Portal/802.1X/MAC)</li>
<li><b>Forwarding</b>: <b>tunnel (centralized)</b> ผ่าน AC ปลอดภัย/คุมง่าย แต่ AC หนัก; <b>direct (local)</b> ไม่ผ่าน AC เร็วกว่า แต่คุมรวมยากกว่า</li>
</ul>
<table>
<tr><th>Wi-Fi</th><th>IEEE</th><th>ความถี่</th><th>ความเร็วสูงสุด</th></tr>
<tr><td>Wi-Fi 1</td><td>802.11</td><td>2.4 GHz</td><td>2 Mbit/s</td></tr>
<tr><td>Wi-Fi 2</td><td>802.11b</td><td>2.4 GHz</td><td>11 Mbit/s</td></tr>
<tr><td>Wi-Fi 3</td><td>802.11a / g</td><td>5 GHz (a) / 2.4 GHz (g)</td><td>54 Mbit/s</td></tr>
<tr><td>Wi-Fi 4</td><td>802.11n</td><td>2.4 + 5 GHz</td><td>300 Mbit/s</td></tr>
<tr><td>Wi-Fi 5</td><td>802.11ac wave1 / wave2</td><td>5 GHz</td><td>1300 Mbit/s / 6.9 Gbit/s</td></tr>
<tr><td>Wi-Fi 6</td><td>802.11ax</td><td>2.4 + 5 GHz</td><td>9.6 Gbit/s</td></tr>
</table>
<pre><code>wlan
 regulatory-domain-profile name default / country-code cn
 ap-group name ap-Office1 / regulatory-domain-profile default
capwap source interface Vlanif 100
 ap auth-mode mac-auth / ap-id 1 ap-mac 00e0-fcc4-15a0 / ap-name ap1 / ap-group ap-Office1
 ssid-profile name ssid-Office1 / ssid AP-Office1
 security-profile name Sec-Office1 / security wpa-wpa2 psk pass-phrase a1234567 aes
 vap-profile name vap-Office1 / forward-mode tunnel / service-vlan vlan-id 101
   ssid-profile ssid-Office1 / security-profile Sec-Office1
 ap-group name ap-Office1 / vap-profile vap-Office1 wlan 1 radio 0 (และ radio 1)
display ap all   (State = nor)   display vap all   display station all</code></pre>`,
  sections: [
    {
      t: "12.1 ภาพรวม WLAN, Wi-Fi และมาตรฐาน 802.11",
      ref: "หน้า 374-378",
      html: `
<h4>WLAN คืออะไร</h4>
<p><b>WLAN (Wireless LAN)</b> คือ LAN ที่ใช้สัญญาณไร้สาย (คลื่นวิทยุ, laser, อินฟราเรด) แทนสื่อกลางแบบสายทั้งหมดหรือบางส่วน (ในความหมายกว้าง ไม่ได้จำกัดแค่ Wi-Fi แต่รวม Bluetooth, ZigBee ฯลฯ) ข้อดีคือผู้ใช้เคลื่อนที่ในพื้นที่ครอบคลุมได้อิสระ ไม่ติดสายหรือ port</p>
<figure><img src="i/p375_1.webp" alt="เปรียบเทียบเครือข่ายแบบใช้สายกับไร้สาย" loading="lazy"><figcaption>Fig. 12.1 Wired network and wireless network: เครือข่ายไร้สายทำให้ผู้ใช้ไม่ถูกผูกกับสายและ port</figcaption></figure>
<table>
<tr><th>ประเภท</th><th>ตัวอย่างเทคโนโลยี</th></tr>
<tr><td>WPAN (Personal)</td><td>Bluetooth, ZigBee, NFC, HomeRF, UWB</td></tr>
<tr><td>WLAN (Local)</td><td>Wi-Fi (และ WPAN บางตัวใช้ใน WLAN ได้)</td></tr>
<tr><td>WMAN (Metropolitan)</td><td>WiMax</td></tr>
<tr><td>WWAN (Wide)</td><td>GSM, CDMA, WCDMA, TD-SCDMA, LTE, 5G</td></tr>
</table>
<p><b>ข้อดีของ WLAN</b>: ใช้งานได้อิสระ (ไม่ถูกจำกัดโดยตำแหน่ง port; เหมาะกับอาคารสำนักงาน สนามบิน โรงแรม สนามกีฬา ร้านกาแฟ) และ <b>ติดตั้งยืดหยุ่น</b> (ที่เดินสายยาก เช่น รถไฟใต้ดิน กล้องจราจรบนทางหลวง ลดงานเดินสาย ต้นทุนต่ำ ขยายง่าย)</p>
<h4>IEEE 802.11 และ Wi-Fi</h4>
<ul>
<li><b>IEEE 802.11</b>: มาตรฐาน WLAN เผยแพร่ครั้งแรกปี <b>1997</b> ครอบคลุม <b>2 layer ล่างของ TCP/IP model</b>: <b>data link</b> (channel access, addressing, frame checksum, error detection, security) และ <b>physical</b> (ส่ง bitstream ในอากาศ, กำหนดย่านความถี่)</li>
<li><b>Wi-Fi</b>: ความหมายคือ wireless fidelity เป็น <b>เครื่องหมายการค้าและการรับรองของ Wi-Fi Alliance</b> เพื่อเพิ่ม interoperability ของอุปกรณ์ตาม 802.11 (มักใช้เป็นคำเดียวกับ 802.11)</li>
<li>เมื่อมี 802.11ax Wi-Fi Alliance ตั้งชื่อ <b>Wi-Fi 6</b> และเปลี่ยนชื่อ 802.11ac = <b>Wi-Fi 5</b>, 802.11n = <b>Wi-Fi 4</b></li>
</ul>
<table>
<tr><th>Wi-Fi</th><th>IEEE 802.11</th><th>ความถี่</th><th>ความเร็วสูงสุด</th></tr>
<tr><td>Wi-Fi 1</td><td>802.11</td><td>2.4 GHz</td><td>2 Mbit/s</td></tr>
<tr><td>Wi-Fi 2</td><td>802.11b</td><td>2.4 GHz</td><td>11 Mbit/s</td></tr>
<tr><td>Wi-Fi 3</td><td>802.11a / 802.11g</td><td>a: 5 GHz, g: 2.4 GHz (ตารางในตำราจัดกลุ่ม 2.4 และ 5 GHz)</td><td>54 Mbit/s</td></tr>
<tr><td>Wi-Fi 4</td><td>802.11n</td><td>2.4 + 5 GHz</td><td>300 Mbit/s</td></tr>
<tr><td>Wi-Fi 5</td><td>802.11ac wave1</td><td>5 GHz</td><td>1300 Mbit/s</td></tr>
<tr><td>(Wi-Fi 5)</td><td>802.11ac wave2</td><td>5 GHz</td><td>6.9 Gbit/s</td></tr>
<tr><td>Wi-Fi 6</td><td>802.11ax</td><td>2.4 + 5 GHz</td><td>9.6 Gbit/s</td></tr>
</table>
<h4>3 ยุคของ Wi-Fi ในสำนักงาน</h4>
<ol>
<li><b>Primary mobile office</b>: wireless เป็นส่วนเสริมของ wired, แก้ปัญหา "wireless access" (802.11a/b/g, hotspot ตามร้านกาแฟ สนามบิน โรงแรม) AP ยังเป็นแบบ single access point หรือ <b>FAT AP</b> และยังไม่มีข้อกำหนดชัดเจนด้านความปลอดภัย ความจุ roaming</li>
<li><b>Wireless office</b>: wired + wireless ผสานกัน (รวมถึงแขกขององค์กร) บริการวิดีโอ/เสียงต้องการ bandwidth สูง; 802.11ac (ตั้งแต่ปี 2012) ปรับ band, channel bandwidth, modulation/coding ให้ throughput สูง รบกวนน้อย รองรับผู้ใช้มากขึ้น</li>
<li><b>All-wireless office</b>: wireless เป็นศูนย์กลาง ไม่มี port สายที่โต๊ะ; cloud desktop, 4K video, VR/AR ย้ายมาบน wireless; <b>Wi-Fi 6 (2018)</b> เพิ่ม capacity เข้าสู่ยุค 10 Gbit/s และ multi-user concurrent performance <b>x4</b></li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>802.11 = <b>data link + physical</b>; 802.11n = Wi-Fi 4, 802.11ac = Wi-Fi 5, 802.11ax = Wi-Fi 6</li>
<li>Wi-Fi Alliance = รับรอง interoperability; IEEE = กำหนดมาตรฐาน; IETF = CAPWAP</li>
<li>FAT AP เกิดในยุคแรกที่ wireless เป็นแค่ส่วนเสริม</li>
</ul></div>`
    },
    {
      t: "12.2 อุปกรณ์และสถาปัตยกรรม: FAT AP, AC + FIT AP, Agile Distributed",
      ref: "หน้า 378-381",
      html: `
<h4>อุปกรณ์ WLAN</h4>
<figure><img src="i/p379_1.webp" alt="อุปกรณ์ WLAN ฝั่งบ้านและฝั่งองค์กร" loading="lazy"><figcaption>Fig. 12.2 Home wireless devices and enterprise wireless devices</figcaption></figure>
<ul>
<li><b>Home</b>: Wi-Fi router แปลงสัญญาณ wired เป็น wireless ให้คอมพิวเตอร์/มือถือในบ้าน</li>
<li><b>Enterprise</b>: <b>AP</b> (Access Point), <b>AC</b> (Access Controller), <b>PoE switch</b>, <b>STA</b> (station)</li>
<li><b>PoE (Power over Ethernet)</b> ส่งไฟฟ้าไปให้อุปกรณ์ปลายทางผ่านสายข้อมูลหรือคู่สายที่ว่าง; PoE switch จ่ายไฟให้ AP โดยไม่ต้องเดินสายไฟแยก</li>
<li><b>STA</b>: อุปกรณ์ปลายทางที่รองรับ 802.11 เช่น คอมพิวเตอร์ที่มีการ์ด wireless และมือถือ</li>
</ul>
<h4>โครงสร้างของ WLAN</h4>
<p>แบ่งเป็น <b>wired side</b> (จาก AP uplink ไป Internet ใช้ Ethernet) และ <b>wireless side</b> (จาก STA ถึง AP ใช้ 802.11)</p>
<figure><img src="i/p380_1.webp" alt="สถาปัตยกรรม WLAN: STA เชื่อม AP ผ่านสวิตช์ ไป AC และ Internet" loading="lazy"><figcaption>Fig. 12.3 WLAN networking architecture: wired side (AP ถึง Internet) และ wireless side (STA ถึง AP)</figcaption></figure>
<table>
<tr><th>เรื่อง</th><th>FAT AP</th><th>AC + FIT AP</th></tr>
<tr><td>แนวคิด</td><td>Autonomous: AP ทำครบทุกอย่างเอง (user access, encrypt, forward)</td><td>Centralized: AC ควบคุม, FIT AP ถูกจัดการโดย AC</td></tr>
<tr><td>AP ทำอะไร</td><td>access + encrypt + forward ทั้งหมด</td><td>802.11 encrypt/decrypt, PHY layer, อยู่ภายใต้ AC</td></tr>
<tr><td>AC ทำอะไร</td><td>ไม่มี</td><td>access control, forwarding, statistics, config/monitor AP, roaming, network management agent, security control</td></tr>
<tr><td>เหมาะกับ</td><td>บ้าน (coverage เล็ก)</td><td>องค์กรกลาง-ใหญ่</td></tr>
<tr><td>ข้อเสีย</td><td>หลายตัวต้อง config ทีละตัว ไม่มีศูนย์กลาง ดูแลลำบาก</td><td>ฟีเจอร์เยอะ ต้องการผู้ดูแลที่เชี่ยวชาญ</td></tr>
</table>
<h4>Agile Distributed AP Architecture</h4>
<p>สัญญาณ Wi-Fi ผ่านผนังแล้วเกิด blind spot และโรงแรม/หอพักต้องใช้ AP นับพันตัว Huawei จึงเสนอ <b>agile distributed Wi-Fi</b> ที่เปลี่ยนจาก Layer 2 AC + FIT AP เป็น <b>Layer 3 แบบกระจาย: AC + central AP + remote RF unit</b></p>
<figure><img src="i/p381_1.webp" alt="Agile distributed AP: AC, central AP และ RF unit ในแต่ละห้อง" loading="lazy"><figcaption>Fig. 12.4 Agile distributed AP architecture: central AP ประมวลผลรวมศูนย์, RF unit กระจายเข้าห้องด้วยสาย</figcaption></figure>
<ul>
<li><b>Central AP</b> ประมวลผล service, configuration, roaming รวมศูนย์ ลดจำนวนจุดที่ต้องจัดการ</li>
<li><b>RF unit</b> แค่ทำ wireless access และ forward ข้อมูล ส่งเข้าห้องผ่านสายแลน ทำให้ครอบคลุมไม่มีจุดอับ</li>
<li>ผลลัพธ์ตามตำรา: ผู้ใช้ต่อห้องเพิ่มจาก 32 เป็น 80, bandwidth ต่อผู้ใช้จาก 10 เป็น 20 Mbit/s, ประสิทธิภาพเพิ่ม 20% เทียบกับ AP ทั่วไป</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>FAT AP = บ้าน/ไม่มีศูนย์กลาง; AC + FIT AP = องค์กร/รวมศูนย์</li>
<li>Agile distributed = <b>AC + central AP + RF unit</b> (แก้ปัญหาหลายห้อง เช่น โรงแรม หอพัก)</li>
<li>PoE จ่ายไฟผ่านสาย LAN</li>
</ul></div>`
    },
    {
      t: "12.3 Wired Networking: CAPWAP, AP-AC Networking, AC Connection",
      ref: "หน้า 381-384",
      html: `
<h4>CAPWAP (Control and Provisioning of Wireless Access Points)</h4>
<p>เมื่อต้องจัดการ AP จำนวนมากรวมศูนย์ IETF จึงกำหนด <b>CAPWAP</b> ให้ AC สร้าง <b>CAPWAP tunnel</b> กับ AP แล้วจัดการและควบคุม AP ผ่าน tunnel นั้น</p>
<figure><img src="i/p382_1.webp" alt="AC สร้าง CAPWAP tunnel ไปยัง AP แต่ละตัว" loading="lazy"><figcaption>Fig. 12.5 CAPWAP Tunnel: AC จัดการ AP ผ่าน tunnel</figcaption></figure>
<p>หน้าที่ของ CAPWAP tunnel: ดูแลสถานะระหว่าง AP กับ AC, ส่ง service configuration จาก AC ไป AP, และเมื่อใช้ tunnel forwarding ก็ใช้ส่งข้อมูลของ STA ไปยัง AC</p>
<ul>
<li>CAPWAP เป็น <b>application layer protocol บน UDP</b></li>
<li>ส่ง 2 ชนิด: <b>Management (control) traffic</b> = <b>UDP port 5246</b> และ <b>Service data traffic</b> (encapsulate 802.11 data frame) = <b>UDP port 5247</b></li>
</ul>
<h4>AP-AC networking: Layer 2 vs Layer 3</h4>
<figure><img src="i/p383_1.webp" alt="AP-AC networking: AC ต่อ AP1 และ AP2 ผ่านเครือข่าย Layer 2 (ซ้าย) และ Layer 3 (ขวา)" loading="lazy"><figcaption>Fig. 12.6 AP-AC networking method: Layer 2 (ซ้าย) และ Layer 3 (ขวา)</figcaption></figure>
<table>
<tr><th>เรื่อง</th><th>Layer 2 networking</th><th>Layer 3 networking</th></tr>
<tr><td>ลักษณะ</td><td>AP กับ AC ต่อตรง หรือเป็นเครือข่าย L2</td><td>ระหว่าง AP กับ AC เป็นเครือข่าย L3</td></tr>
<tr><td>การค้นหา AC</td><td>plug and play ผ่าน L2 broadcast หรือ DHCP</td><td>AP หา AC ตรง ๆ ไม่ได้ ต้องใช้ DHCP, DNS หรือ config static IP</td></tr>
<tr><td>เหมาะกับ</td><td>เครือข่ายง่าย ๆ ชั่วคราว, config เร็ว แต่ไม่เหมาะกับเครือข่ายใหญ่</td><td>เครือข่ายใหญ่ (AC หนึ่งตัวคุม AP หลักสิบถึงหลักร้อย) เช่น AP กระจายตามห้อง AC อยู่ห้อง server</td></tr>
</table>
<h4>AC connection: Direct vs Bypass</h4>
<figure><img src="i/p383_2.webp" alt="(a) direct networking AC อยู่บนเส้นทาง (b) bypass mode AC ต่อด้านข้างและมี CAPWAP tunnel" loading="lazy"><figcaption>Fig. 12.7 AC connection method: (a) Direct networking (b) Networking in bypass mode</figcaption></figure>
<table>
<tr><th>เรื่อง</th><th>Direct networking</th><th>Bypass mode</th></tr>
<tr><td>ตำแหน่ง AC</td><td>อยู่ใน <b>forwarding path</b> ของผู้ใช้</td><td>ต่อแยกออกมา ไม่อยู่ในเส้นทางระหว่าง AP กับ uplink</td></tr>
<tr><td>ข้อมูลผู้ใช้</td><td>ต้องผ่าน AC เสมอ</td><td>ข้อมูลไป uplink ได้โดยไม่ผ่าน AC (ถ้า direct forwarding)</td></tr>
<tr><td>ข้อดี</td><td>โครงสร้างชัดเจน ติดตั้งง่าย</td><td>ขยายเครือข่ายเดิมง่าย แค่เพิ่ม AC (เช่นที่ aggregation switch)</td></tr>
<tr><td>ข้อเสีย</td><td>กิน forwarding capacity ของ AC ถ้า AC อ่อนจะเป็น bottleneck</td><td>AC จัดการ AP เท่านั้น</td></tr>
</table>
<p>ใน bypass mode: <b>management traffic</b> ถูกห่อใน CAPWAP tunnel; <b>data traffic</b> ส่งผ่าน CAPWAP data tunnel ผ่าน AC (tunnel forwarding) หรือส่งตรง (direct forwarding) ผ่าน aggregation switch ไปเครือข่ายด้านบน เครือข่ายไร้สายส่วนใหญ่ขยายจากเครือข่ายเดิมทีหลัง จึงนิยม bypass มากกว่า</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>CAPWAP: control UDP <b>5246</b>, data UDP <b>5247</b></li>
<li>L3 networking: AP ต้องค้นหา AC ผ่าน DHCP/DNS/static; L2 ใช้ broadcast ได้</li>
<li>Bypass mode ใช้มากกว่า; Direct mode AC อาจเป็น bottleneck</li>
</ul></div>`
    },
    {
      t: "12.4 หลักการ Wireless: คลื่น, Channel, BSS, SSID, VAP, ESS",
      ref: "หน้า 384-390",
      html: `
<h4>ระบบสื่อสารไร้สาย</h4>
<figure><img src="i/p384_1.webp" alt="ระบบสื่อสารไร้สาย: source coding, channel coding, modulation, ช่องสัญญาณ, demodulation, decoding" loading="lazy"><figcaption>Fig. 12.8 Wireless communication system</figcaption></figure>
<ul>
<li><b>Source coding</b>: แปลงข้อมูลต้นฉบับ (ภาพ ข้อความ เสียง) เป็นสัญญาณดิจิทัล</li>
<li><b>Channel coding</b>: error detection/correction ลด error จาก noise เพิ่มความน่าเชื่อถือของ channel</li>
<li><b>Modulation</b>: ซ้อนสัญญาณดิจิทัลบนสัญญาณความถี่สูงเพื่อแปลงเป็นคลื่นวิทยุแล้วส่งผ่านเสาอากาศ</li>
<li><b>Information channel</b>: ช่องส่งข้อมูล (ของไร้สายคือคลื่นวิทยุในอากาศ); <b>Air interface</b>: interface ที่อุปกรณ์ใช้เชื่อมกับ channel (มองไม่เห็น)</li>
<li>ฝั่งรับ: demodulate → decode → ได้ข้อมูล</li>
</ul>
<h4>คลื่นแม่เหล็กไฟฟ้า และความถี่ที่ WLAN ใช้</h4>
<figure><img src="i/p385_1.webp" alt="สเปกตรัมคลื่นแม่เหล็กไฟฟ้าตั้งแต่ ELF จนถึงแสง" loading="lazy"><figcaption>Fig. 12.9 Wireless electromagnetic wave spectrum: คลื่นวิทยุ (RF) ความถี่ 3 Hz - 300 GHz</figcaption></figure>
<p>คลื่นวิทยุ (RF) มีความถี่ <b>3 Hz - 300 GHz</b> WLAN ใช้ย่าน <b>2.4 GHz</b> (2.4 - 2.4835 GHz) และ <b>5 GHz</b> (5.15 - 5.35 GHz และ 5.725 - 5.85 GHz)</p>
<h4>Channel</h4>
<p>ถ้าใช้คลื่นตามใจจะรบกวนกัน จึงต้องแบ่งย่านความถี่เป็นช่วงเรียกว่า channel อุปกรณ์ที่อยู่ใกล้กันควรใช้ channel ต่างกัน ในย่าน 2.4 GHz มี 14 channel (channel 14 มักไม่ใช้) อุปกรณ์ทั่วไปรองรับ <b>13 channel</b> แต่ละ channel กว้างประสิทธิผล <b>20 MHz</b> พร้อม <b>guard band 2 MHz</b> เช่น channel 1 center 2412 MHz ใช้ช่วง 2401 - 2423 MHz</p>
<figure><img src="i/p386_1.webp" alt="การแบ่ง channel 2.4 GHz เห็น channel 1, 6, 11 ไม่ซ้อนกัน" loading="lazy"><figcaption>Fig. 12.10 Division of the 2.4 GHz channel: channel 1, 6, 11 (เส้นเข้ม) ไม่ซ้อนทับกัน</figcaption></figure>
<ul>
<li>ค่า center frequency: channel n = 2407 + 5n MHz (n = 1..13), เช่น ch1 = 2412, ch6 = 2437, ch11 = 2462 MHz</li>
<li><b>Non-overlapping 3 channel</b>: <b>1, 6, 11</b> และยังมีกลุ่มอื่นอีก 3 กลุ่ม: 2-7-12, 3-8-13, 4-9-14</li>
<li>ถ้า AP ข้างเคียงใช้ channel ซ้อนกัน หรือ power สูงเกิน จะเกิดการรบกวน → ใช้ <b>RF tuning</b> ปรับ channel และ power อัตโนมัติให้สมดุลภายใต้ AC เดียวกัน</li>
</ul>
<h4>BSS / BSSID / SSID</h4>
<figure><img src="i/p387_1.webp" alt="BSS: AP ชื่อ Office1AP มี SSID และ BSSID และ STA หลายเครื่องค้นพบ" loading="lazy"><figcaption>Fig. 12.11 BSS: พื้นที่ที่ AP หนึ่งตัวครอบคลุมรวมกับ STA ของมัน (ตัวอย่าง SSID Office1AP, BSSID 00e0.fc45.24a0)</figcaption></figure>
<ul>
<li><b>BSS (Basic Service Set)</b>: หน่วยบริการพื้นฐาน = AP + STA ที่ AP นั้นครอบคลุม</li>
<li><b>BSSID</b>: ตัวระบุ BSS = <b>MAC address ของ AP</b> (data link layer) ไม่ซ้ำกัน</li>
<li><b>SSID (Service Set Identifier)</b>: ชื่อเครือข่ายที่คนอ่านรู้เรื่อง (string) ใช้แทน BSSID ให้ผู้ใช้เลือกง่าย; AP broadcast SSID ให้อุปกรณ์เห็น</li>
</ul>
<figure><img src="i/p388_1.webp" alt="รายชื่อ SSID ที่ laptop ค้นพบ" loading="lazy"><figcaption>Fig. 12.12 SSIDs discovered: ชื่อเครือข่ายที่เห็นบน laptop คือ SSID</figcaption></figure>
<h4>VAP (Virtual AP)</h4>
<p>เดิม AP หนึ่งตัวรองรับ 1 BSS ถ้าอยากได้หลาย BSS ในที่เดียวต้องใช้หลาย AP ซึ่งแพงและกิน channel ปัจจุบันสร้าง <b>VAP</b> หลายตัวบน AP จริงตัวเดียว แต่ละ VAP = 1 BSS และตั้ง SSID, password, <b>service VLAN</b> ต่างกันได้ เช่น VAP1 อยู่ VLAN 10 (ห้ามออก Internet) และ VAP2 อยู่ VLAN 20 (ออก Internet ได้)</p>
<figure><img src="i/p389_1.webp" alt="AP หนึ่งตัวแบ่งเป็น VAP1 และ VAP2 ที่มี SSID และ VLAN ต่างกัน" loading="lazy"><figcaption>Fig. 12.13 VAP: AP เดียวให้หลายบริการแยกกลุ่มผู้ใช้ด้วย SSID/VLAN</figcaption></figure>
<div class="warn"><b>ระวัง</b>: VAP ไม่ใช่ AP จริง VAP ทั้งหมดแชร์ hardware/software และ <b>channel เดียวกัน</b> จึง capacity ของ AP คงเดิม ไม่ได้เพิ่มตามจำนวน VAP; VAP มากเกินไปทำให้ผู้ใช้หา SSID ยากและ config ซับซ้อน</div>
<h4>ESS (Extended Service Set) และ Roaming</h4>
<p><b>ESS</b> คือ BSS หลายตัวที่ใช้ <b>SSID เดียวกัน</b> รวมเป็น BSS เสมือนที่ใหญ่ขึ้น ผู้ใช้ย้ายระหว่าง BSS โดยไม่รู้สึกว่า SSID เปลี่ยน เมื่อ STA ย้ายระหว่าง AP ใน ESS เดียวกันแล้วบริการไม่สะดุด เรียกว่า <b>WLAN roaming</b></p>
<figure><img src="i/p390_1.webp" alt="ESS: หลาย AP ต่อกับ distribution system และมี SSID เดียวกัน" loading="lazy"><figcaption>Fig. 12.14 ESS: หลาย BSS ที่ SSID เดียวกันเป็น ESS ทำให้ roaming ได้</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>Non-overlapping 2.4 GHz: <b>1, 6, 11</b>; channel กว้าง 20 MHz; Wi-Fi ใช้ 2.4 และ 5 GHz</li>
<li>BSSID = MAC ของ AP; SSID = ชื่อเครือข่าย; BSS = AP + STA; ESS = BSS หลายตัว SSID เดียวกัน</li>
<li>VAP = หนึ่ง AP หลาย BSS (SSID/VLAN/password ต่างกันได้) แต่แชร์ channel และ capacity</li>
</ul></div>`
    },
    {
      t: "12.5 หลักการทำงานของ WLAN: AP Go Online",
      ref: "หน้า 390-396",
      html: `
<p>ในสถาปัตยกรรม AC + FIT AP ทุก config ทำบน AC กระบวนการทำงานของ WLAN มี 4 phase</p>
<figure><img src="i/p391_1.webp" alt="ผัง WLAN และ 4 ขั้นตอน: AP go online, deliver config, STA access, forwarding" loading="lazy"><figcaption>Fig. 12.15 Working process of WLAN: (1) AP goes online (2) Deliver WLAN service configuration (3) STA access (4) WLAN service data forwarding</figcaption></figure>
<h4>0) Pre-configuration บน AC</h4>
<ul>
<li><b>Network interworking</b>: ตั้ง DHCP server (หรือใช้ AC เป็น DHCP server) ให้ AP และ STA, ให้ AP เชื่อมถึง DHCP server และ AC ได้</li>
<li><b>AP group</b>: AP หนึ่งตัวอยู่ได้ <b>เพียง 1 group</b> ใช้ config ร่วมกันหลายตัว</li>
<li><b>Regulatory domain profile</b>: country/area code, tuning channel set, bandwidth</li>
<li><b>Source interface / address</b>: AC ต้องระบุ IP (VLANIF หรือ Loopback) เพื่อให้ AP สร้าง <b>CAPWAP tunnel</b> ได้ (ตั้งโดย <code>capwap source interface ...</code>)</li>
<li><b>Auto upgrade</b> (optional) และ <b>การเพิ่ม AP</b> (authentication mode)</li>
</ul>
<h4>1) AP ได้ IP address</h4>
<p>AP ต้องมี IP ก่อนคุยกับ AC: <b>static</b> (login เข้า AP แล้วตั้งเอง) หรือ <b>DHCP</b> (AP เป็น DHCP client; server จะเป็น Windows/Linux, AC, L3 switch หรือ router ก็ได้)</p>
<h4>2) AP discover AC และสร้าง CAPWAP tunnel</h4>
<figure><img src="i/p392_1.webp" alt="AP ส่ง Discovery Request และ AC ตอบ Discovery Response" loading="lazy"><figcaption>Fig. 12.16 AP discovers AC: Discovery Request (AP → AC) และ Discovery Response (AC → AP)</figcaption></figure>
<table>
<tr><th>วิธี</th><th>รายละเอียด</th></tr>
<tr><td><b>Static</b></td><td>ตั้ง list IP ของ AC บน AP ไว้ AP ส่ง Discovery Request แบบ <b>unicast</b> ไปทุก AC ใน list แล้วเลือกจาก Discovery Response</td></tr>
<tr><td><b>Dynamic: DHCP</b></td><td>DHCP response ต้องมี <b>Option 43</b> บรรจุ list IP ของ AC (sub-option 3) AP ส่ง Discovery Request (unicast/broadcast) AC ตอบ unicast Discovery Response; AP เลือก AC จาก <b>priority</b> หรือ <b>จำนวน AP ที่ AC นั้นมีอยู่</b></td></tr>
<tr><td><b>Dynamic: DNS</b></td><td>ใช้ชื่อโดเมนค้นหา AC (ตำราเน้น DHCP และ broadcast)</td></tr>
<tr><td><b>Dynamic: Broadcast</b></td><td>ถ้า DHCP/DNS ไม่ได้ผลหรือไม่มีคำตอบ AP broadcast Discovery Request; AC ตรวจว่า AP มีสิทธิ์ (MAC หรือ SN ที่อนุญาต) แล้วตอบหรือปฏิเสธ; ใช้ได้เฉพาะเครือข่ายที่ <b>Layer 2 ถึงกัน</b></td></tr>
</table>
<p>ตัวอย่าง Option 43 สำหรับ AC 192.168.22.1:</p>
<pre><code>option 43 sub-option 3 ascii 192.168.22.1
option 43 sub-option 3 hex 3139322E3136382E32322E31
# หลาย AC คั่นด้วย "," (ASCII = 2C)
option 43 sub-option 3 ascii 192.168.22.1,192.168.22.2</code></pre>
<p>sub-option 3 เป็นค่าคงที่ (ชนิดของ sub-option) ส่วน hex/ascii คือรูปแบบของ IP AC CAPWAP tunnel ประกอบด้วย <b>data channel</b> (ส่ง service data ไปที่ AC; เลือกเข้ารหัสด้วย <b>DTLS</b> ได้) และ <b>control channel</b> (แลกเปลี่ยน management message; เลือก DTLS ได้เช่นกัน)</p>
<h4>3) AP access control (Join)</h4>
<figure><img src="i/p394_1.webp" alt="AP ส่ง Join Request และ AC ตอบ Join Response หลังขั้น Discovery" loading="lazy"><figcaption>Fig. 12.17 AP joins AC: Join Request / Join Response</figcaption></figure>
<p>AP ส่ง <b>Join Request</b> AC ตรวจความถูกต้อง ถ้าผ่านจะเพิ่ม AP แล้วตอบ <b>Join Response</b> วิธียืนยันตัว AP: <b>MAC authentication</b>, <b>SN (serial number) authentication</b>, <b>no authentication</b></p>
<table>
<tr><th>วิธีเพิ่ม AP บน AC</th><th>รายละเอียด</th></tr>
<tr><td>Offline import</td><td>ตั้ง MAC และ SN ของ AP ล่วงหน้า ตรงกันเมื่อ AP ต่อเข้ามา AC สร้าง connection</td></tr>
<tr><td>Auto-discovery</td><td>ถ้า mode = no-auth หรือเป็น MAC/SN และ AP อยู่ใน whitelist AP จะถูกค้นพบและ online อัตโนมัติ</td></tr>
<tr><td>Manual confirm</td><td>MAC/SN auth แต่ AP ไม่ได้ import และไม่อยู่ใน whitelist → อยู่ใน <b>unauthenticated AP list</b> ต้องให้ผู้ดูแลยืนยันเอง</td></tr>
</table>
<h4>4) Version upgrade</h4>
<figure><img src="i/p395_1.webp" alt="หลัง Join แล้ว AP ส่ง Image data Request และ AC ตอบ Image data Response" loading="lazy"><figcaption>Fig. 12.18 Version upgrade request and response: AP ขอ image เมื่อ version ไม่ตรง แล้ว restart และทำขั้นก่อนหน้าซ้ำ</figcaption></figure>
<p>AP เทียบ version กับที่ AC ระบุใน Join Response ถ้าไม่ตรงจะส่ง <b>Image Data Request</b> เพื่อดาวน์โหลดและอัปเกรด แล้ว restart และทำซ้ำสามขั้นก่อนหน้า</p>
<table>
<tr><th>โหมดอัปเกรด (แหล่ง image)</th><th>เหมาะกับ</th></tr>
<tr><td><b>AC mode</b></td><td>AP จำนวนน้อย</td></tr>
<tr><td><b>FTP mode</b></td><td>ความปลอดภัยต่ำ ข้อมูลส่ง plain text (ไม่ปลอดภัย)</td></tr>
<tr><td><b>SFTP mode</b></td><td>ความปลอดภัยสูง เข้ารหัสและ integrity protection</td></tr>
</table>
<ul>
<li><b>Auto upgrade</b>: ใช้เมื่อ AP ยังไม่ online บน AC (ตั้ง parameter ก่อนแล้วจึงเพิ่ม AP); ถ้า AP online อยู่แล้ว จะอัปเกรดเมื่อ restart</li>
<li><b>Timed upgrade</b>: ใช้เมื่อ AP online และให้บริการ WLAN อยู่ ตั้งเวลาช่วง traffic ต่ำ</li>
</ul>
<h4>5) CAPWAP tunnel maintenance</h4>
<ul>
<li><b>Data channel</b>: แลก <b>Keepalive</b> (UDP 5247)</li>
<li><b>Control channel</b>: แลก <b>Echo</b> (UDP 5246)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>ลำดับ: <b>IP → Discovery Req/Resp → Join Req/Resp → (Image data) → tunnel maintenance</b></li>
<li>DHCP Option 43 บอก AP ว่า AC อยู่ที่ IP ไหน (sub-option 3)</li>
<li>AP auth: <b>mac-auth, sn-auth, no-auth</b> (default mac-auth)</li>
<li>Keepalive = data (5247), Echo = control (5246)</li>
</ul></div>`
    },
    {
      t: "12.6 Deliver Service Config, Profile และ STA Access",
      ref: "หน้า 396-402",
      html: `
<h4>การส่ง WLAN service configuration</h4>
<figure><img src="i/p396_1.webp" alt="AC ส่ง Configuration Update Request และ AP ตอบ Configuration Update Response" loading="lazy"><figcaption>Fig. 12.19 Configuration update request and response</figcaption></figure>
<p>AC ส่ง <b>Configuration Update Request</b> AP ตอบ <b>Configuration Update Response</b> แล้ว AC ส่ง service configuration ให้ AP หลัง AP online แล้วจะส่ง <b>Configuration Status Request</b> (ใส่ config ปัจจุบันของตน) ไปที่ AC ถ้าไม่ตรงข้อกำหนดของ AC จะแจ้งผ่าน Configuration Status Response</p>
<h4>AP group และ Profile</h4>
<ul>
<li>AP หลายตัวที่ต้อง config เหมือนกันจัดเข้า <b>AP group</b>; AP ที่มีค่าเฉพาะตัวตั้งใน AP นั้นโดยตรง; AP หนึ่งตัวอยู่ได้ group เดียว</li>
<li>เมื่อ AP ได้ทั้ง config ของ group และ config เฉพาะตัว <b>config ของ AP เองมี priority</b> ("AP configuration is preferred")</li>
</ul>
<figure><img src="i/p397_1.webp" alt="RF ของ AP หรือ AP group อ้าง regulatory domain, RF, VAP profile และ RF parameter" loading="lazy"><figcaption>Fig. 12.20 Profiles referenced by APs or AP groups</figcaption></figure>
<table>
<tr><th>Profile</th><th>หน้าที่ / parameter สำคัญ</th></tr>
<tr><td><b>Regulatory domain</b></td><td><b>country code</b> (ระบุ transmit power และ channel ที่ใช้ได้ตามกฎหมายแต่ละประเทศ), tuning channel set (ขอบเขตการปรับ channel อัตโนมัติ หลีกเลี่ยง radar channel)</td></tr>
<tr><td><b>RF profile</b></td><td>ปรับ RF ให้เหมาะกับสภาพจริง: RF type, rate, multicast rate, beacon interval</td></tr>
<tr><td><b>VAP profile</b></td><td>เมื่อ reference ใน AP group/AP จะสร้าง VAP บน AP; ภายในอ้าง SSID, security, traffic profile</td></tr>
<tr><td><b>RF parameter</b></td><td>ตั้ง channel (เลือก non-overlapping), transmit power, antenna gain, timeout ของ ACK (ระยะห่าง AP ต่างกัน)</td></tr>
</table>
<h4>VAP profile</h4>
<figure><img src="i/p398_1.webp" alt="VAP profile อ้าง SSID profile และ security profile พร้อม data forwarding และ service VLAN" loading="lazy"><figcaption>Fig. 12.21 VAP parameters to be configured and profiles referenced</figcaption></figure>
<ul>
<li><b>SSID profile</b>: ชื่อ SSID; ซ่อน SSID (เฉพาะคนรู้ชื่อต่อได้), จำนวนผู้ใช้สูงสุดต่อ VAP, ซ่อน SSID อัตโนมัติเมื่อผู้ใช้เต็ม</li>
<li><b>Security profile</b>: authenticate/encrypt: open, WEP, WPA/WPA2-PSK, WPA/WPA2-802.1X</li>
<li><b>Data forwarding method</b>: tunnel (centralized) หรือ direct (local)</li>
<li><b>Service VLAN</b>: ถ้าเป็น VLAN เดียว ที่มีผู้ใช้หนาแน่น IP จะไม่พอ ขณะที่ที่อื่นเหลือ; ใช้ <b>VLAN pool</b> ให้ SSID เดียวรองรับหลาย VLAN, STA ใหม่ถูกกระจายเข้า VLAN ใน pool ลด broadcast domain และใช้ IP คุ้ม</li>
</ul>
<h4>STA access 6 ขั้น</h4>
<p>หลัง CAPWAP tunnel พร้อม STA เข้าเครือข่ายได้ใน 6 phase: <b>scanning → link authentication → association → access authentication → STA address assignment (DHCP) → user authentication</b></p>
<h4>1) Scanning</h4>
<figure><img src="i/p400_1.webp" alt="Active scanning: STA ส่ง Probe Request ทุก channel แล้ว AP ตอบ Probe Response" loading="lazy"><figcaption>Fig. 12.22 Active scanning: ส่ง Probe Request (มี SSID เจาะจง หรือไม่มี SSID แบบ broadcast) แล้ว AP ตอบ Probe Response</figcaption></figure>
<table>
<tr><th>แบบ scanning</th><th>วิธีการ</th></tr>
<tr><td>Active (ระบุ SSID)</td><td>STA ส่ง <b>Probe Request ที่มี SSID</b> ทีละ channel; เฉพาะ AP ที่ให้ SSID นั้นตอบ Probe Response</td></tr>
<tr><td>Active (ไม่ระบุ SSID)</td><td>STA ส่ง <b>broadcast Probe Request</b>; AP ที่ได้รับตอบ Probe Response โฆษณา wireless network ที่มี</td></tr>
<tr><td>Passive</td><td>STA <b>ฟัง Beacon frame</b> ที่ AP ส่งเป็นระยะ (SSID, supported rate); default <b>100 TU</b> (1 TU = 1024 µs ≈ 102.4 ms)</td></tr>
</table>
<h4>2) Link authentication</h4>
<p>802.11 กำหนด 2 แบบ: <b>Open system authentication</b> (ไม่ตรวจเลย STA ใดก็ผ่าน) และ <b>Shared key authentication</b> (STA กับ AP ตั้ง shared key เหมือนกันและตรวจว่าตรงกัน)</p>
<p>นโยบายความปลอดภัย: <b>WEP, WPA, WPA2</b> แต่ละอันประกอบด้วย link authentication, user access authentication และการ encrypt ข้อมูล</p>
<h4>3) Association</h4>
<p>หลัง link authentication STA ส่ง <b>Association</b> message เพื่อ <b>negotiate link service</b> (supported rate, channel ฯลฯ)</p>
<h4>4) Access authentication</h4>
<p>แยกผู้ใช้และจำกัดสิทธิ์ก่อนใช้งานเครือข่าย ปลอดภัยกว่า link authentication ได้แก่ <b>PSK</b> และ <b>802.1X</b></p>
<h4>5) STA address assignment</h4>
<p>STA ต้องมี IP จึงจะ online ปกติ ปกติใช้ <b>DHCP</b> โดย AC หรือ <b>aggregation layer switch</b> เป็น DHCP server (นิยมใช้ aggregation switch)</p>
<h4>6) User authentication</h4>
<p>เป็นความปลอดภัยแบบ end-to-end ได้แก่ <b>802.1X, MAC authentication, Portal authentication</b> (Web authentication) ผู้ใช้ต้องผ่านหน้า portal เช่น login ด้วย WeChat หรือ SMS (ผูกกับตัวตนจริง จึงตรวจสอบย้อนหลังได้)</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>STA 6 ขั้น: <b>Scanning, Link auth, Association, Access auth, DHCP, User auth</b></li>
<li>Active scan = Probe Request/Response, Passive scan = ฟัง Beacon (100 TU)</li>
<li>Link auth: open system หรือ shared key</li>
<li>Profile: AP group/AP → regulatory domain, RF, VAP; VAP → SSID + security + forwarding + service VLAN</li>
</ul></div>`
    },
    {
      t: "12.7 WLAN Service Data Forwarding",
      ref: "หน้า 402-403",
      html: `
<p>CAPWAP มี control message (management) ที่ forward ผ่าน control channel และ data message ที่เลือกได้ 2 โหมด</p>
<figure><img src="i/p402_1.webp" alt="(a) tunnel forwarding ข้อมูลผ่าน AC (b) direct forwarding ข้อมูลไม่ผ่าน AC" loading="lazy"><figcaption>Fig. 12.23 Tunnel forwarding (a) and direct forwarding (b)</figcaption></figure>
<table>
<tr><th>เรื่อง</th><th>Tunnel forwarding (centralized)</th><th>Direct forwarding (local)</th></tr>
<tr><td>กลไก</td><td>data ถูก encapsulate ใน CAPWAP data tunnel ส่งไป <b>AC</b> แล้ว AC ส่งต่อไปเครือข่ายด้านบน</td><td>AP ส่ง data ไปเครือข่ายด้านบน <b>ตรง ๆ</b> ไม่ผ่าน CAPWAP</td></tr>
<tr><td>ข้อดี</td><td>AC ควบคุมรวมศูนย์ ปลอดภัย จัดการสะดวก</td><td>ประสิทธิภาพ forward สูงกว่า ลดภาระ AC</td></tr>
<tr><td>ข้อเสีย</td><td>ต้องผ่าน AC ประสิทธิภาพต่ำกว่า AC ภาระสูง</td><td>ควบคุมบริการแบบรวมศูนย์ยาก</td></tr>
<tr><td>config</td><td><code>forward-mode tunnel</code></td><td><code>forward-mode direct-forward</code></td></tr>
</table>
<div class="note"><b>โยงกับ AC connection</b>: Direct networking บังคับให้ data ผ่าน AC อยู่แล้ว ส่วน Bypass mode เลือกได้ทั้ง tunnel (ผ่าน AC) หรือ direct (ไม่ผ่าน AC) เช่น ถ้า AC ต่อ aggregation switch ด้วย interface เดียวและ user traffic ออก Internet ผ่าน aggregation switch โดยไม่ผ่าน AC = bypass + direct forwarding</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>Tunnel = <b>ผ่าน AC</b> (centralized); Direct = <b>ไม่ผ่าน AC</b> (local)</li>
<li>Control/management traffic ผ่าน CAPWAP control channel เสมอ</li>
</ul></div>`
    },
    {
      t: "12.8 กรณีศึกษา: Layer 2 Bypass + Tunnel Forwarding",
      ref: "หน้า 403-413",
      html: `
<h4>โจทย์</h4>
<p>พนักงานเข้า WLAN เพื่อ mobile office พื้นฐาน: AC networking = <b>Layer 2 bypass</b>, DHCP = <b>AC เป็น DHCP server</b> ให้ AP และ STA, forwarding = <b>tunnel</b> เพราะ tunnel forwarding ทำให้ service VLAN ของสองห้องส่งเข้า AC ผ่าน CAPWAP จึงเหมือน VLAN ต่อเข้า AC (AC เปรียบเหมือน router ที่ต่อ VLAN 100, 101, 102)</p>
<figure><img src="i/p403_1.webp" alt="Topology กายภาพและลอจิคัลของกรณีศึกษา: AC, SW1, SW2, AP1-AP4, AR" loading="lazy"><figcaption>Fig. 12.24 Network topology: physical topology (ซ้าย) และ logical topology (ขวา)</figcaption></figure>
<table>
<tr><th>ข้อมูล</th><th>ค่า</th></tr>
<tr><td>AP management VLAN</td><td>VLAN 100 (192.168.100.0/24)</td></tr>
<tr><td>Office1 service VLAN</td><td>VLAN 101 (192.168.101.0/24)</td></tr>
<tr><td>Office2 service VLAN</td><td>VLAN 102 (192.168.102.0/24)</td></tr>
<tr><td>SW1 - AC interconnection VLAN</td><td>VLAN 110 (192.168.110.0/24)</td></tr>
<tr><td>SW1 - AR interconnection VLAN</td><td>VLAN 111 (192.168.111.0/24)</td></tr>
<tr><td>DHCP server</td><td>AC (แจกให้ AP และ STA)</td></tr>
<tr><td>Source interface ของ AC</td><td>Vlanif 100: 192.168.100.1/24</td></tr>
</table>
<figure><img src="i/p406_1.webp" alt="Logical topology: AR, SW1, AC, SW2, AP1-AP4, Office1 VLAN 101 และ Office2 VLAN 102" loading="lazy"><figcaption>Fig. 12.25 Logical topology: AC ทำหน้าที่เหมือน router ต่อ VLAN 100, 101, 102 และเชื่อม SW1 ผ่าน VLAN 110</figcaption></figure>
<table>
<tr><th>Profile</th><th>ค่า</th></tr>
<tr><td>AP group</td><td>ap-Office1 (VAP-Office1, regulatory domain default), ap-Office2 (VAP-Office2, domain default)</td></tr>
<tr><td>Regulatory domain</td><td>default, country code CN</td></tr>
<tr><td>SSID profile</td><td>SSID-Office1 (SSID AP-Office1), SSID-Office2 (SSID AP-Office2)</td></tr>
<tr><td>Security profile</td><td>Sec-Office1 / Sec-Office2: WPA-WPA2 + PSK (password a1234567 / b1234567)</td></tr>
<tr><td>VAP profile</td><td>VAP-Office1: tunnel, service VLAN 101, SSID-Office1 + Sec-Office1; VAP-Office2: tunnel, service VLAN 102, SSID-Office2 + Sec-Office2</td></tr>
</table>
<h4>Roadmap การ config</h4>
<ol>
<li>Network interworking ของ AC, AP และอุปกรณ์รอบข้าง</li>
<li>ให้ AP go online</li>
<li>สร้าง AP group</li>
<li>ตั้ง system parameter ของ AC: country code และ source interface</li>
<li>ตั้ง authentication ของ AP และ import AP แบบ offline</li>
<li>ตั้ง WLAN service parameter (SSID, security, VAP) ให้ STA เข้าได้</li>
</ol>
<h4>ขั้น 1: Network interworking</h4>
<ul>
<li>AC: สร้าง VLAN 100/101/102/110, ให้ Vlanif เป็น gateway (Vlanif 110 = 192.168.110.2), default route ไป 192.168.110.1 (SW1), เปิด DHCP แบบ <code>dhcp select interface</code> ให้ Vlanif 100/101/102</li>
<li>SW1: Vlanif 111 (192.168.111.1) ต่อ AR, Vlanif 110 (192.168.110.1) ต่อ AC, route ไป 192.168.100/101/102.0/24 ด้วย next hop 192.168.110.2 (AC)</li>
<li>AR: route ไป 192.168.0.0/16 ผ่าน 192.168.111.1</li>
<li>port: SW1 GE0/0/1 (ไป SW2) = access VLAN 100; GE0/0/2 (ไป AC) = <b>trunk</b> allow VLAN 110 และ 100; GE0/0/3 (ไป AR) = access VLAN 111</li>
</ul>
<pre><code>[AC]vlan batch 100 101 102 110
[AC]interface Vlanif 100 / ip address 192.168.100.1 24     (101, 102 ทำนองเดียวกัน)
[AC]interface Vlanif 110 / ip address 192.168.110.2 24
[AC]interface GigabitEthernet 0/0/1
[AC-GigabitEthernet0/0/1]port link-type trunk
[AC-GigabitEthernet0/0/1]port trunk allow-pass vlan 110 100
[AC]ip route-static 0.0.0.0 0 192.168.110.1
[AC]dhcp enable
[AC]interface Vlanif 100
[AC-Vlanif100]dhcp select interface        (Vlanif 101, 102 เช่นกัน)
[SW1]ip route-static 192.168.100.0 24 192.168.110.2        (101 และ 102 เช่นกัน)</code></pre>
<h4>ขั้น 2: ให้ AP go online</h4>
<pre><code>[AC]wlan
[AC-wlan-view]regulatory-domain-profile name default
[AC-wlan-regulate-domain-default]country-code cn
[AC-wlan-view]ap-group name ap-Office1
[AC-wlan-ap-group-ap-Office1]regulatory-domain-profile default
Warning: Modifying the country code will clear channel, power and antenna gain ... Continue? [Y/N]:y
[AC]capwap source interface Vlanif 100                 # source ของ CAPWAP tunnel
[AC-wlan-view]ap auth-mode mac-auth                    # mac-auth (default) / sn-auth / no-auth
[AC-wlan-view]ap-id 1 ap-mac 00e0-fcc4-15a0            # import AP แบบ offline
[AC-wlan-ap-1]ap-name ap1
[AC-wlan-ap-1]ap-group ap-Office1</code></pre>
<p>ตรวจด้วย <code>display ap all</code>: ช่อง <b>State = nor</b> (normal) แปลว่า AP online ปกติ ความหมาย State อื่น: <b>commit-failed</b> (ส่ง service config ไม่สำเร็จหลัง online), <b>download</b> (กำลังอัปเกรด), <b>fault</b> (online ไม่สำเร็จ), <b>idle</b> (สถานะเริ่มต้นก่อนตั้ง connection); คอลัมน์ IP คือ IP ของ AP (ในกรณี NAT คือ private IP ของ AP)</p>
<h4>ขั้น 3: WLAN service parameter</h4>
<pre><code>[AC-wlan-view]ssid-profile name ssid-Office1
[AC-wlan-ssid-prof-ssid-Office1]ssid AP-Office1
[AC-wlan-view]security-profile name Sec-Office1
[AC-wlan-sec-prof-Sec-Office1]security wpa-wpa2 psk pass-phrase a1234567 aes
[AC-wlan-view]vap-profile name vap-Office1
[AC-wlan-vap-prof-vap-Office1]forward-mode tunnel
[AC-wlan-vap-prof-vap-Office1]service-vlan vlan-id 101
[AC-wlan-vap-prof-vap-Office1]ssid-profile ssid-Office1
[AC-wlan-vap-prof-vap-Office1]security-profile Sec-Office1
[AC-wlan-view]ap-group name ap-Office1
[AC-wlan-ap-group-ap-Office1]vap-profile vap-Office1 wlan 1 radio 0
[AC-wlan-ap-group-ap-Office1]vap-profile vap-Office1 wlan 1 radio 1</code></pre>
<ul>
<li>syntax security: <code>security {wpa | wpa2 | wpa-wpa2} psk {pass-phrase | hex} key-value {aes | tkip | aes-tkip}</code>; password ยาว <b>8 - 63 ตัวอักษร</b> (ควรผสมตัวพิมพ์ใหญ่ เล็ก ตัวเลข และอักขระพิเศษ); ชื่อ profile ยาว 1 - 35 ตัวอักษร ไม่แยกตัวพิมพ์</li>
<li>syntax: <code>vap-profile profile-name wlan wlan-id {radio {radio-id | all}}</code> โดย wlan-id คือ ID ของ VAP (1 - 16), <b>radio 0 = RF0 = 2.4 GHz</b>, <b>radio 1 = RF1 = 5 GHz</b></li>
<li>ต้อง <b>apply VAP profile เข้า AP group</b> AC จึงจะส่ง config ให้ AP</li>
</ul>
<p>ตรวจสอบ: <code>display vap all</code> (Status ON = สร้างสำเร็จ; แต่ละ radio ของแต่ละ AP มี BSSID ของตนเอง), <code>display vap ssid AP-Office1</code>, <code>display station all</code> (เห็น STA MAC, AP, VLAN, IP, SSID เช่น STA ใน VLAN 101 ได้ IP 192.168.101.x และ VLAN 102 ได้ 192.168.102.x)</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>ลำดับ config: <b>interworking → regulatory domain + AP group → capwap source → ap auth + import AP → SSID/security/VAP profile → apply VAP profile ให้ AP group</b></li>
<li><b>display ap all</b> State = <b>nor</b> = AP online ปกติ</li>
<li>tunnel forwarding: VLAN ของผู้ใช้ไปจบที่ AC (AC เป็น gateway)</li>
<li>radio 0 = 2.4 GHz, radio 1 = 5 GHz</li>
</ul></div>`
    },
    {
      t: "12.9 แนวโน้ม WLAN และ Wi-Fi 6 (802.11ax)",
      ref: "หน้า 414-416",
      html: `
<p>Wi-Fi กำลังแทนที่การเข้าถึงแบบมีสายมากขึ้น เพราะต้องรองรับวิดีโอคอนเฟอเรนซ์ VR แบบ interactive การสอนบนมือถือ และ smart home จึงต้องเพิ่มทั้ง <b>ความเร็ว</b> และ <b>จำนวนอุปกรณ์ที่รองรับ</b> ปัญหาของเครือข่ายที่มีเครื่องเชื่อมต่อมากคือประสิทธิภาพรวมลดลง IEEE 802.11 working group เริ่มแก้ปัญหานี้ตั้งแต่ปี 2014</p>
<table>
<tr><th>เทคโนโลยีของ Wi-Fi 6 (802.11ax)</th><th>ช่วยอะไร</th></tr>
<tr><td><b>OFDMA</b> (Orthogonal Frequency Division Multiple Access)</td><td>แบ่ง channel เป็นหน่วยย่อยให้หลายผู้ใช้ใช้พร้อมกัน เพิ่ม efficiency และลด latency</td></tr>
<tr><td><b>MU-MIMO</b> (รวม UL MU-MIMO)</td><td>หลายผู้ใช้ส่ง/รับพร้อมกันด้วยหลาย antenna</td></tr>
<tr><td><b>1024-QAM</b></td><td>modulation ลำดับสูง เพิ่ม rate ต่อ spectrum</td></tr>
</table>
<ul>
<li>เป้าหมาย: <b>average user throughput สูงขึ้นอย่างน้อย 4 เท่า</b> (เทียบ Wi-Fi 5 ในสภาพผู้ใช้หนาแน่น) และ <b>concurrent users มากกว่า 3 เท่า</b> จึงเรียกว่า <b>HEW (High Efficiency WLAN)</b></li>
<li>Wi-Fi Alliance ใช้ชื่อตัวเลข (Wi-Fi 4/5/6) เพื่อให้ผู้ใช้และผู้ผลิตเข้าใจง่าย; โปรแกรมรับรอง Wi-Fi 6 ประกาศวันที่ <b>16 กันยายน 2019</b></li>
<li>802.11ax <b>backward compatible</b> กับ 802.11ac/n/g/a/b อุปกรณ์รุ่นเก่าเชื่อมต่อได้</li>
<li>เหมาะกับ high-density และ high-capacity: สนามกีฬา/พื้นที่สาธารณะกลางแจ้ง สำนักงานหนาแน่น ห้องเรียนอิเล็กทรอนิกส์ (เช่น ห้องเรียน 100+ คน)</li>
</ul>
<table>
<tr><th>บริการ</th><th>ความต้องการตามตำรา</th></tr>
<tr><td>4K video</td><td>50 Mbit/s ต่อคน</td></tr>
<tr><td>Voice</td><td>delay น้อยกว่า 30 ms</td></tr>
<tr><td>VR</td><td>75 Mbit/s ต่อคน และ delay น้อยกว่า 15 ms</td></tr>
</table>
<p>Wi-Fi 5 รองรับ bandwidth สูงได้ แต่เมื่อผู้ใช้เพิ่ม throughput ตัน Wi-Fi 6 ด้วย OFDMA, UL MU-MIMO และ 1024-QAM ทำให้บริการเหล่านี้เชื่อถือได้มากขึ้น รองรับ client ได้มากขึ้นและกระจาย bandwidth ต่อผู้ใช้ได้สมดุล</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Wi-Fi 6 = 802.11ax = <b>HEW</b>; เทคโนโลยีหลัก <b>OFDMA, MU-MIMO, 1024-QAM</b></li>
<li>เป้า: throughput เฉลี่ยต่อผู้ใช้ x4, concurrent users x3+; backward compatible</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `โรงแรมแห่งหนึ่งมี 800 ห้อง ต้องการ Wi-Fi ครอบคลุมทุกห้อง แต่พบว่าสัญญาณผ่านผนังแล้วอ่อนจนเกิด blind spot และการติดตั้ง AP ต่อห้องทำให้ต้องดูแล AP เป็นพันตัว`,
      q: "สถาปัตยกรรมใดแก้ปัญหานี้ได้ตรงที่สุด?",
      opts: [
        { t: "Agile distributed AP: AC + central AP + remote RF unit", why: "ถูก: central AP จัดการรวมศูนย์ ส่วน RF unit กระจายเข้าห้องด้วยสาย ครอบคลุมไม่มีจุดอับ และลดจำนวนโหนดที่ต้องจัดการ" },
        { t: "FAT AP หนึ่งตัวต่อห้อง", why: "ผิด: FAT AP ทำงานเดี่ยว ไม่มีศูนย์กลาง ยิ่งมีมากยิ่งดูแลยาก" },
        { t: "Wi-Fi router สำหรับบ้านวางที่ล็อบบี้", why: "ผิด: ไม่ครอบคลุมหลายห้องและไม่ได้แก้ปัญหา blind spot" },
        { t: "เพิ่ม VAP ในแต่ละ AP เพื่อให้สัญญาณแรงขึ้น", why: "ผิด: VAP แชร์ resource/channel ของ AP จึงไม่เพิ่มความแรงหรือ capacity" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ร้านกาแฟเล็กต้องการให้ลูกค้าใช้ Wi-Fi โดยมี AP เพียง 1 - 2 ตัว ไม่มี network engineer ประจำ และไม่ต้องการลงทุนกับ AC`,
      q: "เลือกแบบใดเหมาะที่สุด และเพราะเหตุใด?",
      opts: [
        { t: "FAT AP เพราะ AP ทำ access, encrypt และ forward เองโดยไม่ต้องมี controller", why: "ถูก: เหมาะกับ coverage ขนาดเล็ก/บ้าน ติดตั้งและตั้งค่าง่าย" },
        { t: "AC + FIT AP เพราะ FIT AP ทำงานได้เองไม่ต้องมี AC", why: "ผิด: FIT AP ต้องถูกจัดการโดย AC" },
        { t: "Agile distributed เพราะรองรับ 80 ผู้ใช้ต่อห้อง", why: "ผิด: ซับซ้อนและแพงเกินกว่าความต้องการของร้านเล็ก" },
        { t: "CAPWAP Layer 3 networking เพราะรองรับ AP นับร้อย", why: "ผิด: ใช้สำหรับองค์กรใหญ่และต้องมี AC" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `อาคารสำนักงานเดิมมีเครือข่ายสายอยู่แล้ว ต่อมาต้องการเพิ่ม WLAN โดยไม่รื้อโครงสร้างเดิม และไม่อยากให้ traffic ของผู้ใช้ทั้งหมดต้องผ่าน AC ซึ่งมี performance จำกัด`,
      q: "ควรเลือกการต่อ AC และ forwarding แบบใด?",
      opts: [
        { t: "Bypass mode + direct forwarding (AC ต่อที่ aggregation switch, data ไม่ผ่าน AC)", why: "ถูก: ขยายจากเครือข่ายเดิมได้ง่าย AC จัดการ AP ผ่าน CAPWAP เท่านั้น ส่วน data ออก uplink ตรง ๆ" },
        { t: "Direct networking + tunnel forwarding", why: "ผิด: ทุก traffic ผ่าน AC เสี่ยง bottleneck" },
        { t: "Bypass mode + tunnel forwarding", why: "ผิด: data ต้องวนผ่าน AC อีกครั้ง ขัดกับข้อกำหนดที่ไม่ต้องการให้ traffic ผ่าน AC" },
        { t: "FAT AP โดยตัด AC ออกทั้งหมด", why: "ผิด: โจทย์ต้องการควบคุมรวมศูนย์ และ FAT AP ไม่เหมาะกับองค์กร" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AP 3 ตัวอยู่ในอาคารเดียวกัน ผู้ดูแลต้องตั้ง channel บนย่าน 2.4 GHz ให้ไม่รบกวนกันเลย`,
      q: "ชุด channel ใดถูกต้องที่สุด?",
      opts: [
        { t: "1, 6, 11", why: "ถูก: ห่างกัน 5 channel (25 MHz) มากกว่าความกว้าง 20 MHz + guard จึงไม่ซ้อนทับกัน" },
        { t: "1, 2, 3", why: "ผิด: channel ติดกัน center ห่างแค่ 5 MHz ซ้อนทับกันเกือบทั้งหมด" },
        { t: "1, 4, 7", why: "ผิด: ห่างกัน 3 channel (15 MHz) ยังซ้อนทับ" },
        { t: "6, 8, 10", why: "ผิด: ห่างกัน 2 channel (10 MHz) ซ้อนทับ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AP ตัวหนึ่งใช้ channel 1 (center 2412 MHz) ตามตำรา channel กว้าง 20 MHz รวม guard 2 MHz จึงใช้ช่วง 2401 - 2423 MHz ผู้ดูแลต้องการเลือก channel ถัดไปที่ไม่ซ้อนกับ channel 1`,
      q: "channel ที่ใกล้ที่สุดที่ไม่ซ้อนทับกับ channel 1 คือข้อใด?",
      opts: [
        { t: "channel 6 (center 2437 MHz)", why: "ถูก: center ห่าง 25 MHz > 22 MHz จึงไม่ซ้อนทับ (1 และ 6 อยู่ในกลุ่ม 1-6-11)" },
        { t: "channel 5 (center 2432 MHz)", why: "ผิด: ห่างเพียง 20 MHz ซึ่งน้อยกว่า 22 MHz จึงยังซ้อนทับ" },
        { t: "channel 4 (center 2427 MHz)", why: "ผิด: ห่าง 15 MHz ซ้อนทับ" },
        { t: "channel 2 (center 2417 MHz)", why: "ผิด: ห่าง 5 MHz เกือบเป็นช่วงเดียวกัน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลสร้าง VAP 3 ตัวบน AP เครื่องหนึ่ง (SSID Staff, Guest, IoT) โดยให้ผู้ใช้ใช้ 3 SSID พร้อมกันเต็มที่ และคาดว่า throughput รวมจะเพิ่มเป็น 3 เท่าของ AP เดี่ยว`,
      q: "ความคาดหวังนี้ถูกต้องหรือไม่?",
      opts: [
        { t: "ไม่ถูก: VAP ทุกตัวแชร์ hardware/software และ channel เดียวกันของ AP จึง capacity รวมคงเดิม", why: "ถูก: VAP เพิ่มความสามารถในการแยกบริการ (SSID, VLAN, password) ไม่ใช่เพิ่ม capacity" },
        { t: "ถูก: แต่ละ VAP เป็น AP แยกจริง ใช้ channel ของตนเอง", why: "ผิด: VAP ไม่ใช่ AP จริง" },
        { t: "ถูก: ยิ่งมี VAP มาก capacity ยิ่งเพิ่มแบบ exponential", why: "ผิด: ตำราระบุว่า capacity ของ AP คงที่ ไม่เพิ่มตามจำนวน VAP" },
        { t: "ถูกเฉพาะถ้าตั้ง service VLAN คนละตัว", why: "ผิด: VLAN แยกการ forward ไม่ได้เพิ่ม airtime" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AP ถูกตั้ง DHCP ให้ได้ IP แล้ว แต่ AP อยู่คนละ subnet กับ AC (Layer 3 network) และไม่ได้ตั้ง static IP list ของ AC ไว้บน AP`,
      q: "วิธีใดทำให้ AP รู้ว่า AC อยู่ที่ IP ใด?",
      opts: [
        { t: "ตั้ง DHCP Option 43 (sub-option 3) ที่ DHCP server ให้บรรจุ IP ของ AC", why: "ถูก: DHCP response ที่มี Option 43 ทำให้ AP รู้ IP ของ AC แล้วส่ง Discovery Request unicast ไปได้" },
        { t: "ใช้ broadcast discovery เพราะ AP กับ AC อยู่คนละ subnet", why: "ผิด: broadcast ใช้ได้เฉพาะเครือข่าย Layer 2 ที่ถึงกัน" },
        { t: "ตั้ง CAPWAP source interface บน AP", why: "ผิด: source interface ตั้งบน AC ไม่ใช่ AP" },
        { t: "รอให้ AC ส่ง Join Request ไปหา AP", why: "ผิด: AP เป็นฝ่ายส่ง Discovery และ Join Request" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องใส่ IP ของ AC สองตัว คือ 192.168.22.1 และ 192.168.22.2 ลงใน DHCP Option 43 แบบ ASCII`,
      q: "คำสั่งใดถูกต้อง?",
      opts: [
        { t: "option 43 sub-option 3 ascii 192.168.22.1,192.168.22.2", why: "ถูก: ใช้ sub-option 3 และคั่นหลาย IP ด้วยเครื่องหมาย comma" },
        { t: "option 43 sub-option 1 ascii 192.168.22.1,192.168.22.2", why: "ผิด: sub-option ที่ใช้คือ 3 (ค่าคงที่)" },
        { t: "option 43 sub-option 3 ascii 192.168.22.1;192.168.22.2", why: "ผิด: ตัวคั่นคือ comma (ASCII hex 2C)" },
        { t: "option 66 sub-option 3 ascii 192.168.22.1,192.168.22.2", why: "ผิด: ตำราระบุ Option 43" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `AP ตัวหนึ่งต่อเข้า AC ที่ตั้ง <code>ap auth-mode mac-auth</code> แต่ผู้ดูแลยังไม่ได้ import AP ตัวนั้นและไม่ได้ใส่ใน whitelist`,
      q: "สถานะของ AP ตัวนี้เป็นอย่างไร?",
      opts: [
        { t: "ถูกบันทึกใน unauthenticated AP list ต้องให้ผู้ดูแลยืนยันด้วยมือก่อนจึงจะ online", why: "ถูก: นี่คือวิธี manual confirmation สำหรับ AP ที่ยังไม่ได้ import และไม่อยู่ใน whitelist" },
        { t: "online อัตโนมัติ เพราะ AC ค้นพบ AP เอง", why: "ผิด: auto-discovery ต้องเป็น no-auth หรืออยู่ใน whitelist" },
        { t: "ถูกปฏิเสธและลบทิ้งโดยไม่เก็บบันทึก", why: "ผิด: ถูกเก็บใน unauthenticated list" },
        { t: "ใช้ SN authentication แทนโดยอัตโนมัติ", why: "ผิด: โหมดไม่เปลี่ยนเอง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลรันคำสั่ง <code>display ap all</code> บน AC แล้วเห็น AP ตัวหนึ่งมี State = fault`,
      q: "ความหมายที่ถูกต้องคืออะไร?",
      opts: [
        { t: "AP ตัวนั้น online ไม่สำเร็จ", why: "ถูก: fault = AP fails to go online" },
        { t: "AP online ปกติ", why: "ผิด: สถานะปกติคือ nor" },
        { t: "AP กำลังถูกอัปเกรด", why: "ผิด: ค่านั้นคือ download" },
        { t: "ส่ง service config ไม่สำเร็จหลัง online", why: "ผิด: ค่านั้นคือ commit-failed" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ใช้ในห้อง Office1 ต่อ SSID AP-Office1 ได้ แต่ไม่ได้ IP ในช่วง 192.168.101.0/24 และได้ 192.168.100.x แทน ผู้ดูแลตรวจ config พบว่าในส่วน VAP profile ตั้ง <code>service-vlan vlan-id 100</code>`,
      q: "ควรแก้อย่างไรตามแผนของกรณีศึกษา?",
      opts: [
        { t: "แก้เป็น service-vlan vlan-id 101 เพราะ VLAN 100 เป็น management VLAN ของ AP", why: "ถูก: Office1 ใช้ service VLAN 101 ส่วน VLAN 100 ใช้สำหรับ AP management" },
        { t: "เปลี่ยน SSID เป็น AP-Office2", why: "ผิด: SSID ไม่กำหนด VLAN โดยตรง VLAN มาจาก VAP profile" },
        { t: "เปลี่ยน forward-mode เป็น direct", why: "ผิด: ไม่เกี่ยวกับปัญหา VLAN ที่ผิด" },
        { t: "เปลี่ยน radio 0 เป็น radio 1", why: "ผิด: radio คือย่านความถี่ ไม่เกี่ยวกับ VLAN" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Beacon interval ของ AP ถูกตั้งเป็นค่า default 100 TU (1 TU = 1024 µs)`,
      q: "AP ส่ง Beacon frame ห่างกันกี่มิลลิวินาที?",
      opts: [
        { t: "102.4 ms", why: "ถูก: 100 x 1024 µs = 102,400 µs = 102.4 ms" },
        { t: "100 ms", why: "ผิด: 1 TU = 1024 µs ไม่ใช่ 1000 µs" },
        { t: "10.24 ms", why: "ผิด: คลาดไป 10 เท่า" },
        { t: "1024 ms", why: "ผิด: นั่นคือ 1000 TU" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องตั้ง channel ในอาคารที่มี AP 6 ตัว ย่าน 2.4 GHz`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "channel 1, 6, 11 เป็นกลุ่ม non-overlapping กลุ่มหนึ่ง", ok: true, why: "ถูก: ตามตำรา" },
        { t: "กลุ่ม 2, 7, 12 ก็ไม่รบกวนกันเช่นกัน", ok: true, why: "ถูก: มี 4 กลุ่มคือ 1-6-11, 2-7-12, 3-8-13, 4-9-14" },
        { t: "ถ้า AP ข้างเคียงใช้ channel ซ้อนกัน หรือ power สูงเกิน จะเกิด interference", ok: true, why: "ถูก: แก้ได้ด้วยการจัด channel/power หรือ RF tuning" },
        { t: "ย่านความถี่ WLAN ที่ตำราระบุคือ 2.4 GHz และ 5 GHz", ok: true, why: "ถูก" },
        { t: "channel 1 กับ channel 2 ใช้ด้วยกันได้ดีเพราะอยู่ติดกัน", ok: false, why: "ผิด: ติดกันแปลว่าซ้อนทับกันมาก" }
      ]
    },
    {
      type: "multi",
      story: `เปรียบเทียบ Layer 2 กับ Layer 3 networking ระหว่าง AP กับ AC`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Layer 2 networking ให้ AP plug and play ผ่าน L2 broadcast หรือ DHCP", ok: true, why: "ถูก: เหมาะกับเครือข่ายง่าย ๆ ชั่วคราว" },
        { t: "Layer 3 networking AP ต้องค้นหา AC ด้วย DHCP, DNS หรือ static IP", ok: true, why: "ถูก: หา AC ตรง ๆ ไม่ได้" },
        { t: "เครือข่ายใหญ่ที่ AC คุม AP หลายร้อยตัวมักใช้ Layer 3", ok: true, why: "ถูก" },
        { t: "Layer 2 networking เหมาะกับองค์กรขนาดใหญ่ที่สุด", ok: false, why: "ผิด: ไม่เหมาะกับเครือข่ายใหญ่" },
        { t: "broadcast discovery ใช้ได้เฉพาะ Layer 2 ที่ถึงกัน", ok: true, why: "ถูก" }
      ]
    },
    {
      type: "multi",
      story: `ผู้ดูแลต้องการให้ STA เชื่อมต่อ WLAN สำเร็จตั้งแต่ค้นหาเครือข่ายจนใช้งานได้ ทีมกำลังไล่ขั้นตอนของ STA access`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "scanning แบบ passive คือการฟัง Beacon frame ที่ AP ส่งเป็นระยะ", ok: true, why: "ถูก" },
        { t: "active scanning ใช้ Probe Request และ AP ตอบ Probe Response", ok: true, why: "ถูก" },
        { t: "association ใช้ negotiate link service เช่น rate และ channel", ok: true, why: "ถูก" },
        { t: "STA ต้องได้ IP จาก DHCP ก่อนทำ link authentication", ok: false, why: "ผิด: ลำดับคือ scanning → link auth → association → access auth → DHCP → user auth" },
        { t: "Portal authentication เป็นแบบหนึ่งของ user authentication (เช่น login ผ่าน SMS)", ok: true, why: "ถูก: อยู่ในขั้นสุดท้ายแบบ end-to-end" }
      ]
    },
    {
      type: "multi",
      story: `AC ตั้ง forward-mode tunnel ให้ VAP-Office1 และ forward-mode direct-forward ให้ VAP-Guest`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ข้อมูลของ VAP-Office1 ถูกห่อใน CAPWAP data tunnel ส่งไป AC", ok: true, why: "ถูก: tunnel forwarding" },
        { t: "ข้อมูลของ VAP-Guest ส่งออกไป uplink ตรงจาก AP โดยไม่ผ่าน AC", ok: true, why: "ถูก: direct forwarding" },
        { t: "tunnel forwarding ทำให้ AC รับภาระมากกว่า direct", ok: true, why: "ถูก: ข้อมูลต้องผ่าน AC" },
        { t: "direct forwarding ควบคุมนโยบายรวมศูนย์ได้ง่ายกว่า tunnel", ok: false, why: "ผิด: tunnel ควบคุมรวมศูนย์ง่ายกว่า" },
        { t: "management message ของทั้งสอง VAP ยังไปทาง CAPWAP control channel", ok: true, why: "ถูก: control ผ่าน control channel เสมอ" }
      ]
    },
    {
      type: "blank",
      story: `ตรวจ CAPWAP`,
      text: `CAPWAP เป็น application layer protocol ที่ทำงานบน {1} โดย control message ใช้ port {2} และ data message ใช้ port {3}`,
      blanks: [
        { opts: ["UDP", "TCP", "ICMP", "OSPF"], ans: 0, why: "CAPWAP ส่งผ่าน UDP" },
        { opts: ["5246", "5247", "80", "443"], ans: 0, why: "control = UDP 5246" },
        { opts: ["5247", "5246", "8080", "22"], ans: 0, why: "data = UDP 5247" }
      ]
    },
    {
      type: "blank",
      story: `AP กำลัง go online ตามลำดับขั้น`,
      text: `AP ได้ IP แล้วส่ง {1} Request เพื่อค้นหา AC จากนั้นส่ง {2} Request ให้ AC ตรวจสอบสิทธิ์ ถ้า version ไม่ตรงจะส่ง Image Data Request เพื่อ {3}`,
      blanks: [
        { opts: ["Discovery", "Join", "Echo", "Probe"], ans: 0, why: "ขั้นหา AC คือ Discovery Request/Response" },
        { opts: ["Join", "Discovery", "Association", "Beacon"], ans: 0, why: "ขั้นเข้าร่วมและตรวจสิทธิ์คือ Join Request/Response" },
        { opts: ["อัปเกรด software version", "ขอ IP ใหม่", "เปลี่ยน SSID", "ลบ VAP"], ans: 0, why: "Image Data Request ใช้ดาวน์โหลด image อัปเกรด" }
      ]
    },
    {
      type: "blank",
      story: `ตั้งค่า VAP profile ตามกรณีศึกษา`,
      text: `VAP profile ต้องอ้าง {1} profile และ {2} profile รวมทั้งกำหนด forwarding mode และ service VLAN จากนั้นต้องผูก VAP profile กับ {3} ด้วยคำสั่ง vap-profile ... wlan ... radio ...`,
      blanks: [
        { opts: ["SSID", "RF", "Regulatory domain", "AP"], ans: 0, why: "VAP profile อ้าง SSID profile" },
        { opts: ["security", "RF", "country", "radio"], ans: 0, why: "และอ้าง security profile" },
        { opts: ["AP group", "AC interface", "DHCP pool", "VLAN pool"], ans: 0, why: "ต้อง apply เข้า AP group (หรือ AP) AC จึงส่ง config ให้" }
      ]
    },
    {
      type: "match",
      q: "จับคู่คำศัพท์ WLAN กับความหมาย",
      pairs: [
        ["BSSID", "MAC address ของ AP"],
        ["SSID", "ชื่อเครือข่ายที่ผู้ใช้เลือกเชื่อมต่อ"],
        ["BSS", "AP หนึ่งตัวกับ STA ที่อยู่ในพื้นที่ครอบคลุม"],
        ["ESS", "หลาย BSS ที่ใช้ SSID เดียวกันเพื่อ roaming"],
        ["VAP", "AP เสมือนหลายตัวบน AP จริงเครื่องเดียว"]
      ],
      why: "เป็นระดับ identifier และหน่วยบริการที่ใช้กันในบท WLAN"
    }
  ]
});
