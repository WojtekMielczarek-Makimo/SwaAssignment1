// The hourly forecast for the next 24 hours
async function fetchGetForecast(city) {
  try {
    const response = await fetch("http://localhost:8080/forecast/" + city);
    const res = await response.json();
    const newDate = returnNewDate(+1);
    const data = res
      .filter((data) => {
        return newDate;
      })
      .map(weatherForecast);
    displayForecastTable(data);
  } catch (e) {
    console.log("Fetch error: " + e);
  }
}

// Minimum temperature for the last day
async function fetchGetMinTemperature(city) {
  try {
    const res = await fetch("http://localhost:8080/data/" + city);
    const data = await res.json();
    const newDate = returnNewDate(-1);
    let filteretData = data
      .filter((it) => it.type == "temperature")
      .filter((data) => {
        let date = new Date(data.time);
        return date.getDate() == newDate.getDate();
      });
    let minTemp = filteretData
      .map((element) => element.value)
      .reduce((a, b) => Math.min(a, b));
    console.log(minTemp);
    const title = "Minimum temperature for the last day: ";
    displayTextInContent(title, minTemp);
  } catch (e) {
    console.log("Fetch error: " + e);
  }
}

// Maximum temperature for the last day
async function fetchGetMaxTemperature(city) {
  try {
    const res = await fetch("http://localhost:8080/data/" + city);
    const data = await res.json();
    const newDate = returnNewDate(-1);
    let filteretData = data
      .filter((it) => it.type == "temperature")
      .filter((data) => {
        let date = new Date(data.time);
        return date.getDate() == newDate.getDate();
      });
    let maxTemp = filteretData
      .map((element) => element.value)
      .reduce((a, b) => Math.max(a, b));
    console.log(maxTemp);
    const title = "Maximum temperature for the last day: ";
    displayTextInContent(title, maxTemp);
  } catch (e) {
    console.log("Fetch error: " + e);
  }
}

// The average wind speed
async function fetchGetAverageWindSpeed(city) {
  try {
    const response = await fetch("http://localhost:8080/data/" + city);
    const res = await response.json();
    const newDate = returnNewDate(-1);
    let wind = res
      .filter((data) => data.type == "wind speed")
      .filter((data) => {
        let date = new Date(data.time);
        return date.getDate() == newDate.getDate();
      })
      .map((it) => it.value);
    const sum = wind.reduce((a, b) => a + b, 0);
    let avg = sum / wind.length || 0;
    avg = Math.round(avg * 100) / 100;
    const title = "The average wind speed is: ";
    displayTextInContent(title, avg);
  } catch (e) {
    console.log("Fetch error: " + e);
  }
}

// Total precipitation for last day
async function fetchGetTotalprecipitation(city) {
  try {
    const response = await fetch("http://localhost:8080/data/" + city);
    const res = await response.json();
    const newDate = returnNewDate(-1);
    let prec = res
      .filter((data) => data.type == "precipitation")
      .filter((data) => {
        let date = new Date(data.time);
        return date.getDate() == newDate.getDate();
      })
      .map((it) => it.value);
    let sum = prec.reduce((a, b) => a + b, 0);
    sum = Math.round(sum * 100) / 100;
    const title = "Total precipitation for last day: ";
    displayTextInContent(title, sum);
  } catch (e) {
    console.log("Fetch error: " + e);
  }
}

// All data for the latest measurement of each kind
async function fetchGetLatestMeasurementOfEachKind(city) {
  try {
    const response = await fetch("http://localhost:8080/data/" + city);
    const res = await response.json();
    const allData = res.map(weatherData);
    const dataFromLastDay = new Date(
      Math.max(...allData.map((item) => new Date(item.parent.getTime())))
    );
    const filteredData = allData.filter(
      (item) =>
        new Date(item.parent.getTime()).getTime() === dataFromLastDay.getTime()
    );
    displayLatestMeasurementTable(filteredData);
  } catch (e) {
    console.log("Fetch error: " + e);
  }
}
