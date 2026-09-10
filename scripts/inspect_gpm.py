import rasterio
from pathlib import Path

project_root = Path(r"F:\sim")

gpm_file = (
    project_root
    / "dataset"
    / "raw"
    / "gpm"
    / "remal"
    / "remal_gpm_timeseries_20240524_20240527.tif"
)

with rasterio.open(gpm_file) as src:
    print("File:", gpm_file)
    print("Bands:", src.count)
    print("Width:", src.width)
    print("Height:", src.height)
    print("CRS:", src.crs)
    print("Bounds:", src.bounds)
    print("Data type:", src.dtypes[0])
    print("Band descriptions:", src.descriptions[:10])