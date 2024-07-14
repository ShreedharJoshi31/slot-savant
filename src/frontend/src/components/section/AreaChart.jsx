import React, { PureComponent } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    id: "_id",
    carNumberPlate: "HR26BP3543",
    time: "2024-06-23T19:23:14.258+00:00",
    parkedSlots: 1,
    taken_spot: 1,
    isEntering: true,
  },
  {
    id: "_id",
    carNumberPlate: "HR26BP3544",
    time: "2024-06-24T10:00:00.000+00:00",
    parkedSlots: 2,
    taken_spot: 1,
    isEntering: true,
  },
  {
    id: "_id",
    carNumberPlate: "HR26BP3545",
    time: "2024-06-25T12:00:00.000+00:00",
    parkedSlots: 3,
    taken_spot: 1,
    isEntering: true,
  },
  {
    id: "_id",
    carNumberPlate: "HR26BP3546",
    time: "2024-06-26T08:00:00.000+00:00",
    parkedSlots: 2,
    taken_spot: 1,
    isEntering: true,
  },
  {
    id: "_id",
    carNumberPlate: "HR26BP3547",
    time: "2024-06-27T09:00:00.000+00:00",
    parkedSlots: 1,
    taken_spot: 1,
    isEntering: true,
  },
  {
    id: "_id",
    carNumberPlate: "HR26BP3548",
    time: "2024-06-28T11:00:00.000+00:00",
    parkedSlots: 2,
    taken_spot: 1,
    isEntering: true,
  },
  {
    id: "_id",
    carNumberPlate: "HR26BP3549",
    time: "2024-06-29T10:00:00.000+00:00",
    parkedSlots: 3,
    taken_spot: 1,
    isEntering: true,
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

const formattedData = data.map((item) => ({
  day: formatDate(item.time),
  parkedSlots: item.parkedSlots,
}));

export default class Example extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <AreaChart
        width={800}
        height={300}
        data={data ? data : formattedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="day" stroke="#F8FAFC" />
        <YAxis stroke="#F8FAFC" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="parkedSlots"
          stroke="#22C55E "
          fill="#22C55E"
          opacity={0.6}
        />
      </AreaChart>
    );
  }
}
