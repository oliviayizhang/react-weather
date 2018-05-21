import React from 'react'

class CurrentWeather extends React.Component {
  render() {
    return(
      <div className="current_weather_container">
        <img src={`https://www.metaweather.com/static/img/weather/${this.props.current_weather_state_svg}.svg`} alt="weather condition" className="user_weather_svg"/>
        {/* <h3>{this.props.current_weather_state}</h3> */}
        <p>{this.props.current_temp}&#176; </p>
        <p><i className="fas fa-location-arrow"></i> {this.props.user_location}, {this.props.user_location_state}</p>
      </div>
    )
  }
}

export default CurrentWeather
