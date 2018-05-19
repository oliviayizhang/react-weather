import React, { Component } from 'react';
import Title from './components/Title'
import Search from './components/Search'
import Weather from './components/Weather'

import './stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      woeid : null,
      location: null,
      consolidated_weather: []
    }
    this.fetchWeather = this.fetchWeather.bind(this)
  }

  fetchWeather(event) {
    event.preventDefault()
    const city = event.target.elements.city.value
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`, {
      credentials: 'same-origin',
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          woeid: data[0].woeid
        })
        fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${data[0].woeid}`, {
          credentials: 'same-origin',
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              location: data.title,
              consolidated_weather: data.consolidated_weather
            })
          })
      })
  }



  render() {
    console.log(this.state.woeid);
    console.log(this.state.location);
    console.log(this.state.consolidated_weather);
    return (
      <div className="App">
        <Title/>
        <Search
          fetchWoeid={this.fetchWeather}
        />
        <Weather
          consolidated_weather={this.state.consolidated_weather}
        />
      </div>
    );
  }
}

export default App;
