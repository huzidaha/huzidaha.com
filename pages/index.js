import { Component, PropTypes } from 'react'
import Link from 'next/link'
import Head from 'next/head'
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
      <div className='post-summary'>
        <div className='upstairs'>
          <div className='post-cover' style={{
            backgroundImage: post.cover ? `url(${post.cover})` : 'none'
          }}>{ post.cover ? null : '暂无封面图片' }</div>
          <div className='post-title-and-content'>
            <h1>
              <Link href={`/blog/posts/detail?postId=${post._id}`}><a>{post.title}</a></Link>
            </h1>
            <p>{post.summary ? post.summary.slice(0, 100) + '...' : '暂无内容摘要'}</p>
          </div>
        </div>
        <div className='downstairs'>
          <PostDate post={post} />
        </div>
        <style jsx>{`
          .post-summary {
            padding: 0 10px;
            min-height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;;
            border-bottom: 1px solid #f0f2f7;
          }
          .upstairs {
            display: flex;
            padding-top: 10px;
            flex: 1;
            align-items: center;
          }
          .post-cover {
            display: flex;
            background-color: #f7f7f7;
            justify-content: center;
            align-items: center;
            height: 110px;
            color: #CCCCCC;
            font-size: 12px;
            border: 0.5em #fff solid;
            box-shadow: rgba(0,0,0,0.15) 0 1px 4px;
            width: 180px;
            background-size: cover;
            margin: 1px 10px 1px 1px;
          }
          .downstairs {
            display: flex;
            padding-left: 4px;
            height: 40px;
            align-items: center;
          }
          .post-title-and-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-self: stretch;
          }
          .post-title-and-content h1 {
            margin-bottom: 5px;
            font-size: 20px;
            line-height: 25px;
          }
          .post-title-and-content p {
            display: flex;
            flex: 1;
            font-size: 13px;
            line-height: 20px;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          @media (max-width: 414px) {
            .post-cover {
              display: none!important;
              width: 0px!important;
              margin: 0!important;
              padding: 0!important;
              border: none!important;
            }
          }
        `}</style>
      </div>
    )
  }
}

@connectAll((state) => ({
  huzidahaProfile: state.huzidahaProfile.profile
}))
export default class Index extends Component {
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
        <Head>
          <title>胡子大哈</title>
          <meta name='description' content='胡子大哈 | 提供专业、快速的 Web 前端技术资讯，有深度、有技术含量的 Web 前端技术文章。外国 Web 前端文章翻译，深入思考 Web 前端技术栈，提供高质量原创文章。' />
        </Head>
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
