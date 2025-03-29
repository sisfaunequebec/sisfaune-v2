'use client'
import { useCallback } from 'react'

import getStatuses from '../actions/get-statuses'

// import SelectField from './select-field'
import SelectFieldAdvanced from './select-field-advanced'

// const StatutSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getStatuses()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const StatutSelect = ({ label, value, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getStatuses(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey={'name'} getter={getter} />
  )
}

export default StatutSelect
