"""Render README assets from the live HTML/CSS/SVG examples.

Requires Node, Playwright with Chromium, and Pillow. See README.md for setup.
No illustration is redrawn in Python: the browser is the source of every pixel.
"""

import argparse
from pathlib import Path
import subprocess
import tempfile

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "examples"
SIZE = (400, 520)
SCENES = ("assistant-tool-calls", "release-pipeline", "support-triage", "inventory-forecast")


def downsample(path):
    with Image.open(path) as image:
        return image.convert("RGB").resize(SIZE, Image.Resampling.LANCZOS)


def encode(scene, directory, stills_only):
    downsample(directory / "still.png").save(OUT / f"{scene}.png")
    if stills_only:
        return
    frames = [downsample(path) for path in sorted(directory.glob("[0-9][0-9][0-9].png"))]
    # A shared palette prevents the background and accents drifting between frames.
    # Sample the complete loop, including the completed and initial states.
    samples = frames[::12] + [frames[-1]]
    palette_sheet = Image.new("RGB", (200 * len(samples), 260))
    for index, frame in enumerate(samples):
        palette_sheet.paste(frame.resize((200, 260), Image.Resampling.LANCZOS), (index * 200, 0))
    palette = palette_sheet.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    indexed = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
    indexed[0].save(
        OUT / f"{scene}.gif", save_all=True, append_images=indexed[1:],
        duration=50, loop=0, optimize=False, disposal=1,
    )
    print(f"Rendered {scene} · 400 × 520 · 12 s", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scene", choices=SCENES, help="Render only one example")
    parser.add_argument("--stills", action="store_true", help="Regenerate PNGs only")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="animated-feature-frames-") as temporary:
        command = ["node", str(ROOT / "scripts" / "capture_examples.mjs"), "--output", temporary]
        if args.scene:
            command.extend(["--scene", args.scene])
        if args.stills:
            command.append("--stills")
        subprocess.run(command, check=True)
        for scene in (args.scene,) if args.scene else SCENES:
            encode(scene, Path(temporary) / scene, args.stills)


if __name__ == "__main__":
    main()
