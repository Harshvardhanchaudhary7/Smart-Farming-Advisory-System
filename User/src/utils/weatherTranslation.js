const weatherTranslations = {
  hi: {
    // Clear
    "Sunny": "धूप",
    "Clear": "साफ",
    "Partly Cloudy": "आंशिक रूप से बादल",
    "Cloudy": "बादल",
    "Overcast": "घने बादल",

    // Mist & Fog
    "Mist": "कोहरा",
    "Fog": "घना कोहरा",
    "Freezing fog": "जमने वाला कोहरा",

    // Drizzle
    "Patchy light drizzle": "हल्की फुहार",
    "Light drizzle": "हल्की फुहार",
    "Freezing drizzle": "जमने वाली फुहार",
    "Heavy freezing drizzle": "भारी जमने वाली फुहार",

    // Rain
    "Patchy rain nearby": "आसपास हल्की वर्षा",
    "Patchy light rain": "हल्की वर्षा",
    "Light rain": "हल्की वर्षा",
    "Moderate rain at times": "कभी-कभी मध्यम वर्षा",
    "Moderate rain": "मध्यम वर्षा",
    "Heavy rain at times": "कभी-कभी भारी वर्षा",
    "Heavy rain": "भारी वर्षा",
    "Light freezing rain": "हल्की जमने वाली वर्षा",
    "Moderate or heavy freezing rain": "मध्यम या भारी जमने वाली वर्षा",

    // Thunder
    "Thundery outbreaks nearby": "आसपास गरज के साथ वर्षा",
    "Patchy light rain with thunder": "हल्की गरज के साथ वर्षा",
    "Moderate or heavy rain with thunder": "मध्यम या भारी वर्षा के साथ गरज",
    "Patchy light snow with thunder": "हल्की बर्फबारी के साथ गरज",
    "Moderate or heavy snow with thunder": "भारी बर्फबारी के साथ गरज",
    "Thunderstorm": "आंधी",

    // Snow
    "Patchy snow nearby": "आसपास हल्की बर्फबारी",
    "Patchy light snow": "हल्की बर्फबारी",
    "Light snow": "हल्की बर्फ",
    "Patchy moderate snow": "मध्यम बर्फबारी",
    "Moderate snow": "मध्यम बर्फ",
    "Patchy heavy snow": "भारी बर्फबारी",
    "Heavy snow": "भारी बर्फ",
    "Ice pellets": "ओलों जैसी बर्फ",
    "Light sleet": "हल्की ओलावृष्टि",
    "Moderate or heavy sleet": "मध्यम या भारी ओलावृष्टि",
    "Light snow showers": "हल्की बर्फबारी",
    "Moderate or heavy snow showers": "भारी बर्फबारी",
    "Light showers of ice pellets": "हल्के बर्फीले कण",
    "Moderate or heavy showers of ice pellets": "भारी बर्फीले कण",

    // Wind
    "Windy": "तेज़ हवा",
    "Blowing snow": "बर्फीली हवा",
    "Blizzard": "बर्फ़ीला तूफ़ान",

    // Other
    "Haze": "धुंध",
    "Smoke": "धुआँ",
    "Dust": "धूल",
    "Sandstorm": "रेत का तूफ़ान"
  },

  bn: {
    Sunny: "রৌদ্রোজ্জ্বল",
    Clear: "পরিষ্কার",
    Cloudy: "মেঘলা",
    Rain: "বৃষ্টি",
  },

  mr: {
    Sunny: "सूर्यप्रकाश",
    Clear: "स्वच्छ",
    Cloudy: "ढगाळ",
    Rain: "पाऊस",
  },

  ta: {
    Sunny: "வெயில்",
    Clear: "தெளிவு",
    Cloudy: "மேகமூட்டம்",
    Rain: "மழை",
  },

  te: {
    Sunny: "ఎండ",
    Clear: "స్పష్టంగా",
    Cloudy: "మేఘావృతం",
    Rain: "వర్షం",
  }
};

export const translateWeather = (condition, language) => {

  if (language === "en") return condition;

  return weatherTranslations[language]?.[condition] || condition;

};