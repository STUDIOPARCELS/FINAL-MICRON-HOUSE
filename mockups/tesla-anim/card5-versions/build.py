# Card 5 options in the Card 2/3 style (static final frames): python3 build.py (run from mockups/tesla-anim/card5-versions)
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">'
BASE=f'''html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f4f3 url(../paper-gray.webp) center/941px 1672px;font-family:Montserrat,Arial,sans-serif;color:{INK}}}
.w{{position:absolute;left:60px;right:60px;top:60px;bottom:76px;display:flex;flex-direction:column;gap:38px}}
.pics{{flex:1;min-height:0;display:flex;flex-direction:column;gap:17px}}
.ph{{display:block;width:100%;min-height:0;object-fit:cover;box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)}}
.h{{font-size:38px;line-height:1.08;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}}
.sub{{font-size:21px;line-height:1.42;font-weight:500;color:{INK2}}}
.caps{{margin-top:20px;font-size:21px;letter-spacing:.12em;font-weight:800;text-transform:uppercase}}
.rule{{margin-top:34px;height:1px;background:{RULE}}}
.q{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:27px;line-height:1.36;color:{INK}}}'''
def page(n,body,css=''):
    open(f'{n}.html','w').write(f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE}\n{css}</style></head><body><div class="card"><div class="w">{body}</div></div></body></html>')
H='<div class="h">Warm Springs House<br>+ Lisa Wood</div>'
FACTS='Idaho since 1992. Owner of Warm Springs House since 2000.<br>Three decades in executive search for Silicon Valley.'
FACTS3='Idaho since 1992.<br>Owner of Warm Springs House since 2000.<br>Three decades in executive search for Silicon Valley.'
STORY='I&#8217;m in the demographic most wary of robots and self-driving cars,<br>yet I can&#8217;t wait for them. I want to show how they will transform<br>life for mothers, daughters and sisters like me.'
CLOSE='Grounding them here is my home&#8217;s<br>highest and best use.'
HOUSE='<img class="ph" src="../house-photo.webp" style="object-position:50% 55%;{}">'
LISA='<img class="ph" src="../lisa-bw.webp" style="object-position:48% {};{}">'
TEXT=f'<div>{H}<div class="sub" style="margin-top:32px">{FACTS}</div><div class="rule"></div><div class="sub" style="padding-top:22px">{STORY}</div><div class="caps">{CLOSE}</div></div>'

# 1 · House on top, portrait below
page('1',f'<div class="pics">{HOUSE.format("flex:1")}{LISA.format("44%","height:500px;flex:none")}</div>{TEXT}')
# 2 · Portrait on top, house below
page('2',f'<div class="pics">{LISA.format("40%","flex:1")}{HOUSE.format("height:470px;flex:none")}</div>{TEXT}')
# 3 · House on top; portrait beside the title and facts
page('3',f'''{HOUSE.format("flex:1")}
<div style="display:grid;grid-template-columns:330px 1fr;gap:36px;align-items:end;flex:none">{LISA.format("40%","height:420px")}
<div>{H}<div class="sub" style="margin-top:28px">{FACTS3}</div></div></div>
<div style="flex:none;margin-top:-4px"><div class="rule" style="margin-top:0"></div><div class="sub" style="padding-top:22px">{STORY}</div><div class="caps">{CLOSE}</div></div>''')
# 4 · Portrait on top; house beside the title and facts
page('4',f'''{LISA.format("40%","flex:1")}
<div style="display:grid;grid-template-columns:1fr 360px;gap:36px;align-items:end;flex:none">
<div>{H}<div class="sub" style="margin-top:28px">{FACTS3}</div></div>{HOUSE.format("height:300px")}</div>
<div style="flex:none;margin-top:-4px"><div class="rule" style="margin-top:0"></div><div class="sub" style="padding-top:22px">{STORY}</div><div class="caps">{CLOSE}</div></div>''')
# 5 · Two photos stacked equally; your story set as the italic serif line (the Card 3 treatment)
page('5',f'''<div class="pics">{HOUSE.format("flex:1")}{LISA.format("44%","flex:1")}</div>
<div>{H}<div class="sub" style="margin-top:24px">{FACTS}</div><div class="rule" style="margin-top:28px"></div>
<div class="q" style="padding-top:22px">I&#8217;m in the demographic most wary of robots and self-driving cars, yet I can&#8217;t wait for them. I want to show how they will transform life for mothers, daughters and sisters like me.</div><div class="caps">{CLOSE}</div></div>''')

# ---- Round 2: house on top, text leads with a fixed, generous rhythm, inset portrait matched to the text beside it; the house takes the remaining height
R2CSS=""".pretty{text-wrap:pretty}
.w{gap:52px}
.h2{font-size:46px;line-height:1.06;letter-spacing:-.01em;font-weight:800;text-transform:uppercase}
.h2.n{font-size:44px}
.f2{margin-top:18px;font-size:24px;line-height:1.42;font-weight:500;color:%s}
.s2{font-family:Newsreader,Georgia,serif;font-size:40px;line-height:1.32;color:%s}
.s2.l{font-size:44px}
.c2{margin-top:26px;font-size:22px;line-height:1.45;letter-spacing:.12em;font-weight:800;text-transform:uppercase}
.r2{height:1px;background:%s;margin:40px 0}
.inw{position:relative;flex:none;box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)}
.inw img{position:absolute;inset:0;width:100%%;height:100%%;object-fit:cover;object-position:48%% 38%%}""" % (INK2,INK,RULE)
HOUSE_F='<img class="ph" src="../house-photo.webp" style="flex:1;min-height:0;object-position:50% 55%">'
TITLE='Warm Springs House<br>+ Lisa Wood'
F2='<div class="f2 pretty">Idaho since 1992. Owner of Warm Springs House since 2000. Three decades in executive search for Silicon Valley.</div>'
SQ='I&#8217;m in the demographic most wary of robots and self-driving cars, yet I can&#8217;t wait for them. I want to show how they will transform life for mothers, daughters and sisters like me.'
C2='<div class="c2 pretty">Grounding them here is my home&#8217;s highest and best use.</div>'
IN=lambda w: f'<div class="inw" style="width:{w}px"><img src="../lisa-bw.webp" alt="Lisa Wood"></div>'
# A · Inset beside the headline and facts; story full width below
page('A',HOUSE_F+f'<div style="flex:none"><div style="display:flex;gap:36px"><div style="flex:1"><div class="h2 n">{TITLE}</div>{F2}</div>{IN(250)}</div><div class="r2"></div><div class="s2 l pretty">{SQ}</div>{C2}</div>',R2CSS)
# B · Inset at left beside the story and closing line
page('B',HOUSE_F+f'<div style="flex:none"><div class="h2">{TITLE}</div>{F2}<div class="r2"></div><div style="display:flex;gap:36px">{IN(260)}<div style="flex:1"><div class="s2 pretty">{SQ}</div>{C2}</div></div></div>',R2CSS)
# C · Inset at right beside the story and closing line
page('C',HOUSE_F+f'<div style="flex:none"><div class="h2">{TITLE}</div>{F2}<div class="r2"></div><div style="display:flex;gap:36px"><div style="flex:1"><div class="s2 pretty">{SQ}</div>{C2}</div>{IN(260)}</div></div>',R2CSS)
# D · Slim inset running the full height of the text, at right
page('D',HOUSE_F+f'<div style="flex:none;display:flex;gap:40px"><div style="flex:1"><div class="h2 n">{TITLE}</div>{F2}<div class="r2"></div><div class="s2 pretty">{SQ}</div>{C2}</div>{IN(240)}</div>',R2CSS)
