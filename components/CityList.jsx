import React from "react";

export const CityList = ({ city, state }) => {
  return (
    <>
      <div className="city" >
        <h5 style={{ color: "#364758", fontSize: "16px" }}>
          {city},
          <span
            style={{ color: "#9ba3ac", fontWeight: "200", fontSize: "16px" }}>
            {state}
          </span>
        </h5>
      </div>
    </>
  );
};
