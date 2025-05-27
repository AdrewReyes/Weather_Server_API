import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
interface Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  private baseURL: string = `${process.env.API_BASE_URL}/data/2.5/forecast`;
  private apiKey: string = process.env.API_KEY || '';

  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
    const data: any = await response.json();
    return { lat: data.coord.lat, lon: data.coord.lon };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    return response.json();
  }

 private parseCurrentWeather(response: any): Weather {
  return {
    city: response.city.name,
    date: response.list[0].dt_txt,
    icon: response.list[0].weather[0].icon,
    iconDescription: response.list[0].weather[0].description,
    tempF: this.kelvinToFahrenheit(response.list[0].main.temp),
    windSpeed: response.list[0].wind.speed,
    humidity: response.list[0].main.humidity,
  };
}

  private kelvinToFahrenheit(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
  }

private buildForecastArray(weatherData: any): Weather[] {
  // OpenWeather's 5-day forecast gives data every 3 hours.
  // We'll pick the forecast for 12:00:00 each day.
  const forecasts: Weather[] = [];
  const usedDates = new Set();

  for (const entry of weatherData.list) {
    const date = entry.dt_txt.split(' ')[0];
    const time = entry.dt_txt.split(' ')[1];
    if (time === '12:00:00' && !usedDates.has(date)) {
      forecasts.push({
        city: weatherData.city.name,
        date: entry.dt_txt,
        icon: entry.weather[0].icon,
        iconDescription: entry.weather[0].description,
        tempF: this.kelvinToFahrenheit(entry.main.temp),
        windSpeed: entry.wind.speed,
        humidity: entry.main.humidity,
      });
      usedDates.add(date);
    }
    if (forecasts.length === 5) break;
  }
  return forecasts;
}

async getWeatherForCity(city: string): Promise<Weather[]> {
  const coordinates = await this.fetchLocationData(city);
  const weatherData = await this.fetchWeatherData(coordinates);
  const currentWeather = this.parseCurrentWeather(weatherData);
  const forecastArray = this.buildForecastArray(weatherData);
  return [currentWeather, ...forecastArray];
}
}

export default new WeatherService();