import ReactPDF, { StyleSheet, Document, Page, View, Text, Image } from '@react-pdf/renderer'
import { DateTime } from 'luxon'

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
  xs: INCH_IN_POINTS * 0.0625,
  sm: INCH_IN_POINTS * 0.125,
  md: INCH_IN_POINTS * 0.5,
  lg: INCH_IN_POINTS * 0.75
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
    marginBottom: SPACING.sm
  },
  h1: {
    fontSize: '30pt',
    fontWeight: 900,
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
  }
})

const H1 = ({ text }) => {
  return (
    <Text style={styles.h1}>{text}</Text>
  )
}

const Logo = () => {
  return (
    <Image src={'http://localhost:4501/logo_sisfaune_big.png'} style={styles.logo} />
  )
}

const Section = ({ fixed, children, style }) => {
  const baseStyle = styles.section
  return (
    <View fixed={fixed} style={{...style, ...baseStyle}}>
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



const PdfDocument = ({ data }) => {
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
        <Section fixed>
          <Logo />
        </Section>
        <Section style={{ textAlign: 'right', paddingBottom: SPACING.xs, borderBottomWidth: 5, borderBottomColor: COLORS['green.400'], fontSize: FONT_SIZES.larger }}>
          <Text>Rapport d&apos;événement </Text>
          <H1 text={eventId} />
          <Text style={{ marginTop: SPACING.sm, fontSize: FONT_SIZES.sm }}>Produit le : {NOW}</Text>
        </Section>
        <Section style={{ backgroundColor: COLORS['gray.100'], padding: SPACING.sm, textAlign: 'right' }}>
          <Text>Section</Text>
        </Section>
        <PrimaryBlock title={'Informations sur l\'événement'}>
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
        </PrimaryBlock>
      </Page>
    </Document>
  )
}

const GET = async (request, { params }) => {
  const { id } = await params

  const data = { id }

  const stream = await ReactPDF.renderToStream(<PdfDocument data={data} />)

  return new Response(stream)
}

export {
  GET
}
