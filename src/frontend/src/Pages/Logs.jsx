import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../app/asyncThunks";

function VehiclesLog() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.log.logs);
  const loading = useSelector((state) => state.log.loading);
  const error = useSelector((state) => state.log.error);

  useEffect(() => {
    dispatch(getLogs(token));
  }, [logs]);

  return (
    <div className="ml-16 mt-5 p-5">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle className="text-4xl">Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car No. Plate</TableHead>
                  <TableHead>Owner Name</TableHead>
                  <TableHead>Parking Spot No.</TableHead>
                  <TableHead>No. of empty parking spots</TableHead>
                  <TableHead>Date and Time of Parking</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.data?.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.car?.carNumberPlate}</TableCell>
                    <TableCell>{log.car?.ownerName}</TableCell>
                    {/* <TableCell>{log["Owner Name"]}</TableCell> */}
                    <TableCell>{log?.takenSpot}</TableCell>
                    <TableCell>{log?.emptySpots.length}</TableCell>
                    <TableCell>
                      {new Date(log.time).toLocaleDateString("en-GB") +
                        ", " +
                        new Date(log.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </TableCell>
                    <TableCell>
                      {log.isEntering ? "Entering" : "Exiting"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default VehiclesLog;
