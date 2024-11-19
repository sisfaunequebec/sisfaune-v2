import { DataListItem } from '@/components/ui/data-list'
import { DataListRoot } from '@/components/ui/data-list'

const items = Array(100).fill(null).map((item, i) => {
  return {
    value: Math.round(Math.random() * 100),
    label: i + 1
  }
})

const Accueil = async () => {
  return (
    <DataListRoot size={'md'} divideY={'1px'} orientation={'horizontal'} w={'full'}>
      {items.map((item) => (
        <DataListItem
          pt={4}
          grow
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </DataListRoot>
  )
}

export default Accueil 
