import { City } from '../models/city'; // Import the City class from the appropriate file

class HistoryService {
  saveCity(_city: any) {
    throw new Error('Method not implemented.');
  }
  getSearchHistory() {
    throw new Error('Method not implemented.');
  }
  deleteCity(_id: string) {
    throw new Error('Method not implemented.');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  async read() {
    // Remove the duplicate function declaration here
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() { }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(_city: City) { }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(_id: string) { }
}

export default new HistoryService();
