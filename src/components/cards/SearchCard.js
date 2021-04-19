import React, { useState, useEffect } from "react";
import axios from "axios";
//import tw from "twin.macro";
import { Card } from "react-rainbow-components";
import FlightCard from "./FlightCard";
import styled from "styled-components";
import {
  DurTime,
  GetISOTime,
  GetISOTimeArr,
  NumStops,
  getDDMMYYYY,
  checkStops,
} from "helpers/DurationConverter.js";
import { Url } from "helpers/UrlBuilder.js";
import noresults from "images/noresults.svg";

const StyledCard = styled(Card)`
  min-height: 200px;
  margin: 10px 0 10px 0;
`;

//const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

export default (props) => {
  const [flights, setFlights] = useState(null);
  const [isLoading, setLoading] = useState(props.isLoading);

  // console.log(
  //   "@@@@",
  //   props.from,
  //   props.to,
  //   props.fromDate,
  //   props.toDate,
  //   props.oneWayOrReturn,
  //   props.passengersNum,
  //   props.tripClass,
  //   "stops: ",
  //   props.maxStopsNum,
  //   "min: ",
  //   props.minPrice,
  //   "max: ",
  //   props.maxPrice,
  //   props.outbound,
  //   props.inbound,
  //   props.sort,
  //   isLoading
  // );

  useEffect(() => {
    setLoading(props.isLoading);
    const options = {
      headers: { apiKey: "H9cYBRBqvEQ9jTIoSMoKb-8ft15P0dCz" },
    };
    const fetchData = async () => {
      await axios
        .get(
          Url(
            props.from,
            props.to,
            getDDMMYYYY(props.fromDate),
            getDDMMYYYY(props.toDate),
            props.oneWayOrReturn,
            props.passengersNum,
            props.tripClass,
            props.maxStopsNum,
            props.minPrice,
            props.maxPrice,
            props.outbound,
            props.inbound,
            props.sort
          ),
          options
        )
        .then((response) => {
          setFlights(response.data.data);
          setLoading(false);
        });
    };
    fetchData();
  }, [props]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {flights.length === 0 ? (
          <div className="rainbow-p-around_large">
            <Card title="Oops! No results found for your search. Please try again!">
              <img
                src={noresults}
                className="rainbow-p-around_xx-large rainbow-m_auto rainbow-align-content_center"
                alt="landscape with rainbows, birds and colorful balloons"
              />
            </Card>
          </div>
        ) : (
          flights.map((flight, index) => {
            if (props.oneWayOrReturn === "Round trip") {
              return (
                <StyledCard key={index}>
                  <FlightCard
                    obdDptTime={GetISOTime(flight.route[0].local_departure)}
                    obdArrTime={
                      checkStops(flight, "num", "obd") === "direct"
                        ? GetISOTimeArr(
                            flight.route[0].local_arrival,
                            flight.route[0].local_departure
                          )
                        : GetISOTime(flight.route[1].local_arrival)
                    }
                    obdDuration={DurTime(flight.duration.departure)}
                    obdAirline={flight.route[0].airline}
                    obdDptAirportCode={flight.flyFrom}
                    obdArrAirportCode={flight.flyTo}
                    obdNumStops={checkStops(flight, "num", "obd")}
                    obdStopDuration={checkStops(flight, "dur", "obd")}
                    obdStopAirportCode={checkStops(flight, "code", "obd")}
                    ibdDptTime={
                      checkStops(flight, "num", "obd") === "direct"
                        ? GetISOTime(
                            flight.route[flight.route.length - 1]
                              .local_departure
                          )
                        : GetISOTime(flight.route[2].local_departure)
                    }
                    ibdArrTime={GetISOTime(
                      flight.route[flight.route.length - 1].local_arrival
                    )}
                    ibdDuration={DurTime(flight.duration.return)}
                    ibdAirline={isLoading ? "" : flight.route[1].airline}
                    ibdDptAirportCode={flight.flyTo}
                    ibdArrAirportCode={flight.flyFrom}
                    ibdNumStops={checkStops(flight, "num", "ibd")}
                    ibdStopDuration={checkStops(flight, "dur", "ibd")}
                    ibdStopAirportCode={checkStops(flight, "code", "ibd")}
                    price={flight.price}
                    link={flight.deep_link}
                  />
                </StyledCard>
              );
            } else {
              return (
                <StyledCard key={index}>
                  <FlightCard
                    obdDptTime={GetISOTime(flight.route[0].local_departure)}
                    obdArrTime={GetISOTime(flight.route[0].local_arrival)}
                    obdDuration={DurTime(flight.duration.departure)}
                    obdAirline={flight.route[0].airline}
                    obdDptAirportCode={flight.route[0].flyFrom}
                    obdArrAirportCode={flight.route[0].flyTo}
                    obdNumStops={NumStops(flight.has_airport_change)}
                    obdStopDuration={checkStops(flight, "dur", "obd")}
                    obdStopAirportCode={checkStops(flight, "code", "obd")}
                    price={flight.price}
                    link={flight.deep_link}
                  />
                </StyledCard>
              );
            }
          })
        )}
      </div>
    );
  }
};
