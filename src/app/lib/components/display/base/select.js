import TextDisplay from './text'

const SelectDisplay = ({ value, labelKey = 'name', ...rest }) => {
  const label = value ? value[labelKey] || '' : ''
  return (
    <TextDisplay value={label} {...rest} />
  )
}

export default SelectDisplay