function displayTextInContent(text, data) {
  document.getElementById("content").innerHTML = "<p>" + text + data + "</p>";
}

function displayForecastTable(data) {
  var temp =
    "<table><thead><tr><td>From</td><td>To</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td><td>Additional data</td></tr></thead><tbody>";
  data.forEach((weather) => {
    let other = "none";
    if (weather.parent.getType() === "precipitation") {
      other = "Precipitation types: " + weather.getPrecipitationTypes();
    } else if (weather.parent.getType() === "wind speed") {
      other = "Wind directions: " + weather.getDirections();
    }
    let newTime = new Date(weather.parent.getTime());
    newTime = newTime.getUTCHours() + ":" + newTime.getUTCMinutes();
    temp += "<tr>";
    temp += "<td>" + weather.getFrom() + "</td>";
    temp += "<td>" + weather.getTo() + "</td>";
    temp += "<td>" + weather.parent.getType() + "</td>";
    temp += "<td>" + weather.parent.getUnit() + "</td>";
    temp += "<td>" + newTime + "</td>";
    temp += "<td>" + weather.parent.getPlace() + "</td>";
    temp += "<td>" + other + "</td></tr>";
    //console.log(weather);
  });
  temp += "</tbody></table>";
  document.getElementById("content").innerHTML = temp;
}

function displayLatestMeasurementTable(data) {
  var temp =
    "<table><thead><tr><td>Place</td><td>Type</td><td>Unit</td><td>Value</td><td>Time</td></tr></thead><tbody>";
  data.forEach((weather) => {
    let newTime = new Date(weather.parent.getTime());
    newTime = newTime.getUTCHours() + ":" + newTime.getUTCMinutes();
    temp += "<tr>";
    temp += "<td>" + weather.parent.getPlace() + "</td>";
    temp += "<td>" + weather.parent.getType() + "</td>";
    temp += "<td>" + weather.parent.getUnit() + "</td>";
    temp += "<td>" + weather.getValue() + "</td>";
    temp += "<td>" + newTime + "</td>";
    //console.log(weather);
  });
  temp += "</tbody></table>";
  document.getElementById("content").innerHTML = temp;
}

function returnNewDate(int) {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + int);
  return newDate;
}

function cleanTextInput() {
  document.getElementById("content").innerHTML =
    "Choose the city and click on one of the buttons to display the data";
}
