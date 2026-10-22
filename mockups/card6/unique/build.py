# Card 6, three distinct layouts (no repeat of Card 5): python3 build.py (run from mockups/card6/unique)
import calendar
M='#2c0f38'; P='#3f2448'; C2='#6a5571'; G='#00782a'; HR='#cfc8be'; LT='#a49aa7'
HEAD=f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P}}}
.col{{position:absolute;left:76px;right:76px;top:120px;bottom:108px;display:flex;flex-direction:column;justify-content:space-between}}
.c{{text-align:center}}
.serif{{font-family:Newsreader,Georgia,serif;font-weight:400;color:{C2}}}
.serif i{{font-weight:500;color:{M}}}
.lab{{font-size:15px;line-height:1.6;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{C2}}}
.h{{font-size:30px;line-height:1.2;letter-spacing:.06em;font-weight:800;text-transform:uppercase}}
.p{{font-size:27px;line-height:1.5;font-weight:500;color:{C2}}}
.sm{{font-size:22px;line-height:1.55;font-weight:500;color:{P}}}
.fine{{font-size:14px;line-height:1.6;font-weight:500;color:#8c8391}}
.rule{{border-top:1px solid {HR}}}
</style></head><body><div class="card">'''
END='</div></body></html>'
CLOSE=lambda align='center': f'''<div class="rule" style="padding-top:40px;text-align:{align}">
<div class="h">To discuss, contact Lisa Wood.</div>
<div class="lab" style="margin-top:30px">Presented by Lisa Wood Studio</div>
<div class="sm" style="margin-top:8px">lisa@lisawoodstudio.com &nbsp;·&nbsp; 208 720 2433</div>
<div class="fine" style="margin-top:26px">Independent proposal. Partners not yet confirmed.<br>Not affiliated with or endorsed by Tesla, Inc.</div></div>'''
PASS='Should Micron pass, first company committed<br>becomes founding partner.'

# 1 · December 2026 calendar, the fifteenth marked
weeks=calendar.Calendar(firstweekday=6).monthdayscalendar(2026,12)
cells=''
for w in weeks:
    for d in w:
        if d==0: cells+='<div></div>'
        elif d==15: cells+=f'<div style="display:flex;justify-content:center;align-items:center"><span style="width:64px;height:64px;border-radius:50%;background:{M};color:#f4f1eb;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700">15</span></div>'
        else: cells+=f'<div style="display:flex;justify-content:center;align-items:center;font-size:25px;font-weight:{600 if d<15 else 400};color:{P if d<15 else LT}">{d}</div>'
dow=''.join(f'<div class="lab c" style="letter-spacing:.18em">{x}</div>' for x in 'SMTWTFS')
CAL=f'''<div class="rule" style="padding-top:30px">
<div style="display:flex;justify-content:space-between;align-items:baseline"><div class="serif" style="font-size:46px;color:{P}">December</div><div class="lab">2026</div></div>
<div style="margin-top:26px;display:grid;grid-template-columns:repeat(7,1fr);row-gap:0">{dow}</div>
<div style="margin-top:12px;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:78px">{cells}</div></div>'''
V1=f'''<div class="col">
<div><div class="h">Founding partner</div>
<div class="serif" style="margin-top:22px;font-size:72px;line-height:1.08">Offered first to <i>Micron</i><br><span style="font-size:52px">through December 15, 2026.</span></div></div>
{CAL}
<div class="p">{PASS}</div>
{CLOSE('left')}</div>'''

# 2 · reply card, framed, signed with the wax seal from Card 1
V2=f'''<div style="position:absolute;inset:40px;border:1px solid rgba(63,36,72,.32)"></div>
<div style="position:absolute;inset:50px;border:1px solid rgba(63,36,72,.18)"></div>
<div class="col c" style="top:136px;bottom:120px;left:110px;right:110px">
<div class="lab" style="letter-spacing:.36em">Founding partner</div>
<div><div class="serif" style="font-size:46px">Offered first to</div>
<div class="serif" style="font-size:150px;line-height:1;margin-top:6px"><i>Micron</i></div>
<div class="serif" style="font-size:44px;margin-top:18px;color:{P}">through December 15, 2026.</div></div>
<div><div style="width:90px;margin:0 auto;border-top:1px solid {HR}"></div><div class="p" style="margin-top:34px">{PASS}</div></div>
<div style="display:flex;justify-content:center"><img src="seal.png" style="width:150px;display:block;filter:drop-shadow(0 3px 5px rgba(30,20,10,.22))"></div>
<div><div class="h" style="font-size:28px">To discuss, contact Lisa Wood.</div>
<div class="lab" style="margin-top:28px">Presented by Lisa Wood Studio</div>
<div class="sm" style="margin-top:8px">lisa@lisawoodstudio.com &nbsp;·&nbsp; 208 720 2433</div>
<div class="fine" style="margin-top:24px">Independent proposal. Partners not yet confirmed.<br>Not affiliated with or endorsed by Tesla, Inc.</div></div>
</div>'''

# 3 · two-step sequence on a vertical line
node=lambda fill,col: f'<span style="position:absolute;left:-49px;top:8px;width:20px;height:20px;border-radius:50%;{fill};box-sizing:border-box"></span>'
V3=f'''<div class="col">
<div style="display:flex;justify-content:space-between;align-items:center"><div class="h">Founding partner</div><img src="seal.png" style="width:92px;display:block;filter:drop-shadow(0 2px 4px rgba(30,20,10,.2))"></div>
<div style="position:relative;margin-left:44px;padding-left:4px">
<div style="position:absolute;left:-40px;top:18px;bottom:96px;border-left:1.5px solid {HR}"></div>
<div style="position:relative">{node(f'background:{M}',M)}
<div class="lab">Through December 15, 2026</div>
<div class="serif" style="margin-top:14px;font-size:80px;line-height:1.04">Offered first<br>to <i>Micron</i>.</div></div>
<div style="position:relative;margin-top:96px">{node(f'border:2px solid {G};background:#f4f1eb',G)}
<div class="lab" style="color:{G}">Should Micron pass</div>
<div class="serif" style="margin-top:14px;font-size:54px;line-height:1.12;color:{P}">First company committed<br>becomes founding partner.</div></div>
</div>
{CLOSE('left')}</div>'''
for k,v in [('1',V1),('2',V2),('3',V3)]: open(f'card6-U{k}.html','w').write(HEAD+v+END)
