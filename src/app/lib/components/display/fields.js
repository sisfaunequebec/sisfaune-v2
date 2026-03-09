'use client'
import { useCallback, useState, useEffect, useRef } from 'react'

import { VStack, Fieldset, Separator } from '@chakra-ui/react'
import { Field } from '../ui/field'

import TextDisplay from '@/app/lib/components/display/base/text'

import useCurrentUser from '@/lib/auth/use-user-v2'

const isSectionVisibleFilter = (data, watched) => (section) => {
  const { visible } = section
  const isVisible = visible !== undefined ? (typeof visible === 'function') ? visible(data, watched) : visible : true
  return isVisible
}

const Fields = ({ schema, data, watched, ...rest }) => {
  const { user: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser() 
  if (isLoadingCurrentUser) { return null }

  const visibleSections = schema.filter(isSectionVisibleFilter(data, watched))
  const sectionsCount = visibleSections.length

  return (
    <VStack gap={2} flex={1} {...rest}>
      {visibleSections.map((section, i) => {
        const { title, visible, fields } = section
        return (
          <Fieldset.Root key={title ?? i} gap={2} mt={3} _first={{ mt: 0 }}>
            {title && <Fieldset.Legend>{title}</Fieldset.Legend> }
            <Fieldset.Content gap={2}>
              {fields.map(f => {
                const { label, name, visible = true, component, props = {} } = f
                const isVisible = (typeof visible === 'function') ? visible(data, watched, { user: currentUser }) : visible
                const Component = component || TextDisplay
                const value = data[name] 
                if (!isVisible) { return null }
                return (
                  <Field key={name} label={label} name={name} variant={'horizontal'}>
                    <Component value={value} data={data} {...props} />
                  </Field>
                )
              })}
            </Fieldset.Content>
            { (sectionsCount > i + 1) && <Separator /> }
          </Fieldset.Root>
        )
      })}
    </VStack>
  )
}

export default Fields