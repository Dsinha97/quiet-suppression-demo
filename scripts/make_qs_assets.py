"""Brand assets from assets/QSlogo1.png (the QS monogram with the wordmark under it).

The source already has a clean transparent background. The artwork is dark teal and amber, made for
light backgrounds, so a recoloured "dark" version (teal -> cream, amber kept) is made for the navy site.
Writes assets/qs-*.png, assets/qs-favicon.ico and assets/qs-og-image.png. The older logo files are left as they are.
Run: python scripts/make_qs_assets.py  (needs Pillow and NumPy)
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets")

NAVY = (11, 18, 36)
CREAM = (242, 234, 220)
AMBER = (224, 146, 40)
TEAL_R, AMBER_R = 3, 192  # red channel of the source teal and amber

src = Image.open(os.path.join(OUT, "QSlogo1.png")).convert("RGBA")
a = np.asarray(src)
alpha = a[..., 3]


def trim(im, pad=0.04):
    al = np.asarray(im)[..., 3]
    ys, xs = np.where(al > 8)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    p = int(max(x1 - x0, y1 - y0) * pad)
    return im.crop((x0 - p, y0 - p, x1 + p + 1, y1 + p + 1))


def square(im, pad=0.06):
    im = trim(im, 0)
    side = int(max(im.size) * (1 + 2 * pad))
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.alpha_composite(im, ((side - im.width) // 2, (side - im.height) // 2))
    return sq


def dark_version(im):
    px = np.asarray(im).astype(float)
    t = np.clip((px[..., 0] - TEAL_R) / (AMBER_R - TEAL_R), 0, 1)[..., None]
    rgb = np.array(CREAM) * (1 - t) + np.array(AMBER) * t
    return Image.fromarray(np.dstack([rgb, px[..., 3]]).astype(np.uint8), "RGBA")


# the monogram sits above the wordmark: cut at the first empty row band below the mark
rows = (alpha > 8).any(axis=1)
mid = a.shape[0] // 2
gap = next(y for y in range(mid, a.shape[0]) if not rows[y])
mark_src = src.crop((0, 0, src.width, gap))

lockup = trim(src)
lockup_dark = dark_version(lockup)
mark = square(mark_src).resize((1024, 1024), Image.LANCZOS)
mark_dark = dark_version(mark)

lockup.save(os.path.join(OUT, "qs-lockup.png"))
lockup_dark.save(os.path.join(OUT, "qs-lockup-dark.png"))
mark.save(os.path.join(OUT, "qs-mark.png"))
mark_dark.save(os.path.join(OUT, "qs-mark-dark.png"))
for n in (512, 256):
    mark.resize((n, n), Image.LANCZOS).save(os.path.join(OUT, "qs-mark-%d.png" % n))
    mark_dark.resize((n, n), Image.LANCZOS).save(os.path.join(OUT, "qs-mark-dark-%d.png" % n))


def tile(size, bg, logo, radius_ratio=0.22, pad_ratio=0.1):
    t = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(t).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=bg + (255,))
    inner = int(size * (1 - 2 * pad_ratio))
    t.alpha_composite(logo.resize((inner, inner), Image.LANCZOS), (int(size * pad_ratio),) * 2)
    return t


# app icons: dark mark on a navy tile (the site's ground)
tile(1024, NAVY, mark_dark).save(os.path.join(OUT, "qs-mark-tile.png"))
for n in (512, 192):
    tile(n, NAVY, mark_dark).save(os.path.join(OUT, "qs-icon-%d.png" % n))
apple = Image.new("RGBA", (180, 180), NAVY + (255,))
apple.alpha_composite(mark_dark.resize((150, 150), Image.LANCZOS), (15, 15))
apple.convert("RGB").save(os.path.join(OUT, "qs-apple-touch-icon.png"))

# favicons: tighter padding so the monogram stays legible at 16 px
fav = {n: tile(n * 4, NAVY, mark_dark, 0.2, 0.04).resize((n, n), Image.LANCZOS) for n in (16, 32, 48)}
fav[16].save(os.path.join(OUT, "qs-favicon-16.png"))
fav[32].save(os.path.join(OUT, "qs-favicon-32.png"))
fav[48].save(os.path.join(OUT, "qs-favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])

# social card: dark mark, title and subtitle on navy
og = Image.new("RGBA", (1200, 630), NAVY + (255,))
og.alpha_composite(mark_dark.resize((400, 400), Image.LANCZOS), (90, 115))
d = ImageDraw.Draw(og)
fonts = "C:/Windows/Fonts"
try:
    title_f = ImageFont.truetype(os.path.join(fonts, "georgia.ttf"), 68)
    sub_f = ImageFont.truetype(os.path.join(fonts, "georgiai.ttf"), 30)
    small_f = ImageFont.truetype(os.path.join(fonts, "arial.ttf"), 20)
except OSError:
    title_f = sub_f = small_f = ImageFont.load_default()
d.text((540, 228), "Quiet Suppression", font=title_f, fill=CREAM)
d.text((542, 322), "Collusion and watchdog capture", font=sub_f, fill=(220, 211, 195))
d.text((542, 362), "in AI grievance pipelines", font=sub_f, fill=(220, 211, 195))
d.text((542, 430), "APART RESEARCH  ·  AI COLLUSION RESEARCH SPRINT 2026", font=small_f, fill=AMBER)
og.convert("RGB").save(os.path.join(OUT, "qs-og-image.png"))

print("wrote qs-* assets to", OUT)
