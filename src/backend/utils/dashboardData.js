import Car from "../models/Car.js";
import Log from "../models/Logs.js";
import Parking from "../models/Parking.js";

import moment from "moment";

function getDay(dateString) {
  return moment(dateString).format("dddd");
}

async function getEntriesByDay() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const results = {};

  daysOfWeek.forEach((day) => {
    results[day] = 0;
  });

  const logs = await Log.find({
    isEntering: true,
  });

  logs.map((log) => {
    const dayName = getDay(log.time);
    results[dayName]++;
  });

  const formattedResults = Object.entries(results).map(([day, count]) => ({
    day,
    parkedSlots: count,
  }));

  return formattedResults;
}

const getTodaysHours = () => {
  const today = moment.utc().startOf("day");
  const startOfDay = today.clone().set({ hour: 9, minute: 0, second: 0 });
  const endOfDay = today.clone().set({ hour: 18, minute: 0, second: 0 });
  const hours = [];

  // Initialize hours array with hours from 9am to 6pm
  let currentHour = startOfDay.clone();
  while (currentHour.isSameOrBefore(endOfDay)) {
    hours.push(currentHour.format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
    currentHour.add(1, "hour");
  }

  return hours;
};

const getCarCountsByHour = async (hours) => {
  const carCountsByHour = [];

  for (const hour of hours) {
    const startHour = moment.utc(hour);
    const endHour = moment.utc(hour).add(1, "hour");

    const count = await Log.countDocuments({
      time: { $gte: startHour },
    });

    carCountsByHour.push({
      hour: startHour.format("HH:mm"),
      carCount: count,
    });
  }

  return carCountsByHour;
};

const generateData = async (req, res) => {
  try {
    const lastEntry = await Log.findOne().sort({ _id: -1 });
    const entriesByDay = await getEntriesByDay();
    // const todaysHours = getTodaysHours();
    // const entriesByHour = await getCarCountsByHour(todaysHours);
    res.json({ entriesByDay, lastEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default generateData;
