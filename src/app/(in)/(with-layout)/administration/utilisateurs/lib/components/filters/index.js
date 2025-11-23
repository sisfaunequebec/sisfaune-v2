import orm from '@/lib/data/database'

import { Flex, Fieldset, Separator as ChakraSeparator, Text, Icon, HStack } from '@chakra-ui/react'

import SidebarContainer from '@/app/(in)/(with-layout)/lib/components/sidebar-container'

import { Tooltip } from '@/app/lib/components/ui/tooltip'
// import { ToggleTip } from '@/components/ui/toggle-tip'
import { LuInfo } from 'react-icons/lu'

import Order from './order'
import FullText from './full-text'
import Status from './status'

const SectionTitle = ({ label }) => {
  return <Fieldset.Legend color='blue.800'>{label}</Fieldset.Legend>
}

const Section = ({ children }) => {
  return <Fieldset.Content gap={2} _last={{ pb: 4 }}>{children}</Fieldset.Content>
}

const Separator = () => {
  return <ChakraSeparator borderColor='blue.600' w='full' />
}

const Filters = async () => {
  const statuts = [
    { value: 1, label: 'Actif' },
    { value: 0, label: 'Inactif' }
  ]

  return (
    <SidebarContainer>
      <Fieldset.Root flex alignItems='flex-start'>

        <SectionTitle label='Ordonner la liste par :' />
        <Section><Order /></Section>

        <Separator />

        <SectionTitle label={<HStack><Text>Rechercher dans le texte :</Text><Tooltip size='xl' content={'Rechercher par nom d\'utilisateur, nom, organisme'}><Icon fontSize='xl' cursor='pointer'><LuInfo /></Icon></Tooltip></HStack>} />
        <Section><FullText /></Section>

        <Separator />

        <SectionTitle label='Filtrer par statut :' />
        <Section><Status statuts={statuts} /></Section>

      </Fieldset.Root>
    </SidebarContainer>
  )
}



export default Filters
