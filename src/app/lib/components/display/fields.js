import { VStack, Fieldset, Separator } from '@chakra-ui/react'
import { Field } from '../ui/field'

import TextDisplay from '@/app/lib/components/display/base/text'

const Fields = ({ schema, data }) => {
  return (
    <VStack gap={2} flex={1}>
      {schema.map(section => {
        const { title, fields } = section
        return (
          <Fieldset.Root key={title} gap={2} mt={4} _first={{ mt: 0 }}>
            {title && <Fieldset.Legend>{title}</Fieldset.Legend> }
            <Fieldset.Content gap={2}>
              {fields.map(f => {
                const { label, name, visible = true, component, props = {} } = f
                const isVisible = (typeof visible === 'function') ? visible(data) : visible
                const Component = component || TextDisplay
                const value = data[name] 
                // console.debug(name, Component.displayName)
                if (!isVisible) { return null }
                return (
                  <Field key={name} label={label} name={name} variant={'horizontal'}>
                    <Component value={value} {...props} />
                  </Field>
                )
              })}
            </Fieldset.Content>
            <Separator />
          </Fieldset.Root>
        )
      })}
    </VStack>
  )
}

export default Fields