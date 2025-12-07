import { ReactNode, useEffect, useRef } from "react";

const DynamicRowWrapper = ({
  children,
  onResize,
}: {
  children: ReactNode;
  onResize: (height: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry.target.isConnected) return;

      const height = entry.contentRect.height;
      onResize(height);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [onResize]);

  return <div ref={ref}>{children}</div>;
};

export default DynamicRowWrapper;
