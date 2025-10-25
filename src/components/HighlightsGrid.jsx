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
            Summarized conversation history
            
            The error "'tailwind' is not recognized as an internal or external command" means the Tailwind CSS CLI is not installed or not available in your PATH.
            
            Let's fix this step-by-step:
            
            Make sure your .bin is available to npx. Sometimes, a failed install or a corrupted node_modules folder can cause this.
            Reinstall Tailwind CSS and its dependencies to ensure the CLI is present.
            I'll run the following commands for you:
            
            Delete node_modules and package-lock.json to ensure a clean install.
            Run npm install to reinstall all dependencies.
            Run npm install -D tailwindcss postcss autoprefixer to ensure Tailwind CLI is installed.
            Run npx tailwindcss init -p to generate the config files.
            Let's proceed.
            
            
            
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
