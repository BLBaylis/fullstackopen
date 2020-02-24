import React from 'react';
import Country from './Country'
import CountryListEntry from './CountryListEntry'

const Countries = ({countries, filter}) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    const length = filteredCountries.length;

    if (length > 10) {
        return <div>Too many matches, more detail needed!</div>
    } else if (length >= 2) {
        return filteredCountries.map(country => <CountryListEntry key = {country.name + "-entry"} country = {country}/>)
    } else if (length < 1) {
        return <div>No matches found</div>
    } else {
        return <Country country = {filteredCountries[0]}/>
    }

}

export default Countries