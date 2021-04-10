export function Url(
  from,
  to,
  outboundDate,
  returnDate,
  oneWayOrReturn,
  passengersNum,
  tripClass,
  maxStopsNum,
  minPrice,
  maxPrice,
  outbound,
  inbound,
  sort
) {
  var num = "";
  if (tripClass === "Economy") {
    tripClass = "M";
  } else if (tripClass === "Business") {
    tripClass = "C";
  } else if (tripClass === "Economy Premium") {
    tripClass = "W";
  } else {
    tripClass = "F";
  }

  if (passengersNum > 1) {
    num = "0%2C0";
  }

  if (oneWayOrReturn === "Round trip") {
    return `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${to}&date_from=${outboundDate}&date_to=${outboundDate}&return_from=${returnDate}&return_to=${returnDate}&dtime_from=${
      outbound[0] + ":00"
    }&dtime_to=${outbound[1] + ":00"}&atime_from=${
      inbound[0] + ":00"
    }&atime_to=${
      inbound[1] + ":00"
    }&max_fly_duration=20&one_for_city=0&one_per_date=0&adults=${passengersNum}&children=0&selected_cabins=${tripClass}&adult_hold_bag=${num}&adult_hand_bag=${num}&only_working_days=false&only_weekends=false&partner_market=gb&curr=GBP&price_from=${minPrice}&price_to=${maxPrice}&max_stopovers=${maxStopsNum}&vehicle_type=aircraft&sort=${sort}&limit=10`;
  } else {
    return `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${to}&date_from=${outboundDate}&date_to=${outboundDate}&max_fly_duration=20&one_for_city=0&one_per_date=0&adults=${passengersNum}&children=0&selected_cabins=${tripClass}&adult_hold_bag=${num}&adult_hand_bag=${num}&only_working_days=false&only_weekends=false&partner_market=gb&curr=GBP&price_from=${minPrice}&price_to=${maxPrice}&max_stopovers=${maxStopsNum}&vehicle_type=aircraft&sort=${sort}&limit=10`;
  }
}
