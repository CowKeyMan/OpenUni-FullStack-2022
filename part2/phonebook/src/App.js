import { useState } from 'react'

const Filter = ({value, onChange}) =>
  <div>
    filter shown with
    <input
      value={value}
      onChange={onChange}
    />
  </div>

const PersonForm =  ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) =>
      <form onSubmit={onSubmit}>
        <div>
          name:
            <input
              value={nameValue}
              onChange={nameOnChange}
            />
        </div>
        <div>
          number:
          <input
          value={numberValue}
          onChange={numberOnChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

const Persons = ({persons, nameFilter}) => {
  let personsToShow = persons
  if (nameFilter !== '') {
    personsToShow = persons.filter(
      person => person.name.toLowerCase().includes(nameFilter)
    )
  }
  return <table>
    {
      personsToShow.map(person =>
      <Person key={person.name} person={person} />
    )}
  </table>
}

const Person = ({person}) =>
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilterChange = (event) => setNameFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (
      persons.map(person => person.name).find((name) => name === newName)
      === undefined
    ) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleNameFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNewNameChange}
        numberValue={newNumber}
        numberOnChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter}/>
      </div>
  )
}

export default App
