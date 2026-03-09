import ReactPDF, { StyleSheet, Document, Page, View, Text, Image } from '@react-pdf/renderer'
import { DateTime } from 'luxon'

import { getEvent } from '@/lib/data/events/service'
import { Flex } from '@chakra-ui/react'

const PAGESIZE = 'LETTER'

const INCH_IN_POINTS = 72

const COLORS = {
  'gray.100': '#eee',
  'gray.300': '#ccc',
  'green.100': '#e4ecdb',
  'green.200': '#ccdbbb',
  'green.400': '#8dac6f'
}

const SPACING = {
  none: 0,
  base: INCH_IN_POINTS * 0.125,
  xs: INCH_IN_POINTS * 0.0625,
  sm: INCH_IN_POINTS * 0.125,
  md: INCH_IN_POINTS * 0.25,
  lg: INCH_IN_POINTS * 0.5,
  xl: INCH_IN_POINTS * 0.75
}

const FONT_SIZES = {
  base: 12,
  xs: 9,
  sm: 10,
  smaller: 11,
  larger: 16,
  lg: 24,
  xl: 30
}

const BASE_TITLE = 'SIS Faune - Rapport d\'événement'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: SPACING.md,
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.lg,
    fontSize: FONT_SIZES.base
  },
  logo: {
    width: INCH_IN_POINTS * 2.5,
    left: -4
  },
  section: {
    display: 'flex',
    gap: SPACING.sm,
    marginBottom: SPACING.sm
  },
  h1: {
    fontSize: '30pt',
    fontWeight: 900,
  },
  h2: {
    fontSize: '14pt',
    fontWeight: 500,
  },
  primaryBlock: {
    marginBottom: SPACING.sm,
    borderWidth: '1.5pt',
    borderColor: COLORS['gray.300']
  },
  secondaryBlock: {
    borderWidth: '1.5pt',
    borderColor: COLORS['green.200'],
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  regular: {
    fontWeight: 400
  },
  bold: {
    fontWeight: 900
  },  
  red: { 
    color: 'red'
  }
})

const H1 = ({ text }) => {
  return (
    <Text style={styles.h1}>{text}</Text>
  )
}

const Footer = ({ date }) => {
  return (
    <Text fixed style={{ fontSize: FONT_SIZES.xs, position: 'absolute', bottom: SPACING.md, right: SPACING.lg }}>Rapport produit le {date}</Text>
  )
}

const Logo = () => {
  return (
    <Image src={'http://localhost:4501/logo_sisfaune_big.png'} style={styles.logo} />
  )
}

const Section = ({ fixed = false, children, style, debug = false }) => {
  const baseStyle = styles.section
  return (
    <View fixed={fixed} style={{...baseStyle, ...style}} debug={debug}>
      {children}
    </View>
  )
}

const PrimaryBlock = ({ title, children, style }) => {
  const baseStyle = styles.primaryBlock
  const titleStyle = { padding: SPACING.sm, backgroundColor: COLORS['gray.300'], fontWeight: 900, fontSize: FONT_SIZES.smaller }
  const bodyStyle = { padding: SPACING.sm, fontSize: FONT_SIZES.smaller }
  return (
    <View style={{...baseStyle, ...style}}>
      <View style={titleStyle}><Text>{title}</Text></View>
      <View style={bodyStyle}>
        {children}
      </View>
    </View>
  )
}

const SecondaryBlock = ({ title, children, style }) => {
  const baseStyle = styles.secondaryBlock
  const titleStyle = { padding: INCH_IN_POINTS * 0.125, backgroundColor: COLORS['green.200'], fontWeight: 900, fontSize: FONT_SIZES.sm }
  const bodyStyle = { padding: INCH_IN_POINTS * 0.125, fontSize: FONT_SIZES.smaller }
  return (
    <View style={{...baseStyle, ...style}}>
      <View style={titleStyle}><Text>{title}</Text></View>
      <View style={bodyStyle}>
        {children}
      </View>
    </View>
  )
}

