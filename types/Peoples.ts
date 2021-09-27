export default interface Peoples {
    page: number,
    total_results: number,
    total_pages: number,
    results: Array<{
        adult: boolean,
        gender: number,
        id: number,
        known_for: Array<any>,
        known_for_department: string,
        name: string,
        popularity: number,
        profile_path: string
    }>
}