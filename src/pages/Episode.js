import React from "react";
import { useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import PodcastDescription from "../components/PodcastDescription";
import { usePodcastContext } from "../context/podcast_context";
import styled from "styled-components";
const Episode = () => {
  const { id } = useParams();
  const { single_podcast_track_data: tracksList, filtered_podcast: podcasts } = usePodcastContext();
  let track;
  if (tracksList) {
    track = tracksList.find((track) => track.trackId === Number(id));
  }
  const artist = podcasts.find((item) => Number(item.id) === track?.collectionId);

  return (
    <Wrapper className="container pb-5">
      {track && <PageHero title={track.trackName} track id={track.collectionId} />}
      <div className="content-container mt-3">
        {artist && (
          <PodcastDescription
            image={artist.img}
            artistName={artist.author}
            collectionName={artist.pod}
            description={artist.des}
          />
        )}
        {track && (
          <section className="play-music shadow p-4">
            <h2 className="mt-2 mb-2">{track.trackName}</h2>
            <p className="description">
              <em>{track.description}</em>
            </p>
            <div className="mt-5">
              <audio controls preload="none">
                <source src={track.song} type="audio/ogg" />
                <source src={track.song} type="audio/mpeg" />
              </audio>
            </div>
          </section>
        )}
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
  .play-music {
    flex: 1 1 500px;
  }

  .description {
    font-size: 12px !important;
  }
  audio {
    width: 100%;
  }

  audio::-webkit-media-controls-mute-button {
    background-color: #b1d4e0;
    border-radius: 50%;
  }
`;
export default Episode;
