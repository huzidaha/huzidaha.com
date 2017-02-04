import { Component, PropTypes } from 'react'
import _ from 'ramda'
import Link from 'next/link'
import moment from 'moment'
import apiClient from '../../common/apiClient'
import Page from '../../components/page.js'
import { wrapWithAlertError, makeEntityDate } from '../../common/utils'

export default class extends Component {
  static async getInitialProps () {
    return {
      posts: await apiClient.get('/posts')
    }
  }

  static propTypes = {
    posts: PropTypes.array
  }

  componentWillMount () {
    this.state = {
      posts: this.props.posts
    }
  }

  handleDeletePost = wrapWithAlertError((post, index) => {
    const deletePost = async (post) => {
      await apiClient.delete(`/posts/${post._id}`)
      this.setState({ posts: _.remove(index, 1, this.state.posts) })
    }
    const alwaysConfirm = (word) => () => confirm(word)
    const confirmDeletePost = _.ifElse(
      alwaysConfirm('确定要删除该文章吗？'),
      deletePost,
      _.F
    )
    confirmDeletePost(post)
  })

  render () {
    return (
      <Page>
        <ul>
          {this.state.posts.map((post, i) => {
            return (
              <li key={post._id}>
                <span>{i + 1}. </span>
                <span>{post.title}</span>
                <span> 生产日期：{makeEntityDate(post.createdAt)}</span>
                <span> 加工日期：{makeEntityDate(post.updatedAt)}</span>
                <button onClick={this.handleDeletePost.bind(this, post, i)}>Delete</button>
              </li>
            )
          })}
        </ul>
      </Page>
    )
  }
}
