import { Component, PropTypes } from 'react'
import Page from '../../../components/Page'
import LoginForm from '../../../components/LoginForm'
import { connectAll } from '../../../common/utils'

class Login extends Component {
  render () {
    return (
      <Page>
        <LoginForm />
      </Page>
    )
  }
}

export default connectAll(null, null)(Login)
