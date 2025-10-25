import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-[#F5E6C3] border-b border-[#E6D7C3] shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-row items-center gap-8 px-6 py-6">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full border-2 border-[#E6D7C3] bg-white" />
        {/* Texto */}
        <div className="flex flex-col items-start">
          <div className="font-bold text-2xl text-[#8B7355]">Awesome Manga</div>
          <div className="text-base text-[#A69080]">Anime • Manga • Cultura Pop</div>
        </div>
        {/* Barra de pesquisa */}
        <form className="flex-1 flex items-center justify-end">
          <input
            type="text"
            placeholder="Pesquisa"
            className="w-full px-4 py-3 rounded-l-lg border border-[#E6D7C3] bg-white text-[#8B7355] focus:outline-none focus:ring-2 focus:ring-[#E6D7C3] text-base"
          />
          <button type="submit" className="h-full px-5 py-0 bg-[#E6D7C3] text-[#8B7355] rounded-r-lg font-bold flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
