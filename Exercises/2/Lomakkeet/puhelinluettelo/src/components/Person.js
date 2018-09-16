import React from 'react'

const Person = ({ person }) => {
    return (
        <div>
         {person.name} {person.numero}
        </div>
       )
}

export default Person