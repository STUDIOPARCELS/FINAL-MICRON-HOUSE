# Tesla animated cards: python3 build.py (run from mockups/tesla-anim)
# Writes one standalone file per card (opens in any browser) and tesla-cards.html, the viewer page published as an Artifact.
from cards import CARDS, KEYFRAMES, CARD_BASE, FONTS, card_css_assets, card_html

STANDALONE='''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tesla · {label}</title>
{fonts}
<style>
:root{{color-scheme:light dark;--bg:#e7e6e3}}
@media (prefers-color-scheme:dark){{:root{{--bg:#1d1e20}}}}
html,body{{margin:0;height:100%;background:var(--bg)}}
body{{display:grid;place-items:center;overflow:hidden}}
.stage{{width:941px;height:1672px;transform-origin:center;flex:none}}
.card{{box-shadow:0 2px 4px rgba(0,0,0,.08),0 24px 60px rgba(0,0,0,.16)}}
{base}{keys}{css}
</style></head><body>
<div class="stage" id="stage">{html}</div>
<script>
const st=document.getElementById('stage'),card=st.firstElementChild;
function fit(){{const s=Math.min((innerWidth-24)/941,(innerHeight-24)/1672);st.style.transform='scale('+s+')';st.style.margin=((1672*s-1672)/2)+'px '+((941*s-941)/2)+'px'}}
addEventListener('resize',fit);fit();
function play(){{card.classList.remove('play','done');void card.offsetWidth;card.classList.add('play')}}
card.addEventListener('click',play);
if(location.hash==='#end'){{card.classList.add('done')}}else{{document.fonts.ready.then(play)}}
</script></body></html>'''
names={'opening':'tesla-card0-opening.html','card1':'tesla-card1.html'}
for i,c in enumerate(CARDS):
    out=STANDALONE.format(label=c['label'],fonts=FONTS,base=CARD_BASE,keys=KEYFRAMES,css=card_css_assets(c,i),html=card_html(c,i))
    open(names[c['id']],'w').write(out); print(names[c['id']],len(out)//1024,'KB')

# Viewer page. The Artifact publish wraps it in its own doctype/head/body, so it starts at <title>.
tabs=''.join(f'<button class="tab" role="tab" id="t{i}" aria-controls="s{i}" aria-selected="false" tabindex="-1">{c["label"]}</button>' for i,c in enumerate(CARDS))
stages=''.join(f'<div class="stage" id="s{i}" role="tabpanel" aria-labelledby="t{i}"{"" if i==0 else " hidden"}>{card_html(c,i)}</div>' for i,c in enumerate(CARDS))
css=''.join(card_css_assets(c,i) for i,c in enumerate(CARDS))
ids=','.join(f"'{c['id']}'" for c in CARDS); durs=','.join(str(c['dur']) for c in CARDS)
VIEWER=f'''<title>Tesla Invitation Cards</title>
<meta name="claude:viewport-fit-sides" content="cover">
{FONTS}
<style>
/* Layout: one card at a time on a quiet gray table, a slim control bar above it */
:root{{--bg:#e8e7e4;--fg:#393c41;--muted:#7b7d81;--line:#d3d2cf;--hover:#f4f4f2;--on:#393c41;--on-fg:#f6f6f4;--shadow:0 2px 4px rgba(30,30,32,.08),0 24px 60px rgba(30,30,32,.16);--ui:Montserrat,Arial,sans-serif}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#17181a;--fg:#e4e4e2;--muted:#9a9ca0;--line:#323438;--hover:#222326;--on:#e4e4e2;--on-fg:#17181a;--shadow:0 2px 6px rgba(0,0,0,.4),0 28px 70px rgba(0,0,0,.55);color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#17181a;--fg:#e4e4e2;--muted:#9a9ca0;--line:#323438;--hover:#222326;--on:#e4e4e2;--on-fg:#17181a;--shadow:0 2px 6px rgba(0,0,0,.4),0 28px 70px rgba(0,0,0,.55);color-scheme:dark}}
[hidden]{{display:none!important}}
html,body{{height:100%}}
body{{margin:0;background:var(--bg);color:var(--fg);font-family:var(--ui);display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:0}}
.bar{{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;padding-block:14px 12px}}
.brand{{display:flex;align-items:baseline;gap:10px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap}}
.brand b{{font-weight:800}} .brand span{{color:var(--muted);font-weight:600}}
.tabs{{display:flex;gap:2px;padding:3px;border:1px solid var(--line);border-radius:999px}}
button{{font:600 11px/1 var(--ui);letter-spacing:.14em;text-transform:uppercase;color:var(--fg);background:none;border:0;border-radius:999px;padding:9px 14px;cursor:pointer;transition:background-color .2s,color .2s,transform .12s}}
button:hover{{background:var(--hover)}} button:active{{transform:scale(.97)}}
button:focus-visible{{outline:2px solid var(--fg);outline-offset:2px}}
.tab[aria-selected="true"]{{background:var(--on);color:var(--on-fg)}}
.acts{{display:flex;gap:6px}}
.act{{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--line)}}
.act svg{{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}}
.act[aria-pressed="true"]{{background:var(--on);color:var(--on-fg);border-color:var(--on)}}
.prog{{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line);overflow:hidden}}
.prog i{{display:block;height:100%;background:var(--fg);transform-origin:left;transform:scaleX(0)}}
.prog i.run{{animation:prog var(--dur,4s) linear both}}
@keyframes prog{{from{{transform:scaleX(0)}}to{{transform:scaleX(1)}}}}
.view{{position:relative;flex:1;min-height:0;--s:.3}}
.stage{{position:absolute;left:50%;top:50%;width:941px;height:1672px;transform:translate(-50%,-50%) scale(var(--s))}}
.stage:not([hidden]){{animation:stagein .45s ease both}}
@keyframes stagein{{from{{opacity:0}}to{{opacity:1}}}}
.card{{box-shadow:var(--shadow)}}
.hint{{text-align:center;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);padding-block:8px 12px}}
@media (prefers-reduced-motion:reduce){{.prog i.run,.stage:not([hidden]){{animation:none}} .prog i.run{{transform:none}}}}
{CARD_BASE}{KEYFRAMES}{css}
</style>
<header class="bar">
<div class="brand"><b>Warm Springs House</b><span>Tesla</span></div>
<nav class="tabs" role="tablist" aria-label="Cards">{tabs}</nav>
<div class="acts">
<button class="act" id="replay" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>Replay</button>
<button class="act" id="all" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg><span>Play all</span></button>
</div>
<div class="prog" aria-hidden="true"><i id="prog"></i></div>
</header>
<main class="view" id="view">{stages}</main>
<div class="hint">Click the card or press R to replay · arrow keys change cards</div>
<script>
const ids=[{ids}],dur=[{durs}];
const view=document.getElementById('view'),prog=document.getElementById('prog'),allBtn=document.getElementById('all');
const stages=[...view.querySelectorAll('.stage')],cards=stages.map(s=>s.firstElementChild),tabs=[...document.querySelectorAll('.tab')];
let cur=0,seq=null;
function fit(){{const w=view.clientWidth,h=view.clientHeight;view.style.setProperty('--s',Math.max(.05,Math.min((w-8)/941,(h-16)/1672)))}}
if('ResizeObserver' in window)new ResizeObserver(fit).observe(view);addEventListener('resize',fit);fit();
function restart(el,cls){{el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls)}}
function show(i){{
  cur=i;
  stages.forEach((s,j)=>s.hidden=j!==i);
  tabs.forEach((t,j)=>{{t.setAttribute('aria-selected',String(j===i));t.tabIndex=j===i?0:-1}});
  prog.style.setProperty('--dur',dur[i]+'s');
  restart(cards[i],'play');restart(prog,'run');
  try{{history.replaceState(null,'','#'+ids[i])}}catch(e){{}}
}}
function stopAll(){{clearTimeout(seq);seq=null;allBtn.setAttribute('aria-pressed','false');allBtn.querySelector('span').textContent='Play all'}}
function playAll(i){{
  show(i);allBtn.setAttribute('aria-pressed','true');allBtn.querySelector('span').textContent='Stop';
  seq=setTimeout(()=>i+1<cards.length?playAll(i+1):stopAll(),(dur[i]+1.8)*1000);
}}
tabs.forEach((t,j)=>t.addEventListener('click',()=>{{stopAll();show(j)}}));
cards.forEach(c=>c.addEventListener('click',()=>{{stopAll();show(cur)}}));
document.getElementById('replay').addEventListener('click',()=>{{stopAll();show(cur)}});
allBtn.addEventListener('click',()=>seq?stopAll():playAll(0));
addEventListener('keydown',e=>{{
  if(e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.key==='ArrowRight'&&cur<cards.length-1){{stopAll();show(cur+1);tabs[cur].focus()}}
  else if(e.key==='ArrowLeft'&&cur>0){{stopAll();show(cur-1);tabs[cur].focus()}}
  else if(e.key==='r'||e.key==='R'){{stopAll();show(cur)}}
}});
let started=false;const start=()=>{{if(started)return;started=true;const k=ids.indexOf(location.hash.slice(1));show(k<0?0:k)}};
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(start);setTimeout(start,1500);
</script>'''
open('tesla-cards.html','w').write(VIEWER); print('tesla-cards.html',len(VIEWER)//1024,'KB')
