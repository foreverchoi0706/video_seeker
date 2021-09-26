import { combineReducers } from "redux";
/**@reducers */
import video from "./video";

const root = combineReducers({
  video,
});

export type RootState = ReturnType<typeof root>;


export default root;
