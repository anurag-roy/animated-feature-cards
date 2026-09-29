"""Render original, deterministic README illustrations. Requires Pillow.

Run from any directory: python scripts/render_examples.py
These are documentation assets, not a runtime implementation of the skill.
"""

from functools import lru_cache
from pathlib import Path
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "examples"
W, H, SCALE = 720, 560, 2
FPS, SECONDS = 12.5, 12
INK, MUTED, LINE = "#222936", "#727987", "#e7e9ed"
BLUE, GREEN, PURPLE = "#4465de", "#16816b", "#7954cd"
FONT_DIR = Path(os.environ.get("EXAMPLE_FONT_DIR", "/usr/share/fonts/noto"))


@lru_cache(None)
def font(size=14, bold=False):
    return ImageFont.truetype(str(FONT_DIR / f"NotoSans-{'Bold' if bold else 'Regular'}.ttf"), round(size * SCALE))


def ease(t, start, duration=.6):
    v = max(0, min(1, (t - start) / duration))
    return v * v * (3 - 2 * v)


class Canvas:
    def __init__(self, bg="#f6f7fa"):
        self.im = Image.new("RGB", (W * SCALE, H * SCALE), bg)
        self.d = ImageDraw.Draw(self.im)

    def box(self, xy, fill="white", r=12, outline=None):
        self.d.rounded_rectangle(tuple(round(v * SCALE) for v in xy), radius=round(r * SCALE), fill=fill, outline=outline, width=SCALE)

    def text(self, x, y, value, size=14, color=INK, bold=False):
        self.d.text((round(x * SCALE), round(y * SCALE)), value, font=font(size, bold), fill=color)

    def line(self, points, color=LINE, width=1):
        self.d.line([(round(x * SCALE), round(y * SCALE)) for x, y in points], fill=color, width=round(width * SCALE))

    def dot(self, x, y, color, radius=4):
        self.d.ellipse(((x-radius)*SCALE, (y-radius)*SCALE, (x+radius)*SCALE, (y+radius)*SCALE), fill=color)

    def avatar(self, x, y, initials, color, radius=10, size=9):
        self.dot(x, y, color, radius)
        face = font(size, True)
        left, top, right, bottom = self.d.textbbox((0, 0), initials, font=face)
        position = (round(x*SCALE-(left+right)/2), round(y*SCALE-(top+bottom)/2))
        self.d.text(position, initials, font=face, fill="white")

    def pill(self, x, y, label, color=BLUE, bg="#edf1ff", size=11):
        width = self.d.textlength(label, font=font(size)) / SCALE + 20
        self.box((x, y, x+width, y+25), bg, 12)
        self.text(x+10, y+4, label, size, color)
        return width

    def panel(self, title, label, accent):
        self.box((36, 33, 684, 404), "#e6e8ed", 19)
        self.box((36, 28, 684, 399), "white", 19, LINE)
        self.dot(59, 52, accent)
        self.text(72, 40, title, 15, bold=True)
        self.text(543, 43, label, 11, MUTED)
        self.line([(36, 78), (684, 78)])

    def caption(self, number, title, lines, accent):
        self.pill(36, 426, number, accent, "white")
        self.text(82, 422, title, 23, bold=True)
        for i, value in enumerate(lines):
            self.text(36, 465+i*25, value, 15, MUTED)

    def reveal(self, t, start, paint, duration=.5):
        amount = ease(t, start, duration)
        if amount:
            before = self.im.copy()
            paint()
            self.im = Image.blend(before, self.im, amount)
            self.d = ImageDraw.Draw(self.im)

    def cursor(self, x, y, click=False):
        if click:
            self.d.ellipse(((x-13)*SCALE, (y-13)*SCALE, (x+13)*SCALE, (y+13)*SCALE), outline="#b8c4ef", width=2*SCALE)
        points = [(x,y), (x+3,y+22), (x+8,y+16), (x+14,y+26), (x+19,y+23), (x+13,y+14), (x+21,y+13)]
        self.d.polygon([(round(a*SCALE),round(b*SCALE)) for a,b in points], fill=INK, outline="white", width=SCALE)


