import Link from 'next/link'

import { RxFileText } from 'react-icons/rx'

import ResponsiveButton from '@/app/lib/components/responsive-button'

const ReportButton = ({ id }) => {
  return (
    <ResponsiveButton label={'Rapport'} variant={'solid'} colorPalette={'blue'} icon={<RxFileText />} as={Link} href={`/donnees/evenements/${id}/rapport`} target={'_blank'} />
  )
}

export default ReportButton