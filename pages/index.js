import { Component, PropTypes } from 'react'
import Page from '../components/page.js'
import s from '../common/styles.js'
import apiClient from '../common/apiClient'
import Link from 'next/link'
import Avatar from '../components/avatar'
import PostDate from '../components/postDate'

export class PostSummary extends Component {
  static propTypes = {
    post: PropTypes.object
  }

  render () {
    const { post } = this.props
    return (
      <div className='postSummary'>
        <div className='postSummary__upstairs'>
          <div className='postCover' style={{
            backgroundImage: post.cover ? `url(${post.cover})` : 'none'
          }}>{ post.cover ? null : '暂无封面图片' }</div>
          <div className='postTitleAndContent'>
            <h1>
              <Link href={`/posts/detail?postId=${post._id}`}><a>{post.title}</a></Link>
            </h1>
            <p>{post.summary ? post.summary.slice(0, 100) + '...' : '暂无内容摘要'}</p>
          </div>
        </div>
        <div className='postSummary__downstairs'>
          <PostDate post={post} />
        </div>
      </div>
    )
  }
}

export default class extends Component {
  static async getInitialProps () {
    return {
      posts: await apiClient.get('/posts')
    }
  }

  static propTypes = {
    posts: PropTypes.array
  }

  render () {
    return (
      <Page>
        <div className='main-block' style={{ border: s.seperator }}>
          {this.props.posts.map((post) => {
            return <PostSummary key={post._id} post={post} />
          })}
        </div>
      </Page>
    )
  }
}
