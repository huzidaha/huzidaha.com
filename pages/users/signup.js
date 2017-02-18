import { Component, PropTypes } from 'react'
import Page from '../../components/Page'
import SignupForm from '../../components/SignupForm'
import { connectAll } from '../../common/utils'

class Signup extends Component {
  render () {
    return (
      <Page>
        <SignupForm />
      </Page>
    )
  }
}

export default connectAll()(Signup)
