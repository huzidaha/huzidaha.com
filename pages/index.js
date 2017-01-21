import { Component } from 'react'
import Page from '../components/page.js'
import s from '../common/styles.js'

export default class extends Component {
  render () {
    return (
      <Page>
        <div style={{color: s.primaryColor()}}>
          FUCK
        </div>
      </Page>
    )
  }
}
