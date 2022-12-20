import React, { useContext, useEffect, useReducer } from "react";
import { podcastReducer } from "../reducers/podcastReducer";
import axios from "axios";
import {
  GET_PODCAST_BEGIN,
  GET_PODCAST_SUCCESS,
  GET_PODCAST_ERROR,
  GET_SINGLE_PODCAST_BEGIN,
  GET_SINGLE_PODCAST_SUCCESS,
  GET_SINGLE_PODCAST_ERROR,
  UPDATE_FILTERS,
  LOAD_PODCAST,
  FILTER_PODCAST,
  API_URL,
} from "../utils/action.js";
import { createCookie, getCookiesValue, objectToArray, convertMsToTime } from "../utils/helper";
const initialState = {
  isLoading_podcast: false,
  podcast_error: false,
  podcast_data: [],
  filtered_podcast: [],
  single_podcast_loading: false,
  single_podcast_error: false,
  single_podcast_track_data: [],
  searchTerm: "",
  searchParam: ["author", "pod"],
};

export const PodcastContext = React.createContext();
export const PodcastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(podcastReducer, initialState);
  //! GET All PODCAST
  const fetchPodcast = async (url) => {
    dispatch({ type: GET_PODCAST_BEGIN });
    try {
      const response = await axios(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = response;
      const podcastResponses = data.feed.entry.map((podcast) => {
        return {
          id: podcast.id.attributes["im:id"],
          author: podcast["im:artist"].label,
          pod: podcast["im:name"].label,
          des: podcast.summary.label,
          img: podcast["im:image"][2].label,
        };
      });
      localStorage.setItem("podcastResponses", JSON.stringify(podcastResponses));
      createCookie("podcast", "allPodcast", 86400000);

      dispatch({ type: GET_PODCAST_SUCCESS, payload: podcastResponses });
    } catch (error) {
      dispatch({ type: GET_PODCAST_ERROR });
    }
  };
  const handleFilter = (e) => {
    const { name, value } = e.target;
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  //   !SINGLE PODCAST
  const fetchSinglePodcast = async (url, id) => {
    dispatch({ type: GET_SINGLE_PODCAST_BEGIN });
    try {
      const res = await axios(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const [, ...restOfTheTracks] = [...res.data.results];
      const tracksList = objectToArray(restOfTheTracks).map((track) => {
        const duration = convertMsToTime(track.trackTimeMillis);
        return {
          collectionId: track.collectionId,
          collectionName: track.collectionName,
          description: track.description,
          song: track.episodeUrl,
          trackId: track.trackId,
          trackName: track.trackName.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
          duration,
          trackImg: track.artworkUrl600,
          releaseDate: track.releaseDate,
        };
      });
      localStorage.setItem(id, JSON.stringify(tracksList));
      createCookie(id, "singlePodcast", 86400000);
      dispatch({
        type: GET_SINGLE_PODCAST_SUCCESS,
        payload: tracksList,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PODCAST_ERROR });
    }
  };

  //!USE EFFECTS
  useEffect(() => {
    const cookieStr = getCookiesValue("podcast");
    if (!cookieStr) {
      fetchPodcast(API_URL);
    } else {
      dispatch({
        type: GET_PODCAST_SUCCESS,
        payload: JSON.parse(localStorage.getItem("podcastResponses")),
      });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: LOAD_PODCAST, payload: state.podcast_data });
  }, [state.podcast_data]);
  useEffect(() => {
    dispatch({ type: FILTER_PODCAST });
  }, [state.searchTerm, state.podcast_data]);
  return (
    <PodcastContext.Provider
      value={{
        ...state,
        handleFilter,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};
export const usePodcastContext = () => {
  return useContext(PodcastContext);
};
