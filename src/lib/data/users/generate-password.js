import generator from 'generate-password'

const generatePassword = () => {
  const password = generator.generate({ length: 10, numbers: true, excludeSimilarCharacters: true, strict: true })
  return password
}

export default generatePassword