import rasterio
import numpy as np
from pathlib import Path
from rasterio.warp import calculate_default_transform, reproject, Resampling, transform_bounds
from rasterio.windows import from_bounds
from rasterio.transform import array_bounds

project_root = Path(r"F:\sim")

input_file = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "insat_24may2024_0015_6channel_stack.tif"
)

output_file = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "insat_24may2024_0015_roi_epsg4326.tif"
)

west = 80
south = 10
east = 95
north = 25

dst_crs = "EPSG:4326"

with rasterio.open(input_file) as src:
    roi_source_crs = transform_bounds(
        dst_crs,
        src.crs,
        west,
        south,
        east,
        north
    )

    window = from_bounds(
        *roi_source_crs,
        transform=src.transform
    )

    window = window.round_offsets().round_lengths()

    cropped = src.read(window=window)
    cropped_transform = src.window_transform(window)

    crop_height = cropped.shape[1]
    crop_width = cropped.shape[2]

    crop_bounds = array_bounds(
        crop_height,
        crop_width,
        cropped_transform
    )

    transform, width, height = calculate_default_transform(
        src.crs,
        dst_crs,
        crop_width,
        crop_height,
        *crop_bounds
    )

    profile = src.profile.copy()

    profile.update(
        crs=dst_crs,
        transform=transform,
        width=width,
        height=height,
        count=src.count,
        dtype="float32",
        nodata=np.nan
    )

    with rasterio.open(output_file, "w", **profile) as dst:
        for band in range(1, src.count + 1):
            destination = np.full(
                (height, width),
                np.nan,
                dtype="float32"
            )

            reproject(
                source=cropped[band - 1],
                destination=destination,
                src_transform=cropped_transform,
                src_crs=src.crs,
                dst_transform=transform,
                dst_crs=dst_crs,
                src_nodata=np.nan,
                dst_nodata=np.nan,
                resampling=Resampling.nearest
            )

            dst.write(destination, band)

            if src.descriptions[band - 1]:
                dst.set_band_description(
                    band,
                    src.descriptions[band - 1]
                )

print("INSAT ROI preprocessing complete.")
print("Saved to:")
print(output_file)