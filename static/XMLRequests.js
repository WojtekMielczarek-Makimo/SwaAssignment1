const baseUrl = "http://localhost:8080";
const request = new XMLHttpRequest();

// The hourly forecast for the next 24 hours
async function getForecast(city) {
  request.open("GET", `${baseUrl}/forecast/` + city);
  request.send();
  request.onload = async () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let res = JSON.parse(request.responseText);
      const newDate = returnNewDate(+1);
      const data = res
        .filter((data) => {
          return newDate;
        })
        .map(weatherForecast);
      displayForecastTable(data);
    } else {
      throw new Error(
        `[${new Date().toISOString()}]: HTTP response: ${request.status} ${
          request.statusText
        }`
      );
    }
  };
}

// Minimum temperature for the last day
async function getMinTemperature(city) {
  request.open("GET", `${baseUrl}/data/` + city);
  request.send();
  request.onload = async () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let data = JSON.parse(request.responseText);
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
    } else {
      throw new Error(
        `[${new Date().toISOString()}]: HTTP response: ${request.status} ${
          request.statusText
        }`
      );
    }
  };
}

// Maximum temperature for the last day
async function getMaxTemperature(city) {
  request.open("GET", `${baseUrl}/data/` + city);
  request.send();
  request.onload = async () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let data = JSON.parse(request.responseText);
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
    } else {
      throw new Error(
        `[${new Date().toISOString()}]: HTTP response: ${request.status} ${
          request.statusText
        }`
      );
    }
  };
}

// The average wind speed for the last day
async function getAverageWindSpeed(city) {
  request.open("GET", `${baseUrl}/data/` + city);
  request.send();
  request.onload = async () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let res = JSON.parse(request.responseText);
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
    } else {
      throw new Error(
        `[${new Date().toISOString()}]: HTTP response: ${request.status} ${
          request.statusText
        }`
      );
    }
  };
}

// Total precipitation for last day
async function getTotalprecipitation(city) {
  request.open("GET", `${baseUrl}/data/` + city);
  request.send();
  request.onload = async () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let res = JSON.parse(request.responseText);
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
    } else {
      throw new Error(
        `[${new Date().toISOString()}]: HTTP response: ${request.status} ${
          request.statusText
        }`
      );
    }
  };
}

// All data for the latest measurement of each kind
async function getLatestMeasurementOfEachKind(city) {
  request.open("GET", `${baseUrl}/data/` + city);
  request.send();
  request.onload = async () => {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let res = JSON.parse(request.responseText);
      const allData = res.map(weatherData);
      allData.forEach((item) => {
        const a = new Date(item.parent.getTime());
        console.log(a.getTime());
      });
      const dataFromLastDay = new Date(
        Math.max(...allData.map((item) => new Date(item.parent.getTime())))
      );
      const filteredData = allData.filter(
        (item) =>
          new Date(item.parent.getTime()).getTime() ===
          dataFromLastDay.getTime()
      );
      displayLatestMeasurementTable(filteredData);
    } else {
      throw new Error(
        `[${new Date().toISOString()}]: HTTP response: ${request.status} ${
          request.statusText
        }`
      );
    }
  };
}
