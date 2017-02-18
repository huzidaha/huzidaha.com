const GET_MY_PROFILE = 'users/GET_MY_PROFILE'
const LOGIN = 'users/LOGIN'
const LOGOUT = 'users/LOGOUT'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE:
    case LOGIN:
      return {
        ...state,
        myProfile: action.result
      }
    case LOGOUT:
      return {
        ...state,
        myProfile: null
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
  promise: async (apiClient, dispatch) => {
    return apiClient.post('/users/login', { email, password })
  }
})

export const logout = () => ({
  type: LOGOUT,
  promise: async (apiClient) => {
    return apiClient.post('/users/logout')
  }
})
