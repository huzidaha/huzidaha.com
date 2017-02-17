const GET_HUZIDAHA_PROFILE_SUCCESS = 'huzidahaProfile/GET_HUZIDAHA_PROFILE'

export default (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_HUZIDAHA_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.result
      }
    default:
      return state
  }
}

export const getHuzidahaProfile = () => {
  return {
    type: GET_HUZIDAHA_PROFILE_SUCCESS,
    promise: (apiClient) => apiClient.get('/profile')
  }
}
