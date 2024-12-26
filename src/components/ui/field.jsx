import { Field as ChakraField, Flex } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Field = forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, ...rest } =
    props
  return (
    <ChakraField.Root ref={ref} {...rest} flexDirection={'row'} alignItems={'center'}>
      {label && (
        <ChakraField.Label color={'gray.600'} fontWeight={400} flex={3} justifyContent={'flex-start'} pe={2}>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      <Flex flex={4} >
        {children}
      </Flex>
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  )
})
