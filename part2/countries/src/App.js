import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('');

  const fetchCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;languages;population;flag')
      .then(res => res.json())
      .then(setCountries)
  }

  useEffect(fetchCountries, []);

  const changeHandler = ({ target }) => setFilter(target.value);

  return (
    <div>
      <div>find countries: <input onChange = {changeHandler}></input></div>
      <Countries countries = {countries} filter = {filter}/>
    </div>
  )
}

export default App