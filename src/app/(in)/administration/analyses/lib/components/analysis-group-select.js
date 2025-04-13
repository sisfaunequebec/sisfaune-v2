'use client'
import getAnalysisGroups from '../actions/get-analysis-groups'

import DataDrivenSelect from '@/app/lib/components/data-driven-select'

const AnalysisGroupSelect = (props) => {
  return (
    <DataDrivenSelect loader={getAnalysisGroups} {...props} />
  )
}

export default AnalysisGroupSelect
