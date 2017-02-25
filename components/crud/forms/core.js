import text from './text'

class Core {
  constructor () {
    this.schemas = new Map()
  }

  registerSchemaType (type, processor) {
    this.schemas.set(type, processor)
  }

  createFiledsFromSchema (component, schemas) {
    return schemas.map((schema, i) => {
      const { type } = schema
      if (!this.schemas.has(type)) {
        throw new Error(`未能找到类型 ${type} 的处理器`)
      }
      const processor = this.schemas.get(type)
      return <div key={i}>{processor(component, schema)}</div>
    })
  }
}

export const createCore = () => {
  const core = new Core()
  core.registerSchemaType('TEXT', text)
  return core
}

export const getStateFromSchemas = (schemas) => {
  return schemas.reduce((obj, schema) => {
    obj[schema.path] = '' // TODO to create deep object
    return obj
  }, {})
}

export const core = createCore()
