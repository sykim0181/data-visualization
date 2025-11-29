import path from "path";
import fs from "fs";
import { SalesRecord } from "./types";

const ROOT_DIR = process.cwd();

export async function loadSalesRaw(): Promise<SalesRecord[]> {
  const filePath = path.join(ROOT_DIR, "public", "sales.raw.json");
  const text = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(text) as SalesRecord[];
}
