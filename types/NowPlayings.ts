import Movie from "./Movie";
import TvShow from "./TvShow";

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