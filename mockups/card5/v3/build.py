# Card 5, text-only on the plain paper stock: python3 build.py (run from mockups/card5/v3)
P='#3f2448'; C2='#6a5571'; HR='#d3cdc4'
ROWS=[('Tesla','#5d6270','Vision','Velocity'),('Micron','#3f2448','Memory','Meaning'),('Boise','#008f25','Place','Perspective')]
HEAD='''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{margin:0;background:#fff}
.card{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:#3f2448}
.caps{text-transform:uppercase}
.lab{font-size:18px;letter-spacing:.24em;text-transform:uppercase;color:#6a5571;font-weight:700}
.box{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;justify-content:space-between}
</style></head><body><div class="card"><div class="box">'''
COPY=f'''<div data-m="copy" style="border-top:1px solid {HR};padding-top:30px">
<div class="lab">A collaborative rollout</div>
<div class="caps" style="margin-top:14px;font-size:50px;line-height:1.04;letter-spacing:-.01em;font-weight:800">Micron&#8217;s opportunity:<br>shape how autonomy<br>reaches Boise.</div>
<div style="margin-top:16px;font-size:27px;line-height:1.3;font-weight:500;color:{C2}">With Tesla and university, hospital<br>and Capitol leaders.</div>
<div class="caps" style="margin-top:12px;font-size:21px;letter-spacing:.12em;font-weight:800">A blueprint for other cities.</div>
<div style="margin-top:22px;font-size:23px;line-height:1.38;font-weight:500"><span class="caps" style="font-size:16px;letter-spacing:.22em;font-weight:800;color:{C2}">Groundwork&nbsp;&nbsp;</span>Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.</div></div>'''
def heroA(kw=168):
    out=''
    for i,(t,c,k1,k2) in enumerate(ROWS):
        out+=f'''<div>
<div style="display:flex;justify-content:space-between;align-items:baseline"><span class="caps" style="font-size:30px;letter-spacing:.18em;font-weight:700;color:{C2}">Without</span><span class="caps" style="display:flex;align-items:center;gap:10px;font-size:17px;letter-spacing:.26em;font-weight:800;color:{c}"><span style="width:10px;height:10px;border-radius:50%;background:{c}"></span>{t}</span></div>
<div class="caps" style="margin-top:2px;font-size:{kw}px;line-height:.96;letter-spacing:-.025em;font-weight:800;color:{c}">{k1}</div>
<div class="caps" style="margin-top:10px;font-size:42px;letter-spacing:.01em;font-weight:700;color:{C2}">there&#8217;s no <span style="color:{c};font-weight:800">{k2}</span>.</div></div>'''
    return f'<div data-m="hero" style="flex:1;display:flex;flex-direction:column;justify-content:space-between;padding:8px 0 44px">{out}</div>'
def heroB():
    # mark above the three lines; partner tag sits above each line so the line gets the full width
    lines=''.join(f'''<div style="padding:24px 0;{'border-top:1px solid #e3ded6;' if i else ''}">
<span class="caps" style="display:flex;align-items:center;gap:10px;font-size:17px;letter-spacing:.26em;font-weight:800;color:{c}"><span style="width:10px;height:10px;border-radius:50%;background:{c}"></span>{t}</span>
<div class="caps" style="margin-top:10px;font-size:52px;line-height:1.1;font-weight:800;color:{C2}">Without <span style="color:{c}">{k1}</span>,<br>there&#8217;s no <span style="color:{c}">{k2}</span>.</div></div>''' for i,(t,c,k1,k2) in enumerate(ROWS))
    return f'<div data-m="hero" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;padding-bottom:10px"><img src="mark.svg" style="width:330px;height:330px;display:block;margin:0 auto"><div>{lines}</div></div>'
open('card5-v3-A.html','w').write(HEAD+heroA()+COPY+'</div></div></body></html>')
open('card5-v3-B.html','w').write(HEAD+heroB()+COPY+'</div></div></body></html>')
