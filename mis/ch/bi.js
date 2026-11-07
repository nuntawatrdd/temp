IOT.reg({
  id: "bi",
  title: "Business Intelligence และ OLAP (BI, Data Warehouse, OLAP)",
  th: "ภาพรวม BI, คลังข้อมูล EDW, การวิเคราะห์หลายมิติ OLAP และการปฏิบัติการ Slice/Dice/Drill/Roll/Pivot",
  summary: `
<h4>1) Business Intelligence (BI)</h4>
<ul>
<li><b>BI</b> = คำร่ม (umbrella term) ของ processes, technologies, applications และ techniques ที่ใช้ <b>collect, integrate, store, analyze, present</b> ข้อมูลเพื่อสนับสนุนการตัดสินใจทางธุรกิจ</li>
<li>BI ครอบคลุม 6 เรื่อง: <b>Data Warehousing</b> (Data Integration, ETL, Data Storage, Data Quality Mgmt) / <b>OLAP</b> / <b>Data Mining</b> / <b>Query and Reporting</b> / <b>Data Visualization</b> / <b>Business Analytics Applications</b> (CRM, Marketing, Financial, Supply Chain Analytics)</li>
<li>ตัวอย่างการใช้งาน: <b>Predictive analytics</b> (ใช้ข้อมูลในอดีต + statistical model/Machine Learning ทำนายแนวโน้ม เช่น บริษัทบัตรเครดิตประเมินลูกค้าที่เสี่ยงผิดนัดชำระ) และ <b>Data visualization</b> (กราฟ แผนที่ dashboard ช่วยเห็น pattern/trend/relationship ที่ตัวเลขดิบมองยาก)</li>
<li>ผู้ให้บริการ BI: Tableau (Tableau), Microsoft (Power BI / Fabric), Qlik (Qlik Cloud Analytics / Qlik Sense), Oracle (Oracle BI Application), SAP (SAP BusinessObjects BI), IBM (Cognos), SAS Institute (SAS Visual Analytics)</li>
</ul>
<h4>2) Data Warehouse / EDW</h4>
<ul>
<li><b>EDW (Enterprise Data Warehouse)</b> = คลังข้อมูลกลางระดับองค์กร รวมข้อมูลจากหลายแหล่งเพื่อรายงาน วิเคราะห์ และตัดสินใจ</li>
<li>Flow: <b>Data Sources</b> (ERP, Legacy, POS, Other OLTP/Web, External data) &rarr; <b>ETL</b> (Select, Extract, Transform, Integrate, Load) &rarr; <b>EDW + Metadata</b> &rarr; <b>Data marts</b> (Marketing, Engineering, Finance...) &rarr; API/Middleware &rarr; <b>Applications</b> (Routine reporting, Data/text mining, OLAP/Dashboard/Web, Custom apps)</li>
<li>มีทางเลือก <b>No data marts option</b> คือเชื่อมแอปพลิเคชันกับ EDW โดยตรง</li>
<li>แบบย่อ: Operational DB + Other Internal Data + External Data &rarr; Extraction/Cleaning/Preparation programs &rarr; Data Warehouse DBMS (+ DW Metadata, DW Database) &rarr; BI Tools &rarr; BI Users</li>
</ul>
<h4>3) OLAP (Online Analytical Processing)</h4>
<ul>
<li>วิธีประมวลผลและวิเคราะห์ข้อมูล <b>หลายมิติ (multidimensional)</b> ให้ผู้ใช้สำรวจข้อมูลแบบโต้ตอบ (<b>Interactive Analysis</b>) และถามเฉพาะกิจ (<b>Ad-hoc Query</b>)</li>
<li><b>Dimension</b> = มุมมอง/แง่มุมของข้อมูล (Product, Region, Time, Customer); <b>Measure</b> = ค่าตัวเลขที่วิเคราะห์ (Sales Amount, Quantity Sold)</li>
<li>ตัวอย่างคำถาม: "ขายเครื่องซักผ้าได้กี่เครื่องในภาคตะวันออกเดือนมิถุนายน เทียบกับภูมิภาคอื่น?"</li>
<li>ตัวอย่าง Fruit Sales: 3 มุมมอง (Time, Market, Product) แต่ละมุมรวม 32,000 &rarr; มุมมองหลายมิติ: Qtr1 รวม 16,000, Qtr2 รวม 16,000 (Product x Market ต่อไตรมาส)</li>
<li>ข้อมูลถูกจัดเป็น <b>OLAP Cube</b> (เช่น Location x Product x Time &rarr; ค่า Sales ในแต่ละช่อง)</li>
</ul>
<h4>4) OLAP Operations (5 อย่าง)</h4>
<table>
<tr><th>Operation</th><th>ความหมาย</th></tr>
<tr><td><b>Slice</b></td><td>เลือก <b>1 ค่าจาก 1 มิติ</b> ได้ cube ชิ้นเล็กลง (เช่น Time = Q1)</td></tr>
<tr><td><b>Dice</b></td><td>เลือก <b>2 มิติขึ้นไป</b> / เปลี่ยนมุมมองผลลัพธ์ (เช่น Shop-Product Type)</td></tr>
<tr><td><b>Drill Down</b></td><td>ลงไปดูระดับ <b>ละเอียดขึ้น</b> (Quarter &rarr; Month)</td></tr>
<tr><td><b>Roll Up</b></td><td><b>รวมสรุป</b>ขึ้นระดับสูง / zoom out (City &rarr; Country)</td></tr>
<tr><td><b>Pivot</b></td><td><b>หมุนแกน</b> (rotation) เปลี่ยนการจัดวางรายงาน</td></tr>
</table>
<h4>5) ตัวอย่างเครื่องมือ และประโยชน์ของ OLAP</h4>
<ul>
<li>เครื่องมือตัวอย่าง: <b>Cognos PowerPlay Web Explorer</b> (แสดงกราฟ + ตารางยอดขายตาม Time/Product/Branch), <b>Ubiq OLAP Reporting</b> (drag &amp; drop สร้างรายงานได้เร็ว)</li>
<li>ประโยชน์: (1) วิเคราะห์/เปรียบเทียบข้อมูลหลายมิติเพื่อตัดสินใจอย่างมีประสิทธิภาพ (2) ผู้ใช้เลือกและปรับมุมมองข้อมูลได้ตามความต้องการ (3) สอบถาม วิเคราะห์ เจาะลึกข้อมูลได้รวดเร็วผ่าน Interactive Analysis และ Ad-hoc Query</li>
</ul>
`,
  sections: [
    { t: "Business Intelligence (BI) คืออะไร", ref: "สไลด์ 2", html: `
<h4>นิยาม</h4>
<p><b>Business Intelligence (BI)</b> คือ "umbrella term" หรือคำร่ม ที่หมายถึงชุดของ <b>processes (กระบวนการ), technologies (เทคโนโลยี), applications (แอปพลิเคชัน) และ techniques (เทคนิค)</b> ที่ใช้ในการ <b>collect (รวบรวม), integrate (บูรณาการ), store (จัดเก็บ), analyze (วิเคราะห์) และ present (นำเสนอ)</b> ข้อมูล เพื่อสนับสนุนการตัดสินใจทางธุรกิจให้ดียิ่งขึ้น</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>BI = umbrella term ของกระบวนการ เทคโนโลยี แอปพลิเคชัน และเทคนิค</li>
<li>5 กริยาหลัก: collect &rarr; integrate &rarr; store &rarr; analyze &rarr; present</li>
<li>เป้าหมายสุดท้าย: สนับสนุน <b>การตัดสินใจทางธุรกิจ</b> (better decision-making)</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> เปรียบเหมือนร้านค้าที่เก็บข้อมูลการขายไว้ แล้วนำมารวม จัดเก็บ วิเคราะห์ และแสดงเป็นกราฟให้เจ้าของร้านตัดสินใจว่าจะสั่งสินค้าอะไรเพิ่ม ทั้งกระบวนการนี้คือ BI</div>
` },
    { t: "BI ในฐานะ \"Umbrella Topic\"", ref: "สไลด์ 3", html: `
<p>BI เป็นหัวข้อร่มที่รวมหลายเรื่องไว้ด้วยกัน สไลด์ระบุ 6 กลุ่ม:</p>
<ol>
<li><b>Data Warehousing</b> เช่น Data Integration, ETL, Data Storage และ Data Quality Management (การจัดการคุณภาพข้อมูล)</li>
<li><b>OLAP (Online Analytical Processing)</b> การวิเคราะห์ข้อมูลหลายมิติ (เป็นหัวใจของบทนี้)</li>
<li><b>Data Mining</b> การขุดค้นความรู้/รูปแบบจากข้อมูล</li>
<li><b>Query and Reporting</b> การสอบถามและทำรายงาน</li>
<li><b>Data Visualization</b> การแสดงข้อมูลเป็นภาพ</li>
<li><b>Business Analytics Applications</b> เช่น CRM Analytics, Marketing Analytics, Financial Analytics, Supply Chain Analytics</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>6 องค์ประกอบของ BI: Data Warehousing, OLAP, Data Mining, Query &amp; Reporting, Data Visualization, Business Analytics Applications</li>
<li>Data Warehousing ประกอบด้วย Data Integration, ETL, Data Storage, Data Quality Management</li>
</ul></div>
` },
    { t: "ตัวอย่างแอปพลิเคชัน BI: Predictive Analytics และ Data Visualization", ref: "สไลด์ 4-6", html: `
<h4>1) Predictive analytics (การวิเคราะห์เชิงคาดการณ์/การพยากรณ์)</h4>
<ul>
<li>ใช้ <b>ข้อมูลในอดีต</b> และ <b>แบบจำลองทางสถิติ หรือ Machine Learning</b> เพื่อคาดการณ์ <b>แนวโน้มและพฤติกรรมที่อาจเกิดขึ้นในอนาคต</b></li>
<li>ตัวอย่าง (E.g.): <b>บริษัทบัตรเครดิต</b>ใช้ Predictive Analytics เพื่อประเมินความเสี่ยงของลูกค้าที่มีแนวโน้ม <b>ผิดนัดชำระหนี้</b></li>
</ul>
<h4>2) Data visualization (การแสดงข้อมูลเป็นภาพ)</h4>
<ul>
<li>ช่วยให้ผู้ใช้มองเห็น <b>รูปแบบ (pattern), แนวโน้ม (trend) และความสัมพันธ์ (relationship)</b> ของข้อมูลจำนวนมาก ซึ่งอาจมองเห็นได้ยากเมื่อนำเสนอเป็นข้อความหรือตารางตัวเลข</li>
</ul>
<h4>ภาพตัวอย่างในสไลด์</h4>
<ul>
<li><b>สไลด์ 4:</b> Dashboard "Sales Performance" จาก Tableau แสดงยอดขายรวมแยกตามภูมิภาค (East/Central/South/West) มีแผนที่สหรัฐฯ แยกสีตามรัฐ กราฟแท่งตาม SubCategory และกราฟเส้นยอดขายตามเวลา</li>
<li><b>สไลด์ 5:</b> Dashboard "Profit and Loss" มีกราฟเส้น Margin รายเดือน, กราฟแท่ง revenue/expenses/net profit รายไตรมาส, กราฟโดนัท Expenses by Department (Marketing, Other, Payroll, Rent) และแผนที่โลก Revenue by Country</li>
<li><b>สไลด์ 6:</b> อินโฟกราฟิก "Pairing Wine &amp; Food" จับคู่ไวน์ชนิดต่างๆ กับอาหาร ใช้เป็นตัวอย่างว่าข้อมูลซับซ้อนสามารถสื่อสารผ่านภาพได้เข้าใจง่ายกว่าตาราง</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Predictive analytics = อดีต + stat model/ML &rarr; ทำนายอนาคต (ตัวอย่าง: ประเมินความเสี่ยงผิดนัดชำระบัตรเครดิต)</li>
<li>Data visualization = ช่วยเห็น pattern / trend / relationship ของข้อมูลจำนวนมาก</li>
</ul></div>
` },
    { t: "ผู้ให้บริการซอฟต์แวร์ BI (BI Vendors)", ref: "สไลด์ 7", html: `
<table>
<tr><th>Vendor</th><th>Business Intelligence Software</th></tr>
<tr><td>Tableau</td><td>Tableau</td></tr>
<tr><td>Microsoft</td><td>Power BI / Microsoft Fabric</td></tr>
<tr><td>Qlik</td><td>Qlik Cloud Analytics / Qlik Sense</td></tr>
<tr><td>Oracle</td><td>Oracle Business Intelligence Application</td></tr>
<tr><td>SAP</td><td>SAP Business Objects BI</td></tr>
<tr><td>IBM</td><td>IBM Cognos</td></tr>
<tr><td>SAS Institute</td><td>SAS Visual Analytics</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Microsoft = Power BI / Fabric; IBM = Cognos; SAP = BusinessObjects; Qlik = Qlik Sense; SAS = Visual Analytics; Oracle = Oracle BI Application; Tableau = Tableau</li>
</ul></div>
` },
    { t: "Enterprise Data Warehouse (EDW) Framework", ref: "สไลด์ 8", html: `
<h4>นิยาม</h4>
<p><b>Enterprise Data Warehouse (EDW)</b> คือ คลังข้อมูลแบบ <b>ศูนย์กลางระดับองค์กร</b> ที่ <b>รวม (integrate) ข้อมูลจากหลายแหล่ง</b> เพื่อสนับสนุนการทำรายงาน (reporting) การวิเคราะห์ (analysis) และการตัดสินใจ (decision-making)</p>
<h4>อธิบายแผนภาพ (ซ้ายไปขวา)</h4>
<ol>
<li><b>Data Sources:</b> ERP, Legacy, POS, Other OLTP/Web, External data</li>
<li><b>ETL Process:</b> Select, Extract, Transform, Integrate, Load (เลือก ดึง แปลง รวม และโหลดเข้าคลัง)</li>
<li><b>Enterprise Data Warehouse</b> พร้อม <b>Metadata</b> (ข้อมูลที่อธิบายข้อมูล)</li>
<li><b>Access:</b> Data mart แยกตามหน่วยงาน เช่น Marketing, Engineering, Finance, ...</li>
<li><b>API / Middleware</b> เป็นชั้นเชื่อมต่อ</li>
<li><b>Applications (Visualization):</b> Routine Business Reporting, Data/text mining, OLAP / Dashboard / Web, Custom built applications</li>
</ol>
<p>เส้นประสีน้ำเงิน "<b>No data marts option</b>" แสดงว่าสามารถข้าม data mart แล้วให้แอปพลิเคชันเข้าถึง EDW โดยตรงได้</p>
<div class="dg"><div class="dgt">🖼️ EDW Framework แบบย่อ</div>
<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="5" y="45" width="100" height="60"/><text class="t sm" x="55" y="72" text-anchor="middle">Data Sources</text><text class="t sm" x="55" y="90" text-anchor="middle">ERP/POS/Web</text>
<line class="ln" x1="105" y1="75" x2="145" y2="75"/>
<rect class="bx hd" x="145" y="45" width="90" height="60"/><text class="t sm" x="190" y="80" text-anchor="middle">ETL</text>
<line class="ln" x1="235" y1="75" x2="275" y2="75"/>
<rect class="bx ok" x="275" y="45" width="100" height="60"/><text class="t sm" x="325" y="72" text-anchor="middle">EDW</text><text class="t sm" x="325" y="90" text-anchor="middle">+ Metadata</text>
<line class="ln" x1="375" y1="75" x2="415" y2="75"/>
<rect class="bx" x="415" y="45" width="90" height="60"/><text class="t sm" x="460" y="80" text-anchor="middle">Data marts</text>
<line class="ln" x1="505" y1="75" x2="535" y2="75"/>
<rect class="bx hd" x="535" y="45" width="100" height="60"/><text class="t sm" x="585" y="72" text-anchor="middle">Applications</text><text class="t sm" x="585" y="90" text-anchor="middle">OLAP/Report</text>
</svg></div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>EDW = คลังข้อมูลกลางระดับองค์กร รวมข้อมูลหลายแหล่งเพื่อ reporting, analysis, decision-making</li>
<li>ETL 5 ขั้น: Select, Extract, Transform, Integrate, Load</li>
<li>Data mart = ส่วนย่อยของคลังข้อมูลแยกตามหน่วยงาน (Marketing, Engineering, Finance)</li>
</ul></div>
` },
    { t: "องค์ประกอบของ Data Warehouse (แบบง่าย)", ref: "สไลด์ 9", html: `
<p>แผนภาพแสดงการไหลของข้อมูลจากต้นทางถึงผู้ใช้ BI:</p>
<ol>
<li><b>แหล่งข้อมูล 3 กลุ่ม:</b> Operational Databases (ฐานข้อมูลปฏิบัติการ), Other Internal Data (ข้อมูลภายในอื่นๆ), External Data (ข้อมูลภายนอก)</li>
<li><b>Data Extraction / Cleaning / Preparation Programs:</b> โปรแกรมดึง ทำความสะอาด และเตรียมข้อมูล (ตรงกับ ETL)</li>
<li><b>Data Warehouse DBMS:</b> ระบบจัดการฐานข้อมูลของคลังข้อมูล เชื่อมกับ <b>Data Warehouse Metadata</b> และ <b>Data Warehouse Database</b> (สองทิศทาง)</li>
<li><b>Business Intelligence Tools:</b> เครื่องมือ BI ที่ดึงข้อมูลจาก DBMS</li>
<li><b>Business Intelligence Users:</b> ผู้ใช้ที่ใช้เครื่องมือ BI วิเคราะห์ข้อมูล</li>
</ol>
<div class="dg"><div class="dgt">🖼️ Components of a Data Warehouse</div>
<svg viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="5" y="10" width="110" height="36"/><text class="t sm" x="60" y="33" text-anchor="middle">Operational DB</text>
<rect class="bx" x="5" y="65" width="110" height="36"/><text class="t sm" x="60" y="88" text-anchor="middle">Other Internal</text>
<rect class="bx" x="5" y="120" width="110" height="36"/><text class="t sm" x="60" y="143" text-anchor="middle">External Data</text>
<line class="ln" x1="115" y1="28" x2="155" y2="75"/><line class="ln" x1="115" y1="83" x2="155" y2="83"/><line class="ln" x1="115" y1="138" x2="155" y2="90"/>
<rect class="bx hd" x="155" y="55" width="110" height="56"/><text class="t sm" x="210" y="80" text-anchor="middle">Extract/Clean/</text><text class="t sm" x="210" y="96" text-anchor="middle">Prepare</text>
<line class="ln" x1="265" y1="83" x2="305" y2="83"/>
<rect class="bx ok" x="305" y="55" width="110" height="56"/><text class="t sm" x="360" y="80" text-anchor="middle">DW DBMS</text><text class="t sm" x="360" y="96" text-anchor="middle">+Metadata+DB</text>
<line class="ln" x1="415" y1="83" x2="455" y2="83"/>
<rect class="bx hd" x="455" y="55" width="80" height="56"/><text class="t sm" x="495" y="88" text-anchor="middle">BI Tools</text>
<line class="ln" x1="535" y1="83" x2="565" y2="83"/>
<rect class="bx" x="565" y="55" width="70" height="56"/><text class="t sm" x="600" y="88" text-anchor="middle">BI Users</text>
</svg></div>
<div class="note"><b>💡 หมายเหตุ</b> สไลด์ 8 เป็นภาพ EDW ที่ละเอียดกว่า ส่วนสไลด์ 9 เป็นภาพแบบย่อ แต่แนวคิดเดียวกัน: ดึงจากหลายแหล่ง &rarr; ทำความสะอาด &rarr; เก็บในคลัง &rarr; เครื่องมือ BI &rarr; ผู้ใช้</div>
` },
    { t: "Online Analytical Processing (OLAP)", ref: "สไลด์ 10", html: `
<h4>นิยาม (การประมวลผลเชิงวิเคราะห์แบบออนไลน์)</h4>
<p><b>OLAP (Online Analytical Processing)</b> คือแนวทางในการประมวลผลและวิเคราะห์ข้อมูล <b>ข้ามหลายมิติ (multiple dimensions)</b> ให้ผู้ใช้สำรวจและวิเคราะห์ข้อมูลแบบโต้ตอบ (interactively) เพื่อประกอบการตัดสินใจ</p>
<ul>
<li>เครื่องมือ OLAP ให้ผู้ใช้เห็น <b>มุมมองหลายมิติ (multidimensional views)</b> ของข้อมูล และวิเคราะห์แบบ interactive ได้</li>
<li>OLAP สนับสนุน <b>multidimensional analysis</b>: ดูข้อมูลโดยใช้หลายมิติพร้อมกัน</li>
<li><b>Dimensions</b> คือแง่มุมต่างๆ ของข้อมูล เช่น <b>Product, Region, Time, Customer</b></li>
<li><b>Measures</b> คือค่าตัวเลขที่ต้องการวิเคราะห์ เช่น <b>Sales Amount, Quantity Sold</b></li>
<li>OLAP สนับสนุน <b>Interactive Analysis</b> และ <b>Ad-hoc Query</b> (คำถามเฉพาะกิจที่ไม่ได้กำหนดไว้ล่วงหน้า)</li>
</ul>
<p><b>ตัวอย่างคำถาม:</b> "How many washers were sold in the East in June compared with other regions?" ใช้ 3 มิติ: Product (washer), Region (East เทียบภูมิภาคอื่น), Time (June); measure คือจำนวนที่ขาย</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Dimension = มุมมอง (Product, Region, Time, Customer); Measure = ตัวเลขที่วัด (Sales Amount, Quantity Sold)</li>
<li>OLAP รองรับ Interactive Analysis และ Ad-hoc Query</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> อย่าสับสน Dimension กับ Measure: "ภูมิภาค" "สินค้า" "เวลา" เป็น dimension ส่วน "ยอดขาย" "จำนวนชิ้น" เป็น measure</div>
` },
    { t: "ตัวอย่าง Fruit Sales: มุมมองข้อมูลหลายแบบ", ref: "สไลด์ 11-12", html: `
<h4>สไลด์ 11: Three Different Views of Fruit Sales</h4>
<p>ข้อมูลยอดขายผลไม้ชุดเดียวกัน ดูได้ 3 มุมมองแยกกัน (แต่ละมุมรวมได้ <b>32,000</b> เท่ากัน):</p>
<table>
<tr><th>Time</th><th>Amount</th><th>Market</th><th>Amount</th><th>Product</th><th>Amount</th></tr>
<tr><td>Qtr1</td><td>16,000</td><td>Bangkok</td><td>8,000</td><td>Apples</td><td>8,000</td></tr>
<tr><td>Qtr2</td><td>16,000</td><td>Saraburi</td><td>8,000</td><td>Cherries</td><td>8,000</td></tr>
<tr><td></td><td></td><td>Phuket</td><td>8,000</td><td>Grapes</td><td>8,000</td></tr>
<tr><td></td><td></td><td>Rayong</td><td>8,000</td><td>Melons</td><td>8,000</td></tr>
<tr><td><b>Total</b></td><td><b>32,000</b></td><td><b>Total</b></td><td><b>32,000</b></td><td><b>Total</b></td><td><b>32,000</b></td></tr>
</table>
<p>ปัญหา: มุมมองเดี่ยวๆ ดูไม่ออกว่าผลไม้ชนิดไหนขายดีในจังหวัดไหนช่วงไตรมาสใด</p>
<h4>สไลด์ 12: Multidimensional View of Fruit Sales</h4>
<p>นำ 3 มิติ (Time x Product x Market) มาไว้ในตารางเดียว</p>
<p><b>Qtr1</b> (รวม 16,000)</p>
<table>
<tr><th></th><th>Bangkok</th><th>Saraburi</th><th>Phuket</th><th>Rayong</th><th>Total</th></tr>
<tr><td>Apples</td><td>-</td><td>-</td><td>2,500</td><td>1,500</td><td>4,000</td></tr>
<tr><td>Cherries</td><td>-</td><td>-</td><td>2,000</td><td>2,000</td><td>4,000</td></tr>
<tr><td>Grapes</td><td>1,000</td><td>3,000</td><td>-</td><td>-</td><td>4,000</td></tr>
<tr><td>Melons</td><td>2,000</td><td>2,000</td><td>-</td><td>-</td><td>4,000</td></tr>
<tr><td><b>Total</b></td><td>3,000</td><td>5,000</td><td>4,500</td><td>3,500</td><td>16,000</td></tr>
</table>
<p><b>Qtr2</b> (รวม 16,000)</p>
<table>
<tr><th></th><th>Bangkok</th><th>Saraburi</th><th>Phuket</th><th>Rayong</th><th>Total</th></tr>
<tr><td>Apples</td><td>4,000</td><td>-</td><td>-</td><td>-</td><td>4,000</td></tr>
<tr><td>Cherries</td><td>1,000</td><td>3,000</td><td>-</td><td>-</td><td>4,000</td></tr>
<tr><td>Grapes</td><td>-</td><td>-</td><td>1,500</td><td>2,500</td><td>4,000</td></tr>
<tr><td>Melons</td><td>-</td><td>-</td><td>2,000</td><td>2,000</td><td>4,000</td></tr>
<tr><td><b>Total</b></td><td>5,000</td><td>3,000</td><td>3,500</td><td>4,500</td><td>16,000</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ</b> ตารางหลายมิติเผยรายละเอียดที่มุมมองเดี่ยวซ่อนไว้ เช่น Apples ใน Qtr2 ขายที่ Bangkok เพียงแห่งเดียว (4,000) ขณะที่ Qtr1 ขายที่ Phuket และ Rayong ผลรวมแต่ละมิติยังตรงกันเสมอ (32,000)</div>
` },
    { t: "OLAP Cube", ref: "สไลด์ 13", html: `
<p>OLAP จัดระเบียบและนำเสนอข้อมูลในโครงสร้างหลายมิติที่เรียกว่า <b>OLAP Cube</b> (ลูกบาศก์ข้อมูล)</p>
<h4>อธิบายภาพ</h4>
<ul>
<li>cube สามมิติ มี <b>3 แกน</b>: <b>Location</b> (Atlanta, Denver, Detroit), <b>Product</b> (Grapes, Cherries, Melons, Apples, Pears) และ <b>Time</b> (Q1, Q2, Q3, Q4)</li>
<li>แต่ละ <b>ลูกบาศก์เล็ก (cell)</b> เก็บค่า measure หนึ่งค่า คือ <b>Sales</b> ณ จุดตัดของ Location + Product + Time (เช่น Detroit + Cherries + Q4 คือก้อนสีขาวที่ถูกไฮไลต์)</li>
</ul>
<div class="dg"><div class="dgt">🖼️ OLAP Cube: 3 มิติ 1 measure</div>
<svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg">
<rect class="bx ok" x="150" y="40" width="160" height="110"/>
<text class="t b" x="230" y="100" text-anchor="middle">Sales (cell)</text>
<text class="t sm" x="230" y="170" text-anchor="middle">Time: Q1 Q2 Q3 Q4</text>
<text class="t sm" x="40" y="100" text-anchor="middle">Product</text><text class="t sm" x="40" y="116" text-anchor="middle">Grapes..Pears</text>
<line class="ln" x1="90" y1="100" x2="150" y2="100"/>
<text class="t sm" x="420" y="30" text-anchor="middle">Location: Atlanta,</text><text class="t sm" x="420" y="46" text-anchor="middle">Denver, Detroit</text>
<line class="ln" x1="360" y1="52" x2="310" y2="45"/>
</svg></div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>OLAP Cube = โครงสร้างข้อมูลหลายมิติ แต่ละแกนคือ dimension และแต่ละ cell เก็บ measure</li>
</ul></div>
` },
    { t: "OLAP Operations ทั้ง 5 อย่าง", ref: "สไลด์ 14", html: `
<ul>
<li><b>Slice</b> เลือก <b>ค่าเดียวจากหนึ่งมิติ</b> เพื่อสร้างมุมมองที่เล็กลงของ cube</li>
<li><b>Dice</b> เลือก <b>สองมิติขึ้นไป</b> จาก cube ที่กำหนด</li>
<li><b>Drill Down</b> เลื่อนระดับของข้อมูลลงไปยัง <b>ระดับละเอียดที่สุด</b> (down)</li>
<li><b>Roll Up</b> <b>รวมข้อมูลรายละเอียด</b>เป็นสรุประดับสูงขึ้น (zoom out เพื่อดูข้อมูลสรุป)</li>
<li><b>Pivot</b> ใช้ <b>เปลี่ยนการวางแนวมิติ</b>ของรายงานหรือหน้าจอ ad hoc query</li>
</ul>
<table>
<tr><th>Operation</th><th>ทิศทาง/จุดเด่น</th><th>ตัวอย่าง</th></tr>
<tr><td>Slice</td><td>เลือก 1 ค่าของ 1 มิติ &rarr; cube เล็กลง</td><td>เฉพาะ Q1</td></tr>
<tr><td>Dice</td><td>เลือกหลายมิติ/หลายค่า &rarr; sub-cube / มุมมองใหม่</td><td>Shop x Product Type</td></tr>
<tr><td>Drill Down</td><td>สรุป &rarr; รายละเอียด</td><td>Quarter &rarr; Month</td></tr>
<tr><td>Roll Up</td><td>รายละเอียด &rarr; สรุป</td><td>City &rarr; Country</td></tr>
<tr><td>Pivot</td><td>หมุนแกน (rotation)</td><td>สลับแถวกับคอลัมน์</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>5 operations: Slice, Dice, Drill Down, Roll Up, Pivot</li>
<li>Slice = 1 ค่าจาก 1 มิติ; Dice = 2 มิติขึ้นไป</li>
<li>Drill Down = ละเอียดขึ้น; Roll Up = สรุปขึ้น (ตรงข้ามกัน)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Drill Down กับ Roll Up เป็นคู่ตรงข้ามที่มักถูกสลับในข้อสอบ: Drill <b>Down</b> = ลงไปดูรายละเอียด, Roll <b>Up</b> = ม้วนขึ้นเป็นภาพรวม</div>
` },
    { t: "ตัวอย่าง Roll Up", ref: "สไลด์ 15", html: `
<p><b>Roll up</b> เป็นกระบวนการเปลี่ยนแปลงระดับความละเอียดของการพิจารณาข้อมูล <b>จากส่วนของรายละเอียดมาก จนมาเป็นข้อมูลสรุป</b></p>
<h4>อธิบายภาพ</h4>
<ul>
<li>cube หมายเลข 1 (ล่าง): มิติ Locations ระดับ <b>เมือง (cities)</b> ได้แก่ Chicago, New York, Toronto, Vancouver; มิติ Time (Quarter) Q1-Q4; มิติ item (types) ได้แก่ Mobile, Modem, Phone, Security (ตัวเลขตัวอย่าง เช่น 605, 825, 14, 400 ใน Q1)</li>
<li>ทำ <b>roll-up on location (from cities to countries)</b></li>
<li>cube หมายเลข 2 (บน): มิติ Locations เหลือระดับ <b>ประเทศ (countries)</b> คือ USA กับ Canada ข้อมูลถูกรวมสรุปจากเมืองขึ้นเป็นประเทศ (เช่น ค่า 2000 ของ USA, 1000 ของ Canada)</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> Roll up ทำให้ "จำนวนแถว/ช่อง" ลดลง เพราะรวม Chicago + New York เป็น USA และ Toronto + Vancouver เป็น Canada</div>
` },
    { t: "ตัวอย่าง Drill Down", ref: "สไลด์ 16", html: `
<p><b>Drill Down</b> เป็นกระบวนการเปลี่ยนแปลงระดับความละเอียดของการพิจารณาข้อมูล <b>จากข้อมูลสรุป มาเป็นข้อมูลในส่วนรายละเอียด</b> (ตรงข้ามกับ Roll up)</p>
<h4>อธิบายภาพ</h4>
<ul>
<li>cube หมายเลข 1: มิติ Time ระดับ <b>ไตรมาส (Quarter)</b> Q1-Q4 ; ค่าที่วงไว้ใน Q1 ของ Security คือ 400</li>
<li>ทำ <b>drill down on time (from quarters to month)</b></li>
<li>cube หมายเลข 2: มิติ Time ละเอียดขึ้นเป็น <b>เดือน (months)</b> January-December ; ค่าที่วงไว้ของ Security ถูกแยกเป็น January = 150, February = 100, March = 150 (รวมกันได้ 400 ซึ่งเท่ากับยอด Q1)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Drill down: สรุป &rarr; รายละเอียด (Quarter &rarr; Month)</li>
<li>Roll up: รายละเอียด &rarr; สรุป (City &rarr; Country)</li>
</ul></div>
` },
    { t: "ตัวอย่าง Slice", ref: "สไลด์ 17-18", html: `
<p><b>Slice</b> เป็นการเลือกพิจารณาผลลัพธ์บางส่วนที่เราสนใจ โดยการเลือกเฉพาะค่าที่ถูกกำกับด้วยข้อมูลบางค่าของแต่ละมิติ</p>
<h4>สไลด์ 17: Slice ใน cube</h4>
<ul>
<li>cube เดิมมีมิติ Locations (cities) x Time (Quarter) x item (types)</li>
<li>ทำ <b>slice for time = "Q1"</b> เลือกเฉพาะ Time = Q1 ผลคือได้ตาราง 2 มิติ (Locations x item types) ที่เหลือเฉพาะข้อมูล Q1 เช่น 605, 825, 14, 400</li>
</ul>
<h4>สไลด์ 18: Slice ในตารางยอดขาย (Slice: Glossary)</h4>
<p>ตารางตั้งต้น มีมิติ Region/Shop (แถว) x Product Type/Product (คอลัมน์):</p>
<table>
<tr><th>Region</th><th>Shop</th><th>Glossary: Fish</th><th>Glossary: Meat</th><th>Glossary: Pork</th><th>Misc.: Medicine</th><th>Misc.: Pencil</th></tr>
<tr><td>North</td><td>ABC</td><td>10,000</td><td>20,000</td><td></td><td></td><td></td></tr>
<tr><td>North</td><td>Platter</td><td></td><td></td><td>25,000</td><td>6,000</td><td></td></tr>
<tr><td>South</td><td>Five Mart</td><td>8,000</td><td></td><td>23,000</td><td>10,000</td><td>500</td></tr>
</table>
<p>เมื่อ <b>Slice: Glossary</b> (เลือก Product Type = Glossary เพียงค่าเดียว) จะเหลือเฉพาะคอลัมน์ Fish, Meat, Pork และตัดกลุ่ม Misc. ออก:</p>
<table>
<tr><th>Region</th><th>Shop</th><th>Fish</th><th>Meat</th><th>Pork</th></tr>
<tr><td>North</td><td>ABC</td><td>10,000</td><td>20,000</td><td></td></tr>
<tr><td>North</td><td>Platter</td><td></td><td></td><td>25,000</td></tr>
<tr><td>South</td><td>Five Mart</td><td>8,000</td><td></td><td>23,000</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Slice = ตรึงหนึ่งมิติไว้ที่ค่าเดียว (Time = Q1 หรือ Product Type = Glossary) เหลือข้อมูลมิติที่น้อยลง</li>
</ul></div>
` },
    { t: "ตัวอย่าง Dice", ref: "สไลด์ 19", html: `
<ul>
<li>Dice คือการปรับเปลี่ยนมุมมองของผลลัพธ์</li>
<li>Dice เป็นกระบวนการพลิกแกนหรือมิติข้อมูล ให้ได้มุมมองที่ต้องการ</li>
</ul>
<h4>ตัวอย่างในสไลด์ (2 มุมมองจากข้อมูลชุดเดียวกัน)</h4>
<p><b>มุมมอง Shop - Product Type</b></p>
<table>
<tr><th>Shop</th><th>Glossary</th><th>Misc.</th></tr>
<tr><td>ABC</td><td>30,000</td><td></td></tr>
<tr><td>Platter</td><td>25,000</td><td>6,000</td></tr>
<tr><td>Five Mart</td><td>31,000</td><td>10,500</td></tr>
</table>
<p><b>มุมมอง Date - Product Type</b></p>
<table>
<tr><th>Date</th><th>Glossary</th><th>Misc.</th></tr>
<tr><td>6/07/2004</td><td>43,000</td><td>10,000</td></tr>
<tr><td>7/07/2004</td><td>43,000</td><td>6,500</td></tr>
</table>
<div class="note"><b>💡 หมายเหตุ</b> สองตารางใช้ Product Type เหมือนกัน แต่สลับมิติอีกด้านระหว่าง Shop กับ Date จึงเห็นข้อมูลคนละมุม ตามนิยามสไลด์ 14 Dice เลือก 2 มิติขึ้นไปจาก cube</div>
<div class="warn"><b>⚠️ ระวัง</b> Slice = เลือก <b>ค่าเดียว</b>จากมิติเดียว (cube เล็กลง) ส่วน Dice = เลือก <b>หลายมิติ</b> / ได้มุมมองใหม่ อย่าสลับกัน</div>
` },
    { t: "ตัวอย่าง Pivot", ref: "สไลด์ 20-21", html: `
<h4>สไลด์ 20: Pivot</h4>
<p><b>Pivot</b> หรือที่เรียกว่า <b>rotation</b> คือการ <b>หมุนแกนข้อมูล</b>ที่แสดงอยู่ เพื่อให้ได้การนำเสนอข้อมูลในอีกรูปแบบหนึ่ง</p>
<ul>
<li>ก่อน pivot: แถว = Locations (cities: Chicago, New York, Toronto, Vancouver), คอลัมน์ = item (types: Mobile, Modem, Phone, Security)</li>
<li>หลัง pivot: แถว = Item (types) และคอลัมน์ = Location (Cities) ข้อมูลเดิมแต่สลับแกน (ค่า 605, 825, 14, 400 ย้ายจากแนวนอนมาเรียงแนวตั้ง)</li>
</ul>
<h4>สไลด์ 21: ภาพ cube อ้างอิง</h4>
<p>ภาพ cube สามมิติ: Location (Atlanta, Denver, Detroit) / Product (Grapes, Cherries, Melons, Apples, Pears) / Time (Q1-Q4) ใช้เป็นฐานให้เห็นภาพการทำ operation ต่างๆ</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Pivot = rotation = หมุนแกนเพื่อเปลี่ยนมุมนำเสนอ ข้อมูลเดิมไม่เปลี่ยน แค่สลับแถว/คอลัมน์</li>
</ul></div>
` },
    { t: "ตัวอย่างเครื่องมือ OLAP: Cognos และ Ubiq", ref: "สไลด์ 22-23", html: `
<h4>สไลด์ 22: Cognos PowerPlay Web Explorer (หัวข้อภาพ "Database segmentation")</h4>
<ul>
<li>เป็นภาพหน้าจอเครื่องมือ OLAP ของ IBM Cognos บนเว็บเบราว์เซอร์ แสดงรายงาน "sale"</li>
<li>ด้านซ้ายเป็นต้นไม้มิติ: Time, Product, Branch, MEASURES</li>
<li>ด้านบนเป็นกราฟแท่ง Item Amount ปี 2005 แยกตามกลุ่มสินค้า (Beverage, General Merchandise, Food Service, Processed Food/Grocery, Frozen, Confectionery, Store Operation)</li>
<li>ด้านล่างเป็นตารางหลายมิติ: แถว = ไตรมาส 2005 Q1-Q4, คอลัมน์ = กลุ่มสินค้า, รวมทั้งปีและทุกสินค้า (Total) 54,293,262.00 ผู้ใช้คลิกที่ชื่อมิติเพื่อ drill down หรือ pivot ได้</li>
</ul>
<h4>สไลด์ 23: Ubiq OLAP Reporting Software</h4>
<p>ซอฟต์แวร์ที่ให้ผู้ใช้ <b>วิเคราะห์และรายงานข้อมูลจากหลายมุมมองได้ง่าย</b> ด้วยการ <b>drag &amp; drop</b> และปรับแต่งรายงานได้ด้วยการคลิกไม่กี่ครั้ง (สไลด์มีลิงก์วิดีโอ YouTube สาธิต)</p>
<div class="note"><b>💡 หมายเหตุ</b> เครื่องมือ OLAP ปัจจุบันเน้นให้ผู้ใช้ทั่วไป (ไม่ใช่โปรแกรมเมอร์) ลาก-วางมิติเพื่อทำ slice/dice/drill/pivot เองได้</div>
` },
    { t: "ประโยชน์ของ OLAP", ref: "สไลด์ 24", html: `
<ol>
<li><b>ช่วยวิเคราะห์และเปรียบเทียบข้อมูลในหลายมิติ</b> เพื่อสนับสนุนการตัดสินใจอย่างมีประสิทธิภาพ</li>
<li><b>ผู้ใช้สามารถเลือกและปรับมุมมองข้อมูล</b>ให้เหมาะสมกับความต้องการของตนเอง</li>
<li><b>ช่วยให้สอบถามข้อมูล วิเคราะห์ และเจาะลึกข้อมูลได้อย่างรวดเร็ว</b> ผ่าน Interactive Analysis และ Ad-hoc Query</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ประโยชน์ OLAP 3 ข้อ: วิเคราะห์เปรียบเทียบหลายมิติ / ปรับมุมมองตามต้องการ / สอบถามเจาะลึกเร็วด้วย Interactive Analysis + Ad-hoc Query</li>
</ul></div>
` }
  ],
  ex: [{"type":"choice","story":"ทีมงานกำลังไล่ดูว่าหัวข้อใดถูกจัดไว้ภายใต้ร่มของ Business Intelligence","q":"ข้อใดเป็นหนึ่งใน 6 กลุ่มหลักของ BI","opts":[{"t":"Transaction Processing","why":"TPS เป็นระบบบันทึกรายการ ไม่ใช่กลุ่มของ BI"},{"t":"Query and Reporting","why":"เป็นกลุ่มหนึ่งใน 6 กลุ่มของ BI"},{"t":"Expert System","why":"เป็นระบบผู้เชี่ยวชาญ ไม่อยู่ใน 6 กลุ่มของ BI"},{"t":"Knowledge Management","why":"เป็นเรื่องการจัดการความรู้ ไม่อยู่ใน 6 กลุ่มของ BI"}],"ans":1},{"type":"choice","story":"บริษัทบัตรเครดิตต้องการรู้ล่วงหน้าว่าลูกค้ากลุ่มไหนมีโอกาสไม่จ่ายหนี้ตามกำหนด","q":"การประยุกต์ใช้ BI แบบนี้เรียกว่าอะไร","opts":[{"t":"Data Visualization","why":"คือการแสดงข้อมูลเป็นภาพ ไม่ใช่การคาดการณ์ความเสี่ยง"},{"t":"Query and Reporting","why":"คือการสอบถามและทำรายงานข้อมูลที่มีอยู่"},{"t":"OLAP","why":"คือการวิเคราะห์ข้อมูลหลายมิติ ไม่ใช่การคาดการณ์"},{"t":"Predictive analytics","why":"ใช้ข้อมูลอดีตและ model ประเมินความเสี่ยงผิดนัดชำระ"}],"ans":3},{"type":"choice","story":"ผู้บริหารร้านค้าปลีกเปิดหน้าจอเดียวที่มีแผนที่ระบายสีตามรัฐ กราฟแท่งตามหมวดสินค้า และกราฟเส้นตามเวลา","q":"งานลักษณะนี้อยู่ในกลุ่มใดของ BI","opts":[{"t":"Data Visualization","why":"dashboard กราฟและแผนที่คือการแสดงข้อมูลเป็นภาพ"},{"t":"Query and Reporting","why":"เน้นการสอบถามและออกรายงาน ไม่ใช่ภาพ dashboard"},{"t":"Data Mining","why":"เน้นขุดค้นรูปแบบความรู้จากข้อมูล"},{"t":"Data Warehousing","why":"เน้นการรวมและจัดเก็บข้อมูล"}],"ans":0},{"type":"choice","story":"ทีมจัดซื้อกำลังเทียบผลิตภัณฑ์ BI ของหลายบริษัทเพื่อเลือกใช้","q":"ข้อใดจับคู่ผู้ให้บริการกับซอฟต์แวร์ BI ได้ถูกต้อง","opts":[{"t":"Qlik – Cognos","why":"Cognos เป็นของ IBM ไม่ใช่ Qlik"},{"t":"Oracle – Fabric","why":"Fabric เป็นของ Microsoft ไม่ใช่ Oracle"},{"t":"SAS Institute – Visual Analytics","why":"SAS Visual Analytics เป็นผลิตภัณฑ์ของ SAS Institute"},{"t":"SAP – Power BI","why":"Power BI เป็นของ Microsoft ไม่ใช่ SAP"}],"ans":2},{"type":"choice","story":"ทีมวิเคราะห์ใช้ซอฟต์แวร์ Cognos อยู่ และอยากรู้ว่าบริษัทใดเป็นเจ้าของผลิตภัณฑ์นี้","q":"Cognos เป็นซอฟต์แวร์ BI ของบริษัทใด","opts":[{"t":"SAP","why":"SAP ทำ SAP BusinessObjects BI ไม่ใช่ Cognos"},{"t":"Oracle","why":"Oracle ทำ Oracle Business Intelligence Application"},{"t":"IBM","why":"IBM Cognos เป็นผลิตภัณฑ์ BI ของ IBM"},{"t":"Qlik","why":"Qlik ทำ Qlik Sense / Qlik Cloud Analytics"}],"ans":2},{"type":"choice","story":"ข้อมูลจาก ERP และ POS ใช้รหัสสินค้าและรูปแบบวันที่ต่างกัน ทีมต้องปรับให้เป็นรูปแบบเดียวกันก่อนนำเข้าคลัง","q":"ขั้นตอนนี้ของ ETL คือข้อใด","opts":[{"t":"Select","why":"Select คือการเลือกข้อมูลที่ต้องการ ไม่ใช่การปรับรูปแบบ"},{"t":"Load","why":"Load คือการนำข้อมูลเข้าคลัง"},{"t":"Transform","why":"Transform คือการแปลงข้อมูลให้เป็นรูปแบบเดียวกัน"},{"t":"Extract","why":"Extract คือการดึงข้อมูลจากต้นทาง"}],"ans":2},{"type":"choice","story":"ในกระบวนการ ETL ตามกรอบ EDW ข้อมูลที่ผ่านการแปลงแล้วต้องถูกนำมารวมกันก่อนจะนำเข้าคลังเป็นขั้นสุดท้าย","q":"ขั้นที่อยู่ก่อนขั้น Load คือขั้นใด","opts":[{"t":"Integrate","why":"Integrate (รวมข้อมูล) อยู่ถัดจาก Transform และก่อน Load"},{"t":"Select","why":"Select เป็นขั้นแรกสุด"},{"t":"Extract","why":"Extract เป็นขั้นที่สอง"},{"t":"Transform","why":"Transform อยู่ก่อน Integrate ไม่ได้ติดกับ Load"}],"ans":0},{"type":"choice","story":"สถาปนิกข้อมูลกำลังวาดแผนภาพ EDW และต้องวางกล่องต่างๆ ให้ถูกฝั่ง","q":"ข้อใดอยู่ในฝั่ง Data Sources ต้นทาง","opts":[{"t":"Data marts","why":"Data marts อยู่ปลายทางหลังคลังกลาง"},{"t":"API / Middleware","why":"เป็นชั้นเชื่อมต่อฝั่งปลายทาง"},{"t":"Metadata","why":"Metadata อยู่คู่กับ EDW ไม่ใช่ต้นทาง"},{"t":"Legacy systems","why":"ระบบเดิม (Legacy) เป็นหนึ่งในแหล่งข้อมูลต้นทาง"}],"ans":3},{"type":"choice","story":"ในแผนภาพ EDW ข้อมูลถูกเก็บไว้ที่คลังกลางพร้อม Metadata เรียบร้อยแล้ว","q":"ชั้นถัดไปที่แยกตามหน่วยงาน เช่น Marketing, Finance คือข้อใด","opts":[{"t":"ETL","why":"ETL อยู่ก่อนเข้าคลัง"},{"t":"Data marts","why":"Data marts คือชุดข้อมูลย่อยตามหน่วยงานถัดจาก EDW"},{"t":"Data Sources","why":"Data Sources คือต้นทางสุด"},{"t":"OLAP cube","why":"Cube เป็นโครงสร้างหลายมิติ ไม่ใช่ชั้นแยกตามหน่วยงาน"}],"ans":1},{"type":"choice","story":"ผู้บริหารถามว่าปลายทางของ EDW ที่เป็นแอปพลิเคชันผู้ใช้มีอะไรบ้าง","q":"ข้อใดเป็นแอปพลิเคชันปลายทางในกรอบ EDW","opts":[{"t":"Routine reporting","why":"เป็นหนึ่งในแอปพลิเคชันปลายทางของ EDW"},{"t":"Data mart","why":"Data mart เป็นชั้นเข้าถึงข้อมูลแยกตามหน่วยงาน ไม่ใช่แอปปลายทาง"},{"t":"Metadata","why":"Metadata อยู่คู่กับ EDW ไม่ใช่แอปปลายทาง"},{"t":"ETL process","why":"ETL อยู่ก่อนเข้าคลัง"}],"ans":0},{"type":"choice","story":"ผู้ดูแลคลังเก็บตารางบันทึกว่าแต่ละคอลัมน์มาจากระบบใด แปลงอย่างไร และใครเป็นเจ้าของข้อมูล","q":"ข้อมูลชุดนี้เรียกว่าอะไร","opts":[{"t":"Data mart","why":"Data mart คือคลังย่อยของหน่วยงาน"},{"t":"OLAP cube","why":"Cube คือโครงสร้างข้อมูลหลายมิติ"},{"t":"Middleware","why":"Middleware คือชั้นเชื่อมต่อระบบ"},{"t":"Metadata","why":"Metadata คือข้อมูลที่อธิบายข้อมูลในคลัง"}],"ans":3},{"type":"choice","story":"ในแผนภาพคลังข้อมูลแบบย่อ ข้อมูลจากฐานข้อมูลปฏิบัติการ ข้อมูลภายในอื่น และข้อมูลภายนอกต้องผ่านส่วนหนึ่งก่อนถึง Data Warehouse DBMS","q":"ส่วนนั้นคือข้อใด","opts":[{"t":"BI Reporting Tools","why":"BI Tools อยู่ถัดจาก DBMS ไปทางผู้ใช้"},{"t":"Metadata Management Layer","why":"Metadata เชื่อมกับ DBMS ไม่ใช่ส่วนที่อยู่ก่อนเข้าคลัง"},{"t":"OLAP Cube Builder","why":"เป็นโครงสร้างวิเคราะห์หลังคลัง ไม่ใช่ส่วนก่อน DBMS"},{"t":"Extract/Clean/Prepare","why":"โปรแกรมดึง ทำความสะอาด และเตรียมข้อมูลก่อนเข้า DBMS"}],"ans":3},{"type":"choice","story":"ทีมต้องเรียงลำดับการไหลของข้อมูลในกรอบ EDW จากต้นทางจนถึงผู้ใช้","q":"ลำดับใดถูกต้อง","opts":[{"t":"Source → EDW → ETL → Mart → App","why":"ETL ต้องมาก่อน EDW"},{"t":"Source → ETL → EDW → Mart → App","why":"ลำดับตามกรอบ EDW ถูกต้อง"},{"t":"ETL → Source → EDW → Mart → App","why":"Source เป็นจุดเริ่มต้น ต้องมาก่อน ETL"},{"t":"Source → ETL → Mart → EDW → App","why":"Mart มาหลัง EDW"}],"ans":1},{"type":"choice","story":"รายงานของห้างสรรพสินค้าอ้างถึงหัวข้อ Customer, Sales Amount, Quantity Sold และ Profit","q":"ข้อใดจัดเป็น Dimension ของ OLAP","opts":[{"t":"Customer","why":"Customer เป็นมุมมอง (dimension) ของข้อมูล"},{"t":"Sales Amount","why":"เป็นค่าตัวเลขที่วิเคราะห์ (measure)"},{"t":"Quantity Sold","why":"เป็นค่าตัวเลข (measure)"},{"t":"Profit","why":"เป็นค่าตัวเลขที่วัด (measure)"}],"ans":0},{"type":"choice","story":"บริษัทเล็กไม่อยากสร้างคลังย่อยแยกตามฝ่าย จึงให้โปรแกรมวิเคราะห์ต่อเข้ากับคลังกลางโดยตรง","q":"แผนภาพ EDW เรียกทางเลือกนี้ว่าอะไร","opts":[{"t":"Direct ETL option","why":"ETL เป็นขั้นนำข้อมูลเข้าคลัง ไม่ใช่ทางเลือกนี้"},{"t":"Metadata-only option","why":"ไม่มีทางเลือกนี้ในแผนภาพ EDW"},{"t":"Single-source option","why":"ไม่มีทางเลือกนี้ในแผนภาพ EDW"},{"t":"No data marts option","why":"ข้าม data mart แล้วให้แอปเข้าถึง EDW โดยตรง"}],"ans":3},{"type":"choice","story":"ผู้จัดการอยากรู้ข้อมูลที่ไม่มีรายงานสำเร็จรูปรองรับ จึงตั้งคำถามขึ้นใหม่ตอนนั้นและได้คำตอบทันที","q":"ความสามารถนี้ของ OLAP เรียกว่าอะไร","opts":[{"t":"Routine Reporting","why":"คือรายงานประจำที่กำหนดไว้ล่วงหน้า"},{"t":"Data Mining","why":"คือการขุดค้นรูปแบบความรู้ ไม่ใช่การถามเฉพาะกิจ"},{"t":"Ad-hoc Query","why":"คือการถามเฉพาะกิจที่ไม่ได้กำหนดไว้ล่วงหน้า"},{"t":"Batch Reporting","why":"คือรายงานชุดตามรอบเวลา"}],"ans":2},{"type":"choice","story":"ข้อมูลยอดขายถูกจัดเป็นโครงสร้างสามแกน คือ Location, Product และ Time","q":"ช่องเล็กแต่ละช่องที่จุดตัดของสามแกนเก็บอะไร","opts":[{"t":"ชื่อของ Dimension","why":"ชื่อมิติอยู่บนแกน ไม่ใช่ในช่อง"},{"t":"ค่า Measure หนึ่งค่า","why":"แต่ละช่อง (cell) เก็บค่า measure เช่น Sales"},{"t":"Metadata ของคลัง","why":"Metadata ไม่ได้เก็บในช่องของ cube"},{"t":"รายงานสำเร็จรูป","why":"ช่องของ cube ไม่ได้เก็บรายงาน"}],"ans":1},{"type":"choice","story":"ตารางยอดขายมีสินค้ากลุ่ม Glossary และกลุ่ม Misc. ผู้จัดการต้องการให้เหลือเฉพาะกลุ่ม Glossary กลุ่มเดียว","q":"ตรงกับ OLAP operation ใด","opts":[{"t":"Dice","why":"Dice เลือกตั้งแต่สองมิติขึ้นไป"},{"t":"Roll Up","why":"Roll Up คือรวมสรุปขึ้นระดับสูง"},{"t":"Slice","why":"Slice คือเลือกค่าเดียวของหนึ่งมิติ"},{"t":"Pivot","why":"Pivot คือหมุนแกน"}],"ans":2},{"type":"choice","story":"ผู้ใช้ดูยอดขายมุม 'ร้านค้า x ประเภทสินค้า' แล้วเปลี่ยนไปดูมุม 'วันที่ x ประเภทสินค้า' จากข้อมูลชุดเดียวกัน","q":"ตรงกับ OLAP operation ใด","opts":[{"t":"Dice","why":"Dice คือการเลือกหลายมิติ/เปลี่ยนมุมมองผลลัพธ์"},{"t":"Pivot","why":"Pivot สลับแถวกับคอลัมน์ของมิติเดิม ไม่ได้เปลี่ยนมิติ"},{"t":"Slice","why":"Slice เลือกค่าเดียวของหนึ่งมิติ"},{"t":"Roll Up","why":"Roll Up คือรวมสรุปขึ้น"}],"ans":0},{"type":"choice","story":"ผู้ใช้อยากเปลี่ยนแค่การจัดวางแกนของรายงาน โดยไม่เปลี่ยนระดับความละเอียดและไม่ตัดข้อมูลทิ้ง","q":"operation ใดทำหน้าที่นี้","opts":[{"t":"Roll Up","why":"Roll Up เปลี่ยนระดับเป็นสรุป"},{"t":"Drill Down","why":"Drill Down เปลี่ยนระดับเป็นละเอียด"},{"t":"Slice","why":"Slice ตัดข้อมูลเหลือค่าเดียวของหนึ่งมิติ"},{"t":"Pivot","why":"Pivot หรือ rotation คือหมุนแกนเพื่อเปลี่ยนการนำเสนอ"}],"ans":3},{"type":"choice","story":"ผู้จัดการเห็นยอดขายรายไตรมาสแล้วอยากลงไปดูว่าแต่ละไตรมาสแยกเป็นรายเดือนเท่าไร","q":"ควรทำ operation ใด","opts":[{"t":"Pivot","why":"Pivot คือหมุนแกน ไม่เปลี่ยนระดับความละเอียด"},{"t":"Roll Up","why":"Roll Up คือรวมสรุปขึ้น ตรงข้ามกับที่ต้องการ"},{"t":"Dice","why":"Dice คือเลือกหลายมิติ ไม่ใช่การลงระดับละเอียด"},{"t":"Drill Down","why":"Drill Down คือลงไปดูระดับละเอียดขึ้น (Quarter → Month)"}],"ans":3},{"type":"choice","story":"ข้อมูลยอดขายถูกเก็บระดับเมือง ผู้บริหารขอดูภาพรวมแบบ zoom out เป็นระดับประเทศ","q":"ควรทำ operation ใด","opts":[{"t":"Roll Up","why":"Roll Up รวมสรุปจากเมืองขึ้นเป็นประเทศ"},{"t":"Drill Down","why":"Drill Down คือลงไปละเอียด"},{"t":"Slice","why":"Slice คือเลือกค่าเดียวของหนึ่งมิติ"},{"t":"Dice","why":"Dice คือเลือกหลายมิติ"}],"ans":0},{"type":"choice","story":"ข้อมูลยอดขายระดับเมืองมี 4 เมือง คือ Chicago, New York (สหรัฐฯ) และ Toronto, Vancouver (แคนาดา) ผู้บริหารขอดูระดับประเทศแทน","q":"มิติ Location จะเหลือกี่แถว","opts":[{"t":"1 แถว","why":"รวมทั้งหมดเป็นแถวเดียวเกินกว่าระดับประเทศ"},{"t":"4 แถว","why":"เป็นจำนวนเมืองเดิม ยังไม่ได้รวม"},{"t":"2 แถว","why":"สหรัฐฯ กับแคนาดา รวมเมืองเป็นประเทศได้ 2 แถว"},{"t":"6 แถว","why":"มากกว่าเดิม ซึ่งเป็นไปไม่ได้เมื่อรวมสรุป"}],"ans":2},{"type":"choice","story":"ผู้จัดการได้ตารางยอดขายผลไม้แยกตามเวลา ตารางแยกตามตลาด และตารางแยกตามสินค้า แต่ละตารางรวมได้ 32,000 เท่ากัน","q":"ข้อจำกัดของการดูแยกทีละตารางคือข้อใด","opts":[{"t":"ยอดรวมแต่ละมุมไม่ตรงกัน","why":"ยอดรวมตรงกันทั้ง 3 ตาราง"},{"t":"เห็นความสัมพันธ์ข้ามมิติไม่ได้","why":"ดูไม่ออกว่าสินค้าใดขายดีที่ไหนช่วงไหน"},{"t":"ต้องเขียนโปรแกรมใหม่ทุกครั้ง","why":"ไม่เกี่ยวกับการต้องเขียนโปรแกรม"},{"t":"ข้อมูลเยอะเกินจะแสดงผล","why":"ข้อมูลมีเพียง 32,000 และแสดงได้ปกติ"}],"ans":1},{"type":"choice","story":"ผู้บริหารถามทีมว่า OLAP ให้ประโยชน์ต่อองค์กรอย่างไร","q":"ข้อใดเป็นประโยชน์ของ OLAP","opts":[{"t":"ถามเจาะลึกได้เร็ว","why":"ใช้ Interactive Analysis และ Ad-hoc Query สอบถามได้รวดเร็ว"},{"t":"ทำนายพฤติกรรมลูกค้า","why":"เป็นงานของ Predictive analytics"},{"t":"ขุดหากฎอัตโนมัติ","why":"เป็นงานของ Data Mining"},{"t":"บันทึกรายการขายเร็วขึ้น","why":"เป็นงานของระบบ OLTP"}],"ans":0},{"type":"blank","text":"Data Warehousing ในกลุ่ม BI ประกอบด้วย {1} , ETL, Data Storage และ {2}","blanks":[{"opts":["Data Mining","Data Modeling","Data Integration","Data Entry"],"ans":2,"why":"Data Integration เป็นองค์ประกอบของ Data Warehousing"},{"opts":["Data Visualization","Data Quality Management","Data Recovery","Data Encryption"],"ans":1,"why":"Data Quality Management เป็นองค์ประกอบของ Data Warehousing"}]},{"type":"blank","text":"Slice เลือก {1} ของหนึ่งมิติ ส่วน Dice เลือกจาก {2} ของ cube","blanks":[{"opts":["ทุกค่า","สองค่า","ค่าเดียว","ครึ่งหนึ่ง"],"ans":2,"why":"Slice เลือกค่าเดียวจากหนึ่งมิติ"},{"opts":["สองมิติขึ้นไป","มิติเดียวกัน","สามมิติเท่านั้น","ทุกเซลล์"],"ans":0,"why":"Dice เลือกตั้งแต่สองมิติขึ้นไป"}]},{"type":"multi","story":"ฝ่าย IT อธิบายว่าอะไรบ้างอยู่ในร่ม BI","q":"เลือกทุกข้อที่เป็นหนึ่งใน 6 กลุ่มของ BI","opts":[{"t":"Data Mining","ok":true,"why":"เป็นกลุ่มหนึ่งของ BI"},{"t":"Enterprise Resource Planning","ok":false,"why":"ERP เป็นระบบบริหารทรัพยากร ไม่ใช่กลุ่มของ BI"},{"t":"OLAP","ok":true,"why":"เป็นกลุ่มหนึ่งของ BI"},{"t":"Knowledge Management","ok":false,"why":"เป็นเรื่องการจัดการความรู้ ไม่ใช่กลุ่มของ BI"},{"t":"Data Visualization","ok":true,"why":"เป็นกลุ่มหนึ่งของ BI"}]},{"type":"multi","story":"ทีมข้อมูลกำลังเขียนรายการขั้นตอนของ ETL ตามกรอบ EDW","q":"เลือกทุกข้อที่เป็นหนึ่งใน 5 ขั้นของ ETL ตามกรอบ EDW","opts":[{"t":"Select","ok":true,"why":"เป็นขั้นแรกของ ETL"},{"t":"Replicate","ok":false,"why":"ไม่ใช่ขั้นของ ETL ใน 5 ขั้น"},{"t":"Integrate","ok":true,"why":"เป็นขั้นของ ETL"},{"t":"Aggregate","ok":false,"why":"ไม่ใช่ขั้นของ ETL ใน 5 ขั้น"},{"t":"Load","ok":true,"why":"เป็นขั้นสุดท้ายของ ETL"}]},{"type":"match","q":"จับคู่ส่วนประกอบของ EDW กับหน้าที่","pairs":[["ETL","นำข้อมูลต้นทางเข้าคลัง"],["Metadata","อธิบายที่มาและความหมายข้อมูล"],["Data mart","ชุดข้อมูลย่อยตามฝ่ายงาน"],["API / Middleware","ตัวกลางเชื่อมคลังกับโปรแกรม"]],"why":"ETL นำข้อมูลเข้า, Metadata อธิบายข้อมูล, Data mart แยกตามฝ่าย, Middleware เชื่อมต่อ"}]
});
