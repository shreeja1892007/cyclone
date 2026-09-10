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
    / "era5"
    / "remal"
    / "remal_era5_timeseries_20240524_20240527.tif"
)

output_file = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "remal_era5_summary.csv"
)

records = {}

with rasterio.open(input_file) as src:

    print("Reading ERA5 file...")
    print("Total bands:", src.count)

    for band_number in range(1, src.count + 1):

        description = src.descriptions[band_number - 1]

        # Example:
        # 20240524T00_sea_surface_temperature
        timestamp_text, variable = description.split("_", 1)

        timestamp = datetime.strptime(
            timestamp_text,
            "%Y%m%dT%H"
        )

        data = src.read(band_number, masked=True)

        values = data.compressed()
        values = values[np.isfinite(values)]

        if len(values) == 0:
            mean_value = np.nan
        else:
            mean_value = float(np.mean(values))

        if timestamp not in records:
            records[timestamp] = {
                "timestamp_utc": timestamp
            }

        records[timestamp][variable] = mean_value

df = pd.DataFrame(records.values())

df = df.sort_values("timestamp_utc").reset_index(drop=True)

# Convert Kelvin to Celsius for easier interpretation
if "sea_surface_temperature" in df.columns:
    df["sea_surface_temperature_c"] = (
        df["sea_surface_temperature"] - 273.15
    )

if "temperature_2m" in df.columns:
    df["temperature_2m_c"] = (
        df["temperature_2m"] - 273.15
    )

if "dewpoint_temperature_2m" in df.columns:
    df["dewpoint_temperature_2m_c"] = (
        df["dewpoint_temperature_2m"] - 273.15
    )

# Convert pressure from Pa to hPa
if "mean_sea_level_pressure" in df.columns:
    df["mean_sea_level_pressure_hpa"] = (
        df["mean_sea_level_pressure"] / 100.0
    )

# Calculate 10 m wind speed from u and v components
if (
    "u_component_of_wind_10m" in df.columns
    and "v_component_of_wind_10m" in df.columns
):
    df["wind_speed_10m_ms"] = np.sqrt(
        df["u_component_of_wind_10m"] ** 2
        + df["v_component_of_wind_10m"] ** 2
    )

df.to_csv(output_file, index=False)

print("\nERA5 preprocessing complete.")
print("Rows created:", len(df))
print("First timestamp:", df["timestamp_utc"].min())
print("Last timestamp:", df["timestamp_utc"].max())

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nSaved to:")
print(output_file)