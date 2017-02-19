import { Component, PropTypes } from 'react'
import Avatar from './Avatar'
import { makeEntityDate } from '../common/utils'

export default class extends Component {
  static propTypes = {
    post: PropTypes.object,
    style: PropTypes.object
  }

  render () {
    const { post } = this.props
    const dateStyle = { fontStyle: 'none', fontWeight: 'lighter' }
    return (
      <div style={Object.assign({
        fontSize: '12px',
        color: '#9D9D9D',
        display: 'flex',
        alignItems: 'center'
      }, this.props.style)}>
        {post.creatorAvatarUrl
          ? <Avatar size={20} src={post.creatorAvatarUrl} style={{ marginRight: '10px' }} />
          : null
        }
        <span style={{ marginRight: '10px' }}>
          <span>发布于 </span>
          <span style={dateStyle}>{makeEntityDate(post.createdAt)}</span>
        </span>
        <span>
          <span>更新于 </span>
          <span style={dateStyle}>{makeEntityDate(post.updatedAt)}</span>
        </span>
      </div>
    )
  }
}
