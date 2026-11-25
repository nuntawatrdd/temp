(function () {
  const F = (f, alt, cap) => `<figure><img src="../ict_network/i/${f}.webp" alt="${alt}" loading="lazy"><figcaption>${cap}</figcaption></figure>`;

  // constellation: QPSK, 16-QAM, 64-QAM (one path of round dots per panel)
  const qamPanel = (k, cx, cy, w, label) => {
    const step = 120 / k; let d = "";
    for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) d += `M${Math.round(cx - 60 + step / 2 + i * step)} ${Math.round(cy - 60 + step / 2 + j * step)}h0`;
    return `<path d="M${cx - 70} ${cy}h140M${cx} ${cy - 70}v140" class="ln lf"/><path d="${d}" class="ln" stroke-linecap="round" stroke-width="${w}"/><text x="${cx}" y="${cy + 92}" class="t b" text-anchor="middle">${label}</text>`;
  };
  const QAM = `<div class="dg"><div class="dgt">IQ constellation: จุดมากขึ้น = ส่งได้หลาย bit ต่อ symbol แต่จุดชิดกันขึ้น</div>
<svg viewBox="0 0 640 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="constellation ของ QPSK 16-QAM 64-QAM">${qamPanel(2, 110, 90, 12, "QPSK: 4 จุด = 2 bit")}${qamPanel(4, 320, 90, 9, "16-QAM: 16 จุด = 4 bit")}${qamPanel(8, 530, 90, 6, "64-QAM: 64 จุด = 6 bit")}</svg>
<div class="dgn">1024-QAM = 32x32 จุด (10 bit), 4096-QAM = 64x64 จุด (12 bit) ชิดกันมากจน noise เล็กน้อยก็อ่านผิด จึงต้อง SNR สูง</div></div>`;

  // OFDM vs OFDMA
  const OFDMA = `<div class="dg"><div class="dgt">OFDM กับ OFDMA: แกนนอน = เวลา, แกนตั้ง = ความถี่ใน channel</div>
<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="เปรียบเทียบ OFDM ที่ผู้ใช้ผลัดกันใช้ทั้ง channel กับ OFDMA ที่แบ่งเป็น RU">
<text x="150" y="20" class="t b" text-anchor="middle">OFDM (Wi-Fi 5 ลงไป): ผลัดกันทีละคน</text>
<rect x="30" y="35" width="75" height="130" rx="6" class="bx hd"/><text x="67" y="105" class="t b" text-anchor="middle">A</text>
<rect x="112" y="35" width="75" height="130" rx="6" class="bx"/><text x="150" y="105" class="t b" text-anchor="middle">B</text>
<rect x="195" y="35" width="75" height="130" rx="6" class="bx"/><text x="232" y="105" class="t b" text-anchor="middle">C</text>
<text x="150" y="190" class="t sm" text-anchor="middle">3 ช่วงเวลา, แต่ละคนใช้ทั้ง channel</text>
<text x="480" y="20" class="t b" text-anchor="middle">OFDMA (Wi-Fi 6): แบ่ง RU ส่งพร้อมกัน</text>
<rect x="340" y="35" width="75" height="40" rx="6" class="bx hd"/><text x="377" y="60" class="t b" text-anchor="middle">A (RU)</text>
<rect x="340" y="80" width="75" height="40" rx="6" class="bx ok"/><text x="377" y="105" class="t b" text-anchor="middle">B (RU)</text>
<rect x="340" y="125" width="75" height="40" rx="6" class="bx"/><text x="377" y="150" class="t b" text-anchor="middle">C (RU)</text>
<rect x="425" y="35" width="160" height="130" rx="6" class="bx" stroke-dasharray="5 4"/><text x="505" y="95" class="t sm" text-anchor="middle">เวลาที่เหลือ</text><text x="505" y="113" class="t sm" text-anchor="middle">ใช้ส่งอย่างอื่นได้</text>
<text x="480" y="190" class="t sm" text-anchor="middle">ช่วงเวลาเดียว, 3 คนใช้ RU คนละส่วน</text>
</svg><div class="dgn">RU (Resource Unit) = กลุ่ม subcarrier ที่ AP จัดสรรให้ client แต่ละราย เหมาะกับ packet เล็กจำนวนมาก เพราะไม่ต้องรอ contention ทีละคน</div></div>`;

  IOT.reg({
    id: "wl",
    title: "Wireless: Wi-Fi ตั้งแต่คลื่นวิทยุถึง WLAN องค์กร",
    th: "ไร้สายต่างจากมีสายอย่างไร, band/channel/dBm/EIRP/path loss, Wi-Fi 4-7, QAM/MCS, MIMO/OFDMA, BSS/SSID/VAP/ESS, FAT AP vs AC+FIT AP, CAPWAP, AP online, STA access, direct/tunnel forwarding, ออกแบบ coverage vs capacity",
    summary: `
<ul>
<li><b>ไร้สาย = shared medium + half duplex</b>: ทุกคนในรัศมีใช้ airtime ร่วมกัน (CSMA/CA) ยิ่งผู้ใช้เยอะ/สัญญาณห่าง ยิ่งช้า; <b>802.11</b> = Data link + Physical, <b>Wi-Fi Alliance</b> = รับรอง interoperability</li>
<li><b>ย่านความถี่</b>: 2.4 GHz (ช่อง 1-13, ไม่ซ้อนกัน 1/6/11, ไกลแต่คับคั่ง), 5 GHz (ช่องมาก), 6 GHz (Wi-Fi 6E/7, ไทยมี 500 MHz = 3x160 หรือ 1x320 MHz); center ช่อง 2.4 GHz = 2407 + 5n MHz</li>
<li><b>dB</b>: +3 dB = x2, +10 dB = x10; 100 mW = 20 dBm, 200 = 23, 500 = 27; <b>EIRP = Tx + antenna gain - cable loss</b> ต้องไม่เกินเพดานไทย (2.4 GHz = 20 dBm)</li>
<li><b>Path loss</b>: 1 m แรก 40/47/48 dB (2.4/5/6 GHz) แล้ว <b>ระยะ x2 = -6 dB, x10 = -20 dB</b>; bonding ทุก x2 ของความกว้าง noise +3 dB</li>
<li><b>Rate</b> ขึ้นกับ modulation (bit/tone), coding rate, subcarrier, spatial stream, GI; MCS สูงต้อง SNR สูง; Wi-Fi 4 = 64QAM, 5 = 256QAM, 6 = 1024QAM, 7 = 4096QAM; throughput จริง ≈ 50-70% ของ PHY</li>
<li><b>Wi-Fi 6</b> = OFDMA + MU-MIMO (UL/DL) + 1024-QAM (HEW); <b>Wi-Fi 7</b> = 320 MHz, 4K-QAM, MLO, puncturing + MRU</li>
<li><b>BSS</b> = AP + STA, <b>BSSID</b> = MAC ของ radio AP, <b>SSID</b> = ชื่อ, <b>VAP</b> = หลาย BSS บน AP เดียว (แชร์ channel/capacity), <b>ESS</b> = หลาย BSS SSID เดียวกัน รองรับ roaming</li>
<li><b>FAT AP</b> ทำเดี่ยว (บ้าน/ร้านเล็ก) vs <b>AC + FIT AP</b> (องค์กร, ควบคุมรวมศูนย์); <b>CAPWAP</b> บน UDP: control 5246, data 5247, เลือก DTLS ได้</li>
<li><b>AP-AC</b>: L2 (ง่าย/เล็ก) vs L3 (ต้องใช้ DHCP Option 43/DNS/static); <b>AC</b>: direct (อยู่ใน path) vs bypass (ต่อข้าง นิยมกว่า)</li>
<li><b>AP online</b>: IP → Discovery → Join (mac/sn/no-auth) → Image data (upgrade) → Keepalive 5247 / Echo 5246 → AC ส่ง config; <b>AP group > profile</b>: regulatory domain, RF, VAP (SSID + security + forward-mode + service VLAN)</li>
<li><b>STA access 6 ขั้น</b>: scanning → link auth → association → access auth → DHCP → user auth; <b>forwarding</b>: tunnel (ผ่าน AC, คุมรวมศูนย์) vs direct (ไม่ผ่าน AC, เร็ว/ลดภาระ AC)</li>
<li><b>ออกแบบ</b>: ไม่ใช่แค่ coverage แต่ต้อง capacity; small cell (cell edge -55 ถึง -65 dBm), channel plan ลด CCI, ดัน client ไป 5/6 GHz, เพิ่มจำนวน AP ไม่ใช่ Tx power</li>
</ul>`,
    sections: [
      {
        t: "1. ทำไมไร้สายจึงต่างจากมีสาย (ประมาณ 4 นาที)",
        ref: "ตำรา หน้า 374-378",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> สายทำให้แต่ละ port มีเส้นทางของตัวเอง ส่วนอากาศเป็นของทุกคนร่วมกัน ความต่างข้อเดียวนี้อธิบายเกือบทุกเรื่องใน Wireless ทั้งเรื่องความเร็ว ความปลอดภัย และการออกแบบ</p>
${F("p375_1", "เปรียบเทียบเครือข่ายสายกับไร้สาย", "Fig. 12.1 Wired vs wireless network")}
<h4>สาย vs อากาศ</h4>
<table>
<tr><th>ประเด็น</th><th>มีสาย (Ethernet switch)</th><th>ไร้สาย (Wi-Fi)</th></tr>
<tr><td>ตัวกลาง</td><td>สายเฉพาะต่อ port, full duplex ได้</td><td>อากาศร่วมกัน, ส่งและรับสลับกัน (half duplex)</td></tr>
<tr><td>การชนกัน</td><td>แทบไม่มี (แยกต่อ port)</td><td>ใครส่งพร้อมกันก็ชน จึงใช้ <b>CSMA/CA</b> ฟังก่อนส่งและรอ backoff</td></tr>
<tr><td>คุณภาพ</td><td>คงที่</td><td>แปรผันตามระยะ ผนัง คน และสัญญาณรบกวน</td></tr>
<tr><td>ความปลอดภัย</td><td>ต้องเสียบสายถึงเข้าได้</td><td>ใครอยู่ในรัศมีก็ได้ยินสัญญาณ จึงต้อง authenticate + encrypt</td></tr>
<tr><td>การเคลื่อนที่</td><td>ไม่มี</td><td>เดินย้ายจุดได้ ต้องมี roaming</td></tr>
</table>
<p>ผลคือ Wi-Fi ทำงานคล้าย HUB: ทุกเครื่องใน channel เดียวกันแบ่ง <b>airtime</b> (เวลาที่ใช้ส่งได้) เครื่องที่สัญญาณไกลส่งช้า กินเวลานานกว่า จึงฉุดทุกคนลง นี่คือเหตุผลที่การออกแบบ Wi-Fi ดูที่ airtime ไม่ใช่แค่ "สัญญาณเต็มขีด"</p>
<h4>ชนิดของเครือข่ายไร้สาย และมาตรฐาน</h4>
<p>ประเภทเครือข่ายไร้สาย: <b>WPAN</b> (Bluetooth, ZigBee, NFC), <b>WLAN</b> (Wi-Fi), <b>WMAN</b> (WiMax), <b>WWAN</b> (LTE, 5G)</p>
<ul>
<li><b>IEEE 802.11</b> (เริ่มปี 1997) ครอบคลุม <b>2 layer ล่าง</b>: Data link (channel access, addressing, error detection, security) และ Physical (ส่ง bit ผ่านอากาศ, กำหนดย่านความถี่)</li>
<li><b>Wi-Fi</b> = เครื่องหมายการค้าของ <b>Wi-Fi Alliance</b> ที่รับรองว่าอุปกรณ์จากต่างยี่ห้อทำงานร่วมกันได้ และตั้งชื่อรุ่นเป็นตัวเลข (Wi-Fi 4/5/6/7)</li>
</ul>
<h4>ระบบสื่อสารไร้สายในภาพเดียว</h4>
${F("p384_1", "ระบบสื่อสารไร้สาย", "Fig. 12.8 Wireless communication system")}
<p>ฝั่งส่ง: <b>source coding</b> แปลงข้อมูลเป็น bit, <b>channel coding</b> เติมข้อมูลตรวจ/แก้ error, <b>modulation</b> ซ้อน bit ลงคลื่นความถี่สูงแล้วส่งออกเสาอากาศ; ฝั่งรับทำย้อนกลับ ส่วนที่เหลือของเอกสารจะอธิบายว่าแต่ละขั้นกำหนดความเร็วอย่างไร</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>ไร้สาย = shared medium + half duplex + CSMA/CA: ผู้ใช้เพิ่ม airtime ต่อคนลด</li>
<li>802.11 = Data link + Physical; Wi-Fi Alliance = รับรอง interoperability + ตั้งชื่อ Wi-Fi N</li>
<li>Modulation คือขั้นที่แปลง bit เป็นคลื่น ส่วน channel coding คือขั้นกัน error</li>
</ul></div>`
      },
      {
        t: "2. คลื่นวิทยุพื้นฐาน: ย่านความถี่ channel และ bonding (ประมาณ 6 นาที)",
        ref: "ตำรา หน้า 385-386 + Wi-Fi radio",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> Wi-Fi อยู่บนคลื่นวิทยุสามย่าน (2.4, 5, 6 GHz) แต่ละย่านถูกหั่นเป็น channel การเลือก channel ให้ AP ข้างเคียงไม่ชนกันคือการออกแบบ RF ที่สำคัญที่สุดข้อแรก</p>
<h4>สามย่านความถี่</h4>
<table>
<tr><th>ย่าน</th><th>ช่วงความถี่</th><th>จุดเด่น</th><th>จุดด้อย</th></tr>
<tr><td>2.4 GHz</td><td>2.4 - 2.4835 GHz</td><td>ทะลุผนังและไปไกลกว่า</td><td>ช่องไม่ซ้อนกันมีแค่ 3 ช่อง, ถูกรบกวนจาก Bluetooth และไมโครเวฟ</td></tr>
<tr><td>5 GHz</td><td>5.15 - 5.35 และ 5.725 - 5.85 GHz (ตามตำรา)</td><td>ช่องมากกว่า, รบกวนน้อยกว่า</td><td>ระยะสั้นกว่า (loss 1 m แรกมากกว่า 7 dB)</td></tr>
<tr><td>6 GHz</td><td>Wi-Fi 6E / 7 เท่านั้น</td><td>สะอาด ไม่มีอุปกรณ์เก่าปนมา, ช่องกว้างได้</td><td>ระยะสั้นสุด, ไทยได้ใช้ 500 MHz (5.925-6.425)</td></tr>
</table>
<p>กฎจำง่าย: <b>ความถี่สูง = ช่องกว้างและเร็วได้ แต่ไปไม่ไกลและทะลุผนังแย่</b></p>
<h4>Channel ในย่าน 2.4 GHz</h4>
<p>ย่านนี้มีช่อง 1-13 (ช่อง 14 ส่วนใหญ่ไม่ใช้) แต่ละช่องกว้างประสิทธิผล <b>20 MHz</b> บวกกันชน (guard) 2 MHz ราว 22 MHz ความถี่กลางหาจาก <b>2407 + 5n MHz</b> เช่น ช่อง 1 = 2412, ช่อง 6 = 2437, ช่อง 11 = 2462 MHz ช่องติดกันห่างกันแค่ 5 MHz จึงซ้อนทับกันเกือบทั้งหมด</p>
${F("p386_1", "channel 2.4 GHz เห็น 1, 6, 11 ไม่ซ้อนกัน", "Fig. 12.10 ช่อง 2.4 GHz: 1, 6, 11 ไม่ซ้อนกัน")}
<ul>
<li>ช่อง 1 กับ 6: ห่าง 2437 - 2412 = <b>25 MHz</b> มากกว่า 22 MHz จึงไม่ซ้อน; ช่อง 1 กับ 5: ห่าง 20 MHz น้อยกว่า 22 จึงซ้อน</li>
<li>ชุดที่ไม่ซ้อนกัน: <b>1-6-11</b> (นิยมสุด), 2-7-12, 3-8-13, 4-9-14 ต้องห่างกันอย่างน้อย 5 ช่อง</li>
<li>เหตุที่นิยม 1-6-11: ใช้ได้ในทุกประเทศที่มีช่อง 1-11 (เช่น สหรัฐ) จึงเป็นมาตรฐานโดยพฤตินัย</li>
</ul>
<h4>การรบกวนสองแบบ</h4>
<ul>
<li><b>CCI (Co-Channel Interference)</b>: AP หลายตัวใช้ <b>ช่องเดียวกัน</b> ได้ยินกันและต้องแบ่ง airtime ยังคุยกันรู้เรื่องแต่ช้าลง (เป็นปัญหาที่พบบ่อยที่สุดในองค์กร)</li>
<li><b>ACI (Adjacent Channel Interference)</b>: ใช้ช่อง <b>ที่ซ้อนทับบางส่วน</b> (เช่น 1 กับ 3) ถอดรหัสกันไม่ได้ กลายเป็น noise แย่กว่า CCI</li>
</ul>
<h4>Channel bonding: รวมช่องให้กว้างขึ้น</h4>
<p>802.11n เป็นต้นมารวมช่อง 20 MHz เป็น 40, 80, 160 และ Wi-Fi 7 ถึง 320 MHz ได้ ความกว้างเพิ่มเท่าตัว = จำนวน subcarrier เพิ่มเท่าตัว = rate เพิ่มราวเท่าตัว แต่ต้องแลก 3 อย่าง</p>
<ul>
<li><b>จำนวนช่องที่ไม่ซ้อนลดลง</b> ทำให้ reuse ยาก (2.4 GHz ใช้ 40 MHz แทบไม่ได้เพราะเหลือช่องเดียว)</li>
<li><b>Noise floor สูงขึ้น 3 dB ทุกครั้งที่ความกว้างเพิ่มเท่าตัว</b> (20→40: +3, →80: +6, →160: +9 dB) SNR จึงลด และต้องการ RSSI สูงขึ้นเพื่อถึง MCS เดิม</li>
<li>จึงเหมาะกับ client ใกล้ AP เท่านั้น; 2.4 GHz ใช้ 20 MHz ส่วน 5/6 GHz เลือก 40-80 MHz ตามความหนาแน่น</li>
</ul>
<div class="note"><b>6 GHz ของไทย</b> ได้ 5.925-6.425 GHz = 500 MHz จึงได้ <b>3 ช่อง 160 MHz หรือ 1 ช่อง 320 MHz</b> (500/160 = 3.1, 500/320 = 1.6) ขณะที่สหรัฐ (1.2 GHz) ได้ 7x160 หรือ 3x320 MHz ช่อง 320 MHz จึง reuse ไม่ได้เลยในไทย</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>center 2.4 GHz = 2407 + 5n; ไม่ซ้อน = ห่าง >= 25 MHz = 1, 6, 11</li>
<li>CCI (ช่องเดียวกัน) แย่น้อยกว่า ACI (ช่องเหลื่อม)</li>
<li>bonding x2: rate ~x2, noise +3 dB, ช่องไม่ซ้อนครึ่งหนึ่ง</li>
</ul></div>`
      },
      {
        t: "3. กำลังส่ง dBm EIRP และ path loss (ประมาณ 6 นาที)",
        ref: "Wi-Fi radio, กฎ NBTC",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> สัญญาณที่เครื่องลูกข่ายได้รับ = กำลังที่ส่งออก ลบด้วยสิ่งที่หายไประหว่างทาง ทั้งหมดคำนวณเป็น dB บวกลบง่าย ๆ เพียงจำ 3 ค่า (3 dB, 6 dB, 10 dB) ก็ประเมิน coverage ได้</p>
<h4>dB และ dBm</h4>
<ul>
<li><b>dBm</b> = 10 log10(mW): 1 mW = 0 dBm, <b>100 mW = 20 dBm</b></li>
<li><b>+3 dB = กำลัง x2</b> (200 mW = 23 dBm, 400 mW = 26 dBm) · <b>+10 dB = x10</b> (1000 mW = 30 dBm) · ลบก็กลับกัน</li>
<li>dB เป็นอัตราส่วน (บวกลบกันได้) ส่วน dBm เป็นค่าสัมบูรณ์ dBm + dB = dBm</li>
</ul>
<h4>EIRP และกฎหมายไทย</h4>
<p><b>EIRP = Tx power (dBm) + antenna gain (dBi) - cable loss (dB)</b> คือกำลังที่ "พุ่งออกจากเสา" เทียบเสาอากาศอุดมคติ กฎหมายจำกัดที่ EIRP (ตามตาราง NBTC ที่ใช้ในเอกสารนี้) ไม่ใช่ที่กำลังของวิทยุเพียงอย่างเดียว</p>
<table>
<tr><th>ย่าน (GHz)</th><th>EIRP สูงสุด</th><th>dBm</th></tr>
<tr><td>2.400 - 2.483</td><td>100 mW</td><td>20</td></tr>
<tr><td>5.150 - 5.350</td><td>200 mW</td><td>23</td></tr>
<tr><td>5.470 - 5.725</td><td>500 mW</td><td>27</td></tr>
<tr><td>5.925 - 6.425 (6 GHz)</td><td>250 mW</td><td>24</td></tr>
</table>
<p><b>ตัวอย่าง</b>: 2.4 GHz, Tx 17 dBm, เสา 6 dBi, สายสัญญาณ 2 dB → EIRP = 17 + 6 - 2 = 21 dBm เกินเพดาน 20 dBm ไป 1 dB ต้องลด Tx เหลือไม่เกิน 16 dBm การเปลี่ยนเสาเป็น gain สูงจึง "เพิ่มกำลัง" เท่ากับเพิ่ม Tx และต้องลด Tx ชดเชย</p>
<h4>Path loss: สัญญาณหายเมื่อไกลขึ้น</h4>
<ul>
<li><b>1 m แรก</b> loss ขึ้นกับความถี่: <b>2.4 GHz ≈ 40 dB, 5 GHz ≈ 47 dB, 6 GHz ≈ 48 dB</b> (ความถี่สูงยิ่งเสียมากตั้งแต่เริ่ม)</li>
<li>หลังจากนั้นตามระยะ: <b>ระยะ x2 = เพิ่ม 6 dB, x10 = เพิ่ม 20 dB</b> (ในที่โล่ง; ในอาคารจริงอาจเสียมากกว่านี้)</li>
<li>วัสดุ: drywall ลดน้อย, น้ำและคนดูดกลืนมาก, โลหะสะท้อน → RSSI ลด</li>
</ul>
<h4>ตัวอย่างคำนวณ link budget</h4>
<p>AP 2.4 GHz EIRP 20 dBm, client อยู่ห่าง 16 m (= 2x2x2x2) มีผนัง 2 ชั้น ชั้นละ 5 dB:</p>
<pre><code>loss ที่ 1 m        = 40 dB
loss เพิ่มจาก 16 m   = 4 x 6 = 24 dB
loss ผนัง           = 2 x 5  = 10 dB
RSSI = 20 - 40 - 24 - 10 = -54 dBm
SNR  = RSSI - noise floor = -54 - (-95) = 41 dB   (สมมติ noise 20 MHz = -95 dBm)</code></pre>
<p><b>RSSI</b> บอกความแรงของสัญญาณ ส่วน <b>SNR</b> (สัญญาณต่อ noise) ต่างหากที่กำหนดว่าใช้ MCS ไหนได้ (หัวข้อถัดไป) อ้างอิงทั่วไปคือ RSSI ที่ -65 dBm ขึ้นไปถือว่าดีสำหรับบริการเสียง/วิดีโอ</p>
<div class="warn"><b>ระวัง</b> ลืมบวก loss 1 m แรก (40/47/48 dB) เป็นข้อผิดบ่อยที่สุด และอย่าสับสนว่า "สัญญาณแรง = ใช้งานดี" ถ้า noise สูง SNR ต่ำก็ช้าอยู่ดี</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>+3 dB = x2, +10 dB = x10; 100/200/250/500 mW = 20/23/24/27 dBm</li>
<li>EIRP = Tx + gain - cable; ต้องไม่เกินเพดานของย่าน</li>
<li>loss: 1 m แรก 40/47/48 dB; x2 ระยะ = -6 dB; x10 = -20 dB</li>
<li>RSSI = EIRP - path loss - วัสดุ; SNR = RSSI - noise</li>
</ul></div>`
      },
      {
        t: "4. มาตรฐาน 802.11 modulation และ MCS: ความเร็วมาจากไหน (ประมาณ 6 นาที)",
        ref: "ตำรา หน้า 376-377 + Wi-Fi radio",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> ทุกรุ่นของ Wi-Fi เร็วขึ้นด้วยสูตรเดียวกัน: ส่ง bit ต่อ symbol ให้มากขึ้น (modulation), ใช้ช่องกว้างขึ้น, ใช้หลายเสา และลด overhead เมื่อเข้าใจสูตรนี้จะอ่านตารางรุ่นต่าง ๆ ได้ทั้งหมด</p>
<h4>รุ่นของ Wi-Fi</h4>
<table>
<tr><th>Wi-Fi</th><th>IEEE</th><th>ย่าน</th><th>Modulation สูงสุด</th><th>เร็วสุด (ตามตำรา/ทฤษฎี)</th></tr>
<tr><td>1</td><td>802.11 (1997)</td><td>2.4</td><td>-</td><td>2 Mbps</td></tr>
<tr><td>2</td><td>802.11b</td><td>2.4</td><td>-</td><td>11 Mbps</td></tr>
<tr><td>3</td><td>802.11a (5 GHz) / g (2.4 GHz)</td><td>5 / 2.4</td><td>64-QAM</td><td>54 Mbps</td></tr>
<tr><td>4</td><td>802.11n (HT)</td><td>2.4 + 5</td><td>64-QAM</td><td>300 Mbps (ตำรา, 2 stream 40 MHz)</td></tr>
<tr><td>5</td><td>802.11ac (VHT)</td><td>5</td><td>256-QAM</td><td>wave1 1.3 Gbps, wave2 6.9 Gbps</td></tr>
<tr><td>6 / 6E</td><td>802.11ax (HE)</td><td>2.4 + 5 (+6 สำหรับ 6E)</td><td>1024-QAM</td><td>9.6 Gbps</td></tr>
<tr><td>7</td><td>802.11be (EHT)</td><td>2.4 + 5 + 6</td><td>4096-QAM</td><td>ราว 46 Gbps (16 stream, 320 MHz)</td></tr>
</table>
<p>Wi-Fi 6E ไม่ใช่มาตรฐานใหม่ แต่คือ 802.11ax ที่ขยายไปย่าน 6 GHz; Wi-Fi 5 มี 2 wave โดย wave2 เพิ่ม MU-MIMO และช่องกว้างขึ้น</p>
<h4>Modulation: 1 symbol บรรจุกี่ bit</h4>
${QAM}
<p>bit ต่อ tone: BPSK 1, QPSK 2, 16-QAM 4, <b>64-QAM 6 (Wi-Fi 4), 256-QAM 8 (Wi-Fi 5), 1024-QAM 10 (Wi-Fi 6), 4096-QAM 12 (Wi-Fi 7)</b></p>
<p>สังเกตว่าอัตราเพิ่มตาม <b>จำนวน bit</b> (log2 ของจำนวนจุด) ไม่ใช่จำนวนจุด จุดเพิ่ม 4 เท่า (1024 → 4096) ได้ bit เพิ่มแค่ 2 (10 → 12) จึงได้ความเร็วเพิ่มเพียง 20% แต่ต้องใช้ SNR สูงขึ้นมาก</p>
<h4>MCS และสูตรความเร็ว</h4>
<ul>
<li><b>MCS</b> (Modulation and Coding Scheme) = ชุดของ modulation + <b>coding rate</b> (สัดส่วน bit ข้อมูลจริงต่อ bit ที่ส่ง เช่น 5/6; ที่เหลือเป็น bit ป้องกัน error) MCS สูง = เร็วแต่ต้อง <b>SNR สูง</b></li>
<li>สัญญาณอ่อนลง AP และ client ลด MCS อัตโนมัติ (rate adaptation) จึงเห็นความเร็ว "ตก" เมื่อเดินห่าง</li>
<li><b>GI (Guard Interval)</b> = ช่วงเว้นท้าย symbol กัน multipath (คลื่นสะท้อนมาช้า) GI สั้นเร็วกว่าแต่เสี่ยง Wi-Fi 6 ใช้ 0.8/1.6/3.2 µs</li>
</ul>
<pre><code>PHY rate = (subcarrier ข้อมูล x bit/tone x coding rate x spatial stream) / เวลา symbol

ตัวอย่าง Wi-Fi 6, ช่อง 80 MHz (980 subcarrier), 1024-QAM (10 bit), coding 5/6 (MCS 11),
1 stream, symbol 13.6 us (12.8 + GI 0.8):
  = 980 x 10 x (5/6) / 13.6 us = 8166.7 / 13.6 = ราว 600 Mbps</code></pre>
<table>
<tr><th>ตัวอย่าง (1 spatial stream, rate สูงสุด)</th><th>PHY rate</th></tr>
<tr><td>Wi-Fi 4, 40 MHz, 64-QAM 5/6</td><td>150 Mbps (2 stream = 300 Mbps ตรงกับตำรา)</td></tr>
<tr><td>Wi-Fi 5, 80 MHz, 256-QAM 5/6</td><td>433 Mbps</td></tr>
<tr><td>Wi-Fi 6, 80 MHz, 1024-QAM 5/6</td><td>600 Mbps (160 MHz = 1.2 Gbps)</td></tr>
<tr><td>Wi-Fi 7, 80 MHz, 4096-QAM 5/6</td><td>720 Mbps (320 MHz = 2.88 Gbps)</td></tr>
</table>
<div class="warn"><b>ระวัง</b> ตัวเลข "9.6 Gbps" หรือ "46 Gbps" เป็นค่าทฤษฎีที่ใช้ 8 หรือ 16 stream ซึ่ง client ส่วนมากมีเพียง 1-2 stream และ <b>throughput จริงอยู่ที่ราว 50-70% ของ PHY rate</b> (เสียไปกับ header, ACK, contention) เช่น PHY 1200 Mbps → จริง 600-840 Mbps</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>HT = Wi-Fi 4, VHT = 5, HE = 6/6E, EHT = 7; QAM: 64 / 256 / 1024 / 4096 = Wi-Fi 4 / 5 / 6 / 7</li>
<li>rate = subcarrier x bit/tone x coding x stream / เวลา symbol; MCS สูง ต้อง SNR สูง</li>
<li>throughput จริง ≈ 50-70% ของ PHY rate</li>
</ul></div>`
      },
      {
        t: "5. MIMO MU-MIMO และ OFDMA: เพิ่มความจุเมื่อคนเยอะ (ประมาณ 5 นาที)",
        ref: "ตำรา หน้า 414-416 + Wi-Fi radio",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> ความเร็วต่อคนเพิ่มได้ด้วยการใช้หลายเสา (MIMO) ส่วนการรองรับคนจำนวนมากพร้อมกันใช้ MU-MIMO และ OFDMA ซึ่งเป็นหัวใจของ Wi-Fi 6</p>
<h4>MIMO และ spatial stream</h4>
<ul>
<li><b>MIMO</b> (Multiple Input Multiple Output): ส่งข้อมูลหลายสาย (<b>spatial stream</b>) พร้อมกันผ่านหลายเสาบนความถี่เดียวกัน rate เพิ่มตามจำนวน stream (2x2 MIMO = 2 stream)</li>
<li>จำนวน stream = ค่าต่ำสุดของเสาฝั่ง AP กับ client ส่วนใหญ่ client (มือถือ) มี 1-2 stream จึงเร็วไม่เท่าตัวเลขบนกล่อง AP</li>
<li>ต้องการสัญญาณที่มี multipath ดี (คลื่นสะท้อนช่วยแยกสาย) ซึ่งตรงข้ามกับสัญญาณเส้นตรงแบบ outdoor ไกล ๆ</li>
</ul>
<h4>MU-MIMO: ส่งแยก stream ให้คนละ client</h4>
<p>SU-MIMO ส่ง stream ทั้งหมดให้ client เดียวต่อครั้ง ส่วน <b>MU-MIMO</b> (Multi-User) AP ส่ง stream ต่างกันให้ <b>หลาย client พร้อมกัน</b> ได้ผลดีเมื่อ client อยู่คนละทิศทางพอ, packet ยาว และ SNR สูง Wi-Fi 5 wave2 ทำได้เฉพาะ downlink, <b>Wi-Fi 6 ทำได้ทั้ง uplink และ downlink</b></p>
<h4>OFDMA: แบ่ง channel ให้หลายคนใช้พร้อมกัน</h4>
${OFDMA}
<ul>
<li>OFDM เดิม: ใน 1 ช่วงเวลา มี client เพียงรายเดียวใช้ทั้ง channel แม้ส่ง packet เล็ก ๆ (เช่น ACK, sensor) ก็กินทั้งช่อง</li>
<li><b>OFDMA</b>: AP แบ่ง channel เป็น <b>RU</b> ให้หลาย client ส่งพร้อมกันในช่วงเวลาเดียว ลด contention, ลด latency และใช้ airtime คุ้มกับ packet เล็กจำนวนมาก</li>
<li>ได้ผลทุกความหนาแน่นของ client ต่างจาก MU-MIMO ที่ต้องพึ่งเงื่อนไขสัญญาณ</li>
</ul>
<table>
<tr><th>เลือกเมื่อ</th><th>MU-MIMO</th><th>OFDMA</th></tr>
<tr><td>แบ่งด้วย</td><td>spatial stream (มิติของพื้นที่)</td><td>RU = กลุ่ม subcarrier (มิติของความถี่)</td></tr>
<tr><td>เหมาะกับ</td><td>client น้อยราย packet ใหญ่/ยาว SNR สูง</td><td>client มากราย packet เล็ก (IoT, VoIP, ACK)</td></tr>
</table>
<div class="note"><b>เป้าของ Wi-Fi 6 (HEW: High Efficiency WLAN)</b> ไม่ใช่แค่ความเร็วสูงสุด แต่คือ throughput เฉลี่ยต่อผู้ใช้อย่างน้อย 4 เท่าของ Wi-Fi 5 ในสภาพหนาแน่น และรองรับผู้ใช้พร้อมกันได้มากกว่า 3 เท่า ด้วย OFDMA + MU-MIMO + 1024-QAM และยัง backward compatible กับ 802.11a/b/g/n/ac</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>Wi-Fi 6 = OFDMA + MU-MIMO (UL+DL) + 1024-QAM; ชื่อเป้าหมาย HEW</li>
<li>MU-MIMO แบ่งด้วย spatial stream (ดีเมื่อ packet ยาว SNR สูง); OFDMA แบ่งด้วย RU (ดีเมื่อ packet เล็กจำนวนมาก)</li>
<li>จำนวน stream จริง = min(AP, client)</li>
</ul></div>`
      },
      {
        t: "6. โครงสร้างเครือข่าย Wi-Fi: BSS SSID VAP ESS และ roaming (ประมาณ 5 นาที)",
        ref: "ตำรา หน้า 387-390",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> เมื่อรู้เรื่องคลื่นแล้ว ต่อไปคือคำเรียกหน่วยบริการ 5 คำที่มักถูกถามสลับกัน: BSS, BSSID, SSID, VAP, ESS จำเป็นต้องแยกให้ออกเพราะ config AP ทุกยี่ห้อใช้คำเหล่านี้</p>
${F("p387_1", "BSS: AP พร้อม SSID และ BSSID และ STA", "BSS: AP หนึ่งตัวกับ STA ในพื้นที่ครอบคลุม")}
<table>
<tr><th>คำ</th><th>ความหมาย</th><th>เทียบง่าย ๆ</th></tr>
<tr><td><b>STA</b></td><td>อุปกรณ์ปลายทางที่รองรับ 802.11 (โน้ตบุ๊ก มือถือ)</td><td>ลูกค้า</td></tr>
<tr><td><b>BSS</b></td><td>หน่วยบริการพื้นฐาน = AP หนึ่งตัว + STA ที่อยู่ในพื้นที่ครอบคลุม</td><td>หนึ่งร้านและลูกค้าในร้าน</td></tr>
<tr><td><b>BSSID</b></td><td>ตัวระบุ BSS = MAC address ของ AP (ไม่ซ้ำ, Data link layer)</td><td>เลขทะเบียนร้าน</td></tr>
<tr><td><b>SSID</b></td><td>ชื่อเครือข่ายที่คนอ่านออก (string) AP broadcast ให้ STA เห็น</td><td>ชื่อป้ายหน้าร้าน (หลายร้านใช้ชื่อซ้ำได้)</td></tr>
<tr><td><b>VAP</b></td><td>AP เสมือนหลายตัวบน AP จริงเครื่องเดียว แต่ละ VAP = 1 BSS</td><td>ร้านเดียวเปิดหลายเคาน์เตอร์</td></tr>
<tr><td><b>ESS</b></td><td>หลาย BSS ที่ใช้ SSID เดียวกันรวมเป็นเครือข่ายใหญ่</td><td>ร้านสาขาชื่อเดียวกัน</td></tr>
</table>
<p>ตัวอย่าง BSSID: AP ที่มี 2 radio (2.4 และ 5 GHz) ที่เปิด 2 SSID จะมี BSSID แยกให้ทุก VAP ทุก radio (MAC ต่างกัน) ขณะที่ SSID ซ้ำกันได้ ผู้ใช้เห็นเพียงชื่อ ส่วน AP รู้จักด้วย BSSID</p>
<h4>VAP: หลายเครือข่ายบน AP เครื่องเดียว</h4>
${F("p389_1", "AP หนึ่งตัวแบ่งเป็น VAP1 และ VAP2", "Fig. 12.13 VAP: SSID และ VLAN ต่างกัน")}
<ul>
<li>เหตุผล: เดิมอยากได้หลาย BSS ต้องซื้อหลาย AP ซึ่งแพงและกิน channel; ปัจจุบันสร้าง VAP หลายตัวบน AP เดียว ตั้ง SSID, password, <b>service VLAN</b> ต่างกันได้ (เช่น Staff VLAN 10 เข้าเครือข่ายภายใน, Guest VLAN 20 ออกเน็ตอย่างเดียว)</li>
<li>ข้อจำกัด: VAP ไม่ใช่ AP จริง ใช้ radio, channel และ airtime ร่วมกัน <b>ความจุรวมไม่เพิ่ม</b> และแต่ละ VAP ต้องส่ง beacon เองจึงกิน airtime เพิ่ม ควรมี SSID เท่าที่จำเป็น (ปฏิบัติกันทั่วไปไม่เกิน 3-4)</li>
</ul>
<h4>ESS และ roaming</h4>
${F("p390_1", "ESS: หลาย AP SSID เดียวกัน", "Fig. 12.14 ESS")}
<p>ESS ทำให้ผู้ใช้เดินจาก AP หนึ่งไปอีกตัวโดยไม่รู้สึกว่าเปลี่ยนเครือข่าย การย้าย BSS โดยบริการไม่สะดุดเรียกว่า <b>roaming</b> การตัดสินใจย้ายเป็นของ <b>STA</b> (AP ช่วยด้วย roaming ที่ AC) เงื่อนไขทั่วไปคือ AP ต้องใช้ <b>SSID และ security เหมือนกัน</b> และ channel ข้างเคียงควรต่างกัน; ถ้าชื่อหรือ security ต่างกันจะกลายเป็นคนละเครือข่าย ผู้ใช้ต้อง join ใหม่ (หลุดตอนเดินเปลี่ยน AP)</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>BSS = AP + STA; BSSID = MAC ของ AP; SSID = ชื่อ (ซ้ำได้); ESS = หลาย BSS SSID เดียวกัน</li>
<li>VAP = หลาย BSS ต่อ AP เดียว (SSID/VLAN/password ต่างได้) แต่ <b>แชร์ channel และ capacity</b></li>
<li>roaming ต้องใช้ SSID + security เดียวกัน</li>
</ul></div>`
      },
      {
        t: "7. สถาปัตยกรรม WLAN องค์กร: FAT AP, AC + FIT AP และ CAPWAP (ประมาณ 6 นาที)",
        ref: "ตำรา หน้า 378-384",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> AP ตัวเดียวจัดการเองได้ แต่ AP หลักร้อยหลักพันต้องมี "สมอง" กลาง (AC) หัวข้อนี้เล่าว่าแบ่งงานอย่างไร AP กับ AC คุยกันด้วยโปรโตคอลอะไร และต่อเข้าเครือข่ายแบบไหน</p>
${F("p379_1", "อุปกรณ์ WLAN บ้านและองค์กร", "Fig. 12.2 Home and enterprise wireless devices")}
<h4>อุปกรณ์ของ WLAN องค์กร</h4>
<ul>
<li><b>AP</b> (Access Point): ปล่อยสัญญาณ Wi-Fi เชื่อมผู้ใช้เข้าเครือข่ายสาย · <b>AC</b> (Access Controller): ควบคุม AP รวมศูนย์ · <b>PoE switch</b>: จ่ายไฟผ่านสาย LAN ให้ AP โดยไม่ต้องเดินสายไฟ · <b>STA</b>: อุปกรณ์ปลายทาง</li>
</ul>
<h4>FAT AP vs AC + FIT AP</h4>
${F("p380_1", "สถาปัตยกรรม WLAN: STA, AP, switch, AC", "Fig. 12.3 WLAN networking architecture")}
<table>
<tr><th>เรื่อง</th><th>FAT AP (autonomous)</th><th>AC + FIT AP</th></tr>
<tr><td>ใครทำอะไร</td><td>AP ทำทุกอย่างเอง (access, encrypt, forward, config)</td><td>AC ทำ access control, forwarding, config, roaming, security; FIT AP ทำ 802.11 encrypt/decrypt และ PHY</td></tr>
<tr><td>จัดการ</td><td>ต้อง config ทีละตัว, roaming ยาก</td><td>config ที่ AC ที่เดียว ส่งลงทุก AP</td></tr>
<tr><td>เหมาะกับ</td><td>บ้าน ร้านเล็ก AP 1-2 ตัว</td><td>องค์กรกลางถึงใหญ่ AP หลายสิบถึงหลายพัน</td></tr>
</table>
<p>FIT AP ทำงานเองไม่ได้ ต้องเข้า AC ก่อน; ยุคแรกของ Wi-Fi (primary mobile office) wireless เป็นส่วนเสริมและใช้ FAT AP, ต่อมาองค์กรที่ย้ายไป wireless office หรือ all-wireless office (cloud desktop, 4K, VR) ต้องใช้ AC เพื่อรองรับ capacity และ roaming</p>
${F("p381_1", "Agile distributed AP: AC, central AP, RF unit", "Fig. 12.4 Agile distributed AP")}
<p><b>Agile distributed</b> = AC + central AP + RF unit ใช้กับอาคารที่ผนังหนาและห้องเยอะ เช่น โรงแรมหรือหอพัก: RF unit วางในห้องส่งสัญญาณสั้น ๆ ไม่ต้องเจาะผนัง แต่ central AP จัดการรวมจึงมีโหนดต้องดูแลน้อยลง</p>
<h4>CAPWAP: ภาษาที่ AC ใช้คุยกับ AP</h4>
${F("p382_1", "AC สร้าง CAPWAP tunnel ไปยัง AP", "Fig. 12.5 CAPWAP tunnel")}
<ul>
<li><b>CAPWAP</b> (Control And Provisioning of Wireless Access Points, มาตรฐาน IETF) เป็น application layer protocol บน <b>UDP</b></li>
<li>มี 2 ช่องทาง: <b>control channel = UDP 5246</b> (management message ทุกชนิด, ส่ง config, Echo) และ <b>data channel = UDP 5247</b> (Keepalive และ data ของ STA เมื่อใช้ tunnel forwarding)</li>
<li>ทั้งสองช่องเลือกเข้ารหัสด้วย <b>DTLS</b> ได้</li>
<li>หน้าที่: ดูแลสถานะ AP-AC, ส่ง service config จาก AC ลง AP, และห่อ data ของ STA ส่งเข้า AC ในโหมด tunnel</li>
<li>ข้อควรระวัง: firewall ระหว่าง AP กับ AC ต้องเปิดทั้ง UDP 5246 และ 5247</li>
</ul>
<h4>AP เข้าถึง AC ได้อย่างไร (Layer 2 vs Layer 3)</h4>
${F("p383_1", "AP-AC networking แบบ Layer 2 และ Layer 3", "Fig. 12.6 AP-AC networking: L2 (ซ้าย), L3 (ขวา)")}
<table>
<tr><th>เรื่อง</th><th>Layer 2 networking</th><th>Layer 3 networking</th></tr>
<tr><td>ลักษณะ</td><td>AP กับ AC ต่อกันตรงหรือผ่านเครือข่าย L2 เดียวกัน</td><td>มี router คั่นระหว่าง AP กับ AC</td></tr>
<tr><td>การหา AC</td><td>plug and play ผ่าน broadcast หรือ DHCP</td><td>broadcast ข้ามไม่ได้ ต้องบอกด้วย DHCP Option 43 / DNS / static IP</td></tr>
<tr><td>เหมาะกับ</td><td>เครือข่ายเล็ก ชั่วคราว ตั้งเร็ว</td><td>เครือข่ายใหญ่ (AC เดียวคุม AP หลายสิบถึงร้อย, AP กระจายหลายอาคาร)</td></tr>
</table>
<h4>AC ต่อเข้าเครือข่ายอย่างไร (Direct vs Bypass)</h4>
${F("p383_2", "direct networking และ bypass mode", "Fig. 12.7 AC connection: (a) direct (b) bypass")}
<table>
<tr><th>เรื่อง</th><th>Direct networking</th><th>Bypass mode</th></tr>
<tr><td>ตำแหน่ง AC</td><td>อยู่ใน forwarding path ของผู้ใช้</td><td>ต่อแยกออกด้านข้าง (มักเข้า aggregation switch)</td></tr>
<tr><td>data ผู้ใช้</td><td>ผ่าน AC เสมอ</td><td>เลือกได้: ผ่าน AC (tunnel) หรือไม่ผ่าน (direct forwarding)</td></tr>
<tr><td>ข้อดี</td><td>โครงสร้างตรงไปตรงมา</td><td>เสริมจากเครือข่ายเดิมได้ง่าย แค่เพิ่ม AC</td></tr>
<tr><td>ข้อเสีย</td><td>AC เป็น bottleneck ได้ถ้า throughput ผู้ใช้สูง</td><td>AC ดูแล AP เท่านั้น</td></tr>
</table>
<p>เครือข่ายไร้สายมักขยายทีหลังบนเครือข่ายสายเดิม จึงนิยม <b>bypass</b> ที่สุด</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>FAT = ทำเดี่ยว (บ้าน); AC + FIT = ควบคุมรวมศูนย์ (องค์กร); FIT ต้องมี AC</li>
<li>CAPWAP: UDP 5246 = control, UDP 5247 = data, DTLS เลือกได้</li>
<li>AP-AC: L2 (ง่าย/เล็ก) vs L3 (ต้อง Option 43/DNS/static); AC: direct (ผ่าน AC) vs bypass (ต่อข้าง นิยมกว่า)</li>
</ul></div>`
      },
      {
        t: "8. AP online และการส่ง config: จาก AP เปล่าถึงออกอากาศ SSID (ประมาณ 7 นาที)",
        ref: "ตำรา หน้า 390-399",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> WLAN แบบ AC + FIT AP ทำงานเป็น 4 phase: AP go online, AC ส่ง config, STA เข้าใช้งาน, ส่งข้อมูล หัวข้อนี้ครอบคลุม 2 phase แรกซึ่งเป็นจุดที่เจอปัญหา "AP ไม่ขึ้น" บ่อยที่สุด</p>
${F("p391_1", "4 ขั้นตอนการทำงานของ WLAN", "Fig. 12.15 Working process of WLAN")}
<h4>Phase 1: AP go online (5 ขั้น)</h4>
<ol>
<li><b>AP ได้ IP</b>: static (ตั้งเอง) หรือ DHCP (AP เป็น DHCP client; server อาจเป็น AC, L3 switch, router หรือเครื่อง server)</li>
<li><b>AP ค้นหา AC (Discovery)</b>: AP ส่ง <b>Discovery Request</b> ไปหา AC และ AC ตอบ <b>Discovery Response</b> AP เลือก AC จาก priority หรือจำนวน AP ที่ AC นั้นรับอยู่</li>
<li><b>Join</b>: AP ส่ง <b>Join Request</b>; AC ตรวจสิทธิ์ AP แล้วตอบ <b>Join Response</b> (วิธีตรวจ: <b>mac-auth</b> (default), <b>sn-auth</b>, <b>no-auth</b>)</li>
<li><b>Upgrade version</b>: ถ้า version ไม่ตรงกับที่ AC ระบุ AP ส่ง <b>Image Data Request</b> ดาวน์โหลด image แล้ว restart และเริ่มรอบใหม่</li>
<li><b>Tunnel maintenance</b>: data channel ส่ง <b>Keepalive (UDP 5247)</b>, control channel ส่ง <b>Echo (UDP 5246)</b> ตรวจว่ายังเชื่อมกัน</li>
</ol>
${F("p392_1", "Discovery Request/Response", "Discovery: AP หา AC")}
<table>
<tr><th>วิธีหา AC</th><th>ทำงานอย่างไร</th><th>ใช้เมื่อ</th></tr>
<tr><td>Static</td><td>ตั้งรายการ IP ของ AC ไว้บน AP ส่ง Discovery Request แบบ unicast ไปทุก AC ในรายการ</td><td>เครือข่าย L3 ที่ไม่มี DHCP กลาง</td></tr>
<tr><td>Dynamic: DHCP</td><td>DHCP ตอบพร้อม <b>Option 43 (sub-option 3)</b> บรรจุ IP ของ AC</td><td>L3 และ AP จำนวนมาก (นิยม)</td></tr>
<tr><td>Dynamic: DNS</td><td>AP ถามชื่อโดเมนของ AC</td><td>L3 ที่มี DNS</td></tr>
<tr><td>Dynamic: broadcast</td><td>AP ส่ง Discovery Request แบบ broadcast ถ้า DHCP/DNS ไม่ได้ผล</td><td>เฉพาะ L2 ที่ถึงกัน</td></tr>
</table>
<pre><code># DHCP Option 43 ให้ AC 192.168.22.1 (หลาย AC คั่นด้วย comma)
option 43 sub-option 3 ascii 192.168.22.1,192.168.22.2</code></pre>
${F("p394_1", "Join Request/Response", "Join: AC ตรวจสิทธิ์ AP")}
<p><b>การเพิ่ม AP บน AC</b> มี 3 แบบ: <b>offline import</b> (ใส่ MAC/SN ไว้ล่วงหน้า ตรงเมื่อ AP มา = online เอง), <b>auto-discovery</b> (ถ้า no-auth หรืออยู่ใน whitelist), และ <b>manual confirm</b> (mac/sn-auth แต่ไม่ได้ import AP จะค้างใน "unauthenticated AP list" ให้ผู้ดูแลกดยืนยัน)</p>
<p>แหล่ง image: <b>AC mode</b> (AP น้อย), <b>FTP</b> (plain text ไม่ปลอดภัย), <b>SFTP</b> (เข้ารหัส + integrity) สำหรับ AP ที่ยังไม่ online ตั้ง <b>auto upgrade</b> ล่วงหน้า; AP ที่ online แล้วใช้ <b>timed upgrade</b> ในช่วง traffic ต่ำ</p>
<h4>Phase 2: AC ส่ง config ให้ AP</h4>
<p>AC ส่ง <b>Configuration Update Request</b> AP ตอบ Response แล้ว AP ใช้ config นั้นออกอากาศ SSID ผู้ดูแลไม่ได้ตั้งทีละค่า แต่จัดเป็น <b>profile</b> ซ้อนชั้นแล้วผูกกับ <b>AP group</b> (AP หนึ่งตัวอยู่ได้ group เดียว; ถ้า config เฉพาะ AP ขัดกับ group <b>ค่าของ AP เองมี priority</b>)</p>
<table>
<tr><th>Profile</th><th>กำหนดอะไร</th></tr>
<tr><td>Regulatory domain</td><td><b>country code</b> (กำหนดกำลังส่งและ channel ตามกฎหมายประเทศนั้น) + tuning channel set (หลีกเลี่ยงช่อง radar)</td></tr>
<tr><td>RF profile / RF parameter</td><td>ชนิด RF, rate, multicast rate, beacon interval, channel, กำลังส่ง, antenna gain, ACK timeout</td></tr>
<tr><td>VAP profile</td><td>ถูกอ้างโดย AP group/AP แล้วสร้าง VAP: ภายในอ้าง SSID profile, security profile, <b>data forwarding method</b> (tunnel/direct) และ <b>service VLAN</b></td></tr>
</table>
${F("p398_1", "VAP profile อ้าง SSID, security, forwarding, VLAN", "VAP profile = SSID + security + forwarding + service VLAN")}
<ul>
<li><b>SSID profile</b>: ชื่อ SSID, ซ่อน SSID, จำกัดจำนวนผู้ใช้ต่อ VAP · <b>Security profile</b>: open, WEP, WPA/WPA2-PSK, WPA/WPA2-802.1X</li>
<li><b>Service VLAN</b>: ถ้ามีผู้ใช้หนาแน่นใน VLAN เดียว IP จะไม่พอ ใช้ <b>VLAN pool</b> ให้ SSID เดียวกระจายผู้ใช้เข้าหลาย VLAN ลด broadcast domain</li>
</ul>

<p>คำสั่งหลัก: <code>ssid-profile</code>, <code>security-profile ... security wpa-wpa2 psk pass-phrase ... aes</code>, <code>vap-profile ... forward-mode tunnel / service-vlan vlan-id 101</code> แล้ว <code>vap-profile ... wlan 1 radio 0</code> ใน AP group; password ของ PSK ยาว 8-63 ตัวอักษร; <b>wlan-id</b> ของ VAP คือ 1-16; <b>ต้องผูก (apply) VAP profile เข้า AP group</b> AC จึงจะส่ง config ให้ AP ตรวจด้วย <code>display ap all</code> (State <b>nor</b> = ปกติ) และ <code>display vap all</code></p>
<p>State ใน <code>display ap all</code>: <b>nor</b> = ปกติ, <b>idle</b> = ยังไม่สร้าง connection, <b>fault</b> = online ไม่สำเร็จ, <b>download</b> = กำลังอัปเกรด, <b>commit-failed</b> = online แล้วแต่ส่ง service config ไม่สำเร็จ</p>
<div class="must"><b>ต้องจำ</b><ul>
<li>ลำดับ online: IP → Discovery → Join → (Image data) → Keepalive 5247 / Echo 5246 → AC ส่ง config</li>
<li>ตรวจ AP: mac-auth (default) / sn-auth / no-auth; Option 43 sub-option 3 บอก IP ของ AC</li>
<li>VAP profile = SSID + security + forward-mode + service VLAN, ต้อง apply เข้า AP group; radio 0 = 2.4 GHz, radio 1 = 5 GHz</li>
</ul></div>`
      },
      {
        t: "9. STA เข้าใช้งานอย่างไร และข้อมูลถูกส่งต่อแบบ direct หรือ tunnel (ประมาณ 6 นาที)",
        ref: "ตำรา หน้า 399-413",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> เมื่อ AP ออกอากาศ SSID แล้ว ผู้ใช้ต้องผ่านขั้นตอน 6 ขั้นก่อนใช้งานได้ และข้อมูลของผู้ใช้จะวิ่งไปทาง AC (tunnel) หรือออกตรงจาก AP (direct) ตามที่ตั้งใน VAP profile</p>
<h4>STA access 6 ขั้น</h4>
<ol>
<li><b>Scanning</b>: STA หา AP · <b>Active</b>: ส่ง <b>Probe Request</b> (ระบุ SSID หรือ broadcast) ทีละ channel, AP ตอบ <b>Probe Response</b> · <b>Passive</b>: ฟัง <b>Beacon</b> ที่ AP ส่งเป็นระยะ (default 100 TU, 1 TU = 1024 µs ≈ 102.4 ms)</li>
<li><b>Link authentication</b>: 802.11 มี <b>open system</b> (ไม่ตรวจอะไร ใครก็ผ่าน) และ <b>shared key</b> (ตรวจ key ตรงกัน)</li>
<li><b>Association</b>: STA ส่งข้อความ association เพื่อ <b>negotiate link service</b> (rate, channel ฯลฯ)</li>
<li><b>Access authentication</b>: แยกผู้ใช้และจำกัดสิทธิ์ก่อนใช้เครือข่าย ปลอดภัยกว่า link auth เช่น <b>PSK</b> (WPA/WPA2), <b>802.1X</b></li>
<li><b>STA address assignment</b>: ขอ IP ผ่าน DHCP (AC หรือ aggregation switch เป็น server; นิยมใช้ aggregation switch)</li>
<li><b>User authentication</b>: ความปลอดภัยปลายถึงปลาย เช่น 802.1X, MAC auth, <b>Portal</b> (web login/SMS ผูกตัวตนจริงจึงตรวจย้อนหลังได้)</li>
</ol>
${F("p400_1", "Active scanning: Probe Request/Response", "Fig. 12.22 Active scanning")}
<ul>
<li>ใช้เวลา scan: passive ต้องรอ beacon ราว 102.4 ms ต่อ channel (13 channel ≈ 1.33 s ในกรณีแย่สุด) ส่วน active เร็วกว่าเพราะ AP ตอบทันที</li>
<li>SSID ที่ซ่อนจะไม่อยู่ใน Beacon ผู้ใช้ต้องรู้ชื่อและพิมพ์เอง แต่ไม่ใช่ความปลอดภัยจริง เพราะ SSID ยังโผล่ใน Probe/Association ที่ STA ส่ง</li>
</ul>
<h4>การส่งต่อข้อมูล: tunnel vs direct</h4>
${F("p402_1", "tunnel forwarding และ direct forwarding", "Fig. 12.23 (a) tunnel (b) direct forwarding")}
<table>
<tr><th>เรื่อง</th><th>Tunnel forwarding (centralized)</th><th>Direct forwarding (local)</th></tr>
<tr><td>เส้นทาง data</td><td>AP ห่อด้วย CAPWAP data tunnel ส่ง <b>เข้า AC</b> แล้ว AC ส่งต่อ</td><td>AP ส่งออก uplink <b>โดยตรง</b> ไม่ผ่าน AC</td></tr>
<tr><td>ข้อดี</td><td>คุม policy/ความปลอดภัย/สถิติรวมศูนย์ได้ง่าย</td><td>ประสิทธิภาพสูง ลดภาระ AC</td></tr>
<tr><td>ข้อเสีย</td><td>AC รับภาระทุก bit (bottleneck ได้)</td><td>ควบคุมรวมศูนย์ยากกว่า</td></tr>
<tr><td>config</td><td><code>forward-mode tunnel</code></td><td><code>forward-mode direct-forward</code></td></tr>
<tr><td>gateway ของ service VLAN</td><td>อยู่ที่ AC (VLAN จบที่ AC)</td><td>อยู่ที่ switch/aggregation ฝั่ง uplink; VLAN ต้อง trunk ถึง switch ของ AP</td></tr>
</table>
<p>ข้อความควบคุม (management) ทุกชนิดผ่าน CAPWAP control channel ในทั้งสองโหมด ส่วน data ของผู้ใช้เลือกได้ต่อ VAP เช่น SSID พนักงาน = tunnel (คุม policy รวม), SSID แขก = direct (ออกเน็ตเร็ว ไม่ดึง AC) และเมื่อ AC ต่อแบบ <b>direct networking</b> data ต้องผ่าน AC อยู่แล้ว ส่วน <b>bypass</b> เลือกได้ทั้งสอง (bypass + direct forwarding คือรูปแบบที่ AC ต่อ aggregation switch ด้วย interface เดียวและ data ผู้ใช้ไม่เข้า AC)</p>
<h4>กรณีศึกษา: Layer 2 bypass + tunnel forwarding</h4>
<p>สำนักงาน 2 ห้อง AP ละห้อง, AC เป็น DHCP server แจก IP ให้ AP และ STA, source interface ของ CAPWAP = Vlanif 100</p>
${F("p406_1", "Logical topology: AR, SW1, AC, SW2, AP, VLAN 101/102", "Fig. 12.25 Logical topology")}
<table>
<tr><th>ข้อมูล</th><th>ค่า</th></tr>
<tr><td>AP management VLAN</td><td>VLAN 100 (192.168.100.0/24), AC เป็น gateway (Vlanif 100)</td></tr>
<tr><td>Service VLAN</td><td>Office1 = VLAN 101, Office2 = VLAN 102 (tunnel จึงมาจบที่ AC)</td></tr>
<tr><td>AC - SW1 / SW1 - AR</td><td>VLAN 110 / VLAN 111 ; AC มี default route ไป SW1, SW1 มี route กลับไป 100/101/102 ผ่าน AC</td></tr>
</table>
<p>ลำดับ config: (1) interworking (VLAN, Vlanif, DHCP, route) → (2) AP go online: regulatory domain + AP group + <code>capwap source interface Vlanif 100</code> + <code>ap auth-mode</code> + import AP → (3) SSID/security/VAP profile → apply เข้า AP group; ตรวจ <code>display station all</code> ว่า STA ได้ IP ตาม VLAN (192.168.101.x / 192.168.102.x)</p>
<h4>ตารางไล่ปัญหาเมื่อ AP หรือ STA ไม่ขึ้น</h4>
<table>
<tr><th>อาการ</th><th>สาเหตุที่น่าสงสัย</th></tr>
<tr><td>AP ได้ IP แต่ไม่ไป AC</td><td>คนละ subnet และไม่มี Option 43/DNS/static AC; firewall บล็อก UDP 5246/5247</td></tr>
<tr><td>AP ค้างใน unauthenticated list</td><td>auth-mode เป็น mac/sn แต่ไม่ได้ import AP (ต้อง confirm เองหรือ import)</td></tr>
<tr><td>State = commit-failed</td><td>online แล้วแต่ AC ส่ง service config ไม่สำเร็จ (เช่น profile ผิด/ไม่ apply)</td></tr>
<tr><td>เห็น SSID แต่ต่อไม่ได้</td><td>password/security ไม่ตรง (access auth)</td></tr>
<tr><td>ต่อได้แต่ไม่ได้ IP</td><td>ไม่มี DHCP pool ใน service VLAN หรือ VLAN ไม่ถึง DHCP server</td></tr>
</table>
<div class="must"><b>ต้องจำ</b><ul>
<li>STA 6 ขั้น: Scanning → Link auth → Association → Access auth → DHCP → User auth</li>
<li>passive = ฟัง Beacon (100 TU = 102.4 ms), active = Probe Request/Response; link auth = open system / shared key</li>
<li>tunnel = ผ่าน AC (คุมรวมศูนย์), direct = ไม่ผ่าน AC (เร็ว); control traffic ผ่าน CAPWAP เสมอ</li>
</ul></div>`
      },
      {
        t: "10. หลักออกแบบ Wi-Fi ที่ดี: coverage vs capacity และ checklist (ประมาณ 5 นาที)",
        ref: "Wi-Fi radio, ตำรา หน้า 414-416",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> ความผิดพลาดที่พบบ่อยที่สุดคือออกแบบให้ "สัญญาณเต็มทุกมุม" แล้วเจอว่าคนเยอะแล้วช้า หัวข้อนี้เอาทุกเรื่องที่ผ่านมามารวมเป็นหลักตัดสินใจ</p>
<h4>Coverage กับ Capacity ต่างกัน</h4>
<table>
<tr><th>เรื่อง</th><th>Coverage</th><th>Capacity</th></tr>
<tr><td>ถามว่า</td><td>สัญญาณถึงไหม</td><td>ทุกคนได้ความเร็วพอไหมพร้อมกัน</td></tr>
<tr><td>ดูจาก</td><td>RSSI, SNR</td><td>airtime, throughput ต่อผู้ใช้, จำนวน client ต่อ AP</td></tr>
<tr><td>แก้ด้วย</td><td>เพิ่ม AP ในจุดอับ</td><td>เพิ่มจำนวน AP แบ่ง cell, เลือก channel/width ดี, 5/6 GHz</td></tr>
</table>
<p><b>เป้าหมาย: ให้ทุกคนต่อที่ MCS/rate สูง</b> เพราะ shared medium ทำให้ client ที่ rate ต่ำกินเวลานานและฉุดคนอื่น จึงออกแบบเป็น <b>small cell</b>: AP ห่างกันราว 8-12 m ในที่ผู้ใช้หนาแน่น, cell edge ราว -55 ถึง -65 dBm และ Tx power ของ AP ปานกลาง ไม่เร่งสุด</p>
<h4>ตัวอย่างคำนวณความจุ</h4>
<pre><code>ห้องประชุม 20 คน ดูวิดีโอ 4K คนละ 50 Mbps  = 1000 Mbps
AP Wi-Fi 6 80 MHz 2 stream: PHY 1200 Mbps → จริง 600-840 Mbps (50-70%)
1 AP ไม่พอ (840 < 1000) → ใช้อย่างน้อย 2 AP คนละ channel (จริง 1200-1680 Mbps >= 1000)</code></pre>
<h4>Checklist ก่อนปล่อยของจริง</h4>
<ol>
<li>นับ <b>จำนวน client และ bandwidth ต่อคน</b> แล้วเทียบกับ 50-70% ของ PHY ไม่ใช่ rate บนกล่อง</li>
<li><b>แผน channel</b>: 2.4 GHz ใช้ 1-6-11 กว้าง 20 MHz; 5/6 GHz เลือกความกว้างให้ยังเหลือช่องแยกกัน; ใช้ RF tuning/auto channel ลด CCI</li>
<li><b>กำลังส่ง</b>: ไม่เกิน EIRP ตามกฎ; เพิ่ม AP แทนการเร่งกำลัง (client ส่งกลับไม่ไหว uplink จึงไม่ดีขึ้น และ cell ใหญ่ขึ้น CCI เพิ่ม)</li>
<li><b>ดัน client ไป 5/6 GHz</b> เพราะ 2.4 GHz มีแค่ 3 ช่องและรบกวนมาก</li>
<li><b>จำนวน SSID/VAP</b> เท่าที่จำเป็น; แยก VLAN ตามกลุ่มผู้ใช้</li>
<li><b>Forwarding</b>: traffic เยอะ/ออกเน็ตตรง = direct; ต้องคุม policy รวมศูนย์ = tunnel; ดู capacity ของ AC เสมอ</li>
<li><b>AP-AC</b>: เครือข่ายใหญ่ใช้ L3 + DHCP Option 43; firewall เปิด UDP 5246/5247; ใช้ bypass ถ้าขยายจากเครือข่ายเดิม</li>
<li><b>Site survey</b> ก่อนติดตั้งและตรวจซ้ำหลังติดตั้ง; อัปเดต driver/firmware ของ client</li>
</ol>
<div class="note"><b>เมื่อบริการต้องการเกณฑ์</b> ตามตำรา: 4K video ราว 50 Mbps ต่อคน, voice delay ต่ำกว่า 30 ms, VR ราว 75 Mbps ต่อคนและ delay ต่ำกว่า 15 ms ซึ่งเป็นเหตุผลที่ต้องออกแบบตาม capacity และ latency</div>
<div class="must"><b>ต้องจำ</b><ul>
<li>ออกแบบตาม capacity (airtime) ไม่ใช่แค่ coverage; small cell, cell edge -55 ถึง -65 dBm</li>
<li>แก้ช้าด้วย "เพิ่ม AP + channel plan + 5/6 GHz" ไม่ใช่เพิ่ม Tx power</li>
<li>throughput จริง ≈ 50-70% ของ PHY</li>
</ul></div>`
      },
      {
        t: "11. Wi-Fi 7 แนวโน้ม และสรุปทั้งเล่ม (ประมาณ 4 นาที)",
        ref: "Wi-Fi radio, ตำรา หน้า 414-416",
        html: `
<p><b>ภาพรวมของหัวข้อนี้:</b> Wi-Fi 7 (802.11be) แก้ปัญหา "ช่องสะอาดไม่พอ" และ "ต้องเลือกช่องเดียว" ด้วยช่องกว้างขึ้น modulation หนาขึ้น ใช้หลายช่องพร้อมกัน และตัดเฉพาะส่วนที่โดนรบกวน</p>
<h4>4 สิ่งที่ Wi-Fi 7 เพิ่มจาก Wi-Fi 6E</h4>
<table>
<tr><th>เทคโนโลยี</th><th>คืออะไร</th><th>ข้อควรระวัง</th></tr>
<tr><td><b>320 MHz</b></td><td>ช่องกว้าง 2 เท่าของ 160 MHz (เฉพาะ 6 GHz, optional)</td><td>noise floor สูงขึ้น, ไทยมีได้ช่องเดียว (500 MHz)</td></tr>
<tr><td><b>4096-QAM</b> (MCS 12-13)</td><td>12 bit ต่อ tone (+20% จาก 1024-QAM)</td><td>ต้อง SNR สูงมาก ใช้ได้เฉพาะ client ใกล้ AP</td></tr>
<tr><td><b>MLO</b> (Multi-Link Operation)</td><td>ใช้หลาย band/link พร้อมกัน: <b>alternating</b> สลับ link หลบ interference (latency ต่ำสม่ำเสมอ ใช้ radio เดียวได้) และ <b>concurrent</b> รวมหลาย band พร้อมกัน (peak สูง ต้องหลาย radio)</td><td>อุปกรณ์ต้องรองรับ (single-radio สลับได้อย่างเดียว, multi-radio ส่ง/รับพร้อมกัน STR)</td></tr>
<tr><td><b>Puncturing + MRU</b></td><td>ตัดช่อง 20 MHz ที่โดนรบกวนออกจากช่องที่ bond แล้ว ใช้ส่วนที่เหลือต่อได้ (Multi-RU รวม RU ที่ไม่ต่อเนื่อง)</td><td>เดิมต้องลดความกว้างช่องลงหมด เช่น 160 → 80</td></tr>
</table>
<p>ตัวอย่าง: ช่อง 160 MHz ถูกรบกวน 20 MHz เดียว → puncturing ยังใช้ได้ 140 MHz (87.5%) แทนที่จะเหลือ 80 MHz (50%)</p>
<h4>สรุปทั้งเล่มในบรรทัดเดียวต่อเรื่อง</h4>
<ol>
<li>ไร้สายแชร์ airtime ร่วมกัน จึงต้องออกแบบ capacity ไม่ใช่แค่ coverage</li>
<li>เลือก band/channel ไม่ให้ชน: 2.4 GHz = 1/6/11; bonding แลกกับ noise และจำนวนช่อง</li>
<li>สัญญาณ = EIRP - path loss; EIRP ต้องไม่เกินกฎ (2.4 GHz = 20 dBm)</li>
<li>ความเร็ว = modulation x channel width x stream x coding; MCS สูง ต้อง SNR สูง; จริง 50-70%</li>
<li>Wi-Fi 6 เพิ่มความจุด้วย OFDMA + MU-MIMO; Wi-Fi 7 เพิ่มด้วย 320 MHz, 4K-QAM, MLO, puncturing</li>
<li>BSS/SSID/VAP/ESS: ESS ที่ SSID เดียวกันให้ roaming; VAP ไม่เพิ่มความจุ</li>
<li>องค์กรใช้ AC + FIT AP คุยกันด้วย CAPWAP (UDP 5246 control, 5247 data)</li>
<li>AP online: IP → Discovery → Join → Image → Keepalive/Echo แล้ว AC ส่ง config (AP group > profile)</li>
<li>STA 6 ขั้น และ data เลือก tunnel (ผ่าน AC) หรือ direct (ไม่ผ่าน AC) ตามเป้าหมายควบคุมกับประสิทธิภาพ</li>
</ol>
<div class="must"><b>ต้องจำ</b><ul>
<li>Wi-Fi 7 = 320 MHz + 4K-QAM + MLO + puncturing/MRU (MLO: alternating / concurrent)</li>
<li>Wi-Fi 6 = OFDMA + MU-MIMO + 1024-QAM (HEW), backward compatible</li>
<li>6E = 802.11ax บน 6 GHz (ไม่ใช่มาตรฐานใหม่)</li>
</ul></div>`
      }
    ],
    ex: [
      {
        type: "choice",
        story: `AP รุ่นหนึ่งตั้งกำลังส่ง 200 mW ในย่าน 2.4 GHz ผู้ดูแลต้องบันทึกค่านี้เป็น dBm และเช็คกับเพดาน EIRP`,
        q: "200 mW เท่ากับกี่ dBm และเทียบกับเพดาน 2.4 GHz ของไทยได้ผลอย่างไร (สมมติเสาอากาศ 0 dBi ไม่มีสาย)?",
        opts: [
          { t: "23 dBm เกินเพดาน 20 dBm อยู่ 3 dB", why: "ถูก: 100 mW = 20 dBm, x2 = +3 dB จึง 23 dBm เกินเพดาน 100 mW" },
          { t: "20 dBm พอดีเพดาน", why: "ผิด: 20 dBm คือ 100 mW ไม่ใช่ 200 mW" },
          { t: "26 dBm", why: "ผิด: นั่นคือ 400 mW (x4 = +6 dB)" },
          { t: "40 dBm", why: "ผิด: 40 dBm = 10,000 mW (10 W) มากเกินไปหลายเท่า" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ย่าน 5.470-5.725 GHz เพดาน EIRP ของไทยคือ 500 mW (27 dBm) ผู้ดูแลติดเสา 6 dBi มีสายสัญญาณ loss 1 dB และวิทยุตั้ง Tx ได้ละเอียดทีละ 1 dBm`,
        q: "Tx สูงสุดที่ยังถูกกฎหมายคือเท่าใด?",
        opts: [
          { t: "22 dBm", why: "ถูก: EIRP = Tx + 6 - 1 = Tx + 5 ต้อง <= 27 จึง Tx <= 22" },
          { t: "27 dBm", why: "ผิด: ลืมบวก gain ของเสา จะได้ EIRP 32 dBm เกิน 5 dB" },
          { t: "21 dBm", why: "ผิด: ถูกกฎหมายก็จริง แต่ไม่ใช่ค่าสูงสุดที่ใช้ได้ (Tx = 22 ได้ EIRP พอดี 27)" },
          { t: "28 dBm", why: "ผิด: สายสัญญาณทำให้ EIRP ลดลง แต่เสา 6 dBi เพิ่มมากกว่า สุทธิ +5 dB จึงเพิ่ม Tx เกินไม่ได้" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ห้องทำงานย่าน 5 GHz EIRP 23 dBm, client ห่างจาก AP 8 m (= 2x2x2) มีผนัง 2 ชั้น ชั้นละ 6 dB ค่า loss 1 m แรก 47 dB`,
        q: "RSSI ที่คาดคือเท่าใด?",
        opts: [
          { t: "-54 dBm", why: "ถูก: loss = 47 + 3 x 6 (ระยะ) + 12 (ผนัง) = 77 dB; 23 - 77 = -54 dBm" },
          { t: "-42 dBm", why: "ผิด: ลืมหัก loss ผนัง 12 dB (คำตอบนี้คือกรณีไม่มีผนัง)" },
          { t: "-66 dBm", why: "ผิด: นับระยะ 8 m เป็น x4 (12 dB) ผิด; 8 = 2^3 จึงเพิ่ม 18 dB" },
          { t: "-77 dBm", why: "ผิด: นี่คือค่า loss รวมแต่ยังไม่ได้ลบจาก EIRP 23 dBm" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ชั้นสำนักงานมี AP 4 ตัวเรียงตามทางเดินยาว A-B-C-D ใช้ย่าน 2.4 GHz ช่อง 20 MHz เท่านั้น ผู้ดูแลต้องแจก channel ให้ทุกตัว`,
        q: "การจัดแบบใดดีที่สุด?",
        opts: [
          { t: "A=1, B=6, C=11, D=1", why: "ถูก: ตัวติดกันใช้ช่องไม่ซ้อน และ D ใช้ช่อง 1 ซ้ำกับ A ที่อยู่ไกลสุด (CCI น้อยสุดที่หลีกเลี่ยงไม่ได้)" },
          { t: "A=1, B=3, C=6, D=9", why: "ผิด: 1-3, 3-6, 6-9 ห่างแค่ 2-3 ช่อง (10-15 MHz) ซ้อนทับ เกิด ACI ซึ่งแย่กว่า CCI" },
          { t: "A=1, B=6, C=11, D=12", why: "ผิด: 11 กับ 12 ติดกัน ซ้อนทับเกือบหมด" },
          { t: "ทุกตัวใช้ channel 6 เพื่อให้ roaming ง่าย", why: "ผิด: CCI สูงสุด ทุก AP แบ่ง airtime ร่วมกัน roaming ไม่ต้องใช้ channel เดียวกัน" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ที่ลูกค้าตำแหน่งหนึ่ง RSSI = -68 dBm คงที่ ที่ channel 20 MHz noise floor = -95 dBm ผู้ดูแลพิจารณาเปลี่ยนเป็น 80 MHz (สมมติ RSSI รวมไม่เปลี่ยน)`,
        q: "SNR ที่ 80 MHz เป็นเท่าใด และมีผลอย่างไร?",
        opts: [
          { t: "21 dB: ลดลงจาก 27 dB เพราะ noise เพิ่ม 6 dB จึงใช้ MCS ต่ำลงได้", why: "ถูก: 80 MHz = x4 = สองครั้งของ x2 → noise +6 dB = -89 dBm; SNR = -68 - (-89) = 21 dB (เดิม 27)" },
          { t: "27 dB: ไม่เปลี่ยนเพราะ RSSI เท่าเดิม", why: "ผิด: noise floor ขยับขึ้นตามความกว้างช่อง SNR จึงเปลี่ยน" },
          { t: "33 dB: เพิ่มขึ้น 6 dB", why: "ผิด: ทิศทางกลับกัน noise เพิ่มทำให้ SNR ลด" },
          { t: "15 dB: noise เพิ่ม 12 dB", why: "ผิด: x2 ต่อครั้งให้ +3 dB เท่านั้น 20→80 คือ 2 ครั้ง = +6 dB" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `เครื่องของลูกค้ารองรับ Wi-Fi 6 ต่อ AP ย่าน 5 GHz ช่อง 80 MHz แบบ 2 spatial stream ที่ MCS สูงสุด (1024-QAM, coding 5/6, GI 0.8 µs) ที่ 1 stream ได้ราว 600 Mbps`,
        q: "PHY rate สูงสุดคาดว่าเท่าใด และ throughput จริงควรได้ประมาณเท่าใด?",
        opts: [
          { t: "PHY ราว 1200 Mbps; จริงราว 600-840 Mbps", why: "ถูก: 2 stream = 2 x 600; จริง 50-70% ของ PHY = 600-840" },
          { t: "PHY ราว 600 Mbps; จริงราว 600 Mbps", why: "ผิด: ลืม stream ที่ 2 และ throughput จริงไม่เท่า PHY" },
          { t: "PHY ราว 1200 Mbps; จริงราว 1200 Mbps", why: "ผิด: ข้อมูลจริงเสียไปกับ header, ACK และ contention" },
          { t: "PHY ราว 2400 Mbps; จริงราว 1200 Mbps", why: "ผิด: 2400 ต้องใช้ 4 stream" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ห้องประชุม 20 คน ดูวิดีโอ 4K พร้อมกัน คนละ 50 Mbps ติดตั้ง AP เดียว (Wi-Fi 6, 80 MHz, PHY ที่ client ราว 1200 Mbps)`,
        q: "ข้อสรุปใดถูกที่สุด?",
        opts: [
          { t: "ไม่พอ: ต้องการ 1000 Mbps แต่ AP ให้จริงราว 600-840 Mbps ควรใช้อย่างน้อย 2 AP คนละ channel", why: "ถูก: 20 x 50 = 1000 > 840; 2 AP แยก channel ได้ราว 1200-1680 Mbps" },
          { t: "พอ เพราะ PHY 1200 มากกว่า 1000", why: "ผิด: ต้องเทียบกับ throughput จริง (50-70% ของ PHY)" },
          { t: "พอ ถ้าเพิ่ม Tx power ของ AP", why: "ผิด: กำลังส่งไม่เพิ่ม airtime/throughput รวม และ uplink ของ client ยังเท่าเดิม" },
          { t: "ย้ายไป 2.4 GHz เพราะทะลุผนังดี", why: "ผิด: 2.4 GHz มีช่องแคบและเร็วน้อยกว่ามาก ห้องเดียวไม่มีผนังให้ทะลุ" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `บริษัทอัปเกรดจาก Wi-Fi 6 เป็น Wi-Fi 7 โดยใช้ช่อง 80 MHz stream เดียว coding เท่าเดิม modulation เปลี่ยน 1024-QAM → 4096-QAM เพื่อดูว่า PHY rate เพิ่มกี่เปอร์เซ็นต์`,
        q: "PHY rate เพิ่มประมาณเท่าใด?",
        opts: [
          { t: "ประมาณ +20% (10 → 12 bit ต่อ tone)", why: "ถูก: rate เพิ่มตามจำนวน bit ต่อ tone 12/10 = 1.2 (600 → 720 Mbps)" },
          { t: "+300% (จุดเพิ่ม 4 เท่า)", why: "ผิด: จุด constellation เพิ่ม 4 เท่า แต่ bit เพิ่มแค่ 2 ตัว" },
          { t: "+100% (x2)", why: "ผิด: ต้อง modulation ที่ bit/tone เป็น 2 เท่าถึงจะ x2" },
          { t: "ไม่เพิ่ม เพราะ rate ขึ้นกับ channel width เท่านั้น", why: "ผิด: rate ขึ้นกับ bit/tone, coding, width, stream และ GI" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `หอประชุมมี sensor และอุปกรณ์ IoT 300 ตัวส่งข้อมูลทีละไม่กี่ร้อย byte ถี่ ๆ ผ่าน AP Wi-Fi 6 ผู้ใช้ทั่วไปมี client น้อย`,
        q: "เทคโนโลยีใดช่วยได้ตรงที่สุด?",
        opts: [
          { t: "OFDMA: แบ่ง RU ให้หลายตัวส่ง packet เล็กพร้อมกันใน channel เดียว", why: "ถูก: packet เล็กจำนวนมากเสีย airtime ใน OFDM เดิม OFDMA ลด contention และ overhead" },
          { t: "MU-MIMO อย่างเดียว", why: "ผิด: ได้ผลดีเมื่อ packet ยาวและ SNR สูง ไม่ใช่งาน packet เล็กจำนวนมาก" },
          { t: "ใช้ channel 320 MHz", why: "ผิด: เป็น Wi-Fi 7, ไม่ได้แก้ contention ของ packet เล็ก และเพิ่ม noise" },
          { t: "เพิ่ม modulation เป็น 4096-QAM", why: "ผิด: ต้อง SNR สูง ไม่เกี่ยวกับ contention ของ packet เล็ก" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ย่าน 6 GHz ของไทยใช้ได้ 500 MHz (5.925-6.425) ทีมวางแผนใช้ช่อง 160 MHz โดยไม่ให้ AP ข้างเคียงซ้ำช่องกัน`,
        q: "ได้กี่ช่อง 160 MHz ที่ไม่ซ้อนกัน และหากใช้ 320 MHz ได้กี่ช่อง?",
        opts: [
          { t: "3 ช่อง 160 MHz และ 1 ช่อง 320 MHz", why: "ถูก: 500/160 = 3.1 → 3; 500/320 = 1.6 → 1 (ช่อง 320 MHz reuse ไม่ได้เลย)" },
          { t: "7 ช่อง 160 MHz และ 3 ช่อง 320 MHz", why: "ผิด: นั่นคือตัวเลขของสหรัฐที่มี 1.2 GHz" },
          { t: "2 ช่อง 160 MHz และ 2 ช่อง 320 MHz", why: "ผิด: 320 MHz x 2 = 640 MHz เกินที่มีอยู่" },
          { t: "5 ช่อง 160 MHz และ 2 ช่อง 320 MHz", why: "ผิด: 5 x 160 = 800 MHz เกินที่มี" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ในช่อง 160 MHz บน Wi-Fi 7 มี interference เข้ามาที่ sub-channel 20 MHz เพียง 1 ช่องเท่านั้น`,
        q: "เปรียบเทียบการใช้ puncturing กับการลดความกว้างช่องลงเหลือส่วนที่ต่อเนื่องที่ไม่โดน (เช่น 80 MHz) ใช้ bandwidth ได้กี่เปอร์เซ็นต์ของเดิม?",
        opts: [
          { t: "puncturing ใช้ได้ 140/160 = 87.5%; ลดความกว้างได้ 50%", why: "ถูก: ตัดเฉพาะ 20 MHz ที่เสีย ใช้ 7 ส่วนจาก 8 ที่เหลือ (ผ่าน MRU) ส่วนการลดความกว้างทิ้งไป 80 MHz" },
          { t: "puncturing ใช้ได้ 50%; ลดความกว้างได้ 87.5%", why: "ผิด: กลับกัน" },
          { t: "ทั้งสองแบบได้ 50%", why: "ผิด: puncturing มีไว้เพื่อไม่ต้องทิ้งส่วนที่ไม่เสีย" },
          { t: "puncturing ได้ 93.75%", why: "ผิด: ตัด 20 MHz จาก 160 = เหลือ 140 MHz ไม่ใช่ 150" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `AP ใหม่ได้ IP ผ่าน DHCP แล้ว แต่ AC อยู่ที่ห้อง server คนละ subnet (มี router คั่น) ทีมไม่ได้ตั้ง Option 43, DNS หรือ static AC ใด ๆ AP ไม่ขึ้นสถานะ online`,
        q: "สาเหตุที่น่าจะเป็นที่สุดและวิธีแก้คือข้อใด?",
        opts: [
          { t: "AP หา AC ไม่เจอ (broadcast ข้าม router ไม่ได้) ให้ใส่ DHCP Option 43 sub-option 3 เป็น IP ของ AC", why: "ถูก: ใน L3 networking AP ต้องรู้ AC ผ่าน Option 43/DNS/static" },
          { t: "Join Response ผิด ต้องเปลี่ยนเป็น no-auth", why: "ผิด: ยังไม่ถึงขั้น Join เพราะยังไม่ผ่าน Discovery" },
          { t: "AP ต้องอัปเกรด image ก่อน", why: "ผิด: Image data เกิดหลัง Join ไม่ใช่ก่อน Discovery" },
          { t: "ต้องเปลี่ยน SSID profile", why: "ผิด: SSID profile ส่งทีหลังจาก AP online แล้ว" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `AC ตั้ง ap auth-mode เป็น mac-auth (ค่า default) ติดตั้ง AP ใหม่ 10 ตัว แต่ยังไม่ได้ import MAC และไม่อยู่ใน whitelist ที่ AC พบ AP ปรากฏใน "unauthenticated AP list" และยังไม่ online`,
        q: "ควรทำอะไร?",
        opts: [
          { t: "import AP (MAC/SN) หรือ confirm AP ในรายการด้วยตนเอง", why: "ถูก: นี่คือ manual confirm ตามโหมด mac/sn-auth ที่ AP ไม่อยู่ใน whitelist" },
          { t: "เปิด UDP 5247 เพิ่มที่ firewall", why: "ผิด: AP ติดต่อ AC ถึงแล้ว (เห็นในรายการ) ไม่ใช่ปัญหา port" },
          { t: "รออัปเกรดอัตโนมัติ", why: "ผิด: ยังไม่ผ่านการเพิ่ม AP จึงยังไม่ถึงขั้นอัปเกรด" },
          { t: "เปลี่ยน forward-mode เป็น direct", why: "ผิด: forward-mode ใช้ตอนส่ง data ไม่เกี่ยวกับการยืนยัน AP" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ผู้ดูแลตั้ง firewall ระหว่าง AP และ AC ให้ผ่านเฉพาะ UDP 5246 AP เห็น AC, Join สำเร็จ แต่ SSID แบบ tunnel forwarding ใช้งานไม่ได้เลย`,
        q: "สาเหตุที่น่าจะเป็นที่สุด?",
        opts: [
          { t: "UDP 5247 (CAPWAP data channel) ถูกบล็อก จึงห่อ data เข้า tunnel ไป AC ไม่ได้", why: "ถูก: control 5246 ผ่านจึง Join ได้ แต่ data tunnel (และ Keepalive) ใช้ 5247" },
          { t: "UDP 5246 ต้องเปลี่ยนเป็น TCP", why: "ผิด: CAPWAP ใช้ UDP ทั้ง 2 ช่องทาง" },
          { t: "channel 2.4 GHz ซ้อนกัน", why: "ผิด: อาการเกิดกับ tunnel ผ่าน AC ไม่ใช่ปัญหา RF" },
          { t: "ต้องเปลี่ยน mac-auth เป็น sn-auth", why: "ผิด: Join สำเร็จแล้ว ไม่ใช่ปัญหา AP auth" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `องค์กรมี AP 40 ตัว ผู้ใช้ทุก AP ใช้ traffic เฉลี่ยตัวละราว 200 Mbps ออก Internet AC ที่มี forwarding capacity 4 Gbps ต่อแบบ bypass ที่ aggregation switch`,
        q: "ควรเลือก forwarding แบบใด?",
        opts: [
          { t: "direct forwarding: 40 x 200 = 8 Gbps เกินกว่า AC 4 Gbps ให้ data ออกจาก AP ตรง ๆ", why: "ถูก: tunnel ต้องส่งทุก bit ผ่าน AC เกินความสามารถ; bypass + direct ทำให้ AC เหลือแค่ management" },
          { t: "tunnel forwarding เพื่อความปลอดภัย", why: "ผิด: 8 Gbps เกินกว่า AC รับไหว จะเป็น bottleneck" },
          { t: "เพิ่ม VAP ให้แต่ละ AP", why: "ผิด: VAP ไม่ได้ลดโหลด AC" },
          { t: "เปลี่ยนเป็น direct networking", why: "ผิด: direct networking บังคับ data ผ่าน AC อยู่แล้ว ยิ่งแย่" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `VAP-Office1 ใช้ forward-mode tunnel และ service VLAN 101 โดยมี AC เป็น gateway ของ VLAN 101 ผู้ดูแลเปลี่ยนเป็น forward-mode direct-forward`,
        q: "สิ่งที่ต้องแก้เพิ่มคือข้อใด?",
        opts: [
          { t: "ต้องให้ VLAN 101 ผ่าน (trunk) ถึง switch ฝั่ง AP/uplink และย้าย gateway/DHCP ของ VLAN 101 ไปที่ switch ฝั่ง uplink", why: "ถูก: ใน direct forwarding data ไม่เข้า AC จึงต้องมี VLAN และ gateway บนเครือข่ายสายเอง" },
          { t: "ไม่ต้องแก้อะไร AC ยังเป็น gateway ได้", why: "ผิด: data ไม่ไปถึง AC แล้ว AC จึงไม่ใช่ gateway ของผู้ใช้อีก" },
          { t: "เปลี่ยน CAPWAP เป็น TCP", why: "ผิด: CAPWAP ยังเป็น UDP ใช้ส่ง management" },
          { t: "เปลี่ยน SSID ให้ยาวขึ้น", why: "ผิด: ไม่เกี่ยวกับเส้นทาง data" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ในอาคารหนึ่ง AP ชั้น 1 ใช้ SSID "Corp-A" และ AP ชั้น 2 ใช้ SSID "Corp-B" (WPA2-PSK เหมือนกัน) ผู้ใช้เดินขึ้นบันไดแล้ว VPN และ video call หลุดทุกครั้ง`,
        q: "สาเหตุหลักคืออะไร?",
        opts: [
          { t: "SSID ต่างกัน จึงไม่ใช่ ESS เดียวกัน ผู้ใช้ต้อง associate และขอ IP ใหม่ ไม่ใช่ roaming", why: "ถูก: roaming ต้องใช้ SSID (และ security) เดียวกันใน ESS" },
          { t: "BSSID ซ้ำกัน", why: "ผิด: BSSID คือ MAC ของ AP ซึ่งต้องไม่ซ้ำเสมอ ไม่ใช่สาเหตุ" },
          { t: "ใช้ WPA2 เหมือนกัน", why: "ผิด: security ที่เหมือนกันเป็นข้อกำหนดของ roaming ไม่ใช่ปัญหา" },
          { t: "AP ทั้งสองต้องใช้ channel เดียวกัน", why: "ผิด: ควรต่างกันเพื่อลด CCI" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ผู้ดูแลต้องการให้ STA scan แบบ passive ทุกช่อง 2.4 GHz จำนวน 13 channel โดยรอ Beacon ตามค่า default (100 TU, 1 TU = 1024 µs) ช่องละ 1 รอบ`,
        q: "เวลารอรวมโดยประมาณเท่าใด?",
        opts: [
          { t: "ราว 1.33 วินาที (102.4 ms x 13)", why: "ถูก: 100 x 1024 µs = 102.4 ms ต่อ channel; x 13 = 1331.2 ms" },
          { t: "100 ms", why: "ผิด: นั่นคือเวลาต่อ channel (ประมาณ) ไม่ใช่ทั้ง 13 channel" },
          { t: "13 วินาที", why: "ผิด: ตีความ 100 TU เป็น 1 วินาที ผิดหน่วย" },
          { t: "102.4 ms", why: "ผิด: เป็นเวลาต่อ channel ต้องคูณ 13" }
        ],
        ans: 0
      },
      {
        type: "choice",
        story: `ห้องเรียนมี AP ตัวเดียวที่เปิด SSID ถึง 4 ชื่อ (VAP) บน radio 5 GHz เมื่อผู้ใช้เยอะ ผู้ใช้ทุก SSID บ่นว่าช้า ผู้จัดการเสนอ "เพิ่ม SSID อีกอันสำหรับแขก จะได้แยกเครือข่ายแล้วเร็วขึ้น"`,
        q: "ข้อสรุปใดถูกต้อง?",
        opts: [
          { t: "ไม่ช่วย: ทุก VAP ใช้ radio/channel/airtime เดียวกัน ความจุรวมคงที่ และแต่ละ SSID ส่ง beacon เพิ่ม ควรลด SSID และเพิ่มจำนวน AP", why: "ถูก: VAP เป็นเพียงหลาย BSS บน AP เดียว" },
          { t: "ช่วย เพราะแต่ละ VAP มี bandwidth แยกของตัวเอง", why: "ผิด: VAP แชร์ resource และ channel ของ AP" },
          { t: "ช่วย เพราะ SSID มากขึ้นทำให้ roaming ดีขึ้น", why: "ผิด: SSID ต่างกันไม่ช่วย roaming และเพิ่ม beacon overhead" },
          { t: "ไม่ช่วย เพราะต้องเปลี่ยน BSSID ให้ไม่ซ้ำ", why: "ผิด: BSSID แยกให้แต่ละ VAP อยู่แล้ว" }
        ],
        ans: 0
      },
      {
        type: "multi",
        story: `ผู้ดูแลต้องคัดคู่ channel 2.4 GHz (ความกว้าง 20 MHz รวม guard ราว 22 MHz, center = 2407 + 5n MHz) ที่ใช้เป็น AP ข้างเคียงได้โดยไม่ซ้อนกัน`,
        q: "เลือกทุกคู่ที่ไม่ซ้อนทับกัน",
        opts: [
          { t: "channel 1 และ 6", ok: true, why: "ถูก: ห่าง 25 MHz > 22" },
          { t: "channel 3 และ 8", ok: true, why: "ถูก: 2422 กับ 2447 ห่าง 25 MHz" },
          { t: "channel 6 และ 11", ok: true, why: "ถูก: ห่าง 25 MHz" },
          { t: "channel 5 และ 9", ok: false, why: "ผิด: ห่างแค่ 4 channel = 20 MHz < 22 MHz จึงซ้อนทับ" },
          { t: "channel 7 และ 11", ok: false, why: "ผิด: ห่าง 20 MHz ซ้อนทับ" }
        ]
      },
      {
        type: "multi",
        story: `ทีมสรุปเรื่อง VAP และ ESS ในที่ประชุม`,
        q: "เลือกทุกข้อที่ถูกต้อง",
        opts: [
          { t: "BSSID คือ MAC address ของ AP/VAP ที่ไม่ซ้ำกัน ส่วน SSID เป็นชื่อที่ซ้ำกันได้", ok: true, why: "ถูก: ESS อาศัยการที่หลาย BSS ใช้ SSID เดียวกัน" },
          { t: "VAP แต่ละตัวตั้ง SSID, password และ service VLAN ต่างกันได้", ok: true, why: "ถูก: เช่น Staff กับ Guest" },
          { t: "VAP ช่วยเพิ่ม capacity ของ AP ตามจำนวน VAP", ok: false, why: "ผิด: แชร์ hardware/channel/airtime ความจุรวมคงเดิม" },
          { t: "ESS ที่ SSID เดียวกันทำให้ roaming ได้โดยบริการไม่สะดุด", ok: true, why: "ถูก" },
          { t: "ซ่อน SSID ทำให้เครือข่ายปลอดภัยเทียบเท่า WPA2", ok: false, why: "ผิด: ซ่อน SSID แค่ไม่ broadcast ใน Beacon ไม่ได้เข้ารหัสหรือยืนยันตัวผู้ใช้" }
        ]
      },
      {
        type: "multi",
        story: `เปรียบเทียบ tunnel forwarding กับ direct forwarding เมื่อ AC ต่อแบบ bypass`,
        q: "เลือกทุกข้อที่ถูกต้อง",
        opts: [
          { t: "tunnel: data ผู้ใช้ถูกห่อใน CAPWAP data tunnel ส่งไป AC", ok: true, why: "ถูก" },
          { t: "direct: data ผู้ใช้ออก uplink ตรงจาก AP โดยไม่ผ่าน AC ลดภาระ AC", ok: true, why: "ถูก" },
          { t: "tunnel ควบคุม policy/ความปลอดภัยรวมศูนย์ได้ง่ายกว่า", ok: true, why: "ถูก: เพราะทุก traffic ผ่าน AC" },
          { t: "ในโหมด direct ข้อความ management ก็ไม่ผ่าน CAPWAP", ok: false, why: "ผิด: management ผ่าน CAPWAP control channel เสมอ" },
          { t: "ตั้งต่อ VAP ได้ เช่น Staff = tunnel, Guest = direct", ok: true, why: "ถูก: forward-mode กำหนดใน VAP profile" }
        ]
      },
      {
        type: "multi",
        story: `ฝ่ายไอทีไล่ข้อมูลเรื่องสถาปัตยกรรมและ CAPWAP`,
        q: "เลือกทุกข้อที่ถูกต้อง",
        opts: [
          { t: "FIT AP ต้องถูก AC จัดการ ไม่สามารถทำงานเดี่ยว", ok: true, why: "ถูก" },
          { t: "CAPWAP ใช้ UDP 5246 สำหรับ control และ UDP 5247 สำหรับ data", ok: true, why: "ถูก" },
          { t: "CAPWAP control/data channel เลือกเข้ารหัสด้วย DTLS ได้", ok: true, why: "ถูก" },
          { t: "AC แบบ direct networking ทำให้ AC ไม่ใช่ bottleneck", ok: false, why: "ผิด: AC อยู่ใน forwarding path เป็น bottleneck ได้" },
          { t: "Layer 2 networking เหมาะที่สุดกับองค์กรที่ AP กระจายหลายอาคาร", ok: false, why: "ผิด: องค์กรใหญ่ใช้ Layer 3 (AP ค้นหา AC ด้วย Option 43/DNS/static)" }
        ]
      },
      {
        type: "blank",
        story: `คำนวณ EIRP ก่อนติดเสาอากาศ`,
        text: `EIRP = Tx power + {1} - {2} และต้องไม่เกินเพดานของย่านนั้น เช่นเพดาน 2.4 GHz ของไทย 100 mW = {3} dBm`,
        blanks: [
          { opts: ["antenna gain (dBi)", "path loss", "noise floor", "SNR"], ans: 0, why: "เสาอากาศ gain สูงทำให้ EIRP เพิ่ม" },
          { opts: ["cable loss (dB)", "antenna gain", "RSSI", "bandwidth"], ans: 0, why: "สายสัญญาณสูญเสียทำให้ EIRP ลด" },
          { opts: ["20", "23", "27", "30"], ans: 0, why: "100 mW = 20 dBm" }
        ]
      },
      {
        type: "blank",
        story: `ตรวจ CAPWAP`,
        text: `CAPWAP เป็น application layer protocol บน {1} โดย control channel ใช้ UDP port {2} และ data channel ใช้ UDP port {3} และทั้งสองช่องเลือกเข้ารหัสด้วย {4} ได้`,
        blanks: [
          { opts: ["UDP", "TCP", "ICMP", "OSPF"], ans: 0, why: "CAPWAP ส่งผ่าน UDP" },
          { opts: ["5246", "5247", "80", "443"], ans: 0, why: "control = UDP 5246" },
          { opts: ["5247", "5246", "8080", "22"], ans: 0, why: "data = UDP 5247" },
          { opts: ["DTLS", "IPsec ESP", "WEP", "SSL VPN"], ans: 0, why: "CAPWAP ใช้ DTLS เข้ารหัสทั้ง 2 channel" }
        ]
      },
      {
        type: "blank",
        story: `ลำดับ AP go online`,
        text: `AP ได้ IP แล้วส่ง {1} Request เพื่อหา AC จากนั้นส่ง {2} Request ให้ AC ตรวจสิทธิ์ ถ้า version ไม่ตรงจะส่ง {3} Request เพื่ออัปเกรด และเมื่อพร้อมใช้งานจะแลก Keepalive ทาง UDP {4}`,
        blanks: [
          { opts: ["Discovery", "Join", "Probe", "Beacon"], ans: 0, why: "ขั้นหา AC คือ Discovery" },
          { opts: ["Join", "Discovery", "Association", "Echo"], ans: 0, why: "ขั้นตรวจสิทธิ์ AP คือ Join" },
          { opts: ["Image Data", "Configuration Update", "Probe", "DHCP"], ans: 0, why: "Image Data Request ใช้ดาวน์โหลด image อัปเกรด" },
          { opts: ["5247", "5246", "443", "67"], ans: 0, why: "Keepalive อยู่บน data channel UDP 5247 (Echo อยู่บน 5246)" }
        ]
      },
      {
        type: "blank",
        story: `ลำดับ STA เข้าเครือข่าย`,
        text: `STA เข้าใช้งานตามลำดับ scanning → {1} authentication → {2} → access authentication → {3} → user authentication และในการ scan แบบ passive STA จะฟัง {4} ที่ AP ส่งเป็นระยะ`,
        blanks: [
          { opts: ["link", "user", "DHCP", "portal"], ans: 0, why: "ขั้นที่ 2 คือ link authentication (open system/shared key)" },
          { opts: ["association", "DHCP", "scanning", "Join"], ans: 0, why: "ขั้นที่ 3 คือ association negotiate link service" },
          { opts: ["DHCP (address assignment)", "Join", "Probe", "Discovery"], ans: 0, why: "ขั้นที่ 5 คือขอ IP ผ่าน DHCP" },
          { opts: ["Beacon", "Probe Request", "Join Response", "Echo"], ans: 0, why: "passive = ฟัง Beacon" }
        ]
      },
      {
        type: "blank",
        story: `ตั้ง VAP profile`,
        text: `VAP profile อ้าง {1} profile และ security profile รวมกับ forward-mode และ service VLAN จากนั้นต้อง {2} VAP profile เข้า AP group โดยใช้ radio {3} สำหรับ 2.4 GHz และ radio 1 สำหรับ 5 GHz`,
        blanks: [
          { opts: ["SSID", "RF", "regulatory domain", "AP"], ans: 0, why: "VAP profile อ้าง SSID profile" },
          { opts: ["ผูก (apply)", "ลบ", "ปิด", "mirror"], ans: 0, why: "ต้องผูกกับ AP group AC จึงส่ง config ลง AP" },
          { opts: ["0", "1", "2", "5"], ans: 0, why: "radio 0 = 2.4 GHz, radio 1 = 5 GHz" }
        ]
      },
      {
        type: "match",
        q: "จับคู่รุ่น Wi-Fi กับชื่อ PHY และ modulation สูงสุด",
        pairs: [
          ["Wi-Fi 4 (802.11n)", "HT, 64-QAM"],
          ["Wi-Fi 5 (802.11ac)", "VHT, 256-QAM"],
          ["Wi-Fi 6 (802.11ax)", "HE, 1024-QAM"],
          ["Wi-Fi 7 (802.11be)", "EHT, 4096-QAM"]
        ],
        why: "HT = High Throughput, VHT = Very High, HE = High Efficiency, EHT = Extremely High Throughput; modulation เพิ่มขึ้นทุกรุ่น"
      },
      {
        type: "match",
        q: "จับคู่ปัญหาที่พบกับแนวทางแก้ที่ตรงที่สุด",
        pairs: [
          ["AP ข้างเคียงใช้ช่องเดียวกัน แย่ง airtime กัน", "จัด channel plan / RF tuning (เช่น 1-6-11)"],
          ["sensor 300 ตัวส่ง packet เล็กจำนวนมาก", "OFDMA (แบ่ง RU)"],
          ["AP อยู่คนละ subnet กับ AC หา AC ไม่เจอ", "DHCP Option 43 (sub-option 3) หรือ DNS/static"],
          ["AC เป็น bottleneck เพราะ traffic ผู้ใช้ผ่าน AC ทั้งหมด", "bypass + direct forwarding"],
          ["ช่อง 160 MHz มี interference ที่ 20 MHz เดียว", "puncturing + MRU (Wi-Fi 7)"]
        ],
        why: "แต่ละปัญหาเป็นคนละชั้น: RF (channel), airtime (OFDMA), discovery (Option 43), forwarding (direct) และ spectrum (puncturing)"
      }
    ]
  });
})();
