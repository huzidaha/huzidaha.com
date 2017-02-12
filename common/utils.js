import _ from 'ramda'
import moment from 'moment'
import { getPath, setPath } from './fp'
import { getStore } from './store'

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

export const showError = (err) => { alert(err) }

export const wrapWithAlertError = (fn) => async (...params) => {
  try {
    await fn(..._.clone(params)) // 谁知道你在写什么
  } catch (e) {
    alert(`错误：${e}`)
  }
}

export const makeFormattedDate = _.curry((format, date) => moment(date).format(format))
export const makeEntityDate = makeFormattedDate('YY/MM/DD HH:mm')

export const asyncObjContruct = async (keysAndPromises) => {
  const rets = await Promise.all(Object.values(keysAndPromises))
  return Object.keys(keysAndPromises).reduce((obj, key, index) => {
    obj[key] = rets[index]
    return obj
  }, {})
}

export const asyncObjContructWithStore = async (keysAndPromises) => {
  return Object.assign(await asyncObjContruct(keysAndPromises), {
    store: await getStore()
  })
}
