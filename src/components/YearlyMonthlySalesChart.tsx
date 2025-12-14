"use client";

import { SalesByYear, SalesMonthSummary } from "@/lib/sales/types";
import MonthlySalesChart from "./MonthlySalesChart";
import { useEffect, useMemo, useState } from "react";

interface Props {
  data: SalesByYear;
}

const YearlyMonthlySalesChart = ({ data }: Props) => {
  const [year, setYear] = useState<number | undefined>(() => {
    const years = Object.keys(data).sort();
    if (years.length === 0) return undefined;
    return Number(years[years.length - 1]);
  });

  useEffect(() => {
    if (year === undefined) return;
    console.log(data[year]);
  }, [data, year]);

  const monthlyData = useMemo(() => {
    if (year === undefined) return [];

    const arr: SalesMonthSummary[] = [];
    for (let i = 1; i <= 12; i++) {
      const monthlySummary = data[year][i];
      arr.push(
        monthlySummary ?? {
          month: i,
          totalRevenue: 0,
          totalProfit: 0,
          totalUnitsSold: 0,
        }
      );
    }
    return arr;
  }, [year, data]);

  return (
    <div className="w-full flex flex-col gap-6 border border-gray-400 rounded-2xl p-6">
      <div className="w-fit ml-auto">
        <select
          id="yearMonth"
          onChange={(ev) => setYear(Number(ev.currentTarget.value))}
          value={year}
          className="border rounded-2xl px-3 py-2 ml-4"
        >
          {Object.keys(data).map((year) => (
            <option key={year} value={Number(year)}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {year && (
        <div className="flex flex-col gap-8">
          <h2 className="font-bold text-lg">Monthly Revenue/Profit</h2>
          <MonthlySalesChart year={year} data={monthlyData} />
        </div>
      )}
    </div>
  );
};

export default YearlyMonthlySalesChart;
