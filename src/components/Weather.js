import React from 'react'

class Weather extends React.Component {
  render() {
    let weather_detail = this.props.consolidated_weather.map((day, i) => (
      [
        <li key={i} className="date">{day.applicable_date}</li>,
        <li key={i+1} className="weather_state">{day.weather_state_name}</li>,
        <li key={i+2} className="max_temp">{Math.round(day.max_temp)}&#8451;</li>,
        <li key={i+3} className="min_temp">{Math.round(day.min_temp)}&#8451;</li>,
        <li key={i+4} className="humidity">Humidity: {day.humidity}&#37;</li>,
      ]
    ))

    return(
      <div className="weather_container">
        {weather_detail}
      </div>
    )
  }
}

export default Weather
