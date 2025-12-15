"use client";

import { SALES_COLUMNS } from "@/constants/salesTable";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import SalesTableRow from "./SalesTableRow";
import useSalesRecord from "@/hooks/useSalesRecord";

const SalesTable = () => {
  const { records } = useSalesRecord();

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
    <div className="w-full px-[5px] rounded-2xl overflow-hidden text-sm bg-(--card)">
      <div ref={parentRef} className="relative w-full h-[600px] overflow-auto">
        {/* 헤더 */}
        <div
          className="w-fit grid sticky top-0 py-4 pr-[10px] z-1 bg-(--card) text-(--text-secondary)"
          style={{
            gridTemplateColumns,
          }}
        >
          {SALES_COLUMNS.map((col) => (
            <div key={col.key} className="text-center" style={{ textAlign: col.align ?? "left" }}>
              {col.header}
            </div>
          ))}
        </div>

        {/* 데이터 */}
        <div
          style={{ height: virtualizer.getTotalSize() }}
          className="relative"
        >
          <div className="absolute left-0 flex flex-col gap-2" style={{ top: items[0]?.start ?? 0 }}>
            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
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
