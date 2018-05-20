import React from 'react'

class CurrentWeather extends React.Component {
  render() {
    return(
      <div>
        <h3>{this.props.user_location}</h3>
        <h2>{this.props.current_weather_state}</h2>
        <h2>{this.props.current_temp}&#8451;</h2>
      </div>
    )
  }
}

export default CurrentWeather
