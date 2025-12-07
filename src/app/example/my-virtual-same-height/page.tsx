import ComponentProfiler from "@/components/ComponentProfiler";
import { loadSalesRaw } from "@/lib/sales/loaders";
import List from "./List";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <ComponentProfiler id="my-virtual-list-with-same-height-row">
      <List records={records} rowHeight={80} overscan={3} />
    </ComponentProfiler>
  );
};

export default Page;
