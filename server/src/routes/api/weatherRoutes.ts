import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  const cityName = req.body.cityName;
  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_: Request, res: Response) => {
try {
  const cities = await HistoryService.getCities();
  res.status(200).json(cities);
} catch (error) {
  res.status(500).json({ error: 'Failed to retrieve search history' });
}
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const cityId = req.params.id;
  try {
    await HistoryService.removeCity(cityId);
    res.status(204).send();
}   catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
}
});

export default router;
