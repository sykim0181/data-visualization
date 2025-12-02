"use client";

import MyDynamicVirtualList from "@/components/MyDynamicVirtualList";
import SaleItem from "@/components/SalesItem";
import { SalesRecord } from "@/lib/sales/types";

const PageClient = ({ items }: { items: SalesRecord[] }) => {
  return (
    <MyDynamicVirtualList
      items={items}
      height={600}
      estimatedItemHeight={80}
      overscanCount={5}
      renderItem={(item, index) => <SaleItem item={item} index={index} />}
    />
  );
};

export default PageClient;
