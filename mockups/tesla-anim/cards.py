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
@keyframes type{from{opacity:0;transform:translateY(.3em);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes kin{from{opacity:0;transform:var(--k)}to{opacity:1;transform:none}}
'''

# Reveal system shared by all cards: .m masked line rise, .r fade-rise, .ln rule draw, .im photo wipe. Each takes --d (delay).
UTIL='''
.card .m{display:block;clip-path:inset(0 -.5em)} .card .m>span{display:block;white-space:nowrap;transform:translateY(105%)}
.card [data-lines]{text-wrap:pretty} .card [data-lines]:not([data-done]){visibility:hidden}
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
OPENING=dict(id='opening', label='Opening', dur=4.7, hold=.9, css='''
$S{background:#f3f1ec;perspective:2600px}
$S .box{position:absolute;inset:0;opacity:0}
$S .under{position:absolute;inset:0;background:#f4f4f3 url(__PAPER__) center/cover no-repeat}
$S .p{position:absolute;top:0;height:100%;width:470.5px;background:url(__SEALED__) no-repeat;background-size:calc(941px * var(--k,1)) calc(1672px * var(--k,1));backface-visibility:hidden}
$S .p::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(40,36,30,0),rgba(40,36,30,.28));opacity:0}
$S .lp{left:0;background-position:calc((941px - 941px * var(--k,1)) / 2) 50%;transform-origin:left center}
$S .rp{left:470.5px;background-position:calc((941px - 941px * var(--k,1)) / 2 - 470.5px) 50%;transform-origin:right center}
$S .rp::after{background:linear-gradient(270deg,rgba(40,36,30,0),rgba(40,36,30,.28))}
$S .line{position:absolute;left:0;right:0;top:48.44%;text-align:center;font-size:34px;letter-spacing:.14em;font-weight:800;text-transform:uppercase}
$S .line i{display:inline-block;font-style:normal;opacity:0}
$S.play .box{animation:in 1s ease-out both}
$S.play .lp{animation:openL 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}
$S.play .rp{animation:openR 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}
$S.play .p::after{animation:shade 1.6s cubic-bezier(.55,0,.25,1) 1.5s both}
$S.play .line i{animation:type .7s cubic-bezier(.2,.7,.2,1) calc(3s + var(--i) * 55ms) both}
$S.done .box{opacity:1} $S.done .p{display:none} $S.done .line i{opacity:1}
@media (prefers-reduced-motion:reduce){$S .box{opacity:1} $S .p{display:none} $S .line i{opacity:1}}
''', html='''<div class="box"><div class="under"></div>
<div class="line" aria-label="Prepared for Tesla"><i style="--i:0">P</i><i style="--i:1">r</i><i style="--i:2">e</i><i style="--i:3">p</i><i style="--i:4">a</i><i style="--i:5">r</i><i style="--i:6">e</i><i style="--i:7">d</i> <i style="--i:9">f</i><i style="--i:10">o</i><i style="--i:11">r</i> <i style="--i:13">T</i><i style="--i:14">e</i><i style="--i:15">s</i><i style="--i:16">l</i><i style="--i:17">a</i></div>
<div class="p lp"></div><div class="p rp"></div></div>''',
assets={'__SEALED__':('open-1-sealed.webp','image/webp'),'__PAPER__':('paper-gray.webp','image/webp')})

# Card 1: house settles, wordmark, then the text line by line, rule draws, drive times one by one
drive=[('3','Downtown'),('3','Capitol'),('2','St. Luke&#8217;s'),('15','Airport')]
dt=''.join(f'<div class="r" style="--d:{3.55+i*.14:.2f}s"><div class="n">{n}<span> min</span></div><div class="l">{l}</div></div>' for i,(n,l) in enumerate(drive))
CARD1=dict(id='card1', label='Card 1', dur=4.9, css=f'''
$S{{background:#fbfbfa}}
$S .house{{position:absolute;left:0;right:0;bottom:32px;height:1672px;transform-origin:50% 100%;scale:var(--k,1);--h:url(__HOUSE__);background:var(--h) 0 -175px/941px 1672px no-repeat,var(--h) 0 -80px/941px 1672px no-repeat,var(--h) 0 0/941px 1672px no-repeat}}
$S .wm{{position:absolute;top:64px;left:723px;width:168px}}
$S .txt{{position:absolute;left:60px;right:60px;bottom:90px}}
$S .h{{font-size:54px;line-height:1.06;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{margin-top:26px;font-size:31px;line-height:1.38;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:22px;font-size:27px;letter-spacing:.1em;font-weight:800;text-transform:uppercase}}
$S .rule{{margin-top:30px;background:{RULE}}}
$S .grid{{padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}
$S .n{{font-size:48px;font-weight:800;line-height:1}} $S .n span{{font-size:22px;font-weight:700}}
$S .l{{margin-top:8px;font-size:19px;letter-spacing:.1em;color:{INK2};font-weight:600;text-transform:uppercase}}
$S.play .house{{animation:settle 2.2s cubic-bezier(.2,.7,.2,1) both}}
$S.play .wm{{animation:fadeup 1.2s cubic-bezier(.2,.7,.2,1) .9s both}}
''', html='''<div class="house"></div>
<img class="wm" src="__WORD__" alt="WARM SPRINGS HOUSE">
<div class="txt">
<div class="h"><span class="m"><span style="--d:1.95s">A residential test bed</span></span><span class="m"><span style="--d:2.1s">for Optimus + Cybercab.</span></span></div>
<div class="sub" data-lines="2.45:.12">A modest 1906 three-bedroom home on a historic tree-lined avenue, heated by Boise&#8217;s geothermal springs.</div>
<div class="caps m"><span style="--d:2.95s">Available now. Ready to host.</span></div>
<div class="rule ln" style="--d:3.25s"></div>
<div class="grid">'''+dt+'''</div>
</div>''',
assets={'__HOUSE__':('../tesla-v2/card1/house.webp','image/webp'),'__WORD__':('../tesla-v2/card1/wordmark-gray.png','image/png')})

# Card 2: Optimus room and Cybercab wipe in, then the text line by line (type sizes match Card 1)
CARD2=dict(id="card2", label="Card 2", dur=4.5, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/cover no-repeat}}
$S .hero{{position:absolute;left:0;top:0;width:941px;height:706px;box-shadow:none}}
/* Below the full-bleed photo: one spacing unit between photo, headline block, rule and second block; a deeper bottom margin, the first part any phone trims */
$S .wrap{{position:absolute;left:60px;right:60px;top:706px;bottom:140px;display:flex;flex-direction:column}}
$S .g1,$S .wrap>.rule,$S .g2{{margin-top:auto}}
$S .h{{font-size:54px;line-height:1.06;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{font-size:31px;line-height:1.38;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:22px;font-size:27px;letter-spacing:.1em;font-weight:800;text-transform:uppercase}}
$S .rule{{background:{RULE}}}
$S em{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:35px;font-weight:400;color:{INK}}}
$S .sub.a{{margin-top:32px}}
""", html="""<div class="im hero" style="--d:.2s"><img src="__ROOM__" alt="Optimus in the living room"></div>
<div class="wrap">
<div class="g1">
<div class="h"><span class="m"><span style="--d:1.45s">Tesla engineers</span></span><span class="m"><span style="--d:1.6s">in residence</span></span></div>
<div class="sub a" data-lines="1.95:.12">One or more Tesla engineers live and work alongside Optimus and Cybercab, readying them for service, security and mobility for the <em>first autonomous corporate residence + entertainment hub.</em></div>
<div class="caps m"><span style="--d:2.65s">At no cost to Tesla.</span></div>
</div>
<div class="rule ln" style="--d:2.9s"></div>
<div class="g2">
<div class="sub b" data-lines="3.15:.12">Real-world testing in a historic home, minutes from downtown.</div>
<div class="caps m"><span style="--d:3.6s">Private, quiet and discreet.</span></div>
</div>
</div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__ROOM__':('../tesla-v2/room-optimus.webp','image/webp')})

# Card 3: dining room wipes in, green label, headline, hub name, founding partner, caps line, then the six uses one by one
CARD3=dict(id='card3', label='Card 3', dur=4.7, hold=13.4, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/cover no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:90px;bottom:90px;display:flex;flex-direction:column;gap:38px}}
$S .ph{{flex:1;min-height:0;container-type:size;display:flex;justify-content:center}} $S .ph>.im{{flex:none;height:min(1095px,100cqh);aspect-ratio:3/4}}
$S .lab{{display:flex;align-items:center;gap:12px;margin-bottom:24px;font-size:20px;letter-spacing:.2em;font-weight:800;text-transform:uppercase;color:{GREEN}}}
$S .lab::before{{content:"";width:11px;height:11px;border-radius:50%;background:{GREEN}}}
$S .h{{font-size:50px;line-height:1.06;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .sub{{font-size:31px;line-height:1.38;font-weight:500;color:{INK2}}}
$S .caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
$S .rule{{margin-top:40px;background:{RULE}}}
$S em{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:35px;font-weight:400;color:{INK}}}
$S .hub{{margin-top:16px;line-height:1.3}} $S .sub.a{{margin-top:24px}}
$S .uses{{padding-top:26px;color:{PLUM};display:grid;grid-template-columns:repeat(2,1fr);gap:18px 24px;font-size:23px;letter-spacing:.1em;font-weight:700;text-transform:uppercase;line-height:1.3}}
""", html="""<div class="wrap">
<div class="ph"><div class="im" style="--d:.2s"><img src="__DINING__" alt="The dining room through the French doors"></div></div>
<div>
<div class="lab r" style="--d:1.2s">Proof of concept</div>
<div class="h" data-lines="1.4:.13">The autonomous<br>corporate residence +<br>entertainment hub.</div>
<div class="hub" data-lines="2.0:.12"><em style="color:#2c0f38">A new corporate asset for the Autonomous Age.</em></div>
<div class="sub a" data-lines="2.3:.12">At Tesla&#8217;s option, a leading Boise corporation joins as founding partner to scope, test and launch it with Optimus, Cybercab and Starlink.</div>
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
CARD4=dict(id='card4', label='Card 4', dur=6.4, hold=4.6, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/cover no-repeat}}
$S .wrap{{position:absolute;left:76px;right:76px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}}
$S .facts{{margin:72px 0 88px}}
$S .half{{display:flex;flex-direction:column}}
$S .top{{text-align:center;font-size:26px;letter-spacing:.22em;font-weight:800;text-transform:uppercase}}
$S .mk{{display:block;width:240px;height:240px;margin:40px auto 0;overflow:visible}}
$S .mk .k{{transform-box:fill-box;transform-origin:center;opacity:0}}
$S.play .mk .k{{animation:kin 1.1s cubic-bezier(.2,.7,.2,1) var(--d) both}}
$S.done .mk .k{{opacity:1}}
$S .hero{{margin-top:34px;text-align:center;font-family:Newsreader,Georgia,serif;font-size:42px;line-height:1.3;font-weight:400;color:{INK2}}}
$S .hero b{{font-style:italic;font-weight:500}}
$S .h{{font-size:32px;line-height:1.15;letter-spacing:.08em;font-weight:800;text-transform:uppercase}}
$S .st{{margin-top:14px;font-family:Newsreader,Georgia,serif;font-size:35px;line-height:1.3;color:{INK}}} $S .st em{{font-style:italic}}
$S .it{{margin:30px 0 8px;font-size:26px;line-height:1.4;font-weight:600;color:{INK2}}}
$S .rule{{background:{RULE}}}
$S .cells{{display:grid;grid-template-columns:136px 1fr;align-items:baseline;padding:22px 0}}
$S .vb{{font-size:22px;letter-spacing:.14em;font-weight:800;text-transform:uppercase;color:{INK}}}
$S .t{{font-size:28px;line-height:1.36;font-weight:500;color:{INK2}}}
$S .facts{{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}}
$S .facts>div{{border-radius:10px;padding:18px 6px 16px;text-align:center;color:#fff;box-shadow:0 2px 6px rgba(30,30,32,.08)}}
$S .facts b{{display:block;font-size:40px;line-height:1;font-weight:800;letter-spacing:-.01em}}
$S .facts span{{display:block;margin-top:8px;font-size:17px;line-height:1.25;letter-spacing:.08em;font-weight:700;text-transform:uppercase;opacity:.9}}
@media (prefers-reduced-motion:reduce){{$S .mk .k{{opacity:1}}}}
""", html="""<div class="wrap">
<div class="half"><div class="top r" style="--d:.2s">Warm Springs House</div>"""+MARK.replace('style="--d:1.9s','style="--d:1.75s')+"""
<div class="hero" data-lines="2.2:.14">Without <b style="color:#353942">vision</b>, there&#8217;s no <b style="color:#353942">velocity</b>.<br>Without <b style="color:#2c0f38">memory</b>, there&#8217;s no <b style="color:#2c0f38">meaning</b>.<br>Without <b style="color:#00782a">place</b>, there&#8217;s no <b style="color:#00782a">perspective</b>.</div></div>
<div class="facts"><div class="r" style="--d:2.75s;background:#2c0f38"><b>1906</b><span>Year built</span></div><div class="r" style="--d:2.85s;background:#353942"><b>3,374</b><span>Square feet</span></div><div class="r" style="--d:2.95s;background:#00782a"><b>3/4</b><span>Bed / bath</span></div><div class="r" style="--d:3.05s;background:#7db0d3"><b>1892</b><span>Geothermal rights</span></div></div>
<div class="half">
<div class="h"><span class="m"><span style="--d:3.25s">A collaborative blueprint</span></span></div>
<div class="st" data-lines="3.45:.12">A central, historic home to experience Optimus and Cybercab for the first time and shape together how this technology enters daily life.</div>
<div class="it" data-lines="4.1:.1">When Tesla is ready, together with the founding partner:</div>
<div class="row"><div class="rule ln" style="--d:4.35s"></div><div class="cells"><div class="vb r" style="--d:4.45s">Host</div><div class="t" data-lines="4.50:.1">Boise&#8217;s civic and business leaders.</div></div></div><div class="row"><div class="rule ln" style="--d:4.60s"></div><div class="cells"><div class="vb r" style="--d:4.70s">Show</div><div class="t" data-lines="4.75:.1">them autonomous technology firsthand.</div></div></div><div class="row"><div class="rule ln" style="--d:4.85s"></div><div class="cells"><div class="vb r" style="--d:4.95s">Shape</div><div class="t" data-lines="5.00:.1">how autonomous technology enters daily life.</div></div></div><div class="row"><div class="rule ln" style="--d:5.10s"></div><div class="cells"><div class="vb r" style="--d:5.20s">Create</div><div class="t" data-lines="5.25:.1">a playbook other cities can adopt.</div></div></div><div class="rule ln" style="--d:5.35s"></div>
</div></div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp')})

# Card 5: house with its caption, then name and facts, then the quote beside the portrait; both photos uncropped, even spacing
CARD5=dict(id="card5", label="Card 5", dur=5.1, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/cover no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:90px;bottom:90px;display:flex;flex-direction:column;container-type:size}}
$S .wrap>div:nth-child(2){{margin-top:52px}} $S .wrap>.rule,$S .wrap>.row{{margin-top:auto}}
$S .hs{{height:min(586px,calc(100cqh - 894px));aspect-ratio:1240/885;margin:0 auto}}
$S .b{{margin-top:22px;font-size:24px;line-height:1.45;letter-spacing:.09em;font-weight:800;text-transform:uppercase}}
$S .h{{font-size:56px;line-height:1.06;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
$S .f{{margin-top:20px;font-size:30px;line-height:1.4;font-weight:500;color:{INK2}}}
$S .rule{{background:{RULE}}}
$S .row{{display:flex;gap:40px;align-items:center}}
$S .s{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:34px;line-height:1.3;color:{INK}}}
$S .s+.s{{margin-top:18px}}
$S .inw{{width:370px;height:370px;flex:none}} $S .inw img{{position:absolute;inset:0}}
""", html="""<div class="wrap">
<div><div class="im hs" style="--d:.2s"><img src="__HOUSE__" alt="Warm Springs House in autumn"></div>
<div class="b" data-lines="1.05:.12">A 1906 family home, opening its doors to the future &#8212; ready to welcome Optimus and Cybercab.</div></div>
<div><div class="h"><span class="m"><span style="--d:1.5s">Warm Springs House</span></span><span class="m"><span style="--d:1.62s">+ Lisa Wood Studio</span></span></div>
<div class="f" data-lines="1.9:.1">Idaho since 1992.<br>A career in high tech since 1995.<br>Owner of Warm Springs House since 2000.</div></div>
<div class="rule ln" style="--d:2.35s"></div>
<div class="row"><div style="flex:1;min-width:0"><div class="s" data-lines="2.75:.12">&#8220;I&#8217;m in the demographic most wary of robots and self-driving cars, yet I can&#8217;t wait for them.</div><div class="s" data-lines="3.4:.12">I&#8217;ve seen how fragile care can be for the people I love. I want a robot in the loop.&#8221;</div></div>
<div class="im inw" style="--d:2.5s"><img src="__LISA__" alt="Lisa Wood"></div></div>
</div>""",
assets={'__PAPER__':('paper-gray.webp','image/webp'),'__HOUSE__':('house-photo.webp','image/webp'),'__LISA__':('lisa-bw.webp','image/webp')})

# Card 6: the Cybercab photo wipes in, the call to action rises, then the contact block and the logo assemble
CARD6=dict(id="card6", label="Card 6", dur=4.6, css=f"""
$S{{background:#f4f4f3 url(__PAPER__) center/cover no-repeat}}
$S .wrap{{position:absolute;left:60px;right:60px;top:90px;bottom:90px;display:flex;flex-direction:column;justify-content:space-between}}
$S .wrap>.im{{flex:none;width:821px;height:462px}}
$S .cta{{font-size:128px;line-height:.98;letter-spacing:-.015em;font-weight:800;text-transform:uppercase}}
$S .sub{{margin-top:36px;font-size:34px;line-height:1.42;font-weight:500;color:{INK2}}}
$S .rule{{background:{RULE}}}
$S .adr{{margin-bottom:26px;font-size:22px;line-height:1.45;font-weight:500;color:{INK2}}}
$S .fx{{padding:9px 0;font-size:20px;line-height:1.3;letter-spacing:.14em;font-weight:800;text-transform:uppercase}}
$S .fx i{{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:14px;vertical-align:2px}}
$S .ct{{display:grid;grid-template-columns:1fr auto;align-items:center;column-gap:40px}}
$S .nm{{font-size:46px;line-height:1.1;letter-spacing:.07em;font-weight:800;text-transform:uppercase}}
$S .dt{{margin-top:16px;font-size:33px;line-height:1.5;font-weight:500}}
$S .dt a{{color:inherit;text-decoration:underline;text-decoration-color:{RULE};text-decoration-thickness:1px;text-underline-offset:5px}}
$S .pb{{margin-top:24px;font-size:19px;letter-spacing:.24em;font-weight:700;text-transform:uppercase;color:{INK2}}}
$S .mk{{display:block;width:260px;height:260px;overflow:visible}}
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

# Paragraphs marked data-lines="start:step" are broken into lines on the viewer's own device, so a line never overflows
# whatever the browser's font metrics; each line then reveals in turn, starting at `start` seconds, `step` apart.
SPLIT_JS='''function splitLines(root){root.querySelectorAll('[data-lines]').forEach(el=>{
if(el.dataset.done)return;const [d0,st]=el.dataset.lines.split(':').map(Number);const toks=[];
const walk=(node,wrap)=>node.childNodes.forEach(n=>{if(n.nodeType===3){n.textContent.split(/(\\s+)/).forEach(p=>{if(!p)return;if(/^\\s+$/.test(p))toks.push({sp:1});else p.split(/(?<=-)/).forEach(w=>toks.push({w,wrap}))})}
else if(n.nodeName==='BR')toks.push({br:1});else walk(n,(wrap||[]).concat([n]))});
walk(el,null);el.textContent='';const items=[];let space=true;
toks.forEach(t=>{if(t.sp){el.appendChild(document.createTextNode(' '));space=true;return}
if(t.br){el.appendChild(document.createElement('br'));items.push(null);space=true;return}
let node=document.createTextNode(t.w);(t.wrap||[]).slice().reverse().forEach(w=>{const c=w.cloneNode(false);c.appendChild(node);node=c});
const sp=document.createElement('span');sp.appendChild(node);el.appendChild(sp);items.push({sp,glue:!space});space=false});
const lines=[];let cur=null,top=null;
items.forEach(it=>{if(!it){cur=null;return}const t=it.sp.offsetTop;if(cur===null||Math.abs(t-top)>3){cur=[];lines.push(cur);top=t}cur.push(it)});
el.textContent='';lines.forEach((ws,i)=>{const m=document.createElement('span');m.className='m';const inner=document.createElement('span');
inner.style.setProperty('--d',(d0+i*st).toFixed(2)+'s');ws.forEach((w,j)=>{if(j&&!w.glue)inner.appendChild(document.createTextNode(' '));while(w.sp.firstChild)inner.appendChild(w.sp.firstChild)});
m.appendChild(inner);el.appendChild(m)});el.dataset.done='1'})}'''


# Shared card box. The card is printed stock, so its colours stay fixed in both themes.
CARD_BASE=f'''html{{-webkit-text-size-adjust:100%;text-size-adjust:100%}}
.card{{position:relative;width:941px;height:var(--ch,1672px);overflow:hidden;font-family:Montserrat,Arial,sans-serif;color:{INK};cursor:pointer}}
@media (prefers-reduced-motion:reduce){{.card *{{animation:none!important}}}}'''
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">'

def card_css(c,i):
    return c['css'].replace('$S',f'#c{i}')

def card_html(c,i):
    h=f'<div class="card" id="c{i}">{c["html"]}</div>'
    for k,(p,m) in c['assets'].items(): h=h.replace(k,b64(p,m))
    return h

def card_css_assets(c,i):
    s=card_css(c,i)
    for k,(p,m) in c['assets'].items(): s=s.replace(k,b64(p,m))
    return s
