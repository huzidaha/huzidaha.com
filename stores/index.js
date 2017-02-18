import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { getHuzidahaProfile } from './huzidahaProfile'

let store = null

const promiseMiddleware = (apiClient) => (store) => (next) => async (action) => {
  if (action.promise) {
    const result = await action.promise(apiClient, next)
    next({ ...action, result })
  } else {
    next(action)
  }
}

const createAppStore = (initialState, apiClient) => createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware, promiseMiddleware(apiClient))
)

export const wrapWithProvider = (PageComponent) => class extends Component {
  static propTypes = {
    initialState: PropTypes.object,
    apiClient: PropTypes.object
  }

  static async getInitialProps (ctx) {
    const { req, apiClient } = ctx
    const isServer = !!req
    const props = PageComponent.getInitialProps
      ? await PageComponent.getInitialProps(ctx)
      : {}
    if (isServer && typeof window === 'undefined') {
      store = createAppStore({}, apiClient)
      await store.dispatch(getHuzidahaProfile())
      props.initialState = store.getState()
    }
    return props
  }

  constructor (props) {
    super(props)
    if (!store) {
      store = createAppStore(props.initialState, props.apiClient)
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
