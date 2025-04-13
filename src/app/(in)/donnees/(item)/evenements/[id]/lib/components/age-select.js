'use client'
import { useCallback } from 'react'

import getAges from '../actions/get-ages'

// import SelectField from './select-field'
import SelectFieldAdvanced from '../../../../../../../lib/components/select-field-advanced'

// const AgeSelect = ({ label, value, group, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getAges(group)
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const AgeSelect = ({ label, value, group, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getAges(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} onChange={onChange} valueLabelKey='name' getter={getter} />
  )
}

export default AgeSelect
