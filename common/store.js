import { asyncObjContruct } from './utils'

export let store = {}

let isStoreLoaded = false

export const getStore = async (apiClient) => {
  if (isStoreLoaded) return store
  Object.assign(store, await asyncObjContruct({
    profile: apiClient.get('/profile')
  }))
  isStoreLoaded = true
  return store
}
