import getUser from '@/lib/auth/get-user'
import { getSubmitableProgramsForUser } from '@/lib/data/lookups/event-programs'

import NewEventButton from './new-event-button'

const NewEvent = async () => {
  const user = await getUser()
  const programs = await getSubmitableProgramsForUser(user)

  return (
    <NewEventButton programs={programs} />
  )
}

export default NewEvent
