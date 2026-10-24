# Tesla animated cards: one source for the standalone files and the viewer page.
# Each card's CSS uses $S for its own scope (#c0, #c1, ...); keyframes are shared in KEYFRAMES.
import base64
b64=lambda p,m: f"data:{m};base64,"+base64.b64encode(open(p,'rb').read()).decode()
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'; GREEN='#00782a'; PLUM='#3f2448'

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
@keyframes kin{from{opacity:0;transform:var(--k)}to{opacity:1;transform:none}}
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
OPENING=dict(id='opening', label='Opening', dur=4.0, hold=.9, css='''
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
$S.play .line span{animation:rise .8s cubic-bezier(.2,.75,.15,1) 3.05s both}
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

# Card 2: Optimus room and Cybercab wipe in, then the text line by line (type sizes match Card 1)
CARD2=dict(id="card2", label="Card 2", dur=4.5, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:38px}}
$S .pics{{flex:1;min-height:0;display:flex;flex-direction:column;gap:17px}}
$S .pics .im:first-child{{flex:1;min-height:0}} $S .pics .im:first-child img{{object-position:100% 50%}}
$S .pics .im:last-child{{height:400px;flex:none}}
$S .h{{font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
$S .rule{{margin-top:34px;background:{RULE}}}
$S em{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:25px;font-weight:400;color:{INK}}}
$S .sub.a{{margin-top:32px}} $S .sub.b{{padding-top:22px}}
""", html="""<div class="wrap">
<div class="pics"><div class="im" style="--d:.2s"><img src="__ROOM__" alt="Optimus in the living room"></div><div class="im" style="--d:.65s"><img src="__CAB__" alt="Cybercab at the house"></div></div>
<div>
<div class="h"><span class="m"><span style="--d:1.45s">Tesla engineers</span></span><span class="m"><span style="--d:1.6s">in residence</span></span></div>
<div class="sub a"><span class="m"><span style="--d:1.95s">One or more Tesla engineers live and work alongside Optimus and</span></span><span class="m"><span style="--d:2.07s">Cybercab, readying them for service, security and mobility for the</span></span><span class="m"><span style="--d:2.19s"><em>first autonomous corporate residence + entertainment hub.</em></span></span></div>
<div class="caps m"><span style="--d:2.55s">At no cost to Tesla.</span></div>
<div class="rule ln" style="--d:2.85s"></div>
<div class="sub b"><span class="m"><span style="--d:3.15s">Real-world testing in a historic home, minutes from downtown.</span></span></div>
<div class="caps m" style="margin-top:22px"><span style="--d:3.6s">Private, quiet and discreet.</span></div>
</div></div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__ROOM__':('../tesla-v2/room-optimus.webp','image/webp'),'__CAB__':('../tesla-v2/cybercab.webp','image/webp')})

# Card 3: dining room wipes in, green label, headline, hub name, founding partner, caps line, then the six uses one by one
CARD3=dict(id='card3', label='Card 3', dur=4.7, hold=13.4, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:38px}}
$S .wrap>.im{{flex:1;min-height:0}} $S .wrap>.im img{{object-position:50% 40%}}
$S .lab{{display:flex;align-items:center;gap:12px;margin-bottom:26px;font-size:15px;letter-spacing:.24em;font-weight:800;text-transform:uppercase;color:{GREEN}}}
$S .lab::before{{content:"";width:9px;height:9px;border-radius:50%;background:{GREEN}}}
$S .h{{font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
$S .rule{{margin-top:40px;background:{RULE}}}
$S em{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:25px;font-weight:400;color:{INK}}}
$S .hub{{margin-top:18px;line-height:1.3}} $S .sub.a{{margin-top:28px}}
$S .uses{{padding-top:26px;color:{PLUM};display:grid;grid-template-columns:repeat(3,auto);justify-content:space-between;gap:20px 0;font-size:17px;letter-spacing:.12em;font-weight:700;text-transform:uppercase;line-height:1.3}}
""", html="""<div class="wrap">
<div class="im" style="--d:.2s"><img src="__DINING__" alt="The dining room through the French doors"></div>
<div>
<div class="lab r" style="--d:1.2s">Proof of concept</div>
<div class="h"><span class="m"><span style="--d:1.4s">The first autonomous corporate</span></span><span class="m"><span style="--d:1.55s">residence + entertainment hub.</span></span></div>
<div class="hub"><span class="m"><span style="--d:2.0s"><em>A new corporate asset for the Autonomous Age.</em></span></span></div>
<div class="sub a"><span class="m"><span style="--d:2.3s">When Tesla is ready, a leading Boise corporation joins as founding partner</span></span><span class="m"><span style="--d:2.42s">to prove the concept, enabled by Starlink, Optimus and Cybercab.</span></span></div>
<div class="rule ln" style="--d:2.9s"></div>
<div class="uses"><div class="r" style="--d:3.20s">Entertaining</div><div class="r" style="--d:3.32s">Executive off-sites</div><div class="r" style="--d:3.44s">Recruiting</div><div class="r" style="--d:3.56s">Relocation</div><div class="r" style="--d:3.68s">Employee incentives</div><div class="r" style="--d:3.80s">Private dinners</div></div>
</div></div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__DINING__':('../tesla-v2/dining.6.webp','image/webp')})

# Card 4: the logo assembles (earth and sky, then intelligence and vision, then the star), then the blueprint text line by line
MARK='''<svg class="mk" viewBox="71 71 882 882" role="img" aria-label="Warm Springs House logo">
<g class="k" style="--d:.5s;--k:translateY(-14%)"><circle cx="512" cy="306" r="234" fill="#7db0d3" opacity=".95"/></g>
<g class="k" style="--d:.65s;--k:translateY(14%)"><circle cx="512" cy="718" r="234" fill="#00782a" opacity=".95"/></g>
<g class="k" style="--d:1.2s;--k:translateX(-14%)"><circle cx="307" cy="512" r="235" fill="#2c0f38" opacity=".94"/></g>
<g class="k" style="--d:1.35s;--k:translateX(14%)"><circle cx="717" cy="512" r="235" fill="#353942" opacity=".93"/></g>
<g class="k" style="--d:1.9s;--k:scale(.2) rotate(-45deg)"><path fill="#fff" d="M512 195 A325 325 0 0 0 808 512 A325 325 0 0 0 512 828 A325 325 0 0 0 215 512 A325 325 0 0 0 512 195 Z"/></g>
</svg>'''
CARD4=dict(id='card4', label='Card 4', dur=6.2, hold=4.8, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between}}
$S .half{{display:flex;flex-direction:column}}
$S .top{{text-align:center;font-size:22px;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
$S .mk{{display:block;width:290px;height:290px;margin:64px auto 0;overflow:visible}}
$S .mk .k{{transform-box:fill-box;transform-origin:center;opacity:0}}
$S.play .mk .k{{animation:kin 1.1s cubic-bezier(.2,.7,.2,1) var(--d) both}}
$S.done .mk .k{{opacity:1}}
$S .hero{{margin-top:48px;text-align:center;font-family:Newsreader,Georgia,serif;font-size:37px;line-height:1.36;font-weight:400;color:{INK2}}}
$S .hero b{{font-style:italic;font-weight:500}}
$S .h{{font-size:26px;line-height:1.15;letter-spacing:.1em;font-weight:800;text-transform:uppercase}}
$S .st{{margin-top:18px;font-family:Newsreader,Georgia,serif;font-size:27px;line-height:1.36;color:{INK}}} $S .st em{{font-style:italic}}
$S .it{{margin:52px 0 18px;font-size:21px;line-height:1.45;font-weight:600;color:{INK2}}}
$S .rule{{background:{RULE}}}
$S .cells{{display:grid;grid-template-columns:150px 1fr;align-items:baseline;padding:24px 0}}
$S .vb{{font-size:17px;letter-spacing:.18em;font-weight:800;text-transform:uppercase;color:{INK}}}
$S .t{{font-size:22px;line-height:1.4;font-weight:500;color:{INK2}}}
$S .facts{{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}}
$S .facts>div{{border-radius:10px;padding:18px 6px 16px;text-align:center;color:#fff;box-shadow:0 2px 6px rgba(30,30,32,.08)}}
$S .facts b{{display:block;font-size:30px;line-height:1;font-weight:800;letter-spacing:-.01em}}
$S .facts span{{display:block;margin-top:9px;font-size:12px;letter-spacing:.1em;font-weight:700;text-transform:uppercase;opacity:.88;white-space:nowrap}}
@media (prefers-reduced-motion:reduce){{$S .mk .k{{opacity:1}}}}
""", html="""<div class="wrap">
<div class="half"><div class="top r" style="--d:.2s">Warm Springs House</div>"""+MARK.replace('style="--d:1.9s','style="--d:1.75s')+"""
<div class="hero"><span class="m"><span style="--d:2.2s">Without <b style="color:#353942">vision</b>, there&#8217;s no <b style="color:#353942">velocity</b>.</span></span><span class="m"><span style="--d:2.34s">Without <b style="color:#2c0f38">memory</b>, there&#8217;s no <b style="color:#2c0f38">meaning</b>.</span></span><span class="m"><span style="--d:2.48s">Without <b style="color:#00782a">place</b>, there&#8217;s no <b style="color:#00782a">perspective</b>.</span></span></div></div>
<div class="facts"><div class="r" style="--d:2.75s;background:#2c0f38"><b>1906</b><span>Year built</span></div><div class="r" style="--d:2.85s;background:#353942"><b>3,374</b><span>Square feet</span></div><div class="r" style="--d:2.95s;background:#00782a"><b>3/4</b><span>Bed / bath</span></div><div class="r" style="--d:3.05s;background:#7db0d3"><b>1892</b><span>Geothermal rights</span></div></div>
<div class="half">
<div class="h"><span class="m"><span style="--d:3.25s">A collaborative blueprint</span></span></div>
<div class="st"><span class="m"><span style="--d:3.45s">A central, historic home to experience Optimus and Cybercab for the</span></span><span class="m"><span style="--d:3.57s">first time and shape together how this technology enters daily life.</span></span></div>
<div class="it"><span class="m"><span style="--d:4.10s">When Tesla is ready, together with the founding partner:</span></span></div>
<div class="row"><div class="rule ln" style="--d:4.35s"></div><div class="cells"><div class="vb r" style="--d:4.45s">Host</div><div class="t"><span class="m"><span style="--d:4.50s">Boise&#8217;s civic and business leaders.</span></span></div></div></div><div class="row"><div class="rule ln" style="--d:4.60s"></div><div class="cells"><div class="vb r" style="--d:4.70s">Show</div><div class="t"><span class="m"><span style="--d:4.75s">them autonomous technology firsthand.</span></span></div></div></div><div class="row"><div class="rule ln" style="--d:4.85s"></div><div class="cells"><div class="vb r" style="--d:4.95s">Shape</div><div class="t"><span class="m"><span style="--d:5.00s">how autonomous technology enters daily life.</span></span></div></div></div><div class="row"><div class="rule ln" style="--d:5.10s"></div><div class="cells"><div class="vb r" style="--d:5.20s">Create</div><div class="t"><span class="m"><span style="--d:5.25s">a playbook other cities can adopt.</span></span></div></div></div><div class="rule ln" style="--d:5.35s"></div>
</div></div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp')})

# Card 5: house with its caption, then name and facts, then the quote beside the portrait; both photos uncropped, even spacing
CARD5=dict(id="card5", label="Card 5", dur=4.3, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:60px;bottom:60px;display:flex;flex-direction:column;justify-content:space-between}}
$S .hs{{width:821px;height:586px}}
$S .b{{margin-top:24px;font-size:19px;line-height:1.5;letter-spacing:.11em;font-weight:800;text-transform:uppercase}}
$S .h{{font-size:46px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .f{{margin-top:22px;font-size:23px;line-height:1.45;font-weight:500;color:{INK2}}}
$S .rule{{background:{RULE}}}
$S .row{{display:flex;gap:48px;align-items:center}}
$S .s{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:28px;line-height:1.36;color:{INK}}}
$S .qp{{display:block;height:20px}}
$S .inw{{width:440px;height:440px;flex:none}} $S .inw img{{position:absolute;inset:0}}
""", html="""<div class="wrap">
<div><div class="im hs" style="--d:.2s"><img src="__HOUSE__" alt="Warm Springs House in autumn"></div>
<div class="b"><span class="m"><span style="--d:1.05s">A 1906 family home, opening its doors to the future &#8212;</span></span><span class="m"><span style="--d:1.17s">ready to welcome Optimus and Cybercab.</span></span></div></div>
<div><div class="h"><span class="m"><span style="--d:1.5s">Warm Springs House</span></span><span class="m"><span style="--d:1.62s">+ Lisa Wood Studio</span></span></div>
<div class="f"><span class="m"><span style="--d:1.9s">Idaho since 1992.</span></span><span class="m"><span style="--d:2.0s">A career in high tech since 1995.</span></span><span class="m"><span style="--d:2.1s">Owner of Warm Springs House since 2000.</span></span></div></div>
<div class="rule ln" style="--d:2.35s"></div>
<div class="row"><div style="flex:1"><div class="s"><span class="m"><span style="--d:2.75s">&#8220;I&#8217;m in the demographic most</span></span><span class="m"><span style="--d:2.87s">wary of robots and self-driving</span></span><span class="m"><span style="--d:2.99s">cars, yet I can&#8217;t wait for them.</span></span><span class="qp"></span><span class="m"><span style="--d:3.2s">I&#8217;ve seen how fragile care can</span></span><span class="m"><span style="--d:3.32s">be for the people I love.</span></span><span class="m"><span style="--d:3.44s">I want a robot in the loop.&#8221;</span></span></div></div>
<div class="im inw" style="--d:2.5s"><img src="__LISA__" alt="Lisa Wood"></div></div>
</div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__HOUSE__':('house-photo.webp','image/webp'),'__LISA__':('lisa-bw.webp','image/webp')})

# Card 6: the Cybercab photo wipes in, the call to action rises, then the contact block and the logo assemble
CARD6=dict(id="card6", label="Card 6", dur=4.6, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/941px 1672px no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:60px;bottom:60px;display:flex;flex-direction:column;justify-content:space-between}}
$S .wrap>.im{{flex:none;width:821px;height:462px}}
$S .cta{{font-size:128px;line-height:.98;letter-spacing:-.015em;font-weight:800;text-transform:uppercase}}
$S .sub{{margin-top:40px;font-size:28px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .rule{{background:{RULE}}}
$S .adr{{margin-bottom:26px;font-size:22px;line-height:1.45;font-weight:500;color:{INK2}}}
$S .fx{{padding:9px 0;font-size:20px;line-height:1.3;letter-spacing:.14em;font-weight:800;text-transform:uppercase}}
$S .fx i{{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:14px;vertical-align:2px}}
$S .ct{{display:grid;grid-template-columns:1fr auto;align-items:center;column-gap:40px}}
$S .nm{{font-size:38px;line-height:1.1;letter-spacing:.08em;font-weight:800;text-transform:uppercase}}
$S .dt{{margin-top:18px;font-size:26px;line-height:1.55;font-weight:500}}
$S .dt a{{color:inherit;text-decoration:underline;text-decoration-color:{RULE};text-decoration-thickness:1px;text-underline-offset:5px}}
$S .pb{{margin-top:26px;font-size:15px;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{INK2}}}
$S .mk{{display:block;width:300px;height:300px;overflow:visible}}
$S .mk .k{{transform-box:fill-box;transform-origin:center;opacity:0}}
$S.play .mk .k{{animation:kin 1.1s cubic-bezier(.2,.7,.2,1) var(--d) both}}
$S.done .mk .k{{opacity:1}}
@media (prefers-reduced-motion:reduce){{$S .mk .k{{opacity:1}}}}
""", html="""<div class="wrap">
<div class="im" style="--d:.2s"><img src="__CAB__" alt="Cybercab outside Warm Springs House at dusk"></div>
<div>
<div class="cta"><span class="m"><span style="--d:1.3s">See it</span></span><span class="m"><span style="--d:1.48s">in person.</span></span></div>
<div class="sub"><span class="m"><span style="--d:1.85s">1020 E Warm Springs Ave &#183; Boise, Idaho</span></span></div>
</div>
<div class="rule ln" style="--d:2.85s"></div>
<div class="ct"><div>
<div class="nm"><span class="m"><span style="--d:2.55s">Lisa Wood</span></span></div>
<div class="dt"><span class="m"><span style="--d:2.75s">208 720 2433</span></span><span class="m"><span style="--d:2.85s"><a href="mailto:lisa@lisawoodstudio.com">lisa@lisawoodstudio.com</a></span></span><span class="m"><span style="--d:2.95s"><a href="https://warmspringshouse.com/" target="_blank" rel="noopener">warmspringshouse.com</a></span></span></div>
<div class="pb"><span class="m"><span style="--d:3.1s">Presented by Lisa Wood Studio</span></span></div></div>
"""+MARK.replace('--d:.5s','--d:2.6s').replace('--d:.65s','--d:2.75s').replace('--d:1.2s','--d:3.0s').replace('--d:1.35s','--d:3.15s').replace('--d:1.9s','--d:3.45s')+"""</div>
</div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__CAB__':('../tesla-v2/cybercab.webp','image/webp')})

CARDS=[OPENING,CARD1,CARD2,CARD3,CARD4,CARD5,CARD6]

# Shared card box. The card is printed stock, so its colours stay fixed in both themes.
CARD_BASE=f'''html{{-webkit-text-size-adjust:100%;text-size-adjust:100%}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;font-family:Montserrat,Arial,sans-serif;color:{INK};cursor:pointer}}
@media (prefers-reduced-motion:reduce){{.card *{{animation:none!important}}}}'''
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">'

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
