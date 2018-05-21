import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CurrentWeather from './components/CurrentWeather'

Enzyme.configure({ adapter: new Adapter() })

describe('CurrentWeather', () => {
  let image,
      text,
      wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CurrentWeather
        image="http://fakeurl.com/weather"
        text="Your local weather condition."
      />
    )
  })

  it('should render an image tag', () => {
    expect(wrapper.contains(  <img src={image} alt="weather condition" className="user_weather_svg"/>)).to.equal(true);
  })



})
