import rasterio
from pathlib import Path

project_root = Path(r"F:\sim")

stack_file = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "insat_24may2024_0015_6channel_stack.tif"
)

with rasterio.open(stack_file) as src:
    print("File:", stack_file)
    print("Bands:", src.count)
    print("Width:", src.width)
    print("Height:", src.height)
    print("CRS:", src.crs)
    print("Bounds:", src.bounds)
    print("Data type:", src.dtypes)
    print("NoData:", src.nodata)
    print("Band descriptions:", src.descriptions)