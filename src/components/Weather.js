import React from 'react'

class Weather extends React.Component {
  constructor(props) {
    super(props)

    this.dateConverter = this.dateConverter.bind(this)
  }

  dateConverter(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let [_, month, day] = date.split('-')
    return months[month - 1] + ' ' + day
  }

  render() {

    let weather_detail = this.props.consolidated_weather.map((day, i) => (
      [
        <ul className="weather_day" key={i-1}>
          <li key={i} className="date">{this.dateConverter(day.applicable_date)}</li>
          <img src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`} alt="weather condition" className="weather_state_svg"/>
          {/* <li key={i+1} className="weather_state">{day.weather_state_name}</li> */}
          <li key={i+2} className="max_temp">{Math.round(day.max_temp)}&#176;</li>
          <li key={i+3} className="min_temp">{Math.round(day.min_temp)}&#176;</li>
          <li key={i+4} className="humidity">Humidity: {day.humidity}&#37;</li>
        </ul>
      ]
    ))

    let search_city = this.props.search_location
    let search_country = this.props.search_country

    return(
      <div>
        <h3>{search_city}, {search_country}</h3>
        <div className="weather_container">
          {weather_detail}
        </div>
      </div>
    )
  }
}

export default Weather
