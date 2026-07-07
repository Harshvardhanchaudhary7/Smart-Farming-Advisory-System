import PDFDocument from "pdfkit";
import CropHistory from "../models/CropHistory.js";
import User from "../models/User.js";
import { pdfTranslations } from "../utils/pdfTranslations.js";
import {translateSeason, translateSoil,} from "../utils/pdfHelpers.js";
import { translateWeather } from "../utils/weatherTranslation.js";
import path from "path";

const hindiFont = path.join(
  process.cwd(),
  "fonts",
  "NotoSansDevanagari.ttf"
);

export const downloadHistoryPDF = async (req, res) => {
  try {
    const history = await CropHistory.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });
    const farmer = await User.findById(req.user.id);
    const lang = pdfTranslations[ farmer.language || "en"];
    const language = farmer.language || "en";

    const doc = new PDFDocument({
      margin: 50,
    });
    
  if (language === "hi") {
  doc.font(hindiFont);
} else {
  doc.font("Helvetica");
}

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=CropHistory.pdf"
    );

    doc.pipe(res);

    // ================= HEADER =================

doc
  .fontSize(28)
  .fillColor("#15803d")
  .text(" AGRISENSE", {
    align: "center",
  });

doc
  .fontSize(18)
  .fillColor("black")
  .text(lang.appSubtitle, {
    align: "center",
  });

doc.moveDown();

doc
  .fontSize(22)
  .fillColor("#166534")
  .text(lang.cropHistory, {
    align: "center",
  });

doc.moveDown(2);

doc
.fontSize(18)
.fillColor("#15803d")
.text(lang.farmerInfo);

doc.moveDown();

doc
.fontSize(13)
.fillColor("black")
.text(`${lang.farmerName} : ${farmer.name}`);

doc.text(`${lang.farmerId} : ${farmer.farmerId}`);

doc.text(`${lang.email} : ${farmer.email}`);

doc.text(`${lang.generated} : ${new Date().toLocaleString()}`);

doc.text(`${lang.totalReports} : ${history.length}`);

doc.moveDown(2);

doc
.moveTo(50, doc.y)
.lineTo(550, doc.y)
.strokeColor("#16a34a")
.stroke();

doc.moveDown();

history.forEach((item, index) => {

  doc
    .fontSize(18)
    .fillColor("#15803d")
    .text(`${index + 1}. ${item.crop}`);

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .fillColor("black");

  doc.text(
`${lang.date} : ${
new Date(item.createdAt).toLocaleString(
language === "hi"
? "hi-IN"
: "en-US"
)}`
);

  doc.text(
`${lang.season} : ${
translateSeason(
item.season,
language
)
}`
);

doc.text(
`${lang.soil} : ${
translateSoil(
item.soil,
language
)
}`
);
doc.text(`${lang.temperature} : ${item.temperature} °C`);
  doc.text(`${lang.humidity} : ${item.humidity}%`);

doc.text(`${lang.rainfall} : ${item.rainfall} mm`);

 doc.text(
`${lang.weather} : ${
translateWeather(
item.weatherCondition,
language
)
}`
);

doc.text(`${lang.location} : ${item.location}`);

  doc.moveDown();

  doc
    .fontSize(14)
    .fillColor("#166534")
   .text(lang.summary);
  doc
    .fontSize(12)
    .fillColor("black")
    .text(item.aiSummary);

  doc.moveDown();

  if (item.aiActions?.length) {

    doc
      .fontSize(14)
      .fillColor("#166534")
      .text(lang.actions);
    item.aiActions.forEach((action) => {

      doc
        .fontSize(12)
        .fillColor("black")
        .text(`• ${action}`);

    });

  }

  doc.moveDown();

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#d1d5db")
    .stroke();

  doc.moveDown(2);

});

doc.moveDown(2);

doc
  .fontSize(10)
  .fillColor("gray")
  .text(
  `${lang.generated} - AGRISENSE`,
    {
      align: "center",
    }
  );

