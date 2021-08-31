const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
        console.log(action);
      return state;
    default:
      return state;
  }

  return null;
};

export default reducer;
