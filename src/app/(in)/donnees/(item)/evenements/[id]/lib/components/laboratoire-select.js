'use client'
import { useCallback } from 'react'

import getLabs from '../actions/get-labs'

// import SelectField from './select-field'
import SelectFieldAdvanced from '../../../../../../../lib/components/select-field-advanced'

// const LaboratoireSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getLabs()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const LaboratoireSelect = ({ label, value, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getLabs(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey='name' getter={getter} />
  )
}

export default LaboratoireSelect
