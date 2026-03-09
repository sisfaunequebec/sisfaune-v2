'use server'

import { newAnalysis } from '@/lib/data/analyses/service'

const action = async (data) => {
  const result = await newAnalysis(data)
  return result
}

export default action
