/* @flow */

class Schema {
  definitions: Object;

  constructor (definitions: Object) {
    this.definitions = definitions
  }

  parse (prop: string, value: mixed): mixed {
    if (!(prop in this.definitions)) {
      throw new Error(
        `Unknown schema property "${prop}". ` +
        `The available properties are: ${this.props()}`
      )
    }

    return this.definitions[prop].parse(value)
  }

  props () {
    return Object.keys(this.definitions).join(', ')
  }
}

export function schema (definitions: Object): Schema {
  return new Schema(definitions)
}

class SchemaTypeInteger {
  parse (value) {
    if (typeof value === 'string' && `${Number(value)}` === value) {
      return Number(value)
    }

    return value
  }
}

Object.defineProperty(schema, 'integer', {
  get () {
    return new SchemaTypeInteger()
  }
})
