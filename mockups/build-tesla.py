# Tesla set built from the Micron card sources: python3 build-tesla.py (run from mockups/)
import re
def edit(src,dst,pairs):
    s=open(src).read()
    for a,b in pairs:
        assert a in s, (dst,a[:60]); s=s.replace(a,b)
    open(dst,'w').write(s)

# Card 3 · LIVE. WORK. TEST.
edit('card3/final/card3-FINAL-card.html','card3/final/card3-TESLA.html',[
 ('Service + Security<br>+ Mobility','Live. Work. Test.'),
 ('<span class="caps" style="font-weight:800;letter-spacing:.04em">Warm Springs House</span> begins as a <b style="font-weight:800">Tesla test kitchen</b> and grows into a <b style="font-weight:800">proof of concept</b> with its founding partner.',
  '<span class="caps" style="font-weight:800;letter-spacing:.04em">Tesla in Boise.</span> A residential test kitchen<br>for <b style="font-weight:800">Optimus + Cybercab</b>, today.'),
])
# Card 4 · PROOF OF CONCEPT (photo above text, as Card 4)
s=open('card4/card4-plain.html').read()
a=s.index('<img class="ph"'); b=s.index('</div></body>')
body='''<div style="position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:36px">
<img src="dining.6.webp" style="flex:1;min-height:0;width:100%;object-fit:cover;object-position:50% 40%;display:block;box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)">
<div data-m="txt"><div class="lab">Proof of concept</div>
<div class="caps" style="margin-top:14px;font-size:54px;line-height:1.04;letter-spacing:-.01em;font-weight:800">Board dinners.<br>VIP visits.<br>Executive stays.</div>
<div style="margin-top:16px;font-size:28px;line-height:1.35;font-weight:500;color:#6a5571">Tesla and a leading Boise corporation prove<br>the fully autonomous corporate residence<br>and entertainment hub.</div>
<div style="margin-top:12px;font-size:28px;line-height:1.35;font-weight:600;color:#3f2448">Hosted by Optimus. Every arrival by Cybercab.</div></div></div>'''
open('card4/card4-TESLA.html','w').write(s[:a]+body+s[b:])
# Card 5 · A COLLABORATIVE ROLLOUT, Tesla first, no partner named
edit('card5/clean/card5-FINAL.html','card5/clean/card5-TESLA.html',[
 ('<div class="rule" style="padding:30px 46px 0;display:grid;grid-template-columns:1fr 1fr 1fr">\n<div class="pt" style="color:#2c0f38">Micron</div><div class="pt c" style="color:#353942">Tesla</div><div class="pt" style="color:#00782a;text-align:right">Boise</div></div>',
  '<div class="rule" style="padding:30px 46px 0;display:flex;justify-content:space-between">\n<div class="pt" style="color:#353942">Tesla</div><div class="pt c" style="color:#2c0f38">Founding partner</div><div class="pt" style="color:#00782a;text-align:right">Boise</div></div>'),
 ('<div class="p" style="margin-top:18px"><b>Micron&#8217;s opportunity:</b> host Boise&#8217;s first encounter<br>with autonomy, with Tesla and university,<br>hospital and Capitol leaders.</div>',
  '<div class="p" style="margin-top:18px"><b>How people first meet Optimus and Cybercab<br>shapes public trust.</b> Tesla and its founding partner<br>bring in university, hospital and Capitol leaders,<br>on Tesla&#8217;s terms.</div>'),
 ('<div class="lab" style="margin-top:40px">Groundwork</div>\n<div class="sm" style="margin-top:10px">Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.</div>',''),
])
