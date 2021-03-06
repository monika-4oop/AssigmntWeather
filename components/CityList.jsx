import React from "react";

export const CityList = ({ city, state }) => {
  return (
    <>
      <div className="city" >
        <h5 style={{ color: "#496b8d", fontSize: "16px" }}>
          {city},
          <span
            style={{ color: "#a2a5a8", fontWeight: "200", fontSize: "16px" }}>
            {state}
          </span>
        </h5>
      </div>
    </>
  );
};
