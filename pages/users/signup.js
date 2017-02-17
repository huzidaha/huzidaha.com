import { Component, PropTypes } from 'react'
import Page from '../../components/Page'
import SignupForm from '../../components/SignupForm'
import { connectApiClient } from '../../common/apiClient'

class Signup extends Component {
  render () {
    return (
      <Page>
        <SignupForm />
      </Page>
    )
  }
}

export default connectApiClient(Signup)
