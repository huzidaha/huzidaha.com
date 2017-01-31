import { Component, PropTypes } from 'react'
import { twoWayBinding } from '../../common/utils'
import Page from '../../components/page.js'
import apiClient from '../../common/apiClient.js'
import s from '../../common/styles.js'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: 'jerry'
      }
    }
  }

  render () {
    const dataBinder = twoWayBinding(this)
    console.log(dataBinder)
    return (
      <Page>
        <input {...dataBinder('user.name')} />
        <span>{this.state.user.name}</span>
      </Page>
    )
  }
}
