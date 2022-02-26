export interface Cast {
  id: number;
  original_language: string;
  episode_count: number;
  overview: string;
  origin_country: string[];
  original_name: string;
  genre_ids: number[];
  name: string;
  media_type: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  character: string;
  backdrop_path: string;
  popularity: number;
  credit_id: string;
  original_title: string;
  video?: boolean;
  release_date: string;
  title: string;
  adult?: boolean;
}

export interface Crew {
  id: number;
  department: string;
  original_language: string;
  episode_count: number;
  job: string;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: string;
  popularity: number;
  credit_id: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
  original_title: string;
  video?: boolean;
  title: string;
  adult?: boolean;
  release_date: string;
}

export default interface CombinedCredits {
  cast: Array<Cast>;
  crew: Array<Crew>;
  id: number;
}
