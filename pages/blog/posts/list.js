import { Component, PropTypes } from 'react'
import _ from 'ramda'
import Link from 'next/link'
import Page from '../../../components/Page'
import { wrapWithAlertError, makeEntityDate, connectAll } from '../../../common/utils'

@connectAll()
export default class PostsList extends Component {
  static async getInitialProps ({ apiClient, query }) {
    const { offset, limit } = query
    return {
      posts: await apiClient.get(`/posts?offset=${offset}&limit=${limit}`)
    }
  }

  static propTypes = {
    posts: PropTypes.array,
    apiClient: PropTypes.object
  }

  componentWillMount () {
    this.state = {
      posts: this.props.posts
    }
  }

  @wrapWithAlertError
  async handleDeletePost (post, index) {
    const { apiClient } = this.props
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
  }

  render () {
    return (
      <Page>
        <Link href='/blog/posts/create'>
          <a>新建</a>
        </Link>
        <ul>
          {this.state.posts.map((post, i) => {
            return (
              <li key={post._id}>
                <Link href={`/blog/posts/detail?postId=${post._id}`}>
                  <a>
                    <span>{i + 1}. </span>
                    <span>{post.title}</span>
                    <span> 生产日期：{makeEntityDate(post.createdAt)}</span>
                    <span> 加工日期：{makeEntityDate(post.updatedAt)}</span>
                  </a>
                </Link>
                <button>
                  <Link href={`/blog/posts/create?postId=${post._id}`}>
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
