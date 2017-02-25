import { Component, PropTypes } from 'react'
import Page from '../../components/Page'
import { connectAll, asyncObjContruct } from '../../common/utils'
import List from '../../components/crud/List'

@connectAll()
export default class extends Component {
  static async getInitialProps ({ apiClient }) {
    return { apiClient, model: 'courses' }
  }

  render () {
    return (
      <Page>
        <List {...this.props} />
      </Page>
    )
  }
}
