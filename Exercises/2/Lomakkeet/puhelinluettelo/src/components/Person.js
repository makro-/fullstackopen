import React from 'react'

const Person = ({ person, clickHandler }) => {
    return (
        <div>
         {person.name} {person.number} <button data-message={person.id} onClick={clickHandler}>poista</button> {}
        </div>
       )
}

export default Person