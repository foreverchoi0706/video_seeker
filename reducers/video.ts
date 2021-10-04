import { AnyAction, Reducer } from "redux";
import { createAsyncThunk, createReducer, } from "@reduxjs/toolkit";
import axios from "axios";
/**@types */
import Movies from "../types/Movies";
import TvShows from "../types/TvShows";
import Peoples from "../types/Peoples";
import People from "../types/People";
import MovieCredits from "../types/MovieCredits";
import CombinedCredits from "../types/CombinedCredits";
import Multi from "../types/Muti";
import Reviews from "../types/Reviews";
/**@config */
import config from "../config.json";
import Videos from "../types/Video";

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

export const getTrends = createAsyncThunk("GET_TRENDS", async () => (await instance.get(`/trending/all/day`)).data);

export const getMovies = createAsyncThunk("GET_MOVIES", async ({ page, div }: any) => (await instance.get(`/movie/${div}?page=${page}`)).data);

export const searchMovies = createAsyncThunk("SEARCH_MOVIES", async (keyword: string) => (await instance.get(`/search/movie?query=${keyword}`)).data);

export const getMovie = createAsyncThunk("GET_MOVIE", async (id: string) => (await instance.get(`/movie/${id}`)).data);

export const getTvShows = createAsyncThunk("GET_TV_SHOWS", async ({ page, div }: any) => (await instance.get(`/tv/${div}?S&page=${page}`)).data);

export const searchTvShows = createAsyncThunk("SEARCH_TV_SHOWS", async (keyword: string) => (await instance.get(`/search/tv?query=${keyword}`)).data);

export const getTvShow = createAsyncThunk("GET_TV_SHOW", async (id: string) => (await instance.get(`/tv/${id}`)).data);

export const getPeoples = createAsyncThunk("GET_PEOPLES", async (page: string = "1") => (await instance.get(`/person/popular?&page=${page}`)).data);

export const searchPeoples = createAsyncThunk("SEARCH_PEOPLES", async (keyword: string) => (await instance.get(`/search/person?&page=1&include_adult=false&query=${keyword}`)).data);

export const getPeople = createAsyncThunk("GET_PEOPLE", async (id: string) => await (await instance.get(`/person/${id}`)).data);

export const getExternalIds = createAsyncThunk("GET_EXTERNAL_IDS", async (id: string) => await (await instance.get(`/person/${id}/external_ids`)).data);

export const getMovieCredits = createAsyncThunk("GET_MOVIE_CREDITS", async (id: string) => await (await instance.get(`/person/${id}/movie_credits`)).data);

export const getCombinedCredits = createAsyncThunk("GET_COMBINDED_CREDITS", async (id: string) => (await instance.get(`/person/${id}/combined_credits`)).data);

export const getReviews = createAsyncThunk("GET_REVIEWS", async (id: string) => await (await instance.get(`/movie/${id}/reviews?page=1`)).data);

interface StateProps {
  multi: Multi | null,
  whatsPopulars: Videos | null,
  freeToWatches: Videos | null,
  nowPlayings: Videos | null,
  trends: Videos | null,
  movies: Videos | null,
  tvShows: Videos | null,
  peoples: Peoples | null,
  externalIds: any,
  movieCredits: MovieCredits | null,
  combinedCredits: CombinedCredits | null,
  searched: any;
  people: People | null,
  reviews: Reviews | null,
}

const initialState: StateProps = {
  multi: null,
  whatsPopulars: null,
  freeToWatches: null,
  nowPlayings: null,
  movies: null,
  tvShows: null,
  trends: null,
  peoples: null,
  people: null,
  externalIds: null,
  movieCredits: null,
  combinedCredits: null,
  searched: null,
  reviews: null,
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
  }).addCase(getMovies.fulfilled, (state, { payload }) => {
    state.movies = payload;
  }).addCase(searchMovies.fulfilled, (state, { payload }) => {
    state.searched = payload;
  }).addCase(getTvShows.fulfilled, (state, { payload }) => {
    state.tvShows = payload;
  }).addCase(searchTvShows.fulfilled, (state, { payload }) => {
    state.searched = payload;
  }).addCase(getPeoples.fulfilled, (state, { payload }) => {
    state.peoples = payload;
  }).addCase(getPeople.fulfilled, (state, { payload }) => {
    state.people = payload;
  }).addCase(getExternalIds.fulfilled, (state, { payload }) => {
    state.externalIds = payload;
  }).addCase(getMovieCredits.fulfilled, (state, { payload }) => {
    state.movieCredits = payload;
  }).addCase(getCombinedCredits.fulfilled, (state, { payload }) => {
    state.combinedCredits = payload;
  }).addCase(searchPeoples.fulfilled, (state, { payload }) => {
    state.searched = payload;
  }).addCase(getReviews.fulfilled, (state, { payload }) => {
    state.reviews = payload;
  });
});

export default reducer;
