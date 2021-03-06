import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from './../../services/transformWeather';
//import {CLOUD, CLOUDY, SUN, RAIN, SNOW, WINDY} from './../../constant/weathers';
import './styles.css';

// Creando const para llamar API:
const api_key = '5c16a3406042c61c6e2017dbe1ed62f1';
const units = 'metric';
const url = 'http://api.openweathermap.org/data/2.5/weather';

// COMPONENTE DE CLASE
class WeatherLocation extends Component { // extends es para informar a React que estoy creando un componente de clase, para poder crear componentes reutilizables
  constructor({ city }) {
    super();
    this.state = {
      city,
      data: null
    }
    console.log('constructor');
  }

  componentWillMount() {
    const { city } = this.state;
    const api_weather = `${url}?q=${city}&appid=${api_key}&units=${units}`;
    fetch(api_weather).then(data => {
      return data.json(); //estamos pidiendo datos de tipo JSON de data
    }).then(weather_data => {
      const data = transformWeather(weather_data);
      this.setState({ data });
    });
  }

  render = () => {
    const { onWeatherLocationClick } = this.props;
    const { city, data } = this.state;
    return (
      <div align='center' className="weatherLocation" onClick={onWeatherLocationClick}>
        <Location className="location" city={city} />
        {data ? <WeatherData className="weatherDataCont" data={data} /> : <CircularProgress size={60} thickness={7} />}
      </div>
    );
  }
}

WeatherLocation.propTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;