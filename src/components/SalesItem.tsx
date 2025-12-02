import { SalesRecord } from "@/lib/sales/types";
import { useState } from "react";

const colors = ["#00A0FA", "#FF1C30", "#2BBFA7", "#FF00F7", "#FF9800"];

interface Props {
  item: SalesRecord;
  index: number;
}

const SaleItem = ({ item, index }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 border-b">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <div style={{ fontWeight: 600 }}>
          {index + 1}. {item.country} - {item.itemType}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>
          {item.salesChannel} | Units: {item.unitsSold.toLocaleString()} |
          Profit: {item.totalProfit.toLocaleString()}
        </div>
      </div>
      {isOpen && (
        <>
          <div
            style={{
              width: 20 * item.country.length,
              height: 20 * item.country.length,
              backgroundColor: colors[index % colors.length],
            }}
          />
          <p>
            주문일 {item.orderDate} | 수익 {item.totalProfit.toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
};

export default SaleItem;
