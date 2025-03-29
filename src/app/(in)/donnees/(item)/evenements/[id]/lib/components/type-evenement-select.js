'use client'
import { useCallback } from 'react'

import getEventTypes from '../actions/get-event-types'

import SelectFieldAdvanced from './select-field-advanced'

// const TypeEvenementSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getEventTypes()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const TypeEvenementSelect = ({ label, value, isEditing }) =>  {
  const getter = useCallback(async () => {
    return getEventTypes(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey={'name'} getter={getter} />
  )
}

export default TypeEvenementSelect
