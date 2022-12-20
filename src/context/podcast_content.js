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
  CLEAR_FILTERS,
  API_URL,
} from "../utils/action.js";
import { createCookie } from "../utils/helper";
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
      console.log(data);
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
  return (
    <PodcastContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};
export const usePodcastContext = () => {
  return useContext(PodcastContext);
};
