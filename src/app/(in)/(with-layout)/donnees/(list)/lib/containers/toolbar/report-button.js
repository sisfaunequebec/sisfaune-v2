import Link from 'next/link'

import { RxFileText } from 'react-icons/rx'

import ResponsiveButton from '@/app/lib/components/responsive-button'

const ReportButton = ({ eventId }) => {
  return (
    <ResponsiveButton label={'Rapport (PDF)'} variant={'solid'} colorPalette={'blue'} icon={<RxFileText />} as={Link} href={`/donnees/evenements/${eventId}/rapport`} target={'_blank'} />
  )
}

export default ReportButton