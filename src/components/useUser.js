import {useCallback, useContext, useState} from 'react'
import Context from './UserContext'

export default function useUser () {
  const {jwt, setJWT} = useContext(Context)

  const login = useCallback(() => {
    setJWT('test')
  }, [setJWT])

  return {
    isLogged: Boolean(jwt),
    login
  }
} 