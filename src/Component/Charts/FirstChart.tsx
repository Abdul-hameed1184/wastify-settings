import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Naira } from "../../utils/format";

type Props = {
  revenue: any[];
};

const FirstChart: React.FC<Props> = ({ revenue }) => {
  return (
    <div style={{ width: "100%" }} className="px-5 py-3 border border-gray-100 border-2 rounded-xl">
      <p className="text-black text-2xl leading-5 font-semibold m-4">
        Monthly Sales Report
      </p>

      <ResponsiveContainer width="100%" height={412}>
        <BarChart
          data={revenue}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
        >
          {/* Grid */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          {/* Horizontal axis (X-axis) */}
          {/* <XAxis
            dataKey="billPeriod"
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          /> */}
        <XAxis
  dataKey="monthWord"
  tickFormatter={(value, index) => {
    const year = revenue[index]?.year;
    return `${value.slice(0, 3)}, ${year}`;
  }}
    tick={{
    fontSize: 10,   // 👈 smaller font
    fill: "#666"
  }}
  axisLine={{ stroke: "#ccc" }}
  tickLine={false}
/>

  <YAxis
    tickFormatter={(value) => `₦${value.toLocaleString()}`}
    tick={{ fontSize: 10 }}
  />

          {/* Tooltip */}
          <Tooltip
  formatter={(value: number) => [`${Naira.format(value)}`, "Revenue"]}
/>

          {/* Bars */}
          <Bar dataKey="totalBillAmount" fill="#96C63D" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirstChart;