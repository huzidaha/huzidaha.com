/* eslint-disable no-new-func */
import { connect } from 'react-redux'
import { connectApiClient } from './apiClient'
import { wrapWithProvider } from '../stores'
import _ from 'ramda'
import moment from 'moment'

const updatedPath = (path) => {
  return path[0] === '[' ? path : `.${path}`
}

const getPath = _.curry((obj, path) => {
  return (new Function('obj', `return obj${updatedPath(path)}`))(obj)
})

const setPath = _.curry((obj, path, value) => {
  return (new Function('obj', 'value', `return obj${updatedPath(path)} = value`))(obj, value)
})

/**
 * ReactJS 双向绑定帮助方法
 * @param  {React.Component} component 需要绑定的组件
 * @return {String} path 属性路径 e.g. posts[0].title
 */
export const twoWayBinding = _.curry((component, path) => {
  return {
    value: getPath(component.state, path),
    onChange: (event) => {
      setPath(component.state, path, event.target.value)
      component.setState(component.state)
    }
  }
})

export const wrapWithAlertError = (fn) => async (...params) => {
  try {
    await fn(..._.clone(params))
  } catch (e) {
    alert(`错误：${e}`)
  }
}

export const asyncObjContruct = async (keysAndPromises) => {
  const rets = await Promise.all(Object.values(keysAndPromises))
  return Object.keys(keysAndPromises).reduce((obj, key, index) => {
    obj[key] = rets[index]
    return obj
  }, {})
}

export const connectAll = (mapStateToProps, mapDispatchToProps) => _.compose(
  connectApiClient,
  wrapWithProvider,
  connect(mapStateToProps, mapDispatchToProps)
)

export const makeFormattedDate = _.curry((format, date) => moment(date).format(format))
export const showError = (err) => { alert(err) }
export const makeEntityDate = makeFormattedDate('YY/MM/DD HH:mm')
