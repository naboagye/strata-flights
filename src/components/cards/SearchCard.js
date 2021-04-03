import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Avatar, Button } from "react-rainbow-components";
import FlightCard from "./FlightCard";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import {
  DurTime,
  GetISOTime,
  GetISOTimeArr,
  NumStops,
  getDDMMYYYY,
  checkStops,
} from "helpers/DurationConverter.js";
import { Url } from "helpers/UrlBuilder.js";

const StyledCard = styled(Card)`
  width: 990px;
  height: 200px;
`;

export default (props) => {
  const [books, setBooks] = useState(null);
  const [isLoading, setLoading] = useState(props.isLoading);

  const options = {
    headers: { apiKey: "H9cYBRBqvEQ9jTIoSMoKb-8ft15P0dCz" },
  };
  const location = useLocation();
  console.log(
    "@@@@",
    props.from,
    props.to,
    props.fromDate,
    props.toDate,
    props.oneWayOrReturn,
    props.passengersNum,
    props.tripClass,
    "stops: ",
    props.maxStopsNum,
    "min: ",
    props.minPrice,
    "max: ",
    props.maxPrice,
    props.outbound,
    props.inbound,
    props.sort,
    isLoading
  );

  const fetchData = async () => {
    const response = await axios
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
        setBooks(response.data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(props.isLoading);
    fetchData();
    console.log("ran");
  }, [props]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {books &&
          books.map((book, index) => {
            //console.log(book.route[book.length - 1].local_departure);
            if (props.oneWayOrReturn === "Round trip") {
              return (
                <StyledCard key={index}>
                  <FlightCard
                    obdDptTime={GetISOTime(book.route[0].local_departure)}
                    obdArrTime={
                      checkStops(book, "num", "obd") == "direct"
                        ? GetISOTimeArr(
                            book.route[0].local_arrival,
                            book.route[0].local_departure
                          )
                        : GetISOTime(book.route[1].local_arrival)
                    }
                    obdDuration={DurTime(book.duration.departure)}
                    obdAirline={book.route[0].airline}
                    obdDptAirportCode={book.flyFrom}
                    obdArrAirportCode={book.flyTo}
                    obdNumStops={checkStops(book, "num", "obd")}
                    obdStopDuration={checkStops(book, "dur", "obd")}
                    obdStopAirportCode={checkStops(book, "code", "obd")}
                    ibdDptTime={
                      checkStops(book, "num", "obd") == "direct"
                        ? GetISOTime(
                            book.route[book.route.length - 1].local_departure
                          )
                        : GetISOTime(book.route[2].local_departure)
                    }
                    ibdArrTime={GetISOTime(
                      book.route[book.route.length - 1].local_arrival
                    )}
                    ibdDuration={DurTime(book.duration.return)}
                    ibdAirline={isLoading ? "" : book.route[1].airline}
                    ibdDptAirportCode={book.flyTo}
                    ibdArrAirportCode={book.flyFrom}
                    ibdNumStops={checkStops(book, "num", "ibd")}
                    ibdStopDuration={checkStops(book, "dur", "ibd")}
                    ibdStopAirportCode={checkStops(book, "code", "ibd")}
                    price={book.price}
                    link={book.deep_link}
                  />
                </StyledCard>
              );
            } else {
              return (
                <StyledCard key={index}>
                  <FlightCard
                    obdDptTime={GetISOTime(book.route[0].local_departure)}
                    obdArrTime={GetISOTime(book.route[0].local_arrival)}
                    obdDuration={DurTime(book.duration.departure)}
                    obdAirline={book.route[0].airline}
                    obdDptAirportCode={book.route[0].flyFrom}
                    obdArrAirportCode={book.route[0].flyTo}
                    obdNumStops={NumStops(book.has_airport_change)}
                    obdStopDuration={checkStops(book, "dur", "obd")}
                    obdStopAirportCode={checkStops(book, "code", "obd")}
                    price={book.price}
                    link={book.deep_link}
                  />
                </StyledCard>
              );
            }
          })}
      </div>
    );
  }
};
