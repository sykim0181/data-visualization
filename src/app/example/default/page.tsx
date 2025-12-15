import ComponentProfiler from "@/components/ComponentProfiler";
// import { loadSalesRaw } from "@/lib/sales/loaders";
import List from "./List";

const Page = async () => {
  // const records = await loadSalesRaw();

  return (
    <ComponentProfiler id="default-list">
      <List/>
    </ComponentProfiler>
  );
};

export default Page;
