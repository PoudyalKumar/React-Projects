import React from "react";

const Display = ({ displayValue }) => {
  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          className="form-control form-control-lg"
          value={displayValue}
          readOnly
        />
      </div>
    </>
  );
};

export default Display;
