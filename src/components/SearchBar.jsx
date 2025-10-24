import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      placeholder="Pesquisar por tÃ­tulo, tags ou tipo (ex: anime, manga, cultura)..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Pesquisar destaques"
    />
  );
}
