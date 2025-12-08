"use client";

import { SalesRecord } from "@/lib/sales/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef } from "react";

interface Props {
  records: SalesRecord[];
}

type SalesColumn = {
  key:
    | "orderId"
    | "orderDate"
    | "region"
    | "country"
    | "itemType"
    | "unitsSold"
    | "totalRevenue"
    | "totalProfit";
  header: string;
  width: string;
  align?: "left" | "center" | "right";
  display?: (value: unknown) => number | string;
};

const SALES_COLUMNS: SalesColumn[] = [
  { key: "orderId", header: "Order ID", width: "100px", align: "center" },
  { key: "orderDate", header: "Order Date", width: "100px", align: "center" },
  { key: "region", header: "Region", width: "200px" },
  { key: "country", header: "Country", width: "200px" },
  { key: "itemType", header: "Item Type", width: "120px" },
  {
    key: "unitsSold",
    header: "Units",
    width: "100px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
  {
    key: "totalRevenue",
    header: "Revenue",
    width: "120px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
  {
    key: "totalProfit",
    header: "Profit",
    width: "120px",
    align: "right",
    display: (value: unknown) => formatNumber(value as number),
  },
];

function formatNumber(value: number) {
  return value.toLocaleString("ko", { maximumFractionDigits: 0 });
}

const SalesTable = ({ records }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: records.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 15,
  });

  const gridTemplateColumns = useMemo(
    () => SALES_COLUMNS.map((column) => column.width).join(" "),
    []
  );

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-400 text-sm">
      <div ref={parentRef} className="relative w-full h-[600px] overflow-auto">
        {/* 헤더 */}
        <div
          className="w-fit grid sticky top-0 bg-gray-100 p-2 border-b border-gray-400 z-1"
          style={{ gridTemplateColumns }}
        >
          {SALES_COLUMNS.map((col) => (
            <div key={col.key} className="px-2 text-center">
              {col.header}
            </div>
          ))}
        </div>

        {/* 데이터 */}
        <div
          style={{ height: virtualizer.getTotalSize() }}
          className="relative"
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const record = records[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                className="absolute top-0 left-0 w-fit grid p-2 border-b border-gray-400"
                ref={virtualizer.measureElement}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns,
                }}
              >
                {SALES_COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    style={{ textAlign: col.align ?? "left" }}
                    className="px-2"
                  >
                    {col.display
                      ? col.display(record[col.key])
                      : record[col.key]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
