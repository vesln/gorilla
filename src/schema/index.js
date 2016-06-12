/* @flow */
/* global SchemaType */

import isObject from 'lodash.isobject'

interface SchemaType {
  format (): mixed;
}

type SchemaTypes = {
  [key: string]: Class<$Subtype<SchemaType>>
};

// TODO(vesln): formatters
//
// type: string|number|date|boolean

// TODO(vesln): validators
//
// required: true
// length: { min: number, max: number }
// acceptance
// confirmation
// exclusion
// format
// inclusion
// length
// numericality
// absence
export default class Schema {
  props: Object;
  schemaTypes: SchemaTypes;

  constructor (props: Object, schemaTypes: SchemaTypes = {}) {
    if (!props) {
      throw new Error(`The schema definition cannot be empty`)
    }

    Object.keys(props).forEach((prop) => {
      if (!isObject(props[prop]) && props[prop] !== true) {
        throw new Error(
          `The value of "${prop}" is invalid. ` +
          `Use \`{ ${prop}: true }\` if you do not want to specify ` +
          `any formatters or validators`
        )
      }
    })

    // TODO(vesln): check if the schema values are valid

    this.props = props
    this.schemaTypes = schemaTypes
  }

  format (prop: string, value: any): any {
    const schemaTypes = this.schemaTypes
    const spec = this.props[prop]

    if (!(prop in this.props)) {
      throw new Error(
        `The property "${prop}" does not exist in the schema. ` +
        `The existing properties are: ${Object.keys(this.props).join(', ')}`
      )
    }

    // example: { name: true }
    if (spec === true) {
      return value
    }

    return Object.keys(spec).reduce((newValue, key) => {
      // TODO(vesln): the signature should be (record, key, value)
      const formatter = new schemaTypes[key]()
      return formatter.format(newValue)
    }, value)
  }
}
