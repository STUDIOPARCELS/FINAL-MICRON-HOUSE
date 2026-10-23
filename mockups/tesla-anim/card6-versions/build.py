# Card 6 options for separating the address from the three facts (static final frames): python3 build.py
INK='#393c41'; INK2='#5c5e62'; RULE='#cfd0d2'; GR='#00782a'; SL='#353942'; MP='#2c0f38'; SKY='#7db0d3'
FONTS='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">'
MARK='<svg viewBox="71 71 882 882" width="{s}" height="{s}" style="display:block;flex:none"><circle cx="512" cy="306" r="234" fill="#7db0d3" opacity=".95"/><circle cx="512" cy="718" r="234" fill="#00782a" opacity=".95"/><circle cx="307" cy="512" r="235" fill="#2c0f38" opacity=".94"/><circle cx="717" cy="512" r="235" fill="#353942" opacity=".93"/><path fill="#fff" d="M512 195 A325 325 0 0 0 808 512 A325 325 0 0 0 512 828 A325 325 0 0 0 215 512 A325 325 0 0 0 512 195 Z"/></svg>'
mark=lambda s: MARK.format(s=s)
BASE=f'''html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f4f3 url(../paper-gray.webp) center/941px 1672px;font-family:Montserrat,Arial,sans-serif;color:{INK}}}
.w{{position:absolute;left:60px;right:60px;top:60px;bottom:60px;display:flex;flex-direction:column;justify-content:space-between}}
.ph{{display:block;width:821px;height:462px;object-fit:cover;box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)}}
.cta{{font-size:120px;line-height:.98;letter-spacing:-.015em;font-weight:800;text-transform:uppercase}}
.sub{{margin-top:34px;font-size:24px;line-height:1.42;font-weight:500;color:{INK2}}}
.rule{{height:1px;background:{RULE}}}
.caps{{font-size:20px;letter-spacing:.14em;font-weight:800;text-transform:uppercase;line-height:1.3}}
.nm{{font-size:38px;line-height:1.1;letter-spacing:.08em;font-weight:800;text-transform:uppercase}}
.dt{{margin-top:18px;font-size:26px;line-height:1.55;font-weight:500}}
.dt a{{color:inherit;text-decoration:underline;text-decoration-color:{RULE};text-underline-offset:5px}}
.pb{{margin-top:26px;font-size:15px;letter-spacing:.3em;font-weight:700;text-transform:uppercase;color:{INK2}}}
.adr{{font-size:22px;line-height:1.45;font-weight:500;color:{INK2}}}
.dot{{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:14px;vertical-align:2px}}'''
def page(n,mid,contact,css=''):
    open(f'{n}.html','w').write(f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE}\n{css}</style></head><body><div class="card"><div class="w">'
      f'<img class="ph" src="../../tesla-v2/cybercab.webp" alt="">'
      f'<div><div class="cta">See it<br>in person.</div><div class="sub">Warm Springs House is ready now for Tesla engineers,<br>Optimus and Cybercab.</div></div>'
      f'{mid}<div class="rule"></div>{contact}</div></div></body></html>')
CONTACT=lambda extra='',logo=300: f'<div style="display:grid;grid-template-columns:1fr auto;align-items:center;column-gap:40px"><div><div class="nm">Lisa Wood</div><div class="dt">208 720 2433<br><a>lisa@lisawoodstudio.com</a><br><a>warmspringshouse.com</a></div>{extra}<div class="pb">Presented by Lisa Wood Studio</div></div>{mark(logo)}</div>'
FACTS=[('At no cost to Tesla',GR),('15 minutes from the airport',SKY),('Private, quiet and discreet',MP)]
ADDR='1020 E Warm Springs Ave · Boise, Idaho'

# A · Facts as three ruled rows between the CTA and the contact; the address moves into the contact block
page('A','<div>'+''.join(f'<div class="caps" style="padding:20px 0;border-top:1px solid {RULE}">{t}</div>' for t,c in FACTS)+f'<div class="rule"></div></div>',
     CONTACT(f'<div class="adr" style="margin-top:6px">{ADDR}</div>'))
# B · Facts as one ruled row of three cells; address in gray under the CTA line
page('B',f'<div><div class="rule"></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;padding:28px 0">'+''.join(f'<div class="caps" style="font-size:19px;line-height:1.45">{["At no cost<br>to Tesla","15 minutes<br>from the airport","Private, quiet<br>and discreet"][i]}</div>' for i,(t,c) in enumerate(FACTS))+'</div></div>',
     CONTACT(f'<div class="adr" style="margin-top:6px">{ADDR}</div>'))
# C · Facts with logo-colour dots; address set as its own gray line above them
page('C',f'<div><div class="adr" style="margin-bottom:26px">{ADDR}</div>'+''.join(f'<div class="caps" style="padding:9px 0"><span class="dot" style="background:{c}"></span>{t}</div>' for t,c in FACTS)+'</div>',
     CONTACT())
# D · Two columns: facts left, address right, under one rule
page('D',f'<div style="display:grid;grid-template-columns:1fr auto;gap:40px;align-items:start"><div>'+''.join(f'<div class="caps" style="padding:8px 0">{t}</div>' for t,c in FACTS)+f'</div><div style="text-align:right;padding-top:8px"><div class="caps" style="font-size:15px;letter-spacing:.24em;color:{INK2}">Address</div><div class="adr" style="margin-top:12px">1020 E Warm Springs Ave<br>Boise, Idaho 83712</div></div></div>',
     CONTACT())
