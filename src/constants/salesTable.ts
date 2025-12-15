import { formatNumber } from "@/utils/formatNumber";

type SalesColumn = {
  key:
    | "orderId"
    | "orderDate"
    | "region"
    | "country"
    | "itemType"
    | "unitsSold"
    | "totalRevenue"
    | "totalProfit";
  header: string;
  width: string;
  align?: "left" | "center" | "right";
  display?: (value: unknown) => number | string;
};

export const SALES_COLUMNS: SalesColumn[] = [
  { key: "orderId", header: "Order ID", width: "130px", align: "center" },
  { key: "orderDate", header: "Order Date", width: "130px", align: "center" },
  { key: "region", header: "Region", width: "210px" },
  { key: "country", header: "Country", width: "200px" },
  { key: "itemType", header: "Item Type", width: "130px" },
  {
    key: "unitsSold",
    header: "Units",
    width: "100px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
  {
    key: "totalRevenue",
    header: "Revenue",
    width: "130px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
  {
    key: "totalProfit",
    header: "Profit",
    width: "130px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
];
