import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChartsMain } from "../components/Charts";
import { Days } from "../components/Days";
import { Search } from "../components/Search";
import { Coordinates } from "../logic/defaultLocation";
import loadingif from "../assets/loadingif.gif";

export const Home = () => {
  const [coordinates, setCoordinates] = useState({});
  const [dayTemp, setDayTemp] = useState({});
  const [current, setCurrent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Coordinates(setCoordinates);
  }, []);

  return (
    <>
      <Container>
        <Search
          setLoading={setLoading}
          setCoordinates={setCoordinates}
          coordinates={coordinates}
        />

        {loading ? (
          <Box>
            <Image src={loadingif} />
            <Heading>Retry</Heading>
          </Box>
        ) : !coordinates.lat ? (
          <Box>
            <Image src={loadingif} />
            <Heading>No City! Turn on the loaction</Heading>
          </Box>
        ) : (
          <Wrapper>
            <Days
              coordinates={coordinates}
              dayTemp={dayTemp}
              setDayTemp={setDayTemp}
              setCurrent={setCurrent}
            />

            <ChartsMain dayTemp={dayTemp} current={current} />
          </Wrapper>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 100%;
  min-width: 100%;
  background: white;
  border-radius: 15px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  max-height: 700px;
  overflow-y: auto;

  @media screen and (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
  }
`;

const Wrapper = styled.div``;

const Box = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const Heading = styled.h2`
  color: black;
  text-align: center;
  padding: 15px;
`;
