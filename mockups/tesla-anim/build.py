# Tesla Card 1, animated reveal, single self-contained HTML: python3 build.py (run from mockups/tesla-anim)
import base64
b64=lambda p,m: f"data:{m};base64,"+base64.b64encode(open(p,'rb').read()).decode()
HOUSE=b64('../tesla-v2/card1/house.webp','image/webp')
WORD=b64('../tesla-v2/card1/wordmark-gray.png','image/png')
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'
drive=[('3','Downtown'),('3','Capitol'),('2','St. Luke&#8217;s'),('15','Airport')]
dt=''.join(f'<div class="dt r" style="--d:{3.55+i*.14:.2f}s"><div class="n">{n}<span> min</span></div><div class="l">{l}</div></div>' for i,(n,l) in enumerate(drive))
html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tesla · Card 1</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{{color-scheme:light dark;--bg:#e7e6e3}}
@media (prefers-color-scheme:dark){{:root{{--bg:#1d1e20}}}}
html,body{{margin:0;height:100%;background:var(--bg)}}
body{{display:grid;place-items:center;overflow:hidden}}
.stage{{width:941px;height:1672px;transform-origin:center;flex:none}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#fbfbfa;font-family:Montserrat,Arial,sans-serif;color:{INK};box-shadow:0 2px 4px rgba(0,0,0,.08),0 24px 60px rgba(0,0,0,.16);cursor:pointer}}
.house{{position:absolute;inset:0;background:url({HOUSE}) center/cover no-repeat}}
.wm{{position:absolute;top:165px;right:40px;width:250px}}
.txt{{position:absolute;left:60px;right:60px;bottom:42px}}
.lab{{font-size:15px;letter-spacing:.24em;text-transform:uppercase;color:{INK2};font-weight:700}}
.h{{margin-top:10px;font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
.sub{{margin-top:14px;font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
.caps{{margin-top:10px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
.rule{{margin-top:24px;height:1px;background:{RULE};transform-origin:left}}
.grid{{padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}
.n{{font-size:34px;font-weight:800;line-height:1}} .n span{{font-size:16px;font-weight:700}}
.l{{margin-top:6px;font-size:13px;letter-spacing:.14em;color:{INK2};font-weight:600;text-transform:uppercase}}
/* reveal system: masked line rise, fade-rise, image settle, rule draw */
.m{{display:block;overflow:hidden}} .m>span{{display:block;transform:translateY(105%)}}
.r{{opacity:0;transform:translateY(14px)}}
.play .house{{animation:settle 2.2s cubic-bezier(.2,.7,.2,1) both}}
.play .wm{{animation:fadeup 1.2s cubic-bezier(.2,.7,.2,1) .9s both}}
.play .m>span{{animation:rise .9s cubic-bezier(.2,.75,.15,1) var(--d) both}}
.play .r{{animation:fadeup .8s cubic-bezier(.2,.7,.2,1) var(--d) both}}
.play .rule{{animation:draw 1s cubic-bezier(.6,0,.2,1) 3.25s both}}
@keyframes settle{{from{{opacity:0;transform:scale(1.04)}}to{{opacity:1;transform:none}}}}
@keyframes fadeup{{from{{opacity:0;transform:translateY(14px)}}to{{opacity:1;transform:none}}}}
@keyframes rise{{from{{transform:translateY(105%)}}to{{transform:none}}}}
@keyframes draw{{from{{transform:scaleX(0)}}to{{transform:scaleX(1)}}}}
.done .m>span,.done .r{{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){{.play *{{animation:none!important}} .m>span,.r{{transform:none;opacity:1}}}}
.hint{{position:fixed;bottom:14px;left:0;right:0;text-align:center;font:600 11px/1 Montserrat,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8a8b8e;opacity:.8}}
</style></head><body>
<div class="stage" id="stage"><div class="card" id="card" title="Click to replay">
<div class="house"></div>
<img class="wm" src="{WORD}" alt="WARM SPRINGS HOUSE">
<div class="txt">
<div class="m lab"><span style="--d:1.7s">An invitation to Tesla</span></div>
<div class="h"><span class="m"><span style="--d:1.95s">A residential test bed</span></span><span class="m"><span style="--d:2.1s">for Optimus + Cybercab.</span></span></div>
<div class="sub"><span class="m"><span style="--d:2.45s">A modest 1906 three-bedroom home on a historic tree-lined avenue,</span></span><span class="m"><span style="--d:2.57s">heated by Boise&#8217;s geothermal springs.</span></span></div>
<div class="caps m"><span style="--d:2.95s">Available now. Ready to host.</span></div>
<div class="rule"></div>
<div class="grid">{dt}</div>
</div></div></div>
<script>
const st=document.getElementById('stage'),card=document.getElementById('card');
function fit(){{const s=Math.min((innerWidth-24)/941,(innerHeight-24)/1672);st.style.transform='scale('+s+')';st.style.margin=((1672*s-1672)/2)+'px '+((941*s-941)/2)+'px'}}
addEventListener('resize',fit);fit();
function play(){{card.classList.remove('play','done');void card.offsetWidth;card.classList.add('play')}}
card.addEventListener('click',play);
if(location.hash==='#end'){{card.classList.add('done')}}else{{document.fonts.ready.then(play)}}
</script></body></html>'''
open('tesla-card1.html','w').write(html)
print(len(html)//1024,'KB')
