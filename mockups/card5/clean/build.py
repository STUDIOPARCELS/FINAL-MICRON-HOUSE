# Card 5, cleaned from layout 5: python3 build.py (run from mockups/card5/clean)
M='#2c0f38'; T='#353942'; B='#00782a'; P='#3f2448'; C2='#6a5571'; HR='#cfc8be'
HEAD=f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P}}}
.col{{position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column;justify-content:space-between}}
.c{{text-align:center}}
.brand{{font-size:22px;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
.st{{font-size:36px;line-height:1.6;font-weight:500;color:{C2}}}
.st b{{font-weight:700}}
.pt{{font-size:22px;letter-spacing:.2em;font-weight:800;text-transform:uppercase}}
.lab{{font-size:15px;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{C2}}}
.h{{font-size:32px;line-height:1.15;letter-spacing:.06em;font-weight:800;text-transform:uppercase}}
.p{{font-size:25px;line-height:1.55;font-weight:500;color:{C2}}}
.p b{{font-weight:700;color:{P}}}
.sm{{font-size:21px;line-height:1.55;font-weight:500;color:{C2}}}
.rule{{border-top:1px solid {HR}}}
</style></head><body><div class="card"><div class="col">'''
END='</div></div></body></html>'
LINES=[(T,'vision','velocity'),(M,'memory','meaning'),(B,'place','perspective')]   # website order
lines='<br>'.join(f'Without <b style="color:{c}">{a}</b>, there&#8217;s no <b style="color:{c}">{b}</b>.' for c,a,b in LINES)
TOP=f'''<div class="c brand">Warm Springs House</div>
<div style="display:flex;justify-content:center"><img src="mark.svg" style="width:330px;height:330px;display:block"></div>
<div class="c st">{lines}</div>
<div class="rule" style="padding:30px 46px 0;display:grid;grid-template-columns:1fr 1fr 1fr">
<div class="pt" style="color:{M}">Micron</div><div class="pt c" style="color:{T}">Tesla</div><div class="pt" style="color:{B};text-align:right">Boise</div></div>'''
OPP='<b>Micron&#8217;s opportunity:</b> host Boise&#8217;s first encounter<br>with autonomy, with Tesla and university,<br>hospital and Capitol leaders.'
GW='Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.'
BOTTOM={
 # A · one left edge, two type sizes, blueprint as a sentence, groundwork on the partner grid
 'A': f'''<div class="rule" style="padding-top:44px">
<div class="h">A collaborative rollout</div>
<div class="p" style="margin-top:18px">{OPP}</div>
<div class="p" style="margin-top:10px;color:{P};font-weight:600">A blueprint for other cities.</div>
<div style="margin-top:40px;display:grid;grid-template-columns:1fr 2fr;align-items:baseline"><div class="lab">Groundwork</div><div class="sm">{GW}</div></div></div>''',
 # B · centred, mirroring the top
 'B': f'''<div class="rule c" style="padding-top:44px">
<div class="h">A collaborative rollout</div>
<div class="p" style="margin-top:18px">{OPP}</div>
<div class="p" style="margin-top:10px;color:{P};font-weight:600">A blueprint for other cities.</div>
<div class="lab" style="margin-top:40px">Groundwork</div>
<div class="sm" style="margin-top:10px">{GW}</div></div>''',
 # C · label column on the partner grid (one third), text in the remaining two thirds
 'C': f'''<div class="rule" style="padding-top:44px">
<div class="h">A collaborative rollout</div>
<div style="margin-top:30px;display:grid;grid-template-columns:1fr 2fr;row-gap:30px;align-items:baseline">
<div class="lab">Micron&#8217;s<br>opportunity</div><div class="p" style="font-size:24px">Host Boise&#8217;s first encounter with autonomy, with Tesla and university, hospital and Capitol leaders.<div style="margin-top:12px;color:{P};font-weight:600">A blueprint for other cities.</div></div>
<div class="lab">Groundwork</div><div class="sm">{GW}</div></div></div>''',
}
for k,b in BOTTOM.items(): open(f'card5-clean-{k}.html','w').write(HEAD+TOP+b+END)
