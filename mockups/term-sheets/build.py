# One-page term sheets from copy/term-sheet-*.md: python3 build.py (run from mockups/term-sheets)
import re, html
def rows(md):
    out=[]
    for line in open(md):
        m=re.match(r'\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*$', line)
        if m: out.append((m.group(1), m.group(2)))
    return out
def cell(v):
    # keep each place with its drive time on one line
    v=re.sub(r"(St\. Luke's|Downtown|Capitol|Airport) (\d+) min", lambda m: m.group(1).replace(' ','\u00a0')+'\u00a0'+m.group(2)+'\u00a0min', v)
    v=html.escape(v).replace(' · ','\u00a0· ')
    v=re.sub(r'\[TBD\]', '<span class="tbd">To be agreed</span>', v)
    return v
def page(who, ink, ink2, rule, md):
    trs=''.join(f'<tr><th>{html.escape(k)}</th><td>{cell(v)}</td></tr>' for k,v in rows(md))
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">
<style>@page{{size:Letter;margin:0}}html,body{{margin:0}}
.pg{{width:8.5in;height:11in;box-sizing:border-box;padding:.62in .72in .55in;background:#f6f4ef url(paper.webp) center/cover;font-family:Montserrat,Arial,sans-serif;color:{ink};display:flex;flex-direction:column}}
.top{{display:flex;justify-content:space-between;align-items:flex-start}}
.brand{{font-size:10.5pt;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
.kick{{margin-top:6pt;font-size:8pt;letter-spacing:.24em;font-weight:700;text-transform:uppercase;color:{ink2}}}
h1{{margin:20pt 0 0;font-family:Newsreader,Georgia,serif;font-weight:400;font-size:30pt;line-height:1.05;color:{ink}}}
h1 i{{font-weight:400}}
.note{{margin-top:7pt;font-size:8.5pt;color:{ink2};font-weight:500}}
table{{margin-top:16pt;width:100%;border-collapse:collapse}}
th,td{{text-align:left;vertical-align:top;padding:7.2pt 0;border-top:1px solid {rule};font-size:9.4pt;line-height:1.42}}
th{{width:1.55in;padding-right:14pt;font-size:7.6pt;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:{ink2};padding-top:9pt}}
td{{font-weight:500;color:{ink}}}
tr:last-child th,tr:last-child td{{border-bottom:1px solid {rule}}}
.tbd{{color:{ink2};font-style:italic;font-weight:500}}
.foot{{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;padding-top:14pt}}
.foot .n{{font-size:11pt;letter-spacing:.1em;font-weight:800;text-transform:uppercase}}
.foot .c{{margin-top:4pt;font-size:9.4pt;font-weight:500}}
.foot .p{{margin-top:8pt;font-size:7.4pt;letter-spacing:.24em;font-weight:700;text-transform:uppercase;color:{ink2}}}
a{{color:inherit;text-decoration:underline;text-decoration-color:{rule};text-underline-offset:3px}}
</style></head><body><div class="pg">
<div class="top"><div><div class="brand">Warm Springs House</div><div class="kick">Proposed terms · {who}</div></div><img src="mark.svg" style="width:.72in;height:.72in"></div>
<h1>A proposal for <i>{who}</i></h1>
<div class="note">Non-binding proposal for discussion.</div>
<table>{trs}</table>
<div class="foot"><div><div class="n">Lisa Wood</div>
<div class="c">208 720 2433 &nbsp;·&nbsp; <a href="mailto:lisa@lisawoodstudio.com">lisa@lisawoodstudio.com</a> &nbsp;·&nbsp; <a href="https://warmspringshouse.com/">warmspringshouse.com</a></div>
<div class="p">Presented by Lisa Wood Studio</div></div></div>
</div></body></html>'''

def tesla_page(md):
    INK,INK2,RULE,GR='#393c41','#5c5e62','#cfd0d2','#00782a'
    trs=''.join(f'<tr><th>{html.escape(k)}</th><td>{cell(v)}</td></tr>' for k,v in rows(md))
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">
<style>@page{{size:Letter;margin:0}}html,body{{margin:0}}
.pg{{width:8.5in;height:11in;box-sizing:border-box;padding:.6in .66in .55in;background:#f4f4f3 url(paper-gray.webp) center/cover;font-family:Montserrat,Arial,sans-serif;color:{INK};display:flex;flex-direction:column}}
.top{{display:flex;justify-content:space-between;align-items:center}}
.brand{{font-size:10pt;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
.lab{{margin-top:22pt;display:flex;align-items:center;gap:8pt;font-size:7.6pt;letter-spacing:.24em;font-weight:800;text-transform:uppercase;color:{GR}}}
.lab::before{{content:"";width:6pt;height:6pt;border-radius:50%;background:{GR}}}
h1{{margin:10pt 0 0;font-size:27pt;line-height:1.04;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
.it{{margin-top:8pt;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:13pt;line-height:1.3}}
.note{{margin-top:6pt;font-size:8pt;color:{INK2};font-weight:500}}
table{{margin:auto 0;width:100%;border-collapse:collapse}}
th,td{{text-align:left;vertical-align:top;padding:6.6pt 0;border-top:1px solid {RULE};font-size:9.2pt;line-height:1.42}}
th{{width:1.6in;padding-right:14pt;font-size:7.4pt;letter-spacing:.18em;text-transform:uppercase;font-weight:800;color:{INK};padding-top:8.4pt}}
td{{font-weight:500;color:{INK2};text-wrap:pretty}}
tr:last-child th,tr:last-child td{{border-bottom:1px solid {RULE}}}
.tbd{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:10pt;color:{INK}}}
.foot{{display:flex;justify-content:space-between;align-items:center}}
.foot .n{{font-size:12pt;letter-spacing:.08em;font-weight:800;text-transform:uppercase}}
.foot .c{{margin-top:5pt;font-size:9.4pt;line-height:1.55;font-weight:500}}
.foot .p{{margin-top:8pt;font-size:6.8pt;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{INK2}}}
a{{color:inherit;text-decoration:underline;text-decoration-color:{RULE};text-underline-offset:3px}}
</style></head><body><div class="pg">
<div class="top"><div class="brand">Warm Springs House</div></div>
<div class="lab">Proposed terms</div>
<h1>Prepared for Tesla</h1>
<div class="it">A residential test bed for Optimus + Cybercab.</div>
<div class="note">Non-binding. Creates no obligation for either party until a definitive agreement is signed.</div>
<table>{trs}</table>
<div class="foot"><div><div class="n">Lisa Wood</div>
<div class="c">208 720 2433<br><a href="mailto:lisa@lisawoodstudio.com">lisa@lisawoodstudio.com</a><br><a href="https://warmspringshouse.com/">warmspringshouse.com</a></div>
<div class="p">Presented by Lisa Wood Studio</div></div><img src="mark.svg" style="width:1.05in;height:1.05in"></div>
</div></body></html>'''
open('term-sheet-tesla.html','w').write(tesla_page('../../copy/term-sheet-tesla.md'))
open('term-sheet-micron.html','w').write(page('Micron','#3f2448','#6a5571','#d3cdc4','../../copy/term-sheet-micron.md'))
