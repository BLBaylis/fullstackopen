import React from 'react';

const Filter = ({onChange}) => (
    <div>Filter: <input onChange = {onChange("filterInput")}></input></div>
)

export default Filter