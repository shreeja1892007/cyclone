import re
from pathlib import Path
import numpy as np
import rasterio
from rasterio.transform import array_bounds
from rasterio.warp import Resampling, calculate_default_transform, reproject, transform_bounds
from rasterio.windows import from_bounds

ROOT = Path(r"F:\sim")
RAW = ROOT / "dataset" / "raw" / "insat" / "remal"
OUT = ROOT / "dataset" / "processed" / "remal" / "insat"
CHANNELS = ["MIR", "SWIR", "TIR1", "TIR2", "VIS", "WV"]
OUT.mkdir(parents=True, exist_ok=True)

pattern = re.compile(r"3RIMG_(\d{2}[A-Z]{3}\d{4})_(\d{4})_L1C_SGP_V01R00_IMG_(MIR|SWIR|TIR1|TIR2|VIS|WV)\.tif$", re.I)
groups = {}
for p in RAW.glob("*.tif"):
    m = pattern.match(p.name)
    if m:
        key = (m.group(1).upper(), m.group(2))
        groups.setdefault(key, {})[m.group(3).upper()] = p

print("Found timestamps:", len(groups))

for (date, time), files in sorted(groups.items()):
    missing = [c for c in CHANNELS if c not in files]
    if missing:
        print("SKIPPED", date, time, "missing:", missing)
        continue

    with rasterio.open(files["TIR1"]) as ref:
        ref_crs, ref_transform = ref.crs, ref.transform
        ref_width, ref_height, ref_bounds = ref.width, ref.height, ref.bounds
        profile = ref.profile.copy()

    for c in CHANNELS:
        with rasterio.open(files[c]) as s:
            if s.width != ref_width or s.height != ref_height or s.crs != ref_crs or s.transform != ref_transform:
                raise RuntimeError(f"Grid mismatch: {date} {time} {c}")

    src_bounds = transform_bounds("EPSG:4326", ref_crs, 80, 10, 95, 25)
    window = from_bounds(*src_bounds, transform=ref_transform).round_offsets().round_lengths()
    crop_transform = rasterio.windows.transform(window, ref_transform)
    h, w = int(window.height), int(window.width)
    bounds = array_bounds(h, w, crop_transform)

    dst_transform, dst_w, dst_h = calculate_default_transform(
        ref_crs, "EPSG:4326", w, h, *bounds
    )

    outfile = OUT / f"insat_{date.lower()}_{time}_roi_epsg4326_6ch.tif"
    profile.update(
        crs="EPSG:4326", transform=dst_transform, width=dst_w, height=dst_h,
        count=6, dtype="float32", nodata=np.nan, compress="deflate"
    )

    with rasterio.open(outfile, "w", **profile) as dst:
        for i, c in enumerate(CHANNELS, 1):
            with rasterio.open(files[c]) as s:
                arr = s.read(1, window=window).astype("float32")
                if s.nodata is not None:
                    arr[arr == s.nodata] = np.nan
                dest = np.full((dst_h, dst_w), np.nan, dtype="float32")
                reproject(
                    arr, dest,
                    src_transform=crop_transform, src_crs=ref_crs,
                    dst_transform=dst_transform, dst_crs="EPSG:4326",
                    src_nodata=np.nan, dst_nodata=np.nan,
                    resampling=Resampling.nearest
                )
                dst.write(dest, i)
                dst.set_band_description(i, c)

    print("Processed:", date, time, "->", outfile.name)

print("Processing complete.")
print("Output folder:", OUT)
