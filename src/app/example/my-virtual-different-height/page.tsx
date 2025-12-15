import ComponentProfiler from "@/components/ComponentProfiler";
// import { loadSalesRaw } from "@/lib/sales/loaders";
import List from "./List";

const Page = async () => {
  // const records = await loadSalesRaw();

  return (
    <ComponentProfiler id="my-virtual-list-with-different-height-row">
      <List estimatedRowHeight={80} overscan={5} />
    </ComponentProfiler>
  );
};

export default Page;
