import pandas as pd
from pathlib import Path

# Project paths
project_root = Path(r"F:\sim")

input_file = (
    project_root
    / "dataset"
    / "raw"
    / "best_track"
    / "remal"
    / "remal_best_track_2024.csv"
)

output_file = (
    project_root
    / "dataset"
    / "processed"
    / "remal"
    / "remal_best_track_clean.csv"
)

# Read CSV
df = pd.read_csv(input_file)

print("Original rows:", len(df))
print("Available columns:")
print(df.columns.tolist())

# Keep the most useful best-track columns
columns_to_keep = [
    "SID",
    "SEASON",
    "BASIN",
    "SUBBASIN",
    "NAME",
    "ISO_TIME",
    "NATURE",
    "LAT",
    "LON",
    "WMO_WIND",
    "WMO_PRES",
    "WMO_AGENCY",
]

existing_columns = [c for c in columns_to_keep if c in df.columns]

df = df[existing_columns].copy()

# Convert time to proper UTC datetime
df["ISO_TIME"] = pd.to_datetime(
    df["ISO_TIME"],
    dayfirst=True,
    errors="coerce",
    utc=True
)

# Make coordinates numeric
df["LAT"] = pd.to_numeric(df["LAT"], errors="coerce")
df["LON"] = pd.to_numeric(df["LON"], errors="coerce")

# Convert wind and pressure if available
if "WMO_WIND" in df.columns:
    df["WMO_WIND"] = pd.to_numeric(df["WMO_WIND"], errors="coerce")

if "WMO_PRES" in df.columns:
    df["WMO_PRES"] = pd.to_numeric(df["WMO_PRES"], errors="coerce")

# Remove rows without timestamp or cyclone position
df = df.dropna(subset=["ISO_TIME", "LAT", "LON"])

# Sort chronologically
df = df.sort_values("ISO_TIME").reset_index(drop=True)

# Save cleaned best-track data
df.to_csv(output_file, index=False)

print("\nCleaned rows:", len(df))
print("First timestamp:", df["ISO_TIME"].min())
print("Last timestamp:", df["ISO_TIME"].max())
print("\nFirst 5 cleaned rows:")
print(df.head())

print("\nSaved to:")
print(output_file)