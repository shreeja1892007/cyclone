from pathlib import Path
import pandas as pd

ROOT = Path(r"F:\sim")
INSAT_DIR = ROOT / "dataset" / "processed" / "remal" / "insat"
GPM_FILE = ROOT / "dataset" / "processed" / "remal" / "remal_gpm_summary.csv"
ERA5_FILE = ROOT / "dataset" / "processed" / "remal" / "remal_era5_summary.csv"
OUTPUT_FILE = ROOT / "dataset" / "processed" / "remal" / "remal_insat_time_alignment.csv"

# Read available GPM and ERA5 timestamps
gpm = pd.read_csv(GPM_FILE)
era5 = pd.read_csv(ERA5_FILE)

gpm["timestamp_utc"] = pd.to_datetime(gpm["timestamp_utc"], utc=True)
era5["timestamp_utc"] = pd.to_datetime(era5["timestamp_utc"], utc=True)

# Extract timestamps from processed INSAT filenames
records = []

for file in sorted(INSAT_DIR.glob("insat_*_roi_epsg4326_6ch.tif")):
    # Example:
    # insat_24may2024_0015_roi_epsg4326_6ch.tif
    parts = file.stem.split("_")
    date_text = parts[1]
    time_text = parts[2]

    insat_time = pd.to_datetime(
        date_text + time_text,
        format="%d%b%Y%H%M",
        utc=True
    )

    records.append({
        "insat_file": file.name,
        "insat_timestamp_utc": insat_time
    })

insat = pd.DataFrame(records).sort_values("insat_timestamp_utc")

if insat.empty:
    raise RuntimeError(f"No processed INSAT files found in {INSAT_DIR}")

# Match each INSAT observation to nearest GPM timestamp
gpm_times = gpm[["timestamp_utc"]].drop_duplicates().sort_values("timestamp_utc")
gpm_times = gpm_times.rename(columns={"timestamp_utc": "gpm_timestamp_utc"})

aligned = pd.merge_asof(
    insat,
    gpm_times,
    left_on="insat_timestamp_utc",
    right_on="gpm_timestamp_utc",
    direction="nearest",
    tolerance=pd.Timedelta("20min")
)

# Match each INSAT observation to nearest ERA5 timestamp
era5_times = era5[["timestamp_utc"]].drop_duplicates().sort_values("timestamp_utc")
era5_times = era5_times.rename(columns={"timestamp_utc": "era5_timestamp_utc"})

aligned = pd.merge_asof(
    aligned.sort_values("insat_timestamp_utc"),
    era5_times,
    left_on="insat_timestamp_utc",
    right_on="era5_timestamp_utc",
    direction="nearest",
    tolerance=pd.Timedelta("35min")
)

# Add time differences so alignment is transparent
aligned["gpm_difference_minutes"] = (
    (aligned["insat_timestamp_utc"] - aligned["gpm_timestamp_utc"])
    .abs()
    .dt.total_seconds()
    / 60
)

aligned["era5_difference_minutes"] = (
    (aligned["insat_timestamp_utc"] - aligned["era5_timestamp_utc"])
    .abs()
    .dt.total_seconds()
    / 60
)

aligned.to_csv(OUTPUT_FILE, index=False)

print("INSAT temporal alignment complete.")
print()
print(aligned.to_string(index=False))
print()
print("Rows:", len(aligned))
print("Saved to:")
print(OUTPUT_FILE)
