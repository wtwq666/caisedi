"""Compress store showcase photos for web (max width + JPEG quality)."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

MAX_WIDTH = 1600
JPEG_QUALITY = 82
JPEG_SUBSAMPLING = 2  # 4:2:0


def compress_one(src: Path, dest: Path) -> tuple[int, int]:
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im = im.convert("RGB")
        w, h = im.size
        if w > MAX_WIDTH:
            nh = int(h * MAX_WIDTH / w)
            im = im.resize((MAX_WIDTH, nh), Image.Resampling.LANCZOS)
        im.save(
            dest,
            "JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
            subsampling=JPEG_SUBSAMPLING,
        )
    return src.stat().st_size, dest.stat().st_size


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: compress-store-images.py <mapping.txt>")
        sys.exit(1)

    mapping_file = Path(sys.argv[1])
    total_before = 0
    total_after = 0
    for line in mapping_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        src_s, dest_s = line.split("|", 1)
        before, after = compress_one(Path(src_s), Path(dest_s))
        total_before += before
        total_after += after
        print(f"{Path(dest_s).name}: {before // 1024}KB -> {after // 1024}KB")

    print(f"Total: {total_before // 1024}KB -> {total_after // 1024}KB")


if __name__ == "__main__":
    main()
