import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({
      createdAt: -1,
    });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};