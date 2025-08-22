function generateSubtitles(transcript, segments) {
  return segments.map((seg, i) => ({
    start: seg.start,
    end: seg.end,
    text: transcript.slice(i * 20, i * 20 + 20)
  }));
}

module.exports = { generateSubtitles };
