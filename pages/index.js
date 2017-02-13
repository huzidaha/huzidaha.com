import { Component, PropTypes } from 'react'
import Link from 'next/link'
import Page from '../components/page.js'
import apiClient from '../common/apiClient'
import Avatar from '../components/avatar'
import Profile from '../components/profile'
import PostDate from '../components/postDate'
import Pagination from '../components/pagination'
import { asyncObjContructWithStore } from '../common/utils'
import { getStore } from '../common/store'
import { ITEMS_PER_PAGE } from '../common/constants'

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
  static async getInitialProps ({ query }) {
    const currentPage = query.page * 1 > 0 ? query.page * 1 : 1
    return await asyncObjContructWithStore({
      posts: apiClient.get(`/posts?offset=${(currentPage - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`),
      postsCount: apiClient.get('/posts/count'),
      currentPage
    })
  }

  static propTypes = {
    posts: PropTypes.array,
    profile: PropTypes.object,
    currentPage: PropTypes.number,
    postsCount: PropTypes.number,
    store: PropTypes.object
  }

  handlePageChanged (obj) {
    this.props.url.push(`/?page=${obj.selected + 1}`)
    window.scrollTo(0, 0)
  }

  render () {
    const { store: { profile }, postsCount, currentPage } = this.props
    return (
      <Page>
        <div className='content-wrapper'>
          <div className='main'>
            {this.props.posts.map((post) => {
              return <PostSummary key={post._id} post={post} />
            })}
            <Pagination
              totalItems={postsCount}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={this.handlePageChanged.bind(this)}/>
          </div>
          <div className='sidebar'>
            <Profile profile={profile} />
          </div>
        </div>
      </Page>
    )
  }
}
