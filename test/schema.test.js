/* @flow */

import { expect } from 'chai'
import Schema from '../src/schema'

describe('Schema', () => {
  const subject = (...args: any) => new Schema(...args)

  describe('intialization', () => {
    it('throws an error if the schema definition is empty', () => {
      expect(() => {
        subject()
      }).to.throw('The schema definition cannot be empty')
    })

    it('throws an error when any of the schema definition prop is malformated', () => {
      expect(() => {
        subject({ age: undefined })
      }).to.throw(
        'The value of "age" is invalid. Use `{ age: true }` if you do not want to specify any formatters or validators'
      )
    })
  })

  describe('format', () => {
    it.skip('throws na error if the prop does not exist')
    it.skip('constructs the formatters with the correct config')

    it('passes the prop value through all formatters', () => {
      class AgeFormatter {
        format (value) { return true }
      }

      class DummyFormatter {
        format (value) { return `${value}!` }
      }

      const schema = subject({ age: { age: true, dummy: true } }, {
        age: AgeFormatter,
        dummy: DummyFormatter
      })

      expect(schema.format('age', 3)).to.equal('true!')
    })
  })
})
