'use server'
import orm from '@/logic/data/database'

const getReportOrigins = async () => {
  const raw = await orm.LutReportOrigin.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getReportOrigins
