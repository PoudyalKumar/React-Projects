import { useState } from "react";
import ClockHeading from "./components/ClockHeading";
import CurrentTime from "./components/CurrentTime";

function App() {
  return (
    <>
      <div className="clock-block">
        <div className="container">
          <ClockHeading />
          <CurrentTime />
        </div>
      </div>
    </>
  );
}

export default App;
