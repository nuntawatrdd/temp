IOT.reg({
  id: "erp",
  title: "ระบบบริหารทรัพยากรองค์กร (Enterprise Systems & ERP)",
  th: "Enterprise Applications 4 ประเภท, ERP คืออะไร ทำงานอย่างไร ส่วนประกอบ ซอฟต์แวร์ (SAP Business One) รูปแบบการติดตั้ง และมูลค่าทางธุรกิจ",
  summary: `
<h4>Enterprise Systems (จากบทที่ 2)</h4>
<ul>
<li><b>Enterprise systems</b> = ระบบที่ <b>เชื่อมโยงองค์กร</b>: (1) ครอบคลุมหลายฝ่าย (span functional areas) (2) ทำ <b>กระบวนการทางธุรกิจข้ามฝ่าย</b> (3) สนับสนุนการดำเนินงานและการตัดสินใจ <b>ทุกระดับ</b></li>
<li><b>Four Major Enterprise Applications</b>: <b>ERP, SCM, CRM, KMS</b></li>
<li>Enterprise applications automate processes ที่ข้ามหลายหน้าที่/หลายระดับ และอาจขยายออกนอกองค์กร (ผู้ขาย/พันธมิตร/ลูกค้า/ผู้จัดจำหน่าย)</li>
</ul>
<h4>ERP คืออะไร</h4>
<ul>
<li><b>ERP (Enterprise Resource Planning)</b> = ชุดโมดูลซอฟต์แวร์ที่บูรณาการกัน (suite of integrated software modules) + <b>ฐานข้อมูลกลางเดียว</b> (common central database)</li>
<li>เก็บข้อมูลจากหลายฝ่ายเพื่อใช้ในกิจกรรมภายในเกือบทั้งหมด; ข้อมูลที่ป้อนในกระบวนการหนึ่ง <b>พร้อมใช้ทันที</b> ในกระบวนการอื่น</li>
<li>แนวคิดสำคัญ: "หนึ่งองค์กร ใช้ข้อมูลร่วมกันจากฐานข้อมูลกลาง" แทนฐานข้อมูลแยกที่ไม่เชื่อมต่อกัน</li>
<li>ตัวอย่างข้อมูลในฐานข้อมูลกลาง: Finance (cash on hand, A/R, customer credit, revenue), Sales (orders, forecasts, return requests, price changes), Manufacturing (materials, schedules, shipment dates, capacity, purchases), HR (hours worked, labor cost, job skills)</li>
</ul>
<h4>ประวัติศาสตร์ ERP</h4>
<ul>
<li>1960s Mainframe: บัญชี (General Ledger, A/P, A/R, Financial Reporting) &rarr; 1970s Distributed: standalone apps (บัญชี, ขาย, จัดซื้อ, สินค้าคงคลัง, Material Planning) &rarr; 1980s Industry apps: <b>MRP II</b> สำหรับผู้ผลิต &rarr; 1990s Client/Server: <b>ERP introduced</b> (HR, CRM, Project Accounting, Real-time visibility, Multinational) &rarr; 2000s Web: Internet adopted (KPIs, Mobile, Dashboards, Customer-facing websites) &rarr; 2010s Cloud: Full cloud ERP, Mobility, E-commerce, IoT, AI/ML, Document management</li>
</ul>
<h4>วัตถุประสงค์ และ 5 องค์ประกอบ</h4>
<ul>
<li>Primary purpose: <b>Integration</b> ข้อมูลจัดซื้อ/HR/ผลิต/ขาย/บัญชีเข้าระบบเดียว; ปรับปรุงธุรกรรมแบบ <b>real-time</b> ทั่วโลก; ตัดสินใจจากข้อมูลล่าสุด</li>
<li>ERP Dashboard: แสดงสถานะปัจจุบันของปัจจัยธุรกิจสำคัญแก่ผู้บริหาร</li>
<li><b>5 components</b>: Hardware (cloud-based hosting / self-managed servers), Software (ERP application programs), Data (ERP databases), Procedures (business process procedures), People (ผู้ใช้ + ERP training and consulting)</li>
</ul>
<h4>ERP Software</h4>
<ul>
<li>Vendor ออกแบบให้ <b>configurable</b> ปรับได้โดยไม่ต้องแก้ code; มีกระบวนการธุรกิจแบบ <b>Best Practices</b> ไว้ล่วงหน้า</li>
<li>โมดูลหลัก: Finance/Accounting, Human Resources, Manufacturing/Production, Sales/Marketing</li>
<li>การนำไปใช้: เลือก function/module &rarr; จับคู่กระบวนการธุรกิจกับซอฟต์แวร์ &rarr; ใช้ <b>Configuration Tables</b> ปรับซอฟต์แวร์</li>
<li>ตัวอย่าง <b>SAP Business One</b>: สำหรับ SMEs แก้ปัญหาระบบแยกส่วน รวมทุกฟังก์ชันในระบบเดียว; ตัวอย่างการใช้: Business Partners Master Data, Purchase Request &rarr; Purchase Quotation &rarr; Purchase Order (ใช้ปุ่ม Copy To)</li>
</ul>
<h4>รูปแบบการติดตั้ง / Vendor / มูลค่า</h4>
<ul>
<li><b>Cloud ERP</b> (รันบนแพลตฟอร์มผู้ให้บริการ, provider ดูแลระบบ, public/private cloud), <b>On-Premise ERP</b> (ติดตั้งบนโครงสร้างพื้นฐานขององค์กรเอง, องค์กรดูแลเอง), <b>Hybrid ERP</b> (ผสมทั้งสอง)</li>
<li>Vendors: <b>SAP, Microsoft (Dynamics 365), Oracle</b></li>
<li><b>Business value</b> 4 ข้อ: เพิ่มประสิทธิภาพการดำเนินงาน; ให้สารสนเทศทั่วองค์กรสนับสนุนการตัดสินใจ; ตอบสนองลูกค้าได้รวดเร็ว; มีเครื่องมือวิเคราะห์ประเมินผลการดำเนินงานรวม</li>
</ul>
`,
  sections: [
    {
      t: "Enterprise Systems: ระบบที่เชื่อมโยงองค์กร",
      ref: "สไลด์ 1-3",
      html: `
<p>บทนี้ชื่อ "Achieving Operational Excellence & Customer Intimacy: Enterprise Applications (1)" และมีหัวข้อหลัก 2 หัวข้อ คือ <b>Enterprise System</b> และ <b>Enterprise Resource Planning system (ERP)</b></p>
<h4>Systems for linking the enterprise</h4>
<p>Enterprise systems (ทบทวนจากบทที่ 2) คือระบบที่ใช้ "เชื่อมโยงองค์กร" ทั้งองค์กรเข้าด้วยกัน มี 3 ลักษณะ</p>
<ul>
<li><b>ครอบคลุมการทำงานของหลายฝ่ายในองค์กร</b> (Span functional areas) เช่น ขาย ผลิต บัญชี HR ใช้ระบบเดียวกัน</li>
<li><b>ใช้ดำเนินการกระบวนการทางธุรกิจทั่วทั้งองค์กร รวมถึงกระบวนการที่ทำงานข้ามฝ่าย</b> (Execute business processes across the firm) เช่น กระบวนการ order-to-cash ที่ผ่านทั้งฝ่ายขาย คลังสินค้า และการเงิน</li>
<li><b>สนับสนุนการดำเนินงานและการตัดสินใจในทุกระดับขององค์กร</b> (Support operations and decision-making at all levels)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลักษณะ Enterprise systems 3 ข้อ: span functional areas / execute business processes across the firm / support operations & decision-making at all levels</li>
<li><b>Four Major Enterprise Applications</b>: <b>ERP</b> (Enterprise Resource Planning), <b>SCM</b> (Supply Chain Management), <b>CRM</b> (Customer Relationship Management), <b>KMS</b> (Knowledge Management System)</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> บทนี้ (ตอนที่ 1) เน้น ERP เป็นหลัก ส่วน SCM, CRM, KMS เป็นอีก 3 ระบบหลักในกลุ่มเดียวกัน</div>
`
    },
    {
      t: "Enterprise Application Architecture (Figure 2-6)",
      ref: "สไลด์ 4",
      html: `
<p>ข้อความหลัก: <b>Enterprise applications automate processes that span multiple business functions and organizational levels and may extend outside the organization.</b> คือ ระบบองค์กรทำกระบวนการให้อัตโนมัติ โดยกระบวนการนั้นข้ามหลายหน้าที่ทางธุรกิจ ข้ามหลายระดับขององค์กร และอาจขยายไปนอกองค์กรได้</p>
<h4>ภาพ Figure 2-6 อธิบายอย่างไร</h4>
<p>ภาพเป็น <b>พีระมิด</b> แนวตั้งแบ่งตามฝ่ายงาน (Functional areas) 4 ฝ่าย คือ <b>Sales and Marketing, Manufacturing and Production, Finance and Accounting, Human Resources</b> แต่ละฝ่ายเป็นแถบสีต่างกัน ส่วนพีระมิดแบ่งเป็นชั้นตามระดับการจัดการ แล้วมีวงรีคาดทับ 3 วงเพื่อสื่อความหมายของ enterprise application:</p>
<ul>
<li>วงรีแนวตั้ง (1) <b>Span functional areas</b> คือ Enterprise Systems และ Knowledge Management Systems ที่ตั้งอยู่กลางพีระมิดตัดผ่านทุกฝ่าย</li>
<li>วงรีแนวนอน (2) <b>Execute business processes across firm</b> คือ Supply Chain Management Systems (ฝั่งซ้าย เชื่อมกับ Suppliers, Business Partners) และ Customer Relationship Management Systems (ฝั่งขวา เชื่อมกับ Customers, Distributors) ที่มี Processes เชื่อมข้ามฝ่าย และออกไปนอกองค์กร</li>
<li>(3) <b>Support operations and decision-making at all levels</b> คือระบบเหล่านี้รองรับทุกระดับตั้งแต่ปฏิบัติการจนถึงผู้บริหาร</li>
</ul>
<div class="dg"><div class="dgt">🖼️ ภาพรวม Enterprise Application Architecture</div>
<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="20" width="110" height="40"/><text class="t sm" x="65" y="45" text-anchor="middle">Suppliers / Partners</text>
<rect class="bx" x="520" y="20" width="110" height="40"/><text class="t sm" x="575" y="45" text-anchor="middle">Customers / Distributors</text>
<rect class="bx hd" x="150" y="85" width="340" height="40"/><text class="t b" x="320" y="110" text-anchor="middle">Enterprise Systems (ERP)</text>
<rect class="bx ok" x="10" y="85" width="110" height="40"/><text class="t sm" x="65" y="110" text-anchor="middle">SCM Systems</text>
<rect class="bx ok" x="520" y="85" width="110" height="40"/><text class="t sm" x="575" y="110" text-anchor="middle">CRM Systems</text>
<line class="ln" x1="65" y1="60" x2="65" y2="85"/><line class="ln" x1="575" y1="60" x2="575" y2="85"/>
<line class="ln" x1="120" y1="105" x2="150" y2="105"/><line class="ln" x1="490" y1="105" x2="520" y2="105"/>
<rect class="bx" x="150" y="145" width="340" height="35"/><text class="t sm" x="320" y="167" text-anchor="middle">Knowledge Management Systems (KMS)</text>
<rect class="bx" x="20" y="200" width="140" height="35"/><text class="t sm" x="90" y="222" text-anchor="middle">Sales &amp; Marketing</text>
<rect class="bx" x="170" y="200" width="140" height="35"/><text class="t sm" x="240" y="222" text-anchor="middle">Manufacturing &amp; Production</text>
<rect class="bx" x="320" y="200" width="140" height="35"/><text class="t sm" x="390" y="222" text-anchor="middle">Finance &amp; Accounting</text>
<rect class="bx" x="470" y="200" width="140" height="35"/><text class="t sm" x="540" y="222" text-anchor="middle">Human Resources</text>
</svg></div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Enterprise applications = automate processes ที่ <b>ข้ามหลายฟังก์ชันและหลายระดับ</b> และอาจ <b>ขยายออกนอกองค์กร</b></li>
<li>SCM เชื่อมกับ Suppliers/Business partners; CRM เชื่อมกับ Customers/Distributors</li>
</ul></div>
`
    },
    {
      t: "กระบวนการทางธุรกิจโดยทั่วไปของบริษัทผู้ผลิต",
      ref: "สไลด์ 5-6",
      html: `
<p>สไลด์ 5 เป็นหน้าคั่นหัวข้อ <b>Enterprise Resource Planning System: ERP (ระบบบริหารทรัพยากรองค์กร)</b></p>
<p>สไลด์ 6 หัวข้อ "กระบวนการทางธุรกิจโดยทั่วไป" (Typical business processes in a manufacturing company) เป็นภาพแผนผังที่แสดงว่าในบริษัทผู้ผลิตหนึ่ง มี 'ฝ่าย/บทบาท' ต่างๆ ต่อไปนี้ และมีลูกศรเชื่อมโยงกันไปมาเต็มไปหมด:</p>
<ul>
<li><b>Customers</b> (ลูกค้า) &harr; <b>Sales</b> (ฝ่ายขาย) รับคำสั่งซื้อ/ส่งข้อมูลกลับ</li>
<li><b>Sales</b> &rarr; <b>Inventory</b> (สินค้าคงคลัง), <b>Production Planning</b> (วางแผนผลิต), <b>Finance</b> (การเงิน), <b>HR</b></li>
<li><b>Production Planning</b> &rarr; <b>Vendors</b> (ผู้ขายวัตถุดิบ), <b>Shop floor execution</b> (การผลิตหน้างาน), Inventory, Finance, HR</li>
<li><b>Shop floor execution</b> &rarr; HR, Sales; <b>Vendors</b> &rarr; Finance</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> จุดที่สไลด์ต้องการสื่อ: กระบวนการทางธุรกิจจริงเชื่อมโยงกันหลายฝ่ายมาก ถ้าแต่ละฝ่ายมีระบบและข้อมูลแยกกัน การส่งข้อมูลระหว่างฝ่ายจะยุ่งยาก ซ้ำซ้อน และผิดพลาดง่าย จึงต้องมีระบบรวมศูนย์อย่าง ERP</div>
`
    },
    {
      t: "ERP คืออะไร (Definition)",
      ref: "สไลด์ 7",
      html: `
<p><b>Enterprise Resource Planning System: ERP (ระบบบริหารทรัพยากรองค์กร)</b> มีลักษณะสำคัญ 3 ข้อ:</p>
<ol>
<li><b>Suite of integrated software modules and a common central database</b> คือชุดโมดูลซอฟต์แวร์ที่บูรณาการกัน และมีฐานข้อมูลกลางร่วมกัน</li>
<li><b>Collects data from many divisions of firm for use in nearly all of firm's internal business activities</b> รวบรวมข้อมูลจากหลายฝ่ายของบริษัท เพื่อใช้ในกิจกรรมทางธุรกิจภายในแทบทั้งหมด</li>
<li><b>Information entered in one process is immediately available for other processes</b> ข้อมูลที่ป้อนในกระบวนการหนึ่งพร้อมใช้ทันทีสำหรับกระบวนการอื่น เช่น ฝ่ายขายบันทึกออเดอร์ ฝ่ายคลังและบัญชีเห็นทันทีโดยไม่ต้องกรอกซ้ำ</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ERP = <b>integrated modules + common central database</b></li>
<li>ข้อมูลเข้าที่หนึ่ง &rarr; ใช้ได้ทันทีทุกกระบวนการ (ไม่ต้องกรอกซ้ำ)</li>
</ul></div>
`
    },
    {
      t: "ประวัติศาสตร์ของ ERP (The History of ERP)",
      ref: "สไลด์ 8",
      html: `
<p>สไลด์เป็น timeline วิวัฒนาการของ ERP ตามยุคเทคโนโลยี:</p>
<table>
<tr><th>ยุค</th><th>เทคโนโลยี</th><th>ลักษณะ</th><th>ความสามารถ/ตัวอย่าง</th></tr>
<tr><td>1960s</td><td>Mainframe Computers</td><td>Finance and Accounting</td><td>General Ledger, Accounts Payable, Accounts Receivable, Financial Reporting</td></tr>
<tr><td>1970s</td><td>Distributed Computing</td><td>Standalone Applications</td><td>Finance & Accounting, Sales Order Processing, Purchasing, Inventory, Material Planning</td></tr>
<tr><td>1980s</td><td>Industry Applications</td><td>MRP II for Manufacturers</td><td>เริ่มใช้ Material Requirements Planning (MRP) และเชื่อมกับ Finance & Accounting, Sales Order Processing, Purchasing & Inventory</td></tr>
<tr><td>1990s</td><td>Client/Server</td><td><b>ERP Introduced</b></td><td>Extended MRP II, Human Resources, Project Accounting, CRM, Real-Time Visibility, Multinational</td></tr>
<tr><td>2000s</td><td>Web Applications</td><td>Internet Adopted</td><td>ERP Enhanced, KPIs/Analytics, Mobile Devices, Field Services, Alerts & Dashboards, Customer Facing Websites</td></tr>
<tr><td>2010s</td><td>Cloud Computing</td><td>Cloud Adopted</td><td>Full Cloud ERP, Full Mobility, Ecommerce, IoT, Introduction of AI/ML, Document Management</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลำดับ: บัญชีบน mainframe (60s) &rarr; standalone apps (70s) &rarr; MRP II (80s) &rarr; <b>ERP ถือกำเนิดยุค client/server (90s)</b> &rarr; web (2000s) &rarr; cloud (2010s)</li>
</ul></div>
`
    },
    {
      t: "ERP ทำงานอย่างไร (How ERP Systems Work)",
      ref: "สไลด์ 9",
      html: `
<p>ERP ประกอบด้วยชุดของโมดูลซอฟต์แวร์แบบบูรณาการ และฐานข้อมูลกลาง ที่ช่วยให้หลายกระบวนการทางธุรกิจที่แตกต่างกันและการทำงานต่างๆ ทั่วองค์กรได้ใช้ข้อมูลร่วมกัน</p>
<div class="must"><b>🔥 ต้องจำ</b> แนวคิดสำคัญของ ERP คือ <b>"หนึ่งองค์กร ใช้ข้อมูลร่วมกันจากฐานข้อมูลกลาง"</b> แทนการมีฐานข้อมูลแยกกันที่ไม่เชื่อมต่อกัน</div>
<h4>ภาพ: Centralized Database อยู่ตรงกลาง มี 4 โมดูลล้อมรอบ (ลูกศรสองทาง)</h4>
<div class="dg"><div class="dgt">🖼️ ERP กับ Centralized Database</div>
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
<rect class="bx ok" x="240" y="10" width="160" height="40"/><text class="t b" x="320" y="35" text-anchor="middle">Finance &amp; Accounting</text>
<rect class="bx" x="10" y="130" width="140" height="40"/><text class="t b" x="80" y="155" text-anchor="middle">Sales &amp; Marketing</text>
<rect class="bx" x="490" y="130" width="140" height="40"/><text class="t b" x="560" y="155" text-anchor="middle">Human Resources</text>
<rect class="bx" x="220" y="250" width="200" height="40"/><text class="t b" x="320" y="275" text-anchor="middle">Manufacturing &amp; Production</text>
<rect class="bx hd" x="240" y="115" width="160" height="70"/><text class="t b" x="320" y="155" text-anchor="middle">Centralized Database</text>
<line class="ln" x1="320" y1="50" x2="320" y2="115"/><line class="ln" x1="150" y1="150" x2="240" y2="150"/><line class="ln" x1="400" y1="150" x2="490" y2="150"/><line class="ln" x1="320" y1="185" x2="320" y2="250"/>
</svg></div>
<table>
<tr><th>โมดูล</th><th>ข้อมูลที่เชื่อมกับฐานข้อมูลกลาง</th></tr>
<tr><td>Finance & Accounting</td><td>Cash on hand, Accounts receivable, Customer credit, Revenue</td></tr>
<tr><td>Sales & Marketing</td><td>Orders, Sales forecasts, Return requests, Price changes</td></tr>
<tr><td>Human Resources</td><td>Hours worked, Labor cost, Job skills</td></tr>
<tr><td>Manufacturing & Production</td><td>Materials, Production schedules, Shipment dates, Production capacity, Purchases</td></tr>
</table>
`
    },
    {
      t: "วัตถุประสงค์ของ ERP (The Purpose of ERP Systems)",
      ref: "สไลด์ 10",
      html: `
<p><b>Primary purpose</b> ของ ERP มี 3 ข้อ:</p>
<ol>
<li><b>Integration</b> ของข้อมูลการจัดซื้อ ทรัพยากรบุคคล การผลิต การขาย และการบัญชี <b>เข้าสู่ระบบเดียว</b> (single system)</li>
<li><b>Allow real-time global updates</b> of transactions คือให้ปรับปรุงธุรกรรมแบบ real-time ได้ทั่วโลก</li>
<li><b>Enable critical business decisions using latest data</b> ช่วยให้ตัดสินใจทางธุรกิจที่สำคัญโดยใช้ข้อมูลล่าสุด</li>
</ol>
<h4>ภาพ</h4>
<p>ERP Database อยู่ตรงกลาง ล้อมด้วย 8 กลุ่มแอปพลิเคชันที่ทั้งอ่านและเขียนข้อมูล ได้แก่ Sales Applications, Relationship Management Applications, Customer Support Applications, Accounting Applications, Manufacturing Applications, Inventory Applications, Human Resources Applications, และ Solicitation and Lead Management Applications</p>
<div class="must"><b>🔥 ต้องจำ</b> คำหลัก 3 คำของวัตถุประสงค์: <b>Integration / Real-time / Decisions with latest data</b></div>
`
    },
    {
      t: "ERP Enabled Sales Dashboard",
      ref: "สไลด์ 11",
      html: `
<p>เมื่อระบบบูรณาการกัน ERP สามารถ <b>แสดงสถานะปัจจุบันของปัจจัยทางธุรกิจที่สำคัญ</b> ให้แก่ผู้จัดการและผู้บริหารได้ (With integration, ERP systems can display current status of critical business factors to managers and executives.)</p>
<h4>ภาพตัวอย่าง (Microsoft Dynamics CRM: Sales Performance w Map)</h4>
<ul>
<li>แผนที่แสดงพื้นที่ขาย/โอกาสทางการขาย (ตัวอย่างเมือง Seattle)</li>
<li>กราฟวงกลม Opportunity by Source Campaign</li>
<li>Sales Pipeline แสดงเป็นรูปกรวย (funnel) ตามขั้น Qualification, Discovery</li>
<li>กราฟ My Estimated vs. Actual Revenue by Salesperson</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> Dashboard ทำได้เพราะข้อมูลทุกฝ่ายอยู่ในฐานข้อมูลกลางและเป็นปัจจุบัน ผู้บริหารจึงเห็นภาพรวมได้ในหน้าจอเดียว</div>
`
    },
    {
      t: "ส่วนประกอบ 5 อย่างของ ERP Solution",
      ref: "สไลด์ 12",
      html: `
<p>ERP solution เป็นระบบสารสนเทศ (information system) ที่มี <b>5 components</b>:</p>
<ol>
<li><b>Hardware</b>: แบบ <b>Cloud-based hosting</b> (ใช้ฮาร์ดแวร์ของผู้ให้บริการ) หรือ <b>Self-managed servers</b> (เซิร์ฟเวอร์ที่องค์กรดูแลเอง)</li>
<li><b>Software</b>: ERP application programs</li>
<li><b>Data</b>: ERP databases</li>
<li><b>Procedures</b>: ขั้นตอนกระบวนการทางธุรกิจของ ERP (ERP business process procedures)</li>
<li><b>People</b>: ผู้ที่เกี่ยวข้องกับระบบ ERP รวมถึง ERP training and consulting</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b> 5 องค์ประกอบ: <b>Hardware, Software, Data, Procedures, People</b> (เหมือนองค์ประกอบของระบบสารสนเทศทั่วไป)</div>
`
    },
    {
      t: "ERP Software: Configurable, Best Practices และโมดูลหลัก",
      ref: "สไลด์ 13",
      html: `
<ul>
<li>ผู้ขาย ERP ออกแบบโปรแกรมให้ <b>configurable</b> คือทีมพัฒนาปรับให้ตรงความต้องการลูกค้าได้ <b>โดยไม่ต้องเปลี่ยนโค้ดโปรแกรม</b></li>
<li>ERP Software มีการกำหนดกระบวนการทางธุรกิจไว้ล่วงหน้า ซึ่งสะท้อนแนวทางปฏิบัติที่ดี (<b>Best Practices</b>)</li>
</ul>
<h4>ตัวอย่างฟังก์ชันของโมดูลหลัก 4 กลุ่ม</h4>
<table>
<tr><th>กลุ่ม</th><th>ตัวอย่างฟังก์ชัน</th></tr>
<tr><td>Finance/accounting</td><td>general ledger, accounts payable, accounts receivable, fixed assets, cash management and forecast, financial reporting</td></tr>
<tr><td>Human resources</td><td>personnel administration, payroll, benefit accounting, workforce planning</td></tr>
<tr><td>Manufacturing/production</td><td>inventory management, purchasing, shipping, production planning, quality control, plant and equipment maintenance</td></tr>
<tr><td>Sales/marketing</td><td>order processing, sales planning, pricing, credit checking, commission management</td></tr>
</table>
<h4>ขั้นตอนที่องค์กรต้องทำเมื่อ implement</h4>
<ol>
<li>เลือกฟังก์ชันและโมดูลของระบบที่องค์กรต้องการใช้งาน</li>
<li>จับคู่กระบวนการทางธุรกิจกับกระบวนการทำงานของซอฟต์แวร์</li>
<li>ใช้ <b>ตารางกำหนดค่า (Configuration Tables)</b> เพื่อปรับการทำงานของซอฟต์แวร์ให้ตรงกับความต้องการของผู้ใช้</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ปรับ ERP ด้วย <b>Configuration Tables</b> ไม่ใช่การแก้ source code</li>
<li>Best Practices = กระบวนการมาตรฐานที่ฝังมากับซอฟต์แวร์</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Configuration (ตั้งค่าผ่านตาราง) ไม่เท่ากับ Customization (เขียนโค้ดเพิ่ม) สไลด์เน้นว่า ERP ถูกออกแบบให้ปรับได้โดยไม่ต้องแก้โค้ด</div>
`
    },
    {
      t: "ตัวอย่าง ERP Software: SAP Business One",
      ref: "สไลด์ 14",
      html: `
<ul>
<li><b>SAP Business One</b> เป็นซอฟต์แวร์ที่ออกแบบมาโดยเฉพาะเพื่อตอบสนองความต้องการและความท้าทายของธุรกิจ <b>ขนาดเล็กและขนาดกลาง (SMEs)</b></li>
<li>ช่วยแก้ปัญหาที่เกิดจากกระบวนการทางธุรกิจหรือระบบสารสนเทศที่ <b>แยกจากกันและไม่เชื่อมต่อกัน</b></li>
</ul>
<h4>สิ่งที่ SAP Business One ทำ</h4>
<ul>
<li>รวมและเพิ่มความคล่องตัวในทุกฟังก์ชัน ทั้งการขาย การตลาด ลูกค้า การเงิน และการดำเนินงาน ทั้งหมดในระบบเดียว เพื่อให้ธุรกิจดำเนินงานเสมือนระบบเดียวที่ไร้รอยต่อ</li>
<li>จัดเก็บและเชื่อมโยงข้อมูลทางธุรกิจที่สำคัญไว้ในฐานข้อมูลส่วนกลาง ผู้ที่เกี่ยวข้องเข้าถึงและใช้ข้อมูลร่วมกันได้ทันที โดยไม่ต้องดึงข้อมูลจากระบบที่แยกจากกัน</li>
</ul>
<h4>ภาพ</h4>
<p>ภาพบนแสดงฝ่าย Sales, Services, Finance, Operations ที่ต่อกันด้วยเส้นประพร้อมเครื่องหมาย ! และ ? (X สีแดง) หมายถึง <b>ระบบแยกส่วน ข้อมูลไม่ตรงกัน</b> ส่วนภาพล่างเป็นวงกลม "Complete Integration" ที่มี Executive, Sales, Operations, Services, Finance, Analytics อยู่บนฐานเดียวกัน</p>
<div class="must"><b>🔥 ต้องจำ</b> SAP Business One = ERP สำหรับ <b>SMEs</b>, แก้ปัญหาระบบแยกส่วน, รวมทุกฟังก์ชันในระบบเดียวบน central database</div>
`
    },
    {
      t: "ตัวอย่างหน้าจอ SAP Business One: เมนูโมดูลและ Master Data",
      ref: "สไลด์ 15-16",
      html: `
<h4>สไลด์ 15: Functions in SAP Business One</h4>
<p>หน้าจอ Main Menu (ตัวอย่างบริษัท Sala Daeng Co., Ltd.) แสดง <b>โมดูล</b> ทางซ้าย ได้แก่ Administration, Financials, Sales Opportunities, Sales - A/R, Purchasing - A/P, Business Partners, Banking, Inventory, Production, MRP, Service, Human Resources, Reports ตัวอย่างหน้าต่างที่เปิดคือ <b>Confirmation of Recurring Postings</b> (รายการบัญชีที่เกิดซ้ำ เช่น ค่าเช่า Rent 107,000 บาท ต่อเดือน รวม 15 รายการ) ที่ให้กด Execute เพื่อบันทึกบัญชีอัตโนมัติ</p>
<h4>สไลด์ 16: Business Partners Master Data</h4>
<p>หน้าจอ <b>Business Partner Master Data</b> ใช้เก็บข้อมูลหลักของคู่ค้า (ลูกค้า/ผู้ขาย) เช่น Code, Name, Group, Currency, เบอร์โทร, อีเมล, ผู้ติดต่อ, ที่อยู่การจัดส่ง, ประเภท (Company) มีแท็บ General, Payment Terms, Payment Run, Accounting, Remarks</p>
<div class="note"><b>💡 หมายเหตุ</b> Master Data คือข้อมูลหลักที่เก็บครั้งเดียวและทุกโมดูลนำไปใช้ซ้ำ (เช่น ข้อมูลลูกค้า) สอดคล้องกับแนวคิดฐานข้อมูลกลาง ไม่ต้องบันทึกซ้ำในแต่ละฝ่าย</div>
`
    },
    {
      t: "ตัวอย่างกระบวนการจัดซื้อ: Purchase Request -> Quotation -> Order",
      ref: "สไลด์ 17-20",
      html: `
<p>4 สไลด์นี้แสดงตัวอย่างการทำงานต่อเนื่องของโมดูล <b>Purchasing - A/P</b> ใน SAP Business One:</p>
<ol>
<li><b>Purchase Request (ใบเสนอขอซื้อ)</b> ผู้ขอ (Requester) ระบุรายการสินค้า (Item No. A00001), ผู้ขาย (Vendor V10000), วันที่ต้องการ, จำนวน, ราคา รวมยอดพร้อมภาษี (ตัวอย่าง GBP 200 + tax 35 = 235)</li>
<li><b>Purchase Request &rarr; Purchase Quotation</b> กดปุ่ม <b>Copy To</b> แล้วเลือก Purchase Quotation (หรือ Purchase Order) ข้อมูลถูกคัดลอกไป ไม่ต้องกรอกใหม่</li>
<li><b>Purchase Quotation (ใบเสนอราคา)</b> ได้เอกสารใหม่ที่มี Vendor (Acme Associates), Contact Person, รายการสินค้าเดิม และช่อง Remarks ระบุ "Based On Purchase Request 1"</li>
<li><b>Purchase Quotation &rarr; Purchase Order</b> กด <b>Copy To</b> เลือก Purchase Order ได้ใบสั่งซื้อที่อ้างอิงเอกสารต้นทางทั้งหมด (Remarks: Based On Purchase Request 1, Based On Purchase Quotation 1) นอกจากนี้ยังคัดลอกไปเป็น Goods Receipt PO, A/P Invoice, Reserve Invoice ได้</li>
</ol>
<div class="dg"><div class="dgt">🖼️ ลำดับเอกสารในกระบวนการจัดซื้อ</div>
<svg viewBox="0 0 640 90" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="25" width="170" height="40"/><text class="t b" x="95" y="50" text-anchor="middle">Purchase Request</text>
<rect class="bx" x="235" y="25" width="170" height="40"/><text class="t b" x="320" y="50" text-anchor="middle">Purchase Quotation</text>
<rect class="bx ok" x="460" y="25" width="170" height="40"/><text class="t b" x="545" y="50" text-anchor="middle">Purchase Order</text>
<line class="ln ok" x1="180" y1="45" x2="235" y2="45"/><line class="ln ok" x1="405" y1="45" x2="460" y2="45"/>
<text class="t sm" x="207" y="38" text-anchor="middle">Copy To</text><text class="t sm" x="432" y="38" text-anchor="middle">Copy To</text>
</svg></div>
<div class="note"><b>💡 หมายเหตุ</b> หัวใจคือ <b>ข้อมูลไหลต่อเนื่องระหว่างเอกสาร</b> โดยไม่ต้องกรอกซ้ำ และทุกเอกสารอ้างอิงต้นทางได้ (traceable) ซึ่งเป็นตัวอย่างของ "ข้อมูลที่ป้อนในกระบวนการหนึ่งพร้อมใช้ในกระบวนการอื่นทันที"</div>
`
    },
    {
      t: "รูปแบบการติดตั้ง ERP (Types of ERP Deployment)",
      ref: "สไลด์ 21",
      html: `
<ul>
<li><b>Cloud ERP</b>: ซอฟต์แวร์รันบนแพลตฟอร์มคลาวด์ของผู้ให้บริการ การบำรุงรักษาระบบเป็นหน้าที่ของ provider ใช้ได้ทั้ง <b>public cloud</b> หรือ <b>private cloud</b> ตามความต้องการขององค์กร</li>
<li><b>On-Premise ERP</b>: ติดตั้งบนโครงสร้างพื้นฐานที่องค์กรเป็นเจ้าของหรือควบคุม เช่น เซิร์ฟเวอร์ใน data center ของตนเอง องค์กรต้อง <b>ดูแลและบำรุงรักษา</b> ฮาร์ดแวร์ โครงสร้างพื้นฐาน และซอฟต์แวร์เอง</li>
<li><b>Hybrid ERP</b>: ผสม Cloud ERP และ On-Premise ERP บางแอปพลิเคชันหรือข้อมูลรันบนคลาวด์ ขณะที่บางส่วนอยู่ on-premises</li>
</ul>
<p>ภาพ: รูปก้อนเมฆมี ERP (Cloud), กล่องลูกบาศก์มี ERP (On-premise) และกล่องที่มีเมฆวางบน (Hybrid)</p>
<table>
<tr><th>รูปแบบ</th><th>ซอฟต์แวร์อยู่ที่</th><th>ใครดูแลระบบ</th></tr>
<tr><td>Cloud</td><td>แพลตฟอร์มคลาวด์ของ provider</td><td>Provider</td></tr>
<tr><td>On-Premise</td><td>เซิร์ฟเวอร์ขององค์กร</td><td>องค์กรเอง</td></tr>
<tr><td>Hybrid</td><td>ผสมทั้งคลาวด์และในองค์กร</td><td>แบ่งกัน</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b> 3 แบบ: <b>Cloud / On-Premise / Hybrid</b> และผู้รับผิดชอบการดูแลระบบของแต่ละแบบ</div>
`
    },
    {
      t: "ตัวอย่างผู้ขาย ERP (ERP Vendors)",
      ref: "สไลด์ 22",
      html: `
<p>ผู้ขาย ERP ที่ยกเป็นตัวอย่าง 3 ราย:</p>
<ul>
<li><b>SAP</b> (sap.com/products/erp)</li>
<li><b>Microsoft</b> (Dynamics 365)</li>
<li><b>Oracle</b> (oracle.com/erp)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b> Vendor ตัวอย่าง: <b>SAP, Microsoft (Dynamics 365), Oracle</b> (SAP Business One ในหัวข้อก่อนหน้าเป็นผลิตภัณฑ์ของ SAP)</div>
`
    },
    {
      t: "มูลค่าทางธุรกิจของ ERP (Business Value of ERP Systems)",
      ref: "สไลด์ 23",
      html: `
<p>ERP ให้คุณค่าทางธุรกิจ 4 ข้อ:</p>
<ol>
<li><b>เพิ่มประสิทธิภาพการดำเนินงาน</b> (Increase operational efficiency) เพราะกระบวนการเชื่อมกัน ลดการกรอกซ้ำและความผิดพลาด</li>
<li><b>ให้สารสนเทศที่ครอบคลุมทั้งองค์กรเพื่อสนับสนุนการตัดสินใจ</b> (Provide organization-wide information to support decision-making)</li>
<li><b>ตอบสนองลูกค้าได้อย่างรวดเร็ว</b> เมื่อลูกค้าต้องการข้อมูลหรือสินค้า (Enable rapid responses to customer requests for information or products)</li>
<li><b>มีเครื่องมือวิเคราะห์เพื่อประเมินผลการดำเนินงานของทั้งองค์กร</b> (Provide analytical tools to evaluate overall organizational performance)</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b> 4 มูลค่า: ประสิทธิภาพ (efficiency) / สารสนเทศทั่วองค์กรเพื่อตัดสินใจ / ตอบสนองลูกค้าเร็ว / เครื่องมือวิเคราะห์ผลงาน</div>
`
    }
  ],
  ex: [
    {"type":"choice","story":"แผนกไอทีของบริษัทกำลังทำรายการระบบองค์กรที่เป็นหลักของบทนี้ มีแล้ว ERP, SCM, CRM","q":"ข้อใดไม่อยู่ใน Enterprise Application หลักทั้ง 4","opts":[{"t":"KMS","why":"KMS เป็นระบบหลักตัวที่ 4 ของกลุ่ม"},{"t":"SCM","why":"SCM เป็นหนึ่งในระบบหลักทั้ง 4"},{"t":"ESS","why":"ESS คือระบบสนับสนุนผู้บริหาร ไม่ใช่หนึ่งใน 4 ระบบหลัก"},{"t":"CRM","why":"CRM เป็นหนึ่งในระบบหลักทั้ง 4"}],"ans":2},
    {"type":"choice","story":"ด้านขวาของแผนภาพ Enterprise Application Architecture เชื่อมออกไปหาผู้ซื้อสินค้าและตัวแทนจำหน่าย","q":"ระบบฝั่งขวานี้คือระบบใด","opts":[{"t":"CRM","why":"CRM เชื่อมกับ Customers และ Distributors"},{"t":"SCM","why":"SCM อยู่ฝั่งซ้าย เชื่อมกับ Suppliers"},{"t":"DSS","why":"DSS ไม่ใช่ระบบหลักทั้ง 4 ในแผนภาพ"},{"t":"KMS","why":"KMS อยู่ตรงกลางพาดผ่านทุกฝ่าย"}],"ans":0},
    {"type":"choice","story":"ในแผนภาพเดียวกัน ด้านซ้ายของระบบองค์กรเชื่อมออกไปยังกลุ่มภายนอก คือ Suppliers และ Business Partners","q":"ระบบฝั่งซ้ายนี้คือระบบใด","opts":[{"t":"CRM","why":"CRM อยู่ฝั่งขวา เชื่อมกับ Customers/Distributors"},{"t":"KMS","why":"KMS อยู่ตรงกลางพาดผ่านทุกฝ่าย"},{"t":"ERP","why":"ERP คือแกนกลาง ไม่ใช่ตัวเชื่อมฝั่งซ้ายโดยเฉพาะ"},{"t":"SCM","why":"SCM เชื่อมกับ Suppliers และ Business partners"}],"ans":3},
    {"type":"choice","story":"ผู้สอนให้นักศึกษาเขียนฝ่ายงานหลักที่อยู่ในพีระมิดของ Enterprise Application Architecture","q":"ข้อใดไม่ใช่ฝ่ายงานทั้ง 4 ในพีระมิด","opts":[{"t":"Human Resources","why":"HR เป็นหนึ่งในฝ่ายงานทั้ง 4"},{"t":"Logistics and Purchasing","why":"ฝ่ายงาน 4 ฝ่ายคือ Sales, Manufacturing, Finance, HR ไม่มี Logistics"},{"t":"Sales and Marketing","why":"Sales and Marketing เป็นหนึ่งในฝ่ายงานทั้ง 4"},{"t":"Finance and Accounting","why":"Finance and Accounting เป็นหนึ่งในฝ่ายงานทั้ง 4"}],"ans":1},
    {"type":"choice","story":"เจ้าของกิจการถามที่ปรึกษาว่าซอฟต์แวร์ที่ชื่อ ERP ถูกสร้างขึ้นจากอะไร","q":"ข้อใดตรงกับนิยามของ ERP","opts":[{"t":"โมดูลอิสระ + ฐานข้อมูลแยกฝ่าย","why":"นี่คือระบบแยกส่วนแบบเดิม ไม่ใช่ ERP"},{"t":"Data warehouse + เครื่องมือ OLAP","why":"เป็นนิยามของระบบคลังข้อมูลและวิเคราะห์ ไม่ใช่ ERP"},{"t":"โมดูลบูรณาการ + ฐานข้อมูลกลาง","why":"ERP คือชุดโมดูลที่บูรณาการกัน มีฐานข้อมูลกลางเดียว"},{"t":"DBMS + เครื่องมือ query","why":"เป็นระบบจัดการฐานข้อมูลทั่วไป ไม่ใช่ ERP"}],"ans":2},
    {"type":"choice","story":"แผนภาพการทำงานของ ERP วาดโมดูล Finance, Sales, HR, Manufacturing ล้อมรอบจุดศูนย์กลางหนึ่งจุด โดยลูกศรสองทาง","q":"จุดศูนย์กลางของแผนภาพนี้คืออะไร","opts":[{"t":"Data warehouse","why":"ERP ไม่ได้ใช้ data warehouse เป็นศูนย์กลางของโมดูล"},{"t":"Centralized database","why":"ทุกโมดูลอ่านเขียนข้อมูลจากฐานข้อมูลกลางเดียว"},{"t":"Data mart ประจำโมดูล","why":"แต่ละโมดูลไม่ได้แยก data mart ของตนเอง"},{"t":"Knowledge base","why":"เป็นที่เก็บองค์ความรู้ของ KMS ไม่ใช่ศูนย์กลาง ERP"}],"ans":1},
    {"type":"choice","story":"ตามไทม์ไลน์ ERP ช่วงทศวรรษที่คอมพิวเตอร์ถูกกระจายไปใช้ตามหน่วยงานต่าง ๆ ระบบมีลักษณะอย่างไร","q":"ลักษณะของระบบในยุค 1970s คือข้อใด","opts":[{"t":"MRP II สำหรับผู้ผลิต","why":"MRP II เป็นยุค 1980s"},{"t":"Mainframe ด้านบัญชีล้วน","why":"Mainframe บัญชีเป็นยุค 1960s"},{"t":"ERP แบบ Web-based","why":"ERP แบบ Web เป็นยุค 2000s"},{"t":"Standalone applications","why":"1970s ใช้ Distributed computing แบบ standalone"}],"ans":3},
    {"type":"choice","story":"ทศวรรษที่ซอฟต์แวร์เริ่มแยกตามอุตสาหกรรม โรงงานผู้ผลิตได้ระบบวางแผนเฉพาะทางมาใช้","q":"ระบบเด่นของยุคนี้ (1980s) คือข้อใด","opts":[{"t":"MRP II","why":"1980s คือ Industry applications ที่เด่นด้วย MRP II"},{"t":"SCM","why":"SCM ไม่ใช่ระบบเด่นของไทม์ไลน์ยุคนี้"},{"t":"CRM","why":"CRM เข้ามาพร้อม ERP ในยุค 1990s"},{"t":"EDI","why":"EDI ไม่ใช่ระบบเด่นของไทม์ไลน์ ERP ยุคนี้"}],"ans":0},
    {"type":"choice","story":"ชื่อ ERP ปรากฏขึ้นเป็นครั้งแรกในไทม์ไลน์ พร้อม Human Resources, Project Accounting และ CRM ที่รวมเข้ามา","q":"ERP เริ่มถูกนำเสนอพร้อมเทคโนโลยีแบบใด","opts":[{"t":"Mainframe","why":"Mainframe เป็นยุค 1960s เน้นบัญชี"},{"t":"Distributed computing","why":"Distributed เป็นยุค 1970s แบบ standalone"},{"t":"Client/Server","why":"ERP ถูกนำเสนอครั้งแรกในยุค 1990s แบบ Client/Server"},{"t":"Web applications","why":"Web เป็นยุค 2000s"}],"ans":2},
    {"type":"choice","story":"ผู้สอนถามให้เรียงเหตุการณ์ในไทม์ไลน์ ERP เพื่อหาข้อที่เกิดทีหลังสุด","q":"ข้อใดเกิดหลังสุด","opts":[{"t":"Client/Server","why":"Client/Server เป็นยุค 1990s เกิดก่อน Web"},{"t":"Web applications","why":"Web (2000s) มาหลัง Client/Server, MRP II และ Mainframe"},{"t":"MRP II","why":"MRP II เป็นยุค 1980s"},{"t":"Mainframe","why":"Mainframe เป็นยุคแรกสุด 1960s"}],"ans":1},
    {"type":"choice","story":"ฝ่ายบุคคลคำนวณค่าแรงของพนักงานโดยดึงจำนวนชั่วโมงที่ทำงานจริงจากฐานข้อมูลกลางของ ERP","q":"ข้อมูล Hours worked เก็บอยู่ในโมดูลใดตามแผนภาพ ERP","opts":[{"t":"Sales & Marketing","why":"Sales เก็บ orders, forecasts, return requests, price changes"},{"t":"Manufacturing & Production","why":"ผลิตเก็บ materials, schedules, capacity"},{"t":"Finance & Accounting","why":"Finance เก็บ cash on hand, A/R, customer credit, revenue"},{"t":"Human Resources","why":"HR เก็บ hours worked, labor cost, job skills"}],"ans":3},
    {"type":"choice","story":"ฝ่ายวางแผนต้องการดูกำหนดการส่งสินค้าและความสามารถในการผลิตของโรงงานจากฐานข้อมูลกลางของ ERP","q":"ข้อมูลใดต่อไปนี้ต้องอยู่ในโมดูล Manufacturing & Production","opts":[{"t":"Shipment dates","why":"Shipment dates อยู่ในโมดูล Manufacturing & Production"},{"t":"Labor cost","why":"Labor cost เป็นข้อมูลของโมดูล HR"},{"t":"Return requests","why":"Return requests เป็นข้อมูลของโมดูล Sales"},{"t":"Accounts receivable","why":"A/R เป็นข้อมูลของโมดูล Finance"}],"ans":0},
    {"type":"choice","story":"ผู้บริหารบริษัทข้ามชาติสรุปเหตุผลที่ซื้อ ERP ในที่ประชุม","q":"ข้อใดไม่ใช่ Primary purpose ของ ERP","opts":[{"t":"รวมข้อมูลเข้าระบบเดียว","why":"Integration เป็นวัตถุประสงค์หลักข้อที่ 1"},{"t":"อัปเดตธุรกรรมแบบ real-time","why":"Real-time global updates เป็นวัตถุประสงค์หลักข้อที่ 2"},{"t":"จัดการ supplier นอกองค์กร","why":"เป็นงานของ SCM ไม่ใช่วัตถุประสงค์หลักของ ERP"},{"t":"ตัดสินใจจากข้อมูลล่าสุด","why":"เป็นวัตถุประสงค์หลักข้อที่ 3"}],"ans":2},
    {"type":"choice","story":"ซีอีโอเปิดหน้าจอเดียว เห็นตัวชี้วัดยอดขายและแผนที่เขตการขายของบริษัทแบบปัจจุบันทันที","q":"ส่วนแสดงผลนี้ของ ERP เรียกว่าอะไร","opts":[{"t":"Data warehouse","why":"เป็นที่เก็บข้อมูลประวัติ ไม่ใช่หน้าจอแสดงผล"},{"t":"Dashboard","why":"Dashboard แสดงสถานะปัจจุบันของปัจจัยธุรกิจสำคัญ"},{"t":"Query tool","why":"ใช้ค้นข้อมูล ไม่ใช่หน้าจอสรุปสถานะ"},{"t":"Balanced scorecard","why":"เป็นกรอบวัดผลเชิงกลยุทธ์ ไม่ใช่ฟีเจอร์ของ ERP ในบทนี้"}],"ans":1},
    {"type":"choice","story":"บริษัทกำลังตัดสินใจว่าจะเช่าโฮสติ้งบนคลาวด์หรือซื้อเซิร์ฟเวอร์มาดูแลเอง สำหรับระบบ ERP","q":"การตัดสินใจนี้อยู่ในองค์ประกอบใดของ ERP 5 อย่าง","opts":[{"t":"Hardware","why":"Hardware คือ cloud hosting หรือ self-managed servers"},{"t":"Software","why":"Software คือโปรแกรมประยุกต์ ERP"},{"t":"Data","why":"Data คือฐานข้อมูล ERP"},{"t":"Procedures","why":"Procedures คือขั้นตอนกระบวนการทางธุรกิจ"}],"ans":0},
    {"type":"choice","story":"โครงการ ERP จ้างทีมที่ปรึกษามาช่วยสอนการใช้งานให้พนักงานทุกฝ่าย","q":"ส่วนนี้จัดอยู่ในองค์ประกอบใดของ ERP","opts":[{"t":"Procedures","why":"Procedures คือขั้นตอนกระบวนการธุรกิจ ไม่ใช่ตัวบุคคล"},{"t":"Software","why":"Software คือโปรแกรมประยุกต์ ERP"},{"t":"Hardware","why":"Hardware คือโครงสร้างพื้นฐานเซิร์ฟเวอร์/คลาวด์"},{"t":"People","why":"People รวมผู้ใช้ และ ERP training and consulting"}],"ans":3},
    {"type":"choice","story":"บริษัทจัดทำเอกสารบอกพนักงานว่าต้องทำอะไรก่อนหลังเมื่อรับออเดอร์ลูกค้าผ่านระบบ ERP","q":"เอกสารนี้จัดอยู่ในองค์ประกอบใดของ ERP","opts":[{"t":"People","why":"People คือผู้ใช้และที่ปรึกษา"},{"t":"Data","why":"Data คือ ERP databases"},{"t":"Procedures","why":"Procedures คือ business process procedures"},{"t":"Hardware","why":"Hardware คือเซิร์ฟเวอร์หรือ cloud hosting"}],"ans":2},
    {"type":"choice","story":"ผู้ใช้ ERP ปรับโมดูลที่ซื้อมาให้เข้ากับวิธีทำงานของบริษัทตัวเอง","q":"ทีมงานใช้เครื่องมือใดปรับซอฟต์แวร์ตามแนวทางของ ERP","opts":[{"t":"Master data files","why":"Master data คือข้อมูลหลัก ไม่ใช่กลไกปรับระบบ"},{"t":"Configuration Tables","why":"ปรับซอฟต์แวร์ผ่าน Configuration Tables"},{"t":"Middleware adapters","why":"Middleware ใช้เชื่อมระบบ ไม่ใช่ปรับค่า ERP"},{"t":"Data dictionary tables","why":"Data dictionary อธิบายโครงสร้างข้อมูล ไม่ใช่ปรับระบบ"}],"ans":1},
    {"type":"choice","story":"vendor ฝังกระบวนการทำงานสำเร็จรูปที่ผ่านการใช้จริงมาแล้วในหลายองค์กรไว้ในซอฟต์แวร์ ERP","q":"กระบวนการสำเร็จรูปเหล่านี้เรียกว่าอะไร","opts":[{"t":"Best Practices","why":"ERP มีกระบวนการแบบ Best Practices ไว้ล่วงหน้า"},{"t":"Master Data","why":"Master Data คือข้อมูลหลัก"},{"t":"Business Rules","why":"ไม่ใช่คำที่ใช้เรียกกระบวนการสำเร็จรูปของ ERP"},{"t":"Legacy Process","why":"เป็นกระบวนการเก่าขององค์กร ไม่ใช่ที่ vendor ฝังมา"}],"ans":0},
    {"type":"choice","story":"ทีมโครงการ ERP ทำ 3 ขั้นตอน: เลือกโมดูลที่ใช้, (ขั้นกลาง), แล้วปรับซอฟต์แวร์ด้วย Configuration Tables","q":"ตามขั้นตอน implement ของบทนี้ ขั้นกลางคือข้อใด","opts":[{"t":"ย้ายข้อมูลเก่าเข้าระบบใหม่","why":"ไม่ใช่ขั้นตอนในลำดับของบทนี้"},{"t":"ทดสอบระบบก่อนใช้งานจริง","why":"ไม่ใช่ขั้นตอนในลำดับของบทนี้"},{"t":"ฝึกอบรมผู้ใช้งานทุกฝ่าย","why":"ไม่ใช่ขั้นตอนในลำดับของบทนี้"},{"t":"จับคู่งานธุรกิจกับระบบ","why":"ลำดับคือเลือกโมดูล, จับคู่กระบวนการ, แล้วปรับด้วย configuration tables"}],"ans":3},
    {"type":"choice","story":"กลุ่มธุรกิจที่ SAP Business One ถูกออกแบบมาให้ใช้งานเป็นหลักคือกลุ่มใด","q":"SAP Business One เหมาะกับธุรกิจกลุ่มใด","opts":[{"t":"องค์กรข้ามชาติขนาดใหญ่","why":"ไม่ใช่กลุ่มเป้าหมายหลักของ SAP Business One"},{"t":"หน่วยงานภาครัฐ","why":"ไม่ใช่กลุ่มเป้าหมายที่บทระบุ"},{"t":"SMEs","why":"SAP Business One ออกแบบสำหรับ SMEs"},{"t":"สถาบันการเงิน","why":"ไม่ใช่กลุ่มเป้าหมายที่บทระบุ"}],"ans":2},
    {"type":"choice","story":"บริษัทแห่งหนึ่งกำลังจะติดตั้ง ERP ที่ชื่อ Dynamics 365","q":"Dynamics 365 เป็นผลิตภัณฑ์ของ vendor ใด","opts":[{"t":"Oracle","why":"Oracle เป็นเจ้าของ ERP ของตนเอง ไม่ใช่ Dynamics 365"},{"t":"Microsoft","why":"Dynamics 365 เป็น ERP ของ Microsoft"},{"t":"SAP","why":"SAP ขาย SAP ERP และ Business One"},{"t":"Salesforce","why":"Salesforce ไม่ใช่ vendor ERP ที่บทระบุ"}],"ans":1},
    {"type":"choice","story":"ใน SAP Business One ฝ่ายจัดซื้อสร้างเอกสารสามชนิดตามลำดับตั้งแต่ขอซื้อจนถึงสั่งซื้อจริง","q":"ลำดับเอกสารจัดซื้อข้อใดถูกต้อง","opts":[{"t":"Request → Quotation → Order","why":"ลำดับคือ Purchase Request, Purchase Quotation, Purchase Order"},{"t":"Quotation → Request → Order","why":"ต้องมีใบขอซื้อก่อนใบเสนอราคา"},{"t":"Request → Order → Quotation","why":"ใบเสนอราคามาก่อนใบสั่งซื้อ"},{"t":"Order → Quotation → Request","why":"ลำดับกลับด้าน"}],"ans":0},
    {"type":"choice","story":"ผู้ใช้ SAP Business One เปิดใบเสนอราคาอยู่ และต้องการสร้างใบสั่งซื้อต่อจากเอกสารนี้โดยไม่กรอกข้อมูลซ้ำ","q":"ควรใช้ปุ่มใดบนหน้าจอ","opts":[{"t":"Duplicate","why":"Duplicate ทำสำเนาเอกสารชนิดเดิม ไม่ได้สร้างเอกสารถัดไป"},{"t":"Add Next","why":"ไม่ใช่ปุ่มสร้างเอกสารต่อเนื่องของบทนี้"},{"t":"Export","why":"Export ส่งข้อมูลออกไปไฟล์ ไม่ได้สร้างเอกสารถัดไป"},{"t":"Copy To","why":"ปุ่ม Copy To สร้างเอกสารถัดไปจากเอกสารเดิม"}],"ans":3},
    {"type":"choice","story":"ธนาคารแห่งหนึ่งเก็บ ERP ด้านบัญชีไว้ในเซิร์ฟเวอร์ของตัวเอง แต่ใช้ระบบขายที่ผู้ให้บริการดูแลให้บนอินเทอร์เน็ต","q":"รูปแบบการติดตั้งนี้เรียกว่า","opts":[{"t":"Cloud ERP","why":"Cloud อยู่บนแพลตฟอร์มผู้ให้บริการทั้งหมด"},{"t":"Hybrid ERP","why":"Hybrid ERP ผสม Cloud กับ On-Premise"},{"t":"On-Premise ERP","why":"On-Premise อยู่ในองค์กรทั้งหมด"},{"t":"Legacy ERP","why":"ไม่ใช่รูปแบบการติดตั้งของบทนี้"}],"ans":1},
    {"type":"blank","text":"องค์ประกอบ 5 อย่างของ ERP คือ Hardware, Software, {1}, Procedures และ {2}","blanks":[{"opts":["Data","Network","Cloud","Vendor"],"ans":0,"why":"องค์ประกอบที่ 3 คือ Data"},{"opts":["Management","Organization","Network","People"],"ans":3,"why":"องค์ประกอบที่ 5 คือ People"}]},
    {"type":"blank","text":"ERP ถูกนำเสนอครั้งแรกในยุค {1} ด้วยเทคโนโลยีแบบ {2}","blanks":[{"opts":["1980s","1970s","1990s","2000s"],"ans":2,"why":"ERP introduced ในยุค 1990s"},{"opts":["Mainframe","Web","Cloud","Client/Server"],"ans":3,"why":"ยุค 1990s คือ Client/Server"}]},
    {"type":"multi","story":"ที่ปรึกษาอธิบายคุณสมบัติของระบบที่เชื่อมโยงทั้งองค์กรให้ทีมฟัง","q":"เลือกทุกข้อที่เป็นลักษณะของ Enterprise systems","opts":[{"t":"ครอบคลุมหลายฝ่ายงาน","ok":true,"why":"Span functional areas"},{"t":"ประมวลผลเฉพาะรายการประจำวัน","ok":false,"why":"นั่นคือลักษณะของ TPS ไม่ใช่ Enterprise systems"},{"t":"รองรับเฉพาะผู้บริหารระดับสูง","ok":false,"why":"รองรับการตัดสินใจทุกระดับ"},{"t":"ทำกระบวนการข้ามฝ่ายงาน","ok":true,"why":"Execute business processes across the firm"},{"t":"รองรับการตัดสินใจทุกระดับ","ok":true,"why":"Support operations and decision-making at all levels"}]},
    {"type":"multi","story":"บริษัทประเมินผลที่คาดหวังจากการนำ ERP มาใช้","q":"เลือกทุกข้อที่เป็น Business value ของ ERP","opts":[{"t":"เก็บความรู้ผู้เชี่ยวชาญเป็นระบบ","ok":false,"why":"เป็นหน้าที่ของ KMS ไม่ใช่ business value ที่บทระบุให้ ERP"},{"t":"เพิ่มประสิทธิภาพการดำเนินงาน","ok":true,"why":"Increase operational efficiency"},{"t":"สารสนเทศทั่วองค์กรช่วยตัดสินใจ","ok":true,"why":"Organization-wide information"},{"t":"ประสานงานกับ supplier โดยตรง","ok":false,"why":"เป็นหน้าที่ของ SCM ไม่ใช่ business value ที่บทระบุ"},{"t":"เครื่องมือวิเคราะห์ผลงานรวม","ok":true,"why":"Analytical tools for overall performance"}]},
    {"type":"match","q":"จับคู่ยุคกับเทคโนโลยีหลักในไทม์ไลน์ ERP","pairs":[["1960s","Mainframe"],["1970s","Distributed computing"],["1990s","Client/Server"],["2000s","Web applications"]],"why":"1960s Mainframe, 1970s Distributed, 1990s Client/Server, 2000s Web"}
  ]
});
