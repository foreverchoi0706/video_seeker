export default interface TvShow {
    genre_ids: Array<number>,
    original_name: string,
    origin_country: Array<string>,
    poster_path: string,
    title?: string,
    vote_average: number,
    id: number,
    overview: string,
    vote_count: number,
    name?: string,
    original_language: string,
    backdrop_path: string,
    first_air_date: string,
    release_date?: string,
    popularity: number,
    media_type: string
}