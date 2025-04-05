import { Field as ChakraField } from '@/components/ui/field'

const Field = ({ formState, children, name, ...rest }) => {
  const { errors, isSubmitting } = formState

  const onlyFirstError = Object.entries(errors).slice(0, 1).reduce((acc, e) => {
    const [key, value] = e
    acc[key] = value
    return acc
  }, {})

  // console.debug(onlyFirstError)
  const error = onlyFirstError[name]
  // console.debug(errors, name)
  // const error = errors[name]

  return (
    <ChakraField variant={'vertical'} invalid={!!error} errorText={error?.message} disabled={isSubmitting} {...rest}>
      {children}
    </ChakraField>
  )
}

export default Field
