import React from "react";
import gft from "./assets/ganjhat.gif";

const App = () => {
  return (
    <div className="ms-5 me-5">
      <img className="mx-auto h-28 rounded-lg pt-2" src={gft} alt="" />
      <h1 className="text-center  pt-3 text-xl md:text-3xl font-medium text-yellow-50   ">
        {`Comming Soon Ganjmo`}
      </h1>
      <p className="text-center text-sm  mt-2 text-yellow-50 ">
        {`Welcome to Ganjmo! We're excited to announce that our enhanced e-commerce features are set to launch in just 10-15 days. Get ready for a seamless and powerful online shopping experience.`}
      </p>
    </div>
  );
};

export default App;
