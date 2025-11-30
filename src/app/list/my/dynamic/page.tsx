import ComponentProfiler from "@/components/ComponentProfiler";
import { loadSalesRaw } from "@/lib/sales/loaders";
import PageClient from "./PageClient";

const Page = async () => {
  const records = await loadSalesRaw();

  return (
    <div className="h-[600px]">
      <ComponentProfiler id="my-dynamic-virtual-list">
        <PageClient items={records} />
      </ComponentProfiler>
    </div>
  );
};

export default Page;
