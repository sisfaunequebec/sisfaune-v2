'use client'

import { Button } from '@chakra-ui/react'

const Test = () => {
  return (
    <Button onClick={() => window.alert('click')}>Test</Button>
  )
}

export default Test
