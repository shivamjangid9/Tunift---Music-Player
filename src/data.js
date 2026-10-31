// Apne gaane / playlists yahan edit karo. dur = seconds, hue = cover ka color (0-360)
export const tracks = [
  { id: 0, title: "Midnight Drive", artist: "Neon Harbor", album: "After Hours", dur: 214, hue: 265 },
  { id: 1, title: "Golden Hour", artist: "Sunny Vale", album: "Warm Days", dur: 187, hue: 35 },
  { id: 2, title: "Monsoon Letters", artist: "Raag & Co.", album: "Barsaat", dur: 243, hue: 195 },
  { id: 3, title: "City Lights", artist: "Neon Harbor", album: "After Hours", dur: 201, hue: 320 },
  { id: 4, title: "Chai Break", artist: "Lofi Lane", album: "Study Tapes", dur: 156, hue: 20 },
  { id: 5, title: "Desert Wind", artist: "Marwar Beats", album: "Thar", dur: 228, hue: 45 },
  { id: 6, title: "Late Bus Home", artist: "Lofi Lane", album: "Study Tapes", dur: 172, hue: 150 },
  { id: 7, title: "Afterglow", artist: "Sunny Vale", album: "Warm Days", dur: 195, hue: 10 },
  { id: 8, title: "Pink City Nights", artist: "Marwar Beats", album: "Thar", dur: 260, hue: 335 },
  { id: 9, title: "Static Dreams", artist: "Neon Harbor", album: "Signals", dur: 209, hue: 230 },
  { id: 10, title: "Rooftop Rain", artist: "Raag & Co.", album: "Barsaat", dur: 233, hue: 175 },
  { id: 11, title: "Slow Sunday", artist: "Lofi Lane", album: "Study Tapes", dur: 165, hue: 100 },
];

export const playlists = [
  { name: "All songs", desc: "Saare gaane ek jagah", hue: 150, ids: tracks.map((t) => t.id) },
  { name: "Late Night Drive", desc: "Neon, synths aur sunsaan sadak", hue: 265, ids: [0, 3, 9, 7] },
  { name: "Lofi Focus", desc: "Padhai aur kaam ke liye", hue: 25, ids: [4, 6, 11, 1] },
  { name: "Barsaat Mood", desc: "Baarish wali playlist", hue: 195, ids: [2, 10, 6, 11] },
  { name: "Rajasthan Vibes", desc: "Thar se Pink City tak", hue: 340, ids: [5, 8, 1, 2] },
  { name: "Sunny Side", desc: "Feel-good dhoop wale gaane", hue: 40, ids: [1, 7, 5, 4] },
];

export const cover = (hue) =>
  `linear-gradient(135deg, hsl(${hue} 75% 58%), hsl(${(hue + 45) % 360} 70% 32%))`;
