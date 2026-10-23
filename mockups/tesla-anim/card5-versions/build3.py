# Card 5 redesign options, round 3 (static final frames): python3 build3.py
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">'
BASE=f'''html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f4f3 url(../paper-gray.webp) center/941px 1672px;font-family:Montserrat,Arial,sans-serif;color:{INK}}}
.w{{position:absolute;left:60px;right:60px;top:60px;bottom:60px;display:flex;flex-direction:column;justify-content:space-between}}
.sh{{box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10);display:block}}
.house{{width:821px;height:586px}}
.h{{font-size:46px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
.f{{font-size:23px;line-height:1.45;font-weight:500;color:{INK2}}}
.b{{font-size:19px;line-height:1.5;letter-spacing:.11em;font-weight:800;text-transform:uppercase}}
.q{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:28px;line-height:1.36;color:{INK}}}
.q p{{margin:0}} .q p+p{{margin-top:20px}}
.rule{{height:1px;background:{RULE}}}
.row{{display:flex;gap:48px;align-items:center}}'''
H='<div class="h">Warm Springs House<br>+ Lisa Wood Studio</div>'
F='<div class="f" style="margin-top:22px">Idaho since 1992.<br>A career in high tech since 1995.<br>Owner of Warm Springs House since 2000.</div>'
B='<div class="b">A 1906 family home, opening its doors to the future &#8212;<br>ready to welcome Optimus and Cybercab.</div>'
Q='<div class="q"><p>&#8220;I&#8217;m in the demographic most<br>wary of robots and self-driving<br>cars, yet I can&#8217;t wait for them.</p><p>I&#8217;ve seen how fragile care can<br>be for the people I love.<br>I want a robot in the loop.&#8221;</p></div>'
QW='<div class="q"><p>&#8220;I&#8217;m in the demographic most wary of robots and self-driving cars,<br>yet I can&#8217;t wait for them.</p><p>I&#8217;ve seen how fragile care can be for the people I love.<br>I want a robot in the loop.&#8221;</p></div>'
HOUSE='<img class="sh house" src="../house-photo.webp" alt="">'
LISA=lambda p: f'<img class="sh" src="../lisa-bw.webp" alt="" style="width:{p}px;height:{p}px;flex:none">'
def page(n,body,css=''):
    open(f'{n}.html','w').write(f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE}\n{css}</style></head><body><div class="card"><div class="w">{body}</div></div></body></html>')
import sys
P={k:int(v) for k,v in (a.split('=') for a in sys.argv[1:])}
# V1 · Caption: the 1906 line sits under the house photo as its caption
page('V1',f'<div>{HOUSE}<div style="margin-top:24px">{B}</div></div><div>{H}{F}</div><div class="rule"></div><div class="row"><div style="flex:1">{Q}</div>{LISA(P.get("V1",400))}</div>')
# V2 · Statement band: the 1906 line between two rules, centred, as the hinge of the card
page('V2',f'{HOUSE}<div>{H}{F}</div><div><div class="rule"></div><div class="b" style="text-align:center;padding:26px 0">A 1906 family home, opening its doors to the future &#8212;<br>ready to welcome Optimus and Cybercab.</div><div class="rule"></div></div><div class="row"><div style="flex:1">{Q}</div>{LISA(P.get("V2",380))}</div>')
# V3 · Portrait left: who you are and the 1906 line as one block; portrait on the left of your quote
page('V3',f'{HOUSE}<div>{H}{F}<div style="margin-top:26px">{B}</div></div><div class="rule"></div><div class="row">{LISA(P.get("V3",440))}<div style="flex:1">{Q}</div></div>')
# V4 · Your words first: quote and portrait under the house, who you are closes the card
page('V4',f'{HOUSE}<div class="row"><div style="flex:1">{Q}</div>{LISA(P.get("V4",360))}</div><div class="rule"></div><div>{H}{F}<div style="margin-top:26px">{B}</div></div>')
# V5 · Facts in three columns under the title, the 1906 line beneath; quote and portrait below
FC=''.join(f'<div class="f" style="padding:0 24px;{"border-left:1px solid "+RULE+";" if k else "padding-left:0;"}">{t}</div>' for k,t in enumerate(["Idaho<br>since 1992.","A career in high tech<br>since 1995.","Owner of Warm Springs<br>House since 2000."]))
page('V5',f'{HOUSE}<div>{H}<div style="display:grid;grid-template-columns:auto auto 1fr;margin-top:24px">{FC}</div><div style="margin-top:28px">{B}</div></div><div class="rule"></div><div class="row"><div style="flex:1">{Q}</div>{LISA(P.get("V5",420))}</div>')
