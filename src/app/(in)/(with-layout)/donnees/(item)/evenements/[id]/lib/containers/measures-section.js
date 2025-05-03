const MeasuresSection = ({ measures }) => {
  return measures.map(m => {
    const { id } = m
    console.debug(m)
    return (
      null
    // <MeasureField key={id} measure={m} />
    )
  }
  )
}

export default MeasuresSection
