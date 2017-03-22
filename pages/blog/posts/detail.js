import { Component, PropTypes } from 'react'
import hljs from 'highlight.js'
import Page from '../../../components/Page'
import PostDate from '../../../components/PostDate'
import Profile from '../../../components/Profile'
import { connectAll, asyncObjContruct } from '../../../common/utils'
import MainLayout from '../../../components/layouts/MainLayout'

@connectAll((state) => ({
  huzidahaProfile: state.huzidahaProfile.profile
}))
export default class PostDetail extends Component {
  static propTypes = {
    huzidahaProfile: PropTypes.object,
    post: PropTypes.object
  }

  static async getInitialProps ({ query, apiClient }) {
    return await asyncObjContruct({
      post: apiClient.get(`/posts/${query.postId}?useMarkdownContent=true`)
    }, apiClient)
  }

  componentDidMount () {
    /* 代码高亮 */
    Array.from(this.refs['post-content'].querySelectorAll('pre')).map((pre) => {
      hljs.highlightBlock(pre)
    })
  }

  render () {
    const { huzidahaProfile, post } = this.props
    const padding = 20
    const borderStyle = '1px solid #EDEDED'
    return (
      <Page>
        <MainLayout>
          <div className='post-wrapper'>
            <div style={{ padding, borderBottom: borderStyle }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {post.title}
              </h1>
              <PostDate style={{ marginTop: '15px' }} post={post} />
            </div>
            <div ref='post-content' style={{ padding }} className='post-content' dangerouslySetInnerHTML={{__html: post.markdownContent}} />
          </div>
          <Profile profile={huzidahaProfile} />
        </MainLayout>
      </Page>
    )
  }
}
