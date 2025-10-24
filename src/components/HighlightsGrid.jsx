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
