import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'

const CheckboxInput = ({ label, value, onChange, ...rest }) => {
  const handleSubmit = useCallback(() => {
    onChange(!value)
  }, [onChange, value])
  return (
    <ChakraCheckbox.Root
        checked={value}
        onCheckedChange={(e) => handleSubmit(value)}
        justifyContent={'center'}
        variant={'subtle'}
        {...rest}
    >
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      { label && <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label> }
    </ChakraCheckbox.Root>
  )
}

export default CheckboxInput