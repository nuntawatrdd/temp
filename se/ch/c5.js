(function () {
const F = (n, c) => `<figure><img src="i/${n}.webp" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`;
IOT.reg({
  id: "c5",
  title: "Testing Conventional Applications",
  th: "testability, white-box (basis path, loop), black-box (EP, BVA, orthogonal array), model-based และ real-time",
  summary: `
<ul>
<li>Test ที่ดี: โอกาสพบ error สูง, ไม่ซ้ำซ้อน, ดีที่สุดในกลุ่ม, ไม่ง่ายหรือซับซ้อนเกิน</li>
<li><b>White-box</b> ดูโครงสร้างภายใน; <b>Black-box</b> ดูฟังก์ชันจากภายนอก (ใช้เสริมกัน)</li>
<li><b>V(G) = จำนวน region = E - N + 2 = P + 1</b> คือขอบบนของจำนวน test เพื่อให้ทุก statement ถูกรัน</li>
<li>Loop: 0, 1, 2, m, n-1, n, n+1</li>
<li>EP: range หรือค่าเฉพาะ = 1 valid 2 invalid; member หรือ Boolean = 1 valid 1 invalid; BVA ทดสอบที่ขอบ</li>
<li>L9 orthogonal array: 4 พารามิเตอร์ 3 ค่า ใช้ 9 test แทน 81</li>
</ul>`,
  sections: [
    { t: "Testability และ Test ที่ดี", ref: "ชุดที่ 14.2 สไลด์ 5-12", html: `
<p>เป้าหมายการออกแบบ test case: <b>หา error มากที่สุดด้วยแรงน้อยสุด</b>; testability คือทดสอบโปรแกรมได้ง่ายแค่ไหน</p>
<table><tr><th>คุณลักษณะ</th><th>คติ</th></tr>
<tr><td>Operability</td><td>ยิ่งทำงานดี ยิ่งทดสอบมีประสิทธิภาพ</td></tr><tr><td>Observability</td><td>เห็นอะไรก็ทดสอบอันนั้น</td></tr><tr><td>Controllability</td><td>ควบคุมได้มาก อัตโนมัติได้มาก</td></tr><tr><td>Decomposability</td><td>แยกโมดูลทดสอบอิสระ หาปัญหาเร็ว</td></tr><tr><td>Simplicity</td><td>functional, structural, code simplicity</td></tr><tr><td>Stability</td><td>เปลี่ยนน้อย รบกวนการทดสอบน้อย</td></tr><tr><td>Understandability</td><td>ยิ่งมีข้อมูล ยิ่งทดสอบฉลาด</td></tr></table>
<p><b>Test ที่ดี</b>: โอกาสพบ error สูง; ไม่ซ้ำจุดประสงค์; "best of breed" จับ error ได้ทั้งกลุ่ม; ไม่รวมหลาย test จนบัง error ควรรันแยกกัน</p>
${F("d7p04b", "สองมุมมอง: white-box และ black-box")}
<h4>Exhaustive vs selective</h4>
${F("d7p03c", "โปรแกรม 100 บรรทัด loop ซ้อน ทดสอบทุกเส้นทางเป็นไปไม่ได้")}
${F("d7p03d", "จึงเลือกทดสอบเฉพาะเส้นทางที่สำคัญ")}
<div class="note"><b>คติ</b> บั๊กซ่อนตามมุมและรวมตัวที่ขอบ (Beizer): เป้าคือพบ error อย่างครบถ้วนด้วยแรงและเวลาน้อยที่สุด</div>` },
    { t: "White-Box และ Flow Graph", ref: "ชุดที่ 14.2 สไลด์ 15-20", html: `
<p>White-box (glass-box, structural) ใช้ control structure สร้าง test ที่รับประกันว่า: (1) ทุก independent path ถูกรัน (2) ทุกการตัดสินใจทั้ง true และ false (3) ทุก loop ที่ขอบและในช่วง (4) data structure ภายในถูกต้อง</p>
<p><b>Basis path testing</b> (McCabe): วัดความซับซ้อนเชิงตรรกะ แล้วกำหนด basis set ของเส้นทาง รับประกันว่าทุก statement ถูกรันอย่างน้อยครั้ง</p>
${F("d7p05a", "สัญลักษณ์ flow graph: sequence, if, while, until, case")}
${F("d7p05b", "แปลง flowchart เป็น flow graph")}
${F("d7p05c", "node, edge, region (นับพื้นที่นอกกราฟด้วย)")}
<ul><li>node = หนึ่งหรือหลาย statement; edge ต้องจบที่ node; <b>region</b> รวมพื้นที่ด้านนอก</li><li><b>Compound condition</b> (a OR b): แยกเป็น node ละเงื่อนไข เรียก <b>predicate node</b> (มีเส้นออกตั้งแต่ 2)</li></ul>` },
    { t: "Independent Paths และ Cyclomatic Complexity", ref: "ชุดที่ 14.2 สไลด์ 21-26", html: `
${F("d7p06a", "Independent path ต้องผ่าน edge ใหม่อย่างน้อยหนึ่ง")}
<ul><li>Path 1: 1-11</li><li>Path 2: 1-2-3-4-5-10-1-11</li><li>Path 3: 1-2-3-6-8-9-10-1-11</li><li>Path 4: 1-2-3-6-7-9-10-1-11</li></ul>
<p>เส้นทาง 1-2-3-4-5-10-1-2-3-6-8-9-10-1-11 <b>ไม่ใช่</b> independent เพราะไม่มี edge ใหม่; basis set มีได้หลายชุด</p>
${F("d7p06d", "คำนวณ V(G) สามแบบ")}
<div class="must"><b>ต้องจำ</b> V(G) = จำนวน region = E - N + 2 = P + 1 ตัวอย่างนี้: 4 region, 11 - 9 + 2 = 4, 3 + 1 = <b>4</b></div>
<p>V(G) คือ <b>ขอบบน</b>ของจำนวนเส้นทางใน basis set และจำนวน test ให้ครอบคลุมทุก statement; ใช้วางแผนและทำนายโมดูลเสี่ยง</p>
${F("d7p07b", "ยิ่ง V(G) สูง โอกาสเกิด error ยิ่งสูง")}` },
    { t: "ทำ Test Case จาก Basis Path และ Graph Matrix", ref: "ชุดที่ 15 สไลด์ 5-12", html: `
${F("d8p01d", "ตัวอย่าง procedure average: flow graph และ V(G)")}
<ol><li>วาด flow graph จาก design หรือ code (ใส่เลข statement ใน PDL)</li><li>หา V(G): 6 region = 17 - 13 + 2 = 5 + 1 = <b>6</b> (หรือไม่ต้องวาด: นับเงื่อนไขทั้งหมด compound นับสอง แล้ว +1)</li><li>กำหนด basis set 6 เส้น เช่น 1-2-10-11-13, 1-2-10-12-13, 1-2-3-10-11-13 ... (predicate nodes: 2, 3, 5, 6, 10)</li><li>เลือกข้อมูลให้ผ่านแต่ละเส้น รันและเทียบผลคาดหวัง</li></ol>
<div class="note"><b>หมายเหตุ</b> บางเส้นทดสอบเดี่ยว ๆ ไม่ได้ ต้องทดสอบรวมเป็นส่วนของเส้นอื่น</div>
${F("d8p02d", "Graph matrix: ตารางจัตุรัสขนาดเท่าจำนวน node")}
${F("d8p03a", "ใส่ link weight (1 = เชื่อม, 0 = ไม่เชื่อม)")}
<p>link weight ใส่เป็นความน่าจะเป็นที่ผ่าน, เวลา, หน่วยความจำ หรือทรัพยากร ทำให้วิเคราะห์อัตโนมัติได้</p>` },
    { t: "Control Structure และ Loop Testing", ref: "ชุดที่ 15 สไลด์ 13-16", html: `
<p>Basis path อย่างเดียวไม่พอ มี <b>condition testing</b> (ทดสอบเงื่อนไข), <b>data flow testing</b> (เลือกเส้นตามจุด define และ use ตัวแปร) และ <b>loop testing</b></p>
${F("d8p04a", "Simple loop")}
<p><b>Simple loop</b> (n = รอบสูงสุด): ข้าม loop, 1 รอบ, 2 รอบ, m รอบ (m &lt; n), n-1, n, n+1</p>
${F("d8p04b", "Nested loop: ทดสอบจากชั้นในออกนอก")}
<ol><li>เริ่มวงใน ตั้งวงอื่นค่าต่ำสุด</li><li>ทดสอบแบบ simple (min, min+1, typical, max-1, max) บวกค่านอกช่วง</li><li>ขยับออกทีละวง วงนอกค่าต่ำสุด วงอื่นค่า typical</li><li>จนครบ</li></ol>
<ul><li><b>Concatenated</b>: อิสระกันใช้แบบ simple; ถ้าตัวนับวงแรกเป็นค่าเริ่มของวงสองถือว่าไม่อิสระ ใช้แบบ nested</li><li><b>Unstructured</b>: ควรออกแบบใหม่เป็นโครงสร้าง</li></ul>` },
    { t: "Black-Box: Graph-based, EP, BVA", ref: "ชุดที่ 15 สไลด์ 17-27", html: `
<p>Black-box (behavioral, functional) เน้น functional requirement และ information domain ใช้ช่วงหลังของการทดสอบ หา: ฟังก์ชันผิดหรือขาด, interface, data structure/ฐานข้อมูลภายนอก, behavior/performance, initialization/termination</p>
${F("d8p05c", "Graph-based: node คือ object, link คือความสัมพันธ์")}
<ul><li>node weight และ link weight; <b>directed</b> ทางเดียว, <b>symmetric</b> สองทาง, <b>parallel links</b> หลายความสัมพันธ์</li><li>ตัวอย่าง: เลือกเมนู newFile สร้าง documentWindow ภายใน &lt; 1.0 วินาที แล้วทดสอบครอบคลุมทุกความสัมพันธ์</li></ul>
${F("d8p06b", "Equivalence partitioning แบ่ง input เป็นคลาส")}
<p>equivalence class เกิดเมื่อความสัมพันธ์เป็น symmetric, transitive, reflexive</p>
<table><tr><th>เงื่อนไข input</th><th>valid</th><th>invalid</th></tr><tr><td>ช่วง (range)</td><td>1</td><td>2</td></tr><tr><td>ค่าเฉพาะ</td><td>1</td><td>2</td></tr><tr><td>สมาชิกของเซต</td><td>1</td><td>1</td></tr><tr><td>Boolean</td><td>1</td><td>1</td></tr></table>
${F("d8p07a", "Boundary value analysis")}
<ul><li>ช่วง a ถึง b: ทดสอบ a, b และเหนือ/ใต้เล็กน้อย</li><li>จำนวนค่า: ทดสอบ min, max และรอบ ๆ</li><li>ใช้กับ <b>output</b> ด้วย และขอบของ data structure ภายใน (เช่นตารางจำกัด 100)</li></ul>
<div class="note"><b>Comparison testing</b> งานที่ความน่าเชื่อถือสำคัญมาก: ทีมแยกพัฒนาหลายเวอร์ชันจาก spec เดียว รันขนานเทียบผลแบบ real time (อีกความหมาย: เทียบจุดแข็งอ่อนกับคู่แข่ง)</div>` },
    { t: "Orthogonal Array Testing", ref: "ชุดที่ 15 สไลด์ 28-33", html: `
<p>ใช้เมื่อ input ค่อนข้างเล็กแต่ใหญ่เกินทดสอบครบ เด่นในการหา <b>region fault</b></p>
${F("d8p08a", "สามอินพุตสามค่า มี 27 กรณี")}
${F("d8p08c", "บน: เปลี่ยนทีละค่า ครอบคลุมน้อย; ล่าง: L9 กระจายสม่ำเสมอ (balancing property)")}
<p>ตัวอย่างส่งแฟกซ์: P1-P4 อย่างละ 3 ค่า ครบทุกกรณี 3<sup>4</sup> = <b>81</b> แต่ L9 ใช้ <b>9</b> กรณี; แบบทีละค่า (9 กรณีเช่นกัน) จับได้แค่ fault จากพารามิเตอร์เดียว</p>
${F("d8p09a", "ตาราง L9 สำหรับฟังก์ชันส่ง")}
<ul><li><b>Single mode fault</b>: ถ้าทุก test ที่ P1 = 1 ผิด แปลว่าตรรกะ "send it now" มีปัญหา (แยกต้นเหตุได้)</li><li><b>Double mode fault</b>: ค่าของสองพารามิเตอร์ร่วมกันก่อปัญหา (pairwise incompatibility) จับได้ครบ</li><li><b>Multimode</b>: จับได้มาก</li></ul>` },
    { t: "Model-based, เอกสาร, Real-time และ Patterns", ref: "ชุดที่ 15 สไลด์ 34-47", html: `
<h4>Model-based testing</h4>
<ol><li>วิเคราะห์หรือสร้าง behavioral model (เช่น UML state diagram)</li><li>ไล่ model กำหนด input ให้เปลี่ยน state</li><li>บันทึก output ที่คาด</li><li>รัน (มือหรือ script)</li><li>เทียบผลและแก้</li></ol>
<p>เหมาะกับแอป event-driven</p>
<h4>ทดสอบเอกสารและ help</h4><p>เฟส 1 technical review (ความชัดของภาษา); เฟส 2 <b>live test</b> ใช้เอกสารคู่กับโปรแกรมจริง ใช้ graph-based, EP/BVA, MBT ช่วย</p>
<h4>Real-time</h4><p>มีมิติ<b>เวลา</b>, interrupt, จังหวะข้อมูล และ task ขนาน ข้อมูลเดียวกันใน state ต่างกันอาจผิด เช่น เครื่องถ่ายเอกสารรับปุ่มได้ตอน copying แต่ตอน jammed ทำให้รหัสตำแหน่งกระดาษติดหาย; ต้องคิดผลของ hardware fault ด้วย</p>
<ol><li><b>Task testing</b>: แต่ละ task (พบ logic ไม่พบ timing)</li><li><b>Behavioral testing</b>: จำลองด้วย model ทดสอบทีละ event (user, mechanical, system interrupt, failure mode)</li><li><b>Intertask testing</b>: synchronization, อัตราข้อมูล, ขนาด message queue/data store</li><li><b>System testing</b>: SW+HW เน้น interrupt จาก state diagram</li></ol>
<h4>Testing patterns</h4><ul><li><b>PairTesting</b>: สองคนออกแบบและรัน test ด้วยกัน</li><li><b>SeparateTestInterface</b>: สร้าง interface ทดสอบคลาสภายใน</li><li><b>ScenarioTesting</b>: ทดสอบจากมุมผู้ใช้ ถ้าล้มคือไม่ตอบ requirement ที่ผู้ใช้เห็น</li></ul>` }
  ],
  ex: [
    { type: "choice", story: "flow graph มี E = 14 edges และ N = 11 nodes", q: "V(G) เท่าใด", opts: [{ t: "5", why: "ถูก: 14 - 11 + 2 = 5" }, { t: "3", why: "ผิด: ลืม +2" }, { t: "25", why: "ผิด: บวกกันไม่ได้" }, { t: "4", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "โค้ดมี if 3 จุด while 1 จุด และ if (a AND b) 1 จุด", q: "cyclomatic complexity เท่าใด", opts: [{ t: "7", why: "ถูก: เงื่อนไข 3+1+2 = 6 แล้ว +1" }, { t: "6", why: "ผิด: ลืม +1" }, { t: "5", why: "ผิด: นับ compound เป็นหนึ่งและลืม +1" }, { t: "8", why: "ผิด" }], ans: 0 },
    { type: "choice", q: "flow graph มี predicate node 4 จุด จำนวน region คือ", opts: [{ t: "5", why: "ถูก: V(G) = P + 1 = จำนวน region" }, { t: "4", why: "ผิด" }, { t: "6", why: "ผิด" }, { t: "บอกไม่ได้", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "loop อนุญาตสูงสุด 10 รอบ", q: "ชุดจำนวนรอบที่ครอบคลุม simple loop testing คือ", opts: [{ t: "0, 1, 2, 5, 9, 10, 11", why: "ถูก" }, { t: "1, 5, 10", why: "ผิด: ขาดข้าม loop และรอบเกิน" }, { t: "10, 20, 30", why: "ผิด" }, { t: "0, 10", why: "ผิด: ขาดค่าอื่น" }], ans: 0 },
    { type: "choice", story: "อายุสมัครสมาชิกต้องอยู่ในช่วง 18 ถึง 60", q: "equivalence classes ที่ถูกต้องคือ", opts: [{ t: "valid 18-60; invalid ต่ำกว่า 18 และเกิน 60", why: "ถูก: range ได้ 1 valid 2 invalid" }, { t: "valid ทุกค่า; invalid ไม่มี", why: "ผิด" }, { t: "valid 18-60; invalid เกิน 60 อย่างเดียว", why: "ผิด: ขาดฝั่งต่ำ" }, { t: "valid 18 และ 60 เท่านั้น", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "ช่องจำนวนสินค้ารับ 1 ถึง 99", q: "ชุด BVA ที่ดีที่สุด", opts: [{ t: "0, 1, 2, 98, 99, 100", why: "ถูก" }, { t: "10, 50, 90", why: "ผิด: อยู่กลางช่วง" }, { t: "1, 99", why: "ผิด: ไม่ตรวจนอกช่วง" }, { t: "-50, 500", why: "ผิด: ห่างจากขอบ" }], ans: 0 },
    { type: "choice", story: "ฟังก์ชันมี 4 พารามิเตอร์ พารามิเตอร์ละ 3 ค่า", q: "ทดสอบครบทุกกรณี และ L9 ใช้กี่กรณี", opts: [{ t: "81 และ 9", why: "ถูก" }, { t: "12 และ 9", why: "ผิด: ต้องยกกำลัง" }, { t: "64 และ 8", why: "ผิด" }, { t: "81 และ 27", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "ผล L9 พบว่า error เกิดเฉพาะ test ที่ P2 = 3 ทุกครั้ง", q: "ชนิด fault และการตีความ", opts: [{ t: "single mode fault ที่ตรรกะของ P2 = 3", why: "ถูก" }, { t: "double mode fault", why: "ผิด: ขึ้นกับตัวเดียว" }, { t: "fault ของ driver", why: "ผิด" }, { t: "ไม่ใช่ fault", why: "ผิด" }], ans: 0 },
    { type: "multi", q: "ข้อใดเป็นสิ่งที่ white-box testing รับประกันได้", opts: [{ t: "ทุก independent path ถูกรันอย่างน้อยครั้ง", ok: true, why: "ตามสไลด์" }, { t: "ทุกการตัดสินใจทั้ง true และ false", ok: true, why: "ตามสไลด์" }, { t: "ตรง requirement ที่ลูกค้าต้องการเสมอ", ok: false, why: "ต้องใช้ validation / black-box" }, { t: "loop ถูกรันที่ขอบ", ok: true, why: "ตามสไลด์" }] },
    { type: "match", q: "จับคู่ขั้นทดสอบ real-time", pairs: [["ทดสอบแต่ละงานแยกกัน พบ logic", "Task testing"], ["จำลอง event เช่น กระดาษติด", "Behavioral testing"], ["ตรวจ synchronization และขนาด queue", "Intertask testing"], ["รวม SW กับ HW ทดสอบ interrupt", "System testing"]] },
    { type: "choice", q: "ทีมต้องการทดสอบแอปที่เปลี่ยนสถานะตาม event โดยใช้ UML state diagram เป็นฐาน ใช้วิธีใด", opts: [{ t: "Model-based testing", why: "ถูก" }, { t: "Loop testing", why: "ผิด" }, { t: "Smoke testing", why: "ผิด" }, { t: "Comparison testing", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "คุณลักษณะ \"เห็นผลของแต่ละ test case ได้ง่าย\"", q: "คือข้อใดใน testability", opts: [{ t: "Observability", why: "ถูก" }, { t: "Controllability", why: "ผิด: ระดับอัตโนมัติ" }, { t: "Stability", why: "ผิด" }, { t: "Operability", why: "ผิด" }], ans: 0 }
  ]
});
})();
