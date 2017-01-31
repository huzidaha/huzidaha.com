/* eslint-disable no-new-func */

import _ from 'ramda'

export const log = (value) => {
  console.log('LOG: ', value)
  return value
}

export const updatedPath = _.ifElse(
  _.propEq(0, '['),
  _.always,
  _.pipe(
    _.insert(0, '.'),
    _.join('')
  )
)

export const getPath = _.curry((obj, path) => {
  return (new Function('obj', `return obj${updatedPath(path)}`))(obj)
})

export const setPath = _.curry((obj, path, value) => {
  return (new Function('obj', 'value', `return obj${updatedPath(path)} = value`))(obj, value)
})
