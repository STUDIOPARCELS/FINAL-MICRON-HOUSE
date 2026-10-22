# Card 6 calendar, revised: python3 build-cal2.py (run from mockups/card6/unique)
import calendar
exec(open('build.py').read().split('# 1 ·')[0])   # shared HEAD, PASS, colours
mark=lambda s: f'<img src="mark.svg" style="width:{s}px;height:{s}px;display:block">'
def cal():
    cells=''
    for w in calendar.Calendar(firstweekday=6).monthdayscalendar(2026,12):
        for d in w:
            if d==0: cells+='<div></div>'
            elif d==15: cells+=f'<div style="display:flex;justify-content:center;align-items:center"><span style="width:70px;height:70px;border-radius:50%;background:{M};color:#f4f1eb;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700">15</span></div>'
            else: cells+=f'<div style="display:flex;justify-content:center;align-items:center;font-size:25px;font-weight:500;color:{C2}">{d}</div>'
    dow=''.join(f'<div class="lab c" style="letter-spacing:.18em">{x}</div>' for x in 'SMTWTFS')
    return f'''<div class="rule" style="padding-top:30px">
<div style="display:flex;justify-content:space-between;align-items:baseline"><div class="serif" style="font-size:46px;color:{P}">December</div><div class="lab">2026</div></div>
<div style="margin-top:26px;display:grid;grid-template-columns:repeat(7,1fr)">{dow}</div>
<div style="margin-top:12px;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:80px">{cells}</div></div>'''
html=f'''<div class="col">
<div><div class="h">Founding partner</div>
<div class="serif" style="margin-top:22px;font-size:76px;line-height:1.06">Reserved for <i>Micron</i><br><span style="font-size:52px">until December 15, 2026.</span></div></div>
{cal()}
<div class="p">{PASS}</div>
<div class="rule" style="padding-top:40px;display:grid;grid-template-columns:1fr auto;column-gap:30px;align-items:center">
<div><div class="serif" style="font-size:36px;line-height:1.25;color:{P}">Please contact me to schedule<br>a call or site visit.</div>
<div class="h" style="margin-top:26px;font-size:30px;letter-spacing:.08em">Lisa Wood</div>
<div class="sm" style="margin-top:10px;font-size:23px">208 720 2433 &nbsp;·&nbsp; lisa@lisawoodstudio.com</div>
<div class="lab" style="margin-top:22px">Presented by Lisa Wood Studio</div></div>
<div style="padding-right:6px;transform:translateY(-20px)">{mark(190)}</div></div></div>'''
open('card6-cal-FINAL.html','w').write(HEAD+html+END)
