import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImLocation, ImSearch } from "react-icons/im";
import axios from "axios";
import { cities } from "../data/Cities";
import { CityList } from "./CityList";
import { Coordinates } from "../logic/defaultLocation";

export const Search = ({ setCoordinates, coordinates, setLoading }) => {
  const [searchData, setSearchData] = useState([]);
  const [city, setCity] = useState("");
  const [show, setShow] = useState(true);
  let keyWeather = import.meta.env.VITE_API_KEY;
  let id;

  // error css
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setShow(true);
    setCity(e);

    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      let filterData = [];
      cities.forEach((el) => {
        if (el.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())) {
          filterData.push(el);
        }
      });

      setSearchData([...filterData]);
    }, 800);
  };

  const getWeather = (e) => {
    e.preventDefault();

    if (city === "") {
      alert("please....");
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyWeather}`
        )
        .then(({ data }) => {
          const obj = { lat: data.coord.lat, lng: data.coord.lon };
          setCoordinates(obj);
          setCity(data.name);
          console.log(city);
        })
        .catch((err) => {
          toast.error(err.response.data.message.toUpperCase(), toastOptions);
        });
    }
    setShow(false);
  };

  const getFromList = (cty) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cty.name}&appid=${keyWeather}`
      )
      .then(({ data }) => {
        const obj = { lat: data.coord.lat, lng: data.coord.lon };
        setCoordinates(obj);
        setCity(data.name);
        console.log(cty);
        console.log(coordinates)
      })
      .catch((err) =>
        toast.error(err.response.data.message.toUpperCase(), toastOptions)
      );
    setShow(false);
  };

  useEffect(() => {
    setLoading(true);
    if (coordinates.lat !== undefined) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${keyWeather}`
        )
        .then(({ data }) => {
          setCity(data.name);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [coordinates]);

  const currentLocation = () => {
    Coordinates(setCoordinates);
  };

  return (
    <Container>
      <Page onSubmit={getWeather}>
        <Item style={{ cursor: "pointer" }} onClick={currentLocation}>
          <ImLocation />
        </Item>
        <Input
          placeholder="Search"
          
          onChange={(e) => handleChange(e.target.value)}
        />

        <Button>
          <Item>
            <ImSearch />
          </Item>
        </Button>
      </Page>

      {searchData.length !== 0 && show == true && (
        <div className={"cityList"}>
          <div className={"optionBox"}>
            {searchData.map((cty) => {
              return (
                <div
                  //key={i}
                  onClick={() => {
                    getFromList(cty);
                  }}
                >
                  <CityList city={cty.name} state={cty.state} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  .cityList {
    width: 100%;
    position: relative;
    margin-top: 10px;
  }

  .optionBox {
    position: absolute;
    z-index: 500;
    background-color: white;
    transition: 0.3s;
    width: 100%;
    max-height: 25px;
    overflow-y: auto;
    border-radius: 5px;
    box-shadow: rgba(28, 1, 1, 0.35) 0px 5px 15px;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #074168;
      border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #010c31;
    }
  }

  .city {
    padding: 12px 16px;
    word-spacing: 2px;
    border-bottom: 0.3px solid grey;
  }

  .city:hover {
    cursor: pointer;
  }
`;

const Page = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  padding: 0.2rem 1rem;
  border: 2px solid transparent;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: sticky;
  top: 0;

  :focus-within {
    border: 2px solid black;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
`;

const Item = styled.div``;

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  font-size: 1.2rem;
  cursor: pointer;
`;
