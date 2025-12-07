"use client";

import ExpandableSalesRow from "@/components/list/ExpandableSalesRow";
import StaticSalesRow from "@/components/list/StaticSalesRow";
import { SalesRecord } from "@/lib/sales/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface Props {
  records: SalesRecord[];
}

const List = ({ records }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: records.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className="h-[600px] overflow-y-auto border">
      <div
        className="w-full relative"
        style={{ height: virtualizer.getTotalSize() }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }}
        >
          {items.map((virtualRow) => (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              className="border-b"
            >
              {/* <ExpandableSalesRow record={records[virtualRow.index]} /> */}
              <StaticSalesRow record={records[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
