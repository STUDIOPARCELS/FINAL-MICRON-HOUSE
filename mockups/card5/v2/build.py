# Card 5 generator: python3 build.py  (run from mockups/card5/v2)
S='#353942'; E='#2c0f38'; G='#008f25'; GR='#878d9f'; P='#3f2448'; C2='#6a5571'
ROWS=[('Tesla',S,'Vision','Velocity'),('Micron',E,'Memory','Meaning'),('Boise',G,'Place','Perspective')]
FONT='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
SHADOW='box-shadow:0 1px 1px rgba(16,16,16,.18),0 6px 18px rgba(16,16,16,.10)'
def line(k1,k2,col,fs):
    return (f'<div style="font-size:{fs}px;line-height:1.08;letter-spacing:-.005em;font-weight:800;color:{GR}">'
            f'Without <span style="color:{col}">{k1}</span>,<br>there&#8217;s no <span style="color:{col}">{k2}</span>.</div>')
COPY=f'''<div data-m="copy">
<div class="lab">A collaborative rollout</div>
<div class="caps" style="margin-top:12px;font-size:46px;line-height:1.04;letter-spacing:-.01em;font-weight:800">Micron&#8217;s opportunity:<br>shape how autonomy reaches Boise.</div>
<div style="margin-top:14px;font-size:25px;line-height:1.32;font-weight:500;color:{C2}">With Tesla and university, hospital and Capitol leaders.</div>
<div class="caps" style="margin-top:10px;font-size:20px;letter-spacing:.12em;font-weight:800">A blueprint for other cities.</div>
<div style="margin-top:18px;border-top:1px solid #d3cdc4;padding-top:14px;font-size:21px;line-height:1.35;font-weight:500">
<span class="caps" style="font-size:15px;letter-spacing:.22em;font-weight:800;color:{C2}">Groundwork&nbsp;&nbsp;</span>Cybercab fleet application submitted.<br>Idaho and Boise policy work underway.</div></div>'''
def panelA():
    rows=''.join(f'''<div style="display:grid;grid-template-columns:170px 1fr;align-items:center;padding:22px 0;{'border-top:1px solid #e2ddd5;' if i else ''}">
<div class="caps" style="display:flex;align-items:center;gap:10px;font-size:15px;letter-spacing:.24em;font-weight:800;color:{c}"><span style="width:10px;height:10px;border-radius:50%;background:{c}"></span>{t}</div>{line(k1,k2,c,38)}</div>''' for i,(t,c,k1,k2) in enumerate(ROWS))
    return f'''<div data-m="panel" style="flex:1;min-height:0;background:#fbf9f5;{SHADOW};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 56px 40px">
<img src="mark.svg" style="flex:1;min-height:0;width:100%;max-width:560px;object-fit:contain">
<div style="align-self:stretch;margin-top:46px">{rows}</div></div>'''
def panelB(m=420):
    # mark with lobe callouts
    lab=lambda t,c,k,align: f'<div style="text-align:{align}"><div class="caps" style="font-size:15px;letter-spacing:.24em;font-weight:800;color:{c}">{t}</div><div class="caps" style="margin-top:4px;font-size:30px;font-weight:800;color:{c};letter-spacing:-.005em">{k}</div></div>'
    lines=''.join(f'<div style="margin-top:{14 if i else 0}px;font-size:27px;line-height:1.2;font-weight:800;color:{GR};text-transform:uppercase">Without <span style="color:{c}">{k1}</span>, there&#8217;s no <span style="color:{c}">{k2}</span>.</div>' for i,(t,c,k1,k2) in enumerate(ROWS))
    return f'''<div data-m="panel" style="flex:1;min-height:0;background:#fbf9f5;{SHADOW};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 44px">
<div style="display:grid;grid-template-columns:1fr {m}px 1fr;align-items:center;gap:18px;align-self:stretch">
{lab('Micron',E,'Memory','right')}<img src="mark.svg" style="width:{m}px;height:{m}px">{lab('Tesla',S,'Vision','left')}</div>
<div style="margin-top:6px">{lab('Boise',G,'Place','center')}</div>
<div style="margin-top:36px;padding-top:26px;border-top:1px solid #e2ddd5;align-self:stretch;text-align:center">{lines}</div></div>'''
def panelC():
    pics=[('cybercab.webp','50% 62%'),('s-micron.webp','50% 55%'),('s-capitol.webp','50% 45%')]
    strips=''.join(f'''<div style="position:relative;flex:1;min-height:0;{SHADOW}"><img src="{src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:{pos}">
<div style="position:absolute;left:14px;bottom:14px;background:rgba(246,243,238,.95);padding:11px 16px 10px 15px;display:flex;align-items:center;gap:14px">
<span class="caps" style="font-size:13px;letter-spacing:.24em;font-weight:800;color:{c}">{t}</span><span class="caps" style="font-size:17px;font-weight:800;color:{GR}">Without <span style="color:{c}">{k1}</span>, there&#8217;s no <span style="color:{c}">{k2}</span>.</span></div></div>'''
        for (src,pos),(t,c,k1,k2) in zip(pics,ROWS))
    return f'<div data-m="panel" style="flex:1;min-height:0;display:flex;flex-direction:column;gap:17px;position:relative">{strips}</div>'
def page(panel,mode,copy=None):
    copy=copy or COPY
    if mode=='plain': bg,box,scale,H='paper.webp','left:60px;top:60px',1,1536
    else: bg,box,scale,H='cardstock.webp','left:148px;top:177px',643/821,round(1305*821/643)
    return f'''<!doctype html><html><head><meta charset="utf-8">{FONT}
<style>html,body{{margin:0;background:#fff}}
.card{{position:relative;width:941px;height:1672px;overflow:hidden;background:#f4f3ef url({bg}) center/cover no-repeat;font-family:Montserrat,Arial,sans-serif;color:{P}}}
.caps{{text-transform:uppercase}}
.lab{{font-size:18px;letter-spacing:.24em;text-transform:uppercase;color:{C2};font-weight:700}}
.box{{position:absolute;{box};width:821px;height:{H}px;transform:scale({scale});transform-origin:0 0;display:flex;flex-direction:column;gap:40px}}
</style></head><body><div class="card"><div class="box">{panel}{copy}</div></div></body></html>'''
COPYC=COPY.replace('<div data-m="copy">','<div data-m="copy" style="display:grid;grid-template-columns:150px 1fr;column-gap:30px;align-items:start"><img src="mark.svg" style="width:150px;height:150px;margin-top:6px"><div>',1).replace('Micron&#8217;s opportunity:<br>shape how autonomy reaches Boise.','Micron&#8217;s opportunity:<br>shape how autonomy<br>reaches Boise.')+'</div>'
COPYC=COPYC.replace('With Tesla and university, hospital and Capitol leaders.','With Tesla and university, hospital<br>and Capitol leaders.')
COPYC=COPYC.replace('Idaho and Boise policy work underway.</div></div></div>','Idaho and Boise policy work underway.</div></div></div>')
for k,f in [('A',panelA),('B',panelB),('C',panelC)]:
    for mode in ['plain','cardstock']:
        open(f'card5-{k}-{mode}.html','w').write(page(f(500) if (k=='B' and mode=='cardstock') else f(),mode,COPYC if k=='C' else None))
