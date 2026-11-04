(function () {
'use strict';
var SITE = window.SITE, ORDER = SITE.order;
var CH = [], COLOR = {};
ORDER.forEach(function (o) { var c = IOT.ch[o[0]]; if (c) { CH.push(c); COLOR[o[0]] = o[1]; } });
var BYID = {}; CH.forEach(function (c) { BYID[c.id] = c; });
var FIGS = window.IOT_FIGS || {};

var $ = function (s, el) { return (el || document).querySelector(s); };
var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

/* ---------- storage ---------- */
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(SITE.key + ":" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem(SITE.key + ":" + k, JSON.stringify(v)); } catch (e) { } }
};
var mem = { done: store.get("done", {}), ex: store.get("ex", {}), theme: store.get("theme", null) };
function save() { store.set("done", mem.done); store.set("ex", mem.ex); }
if (mem.theme) document.documentElement.dataset.theme = mem.theme;
$("#theme").onclick = function () {
  var d = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  mem.theme = d ? "light" : "dark"; document.documentElement.dataset.theme = mem.theme; store.set("theme", mem.theme);
};
$("#menu").onclick = function () { $("#side").classList.toggle("open"); };

var app = $("#app"), side = $("#side");
function secDone(id) { var d = mem.done[id] || {}; return (BYID[id].sections || []).filter(function (_, i) { return d[i]; }).length; }
function exDone(id) { var d = mem.ex[id] || {}; return Object.keys(d).length; }
function exRight(id) { var d = mem.ex[id] || {}; return Object.keys(d).filter(function (k) { return d[k] === 1; }).length; }

/* ---------- basic 115 questions → choice exercises ---------- */
var BASIC = (window.QS || []).map(function (q) {
  return { type: "choice", q: q.q, opts: [{ t: q.a, why: q.why, ok: true }].concat(q.w.map(function (w) { return { t: w, why: "", ok: false }; })), basic: true, ch: q.t };
});