doc.end();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const downloadWeatherPDF = async (req, res) => {
  try {

    const farmer = await User.findById(req.user.id);
    const lang = pdfTranslations[farmer.language || "en"];
    const language = farmer.language || "en";

    const latestHistory = await CropHistory.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!latestHistory) {
      return res.status(404).json({
        message: "No crop history found.",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    if (language === "hi") {
  doc.font(hindiFont);
} else {
  doc.font("Helvetica");
}

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=WeatherReport.pdf"
    );

    doc.pipe(res);

    // =========================
    // HEADER
    // =========================

    doc
      .fontSize(28)
      .fillColor("#15803d")
      .text("AGRISENSE", {
        align: "center",
      });

    doc
      .fontSize(18)
      .fillColor("black")
      .text(lang.appSubtitle, {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(22)
      .fillColor("#166534")
      .text(lang.weatherReport, {
        align: "center",
      });

    doc.moveDown(2);

    // =========================
    // FARMER INFORMATION
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.farmerInfo);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(`${lang.farmerName} : ${farmer.name}`);
    doc.text(`${lang.farmerId} : ${farmer.farmerId}`);
    doc.text(`${lang.email} : ${farmer.email}`);

    doc.moveDown(2);

    // =========================
    // CURRENT WEATHER
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.currentWeather);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(`${lang.location} : ${latestHistory.location}`);
    doc.text(
`${lang.condition} : ${
translateWeather(
latestHistory.weatherCondition,
language
)
}`
);
    doc.text(`${lang.temperature} : ${latestHistory.temperature} °C`);
    doc.text(`${lang.humidity} : ${latestHistory.humidity}%`);
    doc.text(`${lang.rainfall} : ${latestHistory.rainfall} mm`);

    doc.moveDown(2);

    // =========================
    // AI RECOMMENDATION
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.aiRecommendation);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black")
      .text(latestHistory.aiSummary);

    doc.moveDown();

    if (latestHistory.aiActions?.length) {

      doc
        .fontSize(15)
        .fillColor("#166534")
        .text(lang.actions);

      doc.moveDown();

      latestHistory.aiActions.forEach((action) => {

        doc
          .fontSize(12)
          .fillColor("black")
          .text(`• ${action}`);

      });

    }

    doc.moveDown(2);

    // =========================
    // FOOTER
    // =========================

    doc
      .fontSize(10)
      .fillColor("gray")
      .text(
        `${lang.generated} : ${new Date().toLocaleString(language === "hi"
? "hi-IN"
: "en-US")}`,
        {
          align: "center",
        }
      );

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const downloadCropReport = async (req, res) => {
  try {

    const farmer = await User.findById(req.user.id);
    const lang = pdfTranslations[farmer.language || "en"];
    const language = farmer.language || "en";

    const latest = await CropHistory.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        message: "No AI recommendation found.",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    if (language === "hi") {
  doc.font(hindiFont);
} else {
  doc.font("Helvetica");
}

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=AICropReport.pdf"
    );

    doc.pipe(res);

    // =========================
    // HEADER
    // =========================

    doc
      .fontSize(28)
      .fillColor("#15803d")
      .text("AGRISENSE", {
        align: "center",
      });

    doc
      .fontSize(18)
      .fillColor("black")
      .text(lang.appSubtitle, {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(22)
      .fillColor("#166534")
      .text(lang.cropReport, {
        align: "center",
      });

    doc.moveDown(2);

    // =========================
    // FARMER INFORMATION
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.farmerInfo);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(`${lang.farmerName} : ${farmer.name}`);
    doc.text(`${lang.farmerId} : ${farmer.farmerId}`);
    doc.text(`${lang.email} : ${farmer.email}`);

    doc.moveDown(2);

    // =========================
    // FARM DETAILS
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.farmDetails);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(`${lang.crop} : ${latest.crop}`);
    doc.text(
`${lang.season} : ${
translateSeason(
latest.season,
language
)
}`
);
   doc.text(
`${lang.soil} : ${
translateSoil(
latest.soil,
language
)
}`
);
    doc.text(`${lang.farmSize} : ${latest.farmSize} acres`);

    doc.moveDown(2);

    // =========================
    // WEATHER
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.weather);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(`${lang.location} : ${latest.location}`);
    doc.text(
`${lang.condition} : ${
translateWeather(
latest.weatherCondition,
language
)
}`
);
    doc.text(`${lang.temperature} : ${latest.temperature} °C`);
    doc.text(`${lang.humidity} : ${latest.humidity}%`);
    doc.text(`${lang.rainfall} : ${latest.rainfall} mm`);

    doc.moveDown(2);

    // =========================
    // AI RECOMMENDATION
    // =========================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text(lang.aiRecommendation);

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(`${lang.summary} : ${latest.aiSummary}`);

    doc.moveDown();

    // =========================
    // RECOMMENDED ACTIONS
    // =========================

    if (latest.aiActions?.length) {

      doc
        .fontSize(16)
        .fillColor("#15803d")
        .text(lang.actions);

      doc.moveDown();

      latest.aiActions.forEach((action) => {

        doc
          .fontSize(12)
          .fillColor("black")
          .text(`• ${action}`);

      });

    }

    doc.moveDown(2);

    // =========================
    // FOOTER
    // =========================

    doc
      .fontSize(10)
      .fillColor("gray")
      .text(
        `${lang.generated} : ${new Date().toLocaleString(language === "hi"
? "hi-IN"
: "en-US")}`,
        {
          align: "center",
        }
      );

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};