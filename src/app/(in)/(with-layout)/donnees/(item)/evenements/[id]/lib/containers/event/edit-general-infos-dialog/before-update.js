import { DateTime } from 'luxon'

const beforeUpdate = (data, updating) => {
  let updated = updating

  if (updating.status?.id === 3 && (updating.status?.id !== data.status?.id) && !data.closedAt) {
    updated.closedAt = DateTime.utc().toISO()
  }
  if (updating.status?.id === 2 && (updating.status?.id !== data.status?.id)) {
    updated.closedAt = null
  }

  return updated
}

export default beforeUpdate