const DataRow = ({ label, value }) => {
  return (
    // <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: SPACING.md }} debug={true}>
    <>
    <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: SPACING.md }}><Text style={{ ...styles.bold, fontSize: FONT_SIZES.xs}}>{label}</Text></View>
    <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: SPACING.md }}><Text style={{ ...styles.bold, fontSize: FONT_SIZES.xs}}>{value}</Text></View>
    </>
    // </View>
    // <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginBottom: SPACING.md }}>
      
    //   {/* <View style={{ flex: 2, display: 'flex', alignItems: 'flex-end'}}><Text>{value}</Text></View> */}
    // </View>
  )
}

const PdfDocument = ({ data }) => {
  console.debug(data)
  const { id: eventId } = data

  const NOW = DateTime.now().toISODate()

  const specimens = [
    { id: 1 }, 
    { id: 2 }
  ]

  const analyses = [
    { name: 'Rage (DRIT)' }
  ]

  return (
    <Document language={'fr'} pageMode={'fullScreen'} title={`${BASE_TITLE} ${eventId}`}>
      <Page size={'LETTER'} style={styles.page}>

        <Section fixed style={{ paddingBottom: SPACING.none }}>
          <Logo />
        </Section>

        <Section style={{ textAlign: 'right', paddingTop: SPACING.none, paddingBottom: SPACING.xs, borderBottomWidth: 5, borderBottomColor: COLORS['green.400'], fontSize: FONT_SIZES.larger }}>
          <Text style={styles.h2}>{ true && <Text style={styles.red}>(Préliminaire) </Text> }Rapport d&apos;événement <Text style={styles.h1}>{eventId}</Text></Text>
        </Section>

        <Section style={{ display: 'flex', flexDirection: 'column', backgroundColor: COLORS['gray.100'], padding: SPACING.md }} debug={true}>

          <Section style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', gap: SPACING.md }}>

            <Section style={{ display: 'flex', flex: '1 auto', flexDirection: 'column', fontSize: FONT_SIZES.sm }}>
              <DataRow label={'Date de soumission :'} value={data.reportedAt} />
              <DataRow label={'No. d\'incident CQSAS :'} value={data.cqsasNumber} />
              <DataRow label={'No. centrale MAPAQ :'} value={data.mapaqNumber} />
              <DataRow label={'No. de pathologie :'} value={data.pathologyNumber} />
            </Section> 


            <Section style={{ display: 'flex', flex: 1, fontSize: FONT_SIZES.sm }}><Text style={{}}>Soumissionaire</Text></Section>

          </Section>

          <Section style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: 900, fontSize: FONT_SIZES.md }}>{ data.reportOrigin.name }</Text>
          </Section> 

        </Section>

        {/* <PrimaryBlock title={'Informations sur l\'événement'}>
          <SecondaryBlock title={'Localisation géographique'}>
            <Text>Section</Text>
          </SecondaryBlock>
        </PrimaryBlock>
        <PrimaryBlock title={'Spécimens associés'}>
          {specimens.map((s, i) => {
            const { id: idSpecimen } = s
            const marginBottom = (i === specimens.length - 1) ? 0 : SPACING.sm
            return (
              <SecondaryBlock key={idSpecimen} title={`Spécimen no ${idSpecimen}`} style={{ marginBottom }}>
                <Text>Section</Text>
              </SecondaryBlock>
            )
          })}
        </PrimaryBlock>
        <PrimaryBlock title={'Analyses et résultats'}>
          {analyses.map((a, i) => {
            const { name } = a
            const marginBottom = (i === analyses.length - 1) ? 0 : SPACING.sm
            return (
              <SecondaryBlock key={name} title={`${name}`} style={{ marginBottom }}>
                <Text>Section</Text>
              </SecondaryBlock>
            )
          })}
        </PrimaryBlock> */}

        <Footer date={NOW} />
        
      </Page>
    </Document>
  )
}

const GET = async (request, { params }) => {
  const { id } = await params

  const event = await getEvent(parseInt(id, 10))

  if (!event) {
    return new Response('Event not found', { status: 404 })
  }

  const stream = await ReactPDF.renderToStream(<PdfDocument data={event} />)

  return new Response(stream)
}

export {
  GET
}
