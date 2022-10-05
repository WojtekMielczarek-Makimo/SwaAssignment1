function parentData(type, unit, time, place) {
  const getType = () => type;
  const getUnit = () => unit;
  const getTime = () => time;
  const getPlace = () => place;
  return { getType, getUnit, getTime, getPlace };
}

function weatherForecast({
  parent,
  from,
  to,
  type,
  unit,
  time,
  place,
  precipitation_types,
  directions,
}) {
  if (parent === undefined) {
    parent = parentData(type, unit, time, place);
  }
  const getPrecipitationTypes = () => precipitation_types;
  const getDirections = () => directions;
  const getFrom = () => from;
  const getTo = () => to;
  return {
    parent,
    getFrom,
    getTo,
    getPrecipitationTypes,
    getDirections,
  };
}

function weatherData({ parent, value, type, unit, time, place }) {
  if (parent === undefined) {
    parent = parentData(type, unit, time, place);
  }
  const getValue = () => value;
  return { parent, getValue };
}
