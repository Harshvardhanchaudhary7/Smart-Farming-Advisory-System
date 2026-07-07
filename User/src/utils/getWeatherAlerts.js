export const getWeatherAlerts = (weather) => {

  if (!weather) return [];

  const alerts = [];

  const current = weather.current;
  const forecast = weather.forecast.forecastday[0].day;

  // Heavy Rain
  if (forecast.daily_chance_of_rain >= 70) {

    alerts.push({
      type: "rain",
      status: "Active",

      titleKey: "heavyRainAlert",

      descriptionKey: "heavyRainDescription",

      actionKey: "heavyRainAction",
    });

  }

  // High Temperature
  if (current.temp_c >= 38) {

    alerts.push({
      type: "heat",
      status: "Warning",

      titleKey: "highTemperatureAlert",

      descriptionKey: "highTemperatureDescription",

      actionKey: "highTemperatureAction",
    });

  }

  // Strong Wind
  if (current.wind_kph >= 30) {

    alerts.push({
      type: "wind",
      status: "Warning",

      titleKey: "strongWindAlert",

      descriptionKey: "strongWindDescription",

      actionKey: "strongWindAction",
    });

  }

  // High Humidity
  if (current.humidity >= 80) {

    alerts.push({
      type: "humidity",
      status: "Warning",

      titleKey: "highHumidityAlert",

      descriptionKey: "highHumidityDescription",

      actionKey: "highHumidityAction",
    });

  }

  return alerts;

};