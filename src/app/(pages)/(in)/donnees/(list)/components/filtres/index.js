'use client'
import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import { Flex, Fieldset, Separator as ChakraSeparator } from '@chakra-ui/react'

import Ordre from './ordre'
import Texte from './texte'
import Statut from './statut'
import Programme from './programme'
import Region from './region'

const SectionTitle = ({ label }) => {
  return <Fieldset.Legend color='blue.800'>{label}</Fieldset.Legend>
}

const Section = ({ children }) => {
  return <Fieldset.Content gap={2}>{children}</Fieldset.Content>
}

const Separator = () => {
  return <ChakraSeparator borderColor='blue.600' />
}

const FiltresForm = () => {
  // const [statut, setStatut] = useQueryState('statut', parseAsArrayOf(parseAsInteger).withDefault([]))

  return (
    <Fieldset.Root alignItems='flex-start' flex>

      <SectionTitle label='Ordonner la liste par :' />
      <Section><Ordre /></Section>

      <Separator />

      <SectionTitle label='Rechercher dans le texte :' />
      <Section><Texte onChange={v => console.debug(v)} /></Section>

      <Separator />

      <SectionTitle label='Raffiner par statut :' />
      <Section><Statut /> </Section>

      <Separator />

      <SectionTitle label='Raffiner par programme :' />
      <Section><Programme onChange={v => console.debug(v)} /> </Section>

      <Separator />

      <SectionTitle label='Raffiner par région administrative :' />
      <Section><Region onChange={v => console.debug(v)} /> </Section>

      <Separator />

      <SectionTitle label='Raffiner par groupe de spécimens :' />
      <Section />

      <Separator />

      <SectionTitle label='Raffiner par date :' />
      <Section />

    </Fieldset.Root>
  )
}

const FiltresContainer = ({ children }) => {
  return (
    <Flex flex={2} p={4} px={6} alignItems='stretch' bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor='blue.300' borderTopWidth={1} hideBelow='md'>
      <Flex top={145} flex={1} alignSelf='flex-start' direction='column' alignItems='stretch' zIndex={1000} w='full'>
        {children}
      </Flex>
    </Flex>
  )
}

const Filtres = () => {
  return (
    <FiltresContainer>
      <FiltresForm />
    </FiltresContainer>
  )
}

export default Filtres
