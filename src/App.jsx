import React, { useState, useEffect } from "react";
import gft from "./assets/ganjhat.gif";
import moment from "moment";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { SuperSEO } from "react-super-seo";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [imageKey, setImageKey] = useState(0);
  const [randomQuote, setRandomQuote] = useState("");
  const [github, setGithub] = useState({});

  useEffect(() => {
    fetch("https://api.github.com/users/RedowanSajeeb")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGithub(data);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Reload the image every 5 seconds
    const imageReloadInterval = setInterval(() => {
      setImageKey((prevKey) => prevKey + 1);
    }, 5000);

    // Fetch a random quote initially
    fetchRandomQuote();

    // Fetch a new random quote every 5 seconds
    const quoteReloadInterval = setInterval(() => {
      fetchRandomQuote();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(imageReloadInterval);
      clearInterval(quoteReloadInterval);
    };
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

  function fetchRandomQuote() {
    fetch("https://api.quotable.io/quotes/random")
      .then((response) => response.json())
      .then((data) => {
        setRandomQuote(data[0].content);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  }

  return (
    <div className="ms-5 me-5">
      <SuperSEO
        description="Ganjmo Ganjmo.com Ganjmo Ganjmo | React Super SEO Ganjmo Moreelganj Gorrelgan Ganjmo Comming Soon GANJMO ganjmo yes"
        lang="en"
        openGraph={{
          ogImage: {
            ogImage: "https://www.ganjmo.com/Ganjhat_logo_0-01.jpg",
            ogImageAlt: "Ganjmo",
            ogImageWidth: 1200,
            ogImageHeight: 630,
            ogImageType: "image/jpeg",
          },
        }}
      />
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
      <p className="text-center font-bold font-mono text-yellow-50">{`End Date: ${timeLeft.endDate}`}</p>

      {/* Display the random quote */}
      <h4 className="text-center text-lg text-white mt-5">{randomQuote}</h4>
      {/* Reload the image every 5 seconds */}
      <img
        className="mx-auto mt-5 h-80 md:h-96 rounded-2xl "
        key={imageKey}
        src={`https://random.imagecdn.app/500/150?${imageKey}`}
        alt="Random Image"
      />
      <div className="text-yellow-50 space-y-3 pb-10">
        <div className="flex  items-center justify-center gap-2 mt-10">
          <img
            className="h-24 rounded-full"
            src={github?.avatar_url}
            alt="Redowan Sajeeb Github avatar"
          />
          <div>
            <h1 className="text-2xl ">{github.name}</h1>
            <div>
              <div className="mt-2 mb-2 space-x-3">
                <a target="blank" className=" text-white" href={github?.blog}>
                  Blog🌍
                </a>
                <a
                  target="blank"
                  className=" text-white"
                  href={github?.html_url}
                >
                  gitHub Link👨‍💻
                </a>
              </div>
              <p className="text-sm text-gray-100">
                Github followers: {github?.followers}
              </p>
              <p className="text-sm text-gray-100">
                public_repos : {github?.public_repos}
              </p>
              <p className="text-sm text-gray-100">
                twitter_username : {github?.twitter_username}
              </p>
            </div>
          </div>
        </div>
      </div>
      <LinkPreview
        url="https://www.ganjmo.com/Ganjhat_logo_text_1of.png"
        width="400px"
      />
    </div>
  );
};

export default App;

// New features New Year Starts With New Year 2024 , yehIn Sha Allah
// ENdependencies