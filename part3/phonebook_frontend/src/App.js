import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonService from "./services/PersonServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [addNotification, setAddNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = () => {
    console.log("effect");
    PersonService.getAll().then(response => {
      console.log("promise fulfilled");
      console.log("data :", response.data);
      setPersons(response.data);
    });
  };

  useEffect(fetchData, []);

  const handleDeleteButton = id => {
    console.log(id);
    const personArray = persons.filter(p => p.id === id);
    console.log(personArray);
    if (personArray.length === 1) {
      console.log("hello", personArray[0]);
      let confirmMessage = window.confirm(`Delete ${personArray[0].name} ?`);
      console.log("confirm message", confirmMessage);
      if (confirmMessage === true) {
        PersonService.deleted(id).then(response => {
          console.log("delete person", response.data);
          fetchData();
        });
      }
    }
  };

  const rows = () =>
    filteredPersons.map(person => (
      <Person
        key={person.id}
        personId={person.id}
        name={person.name}
        number={person.number}
        handleDelete={handleDeleteButton}
      />
    ));

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    console.log(event.target.value);
    setFilterText(event.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toUpperCase().includes(filterText.toUpperCase())
  );

  const addPerson = event => {
    event.preventDefault();
    const existingPerson = persons.filter(person => person.name === newName);
    if (existingPerson.length > 0) {
      let confirmMessage = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      console.log("confirm message", confirmMessage);
      if (confirmMessage === true) {
        const personObject = {
          name: newName,
          number: newNumber
        };

        PersonService.update(existingPerson[0].id, personObject)
          .then(response => {
            console.log("response data: ", response.data);
            setNewName("");
            setNewNumber("");
            setAddNotification(`Updated the number for ${newName}`);
            setTimeout(() => {
              setAddNotification(null);
            }, 5000);
            fetchData();
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${newName}' has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            fetchData();
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };

      PersonService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setAddNotification(`Added ${newName}`);
          setTimeout(() => {
            setAddNotification(null);
          }, 5000);
        })
        .catch(error => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          fetchData();
        });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="addMessage">{message}</div>;
  };

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addNotification} />
      <ErrorMessage message={errorMessage} />

      <Filter filterText={filterText} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showPersons={rows} />
    </div>
  );
};

export default App;
