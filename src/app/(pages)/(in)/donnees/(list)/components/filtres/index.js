'use client'
import { Flex, Fieldset, Separator as ChakraSeparator, Text, IconButton, HStack } from '@chakra-ui/react'

import { ToggleTip } from '@/components/ui/toggle-tip'
import { LuInfo } from 'react-icons/lu'

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
  return (
    <Fieldset.Root alignItems='flex-start' flex>

      <SectionTitle label='Ordonner la liste par :' />
      <Section><Ordre /></Section>

      <Separator />

      <SectionTitle label={<HStack><Text>Rechercher dans le texte :</Text><ToggleTip size={'xl'} content={'Recherche par numéro d\'événement, numéro MAPAQ, numéro SILAB, numéro de pathologie, nom du soumissionnaire et/ou municipalité'}><LuInfo /></ToggleTip></HStack>} />
      <Section><Texte /></Section>

      <Separator />

      <SectionTitle label='Raffiner par statut :' />
      <Section><Statut /></Section>

      <Separator />

      <SectionTitle label='Raffiner par programme :' />
      <Section><Programme /></Section>

      <Separator />

      <SectionTitle label='Raffiner par région administrative :' />
      <Section><Region /></Section>

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
