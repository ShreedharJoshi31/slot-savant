import Car from "../models/Car.js";
import Log from "../models/Logs.js";
import Parking from "../models/Parking.js";

import moment from "moment";

// Helper function to get the dates for the previous week (Monday to Saturday)
function getLastWeekDates() {
  const dates = [];
  const today = moment().startOf("day");
  const lastSunday = today.clone().subtract(today.day() + 1, "days");

  for (let i = 0; i < 6; i++) {
    dates.push(lastSunday.clone().subtract(i, "days").toDate());
  }

  return dates.reverse();
}

// Helper function to get the entries count by day and format the output

async function getEntriesByDay(dates) {
  const results = [];

  for (const date of dates) {
    const startOfDay = moment
      .utc(date)
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const endOfDay = moment
      .utc(date)
      .endOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const dayName = moment.utc(date).format("dddd");

    const count = await Log.countDocuments({
      time: { $gte: startOfDay, $lte: endOfDay },
      isEntering: true,
    });

    results.push({ day: dayName, parkedSlots: count });
  }

  return results;
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
    const lastWeekDates = getLastWeekDates();
    const entriesByDay = await getEntriesByDay(lastWeekDates);
    const todaysHours = getTodaysHours();
    const entriesByHour = await getCarCountsByHour(todaysHours);
    res.json({ entriesByDay, entriesByHour, lastEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default generateData;
