# Card 4 layout options (static final frames for comparison): python3 build.py (run from mockups/tesla-anim/card4-versions)
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'; SL='#353942'; MP='#2c0f38'; GR='#00782a'; SKY='#7db0d3'
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">'
def mark(sz): return f'''<svg viewBox="71 71 882 882" width="{sz}" height="{sz}" style="display:block"><circle cx="512" cy="306" r="234" fill="{SKY}" opacity=".95"/><circle cx="512" cy="718" r="234" fill="{GR}" opacity=".95"/><circle cx="307" cy="512" r="235" fill="{MP}" opacity=".94"/><circle cx="717" cy="512" r="235" fill="{SL}" opacity=".93"/><path fill="#fff" d="M512 195 A325 325 0 0 0 808 512 A325 325 0 0 0 512 828 A325 325 0 0 0 215 512 A325 325 0 0 0 512 195 Z"/></svg>'''
H=[('vision','velocity',SL),('memory','meaning',MP),('place','perspective',GR)]
def hero(cls): return f'<div class="{cls}">'+''.join(f'<div>Without <b style="color:{c}">{x}</b>, there&#8217;s no <b style="color:{c}">{y}</b>.</div>' for x,y,c in H)+'</div>'
VERBS=[('Host',GR,'Boise&#8217;s government, health care, education and business leaders.'),
       ('Show',SL,'Them autonomous technology firsthand.'),
       ('Shape',MP,'How autonomous technology enters daily life.'),
       ('Create',SKY,'A playbook other cities can adopt.')]
S1='When Tesla chooses, host Boise&#8217;s government, health care, education and business leaders alongside the founding partner, and show them autonomous technology firsthand.'
S2='Together, shape how autonomous technology enters daily life and create a playbook other cities can adopt.'
BASE=f'''html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f4f3 url(../paper-gray.webp) center/941px 1672px;font-family:Montserrat,Arial,sans-serif;color:{INK}}}
.w{{position:absolute;left:76px;right:76px;top:124px;bottom:112px;display:flex;flex-direction:column}}
.top{{font-size:22px;letter-spacing:.24em;font-weight:800;text-transform:uppercase}}
.rule{{height:1px;background:{RULE}}}
.h{{font-size:32px;line-height:1.15;letter-spacing:.06em;font-weight:800;text-transform:uppercase}}
.it{{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:27px;line-height:1.35;color:{INK}}}
.p{{font-size:21px;line-height:1.55;font-weight:500;color:{INK2}}}
.vb{{font-size:16px;letter-spacing:.18em;font-weight:800;text-transform:uppercase}}
.serif{{font-family:Newsreader,Georgia,serif}} .serif b{{font-style:italic;font-weight:500}}
.c{{text-align:center}} .bal{{text-wrap:balance}}
.half{{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}}
.h{{font-size:34px}} .it{{font-size:29px}} .vb{{font-size:18px}} .p{{font-size:24px;line-height:1.5}}'''
def page(name,css,body):
    open(f'{name}.html','w').write(f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE}\n{css}</style></head><body><div class="card"><div class="w">{body}</div></div></body></html>')

# A · Centered, four verbs: the blueprint as four short lines led by its verbs
page('A','''.hero{font-size:42px;line-height:1.34;color:%s}
.v{display:flex;flex-direction:column;gap:22px;margin-top:40px}
.v .vb{display:block;margin-bottom:6px}
.v .t{font-size:25px;line-height:1.4;font-weight:500;color:%s}''' % (INK2,INK2),
f"""<div class="top c">Warm Springs House</div>
<div class="half c"><div style="margin:0 auto">{mark(260)}</div><div style="margin-top:56px">{hero('hero serif')}</div></div>
<div class="rule"></div>
<div class="half c"><div class="h">A collaborative blueprint</div>
<div class="it" style="margin-top:14px">When Tesla chooses, together with the founding partner:</div>
<div class="v">"""+''.join(f'<div><span class="vb" style="color:{c if c!=SKY else INK}">{v}</span><span class="t">{t}</span></div>' for v,c,t in VERBS)+"""</div></div>""")

