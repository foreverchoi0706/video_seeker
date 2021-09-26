import { AnyAction, Reducer } from "redux";
import { createAsyncThunk, createReducer, } from "@reduxjs/toolkit";
import axios from "axios";
/**@types */
import Movie from "../types/Movie";
import Peoples from "../types/Peoples";
import Multi from "../types/Muti";
import WhatsPopulars from "../types/whatsPopulars";
import NowPlayings from "../types/NowPlayings";
import FreeToWatches from "../types/FreeToWatches";
/**@config */
import config from "../config.json";


const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: config.API_KEY
  }
})

export const getMulti = createAsyncThunk("GET_MULTIES", async (keyword: string) => (await instance.get(`/search/movie?language=ko-KR&query=${keyword}&page=1&include_adult=false`)).data);

export const getWhatsPopulars = createAsyncThunk("GET_WHATS_POPULARS", async (params) => (await instance.get(`/movie/popular?language=ko-KR&page=1`)).data);

export const getFreeToWatches = createAsyncThunk("GET_FREE_TO_WATCHES", async (params) => (await instance.get(`/list/2?language=ko-KR`)).data);

export const getNowPlayings = createAsyncThunk("GET_NOW_PLAYINGS", async (params) => (await instance.get(`/movie/now_playing?language=ko-KR&page=1`)).data);

export const getTrends = createAsyncThunk("GET_TREND", async (params) => (await instance.get(`/trending/all/day?language=ko-KR`)).data);

export const getPeoples = createAsyncThunk("GET_PEOPLES", async (page: number = 1) => (await instance.get(`/person/popular?language=en-US&page=${page}`)).data);

interface StateProps {
  lang: string,
  multi: Multi | null,
  whatsPopulars: WhatsPopulars | null,
  freeToWatches: Array<any> | null,
  nowPlayings: NowPlayings | null,
  trends: FreeToWatches | null,
  peoples: Peoples | null,

}

const initialState: StateProps = {
  lang: "ko-KR",
  multi: null,
  whatsPopulars: null,
  freeToWatches: null,
  nowPlayings: null,
  trends: null,
  peoples: null,
};

const reducer: Reducer<StateProps, AnyAction> = createReducer(initialState, builder => {
  builder.addCase(getMulti.fulfilled, (state, action) => {
    state.multi = action.payload;
  }).addCase(getWhatsPopulars.fulfilled, (state, action) => {
    state.whatsPopulars = action.payload;
  }).addCase(getFreeToWatches.fulfilled, (state, action) => {
    state.freeToWatches = action.payload;
  }).addCase(getNowPlayings.fulfilled, (state, action) => {
    state.nowPlayings = action.payload;
  }).addCase(getTrends.fulfilled, (state, action) => {
    state.trends = action.payload;
  }).addCase(getPeoples.fulfilled, (state, action) => {
    state.peoples = action.payload;
  });
});

export default reducer;
