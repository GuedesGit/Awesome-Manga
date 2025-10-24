import React, { useState } from "react";
import Header from "./components/Header";
import HighlightsGrid from "./components/HighlightsGrid";
import SAMPLE from "./data/sampleHighlights";

export default function App() {
  const [query, setQuery] = useState("");

  const filtered = SAMPLE.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.tags.join(" ").toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app">
      <Header query={query} setQuery={setQuery} />
      <main>
        <HighlightsGrid items={filtered} />
      </main>
    </div>
  );
}
