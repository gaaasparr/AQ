import React from 'react'
import { Link } from 'react-router-dom';

import useUser from './useUser'
import s from './Header.module.css'

export default function Header () {
  //const isLogged = false
  const {isLogged} = useUser()
  return(
    <header classname={s.gf_header}>
        {isLogged
            ?   <Link to='/logout'>
                    Logout
                </Link>
            :   <Link to='/login'>
                    Login
                </Link>
        }
    </header>
  )

  //const [match] = useRoute("/login");

  //const handleClick = e => {
    //e.preventDefault()
    //logout()
  //}

  /*const renderLoginButtons = ({isLogged}) => {
    return isLogged
     
        </>
  }

  const content = match
    ? null
    : renderLoginButtons({isLogged})
*/
}