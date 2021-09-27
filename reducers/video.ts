import { AnyAction, Reducer } from "redux";
import { createAsyncThunk, createReducer, } from "@reduxjs/toolkit";
import axios from "axios";
/**@types */
import Movie from "../types/Movie";
import Peoples from "../types/Peoples";
import People from "../types/People";
import Multi from "../types/Muti";
import WhatsPopulars from "../types/WhatsPopulars";
import NowPlayings from "../types/NowPlayings";
import FreeToWatches from "../types/FreeToWatches";
/**@config */
import config from "../config.json";

const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: config.API_KEY
  }
});

export const getMulti = createAsyncThunk("GET_MULTIES", async (keyword: string) => (await instance.get(`/search/movie?language=ko-KR&query=${keyword}&page=1&include_adult=false`)).data);

export const getWhatsPopulars = createAsyncThunk("GET_WHATS_POPULARS", async (params) => (await instance.get(`/movie/popular?language=ko-KR&page=1`)).data);

export const getFreeToWatches = createAsyncThunk("GET_FREE_TO_WATCHES", async (params) => (await instance.get(`/list/2?language=ko-KR`)).data);

export const getNowPlayings = createAsyncThunk("GET_NOW_PLAYINGS", async (params) => (await instance.get(`/movie/now_playing?language=ko-KR&page=1`)).data);

export const getTrends = createAsyncThunk("GET_TREND", async (params) => (await instance.get(`/trending/all/day?language=ko-KR`)).data);

export const getPeoples = createAsyncThunk("GET_PEOPLES", async (page: number = 1) => (await instance.get(`/person/popular?language=en-US&page=${page}`)).data);

export const searchPeoples = createAsyncThunk("SEARCH_PEOPLES", async (keyword: string) => (await instance.get(`/search/person?language=en-US&page=1&include_adult=false&query=${keyword}`)).data);

export const getPeople = createAsyncThunk("GET_PEOPLE", async (id: string) => await (await instance.get(`/person/${id}?language=ko-KR`)).data);

interface StateProps {
  lang: string,
  multi: Multi | null,
  whatsPopulars: WhatsPopulars | null,
  freeToWatches: Array<any> | null,
  nowPlayings: NowPlayings | null,
  trends: FreeToWatches | null,
  peoples: Peoples | null,
  searchedPeoples: Peoples | null,
  people: People | null,
}

const initialState: StateProps = {
  lang: "ko-KR",
  multi: null,
  whatsPopulars: null,
  freeToWatches: null,
  nowPlayings: null,
  trends: null,
  peoples: null,
  searchedPeoples: null,
  people: null,
};

const reducer: Reducer<StateProps, AnyAction> = createReducer(initialState, builder => {
  builder.addCase(getMulti.fulfilled, (state, { payload }) => {
    state.multi = payload;
  }).addCase(getWhatsPopulars.fulfilled, (state, { payload }) => {
    state.whatsPopulars = payload;
  }).addCase(getFreeToWatches.fulfilled, (state, { payload }) => {
    state.freeToWatches = payload;
  }).addCase(getNowPlayings.fulfilled, (state, { payload }) => {
    state.nowPlayings = payload;
  }).addCase(getTrends.fulfilled, (state, { payload }) => {
    state.trends = payload;
  }).addCase(getPeoples.fulfilled, (state, { payload }) => {
    state.peoples = payload;
  }).addCase(searchPeoples.fulfilled, (state, { payload }) => {
    state.searchedPeoples = payload;
  }).addCase(getPeople.fulfilled, (state, { payload }) => {
    console.log("TESTEST");
    state.people = payload;
  });
});

export default reducer;
