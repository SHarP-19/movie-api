import { MovieService } from '../src/services/movieService';
import { AxiosInstance } from 'axios';
import api from '../src/utils/api';

jest.mock('../src/utils/api');
const mockedApi = api as jest.Mocked<AxiosInstance>;

describe('MovieService', () => {
    let movieService: MovieService;

    beforeEach(() => {
        movieService = new MovieService();
        jest.clearAllMocks();
    });

    it('should fetch movies for a given year', async () => {
        const mockMovieResponse = {
            data: {
                results: [
                    {
                        id: 1,
                        title: 'Test Movie',
                        release_date: '2019-01-01',
                        vote_average: 8.5
                    }
                ]
            }
        };

        const mockCreditsResponse = {
            data: {
                crew: [
                    {
                        known_for_department: 'Editing',
                        name: 'Test Editor'
                    }
                ]
            }
        };

        mockedApi.get
            .mockImplementationOnce(() => Promise.resolve(mockMovieResponse))
            .mockImplementationOnce(() => Promise.resolve(mockCreditsResponse));

        const result = await movieService.getMoviesByYear('2019');

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            title: 'Test Movie',
            release_date: 'January 1, 2019',
            vote_average: 8.5,
            editors: ['Test Editor']
        });
    });

    it('should handle credits API failure gracefully', async () => {
        const mockMovieResponse = {
            data: {
                results: [
                    {
                        id: 1,
                        title: 'Test Movie',
                        release_date: '2019-01-01',
                        vote_average: 8.5
                    }
                ]
            }
        };

        mockedApi.get
            .mockImplementationOnce(() => Promise.resolve(mockMovieResponse))
            .mockImplementationOnce(() => Promise.reject(new Error('Credits API failed')));

        const result = await movieService.getMoviesByYear('2019');

        expect(result).toHaveLength(1);
        expect(result[0].editors).toEqual([]);
    });
});