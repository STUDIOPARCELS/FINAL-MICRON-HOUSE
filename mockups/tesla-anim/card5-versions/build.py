# Card 5 layout options (static final frames for comparison): python3 build.py (run from mockups/tesla-anim/card5-versions)
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">'
MARK='<svg viewBox="71 71 882 882" width="{s}" height="{s}" style="display:block"><circle cx="512" cy="306" r="234" fill="#7db0d3" opacity=".95"/><circle cx="512" cy="718" r="234" fill="#00782a" opacity=".95"/><circle cx="307" cy="512" r="235" fill="#2c0f38" opacity=".94"/><circle cx="717" cy="512" r="235" fill="#353942" opacity=".93"/><path fill="#fff" d="M512 195 A325 325 0 0 0 808 512 A325 325 0 0 0 512 828 A325 325 0 0 0 215 512 A325 325 0 0 0 512 195 Z"/></svg>'
mark=lambda s: MARK.format(s=s)
TITLE='Warm Springs House<br>+ Lisa Wood'
FACTS=['Idaho since 1992.','Owner of Warm Springs House since 2000.','Three decades in executive search for Silicon Valley.']
STORY='I&#8217;m in the demographic most wary of robots and self-driving cars, yet I can&#8217;t wait for them. I want to show how they will transform life for mothers, daughters and sisters like me.'
CLOSE='Grounding them here is my home&#8217;s highest and best use.'
BASE=f'''html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f4f3 url(../paper-gray.webp) center/941px 1672px;font-family:Montserrat,Arial,sans-serif;color:{INK}}}
.w{{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column}}
.ph{{display:block;width:100%;object-fit:cover;box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)}}
.h{{font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
.f{{font-size:21px;line-height:1.5;font-weight:500;color:{INK2}}}
.q{{font-family:Newsreader,Georgia,serif;font-size:29px;line-height:1.36;color:{INK}}}
.cl{{font-size:21px;line-height:1.45;letter-spacing:.06em;font-weight:800;text-transform:uppercase}}
.rule{{height:1px;background:{RULE}}}
.lab{{font-size:15px;letter-spacing:.24em;font-weight:800;text-transform:uppercase;color:{INK2}}}'''
def page(n,css,body):
    open(f'{n}.html','w').write(f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE}\n{css}</style></head><body><div class="card"><div class="w">{body}</div></div></body></html>')
facts_lines=''.join(f'<div>{x}</div>' for x in FACTS)

# A · Portrait: your photo carries the card, text below (same structure as Cards 2 and 3)
page('A','',f'''<img class="ph" src="../lisa-bw.webp" style="flex:1;min-height:0;object-position:50% 30%">
<div style="padding-top:40px"><div class="h">{TITLE}</div>
<div class="f" style="margin-top:22px">{facts_lines}</div>
<div class="rule" style="margin-top:28px"></div>
<div class="q" style="margin-top:26px">{STORY}</div>
<div class="cl" style="margin-top:22px">{CLOSE}</div></div>''')

# B · House and portrait: the house wide on top, your portrait beside the facts
page('B','',f'''<img class="ph" src="../house-photo.webp" style="flex:1;min-height:0;object-position:50% 60%">
<div style="margin-top:40px;display:grid;grid-template-columns:330px 1fr;gap:36px;align-items:end">
<img class="ph" src="../lisa-bw.webp" style="height:400px;object-position:52% 30%">
<div><div class="h">{TITLE}</div><div class="f" style="margin-top:20px">{facts_lines}</div></div></div>
<div class="rule" style="margin-top:36px"></div>
<div class="q" style="margin-top:28px">{STORY}</div>
<div class="cl" style="margin-top:22px">{CLOSE}</div>''')

# C · Your words lead: the story as the large line, portrait and facts beneath, no house
page('C','.q{font-size:48px;line-height:1.22}',f'''<div class="lab" style="margin-top:20px">Warm Springs House + Lisa Wood</div>
<div class="q" style="margin-top:34px">{STORY}</div>
<div class="cl" style="margin-top:34px">{CLOSE}</div>
<div style="margin-top:auto;display:grid;grid-template-columns:420px 1fr;gap:40px;align-items:end">
<img class="ph" src="../lisa-bw.webp" style="height:640px;object-position:50% 30%">
<div><div class="h" style="font-size:34px">Lisa Wood</div><div class="f" style="margin-top:18px">{facts_lines}</div>
<div style="margin-top:34px">{mark(110)}</div></div></div>''')

# D · Two panels: house and portrait side by side, facts as a ledger like Card 4
page('D','.led>div{padding:16px 0;border-top:1px solid '+RULE+'} .led>div:last-child{border-bottom:1px solid '+RULE+'}',f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:17px;flex:1;min-height:0">
<img class="ph" src="../house-photo.webp" style="height:100%;object-position:45% 60%"><img class="ph" src="../lisa-bw.webp" style="height:100%;object-position:50% 30%"></div>
<div class="h" style="margin-top:44px">{TITLE}</div>
<div class="f led" style="margin-top:24px">{facts_lines}</div>
<div class="q" style="margin-top:30px">{STORY}</div>
<div class="cl" style="margin-top:22px">{CLOSE}</div>''')
