import React from 'react';

const Numbers = ({persons, filter, deletePerson}) => (
    <>{persons
            .filter(person => person.name.toLowerCase().startsWith(filter) )
            .map(person => <Person deletePerson = {deletePerson(person.id, person.name)} key = {person.name} person = {person}/>)
    }</>
)

const Person = ({ person, deletePerson }) => {
    const { name, number } = person;
    return <div><span>{name}: {number}</span><button onClick = {deletePerson}>Delete</button></div>
}

export default Numbers