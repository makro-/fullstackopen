import React from 'react'

const Filter = ({ handler }) => {
    return (
        <div>
        Rajaa näytettäviä: <input
          
          onChange={handler}
        />
      </div>
       )
}

export default Filter