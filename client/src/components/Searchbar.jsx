import React from 'react'

function Searchbar(props) {
  return (
    <>
        <input onChange={props.onSearch} type="text" placeholder="Search" /> 
    </>
  )
}

export default Searchbar