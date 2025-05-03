'use client'
import { useCallback } from 'react'

import getDeathCauses from '../actions/get-death-causes'

// import SelectField from './select-field'
import SelectFieldAdvanced from '../../../../../../../../lib/components/select-field-advanced'

// const CauseMortSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getDeathCauses()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const CauseMortSelect = ({ label, value, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getDeathCauses(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey='name' getter={getter} />
  )
}

export default CauseMortSelect