/* ---------- exercise engine ---------- */
var TYPE = { choice: "เลือกคำตอบ", multi: "เลือกได้หลายข้อ", blank: "เติมคำในช่องว่าง", match: "จับคู่" };
// builds a card; onDone(correct) is called once when answered
function buildEx(ex, no, onDone) {
  var card = el("div", "ex"), done = false;
  card.append(el("div", "no", "ข้อ " + no + ' <span class="ty">' + (ex.story && ex.type === "choice" ? "Scenario" : TYPE[ex.type] || "") + "</span>"));
  if (ex.story) card.append(el("div", "story", ex.story));
  if (ex.fig) card.append(el("div", "fig", ex.fig));
  var body = el("div"); card.append(body);
  function finish(ok, msg) {
    if (done) return; done = true;
    body.append(el("div", "fb " + (ok ? "ok" : "no"), (ok ? "✅ ถูกต้อง" : "❌ ยังไม่ถูก") + (msg ? " — " + msg : "")));
    if (onDone) onDone(ok);
  }
  if (ex.type === "choice") {
    if (ex.q) body.append(el("div", "q", ex.q));
    var opts = shuffle(ex.opts.map(function (o, i) { return { t: o.t, why: o.why, ok: ex.basic ? !!o.ok : i === ex.ans }; }));
    var btns = opts.map(function (o, k) {
      var b = el("button", "opt", '<span class="l">' + "ABCD"[k] + '</span><span>' + esc(o.t) + "</span>"); b.type = "button";
      b.onclick = function () {
        if (done) return;
        btns.forEach(function (bb, j) {
          bb.disabled = true; var oo = opts[j];
          bb.classList.add(oo.ok ? "ok" : (j === k ? "no" : "x"));
          if (oo.why) bb.lastChild.append(el("span", "why", oo.why));
        });
        finish(o.ok);
      };
      body.append(b); return b;
    });
  } else if (ex.type === "multi") {
    if (ex.q) body.append(el("div", "q", ex.q));
    var os = shuffle(ex.opts), bs = os.map(function (o, k) {
      var b = el("button", "opt", '<span class="l">☐</span><span>' + esc(o.t) + "</span>"); b.type = "button";
      b.onclick = function () { if (done) return; b.classList.toggle("sel"); b.firstChild.textContent = b.classList.contains("sel") ? "☑" : "☐"; };
      body.append(b); return b;
    });
    var chk = el("button", "btn pri", "ตรวจคำตอบ"); chk.type = "button";
    chk.onclick = function () {
      if (done) return; var all = true;
      bs.forEach(function (b, k) {
        var o = os[k], sel = b.classList.contains("sel"); b.disabled = true; b.classList.remove("sel");
        if (o.ok && sel) b.classList.add("ok"); else if (o.ok && !sel) { b.classList.add("miss"); all = false; } else if (!o.ok && sel) { b.classList.add("no"); all = false; }
        if (o.why) b.lastChild.append(el("span", "why", (o.ok ? "✔ ข้อนี้ถูก — " : "✘ ข้อนี้ไม่ถูก — ") + o.why));
      });
      chk.remove(); finish(all, all ? "" : "ต้องเลือกให้ครบและไม่เลือกข้อที่ผิด");
    };
    body.append(el("div", "rowb")); body.lastChild.append(chk);
  } else if (ex.type === "blank") {
    var html = ex.text.replace(/\{(\d+)\}/g, function (_, n) {
      var b = ex.blanks[n - 1]; if (!b) return "{" + n + "}";
      return '<select data-b="' + (n - 1) + '"><option value="">— เลือก —</option>' + b.opts.map(function (o, i) { return '<option value="' + i + '">' + esc(o) + "</option>"; }).join("") + "</select>";
    });
    body.append(el("div", "bl", html));
    var ck = el("button", "btn pri", "ตรวจคำตอบ"); ck.type = "button";
    ck.onclick = function () {
      if (done) return; var all = true, whys = "";
      $$("select", body).forEach(function (s) {
        var b = ex.blanks[+s.dataset.b], ok = s.value !== "" && +s.value === b.ans;
        s.classList.add(ok ? "ok" : "no"); s.disabled = true; if (!ok) all = false;
        whys += "<li><b>" + esc(b.opts[b.ans]) + "</b>" + (b.why ? " — " + b.why : "") + "</li>";
      });
      ck.remove(); body.append(el("ul", "", whys)); finish(all, all ? "" : "ดูเฉลยแต่ละช่องด้านล่าง");
    };
    body.append(el("div", "rowb")); body.lastChild.append(ck);
  } else if (ex.type === "match") {
    if (ex.q) body.append(el("div", "q", ex.q));
    var rights = shuffle(ex.pairs.map(function (p) { return p[1]; })), grid = el("div", "mt");
    ex.pairs.forEach(function (p) {
      grid.append(el("div", "lf", p[0]));
      grid.append(el("select", "", '<option value="">— เลือก —</option>' + rights.map(function (r) { return '<option value="' + esc(r) + '">' + esc(r) + "</option>"; }).join("")));
    });
    body.append(grid);
    var cm = el("button", "btn pri", "ตรวจคำตอบ"); cm.type = "button";
    cm.onclick = function () {
      if (done) return; var all = true;
      $$("select", grid).forEach(function (s, i) { var ok = s.value === ex.pairs[i][1]; s.classList.add(ok ? "ok" : "no"); s.disabled = true; if (!ok) { all = false; s.title = "เฉลย: " + ex.pairs[i][1]; } });
      cm.remove();
      var ans = "<ul>" + ex.pairs.map(function (p) { return "<li>" + p[0] + " → <b>" + p[1] + "</b></li>"; }).join("") + "</ul>";
      body.append(el("div", "", ans)); finish(all, ex.why || "");
    };
    body.append(el("div", "rowb")); body.lastChild.append(cm);
  }
  return card;
}

