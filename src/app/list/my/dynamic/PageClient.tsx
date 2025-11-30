"use client";

import MyDynamicVirtualList from "@/components/MyDynamicVirtualList";
import { SalesRecord } from "@/lib/sales/types";

const PageClient = ({ items }: { items: SalesRecord[] }) => {
  return (
    <MyDynamicVirtualList
      items={items}
      height={600}
      estimatedItemHeight={80}
      overscanCount={5}
      renderItem={(item, index) => (
        <div>
          <div style={{ fontWeight: 600 }}>
            {index + 1}. {item.country} - {item.itemType}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {item.salesChannel} | Units: {item.unitsSold.toLocaleString()} |
            Profit: {item.totalProfit.toLocaleString()}
          </div>
          {/* 여기 일부러 텍스트 길이에 따라 높이 달라지게 */}
          <p style={{ marginTop: item.country.length > 10 ? 4 : 10 * item.country.length }}>
            주문일 {item.orderDate} | 수익 {item.totalProfit.toLocaleString()}{" "}
          </p>
        </div>
      )}
    />
  );
};

export default PageClient;
