import rasterio
from pathlib import Path

project_root = Path(r"F:\sim")

era5_file = (
    project_root
    / "dataset"
    / "raw"
    / "era5"
    / "remal"
    / "remal_era5_timeseries_20240524_20240527.tif"
)

with rasterio.open(era5_file) as src:
    print("File:", era5_file)
    print("Bands:", src.count)
    print("Width:", src.width)
    print("Height:", src.height)
    print("CRS:", src.crs)
    print("Bounds:", src.bounds)
    print("Data type:", src.dtypes[0])
    print("First 20 band descriptions:")
    print(src.descriptions[:20])