import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import { usePodcastContext } from "../context/podcast_context";
import Podcast from "./Podcast";

const PodcastList = () => {
  const {
    isLoading_podcast: loading,
    podcast_error: error,
    filtered_podcast: podcast,
  } = usePodcastContext();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-5">
      {podcast.map((podcast) => {
        return <Podcast {...podcast} key={podcast.id} />;
      })}
    </div>
  );
};

export default PodcastList;
