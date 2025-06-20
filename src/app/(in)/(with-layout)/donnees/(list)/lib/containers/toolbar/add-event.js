import getUser from '@/lib/auth/get-user'
import { getSubmitableProgramsForUser } from '@/lib/data/lookups/event-programs'

import AddEventButton from './add-event-button'

const AddEvent = async () => {
  const user = await getUser()
  const programs = await getSubmitableProgramsForUser(user)

  return (
    <AddEventButton programs={programs} />
  )
}

export default AddEvent
