import { AbsoluteCenter, Spinner } from '@chakra-ui/react'

const PageSpinner = () => {
  return (
    <AbsoluteCenter><Spinner size={['xl', null, 'lg']} color={'blue.700'} borderWidth={'medium'} /></AbsoluteCenter>
  )
}

export default PageSpinner