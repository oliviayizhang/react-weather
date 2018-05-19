import React from 'react'

class Weather extends React.Component {
  render() {
    let sevenDaysWeather = this.props.consolidated_weather.map((item) => {
      return <li key={item.id}>{item.applicable_date} {item.weather_state_name} {item.max_temp} {item.min_temp} {item.humidity}</li>


    })
    return(
      <div>
        {sevenDaysWeather}
      </div>
    )
  }
}

export default Weather
