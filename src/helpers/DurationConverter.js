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
  } else if (min == 0) {
    return `${sec}s`;
  } else {
    return `${min}m`;
  }
}

export function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  //hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + "h" + minutes + "m";
}

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
