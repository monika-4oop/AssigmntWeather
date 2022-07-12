import React, { useState , useEffect} from "react";
import styled from "styled-components";

import sun from "../assets/sun.png";
import aniclouds from "../assets/aniclouds.png";
import raining from "../assets/raining.png";

export const DayCard = ({ dayData }) => {
  const [daYs, setDayName] = useState("");

  // useEffect(() => {
  //   var dayCard = { weekday: "long" };
  //   let timeZone = dayData.dt;
  //   let dayTime = new Date(timeZone * 2000);
    
  //   const dayLight = new Intl.DateTimeFormat("en-US", dayCard).format(dayTime);
  //   setDayName(dayLight);
  // }, [dayData]);

  return (
    <Container>
      <Heading>{daYs}</Heading>
      <Heading>
        {Math.round(dayData.temp.max - 273)}°
        {Math.round(dayData.temp.min - 273)}°
      </Heading>
      <Icon
        src={dayData.weather[0].main === "SunnyDay"? sun: dayData.weather[0].main === "Clouds" ? aniclouds : raining }
      />
      <Heading>{dayData.weather[0].main}</Heading>
    </Container>
  );
};

const Container = styled.div`
  padding: 6px 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  min-width: max-content;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background: #a5a6a7;
    border-radius:5px;
    color: Black;
  }
`;

const Heading = styled.h4``;
const Icon = styled.img`
  height: 60px;
  width: 50px;
`;
