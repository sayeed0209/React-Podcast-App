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
} from "../utils/action.js";
export const podcastReducer = (state, action) => {
  switch (action.type) {
    // * all podcast case starts here
    case GET_PODCAST_BEGIN:
      return { ...state, isLoading_podcast: true };

    case GET_PODCAST_SUCCESS:
      return {
        ...state,
        podcast_data: action.payload,
        isLoading_podcast: false,
      };

    case GET_PODCAST_ERROR:
      return { ...state, isLoading_podcast: false, podcast_error: true };
    // * all podcast case end here
    // * Loading products and  Filter products case starts here
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, [name]: value };

    // * Loading products and  Filter products case starts here
    case LOAD_PODCAST:
      return { ...state, filtered_podcast: [...action.payload] };
    case FILTER_PODCAST:
      const { podcast_data, searchTerm, searchParam } = state;
      let tempPodcast = [...podcast_data];
      if (searchTerm) {
        tempPodcast = tempPodcast.filter((podcast) => {
          return searchParam.some((key) => {
            return podcast[key].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
          });
        });
      }
      return { ...state, filtered_podcast: tempPodcast };
    default:
      return state;
    // throw new Error(`No Matching "${action.type}" - action type`);
  }
};