/* ---------- sidebar ---------- */
var route = { v: "home" };
function renderSide() {
  var h = '<a href="#home" class="' + (route.v === "home" ? "on" : "") + '">🏠 หน้าหลัก</a>' +
    '<a href="#sum" class="' + (route.v === "sum" ? "on" : "") + '">📋 สรุปทั้งหมด</a>' +
    '<a href="#exam" class="' + (route.v === "exam" ? "on" : "") + '">📝 ข้อสอบรวม</a><h4>บทเรียน</h4>';
  CH.forEach(function (c, i) {
    var on = route.v === "ch" && route.id === c.id;
    h += '<a href="#' + c.id + '" class="' + (on ? "on" : "") + '" style="--cc:' + COLOR[c.id] + '"><span class="num">' + (i + 1) + "</span><span>" + esc(c.title) + "</span></a>";
    if (on) {
      h += '<div class="sub">';
      (c.sections || []).forEach(function (s, k) {
        var d = (mem.done[c.id] || {})[k];
        h += '<a href="#' + c.id + "/s" + k + '" data-sec="' + k + '"><span class="ck ' + (d ? "d" : "") + '">' + (d ? "✓" : "") + "</span><span>" + esc(s.t) + "</span></a>";
      });
      h += '<a class="k ' + (route.tab === "sum" ? "on" : "") + '" href="#' + c.id + '/sum">📌 สรุปบทนี้</a><a class="k ' + (route.tab === "ex" ? "on" : "") + '" href="#' + c.id + '/ex">✍️ แบบฝึก (' + (c.ex || []).length + ")</a></div>";
    }
  });
  side.innerHTML = h;
  side.style.setProperty("--c", route.id ? COLOR[route.id] : "var(--ch-teal)");
  side.classList.remove("open");
}

/* ---------- routing ---------- */
function parse() {
  var h = (location.hash || "").replace("#", ""); if (!h || h === "home") return { v: "home" };
  if (h === "sum") return { v: "sum" }; if (h === "exam") return { v: "exam" };
  var p = h.split("/"); if (!BYID[p[0]]) return { v: "home" };
  var t = p[1] || "", r = { v: "ch", id: p[0], tab: "content" };
  if (t === "sum") r.tab = "sum"; else if (t === "ex") r.tab = "ex"; else if (/^s\d+$/.test(t)) r.sec = +t.slice(1);
  return r;
}
var lastKey = "";
function go() {
  var r = parse(), key = r.v + ":" + (r.id || "") + ":" + (r.tab || "");
  var same = key === lastKey && r.v === "ch" && r.tab === "content";
  route = r; renderSide();
  if (same) { scrollSec(r); return; }
  lastKey = key; document.documentElement.style.setProperty("--c", r.id ? COLOR[r.id] : "var(--ch-teal)");
  if (r.v === "home") home(); else if (r.v === "sum") sumAll(); else if (r.v === "exam") exam(); else chapter(r);
  if (r.sec != null) setTimeout(function () { scrollSec(r); }, 50); else window.scrollTo(0, 0);
}
function scrollSec(r) { if (r.sec == null) return; var e = $("#sec-" + r.sec); if (e) e.scrollIntoView({ block: "start" }); }
window.addEventListener("hashchange", go);

