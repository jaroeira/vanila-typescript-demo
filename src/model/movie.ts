export interface Movie {
  id: number;
  adult: boolean;
  backdropPath: string;
  posterPath: string;
  genreIds: number[];
  originalLanguage: string;
  title: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  releaseDate: Date;
}

export function transformFromJSON(json: any): Movie {
  return {
    id: json.id,
    adult: json.adult,
    genreIds: json.genre_ids,
    backdropPath: json.backdrop_path,
    originalLanguage: json.original_language,
    posterPath: json.poster_path,
    title: json.title,
    originalTitle: json.original_title,
    voteAverage: json.vote_average,
    voteCount: json.vote_count,
    overview: json.original_title,
    popularity: json.popularity,
    releaseDate: new Date(json.release_date),
  };
}
