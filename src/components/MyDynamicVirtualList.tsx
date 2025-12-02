"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import DynamicRowItem from "./DynamicRowItem";

type MyDynamicVirtualListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  estimatedItemHeight?: number;
  overscanCount?: number;
  height: number; // 컨테이너 높이
};

function MyDynamicVirtualList<T>({
  items,
  renderItem,
  estimatedItemHeight = 80,
  overscanCount = 5,
  height,
}: MyDynamicVirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 각 아이템의 높이
  const [itemHeights, setItemHeights] = useState<number[]>([]);

  const normalizedHeights = useMemo(() => {
    // 기본값은 모두 estimatedItemHeight
    const next = Array(items.length).fill(estimatedItemHeight);

    // 기존에 알고 있던 높이는 앞에서부터 그대로 복사
    for (let i = 0; i < Math.min(itemHeights.length, next.length); i++) {
      next[i] = itemHeights[i] ?? estimatedItemHeight;
    }

    return next;
  }, [items.length, itemHeights, estimatedItemHeight]);

  const [scrollTop, setScrollTop] = useState(0);

  // 스크롤 핸들러
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
    const offsets: number[] = new Array(normalizedHeights.length).fill(0);
    let acc = 0;
    for (let i = 0; i < normalizedHeights.length; i++) {
      offsets[i] = acc;
      acc += normalizedHeights[i];
    }
    return { offsets, totalHeight: acc };
  }, [normalizedHeights]);

  const viewportHeight = height;
  const scrollBottom = scrollTop + viewportHeight;

  // scrollTop에 해당하는 startIndex 찾기
  const startIndex = useMemo(() => {
    let low = 0;
    let high = normalizedHeights.length - 1;
    let first = 0;

    while (low <= high) {
      const mid = (low + high) >> 1;
      const itemTop = offsets[mid];
      const itemBottom = itemTop + normalizedHeights[mid];

      if (itemBottom >= scrollTop) {
        first = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return first;
  }, [offsets, normalizedHeights, scrollTop]);
  // scrollBottom에 해당하는 endIndex 찾기
  const endIndex = useMemo(() => {
    let low = 0;
    let high = normalizedHeights.length - 1;
    let last = normalizedHeights.length - 1;

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
  }, [normalizedHeights, offsets, scrollBottom]);

  const renderStart = Math.max(0, startIndex - overscanCount);
  const renderEnd = Math.min(items.length - 1, endIndex + overscanCount);

  const visibleItems = [];
  for (let i = renderStart; i <= renderEnd; i++) {
    visibleItems.push(i);
  }

  const onRowHeightChange = (index: number, height: number) => {
    setItemHeights((prev) => {
      const prevHeight = prev[index];
      // 너무 자잘한 차이는 무시 (무한 리렌더 방지)
      if (Math.abs(prevHeight - height) < 1) return prev;
      const next = [...prev];
      next[index] = height;
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto border border-gray-400"
      style={{ height }}
      onScroll={handleScroll}
    >
      {/* 전체 높이를 차지하는 가상 컨테이너 */}
      <div className="relative" style={{ height: totalHeight }}>
        {visibleItems.map((index) => {
          const item = items[index];
          const top = offsets[index];

          return (
            <div
              key={index}
              // ref={setItemRef(index)}
              className="absolute left-0 right-0 box-border"
              style={{ top }}
            >
              <DynamicRowItem
                onResize={(height) => onRowHeightChange(index, height)}
              >
                {renderItem(item, index)}
              </DynamicRowItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyDynamicVirtualList;
