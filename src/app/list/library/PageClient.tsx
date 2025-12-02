"use client";

import DynamicVirtualList from "@/components/DynamicVirtualList";
import { SalesRecord } from "@/lib/sales/types";

const PageClient = ({ items }: { items: SalesRecord[] }) => {
  return <DynamicVirtualList records={items} />;
};

export default PageClient;
