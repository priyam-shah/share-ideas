// what is a reducer
// - it is a function that accepts the state and an action
// -- then based on the action type {in other words action.type ==== create} it returns something

import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from "../constants/actionTypes";

// our state is simply going to be post so instead of  state = []   we write  posts = []
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };

    case "END_LOADING":
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };

    case FETCH_POST:
      return { ...state, post: action.payload.post };

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // change the post that just received a comment
          if (post._id == +action.payload._id) {
            return action.payload;
          }
          // return all other post normally
          return post;
        }),
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    // we send an array of posts --> spread all the post & then add new post

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

// reducer is a function ( that accepts the state & action )
// const reducer = (posts = [], action) => {
