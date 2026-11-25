(function () {
const F = (n, c) => `<figure><img src="i/${n}.webp" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`;
IOT.reg({
  id: "c3",
  title: "Test-Driven Development (TDD) กับ Django",
  th: "วงจร TDD, Git, functional test ด้วย Selenium, unit test ใน Django และ unit-test/code cycle",
  summary: `
<ul>
<li>TDD: <b>เขียน test ก่อนโค้ด</b> ให้ fail, เขียนโค้ดน้อยที่สุดให้ผ่าน, พบ error ก็ refactor แล้วรันทุก test ซ้ำ</li>
<li><b>Functional test</b> = มองจากภายนอก มุมผู้ใช้ (= acceptance, end-to-end, black box) ใช้ Selenium; <b>Unit test</b> = มองจากภายใน มุมโปรแกรมเมอร์</li>
<li>unittest: คลาสสืบทอด TestCase, เมธอดขึ้นต้น <code>test</code>, setUp/tearDown รันก่อน/หลังทุก test</li>
<li>Django: URL, resolve, view function, HttpResponse; รันด้วย <code>python manage.py test</code></li>
<li>Git: <code>git status</code>, <code>add</code>, <code>diff</code>, <code>commit -am</code>, <code>.gitignore</code></li>
</ul>`,
  sections: [
    { t: "แนวคิด TDD", ref: "ชุดที่ 12.2 สไลด์ 5-8", html: `
<p>Requirement ขับ design และ design เป็นฐานของการสร้าง ใน TDD <b>requirement ของ component กลายเป็นชุด test case</b> ที่ใช้งาน interface และพยายามหา error ของ data structure และฟังก์ชัน</p>
${F("d3p02b", "TDD flow: สร้าง test, เขียนโค้ด, รัน test, refactor เมื่อพบ error")}
<ol><li>สร้าง test ก่อนเขียนโค้ดส่วนเล็ก ๆ และตั้งใจให้ fail</li><li>เขียนโค้ดให้ผ่าน แล้วรัน test</li><li>ผ่าน: สร้าง test ของส่วนถัดไป</li><li>พบ error: แก้ (refactor) โค้ด แล้ว <b>รัน test ที่สร้างมาทั้งหมดอีกครั้ง</b></li><li>จบเมื่อไม่มี test ให้สร้างอีก แปลว่า component ตรง requirement ทั้งหมด</li></ol>
<div class="must"><b>ต้องจำ</b> พัฒนาทีละนิด (ทีละ subfunction) <b>ไม่เขียนโค้ดจนกว่าจะมี test รองรับ</b></div>` },
    { t: "ตั้งค่าและ Functional Test แรก", ref: "ชุดที่ 12.2 สไลด์ 9-18", html: `
<p>สร้างเว็บจริง (รายการ to-do) ด้วย Django, Selenium และ Git เตรียม virtualenv ชื่อ superlists, ติดตั้ง geckodriver และ <code>pip install django selenium</code></p>
<pre><code>from selenium import webdriver
browser = webdriver.Firefox()
browser.get("http://localhost:8000")
assert "The install worked successfully! Congratulations!" in browser.title</code></pre>
<ul><li>รันครั้งแรก <b>fail</b> เพราะยังไม่มี server (connectionFailure)</li>
<li><code>django-admin.exe startproject superlists</code> สร้าง project (container หลัก); โฟลเดอร์ superlists/superlists เก็บของระดับ project เช่น settings.py</li>
<li><code>python manage.py runserver</code> แล้วเปิด shell ใหม่รัน test จะ <b>ผ่าน</b></li></ul>` },
    { t: "Git เริ่มต้น", ref: "ชุดที่ 12.2 สไลด์ 20-24", html: `
<p>ใช้ VCS เพื่อดูเวอร์ชันเก่า revert ทดลองอย่างปลอดภัย และ backup</p>
<pre><code>mv functional_tests_firefox.py superlists/
cd superlists
git init .
echo "db.sqlite3" >> .gitignore
echo "geckodriver.log" >> .gitignore
git add .
git status
git rm -r --cached *.pyc      # .pyc ไม่ควร commit
echo "__pycache__" >> .gitignore
echo "*.pyc" >> .gitignore
git add .gitignore
git commit</code></pre>
<div class="note"><b>หมายเหตุ</b> <code>git diff</code> ดูความต่างจาก commit ล่าสุด, <code>git commit -a</code> add ไฟล์ที่ <b>ถูก track แล้ว</b> อัตโนมัติ (ไฟล์ใหม่ต้อง git add เอง)</div>` },
    { t: "Functional Test ด้วย unittest และ User Story", ref: "ชุดที่ 12.2 สไลด์ 25-38", html: `
<ul><li>FT ขับเบราว์เซอร์จริง จึงเห็นแอปจากมุมผู้ใช้ เป็นเหมือน specification ตาม User Story</li>
<li><b>Functional test = Acceptance test = End-to-End = Black box</b></li>
<li>ขอบเขตแรกคือ <b>minimum viable app</b> (สิ่งง่ายที่สุดที่ยังมีประโยชน์): ผู้ใช้ป้อน to-do ได้ และระบบจำไว้ให้ตอนกลับมา</li>
<li>เขียน comment เป็นเรื่องราวก่อน; comment ที่แค่บอกว่าโค้ดทำอะไรไร้ประโยชน์และจะล้าสมัย ควรบอก <b>ทำไม</b></li></ul>
<pre><code>from selenium import webdriver
import unittest

class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
    def tearDown(self):
        self.browser.quit()
    def test_can_start_a_list_and_retrieve_it_later(self):
        self.browser.get('http://localhost:8000')
        self.assertIn('To-Do', self.browser.title)
        self.fail('Finish the test!')

if __name__ == '__main__':
    unittest.main()</code></pre>
<table><tr><th>ส่วน</th><th>หน้าที่</th></tr>
<tr><td>TestCase</td><td>จัด test เป็นคลาส</td></tr>
<tr><td>test_*</td><td>เมธอดที่ test runner รัน มีได้หลายเมธอด</td></tr>
<tr><td>setUp / tearDown</td><td>รันก่อน/หลังทุก test เช่น เปิดและปิดเบราว์เซอร์</td></tr>
<tr><td>assertIn, assertEqual, assertTrue</td><td>ให้ข้อความ error ที่ช่วย debug</td></tr>
<tr><td>self.fail</td><td>fail เสมอ ใช้เตือนว่า test ยังไม่เสร็จ</td></tr>
<tr><td>__name__ == '__main__'</td><td>รันเฉพาะเมื่อเรียกจาก command line</td></tr></table>` },
    { t: "Unit Test ใน Django และ MVC", ref: "ชุดที่ 13.1 สไลด์ 5-16", html: `
${F("d4p02b", "Functional test กับ unit test ทำงานร่วมกัน")}
<ol><li>เขียน FT อธิบายฟีเจอร์ใหม่จากมุมผู้ใช้</li><li>FT fail แล้วใช้ unit test กำหนดว่าโค้ดต้องทำอะไร (โค้ด production ทุกบรรทัดควรมี unit test)</li><li>unit test fail แล้วเขียนโค้ด <b>น้อยที่สุด</b> ให้ผ่าน วนข้อ 2-3</li><li>รัน FT อีกครั้ง อาจนำไปสู่ test และโค้ดใหม่</li></ol>
<pre><code>python manage.py startapp lists

# lists/tests.py (ตั้งใจให้ fail)
from django.test import TestCase
class SmokeTest(TestCase):
    def test_bad_maths(self):
        self.assertEqual(1 + 1, 3)</code></pre>
${F("d4p03b", "ลำดับการทำงานของ Django: request, resolve URL, view, response")}
<ol><li>HTTP request เข้ามาตาม URL</li><li>Django <b>resolve</b> URL ว่า view function ไหนรับ</li><li>view ประมวลผลและคืน HTTP response</li></ol>
<pre><code>from django.urls import resolve
from lists.views import home_page
class HomePageTest(TestCase):
    def test_root_url_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)</code></pre>` },
    { t: "อ่าน Traceback และวงจร unit-test/code", ref: "ชุดที่ 13.1 สไลด์ 13-28", html: `
<table><tr><th>ข้อความ error</th><th>แก้ขั้นต่ำ</th></tr>
<tr><td>ImportError: cannot import name 'home_page'</td><td>home_page = None ใน views.py</td></tr>
<tr><td>Resolver404</td><td>เพิ่ม <code>path('', views.home_page, name='home')</code> ใน urls.py</td></tr>
<tr><td>TypeError: view must be a callable</td><td>เปลี่ยนเป็น <code>def home_page(): pass</code></td></tr>
<tr><td>takes 0 positional arguments but 1 was given</td><td>เพิ่มพารามิเตอร์ request</td></tr>
<tr><td>'NoneType' object has no attribute 'content'</td><td>return HttpResponse()</td></tr>
<tr><td>assert startswith('&lt;html&gt;') fail</td><td>คืน '&lt;html&gt;'</td></tr>
<tr><td>ไม่พบ title To-Do lists</td><td>เพิ่ม &lt;title&gt;</td></tr>
<tr><td>endswith('&lt;/html&gt;') fail</td><td>ปิดแท็ก แล้วผ่าน</td></tr></table>
<p><b>อ่าน traceback</b>: ดู error ก่อน, ตรวจว่าเป็น test ที่คาดไหม, แล้วหาบรรทัดใน test ที่จุดชนวน</p>
<pre><code>from django.http import HttpResponse
def home_page(request):
    return HttpResponse('&lt;html&gt;&lt;title&gt;To-Do lists&lt;/title&gt;&lt;/html&gt;')</code></pre>
<p>test ทดสอบ view: สร้าง <code>HttpRequest()</code>, เรียก view, แล้ว <code>response.content.decode('utf8')</code></p>
<div class="must"><b>ต้องจำ</b> วงจร: รัน test ดูว่า fail อย่างไร แล้วแก้โค้ดน้อยที่สุดเพื่อแก้ error ปัจจุบัน ยิ่งกังวลยิ่งทำก้าวเล็ก จากนั้น commit บ่อย ๆ</div>
<p>หลังผ่าน unit test รัน FT จะ fail ที่ <code>self.fail('Finish the test!')</code> ซึ่งเป็นตัวเตือนเฉย ๆ ขั้นต่อไปคือ <b>refactor</b> ใช้ template (ปรับโค้ดโดยไม่เปลี่ยนฟังก์ชัน, สไลด์ไม่ครอบคลุม)</p>` }
  ],
  ex: [
    { type: "choice", q: "ลำดับ TDD ที่ถูกต้องคือ", opts: [
      { t: "เขียน test ให้ fail, เขียนโค้ดให้ผ่าน, refactor และรัน test ทั้งหมด", why: "ถูก" }, { t: "เขียนโค้ดครบ แล้วเขียน test ทีเดียว", why: "ผิด: test ต้องมาก่อน" }, { t: "refactor ก่อนมีโค้ด", why: "ผิด" }, { t: "เขียน test แล้วข้ามการรันจนจบโครงการ", why: "ผิด: ต้องรันทุกก้าว" }], ans: 0 },
    { type: "multi", q: "ข้อใดเป็นคุณสมบัติของ functional test", opts: [
      { t: "มองแอปจากมุมผู้ใช้", ok: true, why: "ระดับสูง" }, { t: "ใช้ Selenium ขับเบราว์เซอร์จริง", ok: true, why: "ตามสไลด์" }, { t: "ตรวจฟังก์ชันภายในจากมุมโปรแกรมเมอร์", ok: false, why: "นั่นคือ unit test" }, { t: "เรียกอีกชื่อว่า acceptance test", ok: true, why: "สไลด์ระบุเท่ากัน" }] },
    { type: "choice", story: "คลาส test มีเมธอด setUp, tearDown, test_a, test_b", q: "setUp ถูกรันกี่ครั้งเมื่อรันทั้งคลาส", opts: [
      { t: "2 ครั้ง (ก่อนแต่ละ test)", why: "ถูก" }, { t: "1 ครั้ง", why: "ผิด: รันก่อนทุก test" }, { t: "4 ครั้ง", why: "ผิด: tearDown ไม่ใช่ setUp" }, { t: "ไม่ถูกรัน", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "เขียนเมธอด check_title(self) ในคลาส TestCase แล้ว test runner ไม่รัน", q: "สาเหตุคือ", opts: [
      { t: "ชื่อไม่ได้ขึ้นต้นด้วย test", why: "ถูก: runner รันเมธอดที่ขึ้นต้นด้วย test" }, { t: "ต้องใช้ Django เท่านั้น", why: "ผิด" }, { t: "ต้องมี setUp ก่อน", why: "ผิด" }, { t: "assertIn ใช้ไม่ได้", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "รัน python manage.py test แล้วได้ Resolver404 สำหรับ path ว่าง", q: "ควรทำอะไรต่อ", opts: [
      { t: "เพิ่ม URL mapping ของ \"/\" ใน urls.py", why: "ถูก" }, { t: "ลบ test ออก", why: "ผิด: test คือ spec" }, { t: "รัน git rm", why: "ผิด" }, { t: "เปลี่ยนไปใช้ FT อย่างเดียว", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "โค้ดคือ def home_page(): pass และ test เรียก home_page(request)", q: "error ที่คาดได้คือ", opts: [
      { t: "TypeError: takes 0 positional arguments but 1 was given", why: "ถูก" }, { t: "ImportError", why: "ผิด: import ได้แล้ว" }, { t: "Resolver404", why: "ผิด: ไม่เกี่ยว URL" }, { t: "AssertionError เรื่อง title", why: "ผิด: ยังไม่ถึงจุดนั้น" }], ans: 0 },
    { type: "choice", q: "ตาม TDD เมื่อ test บอกว่า title ไม่พบ ควรทำอย่างไร", opts: [
      { t: "แก้โค้ดน้อยที่สุดให้ title ปรากฏ แล้วรัน test อีกครั้ง", why: "ถูก" }, { t: "เขียนหน้าเว็บทั้งหมดรวม CSS ทันที", why: "ผิด: ก้าวใหญ่เกินกว่า test รองรับ" }, { t: "แก้ test ให้ผ่านโดยลบ assertion", why: "ผิด" }, { t: "ข้าม unit test ไป FT", why: "ผิด" }], ans: 0 },
    { type: "choice", story: "แก้ไฟล์ที่ track อยู่และสร้างไฟล์ใหม่ notes.py แล้วรัน git commit -am \"x\"", q: "ผลคือ", opts: [
      { t: "commit เฉพาะไฟล์ที่ track อยู่ ไฟล์ใหม่ยังไม่ถูกรวม", why: "ถูก" }, { t: "commit ทั้งสองไฟล์", why: "ผิด: -a ไม่ add ไฟล์ใหม่" }, { t: "ไม่ commit อะไร", why: "ผิด" }, { t: "commit เฉพาะไฟล์ใหม่", why: "ผิด" }], ans: 0 },
    { type: "match", q: "จับคู่ไฟล์หรือคำสั่งกับหน้าที่", pairs: [["urls.py", "map URL ไป view"], ["views.py", "ฟังก์ชันตอบ request"], [".gitignore", "บอก Git ว่าไม่ต้อง track อะไร"], ["manage.py test", "รัน test runner ของ Django"]] },
    { type: "choice", q: "ข้อใดคือ refactoring", opts: [
      { t: "ย้าย HTML ไปไว้ใน template โดยผลลัพธ์เหมือนเดิม", why: "ถูก: ปรับโครงสร้างโดยไม่เปลี่ยนฟังก์ชัน" }, { t: "เพิ่มฟีเจอร์แชร์รายการ", why: "ผิด: เปลี่ยนฟังก์ชัน" }, { t: "ลบ test ที่ fail", why: "ผิด" }, { t: "commit ครั้งแรก", why: "ผิด" }], ans: 0 }
  ]
});
})();
