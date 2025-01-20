import wait from '@/utilitaires/wait'

const STATUSES = [
  { value: 2, label: 'En cours' },
  { value: 3, label: 'Terminé' }
]

const PROGRAMS = [
  { value: 1, label: 'Surveillance de la MDC' },
  { value: 2, label: 'Surveillance de la rage du raton laveur' },
  { value: 3, label: 'Surveillance de la santé des chauves-souris' },
  { value: 4, label: 'Surveillance de la septicémie hémorragique virale' },
  { value: 5, label: 'Surveillance de l\'influenza aviaire' },
  { value: 6, label: 'Surveillance des salmonelles' },
  { value: 7, label: 'Surveillance passive de la rage (analyse ACIA)' },
  { value: 8, label: 'Surveillance régulière' },
  { value: 11, label: 'Évaluation de la contamination par le plomb' },
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomStatus = () => {
  const values = STATUSES.map(s => s.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  return getRandomInt(min, max)
}

const getRandomProgram = () => {
  const values = PROGRAMS.map(s => s.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  return getRandomInt(min, max)
}

const EVENTS = Array(50).fill(null).map((item, i) => {
  return {
    id: i + 1,
    status: getRandomStatus(),
    program: getRandomProgram()
  }
})

const getEvents = async (params, context) => {
  await wait(Math.random() * 1000)

  const { statut, programme } = params
  console.debug(statut, programme)

  const byStatus = statut ? EVENTS.filter(e => statut.includes(e.status)) : EVENTS
  const byProgram = programme ? byStatus.filter(e => programme.includes(e.program)) : byStatus

  return byProgram
}

export {
  STATUSES,
  PROGRAMS,
  getEvents
}