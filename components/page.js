import { Component, PropTypes } from 'react'
import { fadePrimaryColor } from '../common/styles.js'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class extends Component {
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
              <img src='/static/logo.png' className='logo' />
              <span className='stamp'>
                <span>胡子</span>
                <span>大哈</span>
              </span>
            </a>
          </Link>
          <Link href='/about'>
            <a className='tab-item'>关于我</a>
          </Link>
          <Link href='/courses'>
            <a className='tab-item'>课程</a>
          </Link>
          <Link href='/users/signup'>
            <a className='tab-item'>登录/注册</a>
          </Link>
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
            margin-left: 10px;
            margin-right: 20px;
          }
          .logo {
            width: 40px;
            height: 40px;
            marginBottom: 3px;
          }
          .tab-item {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,0.6);
            font-size: 14px;
            flex: 0 0 50px;
          }
        `}</style>
      </div>
    )
  }
}
