import { Flex, Stack, VStack, Text, Separator, Input } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'

import {
  NumberInputField,
  // NumberInputLabel,
  NumberInputRoot,
} from '@/components/ui/number-input'

import { Tooltip } from '@/components/ui/tooltip'

const NumberInput = ({ name, value, label, isEditing }) => {
  return (
    <Flex flex={1} alignItems={'center'}>
      <Text flex={1} display={['inherit', null, 'none']}>{label}</Text>
      <NumberInputRoot flex={2} min={0} variant={'filled'} size={['lg', null, 'md']} name={name} value={value ?? 0} readOnly={!isEditing}  >
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
          <NumberInput name={'1_sain'} value={1} isEditing={isEditing} />
          <NumberInput name={'1_malade'} value={0} isEditing={isEditing} />
          <NumberInput name={'1_mort'} value={2} isEditing={isEditing} />
          <NumberInput name={'1_ns'} value={0} isEditing={isEditing} />
        </Stack>
        <Separator />
        <Stack direction={['column', null, 'row']} flex={1} alignItems={['stretch', null, 'center']} justifyContent={'space-between'} gap={2}>
          <Flex flex={5}><Text color={'fg.muted'}>Raton laveur (Procyon lotor)</Text></Flex>
          <NumberInput name={'2_sain'} value={0} isEditing={isEditing} />
          <NumberInput name={'2_malade'} value={0} isEditing={isEditing} />
          <NumberInput name={'2_mort'} value={1} isEditing={isEditing} />
          <NumberInput name={'2_ns'} value={0} isEditing={isEditing} />
        </Stack>
      </VStack>
    </Field>
  )
}

export default AffectedSpeciesField