/* ---------- home ---------- */
function home() {
  document.title = SITE.name;
  var tex = CH.reduce(function (a, c) { return a + (c.ex || []).length; }, 0), tsec = CH.reduce(function (a, c) { return a + (c.sections || []).length; }, 0);
  var h = '<section class="hero"><h1>' + SITE.h1 + '</h1><p>' + SITE.p + '</p>' +
    '<div class="stats"><span class="chip"><b>' + CH.length + '</b> บท</span><span class="chip"><b>' + tsec + '</b> หัวข้อ</span><span class="chip"><b>' + tex + '</b> แบบฝึกประยุกต์</span>' + (BASIC.length ? '<span class="chip"><b>' + BASIC.length + '</b> ข้อพื้นฐาน</span>' : '') + '</div></section>' +
    '<div class="cards"><a class="card" href="#sum" style="--cc:var(--ch-amber)"><span class="tag">ทบทวนเร็ว</span><h3>📋 สรุปทั้งหมด</h3><p>รวมสรุปทุกบท และกล่อง "ต้องจำ" ไว้หน้าเดียว</p></a>' +
    '<a class="card" href="#exam" style="--cc:var(--color-bad)"><span class="tag">จำลองสอบ</span><h3>📝 ข้อสอบรวม</h3><p>สุ่มโจทย์ประยุกต์ + ข้อพื้นฐานทุกบท ไม่บอกที่มาของข้อ</p></a></div><div class="cards">';
  CH.forEach(function (c, i) {
    var n = (c.ex || []).length, d = exDone(c.id);
    h += '<a class="card" href="#' + c.id + '" style="--cc:' + COLOR[c.id] + '"><span class="tag">บทที่ ' + (i + 1) + "</span><h3>" + esc(c.title) + "</h3><p>" + esc(c.th || "") + '</p><div class="bar" style="--c:' + COLOR[c.id] + '"><i style="width:' + (n ? d / n * 100 : 0) + '%"></i></div><div class="meta"><span>' + (c.sections || []).length + " หัวข้อ</span><span>" + n + " แบบฝึก</span><span>ทำแล้ว " + d + "</span></div></a>";
  });
  app.innerHTML = h + "</div>";
}

/* ---------- chapter ---------- */
function mustOf(c) {
  var d = el("div"), out = "";
  (c.sections || []).forEach(function (s) { d.innerHTML = s.html; $$(".must", d).forEach(function (m) { out += '<div class="must">' + m.innerHTML + "</div>"; }); });
  return out;
}
function chapter(r) {
  var c = BYID[r.id], i = CH.indexOf(c); document.title = c.title + " — " + SITE.name;
  var h = '<div class="chhead"><div class="crumb"><a href="#home">หน้าหลัก</a> › บทที่ ' + (i + 1) + "</div><h1>" + esc(c.title) + '</h1><div class="th">' + esc(c.th || "") + "</div>" +
    '<div class="tabs"><a class="tab ' + (r.tab === "content" ? "on" : "") + '" href="#' + c.id + '">📖 เนื้อหา</a><a class="tab ' + (r.tab === "sum" ? "on" : "") + '" href="#' + c.id + '/sum">📌 สรุปทั้งหมด</a><a class="tab ' + (r.tab === "ex" ? "on" : "") + '" href="#' + c.id + '/ex">✍️ แบบฝึก<small>' + (c.ex || []).length + "</small></a></div></div>";
  app.innerHTML = h; var box = el("div"); app.append(box);
  if (r.tab === "content") {
    (c.sections || []).forEach(function (s, k) {
      var sec = el("section", "sec"); sec.id = "sec-" + k;
      var d = (mem.done[c.id] || {})[k];
      sec.innerHTML = "<header><h2>" + (k + 1) + ". " + esc(s.t) + '</h2><button class="done-btn ' + (d ? "on" : "") + '" type="button">' + (d ? "✓ อ่านแล้ว" : "ทำเครื่องหมายว่าอ่านแล้ว") + "</button></header>";
      var b = el("div", "sb", (k === 0 && FIGS[c.id] ? FIGS[c.id] : "") + s.html); sec.append(b);
      $(".done-btn", sec).onclick = function () { var m = mem.done[c.id] || (mem.done[c.id] = {}); m[k] = !m[k]; save(); this.classList.toggle("on", m[k]); this.textContent = m[k] ? "✓ อ่านแล้ว" : "ทำเครื่องหมายว่าอ่านแล้ว"; renderSide(); };
      box.append(sec);
    });
    var nx = CH[i + 1], pv = CH[i - 1];
    box.append(el("div", "cta", (pv ? '<a class="btn" href="#' + pv.id + '">← ' + esc(pv.title) + "</a>" : "<span></span>") + '<a class="btn pri" href="#' + c.id + '/ex">ทำแบบฝึกบทนี้ →</a>' + (nx ? '<a class="btn" href="#' + nx.id + '">' + esc(nx.title) + " →</a>" : "")));
  } else if (r.tab === "sum") {
    box.append(el("div", "sb", '<h4>สรุปทั้งหมดของบท</h4>' + (c.summary || "") + '<h4 style="margin-top:22px">🔥 รวมสิ่งที่ต้องจำ</h4>' + (mustOf(c) || "<p>—</p>")));
    box.querySelector(".sb").style.marginTop = "20px";
    box.append(el("div", "cta", '<a class="btn" href="#' + c.id + '">← กลับไปอ่านเนื้อหา</a><a class="btn pri" href="#' + c.id + '/ex">ทำแบบฝึก →</a>'));
  } else {
    var list = c.ex || [], right = 0, answered = 0, prog = el("div", "", "");
    prog.innerHTML = '<div class="meta" style="display:flex;justify-content:space-between;color:var(--muted);font-size:14px;margin-top:16px"><span>ตอบแล้ว <b class="a">0</b>/' + list.length + '</span><span>ถูก <b class="r">0</b></span></div><div class="pgbar"><i style="width:0"></i></div>';
    box.append(prog);
    var wrap = el("div", "exs"); box.append(wrap);
    var saved = mem.ex[c.id] || (mem.ex[c.id] = {});
    list.forEach(function (ex, k) {
      wrap.append(buildEx(ex, k + 1, function (ok) {
        saved[k] = ok ? 1 : 0; save(); answered++; if (ok) right++;
        $(".a", prog).textContent = answered; $(".r", prog).textContent = right; $(".pgbar i", prog).style.width = answered / list.length * 100 + "%";
      }));
    });
    box.append(el("div", "cta", '<a class="btn" href="#' + c.id + '">← เนื้อหา</a><a class="btn" href="#' + c.id + '/ex" onclick="setTimeout(function(){lastKeyReset()},0)">ทำใหม่</a>'));
  }
}
window.lastKeyReset = function () { lastKey = ""; go(); window.scrollTo(0, 0); };

