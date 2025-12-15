import Header from "@/components/Header";
import ItemTypePieChart from "@/components/ItemTypePieChart";
import KPIs from "@/components/KPIs";
import SalesTable from "@/components/SalesTable";
import TopCountryBarChart from "@/components/TopCountryBarChart";
import YearlyMonthlySalesChart from "@/components/YearlyMonthlySalesChart";
import {
  loadCountryTop10,
  loadItemTypeShare,
  loadKPI,
  loadSalesByYearMonth,
  // loadSalesRaw,
} from "@/lib/sales/loaders";

export default async function Home() {
  // const records = await loadSalesRaw();
  const yearMonthSummary = await loadSalesByYearMonth();
  const kpi = await loadKPI();
  const countryTop10 = await loadCountryTop10();
  const itemTypeShare = await loadItemTypeShare();

  return (
    <div className="py-8 bg-(--background)">
      <div className="w-[1200px] mx-auto">
        <Header />
        <main className="mt-8 w-full flex flex-col gap-8">
          <h1 className="font-bold text-2xl">Analytics</h1>
          <KPIs kpi={kpi} />
          <YearlyMonthlySalesChart data={yearMonthSummary} />
          <ItemTypePieChart data={itemTypeShare} />
          <TopCountryBarChart data={countryTop10} />
          <SalesTable />
        </main>
      </div>
    </div>
  );
}
