import { Field as ChakraField, Flex } from '@chakra-ui/react'
import { forwardRef } from 'react'

import { Tooltip } from './tooltip'

export const Field = forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, descriptionText, variant = 'horizontal', cursor, ...rest } = props

  const flexDirection = variant === 'horizontal' ? 'row' : 'column'
  const alignItems = variant === 'horizontal' ? 'center' : 'flex-start'
  const labelFlexValue =  variant === 'horizontal' ? [1, null, 1] : 1
  const childrenFlexValue =  variant === 'horizontal' ? 2 : 1

  return (
    <ChakraField.Root ref={ref} {...rest} justifyContent={'stretch'}>
      <Flex direction={flexDirection} alignItems={alignItems} w={'full'}>
        {label && (
          <Tooltip content={descriptionText} disabled={!descriptionText}>
            <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={labelFlexValue} justifyContent={'flex-start'} pe={2} pt={2} mb={2} textDecoration={descriptionText && 'underline'} cursor={descriptionText && 'help'}>
              {label}
              <ChakraField.RequiredIndicator fallback={optionalText} />
            </ChakraField.Label>
          </Tooltip>
        )}
        <Flex flex={childrenFlexValue} w={'full'} direction={'column'}>
          <Flex mb={1}>{children}</Flex>
          {helperText && (
            <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
          )}
          {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}      
        </Flex>
      </Flex>
    </ChakraField.Root>
  )
})
