import rasterio
import numpy as np
from pathlib import Path

project_root = Path(r"F:\sim")

insat_dir = (
    project_root
    / "dataset"
    / "raw"
    / "insat"
    / "remal"
)

channels = ["MIR", "SWIR", "TIR1", "TIR2", "VIS", "WV"]

print("INSAT-3DR 24MAY2024 0015 - CHANNEL INSPECTION")
print("=" * 65)

for channel in channels:

    file = (
        insat_dir
        / f"3RIMG_24MAY2024_0015_L1C_SGP_V01R00_IMG_{channel}.tif"
    )

    print(f"\nCHANNEL: {channel}")
    print("-" * 65)

    if not file.exists():
        print("FILE NOT FOUND:", file)
        continue

    with rasterio.open(file) as src:

        data = src.read(1, masked=True)

        values = data.compressed()
        values = values[np.isfinite(values)]

        print("File:", file.name)
        print("Bands:", src.count)
        print("Width:", src.width)
        print("Height:", src.height)
        print("CRS:", src.crs)
        print("Bounds:", src.bounds)
        print("Data type:", src.dtypes[0])
        print("NoData:", src.nodata)

        if len(values) > 0:
            print("Valid pixels:", len(values))
            print("Minimum:", float(np.min(values)))
            print("Maximum:", float(np.max(values)))
            print("Mean:", float(np.mean(values)))
        else:
            print("No valid pixels found.")

print("\nInspection complete.")