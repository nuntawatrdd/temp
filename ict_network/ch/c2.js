IOT.reg({
  id: "c2",
  title: "TCP/IP",
  th: "protocol และ layering, OSI 7 ชั้น vs TCP/IP 4 ชั้น, HTTP/FTP, TCP/UDP และ port, TCP header/handshake/sliding window, IP header, ICMP, ARP, data link (frame, byte stuffing, FCS)",
  summary: `
<ul>
<li><b>Protocol</b> = ข้อตกลงที่มี Party A, Party B, วัตถุประสงค์, ข้อกำหนด และ <b>รูปแบบ message (field)</b> คล้ายแบบฟอร์มสัญญาเช่า; IPv4 header คือ "แบบฟอร์ม" ที่ทุกฝ่ายต้องกรอกตามกำหนด</li>
<li><b>TCP/IPv4 4 ชั้น</b> (บนลงล่าง): Application, Transport, Network (Internet), Network Interface; ชั้นล่างให้บริการชั้นบน</li>
<li><b>OSI 7 ชั้น</b>: Application, Presentation, Session, Transport, Network, Data Link, Physical; OSI คือ reference model (กำหนด function), TCP/IP คือ protocol จริง; TCP/IP รวม App+Pres+Session เป็น Application และรวม DataLink+Physical เป็น Network Interface</li>
<li><b>ข้อดีของ layering</b>: แต่ละชั้นเป็นอิสระ, ยืดหยุ่น (IPv4 เป็น IPv6 ไม่กระทบ TCP/UDP), เลือกเทคโนโลยีเหมาะสมต่อชั้น, ส่งเสริม standard (router=L3, switch=L2), แบ่งปัญหาและ troubleshoot ง่าย</li>
<li><b>Application protocol</b> ต้องกำหนด: request (method/command), response (status code), ลำดับโต้ตอบ, รูปแบบ message และ field</li>
<li><b>HTTP</b>: TCP port 80, request = request line + header + blank line + body; response = status line + header + blank line + body; method: GET, POST, HEAD, PUT, DELETE, TRACE, CONNECT, OPTIONS; status: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error; 200 OK, 404 Not Found, 405 Method Not Allowed, 501 Not Implemented</li>
<li><b>FTP</b>: TCP 21; command: STOR (upload), CWD, RNFR (rename), DELE (delete); ห้ามคำสั่งได้ด้วย FTP Request Filtering (ตอบ 500 Command not allowed)</li>
<li><b>TCP</b>: reliable, ต้อง connect, segmentation, flow control, congestion control (ใช้กับ HTTP, FTP, SMTP, POP3, ส่งไฟล์) | <b>UDP</b>: connectionless, ไม่ retransmit/เรียงลำดับ/flow control, ใช้กับ DNS, voice/video real-time, multicast/broadcast</li>
<li><b>Port</b> 16 bit (0-65535): well-known 0-1023, registered 1024-49151, ephemeral (client) 49152-65535; <b>destination IP ระบุเครื่อง, destination port ระบุ service</b></li>
<li><b>Default ports</b>: HTTP 80, HTTPS 443, FTP 21, Telnet 23, SMTP 25, POP3 110, DNS 53 (UDP), RDP 3389, SMB 445, MS SQL 1433, MySQL 3306</li>
<li><b>TCP header</b> ขั้นต่ำ 20 byte (+ options สูงสุด 40, รวมสูงสุด 60): Src/Dst port 2 byte, Seq 4, Ack 4, Data offset 4 bit (หน่วย 4 byte), Reserved 6 bit, flags URG ACK PSH RST SYN FIN, Window 2, Checksum 2 (header + data), Urgent pointer 2, Options (MSS)</li>
<li><b>Seq</b> = เลข byte แรกของข้อมูลใน segment; <b>Ack = N</b> แปลว่ารับ byte ถึง N-1 ครบแล้ว คาดหวัง byte N ต่อไป; SYN และ FIN กิน seq 1 ตัว</li>
<li><b>3-way handshake</b>: SYN(seq=x) → SYN+ACK(seq=y, ack=x+1) → ACK(seq=x+1, ack=y+1); state: CLOSED/LISTEN, SYN_SENT, SYN_RCVD, ESTABLISHED</li>
<li><b>ปิด connection 4 segment</b>: FIN-WAIT-1, CLOSE-WAIT, FIN-WAIT-2, LAST-ACK, TIME-WAIT (รอ <b>2MSL</b>, MSL แนะนำ 2 นาที = 4 นาที), CLOSED; half-close ได้</li>
<li><b>Sliding window + continuous ARQ</b>: ส่งต่อเนื่องในหน้าต่าง, ACK สะสม, segment ที่หายส่งซ้ำเมื่อ timeout</li>
<li><b>IP</b>: best effort, ไม่การันตี reliable/ลำดับ; header ขั้นต่ำ 20 byte; Header length หน่วย 4 byte (สูงสุด 60); Total length 16 bit (สูงสุด 65535); Identification/Flags (DF, MF)/Fragment offset (หน่วย 8 byte) สำหรับ fragmentation; <b>TTL</b> ลด 1 ต่อ hop ถึง 0 ทิ้ง; Protocol: ICMP 1, IGMP 2, TCP 6, UDP 17; Header checksum ตรวจเฉพาะ header</li>
<li><b>IPv6 stack</b> ไม่มี ARP/IGMP: ใช้ ND และ MLD ใน ICMPv6</li>
<li><b>ICMP</b>: ping (echo request type 8 / reply type 0), tracert; error: Dest Unreachable (3), Source Quench (4), Redirect (5), Time Exceeded (11), Parameter Problem (12)</li>
<li><b>ARP</b>: IP เป็น MAC; request = broadcast (FF-FF-FF-FF-FF-FF) opcode 1, reply = unicast opcode 2; cache 180 s; ข้าม segment ต้อง ARP หา MAC ของ <b>gateway</b>; IP คงเดิมตลอดทาง แต่ MAC เปลี่ยนทุก link; เสี่ยง ARP spoofing</li>
<li><b>Data link</b> ทำ 3 อย่าง: encapsulation (header/trailer, delimiter, MTU Ethernet 1500), transparent transmission (byte stuffing ด้วย ESC), error check (FCS ด้วย CRC, ผิดแล้วทิ้ง frame)</li>
</ul>`,
  sections: [
    {
      t: "Protocol คืออะไร (เปรียบกับสัญญาเช่า)",
      ref: "หน้า 31-34",
      html: `
<p>Protocol ก็เหมือน<b>สัญญาเช่า</b>: ถ้าตกลงกันด้วยปากเปล่า เวลาผ่านไปแต่ละฝ่ายอาจจำไม่ตรงกัน จึงต้องเขียนเป็นข้อตกลงและใช้ template มาตรฐาน ซึ่งมี Party A, Party B, วัตถุประสงค์ และข้อกำหนดที่ทุกฝ่ายต้องทำตาม template ยังมีตาราง (Fig. 2.2) ที่ให้กรอกเฉพาะข้อมูลในตำแหน่งที่กำหนด แต่ละช่องเรียกว่า <b>field</b> ซึ่งความยาวอาจคงที่หรือไม่คงที่ (ถ้าไม่คงที่ต้องกำหนด delimiter)</p>
<figure><img src="i/p034_2.webp" alt="ตารางกรอกข้อมูลสัญญาเช่าที่ประกอบด้วยหลาย field" loading="lazy"><figcaption>Fig. 2.2 ตารางใน template สัญญาเช่า: แต่ละช่องคือ field</figcaption></figure>
<p>Protocol ของคอมพิวเตอร์ก็เช่นกัน: กำหนดข้อตกลงที่ทั้งสองฝ่ายต้องทำตาม และกำหนด<b>รูปแบบ message</b> (request/response) เมื่อดักจับ packet จะเห็นตาราง field และค่าของแต่ละ field แบบเดียวกับสัญญาที่กรอกแล้ว IPv4 header คือ "แบบฟอร์ม" ที่ฝ่ายสื่อสารและอุปกรณ์ระหว่างทางต้องกรอกตามกำหนด จึงทำงานตาม IP ได้</p>
<figure><img src="i/p034_3.webp" alt="โครงสร้าง IPv4 header ที่เป็นแบบฟอร์มสำหรับกรอก" loading="lazy"><figcaption>Fig. 2.4 IPv4 header: ตารางที่ IPv4 กำหนดให้กรอก</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Protocol = ข้อตกลง + รูปแบบ message (field, ความยาว, ความหมายของค่า)</li>
<li>แต่ละ protocol มี Party A และ Party B (peer entities) เช่น client กับ server</li>
</ul></div>`
    },
    {
      t: "Protocol Layering และ TCP/IPv4 Stack",
      ref: "หน้า 34-39",
      html: `
<p>TCP/IPv4 stack คือชุด protocol ที่สมบูรณ์และใช้แพร่หลายที่สุด ใช้ได้ทั้ง WAN และ LAN เป็นรากฐานของ Internet/Intranet ทำให้คอมพิวเตอร์ต่าง hardware และ OS สื่อสารกันได้ แต่ละ protocol เป็นอิสระ แบ่งตามหน้าที่เป็น 4 ชั้น protocol หลักคือ <b>TCP</b> และ <b>IPv4</b></p>
<figure><img src="i/p035_1.webp" alt="TCP/IPv4 protocol stack 4 ชั้น" loading="lazy"><figcaption>Fig. 2.5 TCP/IPv4 protocol stack: Application, Transport, Network, Network Interface</figcaption></figure>
<h4>ทำไมต้องแบ่งชั้น: เปรียบกับการซื้อของออนไลน์</h4>
<p>ร้านค้ากับลูกค้ามี "shopping protocol" (เลือกสินค้า จ่ายเงิน ส่งของ ยืนยัน รีวิว) เทียบเท่า <b>application layer protocol</b> แต่ต้องมีบริษัทขนส่งมาส่งของด้วย ซึ่งมี "express protocol" ที่ใช้ใบ waybill ระบุผู้รับ ผู้ส่ง ตรงกับ <b>IP header</b> ที่ใช้ส่ง packet ไปยัง destination address ชั้นล่างให้บริการชั้นบน: Transport ให้บริการ Application, Network ให้บริการ Transport, Network Interface ให้บริการ Network</p>
<figure><img src="i/p036_1.webp" alt="ใบ waybill เปรียบเทียบกับ IP header" loading="lazy"><figcaption>Fig. 2.6 Express waybill: เทียบกับ IP header ที่ใช้นำ packet ไปยังปลายทาง</figcaption></figure>
<h4>ขอบเขตการทำงานของแต่ละชั้น</h4>
<figure><img src="i/p037_1.webp" alt="ขอบเขตการทำงานของ protocol แต่ละชั้นตั้งแต่ client server จนถึง link" loading="lazy"><figcaption>Fig. 2.7 Layering และ functional range ของแต่ละ protocol</figcaption></figure>
<table>
<tr><th>ชั้น</th><th>Party A / B</th><th>หน้าที่</th></tr>
<tr><td>Application</td><td>server program / client program</td><td>ทำ function ของแอปพลิเคชัน</td></tr>
<tr><td>Transport</td><td>สองคอมพิวเตอร์ที่สื่อสารกัน (end to end)</td><td>TCP = reliable transmission, UDP = ส่ง message</td></tr>
<tr><td>Network</td><td>สองเครื่อง <b>และ router ระหว่างทาง</b> (multi-party)</td><td>IP เลือก path ข้าม network segment</td></tr>
<tr><td>Data Link</td><td>อุปกรณ์บน link เดียวกัน</td><td>ส่ง packet ปลายหนึ่งของ link ไปอีกปลาย; ต่างตามชนิด link (Ethernet = CSMA/CD, point-to-point = PPP)</td></tr>
</table>
<h4>ข้อดีของ layering</h4>
<ol>
<li><b>ชั้นเป็นอิสระต่อกัน</b>: ไม่ต้องรู้ว่าชั้นล่างทำงานอย่างไร รู้แค่บริการผ่าน interface ชั้นล่างมองชั้นบนเป็น "ข้อมูลที่ต้องประมวลผล"</li>
<li><b>ยืดหยุ่น</b>: เปลี่ยนชั้นหนึ่งไม่กระทบชั้นอื่น เช่น IPv4 เป็น IPv6 TCP/UDP และ data link ไม่ต้องเปลี่ยน</li>
<li><b>เลือกเทคโนโลยีที่เหมาะกับแต่ละชั้น</b> เช่น สาย twisted pair หรือ wireless</li>
<li><b>ส่งเสริม standard</b>: router ทำ network layer, switch ทำ data link layer จึงต่อ router/switch ต่างยี่ห้อกันได้</li>
<li><b>แบ่งปัญหาซับซ้อนเป็นปัญหาย่อย</b> ช่วย troubleshoot</li>
</ol>
<table>
<tr><th>อาการ</th><th>ชั้นของปัญหา</th></tr>
<tr><td>เครื่องไม่มี gateway</td><td>Network layer</td></tr>
<tr><td>MAC address ซ้ำ</td><td>Data link layer</td></tr>
<tr><td>เข้าเว็บไม่ได้เพราะตั้ง proxy ใน IE ผิด</td><td>Application layer</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Network layer เป็น protocol แบบ <b>multi-party</b> เพราะ router ระหว่างทางเข้าร่วมด้วย</li>
<li>เปลี่ยน IPv4 เป็น IPv6 กระทบเฉพาะ <b>network layer</b></li>
</ul></div>`
    },
    {
      t: "OSI 7 ชั้น และความสัมพันธ์กับ TCP/IPv4",
      ref: "หน้า 39-41",
      html: `
<p>OSI reference model (ISO สร้างปลายทศวรรษ 1970) แบ่งการสื่อสารเป็น 7 ชั้นตามหน้าที่ เพื่อให้ผู้ผลิตต่างกันออกแบบอุปกรณ์ให้ทำงานร่วมกันได้ OSI <b>ไม่ใช่ protocol ละเอียด</b> แต่เป็นกรอบกำหนด function ว่าแต่ละชั้นต้องทำอะไร โดยไม่บังคับวิธี เหมือนมาตรฐานรถยนต์ที่กำหนดว่าต้องมีระบบกำลัง เบรก เลี้ยว แต่ Audi จะใช้น้ำมันหรือแก๊สก็ได้ ส่วน <b>TCP/IPv4 เปรียบกับรถ Audi</b> คือ protocol ที่ implement จริง</p>
<table>
<tr><th>ชั้น OSI</th><th>หน้าที่</th><th>หน่วยข้อมูล / ตัวอย่าง</th></tr>
<tr><td>7 Application</td><td>ทำ function ของแอป กำหนด request, response, format, ลำดับคำสั่ง</td><td>HTTP, FTP, DNS</td></tr>
<tr><td>6 Presentation</td><td>รูปแบบการแสดงข้อมูล: character set/encoding, compression, encryption</td><td></td></tr>
<tr><td>5 Session</td><td>สร้าง รักษา ปิด session (มี authentication, authority)</td><td></td></tr>
<tr><td>4 Transport</td><td>บริการ end to end ระหว่าง process ของ host จัดการ datagram ผิด/สลับลำดับ ซ่อนรายละเอียดชั้นล่าง</td><td>TCP, UDP</td></tr>
<tr><td>3 Network</td><td>เลือกเส้นทาง (routing) ข้าม network</td><td>packet, IP</td></tr>
<tr><td>2 Data Link</td><td>ส่งข้อมูลจากปลาย link หนึ่งไปอีกปลาย, error control/flow control</td><td><b>frame</b></td></tr>
<tr><td>1 Physical</td><td>มาตรฐานไฟฟ้า/กายภาพ (แรงดัน bandwidth ระยะทางสูงสุด)</td><td><b>bit stream</b></td></tr>
</table>
<figure><img src="i/p041_1.webp" alt="เทียบ OSI 7 ชั้นกับ TCP/IP 4 ชั้น" loading="lazy"><figcaption>Fig. 2.10 OSI reference model เทียบกับ TCP/IP layering</figcaption></figure>
<p>TCP/IPv4 ย่อ OSI ลงเหลือ 4 ชั้น: <b>Application</b> (= Application + Presentation + Session) และ <b>Network Interface</b> (= Data Link + Physical) ส่วน Transport และ Network ตรงกันตรง ๆ</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลำดับบนลงล่าง: Application, Presentation, Session, Transport, Network, Data Link, Physical</li>
<li>Network layer ให้ logical address แก่ router เพื่อเลือก path; Physical ส่ง bit stream</li>
</ul></div>`
    },
    {
      t: "Application Layer: HTTP",
      ref: "หน้า 41-48",
      html: `
<p>การสื่อสารคอมพิวเตอร์คือการสื่อสารของแอป: client ส่ง request, server ตอบ response protocol แอปจึงต้องกำหนด request ที่ client ส่งได้ response ที่ server ตอบได้ ลำดับคำสั่ง การจัดการเหตุผิดปกติ และ field/ความยาว/ความหมายของ message</p>
<figure><img src="i/p042_1.webp" alt="client program และ server program เป็น peer entities ของ application layer protocol" loading="lazy"><figcaption>Fig. 2.11 Application layer protocol: client และ server เป็น peer entities</figcaption></figure>
<table>
<tr><th>Protocol</th><th>ใช้ทำอะไร</th></tr>
<tr><td>HTTP</td><td>เข้าถึง Web service</td></tr>
<tr><td>HTTPS</td><td>HTTP ที่เข้ารหัส</td></tr>
<tr><td>SMTP</td><td>ส่ง e-mail</td></tr>
<tr><td>POP3</td><td>รับ e-mail</td></tr>
<tr><td>DNS</td><td>แปลง domain name</td></tr>
<tr><td>FTP</td><td>upload/download ไฟล์</td></tr>
<tr><td>Telnet</td><td>remote config อุปกรณ์เครือข่าย Linux Windows</td></tr>
<tr><td>DHCP</td><td>แจกจ่าย IP, subnet mask, gateway, DNS อัตโนมัติ</td></tr>
</table>
<h4>HTTP: Party A = Web server, Party B = Web browser</h4>
<figure><img src="i/p043_1.webp" alt="web browser เข้าถึง web server ผ่าน HTTP" loading="lazy"><figcaption>Fig. 2.12 HTTP ทำให้ Web browser เข้าถึง Web server</figcaption></figure>
<p>HTTP ใช้โมเดล client-server โดย browser ส่ง request ผ่าน <b>URL</b> ไปยัง server ซึ่งเป็น text-oriented (field เป็น ASCII ความยาวไม่คงที่) ขั้นตอน:</p>
<ol>
<li>client สร้าง TCP socket connection ไปยัง HTTP port ของ server (<b>TCP port 80</b> เป็นค่าเริ่มต้น)</li>
<li>client ส่ง request message ข้อความ ประกอบด้วย request line, request header, blank line, request data</li>
<li>server แยกวิเคราะห์ request หา resource แล้วส่งสำเนากลับ response ประกอบด้วย status line, response header, blank line, response data</li>
<li>ปิด TCP connection: ถ้าโหมด <b>close</b> server ปิดก่อน และ client ปิดตาม; ถ้า <b>keepalive</b> เก็บ connection ไว้ระยะหนึ่งเพื่อรับ request ต่อ</li>
<li>browser ตรวจ status code, ดู header (ขนาด, character set) แล้วแสดง HTML</li>
</ol>
<h4>รูปแบบ request message</h4>
<figure><img src="i/p044_1.webp" alt="รูปแบบ HTTP request: request line, header lines, blank line, entity body" loading="lazy"><figcaption>Fig. 2.13 HTTP request message format (Method, URL, Version คั่นด้วย space; แต่ละบรรทัดจบด้วย CR LF)</figcaption></figure>
<ul>
<li><b>Request line</b>: Method, URL, Version คั่นด้วยช่องว่าง</li>
<li><b>Header lines</b>: ชื่อ field : ค่า ได้หลายบรรทัดหรือไม่มีก็ได้ จบด้วย CR LF; บรรทัดว่างคั่นระหว่าง header กับ body</li>
<li><b>Entity body</b>: มักไม่ใช้ใน request</li>
</ul>
<h4>Method ทั้ง 8</h4>
<table>
<tr><th>Method</th><th>ความหมาย</th></tr>
<tr><td><b>GET</b></td><td>ขอ resource ตาม URL (พิมพ์ URL ใน address bar = GET)</td></tr>
<tr><td><b>POST</b></td><td>ส่งข้อมูลเพิ่มไปยัง resource เช่น submit form, login, ค้นหา</td></tr>
<tr><td>HEAD</td><td>ขอเฉพาะ response header</td></tr>
<tr><td>PUT</td><td>ให้ server เก็บ resource โดยใช้ URL เป็นตัวระบุ</td></tr>
<tr><td>DELETE</td><td>ให้ server ลบ resource</td></tr>
<tr><td>TRACE</td><td>ให้ server ส่ง request ที่ได้รับกลับมา (ทดสอบ/วินิจฉัย)</td></tr>
<tr><td>CONNECT</td><td>ใช้กับ proxy server</td></tr>
<tr><td>OPTIONS</td><td>สอบถามความสามารถ/ตัวเลือกของ server หรือ resource</td></tr>
</table>
<p>ชื่อ method <b>case-sensitive</b> ถ้า resource ไม่รองรับ method นั้น server ตอบ <b>405 Method Not Allowed</b>; ถ้า server ไม่รู้จัก method ตอบ <b>501 Not Implemented</b></p>
<h4>Response message และ Status code</h4>
<figure><img src="i/p046_1.webp" alt="รูปแบบ HTTP response: status line, header lines, blank line, entity body" loading="lazy"><figcaption>Fig. 2.14 HTTP response message format</figcaption></figure>
<p>Status line มี 3 ส่วน: <b>version, status code, phrase</b> status code มี 3 หลัก รวม 33 แบบ ใน 5 กลุ่ม:</p>
<table>
<tr><th>กลุ่ม</th><th>ความหมาย</th><th>ตัวอย่าง</th></tr>
<tr><td>1xx</td><td>ข้อมูลแจ้ง (รับแล้ว/กำลังประมวลผล)</td><td></td></tr>
<tr><td>2xx</td><td>สำเร็จ</td><td>200 OK, 202 Accepted</td></tr>
<tr><td>3xx</td><td>redirect ต้องทำขั้นต่อไป</td><td></td></tr>
<tr><td>4xx</td><td>client error (syntax ผิด / ทำไม่ได้)</td><td>400 Bad Request, 404 Not Found</td></tr>
<tr><td>5xx</td><td>server error</td><td></td></tr>
</table>
<h4>Packet capture ของ HTTP</h4>
<p>ใช้ display filter เช่น <code>http and ip.addr == 202.206.100.34</code> เพื่อดูเฉพาะ HTTP request/response ในตัวอย่าง packet ที่ 1396 เป็น GET, packet 1440 เป็น response 404, packet 11626 เป็น response 200 และ filter <code>http.request.method == POST</code> พบ packet 19390 ที่ client ใช้ POST ส่งคำค้นหา</p>
<figure><img src="i/p047_1.webp" alt="packet capture ของ HTTP GET request" loading="lazy"><figcaption>Fig. 2.15 GET method ของ HTTP request ใน Wireshark</figcaption></figure>
<figure><img src="i/p048_1.webp" alt="packet capture ของ HTTP response 200" loading="lazy"><figcaption>Fig. 2.16 HTTP response message (status 200)</figcaption></figure>
<figure><img src="i/p049_1.webp" alt="packet capture ของ HTTP POST" loading="lazy"><figcaption>Fig. 2.17 POST method ใน HTTP (ส่งคำค้นหาไปยัง server)</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>HTTP = TCP port 80; GET ขอหน้าเว็บ; POST ส่งฟอร์ม/login</li>
<li>405 = server รู้จัก method แต่ resource ไม่รองรับ; 501 = server ไม่รู้จัก/ไม่รองรับ method</li>
<li>Application protocol อื่นต้องกำหนดเหมือนกัน: command, ลำดับ (เช่น POP3 ต้อง authenticate ก่อนรับเมล), status code, รูปแบบ message</li>
</ul></div>`
    },
    {
      t: "Application Layer: FTP",
      ref: "หน้า 48-52",
      html: `
<p>FTP ใช้ควบคุมการถ่ายโอนไฟล์สองทางบน Internet ซ่อนความต่างของระบบไฟล์แต่ละ OS จึงถ่ายไฟล์ข้าม OS ได้ ให้บริการพื้นฐานและใช้ <b>TCP</b> เพื่อ reliable <b>Download</b> = คัดลอกจาก remote host มาเครื่องตน, <b>Upload</b> = คัดลอกจากเครื่องตนไป remote host</p>
<p>จากการ capture (FTP server บน Windows Server 2012 R2, client Windows 10) เมื่อ upload test.txt, rename เป็น abc.txt แล้วลบ จะเห็น command ผ่าน Follow Stream</p>
<figure><img src="i/p051_1.webp" alt="ผลการ Follow TCP Stream ของ FTP แสดง command และ response" loading="lazy"><figcaption>Fig. 2.19 กระบวนการโต้ตอบเมื่อ FTP client เข้าถึง FTP server</figcaption></figure>
<table>
<tr><th>Command</th><th>หน้าที่</th></tr>
<tr><td><b>STOR</b></td><td>upload ไฟล์ (test.txt)</td></tr>
<tr><td><b>CWD</b></td><td>เปลี่ยน working directory</td></tr>
<tr><td><b>RNFR</b></td><td>เปลี่ยนชื่อไฟล์ (rename from)</td></tr>
<tr><td><b>DELE</b></td><td>ลบไฟล์ (abc.txt)</td></tr>
</table>
<p>เพื่อความปลอดภัยสามารถ<b>ห้ามบาง command</b> ได้ที่ FTP Request Filtering เช่น Deny Command: <code>DELE</code> แล้ว client ที่พยายามลบไฟล์จะได้ข้อความ <b>500 Command not allowed</b></p>
<figure><img src="i/p052_1.webp" alt="หน้าจอ FTP Request Filtering ที่ปิด command DELE" loading="lazy"><figcaption>Fig. 2.21 ปิดใช้ DELE method ใน FTP Request Filtering</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>FTP ใช้ TCP port 21; STOR = upload, DELE = delete, RNFR = rename, CWD = change directory</li>
<li>ป้องกันไม่ให้ client ลบไฟล์: Deny command DELE ที่ FTP Request Filtering</li>
</ul></div>`
    },
    {
      t: "Transport Layer: TCP vs UDP และหมายเลข Port",
      ref: "หน้า 53-57",
      html: `
<p>Transport layer ให้การสื่อสารแบบ end to end ระหว่างแอปบนสองโฮสต์ มี 2 protocol คือ <b>TCP</b> และ <b>UDP</b></p>
<h4>เมื่อไหร่ใช้ TCP</h4>
<ul>
<li>client และ server ต้องโต้ตอบหลายรอบ เช่น POP3, SMTP, FTP</li>
<li>ข้อมูลต้อง<b>แบ่งส่ง (segmentation)</b> เช่น เปิดเว็บ ดาวน์โหลดหนัง 500 MB, ส่งไฟล์</li>
</ul>
<p>TCP จัดเลขลำดับให้ byte stream ใน cache แล้วส่งตามลำดับ ต้องสร้าง connection และ negotiate พารามิเตอร์ (เช่น MSS) ถ้า packet หายต้องส่งใหม่ มี <b>flow control</b> (receiver บอกให้ sender ช้าลงหรือหยุด) และ <b>congestion avoidance</b> (ตรวจ congestion แล้วปรับความเร็ว) ความเร็วในการส่งถูกกำหนดโดยค่าที่<b>ต่ำกว่า</b>ระหว่างสภาพ network กับความสามารถในการรับของ receiver</p>
<figure><img src="i/p054_1.webp" alt="ความเร็วส่งของ sender ถูกจำกัดโดย network และ receiver" loading="lazy"><figcaption>Fig. 2.23 TCP functions: ความเร็วส่งถูกจำกัดทั้งจาก congestion ของ network และความเร็วรับของ receiver</figcaption></figure>
<h4>เมื่อไหร่ใช้ UDP</h4>
<ul>
<li>แอปส่ง request/response สั้น ๆ ที่ไม่ต้อง segmentation เช่น <b>DNS</b> (TCP ต้อง 3 packet สร้าง + 4 packet ปิด จึงไม่คุ้ม)</li>
<li><b>Real-time</b> เช่น voice/video chat: ยอมให้ขาดบางประโยค ไม่รอ retransmit</li>
<li><b>Multicast/broadcast</b> เช่น ห้องเรียนมัลติมีเดียที่หน้าจอครูส่งหาทุกเครื่อง</li>
</ul>
<table>
<tr><th>ตัวอย่าง</th><th>Transport</th><th>เหตุผล</th></tr>
<tr><td>ส่งไฟล์ผ่าน QQ</td><td>TCP</td><td>ใช้เวลานาน ต้อง segment, reliable, flow control</td></tr>
<tr><td>แชตข้อความ QQ</td><td>UDP</td><td>ข้อความสั้น ส่งไม่ต่อเนื่อง ไม่ต้องคง connection</td></tr>
</table>
<h4>Port number</h4>
<p>Application layer protocol หลายตัวแต่ transport มีเพียง 2 จึงใช้ <b>transport protocol + port number</b> ระบุ application Port ยาว 16 bit ค่า 0 ถึง 65,535</p>
<table>
<tr><th>กลุ่ม</th><th>ช่วง</th><th>ใช้โดย</th></tr>
<tr><td><b>Well-known (system)</b></td><td>0-1023</td><td>server; IANA กำหนดให้ TCP/IP application สำคัญ</td></tr>
<tr><td><b>Registered</b></td><td>1024-49151</td><td>server ของแอปที่ไม่มี well-known ต้อง register กับ IANA เช่น RDP 3389</td></tr>
<tr><td><b>Client / ephemeral</b></td><td>49152-65535</td><td>เครื่องกำหนดชั่วคราวให้ client process ใช้เสร็จก็คืน</td></tr>
</table>
<table>
<tr><th>Protocol</th><th>Transport / Port</th></tr>
<tr><td>HTTP</td><td>TCP 80</td></tr>
<tr><td>HTTPS</td><td>TCP 443</td></tr>
<tr><td>FTP</td><td>TCP 21</td></tr>
<tr><td>Telnet</td><td>TCP 23</td></tr>
<tr><td>SMTP</td><td>TCP 25</td></tr>
<tr><td>POP3</td><td>TCP 110</td></tr>
<tr><td>DNS</td><td>UDP 53</td></tr>
<tr><td>RDP</td><td>TCP 3389</td></tr>
<tr><td>Windows file sharing (SMB)</td><td>TCP 445</td></tr>
<tr><td>Microsoft SQL</td><td>TCP 1433</td></tr>
<tr><td>MySQL</td><td>TCP 3306</td></tr>
</table>
<p>ค่าเหล่านี้เป็น default เปลี่ยนได้ ถ้าไม่ใช้ default client ต้องระบุ port เอง ในตัวอย่าง server รัน Web, SMTP และ POP3 พร้อมกัน เครื่อง A, B, C ส่ง packet ไปยัง port 80, 25, 110 ตามลำดับ server ส่งต่อแต่ละ packet ไปยัง service ตาม destination port</p>
<figure><img src="i/p057_1.webp" alt="server ส่ง packet ไปยัง Web SMTP POP3 ตาม destination port" loading="lazy"><figcaption>Fig. 2.25 ความสัมพันธ์ระหว่าง port และ service</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><b>Destination IP</b> = หาเครื่อง server; <b>destination port</b> = หา service บนเครื่องนั้น</li>
<li>Well-known 0-1023, registered 1024-49151, ephemeral 49152-65535</li>
<li>TCP: ไฟล์ใหญ่ ต้อง reliable | UDP: DNS, real-time, multicast/broadcast</li>
</ul></div>`
    },
    {
      t: "TCP Header",
      ref: "หน้า 57-61",
      html: `
<p>TCP ทำ segmentation, reliable transmission, flow control, congestion avoidance จึงมี field มากกว่า UDP และความยาว header ไม่คงที่: <b>20 byte คงที่</b> ตามด้วย options <b>4N byte</b> ดังนั้นขั้นต่ำ 20 byte สูงสุด 60 byte</p>
<figure><img src="i/p058_1.webp" alt="โครงสร้าง TCP header" loading="lazy"><figcaption>Fig. 2.26 TCP header: port, sequence, acknowledgement, offset, flags, window, checksum, urgent pointer, options</figcaption></figure>
<table>
<tr><th>Field</th><th>ขนาด</th><th>ความหมาย</th></tr>
<tr><td>Source / Destination Port</td><td>2 byte</td><td>ระบุ application layer protocol</td></tr>
<tr><td>Sequence number</td><td>4 byte</td><td>เลขของ byte แรกของข้อมูลใน segment; ช่วง 0 ถึง 2^32 - 1 แล้ววนกลับ 0; TCP นับเป็น byte stream</td></tr>
<tr><td>Acknowledgement number</td><td>4 byte</td><td>เลข byte แรกของ segment ถัดไปที่คาดว่าจะได้รับ; ack = N แปลว่า byte ถึง N-1 ได้ครบแล้ว</td></tr>
<tr><td>Data offset</td><td>4 bit</td><td>ความยาว header หน่วย <b>4 byte</b>; ค่าสูงสุด 15 = 60 byte; header 20 byte ค่า = 5 (0101); options ไม่เกิน 40 byte</td></tr>
<tr><td>Reserved</td><td>6 bit</td><td>สำรอง ตั้งเป็น 0</td></tr>
<tr><td>Flags</td><td>6 bit</td><td>URG, ACK, PSH, RST, SYN, FIN</td></tr>
<tr><td>Window</td><td>2 byte</td><td>0 ถึง 2^16 - 1 ปริมาณข้อมูล (byte) ที่ receiver ยอมให้ส่งต่อจาก ack number: ใช้ทำ <b>flow control</b></td></tr>
<tr><td>Checksum</td><td>2 byte</td><td>ครอบคลุม <b>header และ data</b></td></tr>
<tr><td>Urgent pointer</td><td>2 byte</td><td>ใช้เมื่อ URG = 1 ชี้จุดสิ้นสุดของ urgent data</td></tr>
<tr><td>Options</td><td>สูงสุด 40 byte</td><td>เดิมมีแค่ <b>MSS</b> (ความยาวของ data field ไม่รวม header)</td></tr>
</table>
<h4>ตัวอย่าง sequence/ack</h4>
<p>Computer A ส่งไฟล์ให้ B segment แรก seq = 1 พร้อมข้อมูล 100 byte (byte 1 ถึง 100) segment ถัดไปต้อง seq = 101 B เก็บใน cache เรียงตาม seq และเมื่อรับสอง segment ได้ 200 byte ต่อเนื่องจึงส่ง ACK โดย ack = 201 (ไม่มีข้อมูล มีแต่ header)</p>
<figure><img src="i/p058_2.webp" alt="ตัวอย่าง sequence number และ acknowledgement number ระหว่างสองคอมพิวเตอร์" loading="lazy"><figcaption>Fig. 2.27 sequence number และ acknowledgement number: ack = 201 หมายถึงรับ byte 1-200 ครบ</figcaption></figure>
<h4>Flags</h4>
<table>
<tr><th>Flag</th><th>หน้าที่</th></tr>
<tr><td><b>URG</b></td><td>=1 ให้ urgent pointer มีผล, urgent data ถูกส่งก่อนข้อมูลปกติ (เช่น Ctrl+C) และส่งได้แม้ window = 0</td></tr>
<tr><td><b>ACK</b></td><td>=1 ให้ ack number มีผล; หลังตั้ง connection ทุก segment ต้อง ACK = 1</td></tr>
<tr><td><b>PSH</b></td><td>=1 ส่ง segment ทันทีและให้ receiver ส่งต่อให้แอปเร็ว ไม่รอ buffer เต็ม (ใช้น้อย)</td></tr>
<tr><td><b>RST</b></td><td>=1 connection มีข้อผิดพลาดร้ายแรง ต้อง release แล้วสร้างใหม่ หรือปฏิเสธ segment ผิดกฎ/ปฏิเสธเปิด connection</td></tr>
<tr><td><b>SYN</b></td><td>sync sequence number ตอนสร้าง connection: SYN=1, ACK=0 คือ request; SYN=1, ACK=1 คือตอบรับ</td></tr>
<tr><td><b>FIN</b></td><td>=1 ผู้ส่งส่งข้อมูลหมดแล้ว ขอ release connection</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> Window เป็นค่าที่ receiver แจ้ง sender (flow control) | MSS ไม่ใช่ขนาดทั้ง segment แต่คือขนาดข้อมูล = segment ลบ TCP header | Data offset นับหน่วย 4 byte ไม่ใช่ byte</div>`
    },
    {
      t: "TCP Connection Management: Handshake และการปิด",
      ref: "หน้า 61-64",
      html: `
<p>TCP ต้องมั่นใจว่าอีกฝ่ายพร้อมก่อนสื่อสาร และ negotiate พารามิเตอร์ เช่น ขนาด receive window, MSS, อนุญาต SACK หรือไม่, รองรับ timestamp หรือไม่ ฝ่ายที่เริ่มคือ <b>client</b> ฝ่ายที่รอคือ <b>server</b></p>
<h4>Three-way handshake</h4>
<figure><img src="i/p062_1.webp" alt="three-way handshake ระหว่าง client กับ server พร้อมสถานะ" loading="lazy"><figcaption>Fig. 2.28 สร้าง TCP connection ด้วย three-way handshake</figcaption></figure>
<p>Server เริ่มรอฟัง port: CLOSED เป็น <b>LISTEN</b></p>
<table>
<tr><th>ขั้น</th><th>ผู้ส่ง</th><th>Flag / ค่า</th><th>State หลังส่ง</th></tr>
<tr><td>1</td><td>Client</td><td>SYN=1, ACK=0, seq=x (initial sequence number)</td><td>SYN_SENT</td></tr>
<tr><td>2</td><td>Server</td><td>SYN=1, ACK=1, seq=y, ack=x+1</td><td>SYN_RCVD</td></tr>
<tr><td>3</td><td>Client</td><td>SYN=0, ACK=1, seq=x+1, ack=y+1</td><td>ESTABLISHED (server ก็ ESTABLISHED เมื่อรับ)</td></tr>
</table>
<p>ตัวพิมพ์ใหญ่ ACK คือ <b>flag</b> ส่วนตัวพิมพ์เล็ก ack คือ <b>ค่า acknowledgement number</b> หลัง handshake จริง ๆ เกิด TCP session 2 ทิศ: ทิศ client ไป server (SYN ของ client ขอสร้าง) และทิศ server ไป client (SYN ของ server อยู่ใน SYN+ACK ซึ่งขอสร้างอีกทิศ)</p>
<h4>การปิด connection (4 segment)</h4>
<figure><img src="i/p063_1.webp" alt="กระบวนการปิด TCP connection พร้อมสถานะ FIN-WAIT, CLOSE-WAIT, LAST-ACK, TIME-WAIT" loading="lazy"><figcaption>Fig. 2.29 กระบวนการ release TCP connection</figcaption></figure>
<ol>
<li>A ส่ง <b>FIN=1</b>, seq=u (= byte สุดท้ายที่ส่ง + 1) แล้วเข้า <b>FIN-WAIT-1</b> (FIN กิน sequence number 1 ตัวแม้ไม่มีข้อมูล)</li>
<li>B ตอบ ACK, ack=u+1, seq=v แล้วเข้า <b>CLOSE-WAIT</b>; ทิศ A เป็น B ถูกปิด แต่ B ยังส่งข้อมูลถึง A ได้ เรียก <b>half-close</b></li>
<li>A ได้ ACK เข้า <b>FIN-WAIT-2</b> รอ B</li>
<li>เมื่อ B ส่งข้อมูลหมด ส่ง <b>FIN=1</b>, seq=w, ack=u+1 (ย้ำค่าเดิม) แล้วเข้า <b>LAST-ACK</b></li>
<li>A ตอบ ACK, ack=w+1, seq=u+1 แล้วเข้า <b>TIME-WAIT</b> และรอ <b>2MSL</b> จึงเข้า CLOSED</li>
</ol>
<div class="note"><b>💡 หมายเหตุ</b> MSL (Maximum Segment Lifetime) RFC 793 แนะนำ 2 นาที จึง TIME-WAIT = 4 นาที ก่อนเปิด connection ใหม่ได้ (implementation อาจใช้ MSL สั้นกว่า)</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Handshake: SYN, SYN+ACK, ACK เท่ากับ 3 segment (ไม่มีข้อมูล) | ปิด: 4 segment เพราะแต่ละทิศปิดแยก</li>
<li>SYN/FIN กิน seq 1 ตัว</li>
<li>ฝ่ายที่ปิดก่อน (active close) เข้า TIME-WAIT; ฝ่ายรับ FIN ก่อนเข้า CLOSE-WAIT เป็น LAST-ACK</li>
</ul></div>`
    },
    {
      t: "TCP Reliable Transmission และ UDP",
      ref: "หน้า 64-66",
      html: `
<p>TCP ทำ reliable transmission ด้วย <b>sliding window protocol</b> และ <b>continuous ARQ</b> (Automatic Repeat-reQuest) ในตัวอย่างสมมติแต่ละ packet 100 byte</p>
<figure><img src="i/p065_1.webp" alt="ตัวแทน packet M1 ถึง M10 ที่มีขนาด 100 byte" loading="lazy"><figcaption>Fig. 2.30 การย่อ packet: M1 = byte 1-100, M2 = 101-200 ...</figcaption></figure>
<h4>Sliding window</h4>
<p>ตอน handshake B แจ้ง receive window 400 byte A ตั้ง send window 400 byte = 4 packet (M1 ถึง M4) ส่งติดกันได้เลย (บันทึกเวลาส่งของแต่ละตัว) แล้วหยุด B ได้ครบทั้ง 4 ตัวจึงส่ง ACK <b>ack=401</b> ตัวเดียว (รับถึง byte 400) A ได้ ACK ของ M4 แล้ว window เลื่อนไป M5 ถึง M8 และส่งได้ทั้งหมด</p>
<figure><img src="i/p065_2.webp" alt="ตัวอย่าง sliding window และ continuous ARQ เมื่อ M7 หาย" loading="lazy"><figcaption>Fig. 2.31 Continuous ARQ และ sliding window (เหตุการณ์ t1, t2, t3)</figcaption></figure>
<h4>Continuous ARQ เมื่อ packet หาย</h4>
<p>ถ้า M7 หายและ B ได้ M5, M6, M8 กับ M1 ถึง M6 ที่ต่อเนื่อง B ส่ง <b>ack=601</b> (รับถึง 600) A ไม่ส่ง M7 ซ้ำทันที แต่เลื่อน window ให้ M9, M10 เข้ามาแล้วส่ง M7 จะถูกส่งซ้ำเมื่อ <b>timeout</b> (มากกว่า RTT เล็กน้อย) ลำดับส่งจึงเป็น M9, M7, M10</p>
<h4>UDP</h4>
<p>UDP เป็น <b>connectionless</b> ส่ง IP packet ได้โดยไม่ต้องสร้าง connection ไม่มีการเรียงลำดับ retransmit หรือ flow control ส่งไปแล้วไม่รู้ว่าถึงครบหรือไม่ มีไว้หลัก ๆ เพื่อระบุ application ด้วย <b>UDP + port</b></p>
<table>
<tr><th>เทียบ</th><th>TCP</th><th>UDP</th></tr>
<tr><td>Connection</td><td>connection-oriented (3-way handshake)</td><td>connectionless</td></tr>
<tr><td>Reliability</td><td>ACK, retransmit, เรียงลำดับ</td><td>ไม่มี</td></tr>
<tr><td>Flow/congestion control</td><td>มี</td><td>ไม่มี</td></tr>
<tr><td>Header</td><td>20-60 byte</td><td>เล็กกว่า</td></tr>
<tr><td>ใช้กับ</td><td>HTTP, FTP, SMTP, POP3</td><td>DNS, real-time, multicast</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ACK สะสม: ack=N หมายถึงรับต่อเนื่องถึง N-1; packet ที่หายส่งซ้ำเมื่อ timeout</li>
<li>Sliding window ส่งหลาย packet ต่อเนื่องก่อนรอ ACK ต่างจาก stop-and-wait</li>
</ul></div>`
    },
    {
      t: "Network Layer: ภาพรวมและ IP Header",
      ref: "หน้า 66-71",
      html: `
<p>Network layer ส่ง segment ของ transport ไปยัง receiver ผ่านการเลือกเส้นทาง Core protocol มี 2 version คือ <b>IPv4</b> และ <b>IPv6</b> (รวมเรียก IP) หน้าที่เดียวกัน sender ใส่ IP header (source/destination IP) ให้ segment เรียกว่า <b>packet</b> และ router forward ตาม IP header</p>
<figure><img src="i/p067_1.webp" alt="TCP/IPv4 protocol stack: ARP, IPv4, ICMP, IGMP ที่ network layer" loading="lazy"><figcaption>Fig. 2.32 TCP/IPv4 protocol stack: network layer มี ARP, IPv4, ICMP, IGMP</figcaption></figure>
<p>Network layer ของ IPv4 มี 4 protocol: <b>ARP, IPv4, ICMP, IGMP</b> โดย ARP, ICMP, IGMP เป็น protocol รอง ICMP/IGMP/TCP/UDP ถูก encapsulate ใน IPv4 และแยกด้วย <b>protocol number</b>:</p>
<table>
<tr><th>Protocol</th><th>เลข</th></tr>
<tr><td>ICMP</td><td>1</td></tr>
<tr><td>IGMP</td><td>2</td></tr>
<tr><td>TCP</td><td>6</td></tr>
<tr><td>UDP</td><td>17</td></tr>
</table>
<p>ARP อยู่<b>ใต้</b> IP (ให้บริการ IP) ส่วน ICMP และ IGMP อยู่<b>เหนือ</b> IP ในแง่ความสัมพันธ์ ARP ใช้เฉพาะ Ethernet</p>
<figure><img src="i/p068_1.webp" alt="TCP/IPv6 protocol stack ไม่มี ARP และ IGMP" loading="lazy"><figcaption>Fig. 2.33 TCP/IPv6 protocol stack: ไม่มี ARP/IGMP ใช้ ND และ MLD ใน ICMPv6</figcaption></figure>
<p>IPv6 ไม่มี ARP และ IGMP; function ของมันถูกฝังใน ICMPv6 เป็น <b>Neighbor Discovery (ND)</b> และ <b>Multicast Listener Discovery (MLD)</b> โดยไม่กระทบ transport และ data link</p>
<h4>IP: best effort</h4>
<p>IP ใช้ IP address ที่ "ไม่ซ้ำ" ระบุแต่ละฝ่าย เขียนเป็น 32 bit แต่แสดงเป็น dotted decimal (เช่น 192.168.1.1) ต้องมี routing protocol (OSPF, IS-IS, BGP) ช่วยสร้าง routing table และ ICMP ช่วยวินิจฉัย IP <b>ไม่รับประกัน</b>ความ reliable หรือการเรียงลำดับ: router ทิ้ง packet ที่ประมวลผลไม่ทัน และแต่ละ packet เลือกเส้นทางแยกกัน</p>
<p>การทำงาน: (1) network layer รับข้อมูลจากชั้นบนแล้วใส่ IP header ที่มี source/destination IP (2) router อ่าน destination IP และ forward ตาม routing table (3) host ปลายทางอ่าน destination IP ตัดสินใจรับหรือไม่</p>
<figure><img src="i/p069_1.webp" alt="โครงสร้าง IPv4 header" loading="lazy"><figcaption>Fig. 2.34 Network layer IP packet header format</figcaption></figure>
<table>
<tr><th>Field</th><th>ขนาด</th><th>ความหมาย</th></tr>
<tr><td>Version</td><td>4 bit</td><td>4 สำหรับ IPv4 (ทั้งสองฝ่ายต้องตรงกัน)</td></tr>
<tr><td>Header length</td><td>4 bit</td><td>หน่วย <b>4 byte</b>; 1111 = 60 byte; ที่พบบ่อย 0101 = 20 byte; ถ้าไม่ครบตัวคูณ 4 ใช้ padding</td></tr>
<tr><td>Differentiated Services</td><td>8 bit</td><td>เดิมคือ Type of Service; ใช้ทำ QoS ให้ router ให้ priority กับ packet ที่ติดธง</td></tr>
<tr><td>Total length</td><td>16 bit</td><td>header + data เป็น byte; สูงสุด 65,535</td></tr>
<tr><td>Identification</td><td>16 bit</td><td>counter ต่อ packet ไม่ใช่ sequence number; fragment ของ packet เดียวกันใช้ค่าเดียวกัน เพื่อ reassemble</td></tr>
<tr><td>Flags</td><td>3 bit</td><td>MF (More Fragment): 1 = ยังมี fragment ตามมา, 0 = อันสุดท้าย; DF (Don't Fragment): fragment ได้เมื่อ DF = 0 เท่านั้น</td></tr>
<tr><td>Fragment offset</td><td>13 bit</td><td>ตำแหน่ง fragment เทียบจุดเริ่ม data หน่วย <b>8 byte</b></td></tr>
<tr><td>TTL</td><td>8 bit</td><td>เดิมเป็นวินาที ปัจจุบันเป็น <b>hop limit</b>: router ลด 1 ก่อน forward ถึง 0 ทิ้ง; สูงสุด 255; TTL = 1 อยู่ใน LAN ได้เท่านั้น</td></tr>
<tr><td>Protocol</td><td>8 bit</td><td>ระบุ protocol ของ data (TCP 6, UDP 17, ICMP 1, IGMP 2)</td></tr>
<tr><td>Header checksum</td><td>16 bit</td><td>ตรวจ<b>เฉพาะ header</b> ไม่ตรวจ data เพราะ router คำนวณใหม่ทุก hop (TTL, flags, offset เปลี่ยน)</td></tr>
<tr><td>Source / Destination IP</td><td>32 bit</td><td>ที่อยู่ต้นทาง/ปลายทาง</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ (Fragmentation)</b> ถ้า packet ใหญ่กว่า MTU ของ link จะถูกแบ่ง ทุก fragment ใช้ Identification เดิม fragment สุดท้ายมี MF = 0 ความยาวข้อมูลของ fragment (ยกเว้นอันสุดท้าย) ต้องเป็นตัวคูณของ 8 เช่น MTU 1500 header 20 byte เหลือข้อมูล 1480 byte ต่อ fragment (1480 หาร 8 ลงตัว) offset ของอันที่สอง = 1480/8 = 185</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>IP header ขั้นต่ำ 20 byte สูงสุด 60 byte; checksum ตรวจเฉพาะ header</li>
<li>TTL ลด 1 ต่อ router; ถึง 0 ถูกทิ้งและส่ง ICMP Time Exceeded</li>
<li>IP = best effort ไม่ reliable ไม่รับประกันลำดับ</li>
</ul></div>`
    },
    {
      t: "ICMP: ping และ tracert",
      ref: "หน้า 71-75",
      html: `
<p><b>ICMP</b> ส่ง control message ระหว่าง host กับ router เกี่ยวกับตัว network เอง เช่น การเชื่อมต่อ การเข้าถึง host ความพร้อมของ route ICMP ถูก encapsulate ใน IP packet ใช้ผ่านคำสั่ง <b>ping</b> และ <b>tracert</b> ได้บน Windows, Linux และอุปกรณ์เครือข่าย</p>
<pre><code>C:\\Users\\hanlg&gt;ping www.huawei.com
Reply from 111.11.0.121: bytes=32 time=10ms TTL=57
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
Approximate round trip times: Minimum = 10ms, Maximum = 11ms, Average = 10ms</code></pre>
<p>ping ส่ง ICMP request 4 ครั้งและได้ response ครบแสดงว่า network ปกติ ส่วน <b>tracert</b> แสดง router ตามทางไปปลายทาง (ตัวอย่าง 13 router แล้ว hop ที่ 14 คือปลายทาง) อาศัยการส่ง packet ที่ TTL เพิ่มทีละ 1 และรับ Time Exceeded จาก router แต่ละตัว</p>
<figure><img src="i/p073_1.webp" alt="PC1 ping 192.168.8.2 ผ่าน router AR1 และ AR2" loading="lazy"><figcaption>Fig. 2.36 ICMP request และ response: PC1 ping 192.168.8.2</figcaption></figure>
<p>จาก packet capture ICMP message มี field Type, Code, Checksum และ data: request มี <b>Type 8, Code 0</b> (echo request), response มี <b>Type 0, Code 0</b> (echo reply)</p>
<figure><img src="i/p073_2.webp" alt="packet capture ICMP request type 8" loading="lazy"><figcaption>Fig. 2.37 ICMP request message (Type 8)</figcaption></figure>
<figure><img src="i/p074_1.webp" alt="packet capture ICMP response type 0" loading="lazy"><figcaption>Fig. 2.38 ICMP response message (Type 0)</figcaption></figure>
<figure><img src="i/p074_2.webp" alt="ตาราง ICMP message types และ codes" loading="lazy"><figcaption>Table 2.1 ICMP message types and codes</figcaption></figure>
<h4>ICMP error report 5 ชนิด</h4>
<table>
<tr><th>Type</th><th>ชื่อ</th><th>เมื่อไหร่</th></tr>
<tr><td>3</td><td>Destination Unreachable</td><td>ไม่มี route ไปปลายทาง: ทิ้ง packet แล้วแจ้งต้นทาง (Code 0 net, 1 host, 2 protocol, 3 port unreachable, 4 ต้อง fragment แต่ DF = 1, 13 ถูก filter ห้าม)</td></tr>
<tr><td>4</td><td>Source Quench</td><td>ทิ้ง packet เพราะ congestion จึงบอกต้นทางให้ช้าลง</td></tr>
<tr><td>5</td><td>Redirect</td><td>router บอก host ว่าครั้งหน้าให้ส่งผ่าน router อื่นที่ดีกว่า</td></tr>
<tr><td>11</td><td>Time Exceeded</td><td>TTL = 0 (Code 0) หรือ destination รวม fragment ไม่ครบตามเวลา</td></tr>
<tr><td>12</td><td>Parameter Problem</td><td>field ใน header ผิด (Code 0 header ผิด, 1 ขาด option)</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ping ใช้ ICMP echo request (type 8) / echo reply (type 0)</li>
<li>Time Exceeded เมื่อ TTL = 0 คือหลักการของ tracert</li>
<li>ไม่มี route: Destination Unreachable | congestion: Source Quench | header ผิด: Parameter Problem</li>
</ul></div>`
    },
    {
      t: "ARP: Address Resolution Protocol",
      ref: "หน้า 75-80",
      html: `
<p><b>ARP</b> แปลง IP address เป็น MAC address, เก็บ <b>ARP cache</b> (ARP table) และตรวจ IP ซ้ำใน network segment เดียวกัน ใช้เฉพาะ <b>Ethernet</b></p>
<h4>Ethernet และ MAC address</h4>
<ul>
<li>Ethernet เป็น data link protocol แบบ broadcast และรองรับ multipoint access (network ของ switch คือ Ethernet); NIC ของคอมพิวเตอร์และ interface ของอุปกรณ์ (router interface, virtual interface ของ L3 switch) มี MAC address</li>
<li><b>MAC address</b> (physical/hardware address) 48 bit ถูกเบิร์นลงชิป NIC โดยผู้ผลิต แสดงเป็น hexadecimal เช่น 00-DB-DF-F9-D2-51 ดูใน Windows ด้วย <code>ipconfig /all</code> (Physical Address)</li>
<li>การสื่อสารบน Ethernet ต้องระบุทั้ง source MAC และ destination MAC</li>
</ul>
<h4>ARP cache</h4>
<p>ก่อนส่งข้อมูลดู ARP cache ก่อน ถ้ามี entry ของปลายทางใช้ MAC นั้น encapsulate frame ได้เลย ถ้าไม่มีต้องส่ง <b>ARP Request</b> entry เก็บไว้ช่วงหนึ่ง (default <b>180 วินาที</b>) แล้วถูกลบเองเมื่อหมดอายุ ถ้าปลายทางอยู่ network อื่น ต้องหา MAC ของ <b>gateway</b> (router interface ใน network ตน) แล้วส่งให้ gateway</p>
<h4>การทำงานของ ARP</h4>
<p>Computer A ต้องการ MAC ของ 192.168.1.20 จึงส่ง ARP request โดยใส่ target MAC เป็น broadcast <b>FF-FF-FF-FF-FF-FF</b> switch ส่งต่อทุก port</p>
<figure><img src="i/p077_1.webp" alt="ARP request ส่งแบบ broadcast ผ่าน switch ไปทุกเครื่อง" loading="lazy"><figcaption>Fig. 2.39 ARP request ใช้ broadcast frame</figcaption></figure>
<p>ทุกเครื่องเทียบ target IP กับ IP ตน เครื่องที่ไม่ตรงไม่ตอบ เครื่องที่ตรงจะบันทึก IP/MAC ของผู้ส่งลง ARP cache แล้วตอบด้วย <b>ARP reply แบบ unicast</b> ไปยัง MAC ของ A</p>
<figure><img src="i/p077_2.webp" alt="ARP reply ส่งแบบ unicast กลับหา Computer A" loading="lazy"><figcaption>Fig. 2.40 ARP response ใช้ unicast frame</figcaption></figure>
<h4>Segment เดียวกัน vs ข้าม segment</h4>
<figure><img src="i/p078_1.webp" alt="Computer A ส่ง ARP broadcast หา MAC ของ Computer B ใน segment เดียวกัน" loading="lazy"><figcaption>Fig. 2.41 เครื่องใน segment เดียวกันใช้ ARP broadcast หา MAC ของ target IP</figcaption></figure>
<figure><img src="i/p078_2.webp" alt="Computer A ส่งหา Computer F ข้าม segment โดย ARP หา MAC ของ gateway" loading="lazy"><figcaption>Fig. 2.42 สื่อสารข้าม segment: ARP หา MAC ของ gateway</figcaption></figure>
<table>
<tr><th>ช่วง</th><th>Source IP</th><th>Dest IP</th><th>Source MAC</th><th>Dest MAC</th></tr>
<tr><td>Ethernet 1 (A ไป R1)</td><td>IP A</td><td>IP F</td><td>MA</td><td>MC (R1 interface C)</td></tr>
<tr><td>Link ระหว่าง R1-R2 (PPP)</td><td>IP A</td><td>IP F</td><td>ไม่มี MAC (PPP ไม่มี field MAC)</td><td></td></tr>
<tr><td>Ethernet 2 (R2 ไป F)</td><td>IP A</td><td>IP F</td><td>MD (R2 interface D)</td><td>MF</td></tr>
</table>
<p>สรุป: <b>destination IP</b> ตัดสินปลายทางสุดท้าย (คงเดิมตลอดทาง) ส่วน <b>destination MAC</b> ตัดสิน interface next hop (เปลี่ยนทุก link) ARP หาได้เฉพาะ MAC ใน segment เดียวกัน เครื่อง F จึงเห็น source MAC เป็น MAC ของ interface D ของ R2 ไม่ใช่ของ A</p>
<div class="note"><b>💡 หมายเหตุ</b> ARP ใช้เฉพาะ Ethernet; point-to-point link มักใช้ PPP ซึ่ง frame ไม่มี field MAC จึงไม่ต้อง ARP ดู ARP table ใน Windows ด้วย <code>arp -a</code> (Dynamic = ได้จาก ARP, Static = ค่าคงที่ เช่น broadcast, multicast)</div>
<h4>Packet capture ของ ARP</h4>
<figure><img src="i/p079_1.webp" alt="packet capture ARP request frame ที่ 27 พร้อม opcode" loading="lazy"><figcaption>Fig. 2.43 ARP request frame (Target MAC = ff:ff:ff:ff:ff:ff, opcode = 0x0001)</figcaption></figure>
<p>Frame ที่ 27 คือ ARP request จาก 192.168.80.20 หา MAC ของ 192.168.80.30 โดย target MAC เป็น broadcast; <b>opcode request = 0x0001, reply = 0x0002</b>; frame ที่ 28 เป็น reply ซึ่งเป็น unicast ส่งหา MAC ของ 192.168.80.20</p>
<div class="warn"><b>⚠️ ระวัง ARP spoofing</b> ARP สร้างบนความเชื่อใจกัน: เครื่องใดใน segment ก็ตอบ ARP reply ได้ และผู้ถามไม่ตรวจสอบความจริงก่อนบันทึกลง cache จึงถูกหลอกให้จด MAC ผิดได้</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ARP request = broadcast (opcode 1) | ARP reply = unicast (opcode 2)</li>
<li>Cache default 180 s | ข้าม network ต้อง ARP หา MAC ของ gateway</li>
<li>IP คงเดิม แต่ MAC เปลี่ยนทุก hop</li>
</ul></div>`
    },
    {
      t: "Network Interface Layer: Data Link",
      ref: "หน้า 80-83",
      html: `
<p>Network interface layer ของ TCP/IPv4 ไม่ใช่ส่วนของ Internet protocol set แต่เป็นวิธีส่ง packet จาก network layer ของอุปกรณ์หนึ่งไปอีกอุปกรณ์หนึ่ง: ใส่ data link header ห่อเป็น <b>frame</b>, ส่งผ่านสื่อ (fiber, twisted pair, wireless) แล้วฝั่งรับลอก header ส่ง packet ขึ้น network layer ชั้นนี้รวม function ของ data link และ physical ของ OSI ที่ interface ของ NIC/router</p>
<figure><img src="i/p081_1.webp" alt="PC1 สื่อสารกับ PC2 ผ่านหลาย link และ data link protocol ต่างชนิด" loading="lazy"><figcaption>Fig. 2.44 Links และ data link protocols: Ethernet link ใช้ CSMA/CD ระหว่าง router ใช้ PPP/HDLC</figcaption></figure>
<p>Data link protocol ทั่วไป: CSMA/CD, PPP, HDLC, Frame Relay, X.25 แต่ละตัวกำหนด frame format ต่างกัน แต่ทุกตัวมี 3 หน้าที่พื้นฐาน</p>
<h4>1. Encapsulation</h4>
<p>เติม header ด้านหน้าและ trailer ด้านหลัง IP packet เป็น frame; ที่ปลายมี <b>frame delimiter</b> (start/end) ผู้รับอ่านตั้งแต่ start ถึง end ถือว่าได้ frame สมบูรณ์ ถ้าผู้ส่งขัดข้องกลางทาง ผู้รับได้ frame ที่มี start แต่ไม่มี end ถือว่าไม่สมบูรณ์และทิ้ง ส่วน data ของ frame มีขีดสูงสุดเรียก <b>MTU</b> (Ethernet = <b>1500 byte</b>) ซึ่งนับเฉพาะส่วน data</p>
<figure><img src="i/p081_2.webp" alt="เติม header และ footer ให้ IP packet เป็น frame" loading="lazy"><figcaption>Fig. 2.45 เติม frame header และ footer เพื่อ encapsulate เป็น frame</figcaption></figure>
<h4>2. Transparent transmission</h4>
<p>ถ้า delimiter ปรากฏอยู่ใน data ของ frame ต้องเติม <b>escape character</b> ผู้รับลบ escape แล้วถือตัวที่ตามหลังเป็น data เรียก <b>byte stuffing</b> ตัวอย่าง: start = SOH, end = EOT, escape = ESC ผู้ส่งเติม ESC หน้าตัว SOH, ESC และ EOT ที่อยู่ใน data</p>
<figure><img src="i/p082_1.webp" alt="ตัวอย่าง byte stuffing เติม ESC หน้า SOH ESC EOT ใน data" loading="lazy"><figcaption>Fig. 2.46 แก้ transparent transmission ด้วย byte stuffing</figcaption></figure>
<h4>3. Error check</h4>
<p>Link จริงไม่สมบูรณ์ bit อาจกลับ (bit error) อัตราส่วน bit error ต่อ bit ทั้งหมดคือ <b>BER</b> (เช่น 10^-10 = ผิดเฉลี่ย 1 bit ต่อ 10^10 bit) BER สัมพันธ์กับ SNR: ปรับปรุง SNR ลด BER แต่ลดเป็นศูนย์ไม่ได้ จึงต้องมี error check ใน data link ที่นิยมคือ <b>CRC</b> โดยฝั่งส่งคำนวณ <b>FCS (Frame Check Sequence)</b> จาก data และ header ของ data link วางท้าย frame ผู้รับคำนวณเทียบ ถ้าต่างกัน <b>ทิ้ง frame</b></p>
<figure><img src="i/p083_1.webp" alt="FCS อยู่ท้าย frame คำนวณจาก header และ data" loading="lazy"><figcaption>Fig. 2.47 Frame check sequence ท้าย frame</figcaption></figure>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Data link ทำ 3 อย่าง: encapsulation, transparent transmission, error check</li>
<li>Ethernet MTU = 1500 byte (ส่วน data) | CRC สร้าง FCS | ผิดแล้วทิ้ง frame (ไม่แก้ไขเอง)</li>
</ul></div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `ผู้ดูแลเครือข่ายพบว่าเครื่องหนึ่งส่ง ping ไป gateway ไม่ได้ หลังตรวจพบว่าเครื่องนั้นไม่ได้ตั้งค่า default gateway`,
      q: "ปัญหานี้จัดอยู่ในชั้นใด ตามแนวคิดการแบ่งปัญหาด้วย layering?",
      opts: [
        { t: "Network layer", why: "ถูก: การไม่มี gateway เป็นปัญหาของ network layer (IP/routing)" },
        { t: "Data link layer", why: "ผิด: ปัญหา data link เช่น MAC address ซ้ำ" },
        { t: "Application layer", why: "ผิด: ปัญหา application เช่นตั้ง proxy ใน browser ผิด" },
        { t: "Physical layer", why: "ผิด: ไม่เกี่ยวกับสายหรือสัญญาณ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `องค์กรกำลังอัปเกรดจาก IPv4 เป็น IPv6 และต้องการรู้ว่า protocol ชั้นใดต้องเปลี่ยนโดยหวังว่าแอปและ Ethernet เดิมไม่ต้องแก้`,
      q: "ชั้นใดของ TCP/IP stack ที่ต้องเปลี่ยน?",
      opts: [
        { t: "Network layer เท่านั้น", why: "ถูก: IPv4 กับ IPv6 ทำหน้าที่ network layer เหมือนกัน TCP/UDP และ data link ไม่ต้องเปลี่ยน" },
        { t: "Transport layer และ Network layer", why: "ผิด: TCP/UDP ใช้ต่อได้ตามเดิม" },
        { t: "Network layer และ Data link layer", why: "ผิด: protocol ของ data link ไม่ต้องเปลี่ยน" },
        { t: "ทุกชั้น", why: "ผิด: ข้อดีของ layering คือเปลี่ยนชั้นเดียวโดยไม่กระทบชั้นอื่น" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ลูกค้าเห็นข้อความ "405 Method Not Allowed" หลังพยายามลบรูปภาพบนเว็บไซต์ด้วย method DELETE ขณะที่ method อื่นของเว็บเซิร์ฟเวอร์ใช้ปกติ`,
      q: "ข้อใดอธิบายได้ถูกต้อง?",
      opts: [
        { t: "server รู้จัก method DELETE แต่ resource นั้นไม่รองรับ method นี้", why: "ถูก: 405 = resource ไม่รองรับ method นั้น" },
        { t: "server ไม่รู้จัก method DELETE เลย จึงควรตอบ 501", why: "ผิด: ถ้าไม่รู้จัก/ไม่รองรับ method จึงตอบ 501 Not Implemented ไม่ใช่ 405" },
        { t: "ไม่พบ resource ที่ร้องขอ", why: "ผิด: กรณีนั้นเป็น 404 Not Found" },
        { t: "syntax ของ request ผิด", why: "ผิด: นั่นคือ 400 Bad Request" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแล FTP server ต้องการให้ผู้ใช้ upload และดาวน์โหลดไฟล์ได้ แต่ห้ามลบไฟล์บน server`,
      q: "ควรทำอย่างไร และ client จะเห็นผลอะไรเมื่อลองลบไฟล์?",
      opts: [
        { t: "Deny command DELE ที่ FTP Request Filtering; client ได้ 500 Command not allowed", why: "ถูก: DELE คือ command ลบไฟล์ การ deny ทำให้ server ตอบ 500 Command not allowed" },
        { t: "Deny command STOR; client ได้ 404", why: "ผิด: STOR คือ upload และจะทำให้ upload ไม่ได้" },
        { t: "Deny command RNFR; client ได้ 405", why: "ผิด: RNFR เป็น rename ไม่ใช่การลบ" },
        { t: "เปลี่ยน FTP เป็น UDP", why: "ผิด: FTP ใช้ TCP และการเปลี่ยน transport ไม่ได้จำกัดคำสั่ง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทพัฒนาแอปส่งภาพหน้าจอและเสียงแบบ real-time ให้ผู้เข้าร่วมประชุมหลายร้อยคนพร้อมกัน ยอมรับได้ถ้ามีเฟรมหายบ้างเป็นบางครั้ง แต่ห้ามมีความหน่วงสะสม`,
      q: "ควรเลือก transport protocol ใดและเหตุผลหลักคืออะไร?",
      opts: [
        { t: "UDP เพราะไม่ต้องรอ retransmit และรองรับ multicast/broadcast", why: "ถูก: real-time และการส่งถึงหลายคนเข้ากับ UDP" },
        { t: "TCP เพราะต้องการให้ทุกเฟรมถึงครบ", why: "ผิด: TCP ต้องรอส่งซ้ำทำให้เกิด delay ซึ่งไม่เหมาะกับ real-time" },
        { t: "TCP เพราะมี flow control", why: "ผิด: flow control ไม่ได้แก้ความหน่วงสะสมจากการรอ retransmit" },
        { t: "ทั้ง TCP และ UDP เหมือนกัน", why: "ผิด: สมบัติต่างกันชัดเจน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เครื่อง client เปิด browser เข้าเว็บ https ของบริษัทหนึ่ง โดยไม่ได้ตั้งค่า port เอง`,
      q: "ข้อใดคือ destination port และ transport protocol ที่ถูกต้องของ packet แรกที่ส่งไปหา web server?",
      opts: [
        { t: "TCP, destination port 443", why: "ถูก: HTTPS ใช้ TCP 443 (packet แรกคือ SYN)" },
        { t: "TCP, destination port 80", why: "ผิด: 80 คือ HTTP ไม่เข้ารหัส" },
        { t: "UDP, destination port 443", why: "ผิด: HTTPS ตามบทนี้ใช้ TCP" },
        { t: "TCP, destination port 8080", why: "ผิด: ไม่ใช่ค่า default" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `เครื่อง A เปิดหน้าเว็บ และ B เช็กอีเมลบน POP3 พร้อมกัน server เครื่องเดียวกันรัน Web, SMTP, POP3 packet ที่มาถึงมี IP ปลายทางเดียวกัน`,
      q: "server ใช้อะไรแยกว่า packet ใดส่งให้ service ไหน?",
      opts: [
        { t: "destination port (เช่น 80 ส่ง Web, 110 ส่ง POP3)", why: "ถูก: destination IP หาเครื่อง ส่วน destination port หา service" },
        { t: "source IP address", why: "ผิด: ใช้ระบุผู้ส่ง ไม่ใช่ service" },
        { t: "TTL", why: "ผิด: TTL จำกัดจำนวน hop" },
        { t: "MAC address ปลายทาง", why: "ผิด: MAC ระบุ interface ในลิงก์ ไม่ใช่ service" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Computer A ส่งข้อมูลให้ B ผ่าน TCP segment ละ 100 byte โดย segment แรกมี seq = 1 B ได้รับ 3 segment แรกครบต่อเนื่อง`,
      q: "B ควรส่ง ACK ด้วย ack number เท่าใด และ segment ที่ 4 ที่ A ส่งต่อมี seq เท่าใด?",
      opts: [
        { t: "ack = 301, segment ที่ 4 มี seq = 301", why: "ถูก: ได้ byte 1-300 ครบ จึงคาดหวัง byte 301; segment ถัดไปเริ่มที่ 301" },
        { t: "ack = 300, seq = 300", why: "ผิด: ack ต้องเป็นเลข byte ถัดไปที่คาดหวัง (300 + 1)" },
        { t: "ack = 3, seq = 4", why: "ผิด: TCP นับเป็น byte ไม่ใช่จำนวน segment" },
        { t: "ack = 301, seq = 401", why: "ผิด: segment ที่ 4 ต้องต่อจาก byte 300 ทันที" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `จากการดักจับ ค่า Data offset ใน TCP header ของ segment หนึ่งคือ 8 (ฐานสิบ)`,
      q: "TCP header ยาวกี่ byte และมี options กี่ byte?",
      opts: [
        { t: "32 byte, options 12 byte", why: "ถูก: 8 x 4 = 32 byte; ลบส่วนคงที่ 20 byte เหลือ options 12 byte" },
        { t: "8 byte, options 0 byte", why: "ผิด: หน่วยของ data offset คือ 4 byte" },
        { t: "40 byte, options 20 byte", why: "ผิด: คำนวณ 8 x 5 ไม่ถูกต้อง" },
        { t: "60 byte, options 40 byte", why: "ผิด: ค่า 60 byte ต้องใช้ data offset = 15" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Client ส่ง SYN โดยมี ISN = 2000 และ server ตอบ SYN+ACK ด้วย ISN = 7000`,
      q: "segment ที่สาม (ACK จาก client) ควรมีค่า seq และ ack เท่าใด และ client เข้า state ใด?",
      opts: [
        { t: "seq = 2001, ack = 7001, ESTABLISHED", why: "ถูก: ตามรูปแบบ seq = x+1, ack = y+1 และ client เข้า ESTABLISHED หลังส่ง" },
        { t: "seq = 2000, ack = 7000, SYN_SENT", why: "ผิด: ต้อง +1 และไม่อยู่ใน SYN_SENT แล้ว" },
        { t: "seq = 7001, ack = 2001, ESTABLISHED", why: "ผิด: สลับบทบาท client/server" },
        { t: "seq = 2001, ack = 7001, SYN_RCVD", why: "ผิด: SYN_RCVD เป็น state ของ server หลังได้ SYN" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Host A ปิด TCP connection ก่อน (active close) หลังจาก A ส่ง ACK สุดท้ายและเข้า TIME-WAIT ระบบใช้ MSL = 2 นาทีตามค่าที่ RFC 793 แนะนำ`,
      q: "A ต้องรอนานเท่าใดก่อนเข้า CLOSED และ state ของ B ที่รอ ACK สุดท้ายคืออะไร?",
      opts: [
        { t: "4 นาที (2MSL); B อยู่ใน LAST-ACK ก่อนได้ ACK", why: "ถูก: TIME-WAIT รอ 2MSL = 4 นาที; B ส่ง FIN แล้วอยู่ LAST-ACK" },
        { t: "2 นาที; B อยู่ใน CLOSE-WAIT", why: "ผิด: ต้องรอ 2MSL และ B ที่ส่ง FIN แล้วอยู่ LAST-ACK ไม่ใช่ CLOSE-WAIT" },
        { t: "4 นาที; B อยู่ใน FIN-WAIT-2", why: "ผิด: FIN-WAIT-2 เป็น state ของฝั่งที่ปิดก่อน (A)" },
        { t: "ทันที เพราะ ACK ส่งแล้ว", why: "ผิด: ต้องรอเผื่อ ACK หายและ segment เก่าหมดอายุ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Sender A มี send window 500 byte และส่ง segment ละ 100 byte (M1 ถึง M5 = byte 1-500) พร้อมกัน ฝั่ง B ได้รับ M1, M2, M3, M5 แต่ M4 หาย`,
      q: "B ส่ง ack เท่าใด และ M4 ถูกส่งซ้ำเมื่อใด?",
      opts: [
        { t: "ack = 301 และ M4 ส่งซ้ำเมื่อ timeout (ไม่ต้องรอ window เต็ม)", why: "ถูก: ACK สะสม ได้ต่อเนื่องถึง byte 300 จึงขอ 301; M4 ส่งซ้ำเมื่อ timeout" },
        { t: "ack = 501 เพราะ M5 มาถึงแล้ว", why: "ผิด: ACK บอกเฉพาะ byte ที่ต่อเนื่องจาก byte 1" },
        { t: "ack = 401 เพราะ M4 หาย", why: "ผิด: ack ที่ถูกคือ 301 (รับ M1-M3)" },
        { t: "ไม่ส่ง ack จนกว่า M4 มา", why: "ผิด: B ส่ง ACK ของส่วนต่อเนื่องที่ได้แล้ว" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Router รับ IP packet ขนาดรวม 4000 byte (IP header 20 byte, data 3980 byte) ต้องส่งออก link ที่ MTU = 1500 byte และ DF = 0`,
      q: "แบ่งเป็นกี่ fragment และค่า fragment offset กับ MF ของ fragment ที่ 2 และ 3 เป็นเท่าใด?",
      opts: [
        { t: "3 fragment; ที่ 2: offset 185, MF=1; ที่ 3: offset 370, MF=0", why: "ถูก: data 1480 + 1480 + 1020 = 3980; offset = 0, 1480/8 = 185, 2960/8 = 370; อันสุดท้าย MF = 0" },
        { t: "3 fragment; ที่ 2: offset 1480, MF=1; ที่ 3: offset 2960, MF=0", why: "ผิด: offset มีหน่วย 8 byte ต้องหารด้วย 8" },
        { t: "2 fragment; ที่ 2: offset 185, MF=0", why: "ผิด: 2 fragment รวมได้แค่ 2960 byte ของ data" },
        { t: "3 fragment; ที่ 2: offset 185, MF=0; ที่ 3: offset 370, MF=0", why: "ผิด: fragment ที่ 2 ยังมีตามมา ต้อง MF = 1" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลทดสอบ ping ไปเครื่องปลายทางแล้วได้ "Reply from ... TTL=57" ซึ่งเครื่องปลายทางตั้ง TTL เริ่มต้นเป็น 64`,
      q: "packet ตอบกลับผ่าน router มากี่ตัว และ ICMP type ของ reply คืออะไร?",
      opts: [
        { t: "7 router; type 0 (echo reply)", why: "ถูก: 64 - 57 = 7 (ลดทีละ 1 ต่อ router) และ echo reply คือ type 0 code 0" },
        { t: "57 router; type 8", why: "ผิด: TTL ที่เหลือไม่ใช่จำนวน router และ type 8 เป็น request" },
        { t: "7 router; type 8 (echo request)", why: "ผิด: reply เป็น type 0" },
        { t: "121 router; type 0", why: "ผิด: ไม่ใช่การคำนวณที่ถูก" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `PC1 (192.168.1.10/24) ต้องการส่งข้อมูลไป Server (10.0.0.5) ที่อยู่คนละ network โดย gateway ของ PC1 คือ 192.168.1.1 และ ARP cache ของ PC1 ยังว่าง`,
      q: "PC1 ต้องส่ง ARP request หา MAC ของ IP ใด และ frame แรกที่ส่งมี destination IP / destination MAC อะไร?",
      opts: [
        { t: "ARP หา 192.168.1.1; frame มี dest IP = 10.0.0.5, dest MAC = MAC ของ gateway", why: "ถูก: ARP หาได้เฉพาะใน segment เดียวกัน; dest IP คงเดิมแต่ dest MAC เป็น next hop" },
        { t: "ARP หา 10.0.0.5; dest MAC = MAC ของ Server", why: "ผิด: ARP broadcast ไม่ข้าม router" },
        { t: "ARP หา 192.168.1.1; dest IP = 192.168.1.1", why: "ผิด: dest IP ต้องเป็นปลายทางสุดท้าย" },
        { t: "ไม่ต้อง ARP ใช้ broadcast FF-FF-FF-FF-FF-FF เสมอ", why: "ผิด: ต้องหา MAC next hop เพื่อ encapsulate frame แบบ unicast" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลพบ ARP broadcast frame จำนวนมากจากเครื่องหนึ่งใน LAN ขณะที่ capture พบ target MAC = ff:ff:ff:ff:ff:ff และ opcode = 0x0001`,
      q: "frame เหล่านี้คืออะไร?",
      opts: [
        { t: "ARP request (ถามหา MAC ของ IP ปลายทาง)", why: "ถูก: opcode 1 = request ส่งแบบ broadcast" },
        { t: "ARP reply", why: "ผิด: reply มี opcode 2 และเป็น unicast" },
        { t: "ICMP echo request", why: "ผิด: เป็น protocol คนละตัว" },
        { t: "DHCP offer", why: "ผิด: ไม่เกี่ยวกับ opcode ของ ARP" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ในเครือข่ายหนึ่ง ผู้โจมตีส่ง ARP reply ปลอมบอกว่า IP ของ gateway อยู่ที่ MAC ของตน ทำให้เครื่องเหยื่อส่งข้อมูลผ่านผู้โจมตี`,
      q: "จุดอ่อนใดของ ARP ที่ทำให้เกิดเหตุนี้?",
      opts: [
        { t: "ARP สร้างบนความเชื่อใจ ผู้รับบันทึก reply ลง cache โดยไม่ตรวจความจริง", why: "ถูก: จึงเกิด ARP spoofing" },
        { t: "ARP ไม่ใช้ MAC address", why: "ผิด: ARP แปล IP เป็น MAC" },
        { t: "ARP reply เป็น broadcast จึงทุกเครื่องปลอมได้", why: "ผิด: reply เป็น unicast แต่ใครก็ตอบได้" },
        { t: "ARP ทำงานข้าม router", why: "ผิด: ARP ทำงานเฉพาะ segment เดียวกัน" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ฝั่งรับของ data link ได้ frame หนึ่งที่ FCS ที่คำนวณใหม่ไม่ตรงกับ FCS ท้าย frame`,
      q: "ผู้รับทำอย่างไร?",
      opts: [
        { t: "ทิ้ง frame นั้น", why: "ถูก: ถ้าต่างกันถือว่าเกิด error ระหว่างส่ง จึงทิ้ง (retransmission เป็นหน้าที่ชั้นบน เช่น TCP)" },
        { t: "แก้ bit ที่ผิดเองด้วย CRC แล้วส่งต่อ", why: "ผิด: บทนี้ใช้ CRC ตรวจ error ไม่ได้แก้ในตัว" },
        { t: "ส่ง frame ต่อไปแต่ตั้ง flag RST", why: "ผิด: RST เป็น flag ของ TCP" },
        { t: "ส่ง ICMP Source Quench ทันที", why: "ผิด: ไม่ใช่การจัดการ FCS ผิด" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ทีมเปรียบเทียบการเลือก transport protocol สำหรับหลายแอป`,
      q: "เลือกทุกแอปที่เหมาะกับ <b>UDP</b> มากกว่า TCP",
      opts: [
        { t: "DNS query ที่ถามชื่อโดเมนครั้งเดียวแล้วรับคำตอบ", ok: true, why: "ถูก: ข้อความสั้น ไม่ต้อง segment และไม่คุ้มกับ handshake" },
        { t: "การส่งภาพหน้าจอครูไปนักเรียนทั้งห้องพร้อมกันด้วย multicast", ok: true, why: "ถูก: one-to-many ใช้ UDP" },
        { t: "การโทรวิดีโอแบบ real-time", ok: true, why: "ถูก: ยอมให้หายบ้าง ไม่รอ retransmit" },
        { t: "การดาวน์โหลดไฟล์ติดตั้งขนาด 200 MB", ok: false, why: "ผิด: ต้อง segment, reliable, flow control จึงใช้ TCP" },
        { t: "การส่งอีเมลด้วย SMTP", ok: false, why: "ผิด: SMTP ใช้ TCP port 25" }
      ]
    },
    {
      type: "multi",
      story: `วิเคราะห์ TCP header ที่ได้จากการ capture`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับ TCP header",
      opts: [
        { t: "Checksum ครอบคลุมทั้ง header และ data", ok: true, why: "ถูก" },
        { t: "ack number = N แปลว่าได้รับ byte ถึง N-1 ครบแล้ว", ok: true, why: "ถูก" },
        { t: "SYN และ FIN แต่ละตัวกิน sequence number 1 ตัวแม้ไม่มีข้อมูล", ok: true, why: "ถูก" },
        { t: "field Window ใช้ทำ flow control โดยฝั่งรับเป็นผู้แจ้ง", ok: true, why: "ถูก" },
        { t: "Data offset นับเป็น byte ดังนั้นค่า 5 หมายถึง header 5 byte", ok: false, why: "ผิด: หน่วยคือ 4 byte ค่า 5 = 20 byte" }
      ]
    },
    {
      type: "multi",
      story: `ตรวจสอบ ICMP ในเครือข่าย`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Router ที่ได้ packet ซึ่ง TTL ลดเหลือ 0 จะทิ้งและส่ง Time Exceeded (type 11) กลับต้นทาง", ok: true, why: "ถูก: เป็นหลักการที่ tracert ใช้" },
        { t: "ไม่มี route ไปปลายทาง router ส่ง Destination Unreachable (type 3)", ok: true, why: "ถูก" },
        { t: "ping ส่ง echo request type 8 และได้ echo reply type 0", ok: true, why: "ถูก" },
        { t: "ICMP ถูก encapsulate ใน TCP segment", ok: false, why: "ผิด: ICMP ถูก encapsulate ใน IP packet (protocol number 1)" },
        { t: "Source Quench ใช้บอกต้นทางว่า checksum ผิด", ok: false, why: "ผิด: ใช้เมื่อ congestion ให้ต้นทางส่งช้าลง" }
      ]
    },
    {
      type: "multi",
      story: `Host A และ B เสร็จสิ้นการถ่ายโอนข้อมูลและเริ่มปิด TCP connection`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับการปิด connection",
      opts: [
        { t: "ต้องใช้ 4 segment เพราะแต่ละทิศปิดแยกกัน", ok: true, why: "ถูก: FIN, ACK, FIN, ACK" },
        { t: "หลัง B ตอบ ACK แล้ว B ยังส่งข้อมูลไป A ได้ (half-close)", ok: true, why: "ถูก: ทิศ B ไป A ยังไม่ถูกปิด" },
        { t: "ฝั่งที่ปิดก่อนเข้า TIME-WAIT รอ 2MSL", ok: true, why: "ถูก" },
        { t: "FIN ไม่กิน sequence number เพราะไม่มีข้อมูล", ok: false, why: "ผิด: FIN กิน sequence number 1 ตัว" },
        { t: "หลังส่ง ACK สุดท้าย A เข้า CLOSED ทันที", ok: false, why: "ผิด: ต้องผ่าน TIME-WAIT 2MSL" }
      ]
    },
    {
      type: "blank",
      story: `เติมค่า TCP three-way handshake ที่ client ISN = 100 และ server ISN = 300`,
      text: `SYN แรกมี seq = 100, ack ไม่ใช้; SYN+ACK มี seq = {1}, ack = {2}; ACK สุดท้ายมี seq = {3}, ack = {4}`,
      blanks: [
        { opts: ["100", "101", "300", "301"], ans: 2, why: "seq ของ SYN+ACK = ISN ของ server" },
        { opts: ["100", "101", "300", "301"], ans: 1, why: "ack = x + 1 = 101" },
        { opts: ["100", "101", "300", "301"], ans: 1, why: "seq = x + 1 = 101" },
        { opts: ["100", "101", "300", "301"], ans: 3, why: "ack = y + 1 = 301" }
      ]
    },
    {
      type: "blank",
      story: `สรุปข้อมูลของ IP header`,
      text: `IP header ขั้นต่ำยาว {1} byte; field Header length มีหน่วยเป็น {2} byte; field Fragment offset มีหน่วยเป็น {3} byte; checksum ของ IP ตรวจเฉพาะ {4}`,
      blanks: [
        { opts: ["20", "40", "60", "8"], ans: 0, why: "ส่วนคงที่ 20 byte" },
        { opts: ["1", "4", "8", "16"], ans: 1, why: "หน่วยเป็นคำ 32 bit = 4 byte" },
        { opts: ["1", "4", "8", "16"], ans: 2, why: "fragment offset หน่วย 8 byte" },
        { opts: ["header", "data", "header และ data", "source address"], ans: 0, why: "ลดงานคำนวณใหม่ทุก hop" }
      ]
    },
    {
      type: "blank",
      story: `สรุป port และ protocol number`,
      text: `DNS ใช้ {1} port 53; POP3 ใช้ TCP port {2}; protocol number ของ TCP ใน IP header คือ {3} และของ UDP คือ {4}`,
      blanks: [
        { opts: ["TCP", "UDP", "ICMP", "IGMP"], ans: 1, why: "DNS ใช้ UDP 53" },
        { opts: ["25", "110", "143", "443"], ans: 1, why: "POP3 = 110 (SMTP = 25)" },
        { opts: ["1", "2", "6", "17"], ans: 2, why: "TCP = 6" },
        { opts: ["1", "2", "6", "17"], ans: 3, why: "UDP = 17" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์การทำงานของ ARP`,
      text: `ARP request ถูกส่งเป็น {1} (destination MAC = FF-FF-FF-FF-FF-FF); ARP reply เป็น {2}; cache entry มีอายุ default {3} วินาที; ในการสื่อสารข้าม segment MAC ที่ resolve ได้คือของ {4}`,
      blanks: [
        { opts: ["broadcast", "unicast", "multicast", "anycast"], ans: 0, why: "ถามทุกเครื่อง" },
        { opts: ["broadcast", "unicast", "multicast", "anycast"], ans: 1, why: "ตอบตรงไปหาผู้ถาม" },
        { opts: ["60", "120", "180", "300"], ans: 2, why: "default 180 s" },
        { opts: ["gateway", "ปลายทางสุดท้าย", "DNS server", "switch"], ans: 0, why: "ARP หาได้เฉพาะ segment ตน" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ HTTP status code กับความหมาย",
      pairs: [
        ["200", "สำเร็จ (OK)"],
        ["404", "ไม่พบ resource (Not Found)"],
        ["400", "request ผิด syntax (Bad Request)"],
        ["405", "resource ไม่รองรับ method (Method Not Allowed)"],
        ["501", "server ไม่รู้จัก/ไม่รองรับ method (Not Implemented)"]
      ],
      why: "ตัวเลขหลักแรกบอกกลุ่ม: 2 สำเร็จ, 4 client error, 5 server error"
    },
    {
      type: "match",
      q: "จับคู่ TCP flag กับหน้าที่",
      pairs: [
        ["SYN", "sync sequence number เพื่อสร้าง connection"],
        ["FIN", "ผู้ส่งส่งข้อมูลหมด ขอปิด connection"],
        ["RST", "connection มีข้อผิดพลาดร้ายแรง ปฏิเสธ/รีเซ็ต"],
        ["PSH", "ส่งและส่งต่อให้แอปทันทีโดยไม่รอ buffer เต็ม"],
        ["URG", "ให้ urgent pointer มีผล ส่งข้อมูลเร่งด่วนก่อน"]
      ],
      why: "แต่ละ flag ยาว 1 bit มีบทบาทเฉพาะ"
    },
    {
      type: "match",
      q: "จับคู่ชั้นของ OSI กับหน้าที่",
      pairs: [
        ["Presentation", "encoding, compression, encryption ของข้อมูล"],
        ["Session", "สร้าง รักษา และปิด session ระหว่างโปรแกรม"],
        ["Transport", "บริการ end to end ระหว่าง process ของสอง host"],
        ["Network", "เลือกเส้นทางข้าม network"],
        ["Data Link", "ส่ง frame ข้าม link พร้อม error control"]
      ],
      why: "TCP/IP รวม Presentation และ Session เข้าเป็น Application"
    }
  ]
});
