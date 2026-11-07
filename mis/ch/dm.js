IOT.reg({
  id: "dm",
  title: "การทำเหมืองข้อมูล (Data Mining)",
  th: "นิยาม การประยุกต์ใช้ Web/Text Mining กระบวนการ CRISP-DM เทคนิค (Classification, Regression, Clustering, Association) และซอฟต์แวร์",
  summary: `
<h4>นิยาม</h4>
<ul>
<li><b>Data Mining</b> = กระบวนการวิเคราะห์ข้อมูลขนาดใหญ่เพื่อค้นหาสารสนเทศ/ความรู้ที่ซ่อนอยู่ และนำไปสนับสนุนการตัดสินใจ ใช้สถิติ + Machine Learning + AI หา <b>Patterns, Trends, Relationships</b> ที่ไม่เคยทราบมาก่อน แต่ต้องมีเหตุผลและนำไปใช้ได้</li>
<li>เป็นสหวิทยาการ (multidisciplinary): Database systems (DBMS, query, data warehousing) + AI (Machine Learning, Neural network) + Math/Statistics + อื่นๆ</li>
</ul>
<h4>การประยุกต์ใช้ (5 กลุ่ม)</h4>
<ol>
<li><b>Market Management</b>: Purchasing Pattern Over Time (แบบแผนการซื้อตามช่วงเวลา → วางแผนขาย/สต็อก), Cross Selling (สินค้าที่ซื้อร่วมกัน → แนะนำสินค้า), Direct Mail Campaign (แบ่งกลุ่มลูกค้า → ส่งข้อเสนอตรงกลุ่ม)</li>
<li><b>Risk Analysis &amp; Management</b>: Forecasting (พยากรณ์ยอดขาย/ความต้องการ), Credit Scoring (ประเมินความเสี่ยงผู้ขอสินเชื่อ), Profile of Attrition / Customer Churn (ลูกค้าที่มีแนวโน้มเลิกใช้บริการ)</li>
<li><b>Fraud Detection</b>: หาธุรกรรมผิดปกติ</li>
<li><b>Web Mining</b>: Content / Structure / Usage</li>
<li><b>Text Mining</b>: ข้อมูลข้อความไม่มีโครงสร้าง, Sentiment Analysis, ปรับปรุง CRM</li>
</ol>
<h4>Web Mining 3 แบบ</h4>
<ul>
<li><b>Content</b> = เนื้อหาหน้าเว็บ (ข้อความ รูป คำอธิบายสินค้า) เช่น วิเคราะห์รีวิว (Sentiment)</li>
<li><b>Structure</b> = โครงสร้างลิงก์ระหว่างหน้าเว็บ เช่น หาหน้าสำคัญ ปรับโครงสร้างเว็บ</li>
<li><b>Usage</b> = พฤติกรรมการใช้งาน (server log, click, session) เช่น หาจุดที่ลูกค้าออกจากเว็บ/ปรับ UX</li>
</ul>
<h4>กระบวนการ Data Mining (CRISP-DM 6 ขั้น)</h4>
<ol>
<li><b>Business Understanding</b>: ระบุปัญหา/ความต้องการ, ตั้งเป้าหมายธุรกิจ + เกณฑ์วัดความสำเร็จ, แปลงเป็นเป้าหมาย Data Mining</li>
<li><b>Data Understanding</b>: Collect Initial Data, Describe Data, Explore Data, Verify Data Quality</li>
<li><b>Data Preparation</b>: Data Selection, Data Preprocessing (Missing Value, Outlier, ทำให้สอดคล้อง), Data Transformation (สร้างตัวแปรใหม่, Normalization, Discretization, One-of-N coding)</li>
<li><b>Modeling</b>: เลือกเทคนิค สร้างโมเดล</li>
<li><b>Evaluation</b>: แปลผล + ประเมินโมเดล + ทบทวนกระบวนการ</li>
<li><b>Deployment</b>: Communicate Results, Deploy Model, Monitor and Maintain</li>
</ol>
<h4>Data Transformation</h4>
<ul>
<li><b>Min-max normalization</b>: v' = (v - min) / (max - min) × (new_max - new_min) + new_min</li>
<li><b>Discretization</b>: ตัวแปรเชิงปริมาณ → หมวดหมู่ (เช่น รายได้ $0-9,999 = 1, $10,000-19,999 = 2)</li>
<li><b>One-of-N coding</b>: ตัวแปรหมวดหมู่ → เลขฐานสอง (Ford 100, Nissan 010, Honda 001)</li>
</ul>
<h4>ประเภทโมเดล / เทคนิค</h4>
<ul>
<li><b>Predictive Model</b> (ทำนายจากอดีต/ปัจจุบัน): <b>Classification</b> (ทำนายกลุ่ม; Decision Tree, Neural Network; Supervised Learning) และ <b>Value Prediction</b> (ทำนายค่าตัวเลข; Linear Regression, Neural Network) — Regression: Y = b0 + b1x1 + b2x2 + b3x3</li>
<li><b>Database Segmentation = Clustering</b>: จัดกลุ่มข้อมูลที่คล้ายกัน ไม่ต้องมีป้ายกำกับ (Unsupervised Learning)</li>
<li><b>Link Analysis</b>: Associations Discovery (X→Y; Support, Confidence) และ Sequential Pattern Discovery (ลำดับเวลา)</li>
</ul>
<h4>ซอฟต์แวร์</h4>
<ul>
<li>Database-integrated: Microsoft SQL Server Analysis Services (ยกเลิกใน SQL Server 2022), Oracle Data Mining (ปัจจุบัน Oracle Machine Learning for SQL)</li>
<li>Statistical &amp; Analytics: SAS Enterprise Miner, IBM SPSS Modeler (เดิม Clementine)</li>
</ul>
`,
  sections: [
    { t: "Data Mining คืออะไร", ref: "สไลด์ 2", html: `
<p><b>Data Mining (การทำเหมืองข้อมูล)</b> คือกระบวนการ <b>วิเคราะห์ข้อมูลเพื่อค้นหาสารสนเทศและความรู้ที่ซ่อนอยู่ในฐานข้อมูลขนาดใหญ่</b> เพื่อนำความรู้ที่ได้ไปใช้ประโยชน์และสนับสนุนการตัดสินใจ</p>
<p>เป็นกระบวนการ (Process) ที่ใช้เทคนิคทางสถิติ, <b>Machine Learning</b> และ <b>ปัญญาประดิษฐ์ (AI)</b> ในการค้นหา</p>
<ul>
<li><b>รูปแบบ (Patterns)</b></li>
<li><b>แนวโน้ม (Trends)</b></li>
<li><b>ความสัมพันธ์ (Relationships)</b></li>
</ul>
<p>ที่ซ่อนอยู่ในชุดข้อมูล เพื่อค้นพบสารสนเทศและความรู้ที่ <b>ไม่เคยทราบมาก่อน</b> โดยสารสนเทศและความรู้ที่ได้จะต้อง <b>มีเหตุผลและสามารถนำไปใช้และสนับสนุนการตัดสินใจได้</b></p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Data Mining = หา Patterns, Trends, Relationships ที่ซ่อนอยู่ในข้อมูลขนาดใหญ่</li>
<li>เครื่องมือ: สถิติ + Machine Learning + AI</li>
<li>ความรู้ที่ได้ต้อง "ไม่เคยทราบมาก่อน" แต่ "มีเหตุผลและใช้ประโยชน์ได้"</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> รูปในสไลด์เปรียบเหมือนรถบรรทุกขนข้อมูลมากองเป็นก้อนใหญ่ แล้วผ่านโรงงาน Data Mining ออกมาเป็นความรู้ที่ส่งไปใช้งาน</div>
` },
    { t: "การประยุกต์ใช้ 1: Market Management", ref: "สไลด์ 3", html: `
<h4>1. Market Management (การบริหารการตลาด)</h4>
<ul>
<li><b>Purchasing Pattern Over Time</b> — วิเคราะห์รูปแบบการซื้อของลูกค้าในช่วงเวลาต่างๆ เพื่อวางแผนการขายสินค้าและบริหารสินค้าคงคลัง (เช่น ช่วงไหนของปีสินค้าใดขายดี จึงสต็อกให้พอดี)</li>
<li><b>Cross Selling</b> — ค้นหาสินค้าที่มักถูกซื้อร่วมกัน เพื่อแนะนำสินค้าที่เกี่ยวข้องและเพิ่มโอกาสในการขาย (เช่น ซื้อโน้ตบุ๊กแล้วแนะนำเมาส์)</li>
<li><b>Direct Mail Campaign</b> — วิเคราะห์และแบ่งกลุ่มลูกค้า เพื่อเลือกกลุ่มเป้าหมายและส่งข้อเสนอทางการตลาดให้ตรงกับความสนใจ</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Market Management มี 3 เรื่อง: Purchasing Pattern Over Time, Cross Selling, Direct Mail Campaign</li>
</ul></div>
` },
    { t: "การประยุกต์ใช้ 2-5: Risk, Fraud, Web, Text", ref: "สไลด์ 4", html: `
<h4>2. Risk Analysis and Management (วิเคราะห์และบริหารความเสี่ยง)</h4>
<ul>
<li><b>Forecasting</b> — การพยากรณ์ยอดขายและความต้องการสินค้า โดยใช้ข้อมูลในอดีตและข้อมูลปัจจุบันเพื่อคาดการณ์แนวโน้มในอนาคต</li>
<li><b>Credit Scoring</b> — วิเคราะห์ข้อมูลผู้ขอสินเชื่อเพื่อประเมินความเสี่ยงด้านเครดิตและความสามารถในการชำระหนี้ เพื่อสนับสนุนการตัดสินใจอนุมัติสินเชื่อ</li>
<li><b>Profile of Attrition (Customer Churn Management)</b> — วิเคราะห์ปัจจัยและรูปแบบที่สัมพันธ์กับการเลิกใช้บริการของลูกค้า เพื่อระบุกลุ่มลูกค้าที่มีแนวโน้มเลิกใช้บริการและวางแผนรักษาลูกค้า</li>
</ul>
<h4>3. Fraud Detection and Management</h4>
<p>วิเคราะห์รูปแบบธุรกรรมเพื่อค้นหารายการที่ผิดปกติ (เช่น บัตรเครดิตถูกใช้ผิดปกติ)</p>
<h4>4. Web Mining</h4>
<p>วิเคราะห์ข้อมูลจากเว็บไซต์ เช่น เนื้อหาเว็บไซต์ โครงสร้างลิงก์ และพฤติกรรมการใช้งาน เพื่อนำไปปรับปรุงเว็บไซต์และประสบการณ์ผู้ใช้</p>
<h4>5. Text Mining</h4>
<p>วิเคราะห์ข้อความและเอกสารเพื่อค้นหาประเด็นสำคัญ จำแนกข้อความ และวิเคราะห์ความคิดเห็นหรือความรู้สึกของลูกค้า</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>5 กลุ่มการประยุกต์: Market Management, Risk Analysis &amp; Management, Fraud Detection, Web Mining, Text Mining</li>
<li>Risk: Forecasting / Credit Scoring / Profile of Attrition (Churn)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Credit Scoring = ประเมินความเสี่ยงของผู้ขอสินเชื่อ ส่วน Churn = ลูกค้าที่จะเลิกใช้บริการ ส่วน Fraud = ธุรกรรมผิดปกติ อย่าสับสนกัน</div>
` },
    { t: "Web Mining", ref: "สไลด์ 5", html: `
<p><b>Web Mining</b> คือการประยุกต์เทคนิค Data Mining เพื่อค้นหา patterns, relationships และความรู้ที่เป็นประโยชน์จาก <b>ข้อมูลเว็บ</b> ซึ่งรวมถึงเนื้อหาของหน้าเว็บ โครงสร้างไฮเปอร์ลิงก์ และบันทึกการโต้ตอบของผู้ใช้</p>
<p>แบ่งเป็น 3 ประเภท (ในภาพ Web Mining แตกเป็น Web Content Mining / Web Structure Mining / Web Usage Mining)</p>
<table>
<tr><th>ประเภท</th><th>ทำอะไร</th><th>ตัวอย่าง</th></tr>
<tr><td><b>Web content mining</b> (การทำเหมืองเนื้อหาเว็บ)</td><td>สกัดข้อมูลและความรู้จากเนื้อหาหน้าเว็บ เช่น ข้อความ รูปภาพ คำอธิบายสินค้า</td><td>วิเคราะห์รีวิวสินค้าและความคิดเห็นของลูกค้า (Sentiment Analysis) เพื่อประเมินความพึงพอใจและปรับปรุงสินค้า</td></tr>
<tr><td><b>Web structure mining</b> (การทำเหมืองโครงสร้างเว็บ)</td><td>วิเคราะห์โครงสร้างไฮเปอร์ลิงก์และความสัมพันธ์ระหว่างหน้าเว็บ</td><td>หาหน้าเว็บที่สำคัญจากโครงสร้างลิงก์ และปรับโครงสร้างเว็บไซต์เพื่อให้ผู้ใช้ค้นหาข้อมูลได้สะดวกขึ้น</td></tr>
<tr><td><b>Web usage mining</b> (การทำเหมืองพฤติกรรมการใช้งานเว็บ)</td><td>ค้นหารูปแบบการเข้าถึงและการนำทางของผู้ใช้จากข้อมูลการใช้งาน เช่น server logs, clicks, browsing sessions</td><td>วิเคราะห์เส้นทางการซื้อสินค้าเพื่อระบุจุดที่ลูกค้าออกจากเว็บไซต์ และปรับปรุงประสบการณ์ผู้ใช้ (User Experience)</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Content = เนื้อหา, Structure = ลิงก์, Usage = พฤติกรรมการใช้งาน (log/click)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> วิเคราะห์รีวิว = Content / วิเคราะห์ลิงก์ระหว่างหน้า = Structure / วิเคราะห์ log และ click = Usage</div>
` },
    { t: "Text Mining", ref: "สไลด์ 6", html: `
<p><b>Text Mining (การทำเหมืองข้อความ)</b> คือกระบวนการสกัดสารสนเทศ รูปแบบ และความรู้ที่สำคัญจาก <b>ข้อมูลข้อความที่ไม่มีโครงสร้าง (Unstructured Text Data)</b> เพื่อค้นหาประเด็นสำคัญ รูปแบบและความสัมพันธ์ที่ซ่อนอยู่ในข้อมูล และสรุปผลเป็นสารสนเทศและความรู้ที่นำไปใช้ประโยชน์ได้</p>
<p><b>ตัวอย่าง Unstructured Text data:</b> เอกสาร Word, ไฟล์ PDF, อีเมล, รีวิวสินค้า และบันทึกการสนทนาที่แปลงเป็นข้อความ</p>
<h4>For example</h4>
<ul>
<li>ทำเหมืองข้อความวิเคราะห์บันทึกการสนทนากับลูกค้า เพื่อค้นหาปัญหาที่พบบ่อยและระบุประเด็นที่ต้องปรับปรุงการบริการ</li>
<li>จำแนกเอกสารตามหมวดหมู่ เพื่อความสะดวกในการใช้งานและการค้นหา</li>
</ul>
<h4>Applications</h4>
<ul><li><b>Marketing Applications: Improving CRM</b> — วิเคราะห์ความคิดเห็นและความรู้สึกของลูกค้า (<b>Sentiment Analysis</b>) เพื่อปรับปรุงการบริการและเพิ่มประสิทธิภาพการบริหารความสัมพันธ์ลูกค้า (CRM)</li></ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Text Mining ทำกับข้อมูลข้อความที่ไม่มีโครงสร้าง (Unstructured)</li>
<li>Sentiment Analysis = วิเคราะห์ความคิดเห็น/ความรู้สึกลูกค้า → ปรับปรุง CRM</li>
</ul></div>
` },
    { t: "Data Mining Process (CRISP-DM) ภาพรวม", ref: "สไลด์ 7", html: `
<p>กระบวนการ Data Mining มาตรฐานคือ <b>CRISP-DM (Cross-Industry Standard Process for Data Mining)</b> มี 6 ขั้นตอน และเป็นวงจรที่วนกลับได้ (ตามลูกศรในรูป)</p>
<table>
<tr><th>#</th><th>ขั้นตอน</th><th>สาระสำคัญ</th></tr>
<tr><td>1</td><td><b>Business Understanding</b> (ทำความเข้าใจปัญหาทางธุรกิจ)</td><td>เข้าใจปัญหา กำหนดวัตถุประสงค์และความต้องการของผู้เกี่ยวข้อง กำหนดเกณฑ์ความสำเร็จ วางแผนการดำเนินงาน</td></tr>
<tr><td>2</td><td><b>Data Understanding</b> (ทำความเข้าใจข้อมูล)</td><td>รวบรวมข้อมูลจากแหล่งต่างๆ สำรวจลักษณะข้อมูล ตรวจสอบคุณภาพ ระบุปัญหาและความสัมพันธ์ที่สำคัญ</td></tr>
<tr><td>3</td><td><b>Data Preparation</b> (เตรียมข้อมูล)</td><td>คัดเลือกข้อมูลที่เกี่ยวข้อง ทำความสะอาด จัดการค่าที่หายไปและค่าผิดปกติ แปลงข้อมูลให้เหมาะสม สร้างตัวแปรใหม่</td></tr>
<tr><td>4</td><td><b>Modeling</b> (สร้างแบบจำลอง)</td><td>เลือกเทคนิค สร้างและฝึกแบบจำลอง ปรับแต่งพารามิเตอร์ และเปรียบเทียบเพื่อหาแบบจำลองที่ดีที่สุด</td></tr>
<tr><td>5</td><td><b>Evaluation</b> (ประเมินผลลัพธ์)</td><td>แปลผลและประเมินคุณภาพ ตรวจสอบว่าสอดคล้องกับวัตถุประสงค์ทางธุรกิจ และพิจารณาว่าควรไปต่อหรือย้อนกลับไปปรับปรุงขั้นตอนก่อนหน้า</td></tr>
<tr><td>6</td><td><b>Deployment</b> (นำผลลัพธ์ไปใช้งาน)</td><td>สื่อสารผลลัพธ์ให้ผู้เกี่ยวข้อง นำแบบจำลองไปใช้ในระบบ/กระบวนการจริง ติดตามผลและประสิทธิภาพ ปรับปรุงเมื่อข้อมูลเปลี่ยน</td></tr>
</table>
<div class="dg"><div class="dgt">🖼️ วงจร CRISP-DM</div>
<svg viewBox="0 0 640 150">
<rect class="bx hd" x="10" y="20" width="90" height="46" rx="6"/><text class="t sm b" x="55" y="40" text-anchor="middle">1 Business</text><text class="t sm" x="55" y="56" text-anchor="middle">Understanding</text>
<rect class="bx" x="115" y="20" width="90" height="46" rx="6"/><text class="t sm b" x="160" y="40" text-anchor="middle">2 Data</text><text class="t sm" x="160" y="56" text-anchor="middle">Understanding</text>
<rect class="bx" x="220" y="20" width="90" height="46" rx="6"/><text class="t sm b" x="265" y="40" text-anchor="middle">3 Data</text><text class="t sm" x="265" y="56" text-anchor="middle">Preparation</text>
<rect class="bx" x="325" y="20" width="90" height="46" rx="6"/><text class="t sm b" x="370" y="48" text-anchor="middle">4 Modeling</text>
<rect class="bx" x="430" y="20" width="90" height="46" rx="6"/><text class="t sm b" x="475" y="48" text-anchor="middle">5 Evaluation</text>
<rect class="bx ok" x="535" y="20" width="90" height="46" rx="6"/><text class="t sm b" x="580" y="48" text-anchor="middle">6 Deployment</text>
<line class="ln" x1="100" y1="43" x2="115" y2="43"/><line class="ln" x1="205" y1="43" x2="220" y2="43"/><line class="ln" x1="310" y1="43" x2="325" y2="43"/><line class="ln" x1="415" y1="43" x2="430" y2="43"/><line class="ln" x1="520" y1="43" x2="535" y2="43"/>
<path class="ln" d="M580 66 L580 110 L55 110 L55 66" fill="none"/>
<text class="t sm" x="320" y="130" text-anchor="middle">วนกลับ: ปรับปรุงเมื่อข้อมูลหรือสถานการณ์เปลี่ยน / ผลประเมินไม่ผ่าน</text>
</svg></div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ลำดับ: Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment</li>
</ul></div>
` },
    { t: "ขั้น 1: Business Understanding", ref: "สไลด์ 8", html: `
<p>ทำความเข้าใจปัญหาและเป้าหมายทางธุรกิจ เพื่อกำหนดเป้าหมายของโครงการ Data Mining ให้สอดคล้องกับความต้องการขององค์กร</p>
<h4>กิจกรรมสำคัญ</h4>
<ul>
<li>ระบุปัญหาและความต้องการทางธุรกิจ</li>
<li>กำหนดเป้าหมายทางธุรกิจและเกณฑ์วัดความสำเร็จ</li>
<li>แปลงเป้าหมายทางธุรกิจเป็นเป้าหมายการทำเหมืองข้อมูล</li>
</ul>
<h4>ตัวอย่าง: ร้านค้าออนไลน์</h4>
<ul>
<li><b>ปัญหาทางธุรกิจ:</b> ยอดขายต่อคำสั่งซื้อต่ำกว่าที่วางไว้</li>
<li><b>Business Objective:</b> เพิ่มยอดขายต่อคำสั่งซื้อด้วยการแนะนำสินค้าที่เหมาะสม</li>
<li><b>Data Mining Objective:</b> ค้นหาความสัมพันธ์ระหว่างสินค้าที่ลูกค้ามักซื้อร่วมกัน โดยใช้ <b>Association Rule Mining</b></li>
<li><b>เกณฑ์วัดความสำเร็จ:</b> ประเมินคุณภาพของกฎความสัมพันธ์ และวัดการเปลี่ยนแปลงของยอดขายหลังทดลองใช้ระบบแนะนำสินค้า</li>
</ul>
<div class="warn"><b>⚠️ ระวัง</b> Business Objective (เป้าหมายธุรกิจ เช่น เพิ่มยอดขาย) ต่างจาก Data Mining Objective (เป้าหมายเชิงเทคนิค เช่น หา association rule)</div>
` },
    { t: "ขั้น 2: Data Understanding", ref: "สไลด์ 9", html: `
<p>ทำความเข้าใจข้อมูลที่มีอยู่ เพื่อประเมินว่าข้อมูลมีลักษณะ คุณภาพ และความเหมาะสมเพียงพอที่จะนำมาตอบโจทย์ทางธุรกิจที่กำหนดไว้หรือไม่</p>
<h4>กิจกรรมสำคัญ 4 อย่าง</h4>
<ul>
<li><b>Collect Initial Data:</b> รวบรวมข้อมูลเบื้องต้นจากแหล่งข้อมูลที่เกี่ยวข้อง</li>
<li><b>Describe Data:</b> อธิบายลักษณะข้อมูล เช่น จำนวนระเบียน จำนวนตัวแปร ชนิดข้อมูล และการกระจายตัวของข้อมูล</li>
<li><b>Explore Data:</b> สำรวจข้อมูลด้วยสถิติเชิงพรรณนา ตาราง กราฟ และการวิเคราะห์ความสัมพันธ์เบื้องต้น</li>
<li><b>Verify Data Quality:</b> ตรวจสอบคุณภาพข้อมูล เช่น ค่าที่หายไป ข้อมูลซ้ำ ค่าผิดปกติ และความไม่สอดคล้องกันของข้อมูล</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Collect → Describe → Explore → Verify Data Quality</li></ul></div>
` },
    { t: "ขั้น 3: Data Preparation", ref: "สไลด์ 10", html: `
<p>เตรียมข้อมูลให้มีคุณภาพและอยู่ในรูปแบบที่เหมาะสมสำหรับการสร้างโมเดล Data Mining แบ่งเป็น 3 ขั้นตอนย่อย</p>
<ol>
<li><b>Data Selection (การคัดเลือกข้อมูล)</b> — คัดเลือกข้อมูลและตัวแปรที่เกี่ยวข้องกับวัตถุประสงค์ของโครงการ โดยพิจารณาเลือกแหล่งข้อมูล ระเบียน (Records) และตัวแปร (Attributes) ที่จำเป็นต่อการวิเคราะห์และสร้างโมเดล<br>
<i>ตัวอย่าง:</i> ต้องการวิเคราะห์ปัจจัยที่เกี่ยวข้องกับการเลือกซื้อรถสปอร์ต จึงคัดเลือกข้อมูลลูกค้าและประวัติการซื้อรถ โดยใช้ตัวแปร เช่น อายุ รายได้ อาชีพ ยี่ห้อรถ และประเภทรถ และไม่นำข้อมูลพนักงานขายที่ไม่เกี่ยวข้องกับโจทย์มาวิเคราะห์</li>
<li><b>Data Preprocessing (การเตรียมและทำความสะอาดข้อมูล)</b> — ทำข้อมูลให้มีคุณภาพดี เพื่อให้ข้อมูลมีความถูกต้อง ครบถ้วน และสอดคล้องกัน เช่น จัดการ <b>Missing Value</b>, <b>Outlier data</b>, ปรับแปลงข้อมูลที่ไม่สอดคล้องกัน เช่น รูปแบบวันที่หรือหน่วยวัดที่แตกต่างกัน</li>
<li><b>Data Transformation (การแปลงข้อมูล)</b> — แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสมกับเทคนิคและอัลกอริทึมที่ใช้สร้างโมเดล โดยอาจสร้างตัวแปรใหม่ ปรับสเกลข้อมูล หรือแปลงค่าข้อมูลให้อยู่ในรูปแบบที่ต้องการ<br>
ตัวอย่าง: สร้างตัวแปรช่วงอายุ (ต่ำกว่า 30 ปี, 30-49 ปี, 50 ปีขึ้นไป); แปลงข้อมูลประเภทรถจากข้อความเป็นตัวเลข; ปรับสเกลตัวแปรรายได้ให้อยู่ในช่วง -1 ถึง 1 ด้วย Min-Max Normalization</li>
</ol>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Data Preparation 3 ขั้นย่อย: Selection → Preprocessing (cleaning) → Transformation</li></ul></div>
` },
    { t: "Data Transformation: Normalization (min-max)", ref: "สไลด์ 11", html: `
<p><b>Normalization:</b> การนำข้อมูลมาแบ่งภายในช่วงที่กำหนด เช่น 0.0-1.0 หรือ -1.0-1.0 (เพื่อให้ตัวแปรที่หน่วยและขนาดต่างกันอยู่ในสเกลเดียวกัน)</p>
<h4>min-max normalization</h4>
<p><code>v' = ((v - min_A) / (max_A - min_A)) × (new_max_A - new_min_A) + new_min_A</code></p>
<p>min_A และ max_A คือค่า Minimum และ Maximum ของแอตทริบิวต์ A สามารถใช้ Min-Max Normalization แปลงค่า (Map) v ของ A ไปเป็น v' บนช่วง [new_min_A, new_max_A]</p>
<p>ภาพในสไลด์: กราฟที่สูงสุด 20 ถูก "scaling" ให้อยู่ในช่วง -1 ถึง 1 รูปทรงกราฟเหมือนเดิมแต่สเกลเปลี่ยน</p>
<div class="note"><b>💡 ตัวอย่างคำนวณ</b> รายได้ min = 10,000, max = 50,000 ต้องการช่วง 0-1 ค่า v = 30,000 → v' = (30,000-10,000)/(50,000-10,000) × (1-0) + 0 = <b>0.5</b></div>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>min-max ปรับค่าให้อยู่ในช่วง [new_min, new_max] ที่กำหนด ค่าต่ำสุดไปอยู่ที่ new_min และค่าสูงสุดไปอยู่ที่ new_max</li></ul></div>
` },
    { t: "Discretization และ One-of-N coding", ref: "สไลด์ 12-13", html: `
<h4>Discretization</h4>
<p>คือการแปลง <b>ตัวแปรเชิงปริมาณ (quantitative)</b> เป็น <b>ตัวแปรเชิงหมวดหมู่ (categorical)</b> โดยแบ่งค่าของตัวแปรนำเข้าเป็นช่วง (buckets)</p>
<p><b>ตัวอย่าง:</b> รายได้ $0-$9,999 = range 1; $10,000-$19,999 = range 2 (และต่อไปเรื่อยๆ)</p>
<h4>One-of-N coding</h4>
<p>คือการแปลง <b>ตัวแปรเชิงหมวดหมู่</b> เป็นการแทนค่าแบบ <b>ตัวเลข</b> โดยให้แต่ละหมวดมีหนึ่งหลักที่เป็น 1 (นอกนั้น 0)</p>
<table><tr><th>ยี่ห้อ</th><th>รหัส</th></tr>
<tr><td>Ford</td><td>100</td></tr><tr><td>Nissan</td><td>010</td></tr><tr><td>Honda</td><td>001</td></tr></table>
<div class="warn"><b>⚠️ ระวัง</b> Discretization: เลข → หมวดหมู่ (ช่วง) / One-of-N: หมวดหมู่ → เลข (0/1) ทิศทางตรงกันข้ามกัน</div>
` },
    { t: "ขั้น 4: Modeling และ Predictive Model", ref: "สไลด์ 14-15", html: `
<p><b>Modeling (การสร้างแบบจำลอง)</b> เป็นขั้นตอนการเลือกเทคนิคและสร้างแบบจำลอง (Model) โดยเลือกวิธีการให้เหมาะสมกับวัตถุประสงค์ของการทำ Data Mining เพื่อค้นหา Patterns, Trends และ Relationships ของข้อมูล รวมถึงนำแบบจำลองไปใช้ในการจำแนกกลุ่ม การพยากรณ์ หรือการค้นหาความสัมพันธ์ของข้อมูล</p>
<h4>Model ในการทำ Data Mining แบ่งเป็น 3 กลุ่ม (ตามสไลด์ถัดไป)</h4>
<ol><li>Predictive Model</li><li>Database Segmentation (Clustering)</li><li>Link Analysis</li></ol>
<h4>1. Predictive Model</h4>
<p>ทำนายอนาคตจากข้อมูลในอดีตและปัจจุบัน แบ่งเป็น</p>
<ul>
<li><b>Classification</b> — ทำนายว่าสิ่งนั้นควรอยู่ในกลุ่มไหน (ผลเป็นหมวดหมู่) เทคนิค: <b>Decision trees</b>, <b>Neural Networks</b></li>
<li><b>Value prediction</b> — ทำนายค่าที่เป็นตัวเลข เทคนิค: <b>Linear Regression</b>, <b>Neural Networks</b></li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Classification = ทำนาย "กลุ่ม" (Decision Tree, Neural Network)</li>
<li>Value prediction = ทำนาย "ค่าตัวเลข" (Linear Regression, Neural Network)</li>
<li>Neural Networks ใช้ได้ทั้งสองแบบ</li>
</ul></div>
` },
    { t: "Classification และ Supervised Learning", ref: "สไลด์ 16-17", html: `
<h4>Classification</h4>
<ul>
<li>คือกระบวนการกำหนดวัตถุใหม่ให้อยู่ในหมวดหมู่หรือคลาสที่กำหนดไว้ล่วงหน้า (assigning new objects to predefined categories or classes)</li>
<li>เป็นกระบวนการสร้างแบบจำลองเพื่อจำแนกข้อมูลให้อยู่ในกลุ่มหรือประเภทที่กำหนดไว้ล่วงหน้า โดย <b>เรียนรู้จากข้อมูลที่มีการระบุคลาสไว้แล้ว</b></li>
<li>เป็น <b>Supervised Learning</b></li>
</ul>
<p><b>EX:</b> ข้อมูลลูกค้าบัตรเครดิตที่ถูกจัดคลาสแล้ว (ตารางมีคอลัมน์ No, income, Job Position, age, Class โดย Class เป็น A, B, C)</p>
<h4>Supervised Learning</h4>
<p>คือกระบวนการเรียนรู้เพื่อหาความสัมพันธ์ของข้อมูลจากข้อมูล <b>input - output ที่ทราบค่า</b></p>
<table>
<tr><th>No</th><th>income</th><th>Job Position</th><th>age</th><th>Class</th></tr>
<tr><td>1</td><td>50000</td><td>Manager</td><td>40</td><td>A</td></tr>
<tr><td>2</td><td>18000</td><td>worker</td><td>24</td><td>C</td></tr>
<tr><td>3</td><td>60000</td><td>Manager</td><td>45</td><td>A</td></tr>
<tr><td>4</td><td>35000</td><td>supervisor</td><td>30</td><td>B</td></tr>
</table>
<p>Input = income, job position, age / Output (ที่ทราบ) = Class โมเดลเรียนรู้ความสัมพันธ์นี้ แล้วนำไปทำนายคลาสของลูกค้าใหม่</p>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Classification = Supervised Learning (มีป้าย/คลาสกำกับล่วงหน้า)</li></ul></div>
` },
    { t: "ตัวอย่าง Classification: Decision Tree", ref: "สไลด์ 18-19", html: `
<p>ตัวอย่างข้อมูลลูกค้า (ทำนายว่า Stay หรือ Leave)</p>
<table>
<tr><th>ชื่อ</th><th>ระยะเวลาที่เป็นสมาชิก</th><th>จำนวนบริการที่ใช้</th><th>สถานะ</th></tr>
<tr><td>A</td><td>&gt;2.5</td><td>&gt;3</td><td>Stay</td></tr>
<tr><td>B</td><td>&gt;2.5</td><td>&lt;3</td><td>Stay</td></tr>
<tr><td>C</td><td>&lt;2.5</td><td>&lt;3</td><td>Leave</td></tr>
<tr><td>D</td><td>&lt;2.5</td><td>&gt;3</td><td>Stay</td></tr>
</table>
<h4>Decision Tree</h4>
<p>เป็นโมเดลที่ใช้ในการ Classify ข้อมูลตาม <b>Nodes</b> และ <b>Leaves</b> ที่มีความสัมพันธ์กันตามเงื่อนไข โดยสามารถแตกความสัมพันธ์ลงไปจนพบสิ่งที่ต้องการ</p>
<div class="dg"><div class="dgt">🖼️ Decision Tree ทำนาย Stay / Leave</div>
<svg viewBox="0 0 520 230">
<rect class="bx hd" x="170" y="10" width="180" height="36" rx="6"/><text class="t b" x="260" y="33" text-anchor="middle">ระยะเวลาที่เป็นสมาชิก</text>
<line class="ln" x1="230" y1="46" x2="110" y2="100"/><text class="t sm" x="150" y="68" text-anchor="middle">&gt; 2.5</text>
<line class="ln" x1="290" y1="46" x2="360" y2="100"/><text class="t sm" x="345" y="68" text-anchor="middle">&lt; 2.5</text>
<rect class="bx ok" x="60" y="100" width="100" height="36" rx="6"/><text class="t b" x="110" y="123" text-anchor="middle">Stay</text>
<rect class="bx hd" x="290" y="100" width="140" height="36" rx="6"/><text class="t b" x="360" y="123" text-anchor="middle">จำนวนบริการที่ใช้</text>
<line class="ln" x1="330" y1="136" x2="280" y2="180"/><text class="t sm" x="290" y="158" text-anchor="middle">&lt; 3</text>
<line class="ln" x1="390" y1="136" x2="440" y2="180"/><text class="t sm" x="435" y="158" text-anchor="middle">&gt; 3</text>
<rect class="bx bad" x="230" y="180" width="100" height="36" rx="6"/><text class="t b" x="280" y="203" text-anchor="middle">Leave</text>
<rect class="bx ok" x="390" y="180" width="100" height="36" rx="6"/><text class="t b" x="440" y="203" text-anchor="middle">Stay</text>
</svg></div>
<p>วิธีอ่าน: ถ้าเป็นสมาชิกนานกว่า 2.5 → Stay; ถ้าไม่เกิน 2.5 ให้ดูจำนวนบริการ: น้อยกว่า 3 → Leave, มากกว่า 3 → Stay</p>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Decision Tree ประกอบด้วย Nodes (เงื่อนไข) และ Leaves (ผลลัพธ์/คลาส)</li></ul></div>
` },
    { t: "ตัวอย่าง Classification: Neural Networks", ref: "สไลด์ 20-21", html: `
<p>Neural Network ได้แนวคิดจากเซลล์ประสาท (neuron) ในสมอง (ภาพมุมขวาของสไลด์แสดงเซลล์ประสาท: dendrites, soma, axon)</p>
<p>ตัวอย่างการ classify ด้วย Neural Network: <b>Input</b> 2 ตัว คือ ระยะเวลาที่เป็นสมาชิก และ # บริการที่ใช้ → ผ่านโหนดชั้นกลาง (3 โหนด) → <b>Output</b> คือ สถานะ (Stay/Leave) โดยทุกโหนดชั้นหนึ่งเชื่อมต่อกับโหนดชั้นถัดไป</p>
<h4>โครงสร้าง Neural Networks (สไลด์ 21)</h4>
<ul>
<li><b>Input Layer</b> (สีเขียว) รับข้อมูลเข้า</li>
<li><b>Hidden Layer</b> (สีส้ม) ประมวลผลระหว่างทาง (ในภาพมี 2 ชั้น)</li>
<li><b>Output Layer</b> (สีฟ้า) ให้ผลลัพธ์</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>3 ชั้น: Input Layer, Hidden Layer, Output Layer</li></ul></div>
` },
    { t: "Value Prediction: Regression", ref: "สไลด์ 22-23", html: `
<p><b>Regression:</b> การเรียนรู้ฟังก์ชันที่แปลง (map) ตัวแปรนำเข้าไปเป็น <b>ค่าตัวเลขต่อเนื่อง (continuous numerical value)</b></p>
<p><b>EX.</b> แบบจำลองทำนายความน่าจะเป็นของการเกิดอุบัติเหตุรถยนต์</p>
<table>
<tr><th>No</th><th>Vehicle speed (mph) x1</th><th>Alcohol level x2</th><th>Age x3</th><th>Probability of Car Accident (Y)</th></tr>
<tr><td>1</td><td>80</td><td>0.02</td><td>20</td><td>0.80</td></tr>
<tr><td>2</td><td>70</td><td>0.01</td><td>25</td><td>0.70</td></tr>
<tr><td>3</td><td>55</td><td>0.0</td><td>30</td><td>0.05</td></tr>
<tr><td>4</td><td>60</td><td>0.1</td><td>45</td><td>0.26</td></tr>
</table>
<p>รูปแบบสมการ: <code>Y = b0 + b1x1 + b2x2 + b3x3</code></p>
<p>เมื่อเรียนรู้จากข้อมูลแล้วได้สมการ: <code>Y = 0.002 + 0.024x1 + 1.04x2 - 0.012x3</code></p>
<ul>
<li>ความเร็ว (x1) สูงขึ้น → โอกาสเกิดอุบัติเหตุสูงขึ้น (สัมประสิทธิ์บวก)</li>
<li>ระดับแอลกอฮอล์ (x2) สูงขึ้น → โอกาสสูงขึ้นมาก (สัมประสิทธิ์ 1.04)</li>
<li>อายุ (x3) มากขึ้น → โอกาสลดลงเล็กน้อย (สัมประสิทธิ์ลบ)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Regression ทำนายค่าตัวเลขต่อเนื่อง (Value prediction) ด้วยสมการ Y = b0 + b1x1 + ...</li></ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Classification ทำนายกลุ่ม (เช่น A/B/C, Stay/Leave) แต่ Regression ทำนายตัวเลข (เช่น ความน่าจะเป็น 0.80)</div>
` },
    { t: "Database Segmentation (Clustering)", ref: "สไลด์ 24-26", html: `
<h4>2. Database Segmentation = Clustering</h4>
<ul>
<li>เป้าหมายคือแบ่งฐานข้อมูลเป็นส่วน (segments) ของระเบียนที่คล้ายกัน คือระเบียนที่มีคุณสมบัติร่วมกัน</li>
<li>เป็นเทคนิคการจัดกลุ่มข้อมูล (คน, สิ่งของ) โดยนำข้อมูลที่มีคุณลักษณะคล้ายคลึงกันมาอยู่ในกลุ่มเดียวกัน และแยกข้อมูลที่มีลักษณะแตกต่างกันออกจากกัน</li>
<li><b>ไม่จำเป็นต้องกำหนดป้ายกำกับกลุ่มไว้ล่วงหน้า (Unsupervised Learning)</b> โดยอัลกอริทึมจะค้นหารูปแบบและกลุ่มที่เหมาะสมจากข้อมูล</li>
</ul>
<h4>ภาพประกอบ</h4>
<ul>
<li>สไลด์ 25: ก้อนข้อมูลใหญ่ที่ปะปนกันทั้งสามเหลี่ยม หัวใจ และสี่เหลี่ยม ถูกแยกเป็น 3 กลุ่มย่อย แต่ละกลุ่มมีรูปร่างเดียวกัน</li>
<li>สไลด์ 26: กราฟแกน X = age, แกน Y = Income (thousands) พบ 2 กลุ่ม คือ <b>Young, Lower-Income Group</b> (อายุประมาณ 20 รายได้ต่ำ) และ <b>Older, Higher-Income Group</b> (อายุประมาณ 40 รายได้สูง)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Clustering = Unsupervised Learning (ไม่มีคลาสกำหนดล่วงหน้า)</li>
<li>Classification = Supervised (มีคลาสกำหนดล่วงหน้า)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ข้อสอบมักถามคู่ Supervised vs Unsupervised: Classification กับ Clustering</div>
` },
    { t: "Link Analysis และ Association Rule", ref: "สไลด์ 27-28", html: `
<h4>3. Link Analysis</h4>
<ul>
<li><b>Associations Discovery (การค้นหากฎความสัมพันธ์)</b> — ค้นหาความสัมพันธ์ระหว่างรายการหรือเหตุการณ์ที่เกิดขึ้นร่วมกัน</li>
<li><b>Sequential Pattern Discovery (การค้นหารูปแบบตามลำดับ)</b> — ค้นหารูปแบบของรายการหรือเหตุการณ์ที่เกิดขึ้นตามลำดับเวลา</li>
</ul>
<h4>Associations Discovery</h4>
<p>เป็นเทคนิค Data Mining ที่ใช้ค้นหาความสัมพันธ์ระหว่างรายการหรือคุณลักษณะที่มักปรากฏร่วมกันในชุดข้อมูล เช่น ลูกค้าที่ซื้อผ้าอ้อมสำเร็จรูปมักซื้อเบียร์ร่วมด้วย</p>
<h4>Association rule</h4>
<p>กฎที่แสดงความสัมพันธ์ระหว่างรายการในรูปแบบ <b>(X → Y)</b> เพื่อแสดงว่ารายการใดมักปรากฏร่วมกัน และความสัมพันธ์ดังกล่าวมีความน่าสนใจมากน้อยเพียงใด</p>
<ul>
<li><b>Support:</b> สัดส่วนของธุรกรรมทั้งหมดที่มีรายการ X และ Y ปรากฏร่วมกัน</li>
<li><b>Confidence:</b> สัดส่วนของธุรกรรมที่มี X แล้วพบ Y ปรากฏร่วมด้วย ใช้แสดงความน่าเชื่อถือของกฎ X → Y</li>
</ul>
<p><b>EX: Milk → Sugar</b> — 98% of people who buy Milk also buy Sugar (นี่คือ Confidence); 65% of all grocery shoppers buy both (นี่คือ Support)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Support = สัดส่วนธุรกรรม "ทั้งหมด" ที่มีทั้ง X และ Y</li>
<li>Confidence = ในธุรกรรมที่มี X สัดส่วนที่มี Y ด้วย</li>
<li>Association = เกิดร่วมกัน / Sequential = เกิดตามลำดับเวลา</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ตัวหารของ Support คือธุรกรรมทั้งหมด ส่วนตัวหารของ Confidence คือเฉพาะธุรกรรมที่มี X</div>
` },
    { t: "ขั้น 5: Evaluation", ref: "สไลด์ 29", html: `
<p>เป็นขั้นตอนการประเมินผลลัพธ์จากการทำ Data Mining เพื่อตรวจสอบว่าแบบจำลองที่สร้างขึ้นมีคุณภาพเหมาะสม และสามารถตอบสนองวัตถุประสงค์ทางธุรกิจที่กำหนดไว้ได้หรือไม่</p>
<h4>กิจกรรมสำคัญ</h4>
<ul>
<li><b>Evaluate Results (แปลผลลัพธ์):</b>
 <ul><li><b>Interpret Results</b> — ตีความผลลัพธ์จากแบบจำลองเพื่อทำความเข้าใจรูปแบบ แนวโน้ม หรือความสัมพันธ์ที่ค้นพบ และพิจารณาความหมายในบริบทของปัญหา</li>
 <li><b>Evaluate Model and Results</b> — ประเมินคุณภาพและความเหมาะสมของแบบจำลอง รวมถึงตรวจสอบว่าผลลัพธ์สามารถตอบวัตถุประสงค์ของโครงการได้หรือไม่</li></ul></li>
<li><b>Review Process (การทบทวนกระบวนการ):</b> ทบทวนและตรวจสอบขั้นตอนการดำเนินงานที่ผ่านมาทั้งหมด เพื่อค้นหาข้อผิดพลาด ข้อจำกัด หรือประเด็นที่ควรปรับปรุง ซึ่งอาจส่งผลต่อคุณภาพและความน่าเชื่อถือของผลลัพธ์</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Evaluation: Interpret Results, Evaluate Model and Results, Review Process</li></ul></div>
` },
    { t: "ขั้น 6: Deployment", ref: "สไลด์ 30", html: `
<p>นำผลลัพธ์จากการทำเหมืองข้อมูลหรือแบบจำลองที่ผ่านการประเมินแล้วไปประยุกต์ใช้ในการทำงานจริง เพื่อสนับสนุนการตัดสินใจหรือแก้ปัญหาทางธุรกิจ</p>
<h4>กิจกรรมสำคัญ</h4>
<ul>
<li><b>Communicate Results:</b> สื่อสารผลลัพธ์และข้อค้นพบให้ผู้เกี่ยวข้องเข้าใจ เช่น นำเสนอแนวโน้มพฤติกรรมลูกค้า</li>
<li><b>Deploy Model:</b> นำแบบจำลองไปใช้งานจริงในระบบหรือกระบวนการทางธุรกิจ เช่น สร้างระบบพยากรณ์ยอดขาย ใช้ผลการวิเคราะห์จัดโปรโมชัน</li>
<li><b>Monitor and Maintain:</b> ติดตามผลการใช้งานและประสิทธิภาพของแบบจำลอง พร้อมปรับปรุงเมื่อข้อมูลหรือสถานการณ์เปลี่ยนแปลง</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Deployment: Communicate Results, Deploy Model, Monitor and Maintain</li></ul></div>
` },
    { t: "สรุปกระบวนการ, สหวิทยาการ และซอฟต์แวร์", ref: "สไลด์ 31-34", html: `
<h4>สรุปกระบวนการ (สไลด์ 31)</h4>
<p>ภาพสรุปเรียงเป็น 1 Business Understanding (เข้าใจปัญหาธุรกิจและกำหนดวัตถุประสงค์) → 2 Data Understanding (รวบรวมและสำรวจข้อมูล) → 3 Data Preparation (คัดเลือก ทำความสะอาด แปลงข้อมูล) → 4 Modeling (เลือกเทคนิคและสร้างแบบจำลอง) → 5 Evaluation (แปลผลว่าสอดคล้องกับวัตถุประสงค์หรือไม่) → 6 Deployment (นำผลไปใช้งานจริงและติดตามผล)</p>
<h4>Data mining is multidisciplinary (สไลด์ 32)</h4>
<p>Data Mining เป็นศาสตร์ที่ผสมหลายสาขา (วงกลมซ้อนกัน):</p>
<ul>
<li><b>Database systems</b>: DBMS, Query processing, Data warehousing</li>
<li><b>AI</b>: Machine Learning, Neural network</li>
<li><b>Math, Statistic</b>: Statistical and Mathematical modeling</li>
<li><b>Other</b>: สาขาอื่นๆ</li>
</ul>
<h4>Data Mining Software (สไลด์ 33-34)</h4>
<ol>
<li><b>Database-integrated Data Mining Software</b>
<ul><li>Microsoft SQL Server Analysis Services - Data Mining (ยกเลิกใน SQL Server 2022)</li>
<li>Oracle Data Mining (ชื่อเดิม; ปัจจุบันใช้ Oracle Machine Learning for SQL)</li></ul></li>
<li><b>Statistical and Analytics Software</b>
<ul><li>SAS Enterprise Miner</li><li>IBM SPSS Modeler (ชื่อเดิม Clementine)</li></ul></li>
</ol>
<p>สไลด์ 34 แสดงหน้าจอ SAS Enterprise Miner ซึ่งสร้างโมเดลด้วยการลาก node ต่อกันเป็นผังงาน เช่น Transaction Data → Association, Historical Customer Data → Sampling → Data Partition → Transform Variables → Regression / Neural Network / Tree / Clustering → Assessment → Score → Reporter</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Data Mining = DB + AI + สถิติ/คณิตศาสตร์ + อื่นๆ</li>
<li>กลุ่มซอฟต์แวร์: DB-integrated (SQL Server Analysis Services, Oracle Data Mining) และ Statistical (SAS Enterprise Miner, IBM SPSS Modeler)</li>
</ul></div>
` }
  ],
  ex: [
    {type:"choice", story:"ใต้รูปโน๊ตบุ๊กในเว็บร้านค้ามีช่อง \"ของที่คนอื่นมักหยิบคู่กัน\" แสดงเมาส์และกระเป๋าให้เลือกเพิ่ม", q:"ระบบนี้ตรงกับการประยุกต์ใดของ Data Mining", opts:[{t:"Cross Selling",why:"ใช้หาสินค้าที่มักซื้อร่วมกันเพื่อแนะนำเพิ่ม"},{t:"Direct Mail Campaign",why:"เป็นการเลือกกลุ่มลูกค้าแล้วส่งข้อเสนอ ไม่ใช่การแนะนำสินค้าคู่กัน"},{t:"Forecasting",why:"เป็นการพยากรณ์ยอดขายหรือความต้องการ"},{t:"Purchasing Pattern Over Time",why:"ดูแบบแผนการซื้อตามช่วงเวลา ไม่ใช่สินค้าที่คู่กัน"}], ans:0},
    {type:"choice", story:"ร้านเครื่องปรับอากาศสรุปยอดขายย้อนหลัง 5 ปี แล้วทยอยเพิ่มสต็อกก่อนเข้าหน้าร้อนทุกปี", q:"เป็นเรื่องย่อยใดของกลุ่ม Market Management", opts:[{t:"Purchasing Pattern Over Time",why:"วิเคราะห์แบบแผนการซื้อตามช่วงเวลาเพื่อวางแผนขายและสต็อก"},{t:"Cross Selling",why:"เน้นสินค้าที่ซื้อร่วมกัน ไม่ใช่ช่วงเวลา"},{t:"Profile of Attrition",why:"เป็นเรื่องลูกค้าที่จะเลิกใช้บริการ อยู่ในกลุ่ม Risk"},{t:"Direct Mail Campaign",why:"เป็นการแบ่งกลุ่มลูกค้าเพื่อส่งข้อเสนอ"}], ans:0},
    {type:"choice", story:"บริษัทประกันคัดรายชื่อ 5,000 รายจากฐานลูกค้าทั้งหมด ที่ข้อมูลชี้ว่าน่าจะสนใจแผนสุขภาพ แล้วส่งใบเสนอไปเฉพาะกลุ่มนี้", q:"เป็นเรื่องย่อยใดของกลุ่ม Market Management", opts:[{t:"Cross Selling",why:"เป็นการแนะนำสินค้าที่มักซื้อร่วมกัน"},{t:"Purchasing Pattern Over Time",why:"เป็นการดูแบบแผนการซื้อตามช่วงเวลา"},{t:"Customer Churn Management",why:"อยู่ในกลุ่ม Risk เน้นลูกค้าที่จะเลิกใช้บริการ"},{t:"Direct Mail Campaign",why:"แบ่งกลุ่มลูกค้าแล้วส่งข้อเสนอตรงกลุ่มเป้าหมาย"}], ans:3},
    {type:"choice", story:"บริษัทไฟแนนซ์ให้ระบบประเมินโอกาสผิดนัดชำระของผู้ยื่นขอสินเชื่อรถยนต์ทุกรายก่อนตัดสินใจอนุมัติ", q:"งานนี้จัดอยู่ในกลุ่มการประยุกต์ใดจาก 5 กลุ่ม", opts:[{t:"Market Management",why:"เป็นกลุ่มวางแผนขายและการตลาด ไม่ใช่การประเมินความเสี่ยงสินเชื่อ"},{t:"Risk Analysis & Management",why:"Credit Scoring เป็นเรื่องย่อยของกลุ่มวิเคราะห์ความเสี่ยง"},{t:"Fraud Detection",why:"เป็นกลุ่มหาธุรกรรมผิดปกติ ไม่ใช่ประเมินผู้ขอสินเชื่อ"},{t:"Web Mining",why:"เป็นกลุ่มวิเคราะห์ข้อมูลเว็บไซต์"}], ans:1},
    {type:"choice", story:"ค่ายมือถือดูลักษณะร่วมของผู้ใช้ที่ย้ายไปใช้เครือข่ายอื่นแล้ว เพื่อหาว่าผู้ใช้ปัจจุบันรายใดมีลักษณะคล้ายกันและน่าจะย้ายตามไป", q:"งานนี้ตรงกับเรื่องย่อยใดของกลุ่ม Risk Analysis & Management", opts:[{t:"Profile of Attrition",why:"วิเคราะห์ลักษณะลูกค้าที่เลิกใช้บริการเพื่อชี้กลุ่มที่เสี่ยงเลิกต่อ"},{t:"Credit Scoring",why:"ประเมินความเสี่ยงของผู้ขอสินเชื่อ ไม่ใช่การเลิกใช้บริการ"},{t:"Forecasting",why:"พยากรณ์ยอดขายและความต้องการสินค้า"},{t:"Fraud Detection",why:"เป็นอีกกลุ่มการประยุกต์ที่หาธุรกรรมผิดปกติ"}], ans:0},
    {type:"choice", story:"ทีมวิเคราะห์ข้อมูลของธนาคารทบทวนว่าหัวข้อใดนับเป็นกลุ่มการประยุกต์ใช้ของ Data Mining", q:"ข้อใดเป็นหนึ่งใน 5 กลุ่มการประยุกต์ใช้", opts:[{t:"OLAP Reporting",why:"เป็นเครื่องมือวิเคราะห์ข้อมูลหลายมิติ ไม่ใช่กลุ่มการประยุกต์ของ Data Mining"},{t:"Supply Chain Planning",why:"เป็นงานของระบบ SCM"},{t:"Data Warehousing",why:"เป็นส่วนของศาสตร์ฐานข้อมูลที่ Data Mining ใช้ ไม่ใช่กลุ่มการประยุกต์"},{t:"Fraud Detection",why:"เป็นกลุ่มการประยุกต์ที่หาธุรกรรมผิดปกติ"}], ans:3},
    {type:"choice", story:"เว็บร้านค้าอยากรู้ว่าลูกค้าเดินผ่านหน้าใดบ้างก่อนจะปิดเว็บทิ้งที่หน้าชำระเงิน จึงวิเคราะห์ประวัติการเข้าใช้ของผู้เยี่ยมชมแต่ละคน", q:"เป็น Web Mining แบบใด", opts:[{t:"Web content mining",why:"ทำกับเนื้อหาในหน้าเว็บ ไม่ใช่เส้นทางการใช้งาน"},{t:"Web structure mining",why:"ทำกับโครงสร้างลิงก์ระหว่างหน้า"},{t:"Text Mining",why:"ทำกับข้อมูลข้อความไม่มีโครงสร้าง ไม่ใช่ประเภทของ Web Mining"},{t:"Web usage mining",why:"วิเคราะห์พฤติกรรมการเข้าถึงและนำทางของผู้ใช้"}], ans:3},
    {type:"choice", story:"ทีมข้อมูลของร้านค้าเลือกใช้โมเดลที่ได้แนวคิดจากเซลล์ประสาทในสมอง เพื่อทำงานวิเคราะห์ของโครงการ", q:"Neural Network ใช้ทำงานแบบใดได้", opts:[{t:"ทำนายกลุ่มเท่านั้น",why:"Neural Network ทำนายค่าตัวเลขได้ด้วย"},{t:"ทำนายตัวเลขเท่านั้น",why:"Neural Network ทำนายกลุ่มได้ด้วย"},{t:"ทำได้ทั้งสองแบบ",why:"ใช้ได้ทั้ง Classification และ Value prediction"},{t:"จัดกลุ่มเท่านั้น",why:"Clustering เป็นอีกกลุ่มโมเดลหนึ่ง ไม่ใช่งานเฉพาะของ Neural Network"}], ans:2},
    {type:"choice", story:"โรงพยาบาลมีอีเมลร้องเรียนและบันทึกคำพูดที่ถอดเป็นเอกสารหลายหมื่นฉบับ ผู้บริหารอยากรู้ว่าเรื่องใดถูกพูดถึงบ่อยที่สุด", q:"ควรใช้เทคนิคใด", opts:[{t:"Web usage mining",why:"ใช้กับข้อมูลการใช้งานเว็บ ไม่ใช่เอกสารข้อความ"},{t:"Link Analysis",why:"ใช้หาความสัมพันธ์ของรายการที่เกิดร่วมกันหรือเรียงตามเวลา"},{t:"Credit Scoring",why:"ใช้ประเมินความเสี่ยงของผู้ขอสินเชื่อ"},{t:"Text Mining",why:"สกัดประเด็นสำคัญจากข้อมูลข้อความไม่มีโครงสร้าง"}], ans:3},
    {type:"choice", story:"ทีมตั้งเป้า \"ลดลูกค้าที่เลิกใช้บริการลง 10%\" แล้วแปลงเป็นโจทย์ \"สร้างโมเดลทำนายลูกค้าเสี่ยงเลิก\" โดยยังไม่เปิดไฟล์ข้อมูลใดเลย", q:"อยู่ในขั้นใดของ CRISP-DM", opts:[{t:"Data Understanding",why:"เป็นขั้นรวบรวมและสำรวจข้อมูล ซึ่งยังไม่ได้เริ่ม"},{t:"Business Understanding",why:"กำหนดปัญหา เป้าหมาย และแปลงเป็นเป้าหมาย Data Mining"},{t:"Data Preparation",why:"เป็นขั้นคัดเลือก ทำความสะอาด และแปลงข้อมูล"},{t:"Evaluation",why:"เป็นขั้นประเมินโมเดลหลังสร้างแล้ว"}], ans:1},
    {type:"choice", story:"ตารางลูกค้ามีวันที่บางแถวเป็น พ.ศ. บางแถวเป็น ค.ศ. และช่องอายุบางแถวว่าง ทีมจึงปรับให้เป็นรูปแบบเดียวกันและจัดการค่าที่หาย", q:"เป็นขั้นย่อยใดของ Data Preparation", opts:[{t:"Data Preprocessing",why:"ทำความสะอาด จัดการ Missing Value และปรับข้อมูลที่ไม่สอดคล้องกัน"},{t:"Data Selection",why:"เป็นการเลือกข้อมูลและตัวแปรที่เกี่ยวข้อง"},{t:"Data Transformation",why:"เป็นการสร้างตัวแปรใหม่หรือปรับสเกล"},{t:"Collect Initial Data",why:"เป็นกิจกรรมของขั้น Data Understanding"}], ans:0},
    {type:"choice", story:"จากตารางลูกค้า 40 คอลัมน์ ทีมหยิบมาเพียง 6 คอลัมน์ที่เกี่ยวกับโจทย์ และไม่ใช้ข้อมูลของพนักงานขาย", q:"เป็นขั้นย่อยใดของ Data Preparation", opts:[{t:"Data Transformation",why:"เป็นการแปลงรูปแบบหรือสเกลของข้อมูล"},{t:"Data Selection",why:"คัดเลือกข้อมูลและตัวแปรที่เกี่ยวกับวัตถุประสงค์"},{t:"Data Preprocessing",why:"เป็นการทำความสะอาดข้อมูล"},{t:"Describe Data",why:"เป็นกิจกรรมอธิบายลักษณะข้อมูลในขั้น Data Understanding"}], ans:1},
    {type:"choice", story:"อายุลูกค้าอยู่ระหว่าง 20 ถึง 60 ปี ทีมจะปรับให้อยู่ในช่วง -1 ถึง 1 ด้วย min-max normalization", q:"ลูกค้าอายุ 30 ปีจะได้ค่าเท่าใด", opts:[{t:"0.25",why:"เป็นค่าก่อนขยายสเกลเป็นช่วง -1 ถึง 1"},{t:"0.5",why:"ขยายสเกลแล้วแต่ลืมบวก new_min (-1)"},{t:"-0.5",why:"(30-20)/(60-20)=0.25 → ×2 = 0.5 → -1 = -0.5"},{t:"-0.25",why:"ไม่ตรงกับสูตร min-max"}], ans:2},
    {type:"choice", story:"ธนาคารเปลี่ยนอายุลูกค้าจากตัวเลขเป็นกลุ่ม \"ต่ำกว่า 30\", \"30-49\", \"50 ขึ้นไป\" ก่อนส่งเข้าโมเดล", q:"การแปลงนี้เรียกว่าอะไร", opts:[{t:"One-of-N coding",why:"แปลงตัวแปรหมวดหมู่เป็นรหัส 0/1 ทิศทางตรงข้าม"},{t:"Min-max normalization",why:"ปรับสเกลตัวเลขให้อยู่ในช่วงที่กำหนด"},{t:"Database Normalization",why:"เป็นการออกแบบตารางฐานข้อมูลเพื่อลดความซ้ำซ้อน"},{t:"Discretization",why:"แปลงตัวแปรเชิงปริมาณเป็นเชิงหมวดหมู่โดยแบ่งเป็นช่วง"}], ans:3},
    {type:"choice", story:"ประเภทเครื่องดื่ม ชา กาแฟ และโกโก้ ถูกแทนด้วยรหัส 100, 010 และ 001 ตามลำดับ เพื่อให้โมเดลรับได้", q:"วิธีแปลงนี้เรียกว่าอะไร", opts:[{t:"Discretization",why:"แปลงตัวเลขเป็นช่วง ทิศทางตรงข้ามกับกรณีนี้"},{t:"Min-max normalization",why:"ปรับสเกลของตัวเลขเท่านั้น"},{t:"One-of-N coding",why:"แปลงตัวแปรหมวดหมู่เป็นตัวเลขที่แต่ละหมวดมีหนึ่งหลักเป็น 1"},{t:"Outlier handling",why:"เป็นการจัดการค่าผิดปกติ"}], ans:2},
    {type:"choice", story:"ฝ่ายบุคคลมีใบสมัครเก่าที่เคยตัดสินไว้แล้วว่า \"ผ่าน\" หรือ \"ไม่ผ่าน\" อยากให้ระบบเรียนรู้จากตัวอย่างเหล่านั้นเพื่อตัดสินใบสมัครใหม่", q:"ควรใช้เทคนิคใด", opts:[{t:"Clustering",why:"จัดกลุ่มเองโดยไม่ต้องมีป้ายกำกับ"},{t:"Classification",why:"เรียนรู้จากข้อมูลที่ระบุคลาสไว้แล้วเพื่อจำแนกกลุ่มใหม่ (Supervised)"},{t:"Linear Regression",why:"ทำนายค่าตัวเลขต่อเนื่อง"},{t:"Associations Discovery",why:"หาสิ่งที่เกิดร่วมกัน"}], ans:1},
    {type:"choice", story:"บริษัทอสังหาริมทรัพย์มีข้อมูลบ้านที่ขายไปแล้ว (ขนาด ทำเล อายุ ราคา) ต้องการประเมินราคาบ้านหลังใหม่เป็นจำนวนเงิน", q:"เทคนิคใดเหมาะที่สุด", opts:[{t:"Linear Regression",why:"Value prediction ทำนายค่าตัวเลขจากตัวแปรนำเข้า"},{t:"Decision Tree",why:"ใช้จำแนกกลุ่ม (Classification) ไม่ใช่ทำนายตัวเลข"},{t:"Clustering",why:"จัดกลุ่มข้อมูลที่คล้ายกัน ไม่ได้ทำนายค่า"},{t:"Sequential Pattern Discovery",why:"หารูปแบบเหตุการณ์ตามลำดับเวลา"}], ans:0},
    {type:"choice", story:"ฟิตเนสมีข้อมูลสมาชิก 8,000 คนที่ยังไม่เคยมีใครแบ่งประเภทหรือตั้งชื่อกลุ่มไว้เลย อยากให้ระบบค้นหากลุ่มก้อนขึ้นมาเอง", q:"ควรใช้เทคนิคใด", opts:[{t:"Decision Tree",why:"ต้องมีคลาสกำหนดไว้ล่วงหน้าจึงจะเรียนรู้ได้"},{t:"Linear Regression",why:"ทำนายค่าตัวเลข ไม่ได้ค้นหากลุ่ม"},{t:"Associations Discovery",why:"หาความสัมพันธ์ของรายการที่เกิดร่วมกัน"},{t:"Clustering",why:"ค้นหากลุ่มที่คล้ายกันเองโดยไม่ต้องมีป้ายกำกับ (Unsupervised)"}], ans:3},
    {type:"choice", story:"แผนผังตัดสินใจถามทีละข้อ เช่น \"เป็นสมาชิกเกิน 2.5 ปีหรือไม่\" แล้วแตกกิ่งไปจนจบที่คำตอบ Stay หรือ Leave", q:"ส่วนปลายสุดที่แสดงคำตอบของแผนผังนี้เรียกว่าอะไร", opts:[{t:"Node",why:"Node คือจุดเงื่อนไขที่ใช้แตกกิ่ง ไม่ใช่ปลายสุด"},{t:"Hidden Layer",why:"เป็นศัพท์ของ Neural Network"},{t:"Segment",why:"เป็นศัพท์ของ Database Segmentation (Clustering)"},{t:"Leaf",why:"Leaf คือปลายสุดที่เป็นผลลัพธ์หรือคลาส"}], ans:3},
    {type:"choice", story:"จากบิลซูเปอร์มาร์เก็ต 1,000 ใบ มีขนมปัง 250 ใบ และมี 200 ใบที่มีทั้งขนมปังและเนย", q:"สำหรับกฎ ขนมปัง → เนย ค่า 80% (200 จาก 250) คือค่าใด", opts:[{t:"Support",why:"Support หารด้วยธุรกรรมทั้งหมด จะได้ 200/1,000 = 20%"},{t:"Confidence",why:"สัดส่วนของธุรกรรมที่มี X แล้วมี Y ด้วย"},{t:"Accuracy",why:"เป็นค่าวัดความถูกต้องของโมเดลทำนาย ไม่ใช่ค่าของ Association rule"},{t:"Normalization",why:"เป็นการปรับสเกลข้อมูล"}], ans:1},
    {type:"choice", story:"แอปสตรีมมิงพบว่าผู้ใช้ที่สมัครแพ็กเกจฟรีมักอัปเกรดเป็นพรีเมียมหลังผ่านไป 2-3 เดือน ต้องการหารูปแบบนี้", q:"ควรใช้เทคนิคใด", opts:[{t:"Sequential Pattern Discovery",why:"ค้นหารูปแบบเหตุการณ์ที่เกิดตามลำดับเวลา"},{t:"Associations Discovery",why:"หาสิ่งที่เกิดร่วมกัน ไม่เน้นลำดับเวลา"},{t:"Linear Regression",why:"ทำนายค่าตัวเลข"},{t:"Clustering",why:"จัดกลุ่มข้อมูลที่คล้ายกัน"}], ans:0},
    {type:"choice", story:"ร้านสะดวกซื้อวิเคราะห์ว่าสินค้าคู่ใดมักอยู่ในตะกร้าเดียวกัน และลูกค้าที่ซื้อสินค้าชิ้นหนึ่งแล้วมักกลับมาซื้อชิ้นต่อไปหลังจากผ่านไปกี่สัปดาห์", q:"สองงานนี้จัดอยู่ในกลุ่มโมเดลใดของ Modeling", opts:[{t:"Predictive Model",why:"กลุ่มนี้ประกอบด้วย Classification และ Value prediction"},{t:"Database Segmentation",why:"กลุ่มนี้คือ Clustering ที่จัดกลุ่มระเบียนคล้ายกัน"},{t:"Link Analysis",why:"รวม Associations Discovery และ Sequential Pattern Discovery"},{t:"Value Prediction",why:"เป็นเรื่องย่อยของ Predictive Model ที่ทำนายตัวเลข"}], ans:2},
    {type:"choice", story:"ทีมนำผลโมเดลมาตีความร่วมกับผู้เชี่ยวชาญธุรกิจว่าตอบเป้าหมายหรือไม่ แล้วทบทวนว่าขั้นก่อนหน้ามีข้อผิดพลาดตรงไหนก่อนตัดสินใจไปต่อ", q:"อยู่ในขั้นใดของ CRISP-DM", opts:[{t:"Modeling",why:"เป็นขั้นเลือกเทคนิคและสร้างโมเดล"},{t:"Deployment",why:"เป็นขั้นนำโมเดลไปใช้งานจริง"},{t:"Evaluation",why:"Interpret Results, Evaluate Model และ Review Process"},{t:"Data Preparation",why:"เป็นขั้นเตรียมข้อมูลก่อนสร้างโมเดล"}], ans:2},
    {type:"choice", story:"โมเดลที่ผ่านการทดสอบถูกเชื่อมเข้าระบบหน้าร้านจริง พร้อมตั้งการติดตามว่าความแม่นยำลดลงหรือไม่เมื่อพฤติกรรมลูกค้าเปลี่ยน", q:"อยู่ในขั้นใดของ CRISP-DM", opts:[{t:"Evaluation",why:"เป็นขั้นประเมินก่อนนำไปใช้จริง"},{t:"Deployment",why:"Deploy Model และ Monitor and Maintain"},{t:"Business Understanding",why:"เป็นขั้นแรกที่กำหนดเป้าหมาย"},{t:"Data Understanding",why:"เป็นขั้นสำรวจข้อมูล"}], ans:1},
    {type:"choice", story:"ทีมไอทีต้องการซอฟต์แวร์ Data Mining ที่ทำงานฝังอยู่ในระบบฐานข้อมูลโดยตรง ไม่ต้องดึงข้อมูลออกไปวิเคราะห์ข้างนอก", q:"ข้อใดเข้ากับลักษณะนี้", opts:[{t:"SAS Enterprise Miner",why:"เป็นซอฟต์แวร์กลุ่ม Statistical and Analytics ที่แยกจากฐานข้อมูล"},{t:"IBM SPSS Modeler",why:"เป็นซอฟต์แวร์กลุ่ม Statistical and Analytics ที่แยกจากฐานข้อมูล"},{t:"Oracle Data Mining",why:"เป็นซอฟต์แวร์กลุ่ม Database-integrated ที่ทำงานในฐานข้อมูล Oracle"},{t:"Tableau Desktop",why:"เป็นเครื่องมือทำภาพข้อมูลสำหรับ BI ไม่ใช่ซอฟต์แวร์ Data Mining ในบทนี้"}], ans:2},
    {type:"multi", story:"ทีมของโรงแรมแห่งหนึ่งเพิ่งได้รับข้อมูลลูกค้าและการจองมาจากหลายระบบ และยังไม่เริ่มสร้างโมเดลใดๆ", q:"เลือกทุกข้อที่เป็นกิจกรรมของขั้น Data Understanding", opts:[{t:"ดึงข้อมูลการจองจากระบบต่างๆ มารวมกัน",ok:true,why:"คือ Collect Initial Data"},{t:"สรุปจำนวนแถวและชนิดของตัวแปร",ok:true,why:"คือ Describe Data"},{t:"เติมค่าที่หายไปด้วยค่าเฉลี่ย",ok:false,why:"เป็น Data Preprocessing ในขั้น Data Preparation"},{t:"ทำกราฟดูความสัมพันธ์เบื้องต้นของตัวแปร",ok:true,why:"คือ Explore Data"},{t:"เลือกเฉพาะคอลัมน์ที่ใช้วิเคราะห์",ok:false,why:"เป็น Data Selection ในขั้น Data Preparation"}]},
    {type:"multi", story:"ทีมสร้างโมเดลทำนายลูกค้าเลิกใช้บริการเสร็จแล้ว และกำลังพิจารณาว่าผลที่ได้ใช้ได้จริงหรือไม่ก่อนตัดสินใจขั้นต่อไป", q:"เลือกทุกข้อที่เป็นกิจกรรมของขั้น Evaluation", opts:[{t:"ตีความว่าโมเดลพบแบบแผนอะไรในข้อมูล",ok:true,why:"คือ Interpret Results"},{t:"ย้อนตรวจว่าขั้นก่อนหน้ามีข้อผิดพลาดไหม",ok:true,why:"คือ Review Process"},{t:"ติดตามความแม่นยำของโมเดลที่ใช้งานอยู่",ok:false,why:"เป็น Monitor and Maintain ในขั้น Deployment"},{t:"เทียบคุณภาพโมเดลกับเป้าหมายธุรกิจ",ok:true,why:"คือ Evaluate Model and Results"},{t:"นำเสนอข้อค้นพบให้ผู้เกี่ยวข้องรับทราบ",ok:false,why:"เป็น Communicate Results ในขั้น Deployment"}]},
    {type:"blank", text:"CRISP-DM เรียงเป็น Business Understanding → {1} → Data Preparation → Modeling → {2} → Deployment", blanks:[{opts:["Data Warehousing","Data Understanding","Data Transformation","Data Selection"],ans:1,why:"ขั้นที่ 2 คือ Data Understanding"},{opts:["Monitoring","Review Process","Evaluation","Verification"],ans:2,why:"ขั้นที่ 5 คือ Evaluation ส่วน Review Process เป็นกิจกรรมย่อยของขั้นนี้"}]},
    {type:"blank", text:"Clustering หรือ Database Segmentation เป็น {1} Learning ส่วนค่า Support ของ Association rule คำนวณจากสัดส่วนของธุรกรรม {2}", blanks:[{opts:["Supervised","Unsupervised","Reinforcement","Transfer"],ans:1,why:"Clustering ไม่ต้องมีป้ายกำกับล่วงหน้า จึงเป็น Unsupervised"},{opts:["ที่มี X เท่านั้น","ทั้งหมด","ที่มี Y เท่านั้น","ที่ไม่มี X"],ans:1,why:"Support หารด้วยธุรกรรมทั้งหมด ส่วน Confidence หารด้วยธุรกรรมที่มี X"}]},
    {type:"match", q:"จับคู่ประเภทการทำเหมืองข้อมูลกับงานที่เหมาะสม", pairs:[["Web content mining","วิเคราะห์คำอธิบายสินค้าและรูปในหน้าเว็บ"],["Web structure mining","จัดอันดับหน้าจากการถูกหน้าอื่นอ้างถึง"],["Web usage mining","ดูเส้นทางคลิกก่อนลูกค้าออกจากเว็บ"],["Text Mining","สกัดประเด็นจากอีเมลร้องเรียน"]], why:"Content ทำกับเนื้อหาหน้าเว็บ, Structure กับลิงก์, Usage กับ log และ click, Text Mining กับข้อความไม่มีโครงสร้าง"}
  ]
});
