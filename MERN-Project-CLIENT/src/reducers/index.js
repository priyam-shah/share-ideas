import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

// export default combineReducers({
//   posts: posts,
// });

export const reducers = combineReducers({
  posts,
  auth,
  // it should be posts: post
  // - but considering key and value are same we just simply say posts
});
