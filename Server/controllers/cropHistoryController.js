import CropHistory from "../models/CropHistory.js";

// Save Crop History
export const saveCropHistory = async (req, res) => {
  try {

    const history = await CropHistory.create({
      user: req.user.id,

      crop: req.body.crop,
      soil: req.body.soil,
      season: req.body.season,
      farmSize: req.body.farmSize,

      temperature: req.body.temperature,
      rainfall: req.body.rainfall,
      humidity: req.body.humidity,

      weatherCondition: req.body.weatherCondition,
      location: req.body.location,

      aiSummary: req.body.aiSummary,
      aiActions: req.body.aiActions,
    });

    res.status(201).json(history);

  } catch (error) {

    console.log(" SAVE HISTORY ERROR ");
  console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Crop History

export const getCropHistory = async (req, res) => {
  try {

    const history = await CropHistory.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(history);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteHistory = async (req, res) => {

  try {

    await CropHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({
      message: "History deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};