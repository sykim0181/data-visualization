import type {
  SalesRecordRaw,
  SalesRecord,
  SalesByYear,
  KPI,
  itemTypeShare,
} from "./types";

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

export function buildKpis(records: SalesRecord[]): KPI {
  let totalRevenue = 0;
  let totalProfit = 0;
  let totalUnitsSold = 0;

  for (const r of records) {
    totalRevenue += r.totalRevenue;
    totalProfit += r.totalProfit;
    totalUnitsSold += r.unitsSold;
  }

  return {
    totalRevenue,
    totalProfit,
    totalUnitsSold,
    orderCount: records.length,
  };
}

export function buildCountryTop10(records: SalesRecord[]) {
  const map = new Map<string, number>();

  for (const r of records) {
    map.set(r.country, (map.get(r.country) ?? 0) + r.totalRevenue);
  }

  return Array.from(map.entries())
    .map(([country, totalRevenue]) => ({ country, totalRevenue }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 10);
}

export function buildItemTypeShare(records: SalesRecord[]): itemTypeShare[] {
  const map = new Map<string, number>();

  for (const r of records) {
    map.set(r.itemType, (map.get(r.itemType) ?? 0) + r.unitsSold);
  }

  return Array.from(map.entries()).map(([itemType, unitsSold]) => ({
    itemType,
    unitsSold,
  }));
}
