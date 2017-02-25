import { Component, PropTypes } from 'react'
import Page from '../../../components/Page'
import LoginForm from '../../../components/LoginForm'
import { connectAll } from '../../../common/utils'

@connectAll(null, null)
export default class Login extends Component {
  render () {
    return (
      <Page>
        <LoginForm />
      </Page>
    )
  }
}
