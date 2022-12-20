import React from "react";
import { Link } from "react-router-dom";

const PageHero = ({ title, artist, track, id }) => {
  return (
    <section className="breadcrumbs d-flex align-items-center">
      <div className="container d-flex justify-content-between align-items-center">
        <h6>
          <Link to="/" className="link-info">
            Home
          </Link>
          {artist && (
            <Link to="/podcasts" className="link-info">
              / Podcasts /
            </Link>
          )}
          {track && (
            <Link to={`/podcast/${id}`} className="link-info">
              / Podcasts / episode /
            </Link>
          )}
          {title}
        </h6>
      </div>
    </section>
  );
};

export default PageHero;