# B · Four in a grid: one cell per verb, each keyed to a circle of the logo
page('B','''.hero{font-size:40px;line-height:1.36;color:%s}
.g{display:grid;grid-template-columns:1fr 1fr;gap:44px 48px;margin-top:50px;text-align:left}
.g .dot{display:inline-block;width:13px;height:13px;border-radius:50%%;margin-right:12px;vertical-align:1px}
.g .t{margin-top:12px;font-size:24px;line-height:1.42;font-weight:500;color:%s}''' % (INK2,INK2),
f"""<div class="top c">Warm Springs House</div>
<div class="half c"><div style="margin:0 auto">{mark(250)}</div><div style="margin-top:52px">{hero('hero serif')}</div></div>
<div class="rule"></div>
<div class="half"><div class="h c">A collaborative blueprint</div>
<div class="it c" style="margin-top:14px">When Tesla chooses, together with the founding partner:</div>
<div class="g">"""+''.join(f'<div><div class="vb"><span class="dot" style="background:{c}"></span>{v}</div><div class="t">{t}</div></div>' for v,c,t in VERBS)+"""</div></div>""")

# C · Ledger, left-aligned: the verbs as a column, like a term sheet
page('C','''.hero{font-size:44px;line-height:1.3;color:%s}
.row{display:grid;grid-template-columns:160px 1fr;align-items:baseline;padding:26px 0;border-top:1px solid %s}
.row .t{font-size:25px;line-height:1.4;font-weight:500;color:%s}''' % (INK2,RULE,INK2),
f"""<div class="top">Warm Springs House</div>
<div class="half"><div>{mark(250)}</div><div style="margin-top:52px">{hero('hero serif')}</div></div>
<div class="half"><div class="h">A collaborative blueprint</div>
<div class="it" style="margin-top:14px;margin-bottom:34px">When Tesla chooses, together with the founding partner:</div>
"""+''.join(f'<div class="row"><div class="vb" style="color:{c if c!=SKY else INK}">{v}</div><div class="t">{t}</div></div>' for v,c,t in VERBS)+"""</div>""")

# D · Statement: the original two sentences, the second set as a serif pull line
page('D','''.hero{font-size:40px;line-height:1.38;color:%s}
.pull{font-family:Newsreader,Georgia,serif;font-size:44px;line-height:1.28;color:%s}''' % (INK2,INK),
f"""<div class="top c">Warm Springs House</div>
<div class="half c"><div style="margin:0 auto">{mark(270)}</div><div style="margin-top:56px">{hero('hero serif')}</div></div>
<div class="rule"></div>
<div class="half c"><div class="h">A collaborative blueprint</div>
<div class="p bal" style="margin:26px auto 0;max-width:740px">{S1}</div>
<div class="pull bal" style="margin:44px auto 0;max-width:760px">{S2}</div></div>""")

# E · Caps hero: the three lines in Montserrat, the blueprint headline in serif
page('E','''.hero{font-size:27px;line-height:1.9;letter-spacing:.08em;font-weight:600;text-transform:uppercase;color:%s}
.hero b{font-weight:800}
.big{font-family:Newsreader,Georgia,serif;font-size:60px;line-height:1.1;color:%s}''' % (INK2,INK),
f"""<div class="top c">Warm Springs House</div>
<div class="half c"><div style="margin:0 auto">{mark(290)}</div><div style="margin-top:60px">{hero('hero')}</div></div>
<div class="rule"></div>
<div class="half c"><div class="big bal" style="margin:0 auto;max-width:740px">A collaborative blueprint for other cities.</div>
<div class="p bal" style="margin:34px auto 0;max-width:740px">{S1}</div>
<div class="p bal" style="margin:18px auto 0;max-width:740px;color:{INK};font-weight:700">{S2}</div></div>""")

