import React from "react";
import HeroPage from "../components/PageHero";
import PodcastList from "../components/PodcastList";
import Filters from "../components/Filters";
const Podcast = () => {
  return (
    <>
      <HeroPage />
      <section className="container mb-5">
        <Filters />
        <PodcastList />
      </section>
    </>
  );
};

export default Podcast;
