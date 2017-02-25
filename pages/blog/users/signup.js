import { Component, PropTypes } from 'react'
import Page from '../../../components/Page'
import SignupForm from '../../../components/SignupForm'
import { connectAll } from '../../../common/utils'

@connectAll()
export default class Signup extends Component {
  render () {
    return (
      <Page>
        <SignupForm />
      </Page>
    )
  }
}
