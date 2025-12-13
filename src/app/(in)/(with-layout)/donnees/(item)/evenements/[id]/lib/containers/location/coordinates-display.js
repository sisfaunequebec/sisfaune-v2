import TextDisplay from '@/app/lib/components/display/base/text'

const CoordinatesDisplay = ({ value, size }) => {
  const coordinates = value ? [value.latitude.toFixed(6), value.longitude.toFixed(6)].join(', ') : null
  return (
    <TextDisplay value={coordinates} size={size} />
  )
}

export default CoordinatesDisplay