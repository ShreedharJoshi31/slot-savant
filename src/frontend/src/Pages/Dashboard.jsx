import React, { useEffect } from "react";
import {
  // Activity,
  CircleParking,
  // CreditCard,
  // DollarSign,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import LineCharts from "../components/section/LineCharts";
// import BarChart from "../components/section/BarChart";
import PieChart from "../components/section/PieChart";
// import RadarChart from "../components/section/RadarChart";
import AreaChart from "../components/section/AreaChart";
import RealTimeClock from "../components/section/RealTimeClock";
import ParkingLot from "../components/ParkingLot";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../app/asyncThunks";

export default function Dashboard() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard.dashboardData);
  const loading = useSelector((state) => state.dashboard.loading);
  const error = useSelector((state) => state.dashboard.error);

  useEffect(() => {
    dispatch(getDashboardData(token));
  }, [dashboard]);

  const emptySpots = dashboard?.lastEntry?.emptySpots
    ? dashboard?.lastEntry?.isEntering
      ? dashboard?.lastEntry?.emptySpots.filter(
          (element) => element !== dashboard?.lastEntry?.takenSpot
        )
      : [dashboard?.lastEntry?.takenSpot, ...dashboard?.lastEntry?.emptySpots]
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className="flex min-h-screen w-[98%] flex-col justify-center">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-14">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">14</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Parking Spots
              </CardTitle>
              <CircleParking className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {dashboard.lastEntry
                  ? dashboard?.lastEntry?.isEntering
                    ? dashboard.lastEntry?.emptySpots.length - 1
                    : dashboard.lastEntry?.emptySpots.length + 1
                  : 14}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Occupied Parking Spots
              </CardTitle>
              <CircleParking className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {14 -
                  (dashboard.lastEntry
                    ? dashboard?.lastEntry?.isEntering
                      ? dashboard.lastEntry?.emptySpots.length - 1
                      : dashboard.lastEntry?.emptySpots.length + 1
                    : 14)}
              </div>
            </CardContent>
          </Card>
          <RealTimeClock />
        </div>

        {/* Analysis  */}

        <div className="grid grid-cols-3 gap-5">
          {/* AreaChart */}
          <div className="col-span-2 border rounded-md shadow-lg p-5 pr-0">
            <p className="font-bold text-left text-xl mb-4">
              Parking Lot Engagement
            </p>
            <div className="flex justify-center">
              <AreaChart
                data={dashboard.entriesByDay?.filter(
                  (item) => item.day !== "Sunday"
                )}
              />
            </div>
          </div>

          <div className="border rounded-md shadow-lg p-5 pr-0 row-span-2">
            <p className="font-bold text-left text-xl mb-4">
              Realtime Parking Lot Status
            </p>
            <div className="w-full">
              <ParkingLot emptySpots={emptySpots} />
              {/* <ParkingLot emptySpots={[3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]} /> */}
            </div>
          </div>

          {/* RadarChart */}
          {/* <div className="col-span-1 border rounded-md shadow-lg p-5 pr-0 ">
            <p className="font-bold text-left text-xl mb-4">
              Average Parking Duration
            </p>
            <div className="flex mr-10 mt-12 justify-center">
              <LineCharts data={dashboard.entriesByHour} />
            </div>
          </div> */}

          {/* PieChart */}
          <div className=" col-span-2 border rounded-md shadow-lg p-5 pr-0">
            <p className="font-bold text-left text-xl mb-4">
              Real Time Slot Avaiilability
            </p>
            <div className="flex justify-center">
              <PieChart data={dashboard.lastEntry} />
            </div>
          </div>

          {/* Barchart */}
          {/* <div className="border rounded-md shadow-lg p-5 pr-0">
            <p className="font-bold text-left text-xl mb-4">
              Average Parking Duration
            </p>
            <div className="flex justify-center">
              <BarChart />
            </div>
          </div> */}

          {/* Linechart */}
        </div>
      </main>
    </div>
  );
}
