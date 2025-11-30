import ComponentProfiler from "@/components/ComponentProfiler";
import DefaultList from "@/components/DefaultList";
import { loadSalesRaw } from "@/lib/sales/loaders";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <div className="w-full h-[500px] overflow-auto border border-black">
      <ComponentProfiler id="default-list">
        <DefaultList records={records} />
      </ComponentProfiler>
    </div>
  );
};

export default Page;
