# Card 5, full copy, Micron first: python3 build-full.py (run from mockups/card5/ref)
T='#353942'; M='#2c0f38'; B='#008f25'; P='#3f2448'; C2='#6a5571'
html=f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url(paper.webp) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P};text-align:center}}
.caps{{text-transform:uppercase}}
.col{{position:absolute;left:70px;right:70px;top:112px;bottom:104px;display:flex;flex-direction:column;align-items:center;justify-content:space-between}}
.lines{{font-size:33px;line-height:1.6;font-weight:500;color:{C2}}}
.lines b{{font-weight:700}}
.dot{{display:inline-block;width:7px;height:7px;border-radius:50%;background:#b9b2ab;margin:0 24px;vertical-align:middle;transform:translateY(-3px)}}
.lab{{font-size:15px;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{C2}}}
</style></head><body><div class="card"><div class="col">
<div class="caps" style="font-size:24px;letter-spacing:.16em;font-weight:800">Warm Springs House</div>
<img src="mark.svg" style="width:490px;height:490px;display:block">
<div><div class="lines">Without <b style="color:{M}">memory</b>, there&#8217;s no <b style="color:{M}">meaning</b>.<br>Without <b style="color:{T}">vision</b>, there&#8217;s no <b style="color:{T}">velocity</b>.<br>Without <b style="color:{B}">place</b>, there&#8217;s no <b style="color:{B}">perspective</b>.</div>
<div class="caps" style="margin-top:44px;font-size:27px;letter-spacing:.12em;font-weight:800"><span style="color:{M}">Micron</span><span class="dot"></span><span style="color:{T}">Tesla</span><span class="dot"></span><span style="color:{B}">Boise</span></div></div>
<div data-m="info" style="width:100%;border-top:1px solid #d3cdc4;padding-top:40px">
<div class="caps" style="font-size:31px;letter-spacing:.08em;font-weight:800">A collaborative rollout</div>
<div style="margin-top:20px;font-size:26px;line-height:1.45;font-weight:500;color:{C2}"><b style="font-weight:700;color:{P}">Micron&#8217;s opportunity:</b> shape how autonomy reaches Boise,<br>with Tesla and university, hospital and Capitol leaders.</div>
<div class="caps" style="margin-top:18px;font-size:19px;letter-spacing:.16em;font-weight:800">A blueprint for other cities.</div>
<div style="margin-top:34px" class="lab">Groundwork</div>
<div style="margin-top:10px;font-size:22px;line-height:1.45;font-weight:500">Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.</div>
</div>
</div></div></body></html>'''
open('card5-full.html','w').write(html)
