import React from "react";

export default function ArticlesList({ items }) {
  return (
    <section className="articles-section">
      <h2 className="articles-title">Published Articles</h2>
      <div className="articles-list">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <article className="article-item">
              <div className="article-header">
                <h3 className="article-title">{item.title}</h3>
                <span className="article-type">{item.type}</span>
              </div>
              <p className="article-description">{item.description}</p>
              <div className="article-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="article-tag">#{tag}</span>
                ))}
              </div>
            </article>
            {index < items.length - 1 && <div className="article-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
