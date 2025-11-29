import MyVirtualList from "@/components/MyVirtualList";
import { loadSalesRaw } from "@/lib/sales/loaders";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <div className="h-[600px]">
      <MyVirtualList records={records} />
    </div>
  );
};

export default Page;
