import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  onResize: (height: number) => void;
}

const DynamicRowItem = ({ children, onResize }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const el = entry.target as HTMLElement;
      if (!el.isConnected) return;

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

export default DynamicRowItem;
