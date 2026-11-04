IOT.reg({
  id: "wifi",
  title: "Wi-Fi",
  th: "รุ่น/มาตรฐาน Wi-Fi 4–7, modulation (QAM/MCS), RSSI/EIRP/FSPL, channel, MIMO/OFDMA, Wi-Fi 7 และหลักออกแบบ Wi-Fi ที่ดี",
  summary: `
<ul>
<li><b>IEEE</b> = พัฒนามาตรฐาน · <b>Wi-Fi Alliance</b> = ตั้งชื่อ (branding) และ certify · Wi-Fi 6E = 802.11ax บนย่าน 6 GHz</li>
</ul>
<table>
<tr><th>Wi-Fi</th><th>IEEE</th><th>PHY</th><th>ปี</th><th>QAM สูงสุด</th></tr>
<tr><td>4</td><td>802.11n</td><td>HT</td><td>2009</td><td>64 (6 bit)</td></tr>
<tr><td>5</td><td>802.11ac</td><td>VHT</td><td>2013</td><td>256 (8 bit)</td></tr>
<tr><td>6 / 6E</td><td>802.11ax</td><td>HE</td><td>2019 / 2021</td><td>1024 (10 bit)</td></tr>
<tr><td>7</td><td>802.11be</td><td>EHT</td><td>2024</td><td>4096 (12 bit)</td></tr>
</table>
<ul>
<li>Bit/symbol: BPSK 1 · QPSK 2 · 16QAM 4 · 64QAM 6 · 256QAM 8 · 1024QAM 10 · 4096QAM 12 · อัตราจริงขึ้นกับ <b>MCS + Spatial stream + Channel width + SNR</b></li>
<li><b>FSPL</b>: 1 m แรก 2.4 GHz ≈ −40 dB · 5 GHz ≈ −47 · 6 GHz ≈ −48 · <b>ระยะ ×2 = −6 dB, ×10 = −20 dB</b> (100 m = −40 dB, 800 m = −58 dB) · ในอาคารจริงแย่ได้ถึง ~−9 dB ต่อ ×2</li>
<li><b>dBm</b>: +3 dB = ×2 mW · +10 dB = ×10 · <b>EIRP</b> = Tx power + antenna gain − cable loss</li>
<li>EIRP สูงสุดไทย (NBTC): 2.4 GHz (2.400–2.483) <b>100 mW = 20 dBm</b> · 5.150–5.350 <b>200 mW = 23 dBm</b> · 5.470–5.725 <b>500 mW = 27 dBm</b> · 5.925–6.425 (6 GHz) <b>250 mW = 24 dBm</b></li>
<li>RSSI เพิ่มเมื่อ <b>polarization</b> ของเสารับ/ส่งตรงกัน · วัสดุ drywall/น้ำ/โลหะลดสัญญาณ (โลหะสะท้อน น้ำดูดกลืนมาก)</li>
<li>2.4 GHz มี 3 ช่องไม่ซ้อน (1, 6, 11) → CCI สูง · 40 MHz = 20+20 bonding · ไทย 6 GHz (500 MHz): <b>3×160 MHz หรือ 1×320 MHz</b> (US: 7×160, 3×320)</li>
<li>Channel กว้างขึ้นต้องการ RSSI/SNR สูงขึ้น (noise floor 320 MHz ≈ −89 dBm)</li>
<li><b>MIMO / spatial stream</b> เพิ่ม data rate · Wi-Fi 6: <b>MU-MIMO</b> + <b>OFDMA</b> (RU, subcarrier 78.125 kHz) · MU-MIMO ดีเมื่อ packet ยาวและ SNR สูง · OFDMA ดีทุกความหนาแน่น/ขนาด packet</li>
<li>Wi-Fi 7: <b>320 MHz (6 GHz เท่านั้น)</b>, <b>4K-QAM</b> (MCS 12–13, ต้อง SNR สูง), <b>MLO</b> (Alternating / Concurrent), <b>Puncturing + Multi-RU</b></li>
<li>Throughput จริง ≈ <b>50–70%</b> ของ PHY rate (overhead, ACK, airtime) · เป้า cell size <b>−55 ถึง −65 dBm</b> · AP ห่างกัน ~8–12 m · 1 AP ไม่ควรรับ 100 device (Wi-Fi ทำงานเหมือน HUB)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>n=Wi-Fi4, ac=5, ax=6/6E, be=7 · QAM 256/1024/4096 = 8/10/12 bit</li><li>×2 → −6 dB · ×10 → −20 dB · 100/200/500/250 mW = 20/23/27/24 dBm</li><li>ไทย 6 GHz = 3×160 หรือ 1×320 MHz</li></ul></div>`,
  sections: [
    { t: "รุ่นของ Wi-Fi และการตั้งชื่อ", html: `
<ul>
<li>Timeline: 802.11a/b (1999) → 802.11g (2003) → Wi-Fi 4 / 802.11n (2009) → Wi-Fi 5 / 802.11ac (2013) → Wi-Fi 6 / 802.11ax (2019) → Wi-Fi 6E (2021) → Wi-Fi 7 / 802.11be (2024)</li>
<li><b>IEEE</b> ทำงานด้านมาตรฐาน (ตัวอักษรเช่น 802.11ax) · <b>Wi-Fi Alliance</b> ตั้งชื่อเป็นตัวเลข (Wi-Fi 6) และ certify ผลิตภัณฑ์</li>
</ul>
<table>
<tr><th>Wi-Fi Alliance</th><th>IEEE</th><th>PHY</th><th>ย่านความถี่</th></tr>
<tr><td>Wi-Fi 4</td><td>802.11n</td><td>HT (High Throughput)</td><td>2.4 / 5 GHz</td></tr>
<tr><td>Wi-Fi 5</td><td>802.11ac</td><td>VHT (Very High Throughput)</td><td>5 GHz (ช่องสูงสุด 80 MHz ตามอุปกรณ์ซีรีส์ 500)</td></tr>
<tr><td>Wi-Fi 6</td><td>802.11ax</td><td>HE (High Efficiency)</td><td>2.4 / 5 GHz</td></tr>
<tr><td>Wi-Fi 6E</td><td>802.11ax บน 6 GHz</td><td>HE</td><td>2.4 / 5 / 6 GHz (ช่องสูงสุด 160 MHz)</td></tr>
<tr><td>Wi-Fi 7</td><td>802.11be</td><td>EHT (Extremely High Throughput)</td><td>2.4 / 5 / 6 GHz (ช่องสูงสุด 320 MHz)</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>HT=Wi-Fi 4 · VHT=5 · HE=6/6E · EHT=7</li><li>Wi-Fi 6E ไม่ใช่มาตรฐานใหม่ แต่คือ 802.11ax ที่ใช้ย่าน 6 GHz</li></ul></div>` },
    { t: "Modulation, QAM, MCS และ Guard Interval", html: `
<ul>
<li>Wi-Fi ใช้ OFDM: แบ่งช่องเป็นหลาย subcarrier ส่งแต่ละ subcarrier ด้วย modulation ต่างกันได้ · ผู้รับใช้ FFT แยก subcarrier แล้วอ่าน phase/magnitude เป็น bit</li>
<li>เทคนิค: BPSK, QPSK, 16QAM, 64QAM, 256QAM, 1024QAM, 4096QAM · IQ constellation แสดงจุด symbol</li>
</ul>
<table>
<tr><th>Modulation</th><th>Bit ต่อ tone</th><th>ใช้ใน</th></tr>
<tr><td>BPSK</td><td>1</td><td>MCS ต่ำ/สัญญาณอ่อน</td></tr>
<tr><td>QPSK</td><td>2</td><td></td></tr>
<tr><td>16QAM</td><td>4</td><td></td></tr>
<tr><td>64QAM</td><td>6</td><td>Wi-Fi 4</td></tr>
<tr><td>256QAM</td><td>8</td><td>Wi-Fi 5</td></tr>
<tr><td>1024QAM</td><td>10</td><td>Wi-Fi 6/6E</td></tr>
<tr><td>4096QAM</td><td>12</td><td>Wi-Fi 7</td></tr>
</table>
<ul>
<li><b>MCS (Modulation and Coding Scheme)</b> = ชุด modulation + coding rate · MCS สูง → bit/symbol มาก (เร็ว) แต่ต้อง <b>SNR สูง</b> · สัญญาณอ่อนลง AP/Client จะลด MCS อัตโนมัติ</li>
<li>Physical rate ขึ้นกับ MCS, spatial stream, channel width, Guard Interval</li>
<li><b>GI (Guard Interval)</b> ช่วงเว้นระหว่าง OFDM symbol ป้องกัน multipath interference (เช่น 3.2 µs ใน Wi-Fi 6/6E/7)</li>
</ul>
<div class="warn"><b>⚠️ ระวัง</b> modulation หนาแน่นขึ้น (4096-QAM, MCS 12–13) ต้อง SNR สูงขึ้น ใช้ได้เฉพาะ client ใกล้ AP ไม่ใช่ทุกจุดของพื้นที่</div>` },
    { t: "กำลังส่ง, dBm, EIRP และข้อกำหนดไทย", html: `
<ul>
<li><b>dBm</b> = 10·log10(mW) · <b>+3 dB = ×2 กำลัง</b> · <b>+10 dB = ×10</b> · 1 mW = 0 dBm · 100 mW = 20 dBm</li>
<li><b>EIRP</b> (Effective/Equivalent Isotropic Radiated Power) = Tx power (dBm) + antenna gain (dBi) − cable loss (dB) · เป็นกำลังเทียบเสาอากาศ isotropic ที่ใช้เทียบกฎหมาย</li>
<li>RSSI ที่ client ≈ EIRP − Path loss − Attenuation (วัสดุ/คน)</li>
</ul>
<table>
<tr><th>ย่านความถี่ (GHz) — ไทย (NBTC)</th><th>EIRP สูงสุด (mW)</th><th>(dBm)</th></tr>
<tr><td>2.400–2.483</td><td>100</td><td>20</td></tr>
<tr><td>5.150–5.350</td><td>200</td><td>23</td></tr>
<tr><td>5.470–5.725</td><td>500</td><td>27</td></tr>
<tr><td>5.925–6.425 (6 GHz)</td><td>250</td><td>24</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>100 mW=20 dBm · 200=23 · 250=24 · 500=27</li><li>EIRP = Tx + antenna gain − cable loss (ต้องไม่เกินเพดานของย่าน)</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> เพิ่ม gain เสาอากาศก็เพิ่ม EIRP เท่ากับเพิ่ม Tx power จึงต้องลด Tx power เมื่อใช้เสา gain สูงเพื่อไม่ให้เกินกฎหมาย</div>` },
    { t: "Path Loss, วัสดุ และ Polarization", html: `
<ul>
<li><b>FSPL</b> ใน 1 m แรกขึ้นกับความถี่: 2.4 GHz ≈ −40 dB (2.45 GHz = 40.2) · 5 GHz ≈ −47 (5.18 GHz = 46.7) · 6 GHz ≈ −48 (7.125 GHz = 49.5) · ความถี่สูงกว่า loss มากกว่า (receive aperture เล็กลง)</li>
<li>หลัง 1 m แรกขึ้นกับระยะตาม inverse square law: <b>ระยะ ×2 → −6 dB</b> · <b>×10 → −20 dB</b></li>
<li>ตัวอย่าง: 8 m = 2×2×2 → 18 dB · 100 m = 10×10 → 40 dB · 800 m = 10×10×2×2×2 → 20+20+6+6+6 = <b>58 dB</b> → ที่ 2.4 GHz รวม −40−58 = <b>−98 dB</b>, 5.8 GHz ≈ −106 dB</li>
<li>ตัวอย่าง 20 m (= 10×2): 20+6 = 26 dB → 2.45 GHz รวม 40.2+26 = 66.2 dB · ในอาคารจริง loss อาจถึง −9 dB ต่อการเพิ่มระยะ ×2</li>
<li>วัสดุ: <b>drywall</b> ลดน้อย, <b>น้ำ</b> ดูดกลืนมาก (รวมคน), <b>โลหะ</b> สะท้อนพลังงาน → ทั้งหมดทำให้ RSSI ลด</li>
<li><b>Polarization</b> = ทิศของ electric field (แนวตั้ง/นอน) · RSSI สูงขึ้นเมื่อเสารับมี polarization เดียวกับเสาส่ง</li>
<li>ปัจจัยที่กระทบ data rate ของ client: ระยะ, ชนิดเสา/polarization, สิ่งแวดล้อม (attenuation), ความสามารถ client (เทคโนโลยี/Wi-Fi generation), driver ของ client, กำลังส่งของ AP</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>×2 = −6 dB · ×10 = −20 dB · 1 m แรก 40/47/48 dB (2.4/5/6 GHz)</li><li>800 m = 58 dB loss เพิ่มจาก 1 m แรก</li></ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ค่า loss 1 m แรกใช้ทำนายระยะ ห้ามลืมบวกค่าของ 1 m แรกกับ loss ตามระยะเสมอ</div>` },
    { t: "Channel, Channel Bonding และ Channel Reuse", html: `
<ul>
<li><b>2.4 GHz</b>: ช่อง 1–13 กว้าง 20 MHz แต่ไม่ซ้อนกันได้เพียง 3 ช่อง (<b>1, 6, 11</b>) → <b>CCI</b> สูง · ยังมี interference จาก Bluetooth, microwave oven</li>
<li><b>Channel bonding</b>: รวมช่อง 20 MHz เป็น 40/80/160/320 MHz เพิ่ม data rate แต่ <b>ลดจำนวนช่องที่ไม่ซ้อน</b>, เพิ่ม noise floor (ทุกครั้งที่ความกว้าง ×2 noise +3 dB) → ต้องการ RSSI/SNR สูงขึ้น (ตัวอย่างความไว: 80 MHz 433 Mbps vs 40 MHz 195 Mbps เมื่อ RSSI ต่างกัน)</li>
<li><b>5 GHz</b>: ช่องมากกว่า 2.4 GHz และมีหลายย่านย่อยตามกฎประเทศ</li>
<li><b>6 GHz</b> (U-NII): U-NII-5 5.925–6.425 (500 MHz) · U-NII-6 6.425–6.525 (100 MHz) · U-NII-7 6.525–6.875 (350 MHz) · U-NII-8 6.875–7.125 (250 MHz) · ทั้งหมด 59 × 20 MHz / 29×40 / 14×80 / 7×160 / 3×320</li>
<li>จำนวนช่องกว้างที่ใช้ได้: <b>US 7×160 MHz หรือ 3×320 MHz</b> · <b>ไทย 3×160 MHz หรือ 1×320 MHz</b> (ได้เพียง 500 MHz)</li>
<li><b>Channel reuse</b>: ออกแบบให้ AP ที่อยู่ติดกันไม่ใช้ช่องเดียวกัน (minimize CCI) · เครื่องมืออัตโนมัติ เช่น AirMatch ใช้ AI/metrics ทุก AP กำหนด channel, power, width</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>2.4 GHz ไม่ซ้อน = 1, 6, 11 · 40 MHz = 20+20</li><li>ไทย 6 GHz: 3×160 หรือ 1×320 · US: 7×160 หรือ 3×320</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> CCI (Co-Channel Interference) = AP หลายตัวใช้ช่องเดียวกันและต้องแบ่ง airtime (CSMA/CA) ซึ่งเป็นผลเสียต่อ Wi-Fi มากที่สุดข้อหนึ่ง จึงเน้น channel planning มากกว่าการเพิ่มกำลังส่ง</div>` },
    { t: "MIMO, MU-MIMO และ OFDMA (Wi-Fi 6)", html: `
<ul>
<li><b>MIMO / Spatial multiplexing</b>: ส่งข้อมูลหลายสาย (spatial stream) พร้อมกันผ่านหลายเสา เพิ่ม data rate ตามจำนวน stream (ต้องรองรับทั้ง AP และ client; client ส่วนมากมี 1–2 stream)</li>
<li>Wi-Fi 6 รองรับผู้ใช้พร้อมกันด้วย 2 วิธี: <b>MU-MIMO</b> และ <b>OFDMA</b></li>
<li><b>MU-MIMO</b>: AP ส่ง spatial stream แยกให้หลาย client พร้อมกัน ได้ผลเมื่อเงื่อนไขการแพร่กระจายสัญญาณแยก client ได้ (ได้ผลดีที่สุดเมื่อ <b>packet ยาว และ SNR สูง</b>)</li>
<li><b>OFDMA</b>: แบ่ง channel เป็นช่องย่อย <b>Resource Unit (RU)</b> (กลุ่ม subcarrier ซึ่งกว้าง 78.125 kHz ต่ออัน) ให้หลายผู้ใช้ส่งพร้อมกันใน channel เดียว · AP กำหนด RU ต่อ TXOP ปรับกำลังส่งต่อ RU เพิ่ม SINR ลด contention · ได้ผลทุกความหนาแน่น client และทุกขนาด packet (เหมาะกับแพ็กเก็ตเล็กจำนวนมาก เช่น IoT)</li>
<li>OFDM: ผู้ใช้ 1 รายใช้ทั้ง channel ต่อครั้ง · OFDMA: หลายผู้ใช้แบ่ง RU ใน channel พร้อมกัน</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Wi-Fi 6 = MU-MIMO + OFDMA</li><li>OFDMA แบ่ง channel เป็น RU · MU-MIMO แบ่งด้วย spatial stream</li><li>MU-MIMO ดีเมื่อ packet ยาว + SNR สูง · OFDMA ดีทุกกรณี</li></ul></div>` },
    { t: "Wi-Fi 7 (802.11be)", html: `
<p>4 ข้อต่างของ Wi-Fi 7 จาก Wi-Fi 6E: <b>320 MHz channel</b>, <b>4K-QAM</b>, <b>Multi-Link Operation (MLO)</b>, <b>Spectrum puncturing</b></p>
<ul>
<li><b>320 MHz</b> (optional, <b>เฉพาะ 6 GHz</b>): เพิ่ม data rate 2 เท่าของ 160 MHz · ข้อจำกัด: noise floor เริ่มราว −89 dBm, มีช่อง 320 MHz จำกัด (US 3, ไทย 1) reuse ยาก, ในไทยย่าน U-NII-5 500 MHz รองรับ 1 ช่อง</li>
<li><b>4096-QAM</b> (MCS 12, 13): 12 bit/tone ต้อง SNR สูง ใช้ได้เฉพาะ client ใกล้ AP</li>
<li><b>MLO</b>: ใช้หลาย link/band พร้อมกันเพื่อ throughput, latency, reliability · <b>Alternating MLO</b> = สลับ traffic ระหว่าง link หลบ interference → latency ต่ำสม่ำเสมอ (ใช้ได้กับ single radio) · <b>Concurrent MLO</b> = aggregate หลาย band พร้อมกัน → peak throughput สูง ต้องมีหลาย radio</li>
<li>ชนิดอุปกรณ์ MLO: <b>Single-radio (SR)</b> = สลับ link ได้อย่างเดียว ไม่ส่ง/รับพร้อมกัน (MLSR / EMLSR) · <b>Multi-radio (MR)</b> = มีตั้งแต่ 2 radio ส่ง/รับพร้อมกันได้ (STR: simultaneous TX/RX)</li>
<li><b>Puncturing + Multi-RU (MRU)</b>: ตัดช่อง 20 MHz ที่โดน interference ออกจาก channel ที่ bond แล้ว ละเว้นเฉพาะส่วนนั้น แล้วใช้ส่วนที่เหลือต่อด้วย MRU (รวม RU ที่ไม่ต่อเนื่อง) ได้ แทนที่จะลดความกว้าง channel ทั้งหมด</li>
<li>ตัวเลข: 1 spatial stream ideal — 6E 160 MHz = 1.2 Gbps · Wi-Fi 7 320 MHz = 2.88 Gbps · สูงสุดทางทฤษฎี 6E 8 SS = 9.6 Gbps, Wi-Fi 7 16 SS = 46 Gbps · ใช้งานจริง (80 MHz, 1 SS): 6E 600 Mbps, Wi-Fi 7 720 Mbps</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>4 ข้อ: 320 MHz · 4K-QAM · MLO · Puncturing (+Multi-RU)</li><li>MLO = Alternating (switching) / Concurrent (aggregation)</li><li>Puncturing ละเอียดทีละ 20 MHz</li></ul></div>` },
    { t: "หลักออกแบบ Wi-Fi ที่ดี (Coverage vs Capacity)", html: `
<ul>
<li>Throughput จริง ≈ <b>50–70%</b> ของ physical rate (overhead: MAC, PHY, ACK, airtime) เช่น PHY 1200 Mbps → ราว 600–840 Mbps</li>
<li>เป้าหมายออกแบบ: ทุกคนเชื่อมต่อที่ <b>MCS/Data rate สูงสุด</b> ที่เป็นไปได้ → <b>small cell</b> (ระยะ AP–AP ~8–12 m, เป้า RSSI cell −55 ถึง −65 dBm สำหรับ Wi-Fi 6/6E/7)</li>
<li>เหตุผล: Wi-Fi ทำงานแบบ shared medium คล้าย HUB → client ความเร็วต่ำ 1 ตัวกิน airtime นานจึงทำให้ทุกคนช้าลง</li>
<li><b>Capacity design</b> ไม่ใช่แค่ coverage: คำนวณจำนวนผู้ใช้ต่อ AP/แบนด์วิดท์ต่อผู้ใช้ (ไม่ควรให้ AP เดียวรับ ~100 device ในห้องเรียน) · Coverage ดูแค่ RSSI/SNR/MCS ส่วน Capacity ดู airtime/throughput ต่อผู้ใช้</li>
<li>ลด <b>CCI</b>: channel planning + ปรับ channel width/power (airtime คือทรัพยากรสำคัญ) · ใช้ AI/ระบบอัตโนมัติ (เช่น AirMatch)</li>
<li><b>Push client ไป 5/6 GHz</b>: 2.4 GHz มี 3 ช่องและ interference สูง (Bluetooth, ไมโครเวฟ) · 6 GHz แทน AP 5 GHz แบบ 1:1 ได้</li>
<li>อัปเดต <b>driver/firmware</b> ของ client (bug fix, compatibility) · ใช้ predictive/actual site survey วางแผนและตรวจสอบ</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Throughput ≈ 50–70% ของ PHY rate</li><li>cell −55 ถึง −65 dBm · AP ห่าง ~8–12 m</li><li>Capacity design + minimize CCI + push 5/6 GHz + อัปเดต driver</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> เพิ่มกำลังส่ง AP ไม่ได้ช่วยเมื่อ client ส่งกลับได้ไม่ไหว (uplink) และทำให้ cell ใหญ่ขึ้น เกิด CCI มากขึ้น วิธีที่ถูกคือเพิ่มจำนวน AP กำลังส่งน้อยลง</div>` }
  ],
  ex: [
    { type: "choice",
      story: "ห้องเรียนมีนักศึกษา 100 คน ใช้มือถือและโน้ตบุ๊กพร้อมกัน ฝ่าย IT ติดตั้ง AP รุ่นใหม่ 1 ตัวกลางห้องและตั้งกำลังส่งสูงสุด แต่ผู้ใช้บ่นว่าช้ามากโดยเฉพาะตอนมีผู้ใช้หลายคนโหลดพร้อมกัน",
      q: "แนวทางแก้ไขที่เหมาะสมที่สุดคือข้อใด",
      opts: [
        { t: "เพิ่มกำลังส่งของ AP และใช้ 2.4 GHz ให้ครอบคลุมทั้งห้อง", why: "cell ใหญ่ขึ้นและ 2.4 GHz มีเพียง 3 ช่อง CCI สูง ปัญหาคือ capacity ไม่ใช่ coverage" },
        { t: "เปลี่ยนช่องเป็น 20 MHz ทุกแบนด์", why: "ช่องแคบลดความเร็วต่อ client ไม่ได้เพิ่มความจุรวมของห้อง" },
        { t: "ใช้ capacity design: ติดตั้ง AP หลายตัวแบบ small cell ระยะ ~8–12 m วางแผน channel/ย้าย client ไป 5/6 GHz", why: "ถูก: Wi-Fi เป็น shared medium (เหมือน HUB) AP เดียวรับ 100 device ทำให้ประสิทธิภาพตก ต้องแบ่ง airtime ด้วยหลาย cell" },
        { t: "ปล่อยไว้เพราะ Wi-Fi 6 รองรับผู้ใช้ไม่จำกัด", why: "OFDMA/MU-MIMO ช่วยได้แต่ airtime ยังจำกัด ไม่ได้ไม่จำกัด" }
      ], ans: 2 },
    { type: "choice",
      story: "AP ย่าน 5 GHz ตั้ง EIRP = 20 dBm Client อยู่ห่าง 40 m ในที่โล่ง (ไม่มีสิ่งกีดขวาง) FSPL ใน 1 m แรกของ 5 GHz ≈ −47 dB",
      q: "RSSI ที่ client ประมาณเท่าใด",
      opts: [
        { t: "ประมาณ −59 dBm", why: "ถูก: 40 m = 10×2×2 → 20+6+6 = 32 dB; path loss รวม = 47+32 = 79 dB; RSSI = 20 − 79 = −59 dBm" },
        { t: "ประมาณ −39 dBm", why: "ลืมบวก loss 1 m แรก (47 dB) หรือคำนวณ loss ไม่ครบ" },
        { t: "ประมาณ −99 dBm", why: "ใช้ −79 − 20 แทนที่จะ EIRP − loss (บวกผิดด้าน)" },
        { t: "ประมาณ −79 dBm", why: "นี่คือ path loss −79 dB ยังไม่ได้บวก EIRP +20 dBm" }
      ], ans: 0 },
    { type: "choice",
      story: "ติดตั้ง AP ในไทยย่าน 2.4 GHz ตั้ง Tx power 17 dBm ใช้เสาภายนอก gain 6 dBi มี cable loss 1 dB (เพดาน EIRP ของไทยในย่านนี้ 100 mW = 20 dBm)",
      q: "ผลและวิธีแก้ที่ถูกต้อง",
      opts: [
        { t: "ผ่านเพราะ Tx 17 dBm ต่ำกว่า 20 dBm", why: "กฎกำหนดที่ EIRP ซึ่งรวม antenna gain และหัก cable loss ไม่ใช่ Tx power อย่างเดียว" },
        { t: "EIRP = 17+6−1 = 22 dBm (≈158 mW) เกิน ต้องลด Tx เหลือ ≤ 15 dBm", why: "ถูก: ลด Tx 2 dB → EIRP 20 dBm = 100 mW พอดี" },
        { t: "เปลี่ยนเสาเป็น 9 dBi จะเพิ่มระยะและยังถูกกฎ", why: "gain เพิ่มทำให้ EIRP ยิ่งสูงกว่าเดิม" },
        { t: "ลด cable loss เหลือ 0 dB จะแก้ปัญหา", why: "ลด loss ทำให้ EIRP สูงขึ้น ผลตรงข้าม" }
      ], ans: 1 },
    { type: "choice",
      story: "ตึกหนึ่งมี AP 3 ตัวเรียงกันในทางเดินและใช้ 2.4 GHz ทุกตัวความกว้าง 20 MHz ต้องการลด Co-Channel Interference ให้ได้มากที่สุด",
      q: "ควรกำหนดช่องอย่างไร",
      opts: [
        { t: "ช่อง 1, 2, 3", why: "ช่องติดกันซ้อนทับกัน interference มาก" },
        { t: "ช่อง 1, 4, 7", why: "ห่างกัน 3 ช่องยังซ้อนทับ (ต้องห่างอย่างน้อย 5 ช่อง)" },
        { t: "ช่อง 1, 6, 11", why: "ถูก: 3 ช่องที่ไม่ซ้อนทับกันของ 2.4 GHz" },
        { t: "ช่อง 6 ทุกตัวเพื่อให้ roaming ง่าย", why: "ทำให้เกิด CCI และแบ่ง airtime กันทั้งหมด" }
      ], ans: 2 },
    { type: "choice",
      story: "ในสำนักงานมีเครื่องพิมพ์เก่ารองรับเฉพาะ Wi-Fi 4 2.4 GHz ติดตั้งที่มุมห้องสัญญาณอ่อนมาก (data rate ต่ำ) ผู้ใช้อื่นที่เชื่อมต่อ AP เดียวกันบ่นว่าความเร็วลดลงทุกครั้งที่มีการพิมพ์",
      q: "สาเหตุและแนวทางที่ถูกที่สุดคือข้อใด",
      opts: [
        { t: "client data rate ต่ำใช้ airtime นาน (Wi-Fi ทำงานแบบ shared) ย้ายอุปกรณ์เข้าใกล้ AP/ปรับ cell เล็ก ให้ client อื่นไป 5/6 GHz", why: "ถูก: client ช้า 1 ตัวทำให้ทุกคนช้า จึงต้องให้ทุกคนเชื่อมต่อที่ data rate สูงที่สุด" },
        { t: "เป็นเพราะ AP ไม่รองรับ OFDMA ต้องเปลี่ยนเป็น Wi-Fi 4", why: "Wi-Fi 4 ไม่มี OFDMA และปัญหาอยู่ที่ airtime" },
        { t: "เพิ่ม channel width เป็น 160 MHz บน 2.4 GHz", why: "2.4 GHz ไม่มีช่อง 160 MHz และ channel กว้างยิ่งต้อง SNR สูง" },
        { t: "ลดกำลังส่งของ client อื่นให้ต่ำลง", why: "ไม่ช่วยเรื่อง airtime ที่เครื่องพิมพ์ใช้" }
      ], ans: 0 },
    { type: "choice",
      story: "สนามบินกำลังวางแผนใช้ Wi-Fi 7 ย่าน 6 GHz ในไทย (ได้ 500 MHz: 5.925–6.425 GHz) AP 4 ตัวอยู่ใกล้กัน และต้องการลด CCI มากที่สุด ผู้ออกแบบเสนอใช้ 320 MHz ทุกตัวเพื่อให้ได้ความเร็วสูงสุด",
      q: "เหตุใดข้อเสนอนี้จึงไม่เหมาะและควรทำอย่างไร",
      opts: [
        { t: "320 MHz ใช้ได้เฉพาะ 5 GHz จึงต้องเปลี่ยนไปใช้ 5 GHz", why: "320 MHz ใช้ได้เฉพาะ 6 GHz ไม่ใช่ 5 GHz" },
        { t: "ในไทยได้ 320 MHz เพียง 1 ช่อง ทุก AP จะ co-channel กัน ควรใช้ 160 MHz (3 ช่อง) หรือแคบกว่าเพื่อ reuse", why: "ถูก: ไทย 6 GHz = 3×160 หรือ 1×320 MHz การใช้ช่องเดียวทำให้ CCI สูง" },
        { t: "320 MHz ทำให้ noise floor ลดลง จึงควรใช้เฉพาะ AP ที่ไกลที่สุด", why: "ช่องกว้างทำให้ noise floor สูงขึ้น (ราว −89 dBm) ไม่ใช่ลดลง" },
        { t: "ใช้ 4 ช่อง 320 MHz แบบไม่ซ้อนกันได้ในไทย", why: "ไทยมีเพียง 1×320 MHz" }
      ], ans: 1 },
    { type: "choice",
      story: "โน้ตบุ๊ก Wi-Fi 7 รุ่นประหยัดแบตมี radio เดียว (single radio) ใช้งานในออฟฟิศที่ 5 GHz แออัดและ 6 GHz ว่าง ผู้ดูแลต้องการให้ latency ต่ำสม่ำเสมอโดยไม่เปลืองแบต",
      q: "ใช้ความสามารถ MLO แบบใดได้จริงและเหมาะสม",
      opts: [
        { t: "Concurrent MLO รวมแบนด์ 5 และ 6 GHz พร้อมกันเพื่อ peak throughput", why: "ต้องมีหลาย radio (STR) client ที่มี radio เดียวทำไม่ได้" },
        { t: "ปิด MLO เพราะ MLO ต้องใช้อย่างน้อย 2 radio เสมอ", why: "single-radio รองรับ MLO ได้ในรูปแบบสลับ link" },
        { t: "ใช้ static puncturing แทน MLO", why: "puncturing หลบ interference ในช่องเดียวกัน ไม่ใช่การสลับแบนด์" },
        { t: "Alternating MLO / link switching (single radio) สลับไปยัง link ที่ว่างกว่า", why: "ถูก: single-radio จำกัดที่การสลับ link ได้ failover/หลบ congestion ทำให้ latency ต่ำสม่ำเสมอ" }
      ], ans: 3 },
    { type: "choice",
      story: "AP Wi-Fi 7 ใช้ channel 160 MHz ย่าน 6 GHz แต่มี interference แคบๆ ทับเพียง 20 MHz หนึ่งส่วนของ channel ทำให้ throughput ตก ผู้ดูแลไม่อยากลดความกว้างช่องลงทั้งหมด",
      q: "ฟีเจอร์ใดช่วยได้",
      opts: [
        { t: "เพิ่ม EIRP ให้สูงสุด", why: "ไม่แก้ interference และอาจเกินกฎหมาย/เพิ่ม CCI" },
        { t: "เปลี่ยนไปใช้ 2.4 GHz", why: "2.4 GHz มีช่องไม่ซ้อนเพียง 3 ช่องและ interference สูงกว่า" },
        { t: "Puncturing + Multi-RU ตัดส่วน 20 MHz ที่มี interference และใช้ส่วนที่เหลือต่อ", why: "ถูก: puncturing ละเอียดทีละ 20 MHz และ MRU ใช้ RU ที่ไม่ต่อเนื่องของ channel ที่เหลือได้" },
        { t: "เปลี่ยนจาก OFDMA เป็น OFDM", why: "OFDM ใช้ channel ให้ผู้ใช้ทีละราย ไม่ช่วยหลบ interference" }
      ], ans: 2 },
    { type: "multi",
      story: "ผู้ใช้ถามว่าทำไมความเร็ว Wi-Fi ของแต่ละเครื่องไม่เท่ากันแม้ใช้ AP ตัวเดียวกัน",
      q: "เลือกทุกปัจจัยที่กระทบ data rate ของ client",
      opts: [
        { t: "ระยะห่างจาก AP", ok: true, why: "ระยะไกล → RSSI ต่ำ → MCS ต่ำ" },
        { t: "polarization/ชนิดเสาอากาศที่ตรงกันหรือไม่", ok: true, why: "RSSI สูงขึ้นเมื่อ polarization ตรงกัน" },
        { t: "ความสามารถ (generation) และ driver ของ client", ok: true, why: "client รุ่นเก่าหรือ driver บั๊กทำให้ช้าลง" },
        { t: "วัสดุที่กั้น เช่น โลหะ/น้ำ", ok: true, why: "ทำให้เกิด attenuation/reflection" },
        { t: "ความยาวของชื่อ SSID", ok: false, why: "ไม่เกี่ยวกับ RF/data rate" },
        { t: "ระยะเวลา DHCP lease", ok: false, why: "มีผลเฉพาะการได้ IP ไม่ใช่ data rate ของ link" }
      ] },
    { type: "multi",
      story: "เปรียบเทียบ Wi-Fi 6E กับ Wi-Fi 7",
      q: "เลือกทุกฟีเจอร์ที่เป็นของ Wi-Fi 7 และไม่มีใน Wi-Fi 6E",
      opts: [
        { t: "ช่อง 320 MHz (เฉพาะ 6 GHz)", ok: true, why: "6E สูงสุด 160 MHz" },
        { t: "4096-QAM (4K-QAM)", ok: true, why: "6E สูงสุด 1024-QAM" },
        { t: "Multi-Link Operation (MLO)", ok: true, why: "ใหม่ใน Wi-Fi 7" },
        { t: "Puncturing + Multi-RU", ok: true, why: "ใหม่ใน Wi-Fi 7" },
        { t: "OFDMA และ Resource Unit", ok: false, why: "เริ่มตั้งแต่ Wi-Fi 6" },
        { t: "ใช้ย่าน 6 GHz", ok: false, why: "6E เริ่มใช้ 6 GHz แล้ว" }
      ] },
    { type: "blank",
      story: "Modulation ใน Wi-Fi",
      text: "256-QAM ใช้ {1} bit ต่อ symbol (Wi-Fi 5) · 1024-QAM ใช้ {2} bit (Wi-Fi 6) · 4096-QAM ใช้ {3} bit (Wi-Fi 7)",
      blanks: [
        { opts: ["6", "8", "10", "12"], ans: 1, why: "2^8 = 256" },
        { opts: ["8", "9", "10", "12"], ans: 2, why: "2^10 = 1024" },
        { opts: ["10", "11", "12", "16"], ans: 2, why: "2^12 = 4096" }
      ] },
    { type: "blank",
      story: "คำนวณ path loss ที่ 20 m (= 10×2) ย่าน 2.45 GHz ซึ่ง loss 1 m แรก = 40.2 dB",
      text: "Loss เพิ่มจากระยะ 20 m = 20 + 6 = {1} dB · Path loss รวม = 40.2 + 26 = {2} dB · และ EIRP สูงสุด 200 mW ย่าน 5.15–5.35 GHz ของไทยเท่ากับ {3} dBm",
      blanks: [
        { opts: ["12", "20", "26", "40"], ans: 2, why: "×10 = 20 dB และ ×2 = 6 dB รวม 26 dB" },
        { opts: ["46.2", "60.2", "66.2", "80.2"], ans: 2, why: "40.2 + 26 = 66.2 dB" },
        { opts: ["20", "23", "24", "27"], ans: 1, why: "200 mW = 23 dBm (100 mW = 20 dBm, +3 dB = ×2)" }
      ] },
    { type: "blank",
      story: "Wi-Fi 6 ใช้ 2 เทคนิคให้หลายผู้ใช้ส่งพร้อมกัน",
      text: "เทคนิค {1} แบ่ง channel ออกเป็นช่องย่อยเรียกว่า {2} ให้หลายผู้ใช้ใช้พร้อมกัน ส่วน {3} ใช้ spatial stream แยกผู้ใช้ และได้ผลดีเมื่อ packet ยาวและ SNR สูง",
      blanks: [
        { opts: ["MLO", "OFDMA", "Puncturing", "CSMA/CA"], ans: 1, why: "OFDMA = Multiple Access แบ่ง channel" },
        { opts: ["Resource Unit (RU)", "Spatial stream", "Guard Interval", "MCS"], ans: 0, why: "ช่องย่อยที่ AP จัดสรรเรียก RU" },
        { opts: ["OFDMA", "MU-MIMO", "MLO", "Channel bonding"], ans: 1, why: "MU-MIMO ใช้ spatial stream แยก client" }
      ] },
    { type: "match",
      q: "จับคู่ชื่อ Wi-Fi Alliance กับมาตรฐาน IEEE",
      pairs: [
        ["Wi-Fi 4", "802.11n (HT)"],
        ["Wi-Fi 5", "802.11ac (VHT)"],
        ["Wi-Fi 6", "802.11ax (HE)"],
        ["Wi-Fi 6E", "802.11ax ที่ใช้ย่าน 6 GHz"],
        ["Wi-Fi 7", "802.11be (EHT)"]
      ],
      why: "IEEE ตั้งชื่อมาตรฐานเป็นตัวอักษร ส่วน Wi-Fi Alliance ตั้งชื่อเป็นตัวเลข 6E คือ 802.11ax ที่ขยายไปใช้ 6 GHz" }
  ]
});
