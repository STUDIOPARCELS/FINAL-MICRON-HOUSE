# Tesla opening card (seal -> opening -> open, then the line): python3 build-open.py (run from mockups/tesla-anim)
import base64
b64=lambda p: "data:image/webp;base64,"+base64.b64encode(open(p,'rb').read()).decode()
A,C=b64('open-1-sealed.webp'),b64('open-3-open.webp')
INK='#393c41'
html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tesla · Opening</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
<style>
:root{{color-scheme:light dark;--bg:#e7e6e3}}
@media (prefers-color-scheme:dark){{:root{{--bg:#1d1e20}}}}
html,body{{margin:0;height:100%;background:var(--bg)}}
body{{display:grid;place-items:center;overflow:hidden}}
.stage{{width:941px;height:1672px;transform-origin:center;flex:none}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f3f1ec;font-family:Montserrat,Arial,sans-serif;color:{INK};box-shadow:0 2px 4px rgba(0,0,0,.08),0 24px 60px rgba(0,0,0,.16);cursor:pointer}}
.card{{perspective:2600px}}
.under{{position:absolute;inset:0;background:url({C}) center/941px 1672px no-repeat}}
.p{{position:absolute;top:0;height:1672px;width:470.5px;background:url({A}) no-repeat;background-size:941px 1672px;backface-visibility:hidden}}
.p::after{{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(40,36,30,.0),rgba(40,36,30,.28));opacity:0}}
.lp{{left:0;background-position:0 0;transform-origin:left center}}
.rp{{left:470.5px;background-position:-470.5px 0;transform-origin:right center}}
.rp::after{{background:linear-gradient(270deg,rgba(40,36,30,.0),rgba(40,36,30,.28))}}
.line{{position:absolute;left:104px;width:731px;top:810px;text-align:center;overflow:hidden}}
.line span{{display:block;font-size:24px;letter-spacing:.16em;font-weight:800;text-transform:uppercase;transform:translateY(105%)}}
.play .p{{animation:in 1s ease-out both}}
.play .lp{{animation:in 1s ease-out both,openL 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}}
.play .rp{{animation:in 1s ease-out both,openR 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}}
.play .p::after{{animation:shade 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}}
.play .line span{{animation:rise 1s cubic-bezier(.2,.75,.15,1) 3.3s both}}
@keyframes in{{from{{opacity:0;transform:scale(1.02)}}to{{opacity:1;transform:none}}}}
@keyframes openL{{from{{transform:rotateY(0)}}to{{transform:rotateY(-104deg)}}}}
@keyframes openR{{from{{transform:rotateY(0)}}to{{transform:rotateY(104deg)}}}}
@keyframes shade{{from{{opacity:0}}to{{opacity:1}}}}
@keyframes rise{{from{{transform:translateY(105%)}}to{{transform:none}}}}
.done .p{{display:none}} .done .line span{{transform:none}}
@media (prefers-reduced-motion:reduce){{.play *{{animation:none!important}} .p{{display:none}} .line span{{transform:none}}}}
</style></head><body>
<div class="stage" id="stage"><div class="card" id="card" title="Click to replay">
<div class="under"></div><div class="p lp"></div><div class="p rp"></div>
<div class="line"><span>An invitation to Tesla</span></div>
</div></div>
<script>
const st=document.getElementById('stage'),card=document.getElementById('card');
function fit(){{const s=Math.min((innerWidth-24)/941,(innerHeight-24)/1672);st.style.transform='scale('+s+')';st.style.margin=((1672*s-1672)/2)+'px '+((941*s-941)/2)+'px'}}
addEventListener('resize',fit);fit();
function play(){{card.classList.remove('play','done');void card.offsetWidth;card.classList.add('play')}}
card.addEventListener('click',play);
if(location.hash==='#end'){{card.classList.add('done')}}else{{document.fonts.ready.then(play)}}
</script></body></html>'''
open('tesla-card0-opening.html','w').write(html); print(len(html)//1024,'KB')
