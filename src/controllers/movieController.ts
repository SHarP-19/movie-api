import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  async getMoviesByYear(req: Request, res: Response): Promise<void> {
    try {
        console.log('Response', req.params.year)
      const year = req.params.year;
      
      if (!year || !/^\d{4}$/.test(year)) {
        res.status(400).json({ error: 'Invalid year format. Please use YYYY format.' });
        return;
      }
      console.log('Response year', year)
      const movies = await this.movieService.getMoviesByYear(year);
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}