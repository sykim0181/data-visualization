import path from "path";
import fs from "fs";
import { KPI, SalesByYear, SalesRecord } from "./types";

const ROOT_DIR = process.cwd();

export async function loadSalesRaw(): Promise<SalesRecord[]> {
  const filePath = path.join(ROOT_DIR, "public", "sales.raw.json");
  const text = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(text) as SalesRecord[];
}

export async function loadSalesByYearMonth(): Promise<SalesByYear> {
  const filePath = path.join(ROOT_DIR, "public", "sales.by-year-month.json");
  const text = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(text) as SalesByYear;
}

export async function loadKPI(): Promise<KPI> {
  const filePath = path.join(ROOT_DIR, "public", "sales.kpi.json");
  const text = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(text) as KPI;
}

export async function loadCountryTop10(): Promise<
  { country: string; totalRevenue: number }[]
> {
  const filePath = path.join(ROOT_DIR, "public", "sales.top-10-country.json");
  const text = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(text) as { country: string; totalRevenue: number }[];
}

export async function loadItemTypeShare(): Promise<
  {
    itemType: string;
    unitsSold: number;
  }[]
> {
  const filePath = path.join(ROOT_DIR, "public", "sales.item-type-share.json");
  const text = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(text) as { itemType: string; unitsSold: number }[];
}
