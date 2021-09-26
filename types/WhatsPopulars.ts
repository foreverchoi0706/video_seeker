import Movie from "./Movie";
import TvShow from "./TvShow";

export default interface whatsPopulars {
    page: number,
    results: Array<Movie | TvShow>,
    total_results: number,
    total_page: number
}