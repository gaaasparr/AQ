import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'
import { useEffect } from "react";
import useUser from './useUser';

import {login, isLogged} from './useUser'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useLocation()
  const {login, isLogged} = useUser()



  useEffect(() => {
    if (isLogged) navigate('/')
  }, [isLogged, navigate])
 
  const handleSubmit = (e) =>
   {e.preventDefault();
    //alert(`(${username}),(${password})`)\
    login ()

    

    };

     return (
          <form onSubmit={handleSubmit}>
              <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
             <button>Login</button>
      
           

          </form>
     );
}