import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

import { PROGRAMS } from '@/logic/data/events/service'

const Programme = () => {
  const [value, setValue] = useQueryState('p', parseAsArrayOf(parseAsInteger).withDefault([]))

  return (
    <Checkboxes name={'programme'} choices={PROGRAMS} value={value} onChange={setValue} allChoicesLabel={'Tous les programmes'} />
  )
}

export default Programme
