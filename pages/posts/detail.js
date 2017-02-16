import { Component, PropTypes } from 'react'
import hljs from 'highlight.js'
import Page from '../../components/page.js'
import { connectApiClient } from '../../common/apiClient'
import PostDate from '../../components/postDate'
import Profile from '../../components/profile'
import { asyncObjContructWithStore } from '../../common/utils'

class PostDetail extends Component {
  static async getInitialProps ({ query, apiClient }) {
    return await asyncObjContructWithStore({
      post: apiClient.get(`/posts/${query.postId}?useMarkdownContent=true`)
    }, apiClient)
  }

  static propTypes = {
    store: PropTypes.object,
    post: PropTypes.object
  }

  componentDidMount () {
    /* 代码高亮 */
    Array.from(this.refs['post-content'].querySelectorAll('pre')).map((pre) => {
      hljs.highlightBlock(pre)
    })
  }

  render () {
    const { store: { profile }, post } = this.props
    const padding = 20
    const borderStyle = '1px solid #EDEDED'
    return (
      <Page>
        <div className='content-wrapper'>
          <div className='main post-wrapper'>
            <div style={{ padding, borderBottom: borderStyle }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {post.title}
              </h1>
              <PostDate style={{ marginTop: '15px' }} post={post} />
            </div>
            <div ref='post-content' style={{ padding }} className='post-content' dangerouslySetInnerHTML={{__html: post.markdownContent}} />
          </div>
          <div className='sidebar'>
            <Profile profile={profile} />
          </div>
        </div>
      </Page>
    )
  }
}

export default connectApiClient(PostDetail)
