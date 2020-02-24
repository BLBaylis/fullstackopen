import React, { useState } from 'react';
import Country from './Country'

const CountryListEntry = ({country}) => {
    const [ open , setOpen ] = useState(false);

    if (open) {
        return <Country country = {country}/>
    }

    return (
        <div>
            <span>{country.name}</span>
            <button onClick = {() => setOpen(true)}>Show</button>
        </div>
    )
}

export default CountryListEntry