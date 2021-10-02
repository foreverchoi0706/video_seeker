import { Movie } from "./Movies";
import { TvShow } from "./TvShows";

export default interface NowPlayings {
    page: number,
    results: Array<Movie | TvShow>,
    datas: {
        maximum: string,
        minimum: string
    }
    total_results: number,
    total_page: number
}