/* ---------- summary of everything ---------- */
function sumAll() {
  document.title = "สรุปทั้งหมด — " + SITE.name;
  app.innerHTML = '<div class="chhead"><h1>📋 สรุปทั้งหมด</h1><div class="th">สรุปทุกบท + กล่อง "ต้องจำ" — กดหัวข้อเพื่อกางหรือย่อ</div></div><div class="sumhead"><button class="btn" id="ex1">กางทั้งหมด</button><button class="btn" id="ex2">ย่อทั้งหมด</button><label style="font-size:14px"><input type="checkbox" id="onlymust"> แสดงเฉพาะ "ต้องจำ"</label></div><div id="sl"></div>';
  var sl = $("#sl");
  CH.forEach(function (c, i) {
    var d = el("details", "dt"); d.style.setProperty("--cc", COLOR[c.id]);
    d.innerHTML = "<summary>" + (i + 1) + ". " + esc(c.title) + '</summary><div class="box"><div class="s">' + (c.summary || "") + '</div><h4 style="margin:18px 0 4px;color:var(--warn)">🔥 ต้องจำ</h4>' + (mustOf(c) || "<p>—</p>") + '<p><a href="#' + c.id + '">อ่านเนื้อหาเต็ม →</a></p></div>';
    sl.append(d);
  });
  $("#ex1").onclick = function () { $$("details.dt").forEach(function (d) { d.open = true; }); };
  $("#ex2").onclick = function () { $$("details.dt").forEach(function (d) { d.open = false; }); };
  $("#onlymust").onchange = function () { var on = this.checked; $$(".dt .s").forEach(function (s) { s.style.display = on ? "none" : ""; }); if (on) $$("details.dt").forEach(function (d) { d.open = true; }); };
}

