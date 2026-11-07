IOT.reg({
  id: "scm",
  title: "SCM & CRM (ระบบจัดการห่วงโซ่อุปทานและลูกค้าสัมพันธ์)",
  th: "Supply Chain Management, Bullwhip effect, Push/Pull และ Customer Relationship Management (Operational/Analytical CRM)",
  summary: `<h4>SCM: ระบบจัดการห่วงโซ่อุปทาน</h4><ul><li><b>Supply chain</b> = เครือข่ายองค์กร+กระบวนการ: จัดหาวัตถุดิบ → แปรรูป (Intermediate/Finished) → กระจายสินค้าให้ลูกค้า</li><li>Simple chain: Supplier → Manufacturer → Distributor/Wholesaler → Retailer → Customer; สินค้าอาจไหลย้อน (คืน/ซ่อม)</li><li>Nike: Tier 3 → Tier 2 → Tier 1 (Contract Supplier) → Nike → Distributor → Retailer → Customer</li><li><b>Upstream</b> = ฝั่งซัพพลายเออร์; <b>Downstream</b> = ฝั่งส่งมอบสู่ลูกค้า</li></ul><div class="must"><b>🔥 ปัญหาเมื่อไม่มี SCM</b><ul><li>1) ขาดข้อมูลที่ถูกต้องทันเวลา → วางแผนผิด, JIT ทำยาก (JIT = ของที่ต้องการ ในเวลา และปริมาณที่ต้องการ)</li><li>2) รับมือความไม่แน่นอนไม่ได้ → ถือ <b>Safety stock</b> แต่ต้นทุนจัดเก็บ/เงินทุน/ค้างสต็อก</li><li>3) <b>Bullwhip effect</b> = ความผันผวนของคำสั่งซื้อเพิ่มเมื่อย้อนจากลูกค้าไปต้นน้ำ (ตัวอย่าง P&amp;G ผ้าอ้อม; จำลอง 5→15 ทำให้สั่ง 100→500→2,500)</li></ul></div><ul><li>Bullwhip <b>สาเหตุ</b>: ความต้องการไม่แน่นอน / Lead time ไม่เท่ากัน / ไม่แชร์ข้อมูล; <b>ผล</b>: สินค้าขาด (เสียโอกาส) หรือเกิน (ต้นทุน); <b>แก้</b>: แชร์ข้อมูล, ใช้ Demand+Inventory ร่วมกัน, SCM แบบ Real-time</li><li><b>Planning systems</b>: จำลองห่วงโซ่, Demand planning, optimize sourcing/manufacturing, ระดับสต็อก+Safety stock, วางแผนขนส่ง; <b>Execution systems</b>: จัดการคำสั่งซื้อ/การเคลื่อนย้ายผ่าน DC+คลัง, ติดตามสถานะสินค้า/สต็อก/ขนส่ง</li><li><b>Push</b> (build-to-stock, forecast-driven) vs <b>Pull</b> (demand-driven, คำสั่งซื้อ/ยอดขายจริงกระตุ้น)</li><li>ประโยชน์ SCM: แก้ Bullwhip, ข้อมูล/สินค้าไหลเร็ว, JIT, Track shipments, เช็คสต็อก, ลดต้นทุนสต็อก/ขนส่ง/คลัง, วางแผนผลิตตามดีมานด์</li></ul><h4>CRM: ระบบบริหารความสัมพันธ์กับลูกค้า</h4><ul><li>ข้อมูลลูกค้ากระจายหลาย <b>Touch point</b> (Telephone, E-mail, Social, Website, Mobile App, ร้านปลีก); CRM บูรณาการข้อมูล → <b>Single Customer View</b></li><li><b>Customer Life Cycle</b>: Marketing (Attract) → Customer acquisition (Sell; Target→Prospect→Customer) → Relationship management (Support &amp; resell, Sell more) → Loss/Churn (Low/High-value; Win back)</li><li>มุมมอง CRM: Sales (โทรศัพท์/เว็บ/ร้าน/Field), Marketing (Campaign, Content, Data analysis), Service (Call center, Web self-service, Wireless)</li><li><b>ฟังก์ชัน</b>: <b>SFA</b> (โอกาสขาย, ใบเสนอราคา, พยากรณ์ยอดขาย), <b>Customer service</b> (จัดการคำร้อง, Self-service, Call center), <b>Marketing</b> (แคมเปญ e-mail, วิเคราะห์ข้อมูล)</li><li>Customer loyalty process: รับคำร้อง → ดึงข้อมูลลูกค้า → Score → ถ้า High value &amp; loyalty ให้ข้อเสนอ/บริการพิเศษ ไม่งั้น route to best agent</li></ul><div class="must"><b>🔥 ต้องจำ</b><ul><li><b>Operational CRM</b> = customer-facing (SFA, Call center, Marketing automation); <b>Analytical CRM</b> = วิเคราะห์ข้อมูลจาก data warehouse ด้วย OLAP/data mining</li><li><b>CLTV</b> = มูลค่าลูกค้าตลอดความสัมพันธ์ (รายได้ - ต้นทุนหา/บริการ, ระยะเวลาที่คาดไว้)</li><li><b>Churn rate</b> = สัดส่วนลูกค้าที่เลิกใช้ในช่วงเวลาหนึ่ง</li><li>คุณค่า CRM: พึงพอใจเพิ่ม, ลดค่าตลาดทางตรง, การตลาดมีประสิทธิภาพ, ลดต้นทุนหา/รักษาลูกค้า, รายได้เพิ่ม, ลด churn</li></ul></div>`,
  sections: [
    { t:"หัวข้อบท: SCM และ CRM", ref:"สไลด์ 1-2", html:`<p>บทนี้อยู่ในหัวข้อ <b>Achieving Operational Excellence &amp; Customer Intimacy: Enterprise Applications</b> หรือการใช้ระบบสารสนเทศระดับองค์กรเพื่อให้ธุรกิจดำเนินงานเป็นเลิศและใกล้ชิดลูกค้า มี 2 ระบบหลัก</p><ul><li><b>Supply Chain Management System (SCM)</b> ระบบจัดการห่วงโซ่อุปทาน (เน้นด้านผู้จัดหา/ผู้ผลิต/การกระจายสินค้า)</li><li><b>Customer Relationship Management System (CRM)</b> ระบบบริหารความสัมพันธ์กับลูกค้า (เน้นด้านลูกค้า)</li></ul>` },
    { t:"นิยามของ Supply Chain", ref:"สไลด์ 3", html:`<h4>Supply chain (ห่วงโซ่อุปทาน)</h4><p>คือ <b>เครือข่ายขององค์กรและกระบวนการทางธุรกิจต่างๆ</b> สำหรับ 3 กิจกรรมหลัก:</p><ol><li><b>การจัดหาวัตถุดิบ</b> (Procuring raw materials)</li><li><b>แปรรูปเป็นสินค้า</b> (Transforming them into products) แบ่งเป็น Intermediate product (สินค้าขั้นกลาง) และ Finished product (สินค้าสำเร็จรูป)</li><li><b>กระจายสินค้าให้ลูกค้า</b> (Distributing the finished products to customers)</li></ol><div class="dg"><div class="dgt">🖼️ Simple Supply Chain</div><svg viewBox="0 0 700 120"><rect class="bx hd" x="10" y="40" width="112" height="46" rx="6"/><text class="t sm" x="66" y="67" text-anchor="middle">Supplier</text><line class="ln" x1="122" y1="63" x2="146" y2="63"/><rect class="bx" x="146" y="40" width="112" height="46" rx="6"/><text class="t sm" x="202" y="67" text-anchor="middle">Manufacturer</text><line class="ln" x1="258" y1="63" x2="282" y2="63"/><rect class="bx" x="282" y="40" width="112" height="46" rx="6"/><text class="t sm" x="338" y="67" text-anchor="middle">Distributor</text><line class="ln" x1="394" y1="63" x2="418" y2="63"/><rect class="bx" x="418" y="40" width="112" height="46" rx="6"/><text class="t sm" x="474" y="67" text-anchor="middle">Retailer</text><line class="ln" x1="530" y1="63" x2="554" y2="63"/><rect class="bx" x="554" y="40" width="112" height="46" rx="6"/><text class="t sm" x="610" y="67" text-anchor="middle">Customer</text><text class="t sm" x="10" y="20">ต้นน้ำ (Upstream)</text><text class="t sm" x="690" y="20" text-anchor="end">ปลายน้ำ (Downstream)</text><text class="t sm" x="350" y="112" text-anchor="middle">วัตถุดิบ → ชิ้นส่วน → สินค้าสำเร็จรูป → ศูนย์กระจาย → ร้านปลีก → ลูกค้า</text></svg></div><div class="must"><b>🔥 ต้องจำ</b><ul><li>Simple Supply Chain: Supplier → Manufacturer → Distributor/Wholesaler → Retailer → Customer</li><li>Supply chain = เครือข่ายองค์กร + กระบวนการ ที่จัดหา แปรรูป และกระจายสินค้า</li></ul></div>` },
    { t:"การไหลของสินค้าในห่วงโซ่อุปทาน", ref:"สไลด์ 4", html:`<p>ห่วงโซ่อุปทานเชื่อมโยง <b>ผู้จัดหาวัตถุดิบ ผู้ผลิต ผู้กระจายสินค้า ร้านค้าปลีก และลูกค้า</b> เพื่อส่งมอบสินค้าและบริการจากแหล่งต้นทางไปสู่ผู้บริโภค</p><p>ลำดับการไหล: <b>Raw Materials → Intermediate Products/Components → Finished Products → Distributor → Retailer → Customer</b></p><ul><li>การผลิตเริ่มจากวัตถุดิบ แปรรูปเป็นสินค้าขั้นกลาง (ส่วนประกอบหรือชิ้นส่วน) และสุดท้ายเป็นผลิตภัณฑ์สำเร็จรูป แล้วส่งไปศูนย์กระจายสินค้า และกระจายต่อไปยังร้านค้าปลีกและลูกค้า</li><li>สินค้า<b>อาจไหลย้อนกลับ</b>จากลูกค้าเข้าสู่ห่วงโซ่ได้ เช่น การคืนสินค้า การซ่อมแซม</li></ul>` },
    { t:"Supply Chain Network (เครือข่ายหลายราย)", ref:"สไลด์ 5", html:`<p>ในความเป็นจริงห่วงโซ่ไม่ได้เป็นเส้นตรงเส้นเดียว แต่เป็น <b>เครือข่าย</b> ที่แต่ละระดับมีหลายราย และเชื่อมกันหลายเส้นทาง</p><ul><li>Supplier 1-2 ส่งวัตถุดิบให้ Manufacturer 1-2 (ผู้ผลิตแต่ละรายซื้อได้จากหลายซัพพลายเออร์)</li><li>Manufacturer ส่งสินค้าด้วยรถบรรทุกไปยัง Distributor 1-3 (ผู้จัดจำหน่าย)</li><li>Distributor ส่งต่อไปยัง Retailer 1-3 (ผู้ค้าปลีก) และสุดท้ายถึง Customer 1-3</li></ul><div class="note"><b>💡 หมายเหตุ</b> ยิ่งเครือข่ายมีหลายราย หลายเส้นทาง ยิ่งต้องประสานข้อมูลกันมาก จึงต้องมีระบบ SCM ช่วย</div>` },
    { t:"ตัวอย่าง: Nike's Supply Chain และ Upstream/Downstream", ref:"สไลด์ 6-7", html:`<p>แผนภาพ Nike แสดงโครงสร้างห่วงโซ่ของ Nike: ซ้ายสุดคือ <b>Tier 3 Suppliers → Tier 2 Suppliers → Tier 1 Suppliers (Contract Supplier)</b> แล้วจึงถึง Nike → Distributor → Retailer → Customer โดยลูกศรเป็นสองทิศทาง แสดงว่าข้อมูลไหลทั้งไปและกลับ</p><ul><li>ระหว่าง Contract Supplier กับ Nike: ไหลข้อมูล <b>Capacity, inventory level, delivery schedule, payment terms</b></li><li>ระหว่าง Nike-Distributor-Retailer-Customer: ไหล <b>Orders, return requests, repair and service requests, payments</b></li></ul><h4>Upstream vs Downstream</h4><table><tr><th>ส่วน</th><th>ความหมาย</th></tr><tr><td><b>Upstream supply chain (ห่วงโซ่ต้นน้ำ)</b></td><td>ซัพพลายเออร์ของบริษัท คู่ค้าของซัพพลายเออร์ และกระบวนการต่างๆ ที่เกี่ยวข้องกับการจัดการความสัมพันธ์กับซัพพลายเออร์เหล่านั้น</td></tr><tr><td><b>Downstream supply chain (ห่วงโซ่ปลายน้ำ)</b></td><td>องค์กรและกระบวนการต่างๆ ที่เกี่ยวข้องกับการส่งมอบสินค้าและบริการไปให้ถึงลูกค้า</td></tr></table><div class="must"><b>🔥 ต้องจำ</b><ul><li>Upstream = ฝั่งซัพพลายเออร์; Downstream = ฝั่งส่งมอบสู่ลูกค้า</li><li>Tier 1 ติดบริษัท (Contract Supplier) ส่วน Tier 2, Tier 3 อยู่ไกลต้นน้ำออกไปตามลำดับ</li></ul></div>` },
    { t:"ปัญหาเมื่อไม่มี SCM (1): ขาดข้อมูลที่ถูกต้องทันเวลา", ref:"สไลด์ 8", html:`<h4>ปัญหาที่พบใน Supply Chain เมื่อไม่มี SCM System</h4><p><b>1) การขาดข้อมูลและสารสนเทศที่ถูกต้องและทันเวลา</b> ทำให้การวางแผนและประสานงานในห่วงโซ่ทำได้ยาก ส่งผลให้เกิดปัญหา เช่น</p><ul><li>ผู้ผลิตอาจไม่ทราบว่าซัพพลายเออร์จัดส่งวัตถุดิบได้เมื่อใดและจำนวนเท่าใด ทำให้วางแผนผลิตไม่แม่นยำ ผลิตสินค้าล่าช้าตามไปด้วย</li><li>การบริหารไม่มีประสิทธิภาพ เช่น วัตถุดิบไม่เพียงพอต่อการผลิต ใช้เครื่องจักรไม่เต็มประสิทธิภาพ และต้นทุนการขนส่งสูง</li></ul><p>ผลลัพธ์: <b>Just-in-time (JIT) strategies are difficult to implement effectively.</b></p><div class="must"><b>🔥 ต้องจำ</b><ul><li><b>Just-in-time (JIT)</b> ระบบการผลิตแบบทันเวลาพอดี: ผลิตหรือส่งมอบ <b>สิ่งที่ต้องการ ในเวลาที่ต้องการ ในปริมาณที่ต้องการ</b></li><li>JIT ช่วยให้วัตถุดิบและส่วนประกอบถูกส่งเข้ามาตรงเวลาและปริมาณเหมาะสม เพื่อ <b>ลดสินค้าคงคลัง</b> และลดความสูญเปล่า เมื่อสินค้าเสร็จก็ส่งต่อให้ลูกค้าทันที</li></ul></div>` },
    { t:"ปัญหาเมื่อไม่มี SCM (2): ความไม่แน่นอน และ Safety Stock", ref:"สไลด์ 9", html:`<p><b>2) ไม่สามารถรับมือกับความไม่แน่นอนใน Supply Chain ได้อย่างมีประสิทธิภาพ</b></p><ul><li>เช่น ปริมาณความต้องการสินค้าของลูกค้าไม่แน่นอน, การรับวัตถุดิบบางครั้งล่าช้าไม่ตรงเวลา, วัตถุดิบมีตำหนิ, กระบวนการผลิตขัดข้อง</li><li>ผู้ผลิตจึงเพิ่ม <b>สินค้าคงคลัง</b> เพื่อรองรับความไม่แน่นอนและลดความเสี่ยงจากสินค้าขาดแคลน ให้ตอบสนองลูกค้าได้ตามจำนวนและเวลา</li></ul><div class="warn"><b>⚠️ ระวัง</b> การถือสินค้าคงคลังมากเกินจำเป็นทำให้เกิดต้นทุน เช่น <b>ต้นทุนการจัดเก็บ ต้นทุนเงินทุน และความเสี่ยงจากสินค้าค้างสต็อก</b></div><div class="must"><b>🔥 ต้องจำ</b><ul><li>วิธีทั่วไป (Common Approach) = <b>Safety Stock (สินค้าคงคลังสำรอง)</b></li></ul></div>` },
    { t:"ปัญหาเมื่อไม่มี SCM (3): Bullwhip Effect", ref:"สไลด์ 10", html:`<p><b>3) Bullwhip effect (ปรากฏการณ์แส้ม้า)</b> ภาพประกอบคือแส้ที่สะบัดเล็กๆ ที่ด้ามแล้วปลายแส้สะบัดแรงมาก</p><ul><li>คือปรากฏการณ์ที่ <b>ความแปรปรวนของปริมาณคำสั่งซื้อเพิ่มขึ้นเมื่อเคลื่อนจากลูกค้าไปยังผู้ผลิตและซัพพลายเออร์</b> ในห่วงโซ่</li><li>ข้อมูลความต้องการของลูกค้า<b>บิดเบือน</b>เมื่อถูกส่งต่อระหว่างสมาชิก ทำให้คำสั่งซื้อแต่ละระดับไม่สะท้อนความต้องการที่แท้จริงของลูกค้า</li><li>เมื่อสมาชิกเห็นคำสั่งซื้อเพิ่มขึ้น อาจคาดว่าความต้องการจะเพิ่มต่อเนื่อง จึงสั่งซื้อและกักตุนเพิ่ม ส่งผลให้ความผันผวนของคำสั่งซื้อขยายตัวมากขึ้นเมื่อย้อนกลับไปทางต้นน้ำ</li></ul><div class="note"><b>💡 ตัวอย่าง P&amp;G</b> พบว่าคำสั่งซื้อผ้าอ้อมจากผู้ค้าปลีกผันผวนมากกว่าความต้องการซื้อจริงของผู้บริโภค เมื่อสต็อกลดต่ำกว่าระดับหนึ่ง ผู้ค้าปลีกอาจสั่งเพิ่มมากเพื่อป้องกันสินค้าขาด ส่งผลให้ความผันผวนเพิ่มในแต่ละระดับของห่วงโซ่</div>` },
    { t:"แบบจำลอง Bullwhip: ตัวเลขทีละวัน", ref:"สไลด์ 11-18", html:`<p>สไลด์ชุดนี้เป็นแอนิเมชันจำลองห่วงโซ่ <b>Supplier ← Manufacturer ← Distributor ← Retailer ← Customer</b> โดยกำหนด <b>Lead time (LT)</b>: Manufacturer LT = 3 วัน, Distributor LT = 2 วัน (ลูกศรเหลืองคือคำสั่งซื้อย้อนต้นน้ำ ลูกศรเขียวคือสินค้าที่ส่งมา)</p><table><tr><th>ขั้น</th><th>เหตุการณ์</th></tr><tr><td>เริ่มต้น (วันที่ 1)</td><td>สต็อก Manufacturer 40, Distributor 20, Retailer 10</td></tr><tr><td>เย็นวันที่ 1</td><td>ลูกค้าซื้อ 5 ชิ้น: Retailer 10-5 = 5 ; Distributor 20-20 = 0 (ส่งให้ร้านปลีก ไปถึงวันที่ 3 = 20) ; ยังไม่รู้ว่าวันที่ 2 ลูกค้าจะซื้อเท่าไร (?)</td></tr><tr><td>วันที่ 2</td><td>ลูกค้าซื้อ <b>15 ชิ้น</b> (เพิ่มจาก 5): Retailer 5-15 = <b>-10</b> (ขาดสต็อก) ; Manufacturer 40-50 = -10 (สั่งวัตถุดิบ 500)</td></tr><tr><td>เย็นวันที่ 2</td><td>Retailer ติดลบ -10 จึง <b>สั่งเพิ่ม 100</b> ; Distributor 0-100 = -100 จึง <b>สั่งเพิ่ม 500</b> ; Manufacturer -10-500 = -510 จึง <b>สั่งวัตถุดิบเพิ่ม 2,500</b></td></tr></table><div class="dg"><div class="dgt">🖼️ Bullwhip: ยอดสั่งซื้อวันที่ 2 ขยายตัวย้อนต้นน้ำ</div><svg viewBox="0 0 700 130"><rect class="bx" x="10" y="30" width="150" height="40" rx="6"/><text class="t sm" x="85" y="54" text-anchor="middle">Customer</text><text class="t b" x="85" y="100" text-anchor="middle">15</text><line class="ln bad" x1="160" y1="50" x2="180" y2="50"/><rect class="bx" x="180" y="30" width="150" height="40" rx="6"/><text class="t sm" x="255" y="54" text-anchor="middle">Retailer</text><text class="t b" x="255" y="100" text-anchor="middle">100</text><line class="ln bad" x1="330" y1="50" x2="350" y2="50"/><rect class="bx" x="350" y="30" width="150" height="40" rx="6"/><text class="t sm" x="425" y="54" text-anchor="middle">Distributor</text><text class="t b" x="425" y="100" text-anchor="middle">500</text><line class="ln bad" x1="500" y1="50" x2="520" y2="50"/><rect class="bx" x="520" y="30" width="150" height="40" rx="6"/><text class="t sm" x="595" y="54" text-anchor="middle">Manufacturer</text><text class="t b" x="595" y="100" text-anchor="middle">2500</text><text class="t sm" x="350" y="122" text-anchor="middle">ลูกค้าซื้อ 15 → ร้านปลีกสั่ง 100 → ผู้จัดจำหน่ายสั่ง 500 → ผู้ผลิตสั่งวัตถุดิบ 2,500</text></svg></div><p>ภาพในสไลด์ 18 มีรูปการ์ตูนก้อนอิฐด้วย: ผู้ขายแต่ละระดับ (Retailer, Tier 1/2/3 Supplier) ต่างถามว่า <b>"Demand?"</b> แล้วเก็บ Inventory (กองอิฐ) ไว้ต่างกัน เส้นกราฟฝั่ง upstream สวิงกว้างมาก ส่วนฝั่ง downstream ใกล้ลูกค้าสวิงน้อย (Demand Variability)</p><div class="must"><b>🔥 ต้องจำ</b><ul><li>ความต้องการจริงเปลี่ยนแค่ 5 → 15 แต่คำสั่งซื้อต้นน้ำพุ่งเป็น 100 → 500 → 2,500</li><li>ยิ่งไกลจากลูกค้า (upstream) ความผันผวน (variability) ยิ่งสูง</li></ul></div>` },
    { t:"THE BULLWHIP EFFECT: ภาพรวมห่วงโซ่", ref:"สไลด์ 19", html:`<p>แผนภาพเหมือนห่วงโซ่ Nike แต่เปลี่ยนเป็น Tier 3 → Tier 2 → Tier 1 Suppliers → <b>Manufacturer → Distributor → Retailer → Customer</b> ด้านล่างมีกราฟยอดคำสั่งซื้อรูปยอดแหลม 2 ลูกที่ <b>สูงมากที่ Tier 3 และเตี้ยลงเรื่อยๆ จนเกือบเรียบที่ Customer</b></p><ul><li>ข้อมูลเกี่ยวกับความต้องการของลูกค้าที่ไม่ถูกต้องหรือไม่ทันเวลา ทำให้แต่ละสมาชิกคาดการณ์ความต้องการแตกต่างกัน และปรับปริมาณสั่งซื้อเพื่อรองรับความไม่แน่นอน</li><li>ส่งผลให้ความผันผวนของคำสั่งซื้อเพิ่มขึ้นเมื่อเคลื่อนย้อนกลับจากลูกค้าไปยังผู้จัดจำหน่าย ผู้ผลิต และซัพพลายเออร์ ซึ่งอาจทำให้เกิดสินค้าคงคลังมากหรือน้อยเกินความต้องการ และเพิ่มต้นทุนในการบริหารห่วงโซ่อุปทาน</li></ul>` },
    { t:"Bullwhip Effect: สาเหตุ ผลกระทบ และแนวทางแก้ไข", ref:"สไลด์ 20", html:`<p><b>นิยาม:</b> ความผันผวนของคำสั่งซื้อเพิ่มขึ้นเมื่อเคลื่อนย้อนจากลูกค้าไปยังผู้ค้าปลีก ผู้จัดจำหน่าย ผู้ผลิต และซัพพลายเออร์ ส่งผลให้เกิดสินค้าขาดแคลนหรือสินค้าคงคลังมากเกินต้องการ</p><table><tr><th>หมวด</th><th>รายละเอียด</th></tr><tr><td><b>สาเหตุ</b></td><td><ul><li>ความต้องการของลูกค้าไม่แน่นอน ทำให้พยากรณ์ไม่แม่นยำ</li><li><b>Lead time</b> การส่งไม่เท่ากัน</li><li><b>ไม่มีการแชร์ข้อมูลกัน</b> แต่ละหน่วยงานต่างวางแผนและตัดสินใจเอง ไม่ประสานงานเป็นทีม</li></ul></td></tr><tr><td><b>ผลกระทบ</b></td><td><ul><li><b>สินค้าขาด:</b> เสียโอกาสในการขาย อาจสูญเสียลูกค้า</li><li><b>สินค้าเกิน:</b> ต้องจัดเก็บเพิ่ม ต้นทุนเพิ่มขึ้น</li></ul></td></tr><tr><td><b>แก้ไข</b></td><td><ul><li>แลกเปลี่ยนข้อมูลระหว่างสมาชิกใน Supply Chain</li><li>ใช้ข้อมูล <b>Demand และ Inventory</b> ร่วมกันในการวางแผนและพยากรณ์ความต้องการของลูกค้า</li><li>ใช้ <b>SCM System</b> เพื่อสนับสนุนการแชร์ข้อมูลและการตัดสินใจแบบ <b>Real-time</b></li></ul></td></tr></table><div class="must"><b>🔥 ต้องจำ</b><ul><li>สาเหตุ 3 ข้อ: ความต้องการไม่แน่นอน / Lead time ไม่เท่ากัน / ไม่แชร์ข้อมูล</li><li>ผลกระทบ 2 ด้าน: สินค้าขาด vs สินค้าเกิน</li><li>ทางแก้: แชร์ข้อมูล + ใช้ Demand/Inventory ร่วมกัน + SCM แบบ Real-time</li></ul></div>` },
    { t:"ฟังก์ชันของซอฟต์แวร์ SCM", ref:"สไลด์ 21", html:`<p>ซอฟต์แวร์ SCM แบ่งเป็น 2 กลุ่มหลัก</p><table><tr><th>ระบบ</th><th>หน้าที่</th></tr><tr><td><b>Supply chain planning systems (ระบบวางแผนห่วงโซ่อุปทาน)</b></td><td><ul><li>สร้างแบบจำลองห่วงโซ่อุปทานที่มีอยู่ (Model the existing supply chain)</li><li>วางแผนความต้องการ (Demand planning)</li><li>วางแผนการจัดหาและการผลิตให้เหมาะสมที่สุด (Optimize sourcing and manufacturing plans)</li><li>กำหนดระดับสินค้าคงคลังและ Safety Stock ที่เหมาะสม</li><li>วางแผนการขนส่งและเลือกวิธีการขนส่ง (Plan transportation and identify transportation modes)</li></ul></td></tr><tr><td><b>Supply chain execution systems (ระบบปฏิบัติการห่วงโซ่อุปทาน)</b></td><td><ul><li>จัดการคำสั่งซื้อและการเคลื่อนย้ายสินค้าผ่านศูนย์กระจายสินค้าและคลังสินค้า</li><li>ติดตามสถานะสินค้า สินค้าคงคลัง การดำเนินงานในคลังสินค้า และการขนส่ง</li></ul></td></tr></table><div class="warn"><b>⚠️ ระวัง</b> Planning = วางแผน/พยากรณ์ล่วงหน้า (ก่อนทำ) ส่วน Execution = ลงมือจัดการและติดตามสถานะจริง (ขณะทำ)</div>` },
    { t:"Push-based vs Pull-based Model", ref:"สไลด์ 22-23", html:`<h4>จาก Push สู่ Pull (Demand-Driven Supply Chains)</h4><table><tr><th>โมเดล</th><th>ลักษณะ</th></tr><tr><td><b>Push-based model (build-to-stock)</b> การผลิตเพื่อจัดเก็บ</td><td><ul><li>ผลิตตามการ<b>คาดการณ์ความต้องการ</b> (Forecast-driven)</li><li>กำหนดตารางการผลิตจากการพยากรณ์</li><li>ผลิตสินค้าล่วงหน้าและเก็บเป็นสินค้าคงคลังเพื่อรอความต้องการ</li></ul></td></tr><tr><td><b>Pull-based model (demand-driven)</b> ผลิตหรือเติมสินค้าโดยมีความต้องการจริงเป็นตัวขับเคลื่อน</td><td><ul><li>ความต้องการจริงของลูกค้าเป็นตัวกระตุ้นการเติมสินค้า การผลิต และกิจกรรมในห่วงโซ่</li><li>ข้อมูลจากความต้องการจริง เช่น <b>คำสั่งซื้อหรือยอดขาย</b> ถูกนำมาเป็นตัวกระตุ้นการผลิตหรือการเติมสินค้า</li></ul></td></tr></table><div class="dg"><div class="dgt">🖼️ Push vs Pull</div><svg viewBox="0 0 700 250"><text class="t b" x="10" y="18">Push-Based: ผลิตตามพยากรณ์ (ลูกศรไปทางลูกค้า)</text><rect class="bx" x="10" y="30" width="112" height="40" rx="6"/><text class="t sm" x="66" y="54" text-anchor="middle">Supplier</text><rect class="bx hd" x="10" y="150" width="112" height="40" rx="6"/><text class="t sm" x="66" y="174" text-anchor="middle">Supplier</text><line class="ln" x1="122" y1="50" x2="146" y2="50"/><line class="ln ok" x1="146" y1="170" x2="122" y2="170"/><rect class="bx" x="146" y="30" width="112" height="40" rx="6"/><text class="t sm" x="202" y="54" text-anchor="middle">Manufacturer</text><rect class="bx hd" x="146" y="150" width="112" height="40" rx="6"/><text class="t sm" x="202" y="174" text-anchor="middle">Manufacturer</text><line class="ln" x1="258" y1="50" x2="282" y2="50"/><line class="ln ok" x1="282" y1="170" x2="258" y2="170"/><rect class="bx" x="282" y="30" width="112" height="40" rx="6"/><text class="t sm" x="338" y="54" text-anchor="middle">Distributor</text><rect class="bx hd" x="282" y="150" width="112" height="40" rx="6"/><text class="t sm" x="338" y="174" text-anchor="middle">Distributor</text><line class="ln" x1="394" y1="50" x2="418" y2="50"/><line class="ln ok" x1="418" y1="170" x2="394" y2="170"/><rect class="bx" x="418" y="30" width="112" height="40" rx="6"/><text class="t sm" x="474" y="54" text-anchor="middle">Retailer</text><rect class="bx hd" x="418" y="150" width="112" height="40" rx="6"/><text class="t sm" x="474" y="174" text-anchor="middle">Retailer</text><line class="ln" x1="530" y1="50" x2="554" y2="50"/><line class="ln ok" x1="554" y1="170" x2="530" y2="170"/><rect class="bx" x="554" y="30" width="112" height="40" rx="6"/><text class="t sm" x="610" y="54" text-anchor="middle">Customer</text><rect class="bx hd" x="554" y="150" width="112" height="40" rx="6"/><text class="t sm" x="610" y="174" text-anchor="middle">Customer</text><text class="t sm" x="10" y="90">Supply to forecast → Production based on forecasts → Inventory based on forecasts → Stock based on forecasts → Purchase what is on shelves</text><text class="t b" x="10" y="138">Pull-Based: คำสั่งซื้อจริงดึงย้อนกลับ (ลูกศรไปทางซัพพลายเออร์)</text><text class="t sm" x="10" y="215">Customer orders → Automatically replenish stock → Automatically replenish warehouse → Produce to order → Supply to order</text></svg></div><p>Figure 9.4: ใน Push ทุกระดับทำตามพยากรณ์ แล้วลูกค้า "ซื้อสิ่งที่มีบนชั้น"; ใน Pull ลูกค้าสั่งก่อน ร้านค้าเติมสต็อกอัตโนมัติ ศูนย์กระจายเติมคลังอัตโนมัติ ผู้ผลิต "ผลิตตามสั่ง" และซัพพลายเออร์ "ส่งวัตถุดิบตามสั่ง"</p><div class="must"><b>🔥 ต้องจำ</b><ul><li>Push = build-to-stock, forecast-driven; Pull = demand-driven, ผลิตตามคำสั่งซื้อจริง</li></ul></div>` },
    { t:"ประโยชน์ของระบบ SCM", ref:"สไลด์ 24", html:`<p>SCM System ให้ <b>ข้อมูลและเครื่องมือที่ช่วยให้สมาชิกในห่วงโซ่วางแผน ประสานงาน และตัดสินใจอย่างมีประสิทธิภาพ</b> ประโยชน์ 7 ข้อ:</p><ol><li>แก้ปัญหาปรากฏการณ์แส้ม้า (Bullwhip)</li><li>เพิ่มความรวดเร็วในการไหลของข้อมูลและสินค้า</li><li>สนับสนุนการผลิตและจัดส่งแบบ <b>Just-In-Time (JIT)</b></li><li>ติดตามสถานะและความคืบหน้าการจัดส่ง (Track shipments)</li><li>ตรวจสอบความพร้อมและติดตามระดับสินค้าคงคลัง (Check inventory availability and monitor inventory levels)</li><li>ลดสินค้าคงคลังและต้นทุนที่เกี่ยวกับการขนส่งและการจัดเก็บ (Reduce inventory, transportation, and warehousing costs)</li><li>วางแผนการผลิตโดยพิจารณาจากความต้องการของลูกค้าและข้อมูลใน Supply Chain</li></ol>` },
    { t:"CRM: รู้จักลูกค้า, Touch Point และ Single Customer View", ref:"สไลด์ 25-26", html:`<h4>Know the Customer (รู้จักลูกค้า)</h4><p>ในธุรกิจขนาดใหญ่ ลูกค้ามีจำนวนมากและใช้หลายช่องทางติดต่อบริษัท เช่น Web, E-mail, Telephone, Social Media ทำให้ข้อมูลลูกค้ากระจายอยู่หลายช่องทาง จึงรวบรวมและจัดการได้ยาก</p><div class="must"><b>🔥 ต้องจำ</b><ul><li><b>Touch Point / Contact Point (จุดติดต่อลูกค้า)</b> = จุดหรือช่องทางที่ลูกค้ามีปฏิสัมพันธ์กับองค์กร เช่น Telephone, E-mail, Social Media, Website, Mobile App และร้านค้าปลีก</li><li><b>CRM systems</b> = ระบบบริหารความสัมพันธ์กับลูกค้า: <b>บูรณาการข้อมูลลูกค้า</b>จากทั่วองค์กร หลายช่องทาง หลายหน่วยงานไว้ด้วยกัน รวบรวมและวิเคราะห์ข้อมูล แล้วกระจายสารสนเทศไปยังส่วนที่เกี่ยวข้อง</li><li><b>Single Customer View</b> = ทั้งองค์กรมองเห็น/รู้จักลูกค้าในมุมมองเดียวกัน เป็นประโยชน์ต่อการเพิ่มยอดขายและการบริการ</li></ul></div>` },
    { t:"Customer Life Cycle", ref:"สไลด์ 27", html:`<p>แผนภาพวงจรชีวิตลูกค้า แบ่งเป็น 4 ช่วงตามลูกศรด้านบน:</p><table><tr><th>ช่วง</th><th>ความหมาย</th></tr><tr><td><b>Marketing</b> (Attract)</td><td>ดึงดูดกลุ่มเป้าหมาย (Target)</td></tr><tr><td><b>Customer acquisition</b> (Sell)</td><td>เปลี่ยน Prospect (ลูกค้าที่คาดหวัง) เป็น Customer</td></tr><tr><td><b>Relationship management</b> (Support and resell)</td><td>ดูแลและขายเพิ่ม (Sell more) ให้ลูกค้าปัจจุบัน</td></tr><tr><td><b>Loss/Churn</b> (Categorize)</td><td>ลูกค้าที่หลุดไปแบ่งเป็น Low-value customers และ High-value customers; กลุ่ม High-value จะพยายาม <b>Win back</b> (ดึงกลับ)</td></tr></table><div class="dg"><div class="dgt">🖼️ Customer Life Cycle</div><svg viewBox="0 0 700 150"><rect class="bx hd" x="10" y="30" width="155" height="44" rx="6"/><text class="t sm" x="87.5" y="56" text-anchor="middle">Marketing</text><text class="t sm" x="87" y="96" text-anchor="middle">Attract</text><line class="ln" x1="165" y1="52" x2="185" y2="52"/><rect class="bx hd" x="185" y="30" width="155" height="44" rx="6"/><text class="t sm" x="262.5" y="56" text-anchor="middle">Customer acquisition</text><text class="t sm" x="262" y="96" text-anchor="middle">Sell</text><line class="ln" x1="340" y1="52" x2="360" y2="52"/><rect class="bx hd" x="360" y="30" width="155" height="44" rx="6"/><text class="t sm" x="437.5" y="56" text-anchor="middle">Relationship mgmt</text><text class="t sm" x="437" y="96" text-anchor="middle">Support &amp; resell</text><line class="ln" x1="515" y1="52" x2="535" y2="52"/><rect class="bx hd" x="535" y="30" width="155" height="44" rx="6"/><text class="t sm" x="612.5" y="56" text-anchor="middle">Loss / Churn</text><text class="t sm" x="612" y="96" text-anchor="middle">Categorize</text><text class="t sm" x="350" y="130" text-anchor="middle">Target → Prospect → Customer (Sell more) → Low-value / High-value → Win back</text></svg></div><p>กระบวนการด้านล่าง: <b>Solicitation processes</b> (ช่วง Target), <b>Lead-Tracking processes</b> (ช่วง Prospect), <b>Relationship Management processes</b> (ช่วง Customer ถึง Churn/Win back)</p>` },
    { t:"CRM Application: มุมมองหลายด้าน", ref:"สไลด์ 28", html:`<p>CRM พิจารณาลูกค้าจากหลายมุมมอง ใช้ชุดแอปพลิเคชันที่บูรณาการกันเพื่อรับมือทุกด้านของความสัมพันธ์กับลูกค้า ได้แก่ การบริการลูกค้า การขาย และการตลาด โดยมี <b>Customer อยู่ตรงกลาง</b> ของวงกลมแบ่ง 3 ส่วน</p><table><tr><th>ด้าน</th><th>ข้อมูลที่เกี่ยวข้อง</th></tr><tr><td>1 Sales</td><td>Telephone sales, Web sales, Retail store sales, Field sales</td></tr><tr><td>2 Marketing</td><td>Campaign data, Content, Data analysis</td></tr><tr><td>3 Service</td><td>Call center data, Web self-service data, Wireless data</td></tr></table><div class="note"><b>💡 หมายเหตุ</b> ระบบ CRM ควรมีเครื่องมือวิเคราะห์ข้อมูลลูกค้าเพื่อช่วยตอบคำถาม เช่น: ใครคือลูกค้าที่ซื่อสัตย์? ลูกค้ากลุ่มใดสร้างรายได้/กำไรมากที่สุด? ลูกค้าต้องการสินค้าหรือบริการแบบใด? ลูกค้ากลุ่มใดมีแนวโน้มเลิกใช้บริการ?</div>` },
    { t:"ฟังก์ชันของซอฟต์แวร์ CRM (SFA / Service / Marketing)", ref:"สไลด์ 29", html:`<p>CRM packages มักประกอบด้วยเครื่องมือ 3 ด้าน</p><table><tr><th>ด้าน</th><th>หน้าที่</th><th>ตัวอย่าง (E.g.)</th></tr><tr><td><b>Sales Force Automation (SFA)</b> งานขายแบบอัตโนมัติ</td><td>เพิ่มประสิทธิภาพพนักงานขาย โดยสนับสนุนการจัดการโอกาสการขาย ข้อมูลลูกค้า และกิจกรรมการขาย</td><td>จัดการโอกาสขายและข้อมูลการติดต่อ เข้าถึงข้อมูลผลิตภัณฑ์ คำนวณราคาและสร้างใบเสนอราคา รวบรวมประวัติการซื้อเพื่อแนะนำสินค้าเหมาะสม และพยากรณ์ยอดขาย</td></tr><tr><td><b>Customer service</b> การบริการลูกค้า</td><td>ให้ข้อมูลและเครื่องมือเพิ่มประสิทธิภาพศูนย์บริการ ศูนย์รับแจ้งปัญหา และเจ้าหน้าที่ฝ่ายบริการลูกค้า</td><td>มอบหมายและจัดการคำร้องขอบริการ บริการผ่านเว็บแบบ Self-Service เพิ่มประสิทธิภาพ Call Center</td></tr><tr><td><b>Marketing</b> การตลาด</td><td>สนับสนุนการโฆษณาและการตลาดทางตรง รวมถึงการวิเคราะห์ข้อมูลลูกค้า</td><td>จัดการข้อมูลลูกค้า จัดตารางเวลาและติดตามแคมเปญการตลาดผ่าน e-mail วิเคราะห์ข้อมูลตลาดและข้อมูลลูกค้า</td></tr></table>` },
    { t:"CRM Software Capabilities", ref:"สไลด์ 30", html:`<p>ซอฟต์แวร์ CRM ที่สำคัญเน้นสนับสนุนกระบวนการทางธุรกิจด้านการขาย การบริการ และการตลาด โดย<b>บูรณาการข้อมูลลูกค้า (Customer Data) จากแหล่งที่แตกต่างกัน</b> เพื่อสนับสนุนทั้งการปฏิบัติงาน (Operational) และการวิเคราะห์ (Analytical)</p><p>แผนภาพ: ข้อมูลลูกค้า (Customer Data) อยู่บนสุด แตกเป็น 3 คอลัมน์ ได้แก่</p><table><tr><th>Sales</th><th>Marketing</th><th>Service</th></tr><tr><td>Account Management</td><td>Campaign Management</td><td>Service Delivery</td></tr><tr><td>Lead Management</td><td>Channel Promotions Management</td><td>Customer Satisfaction Management</td></tr><tr><td>Order Management</td><td>Events Management</td><td>Returns Management</td></tr><tr><td>Sales Planning</td><td>Market Planning</td><td>Service Planning</td></tr><tr><td>Field Sales</td><td>Marketing Operations</td><td>Call Center &amp; Help Desk</td></tr><tr><td>Sales Analytics</td><td>Marketing Analytics</td><td>Service Analytics</td></tr></table>` },
    { t:"Customer Loyalty Management Process", ref:"สไลด์ 31", html:`<p>แผนผังกระบวนการนี้แสดงการใช้ข้อมูลลูกค้าสนับสนุนการบริหารความสัมพันธ์และความภักดี ลำดับขั้นตอน:</p><ol><li><b>Receive service request</b> รับคำร้องขอบริการ</li><li><b>Obtain customer information</b> ดึงข้อมูลจาก Customer database</li><li>ถาม <b>Customer information available?</b> ถ้า <b>No</b> ส่งไป Route to best agent แล้ว Resolve service issue; ถ้า <b>Yes</b> ไปขั้นถัดไป</li><li><b>Score customer</b> ประเมินคุณค่าลูกค้า</li><li>ถาม <b>High value and loyalty?</b> ถ้า <b>Yes</b> = <b>Provide special offers and service</b> ; ถ้า <b>No</b> = Route to best agent แล้วแก้ปัญหา</li></ol><p>CRM ช่วยให้องค์กรระบุลูกค้าที่มีมูลค่าสูงและภักดี เพื่อจัดลำดับความสำคัญและนำเสนอบริการหรือข้อเสนอที่เหมาะสมกับลูกค้าแต่ละราย</p>` },
    { t:"ประเภทของ CRM: Operational vs Analytical และ CLTV", ref:"สไลด์ 32-33", html:`<table><tr><th>ประเภท</th><th>ลักษณะ</th></tr><tr><td><b>Operational CRM</b> (CRM สำหรับการดำเนินงาน)</td><td>แอปพลิเคชันที่สนับสนุนการดำเนินงานและการติดต่อกับลูกค้า (<b>Customer-facing applications</b>) เช่น Sales Force Automation (SFA), Call Center and Customer Service Support, Marketing Automation</td></tr><tr><td><b>Analytical CRM</b> (CRM สำหรับวิเคราะห์)</td><td>แอปพลิเคชันที่วิเคราะห์ข้อมูลลูกค้า; อิงกับ <b>data warehouse</b> ที่ถูกเติมข้อมูลโดย operational CRM และ customer touch points; วิเคราะห์ด้วย <b>OLAP, data mining</b> ฯลฯ</td></tr></table><div class="must"><b>🔥 ต้องจำ</b><ul><li><b>Customer Lifetime Value (CLTV)</b> = มูลค่าที่ลูกค้าจะสร้างให้องค์กรตลอดระยะเวลาที่มีความสัมพันธ์ โดยพิจารณาจาก <b>รายได้ที่เกิดจากลูกค้า, ต้นทุนในการได้มาและการให้บริการลูกค้า, และระยะเวลาที่คาดว่าลูกค้าจะมีความสัมพันธ์กับองค์กร</b></li></ul></div><h4>Analytical CRM Data Warehouse (สไลด์ 33)</h4><ul><li><b>Customer data (แหล่งข้อมูลเข้า)</b> Channels: Call center, Web site, Wireless, Field sales, Direct mail, E-mail, Retail store, Partner และ Other sources: Legacy systems, Demographic data, Third-party data, Marketing campaign data</li><li>ข้อมูลทั้งหมดไหลเข้า <b>Customer data warehouse</b> ซึ่งใช้เครื่องมือ <b>OLAP, Data mining, Other data analysis tools</b> วิเคราะห์ (ลูกศรสองทาง)</li><li>ผลลัพธ์ (Customer Insights): <b>Profitable customers, Market segments, Customer profiles, Churn rates</b></li></ul>` },
    { t:"Business Value ของ CRM", ref:"สไลด์ 34", html:`<p>คุณค่าทางธุรกิจของระบบ CRM:</p><ol><li>เพิ่มความพึงพอใจของลูกค้า</li><li>ลดค่าใช้จ่ายในการทำการตลาดทางตรง</li><li>เพิ่มประสิทธิภาพของการทำการตลาด</li><li>ลดต้นทุนในการหาลูกค้ารายใหม่และการรักษาลูกค้าเดิม</li><li>เพิ่มรายได้จากการขาย</li><li>ลด <b>อัตราการสูญเสียลูกค้า (Churn Rate)</b></li></ol><div class="must"><b>🔥 ต้องจำ</b><ul><li><b>Churn Rate</b> = อัตราส่วนของลูกค้าที่หยุดใช้หรือซื้อสินค้า/บริการจากบริษัทในช่วงเวลาหนึ่ง ใช้เป็นตัวชี้วัดการสูญเสียหรือการลดลงของฐานลูกค้า</li></ul></div>` },
    { t:"ตัวอย่างหน้าจอซอฟต์แวร์ CRM", ref:"สไลด์ 35", html:`<p>สไลด์สุดท้ายเป็นภาพหน้าจอตัวอย่างโปรแกรม CRM (หน้า Accounts ของบริษัทลูกค้า) แถบซ้ายแบ่งเมนูตามฟังก์ชัน CRM: <b>Details</b> (Information, Activity, History, Contacts), <b>Sales</b> (Opportunity, Quotations, Orders, Shipments, Invoices, Credit Note), <b>Marketing</b> (Marketing List, Campaigns, Campaign Calendar), <b>Service</b> (Contract, Customer Service, Case) และแท็บข้อมูลลูกค้า เช่น รหัสลูกค้า ชื่อ ผู้ติดต่อ ผู้มีอำนาจตัดสินใจ แหล่งที่มา (Source) สะท้อนว่า CRM รวมข้อมูลลูกค้าและงานขาย/การตลาด/บริการไว้ในที่เดียว</p>` }
  ],
  ex: [
 {
  "type": "choice",
  "story": "บริษัทแห่งหนึ่งทำงานวิเคราะห์แนวทางการจัดการเครือข่ายธุรกิจตั้งแต่ซัพพลายเออร์ถึงมือผู้บริโภค",
  "q": "ตามนิยาม Supply chain ข้อใดเป็นกิจกรรมหลักของเครือข่ายนี้",
  "opts": [
   {
    "t": "วิเคราะห์พฤติกรรมลูกค้า",
    "why": "เป็นงานวิเคราะห์ด้านลูกค้า ไม่ใช่กิจกรรมหลักของ Supply chain"
   },
   {
    "t": "บริหารคลังข้อมูลองค์กร",
    "why": "เป็นงานด้านข้อมูล ไม่ใช่กิจกรรมหลักของ Supply chain"
   },
   {
    "t": "ประมวลผลบัญชีรายวัน",
    "why": "เป็นงานบัญชี ไม่ใช่กิจกรรมหลักของ Supply chain"
   },
   {
    "t": "แปรรูปวัตถุดิบเป็นสินค้า",
    "why": "เป็นกิจกรรมหลักข้อที่สองของ Supply chain"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ในแผนภาพห่วงโซ่ของ Nike มีผู้ผลิตที่รับจ้างผลิตและส่งสินค้าตรงให้ Nike โดยมีซัพพลายเออร์อีกหลายชั้นอยู่ไกลออกไปทางต้นน้ำ",
  "q": "Contract Supplier ที่ติดกับ Nike โดยตรงคือระดับใด",
  "opts": [
   {
    "t": "Tier 2 Supplier",
    "why": "Tier 2 อยู่ถัดออกไปจาก Tier 1"
   },
   {
    "t": "Tier 3 Supplier",
    "why": "Tier 3 อยู่ไกลต้นน้ำที่สุด"
   },
   {
    "t": "Tier 1 Supplier",
    "why": "Tier 1 ติดบริษัทโดยตรง"
   },
   {
    "t": "Distributor",
    "why": "เป็นฝั่งปลายน้ำของ Nike"
   }
  ],
  "ans": 2
 },
 {
  "type": "match",
  "q": "จับคู่คำศัพท์กับความหมาย",
  "pairs": [
   [
    "Tier 1 Supplier",
    "ผู้ผลิตรับจ้างที่ส่งงานตรงให้บริษัท"
   ],
   [
    "Touch point",
    "ช่องทางที่ลูกค้ามาติดต่อองค์กร"
   ],
   [
    "Safety stock",
    "สินค้าสำรองที่ถือไว้กันความไม่แน่นอน"
   ],
   [
    "Churn rate",
    "สัดส่วนลูกค้าที่เลิกใช้ในช่วงเวลาหนึ่ง"
   ]
  ],
  "why": "Tier 1 อยู่ใน Supply chain, Touch point และ Churn rate เป็นศัพท์ CRM, Safety stock เป็นวิธีรับมือความไม่แน่นอน"
 },
 {
  "type": "choice",
  "story": "ฝ่ายจัดซื้อของบริษัทเสื้อผ้าเจรจาเงื่อนไขการส่งฝ้ายกับโรงปั่นด้ายและบริหารความสัมพันธ์กับคู่ค้าของโรงปั่นด้ายนั้น",
  "q": "กิจกรรมนี้อยู่ในส่วนใดของ Supply chain",
  "opts": [
   {
    "t": "Downstream supply chain",
    "why": "Downstream คือฝั่งส่งมอบถึงลูกค้า"
   },
   {
    "t": "Supply chain execution",
    "why": "เป็นซอฟต์แวร์จัดการคำสั่งซื้อและติดตามสินค้า ไม่ใช่ตำแหน่งในห่วงโซ่"
   },
   {
    "t": "Upstream supply chain",
    "why": "Upstream คือฝั่งซัพพลายเออร์และคู่ค้าของซัพพลายเออร์"
   },
   {
    "t": "Customer life cycle",
    "why": "เป็นวงจรลูกค้าใน CRM"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ผู้จัดการของ Nike ต้องแลกเปลี่ยนข้อมูลกับโรงงานผู้รับจ้างผลิตรายหนึ่งเป็นประจำ",
  "q": "ข้อมูลใดไหลระหว่าง Nike กับ Contract Supplier",
  "opts": [
   {
    "t": "ระดับสต็อกและกำหนดส่งมอบ",
    "why": "Inventory level และ delivery schedule ไหลระหว่าง Contract Supplier กับ Nike"
   },
   {
    "t": "คำขอคืนสินค้าจากลูกค้า",
    "why": "ไหลฝั่ง Nike-Distributor-Retailer-Customer"
   },
   {
    "t": "คำสั่งซื้อจากผู้ค้าปลีก",
    "why": "ไหลฝั่งปลายน้ำ ระหว่าง Nike กับ Distributor/Retailer"
   },
   {
    "t": "คำขอซ่อมและบริการ",
    "why": "ไหลฝั่งลูกค้าปลายน้ำ"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "โรงงานรถยนต์รับชิ้นส่วนเข้าไลน์ประกอบทันทีที่ถึงรอบใช้งาน จึงแทบไม่มีของกองในโกดัง",
  "q": "แนวคิดบริหารแบบนี้เรียกว่าอะไร",
  "opts": [
   {
    "t": "Safety stock",
    "why": "เป็นการถือสำรองไว้ ตรงข้ามกัน"
   },
   {
    "t": "Build-to-stock",
    "why": "ผลิตเก็บเข้าสต็อกตามพยากรณ์"
   },
   {
    "t": "Demand planning",
    "why": "เป็นการวางแผนความต้องการ ไม่ใช่วิธีส่งของ"
   },
   {
    "t": "Just-in-time",
    "why": "ได้ของที่ต้องการ ตามเวลาและปริมาณที่ต้องการ"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ร้านอาหารถือวัตถุดิบเกินที่ใช้จริงทุกวัน เผื่อรถส่งของมาช้าหรือลูกค้าแห่มากกว่าปกติ",
  "q": "วิธีรับมือความไม่แน่นอนที่ใช้กันทั่วไปนี้คืออะไร",
  "opts": [
   {
    "t": "Just-in-time (JIT)",
    "why": "JIT พยายามลดสต็อก"
   },
   {
    "t": "Safety stock",
    "why": "สินค้าสำรองรองรับความไม่แน่นอน"
   },
   {
    "t": "Build-to-stock",
    "why": "เป็นการผลิตตามพยากรณ์ ไม่ใช่การสำรองกันพลาด"
   },
   {
    "t": "Demand planning",
    "why": "เป็นการพยากรณ์ ไม่ใช่การสำรองสินค้า"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "ผู้จัดการคนหนึ่งเล่าว่าบริษัทไม่มีระบบ SCM จึงเจอปัญหาหลายอย่างในห่วงโซ่อุปทาน",
  "q": "ข้อใดคือปัญหาที่ตำราระบุว่าเกิดเมื่อไม่มี SCM",
  "opts": [
   {
    "t": "Churn rate สูง",
    "why": "เป็นปัญหาด้านลูกค้าของ CRM"
   },
   {
    "t": "Bullwhip effect",
    "why": "เป็นปัญหาข้อที่ 3 ของการไม่มี SCM"
   },
   {
    "t": "Data redundancy",
    "why": "เป็นปัญหาระบบแฟ้มข้อมูลในบทฐานข้อมูล"
   },
   {
    "t": "Scope creep",
    "why": "เป็นปัญหาการพัฒนาระบบ"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "ในแบบจำลองห่วงโซ่ ลูกค้าซื้อเพิ่มจาก 5 เป็น 15 ชิ้น แล้วแต่ละระดับสั่งของย้อนไปทางต้นน้ำต่อกันเป็นทอดๆ",
  "q": "ยอดสั่งซื้อที่ผู้ผลิตต้องรับเมื่อเทียบกับความต้องการจริงของลูกค้าเป็นอย่างไร",
  "opts": [
   {
    "t": "ใกล้เคียงยอดซื้อของลูกค้า",
    "why": "ตัวอย่างในบทแสดงว่ายอดขยายใหญ่ขึ้นมาก ไม่ใช่ใกล้เคียง"
   },
   {
    "t": "ต่ำกว่ายอดซื้อของลูกค้า",
    "why": "ยอดสั่งซื้อต้นน้ำสูงกว่าไม่ใช่ต่ำกว่า"
   },
   {
    "t": "ลดลงจนแทบไม่มีคำสั่งซื้อ",
    "why": "ตรงข้ามกับ Bullwhip effect"
   },
   {
    "t": "สูงกว่ายอดซื้อจริงหลายเท่า",
    "why": "Bullwhip effect ทำให้คำสั่งซื้อขยายตัวย้อนต้นน้ำ"
   }
  ],
  "ans": 3
 },
 {
  "type": "multi",
  "story": "ที่ปรึกษาตรวจห่วงโซ่อุปทานของบริษัทหนึ่งซึ่งมีคำสั่งซื้อแกว่งแรงขึ้นเมื่อย้อนไปทางต้นน้ำ",
  "q": "เลือกทุกข้อที่ตำราระบุเป็นสาเหตุของ Bullwhip effect",
  "opts": [
   {
    "t": "สินค้าขาดจนเสียโอกาสในการขาย",
    "ok": false,
    "why": "เป็นผลกระทบ ไม่ใช่สาเหตุ"
   },
   {
    "t": "แต่ละระดับไม่แชร์ข้อมูลกัน",
    "ok": true,
    "why": "เป็นสาเหตุข้อที่สาม"
   },
   {
    "t": "ความต้องการของลูกค้าไม่แน่นอน",
    "ok": true,
    "why": "เป็นสาเหตุข้อแรกของ Bullwhip"
   },
   {
    "t": "ใช้ข้อมูล Demand/Inventory ร่วมกัน",
    "ok": false,
    "why": "เป็นแนวทางแก้ ไม่ใช่สาเหตุ"
   },
   {
    "t": "Lead time ของแต่ละระดับไม่เท่ากัน",
    "ok": true,
    "why": "เป็นสาเหตุข้อที่สอง"
   },
   {
    "t": "ต้องจัดเก็บสินค้าเกินจนต้นทุนสูง",
    "ok": false,
    "why": "เป็นผลกระทบ ไม่ใช่สาเหตุ"
   }
  ]
 },
 {
  "type": "choice",
  "story": "บริษัทผ้าอ้อมต้องการลดความผันผวนของคำสั่งซื้อที่ขยายตัวย้อนไปทางโรงงานและซัพพลายเออร์",
  "q": "ข้อใดเป็นแนวทางแก้ Bullwhip effect ตามตำรา",
  "opts": [
   {
    "t": "ใช้ SCM Real-time",
    "why": "SCM แบบ Real-time ช่วยแชร์ข้อมูลและตัดสินใจ"
   },
   {
    "t": "ขยาย Safety stock ทุกระดับ",
    "why": "เพิ่มต้นทุนและไม่แก้ต้นเหตุ"
   },
   {
    "t": "ให้แต่ละระดับพยากรณ์เอง",
    "why": "ทำให้ข้อมูลบิดเบือนมากขึ้น"
   },
   {
    "t": "สั่งซื้อครั้งใหญ่รายเดือน",
    "why": "ทำให้คำสั่งซื้อผันผวนมากขึ้น"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "ซอฟต์แวร์ของบริษัทใช้จำลองห่วงโซ่ที่มีอยู่ ประมาณระดับสต็อกสำรอง และเลือกรูปแบบการขนส่งสำหรับเดือนหน้า",
  "q": "ซอฟต์แวร์นี้จัดเป็น SCM กลุ่มใด",
  "opts": [
   {
    "t": "Supply chain execution system",
    "why": "execution คือจัดการและติดตามสถานะจริง"
   },
   {
    "t": "Operational CRM",
    "why": "เป็น CRM ด้านลูกค้า"
   },
   {
    "t": "Supply chain planning system",
    "why": "เป็นระบบวางแผนล่วงหน้า"
   },
   {
    "t": "Analytical CRM",
    "why": "เป็นการวิเคราะห์ข้อมูลลูกค้า"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ซอฟต์แวร์ของผู้ให้บริการโลจิสติกส์แสดงว่าพัสดุแต่ละชิ้นอยู่ที่ใดและจัดการการเคลื่อนย้ายสินค้าผ่านคลัง",
  "q": "ซอฟต์แวร์นี้จัดเป็น SCM กลุ่มใด",
  "opts": [
   {
    "t": "Supply chain planning system",
    "why": "planning คือการวางแผนล่วงหน้า"
   },
   {
    "t": "Sales Force Automation",
    "why": "เป็นเครื่องมือด้านการขายของ CRM"
   },
   {
    "t": "Customer service",
    "why": "เป็นเครื่องมือด้านบริการลูกค้า"
   },
   {
    "t": "Execution system",
    "why": "ติดตามสถานะและจัดการการเคลื่อนย้ายจริง"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ทีมไอทีกำลังแยกหน้าที่ของซอฟต์แวร์ SCM ออกเป็นสองกลุ่ม",
  "q": "ข้อใดเป็นหน้าที่ของ Supply chain planning system",
  "opts": [
   {
    "t": "ติดตามสถานะสินค้าระหว่างขนส่ง",
    "why": "เป็นหน้าที่ของ execution"
   },
   {
    "t": "กำหนดระดับสินค้าคงคลังที่เหมาะสม",
    "why": "เป็นงานวางแผนล่วงหน้า"
   },
   {
    "t": "ติดตามการดำเนินงานในคลัง",
    "why": "เป็นหน้าที่ของ execution"
   },
   {
    "t": "จัดการคำสั่งซื้อผ่านศูนย์กระจาย",
    "why": "เป็นหน้าที่ของ execution"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "โรงงานขนมตั้งแผนผลิตทั้งไตรมาสตามตัวเลขที่ฝ่ายขายประมาณไว้ แล้วนำไปเก็บในโกดังรอขาย",
  "q": "รูปแบบการผลิตนี้เรียกว่าอะไร",
  "opts": [
   {
    "t": "Pull-based model",
    "why": "Pull ผลิตเมื่อมีความต้องการจริง"
   },
   {
    "t": "Just-in-time (JIT)",
    "why": "JIT คือส่งของพอดีเวลา ไม่ใช่ผลิตเก็บสต็อก"
   },
   {
    "t": "Push-based model",
    "why": "ผลิตเก็บสต็อกล่วงหน้า (build-to-stock)"
   },
   {
    "t": "Safety stock",
    "why": "เป็นสินค้าสำรอง ไม่ใช่โมเดลการผลิต"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "เมื่อสินค้าขายออกจากชั้นหนึ่งชิ้น ระบบเติมของที่ร้านและศูนย์กระจายอัตโนมัติ และโรงงานผลิตตามที่ถูกสั่ง",
  "q": "โมเดลห่วงโซ่นี้เรียกว่าอะไร",
  "opts": [
   {
    "t": "Pull-based model",
    "why": "Pull ใช้ความต้องการจริงเป็นตัวกระตุ้น"
   },
   {
    "t": "Push-based model",
    "why": "Push ผลิตตามการพยากรณ์"
   },
   {
    "t": "Planning system",
    "why": "เป็นซอฟต์แวร์ ไม่ใช่โมเดลการผลิต"
   },
   {
    "t": "Execution system",
    "why": "เป็นซอฟต์แวร์ ไม่ใช่โมเดลการผลิต"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "ผู้บริหารร้านค้าปลีกใหญ่ตรวจประโยชน์ที่ได้หลังนำระบบ SCM มาใช้",
  "q": "ข้อใดเป็นประโยชน์ของ SCM",
  "opts": [
   {
    "t": "เพิ่มประสิทธิภาพการทำการตลาด",
    "why": "เป็นคุณค่าของ CRM"
   },
   {
    "t": "รวมข้อมูลบัญชีทั้งบริษัทไว้ที่เดียว",
    "why": "เป็นลักษณะของ ERP"
   },
   {
    "t": "ลดเวลาตอบคำร้องของลูกค้า",
    "why": "เป็นเรื่องบริการลูกค้าของ CRM"
   },
   {
    "t": "ข้อมูลและสินค้าไหลเร็วขึ้น",
    "why": "เป็นประโยชน์ข้อหนึ่งของ SCM"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "บริษัทประกันภัยประเมินผลหลังติดตั้ง CRM หนึ่งปี",
  "q": "ข้อใดเป็นคุณค่าทางธุรกิจของ CRM",
  "opts": [
   {
    "t": "ลดต้นทุนการขนส่งสินค้า",
    "why": "เป็นประโยชน์ของ SCM"
   },
   {
    "t": "ลดต้นทุนหาลูกค้ารายใหม่",
    "why": "เป็นคุณค่าข้อหนึ่งของ CRM"
   },
   {
    "t": "ลดความซ้ำซ้อนของข้อมูลในฐานข้อมูล",
    "why": "เป็นประโยชน์ของระบบฐานข้อมูล"
   },
   {
    "t": "ลดเวลาปิดงบบัญชีรายเดือน",
    "why": "เป็นประโยชน์ของระบบบัญชี/ERP"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "ลูกค้าคนหนึ่งเคยโทรเข้าคอลเซ็นเตอร์ ทักแอปมือถือ และแวะซื้อที่สาขาในสัปดาห์เดียวกัน โดยแต่ละครั้งบริษัทเก็บข้อมูลแยกกัน",
  "q": "คอลเซ็นเตอร์ แอปมือถือ และสาขา จัดเป็นอะไรในศัพท์ CRM",
  "opts": [
   {
    "t": "Customer segment",
    "why": "เป็นการแบ่งกลุ่มลูกค้า ไม่ใช่ช่องทางติดต่อ"
   },
   {
    "t": "Solicitation process",
    "why": "เป็นกระบวนการเสนอขายช่วง Target"
   },
   {
    "t": "Touch point",
    "why": "จุดที่ลูกค้ามีปฏิสัมพันธ์กับองค์กร"
   },
   {
    "t": "Loyalty program",
    "why": "เป็นโปรแกรมสะสมสิทธิ์ ไม่ใช่ช่องทางติดต่อ"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "พนักงานขาย ฝ่ายบริการ และฝ่ายการตลาดของบริษัทหนึ่งเปิดประวัติของลูกค้ารายหนึ่ง แล้วได้ข้อมูลซื้อ ข้อร้องเรียน และแคมเปญที่เคยส่งครบถ้วนไม่ขัดแย้งกัน",
  "q": "แนวคิดที่องค์กรต้องการได้จากการรวมข้อมูลลูกค้าลักษณะนี้คืออะไร",
  "opts": [
   {
    "t": "Touch point",
    "why": "เป็นช่องทางติดต่อ ไม่ใช่เป้าหมายของการรวมข้อมูล"
   },
   {
    "t": "Customer lifetime value",
    "why": "เป็นมูลค่าลูกค้าตลอดความสัมพันธ์"
   },
   {
    "t": "Single Customer View",
    "why": "ทั้งองค์กรมองลูกค้าในมุมมองเดียวกัน"
   },
   {
    "t": "Analytical CRM",
    "why": "เป็น CRM ที่วิเคราะห์ข้อมูล ไม่ใช่เป้าหมายของการรวมข้อมูล"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ทีมขายโทรหาผู้ที่เคยสอบถามราคา จนเขาตัดสินใจซื้อสินค้าเป็นครั้งแรก",
  "q": "กิจกรรมนี้อยู่ช่วงใดของ Customer Life Cycle",
  "opts": [
   {
    "t": "Marketing (Attract)",
    "why": "เป็นช่วงดึงดูดกลุ่มเป้าหมาย"
   },
   {
    "t": "Customer acquisition",
    "why": "เปลี่ยน Prospect เป็น Customer"
   },
   {
    "t": "Relationship management",
    "why": "เป็นช่วงดูแลและขายเพิ่มให้ลูกค้าเดิม"
   },
   {
    "t": "Loss/Churn",
    "why": "เป็นช่วงลูกค้าหลุดไป"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "ในช่วง Loss/Churn ของ Customer Life Cycle ลูกค้าที่หลุดไปถูกแบ่งเป็นสองกลุ่ม",
  "q": "บริษัทจะพยายาม Win back ลูกค้ากลุ่มใด",
  "opts": [
   {
    "t": "Low-value customers",
    "why": "กลุ่มมูลค่าต่ำไม่ใช่เป้าหมาย Win back"
   },
   {
    "t": "Prospects",
    "why": "ยังไม่เคยเป็นลูกค้า"
   },
   {
    "t": "Targets",
    "why": "เป็นกลุ่มเป้าหมายช่วง Marketing"
   },
   {
    "t": "High-value",
    "why": "กลุ่มมูลค่าสูงคุ้มที่จะดึงกลับ"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "เจ้าหน้าที่ของบริษัทมอบหมายเคสร้องเรียนให้ทีมแก้ไข และเปิดให้ลูกค้าตรวจสถานะปัญหาเองผ่านเว็บไซต์",
  "q": "งานนี้อยู่ในโมดูลใดของซอฟต์แวร์ CRM",
  "opts": [
   {
    "t": "Customer service",
    "why": "สนับสนุนการจัดการคำร้องและบริการ Self-service"
   },
   {
    "t": "Marketing",
    "why": "สนับสนุนแคมเปญและการวิเคราะห์ตลาด"
   },
   {
    "t": "SFA",
    "why": "สนับสนุนงานขายและโอกาสขาย"
   },
   {
    "t": "Supply chain execution",
    "why": "เป็นโมดูลฝั่ง SCM ไม่ใช่ CRM"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "พนักงานขายภาคสนามใช้แอปเปิดดูข้อมูลสินค้า คำนวณราคา และออกใบเสนอราคาให้ลูกค้าทันที",
  "q": "เครื่องมือนี้เป็นฟังก์ชัน CRM ด้านใด",
  "opts": [
   {
    "t": "Customer service",
    "why": "สนับสนุนศูนย์บริการและคำร้อง"
   },
   {
    "t": "Marketing automation",
    "why": "สนับสนุนแคมเปญและโฆษณา"
   },
   {
    "t": "SFA",
    "why": "สนับสนุนงานขายและโอกาสขาย"
   },
   {
    "t": "Analytical CRM",
    "why": "เป็น CRM สำหรับวิเคราะห์ข้อมูล"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "นักวิเคราะห์ขุดข้อมูลยอดซื้อย้อนหลังจากคลังข้อมูลลูกค้า เพื่อหากลุ่มลูกค้าที่ทำกำไรมากที่สุด",
  "q": "งานนี้เป็น CRM ประเภทใด",
  "opts": [
   {
    "t": "Operational CRM",
    "why": "เป็นแอปพลิเคชันที่ใช้ติดต่อลูกค้าโดยตรง"
   },
   {
    "t": "Analytical CRM",
    "why": "วิเคราะห์ข้อมูลลูกค้าจาก data warehouse"
   },
   {
    "t": "Supply chain planning",
    "why": "เป็นเรื่อง SCM"
   },
   {
    "t": "Supply chain execution",
    "why": "เป็นเรื่อง SCM"
   }
  ],
  "ans": 1
 },
 {
  "type": "choice",
  "story": "พนักงานรับสายแก้ปัญหาให้ลูกค้า ขณะที่ระบบส่งอีเมลโปรโมชันอัตโนมัติไปพร้อมกัน",
  "q": "แอปพลิเคชันเหล่านี้จัดเป็น CRM ประเภทใด",
  "opts": [
   {
    "t": "Analytical CRM",
    "why": "เป็นการวิเคราะห์ข้อมูล ไม่ใช่งานหน้าบ้าน"
   },
   {
    "t": "Supply chain planning",
    "why": "เป็นเรื่อง SCM"
   },
   {
    "t": "Supply chain execution",
    "why": "เป็นเรื่อง SCM"
   },
   {
    "t": "Operational CRM",
    "why": "เป็นแอปพลิเคชันที่ติดต่อกับลูกค้า (customer-facing)"
   }
  ],
  "ans": 3
 },
 {
  "type": "choice",
  "story": "ร้านกาแฟคำนวณว่าลูกค้าประจำรายหนึ่งสร้างรายได้หักต้นทุนหาและบริการ ตลอดเวลาที่คาดว่าจะยังซื้อกับร้านต่อไป",
  "q": "ตัวชี้วัดนี้เรียกว่าอะไร",
  "opts": [
   {
    "t": "Churn rate",
    "why": "เป็นสัดส่วนลูกค้าที่เลิกใช้"
   },
   {
    "t": "Customer acquisition",
    "why": "เป็นช่วงหาลูกค้า"
   },
   {
    "t": "Lifetime value",
    "why": "มูลค่าลูกค้าตลอดความสัมพันธ์"
   },
   {
    "t": "Win back",
    "why": "เป็นการดึงลูกค้ากลับ"
   }
  ],
  "ans": 2
 },
 {
  "type": "choice",
  "story": "ผู้ให้บริการมือถือพบว่าลูกค้า 8 ใน 100 รายที่มีอยู่ต้นปีไม่ต่อสัญญาเมื่อสิ้นปี",
  "q": "ตัวเลข 8% นี้เรียกว่าอะไร",
  "opts": [
   {
    "t": "Churn rate",
    "why": "สัดส่วนลูกค้าที่เลิกใช้ในช่วงเวลาหนึ่ง"
   },
   {
    "t": "Customer Lifetime Value",
    "why": "เป็นมูลค่าลูกค้า ไม่ใช่สัดส่วนที่หลุด"
   },
   {
    "t": "Win back",
    "why": "เป็นการดึงลูกค้ากลับ"
   },
   {
    "t": "Single Customer View",
    "why": "เป็นมุมมองข้อมูลลูกค้า"
   }
  ],
  "ans": 0
 },
 {
  "type": "choice",
  "story": "ในกระบวนการ Customer Loyalty Management ระบบให้คะแนนลูกค้าที่ส่งคำร้องเข้ามา และพบว่าเป็นลูกค้า High value และ loyalty",
  "q": "ลูกค้ากลุ่มนี้จะได้รับการดำเนินการใด",
  "opts": [
   {
    "t": "ส่งต่อให้ agent ที่เหมาะสม",
    "why": "เป็นทางออกของกรณีไม่มีข้อมูลหรือมูลค่าไม่สูง"
   },
   {
    "t": "ข้อเสนอและบริการพิเศษ",
    "why": "กลุ่ม High value and loyalty จะได้รับข้อเสนอพิเศษ"
   },
   {
    "t": "ใช้ Web self-service เอง",
    "why": "ไม่ใช่ขั้นตอนของกระบวนการนี้"
   },
   {
    "t": "จัดเข้ากลุ่ม Win back",
    "why": "เป็นกลุ่มลูกค้าที่หลุดไปในช่วง Churn"
   }
  ],
  "ans": 1
 },
 {
  "type": "blank",
  "text": "ข้อมูลลูกค้าจากทุกช่องทางถูกรวมให้ทั้งองค์กรเห็นภาพเดียวกัน เรียกว่า {1} ส่วน CRM ที่วิเคราะห์ด้วย OLAP และ data mining จัดเป็น {2}",
  "blanks": [
   {
    "opts": [
     "Single Customer View",
     "Touch point",
     "Churn rate",
     "Data mart"
    ],
    "ans": 0,
    "why": "ภาพลูกค้าเดียวกันทั้งองค์กรคือ Single Customer View"
   },
   {
    "opts": [
     "Operational CRM",
     "Supply chain planning",
     "Supply chain execution",
     "Analytical CRM"
    ],
    "ans": 3,
    "why": "CRM ที่วิเคราะห์ข้อมูลคือ Analytical CRM"
   }
  ]
 }
]
});
