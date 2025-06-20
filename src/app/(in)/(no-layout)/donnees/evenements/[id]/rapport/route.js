import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

const PdfDocument = ({ data }) => {
  const { id } = data

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Événement no {id}</Text>
        </View>
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
