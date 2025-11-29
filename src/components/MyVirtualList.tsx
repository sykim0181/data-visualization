"use client";

import { SalesRecord } from "@/lib/sales/types";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  records: SalesRecord[];
}

const ROW_HEIGHT = 40;
const OVERSCAN = 5;

const MyVirtualList = ({ records }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      setViewportHeight(container.clientHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setScrollTop(container.scrollTop);
    });
  }, []);

  const totalCount = records.length;
  const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT); // 보이는 행 개수

  const startIndex = Math.max(Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN, 0);
  const endIndex = Math.min(
    OVERSCAN + startIndex + visibleCount + OVERSCAN,
    totalCount
  );

  const items = records.slice(startIndex, endIndex);

  const paddingTop = startIndex * ROW_HEIGHT;
  const paddingBottom = (totalCount - endIndex) * ROW_HEIGHT;

  return (
    <div
      ref={containerRef}
      className="h-full overflow-auto"
      onScroll={handleScroll}
    >
      <table className="table-auto">
        <thead className="sticky top-0 bg-white">
          <tr className="whitespace-nowrap p-4">
            <th>Region</th>
            <th>Country</th>
            <th>Item type</th>
            <th>Sales Channel</th>
            <th>Order Priority</th>
            <th>Order Date</th>
            <th>Ship Date</th>
            <th>Order Id</th>
            <th>Units Sold</th>
            <th>Unit Price</th>
            <th>Unit Cost</th>
            <th>Total Revenue</th>
            <th>Total Cost</th>
            <th>Total Profit</th>
          </tr>
        </thead>
        <tbody>
          {/* 위쪽 패딩 */}
          {paddingTop > 0 && (
            <tr style={{ height: paddingTop }}>
              <td colSpan={14} />
            </tr>
          )}
          {items.map((record) => (
            <tr key={record.orderId} style={{ height: ROW_HEIGHT }}>
              <td>{record.region}</td>
              <td>{record.country}</td>
              <td>{record.itemType}</td>
              <td>{record.salesChannel}</td>
              <td>{record.orderPriority}</td>
              <td>{record.orderDate}</td>
              <td>{record.shipDate}</td>
              <td>{record.orderId}</td>
              <td>{record.unitsSold}</td>
              <td>{record.unitPrice}</td>
              <td>{record.unitCost}</td>
              <td>{record.totalRevenue}</td>
              <td>{record.totalCost}</td>
              <td>{record.totalProfit}</td>
            </tr>
          ))}
          {/* 아래쪽 패딩 */}
          {paddingBottom > 0 && (
            <tr style={{ height: paddingBottom }}>
              <td colSpan={14} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyVirtualList;
