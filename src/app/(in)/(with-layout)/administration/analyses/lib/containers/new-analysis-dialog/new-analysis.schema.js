import * as v from 'valibot'

const schema = v.pipe(
  v.object({
    isNewGroup: v.boolean(),
    name: v.pipe(v.string('Le nom de l\'analyse est requise'), v.trim()),
    resultType: v.object({ id: v.integer() }, 'Le type de résultat doit être précisé' ),
    analysisSector: v.nullish(v.object({ id: v.integer() }, 'Le secteur d\'analyse doit être précisé' )),
    analysisGroup: v.nullish(v.object({ id: v.integer() }, 'Le groupe d\'analyses doit être précisé' )),
    newGroupName: v.nullish(v.pipe(v.string('Le nom de l\'analyse est requise'), v.trim()))
  }),
  v.forward(
    v.custom((analysis) => {
      if (!analysis.isNewGroup) {
        return !!analysis.analysisGroup
      }
      return true
    }, 'Le groupe d\'analyses doit être précisé'),
    ['analysisGroup']
  ),
  v.forward(
    v.custom((analysis) => {
      if (analysis.isNewGroup) {
        return !!analysis.analysisSector
      }
      return true
    }, 'Le secteur d\'analyse doit être précisé'),
    ['analysisSector']
  ),
)

export default schema
