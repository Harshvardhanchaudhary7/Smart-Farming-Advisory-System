export const seasonTranslations = {
  en: {
    Summer: "Summer",
    Winter: "Winter",
    Monsoon: "Monsoon",
    Spring: "Spring",
  },

  hi: {
    Summer: "ग्रीष्म",
    Winter: "शीत ऋतु",
    Monsoon: "मानसून",
    Spring: "वसंत",
  },
};

export const soilTranslations = {
  en: {
    "Loamy Soil": "Loamy Soil",
    "Clay Soil": "Clay Soil",
    "Black Soil": "Black Soil",
    "Sandy Soil": "Sandy Soil",
  },

  hi: {
    "Loamy Soil": "दोमट मिट्टी",
    "Clay Soil": "चिकनी मिट्टी",
    "Black Soil": "काली मिट्टी",
    "Sandy Soil": "रेतीली मिट्टी",
  },
};

export const translateSeason = (
  season,
  language
) => {
  return (
    seasonTranslations[language]?.[season] ||
    season
  );
};

export const translateSoil = (
  soil,
  language
) => {
  return (
    soilTranslations[language]?.[soil] ||
    soil
  );
};