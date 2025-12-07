import ComponentProfiler from "@/components/ComponentProfiler";
import { loadSalesRaw } from "@/lib/sales/loaders";
import List from "./List";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <ComponentProfiler id="default-list">
      <List records={records.slice(0, 50000)} />
    </ComponentProfiler>
  );
};

export default Page;
