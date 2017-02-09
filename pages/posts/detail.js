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

export default class extends Component {
  static async getInitialProps ({ query }) {
    return {
      post: await apiClient.get(`/posts/${query.postId}`)
    }
  }

  static propTypes = {
    post: PropTypes.object
  }

  render () {
    const post = this.props.post
    const padding = 15
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
          <div style={{ padding }} className='post-content' dangerouslySetInnerHTML={{__html: post.markdownContent}} />
        </div>
      </Page>
    )
  }
}
