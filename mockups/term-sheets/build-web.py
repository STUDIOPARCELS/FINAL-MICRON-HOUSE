# Tesla terms as a web page (warmspringshouse.com/4tesla/terms): python3 build-web.py
# Same content and look as the one-page term sheet, laid out for phones and computers, no PDF.
import html,base64
from build import rows,cell
INK,INK2,RULE,GR='#393c41','#5c5e62','#cfd0d2','#00782a'
paper='data:image/webp;base64,'+base64.b64encode(open('paper-gray.webp','rb').read()).decode()
mark='data:image/svg+xml;base64,'+base64.b64encode(open('mark.svg','rb').read()).decode()
trs=''.join(f'<tr><th>{html.escape(k)}</th><td>{cell(v)}</td></tr>' for k,v in rows('../../copy/term-sheet-tesla.md'))
PAGE=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>Proposed Terms · Prepared for Tesla</title>
<meta name="description" content="Warm Springs House, Boise: proposed terms for Tesla.">
<meta property="og:title" content="Proposed Terms · Prepared for Tesla">
<meta property="og:image" content="https://warmspringshouse.com/4tesla/preview.jpg">
<meta name="twitter:card" content="summary_large_image">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">
<style>
/* A sheet of the invitation's paper on a plain white page; full width on phones */
:root{{color-scheme:light}}
html{{-webkit-text-size-adjust:100%;text-size-adjust:100%}}
body{{margin:0;background:#fff;color:{INK};font-family:Montserrat,Arial,sans-serif}}
.pg{{box-sizing:border-box;max-width:760px;margin:72px auto;padding:56px 60px 48px;background:#f4f4f3 url({paper}) center/cover;box-shadow:0 1px 3px rgba(30,30,32,.06),0 18px 50px rgba(30,30,32,.10)}}
.brand{{font-size:13px;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
.lab{{margin-top:28px;display:flex;align-items:center;gap:10px;font-size:11px;letter-spacing:.24em;font-weight:800;text-transform:uppercase;color:{GR}}}
.lab::before{{content:"";width:8px;height:8px;border-radius:50%;background:{GR}}}
h1{{margin:12px 0 0;font-size:36px;line-height:1.04;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
.it{{margin-top:10px;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:20px;line-height:1.3}}
.note{{margin-top:8px;font-size:13px;line-height:1.5;color:{INK2};font-weight:500}}
table{{margin:34px 0;width:100%;border-collapse:collapse}}
th,td{{text-align:left;vertical-align:top;padding:12px 0;border-top:1px solid {RULE};font-size:15px;line-height:1.5}}
th{{width:190px;padding-right:18px;padding-top:15px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800;color:{INK}}}
td{{font-weight:500;color:{INK2};text-wrap:pretty}}
tr:last-child th,tr:last-child td{{border-bottom:1px solid {RULE}}}
.tbd{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:17px;color:{INK}}}
.foot{{display:flex;justify-content:space-between;align-items:center;gap:20px}}
.foot .n{{font-size:18px;letter-spacing:.08em;font-weight:800;text-transform:uppercase}}
.foot .c{{margin-top:6px;font-size:15px;line-height:1.6;font-weight:500}}
.foot .p{{margin-top:10px;font-size:10px;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{INK2}}}
.foot img{{width:110px;height:110px;flex:none}}
.back{{display:block;margin-top:26px;font-size:11px;letter-spacing:.22em;font-weight:700;text-transform:uppercase;color:{INK2}}}
a{{color:inherit;text-decoration:underline;text-decoration-color:{RULE};text-underline-offset:4px}}
a:hover{{text-decoration-color:{INK2}}}
@media (max-width:640px){{
  .pg{{margin:0;min-height:100vh;padding:40px max(22px,env(safe-area-inset-left)) 40px max(22px,env(safe-area-inset-right));box-shadow:none}}
  h1{{font-size:30px}}
  th,td{{display:block;width:auto;padding:0;border:0}}
  tr{{display:block;padding:12px 0;border-top:1px solid {RULE}}}
  tr:last-child{{border-bottom:1px solid {RULE}}}
  th{{padding:0 0 5px}}
  .foot img{{width:84px;height:84px}}
}}
</style>
</head>
<body>
<main class="pg">
<div class="brand">Warm Springs House</div>
<div class="lab">Proposed terms</div>
<h1>Prepared for Tesla</h1>
<div class="it">A residential test bed for Optimus + Cybercab.</div>
<div class="note">Non-binding. Creates no obligation for either party until a definitive agreement is signed.</div>
<table>{trs}</table>
<div class="foot"><div><div class="n">Lisa Wood</div>
<div class="c"><a href="tel:+12087202433">208 720 2433</a><br><a href="mailto:lisa@lisawoodstudio.com">lisa@lisawoodstudio.com</a><br><a href="https://warmspringshouse.com/">warmspringshouse.com</a></div>
<div class="p">Presented by <a href="https://lisawoodstudio.com/" target="_blank" rel="noopener">Lisa Wood Studio</a></div></div><img src="{mark}" alt="Warm Springs House logo"></div>
<a class="back" href="/4tesla">View the invitation</a>
</main>
</body>
</html>
'''
open('terms-tesla-web.html','w').write(PAGE); print('terms-tesla-web.html',len(PAGE)//1024,'KB')
