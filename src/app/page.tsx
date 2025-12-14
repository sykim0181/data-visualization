import KPIs from "@/components/KPIs";
import SalesTable from "@/components/SalesTable";
import YearlyMonthlySalesChart from "@/components/YearlyMonthlySalesChart";
import {
  // loadCountryTop10,
  // loadItemTypeShare,
  loadKPI,
  loadSalesByYearMonth,
  loadSalesRaw,
} from "@/lib/sales/loaders";

export default async function Home() {
  const records = await loadSalesRaw();
  const yearMonthSummary = await loadSalesByYearMonth();
  const kpi = await loadKPI();
  // const countryTop10 = await loadCountryTop10();
  // const itemTypeShare = await loadItemTypeShare();

  return (
    <div>
      <div className="w-[1000px] flex flex-col gap-8 mx-auto">
        <KPIs kpi={kpi} />

        <YearlyMonthlySalesChart data={yearMonthSummary} />

        <div>
          <SalesTable records={records} />
        </div>
      </div>
    </div>
  );
}
