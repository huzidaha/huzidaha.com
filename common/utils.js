import _ from 'ramda'
import moment from 'moment'
import { getPath, setPath } from './fp'

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
export const makeEntityDate = makeFormattedDate('YYYY年MM月 HH时mm分')
