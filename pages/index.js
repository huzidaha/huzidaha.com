import { Component, PropTypes } from 'react'
import Link from 'next/link'
import Page from '../components/Page'
import Profile from '../components/Profile'
import PostDate from '../components/PostDate'
import Pagination from '../components/Pagination'
import { asyncObjContruct, connectAll } from '../common/utils'
import { ITEMS_PER_PAGE } from '../common/constants'
import MainLayout from '../components/layouts/MainLayout'

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

class Index extends Component {
  static async getInitialProps ({ query, apiClient }) {
    const currentPage = query.page * 1 > 0 ? query.page * 1 : 1
    return await asyncObjContruct({
      posts: apiClient.get(`/posts?offset=${(currentPage - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`),
      postsCount: apiClient.get('/posts/count'),
      currentPage
    })
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    posts: PropTypes.array,
    profile: PropTypes.object,
    currentPage: PropTypes.number,
    postsCount: PropTypes.number,
    huzidahaProfile: PropTypes.object,
    url: PropTypes.object
  }

  handlePageChanged (obj) {
    this.props.url.push(`/?page=${obj.selected + 1}`)
    window.scrollTo(0, 0)
  }

  render () {
    const { huzidahaProfile, postsCount, currentPage } = this.props
    return (
      <Page>
        <MainLayout>
          <div>
            {this.props.posts.map((post) => {
              return <PostSummary key={post._id} post={post} />
            })}
            <Pagination
              totalItems={postsCount}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={this.handlePageChanged.bind(this)} />
          </div>
          <Profile profile={huzidahaProfile} />
        </MainLayout>
      </Page>
    )
  }
}

Index = connectAll((state) => ({
  huzidahaProfile: state.huzidahaProfile.profile
}))(Index)

export default Index
