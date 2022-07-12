import React, { Component, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import styled from "styled-components";

import sun from "../assets/sun.png";
import aniclouds from "../assets/aniclouds.png";
import raining from "../assets/raining.png";
import { SunDetails } from "./SunDetails";

export const ChartsMain = ({ dayTemp, current }) => {
  const temp = useSelector((store) => store.temp);
  useEffect(() => {}, [temp]);

  const Showtemp = () => {
    return (
      <>
        <Charts temp={temp} />
      </>
    );
  };
  return (
    temp && (
      <Card>
        <Container>
          <Heading>{Math.round(dayTemp.temp - 273)}°C</Heading>

          <Icon
            src={
              dayTemp.weather === "Clear" ? sun : dayTemp.weather === "Clouds" ? aniclouds : raining
            }
          />
        </Container>
        <Showtemp />

        <SunDetails current={current} />
      </Card>
    )
  );
};


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      },
      {
        name: 'Total Visits',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Page Statistics',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
          '10 Jan', '11 Jan', '12 Jan'
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    },
  
  
  };





    
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="100%"
          height="300px"
        />
      </div>
    );
  }
}



const Card = styled.div`
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
`;

const Heading = styled.h1`
  color: black;
`;

const Icon = styled.img`
  height: 3rem;
  width: 3rem;
`;