import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const SimpleBarGraph = ({data,keyData,fill,hoverFill}) => {
  return (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey={keyData}
        fill={fill}
        activeBar={<Rectangle fill={hoverFill} stroke="blue" />}
      />
      
    </BarChart>
  );
};
export default SimpleBarGraph;