def assistant(t):
    c = Canvas("#efedf8")
    c.panel("Workspace assistant", "DEMO WORKSPACE", PURPLE)
    c.pill(56, 94, "Research", PURPLE, "#f1edf9")
    c.text(154, 98, "Sources connected · Product / Research", 12, MUTED)

    def question():
        c.box((246, 135, 660, 177), BLUE, 13)
        c.text(262, 147, "What is blocking the mobile launch?", 15, "white")
    c.reveal(t, .6, question)

    def tool():
        c.box((56, 196, 460, 245), "#f8f9fb", 10, LINE)
        c.dot(74, 220, GREEN if t > 4.0 else PURPLE)
        c.text(88, 204, "search_workspace", 13, bold=True)
        c.text(88, 224, "3 sources found" if t > 4 else "Searching launch notes and open issues…", 11, MUTED)
        if t > 4:
            c.pill(356, 208, "Complete", GREEN, "#e7f5ef")
        else:
            for j in range(3):
                c.dot(403+j*12, 220, PURPLE if int(t*3)%3 == j else "#d9d1ed", 3)
    c.reveal(t, 2.0, tool)

    def answer():
        c.text(58, 263, "Two items need attention before Friday.", 15, bold=True)
        c.text(58, 292, "01  Offline sync · waiting on API review", 13)
        c.text(58, 317, "02  Sign-in flow · final accessibility pass", 13)
        c.pill(58, 351, "Launch checklist", PURPLE, "#f1edf9")
        c.pill(226, 351, "Engineering notes", PURPLE, "#f1edf9")
    c.reveal(t, 4.6, answer, .7)
    c.caption("01", "Answers with the work behind them", ["A question becomes a search, a resolved tool call,", "and a short answer linked to its sources."], PURPLE)
    return c.im


def sprint(t):
    c = Canvas("#edf2fc")
    c.panel("Mobile launch", "SPRINT 08", BLUE)
    p = ease(t, 2.4, 1.3)
    q = ease(t, 5.4, 1.3)
    c.text(56, 94, "Sprint progress", 12, MUTED)
    c.box((170, 101, 492, 107), "#edf0f5", 3)
    c.box((170, 101, 170+322*(.25+.25*q), 107), BLUE, 3)
    c.text(530, 94, f"{round(25+25*q)}% complete", 12, BLUE)
    for x, label, count in [(52,"PLANNED",2-int(p==1)),(260,"IN PROGRESS",1+int(p==1)-int(q==1)),(468,"DONE",1+int(q==1))]:
        c.box((x, 130, x+200, 341), "#f6f7fa", 12)
        c.text(x+12, 141, label, 10, MUTED, True)
        c.pill(x+159, 136, str(count), MUTED, "#e9ecf1", 10)

    def task(x, y, title, code, initials, tag, accent=BLUE):
        c.box((x, y+3, x+180, y+74), "#e5e8ee", 9)
        c.box((x, y, x+180, y+71), "white", 9, LINE)
        c.text(x+10, y+8, code, 10, MUTED)
        c.text(x+10, y+25, title, 12, bold=True)
        c.avatar(x+19, y+56, initials, accent, radius=9, size=8)
        c.text(x+36, y+48, tag, 10, MUTED)

    task(62, 258, "Release notes", "APP-143", "JL", "Docs", PURPLE)
    task(478, 258, "Push notifications", "APP-137", "AS", "Shipped", GREEN)
    task(270+208*q, 176, "Offline sync", "APP-141", "MK", "Shipped" if q==1 else "Review", GREEN if q==1 else BLUE)
    task(62+208*p, 176+82*p, "Sign-in polish", "APP-142", "JL", "In progress" if p==1 else "Ready", PURPLE)
    if 1.1 < t < 4.7:
        r = ease(t, 1.1, .8)
        c.cursor(194+(153-194)*r+208*p, 294+(211-294)*r+82*p, 2.15<t<2.5)
    c.reveal(t, 7, lambda: c.pill(52, 355, "Activity   Offline sync shipped · Maya moved APP-141", GREEN, "#e8f5ee", 12))
    c.caption("02", "Keep the next release moving", ["Drag a task into progress, watch a review finish,", "and see the sprint summary update in place."], BLUE)
    return c.im


def support(t):
    c = Canvas("#f9efe9")
    c.panel("Support inbox", "TEAM WORKSPACE", "#c37842")
    c.line([(284,78),(284,399)])
    c.text(56, 94, "INCOMING", 10, MUTED, True)
    rows = [("AM", "Ava Morgan", "Export missing columns", "#f2e4d9"), ("RC", "Ravi Chen", "Update billing contact", "#e8ecfb"), ("LT", "Lena Torres", "Invite a teammate", "#e5f1ec")]
    for i,(initials,name,subject,bg) in enumerate(rows):
        y=124+i*77
        c.box((48,y,272,y+68), "#fbf0e8" if i==0 else "#fafafa", 10)
        c.avatar(70,y+22,initials,"#b77951" if i==0 else "#97a4b5",radius=12)
        c.text(91,y+9,name,12,bold=True)
        c.text(60,y+40,subject,11,MUTED)
    c.pill(54, 365, "3 open conversations", MUTED, "#f4f4f5", 10)
    c.text(304, 98, "Export missing columns", 17, bold=True)
    c.text(304, 127, "Ava · 2 minutes ago", 11, MUTED)
    c.box((304,155,662,216),"#f7f8fa",10)
    c.text(316, 166, "My CSV export is missing the owner field.", 12)
    c.text(316, 187, "Can you help before our weekly review?", 12)

    def tags():
        c.pill(304,231,"Exports",PURPLE,"#f1edf9")
        c.pill(389,231,"Priority · High","#a46428","#fcf0df")
    c.reveal(t,1.3,tags)

    def route():
        c.box((304,270,662,317),"#f7f8fa",10,LINE)
        c.avatar(324,293,"M",GREEN,size=10)
        c.text(344,277,"Maya · Product support",12,bold=True)
        c.text(344,296,"Assigned by the exports routing rule",10,MUTED)
    c.reveal(t,3.0,route)

    def draft():
        c.pill(304,337,"Reply draft ready",GREEN,"#e8f5ee",12)
        c.text(304,369,"Waiting for your review before sending",10,MUTED)
    c.reveal(t,5.1,draft)
    c.caption("03", "From incoming to ready to reply", ["Identify the topic, set the priority, and route the ticket.", "A suggested reply waits for a teammate to review."], "#ac6a37")
    return c.im


def inventory(t):
    c=Canvas("#eaf3ef")
    c.panel("Inventory forecast", "TRAIL / 24L PACK", GREEN)
    c.text(56,96,"ON HAND",10,MUTED,True)
    c.text(56,110,"128",32,bold=True)
    c.text(130,130,"units",12,MUTED)
    c.text(244,96,"AVG. DAILY ORDERS",10,MUTED,True)
    c.text(244,110,"18",32,bold=True)
    c.text(436,96,"COVER REMAINING",10,MUTED,True)
    c.text(436,110,"7 days",32,bold=True)
    left,right,top,bottom=78,640,177,288
    for value in (0,64,128):
        y=bottom-value/128*(bottom-top)
        c.line([(left,y),(right,y)])
        c.text(49,y-8,str(value),10,MUTED)
    threshold=bottom-36/128*(bottom-top)
    data=[128,119,110,102,88,74,55,37,19,0]
    p=ease(t,.8,3.1)
    extent=p*(len(data)-1)
    points=[]
    for j in range(int(extent)+1):
        points.append((left+j/(len(data)-1)*(right-left),bottom-data[j]/128*(bottom-top)))
    if extent < len(data)-1:
        j=int(extent)
        v=data[j]+(data[j+1]-data[j])*(extent-j)
        points.append((left+extent/(len(data)-1)*(right-left),bottom-v/128*(bottom-top)))
    if len(points)>1:
        c.d.polygon([(round(x*SCALE),round(y*SCALE)) for x,y in [(left,bottom)]+points+[(points[-1][0],bottom)]],fill="#ecf6f1")
        c.line(points,GREEN,2.5)
    for x in range(left,right,10):
        c.line([(x,threshold),(x+5,threshold)],"#d4af76")
    c.text(79,threshold-19,"Reorder point",10,"#a57a3f")
    c.dot(*points[-1],GREEN,4)
    for x,label in [(78,"Today"),(261,"+3 days"),(449,"+6 days"),(596,"+9 days")]:
        c.text(x,297,label,10,MUTED)

    def warning():
        c.pill(425,197,"Stockout projected · Oct 8","#a56a23","#fff2df",11)
    c.reveal(t,4.3,warning)

    def purchase():
        c.box((56,331,664,382),"#eef7f2",10)
        c.text(70,339,"Suggested reorder: 240 units",13,GREEN,True)
        c.text(70,359,"Supplier lead time · 4 days",11,MUTED)
        c.pill(494,344,"Review order",GREEN,"white",12)
    c.reveal(t,5.6,purchase)
    c.caption("04", "See the shortage before it happens", ["A stock forecast crosses the reorder threshold", "and turns a projected shortage into a reviewable order."], GREEN)
    return c.im


SCENES={"assistant-tool-calls":assistant,"sprint-board":sprint,"support-triage":support,"inventory-forecast":inventory}


def render(name, scene):
    initial=scene(0)
    frames=[]
    for i in range(round(FPS*SECONDS)):
        t=i/FPS
        frame=scene(t)
        # A quiet crossfade restores the initial state before the loop boundary.
        frame=Image.blend(frame,initial,ease(t,10.2,1.2))
        frames.append(frame.resize((W,H),Image.Resampling.LANCZOS))
    # One palette across every frame prevents color shimmer in static surfaces.
    swatches=Image.new("RGB",(W,H*len(frames[::10])))
    for i,frame in enumerate(frames[::10]):
        swatches.paste(frame,(0,H*i))
    palette=swatches.quantize(colors=192)
    indexed=[frame.quantize(palette=palette,dither=Image.Dither.NONE) for frame in frames]
    indexed[0].save(OUT/f"{name}.gif",save_all=True,append_images=indexed[1:],duration=80,loop=0,optimize=True,disposal=1)
    scene(8.5).resize((W,H),Image.Resampling.LANCZOS).save(OUT/f"{name}.png")
    print(f"Rendered {name}: {W}x{H}, {SECONDS}s",flush=True)


if __name__ == "__main__":
    OUT.mkdir(parents=True,exist_ok=True)
    for name,scene in SCENES.items():
        render(name,scene)
