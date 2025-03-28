'use client'
import { useCallback } from 'react'

import getDiscoveryStates from '../actions/get-discovery-states'

// import SelectField from './select-field'
import SelectFieldAdvanced from '../select-field-advanced'

// const EtatDecouverteSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getDiscoveryStates()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const EtatDecouverteSelect = ({ label, value, isEditing, onChange }) => {
  const getter = useCallback(async () => {
    return getDiscoveryStates(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey={'name'} getter={getter} />
  )
}

export default EtatDecouverteSelect
