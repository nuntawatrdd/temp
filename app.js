(function(){
'use strict';
const DATA=window.DATA, SCEN=window.SCEN, TOOLS=window.TOOLS||{};
const CH={}; DATA.forEach(c=>CH[c.id]=c);
const $=(s,el)=>(el||document).querySelector(s);
const $$=(s,el)=>Array.from((el||document).querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function h(tag,attrs,...kids){
  const el=document.createElement(tag);
  if(attrs)for(const k in attrs){const v=attrs[k];
    if(v==null||v===false)continue;
    if(k==='class')el.className=v; else if(k==='html')el.innerHTML=v;
    else if(k.startsWith('on'))el.addEventListener(k.slice(2),v);
    else if(k==='dataset')Object.assign(el.dataset,v);
    else el.setAttribute(k,v===true?'':v);}
  kids.flat(9).forEach(k=>{if(k==null||k===false)return;el.append(k.nodeType?k:document.createTextNode(k));});
  return el;
}
window.__h=h;
/* ---------- safe storage ---------- */
const store={get(k,d){try{const v=localStorage.getItem('csg:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem('csg:'+k,JSON.stringify(v))}catch(e){}}};
let mem={done:store.get('done',{}),sc:store.get('sc',{}),imgmode:store.get('imgmode','auto'),theme:store.get('theme',null)};
const save=()=>{store.set('done',mem.done);store.set('sc',mem.sc);store.set('imgmode',mem.imgmode)};
if(mem.theme)document.documentElement.dataset.theme=mem.theme;
$('#theme').addEventListener('click',()=>{
  const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
  mem.theme=dark?'light':'dark';document.documentElement.dataset.theme=mem.theme;store.set('theme',mem.theme);
});

const app=$('#app');
const scenCount=id=>(SCEN[id]||[]).length;
const toolCount=id=>(TOOLS[id]||[]).length;
function secProgress(id){const c=CH[id];const d=mem.done[id]||{};return c.secs.filter((_,i)=>d[i]).length}
function scenProgress(id){const l=SCEN[id]||[];let n=0;l.forEach((_,i)=>{if(mem.sc[id+':'+i])n++});return n}

/* ---------- routing ---------- */
let cur={ch:null,tab:null};
function parse(){
  const hsh=(location.hash||'').replace('#','');
  if(!hsh||hsh==='home')return{view:'home'};
  const m=hsh.match(/^(m08|w11|w12|w13|w14)(?:-(tools|scen|s(\d+)|sec(\d+)))?$/);
  if(!m)return{view:'home'};
  return{view:'ch',ch:m[1],tab:m[2]==='tools'?'tools':m[2]==='scen'?'scen':'content',slide:m[3]?+m[3]:null,sec:m[4]!=null?+m[4]:null};
}
function route(){
  const r=parse();
  if(r.view==='home'){cur={ch:null,tab:null};renderHome();window.scrollTo(0,0);return}
  if(cur.ch===r.ch&&cur.tab===r.tab&&r.tab==='content'&&(r.slide||r.sec!=null)){jump(r);return}
  cur={ch:r.ch,tab:r.tab};
  renderChapter(r);
  if(r.tab==='content'&&(r.slide||r.sec!=null))setTimeout(()=>jump(r),60); else window.scrollTo(0,0);
}
let jumpGen=0;
function jump(r){
  const el=r.slide?$('#s-'+r.slide):$('#sec-'+r.sec);
  if(!el)return;
  const gen=++jumpGen;let touched=false;
  const stop=()=>{touched=true};
  ['wheel','touchstart','keydown','mousedown'].forEach(ev=>window.addEventListener(ev,stop,{once:true,passive:true}));
  const go=()=>{if(gen!==jumpGen||touched)return;el.scrollIntoView({block:'start',behavior:'instant'})};
  go();[250,700,1400].forEach(t=>setTimeout(go,t));
  if(r.slide){el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');}
}
window.addEventListener('hashchange',route);

/* ---------- home ---------- */
function renderHome(){
  document.title='AWS Cloud Study Guide — Databases · Week 11–14';
  const totalSlides=DATA.reduce((a,c)=>a+c.slides.length,0);
  const totalSc=DATA.reduce((a,c)=>a+scenCount(c.id),0);
  const totalTools=DATA.reduce((a,c)=>a+toolCount(c.id),0);
  app.replaceChildren(
    h('section',{class:'hero'},
      h('h1',null,'เรียน AWS Cloud แบบเนื้อหาเต็ม + ลงมือคิดเอง'),
      h('p',null,'รวมทุกสไลด์จาก Module 8 (Databases) และ Week 11–14 ไว้ครบ ไม่ย่อ พร้อมภาพสไลด์ต้นฉบับ เครื่องมือจำลองที่กดเล่นได้ และ scenario ให้ตัดสินใจแบบสถาปนิกในแต่ละบท'),
      h('div',{class:'stats'},
        h('span',{class:'chip'},h('b',null,DATA.length),' บท'),
        h('span',{class:'chip'},h('b',null,totalSlides),' สไลด์เนื้อหาเต็ม'),
        h('span',{class:'chip'},h('b',null,totalTools),' เครื่องมือจำลอง'),
        h('span',{class:'chip'},h('b',null,totalSc),' scenario'))),
    h('div',{class:'cards'},DATA.map(c=>{
      const sp=secProgress(c.id),sc=scenProgress(c.id);
      const pct=Math.round(100*(sp+sc)/(c.secs.length+scenCount(c.id)));
      return h('a',{class:'card',href:'#'+c.id,dataset:{ch:c.id}},
        h('span',{class:'tag'},c.short),h('h3',null,c.title),h('div',{class:'th'},c.th),h('p',null,c.desc),
        h('div',{class:'bar'},h('i',{style:'width:'+pct+'%'})),
        h('div',{class:'meta'},h('span',null,c.slides.length+' สไลด์'),h('span',null,toolCount(c.id)+' เครื่องมือ'),h('span',null,scenCount(c.id)+' scenario'),h('span',null,'ความคืบหน้า '+pct+'%')));
    })),
    h('div',{class:'howto'},
      h('div',null,h('b',null,'เนื้อหาเต็ม'),'ทุกสไลด์เรียงตามหัวข้อ กด “ดูภาพสไลด์ต้นฉบับ” เพื่อดูตาราง/แผนภาพที่ข้อความอย่างเดียวถ่ายทอดไม่ครบ'),
      h('div',null,h('b',null,'เครื่องมือจำลอง'),'ลองปรับตัวเลขและกดเล่น เช่น Auto Scaling, TTL ของ CloudFront, Cache simulator, SQS, TCO, troubleshooting'),
      h('div',null,h('b',null,'Scenario'),'โจทย์สถานการณ์จริง (เช่น RegisterFast วันลงทะเบียน) เลือกคำตอบแล้วดูเหตุผลของทุกตัวเลือก'),
      h('div',null,h('b',null,'ค้นหา'),'ช่องค้นหาด้านบนค้นได้ทั้ง 424 สไลด์ แล้วพาไปยังสไลด์นั้นทันที')));
}

/* ---------- chapter ---------- */
function renderChapter(r){
  const c=CH[r.ch];document.title=c.short+' · '+c.title+' — Cloud Study Guide';
  const tabs=h('nav',{class:'tabs'},
    h('a',{class:'tab'+(r.tab==='content'?' on':''),href:'#'+c.id},'เนื้อหาเต็ม',h('small',null,c.slides.length)),
    h('a',{class:'tab'+(r.tab==='tools'?' on':''),href:'#'+c.id+'-tools'},'เครื่องมือจำลอง',h('small',null,toolCount(c.id))),
    h('a',{class:'tab'+(r.tab==='scen'?' on':''),href:'#'+c.id+'-scen'},'Scenario',h('small',null,scenCount(c.id))));
  const head=h('div',{class:'chhead'},
    h('div',{class:'crumb'},h('a',{href:'#home'},'← ทุกบท'),' / '+c.short),
    h('h1',null,c.title),h('div',{class:'th'},c.th),h('div',{class:'src'},c.src),tabs);
  const body=h('div',{class:'chbody'});
  app.replaceChildren(h('div',{dataset:{ch:c.id}},head,body));
  if(r.tab==='content')renderContent(c,body);
  else if(r.tab==='tools')renderTools(c,body);
  else renderScen(c,body);
}

function slideEl(c,s){
  const showImg=()=>mem.imgmode==='all'||(mem.imgmode==='auto'&&s.img);
  const card=h('article',{class:'slide'+(s.div?' div':''),id:'s-'+s.n});
  card.append(h('header',null,h('span',{class:'sn'},'#'+s.n),h('h3',null,s.t||'(สไลด์ภาพ)')));
  const blocks=s.b;
  if(blocks.length){
    const sb=h('div',{class:'sb'});
    let ul=null;
    blocks.forEach((b,i)=>{
      if(b[0]==='li'){if(!ul){ul=h('ul');sb.append(ul)}ul.append(h('li',null,b[1]));return}
      ul=null;
      if(b[0]==='chips'){sb.append(h('div',{class:'chips'},b[1].map(x=>h('span',null,x))));return}
      if(b[0]==='pre'){sb.append(h('pre',null,h('code',null,b[1])));return}
      const nx=blocks[i+1];
      if(nx&&nx[0]==='li'&&b[1].split(' ').length<=7&&!/[.:?]$/.test(b[1]))sb.append(h('h4',null,b[1]));
      else sb.append(h('p',null,b[1]));
    });
    card.append(sb);
  }
  const wrap=h('div',{class:'imgwrap'});
  const btn=h('button',{class:'imgtoggle',type:'button'});
  card.append(wrap,btn);
  let user=null;
  const apply=()=>{
    const on=user!=null?user:showImg();
    wrap.replaceChildren();
    if(on)wrap.append(h('img',{src:'i/'+c.id+'_'+String(s.n).padStart(3,'0')+'.webp',loading:'lazy',decoding:'async',width:1000,height:s.ih||563,alt:'ภาพสไลด์ '+s.n+' — '+(s.t||'')}));
    btn.textContent=on?'ซ่อนภาพสไลด์':'ดูภาพสไลด์ต้นฉบับ';
  };
  btn.addEventListener('click',()=>{const on=wrap.childElementCount>0;user=!on;apply()});
  card._apply=()=>{user=null;apply()};apply();
  return card;
}

function renderContent(c,body){
  const toc=h('aside',{class:'toc'},h('h4',null,'หัวข้อในบทนี้'));
  const main=h('div',{class:'main'});
  const done=mem.done[c.id]=mem.done[c.id]||{};
  const seg=h('div',{class:'seg',role:'group','aria-label':'การแสดงภาพสไลด์'},
    [['auto','อัตโนมัติ'],['off','ข้อความล้วน'],['all','ภาพทุกสไลด์']].map(([k,l])=>h('button',{type:'button',class:mem.imgmode===k?'on':'',onclick:e=>{
      mem.imgmode=k;save();$$('button',seg).forEach(b=>b.classList.remove('on'));e.currentTarget.classList.add('on');$$('.slide',main).forEach(x=>x._apply&&x._apply());}},l)));
  main.append(h('div',{class:'tool-bar'},h('span',null,'ภาพสไลด์ต้นฉบับ:'),seg,h('span',null,'“อัตโนมัติ” แสดงภาพเฉพาะสไลด์ที่เป็นตาราง/แผนภาพ')));
  c.secs.forEach((sec,i)=>{
    const slides=c.slides.filter(s=>s.n>=sec.a&&s.n<=sec.b);
    const ck=h('span',{class:'ck'+(done[i]?' done':'')},done[i]?'✓':'');
    const link=h('a',{href:'#'+c.id+'-sec'+i,dataset:{i}},ck,h('span',null,sec.t,h('small',null,'สไลด์ '+sec.a+'–'+Math.min(sec.b,c.slides[c.slides.length-1].n))));
    toc.append(link);
    const dbtn=h('button',{class:'done-btn'+(done[i]?' on':''),type:'button',onclick:e=>{
      done[i]=!done[i];save();e.currentTarget.classList.toggle('on',done[i]);e.currentTarget.textContent=done[i]?'✓ อ่านแล้ว':'ทำเครื่องหมายว่าอ่านแล้ว';
      ck.classList.toggle('done',!!done[i]);ck.textContent=done[i]?'✓':'';}},done[i]?'✓ อ่านแล้ว':'ทำเครื่องหมายว่าอ่านแล้ว');
    main.append(h('section',{class:'sec',id:'sec-'+i,dataset:{i}},
      h('header',null,h('div',null,h('h2',null,sec.t),h('small',null,slides.length+' สไลด์')),dbtn),
      slides.map(s=>slideEl(c,s))));
  });
  body.append(h('div',{class:'layout'},toc,main));
  const links=$$('a',toc);
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.dataset.i===e.target.dataset.i))}})},{rootMargin:'-15% 0px -75% 0px'});
  $$('.sec',main).forEach(s=>io.observe(s));
}

/* ---------- tools ---------- */
function renderTools(c,body){
  const list=TOOLS[c.id]||[];
  const wrap=h('div',{class:'tools'});
  list.forEach(t=>{
    const b=h('div',{class:'body'});
    wrap.append(h('section',{class:'tool'},h('header',null,h('h3',null,t.title),h('p',null,t.desc)),b));
    try{t.mount(b)}catch(e){b.textContent='เครื่องมือนี้โหลดไม่สำเร็จ: '+e.message}
  });
  body.append(wrap);
}

/* ---------- scenarios ---------- */
function renderScen(c,body){
  const list=SCEN[c.id]||[];
  const box=h('div',{class:'scen'});
  const scoreEl=h('span',{class:'score'});
  const upd=()=>{
    let ok=0,graded=0,seen=0;
    list.forEach((s,i)=>{const v=mem.sc[c.id+':'+i];if(!v)return;seen++;if(s.type==='think')return;graded++;if(v==='ok')ok++});
    const g=list.filter(s=>s.type!=='think').length;
    scoreEl.textContent='ทำแล้ว '+seen+'/'+list.length+' · ตอบถูก '+ok+'/'+g;
  };
  box.append(h('div',{class:'sc-head'},h('div',null,h('b',null,'Scenario ประจำบท'),h('div',{class:'hint'},'อ่านโจทย์ → ตัดสินใจ → ดูเหตุผลของทุกตัวเลือก ข้อ “ลองคิดเอง” ไม่มีคะแนน ให้ลองตอบก่อนดูเฉลย')),
    h('div',null,scoreEl,' ',h('button',{class:'btn',type:'button',onclick:()=>{list.forEach((_,i)=>delete mem.sc[c.id+':'+i]);save();renderChapter({ch:c.id,tab:'scen'})}},'เริ่มใหม่'))));
  list.forEach((s,i)=>box.append(scenEl(c,s,i,upd)));
  body.append(box);upd();
}
function setRes(c,i,v,upd){mem.sc[c.id+':'+i]=v;save();upd()}
function scenEl(c,s,i,upd){
  const key=c.id+':'+i;
  const card=h('section',{class:'sc'});
  card.append(h('div',{class:'no'},'SCENARIO '+String(i+1).padStart(2,'0')+(s.type==='think'?' · ลองคิดเอง':s.type==='match'?' · จับคู่':s.type==='vote'?' · โหวต':'')),
    h('h3',null,s.title),h('div',{class:'story'},s.story),h('div',{class:'q'},s.q));
  if(s.type==='choice'){
    const opts=h('div',{class:'opts'});let answered=false;
    s.opts.forEach((o,j)=>{
      const b=h('button',{class:'opt',type:'button'},h('span',null,String.fromCharCode(65+j)+'. '+o.t));
      b.addEventListener('click',()=>{
        if(answered)return;answered=true;
        $$('.opt',opts).forEach((x,k)=>{x.disabled=true;x.append(h('span',{class:'why'},s.opts[k].why));
          if(k===s.ans)x.classList.add('right');else if(k===j)x.classList.add('wrong');});
        setRes(c,i,j===s.ans?'ok':'bad',upd);
      });
      opts.append(b);
    });
    card.append(opts);
  }else if(s.type==='think'){
    const ta=h('textarea',{placeholder:'พิมพ์ความคิดของคุณที่นี่ (ไม่ถูกบันทึกหรือส่งไปที่ไหน)…'});
    const m=h('div',{class:'model',hidden:true,html:'<b>แนวคำตอบ</b><br>'+s.model});
    const b=h('button',{class:'btn pri',type:'button',onclick:()=>{m.hidden=false;b.disabled=true;setRes(c,i,'seen',upd)}},'ดูเฉลย');
    card.append(h('div',{class:'think'},ta),h('div',{style:'margin-top:10px'},b),m);
  }else if(s.type==='match'){
    const rows=s.rows.map(r=>{
      const sel=h('select',null,h('option',{value:''},'— เลือก —'),s.choices.map((x,k)=>h('option',{value:k},x)));
      return {r,sel,el:h('div',{class:'mrow'},h('b',null,r.s),sel)};
    });
    const res=h('div',{class:'out',hidden:true});
    const b=h('button',{class:'btn pri',type:'button',onclick:()=>{
      let ok=0;rows.forEach(x=>{const good=+x.sel.value===x.r.a&&x.sel.value!=='';x.el.classList.toggle('ok',good);x.el.classList.toggle('no',!good);if(good)ok++;});
      res.hidden=false;res.innerHTML='ถูก <b>'+ok+'/'+rows.length+'</b> แถว'+(ok<rows.length?'<br>เฉลย: '+s.rows.map(r=>esc(r.s)+' → '+esc(s.choices[r.a])).join('<br>'):' — ยอดเยี่ยม! "Timeout vs refused": เงียบ = มีตัวกรอง, ปฏิเสธ = ไปถึงแล้ว');
      setRes(c,i,ok===rows.length?'ok':'bad',upd);}},'ตรวจคำตอบ');
    card.append(rows.map(x=>x.el),h('div',{style:'margin-top:10px'},b),res);
  }else if(s.type==='vote'){
    let correct=0,n=0;
    const out=h('div',{class:'out',hidden:true});
    const vote=h('div',{class:'vote'},s.items.map(it=>{
      const why=h('div',{class:'why',hidden:true});
      const mk=(k,l)=>h('button',{class:'btn',type:'button',onclick:e=>{
        const row=e.currentTarget.parentNode;if(row.dataset.d)return;row.dataset.d='1';
        const good=k===it.ans;n++;if(good)correct++;
        $$('button',row).forEach(x=>x.disabled=true);e.currentTarget.classList.add('pri');
        why.hidden=false;why.innerHTML=(good?'<b class="good">ตรงกับแนวคิดของสไลด์</b> — ':'<b class="warn">ลองคิดต่าง</b> — ')+esc(it.why);
        if(n===s.items.length){out.hidden=false;out.textContent='ตรงกับแนวคำตอบ '+correct+'/'+s.items.length+' ข้อ (สไลด์บอกว่าแต่ละข้อมีคำตอบที่ปกป้องได้ และบางข้อฝั่งตรงข้ามก็มีเหตุผล)';setRes(c,i,correct>=3?'ok':'bad',upd)}
      }},l);
      return h('div',{class:'it'},h('b',null,it.t),h('div',null,it.d),h('div',{class:'acts'},mk('cloud','☁ Cloud'),mk('onprem','🏢 On-premises')),why);
    }),out);
    card.append(vote);
  }
  if(s.ref)card.append(h('div',{class:'ref'},'อ้างอิง: '+s.ref));
  return card;
}

/* ---------- search ---------- */
const idx=[];
DATA.forEach(c=>c.slides.forEach(s=>{
  const txt=(s.t+' \n '+s.b.map(b=>b[0]==='chips'?b[1].join(' · '):b[1]).join(' \n ')).replace(/\s+/g,' ');
  idx.push({ch:c.id,n:s.n,t:s.t,txt,low:txt.toLowerCase()});
}));
const q=$('#q'),res=$('#results');let tm=null;
function search(){
  const v=q.value.trim().toLowerCase();
  if(v.length<2){res.hidden=true;return}
  const toks=v.split(/\s+/).filter(Boolean);
  const hits=[];
  for(const e of idx){
    if(!toks.every(t=>e.low.includes(t)))continue;
    let sc=0;toks.forEach(t=>{if(e.t.toLowerCase().includes(t))sc+=5;sc+=Math.min(3,e.low.split(t).length-1)});
    hits.push({e,sc});
  }
  hits.sort((a,b)=>b.sc-a.sc);
  res.replaceChildren();
  if(!hits.length){res.append(h('div',{class:'rs',style:'padding:12px'},'ไม่พบ “'+q.value+'”'));res.hidden=false;return}
  hits.slice(0,30).forEach(({e})=>{
    const p=e.low.indexOf(toks[0]);const a=Math.max(0,p-50);
    let snip=e.txt.slice(a,a+170);
    let html=esc(snip);toks.forEach(t=>{const re=new RegExp('('+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');html=html.replace(re,'<mark>$1</mark>')});
    const a1=h('a',{href:'#'+e.ch+'-s'+e.n},h('div',{class:'rc'},CH[e.ch].short+' · สไลด์ '+e.n),h('div',{class:'rt'},e.t),h('div',{class:'rs',html:(a>0?'…':'')+html+'…'}));
    a1.dataset.ch=e.ch;
    a1.addEventListener('click',()=>{res.hidden=true;q.blur()});
    res.append(a1);
  });
  if(hits.length>30)res.append(h('div',{class:'rs',style:'padding:8px 12px'},'แสดง 30 จาก '+hits.length+' ผลลัพธ์ — พิมพ์คำให้เฉพาะเจาะจงขึ้น'));
  res.hidden=false;
}
q.addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(search,120)});
q.addEventListener('focus',()=>{if(q.value.trim().length>=2)search()});
document.addEventListener('click',e=>{if(!e.target.closest('.search'))res.hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){res.hidden=true;q.blur()}if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'&&document.activeElement.tagName!=='SELECT'){e.preventDefault();q.focus()}});

route();
})();
