import rasterio
from rasterio.enums import Resampling
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

output_dir = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
)

output_dir.mkdir(parents=True, exist_ok=True)

channels = ["MIR", "SWIR", "TIR1", "TIR2", "VIS", "WV"]

files = {
    channel: insat_dir
    / f"3RIMG_24MAY2024_0015_L1C_SGP_V01R00_IMG_{channel}.tif"
    for channel in channels
}

# Use TIR1 as the reference grid
with rasterio.open(files["TIR1"]) as ref:
    profile = ref.profile.copy()
    height = ref.height
    width = ref.width
    transform = ref.transform
    crs = ref.crs

profile.update(
    count=len(channels),
    dtype="float32",
    nodata=np.nan
)

output_file = (
    output_dir
    / "insat_24may2024_0015_6channel_stack.tif"
)

with rasterio.open(output_file, "w", **profile) as dst:

    for band_index, channel in enumerate(channels, start=1):

        with rasterio.open(files[channel]) as src:

            data = src.read(1).astype("float32")

            # Apply each channel's own NoData value
            if src.nodata is not None:
                data[data == src.nodata] = np.nan

            dst.write(data, band_index)

            dst.set_band_description(
                band_index,
                channel
            )

        print(f"Added {channel}")

print("\nStack created:")
print(output_file)