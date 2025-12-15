"use client";

import { SALES_COLUMNS } from "@/constants/salesTable";
import { SalesRecord } from "@/lib/sales/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import SalesTableRow from "./SalesTableRow";

interface Props {
  records: SalesRecord[];
}

const SalesTable = ({ records }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: records.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 15,
  });

  const items = virtualizer.getVirtualItems();

  const gridTemplateColumns = SALES_COLUMNS.map((col) => col.width).join(" ");

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-400 text-sm">
      <div ref={parentRef} className="relative w-full h-[600px] overflow-auto">
        {/* 헤더 */}
        <div
          className="w-fit grid sticky top-0 bg-gray-100 py-2 border-b border-gray-400 z-1"
          style={{
            gridTemplateColumns,
          }}
        >
          {SALES_COLUMNS.map((col) => (
            <div key={col.key} className="text-center">
              {col.header}
            </div>
          ))}
        </div>

        {/* 데이터 */}
        <div
          style={{ height: virtualizer.getTotalSize() }}
          className="relative"
        >
          <div className="absolute left-0" style={{ top: items[0]?.start ?? 0 }}>
            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                className="border-b border-gray-400"
                ref={virtualizer.measureElement}
              >
                <SalesTableRow record={records[virtualRow.index]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
