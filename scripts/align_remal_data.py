import pandas as pd
from pathlib import Path

project_root = Path(r"F:\sim")

processed_dir = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
)

era5_file = processed_dir / "remal_era5_summary.csv"
gpm_file = processed_dir / "remal_gpm_summary.csv"
track_file = processed_dir / "remal_best_track_clean.csv"

output_file = processed_dir / "remal_aligned_dataset.csv"

# Load datasets
era5 = pd.read_csv(era5_file)
gpm = pd.read_csv(gpm_file)
track = pd.read_csv(track_file)

# Convert timestamps
era5["timestamp_utc"] = pd.to_datetime(
    era5["timestamp_utc"],
    utc=True
)

gpm["timestamp_utc"] = pd.to_datetime(
    gpm["timestamp_utc"],
    utc=True
)

track["ISO_TIME"] = pd.to_datetime(
    track["ISO_TIME"],
    utc=True
)

# --------------------------------------------------
# STEP 1: ERA5 + GPM
# --------------------------------------------------

# Keep GPM observations exactly on the hour
gpm_hourly = gpm[
    gpm["timestamp_utc"].dt.minute == 0
].copy()

aligned = pd.merge(
    era5,
    gpm_hourly,
    on="timestamp_utc",
    how="left"
)

# --------------------------------------------------
# STEP 2: Attach nearest best-track observation
# --------------------------------------------------

aligned = aligned.sort_values("timestamp_utc")
track = track.sort_values("ISO_TIME")

aligned = pd.merge_asof(
    aligned,
    track,
    left_on="timestamp_utc",
    right_on="ISO_TIME",
    direction="nearest",
    tolerance=pd.Timedelta("90min")
)

# --------------------------------------------------
# Save
# --------------------------------------------------

aligned.to_csv(output_file, index=False)

print("Alignment complete.")
print("Rows:", len(aligned))
print("Columns:", len(aligned.columns))

print("\nFirst timestamp:", aligned["timestamp_utc"].min())
print("Last timestamp:", aligned["timestamp_utc"].max())

print("\nRows with best-track match:")
print(aligned["LAT"].notna().sum())

print("\nFirst 5 rows:")
print(
    aligned[
        [
            "timestamp_utc",
            "gpm_mean_precip_mm_hr",
            "sea_surface_temperature_c",
            "mean_sea_level_pressure_hpa",
            "LAT",
            "LON",
            "WMO_WIND",
            "WMO_PRES",
        ]
    ].head()
)

print("\nSaved to:")
print(output_file)