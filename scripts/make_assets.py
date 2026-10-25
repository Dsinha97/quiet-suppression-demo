import json, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets")
os.makedirs(OUT, exist_ok=True)

src = Image.open(os.path.join(ROOT, "logo.jpg")).convert("RGB")
a = np.asarray(src).astype(int)
mx, mn = a.max(axis=2), a.min(axis=2)
# checkerboard squares are near-white / light grey with very low saturation
import warnings
warnings.filterwarnings("ignore")
from scipy import ndimage as ndi
cand = (mn > 130) & ((mx - mn) < 45)
h, w = cand.shape
lab, _ = ndi.label(cand)
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(border))
fg = ~bg
# enclosed light areas (magnifier glass, folder paper) still carry the baked-in checkerboard: make them clean white
interior = cand & fg
clean = np.asarray(src).copy()
clean[interior] = (255, 255, 255)
src = Image.fromarray(clean, "RGB")
# grow foreground by one pixel to swallow the light JPEG fringe, then soften the edge
fg_img = Image.fromarray((fg * 255).astype(np.uint8), "L").filter(ImageFilter.MinFilter(3))
fg_img = fg_img.filter(ImageFilter.GaussianBlur(1.1))
alpha = np.asarray(fg_img)

rgba = np.dstack([np.asarray(src), alpha]).astype(np.uint8)
im = Image.fromarray(rgba, "RGBA")
ys, xs = np.where(alpha > 40)
x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
side = int(max(x1 - x0, y1 - y0) * 1.12)
cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(im.crop((max(box[0], 0), max(box[1], 0), min(box[2], w), min(box[3], h))),
         (max(-box[0], 0), max(-box[1], 0)))
logo = sq.resize((1024, 1024), Image.LANCZOS)
logo.save(os.path.join(OUT, "logo.png"))
for n in (512, 256):
    logo.resize((n, n), Image.LANCZOS).save(os.path.join(OUT, "logo-%d.png" % n))

WHITE, NAVY, AMBER = (255, 255, 255), (11, 18, 36), (224, 147, 41)

on_white = Image.new("RGBA", (1024, 1024), WHITE + (255,))
on_white.alpha_composite(logo)
on_white.convert("RGB").save(os.path.join(OUT, "logo-on-white.png"))


def tile(size, radius_ratio=0.22, pad_ratio=0.12):
    t = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(t).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=WHITE + (255,))
    inner = int(size * (1 - 2 * pad_ratio))
    lg = logo.resize((inner, inner), Image.LANCZOS)
    t.alpha_composite(lg, (int(size * pad_ratio), int(size * pad_ratio)))
    return t


t1024 = tile(1024)
t1024.save(os.path.join(OUT, "logo-tile.png"))
t1024.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, "icon-512.png"))
t1024.resize((192, 192), Image.LANCZOS).save(os.path.join(OUT, "icon-192.png"))
# apple touch icon: opaque square, no transparent corners
ap = Image.new("RGB", (180, 180), WHITE)
ap.paste(logo.resize((144, 144), Image.LANCZOS), (18, 18), logo.resize((144, 144), Image.LANCZOS))
ap.save(os.path.join(OUT, "apple-touch-icon.png"))
# favicons: tighter padding so the mark stays readable when tiny
fav = {s: tile(s * 4, 0.2, 0.06).resize((s, s), Image.LANCZOS) for s in (16, 32, 48)}
fav[32].save(os.path.join(OUT, "favicon-32.png"))
fav[16].save(os.path.join(OUT, "favicon-16.png"))
fav[48].save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)], append_images=[fav[16], fav[32]])

# social card 1200x630
og = Image.new("RGB", (1200, 630), NAVY)
d = ImageDraw.Draw(og)
card = tile(420)
og.paste(card, (90, 105), card)
fb = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 84)
fr = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 34)
d.text((560, 190), "Quiet", font=fb, fill=AMBER)
d.text((560, 280), "Suppression", font=fb, fill=(245, 247, 250))
d.text((562, 400), "Collusion and watchdog capture", font=fr, fill=(190, 198, 214))
d.text((562, 444), "in AI grievance pipelines", font=fr, fill=(190, 198, 214))
og.save(os.path.join(OUT, "og-image.png"))

# palette from the artwork
fgpix = np.asarray(src)[fg].reshape(-1, 1, 3)
q = Image.fromarray(fgpix.astype(np.uint8), "RGB").quantize(5)
pal = q.getpalette()[:15]
cols = sorted(set("#%02x%02x%02x" % tuple(pal[i:i + 3]) for i in range(0, 15, 3)))
json.dump({"colours": cols, "note": "dominant colours in the logo artwork (amber, navy, coral, white and shades)"},
          open(os.path.join(OUT, "palette.json"), "w"), indent=2)

# contact sheet to check small sizes
sheet = Image.new("RGB", (1100, 380), (240, 240, 240))
sheet.paste(Image.new("RGB", (540, 380), NAVY), (0, 0))
sheet.paste(logo.resize((300, 300)), (20, 40), logo.resize((300, 300)))
sheet.paste(on_white.resize((300, 300)), (340, 40))
x = 700
for s in (16, 32, 48):
    f = fav[s]
    sheet.paste(f, (x, 60), f)
    big = f.resize((s * 3, s * 3), Image.NEAREST)
    sheet.paste(big, (x, 140), big)
    x += 110
og_s = og.resize((400, 210))
sheet.paste(og_s, (690, 160 + 0))
if os.environ.get("SCRATCH"):
    sheet.save(os.path.join(os.environ["SCRATCH"], "contact.png"))
print("done", cols, "bbox", x0, y0, x1, y1)
