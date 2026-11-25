(function () {
const F = (n, c) => `<figure><img src="i/${n}.webp" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`;
IOT.reg({
  id: "c2",
  title: "Software Quality Assurance (SQA)",
  th: "องค์ประกอบและงานของ SQA, statistical SQA, Six Sigma, reliability และ ISO 9000",
  summary: `
<ul>
<li>SQA = process + งาน QA/QC (review, testing หลายชั้น) + practice + ควบคุม work product และ change + ปฏิบัติตามมาตรฐาน + วัดผลและรายงาน</li>
<li><b>Review</b> = QC โดยวิศวกรเพื่อหา error; <b>Audit</b> = โดยบุคลากร SQA เพื่อเช็กว่าทำตามแนวทาง</li>
<li>Statistical SQA: เก็บและจัดหมวด, หาต้นเหตุ, Pareto 80/20 เลือก vital few, แก้</li>
<li>Six Sigma = 3.4 defects ต่อล้าน; <b>DMAIC</b> ปรับปรุง process เดิม, <b>DMADV</b> สร้างใหม่</li>
<li><b>MTBF = MTTF + MTTR</b>; Availability = MTTF/(MTTF+MTTR) x 100%; 1 FIT = 1 failure ต่อ 10<sup>9</sup> ชั่วโมง</li>
</ul>`,
  sections: [
    { t: "SQA คืออะไร", ref: "ชุดที่ 12.1 สไลด์ 5-8", html: `
<h4>จะรับประกันคุณภาพต้องทำ 4 อย่าง</h4>
<ol><li>นิยาม "software quality" ให้ชัด</li><li>สร้างชุดกิจกรรมให้ work product ทุกชิ้นมีคุณภาพ</li><li>ทำ QC และ QA ทุกโครงการ</li><li>ใช้ metrics ปรับปรุง process และผลิตภัณฑ์</li></ol>
<p><b>ผลผลิต</b>: SQA Plan; ตอน modeling/coding ผลหลักคือผลของ technical review; ตอน testing คือ test plan และ procedure</p>
<div class="must"><b>ต้องจำ</b> เป้าหมายคือ <b>หา error ก่อนมันกลายเป็น defect</b> คือเพิ่ม defect removal efficiency</div>
<p><b>SQA ครอบคลุม</b>: SQA process, งาน QA/QC เฉพาะ, SE practice (วิธีและเครื่องมือ), ควบคุม work product และการเปลี่ยนแปลง, ปฏิบัติตามมาตรฐาน, การวัดและรายงาน</p>` },
    { t: "Elements of SQA", ref: "ชุดที่ 12.1 สไลด์ 8-16", html: `
<table><tr><th>องค์ประกอบ</th><th>บทบาท</th></tr>
<tr><td>Standards</td><td>มาตรฐาน IEEE, ISO ที่รับใช้หรือถูกกำหนด ต้องทำตาม</td></tr>
<tr><td>Reviews and audits</td><td>review หา error (โดยวิศวกร), audit ตรวจการทำตามแนวทาง (โดย SQA)</td></tr>
<tr><td>Testing</td><td>QC ที่เป้าหมายหลักคือ <b>หา error</b>; SQA ดูว่าวางแผนและทำอย่างมีประสิทธิภาพ</td></tr>
<tr><td>Error/defect collection</td><td>เก็บและวิเคราะห์ว่า error เกิดอย่างไร กิจกรรมไหนกำจัดได้ดี</td></tr>
<tr><td>Change management</td><td>การเปลี่ยนแปลงที่ไม่จัดการ ทำให้สับสนและคุณภาพตก</td></tr>
<tr><td>Education</td><td>อบรมวิศวกร ผู้จัดการ stakeholder; SQA เป็นผู้ผลักดัน</td></tr>
<tr><td>Vendor management</td><td>ซอฟต์แวร์จากภายนอก 3 แบบ: shrink-wrapped, tailored shell, contracted; ใส่ข้อกำหนดคุณภาพในสัญญา</td></tr>
<tr><td>Security management</td><td>นโยบายปกป้องข้อมูล firewall และกันการดัดแปลงภายใน</td></tr>
<tr><td>Safety</td><td>ประเมินผลกระทบของความล้มเหลวในระบบที่มีคนเกี่ยวข้อง (รถ, เครื่องบิน)</td></tr>
<tr><td>Risk management</td><td>ดูว่ากิจกรรมจัดการความเสี่ยงและ contingency plan ทำถูกต้อง</td></tr></table>
<p>นอกจากนี้ SQA ดูแลคุณภาพงาน support ด้วย (maintenance, help line, เอกสาร, คู่มือ)</p>` },
    { t: "SQA Tasks, Goals และ Metrics", ref: "ชุดที่ 12.1 สไลด์ 14-22", html: `
${F("d2p04b", "SQA เป็นกระบวนการขับด้วยข้อมูล: ตั้งเป้า วัด หาปัญหา ตัดสินใจปรับ process")}
<h4>งานของกลุ่ม SQA อิสระ (SEI แนะนำ)</h4>
<ul><li>จัดทำ SQA plan: ระบุการประเมิน, audit และ review, มาตรฐาน, วิธีรายงานและติดตาม error, เอกสาร, feedback</li>
<li>ร่วมจัดทำคำอธิบาย process และตรวจว่าตรงนโยบายและมาตรฐาน (เช่น ISO 9001)</li>
<li>รีวิวกิจกรรมว่าทำตาม process; <b>audit</b> work product ที่กำหนด</li>
<li>บันทึกและติดตาม deviation; รายงาน noncompliance ถึงผู้บริหารระดับสูงจนกว่าจะแก้</li></ul>
<h4>เป้าหมาย 4 ด้าน</h4>
<ul><li><b>Requirements quality</b>: ถูกต้อง ครบ สอดคล้อง มีผลต่องานถัดไปทั้งหมด</li>
<li><b>Design quality</b>: ทุกส่วนของ design model ตรง requirement</li>
<li><b>Code quality</b>: ตรง coding standard และดูแลรักษาง่าย</li>
<li><b>QC effectiveness</b>: ใช้ทรัพยากรจำกัดให้คุ้มที่สุด</li></ul>
${F("d2p05d", "เป้าหมาย คุณลักษณะ และ metrics ของ requirement และ design")}
${F("d2p06a", "เป้าหมายและ metrics ของ code quality และ QC effectiveness")}` },
    { t: "Statistical SQA และ Six Sigma", ref: "ชุดที่ 12.1 สไลด์ 22-30", html: `
<ol><li>เก็บและจัดหมวด error/defect</li><li>สืบหาต้นเหตุ (เช่น ผิด spec, design ผิด, ละเมิดมาตรฐาน, สื่อสารกับลูกค้าแย่)</li><li>ใช้ <b>Pareto</b> 80% ของ defect มาจาก 20% ของสาเหตุ แยก <b>vital few</b></li><li>แก้สาเหตุเหล่านั้น</li></ol>
<p>รหัสสาเหตุ: IES (spec ไม่ครบหรือผิด), MCC (ตีความลูกค้าผิด), IDS (จงใจเบี่ยงจาก spec), VPS (ละเมิดมาตรฐานเขียนโปรแกรม), EDR (แทนข้อมูลผิด), ICI (interface ไม่สอดคล้อง), EDL (ตรรกะออกแบบผิด), IET (ทดสอบไม่ครบ), IID (เอกสารผิด), PLT (แปล design เป็นภาษาโปรแกรมผิด), HCI (ส่วนติดต่อกำกวม), MIS (อื่น ๆ)</p>
${F("d2p07a", "ตาราง statistical SQA: IES, MCC, EDR เป็น vital few รวม 53%")}
<ul><li>เฉพาะ error ร้ายแรง vital few คือ IES, EDR, PLT, EDL</li>
<li>แก้ MCC ด้วยเทคนิครวบรวม requirement ที่ดีขึ้น; แก้ EDR ด้วยเครื่องมือ data modeling และรีวิว data design เข้มขึ้น</li>
<li>เมื่อแก้ vital few แล้ว สาเหตุใหม่จะขึ้นมาแทน</li></ul>
<h4>Six Sigma</h4>
<p>ลดความแปรปรวนและสาเหตุ defect; เป็นส่วนของ TQM; 6 sigma = <b>3.4 defects ต่อล้านโอกาส</b></p>
<table><tr><th>DMAIC (ปรับปรุงของเดิม)</th><th>DMADV (สร้างใหม่)</th></tr>
<tr><td>Define, Measure, Analyze (หา vital few), <b>Improve</b> (กำจัดรากเหง้า), <b>Control</b> (ไม่ให้กลับมา)</td><td>Define, Measure, Analyze, <b>Design</b> (เลี่ยงรากเหง้า ตรง requirement), <b>Verify</b></td></tr></table>` },
    { t: "Reliability, Availability, Safety, ISO 9000", ref: "ชุดที่ 12.1 สไลด์ 30-35", html: `
<p><b>Reliability</b> = ความน่าจะเป็นที่โปรแกรมทำงานโดยไม่ล้มเหลว ในสภาพแวดล้อมที่กำหนด ตลอดเวลาที่กำหนด เช่น 0.999 ใน 8 ชม. execution คือคาดว่ารัน 1000 ครั้งสำเร็จ 999</p>
<ul><li><b>MTBF = MTTF + MTTR</b> (mean time to failure + mean time to repair) นับ <b>CPU time</b> ไม่ใช่เวลานาฬิกา</li>
<li>ข้อจำกัด MTBF: ไม่บอกอัตรา failure ในอนาคต และมักเข้าใจผิดว่าคืออายุเฉลี่ย</li>
<li><b>FIT</b> = จำนวน failure ต่อ 1 พันล้านชั่วโมง</li>
<li><b>Availability</b> = MTTF / (MTTF + MTTR) x 100% ไวต่อ MTTR (สะท้อน maintainability) กว่า MTBF; downtime ตามแผนก็ลด availability ได้</li></ul>
<div class="must"><b>ต้องจำ</b> MTTF 98 ชม., MTTR 2 ชม. จะได้ MTBF 100 ชม. และ availability 98%</div>
<h4>Software Safety</h4>
<p>ระบุและประเมิน <b>hazard</b> ที่อาจทำให้ทั้งระบบล้ม ยิ่งพบเร็ว ยิ่งออกแบบเพื่อกำจัดหรือควบคุมได้</p>
<h4>ISO 9000</h4>
<p>กำหนดองค์ประกอบ QA แบบใช้ได้กับธุรกิจใดก็ได้ ISO 9001:2015 ครอบคลุมความรับผิดชอบผู้บริหาร, quality system, design control, document control, traceability, process control, inspection and testing, corrective/preventive action, audit, training ฯลฯ องค์กรต้องมีนโยบายและแสดงได้ว่าทำตามจึงจะจดทะเบียน (สไลด์ระบุว่า ISO 9001:2026 คาดว่าออกปลายปี 2026)</p>` }
  ],
  ex: [
    { type: "choice", q: "การที่ทีม SQA ตรวจว่าโครงการทำตาม coding standard ที่รับมาหรือไม่ เรียกว่า", opts: [
      { t: "Audit", why: "ถูก: audit ทำโดย SQA เพื่อตรวจการทำตามแนวทาง" }, { t: "Technical review", why: "ผิด: เป็นงานของวิศวกรเพื่อหา error" }, { t: "Stress testing", why: "ผิด" }, { t: "Vendor management", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "ระบบมี MTTF = 198 ชั่วโมง และ MTTR = 2 ชั่วโมง", q: "MTBF และ availability เป็นเท่าใด", opts: [
      { t: "200 ชม. และ 99%", why: "ถูก: 198+2 = 200; 198/200 = 99%" }, { t: "196 ชม. และ 99%", why: "ผิด: ต้องบวก" }, { t: "200 ชม. และ 98%", why: "ผิด: คำนวณเปอร์เซ็นต์ผิด" }, { t: "198 ชม. และ 100%", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "ระบบ A: MTTF 900, MTTR 100 ชม. ระบบ B: MTTF 450, MTTR 10 ชม.", q: "ระบบใด availability สูงกว่า", opts: [
      { t: "B (ประมาณ 97.8%)", why: "ถูก: A = 90%, B = 450/460 = 97.8%" }, { t: "A เพราะ MTTF สูงกว่า", why: "ผิด: MTTR ของ A สูงมาก" }, { t: "เท่ากัน", why: "ผิด" }, { t: "บอกไม่ได้เพราะไม่มี FIT", why: "ผิด: คำนวณได้จาก MTTF และ MTTR" }], ans: 0 },
    { type: "choice", story: "อุปกรณ์มีค่า 500 FIT", q: "หมายความว่า", opts: [
      { t: "คาดว่า 500 failures ต่อ 1 พันล้านชั่วโมงใช้งาน", why: "ถูก" }, { t: "เสียทุก 500 ชั่วโมง", why: "ผิด" }, { t: "availability 50%", why: "ผิด" }, { t: "500 defects ต่อล้านบรรทัด", why: "ผิด" }], ans: 0 },
    { type: "multi", q: "ข้อใดเป็นส่วนของ DMAIC แต่ไม่ใช่ DMADV", opts: [
      { t: "Improve", ok: true, why: "DMAIC" }, { t: "Control", ok: true, why: "DMAIC" }, { t: "Design", ok: false, why: "DMADV" }, { t: "Verify", ok: false, why: "DMADV" }, { t: "Measure", ok: false, why: "มีทั้งสอง" }] },
    { type: "choice", story: "บริษัทกำลังสร้าง process พัฒนาซอฟต์แวร์ใหม่ทั้งหมด", q: "ควรใช้แนวทางใด", opts: [
      { t: "DMADV", why: "ถูก: ใช้เมื่อพัฒนา process ใหม่" }, { t: "DMAIC", why: "ผิด: ใช้ปรับปรุงของเดิม" }, { t: "FIT", why: "ผิด: เป็นหน่วยวัด reliability" }, { t: "PME", why: "ผิด: ประเมินหลังโครงการ" }], ans: 0 },
    { type: "choice", story: "สาเหตุ defect: IES 40, MCC 30, EDR 15, อื่นอีก 8 สาเหตุรวม 15 (ทั้งหมด 100)", q: "ตามหลัก Pareto ควรทำอะไรก่อน", opts: [
      { t: "แก้ IES, MCC และ EDR ซึ่งเป็น vital few (85%)", why: "ถูก" }, { t: "แก้ทุกสาเหตุพร้อมกันเท่า ๆ กัน", why: "ผิด: เปลืองทรัพยากร" }, { t: "แก้ 8 สาเหตุเล็กก่อน", why: "ผิด: ผลกระทบต่ำ" }, { t: "เพิ่มคนทดสอบอย่างเดียว", why: "ผิด: ไม่แก้ต้นเหตุ" }], ans: 0 },
    { type: "match", q: "จับคู่การแก้ไขกับสาเหตุ", pairs: [["ปรับวิธีเก็บ requirement กับลูกค้า", "MCC"], ["ใช้เครื่องมือ data modeling และรีวิว data design", "EDR"], ["บังคับ coding standard", "VPS"], ["เพิ่มการทดสอบให้ครบ", "IET"]] },
    { type: "choice", q: "จุดประสงค์หลักของ software testing ในมุม SQA คือ", opts: [
      { t: "หา error โดยมีการวางแผนและดำเนินการอย่างมีประสิทธิภาพ", why: "ถูก" }, { t: "พิสูจน์ว่าไม่มี error", why: "ผิด: ทดสอบพิสูจน์ความไม่มีไม่ได้" }, { t: "เขียนเอกสารผู้ใช้", why: "ผิด" }, { t: "ลดจำนวน requirement", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "องค์กรซื้อซอฟต์แวร์ที่บริษัทภายนอกเขียนตาม spec ของตนโดยเฉพาะ", q: "SQA ควรทำอะไร", opts: [
      { t: "ใส่ข้อกำหนดคุณภาพในสัญญาและแนะนำ practice ให้ vendor (vendor management)", why: "ถูก" }, { t: "ไม่ต้องทำอะไรเพราะเป็นงานภายนอก", why: "ผิด" }, { t: "ทดสอบเฉพาะหลังมี defect", why: "ผิด" }, { t: "ใช้ DMADV แทนสัญญา", why: "ผิด" }], ans: 0 }
  ]
});
})();
