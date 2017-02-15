import { Component, PropTypes } from 'react'
import { twoWayBinding, wrapWithAlertError } from '../../common/utils'
import { alwaysAlert } from '../../common/fp'
import Page from '../../components/page.js'
import { connectApiClient } from '../../common/apiClient.js'
import s from '../../common/styles.js'
import _ from 'ramda'

class TagsList extends Component {
  static async getInitialProps (ctx) {
    return {
      tags: await apiClient.get('/tags?offset=0&limit=1000')
    }
  }

  static propTypes = {
    tags: PropTypes.array
  }

  constructor () {
    super()
    this.state = {
      newTag: { name: '' }
    }
  }

  componentWillMount () {
    this.setState({
      tags: this.props.tags
    })
  }

  sendToServerAndRenderThenClear = wrapWithAlertError(async (name) => {
    const tag = await apiClient.post('/tags', { name })
    this.setState({
      tags: _.insert(0, tag, this.state.tags),
      newTag: { name: '' }
    })
  })

  addNewTag = _.pipe(
    _.path(['newTag', 'name']),
    _.ifElse(
      _.anyPass([_.isEmpty, _.isNil]),
      alwaysAlert('不能输入为空的标签'),
      this.sendToServerAndRenderThenClear
    )
  )

  deleteItem = wrapWithAlertError(async (tag, index) => {
    await apiClient.delete(`/tags/${tag._id}`)
    this.setState({
      tags: _.remove(index, 1, this.state.tags)
    })
  })

  render () {
    const dataBinder = twoWayBinding(this)
    return (
      <Page>
        <input {...dataBinder('newTag.name')} />
        <button onClick={this.addNewTag.bind(this, this.state)}>新增</button>
        <ul>
          {this.state.tags.map((tag, i) => {
            return (
              <li key={tag._id}>
                {tag.name}
                <button onClick={this.deleteItem.bind(this, tag, i)}>删除</button>
              </li>
            )
          })}
        </ul>
      </Page>
    )
  }
}

export default connectApiClient(TagsList)
