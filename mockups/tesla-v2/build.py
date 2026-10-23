# Tesla set v2, built on the Micron card system: python3 build.py (run from mockups/tesla-v2)
import calendar
P='#3f2448'; C2='#6a5571'; M='#2c0f38'; HR='#cfc8be'
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">'
def page(body, bg='paper.webp', extra=''):
    return f'''<!doctype html><html><head><meta charset="utf-8">{FONTS}
<style>@page{{size:941px 1672px;margin:0}}html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url({bg}) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P}}}
.caps{{text-transform:uppercase}} .c{{text-align:center}}
.lab{{font-size:18px;letter-spacing:.24em;text-transform:uppercase;color:{C2};font-weight:700}}
.h{{text-transform:uppercase;letter-spacing:-.01em;font-weight:800;line-height:1.04}}
.p{{font-size:28px;line-height:1.4;font-weight:500;color:{C2}}}
.serif{{font-family:Newsreader,Georgia,serif;font-weight:400}}
.serif i{{font-weight:500;color:{M}}}
.rule{{border-top:1px solid {HR}}}
.ph{{display:block;width:100%;object-fit:cover;box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)}}
a.lk{{color:inherit;text-decoration:underline;text-decoration-color:rgba(63,36,72,.35);text-decoration-thickness:1px;text-underline-offset:5px}}
{extra}</style></head><body><div class="card">{body}</div></body></html>'''
mark=lambda s: f'<img src="mark.svg" style="width:{s}px;height:{s}px;display:block">'

# 1 · TESLA IN BOISE (house reveal; same art and wordmark as Card 2 of the Micron set)
drive=[('3','Downtown'),('3','Capitol'),('2','St. Luke&#8217;s'),('15','Airport')]
dt=''.join(f'<div><div style="font-size:34px;font-weight:800;line-height:1">{n}<span style="font-size:16px;font-weight:700"> min</span></div><div class="caps" style="margin-top:6px;font-size:13px;letter-spacing:.14em;color:{C2};font-weight:600">{l}</div></div>' for n,l in drive)
C1=f'''<img src="wordmark-plum.png" alt="WARM SPRINGS HOUSE" style="position:absolute;top:165px;right:40px;width:250px">
<div data-m="txt" style="position:absolute;left:60px;right:60px;bottom:42px">
<div><div class="lab" style="font-size:15px">Tesla in Boise</div>
<div class="h" style="margin-top:10px;font-size:38px">A residential test kitchen<br>for Optimus + Cybercab.</div>
<div style="margin-top:14px;font-size:21px;line-height:1.4;font-weight:500;color:{C2}">A modest 1906 three-bedroom home on a historic tree-lined avenue,<br>grounded in geothermal energy.</div>
<div class="caps" style="margin-top:10px;font-size:21px;letter-spacing:.12em;font-weight:800">Available now. Ready to host.</div></div>
<div class="rule" style="margin-top:24px;padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">{dt}</div></div>'''

# 2 · TESLA ENGINEERS IN RESIDENCE (Card 3 photo layout)
C2_=f'''<div style="position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:38px">
<div style="flex:1;min-height:0;display:flex;flex-direction:column;gap:17px"><img class="ph" src="room-optimus.webp" style="flex:1;min-height:0;object-position:100% 50%"><img class="ph" src="cybercab.webp" style="height:430px"></div>
<div data-m="txt"><div class="h" style="font-size:50px">Tesla engineers<br>in residence</div>
<div class="p" style="margin-top:18px">One or more Tesla engineers live and work<br>alongside Optimus and Cybercab, readying them<br>for service in the first autonomous corporate<br>residence + entertainment hub.</div>
<div class="rule" style="margin-top:20px;padding-top:16px;font-size:25px;font-weight:700;letter-spacing:.02em">Private, discreet and centrally located.</div></div></div>'''

# 3 · PROOF OF CONCEPT (Card 4 dining layout)
C3=f'''<div style="position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:36px">
<img class="ph" src="dining.6.webp" style="flex:1;min-height:0;object-position:50% 40%">
<div data-m="txt"><div class="lab">Proof of concept</div>
<div class="h" style="margin-top:12px;font-size:48px">The autonomous<br>corporate residence<br>+ entertainment hub</div>
<div class="p" style="margin-top:18px;font-size:26px">A collaboration between Tesla and a leading Boise corporation, to be named by December 31, 2026.</div>
<div class="p" style="margin-top:12px;font-size:26px;color:{P}">Optimus and Cybercab deliver the service, security and mobility for board hosting, executive off-sites, recruiting, relocation, employee incentives and corporate events.</div></div></div>'''

