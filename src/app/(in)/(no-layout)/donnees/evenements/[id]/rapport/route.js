import ReactPDF, { StyleSheet, Document, Page, View, Text, Image } from '@react-pdf/renderer'

const COLORS = {
  'gray.100': '#eee',
  'gray.300': '#ccc',
  'green.100': '#e4ecdb',
  'green.200': '#ccdbbb',
  'green.400': '#8dac6f'
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 72 * 0.5,
    paddingLeft: 72 * 0.75,
    paddingRight: 72 * 0.75,
    fontSize: '12pt'
  },
  logo: {
    width: 72 * 2.5,
    left: -4
  },
  section: {
    marginBottom: 72 * 0.125
  },
  h1: {
    fontSize: '30pt',
    fontWeight: 900,
  },
  primaryBlock: {
    marginBottom: 72 * 0.125,
    borderWidth: '1.5pt',
    borderColor: COLORS['gray.300']
  },
  secondaryBlock: {
    // marginBottom: 72 * 0.125,
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
  const titleStyle = { padding: 72 * 0.125, backgroundColor: COLORS['gray.300'], fontWeight: 900, fontSize: '11pt' }
  const bodyStyle = { padding: 72 * 0.125, fontSize: '11pt' }
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
  const titleStyle = { padding: 72 * 0.125, backgroundColor: COLORS['green.200'], fontWeight: 900, fontSize: '10pt' }
  const bodyStyle = { padding: 72 * 0.125, fontSize: '11pt' }
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

  const specimens = [
    { id: 1 }, 
    { id: 2 }
  ]

  const analyses = [
    { name: 'Rage (DRIT)' }
  ]

  return (
    <Document language={'fr'} pageMode={'fullScreen'} title={`SIS FAune - Rapport d'événement ${eventId}`}>
      <Page size={'LETTER'} style={styles.page}>
        <Section fixed>
          <Logo />
        </Section>
        <Section style={{ textAlign: 'right', paddingBottom: 72 * 0.1, borderBottomWidth: 5, borderBottomColor: COLORS['green.400'], fontSize: '16pt' }}>
          <Text>Rapport d&apos;événement </Text><H1 text={eventId} />
        </Section>
        <Section style={{ backgroundColor: COLORS['gray.100'], padding: 72 * 0.125, textAlign: 'right' }}>
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
            const marginBottom = (i === specimens.length - 1) ? 0 : 72 * 0.125
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
            const marginBottom = (i === analyses.length - 1) ? 0 : 72 * 0.125
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
