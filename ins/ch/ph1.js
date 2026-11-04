IOT.reg({
  id: "ph1",
  title: "Physical Layer 1: Signals, Line Coding & Capacity",
  th: "สัญญาณ ดีเลย์ การลดทอน/สัญญาณรบกวน (dB) นาฬิกาของผู้รับ Line coding (NRZ/NRZI/Manchester/4B5B) สื่อกลางส่งข้อมูล และสูตร Nyquist กับ Shannon",
  summary: `
<ul>
<li><b>Layer 1</b> แปลงบิตเป็น แรงดันไฟฟ้า (copper) / แสง (fibre) / คลื่นวิทยุ (air) &mdash; ไม่รู้จัก frame, MAC, IP และไม่ตรวจ error (นั่นคือ CRC ของ L2)</li>
<li>Bit time = 1 / bit rate; ความยาวของ 1 บิต = ความเร็วสัญญาณ &times; bit time (สัญญาณใน copper/fibre &asymp; 2&times;10<sup>8</sup> m/s)</li>
<li><b>d<sub>trans</sub> = L / R</b> (ดันทั้ง frame ลงสาย; link เร็วขึ้นช่วยได้) &nbsp; <b>d<sub>prop</sub> = d / s</b> (บิตวิ่งตามความยาวสาย; ไม่ขึ้นกับ link rate)</li>
<li>Impairments 3 อย่าง: <b>attenuation</b> (อ่อนลงตามระยะ), <b>noise</b> (พลังงานที่ไม่ต้องการ), <b>distortion</b> (ขอบสัญญาณเบลอ &rarr; ISI)</li>
<li><b>dB = 10 log<sub>10</sub>(P_in / P_out)</b>; 3 dB = ครึ่งหนึ่ง, 10 dB = 1/10, 20 dB = 1/100, 30 dB = 1/1000; ค่า dB <b>บวกกันได้</b></li>
<li>ผู้รับต้องมี clock; ลำดับบิตเหมือนกันยาวๆ (long run) ทำให้ clock drift &rarr; ต้องมี self-clocking / clock แยก</li>
</ul>
<table>
<tr><th>Code</th><th>กติกา</th><th>จุดแข็ง</th><th>จุดอ่อน / ราคา</th></tr>
<tr><td>NRZ</td><td>1=high, 0=low</td><td>≤1 change/bit</td><td>run ของ 0 หรือ 1 ไม่มี edge, baseline wander</td></tr>
<tr><td>NRZI</td><td>1 = เปลี่ยนระดับ, 0 = คงเดิม</td><td>run ของ 1 ดี, สลับสายยังถอดได้</td><td>run ของ 0 ยังไม่มี edge</td></tr>
<tr><td>Manchester</td><td>802.3: 0 = high&rarr;low, 1 = low&rarr;high กลาง bit</td><td>เปลี่ยนทุก bit, balanced</td><td>ใช้ bandwidth ~2 เท่า (overhead 100%)</td></tr>
<tr><td>4B5B</td><td>4 bit &rarr; 5 bit (16 จาก 32 code) ส่งด้วย NRZI</td><td>≥ 1 ตัวเลข 1 ทุก 4 บิต, มี J/K/T/R/I</td><td>overhead 25% (100 Mbps = 125 Msym/s)</td></tr>
</table>
<ul>
<li>4B5B: I=11111 (idle), J=11000, K=10001 (start), T=01101, R=00111 (end); J K ไม่มีทางเกิดในข้อมูล &rarr; ไม่ต้อง stuffing</li>
<li>Overhead ไล่ลง: Manchester 100% &rarr; 4B5B 25% &rarr; 64b/66b ~3%; 100BASE-TX = 125 MHz &times; 0.8 b/sym = 100 Mbps</li>
<li>สื่อ: twisted pair (twist = ตัด noise, ต่าง twist rate = ลด crosstalk, 100 m), coax, fibre (total internal reflection; multimode vs single-mode), radio, satellite (GEO 239 ms, LEO ~4 ms)</li>
<li>Bandwidth (Hz) &ne; data rate (bit/s) &mdash; เป็นคนละความหมาย</li>
<li><b>Nyquist (noiseless):</b> symbol rate &le; 2B; <b>C = 2B log<sub>2</sub> M</b></li>
<li><b>Shannon (noisy):</b> <b>C = B log<sub>2</sub>(1 + S/N)</b>, S/N = 10<sup>(dB/10)</sup> (30 dB = 1000, 20 dB = 100, 25 dB &asymp; 316); ไม่มีเทอม M; ถ้ามีทั้งคู่ ใช้ค่าที่น้อยกว่า</li>
<li>ตัวอย่างเลข: B=3100, 30 dB &rarr; ~30.9 kbit/s; 1 MHz, 20 dB &rarr; 6.66 Mbit/s; 80 MHz, 25 dB &rarr; ~665 Mbit/s</li>
</ul>`,
  sections: [
    {
      t: "Layer 1 ทำอะไร และ bit กลายเป็นอะไร",
      html: `
<p>Layer 1 (Physical) คือ &quot;ถนน&quot; ของ parcel story: แปลงบิตให้เป็นสัญญาณกายภาพ ส่งทีละบิตต่อกัน กำหนดว่า 1 บิตยาวเท่าไร และกำหนดสาย ขั้วต่อ แรงดัน แสง หรือคลื่นวิทยุ ส่วนสิ่งที่ Layer 1 <b>ไม่ทำ</b> คือ ไม่รู้จัก frame/MAC/IP, ไม่ตรวจ error (นั่นคือ CRC ใน L2), ไม่ตัดสินว่าใครส่งได้ (นั่นคือ MAC protocol) และไม่สนใจความหมายของบิต</p>
<p>คำถามเดียวของ L1: ผู้ส่งใส่ 1 ลงสาย ผู้รับจะอ่านเป็น 1 <i>ที่จังหวะที่ถูก</i> ได้มั่นใจแค่ไหน และไปได้เร็วเท่าไร</p>
<table>
<tr><th>สื่อ</th><th>บิตกลายเป็น</th><th>ข้อดี</th><th>ข้อเสีย</th></tr>
<tr><td>Copper</td><td>แรงดันไฟฟ้า</td><td>ถูก ต่อง่าย</td><td>สัญญาณอ่อนตามระยะ รับ noise ง่าย</td></tr>
<tr><td>Glass fibre</td><td>แสง เปิด/ปิด หรือสว่าง/หรี่</td><td>ไกล เร็ว ไม่โดน noise ไฟฟ้า</td><td>เปราะ ปลายสายราคาแพง/ต้องใช้ทักษะ</td></tr>
<tr><td>Air</td><td>คลื่นวิทยุ (เปลี่ยนความแรง ความถี่ หรือจังหวะ)</td><td>ไม่ต้องมีสาย</td><td>ใช้ร่วมกับทุกคน ยุ่งเหยิง</td></tr>
</table>
<p>ข้อความเดียวอาจใช้ครบทั้งสามสื่อ: วิทยุไปที่ AP &rarr; copper ไป switch &rarr; fibre ระหว่างตึก</p>
<p>สัญญาณมี 2 แบบ: <b>digital</b> (ระดับคงที่ไม่กี่ระดับ กระโดดชัน) และ <b>analog</b> (เปลี่ยนต่อเนื่องราบรื่น) ส่งบิตได้ 2 แนวทาง: <b>line coding</b> (ส่งเป็นระดับตรงๆ บนสาย copper ระยะสั้น) กับ <b>modulation</b> (ขี่บน carrier wave สำหรับวิทยุ/สายไกล)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>L1 = voltage / light / radio, ไม่มีความรู้เรื่อง frame, MAC, IP, error check</li>
<li>Line coding &rarr; copper ระยะสั้น; Modulation &rarr; วิทยุ / สายยาว</li>
</ul></div>`
    },
    {
      t: "Bit time, ความยาวของบิต และ \"100 Mbps\" มาจากไหน",
      html: `
<p><b>Bit time = 1 / bit rate</b> และเพราะสัญญาณเดินทางด้วยความเร็ว s &asymp; 2&times;10<sup>8</sup> m/s (สองในสามของแสงในสุญญากาศ) บิตหนึ่งจึงมี <b>ความยาวทางกายภาพ</b> = s &times; bit time</p>
<table>
<tr><th>Bit rate</th><th>Bit time</th><th>ความยาว 1 bit</th><th>bit ในสาย 100 m</th></tr>
<tr><td>10 Mbps</td><td>100 ns</td><td>20 m</td><td>5</td></tr>
<tr><td>100 Mbps</td><td>10 ns</td><td>2 m</td><td>50</td></tr>
<tr><td>1 Gbps</td><td>1 ns</td><td>20 cm</td><td>500</td></tr>
<tr><td>10 Gbps</td><td>0.1 ns</td><td>2 cm</td><td>5,000</td></tr>
</table>
<p>ตัวอย่างคำนวณ: 10 Mbps &rarr; bit time = 1/10&times;10<sup>6</sup> = 100 ns; ความยาว = 2&times;10<sup>8</sup> &times; 100&times;10<sup>-9</sup> = 20 m. frame ขั้นต่ำ 64 B = 512 bit &rarr; 512 &times; 20 m = 10.24 km ยาวพอให้ collision วิ่งกลับมาถึงผู้ส่งก่อนส่งเสร็จ</p>
<p><b>&quot;100 Mbps&quot; ไม่ใช่คุณสมบัติของสาย</b> แต่เป็นอัตราสัญญาณของ crystal oscillator บน NIC: 100BASE-TX ใช้ crystal 125 MHz &rarr; 125 M symbols/s &times; 0.8 bit/symbol (4B5B) = 100 Mbps. Quartz ไปได้สูงสุดราว 40 MHz (fundamental) / ~200 MHz (overtone) ดังนั้นความเร็วสูงกว่านั้นใช้ <b>PLL</b>: crystal กำหนด <i>ความแม่นยำ</i> (&plusmn;50 ppm) ส่วน PLL กำหนด <i>ความถี่</i></p>
<p>สูตรรวม: <b>lanes &times; symbol rate &times; bits/symbol = link rate</b></p>
<table>
<tr><th>Standard</th><th>Cable</th><th>B</th><th>Lanes</th><th>Symbol rate</th><th>bits/symbol</th><th>Rate</th></tr>
<tr><td>10BASE-T</td><td>Cat3</td><td>16 MHz</td><td>1</td><td>20 MBd</td><td>0.5 (Manchester)</td><td>10 Mbps</td></tr>
<tr><td>100BASE-TX</td><td>Cat5</td><td>100 MHz</td><td>1</td><td>125 MBd</td><td>0.8 (4B5B, MLT-3)</td><td>100 Mbps</td></tr>
<tr><td>1000BASE-T</td><td>Cat5e</td><td>100 MHz</td><td>4</td><td>125 MBd</td><td>2 (PAM-5)</td><td>1 Gbps</td></tr>
<tr><td>10GBASE-T</td><td>Cat6a</td><td>500 MHz</td><td>4</td><td>800 MBd</td><td>3.125 (PAM-16)</td><td>10 Gbps</td></tr>
</table>
<p>จุดสำคัญคือแถว 3: 1000BASE-T ใช้ bandwidth 100 MHz เท่า 100BASE-TX แต่เร็วขึ้น 10 เท่า เพราะใช้ครบ 4 คู่ และบรรจุ 2 bit ต่อ symbol (4 &times; 125 &times; 2 = 1000)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ความยาว 1 bit = s &times; bit time (10 Mbps = 20 m, 1 Gbps = 20 cm)</li>
<li>100BASE-TX: 125 MHz &times; 0.8 = 100 Mbps; 1000BASE-T: 4 &times; 125 MBd &times; 2 = 1 Gbps</li>
</ul></div>`
    },
    {
      t: "Transmission delay กับ Propagation delay",
      html: `
<p>เปรียบเทียบ: <b>transmission delay</b> = ขนของขึ้นรถที่ท่า, <b>propagation delay</b> = ขับรถไปเมืองถัดไป</p>
<table>
<tr><th></th><th>Transmission</th><th>Propagation</th></tr>
<tr><td>สูตร</td><td>d<sub>trans</sub> = L / R</td><td>d<sub>prop</sub> = d / s</td></tr>
<tr><td>ความหมาย</td><td>เวลาดันทั้ง frame ลงสาย (L = bit, R = bit/s)</td><td>เวลาที่บิตเดินทางตลอดความยาวลิงก์ (d = เมตร, s &asymp; 2&times;10<sup>8</sup> m/s)</td></tr>
<tr><td>อัปเกรด link?</td><td>เร็วขึ้น &rarr; ลดลง</td><td>ไม่เปลี่ยน (ขึ้นกับระยะเท่านั้น)</td></tr>
</table>
<p>เวลาที่ frame มาถึงครบ = L/R + d/s (บิตสุดท้ายออกหลัง L/R แล้วยังต้องเดินทางอีก d/s)</p>
<h4>ตัวอย่างคำนวณ (frame 1500 B = 12,000 bit)</h4>
<table>
<tr><th>กรณี</th><th>L/R</th><th>d/s</th><th>ตัวที่ครอง</th></tr>
<tr><td>1 Gbps, สาย 100 m</td><td>12 &mu;s</td><td>0.5 &mu;s</td><td>transmission</td></tr>
<tr><td>1 Gbps, fibre กรุงเทพ&ndash;เชียงใหม่ 700 km</td><td>12 &mu;s</td><td>3.5 ms</td><td>propagation (~300 เท่า)</td></tr>
<tr><td>10 Gbps, 700 km</td><td>1.2 &mu;s</td><td>3.5 ms</td><td>propagation</td></tr>
<tr><td>64 B (512 bit), 50 Mbps, ดาวเทียม GEO ~72,000 km ขึ้น+ลง</td><td>10.24 &mu;s</td><td>~240 ms</td><td>propagation</td></tr>
<tr><td>ไฟล์ 1 GB (8&times;10<sup>9</sup> bit), 100 Mbps, 100 m</td><td>80 s</td><td>0.5 &mu;s</td><td>transmission</td></tr>
</table>
<p>เส้นตัดสิน: link ช้า/ข้อมูลใหญ่ &rarr; transmission ครอง; link เร็ว/ระยะไกล/ข้อมูลเล็ก &rarr; propagation ครอง. ดาวเทียม GEO สูง 35,786 km (ขึ้น+ลง 71,572 km / 3&times;10<sup>8</sup> &asymp; 239 ms), LEO ~550 km (~4 ms) ซึ่ง &quot;อัปเกรดหนีไม่ได้ ทำได้แค่ขยับเข้าใกล้&quot;</p>
<div class="warn"><b>⚠️ ระวัง</b> &quot;link เร็วขึ้นลด delay ทั้งหมด&quot; ผิด &mdash; ลดเฉพาะ L/R; propagation delay d/s ไม่สน link rate</div>`
    },
    {
      t: "Attenuation, Noise, Distortion และ decibel",
      html: `
<p>สัญญาณทุกชนิดถูกทำลาย 3 แบบ: <b>attenuation</b> (อ่อนลงตามระยะ: copper &rarr; ความร้อน, glass &rarr; scattering, air &rarr; กระจาย), <b>noise</b> (พลังงานที่เพิ่มเข้ามา: สายอื่น มอเตอร์ วิทยุ และการเคลื่อนที่ของอิเล็กตรอนแบบสุ่ม), <b>distortion</b> (ขอบสัญญาณเบลอ บิตข้างเคียงซึมเข้าหากัน = intersymbol interference)</p>
<p>ผู้รับเทียบแต่ละบิตกับ threshold กลางบิต; noise spike ดัน 0 ข้าม threshold ได้ = bit error (CRC เป็นคนจับ) แก้โดยเพิ่ม SNR หรือกัน noise ออก</p>
<h4>Decibel</h4>
<p><b>dB = 10 log<sub>10</sub>(P_in / P_out)</b> เริ่มจาก 1000 mW:</p>
<table>
<tr><th>Loss</th><th>เหลือ</th><th>เศษส่วน</th></tr>
<tr><td>3 dB</td><td>500 mW</td><td>ครึ่ง</td></tr>
<tr><td>10 dB</td><td>100 mW</td><td>1/10</td></tr>
<tr><td>20 dB</td><td>10 mW</td><td>1/100</td></tr>
<tr><td>30 dB</td><td>1 mW</td><td>1/1000</td></tr>
</table>
<p>คุณสมบัติสำคัญ: ค่า dB <b>บวกกัน</b> (ไม่ต้องคูณ): cable 10 dB + connector 3 dB = 13 dB (&asymp; 1/20). Wi-Fi ผ่านกำแพง 2 ชั้น ชั้นละ 10 dB = 20 dB = เหลือ 1/100. Free-space: ระยะเพิ่ม 2 เท่า กำลังเหลือ 1/4 = สูญเพิ่ม 6 dB</p>
<h4>ทำไม fibre ไปกลางตึก, copper เข้าโต๊ะ</h4>
<p>Cat6 ที่ 100 MHz สูญ 20 dB ใน 100 m (เหลือ ~1%); single-mode fibre สูญ 0.2 dB/km &rarr; 20 dB ที่ 100 km (ไกลกว่า 1000 เท่าด้วยการสูญเท่ากัน). และ copper สูญมากขึ้นเมื่อความถี่สูงขึ้น &mdash; สายที่เร็วกว่าต้องเกรดดีกว่า</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>3 dB = 1/2, 10 dB = 1/10, 20 dB = 1/100, 30 dB = 1/1000; dB บวกกันได้</li>
<li>Fibre 0.2 dB/km เทียบ copper 20 dB/100 m</li>
</ul></div>`
    },
    {
      t: "ปัญหา clock และ Line coding (NRZ, NRZI, Manchester)",
      html: `
<p>ผู้รับ sample 1 ครั้งต่อบิต จึงต้องเดินนาฬิกาเท่ากับผู้ส่ง ทุกครั้งที่สัญญาณเปลี่ยน ผู้รับปรับนาฬิกาได้; ถ้าส่ง 1 0000 0000 1 (0 แปดตัว) แต่ clock เพี้ยน อ่านได้ 0 เจ็ดตัว <b>long run ของบิตเหมือนกันคือศัตรู</b> เช่นเดียวกัน ปัญหาที่ 2: <b>baseline wander</b> &mdash; ผู้รับเทียบกับค่าเฉลี่ยล่าสุด ซึ่งไหลไปตามระดับคงที่ จนบิต 1 ที่ดีดูเหมือน 0 (และ transformer ของพอร์ต Ethernet ส่งระดับที่ไม่เปลี่ยนไม่ได้)</p>
<p>วิธีแก้ clock มี 2 ทาง: <b>สาย clock แยก</b> (ทำงานดี แต่เปลืองสายและเกิด skew เมื่อไกล) หรือ <b>self-clocking</b> (สัญญาณเปลี่ยนบ่อยพอที่จะ steer clock; สายเดียวพกทั้งข้อมูลและเวลา)</p>
<p>Line code ที่ดี: (1) เปลี่ยนมากพอ (2) balanced / DC-free (3) มีประสิทธิภาพ (4) มี pattern สำรอง; ไม่มี code ใดชนะครบ</p>
<h4>เทียบ 3 code (บิต 0 1 0 0 0 0 1 1)</h4>
<div class="dg"><div class="dgt">🖼️ รูปคลื่น NRZ / NRZI / Manchester</div>
<svg viewBox="0 0 420 330" xmlns="http://www.w3.org/2000/svg">
<text class="t b" x="10" y="14">bits</text>
<text class="t sm" x="52" y="14">0</text><text class="t sm" x="92" y="14">1</text><text class="t sm" x="132" y="14">0</text><text class="t sm" x="172" y="14">0</text><text class="t sm" x="212" y="14">0</text><text class="t sm" x="252" y="14">0</text><text class="t sm" x="292" y="14">1</text><text class="t sm" x="332" y="14">1</text>
<text class="t b" x="10" y="45">NRZ</text>
<path class="ln ok" fill="none" d="M40 100 H80 V60 H120 V100 H280 V60 H360"/>
<text class="t b" x="10" y="140">NRZI (เริ่ม low)</text>
<path class="ln ok" fill="none" d="M40 205 H80 V165 H280 V205 H320 V165 H360"/>
<text class="t b" x="10" y="245">Manchester (0 = H&rarr;L, 1 = L&rarr;H)</text>
<path class="ln ok" fill="none" d="M40 265 H60 V305 H100 V265 H140 V305 H160 V265 H180 V305 H200 V265 H220 V305 H240 V265 H260 V305 H300 V265 H320 V305 H340 V265 H360"/>
<text class="t sm" x="10" y="325">NRZ: ช่วง 0000 ไม่มี edge &nbsp; NRZI: ช่วง 0000 คงระดับ &nbsp; Manchester: edge ทุก bit</text>
</svg></div>
<table>
<tr><th>Code</th><th>กติกา</th><th>ดี</th><th>เสีย</th></tr>
<tr><td>NRZ</td><td>1 = high, 0 = low ตลอด bit</td><td>เปลี่ยน ≤ 1 ครั้ง/bit (ประหยัดสุด)</td><td>run ของ 0 หรือ 1 ไม่มี edge</td></tr>
<tr><td>NRZI</td><td>1 = เปลี่ยนระดับต้น bit, 0 = คงเดิม</td><td>run ของ 1 มี edge; ไม่สนขั้วสาย</td><td>run ของ 0 ยังไม่มี edge</td></tr>
<tr><td>Manchester</td><td>802.3: 0 = high&rarr;low, 1 = low&rarr;high ที่กลางบิต</td><td>เปลี่ยนทุก bit, balanced</td><td>เปลี่ยนได้ถึง 2 ครั้ง/bit &rarr; bandwidth ~2 เท่า (10 Mbps ใช้ 20 MBd)</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> ความผิดพลาดที่พบบ่อย: NRZI เปลี่ยนที่ 0 แทนที่ 1; Manchester ลืม edge ที่รอยต่อระหว่าง 2 บิตที่เท่ากัน; textbook บางเล่มใช้ convention กลับกัน ให้ระบุที่ใช้</div>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>NRZI: 1 = เปลี่ยน, 0 = คงเดิม &mdash; ยังเสียกับ run ของ 0</li>
<li>Manchester: เปลี่ยนกลางทุกบิต แต่ต้องใช้ bandwidth ~2 เท่า</li>
</ul></div>`
    },
    {
      t: "4B5B และ line code ใน Ethernet จริง",
      html: `
<p>ถามว่า &quot;จะรับประกันว่ามี edge ได้ไหม โดยไม่จ่ายแพงเท่า 100%&quot; คำตอบ: <b>4B5B</b> (มาจาก FDDI; MLT-3 มาจาก FDDI copper ANSI X3.263) แทนทุก 4 บิตด้วย 5 บิตที่เลือกไว้ (16 จาก 32)</p>
<table>
<tr><th>Data</th><th>Code</th><th>Data</th><th>Code</th></tr>
<tr><td>0000</td><td>11110</td><td>1000</td><td>10010</td></tr>
<tr><td>0001</td><td>01001</td><td>1001</td><td>10011</td></tr>
<tr><td>0010</td><td>10100</td><td>1010</td><td>10110</td></tr>
<tr><td>0011</td><td>10101</td><td>1011</td><td>10111</td></tr>
<tr><td>0100</td><td>01010</td><td>1100</td><td>11010</td></tr>
<tr><td>0101</td><td>01011</td><td>1101</td><td>11011</td></tr>
<tr><td>0110</td><td>01110</td><td>1110</td><td>11100</td></tr>
<tr><td>0111</td><td>01111</td><td>1111</td><td>11101</td></tr>
</table>
<p>เกณฑ์เลือก: ไม่มี code ใดขึ้นต้นด้วย 0 มากกว่า 1 ตัว และไม่ลงท้ายด้วย 0 เกิน 2 ตัว &rarr; ที่รอยต่อไม่เกิน <b>0 สามตัวติดกัน</b>; ส่งด้วย NRZI ซึ่งเปลี่ยนทุกครั้งที่เป็น 1 &rarr; มี 1 อย่างน้อยทุก 4 บิต clock ไม่อด; ราคาคือ 5 บิตต่อ 4 = <b>25%</b> (100 Mbps จึงต้องส่ง 125 Msym/s)</p>
<h4>16 code ที่เหลือมีหน้าที่ (ไม่มีทางอยู่ในข้อมูล)</h4>
<table>
<tr><th>ชื่อ</th><th>Code</th><th>ความหมาย</th></tr>
<tr><td>I</td><td>11111</td><td>idle ส่งต่อเนื่องระหว่าง frame</td></tr>
<tr><td>J K</td><td>11000 10001</td><td>เริ่ม frame</td></tr>
<tr><td>T R</td><td>01101 00111</td><td>จบ frame</td></tr>
<tr><td>อื่นๆ</td><td>-</td><td>ไม่ถูกต้อง &rarr; error</td></tr>
</table>
<p>นี่คือ &quot;flag ที่ไม่ต้อง stuffing&quot; เพราะอยู่นอก alphabet ของข้อมูล (ต่างจาก byte/bit stuffing ของ L2). ทำไมต้อง J K ไม่ใช่แค่ J: ก่อนเจอ frame ผู้รับอ่าน <i>บิต</i> ไม่ใช่ symbol 11000 ปรากฏเหลื่อม 1 bit ในข้อมูลธรรมดาได้ (เช่น 11100|01001) ส่วน J K ยาว 10 บิต = 1 byte slot (8 data bit &rarr; 10 line bit) จึงอยู่บนกริด byte</p>
<h4>ตัวอย่างฝึก</h4>
<ul>
<li>Encode 0011 1010 &rarr; 10101 10110</li>
<li>Decode 11110 11101 &rarr; 0000 1111</li>
<li>11000 10001 &rarr; J K = เริ่ม frame</li>
</ul>
<table>
<tr><th>Standard</th><th>Line code</th><th>ส่วนเพิ่ม</th></tr>
<tr><td>10BASE5 / 10BASE-T (1983/1990)</td><td>Manchester</td><td>100%</td></tr>
<tr><td>100BASE-TX (1995)</td><td>4B5B + MLT-3 (3 ระดับ ลดความถี่)</td><td>25%</td></tr>
<tr><td>1000BASE-X fibre (1998)</td><td>8b/10b</td><td>25%</td></tr>
<tr><td>1000BASE-T (1999)</td><td>PAM-5 บน 4 คู่ (หลาย bit/symbol, สองทิศพร้อมกัน)</td><td>-</td></tr>
<tr><td>10GBASE-R (2002)</td><td>64b/66b (header 2 bit ต่อ 64)</td><td>~3%</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Manchester 100% &rarr; 4B5B 25% &rarr; 64b/66b ~3%</li>
<li>J = 11000, K = 10001 (เริ่ม); T = 01101, R = 00111 (จบ); I = 11111 (idle)</li>
</ul></div>`
    },
    {
      t: "สื่อกลางส่งข้อมูล (Guided / Unguided)",
      html: `
<p><b>Guided:</b> twisted pair, coaxial, optical fibre (สัญญาณวิ่งตามสาย เป็นส่วนตัว คาดเดาได้). <b>Unguided:</b> terrestrial radio, satellite (กระจายในอากาศ ใช้ร่วมกันทุกคน &mdash; จึงต้องมี CSMA/CA)</p>
<h4>Twisted pair</h4>
<ul>
<li>8 เส้นเป็น 4 คู่ (ส้ม เขียว น้ำเงิน น้ำตาล แต่ละคู่มีเส้นลายขาว); UTP (ตามผนังทั่วไป) / STP-FTP (มีฟอยล์ ใช้ใกล้ noise แรง เช่นโรงงาน)</li>
<li><b>ทำไมต้องบิด:</b> differential signalling &mdash; สาย A = S + n, สาย B = &minus;S + n, ผู้รับคิด A &minus; B = 2S; noise n (ซึ่งเข้ามาเท่ากันทั้งสองเส้นเพราะการบิดสลับตำแหน่ง) ตัดกัน สัญญาณเป็น 2 เท่า</li>
<li>แต่ละคู่บิด <b>ต่างอัตรากัน</b> เพื่อไม่ให้ crosstalk (สัญญาณรั่วระหว่างคู่) สะสม</li>
<li>ทุกมาตรฐาน copper Ethernet หยุดที่ ~100 m (attenuation + noise)</li>
</ul>
<table>
<tr><th>Category</th><th>Built for</th><th>Speed</th><th>ระยะ</th></tr>
<tr><td>Cat5e</td><td>100 MHz</td><td>1 Gbps</td><td>100 m</td></tr>
<tr><td>Cat6</td><td>250 MHz</td><td>1 Gbps (10 Gbps ถึง 55 m)</td><td>100 m</td></tr>
<tr><td>Cat6A</td><td>500 MHz</td><td>10 Gbps</td><td>100 m</td></tr>
<tr><td>Cat8</td><td>2000 MHz</td><td>25 / 40 Gbps</td><td>30 m</td></tr>
</table>
<p>ตัวเลขสำคัญของสายคือ <i>ความถี่สูงสุด</i> ที่ออกแบบไว้ (Hz = B). RJ45: T568A กับ T568B สลับกันเฉพาะคู่ส้ม/เขียว; straight-through = ปลายสองข้างใช้มาตรฐานเดียวกัน (PC&ndash;switch), crossover = A กับ B (PC&ndash;PC); Auto-MDI-X ใน port ปัจจุบันแก้เอง; 10/100 Mbps ใช้ pin 1, 2, 3, 6 ส่วน Gigabit ใช้ทั้ง 8 pin</p>
<h4>Coax และ Fibre</h4>
<ul>
<li><b>Coax:</b> ตัวนำกลาง + shield ล้อมรอบ &rarr; ต้านสัญญาณรบกวนดี; ใช้ใน cable TV, CCTV; 10BASE5 = bus เหลืองหนา 500 m/segment</li>
<li><b>Fibre:</b> <b>total internal reflection</b> ที่ขอบ core&ndash;cladding เก็บแสงไว้ในแกนแม้โค้งเบาๆ; โค้งแหลมเกิน (เกิน minimum bend radius) แสงหลุดเข้า cladding</li>
<li>Multimode: core 50/62.5 &mu;m, LED/VCSEL 850 nm, 10 Gbps ~300&ndash;400 m, หลายเส้นทาง &rarr; pulse เบลอ (jacket aqua/orange). Single-mode: core ~9 &mu;m, laser 1310/1550 nm, 10 Gbps 10&ndash;40 km+, เส้นทางเดียว (jacket เหลือง)</li>
<li>&quot;อะไรหมด&quot; ใน fibre ไม่ใช่แสงหาย แต่ pulse กางเข้าช่อง bit ถัดไป = intersymbol interference; copper ก็เกิดเหมือนกันแต่เพราะสายตัดความถี่สูง</li>
<li>Fibre ชนะ: loss ต่ำ, ความจุมหาศาล, ไม่โดน noise ไฟฟ้า, ไม่มีไฟฟ้าไหลระหว่างตึก; เสีย: เปราะ, ต้องใช้ทักษะ terminate, optics แพงกว่า port copper</li>
</ul>
<h4>วิทยุและดาวเทียม</h4>
<p>วิทยุ broadcast โดยธรรมชาติ ใช้ร่วมกับทุกอย่าง (AP เพื่อนบ้าน, Bluetooth, microwave 2.4 GHz); ผลกระทบของอากาศ: path loss (ระยะ 2 เท่า = 6 dB), multipath, สิ่งกีดขวาง (คอนกรีต &ge; 10 dB), interference. Wi-Fi 2.4 GHz ไกลสุดแต่มีแค่ 3 channel (1, 6, 11); 5/6 GHz channel มากกว่า ช่วงสั้นกว่า. GEO 35,786 km (239 ms ทางเดียว), LEO ~550 km (~4 ms)</p>
<div class="note"><b>💡 หมายเหตุ</b> เลือกสื่อให้ตอบ scenario: ระยะไกลแค่ไหน, สภาพ noise, ต้องเคลื่อนที่ไหม, ค่าใช้จ่ายระยะยาว &mdash; fibre ไม่ได้ &quot;ดีกว่า&quot; copper เสมอ (ตึกสองหลังห่าง 800 m &rarr; single-mode fibre; เครื่องพิมพ์ในห้อง &rarr; twisted pair; งานกลางแจ้งไม่มีสาย &rarr; radio)</div>`
    },
    {
      t: "Bandwidth, Nyquist และ Shannon",
      html: `
<p>&quot;Bandwidth&quot; มี 2 ความหมาย ห้ามปน: (1) <b>ช่วงความถี่ (Hz)</b> ของช่องสัญญาณ &mdash; เช่น สายโทรศัพท์ ~3,100 Hz, Wi-Fi 20/40/80/160 MHz, Cat6 250 MHz (2) ในภาษาพูด = <b>data rate (bit/s)</b> ที่ ISP ขาย (ที่จริงคือ throughput). คลื่นสี่เหลี่ยมต้องใช้ harmonic ไม่จำกัด ช่องผ่านได้ไม่หมด ขอบจึงมน ยิ่งเร็วบิตข้างเคียงยิ่งซึม</p>
<h4>Nyquist (ช่องสมบูรณ์แบบ ไม่มี noise)</h4>
<p>symbol rate สูงสุด = <b>2B</b> symbols/s; ถ้าสัญญาณมี M ระดับ แต่ละ symbol พก log<sub>2</sub> M บิต:</p>
<p><b>C = 2B &times; log<sub>2</sub> M</b> bit/s</p>
<p>ตัวอย่าง B = 3,100 Hz: M=2 &rarr; 6,200; M=4 &rarr; 12,400; M=16 &rarr; 24,800; M=256 &rarr; 49,600; M=1,048,576 (20 bit) &rarr; 124,000 bit/s (ไร้สาระในความเป็นจริง เพราะ Nyquist ไม่มีเทอม noise). &quot;mega&quot; มาจาก symbol rate (2B ที่มี &quot;ต่อวินาที&quot;) ไม่ใช่ M ซึ่งเป็นแค่ตัวคูณ (B=100 MHz, M=2 &rarr; 200 Msym/s &times; 1 = 200 Mbps)</p>
<p>เพิ่ม M เป็น 2 เท่าได้ 1 bit/symbol เพิ่ม แต่ระดับใกล้กันขึ้น และต้อง SNR เพิ่ม ~6 dB</p>
<h4>SNR และกับดัก dB</h4>
<p>S/N เป็นอัตราส่วนล้วนๆ แต่ใช้เป็น dB: SNR(dB) = 10 log<sub>10</sub>(S/N) &rarr; ก่อนใช้ Shannon ต้องแปลงกลับ: <b>S/N = 10<sup>(dB/10)</sup></b></p>
<table>
<tr><th>dB</th><th>3</th><th>10</th><th>20</th><th>25</th><th>30</th><th>40</th></tr>
<tr><th>S/N</th><td>2</td><td>10</td><td>100</td><td>~316</td><td>1,000</td><td>10,000</td></tr>
</table>
<h4>Shannon (ช่องจริง มี noise)</h4>
<p><b>C = B &times; log<sub>2</sub>(1 + S/N)</b> &mdash; ขีดสูงสุดที่ส่งไม่มี error; ไม่มี M (ไม่สนว่า encoding ฉลาดแค่ไหน). เพิ่ม B 2 เท่า &rarr; C 2 เท่า; เพิ่มกำลังส่ง 2 เท่า &rarr; ได้เพิ่มราว 1 bit/symbol เท่านั้น (อยู่ใน log). ไม่มีเทคโนโลยีใดทะลุได้</p>
<h4>ตัวอย่างคำนวณ</h4>
<ol>
<li><b>B = 3,100 Hz, 30 dB:</b> S/N = 10<sup>3</sup> = 1000; C = 3100 &times; log<sub>2</sub>(1001) &asymp; 3100 &times; 9.97 &asymp; <b>30,900 bit/s</b>. ย้อนด้วย Nyquist: 30,900 = 2 &times; 3100 &times; log<sub>2</sub> M &rarr; log<sub>2</sub> M &asymp; 4.98 &rarr; ~32 ระดับ (จึงเป็นเหตุที่ modem 33.6k เป็นขีดสุด)</li>
<li><b>B = 1 MHz, 20 dB:</b> S/N = 100; C = 10<sup>6</sup> &times; log<sub>2</sub>(101) &asymp; 10<sup>6</sup> &times; 6.66 = <b>6.66 Mbit/s</b></li>
<li><b>Noiseless 4 kHz, M = 8:</b> log<sub>2</sub> 8 = 3; C = 2 &times; 4000 &times; 3 = <b>24 kbit/s</b></li>
<li><b>Wi-Fi 80 MHz, 25 dB, 1 stream:</b> S/N &asymp; 316; C = 80&times;10<sup>6</sup> &times; log<sub>2</sub>(317) &asymp; 80&times;10<sup>6</sup> &times; 8.31 &asymp; <b>665 Mbit/s</b>; 2 stream &asymp; 1.3 Gbit/s (นี่คือที่มาของตัวเลขบนกล่อง Wi-Fi)</li>
</ol>
<p>ถ้าเครื่องคิดเลขไม่มี log<sub>2</sub>: log<sub>2</sub> x = log<sub>10</sub> x / 0.301</p>
<table>
<tr><th></th><th>Nyquist</th><th>Shannon</th></tr>
<tr><td>สมมติ</td><td>ช่องไม่มี noise</td><td>ช่องมี noise</td></tr>
<tr><td>สูตร</td><td>C = 2B log<sub>2</sub> M</td><td>C = B log<sub>2</sub>(1 + S/N)</td></tr>
<tr><td>ต้องให้</td><td>B และ M</td><td>B และ SNR (มักเป็น dB)</td></tr>
<tr><td>คำใบ้</td><td>&quot;noiseless&quot;, &quot;levels&quot;</td><td>&quot;SNR&quot;, &quot;dB&quot;, &quot;noisy&quot;, &quot;capacity&quot;</td></tr>
<tr><td>เป็น</td><td>คำตอบเชิงวิศวกรรม (encoding ที่เลือก)</td><td>upper bound ของช่อง</td></tr>
</table>
<p>ถ้าโจทย์ให้ทั้ง M และ SNR ให้คำนวณทั้งสองสูตรแล้วใช้ <b>ค่าที่น้อยกว่า</b></p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Nyquist: C = 2B log<sub>2</sub> M (noiseless)</li>
<li>Shannon: C = B log<sub>2</sub>(1 + S/N), S/N = 10<sup>(dB/10)</sup> &mdash; แปลง dB ก่อนเสมอ</li>
<li>ให้ทั้งสองสูตร &rarr; ตอบค่าที่น้อยกว่า</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ใส่ 30 ลง Shannon ตรงๆ แทน 1,000 &mdash; ถ้าคำตอบเล็กเกินจริง นี่คือสาเหตุเกือบทุกครั้ง; และ bandwidth (Hz) &ne; speed (bit/s)</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: "ส่ง frame ขนาด 1500 byte ผ่าน fibre ความเร็ว 10 Gbps จากกรุงเทพไปเชียงใหม่ ระยะ 700 km (ความเร็วสัญญาณ 2&times;10<sup>8</sup> m/s)",
      q: "ค่า transmission delay / propagation delay เป็นเท่าใด และตัวไหนครอง?",
      opts: [
        { t: "12 &mu;s / 3.5 ms &mdash; propagation ครอง", why: "12 &mu;s คือค่าที่ 1 Gbps ไม่ใช่ 10 Gbps; 10 Gbps ได้ 12,000/10<sup>10</sup> = 1.2 &mu;s" },
        { t: "1.2 &mu;s / 3.5 ms &mdash; propagation ครอง", why: "ถูก: L/R = 12,000/10<sup>10</sup> = 1.2 &mu;s; d/s = 700,000/2&times;10<sup>8</sup> = 3.5 ms; propagation มากกว่า ~3,000 เท่า" },
        { t: "1.2 &mu;s / 3.5 &mu;s &mdash; transmission ครอง", why: "คำนวณ propagation ผิดหน่วย: 700 km / 2&times;10<sup>8</sup> m/s = 3.5 ms ไม่ใช่ &mu;s" },
        { t: "1.2 ms / 3.5 ms &mdash; ใกล้เคียงกัน", why: "ลืมว่า 1500 B = 12,000 bit และ 10 Gbps เร็วมาก; transmission คือ 1.2 &mu;s ไม่ใช่ ms" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "สัญญาณ Wi-Fi ที่ AP ส่งออกมา 100 mW ต้องทะลุกำแพงสองชั้น ชั้นละ 10 dB (ข้ามเรื่อง path loss ในอากาศ)",
      q: "กำลังที่ผู้รับได้รับประมาณเท่าใด?",
      opts: [
        { t: "50 mW", why: "50 mW คือการสูญ 3 dB; 20 dB ไม่ใช่ครึ่งเดียว" },
        { t: "20 mW", why: "ผิด &mdash; คิดแบบ 10 dB = ลด 80% ซึ่ง dB ไม่ใช่เส้นตรง; ทุก 10 dB คือหาร 10" },
        { t: "1 mW", why: "ถูก: dB บวกกัน 10 + 10 = 20 dB = เหลือ 1/100 ของ 100 mW = 1 mW" },
        { t: "0.1 mW", why: "คือการสูญ 30 dB (1/1000) ไม่ใช่ 20 dB" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: "วิศวกรคำนวณขีดจำกัดช่องสัญญาณ B = 1 MHz ที่ SNR = 20 dB โดยใส่ 20 ลงใน Shannon ตรงๆ ได้ 1&times;10<sup>6</sup> &times; log<sub>2</sub>(21) &asymp; 4.39 Mbit/s",
      q: "ข้อใดถูกต้อง?",
      opts: [
        { t: "ถูก เพราะ Shannon รับ SNR เป็น dB ได้เลย", why: "Shannon ต้องใช้ S/N เป็นอัตราส่วนเชิงเส้น ไม่ใช่ dB" },
        { t: "ผิด ควรแปลงก่อน S/N = 10<sup>2</sup> = 100 ได้ C &asymp; 6.66 Mbit/s", why: "ถูก: C = 10<sup>6</sup> &times; log<sub>2</sub>(101) &asymp; 6.66 Mbit/s; ใส่ dB ตรงๆ ทำให้ได้ค่าต่ำเกินจริง" },
        { t: "ผิด ควรใช้ Nyquist C = 2B = 2 Mbit/s", why: "โจทย์ให้ SNR ไม่ใช่จำนวนระดับ M &mdash; ต้องใช้ Shannon" },
        { t: "ผิด ควรได้ 20 Mbit/s เพราะ 20 dB = 20 &times; B", why: "ไม่มีสูตรนั้น; ความจุเกิดจาก log<sub>2</sub>(1 + S/N)" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "ช่องสัญญาณไร้ noise ความกว้าง 4 kHz ใช้สัญญาณ 8 ระดับ และโจทย์ไม่ได้ให้ค่า SNR",
      q: "bit rate สูงสุดคือเท่าไร?",
      opts: [
        { t: "8 kbit/s", why: "ตีความว่า 8 ระดับ = 8 bit; จริงๆ 8 ระดับ = log<sub>2</sub> 8 = 3 bit/symbol" },
        { t: "12 kbit/s", why: "ใช้ B &times; log<sub>2</sub> M = 4000 &times; 3 โดยลืมตัวคูณ 2 ใน Nyquist" },
        { t: "32 kbit/s", why: "ใช้ 2B &times; M = 8000 &times; 8 &mdash; ลืม log<sub>2</sub> (ต้องเป็นจำนวนบิตไม่ใช่จำนวนระดับ)" },
        { t: "24 kbit/s", why: "ถูก: C = 2 &times; 4000 &times; log<sub>2</sub> 8 = 8000 &times; 3 = 24,000 bit/s (Nyquist เพราะ noiseless)" }
      ],
      ans: 3
    },
    {
      type: "choice",
      story: "ใช้ NRZI โดยเริ่มที่ระดับ low (change on 1, stay on 0) ส่งบิต 1 0 1 1 0",
      q: "ระดับสัญญาณของแต่ละบิตตามลำดับคืออะไร (H = high, L = low)?",
      opts: [
        { t: "H L H H L", why: "นี่คือ NRZ (1 = high, 0 = low) ไม่ใช่ NRZI" },
        { t: "H H L H H", why: "ถูก: เริ่ม L; 1 &rarr; เปลี่ยนเป็น H; 0 &rarr; คง H; 1 &rarr; L; 1 &rarr; H; 0 &rarr; คง H" },
        { t: "L H H L L", why: "ผิดเพราะเปลี่ยนที่บิต 0 แทนที่ 1 &mdash; ความผิดพลาดที่พบบ่อย" },
        { t: "H L L H L", why: "ไม่สอดคล้องกับกฎ: บิต 0 ตัวที่สองต้องคงระดับ แต่ลำดับนี้เปลี่ยน" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "ลิงก์หนึ่งใช้ NRZ ล้วนๆ ส่งข้อมูลซึ่งมีบิต 0 ติดกันกว่าพันตัว ผู้รับ clock เพี้ยนและอ่านจำนวน 0 ผิดไปหนึ่งตัวเป็นระยะ",
      q: "วิธีแก้ที่ตรงสาเหตุและเสียค่าใช้จ่ายน้อยที่สุดคืออะไร?",
      opts: [
        { t: "เพิ่มกำลังส่งเพื่อให้ SNR สูงขึ้น", why: "ปัญหาคือ clock drift เพราะไม่มี edge ไม่ใช่ noise; กำลังส่งไม่ช่วย" },
        { t: "ใช้ Manchester เพราะเปลี่ยนทุกบิต", why: "แก้ได้แต่ต้องจ่าย bandwidth ~100% เพิ่ม ซึ่งแพงกว่าที่จำเป็น" },
        { t: "ใช้ 4B5B ร่วมกับ NRZI เพื่อรับประกันว่ามี 1 อย่างน้อยทุก 4 บิต", why: "ถูก: 4B5B จำกัด 0 ติดกันไม่เกิน 3 และ NRZI เปลี่ยนทุกครั้งที่เป็น 1 &rarr; มี edge พอ จ่ายแค่ 25%" },
        { t: "ใช้ CRC เพิ่มท้าย frame", why: "CRC ตรวจ error ใน L2 แต่ไม่ช่วยให้ผู้รับรักษา clock" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: "ต้องเชื่อมตึก A กับตึก B ห่างกัน 250 m ด้วยสาย Cat6 ที่ 1 Gbps พบว่า CRC error สูงและลิงก์หลุดบ่อย ตึกอื่นที่ใช้สาย 80 m ปกติดี",
      q: "สาเหตุและการแก้ที่เหมาะสมที่สุดคือข้อใด?",
      opts: [
        { t: "เกินขีด 100 m ของ copper (attenuation/noise) &rarr; เปลี่ยนเป็น fibre", why: "ถูก: ทุกมาตรฐาน copper Ethernet จำกัด ~100 m; ระหว่างตึกใช้ fibre (multimode หรือ single-mode ตามระยะ)" },
        { t: "เปลี่ยน connector เป็น T568A", why: "T568A/B ต่างกันแค่การสลับคู่สี; ไม่ช่วยเรื่องระยะ" },
        { t: "เพิ่ม frame size ให้ใหญ่ขึ้น", why: "ไม่ช่วยเรื่อง attenuation และอาจเพิ่มโอกาส frame เสีย" },
        { t: "เปลี่ยน line code เป็น NRZ", why: "ไม่เกี่ยวกับ attenuation และ NRZ แย่กว่าเรื่อง clock" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: "ลิงก์ 100BASE-TX ใช้ crystal 125 MHz ส่ง 4B5B + MLT-3 บนสาย Cat5 ที่ 100 MHz",
      q: "เหตุใด symbol rate จึงเป็น 125 MBd ทั้งที่ bit rate เป็น 100 Mbps?",
      opts: [
        { t: "เพราะสายต้องการ clock เพิ่ม 25% ไว้สำรองเมื่อสัญญาณอ่อน", why: "ไม่ใช่การสำรอง clock แต่เป็นผลจากการเข้ารหัส" },
        { t: "4B5B ส่ง 5 บิตต่อข้อมูล 4 บิต จึงมี symbol มากกว่า bit ข้อมูล 25% (100 &times; 5/4 = 125)", why: "ถูก: bits/symbol ที่มีประโยชน์ = 0.8; 125 MBd &times; 0.8 = 100 Mbps" },
        { t: "เพราะ Nyquist กำหนดให้ symbol rate = 2.5 &times; B", why: "Nyquist คือ 2B และ 125 MBd ไม่ได้มาจากสูตรนี้" },
        { t: "เพราะ Manchester ส่งสองครั้งต่อ bit", why: "100BASE-TX ไม่ใช้ Manchester (นั่นคือ 10 Mbps, 20 MBd)" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: "ช่างเข้าหัว RJ45 โดยวางสายเขียวไว้ pin 3 และ 4 (แทน 3 และ 6) ทุกเส้นมี continuity และ tester แบบ wiremap ผ่านหมด ลิงก์ทำงานที่ 100 Mbps แต่เมื่อต้องใช้ Gigabit กลับตกลงหรือ error มาก",
      q: "อะไรคือสาเหตุ?",
      opts: [
        { t: "สายขาด (open) ที่เส้นใดเส้นหนึ่ง", why: "ถ้า open tester จะเห็นไฟไม่ครบ และจะเสียทุกความเร็ว" },
        { t: "สายลัดวงจร (short) ที่ปลายหัว", why: "short ทำให้ tester เห็นสอง pin สว่างพร้อมกัน ไม่ใช่ผ่าน" },
        { t: "คู่สายถูกสลับขั้ว (reversed pair)", why: "wiremap จะจับได้ทันทีและ 100BASE-TX ไม่ได้รับผลมากนักด้วย MLT-3" },
        { t: "split pair: pin 3 และ 6 ใช้เส้นจากสองคู่ที่บิดคนละชุด จึงไม่ตัด noise/crosstalk", why: "ถูก: pin ถูกที่ครบแต่ทำลายการบิต; 100 Mbps ใช้แค่คู่ 1,2,3,6 พอรอด แต่ gigabit ใช้ 4 คู่ จึงล้ม; ต้องใช้ tester ที่วัด crosstalk" }
      ],
      ans: 3
    },
    {
      type: "multi",
      story: "พิจารณาข้อความเกี่ยวกับ delay และสื่อส่งข้อมูลต่อไปนี้",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "อัปเกรด link จาก 1 Gbps เป็น 10 Gbps ลด transmission delay แต่ไม่ลด propagation delay", ok: true, why: "L/R ขึ้นกับ R แต่ d/s ขึ้นกับระยะและความเร็วสัญญาณเท่านั้น" },
        { t: "ที่ 1 Gbps บิตหนึ่งมีความยาวประมาณ 20 cm บนสาย copper/fibre", ok: true, why: "2&times;10<sup>8</sup> m/s &times; 1 ns = 0.2 m" },
        { t: "ลิงก์ดาวเทียม GEO มี propagation delay ต่ำกว่า LEO", ok: false, why: "GEO สูง 35,786 km (~239 ms) แต่ LEO ~550 km (~4 ms)" },
        { t: "Fibre ต้านการรบกวนทางไฟฟ้าได้ดี เพราะส่งเป็นแสง", ok: true, why: "แสงไม่โดนมอเตอร์หรือสายไฟรบกวน และไม่นำไฟฟ้าระหว่างตึก" },
        { t: "ถ้า loss รวมคือ cable 10 dB + connector 3 dB กำลังเหลือประมาณ 1/13", ok: false, why: "dB บวกกันได้ = 13 dB &asymp; 1/20 ไม่ใช่ 1/13" }
      ]
    },
    {
      type: "multi",
      story: "เกี่ยวกับ line coding และ 4B5B",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Manchester มี edge กลางทุกบิต แต่ใช้ bandwidth ราว 2 เท่าของ NRZ", ok: true, why: "overhead 100%; 10 Mbps จึงต้องใช้ 20 MBd" },
        { t: "NRZI แก้ปัญหา run ของ 0 ได้แล้ว", ok: false, why: "NRZI แก้ run ของ 1 แต่ run ของ 0 ยังไม่มีการเปลี่ยน" },
        { t: "4B5B เลือก 16 code จาก 32 ที่ไม่มี 0 ติดกันเกิน 3 ตัวเมื่อต่อกัน", ok: true, why: "ไม่ขึ้นต้นด้วย 0 เกิน 1 ตัว และไม่ลงท้ายด้วย 0 เกิน 2 ตัว" },
        { t: "J K (11000 10001) สามารถเกิดจากข้อมูลธรรมดาได้ จึงต้องทำ bit stuffing", ok: false, why: "J และ K อยู่นอก 16 code ของข้อมูล จึงไม่ต้อง stuffing" },
        { t: "overhead ของ 64b/66b ราว 3% ต่ำกว่า 4B5B (25%)", ok: true, why: "header 2 bit ต่อ 64 bit = 3.1%" }
      ]
    },
    {
      type: "blank",
      story: "ลิงก์ 100 Mbps บนสายที่สัญญาณวิ่งด้วย 2&times;10<sup>8</sup> m/s",
      text: "bit time ของ 100 Mbps คือ {1} และความยาวบนสายของ 1 บิตคือ {2}; ดังนั้นสาย 100 m จะมีบิตอยู่ในสายพร้อมกัน {3} บิต",
      blanks: [
        { opts: ["1 ns", "10 ns", "100 ns", "1 &mu;s"], ans: 1, why: "1/(100&times;10<sup>6</sup>) = 10 ns" },
        { opts: ["20 m", "2 m", "20 cm", "200 m"], ans: 1, why: "2&times;10<sup>8</sup> &times; 10&times;10<sup>-9</sup> = 2 m" },
        { opts: ["5", "500", "50", "5,000"], ans: 2, why: "100 m / 2 m = 50 บิต" }
      ]
    },
    {
      type: "blank",
      text: "ก่อนใช้ Shannon กับ SNR 30 dB ต้องแปลงเป็น S/N = {1}; ถ้า B = 3,100 Hz จะได้ capacity ประมาณ {2} bit/s และถ้าโจทย์บอกว่าไม่มี noise แต่ให้จำนวนระดับสัญญาณ M ต้องใช้สูตรของ {3}",
      blanks: [
        { opts: ["30", "300", "1,000", "10,000"], ans: 2, why: "10<sup>(30/10)</sup> = 10<sup>3</sup> = 1,000" },
        { opts: ["9,300", "30,900", "93,000", "6,200"], ans: 1, why: "3100 &times; log<sub>2</sub>(1001) &asymp; 3100 &times; 9.97 &asymp; 30,900" },
        { opts: ["Shannon", "Nyquist", "Manchester", "Gray"], ans: 1, why: "noiseless + levels = Nyquist C = 2B log<sub>2</sub> M" }
      ]
    },
    {
      type: "blank",
      story: "ใช้ตาราง 4B5B ที่ I = 11111, J = 11000, K = 10001, 0011 &rarr; 10101, 1010 &rarr; 10110, 0000 &rarr; 11110, 1111 &rarr; 11101",
      text: "ข้อมูล 0011 1010 ถูกส่งเป็น {1}; ผู้รับเห็น 11110 11101 ถอดรหัสได้ {2}; ผู้รับเห็น 11000 10001 แปลว่า {3}",
      blanks: [
        { opts: ["10101 10110", "10110 10101", "00111 01010", "11110 11101"], ans: 0, why: "0011 &rarr; 10101, 1010 &rarr; 10110 ตามลำดับ" },
        { opts: ["0000 1111", "1111 0000", "0000 0000", "error"], ans: 0, why: "11110 = 0000, 11101 = 1111" },
        { opts: ["ข้อมูล 0 และ 1", "idle", "เริ่ม frame (J K)", "จบ frame"], ans: 2, why: "J K = start delimiter; ไม่อยู่ใน data alphabet" }
      ]
    },
    {
      type: "match",
      q: "จับคู่ปรากฏการณ์/แนวคิดกับคำอธิบาย",
      pairs: [
        ["Attenuation", "สัญญาณอ่อนลงตามระยะ"],
        ["Crosstalk", "สัญญาณรั่วจากคู่สายข้างเคียง (ลดด้วยการบิดต่างอัตรากัน)"],
        ["Intersymbol interference", "pulse กางเข้าช่องเวลาของบิตถัดไป"],
        ["Baseline wander", "ค่าเฉลี่ยลอยตาม run ยาวๆ ทำให้ threshold เพี้ยน"],
        ["Total internal reflection", "เก็บแสงในแกน fibre แม้โค้งเบาๆ"]
      ],
      why: "แต่ละอย่างคือผลต่อสัญญาณหรือกลไกของสื่อ: attenuation (ระยะ), crosstalk (คู่ข้างเคียง), ISI (distortion/pulse spread), baseline wander (run ยาวและ transformer), TIR (fibre)"
    }
  ]
});
