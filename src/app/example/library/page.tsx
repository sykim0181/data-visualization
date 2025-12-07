import ComponentProfiler from "@/components/ComponentProfiler";
import { loadSalesRaw } from "@/lib/sales/loaders";
import List from "./List";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <ComponentProfiler id="library-dynamic-virtual-list">
      <List records={records} />
    </ComponentProfiler>
  );
};

export default Page;
