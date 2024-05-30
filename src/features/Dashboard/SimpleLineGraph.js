import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  

const SimpleLineGraph = ({data}) => {
  return (
    <LineChart width={400} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="Income"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
    />
    <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
  </LineChart>
  )
}

export default SimpleLineGraph
