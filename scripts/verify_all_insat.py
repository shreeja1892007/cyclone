from pathlib import Path
import rasterio

folder = Path(r"F:\sim\dataset\processed\remal\insat")
files = sorted(folder.glob("insat_*_roi_epsg4326_6ch.tif"))

print("Processed INSAT files found:", len(files))
print("=" * 70)

reference = None
all_ok = True

for file in files:
    with rasterio.open(file) as src:
        info = (
            src.count, src.width, src.height, str(src.crs),
            tuple(src.bounds), src.descriptions
        )
        print("\nFile:", file.name)
        print("Bands:", src.count)
        print("Size:", f"{src.width} x {src.height}")
        print("CRS:", src.crs)
        print("Bounds:", src.bounds)
        print("Channels:", src.descriptions)

        if reference is None:
            reference = info
        elif info != reference:
            all_ok = False
            print("WARNING: This file does not exactly match the reference grid.")

print("\n" + "=" * 70)

if len(files) != 5:
    all_ok = False
    print("WARNING: Expected 5 processed files.")

if all_ok:
    print("RESULT: ALL 5 INSAT FILES MATCH.")
else:
    print("RESULT: CHECK WARNINGS ABOVE.")