import { PropTypes, Component } from 'react'
import Avatar from './avatar'
import Icon from './icon'

export default class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object
  }

  render () {
    const { profile } = this.props
    const iconSize = 20
    return (
      <div className='profile'>
        <div className='profile__basic'>
          <Avatar src={profile.avatarUrl} size={60} />
          <span className='profile__name'>{profile.name}</span>
          <span className='profile__signature'>{profile.signature}</span>
        </div>
        <div className='profile__sns'>
          <Icon src='/static/zhihu.png' link='https://www.zhihu.com/people/hu-zi-da-ha' size={iconSize} />
          <Icon src='/static/github.png' link='https://github.com/huzidaha' size={iconSize} />
          <Icon src='/static/weibo.png' link='http://weibo.com/huzidaha' size={iconSize} />
        </div>
      </div>
    )
  }
}
