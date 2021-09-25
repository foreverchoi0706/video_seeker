import { AnyAction, Reducer } from "redux";
import { createAsyncThunk, createReducer, } from "@reduxjs/toolkit";
import axios from "axios";

export const GET_TREND = createAsyncThunk("GET_TREND", async (params) => {
  const trend = await axios.get(
    "https://api.themoviedb.org/3/trending/all/day?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
  );
  return trend;
});

export const GET_PEOPLES = createAsyncThunk("GET_PEOPLES", async (params: string) => {
  const trend = await axios.get(
    "https://api.themoviedb.org/3/trending/all/day?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
  );
  return trend;
});

const initialState = {
  trend: [],
  peoples: null
};

const reducer: Reducer = createReducer(initialState, builder => {
  builder.addCase(GET_TREND.fulfilled, (state, action) => {
    state.trend = action.payload.data;
  }).addCase(GET_PEOPLES.fulfilled, (state, action) => {
    state.peoples = action.payload.data;
  });
});

export default reducer;