/* ---------- exam ---------- */
function exam() {
  document.title = "ข้อสอบรวม — " + SITE.name;
  var h = '<div class="chhead"><h1>📝 ข้อสอบรวม</h1><div class="th">โจทย์ประยุกต์ + ข้อพื้นฐาน สุ่มจากทุกบท ไม่แสดงที่มาของข้อ</div></div><div class="cfg" style="margin-top:20px"><p><b>ชุดโจทย์</b></p>' +
    '<label><input type="checkbox" id="xa" checked> ประยุกต์ / Scenario / เติมคำ / หลายข้อ (' + CH.reduce(function (a, c) { return a + (c.ex || []).length; }, 0) + ')</label>' + (BASIC.length ? '<label><input type="checkbox" id="xb" checked> ข้อพื้นฐาน (' + BASIC.length + ')</label>' : '') + '' +
    '<p><b>บทที่ออกสอบ</b></p>' + CH.map(function (c) { return '<label><input type="checkbox" class="xc" value="' + c.id + '" checked>' + esc(c.title) + "</label>"; }).join("") +
    '<p><b>จำนวนข้อ</b> <select id="xn"><option>20</option><option>40</option><option selected>60</option><option>100</option><option value="0">ทั้งหมดที่มี</option></select></p><button class="btn pri" id="xgo">เริ่มสอบ</button></div>';
  app.innerHTML = h;
  $("#xgo").onclick = function () {
    var chs = $$(".xc:checked").map(function (i) { return i.value; }), pool = [];
    if ($("#xa").checked) CH.forEach(function (c) { if (chs.indexOf(c.id) >= 0) (c.ex || []).forEach(function (e) { pool.push({ ex: e, ch: c.id }); }); });
    if ($("#xb") && $("#xb").checked) BASIC.forEach(function (e) { var id = e.ch; if (chs.indexOf(id) >= 0) pool.push({ ex: e, ch: id }); });
    if (!pool.length) return alert("เลือกอย่างน้อย 1 ชุด/บท");
    pool = shuffle(pool); var n = +$("#xn").value; if (n && n < pool.length) pool = pool.slice(0, n);
    run(pool);
  };
}
function run(pool) {
  var n = pool.length, i = 0, cards = [], res = [];
  function answeredCount() { return res.filter(function (x) { return x != null; }).length; }
  function card(k) {
    if (!cards[k]) cards[k] = buildEx(pool[k].ex, k + 1, function (ok) { res[k] = ok ? 1 : 0; refresh(); });
    return cards[k];
  }
  function refresh() {
    var d = answeredCount(), pg = $(".pgbar i"); if (pg) pg.style.width = d / n * 100 + "%";
    var c = $("#cnt"); if (c) c.textContent = d + "/" + n;
    $$("#qgrid span").forEach(function (sp, k) { sp.className = (k === i ? "cur " : "") + (res[k] == null ? "" : res[k] ? "ok" : "no"); });
  }
  function showQ(k) {
    i = k;
    app.innerHTML = '<div class="chhead"><div class="crumb">ข้อ ' + (i + 1) + " / " + n + ' · ตอบแล้ว <b id="cnt"></b></div></div><div class="pgbar" style="margin-top:14px"><i></i></div><div id="qgrid" class="qgrid"></div><div id="qbody"></div><div class="cta"></div>';
    var g = $("#qgrid"); for (var j = 0; j < n; j++) { var sp = el("span", "", j + 1); sp.dataset.j = j; sp.onclick = function () { showQ(+this.dataset.j); window.scrollTo(0, 0); }; g.append(sp); }
    $("#qbody").append(card(i));
    var cta = $(".cta"), pv = el("button", "btn", "← ข้อก่อนหน้า"), nx = el("button", "btn", "ข้อถัดไป →"), fin = el("button", "btn pri", "ส่งข้อสอบ / ดูผลคะแนน");
    pv.type = nx.type = fin.type = "button"; pv.disabled = i === 0; nx.disabled = i === n - 1;
    pv.onclick = function () { showQ(i - 1); window.scrollTo(0, 0); }; nx.onclick = function () { showQ(i + 1); window.scrollTo(0, 0); };
    fin.onclick = function () { var u = n - answeredCount(); if (!u || confirm("ยังไม่ได้ตอบ " + u + " ข้อ (นับเป็นผิด) ส่งข้อสอบเลยไหม?")) result(); };
    cta.append(pv, nx, fin); refresh();
  }
  function result() {
    var right = res.filter(function (x) { return x === 1; }).length, per = {}, wrongs = [];
    pool.forEach(function (p, k) { var s = per[p.ch] || (per[p.ch] = [0, 0]); s[1]++; if (res[k] === 1) s[0]++; else wrongs.push(p); });
    var h = '<div class="chhead"><h1>ผลคะแนน</h1></div><div class="ex" style="margin-top:16px"><div class="score">' + right + " / " + n + " (" + Math.round(right / n * 100) + '%)</div><h4 style="margin:14px 0 6px">แยกตามบท</h4>';
    Object.keys(per).forEach(function (k) { h += '<div style="display:flex;justify-content:space-between;font-size:14px"><span>' + esc(BYID[k].title) + "</span><span>" + per[k][0] + "/" + per[k][1] + '</span></div><div class="pgbar"><i style="width:' + per[k][0] / per[k][1] * 100 + '%"></i></div>'; });
    h += '<div class="rowb"><button class="btn" id="rb">← กลับไปดู/แก้ข้อสอบ</button><button class="btn pri" id="rs">สอบใหม่</button>' + (wrongs.length ? '<button class="btn" id="rw">ทำซ้ำเฉพาะข้อที่ผิด/ยังไม่ตอบ (' + wrongs.length + ")</button>" : "") + "</div></div>";
    app.innerHTML = h; window.scrollTo(0, 0);
    $("#rb").onclick = function () { showQ(0); }; $("#rs").onclick = exam; var rw = $("#rw"); if (rw) rw.onclick = function () { run(shuffle(wrongs)); };
  }
  showQ(0); window.scrollTo(0, 0);
}

