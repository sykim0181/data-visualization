import { SalesMonthSummary } from "@/lib/sales/types";
import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  year: number;
  data: SalesMonthSummary[];
}

const MonthlySalesChart = ({ year, data }: Props) => {
  return (
    <ComposedChart
      responsive
      style={{ width: "100%", height: "600px" }}
      data={data}
      margin={{ left: 40, bottom: 15 }}
    >
      <XAxis dataKey="month" />
      <YAxis
        yAxisId="left"
        domain={["auto", "auto"]}
        tickFormatter={(value) => value.toLocaleString()}
        width="auto"
      />
      <YAxis
        yAxisId="right"
        orientation="right"
        domain={["auto", "auto"]}
        tickFormatter={(value) => value.toLocaleString()}
        width="auto"
      />
      <Legend />
      <Tooltip
        content={({ label, payload, active }) => (
          <CustomTooltip
            label={label as string}
            payload={payload as ReadonlyArray<{ name: string; value: number }>}
            active={active}
            year={year}
          />
        )}
      />

      <Bar
        dataKey="totalRevenue"
        name="Revenue"
        yAxisId="left"
        fill="url(#gray-gradient)"
        className="bg-gray-300"
      />
      <Line
        dataKey="totalProfit"
        name="Profit"
        yAxisId="right"
        stroke="black"
      />

      <defs>
        <linearGradient id="gray-gradient" x1="1" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#99a1af" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
    </ComposedChart>
  );
};

interface CustomTooltipProps {
  year: number;
  active: boolean;
  payload: ReadonlyArray<{ name: string; value: number }>;
  label: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  year,
}: CustomTooltipProps) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="bg-white rounded-2xl border border-gray-400 p-4"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="font-bold">{`${year}.${label
            ?.toString()
            .padStart(2, "0")}`}</p>
          <div className="grid grid-cols-2">
            <p className="text-gray-500">{payload[0].name}</p>
            <p className="text-right">{`$${payload[0].value.toLocaleString()}`}</p>
            <p className="text-gray-500">{payload[1].name}</p>
            <p className="text-right">{`$${payload[1].value.toLocaleString()}`}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlySalesChart;
