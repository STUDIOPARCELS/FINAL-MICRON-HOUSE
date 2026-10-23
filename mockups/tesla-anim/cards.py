# Tesla animated cards: one source for the standalone files and the viewer page.
# Each card's CSS uses $S for its own scope (#c0, #c1, ...); keyframes are shared in KEYFRAMES.
import base64
b64=lambda p,m: f"data:{m};base64,"+base64.b64encode(open(p,'rb').read()).decode()
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'

KEYFRAMES='''
@keyframes in{from{opacity:0;transform:scale(1.02)}to{opacity:1;transform:none}}
@keyframes openL{from{transform:rotateY(0)}to{transform:rotateY(-104deg)}}
@keyframes openR{from{transform:rotateY(0)}to{transform:rotateY(104deg)}}
@keyframes shade{from{opacity:0}to{opacity:1}}
@keyframes rise{from{transform:translateY(105%)}to{transform:none}}
@keyframes settle{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:none}}
@keyframes fadeup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes wipe{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(-40px)}}
@keyframes zoom{from{transform:scale(1.08)}to{transform:none}}
'''

# Reveal system shared by all cards: .m masked line rise, .r fade-rise, .ln rule draw, .im photo wipe. Each takes --d (delay).
UTIL='''
.card .m{display:block;clip-path:inset(0 -.5em)} .card .m>span{display:block;white-space:nowrap;transform:translateY(105%)}
.card .r{opacity:0;transform:translateY(14px)}
.card .ln{height:1px;transform-origin:left;transform:scaleX(0)}
.card .im{position:relative;overflow:hidden;clip-path:inset(0 0 100% 0);box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)}
.card .im img{display:block;width:100%;height:100%;object-fit:cover}
.card.play .m>span{animation:rise .9s cubic-bezier(.2,.75,.15,1) var(--d) both}
.card.play .r{animation:fadeup .8s cubic-bezier(.2,.7,.2,1) var(--d) both}
.card.play .ln{animation:draw 1s cubic-bezier(.6,0,.2,1) var(--d) both}
.card.play .im{animation:wipe 1.3s cubic-bezier(.65,0,.2,1) var(--d) both}
.card.play .im img{animation:zoom 2.6s cubic-bezier(.2,.7,.2,1) var(--d) both}
.card.done .m>span,.card.done .r,.card.done .ln{transform:none;opacity:1} .card.done .im{clip-path:none}
@media (prefers-reduced-motion:reduce){.card .m>span,.card .r,.card .ln{transform:none;opacity:1} .card .im{clip-path:none}}
'''

# Opening: the sealed card splits into a gatefold and opens onto the cardstock, then the line rises
OPENING=dict(id='opening', label='Opening', dur=4.4, css='''
$S{background:#f3f1ec;perspective:2600px}
$S .under{position:absolute;inset:0;background:url(__OPEN__) center/941px 1672px no-repeat}
$S .p{position:absolute;top:0;height:1672px;width:470.5px;background:url(__SEALED__) no-repeat;background-size:941px 1672px;backface-visibility:hidden}
$S .p::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(40,36,30,0),rgba(40,36,30,.28));opacity:0}
$S .lp{left:0;background-position:0 0;transform-origin:left center}
$S .rp{left:470.5px;background-position:-470.5px 0;transform-origin:right center}
$S .rp::after{background:linear-gradient(270deg,rgba(40,36,30,0),rgba(40,36,30,.28))}
$S .line{position:absolute;left:104px;width:731px;top:810px;text-align:center;overflow:hidden}
$S .line span{display:block;font-size:24px;letter-spacing:.16em;font-weight:800;text-transform:uppercase;transform:translateY(105%)}
$S.play .p{animation:in 1s ease-out both}
$S.play .lp{animation:in 1s ease-out both,openL 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}
$S.play .rp{animation:in 1s ease-out both,openR 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}
$S.play .p::after{animation:shade 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}
$S.play .line span{animation:rise 1s cubic-bezier(.2,.75,.15,1) 3.3s both}
$S.done .p{display:none} $S.done .line span{transform:none}
@media (prefers-reduced-motion:reduce){$S .p{display:none} $S .line span{transform:none}}
''', html='''<div class="under"></div><div class="p lp"></div><div class="p rp"></div>
<div class="line"><span>Prepared for Tesla</span></div>''',
assets={'__SEALED__':('open-1-sealed.webp','image/webp'),'__OPEN__':('open-3-open.webp','image/webp')})

