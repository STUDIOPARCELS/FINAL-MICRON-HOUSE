# Card 6 calendar riffs with colour and the regular logo: python3 build-cal.py (run from mockups/card6/unique)
import calendar
exec(open('build.py').read().split('# 1 ·')[0])   # shared HEAD, CLOSE, PASS, colours
SKY='rgba(125,176,211,.34)'; LAV='rgba(124,92,140,.20)'; GRN='rgba(0,120,42,.13)'
mark=lambda s: f'<img src="mark.svg" style="width:{s}px;height:{s}px;display:block">'
def cal(tint, accent=M):
    weeks=calendar.Calendar(firstweekday=6).monthdayscalendar(2026,12)
    cells=''
    for w in weeks:
        for col,d in enumerate(w):
            if d==0: cells+='<div></div>'; continue
            band=''
            if d<=15:
                start=(d==1 or col==0); end=(col==6 or d==15)
                left='8px' if start else '0'; right='50%' if d==15 else ('8px' if end else '0')
                rad=f"border-radius:{'30px' if start else '0'} {'30px' if end and d!=15 else '0'} {'30px' if end and d!=15 else '0'} {'30px' if start else '0'}"
                band=f'<span style="position:absolute;left:{left};right:{right};top:50%;height:60px;transform:translateY(-50%);background:{tint};{rad}"></span>'
            if d==15:
                num=f'<span style="position:relative;width:64px;height:64px;border-radius:50%;background:{accent};color:#f4f1eb;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700">15</span>'
            else:
                num=f'<span style="position:relative;font-size:25px;font-weight:{600 if d<15 else 400};color:{P if d<15 else LT}">{d}</span>'
            cells+=f'<div style="position:relative;display:flex;justify-content:center;align-items:center">{band}{num}</div>'
    dow=''.join(f'<div class="lab c" style="letter-spacing:.18em">{x}</div>' for x in 'SMTWTFS')
    return f'''<div class="rule" style="padding-top:30px">
<div style="display:flex;justify-content:space-between;align-items:baseline"><div class="serif" style="font-size:46px;color:{M}">December</div><div class="lab">2026</div></div>
<div style="margin-top:26px;display:grid;grid-template-columns:repeat(7,1fr)">{dow}</div>
<div style="margin-top:12px;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:78px">{cells}</div></div>'''
HEADLINE=f'''<div class="h">Founding partner</div>
<div class="serif" style="margin-top:22px;font-size:72px;line-height:1.08">Offered first to <i>Micron</i><br><span style="font-size:52px">through December 15, 2026.</span></div>'''
V={
 # A · logo above the headline, sky-blue reservation window
 'A': f'<div class="col"><div>{mark(130)}<div style="height:44px"></div>{HEADLINE}</div>{cal(SKY)}<div class="p">{PASS}</div>{CLOSE("left")}</div>',
 # B · logo signs the close, soft green window
 'B': f'''<div class="col"><div>{HEADLINE}</div>{cal(GRN)}<div class="p">{PASS}</div>
<div class="rule" style="padding-top:40px;display:grid;grid-template-columns:1fr auto;column-gap:30px;align-items:end">
<div><div class="h" style="font-size:27px;white-space:nowrap">To discuss, contact Lisa Wood.</div>
<div class="lab" style="margin-top:30px">Presented by Lisa Wood Studio</div>
<div class="sm" style="margin-top:8px">lisa@lisawoodstudio.com &nbsp;·&nbsp; 208 720 2433</div>
<div class="fine" style="margin-top:26px">Independent proposal. Partners not yet confirmed.<br>Not affiliated with or endorsed by Tesla, Inc.</div></div>
<div style="padding-bottom:4px">{mark(140)}</div></div></div>''',
 # C · WARM SPRINGS HOUSE lockup on top, plum window
 'C': f'''<div class="col"><div style="display:flex;align-items:center;gap:24px">{mark(96)}<div class="brand" style="font-size:22px;letter-spacing:.24em;font-weight:800;text-transform:uppercase">Warm Springs House</div></div>
<div>{HEADLINE}</div>{cal(LAV)}<div class="p">{PASS}</div>{CLOSE("left")}</div>''',
}
for k,v in V.items(): open(f'card6-cal-{k}.html','w').write(HEAD+v+END)
