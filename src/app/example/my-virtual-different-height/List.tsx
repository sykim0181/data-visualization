"use client";

import StaticSalesRow from "@/components/list/StaticSalesRow";
import { SalesRecord } from "@/lib/sales/types";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";

const List = ({
  records,
  estimatedRowHeight,
  overscan,
}: {
  records: SalesRecord[];
  estimatedRowHeight: number;
  overscan: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewportHeight, setViewportHeight] = useState(0);
  const [itemHeights, setItemHeights] = useState<number[]>([]); // 각 아이템의 높이

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setViewportHeight(container.clientHeight);
  }, []);

  const initializeItemHeights = useEffectEvent(
    (itemCount: number, estimatedItemHeight: number) => {
      // 기본값은 모두 estimatedItemHeight
      const next = Array(itemCount).fill(estimatedItemHeight);

      for (let i = 0; i < Math.min(itemHeights.length, next.length); i++) {
        next[i] = itemHeights[i] ?? estimatedItemHeight;
      }
      setItemHeights(next);
    }
  );

  useEffect(() => {
    initializeItemHeights(records.length, estimatedRowHeight);
  }, [records.length, estimatedRowHeight]);

  const [scrollTop, setScrollTop] = useState(0);

  const animationFrameRef = useRef<number | null>(null);
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (animationFrameRef.current != null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      setScrollTop(el.scrollTop);
    });
  }, []);

  // offsets[i] = i번째 아이템의 top
  const { offsets, totalHeight } = useMemo(() => {
    const offsets = new Array(itemHeights.length).fill(0);
    let acc = 0;
    for (let i = 0; i < itemHeights.length; i++) {
      offsets[i] = acc;
      acc += itemHeights[i];
    }
    return { offsets, totalHeight: acc };
  }, [itemHeights]);

  const startIndex = useMemo(() => {
    let low = 0;
    let high = itemHeights.length - 1;
    let first = 0;

    while (low <= high) {
      const mid = (low + high) >> 1;
      const itemTop = offsets[mid];
      const itemBottom = itemTop + itemHeights[mid];

      if (itemBottom >= scrollTop) {
        first = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return first;
  }, [offsets, itemHeights, scrollTop]);

  const endIndex = useMemo(() => {
    const scrollBottom = scrollTop + viewportHeight;

    let low = 0;
    let high = itemHeights.length - 1;
    let last = itemHeights.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      const itemTop = offsets[mid];

      if (itemTop <= scrollBottom) {
        last = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return last;
  }, [itemHeights, offsets, scrollTop, viewportHeight]);

  const renderStart = Math.max(0, startIndex - overscan);
  const renderEnd = Math.min(records.length - 1, endIndex + overscan);

  const visibleItems = [];
  for (let i = renderStart; i <= renderEnd; i++) {
    visibleItems.push(i);
  }

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (!el) return;

      const height = el.offsetHeight;
      if (!height) return;

      setItemHeights((prev) => {
        const prevHeight = prev[index];
        // 너무 자잘한 차이는 무시 (무한 리렌더 방지)
        if (Math.abs(prevHeight - height) < 1) return prev;
        const next = [...prev];
        next[index] = height;
        return next;
      });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="h-[600px] w-[600px] relative overflow-y-auto border"
      onScroll={handleScroll}
    >
      <div className="relative" style={{ height: totalHeight }}>
        <div
          className="absolute left-0 right-0"
          style={{ top: offsets[renderStart] }}
        >
          {visibleItems.map((index) => (
            <div key={index} ref={setItemRef(index)} className="border-b">
              <StaticSalesRow record={records[index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