# 4 · A COLLABORATIVE ROLLOUT (Card 5 logo layout)
C4=f'''<div style="position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between;text-align:center">
<div class="caps" style="font-size:22px;letter-spacing:.24em;font-weight:800">Warm Springs House</div>
<div style="display:flex;justify-content:center">{mark(380)}</div>
<div><div class="h" style="font-size:44px;letter-spacing:.04em">A collaborative rollout</div>
<div class="serif" style="margin-top:30px;font-size:43px;line-height:1.3;color:{C2}">Host Boise&#8217;s government, health care, education and business leaders alongside the founding partner, and show them autonomous technology firsthand.</div>
<div class="serif" style="margin-top:26px;font-size:43px;line-height:1.3;color:{P}">Together, shape <i>first contact</i> and create a playbook other cities can adopt.</div></div>
<div class="rule" style="padding-top:34px"><div class="lab" style="font-size:15px;letter-spacing:.3em">Groundwork</div>
<div style="margin-top:12px;font-size:22px;line-height:1.55;font-weight:500;color:{C2}">Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.</div></div></div>'''

# 5 · WARM SPRINGS HOUSE + LISA WOOD
C5=f'''<div style="position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between">
<div class="caps" style="font-size:22px;letter-spacing:.2em;font-weight:800">Warm Springs House<br>+ Lisa Wood</div>
<div><div class="serif" style="font-size:72px;line-height:1.14;color:{P}">I&#8217;ve stewarded<br>1020 Warm Springs<br>as a second home<br>for 25 years.</div>
<div class="serif" style="margin-top:64px;font-size:72px;line-height:1.14;color:{C2}">I&#8217;m in the demographic most wary of this technology. Yet as a <i>mother</i>, a <i>daughter</i> and a <i>sister</i>, I can&#8217;t wait for it.</div></div>
<div class="rule" style="padding-top:34px;display:flex;justify-content:space-between;align-items:center">
<div class="caps" style="font-size:30px;letter-spacing:.08em;font-weight:800">Lisa Wood</div>{mark(96)}</div></div>'''

# 6 · THE TIME IS NOW (Micron calendar layout; 31 circled)
cells=''
for w in calendar.Calendar(firstweekday=6).monthdayscalendar(2026,12):
    for d in w:
        if d==0: cells+='<div></div>'
        elif d==31: cells+=f'<div style="display:flex;justify-content:center;align-items:center"><span style="width:70px;height:70px;border-radius:50%;background:{M};color:#f4f1eb;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700">31</span></div>'
        else: cells+=f'<div style="display:flex;justify-content:center;align-items:center;font-size:25px;font-weight:500;color:{C2}">{d}</div>'
dow=''.join(f'<div class="c" style="font-size:15px;letter-spacing:.18em;font-weight:700;color:{C2}">{x}</div>' for x in 'SMTWTFS')
C6=f'''<div style="position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between">
<div><div class="h" style="font-size:30px;letter-spacing:.06em">The time is now</div>
<div class="serif" style="margin-top:22px;font-size:68px;line-height:1.08;color:{C2}">Schedule a call or site visit with <i>Lisa Wood</i>.</div></div>
<div class="rule" style="padding-top:30px">
<div style="display:flex;justify-content:space-between;align-items:baseline"><div class="serif" style="font-size:46px;color:{P}">December</div><div class="lab" style="font-size:15px;letter-spacing:.3em">2026</div></div>
<div style="margin-top:26px;display:grid;grid-template-columns:repeat(7,1fr)">{dow}</div>
<div style="margin-top:12px;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:80px">{cells}</div></div>
<div style="font-size:28px;line-height:1.4;font-weight:500;color:{C2}"><b style="color:{P};font-weight:700">By December 31:</b> Tesla engineers and Optimus in residence, and the founding partner named.</div>
<div class="rule" style="padding-top:40px;display:grid;grid-template-columns:1fr auto;column-gap:30px;align-items:center">
<div><div class="h" style="font-size:30px;letter-spacing:.08em">Lisa Wood</div>
<div style="margin-top:10px;font-size:23px;line-height:1.55;font-weight:500">208 720 2433 &nbsp;·&nbsp; <a class="lk" href="mailto:lisa@lisawoodstudio.com">lisa@lisawoodstudio.com</a></div>
<div style="margin-top:4px;font-size:23px;line-height:1.55;font-weight:500"><a class="lk" href="https://warmspringshouse.com/">warmspringshouse.com</a></div>
<div class="lab" style="margin-top:22px;font-size:15px;letter-spacing:.3em">Presented by Lisa Wood Studio</div></div>
<div style="padding-right:6px">{mark(190)}</div></div></div>'''

for n,(body,bg) in enumerate([(C1,'house.webp'),(C2_,'paper.webp'),(C3,'paper.webp'),(C4,'paper.webp'),(C5,'paper.webp'),(C6,'paper.webp')],start=2):
    open(f'tesla-card{n}.html','w').write(page(body,bg))
