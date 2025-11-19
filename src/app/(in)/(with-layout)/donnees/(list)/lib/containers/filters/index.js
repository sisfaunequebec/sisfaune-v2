import orm from '@/lib/data/database'

import getUser from '@/lib/auth/get-user'

import { getViewableProgramsForUser } from '@/lib/data/lookups/event-programs'

import { Flex, Fieldset, Separator as ChakraSeparator, Text, Icon, HStack } from '@chakra-ui/react'

import { Tooltip } from '@/app/lib/components/ui/tooltip'
// import { ToggleTip } from '@/components/ui/toggle-tip'
import { LuInfo } from 'react-icons/lu'

import Order from './order'
import FullText from './full-text'
import Status from './status'
import Program from './program'
import Region from './region'
import Date from './date'
import Group from './group'

const FiltersContainer = ({ children }) => {
  return (
    <Flex position='sticky' flex={2} h='calc(100vh - 130px)' overflowY='auto' top={130} p={3} px={6} alignItems='stretch' bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor='blue.300' borderTopWidth={1} borderBottomWidth={1} hideBelow='md'>
      {children}
    </Flex>
  )
}

const SectionTitle = ({ label }) => {
  return <Fieldset.Legend color='blue.800'>{label}</Fieldset.Legend>
}

const Section = ({ children }) => {
  return <Fieldset.Content gap={2} _last={{ pb: 4 }}>{children}</Fieldset.Content>
}

const Separator = () => {
  return <ChakraSeparator borderColor='blue.600' w='full' />
}

const FiltersForm = async () => {
  const user = await getUser()

  const programs = await getViewableProgramsForUser(user)
  const statuts = await orm.LutEventStatus.findMany()
  const regions = await orm.LutLocality.groupBy({
    by: ['regionId', 'regionName'],
    orderBy: {
      regionName: 'asc'
    }
  })

  const groups = await orm.LutAnimalGroupV2.findMany()

  return (
    <Fieldset.Root flex alignItems='flex-start'>

      <SectionTitle label='Ordonner la liste par :' />
      <Section><Order /></Section>

      <Separator />

      <SectionTitle label={<HStack><Text>Rechercher dans le texte :</Text><Tooltip size='xl' content={'Rechercher par numéro d\'événement, numéro MAPAQ, numéro SILAB, numéro de pathologie, nom du soumissionnaire et/ou municipalité'}><Icon fontSize='xl' cursor='pointer'><LuInfo /></Icon></Tooltip></HStack>} />
      <Section><FullText /></Section>

      <Separator />

      <SectionTitle label='Filtrer par statut :' />
      <Section><Status statuts={statuts} /></Section>

      <Separator />

      <SectionTitle label='Filtrer par programme :' />
      <Section><Program programs={programs} /></Section>

      <Separator />

      <SectionTitle label='Filtrer par région administrative :' />
      <Section><Region regions={regions} /></Section>

      <Separator />

      <SectionTitle label='Filtrer par groupe de spécimens :' />
      <Section><Group groups={groups} /></Section>

      <Separator />

      <SectionTitle label='Filtrer par date :' />
      <Section><Date /></Section>

    </Fieldset.Root>
  )
}

const Filters = () => {
  return (
    <FiltersContainer>
      <FiltersForm />
    </FiltersContainer>
  )
}

export default Filters
