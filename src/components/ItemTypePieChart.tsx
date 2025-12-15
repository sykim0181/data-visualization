"use client";

import { itemTypeShare } from "@/lib/sales/types";
import { Pie, PieChart, PieSectorDataItem, Sector, Tooltip } from "recharts";

interface Props {
  data: itemTypeShare[];
}

const ItemTypePieChart = ({ data }: Props) => {
  return (
    <section className="w-full rounded-2xl p-6 bg-(--card)">
      <h2 className="font-bold text-lg text-(--text-primary)">Units Share by Item Type</h2>
      <PieChart style={{ width: "100%", height: "500px" }} responsive>
        <Pie
          data={data}
          dataKey="unitsSold"
          nameKey="itemType"
          cx="50%"
          cy="50%"
          innerRadius="50%"
          shape={renderShape}
          paddingAngle={2}
        />
      </PieChart>
      <Tooltip />
    </section>
  );
};

const renderShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  // fill,
  payload,
  percent,
  value,
  isActive,
  index,
}: PieSectorDataItem & { isActive: boolean; index: number }) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + (outerRadius ?? 0) * cos;
  const sy = (cy ?? 0) + (outerRadius ?? 0) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  const colors = ["primary", "secondary", "accent", "highlight"];
  const fill = colors[index % colors.length];

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={`var(--${fill})`}
        opacity={isActive ? 0.5 : 1}
      />
      {true && (
        <>
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={"var(--text-primary)"}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="var(--text-primary)"
          >{`${payload.itemType} ${((percent ?? 1) * 100).toFixed(2)}%`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="var(--text-secondary)"
          >
            {`${value.toLocaleString()} Units`}
          </text>
        </>
      )}
    </g>
  );
};

export default ItemTypePieChart;
