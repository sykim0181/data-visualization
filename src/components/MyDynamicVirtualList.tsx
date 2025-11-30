"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const [itemHeights, setItemHeights] = useState<number[]>(() =>
    Array(items.length).fill(estimatedItemHeight)
  );

  // items 길이가 바뀌면 heights 배열도 맞춰줌
  const updateItemHeights = useEffectEvent((estimatedItemHeight: number) => {
    setItemHeights((prev) => {
      if (prev.length === items.length) return prev;
      const next = Array(items.length).fill(estimatedItemHeight);
      for (let i = 0; i < Math.min(prev.length, next.length); i++) {
        next[i] = prev[i] ?? estimatedItemHeight;
      }
      return next;
    });
  });

  useEffect(() => {
    updateItemHeights(estimatedItemHeight);
  }, [items.length, estimatedItemHeight]);

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
    const offsets: number[] = new Array(items.length).fill(0);
    let acc = 0;
    for (let i = 0; i < items.length; i++) {
      offsets[i] = acc;
      acc += itemHeights[i];
    }
    return { offsets, totalHeight: acc };
  }, [items.length, itemHeights]);

  const viewportHeight = height;
  const scrollBottom = scrollTop + viewportHeight;

  // scrollTop에 해당하는 startIndex 찾기
  const startIndex = useMemo(() => {
    let low = 0;
    let high = items.length - 1;
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
  }, [items.length, offsets, itemHeights, scrollTop]);
  // scrollBottom에 해당하는 endIndex 찾기
  const endIndex = useMemo(() => {
    let low = 0;
    let high = items.length - 1;
    let last = items.length - 1;

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
  }, [items.length, offsets, scrollBottom]);

  const renderStart = Math.max(0, startIndex - overscanCount);
  const renderEnd = Math.min(items.length - 1, endIndex + overscanCount);

  const visibleItems = [];
  for (let i = renderStart; i <= renderEnd; i++) {
    visibleItems.push(i);
  }

  // 개별 아이템 높이 측정용 ref 콜백
  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (!el) return;
      const measured = el.offsetHeight;
      if (!measured) return;
      setItemHeights((prev) => {
        const prevHeight = prev[index];
        // 너무 자잘한 차이는 무시 (무한 리렌더 방지)
        if (Math.abs(prevHeight - measured) < 1) return prev;
        const next = [...prev];
        next[index] = measured;
        return next;
      });
    },
    []
  );

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
              ref={setItemRef(index)}
              className="absolute left-0 right-0 box-border p-2 border-b"
              style={{ top }}
            >
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyDynamicVirtualList;
