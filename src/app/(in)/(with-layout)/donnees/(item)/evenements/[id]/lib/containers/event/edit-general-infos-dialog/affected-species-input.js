import { Box, Flex, AbsoluteCenter, VStack, HStack, Separator, Fieldset, Field as ChakraField } from '@chakra-ui/react'

// import UnimplementedDisplay from '@/app/lib/components/display/base/unimplemented'
import NumberInput from '@/app/lib/components/inputs/base/number'
import { SpeciesCombo } from '../../add-specimen-dialog'
import { useCallback } from 'react'

const Cell = ({ bg, text, ...rest }) => {
  return (
    <Flex flex={1} bg={bg} borderRadius={'md'} px={3} py={3} lineHeight={'1.1rem'} {...rest}>
      { !!text ? text : '\u00A0' }
    </Flex>
  )
}

const TitleCell = (props) => {
  return (
    <Cell fontWeight={'medium'} py={0} fontSize={'0.8rem'} justifyContent={'center'} {...props} />
  )
}

const AffectedSpeciesInput = ({ value: affectedSpecies = [], onChange, data }) => {
  const handleSpecieChange = (index, newSpecie) => {
    handleValueChange(index, 'specieId', newSpecie?.id ?? null)
  }

  const handleValueChange = useCallback((index, field, newValue) => {
    const updatedSpecies = affectedSpecies.map(specie => {
      if (specie.index === index) {
        return {
          ...specie,
          [field]: newValue
        }
      }
      return specie
    })
    onChange(updatedSpecies)
  } , [affectedSpecies, onChange])

  // console.debug('AffectedSpeciesInput', affectedSpecies)

  return (
    <VStack spacing={1} flex={1}>
      <Flex direction={'row'} alignItems={'flex-start'} w={'full'}>
        <Flex direction={'row'} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} ></Flex>
          <HStack flex={2} w={'full'} direction={'column'}>
            <TitleCell text={'Vivants'} />
            <TitleCell text={'Malades'} />
            <TitleCell text={'Morts'} />
            <TitleCell text={'N/A'} />
          </HStack>
        </Flex>
        { affectedSpecies.map(specie => {
          // console.debug('AffectedSpeciesInput specie', specie)
          const { index, specieId, specieName, aliveCount, unhealthyCount, deadCount, notSpecifiedCount } = specie
          const value = specieId ? { id: specieId, label: specieName } : null
          return (
            <ChakraField.Root key={index} justifyContent={'stretch'}>
              <Flex direction={'row'} alignItems={'flex-start'} w={'full'}>
                <SpeciesCombo flex={1} me={2} value={value} onChange={v => handleSpecieChange(index, v)} />
                <HStack flex={2} w={'full'} direction={'column'}>
                  <NumberInput value={aliveCount} size={'sm'} onChange={v => handleValueChange(index, 'aliveCount', v)} />
                  <NumberInput value={unhealthyCount} size={'sm'} onChange={v => handleValueChange(index, 'unhealthyCount', v)} />
                  <NumberInput value={deadCount} size={'sm'} onChange={v => handleValueChange(index, 'deadCount', v)} />
                  <NumberInput value={notSpecifiedCount} size={'sm'} onChange={v => handleValueChange(index, 'notSpecifiedCount', v)} />
                </HStack>
              </Flex>
            </ChakraField.Root>
          )
        })}
    </VStack>
  )
}

export default AffectedSpeciesInput

