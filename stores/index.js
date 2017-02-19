import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { getHuzidahaProfile } from './huzidahaProfile'
import { getMyProfile } from './users'
import { requireAuthorization } from '../common/authorization'

let store = null

const promiseMiddleware = (apiClient) => (store) => (next) => async (action) => {
  if (action.promise) {
    const result = await action.promise(apiClient, next)
    next({ ...action, result })
    return result
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
    if (isServer) {
      store = createAppStore({}, apiClient)
      // 在这里初始化 store 中的所有数据
      await store.dispatch(getMyProfile())
      await store.dispatch(getHuzidahaProfile())
    }
    const state = store.getState()
    const userProfile = state.users.myProfile
    requireAuthorization(ctx, userProfile)
    if (isServer) props.initialState = store.getState()
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