# Card 1: house settles, wordmark, then the text line by line, rule draws, drive times one by one
drive=[('3','Downtown'),('3','Capitol'),('2','St. Luke&#8217;s'),('15','Airport')]
dt=''.join(f'<div class="r" style="--d:{3.55+i*.14:.2f}s"><div class="n">{n}<span> min</span></div><div class="l">{l}</div></div>' for i,(n,l) in enumerate(drive))
CARD1=dict(id='card1', label='Card 1', dur=4.9, css=f'''
$S{{background:#fbfbfa}}
$S .house{{position:absolute;inset:0;--h:url(__HOUSE__);background:var(--h) 0 -70px/941px 1672px no-repeat,var(--h) 0 0/941px 1672px no-repeat}}
$S .wm{{position:absolute;top:116px;left:688px;width:212px}}
$S .txt{{position:absolute;left:60px;right:60px;bottom:42px}}
$S .h{{font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{margin-top:32px;font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
$S .rule{{margin-top:34px;background:{RULE}}}
$S .grid{{padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}
$S .n{{font-size:34px;font-weight:800;line-height:1}} $S .n span{{font-size:16px;font-weight:700}}
$S .l{{margin-top:6px;font-size:13px;letter-spacing:.14em;color:{INK2};font-weight:600;text-transform:uppercase}}
$S.play .house{{animation:settle 2.2s cubic-bezier(.2,.7,.2,1) both}}
$S.play .wm{{animation:fadeup 1.2s cubic-bezier(.2,.7,.2,1) .9s both}}
''', html='''<div class="house"></div>
<img class="wm" src="__WORD__" alt="WARM SPRINGS HOUSE">
<div class="txt">
<div class="h"><span class="m"><span style="--d:1.95s">A residential test bed</span></span><span class="m"><span style="--d:2.1s">for Optimus + Cybercab.</span></span></div>
<div class="sub"><span class="m"><span style="--d:2.45s">A modest 1906 three-bedroom home on a historic tree-lined avenue,</span></span><span class="m"><span style="--d:2.57s">heated by Boise&#8217;s geothermal springs.</span></span></div>
<div class="caps m"><span style="--d:2.95s">Available now. Ready to host.</span></div>
<div class="rule ln" style="--d:3.25s"></div>
<div class="grid">'''+dt+'''</div>
</div>''',
assets={'__HOUSE__':('../tesla-v2/card1/house.webp','image/webp'),'__WORD__':('../tesla-v2/card1/wordmark-gray.png','image/png')})

