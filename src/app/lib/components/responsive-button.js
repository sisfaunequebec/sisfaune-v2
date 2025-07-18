/* eslint-disable react/jsx-curly-brace-presence */
'use client'

import { IconButton } from '@chakra-ui/react'
import { Button } from '@/app/lib/components/ui/button'

const ResponsiveButton = ({ label, size = 'md', variant = 'solid', colorPalette, icon, onClick, ...rest }) => {
  const sizes = size === 'md' ? ['md', null, 'sm'] : ['sm', null, 'xs']
  return (
    <>
      <Button {...rest} size={sizes} rounded={['full', null, 'md']} variant={variant} colorPalette={colorPalette} display={['none', null, 'inherit']} onClick={onClick}>{icon}{label}</Button>
      <IconButton {...rest} size={sizes} rounded={['full', null, 'md']} variant={variant} colorPalette={colorPalette} aria-label={label} display={['inherit', null, 'none']} onClick={onClick}>{icon}</IconButton>
    </>
  )
}

export default ResponsiveButton
