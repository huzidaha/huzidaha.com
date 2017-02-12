import { Component, PropTypes } from 'react'
import Link from 'next/link'
import Page from '../components/page.js'
import apiClient from '../common/apiClient'
import Avatar from '../components/avatar'
import Profile from '../components/profile'
import PostDate from '../components/postDate'
import { asyncObjContructWithStore } from '../common/utils'
import { getStore } from '../common/store'

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
    return await asyncObjContructWithStore({
      posts: apiClient.get('/posts')
    })
  }

  static propTypes = {
    posts: PropTypes.array,
    profile: PropTypes.object,
    store: PropTypes.object
  }

  render () {
    const { store: { profile } } = this.props
    return (
      <Page>
        <div className='content-wrapper'>
          <div className='main'>
            {this.props.posts.map((post) => {
              return <PostSummary key={post._id} post={post} />
            })}
          </div>
          <div className='sidebar'>
            <Profile profile={profile} />
          </div>
        </div>
      </Page>
    )
  }
}
