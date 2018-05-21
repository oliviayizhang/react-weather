// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// // import { fetchCurrentWeather } from './App'
// import CurrentWeather from './components/CurrentWeather'
// import Enzyme, { shallow, configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
//
// Enzyme.configure({ adapter: new Adapter() })
//
// describe('fetchCurrentWeather', () => {
//   let mocklatt
//   let mocklong
//   let mockUserWoeid
//   let user_location
//   let mockUserLocation
//   let renderedComponent
//   let mockCurrentTemp
//   let mockCurrentWeatherState
//
//   beforeEach(() => {
//     mocklatt = 42.4366990
//     mocklong = -71.0752420
//     mockUserWoeid = 2444445
//     mockUserLocation = 'Boston'
//     mockCurrentTemp = '20'
//     mockCurrentWeatherState = 'Mostly Cloudy'
//
//
//     window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
//       json: () => Promise.resolve({
//         user_woeid: mockUserWoeid,
//         user_location: mockUserLocation
//       })
//     }))
//      renderedComponent = shallow(<CurrentWeather
//                                         user_location={mockUserLocation}
//                                         current_temp={mockCurrentTemp}
//                                         current_weather_state={mockCurrentWeatherState}
//     />)
//   })
//
//   it('fetch is called when the page loads', () => {
//     const expectedFetchBody = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     // renderedComponent.setState({user_location: mockUserLocation })
//     expect(window.fetch).toHaveBeenCalledWith(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${mockUserWoeid}`, expectedFetchBody)
//   })
//
//   it('set the user_woeid state after the fetch call is made'), () => {
//
//   }
//
//   it('fetch is called again', () => {
//
//   })
//
//   it('set the state for user_location', () => {
//
//   })
//
// })
