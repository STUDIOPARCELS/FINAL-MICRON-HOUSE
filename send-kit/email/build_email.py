# Ready-to-send Tesla emails from lisa@lisawoodstudio.com: python3 build_email.py
# Writes .eml drafts (open in Outlook or Apple Mail, add the name and address, send) with the GIF embedded in the body,
# so it shows even where outside images are blocked, plus an HTML preview.
import base64,html
GIF='../Warm Springs House - Email GIF.gif'
URL='https://warmspringshouse.com/4tesla'
OPEN=URL+'?card=1'  # the email's card and invitation link skip the opening the reader just watched; Card 1 drops in
SUBJECT='An invitation for Optimus + Cybercab'
# The first email, ending with Lisa's line from Card 5
INTRO={'cold':[],'introduced':['[Introducer] suggested I send this to you.']}
GREET="I cannot overstate how excited I am about the ways Optimus and Cybercab will reshape how we live, work, travel and gather."
BODY=["I'm inviting Tesla to join me at Warm Springs House, my 1906 house in Boise, where Tesla engineers live and work alongside Optimus and Cybercab: the proving ground for the first autonomous corporate residence and entertainment hub."]
ASK="I'd be glad to talk or to host a site visit, whenever suits you. My mobile is below."
CLOSE=["I'm in the demographic most wary of robots and self-driving cars, yet I can't wait for them. I've seen how fragile care can be for the people I love. I want a robot in the loop."]
F='font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#2b2d31'
def body_html(kind,img_src):
    p=lambda t,m='0 0 14px':f'<p style="margin:{m};{F}">{t}</p>'
    paras=''.join(p(html.escape(t))+'\n' for t in [GREET]+INTRO[kind]+BODY)
    return f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#ffffff">
<div style="max-width:560px;padding:16px">
{p('Hi [First name],')}
{paras}<p style="margin:22px 0 18px"><a href="{OPEN}" target="_blank"><img src="{img_src}" width="300" alt="Open the invitation: Reserved for Tesla" style="display:block;width:300px;max-width:100%;height:auto;border:0"></a></p>
{p(f'The invitation: <a href="{OPEN}" style="color:#2b2d31">warmspringshouse.com/4tesla</a>','0 0 14px')}
{p(html.escape(ASK))}
{p(html.escape(CLOSE[0]),'0 0 22px')}
<p style="margin:0;{F}"><b>Lisa Wood</b><br><a href="tel:+12087202433" style="color:#2b2d31">208 720 2433</a><br><a href="mailto:lisa@lisawoodstudio.com" style="color:#2b2d31">lisa@lisawoodstudio.com</a><br><a href="https://warmspringshouse.com/" style="color:#2b2d31">warmspringshouse.com</a><br>LISA WOOD STUDIO</p>
</div></body></html>'''
def body_text(kind):
    paras='\n\n'.join([GREET]+INTRO[kind]+BODY)
    return f'''Hi [First name],

{paras}

The invitation: {OPEN}

{ASK}

{CLOSE[0]}

Lisa Wood
208 720 2433
lisa@lisawoodstudio.com
warmspringshouse.com
LISA WOOD STUDIO
'''
def wrap(b): return '\r\n'.join(b[i:i+76] for i in range(0,len(b),76))
gif=wrap(base64.b64encode(open(GIF,'rb').read()).decode())
def qp(s): return base64.b64encode(s.encode('utf-8')).decode()
for kind,name in [('cold','Email to Tesla - cold.eml'),('introduced','Email to Tesla - with introducer.eml')]:
    eml=f'''X-Unsent: 1
From: Lisa Wood <lisa@lisawoodstudio.com>
To: 
Subject: {SUBJECT}
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="alt-wsh"

--alt-wsh
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: base64

{wrap(qp(body_text(kind)))}

--alt-wsh
Content-Type: multipart/related; boundary="rel-wsh"

--rel-wsh
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: base64

{wrap(qp(body_html(kind,'cid:invitation-gif@warmspringshouse')))}

--rel-wsh
Content-Type: image/gif; name="invitation.gif"
Content-Transfer-Encoding: base64
Content-ID: <invitation-gif@warmspringshouse>
Content-Disposition: inline; filename="invitation.gif"

{gif}

--rel-wsh--

--alt-wsh--
'''.replace('\n','\r\n')
    open(name,'w',newline='').write(eml); print(name, len(eml)//1024,'KB')
open('Email preview - cold.html','w').write(body_html('cold','../Warm Springs House - Email GIF.gif'))
print('preview ok')
