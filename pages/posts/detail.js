import { Component, PropTypes } from 'react'
import Link from 'next/link'
import _ from 'ramda'
import Page from '../../components/page.js'
import { twoWayBinding } from '../../common/utils'
import apiClient from '../../common/apiClient'
import { wrapWithAlertError } from '../../common/utils'
import moment from 'moment'
import { makeEntityDate } from '../../common/utils'
import Avatar from '../../components/avatar'
import hljs from 'highlight.js'

export default class extends Component {
  static async getInitialProps ({ query }) {
    return {
      post: await apiClient.get(`/posts/${query.postId}?useMarkdownContent=true`)
    }
  }

  static propTypes = {
    post: PropTypes.object
  }

  componentDidMount () {
    /* 代码高亮 */
    Array.from(this.refs['post-content'].querySelectorAll('pre')).map((pre) => {
      hljs.highlightBlock(pre)
    })
  }

  render () {
    const post = this.props.post
    const padding = 20
    const borderStyle = '1px solid #EDEDED'
    const dateStyle = { fontStyle: 'none', fontWeight: 'lighter' }
    return (
      <Page>
        <div style={{
          margin: '20px auto',
          maxWidth: '750px',
          width: '86%',
          border: borderStyle,
          lineHeight: '1.4rem',
          fontSize: '14px',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ padding, borderBottom: borderStyle }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {post.title}
            </h1>
            <div style={{
              marginTop: '10px',
              fontSize: '12px',
              color: '#9D9D9D',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Avatar size={20} src='/static/right.jpeg' />
              <span style={{ margin: '0 10px' }}>
                <span>发布于 </span>
                <span style={dateStyle}>{makeEntityDate(post.createdAt)}</span>
              </span>
              <span>
                <span>更新于 </span>
                <span style={dateStyle}>{makeEntityDate(post.updatedAt)}</span>
              </span>
            </div>
          </div>
          <div ref='post-content' style={{ padding }} className='post-content' dangerouslySetInnerHTML={{__html: post.markdownContent}} />
        </div>
      </Page>
    )
  }
}
