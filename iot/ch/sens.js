IOT.reg({
  id: "sens",
  title: "Sensor · I2C",
  th: "Sensor/Transducer, LDR, Thermistor, IR, Joystick, HC-SR04, บัส I2C, LCD และ SHT31 บน Raspberry Pi",
  summary: `
<ul>
<li><b>Sensor</b> = ตรวจจับปริมาณกายภาพ → เปลี่ยนเป็นค่าไฟฟ้า (R/C/L หรือ V/I) · <b>Transducer</b> = แปลงพลังงานรูปหนึ่งเป็นอีกรูปหนึ่ง (Sensor เป็น Transducer ชนิดหนึ่ง)</li>
<li>Sensor: Thermistor, LDR, Flex, Touch · Transducer อื่นๆ: Microphone, Piezo, Solar cell, Speaker/Buzzer, Motor, LED</li>
<li><b>LDR module</b>: A0 = analog (→ MCP3208 CH0) · D0 = digital 0/1 (เทียบ threshold ปรับด้วย potentiometer บนโมดูล) · Vcc 3.3 V</li>
<li><b>Thermistor</b> (NTC): R ลดเมื่ออุณหภูมิขึ้น · TTC05103: 10 kΩ @25°C, B25/50 = 4050 K · วงจรแบ่งแรงดัน Vout = Rth × 3.3 / (10k + Rth) → ADC</li>
<li><b>IR Obstacle module</b>: OUT = LOW เมื่อเจอสิ่งกีดขวาง, HIGH เมื่อไม่เจอ · ต้องตั้ง EN = HIGH ก่อน</li>
<li><b>Joystick</b>: VRx, VRy = analog (ต่อ ADC CH0, CH1) · SW = digital (GPIO)</li>
<li><b>HC-SR04</b>: TRIG HIGH <b>10 µs</b> → ส่งคลื่น 40 kHz · ECHO กว้างของพัลส์ = เวลาไป-กลับ · <b>distance (cm) = t × 17150</b> (เสียง 343 m/s, หาร 2 แล้ว)</li>
<li>ECHO ออก 5 V → ใช้ voltage divider: Vout = Vin × R2/(R1+R2) = 5 × 2/3 = <b>3.33 V</b> (R1 = 1 kΩ, R2 = 2 kΩ)</li>
<li><b>I2C</b>: 2 สาย <b>SDA</b> (data) + <b>SCL</b> (clock), synchronous, Master–Slave, แยกอุปกรณ์ด้วย <b>address</b> (ออกแบบโดย Philips)</li>
<li>เปิด I2C: <code>sudo raspi-config</code> → Interface Options → I5 I2C · ติดตั้ง <code>i2c-tools</code> · Pi 4 ใช้ <b>bus 1</b></li>
<li><code>i2cdetect -y 1</code> สแกน · <code>i2cget</code>/<code>i2cset</code> อ่าน/เขียน register · <code>i2ctransfer</code> (<code>w1@0x50 ..</code>, <code>r4@0x50</code>) · <code>-y</code> = ไม่ถามยืนยัน</li>
<li><b>I2C LCD 16x2</b> (PCF8574) address <b>0x27</b> · library <b>RPLCD</b> + smbus3: <code>CharLCD('PCF8574', 0x27, port=1, cols=16, rows=2)</code></li>
<li>RPLCD: <code>write_string()</code>, <code>crlf()</code>, <code>clear()</code>, <code>cursor_pos = (row, col)</code> · ต่อเลขต้อง <code>str(a)</code></li>
<li><b>SHT31</b> (Sensirion): RH 0–100 %RH (±2), Temp −40…+125 °C (±0.3), address <b>0x44</b></li>
<li>SHT31: ส่ง <code>[0x2C, 0x06]</code> (High repeatability) → รอ → อ่าน <b>6 byte</b> = T MSB, T LSB, CRC, H MSB, H LSB, CRC</li>
<li><b>T = −45 + 175 × raw / 65535 °C</b> · <b>RH = 100 × raw / 65535 %RH</b> · raw = MSB × 256 + LSB</li>
<li>ตัวอย่าง: T raw 27187 → 27.64 °C · H raw 35644 → 54.41 %RH</li>
<li><b>Clock stretching</b>: Slave ดึง SCL ค้าง LOW เพื่อให้ Master รอจนพร้อม</li>
</ul>`,
  sections: [
    { t: "Sensor และ Transducer", html: `
<h4>นิยาม</h4>
<ul>
<li><b>Sensor</b>: อุปกรณ์ตรวจจับปริมาณทางกายภาพ (physical parameter) ที่ไม่ใช่ไฟฟ้า เช่น อุณหภูมิ แสง แรงกด แล้วแปลงเป็นการเปลี่ยนแปลงทางไฟฟ้า ได้แก่ ค่าความต้านทาน (R), ความจุ (C), ความเหนี่ยวนำ (L) หรือแรงดัน/กระแส</li>
<li><b>Transducer</b>: อุปกรณ์แปลงพลังงานรูปหนึ่งเป็นอีกรูปหนึ่ง (input → output) ในระบบจริงมักมีวงจร Signal Conditioning ต่อท้ายเพื่อให้สัญญาณพร้อมนำไปใช้</li>
</ul>
<table>
<tr><th>ประเภท</th><th>ตัวอย่างในวิชา</th></tr>
<tr><td>Sensor</td><td>Thermistor (อุณหภูมิ), LDR (แสง), Flex sensor (การโค้งงอ), Touch sensor (การสัมผัส)</td></tr>
<tr><td>Transducer ทั่วไป</td><td>Microphone (เสียง → ไฟฟ้า), Piezoelectric, Solar cell (แสง → ไฟฟ้า), Speaker/Buzzer (ไฟฟ้า → เสียง), Motor (ไฟฟ้า → กล), LED (ไฟฟ้า → แสง)</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Sensor: ปริมาณกายภาพ → สัญญาณไฟฟ้า (ทิศทาง input) · Speaker, Motor, LED เป็น transducer แบบ output</li>
<li>Thermistor เปลี่ยน <b>ความต้านทาน</b> ตามอุณหภูมิ, LDR เปลี่ยน <b>ความต้านทาน</b> ตามแสง</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ทุก Sensor เป็น Transducer แต่ไม่ใช่ทุก Transducer ที่เป็น Sensor สิ่งที่ทำให้ต่างกันคือวัตถุประสงค์: Sensor เน้นการ "รับรู้" ปริมาณเพื่อวัด</div>` },

    { t: "LDR และ Thermistor (Analog Sensor)", html: `
<h4>LDR (Photoresistor)</h4>
<ul>
<li>ตัวต้านทานที่ค่าเปลี่ยนตามความเข้มแสง (โดยทั่วไปแสงมาก → R ต่ำ)</li>
<li><b>LDR Light Sensor Module</b> มีเอาต์พุตสองแบบ: <b>A0</b> (analog ระดับแสงต่อเนื่อง) และ <b>D0</b> (digital 0/1 โดยเทียบกับ threshold ที่ปรับด้วย potentiometer บนโมดูล)</li>
<li>การต่อ: Vcc → 3.3 V ของ Pi, GND → Ground, A0 → CH0 ของ MCP3208 (อ่านผ่าน SPI) · ถ้าใช้ D0 ให้ต่อเข้า GPIO ตรงๆ แล้วอ่านด้วย <code>GPIO.input()</code></li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> เลือก A0 เมื่อต้องการค่าละเอียด (เก็บ log, ทำกราฟ) · เลือก D0 เมื่อต้องการแค่ "มืด/สว่าง" เช่นเปิดไฟอัตโนมัติ</div>
<h4>Thermistor (NTC)</h4>
<ul>
<li>NTC = Negative Temperature Coefficient: อุณหภูมิ <b>สูงขึ้น → ความต้านทานลดลง</b> (ไม่เป็นเส้นตรง)</li>
<li>สมการ Beta: <code>R = R0 · exp(B · (1/T − 1/T0))</code> (T ใน Kelvin; R0 คือ R ที่ T0 = 25°C = 298.15 K)</li>
<li>ตัวอย่างโจทย์: NTC 10 kΩ, B = 3455 → ที่ 25°C R = 10 kΩ, ที่ 100°C R ≈ 974 Ω</li>
<li><b>TTC05103</b> (THINKING Electronics): NTC 10 kΩ @25°C, B25/50 = 4050 K, ช่วงใช้งาน −30°C ถึง +125°C</li>
<li>กราฟ R–T แสดงด้วย Log scale เพราะ R เปลี่ยนมากหลายเท่า</li>
</ul>
<h4>วงจรอ่านค่า Thermistor</h4>
<p>ต่อแบ่งแรงดันกับตัวต้านทาน 10 kΩ แล้วส่ง Vout เข้า ADC (MCP3208 CH0):</p>
<pre><code>Vout = Rthermistor × 3.3 / (10k + Rthermistor)
ADC  = Vout × 4096 / 3.3   (12 bit)</code></pre>
<p>ขั้นตอน: อ่าน ADC → แปลงเป็น Vout → หา Rthermistor → ใช้สมการ Beta หาอุณหภูมิ</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ที่ 25°C: Rth = 10 kΩ → Vout = 1.65 V → ADC ≈ 2048</li>
<li>ในวงจรที่ Thermistor อยู่ฝั่งล่าง (สูตรข้างบน) อุณหภูมิขึ้น → Rth ลด → Vout ลด → ค่า ADC ลด</li>
</ul></div>` },

    { t: "IR Obstacle และ Joystick", html: `
<h4>IR Obstacle Track Sensor Module</h4>
<ul>
<li>มี LED อินฟราเรด 2 ดวง (ตัวส่งและตัวรับ) · ตัวรับรับแสง IR ที่สะท้อนจากสิ่งกีดขวาง</li>
<li>ขา: GND, + (ต่อ 3.3 V ของ Pi), <b>OUT</b> → GPIO, <b>EN</b> → GPIO</li>
<li>ต้องตั้ง <b>EN = HIGH</b> ก่อนอ่านค่า OUT</li>
<li><b>OUT = LOW</b> เมื่อตรวจพบสิ่งกีดขวาง · <b>OUT = HIGH</b> เมื่อไม่พบ (ตรรกะกลับ)</li>
<li>ใช้ได้กับหุ่นยนต์เดินตามเส้น/หลบสิ่งกีดขวาง; ผลขึ้นกับสีและพื้นผิว (พื้นผิวสีเข้มสะท้อน IR น้อย)</li>
</ul>
<h4>XY Joystick</h4>
<ul>
<li>แกน X, Y เป็น <b>analog</b> 2 แกน (ตัวต้านทานปรับค่าได้ 2 ตัว) · ปุ่มกดเป็น <b>digital</b></li>
<li>ต่อ: GND, +5 (ในสไลด์ระบุ +5 หรือ 3.3 V; ควรใช้ 3.3 V เพื่อให้แรงดันที่เข้า ADC ไม่เกิน VREF), VRx → CH0, VRy → CH1 ของ MCP3208, SW → GPIO</li>
<li>ADC แบบ 10 bit ให้ค่า 0–1023 · ADC 12 bit (MCP3208) ให้ 0–4095 ค่ากลาง (จอยสติ๊กอยู่กลาง) จึงประมาณครึ่งสเกล</li>
</ul>
<div class="warn"><b>⚠️ ระวัง</b> เซนเซอร์ analog (LDR A0, VRx, VRy) ต้องผ่าน ADC · เซนเซอร์ digital (D0, OUT, SW) ต่อ GPIO ตรงๆ · จำให้แม่นว่า IR OUT เป็น LOW เมื่อ "เจอ" สิ่งกีดขวาง</div>` },

    { t: "Ultrasonic HC-SR04", html: `
<h4>หลักการ</h4>
<ul>
<li>Echolocation: ส่งคลื่นเสียงความถี่สูง (อัลตราโซนิก, 40 kHz สำหรับ HC-SR04) → สะท้อนวัตถุ → วัดเวลาไป-กลับ</li>
<li><b>TRIG</b>: ให้พัลส์ HIGH กว้าง <b>10 µs</b> เพื่อสั่งวัด · <b>ECHO</b>: ขึ้น HIGH ตั้งแต่ส่งคลื่นจนรับคลื่นสะท้อนกลับ ความกว้างพัลส์ = เวลาไป-กลับ</li>
<li>ใช้งาน: วัดระดับของเหลว (Liquid Level), เซนเซอร์ถอยหลังรถ</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ความเร็วเสียง 343 m/s = 34300 cm/s → ระยะ = (เวลาไป-กลับ × 34300) / 2 = <b>เวลา × 17150 cm</b></li>
<li>ตัวอย่าง: ECHO กว้าง 5.8 ms → 0.0058 × 17150 ≈ 99.5 cm</li>
<li>HC-SR04 ใช้ไฟ 5 V และ ECHO ออก 5 V แต่ GPIO ของ Pi ทนได้ 3.3 V → ต้องลดแรงดัน</li>
</ul></div>
<h4>Voltage Divider</h4>
<p>ECHO → R1 (1 kΩ) → จุดต่อเข้า GPIO → R2 (2 kΩ) → GND:</p>
<pre><code>Vout = Vin × R2 / (R1 + R2) = 5 × 2 / (1 + 2) = 3.33 V</code></pre>
<h4>โค้ด (BCM, TRIG = 23, ECHO = 24)</h4>
<pre><code>GPIO.setup(TRIG, GPIO.OUT); GPIO.setup(ECHO, GPIO.IN)
GPIO.output(TRIG, False); time.sleep(2)      # ให้เซนเซอร์นิ่ง
GPIO.output(TRIG, True); time.sleep(0.00001) # 10 us
GPIO.output(TRIG, False)
while GPIO.input(ECHO) == 0: pulse_start = time.time()
while GPIO.input(ECHO) == 1: pulse_end = time.time()
distance = (pulse_end - pulse_start) * 17150
print("Distance:", round(distance, 2), "cm")
GPIO.cleanup()</code></pre>
<div class="warn"><b>⚠️ ระวัง</b> 17150 รวมการหารสอง (ไป-กลับ) แล้ว · ถ้าใช้ 34300 ต้องหาร 2 เอง · ต่อ ECHO เข้า GPIO ตรงๆ ที่ 5 V อาจทำให้ขา GPIO เสียหาย</div>` },

    { t: "I2C Bus และ i2c-tools", html: `
<h4>I2C (Inter-Integrated Circuit)</h4>
<ul>
<li>บัสอนุกรมแบบ <b>synchronous</b> ใช้เพียง 2 สาย: <b>SDA</b> (Serial Data) และ <b>SCL</b> (Serial Clock) พัฒนาโดย Philips</li>
<li>โครงสร้าง Master–Slave: Master ควบคุม clock และเริ่มการสื่อสาร · แต่ละ Slave มี <b>Address</b> เฉพาะ จึงต่ออุปกรณ์หลายตัวบนสาย 2 เส้นเดียวกันได้ (ไม่ต้องมีขา CS แยกเหมือน SPI)</li>
</ul>
<table>
<tr><th></th><th>I2C</th><th>SPI</th></tr>
<tr><td>สาย</td><td>SDA, SCL (2 สาย)</td><td>MOSI, MISO, SCK, CS (4+ สาย)</td></tr>
<tr><td>เลือกอุปกรณ์</td><td>ด้วย address</td><td>ด้วยขา CS</td></tr>
<tr><td>ทิศทาง</td><td>half-duplex บนสาย SDA</td><td>full-duplex</td></tr>
</table>
<h4>เปิดใช้งานบน Raspberry Pi</h4>
<ul>
<li><code>sudo raspi-config</code> → <b>3 Interface Options</b> → <b>I5 I2C</b> → Yes → Yes (โหลด kernel module อัตโนมัติ) → Finish</li>
<li>ติดตั้งเครื่องมือ: <code>sudo apt-get install i2c-tools</code></li>
</ul>
<table>
<tr><th>คำสั่ง</th><th>หน้าที่</th></tr>
<tr><td><code>sudo i2cdetect -y 1</code></td><td>สแกนหา address ของอุปกรณ์บน bus 1 (Pi 4 ใช้ bus 1; <code>-y</code> = ไม่ถามยืนยัน)</td></tr>
<tr><td><code>i2cget -y 1 0x48 0x00</code></td><td>อ่านค่าจาก register (ต่อท้าย <code>w</code> = word 16 bit, <code>i</code> = block)</td></tr>
<tr><td><code>i2cset -y 1 0x48 0x00 0xFF</code></td><td>เขียนค่าลง register</td></tr>
<tr><td><code>i2ctransfer -y 1 w1@0x50 0x12</code></td><td>เขียน 1 byte ไปที่ address 0x50</td></tr>
<tr><td><code>i2ctransfer -y 1 r4@0x50</code></td><td>อ่าน 4 byte จาก address 0x50</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>I2C = <b>2 สาย (SDA + SCL)</b> · อุปกรณ์แยกด้วย address · <code>i2cdetect -y 1</code> ใช้ตรวจว่าเห็นอุปกรณ์หรือไม่</li>
<li>รูปแบบ i2ctransfer: <code>w&lt;length&gt;[@address]</code> เขียน, <code>r&lt;length&gt;[@address]</code> อ่าน</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ถ้า i2cdetect ไม่เห็นอุปกรณ์เลย ให้เช็ค (1) เปิด I2C ใน raspi-config แล้วหรือยัง (2) สาย SDA/SCL ไม่สลับ และ GND/ไฟถูก (3) ใช้ bus หมายเลขที่ถูก</div>` },

    { t: "I2C LCD 16x2 (PCF8574) และ RPLCD", html: `
<h4>ฮาร์ดแวร์</h4>
<ul>
<li>LCD ตัวอักษร 16 คอลัมน์ x 2 แถว (ตัวอักษร 5x8 พิกเซล) ที่มีชิป <b>PCF8574</b> (I/O expander) แปลงเป็นการสื่อสารแบบ I2C</li>
<li>ต่อ 4 สาย: Pi GND → GND, Pi 5V → Vcc, Pi SDA → SDA, Pi SCL → SCL</li>
<li>ตรวจด้วย <code>sudo i2cdetect -y 1</code> จะเห็น address <b>27</b> (0x27)</li>
</ul>
<h4>Library</h4>
<pre><code>$ sudo apt-get install python3-pip
$ sudo pip3 install RPLCD --break-system-packages
$ sudo pip3 install smbus3 --break-system-packages</code></pre>
<pre><code>from RPLCD.i2c import CharLCD
lcd = CharLCD(i2c_expander='PCF8574', address=0x27,
              port=1, cols=16, rows=2, charmap='A00',
              auto_linebreaks=True, backlight_enabled=True)
lcd.write_string("Hello, Raspberry")
lcd.crlf()                         # ขึ้นบรรทัดใหม่
lcd.write_string("I2C LCD Ready!")
lcd.clear()                        # ล้างหน้าจอ
lcd.cursor_pos = (1, 0)            # (row, col)
a = 24
lcd.write_string("Value: " + str(a))</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><code>port=1</code> = I2C bus 1 · <code>address</code> ต้องตรงกับที่ i2cdetect เห็น (0x27)</li>
<li><code>charmap='A00'</code> = ASCII มาตรฐาน (อีกชุดคือ A02) · <code>cursor_pos = (row, column)</code></li>
<li><code>write_string</code> รับ string เท่านั้น ต้องแปลงตัวเลขด้วย <code>str()</code></li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> <code>"Value: " + a</code> เมื่อ a เป็น int จะเกิด TypeError ต้องใช้ <code>str(a)</code></div>` },

    { t: "SHT31 (Temp/Humidity) และ smbus3", html: `
<h4>SHT31</h4>
<ul>
<li>เซนเซอร์อุณหภูมิ + ความชื้นสัมพัทธ์ ของ Sensirion ต่อแบบ I2C</li>
<li>ความชื้น: 0–100 %RH (±2 %RH) · อุณหภูมิ: −40 ถึง +125 °C (±0.3 °C)</li>
<li>Address <b>0x44</b> · ต่อ: Pi 3V3 → VIN, GND → GND, SDA → SDA, SCL → SCL</li>
<li>สั่งวัดครั้งเดียว (Single Shot) ด้วย command 2 byte เช่น <code>0x2C 0x06</code> (Clock stretching, High repeatability) หรือ <code>0x24 0x00</code> (ไม่ stretch) · รอให้วัดเสร็จ (High repeatability ราว 15 ms) แล้วอ่านกลับ <b>6 byte</b></li>
</ul>
<pre><code>$ sudo i2cdetect -y 1
$ sudo i2cset -y 1 0x44 0x24 0x00
$ sudo i2ctransfer -y 1 r6@0x44
0x6a 0x33 0xac 0x8b 0x3c 0x00</code></pre>
<table>
<tr><th>byte</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>ความหมาย</td><td>T MSB</td><td>T LSB</td><td>T CRC</td><td>H MSB</td><td>H LSB</td><td>H CRC</td></tr>
</table>
<h4>การแปลงค่า</h4>
<pre><code>raw_T = MSB*256 + LSB = 0x6a33 = 27187
raw_H = 0x8b3c = 35644
T  = -45 + 175 * 27187 / 65535 = 27.64 C
RH = 100 * 35644 / 65535      = 54.41 %RH</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><b>T = −45 + 175 × raw/65535</b> · <b>RH = 100 × raw/65535</b> (65535 = 2<sup>16</sup>−1)</li>
<li>CRC (byte 2 และ 5) ไม่ใช่ข้อมูลวัด · ความชื้นใช้ byte 3 และ 4</li>
</ul></div>
<h4>Clock Stretching</h4>
<p>ปกติ Master เป็นผู้ควบคุม clock แต่ถ้า Slave (เช่น sensor ที่กำลังวัดค่า) ยังไม่พร้อม Slave จะ <b>ดึงสาย SCL ค้างไว้ที่ LOW</b> เพื่อให้ Master รอ เมื่อพร้อมก็ปล่อยสาย Master จึงค่อยส่ง clock ต่อ</p>
<h4>smbus3 (Python)</h4>
<pre><code>import smbus3, time
bus = smbus3.SMBus(1)
bus.i2c_wr(0x44, [0x2C, 0x06])     # ส่งคำสั่งวัด
time.sleep(0.5)
msg = bus.i2c_rd(0x44, 6)          # อ่าน 6 byte
data = bytes(msg)
temp = data[0]*256 + data[1]
cTemp = -45 + (175 * temp / 65535.0)
humidity = 100 * (data[3]*256 + data[4]) / 65535.0</code></pre>
<table>
<tr><th>งาน</th><th>ฟังก์ชัน</th></tr>
<tr><td>เขียน 1 byte</td><td><code>bus.write_byte(addr, v)</code> / <code>bus.i2c_wr(addr, [v])</code></td></tr>
<tr><td>เขียนลง register</td><td><code>bus.write_byte_data(addr, reg, v)</code></td></tr>
<tr><td>เขียนหลาย byte</td><td><code>bus.write_i2c_block_data(addr, reg, list)</code></td></tr>
<tr><td>อ่าน 1 byte</td><td><code>bus.read_byte(addr)</code></td></tr>
<tr><td>อ่านจาก register</td><td><code>bus.read_byte_data(addr, reg)</code></td></tr>
<tr><td>อ่านหลาย byte</td><td><code>bus.read_i2c_block_data(addr, reg, n)</code> / <code>bus.i2c_rd(addr, n)</code></td></tr>
</table>` }
  ],
  ex: [
    { type: "choice",
      story: "อ่านข้อมูลดิบจาก SHT31 ได้ 6 byte: <code>0x66 0x66 0x00 0x80 0x00 0x00</code> (byte ที่ 2 และ 5 เป็น CRC) แล้วคำนวณตามสูตรของเซนเซอร์",
      q: "อุณหภูมิและความชื้นที่ได้คือข้อใด?",
      opts: [
        { t: "70.0 °C และ 50.0 %RH", why: "ผิด 70.0 °C เกิดจากลืมลบ 45 (175 × 0.4 = 70) สูตรที่ถูกคือ −45 + 175 × raw/65535" },
        { t: "25.0 °C และ 50.0 %RH", why: "ถูก raw_T = 0x6666 = 26214 = 0.4 × 65535 → −45 + 175 × 0.4 = 25.0 °C; raw_H = 0x8000 = 32768 → 100 × 32768/65535 ≈ 50.0 %RH" },
        { t: "25.0 °C และ 32.8 %RH", why: "ผิด 32.8 เกิดจากหาร raw ด้วย 1000 ไม่ใช่ 65535" },
        { t: "−45.0 °C และ 0 %RH", why: "ผิด เป็นค่าต่ำสุดเมื่อ raw = 0 เท่านั้น ข้อมูลนี้ไม่ใช่ศูนย์" }
      ], ans: 1 },

    { type: "choice",
      story: "ใช้ HC-SR04 กับโค้ดที่คำนวณ <code>distance = (pulse_end - pulse_start) * 17150</code> วัดความกว้างพัลส์ของ ECHO ได้ 5.8 ms",
      q: "ระยะถึงวัตถุประมาณเท่าใด?",
      opts: [
        { t: "ประมาณ 49.7 cm", why: "ผิด เกิดจากหาร 2 ซ้ำ ทั้งที่ 17150 รวมการหาร 2 (ไป-กลับ) ไว้แล้ว" },
        { t: "ประมาณ 5.8 cm", why: "ผิด เป็นการเอาตัวเลข ms มาอ่านเป็น cm โดยไม่คูณความเร็วเสียง" },
        { t: "ประมาณ 198.9 cm", why: "ผิด เกิดจากใช้ 34300 แทน 17150 จึงไม่ได้หารสองสำหรับระยะทางไป-กลับ" },
        { t: "ประมาณ 99.5 cm", why: "ถูก 0.0058 s × 17150 ≈ 99.47 cm (เสียง 343 m/s ไป-กลับ → 34300/2)" }
      ], ans: 3 },

    { type: "choice",
      story: "ต้องลดสัญญาณ ECHO ของ HC-SR04 ซึ่งออก 5 V ให้เหลือใกล้ 3.3 V (แต่ไม่ควรสูงเกินมาก) ก่อนเข้า GPIO ของ Pi โดยใช้ voltage divider: ECHO → R1 → จุดต่อเข้า GPIO → R2 → GND",
      q: "คู่ตัวต้านทานใดเหมาะสมที่สุด?",
      opts: [
        { t: "R1 = 330 Ω, R2 = 1 kΩ (≈ 3.76 V)", why: "ผิด Vout = 5 × 1000/1330 ≈ 3.76 V สูงกว่า 3.3 V มากเกินไป" },
        { t: "R1 = 2 kΩ, R2 = 1 kΩ (≈ 1.67 V)", why: "ผิด Vout = 5 × 1/3 ≈ 1.67 V ต่ำเกินไป อาจอ่าน HIGH ไม่เสถียร (R1 กับ R2 สลับกัน)" },
        { t: "R1 = 1 kΩ, R2 = 2 kΩ (≈ 3.33 V)", why: "ถูก Vout = 5 × 2/(1+2) ≈ 3.33 V ใกล้ระดับ logic 3.3 V ของ Pi" },
        { t: "R1 = 1 kΩ, R2 = 1 kΩ (= 2.5 V)", why: "ผิด 2.5 V ปลอดภัยแต่ไม่ใกล้ 3.3 V เท่าคู่ 1 kΩ/2 kΩ ซึ่งเป็นตัวเลือกที่เหมาะสมกว่าตามโจทย์" }
      ], ans: 2 },

    { type: "choice",
      story: "ต่อ I2C LCD กับ Raspberry Pi 4 แล้วรัน <code>sudo i2cdetect -y 1</code> ได้ข้อความ <code>Error: Could not open file /dev/i2c-1 or /dev/i2c/1: No such file or directory</code> ทั้งที่ต่อสาย SDA/SCL ถูกต้อง",
      q: "สาเหตุที่น่าจะเป็นที่สุดและสิ่งที่ควรทำคืออะไร?",
      opts: [
        { t: "ยังไม่ได้เปิดใช้ I2C — ต้องเปิดที่ raspi-config → Interface Options → I2C แล้ว reboot", why: "ถูก ข้อความระบุว่าไม่พบไฟล์อุปกรณ์ /dev/i2c-1 แปลว่า driver ยังไม่ถูกโหลด ไม่ใช่เรื่องสาย" },
        { t: "LCD ใช้ address 0x44 ต้องเปลี่ยน address ในโค้ด", why: "ผิด ยังสแกนไม่ได้ด้วยซ้ำ จึงไม่เกี่ยวกับ address ของอุปกรณ์" },
        { t: "ต้องเปลี่ยนเป็น i2cdetect -y 0 เพราะ Pi 4 ใช้ bus 0", why: "ผิด Pi 4 (OS ปัจจุบัน) ใช้ bus 1 ตามตัวอย่าง" },
        { t: "ต้องติดตั้ง RPLCD ก่อน i2cdetect จึงทำงาน", why: "ผิด i2cdetect อยู่ใน i2c-tools ไม่เกี่ยวกับไลบรารี Python" }
      ], ans: 0 },

    { type: "choice",
      story: "i2cdetect -y 1 แสดงตารางที่มีตัวเลข <code>3f</code> ในตำแหน่ง address 0x3F เพียงตำแหน่งเดียว แต่โค้ดสร้างออบเจกต์ว่า <code>CharLCD('PCF8574', 0x27, port=1, cols=16, rows=2)</code> แล้วหน้าจอไม่แสดงอะไรและเกิด I/O error",
      q: "ควรแก้ที่ใด?",
      opts: [
        { t: "เปลี่ยน cols และ rows เป็นค่าอื่น", why: "ผิด ขนาดจอไม่ทำให้เกิด I/O error ในการเข้าถึง address" },
        { t: "ติดตั้ง smbus3 ใหม่ด้วย --break-system-packages", why: "ผิด error เกิดเพราะ address ไม่มีอุปกรณ์ตอบสนอง ไม่ใช่เพราะขาด library" },
        { t: "เปลี่ยน address ในโค้ดเป็น 0x3F ให้ตรงกับที่ i2cdetect เจอ", why: "ถูก address ต้องตรงกับที่สแกนพบ (โมดูลบางรุ่นใช้ 0x3F แทน 0x27)" },
        { t: "ต่อสาย SDA และ SCL สลับกัน", why: "ผิด ถ้าสลับสาย i2cdetect จะไม่เห็นอุปกรณ์เลย แต่ที่นี่เห็นอุปกรณ์ครบ" }
      ], ans: 2 },

    { type: "choice",
      story: "วงจรวัดอุณหภูมิใช้ NTC thermistor 10 kΩ ต่อแบ่งแรงดันกับ resistor 10 kΩ ตามสูตร <code>Vout = Rth × 3.3 / (10k + Rth)</code> แล้วอ่านผ่าน MCP3208 (12 bit, VREF 3.3 V) ที่ 25°C Rth = 10 kΩ ต่อมาเอาเครื่องเป่าลมร้อนมาเป่าเซนเซอร์",
      q: "ค่า ADC ที่ 25°C และแนวโน้มเมื่อโดนลมร้อนเป็นอย่างไร?",
      opts: [
        { t: "ประมาณ 4095 และเพิ่มขึ้น", why: "ผิด ที่ Rth = 10 kΩ ได้ Vout = 1.65 V (ครึ่ง VREF) ไม่ใช่เต็มสเกล" },
        { t: "ประมาณ 2048 และลดลง เพราะ Rth ลดลงทำให้ Vout ลดลง", why: "ถูก Vout = 1.65 V → ADC = 1.65 × 4096/3.3 = 2048 เมื่อร้อนขึ้น NTC มี R ต่ำลง Vout = Rth×3.3/(10k+Rth) จึงลดลง" },
        { t: "ประมาณ 2048 และเพิ่มขึ้น เพราะ NTC ร้อนขึ้นแล้วต้านทานมากขึ้น", why: "ผิด NTC มีค่าความต้านทานลดลงเมื่ออุณหภูมิสูงขึ้น ไม่ใช่เพิ่มขึ้น" },
        { t: "ประมาณ 1024 และไม่เปลี่ยนแปลง", why: "ผิด ที่ 10 kΩ ADC ประมาณ 2048 และค่านี้ต้องเปลี่ยนตามอุณหภูมิ ไม่เช่นนั้นจะวัดไม่ได้" }
      ], ans: 1 },

    { type: "choice",
      story: "ต้องการเก็บ log ความเข้มแสงในห้องทุกนาทีเป็นตัวเลขเพื่อนำไปวาดกราฟตลอดวัน โดยใช้ LDR light sensor module (มีขา A0 และ D0) กับ Raspberry Pi และ MCP3208",
      q: "ควรต่อและอ่านอย่างไร?",
      opts: [
        { t: "ต่อ D0 เข้า GPIO แล้วใช้ GPIO.input() อ่านค่า", why: "ผิด D0 ให้เพียง 0/1 ตาม threshold ไม่ได้ให้ตัวเลขละเอียดสำหรับกราฟ" },
        { t: "ต่อ A0 เข้า GPIO แล้วใช้ GPIO.PWM() อ่านค่า", why: "ผิด GPIO ของ Pi ไม่รับ analog และ PWM เป็นสัญญาณเอาต์พุต" },
        { t: "ต่อ D0 เข้า MCP3208 CH0 และปรับ potentiometer บนโมดูลทุกนาที", why: "ผิด D0 เป็น digital การเข้า ADC ก็ยังได้ค่าแค่สองระดับ และการปรับมือไม่เหมาะกับงาน log อัตโนมัติ" },
        { t: "ต่อ A0 เข้า CH0 ของ MCP3208 แล้วอ่านค่า 0–4095 ผ่าน SPI", why: "ถูก A0 เป็นแรงดัน analog ที่แปรตามแสง ADC 12 bit ให้ค่าละเอียดสำหรับทำกราฟ" }
      ], ans: 3 },

    { type: "choice",
      story: "ขณะอ่าน SHT31 พบว่าถ้าส่งคำสั่งวัดแบบ clock stretching แล้วอ่านทันที สาย SCL ถูก Slave ดึงค้างไว้ที่ LOW อยู่ช่วงหนึ่งก่อนที่ข้อมูลจะพร้อมอ่าน",
      q: "ปรากฏการณ์นี้คืออะไรและ Master ควรทำอย่างไร?",
      opts: [
        { t: "Clock stretching — Master ต้องรอจนกว่า Slave ปล่อยสาย SCL แล้วจึงส่ง clock ต่อ", why: "ถูก Slave ที่ยังไม่พร้อมจะ hold SCL ที่ LOW เพื่อบอก Master ให้รอ (Synchronize)" },
        { t: "Bus collision — Master ต้องรีเซ็ต Pi ใหม่", why: "ผิด การ hold SCL เป็นกลไกปกติตามมาตรฐานของ I2C ไม่ใช่ข้อผิดพลาดที่ต้องรีเซ็ต" },
        { t: "สายขาด — ต้องเปลี่ยนสาย SDA", why: "ผิด สายขาดจะทำให้เห็นอุปกรณ์ไม่ได้ ไม่ใช่การดึง SCL ชั่วคราว" },
        { t: "Master ต้องเพิ่มความถี่ clock เพื่อให้ Slave ตอบเร็วขึ้น", why: "ผิด Slave ที่ช้าอยู่ต้องการเวลา การเร่ง clock ไม่ช่วยและจะเลวร้ายลง" }
      ], ans: 0 },

    { type: "multi",
      story: "ข้อความเกี่ยวกับบัส I2C บน Raspberry Pi",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "ใช้สาย 2 เส้นคือ SDA และ SCL", ok: true, why: "ถูก SDA = ข้อมูล, SCL = clock" },
        { t: "แต่ละ Slave ต้องมีขา CS แยกเพื่อให้ Master เลือก", ok: false, why: "ผิด นั่นคือ SPI ส่วน I2C ใช้ address ในสัญญาณข้อมูล" },
        { t: "อุปกรณ์หลายตัวต่อบนสาย SDA/SCL ชุดเดียวกันได้ถ้า address ไม่ซ้ำกัน", ok: true, why: "ถูก เช่น LCD ที่ 0x27 และ SHT31 ที่ 0x44 อยู่บน bus 1 พร้อมกัน" },
        { t: "ใช้ i2cdetect -y 0 สำหรับ Raspberry Pi 4 ตามตัวอย่าง", ok: false, why: "ผิด ตัวอย่างใช้ bus 1 (-y 1)" },
        { t: "Master เป็นผู้เริ่มการสื่อสารและสร้างสัญญาณ clock", ok: true, why: "ถูก (Slave อาจดึง SCL ชั่วคราวด้วย clock stretching)" },
        { t: "I2C เป็นบัสแบบ asynchronous ไม่มีสาย clock", ok: false, why: "ผิด I2C เป็น synchronous และมีสาย SCL" }
      ] },

    { type: "multi",
      story: "จัดประเภทอุปกรณ์ในวงจร IoT",
      q: "เลือกทุกข้อที่เป็น Sensor (ตรวจจับปริมาณกายภาพ แล้วเปลี่ยนเป็นค่าไฟฟ้า)",
      opts: [
        { t: "Thermistor", ok: true, why: "ถูก อุณหภูมิ → ความต้านทาน" },
        { t: "LDR", ok: true, why: "ถูก แสง → ความต้านทาน" },
        { t: "Speaker / Buzzer", ok: false, why: "ผิด แปลงไฟฟ้าเป็นเสียง (เอาต์พุต)" },
        { t: "LED", ok: false, why: "ผิด แปลงไฟฟ้าเป็นแสง (เอาต์พุต)" },
        { t: "Flex sensor", ok: true, why: "ถูก การโค้งงอ → ความต้านทาน" },
        { t: "Motor", ok: false, why: "ผิด แปลงไฟฟ้าเป็นพลังงานกล (เอาต์พุต)" }
      ] },

    { type: "blank",
      story: "ตรวจและใช้ I2C บน Raspberry Pi 4",
      text: "คำสั่งสแกนอุปกรณ์คือ <code>sudo i2cdetect -y {1}</code> โมดูล SHT31 มี address {2} ส่วน I2C LCD ที่ใช้ชิป PCF8574 ในตัวอย่างพบที่ {3}",
      blanks: [
        { opts: ["0", "1", "2", "27"], ans: 1, why: "Pi 4 ใช้ bus 1" },
        { opts: ["0x27", "0x48", "0x44", "0x50"], ans: 2, why: "SHT31 ใช้ address 0x44 (68)" },
        { opts: ["0x44", "0x27", "0x3C", "0x48"], ans: 1, why: "LCD PCF8574 ในตัวอย่างพบที่ 0x27" }
      ] },

    { type: "blank",
      text: "สูตรแปลงข้อมูลดิบ SHT31: อุณหภูมิ T = {1} + {2} × raw / {3} °C ส่วนความชื้นคือ 100 × raw / 65535 %RH",
      blanks: [
        { opts: ["-40", "-45", "-50", "0"], ans: 1, why: "ออฟเซ็ตของสูตรอุณหภูมิคือ −45" },
        { opts: ["125", "175", "100", "65535"], ans: 1, why: "ช่วงสเกล 175 °C (จาก −45 ถึง 130 ในสูตรของเซนเซอร์)" },
        { opts: ["65536", "4096", "65535", "255"], ans: 2, why: "ข้อมูล 16 bit เต็มสเกล = 2^16 − 1 = 65535" }
      ] },

    { type: "blank",
      text: "HC-SR04 เริ่มวัดเมื่อให้ขา TRIG เป็น HIGH นาน {1} ระยะทาง (cm) = เวลาของพัลส์ ECHO × {2} และถ้าใช้ divider R1 = 1 kΩ, R2 = 2 kΩ กับ ECHO 5 V จะได้แรงดันเข้า GPIO ประมาณ {3}",
      blanks: [
        { opts: ["1 ms", "10 µs", "10 ms", "1 s"], ans: 1, why: "TRIG ต้องเป็นพัลส์ HIGH ประมาณ 10 µs" },
        { opts: ["343", "1715", "17150", "34300"], ans: 2, why: "17150 = 34300/2 (เสียง 34300 cm/s หารสองเพราะไป-กลับ)" },
        { opts: ["3.33 V", "1.67 V", "2.5 V", "5 V"], ans: 0, why: "5 × 2/(1+2) = 3.33 V" }
      ] },

    { type: "match",
      q: "จับคู่คำสั่ง/ฟังก์ชันกับหน้าที่",
      pairs: [
        ["i2cdetect -y 1", "สแกนหา address ของอุปกรณ์บน bus 1"],
        ["i2cget", "อ่านค่าจาก register ของอุปกรณ์"],
        ["i2cset", "เขียนค่าลง register ของอุปกรณ์"],
        ["i2ctransfer r4@0x50", "อ่าน 4 byte จากอุปกรณ์ address 0x50"],
        ["bus.i2c_rd(0x44, 6)", "อ่านข้อมูล 6 byte ด้วย smbus3"]
      ],
      why: "i2c-tools เป็นเครื่องมือบรรทัดคำสั่ง (detect/get/set/transfer) ส่วน smbus3 คือไลบรารี Python ที่เรียกใช้ในโปรแกรม เช่น i2c_rd อ่านข้อมูลหลาย byte จาก address ที่กำหนด" }
  ]
});
