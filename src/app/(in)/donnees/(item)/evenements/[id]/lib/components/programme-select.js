'use client'
import { useCallback } from 'react'

// import SelectField from './select-field'
import getPrograms from '../actions/get-programs'

import SelectFieldAdvanced from '../../../../../../../lib/components/select-field-advanced'

// const ProgrammeSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getPrograms()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const ProgrammeSelect = ({ label, value, isEditing }) =>  {
  const getter = useCallback(async () => {
    return getPrograms(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey={'name'} getter={getter} />
  )
}

export default ProgrammeSelect
