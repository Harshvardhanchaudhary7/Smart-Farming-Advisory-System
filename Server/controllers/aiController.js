import { generateCropAdvice } from "../services/geminiService.js";

export const getCropAdvice = async (req, res) => {
  try {
    const {
  crop,
  soil,
  farmSize,
  weather,
  language,
} = req.body;

const languageMap = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  gu: "Gujarati",
  kn: "Kannada",
  pa: "Punjabi",
  or: "Odia",
};
const selectedLanguage =
  languageMap[language] || "English";

const prompt = `
You are an agriculture expert.

IMPORTANT RULES:

Respond ONLY in ${selectedLanguage}.

Do not mix languages.

All JSON VALUES must be written in ${selectedLanguage}.

DO NOT translate the JSON keys.

JSON keys MUST remain exactly:

summary
fertilizer
irrigation
diseaseRisk
expectedYield
actions

Farmer Details:

Crop: ${crop}

Soil: ${soil}

Farm Size: ${farmSize} acres

Weather:

Temperature: ${weather.temp}°C

Humidity: ${weather.humidity}%

Rain Chance: ${weather.rainChance}%

Wind: ${weather.wind} km/h

Return ONLY valid JSON.

Use EXACTLY this format:

{
  "summary": "...",
  "fertilizer": "...",
  "irrigation": "...",
  "diseaseRisk": "...",
  "expectedYield": "...",
  "actions": [
    "...",
    "...",
    "..."
  ]
}

Do not use markdown.

Do not explain anything.

Return JSON only.
`;


  const advice = await generateCropAdvice(prompt);

// Remove markdown if Gemini returns it
const cleanResponse = advice
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const json = JSON.parse(cleanResponse);

res.json(json);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};