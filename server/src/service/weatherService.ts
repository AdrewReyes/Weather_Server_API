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
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
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
      temperature: response.list[0].main.temp,
      humidity: response.list[0].main.humidity,
      windSpeed: response.list[0].wind.speed,
      description: response.list[0].weather[0].description,
    };
  }

  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();