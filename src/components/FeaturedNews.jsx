import React from "react";

export default function FeaturedNews() {
  return (
    <section className="featured-section">
      <div className="featured-container">
        <img 
          src="/featured.png" 
          alt="Featured anime characters" 
          className="featured-image"
        />
        <div className="featured-content">
          <h1 className="featured-title">FEATURED NEWS</h1>
          <p className="featured-subtitle">
            Discover the latest updates on your favorite anime, manga, and Japanese pop culture
          </p>
          <button className="featured-btn">Read More</button>
        </div>
      </div>
    </section>
  );
}