/* ---------- search ---------- */
var IDX = [];
CH.forEach(function (c) {
  var d = el("div");
  (c.sections || []).forEach(function (s, k) { d.innerHTML = s.html; IDX.push({ c: c, k: k, t: s.t, x: (s.t + " " + d.textContent).replace(/\s+/g, " ") }); });
});
var q = $("#q"), rs = $("#results");
q.addEventListener("input", function () {
  var v = q.value.trim().toLowerCase(); if (v.length < 2) { rs.hidden = true; return; }
  var hits = IDX.filter(function (e) { return e.x.toLowerCase().indexOf(v) >= 0; }).slice(0, 12);
  rs.innerHTML = hits.length ? hits.map(function (e) {
    var p = e.x.toLowerCase().indexOf(v), sn = e.x.slice(Math.max(0, p - 40), p + 90);
    return '<a href="#' + e.c.id + "/s" + e.k + '"><div class="rt">' + esc(e.c.title) + " › " + esc(e.t) + '</div><div class="rs">…' + esc(sn) + "…</div></a>";
  }).join("") : '<div class="rs" style="padding:10px">ไม่พบผลลัพธ์</div>';
  rs.hidden = false;
});
document.addEventListener("click", function (e) { if (!e.target.closest(".search")) rs.hidden = true; else if (e.target.closest("#results a")) { rs.hidden = true; q.value = ""; } });

/* ---------- scroll-spy for sidebar ---------- */
window.addEventListener("scroll", function () {
  if (route.v !== "ch" || route.tab !== "content") return;
  var cur = -1; $$(".sec").forEach(function (s, i) { if (s.getBoundingClientRect().top < 140) cur = i; });
  $$(".side .sub a[data-sec]").forEach(function (a) { a.classList.toggle("on", +a.dataset.sec === cur); });
}, { passive: true });

go();
})();
