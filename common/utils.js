import _ from 'ramda'
import { getPath, setPath } from './fp'

export const twoWayBinding = _.curry((component, path) => {
  return {
    value: getPath(component.state, path),
    onChange: (event) => {
      setPath(component.state, path, event.target.value)
      component.setState(component.state)
    }
  }
})
