import { Component, PropTypes } from 'react'
import Page from '../components/Page'
import { connectAll } from '../common/utils'

@connectAll()
export default class extends Component {
  render () {
    return (
      <Page>
        <div>OK</div>
      </Page>
    )
  }
}
