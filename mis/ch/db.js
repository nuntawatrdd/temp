IOT.reg({
  id: "db",
  title: "ฐานข้อมูลและการจัดการสารสนเทศ (Databases and Information Management)",
  th: "จาก File Processing System สู่ Database, DBMS, Relational DBMS, NoSQL, Data Warehouse และ Data Mart",
  summary: `
<h4>1) File Processing System (ระบบแฟ้มข้อมูลแบบดั้งเดิม)</h4>
<ul>
<li>ข้อมูลเก็บในไฟล์คอมพิวเตอร์แยกกัน แต่ละแผนกดูแลไฟล์ของตัวเอง → เกิด <b>data redundancy</b>, ไฟล์เป็นอิสระต่อกัน</li>
<li><b>6 ข้อเสีย:</b> (1) Data redundancy ข้อมูลซ้ำซ้อน (2) Data inconsistency ข้อมูลไม่สอดคล้องกัน (3) Lack of data sharing ใช้ข้อมูลร่วมกันไม่ได้ (4) Lack of program-data independence (5) Poor security (6) Lack of flexibility</li>
</ul>
<h4>2) Database approach &amp; DBMS</h4>
<ul>
<li><b>Database approach</b> = ฐานข้อมูลเดียวให้บริการหลายแอปพลิเคชัน รวมศูนย์ข้อมูลและควบคุมความซ้ำซ้อน</li>
<li><b>DBMS</b> = ซอฟต์แวร์ที่ให้ (1) Create database + define structure (2) Process database (3) Administer database และเป็น interface ระหว่างแอปกับฐานข้อมูล</li>
<li>DBMS แก้ปัญหา: ควบคุม redundancy, กำจัด inconsistency, กำจัด program-data dependency, จัดการข้อมูล/ความปลอดภัยแบบรวมศูนย์, สนับสนุน data sharing, เพิ่ม flexibility</li>
<li>ตัวอย่าง DBMS: Access, DB2, MySQL, Oracle Database, SQL Server (ฯลฯ)</li>
</ul>
<h4>3) หน้าที่ของ DBMS</h4>
<ul>
<li><b>Create:</b> เก็บ <b>Metadata / Data Dictionary</b> (ชื่อฟิลด์ ชนิดข้อมูล คำอธิบาย ความสัมพันธ์)</li>
<li><b>Process:</b> Read, Insert, Update (Modify), Delete</li>
<li><b>SQL</b> (Structured Query Language): มาตรฐานสากล ใช้ใน Relational DBMS — <b>DDL</b> (CREATE, ALTER, DROP) กำหนดโครงสร้าง / <b>DML</b> (INSERT, UPDATE, DELETE, SELECT) จัดการข้อมูล</li>
<li><b>Multiple views:</b> ข้อมูลอยู่ฐานเดียว แต่แสดงแต่ละกลุ่มผู้ใช้ต่างกัน (Benefits view, Payroll view)</li>
<li><b>Administer:</b> จัดการ security &amp; user access, control user permissions, backup &amp; maintain</li>
</ul>
<h4>4) Relational DBMS</h4>
<ul>
<li>เก็บข้อมูลเป็นตารางสองมิติ เรียก <b>relations</b>; ตาราง = Entity, คอลัมน์ = Attribute</li>
<li><b>Relational database = Tables + Relationships + Metadata</b></li>
<li><b>Row = Record = Tuple</b>, <b>Column = Field = Attribute</b></li>
<li><b>Primary Key:</b> ระบุแต่ละ record แบบไม่ซ้ำ และห้ามเป็น NULL / <b>Foreign Key:</b> ฟิลด์ที่อ้างอิง Primary Key ของอีกตาราง</li>
<li>ตัวอย่าง: SUPPLIER (PK = Supplier_Number) กับ PART (PK = Part_Number, FK = Supplier_Number)</li>
<li><b>ER Diagram</b>: Entities (สิ่งที่ต้องติดตาม), Attributes (คุณลักษณะ), Relationship (ความสัมพันธ์) เช่น SUPPLIER–PART–LINE_ITEM–ORDER</li>
</ul>
<h4>5) Nontraditional DBMS</h4>
<ul>
<li>Relational ไม่เหมาะเสมอสำหรับข้อมูลขนาดใหญ่ unstructured/semi-structured (เอกสาร ภาพ เสียง วิดีโอ)</li>
<li><b>NoSQL (Non-Relational)</b>: flexible data model, distributed, horizontal scalability — เช่น MongoDB, Cassandra, Amazon DynamoDB</li>
</ul>
<h4>6) วิวัฒนาการการจัดการข้อมูลในองค์กร</h4>
<p>กระดาษ → แฟ้มข้อมูล (File) → ฐานข้อมูล (Database) → คลังข้อมูล (Data Warehouse) → มาร์ทข้อมูล (Data Marts)</p>
<h4>7) Data Warehouse (DW)</h4>
<ul>
<li>นิยาม (W.H. Inmon): <b>subject-oriented, integrated, time-varying, non-volatile</b> collection of data สนับสนุนการตัดสินใจของผู้บริหาร</li>
<li>Subject oriented = จัดตามหัวข้อธุรกิจ (ลูกค้า การขาย สินค้า) / Integrated = รวมหลายแหล่งและทำให้เป็นมาตรฐานเดียว (M,F) / Time-variant = มีมิติเวลา เก็บย้อนหลังหลายปี (5–10 ปี) / Non-volatile = โหลดและอ่านอย่างเดียว ไม่แก้ทับข้อมูลเดิม</li>
<li>ที่มาของข้อมูล: Internal (Operational, Customer, Manufacturing, Historical) + External → <b>Extract and Transform</b> → Data Warehouse → Data Access &amp; Analysis (Queries/reports, <b>OLAP</b>, Data mining)</li>
</ul>
<h4>8) Data Mart &amp; แนวทางสร้าง DW</h4>
<ul>
<li><b>Data Mart</b> = DW ขนาดเล็กสำหรับ SBU หรือแผนก (Sales, Marketing, Finance, HR); DW ครอบคลุมทั้งองค์กร (Enterprise-wide)</li>
<li>DW ใหญ่กว่า สร้างนาน (เป็นปี) / Data Mart เล็ก สร้างเสร็จในไม่กี่เดือน</li>
<li>3 แนวทาง: <b>Enterprise DW</b> (ข้อมูลภายใน+ภายนอก → คลังกลาง) / <b>Dependent Data Mart</b> (สร้างจาก DW กลางอีกที) / <b>Independent Data Mart</b> (ดึงจากแหล่งข้อมูลตรง ไม่ผ่าน DW กลาง)</li>
</ul>
<h4>9) BI และ OLAP</h4>
<p>อยู่ในหัวข้อ Outline: BI = การนำข้อมูลจาก DW มาวิเคราะห์เพื่อตัดสินใจ, OLAP = การวิเคราะห์ข้อมูลหลายมิติ (ปรากฏในช่อง Data Access and Analysis ของแผนภาพ DW)</p>
`,
  sections: [
    {
      t: "File Processing System คืออะไร",
      ref: "สไลด์ 3",
      html: `
<h4>นิยาม</h4>
<p><b>File Processing System</b> (ระบบแฟ้มข้อมูล) คือระบบคอมพิวเตอร์ที่ข้อมูลถูกเก็บและจัดการอยู่ใน <b>ไฟล์คอมพิวเตอร์หลายไฟล์ที่แยกกัน</b></p>
<ul>
<li>ในอดีต องค์กรจำนวนมากใช้ระบบนี้เก็บและจัดการข้อมูลอย่างแพร่หลาย</li>
<li>แต่ละแผนกดูแลไฟล์ของตัวเอง ส่งผลให้เกิด <b>data redundancy</b> (ข้อมูลซ้ำซ้อน)</li>
<li>ไฟล์ข้อมูลเป็นอิสระต่อกัน (Data files are independent of one another) ไม่เชื่อมโยงกัน</li>
<li>จึงมี <b>จุดอ่อน</b> เมื่อใช้จัดระเบียบข้อมูลในองค์กรขนาดใหญ่ (รายละเอียดในหัวข้อถัดไป)</li>
</ul>
<h4>ตัวอย่างในสไลด์: ระบบสารสนเทศของมหาวิทยาลัย</h4>
<p>มี 2 ไฟล์ คือ <b>Schedule of Classes File</b> (Semester Code, Class Code, Class Section, Days, Times, Location, Current Enrollment, Maximum Enrollment และข้อมูลอาจารย์ Instructor ID, First Name, Last Name, Extension, Office, Web Address) กับ <b>Instructor File</b> (Instructor ID, First Name, Last Name, Extension, Office, Web Address)</p>
<p>จะเห็นว่า <b>ข้อมูลอาจารย์ถูกเก็บซ้ำในสองไฟล์</b> (ลูกศรสีแดงเขียนว่า duplicated data) นี่คือตัวอย่างของความซ้ำซ้อน ถ้าอาจารย์เปลี่ยนเบอร์ต่อ ต้องไล่แก้ทั้งสองไฟล์</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>File processing = เก็บข้อมูลในหลายไฟล์ แยกตามแผนก/แอปพลิเคชัน</li>
<li>ผลโดยตรง: data redundancy และไฟล์ไม่เชื่อมกัน</li>
</ul></div>`
    },
    {
      t: "Traditional File Processing Systems (แผนภาพ)",
      ref: "สไลด์ 4",
      html: `
<h4>แผนภาพในสไลด์</h4>
<p>แสดง 4 แผนก ได้แก่ <b>Accounting and Finance, Human Resources, Sales and Marketing, Manufacturing</b> แต่ละแผนกมี Users ของตน ใช้ <b>Application program</b> ของตน (Application program 1–4) และแต่ละโปรแกรมอ่าน/เขียนไฟล์ข้อมูลของตัวเอง (Derivative files)</p>
<ul>
<li>ที่มุมบนมี <b>Master file</b> = Data elements A ถึง Z (ข้อมูลทั้งหมดที่องค์กรมี)</li>
<li>แต่ละแผนกถือ <b>derivative files</b> คนละชุด เช่น Accounting ใช้ A, B, C, D / HR ใช้ A, B, D, E / Sales ใช้ A, B, E, G / Manufacturing ใช้ A, E, F, G</li>
<li>จะเห็นว่า data element เดียวกัน (เช่น A, B) ถูกเก็บซ้ำในหลายแผนก</li>
</ul>
<h4>สรุปภาษาไทยในสไลด์</h4>
<p>แนวทางดั้งเดิมในการประมวลผลแฟ้มข้อมูลมักทำให้แต่ละฝ่ายพัฒนาแอปพลิเคชันและจัดเก็บข้อมูลในไฟล์ของตนเอง โดยแต่ละแอปอาจใช้ไฟล์ข้อมูลที่แตกต่างกัน ส่งผลให้เกิดปัญหา คือ</p>
<ul>
<li>ข้อมูลซ้ำซ้อน</li>
<li>ข้อมูลไม่สอดคล้องกัน</li>
<li>การแชร์ข้อมูลระหว่างฝ่ายทำได้ยาก</li>
<li>สิ้นเปลืองทรัพยากรในการจัดเก็บข้อมูล</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> ลองนึกถึงบริษัทที่ฝ่ายขายและฝ่ายบัญชีต่างมีรายชื่อลูกค้าของตัวเอง คนละไฟล์ คนละโปรแกรม นั่นคือภาพของ file processing system</div>`
    },
    {
      t: "ข้อเสียของ File Processing System (6 ข้อ)",
      ref: "สไลด์ 5-6",
      html: `
<p>ปัญหาของสภาพแวดล้อมแฟ้มข้อมูลแบบดั้งเดิม (ไฟล์ถูกดูแลแยกกันโดยแต่ละแผนก) มี 6 ข้อ</p>
<ol>
<li><b>Data redundancy (ความซ้ำซ้อนของข้อมูล)</b> — ข้อมูลเดียวกันถูกเก็บไว้ในหลายแฟ้ม ทำให้เก็บซ้ำซ้อน สิ้นเปลืองที่ และดูแลให้ถูกต้องตรงกันได้ยากขึ้น</li>
<li><b>Data inconsistency (ความไม่สอดคล้องกันของข้อมูล)</b> — ข้อมูลชุดเดียวกันที่เก็บหลายแห่งอาจมีค่าไม่ตรงกัน ทำให้ไม่ทราบว่าชุดใดถูกต้องหรือเป็นปัจจุบัน (เช่น ที่อยู่ลูกค้าในไฟล์ขายกับไฟล์บัญชีไม่ตรงกัน)</li>
<li><b>Lack of data sharing (ไม่สามารถใช้ข้อมูลร่วมกันได้)</b> — ข้อมูลถูกเก็บแยกกัน แต่ละส่วนงานเก็บของตนเอง ทำให้เข้าถึงและใช้ข้อมูลร่วมกันระหว่างส่วนงานได้ยาก</li>
<li><b>Lack of program-data independence (ขาดความเป็นอิสระระหว่างข้อมูลและโปรแกรม)</b> — โปรแกรมผูกติดกับโครงสร้างและรูปแบบของไฟล์ข้อมูล ถ้าเปลี่ยนโครงสร้างข้อมูลหรือวิธีจัดเก็บ ต้องตามแก้โปรแกรมต่างๆ ที่เกี่ยวข้อง ก่อให้เกิดค่าใช้จ่ายในการบำรุงรักษาโปรแกรมสูง</li>
<li><b>Poor security (ข้อจำกัดในการควบคุมความปลอดภัย)</b> — โปรแกรมที่ใช้แฟ้มแบบดั้งเดิมต้องจัดการสิทธิ์การเข้าถึงข้อมูลแยกในแต่ละโปรแกรมหรือไฟล์ ทำให้การกำหนดและดูแลสิทธิ์ผู้ใช้ซับซ้อน และมีขอบเขตการควบคุมความปลอดภัยค่อนข้างจำกัด</li>
<li><b>Lack of flexibility (ขาดความคล่องตัว)</b> — รองรับความต้องการใหม่ๆ ได้จำกัด เพราะโครงสร้างไฟล์และโปรแกรมออกแบบสำหรับงานเฉพาะ การเพิ่มหรือเปลี่ยนความต้องการต้องแก้โปรแกรมที่เกี่ยวข้อง</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลำดับ 6 ข้อ: Redundancy → Inconsistency → Lack of sharing → Lack of program-data independence → Poor security → Lack of flexibility</li>
<li>Inconsistency เป็น <b>ผลที่ตามมา</b> จาก redundancy</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Redundancy = ข้อมูลซ้ำ (ปัญหาเรื่องการเก็บ) ส่วน Inconsistency = ข้อมูลซ้ำแล้วค่าไม่ตรงกัน (ปัญหาเรื่องความถูกต้อง) อย่าสับสน</div>`
    },
    {
      t: "Database Approach และเปรียบเทียบกับ File Processing",
      ref: "สไลด์ 7-8",
      html: `
<h4>Traditional vs Database approach</h4>
<ul>
<li><b>Traditional file processing system</b>: เก็บข้อมูลไว้ในแฟ้มแยกสำหรับแต่ละ application (ภาพซ้ำจากสไลด์ 4)</li>
<li><b>Database approach</b>: <b>ฐานข้อมูลเดียวให้บริการหลายแอปพลิเคชัน</b> (A single database services multiple applications) คือเก็บรวบรวมข้อมูลอย่างมีระเบียบเพื่อให้บริการหลายๆ แอปพลิเคชัน โดยรวมศูนย์ข้อมูลและควบคุมข้อมูลที่ซ้ำซ้อน</li>
</ul>
<div class="dg"><div class="dgt">🖼️ Database approach: หลายระบบใช้ DBMS และฐานข้อมูลเดียว</div>
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="20" width="130" height="40"/><text class="t" x="75" y="45" text-anchor="middle">Payroll system</text>
<rect class="bx" x="10" y="90" width="130" height="40"/><text class="t" x="75" y="115" text-anchor="middle">Post-sale system</text>
<rect class="bx" x="10" y="160" width="130" height="40"/><text class="t" x="75" y="185" text-anchor="middle">Inventory system</text>
<line class="ln" x1="140" y1="40" x2="280" y2="95"/>
<line class="ln" x1="140" y1="110" x2="280" y2="110"/>
<line class="ln" x1="140" y1="180" x2="280" y2="125"/>
<rect class="bx hd" x="280" y="80" width="120" height="60"/><text class="t b" x="340" y="116" text-anchor="middle">DBMS</text>
<line class="ln ok" x1="400" y1="110" x2="470" y2="110"/>
<rect class="bx ok" x="470" y="75" width="130" height="70"/><text class="t b" x="535" y="115" text-anchor="middle">Database</text>
<text class="t sm" x="75" y="12" text-anchor="middle">Payroll slip / Report / Invoice ออกจากแต่ละระบบ</text>
</svg></div>
<p>แต่ละระบบ (Payroll system, Post-sale system, Inventory System) ออกเอกสาร เช่น Payroll slip, Report, Invoice แต่ทุกระบบติดต่อฐานข้อมูลผ่าน <b>DBMS</b> ตัวเดียว</p>
<h4>File Processing VS. Database (ตัวอย่างมหาวิทยาลัย)</h4>
<table>
<tr><th></th><th>File Processing</th><th>Database</th></tr>
<tr><td>Schedule of Classes</td><td>เก็บทั้ง Instructor ID, First Name, Last Name, Extension, Office, Web Address ในไฟล์ตารางสอน</td><td>เก็บแค่ <b>Instructor ID</b> ในตารางสอน</td></tr>
<tr><td>Instructor</td><td>เก็บรายละเอียดอาจารย์อีกชุด → ข้อมูลซ้ำทั้งหมด (duplicated data)</td><td>เก็บรายละเอียดอาจารย์ครบที่นี่ที่เดียว</td></tr>
<tr><td>ข้อมูลที่ซ้ำ</td><td>ซ้ำทุกฟิลด์ของอาจารย์</td><td>ซ้ำเฉพาะ <b>Instructor ID</b> (only Instructor ID is duplicated)</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ</b> ในแนวทางฐานข้อมูล ยังมีการซ้ำอยู่ 1 ฟิลด์ (Instructor ID) เพราะใช้เชื่อมความสัมพันธ์ระหว่างตาราง ซึ่งคือ key นั่นเอง ถ้ารายละเอียดอาจารย์เปลี่ยน แก้ที่เดียวพอ</div>`
    },
    {
      t: "Database Management System (DBMS) และตัวอย่างผลิตภัณฑ์",
      ref: "สไลด์ 9-10",
      html: `
<h4>DBMS คือ</h4>
<p>ซอฟต์แวร์ที่ช่วยให้คุณสามารถ</p>
<ol>
<li><b>Create</b> the database and define its structures (สร้างฐานข้อมูลและกำหนดโครงสร้าง)</li>
<li><b>Process</b> the database (ประมวลผล/จัดการข้อมูล)</li>
<li><b>Administer</b> the database (บริหารจัดการฐานข้อมูล)</li>
</ol>
<ul>
<li>เป็น <b>interface ระหว่างแอปพลิเคชันกับฐานข้อมูล</b></li>
<li>DBMS ช่วยอำนวยความสะดวกในการสร้าง ปรับปรุง แก้ไข และเข้าถึงข้อมูล โดยผู้ใช้และแอปพลิเคชันไม่ต้องจัดการรายละเอียดของการจัดเก็บข้อมูลทางกายภาพโดยตรง ต่างจากระบบแฟ้มข้อมูลแบบดั้งเดิมที่โปรแกรมต้องจัดการรายละเอียดของไฟล์และการเข้าถึงข้อมูลเอง</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>3 หน้าที่ของ DBMS: <b>Create, Process, Administer</b></li>
<li>DBMS = interface ระหว่าง application กับ database</li>
</ul></div>
<h4>ตัวอย่าง Database Management Systems (ตารางในสไลด์)</h4>
<p>ตารางแสดงชื่อผลิตภัณฑ์ ผู้ผลิต และชนิดคอมพิวเตอร์ที่ใช้ได้ ตัวที่สไลด์เน้นกรอบไว้คือ 5 ตัวหลัก</p>
<table>
<tr><th>Database</th><th>Manufacturer</th><th>Computer Type</th></tr>
<tr><td><b>Access</b></td><td>Microsoft Corporation</td><td>Personal computer, server, mobile devices</td></tr>
<tr><td><b>DB2</b></td><td>IBM Corporation</td><td>Personal computer, server, mainframe</td></tr>
<tr><td><b>MySQL</b></td><td>Oracle Corporation</td><td>Personal computer, server</td></tr>
<tr><td><b>Oracle Database</b></td><td>Oracle Corporation</td><td>Personal computer, server, mainframe, mobile devices</td></tr>
<tr><td><b>SQL Server</b></td><td>Microsoft Corporation</td><td>Server, personal computer</td></tr>
</table>
<p>ตัวอื่นในตาราง (ไม่ได้เน้น): Adabas (Software AG; server, mainframe), D3 (Raining Data), Essbase (Oracle), FastObjects (Versant), FileMaker (FileMaker, Inc.), GemFire (GemStone Systems; server), Informix (IBM), Ingres (Ingres Corp.), InterBaseSMP (Embarcadero), KE Texpress (KE Software), ObjectStore (Progress Software), SQL Server Compact Edition (Microsoft; mobile devices), Sybase (Sybase Inc.), Teradata Database (Teradata; server), Versant (Versant), Visual FoxPro (Microsoft)</p>
<div class="note"><b>💡 หมายเหตุ</b> จำคู่ผู้ผลิตที่สำคัญ: Access / SQL Server = Microsoft, DB2 = IBM, MySQL / Oracle Database = Oracle</div>`
    },
    {
      t: "DBMS แก้ปัญหาของ File Environment อย่างไร",
      ref: "สไลด์ 11-12",
      html: `
<p>DBMS (ระบบจัดการฐานข้อมูล) <b>แก้ปัญหาสภาพแวดล้อมของแฟ้มข้อมูลแบบดั้งเดิม</b> (Solves problems of traditional file environment) ดังนี้</p>
<table>
<tr><th>ประโยชน์ของ DBMS</th><th>อธิบาย</th></tr>
<tr><td><b>Controls redundancy</b></td><td>ควบคุมและลดความซ้ำซ้อน โดยลดการเก็บข้อมูลเดียวกันซ้ำในหลายแฟ้มข้อมูลหรือหลายตาราง</td></tr>
<tr><td><b>Eliminates inconsistency</b></td><td>กำจัดความไม่สอดคล้องกัน เป็นผลจากการควบคุมความซ้ำซ้อน จึงลดความเสี่ยงข้อมูลที่ไม่ถูกต้อง DBMS จัดการข้อมูลจากฐานกลาง เมื่อมีการปรับปรุง การเปลี่ยนแปลงจะถูกบันทึกอย่างเป็นระบบ และผู้ใช้/โปรแกรมที่เข้าถึงข้อมูลเดียวกันจะได้ข้อมูลที่ปรับปรุงแล้ว</td></tr>
<tr><td><b>Eliminate the program-data dependency</b></td><td>กำจัดความไม่เป็นอิสระระหว่างข้อมูลและโปรแกรม DBMS ช่วยจัดการโครงสร้างและการจัดเก็บข้อมูล ทำให้โปรแกรมต่างๆ เป็นอิสระจากการเปลี่ยนแปลงโครงสร้างข้อมูล</td></tr>
<tr><td><b>Enables organizations to centrally manage data and data security</b></td><td>จัดการข้อมูลและความปลอดภัยแบบรวมศูนย์ กำหนดและควบคุมสิทธิ์การเข้าถึงของผู้ใช้แต่ละคน ตรวจสอบตัวตน และกำหนดสิทธิ์ในการเรียกดู เพิ่ม แก้ไข หรือลบข้อมูลตามบทบาทและสิทธิ์</td></tr>
<tr><td><b>Support data sharing</b></td><td>สนับสนุนการใช้ข้อมูลร่วมกัน โดยเก็บในฐานข้อมูลส่วนกลาง หลายแอปและหลายส่วนงานเข้าถึงร่วมกันได้ แอปใหม่นำข้อมูลที่มีอยู่แล้วมาใช้ได้โดยไม่ต้องสร้าง/เก็บชุดเดิมซ้ำ</td></tr>
<tr><td><b>Improve flexibility</b></td><td>เพิ่มความยืดหยุ่นในการใช้งาน เพราะ DBMS มีเครื่องมือสนับสนุนการเข้าถึงและนำข้อมูลไปใช้ในรูปแบบต่างๆ เช่น การสร้างแบบฟอร์ม รายงาน ช่วยลดขั้นตอนและเวลาในการจัดทำ</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b> จับคู่ปัญหา → ทางแก้: Redundancy → Controls redundancy / Inconsistency → Eliminates inconsistency / Program-data dependence → Eliminate program-data dependency / Poor security → Centrally manage data &amp; security / Lack of sharing → Support data sharing / Lack of flexibility → Improve flexibility</div>`
    },
    {
      t: "หน้าที่ DBMS: Creating the Database (Metadata)",
      ref: "สไลด์ 13",
      html: `
<h4>METADATA / Data Dictionary</h4>
<p><b>Metadata</b> หรือ <b>Data Dictionary</b> = ที่จัดเก็บ <b>นิยาม ความหมายของข้อมูล และความสัมพันธ์ของข้อมูล</b> ที่ใช้ในฐานข้อมูล (ข้อมูลที่อธิบายข้อมูล)</p>
<h4>ตัวอย่างจาก Microsoft Access</h4>
<p>หน้าจอ <b>Table Design</b> ของตาราง EMAIL แสดงรายละเอียดของโครงสร้างข้อมูล คือ ชื่อฟิลด์ (Field Name), ชนิดข้อมูล (Data Type), คำอธิบาย (Description) และคุณสมบัติของแต่ละฟิลด์ (Field Properties)</p>
<table>
<tr><th>Field Name</th><th>Data Type</th><th>Description</th></tr>
<tr><td>EmailNum</td><td>AutoNumber</td><td>Primary key – values provided by Access</td></tr>
<tr><td>Date</td><td>Date/Time</td><td>Date and time the message is recorded</td></tr>
<tr><td>Message</td><td>Long Text</td><td>Text of the email</td></tr>
<tr><td>Student Number</td><td>Number</td><td>Foreign key to row in the Student Table</td></tr>
</table>
<ul>
<li>Field Properties ตัวอย่าง: Format (Short Date), Input Mask, Default Value (=Now()), Validation Rule, Required, Indexed ฯลฯ</li>
<li>ชื่อฟิลด์ยาวได้ถึง 64 ตัวอักษร รวมช่องว่าง</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> Metadata ไม่ใช่ตัวข้อมูลลูกค้าหรืออีเมล แต่คือ "คำอธิบายของโครงสร้างข้อมูล" เช่น ฟิลด์นี้ชื่ออะไร เป็นตัวเลขหรือข้อความ</div>`
    },
    {
      t: "หน้าที่ DBMS: Managing and Processing Data + SQL (DDL/DML)",
      ref: "สไลด์ 14-16",
      html: `
<h4>DBMS Process Operations (4 อย่าง)</h4>
<ol><li><b>Read</b> (อ่าน/ค้นคืน)</li><li><b>Insert</b> (เพิ่ม)</li><li><b>Update (Modify)</b> (แก้ไข)</li><li><b>Delete</b> data (ลบ)</li></ol>
<h4>SQL — Structured Query Language</h4>
<ul>
<li>เป็น <b>มาตรฐานสากล</b> (International standard)</li>
<li>ใช้โดยเกือบทุก (Relational) DBMS</li>
</ul>
<h4>DDL — Data Definition Language</h4>
<p>ใช้ <b>กำหนดและจัดการโครงสร้างของฐานข้อมูล</b> เช่น <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code></p>
<p>ตัวอย่างสร้างตาราง Student:</p>
<p><code>CREATE TABLE Student (<br>
&nbsp;&nbsp;Student_Number varchar(8) NOT NULL,<br>
&nbsp;&nbsp;Student_Name varchar(30),<br>
&nbsp;&nbsp;HW1 int, HW2 int, MidTerm int,<br>
&nbsp;&nbsp;primary key (Student_Number)<br>
);</code></p>
<p>สังเกต: กำหนด Student_Number เป็น <b>primary key</b> และห้ามว่าง (NOT NULL)</p>
<h4>DML — Data Manipulation Language</h4>
<p>ใช้ <b>จัดการข้อมูล</b>: เพิ่มข้อมูลใหม่ ลบข้อมูลที่มีอยู่ เปลี่ยนแปลง/แก้ไขข้อมูล และค้นคืนข้อมูลจากฐานข้อมูล</p>
<p>ตัวอย่างเพิ่มข้อมูล:<br><code>INSERT INTO Student (Student_Number, Student_Name, HW1, HW2, MidTerm) VALUES (1000, 'Franklin Benjamin', 90, 95, 100);</code></p>
<p>ตัวอย่างแก้ไขข้อมูล:<br><code>UPDATE Student SET HW1 = 85 WHERE Student_Number = 1000;</code></p>
<table>
<tr><th></th><th>DDL</th><th>DML</th></tr>
<tr><td>ใช้ทำอะไร</td><td>กำหนด/จัดการ <b>โครงสร้าง</b> ฐานข้อมูล</td><td>จัดการ <b>ข้อมูล</b> ในตาราง</td></tr>
<tr><td>คำสั่ง</td><td>CREATE, ALTER, DROP</td><td>INSERT, UPDATE, DELETE, SELECT (ค้นคืน)</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> CREATE TABLE = DDL (สร้างโครงสร้าง) แต่ INSERT/UPDATE = DML (จัดการข้อมูล) ข้อสอบมักถามแยกสองกลุ่มนี้</div>`
    },
    {
      t: "Human Resources Database with Multiple Views",
      ref: "สไลด์ 17",
      html: `
<p>ฐานข้อมูลทรัพยากรบุคคลสามารถรองรับ <b>มุมมองข้อมูล (views) ที่แตกต่างกัน</b> ตามความต้องการของผู้ใช้ โดยข้อมูลทั้งหมดจัดเก็บอยู่ในฐานข้อมูลเดียว และ DBMS สามารถนำเสนอเฉพาะข้อมูลที่เกี่ยวข้องกับแต่ละกลุ่มผู้ใช้</p>
<table>
<tr><th>ส่วน</th><th>ฟิลด์</th></tr>
<tr><td>Human Resources Database (ฐานเดียว)</td><td>Employee_ID, Name, SSN, Position, Date_Hired, Gross_Pay, Net_Pay, Life_Insurance, Pension_Benefit, Health_Care</td></tr>
<tr><td><b>Benefits View</b></td><td>Name, SSN, Health_Care</td></tr>
<tr><td><b>Payroll View</b></td><td>Name, SSN, Gross_Pay, Net_Pay</td></tr>
</table>
<ul>
<li>ผู้ดูแลสวัสดิการเห็น Benefits View เท่านั้น ไม่เห็นเงินเดือน</li>
<li>ฝ่ายเงินเดือนเห็น Payroll View ไม่เห็นข้อมูลประกันสุขภาพ</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> View ช่วยทั้งเรื่อง <b>ความสะดวก</b> (เห็นเฉพาะที่ต้องใช้) และ <b>ความปลอดภัย</b> (ซ่อนข้อมูลที่ไม่เกี่ยวข้อง) โดยไม่ต้องทำสำเนาฐานข้อมูลหลายชุด</div>`
    },
    {
      t: "หน้าที่ DBMS: Administering the Database",
      ref: "สไลด์ 18",
      html: `
<p>การบริหารฐานข้อมูล (Administer) มี 3 งานหลัก</p>
<ol>
<li><b>Manage security and user access</b> — กำหนดบัญชีผู้ใช้ รหัสผ่าน และสิทธิ์ในการเข้าถึงฐานข้อมูล รวมถึงข้อจำกัดในการใช้งาน</li>
<li><b>Control user permissions</b> — กำหนดว่าผู้ใช้แต่ละคนหรือแต่ละบทบาทสามารถเรียกดู เพิ่ม แก้ไข หรือลบข้อมูลได้ในระดับใด</li>
<li><b>Backup and maintain the database</b> — สำรองข้อมูล กู้คืนข้อมูลเมื่อเกิดปัญหา ดูแลประสิทธิภาพของฐานข้อมูล และจัดการข้อมูลที่ไม่จำเป็น</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b> สรุปหน้าที่ DBMS ทั้งหมด: <b>Create</b> (metadata/data dictionary) → <b>Process</b> (Read/Insert/Update/Delete, SQL) → <b>Administer</b> (security, permissions, backup)</div>`
    },
    {
      t: "Relational DBMS และองค์ประกอบ",
      ref: "สไลด์ 19-20",
      html: `
<h4>Relational DBMS (ระบบจัดการฐานข้อมูลเชิงสัมพันธ์)</h4>
<ul>
<li>แทนข้อมูลเป็น <b>ตารางสองมิติ เรียกว่า relations</b></li>
<li>แต่ละตารางแทน <b>entity</b> และมี <b>attributes</b> ที่อธิบาย entity นั้น</li>
<li><b>Entity</b>: สิ่งต่างๆ ที่เราสนใจและต้องการเก็บลงฐานข้อมูล อาจเป็น คน สัตว์ สิ่งของ เหตุการณ์</li>
<li><b>Attribute</b>: รายละเอียดข้อมูลที่แสดงลักษณะและคุณสมบัติของเอนทิตี้หนึ่งๆ</li>
</ul>
<h4>Components of a Relational Database</h4>
<p><b>Tables or Files + Relationships + Metadata = Relational Database</b></p>
<ul>
<li>Formal term ของ <b>table</b> คือ "<b>relation</b>"</li>
<li><b>Relationships</b> เชื่อมตารางที่เกี่ยวข้องกันผ่าน common keys</li>
<li><b>Database</b> คือกลุ่มของตารางที่เกี่ยวข้องกัน</li>
<li><b>Metadata</b> อธิบายโครงสร้างและนิยามของตาราง ฟิลด์ และความสัมพันธ์</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Table = Relation = Entity (ตัวแทนของสิ่งที่สนใจ)</li>
<li>คอลัมน์ = Attribute / Field</li>
<li>Relational DB = Tables + Relationships + Metadata</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ตัวอย่าง: ตาราง CUSTOMER คือ entity "ลูกค้า" ส่วน Name, Phone, Address คือ attributes</div>`
    },
    {
      t: "คำศัพท์ในตาราง: Row, Field, Primary Key, Foreign Key",
      ref: "สไลด์ 21",
      html: `
<p><b>Table (Relation)</b> = โครงสร้างของแถว (rows) และคอลัมน์ (columns)</p>
<table>
<tr><th>คำศัพท์</th><th>ความหมาย</th></tr>
<tr><td><b>Rows (Tuples)</b></td><td>Records ที่แทน instance ของ entity แต่ละรายการ (เช่น ผู้ผลิต 1 ราย)</td></tr>
<tr><td><b>Fields (Columns)</b></td><td>แทน attributes ของ entity</td></tr>
<tr><td><b>Primary Key</b></td><td>ฟิลด์หรือชุดของฟิลด์ที่ใช้ระบุ record แต่ละรายการแบบไม่ซ้ำ ต้อง <b>unique</b> และ <b>ห้ามเป็นค่า NULL</b> (ค่าว่าง) จึงระบุได้ว่าข้อมูลนั้นเป็นของแถวใด</td></tr>
<tr><td><b>Foreign Key</b></td><td>ฟิลด์ในตารางหนึ่งที่ <b>อ้างอิง Primary Key ของอีกตารางหนึ่ง</b> เพื่อสร้างความสัมพันธ์ระหว่างตาราง</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Row = Record = Tuple / Column = Field = Attribute</li>
<li>Primary key: unique + not NULL</li>
<li>Foreign key: ชี้ไปหา primary key ของตารางอื่น (ตัวเชื่อมตาราง)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Foreign key ในตารางตัวเอง <b>ซ้ำได้</b> (เช่น ผู้ผลิตรายเดียวส่งหลายอะไหล่) แต่ primary key ซ้ำไม่ได้</div>`
    },
    {
      t: "ตัวอย่างตาราง SUPPLIER และ PART",
      ref: "สไลด์ 22-24",
      html: `
<h4>ตาราง SUPPLIER (สไลด์ 22)</h4>
<p>แสดงข้อมูลในรูปตารางสองมิติ เป็นตัวแทนของ entity ผู้ผลิต (supplier) และคุณลักษณะ Columns (Attributes, Fields) มี 6 ฟิลด์ และ Rows (Records, Tuples) มี 4 แถว โดย <b>Supplier_Number เป็น Key Field (Primary Key)</b></p>
<table>
<tr><th>Supplier_Number (PK)</th><th>Supplier_Name</th><th>Supplier_Street</th><th>Supplier_City</th><th>Supplier_State</th><th>Supplier_Zip</th></tr>
<tr><td>8259</td><td>CBM Inc.</td><td>74 5th Avenue</td><td>Dayton</td><td>OH</td><td>45220</td></tr>
<tr><td>8261</td><td>B. R. Molds</td><td>1277 Gandolly Street</td><td>Cleveland</td><td>OH</td><td>49345</td></tr>
<tr><td>8263</td><td>Jackson Composites</td><td>8233 Micklin Street</td><td>Lexington</td><td>KY</td><td>56723</td></tr>
<tr><td>8444</td><td>Bryant Corporation</td><td>4315 Mill Drive</td><td>Rochester</td><td>NY</td><td>11344</td></tr>
</table>
<h4>ตาราง PART (สไลด์ 23)</h4>
<p>เก็บข้อมูลเกี่ยวกับอะไหล่ <b>Part_Number เป็น Primary Key</b> ของตาราง PART ใช้ระบุแต่ละรายการให้เป็นเอกลักษณ์ ส่วน <b>Supplier_Number เป็น Foreign Key</b> ที่อ้างอิง Supplier_Number ซึ่งเป็น Primary Key ของตาราง SUPPLIER เพื่อสร้างความสัมพันธ์ระหว่างตาราง</p>
<table>
<tr><th>Part_Number (PK)</th><th>Part_Name</th><th>Unit_Price</th><th>Supplier_Number (FK)</th></tr>
<tr><td>137</td><td>Door latch</td><td>22.00</td><td>8259</td></tr>
<tr><td>145</td><td>Side mirror</td><td>12.00</td><td>8444</td></tr>
<tr><td>150</td><td>Door molding</td><td>6.00</td><td>8263</td></tr>
<tr><td>152</td><td>Door lock</td><td>31.00</td><td>8259</td></tr>
<tr><td>155</td><td>Compressor</td><td>54.00</td><td>8261</td></tr>
<tr><td>178</td><td>Door handle</td><td>10.00</td><td>8259</td></tr>
</table>
<h4>Example of Relationships Among Rows (สไลด์ 24)</h4>
<p>สไลด์วาดเส้นจาก Supplier_Number = 8259 ในตาราง PART ไปยังแถว 8259 (CBM Inc., Dayton) ในตาราง SUPPLIER แสดงว่า Door latch (137) ผลิตโดย CBM Inc. การเชื่อมตารางด้วย foreign key ทำให้ไม่ต้องเก็บชื่อและที่อยู่ผู้ผลิตซ้ำในทุกแถวของ PART (อะไหล่ 137, 152, 178 ล้วนมาจาก 8259 แต่เก็บรายละเอียด CBM Inc. เพียงครั้งเดียว)</p>
<div class="note"><b>💡 หมายเหตุ</b> นี่คือแนวคิดเดียวกับ Database approach ในสไลด์ 8 ที่ซ้ำเฉพาะ ID เท่านั้น</div>`
    },
    {
      t: "Entity-Relationship Diagram (ER Diagram)",
      ref: "สไลด์ 25",
      html: `
<p><b>Entity-relationship diagram (แบบจำลองความสัมพันธ์ระหว่างกลุ่มข้อมูล)</b> คือการแสดงภาพกราฟิกของ Entity-Relationship Model</p>
<table>
<tr><th>องค์ประกอบ</th><th>ความหมาย</th></tr>
<tr><td><b>Entities</b></td><td>สิ่งที่ต้องติดตาม (Something to track) เช่น order, customer, salesperson, item, volunteer, donation</td></tr>
<tr><td><b>Attributes</b></td><td>อธิบายคุณลักษณะของ entity</td></tr>
<tr><td><b>Relationship</b></td><td>ความสัมพันธ์ระหว่าง entities</td></tr>
</table>
<h4>ตัวอย่าง: LOGICAL VIEW ด้วย ER Diagram</h4>
<div class="dg"><div class="dgt">🖼️ SUPPLIER – PART – LINE_ITEM – ORDER</div>
<svg viewBox="0 0 700 120" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="40" width="110" height="40"/><text class="t b" x="65" y="65" text-anchor="middle">SUPPLIER</text>
<rect class="bx" x="200" y="40" width="110" height="40"/><text class="t b" x="255" y="65" text-anchor="middle">PART</text>
<rect class="bx" x="390" y="40" width="110" height="40"/><text class="t b" x="445" y="65" text-anchor="middle">LINE_ITEM</text>
<rect class="bx" x="580" y="40" width="110" height="40"/><text class="t b" x="635" y="65" text-anchor="middle">ORDER</text>
<line class="ln" x1="120" y1="60" x2="200" y2="60"/>
<line class="ln" x1="310" y1="60" x2="390" y2="60"/>
<line class="ln" x1="500" y1="60" x2="580" y2="60"/>
<text class="t sm" x="160" y="32" text-anchor="middle">provides</text>
<text class="t sm" x="160" y="85" text-anchor="middle">is supplied by</text>
<text class="t sm" x="350" y="32" text-anchor="middle">is ordered</text>
<text class="t sm" x="350" y="85" text-anchor="middle">contains</text>
<text class="t sm" x="540" y="32" text-anchor="middle">belongs to</text>
<text class="t sm" x="540" y="85" text-anchor="middle">includes</text>
</svg></div>
<p>แผนภาพแสดงความสัมพันธ์ระหว่างผู้ผลิต (SUPPLIER) อะไหล่ (PART) รายการสั่งซื้อ (LINE_ITEM) และใบสั่งซื้อ (ORDER) ที่อาจนำมาใช้กำหนดรูปแบบฐานข้อมูล: ผู้ผลิต provides อะไหล่ / อะไหล่ is supplied by ผู้ผลิต / อะไหล่ is ordered ใน line item / line item belongs to order / order includes line items</p>
<div class="note"><b>💡 หมายเหตุ</b> ER diagram คือ "พิมพ์เขียว" ก่อนสร้างตารางจริง: entity กลายเป็นตาราง, attribute กลายเป็นคอลัมน์</div>`
    },
    {
      t: "Nontraditional DBMS (NoSQL)",
      ref: "สไลด์ 26",
      html: `
<h4>ทำไมต้องมี nontraditional DBMS</h4>
<ul>
<li>Relational database แบบดั้งเดิม <b>ไม่ได้เหมาะที่สุดเสมอไป</b> กับข้อมูล large-scale, unstructured หรือ semi-structured เช่น เอกสาร ภาพ เสียง วิดีโอ</li>
<li><b>Non-relational databases</b> ออกแบบให้รับมือกับข้อมูลขนาดใหญ่และกระจาย (distributed) ที่มีโครงสร้างหลากหลาย โดยใช้ <b>flexible data models</b> และ <b>horizontal scalability</b> (ขยายโดยเพิ่มเครื่อง)</li>
</ul>
<h4>ตัวอย่างชนิด: NoSQL DBMS (Non-Relational DBMS)</h4>
<ul>
<li>สนับสนุน flexible data models และการประมวลผลข้อมูลกระจายขนาดใหญ่</li>
<li>เหมาะกับข้อมูลปริมาณมาก (high-volume) และแอปที่ต้องการ scalability</li>
<li>ตัวอย่าง: <b>MongoDB, Cassandra, Amazon DynamoDB</b></li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b> NoSQL = Non-Relational: flexible data model + large-scale distributed + horizontal scalability; ตัวอย่าง MongoDB, Cassandra, DynamoDB</div>
<div class="note"><b>💡 หมายเหตุ</b> ไม่ได้แปลว่า relational ล้าสมัย แต่เลือกให้เหมาะกับงาน: ข้อมูลมีโครงสร้างตายตัว → Relational / ข้อมูลหลากหลายและปริมาณมหาศาล → NoSQL</div>`
    },
    {
      t: "รูปแบบ/วิวัฒนาการของการจัดการข้อมูลในองค์กร",
      ref: "สไลด์ 27",
      html: `
<p>สไลด์สรุปวิวัฒนาการ 5 ขั้น (Forms and Evolution of Data Management in Organizations)</p>
<table>
<tr><th>ขั้น</th><th>รูปแบบ</th><th>ลักษณะ</th></tr>
<tr><td>1</td><td><b>กระดาษ (Paper)</b></td><td>จัดเก็บข้อมูลในรูปแบบฟอร์มกระดาษ เหมาะกับข้อมูลปริมาณไม่มาก ค้นหาและแบ่งปันข้อมูลได้ยาก — จัดเก็บแบบแมนนวล (Manual Records)</td></tr>
<tr><td>2</td><td><b>แฟ้มข้อมูล (File)</b></td><td>จัดเก็บเป็นไฟล์แยกตามโปรแกรมหรือหน่วยงาน เช่น Excel, Text File, PDF, Word; ข้อมูลซ้ำซ้อนและไม่เป็นมาตรฐาน — ไฟล์แยกตามหน่วยงาน (Separate Data Files)</td></tr>
<tr><td>3</td><td><b>ฐานข้อมูล (Database)</b></td><td>จัดเก็บข้อมูลอย่างเป็นระบบ มีโครงสร้างและมาตรฐาน ใช้ร่วมกันผ่าน DBMS ลดความซ้ำซ้อน รองรับการทำงานของผู้ใช้หลายคน — ข้อมูลอย่างเป็นระบบ (Structured Data)</td></tr>
<tr><td>4</td><td><b>คลังข้อมูล (Data Warehouse)</b></td><td>รวบรวมข้อมูลจากหลายแหล่ง (ERP, CRM, HR, LMS) มาไว้ในที่เดียว ปรับปรุงคุณภาพ จัดเก็บในรูปแบบเหมาะสำหรับการวิเคราะห์ สนับสนุนการตัดสินใจ — ข้อมูลเพื่อการวิเคราะห์ (Integrated Data for Analysis)</td></tr>
<tr><td>5</td><td><b>มาร์ทข้อมูล (Data Marts)</b></td><td>ส่วนย่อยของคลังข้อมูล จัดเตรียมสำหรับหัวข้อ/หน่วยธุรกิจเฉพาะ เช่น Sales, Finance, HR, Marketing ใช้งานง่ายและตรงกับความต้องการของแต่ละหน่วยงาน — ข้อมูลเฉพาะหน่วยงาน (Department-Specific Data)</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b> ลำดับ: Paper → File → Database → Data Warehouse → Data Marts</div>`
    },
    {
      t: "Data Warehouse: นิยามและขอบเขต",
      ref: "สไลด์ 28-29",
      html: `
<h4>นิยามของ W.H. Inmon</h4>
<p>"A data warehouse is a <b>subject-oriented, integrated, time-varying, non-volatile</b> collection of data in support of the management's decision-making process." (W.H. Inmon)</p>
<p>= Data warehouse คือชุดข้อมูลที่ (1) จัดตามหัวข้อ (2) บูรณาการ (3) มีมิติเวลา (4) ไม่ถูกเปลี่ยนแปลง เพื่อสนับสนุนการตัดสินใจของผู้บริหาร</p>
<h4>ลักษณะอื่นของ Data Warehouse (สไลด์ 29)</h4>
<ul>
<li>เป็น <b>physical repository</b> ที่ข้อมูลถูกจัดระเบียบเป็นพิเศษ เพื่อให้ข้อมูล <b>ระดับองค์กร (enterprise-wide)</b> ที่ผ่านการทำความสะอาด (cleansed) ในรูปแบบมาตรฐาน สำหรับการวิเคราะห์และตัดสินใจ</li>
<li>เป็นที่เก็บข้อมูล <b>ปัจจุบันและอดีต</b> (current and historical) ที่ผู้บริหารทั่วทั้งองค์กรอาจสนใจ</li>
<li>DW สำหรับทั้งองค์กร → <b>Enterprise DW</b></li>
<li>DW ขนาดเล็ก → <b>Data mart</b></li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>4 คุณสมบัติของ Inmon: subject-oriented, integrated, time-varying (time-variant), non-volatile</li>
<li>DW ทั้งองค์กร = Enterprise DW / DW ขนาดเล็ก = Data mart</li>
</ul></div>`
    },
    {
      t: "คุณสมบัติเฉพาะของ DW: Subject Oriented และ Integrated",
      ref: "สไลด์ 30-31",
      html: `
<h4>1) Subject Oriented — จัดข้อมูลตามหัวข้อธุรกิจ</h4>
<ul>
<li>ข้อมูลใน DW ถูกจัดระเบียบตาม <b>หัวข้อสำคัญของธุรกิจ</b> ที่ผู้บริหารต้องการวิเคราะห์ เช่น ลูกค้า การขาย สินค้า และผู้จัดจำหน่าย มากกว่าการจัดตามกระบวนการทำงานของแต่ละระบบ</li>
<li>ข้อมูลจัดเก็บตามหัวข้อที่เกี่ยวข้องกับสารสนเทศที่จำเป็นต่อการวิเคราะห์และตัดสินใจ</li>
<li>ตัวอย่าง: ถ้าห้างสรรพสินค้าต้องการใช้ DW วิเคราะห์การขาย ข้อมูลที่รวบรวมอาจจะมาจาก <b>ลูกค้า สินค้า และการขาย</b> มากกว่าข้อมูลพนักงาน</li>
</ul>
<h4>2) Integrated — การบูรณาการข้อมูล</h4>
<ul>
<li>คลังข้อมูลรวบรวมข้อมูลจากระบบสารสนเทศต่างๆ ขององค์กรและแหล่งข้อมูลภายนอก ข้อมูลที่หลากหลายจะถูกนำไปจัดเก็บใหม่เข้าคลังข้อมูล <b>ซึ่งจะมีการปรับข้อมูลต่างๆ เหล่านี้ให้มีความสอดคล้องและอยู่ในรูปแบบมาตรฐานเดียวกัน</b></li>
<li>ตัวอย่าง: ค่าของตัวแปรตัวเดียวในแต่ละฐานข้อมูลอาจต่างกัน ฐานหนึ่งใช้ 0 และ 1 อีกฐานใช้ T และ F ดังนั้นฐานข้อมูลที่สร้างใหม่ต้องกำหนดค่าตัวแปรให้เหมือนกันเป็นหนึ่งเดียว</li>
<li>ตัวอย่างในรูป: Application A เก็บ sex เป็น (Male, female) และ Application B เก็บ sex เป็น (M, F) ใน Operational Database → เมื่อเข้า Data Warehouse ถูกแปลงให้เป็นรูปแบบเดียว <b>M, F</b></li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Subject oriented: จัดตามหัวข้อธุรกิจ (ลูกค้า การขาย สินค้า) ไม่ใช่ตามกระบวนการ/ระบบ</li>
<li>Integrated: รวมหลายแหล่ง + ปรับให้เป็นรูปแบบ/ค่ามาตรฐานเดียว</li>
</ul></div>`
    },
    {
      t: "คุณสมบัติเฉพาะของ DW: Time-variant และ Non-volatile",
      ref: "สไลด์ 32-33",
      html: `
<h4>3) Time-variant — ข้อมูลมีมิติด้านเวลา</h4>
<ul>
<li>ข้อมูลใน DW มี <b>มิติด้านเวลา (Time Dimension)</b> กำกับอยู่เสมอ และเก็บข้อมูลย้อนหลังต่อเนื่องเป็นระยะเวลาหลายปี เช่น <b>5–10 ปี</b> เพื่อใช้เปรียบเทียบการเปลี่ยนแปลง วิเคราะห์แนวโน้ม (trend) และสนับสนุนการพยากรณ์ในอนาคต</li>
<li>ข้อมูลสำหรับการวิเคราะห์ประกอบด้วยข้อมูลที่เกิดขึ้น ณ ช่วงเวลาต่างๆ เช่น แต่ละวัน สัปดาห์ เดือน และรายปี นำมาเปรียบเทียบกัน</li>
</ul>
<h4>4) Non-volatile — ข้อมูลไม่ถูกเปลี่ยนแปลง</h4>
<ul>
<li>ข้อมูลในคลังข้อมูลจะไม่เปลี่ยนแปลง ข้อมูลใหม่ๆ จะถูก <b>เพิ่มเข้าไป</b> ไม่ใช่เข้าไปแทนที่ข้อมูลเดิม ผู้ใช้สามารถใช้ DW ได้เพียงแค่ <b>โหลดและเข้าถึง (Load and Access)</b> เท่านั้น</li>
<li>เปรียบเทียบในรูป: <b>Operational Database</b> มีการ Insert, Update, Delete ตลอดเวลา แต่ <b>Data Warehouse</b> มีเพียง Load (นำข้อมูลเข้า) และ Access (เข้าถึง/อ่าน)</li>
</ul>
<table>
<tr><th></th><th>Operational Database</th><th>Data Warehouse</th></tr>
<tr><td>การทำงานกับข้อมูล</td><td>Insert, Update, Delete</td><td>Load, Access (อ่าน)</td></tr>
<tr><td>ข้อมูลเก่า</td><td>ถูกแก้ทับได้</td><td>ไม่แก้ทับ เก็บสะสมย้อนหลัง</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> Non-volatile ไม่ได้แปลว่าไม่เพิ่มข้อมูลเลย แต่หมายถึง "ไม่แก้ไข/ไม่ทับข้อมูลเดิม" ข้อมูลใหม่ยังโหลดเพิ่มได้เรื่อยๆ ส่วน time-variant คือมีมิติเวลา เก็บหลายปี</div>`
    },
    {
      t: "สถาปัตยกรรมคลังข้อมูล: แหล่งข้อมูล ETL และการวิเคราะห์",
      ref: "สไลด์ 34",
      html: `
<div class="dg"><div class="dgt">🖼️ ข้อมูลไหลจากแหล่งต่างๆ เข้า Data Warehouse</div>
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="10" width="140" height="34"/><text class="t" x="80" y="32" text-anchor="middle">Operational Data</text>
<rect class="bx" x="10" y="54" width="140" height="34"/><text class="t" x="80" y="76" text-anchor="middle">Customer Data</text>
<rect class="bx" x="10" y="98" width="140" height="34"/><text class="t" x="80" y="120" text-anchor="middle">Manufacturing Data</text>
<rect class="bx" x="10" y="142" width="140" height="34"/><text class="t" x="80" y="164" text-anchor="middle">Historical Data</text>
<rect class="bx bad" x="10" y="200" width="140" height="34"/><text class="t" x="80" y="222" text-anchor="middle">External Data</text>
<text class="t sm" x="80" y="252" text-anchor="middle">Internal (บน 4) / External (ล่าง)</text>
<line class="ln" x1="150" y1="27" x2="250" y2="110"/>
<line class="ln" x1="150" y1="71" x2="250" y2="115"/>
<line class="ln" x1="150" y1="115" x2="250" y2="120"/>
<line class="ln" x1="150" y1="159" x2="250" y2="125"/>
<line class="ln" x1="150" y1="217" x2="250" y2="135"/>
<rect class="bx hd" x="250" y="90" width="120" height="60"/><text class="t b" x="310" y="116" text-anchor="middle">Extract and</text><text class="t b" x="310" y="134" text-anchor="middle">Transform</text>
<line class="ln ok" x1="370" y1="120" x2="430" y2="120"/>
<rect class="bx ok" x="430" y="85" width="90" height="70"/><text class="t b" x="475" y="125" text-anchor="middle">Data Warehouse</text>
<line class="ln ok" x1="520" y1="120" x2="560" y2="120"/>
<rect class="bx hd" x="560" y="85" width="130" height="70"/><text class="t b" x="625" y="108" text-anchor="middle">Data Access</text><text class="t b" x="625" y="124" text-anchor="middle">and Analysis</text><text class="t sm" x="625" y="144" text-anchor="middle">Queries, OLAP, Mining</text>
</svg></div>
<ul>
<li><b>Internal data sources</b>: Operational Data, Customer Data, Manufacturing Data, Historical Data</li>
<li><b>External data sources</b>: External Data</li>
<li>ทุกแหล่งผ่านขั้นตอน <b>Extract and Transform</b> (ดึงและแปลงข้อมูล) เข้าสู่ Data Warehouse</li>
<li>จาก DW ผู้ใช้ทำ <b>Data Access and Analysis</b>: Queries and reports, <b>OLAP</b>, <b>Data mining</b></li>
</ul>
<p>คำอธิบายใต้ภาพ: DW ดึงข้อมูลปัจจุบันและอดีตจากหลายระบบปฏิบัติการภายในองค์กร รวมกับข้อมูลภายนอก และจัดระเบียบใหม่เป็นฐานข้อมูลกลางที่ออกแบบสำหรับการรายงานและวิเคราะห์ของฝ่ายบริหาร โดย information directory ให้ข้อมูลเกี่ยวกับข้อมูลที่มีใน DW</p>
<div class="must"><b>🔥 ต้องจำ</b> ลำดับการไหล: Sources (Internal + External) → Extract &amp; Transform → Data Warehouse → Queries/reports, OLAP, Data mining</div>`
    },
    {
      t: "Data Mart และความแตกต่างจาก Data Warehouse",
      ref: "สไลด์ 35-37",
      html: `
<h4>Data Marts</h4>
<ul>
<li>เป็น data warehouse ขนาดเล็กที่ออกแบบสำหรับ <b>strategic business unit (SBU)</b> หรือแผนก (เช่น marketing, operations)</li>
<li>มักมุ่งเน้นไปที่เรื่องเดียวหรือสายธุรกิจหนึ่งๆ</li>
</ul>
<h4>ความแตกต่าง Data Warehouse vs Data Mart</h4>
<table>
<tr><th>ประเด็น</th><th>Data Warehouse</th><th>Data Mart</th></tr>
<tr><td><b>ขอบเขต</b></td><td>ครอบคลุมข้อมูลระดับองค์กร (Enterprise-wide) รวมข้อมูลจากหลายหน่วยงานและหลายกระบวนการธุรกิจ</td><td>ขอบเขตแคบกว่า เน้นข้อมูลสำหรับหน่วยงาน กระบวนการ หรือหัวข้อธุรกิจเฉพาะ เช่น Sales, Marketing, Finance, HR</td></tr>
<tr><td><b>แหล่งข้อมูล</b></td><td>มาจากแหล่งข้อมูลที่หลากหลาย เช่น ระบบสารสนเทศภายในองค์กร และแหล่งข้อมูลภายนอกองค์กร</td><td>ใช้ข้อมูลที่เกี่ยวข้องกับหัวข้อ หน่วยงาน หรือกระบวนการที่ต้องการวิเคราะห์ เช่น Marketing Data Mart เน้นข้อมูลที่จำเป็นต่อการวิเคราะห์และตัดสินใจด้านการตลาด</td></tr>
<tr><td><b>ขนาด</b></td><td>ใหญ่กว่ามาก เพราะครอบคลุมข้อมูลทุกเรื่อง</td><td>เล็กกว่ามาก เพราะครอบคลุมเฉพาะเรื่อง</td></tr>
<tr><td><b>ระยะเวลาพัฒนา</b></td><td>ยากลำบากและใช้เวลานาน อาจเป็นปีหรือหลายปี</td><td>สร้างเสร็จได้ภายในไม่กี่เดือน</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b> 4 ประเด็นเปรียบเทียบ: ขอบเขต, แหล่งข้อมูล, ขนาด, ระยะเวลาพัฒนา — DW = ทั้งองค์กร ใหญ่ ช้า / Data Mart = เฉพาะแผนก เล็ก เร็ว</div>
<div class="note"><b>💡 หมายเหตุ</b> เปรียบเหมือนห้างสรรพสินค้า (DW) กับแผนกเสื้อผ้าของห้าง (Data Mart)</div>`
    },
    {
      t: "แนวทางการสร้างคลังข้อมูล: Enterprise DW, Dependent และ Independent Data Mart",
      ref: "สไลด์ 38-40",
      html: `
<div class="dg"><div class="dgt">🖼️ 3 แนวทางการสร้างคลังข้อมูล</div>
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg">
<text class="t b" x="10" y="16">1) Enterprise Data Warehouse</text>
<rect class="bx" x="10" y="26" width="120" height="30"/><text class="t sm" x="70" y="46" text-anchor="middle">ข้อมูลภายใน</text>
<rect class="bx" x="10" y="64" width="120" height="30"/><text class="t sm" x="70" y="84" text-anchor="middle">ข้อมูลภายนอก</text>
<line class="ln" x1="130" y1="41" x2="250" y2="65"/><line class="ln" x1="130" y1="79" x2="250" y2="70"/>
<rect class="bx ok" x="250" y="40" width="110" height="50"/><text class="t b" x="305" y="70" text-anchor="middle">คลังข้อมูลกลาง</text>
<text class="t b" x="10" y="130">2) Dependent Data Mart</text>
<rect class="bx" x="10" y="140" width="110" height="26"/><text class="t sm" x="65" y="158" text-anchor="middle">ข้อมูลภายใน</text>
<rect class="bx" x="10" y="174" width="110" height="26"/><text class="t sm" x="65" y="192" text-anchor="middle">ข้อมูลภายนอก</text>
<line class="ln" x1="120" y1="153" x2="200" y2="170"/><line class="ln" x1="120" y1="187" x2="200" y2="175"/>
<rect class="bx ok" x="200" y="145" width="100" height="50"/><text class="t b" x="250" y="175" text-anchor="middle">คลังข้อมูล</text>
<line class="ln" x1="300" y1="160" x2="400" y2="145"/><line class="ln" x1="300" y1="170" x2="400" y2="168"/><line class="ln" x1="300" y1="180" x2="400" y2="191"/><line class="ln" x1="300" y1="190" x2="400" y2="214"/>
<rect class="bx hd" x="400" y="132" width="90" height="24"/><text class="t sm" x="445" y="148" text-anchor="middle">มาร์ทข้อมูล</text>
<rect class="bx hd" x="400" y="156" width="90" height="24"/><text class="t sm" x="445" y="172" text-anchor="middle">มาร์ทข้อมูล</text>
<rect class="bx hd" x="400" y="180" width="90" height="24"/><text class="t sm" x="445" y="196" text-anchor="middle">มาร์ทข้อมูล</text>
<rect class="bx hd" x="400" y="204" width="90" height="24"/><text class="t sm" x="445" y="220" text-anchor="middle">มาร์ทข้อมูล</text>
<text class="t b" x="10" y="258">3) Independent Data Mart</text>
<rect class="bx" x="10" y="268" width="110" height="24"/><text class="t sm" x="65" y="284" text-anchor="middle">ข้อมูลภายใน</text>
<rect class="bx" x="10" y="298" width="110" height="24"/><text class="t sm" x="65" y="314" text-anchor="middle">ข้อมูลภายนอก</text>
<line class="ln bad" x1="120" y1="280" x2="250" y2="280"/><line class="ln bad" x1="120" y1="310" x2="250" y2="310"/>
<rect class="bx bad" x="250" y="266" width="90" height="24"/><text class="t sm" x="295" y="282" text-anchor="middle">มาร์ทข้อมูล</text>
<rect class="bx bad" x="350" y="266" width="90" height="24"/><text class="t sm" x="395" y="282" text-anchor="middle">มาร์ทข้อมูล</text>
<rect class="bx bad" x="250" y="296" width="90" height="24"/><text class="t sm" x="295" y="312" text-anchor="middle">มาร์ทข้อมูล</text>
<rect class="bx bad" x="350" y="296" width="90" height="24"/><text class="t sm" x="395" y="312" text-anchor="middle">มาร์ทข้อมูล</text>
</svg></div>
<table>
<tr><th>แนวทาง</th><th>ลักษณะ</th></tr>
<tr><td><b>Enterprise Data Warehouse</b></td><td>รวมข้อมูลจากภายในและภายนอกเข้ามาเป็น <b>คลังข้อมูลกลาง</b> แห่งเดียวระดับองค์กร</td></tr>
<tr><td><b>Dependent Data Mart</b></td><td>ข้อมูลภายใน + ภายนอกเข้า <b>คลังข้อมูล</b> ก่อน แล้ว <b>แตกออกเป็น data mart หลายแห่ง</b> (data mart พึ่งพา/ได้ข้อมูลจากคลังกลาง)</td></tr>
<tr><td><b>Independent Data Mart</b></td><td>ข้อมูลภายในและภายนอก <b>ไหลเข้า data mart แต่ละแห่งโดยตรง ไม่มีคลังข้อมูลกลาง</b> data mart อยู่เป็นอิสระต่อกัน</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> Dependent = มีคลังกลางอยู่ข้างหลัง (data mart ดึงจากคลัง) / Independent = ไม่มีคลังกลาง (data mart ดึงจากแหล่งข้อมูลเอง)</div>`
    },
    {
      t: "Business Intelligence และ OLAP (หัวข้อใน Outline)",
      ref: "สไลด์ 2, 34",
      html: `
<p>Outline ของบทระบุหัวข้อ <b>Business Intelligence</b> และ <b>OLAP</b> ไว้ แต่ในชุดสไลด์นี้ปรากฏเพียงในแผนภาพสถาปัตยกรรม DW (สไลด์ 34) ที่ช่อง <b>Data Access and Analysis</b> ระบุ: Queries and reports, OLAP, Data mining</p>
<ul>
<li><b>Business Intelligence (BI)</b>: การนำข้อมูลจาก DW/ฐานข้อมูลมาวิเคราะห์ รายงาน และแสดงผล เพื่อช่วยผู้บริหารตัดสินใจ (รายละเอียดอยู่ในบทเรื่อง BI)</li>
<li><b>OLAP (Online Analytical Processing)</b>: เครื่องมือวิเคราะห์ข้อมูลหลายมิติ (เช่น ยอดขายตามสินค้า × ภูมิภาค × เวลา) ที่ดึงข้อมูลจาก DW เพื่อสำรวจและเจาะรายละเอียด</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> เหตุผลที่ DW ออกแบบให้ subject-oriented และ time-variant ก็เพื่อให้เครื่องมืออย่าง OLAP และ BI วิเคราะห์ข้อมูลหลายมิติ/ย้อนหลังได้สะดวก</div>`
    }
  ],
  ex: [
    { type:"choice", story:"ชื่อคุณสมชายถูกพิมพ์อยู่ในไฟล์ลูกค้าของฝ่ายขาย ฝ่ายบัญชี และฝ่ายจัดส่ง ครบทั้งสามไฟล์", q:"สถานการณ์นี้ตรงกับข้อเสียใดของ File Processing System", opts:[{t:"Data inconsistency",why:"ต้องมีค่าที่ขัดแย้งกัน ซึ่งเรื่องนี้ยังไม่ได้บอก"},{t:"Lack of data sharing",why:"เป็นเรื่องแต่ละฝ่ายเข้าถึงข้อมูลกันไม่ได้"},{t:"Data redundancy",why:"ข้อมูลเดียวกันถูกเก็บไว้หลายไฟล์"},{t:"Poor security",why:"เป็นเรื่องการควบคุมสิทธิ์ผู้ใช้"}], ans:2 },
    { type:"choice", story:"ไฟล์ของฝ่ายขายระบุว่าลูกค้าอยู่ถนนสุขุมวิท แต่ไฟล์ของฝ่ายบัญชีระบุว่าอยู่ถนนพหลโยธิน จนไม่มีใครรู้ว่าอันไหนทันสมัยกว่า", q:"ผลที่ตามมาจากการเก็บข้อมูลหลายชุดนี้คือข้อเสียข้อใด", opts:[{t:"Data inconsistency",why:"ข้อมูลชุดเดียวกันมีค่าไม่ตรงกัน"},{t:"Data redundancy",why:"เป็นต้นเหตุของการเก็บหลายชุด ไม่ใช่ผลที่เห็น"},{t:"Lack of flexibility",why:"เป็นเรื่องรองรับความต้องการใหม่ไม่ได้"},{t:"Lack of data sharing",why:"เป็นเรื่องแต่ละฝ่ายใช้ข้อมูลข้ามกันไม่ได้"}], ans:0 },
    { type:"choice", story:"ฝ่ายไอทีเพิ่มช่องใหม่ในไฟล์สินค้า ปรากฏว่าซอฟต์แวร์ของคลัง ขาย และบัญชีที่เคยเปิดไฟล์นี้ใช้งานไม่ได้ ต้องไล่เขียนใหม่ทีละตัว", q:"สถานการณ์นี้ตรงกับข้อเสียใดของ File Processing System", opts:[{t:"Lack of flexibility",why:"เป็นเรื่องรองรับงานใหม่ๆ ได้จำกัด"},{t:"Poor security",why:"เป็นเรื่องการกำหนดสิทธิ์การเข้าถึง"},{t:"Lack of data sharing",why:"เป็นเรื่องแต่ละฝ่ายเข้าถึงข้อมูลกันไม่ได้"},{t:"Lack of program-data independence",why:"โปรแกรมผูกติดกับรูปแบบของไฟล์ข้อมูล"}], ans:3 },
    { type:"choice", q:"ข้อใดไม่อยู่ใน 6 ข้อเสียของ File Processing System ตามที่เรียนในบทนี้", opts:[{t:"Slow query response",why:"ไม่อยู่ใน 6 ข้อ ที่เรียนมีเรื่องความเร็วไม่ได้ระบุ"},{t:"Poor security",why:"เป็นข้อเสียข้อที่ 5 ในรายการ"},{t:"Lack of data sharing",why:"เป็นข้อเสียข้อที่ 3 ในรายการ"},{t:"Data inconsistency",why:"เป็นข้อเสียข้อที่ 2 ในรายการ"}], ans:0 },
    { type:"choice", story:"มหาวิทยาลัยเก็บรายละเอียดอาจารย์ (ชื่อ ห้อง เบอร์) ไว้ในตาราง Instructor ตารางเดียว ส่วนตารางสอนเก็บเพียงรหัสอาจารย์เพื่ออ้างอิง", q:"รูปแบบการจัดเก็บนี้เป็นแนวทางใด", opts:[{t:"File processing approach",why:"แนวทางนี้เก็บรายละเอียดซ้ำในทุกไฟล์"},{t:"Database approach",why:"เก็บรวมศูนย์ ซ้ำเฉพาะ key ที่ใช้เชื่อม"},{t:"Data warehouse approach",why:"DW รวมข้อมูลหลายแหล่งเพื่อวิเคราะห์"},{t:"Data mart approach",why:"Data mart เป็นคลังย่อยของแผนก"}], ans:1 },
    { type:"choice", story:"ผู้พัฒนาใน Microsoft Access ตั้งค่าฟิลด์ว่าชื่ออะไร เป็นตัวเลขหรือข้อความ และมีคำอธิบายอย่างไร", q:"ที่เก็บคำอธิบายโครงสร้างข้อมูลลักษณะนี้เรียกว่าอะไร", opts:[{t:"ER diagram",why:"เป็นแผนภาพ ไม่ใช่ที่เก็บนิยามฟิลด์"},{t:"Data mart",why:"เป็นคลังข้อมูลย่อยของแผนก"},{t:"Primary key",why:"เป็นฟิลด์ระบุระเบียน"},{t:"Data dictionary",why:"เก็บนิยามและความหมายของข้อมูล หรือ Metadata"}], ans:3 },
    { type:"choice", story:"นักพัฒนาสั่ง ALTER TABLE Student ADD Email เพื่อเพิ่มคอลัมน์ใหม่ลงในตารางที่มีอยู่", q:"คำสั่งนี้จัดอยู่ในกลุ่มภาษา SQL ใด", opts:[{t:"DML",why:"DML ใช้กับตัวข้อมูล เช่น INSERT UPDATE DELETE"},{t:"DCL",why:"ไม่ใช่กลุ่มหลักที่ใช้แยกประเภทในเนื้อหา"},{t:"DDL",why:"ALTER เป็นคำสั่งกำหนดโครงสร้าง เหมือน CREATE และ DROP"},{t:"OLAP",why:"เป็นการวิเคราะห์ข้อมูลหลายมิติ ไม่ใช่ภาษา SQL"}], ans:2 },
    { type:"choice", story:"นักวิเคราะห์เขียน SELECT Name, Salary FROM Employee WHERE Dept = 'HR' เพื่อดึงรายชื่อพนักงาน", q:"ตามบทนี้ SELECT จัดอยู่ในกลุ่มภาษา SQL ใด", opts:[{t:"DDL",why:"DDL ใช้กำหนดโครงสร้าง เช่น CREATE ALTER DROP"},{t:"DML",why:"DML รวมค้นคืนข้อมูลด้วย SELECT พร้อม INSERT UPDATE DELETE"},{t:"DQL",why:"บทนี้ไม่แยกกลุ่มนี้ แต่จัด SELECT ไว้ใน DML"},{t:"ETL",why:"เป็นกระบวนการนำข้อมูลเข้า DW ไม่ใช่กลุ่มคำสั่ง SQL"}], ans:1 },
    { type:"choice", story:"ในฐานข้อมูลบุคลากรที่มีฟิลด์ Employee_ID, Name, SSN, Position, Date_Hired, Gross_Pay, Net_Pay, Life_Insurance, Pension_Benefit, Health_Care ผู้ดูแลสวัสดิการเปิดดูผ่าน Benefits View", q:"เขาจะเห็นฟิลด์ชุดใด", opts:[{t:"Name, SSN, Gross_Pay, Net_Pay",why:"นี่คือฟิลด์ใน Payroll View ของฝ่ายเงินเดือน"},{t:"Employee_ID, Position, Date_Hired",why:"ไม่ใช่ชุดฟิลด์ของ view สวัสดิการ"},{t:"Name, Position, Pension_Benefit",why:"ไม่ใช่ชุดฟิลด์ของ view สวัสดิการ"},{t:"Name, SSN, Health_Care",why:"Benefits View แสดงชื่อ SSN และสิทธิ์ประกันสุขภาพ"}], ans:3 },
    { type:"choice", story:"ทีมไอทีตั้งบัญชีและรหัสผ่านให้นักศึกษาฝึกงานแต่ละคน กำหนดว่าเข้าตารางใดได้บ้าง และตั้งเวลาสำรองฐานข้อมูลทุกคืน", q:"งานนี้อยู่ในหน้าที่หลักข้อใดของ DBMS", opts:[{t:"Create the database",why:"เป็นการสร้างฐานข้อมูลและโครงสร้าง"},{t:"Process the database",why:"เป็นการอ่าน เพิ่ม แก้ ลบ ข้อมูลเอง"},{t:"Administer the database",why:"จัดการผู้ใช้ สิทธิ์ และการสำรองข้อมูลคืองานบริหารฐานข้อมูล"},{t:"Define metadata",why:"เป็นงานในขั้น Create ไม่เกี่ยวกับสิทธิ์"}], ans:2 },
    { type:"blank", text:"ในตารางฐานข้อมูล Row = Record = {1} ส่วน Column = Field = {2}", blanks:[{opts:["Tuple","Entity","Relation","Schema"],ans:0,why:"แถวเรียกว่า record หรือ tuple"},{opts:["Domain","Attribute","Key","Relation"],ans:1,why:"คอลัมน์เรียกว่า field หรือ attribute"}] },
    { type:"choice", story:"ตาราง BOOK ของห้องสมุดมีช่องสำหรับ ISBN ชื่อเรื่อง และผู้แต่งของหนังสือแต่ละเล่ม", q:"ช่องแต่ละช่องในตารางนี้ เรียกตามศัพท์ Relational ว่าอะไร", opts:[{t:"Attribute",why:"คอลัมน์ในตารางคือ attribute ที่อธิบาย entity"},{t:"Tuple",why:"Tuple คือแถวหนึ่งแถว ไม่ใช่คอลัมน์"},{t:"Relation",why:"Relation คือทั้งตาราง"},{t:"Relationship",why:"เป็นการเชื่อมโยงระหว่างตาราง"}], ans:0 },
    { type:"choice", story:"ตารางลูกค้ามีฟิลด์เลขบัตรประชาชน ซึ่งไม่ซ้ำกันเลย และทุกแถวต้องมีค่า ระบบใช้ฟิลด์นี้ชี้ตัวลูกค้าแต่ละคน", q:"ฟิลด์นี้มีบทบาทอะไรในตาราง", opts:[{t:"Foreign key",why:"Foreign key อ้างอิงตารางอื่น และซ้ำได้"},{t:"Primary key",why:"ระบุระเบียนแบบไม่ซ้ำ และห้ามเป็น NULL"},{t:"Metadata",why:"เป็นคำอธิบายโครงสร้าง ไม่ใช่ฟิลด์ระบุแถว"},{t:"Tuple",why:"Tuple คือแถว ไม่ใช่ฟิลด์"}], ans:1 },
    { type:"choice", story:"ตาราง ORDER มีฟิลด์ Customer_ID ที่นำค่าไปตรงกับ Customer_ID ในตาราง CUSTOMER ซึ่งเป็นตัวระบุหลักของตารางนั้น", q:"Customer_ID ในตาราง ORDER จัดเป็นอะไร", opts:[{t:"Tuple",why:"Tuple คือแถวของตาราง"},{t:"Primary key",why:"ตัวระบุหลักของ ORDER คือเลขที่ใบสั่งซื้อ"},{t:"Entity",why:"Entity คือทั้งตาราง"},{t:"Foreign key",why:"เป็นฟิลด์ที่อ้างอิง primary key ของอีกตาราง"}], ans:3 },
    { type:"choice", story:"นักวิเคราะห์วาดผังที่มีกล่อง SUPPLIER, PART และ ORDER พร้อมเส้นเชื่อมแสดงว่าตารางใดสัมพันธ์กับตารางใด", q:"ผังนี้เรียกว่าอะไร", opts:[{t:"Flowchart",why:"แสดงลำดับขั้นตอนการทำงาน ไม่ใช่โครงสร้างข้อมูล"},{t:"Data flow diagram",why:"แสดงการไหลของข้อมูลในกระบวนการ"},{t:"ER diagram",why:"แสดง entity attribute และ relationship"},{t:"Org chart",why:"แสดงโครงสร้างองค์กร"}], ans:2 },
    { type:"choice", story:"ทีมต้องเก็บเอกสาร ภาพ เสียง และวิดีโอปริมาณมหาศาลที่ไม่มีโครงสร้างตายตัว และต้องขยายระบบโดยเพิ่มเครื่องเข้าไปเรื่อยๆ", q:"ตามบทนี้ ฐานข้อมูลแบบใดเหมาะกว่า Relational DBMS", opts:[{t:"Data warehouse",why:"เป็นคลังรวมข้อมูลเพื่อสนับสนุนการตัดสินใจ"},{t:"NoSQL (Non-Relational)",why:"รองรับข้อมูลไม่มีโครงสร้างและขยายแนวนอนได้"},{t:"Data mart",why:"เป็นคลังข้อมูลย่อยของแผนก"},{t:"Microsoft Access",why:"เป็น Relational DBMS ขนาดเล็ก"}], ans:1 },
    { type:"choice", q:"ตามตารางผลิตภัณฑ์ DBMS ในบทนี้ MySQL ผลิตโดยบริษัทใด", opts:[{t:"Oracle Corporation",why:"MySQL และ Oracle Database เป็นของ Oracle"},{t:"Microsoft Corporation",why:"เป็นผู้ผลิต Access และ SQL Server"},{t:"IBM Corporation",why:"เป็นผู้ผลิต DB2 และ Informix"},{t:"Sybase Inc.",why:"เป็นผู้ผลิต Sybase ไม่ใช่ MySQL"}], ans:0 },
    { type:"choice", story:"บริษัทแห่งหนึ่งเก็บข้อมูลของแต่ละแผนกเป็นไฟล์ Excel แยกกัน แผนกใครแผนกมัน", q:"ในวิวัฒนาการการจัดการข้อมูลขององค์กร (Paper, File, Database, Data Warehouse, Data Marts) บริษัทนี้อยู่ขั้นใด", opts:[{t:"Paper",why:"ขั้นนี้ใช้แบบฟอร์มกระดาษ"},{t:"File",why:"ไฟล์แยกตามหน่วยงาน เช่น Excel"},{t:"Database",why:"ขั้นนี้ใช้ DBMS และข้อมูลร่วมกัน"},{t:"Data Warehouse",why:"ขั้นนี้รวมข้อมูลหลายแหล่งไว้วิเคราะห์"}], ans:1 },
    { type:"choice", story:"ห้างสรรพสินค้าแห่งหนึ่งจัดข้อมูลในคลังเป็นกลุ่ม 'ลูกค้า' 'สินค้า' และ 'การขาย' แทนที่จะแยกตามระบบ POS ระบบสต็อก และระบบสมาชิก", q:"นี่คือคุณสมบัติข้อใดของ Data Warehouse", opts:[{t:"Integrated",why:"เป็นเรื่องรวมหลายแหล่งให้เป็นมาตรฐาน"},{t:"Non-volatile",why:"เป็นเรื่องไม่แก้ทับข้อมูลเดิม"},{t:"Subject-oriented",why:"จัดข้อมูลตามหัวข้อธุรกิจ"},{t:"Time-variant",why:"เป็นเรื่องมิติเวลาและข้อมูลย้อนหลัง"}], ans:2 },
    { type:"choice", story:"สาขาเชียงใหม่เก็บเพศเป็น Male/Female ส่วนสาขาภูเก็ตเก็บเป็น M/F ตอนโหลดเข้าคลังข้อมูล ระบบปรับให้เป็น M/F เหมือนกันทั้งหมด", q:"นี่คือคุณสมบัติข้อใดของ Data Warehouse", opts:[{t:"Subject-oriented",why:"เป็นเรื่องจัดตามหัวข้อธุรกิจ"},{t:"Time-variant",why:"เป็นเรื่องเก็บข้อมูลย้อนหลัง"},{t:"Non-volatile",why:"เป็นเรื่องโหลดและอ่านอย่างเดียว"},{t:"Integrated",why:"รวมหลายแหล่งให้อยู่ในรูปแบบมาตรฐานเดียว"}], ans:3 },
    { type:"choice", q:"ข้อใดไม่ใช่คุณสมบัติของ Data Warehouse ตามนิยามของ W.H. Inmon", opts:[{t:"Volatile",why:"DW เป็น non-volatile คือโหลดและอ่านอย่างเดียว"},{t:"Subject-oriented",why:"เป็นคุณสมบัติหนึ่งในนิยาม"},{t:"Integrated",why:"เป็นคุณสมบัติหนึ่งในนิยาม"},{t:"Time-variant",why:"เป็นคุณสมบัติหนึ่งในนิยาม"}], ans:0 },
    { type:"choice", story:"นักวิเคราะห์เปิดดูยอดขายปี 2020 ในคลังข้อมูลแล้วพบว่าแก้ตัวเลขไม่ได้ ระบบอนุญาตให้ดึงข้อมูลดูและโหลดข้อมูลชุดใหม่ต่อท้ายเท่านั้น", q:"นี่คือคุณสมบัติข้อใดของ Data Warehouse", opts:[{t:"Subject-oriented",why:"เป็นเรื่องจัดตามหัวข้อธุรกิจ"},{t:"Integrated",why:"เป็นเรื่องรวมข้อมูลหลายแหล่ง"},{t:"Time-variant",why:"เป็นเรื่องมีมิติเวลา"},{t:"Non-volatile",why:"ข้อมูลที่โหลดแล้วไม่ถูกแก้ไขทับ"}], ans:3 },
    { type:"choice", story:"ผู้บริหารเปิดแดชบอร์ดแล้วเจาะดูยอดขายแยกตามสินค้า ภูมิภาค และเดือน สลับมุมมองไปมาได้ในไม่กี่คลิก", q:"เครื่องมือวิเคราะห์แบบนี้เรียกว่าอะไร", opts:[{t:"OLAP",why:"วิเคราะห์ข้อมูลหลายมิติจาก DW"},{t:"ETL",why:"เป็นกระบวนการนำข้อมูลเข้า DW"},{t:"DBMS",why:"เป็นซอฟต์แวร์จัดการฐานข้อมูล"},{t:"ER diagram",why:"เป็นแผนภาพโครงสร้างข้อมูล"}], ans:0 },
    { type:"choice", story:"ฝ่ายการเงินต้องการคลังข้อมูลสำหรับวิเคราะห์เฉพาะงานของฝ่ายให้เสร็จภายในไม่กี่เดือน โดยไม่รอโครงการข้อมูลระดับบริษัทที่ใช้เวลาหลายปี", q:"ฝ่ายการเงินควรสร้างอะไร", opts:[{t:"Operational database",why:"รองรับงานประจำวัน ไม่ใช่เพื่อวิเคราะห์"},{t:"Data mart",why:"ขนาดเล็กเฉพาะแผนก สร้างเสร็จเร็ว"},{t:"Enterprise data warehouse",why:"ครอบคลุมทั้งองค์กร สร้างนานเป็นปี"},{t:"NoSQL cluster",why:"เหมาะกับข้อมูลหลากหลายขนาดใหญ่ ไม่ใช่งานแผนก"}], ans:1 },
    { type:"choice", story:"ทุกคืนทีมไอทีเอาข้อมูลจากระบบขาย ระบบผลิต และแหล่งภายนอกมาปรับให้เป็นรูปแบบเดียวกัน ก่อนนำเข้าคลังข้อมูล", q:"ขั้นตอนระหว่างแหล่งข้อมูลกับ DW เรียกว่าอะไร", opts:[{t:"Query and report",why:"เป็นขั้นผู้ใช้ดึงข้อมูลจาก DW ไปใช้"},{t:"Data mining",why:"เป็นการค้นหารูปแบบจากข้อมูลใน DW"},{t:"Extract and Transform",why:"ดึงข้อมูลแล้วแปลงก่อนเข้า DW"},{t:"OLAP",why:"เป็นการวิเคราะห์หลายมิติหลังข้อมูลอยู่ใน DW"}], ans:2 },
    { type:"choice", story:"ฝ่ายขายใช้ตารางสรุปยอดขายที่ถูกตัดมาจากคลังข้อมูลกลางขององค์กรอีกที", q:"ตารางสรุปนี้เป็นแนวทางสร้างแบบใด", opts:[{t:"Independent data mart",why:"แบบนี้ดึงจากแหล่งข้อมูลโดยตรง ไม่ผ่านคลังกลาง"},{t:"Operational database",why:"รองรับงานประจำวัน ไม่ใช่ข้อมูลสรุปเพื่อวิเคราะห์"},{t:"File processing",why:"เป็นระบบแฟ้มแยกไฟล์ตามโปรแกรม"},{t:"Dependent data mart",why:"สร้างต่อจาก Data Warehouse กลาง"}], ans:3 },
    { type:"choice", story:"บริษัทแห่งหนึ่งยังไม่มีคลังกลาง แต่ละแผนกสร้างคลังข้อมูลของตนเองโดยดึงจากระบบงานต้นทางโดยตรง", q:"คลังข้อมูลของแผนกเหล่านี้เป็นแบบใด", opts:[{t:"Independent data mart",why:"สร้างเองจากแหล่งต้นทาง ไม่ผ่านคลังกลาง"},{t:"Dependent data mart",why:"แบบนี้ต้องมาจาก DW กลางก่อน"},{t:"Enterprise data warehouse",why:"แบบนี้มีคลังกลางทั้งองค์กรหนึ่งแห่ง"},{t:"Relational view",why:"เป็นมุมมองข้อมูลภายในฐานข้อมูล ไม่ใช่คลัง"}], ans:0 },
    { type:"match", q:"จับคู่ขั้นการจัดการข้อมูลกับลักษณะเด่น", pairs:[["Paper","แบบฟอร์มแมนนวล ค้นหายาก"],["File","แยกตามโปรแกรมหรือหน่วยงาน"],["Database","ใช้ร่วมกันผ่าน DBMS"],["Data Warehouse","รวมหลายแหล่งไว้วิเคราะห์"],["Data Marts","ส่วนย่อยเฉพาะหน่วยธุรกิจ"]], why:"วิวัฒนาการ: Paper → File → Database → Data Warehouse → Data Marts" },
    { type:"multi", story:"ฝ่ายไอทีรวบรวมรายการซอฟต์แวร์ที่บริษัทใช้อยู่", q:"เลือกทุกข้อที่เป็น DBMS", opts:[{t:"MySQL",ok:true,why:"เป็น DBMS ของ Oracle"},{t:"Tableau",ok:false,why:"เป็นเครื่องมือ BI ไม่ใช่ DBMS"},{t:"IBM DB2",ok:true,why:"เป็น DBMS ของ IBM"},{t:"Salesforce",ok:false,why:"เป็นระบบ CRM"},{t:"Microsoft Access",ok:true,why:"เป็น DBMS ของ Microsoft"}] },
    { type:"multi", story:"ผู้จัดการไอทีสรุปว่าการเปลี่ยนมาใช้ DBMS ช่วยแก้ปัญหาของระบบแฟ้มข้อมูลได้อย่างไรบ้าง", q:"เลือกทุกข้อที่ถูกต้อง", opts:[{t:"ลดการเก็บข้อมูลเดียวกันซ้ำหลายที่",ok:true,why:"DBMS ควบคุม redundancy"},{t:"กำหนดสิทธิ์ผู้ใช้จากส่วนกลาง",ok:true,why:"จัดการ security แบบรวมศูนย์"},{t:"เก็บข้อมูลย้อนหลัง 5-10 ปีให้ผู้บริหาร",ok:false,why:"นั่นคือ time-variant ของ Data Warehouse"},{t:"แก้โครงสร้างข้อมูลโดยไม่ต้องแก้โปรแกรม",ok:true,why:"กำจัด program-data dependency"},{t:"ห้ามแก้ข้อมูลที่โหลดเข้าแล้วทุกกรณี",ok:false,why:"นั่นคือ non-volatile ของ DW"}] }
  ]
});
