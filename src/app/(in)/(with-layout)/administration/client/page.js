'use client'
import { useState, useEffect } from 'react'
import { useAction } from 'next-safe-action/hooks'

import { createSafeActionClient } from 'next-safe-action'
import { getPermissions } from './test'

import Combo from './combo'
import { AbsoluteCenter, Container } from '@chakra-ui/react'

const actionClient = createSafeActionClient()

const testAction = actionClient
  // .schema(schema)
  .action(async () => {
    const permissions = await getPermissions()
    return permissions

    // return { failure: "Incorrect credentials" };
  })

const Client = () => {

  const [permissions, setPermissions] = useState(null)
  const { execute, result, status, isPending } = useAction(testAction)
  
  useEffect(() => {
    const execute = async() => {
      const permissions = await getPermissions()
      setPermissions(permissions)
    }
    execute()
  }, [execute])

  useEffect(() => {
    execute()
  }, [execute])

  console.debug(result, status)
  console.debug(permissions)

  // return (
  //   <>
  //   { isPending ? <p>Un instant...</p> : <p>{JSON.stringify(result)}</p> }
  //   </>
  // )
  
  return (
    <AbsoluteCenter as={Container} maxW={'md'}>

        <Combo />

  </AbsoluteCenter>
  )
}

export default Client
