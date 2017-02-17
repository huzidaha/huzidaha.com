import { Component, PropTypes } from 'react'
import _ from 'ramda'
import Link from 'next/link'
import { connect } from 'react-redux'
import Page from '../../components/Page'
import apiClient, { connectApiClient } from '../../common/apiClient'
import { wrapWithAlertError, makeEntityDate } from '../../common/utils'
import { wrapWithProvider } from '../../stores'

class PostsList extends Component {
  static async getInitialProps ({ apiClient }) {
    return {
      posts: await apiClient.get('/posts')
    }
  }

  static propTypes = {
    fuckyou: PropTypes.object,
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
        <Link>
          <a href='/posts/create'>新建</a>
        </Link>
        <ul>
          {this.state.posts.map((post, i) => {
            return (
              <li key={post._id}>
                <Link href={`/posts/detail?postId=${post._id}`}>
                  <a>
                    <span>{i + 1}. </span>
                    <span>{post.title}</span>
                    <span> 生产日期：{makeEntityDate(post.createdAt)}</span>
                    <span> 加工日期：{makeEntityDate(post.updatedAt)}</span>
                  </a>
                </Link>
                <button>
                  <Link href={`/posts/create?postId=${post._id}`}>
                    <a>Edit</a>
                  </Link>
                </button>
                <button onClick={this.handleDeletePost.bind(this, post, i)}>Delete</button>
              </li>
            )
          })}
        </ul>
      </Page>
    )
  }
}

PostsList = connectApiClient(PostsList)
PostsList = connect((state) => ({}))(PostsList)
PostsList = wrapWithProvider(PostsList)

export default PostsList
