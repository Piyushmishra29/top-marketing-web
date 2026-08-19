from PIL import Image
import os
SRC=os.path.expanduser("~/Desktop/top-marketing-web/assets-raw/pages/pg-011.png")
im=Image.open(SRC).convert("L"); px=im.load()
x0,y0,x1,y1=40,255,1830,1075
INK=225
def zeroruns(flags):
    out=[];s=None
    for i,v in enumerate(flags):
        if not v and s is None: s=i
        elif v and s is not None: out.append((s,i,i-s)); s=None
    if s is not None: out.append((s,len(flags),len(flags)-s))
    return out
colink=[]
for x in range(x0,x1):
    colink.append(any(px[x,y]<INK for y in range(y0,y1,2)))
rowink=[]
for y in range(y0,y1):
    rowink.append(any(px[x,y]<INK for x in range(x0,x1,2)))
cz=sorted(zeroruns(colink),key=lambda r:-r[2])[:14]
rz=sorted(zeroruns(rowink),key=lambda r:-r[2])[:10]
print("widest col gutters (x_start,x_end,w) rel:",[(a+x0,b+x0,w) for a,b,w in sorted(cz)])
print("widest row gutters (y_start,y_end,h) rel:",[(a+y0,b+y0,w) for a,b,w in sorted(rz)])
