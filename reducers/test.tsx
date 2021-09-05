import { AnyAction } from "redux";

const initialState = {};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "TEST":
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default reducer;
