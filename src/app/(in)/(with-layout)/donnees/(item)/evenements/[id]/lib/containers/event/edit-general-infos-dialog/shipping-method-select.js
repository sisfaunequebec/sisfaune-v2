'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const ShippingMethodSelect = (props) => {
  const items = useLookup('/api/lookup/shipping-methods', null, ['shipping-methods'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default ShippingMethodSelect
