import React from "react";

const Buttons = ({ onButtonClick }) => {
  const buttonNames = [
    "*",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "C",
    "=",
  ];

  // Set of operator symbols
  const operators = new Set(["/", "*", "+", "-", "C"]);
  // Set of width-specific buttons
  const wideButtons = new Set(["="]);

  return (
    <>
      {buttonNames.map((button) => {
        // Check if the button is an operator
        const isOperator = operators.has(button);
        // Check if the button should have wide width
        const isWide = wideButtons.has(button);

        return (
          <div
            className={`px-4 pb-4 ${isWide ? "w-100" : "w-25"}`} // Apply width class based on condition
            key={button}
          >
            <a
              onClick={() => onButtonClick(button)}
              href="#"
              className={`btn d-block p-6 text-center ${
                isOperator ? "btn-warning" : "btn-primary"
              }`}
            >
              {button}
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Buttons;
