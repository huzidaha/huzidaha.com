import { Component, PropTypes } from 'react'
import s from '../common/styles.js'
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
    const tabItemStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.6)',
      fontSize: '14px',
      flex: '0 0 50px'
    }

    return (
      <div>
        {/* Header */}
        <div className='header'>
          <Link href='/'>
            <a style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img src='/static/logo.png' style={{
                width: '40px',
                height: '40px',
                marginBottom: '3px'
              }} />
              <span style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: s.primaryColor(0.6),
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#ffffff',
                marginLeft: '10px',
                marginRight: '20px'
              }}>
                <span>胡子</span>
                <span>大哈</span>
              </span>
            </a>
          </Link>
          <Link href='/posts/list'>
            <a style={tabItemStyle}>博客</a>
          </Link>
          <Link href='/about'>
            <a style={tabItemStyle}>关于我</a>
          </Link>
          <Link href='/courses'>
            <a style={tabItemStyle}>课程</a>
          </Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}
