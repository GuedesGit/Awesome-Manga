import React from "react";
import SearchBar from "./SearchBar";

export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => setQuery("")}>
        <div className="mark">AM</div>
        <div>
          <div style={{ fontWeight: 700 }}>Awesome Manga</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Destaques: anime â€¢ manga â€¢ cultura pop japonesa
          </div>
        </div>
      </div>

      <div className="search-wrap">
        <SearchBar value={query} onChange={(v) => setQuery(v)} />
      </div>
    </header>
  );
}
