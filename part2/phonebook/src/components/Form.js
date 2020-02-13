import React from 'react';

const Form = ({onSubmit, onChange}) => (
    <form onSubmit={onSubmit}>
        <div>name: <input onChange={onChange("newName")}/></div>
        <div>number: <input onChange={onChange("newNumber")}/></div>
        <div><button type="submit">add</button></div>
    </form>
)

export default Form