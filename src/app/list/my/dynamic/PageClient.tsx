"use client";

import MyDynamicVirtualList from "@/components/MyDynamicVirtualList";
import { SalesRecord } from "@/lib/sales/types";

const colors = ["#00A0FA", "#FF1C30", "#2BBFA7", "#FF00F7", "#FF9800"];

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
          {/* {item.country.length > 10 && ( */}
          <div
            style={{
              width: 20 * item.country.length,
              height: 20 * item.country.length,
              backgroundColor: colors[index % colors.length],
            }}
          />
          {/* )} */}
          <p>
            주문일 {item.orderDate} | 수익 {item.totalProfit.toLocaleString()}
          </p>
        </div>
      )}
    />
  );
};

export default PageClient;
