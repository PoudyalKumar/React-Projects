import { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

function App() {
  const heading = "A simple Calculator In React Project";

  const [calVal, setCalVal] = useState("");
  const onButtonClick = (buttonText) => {
    if (buttonText === "C") {
      setCalVal("");
    } else if (buttonText === "=") {
      const result = eval(calVal);
      setCalVal(result);
    } else {
      const newDisplayValue = calVal + buttonText;
      setCalVal(newDisplayValue);
    }
  };

  return (
    <>
      <div className="calculator-block py-6">
        <div className="container">
          <h1 className="text-center">{heading}</h1>
          <div className="holder border border-primary p-5 rounded-2 mx-auto">
            <Display displayValue={calVal}></Display>
            <div className="button-holder d-flex flex-wrap justify-content-center">
              <Buttons onButtonClick={onButtonClick}></Buttons>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
