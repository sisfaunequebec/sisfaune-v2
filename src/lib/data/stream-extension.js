import { Prisma } from '@prisma/client/extension'
import { Readable } from 'node:stream'

const cursorStreamExtension = Prisma.defineExtension(client => {
    return client.$extends({
      name: 'cursor-stream',
      model: {
        $allModels: {
          cursorStream(findManyArgs, { batchSize, prefill, transformer } = {}) {
            // console.debug(model)
            findManyArgs = findManyArgs ?? {}
            const context = Prisma.getExtensionContext(this)

            const take = batchSize || 100
            const highWaterMark = prefill || take * 2
            const cursorField = Object.keys(findManyArgs.cursor || {})[0] || 'id'

            if (findManyArgs.select && !findManyArgs.select[cursorField]) {
              throw new Error(`Must select cursor field "${cursorField}"`)
            }

            let cursorValue
            const readableStream = new Readable({
              objectMode: true,
              highWaterMark,
              async read() {
                try {

                  const results = await context.findMany({
                    ...findManyArgs,
                    take,
                    skip: cursorValue ? 1 : 0,
                    cursor: cursorValue ? {[cursorField]: cursorValue} : undefined
                  })

                  const transformedResults = transformer ? await transformer(results) : results
                  
                  for (const result of transformedResults) {
                    this.push(result)
                  }

                  if (results.length < take) {
                    this.push(null)
                    return
                  }
                  
                  cursorValue = (results[results.length - 1])[cursorField]
                } catch (e) {
                  this.destroy(e)
                }
              }
            })

            return readableStream
          }
        }
      }
    })
  }
)

export default cursorStreamExtension