import apiClient from './apiClient'
import { asyncObjContruct } from './utils'

export let store = {}

let isStoreLoaded = false

export const getStore = async () => {
  if (isStoreLoaded) return store
  Object.assign(store, await asyncObjContruct({
    profile: apiClient.get('/profile')
  }))
  isStoreLoaded = true
  return store
}
