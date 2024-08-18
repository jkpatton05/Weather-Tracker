import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public temperature: number,
    public description: string,
    public humidity: number,
    public windSpeed: number,
    public forecast: Array<{ date: string; temperature: number; description: string }>
  ) { }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/';
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(`${this.baseURL}weather?q=${query}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    return this.destructureLocationData(data);
  }
  // TODO: Create destructureLocationData method
  // TODO: Remove the unused buildGeocodeQuery method
  private destructureLocationData(data: any): Coordinates {
    return {
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(data: any): Weather {
    return new Weather(
      data.current.temp,
      data.current.weather[0].description,
      data.current.humidity,
      data.current.wind_speed,
      this.buildForecastArray(data.daily)
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(dailyData: any[]): Array<{ date: string; temperature: number; description: string }> {
    return dailyData.map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temperature: day.temp.day,
      description: day.weather[0].description,
    }));
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
