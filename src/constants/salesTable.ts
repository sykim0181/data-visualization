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
  { key: "orderId", header: "Order ID", width: "100px", align: "center" },
  { key: "orderDate", header: "Order Date", width: "100px", align: "center" },
  { key: "region", header: "Region", width: "200px" },
  { key: "country", header: "Country", width: "200px" },
  { key: "itemType", header: "Item Type", width: "120px" },
  {
    key: "unitsSold",
    header: "Units",
    width: "60px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
  {
    key: "totalRevenue",
    header: "Revenue",
    width: "110px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
  {
    key: "totalProfit",
    header: "Profit",
    width: "110px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
];
