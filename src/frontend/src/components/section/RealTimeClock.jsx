import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarClock } from "lucide-react"; // Replace with your actual calendar clock component import

const RealTimeClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date()); // Update currentDateTime every second
    }, 1000);

    return () => {
      clearInterval(interval); // Cleanup interval on unmount
    };
  }, []);

  // Format the date and time to your desired format
  const formattedDateTime = currentDateTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Date & Time
        </CardTitle>
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{formattedDateTime}</div>
      </CardContent>
    </Card>
  );
};

export default RealTimeClock;
