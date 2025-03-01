require("dotenv").config();

const validApiKeys = process.env.API_KEYS.split(",");

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  
  if (!apiKey) {
    return res.status(401).json({ message: "API key is required" });
  }

  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({ message: "Invalid API key" });
  }
  next();
};

module.exports = authenticateApiKey;
