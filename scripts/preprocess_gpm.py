import rasterio
import pandas as pd
import numpy as np
from pathlib import Path
from datetime import datetime

project_root = Path(r"F:\sim")

input_file = (
    project_root
    / "dataset"
    / "raw"
    / "gpm"
    / "remal"
    / "remal_gpm_timeseries_20240524_20240527.tif"
)

output_file = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "remal_gpm_summary.csv"
)

records = []

with rasterio.open(input_file) as src:

    print("Reading GPM file...")
    print("Total bands:", src.count)

    for band_number in range(1, src.count + 1):

        description = src.descriptions[band_number - 1]

        # Example:
        # 20240524000000_precipitation
        timestamp_text = description.split("_")[0]

        timestamp = datetime.strptime(
            timestamp_text,
            "%Y%m%d%H%M%S"
        )

        rainfall = src.read(band_number, masked=True)

        # Keep only finite, non-negative precipitation values
        values = rainfall.compressed()
        values = values[np.isfinite(values)]
        values = values[values >= 0]

        if len(values) > 0:
            mean_rainfall = float(np.mean(values))
            max_rainfall = float(np.max(values))
        else:
            mean_rainfall = np.nan
            max_rainfall = np.nan

        records.append({
            "timestamp_utc": timestamp,
            "gpm_mean_precip_mm_hr": mean_rainfall,
            "gpm_max_precip_mm_hr": max_rainfall
        })

df = pd.DataFrame(records)

df = df.sort_values("timestamp_utc").reset_index(drop=True)

df.to_csv(output_file, index=False)

print("\nGPM preprocessing complete.")
print("Rows created:", len(df))
print("First timestamp:", df["timestamp_utc"].min())
print("Last timestamp:", df["timestamp_utc"].max())

print("\nFirst 5 rows:")
print(df.head())

print("\nSaved to:")
print(output_file)