# ---- Round 2: smaller hero lines, an explanation of "collaborative blueprint", space shared evenly between four groups
EX='<b style="font-weight:700;font-style:normal;color:#393c41">Tesla&#8217;s opportunity:</b> a city whose leaders help shape the rollout, and a playbook for every city that follows.'
LEAD='When Tesla chooses, together with the founding partner:'
ROWS=[('Host',GR,'Boise&#8217;s government, health care, education and business leaders.'),('Show',SL,'them autonomous technology firsthand.'),
      ('Shape',MP,'how autonomous technology enters daily life.'),('Create',INK,'a playbook other cities can adopt.')]
def ledger(fs=24): return ''.join(f'<div style="display:grid;grid-template-columns:150px 1fr;align-items:baseline;padding:20px 0;border-top:1px solid {RULE}"><div class="vb" style="color:{c}">{v}</div><div style="font-size:{fs}px;line-height:1.4;font-weight:500;color:{INK2}">{t}</div></div>' for v,c,t in ROWS)+f'<div style="height:1px;background:{RULE}"></div>'
SP2='.w{justify-content:space-between}'
def hero_s(px,lh=1.36): return f'.hero{{font-size:{px}px;line-height:{lh};color:{INK2}}}'

# F · Even rhythm: smaller serif lines; the explanation sits mid-card under the title
page('F',SP2+hero_s(34)+f'.ex{{font-size:23px;line-height:1.5;font-weight:500;color:{INK2}}}',
f'''<div class="top c">Warm Springs House</div>
<div class="c"><div style="display:flex;justify-content:center">{mark(230)}</div><div style="margin-top:44px">{hero('hero serif')}</div></div>
<div class="c"><div class="h">A collaborative blueprint</div><div class="ex bal" style="margin:16px auto 0;max-width:680px">{EX}</div></div>
<div><div class="it c" style="margin-bottom:26px">{LEAD}</div>{ledger()}</div>''')

# G · Statement in the middle: the explanation as a serif line at the card's centre
page('G',SP2+hero_s(32)+f'.ex{{font-family:Newsreader,Georgia,serif;font-size:38px;line-height:1.28;color:{INK}}}',
f'''<div class="top c">Warm Springs House</div>
<div class="c"><div style="display:flex;justify-content:center">{mark(220)}</div><div style="margin-top:40px">{hero('hero serif')}</div></div>
<div class="c"><div class="rule" style="width:80px;margin:0 auto 34px"></div><div class="h">A collaborative blueprint</div><div class="ex bal" style="margin:18px auto 0;max-width:700px">{EX}</div></div>
<div><div class="it c" style="margin-bottom:26px">{LEAD}</div>{ledger()}</div>''')

# H · Logo leads: larger logo, quieter hero lines
page('H',SP2+hero_s(30,1.4)+f'.ex{{font-size:23px;line-height:1.5;font-weight:500;color:{INK2}}}',
f'''<div class="top c">Warm Springs House</div>
<div class="c"><div style="display:flex;justify-content:center">{mark(300)}</div><div style="margin-top:40px">{hero('hero serif')}</div></div>
<div class="c"><div class="h">A collaborative blueprint</div><div class="ex bal" style="margin:16px auto 0;max-width:680px">{EX}</div></div>
<div><div class="it c" style="margin-bottom:26px">{LEAD}</div>{ledger()}</div>''')

# I · Caps hero: hero lines in small capitals, the explanation in serif
page('I',SP2+f'.hero{{font-size:21px;line-height:2;letter-spacing:.1em;font-weight:600;text-transform:uppercase;color:{INK2}}} .hero b{{font-weight:800}} .ex{{font-family:Newsreader,Georgia,serif;font-size:36px;line-height:1.28;color:{INK}}}',
f'''<div class="top c">Warm Springs House</div>
<div class="c"><div style="display:flex;justify-content:center">{mark(260)}</div><div style="margin-top:44px">{hero('hero')}</div></div>
<div class="c"><div class="h">A collaborative blueprint</div><div class="ex bal" style="margin:18px auto 0;max-width:700px">{EX}</div></div>
<div><div class="it c" style="margin-bottom:26px">{LEAD}</div>{ledger()}</div>''')
