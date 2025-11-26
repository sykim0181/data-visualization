import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

import type { SalesRecordRaw } from '../src/lib/sales/types';
import { normalizeSalesRecord } from '../src/lib/sales/utils';

const ROOT_DIR = path.resolve(__dirname, '..');
const INPUT_CSV = path.join(ROOT_DIR, 'data', '100000_Sales_Records.csv');
const OUTPUT_RAW_JSON = path.join(ROOT_DIR, 'public', 'sales.raw.json');

function readCSVFile(filePath: string): Promise<SalesRecordRaw[]> {
  return new Promise((resolve, reject) => {
    const file = fs.createReadStream(filePath);

    Papa.parse<SalesRecordRaw>(file, {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        if (results.errors && results.errors.length > 0) {
          console.error('CSV parse errors:', results.errors.slice(0, 3));
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
  console.log('📥 Reading CSV:', INPUT_CSV);
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
        console.warn('⚠️  Failed to parse row:', row, e);
      }
    }
  }

  console.log(`✅ Normalized records: ${normalized.length}`);
  if (errorCount > 0) {
    console.log(`⚠️  Skipped rows: ${errorCount}`);
  }

  fs.writeFileSync(OUTPUT_RAW_JSON, JSON.stringify(normalized), 'utf-8');
  console.log('💾 Saved raw data to:', OUTPUT_RAW_JSON);

  console.log('🎉 Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
