'use client'
import { useCallback, useEffect, useState } from 'react'

import getResultTypes from '../actions/get-result-types'

import DataDrivenSelect from '@/app/lib/components/data-driven-select'

const ResultTypeSelect = (props) =>  {
  return (
    <DataDrivenSelect loader={getResultTypes} {...props} />
  )
}

export default ResultTypeSelect

