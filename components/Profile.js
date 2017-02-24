import { PropTypes, Component } from 'react'
import Avatar from './Avatar'
import Icon from './Icon'

export default class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object
  }

  render () {
    const { profile } = this.props
    const iconSize = 20
    return (
      <div className='profile'>
        <div className='basic'>
          <Avatar src={profile.avatarUrl} size={60} />
          <span className='name'>{profile.name}</span>
          <span className='signature'>{profile.signature}</span>
        </div>
        <div className='sns'>
          <Icon src='/static/zhihu.png' link='https://www.zhihu.com/people/hu-zi-da-ha' size={iconSize} />
          <Icon src='/static/github.png' link='https://github.com/huzidaha' size={iconSize} />
          <Icon src='/static/weibo.png' link='http://weibo.com/huzidaha' size={iconSize} />
        </div>
        <style jsx>{`
          .profile {
            background-color: #ffffff;
            border: 1px solid #f0f2f7;
          }
          .sns {
            display: flex;
            padding: 8px 20px;
            justify-content: space-around;
          }
          .basic {
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: 1px solid #f0f2f7;
          }
          .name {
            margin: 10px 0;
          }
          .signature {
            font-size: 13px;
            color: #9D9D9D;
            font-style: italic;
          }
        `}</style>
      </div>
    )
  }
}
