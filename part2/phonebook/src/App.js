import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterInput, setFilterInput ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  
  const inputSetter = {
    newName: setNewName,
    newNumber: setNewNumber,
    filterInput: setFilterInput
  }

  const getAllPersons = () => {
    personService.getAllPersons()
      .then(setPersons)
      .catch(err => alert(`couldn't get phonebook : ${err}`))
  }

  const changeHandler = inputType => ({ target }) => {inputSetter[inputType](target.value)}

  const updatePerson = existingUser => {
    personService.updatePerson({...existingUser, number: newNumber})
        .then(updatedPerson => {
          const updatedPersons = persons.map(existingPerson => existingPerson.id === updatedPerson.id ? updatedPerson : existingPerson);
          setPersons(updatedPersons)
          return updatedPerson
        })
        .then(updatedPerson => setNotificationMessage(`${updatedPerson.name}'s number has been updated`))
        .catch(err => {
          if (err.status === 404) {
            setNotificationMessage(`Information of ${existingUser.name} has already been removed from the server`)
          }
          
        })
  }

  const newPersonSubmissionHandler = e => {
    e.preventDefault();
    const nameToAdd = newName.toLowerCase();
    const existingUser = persons.find(person => person.name === nameToAdd);
    const userConfirmedUpdate = () => window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`);
    if (existingUser && userConfirmedUpdate()) {
      updatePerson(existingUser);
    } else  {
      personService.addNewPerson({name: nameToAdd, number: newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          return newPerson
        })
        .then(newPerson => setNotificationMessage(`${newPerson.name}'s number has been added`))
        .catch(err => setNotificationMessage("Unable to add new person"))
    }
  }

  const deletePerson = (id, name) => () => {
    if (!window.confirm(`Are you sure you want to delete ${name}`)) {
      return;
    }
    personService.deletePerson(id)
      .then(res => setPersons(persons.filter(person => person.id !== id)))
      .then(() => setNotificationMessage("Deleted"))
  }

  useEffect(getAllPersons, []);

  return (
    <div>
        <Notification message = {notificationMessage} />
        <h2>Phonebook</h2>
        <Filter onChange = {changeHandler}/>
        <h3>Add new: </h3>
        <Form onChange = {changeHandler} onSubmit={newPersonSubmissionHandler}/>
        <h3>Numbers</h3>
        <Numbers deletePerson = {deletePerson} persons = {persons} filter = {filterInput}/>
    </div>
  )
}

export default App