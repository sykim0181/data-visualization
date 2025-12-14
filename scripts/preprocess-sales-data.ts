import fs from "fs";
import path from "path";
import Papa from "papaparse";

import type { SalesRecordRaw } from "../src/lib/sales/types";
import {
  buildCountryTop10,
  buildItemTypeShare,
  buildKpis,
  groupByYearMonth,
  normalizeSalesRecord,
} from "../src/lib/sales/utils";

const ROOT_DIR = path.resolve(__dirname, "..");
const INPUT_CSV = path.join(ROOT_DIR, "data", "100000_Sales_Records.csv");
const OUTPUT_RAW_JSON = path.join(ROOT_DIR, "public", "sales.raw.json");
const OUTPUT_BY_YEAR_MONTH_JSON = path.join(
  ROOT_DIR,
  "public",
  "sales.by-year-month.json"
);
const OUTPUT_KPI = path.join(ROOT_DIR, "public", "sales.kpi.json");
const OUTPUT_COUNTRY_TOP_10 = path.join(
  ROOT_DIR,
  "public",
  "sales.top-10-country.json"
);
const OUTPUT_SHARE_ITEM_TYPE = path.join(
  ROOT_DIR,
  "public",
  "sales.item-type-share.json"
);

function readCSVFile(filePath: string): Promise<SalesRecordRaw[]> {
  return new Promise((resolve, reject) => {
    const file = fs.createReadStream(filePath);

    Papa.parse<SalesRecordRaw>(file, {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        if (results.errors && results.errors.length > 0) {
          console.error("CSV parse errors:", results.errors.slice(0, 3));
        }
        resolve(results.data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

async function main() {
  console.log("📥 Reading CSV:", INPUT_CSV);
  const rawRows = await readCSVFile(INPUT_CSV);
  console.log(`- Raw rows: ${rawRows.length}`);

  const normalized = [];
  let errorCount = 0;

  for (const row of rawRows) {
    try {
      const record = normalizeSalesRecord(row);
      normalized.push(record);
    } catch (e) {
      errorCount += 1;
      if (errorCount <= 5) {
        console.warn("⚠️  Failed to parse row:", row, e);
      }
    }
  }

  console.log(`✅ Normalized records: ${normalized.length}`);
  if (errorCount > 0) {
    console.log(`⚠️  Skipped rows: ${errorCount}`);
  }

  fs.writeFileSync(OUTPUT_RAW_JSON, JSON.stringify(normalized), "utf-8");
  console.log("💾 Saved raw data to:", OUTPUT_RAW_JSON);

  // 월별 집계 데이터 저장 (차트 전용)
  const byYearMonth = groupByYearMonth(normalized);
  fs.writeFileSync(
    OUTPUT_BY_YEAR_MONTH_JSON,
    JSON.stringify(byYearMonth),
    "utf-8"
  );
  console.log(
    "💾 Saved monthly aggregated data to:",
    OUTPUT_BY_YEAR_MONTH_JSON
  );

  const kpis = buildKpis(normalized);
  fs.writeFileSync(OUTPUT_KPI, JSON.stringify(kpis), "utf-8");
  console.log("💾 Saved KPI data to:", OUTPUT_KPI);

  const countryTop10ByRevenue = buildCountryTop10(normalized);
  fs.writeFileSync(
    OUTPUT_COUNTRY_TOP_10,
    JSON.stringify(countryTop10ByRevenue),
    "utf-8"
  );
  console.log("💾 Saved Top 10 Country data to:", OUTPUT_COUNTRY_TOP_10);

  const itemTypeShareByUnits = buildItemTypeShare(normalized);
  fs.writeFileSync(
    OUTPUT_SHARE_ITEM_TYPE,
    JSON.stringify(itemTypeShareByUnits),
    "utf-8"
  );
  console.log("💾 Saved Share of Item Type data to:", OUTPUT_COUNTRY_TOP_10);

  console.log("🎉 Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
