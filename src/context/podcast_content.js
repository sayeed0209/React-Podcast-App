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
