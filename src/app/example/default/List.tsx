"use client";

import FixedSalesRow from "@/components/list/FixedSalesRow";
import { SalesRecord } from "@/lib/sales/types";

const List = ({ records }: { records: SalesRecord[] }) => {
  return (
    <div className="h-[600px] overflow-auto border">
      {records.map((record) => (
        <FixedSalesRow key={record.orderId} record={record} height={80} />
      ))}
    </div>
  );
};

export default List;
