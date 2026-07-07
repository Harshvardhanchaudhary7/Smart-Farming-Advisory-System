export const getNotificationText = (language) => {

  const messages = {

    en: {
      title: "New Crop Advisory",
      body: "AI has generated a new recommendation."
    },

    hi: {
      title: "नई फसल सलाह",
      body: "AI ने नई फसल सलाह तैयार की है।"
    },

    bn: {
      title: "নতুন ফসল পরামর্শ",
      body: "AI একটি নতুন ফসল পরামর্শ তৈরি করেছে।"
    },

    mr: {
      title: "नवीन पीक सल्ला",
      body: "AI ने नवीन पीक सल्ला तयार केला आहे."
    },

    ta: {
      title: "புதிய பயிர் ஆலோசனை",
      body: "AI புதிய பயிர் ஆலோசனையை உருவாக்கியுள்ளது."
    },

    te: {
      title: "కొత్త పంట సలహా",
      body: "AI కొత్త పంట సలహాను రూపొందించింది."
    },

    gu: {
      title: "નવી પાક સલાહ",
      body: "AI એ નવી પાક સલાહ તૈયાર કરી છે."
    },

    kn: {
      title: "ಹೊಸ ಬೆಳೆ ಸಲಹೆ",
      body: "AI ಹೊಸ ಬೆಳೆ ಸಲಹೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿದೆ."
    },

    pa: {
      title: "ਨਵੀਂ ਫਸਲ ਸਲਾਹ",
      body: "AI ਨੇ ਨਵੀਂ ਫਸਲ ਸਲਾਹ ਤਿਆਰ ਕੀਤੀ ਹੈ।"
    },

    or: {
      title: "ନୂତନ ଫସଲ ପରାମର୍ଶ",
      body: "AI ନୂତନ ଫସଲ ପରାମର୍ଶ ପ୍ରସ୍ତୁତ କରିଛି।"
    }

  };

  return messages[language] || messages.en;

};