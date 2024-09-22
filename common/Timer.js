import React, { useEffect, useState } from "react";

function Timer({ endTime, type = "normal" }) {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    timerComponents.push(
      type === "text" ? (
        <span style={{ paddingLeft: 5 }}>
          <span
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 7,
              paddingRight: 7,
              borderRadius: 7,
              fontSize: 14,
              backgroundColor: "rgba(82, 27, 143,0.9)",
              color: "white",
              fontWeight: 600,
            }}
          >
            {timeLeft[interval]}
            {interval}
          </span>
        </span>
      ) : (
        <span style={{ paddingLeft: 5 }}>
          <span
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 7,
              paddingRight: 7,
              borderRadius: 7,
              fontSize: 14,
              backgroundColor: "rgba(82, 27, 143,0.9)",
              color: "white",
              fontWeight: 600,
            }}
          >
            {timeLeft[interval]}
            {interval}
          </span>
        </span>
      )
    );
  });
  return <div>{timerComponents.length && timerComponents}</div>;
}

export default Timer;
