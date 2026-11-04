IOT.reg({
  id: "tcp",
  title: "TCP Connection & Congestion Control + QUIC",
  th: "การสร้าง/ปิดการเชื่อมต่อ TCP, flow control, congestion control (slow start, AIMD), RTT/RTO และ QUIC",
  summary: `
<ul>
<li><b>TCP</b>: reliable, in-order, bi-directional byte stream; port number สำหรับ demultiplex; virtual circuit (connection); flow control; congestion control</li>
<li><b>Header</b>: Source Port, Dest Port, Sequence Number (32 bit), Acknowledgement Number, HLen, Flags (SYN/ACK/FIN), Advertised Window, Checksum, Urgent Pointer, Options</li>
<li><b>Sequence number</b> นับเป็น <b>byte</b>, ค่าเริ่มต้น (ISN) <b>สุ่ม</b>, wrap around ที่ 32 bit; แบ่งเป็น segment ขนาดไม่เกิน <b>MSS</b> (ปกติ 1460 bytes)</li>
<li><b>3-way handshake</b>: SYN &lt;SeqC,0&gt; → SYN/ACK &lt;SeqS,SeqC+1&gt; → ACK &lt;SeqC+1,SeqS+1&gt; (SYN และ FIN กิน sequence number 1 ตัว)</li>
<li><b>Teardown</b>: FIN → ACK (+1) ... อีกฝั่งส่งข้อมูลต่อได้ (half-open) ... FIN → ACK (+1)</li>
<li><b>Error detection</b>: checksum (IP header + TCP header + data), sequence number จัดการ duplicate/out-of-order/lost, sender ตรวจ loss ด้วย timeout และต้องเก็บสำเนาจนกว่าจะได้ ACK</li>
<li><b>RTT estimate</b>: new_rtt = α·old_rtt + (1−α)·sample, α = 0.8–0.9 (0.875); <b>RTO = 2 × new_rtt</b>; <b>Karn's algorithm</b>: ไม่ใช้ sample ของ segment ที่ retransmit</li>
<li><b>Congestion</b> = load &gt; capacity → buffer เต็ม → packet drop, delay เพิ่ม, เปลืองแบนด์วิดท์จาก retransmit, goodput ต่ำ</li>
<li><b>Window</b>: wnd = min(cwnd, adv_wnd); effective_wnd = wnd − (last_byte_sent − last_byte_acked)</li>
<li><b>ตัวแปร 3 ตัว</b>: cwnd, adv_wnd, ssthresh; ตรวจจับ congestion จาก <b>timeout</b> หรือ <b>duplicate ACK</b></li>
<li><b>Slow Start</b> (cwnd &lt; ssthresh): เริ่ม cwnd = 1, ssthresh = adv_wnd, ทุก ACK → cwnd เพิ่ม ⇒ <b>เพิ่ม 2 เท่าต่อ RTT</b> (exponential)</li>
<li><b>Congestion Avoidance</b> (cwnd ≥ ssthresh): AIMD, ทุก ACK cwnd += 1/cwnd ⇒ <b>+1 segment ต่อ RTT</b></li>
<li><b>QUIC</b> (Quick UDP Internet Connections): ทำงานบน UDP; เร็วกว่าเพราะ (1) handshake ต่ำ latency: cache ข้อมูลเซิร์ฟเวอร์ที่เคยเชื่อมต่อ + รวม TCP handshake กับ TLS handshake (0-RTT) (2) stream multiplexing ไม่มี <b>head-of-line blocking</b></li>
</ul>
<table>
<tr><th>เรื่อง</th><th>TCP</th><th>QUIC</th></tr>
<tr><td>Transport ข้างล่าง</td><td>IP โดยตรง</td><td>UDP</td></tr>
<tr><td>Setup</td><td>TCP handshake แล้วค่อย TLS</td><td>รวมกัน / 0-RTT ถ้าเคยเชื่อมต่อ</td></tr>
<tr><td>หลาย object</td><td>ผ่าน byte stream เดียว → HOL blocking</td><td>หลาย stream อิสระ</td></tr>
</table>`,
  sections: [
    {
      t: "หน้าที่ของ Transport Layer และ TCP",
      html: `
<h4>Transport Layer ทำอะไร</h4>
<p>หน้าที่หลักคือ <b>demultiplexing</b> data stream (แยกข้อมูลไปยัง application ที่ถูกต้องด้วย port number) ส่วนหน้าที่เสริมที่ protocol บางตัวมี ได้แก่ การสร้าง connection ที่อยู่ยาว, การส่งแบบ reliable และ in-order, error detection และ flow/congestion control ความท้าทายหลักคือ <b>ตรวจจับและตอบสนองต่อ congestion</b> พร้อมทั้งสมดุลระหว่าง <b>fairness</b> กับ <b>utilization</b> สูง</p>
<h4>คุณสมบัติของ TCP</h4>
<ul>
<li>Reliable, in-order, bi-directional byte stream</li>
<li>Port number สำหรับ demultiplex</li>
<li>Virtual circuit (connection) — มี state ที่ปลายทั้งสองฝั่ง</li>
<li>Flow control (ไม่ให้ท่วม receiver) และ congestion control (ไม่ให้ท่วม network) พร้อม fairness โดยประมาณ</li>
</ul>
<h4>TCP header</h4>
<table>
<tr><th>ฟิลด์</th><th>ความหมาย</th></tr>
<tr><td>Source / Destination Port</td><td>ใช้ demultiplex</td></tr>
<tr><td>Sequence Number</td><td>หมายเลข byte แรกของ segment (32 bit)</td></tr>
<tr><td>Acknowledgement Number</td><td>หมายเลข byte ถัดไปที่ผู้รับคาดหวัง</td></tr>
<tr><td>HLen, Flags</td><td>ความยาว header; SYN, ACK, FIN ฯลฯ</td></tr>
<tr><td>Advertised Window</td><td>พื้นที่ buffer ที่ผู้รับประกาศ (ใช้ทำ flow control)</td></tr>
<tr><td>Checksum, Urgent Pointer, Options</td><td>ตรวจ error / urgent data / ตัวเลือกเพิ่ม</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Flag 1 bit: <b>SYN</b> = สร้าง connection, <b>ACK</b> = ยืนยันข้อมูลที่ได้รับ, <b>FIN</b> = ปิด connection</li>
<li>Advertised Window → flow control (ฝั่งรับ); cwnd → congestion control (ฝั่งส่งคำนวณเอง)</li>
</ul></div>`
    },
    {
      t: "Connection Setup: Three-Way Handshake",
      html: `
<p>ต้องมี connection setup เพื่อสร้าง <b>state ที่ทั้งสองโฮสต์</b> โดย state ที่สำคัญที่สุดคือ <b>sequence number</b> ซึ่งนับจำนวน byte ที่ส่งไป ค่าเริ่มต้น (Initial Sequence Number) ถูก<b>สุ่ม</b> เพื่อไม่ให้ชนกับ segment เก่าของ connection ก่อนหน้า และเดาได้ยากขึ้น</p>
<div class="dg"><div class="dgt">🖼️ Three-way handshake (ตัวอย่าง SeqC = 1000, SeqS = 5000)</div>
<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg">
<rect class="bx hd" x="40" y="8" width="90" height="26"/><text class="t b" x="85" y="26" text-anchor="middle">Client</text>
<rect class="bx hd" x="350" y="8" width="90" height="26"/><text class="t b" x="395" y="26" text-anchor="middle">Server</text>
<line class="ln" x1="85" y1="34" x2="85" y2="220"/><line class="ln" x1="395" y1="34" x2="395" y2="220"/>
<line class="ln ok" x1="85" y1="60" x2="395" y2="90"/>
<text class="t sm" x="240" y="62" text-anchor="middle">SYN seq=1000</text>
<line class="ln ok" x1="395" y1="115" x2="85" y2="145"/>
<text class="t sm" x="240" y="112" text-anchor="middle">SYN/ACK seq=5000, ack=1001</text>
<line class="ln ok" x1="85" y1="170" x2="395" y2="200"/>
<text class="t sm" x="240" y="168" text-anchor="middle">ACK seq=1001, ack=5001</text>
</svg></div>
<ul>
<li>แต่ละฝั่ง <b>แจ้ง</b> sequence number เริ่มต้นของตนให้อีกฝั่ง และ <b>ACK</b> sequence number เริ่มต้นของอีกฝั่ง (+1)</li>
<li>SYN กิน sequence number 1 ตัว จึง ACK = Seq + 1 แม้ยังไม่มีข้อมูล</li>
<li>หลัง handshake เสร็จ ทั้งสองฝั่งส่งข้อมูลได้ (bi-directional)</li>
</ul>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>SYN &lt;SeqC, 0&gt;</li>
<li>SYN/ACK &lt;SeqS, SeqC+1&gt;</li>
<li>ACK &lt;SeqC+1, SeqS+1&gt;</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> ต้องใช้เวลา 1 RTT ก่อนจะส่งข้อมูลแรกได้ (ยังไม่นับ TLS handshake ที่ต้องทำต่อ) — นี่คือจุดที่ QUIC พยายามลด latency</div>`
    },
    {
      t: "Connection Tear Down และ Sequence Number Space",
      html: `
<h4>Tear down</h4>
<ul>
<li>ฝั่งใดก็ได้เริ่มปิดก่อน โดยส่ง <b>FIN</b></li>
<li>อีกฝั่ง ACK FIN นั้น (ack = SeqA + 1) แต่ยัง <b>ส่งข้อมูลต่อได้</b> → เรียกว่า <b>half-open connection</b> (ใช้ <code>shutdown()</code>)</li>
<li>เมื่อพร้อมแล้วจึงส่ง FIN ของตนเอง และฝั่งแรก ACK FIN สุดท้าย (sequence number + 1)</li>
</ul>
<pre><code>Client                      Server
  FIN &lt;SeqA,*&gt;  --------------&gt;
        &lt;-------------- ACK &lt;*,SeqA+1&gt;
        &lt;-------------- Data ... (half-open)
  ACK   --------------&gt;
        &lt;-------------- FIN &lt;SeqB,*&gt;
  ACK &lt;*,SeqB+1&gt; ------&gt;</code></pre>
<h4>Sequence Number Space</h4>
<ul>
<li>TCP เป็น <b>byte stream</b>: ทุก byte ในแต่ละ stream มีหมายเลข, ค่า 32 bit และ <b>wrap around</b></li>
<li>แบ่งเป็น segment ขนาดจำกัดด้วย <b>MSS</b> (Maximum Segment Size) ปกติ <b>1460 bytes</b> เพื่อลด fragmentation</li>
<li>แต่ละ segment มี sequence number = หมายเลข byte แรกของ segment</li>
</ul>
<h4>Bidirectional communication</h4>
<p>แต่ละทิศมี sequence number แยกกัน และ <b>data กับ ACK ส่งใน packet เดียวกันได้</b> เช่น client ส่งข้อมูล 1460 bytes (seq=1) → server ตอบ ack=1461 พร้อมข้อมูลของตัวเอง (seq=23)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>ACK number = seq ของ byte ถัดไปที่คาดหวัง = seq + จำนวน byte ข้อมูลที่ได้</li>
<li>ตัวอย่าง: seq=1, ข้อมูล 1460 bytes → ack=1461 → segment ถัดไปมี seq=1461, 2921, ...</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> การปิดมี 4 segment (FIN, ACK, FIN, ACK) เพราะแต่ละทิศปิดแยกกัน ต่างจากการเปิดที่มี 3 segment</div>`
    },
    {
      t: "Flow Control, Error Detection, RTT และ RTO",
      html: `
<h4>Flow control (ฝั่งส่ง)</h4>
<p>Sender ต้อง <b>buffer ข้อมูลไว้จนกว่าจะได้ ACK</b> หน้าต่างแบ่งเป็น: ACKed | Sent (รอ ACK) | To be sent (ยังอยู่ใน window) | Outside window ผู้รับประกาศ <b>Advertised Window</b> เพื่อบอกว่ารับเพิ่มได้เท่าไร</p>
<h4>Error detection</h4>
<ul>
<li><b>Checksum</b> ตรวจ corruption บางส่วน — คำนวณครอบ IP header, TCP header และ data</li>
<li><b>Sequence number</b>: duplicate ถูกละเลย, out-of-order ถูกจัดลำดับใหม่หรือทิ้ง, เลขที่ขาดหาย = packet หาย</li>
<li>Sender ตรวจ loss ด้วย <b>timeout</b> ของ ACK → ต้องประมาณ RTT เพื่อตั้ง timeout ให้เหมาะ</li>
</ul>
<h4>Retransmission Timeout (RTO)</h4>
<p>ถ้า RTO <b>สั้นเกินไป</b> → retransmit โดยไม่จำเป็น (ACK ยังมาไม่ถึง) เปลือง bandwidth; ถ้า RTO <b>ยาวเกินไป</b> → ใช้เวลานานกว่าจะรู้ว่า loss ทำให้ latency สูง</p>
<h4>การประมาณ RTT</h4>
<ul>
<li>moving average: <code>new_rtt = α·old_rtt + (1−α)·new_sample</code>, α แนะนำ 0.8–0.9 (TCP ส่วนใหญ่ใช้ 0.875)</li>
<li><code>RTO = 2 × new_rtt</code> (TCP ค่อนข้างระมัดระวัง)</li>
</ul>
<p><b>ตัวอย่างคำนวณ</b>: old_rtt = 100 ms, sample = 140 ms, α = 0.875 → new_rtt = 0.875×100 + 0.125×140 = 87.5 + 17.5 = <b>105 ms</b> → RTO = <b>210 ms</b></p>
<h4>RTT sample ambiguity และ Karn's algorithm</h4>
<p>ถ้า segment ถูก retransmit แล้วได้ ACK มา เราไม่รู้ว่า ACK ตอบ segment ต้นฉบับหรือฉบับที่ส่งซ้ำ จึงวัด RTT ไม่ได้ → <b>Karn's algorithm: ไม่นำ sample จาก segment ที่ถูก retransmit มาคำนวณ RTT</b></p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>new_rtt = α·old + (1−α)·sample (α≈0.875); RTO = 2×new_rtt</li>
<li>Karn: ข้าม sample ของ retransmitted segment</li>
</ul></div>`
    },
    {
      t: "Congestion และ Congestion Window (cwnd)",
      html: `
<h4>Congestion คืออะไร</h4>
<p>Load บนเครือข่ายสูงกว่า capacity ซึ่ง capacity ไม่เท่ากันในแต่ละเครือข่าย (modem, cellular, cable, fiber) มีหลาย flow แย่งแบนด์วิดท์ และ load ไม่คงที่ตามเวลา</p>
<h4>ทำไม congestion จึงแย่</h4>
<ul>
<li>Router มี buffer จำกัด → ต้อง <b>drop packet</b></li>
<li>Queue สะสม → <b>delay เพิ่ม</b></li>
<li>เปลือง bandwidth จากการ retransmit → <b>goodput ต่ำ</b></li>
</ul>
<h4>Congestion window</h4>
<p><b>cwnd</b> จำกัดปริมาณข้อมูลที่ค้างอยู่ในเครือข่าย (หน่วย byte)</p>
<pre><code>1. wnd = min(cwnd, adv_wnd)
2. effective_wnd = wnd - (last_byte_sent - last_byte_acked)</code></pre>
<p><b>ตัวอย่าง</b>: cwnd = 6000, adv_wnd = 4000, last_byte_sent = 12000, last_byte_acked = 10000 → wnd = min(6000, 4000) = 4000; ข้อมูลที่ค้างอยู่ = 2000 → effective_wnd = 4000 − 2000 = <b>2000 bytes</b> ส่งเพิ่มได้อีก 2000 bytes</p>
<h4>สององค์ประกอบ</h4>
<ol>
<li><b>Detect congestion</b>: packet drop คือสัญญาณที่เชื่อถือได้ที่สุด (วิธีแบบ delay ทำยากและเสี่ยง; ยกเว้นเครือข่าย wireless ที่ loss อาจไม่ได้มาจาก congestion) ตรวจจาก timeout หรือ duplicate ACK หลายตัวติดกัน</li>
<li><b>Rate adjustment</b>: ปรับ cwnd, probe หา bandwidth, ตอบสนองต่อ congestion</li>
</ol>
<h4>Rate adjustment แบบพื้นฐาน</h4>
<p>TCP เป็น <b>ACK clocked</b>: congestion = delay = ACK มาห่างกัน; ไม่ congest = ACK มาถึงเร็ว ได้รับ ACK → เพิ่ม cwnd (ข้อมูลส่งถึงแล้ว อาจส่งเร็วขึ้นได้), เกิด loss → ลด cwnd</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>wnd = min(cwnd, adv_wnd)</li>
<li>effective_wnd = wnd − (last_byte_sent − last_byte_acked)</li>
<li>ตัวแปร: cwnd, adv_wnd, ssthresh</li>
</ul></div>
<div class="warn"><b>⚠️ ระวัง</b> adv_wnd มาจากผู้รับ (ป้องกัน receiver ล้น) แต่ cwnd ผู้ส่งประมาณเอง (ป้องกัน network ล้น) ใช้ค่าที่ <b>เล็กกว่า</b> เสมอ</div>`
    },
    {
      t: "Slow Start และ Congestion Avoidance (AIMD)",
      html: `
<p>Congestion control มี 2 phase ตามค่า ssthresh:</p>
<h4>1) Slow Start (cwnd &lt; ssthresh)</h4>
<ul>
<li>เป้าหมาย: ไปถึง "knee" (จุดที่ goodput สูงสุดก่อนเกิด cliff) ให้เร็ว</li>
<li>เมื่อเริ่ม (หรือเริ่มใหม่) connection: <b>cwnd = 1</b>, <b>ssthresh = adv_wnd</b></li>
<li>ทุกครั้งที่ segment ถูก ACK, cwnd เพิ่ม → รวมแล้ว cwnd <b>เพิ่ม 2 เท่าต่อ RTT</b></li>
<li>ดำเนินต่อจนกระทั่งถึง ssthresh หรือเกิด packet loss</li>
<li>"Slow start ไม่ได้ช้าจริง" เพราะโตแบบ exponential</li>
</ul>
<h4>2) Congestion Avoidance (cwnd ≥ ssthresh)</h4>
<ul>
<li>โหมด <b>AIMD</b> (Additive Increase, Multiplicative Decrease)</li>
<li>ssthresh = ค่าประมาณขอบล่างของตำแหน่ง knee</li>
<li>ทุกครั้งที่ segment ถูก ACK: <b>cwnd += 1/cwnd</b> → cwnd เพิ่ม 1 segment ก็ต่อเมื่อ segment ทั้งหมดใน window ถูก ACK (เพิ่ม <b>1 ต่อ RTT</b>)</li>
</ul>
<div class="dg"><div class="dgt">🖼️ cwnd ตาม RTT (ssthresh = 8)</div>
<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
<line class="ln" x1="40" y1="190" x2="400" y2="190"/><line class="ln" x1="40" y1="190" x2="40" y2="15"/>
<line class="ln bad" x1="40" y1="110" x2="400" y2="110"/>
<text class="t sm" x="404" y="113">ssthresh=8</text>
<rect class="bx ok" x="60" y="174" width="30" height="16"/><text class="t sm" x="75" y="170" text-anchor="middle">1</text>
<rect class="bx ok" x="110" y="158" width="30" height="32"/><text class="t sm" x="125" y="154" text-anchor="middle">2</text>
<rect class="bx ok" x="160" y="126" width="30" height="64"/><text class="t sm" x="175" y="122" text-anchor="middle">4</text>
<rect class="bx ok" x="210" y="62" width="30" height="128"/><text class="t sm" x="225" y="58" text-anchor="middle">8</text>
<rect class="bx" x="260" y="46" width="30" height="144"/><text class="t sm" x="275" y="42" text-anchor="middle">9</text>
<rect class="bx" x="310" y="30" width="30" height="160"/><text class="t sm" x="325" y="26" text-anchor="middle">10</text>
<text class="t sm" x="75" y="205" text-anchor="middle">RTT0</text><text class="t sm" x="125" y="205" text-anchor="middle">RTT1</text><text class="t sm" x="175" y="205" text-anchor="middle">RTT2</text><text class="t sm" x="225" y="205" text-anchor="middle">RTT3</text><text class="t sm" x="275" y="205" text-anchor="middle">RTT4</text><text class="t sm" x="325" y="205" text-anchor="middle">RTT5</text>
</svg></div>
<p>ช่วง RTT0–RTT3 คือ slow start (×2 ต่อรอบ) จนถึง cwnd = 8 = ssthresh จากนั้นเข้า congestion avoidance (+1 ต่อรอบ: 9, 10, ...)</p>
<h4>เมื่อเกิด loss (หลักการมาตรฐานของ TCP Tahoe)</h4>
<p>เมื่อ timeout: ssthresh ตั้งเป็นครึ่งหนึ่งของ cwnd ปัจจุบัน แล้ว cwnd กลับเป็น 1 และเริ่ม slow start ใหม่ (ส่วนการตอบสนองเมื่อได้ duplicate ACK มีหลายรุ่น เช่น Reno ที่ลดเหลือครึ่งหนึ่งโดยไม่กลับไป 1)</p>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>Slow start: ×2 ต่อ RTT (เริ่ม cwnd=1, ssthresh=adv_wnd)</li>
<li>Congestion avoidance: +1 ต่อ RTT (cwnd += 1/cwnd ต่อ ACK)</li>
<li>เปลี่ยน phase เมื่อ cwnd ≥ ssthresh</li>
</ul></div>`
    },
    {
      t: "QUIC: ทำไมเร็วกว่า TCP",
      html: `
<h4>ภาพรวม</h4>
<p>QUIC (ออกเสียง "quick") เดิมย่อจาก <b>Quick UDP Internet Connections</b> มีเป้าหมายให้ transport เร็วและปลอดภัยกว่า (บทนี้เน้นด้าน "เร็ว") ทำงานบน <b>UDP</b></p>
<h4>วิธีที่ QUIC ลด latency</h4>
<ol>
<li><b>Low-latency connection establishment</b>
 <ul>
 <li>เก็บ cache ข้อมูลของระบบที่เคยเชื่อมต่อ → เชื่อมต่อซ้ำได้แบบ <b>0-RTT</b> (ส่งข้อมูลได้เลยในแพ็กเก็ตแรก)</li>
 <li><b>รวม TCP handshake กับ TLS handshake</b> เข้าด้วยกัน (TCP+TLS ต้องใช้หลาย RTT ก่อนส่งข้อมูลจริง)</li>
 </ul></li>
<li><b>Stream multiplexing</b> — ช่วยแก้ปัญหา <b>head-of-line (HOL) blocking</b></li>
</ol>
<h4>Head-of-line blocking</h4>
<p>SPDY (ต้นแบบของ HTTP/2) ทำ multiplexing หลาย object บน <b>TCP connection เดียว</b> แต่ TCP ส่งมอบ byte stream แบบ in-order เมื่อ segment หนึ่งหาย <b>ทุก stream</b> บน connection นั้นต้องรอ retransmit ไปด้วย แม้ข้อมูลของ stream อื่นจะมาถึงครบแล้ว</p>
<p>QUIC ทำ multiplexing บน <b>UDP</b> โดยแต่ละ stream อิสระต่อกัน: loss ใน stream หนึ่งกระทบเฉพาะ stream นั้น stream อื่นส่งมอบต่อได้ → <b>ไม่มี HOL blocking</b></p>
<table>
<tr><th>สถานการณ์</th><th>TCP (SPDY/HTTP2)</th><th>QUIC</th></tr>
<tr><td>เชื่อมต่อครั้งแรก</td><td>3-way handshake + TLS handshake</td><td>รวม handshake</td></tr>
<tr><td>เชื่อมต่อซ้ำ server เดิม</td><td>ต้อง handshake ใหม่</td><td>0-RTT จาก cache</td></tr>
<tr><td>1 segment หาย ขณะโหลดหลาย object</td><td>ทุก object หยุดรอ</td><td>หยุดเฉพาะ stream ที่ได้รับผลกระทบ</td></tr>
</table>
<div class="must"><b>🔥 ต้องจำ</b><ul>
<li>QUIC = Quick UDP Internet Connections, ทำงานบน UDP</li>
<li>เร็วกว่าเพราะ: cache + รวม handshake (0-RTT) และ stream multiplexing ที่ไม่มี HOL blocking</li>
</ul></div>
<div class="note"><b>💡 หมายเหตุ</b> HOL blocking ที่แก้ได้คือระดับ transport; QUIC ยังทำ congestion control และ retransmission ของตนเองในระดับ stream/packet เพื่อให้ reliable</div>`
    }
  ],
  ex: [
    {
      type: "choice",
      story: `Client เปิด connection ไปยัง server ด้วย TCP โดย client เลือก initial sequence number = 3000 และ server เลือก = 8000`,
      q: "segment ที่ 2 (SYN/ACK) ที่ server ส่งกลับมา ควรมีค่า seq และ ack เท่าใด?",
      opts: [
        { t: "seq = 8000, ack = 3001", why: "ถูก: server แจ้ง ISN ของตน (8000) และ ACK ISN ของ client + 1 (SYN กิน 1 sequence number)" },
        { t: "seq = 8001, ack = 3000", why: "ผิด: seq ของ SYN/ACK คือ ISN ของ server โดยตรง และ ack ต้องเป็น ISN ของ client + 1" },
        { t: "seq = 3001, ack = 8000", why: "ผิด: สลับบทบาท client/server" },
        { t: "seq = 8000, ack = 3000", why: "ผิด: ack ต้อง +1 เพราะ SYN ถือเป็น 1 sequence number" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `Client ส่งข้อมูล 5000 bytes ให้ server ผ่าน TCP (MSS = 1460 bytes) โดย segment แรกมี seq = 1 และ segment ทั้งหมดถูกส่งถึงโดยไม่หาย`,
      q: "ต้องส่งกี่ segment, segment สุดท้ายมี seq เท่าใด, และ ACK สุดท้ายจาก server มีค่าเท่าใด?",
      opts: [
        { t: "3 segments, seq สุดท้าย 2921, ack สุดท้าย 4381", why: "ผิด: 3 segment รวมได้เพียง 4380 bytes ยังไม่ครบ 5000" },
        { t: "4 segments, seq สุดท้าย 4381 (ข้อมูล 620 bytes), ack สุดท้าย 5001", why: "ถูก: 1460+1460+1460+620 = 5000 → seq = 1, 1461, 2921, 4381; ack สุดท้าย = 1 + 5000 = 5001" },
        { t: "4 segments, seq สุดท้าย 4380, ack สุดท้าย 5000", why: "ผิด: sequence number เริ่มที่ 1 ไม่ใช่ 0 ดังนั้น seq สุดท้ายคือ 4381 และ ack = 5001" },
        { t: "5 segments, seq สุดท้าย 5841, ack สุดท้าย 7301", why: "ผิด: ไม่ต้องใช้ 5 segment และ seq ไม่ควรเกินจำนวน byte ที่ส่งจริง" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `Slow start ตั้งต้นที่ cwnd = 1 segment, ssthresh = 8 segments, adv_wnd มีค่ามากพอ และไม่มี packet loss เลย (นับ RTT0 คือ cwnd = 1)`,
      q: "cwnd (หน่วย segment) ที่ต้น RTT ที่ 6 เป็นเท่าใด?",
      opts: [
        { t: "11", why: "ถูก: RTT0=1, 1=2, 2=4, 3=8 (ถึง ssthresh) จากนั้นเข้า congestion avoidance +1 ต่อ RTT → RTT4=9, RTT5=10, RTT6=11" },
        { t: "64", why: "ผิด: เติบโต ×2 ต่อเนื่องเฉพาะตอน cwnd &lt; ssthresh เท่านั้น เมื่อถึง 8 ต้องเปลี่ยนเป็นเพิ่มทีละ 1" },
        { t: "16", why: "ผิด: ถ้า ×2 ต่อไปหลัง 8 จะได้ 16 แต่ตอน cwnd ≥ ssthresh เป็น AIMD ไม่ใช่ exponential" },
        { t: "7", why: "ผิด: เป็นการนับเพิ่มทีละ 1 ตั้งแต่ต้น ซึ่งไม่ตรงกับ slow start" }
      ],
      ans: 0
    },
    {
      type: "choice",
      story: `ผู้ส่งมีค่า cwnd = 6000 bytes, adv_wnd ที่ผู้รับประกาศล่าสุด = 4000 bytes, last_byte_sent = 12000, last_byte_acked = 10000`,
      q: "ผู้ส่งส่งข้อมูลใหม่ได้อีกกี่ byte ในตอนนี้ (effective_wnd)?",
      opts: [
        { t: "4000 bytes", why: "ผิด: นี่คือ wnd = min(cwnd, adv_wnd) แต่ยังต้องหักข้อมูลที่ส่งไปแล้วและยังไม่ได้ ACK" },
        { t: "6000 bytes", why: "ผิด: ใช้ cwnd อย่างเดียว ทั้งที่ผู้รับประกาศ window เล็กกว่า" },
        { t: "4000 − 2000 = 2000 bytes", why: "ถูก: wnd = min(6000, 4000) = 4000; ข้อมูลค้างในเครือข่าย = 12000 − 10000 = 2000; effective_wnd = 2000" },
        { t: "6000 − 2000 = 4000 bytes", why: "ผิด: ต้องใช้ min(cwnd, adv_wnd) ก่อนหักข้อมูลที่ค้างอยู่" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `ผู้ใช้ดาวน์โหลดไฟล์ผ่าน TCP บนเครือข่ายที่ router มี buffer เล็กและ load สูง segment ถูก drop บ่อย ทำให้เกิด retransmission และ latency สูง ผู้ดูแลต้องการลด latency และยอมเปลี่ยน protocol ที่ใช้ได้ หน้าเว็บมี object หลายสิบชิ้นโหลดพร้อมกันบน connection เดียว`,
      q: "ทางเลือกใดช่วยลด latency ได้ตรงปัญหาที่สุด?",
      opts: [
        { t: "เพิ่ม RTO ให้ยาวขึ้นเพื่อให้ retransmit น้อยลง", why: "ผิด: RTO ยาวขึ้นทำให้กว่าจะรู้ว่า loss นานขึ้น latency ยิ่งสูง" },
        { t: "ใช้ QUIC (บน UDP) ที่ multiplex หลาย stream อิสระและรวม handshake เพื่อให้ loss ไม่บล็อก object อื่น", why: "ถูก: บน TCP segment เดียวที่หายทำให้ทุก object บน connection หยุดรอ (HOL blocking) QUIC แยก stream ไม่ให้บล็อกกัน และลด RTT ตอนเริ่มต้นด้วย 0-RTT/รวม handshake" },
        { t: "เพิ่ม MSS ให้ใหญ่ที่สุดเท่าที่ทำได้", why: "ผิด: segment ใหญ่ขึ้นเสี่ยง fragmentation/loss มากขึ้น และไม่แก้ HOL blocking" },
        { t: "ปิด flow control เพื่อให้ผู้ส่งส่งได้เร็วที่สุด", why: "ผิด: จะยิ่งทำให้ receiver/เครือข่ายล้นและ loss เพิ่มขึ้น" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `Client ส่ง FIN ไปหา server ซึ่งตอบกลับ ACK ทันที แต่ server ยังมีไฟล์ log ที่ต้องส่งต่อให้ client อีกหลายร้อย KB`,
      q: "สถานะของ connection ตอนนี้และสิ่งที่ server ทำได้คือข้อใด?",
      opts: [
        { t: "connection ปิดสมบูรณ์แล้ว server ส่งข้อมูลไม่ได้อีก", why: "ผิด: ยังไม่ได้ปิดครบ ต้องรอ FIN จาก server ด้วย" },
        { t: "ต้องทำ 3-way handshake ใหม่ก่อน server จึงจะส่งต่อได้", why: "ผิด: handshake ใช้ตอนสร้าง connection ไม่ใช่หลังปิดครึ่งทาง" },
        { t: "half-open: client ปิดทิศทางที่ส่งแล้ว แต่ server ยังส่งข้อมูลต่อได้ และเมื่อเสร็จจึงส่ง FIN ของตนเอง", why: "ถูก: การปิดแต่ละทิศแยกกัน ฝั่งที่รับ FIN ยังส่งข้อมูลต่อได้จนกว่าจะส่ง FIN และได้ ACK สุดท้าย" },
        { t: "server ต้องส่ง FIN ทันที ห้ามส่งข้อมูลอีก", why: "ผิด: ไม่มีข้อบังคับเช่นนั้น TCP อนุญาต half-open" }
      ],
      ans: 2
    },
    {
      type: "choice",
      story: `ผู้ส่งวัด RTT ได้ old_rtt = 100 ms ใช้ α = 0.875 จากนั้น segment หนึ่ง timeout และถูก retransmit ก่อนได้ ACK กลับมาในเวลา 140 ms นับจากการส่งครั้งล่าสุด`,
      q: "ผู้ส่งควรทำอย่างไรกับ sample 140 ms นี้ และถ้านำ sample ปกติ 140 ms มาใช้ RTO จะเป็นเท่าใด?",
      opts: [
        { t: "ใช้ sample นี้ทันที ได้ RTO = 210 ms", why: "ผิดส่วนแรก: คำนวณถูกว่า new_rtt=105, RTO=210 แต่ sample จาก segment ที่ retransmit ไม่ควรนำมาใช้ เพราะไม่รู้ว่า ACK ตอบฉบับไหน" },
        { t: "ทิ้ง sample (Karn's algorithm); ถ้าเป็น sample ของ segment ปกติ new_rtt = 105 ms และ RTO = 210 ms", why: "ถูก: Karn's algorithm ให้ข้าม sample ที่กำกวม; ตัวเลข: 0.875×100 + 0.125×140 = 105 และ RTO = 2×105 = 210" },
        { t: "ทิ้ง sample; ถ้าเป็น sample ปกติ new_rtt = 120 ms และ RTO = 240 ms", why: "ผิด: คำนวณ moving average ผิด (ค่าเฉลี่ยตรง ๆ ไม่ใช่ α = 0.875)" },
        { t: "ใช้ sample เป็น RTO ตรง ๆ = 140 ms", why: "ผิด: ทั้งไม่ควรใช้ sample กำกวม และ RTO ต้องเป็น 2×new_rtt" }
      ],
      ans: 1
    },
    {
      type: "choice",
      story: `connection เกิด timeout ขณะที่ cwnd = 12 segments และ ssthresh เดิม = 16 (ใช้หลักมาตรฐานแบบ Tahoe: ssthresh = cwnd/2 แล้วเริ่ม slow start ใหม่ที่ cwnd = 1)`,
      q: "หลังตรวจพบ timeout ค่า ssthresh และ cwnd ใหม่คือข้อใด และ cwnd เมื่อผ่านไป 2 RTT (ยังไม่ถึง ssthresh) คือเท่าใด?",
      opts: [
        { t: "ssthresh = 12, cwnd = 12 แล้วเพิ่มทีละ 1", why: "ผิด: ไม่มีการลดอัตราเลย ทั้งที่ timeout คือสัญญาณ congestion" },
        { t: "ssthresh = 16, cwnd = 1, ผ่าน 2 RTT cwnd = 4", why: "ผิดส่วนแรก: ssthresh ต้องปรับเป็นครึ่งหนึ่งของ cwnd ขณะเกิด loss ไม่ใช่คงเดิม" },
        { t: "ssthresh = 6, cwnd = 6, ผ่าน 2 RTT cwnd = 8", why: "ผิด: นั่นคือพฤติกรรมแบบ fast recovery (Reno) ไม่ใช่การตอบสนอง timeout แบบ Tahoe ที่ต้องกลับไป cwnd = 1" },
        { t: "ssthresh = 6, cwnd = 1, ผ่าน 2 RTT cwnd = 4", why: "ถูก: ssthresh = 12/2 = 6; cwnd = 1 → 2 → 4 (ยังต่ำกว่า 6 จึงยัง slow start ×2 ต่อ RTT)" }
      ],
      ans: 3
    },
    {
      type: "choice",
      story: `วิศวกรวัด throughput ของสอง flow บน link เดียวกันที่ bottleneck ทั้งคู่ใช้ TCP และเริ่มต้นพร้อมกัน flow A เริ่มตอน cwnd = 1 ส่วน flow B ตั้ง cwnd เริ่มต้นสูงมากและไม่ลด cwnd เมื่อ packet loss`,
      q: "ผลที่คาดว่าจะเกิดกับเครือข่ายคือข้อใด?",
      opts: [
        { t: "queue ที่ router เต็ม เกิด drop และ delay สูง; flow ที่ทำตาม AIMD ถอยลงขณะที่ B ยึดแบนด์วิดท์ ทำให้ไม่ fair และ goodput รวมต่ำจาก retransmission", why: "ถูก: congestion control ต้องร่วมมือกัน ฝ่ายที่ไม่ลด rate ทำให้เกิด congestion และเอาเปรียบ ส่วน A ตามหลักการ AIMD จะลด cwnd" },
        { t: "ทั้งสอง flow ได้ throughput เท่ากันเสมอ เพราะ TCP ยุติธรรมโดยอัตโนมัติ", why: "ผิด: fairness ของ TCP อาศัยการที่ทุก flow ลด cwnd เมื่อ loss ถ้า B ไม่ลด จะเอาเปรียบ" },
        { t: "network capacity เพิ่มขึ้นเองเพราะ B ส่งมากขึ้น", why: "ผิด: capacity ของ link คงที่ การส่งมากขึ้นแค่สร้าง queue และ drop" },
        { t: "flow A จะเปลี่ยนไปใช้ cwnd ของ B โดยอัตโนมัติ", why: "ผิด: cwnd เป็นตัวแปรภายในของแต่ละผู้ส่ง ไม่มีการแชร์" }
      ],
      ans: 0
    },
    {
      type: "multi",
      story: `ช่วง slow start ของ connection หนึ่ง เริ่มที่ cwnd = 1 และ ssthresh = adv_wnd`,
      q: "เลือกทุกข้อที่ถูกต้อง",
      opts: [
        { t: "cwnd เพิ่มเป็น 2 เท่าต่อ RTT", ok: true, why: "ถูก: ทุก ACK เพิ่ม cwnd จึงรวมเป็น exponential ต่อ RTT" },
        { t: "หยุด slow start เมื่อ cwnd ถึง ssthresh หรือเกิด packet loss", ok: true, why: "ถูก: เป็นเงื่อนไขออกจาก slow start" },
        { t: "เรียกว่า slow เพราะ cwnd โตช้ากว่า congestion avoidance", ok: false, why: "ผิด: slow start โตเร็วกว่า (exponential) ชื่อเรียกเพราะเริ่มจาก cwnd เล็ก" },
        { t: "ใช้ probe หา bottleneck bandwidth ให้ถึง knee เร็ว", ok: true, why: "ถูก: เป้าหมายคือไปถึง knee ให้เร็ว" },
        { t: "cwnd เพิ่มครั้งละ 1/cwnd ต่อ ACK", ok: false, why: "ผิด: นั่นคือ congestion avoidance (AIMD)" }
      ]
    },
    {
      type: "multi",
      story: `เว็บไซต์หนึ่งต้องโหลดรูป สคริปต์ และ CSS หลายสิบไฟล์ผ่านมือถือบนเครือข่ายที่ packet loss เป็นครั้งคราวและมี RTT สูง ผู้ดูแลกำลังพิจารณาย้ายจาก HTTP บน TCP ไปใช้ QUIC`,
      q: "เลือกทุกข้อที่เป็นประโยชน์จริงของ QUIC ต่อสถานการณ์นี้",
      opts: [
        { t: "รวม TCP handshake กับ TLS handshake ทำให้ใช้ RTT ตอนเริ่มต้นน้อยลง", ok: true, why: "ถูก: ลด latency ก่อนส่งข้อมูลแรก" },
        { t: "เมื่อกลับมาที่ server เดิม ส่งข้อมูลได้ทันทีแบบ 0-RTT จากข้อมูลที่ cache ไว้", ok: true, why: "ถูก: เก็บข้อมูลของระบบที่เคยเชื่อมต่อ" },
        { t: "packet ที่หายใน stream หนึ่งไม่ทำให้ stream ของ object อื่นต้องรอ", ok: true, why: "ถูก: ไม่มี head-of-line blocking ข้าม stream" },
        { t: "ไม่ต้องมี loss recovery ใด ๆ เพราะ UDP ส่งถึงเสมอ", ok: false, why: "ผิด: UDP ไม่รับประกัน QUIC ต้องทำ reliability และ congestion control เองในระดับ QUIC" },
        { t: "ทำให้ bandwidth ของ link เพิ่มขึ้น", ok: false, why: "ผิด: QUIC ลด latency ไม่ได้เพิ่ม capacity ของ link" }
      ]
    },
    {
      type: "blank",
      story: `Client (ISN = 500) เริ่ม handshake กับ server (ISN = 900) ผ่าน TCP`,
      text: `segment แรกคือ SYN มี seq = 500 และ ack = {1}; segment ที่สองคือ SYN/ACK มี seq = 900 และ ack = {2}; segment ที่สามคือ ACK ของ client มี seq = {3}`,
      blanks: [
        { opts: ["0", "500", "501", "900"], ans: 0, why: "SYN แรกยังไม่มีอะไรให้ ACK จึงเป็น <SeqC, 0>" },
        { opts: ["500", "501", "900", "901"], ans: 1, why: "ACK ISN ของ client + 1 = 501" },
        { opts: ["500", "501", "900", "901"], ans: 1, why: "ACK เป็นไปตาม <SeqC+1, SeqS+1> จึง seq = 501 และ ack = 901" }
      ]
    },
    {
      type: "blank",
      text: `ใน congestion control, ผู้ส่งใช้ wnd = {1}(cwnd, adv_wnd); เมื่อ cwnd {2} ssthresh อยู่ในโหมด slow start (เพิ่ม 2 เท่าต่อ RTT) แต่เมื่อ cwnd {3} ssthresh จะเข้าโหมด AIMD (เพิ่ม 1 ต่อ RTT)`,
      blanks: [
        { opts: ["max", "min", "sum", "avg"], ans: 1, why: "wnd = min(cwnd, adv_wnd) เพื่อไม่ให้เกินทั้งขีดจำกัดของ network และของ receiver" },
        { opts: ["&lt;", "&gt;=", "=", "&gt;"], ans: 0, why: "slow start เมื่อ cwnd < ssthresh" },
        { opts: ["&lt;", "&gt;=", "=", "&lt;="], ans: 1, why: "congestion avoidance เมื่อ cwnd ≥ ssthresh" }
      ]
    },
    {
      type: "blank",
      story: `วิเคราะห์การตั้ง RTO ของผู้ส่ง`,
      text: `ถ้า RTO ตั้งสั้นเกินไป จะเกิดการ {1} โดยไม่จำเป็น; ถ้าตั้งยาวเกินไป จะ {2}; และสำหรับ segment ที่ถูก retransmit แล้ว ผู้ส่งใช้หลัก {3} คือไม่นำ RTT sample มาคำนวณ`,
      blanks: [
        { opts: ["retransmit", "handshake", "teardown", "fragment"], ans: 0, why: "ACK ยังมาไม่ถึงแต่ผู้ส่งส่งซ้ำก่อน ทำให้เปลือง bandwidth" },
        { opts: ["ตรวจ loss ช้า latency สูง", "ตรวจ loss เร็วเกินไป", "cwnd เพิ่มเร็วเกินไป", "checksum ผิด"], ans: 0, why: "รอนานกว่าจะรู้ว่า loss ทำให้ล่าช้า" },
        { opts: ["Nagle", "Karn's algorithm", "AIMD", "slow start"], ans: 1, why: "Karn's algorithm ข้าม sample ที่กำกวมจาก retransmission" }
      ]
    },
    {
      type: "match",
      q: "จับคู่แนวคิดกับความหมาย",
      pairs: [
        ["SYN", "flag ที่ใช้สร้าง connection และกิน sequence number 1 ตัว"],
        ["ssthresh", "ค่าที่แบ่ง slow start กับ congestion avoidance"],
        ["Karn's algorithm", "ไม่ใช้ RTT sample ของ segment ที่ retransmit"],
        ["Head-of-line blocking", "segment หนึ่งหายทำให้ข้อมูลอื่นบน byte stream เดียวกันต้องรอ"],
        ["0-RTT (QUIC)", "ส่งข้อมูลได้ทันทีเมื่อเชื่อมต่อซ้ำจาก cache"]
      ],
      why: "แต่ละคำเป็นกลไกเฉพาะของ TCP/QUIC ตามที่ระบุ"
    }
  ]
});
