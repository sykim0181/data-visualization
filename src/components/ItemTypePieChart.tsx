"use client";

import { itemTypeShare } from "@/lib/sales/types";
import { Pie, PieChart, PieSectorDataItem, Sector, Tooltip } from "recharts";

interface Props {
  data: itemTypeShare[];
}

const ItemTypePieChart = ({ data }: Props) => {
  return (
    <section className="w-full border border-gray-400 rounded-2xl p-6">
      <h2 className="font-bold text-lg">Units Share by Item Type</h2>
      <PieChart style={{ width: "100%", height: "500px" }} responsive>
        <Pie
          data={data}
          dataKey="unitsSold"
          nameKey="itemType"
          cx="50%"
          cy="50%"
          innerRadius="50%"
          fill="#99a1af"
          shape={renderActiveShape}
          paddingAngle={2}
        />
      </PieChart>
      <Tooltip />
    </section>
  );
};

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
  isActive,
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
        fill={fill}
        opacity={isActive ? 0.5 : 1}
      />
      {isActive && (
        <>
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`${payload.itemType} ${((percent ?? 1) * 100).toFixed(2)}%`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`${value.toLocaleString()} Units Sold`}
          </text>
        </>
      )}
    </g>
  );
};

export default ItemTypePieChart;
