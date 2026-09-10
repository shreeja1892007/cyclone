from pathlib import Path
import pandas as pd

ROOT = Path(r"F:\sim")
PROCESSED = ROOT / "dataset" / "processed" / "remal"

ALIGNMENT_FILE = PROCESSED / "remal_insat_time_alignment.csv"
GPM_FILE = PROCESSED / "remal_gpm_summary.csv"
ERA5_FILE = PROCESSED / "remal_era5_summary.csv"
BEST_TRACK_FILE = PROCESSED / "remal_best_track_clean.csv"
OUTPUT_FILE = PROCESSED / "remal_multisource_5sample_dataset.csv"

alignment = pd.read_csv(ALIGNMENT_FILE)
gpm = pd.read_csv(GPM_FILE)
era5 = pd.read_csv(ERA5_FILE)
best = pd.read_csv(BEST_TRACK_FILE)

for col in ["insat_timestamp_utc", "gpm_timestamp_utc", "era5_timestamp_utc"]:
    alignment[col] = pd.to_datetime(alignment[col], utc=True)

gpm["timestamp_utc"] = pd.to_datetime(gpm["timestamp_utc"], utc=True)
era5["timestamp_utc"] = pd.to_datetime(era5["timestamp_utc"], utc=True)

# IBTrACS cleaned file uses ISO_TIME, not timestamp_utc.
best["ISO_TIME"] = pd.to_datetime(best["ISO_TIME"], utc=True)

gpm_features = gpm.rename(columns={
    c: f"gpm_{c}" for c in gpm.columns if c != "timestamp_utc"
}).rename(columns={"timestamp_utc": "gpm_timestamp_utc"})

data = alignment.merge(
    gpm_features,
    on="gpm_timestamp_utc",
    how="left",
    validate="many_to_one"
)

era5_features = era5.rename(columns={
    c: f"era5_{c}" for c in era5.columns if c != "timestamp_utc"
}).rename(columns={"timestamp_utc": "era5_timestamp_utc"})

data = data.merge(
    era5_features,
    on="era5_timestamp_utc",
    how="left",
    validate="many_to_one"
)

best_features = best.rename(columns={
    c: f"ibtracs_{c}" for c in best.columns if c != "ISO_TIME"
}).rename(columns={"ISO_TIME": "ibtracs_timestamp_utc"})

data = pd.merge_asof(
    data.sort_values("insat_timestamp_utc"),
    best_features.sort_values("ibtracs_timestamp_utc"),
    left_on="insat_timestamp_utc",
    right_on="ibtracs_timestamp_utc",
    direction="nearest",
    tolerance=pd.Timedelta("90min")
)

data["ibtracs_difference_minutes"] = (
    (data["insat_timestamp_utc"] - data["ibtracs_timestamp_utc"])
    .abs()
    .dt.total_seconds() / 60
)

data.to_csv(OUTPUT_FILE, index=False)

print("Multi-source sample dataset created.")
print("Rows:", len(data))
print("Columns:", len(data.columns))
print()
print("Missing GPM matches:", int(data["gpm_timestamp_utc"].isna().sum()))
print("Missing ERA5 matches:", int(data["era5_timestamp_utc"].isna().sum()))
print("Missing IBTrACS matches:", int(data["ibtracs_timestamp_utc"].isna().sum()))
print()
print("Saved to:")
print(OUTPUT_FILE)