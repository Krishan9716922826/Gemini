// backend/server.js

require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-pro-latest",
});

console.log(`Initialized Generative Model: models/gemini-1.5-pro-latest`);

// Define a route for chat
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (!model) {
    console.error("Generative model not initialized. Cannot process request.");
    return res
      .status(500)
      .json({
        error:
          "AI model not ready. Check backend logs for initialization errors.",
      });
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res
      .status(500)
      .json({ error: "Failed to generate content", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Gemini backend is running!");
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
