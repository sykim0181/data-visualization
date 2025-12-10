import SalesTable from "@/components/SalesTable";
import YearlyMonthlySalesChart from "@/components/YearlyMonthlySalesChart";
import { loadSalesByYearMonth, loadSalesRaw } from "@/lib/sales/loaders";

export default async function Home() {
  const records = await loadSalesRaw();
  const yearMonthSummary = await loadSalesByYearMonth();

  return (
    <div>
      <div className="w-[1000px] flex flex-col gap-8 mx-auto">
        <YearlyMonthlySalesChart data={yearMonthSummary} />

        <div>
          <SalesTable records={records} />
        </div>
      </div>
    </div>
  );
}
