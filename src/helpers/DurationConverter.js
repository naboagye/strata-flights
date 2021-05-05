/* calucates duration of flight from seconds into hours and minutes*/
export function DurTime(seconds) {
  if (!seconds) return "";

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m`;
  } else if (min === 0) {
    return `${sec}s`;
  } else {
    return `${min}m`;
  }
}

/*function to convert seconds to hrs and minutes*/
export function msToTime(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + "h" + minutes + "m";
}

/* gets ISO standard time*/
export function GetISOTime(iso) {
  return new Date(iso).toLocaleTimeString("en-GB").slice(0, -3);
}

export function GetISOTimeArr(iso, iso2) {
  return new Date(iso) > new Date(iso2)
    ? new Date(iso).toLocaleTimeString("en-GB").slice(0, -3)
    : new Date(iso).toLocaleTimeString("en-GB").slice(0, -3);
}

export function NumStops(stops) {
  if (stops.length > 2) {
    return "1 stop";
  }
}
/*calcualtes number of stops a flight has*/
export function checkStops(stops, check, obdOrIbd) {
  if (stops.route.length > 3) {
    if (obdOrIbd === "obd") {
      if (stops.route[0].flyTo !== stops.flyTo) {
        if (check === "num") {
          return "1 stop";
        } else if (check === "dur") {
          return msToTime(
            new Date(stops.route[1].utc_departure).getTime() -
              new Date(stops.route[0].utc_arrival).getTime()
          );
        } else {
          return stops.route[0].flyTo;
        }
      }
    } else {
      if (stops.route[2].flyTo !== stops.flyTo) {
        if (check === "num") {
          return "1 stop";
        } else if (check === "dur") {
          return msToTime(
            new Date(stops.route[3].utc_departure).getTime() -
              new Date(stops.route[2].utc_arrival).getTime()
          );
        } else {
          return stops.route[2].flyTo;
        }
      }
    }
  } else if (stops.route.length === 3) {
    if (obdOrIbd === "obd") {
      if (stops.route[0].flyTo !== stops.flyTo) {
        if (check === "num") {
          return "1 stop";
        } else if (check === "dur") {
          return msToTime(
            new Date(stops.route[1].utc_departure).getTime() -
              new Date(stops.route[0].utc_arrival).getTime()
          );
        } else {
          return stops.route[0].flyTo;
        }
      } else {
        if (check === "num") {
          return "direct";
        }
        return "";
      }
    } else {
      if (stops.route[2].flyFrom !== stops.flyTo) {
        if (check === "num") {
          return "1 stop";
        } else if (check === "dur") {
          return msToTime(
            new Date(stops.route[2].utc_departure).getTime() -
              new Date(stops.route[1].utc_arrival).getTime()
          );
        } else {
          return stops.route[0].flyTo;
        }
      } else {
        if (check === "num") {
          return "direct";
        }
        return "";
      }
    }
  } else {
    if (check === "num") {
      return "direct";
    }
    return "";
  }
}

/*gets date in dd/mm/yyy format*/
export function getDDMMYYYY(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy;
}

/*gets date in dd/mm/yyy format and format for api*/
export function getDDMMYYYYAPI(date) {
  date.setDate(date.getDate() + 7);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "%2F" + mm + "%2F" + yyyy;
}

/*gets date in yyyy-mm-dd format*/
export function getYYYYMMDD(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}
