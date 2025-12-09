import SalesTable from "@/components/SalesTable";
import { loadSalesRaw } from "@/lib/sales/loaders";

export default async function Home() {
  const records = await loadSalesRaw();

  return (
    <div>
      <div className="w-[1000px] mx-auto">
        <SalesTable records={records} />
      </div>
    </div>
  );
}
