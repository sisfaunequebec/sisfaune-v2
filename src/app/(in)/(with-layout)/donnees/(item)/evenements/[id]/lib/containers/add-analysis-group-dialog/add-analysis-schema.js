import * as v from 'valibot'

const schema = v.object({
  analysisGroup: v.object({ id: v.integer() }, 'Le type d\'analyse doit être précisé' )
})

export default schema

