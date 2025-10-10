'use client'
import { useCallback } from 'react'

import getHabitatTypes from '@/lib/data/lookups/get-habitat-types'

// import SelectField from './select-field'
import SelectFieldAdvanced from '../../../../../../../../lib/components/select-field-advanced'

// const HabitatSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getHabitatTypes()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const HabitatSelect = ({ label, value, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getHabitatTypes(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey='name' getter={getter} />
  )
}

export default HabitatSelect
