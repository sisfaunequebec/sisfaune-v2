'use client'
import SelectInput from '@/app/lib/components/inputs/base/select'

const ProgramSelect = ({ programs, ...rest} ) => {
  return (<SelectInput items={programs} {...rest} />)
}

export default ProgramSelect
