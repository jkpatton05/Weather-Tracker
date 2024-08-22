import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';


router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    HistoryService.saveCity(city);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save city to search history' });
  }
});
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;
  try {
    HistoryService.saveCity(city);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save city to search history' });
  }

});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = HistoryService.getSearchHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});
router.get('/history', async (_req: Request, _res: Response) => { });

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.deleteCity(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});
router.delete('/history/:id', async (_req: Request, _res: Response) => { });

export default router;
