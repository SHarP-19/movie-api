import express from 'express';
import { MovieController } from './controllers/movieController';
import { config } from './config/config';

const app = express();
const movieController = new MovieController();

app.get('/movies/:year', (req, res) => movieController.getMoviesByYear(req, res));

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;