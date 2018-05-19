import React, { Component } from 'react';
import Title from './components/Title'
import Weather from './components/Weather'
import Geosuggest from 'react-geosuggest'

import './stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      woeid : null,
      location: null,
      consolidated_weather: []
    }
    this.fetchWeather = this.fetchWeather.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
  }

  onSuggestSelect(suggest) {
    if (suggest) {
      this.setState({
        lat: suggest.location.lat,
        lng: suggest.location.lng
      })
    }
  }

  fetchWeather(event) {
    event.preventDefault()
    // const city = event.target.elements.city.value
    let latt = this.state.lat
    let long = this.state.lng
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latt}, ${long}`, {
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
    console.log("woeid:" + this.state.woeid);
    console.log("city:" + this.state.location);
    console.log("consolidated weather:" + this.state.consolidated_weather);
    console.log(this.state.lat);
    console.log(this.state.lng);
    return (
      <div className="App">
        <Title/>
        {/* <Search
          fetchWoeid={this.fetchWeather}
        /> */}
        <form onSubmit={this.fetchWeather}>
          <Geosuggest
            ref={el=>this._geoSuggest=el}
            placeholder="Enter a city or zipcode"
            types={['(cities)']}
            onSuggestSelect={this.onSuggestSelect}
          />
          <button>Go!</button>
        </form>
        <Weather
          consolidated_weather={this.state.consolidated_weather}
        />
      </div>
    );
  }
}

export default App;
