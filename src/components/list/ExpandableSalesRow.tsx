import { SalesRecord } from "@/lib/sales/types";
import { useState } from "react";

const currency = (v: number) =>
  v.toLocaleString("en-US", { maximumFractionDigits: 0 });

const ExpandableSalesRow = ({ record }: { record: SalesRecord }) => {
  const [expanded, setExpanded] = useState(false);

  const profitColor =
    record.totalProfit > 0 ? "text-emerald-600" : "text-red-600";

  return (
    <div
      className="p-4 bg-white cursor-pointer select-none hover:bg-gray-50 transition-colors"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {/* 상단 요약 영역 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div className="text-xs text-gray-500">
            {record.region} · {record.country}
          </div>
          <div className="font-semibold text-sm">
            Order #{record.orderId.toString()}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
            {record.salesChannel} · {record.itemType}
          </div>
          <div className={`text-sm font-semibold ${profitColor}`}>
            {record.totalProfit > 0 ? "+" : ""}${currency(record.totalProfit)}
          </div>
        </div>
      </div>

      {/* 날짜 / 우선순위 간단 표기 */}
      <div className="mt-1 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
        <div>
          {record.orderDate} → {record.shipDate}
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold">
            {record.orderPriority}
          </span>
          <span>{expanded ? "▲ 상세 접기" : "▼ 상세 보기"}</span>
        </div>
      </div>

      {/* 펼쳐지는 상세 영역 */}
      {expanded && (
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-700">
          <div>
            <span className="font-semibold">Units sold: </span>
            {record.unitsSold.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Unit price: </span>$
            {currency(record.unitPrice)}
          </div>
          <div>
            <span className="font-semibold">Unit cost: </span>$
            {currency(record.unitCost)}
          </div>
          <div>
            <span className="font-semibold">Revenue: </span>$
            {currency(record.totalRevenue)}
          </div>
          <div>
            <span className="font-semibold">Total cost: </span>$
            {currency(record.totalCost)}
          </div>
          <div>
            <span className="font-semibold">Profit: </span>
            <span className={profitColor}>
              {record.totalProfit > 0 ? "+" : ""}${currency(record.totalProfit)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableSalesRow;
