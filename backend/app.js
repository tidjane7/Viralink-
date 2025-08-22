const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { detectViralMoments } = require("./utils/viralDetection");
const { generateSubtitles } = require("./utils/subtitleGenerator");
const { cropToTikTok } = require("./utils/videoProcessor");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend ViraLink fonctionne !");
});

app.post("/convert", async (req, res) => {
  const { youtubeUrl } = req.body;

  // Étape 1 : Extraire transcription (simulation)
  const transcript = "Ceci est une transcription simulée de la vidéo pour générer les sous-titres...";

  // Étape 2 : Détection des moments viraux
  const segments = detectViralMoments(transcript);

  // Étape 3 : Génération des sous-titres
  const subtitles = generateSubtitles(transcript, segments);

  // Étape 4 : Recadrage vidéo au format TikTok
  const tiktokClips = cropToTikTok(youtubeUrl, segments);

  res.json({
    message: "Conversion complète terminée !",
    url: youtubeUrl,
    viralSegments: segments,
    subtitles,
    tiktokClips
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend ViraLink lancé sur le port ${PORT}`);
});
