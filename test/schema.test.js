import { expect } from 'chai'
import { schema } from '../src'

describe('schema', () => {
  const subject = (...args) => schema(...args)
  const testSchema = subject({ age: schema.integer })

  it('can parse a value', () => {
    expect(testSchema.parse('age', 3)).to.equal(3)
  })

  it('throws an error if the prop is unknown', () => {
    const testSchema = subject({ age: schema.integer })

    expect(() => {
      testSchema.parse('typo', 3)
    }).to.throw('Unknown schema property "typo". The available properties are: age')
  })
})

describe('schema type integer', () => {
  const subject = (...args) => schema(...args)

  it('casts strings to numbers when possible', () => {
    const testSchema = subject({ age: schema.integer })
    expect(testSchema.parse('age', '3')).to.equal(3)
  })

  it('does not cast strings that will result in NaN', () => {
    const testSchema = subject({ age: schema.integer })
    expect(testSchema.parse('age', 'test')).to.equal('test')
  })
})
