IOT.reg({
  id: "sdlc",
  title: "การพัฒนาระบบและการเปลี่ยนแปลงองค์กร + การตัดสินใจ (Systems Development, Organizational Change & Decision Making)",
  th: "ISD และ 5 องค์ประกอบ, การเปลี่ยนแปลงองค์กร 4 แบบ (Automation-Paradigm shift), ประเภทและกระบวนการตัดสินใจ, Mintzberg roles และ ESS/MIS/TPS/DSS",
  summary: `
<h4>1) Information Systems Development (ISD)</h4>
<ul>
<li><b>ISD</b> = กระบวนการสร้างและบำรุงรักษาระบบสารสนเทศ: Systems Analysis → Systems Design → Programming/Development → Testing → Conversion → Production and Maintenance</li>
<li>IS ไม่ใช่แค่โปรแกรม: ประกอบด้วย <b>5 องค์ประกอบ = Hardware | Software | Data | Procedures | People</b></li>
<li>Business process <b>อาจมีได้โดยไม่มี IS</b>; IS มัก<b>สนับสนุน ≥1 business process</b>; IS ทุกระบบมี <b>≥1 application/software</b></li>
<li>ตัวอย่าง Ordering process: Prepare Quotation (CRM) → Verify Availability (Inventory IS) → Check Customer Credit (Customer Credit IS) → Approve Special Terms → Process Order (Shipping IS)</li>
</ul>
<h4>2) Organizational Change enabled by IS: 4 รูปแบบ</h4>
<table>
<tr><th>รูปแบบ</th><th>ความหมาย</th><th>ตัวอย่างในสไลด์</th></tr>
<tr><td>1. Automation</td><td>ทำงาน manual ให้อัตโนมัติ ช่วยพนักงานทำงานมีประสิทธิภาพขึ้น</td><td>ระบบคำนวณราคาอัตโนมัติ, ค้นประวัติลูกค้าจากฐานข้อมูล / โรงแรม: ระบบบันทึกการจอง</td></tr>
<tr><td>2. Rationalization of procedures</td><td>ปรับ/ลดขั้นตอนที่ไม่จำเป็นใน <b>SOP</b></td><td>เปิดบัญชีธนาคารด้วย Smart Card / โรงแรม: เช็กอิน 3-4 ขั้นเหลือ 1-2</td></tr>
<tr><td>3. Business process redesign (BPR)</td><td>วิเคราะห์ ปรับปรุง ออกแบบกระบวนการใหม่ทั้งเส้น (end-to-end) รวมขั้นตอน ลดซ้ำซ้อน</td><td>Ford procurement (EDI, invoiceless) / โรงแรม: ลูกค้าจอง+เช็กอินเอง</td></tr>
<tr><td>4. Paradigm shift</td><td>คิดธุรกิจใหม่ สร้าง business model ใหม่ เปลี่ยนบทบาทองค์กร</td><td>Schneider National: ขนส่ง → Logistics &amp; Freight Mgmt / โรงแรม: เช่ารายคืน → พักระยะยาว</td></tr>
</table>
<ul>
<li><b>SOP</b> = เอกสารกำหนดขั้นตอน วิธีการ ลำดับการปฏิบัติงานมาตรฐาน เพื่อให้ทำงานสม่ำเสมอ ถูกต้อง</li>
<li><b>Routines</b> (กฎ/ขั้นตอน/แนวปฏิบัติสำหรับงานซ้ำๆ) → <b>Business process</b> (กลุ่ม routines ที่ทำงานร่วมกันเพื่อเป้าหมายธุรกิจ) → <b>Business firm</b> (กลุ่ม business processes ที่เชื่อมโยงกัน)</li>
<li>Ford: เดิม purchase order + ใบรับสินค้า + ใบแจ้งหนี้ ใช้เจ้าหน้าที่ AP ~<b>500</b> คน → ใช้ <b>EDI + Invoiceless processing</b> เหลือ ~<b>125</b> คน</li>
<li><b>Risk vs Return</b>: Automation และ Rationalization = ช้า ผลตอบแทนพอประมาณ เสี่ยงต่ำ (พบบ่อยที่สุด); Redesign และ Paradigm shift = ผลตอบแทนสูง แต่โอกาสล้มเหลวสูง (ลำดับ 1→4 เสี่ยง/ผลตอบแทนเพิ่มขึ้น)</li>
</ul>
<h4>3) Enhancing Decision Making</h4>
<ul>
<li>Business value: การตัดสินใจ "เล็กๆ" ทำซ้ำหลายร้อย/พันครั้งต่อปี รวมเป็นมูลค่ามาก (Table 12-1: จำนวนครั้ง/ปี x มูลค่าต่อครั้ง = มูลค่าต่อปี เช่น 365 x $5,000 = $1,825,000)</li>
<li><b>Unstructured</b> (ใหม่ ซับซ้อน ไม่ใช่งานประจำ ไม่มีกฎชัด ต้องใช้วิจารณญาณ) | <b>Structured</b> (ซ้ำ routine มีกฎ/ขั้นตอนชัด) | <b>Semistructured</b> (บางส่วนมีกฎ บางส่วนต้องใช้วิจารณญาณ; IS ช่วยวิเคราะห์แต่ไม่ตัดสินแทนทั้งหมด)</li>
<li>ระดับ: <b>Senior mgmt → Unstructured</b> (เข้าตลาดใหม่?, อนุมัติงบลงทุน, เป้าหมายระยะยาว) | <b>Middle mgmt → Semistructured</b> (แผนการตลาด, งบแผนก, เว็บไซต์องค์กร; ทำไมยอดสั่งซื้อใน Minneapolis ลด?) | <b>Operational → Structured</b> (สิทธิ์ OT, เติมสต็อก, ให้สินเชื่อ, ข้อเสนอพิเศษ)</li>
<li><b>4 ขั้นตัดสินใจ</b>: Intelligence (ปัญหาคืออะไร) → Design (ทางแก้มีอะไรบ้าง) → Choice (ทางไหนดีที่สุด) → Implementation (ได้ผลไหม ทำให้ดีขึ้นได้ไหม) มีลูกศรย้อนกลับได้</li>
</ul>
<h4>4) Managerial Roles</h4>
<ul>
<li><b>Classical 5 functions</b>: Planning, Organizing, Coordinating, Deciding, Controlling</li>
<li><b>Behavioral models</b>: งานจริงไม่เป็นระบบ/ทางการเท่า ต้องตอบสนองสถานการณ์มาก มีเวลาสะท้อนคิดน้อย งานแตกเป็นชิ้นๆ</li>
<li><b>Mintzberg 10 roles</b>: Interpersonal = Figurehead, Leader, Liaison | Informational = Monitor/Nerve center, Disseminator, Spokesperson | Decisional = Entrepreneur, Disturbance handler, Resource allocator, Negotiator</li>
<li><b>Table 12.2 ระบบที่สนับสนุน</b>: Figurehead = Telepresence | Leader = Telepresence, social networks, Twitter | Liaison = Smartphones, social networks | Nerve center = MIS, executive support systems | Disseminator = E-mail, social networks | Spokesperson = Webinars, telepresence | Entrepreneur, Disturbance handler, Negotiator = <b>None exist</b> | Resource allocator = <b>BI, DSS</b></li>
<li><b>Real-world</b>: IT ไม่ได้รับประกันว่าตัดสินใจดีขึ้น เพราะ <b>Information quality</b>, <b>Management filters</b>, <b>Organizational culture and politics</b></li>
</ul>
<h4>5) IS ที่สนับสนุนแต่ละระดับ</h4>
<ul>
<li><b>Senior mgmt → ESS</b>: Unstructured, ภาพรวม/แนวโน้ม/ตัวชี้วัด/ปัจจัยภายนอก</li>
<li><b>Operational → TPS</b>: บันทึก/ประมวลผลธุรกรรมประจำวัน ให้ข้อมูลสำหรับ Structured decisions</li>
<li><b>Middle mgmt → MIS</b> (รับข้อมูลจาก TPS): Routine / Exception / KPI Reports; ติดตาม ควบคุม ตัดสินใจทั้ง Structured และ Semistructured</li>
<li><b>Super user / business analysts → DSS</b>: Semistructured, วิเคราะห์ซับซ้อน, สร้าง/ปรับแต่ง/วิเคราะห์ข้อมูลเอง</li>
</ul>
`,
  sections: [{"t":"Information Systems Development และ 5 องค์ประกอบของ IS","ref":"สไลด์ 1-2","html":"\n<h4>Information Systems Development (ISD) คืออะไร</h4>\n<p><b>ISD</b> คือ <b>กระบวนการสร้างและบำรุงรักษาระบบสารสนเทศ</b> (The process of creating and maintaining information systems) ไม่ใช่แค่เขียนโปรแกรมครั้งเดียวแล้วจบ แต่ต้องดูแลต่อหลังใช้งานจริงด้วย</p>\n<p>กิจกรรมหลัก (Key activities) เรียงตามลำดับ:</p>\n<ol>\n<li><b>Systems Analysis</b> - ศึกษาปัญหาและความต้องการของผู้ใช้/องค์กร</li>\n<li><b>Systems Design</b> - ออกแบบระบบว่าจะทำงานอย่างไร</li>\n<li><b>Programming / Development</b> - เขียนโปรแกรมหรือพัฒนาระบบตามแบบ</li>\n<li><b>Testing</b> - ทดสอบว่าระบบทำงานถูกต้อง</li>\n<li><b>Conversion</b> - เปลี่ยนจากระบบเก่าไปใช้ระบบใหม่</li>\n<li><b>Production and Maintenance</b> - ใช้งานจริงและดูแลปรับปรุงต่อเนื่อง</li>\n</ol>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>ISD 6 กิจกรรม: Systems Analysis, Systems Design, Programming/Development, Testing, Conversion, Production and Maintenance</li>\n<li>Information systems <b>ไม่ใช่แค่ computer programs</b></li>\n</ul></div>\n<h4>5 องค์ประกอบของ Information System</h4>\n<p>IS ประกอบด้วย 5 องค์ประกอบ ซึ่งผสานกันเพื่อ <b>สนับสนุนกิจกรรมขององค์กรและการตัดสินใจ</b> (support organizational activities and decision making):</p>\n<table>\n<tr><th>องค์ประกอบ</th><th>คืออะไร</th></tr>\n<tr><td>Hardware</td><td>อุปกรณ์ เช่น คอมพิวเตอร์ เซิร์ฟเวอร์ เครื่องพิมพ์</td></tr>\n<tr><td>Software</td><td>โปรแกรม/แอปพลิเคชัน</td></tr>\n<tr><td>Data</td><td>ข้อมูลที่ระบบจัดเก็บและประมวลผล</td></tr>\n<tr><td>Procedures</td><td>ขั้นตอน/กฎ/คู่มือการใช้งานและการทำงาน</td></tr>\n<tr><td>People</td><td>ผู้ใช้ ผู้ดูแล ผู้พัฒนาระบบ</td></tr>\n</table>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul><li>5 องค์ประกอบ: <b>Hardware | Software | Data | Procedures | People</b></li></ul></div>\n<p>สไลด์แสดงเป็นแถบ 5 ช่องสีต่างกันเรียงต่อกัน ใต้แถบมีวงเล็บปีกกาครอบทั้งหมดว่า \"Five Components of an Information System\"</p>"},
{"t":"Business Process, Information System และ Application ต่างและเกี่ยวข้องกันอย่างไร","ref":"สไลด์ 3-4","html":"\n<h4>ความสัมพันธ์ 3 อย่าง</h4>\n<p>Business processes, Information Systems และ Applications <b>มีลักษณะและองค์ประกอบแตกต่างกัน</b> (different characteristics and components) แต่เกี่ยวข้องกัน:</p>\n<ul>\n<li><b>Business process</b> ไม่จำเป็นต้องเชื่อมโยงกับระบบสารสนเทศใดๆ - A business process <b>may exist without an information system</b> (เช่น ร้านรับออเดอร์ด้วยการจดสมุดก็ยังเป็นกระบวนการธุรกิจ)</li>\n<li>แต่ <b>information system หนึ่งๆ มักสนับสนุนอย่างน้อย 1 กระบวนการทางธุรกิจ</b> (typically supports one or more business processes)</li>\n<li><b>ระบบสารสนเทศแต่ละระบบมีอย่างน้อย 1 application/ซอฟต์แวร์</b> (Every information system has at least one application/software)</li>\n</ul>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Business process อาจไม่มี IS ก็ได้</li>\n<li>IS มักสนับสนุน business process ≥ 1 กระบวนการ</li>\n<li>IS ทุกระบบมี application/software ≥ 1 ตัว</li>\n</ul></div>\n<h4>Business Processes and Information Systems ทำงานร่วมกันอย่างไร (ตัวอย่าง Ordering Business Process)</h4>\n<p>รูปแสดงลูกค้าส่งคำขอเข้ามา แล้วกระบวนการทางธุรกิจ (กล่องสีฟ้า เรียงเป็นขั้นบันได) แต่ละขั้นมี IS (รูปหกเหลี่ยม) ช่วยสนับสนุน:</p>\n<div class=\"dg\"><div class=\"dgt\">🖼️ Ordering Business Process กับ Information Systems</div>\n<svg viewBox=\"0 0 700 300\" xmlns=\"http://www.w3.org/2000/svg\">\n<text class=\"t b\" x=\"20\" y=\"22\">Business Process</text><text class=\"t b\" x=\"470\" y=\"22\">Information Systems</text>\n<rect class=\"bx\" x=\"20\" y=\"35\" width=\"170\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"105\" y=\"58\" text-anchor=\"middle\">Prepare Quotation</text>\n<rect class=\"bx ok\" x=\"470\" y=\"35\" width=\"190\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"565\" y=\"58\" text-anchor=\"middle\">CRM</text>\n<line class=\"ln\" x1=\"190\" y1=\"53\" x2=\"470\" y2=\"53\"/>\n<rect class=\"bx\" x=\"20\" y=\"90\" width=\"170\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"105\" y=\"113\" text-anchor=\"middle\">Verify Availability</text>\n<rect class=\"bx ok\" x=\"470\" y=\"90\" width=\"190\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"565\" y=\"113\" text-anchor=\"middle\">Inventory IS</text>\n<line class=\"ln\" x1=\"190\" y1=\"108\" x2=\"470\" y2=\"108\"/>\n<rect class=\"bx\" x=\"20\" y=\"145\" width=\"170\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"105\" y=\"168\" text-anchor=\"middle\">Check Customer Credit</text>\n<rect class=\"bx ok\" x=\"470\" y=\"145\" width=\"190\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"565\" y=\"168\" text-anchor=\"middle\">Customer Credit IS</text>\n<line class=\"ln\" x1=\"190\" y1=\"163\" x2=\"470\" y2=\"163\"/>\n<rect class=\"bx\" x=\"20\" y=\"200\" width=\"170\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"105\" y=\"223\" text-anchor=\"middle\">Approve Special Terms</text>\n<text class=\"t sm\" x=\"565\" y=\"223\" text-anchor=\"middle\">(ขั้นนี้ในรูปไม่มี IS)</text>\n<rect class=\"bx\" x=\"20\" y=\"255\" width=\"170\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"105\" y=\"278\" text-anchor=\"middle\">Process Order</text>\n<rect class=\"bx ok\" x=\"470\" y=\"255\" width=\"190\" height=\"36\" rx=\"6\"/><text class=\"t sm\" x=\"565\" y=\"278\" text-anchor=\"middle\">Shipping IS</text>\n<line class=\"ln\" x1=\"190\" y1=\"273\" x2=\"470\" y2=\"273\"/>\n</svg></div>\n<ul>\n<li>Prepare Quotation (จัดทำใบเสนอราคา) - ใช้ <b>CRM</b></li>\n<li>Verify Availability (ตรวจสอบสินค้าพร้อมขาย) - ใช้ <b>Inventory IS</b></li>\n<li>Check Customer Credit (ตรวจเครดิตลูกค้า) - ใช้ <b>Customer Credit IS</b></li>\n<li>Approve Special Terms (อนุมัติเงื่อนไขพิเศษ) - ทำโดยคน ไม่มี IS ในรูป</li>\n<li>Process Order (ดำเนินการสั่งซื้อ) - ใช้ <b>Shipping IS</b> ก่อนส่งสินค้าไปยังลูกค้า</li>\n</ul>\n<div class=\"note\"><b>💡 หมายเหตุ</b> หนึ่ง business process อาจใช้หลาย IS ร่วมกัน และ IS หนึ่งระบบก็อาจรองรับหลาย process ได้</div>"},
{"t":"Organizational Change ที่เกิดจาก IS: 4 รูปแบบ","ref":"สไลด์ 5","html":"\n<h4>การเปลี่ยนแปลงองค์กรที่เกิดจากการนำระบบสารสนเทศมาใช้</h4>\n<p><b>Organizational Change Enabled by Information Systems</b> สามารถแบ่งได้เป็น <b>4 รูปแบบ</b> เรียงจากเปลี่ยนน้อยไปมาก:</p>\n<ol>\n<li>การปรับเปลี่ยนระบบงานเดิมให้เป็นระบบงานอัตโนมัติ (<b>Automation</b>)</li>\n<li>การปรับกระบวนยุทธ์ (<b>Rationalization of procedures</b>)</li>\n<li>การออกแบบกระบวนการทางธุรกิจใหม่ (<b>Business process redesign</b>)</li>\n<li>การเปลี่ยนแปลงกระบวนทัศน์ (<b>Paradigm shifts</b>)</li>\n</ol>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul><li>4 รูปแบบ: Automation → Rationalization of procedures → Business process redesign → Paradigm shifts</li></ul></div>\n<p>ส่วนถัดไปจะอธิบายแต่ละแบบพร้อมตัวอย่าง</p>"},
{"t":"Automation และ Rationalization of procedures","ref":"สไลด์ 6","html":"\n<h4>1. Automation (การปรับระบบงานเดิมให้เป็นอัตโนมัติ)</h4>\n<ul>\n<li>ช่วยให้พนักงานปฏิบัติงานได้อย่างมี<b>ประสิทธิภาพและประสิทธิผล</b> (Helps employees perform tasks more efficiently and effectively)</li>\n<li>ทำงานที่เคยทำแบบ <b>Manual</b> ให้เป็นอัตโนมัติ (Automates manual tasks)</li>\n<li><b>ตัวอย่าง:</b> ระบบคำนวณสิ่งต่างๆ อัตโนมัติ เช่น ระบบคำนวณราคาอัตโนมัติ, ระบบค้นประวัติลูกค้าจากฐานข้อมูลแทนการค้นหาแฟ้มเอกสาร</li>\n</ul>\n<h4>2. Rationalization of procedures (การปรับกระบวนยุทธ์)</h4>\n<ul>\n<li>คือ การเปลี่ยนแปลง การปรับปรุงและจัดลำดับขั้นตอนการทำงานให้มีประสิทธิภาพมากขึ้น</li>\n<li>ปรับปรุงกระบวนการทำงานและ<b>ลดขั้นตอนที่ไม่จำเป็น</b>ใน <b>ขั้นตอนการปฏิบัติงานมาตรฐาน (SOP)</b> (Streamlines procedures and eliminates unnecessary steps in Standard Operating Procedure)</li>\n<li><b>ตัวอย่าง:</b> เปิดบัญชีธนาคารใหม่โดยใช้ <b>Smart Card</b> ดึงข้อมูลลูกค้าเข้าสู่ระบบ ลดการกรอกข้อมูลด้วยตนเองและขั้นตอนที่ซ้ำซ้อน</li>\n</ul>\n<div class=\"warn\"><b>⚠️ ระวัง</b> Automation = เอางาน manual เดิมไปให้เครื่องทำ (ขั้นตอนเดิม) ส่วน Rationalization = ตัด/จัดขั้นตอนใน SOP ให้กระชับ ข้อสอบมักให้ตัวอย่างแล้วถามว่าเป็นแบบไหน: \"ใช้เครื่องทำแทน\" = Automation, \"ตัดขั้นตอนซ้ำ\" = Rationalization</div>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Automation: ตัวอย่างระบบคำนวณราคาอัตโนมัติ, ค้นประวัติลูกค้าในฐานข้อมูล</li>\n<li>Rationalization: ตัวอย่างเปิดบัญชีด้วย Smart Card</li>\n</ul></div>"},
{"t":"Standard Operating Procedure (SOP)","ref":"สไลด์ 7","html":"\n<h4>SOP คืออะไร</h4>\n<ul>\n<li>เป็น<b>เอกสารที่เขียนวิธีการปฏิบัติงานต่างๆ</b> เพื่อให้องค์กรมีการปฏิบัติงานอย่างถูกต้องและมีทิศทางเดียวกันทั้งหมด โดยระบุขั้นตอนการปฏิบัติงานที่ชัดเจน</li>\n<li>เป็นเอกสารที่กำหนด <b>ขั้นตอน วิธีการ และลำดับการปฏิบัติงานมาตรฐาน</b> เพื่อให้บุคลากรสามารถทำงานได้อย่างสม่ำเสมอและถูกต้อง</li>\n</ul>\n<h4>ตัวอย่างหน้า SOP ในสไลด์ (Client Onboarding Process)</h4>\n<p>รูปตัวอย่างเอกสาร SOP พร้อมป้ายกำกับส่วนประกอบ:</p>\n<ul>\n<li><b>Title</b> - ชื่อเอกสาร (Standard Operating Procedure: Client Onboarding Process)</li>\n<li><b>Department / Date &amp; ID</b> - แผนก วันที่ และรหัสเอกสาร (เช่น Operations, SOP #AS-0013)</li>\n<li><b>Department Head Approval</b> - หัวหน้าแผนกลงนามอนุมัติ</li>\n<li><b>Purpose</b> - วัตถุประสงค์ ให้ผู้ใช้อ้างอิงได้เร็วโดยไม่ต้องอ่านทั้งเอกสาร</li>\n<li><b>Definitions</b> - อธิบายศัพท์เฉพาะ (jargon) เช่น RM: Resource Management, PO: Purchase Order</li>\n<li><b>Procedure</b> - คำสั่งแบบ step-by-step ครบถ้วน (เช่น 1. Client Relationship Manager แนะนำ Account Manager ผ่าน Zoom 2. ส่ง kickoff email 3. นัด kickoff call เพื่อทบทวนเอกสารและตั้งเป้าหมายโครงการ)</li>\n</ul>\n<div class=\"note\"><b>💡 หมายเหตุ</b> SOP คือ \"สิ่งที่ Rationalization of procedures ไปปรับปรุง\" - ถ้าลดขั้นตอนใน SOP ให้กระชับ = Rationalization</div>"},
{"t":"Business Process Redesign (BPR)","ref":"สไลด์ 8","html":"\n<h4>3. Business Process Redesign (การออกแบบกระบวนการทางธุรกิจใหม่)</h4>\n<ul>\n<li><b>วิเคราะห์ ปรับปรุง และออกแบบ</b>กระบวนการทางธุรกิจใหม่ (Analyze, improve, and redesign business processes)</li>\n<li><b>จัดรูปแบบการดำเนินงานใหม่</b> รวมขั้นตอน ลดความซ้ำซ้อน และกำจัดขั้นตอนที่ไม่จำเป็น (Reorganize workflows, combine steps, reduce duplication, and eliminate unnecessary steps)</li>\n<li><b>มุ่งเปลี่ยนแปลงกระบวนการตั้งแต่ต้นจนจบ</b> (Focuses on redesigning the <b>end-to-end</b> business process)</li>\n<li><b>ตัวอย่าง:</b> Figure 1 กระบวนการจัดซื้อของบริษัทฟอร์ดมอเตอร์ (ดูรายละเอียดสไลด์ 11)</li>\n</ul>\n<div class=\"warn\"><b>⚠️ ระวัง</b> Rationalization ปรับขั้นตอนใน SOP เดิมให้กระชับ ส่วน BPR รื้อและออกแบบ<b>ทั้งกระบวนการ end-to-end</b> ใหม่ (รวมขั้นตอน/ตัดซ้ำซ้อนทั้งเส้น) ขอบเขตกว้างกว่า</div>"},
{"t":"Routines, Business Processes และ Business Firms","ref":"สไลด์ 9-10","html":"\n<h4>3 ระดับ: Routines → Business processes → Business firms</h4>\n<ul>\n<li><b>Routines</b> - กฎ ขั้นตอน และแนวปฏิบัติที่กำหนดไว้สำหรับจัดการสถานการณ์และงานที่เกิดซ้ำ (Established rules, procedures, and practices for handling recurring situations and tasks) = รูปแบบพฤติกรรมของบุคคล (patterns of individual behavior)</li>\n<li><b>Business processes</b> - ชุดของ routines ที่เกี่ยวข้องกันและทำงานร่วมกันเพื่อบรรลุวัตถุประสงค์ทางธุรกิจเฉพาะอย่างหนึ่ง (A set of related routines that work together to accomplish a specific business objective)</li>\n<li><b>Business firms</b> - กลุ่มของ business processes ที่เชื่อมโยงกัน (A collection of interconnected business processes)</li>\n</ul>\n<div class=\"dg\"><div class=\"dgt\">🖼️ Routines, Business Processes, and Firms</div>\n<svg viewBox=\"0 0 700 170\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect class=\"bx\" x=\"15\" y=\"55\" width=\"150\" height=\"55\" rx=\"6\"/><text class=\"t b\" x=\"90\" y=\"78\" text-anchor=\"middle\">Individual</text><text class=\"t b\" x=\"90\" y=\"98\" text-anchor=\"middle\">Routines</text>\n<line class=\"ln\" x1=\"165\" y1=\"82\" x2=\"250\" y2=\"82\"/>\n<rect class=\"bx hd\" x=\"250\" y=\"15\" width=\"150\" height=\"38\" rx=\"6\"/><text class=\"t sm\" x=\"325\" y=\"39\" text-anchor=\"middle\">Business Process 1</text>\n<rect class=\"bx hd\" x=\"250\" y=\"66\" width=\"150\" height=\"38\" rx=\"6\"/><text class=\"t sm\" x=\"325\" y=\"90\" text-anchor=\"middle\">Business Process 2</text>\n<rect class=\"bx hd\" x=\"250\" y=\"117\" width=\"150\" height=\"38\" rx=\"6\"/><text class=\"t sm\" x=\"325\" y=\"141\" text-anchor=\"middle\">Business Process N</text>\n<line class=\"ln\" x1=\"400\" y1=\"82\" x2=\"480\" y2=\"82\"/>\n<rect class=\"bx ok\" x=\"480\" y=\"45\" width=\"200\" height=\"75\" rx=\"6\"/><text class=\"t b\" x=\"580\" y=\"88\" text-anchor=\"middle\">Business Firm</text>\n</svg></div>\n<p>กล่องข้อความในสไลด์สรุปว่า: องค์กรทั้งหมดประกอบด้วย routines และพฤติกรรมของแต่ละบุคคล กลุ่มของ routines ประกอบเป็น business process และกลุ่มของ business processes ประกอบเป็น business firm</p>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul><li>Routines (พฤติกรรม/ขั้นตอนประจำรายบุคคล) → Business process (กลุ่ม routines เพื่อเป้าหมายหนึ่ง) → Business firm (กลุ่ม processes)</li></ul></div>"},
{"t":"ตัวอย่าง BPR: กระบวนการจัดซื้อของ Ford Motor Company","ref":"สไลด์ 11","html":"\n<h4>Ford Motor Company's Procurement Process</h4>\n<p>สไลด์เปรียบเทียบ <b>ก่อน</b> และ <b>หลัง</b> การออกแบบกระบวนการจัดซื้อใหม่:</p>\n<table>\n<tr><th></th><th>ก่อน (เดิม)</th><th>หลัง (BPR)</th></tr>\n<tr><td>กระบวนการ</td><td>ฝ่ายจัดซื้อออก <b>Purchase order</b> (ใบสั่งซื้อ) ส่งให้ผู้ขาย → ผู้ขายส่งสินค้าพร้อมใบส่งของ → ฝ่ายรับสินค้ารับของและออกใบรับสินค้า → เอกสารทั้งหมดไปที่ฝ่ายบัญชีเจ้าหนี้เพื่อจับคู่/ตรวจสอบ</td><td>ฝ่ายจัดซื้อส่งข้อมูลผ่าน <b>Electronic Data Interchange (EDI)</b> ไปยังผู้ขาย มี<b>ฐานข้อมูล</b>กลาง ฝ่ายรับสินค้าบันทึกการรับในระบบ แล้วจ่ายเงินได้เลยแบบ <b>Invoiceless processing</b> (ไม่ต้องใช้ใบแจ้งหนี้)</td></tr>\n<tr><td>ฝ่ายบัญชีเจ้าหนี้</td><td>มีพนักงานประมาณ <b>500 คน</b></td><td>มีพนักงานประมาณ <b>125 คน</b></td></tr>\n</table>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Ford = ตัวอย่าง <b>Business Process Redesign</b></li>\n<li>เครื่องมือ: <b>EDI</b> + <b>Invoiceless processing</b></li>\n<li>พนักงานฝ่ายบัญชีเจ้าหนี้ ~500 → ~125 คน</li>\n</ul></div>\n<div class=\"note\"><b>💡 หมายเหตุ</b> เหตุที่ลดคนได้มาก เพราะตัดขั้นตอนการจับคู่เอกสารและตรวจใบแจ้งหนี้ออกทั้งกระบวนการ ไม่ใช่แค่ทำเอกสารเดิมให้เร็วขึ้น จึงเป็น BPR ไม่ใช่ Automation</div>"},
{"t":"Paradigm Shifts","ref":"สไลด์ 12","html":"\n<h4>4. Paradigm shifts (การเปลี่ยนแปลงกระบวนทัศน์)</h4>\n<p>คือการเปลี่ยนกรอบแนวคิด วิธีปฏิบัติ และรูปแบบการดำเนินธุรกิจ</p>\n<ul>\n<li>คิดลักษณะการประกอบธุรกิจใหม่ (Rethink the nature of the business)</li>\n<li>กำหนดรูปแบบธุรกิจใหม่ (Define a new business model)</li>\n<li>เปลี่ยนบทบาทและรูปแบบการดำเนินงานขององค์กร (Change the organization's role and way of doing business)</li>\n<li>เปลี่ยนแปลงแนวคิดพื้นฐานในการสร้างและส่งมอบคุณค่าให้แก่ลูกค้า โดยไม่ยึดติดกับรูปแบบธุรกิจเดิม</li>\n<li><b>ตัวอย่าง: Schneider National</b> เดิมเน้นธุรกิจขนส่งสินค้า ขยายสู่ธุรกิจ <b>Logistics</b> และ <b>Freight Management</b> โดยใช้เทคโนโลยีสารสนเทศ เพื่อบริหารจัดการการขนส่งและ <b>Supply Chain</b> ให้แก่ลูกค้า เช่น บริษัทขนส่งอื่นๆ</li>\n</ul>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul><li>Paradigm shift = เปลี่ยนธุรกิจ/business model ทั้งหมด ตัวอย่าง Schneider National (ขนส่ง → Logistics &amp; Freight Management)</li></ul></div>"},
{"t":"ตัวอย่างทั้ง 4 แบบ: โรงแรม","ref":"สไลด์ 13","html":"\n<h4>คำถาม: อธิบาย organizational change แต่ละแบบที่ IT ทำให้เกิดขึ้น พร้อมตัวอย่างในโรงแรม</h4>\n<table>\n<tr><th>ประเภท</th><th>ตัวอย่างในโรงแรม</th></tr>\n<tr><td><b>1. Automation</b> (พนักงานได้รับความช่วยเหลือให้ทำงานโดยอัตโนมัติ)</td><td>ตั้งระบบให้ <b>ฝ่ายรับจองบันทึกและประมวลผลการจองของลูกค้า</b></td></tr>\n<tr><td><b>2. Rationalization of procedures</b> (ปรับ SOP ให้กระชับ)</td><td>ระบบจองที่เดิมต้องใช้ <b>3-4 ขั้นตอนในการเช็กอิน</b> ลดเหลือ <b>1-2 ขั้นตอน</b></td></tr>\n<tr><td><b>3. Business process reengineering</b> (วิเคราะห์ ลดความซับซ้อน ออกแบบใหม่)</td><td>ออกแบบระบบจองและเช็กอินให้ <b>ลูกค้าจองห้องและเช็กอินเองได้</b> โดยไม่ต้องมีพนักงานโรงแรมยืนยัน</td></tr>\n<tr><td><b>4. Paradigm shift</b> (คิดธุรกิจใหม่ กำหนด business model ใหม่)</td><td>เปลี่ยนจากโมเดลเดิมที่ให้เช่าห้องเป็นรายคืน ไปเป็น <b>การเข้าพักระยะยาว</b> โดยมีแพลตฟอร์มดิจิทัลและระบบสารสนเทศสนับสนุน</td></tr>\n</table>\n<div class=\"note\"><b>💡 หมายเหตุ</b> สไลด์ใช้คำว่า \"Business process reengineering\" ในเฉลยข้อนี้ ซึ่งความหมายเดียวกับ Business process redesign ในสไลด์ก่อนหน้า</div>"},
{"t":"Organizational Change: Risks and Rewards","ref":"สไลด์ 14","html":"\n<h4>การเปลี่ยนแปลงองค์กรมีทั้งความเสี่ยงและผลตอบแทน</h4>\n<p>กราฟในสไลด์: แกนตั้ง = <b>RISK</b> (Low → High), แกนนอน = <b>RETURN</b> (Low → High) แสดงเป็นส่วนโค้งซ้อนกัน 4 ชั้น หมายเลข 1-4 จากมุมซ้ายล่างออกไปขวาบน:</p>\n<ol>\n<li>Automation - ชั้นในสุด เสี่ยงต่ำ ผลตอบแทนต่ำ</li>\n<li>Rationalization</li>\n<li>Redesign</li>\n<li>Paradigm shifts - ชั้นนอกสุด เสี่ยงสูง ผลตอบแทนสูง</li>\n</ol>\n<ul>\n<li>รูปแบบที่พบบ่อยที่สุดคือ <b>Automation และ Rationalization</b> เป็นกลยุทธ์ที่เคลื่อนไหว/เปลี่ยนแปลงค่อนข้างช้า ให้ <b>ผลตอบแทนพอประมาณแต่ความเสี่ยงน้อย</b></li>\n<li>การเปลี่ยนแปลงที่เร็วและครอบคลุมกว่า เช่น <b>Redesign และ Paradigm shifts</b> ให้ <b>ผลตอบแทนสูงแต่มีโอกาสล้มเหลวมาก</b></li>\n</ul>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Automation + Rationalization = เสี่ยงต่ำ ผลตอบแทนพอประมาณ (พบบ่อยสุด)</li>\n<li>Redesign + Paradigm shifts = ผลตอบแทนสูง โอกาสล้มเหลวสูง</li>\n</ul></div>"},
{"t":"Enhancing Decision Making และมูลค่าทางธุรกิจของการตัดสินใจ","ref":"สไลด์ 15-17","html":"\n<h4>Outline ของหัวข้อ Enhancing Decision Making</h4>\n<ul>\n<li>ประเภทของการตัดสินใจ (The different types of decisions)</li>\n<li>กระบวนการตัดสินใจทำงานอย่างไร (How does the decision-making process work?)</li>\n<li>IS สนับสนุนกิจกรรมของผู้บริหารและการตัดสินใจเชิงบริหารอย่างไร</li>\n<li>IS สนับสนุนการตัดสินใจในแต่ละระดับการจัดการอย่างไร</li>\n</ul>\n<h4>Business value of improved decision making</h4>\n<p>การปรับปรุงการตัดสินใจเรื่อง \"เล็กๆ\" หลายร้อยหรือหลายพันครั้ง สามารถสร้างมูลค่ารวมให้ธุรกิจได้อย่างมากในแต่ละปี</p>\n<p><b>Table 12-1: Business Value of Enhanced Decision Making</b> (มูลค่าต่อปี = จำนวนครั้งต่อปี x มูลค่าที่ประมาณของการตัดสินใจที่ดีขึ้น 1 ครั้ง)</p>\n<table>\n<tr><th>ตัวอย่างการตัดสินใจ</th><th>ผู้ตัดสินใจ</th><th>ครั้ง/ปี</th><th>มูลค่า/ครั้ง</th><th>มูลค่า/ปี</th></tr>\n<tr><td>Allocate support to most valuable customers</td><td>Accounts manager</td><td>12</td><td>$100,000</td><td>$1,200,000</td></tr>\n<tr><td>Predict call center daily demand</td><td>Call center management</td><td>4</td><td>150,000</td><td>600,000</td></tr>\n<tr><td>Decide parts inventory levels daily</td><td>Inventory manager</td><td>365</td><td>5,000</td><td>1,825,000</td></tr>\n<tr><td>Identify competitive bids from major suppliers</td><td>Senior management</td><td>1</td><td>2,000,000</td><td>2,000,000</td></tr>\n<tr><td>Schedule production to fill orders</td><td>Manufacturing manager</td><td>150</td><td>10,000</td><td>1,500,000</td></tr>\n<tr><td>Allocate labor to complete a job</td><td>Production floor manager</td><td>100</td><td>4,000</td><td>400,000</td></tr>\n</table>\n<div class=\"note\"><b>💡 หมายเหตุ</b> ข้อสังเกต: การตัดสินใจเล็กๆ ที่ทำบ่อย (เช่น สต็อกรายวัน 365 ครั้ง) อาจรวมมูลค่าไม่ต่างจากการตัดสินใจใหญ่ครั้งเดียวของผู้บริหารระดับสูง</div>"},
{"t":"ประเภทของการตัดสินใจ: Unstructured, Structured, Semistructured","ref":"สไลด์ 18","html":"\n<h4>The different types of decisions</h4>\n<table>\n<tr><th>ประเภท</th><th>ลักษณะ</th></tr>\n<tr><td><b>Unstructured</b> (ไม่มีโครงสร้าง)</td><td>เป็นการตัดสินใจที่แปลกใหม่ ซับซ้อน และไม่ใช่งานประจำ / ไม่มีขั้นตอนหรือกฎเกณฑ์ที่กำหนดไว้ล่วงหน้าอย่างชัดเจน / ต้องอาศัยการพิจารณา วิจารณญาณ ประสบการณ์ และความเข้าใจของผู้ตัดสินใจ</td></tr>\n<tr><td><b>Structured</b> (มีโครงสร้าง)</td><td>เกิดขึ้นซ้ำๆ เป็นกิจวัตรประจำวัน (Repetitive and routine) / มีกฎเกณฑ์ ขั้นตอน หรือเกณฑ์การตัดสินใจที่กำหนดไว้อย่างชัดเจน / ใช้วิธีเดิมในการตัดสินใจแต่ละครั้งได้</td></tr>\n<tr><td><b>Semistructured</b> (กึ่งโครงสร้าง)</td><td>บางส่วนของการตัดสินใจมีกฎเกณฑ์หรือขั้นตอนที่ชัดเจน แต่อีกบางส่วนต้องอาศัยวิจารณญาณและประสบการณ์ของผู้ตัดสินใจ / ข้อมูลและ IS สามารถช่วยวิเคราะห์ทางเลือก แต่ไม่สามารถตัดสินใจแทนได้ทั้งหมด</td></tr>\n</table>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Unstructured = ใหม่/ซับซ้อน/ไม่ประจำ/ไม่มีกฎ ต้องใช้วิจารณญาณ</li>\n<li>Structured = ซ้ำ/routine/มีกฎชัด</li>\n<li>Semistructured = ผสม; IS ช่วยได้แต่ไม่ตัดสินใจแทนทั้งหมด</li>\n</ul></div>"},
{"t":"ระดับการจัดการกับประเภทการตัดสินใจ","ref":"สไลด์ 19-20","html":"\n<h4>แต่ละระดับผู้บริหารตัดสินใจแบบไหน</h4>\n<table>\n<tr><th>ระดับ</th><th>ประเภทการตัดสินใจ</th><th>ตัวอย่าง</th></tr>\n<tr><td><b>ผู้บริหารอาวุโส (Senior managers)</b></td><td>Unstructured</td><td>เราควรจะเข้าสู่ตลาดใหม่หรือไม่ (รูปพีระมิด: Decide entrance or exit from markets, Approve capital budget, Decide long-term goals)</td></tr>\n<tr><td><b>ผู้จัดการระดับกลาง (Middle managers)</b></td><td>Semistructured (บางส่วนมีเกณฑ์ชัด บางส่วนต้องใช้การวิเคราะห์และวิจารณญาณ)</td><td>ทำไมรายงานการรับคำสั่งซื้อแสดงการลดลงใน Minneapolis? (รูปพีระมิด: Design a marketing plan, Develop a departmental budget, Design a new corporate Web site)</td></tr>\n<tr><td><b>ผู้จัดการระดับปฏิบัติการและพนักงาน (Operational managers and employees)</b></td><td>Structured</td><td>ลูกค้าตรงตามเกณฑ์สำหรับการให้สินเชื่อหรือไม่ (รูปพีระมิด: Determine overtime eligibility, Restock inventory, Offer credit to customers, Determine special offers to customers)</td></tr>\n</table>\n<div class=\"dg\"><div class=\"dgt\">🖼️ Decision-making levels and types of decisions (พีระมิด)</div>\n<svg viewBox=\"0 0 700 230\" xmlns=\"http://www.w3.org/2000/svg\">\n<polygon class=\"bx hd\" points=\"350,10 430,75 270,75\"/><text class=\"t sm\" x=\"350\" y=\"58\" text-anchor=\"middle\">Senior Mgmt</text>\n<polygon class=\"bx\" points=\"262,85 438,85 500,150 200,150\"/><text class=\"t sm\" x=\"350\" y=\"123\" text-anchor=\"middle\">Middle Management</text>\n<polygon class=\"bx ok\" points=\"192,160 508,160 570,222 130,222\"/><text class=\"t sm\" x=\"350\" y=\"196\" text-anchor=\"middle\">Operational Mgmt</text>\n<text class=\"t b\" x=\"20\" y=\"45\">Unstructured</text><text class=\"t b\" x=\"20\" y=\"125\">Semistructured</text><text class=\"t b\" x=\"20\" y=\"200\">Structured</text>\n</svg></div>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Senior = Unstructured | Middle = Semistructured | Operational = Structured</li>\n<li>แต่ละระดับมีลักษณะการตัดสินใจและความต้องการสารสนเทศต่างกัน จึงต้องการ IS ที่เหมาะสมกับลักษณะการตัดสินใจและระดับการบริหาร</li>\n</ul></div>"},
{"t":"กระบวนการตัดสินใจ 4 ขั้นตอน","ref":"สไลด์ 21-22","html":"\n<h4>How does the decision-making process work? - 4 ขั้นตอน</h4>\n<table>\n<tr><th>ขั้น</th><th>ความหมาย</th><th>คำถามในแผนภาพ</th></tr>\n<tr><td><b>1. Intelligence</b></td><td>ค้นหา ระบุ และทำความเข้าใจปัญหาหรือโอกาสที่เกิดขึ้นในองค์กร</td><td>Problem discovery: What is the problem?</td></tr>\n<tr><td><b>2. Design</b></td><td>พัฒนาและวิเคราะห์ทางเลือกในการแก้ปัญหา</td><td>Solution discovery: What are the possible solutions?</td></tr>\n<tr><td><b>3. Choice</b></td><td>เลือกทางเลือกที่เหมาะสมเพื่อแก้ปัญหา (Choosing among solution alternatives)</td><td>Choosing solutions: What is the best solution?</td></tr>\n<tr><td><b>4. Implementation</b></td><td>นำทางเลือกที่ตัดสินใจไปปฏิบัติ และติดตามผลเพื่อประเมินว่าการแก้ปัญหาบรรลุเป้าหมายหรือไม่</td><td>Solution testing: Is the solution working? Can we make it work better?</td></tr>\n</table>\n<div class=\"dg\"><div class=\"dgt\">🖼️ Stages in Decision Making</div>\n<svg viewBox=\"0 0 700 330\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect class=\"bx hd\" x=\"260\" y=\"10\" width=\"180\" height=\"46\" rx=\"6\"/><text class=\"t b\" x=\"350\" y=\"38\" text-anchor=\"middle\">Intelligence</text>\n<rect class=\"bx\" x=\"260\" y=\"95\" width=\"180\" height=\"46\" rx=\"6\"/><text class=\"t b\" x=\"350\" y=\"123\" text-anchor=\"middle\">Design</text>\n<rect class=\"bx\" x=\"260\" y=\"180\" width=\"180\" height=\"46\" rx=\"6\"/><text class=\"t b\" x=\"350\" y=\"208\" text-anchor=\"middle\">Choice</text>\n<rect class=\"bx ok\" x=\"260\" y=\"265\" width=\"180\" height=\"46\" rx=\"6\"/><text class=\"t b\" x=\"350\" y=\"293\" text-anchor=\"middle\">Implementation</text>\n<line class=\"ln\" x1=\"350\" y1=\"56\" x2=\"350\" y2=\"95\"/><line class=\"ln\" x1=\"350\" y1=\"141\" x2=\"350\" y2=\"180\"/><line class=\"ln\" x1=\"350\" y1=\"226\" x2=\"350\" y2=\"265\"/>\n<text class=\"t sm\" x=\"20\" y=\"38\">What is the problem?</text><text class=\"t sm\" x=\"20\" y=\"123\">What are the possible solutions?</text><text class=\"t sm\" x=\"20\" y=\"208\">What is the best solution?</text><text class=\"t sm\" x=\"20\" y=\"293\">Is it working? Make it better?</text>\n<path class=\"ln\" d=\"M440 118 H520 V33 H440\" fill=\"none\"/>\n<path class=\"ln\" d=\"M440 203 H540 V118\" fill=\"none\"/>\n<path class=\"ln\" d=\"M440 288 H560 V203\" fill=\"none\"/>\n<text class=\"t sm\" x=\"575\" y=\"170\">ย้อนกลับได้</text>\n</svg></div>\n<p>ลูกศรเทาในรูปชี้<b>ย้อนกลับ</b>จากแต่ละขั้นไปขั้นก่อนหน้า (เช่น Design ย้อนไป Intelligence, Choice ย้อนไป Design, Implementation ย้อนไป Choice) หมายความว่ากระบวนการตัดสินใจเป็นวงจร หากทดสอบแล้วไม่ได้ผลก็ย้อนไปปรับ</p>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul><li>ลำดับ 4 ขั้น: <b>Intelligence → Design → Choice → Implementation</b></li></ul></div>"},
{"t":"Managerial Roles: Classical model, Behavioral models และ Mintzberg","ref":"สไลด์ 23-24","html":"\n<h4>Classical model of management (รูปแบบดั้งเดิมของการจัดการ: 5 หน้าที่หลัก)</h4>\n<ul>\n<li><b>Planning</b> - การวางแผน</li>\n<li><b>Organizing</b> - การจัดองค์กร/จัดระเบียบ</li>\n<li><b>Coordinating</b> - การประสานงาน</li>\n<li><b>Deciding</b> - การตัดสินใจ</li>\n<li><b>Controlling</b> - การควบคุม</li>\n</ul>\n<h4>Contemporary behavioral models</h4>\n<ul>\n<li>พฤติกรรมการทำงานจริงของผู้บริหารแตกต่างจากภาพที่อธิบายในแบบจำลองดั้งเดิม</li>\n<li>มีความเป็นระบบน้อยกว่า ไม่เป็นทางการมากกว่า และต้องตอบสนองต่อสถานการณ์ต่างๆ มากกว่า</li>\n<li>มีเวลาสะท้อนคิดและไตร่ตรองน้อยกว่า และการทำงานมีการจัดระเบียบน้อยกว่าที่แบบจำลองดั้งเดิมอธิบายไว้</li>\n</ul>\n<p>สรุปของสไลด์: <b>ระบบสารสนเทศสามารถสนับสนุนผู้บริหารในบางบทบาทและกิจกรรมการจัดการ</b></p>\n<h4>Mintzberg's 10 managerial roles</h4>\n<table>\n<tr><th>กลุ่ม</th><th>บทบาท</th></tr>\n<tr><td><b>Interpersonal roles</b> (ด้านมนุษยสัมพันธ์)</td><td>1. Figurehead (ผู้แทนองค์กร/ผู้ทำหน้าที่เชิงพิธีการ) 2. Leader (ผู้นำ) 3. Liaison (ผู้ประสานงาน)</td></tr>\n<tr><td><b>Informational roles</b> (ด้านข่าวสาร)</td><td>4. Monitor/Nerve Center (ผู้ติดตามและรวบรวมข้อมูลสารสนเทศ) 5. Disseminator (ผู้เผยแพร่และกระจายสารสนเทศ) 6. Spokesperson (ผู้แถลงข่าวสาร)</td></tr>\n<tr><td><b>Decisional roles</b> (ด้านการตัดสินใจและการจัดการทรัพยากร)</td><td>7. Entrepreneur (ผู้ประกอบการ/ผู้ริเริ่มและพัฒนาธุรกิจ) 8. Disturbance handler (ผู้จัดการความขัดแย้ง/แก้ไขปัญหา) 9. Resource allocator (ผู้จัดสรรทรัพยากร) 10. Negotiator (ผู้เจรจา)</td></tr>\n</table>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Classical 5: Planning, Organizing, Coordinating, Deciding, Controlling</li>\n<li>Mintzberg 10 roles แบ่งเป็น 3 กลุ่ม: 3 Interpersonal + 3 Informational + 4 Decisional</li>\n</ul></div>\n<div class=\"warn\"><b>⚠️ ระวัง</b> Disseminator = กระจายข้อมูลภายในองค์กร ส่วน Spokesperson = พูด/แถลงแทนองค์กรต่อภายนอก</div>"},
{"t":"ระบบสารสนเทศที่สนับสนุนบทบาทผู้บริหาร (Table 12.2)","ref":"สไลด์ 25","html":"\n<h4>Table 12.2 Managerial Roles and Supporting Information Systems</h4>\n<table>\n<tr><th>กลุ่ม (Behavior)</th><th>Role</th><th>Support systems</th></tr>\n<tr><td rowspan=\"3\">Interpersonal</td><td>Figurehead</td><td>Telepresence systems</td></tr>\n<tr><td>Leader</td><td>Telepresence, social networks, Twitter</td></tr>\n<tr><td>Liaison</td><td>Smartphones, social networks</td></tr>\n<tr><td rowspan=\"3\">Information processing</td><td>Nerve center</td><td>Management information systems, executive support systems</td></tr>\n<tr><td>Disseminator</td><td>E-mail, social networks</td></tr>\n<tr><td>Spokesperson</td><td>Webinars, telepresence</td></tr>\n<tr><td rowspan=\"4\">Decision making</td><td>Entrepreneur</td><td><b>None exist</b></td></tr>\n<tr><td>Disturbance handler</td><td><b>None exist</b></td></tr>\n<tr><td>Resource allocator</td><td>Business intelligence, decision-support system</td></tr>\n<tr><td>Negotiator</td><td><b>None exist</b></td></tr>\n</table>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>บทบาท Decisional ที่ <b>ยังไม่มีระบบสนับสนุน (None exist)</b>: Entrepreneur, Disturbance handler, Negotiator</li>\n<li><b>Resource allocator</b> ใช้ <b>BI / DSS</b></li>\n<li><b>Nerve center</b> ใช้ MIS / ESS</li>\n</ul></div>"},
{"t":"Real-world Decision Making: ทำไม IT ไม่ได้รับประกันการตัดสินใจที่ดี","ref":"สไลด์ 26","html":"\n<h4>ปัจจัยอื่นที่ส่งผลนอกจากเทคโนโลยี</h4>\n<p>แม้ Information Systems จะช่วยสนับสนุนการตัดสินใจของผู้บริหาร แต่การลงทุนด้าน IT <b>ไม่ได้รับประกันว่าจะทำให้การตัดสินใจดีขึ้นเสมอไป</b> เนื่องจากยังมีปัจจัยอื่นที่เกี่ยวข้อง ได้แก่:</p>\n<ol>\n<li><b>Information quality</b> (คุณภาพสารสนเทศ) - การตัดสินใจที่มีคุณภาพต้องอาศัยสารสนเทศที่มีคุณภาพ</li>\n<li><b>Management filters</b> (การกลั่นกรองของผู้บริหาร) - ผู้บริหารอาจเลือกสนใจสารสนเทศบางส่วน และอาจมีอคติในการตีความหรือปฏิเสธสารสนเทศที่ไม่สอดคล้องกับความเชื่อหรือประสบการณ์เดิม</li>\n<li><b>Organizational culture and politics</b> (วัฒนธรรมและการเมืององค์กร) - วัฒนธรรมองค์กรและการเมืองภายในองค์กรอาจส่งผลต่อการยอมรับหรือการต่อต้านการตัดสินใจและการเปลี่ยนแปลงที่สำคัญ</li>\n</ol>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul><li>3 ปัจจัย: Information quality, Management filters, Organizational culture and politics</li></ul></div>"},
{"t":"IS ที่สนับสนุนการตัดสินใจในแต่ละระดับการจัดการ","ref":"สไลด์ 27","html":"\n<h4>Decision support ตามระดับ</h4>\n<table>\n<tr><th>ผู้ใช้</th><th>ระบบ</th><th>บทบาท</th></tr>\n<tr><td><b>Senior management</b></td><td><b>Executive Support Systems (ESS)</b></td><td>สนับสนุนการตัดสินใจแบบ Unstructured; เน้นข้อมูลภาพรวม แนวโน้ม ตัวชี้วัด และปัจจัยภายนอกองค์กร</td></tr>\n<tr><td><b>Operational management</b></td><td><b>TPS</b> (Transaction Processing System)</td><td>บันทึกและประมวลผลธุรกรรมประจำวัน และให้ข้อมูลสำหรับการตัดสินใจที่มีโครงสร้าง (Structured)</td></tr>\n<tr><td><b>Middle managers</b></td><td><b>MIS</b> (รับข้อมูลจาก TPS)</td><td>สร้าง Routine Reports, Exception Reports และ KPI Reports; สนับสนุนการติดตาม ควบคุม และตัดสินใจทั้งแบบมีโครงสร้างและกึ่งโครงสร้าง</td></tr>\n<tr><td><b>\"Super user\" และ business analysts</b></td><td><b>DSS</b> (Decision Support System)</td><td>สนับสนุนการตัดสินใจกึ่งโครงสร้าง; ใช้การวิเคราะห์ที่ซับซ้อนมากขึ้น; สามารถสร้าง ปรับแต่ง และวิเคราะห์ข้อมูลได้ด้วยตนเอง</td></tr>\n</table>\n<div class=\"must\"><b>🔥 ต้องจำ</b><ul>\n<li>Senior → ESS (Unstructured) | Middle → MIS (Structured + Semistructured) | Operational → TPS (Structured) | Super user → DSS (Semistructured)</li>\n<li>MIS รายงาน 3 แบบ: Routine, Exception, KPI</li>\n</ul></div>\n<div class=\"warn\"><b>⚠️ ระวัง</b> MIS รับข้อมูลมาจาก TPS (ข้อมูลธุรกรรม → สรุปเป็นรายงาน) อย่าสลับกับ DSS ซึ่งผู้ใช้วิเคราะห์เองได้</div>"}],
  ex: [
 {
  "type": "choice",
  "story": "ร้านเสื้อผ้าเคยเปิดแฟ้มกระดาษเพื่อหาประวัติลูกค้า ตอนนี้พิมพ์ชื่อแล้วระบบดึงประวัติจากฐานข้อมูลให้ ส่วนขั้นตอนการขายอื่นยังเหมือนเดิมทุกอย่าง",
  "q": "ตัวอย่างนี้ตรงกับ organizational change แบบใด",
  "opts": [
   {
    "t": "Rationalization of procedures",
    "why": "คือการตัดขั้นตอนใน SOP แต่ที่นี่ขั้นตอนไม่ได้ถูกตัด"
   },
   {
    "t": "Business process redesign",
    "why": "คือการรื้อออกแบบทั้งกระบวนการ แต่ที่นี่กระบวนการเดิมยังอยู่"
   },
   {
    "t": "Automation",
    "why": "ให้เครื่องทำงาน manual เดิมแทน โดยขั้นตอนไม่เปลี่ยน"
   },
   {
    "t": "Paradigm shift",
    "why": "คือการเปลี่ยน business model แต่ร้านยังขายเสื้อผ้าเหมือนเดิม"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ระบบจองของโรงแรมเดิมต้องทำ 3-4 ขั้นตอนตอนเช็กอิน หลังปรับปรุงเหลือเพียง 1-2 ขั้นตอน ส่วนงานอื่นยังเหมือนเดิม",
  "q": "ตัวอย่างนี้ตรงกับ organizational change แบบใด",
  "opts": [
   {
    "t": "Rationalization",
    "why": "ตัดขั้นตอนที่ไม่จำเป็นออกจาก SOP ให้กระชับขึ้น"
   },
   {
    "t": "Automation",
    "why": "คือให้เครื่องทำงาน manual เดิมแทน ไม่ได้เน้นตัดขั้นตอน"
   },
   {
    "t": "Redesign",
    "why": "คือการรื้อออกแบบทั้งกระบวนการ ไม่ใช่แค่ลดจำนวนขั้นตอน"
   },
   {
    "t": "Paradigm shift",
    "why": "คือการเปลี่ยน business model ซึ่งโรงแรมยังเป็นโรงแรมเหมือนเดิม"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "โรงแรมให้แขกจองห้องและรับห้องเองผ่านระบบ ไม่ต้องมีพนักงานคอยยืนยัน และตัดงานเอกสารที่ซ้ำกันหลายจุดออกไป",
  "q": "ตัวอย่างนี้ตรงกับ organizational change แบบใด",
  "opts": [
   {
    "t": "Automation",
    "why": "คือให้เครื่องทำงานเดิมแทน แต่นี่เปลี่ยนวิธีทำงานทั้งกระบวนการ"
   },
   {
    "t": "Redesign",
    "why": "รื้อและออกแบบกระบวนการจองถึงเข้าพักใหม่ทั้งเส้น (BPR)"
   },
   {
    "t": "Rationalization",
    "why": "คือปรับ SOP เดิมให้สั้นลง แต่นี่รื้อทั้งกระบวนการ"
   },
   {
    "t": "Paradigm shift",
    "why": "คือเปลี่ยน business model ซึ่งโรงแรมยังให้เช่าห้องเหมือนเดิม"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "บริษัทรถบรรทุกแห่งหนึ่งใช้ IT ขยายจากการขนส่งสินค้า ไปรับบริหารจัดการการขนส่งและ supply chain ให้บริษัทอื่นๆ",
  "q": "ตัวอย่างนี้ตรงกับ organizational change แบบใด",
  "opts": [
   {
    "t": "Automation",
    "why": "คือให้เครื่องทำงาน manual เดิมแทน ไม่ได้เปลี่ยนธุรกิจ"
   },
   {
    "t": "Paradigm shift",
    "why": "เปลี่ยนธุรกิจและ business model จากขนส่งเป็น logistics"
   },
   {
    "t": "Rationalization",
    "why": "คือตัดขั้นตอนใน SOP ไม่ได้เปลี่ยนบทบาทองค์กร"
   },
   {
    "t": "Redesign",
    "why": "คือรื้อออกแบบกระบวนการ แต่ธุรกิจหลักยังคงเดิม"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "แผนกปฏิบัติการมีเอกสารที่ระบุวัตถุประสงค์ ศัพท์เฉพาะ และลำดับขั้นตอนทีละข้อ โดยหัวหน้าแผนกลงนามอนุมัติ ไว้ให้ทุกคนทำงานตรงกัน",
  "q": "เอกสารนี้เรียกว่าอะไร",
  "opts": [
   {
    "t": "Business process",
    "why": "คือชุดของ routines ที่ทำงานร่วมกัน ไม่ใช่ตัวเอกสาร"
   },
   {
    "t": "SOP",
    "why": "เป็นเอกสารกำหนดขั้นตอนและลำดับการปฏิบัติงานมาตรฐาน"
   },
   {
    "t": "Routines",
    "why": "คือกฎและแนวปฏิบัติสำหรับงานซ้ำๆ ไม่ใช่เอกสารฉบับทางการ"
   },
   {
    "t": "Information system",
    "why": "คือระบบที่ประกอบด้วย 5 องค์ประกอบ ไม่ใช่เอกสารขั้นตอน"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "นักศึกษาต้องเรียงระดับขององค์กรจากหน่วยเล็กที่สุดไปใหญ่ที่สุด",
  "q": "ข้อใดเรียงถูกต้อง",
  "opts": [
   {
    "t": "Business process → Routines → Business firm",
    "why": "สลับ routines กับ process ซึ่ง routines เล็กกว่า"
   },
   {
    "t": "Business firm → Business process → Routines",
    "why": "เรียงจากใหญ่ไปเล็ก ตรงข้ามกับที่โจทย์ถาม"
   },
   {
    "t": "Routines → Business firm → Business process",
    "why": "firm ใหญ่กว่า process จึงไม่ควรมาก่อน"
   },
   {
    "t": "Routines → Business process → Business firm",
    "why": "routines รวมเป็น process และ process รวมเป็น firm"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "บริษัท Ford ปรับการจัดซื้อให้ส่งข้อมูลกับผู้ขายทางอิเล็กทรอนิกส์ และจ่ายเงินได้ทันทีเมื่อรับสินค้าโดยไม่ต้องรอใบแจ้งหนี้ ทำให้ต้องใช้เจ้าหน้าที่บัญชีเจ้าหนี้น้อยลงมาก",
  "q": "เหตุใดจึงลดจำนวนเจ้าหน้าที่ได้มากเช่นนี้",
  "opts": [
   {
    "t": "ตัดขั้นตอนจับคู่เอกสารออกทั้งกระบวนการ",
    "why": "EDI และ Invoiceless processing ทำให้ไม่ต้องจับคู่ใบสั่งซื้อ ใบรับสินค้า และใบแจ้งหนี้"
   },
   {
    "t": "ให้พนักงานคีย์เอกสารได้เร็วขึ้น",
    "why": "ไม่ใช่ เพราะการแค่ทำเอกสารเดิมให้เร็วขึ้นคือ Automation"
   },
   {
    "t": "ลดจำนวนผู้ขายที่ต้องติดต่อด้วย",
    "why": "ไม่ใช่เหตุผลที่ทำให้ลดคนในกรณีนี้"
   },
   {
    "t": "ย้ายงานบัญชีไปให้ผู้ขายทำแทน",
    "why": "ไม่ใช่ งานถูกออกแบบใหม่ในองค์กรเอง ไม่ได้ส่งต่อให้ผู้ขาย"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "ทีมพัฒนาระบบทดสอบระบบเสร็จเรียบร้อยแล้ว",
  "q": "ขั้นถัดไปของ ISD ตามลำดับคือข้อใด",
  "opts": [
   {
    "t": "Conversion",
    "why": "หลัง Testing คือเปลี่ยนจากระบบเก่าไปใช้ระบบใหม่"
   },
   {
    "t": "Production and Maintenance",
    "why": "เป็นขั้นสุดท้ายที่มาหลัง Conversion"
   },
   {
    "t": "Programming",
    "why": "เป็นขั้นก่อน Testing"
   },
   {
    "t": "Systems Design",
    "why": "เป็นขั้นต้นๆ ก่อนเขียนโปรแกรม"
   }
  ],
  "ans": 0
 },
 {
  "type": "match",
  "q": "จับคู่กิจกรรมของ ISD กับความหมาย",
  "pairs": [
   [
    "Systems Analysis",
    "ศึกษาความต้องการของผู้ใช้"
   ],
   [
    "Programming/Development",
    "เขียนโปรแกรมตามแบบที่ออกแบบ"
   ],
   [
    "Conversion",
    "เปลี่ยนจากระบบเก่ามาใช้ระบบใหม่"
   ],
   [
    "Production and Maintenance",
    "ใช้งานจริงและดูแลต่อเนื่อง"
   ]
  ],
  "why": "ลำดับ ISD: Analysis → Design → Programming → Testing → Conversion → Production and Maintenance"
 },
 {
  "type": "choice",
  "story": "อาจารย์สอนว่า information system หนึ่งระบบประกอบด้วยองค์ประกอบ 5 อย่าง",
  "q": "ข้อใดเป็นหนึ่งในองค์ประกอบทั้ง 5 นั้น",
  "opts": [
   {
    "t": "Network",
    "why": "ไม่ได้เป็นองค์ประกอบแยกใน 5 อย่าง"
   },
   {
    "t": "Cloud",
    "why": "ไม่อยู่ใน 5 องค์ประกอบ"
   },
   {
    "t": "Procedures",
    "why": "เป็นขั้นตอน กฎ และคู่มือการใช้งาน หนึ่งใน 5 องค์ประกอบ"
   },
   {
    "t": "Middleware",
    "why": "เป็นซอฟต์แวร์ชนิดหนึ่ง ไม่ใช่องค์ประกอบแยก"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ร้านก๋วยเตี๋ยวรับออเดอร์ด้วยการจดลงสมุด ไม่มีคอมพิวเตอร์ใช้เลย",
  "q": "ข้อใดเป็นสิ่งที่ร้านนี้มีได้โดยไม่ต้องมี IS",
  "opts": [
   {
    "t": "Application",
    "why": "ต้องเป็นซอฟต์แวร์ ซึ่งร้านนี้ไม่มี"
   },
   {
    "t": "CRM",
    "why": "เป็นระบบสารสนเทศ ต้องมีซอฟต์แวร์"
   },
   {
    "t": "Inventory IS",
    "why": "เป็นระบบสารสนเทศ จึงต้องมีคอมพิวเตอร์"
   },
   {
    "t": "Business process",
    "why": "business process อาจมีได้โดยไม่มี IS"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ในกระบวนการรับคำสั่งซื้อ พนักงานขายต้องจัดทำใบเสนอราคาให้ลูกค้า",
  "q": "ขั้นนี้ใช้ระบบสารสนเทศใดสนับสนุน",
  "opts": [
   {
    "t": "Inventory IS",
    "why": "ใช้ตรวจสอบสินค้าพร้อมขาย"
   },
   {
    "t": "CRM",
    "why": "ขั้น Prepare Quotation ใช้ CRM"
   },
   {
    "t": "Customer Credit IS",
    "why": "ใช้ตรวจเครดิตลูกค้า"
   },
   {
    "t": "Shipping IS",
    "why": "ใช้ในขั้นดำเนินการสั่งซื้อก่อนส่งสินค้า"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "กระบวนการรับคำสั่งซื้อประกอบด้วยหลายขั้นตอน แต่ละขั้นมีผู้รับผิดชอบและเครื่องมือของตัวเอง",
  "q": "ขั้นใดที่ไม่มี IS สนับสนุนในกระบวนการนี้",
  "opts": [
   {
    "t": "Prepare quotation",
    "why": "ใช้ CRM ช่วยจัดทำใบเสนอราคา"
   },
   {
    "t": "Check customer credit",
    "why": "ใช้ Customer Credit IS ตรวจเครดิต"
   },
   {
    "t": "Approve special terms",
    "why": "ขั้นอนุมัติเงื่อนไขพิเศษทำโดยคน ไม่มี IS ในรูป"
   },
   {
    "t": "Verify availability",
    "why": "ใช้ Inventory IS ตรวจสินค้า"
   }
  ],
  "ans": 2
 },
 {
  "type": "multi",
  "story": "บริษัทกำลังเทียบรูปแบบการเปลี่ยนแปลงองค์กรบนกราฟ Risk กับ Return",
  "q": "รูปแบบใดมีผลตอบแทนสูงแต่โอกาสล้มเหลวสูง (เลือกทุกข้อที่ถูกต้อง)",
  "opts": [
   {
    "t": "Paradigm shift",
    "ok": true,
    "why": "อยู่ชั้นนอกสุดของกราฟ ผลตอบแทนและความเสี่ยงสูง"
   },
   {
    "t": "Automation",
    "ok": false,
    "why": "เสี่ยงต่ำ ผลตอบแทนพอประมาณ"
   },
   {
    "t": "Business process redesign",
    "ok": true,
    "why": "เปลี่ยนเร็วและครอบคลุม ผลตอบแทนสูงแต่ล้มเหลวได้มาก"
   },
   {
    "t": "Rationalization",
    "ok": false,
    "why": "เปลี่ยนช้า เสี่ยงต่ำ"
   },
   {
    "t": "Routines",
    "ok": false,
    "why": "เป็นหน่วยของพฤติกรรมในองค์กร ไม่ใช่รูปแบบการเปลี่ยนแปลง"
   }
  ]
 },
 {
  "type": "choice",
  "story": "ประธานกรรมการกำลังพิจารณาว่าจะเปิดตลาดในประเทศใหม่หรือไม่ และจะอนุมัติงบลงทุนก้อนใหญ่หรือเปล่า",
  "q": "การตัดสินใจนี้จัดเป็นประเภทใด",
  "opts": [
   {
    "t": "Structured",
    "why": "เป็นงานซ้ำที่มีกฎชัด ซึ่งไม่ตรงกับเรื่องระดับนี้"
   },
   {
    "t": "Semistructured",
    "why": "มีบางส่วนมีกฎ ซึ่งเป็นงานของผู้จัดการระดับกลาง"
   },
   {
    "t": "Unstructured",
    "why": "เป็นเรื่องใหม่ ไม่มีกฎตายตัว ต้องใช้วิจารณญาณ"
   },
   {
    "t": "Tactical",
    "why": "ไม่ใช่ประเภทการตัดสินใจตามบทนี้"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ผู้จัดการระดับกลางต้องออกแบบแผนการตลาดและจัดทำงบประมาณของแผนก",
  "q": "การตัดสินใจนี้จัดเป็นประเภทใดเป็นหลัก",
  "opts": [
   {
    "t": "Structured",
    "why": "เป็นงานประจำที่มีกฎชัด เป็นของระดับปฏิบัติการ"
   },
   {
    "t": "Semistructured",
    "why": "บางส่วนมีเกณฑ์ บางส่วนต้องใช้วิจารณญาณ"
   },
   {
    "t": "Unstructured",
    "why": "เป็นของผู้บริหารอาวุโส เช่นเข้าตลาดใหม่"
   },
   {
    "t": "Operational",
    "why": "เป็นระดับการจัดการ ไม่ใช่ประเภทการตัดสินใจ"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "ในองค์กรมีผู้บริหาร 3 ระดับ คือ อาวุโส กลาง และปฏิบัติการ",
  "q": "ระดับใดที่ตัดสินใจแบบ Structured เป็นหลัก",
  "opts": [
   {
    "t": "Middle management",
    "why": "ตัดสินใจแบบ Semistructured เป็นหลัก"
   },
   {
    "t": "Senior management",
    "why": "ตัดสินใจแบบ Unstructured เป็นหลัก"
   },
   {
    "t": "Super user",
    "why": "เป็นผู้ใช้ DSS ไม่ใช่ระดับการจัดการนี้"
   },
   {
    "t": "Operational",
    "why": "งานประจำ เช่นตรวจสิทธิ์ OT เติมสต็อก ให้สินเชื่อ"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ผู้จัดการเห็นว่ายอดขายของสาขาหนึ่งตกลงผิดปกติ และกำลังเปิดรายงานเพื่อดูว่าเกิดอะไรขึ้น",
  "q": "เขาอยู่ในขั้นใดของกระบวนการตัดสินใจ",
  "opts": [
   {
    "t": "Intelligence",
    "why": "ขั้นค้นหาและระบุปัญหา"
   },
   {
    "t": "Design",
    "why": "ขั้นพัฒนาทางเลือกแก้ปัญหา"
   },
   {
    "t": "Choice",
    "why": "ขั้นเลือกทางที่ดีที่สุด"
   },
   {
    "t": "Implementation",
    "why": "ขั้นนำไปใช้และติดตามผล"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "ผู้จัดการเลือกโปรโมชันแบบที่สองแล้ว และสั่งให้สามสาขาเริ่มจัดจริงสัปดาห์นี้ พร้อมวางแผนประเมินยอดขายหลังจบแคมเปญ",
  "q": "การเริ่มจัดโปรโมชันจริงอยู่ในขั้นใดของกระบวนการตัดสินใจ",
  "opts": [
   {
    "t": "Intelligence",
    "why": "ขั้นระบุปัญหา ซึ่งผ่านมาแล้วก่อนเลือกโปรโมชัน"
   },
   {
    "t": "Design",
    "why": "ขั้นหาทางเลือก ซึ่งผ่านมาแล้วก่อนเลือกโปรโมชัน"
   },
   {
    "t": "Implementation",
    "why": "ขั้นนำทางที่เลือกไปใช้จริงและติดตามผล"
   },
   {
    "t": "Choice",
    "why": "ขั้นเลือกทางที่ดีที่สุด ซึ่งผู้จัดการทำเสร็จแล้ว"
   }
  ],
  "ans": 2
 },
 {
  "type": "match",
  "q": "จับคู่ขั้นตอนการตัดสินใจกับคำถามที่ตอบ",
  "pairs": [
   [
    "Intelligence",
    "ปัญหาคืออะไร"
   ],
   [
    "Design",
    "มีทางแก้อะไรบ้าง"
   ],
   [
    "Choice",
    "ทางไหนดีที่สุด"
   ],
   [
    "Implementation",
    "ได้ผลหรือยัง ปรับให้ดีขึ้นได้ไหม"
   ]
  ],
  "why": "ลำดับ Intelligence → Design → Choice → Implementation"
 },
 {
  "type": "choice",
  "story": "ผู้จัดการส่งอีเมลสรุปผลการประชุมให้พนักงานทุกคนในแผนก",
  "q": "เป็นบทบาทใดของผู้บริหารตาม Mintzberg",
  "opts": [
   {
    "t": "Spokesperson",
    "why": "แถลงแทนองค์กรต่อภายนอก"
   },
   {
    "t": "Liaison",
    "why": "ประสานงานกับบุคคลหรือหน่วยงานภายนอก"
   },
   {
    "t": "Figurehead",
    "why": "ทำหน้าที่ผู้แทนเชิงพิธีการ"
   },
   {
    "t": "Disseminator",
    "why": "กระจายสารสนเทศภายในองค์กร"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ผู้บริหารต้องตัดสินใจว่าโครงการใดจะได้รับงบประมาณและกำลังคนเท่าไร",
  "q": "งานนี้ตรงกับบทบาทใดของ Mintzberg",
  "opts": [
   {
    "t": "Resource allocator",
    "why": "บทบาทผู้แบ่งงบและกำลังคนให้ส่วนงานต่างๆ"
   },
   {
    "t": "Negotiator",
    "why": "บทบาทเจรจาต่อรองกับบุคคลหรือองค์กรภายนอก"
   },
   {
    "t": "Entrepreneur",
    "why": "บทบาทริเริ่มโครงการหรือธุรกิจใหม่"
   },
   {
    "t": "Disturbance handler",
    "why": "บทบาทรับมือปัญหาหรือความขัดแย้งฉุกเฉิน"
   }
  ],
  "ans": 0
 },
 {
  "type": "multi",
  "story": "ที่ปรึกษาจำแนกบทบาทของผู้บริหารตามแนวคิดของ Mintzberg ออกเป็นกลุ่ม",
  "q": "บทบาทใดอยู่ในกลุ่ม Informational roles (เลือกทุกข้อที่ถูกต้อง)",
  "opts": [
   {
    "t": "Leader",
    "ok": false,
    "why": "เป็นบทบาทกลุ่ม Interpersonal"
   },
   {
    "t": "Spokesperson",
    "ok": true,
    "why": "ผู้แถลงข่าวสารขององค์กร จัดอยู่ในกลุ่ม Informational"
   },
   {
    "t": "Negotiator",
    "ok": false,
    "why": "เป็นบทบาทกลุ่ม Decisional"
   },
   {
    "t": "Monitor",
    "ok": true,
    "why": "ผู้ติดตามและรวบรวมข้อมูล จัดอยู่ในกลุ่ม Informational"
   },
   {
    "t": "Disseminator",
    "ok": true,
    "why": "ผู้กระจายสารสนเทศ จัดอยู่ในกลุ่ม Informational"
   }
  ]
 },
 {
  "type": "choice",
  "story": "ผู้บริหารต้องทำหน้าที่ผู้แทนเชิงพิธีการขององค์กร (Figurehead) เช่นร่วมพิธีกับพันธมิตรที่อยู่ไกลกัน",
  "q": "ตารางจับคู่ระบบใดสนับสนุนบทบาทนี้",
  "opts": [
   {
    "t": "Social networks",
    "why": "สนับสนุน Leader, Liaison, Disseminator ไม่ใช่ Figurehead"
   },
   {
    "t": "Smartphones",
    "why": "สนับสนุนบทบาท Liaison"
   },
   {
    "t": "Telepresence",
    "why": "Figurehead ใช้ telepresence systems"
   },
   {
    "t": "E-mail",
    "why": "สนับสนุนบทบาท Disseminator"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "Mintzberg แบ่งบทบาทผู้บริหาร 10 บทบาทเป็น 3 กลุ่ม",
  "q": "บทบาท Spokesperson อยู่ในกลุ่มใด",
  "opts": [
   {
    "t": "Informational",
    "why": "เป็นการแถลงสารสนเทศ จัดอยู่กลุ่ม Informational"
   },
   {
    "t": "Interpersonal",
    "why": "กลุ่มของ Figurehead, Leader, Liaison"
   },
   {
    "t": "Decisional",
    "why": "กลุ่มของ Entrepreneur, Disturbance handler, Resource allocator, Negotiator"
   },
   {
    "t": "Operational",
    "why": "ไม่ใช่กลุ่มบทบาทของ Mintzberg"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "บริษัทลงทุนด้าน IT มากแต่คุณภาพการตัดสินใจยังไม่ดีขึ้นตามที่คาด",
  "q": "ข้อใดเป็นปัจจัยหนึ่งที่ทำให้เป็นเช่นนั้น",
  "opts": [
   {
    "t": "Employee turnover",
    "why": "ไม่ใช่หนึ่งในปัจจัยด้านการตัดสินใจที่ถูกกล่าวถึง"
   },
   {
    "t": "Hardware capacity",
    "why": "เป็นเรื่องเทคนิค ไม่ใช่ปัจจัยด้านการตัดสินใจที่ถูกกล่าวถึง"
   },
   {
    "t": "Data redundancy",
    "why": "เป็นปัญหาฐานข้อมูล ไม่ใช่ปัจจัยด้านการตัดสินใจ"
   },
   {
    "t": "Management filters",
    "why": "ผู้บริหารเลือกรับหรือปฏิเสธสารสนเทศตามความเชื่อเดิม"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ผู้บริหารระดับสูงต้องการดูภาพรวม แนวโน้ม ตัวชี้วัด และปัจจัยภายนอกองค์กรเพื่อตัดสินใจเชิงกลยุทธ์",
  "q": "ระบบใดเหมาะกับผู้ใช้กลุ่มนี้",
  "opts": [
   {
    "t": "TPS",
    "why": "ใช้บันทึกธุรกรรมประจำวันของระดับปฏิบัติการ"
   },
   {
    "t": "MIS",
    "why": "ผลิตรายงานให้ผู้จัดการระดับกลาง"
   },
   {
    "t": "DSS",
    "why": "ใช้โดย super user และ analyst กับงานกึ่งโครงสร้าง"
   },
   {
    "t": "ESS",
    "why": "สนับสนุนผู้บริหารระดับสูงในการตัดสินใจแบบ Unstructured"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "แคชเชียร์สแกนสินค้าและบันทึกทุกรายการขายตลอดทั้งวัน",
  "q": "ข้อมูลธุรกรรมเหล่านี้ถูกประมวลผลโดยระบบใดเป็นอันดับแรก",
  "opts": [
   {
    "t": "TPS",
    "why": "บันทึกและประมวลผลธุรกรรมประจำวัน"
   },
   {
    "t": "MIS",
    "why": "รับข้อมูลจาก TPS ไปสรุปเป็นรายงาน"
   },
   {
    "t": "DSS",
    "why": "ใช้วิเคราะห์เชิงลึกกับงานกึ่งโครงสร้าง"
   },
   {
    "t": "Data warehouse",
    "why": "เก็บข้อมูลประวัติเพื่อวิเคราะห์ ไม่ใช่ระบบบันทึกธุรกรรมหน้าร้าน"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "ผู้จัดการระดับกลางต้องการรายงานจากระบบเพื่อติดตามและควบคุมงาน",
  "q": "ข้อใดเป็นรายงานชนิดหนึ่งที่ MIS สร้างให้",
  "opts": [
   {
    "t": "Ad hoc query",
    "why": "เป็นการสืบค้นเองตามต้องการ ไม่ใช่รายงานที่ระบุของ MIS"
   },
   {
    "t": "Pivot table",
    "why": "เป็นเครื่องมือวิเคราะห์ ไม่ใช่ประเภทรายงานของ MIS"
   },
   {
    "t": "Exception report",
    "why": "MIS สร้าง Routine, Exception และ KPI reports"
   },
   {
    "t": "Forecast model",
    "why": "เป็นแบบจำลองพยากรณ์ ใกล้เคียง DSS มากกว่า"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ในองค์กรมีผู้ใช้หลายกลุ่ม ต้องการระบบที่ให้สร้างและปรับแต่งการวิเคราะห์ที่ซับซ้อนด้วยตนเอง",
  "q": "ใครคือผู้ใช้หลักของ DSS",
  "opts": [
   {
    "t": "ผู้บริหารระดับสูง",
    "why": "ใช้ ESS ดูภาพรวม"
   },
   {
    "t": "Super user และ analyst",
    "why": "ใช้ DSS วิเคราะห์ข้อมูลกึ่งโครงสร้างด้วยตนเอง"
   },
   {
    "t": "ผู้จัดการระดับกลาง",
    "why": "ใช้ MIS รับรายงานสรุป"
   },
   {
    "t": "พนักงานระดับปฏิบัติการ",
    "why": "ใช้ TPS บันทึกธุรกรรม"
   }
  ],
  "ans": 1
 }
]
});
