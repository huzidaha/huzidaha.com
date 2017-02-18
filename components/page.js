import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fadePrimaryColor } from '../common/styles.js'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    href: PropTypes.string
  }

  render () {
    return (
      <div className='tab-item'>
        <Link href={this.props.href}>
          <a>{this.props.children}</a>
        </Link>
        <style>{`
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

class UserInfo extends Component {
  static propTypes = {
    myProfile: PropTypes.object
  }

  render () {
    return (
      <MenuItem href='/users/signup'>登录 | 注册</MenuItem>
    )
  }
}

UserInfo = connect((state) => ({
  myProfile: state.users.myProfile
}))(UserInfo)

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
          <MenuItem href='/about'>关于我</MenuItem>
          <MenuItem href='/courses'>课程</MenuItem>
          <UserInfo />
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
