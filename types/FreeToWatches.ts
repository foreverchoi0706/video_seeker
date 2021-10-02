import { Movie } from "./Movies";
import { TvShow } from "./TvShows";

export default interface FreeToWatches {
    page: number,
    results: Array<Movie | TvShow>,
    total_results: number,
    total_page: number
}