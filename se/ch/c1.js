(function () {
const F = (n, c) => `<figure><img src="i/${n}.webp" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`;
IOT.reg({
  id: "c1",
  title: "Quality Concepts และ Software Reviews",
  th: "นิยามคุณภาพ, quality factors, ต้นทุนคุณภาพ, รีวิว และการคำนวณ review metrics",
  summary: `
<ul>
<li><b>Software quality</b> = กระบวนการที่มีประสิทธิผล (effective process) ที่สร้างผลิตภัณฑ์มีประโยชน์ (useful product) ซึ่งให้คุณค่าวัดได้ (measurable value) แก่ทั้งผู้ผลิตและผู้ใช้</li>
<li>Garvin 5 มุมมอง: transcendental, user, manufacturer, product, value-based</li>
<li>McCall: operation (Correctness, Reliability, Efficiency, Integrity, Usability), revision (Maintainability, Flexibility, Testability), transition (Portability, Reusability, Interoperability)</li>
<li>ISO 25010: quality in use 5 ข้อ และ product quality 8 ข้อ</li>
<li>Cost of quality = prevention + appraisal + failure (internal, external); ยิ่งพบช้ายิ่งแพง ($977 ตอน code เทียบ $7,136 ตอน system testing)</li>
<li><b>Error</b> พบก่อนส่งมอบ, <b>Defect</b> พบหลังส่งมอบ</li>
<li>Err<sub>tot</sub> = Err<sub>minor</sub> + Err<sub>major</sub>; Error density = Err<sub>tot</sub> / WPS; effort saved = E<sub>testing</sub> - E<sub>reviews</sub></li>
</ul>`,
  sections: [
    { t: "คุณภาพคืออะไร", ref: "ชุดที่ 11 สไลด์ 5-17", html: `
<p>ซอฟต์แวร์แทรกอยู่ในทุกด้านของชีวิต การรีบปล่อยโดยทดสอบไม่พอทำให้เสียเงินมหาศาล <b>ทุกคนที่เกี่ยวข้องกับกระบวนการ</b>รับผิดชอบคุณภาพ: ทำให้ถูกตั้งแต่แรก ไม่เช่นนั้นต้องทำใหม่</p>
<h4>กิจกรรม 4 อย่างเพื่อให้ได้คุณภาพสูง</h4>
<ul><li>software engineering process และ practice ที่พิสูจน์แล้ว</li><li>project management ที่แข็งแรง</li><li>quality control ครบถ้วน</li><li>มีโครงสร้าง quality assurance</li></ul>
<p>ตรวจว่าทำถูกด้วยการ <b>track</b> (ดูผลกิจกรรม QC) และ <b>measure</b> (นับ error ก่อนส่งมอบ และ defect ที่หลุดไปถึงผู้ใช้)</p>
<h4>มุมมองคุณภาพของ David Garvin</h4>
<table><tr><th>มุมมอง</th><th>คุณภาพคือ</th></tr>
<tr><td>Transcendental</td><td>เห็นก็รู้ แต่นิยามชัดไม่ได้</td></tr>
<tr><td>User</td><td>ตอบเป้าหมายของผู้ใช้ปลายทาง</td></tr>
<tr><td>Manufacturer</td><td>ตรงตาม specification เดิม</td></tr>
<tr><td>Product</td><td>ผูกกับคุณลักษณะในตัวผลิตภัณฑ์ (ฟังก์ชัน, ฟีเจอร์)</td></tr>
<tr><td>Value-based</td><td>ลูกค้ายอมจ่ายเท่าไร</td></tr></table>
<div class="must"><b>ต้องจำ</b> (Robert Glass) user satisfaction = compliant product + good quality + delivery within budget and schedule</div>
<h4>องค์ประกอบ 3 ส่วนของนิยาม</h4>
<ul><li><b>Effective process</b>: โครงสร้างรองรับงาน มี management คอยตรวจถ่วง กัน chaos; practice ช่วยวิเคราะห์ปัญหาและออกแบบ; umbrella activities เช่น change management และ technical review</li>
<li><b>Useful product</b>: ส่งมอบสิ่งที่ผู้ใช้ต้องการอย่างเชื่อถือได้ ตอบทั้ง requirement ที่บอกชัด (explicit) และที่คาดหวังโดยนัย (implicit เช่น ใช้ง่าย)</li>
<li><b>Value</b>: ผู้ผลิตเสียแรง maintenance และ support น้อยลง, ผู้ใช้ทำงานเร็วขึ้น ผลคือรายได้ กำไร และข้อมูลพร้อมใช้ดีขึ้น</li></ul>` },
    { t: "Quality Factors: McCall และ ISO 25010", ref: "ชุดที่ 11 สไลด์ 18-35", html: `
${F("d1p05c", "McCall quality factors: operation, revision, transition")}
<h4>McCall: 3 ด้าน 11 ปัจจัย</h4>
<table><tr><th>ด้าน</th><th>ปัจจัย</th><th>ความหมาย</th></tr>
<tr><td rowspan="5">Operation</td><td>Correctness</td><td>ตรง spec และเป้าลูกค้า</td></tr>
<tr><td>Reliability</td><td>ทำงานได้ตามความแม่นยำที่ต้องการ</td></tr>
<tr><td>Efficiency</td><td>ทรัพยากรและโค้ดที่ใช้</td></tr>
<tr><td>Integrity</td><td>ควบคุมการเข้าถึงโดยไม่ได้รับอนุญาต</td></tr>
<tr><td>Usability</td><td>แรงที่ใช้เรียนรู้ ใช้งาน ป้อนและตีความ</td></tr>
<tr><td rowspan="3">Revision</td><td>Maintainability</td><td>แรงหาและแก้ error</td></tr>
<tr><td>Flexibility</td><td>แรงแก้ไขโปรแกรมที่ใช้งานอยู่</td></tr>
<tr><td>Testability</td><td>แรงทดสอบให้มั่นใจว่าทำงานถูก</td></tr>
<tr><td rowspan="3">Transition</td><td>Portability</td><td>ย้ายไป hardware หรือ software อื่น</td></tr>
<tr><td>Reusability</td><td>นำไปใช้ซ้ำในงานอื่น</td></tr>
<tr><td>Interoperability</td><td>แรงเชื่อมกับระบบอื่น</td></tr></table>
<h4>ISO 25010</h4>
<p><b>Quality in use</b> (ตอนใช้จริงในบริบท): Effectiveness, Efficiency, Satisfaction, Freedom from risk, Context coverage</p>
<table><tr><th>Product quality</th><th>ตัวอย่างย่อย</th></tr>
<tr><td>Functional suitability</td><td>complete, correct, appropriate</td></tr>
<tr><td>Performance efficiency</td><td>timing, resource use, capacity</td></tr>
<tr><td>Compatibility</td><td>coexistence, interoperability</td></tr>
<tr><td>Usability</td><td>learnability, operability, error protection, aesthetics, accessibility</td></tr>
<tr><td>Reliability</td><td>maturity, availability, fault tolerance, recoverability</td></tr>
<tr><td>Security</td><td>confidentiality, integrity, accountability, authenticity</td></tr>
<tr><td>Maintainability</td><td>modularity, reusability, modifiability, testability</td></tr>
<tr><td>Portability</td><td>adaptability, installability, replaceability</td></tr></table>
<h4>การประเมิน</h4>
<ul><li><b>Qualitative</b>: ตั้งคำถามเจาะแต่ละปัจจัย เช่น usability: ผู้ใช้เรียนรู้นานแค่ไหน (learnability), ระบบกันความผิดพลาดและ undo ได้ไหม (error protection) ถ้าคำตอบส่วนใหญ่ใช่ แปลว่าคุณภาพน่าจะดี และต้อง<b>สังเกตผู้ใช้จริง</b></li>
<li><b>Quantitative</b>: ใช้ software metrics หา design defect เช่น coupling หรือ complexity สูง ค่าหลุดช่วง = สัญญาณต้องตรวจ เป็นการวัด<b>ทางอ้อม</b>เสมอ</li></ul>` },
    { t: "Quality Dilemma, Good Enough, ความเสี่ยง", ref: "ชุดที่ 11 สไลด์ 36-52", html: `
<p><b>Quality dilemma</b> (Bertrand Meyer): คุณภาพแย่ไม่มีใครซื้อ แต่สมบูรณ์แบบเกินก็ช้าและแพงจนเจ๊ง ต้องหาจุดกลางที่ "ดีพอ"</p>
<ul><li><b>Good enough</b>: ปล่อย v1.0 ที่ยังมีบั๊กเพื่อชิง time to market อาจใช้ได้กับบริษัทใหญ่การตลาดแรง</li>
<li>บริษัทเล็กเสี่ยงชื่อเสียงพังจนไม่มี v2.0</li></ul>
<div class="warn"><b>ระวัง</b> งาน real-time embedded, ยานยนต์, โทรคมนาคม ถ้าส่งของที่รู้ว่ามีบั๊กอาจเป็นความประมาท ถูกฟ้อง หรือผิดอาญา (กรณีโรงพยาบาลในปานามา ปี 2000: ผู้ป่วย 28 คนได้รังสีเกินขนาด เพราะดัดแปลงซอฟต์แวร์คำนวณ)</div>
<ul><li><b>Negligence and liability</b>: โครงการล้มเหลว ลูกค้าอ้างว่าผู้พัฒนาประมาท ผู้พัฒนาอ้างว่าลูกค้าเปลี่ยน requirement สุดท้ายคุณภาพของระบบถูกตั้งคำถาม</li>
<li><b>Security</b>: ซอฟต์แวร์คุณภาพต่ำถูกแฮ็กง่าย ปัญหามี 2 แบบ <b>bug</b> (ระดับ implementation) และ <b>flaw</b> (ระดับสถาปัตยกรรม) คนมักสนใจ bug มากเกินและละเลย flaw</li>
<li><b>บรรลุคุณภาพ</b>ด้วย: SE methods, project management, quality control, SQA</li></ul>` },
    { t: "Cost of Quality", ref: "ชุดที่ 11 สไลด์ 41-46", html: `
<table><tr><th>ประเภท</th><th>ตัวอย่าง</th></tr>
<tr><td><b>Prevention</b></td><td>บริหารวางแผน QA/QC, ทำ requirement และ design ให้ครบ, วางแผนทดสอบ, อบรม</td></tr>
<tr><td><b>Appraisal</b></td><td>technical review, เก็บและประเมิน metrics, testing และ debugging</td></tr>
<tr><td><b>Internal failure</b> (พบก่อนส่ง)</td><td>rework, แก้ผลข้างเคียงจาก rework, เก็บข้อมูลวิเคราะห์ failure</td></tr>
<tr><td><b>External failure</b> (พบหลังส่ง)</td><td>จัดการข้อร้องเรียน, คืนหรือเปลี่ยนสินค้า, help line, ค่าแรงตามประกัน, เสียชื่อเสียง</td></tr></table>
${F("d1p11c", "ต้นทุนแก้ error เพิ่มขึ้นมากตามเฟสที่พบ")}
<div class="must"><b>ต้องจำ</b> ลงทุน prevention ให้ผลตอบแทนดีมาก ยิ่งพบช้าค่าแก้ยิ่งพุ่ง</div>` },
    { t: "Software Reviews", ref: "ชุดที่ 11 สไลด์ 53-61", html: `
<p>รีวิวคือ <b>ตัวกรอง</b>ของ workflow น้อยไปงาน "สกปรก" มากไปงานไหลช้า ใช้ metrics เลือกรีวิวที่ได้ผล เทคนิครีวิว (peer / technical review) เช่น casual review, walkthrough, inspection เป็นตัวกรองคุณภาพที่ได้ผลที่สุด</p>
<ul><li>พบเร็วแก้ถูก และ error <b>ขยายตัว</b> (defect amplification) เมื่อหลุดไปเฟสถัดไป</li>
<li><b>ขั้นตอน 6 อย่าง</b> (ไม่ต้องครบทุกแบบ): planning, preparation, จัดประชุม, noting errors, แก้ไข (นอกที่ประชุม), ตรวจว่าแก้ถูก</li>
<li><b>ผลผลิต</b>: รายการ issue/error และสถานะทางเทคนิคของ work product</li></ul>
<div class="note"><b>Error vs Defect</b> error = พบก่อนปล่อยให้ผู้อื่น, defect = พบหลังปล่อย (ถ้าคิดเรื่อง process improvement ปัญหาที่หลุดข้ามกิจกรรมกรอบก็เรียก defect ได้)</div>` },
    { t: "Review Metrics และ Postmortem", ref: "ชุดที่ 11 สไลด์ 62-73", html: `
<table><tr><th>สัญลักษณ์</th><th>ความหมาย</th></tr>
<tr><td>E<sub>p</sub></td><td>แรงเตรียมตัวก่อนประชุม (person-hours)</td></tr>
<tr><td>E<sub>a</sub></td><td>แรงระหว่างรีวิว</td></tr>
<tr><td>E<sub>r</sub></td><td>แรง rework แก้ error ที่พบ</td></tr>
<tr><td>E<sub>review</sub></td><td>E<sub>p</sub> + E<sub>a</sub> + E<sub>r</sub></td></tr>
<tr><td>WPS</td><td>ขนาดงานที่รีวิว (จำนวน UML, หน้า, บรรทัด)</td></tr>
<tr><td>Err<sub>tot</sub></td><td>Err<sub>minor</sub> + Err<sub>major</sub></td></tr>
<tr><td>Error density</td><td>Err<sub>tot</sub> / WPS</td></tr></table>
<h4>ตัวอย่างต่อเนื่อง (จำวิธีคิด)</h4>
<ul><li>requirement model มี 18 UML ใน 32 หน้า พบ minor 18 + major 4 = <b>22</b>; density = 1.2 ต่อ diagram หรือ 0.68 ต่อหน้า</li>
<li>เอกสารใหม่ 40 หน้า คาดว่าพบ 40 x 0.68 ≈ <b>27</b> ถ้าพบแค่ 9 แปลว่าเขียนดีมาก หรือรีวิวไม่ละเอียด</li>
<li>minor ใช้ 4 ชม., major 18 ชม. และ minor บ่อยกว่า 6 เท่า: E<sub>reviews</sub> = (6x4 + 1x18)/7 = <b>6</b> ชม./error</li>
<li>แก้ตอน testing ใช้ 45 ชม. จึงประหยัด 45 - 6 = 39 ชม./error; 22 errors ประหยัด 22 x 39 = <b>858</b> ชม.</li></ul>
${F("d1p17b", "แรงงานตามเวลา: มีรีวิวใช้แรงต้นมากกว่า แต่ส่งมอบเร็วกว่า")}
<p>ประเมินความคุ้มค่าของรีวิวได้ก็ต่อเมื่อรีวิวจบ เก็บข้อมูล หาค่าเฉลี่ย แล้ววัดคุณภาพปลายน้ำจาก testing</p>
<h4>Postmortem Evaluation (PME)</h4>
<p>หลังส่งมอบ ทีมและ stakeholder จัด workshop หา <b>excellences</b> (สิ่งที่ดี) และ <b>challenges</b> (ปัญหา) เพื่อเสนอการปรับปรุง process และ practice คล้าย Scrum retrospective เอกสาร PME ควรเก็บไว้ใน project archive</p>` }
  ],
  ex: [
    { type: "choice", story: "ลูกค้าบอกว่า \"แอปนี้ทำตามเอกสาร spec ครบทุกข้อ แต่ฉันก็ยังทำงานของฉันไม่ได้\"", q: "ข้อความนี้บอกว่าแอปผ่านมุมมองใดแต่ไม่ผ่านมุมมองใด", opts: [
      { t: "ผ่าน manufacturer view ไม่ผ่าน user view", why: "ถูก: ตรง spec คือ manufacturer แต่ไม่ตอบเป้าหมายผู้ใช้" },
      { t: "ผ่าน user view ไม่ผ่าน manufacturer view", why: "ผิด: สลับกัน" },
      { t: "ผ่าน value-based ไม่ผ่าน product view", why: "ผิด: ไม่ได้พูดถึงราคาหรือคุณลักษณะภายใน" },
      { t: "ผ่าน transcendental view", why: "ผิด: transcendental คือรู้สึกว่าดีโดยนิยามไม่ได้" }], ans: 0 },
    { type: "match", q: "จับคู่ปัจจัยของ McCall กับสถานการณ์", pairs: [["ย้ายระบบจาก Windows ไป Linux", "Portability"], ["ใช้เวลาหาบั๊กและแก้", "Maintainability"], ["กันคนนอกเข้าถึงข้อมูล", "Integrity"], ["ต่อระบบเข้ากับ ERP อื่น", "Interoperability"]] },
    { type: "choice", q: "ISO 25010 ข้อใดอยู่ใน quality in use model", opts: [
      { t: "Freedom from risk", why: "ถูก: เป็น 1 ใน 5 ของ quality in use" },
      { t: "Maintainability", why: "ผิด: product quality" },
      { t: "Compatibility", why: "ผิด: product quality" },
      { t: "Portability", why: "ผิด: product quality" }], ans: 0 },
    { type: "multi", story: "ทีมเก็บรายการค่าใช้จ่ายของโครงการ", q: "ข้อใดเป็น failure cost", opts: [
      { t: "ค่า help line หลังปล่อยแอป", ok: true, why: "external failure" },
      { t: "ค่าแก้บั๊กที่พบตอนรีวิวก่อนส่งมอบ (rework)", ok: true, why: "internal failure" },
      { t: "ค่าอบรมทีมเรื่องการเขียน requirement", ok: false, why: "prevention" },
      { t: "ค่าเสียชื่อเสียงจนลูกค้าหาย", ok: true, why: "external failure ที่วัดยาก" },
      { t: "ค่าประชุม technical review", ok: false, why: "appraisal" }] },
    { type: "choice", story: "พบ error ในโค้ดตอน code generation ค่าแก้ราว $977 แต่ทีมปล่อยให้ไปถึง system testing", q: "ค่าแก้โดยเฉลี่ยในอุตสาหกรรมเพิ่มขึ้นประมาณกี่เท่า", opts: [
      { t: "ประมาณ 7 เท่า ($7,136)", why: "ถูก: 7136/977 ≈ 7.3" },
      { t: "ประมาณ 2 เท่า", why: "ผิด" }, { t: "เท่าเดิม", why: "ผิด: ยิ่งพบช้ายิ่งแพง" }, { t: "ประมาณ 100 เท่า", why: "ผิด: ตัวเลขในสไลด์คือราว 7 เท่า" }], ans: 0 },
    { type: "choice", story: "รีวิว design 60 หน้า พบ minor 24 และ major 6", q: "error density ต่อหน้าเป็นเท่าใด", opts: [
      { t: "0.5", why: "ถูก: (24+6)/60 = 0.5" }, { t: "0.4", why: "ผิด: นับแค่ minor" }, { t: "2.0", why: "ผิด: กลับเศษส่วน" }, { t: "0.1", why: "ผิด: นับแค่ major" }], ans: 0 },
    { type: "choice", story: "ค่าเฉลี่ย density ของ requirement model คือ 0.68 ต่อหน้า เอกสารใหม่ 50 หน้า พบ error เพียง 8", q: "ข้อสรุปที่เหมาะที่สุดคือ", opts: [
      { t: "คาดว่าควรพบราว 34 จึงต้องตรวจว่าเอกสารดีมากหรือรีวิวไม่ละเอียด", why: "ถูก: 50 x 0.68 = 34" },
      { t: "รีวิวสมบูรณ์แล้วแน่นอน", why: "ผิด: ตัวเลขต่ำกว่าคาดมาก ยังสรุปไม่ได้" },
      { t: "เอกสารแย่มาก", why: "ผิด: พบน้อยกว่าคาด" },
      { t: "คาดว่าควรพบ 8 พอดี", why: "ผิด: คำนวณผิด" }], ans: 0 },
    { type: "choice", story: "minor error แก้ใช้ 3 ชม., major 15 ชม., minor เกิดบ่อยกว่า major 5 เท่า และการแก้ตอน testing ใช้ 40 ชม./error พบ 12 errors ตอนรีวิว", q: "แรงที่ประหยัดได้ประมาณเท่าใด", opts: [
      { t: "420 ชม.", why: "ถูก: E = (5x3+15)/6 = 5; ประหยัด (40-5)x12 = 420" },
      { t: "480 ชม.", why: "ผิด: ลืมหักแรงรีวิว (40x12)" },
      { t: "372 ชม.", why: "ผิด: ใช้ค่าเฉลี่ยธรรมดา 9 ชม. ซึ่งไม่ถ่วงน้ำหนัก" },
      { t: "60 ชม.", why: "ผิด: นั่นคือแรงรีวิวรวม" }], ans: 0 },
    { type: "choice", q: "ปัญหาด้านความปลอดภัยที่เกิดจากการออกแบบสถาปัตยกรรมผิด เรียกว่า", opts: [
      { t: "flaw", why: "ถูก: flaw คือปัญหาระดับ architecture/design" }, { t: "bug", why: "ผิด: bug คือปัญหา implementation" }, { t: "minor error", why: "ผิด" }, { t: "appraisal cost", why: "ผิด" }], ans: 0 },
    { type: "multi", q: "ข้อใดถูกเกี่ยวกับ software review", opts: [
      { t: "ช่วยลด rework ในช่วงท้ายโครงการ", ok: true, why: "จึงประหยัดเวลา" },
      { t: "การแก้ error ทำในที่ประชุมรีวิว", ok: false, why: "การแก้ทำนอกการรีวิว" },
      { t: "รีวิวมากเกินไปทำให้ workflow ช้า", ok: true, why: "เหมือนตัวกรองที่ถี่เกิน" },
      { t: "ใช้ได้กับ requirement, design, code และ test data", ok: true, why: "ใช้กับ work product ทุกประเภท" }] },
    { type: "choice", story: "บริษัท startup เล็กอยากปล่อยแอปทั้งที่รู้ว่ามีบั๊กจ่ายเงินผิด", q: "คำเตือนที่ตรงกับสไลด์ที่สุดคือ", opts: [
      { t: "เสี่ยงชื่อเสียงเสียถาวรและอาจไม่มี version 2.0", why: "ถูก" },
      { t: "ปลอดภัยเสมอเพราะ time to market สำคัญกว่า", why: "ผิด: เหมาะกับบางบริบทเท่านั้น" },
      { t: "ต้องรอให้สมบูรณ์ 100% ก่อน", why: "ผิด: นั่นคืออีกขั้วของ dilemma" },
      { t: "เป็นปัญหาเฉพาะซอฟต์แวร์อวกาศ", why: "ผิด" }], ans: 0 }
  ]
});
})();
