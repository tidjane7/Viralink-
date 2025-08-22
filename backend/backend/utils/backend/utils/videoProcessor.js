function cropToTikTok(videoUrl, segments) {
  // Cette fonction simule le recadrage 9:16 pour TikTok
  return segments.map((seg, i) => ({
    start: seg.start,
    end: seg.end,
    croppedUrl: `${videoUrl}?clip=${i}&format=9:16`
  }));
}

module.exports = { cropToTikTok };
