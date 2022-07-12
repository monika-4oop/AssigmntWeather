import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";


export const SunDetails = ({ current }) => {
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  useEffect(() => {
    let sunrise = current.sunrise;
    let sunRtime = new Date(sunrise * 1000);
    setSunrise(sunRtime.toLocaleTimeString());

    let sunset = current.sunset;
    let sunStime = new Date(sunset * 1000);
    setSunset(sunStime.toLocaleTimeString());
  }, [current]);

  return (
    <Body>
      <Card type="grid">
        <Container>
          <Heading state="title">Pressure</Heading>
          <Heading>{current.pressure} HPA</Heading>
        </Container>
        <Container>
          <Heading state="title">Humidity</Heading>
          <Heading>{current.humidity} %</Heading>
        </Container>
      </Card>
      <Card type="rise">
        <Container type="sun">
          <Heading state="title">Sunrise</Heading>
          <Heading>{sunrise} </Heading>
        </Container>
        <Container type="sun">
          <Heading state="title">Sunset</Heading>
          <Heading>{sunset} </Heading>
        </Container>
      </Card>
    </Body>
  );
};

const Body = styled.div``;

const Card= styled.div`
  display: ${({ type }) =>
    type === "rise" ? "flex" : type === "grid" ? "grid" : "block"};
  justify-content: space-between;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;

const Container = styled.div`
  background: ${({ type }) => (type === "sun" ? "#ffff" : "#f3fbff")};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const Heading = styled.p`
  font-weight: ${({ state }) => (state === "title" ? "600" : "200")};
  font-size: 14px;
  color: #596977;
  line-height: 21px;
`;

const Image = styled.img`
  grid-column: 1/3;
  width: 100%;
`;
