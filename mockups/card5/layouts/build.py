# Card 5: five layouts on the plain stock. python3 build.py (run from mockups/card5/layouts)
M='#2c0f38'; T='#353942'; B='#008f25'; P='#3f2448'; C2='#6a5571'; HR='#cfc8be'
HEAD=f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P}}}
.col{{position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between}}
.brand{{font-size:20px;letter-spacing:.22em;font-weight:800;text-transform:uppercase;color:{P}}}
.lab{{font-size:15px;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{C2}}}
.st{{font-size:36px;line-height:1.55;font-weight:500;color:{C2}}}
.st b{{font-weight:700}}
.pt{{font-size:22px;letter-spacing:.18em;font-weight:800;text-transform:uppercase}}
.dot{{display:inline-block;width:6px;height:6px;border-radius:50%;background:#bdb5ad;margin:0 20px;vertical-align:middle;transform:translateY(-2px)}}
.h{{font-size:33px;line-height:1.12;letter-spacing:.05em;font-weight:800;text-transform:uppercase;color:{P}}}
.body{{font-size:26px;line-height:1.5;font-weight:500;color:{C2}}}
.body b{{font-weight:700;color:{P}}}
.bp{{font-size:17px;letter-spacing:.2em;font-weight:800;text-transform:uppercase;color:{P}}}
.gw{{font-size:21px;line-height:1.5;font-weight:500;color:{P}}}
.rule{{border-top:1px solid {HR}}}
.c{{text-align:center}}
</style></head><body><div class="card">'''
END='</div></body></html>'
MARK=lambda s: f'<img src="mark.svg" style="width:{s}px;height:{s}px;display:block">'
def stmts(two=False):
    br='<br>' if two else ' '
    rows=[(M,'memory','meaning'),(T,'vision','velocity'),(B,'place','perspective')]
    return [f'Without <b style="color:{c}">{a}</b>,{br}there&#8217;s no <b style="color:{c}">{b}</b>.' for c,a,b in rows]
PARTNERS=f'<span style="color:{M}">Micron</span><span class="dot"></span><span style="color:{T}">Tesla</span><span class="dot"></span><span style="color:{B}">Boise</span>'
OPP='<b>Micron&#8217;s opportunity:</b> shape how autonomy reaches Boise, with Tesla and university, hospital and Capitol leaders.'
GW='Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.'

# 1 · Centred hero, left-aligned information grid
L1=f'''<div class="col">
<div class="c"><div class="brand">Warm Springs House</div><div style="display:flex;justify-content:center;margin-top:70px">{MARK(380)}</div></div>
<div class="c"><div class="st">{'<br>'.join(stmts())}</div><div class="pt" style="margin-top:34px">{PARTNERS}</div></div>
<div class="rule" style="padding-top:40px">
<div class="h">A collaborative rollout</div>
<div style="margin-top:26px;display:grid;grid-template-columns:230px 1fr;align-items:baseline"><div class="lab" style="line-height:1.6">Micron&#8217;s<br>opportunity</div>
<div><div class="body">Shape how autonomy reaches Boise,<br>with Tesla and university, hospital<br>and Capitol leaders.</div><div class="bp" style="margin-top:16px">A blueprint for other cities.</div></div></div>
<div class="rule" style="margin-top:30px;padding-top:24px;display:grid;grid-template-columns:230px 1fr;align-items:baseline"><div class="lab">Groundwork</div><div class="gw">{GW}</div></div></div></div>'''

# 2 · Editorial, everything left
L2=f'''<div class="col">
<div style="display:flex;justify-content:space-between;align-items:flex-start"><div class="brand" style="margin-top:8px;font-size:24px;line-height:1.35">Warm Springs<br>House</div>{MARK(380)}</div>
<div><div class="st" style="font-size:39px;line-height:1.72">{'<br>'.join(stmts())}</div><div class="pt" style="margin-top:34px">{PARTNERS}</div></div>
<div class="rule" style="padding-top:38px">
<div class="h">A collaborative rollout</div>
<div class="body" style="margin-top:16px">{OPP}</div>
<div class="bp" style="margin-top:20px">A blueprint for other cities.</div>
<div style="margin-top:30px;display:grid;grid-template-columns:200px 1fr;align-items:baseline"><div class="lab">Groundwork</div><div class="gw">{GW}</div></div>
</div></div>'''

# 3 · Type-led poster, mark as the signature
L3=f'''<div class="col">
<div class="brand">Warm Springs House</div>
<div><div class="st" style="font-size:56px;line-height:1.2;letter-spacing:-.01em">{'<div style="height:40px"></div>'.join(stmts(True))}</div><div class="pt" style="margin-top:56px">{PARTNERS}</div></div>
<div class="rule" style="padding-top:38px;display:grid;grid-template-columns:1fr 210px;column-gap:40px;align-items:end">
<div><div class="h">A collaborative<br>rollout</div><div class="body" style="margin-top:16px">{OPP}</div><div class="bp" style="margin-top:20px">A blueprint for other cities.</div>
<div style="margin-top:26px"><span class="lab">Groundwork</span><div class="gw" style="margin-top:8px">{GW}</div></div></div>
<div style="padding-bottom:6px">{MARK(210)}</div></div>
</div>'''

# 4 · Index: partner beside its line
rows=''.join(f'''<div style="display:grid;grid-template-columns:190px 1fr;align-items:baseline;padding:36px 0;border-top:1px solid {HR}"><div class="pt" style="color:{c}">{n}</div><div class="st" style="font-size:38px;line-height:1.32">{s}</div></div>'''
    for (n,c),s in zip([('Micron',M),('Tesla',T),('Boise',B)],stmts(True)))
L4=f'''<div class="col">
<div style="display:flex;align-items:center;gap:34px">{MARK(210)}<div class="brand" style="font-size:26px;line-height:1.35">Warm Springs<br>House</div></div>
<div>{rows}</div>
<div class="rule" style="padding-top:38px">
<div style="display:grid;grid-template-columns:190px 1fr;align-items:baseline"><div></div><div><div class="h">A collaborative rollout</div><div class="body" style="margin-top:16px">{OPP}</div><div class="bp" style="margin-top:20px">A blueprint for other cities.</div></div></div>
<div style="margin-top:30px;display:grid;grid-template-columns:190px 1fr;align-items:baseline"><div class="lab">Groundwork</div><div class="gw">{GW}</div></div>
</div></div>'''

# 5 · Centred mark, three partner columns, two-column footer
cols=''.join(f'''<div style="{'text-align:left' if i==0 else 'text-align:center' if i==1 else 'text-align:right'}"><div class="pt" style="color:{c}">{n}</div><div style="margin-top:10px;font-size:22px;font-weight:600;color:{C2}">{k}</div></div>'''
    for i,(n,c,k) in enumerate([('Micron',M,'Memory · Meaning'),('Tesla',T,'Vision · Velocity'),('Boise',B,'Place · Perspective')]))
L5=f'''<div class="col">
<div class="c"><div class="brand">Warm Springs House</div></div>
<div style="display:flex;justify-content:center">{MARK(340)}</div>
<div class="c st" style="font-size:36px">{'<br>'.join(stmts())}</div>
<div class="rule" style="padding-top:26px;display:grid;grid-template-columns:1fr 1fr 1fr">{cols}</div>
<div class="rule" style="padding-top:38px">
<div style="display:flex;justify-content:space-between;align-items:flex-start"><div class="h">A collaborative<br>rollout</div><div class="bp" style="text-align:right;line-height:1.55;margin-top:6px">A blueprint<br>for other cities.</div></div>
<div class="body" style="margin-top:18px">{OPP}</div>
<div style="margin-top:28px;display:grid;grid-template-columns:200px 1fr;align-items:baseline"><div class="lab">Groundwork</div><div class="gw">{GW}</div></div></div></div>'''
for i,L in enumerate([L1,L2,L3,L4,L5],1): open(f'card5-L{i}.html','w').write(HEAD+L+END)
