import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import { wrapWithAlertError } from '../common/utils'
import { fadePrimaryColor } from '../common/styles'
import { logout } from '../stores/users'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    onClickOnMenu: PropTypes.func,
    href: PropTypes.string
  }

  handleClickOnMenu () {
    if (this.props.onClickOnMenu) {
      this.props.onClickOnMenu()
    }
  }

  render () {
    return (
      <div className='tab-item' onClick={::this.handleClickOnMenu}>
        {this.props.href
          ? <Link href={this.props.href}>
            <a>{this.props.children}</a>
          </Link>
          : <a>{this.props.children}</a>
        }
        <style jsx>{`
          .tab-item {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            white-space: nowrap;
            flex: 0 0 50px;
          }
          a {
            cursor: pointer;
            color: rgba(255,255,255,0.6);
          }
          a:hover {
            color: rgba(255,255,255,0.6);
          }
        `}</style>
      </div>
    )
  }
}

/**
 * 处理用户尝试登出、登录的行为
 */
export class UserInfo extends Component {
  static propTypes = {
    myProfile: PropTypes.object,
    onLogout: PropTypes.func
  }

  handleClickOnLogout = wrapWithAlertError(async () => {
    if (this.props.onLogout && this.props.myProfile) {
      await this.props.onLogout()
    }
  })

  render () {
    const { myProfile: profile } = this.props
    return (
      <MenuItem href={!profile ? '/users/signup' : void 666} onClickOnMenu={::this.handleClickOnLogout}>
        {!profile ? '登录 | 注册' : `${profile.username} | 退出`}
      </MenuItem>
    )
  }
}

UserInfo = connect((state) => ({
  myProfile: state.users.myProfile
}), (dispatch) => ({
  onLogout: async () => {
    if (confirm('确定退出？')) {
      await dispatch(logout())
    }
  }
}))(UserInfo)

/**
 * 总体页面包装
 */
export default class Page extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render () {
    return (
      <div>
        {/* Header */}
        <div className='header'>
          <Link href='/'>
            <a className='home'>
              {/* <img src='/static/huzidaha-logo.png' className='logo' /> */}
              <span className='stamp'>
                <span>胡子</span>
                <span>大哈</span>
              </span>
            </a>
          </Link>
          <MenuItem href='/'>博客</MenuItem>
        </div>
        {this.props.children}
        <style jsx>{`
          .home {
            display: flex;
            align-items: center;
          }
          .stamp {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: ${fadePrimaryColor};
            width: 32px;
            height: 32px;
            border-radius: 4px;
            font-size: 12px;
            color: #ffffff;
            margin-right: 10px;
            margin-left: 5px;
          }
          .logo {
            width: 40px;
            margin-bottom: 3px;
          }
        `}</style>
      </div>
    )
  }
}
