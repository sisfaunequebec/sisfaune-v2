'use client'
import SelectInput from '@/app/lib/components/inputs/base/select'

const formats = [
  { value: 'xlsx', label: 'Excel (XLSX)', description: 'Un seul fichier avec onglets multiples' },
  { value: 'csv', label: 'Texte (CSV)', description: 'Plusieurs fichiers zippés' }
]

const FormatSelect = (props) => {
  return (
    <SelectInput valueKey={'value'} labelKey={'label'} items={formats} {...props} clearable={false} />
  )
}

export default FormatSelect
