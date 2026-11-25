IOT.reg({
  id: "c18",
  title: "Network Programming and Automation: Python",
  th: "ทำไมต้อง network automation, compiled vs interpreted language, พื้นฐาน Python (coding specification, function, module, class), และการใช้ telnetlib สั่งงาน Huawei router",
  summary: `
<ul>
<li><b>Network automation</b> ลดการพึ่งพา "คน": งานเช่น device upgrade จำนวนมาก, configuration audit, configuration change (เปลี่ยน account ทุก 3 เดือนบนอุปกรณ์เป็นพัน) การทำมือช้า ผิดพลาดง่าย และไม่มี audit; เครื่องมือ open-source: <b>Ansible, SaltStack, Puppet, Chef</b></li>
<li><b>Network programming</b> = เขียนโปรแกรมรับ/ส่งข้อมูลผ่านเครือข่าย ประกอบ (assemble) แพ็กเก็ตฝั่งส่ง parse ฝั่งรับ; งานหลัก: packet assembly, filtering, capture, analysis</li>
<li>ตัวอย่าง automation พื้นฐาน: เขียน <b>configuration file</b> แล้วเขียน <b>Python</b> push ไปที่อุปกรณ์ผ่าน <b>Telnet/SSH</b></li>
<li>ภาษา: machine language, assembly (ทั้งสอง = low-level), high-level; high-level แบ่งเป็น <b>compiled</b> (C, C++, Go) กับ <b>interpreted</b> (Python, Perl)</li>
<li>Compiled: compile เป็น binary (.exe, .dll) ก่อนรัน เร็ว แต่ <b>platform-specific</b>; Interpreted: แปลทุกครั้งที่รัน ช้ากว่า แต่รันได้เมื่อมี interpreter</li>
<li><b>Python</b>: object-oriented, interpreted, สร้างโดย Guido van Rossum ปี 1989, เปิดตัว 1991, free (GPL), cross-platform, "glue language"; ใช้ <b>whitespace indent</b> เป็น syntax</li>
<li>การรัน: source (.py) → interpreter → <b>byte code (.pyc)</b> → <b>PVM</b> → machine code → hardware</li>
<li><b>2 โหมด</b>: interactive (พิมพ์ที่ prompt <code>&gt;&gt;&gt;</code>) กับ scripted (.py แล้ว <code>python demo.py</code>)</li>
<li><b>Identifier</b>: ตัวอักษร/ตัวเลข/underscore, <b>ห้ามขึ้นต้นด้วยตัวเลข</b>, case-sensitive; ผิด = <b>SyntaxError</b></li>
<li><b>Indentation</b>: block ใช้ indent + colon; ใน block เดียวกันต้อง indent เท่ากัน, แนะนำ <b>4 spaces</b>; ผิด = <b>IndentationError</b></li>
<li><b>Comments</b>: บรรทัดเดียวขึ้นต้น <code>#</code>; หลายบรรทัดใช้ <code>""" ... """</code> หรือ <code>''' ... '''</code></li>
<li><b>โครงสร้างไฟล์</b>: interpreter declaration, encoding declaration, docstring, import, runtime code (import อยู่ด้านบนหลัง docstring)</li>
<li><b>Data type พื้นฐาน</b>: boolean, integer, float, string; ทุกอย่างเป็น <b>object</b></li>
<li><b>Function</b> ใช้ <code>def</code>; <b>module</b> = ไฟล์ .py ที่ถูก <code>import</code>; <b>class</b> ใช้ <code>class</code>, function ใน class เรียก method และต้องมี <code>self</code></li>
<li><b>Telnet</b> ใช้ NVT, escape sequence 2 byte ขึ้นต้นด้วย <b>0xFF = IAC</b>, port <b>23</b>; module <code>telnetlib</code> (<code>Telnet.open/read_until/read_all/read_very_eager/write/close</code>)</li>
<li>ใน telnetlib ต้องส่ง <b>bytes</b>: <code>b'...'</code> และ <code>.encode('ascii')</code>; คำสั่งต้องลงท้ายด้วย <code>b'\\n'</code> (Enter)</li>
</ul>
<table>
<tr><th>เรื่อง</th><th>Compiled</th><th>Interpreted</th></tr>
<tr><td>ตัวอย่าง</td><td>C, C++, Go</td><td>Python, Perl</td></tr>
<tr><td>ขั้นตอน</td><td>compile แยกจากรัน</td><td>แปลซอร์สทุกครั้งที่รัน</td></tr>
<tr><td>ความเร็ว</td><td>สูงกว่า</td><td>ต่ำกว่า</td></tr>
<tr><td>Portability</td><td>ไฟล์ executable ผูก platform</td><td>รันได้เมื่อ platform มี interpreter</td></tr>
</table>`,
  sections: [
    {
      t: "18.1 Network Programming and Automation: ทำไมต้องมี",
      ref: "หน้า 547-548",
      html: `
<p>เครือข่ายเปลี่ยนเร็ว (cloud, AI, ความต้องการ connectivity ใหม่) องค์กรต้องการความสะดวก ยืดหยุ่น และ resilient network automation จึงจำเป็น เป้าหมายคือทำให้การ configure, manage, monitor, operate ง่ายและ deploy/O&amp;M มีประสิทธิภาพขึ้น</p>
<h4>สถานการณ์ O&amp;M ที่พบบ่อย</h4>
<ol>
<li><b>Device upgrade</b>: มีอุปกรณ์เป็นพัน ต้องอัปเกรดเป็นประจำและทีละมาก ๆ</li>
<li><b>Configuration audit</b>: เช่น ต้องเปิด STelnet ทุกเครื่อง และ Ethernet switch ทุกตัวต้องตั้ง Spanning Tree security ต้องหาเครื่องที่ไม่ผ่านให้เร็ว</li>
<li><b>Configuration change</b>: ตาม security requirement ต้องเปลี่ยน account/password ทุก 3 เดือน คือลบ account เก่าสร้างใหม่บนอุปกรณ์เป็นพัน</li>
</ol>
<p>วิธีดั้งเดิมคือวิศวกรล็อกอินทีละเครื่อง พิมพ์คำสั่ง แล้วดูผลด้วยตา ซึ่ง <b>พึ่ง "คน" มาก ใช้เวลานาน ไม่มีประสิทธิภาพ และกระบวนการไม่ถูก audit</b></p>
<h4>Network automation</h4>
<ul>
<li>ใช้เครื่องมือ deploy/operate/maintain อัตโนมัติ ลดการพึ่งคน; เครื่องมือ open-source: <b>Ansible, SaltStack, Puppet, Chef</b></li>
<li>ในแง่สร้างความสามารถของวิศวกร แนะนำให้มี <b>ทักษะเขียนโปรแกรมด้านเครือข่าย (network programming)</b></li>
<li><b>Network programming</b> (ความหมายกว้าง) = พัฒนาโปรแกรมรับ/ส่งข้อมูลผ่านเครือข่าย: ฝั่งส่ง assemble ข้อมูลตาม protocol, ฝั่งรับ parse ตาม protocol เพื่อดึงข้อมูล งานหลัก: <b>packet assembly, packet filtering, packet capture, packet analysis</b> และมีการประมวลผลปลายทาง ส่วนที่เกี่ยวข้อง 5 ด้าน: code, development tool, database, server setup, web design</li>
<li>Python เป็นทักษะหลัก เหมาะกับงานซ้ำ ๆ ใช้เวลา และเป็นรอบ</li>
</ul>
<h4>ตัวอย่าง automation ที่ง่ายที่สุด: push config</h4>
<figure><img src="i/p549_1.webp" alt="Python script ส่งไฟล์ configuration ไปยังอุปกรณ์ผ่าน SSH/Telnet" loading="lazy"><figcaption>Fig. 18.1 เขียน Python script ส่ง configuration ไปยังอุปกรณ์เพื่อ config อัตโนมัติ (ผ่าน SSH/Telnet)</figcaption></figure>
<ol>
<li>เขียน configuration file (เช่น <code>sysname SW1</code>, <code>vlan 10</code> + description)</li>
<li>เขียน Python ส่งไฟล์นั้นให้อุปกรณ์ผ่าน <b>Telnet/SSH</b></li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>เหตุผลของ automation: ลดการพึ่ง "คน" ที่ช้า ผิดพลาดง่าย ไม่มี audit</li>
<li>เครื่องมือ: Ansible, SaltStack, Puppet, Chef</li>
<li>บทนี้เน้น: เขียน config + Python push ผ่าน Telnet/SSH</li>
</ul></div>`
    },
    {
      t: "18.2 Overview of Programming Languages",
      ref: "หน้า 548-551",
      html: `
<p>ภาษาโปรแกรมผ่านหลายยุค: <b>machine language → assembly language → high-level language</b> Machine language คือรหัสไบนารีที่คอมพิวเตอร์เข้าใจตรง ๆ ยากต่อการอ่าน จึงมี assembly ที่ใช้ชื่อสั้น เช่น MOV, ADD ห่อหุ้มคำสั่ง hardware (ทั้งสองคือ <b>low-level</b>) ส่วน C, C++, Java, Python, Pascal, Lisp, Prolog, Fortran เป็น <b>high-level</b></p>
<p>มีเพียงโปรแกรมที่เขียนด้วย machine language ที่คอมพิวเตอร์เข้าใจและรันได้โดยตรง ภาษาอื่นต้องถูก "แปล" ด้วย language processor ก่อน</p>
<h4>Compiled vs Interpreted</h4>
<figure><img src="i/p549_2.webp" alt="เปรียบเทียบเส้นทาง compiled language กับ interpreted language" loading="lazy"><figcaption>Fig. 18.2-18.3 Compiled language ผ่าน compiler ได้ executable file ส่วน interpreted language ใช้ interpreter แปลซอร์สทีละบรรทัด แล้วรันบน OS และ CPU (x86/ARM)</figcaption></figure>
<table>
<tr><th>หัวข้อ</th><th>Compiled language</th><th>Interpreted language</th></tr>
<tr><td>ตัวอย่าง</td><td>C, C++, Go</td><td>Python, Perl</td></tr>
<tr><td>การทำงาน</td><td>compile ซอร์สเป็น binary machine language ก่อน (compiler, assembler, linker, loader) ผลเป็น .exe, .dll, .ocx; รันซ้ำไม่ต้อง compile ใหม่</td><td>ไม่ต้อง compile ล่วงหน้า แปลซอร์สเป็น machine code และรัน <b>ทุกครั้ง</b> ที่ execute ได้ถ้ามี interpreter</td></tr>
<tr><td>ประสิทธิภาพ</td><td>สูงกว่า</td><td>ต่ำกว่า</td></tr>
<tr><td>Portability</td><td>executable <b>เฉพาะ platform</b> ใช้ข้าม platform ไม่ได้</td><td>ข้าม platform ได้ ถ้า platform มี interpreter</td></tr>
</table>
<p><b>ลำดับของ compiled language</b>: source code → compiler/assembler (เป็น machine instruction) → linker (รวม library function) → ได้โปรแกรม machine language ที่ตรง instruction set ของ CPU → loader โหลดเข้า memory → CPU execute</p>
<p><b>ลำดับของ interpreted language (Python)</b>: ไฟล์ Python → interpreter แปลเป็น <b>byte code (.pyc)</b> → รันบน <b>Python virtual machine (PVM)</b></p>
<figure><img src="i/p550_1.webp" alt="Python source code, interpreter, .pyc byte code และ PVM" loading="lazy"><figcaption>Fig. 18.4 ขั้นตอนของ interpreted language: source → interpreter → .pyc (byte code) → PVM</figcaption></figure>
<h4>Computing technology stack และการรันโปรแกรม</h4>
<figure><img src="i/p551_1.webp" alt="computing technology stack และขั้นตอนการ compile จนเป็น machine code" loading="lazy"><figcaption>Fig. 18.5 (a) computing stack ตั้งแต่ Physics, Transistors, Gates/Registers, Micro Architecture, Instruction Set Architecture จนถึง Application; (b) program execution: high-level → assembly → machine code</figcaption></figure>
<ul>
<li>ชั้นล่างสุดคือ hardware: physics และ transistor สร้าง gate/register แล้วประกอบเป็น CPU micro architecture ซึ่ง <b>instruction set</b> เป็น <b>interface ระหว่าง hardware กับ software</b></li>
<li>แอปใช้คำสั่งใน instruction set สั่ง hardware ทำงาน แอปมักเขียนด้วยภาษา high-level (C, C++, Java, Go, Python)</li>
<li>ขั้นตอนรัน: high-level ถูก compile เป็น assembly → assembler แปลเป็น binary machine code ตาม instruction set ของ CPU โปรแกรมบนดิสก์คือกองของ machine code (คำสั่งและข้อมูล) หรือเรียกว่า binary file</li>
<li>ยิ่งขึ้นไปด้านบนยิ่งมี abstraction สูง (เข้าใจง่ายขึ้น) ยิ่งลงล่างยิ่งคลุมเครือ</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Compiled: C, C++, Go, เร็ว, ผูก platform; Interpreted: Python, Perl, ช้ากว่า, ข้าม platform ได้ถ้ามี interpreter</li>
<li>Python: .py → interpreter → .pyc → PVM (ไม่ใช่ compiled แบบ C)</li>
</ul></div>`
    },
    {
      t: "18.3.1-18.3.2 Python: คืออะไร และใช้งานด้านใด",
      ref: "หน้า 552-553",
      html: `
<p><b>Python</b> เป็น high-level, object-oriented, interpreted language ที่ Guido van Rossum (ชาวดัตช์) สร้างปี <b>1989</b> และออกเวอร์ชันสาธารณะครั้งแรกปี <b>1991</b></p>
<ul>
<li>เป็น free software ซอร์สโค้ดและ interpreter อยู่ภายใต้ <b>GPL</b></li>
<li>syntax สะอาดชัดเจน มีจุดเด่นคือ <b>บังคับให้ใช้ whitespace เป็นการ indent</b></li>
<li>มี library มาก จึงถูกเรียกว่า <b>glue language</b> (เชื่อมโมดูลภาษาอื่น โดยเฉพาะ C/C++): สร้าง prototype เร็ว แล้วเขียนส่วนที่ต้อง performance สูง (เช่น graphics rendering) ด้วย C/C++ แล้ว wrap ให้ Python เรียก (ต้องระวังเรื่อง platform เพราะบาง library ไม่ cross-platform)</li>
<li>แม้รันไฟล์ .py ด้วยคำสั่ง python ได้ตรง ๆ แต่จริง ๆ Python ไม่ได้ interpret ซอร์สโดยตรง: มัน compile เป็น <b>byte code (.pyc)</b> แล้ว <b>PVM</b> รัน byte code นั้น แนวคิดเดียวกับ Java และ .NET (PVM เป็น virtual machine ที่ "abstract" กว่า คือไกลจากเครื่องจริงกว่า)</li>
</ul>
<figure><img src="i/p550_1.webp" alt="ลำดับ source, interpreter, pyc, PVM" loading="lazy"><figcaption>ลำดับการรันซอร์ส Python (ใช้ภาพเดียวกับ Fig. 18.4): source → interpreter → .pyc → PVM</figcaption></figure>
<h4>5 ขั้นตอนการรันโปรแกรม Python</h4>
<ol>
<li>ติดตั้ง Python และ runtime บน OS</li>
<li>เขียน Python source code</li>
<li>interpreter รันและแปลซอร์สเป็นไฟล์ <code>.pyc</code> (byte code)</li>
<li>Python virtual machine แปล byte code เป็น machine language</li>
<li>hardware execute machine language</li>
</ol>
<h4>ขอบเขตการใช้งาน</h4>
<p>รันได้ในทฤษฎีบนทุก OS (Windows, Mac OS X, Linux) เรียนง่าย มี third-party library มาก ความเร็วดี งานหลัก: Linux/Unix O&amp;M, command-line program, GUI (PyQt, Kivy), Web (Django), Mobile App, server program (Socket), web crawler, data analysis, deep learning, scientific computing Mac OS X และ Linux มี Python interpreter ติดมากับ OS ทำให้วิศวกร O&amp;M นิยมใช้เขียน automation</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>Python: Guido van Rossum, 1989 (สาธารณะ 1991), GPL, glue language, ใช้ indent เป็น syntax</li>
<li>Python เป็น interpreted language และมี byte code (.pyc) รันบน PVM</li>
</ul></div>
<div class="note"><b>หมายเหตุ</b> ข้อสอบในบทถามว่า "Python is a compiled language" ถูกหรือไม่ คำตอบคือ <b>ผิด</b> (เป็น interpreted)</div>`
    },
    {
      t: "18.3.3 Python Code ทำงานอย่างไร: Interactive vs Scripted",
      ref: "หน้า 554",
      html: `
<p>Python รันโค้ดได้ 2 วิธี:</p>
<h4>1) Interactive mode (interactive programming)</h4>
<p>ไม่ต้องสร้างไฟล์ script พิมพ์คำสั่งที่ prompt ของ Python interpreter แล้วเห็นผลทันที (เช่นบน Windows พิมพ์ <code>python</code> ใน command prompt)</p>
<figure><img src="i/p554_1.webp" alt="ตัวอย่างพิมพ์ print และ a+b ใน Python interactive" loading="lazy"><figcaption>Fig. 18.7 Interactive programming: print("hello world") ได้ hello world; a = 1, b = 2, print(a+b) ได้ 3</figcaption></figure>
<pre><code>&gt;&gt;&gt; print("hello world")
hello world
&gt;&gt;&gt; a = 1
&gt;&gt;&gt; b = 2
&gt;&gt;&gt; print(a+b)
3</code></pre>
<p><code>print()</code> เป็น built-in function ที่แสดงค่าในวงเล็บ</p>
<h4>2) Scripted mode (scripted programming)</h4>
<p>เขียนโค้ดเป็นไฟล์ script ที่รันได้ใน interpreter หรือ IDE ต่าง ๆ เช่น IDLE, Atom, Visual Studio, PyCharm, Anaconda ขั้นตอน: เขียนด้วย Notepad → บันทึกและเปลี่ยนนามสกุลเป็น <b>.py</b> → รันไฟล์ด้วย Python interpreter</p>
<figure><img src="i/p554_2.webp" alt="ไฟล์ Demo.py และผลลัพธ์เมื่อรัน python demo.py" loading="lazy"><figcaption>Fig. 18.8 Scripted programming: เขียน Demo.py แล้วรัน <code>python demo.py</code> ได้ผล hello world และ 3</figcaption></figure>
<div class="must"><b>ต้องจำ</b><ul>
<li>Interactive = พิมพ์ทีละคำสั่งที่ prompt ไม่ต้องมีไฟล์; Scripted = เขียนไฟล์ .py แล้วสั่ง <code>python file.py</code></li>
</ul></div>`
    },
    {
      t: "18.3.4 Coding Specifications ของ Python",
      ref: "หน้า 555-557",
      html: `
<p>Coding specification คือกฎการตั้งชื่อ การ indent การแบ่งโค้ด/statement ฯลฯ ช่วยให้โค้ดอ่านง่ายและแก้ไขต่อได้</p>
<h4>1) Semicolon, blank line, parenthesis, space</h4>
<ul>
<li><b>Semicolon</b>: มีท้ายบรรทัดได้ แต่ไม่แนะนำให้ใช้คั่น statement ควรให้แต่ละ statement อยู่บรรทัดของตนเอง (ถ้ามีหลาย statement ในบรรทัดเดียวใช้ ; คั่นได้)</li>
<li><b>Blank line</b>: ใช้คั่นระหว่าง function หรือ block เพื่อให้อ่านง่าย</li>
<li><b>Parenthesis</b>: ใช้ต่อ statement ยาว และตัดวงเล็บที่ไม่จำเป็นออก</li>
<li><b>Space</b>: ไม่แนะนำให้ใส่ space ภายในวงเล็บ ส่วน space สองข้างของ operator ขึ้นกับความชอบ</li>
</ul>
<h4>2) Identifier naming</h4>
<p>Identifier ใช้ตั้งชื่อ constant, variable, function และ object อื่น ๆ ประกอบด้วย <b>ตัวอักษร ตัวเลข underscore แต่ห้ามขึ้นต้นด้วยตัวเลข</b> และ <b>case-sensitive</b> ถ้าผิดกฎ จะได้ <b>SyntaxError</b></p>
<figure><img src="i/p555_1.webp" alt="ตัวอย่าง identifier ที่ถูกและผิด เช่น 4_passwd" loading="lazy"><figcaption>Fig. 18.9 Identifier naming: User_ID และ User_id เป็นคนละตัวแปร; 4_passwd ผิดเพราะขึ้นต้นด้วยตัวเลข (ในรูปมีการพิมพ์ print ผิดเป็น pinrt เพื่อเน้นว่าสะกดผิดก็ error เช่นกัน)</figcaption></figure>
<table>
<tr><th>ตัวอย่าง</th><th>ผล</th></tr>
<tr><td><code>User_ID = 10</code>, <code>User_id = 20</code></td><td>ถูก และเป็น 2 ตัวแปรต่างกัน (case-sensitive)</td></tr>
<tr><td><code>User_Name = 'Richard'</code></td><td>ถูก (string)</td></tr>
<tr><td><code>Count = 1 + 1</code></td><td>ถูก</td></tr>
<tr><td><code>4_passwd = "Huawei"</code></td><td><b>SyntaxError</b> (ขึ้นต้นด้วยเลข)</td></tr>
</table>
<h4>3) Code indentation</h4>
<p>Conditional และ loop ใช้แนวคิด <b>code block</b> ซึ่งแยกด้วย <b>indentation + colon (:)</b> ถ้า block มี 2 statement ขึ้นไป ต้อง <b>indent เท่ากัน</b> แนะนำ <b>4 spaces</b> ถ้า indent ผิดจะเกิด <b>IndentationError</b></p>
<figure><img src="i/p556_1.webp" alt="ตัวอย่างโค้ด if else และ indentation ที่ถูกกับผิด" loading="lazy"><figcaption>Fig. 18.10 Code blocks and indentations: colon เริ่ม block ของ if/else, โค้ดใน block เดียวกัน indent เท่ากัน, บรรทัดสุดท้ายที่ indent ผิดทำให้ error</figcaption></figure>
<pre><code>n = 3
if n == 3:              # colon เริ่ม block ของ if
    print('n==3')
    print('n equals 3')
else:                   # colon เริ่ม block ของ else
    print('n equals other value')
    print('n is not equal to 3')
    print(n)
print('end of else code block')   # อยู่นอก block</code></pre>
<h4>4) Comments</h4>
<ul>
<li><b>Single-line</b>: ขึ้นต้นด้วย <code>#</code> จนจบบรรทัด (วางหลัง code ได้)</li>
<li><b>Multi-line</b>: ใส่ในคู่ triple quotes <code>'''...'''</code> หรือ <code>"""..."""</code></li>
</ul>
<figure><img src="i/p557_1.webp" alt="ตัวอย่าง comment แบบหลายบรรทัดและหลัง code" loading="lazy"><figcaption>Fig. 18.11 Comments: multi-line comment ด้วย triple quotes, comment ต่อท้ายบรรทัดและ comment line ด้วย #</figcaption></figure>
<h4>5) โครงสร้างไฟล์ซอร์ส</h4>
<p>ไฟล์ Python สมบูรณ์ประกอบด้วย: <b>interpreter declaration, encoding declaration, documentation string, module import, runtime code</b></p>
<figure><img src="i/p557_2.webp" alt="โครงสร้างไฟล์ซอร์ส Python" loading="lazy"><figcaption>Fig. 18.12 Structure of source code file: interpreter declaration, encoding declaration, docstring, import, runtime code</figcaption></figure>
<ul>
<li><b>Interpreter declaration</b> (<code>#!/usr/bin/env python</code>) ระบุ path ของ interpreter ที่ใช้รันไฟล์ (ละได้บน Windows)</li>
<li><b>Encoding declaration</b> (<code># -*- coding:utf-8 -*-</code>): Python 2 default = ASCII (ไม่รองรับภาษาจีน), Python 3 default = <b>UTF-8</b></li>
<li><b>Documentation string</b>: แนะนำหน้าที่ของโปรแกรมโดยรวม</li>
<li><b>Module import</b>: ใช้ <code>import</code> หรือ <code>from ... import</code> วางไว้ด้านบนของไฟล์หลัง docstring (เช่น <code>import time</code> ซึ่งเป็น built-in module ด้านเวลา)</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Identifier: ห้ามขึ้นต้นด้วยตัวเลข, case-sensitive, ผิด = SyntaxError</li>
<li>Indent ผิด = IndentationError; block ใช้ colon + indent; แนะนำ 4 spaces</li>
<li>Comment: # (บรรทัดเดียว), triple quotes (หลายบรรทัด)</li>
<li>Python 3 default UTF-8; Python 2 default ASCII</li>
</ul></div>
<div class="warn"><b>ระวัง</b> อย่าสับสน SyntaxError (ชื่อ/ไวยากรณ์ผิด) กับ IndentationError (ย่อหน้าไม่ตรงกัน) ข้อสอบมักถามแยกกัน</div>`
    },
    {
      t: "18.3.5 แนวคิดพื้นฐาน: Data Type, Function, Module, Class",
      ref: "หน้า 558-559",
      html: `
<h4>1) Data type</h4>
<p>ชนิดพื้นฐานสุด: <b>boolean (True/False), integer, floating-point, string</b> และ <b>ทุกอย่างใน Python เป็น object</b> (รวมถึง function และ program) ทำให้ภาษามีความเป็นเอกภาพสูง</p>
<h4>2) Function และ Module</h4>
<ul>
<li><b>Function</b>: ชุดโค้ดที่จัดระเบียบและใช้ซ้ำได้ เพิ่ม modularity และ code reuse ประกาศด้วย keyword <code>def</code></li>
<li><b>Module</b>: ไฟล์ Python ที่บันทึกไว้ ประกอบด้วย function หรือ class ต่างจากโปรแกรมทั่วไปเพียงจุดประสงค์ คือถูกเรียกโดยโปรแกรมอื่น จึงมักไม่มี main function</li>
</ul>
<figure><img src="i/p558_1.webp" alt="demo.py ประกาศ function sit และ test.py import demo" loading="lazy"><figcaption>Fig. 18.13 Functions and modules: demo.py นิยาม <code>def sit()</code> แล้วเรียก; test.py ทำ <code>import demo</code> และเรียก demo.sit() จึงเห็นข้อความสองครั้ง</figcaption></figure>
<pre><code># demo.py
def sit():
    print('A dog is now sitting')
sit()

# test.py
import demo
demo.sit()
# ผลลัพธ์: A dog is now sitting  (จาก sit() ท้าย demo.py ตอน import)
#          A dog is now sitting  (จาก demo.sit())</code></pre>
<p>สังเกตว่าเมื่อ <code>import demo</code> โค้ดระดับบนสุดของ demo.py ถูกรันด้วย (จึงพิมพ์ข้อความ 1 ครั้งตั้งแต่ตอน import) แล้วบรรทัด <code>demo.sit()</code> พิมพ์อีกครั้ง รวมเป็น 2 บรรทัดตามรูป</p>
<h4>3) Class และ Method</h4>
<p><b>Class</b> คือคำอธิบายของ collection ที่มี property และ method เหมือนกัน ประกาศด้วย <code>class</code> function ภายใน class ที่ถูก instantiate เรียกว่า <b>method</b> และตอนนิยาม method ต้องมี parameter <code>self</code> แทน instance ที่ถูกสร้าง</p>
<figure><img src="i/p558_2.webp" alt="class Dog, instance Richard และ method sit" loading="lazy"><figcaption>Fig. 18.14 Classes and methods: Richard = Dog(); type(Richard.sit) เป็น method, type(Dog.sit) เป็น function</figcaption></figure>
<pre><code>class Dog():
    def sit(self):
        print('A dog is now sitting')
Richard = Dog()                 # instantiate
print(type(Richard.sit))        # &lt;class 'method'&gt;
print(type(Dog.sit))            # &lt;class 'function'&gt;
Richard.sit()                   # A dog is now sitting</code></pre>
<div class="must"><b>ต้องจำ</b><ul>
<li>def = function, class = class, import = นำ module เข้ามา; module = ไฟล์ .py ที่ถูก import</li>
<li>method ต้องมี <code>self</code>; ทุกอย่างใน Python เป็น object</li>
</ul></div>`
    },
    {
      t: "18.4 จัดการอุปกรณ์เครือข่ายด้วย Python: Telnet และ telnetlib",
      ref: "หน้า 559-561",
      html: `
<h4>Telnet</h4>
<p>Telnet นิยาม <b>NVT (Network Virtual Terminal)</b> ซึ่งอธิบายรูปแบบมาตรฐานของข้อมูลและ command sequence บน Internet เพื่อซ่อนความต่างของ platform/OS (เช่น ตัวขึ้นบรรทัดใหม่ต่างกัน) Telnet แยก command ออกจากข้อมูลธรรมดาด้วย <b>escape sequence 2 byte</b>: byte แรกคือ <b>0xFF = IAC (Interpret As Command)</b> byte ที่สองคือรหัสคำสั่ง ใช้ remote config อุปกรณ์เช่น router/switch ของ Huawei ได้จาก Windows หรือ Linux (port มาตรฐาน <b>23</b>)</p>
<h4>telnetlib</h4>
<p>เป็น module ใน Python standard library มี class <code>telnetlib.Telnet</code></p>
<table>
<tr><th>Method</th><th>หน้าที่</th></tr>
<tr><td><code>Telnet.open(host, port=0[, timeout])</code></td><td>เชื่อมต่อ host; port default 23; timeout (วินาที) สำหรับ blocking operation</td></tr>
<tr><td><code>Telnet.read_until(expected, timeout=None)</code></td><td>อ่านจนเจอ byte string ที่ระบุ หรือหมดเวลา; ถ้าไม่เจอคืนเท่าที่มี (อาจว่าง); raise EOFError ถ้า connection ปิดและไม่มีข้อมูล</td></tr>
<tr><td><code>Telnet.read_all()</code></td><td>อ่านทุกอย่างจน EOF เป็น bytes; block จนกว่า connection ปิด</td></tr>
<tr><td><code>Telnet.read_very_eager()</code></td><td>อ่านทุกอย่างที่อ่านได้โดยไม่ block; raise EOFError ถ้าปิดและไม่มีข้อมูล</td></tr>
<tr><td><code>Telnet.write(buffer)</code></td><td>เขียน byte string ลง socket (เบิ้ล IAC); อาจ block; อาจ raise OSError</td></tr>
<tr><td><code>Telnet.close()</code></td><td>ปิด connection</td></tr>
</table>
<h4>กรณีศึกษา: จัดการ Huawei router ด้วย Telnet</h4>
<p>เป้าหมาย: เปลี่ยนชื่ออุปกรณ์ สร้าง VLAN และตั้ง IP ของ interface</p>
<p><b>ขั้นที่ 1</b> ตั้ง IP ที่ interface ของ router, <b>ขั้นที่ 2</b> เปิดให้ Telnet เข้ามาได้ (vty + password + privilege 15), <b>ขั้นที่ 3</b> ทดสอบ Telnet ด้วยมือจาก Windows เพื่อดู prompt, <b>ขั้นที่ 4</b> เขียน script</p>
<pre><code># ขั้นที่ 1-2 บน router
[Huawei]interface GigabitEthernet 0/0/0
[Huawei-GigabitEthernet0/0/0]ip address 192.168.80.99 24
[Huawei-GigabitEthernet0/0/0]quit
[Huawei]user-interface vty 0 4
[Huawei-ui-vty0-4]authentication-mode password
Please configure the login password (maximum length 16):huawei@123
[Huawei-ui-vty0-4]user privilege level 15
[Huawei-ui-vty0-4]quit</code></pre>
<pre><code>import telnetlib                       # นำเข้า module
host = '192.168.80.99'                 # IP ของอุปกรณ์
password = 'huawei@123'                # password ล็อกอิน
tn = telnetlib.Telnet(host)            # เชื่อมต่อด้วย Telnet
tn.read_until(b'Password:')            # อ่านจนเจอ prompt Password:
tn.write(password.encode('ascii') + b'\\n')   # ส่ง password + Enter

tn.read_until(b'&lt;Huawei&gt;')            # รอ prompt user view
tn.write(b'system-view' + b'\\n')       # เข้า system view
tn.read_until(b'[Huawei]')
tn.write(b'sysname R1' + b'\\n')        # เปลี่ยนชื่อเป็น R1
tn.read_until(b'[R1]')

tn.write(b'vlan 2' + b'\\n')            # สร้าง VLAN 2
tn.read_until(b'vlan2]')
tn.write(b'quit' + b'\\n')
tn.read_until(b'[R1]')

tn.write(b'interface GigabitEthernet 0/0/1' + b'\\n')
tn.read_until(b'1]')
tn.write(b'ip address 10.1.1.1 24' + b'\\n')
tn.read_until(b'1]')
tn.close()                             # ปิด connection</code></pre>
<ul>
<li>รูปแบบทำงานเป็นวงจร: <b>read_until(prompt) แล้ว write(command)</b> เพื่อรอ prompt ที่ถูกต้องก่อนส่งคำสั่งถัดไป</li>
<li><code>b'...'</code> แปลง string เป็น <b>bytes</b>; <code>encode('ascii')</code> แปลง string เป็น bytes ด้วย encoding ที่ระบุ ตามข้อกำหนดของ telnetlib (<code>decode()</code> ทำตรงข้าม)</li>
<li>ต้องเติม <code>b'\\n'</code> ท้ายคำสั่ง เทียบเท่ากับการกด Enter</li>
</ul>
<div class="must"><b>ต้องจำ</b><ul>
<li>Telnet port 23, IAC = 0xFF, escape sequence 2 byte</li>
<li>telnetlib ทำงานกับ <b>bytes</b> ไม่ใช่ str: ใช้ b'...' หรือ .encode()</li>
<li>วงจรอัตโนมัติ: read_until(prompt) → write(command + newline) → ... → close()</li>
</ul></div>
<div class="warn"><b>ระวัง</b> Telnet ส่งข้อมูล (รวม password) แบบ plain text ในงานจริงควรใช้ SSH/STelnet; และถ้า expected string ไม่ตรงกับ prompt จริง (เช่น ตัวพิมพ์เล็ก/ใหญ่ผิด) <code>read_until</code> จะรอจนหมดเวลาหรือค้างได้ถ้าไม่ตั้ง timeout</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `ทีม NOC ต้องเปลี่ยน password ของ account ผู้ดูแลบนอุปกรณ์ 3,000 เครื่องทุก 3 เดือน และต้องมี log ว่าทำกับเครื่องไหนสำเร็จหรือไม่ ปัจจุบันทำโดยล็อกอินทีละเครื่อง`,
      q: "แนวทางใดตรงกับหลักของบทนี้ที่สุด?",
      opts: [
        { t: "เขียน script (เช่น Python) วนทุกอุปกรณ์ ส่งคำสั่งผ่าน Telnet/SSH และบันทึกผลแต่ละเครื่อง", why: "ถูก: network automation ลดการพึ่งคน เร็ว ผิดพลาดน้อย และ audit ได้" },
        { t: "จ้างคนเพิ่มให้ล็อกอินทีละเครื่องพร้อมกัน", why: "ผิด: ยังเป็นวิธีที่พึ่ง 'คน' ช้า ผิดพลาดง่าย และไม่มี audit" },
        { t: "ใช้ SNMP Trap เพื่อให้อุปกรณ์เปลี่ยน password เอง", why: "ผิด: Trap เป็นการรายงาน event จาก agent ไม่ใช่การสั่ง config" },
        { t: "เปลี่ยนเฉพาะเครื่องที่ผู้ใช้ร้องเรียน", why: "ผิด: เป็นการตั้งรับ ไม่ตอบข้อกำหนดด้าน security ที่ต้องทำทุกเครื่องตามรอบ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `บริษัทพัฒนาเครื่องมือ monitor ด้วยภาษา Go แล้ว compile เป็นไฟล์ .exe บน Windows จากนั้นนำไปรันบน server Linux โดยตรงแต่รันไม่ได้ ขณะที่สคริปต์ Python ตัวอื่นรันได้ทั้งสอง OS`,
      q: "อธิบายความต่างนี้ได้อย่างไร?",
      opts: [
        { t: "Python มีความเร็วสูงกว่า Go จึงรันได้ทุก OS", why: "ผิด: compiled language ปกติเร็วกว่า และเหตุผลไม่เกี่ยวกับความเร็ว" },
        { t: "ไฟล์ executable จาก compiled language ผูกกับ platform (OS/CPU) ส่วน Python เป็น interpreted: รันได้ทุก platform ที่มี interpreter", why: "ถูก: ตามหลัก compiled กับ interpreted ในบท" },
        { t: "Linux ไม่รองรับภาษา Go", why: "ผิด: ปัญหาอยู่ที่ binary ที่ compile สำหรับ Windows" },
        { t: "Python เป็น compiled language ที่ compile ไว้ล่วงหน้าทุก platform", why: "ผิด: Python เป็น interpreted (แปลเป็น .pyc แล้วรันบน PVM)" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `วิศวกรรันคำสั่ง <code>python backup.py</code> เป็นครั้งแรก และต่อมาพบไฟล์ <code>backup.pyc</code> ปรากฏขึ้นในระบบ`,
      q: "ลำดับการทำงานของ Python ที่ถูกต้องคือข้อใด?",
      opts: [
        { t: "source (.py) → interpreter สร้าง byte code (.pyc) → PVM รันและแปลเป็น machine language → hardware", why: "ถูก: ตามขั้นตอน 5 ข้อของ Python (Fig. 18.4/18.6)" },
        { t: "source → compiler → linker → .exe → CPU", why: "ผิด: นี่คือเส้นทางของ compiled language อย่าง C/C++" },
        { t: "source → PVM → .pyc → interpreter", why: "ผิด: สลับลำดับ interpreter กับ PVM" },
        { t: "source ถูกส่งตรงให้ CPU เพราะ Python เป็น machine language", why: "ผิด: Python เป็น high-level language" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `นักศึกษาตั้งชื่อตัวแปรหลายแบบใน script ของตน`,
      q: "ชื่อ identifier ในข้อใดถูกต้องตามกฎของบท และไม่ทำให้เกิด SyntaxError?",
      opts: [
        { t: "2nd_router", why: "ผิด: ขึ้นต้นด้วยตัวเลข" },
        { t: "router_2", why: "ถูก: ประกอบด้วยตัวอักษร ตัวเลข underscore และไม่ได้ขึ้นต้นด้วยตัวเลข" },
        { t: "router name", why: "ผิด: มีช่องว่าง (ไม่ใช่ตัวอักษร ตัวเลข หรือ underscore)" },
        { t: "4_passwd", why: "ผิด: เป็นตัวอย่างในบทที่ขึ้นต้นด้วยตัวเลข จึงผิด" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `พิจารณาโค้ด:
<pre><code>User_ID = 10
User_id = 20
print(User_ID)
print(User_id)</code></pre>`,
      q: "ผลลัพธ์ที่ได้เป็นอย่างไร?",
      opts: [
        { t: "20 แล้ว 20 เพราะเป็นชื่อเดียวกัน", why: "ผิด: Python case-sensitive User_ID กับ User_id เป็นคนละตัว" },
        { t: "10 แล้ว 20", why: "ถูก: เป็น 2 ตัวแปรต่างกัน ค่าไม่ทับกัน" },
        { t: "SyntaxError เพราะชื่อซ้ำกัน", why: "ผิด: ไม่ซ้ำ เพราะตัวพิมพ์เล็ก/ใหญ่ต่างกัน และไม่ใช่ error" },
        { t: "10 แล้ว 10", why: "ผิด: User_id ถูกกำหนดเป็น 20" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `พิจารณาโค้ด:
<pre><code>n = 5
if n == 3:
    print('A')
else:
    print('B')
    print('C')
print('D')</code></pre>`,
      q: "ผลลัพธ์คือข้อใด?",
      opts: [
        { t: "A แล้ว D", why: "ผิด: n เป็น 5 ไม่ตรงเงื่อนไข n == 3" },
        { t: "B C D (สามบรรทัด)", why: "ถูก: เงื่อนไขเป็นเท็จ เข้า else พิมพ์ B และ C แล้ว print('D') อยู่นอก block จึงพิมพ์เสมอ" },
        { t: "B แล้ว D (C ไม่พิมพ์)", why: "ผิด: print('C') มี indent เท่ากับ print('B') จึงอยู่ใน else block เดียวกัน" },
        { t: "IndentationError", why: "ผิด: indent ของโค้ดนี้ถูกต้องทั้งหมด" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `วิศวกรรันโค้ดแล้วเจอ error:
<pre><code>a = "Python"
    print(a)</code></pre>`,
      q: "error ที่ได้คืออะไร และแก้อย่างไร?",
      opts: [
        { t: "SyntaxError; ต้องใส่ semicolon ท้ายบรรทัด", why: "ผิด: ปัญหาคือ indent ไม่ใช่ semicolon" },
        { t: "IndentationError; บรรทัดที่สองไม่ควร indent เพราะไม่ได้อยู่ใน code block (ลบ indent ออก)", why: "ถูก: ไม่มี colon เปิด block แต่มี indent เกิน จึงเป็น IndentationError" },
        { t: "NameError; ต้อง import module ก่อน", why: "ผิด: ไม่มีการเรียกใช้ module" },
        { t: "ไม่มี error; Python ให้ indent กี่ช่องก็ได้", why: "ผิด: indent เป็น syntax rule ของ Python" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `ไฟล์ <code>demo.py</code> มีเนื้อหา:
<pre><code>def sit():
    print('A dog is now sitting')
sit()</code></pre>
และไฟล์ <code>test.py</code> มีเนื้อหา:
<pre><code>import demo
demo.sit()</code></pre>
จากนั้นรัน <code>python test.py</code>`,
      q: "ผลลัพธ์คือกี่บรรทัด และเพราะเหตุใด?",
      opts: [
        { t: "1 บรรทัด เพราะ import ไม่รันโค้ดในไฟล์", why: "ผิด: import รันโค้ดระดับบนสุดของ demo.py ด้วย" },
        { t: "0 บรรทัด เพราะ function ยังไม่ถูกเรียกใน test.py", why: "ผิด: มีการเรียก demo.sit() และ sit() ท้าย demo.py" },
        { t: "2 บรรทัด: หนึ่งจาก sit() ท้าย demo.py ตอน import และหนึ่งจาก demo.sit()", why: "ถูก: ตรงกับ Fig. 18.13 ที่ผลลัพธ์มีสองบรรทัด" },
        { t: "2 บรรทัด และเกิด error เพราะ import ซ้ำ", why: "ผิด: ไม่มี error" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `พิจารณาโค้ด:
<pre><code>class Dog():
    def sit(self):
        print('A dog is now sitting')
Richard = Dog()
print(type(Richard.sit))
print(type(Dog.sit))
Richard.sit()</code></pre>`,
      q: "ผลลัพธ์คือข้อใด?",
      opts: [
        { t: "class 'function', class 'method', ตามด้วยข้อความ", why: "ผิด: ผ่าน instance (Richard.sit) เป็น method ส่วนผ่านตัว class (Dog.sit) เป็น function" },
        { t: "class 'method', class 'method', ตามด้วยข้อความ", why: "ผิด: Dog.sit ผ่าน class เป็น function" },
        { t: "class 'method', class 'function', ตามด้วย A dog is now sitting", why: "ถูก: ตรงกับ Fig. 18.14" },
        { t: "TypeError เพราะ sit ไม่มี argument", why: "ผิด: self ถูกส่งให้อัตโนมัติเมื่อเรียกผ่าน instance" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `สคริปต์ Telnet ของทีมค้างอยู่ที่บรรทัด <code>tn.read_until(b'password:')</code> ตลอดเวลา แม้เชื่อมต่อได้ และอุปกรณ์แสดง prompt เป็น <code>Password:</code> (P ตัวใหญ่) โดยไม่ได้ตั้ง timeout`,
      q: "สาเหตุที่เป็นไปได้มากที่สุดและวิธีแก้คืออะไร?",
      opts: [
        { t: "Telnet ใช้ port 22 ต้องเปลี่ยน port", why: "ผิด: Telnet ใช้ 23 และ session เชื่อมต่อได้อยู่แล้ว" },
        { t: "ข้อความที่รอ (b'password:') ไม่ตรงกับ prompt จริง (b'Password:') เพราะ byte string เป็น case-sensitive จึงรอไม่จบ ควรแก้ให้ตรงและตั้ง timeout", why: "ถูก: read_until รอจนเจอสตริงที่ระบุเป๊ะหรือหมดเวลา; ถ้าไม่ตั้ง timeout อาจดูเหมือนค้าง" },
        { t: "ต้องใช้ read_all() แทนเสมอ", why: "ผิด: read_all จะ block จนกว่า connection ปิด แย่ลงอีก" },
        { t: "ต้องส่ง IAC 0xFF ก่อนจึงจะแสดง prompt", why: "ผิด: IAC เป็น escape สำหรับ command ของ Telnet ไม่เกี่ยวกับ prompt นี้" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `สคริปต์ Telnet ล็อกอินสำเร็จ แต่คำสั่ง <code>tn.write(b'sysname R1')</code> ไม่มีผล และ <code>read_until(b'[R1]')</code> ไม่ผ่าน ทั้งที่ prompt ก่อนหน้าคือ <code>[Huawei]</code> อยู่แล้ว`,
      q: "บรรทัดใดน่าจะผิดและควรแก้อย่างไร?",
      opts: [
        { t: "ลืมต่อท้ายคำสั่งด้วยการขึ้นบรรทัดใหม่ ควรใช้ b'sysname R1' + b'\\n'", why: "ถูก: ต้องมี newline เทียบเท่ากับกด Enter อุปกรณ์จึงจะ execute คำสั่ง" },
        { t: "ควรเปลี่ยนเป็น tn.close() ก่อนส่งคำสั่ง", why: "ผิด: close จะตัด connection" },
        { t: "ต้องส่ง str โดยไม่ใช้ prefix b", why: "ผิด: telnetlib ต้องการ bytes" },
        { t: "ต้องเปลี่ยน read_until เป็น read_very_eager เสมอ", why: "ผิด: ไม่ได้เกี่ยวกับสาเหตุที่คำสั่งไม่ถูก execute" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `นักพัฒนาใหม่เขียน <code>tn.write('vlan 2' + '\\n')</code> บน Python 3 แล้วเกิด error ขึ้นในขณะที่ส่งคำสั่ง`,
      q: "สาเหตุหลักคือข้อใด?",
      opts: [
        { t: "ใช้ str แทน bytes; telnetlib ต้องการ byte string เช่น b'vlan 2' + b'\\n' หรือ 'vlan 2\\n'.encode('ascii')", why: "ถูก: ต้องแปลงเป็น bytes ตามข้อกำหนดของ telnetlib" },
        { t: "VLAN 2 ไม่มีอยู่จริง", why: "ผิด: error เกิดจากชนิดข้อมูลที่ส่ง ไม่ใช่ชื่อ VLAN" },
        { t: "ต้องใช้ semicolon ท้ายบรรทัด", why: "ผิด: ไม่ใช่ข้อกำหนดของ Python" },
        { t: "ต้อง import time ก่อนทุกครั้ง", why: "ผิด: ไม่เกี่ยวข้อง" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ดูแลต้องการตรวจ audit ว่าอุปกรณ์ทุกเครื่องเปิดใช้ STelnet แล้วหรือไม่ และพบว่า Telnet ส่ง password เป็น plain text`,
      q: "ข้อสรุปที่เหมาะสมที่สุดคืออะไร?",
      opts: [
        { t: "ใช้ Python ทำ audit อัตโนมัติ (วนเช็ค config ทุกเครื่อง) และในงานจริงควรใช้ SSH/STelnet แทน Telnet เพื่อความปลอดภัย", why: "ถูก: audit เป็นงานซ้ำที่ automation เหมาะ และ Telnet ไม่เข้ารหัส" },
        { t: "ทำ audit ด้วยตาทีละเครื่องจะแม่นยำกว่า", why: "ผิด: ช้า ผิดพลาดง่าย และไม่มี audit trail" },
        { t: "ปล่อยให้ใช้ Telnet ต่อ เพราะ telnetlib เข้ารหัสให้อัตโนมัติ", why: "ผิด: telnetlib/Telnet ไม่ได้เข้ารหัส" },
        { t: "ปิดการเข้าถึงอุปกรณ์ทั้งหมดและหยุดใช้ automation", why: "ผิด: ไม่แก้ปัญหา" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ทีมกำลังเลือกภาษาสำหรับสร้างเครื่องมือภายใน`,
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับ compiled และ interpreted language",
      opts: [
        { t: "C, C++ และ Go เป็น compiled language", ok: true, why: "ถูก" },
        { t: "Python และ Perl เป็น interpreted language", ok: true, why: "ถูก" },
        { t: "executable ของ compiled language ใช้ข้าม platform ได้โดยไม่ต้อง compile ใหม่", ok: false, why: "ผิด: ผูกกับ platform" },
        { t: "Interpreted language แปลซอร์สทุกครั้งที่รัน จึงมักช้ากว่า", ok: true, why: "ถูก" },
        { t: "Python compile เป็น byte code (.pyc) ก่อนแล้ว PVM จึงรัน", ok: true, why: "ถูก" }
      ]
    },
    {
      type: "multi",
      story: `ตรวจสอบความเข้าใจเรื่อง coding specification ของ Python`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Comment หลายบรรทัดใช้คู่ triple quotes ได้", ok: true, why: "ถูก: ''' ... ''' หรือ \"\"\" ... \"\"\"" },
        { t: "Comment บรรทัดเดียวขึ้นต้นด้วย # และยาวถึงท้ายบรรทัด", ok: true, why: "ถูก" },
        { t: "Python ใช้ { } แยก code block", ok: false, why: "ผิด: ใช้ colon และ indentation" },
        { t: "Python 3 รองรับ UTF-8 เป็น default ส่วน Python 2 default เป็น ASCII", ok: true, why: "ถูก" },
        { t: "คำสั่ง import ควรวางไว้ด้านบนของไฟล์หลัง docstring", ok: true, why: "ถูก" }
      ]
    },
    {
      type: "blank",
      story: `สรุปหลักการ indentation ของ Python`,
      text: `Python ใช้เครื่องหมาย {1} และการ {2} เพื่อแยก code block โดย statement ใน block เดียวกันต้องมีระยะ indent {3} และแนะนำให้ใช้ 4 spaces ถ้าผิดจะได้ IndentationError`,
      blanks: [
        { opts: ["colon (:)", "semicolon (;)", "curly brace", "hash (#)"], ans: 0, why: "colon เริ่ม block ของ if/else/loop" },
        { opts: ["indent", "comment", "import", "encode"], ans: 0, why: "indentation ใช้แยกระดับของโค้ด" },
        { opts: ["เท่ากัน", "ต่างกัน", "เป็นศูนย์", "สลับกัน"], ans: 0, why: "ใน block เดียวกันต้อง indent เท่ากัน" }
      ]
    },
    {
      type: "blank",
      story: `ตรวจสอบเรื่อง telnetlib`,
      text: `ใน telnetlib ใช้ method {1} เพื่ออ่านจนเจอ prompt ที่คาดไว้ ใช้ {2} เพื่อส่งคำสั่ง และต้องส่งข้อมูลเป็นชนิด {3}`,
      blanks: [
        { opts: ["read_until", "read_all", "close", "open"], ans: 0, why: "read_until รอจนเจอ byte string ที่ระบุหรือหมดเวลา" },
        { opts: ["write", "read_very_eager", "close", "read_until"], ans: 0, why: "write เขียน byte string ลง socket" },
        { opts: ["bytes (เช่น b'...')", "str ปกติ", "float", "boolean"], ans: 0, why: "telnetlib ต้องการ bytes จึงใช้ prefix b หรือ encode()" }
      ]
    },
    {
      type: "match",
      q: "จับคู่แนวคิดกับความหมาย",
      pairs: [
        ["IndentationError", "เกิดเมื่อ indent ของ code block ไม่ถูกต้อง"],
        ["SyntaxError", "เกิดเมื่อ identifier หรือไวยากรณ์ผิด เช่น ขึ้นต้นด้วยตัวเลข"],
        ["PVM", "Python virtual machine ที่รัน byte code (.pyc)"],
        ["IAC (0xFF)", "byte แรกของ Telnet escape sequence ที่บอกว่า byte ถัดไปเป็นคำสั่ง"],
        ["Module", "ไฟล์ .py ที่ถูก import เพื่อนำ function/class มาใช้"]
      ],
      why: "ทั้งห้าเป็นศัพท์หลักที่ปรากฏในบท Python และ Telnet"
    }
  ]
});
