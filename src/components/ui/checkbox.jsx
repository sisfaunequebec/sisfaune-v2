import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Checkbox = forwardRef(function Checkbox(props, ref) {
  const { icon, children, inputProps, rootRef, ...rest } = props
  return (
    <ChakraCheckbox.Root ref={rootRef} {...rest}>
      <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckbox.Control>
        {icon || <ChakraCheckbox.Indicator />}
      </ChakraCheckbox.Control>
      {children != null && (
        <ChakraCheckbox.Label fontWeight={400} lineHeight={1.2}>{children}</ChakraCheckbox.Label>
      )}
    </ChakraCheckbox.Root>
  )
})
