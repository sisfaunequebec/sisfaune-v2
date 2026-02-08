'use server'

import { updateAnalysis } from '@/lib/data/analyses/service'

const updateAnalysisAction = async (analysisId, data) => {
  const result = await updateAnalysis(analysisId, data)
  return result
}

export default updateAnalysisAction
