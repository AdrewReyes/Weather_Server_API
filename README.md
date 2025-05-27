# Weather Dashboard

A full-stack weather dashboard application that allows users to search for a city and view current and 5-day weather forecasts using the OpenWeather API. The app saves search history and is deployed on Render.

---

## Table of Contents

- [Features](#features)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Usage](#api-usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- Search for any city to view current and 5-day weather forecasts.
- Weather data includes city name, date, weather icon, description, temperature, humidity, and wind speed.
- Search history is saved and displayed; users can re-search by clicking a city in the history.
- Backend stores search history in a JSON file with unique IDs for each city.
- Deployed on Render.

---

## User Story

```
AS A traveler  
I WANT to see the weather outlook for multiple cities  
SO THAT I can plan a trip accordingly
```

---

## Acceptance Criteria

- GIVEN a weather dashboard with form inputs  
  WHEN I search for a city  
  THEN I am presented with current and future conditions for that city, and that city is added to the search history

- WHEN I view current weather conditions for that city  
  THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's alt tag, the temperature, the humidity, and the wind speed

- WHEN I view future weather conditions for that city  
  THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

- WHEN I click on a city in the search history  
  THEN I am again presented with current and future conditions for that city

---

## Screenshots

![Weather Dashboard Screenshot](./Assets/09-servers-and-apis-homework-demo.png)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YourUsername/Weather_Server_API.git
   cd Weather_Server_API/09-Servers-and-APIs/02-Challenge/Develop
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory:
     ```
     API_KEY=your_openweather_api_key
     API_BASE_URL=https://api.openweathermap.org
     ```

4. **Build and run locally:**
   ```sh
   npm run client:build
   npm run server
   ```
   - The app will be available at [http://localhost:3001](http://localhost:3001)

---

## API Usage

- Uses the [OpenWeather 5-day Forecast API](https://openweathermap.org/forecast5)
- Example endpoint:
  ```
  https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}
  ```

---

## Project Structure

```
Develop/
  client/         # Frontend (Vite + TypeScript)
  server/         # Backend (Express + TypeScript)
    db/           # JSON file for search history
    src/
      routes/     # API and HTML routes
      service/    # Weather and history services
```

---

## Environment Variables

| Variable      | Description                      | Example Value                        |
|---------------|----------------------------------|--------------------------------------|
| API_KEY       | OpenWeather API Key              | `your_openweather_api_key`           |
| API_BASE_URL  | OpenWeather API Base URL         | `https://api.openweathermap.org`     |

Set these in your `.env` file (for local) and in Render’s environment settings (for deployment).

---

## Deployment

This app is deployed on [Render](https://dashboard.render.com/web/srv-d0qm3e3e5dus739mdmug)

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Environment Variables:**  
Set `API_KEY` and `API_BASE_URL` in the Render dashboard.

---

## License

This project is licensed under the MIT License.

---

## Credits

- [OpenWeather](https://openweathermap.org/)
- [Render](https://render.com/)
