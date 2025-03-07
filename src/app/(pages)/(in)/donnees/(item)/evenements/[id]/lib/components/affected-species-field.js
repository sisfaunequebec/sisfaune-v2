import { Flex, Stack, VStack, Text, Separator, Input } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'

import {
  NumberInputField,
  // NumberInputLabel,
  NumberInputRoot,
} from '@/components/ui/number-input'

import { Tooltip } from '@/components/ui/tooltip'

const NumberInput = ({ value, label, isEditing }) => {
  return (
    <Flex flex={1} alignItems={'center'}>
      <Text flex={1} display={['inherit', null, 'none']}>{label}</Text>
      <NumberInputRoot flex={2} min={0} variant={'filled'} size={['lg', null, 'md']} value={value ?? ''} readOnly={!isEditing}  >
        <NumberInputField bg={'bg.muted'} flex={4} />
      </NumberInputRoot>
    </Flex>
  )
}

const AffectedSpeciesField = ({ label, value, isEditing = false }) => {
  return (
    <Field label={label}>
      <VStack flex={1} alignSelf={'stretch'} alignItems={'stretch'} p={3} borderColor={'border'} borderWidth={2} borderRadius={'md'} gap={2}>
      <Stack direction={['column', null, 'row']} flex={1} alignItems={'center'} justifyContent={'space-between'} display={['none', null, 'inherit']} gap={2} color={'fg.muted'} fontWeight={500}>
          <Flex flex={5}>Espèce(s)</Flex>
          <Tooltip content={'Apparemment sains'}><Flex flex={1} justifyContent={'center'} cursor={'help'} textDecoration={'underline'}>Sains</Flex></Tooltip>
          <Flex flex={1} justifyContent={'center'}>Malades</Flex>
          <Flex flex={1} justifyContent={'center'}>Morts</Flex>
          <Tooltip content={'Non spécidié'}><Flex flex={1} justifyContent={'center'}  cursor={'help'} textDecoration={'underline'}>N/S</Flex></Tooltip>
        </Stack>
        <Stack direction={['column', null, 'row']} flex={1} alignItems={['stretch', null, 'center']} justifyContent={'space-between'} gap={2}>
          <Flex flex={[1, null, 5]} mb={[2, null, 0]}><Text color={'fg.muted'} fontWeight={['medium', null, 'inherit']}>Raton laveur (Procyon lotor)</Text></Flex>
          <NumberInput label={'Sains'} value={1} isEditing={isEditing} />
          <NumberInput label={'Malades'} value={null} isEditing={isEditing} />
          <NumberInput label={'Morts'} value={2} isEditing={isEditing} />
          <NumberInput label={'N/S'} value={null} isEditing={isEditing} />
        </Stack>
        <Separator />
        <Stack direction={['column', null, 'row']} flex={1} alignItems={['stretch', null, 'center']} justifyContent={'space-between'} gap={2}>
          <Flex flex={5}><Text color={'fg.muted'}>Raton laveur (Procyon lotor)</Text></Flex>
          <NumberInput value={null} isEditing={isEditing} />
          <NumberInput value={null} isEditing={isEditing} />
          <NumberInput value={1} isEditing={isEditing} />
          <NumberInput value={null} isEditing={isEditing} />
        </Stack>
      </VStack>
    </Field>
  )
}

export default AffectedSpeciesField
