import { Component, PropTypes } from 'react'
import Page from '../components/page.js'
import s from '../common/styles.js'
import apiClient from '../common/apiClient'
import Link from 'next/link'
import Avatar from '../components/avatar'

export class PostSummary extends Component {
  static propTypes = {
    post: PropTypes.object
  }

  render () {
    const { post } = this.props
    const contentHeight = 112
    return (
      <div style={{
        height: '160px',
        padding: '15px 0',
        borderBottom: s.seperator
      }}>
        <div style={{ display: 'flex', marginBottom: 18 }}>
          <div style={{
            display: 'flex',
            backgroundSize: 'cover',
            backgroundColor: '#f7f7f7',
            backgroundImage: `url(${post.cover})`,
            width: '200px',
            height: contentHeight,
            marginRight: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#CCCCCC',
            fontSize: '12px',
            border: '#fff 0.5em solid',
            boxShadow: 'rgba(0,0,0,0.15) 0 1px 4px',
            flexShrink: 0
          }}>{ post.cover ? null : '暂无封面图片' }</div>
          <div style={{
            height: contentHeight + 10,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h1 style={{ marginBottom: '10px' }}>
              <a href={`/posts/detail?postId=${post._id}`} target='_blank'>{post.title}</a>
            </h1>
            <p style={{
              fontSize: '13px',
              lineHeight: '20px',
              display: 'flex',
              flex: 1,
              textOverflow: 'ellipsis'
            }}>{post.summary}</p>
          </div>
        </div>
        <div>
          <Avatar size={20} src={post.creatorAvatarUrl} />
          <span></span>
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
        <div style={{
          maxWidth: '700px',
          width: '90%',
          background: '#FFFFFF',
          margin: '15px auto',
          padding: '0 15px'
        }}>
          {this.props.posts.map((post) => {
            return <PostSummary key={post._id} post={post} />
          })}
        </div>
      </Page>
    )
  }
}
