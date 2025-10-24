import { DateTime } from 'luxon'
import { DEFAULT_FORMAT } from '@/utils/dates'

import TextDisplay from './text'

const DateDisplay = ({ value, format = DEFAULT_FORMAT, ...rest }) => {
  const displayValue = value && DateTime.fromISO(value).toFormat(DEFAULT_FORMAT)
  
  return (
    <TextDisplay value={displayValue} />
  )
}

export default DateDisplay