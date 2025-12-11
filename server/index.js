// server/index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config(); // loads HF_API_TOKEN + PORT from .env

const app = express();
const PORT = process.env.PORT || 5001;

// Read HF token from .env
const HF_API_TOKEN = process.env.HF_API_TOKEN;

if (!HF_API_TOKEN) {
  console.warn(
    "⚠️ HF_API_TOKEN is not set in .env – device detection will not work."
  );
}

app.use(cors());
app.use(express.json());

// Multer to accept image uploads in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Basic health check
app.get("/", (req, res) => {
  res.send("OK");
});

// ---- helper: turn HF predictions into { brand, model, ... } or null ----
function makeGuessFromPredictions(predictions) {
  if (!Array.isArray(predictions) || predictions.length === 0) {
    return null;
  }

  // Sort by score, just to be safe
  const sorted = [...predictions].sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  );

  const top = sorted[0];
  const labels = sorted.map((p) => (p.label || "").toLowerCase());
  const topLabel = (top.label || "").toLowerCase();

  console.log("🔎 HF labels:", labels);

  // Does any label look like a phone at all?
  const looksLikePhone = labels.some((l) =>
    [
      "cell phone",
      "cellphone",
      "cellular telephone",
      "mobile phone",
      "smartphone",
      "telephone",
      "iphone",
      "ipod",
    ].some((kw) => l.includes(kw))
  );

  if (!looksLikePhone) {
    console.log("ℹ️ Model did not think this was a phone. Bailing out.");
    return null;
  }

  // Very rough brand / model mapping.
  // You can tweak this if you like.
  let brand = "Apple";
  let model = "iPhone (exact model unknown)";

  if (labels.some((l) => l.includes("iphone"))) {
    brand = "Apple";
    model = "iPhone (exact model unknown)";
  } else if (labels.some((l) => l.includes("ipod"))) {
    brand = "Apple";
    model = "iPhone / iPod-style device";
  }

  return {
    brand,
    model,
    confidence: top.score,
    rawLabel: top.label,
  };
}

// ---- DEVICE DETECTION ENDPOINT ----
app.post("/api/detect-device", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }

    console.log("📸 Received file:", {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });

    if (!HF_API_TOKEN) {
      return res
        .status(500)
        .json({ success: false, error: "HF_API_TOKEN not set on server" });
    }

    // ✅ This is the router endpoint that worked for you
    const HF_URL =
      "https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224";

    const hfRes = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": req.file.mimetype || "image/jpeg",
        Accept: "application/json",
      },
      body: req.file.buffer,
    });

    const text = await hfRes.text();

    if (!hfRes.ok) {
      console.error("❌ HF responded with error:", hfRes.status, text);
      return res.status(500).json({
        success: false,
        error: `HF error ${hfRes.status}`,
        raw: text,
      });
    }

    let predictions;
    try {
      predictions = JSON.parse(text);
    } catch (err) {
      console.error("❌ HF returned non-JSON:", text.slice(0, 300));
      return res.status(500).json({
        success: false,
        error: "Hugging Face returned non-JSON response",
        raw: text.slice(0, 1000),
      });
    }

    console.log("✅ HF JSON:", predictions);

    const guess = makeGuessFromPredictions(predictions);

    // If guess is null, frontend will show the "couldn't auto-detect" message
    return res.json({
      success: true,
      guess,
      raw: predictions,
    });
  } catch (err) {
    console.error("❌ Error in /api/detect-device:", err);
    return res.status(500).json({
      success: false,
      error: "Server error while detecting device",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
