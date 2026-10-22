import cv2, numpy as np, sys
# Run from mockups/: python3 card3/compose-room.py 0.56 262  (real room photo + Optimus over the card 3 artwork)
from PIL import Image
s=float(sys.argv[1]); oy=float(sys.argv[2])
art=np.asarray(Image.open('card3/card3.webp').convert('RGB')).astype(np.float32)
ph=np.asarray(Image.open('card3/livingroom.jpg').convert('RGB'))
H,W=art.shape[:2]
ox=120-s*270
M=np.float32([[s,0,ox],[0,s,oy]])
pw=cv2.warpAffine(ph,M,(W,H),flags=cv2.INTER_AREA,borderMode=cv2.BORDER_REPLICATE).astype(np.float32)
valid=cv2.warpAffine(np.ones(ph.shape[:2],np.float32),M,(W,H),flags=cv2.INTER_LINEAR)
xs=np.array([0,140,240,300,345,365,380,560,640,720,800,941]); ys=np.array([650,668,682,700,712,780,890,900,912,925,935,950])
B=np.interp(np.arange(W),xs,ys).astype(np.float32)
rng=np.random.default_rng(7); n=np.zeros(W,np.float32)
for f,a in [(1/90,9),(1/35,5),(1/12,2.5)]:
    n+=a*np.sin(np.arange(W)*2*np.pi*f+rng.uniform(0,6.28))
B=B+n
yy=np.arange(H,dtype=np.float32)[:,None]; xx=np.arange(W)[None,:]
alpha=np.clip((B[None,:]-yy)/10.0+0.5,0,1)
jit=cv2.GaussianBlur(rng.uniform(-1,1,(H,W)).astype(np.float32),(0,0),2.2)*0.9
alpha=np.where(np.abs(yy-B[None,:])<14,np.clip(alpha+jit,0,1),alpha)
mn=art.min(axis=2); mx=art.max(axis=2)
white=np.clip((mn-160)/40.0,0,1)
haze=np.clip((mn-130)/45.0,0,1)*np.clip(1-(mx-mn-45)/30.0,0,1)
right=np.clip((mn-110)/40.0,0,1)
fringe=cv2.GaussianBlur(np.where(xx>=690,np.maximum(np.maximum(white,haze),right),np.maximum(white,haze)).astype(np.float32),(0,0),1.3)
d=yy-B[None,:]
near=(d>=-18)&(d<np.where(xx>=700,230,90))
alpha=np.where(near,np.maximum(alpha,fringe),alpha)*valid
comp=art*(1-alpha[...,None])+pw*alpha[...,None]
opt=np.asarray(Image.open('card3/optimus-cutout.png')).astype(np.float32)
r,g,b=opt[...,0],opt[...,1],opt[...,2]
opt[...,3]=np.where((r>1.9*g+8)&(r>1.6*b+8),0,opt[...,3]); opt[...,3]=cv2.GaussianBlur(opt[...,3],(0,0),0.6)
ox0,oy0=430,300; oh,ow=opt.shape[:2]
sh=np.zeros((H,W),np.float32); cv2.ellipse(sh,(655,888),(72,13),0,0,360,1.0,-1)
comp*=(1-cv2.GaussianBlur(sh,(0,0),9)[...,None]*0.45)
oa=opt[...,3:]/255.0
reg=comp[oy0:oy0+oh,ox0:ox0+ow]; comp[oy0:oy0+oh,ox0:ox0+ow]=reg*(1-oa)+opt[...,:3]*oa
out=Image.fromarray(comp.clip(0,255).astype('uint8')); out.save('card3/card3-room.webp',quality=94)
a=np.asarray(out.crop((120,290,858,1352))).astype(float)*np.array([1.0,0.984,0.963])
Image.fromarray(a.clip(0,255).astype('uint8')).save('card3/card3-crop.webp',quality=93)
