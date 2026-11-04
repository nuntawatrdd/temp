/* เครื่องมือจำลองแบบกดเล่นได้ ผูกกับเนื้อหาแต่ละบท */
(function(){
const h=(...a)=>window.__h(...a);
const $=(s,el)=>(el||document).querySelector(s);
const $$=(s,el)=>Array.from((el||document).querySelectorAll(s));
const fld=(label,input)=>h('label',{class:'fld'},label,input);
const num=(v,min,max,step)=>h('input',{type:'number',value:v,min,max,step:step||1});
const kpi=(l,v)=>h('div',{class:'kpi'},h('small',null,l),h('strong',null,v));
const fmtN=(n,d)=>n.toLocaleString('en-US',{maximumFractionDigits:d==null?2:d});
function logger(el){return m=>{el.append(h('div',null,m));el.scrollTop=el.scrollHeight}}

const TOOLS={m08:[],w11:[],w12:[],w13:[],w14:[]};

/* ============================ M8 ============================ */
TOOLS.m08.push({title:'จำลอง Multi-AZ failover vs Read replica',
 desc:'ลองเขียนข้อมูล ทำให้ AZ1 ล่ม แล้วดูว่าอะไรช่วยตอนล่ม (Multi-AZ, synchronous) และอะไรช่วยแค่เรื่องอ่าน (Read replica, asynchronous)',
 mount(el){
  const S={primary:{az:'AZ1',v:1,alive:true},standby:{az:'AZ2',v:1,alive:true},replica:{az:'AZ2',v:1,alive:true},multi:true,app:'ok'};
  const L=h('div',{class:'log'});const log=logger(L);
  const diag=h('div',{class:'dgm'});
  const cb=h('input',{type:'checkbox',checked:true});
  const node=(n,role,x,extra)=>h('div',{class:'node '+(x.alive?'live':'dead')},h('b',null,role),n+' · '+x.az,h('br'),'ข้อมูล v'+x.v,extra?h('br'):null,extra||null);
  function draw(){
    const p=S.primary;
    diag.replaceChildren(
      node('Primary',p.role||'Primary (read/write)',p),
      h('div',{class:'arrow'},S.multi?'⇄ sync':'(ไม่มี standby)'),
      S.multi?node('Standby','Standby (Multi-AZ)',S.standby):h('div',{class:'node'},'ไม่ได้เปิด Multi-AZ'),
      h('div',{class:'arrow'},'⇢ async'),
      node('Read replica','Read replica',S.replica,S.replica.v<(p.alive?p.v:S.replica.v)?'⚠ ล้าหลัง':null));
    status.className='out '+(S.app==='ok'?'':'bad');
    status.innerHTML='สถานะแอป: <b>'+(S.app==='ok'?'ปกติ — เชื่อมต่อ '+S.primary.az:'ล่ม — ไม่มี primary ให้เขียน')+'</b>';
  }
  const status=h('div',{class:'out'});
  const act=(l,f,cls)=>h('button',{class:'btn '+(cls||''),type:'button',onclick:()=>{f();draw()}},l);
  cb.addEventListener('change',()=>{S.multi=cb.checked;log(S.multi?'เปิด Multi-AZ: มี standby คนละ AZ':'ปิด Multi-AZ: ไม่มี standby');draw()});
  const write=()=>{
    if(S.app!=='ok'){log('✘ เขียนไม่ได้: ไม่มี primary');return}
    S.primary.v++;
    if(S.multi&&S.standby.alive){S.standby.v=S.primary.v;log('เขียน v'+S.primary.v+' → primary แล้ว replicate ไป standby แบบ synchronous (เสร็จก่อนตอบรับ)')}
    else log('เขียน v'+S.primary.v+' → primary');
    log('replicate ไป read replica แบบ asynchronous (ยังไม่ถึง — กด "รอ replication")');
  };
  const readRep=()=>{
    if(!S.replica.alive){log('✘ read replica ไม่พร้อม');return}
    const cur=S.app==='ok'?S.primary.v:S.replica.v;
    log(S.replica.v<cur?'อ่านจาก replica ได้ v'+S.replica.v+' แต่ primary เป็น v'+cur+' → ข้อมูลเก่า (ถ้าต้องการ read-after-write ให้อ่านจาก primary)':'อ่านจาก replica ได้ v'+S.replica.v+' (ทันกับ primary)')};
  const sync=()=>{if(S.app==='ok'){S.replica.v=S.primary.v;log('replica ตามทัน → v'+S.replica.v)}else log('ไม่มี primary ให้ replicate')};
  const fail=()=>{
    if(!S.primary.alive){log('AZ1 ล่มอยู่แล้ว');return}
    S.primary.alive=false;log('✘ AZ1 ล่ม (loss of availability ใน primary AZ)');
    if(S.multi&&S.standby.alive){S.primary=Object.assign({},S.standby,{role:'Primary (เดิมคือ standby)'});S.standby={az:'—',v:S.primary.v,alive:false};S.app='ok';log('✔ Automated failover: standby ถูกเลื่อนเป็น primary อัตโนมัติ ไม่ต้องมีคนทำ');}
    else{S.app='down';log('✘ ไม่มี standby — แอปล่มจนกว่าจะมีคน promote read replica ด้วยมือ')}
  };
  const promote=()=>{
    if(S.app==='ok'){log('primary ยังปกติ ไม่จำเป็นต้อง promote');return}
    if(!S.replica.alive){log('ไม่มี replica');return}
    S.primary=Object.assign({},S.replica,{role:'Primary (promote จาก replica)'});S.replica={az:'—',v:0,alive:false};S.app='ok';
    log('✔ Promote read replica เป็น primary (ด้วยมือ) — ข้อมูลที่ยังไม่ถูก replicate อาจหาย เพราะ replication เป็น async');
  };
  const reset=()=>{Object.assign(S,{primary:{az:'AZ1',v:1,alive:true},standby:{az:'AZ2',v:1,alive:true},replica:{az:'AZ2',v:1,alive:true},app:'ok'});S.multi=cb.checked;L.replaceChildren();log('รีเซ็ตแล้ว')};
  el.append(h('div',{class:'row'},h('label',{class:'fld'},'Multi-AZ deployment',h('span',null,cb,' เปิดใช้'))),
    h('div',{class:'row'},act('✍ เขียนข้อมูล',write,'pri'),act('📖 อ่านจาก replica',readRep),act('⏱ รอ replication',sync),act('💥 AZ1 ล่ม',fail),act('⬆ Promote read replica',promote),act('↺ รีเซ็ต',reset)),
    diag,status,L);
  draw();log('ลอง: เขียนหลายครั้ง → อ่านจาก replica → กด AZ1 ล่ม (ทั้งแบบเปิด/ปิด Multi-AZ)');
 }});

TOOLS.m08.push({title:'ตัวช่วยเลือกฐานข้อมูล (The right tool for the right job)',
 desc:'เลือก requirement ของคุณ แล้วดูว่าสไลด์แนะนำบริการใด พร้อมเหตุผล',
 mount(el){
  const R=[
   ['Enterprise-class relational database, SQL, JOIN, ACID','Amazon RDS (หรือ Amazon Aurora ถ้าต้องการ performance/HA ระดับสูงแบบเข้ากันได้กับ MySQL/PostgreSQL)','RDS ใช้เมื่อมี complex transactions/queries, write rate กลาง–สูง (ถึง ~30,000 IOPS) และไม่เกิน single worker node/shard'],
   ['Fast & flexible NoSQL สำหรับ any scale, single-digit ms, schema ยืดหยุ่น','Amazon DynamoDB','Key-value/document, ไม่จำกัดขนาด table/throughput, เหมาะ mobile/web/gaming/adtech/IoT'],
   ['Read/Write ระดับมหาศาล (เช่น 150,000 writes/s) หรือต้อง sharding','Amazon DynamoDB (ไม่ใช่ RDS)','สไลด์ "Do not use Amazon RDS": massive read/write rates, sharding, simple GET/PUT ที่ NoSQL ทำได้'],
   ['Data warehouse / analytics / BI บนข้อมูลขนาดใหญ่','Amazon Redshift','Columnar storage + parallel processing (leader node + compute nodes), scale ได้โดยไม่มี downtime, เข้ารหัสในตัว'],
   ['ต้องเข้าถึง OS หรือใช้ฟีเจอร์ที่ AWS database service ไม่รองรับ','Databases on Amazon EC2','แลกกับการดูแล OS/patch/backup/HA/scaling เองทั้งหมด'],
   ['ความต้องการเฉพาะ: machine learning, graph, in-memory','AWS purpose-built database services (เช่น Neptune, ElastiCache)','ดูภาพรวมในสไลด์ "Amazon database options"'],
   ['ต้องการ managed + ลดงานดูแล: patch, backup, HA, scaling','บริการ managed (RDS/Aurora/DynamoDB/Redshift)','Managed: AWS ดูแล OS/DB patch, backup, HA, scaling — คุณดูแลแค่ application optimization']];
  const sel=h('select',null,R.map((r,i)=>h('option',{value:i},r[0])));
  const out=h('div',{class:'out'});
  const f=()=>{const r=R[+sel.value];out.innerHTML='<b>'+r[1]+'</b><br>'+r[2]};
  sel.addEventListener('change',f);
  el.append(h('div',{class:'row'},fld('requirement ของคุณ',sel)),out);f();
 }});

/* ============================ W11 ============================ */
TOOLS.w11.push({title:'เครื่องคำนวณ Availability, MTBF และ "จำนวน 9"',
 desc:'แปลง availability เป็นเวลาที่ล่มได้ และลองสูตร MTBF = MTTF + MTTR, Availability = เวลาทำงานปกติ / เวลาทั้งหมด',
 mount(el){
  const sel=h('select',null,['99','99.9','99.95','99.99','99.999','custom'].map(v=>h('option',{value:v},v==='custom'?'กำหนดเอง':v+'%')));sel.value='99.9';
  const cu=num(99.5,0,100,0.001);
  const out=h('div',{class:'kpis'});
  const fmt=m=>{if(m>=1440)return fmtN(m/1440,2)+' วัน';if(m>=60)return fmtN(m/60,2)+' ชม.';if(m>=1)return fmtN(m,2)+' นาที';return fmtN(m*60,1)+' วินาที'};
  const f=()=>{const a=sel.value==='custom'?+cu.value:+sel.value;const d=(100-a)/100;
    out.replaceChildren(kpi('ล่มได้ต่อปี',fmt(d*525600)),kpi('ต่อเดือน (30 วัน)',fmt(d*43200)),kpi('ต่อสัปดาห์',fmt(d*10080)),kpi('ต่อวัน',fmt(d*1440)))};
  [sel,cu].forEach(x=>x.addEventListener('input',f));
  const mttf=num(240,1,100000),mttr=num(10,0.1,10000,0.1),mo=h('div',{class:'out'});
  const g=()=>{const a=+mttf.value,b=+mttr.value;mo.innerHTML='MTBF = MTTF + MTTR = <b>'+fmtN(a+b)+' ชม.</b> · Availability = MTTF / MTBF = <b>'+fmtN(100*a/(a+b),3)+'%</b>'};
  [mttf,mttr].forEach(x=>x.addEventListener('input',g));
  el.append(h('div',{class:'row'},fld('Availability',sel),fld('ค่ากำหนดเอง (%)',cu)),out,
   h('h4',{style:'margin:16px 0 8px'},'MTBF / MTTF / MTTR'),h('div',{class:'row'},fld('MTTF (ชม. ทำงานได้ก่อนล่ม)',mttf),fld('MTTR (ชม. ซ่อม)',mttr)),mo);
  f();g();
 }});

TOOLS.w11.push({title:'จำลอง EC2 Auto Scaling (step scaling policy)',
 desc:'ปรับโหลด แล้วกด "1 รอบ" เพื่อดู CPU และจำนวน instance เปลี่ยนตามตาราง step ในสไลด์ 53 (ภายใต้ min / max / desired)',
 mount(el){
  const mn=num(1,1,20),mx=num(8,1,40),ds=num(2,1,40),cap=num(100,10,1000,10);
  const load=h('input',{type:'range',min:0,max:2000,step:10,value:150});const lv=h('b',null,'150');
  const S={n:2,t:0};
  const inst=h('div',{class:'inst'}),kp=h('div',{class:'kpis'}),L=h('div',{class:'log'}),log=logger(L);
  const cpu=()=>Math.min(100,100*(+load.value)/(S.n*(+cap.value)));
  const step=c=>c>=71?30:c>=61?10:c>=40?0:c>=30?-10:-30;
  const col=c=>c>=71?'var(--color-bad)':c>=61?'var(--ch-amber)':c>=40?'var(--ch-green)':'var(--ch-blue)';
  function draw(){
    const c=cpu();
    inst.replaceChildren(...Array.from({length:S.n},(_,i)=>h('i',{style:'background:'+col(c)},'i-'+(i+1))));
    const st=step(c);
    kp.replaceChildren(kpi('จำนวน instance',S.n),kpi('CPU เฉลี่ย (จำลอง)',fmtN(c,0)+'%'),kpi('step ที่จะใช้',st>0?'+'+st+'%':st<0?st+'%':'ไม่เปลี่ยน'),kpi('รอบที่',S.t));
  }
  function tick(){
    const mi=+mn.value,ma=+mx.value;S.t++;
    const c=cpu(),p=step(c)/100;let d=0;
    if(p>0){d=S.n*p;d=d<1?1:Math.floor(d)}
    else if(p<0){d=S.n*p;d=d>-1?-1:Math.ceil(d)}
    let nn=Math.max(mi,Math.min(ma,S.n+d));
    log('รอบ '+S.t+': CPU '+fmtN(c,0)+'% → step '+(p*100>0?'+':'')+p*100+'% → '+(nn===S.n?'ไม่เปลี่ยน ('+S.n+')'+(d!==0?' (ชน '+(d>0?'max':'min')+')':''):S.n+' → '+nn));
    S.n=nn;draw();
  }
  let timer=null;const auto=h('button',{class:'btn',type:'button',onclick:()=>{if(timer){clearInterval(timer);timer=null;auto.textContent='▶ เล่นอัตโนมัติ'}else{timer=setInterval(()=>{if(!el.isConnected){clearInterval(timer);return}tick()},900);auto.textContent='⏸ หยุด'}}},'▶ เล่นอัตโนมัติ');
  load.addEventListener('input',()=>{lv.textContent=load.value;draw()});
  [cap].forEach(x=>x.addEventListener('input',draw));
  ds.addEventListener('input',()=>{S.n=Math.max(+mn.value,Math.min(+mx.value,+ds.value));draw()});
  const reset=()=>{S.n=Math.max(+mn.value,Math.min(+mx.value,+ds.value));S.t=0;L.replaceChildren();draw()};
  el.append(h('div',{class:'row'},fld('Minimum',mn),fld('Desired (เริ่มต้น)',ds),fld('Maximum',mx),fld('ความจุต่อ instance (req/s)',cap)),
   h('div',{class:'row'},fld(h('span',null,'โหลดรวม (req/s): ',lv),load),h('button',{class:'btn pri',type:'button',onclick:tick},'⏭ 1 รอบ'),auto,h('button',{class:'btn',type:'button',onclick:reset},'↺ รีเซ็ต')),
   inst,kp,
   h('table',{class:'t'},h('thead',null,h('tr',null,h('th',null,'CPU / metric'),h('th',null,'ปรับ capacity'))),h('tbody',null,
     [['71–100%','+30%'],['61–70%','+10%'],['40–60%','ไม่เปลี่ยน'],['30–39%','−10%'],['< 30%','−30%']].map(r=>h('tr',null,h('td',null,r[0]),h('td',null,r[1]))))),
   h('div',{class:'hint'},'ตารางตามสไลด์ 53; การปัดเศษในเครื่องมือนี้เป็นการจำลองอย่างง่าย (อย่างน้อย ±1 instance) ไม่ใช่พฤติกรรมที่ AWS ระบุแน่ชัด'),L);
  reset();log('ลองดึงโหลดขึ้นสูงแล้วกด "1 รอบ" ต่อเนื่อง จากนั้นลดโหลดลง');
 }});

TOOLS.w11.push({title:'ALB · NLB · GWLB เลือกตัวไหน?',
 desc:'ติ๊กสิ่งที่ระบบต้องการ แล้วดูผลตามตาราง "Choosing between ALB and NLB" ("Default to ALB… reach for NLB when ALB structurally cannot do the job")',
 mount(el){
  const N=[
   ['Routing ตาม URL path หรือ hostname','alb'],['HTTP health check พร้อม status code','alb'],['WAF integration / user authentication','alb'],
   ['โปรโตคอลที่ไม่ใช่ HTTP (UDP, MQTT, custom TCP)','nlb',1],['IP คงที่เพื่อใส่ใน firewall rule ของพันธมิตร','nlb',1],['ต้องเห็น client source IP ที่ server โดยตรง','nlb'],
   ['Throughput สูงมาก / latency ต่ำสุด (ล้าน connection ต่อวินาที)','nlb'],['เผยแพร่ service ให้ VPC อื่นผ่าน PrivateLink','nlb',1],
   ['ต้องส่งทราฟฟิกผ่าน firewall/IDS ของบุคคลที่สาม (virtual appliance)','gwlb',1]];
  const out=h('div',{class:'out'});
  const boxes=N.map(n=>h('input',{type:'checkbox'}));
  const f=()=>{
    const s={alb:0,nlb:0,gwlb:0,hard:0};
    N.forEach((n,i)=>{if(boxes[i].checked){s[n[1]]++;if(n[2]&&n[1]==='nlb')s.hard++}});
    let m;
    if(s.gwlb)m='<b>Gateway Load Balancer (GWLB)</b> — ส่งทราฟฟิกผ่าน appliance (Layer 3) เป็น "จุดตรวจ" ก่อนไปยังปลายทาง ไม่ได้แทนที่ ALB/NLB';
    else if(!s.alb&&!s.nlb)m='ติ๊กความต้องการอย่างน้อยหนึ่งข้อ';
    else if(s.hard)m='<b>NLB</b> — มีข้อกำหนดที่ ALB ทำไม่ได้โดยโครงสร้าง (UDP/non-HTTP, static IP, PrivateLink)'+(s.alb?'<br><span class="warn">⚠ แต่คุณติ๊กข้อที่เป็นจุดเด่นของ ALB ด้วย (path routing/WAF ฯลฯ) — ต้องชั่งน้ำหนักหรือแยกตามบริการ</span>':'');
    else if(s.nlb>s.alb)m='<b>NLB</b> (ได้เปรียบ) — แต่ ALB ก็ทำได้ในระดับ "Good" ถ้าไม่ได้ต้องการความเร็วสูงสุดจริง ๆ';
    else m='<b>ALB</b> — ค่าเริ่มต้นสำหรับ web application: อ่าน URL/host/header/cookie ได้ (Layer 7)';
    out.innerHTML=m;};
  boxes.forEach(b=>b.addEventListener('change',f));
  el.append(h('div',{class:'checks'},N.map((n,i)=>h('label',null,boxes[i],h('span',null,n[0])))),out);f();
 }});

/* ============================ W12 ============================ */
TOOLS.w12.push({title:'เครื่องคำนวณ TTL ของ CloudFront (2 ขั้น)',
 desc:'Step 1: origin ขออะไร (ลำดับ s-maxage → max-age → Expires → Default) · Step 2: clamp ด้วย Min/Max TTL ของ cache policy  — "The origin proposes. The cache policy constrains."',
 mount(el){
  const mode=h('select',null,[['none','(ไม่ส่ง Cache-Control)'],['max-age','Cache-Control: max-age'],['s-maxage','Cache-Control: s-maxage'],['no-store','Cache-Control: no-store / no-cache (TTL = 0)']].map(o=>h('option',{value:o[0]},o[1])));
  const val=h('input',{type:'text',value:'60s'}),exp=h('input',{type:'text',placeholder:'เช่น 2h (ว่าง = ไม่ส่ง)'});
  const mi=h('input',{type:'text',value:'0'}),de=h('input',{type:'text',value:'24h'}),ma=h('input',{type:'text',value:'1y'});
  const out=h('div',{class:'out'});
  const U={s:1,m:60,min:60,h:3600,d:86400,y:31536000};
  const parse=t=>{const m=String(t).trim().match(/^(\d+(?:\.\d+)?)\s*(s|min|m|h|d|y)?$/i);return m?+m[1]*U[(m[2]||'s').toLowerCase()]:null};
  const fmt=s=>{if(s===0)return '0 วินาที';for(const [u,l] of [[31536000,'ปี'],[86400,'วัน'],[3600,'ชั่วโมง'],[60,'นาที']])if(s>=u&&s%u===0)return s/u+' '+l;return fmtN(s,0)+' วินาที'};
  const f=()=>{
    const a=parse(mi.value),b=parse(de.value),c=parse(ma.value),v=parse(val.value),e=exp.value.trim()?parse(exp.value):null;
    if([a,b,c].includes(null)||((mode.value==='max-age'||mode.value==='s-maxage')&&v==null)){out.textContent='กรอกค่าเป็นเลขตามด้วยหน่วย s/m/h/d/y เช่น 60s, 1h, 24h, 7d, 1y';return}
    let s1,why;
    if(mode.value==='s-maxage'){s1=v;why='s-maxage (CloudFront เท่านั้น) มาก่อนเสมอ'}
    else if(mode.value==='max-age'){s1=v;why='max-age'}
    else if(mode.value==='no-store'){s1=0;why='no-store / no-cache = ตัวเลข 0 (ไม่ใช่คำวิเศษ)'}
    else if(e!=null){s1=e;why='Expires (ใช้เฉพาะเมื่อไม่มี Cache-Control)'}
    else{s1=b;why='origin เงียบ → ใช้ Default TTL'}
    let s2=Math.max(a,Math.min(c,s1)),note='';
    if(s2>s1)note='<br><b class="bad">⚠ Minimum TTL ('+fmt(a)+') ยกค่าขึ้น — นี่คือ "ความผิดพลาด" ที่สไลด์เตือน (รวมถึงยก 0 ของ no-store ด้วย)</b>';
    else if(s2<s1)note='<br><b class="warn">Maximum TTL ลดค่าลง (เพดาน)</b>';
    out.innerHTML='Step 1: '+why+' → <b>'+fmt(s1)+'</b><br>Step 2: clamp( '+fmt(s1)+', min '+fmt(a)+', max '+fmt(c)+' ) → <b>'+fmt(s2)+'</b>'+(s2===0?' <b>(ไม่แคช)</b>':'')+note+(mode.value==='none'&&e!=null?'':'')+'<br><span class="hint">ผลลัพธ์: แคชที่ edge นาน '+fmt(s2)+'</span>';
  };
  [mode,val,exp,mi,de,ma].forEach(x=>x.addEventListener('input',f));
  const P=[['max-age','60s','0','24h','1y'],['none','','0','24h','1y'],['max-age','60s','1h','24h','1y'],['no-store','','0','24h','1y'],['no-store','','1h','24h','1y'],['max-age','90d','0','24h','7d']];
  const pre=h('div',{class:'row'},P.map((p,i)=>h('button',{class:'btn',type:'button',onclick:()=>{mode.value=p[0];val.value=p[1]||'60s';mi.value=p[2];de.value=p[3];ma.value=p[4];f()}},'ตัวอย่าง '+(i+1))));
  el.append(h('div',{class:'hint',style:'margin-bottom:6px'},'ปุ่มด้านล่างคือ 6 แถวของตาราง “Worked examples” (สไลด์ 26)'),pre,
   h('div',{class:'row'},fld('Origin ส่ง',mode),fld('ค่า (s-maxage / max-age)',val),fld('Expires (ถ้ามี)',exp)),
   h('div',{class:'row'},fld('Minimum TTL',mi),fld('Default TTL',de),fld('Maximum TTL',ma)),out);f();
 }});

TOOLS.w12.push({title:'Cache simulator: Lazy loading · Write-through · TTL',
 desc:'กด อ่าน / เขียน / ให้เวลาผ่านไป แล้วสังเกต cache hit, miss และ "อ่านได้ข้อมูลเก่า (stale)" ของแต่ละกลยุทธ์',
 mount(el){
  const S={t:0,dbv:1,cache:null,hit:0,miss:0,stale:0};
  const strat=h('select',null,[['lazy','Lazy loading (เติม cache ตอนอ่านพลาด)'],['wt','Write-through (เติม cache ตอนเขียน)'],['both','ผสม: Lazy + Write-through']].map(o=>h('option',{value:o[0]},o[1])));
  const ttl=num(60,10,600,10);
  const L=h('div',{class:'log'}),log=logger(L),kp=h('div',{class:'kpis'}),st=h('div',{class:'out'});
  const draw=()=>{
    if(S.cache&&S.cache.exp<=S.t){log('⏳ TTL ของ key หมดอายุ → ถูกลบจาก cache');S.cache=null}
    const rate=S.hit+S.miss?Math.round(100*S.hit/(S.hit+S.miss)):0;
    kp.replaceChildren(kpi('Cache hit',S.hit),kpi('Cache miss',S.miss),kpi('Hit rate',rate+'%'),kpi('อ่านได้ค่าเก่า (stale)',S.stale),kpi('เวลา (วินาที)',S.t));
    st.innerHTML='Database: <b>v'+S.dbv+'</b> · Cache: <b>'+(S.cache?'v'+S.cache.v+' (เหลือ '+(S.cache.exp-S.t)+' วินาที)':'ว่าง')+'</b>';
  };
  const read=()=>{draw();
    if(S.cache){S.hit++;if(S.cache.v!==S.dbv){S.stale++;log('✔ HIT แต่ได้ v'+S.cache.v+' ขณะที่ DB เป็น v'+S.dbv+' → <stale>')}else log('✔ HIT → ได้ v'+S.cache.v+' (ไม่ต้องแตะ DB)')}
    else{S.miss++;
      if(strat.value==='wt'){log('✘ MISS → อ่านจาก DB (v'+S.dbv+') และ "ไม่ใส่ cache" เพราะ write-through เติมตอนเขียนเท่านั้น')}
      else{S.cache={v:S.dbv,exp:S.t+(+ttl.value)};log('✘ MISS → อ่านจาก DB (v'+S.dbv+') → เก็บลง cache (รวม 3 trips: cache, DB, เขียน cache)')}}
    draw()};
  const write=()=>{S.dbv++;
    if(strat.value==='lazy'){log('✍ เขียน DB เป็น v'+S.dbv+' — cache ยังเป็นของเก่าจนกว่า TTL จะหมด')}
    else{S.cache={v:S.dbv,exp:S.t+(+ttl.value)};log('✍ เขียน DB เป็น v'+S.dbv+' และอัปเดต cache ทันที (2 trips ต่อการเขียน)')}
    draw()};
  const wait=n=>()=>{S.t+=n;log('⏱ ผ่านไป '+n+' วินาที');draw()};
  const clear=()=>{S.cache=null;log('🔁 node ถูกเปลี่ยนใหม่ — cache ว่างเปล่า');draw()};
  const reset=()=>{Object.assign(S,{t:0,dbv:1,cache:null,hit:0,miss:0,stale:0});L.replaceChildren();draw()};
  const b=(l,f,c)=>h('button',{class:'btn '+(c||''),type:'button',onclick:f},l);
  el.append(h('div',{class:'row'},fld('กลยุทธ์',strat),fld('TTL (วินาที)',ttl)),
   h('div',{class:'row'},b('📖 อ่าน (GET)',read,'pri'),b('✍ เขียน (UPDATE)',write),b('⏱ +30 วินาที',wait(30)),b('⏱ +120 วินาที',wait(120)),b('🔁 เปลี่ยน node ใหม่',clear),b('↺ รีเซ็ต',reset)),
   st,kp,L);
  reset();log('ลอง: Lazy → อ่าน ×3 → เขียน → อ่าน (ได้ของเก่า?) → +120 วินาที → อ่าน');
 }});

TOOLS.w12.push({title:'SQS: Visibility timeout และข้อความที่ถูกประมวลผลซ้ำ',
 desc:'ตั้ง visibility timeout กับเวลาประมวลผลของ consumer แล้วดูว่าข้อความถูกหยิบกี่ครั้งก่อนจะถูกลบ (แบบจำลองอย่างง่าย: ทุก consumer ใช้เวลาเท่ากัน)',
 mount(el){
  const V=num(30,5,300,5),P=num(90,5,600,5),M=num(3,1,10),out=h('div',{class:'out'}),tl=h('div');
  const f=()=>{
    const v=+V.value,p=+P.value,m=+M.value;
    const n=p<=v?1:Math.ceil(p/v);
    const bars=Array.from({length:n},(_,k)=>{const s=k*v,e=Math.min(p,(k+1)*v);const bad=k+1>m;
      return h('div',{style:'display:flex;align-items:center;gap:8px;margin:4px 0;font-size:13px'},
        h('span',{style:'width:120px;color:var(--muted)'},'ครั้งที่ '+(k+1)+' @ '+s+'s'),
        h('div',{style:'flex:1;background:var(--bg);border:1px solid var(--line);border-radius:6px;height:20px;position:relative'},h('div',{style:'position:absolute;left:'+(100*s/p)+'%;width:'+(100*(e-s)/p)+'%;top:0;bottom:0;border-radius:5px;background:'+(bad?'var(--color-bad)':k===0?'var(--ch-green)':'var(--ch-amber)')})),
        h('span',{style:'width:150px'},bad?'เกิน maxReceiveCount → DLQ':k===0?'ต้นฉบับ':'ซ้ำ (visible อีกครั้ง)'));});
    tl.replaceChildren(...bars);
    out.innerHTML=p<=v?'<b class="good">ประมวลผลเสร็จก่อน timeout ('+p+'s ≤ '+v+'s)</b> → consumer ลบข้อความ → ถูกประมวลผล <b>1 ครั้ง</b>':
     '<b class="bad">เวลาประมวลผล '+p+'s เกิน visibility timeout '+v+'s</b> → ข้อความกลับมา visible ทุก '+v+'s → ถูกหยิบ <b>'+n+' ครั้ง</b> (ซ้ำ '+(n-1)+' ครั้ง)'+(n>m?'<br>ถ้าตั้ง DLQ ที่ maxReceiveCount = '+m+' ข้อความจะถูกย้ายไป Dead-letter queue':'')+'<br><b>แก้:</b> ตั้ง visibility timeout ให้ยาวกว่าเวลาประมวลผล และลบข้อความทันทีที่เสร็จ';
  };
  [V,P,M].forEach(x=>x.addEventListener('input',f));
  el.append(h('div',{class:'row'},fld('Visibility timeout (วินาที)',V),fld('เวลาประมวลผลของ consumer (วินาที)',P),fld('maxReceiveCount (DLQ)',M)),out,tl);f();
 }});

/* ============================ W13 ============================ */
TOOLS.w13.push({title:'Lambda หรือ Container? ตัวช่วยตัดสินใจ',
 desc:'ติ๊กเงื่อนไขของงาน เทียบกับสไลด์ "Choosing containers over AWS Lambda functions" แล้วเลือก ECS/EKS ต่อ',
 mount(el){
  const C=[['รันนานเกินขีดจำกัดของ Lambda (สูงสุด 15 นาทีตามสไลด์ 17)',1],['ใช้หน่วยความจำมากกว่า 10 GB',1],['ย้าย legacy container จากองค์กร/EC2 โดยไม่อยาก refactor',1],['ต้องรันต่อเนื่องตลอดเวลาในต้นทุนคงที่ (ไม่ใช่ pay-per-invocation)',1],['งานสั้น ขับด้วย event (S3, SQS, schedule) และปริมาณไม่แน่นอน',0],['ไม่อยากจัดการเซิร์ฟเวอร์/ทีมใหม่กับ container',0]];
  const box=C.map(()=>h('input',{type:'checkbox'}));
  const kube=h('select',null,h('option',{value:'no'},'ทีมใหม่กับ container / อยากได้เครื่องมือ AWS'),h('option',{value:'yes'},'ทีมคุ้นเคย Kubernetes'));
  const out=h('div',{class:'out'});
  const f=()=>{
    const toC=C.some((c,i)=>c[1]&&box[i].checked),toL=C.some((c,i)=>!c[1]&&box[i].checked);
    let m;
    if(toC){m='<b>Containers</b> — บางเงื่อนไขเกินขีดจำกัดของ Lambda หรือเหมาะกับ container มากกว่า<br>Orchestration: <b>'+(kube.value==='yes'?'Amazon EKS (Kubernetes toolset, ควบคุมมากกว่าแต่ซับซ้อน)':'Amazon ECS (ง่าย, scaling อัตโนมัติ)')+'</b> · Compute: <b>AWS Fargate</b> ถ้าไม่ต้องการจัดการ node';
      if(toL)m+='<br><span class="warn">⚠ คุณติ๊กข้อที่เหมาะกับ Lambda ด้วย — อาจแยกเป็นหลาย service (บางตัว Lambda บางตัว container)</span>'}
    else if(toL)m='<b>AWS Lambda</b> — งานสั้น ขับด้วย event, ไม่ต้องจัดการเซิร์ฟเวอร์, จ่ายตามการเรียกใช้';
    else m='ติ๊กเงื่อนไขอย่างน้อยหนึ่งข้อ';
    out.innerHTML=m};
  box.forEach(b=>b.addEventListener('change',f));kube.addEventListener('change',f);
  el.append(h('div',{class:'checks'},C.map((c,i)=>h('label',null,box[i],h('span',null,c[0])))),h('div',{class:'row'},fld('สำหรับกรณีเลือก container',kube)),out);f();
 }});

TOOLS.w13.push({title:'ลองรัน Lambda handler จากสไลด์ 25',
 desc:'ส่ง event JSON เข้า lambda_handler(event, context) แล้วดูผลที่ return (จำลองด้วย JavaScript ให้ตรงกับตรรกะของโค้ด Python)',
 mount(el){
  const ev=h('textarea',{style:'width:100%;min-height:80px;font:13.5px var(--mono);padding:10px;border-radius:10px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink)'});
  ev.value='{\n  "length": 12,\n  "width": 5\n}';
  const out=h('div',{class:'out'});
  const run=()=>{
    let e;try{e=JSON.parse(ev.value)}catch(x){out.innerHTML='<b class="bad">JSON ไม่ถูกต้อง:</b> '+x.message;return}
    if(!('length' in e)||!('width' in e)){out.innerHTML='<b class="bad">KeyError</b> — event ต้องมี key "length" และ "width" (บรรทัด 3–4 ของโค้ดอ่านจาก event[...])';return}
    const area=e.length*e.width;
    out.innerHTML='ผลที่ return (บรรทัด 7: json.dumps(data)): <b>'+JSON.stringify({area})+'</b><br><span class="hint">event = JSON ที่มีข้อมูลนำเข้า · context = ข้อมูล runtime/invocation (ไม่ได้ใช้ในตัวอย่างนี้)</span>'};
  el.append(h('div',{class:'hint'},'ดูโค้ดเต็มในเนื้อหาสไลด์ #25'),ev,h('div',{style:'margin:10px 0'},h('button',{class:'btn pri',type:'button',onclick:run},'▶ Invoke')),out);run();
 }});

TOOLS.w13.push({title:'Step Functions: Standard หรือ Express?',
 desc:'ติ๊กลักษณะงาน เทียบกับตารางในสไลด์ 45',
 mount(el){
  const T=[['งานรันนานเป็นชั่วโมง/วัน (ถึง 1 ปี)','std'],['ต้องรอคนอนุมัติ (human-in-the-loop / wait for callback)','std'],['ต้องดูประวัติทุก step ในคอนโซล','std'],['ต้อง exactly-once: ไม่รัน step ซ้ำเองหลังล้มเหลว','std'],['งานสั้น (ไม่เกิน 5 นาที) ปริมาณสูงมาก','exp'],['event-driven จำนวนมาก คิดเงินตาม request + duration','exp'],['ต้องการผลแบบ synchronous','exp']];
  const box=T.map(()=>h('input',{type:'checkbox'})),out=h('div',{class:'out'});
  const f=()=>{let a=0,b=0;T.forEach((t,i)=>{if(box[i].checked)t[1]==='std'?a++:b++});
    out.innerHTML=!a&&!b?'ติ๊กอย่างน้อยหนึ่งข้อ':a&&!b?'<b>Standard Workflow</b> — long-running, full history, exactly-once, คิดเงินตาม state transition':b&&!a?'<b>Express Workflow</b> — short-running, high-volume, ผลไปที่ CloudWatch Logs; sync = at-least-once, async = at-most-once':'<span class="warn">เงื่อนไขปนกัน</span> — แยกเป็นหลาย workflow ตามลักษณะ (ตัวอย่าง: Standard คุมกระบวนการหลัก ย่อยเป็น Express สำหรับงานสั้น ๆ ปริมาณสูง)'};
  box.forEach(b=>b.addEventListener('change',f));
  el.append(h('div',{class:'checks'},T.map((t,i)=>h('label',null,box[i],h('span',null,t[0])))),out);f();
 }});

/* ============================ W14 ============================ */
TOOLS.w14.push({title:'4 วิธีจ่ายค่า instance เดียวกัน',
 desc:'ใส่ราคา On-Demand ต่อชั่วโมง แล้วดูต้นทุนเมื่อได้ส่วนลดสูงสุดตามสไลด์ 13 (เป็นตัวเลข "สูงสุด" เพื่อการเปรียบเทียบเท่านั้น ไม่ใช่ราคาจริง)',
 mount(el){
  const p=num(0.1,0.001,100,0.001),hrs=num(730,1,744);
  const body=h('div');
  const M=[['On-Demand',0,'var(--ch-grey)','ไม่ผูกมัด · AWS เรียกคืนไม่ได้','โหลดไม่แน่นอน, ผันผวน, ระยะสั้น'],['Savings Plans',72,'var(--ch-blue)','$ ต่อชั่วโมง 1 หรือ 3 ปี · ไม่ถูกเรียกคืน','baseline ที่รันตลอด'],['Reserved Instances',72,'var(--ch-violet)','ระบุ instance type 1 หรือ 3 ปี · ไม่ถูกเรียกคืน','โหลดคงที่ เปลี่ยนน้อย'],['Spot',90,'var(--ch-green)','ไม่ผูกมัด · AWS เรียกคืนได้ (เตือน 2 นาที)','งาน stateless ที่ถูกขัดจังหวะได้']];
  const f=()=>{
    const base=(+p.value)*(+hrs.value);
    body.replaceChildren(h('table',{class:'t'},h('thead',null,h('tr',null,['รูปแบบ','ส่วนลด (สูงสุด)','ต้นทุน/เดือน (ตัวอย่าง)','ผูกมัด','เหมาะกับ'].map(x=>h('th',null,x)))),
      h('tbody',null,M.map(m=>{const c=base*(1-m[1]/100);return h('tr',null,h('td',null,h('b',null,m[0])),h('td',null,m[1]?'ถึง '+m[1]+'%':'—'),
        h('td',null,h('div',{style:'height:12px;border-radius:6px;background:'+m[2]+';width:'+Math.max(3,100*(1-m[1]/100))+'%'}),'$'+fmtN(c,2)),h('td',null,m[3]),h('td',null,m[4]))}))));
  };
  [p,hrs].forEach(x=>x.addEventListener('input',f));
  el.append(h('div',{class:'row'},fld('ราคา On-Demand ($/ชม.)',p),fld('ชั่วโมงที่รันต่อเดือน',hrs)),body,h('div',{class:'hint'},'หลักการ: ยิ่งสัญญากับ AWS ล่วงหน้า (หรือยอมให้ AWS เรียกคืน) ยิ่งจ่ายถูก — On-Demand คือราคาของการ "เก็บทุกทางเลือกไว้"'));f();
 }});

TOOLS.w14.push({title:'TCO 3 ปี: Case A (RegisterFast) vs Case B (คลังวิดีโอ)',
 desc:'ตัวเลขจากสไลด์ 31–32 (หน่วย: พันดอลลาร์ ตลอด 3 ปี) ดูว่าแต่ละกรณีค่าใช้จ่ายไปอยู่ที่ไหน และทำไมคำตอบกลับด้านได้',
 mount(el){
  const D={A:{n:'Case A — RegisterFast (ใช้งานเป็น spike 6 สัปดาห์/ปี)',on:[119,26,35,45],cl:[24,2,14,29],why:'On-premises จ่ายทั้งปีเพื่อ peak ที่มีแค่ 6 สัปดาห์ · Cloud จ่าย peak เฉพาะตอนเกิดขึ้น → Cloud ถูกกว่า ~69%'},
           B:{n:'Case B — คลังวิดีโอบรรยาย (steady, ส่งข้อมูลออกมาก)',on:[156,187,76,90],cl:[33,224,408,108],why:'Network คิดเป็น ~53% ของบิล cloud · on-prem ใช้ลิงก์ flat-rate ที่มหาวิทยาลัยจ่ายอยู่แล้ว → On-prem ถูกกว่า (cloud แพงกว่า ~52%)'}};
  const cols=['var(--ch-blue)','var(--ch-violet)','var(--ch-amber)','var(--ch-green)'],names=['Server','Storage','Network','IT labor'];
  const sel=h('select',null,h('option',{value:'A'},'Case A'),h('option',{value:'B'},'Case B'));
  const body=h('div');
  const bar=(label,arr,max)=>{const t=arr.reduce((a,b)=>a+b,0);return h('div',null,h('div',{style:'font-size:13px;margin-top:10px'},h('b',null,label),'  รวม $'+t+'k'),
    h('div',{class:'stack',style:'width:'+(100*t/max)+'%'},arr.map((v,i)=>h('i',{style:'flex:'+v+';background:'+cols[i],title:names[i]+' $'+v+'k'},v>=10?'$'+v+'k':''))))};
  const f=()=>{const d=D[sel.value];const to=d.on.reduce((a,b)=>a+b,0),tc=d.cl.reduce((a,b)=>a+b,0),max=Math.max(to,tc);
    const diff=Math.round(100*(tc-to)/to);
    body.replaceChildren(h('b',null,d.n),bar('On-premises',d.on,max),bar('Cloud (AWS)',d.cl,max),
      h('div',{class:'legend'},names.map((n,i)=>h('span',null,h('i',{style:'background:'+cols[i]}),n))),
      h('div',{class:'kpis'},kpi('On-prem รวม','$'+to+'k'),kpi('Cloud รวม','$'+tc+'k'),kpi('Cloud เทียบ on-prem',(diff>0?'+':'')+diff+'%')),
      h('div',{class:'out'},d.why),h('div',{class:'hint',style:'margin-top:8px'},'กฎจากสไลด์ 30: ถ้าต้นทุนมีฝั่งหนึ่ง ต้องนับฝั่งตรงข้ามด้วยแม้เล็ก · ปัดเป็นพันดอลลาร์เพราะไม่มีใครรู้ตัวเลขแม่นยำล่วงหน้า 3 ปี'))};
  sel.addEventListener('change',f);el.append(h('div',{class:'row'},fld('กรณี',sel)),body);f();
 }});

TOOLS.w14.push({title:'Troubleshooting: หาชั้นที่พังด้วย bisect',
 desc:'ระบบมี 1 จุดพังที่ซ่อนอยู่ ทดสอบที่กล่องใดก็ได้ ("request มาถึงกล่องนี้ไหม? และออกไปต่อไหม?") แล้วพยายามหาต้นเหตุด้วยจำนวนการทดสอบน้อยที่สุด — เริ่มจากกลางทาง',
 mount(el){
  const Ls=[['DNS','L7 · resolves?'],['Route table','L3 · a path?'],['NACL','L3/4 · stateless'],['Security group','L4 · stateful'],['Load balancer','L7 · healthy?'],['Instance + app','L7 · listening?'],['Cache / DB','reachable?']];
  let fault,state,tests,done;
  const wrap=h('div',{class:'path'}),out=h('div',{class:'out'});
  function init(){fault=Math.floor(Math.random()*Ls.length);state=Ls.map(()=>null);tests=0;done=false;draw('ทดสอบที่กล่องใดก็ได้ — คำแนะนำ: เริ่มจากกลางทาง แล้วแบ่งครึ่งต่อ')}
  function test(i){
    if(done)return;tests++;
    const arrives=i<=fault,leaves=i<fault;
    if(arrives&&!leaves){state[i]='fail';done=true;draw('🎯 พบแล้ว! ต้นเหตุคือ “'+Ls[i][0]+'” (request มาถึงแต่ไม่ผ่านต่อ) ใช้ '+tests+' การทดสอบ — วิธีแบ่งครึ่งมักเสร็จใน ~3 ครั้งจาก 7 ชั้น');return}
    state[i]=arrives?'pass':'unreach';
    let lo=0,hi=Ls.length-1;state.forEach((s,k)=>{if(s==='pass')lo=Math.max(lo,k+1);if(s==='unreach')hi=Math.min(hi,k-1)});
    draw((arrives?'✔ request ผ่านกล่อง “'+Ls[i][0]+'” ไปได้ → ปัญหาอยู่ทางขวา':'✘ request ไม่มาถึงกล่อง “'+Ls[i][0]+'” → ปัญหาอยู่ทางซ้ายหรือที่ตัวมันเอง')+' · ต้นเหตุอยู่ในช่วง: '+Ls[lo][0]+(lo!==hi?' … '+Ls[hi][0]:''));
  }
  function draw(msg){
    wrap.replaceChildren(...Ls.map((l,i)=>h('button',{type:'button',class:state[i]==='pass'?'pass':state[i]==='fail'?'fail':state[i]==='unreach'?'unk':'',onclick:()=>test(i),disabled:done},(state[i]==='pass'?'✔ ':state[i]==='fail'?'✘ ':state[i]==='unreach'?'· ':'')+l[0],h('small',null,l[1]))));
    out.innerHTML=msg+'<br><span class="hint">การทดสอบที่ทำไป: '+tests+'</span>';
  }
  el.append(wrap,h('button',{class:'btn',type:'button',onclick:init},'↺ เกมใหม่ (สุ่มจุดพังใหม่)'),h('div',{style:'height:10px'}),out);init();
 }});

TOOLS.w14.push({title:'NACL (stateless) vs Security group (stateful) และ ephemeral port',
 desc:'ลองปิด/เปิดกฎ แล้วดูว่า request และ reply ผ่านหรือไม่ — กับดักคลาสสิกของ NACL (สไลด์ 81–82)',
 mount(el){
  const eph=num(51234,1024,65535),c=['nin','nout443','neph','sgin'].map((k,i)=>h('input',{type:'checkbox',checked:[1,1,0,1][i]===1}));
  const out=h('div');
  const lab=['NACL inbound: allow TCP 443','NACL outbound: allow TCP 443','NACL outbound: allow TCP 1024–65535 (ephemeral)','Security group inbound: allow TCP 443'];
  const f=()=>{
    const p=+eph.value,[nin,n443,neph,sgin]=c.map(x=>x.checked);
    const reqOk=nin&&sgin;
    const repOk=neph&&p>=1024&&p<=65535;
    const row=(t,ok,d)=>h('tr',null,h('td',null,t),h('td',{class:ok?'good':'bad'},ok?'✔ ผ่าน':'✘ ถูกบล็อก'),h('td',null,d));
    out.replaceChildren(h('table',{class:'t'},h('thead',null,h('tr',null,['แพ็กเก็ต','ผล','เหตุผล'].map(x=>h('th',null,x)))),h('tbody',null,
      row('① Request 203.0.113.7:'+p+' → 10.0.1.10:443',reqOk,reqOk?'NACL inbound 443 และ SG inbound 443 อนุญาต':'ขาดกฎ '+(nin?'':'NACL inbound 443')+(!nin&&!sgin?' และ ':'')+(sgin?'':'SG inbound 443')),
      row('② Reply 10.0.1.10:443 → 203.0.113.7:'+p+' (ผ่าน Security group)',reqOk,'Security group เป็น stateful — คำตอบของ request ที่อนุญาตแล้วออกได้เอง'),
      row('③ Reply เดียวกัน (ผ่าน NACL outbound)',reqOk&&repOk,repOk?'กฎ outbound ephemeral 1024–65535 ครอบคลุมพอร์ต '+p:'NACL เป็น stateless: reply ไปยังพอร์ต '+p+' ต้องมีกฎ outbound ของตัวเอง — กฎ outbound 443 ไม่ครอบคลุม'+(n443?' (คุณเปิด 443 แล้ว แต่ไม่พอ)':'')))),
      h('div',{class:'out'},(reqOk&&repOk)?'<b class="good">เว็บทำงานได้</b> — ทั้ง request และ reply ผ่านทั้งสองชั้น':'<b class="bad">ผู้ใช้เข้าเว็บไม่ได้</b> — '+(reqOk?'ปัญหาคลาสสิก: ทุกอย่างดูถูกต้องแต่ reply ถูก NACL ทิ้ง (ต้องเปิด outbound ephemeral ports)':'request เข้าไม่ถึง instance')));
  };
  [eph,...c].forEach(x=>x.addEventListener('input',f));
  el.append(h('div',{class:'checks'},c.map((x,i)=>h('label',null,x,h('span',null,lab[i])))),h('div',{class:'row'},fld('ephemeral port ที่ OS ของ client เลือก',eph)),out);f();
 }});

TOOLS.w14.push({title:'SCP = เพดาน ไม่ใช่การให้สิทธิ์ (Effective = IAM ∩ SCP)',
 desc:'IAM ของคุณเป็น administrator อนุญาตทุกอย่าง แต่ SCP ของ organization ปิดบางอย่างไว้ — ดูผลที่เกิดจริง (เหมือน AWS Academy Learner Lab)',
 mount(el){
  const A=['Launch EC2 ใน us-east-1','Launch EC2 ใน eu-west-1','สร้าง IAM role','ปิด CloudTrail','Launch instance ขนาดใหญ่กว่า large'];
  const I=A.map(()=>h('input',{type:'checkbox',checked:true})),S=A.map(()=>h('input',{type:'checkbox',checked:true}));
  const body=h('tbody');
  const f=()=>body.replaceChildren(...A.map((a,i)=>{const ok=I[i].checked&&S[i].checked;return h('tr',null,h('td',null,a),h('td',null,I[i]),h('td',null,S[i]),h('td',{class:ok?'good':'bad'},ok?'✔ ทำได้':'✘ ทำไม่ได้'))}));
  const labp=()=>{S.forEach((x,i)=>x.checked=![1,2,4].includes(i));f()},none=()=>{S.forEach(x=>x.checked=true);f()};
  [...I,...S].forEach(x=>x.addEventListener('input',f));
  el.append(h('div',{class:'row'},h('button',{class:'btn pri',type:'button',onclick:labp},'ตัวอย่าง: ชุด SCP แบบ Learner Lab'),h('button',{class:'btn',type:'button',onclick:none},'ไม่มี SCP')),
   h('table',{class:'t'},h('thead',null,h('tr',null,['การกระทำ','IAM อนุญาต','SCP อนุญาต','ผลจริง'].map(x=>h('th',null,x)))),body),
   h('div',{class:'hint'},'SCP ไม่ให้สิทธิ์เอง และจำกัดได้แม้ผู้ใช้เป็น administrator — ตัวอย่างจริง: Deny all Regions ยกเว้นที่ใช้, Deny turning off CloudTrail, Deny leaving the organization, Deny instance types ใหญ่กว่า X'));
  labp();
 }});

window.TOOLS=TOOLS;
})();
