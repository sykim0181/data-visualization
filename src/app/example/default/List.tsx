"use client";

import FixedSalesRow from "@/components/list/FixedSalesRow";
import useSalesRecord from "@/hooks/useSalesRecord";

const List = () => {
  const { records, isFetched } = useSalesRecord();

  return (
    <div className="w-[1200px] h-[600px] overflow-auto border">
      {isFetched ? (
        records.map((record) => (
          <FixedSalesRow key={record.orderId} record={record} height={80} />
        ))
      ) : (
        <p>Loading Data...</p>
      )}
    </div>
  );
};

export default List;
