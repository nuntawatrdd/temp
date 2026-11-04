IOT.reg({
  id: "ph2",
  title: "Physical Layer 2: Modulation, Multiplexing, Cabling & Whole Stack",
  th: "สาย twisted pair/RJ45 และการทดสอบสาย, modulation (ASK/FSK/PSK/QAM), baud vs bit rate, multiplexing (FDM/TDM/WDM/OFDM), เหตุที่ไม่เคยเห็น 1200 Mbps และสรุป Layer 7 ถึง Layer 1",
  summary: `
<ul>
<li><b>Twist ต่างอัตรา</b> ในแต่ละคู่ = ลด crosstalk (คู่ข้างเคียงรั่วใส่กัน); twist ทำให้ noise เข้าเท่ากันสองเส้นแล้ว A &minus; B ตัดทิ้ง</li>
<li>เขียวอยู่ <b>pin 3, 6</b> (คร่อมคู่น้ำเงิน pin 4, 5 ที่สืบจากสายโทรศัพท์); ใส่ 3, 4 = <b>split pair</b> &rarr; ทุกเส้น continuity ผ่าน, tester wiremap ผ่าน, ใช้ 100 Mbps ได้ แต่ <b>gigabit ล้ม</b></li>
<li>Cable tester: Open (pin เดียวสว่างต้นทาง), Short (สอง pin สว่างพร้อมกัน), Reversed pair (คู่เดียวกันสลับ), Split pair (ผ่านหมดแต่ล้ม gigabit &mdash; ต้องใช้ tester วัด crosstalk)</li>
<li>Cat5e 100 MHz 1 Gbps; Cat6 250 MHz (10 Gbps ถึง 55 m); Cat6a 500 MHz 10 Gbps 100 m; Cat8 2 GHz 25/40 Gbps 30 m; <b>100 m = attenuation limit (ที่เคยเป็น collision-detection limit ด้วย)</b></li>
<li>PoE: 802.3af 15.4 W, 802.3at 30 W, 802.3bt 60&ndash;90 W (DC ซ้อนบนคู่ข้อมูล = multiplexing แบบความถี่)</li>
<li>เลือกสื่อ 4 คำถาม: ไกลแค่ไหน, noise, ต้องเคลื่อนที่ไหม, ค่าใช้จ่าย/อัปเกรด</li>
<li><b>Modulation:</b> baseband ผ่านอากาศไม่ได้ (เสาอากาศ ~ &lambda;/4, ทุกคนทับกัน, ขอบสี่เหลี่ยมต้องการแถบความถี่) &rarr; ใช้ carrier แล้วเปลี่ยน amplitude (ASK) / frequency (FSK) / phase (PSK); QPSK = 4 จุด = 2 bit; QAM ใช้ทั้งระนาบ</li>
<li>M จุดใน constellation = log<sub>2</sub> M bit/symbol (16-QAM 4, 64-QAM 6, 256-QAM 8, 1024-QAM 10); นี่คือ M ใน Nyquist</li>
<li><b>bit rate = baud rate &times; log<sub>2</sub> M</b>; baud (symbol/s) เป็นคุณสมบัติของช่อง, bits/symbol เป็นของ modulation</li>
<li>SNR ต่ำ &rarr; กลุ่ม noise ใหญ่ &rarr; ใช้ constellation น้อยจุด + coding หนักขึ้น (adaptive modulation); FEC coding rate 5/6 = overhead 20%, 1/2 = 100%</li>
<li>Gray coding: จุดเพื่อนบ้านต่างกัน 1 bit; MIMO = 2 ช่องจริงๆ จึงคูณความจุได้</li>
<li><b>Multiplexing:</b> FDM (ความถี่), TDM (เวลา: T1 24&times;64k+8k = 1.544 Mbps, E1 32&times;64k = 2.048 Mbps), WDM (สี/wavelength: C-band ~4.4 THz &divide; 50 GHz = ~88 ch &times; 100 Gbps = 8.8 Tbps), OFDM (หลาย subcarrier orthogonal, symbol ยาว ชนะ multipath), CDM (code)</li>
<li>Synchronous TDM เปลือง slot เมื่อเจ้าของเงียบ (delay คงที่ เหมาะ voice); statistical TDM = packet network</li>
<li><b>1,201 Mbps</b> = 980 subcarrier &times; 10 bit (1024-QAM) &times; 5/6 &times; 2 stream &divide; 13.6 &mu;s; จริงต่ำกว่าเพราะ SNR ต่ำลง + ACK/backoff/beacon/header + half duplex + ช่องใช้ร่วมกัน (จริง ~300&ndash;600 Mbps)</li>
<li>Stack: L7 HTTP/DNS &rarr; L6 encode/encrypt &rarr; L5 session &rarr; L4 TCP/UDP port &rarr; L3 IP routing &rarr; L2 frame/MAC/CRC (หนึ่ง hop) &rarr; L1 voltage/light/radio</li>
<li>กับดักสอบ: bandwidth &ne; speed; dB ต้องแปลงก่อน Shannon; switch แยก collision domain ไม่ใช่ broadcast domain (router แยก); CRC ตรวจไม่ซ่อม; link เร็วลดแค่ L/R; fibre ไม่ใช่ดีกว่าเสมอ</li>
</ul>`,
  sections: [
    {
      t: "สาย twisted pair ใกล้ๆ: ทำไมบิด, pin 3 และ 6, และ tester",
      html: `
<p>Twist แต่ละคู่ทำสองอย่าง: (1) <b>differential signalling</b> &mdash; noise ภายนอกเข้ามาเท่ากันทั้งสองเส้น ผู้รับคิด A &minus; B แล้ว noise ตัดกัน (2) <b>แต่ละคู่บิดต่างอัตรากัน</b> &mdash; ถ้าสองคู่บิดเท่ากันจะอยู่ข้างกันตลอด สัญญาณรั่ว (crosstalk) เข้าหากันแบบสะสม อัตราที่ต่างกันทำให้ค่าเฉลี่ยของ crosstalk หักล้างกัน; crosstalk เป็นตัวจำกัดความเร็วของ copper มากที่สุด จึงมี Cat6 ที่เพิ่ม plastic spine ดันคู่ให้ห่างกัน</p>
<h4>ทำไมเขียวอยู่ pin 3 และ 6</h4>
<p>Pin 4&ndash;5 ตรงกลางเป็นของคู่น้ำเงิน (สืบจากสายโทรศัพท์ที่คู่กลางพกเสียง) คู่เขียวจึงต้อง <b>คร่อม</b> ไปอยู่ pin 3 และ 6 (เหนือคู่น้ำเงิน) ถ้าจัดเป็น 3 และ 4 เพราะ &quot;เรียบร้อยกว่า&quot; ทุกเส้นยังมี continuity และ tester ผ่าน แต่ pin 3 และ 6 จะเป็นเส้นจากสองคู่ที่บิดคนละชุด = ไม่มีการตัด noise: ทำงานที่ 100 Mbps (ใช้ pin 1, 2, 3, 6) แต่ล้มที่ gigabit (ใช้ครบ 4 คู่)</p>
<div class="dg"><div class="dgt">🖼️ ลำดับสี T568B และคู่เขียวคร่อมน้ำเงิน</div>
<svg viewBox="0 0 440 150" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="10" y="30" width="45" height="40"/><text class="t sm" x="14" y="52">1 W/ส้ม</text>
<rect class="bx" x="62" y="30" width="45" height="40"/><text class="t sm" x="66" y="52">2 ส้ม</text>
<rect class="bx ok" x="114" y="30" width="45" height="40"/><text class="t sm" x="116" y="52">3 W/เขียว</text>
<rect class="bx hd" x="166" y="30" width="45" height="40"/><text class="t sm" x="168" y="52">4 น้ำเงิน</text>
<rect class="bx hd" x="218" y="30" width="45" height="40"/><text class="t sm" x="220" y="52">5 W/นง.</text>
<rect class="bx ok" x="270" y="30" width="45" height="40"/><text class="t sm" x="278" y="52">6 เขียว</text>
<rect class="bx" x="322" y="30" width="45" height="40"/><text class="t sm" x="324" y="52">7 W/นต.</text>
<rect class="bx" x="374" y="30" width="45" height="40"/><text class="t sm" x="380" y="52">8 น้ำตาล</text>
<path class="ln ok" fill="none" d="M136 30 V15 H292 V30"/>
<text class="t sm" x="140" y="11">คู่เขียว = pin 3 และ 6 (คร่อมคู่น้ำเงิน pin 4 5)</text>
<path class="ln bad" fill="none" d="M136 70 V110 H190 V70"/>
<text class="t sm" x="10" y="130">ผิด: เขียวที่ 3 และ 4 = split pair (continuity ผ่าน แต่ gigabit ล้ม)</text>
</svg></div>
<h4>สัญญาณของความผิดปกติ 4 แบบจาก cable tester</h4>
<table>
<tr><th>Fault</th><th>ความหมาย</th><th>ที่ tester</th></tr>
<tr><td>Open</td><td>เส้นขาด / ไม่ถึงหน้าสัมผัส</td><td>pin หนึ่งสว่างที่ปลายใกล้ แต่ไม่สว่างปลายไกล</td></tr>
<tr><td>Short</td><td>สองตัวนำแตะกัน (ทองแดงโผล่นอกปลั๊ก)</td><td>สอง pin สว่างพร้อมกันเสมอ</td></tr>
<tr><td>Reversed pair</td><td>สองเส้นของคู่เดียวกันสลับขั้ว (คงการบิด)</td><td>ถึงปลายทางแต่ลำดับผิด wiremap fail</td></tr>
<tr><td>Split pair</td><td>เส้นจากสองคู่ถูกใช้เป็นคู่เดียวกัน (ทำลายการบิด)</td><td>ผ่านทุก pin แต่ลิงก์ล้มที่ gigabit</td></tr>
</table>
<p>Wiremap tester เทียบเลข pin: reversed pair เห็นชัด แต่ split pair <b>มองไม่เห็น</b> (ทุก pin ถึงเลขตัวเอง) ต้องใช้ certification tester ที่วัด crosstalk ระหว่างคู่ &mdash; ซึ่งเป็นเหตุที่ราคาแพง</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>บิดต่างอัตรา = ลด crosstalk; บิด = ตัด noise ภายนอก (A &minus; B)</li>
<li>เขียว pin 3 และ 6; ผิด = split pair ผ่าน tester ปกติแต่ล้มที่ gigabit</li>
</ul></div>`
    },
    {
      t: "Cat, ระยะ 100 m, PoE และการเลือกสื่อ",
      html: `
<table>
<tr><th>Category</th><th>Bandwidth</th><th>Speed</th><th>ระยะ</th><th>เปลี่ยนอะไร</th></tr>
<tr><td>Cat5</td><td>100 MHz</td><td>100 Mbps</td><td>100 m</td><td>obsolete</td></tr>
<tr><td>Cat5e</td><td>100 MHz</td><td>1 Gbps</td><td>100 m</td><td>&quot;e&quot; = enhanced: จำกัด crosstalk เข้มขึ้น</td></tr>
<tr><td>Cat6</td><td>250 MHz</td><td>1 Gbps / 10 Gbps</td><td>100 m / 55 m</td><td>เพิ่ม plastic spine</td></tr>
<tr><td>Cat6a</td><td>500 MHz</td><td>10 Gbps</td><td>100 m</td><td>&quot;a&quot; = augmented: หนา แข็ง ป้องกันดีกว่า</td></tr>
<tr><td>Cat7/8</td><td>600 MHz &ndash; 2 GHz</td><td>10&ndash;40 Gbps</td><td>100 m / 30 m (Cat8)</td><td>shield แยกคู่ ใช้ในศูนย์ข้อมูล</td></tr>
</table>
<p>ตัวเลข category คือ <b>bandwidth เป็น Hz</b> (B ใน Nyquist/Shannon) Cat6 ทำ 10 Gbps ได้ แต่แค่ 55 m &mdash; เร็วขึ้นแล้วระยะยอม (attenuation ใน datasheet)</p>
<h4>ทำไม 100 m เสมอ</h4>
<ul>
<li><b>Attenuation:</b> copper สูญตามระยะ และสูญเร็วขึ้นที่ความถี่สูง; เกิน ~100 m สัญญาณใกล้ noise floor เกินกว่าผู้รับจะตัดสินใจได้</li>
<li><b>ประวัติ:</b> 10BASE-T ต้องรับประกันว่า collision กลับถึงผู้ส่งก่อนส่ง frame 64 B จบ; round trip ข้าม repeater และสาย ได้ ~100 m/segment</li>
<li>Switched full-duplex ไม่มี collision มา 20 ปีแล้ว เหตุผลที่สองหมดไป แต่เหตุผลแรก (ฟิสิกส์) ยังอยู่ จึงยังคง 100 m</li>
</ul>
<p>ประโยคสอบที่ดี: &quot;100 m เป็นข้อจำกัดจาก attenuation ที่เดิมเป็นข้อจำกัดของการตรวจจับ collision ด้วย&quot; (ได้คะแนนทั้งสองส่วน)</p>
<h4>Power over Ethernet</h4>
<p>วาง DC บนคู่เดียวกับข้อมูล: ข้อมูลเป็นสัญญาณสลับ ไฟเป็นค่าคงที่ ตัวกรองสองฝั่งแยกกันได้ = multiplexing แบบความถี่ มาตรฐาน: 802.3af (PoE) 15.4 W โทรศัพท์/AP พื้นฐาน; 802.3at (PoE+) 30 W กล้อง pan-tilt/AP ดีขึ้น; 802.3bt (PoE++) 60&ndash;90 W โน้ตบุ๊ก/จอ/ไฟ LED; ประโยชน์: AP เพดานไม่ต้องเดินไฟ, switch รีบูตอุปกรณ์โดยตัดไฟ</p>
<h4>เลือกสื่อ 4 คำถาม</h4>
<table>
<tr><th>คำถาม</th><th>แนวตอบ</th></tr>
<tr><td>ไกลแค่ไหน</td><td>&lt; 100 m copper; หลายร้อยเมตร multimode fibre; กิโลเมตร single-mode; ไม่มีสายได้ radio</td></tr>
<tr><td>noise เป็นอย่างไร</td><td>โรงงาน/ลิฟต์/ใกล้มอเตอร์: shielded copper หรือ fibre (ไม่โดนรบกวนไฟฟ้า)</td></tr>
<tr><td>ต้องเคลื่อนที่ไหม</td><td>เคลื่อนที่/เดินสายไม่ได้: radio (ยอมรับอัตราต่ำกว่าและการแชร์)</td></tr>
<tr><td>ค่าใช้จ่ายระยะยาว</td><td>fibre ติดตั้งแพง อัปเกรดถูก (แก้ปลายสายแก้แต่ glass ฝังเดิม); copper ตรงกันข้าม</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> &quot;Fibre ดีกว่าเสมอ&quot; ผิด &mdash; ดีกว่าที่ระยะไกลและความทนทานต่อ noise แต่แพงกว่าต่อ port สำหรับเดสก์ที่อยู่ห่าง 20 m; ตอบ scenario ไม่ใช่โฆษณา</div>`
    },
    {
      t: "Modulation: ทำไมต้องมี carrier และ ASK / FSK / PSK",
      html: `
<p>ส่งสัญญาณ baseband (คลื่นสี่เหลี่ยม) ผ่านสายได้ แต่ผ่านอากาศไม่ได้ ด้วย 3 เหตุผล:</p>
<ol>
<li><b>เสาอากาศต้องเข้ากับความยาวคลื่น:</b> &lambda; = c / f; เสาที่ใช้งานได้ ~ &lambda;/4; ที่ 1 MHz &lambda; = 300 m &rarr; เสา 75 m; ที่ 2.4 GHz เสาประมาณ 3 cm</li>
<li><b>ทุกคนทับกัน:</b> baseband อยู่ตั้งแต่ 0 Hz ขึ้นไป วิทยุหลายตัวในห้องเดียวจึงใช้ความถี่เดียวกัน ไม่มีอะไรให้ &quot;จูน&quot;</li>
<li><b>ขอบสี่เหลี่ยมต้องใช้แถบความถี่:</b> คลื่นสี่เหลี่ยม = fundamental + harmonics (f, 3f, 5f ...) ช่องสัญญาณอากาศผ่านได้แค่ช่องแคบ ถ้าเหลือแต่ fundamental จะกลายเป็น sine</li>
</ol>
<p>ทางแก้: ใช้ <b>carrier</b> (sine ความถี่ที่ช่องชอบ) แล้วเปลี่ยนอะไรบางอย่างตามบิต = <b>modulation</b>; carrier ไม่ได้ทำให้สัญญาณแคบลง แต่ <i>ย้าย</i> ไปที่ &quot;ที่อยู่&quot; ของมัน (ยังกว้าง 20 MHz เท่าเดิม)</p>
<table>
<tr><th>แบบ</th><th>เปลี่ยน</th><th>ลักษณะ</th></tr>
<tr><td><b>ASK</b> Amplitude</td><td>ความแรง: ดัง = 1, เบา = 0</td><td>ง่าย; fibre ใช้ (แสงเปิด/ปิด); เปราะต่อ noise เพราะ noise คือการเปลี่ยน amplitude</td></tr>
<tr><td><b>FSK</b> Frequency</td><td>โทนหนึ่ง = 1 อีกโทน = 0</td><td>ทนทาน แต่สิ้นเปลือง bandwidth (เสียง modem dial-up)</td></tr>
<tr><td><b>PSK</b> Phase</td><td>กลับเฟสครึ่งรอบ</td><td>แอมพลิจูดและความถี่คงที่ วัดง่าย เป็นฐานของยุคใหม่</td></tr>
</table>
<p>PSK แบบ 4 เฟส = <b>QPSK</b> (quadrature PSK): constellation มี 4 จุด = 2 bit/symbol (log<sub>2</sub> 4 = 2) ใช้ใน GPS, Wi-Fi อัตราเก่า, ดาวเทียม เพราะทนสัญญาณแย่ แต่ยังพก 2 bit ต่อ symbol</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Carrier มีสามอย่างที่เปลี่ยนได้: amplitude, frequency, phase</li>
<li>เสา &asymp; &lambda;/4 (1 MHz = 75 m, 2.4 GHz = 3 cm); &lambda; = c/f</li>
<li>ASK อ่อนต่อ noise ที่สุดเพราะ noise คือการเปลี่ยน amplitude</li>
</ul></div>`
    },
    {
      t: "QAM, constellation, adaptive modulation, baud vs bit rate",
      html: `
<p>ใน <b>constellation diagram</b> แต่ละจุด = 1 symbol ที่ส่งได้; ระยะจากจุดศูนย์กลาง = amplitude; มุมรอบศูนย์กลาง = phase. <b>QAM</b> ใช้ amplitude + phase ร่วมกัน จุดวางได้ทั้งระนาบ</p>
<div class="dg"><div class="dgt">🖼️ 16-QAM: 16 จุด = 4 bit/symbol, noise cloud</div>
<svg viewBox="0 0 400 190" xmlns="http://www.w3.org/2000/svg">
<rect class="bx" x="60" y="20" width="12" height="12"/><rect class="bx" x="100" y="20" width="12" height="12"/><rect class="bx" x="140" y="20" width="12" height="12"/><rect class="bx" x="180" y="20" width="12" height="12"/>
<rect class="bx" x="60" y="60" width="12" height="12"/><rect class="bx" x="100" y="60" width="12" height="12"/><rect class="bx ok" x="140" y="60" width="12" height="12"/><rect class="bx" x="180" y="60" width="12" height="12"/>
<rect class="bx" x="60" y="100" width="12" height="12"/><rect class="bx" x="100" y="100" width="12" height="12"/><rect class="bx" x="140" y="100" width="12" height="12"/><rect class="bx" x="180" y="100" width="12" height="12"/>
<rect class="bx" x="60" y="140" width="12" height="12"/><rect class="bx" x="100" y="140" width="12" height="12"/><rect class="bx" x="140" y="140" width="12" height="12"/><rect class="bx" x="180" y="140" width="12" height="12"/>
<text class="t b" x="230" y="40">M = 16 จุด</text>
<text class="t sm" x="230" y="60">log2 16 = 4 bit/symbol</text>
<text class="t sm" x="230" y="85">SNR ดี: กลุ่มแน่น แยกได้ชัด</text>
<text class="t sm" x="230" y="105">SNR ต่ำ: กลุ่ม noise กว้างขึ้น</text>
<text class="t sm" x="230" y="125">จนซ้อนกัน = ผู้รับเดาผิด</text>
<text class="t sm" x="230" y="155">ลด M เมื่อ SNR ลด (adaptive)</text>
</svg></div>
<table>
<tr><th>Modulation</th><th>จุด M</th><th>bits/symbol = log<sub>2</sub> M</th></tr>
<tr><td>BPSK</td><td>2</td><td>1</td></tr>
<tr><td>QPSK (4-QAM)</td><td>4</td><td>2</td></tr>
<tr><td>16-QAM</td><td>16</td><td>4</td></tr>
<tr><td>64-QAM</td><td>64</td><td>6</td></tr>
<tr><td>256-QAM</td><td>256</td><td>8</td></tr>
<tr><td>1024-QAM</td><td>1024</td><td>10</td></tr>
</table>
<p>นี่คือ <b>M ใน Nyquist</b> ตัวจริง: C = 2B log<sub>2</sub> M; จาก 256 เป็น 1024 ได้แค่ +2 bit/symbol แต่ระดับที่ผู้รับต้องแยกเพิ่มเป็น 4 เท่า</p>
<h4>Shannon วาดเป็นภาพ</h4>
<p>ขนาดกลุ่ม noise กำหนดโดย SNR; ถ้าจุดอยู่ใกล้กันกว่าความกว้างของกลุ่ม symbol จะแยกไม่ออก &rarr; SNR กำหนดจำนวนจุดที่ใช้ได้ &rarr; กำหนด bits/symbol &rarr; กำหนด rate</p>
<h4>Adaptive modulation (80 MHz, 2 streams, 802.11ax)</h4>
<table>
<tr><th>Modulation</th><th>bit/sym</th><th>SNR ที่ต้องการ (ประมาณ)</th><th>อยู่ตรงไหน</th><th>Rate</th></tr>
<tr><td>1024-QAM</td><td>10</td><td>~37 dB</td><td>ข้าง router</td><td>1201 Mbps</td></tr>
<tr><td>256-QAM</td><td>8</td><td>~31 dB</td><td>ห้องเดียวกัน</td><td>961 Mbps</td></tr>
<tr><td>64-QAM</td><td>6</td><td>~21 dB</td><td>ห้องถัดไป</td><td>576 Mbps</td></tr>
<tr><td>16-QAM</td><td>4</td><td>~13 dB</td><td>ทางเดิน</td><td>288 Mbps</td></tr>
<tr><td>QPSK</td><td>2</td><td>~8 dB</td><td>ผ่านกำแพง 2 ชั้น</td><td>144 Mbps</td></tr>
<tr><td>BPSK</td><td>1</td><td>~5 dB</td><td>แทบไม่ติด</td><td>72 Mbps</td></tr>
</table>
<p>จากข้าง router ไปห่างสองห้อง rate ลด ~16 เท่าโดยไม่มีอะไรพัง แค่ SNR ต่ำลง radio ย้ายไป constellation จุดน้อยลง</p>
<h4>Baud rate vs Bit rate</h4>
<p><b>bit rate = baud rate &times; log<sub>2</sub> M</b>; baud = symbol/s ถูกจำกัดที่ 2B (Nyquist) เป็นคุณสมบัติของ <i>ช่อง</i>; bits/symbol เป็นของ <i>modulation</i>. ที่ 1,000 baud: BPSK 1,000 bit/s; QPSK 2,000; 16-QAM 4,000; 1024-QAM 10,000 bit/s (ช่อง/baud เดียวกัน ต่างกัน 10 เท่า)</p>
<h4>ตัวอย่างคำนวณ</h4>
<ol>
<li>2 Msym/s, 16-QAM: log<sub>2</sub> 16 = 4 &rarr; 2&times;10<sup>6</sup> &times; 4 = <b>8 Mbit/s</b></li>
<li>ต้องการ 48 Mbps จาก 6 Msym/s: 48/6 = 8 bit/sym &rarr; M = 2<sup>8</sup> = 256 &rarr; <b>256-QAM</b></li>
<li>ลิงก์เดิมตกลง QPSK (2 bit): 6 &times; 2 = <b>12 Mbit/s</b> = ลดเหลือ 1/4 (ไม่มีอะไรพัง SNR ตก)</li>
</ol>
<h4>FEC, Gray code, MIMO</h4>
<ul>
<li><b>FEC</b> (forward error correction): ส่งบิตซ้ำซ้อนให้ผู้รับซ่อมเอง ไม่ต้องรอ retransmit; coding rate 1/2 = 100% overhead (สัญญาณแย่), 2/3 = 50%, 3/4 = 33%, 5/6 = 20% (สัญญาณดี) และ radio เลือกทั้ง modulation และ coding &rarr; อัตราตก 2 ต่อ</li>
<li><b>Gray coding:</b> จัด label ให้จุดข้างเคียงต่างกัน 1 bit; symbol error ส่วนใหญ่ตกที่จุดข้างๆ จึงเสียแค่ 1 bit; ฟรี ไม่เสีย power/bandwidth; BER ลดประมาณครึ่ง</li>
<li><b>MIMO:</b> 2 เสาอากาศส่งคนละข้อมูลบนความถี่/เวลาเดียวกัน; ผู้รับมี 2 สมการ 2 ตัวไม่ทราบค่า แก้ได้ทั้งคู่; multipath กลายเป็นทรัพยากร; เป็นเพียงพจน์เดียวที่ &quot;ข้าม&quot; เพดาน Shannon เพราะเป็นสองช่องจริงๆ (เพดานใช้แยกแต่ละช่อง)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>bit rate = baud &times; log<sub>2</sub> M; M จุด = log<sub>2</sub> M bit</li>
<li>SNR ต่ำ &rarr; จุดน้อยลง + coding หนักขึ้น &rarr; rate ตกสองต่อ</li>
</ul></div>`
    },
    {
      t: "Multiplexing: FDM, TDM, WDM, OFDM, CDM",
      html: `
<p>Class ที่แล้วถามว่า &quot;หลายอุปกรณ์ หนึ่งช่อง ใครพูดได้?&quot; (multiple access: partition/contend/take turns) ตอนนี้ถามว่า &quot;หนึ่งสื่อ หลายสัญญาณ ใส่พร้อมกันอย่างไร?&quot; &mdash; คณิตศาสตร์เดียวกัน (channel partitioning คือ multiplexing) ต่างกันที่ใครทำและทำเพื่ออะไร: multiple access แชร์ช่องระหว่างอุปกรณ์ที่มองไม่เห็นกัน; multiplexing แชร์สื่อระหว่างสัญญาณที่ผู้ให้บริการเดียวควบคุม</p>
<table>
<tr><th>Scheme</th><th>แบ่งตาม</th><th>วิธีทำงาน</th><th>พบที่</th></tr>
<tr><td>FDM</td><td>ความถี่</td><td>แต่ละสัญญาณถือแถบของตัวเองตลอดเวลา</td><td>วิทยุ/ทีวี, หมายเลข channel Wi-Fi, สายโทรศัพท์อะนาล็อก</td></tr>
<tr><td>TDM</td><td>เวลา</td><td>ทุกสัญญาณได้ทั้งแถบเป็น slot วนซ้ำ</td><td>T1/E1, โทรศัพท์ดิจิทัล, เสียงมือถือ</td></tr>
<tr><td>WDM</td><td>wavelength (สี)</td><td>FDM บน fibre: 1 สีต่อ 1 สัญญาณ</td><td>fibre ทางไกล/ใต้ทะเล</td></tr>
<tr><td>OFDM</td><td>หลาย carrier แคบพร้อมกัน</td><td>subcarrier orthogonal หลายร้อยตัว modulate แยกกัน</td><td>Wi-Fi, 4G, 5G, DSL, ทีวีดิจิทัล</td></tr>
<tr><td>CDM</td><td>code</td><td>ใช้เวลาและแถบพร้อมกัน แยกด้วย orthogonal code</td><td>3G, GPS</td></tr>
</table>
<h4>TDM ใกล้ๆ</h4>
<ul>
<li><b>Synchronous TDM:</b> slot ที่ 3 เป็นของผู้ใช้ 3 ทุก frame แม้ไม่มีอะไรจะส่ง; ง่าย, delay คงที่ (ตรงกับ voice) แต่ <b>เปลือง</b> เมื่อเจ้าของเงียบ &mdash; ข้อมูลเป็น burst จึงแย่มาก (เหตุที่โทรศัพท์ย้ายไป IP)</li>
<li><b>Statistical TDM:</b> ให้ slot แก่ผู้ที่มีข้อมูลรออยู่; ไม่เปลือง แต่ต้องมี label ว่าเป็นของใคร และ delay แปรผัน = packet network</li>
<li>T1 (อเมริกาเหนือ/ญี่ปุ่น): 24 ช่อง &times; 64 kbps + 8 kbps framing = 1.544 Mbps; E1 (ยุโรป/ไทย): 32 &times; 64 kbps = 2.048 Mbps</li>
</ul>
<h4>WDM</h4>
<p>C-band ~4.4 THz; spacing 50 GHz &rarr; 4.4 THz / 50 GHz = ~88 ช่อง &times; 100 Gbps = ~8.8 Tbps บนเส้นเดียว; เพิ่มความจุโดยเปลี่ยนอุปกรณ์ปลายสายและจุดสีเพิ่ม ไม่ต้องขุดถนน</p>
<h4>OFDM</h4>
<p>Subcarrier ซ้อนกันได้ แต่ยอดของแต่ละตัวอยู่ตรง zero ของตัวข้างเคียง (orthogonal) จึงอัดแน่นกว่า FDM ไม่ต้องมี guard band; carrier แคบ &rarr; symbol ยาว (เช่น 12.8 &mu;s) &rarr; เสียงสะท้อน (echo ช้า 100 ns = ทางเพิ่ม 30 m) ตกอยู่ใน symbol เดียวกันแทนที่จะเบลอเข้า symbol ถัดไป = แก้ multipath; ได้ symbol ยาวโดยไม่เสียความเร็วเพราะส่งช้าแต่ ~พันตัวพร้อมกัน; Wi-Fi ช่อง 80 MHz (802.11ac) มี 980 subcarrier ที่พกข้อมูล และแต่ละตัวมี constellation ของตัวเองได้</p>
<div class="note"><b>💡 หมายเหตุ</b> OFDM ไม่ใช่ modulation แต่คือ QAM จำนวนมากวางเคียงกัน; Wi-Fi 6 = OFDM + QAM สูงสุด 1024; 4G/5G = OFDM + QAM สูงสุดตามรุ่น; gigabit copper = PAM-5 บน 4 คู่; ใยแก้ = on/off keying (ASK); GPS = BPSK + spreading code (สัญญาณดาวเทียมอ่อนกว่า noise); ยิ่งสื่อเงียบ ยิ่งใช้วิธีง่าย</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>FDM = ความถี่, TDM = เวลา, WDM = สีบน fibre, OFDM = หลาย subcarrier orthogonal (กัน multipath), CDM = code</li>
<li>E1 = 32 &times; 64k = 2.048 Mbps (sync TDM); T1 = 24 &times; 64k + 8k = 1.544 Mbps</li>
</ul></div>`
    },
    {
      t: "ทำไมไม่เคยเห็น 1200 Mbps",
      html: `
<p>ตัวเลขบนกล่อง = ตัวเลขทางทฤษฎีของ <i>วิทยุ</i> ในสภาพสมบูรณ์แบบ ขั้นตอนคำนวณอัตรา:</p>
<ol>
<li><b>Symbol rate</b> R (ให้มาหรือ 2B จาก Nyquist)</li>
<li>&times; <b>bits/symbol</b> = log<sub>2</sub> M (1024-QAM = 10)</li>
<li>&times; <b>coding rate</b> (5/6 = ห้าบิตมีประโยชน์ใน 6 บิตที่ส่ง)</li>
<li>&times; <b>spatial stream</b> (MIMO 2 ช่อง = &times;2)</li>
<li>ลบทุกอย่างจาก Layer 2: header, ACK, backoff, beacon และการสลับกันส่งกับคนอื่น (ข้อนี้ใหญ่ที่สุด)</li>
</ol>
<p>ขั้น 1&ndash;4 ให้ตัวเลขบนกล่อง; ขั้น 5 คือเหตุที่ไม่เคยเห็น</p>
<h4>คำนวณ 1,201 Mbps</h4>
<p>80 MHz OFDM: 980 data subcarrier &times; 10 bit (1024-QAM) = 9,800 bit; &times; 5/6 = 8,166.7; &times; 2 stream = 16,333 bit ต่อ symbol; หารด้วยเวลา symbol + guard interval = 13.6 &mu;s &rarr; 16,333 / 13.6 &mu;s = <b>1,201 Mbps</b></p>
<p>ถ้า SNR ตกเหลือ 256-QAM (8 bit): 980 &times; 8 &times; 5/6 &times; 2 / 13.6 &mu;s = 13,067 / 13.6 &mu;s &asymp; <b>961 Mbps</b> (ตรงตาราง) และเพียง 1 stream จะเป็น &asymp; 480 Mbps</p>
<h4>และ Shannon บอกเพดาน</h4>
<p>ช่อง 80 MHz, SNR 25 dB (S/N &asymp; 316): C = 80&times;10<sup>6</sup> &times; log<sub>2</sub>(317) &asymp; 665 Mbit/s ต่อ stream, ~1.3 Gbit/s สอง stream &mdash; ย้ายไปห้องถัดไป SNR ตก เพดาน Shannon ตกตาม <i>ก่อน</i> หักค่า overhead ของ L2 เสียอีก</p>
<table>
<tr><th>ในกล่อง (ตัวเลขที่ถูกต้องของวิทยุ)</th><th>ที่วัดจริง (สิ่งที่ต้องแชร์กับ)</th></tr>
<tr><td>980 subcarrier, 1024-QAM, 5/6, 2 stream, 13.6 &mu;s</td><td>สัญญาณไม่สมบูรณ์ &rarr; radio ลด constellation และ coding</td></tr>
<tr><td></td><td>header ทุก frame (Ethernet, IP, TCP แต่ละชั้นเอาส่วนแบ่ง)</td></tr>
<tr><td></td><td>ACK ทุก frame, backoff, beacon, contention</td></tr>
<tr><td></td><td>half duplex: ส่งและรับพร้อมกันไม่ได้; ดาวน์โหลดแย่งช่องกับ ACK; ช่องแชร์กับทุกคน</td></tr>
</table>
<p>ในทางปฏิบัติ ~300&ndash;600 Mbps ในวันที่ดี. สรุปในประโยคเดียว: <b>Shannon กำหนดเพดาน, modulation กำหนดว่าเข้าใกล้เพดานแค่ไหน, Layer 2 กำหนดว่าเหลือเท่าไรให้คุณ</b></p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>980 &times; 10 &times; 5/6 &times; 2 / 13.6 &mu;s = 1,201 Mbps</li>
<li>เหตุที่ไม่เห็น: SNR ตก &rarr; modulation/coding ลด, L2 overhead, half duplex, ช่องแชร์</li>
</ul></div>`
    },
    {
      t: "ทั้ง stack Layer 7 &rarr; Layer 1 และกับดักสอบ",
      html: `
<div class="dg"><div class="dgt">🖼️ เส้นทางของข้อมูลลงผ่านทุกชั้น</div>
<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg">
<rect class="bx hd" x="10" y="8" width="130" height="26"/><text class="t b" x="18" y="26">7 Application</text><text class="t sm" x="150" y="26">HTTP, DNS, SMTP</text>
<rect class="bx" x="10" y="38" width="130" height="26"/><text class="t b" x="18" y="56">6 Presentation</text><text class="t sm" x="150" y="56">encode, compress, encrypt</text>
<rect class="bx" x="10" y="68" width="130" height="26"/><text class="t b" x="18" y="86">5 Session</text><text class="t sm" x="150" y="86">เปิด / คง / ปิดการสนทนา</text>
<rect class="bx" x="10" y="98" width="130" height="26"/><text class="t b" x="18" y="116">4 Transport</text><text class="t sm" x="150" y="116">TCP/UDP: port, reliability, flow</text>
<rect class="bx" x="10" y="128" width="130" height="26"/><text class="t b" x="18" y="146">3 Network</text><text class="t sm" x="150" y="146">IP address, routing ข้ามเครือข่าย</text>
<rect class="bx ok" x="10" y="158" width="130" height="26"/><text class="t b" x="18" y="176">2 Data link</text><text class="t sm" x="150" y="176">frame, MAC, CRC, ใครส่งได้ (1 hop)</text>
<rect class="bx ok" x="10" y="188" width="130" height="26"/><text class="t b" x="18" y="206">1 Physical</text><text class="t sm" x="150" y="206">line code, modulation, สื่อ</text>
<path class="ln" fill="none" d="M75 218 V240 H400"/>
<text class="t sm" x="150" y="236">voltage / light / radio</text>
</svg></div>
<h4>Scenario: เปิดหน้าเว็บจากโน้ตบุ๊กที่ต่อ Wi-Fi (https://www.example.com)</h4>
<ol>
<li><b>L7:</b> เบราว์เซอร์ถาม DNS หา IP ของ www.example.com แล้วสร้างคำขอ HTTP</li>
<li><b>L6:</b> TLS เข้ารหัสข้อมูล (และอาจ compress/encode)</li>
<li><b>L5:</b> เปิดและคง session ของการสนทนา</li>
<li><b>L4:</b> TCP handshake (SYN/SYN-ACK/ACK) พอร์ตปลายทาง 443 พอร์ตต้นทางสุ่ม; ให้ reliability และ flow control</li>
<li><b>L3:</b> IP header: src = IP โน้ตบุ๊ก, dst = IP เซิร์ฟเวอร์; เซิร์ฟเวอร์อยู่ต่างเครือข่าย จึงส่งให้ default gateway</li>
<li><b>L2:</b> ARP ถาม MAC ของ gateway (ในเครือข่ายเดียวกัน) frame: dst MAC = gateway, src MAC = โน้ตบุ๊ก; มี CRC ท้าย frame; บน Wi-Fi ต้องใช้ CSMA/CA และตอบ ACK ทุก frame ที่มี Address 1/2/3</li>
<li><b>L1:</b> Wi-Fi ใช้ OFDM + QAM (ตาม SNR) ผ่านวิทยุไป AP; จาก AP ไป switch ด้วย copper (twisted pair ไม่เกิน 100 m; line coding เช่น PAM-5); ระหว่างตึกด้วย fibre; แต่ละ router hop รับ frame ถอดออกจนถึง L3 ตัดสินใจ forwarding แล้วสร้าง <b>frame ใหม่</b> (MAC ใหม่) &mdash; แต่ IP address ต้นทาง/ปลายทางเหมือนเดิม (ไม่นับ NAT) และ TTL ลดลง 1</li>
</ol>
<p><b>MAC ใช้ข้าม 1 hop; IP ใช้ข้ามทั้งโลก</b> และฝั่งเซิร์ฟเวอร์ ทุกอย่างกลับขึ้นตามลำดับ L1 &rarr; L7</p>
<h4>ห้าคลาสในประโยคเดียว</h4>
<table>
<tr><th>ส่วน</th><th>เนื้อหา</th></tr>
<tr><td>Stack และการหาเพื่อนบ้าน</td><td>7 ชั้น, ARP หา MAC, local vs global delivery</td></tr>
<tr><td>หา frame และเชื่อใจ frame</td><td>stuffing, preamble/SFD, parity, checksum, CRC</td></tr>
<tr><td>ใครส่งได้</td><td>partition / contend / take turns: ALOHA ถึง CSMA/CD, 64 B min, self-learning switch, VLAN, Wi-Fi</td></tr>
<tr><td>bit กลายเป็นของจริง</td><td>delay, impairments, dB, clock, line code, media, Nyquist/Shannon</td></tr>
<tr><td>bit ขี่คลื่นและแบ่งกันใช้</td><td>modulation, adaptive rate, multiplexing, 1200 Mbps</td></tr>
</table>
<h4>กับดักที่เสียคะแนนบ่อย</h4>
<ul>
<li>&quot;Bandwidth คือ speed&quot; &mdash; Hz ไม่เท่า bit/s; ผูกกันด้วย modulation</li>
<li>ใส่ dB ตรงๆ ใน Shannon &mdash; ต้องแปลง S/N = 10<sup>(dB/10)</sup> (30 dB = 1000)</li>
<li>&quot;Switch แยก broadcast domain&quot; &mdash; แยก collision domain; router เท่านั้นที่แยก broadcast domain</li>
<li>&quot;Link เร็วขึ้นลด delay ทั้งหมด&quot; &mdash; ลดเฉพาะ L/R ไม่ลด d/s</li>
<li>&quot;CRC แก้ error&quot; &mdash; CRC ตรวจ; การแก้คือ retransmission หรือ error-correcting code (FEC)</li>
<li>&quot;Fibre ดีกว่าเสมอ&quot; &mdash; ดีกว่าที่ระยะ/ความทนทาน noise แพงกว่าที่ port สำหรับเดสก์ใกล้ๆ</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> ถามตัวเองเสมอว่า &quot;รายละเอียดนี้แก้ปัญหาอะไรที่เคยพัง&quot; &mdash; 64-byte minimum, ตาราง 4B5B, Address 4 ใน 802.11 มีเหตุผลทั้งหมด; Overhead ไม่เคยเป็นศูนย์ และฟิสิกส์ตั้งเพดาน: Shannon จำกัดช่อง, attenuation จำกัดระยะ, ความเร็วแสงจำกัด delay</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: "ลิงก์วิทยุส่ง 2 ล้าน symbol ต่อวินาที (2 Msym/s) ด้วย 16-QAM ไม่มี coding และมี 1 stream",
      q: "raw bit rate เท่าไร?",
      opts: [
        { t: "2 Mbit/s", why: "ผิด &mdash; คือการนับ 1 bit/symbol; 16-QAM พก 4 bit/symbol" },
        { t: "32 Mbit/s", why: "ผิด &mdash; คูณด้วย M = 16 แทนที่จะเป็น log<sub>2</sub> 16 = 4" },
        { t: "8 Mbit/s", why: "ถูก: log<sub>2</sub> 16 = 4 bit/symbol; 2&times;10<sup>6</sup> &times; 4 = 8 Mbit/s" },
        { t: "4 Mbit/s", why: "ผิด &mdash; QPSK (2 bit/symbol) จะได้ 4 Mbit/s ไม่ใช่ 16-QAM" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: "ลิงก์ต้องการ 48 Mbps โดยส่งได้ 6 ล้าน symbol ต่อวินาที (ไม่นับ coding และ stream)",
      q: "constellation ต้องมีกี่จุดอย่างน้อย?",
      opts: [
        { t: "256 จุด (256-QAM)", why: "ถูก: 48/6 = 8 bit/symbol; M = 2<sup>8</sup> = 256" },
        { t: "8 จุด", why: "สับสน bits/symbol (8) กับจำนวนจุด; M = 2<sup>8</sup> ไม่ใช่ 8" },
        { t: "64 จุด (64-QAM)", why: "64-QAM ได้แค่ 6 bit/symbol = 36 Mbps ไม่พอ" },
        { t: "1024 จุด", why: "1024-QAM ได้ 60 Mbps เกินที่ต้องการ และต้องการ SNR สูงกว่าที่จำเป็น" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: "ผู้ใช้เดินจากข้าง AP ไปห้องถัดไป ลิงก์ Wi-Fi 80 MHz 2 stream ยังเชื่อมอยู่ แต่ rate ที่ระบบรายงานลดจาก 1201 Mbps เหลือ 576 Mbps โดยไม่มีอุปกรณ์ใดเสีย",
      q: "อะไรอธิบายปรากฏการณ์นี้ได้ถูกต้องที่สุด?",
      opts: [
        { t: "AP ลดความเร็ว clock ของมันเองเมื่อผู้ใช้ไกลออกไป", why: "ความเร็ว symbol ของช่องไม่ได้ลดตามระยะ; สิ่งที่เปลี่ยนคือ modulation" },
        { t: "สาย LAN ของ AP ยาวขึ้นเมื่อผู้ใช้เดินไกลออกไป", why: "ระยะวิทยุไม่เกี่ยวกับความยาวสาย LAN ของ AP" },
        { t: "CRC ล้มเหลว จึงลด rate", why: "CRC เป็นผลของ error ใน L2 ไม่ใช่กลไกเลือก rate ของ L1" },
        { t: "SNR ลดลง กลุ่ม noise ใน constellation ใหญ่ขึ้น radio จึงเลือก modulation จุดน้อยลง (1024-QAM &rarr; 64-QAM) และ coding หนักขึ้น", why: "ถูก: adaptive modulation; 10 bit &rarr; 6 bit/symbol (และ coding) ทำให้ rate ตกโดยไม่มีอะไรพัง" }
      ],
      ans: 3
    },
    {
      type: "choice",
      story: "ลิงก์ที่ 6 Msym/s ใช้ 256-QAM ได้ 48 Mbps เมื่อเข้าห้องที่ noise สูง radio ตกลงมาใช้ QPSK โดย symbol rate และ bandwidth คงเดิม",
      q: "rate ใหม่และอัตราการลดคือเท่าไร?",
      opts: [
        { t: "24 Mbps ลดเป็นครึ่งหนึ่ง", why: "ผิด &mdash; นั่นคือ 4 bit/symbol (16-QAM)" },
        { t: "12 Mbps ลดเหลือ 1/4", why: "ถูก: QPSK = 2 bit/symbol; 6 &times; 2 = 12 Mbps; 8 bit &rarr; 2 bit = 1/4" },
        { t: "12 Mbps ลดเหลือครึ่งหนึ่ง", why: "12 ถูกแต่ 48 &rarr; 12 คือ 1/4 ไม่ใช่ครึ่ง" },
        { t: "6 Mbps เพราะ QPSK คือ 1 bit/symbol", why: "1 bit/symbol คือ BPSK; QPSK มี 4 จุด = 2 bit" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "ข้อมูลจากสเปก Wi-Fi: 80 MHz มี 980 subcarrier, 256-QAM (8 bit), coding 5/6, 2 spatial stream, เวลา symbol รวม guard = 13.6 &mu;s",
      q: "อัตราบิตระดับ PHY โดยประมาณเท่าไร?",
      opts: [
        { t: "ประมาณ 1,201 Mbps", why: "นั่นคือค่าของ 1024-QAM (10 bit); 256-QAM ต่ำกว่า" },
        { t: "ประมาณ 480 Mbps", why: "นั่นคือค่าของ 1 stream; โจทย์มี 2 stream" },
        { t: "ประมาณ 961 Mbps", why: "ถูก: 980 &times; 8 &times; 5/6 &times; 2 = 13,067 bit ต่อ symbol; / 13.6 &mu;s &asymp; 961 Mbps" },
        { t: "ประมาณ 1,153 Mbps", why: "ไม่ตรงกับการคำนวณใดๆ (ตัวเลขที่ไม่ได้มาจากสูตร 980 &times; 8 &times; 5/6 &times; 2 / 13.6 &mu;s)" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: "ต้องส่งเสียง 32 สายเข้า 1 ลิงก์ 2.048 Mbps โดย delay ต้องคงที่และคาดเดาได้ (สายละ 64 kbps)",
      q: "ควรใช้ multiplexing แบบใด?",
      opts: [
        { t: "WDM เพราะแบ่งตามสี", why: "WDM ใช้บน fibre แบ่ง wavelength ไม่เกี่ยวกับ 32 &times; 64 kbps บนลิงก์เดียว" },
        { t: "Statistical TDM เพราะไม่เปลืองเมื่อเงียบ", why: "delay แปรผัน ไม่ตรงโจทย์ที่ต้องการคงที่" },
        { t: "CDM เพราะแบ่งด้วย code", why: "ไม่ใช่รูปแบบของ E1 และไม่จำเป็นสำหรับ voice ตายตัว" },
        { t: "Synchronous TDM (แบบ E1: 32 &times; 64 kbps = 2.048 Mbps)", why: "ถูก: slot คงที่ delay คงที่ ตรงกับ voice และเลข 2.048 Mbps พอดี" }
      ],
      ans: 3
    },
    {
      type: "choice",
      story: "ห้อง server ติดตั้ง Cat6 ยาว 70 m ให้ 10GBASE-T ลิงก์ขึ้นแต่ error สูงและหลุดบ่อย ส่วนสาย Cat6 ที่ 40 m ใช้ 10 Gbps ได้ปกติ",
      q: "การวินิจฉัยและแก้ที่เหมาะสมคือข้อใด?",
      opts: [
        { t: "Cat6 ทำ 10 Gbps ได้แค่ราว 55 m (attenuation/crosstalk ที่ 250 MHz) &rarr; เปลี่ยนเป็น Cat6a หรือย้ายให้สั้นลง", why: "ถูก: ความเร็วสูงขึ้นระยะต้องสั้นลง Cat6a (500 MHz) รับได้ 100 m" },
        { t: "ลด MTU ที่ switch", why: "MTU เป็นเรื่อง L2/L3 ไม่ใช่การลดทอนสัญญาณบนสาย" },
        { t: "เปลี่ยนจาก T568B เป็น T568A ทั้งสองปลาย", why: "ไม่ช่วยเรื่องระยะ และต้องใช้มาตรฐานเดียวกันอยู่แล้ว" },
        { t: "เปิดใช้ CRC บน NIC", why: "CRC เปิดอยู่แล้วและเป็นการตรวจจับ ไม่ใช่การลดทอนสัญญาณ" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: "ช่างติดตั้งสายใหม่ 12 เส้น cable tester แบบ wiremap ผ่านทุกเส้น และ PC ต่อได้ที่ 100 Mbps แต่ switch gigabit ตกมาที่ 100 Mbps หรือมี error เฉพาะ 3 เส้น ในสายเหล่านั้นช่างจัดเขียวไว้ pin 3 และ 4",
      q: "จะยืนยันและแก้ปัญหาอย่างไร?",
      opts: [
        { t: "เปลี่ยน switch ใหม่ เพราะ port เสีย", why: "ปัญหาเกิดเฉพาะ 3 เส้นที่เดินผิด ไม่ใช่ที่ switch" },
        { t: "เข้าหัวใหม่ให้เขียวอยู่ pin 3 และ 6 ตามลำดับ T568 (split pair) และตรวจด้วย tester ที่วัด crosstalk", why: "ถูก: split pair ผ่าน wiremap แต่ทำลาย twist; 100 Mbps ใช้ pin 1,2,3,6 พอรอด; gigabit ใช้ 4 คู่จึงล้ม" },
        { t: "เพิ่มความยาวสายให้เกิน 100 m", why: "ผิดทิศ &mdash; ระยะเพิ่มทำให้ attenuation แย่ลง" },
        { t: "เปลี่ยน VLAN ของ port", why: "VLAN เป็นเรื่อง L2 ไม่เกี่ยวกับการบิดสายและ crosstalk" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "โน้ตบุ๊ก (MAC M1, IP I1) ใน LAN ส่งคำขอเว็บไปยังเซิร์ฟเวอร์ (IP I2) ที่อยู่ต่างเครือข่าย ผ่าน gateway R1 (MAC G1) และ router R2 (MAC G2) ตามลำดับ (ไม่นับ NAT)",
      q: "เมื่อ frame ออกจากโน้ตบุ๊กและเมื่อออกจาก R1 ไปหา R2 ฟิลด์ใดเปลี่ยนไปบ้าง?",
      opts: [
        { t: "MAC และ IP ทั้งต้นทางและปลายทางเปลี่ยนทั้งหมดทุก hop", why: "IP ต้นทาง/ปลายทางคงเดิมตลอดทาง (ถ้าไม่มี NAT)" },
        { t: "MAC เปลี่ยนทุก hop (dst = G1 แล้ว G2 ...), IP คงเดิม I1 &rarr; I2, TTL ลดลง 1 ต่อ hop, CRC คำนวณใหม่", why: "ถูก: L2 อยู่แค่ 1 hop; router ถอด frame ออกและสร้างใหม่; IP ข้ามทั้งโลก" },
        { t: "IP เปลี่ยนทุก hop แต่ MAC คงเดิม", why: "กลับด้าน &mdash; MAC เปลี่ยนทุก hop, IP คงเดิม" },
        { t: "ไม่มีอะไรเปลี่ยนเลยนอกจาก TTL", why: "MAC ปลายทางเปลี่ยนไปเป็น MAC ของ router ถัดไป และ CRC ถูกคำนวณใหม่" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "นักศึกษาตอบข้อสอบ: &quot;Ethernet ผ่านสาย copper จำกัดที่ 100 m เพราะต้องให้ collision กลับถึงผู้ส่งทันก่อนส่ง 64 B เสร็จ&quot; อาจารย์ให้คะแนนบางส่วน",
      q: "อะไรที่ขาดไปจากคำตอบที่สมบูรณ์?",
      opts: [
        { t: "ขาดเรื่อง MTU ของ Ethernet", why: "MTU ไม่เกี่ยวกับขีดจำกัดระยะ 100 m" },
        { t: "ขาดเรื่องความถี่ของ crystal ที่ 125 MHz", why: "ไม่ใช่สาเหตุของขีด 100 m" },
        { t: "ขาดเรื่อง attenuation (และ noise) ของ copper &mdash; ซึ่งเป็นเหตุผลทางฟิสิกส์ที่ยังอยู่แม้ full-duplex switched ไม่มี collision แล้ว", why: "ถูก: 100 m เป็นขีดจาก attenuation ที่เดิมเป็นขีดการตรวจจับ collision ด้วย" },
        { t: "ขาดเรื่องการตรวจ CRC", why: "CRC ไม่เกี่ยวกับเพดานระยะสาย" }
      ],
      ans: 2
    },
    {
      type: "multi",
      story: "เกี่ยวกับ modulation และ multiplexing",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "QAM ใช้ amplitude และ phase ร่วมกัน; จุดใน constellation หนึ่งจุดคือหนึ่ง symbol", ok: true, why: "ระยะจากศูนย์กลาง = amplitude, มุม = phase" },
        { t: "64-QAM พก 8 bit ต่อ symbol", ok: false, why: "log<sub>2</sub> 64 = 6; 8 bit คือ 256-QAM" },
        { t: "OFDM ทนต่อ multipath เพราะ subcarrier แคบ ทำให้ symbol ยาว และเสียงสะท้อนตกใน symbol เดียวกัน", ok: true, why: "echo 100 ns ช้าคือทาง 30 m; symbol ยาว (เช่น 12.8 &mu;s) กลบได้" },
        { t: "WDM คือ FDM บน fibre ที่แบ่งตามสีของแสง", ok: true, why: "แต่ละสัญญาณมี wavelength ของตัวเอง" },
        { t: "Synchronous TDM เหมาะกับข้อมูลแบบ burst เพราะไม่เปลือง slot", ok: false, why: "sync TDM เปลือง slot เมื่อเจ้าของเงียบ ซึ่งแย่มากกับ traffic แบบ burst; statistical TDM (packet) ตอบโจทย์นั้น" }
      ]
    },
    {
      type: "multi",
      story: "การวินิจฉัยปัญหาสายและ stack",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Wiremap tester ผ่าน แต่สายยังล้มที่ gigabit ได้ ถ้าเป็น split pair", ok: true, why: "ทุก pin ถึงเลขตัวเอง แต่คู่ที่บิดถูกทำลาย" },
        { t: "Cable tester เห็นสอง pin สว่างพร้อมกัน แสดงว่าเกิด short", ok: true, why: "ตัวนำสองเส้นแตะกัน" },
        { t: "Switch ทุกตัวแยก broadcast domain ได้", ok: false, why: "switch แยก collision domain; router (หรือ VLAN + L3) แยก broadcast domain" },
        { t: "Cat6 รับ 10 Gbps ได้ที่ 100 m เสมอ", ok: false, why: "10 Gbps บน Cat6 ได้เพียงราว 55 m; 100 m ต้อง Cat6a" },
        { t: "ลิงก์เร็วขึ้นช่วยลดเฉพาะ transmission delay L/R ไม่ลด propagation delay", ok: true, why: "d/s ขึ้นกับระยะและความเร็วสัญญาณ" }
      ]
    },
    {
      type: "blank",
      story: "สมมติ C-band ของ fibre กว้าง ~4.4 THz แบ่งช่องละ 50 GHz และแต่ละช่องส่ง 100 Gbps",
      text: "จำนวนช่อง = 4.4 THz / 50 GHz = {1} ช่อง; ความจุรวม &asymp; {2}; เทคนิคนี้คือ {3}",
      blanks: [
        { opts: ["44", "88", "440", "8"], ans: 1, why: "4,400 GHz / 50 GHz = 88" },
        { opts: ["880 Gbps", "88 Tbps", "8.8 Tbps", "4.4 Tbps"], ans: 2, why: "88 &times; 100 Gbps = 8,800 Gbps = 8.8 Tbps" },
        { opts: ["TDM", "WDM", "OFDM", "CDM"], ans: 1, why: "แบ่งตามสี/wavelength บน fibre = WDM" }
      ]
    },
    {
      type: "blank",
      text: "64-QAM พก {1} bit ต่อ symbol; ที่ 1,000 baud ด้วย 1024-QAM จะได้ {2} bit/s; และ FEC coding rate 5/6 มี overhead ราว {3}",
      blanks: [
        { opts: ["4", "5", "6", "8"], ans: 2, why: "log<sub>2</sub> 64 = 6" },
        { opts: ["1,000", "4,000", "10,000", "1,024,000"], ans: 2, why: "bit rate = baud &times; log<sub>2</sub> 1024 = 1,000 &times; 10" },
        { opts: ["5%", "20%", "50%", "100%"], ans: 1, why: "5 bit มีประโยชน์ใน 6 bit ที่ส่ง = เพิ่ม 1 ใน 5 = 20%" }
      ]
    },
    {
      type: "blank",
      story: "ชั้นของ OSI ที่ทำงานต่างๆ ในการเปิดหน้าเว็บ",
      text: "การตรวจ CRC และใช้ MAC address เกิดที่ {1}; port 443 ของ TLS/TCP อยู่ที่ {2}; และ line coding กับ modulation อยู่ที่ {3}",
      blanks: [
        { opts: ["Layer 3", "Layer 4", "Layer 2", "Layer 1"], ans: 2, why: "frame, MAC และ CRC เป็นของ Data link (L2)" },
        { opts: ["Layer 4", "Layer 7", "Layer 2", "Layer 3"], ans: 0, why: "port เป็นของ Transport (TCP/UDP)" },
        { opts: ["Layer 2", "Layer 1", "Layer 5", "Layer 6"], ans: 1, why: "แปลงบิตเป็น voltage/light/radio คือ Physical" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ scheme กับที่ใช้งานจริง",
      pairs: [
        ["FDM", "สถานีวิทยุ/ทีวี และหมายเลข channel ของ Wi-Fi"],
        ["Synchronous TDM", "สาย E1 / T1 ของโทรศัพท์ดิจิทัล"],
        ["WDM", "fibre ทางไกลและใต้ทะเล"],
        ["OFDM", "Wi-Fi, 4G, 5G, DSL"],
        ["CDM", "GPS และ 3G"]
      ],
      why: "FDM ถือแถบความถี่ถาวร; sync TDM ใช้ slot คงที่ (32 &times; 64 kbps = 2.048 Mbps); WDM แบ่งตามสีบน fibre; OFDM ใช้ subcarrier orthogonal ทน multipath; CDM แยกด้วย orthogonal code"
    }
  ]
});
