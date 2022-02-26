import Movies from "./Movies";

export default interface Multi {
  page: number;
  results: Array<Movies>;
  total_results: number;
  total_page: number;
}
