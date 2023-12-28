import React, { useState, useEffect } from "react";
import gft from "./assets/ganjhat.gif";
import moment from "moment";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = moment();
    const endDate = moment("2024-01-07");
    const duration = moment.duration(endDate.diff(now));
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      endDate: endDate.format("MMMM D, YYYY HH:mm:ss"),
    };
  }

  return (
    <div className="ms-5 me-5">
      <img className="mx-auto h-28 rounded-lg pt-2" src={gft} alt="" />
      <h1 className="text-center font-serif  pt-3 text-xl md:text-3xl font-medium text-yellow-50 ">
        {`Coming Soon Ganjmo`}
      </h1>
      <p className="text-center text-sm mt-2 text-yellow-50">
        {`Welcome to Ganjmo! We're excited to announce that our enhanced e-commerce features are set to launch in just ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds. Get ready for a seamless and powerful online shopping experience.`}
      </p>
      <div className=" mt-10 flex justify-center pb-5">
        <div className="grid  grid-flow-col gap-5 text-center  auto-cols-max">
          <div className="flex  text-orange-600 p-2 rounded-lg border border-double border-gray-600 bg-white  flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.days }}></span>
            </span>
            days
          </div>
          <div className="flex  text-orange-600 p-2 rounded-lg border border-double border-gray-600 bg-white  flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.hours }}></span>
            </span>
            hours
          </div>
          <div className="flex  text-orange-600 p-2 rounded-lg border border-double border-gray-600 bg-white  flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.minutes }}></span>
            </span>
            min
          </div>
          <div className="flex  text-orange-600 p-2 rounded-lg border border-double border-gray-600 bg-white  flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.seconds }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
      <p className="text-center pb-52 font-bold  font-mono  text-yellow-50">{`End Date: ${timeLeft.endDate}`}</p>
    </div>
  );
};

export default App;
