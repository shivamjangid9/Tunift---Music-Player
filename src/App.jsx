import { useEffect, useState } from "react";
import { tracks, playlists, cover } from "./data";

const PATHS = {
  play: "M8 5v14l11-7z",
  pause: "M6 5h4v14H6zm8 0h4v14h-4z",
  next: "M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z",
  prev: "M6 6h2v12H6zm3.5 6l8.5 6V6z",
  home: "M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z",
  search: "M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z",
  library: "M4 4h2v16H4zm5 0h2v16H9zm4.5.5l1.9-.5 4.2 15.5-1.9.5z",
  heart: "M12 21l-1.5-1.3C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.5 11.2L12 21z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  vol: "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z",
};

const Icon = ({ n, size = 20, outline = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
    fill={outline ? "none" : "currentColor"} stroke={outline ? "currentColor" : "none"} strokeWidth="2">
    <path d={PATHS[n]} />
  </svg>
);

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [vol, setVol] = useState(70);
  const [liked, setLiked] = useState({});
  const [q, setQ] = useState("");
  const [active, setActive] = useState(playlists[0]);

  const cur = tracks[idx];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [playing]);

  useEffect(() => {
    if (pos >= cur.dur) next();
  }, [pos]);

  const play = (i) => { setIdx(i); setPos(0); setPlaying(true); };
  const next = () => play((idx + 1) % tracks.length);
  const prev = () => play(pos > 3 ? idx : (idx - 1 + tracks.length) % tracks.length);
  const toggleLike = (id) => setLiked((l) => ({ ...l, [id]: !l[id] }));
  const seek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.floor(((e.clientX - r.left) / r.width) * cur.dur));
  };

  const term = q.trim().toLowerCase();
  const visible = active.ids
    .map((id) => tracks[id])
    .filter((t) => !term || `${t.title} ${t.artist} ${t.album}`.toLowerCase().includes(term));

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="app">
      <aside className="side">
        <div className="brand"><span className="dot" />Tunify</div>
        <nav>
          <button className="nav on" onClick={() => setActive(playlists[0])}><Icon n="home" />Home</button>
          <button className="nav" onClick={() => document.getElementById("q").focus()}><Icon n="search" />Search</button>
          <button className="nav" onClick={() => setActive({ name: "Liked songs", desc: "Jo aapko pasand aaye", hue: 330, ids: tracks.filter((t) => liked[t.id]).map((t) => t.id) })}>
            <Icon n="heart" outline />Liked songs
          </button>
        </nav>
        <div className="lib">
          <p className="lib-h"><Icon n="library" size={18} />Your playlists</p>
          {playlists.slice(1).map((p) => (
            <button key={p.name} className={"pl" + (active.name === p.name ? " on" : "")} onClick={() => setActive(p)}>
              <span className="mini" style={{ background: cover(p.hue) }} />
              <span><b>{p.name}</b><small>Playlist</small></span>
            </button>
          ))}
        </div>
      </aside>

      <main className="main">
        <header className="top">
          <div className="search">
            <Icon n="search" size={18} />
            <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Gaana, artist ya album search karo" />
          </div>
          <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Theme badlo" title="Theme badlo">
            <Icon n={theme === "dark" ? "sun" : "moon"} />
          </button>
        </header>

        <section className="hero" style={{ "--h": active.hue }}>
          <div className="hero-cover" style={{ background: cover(active.hue) }} />
          <div>
            <p className="muted">{active.name === "All songs" ? greet : "Playlist"}</p>
            <h1>{active.name === "All songs" ? "Aaj kya sunna hai?" : active.name}</h1>
            <p className="muted">{active.desc} · {visible.length} songs</p>
            <button className="cta" onClick={() => visible[0] && play(visible[0].id)} disabled={!visible.length}>
              <Icon n="play" size={22} />Play
            </button>
          </div>
        </section>

        {active.name === "All songs" && !term && (
          <section>
            <h2>Made for you</h2>
            <div className="cards">
              {playlists.slice(1).map((p) => (
                <button key={p.name} className="card" onClick={() => setActive(p)}>
                  <span className="art" style={{ background: cover(p.hue) }} />
                  <b>{p.name}</b>
                  <small>{p.desc}</small>
                </button>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2>{term ? "Search results" : "Tracks"}</h2>
          <div className="row head"><span>#</span><span>Title</span><span className="hide-s">Album</span><span /><span>Time</span></div>
          {visible.map((t, i) => (
            <div key={t.id} className={"row" + (t.id === idx ? " now" : "")} onDoubleClick={() => play(t.id)}>
              <button className="num" onClick={() => (t.id === idx ? setPlaying(!playing) : play(t.id))} aria-label={"Play " + t.title}>
                <span className="n">{t.id === idx && playing ? "♪" : i + 1}</span>
                <span className="p"><Icon n={t.id === idx && playing ? "pause" : "play"} size={16} /></span>
              </button>
              <span className="title">
                <span className="mini" style={{ background: cover(t.hue) }} />
                <span><b>{t.title}</b><small>{t.artist}</small></span>
              </span>
              <span className="muted hide-s">{t.album}</span>
              <button className={"like" + (liked[t.id] ? " on" : "")} onClick={() => toggleLike(t.id)} aria-label="Like">
                <Icon n="heart" size={18} outline={!liked[t.id]} />
              </button>
              <span className="muted">{fmt(t.dur)}</span>
            </div>
          ))}
          {!visible.length && <p className="empty">Kuch nahi mila. Doosra naam search karo ya kisi gaane ko like karo.</p>}
        </section>
      </main>

      <footer className="player">
        <div className="np">
          <span className="mini big" style={{ background: cover(cur.hue) }} />
          <span><b>{cur.title}</b><small>{cur.artist}</small></span>
          <button className={"like" + (liked[cur.id] ? " on" : "")} onClick={() => toggleLike(cur.id)} aria-label="Like">
            <Icon n="heart" size={18} outline={!liked[cur.id]} />
          </button>
        </div>
        <div className="ctrl">
          <div className="btns">
            <button className="icon-btn" onClick={prev} aria-label="Previous"><Icon n="prev" size={22} /></button>
            <button className="play-btn" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>
              <Icon n={playing ? "pause" : "play"} size={22} />
            </button>
            <button className="icon-btn" onClick={next} aria-label="Next"><Icon n="next" size={22} /></button>
          </div>
          <div className="time">
            <span>{fmt(pos)}</span>
            <div className="bar" onClick={seek}><i style={{ width: `${(pos / cur.dur) * 100}%` }} /></div>
            <span>{fmt(cur.dur)}</span>
          </div>
        </div>
        <div className="vol">
          <Icon n="vol" size={18} />
          <input type="range" min="0" max="100" value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volume" />
        </div>
      </footer>
    </div>
  );
}
