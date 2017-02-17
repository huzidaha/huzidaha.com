import { Component, PropTypes } from 'react'
import Button from './Button'
import Form from './Form'
import { twoWayBinding, wrapWithAlertError } from '../common/utils'
import apiClient from '../common/apiClient'

const FormItem = Form.Item

export default class SignupForm extends Component {
  static propTypes = {
    onSignupSuccess: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleSumit = wrapWithAlertError(async () => {
    const ret = await apiClient.post('/users', this.state)
    if (this.props.onSignupSuccess) {
      this.props.onSignupSuccess(ret)
    }
  })

  render () {
    const dataBinder = twoWayBinding(this)
    return (
      <Form>
        <FormItem title='用户名'>
          <input placeholder='' {...dataBinder('username')} />
        </FormItem>
        <FormItem title='邮箱'>
          <input placeholder='' {...dataBinder('email')} />
        </FormItem>
        <FormItem title='密码'>
          <input placeholder='' type='password' {...dataBinder('password')} />
        </FormItem>
        <FormItem type='buttons'>
          <Button title='注册' onClick={::this.handleSumit} />
          <div className='login'>已有账号，登录</div>
        </FormItem>
        <style jsx>{`
          .login {
            font-size: 13px;
          }
        `}</style>
      </Form>
    )
  }
}
