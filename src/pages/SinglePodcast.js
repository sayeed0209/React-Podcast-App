import React, { useEffect } from "react";
import { SINGLE_PODCAST_URL } from "../utils/action";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import PageHero from "../components/PageHero";
import Tracks from "../components/Tracks";
import { usePodcastContext } from "../context/podcast_context";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PodcastDescription from "../components/PodcastDescription";
import { getCookiesValue } from "../utils/helper";
const SinglePodcast = () => {
  const { id } = useParams();
  const {
    fetchSinglePodcast,
    single_podcast_track_data: tracks,
    filtered_podcast: podcasts,
    single_podcast_loading: loading,
    single_podcast_error: error,
    getAllTracksFromLocal,
  } = usePodcastContext();
  const artist = podcasts.find((item) => item.id === id);
  useEffect(() => {
    const podcastStr = getCookiesValue(id);
    if (!podcastStr) {
      fetchSinglePodcast(
        `${SINGLE_PODCAST_URL}${id}&country=US&media=podcast&entity=podcastEpisode&limit=20`,
        id,
      );
    } else {
      const localData = JSON.parse(localStorage.getItem(id));
      getAllTracksFromLocal(localData);
    }
  }, [id]);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Wrapper className="container pb-5">
      {artist && <PageHero title={artist.author} artist />}
      <div className="content-container mt-3 ">
        {artist && (
          <PodcastDescription
            image={artist.img}
            artistName={artist.author}
            collectionName={artist.pod}
            description={artist.des}
          />
        )}
        <section className="tracks-list">
          <div className="header shadow p-3 fw-bold">Episodes</div>
          <div className="container mt-3">
            <div className="row shadow-sm border fw-bolder">
              <div className="col col-md-8 border-end p-2">Title</div>
              <div className="col  border-end p-2">Date</div>
              <div className="col p-2">Duration</div>
            </div>
            {tracks.map((track) => {
              return <Tracks key={track.trackId} track={track} id={id} />;
            })}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5rem;
  }
  .artist-description {
    flex: 1 0 200px;
  }
  .artist-description img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .tracks-list {
    flex: 1 1 500px;
  }
`;

export default SinglePodcast;
