import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DayCard } from "./DayCard";
import { addTemp } from "../redux/actions";

export const Days = ({ coordinates, setDayTemp, setCurrent }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  let key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (coordinates.lat) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${key}`
        )
        .then(({ data }) => {
          setWeeklyData(data.daily);
          setCurrent(data.current);
          let dayTemp = {
            temp: data.daily[0].temp.day,
            weather: data.daily[0].weather[0].main,
          };

          setDayTemp(dayTemp);

          let arr = [
            `${data.daily[0].temp.morn}°C`,
            `${data.daily[0].temp.day}°C`,
            `${data.daily[0].temp.eve}°C`,
            `${data.daily[0].temp.night}°C`,
          ];
          dispatch(addTemp(arr));
        })
        .catch((err) => console.log(err));
    }
  }, [coordinates]);

  const showChart = (day, i) => {
    setSelected(i);

    let dayTemp = {
      temp: day.temp.day,
      weather: day.weather[0].main,
    };

    setDayTemp(dayTemp);

    dispatch(addTemp(arr));
  };

  return (
    <Wrapper>
      {weeklyData.length > 0 &&
        weeklyData.map((day, i) => (
          <div
            data-aos="fade-up"
            key={i}
            style={{
              border:
              selected === i ? "1px solid #5c9fe1" : "2px solid #e9e9e9",
              borderRadius: "5px",
              background: selected === i ? "#67c3e1" : "#fff",
              color: selected === i ? "#ffff" : "#76affa",
            }}
            onClick={() => {
              showChart(day, i);
            }}
          >
            <DayCard dayData={day} />
          </div>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 5px;
  padding: 15px;
  box-shadow: rgba(218, 192, 192, 0.35) 0px 5px 15px;
  display: flex;
  gap: 6px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0f3b58;
    border-radius: 5px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #323641;
  }
`;
