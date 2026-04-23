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
  'green.400': '#8dac6f',
  'red.500': '#ff0000'
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
  base: 11,
  sm: 9,
  larger: 14,
  lg: 16,
  xl: 24
}

const FONT_WEIGHTS = {
  base: 200,
  medium: 500,
  bold: 900
}

const LINE_HEIGHTS = {
  base: 1.3,
  larger: 1.4,
  lg: 1.5 
}

const BASE_TITLE = 'SIS Faune - Rapport d\'événement'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: SPACING.md,
    paddingTop: SPACING.lg,
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.lg,
  },
  logo: {
    width: INCH_IN_POINTS * 2,
    left: -4
  },
  section: {
    marginBottom: SPACING.lg,
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.base,
    // lineHeight: LINE_HEIGHTS.base
  },
  // h1: {
  //   fontSize: '30pt',
  //   fontWeight: FONT_WEIGHTS.bold
  // },
  h2: {
    fontSize: FONT_SIZES.larger,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.md
  },
  // primaryBlock: {
  //   marginBottom: SPACING.sm,
  //   borderWidth: '1.5pt',
  //   borderColor: COLORS['gray.300']
  // },
  // secondaryBlock: {
  //   borderWidth: '1.5pt',
  //   borderColor: COLORS['green.200'],
  //   borderTopLeftRadius: 5,
  //   borderTopRightRadius: 5,
  //   borderBottomLeftRadius: 5,
  //   borderBottomRightRadius: 5
  // },
  // regular: {
  //   fontWeight: 400
  // },
  // bold: {
  //   fontWeight: 900
  // },  
  // red: { 
  //   color: 'red'
  // }
})

const Footer = ({ eventId, date }) => {
  return (
    <Text fixed style={{ fontSize: FONT_SIZES.sm, position: 'absolute', bottom: SPACING.md, right: SPACING.lg }}>Rapport d&apos;événement {eventId} - Produit le {date}</Text>
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

// const PrimaryBlock = ({ title, children, style }) => {
//   const baseStyle = styles.primaryBlock
//   const titleStyle = { padding: SPACING.sm, backgroundColor: COLORS['gray.300'], fontWeight: 900, fontSize: FONT_SIZES.smaller }
//   const bodyStyle = { padding: SPACING.sm, fontSize: FONT_SIZES.smaller }
//   return (
//     <View style={{...baseStyle, ...style}}>
//       <View style={titleStyle}><Text>{title}</Text></View>
//       <View style={bodyStyle}>
//         {children}
//       </View>
//     </View>
//   )
// }

// const SecondaryBlock = ({ title, children, style }) => {
//   const baseStyle = styles.secondaryBlock
//   const titleStyle = { padding: INCH_IN_POINTS * 0.125, backgroundColor: COLORS['green.200'], fontWeight: 900, fontSize: FONT_SIZES.sm }
//   const bodyStyle = { padding: INCH_IN_POINTS * 0.125, fontSize: FONT_SIZES.smaller }
//   return (
//     <View style={{...baseStyle, ...style}}>
//       <View style={titleStyle}><Text>{title}</Text></View>
//       <View style={bodyStyle}>
//         {children}
//       </View>
//     </View>
//   )
// }

// const DataRow = ({ label, value }) => {
//   return (
//     // <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: SPACING.md }} debug={true}>
//     <>
//     <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: SPACING.md }}><Text style={{ ...styles.bold, fontSize: FONT_SIZES.xs}}>{label}</Text></View>
//     <View style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: SPACING.md }}><Text style={{ ...styles.bold, fontSize: FONT_SIZES.xs}}>{value}</Text></View>
//     </>
//     // </View>
//     // <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginBottom: SPACING.md }}>
      
//     //   {/* <View style={{ flex: 2, display: 'flex', alignItems: 'flex-end'}}><Text>{value}</Text></View> */}
//     // </View>
//   )
// }

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
      <Page size={PAGESIZE} style={styles.page}>

        <Section fixed style={{ marginBottom: SPACING.none }}>
          <Logo />
        </Section>

        <Section style={{ textAlign: 'right', fontSize: FONT_SIZES.larger }}>
          <Text style={{ fontWeight: FONT_WEIGHTS.bold }}>Rapport d&apos;événement</Text>
          <Text style={{ fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold }}>{eventId}</Text>
          <Text style={{ color: COLORS['red.500'] }}>Préliminaire</Text>
        </Section>

        <Section style={{lineHeight: LINE_HEIGHTS.base }}>
          <Text style={{ ...styles.h2, fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.lg }}>Surveillance régulière</Text>
          <View style={{ marginBottom: SPACING.md }}>
            <Text>Date de soumission : {data.reportedAt}</Text>
            <Text>Numéro d&apos;incident CQSASQ : {data.reportedAt}</Text>
            <Text>Numéro de centrale du MAPAQ : {data.reportedAt}</Text>
            <Text>Numéro de pathologie : {data.reportedAt}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: FONT_WEIGHTS.bold }}>Responsable du dossier :</Text>
          </View>
        </Section>

        <Section style={{lineHeight: LINE_HEIGHTS.base, borderTop: '0.7px solid #000', paddingTop: SPACING.xs }}>
          <Text style={styles.h2}>Informations sur l&apos;événement</Text>
            <View style={{ marginBottom: SPACING.md }}>
            <Text>Date de la découverte : {data.reportedAt}</Text>
            <Text>Date de la récolte : {data.reportedAt}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.md }}>Soumissionaire :</Text>
          </View>
          <View>
            <Text style={{ fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.md }}>Individus affectés, par espèce :</Text>
          </View>
          <View>
            <Text style={{ fontWeight: FONT_WEIGHTS.bold }}>Localisation géographique :</Text>
          </View>
        </Section>

        <Section style={{lineHeight: LINE_HEIGHTS.base, borderTop: '0.7px solid #000', paddingTop: SPACING.xs }}>
          <Text style={styles.h2}>Spécimen(s) associé(s)</Text>
        </Section>

        <Section style={{lineHeight: LINE_HEIGHTS.base, borderTop: '0.7px solid #000', paddingTop: SPACING.xs }}>
          <Text style={styles.h2}>Analyses et résultats</Text>
        </Section>

        {/* <Section style={{ textAlign: 'right', paddingTop: SPACING.none, paddingBottom: SPACING.xs, borderBottomWidth: 5, borderBottomColor: COLORS['green.400'], fontSize: FONT_SIZES.larger }}>
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

        </Section> */}

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

        <Footer eventId={eventId} date={NOW} />
        
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