# Card 2: Optimus room and Cybercab wipe in, then the text line by line
CARD2=dict(id="card2", label="Card 2", dur=4.5, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:38px}}
$S .pics{{flex:1;min-height:0;display:flex;flex-direction:column;gap:17px}}
$S .pics .im:first-child{{flex:1;min-height:0}} $S .pics .im:first-child img{{object-position:100% 50%}}
$S .pics .im:last-child{{height:400px;flex:none}}
$S .h{{font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .lede{{margin-top:32px;font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .rule{{margin-top:34px;background:{RULE}}}
$S .p{{padding-top:22px;font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
$S .p em{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:25px;font-weight:400;color:{INK}}}
""", html="""<div class="wrap">
<div class="pics"><div class="im" style="--d:.2s"><img src="__ROOM__" alt="Optimus in the living room"></div><div class="im" style="--d:.65s"><img src="__CAB__" alt="Cybercab at the house"></div></div>
<div>
<div class="h"><span class="m"><span style="--d:1.45s">Tesla engineers</span></span><span class="m"><span style="--d:1.6s">in residence</span></span></div>
<div class="lede"><span class="m"><span style="--d:1.95s">Grounding Optimus and Cybercab in a historic home.</span></span></div>
<div class="caps m"><span style="--d:2.3s">At no cost to Tesla.</span></div>
<div class="rule ln" style="--d:2.6s"></div>
<div class="p"><span class="m"><span style="--d:2.9s">One or more Tesla engineers live and work alongside</span></span><span class="m"><span style="--d:3.02s">Optimus and Cybercab, readying them for service for the</span></span><span class="m"><span style="--d:3.14s"><em>first autonomous corporate residence + entertainment hub.</em></span></span></div>
<div class="caps m" style="margin-top:22px"><span style="--d:3.55s">Private, discreet and secure.</span></div>
</div>
</div></div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__ROOM__':('../tesla-v2/room-optimus.webp','image/webp'),'__CAB__':('../tesla-v2/cybercab.webp','image/webp')})

# Card 3: dining room wipes in, then label, headline, subtitle, paragraph, and the six uses one by one
CARD3=dict(id='card3', label='Card 3', dur=4.9, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:36px}}
$S .wrap>.im{{flex:1;min-height:0}} $S .wrap>.im img{{object-position:50% 40%}}
$S .lab{{font-size:18px;letter-spacing:.24em;font-weight:700;text-transform:uppercase;color:{INK2}}}
$S .h{{margin-top:12px;font-size:48px;line-height:1.04;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{margin-top:18px;font-size:28px;line-height:1.36;font-weight:500;color:{INK2}}}
$S .rule{{margin-top:28px;background:{RULE}}}
$S .p{{padding-top:22px;font-size:24px;line-height:1.45;font-weight:500}}
$S .uses{{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px 12px;font-size:16px;letter-spacing:.1em;font-weight:700;text-transform:uppercase;line-height:1.3}}
""", html="""<div class="wrap">
<div class="im" style="--d:.2s"><img src="__DINING__" alt="The dining room through the French doors"></div>
<div>
<div class="lab r" style="--d:1.2s">Proof of concept</div>
<div class="h"><span class="m"><span style="--d:1.45s">A new corporate asset</span></span><span class="m"><span style="--d:1.6s">for the autonomous age.</span></span></div>
<div class="sub"><span class="m"><span style="--d:1.95s">The first autonomous corporate residence</span></span><span class="m"><span style="--d:2.07s">+ entertainment hub.</span></span></div>
<div class="rule ln" style="--d:2.4s"></div>
<div class="p"><span class="m"><span style="--d:2.7s">When Tesla is ready, a leading Boise corporation</span></span><span class="m"><span style="--d:2.82s">joins as founding partner.</span></span><span class="m" style="margin-top:10px"><span style="--d:2.94s">Here, Optimus and Cybercab are readied for service,</span></span><span class="m"><span style="--d:3.06s">security and mobility:</span></span></div>
<div class="uses"><div class="r" style="--d:3.40s">Board hosting</div><div class="r" style="--d:3.52s">Executive off-sites</div><div class="r" style="--d:3.64s">Recruiting</div><div class="r" style="--d:3.76s">Relocation</div><div class="r" style="--d:3.88s">Employee incentives</div><div class="r" style="--d:4.00s">Corporate events</div></div>
</div></div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__DINING__':('../tesla-v2/dining.6.webp','image/webp')})

CARDS=[OPENING,CARD1,CARD2,CARD3]

# Shared card box. The card is printed stock, so its colours stay fixed in both themes.
CARD_BASE=f'''.card{{position:relative;width:941px;height:1672px;overflow:hidden;font-family:Montserrat,Arial,sans-serif;color:{INK};cursor:pointer}}
@media (prefers-reduced-motion:reduce){{.card *{{animation:none!important}}}}'''
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">'

def card_css(c,i):
    return c['css'].replace('$S',f'#c{i}')

def card_html(c,i):
    h=f'<div class="card" id="c{i}" title="Click to replay">{c["html"]}</div>'
    for k,(p,m) in c['assets'].items(): h=h.replace(k,b64(p,m))
    return h

def card_css_assets(c,i):
    s=card_css(c,i)
    for k,(p,m) in c['assets'].items(): s=s.replace(k,b64(p,m))
    return s
