import { Field as ChakraField, Flex } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Field = forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, variant = 'horizontal', ...rest } = props

  const flexDirection = variant === 'horizontal' ? 'row' : 'column'
  const alignItems = variant === 'horizontal' ? 'center' : 'flex-start'
  const labelFlexValue =  variant === 'horizontal' ? [1, null, 2] : 1
  const childrenFlexValue =  variant === 'horizontal' ? 2 : 1

  return (
    <ChakraField.Root ref={ref} flexDirection={flexDirection} alignItems={alignItems} {...rest}>
      {label && (
        <ChakraField.Label color={'gray.600'} fontWeight={400} flex={labelFlexValue} justifyContent={'flex-start'} pe={2}>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      <Flex flex={childrenFlexValue} w={'full'}>
        {children}
      </Flex>
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  )
})
