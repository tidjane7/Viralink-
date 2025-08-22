import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    try {
      const res = await axios.post("http://localhost:5000/convert", { youtubeUrl: url });
      setResult(res.data);
    } catch (error) {
      setResult({ message: "Erreur lors de la conversion" });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ViraLink Complet</h1>
      <input
        type="text"
        placeholder="Lien YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleConvert}>Convertir</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>{result.message}</strong></p>
          <p>URL : {result.url}</p>

          {result.viralSegments && (
            <div>
              <h3>Moments viraux :</h3>
              <ul>
                {result.viralSegments.map((seg, i) => (
                  <li key={i}>De {seg.start}s à {seg.end}s</li>
                ))}
              </ul>
            </div>
          )}

          {result.subtitles && (
            <div>
              <h3>Sous-titres :</h3>
              <ul>
                {result.subtitles.map((sub, i) => (
                  <li key={i}>
                    {sub.start}s - {sub.end}s : {sub.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.tiktokClips && (
            <div>
              <h3>Clips TikTok 9:16 :</h3>
              <ul>
                {result.tiktokClips.map((clip, i) => (
                  <li key={i}>
                    {clip.start}s - {clip.end}s : <a href={clip.croppedUrl} target="_blank">Lien clip</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
