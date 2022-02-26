import { Movie } from "./Movies";
import { TvShow } from "./TvShows";

export interface Video extends Movie, TvShow {}

export default interface Videos {
  page: number;
  results: Array<Video>;
  total_results: number;
  total_pages: number;
}
