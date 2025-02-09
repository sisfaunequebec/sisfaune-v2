'use server'
import { unstable_cache } from 'next/cache'

import orm from '@/logic/data/database'

const getEventTypes = unstable_cache(
  async () => {
    const typesRaw = await orm.LutEventType.findMany()
    const types = typesRaw.map(t => {
      const { id: value, name: label } = t
      return {
        value,
        label
      }
    })
    return types
}, ['event_types'], { revalidate: 20 })

export default getEventTypes
