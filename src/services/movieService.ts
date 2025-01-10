import api from '../utils/api';
import { Movie, TMDBMovie, TMDBCredits } from '../types/movie.types';

export class MovieService {
  async getMoviesByYear(year: string): Promise<Movie[]> {
    try {
      const { data } = await api.get('/discover/movie', {
        params: {
          language: 'en-US',
          page: 1,
          primary_release_year: year,
          sort_by: 'popularity.desc'
        }
      });

      const movies: TMDBMovie[] = data.results;
      const moviesWithEditors = await Promise.all(
        movies.map(async (movie) => {
          try {
            const editors = await this.getMovieEditors(movie.id);
            const date = new Date(movie.release_date + 'T00:00:00Z');
            return {
              title: movie.title,
              release_date: date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC'
              }),
              vote_average: movie.vote_average,
              editors
            };
          } catch (error) {
            const date = new Date(movie.release_date + 'T00:00:00Z');
            return {
              title: movie.title,
              release_date: date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC'
              }),
              vote_average: movie.vote_average,
              editors: []
            };
          }
        })
      );

      return moviesWithEditors;
    } catch (error) {
      throw new Error('Failed to fetch movies');
    }
  }

  private async getMovieEditors(movieId: number): Promise<string[]> {
    const { data } = await api.get<TMDBCredits>(`/movie/${movieId}/credits`);
    
    return data.crew
      .filter(member => member.known_for_department === 'Editing')
      .map(editor => editor.name);
  }
}