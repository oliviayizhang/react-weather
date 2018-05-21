import React, { Component } from 'react';
import Title from './components/Title'
import Weather from './components/Weather'
import CurrentWeather from './components/CurrentWeather'
import Geosuggest from 'react-geosuggest'

import './stylesheets/normalize.css';
import './stylesheets/App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      user_lat: null,
      user_lng: null,
      woeid : null,
      user_woeid: null,
      search_location: null,
      search_country: null,
      user_location: null,
      consolidated_weather: [],
      current_temp: null,
      current_weather_state: null,
      current_weather_state_svg: null
    }
    this.fetchWeather = this.fetchWeather.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.fetchCurrentWeather = this.fetchCurrentWeather.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let user_lat = position.coords.latitude
      let user_lng = position.coords.longitude
      this.setState({
        user_lat: user_lat,
        user_lng: user_lng
      })
      this.fetchCurrentWeather()
    })
  }

  onSuggestSelect(suggest) {
    if (suggest) {
      this.setState({
        lat: suggest.location.lat,
        lng: suggest.location.lng
      })
    }
  }

  fetchCurrentWeather() {
    let latt = this.state.user_lat
    let long = this.state.user_lng
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latt}, ${long}`, {
      credentials: 'same-origin',
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          user_woeid: data[0].woeid
        })
        fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${data[0].woeid}`, {
          credentials: 'same-origin',
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              user_location: data.title,
              current_temp: data.consolidated_weather[0].the_temp,
              current_weather_state: data.consolidated_weather[0].weather_state_name,
              current_weather_state_svg: data.consolidated_weather[0].weather_state_abbr
            })
          })
      })
  }

  fetchWeather(event) {
    event.preventDefault()
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
              search_location: data.title,
              search_country: data.parent.title,
              consolidated_weather: data.consolidated_weather
            })
          })
      })
  }

  render() {
    // console.log("woeid:" + this.state.woeid);
    console.log("city:" + this.state.search_location);
    // console.log("consolidated weather:" + this.state.consolidated_weather);
    // console.log(this.state.lat);
    // console.log(this.state.lng);
    // console.log(this.state.user_woeid);
    // console.log(this.state.user_location);
    // console.log(this.state.user_current_weather);

    let current_location_weather = <div>Loading...</div>

    if(this.state.current_temp && this.state.current_weather_state_svg) {
      current_location_weather =
      <CurrentWeather
        user_location={this.state.user_location}
        current_temp={Math.round(this.state.current_temp)}
        current_weather_state={this.state.current_weather_state}
        current_weather_state_svg={this.state.current_weather_state_svg}
      />
    }

    let search_results = this.state.search_location ? <Weather
      consolidated_weather={this.state.consolidated_weather}
      search_location={this.state.search_location}
      search_country={this.state.search_country}
    /> : null

    return (
      <div className="App">
        <Title/>
        {current_location_weather}
        <form onSubmit={this.fetchWeather} className="search_form">
          <Geosuggest
            ref={el=>this._geoSuggest=el}
            placeholder="Enter city"
            types={['(cities)']}
            onSuggestSelect={this.onSuggestSelect}
          />
          <button>GO</button>
        </form>
        {search_results}
      </div>
    );
  }
}

export default App;
