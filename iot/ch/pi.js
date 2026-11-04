IOT.reg({
  id: "pi",
  title: "Raspberry Pi · GPIO · ADC · PWM",
  th: "ฮาร์ดแวร์และการตั้งค่า Raspberry Pi 4, GPIO (BCM/BOARD, pull-up), ADC และ resolution, SPI + MCP3208, PWM",
  summary: `
<ul>
<li><b>Raspberry Pi 4 B</b> (มิ.ย. 2019): CPU 1.5 GHz 64-bit quad-core Cortex-A72, RAM 1/2/4 GB LPDDR4, <b>40 GPIO</b>, Gigabit Ethernet, Wi-Fi 2.4/5 GHz, Bluetooth 5.0, USB-C, micro HDMI x2, CSI (กล้อง), DSI (จอ)</li>
<li>ลง OS ด้วย <b>Raspberry Pi Imager</b> → เลือก Device / OS (เช่น Pi OS Lite) / Storage → ตั้งค่า hostname, timezone, user/password, Wi-Fi SSID, <b>Enable SSH</b> → Write</li>
<li>เข้าเครื่อง: จอ+คีย์บอร์ด, SSH ผ่าน Wi-Fi (<code>raspberrypi.local</code>, port <b>22</b>, PuTTY) หรือ LAN (กำหนด IP ใน <code>cmdline.txt</code>)</li>
<li>Static IP: <code>/etc/dhcpcd.conf</code> (interface, static ip_address, routers, domain_name_servers) หรือ <code>sudo nmtui</code></li>
<li>คำสั่ง: <code>ls, cd, df -h, hostname, ifconfig, passwd, nmtui, raspi-config</code> · รัน: <code>python3 file.py</code></li>
<li><b>GPIO</b>: <code>GPIO.setmode(GPIO.BCM)</code> = เลข GPIO (GPIO4 = pin 7) · <code>GPIO.BOARD</code> = เลขขา (pin 12 = GPIO18) · <code>setup(pin, OUT/IN)</code>, <code>output(pin, True/False)</code>, <code>input(pin)</code></li>
<li>ระดับไฟ GPIO = <b>3.3 V</b> · Pull-up: กดสวิตช์ = LOW (อ่านได้ False) · Pull-down: กดสวิตช์ = HIGH · ห้ามปล่อย input ลอย (floating)</li>
<li>Analog → Digital: <b>Sampling</b> (fs ≥ 2·fm) + <b>Quantization/Encoding</b> · n-bit มี 2<sup>n</sup> ระดับ (0 … 2<sup>n</sup>−1)</li>
<li><b>ADC = V × 2<sup>n</sup> / Vref</b> · <b>V = ADC × Vref / 2<sup>n</sup></b> (ตัวอย่าง 6-bit, 3.3 V, ADC=20 → 1.03125 V)</li>
<li><b>MCP3208</b>: 12-bit (0–4095), 8 channel, 100 kSamp/s, สื่อสารด้วย <b>SPI</b> (CLK, DOUT, DIN, CS) · step = 3.3/4096 = 0.8056 mV</li>
<li><b>SPI</b>: synchronous, full-duplex, Master–Slave · MOSI (M→S), MISO (S→M), SCK (clock จาก Master), CS (เลือก Slave)</li>
<li>spidev: <code>spi.open(0,0)</code>, <code>spi.max_speed_hz</code>, <code>spi.xfer2([...])</code> ส่ง/รับ <b>3 byte</b> · เปิด SPI ที่ <code>raspi-config</code> ก่อน</li>
<li>คำสั่งเลือก channel: <code>[6 | (ch &amp; 4) &gt;&gt; 2, (ch &amp; 3) &lt;&lt; 6, 0]</code> (ch0 = [6,0,0], ch6 = [7,128,0])</li>
<li>ถอดค่า: <code>data = ((adc[1] &amp; 15) &lt;&lt; 8) + adc[2]</code> · แรงดัน = data × 3.3 / 4096</li>
<li><b>PWM</b>: ปรับ Duty Cycle (0–100%) ของ pulse ที่ความถี่คงที่ → ควบคุมความสว่าง LED / ความเร็วมอเตอร์</li>
<li>PWM API: <code>p = GPIO.PWM(pin, freq)</code>, <code>p.start(dc)</code>, <code>p.ChangeDutyCycle(dc)</code>, <code>p.ChangeFrequency(f)</code>, <code>p.stop()</code></li>
</ul>
<table>
<tr><th>BCM</th><th>BOARD</th></tr>
<tr><td>LIGHT = 4 (GPIO4)</td><td>ledpin = 12 (GPIO18)</td></tr>
</table>`,
  sections: [
    { t: "Raspberry Pi 4 และการลง OS", html: `
<h4>Raspberry Pi คืออะไร</h4>
<p>คอมพิวเตอร์ราคาถูกขนาดเท่าบัตรเครดิต ต่อจอ/คีย์บอร์ด/เมาส์ได้ ใช้เรียนรู้การเขียนโปรแกรม (Scratch, Python) และนำไปทำงาน IoT ได้ เพราะมีขา GPIO สำหรับต่ออุปกรณ์ภายนอก</p>
<table>
<tr><th>หัวข้อ</th><th>Raspberry Pi 4 Model B</th></tr>
<tr><td>CPU</td><td>1.5 GHz 64-bit quad-core Cortex-A72</td></tr>
<tr><td>RAM</td><td>1 / 2 / 4 GB LPDDR4</td></tr>
<tr><td>พอร์ต</td><td>micro HDMI x2, USB 2.0 x2 + USB 3.0 x2, Gigabit Ethernet, USB-C (ไฟเลี้ยง)</td></tr>
<tr><td>ไร้สาย</td><td>Wi-Fi 802.11n/ac (2.4 + 5 GHz), Bluetooth 5.0 / BLE</td></tr>
<tr><td>อื่นๆ</td><td>40 GPIO, CSI (กล้อง), DSI (จอ), micro SD slot, 3.5 mm audio/composite</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Pi 4 B เปิดตัว มิ.ย. 2019 · CPU Cortex-A72 1.5 GHz · RAM สูงสุด 4 GB (ในสไลด์) · <b>40 GPIO</b></li>
<li>ไฟเลี้ยงของ Pi 4 เปลี่ยนเป็น <b>USB type C</b> (Pi 3 เป็น micro USB)</li>
</ul></div>
<h4>ขั้นตอนลง OS ด้วย Raspberry Pi Imager</h4>
<ul>
<li>ต้องมี microSD card + card reader, โหลด Imager จาก raspberrypi.com/software</li>
<li>เลือก <b>Device</b> = Raspberry Pi 4 → <b>OS</b> = Raspberry Pi OS (other) → Raspberry Pi OS <b>Lite</b> (32 bit) (ไม่มี desktop) → <b>Storage</b> = SD card</li>
<li>กด Next → Edit settings (custom): hostname, time zone, username/password, SSID + password ของ Wi-Fi, <b>Enable SSH</b>, Raspberry Pi Connect</li>
<li>กด Write แล้วรอจน FINISH → ใส่ SD card ในบอร์ดแล้วจ่ายไฟ</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> ตั้งค่า Wi-Fi + SSH ตั้งแต่ตอน Write จะทำให้เครื่องเชื่อมต่อได้เองโดยไม่ต้องมีจอ (headless)</div>` },

    { t: "การเข้าถึงเครื่องและตั้งค่าเครือข่าย", html: `
<h4>วิธีเข้าใช้งาน Raspberry Pi</h4>
<table>
<tr><th>วิธี</th><th>อุปกรณ์/ขั้นตอน</th></tr>
<tr><td>Console ตรง</td><td>จอ HDMI + เมาส์/คีย์บอร์ด + power adapter แล้ว login (ในสไลด์ default: user <code>pi</code> / password <code>raspberry</code>)</td></tr>
<tr><td>SSH ผ่าน Wi-Fi</td><td>ตั้ง SSID/password ตอน Imager → PuTTY: host <code>raspberrypi.local</code> (hostname + <code>.local</code>), port <b>22</b>, ชนิด SSH</td></tr>
<tr><td>SSH ผ่าน LAN</td><td>สาย LAN เข้า switch → แก้ <code>cmdline.txt</code> ใน SD card เพิ่ม IP address (วงเดียวกับเครื่อง PC) → PuTTY host = IP address</td></tr>
</table>
<p>PuTTY ใช้โปรโตคอล <b>Secure Shell v2 (SSH)</b> เข้ารหัสการสื่อสาร ต่างจาก Telnet ที่เป็น plain text</p>
<h4>กำหนด Static IP</h4>
<p>ต้องรู้ IP address, Subnet mask, Gateway (IP ของ Router), DNS Server วิธีที่ 1 แก้ไฟล์:</p>
<pre><code>$ sudo nano /etc/dhcpcd.conf
interface eth0
static ip_address=10.30.4.1XX/24
static routers=10.30.4.1
static domain_name_servers=8.8.8.8
(Ctrl+X → Y เพื่อ save)  แล้วทดสอบ  $ ping www.google.com</code></pre>
<p>วิธีที่ 2: <code>sudo nmtui</code> (เมนูกราฟิกแบบตัวอักษร) เลือก Edit a connection แล้วตั้ง IP, gateway, DNS</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>SSH port = <b>22</b> · Static IP แก้ที่ <code>/etc/dhcpcd.conf</code> · เครื่องมือ UI ข้อความ = <code>nmtui</code></li>
<li><code>cmdline.txt</code> ใช้ตั้ง IP ตอนต่อสาย LAN ครั้งแรก (ต้องเป็น subnet เดียวกับ PC)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> ค่า IP ใน <code>cmdline.txt</code> เป็นการตั้งชั่วคราวสำหรับ remote เข้าเครื่องครั้งแรก ถ้าย้ายเครือข่ายต้องปรับ IP/Subnet/Gateway ให้ตรงกับเครือข่ายใหม่</div>` },

    { t: "Linux command และ Python เบื้องต้น", html: `
<h4>คำสั่ง Linux พื้นฐาน</h4>
<table>
<tr><th>คำสั่ง</th><th>หน้าที่</th></tr>
<tr><td><code>ls</code></td><td>แสดงรายการไฟล์</td></tr>
<tr><td><code>cd</code> / <code>cd ..</code> / <code>cd /</code></td><td>เปลี่ยน directory / ถอยหนึ่งชั้น / ไป root</td></tr>
<tr><td><code>df -h</code></td><td>ดูพื้นที่ file system (หน่วยอ่านง่าย)</td></tr>
<tr><td><code>sudo raspi-config</code></td><td>ตั้งค่าระบบ เช่น Expand File System, เปิด SPI / I2C</td></tr>
<tr><td><code>hostname</code>, <code>ifconfig</code></td><td>ดูชื่อเครื่อง / ดู IP address</td></tr>
<tr><td><code>passwd</code></td><td>เปลี่ยนรหัสผ่าน</td></tr>
<tr><td><code>sudo nmtui</code></td><td>เปลี่ยน hostname, Wi-Fi SSID, IP address</td></tr>
</table>
<p>เมื่อลง OS ลงการ์ดที่ใหญ่กว่า image ให้ใช้ <b>raspi-config → Advanced → Expand Filesystem</b> แล้ว Finish + Reboot เพื่อใช้พื้นที่ SD card เต็ม</p>
<h4>Python บน Pi</h4>
<ul>
<li>Python 3 ติดมากับ Raspberry Pi OS (ในสไลด์ 3.13.5) ตรวจด้วย <code>python3 --version</code></li>
<li>ไวยากรณ์พื้นฐาน: <code>print</code>, ตัวแปร, <code>+ - * /</code>, <code>== &gt;= &lt;= &gt; &lt;</code>, <code>if / else</code>, <code>while</code> (ใช้ indentation แบ่ง block)</li>
<li>เขียนไฟล์ด้วย <code>nano helloworld.py</code> แล้วรัน <code>python3 helloworld.py</code> หรือ <code>sudo python3 helloworld.py</code> (ใช้ sudo เมื่อต้องเข้าถึง hardware บาง library)</li>
</ul>
<div class="note"><b>💡 หมายเหตุ</b> ใน Python 3 ต้องเขียน <code>print("Hello")</code> ด้วยวงเล็บ รูปแบบ <code>print "Hello"</code> เป็นของ Python 2</div>` },

    { t: "GPIO: Output, Input และ Pull-up/Pull-down", html: `
<h4>GPIO Output: LED Blink</h4>
<pre><code>import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)      # ใช้เลข GPIO ของชิป Broadcom
LIGHT = 4                   # GPIO4 (= physical pin 7)
GPIO.setup(LIGHT, GPIO.OUT) # ตั้งเป็น Output
while True:
    GPIO.output(LIGHT, True)   # HIGH = 3.3 V → LED ติด
    time.sleep(0.5)
    GPIO.output(LIGHT, False)  # LOW = 0 V → LED ดับ
    time.sleep(0.5)</code></pre>
<p>LED ต่ออนุกรมกับตัวต้านทาน (ในแล็บ 100 Ω) ลง GND เพื่อจำกัดกระแส</p>
<table>
<tr><th>โหมดการนับขา</th><th>ความหมาย</th><th>ตัวอย่าง</th></tr>
<tr><td><code>GPIO.BCM</code></td><td>เลข GPIO ตามชิป Broadcom</td><td>LIGHT = 4 → GPIO4 = pin 7</td></tr>
<tr><td><code>GPIO.BOARD</code></td><td>เลขขาทางกายภาพบนบอร์ด</td><td>ledpin = 12 → GPIO18</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>GPIO4 = physical pin <b>7</b> · physical pin <b>12</b> = GPIO18 (ขา PWM)</li>
<li>ต้องเรียก <code>setmode</code> ก่อน <code>setup</code> เสมอ และต้องใช้เลขให้ตรงกับโหมดที่เลือก</li>
</ul></div>
<h4>GPIO Input และสวิตช์</h4>
<ul>
<li><code>GPIO.setup(4, GPIO.IN)</code> แล้วอ่านด้วย <code>val = GPIO.input(4)</code> ได้ True (HIGH) หรือ False (LOW)</li>
<li>ขา GPIO ของ Pi ทำงานที่ <b>3.3 V</b> ห้ามป้อน 5 V เข้าขา input โดยตรง</li>
<li>Input ที่ไม่ต่ออะไรจะ <b>ลอย (floating)</b> อ่านค่าสุ่ม จึงต้องมี resistor pull-up หรือ pull-down (ในแล็บใช้ 10 kΩ)</li>
</ul>
<table>
<tr><th></th><th>Pull-up</th><th>Pull-down</th></tr>
<tr><td>Resistor ต่อกับ</td><td>3.3 V</td><td>GND</td></tr>
<tr><td>ไม่กดสวิตช์</td><td>HIGH</td><td>LOW</td></tr>
<tr><td>กดสวิตช์</td><td><b>LOW</b> (สวิตช์ลง GND)</td><td><b>HIGH</b> (สวิตช์ไป 3.3 V)</td></tr>
</table>
<div class="warn"><b>⚠️ ระวัง</b> วงจร pull-up ตรรกะกลับกัน: ตรวจว่ากดด้วย <code>if GPIO.input(4) == False</code> (ตัวอย่างสวิตช์หลายตัว: S1→GPIO4, S2→GPIO5, S3→GPIO6 ตรวจแต่ละขาว่าเป็น False แล้ว print "Press S1" เป็นต้น)</div>
<h4>สวิตช์หลายตัว / Matrix / Keypad</h4>
<p>ใช้ขา input หลายขาอ่านสวิตช์หลายตัว หรือแบบ Matrix สั่งขา output ลง LOW ทีละแถว (<code>GPIO.output(2, False)</code>) แล้วอ่านขา input เพื่อลดจำนวนขา · Keypad คือการต่อสวิตช์แบบ matrix: แถวเป็น output, คอลัมน์เป็น input (หรือสลับกัน)</p>` },

    { t: "Analog, Sampling, Resolution และสูตร ADC", html: `
<h4>Analog vs Digital</h4>
<ul>
<li>สัญญาณ <b>Analog</b> ต่อเนื่องทั้งเวลาและแอมพลิจูด (analogous กับปริมาณจริง) เช่น เสียง, อุณหภูมิ, ECG จาก sensor</li>
<li>สัญญาณ <b>Digital</b> เป็นค่าไม่ต่อเนื่อง (ระดับ 0/1) ประมวลผลด้วย chip ได้</li>
<li>Analog Signal Processing: ขยาย (amplifier), กรอง (filter), ผสม (mix) · Digital Signal Processing (DSP) ทำด้วยชิป</li>
<li>Raspberry Pi <b>ไม่มี ADC ในตัว</b> ต้องต่อ ADC ภายนอก เช่น MCP3208</li>
</ul>
<h4>ขั้นตอนแปลง Analog → Digital</h4>
<ul>
<li><b>Sampling</b>: เก็บตัวอย่างเป็นช่วงเวลา ต้อง <b>fs ≥ 2·fm</b> (Nyquist) เช่นสัญญาณ 4 kHz ต้องสุ่มอย่างน้อย 8 kHz</li>
<li><b>Quantization + Encoding</b>: ปัดค่าเข้าระดับที่ใกล้ที่สุดแล้วเข้ารหัสเป็นเลขฐานสอง → เกิด quantization noise</li>
<li><b>Resolution</b> (จำนวนบิต) สูง = จำนวนระดับมาก = ละเอียดขึ้น</li>
</ul>
<table>
<tr><th>n-bit</th><th>จำนวนระดับ 2<sup>n</sup></th><th>ช่วงค่า</th><th>step (Vref 3.3 V)</th></tr>
<tr><td>2</td><td>4</td><td>0–3</td><td>0.825 V</td></tr>
<tr><td>6</td><td>64</td><td>0–63</td><td>51.6 mV</td></tr>
<tr><td>10</td><td>1024</td><td>0–1023</td><td>3.22 mV</td></tr>
<tr><td>12</td><td>4096</td><td>0–4095</td><td>0.8056 mV</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li><b>ADC = V × 2<sup>n</sup> / Vref</b> และ <b>V = ADC × Vref / 2<sup>n</sup></b> · ค่าสูงสุด = 2<sup>n</sup> − 1</li>
<li>ตัวอย่างสไลด์: 2-bit, 5 V → step = 5/4 = 1.25 V (ADC 0,1,2,3 = 0, 1.25, 2.5, 3.75 V)</li>
<li>6-bit, Vref 3.3 V, ADC = 20 → V = 20 × 3.3 / 64 = <b>1.03125 V</b></li>
<li>12-bit, Vref 3.3 V: step = 3.3/4096 = <b>0.8056 mV</b>; ADC 4095 ≈ 3.2991 V</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> หารด้วย 2<sup>n</sup> (4096) ไม่ใช่ 4095 เมื่อแปลงกลับเป็นแรงดัน ซึ่งเป็นสูตรที่ใช้ในโค้ดแล็บ <code>voltage = reading * 3.3 / 4096</code></div>` },

    { t: "SPI และ MCP3208 (ADC 12-bit)", html: `
<h4>SPI: Serial Peripheral Interface</h4>
<ul>
<li>บัสอนุกรมแบบ <b>synchronous</b> (มี clock), <b>full-duplex</b> (ส่งและรับพร้อมกัน), โครงสร้าง Master–Slave</li>
<li><b>MOSI</b> Master Out Slave In (Master → Slave) · <b>MISO</b> Master In Slave Out (Slave → Master) · <b>SCK</b> clock จาก Master · <b>CS</b> เลือก Slave (1 ขาต่อ 1 Slave)</li>
</ul>
<h4>MCP3208</h4>
<ul>
<li>Resolution <b>12 bit</b> (0–4095), <b>8 channel</b>, 100 kSamp/s, ขา: CLK, DOUT, DIN, CS, DGND, VREF, VDD</li>
<li>ต่อ Pi: MOSI → Din, MISO → Dout, CLK → CLK, CE0 (CS0) → CS</li>
<li>โหมด <b>Single-ended</b> (SGL/DIFF = 1): วัดเทียบ GND · โหมด <b>Differential</b> (= 0): วัดความต่างระหว่างคู่ channel เช่น CH1−CH0</li>
<li>เลือก channel ด้วย 3 บิต D2 D1 D0</li>
</ul>
<h4>spidev (Python)</h4>
<pre><code>$ sudo raspi-config  → Interface Options → เปิด SPI
$ sudo pip3 install spidev

import spidev
spi = spidev.SpiDev()
spi.open(0, 0)                 # bus 0, device (CE) 0
spi.max_speed_hz = 500000
def ReadChannel(channel):      # channel 0-7
    adc = spi.xfer2([6 | (channel &amp; 4) &gt;&gt; 2, (channel &amp; 3) &lt;&lt; 6, 0])
    data = ((adc[1] &amp; 15) &lt;&lt; 8) + adc[2]
    return data
reading = ReadChannel(0)
voltage = reading * 3.3 / 4096</code></pre>
<table>
<tr><th>Channel</th><th>xfer2</th><th>Channel</th><th>xfer2</th></tr>
<tr><td>0</td><td>[6,0,0]</td><td>4</td><td>[7,0,0]</td></tr>
<tr><td>1</td><td>[6,64,0]</td><td>5</td><td>[7,64,0]</td></tr>
<tr><td>2</td><td>[6,128,0]</td><td>6</td><td>[7,128,0]</td></tr>
<tr><td>3</td><td>[6,192,0]</td><td>7</td><td>[7,192,0]</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ส่ง 3 byte → รับ 3 byte · byte แรกมี start bit + SGL + D2 (<code>6 | (ch&amp;4)&gt;&gt;2</code>) · byte สอง D1 D0 อยู่ bit 7,6 (<code>(ch&amp;3)&lt;&lt;6</code>)</li>
<li>ข้อมูล 12 bit = 4 บิตล่างของ adc[1] (D11–D8) + adc[2] (D7–D0): <code>((adc[1]&amp;15)&lt;&lt;8) + adc[2]</code> (เท่ากับ <code>*256</code>)</li>
<li>ตัวอย่างข้อมูล 2748 = 1010 1011 1100 (0xABC)</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> adc[1] มี 4 บิตบนที่เป็นขยะ (x x x x) ต้อง mask ด้วย <code>&amp; 15</code> (0x0F) ก่อนเสมอ ไม่เช่นนั้นค่าจะเกิน 4095 · เมธอด: <code>readbytes/writebytes</code> เป็น half-duplex, <code>xfer2</code> เป็น full-duplex</div>
<div class="note"><b>💡 หมายเหตุ</b> ต่อ potentiometer เป็นตัวแบ่งแรงดันที่ 3.3 V แล้ววัดตรงกลางเข้า channel เพื่อทดสอบ ค่าควรเปลี่ยนระหว่าง 0–4095 (0–3.3 V)</div>` },

    { t: "PWM (Pulse Width Modulation)", html: `
<h4>หลักการ</h4>
<ul>
<li>ส่งพัลส์ที่ <b>ความถี่คงที่</b> แต่เปลี่ยน <b>ความกว้างของพัลส์ (Duty Cycle)</b> = เวลาที่เป็น HIGH ต่อคาบ</li>
<li><b>Duty Cycle (%) = T<sub>high</sub> / T × 100</b> · แรงดันเฉลี่ย ≈ Duty × Vcc</li>
<li>Duty สูง → กำลังเฉลี่ยมาก → LED สว่างขึ้น / มอเตอร์เร็วขึ้น</li>
<li>ขา PWM ฮาร์ดแวร์ของ Pi: PWM0, PWM1 (เช่น physical pin 12 = GPIO18)</li>
</ul>
<table>
<tr><th>เมธอด</th><th>หน้าที่</th></tr>
<tr><td><code>p = GPIO.PWM(channel, frequency)</code></td><td>สร้าง PWM instance (ความถี่ Hz)</td></tr>
<tr><td><code>p.start(dc)</code></td><td>เริ่มด้วย duty cycle dc (0.0–100.0)</td></tr>
<tr><td><code>p.ChangeDutyCycle(dc)</code></td><td>เปลี่ยน duty cycle</td></tr>
<tr><td><code>p.ChangeFrequency(freq)</code></td><td>เปลี่ยนความถี่ (Hz)</td></tr>
<tr><td><code>p.stop()</code></td><td>หยุด PWM</td></tr>
</table>
<pre><code>GPIO.setmode(GPIO.BOARD)
ledpin = 12
GPIO.setup(ledpin, GPIO.OUT)
pi_pwm = GPIO.PWM(ledpin, 1000)   # 1 kHz
pi_pwm.start(0)                   # duty 0%
while True:
    for duty in range(0, 101, 1): # 0..100
        pi_pwm.ChangeDutyCycle(duty)
        sleep(0.05)               # LED ค่อยๆ สว่างขึ้น</code></pre>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>dc ต้องอยู่ในช่วง <b>0.0–100.0</b> · ความถี่ 1000 Hz → คาบ 1 ms</li>
<li><code>range(0,101,1)</code> ได้ 0 ถึง 100 (ต้องใส่ 101 เพื่อรวม 100)</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ตัวอย่างข้างต้นใช้ <code>GPIO.BOARD</code> กับ pin 12 ดังนั้นเลข 12 ในโหมดนี้หมายถึงขาทางกายภาพ ไม่ใช่ GPIO12</div>
<p>โปรเจกต์รวม: อ่านค่าจาก MCP3208 (เช่น potentiometer) แล้วนำไปปรับ duty cycle ของ LED เพื่อหรี่/เร่งความสว่างตามค่าที่วัดได้</p>` }
  ],
  ex: [
    { type: "choice",
      story: "นักศึกษาต่อวงจรสวิตช์ดังนี้: ตัวต้านทาน 10 kΩ จาก 3.3 V ไปที่ขา GPIO4 และสวิตช์ต่อจาก GPIO4 ลง GND โค้ดคือ<pre><code>GPIO.setup(4, GPIO.IN)\nwhile True:\n    if GPIO.input(4) == True:\n        print('Pressed')</code></pre>เมื่อรันพบว่าพิมพ์ Pressed รัวๆ ตลอดเวลาที่ไม่ได้กดสวิตช์ และหยุดพิมพ์เมื่อกดสวิตช์",
      q: "ควรแก้อย่างไร?",
      opts: [
        { t: "เปลี่ยน GPIO.IN เป็น GPIO.OUT เพื่อให้ขาขับสัญญาณได้", why: "ผิด สวิตช์ต้องการ input ไม่ใช่ output การเปลี่ยนเป็น OUT ไม่เกี่ยวกับตรรกะที่กลับกัน และอาจทำให้ขาขับชนกับ GND" },
        { t: "เพิ่ม time.sleep(10) เพื่อให้ขารอ pull-up ทัน", why: "ผิด ปัญหาไม่ใช่เรื่องเวลา แต่เป็นตรรกะของวงจร pull-up ที่ไม่กดแล้ว HIGH อยู่ก่อน" },
        { t: "เปลี่ยนเงื่อนไขเป็น == False เพราะวงจร pull-up จะเป็น LOW เมื่อกดสวิตช์", why: "ถูก pull-up ดึงขาไปที่ 3.3 V ตอนไม่กด (True) เมื่อกดสวิตช์ขาถูกต่อลง GND จึงเป็น False ต้องตรวจ == False" },
        { t: "เปลี่ยน resistor 10 kΩ เป็น 3.3 V โดยตรงไม่ผ่านตัวต้านทาน", why: "ผิด และอันตราย การต่อ 3.3 V ลง GND ผ่านสวิตช์โดยไม่มี resistor จะเกิดการลัดวงจรเมื่อกดสวิตช์" }
      ], ans: 2 },

    { type: "choice",
      story: "ต้องการให้ LED ที่ต่อกับ GPIO4 (physical pin 7) กระพริบ นักศึกษาเขียนโค้ดว่า<pre><code>GPIO.setmode(GPIO.BOARD)\nLIGHT = 4\nGPIO.setup(LIGHT, GPIO.OUT)</code></pre>แต่ LED ไม่กระพริบ และโปรแกรมแจ้งข้อผิดพลาดว่าขานี้ใช้เป็น GPIO ไม่ได้",
      q: "สาเหตุและวิธีแก้ที่เหมาะสมที่สุดคือข้อใด?",
      opts: [
        { t: "โหมด BOARD ใช้เลขขาทางกายภาพ pin 4 เป็นขาไฟ 5 V ต้องใช้ BCM กับเลข 4 หรือ BOARD กับเลข 7", why: "ถูก BCM เลข 4 = GPIO4 ซึ่งอยู่ที่ pin 7 ส่วนใน BOARD เลข 4 คือขาไฟเลี้ยง ไม่ใช่ GPIO" },
        { t: "ต้องเรียก GPIO.setup ก่อน GPIO.setmode", why: "ผิด ลำดับที่ถูกคือ setmode ก่อน setup" },
        { t: "ต้องเปลี่ยนเป็น GPIO.IN เพราะ pin 4 เป็นขา input เท่านั้น", why: "ผิด pin 4 ไม่ใช่ขา GPIO เลย (เป็น 5 V) ไม่มีโหมด input/output ให้เลือก" },
        { t: "ต้องเพิ่ม PWM เพราะ LED กระพริบได้ด้วย PWM เท่านั้น", why: "ผิด LED กระพริบได้ด้วย GPIO.output(True/False) สลับกับ sleep ตามตัวอย่างพื้นฐาน" }
      ], ans: 0 },

    { type: "choice",
      story: "ใช้ MCP3208 ที่ VREF = 3.3 V อ่านค่าจาก channel 0 ได้ reading = 3100 โค้ดคำนวณ <code>voltage = reading * 3.3 / 4096</code>",
      q: "แรงดันที่ขา input ประมาณเท่าใด?",
      opts: [
        { t: "ประมาณ 3.10 V", why: "ผิด เป็นการนำ 3100 ไปคูณ 1 mV ซึ่งไม่ใช่ขนาดของ step (0.8056 mV)" },
        { t: "ประมาณ 1.25 V", why: "ผิด 1.25 V จะตรงกับค่า ADC ราว 1550 ไม่ใช่ 3100" },
        { t: "ประมาณ 0.80 V", why: "ผิด 0.80 mV คือขนาด 1 step ไม่ใช่แรงดันรวม" },
        { t: "ประมาณ 2.50 V", why: "ถูก 3100 × 3.3 / 4096 = 10230 / 4096 ≈ 2.4976 V" }
      ], ans: 3 },

    { type: "choice",
      story: "ต้องการอ่านเซนเซอร์ที่ต่อกับ <b>channel 5</b> ของ MCP3208 โดยใช้ <code>spi.xfer2([6 | (channel &amp; 4) &gt;&gt; 2, (channel &amp; 3) &lt;&lt; 6, 0])</code> โดยกำหนด channel = 5",
      q: "list ที่ถูกส่งออกไปจริงคือข้อใด?",
      opts: [
        { t: "[6, 64, 0]", why: "ผิด 5 = 101 มีบิต D2 = 1 ทำให้ byte แรกเป็น 6|1 = 7 ไม่ใช่ 6 (6 คือ channel 0–3)" },
        { t: "[7, 64, 0]", why: "ถูก (5&amp;4)&gt;&gt;2 = 1 → 6|1 = 7 และ (5&amp;3)&lt;&lt;6 = 1&lt;&lt;6 = 64" },
        { t: "[7, 128, 0]", why: "ผิด 128 คือ D1D0 = 10 (channel 2 หรือ 6) ส่วน channel 5 มี D1D0 = 01" },
        { t: "[6, 192, 0]", why: "ผิด [6,192,0] คือ channel 3" }
      ], ans: 1 },

    { type: "choice",
      story: "ฟังก์ชัน ReadChannel ได้ข้อมูลกลับมา <code>adc = [0, 250, 188]</code> (250 = 0xFA คือ 1111 1010, 4 บิตบนเป็นค่าไม่สำคัญ)",
      q: "ค่า 12 บิตที่ถูกต้องจาก <code>((adc[1] &amp; 15) &lt;&lt; 8) + adc[2]</code> คือเท่าใด?",
      opts: [
        { t: "438", why: "ผิด เป็นการบวก 250 + 188 ตรงๆ ซึ่งไม่ใช่การประกอบบิต" },
        { t: "64188", why: "ผิด เกิดจากลืม mask 4 บิตบน (250 × 256 + 188) ได้ค่าเกิน 4095 ซึ่งเป็นไปไม่ได้สำหรับ 12 bit" },
        { t: "2748", why: "ถูก 250 &amp; 15 = 10 → 10 &lt;&lt; 8 = 2560 แล้ว + 188 = 2748 (0xABC)" },
        { t: "4095", why: "ผิด 4095 คือค่าเต็มสเกล (ทุกบิต = 1) แต่ข้อมูลนี้ไม่ใช่" }
      ], ans: 2 },

    { type: "choice",
      story: "ติดตั้ง spidev สำเร็จและ <code>import spidev</code> ผ่าน แต่ตอนรันเกิดข้อผิดพลาดที่บรรทัด <code>spi.open(0, 0)</code> ว่า <code>FileNotFoundError: No such file or directory</code> (ไม่พบอุปกรณ์ /dev/spidev0.0)",
      q: "ควรทำอะไรเป็นอันดับแรก?",
      opts: [
        { t: "รัน sudo raspi-config → Interface Options แล้วเปิดใช้งาน SPI จากนั้น reboot", why: "ถูก import ผ่านแปลว่าไลบรารีมีแล้ว แต่ไม่มี device node ของ SPI เพราะ driver ยังไม่ถูกเปิด" },
        { t: "ติดตั้ง spidev ใหม่ด้วย pip3", why: "ผิด ติดตั้งแล้วและ import ได้ ปัญหาอยู่ที่ driver ในเคอร์เนลไม่ใช่ตัว library" },
        { t: "ลด spi.max_speed_hz ให้ต่ำลง", why: "ผิด ความเร็วไม่เกี่ยวกับการหาไฟล์อุปกรณ์ไม่เจอ" },
        { t: "เปลี่ยนไปใช้ i2cdetect ตรวจหา MCP3208", why: "ผิด MCP3208 ใช้ SPI ไม่ใช่ I2C จึงไม่ปรากฏใน i2cdetect" }
      ], ans: 0 },

    { type: "choice",
      story: "สร้าง PWM ด้วย <code>p = GPIO.PWM(12, 1000)</code> แล้วเรียก <code>p.start(0)</code> และต่อมาเรียก <code>p.ChangeDutyCycle(25)</code> LED ต่ออยู่ที่ขาออกที่แรงดัน 3.3 V",
      q: "ในแต่ละคาบสัญญาณ ขาเป็น HIGH นานเท่าใด และแรงดันเฉลี่ยประมาณเท่าใด?",
      opts: [
        { t: "0.25 ms และเฉลี่ยประมาณ 2.48 V", why: "ผิด เวลาถูก แต่ 2.48 V คือ duty 75% (3.3 × 0.75)" },
        { t: "0.75 ms และเฉลี่ยประมาณ 0.83 V", why: "ผิด 0.75 ms คือเวลาที่เป็น LOW ส่วน HIGH คือ 25% ของ 1 ms" },
        { t: "25 ms และเฉลี่ยประมาณ 0.83 V", why: "ผิด ความถี่ 1000 Hz ให้คาบ 1 ms ไม่ใช่ 100 ms; 25% ของคาบจึงเท่ากับ 0.25 ms" },
        { t: "0.25 ms และเฉลี่ยประมาณ 0.83 V", why: "ถูก คาบ = 1/1000 = 1 ms, HIGH = 25% = 0.25 ms, เฉลี่ย = 3.3 × 0.25 ≈ 0.83 V" }
      ], ans: 3 },

    { type: "choice",
      story: "เซนเซอร์ตัวหนึ่งให้เอาต์พุตแรงดัน 0–3.3 V ที่เปลี่ยนไปตามอุณหภูมิอย่างต่อเนื่อง นักศึกษาต่อเข้ากับ GPIO ของ Pi แล้วอ่านด้วย <code>GPIO.input(pin)</code> พบว่าได้เพียง True/False เท่านั้น ไม่สามารถทราบอุณหภูมิที่ละเอียดได้",
      q: "แนวทางที่เหมาะสมที่สุดคือข้อใด?",
      opts: [
        { t: "ใช้ GPIO.PWM อ่านค่าแรงดันแทน", why: "ผิด PWM ใช้สร้างสัญญาณขาออก ไม่ได้ใช้วัดแรงดัน analog" },
        { t: "ต่อ ADC ภายนอก เช่น MCP3208 ผ่าน SPI แล้วอ่านค่า 0–4095 ไปแปลงเป็นแรงดัน", why: "ถูก Pi ไม่มี ADC ในตัว ขา digital แยกได้แค่ HIGH/LOW ตาม threshold จึงต้องใช้ ADC เพื่อแปลง analog เป็นตัวเลขหลายระดับ" },
        { t: "เพิ่ม resistor pull-up 10 kΩ ให้ขา GPIO", why: "ผิด pull-up แก้ปัญหาขาลอย ไม่ได้ทำให้ขา digital อ่านค่า analog ได้" },
        { t: "เปลี่ยนเป็น GPIO.setmode(GPIO.BOARD) เพื่อให้อ่านละเอียดขึ้น", why: "ผิด โหมดการนับขาไม่ส่งผลต่อ resolution ของการอ่าน" }
      ], ans: 1 },

    { type: "multi",
      story: "พิจารณาการใช้ SPI กับ MCP3208 บน Raspberry Pi",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "MCP3208 มี resolution 12 bit และมี 8 channel", ok: true, why: "ถูก ค่า 0–4095 และ channel 0–7" },
        { t: "SPI ใช้สายข้อมูล SDA และ SCL แบบเดียวกับ I2C", ok: false, why: "ผิด SPI ใช้ MOSI, MISO, SCK และ CS ส่วน SDA/SCL เป็นของ I2C" },
        { t: "xfer2([...]) ส่ง 3 byte และได้รับกลับ 3 byte ในจังหวะ clock เดียวกัน (full-duplex)", ok: true, why: "ถูก xfer2 ส่งและรับไปพร้อมกัน ผลลัพธ์มีความยาวเท่ากับ list ที่ส่ง" },
        { t: "ขา MISO ส่งข้อมูลจาก Master ไปยัง Slave", ok: false, why: "ผิด MISO = Master In Slave Out คือ Slave → Master ส่วน Master → Slave คือ MOSI" },
        { t: "Master เลือกอุปกรณ์ที่จะคุยด้วยผ่านขา CS (Chip Select)", ok: true, why: "ถูก แต่ละ Slave ใช้ CS ของตนเอง" },
        { t: "ค่า ADC 2048 ที่ VREF 3.3 V แทนแรงดันเต็มสเกล", ok: false, why: "ผิด 2048 คือครึ่งหนึ่งของสเกล ≈ 1.65 V เต็มสเกลคือ 4095" }
      ] },

    { type: "multi",
      story: "เตรียม Raspberry Pi แบบไม่ใช้จอ (headless) และใช้งาน GPIO",
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "Raspberry Pi Imager ตั้งค่า hostname, ผู้ใช้, Wi-Fi และเปิด SSH ได้ก่อน Write ลง SD card", ok: true, why: "ถูก ทำให้เข้าเครื่องด้วย SSH ได้ทันทีหลังบูต" },
        { t: "SSH ใช้ port 22 และเข้าด้วยชื่อ raspberrypi.local ได้ถ้าเครื่อง PC อยู่ในเครือข่ายเดียวกัน", ok: true, why: "ถูก ใช้ hostname ต่อท้าย .local" },
        { t: "กำหนด Static IP ได้โดยแก้ /etc/dhcpcd.conf ใส่ static ip_address, routers, domain_name_servers", ok: true, why: "ถูก หรือใช้ nmtui ก็ได้" },
        { t: "ขา GPIO ของ Pi รับแรงดัน 5 V ได้โดยตรง", ok: false, why: "ผิด ระดับสัญญาณคือ 3.3 V ถ้าอุปกรณ์ส่ง 5 V (เช่น Echo ของ HC-SR04) ต้องลดด้วย voltage divider" },
        { t: "ใช้ GPIO.BCM และ GPIO.BOARD ปนกันในโปรแกรมเดียวได้โดยเลขขาไม่เปลี่ยนความหมาย", ok: false, why: "ผิด ต้องเลือกโหมดเดียว เพราะเลขขาจะถูกตีความตามโหมดที่ตั้ง" }
      ] },

    { type: "blank",
      text: "ADC แบบ 12 bit มี {1} ระดับ ค่าสูงสุดที่อ่านได้คือ {2} และเมื่อ VREF = 3.3 V แต่ละ step ของแรงดันเท่ากับ {3}",
      blanks: [
        { opts: ["1024", "4096", "4095", "256"], ans: 1, why: "12 bit → 2^12 = 4096 ระดับ" },
        { opts: ["4096", "4095", "3300", "2048"], ans: 1, why: "ระดับเริ่มจาก 0 จึงสูงสุดคือ 2^12 − 1 = 4095" },
        { opts: ["0.8056 mV", "1.61 mV", "3.3 mV", "0.0806 mV"], ans: 0, why: "3.3 V / 4096 ≈ 0.8056 mV" }
      ] },

    { type: "blank",
      text: "ต้องการใช้เลข GPIO ตามชิป Broadcom จึงเรียก <code>GPIO.setmode(GPIO.{1})</code> ขา GPIO4 อยู่ที่ physical pin {2} และเมื่อต้องการขับ LED ต้องตั้งขานั้นด้วย <code>GPIO.setup(4, GPIO.{3})</code>",
      blanks: [
        { opts: ["BOARD", "BCM", "SOC", "PIN"], ans: 1, why: "BCM คือการนับตามเลข GPIO ของ Broadcom ส่วน BOARD นับตามเลขขากายภาพ" },
        { opts: ["4", "7", "12", "40"], ans: 1, why: "GPIO4 คือ physical pin 7 (physical pin 12 คือ GPIO18)" },
        { opts: ["IN", "LOW", "OUT", "PWM"], ans: 2, why: "ขับ LED ต้องเป็น Output" }
      ] },

    { type: "blank",
      text: "สร้าง PWM ความถี่ 1 kHz ด้วย <code>p = GPIO.{1}(pin, 1000)</code> เริ่มทำงานด้วย <code>p.{2}(0)</code> ปรับความสว่างด้วย <code>p.{3}(dc)</code> โดย dc ต้องอยู่ในช่วง {4}",
      blanks: [
        { opts: ["Pulse", "setup", "PWM", "output"], ans: 2, why: "GPIO.PWM(channel, frequency) สร้าง PWM instance" },
        { opts: ["begin", "run", "start", "on"], ans: 2, why: "เริ่ม PWM ด้วย p.start(dc)" },
        { opts: ["ChangeFrequency", "ChangeDutyCycle", "SetDuty", "output"], ans: 1, why: "ChangeDutyCycle ปรับ duty cycle ส่วน ChangeFrequency ปรับความถี่" },
        { opts: ["0–255", "0–100", "0–1023", "0–4095"], ans: 1, why: "dc คือเปอร์เซ็นต์ 0.0–100.0" }
      ] },

    { type: "match",
      q: "จับคู่ขาหรือเมธอดของ SPI กับหน้าที่",
      pairs: [
        ["MOSI", "Master ส่งข้อมูลไปยัง Slave"],
        ["MISO", "Slave ส่งข้อมูลกลับมายัง Master"],
        ["SCK", "สัญญาณ clock ที่ Master สร้างให้"],
        ["CS", "เลือก Slave ที่จะสื่อสารด้วย"],
        ["xfer2()", "ส่ง list ของ byte และรับกลับพร้อมกัน (full-duplex)"]
      ],
      why: "SPI เป็น synchronous full-duplex: MOSI/MISO ส่งข้อมูลสองทิศทาง ขับด้วย SCK จาก Master โดย CS ระบุ Slave ส่วน xfer2 ใน spidev ทำการส่งและรับไปพร้อมกัน" }
  ]
});
