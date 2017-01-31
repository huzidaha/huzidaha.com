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

export const showError = (err) => {
  alert(err)
}

export const wrapWithAlertError = (fn) => async (...params) => {
  try {
    await fn(..._.clone(params)) // 谁知道你在写什么
  } catch (e) {
    alert(`错误：${e}`)
  }
}
