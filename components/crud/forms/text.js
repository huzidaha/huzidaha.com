import { Component, PropTypes } from 'react'
import { twoWayBinding } from '../../../common/utils'

export default (component, schema) => {
  const dataBinder = twoWayBinding(component)
  return (
    <div>
      <label>{schema.name}：</label>
      <input {...dataBinder(schema.path)} />
    </div>
  )
}
