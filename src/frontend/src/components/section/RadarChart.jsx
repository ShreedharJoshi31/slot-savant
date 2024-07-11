import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const data = [
  {
    hour: "9am",
    parkedSlots: 3,
  },
  {
    hour: "10am",
    parkedSlots: 4,
  },
  {
    hour: "11am",
    parkedSlots: 5,
  },
  {
    hour: "12am",
    parkedSlots: 5,
  },
  {
    hour: "1pm",
    parkedSlots: 5,
  },
  {
    hour: "2pm",
    parkedSlots: 5,
  },
  {
    hour: "3pm",
    parkedSlots: 5,
  },
  {
    hour: "4pm",
    parkedSlots: 5,
  },
  {
    hour: "5pm",
    parkedSlots: 5,
  },
];

export default class ParkingRadarChart extends PureComponent {
  render() {
    // const { data } = this.props;

    console.log(data);

    return (
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        height={300}
        width={500}
        data={data ? data : 0}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="hour" />
        <PolarRadiusAxis />
        <Radar
          name="Parking Slots"
          dataKey="parkedSlots"
          stroke="#F8FAFC"
          fill="#38BDF8 "
          fillOpacity={0.6}
        />
      </RadarChart>
    );
  }
}
