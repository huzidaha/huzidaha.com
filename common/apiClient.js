import { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { BACKEND_URL } from '../config'

const methods = ['get', 'post', 'put', 'patch', 'delete']

const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  return `${BACKEND_URL}/api${adjustedPath}`
}

const makeGetUrl = (path, params) => {
  if (params) {
    let uri = `${path}?`
    for (let key of Object.keys(params)) {
      uri += `${key}=${encodeURIComponent(params[key])}&`
    }
    return uri
  } else {
    return path
  }
}

export class ApiClient {
  constructor (req) {
    this.isServer = !!req
    methods.forEach((method) => {
      this[method] = async (path, params) => {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        if (req) {
          headers['Cookie'] = req.headers.cookie
        }
        try {
          let uri
          if (method === 'get') {
            uri = makeGetUrl(formatUrl(path), params)
          } else {
            uri = formatUrl(path)
          }
          const res = await fetch(uri, {
            method,
            headers,
            credentials: 'same-origin',
            body: method === 'get' ? null : JSON.stringify(params)
          })
          if (res.status === 200 || res.status === 201) {
            const json = await res.json()
            return Promise.resolve(json.data)
          } else if (res.status === 401) {
            return Promise.reject('未授权的访问')
          } else {
            let json
            try {
              json = await res.json()
            } catch (e) {
              return Promise.reject('遭遇服务异常')
            }
            if (json.message) {
              return Promise.reject(json.message)
            } else {
              return Promise.reject('遭遇服务异常')
            }
          }
        } catch (e) {
          console.log(e)
          return Promise.reject('网络连接错误')
        }
      }
    })
  }
}

let apiClient = null

const isApiClient = (apiClient) => {
  return apiClient.get && apiClient.post && apiClient.delete && apiClient.put && apiClient.patch
}

export const connectApiClient = (PageComponent) => {
  return class extends Component {
    static propTypes = {
      apiClient: PropTypes.object
    }

    static async getInitialProps (ctx) {
      const { req } = ctx
      const isServer = !!req
      if (isServer) {
        ctx.apiClient = new ApiClient(req)
      } else {
        if (!apiClient) {
          apiClient = new ApiClient()
        }
        ctx.apiClient = apiClient
      }
      const props = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {}
      props.apiClient = ctx.apiClient
      return props
    }

    constructor (props) {
      super(props)
      if (!apiClient) {
        apiClient = new ApiClient()
      }
    }

    render () {
      return !isApiClient(this.props.apiClient)
        ? <PageComponent {...this.props} apiClient={apiClient} />
        : <PageComponent {...this.props} />
    }
  }
}

export default new ApiClient()
