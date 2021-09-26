import Movie from "./Movie";

export default interface Multi {
    page: number,
    results: Array<Movie>,
    total_results: number,
    total_page: number
}