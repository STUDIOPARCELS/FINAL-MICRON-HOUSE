# Tesla cards as one scrolling page, a stacked deck: python3 build-scroll.py (run from mockups/tesla-anim)
# Each card is pinned in place; the next one slides up over it while the covered card eases back and dims, like invitation
# cards laid one on another. Snap points sit on invisible markers, one per screen. Every card keeps one fixed design (941 x 1672)
# on every screen. The Artifact publish wraps this file in its own doctype/head/body.
from cards import CARDS, KEYFRAMES, UTIL, CARD_BASE, FONTS, SPLIT_JS, card_css_assets, card_html

snaps=''.join(f'<i class="snap" style="top:{i*100}%"></i>' for i in range(len(CARDS)))
# cards whose full-bleed photo runs off the top edge keep that edge on screen; any phone overhang comes off the bottom margin
TOP=set()  # cards whose photo runs off the top edge (none at present)
sections=''.join(f'<section class="sec" id="{c["id"]}" aria-label="{c["label"]}"{" data-anchor=top" if c["id"] in TOP else ""}><div class="stage">{card_html(c,i)}</div></section>' for i,c in enumerate(CARDS))
dots=''.join(f'<button class="dot" type="button" data-i="{i}" aria-label="Go to {c["label"]}"></button>' for i,c in enumerate(CARDS))
css=''.join(card_css_assets(c,i) for i,c in enumerate(CARDS))
# Seconds each card stays up after its reveal before the page moves on by itself (same reading time as the video)
READ={'opening':2.2,'card1':3.5,'card2':4.5,'card3':4.5,'card4':5.8,'card5':4.2,'card6':0}
durs=','.join(str(c['dur']) for c in CARDS); reads=','.join(str(READ[c['id']]) for c in CARDS)
PAGE=f'''<title>Reserved for Tesla</title>
<meta name="claude:viewport-fit-sides" content="cover">
{FONTS}
<style>
/* Layout: one card per screen, snapped; a quiet dot rail on the right */
:root{{--bg:#fff;--fg:#393c41;--muted:#7b7d81;--dot:#c4c4c1;--shadow:0 1px 3px rgba(30,30,32,.06),0 18px 50px rgba(30,30,32,.10);color-scheme:light}}
/* The page stays plain white in light and dark mode: the invitation is printed stock on a white table */
html,body{{height:100%}}
body{{margin:0;background:var(--bg);color:var(--fg);overflow:hidden}}
.scroller{{position:relative;height:100%;overflow-x:hidden;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior:contain;scrollbar-width:none}}
.snap{{position:absolute;left:0;width:1px;height:100%;scroll-snap-align:start;scroll-snap-stop:always;pointer-events:none}}
.scroller::-webkit-scrollbar{{display:none}}
.sec{{position:sticky;top:0;height:100%;box-sizing:border-box;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:0}}
.stage{{position:absolute;left:50%;top:calc(50% + var(--dy,0px));width:941px;height:var(--ch,1672px);transform:translate(-50%,-50%) scale(var(--s,.3))}}
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
/* Arriving from the email (?card=1): the reader has just watched the seal open, so the page starts on Card 1 and it drops onto the table */
.stage.wait{{opacity:0}}
.stage.drop{{animation:drop 1.1s cubic-bezier(.2,.75,.15,1) both}}
@keyframes drop{{from{{translate:0 -9vh;scale:1.03;opacity:0}}to{{translate:0 0;scale:1;opacity:1}}}}
@media (prefers-reduced-motion:reduce){{.stage.drop{{animation:none}}}}
@media (max-width:699px){{.rail{{display:none}} html body{{background:#fff}} .cue{{color:#393c41;bottom:12%}} .card{{box-shadow:none}} .sec{{overflow:hidden}} .sec~.sec{{box-shadow:0 -10px 34px rgba(20,20,22,.22)}}}}
{CARD_BASE}{KEYFRAMES}{UTIL}{css}
</style>
<div class="scroller" id="scroller">{snaps}{sections}</div>
<nav class="rail" aria-label="Cards">{dots}</nav>
<div class="cue" id="cue" aria-hidden="true"><svg viewBox="0 0 26 26"><path d="M6 10l7 7 7-7"/></svg></div>
<script>{SPLIT_JS}
const sc=document.getElementById('scroller'),secs=[...sc.querySelectorAll('.sec')],cards=secs.map(s=>s.querySelector('.card')),dots=[...document.querySelectorAll('.dot')],cue=document.getElementById('cue');
const dur=[{durs}],read=[{reads}],still=matchMedia('(prefers-reduced-motion:reduce)').matches;
// Phones: full bleed with one fixed design. The card is scaled to cover the screen; where the screen is a little shorter or wider
// than the card, only plain margin runs off the edge: at most 62px of card at the top and bottom (cards keep 64-90px there)
// and 50px at the sides (they keep 60). Past that the whole card shows, on its own paper. A card whose photo runs off its top
// edge keeps that edge on screen: up to 120px comes off its deeper bottom margin first, only then the top.
// Larger screens: a restrained card, at most 768px tall, with at least an inch (120px) above and below.
const phone=()=>sc.clientWidth<700;
function fit(){{const w=sc.clientWidth,h=sc.clientHeight;let s;
  if(phone()){{s=Math.max(w/941,h/1672);if((941*s-w)/2/s>50||(1672*s-h)/2/s>62)s=Math.min(w/941,h/1672)}}
  else s=Math.min((w-96)/941,(h-240)/1672,768/1672);
  const cy=Math.max(0,(1672*s-h)/2/s);
  secs.forEach(x=>{{x.style.setProperty('--s',Math.max(.05,s));x.style.setProperty('--dy',(x.dataset.anchor==='top'?(cy-Math.max(0,2*cy-120))*s:0)+'px')}})}}
// refit whenever the visible area changes: rotation, Safari's toolbar growing or shrinking, a tab restored from the background
addEventListener('resize',fit);addEventListener('pageshow',fit);if(window.visualViewport)visualViewport.addEventListener('resize',fit);
if('ResizeObserver' in window)new ResizeObserver(fit).observe(sc);fit();
function play(c){{c.classList.remove('play');void c.offsetWidth;c.classList.add('play')}}
let cur=0;
function mark(i){{cur=i;dots.forEach((d,j)=>d.setAttribute('aria-current',String(j===i)));if(i>0){{cueDone=true;cue.classList.remove('on')}}}}
// Until the viewer touches, scrolls, clicks or presses a key, the page moves to the next card by itself once each card has been read.
let auto=true,timer=null,cueTimer=null,cueDone=false;
function stopAuto(){{auto=false;clearTimeout(timer)}}
['wheel','touchstart','pointerdown','keydown'].forEach(t=>addEventListener(t,stopAuto,{{passive:true,capture:true}}));
function go(i){{sc.scrollTo({{top:i*sc.clientHeight,behavior:still?'auto':'smooth'}})}}
function arrive(i){{clearTimeout(timer);clearTimeout(cueTimer);
  if(i===0&&!cueDone)cueTimer=setTimeout(()=>cue.classList.add('on'),dur[0]*1000);
  if(!auto)return;
  if(i<secs.length-1)timer=setTimeout(()=>{{if(auto)go(i+1)}},(dur[i]+read[i])*1000)}}
// y = how many screens down. The next card slides up over the one beneath, which stays perfectly still (nothing is redrawn
// while scrolling). A card plays the first time it is more than half in place, then stays finished: coming back shows it complete.
let ready=false,ticking=false,shown=-1;
function frame(){{ticking=false;if(!ready)return;const y=sc.scrollTop/sc.clientHeight;
  const i=Math.round(y);if(Math.abs(y-i)<.45&&i!==shown){{shown=i;if(!cards[i].classList.contains('play'))play(cards[i]);mark(i);arrive(i)}}}}
sc.addEventListener('scroll',()=>{{if(!ticking){{ticking=true;requestAnimationFrame(frame)}}}},{{passive:true}});
// A link ending ?card=N starts on that card. The email's GIF and invitation link use ?card=1: the reader has just watched
// the seal open, so the opening is skipped and Card 1 drops in.
const start=Math.min(secs.length-1,Math.max(0,parseInt(new URLSearchParams(location.search).get('card'),10)||0)),first=secs[start].querySelector('.stage');
if(start){{sc.scrollTop=start*sc.clientHeight;first.classList.add('wait')}}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{{secs.forEach(s=>splitLines(s));
  if(start){{sc.scrollTop=start*sc.clientHeight;first.classList.remove('wait');first.classList.add('drop')}}
  ready=true;frame()}});
dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
addEventListener('keydown',e=>{{if(e.metaKey||e.ctrlKey||e.altKey)return;const i=cur;
  if(['ArrowDown','PageDown',' '].includes(e.key)&&i<secs.length-1){{e.preventDefault();go(i+1)}}
  else if(['ArrowUp','PageUp'].includes(e.key)&&i>0){{e.preventDefault();go(i-1)}}}});
</script>'''
open('tesla-scroll.html','w').write(PAGE); print('tesla-scroll.html',len(PAGE)//1024,'KB')
