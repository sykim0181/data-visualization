"use client";

import { CountryRevenue } from "@/lib/sales/types";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  BarProps,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

interface Prop {
  data: CountryRevenue[];
}

const TopCountryBarChart = ({ data }: Prop) => {
  return (
    <section className="w-full rounded-2xl p-6 flex flex-col gap-4 bg-(--card)">
      <h2 className="font-bold text-lg text-(--text-primary)">
        Top 10 Countries by Revenue
      </h2>
      <BarChart
        style={{ width: "100%", height: "500px" }}
        responsive
        data={data}
        layout="vertical"
      >
        <XAxis
          dataKey="totalRevenue"
          type="number"
          domain={["auto", "auto"]}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <YAxis
          dataKey="country"
          type="category"
          width="auto"
          className="text-(--text-secondary)"
        />
        <Bar
          dataKey="totalRevenue"
          name="Revenue"
          fill="var(--highlight)"
          shape={CustomBar}
        />
        <Tooltip content={CustomTooltop} />
      </BarChart>
    </section>
  );
};

const isNumber = (value: string | number | undefined): value is number => {
  return typeof value === "number";
};

const CustomBar = ({ fill, x, y, width, height }: BarProps) => {
  const path = useMemo(() => {
    if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height)) {
      return;
    }

    if (height === 0) return;

    const radius = 12;
    return `
    M${x},${y}
    L${x},${y + height}
    L${x + width - radius},${y + height}
    a${radius},${radius} 0 0,0 ${radius},${-radius}
    L${x + width},${y + radius}
    a${radius},${radius} 0 0,0 ${-radius},${-radius}
    Z`;
  }, [x, y, width, height]);

  return (
    <path
      d={path}
      stroke="none"
      fill={fill}
      className="opacity-50 hover:opacity-100"
    />
  );
};

const CustomTooltop = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="bg-(--card-popover) rounded-2xl p-4"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <div>
          <p className="font-bold text-(--card-popover-text)">{label}</p>
          <div className="grid grid-cols-2">
            <p className="text-(--text-secondary)">{`${payload[0].name}`}</p>
            <p className="text-(--card-popover-text)">{`$${payload[0].value.toLocaleString()}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopCountryBarChart;
