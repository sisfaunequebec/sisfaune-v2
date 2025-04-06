'use client'
import getAnalysisSectors from '../actions/get-analysis-sectors'

import DataDrivenSelect from '@/app/lib/components/data-driven-select'

const AnalysisSectorSelect = (props) =>  {
  return (
    <DataDrivenSelect loader={getAnalysisSectors} {...props} />
  )
}

export default AnalysisSectorSelect

