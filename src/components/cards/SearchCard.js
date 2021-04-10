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
`;

//const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

export default (props) => {
  const [books, setBooks] = useState(null);
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
          setBooks(response.data.data);
          setLoading(false);
        });
    };
    fetchData();
    //console.log("ran");
  }, [props]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {books.length === 0 ? (
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
          books.map((book, index) => {
            //console.log(book.route[book.length - 1].local_departure);
            if (props.oneWayOrReturn === "Round trip") {
              return (
                <StyledCard key={index}>
                  <FlightCard
                    obdDptTime={GetISOTime(book.route[0].local_departure)}
                    obdArrTime={
                      checkStops(book, "num", "obd") === "direct"
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
                      checkStops(book, "num", "obd") === "direct"
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
          })
        )}
      </div>
    );
  }
};
