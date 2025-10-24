import React from "react";
import SearchBar from "./SearchBar";

export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => setQuery("")}>
        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Awesome Manga Logo" className="logo-img" />
        <div>
          <div style={{ fontWeight: 700 }}>Awesome Manga</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Destaques: anime • manga • cultura pop japonesa
          </div>
        </div>
      </div>

      <div className="search-wrap">
        <SearchBar value={query} onChange={(v) => setQuery(v)} />
      </div>
    </header>
  );
}
