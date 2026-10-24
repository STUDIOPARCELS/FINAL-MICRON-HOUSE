# Ready-to-send Tesla emails from lisa@lisawoodstudio.com: python3 build_email.py
# Writes .eml drafts (open in Outlook or Apple Mail, add the name and address, send) with the GIF embedded in the body,
# so it shows even where outside images are blocked, plus an HTML preview.
import base64,html
GIF='../Warm Springs House - Email GIF.gif'
URL='https://warmspringshouse.com/4tesla'
SUBJECT='Residential test bed for Optimus + Cybercab: Boise, available now'
OFFER='Warm Springs House, a 1906 home in Boise, as a residential test bed for Optimus and Cybercab. One or more Tesla engineers live and work on site. No cost to Tesla. Available now.'
OBJECTIVE="Prove the first autonomous corporate residence + entertainment hub with a leading Boise corporation, and build a blueprint for bringing autonomous technology into daily life in other cities. Both at Tesla's option."
NEXT='A site visit at your convenience.'
OPEN={'cold':"I'm Lisa Wood, owner of Warm Springs House in Boise. I'm writing to offer it to Tesla.",
      'introduced':'[Introducer] suggested I write to you.'}
F='font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#2b2d31'
def body_html(kind,img_src):
    p=lambda t:f'<p style="margin:0 0 14px;{F}">{t}</p>'
    return f'''<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#ffffff">
<div style="max-width:560px;padding:8px 4px">
{p('[Name],')}
{p(html.escape(OPEN[kind]))}
{p('<b>Offer:</b> '+html.escape(OFFER))}
{p('<b>Objective:</b> '+html.escape(OBJECTIVE))}
{p('<b>Next step:</b> '+html.escape(NEXT))}
<p style="margin:22px 0 18px"><a href="{URL}" target="_blank"><img src="{img_src}" width="300" alt="Open the invitation: Prepared for Tesla" style="display:block;width:300px;max-width:100%;height:auto;border:0"></a></p>
<p style="margin:0 0 4px;{F}">Invitation: <a href="{URL}" style="color:#2b2d31">warmspringshouse.com/4tesla</a></p>
<p style="margin:0 0 22px;{F}">Terms (one page): <a href="{URL}/terms" style="color:#2b2d31">warmspringshouse.com/4tesla/terms</a></p>
<p style="margin:0;{F}"><b>Lisa Wood</b><br><span style="font-size:13px;letter-spacing:.04em">LISA WOOD STUDIO &middot; <a href="tel:+12087202433" style="color:#2b2d31">208 720 2433</a> &middot; <a href="https://warmspringshouse.com/" style="color:#2b2d31">warmspringshouse.com</a></span></p>
</div></body></html>'''
def body_text(kind):
    return f'''[Name],

{OPEN[kind]}

Offer: {OFFER}

Objective: {OBJECTIVE}

Next step: {NEXT}

Invitation: {URL}
Terms (one page): {URL}/terms

Lisa Wood
LISA WOOD STUDIO · 208 720 2433 · warmspringshouse.com
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
