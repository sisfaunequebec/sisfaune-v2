const getToday = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const today = `${year}${month}${day}` // ex. 20230424
  return today
}

export default getToday