import { Component, PropTypes } from 'react'
import Link from 'next/link'
import _ from 'ramda'
import Page from '../../../components/Page'
import { wrapWithAlertError, twoWayBinding, connectAll } from '../../../common/utils'
import { Either } from 'ramda-fantasy'

const defaultPostState = {
  title: '',
  content: '',
  cover: '',
  tag: '',
  creatorAvatarUrl: '',
  summary: ''
}

@connectAll(null, null)
export default class CreatePosts extends Component {
  static async getInitialProps ({ query, apiClient }) {
    return {
      tags: await apiClient.get('/tags?offset=0&limit=100000'),
      post: query.postId
        ? await apiClient.get(`/posts/${query.postId}`)
        : null
    }
  }

  static propTypes = {
    tags: PropTypes.array,
    post: PropTypes.object,
    apiClient: PropTypes.object
  }

  constructor () {
    super()
    this.state = {
      post: { ...defaultPostState }
    }
  }

  componentWillMount () {
    this.setState({
      tags: this.props.tags,
      post: this.props.post || this.state.post
    })
  }

  get _isUpdate () {
    return !!this.props.post
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
        _.map(::this.sendPost)
      )
    )
    sendOrAlert(this.state.post)
  }

  @wrapWithAlertError
  async sendPost (post) {
    const { apiClient } = this.props
    if (this._isUpdate) {
      await apiClient.put(`/posts/${post._id}`, post)
    } else {
      await apiClient.post('/posts', post)
      this.setState({ ...defaultPostState })
    }
    alert('OK')
  }

  render () {
    const dataBinder = twoWayBinding(this)
    return (
      <Page>
        <div>标题：<input {...dataBinder('post.title')} /></div>
        <div>封面<input {...dataBinder('post.cover')} /></div>
        <div>摘要<input {...dataBinder('post.summary')} /></div>
        <div>创建者头像<input {...dataBinder('post.creatorAvatarUrl')} /></div>
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
          <Link href='/blog/tags/list'>
            <a>修改标签</a>
          </Link>
        </div>
        <button onClick={this.createPost.bind(this)}>
          {this._isUpdate ? '修改' : '新增'}
        </button>
      </Page>
    )
  }
}
