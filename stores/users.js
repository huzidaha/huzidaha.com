const GET_MY_PROFILE = 'users/GET_MY_PROFILE'
const LOGIN = 'users/LOGIN'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE:
      return {
        ...state,
        myProfile: action.result
      }
    default:
      return state
  }
}

export const getMyProfile = () => ({
  type: GET_MY_PROFILE,
  promise: (apiClient) => apiClient.get('/users/me')
})

export const login = (email, password) => ({
  type: LOGIN,
  promise: (apiClient) => apiClient.post('/users/login', { email, password })
})
