import { KPI } from "@/lib/sales/types";

interface Props {
  kpi: KPI;
}

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function formatCurrencyUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

type KPIItem = {
  label: string;
  value: string;
  sub?: string;
};

const KPIs = ({ kpi }: Props) => {
  const items: KPIItem[] = [
    { label: "Total Revenue", value: formatCurrencyUSD(kpi.totalRevenue) },
    { label: "Total Profit", value: formatCurrencyUSD(kpi.totalProfit) },
    { label: "Units Sold", value: formatNumber(kpi.totalUnitsSold) },
    { label: "Orders", value: formatNumber(kpi.orderCount) },
  ];

  return (
    <section className="w-full grid grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-gray-400 bg-white p-4"
        >
          <div className="text-sm text-gray-500">{item.label}</div>
          <div className="mt-2 text-xl font-semibold tracking-tight">
            {item.value}
          </div>
          {item.sub && (
            <div className="mt-1 text-xs text-gray-400">{item.sub}</div>
          )}
        </div>
      ))}
    </section>
  );
};

export default KPIs;
