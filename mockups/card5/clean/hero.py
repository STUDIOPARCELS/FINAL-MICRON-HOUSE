# Hero-line type treatments on Card 5 version B: python3 hero.py (run from mockups/card5/clean)
import re
src=open('card5-clean-B.html').read()
src=src.replace('family=Montserrat:wght@400;500;600;700;800','family=Montserrat:wght@300;400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500')
base_css=re.search(r'\.st\{\{?[^}]*\}\}?\n\.st b\{\{?[^}]*\}\}?',src).group(0)
V={
 # 1 · one weight; colour alone carries the keywords
 'H1':('.st{font-size:36px;line-height:1.62;font-weight:500;letter-spacing:-.005em;color:#8c8391}\n.st b{font-weight:500}','b'),
 # 2 · serif, keywords in italic
 'H2':('.st{font-family:Newsreader,Georgia,serif;font-size:46px;line-height:1.42;font-weight:400;color:#6a5571}\n.st b{font-style:italic;font-weight:500}','b'),
 # 3 · capitals, as on the website hero
 'H3':('.st{font-size:29px;line-height:1.85;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#8c8391}\n.st b{font-weight:800}','b'),
 # 4 · serif roman, light, colour only
 'H4':('.st{font-family:Newsreader,Georgia,serif;font-size:44px;line-height:1.42;font-weight:300;color:#6f6475}\n.st b{font-weight:500}','b'),
}
for k,(css,_) in V.items():
    open(f'card5-{k}.html','w').write(src.replace(base_css,css))
