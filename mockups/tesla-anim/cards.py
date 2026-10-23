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
<div class="line"><span>An invitation to Tesla</span></div>''',
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
$S .sub{{margin-top:24px;font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
$S .rule{{margin-top:34px;height:1px;background:{RULE};transform-origin:left}}
$S .grid{{padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}
$S .n{{font-size:34px;font-weight:800;line-height:1}} $S .n span{{font-size:16px;font-weight:700}}
$S .l{{margin-top:6px;font-size:13px;letter-spacing:.14em;color:{INK2};font-weight:600;text-transform:uppercase}}
$S .m{{display:block;overflow:hidden}} $S .m>span{{display:block;transform:translateY(105%)}}
$S .r{{opacity:0;transform:translateY(14px)}}
$S.play .house{{animation:settle 2.2s cubic-bezier(.2,.7,.2,1) both}}
$S.play .wm{{animation:fadeup 1.2s cubic-bezier(.2,.7,.2,1) .9s both}}
$S.play .m>span{{animation:rise .9s cubic-bezier(.2,.75,.15,1) var(--d) both}}
$S.play .r{{animation:fadeup .8s cubic-bezier(.2,.7,.2,1) var(--d) both}}
$S.play .rule{{animation:draw 1s cubic-bezier(.6,0,.2,1) 3.25s both}}
$S.done .m>span,$S.done .r{{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){{$S .m>span,$S .r{{transform:none;opacity:1}}}}
''', html='''<div class="house"></div>
<img class="wm" src="__WORD__" alt="WARM SPRINGS HOUSE">
<div class="txt">
<div class="h"><span class="m"><span style="--d:1.95s">A residential test bed</span></span><span class="m"><span style="--d:2.1s">for Optimus + Cybercab.</span></span></div>
<div class="sub"><span class="m"><span style="--d:2.45s">A modest 1906 three-bedroom home on a historic tree-lined avenue,</span></span><span class="m"><span style="--d:2.57s">heated by Boise&#8217;s geothermal springs.</span></span></div>
<div class="caps m"><span style="--d:2.95s">Available now. Ready to host.</span></div>
<div class="rule"></div>
<div class="grid">'''+dt+'''</div>
</div>''',
assets={'__HOUSE__':('../tesla-v2/card1/house.webp','image/webp'),'__WORD__':('../tesla-v2/card1/wordmark-gray.png','image/png')})

CARDS=[OPENING,CARD1]

# Shared card box. The card is printed stock, so its colours stay fixed in both themes.
CARD_BASE=f'''.card{{position:relative;width:941px;height:1672px;overflow:hidden;font-family:Montserrat,Arial,sans-serif;color:{INK};cursor:pointer}}
@media (prefers-reduced-motion:reduce){{.card *{{animation:none!important}}}}'''
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">'

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
