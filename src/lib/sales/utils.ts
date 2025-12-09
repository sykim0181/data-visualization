import type { SalesRecordRaw, SalesRecord, SalesByYear } from "./types";

function parseNumber(value: string): number {
  // "1,234.56" 같은 형식 대비
  const cleaned = value.replace(/,/g, "").trim();
  const num = Number(cleaned);
  if (Number.isNaN(num)) {
    throw new Error(`Invalid number: "${value}"`);
  }
  return num;
}

function parseDateToISO(value: string): string {
  // CSV는 대부분 "M/D/YYYY" 형식 (예: "10/18/2014")
  const trimmed = value.trim();
  const [m, d, y] = trimmed.split("/").map((v) => Number(v));
  if (!m || !d || !y) {
    throw new Error(`Invalid date: "${value}"`);
  }
  const date = new Date(y, m - 1, d);
  // YYYY-MM-DD 형식
  return date.toISOString().slice(0, 10);
}

export function normalizeSalesRecord(raw: SalesRecordRaw): SalesRecord {
  return {
    region: raw.Region.trim(),
    country: raw.Country.trim(),
    itemType: raw["Item Type"].trim(),
    salesChannel:
      raw["Sales Channel"].trim() === "Online" ? "Online" : "Offline",
    orderPriority: raw["Order Priority"].trim() as "C" | "H" | "M" | "L",
    orderDate: parseDateToISO(raw["Order Date"]),
    shipDate: parseDateToISO(raw["Ship Date"]),
    orderId: parseNumber(raw["Order ID"]),
    unitsSold: parseNumber(raw["Units Sold"]),
    unitPrice: parseNumber(raw["Unit Price"]),
    unitCost: parseNumber(raw["Unit Cost"]),
    totalRevenue: parseNumber(raw["Total Revenue"]),
    totalCost: parseNumber(raw["Total Cost"]),
    totalProfit: parseNumber(raw["Total Profit"]),
  };
}

export function groupByYearMonth(records: SalesRecord[]): SalesByYear {
  const result: SalesByYear = {};

  for (const r of records) {
    // "YYYY-MM-DD"
    const year = Number(r.orderDate.slice(0, 4));
    const month = Number(r.orderDate.slice(5, 7)); // "01" → 1

    if (!result[year]) {
      result[year] = {};
    }

    if (!result[year][month]) {
      result[year][month] = {
        month,
        totalRevenue: 0,
        totalProfit: 0,
        totalUnitsSold: 0,
      };
    }

    const bucket = result[year][month];
    bucket.totalRevenue += r.totalRevenue;
    bucket.totalProfit += r.totalProfit;
    bucket.totalUnitsSold += r.unitsSold;
  }

  return result;
}
