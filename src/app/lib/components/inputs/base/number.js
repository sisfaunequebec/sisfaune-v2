import { useCallback } from 'react'

import isNil from 'lodash.isnil'

import { NumericFormat } from 'react-number-format'
import { Input, InputGroup } from '@chakra-ui/react'

// @param {Object} props - Les propriétés du composant.
// @param {number|null} props.value - Valeur numérique actuelle du champ (contrôlée).
// @param {(value: number|null) => void} props.onChange - Callback déclenchée lors d’un changement de valeur.
// @param {number} [props.precision=0] - Nombre de décimales à afficher.
// @param {...any} [props.rest] - Autres props passées au composant Chakra `Input`.

const NumberInput = ({ value, onChange, prefix, suffix, precision = 0, flex = 1, ...rest }) => {
  const handleValueChange = useCallback(e => {
    const { floatValue } = e
    
    const valueToReturn = isNil(floatValue) ? null : floatValue
    // console.debug('NumberInput, handleValueChange', e, valueToReturn)
    onChange(valueToReturn)
  }, [onChange])

  return (
    <InputGroup
      flex={flex}
      startElement={prefix}
      endAddon={suffix}
    >
      <NumericFormat value={value} customInput={Input} decimalScale={precision} decimalSeparator={','} onValueChange={handleValueChange} {...rest} />
    </InputGroup>
  )
} 

export default NumberInput