<#
Cria a estrutura do projeto React "Awesome Manga" pronto para publicar no GitHub Pages.
Inclui todos os ficheiros essenciais para o projeto e para o deploy.
#>

$files = @{
  "README.md" = @'
# Awesome Manga

Projeto React que mostra destaques de anime, manga e cultura pop japonesa.

## Instruções rápidas

1. Instala Node.js + npm
2. npm install
3. npm start    # para testar localmente
4. gh repo create GuedesGit/Awesome-Manga --public --source=. --remote=origin --push --confirm
5. npm run deploy    # publica no GitHub Pages

URL prevista: https://GuedesGit.github.io/Awesome-Manga

---
'@

  "package.json" = @'
{
  "name": "awesome-manga",
  "version": "1.0.0",
  "private": true,
  "homepage": "https://GuedesGit.github.io/Awesome-Manga",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
'@

  ".gitignore" = @'
/node_modules
/build
/dist
/.env
.DS_Store
npm-debug.log
'@

  "public/index.html" = @'
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Awesome Manga</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
'@

  "src/index.js" = @'
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
'@

  "src/App.js" = @'
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
'@

  "src/index.css" = @'
:root{
  --bg: #0f1724;
  --card: #0b1220;
  --accent: #ef4444;
  --muted: #9aa4b2;
  --glass: rgba(255,255,255,0.03);
}

*{box-sizing:border-box}
body,html,#root{height:100%; margin:0; font-family: Inter, Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial;}

.app{
  min-height:100vh;
  background: linear-gradient(180deg, #071028 0%, #081028 60%);
  color:#f3f4f6;
  padding:24px;
}

/* Header */
.header{
  display:flex;
  align-items:center;
  gap:16px;
  margin-bottom:24px;
}

/* logo */
.logo{
  display:flex;
  align-items:center;
  gap:10px;
  cursor:pointer;
}
.logo .mark{
  width:48px;
  height:48px;
  background:linear-gradient(135deg,#ff9a9e,#fad0c4);
  border-radius:8px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  color:#0b1220;
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
}

/* search */
.search-wrap{
  margin-left:auto;
  width:min(720px, 55%);
}
.search{
  width:100%;
  padding:10px 14px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.06);
  background:var(--glass);
  color:var(--muted);
  outline:none;
  font-size:15px;
}
.search:focus{box-shadow:0 0 0 3px rgba(239,68,68,0.12); color:#fff}

/* grid */
.grid{
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  gap:18px;
  align-items:start;
}

.card{
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius:12px;
  padding:12px;
  border:1px solid rgba(255,255,255,0.03);
  transition:transform .15s ease, box-shadow .15s ease;
}
.card:hover{ transform: translateY(-6px); box-shadow: 0 10px 30px rgba(2,6,23,0.6); }
.card .thumb{
  width:100%;
  height:140px;
  border-radius:8px;
  object-fit:cover;
  background:#071428;
}
.card .meta{
  margin-top:10px;
}
.card .title{
  font-weight:700;
  margin:6px 0;
  font-size:16px;
}
.card .desc{
  color:var(--muted);
  font-size:13px;
  line-height:1.25;
}
.card .tags{
  margin-top:10px;
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}
.tag{
  font-size:12px;
  padding:6px 8px;
  background: rgba(255,255,255,0.03);
  border-radius:999px;
  color:var(--muted);
}
'@

  "src/components/Header.jsx" = @'
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
'@

  "src/components/SearchBar.jsx" = @'
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      placeholder="Pesquisar por título, tags ou tipo (ex: anime, manga, cultura)..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Pesquisar destaques"
    />
  );
}
'@

  "src/components/HighlightsGrid.jsx" = @'
import React from "react";

export default function HighlightsGrid({ items }) {
  return (
    <section>
      <div style={{ marginBottom: 12, color: "var(--muted)" }}>
        {items.length} resultado(s)
      </div>
      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <img className="thumb" src={item.image} alt={item.title} />
            <div className="meta">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="title">{item.title}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{item.type}</div>
              </div>
              <div className="desc">{item.description}</div>
              <div className="tags">
                {item.tags.map((t) => (
                  <span className="tag" key={t}>#{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
'@

  "src/data/sampleHighlights.js" = @'
const SAMPLE = [
  {
    id: "1",
    title: "Attack on Titan — Última temporada",
    type: "Anime",
    description: "Resumo das últimas notícias e acontecimentos da temporada final.",
    tags: ["ação","drama","shonen"],
    image: "https://picsum.photos/seed/aot/640/360"
  },
  {
    id: "2",
    title: "Chainsaw Man — Mangá em ascensão",
    type: "Manga",
    description: "Porque Chainsaw Man está a conquistar leitores pelo estilo único e personagens fortes.",
    tags: ["horror","supernatural","seinen"],
    image: "https://picsum.photos/seed/cdm/640/360"
  },
  {
    id: "3",
    title: "Cosplay e eventos 2025",
    type: "Cultura",
    description: "Guia dos próximos eventos de cultura pop japonesa e dicas de cosplay.",
    tags: ["cosplay","eventos","comunidade"],
    image: "https://picsum.photos/seed/cos/640/360"
  },
  {
    id: "4",
    title: "Estética e inspiração — Ukiyo-e moderno",
    type: "Cultura",
    description: "Como a tradição artística japonesa influencia o design moderno em anime e moda.",
    tags: ["arte","design","história"],
    image: "https://picsum.photos/seed/uki/640/360"
  },
  {
    id: "5",
    title: "One Piece — Teorias e marcos",
    type: "Manga",
    description: "Análises das últimas revelações do mangá e teorias da comunidade.",
    tags: ["aventura","teoria","shonen"],
    image: "https://picsum.photos/seed/op/640/360"
  }
];

export default SAMPLE;
'@
}

foreach ($path in $files.Keys) {
  $full = Join-Path -Path (Get-Location) -ChildPath $path
  $dir = Split-Path $full -Parent
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
  $files[$path] | Out-File -FilePath $full -Encoding utf8 -Force
  Write-Host "Criado: $path"
}

Write-Host ""
Write-Host "== Estrutura Awesome Manga criada! =="
Write-Host "Segue no terminal:"
Write-Host "  npm install"
Write-Host "  npm start"
Write-Host "  gh repo create GuedesGit/Awesome-Manga --public --source=. --remote=origin --push --confirm"
Write-Host "  npm run deploy"
Write-Host ""
Write-Host "Depois vê em: https://GuedesGit.github.io/Awesome-Manga"