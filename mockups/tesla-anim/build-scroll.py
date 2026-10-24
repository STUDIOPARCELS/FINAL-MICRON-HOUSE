# Tesla cards as one scrolling page: python3 build-scroll.py (run from mockups/tesla-anim)
# Each card is a full-height snap section. A card plays its reveal when it comes into view and resets when it leaves,
# so scrolling down or back up always plays it again. The Artifact publish wraps this file in its own doctype/head/body.
from cards import CARDS, KEYFRAMES, UTIL, CARD_BASE, FONTS, SPLIT_JS, card_css_assets, card_html

sections=''.join(f'<section class="sec" id="{c["id"]}" aria-label="{c["label"]}"><div class="stage">{card_html(c,i)}</div></section>' for i,c in enumerate(CARDS))
dots=''.join(f'<button class="dot" type="button" data-i="{i}" aria-label="Go to {c["label"]}"></button>' for i,c in enumerate(CARDS))
css=''.join(card_css_assets(c,i) for i,c in enumerate(CARDS))
# Seconds each card stays up after its reveal before the page moves on by itself (same reading time as the video)
READ={'opening':2.2,'card1':3.5,'card2':4.5,'card3':4.5,'card4':5.8,'card5':4.2,'card6':0}
durs=','.join(str(c['dur']) for c in CARDS); reads=','.join(str(READ[c['id']]) for c in CARDS)
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
.stage{{position:absolute;left:50%;top:50%;width:941px;height:var(--ch,1672px);transform:translate(-50%,-50%) scale(var(--s,.3))}}
.card{{box-shadow:var(--shadow)}}
.rail{{position:fixed;right:max(14px,env(safe-area-inset-right,0px));top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:12px;z-index:2}}
.dot{{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:var(--dot);cursor:pointer;transition:background-color .25s,transform .25s}}
.dot:hover{{transform:scale(1.3)}}
.dot[aria-current="true"]{{background:var(--fg);transform:scale(1.25)}}
.dot:focus-visible{{outline:2px solid var(--fg);outline-offset:3px}}
/* Scroll cue: appears once the opening words are in; a short line with a light travelling down it */
.cue{{position:fixed;left:50%;bottom:max(18px,env(safe-area-inset-bottom,0px));width:26px;height:26px;margin-left:-13px;color:var(--fg);opacity:0;transition:opacity .8s;pointer-events:none}}
.cue.on{{opacity:.55}}
.cue svg{{display:block;width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}}
.cue.on svg{{animation:cue 2s cubic-bezier(.45,0,.25,1) infinite}}
@keyframes cue{{0%,100%{{transform:translateY(-3px)}}50%{{transform:translateY(5px)}}}}
@media (prefers-reduced-motion:reduce){{.cue.on svg{{animation:none}}}}
@media (max-width:699px){{.rail{{display:none}} html body{{background:#f4f4f3}} .cue{{color:#393c41;bottom:12%}} .card{{box-shadow:none}}}}
{CARD_BASE}{KEYFRAMES}{UTIL}{css}
</style>
<div class="scroller" id="scroller">{sections}</div>
<nav class="rail" aria-label="Cards">{dots}</nav>
<div class="cue" id="cue" aria-hidden="true"><svg viewBox="0 0 26 26"><path d="M6 10l7 7 7-7"/></svg></div>
<script>{SPLIT_JS}
const sc=document.getElementById('scroller'),secs=[...sc.querySelectorAll('.sec')],cards=secs.map(s=>s.querySelector('.card')),dots=[...document.querySelectorAll('.dot')],cue=document.getElementById('cue');
const dur=[{durs}],read=[{reads}],still=matchMedia('(prefers-reduced-motion:reduce)').matches;
// Phones: each card takes the exact shape of the screen, full bleed, nothing cut. The card stays 941 wide and its height follows
// the screen (--ch); spacing and photo sizes inside each card adjust, photos keep their own proportions. Larger screens: the
// 941 x 1672 card with about an inch (120px) above and below.
const phone=()=>sc.clientWidth<700;
function fit(){{const w=sc.clientWidth,h=sc.clientHeight;let s,H=1672;
  if(phone()){{s=w/941;H=h/s;if(H<1450){{H=1450;s=h/H}}else if(H>1820){{H=1820;s=Math.min(w/941,h/H)}}}}
  else s=Math.min((w-96)/941,(h-240)/1672);
  secs.forEach(x=>{{x.style.setProperty('--s',Math.max(.05,s));x.style.setProperty('--ch',H+'px');x.style.setProperty('--k',Math.max(1,H/1672))}})}}
addEventListener('resize',fit);fit();
function play(c){{c.classList.remove('play');void c.offsetWidth;c.classList.add('play')}}
let cur=0;
function mark(i){{cur=i;dots.forEach((d,j)=>d.setAttribute('aria-current',String(j===i)));if(i>0){{cueDone=true;cue.classList.remove('on')}}}}
// Until the viewer touches, scrolls, clicks or presses a key, the page moves to the next card by itself once each card has been read.
let auto=true,timer=null,cueTimer=null,cueDone=false;
function stopAuto(){{auto=false;clearTimeout(timer)}}
['wheel','touchstart','pointerdown','keydown'].forEach(t=>addEventListener(t,stopAuto,{{passive:true,capture:true}}));
function go(i){{secs[i].scrollIntoView({{behavior:still?'auto':'smooth'}})}}
function arrive(i){{clearTimeout(timer);clearTimeout(cueTimer);
  if(i===0&&!cueDone)cueTimer=setTimeout(()=>cue.classList.add('on'),dur[0]*1000);
  if(!auto)return;
  // a card taller than the screen: once it has played, glide down to show its last lines, then move on
  timer=setTimeout(()=>{{if(!auto)return;const over=secs[i].offsetHeight-sc.clientHeight;
    if(over>2)sc.scrollTo({{top:secs[i].offsetTop+over,behavior:still?'auto':'smooth'}});
    if(i<secs.length-1)timer=setTimeout(()=>{{if(auto)go(i+1)}},read[i]*1000)}},dur[i]*1000)}}
const io=new IntersectionObserver(es=>{{es.forEach(e=>{{const i=secs.indexOf(e.target),c=cards[i];
  if(e.intersectionRatio>=.6){{if(!c.classList.contains('play'))play(c);mark(i);arrive(i)}}
  else if(e.intersectionRatio===0){{c.classList.remove('play')}}
}})}},{{root:sc,threshold:[0,.6]}});
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{{secs.forEach(s=>splitLines(s));secs.forEach(s=>io.observe(s))}});
dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
addEventListener('keydown',e=>{{if(e.metaKey||e.ctrlKey||e.altKey)return;const i=cur;
  if(['ArrowDown','PageDown',' '].includes(e.key)&&i<secs.length-1){{e.preventDefault();go(i+1)}}
  else if(['ArrowUp','PageUp'].includes(e.key)&&i>0){{e.preventDefault();go(i-1)}}}});
</script>'''
open('tesla-scroll.html','w').write(PAGE); print('tesla-scroll.html',len(PAGE)//1024,'KB')
