/** @format */

import { useEffect } from "react";

function Timer({ dispatch, seconsRemaining }) {
  const min = Math.floor(seconsRemaining / 60);
  const sec = seconsRemaining % 60;

  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
