# Card 6 (Micron) in the Card 5 system: python3 build.py (run from mockups/card6)
M='#2c0f38'; T='#353942'; B='#00782a'; P='#3f2448'; C2='#6a5571'; HR='#cfc8be'
HEAD=f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P}}}
.col{{position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between}}
.c{{text-align:center}}
.brand{{font-size:22px;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
.serif{{font-family:Newsreader,Georgia,serif;font-weight:400;color:{C2}}}
.serif i{{font-weight:500;color:{M}}}
.lab{{font-size:15px;line-height:1.6;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{C2}}}
.h{{font-size:32px;line-height:1.2;letter-spacing:.06em;font-weight:800;text-transform:uppercase}}
.p{{font-size:25px;line-height:1.55;font-weight:500;color:{C2}}}
.sm{{font-size:21px;line-height:1.55;font-weight:500;color:{C2}}}
.fine{{font-size:14px;line-height:1.6;font-weight:500;color:#8c8391}}
.rule{{border-top:1px solid {HR}}}
</style></head><body><div class="card"><div class="col">'''
END='</div></div></body></html>'
mark=lambda s,extra='': f'<img src="mark.svg" style="width:{s}px;height:{s}px;display:block;{extra}">'
HERO=lambda fs: f'<div class="serif" style="font-size:{fs}px;line-height:1.1">Reserved for <i>Micron</i>.</div>'
OFFER='Founding partnership and naming rights<br>on a multi-year lease.'
D1=('Reserved for Micron<br>through','December 15, 2026'); D2=('Founding partner<br>confirmed by','December 31, 2026')
CTA='Arrange a call and site visit<br>with Lisa Wood now.'
CONTACT='lisa@lisawoodstudio.com &nbsp;·&nbsp; 208 720 2433'
FINE='Independent proposal. Partners not yet confirmed.<br>Not affiliated with or endorsed by Tesla, Inc.'
def dates(align='center',fs=40):
    cell=lambda l,d: f'<div style="text-align:{align}"><div class="lab">{l}</div><div class="serif" style="margin-top:12px;font-size:{fs}px;color:{P};white-space:nowrap">{d}</div></div>'
    return f'<div class="rule" style="padding:34px 0 0;display:grid;grid-template-columns:1fr 1fr;column-gap:30px">{cell(*D1)}{cell(*D2)}</div>'
V={}
# A · centred, mirrors Card 5
V['A']=f'''<div class="c brand">Warm Springs House</div>
<div class="c">{HERO(84)}<div class="p" style="margin-top:28px;font-size:28px">{OFFER}</div></div>
{dates()}
<div class="rule c" style="padding-top:44px"><div class="h">{CTA}</div>
<div class="lab" style="margin-top:34px">Presented by Lisa Wood Studio</div><div class="sm" style="margin-top:10px;color:{P};font-size:23px">{CONTACT}</div></div>
<div class="c"><div style="display:flex;justify-content:center">{mark(110)}</div><div class="fine" style="margin-top:22px">{FINE}</div></div>'''
# B · left, label column like Card 5's alternate
row=lambda l,v,top=34: f'<div class="rule" style="padding-top:{top}px;display:grid;grid-template-columns:1fr 2fr;align-items:start"><div class="lab" style="padding-top:8px">{l}</div><div>{v}</div></div>'
V['B']=f'''<div style="display:flex;justify-content:space-between;align-items:center"><div class="brand">Warm Springs House</div>{mark(84)}</div>
<div>{HERO(92)}<div class="p" style="margin-top:28px;font-size:28px">{OFFER}</div></div>
<div style="display:flex;flex-direction:column;gap:40px">
{row('Reserved for<br>Micron through',f'<div class="serif" style="font-size:42px;color:{P}">{D1[1]}</div>')}
{row('Founding partner<br>confirmed by',f'<div class="serif" style="font-size:42px;color:{P}">{D2[1]}</div>')}
{row('Next step',f'<div class="h" style="font-size:28px">Arrange a call<br>and site visit<br>with Lisa Wood now.</div>')}
{row('Presented by',f'<div class="sm" style="color:{P};font-weight:600">Lisa Wood Studio</div><div class="sm">{CONTACT}</div>')}
</div>
<div class="fine">{FINE}</div>'''
# C · mark-led, dates as the hero numbers
big=lambda l,d,dd: f'<div class="c"><div class="lab">{l}</div><div class="serif" style="margin-top:10px;font-size:92px;line-height:1;color:{P}">{d}</div><div class="lab" style="margin-top:12px;letter-spacing:.24em">{dd}</div></div>'
V['C']=f'''<div class="c brand">Warm Springs House</div>
<div style="display:flex;justify-content:center">{mark(200)}</div>
<div class="c">{HERO(70)}<div class="p" style="margin-top:22px">{OFFER}</div></div>
<div class="rule" style="padding-top:36px;display:grid;grid-template-columns:1fr 1px 1fr;column-gap:30px">{big(D1[0],'Dec 15','2026')}<div style="background:{HR}"></div>{big(D2[0],'Dec 31','2026')}</div>
<div class="rule c" style="padding-top:40px"><div class="h" style="font-size:29px">{CTA}</div>
<div class="sm" style="margin-top:22px;color:{P}"><b style="font-weight:700">Lisa Wood Studio</b> &nbsp;·&nbsp; {CONTACT}</div>
<div class="fine" style="margin-top:22px">{FINE}</div></div>'''
# D · client text for Card 6 (FOUNDING PARTNER), in the C layout
V['D']=f'''<div style="display:flex;flex-direction:column;height:100%"><div class="c brand">Warm Springs House</div>
<div style="display:flex;justify-content:center;margin-top:107px">{mark(330)}</div>
<div class="c" style="margin-top:auto;margin-bottom:auto;padding-top:20px"><div class="h">Founding partner</div>
<div class="serif" style="margin-top:30px;font-size:58px;line-height:1.18">Offered first to <i>Micron</i><br><span style="white-space:nowrap">through <span style="color:{P}">December 15, 2026</span>.</span></div>
<div class="p" style="margin-top:30px;font-size:29px">Should Micron pass, first company committed<br>becomes founding partner.</div></div>
<div class="rule c" style="padding-top:44px"><div class="h" style="font-size:30px">To discuss, contact Lisa Wood.</div>
<div class="lab" style="margin-top:34px">Presented by Lisa Wood Studio</div>
<div class="sm" style="margin-top:10px;color:{P};font-size:23px">{CONTACT}</div>
<div class="fine" style="margin-top:30px">{FINE}</div></div></div>'''
for k,v in V.items(): open(f'card6-{k}.html','w').write(HEAD+v+END)
