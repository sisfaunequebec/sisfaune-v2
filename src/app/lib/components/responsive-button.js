/* eslint-disable react/jsx-curly-brace-presence */

import { IconButton } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'

const ResponsiveButton = ({ label, variant = 'solid', colorPalette, icon, onClick, ...rest }) => {
  return (
    <>
      <Button {...rest} size={['md', null, 'sm']} rounded={['full', null, 'md']} variant={variant} colorPalette={colorPalette} display={['none', null, 'inherit']} onClick={onClick}>{icon}{label}</Button>
      <IconButton {...rest} size={['md', null, 'sm']} rounded={['full', null, 'md']} variant={variant} colorPalette={colorPalette} aria-label={label} display={['inherit', null, 'none']} onClick={onClick}>{icon}</IconButton>
    </>
  )
}

export default ResponsiveButton
