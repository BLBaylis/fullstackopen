const baseUrl = "http://localhost:3001/api/persons"

const getAllPersons = () => {
    return fetch(baseUrl)
      .then(res => res.json())
}

const addNewPerson = personObj => {
    return fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(personObj),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
}

const updatePerson = updatedPerson => {
    return fetch(`${baseUrl}/${updatedPerson.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPerson),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
          if (res.status >= 200 && res.status < 300) {
            return res.json()
          } 
          const error = new Error(res.statusText);
          error.status = res.status;
          throw error;
        })
}

const deletePerson = id => {
    return fetch(`${baseUrl}/${id}`, {method: "DELETE"}).catch(err => err)
}

export default { getAllPersons, addNewPerson, deletePerson, updatePerson }