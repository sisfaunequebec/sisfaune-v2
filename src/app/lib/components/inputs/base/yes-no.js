import SelectInput from '@/app/lib/components/inputs/base/select'

const YesNoSelect = (props) => {
  const items = [
    { id: 1, name: 'Oui' },
    { id: 0, name: 'Non' }
  ]

  const handleChange = (selected) => {
    props.onChange(selected.id === 1)
  }
  
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
}

export default YesNoSelect