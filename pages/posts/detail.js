import { Component, PropTypes } from 'react'
import hljs from 'highlight.js'
import Page from '../../components/Page'
import PostDate from '../../components/PostDate'
import Profile from '../../components/Profile'
import { connectAll, asyncObjContruct } from '../../common/utils'

class PostDetail extends Component {
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
            <Profile profile={huzidahaProfile} />
          </div>
        </div>
      </Page>
    )
  }
}

export default connectAll((state) => ({
  huzidahaProfile: state.huzidahaProfile.profile
}))(PostDetail)
