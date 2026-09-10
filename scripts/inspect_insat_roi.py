import rasterio
from pathlib import Path

project_root = Path(r"F:\sim")

file_path = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "insat_24may2024_0015_roi_epsg4326.tif"
)

with rasterio.open(file_path) as src:
    print("File:", file_path)
    print("Bands:", src.count)
    print("Width:", src.width)
    print("Height:", src.height)
    print("CRS:", src.crs)
    print("Bounds:", src.bounds)
    print("Data type:", src.dtypes)
    print("NoData:", src.nodata)
    print("Band descriptions:", src.descriptions)

print("Inspection complete.")