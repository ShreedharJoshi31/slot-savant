import React from "react";

const ParkingLot = ({ emptySpots }) => {
  const some = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const result = some.filter((x) => !emptySpots?.includes(x));

  const formattedData = result.map((x, idx) => {
    if (x <= 7) {
      return 2 * x - 1;
    } else {
      let difference = 6 - idx + 7;
      return x - difference;
    }
  });

  return (
    <div className="relative w-full max-w-5xl mx-auto pr-4">
      <img
        src="/parkinglot.png"
        alt="Parking Lot"
        width={1200}
        height={800}
        className="w-full h-auto rounded-lg"
      />
      <div className="absolute top-0 left-[2.2rem] w-full h-full grid grid-cols-2 grid-rows-7  ">
        {some.map((spot) => (
          <div>
            {formattedData.includes(spot) ? (
              <img
                src="/car.png"
                alt="Car"
                width={100}
                height={200}
                className={`w-[60%] ${
                  spot % 2 === 0 ? "rotate-180" : ""
                } h-auto`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingLot;
