# Tesla cards as one scrolling page: python3 build-scroll.py (run from mockups/tesla-anim)
# Each card is a full-height snap section. A card plays its reveal when it comes into view and resets when it leaves,
# so scrolling down or back up always plays it again. The Artifact publish wraps this file in its own doctype/head/body.
from cards import CARDS, KEYFRAMES, UTIL, CARD_BASE, FONTS, SPLIT_JS, card_css_assets, card_html

sections=''.join(f'<section class="sec" id="{c["id"]}" aria-label="{c["label"]}"><div class="stage">{card_html(c,i)}</div></section>' for i,c in enumerate(CARDS))
dots=''.join(f'<button class="dot" type="button" data-i="{i}" aria-label="Go to {c["label"]}"></button>' for i,c in enumerate(CARDS))
css=''.join(card_css_assets(c,i) for i,c in enumerate(CARDS))
PAGE=f'''<title>Prepared for Tesla</title>
<meta name="claude:viewport-fit-sides" content="cover">
{FONTS}
<style>
/* Layout: one card per screen, snapped; a quiet dot rail on the right */
:root{{--bg:#e8e7e4;--fg:#393c41;--muted:#7b7d81;--dot:#b9b9b6;--shadow:0 2px 4px rgba(30,30,32,.08),0 24px 60px rgba(30,30,32,.16)}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#17181a;--fg:#e4e4e2;--muted:#9a9ca0;--dot:#4a4c50;--shadow:0 2px 6px rgba(0,0,0,.4),0 28px 70px rgba(0,0,0,.55);color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#17181a;--fg:#e4e4e2;--muted:#9a9ca0;--dot:#4a4c50;--shadow:0 2px 6px rgba(0,0,0,.4),0 28px 70px rgba(0,0,0,.55);color-scheme:dark}}
html,body{{height:100%}}
body{{margin:0;background:var(--bg);color:var(--fg);overflow:hidden}}
.scroller{{height:100%;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior:contain;scrollbar-width:none}}
.scroller::-webkit-scrollbar{{display:none}}
.sec{{position:relative;height:100%;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden;box-sizing:border-box;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:0}}
.stage{{position:absolute;left:50%;top:50%;width:941px;height:1672px;transform:translate(-50%,-50%) scale(var(--s,.3))}}
.card{{box-shadow:var(--shadow)}}
.rail{{position:fixed;right:max(14px,env(safe-area-inset-right,0px));top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:12px;z-index:2}}
.dot{{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:var(--dot);cursor:pointer;transition:background-color .25s,transform .25s}}
.dot:hover{{transform:scale(1.3)}}
.dot[aria-current="true"]{{background:var(--fg);transform:scale(1.25)}}
.dot:focus-visible{{outline:2px solid var(--fg);outline-offset:3px}}
.hint{{position:fixed;left:0;right:0;bottom:max(14px,env(safe-area-inset-bottom,0px));text-align:center;font:600 10px/1 Montserrat,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);transition:opacity .6s;pointer-events:none}}
.hint.off{{opacity:0}}
@media (max-width:699px){{.rail{{display:none}}}}
{CARD_BASE}{KEYFRAMES}{UTIL}{css}
</style>
<div class="scroller" id="scroller">{sections}</div>
<nav class="rail" aria-label="Cards">{dots}</nav>
<div class="hint" id="hint">Scroll</div>
<script>{SPLIT_JS}
const sc=document.getElementById('scroller'),secs=[...sc.querySelectorAll('.sec')],cards=secs.map(s=>s.querySelector('.card')),dots=[...document.querySelectorAll('.dot')],hint=document.getElementById('hint');
// The card fills the screen height, with a small margin; on phones it fills the width.
function fit(){{const w=sc.clientWidth,h=sc.clientHeight;const s=w<700?Math.min((w-32)/941,(h-24)/1672):Math.min((w-96)/941,(h-32)/1672);secs.forEach(x=>x.style.setProperty('--s',Math.max(.05,s)))}}
addEventListener('resize',fit);fit();
function play(c){{c.classList.remove('play');void c.offsetWidth;c.classList.add('play')}}
function mark(i){{dots.forEach((d,j)=>d.setAttribute('aria-current',String(j===i)));if(i>0)hint.classList.add('off')}}
const io=new IntersectionObserver(es=>{{es.forEach(e=>{{const i=secs.indexOf(e.target),c=cards[i];
  if(e.intersectionRatio>=.6){{if(!c.classList.contains('play'))play(c);mark(i)}}
  else if(e.intersectionRatio===0){{c.classList.remove('play')}}
}})}},{{root:sc,threshold:[0,.6]}});
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{{secs.forEach(s=>splitLines(s));secs.forEach(s=>io.observe(s))}});
dots.forEach((d,i)=>d.addEventListener('click',()=>secs[i].scrollIntoView({{behavior:'smooth'}})));
cards.forEach(c=>c.addEventListener('click',e=>{{if(!e.target.closest('a'))play(c)}}));
addEventListener('keydown',e=>{{if(e.metaKey||e.ctrlKey||e.altKey)return;const i=Math.round(sc.scrollTop/sc.clientHeight);
  if(['ArrowDown','PageDown',' '].includes(e.key)&&i<secs.length-1){{e.preventDefault();secs[i+1].scrollIntoView({{behavior:'smooth'}})}}
  else if(['ArrowUp','PageUp'].includes(e.key)&&i>0){{e.preventDefault();secs[i-1].scrollIntoView({{behavior:'smooth'}})}}}});
</script>'''
open('tesla-scroll.html','w').write(PAGE); print('tesla-scroll.html',len(PAGE)//1024,'KB')
