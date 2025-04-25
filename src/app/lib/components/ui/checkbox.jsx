import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Checkbox = forwardRef(function Checkbox(props, ref) {
  const { icon, children, inputProps, rootRef, lineHeight, ...rest } = props
  return (
    <ChakraCheckbox.Root ref={rootRef} {...rest}>
      <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckbox.Control cursor={'pointer'}>
        {icon || <ChakraCheckbox.Indicator />}
      </ChakraCheckbox.Control>
      {children != null && (
        <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
      )}
    </ChakraCheckbox.Root>
  )
})
