// CSV 형식
export type SalesRecordRaw = {
  Region: string;
  Country: string;
  "Item Type": string;
  "Sales Channel": string;
  "Order Priority": string;
  "Order Date": string; // 예: "10/18/2014"
  "Order ID": string;
  "Ship Date": string;
  "Units Sold": string;
  "Unit Price": string;
  "Unit Cost": string;
  "Total Revenue": string;
  "Total Cost": string;
  "Total Profit": string;
};

export type SalesRecord = {
  region: string;
  country: string;
  itemType: string;
  salesChannel: "Online" | "Offline";
  orderPriority: "C" | "H" | "M" | "L";
  orderDate: string; // ISO 형식 "YYYY-MM-DD"
  shipDate: string; // ISO 형식
  orderId: number;
  unitsSold: number;
  unitPrice: number;
  unitCost: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
};

export type SalesMonthSummary = {
  month: number;
  totalRevenue: number;
  totalProfit: number;
  totalUnitsSold: number;
};

export type SalesByYear = {
  [year: number]: {
    [month: number]: SalesMonthSummary;
  };
};
