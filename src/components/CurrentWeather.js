import React from 'react'

class CurrentWeather extends React.Component {
  render() {
    let temperature = this.props.celsius ? this.props.current_temp : this.props.cToF(this.props.current_temp)
    return(
      <div className="current_weather_container">
        <img src={`https://www.metaweather.com/static/img/weather/${this.props.current_weather_state_svg}.svg`} alt="weather condition" className="user_weather_svg"/>
        <p className="current_temp">{Math.round(temperature)}&#176; </p>
        <p className="current_city"><i className="fas fa-location-arrow user_location_icon"></i> {this.props.user_location}, {this.props.user_location_state}</p>
      </div>
    )
  }
}

export default CurrentWeather
