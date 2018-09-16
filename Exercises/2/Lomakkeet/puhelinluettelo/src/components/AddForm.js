import React from 'react'

const AddForm = ({ lisaaNimi, newName, handleNameChange, newNumber, handleNumberChange }) => {

  return (
  <form onSubmit={lisaaNimi}>
  <div>
    nimi: <input
      value={newName}
      onChange={handleNameChange}
    />
  </div>
  <div>
    numero: <input
      value={newNumber}
      onChange={handleNumberChange}
    />
  </div>
  <div>
    <button type="submit" >lisää</button>
  </div>
</form>
  )
}

export default AddForm