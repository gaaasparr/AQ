import React from 'react'

function Searchbar({onSearch}) {
  return (
    <>
        <input onChange={onSearch} type="text" placeholder="Search" /> 
    </>
  )
}

export default Searchbar