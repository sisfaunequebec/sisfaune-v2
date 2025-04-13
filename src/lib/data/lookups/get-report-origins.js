'use server'
import orm from '../database'

const getReportOrigins = async ({ activeOnly = true }) => {
  const raw = await orm.LutReportOrigin.findMany({
    where: {
      isActive: activeOnly ? true : undefined
    },
    orderBy: {
      name: 'asc'
    }
  })
  const items = raw.map(t => {
    const { id: value, name: label, isActive } = t
    return {
      value,
      label,
      isActive
    }
  })
  return items
}

export default getReportOrigins
