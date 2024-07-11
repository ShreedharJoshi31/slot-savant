import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Monday",
    averageTime: 15,
  },
  {
    name: "Tuesday",
    averageTime: 20,
  },
  {
    name: "Wednesday",
    averageTime: 60,
  },
  {
    name: "Thursday",
    averageTime: 40,
  },
  {
    name: "Friday",
    averageTime: 45,
  },
  {
    name: "Saturday",
    averageTime: 50,
  },
  {
    name: "Sunday",
    averageTime: 30,
  },
];

export default class AverageTimeChart extends PureComponent {
  render() {
    return (
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" fontSize={15} />
        <YAxis dataKey="averageTime" />
        <Bar dataKey="averageTime" fill="hsl(var(--primary))" barSize={35} />
      </BarChart>
    );
  }
}
