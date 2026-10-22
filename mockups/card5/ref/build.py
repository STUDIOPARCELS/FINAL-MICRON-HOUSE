# Card 5 refined from the client's reference: python3 build.py (run from mockups/card5/ref)
T='#353942'; M='#2c0f38'; B='#008f25'; P='#3f2448'; C2='#6a5571'
def page(extra,mark=612):
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P};text-align:center}}
.caps{{text-transform:uppercase}}
.col{{position:absolute;left:60px;right:60px;top:150px;bottom:136px;display:flex;flex-direction:column;align-items:center;justify-content:space-between}}
.lines{{font-size:35px;line-height:1.6;font-weight:500;color:{C2}}}
.lines b{{font-weight:700}}
.dot{{display:inline-block;width:7px;height:7px;border-radius:50%;background:#b9b2ab;margin:0 26px;vertical-align:middle;transform:translateY(-3px)}}
</style></head><body><div class="card"><div class="col">
<div class="caps" style="font-size:25px;letter-spacing:.16em;font-weight:800">Warm Springs House</div>
<img src="mark.svg" style="width:{mark}px;height:{mark}px;display:block">
<div class="lines">Without <b style="color:{T}">vision</b>, there&#8217;s no <b style="color:{T}">velocity</b>.<br>Without <b style="color:{M}">memory</b>, there&#8217;s no <b style="color:{M}">meaning</b>.<br>Without <b style="color:{B}">place</b>, there&#8217;s no <b style="color:{B}">perspective</b>.</div>
<div class="caps" style="font-size:28px;letter-spacing:.12em;font-weight:800"><span style="color:{T}">Tesla</span><span class="dot"></span><span style="color:{M}">Micron</span><span class="dot"></span><span style="color:{B}">Boise</span></div>
{extra}
</div></div></body></html>'''
A='<div class="caps" style="font-size:19px;letter-spacing:.3em;font-weight:700;color:'+C2+'">A collaborative rollout</div>'
Bx=('<div><div class="caps" style="font-size:17px;letter-spacing:.3em;font-weight:700;color:'+C2+'">A collaborative rollout</div>'
    '<div style="margin-top:14px;font-size:29px;line-height:1.36;font-weight:600;color:'+P+'">Micron&#8217;s opportunity:<br>shape how autonomy reaches Boise.<br><span style="font-weight:500;color:'+C2+'">A blueprint for other cities.</span></div></div>')
open('card5-ref-A.html','w').write(page(A))
open('card5-ref-B.html','w').write(page(Bx,560))
