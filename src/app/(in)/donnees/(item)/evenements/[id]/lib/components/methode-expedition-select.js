'use client'
import { useCallback } from 'react'

import getShippingMethods from '../actions/get-shipping-methods'

import SelectField from './select-field'
import SelectFieldAdvanced from '../../../../../../../lib/components/select-field-advanced'

// const MethodeExpeditionSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getShippingMethods()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const MethodeExpeditionSelect = ({ label, value, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getShippingMethods(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey='name' getter={getter} />
  )
}

export default MethodeExpeditionSelect
