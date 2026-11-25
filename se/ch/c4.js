(function () {
const F = (n, c) => `<figure><img src="i/${n}.webp" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`;
IOT.reg({
  id: "c4",
  title: "Software Testing Strategies",
  th: "V&V, unit และ integration testing, OO/Web/Mobile, validation, system testing และ debugging",
  summary: `
<ul>
<li>ทดสอบจาก<b>เล็กไปใหญ่</b>: unit, integration, validation, system</li>
<li><b>Verification</b> = สร้างผลิตภัณฑ์ถูกวิธีไหม; <b>Validation</b> = สร้างถูกอันไหม</li>
<li><b>Driver</b> เรียกโมดูลที่ถูกทดสอบ, <b>Stub</b> แทนโมดูลที่ถูกเรียก</li>
<li>Top-down (depth/breadth, ใช้ stub), bottom-up (cluster, ใช้ driver), sandwich ผสม, smoke = daily build, regression = รันซ้ำกันผลข้างเคียง</li>
<li>OO integration: thread-based, use-based; alpha ที่ผู้พัฒนา, beta ที่ผู้ใช้</li>
<li>System: recovery, security, stress/sensitivity, performance, deployment</li>
<li>Debugging: brute force, backtracking, cause elimination</li>
</ul>`,
  sections: [
    { t: "กลยุทธ์การทดสอบและ V&V", ref: "ชุดที่ 13.2 สไลด์ 5-12", html: `
<p>กลยุทธ์คือ road map: ขั้นตอน เวลา แรง และทรัพยากร ต้องครอบคลุม planning, design test case, execution และเก็บประเมินผล โดย<b>ยืดหยุ่น</b>พอปรับได้ แต่<b>เคร่ง</b>พอให้วางแผนและติดตามได้ ผู้กำหนดคือ project manager, วิศวกร และผู้เชี่ยวชาญ ผลผลิตคือ <b>Test Specification</b> (plan + procedure)</p>
<ul><li>ทำ technical review ก่อน จะลด error ก่อนทดสอบ</li><li>เริ่มระดับ component แล้วขยายออก</li><li>เทคนิคต่างกันตามแนวทางและช่วงเวลา</li><li>ผู้พัฒนาทดสอบ และงานใหญ่มี independent test group (ITG)</li><li><b>Testing กับ debugging คนละเรื่อง</b> แต่กลยุทธ์ต้องรองรับ debugging</li></ul>
<table><tr><th>Verification</th><th>Validation</th></tr><tr><td>โค้ดทำฟังก์ชันถูกไหม: <i>Are we building the product right?</i></td><td>ตรง requirement ลูกค้าไหม: <i>Are we building the right product?</i></td></tr></table>
<div class="must"><b>ต้องจำ</b> ทดสอบใส่คุณภาพเข้าไปไม่ได้ ถ้าไม่มีก่อนทดสอบ จบแล้วก็ไม่มี</div>
<h4>ใครทดสอบ</h4>
<ul><li>วิเคราะห์ ออกแบบ เขียนโค้ด เป็นงาน<b>สร้าง</b>; ทดสอบ (เชิงจิตวิทยา) เป็นงาน<b>ทำลาย</b></li>
<li>Developer เข้าใจระบบ แต่ทดสอบเบามือ ถูกกดดันเรื่องส่งมอบ; ผู้ทดสอบอิสระต้องเรียนรู้ระบบ แต่พยายาม "ทำให้พัง" เพื่อคุณภาพ</li>
<li>ความเข้าใจผิด: developer ไม่ควรทดสอบเลย, โยนข้ามกำแพงให้คนแปลกหน้า, tester เข้ามาตอนใกล้ทดสอบเท่านั้น</li>
<li>ITG ร่วมตั้งแต่ analysis/design ตลอดโครงการ</li></ul>` },
    { t: "ภาพใหญ่: Spiral, 4 ขั้นตอน และเกณฑ์จบ", ref: "ชุดที่ 13.2 สไลด์ 13-18", html: `
${F("d5p04a", "มองกระบวนการเป็น spiral: พัฒนาหมุนเข้าใน ทดสอบหมุนออกนอก")}
<ul><li>พัฒนา: system engineering, requirements, design, coding (หมุนเข้าใน abstraction ลดลง)</li><li>ทดสอบ: <b>unit</b> (กลาง), <b>integration</b> (สถาปัตยกรรม), <b>validation</b> (requirement), <b>system</b> (ทั้งระบบ) หมุนออก</li></ul>
${F("d5p04c", "ลำดับการทดสอบ 4 ขั้น")}
<h4>ทดสอบพอแล้วเมื่อไร</h4>
<p>ไม่มีคำตอบตายตัว ("ไม่มีวันจบ แค่ผู้ใช้รับช่วงต่อ" หรือ "จบเมื่อเวลาหรือเงินหมด") ทางที่ดีคือเก็บ metrics ใช้แบบจำลองสถิติ</p>
<p><b>Tom Gilb</b>: กำหนด requirement แบบวัดได้ล่วงหน้า, ระบุเป้าทดสอบชัด, ทำ user profile, เน้น rapid cycle testing, สร้างซอฟต์แวร์ที่ทดสอบตัวเอง (antibugging), ใช้ review เป็นตัวกรอง, รีวิว test strategy และ test case, ปรับปรุงต่อเนื่อง</p>` },
    { t: "Unit Testing", ref: "ชุดที่ 13.2 สไลด์ 19-25", html: `
<p>ตรวจหน่วยเล็กสุด (component / module) เน้นตรรกะภายในและโครงสร้างข้อมูล ทำขนานหลาย component ได้</p>
${F("d5p06a", "สิ่งที่ unit test ตรวจ")}
<ul><li><b>Interface</b> ข้อมูลเข้าออกถูกต้อง (ทดสอบก่อนอย่างอื่น)</li><li><b>Local data structures</b> คงความถูกต้อง</li><li><b>Independent paths</b> ทุก statement ถูกรันอย่างน้อยครั้ง</li><li><b>Boundary conditions</b> ซอฟต์แวร์พังบ่อยที่ขอบ: element ที่ n, รอบ loop ที่ i, ค่า max/min: ทดสอบ <b>ต่ำกว่า ตรง และสูงกว่า</b></li><li><b>Error-handling paths</b> (antibugging) ต้องทดสอบ</li></ul>
<p>ข้อผิดของ error handling: ข้อความอ่านไม่รู้เรื่อง, ไม่ตรงกับ error จริง, ระบบแทรกก่อน handler, ประมวลผล exception ผิด, ข้อมูลไม่พอหาต้นเหตุ</p>
${F("d5p07a", "Driver และ stub รอบโมดูลที่ถูกทดสอบ")}
<div class="must"><b>ต้องจำ</b> <b>Driver</b> = main program รับ test data ส่งเข้าโมดูลแล้วพิมพ์ผล; <b>Stub</b> = dummy แทนโมดูลลูก ใช้ interface เดียวกัน ทำงานขั้นต่ำ ทั้งสองคือ overhead</div>` },
    { t: "Integration, Regression, Smoke", ref: "ชุดที่ 13.2 สไลด์ 26-36", html: `
<p>หา error ของ interface ใช้แบบ <b>incremental</b>: แยกและแก้ error ง่าย ทดสอบ interface ครบกว่า</p>
${F("d5p07d", "Top-down แบบ depth-first")}
<ul><li><b>Depth-first</b>: ไล่ตามเส้นทางควบคุมหลักก่อน เช่น M1, M2, M5 แล้ว M8 (หรือ M6)</li><li><b>Breadth-first</b>: ทีละชั้นแนวนอน เช่น M2, M3, M4 ก่อน M5, M6</li></ul>
${F("d5p08b", "Top-down 5 ขั้น: แทน stub ทีละตัวด้วยของจริง")}
<ol><li>โมดูลบนสุดเป็น driver, แทนลูกตรงด้วย stub</li><li>แทน stub ทีละตัว (depth หรือ breadth)</li><li>ทดสอบเมื่อรวมแต่ละตัว</li><li>จบชุดหนึ่งจึงแทน stub ถัดไป</li><li>regression test กัน error ใหม่ แล้ววนจากข้อ 2</li></ol>
${F("d5p08c", "Bottom-up เริ่มจากโมดูลล่างสุด")}
${F("d5p08d", "Bottom-up ใช้ cluster และ driver")}
<ol><li>รวมโมดูลล่างเป็น cluster (build) ตาม sub-function</li><li>เขียน driver คุม input/output</li><li>ทดสอบ cluster</li><li>ถอด driver แล้วรวม cluster ขึ้นบน</li></ol>
<p>Bottom-up <b>ไม่ต้องใช้ stub</b> และยิ่งสูงยิ่งใช้ driver น้อยลง</p>
${F("d5p09a", "Sandwich: บนใช้ top-down ล่างใช้ bottom-up")}
<ul><li><b>Regression testing</b>: รันชุดทดสอบเดิมบางส่วนซ้ำเมื่อมีการเปลี่ยน กันผลข้างเคียง ทำมือหรือ capture/playback อัตโนมัติ</li><li><b>Smoke testing</b> (BVT, confidence testing): สำหรับ daily build ของงานเร่ง หา <b>show stopper</b> ที่ทำให้ build ใช้ไม่ได้; รวมกับ build อื่นแล้วทดสอบทุกวัน</li></ul>` },
    { t: "OO, WebApp, MobileApp", ref: "ชุดที่ 14.1 สไลด์ 5-14", html: `
<ul><li>เริ่มจากตรวจความถูกต้องของ analysis/design model</li><li>หน่วยทดสอบคือ <b>class</b>; method ทดสอบเดี่ยวไม่ได้ ต้องทดสอบในบริบทของคลาส เช่น operation X ที่สืบทอดต้องทดสอบใน<b>ทุก subclass</b></li><li>class testing ขับด้วย operation และ state behavior</li></ul>
${F("d6p02b", "OO ไม่มีลำดับชั้นควบคุมชัดเจน top-down/bottom-up จึงมีความหมายน้อย")}
<table><tr><th>กลยุทธ์</th><th>วิธี</th></tr><tr><td><b>Thread-based</b></td><td>รวมคลาสที่ตอบ input/event หนึ่ง ทดสอบทีละ thread แล้ว regression</td></tr><tr><td><b>Use-based</b></td><td>เริ่ม independent class (ใช้ server class น้อย) แล้วชั้น dependent</td></tr><tr><td><b>Cluster testing</b></td><td>ทดสอบกลุ่มคลาสที่ร่วมมือกัน</td></tr></table>
<p>driver ใช้ทดสอบ operation/กลุ่มคลาส หรือแทน UI; stub แทนคลาสร่วมมือที่ยังไม่เสร็จ</p>
<h4>WebApp</h4><p>รีวิว content, interface, design (navigation); ทดสอบ UI, unit ของ functional component, navigation, compatibility, security, performance และให้ผู้ใช้กลุ่มควบคุมทดสอบ</p>
<h4>MobileApp</h4><p>user-experience, device compatibility, performance (ดาวน์โหลด, CPU, ที่เก็บ, แบต), connectivity (เครือข่ายอ่อน/หลุด), security/privacy, testing-in-the-wild, certification ของ app store</p>` },
    { t: "Validation และ System Testing", ref: "ชุดที่ 14.1 สไลด์ 15-25", html: `
<p><b>Validation</b> หา error ระดับ requirement ที่ผู้ใช้เห็นชัด รวม <b>configuration review</b> (audit) ว่าองค์ประกอบครบและจัดหมวด</p>
${F("d6p04b", "Alpha และ beta testing")}
<table><tr><th></th><th>Alpha</th><th>Beta</th></tr><tr><td>ที่</td><td>ไซต์ผู้พัฒนา</td><td>ไซต์ผู้ใช้</td></tr><tr><td>ผู้พัฒนา</td><td>ดูอยู่ข้างหลัง</td><td>ปกติไม่อยู่</td></tr><tr><td>สภาพแวดล้อม</td><td>ควบคุม</td><td>ไม่ควบคุม, ผู้ใช้รายงานเป็นระยะ</td></tr></table>
<p><b>Customer acceptance testing</b>: beta แบบสัญญาจ้าง ลูกค้าทดสอบก่อนรับ อาจใช้เป็นวันหรือสัปดาห์</p>
<h4>System testing (รวมกับ hardware, คน, ข้อมูล)</h4>
<table><tr><th>ชนิด</th><th>ตรวจ</th></tr><tr><td>Recovery</td><td>บังคับให้ล้มแล้วกู้คืนถูกต้อง; อัตโนมัติตรวจ checkpoint, restart; ใช้คนดู MTTR</td></tr><tr><td>Security</td><td>กันเจาะ; ทำให้ค่าเจาะแพงกว่ามูลค่าข้อมูล</td></tr><tr><td>Stress</td><td>ใช้ทรัพยากรผิดปกติเพื่อพังระบบ เช่น interrupt 10 ครั้ง/วินาที เมื่อปกติ 1-2</td></tr><tr><td>Sensitivity</td><td>ช่วงข้อมูลเล็ก ๆ ในช่วง valid ที่ทำให้ผิดหรือช้ามาก</td></tr><tr><td>Performance</td><td>เวลารัน ทำทุกขั้น มักคู่กับ stress</td></tr><tr><td>Deployment</td><td>ทุกสภาพแวดล้อม, installer และเอกสาร (configuration testing)</td></tr></table>` },
    { t: "Debugging", ref: "ชุดที่ 14.1 สไลด์ 26-32", html: `
<p>Debugging เกิดหลังการทดสอบ<b>สำเร็จ</b> (พบ error) คือเชื่อม symptom กับ cause</p>
${F("d6p06b", "กระบวนการ debugging: หาเจอแล้วแก้ หรือสงสัยแล้วสร้าง test พิสูจน์")}
${F("d6p06c", "แรงงานแบ่งเป็นวินิจฉัยหาสาเหตุ กับแก้และ regression")}
${F("d6p06d", "ทำไม debugging ยาก")}
<ul><li>symptom กับ cause อยู่ห่างกัน, หายชั่วคราวเมื่อแก้อย่างอื่น, เกิดจากสิ่งที่ไม่ใช่ error (เช่นปัดเศษ), compiler, สมมติฐานผิด, อาการมาเป็นช่วง ๆ</li></ul>
<table><tr><th>กลยุทธ์</th><th>ลักษณะ</th></tr><tr><td><b>Brute force</b></td><td>dump, trace, print เยอะ ใช้บ่อยสุดแต่ได้ผลน้อย</td></tr><tr><td><b>Backtracking</b></td><td>ไล่โค้ดย้อนจากจุดอาการ เหมาะโปรแกรมเล็ก</td></tr><tr><td><b>Cause elimination</b></td><td>induction/deduction, binary partitioning ตั้งสมมติฐานแล้วพิสูจน์หรือตัดสาเหตุ</td></tr></table>
<div class="warn"><b>ก่อนแก้ ถาม 3 ข้อ</b> สาเหตุซ้ำที่อื่นไหม, การแก้จะก่อบั๊กใหม่ไหม (ดู coupling), ป้องกันตั้งแต่แรกได้อย่างไร</div>
<p>ข้อคิดสุดท้าย: คิดก่อนทำ, ใช้เครื่องมือ, ติดก็ขอความช่วยเหลือ, แก้แล้ว regression test</p>` }
  ],
  ex: [
    { type: "choice", story: "ทีมถามว่า \"ระบบคิดภาษีตรงตามสูตรใน spec ไหม แต่ลูกค้าต้องการระบบคิดส่วนลด\"", q: "การตรวจว่า \"สร้างถูกอันไหม\" คือ", opts: [{ t: "Validation", why: "ถูก" }, { t: "Verification", why: "ผิด: ตรวจว่าสร้างถูกวิธี" }, { t: "Smoke testing", why: "ผิด" }, { t: "Debugging", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "ทดสอบโมดูล B ซึ่งถูก A เรียก และ B เรียก C ที่ยังไม่เสร็จ", q: "ต้องเตรียมอะไร", opts: [{ t: "driver แทน A และ stub แทน C", why: "ถูก" }, { t: "stub แทน A และ driver แทน C", why: "ผิด: สลับกัน" }, { t: "driver 2 ตัว", why: "ผิด" }, { t: "ไม่ต้องมีอะไร", why: "ผิด: component ไม่ทำงานเดี่ยว" }], ans: 0 },
    { type: "choice", story: "ช่องป้อนคะแนนรับ 0 ถึง 100", q: "ชุดค่าทดสอบ boundary ที่เหมาะสุดคือ", opts: [{ t: "-1, 0, 1, 99, 100, 101", why: "ถูก: ต่ำกว่า ตรง สูงกว่าขอบทั้งสอง" }, { t: "50, 60, 70", why: "ผิด: อยู่กลางช่วง" }, { t: "0, 100", why: "ผิด: ไม่ทดสอบนอกช่วง" }, { t: "-1000, 1000", why: "ผิด: ไม่ตรวจที่ขอบ" }], ans: 0 },
    { type: "match", q: "จับคู่กลยุทธ์ integration", pairs: [["แทน stub ทีละตัวจากบนลงล่าง", "Top-down"], ["รวมเป็น cluster แล้วใช้ driver", "Bottom-up"], ["บนลงล่างผสมล่างขึ้นบน", "Sandwich"], ["daily build หา show stopper", "Smoke"]] },
    { type: "choice", story: "โครงสร้าง M1 มีลูก M2, M3, M4 และ M2 มีลูก M5, M6 และ M5 มีลูก M8", q: "breadth-first จะรวมอะไรต่อจาก M1", opts: [{ t: "M2, M3, M4", why: "ถูก" }, { t: "M2, M5, M8", why: "ผิด: นั่นคือ depth-first" }, { t: "M8, M5, M6", why: "ผิด: เริ่มจากล่าง" }, { t: "M3, M6", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "แก้บั๊กหน้าชำระเงินแล้วหน้าตะกร้าพัง โดยทีมไม่รู้จนลูกค้าแจ้ง", q: "กิจกรรมที่ขาดคือ", opts: [{ t: "Regression testing", why: "ถูก" }, { t: "Alpha testing", why: "ผิด" }, { t: "Configuration review", why: "ผิด" }, { t: "Cluster testing", why: "ผิด" }], ans: 0 },
    { type: "choice", q: "ลูกค้าใช้โปรแกรมที่สำนักงานตัวเอง ไม่มีผู้พัฒนาอยู่ และรายงานปัญหาเป็นระยะ", opts: [{ t: "Beta testing", why: "ถูก" }, { t: "Alpha testing", why: "ผิด: ทำที่ผู้พัฒนา" }, { t: "Unit testing", why: "ผิด" }, { t: "Stress testing", why: "ผิด" }], ans: 0 },
    { type: "match", q: "จับคู่ system test กับสถานการณ์", pairs: [["ถอดสาย DB แล้วดูว่ากู้เองได้", "Recovery"], ["ยิงคำขอ 20 เท่าของปกติ", "Stress"], ["พบค่าบางช่วงที่ valid ทำให้ช้ามาก", "Sensitivity"], ["ลองติดตั้งบนหลาย OS พร้อมคู่มือ", "Deployment"]] },
    { type: "choice", story: "คลาส Shape มี operation area() และ subclass Circle, Square สืบทอด", q: "ควรทดสอบ area() อย่างไร", opts: [{ t: "ทดสอบในบริบทของแต่ละ subclass", why: "ถูก" }, { t: "ทดสอบครั้งเดียวใน Shape แบบเดี่ยว", why: "ผิด: บริบทต่างกัน" }, { t: "ไม่ต้องทดสอบเพราะสืบทอด", why: "ผิด" }, { t: "ทดสอบด้วย top-down เท่านั้น", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "รู้ว่าบั๊กอยู่ในข้อมูล 1,000 แถว ทีมแบ่งครึ่งทดสอบซ้ำจนเหลือแถวเดียว", q: "ใช้กลยุทธ์ใด", opts: [{ t: "Cause elimination (binary partitioning)", why: "ถูก" }, { t: "Brute force", why: "ผิด" }, { t: "Backtracking", why: "ผิด: ไล่โค้ดย้อน" }, { t: "Smoke testing", why: "ผิด" }], ans: 0 },
    { type: "multi", q: "ก่อนแก้บั๊กควรถามอะไร", opts: [{ t: "สาเหตุนี้เกิดซ้ำที่อื่นหรือไม่", ok: true, why: "ตามสไลด์" }, { t: "การแก้จะสร้างบั๊กใหม่หรือไม่", ok: true, why: "ดู coupling" }, { t: "ป้องกันตั้งแต่แรกได้อย่างไร", ok: true, why: "ปรับ process" }, { t: "ใครเป็นคนเขียนบั๊กเพื่อลงโทษ", ok: false, why: "ไม่ใช่ในสไลด์และไม่ช่วย" }] }
  ]
});
})();
