'use client'
import SelectInput from '@/app/lib/components/inputs/base/select'

const ProgramSelect = ({ programs, ...rest} ) => {
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={programs} {...rest} clearable={false} />)
}

export default ProgramSelect
