import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

let store = null

export const wrapWithProvider = (PageComponent) => class extends Component {
  static propTypes = {
    initialState: PropTypes.object
  }

  static async getInitialProps (ctx) {
    const { req } = ctx
    const isServer = !!req
    if (isServer && typeof window === 'undefined') {
      store = createStore(reducer, {}, applyMiddleware(thunkMiddleware))
    }
    return Object.assign({ initialState: store.getState() }, await PageComponent.getInitialProps(ctx))
  }

  constructor (props) {
    super(props)
    if (!store) {
      store = createStore(reducer, props.initialState, applyMiddleware(thunkMiddleware))
    }
  }

  render () {
    return (
      <Provider store={store}>
        <PageComponent {...this.props} />
      </Provider>
    )
  }
}
