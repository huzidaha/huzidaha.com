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
    href: PropTypes.string,
    target: PropTypes.string
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
          ? this.props.target
            ? <a href={this.props.href} target={this.props.target}>{this.props.children}</a>
            : <Link href={this.props.href}>
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
            padding: 0 10px;
          }
          a {
            cursor: pointer;
            color: rgba(255,255,255,0.6);
          }
          a:hover {
            color: rgba(255,255,255,0.8);
          }
        `}</style>
      </div>
    )
  }
}

/**
 * 处理用户尝试登出、登录的行为
 */
@connect((state) => ({
  myProfile: state.users.myProfile
}), (dispatch) => ({
  onLogout: async () => {
    if (confirm('确定退出？')) {
      await dispatch(logout())
    }
  }
}))
export class UserInfo extends Component {
  static propTypes = {
    myProfile: PropTypes.object,
    onLogout: PropTypes.func
  }

  @wrapWithAlertError
  async handleClickOnLogout () {
    if (this.props.onLogout && this.props.myProfile) {
      await this.props.onLogout()
    }
  }

  render () {
    const { myProfile: profile } = this.props
    return (
      <MenuItem href={!profile ? '/users/signup' : void 666} onClickOnMenu={::this.handleClickOnLogout}>
        {!profile ? '登录 | 注册' : `${profile.username} | 退出`}
      </MenuItem>
    )
  }
}

/**
 * 总体页面包装
 */
@connect((state) => ({
  myProfile: state.users.myProfile
}))
export default class Page extends Component {
  static propTypes = {
    children: PropTypes.any,
    myProfile: PropTypes.object
  }

  get _isAdmin () {
    return this.props.myProfile && this.props.myProfile.isAdmin
  }

  renderIfAdmin (tag) {
    return this._isAdmin
      ? tag
      : null
  }

  render () {
    return (
      <div>
        {/* Header */}
        <header className='header row center-xs'>
          <div className='inner-header col-xs-12 col-sm-11 col-md-10 col-lg-9 row start-xs'>
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
            <MenuItem href='http://react.huziketang.com' target='_blank'>
              React.js 小书 <img src='/static/hot.png' />
            </MenuItem>
            {this.renderIfAdmin(<MenuItem href='/static/egghead/egghead.html' target='_blank'>胡子课堂</MenuItem>)}
            {this.renderIfAdmin(<MenuItem href='/blog/posts/list'>文章管理</MenuItem>)}
            {this.renderIfAdmin(<MenuItem href='/blog/tags/list'>标签管理</MenuItem>)}
            {this.renderIfAdmin(<MenuItem href='/courses/list'>课程管理</MenuItem>)}
          </div>
        </header>
        {this.props.children}
        <div className='footer'>
          Copyright © 深圳市云彦腾科技有限责任公司&nbsp;|&nbsp;
          <a href='http://www.miitbeian.gov.cn' target='_blank'>粤ICP备17021550-2号</a>
        </div>
        <style jsx>{`
          header {
            background: #1b1920;
            height: 60px;
          }
          .inner-header {
            width: 100%;
            max-width: 1000px;
          }
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
          .footer {
            display: flex;
            height: 100px;
            width: 100%;
            background-color: #fff;
            justify-content: center;
            align-items: center;
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }
}
