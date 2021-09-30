import { AnyAction, Reducer } from "redux";
import { createAsyncThunk, createReducer, } from "@reduxjs/toolkit";
import axios from "axios";
/**@types */
import Movie from "../types/Movie";
import Peoples from "../types/Peoples";
import People from "../types/People";
import CombinedCredits from "../types/CombinedCredits";
import Multi from "../types/Muti";
import WhatsPopulars from "../types/WhatsPopulars";
import NowPlayings from "../types/NowPlayings";
import FreeToWatches from "../types/FreeToWatches";
import Reviews from "../types/Reviews";
/**@config */
import config from "../config.json";
import TvShow from "../types/TvShow";

const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: config.API_KEY,
    language: "en-US"
  }
});

export const getMulti = createAsyncThunk("GET_MULTIES", async (keyword: string) => (await instance.get(`/search/movie?&query=${keyword}&page=1&include_adult=false`)).data);

export const getWhatsPopulars = createAsyncThunk("GET_WHATS_POPULARS", async () => (await instance.get(`/movie/popular?&page=1`)).data);

export const getFreeToWatches = createAsyncThunk("GET_FREE_TO_WATCHES", async () => (await instance.get(`/list/2`)).data);

export const getNowPlayings = createAsyncThunk("GET_NOW_PLAYINGS", async () => (await instance.get(`/movie/now_playing?&page=1`)).data);

export const getTrends = createAsyncThunk("GET_TREND", async () => (await instance.get(`/trending/all/day`)).data);

export const getPeoples = createAsyncThunk("GET_PEOPLES", async (page: string = "1") => (await instance.get(`/person/popular?&page=${page}`)).data);

export const searchPeoples = createAsyncThunk("SEARCH_PEOPLES", async (keyword: string) => (await instance.get(`/search/person?&page=1&include_adult=false&query=${keyword}`)).data);

export const getPeople = createAsyncThunk("GET_PEOPLE", async (id: string) => await (await instance.get(`/person/${id}`)).data);

export const getExternalIds = createAsyncThunk("GET_EXTERNAL_IDS", async (id: string) => await (await instance.get(`/person/${id}/external_ids`)).data);

export const getCombinedCredits = createAsyncThunk("GET_COMBINDED_CREDITS", async (id: string) => (await instance.get(`/`)).data);

export const getReviews = createAsyncThunk("GET_REVIEWS", async (id: string) => await (await instance.get(`/movie/${id}/reviews?page=1`)).data);

export const getMovie = createAsyncThunk("GET_MOVIE", async (id: string) => (await instance.get(`/`)).data);

export const getTvShow = createAsyncThunk("GET_TV_SHOW", async (id: string) => (await instance.get(`/`)).data);

interface StateProps {
  multi: Multi | null,
  whatsPopulars: WhatsPopulars | null,
  freeToWatches: Array<any> | null,
  nowPlayings: NowPlayings | null,
  trends: FreeToWatches | null,
  peoples: Peoples | null,
  externalIds: any,
  combinedCredits: CombinedCredits | null,
  searchedPeoples: Peoples | null,
  people: People | null,
  reviews: Reviews | null,
  movie: Movie | null,
  tvShow: TvShow | null,
}

const initialState: StateProps = {
  multi: null,
  whatsPopulars: null,
  freeToWatches: null,
  nowPlayings: null,
  trends: null,
  peoples: null,
  people: null,
  externalIds: null,
  combinedCredits: null,
  searchedPeoples: null,
  reviews: null,
  movie: null,
  tvShow: null,
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
  }).addCase(getExternalIds.fulfilled, (state, { payload }) => {
    state.externalIds = payload;
  }).addCase(getCombinedCredits.fulfilled, (state, { payload }) => {
    state.combinedCredits = payload;
  }).addCase(searchPeoples.fulfilled, (state, { payload }) => {
    state.searchedPeoples = payload;
  }).addCase(getPeople.fulfilled, (state, { payload }) => {
    state.people = payload;
  }).addCase(getReviews.fulfilled, (state, { payload }) => {
    state.reviews = payload;
  });
});

export default reducer;
