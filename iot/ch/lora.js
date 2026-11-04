IOT.reg({
  id: "lora",
  title: "Telecom · LoRa · LoRaWAN",
  th: "พื้นฐานการสื่อสาร/Modulation, LoRa (SF, BW, CR, link budget) และสถาปัตยกรรม LoRaWAN พร้อมแล็บ ChirpStack",
  summary: `
<ul>
<li><b>ช่องสัญญาณ</b>มี loss/noise: Free Space Path Loss, Fading, Interference · <b>Channel encoder</b> เพิ่ม redundant bits (Hamming code, Parity) เพื่อตรวจ/แก้ error</li>
<li><b>Modulation</b>: Analog → AM/FM/PM · Digital→Analog: ASK, FSK, PSK, QAM · Line coding (digital→digital): NRZ, RZ, Bipolar, Manchester</li>
<li>QAM bit/symbol: 16=4, 64=6, 256=8 (Wi-Fi 5), 1024=10 (Wi-Fi 6), 4096=12 (Wi-Fi 7)</li>
<li><b>LoRa</b> = proprietary modulation ของ <b>Semtech</b> แบบ <b>Chirp Spread Spectrum (CSS)</b> · เริ่ม 2009 (Nicolas Sornin, Olivier Seller, Cycleo) · Semtech ซื้อ 2012 · chip SX1272/SX1276 · gateway SX1301/SX1303 (+SX1250 RF front end)</li>
<li><b>LoRaWAN</b> = LoRa (PHY) + network protocol (LoRa Alliance, 2015) · LPWAN ไกล ประหยัดพลังงาน</li>
</ul>
<table>
<tr><th>พารามิเตอร์</th><th>ค่า</th><th>ผล</th></tr>
<tr><td>SF</td><td>7–12</td><td>chip/symbol = 2^SF, bit/symbol = SF · SF สูง = ไกล/sensitivity ดี แต่ช้า ToA นาน</td></tr>
<tr><td>BW</td><td>125/250/500 kHz (ได้ 7.8–500)</td><td>chip rate = BW · กว้าง = เร็ว ToA สั้น แต่ sensitivity แย่ลง</td></tr>
<tr><td>CR</td><td>4/5, 4/6, 4/7, 4/8</td><td>FEC (Hamming) · ตัวหารมาก = ทนผิดพลาดดี แต่ data rate ลด</td></tr>
</table>
<ul>
<li><b>Symbol rate = BW / 2^SF</b> · <b>Bit rate = SF × Symbol rate</b> · <b>Data rate = Bit rate × CR</b> (SF7, 125 kHz, 4/5 = 5,468.75 bps)</li>
<li>Symbol time SF7 = 1.024 ms · SF10 = 8.192 ms · SF11 = 16.384 ms · SF12 = 32.768 ms (SF +1 → 2×)</li>
<li><b>Link Margin = RSSI − Sensitivity</b> (dB) · ระยะ ×2 = −6 dB · ×10 = −20 dB · Fresnel zone ต้องโล่ง (LOS)</li>
<li>TX power: 2–20 dBm (2 dBm=1.6 mW, 10=10 mW, 14=25 mW, 20=100 mW)</li>
<li>Architecture: End device → <b>Gateway</b> (RF→IP, ส่ง metadata RSSI/SNR) → <b>Network Server</b> (dedup, security, Join, ADR, MAC cmd, downlink) → <b>Application Server</b> (ถอดรหัส AppSKey AES-128, decoder, dashboard, integration)</li>
<li><b>Class A</b> uplink แล้วเปิดรับ 2 ช่วง · <b>B</b> + beacon ตามเวลา · <b>C</b> เปิดรับตลอด (กินสุด)</li>
<li>Join: <b>OTAA</b> (DevEUI, JoinEUI/AppEUI, AppKey) / <b>ABP</b> · ใน Arduino: DEVEUI/APPEUI = little-endian (LSB), APPKEY = big-endian (MSB)</li>
<li>ChirpStack: uplink topic <code>application/{app_id}/device/{dev_eui}/event/up</code> · downlink <code>.../command/down</code> JSON {devEui, confirmed, fPort, data Base64} · ON = T04= · OFF = T0ZG</li>
<li>Library: <b>RadioHead</b> (P2P, setSpreadingFactor/setSignalBandwidth/setCodingRate4) · <b>MCCI LMIC</b> (LoRaWAN)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>CSS · Semtech · LoRaWAN 2015 · SF 7–12 · CR 4/5–4/8</li><li>Symbol rate = BW/2^SF · Bit rate = SF×symbol rate · Data rate = ×CR</li><li>Class A ประหยัดสุด · Class C กินสุด · AppSKey เข้ารหัส payload (App Server)</li></ul></div>`,
  sections: [
    { t: "พื้นฐานการสื่อสารและ Modulation", html: `
<p>ระบบสื่อสารส่งข้อมูล (information) ผ่านช่องสัญญาณ (channel) ที่มี <b>loss และ noise</b> เสมอ</p>
<ul>
<li>ตัวอย่างความสูญเสียของ wireless: <b>Free Space Path Loss</b>, Fading, Interference · fiber optic: scattering, absorption, attenuation</li>
<li><b>Source encoder</b>: ลดขนาดข้อมูล/แปลงเป็น bit (JPEG, MP3) · <b>Channel encoder</b>: เติม redundant bits เช่น Hamming code, Parity bit เพื่อให้ตรวจจับ/แก้ error ได้</li>
<li><b>Modulation</b>: เอาข้อมูลไป "ขี่" บนคลื่นพาห์ให้เหมาะกับสื่อกลาง (Radio Frequency, Fiber, Cable) และใช้ spectrum อย่างมีประสิทธิภาพ</li>
</ul>
<table>
<tr><th>ชนิด</th><th>เทคนิค</th></tr>
<tr><td>Analog → Analog</td><td>AM (Amplitude), FM (Frequency), PM (Phase)</td></tr>
<tr><td>Analog → Digital</td><td>PAM, PWM, PPM (pulse)</td></tr>
<tr><td>Digital → Analog</td><td>ASK, FSK, PSK, QPSK, QAM</td></tr>
<tr><td>Digital → Digital (Line coding)</td><td>NRZ, RZ, Bipolar, Biphase, Manchester</td></tr>
</table>
<ul>
<li><b>QAM</b> ใช้ใน Wi-Fi: constellation แสดงตำแหน่ง symbol ยิ่งจุดหนาแน่นยิ่งได้ bit/symbol มากแต่ไวต่อ noise: 16QAM 4 bit · 64QAM 6 bit · 256QAM 8 bit (Wi-Fi 5) · 1024QAM 10 bit (Wi-Fi 6/6E) · 4096QAM 12 bit (Wi-Fi 7)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Bit/symbol ของ M-QAM = log2(M) → 256→8, 1024→10, 4096→12</li><li>Channel encoder เพิ่ม redundant bit · Source encoder ลดขนาดข้อมูล</li></ul></div>` },
    { t: "LoRa: CSS และ Spreading Factor", html: `
<p>LoRa เป็น <b>proprietary</b> wireless modulation ของ <b>Semtech</b> อิง <b>Chirp Spread Spectrum (CSS)</b> พัฒนาตั้งแต่ 2009 โดย Nicolas Sornin และ Olivier Seller (ต่อมาตั้ง Cycleo) · Semtech ซื้อ Cycleo ปี 2012 · เป็น <b>Physical layer</b> ของ IoT ที่เน้นระยะไกลและกินพลังงานต่ำ (เช่น metering)</p>
<ul>
<li><b>Chirp</b> = สัญญาณที่ความถี่ sweep ขึ้น/ลงตามเวลา · LoRa เข้ารหัส symbol ด้วย <b>Cyclic Shift</b> ของ chirp</li>
<li><b>Spreading Factor (SF)</b>: SF = 7 → 2^7 = <b>128 chip</b> ต่อ 1 symbol และ 1 symbol เก็บ <b>7 bit</b> (bit/symbol = SF)</li>
<li>เพิ่ม SF ทีละ 1 → จำนวน chip ×2 → sweep นานขึ้น 2× → symbol time ×2</li>
</ul>
<table>
<tr><th>SF</th><th>Symbol time (BW 125 kHz)</th></tr>
<tr><td>7</td><td>1.024 ms</td></tr><tr><td>8</td><td>2.048 ms</td></tr><tr><td>9</td><td>4.096 ms</td></tr>
<tr><td>10</td><td>8.192 ms</td></tr><tr><td>11</td><td>16.384 ms</td></tr><tr><td>12</td><td>32.768 ms</td></tr>
</table>
<ul>
<li>SF สูง → ระยะไกล, sensitivity ดี (รับสัญญาณอ่อนได้), <b>แต่</b> bit rate ต่ำ, <b>Time on Air</b> นาน, กินพลังงานต่อ packet มากขึ้น</li>
<li>SF ต่ำ → เร็ว ToA สั้น แต่ระยะสั้น/ทนสัญญาณอ่อนได้น้อย</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>SF 7–12 · chip/symbol = 2^SF · bit/symbol = SF</li><li>SF7 = 1.024 ms, SF10 = 8.192 ms, SF12 = 32.768 ms (SF+1 → ×2)</li><li>Chip: SX1272/SX1276 (end device), SX1301/SX1303 (gateway)</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> LoRa = PHY เท่านั้น ส่วน LoRaWAN = LoRa + network protocol (device, gateway, network server, address, security, message, uplink/downlink) โดย LoRa Alliance ปี 2015</div>` },
    { t: "Bandwidth, Coding Rate และสูตร Data Rate", html: `
<h4>Bandwidth (BW)</h4>
<ul>
<li>ค่าที่ใช้บ่อย 125, 250, 500 kHz (LoRa รองรับตั้งแต่ 7.8 kHz ถึง 500 kHz) · <b>chip rate = BW</b> (125 kHz → 125,000 chip/s)</li>
<li>BW กว้าง → data rate สูง, Time on Air สั้น <b>แต่</b> รับ noise มากขึ้น → <b>sensitivity แย่ลง</b> (ไกลน้อยลง)</li>
</ul>
<h4>Coding Rate (CR) / FEC</h4>
<ul>
<li>CR = 4/5, 4/6, 4/7, 4/8 ใช้ Hamming code ทำ Forward Error Correction (แก้ error ได้) · ตัวหารยิ่งมาก = redundancy ยิ่งมาก ทนผิดพลาดดีขึ้นแต่ data rate ลด/ToA นานขึ้น</li>
<li>ใน RadioHead: <code>rf95.setCodingRate4(5..8)</code> (5 = 4/5 ... 8 = 4/8) · ค่าเริ่มต้น BW = 125 kHz, CR = 4/5, SF = 7</li>
</ul>
<h4>สูตร</h4>
<ul>
<li><b>Symbol rate = BW / 2^SF</b> (symbol/s)</li>
<li><b>Bit rate = SF × Symbol rate</b> (bps)</li>
<li><b>Data rate = Bit rate × CR</b> (CR เป็นเศษส่วน เช่น 4/5 = 0.8)</li>
</ul>
<table>
<tr><th>ตั้งค่า</th><th>Symbol rate</th><th>Bit rate</th><th>Data rate (CR 4/5)</th></tr>
<tr><td>SF7, BW125</td><td>976.56 sym/s</td><td>6,835.9 bps</td><td>5,468.75 bps</td></tr>
<tr><td>SF10, BW125</td><td>122.07 sym/s</td><td>1,220.7 bps</td><td>976.56 bps</td></tr>
<tr><td>SF12, BW125</td><td>30.52 sym/s</td><td>366.2 bps</td><td>292.97 bps</td></tr>
<tr><td>SF7, BW500</td><td>3,906.25 sym/s</td><td>27,343.75 bps</td><td>21,875 bps</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Symbol rate = BW/2^SF · Bit rate = SF×Symbol rate · Data rate = Bit rate×CR</li><li>SF7/125 kHz: 125000/128 = 976.56 sym/s → ×7 = 6,835.9 bps → ×4/5 = 5,468.75 bps</li></ul></div>
<div class="warn"><b>⚠️ ระวัง</b> SF เพิ่ม → bit/symbol เพิ่ม แต่ symbol rate ลด 2^SF เท่า จึงสรุปรวมคือ bit rate ลด (ไม่ใช่เพิ่ม) · BW เพิ่ม → เร็วขึ้นแต่ sensitivity ลดลง</div>` },
    { t: "Link budget: Sensitivity, RSSI, Path Loss, EIRP, Fresnel", html: `
<ul>
<li><b>RSSI</b> = กำลังสัญญาณที่รับได้ (dBm) · <b>Receive sensitivity</b> = กำลังต่ำสุดที่ demodulate ได้ (dBm, ค่าติดลบมากกว่า = ดีกว่า) · <b>Link Margin = RSSI − Sensitivity</b> (dB) ต้อง &gt; 0 และควรเผื่อสำหรับ fading</li>
<li>Free Space Path Loss: <b>ระยะ ×2 → −6 dB</b> · <b>×10 → −20 dB</b> · สูตรทั่วไป FSPL(dB) = 20log10(d km) + 20log10(f MHz) + 32.44 (868 MHz ที่ 1 km ≈ 91.2 dB)</li>
<li><b>dBm ↔ mW</b>: P(dBm) = 10log10(mW) · +3 dB = ×2 · +10 dB = ×10 · 2 dBm = 1.6 mW, 10 dBm = 10 mW, 14 dBm = 25 mW, 20 dBm = 100 mW</li>
<li>EIRP (dBm) = TX power + Antenna gain (dBi) − Cable loss (dB)</li>
<li>เปลี่ยนค่าที่ช่วย link margin: เพิ่ม TX power, เพิ่ม gain เสาอากาศ, เพิ่ม SF (sensitivity ดีขึ้น), ลด BW, ลดระยะ/ยกเสาให้สูง</li>
</ul>
<h4>Fresnel zone</h4>
<ul>
<li>LoRa ความถี่สูง (เช่น 868 MHz) ต้องการ <b>Line of Sight (LOS)</b> ระหว่าง end node กับ gateway · ไม่ใช่แค่เส้นตรงมองเห็น แต่ต้องโล่งใน <b>Fresnel zone</b> ด้วย</li>
<li>สิ่งกีดขวางเข้าไปใน Fresnel zone เกิน ~40% ทำให้สัญญาณเสื่อม (ควรเว้นอย่างน้อย ~60% ให้โล่ง)</li>
<li>ระยะไกลมากต้องคิด <b>earth curvature</b> เพิ่ม (เช่น 30 km ≈ 13.2 m) · รัศมี Fresnel r ขึ้นกับความยาวคลื่นและระยะ</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>Link Margin = RSSI − Sensitivity</li><li>×2 distance = −6 dB · ×10 = −20 dB · +3 dB = ×2 กำลัง</li><li>14 dBm = 25 mW · 20 dBm = 100 mW</li></ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ISM band = ย่านความถี่ที่เปิดใช้งานทั่วโลกสำหรับ industrial, scientific, medical (ไม่ใช่โทรคมนาคม) จึงใช้ได้โดยไม่ต้องขอ license (unlicensed) แต่ต้องทำตาม frequency plan ของแต่ละประเทศ (แล็บใช้ 868 MHz ใน RadioHead และ 924.2 MHz ใน LMIC)</div>` },
    { t: "สถาปัตยกรรม LoRaWAN", html: `
<p>LoRa + Network protocol = <b>LoRaWAN</b> (เพิ่ม Internet/Network protocol, Security, Authentication)</p>
<table>
<tr><th>ส่วน</th><th>หน้าที่</th></tr>
<tr><td><b>End device</b></td><td>MCU + LoRa transceiver + sensor/actuator · สร้าง LoRaWAN packet · เข้ารหัส payload ด้วย <b>AES-128 (AppSKey)</b> · ส่ง chirp · รับ downlink · จัดการพลังงาน · Join (OTAA/ABP)</td></tr>
<tr><td><b>Gateway</b></td><td>รับ LoRa จาก end device → demodulate → แปลงเป็น <b>IP packet</b> ส่งเข้า Internet ไป Network Server · แนบ metadata (RSSI, SNR, timestamp, gateway ID, channel, data rate) · ส่ง downlink · beacon (Class B) · ไม่ถอดรหัส payload</td></tr>
<tr><td><b>Network Server</b></td><td>รับ packet จาก gateway · <b>Deduplication</b> (หลาย gateway ได้ packet เดียวกัน) · ตรวจ security · Join procedure · <b>ADR</b> (Adaptive Data Rate) · MAC command · Downlink scheduling · Roaming · Device management</td></tr>
<tr><td><b>Application Server</b></td><td>รับ payload จาก NS · ถอดรหัสด้วย <b>AppSKey</b> · Payload decoder (bytes → JSON) · Database · Dashboard · Alert · สั่ง downlink · Integration (API/Webhook)</td></tr>
</table>
<p>Gateway ประกอบด้วย LoRa Concentrator (SX1303 + SX1250 RF front end), RF amplifier, Main processor, Backhaul (Internet), GPS module</p>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>เส้นทาง: End device → Gateway (RF→IP) → Network Server → Application Server</li><li>Network Server: dedup / security / Join / ADR / MAC command / downlink scheduling</li><li>Application Server: ถอดรหัส AppSKey / decoder / dashboard</li></ul></div>
<div class="warn"><b>⚠️ ระวัง</b> Gateway ไม่ได้ถอดรหัส payload และไม่ทำ ADR/Join จริง (เป็นหน้าที่ Network Server) · การถอดรหัส application payload อยู่ที่ Application Server</div>` },
    { t: "Device Class และการ Join (OTAA / ABP)", html: `
<table>
<tr><th>Class</th><th>การรับ downlink</th><th>พลังงาน / ใช้เมื่อ</th></tr>
<tr><td><b>A</b></td><td>ส่ง uplink ได้ตลอด · เปิดรับ downlink 2 ช่วงสั้นหลังส่ง uplink (RX1, RX2)</td><td>ประหยัดสุด · sensor ใช้แบต</td></tr>
<tr><td><b>B</b></td><td>เหมือน A + เปิดรับตามเวลาที่ sync ด้วย <b>beacon</b> จาก gateway เป็นรอบ</td><td>กลาง · ต้องการ downlink เป็นช่วงๆ ที่คาดเวลาได้</td></tr>
<tr><td><b>C</b></td><td>เปิดรับ downlink ตลอด (ยกเว้นตอนส่ง uplink)</td><td>กินสุด · มี power ต่อเนื่อง ต้อง downlink ทันที</td></tr>
</table>
<ul>
<li>Class A: ถ้า server ต้องการสั่ง device จะต้อง <b>รอ</b> uplink ครั้งถัดไป (downlink ถูก queue ไว้)</li>
<li><b>OTAA</b> (Over The Air Activation): device ส่ง Join Request ด้วย <b>DevEUI, JoinEUI(AppEUI), AppKey</b> → Join Accept → ได้ session key (NwkSKey/AppSKey) · ปลอดภัยกว่า</li>
<li><b>ABP</b> (Activation By Personalization): กำหนด address/session key ล่วงหน้าในอุปกรณ์ ไม่ต้องผ่าน join</li>
<li>Byte order ในโค้ด Arduino (LMIC) ที่ copy จาก ChirpStack: <b>DEVEUI[8] = little-endian (LSB)</b>, <b>APPEUI[8] = little-endian (LSB)</b>, <b>APPKEY[16] = big-endian (MSB)</b></li>
<li>LMIC: <code>LMIC_setupChannel(0, 924200000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI)</code> ตั้งช่องความถี่ · <code>LMIC_setDrTxpow(DR_SF12, 14)</code> ตั้ง SF และ TX power (14 dBm = 25 mW) · ต้องตั้ง pin mapping (nss, rst, dio) ให้ตรงบอร์ด</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul><li>A = ประหยัดสุด · C = กินสุด · B = ต้องมี beacon</li><li>OTAA ใช้ DevEUI + JoinEUI + AppKey · DEVEUI/APPEUI LSB, APPKEY MSB</li></ul></div>` },
    { t: "แล็บ: RadioHead, LMIC, ChirpStack และ MQTT", html: `
<ul>
<li><b>Chip/Module</b>: SX127x (137–1020 MHz) · LoRa module = chip SX127x + เชื่อม MCU ผ่าน <b>SPI</b> ปรับ SF, BW, CR ได้ · วัด RSSI/SNR ได้ · LoRa shield เสียบ Arduino</li>
<li><b>RadioHead</b> = library สำหรับ <b>LoRa P2P</b> (point to point) ตั้ง frequency, SF, BW, CR, TX power ได้ · ตัวอย่าง: <code>rf95.setSpreadingFactor(7); rf95.setSignalBandwidth(125000); rf95.setCodingRate4(5);</code> · <code>float frequency = 868.0;</code></li>
<li>วัด <b>Time on Air</b>: จับเวลา <code>micros()</code> รอบ <code>rf95.send()</code> + <code>rf95.waitPacketSent()</code> แล้ว (end − start)/1000 เป็น ms · payload 21 vs 50 byte, SF7 vs SF12 → ToA ต่างกันมาก</li>
<li><b>MCCI LMIC</b> = LoRaWAN stack (OTAA/ABP, Join Request/Accept, DevEUI/AppEUI/AppKey, frame counter, encryption, MAC)</li>
<li><b>ChirpStack</b> = open-source LoRaWAN Network Server: Gateway/Device/Join/Application management, data forwarding, downlink, MQTT integration, API · ขั้นตอน: Add application → Add device (DevEUI/JoinEUI/AppKey, Device profile) → ใส่ key ในโค้ด → ส่ง Join → uplink</li>
<li><b>MQTT integration</b>: broker lora.kmitl.ac.th พอร์ต 1883 (WebSocket 8884 แบบ SSL)</li>
<li>Subscribe uplink: <code>application/{application_id}/device/{device_eui}/event/up</code> (ได้ device info, devEui, data, gateway, freq/SF/CR)</li>
<li>Publish downlink: <code>application/{application_id}/device/{device_eui}/command/down</code> payload JSON: <code>{"devEui":"...","confirmed":false,"fPort":1,"data":"T04="}</code></li>
<li>field: <b>confirmed</b> true = device ต้อง ACK / false = ไม่ต้อง · <b>fPort</b> = application port · <b>data</b> = payload แบบ <b>Base64</b> (ON → T04=, OFF → T0ZG)</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> ที่ data เป็น Base64 เพราะ JSON เป็นข้อความ จึงต้อง encode bytes ก่อนส่ง (เช่น ข้อความ ON = 0x4F 0x4E → T04=)</div>
<div class="warn"><b>⚠️ ระวัง</b> RadioHead = P2P ไม่ผ่าน gateway/network server · LMIC = ต้องมี gateway + network server (ChirpStack) จึงจะ Join ได้</div>` }
  ],
  ex: [
    { type: "choice",
      story: "โหนดวัดระดับน้ำตั้งค่า LoRa: SF7, BW 125 kHz, CR 4/5 วิศวกรต้องประมาณ data rate ที่ใช้ได้จริงเพื่อคำนวณขนาด payload",
      q: "Data rate (หลังคูณ CR) ประมาณเท่าใด",
      opts: [
        { t: "ประมาณ 977 bps", why: "นี่คือ symbol rate (125000/128 ≈ 976.56 symbol/s) ยังไม่คูณ SF และ CR" },
        { t: "ประมาณ 5,469 bps", why: "ถูก: 125000/128 = 976.56 sym/s × 7 = 6,835.9 bps × 4/5 = 5,468.75 bps" },
        { t: "ประมาณ 6,836 bps", why: "นี่คือ bit rate ก่อนคูณ Code Rate (ลืมคูณ 4/5)" },
        { t: "ประมาณ 21,875 bps", why: "ค่านี้ได้เมื่อ BW 500 kHz ซึ่งไม่ใช่โจทย์นี้" }
      ], ans: 1 },
    { type: "choice",
      story: "มีสองโหนดใช้ BW 125 kHz เท่ากัน โหนด A ใช้ SF7 โหนด B ใช้ SF10 และตัดสินใจเทียบ symbol time",
      q: "Symbol time ของ SF10 นานกว่า SF7 กี่เท่า",
      opts: [
        { t: "ประมาณ 1.4 เท่า (10/7)", why: "SF ไม่ได้เพิ่ม symbol time แบบเส้นตรง แต่เพิ่มเป็น 2 ยกกำลัง" },
        { t: "3 เท่า (10−7)", why: "ผลต่างของ SF คือเลขชี้กำลัง ไม่ใช่ตัวคูณ" },
        { t: "8 เท่า (2^3) คือ 1.024 ms เป็น 8.192 ms", why: "ถูก: SF +1 ทำให้ chip/symbol ×2 → SF +3 = ×8" },
        { t: "1,000 เท่า", why: "เกินจริงมาก (ผิดสูตร 2^SF)" }
      ], ans: 2 },
    { type: "choice",
      story: "ติดตั้งเซนเซอร์ความชื้นดินในไร่ห่างจาก gateway ประมาณ 8 กม. ส่งข้อมูล 20 byte ทุก 30 นาที ใช้แบตเตอรี่ ไม่ต้องการ throughput สูง ต้องการให้ link เสถียรที่สุด",
      q: "เลือกค่าตั้งใดเหมาะที่สุด",
      opts: [
        { t: "SF7, BW 500 kHz, CR 4/5", why: "เร็วแต่ sensitivity แย่ ระยะสั้น เหมาะระยะใกล้ ไม่เหมาะ 8 กม." },
        { t: "SF7, BW 125 kHz, CR 4/8", why: "SF ต่ำทำให้ ระยะไม่พอ แม้ CR 4/8 จะช่วยแก้ error แต่ไม่เพิ่ม sensitivity มากเท่า SF" },
        { t: "SF12, BW 500 kHz, CR 4/5", why: "SF สูงช่วยแต่ BW กว้างทำให้ noise มาก sensitivity แย่ลง ลดประโยชน์" },
        { t: "SF12, BW 125 kHz, CR 4/5 (หรือ 4/8 หากมี interference)", why: "ถูก: SF สูง + BW แคบ ได้ sensitivity ดีที่สุด ไกลที่สุด ยอมช้าได้เพราะส่งข้อมูลน้อย" }
      ], ans: 3 },
    { type: "choice",
      story: "สัญญาณจากโหนดไป gateway วัด RSSI = −118 dBm และ receiver sensitivity ของการตั้งค่านี้ = −123 dBm",
      q: "Link margin เป็นเท่าใด และสรุปอย่างไรถูกที่สุด",
      opts: [
        { t: "−5 dB รับไม่ได้", why: "คิดเครื่องหมายสลับ: margin = RSSI − Sensitivity = −118 − (−123) = +5" },
        { t: "+5 dB รับได้ แต่ margin น้อย เสี่ยงเมื่อ fading ควรเพิ่ม margin", why: "ถูก: −118 − (−123) = 5 dB ผ่านอย่างฉิวเฉียด" },
        { t: "241 dB", why: "เป็นการบวกค่าสองตัวทั้งที่สูตรคือลบกัน" },
        { t: "+13 dB", why: "ตัวเลขไม่ตรงกับการคำนวณจากข้อมูลที่ให้" }
      ], ans: 1 },
    { type: "choice",
      story: "Gateway ที่ระยะ 2 กม. วัด RSSI = −100 dBm ในที่โล่ง (LOS) ถ้าย้ายโหนดไปที่ระยะ 8 กม. (ที่โล่งเหมือนเดิม และกำลังส่งเท่าเดิม)",
      q: "RSSI คาดประมาณเท่าใด",
      opts: [
        { t: "ประมาณ −112 dBm", why: "ถูก: 2→8 กม. คือ ×4 = ×2 สองครั้ง = −6 −6 = −12 dB → −112 dBm" },
        { t: "ประมาณ −106 dBm", why: "−6 dB คือแค่ระยะ ×2 (4 กม.) ไม่ใช่ ×4" },
        { t: "ประมาณ −120 dBm", why: "−20 dB คือระยะ ×10 ไม่ใช่ ×4" },
        { t: "ประมาณ −104 dBm", why: "ผิดจากกฎ −6 dB ต่อการเพิ่มระยะเป็น 2 เท่า" }
      ], ans: 0 },
    { type: "choice",
      story: "ระบบควบคุมไฟถนน (ใช้ไฟบ้าน มี power ตลอด) ผู้ดูแลกดสั่งเปิด/ปิดจากเว็บและต้องการให้หลอดไฟตอบสนองภายในไม่กี่วินาที ไม่ต้องรอ uplink รอบถัดไป",
      q: "ควรตั้ง device เป็น Class ใด",
      opts: [
        { t: "Class A", why: "รับ downlink ได้เฉพาะหลัง uplink จึงอาจรอนาน" },
        { t: "Class B ตั้งรอบ beacon ยาวมาก", why: "รับเป็นช่วงเวลา ยังไม่ทันทีเท่า Class C" },
        { t: "Class C", why: "ถูก: เปิดรับ downlink ตลอด ตอบสนองทันที ข้อเสียคือกินพลังงานสุด แต่ที่นี่มีไฟเลี้ยง" },
        { t: "Class A แต่ส่ง uplink ถี่ขึ้น", why: "เสียพลังงาน/airtime ไม่คุ้ม และยังไม่ deterministic เท่า Class C" }
      ], ans: 2 },
    { type: "choice",
      story: `นักศึกษาใส่ key ใน Arduino (LMIC) โดย copy ค่า DevEUI, JoinEUI, AppKey จาก ChirpStack แบบ MSB เหมือนกันหมด
<pre><code>static const u1_t PROGMEM DEVEUI[8] = { 0x6A,0x44,... };
static const u1_t PROGMEM APPEUI[8] = { ... };
static const u1_t PROGMEM APPKEY[16] = { ... };</code></pre>
ตัว gateway รับ Join Request ได้ แต่ ChirpStack ไม่พบ device / ไม่ตอบ Join Accept`,
      q: "แก้ไขอย่างไร",
      opts: [
        { t: "ใส่ DEVEUI และ APPEUI แบบ little-endian (LSB) ส่วน APPKEY คง big-endian (MSB)", why: "ถูก: LMIC กำหนด DEVEUI/APPEUI เป็น little-endian แต่ APPKEY เป็น big-endian ลำดับ byte ผิดทำให้ EUI ที่ส่งไม่ตรงกับที่ลงทะเบียน" },
        { t: "เปลี่ยน Class จาก A เป็น C", why: "Class ไม่เกี่ยวกับการค้นหา device ใน Join" },
        { t: "เพิ่ม SF เป็น 12", why: "ปัญหาเป็นที่ key/EUI ไม่ใช่ link quality เพราะ gateway รับ Join Request ได้แล้ว" },
        { t: "ลดค่า confirmed เป็น false", why: "confirmed เป็น field ของ downlink ผ่าน MQTT ไม่เกี่ยวกับ Join" }
      ], ans: 0 },
    { type: "choice",
      story: "ต้องการสั่งเปิดอุปกรณ์ปลายทางผ่าน MQTT integration ของ ChirpStack ข้อความ ON ที่ encode เป็น Base64 คือ T04= (OFF คือ T0ZG) devEui = 0102030405060708 ใช้ fPort 1 ไม่ต้องการ ACK",
      q: "ข้อใดถูกต้อง",
      opts: [
        { t: "publish ที่ .../event/up ด้วย data \"ON\"", why: "event/up เป็น topic uplink ที่ใช้ subscribe ไม่ใช่สั่ง downlink และ data ต้องเป็น Base64" },
        { t: "publish ที่ .../command/down ด้วย data \"ON\" (plain text)", why: "topic ถูก แต่ data ต้องเป็น Base64 ไม่ใช่ข้อความดิบ" },
        { t: "publish ที่ .../command/down ด้วย data \"T0ZG\"", why: "T0ZG คือ OFF ไม่ใช่ ON" },
        { t: "publish ที่ .../command/down ด้วย {\"devEui\":\"0102030405060708\",\"confirmed\":false,\"fPort\":1,\"data\":\"T04=\"}", why: "ถูก: ใช้ topic command/down, JSON ครบ field และ data เป็น Base64 ของ ON" }
      ], ans: 3 },
    { type: "multi",
      story: "ระบบ LoRaWAN มี gateway หลายตัวในพื้นที่ซ้อนทับกัน",
      q: "เลือกทุกข้อที่ถูกต้องเกี่ยวกับหน้าที่ของแต่ละส่วน",
      opts: [
        { t: "Gateway แปลง RF เป็น IP packet พร้อมแนบ metadata เช่น RSSI/SNR แล้วส่งต่อ Network Server", ok: true, why: "ถูกต้อง" },
        { t: "Network Server ทำ deduplication เมื่อหลาย gateway ได้ packet เดียวกัน", ok: true, why: "ถูกต้อง" },
        { t: "Network Server ทำ ADR (Adaptive Data Rate)", ok: true, why: "ถูกต้อง" },
        { t: "Gateway ถอดรหัส payload ด้วย AppSKey ก่อนส่งต่อ", ok: false, why: "AppSKey ใช้ถอดรหัสที่ Application Server (gateway ไม่ถอดรหัส)" },
        { t: "Application Server เป็นผู้จัด Join procedure และ MAC command", ok: false, why: "เป็นหน้าที่ Network Server" },
        { t: "End device ส่ง IP packet ตรงเข้า Internet ผ่าน LoRa", ok: false, why: "End device ส่ง RF ไปยัง gateway ไม่ใช่ IP" }
      ] },
    { type: "multi",
      story: "ปรับ Spreading Factor จาก SF7 เป็น SF12 โดย BW และ CR คงเดิม",
      q: "เลือกทุกข้อที่เป็นผลที่ตามมา",
      opts: [
        { t: "Sensitivity ดีขึ้น ระยะทางไกลขึ้น", ok: true, why: "ถูก" },
        { t: "Time on Air ต่อ packet นานขึ้น", ok: true, why: "ถูก" },
        { t: "Bit rate ลดลง", ok: true, why: "ถูก: symbol rate ลด 32 เท่า (2^5) ส่วน bit/symbol เพิ่มแค่ 12/7" },
        { t: "Symbol time ยาวขึ้น (1.024 ms → 32.768 ms)", ok: true, why: "ถูก" },
        { t: "Bit rate เพิ่มขึ้นเพราะ bit/symbol มากขึ้น", ok: false, why: "bit/symbol เพิ่มน้อยกว่าที่ symbol rate ลด จึงช้าลงโดยรวม" },
        { t: "ใช้พลังงานต่อ packet ลดลง", ok: false, why: "ส่งนานขึ้นจึงกินพลังงานต่อ packet มากขึ้น" }
      ] },
    { type: "blank",
      story: "สูตร data rate ของ LoRa",
      text: "Symbol rate = BW / {1} · Bit rate = {2} × Symbol rate · Data rate = Bit rate × {3}",
      blanks: [
        { opts: ["SF^2", "2^SF", "2×SF", "SF"], ans: 1, why: "chip/symbol = 2^SF" },
        { opts: ["CR", "BW", "SF", "2^SF"], ans: 2, why: "1 symbol เก็บ SF bit" },
        { opts: ["SF", "BW", "CR (เช่น 4/5)", "RSSI"], ans: 2, why: "คูณ Code Rate (FEC) ที่ลดข้อมูลจริง" }
      ] },
    { type: "blank",
      story: "โหนดมี TX power 14 dBm เสาอากาศ gain 3 dBi และ cable loss 1 dB",
      text: "EIRP = 14 + 3 − 1 = {1} dBm ≈ {2} mW · ถ้า RSSI ที่ gateway = −110 dBm และ sensitivity = −123 dBm ค่า Link margin = {3} dB",
      blanks: [
        { opts: ["12", "14", "16", "18"], ans: 2, why: "14+3−1 = 16 dBm" },
        { opts: ["25 mW", "40 mW", "100 mW", "160 mW"], ans: 1, why: "16 dBm = 10^1.6 ≈ 40 mW (14 dBm=25, +3 dB ≈ ×2 = 50, 16 ≈ 40)" },
        { opts: ["−13", "233", "13", "123"], ans: 2, why: "−110 − (−123) = 13 dB" }
      ] },
    { type: "blank",
      story: "Device class ของ LoRaWAN",
      text: "Class {1} เปิดรับ downlink สั้นๆ 2 ช่วงหลังส่ง uplink (ประหยัดสุด) · Class {2} เปิดรับตามเวลาที่ sync ด้วย beacon · Class {3} เปิดรับตลอด",
      blanks: [
        { opts: ["A", "B", "C", "D"], ans: 0, why: "Class A ประหยัดสุด" },
        { opts: ["A", "B", "C", "D"], ans: 1, why: "Class B ใช้ beacon sync" },
        { opts: ["A", "B", "C", "D"], ans: 2, why: "Class C เปิดรับตลอด" }
      ] },
    { type: "match",
      q: "จับคู่พารามิเตอร์/องค์ประกอบกับผลหรือหน้าที่",
      pairs: [
        ["เพิ่ม SF", "ไกลขึ้น sensitivity ดี แต่ช้าและ ToA นาน"],
        ["เพิ่ม BW", "เร็วขึ้น ToA สั้น แต่ sensitivity แย่ลง"],
        ["CR 4/8 (เทียบ 4/5)", "ทนข้อผิดพลาดดีขึ้น แต่ data rate ลด"],
        ["Network Server", "dedup, Join, ADR, MAC command, downlink scheduling"],
        ["Application Server", "ถอดรหัสด้วย AppSKey, decoder, dashboard"]
      ],
      why: "SF และ BW ต้องแลก range/sensitivity กับความเร็ว · CR คือระดับ FEC · Network Server จัดการเครือข่าย ส่วน Application Server จัดการข้อมูลแอปพลิเคชัน" }
  ]
});
