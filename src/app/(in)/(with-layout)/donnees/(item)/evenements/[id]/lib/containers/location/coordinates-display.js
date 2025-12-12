import TextDisplay from '@/app/lib/components/display/base/text'

const CoordinatesDisplay = ({ value, size }) => {
  const { latitude, longitude } = value
  const coordinates = [latitude.toFixed(6), longitude.toFixed(6)].join(', ')
  return (
    <TextDisplay value={coordinates} size={size} />
  )
}

export default CoordinatesDisplay