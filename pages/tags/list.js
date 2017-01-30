import { Component, PropTypes } from 'react'
import Page from '../../components/page.js'
import apiClient from '../../common/apiClient.js'
import s from '../../common/styles.js'

export default class extends Component {
  static propTypes = {
    tags: PropTypes.array
  }

  static async getInitialProps (ctx) {
    return {
      tags: await apiClient.get('/tags')
    }
  }

  render () {
    const { tags } = this.props
    return (
      <Page>
        {tags.map((tag) => {
          return (
            <span>{tag.name}</span>
          )
        })}
      </Page>
    )
  }
}
