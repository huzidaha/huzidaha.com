import { Component, PropTypes } from 'react'
import Link from 'next/link'
import _ from 'ramda'
import Page from '../../components/page.js'
import { twoWayBinding } from '../../common/utils'
import apiClient from '../../common/apiClient'
import { wrapWithAlertError } from '../../common/utils'
import { Either } from 'ramda-fantasy'
import { log } from '../../common/fp'

export default class extends Component {
  static async getInitialProps () {
    return {
      tags: await apiClient.get('/tags?offset=0&limit=100000')
    }
  }

  static propTypes = {
    tags: PropTypes.array
  }

  constructor () {
    super()
    this.state = {
      post: {
        title: '',
        content: '',
        tag: ''
      }
    }
  }

  componentWillMount () {
    this.setState({
      tags: this.props.tags
    })
  }

  async createPost () {
    const isEmpty = _.anyPass([_.isEmpty, _.isNil])
    const isPropEmptyMaybe = (prop) => _.ifElse(
      _.pipe(_.prop(prop), isEmpty),
      _.always(Either.Left(`${prop} 的值不能为空`)),
      Either.Right
    )
    const isValidatePost = _.pipe(
      isPropEmptyMaybe('title'),
      _.chain(isPropEmptyMaybe('content')),
      _.chain(isPropEmptyMaybe('tag')),
    )
    const alertProp = (prop) => _.pipe(_.prop(prop), alert)
    const sendOrAlert = _.pipe(
      isValidatePost,
      _.ifElse(
        _.pipe(Either.isLeft),
        alertProp('value'),
        _.map(this.sendPost)
      )
    )
    sendOrAlert(this.state.post)
  }

  sendPost = wrapWithAlertError(async (post) => {
    await apiClient.post('/posts', post)
    alert('OK')
    this.setState({
      post: { title: '', content: '', tag: '' }
    })
  })

  render () {
    const dataBinder = twoWayBinding(this)
    return (
      <Page>
        <div>标题：<input {...dataBinder('post.title')} /></div>
        <div>文章内容：<textarea {...dataBinder('post.content')} /></div>
        <div>文章标签：
          <select {...dataBinder('post.tag')}>
            <option disabled value=''>请选择</option>
            {this.props.tags.map((tag) => {
              return (
                <option key={tag._id} value={tag._id}>{tag.name}</option>
              )
            })}
          </select>
          <Link href='/tags/list'>
            <a>修改标签</a>
          </Link>
        </div>
        <button onClick={::this.createPost}>新增</button>
      </Page>
    )
  }
}
