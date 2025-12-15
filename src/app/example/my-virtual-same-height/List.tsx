"use client";

import FixedSalesRow from "@/components/list/FixedSalesRow";
import useSalesRecord from "@/hooks/useSalesRecord";
import { useCallback, useEffect, useRef, useState } from "react";

const List = ({
  rowHeight,
  overscan,
}: {
  rowHeight: number;
  overscan: number;
}) => {
  const { records } = useSalesRecord();

  const containerRef = useRef<HTMLDivElement>(null);

  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setViewportHeight(container.clientHeight);
  }, []);

  const animationFrameRef = useRef<number | null>(null);

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
  const visibleCount = Math.ceil(viewportHeight / rowHeight); // 보이는 행 개수

  const startIndex = Math.max(Math.floor(scrollTop / rowHeight) - overscan, 0);
  const endIndex = Math.min(
    overscan + startIndex + visibleCount + overscan,
    totalCount
  );

  const items = records.slice(startIndex, endIndex);

  const paddingTop = startIndex * rowHeight;
  const paddingBottom = (totalCount - endIndex) * rowHeight;

  return (
    <div
      ref={containerRef}
      className="h-[500px] w-[600px] overflow-auto border"
      onScroll={handleScroll}
    >
      {paddingTop > 0 && <div style={{ height: paddingTop }} />}

      {items.map((record) => (
        <FixedSalesRow
          key={record.orderId}
          record={record}
          height={rowHeight}
        />
      ))}

      {paddingBottom > 0 && <div style={{ height: paddingBottom }} />}
    </div>
  );
};

export default List;
