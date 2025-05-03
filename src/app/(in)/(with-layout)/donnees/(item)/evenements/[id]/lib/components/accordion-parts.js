import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

const Trigger = ({ label, ...rest }) => {
  return (
    <AccordionItemTrigger indicatorPlacement='start' bg='green.50' color='green.600' p={3} borderRadius={0} borderColor='green.300' borderTopWidth={1} {...rest}>{label}</AccordionItemTrigger>
  )
}

const Content = ({ children }) => {
  return (
    <AccordionItemContent bg='white' p={4} px={5} borderBottomWidth={0}>{children}</AccordionItemContent>
  )
}

export {
  Trigger,
  Content
}
