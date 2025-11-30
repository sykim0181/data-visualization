import ComponentProfiler from "@/components/ComponentProfiler";
import MyVirtualList from "@/components/MyVirtualList";
import { loadSalesRaw } from "@/lib/sales/loaders";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <div className="h-[600px]">
      <ComponentProfiler id="my-virtual-list">
        <MyVirtualList records={records} />
      </ComponentProfiler>
    </div>
  );
};

export default Page;
