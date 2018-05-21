import React from 'react'

class CurrentWeather extends React.Component {
  render() {
    return(
      <div className="current_weather_container">
        <img src={`https://www.metaweather.com/static/img/weather/${this.props.current_weather_state_svg}.svg`} alt="weather condition" className="weather_state_svg"/>
        <h2>{this.props.current_weather_state}</h2>
        <h2>{this.props.current_temp}&#176;</h2>
        <h2>{this.props.user_location}</h2>
      </div>
    )
  }
}

export default CurrentWeather
