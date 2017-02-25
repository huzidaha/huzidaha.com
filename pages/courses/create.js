import { Component, PropTypes } from 'react'
import Page from '../../components/Page'
import { connectAll, asyncObjContruct } from '../../common/utils'
import Edit from '../../components/crud/Edit'

@connectAll()
export default class extends Component {
  static async getInitialProps (ctx) {
    const { apiClient, query } = ctx
    return {
      apiClient,
      query,
      model: 'courses',
      schemas: [{
        name: '课程名',
        path: 'name',
        type: 'TEXT'
      }]
    }
  }

  render () {
    return (
      <Page>
        <Edit {...this.props} />
      </Page>
    )
  }
}
