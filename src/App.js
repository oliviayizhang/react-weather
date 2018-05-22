import React, { Component } from 'react'
import Weather from './components/Weather'
import CurrentWeather from './components/CurrentWeather'
import Geosuggest from 'react-geosuggest'

import './stylesheets/normalize.css'
import './stylesheets/App.css'


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
      user_location_state: null,
      consolidated_weather: [],
      current_temp: null,
      current_weather_state_svg: null,
      isSearching: false,
      locationAllowed: true,
      celsius: true
    }
    this.fetchWeather = this.fetchWeather.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.fetchCurrentWeather = this.fetchCurrentWeather.bind(this)
    this.cToF = this.cToF.bind(this)
    this.switchUnit = this.switchUnit.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let user_lat = position.coords.latitude
      let user_lng = position.coords.longitude
      if(user_lat && user_lng) {
        this.setState({
          user_lat: user_lat,
          user_lng: user_lng
        })
        this.fetchCurrentWeather()
      } else {
        this.setState({
          locationAllowed: false
        })
      }
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
              user_location_state: data.parent.title,
              current_temp: data.consolidated_weather[0].the_temp,
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
          woeid: data[0].woeid,
          isSearching: true
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
              consolidated_weather: data.consolidated_weather,
              isSearching: false
            })
          })
      })
  }

  //switch
  cToF(celcius) {
    return 1.8 * celcius + 32
  }

  //Onclick to switch
  switchUnit() {
    this.setState({
      celsius: !this.state.celsius
    })
  }

  render() {
    let current_location_weather = <div className="current_weather_container retrieving_location">Retrieving your location...</div>

    if(this.state.current_temp && this.state.current_weather_state_svg && this.state.locationAllowed) {
      current_location_weather =
      <CurrentWeather
        user_location={this.state.user_location}
        user_location_state={this.state.user_location_state}
        current_temp={this.state.current_temp}
        current_weather_state_svg={this.state.current_weather_state_svg}
        locationAllowed={this.state.locationAllowed}
        celsius={this.state.celsius}
        cToF={this.cToF}
      />
    }

     let search_results = this.state.search_location ? <Weather
      consolidated_weather={this.state.consolidated_weather}
      search_location={this.state.search_location}
      search_country={this.state.search_country}
      celsius={this.state.celsius}
      cToF={this.cToF}
    /> : null

    let search_loader = this.state.isSearching ? <div className="lds-dual-ring"></div> : null

    return (
      <div className="App">

        <form onSubmit={this.fetchWeather} className="search_form">
          <Geosuggest
            ref={el=>this._geoSuggest=el}
            placeholder="Enter city"
            types={['(cities)']}
            onSuggestSelect={this.onSuggestSelect}
          />
          <button className="search_icon">GO</button>
        </form>
        {current_location_weather}
        <div className="unit_switch"><button onClick={this.switchUnit}>{this.state.celsius ? '℉' : '℃'}</button></div>
        {search_loader}
        {search_results}
      </div>
    );
  }
}

export default App;
