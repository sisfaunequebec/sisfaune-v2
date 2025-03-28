'use client'
import { useCallback } from 'react'

import getReportOrigins from '../actions/get-report-origins'

// import SelectField from './select-field'
import SelectFieldAdvanced from '../select-field-advanced'

// const ProvenanceSelect = ({ label, value, isEditing, onChange }) => {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     const getItems = async () => {
//       const items = await getReportOrigins()
//       setItems(items)
//     }

//     getItems()
//   }, [])

//   return (
//     <SelectField label={label} value={value} items={items} isEditing={isEditing} />
//   )
// }

const ProvenanceSelect = ({ label, value, isEditing }) =>  {
  const getter = useCallback(async () => {
    return getReportOrigins(value)
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey={'name'} getter={getter} />
  )
}

export default ProvenanceSelect
