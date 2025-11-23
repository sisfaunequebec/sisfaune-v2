import orm from '@/lib/data/database'

import { Flex, Fieldset, Separator as ChakraSeparator, Text, Icon, HStack } from '@chakra-ui/react'

import { Tooltip } from '@/app/lib/components/ui/tooltip'
// import { ToggleTip } from '@/components/ui/toggle-tip'
import { LuInfo } from 'react-icons/lu'

import SidebarContainer from '@/app/(in)/(with-layout)/lib/components/sidebar-container'

import Order from './order'
import FullText from './full-text'
import Secteur from './secteur'

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
  const secteurs = await orm.LutAnalysisSector.findMany()

  return (
    <SidebarContainer>
      <Fieldset.Root flex alignItems='flex-start'>

        <SectionTitle label='Ordonner la liste par :' />
        <Section><Order /></Section>

        <Separator />

        <SectionTitle label={<HStack><Text>Rechercher dans le texte :</Text><Tooltip size='xl' content={'Rechercher par nom de l\'analyse ou du groupe d\'analyses'}><Icon fontSize='xl' cursor='pointer'><LuInfo /></Icon></Tooltip></HStack>} />
        <Section><FullText /></Section>

        <Separator />

        <SectionTitle label={'Filtrer par secteur d\'analyse :'} />
        <Section><Secteur secteurs={secteurs} /></Section>

      </Fieldset.Root>
    </SidebarContainer>
  )
}

export default Filters
