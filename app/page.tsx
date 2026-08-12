import Clock from "@/components/Clock";
import OnlinePresence from "@/components/OnlinePresence";
import MeroPlayer from "@/components/MeroPlayer/MeroPlayer";

const playlistUrl = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_URL || "https://music.youtube.com";
const spotifyUrl = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL || "https://open.spotify.com";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL;

export default function Home() {
  return (
    <main className="hero">
      <div className="backdrop" aria-hidden="true">
        <video className="backdrop-video" src="/bus-bg.mp4" autoPlay loop muted playsInline />
        <div className="backdrop-scrim" />
        <div className="backdrop-grain" />
      </div>

      <header className="topbar">
        <div className="topbar-left">
          <Clock />
        </div>
        <OnlinePresence />
        <div className="icon-row">
          <a className="chip" href={spotifyUrl} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="#1ED760" />
              <path d="M6.5 9.6c3.4-1 7.9-.6 10.9 1.1" fill="none" stroke="#0b0b0b" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M6.9 12.6c2.8-.8 6.6-.5 9.1 1" fill="none" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7.3 15.5c2.2-.6 5.2-.4 7.1.8" fill="none" stroke="#0b0b0b" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="chip-label">Spotify</span>
            <span className="chip-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="chip" href={playlistUrl} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="#FF0033" />
              <circle cx="12" cy="12" r="7.2" fill="#fff" />
              <path d="M10.2 8.7 15.6 12l-5.4 3.3Z" fill="#FF0033" />
            </svg>
            <span className="chip-label">YT Music</span>
            <span className="chip-arrow" aria-hidden="true">↗</span>
          </a>
          {githubUrl && (
            <a className="chip" href={githubUrl} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
                <circle cx="12" cy="12" r="12" fill="#181717" />
                <g transform="translate(6.4 6.4) scale(0.7)">
                  <path
                    fill="#fff"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                  />
                </g>
              </svg>
              <span className="chip-label">GitHub</span>
              <span className="chip-arrow" aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </header>

      <section className="hero-title">
        <h1>उत्तराखंड देवभूमि</h1>
        <p className="hero-subtitle">मेरो पहाड़ मेरो घर</p>
      </section>

      <section className="player-slot">
        <MeroPlayer />
      </section>
    </main>
  );
}
