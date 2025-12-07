import { SalesRecord } from "@/lib/sales/types";

const FixedSalesRow = ({
  record,
  height,
}: {
  record: SalesRecord;
  height: number;
}) => {
  return (
    <div
      className="flex items-center px-4 border-b bg-white"
      style={{ height }}
    >
      {/* 주문 번호 */}
      <div className="w-28 font-semibold text-sm">#{record.orderId}</div>

      {/* 지역 / 국가 */}
      <div className="flex-1 text-xs text-gray-500">
        {record.region} · {record.country}
      </div>

      {/* 채널 */}
      <div className="w-24 text-xs text-gray-700">{record.salesChannel}</div>

      {/* Item type */}
      <div className="w-32 text-xs text-gray-700 truncate">
        {record.itemType}
      </div>

      {/* Profit */}
      <div
        className={`w-24 text-right text-sm font-semibold ${
          record.totalProfit > 0 ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {record.totalProfit > 0 ? "+" : ""}
        {record.totalProfit.toLocaleString()}
      </div>
    </div>
  );
};

export default FixedSalesRow;
