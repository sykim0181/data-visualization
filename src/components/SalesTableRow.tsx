import { SALES_COLUMNS } from "@/constants/salesTable";
import { SalesRecord } from "@/lib/sales/types";
import { useState } from "react";

interface Props {
  record: SalesRecord;
}

const SalesTableRow = ({ record }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const gridTemplateColumns = SALES_COLUMNS.map((col) => col.width).join(" ");

  return (
    <>
      <div
        className="w-fit grid p-2 cursor-pointer"
        style={{ gridTemplateColumns }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {SALES_COLUMNS.map((col) => (
          <div
            key={col.key}
            style={{ textAlign: col.align ?? "left" }}
            className="px-2"
          >
            {col.display ? col.display(record[col.key]) : record[col.key]}
          </div>
        ))}
      </div>
      {isExpanded && (
        <div className="bg-gray-50 px-4 py-3 text-sm text-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Region / Item
              </p>
              <p className="mt-1 text-sm text-gray-900">
                {record.region} · {record.country} · {record.itemType}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Priority / Channel
              </p>
              <p className="mt-1 text-sm text-gray-900">
                {record.orderPriority} · {record.salesChannel}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Detail label="Order ID" value={record.orderId} />
            <Detail label="Order Date" value={record.orderDate} />
            <Detail label="Ship Date" value={record.shipDate} />
            <Detail
              label="Units Sold"
              value={record.unitsSold.toLocaleString()}
            />
            <Detail
              label="Unit Price"
              value={`$${record.unitPrice.toLocaleString()}`}
            />
            <Detail
              label="Unit Cost"
              value={`$${record.unitCost.toLocaleString()}`}
            />
            <Detail
              label="Total Revenue"
              value={`$${record.totalRevenue.toLocaleString()}`}
            />
            <Detail
              label="Total Cost"
              value={`$${record.totalCost.toLocaleString()}`}
            />
            <Detail
              label="Total Profit"
              value={`$${record.totalProfit.toLocaleString()}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-400 uppercase tracking-wide">
      {label}
    </span>
    <span className="text-sm text-gray-900 break-all">{value}</span>
  </div>
);

export default SalesTableRow;
