import React from "react";

export default function SearchBar({ value, onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // A pesquisa já funciona em tempo real, mas mantém a funcionalidade do botão
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <input
        className="search"
        placeholder="Pesquisa"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar destaques"
      />
      <button type="submit" className="search-button" aria-label="Pesquisar">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="7" stroke="white" stroke-width="2" />
          <line x1="15" y1="15" x2="19" y2="19" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </form>
  );
}
