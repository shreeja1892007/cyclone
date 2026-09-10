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

# Normalize timestamps to UTC.
for col in ["insat_timestamp_utc", "gpm_timestamp_utc", "era5_timestamp_utc"]:
    alignment[col] = pd.to_datetime(alignment[col], utc=True)

gpm["timestamp_utc"] = pd.to_datetime(gpm["timestamp_utc"], utc=True)
era5["timestamp_utc"] = pd.to_datetime(era5["timestamp_utc"], utc=True)
best["timestamp_utc"] = pd.to_datetime(best["timestamp_utc"], utc=True)

# Attach the exact GPM row chosen during the previous alignment step.
gpm_features = gpm.copy()
gpm_features = gpm_features.rename(
    columns={
        c: f"gpm_{c}"
        for c in gpm_features.columns
        if c != "timestamp_utc"
    }
)
gpm_features = gpm_features.rename(columns={"timestamp_utc": "gpm_timestamp_utc"})

data = alignment.merge(
    gpm_features,
    on="gpm_timestamp_utc",
    how="left",
    validate="many_to_one",
)

# Attach the exact ERA5 row chosen during the previous alignment step.
era5_features = era5.copy()
era5_features = era5_features.rename(
    columns={
        c: f"era5_{c}"
        for c in era5_features.columns
        if c != "timestamp_utc"
    }
)
era5_features = era5_features.rename(columns={"timestamp_utc": "era5_timestamp_utc"})

data = data.merge(
    era5_features,
    on="era5_timestamp_utc",
    how="left",
    validate="many_to_one",
)

# Match IBTrACS independently to the INSAT observation time.
best_features = best.copy().sort_values("timestamp_utc")
best_features = best_features.rename(
    columns={
        c: f"ibtracs_{c}"
        for c in best_features.columns
        if c != "timestamp_utc"
    }
)
best_features = best_features.rename(
    columns={"timestamp_utc": "ibtracs_timestamp_utc"}
)

data = pd.merge_asof(
    data.sort_values("insat_timestamp_utc"),
    best_features.sort_values("ibtracs_timestamp_utc"),
    left_on="insat_timestamp_utc",
    right_on="ibtracs_timestamp_utc",
    direction="nearest",
    tolerance=pd.Timedelta("90min"),
)

data["ibtracs_difference_minutes"] = (
    (data["insat_timestamp_utc"] - data["ibtracs_timestamp_utc"])
    .abs()
    .dt.total_seconds()
    / 60
)

data.to_csv(OUTPUT_FILE, index=False)

print("Multi-source sample dataset created.")
print("Rows:", len(data))
print("Columns:", len(data.columns))
print()
print("INSAT timestamps:")
print(data["insat_timestamp_utc"].to_string(index=False))
print()
print("Missing GPM matches:", int(data["gpm_timestamp_utc"].isna().sum()))
print("Missing ERA5 matches:", int(data["era5_timestamp_utc"].isna().sum()))
print("Missing IBTrACS matches:", int(data["ibtracs_timestamp_utc"].isna().sum()))
print()
print("Saved to:")
print(OUTPUT_FILE)