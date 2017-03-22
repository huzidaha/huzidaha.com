import { Component, PropTypes } from 'react'
import Link from 'next/link'
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

  @wrapWithAlertError
  async handleSumit () {
    const ret = await apiClient.post('/users', this.state)
    if (this.props.onSignupSuccess) {
      this.props.onSignupSuccess(ret)
    }
  }

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
          <Link className='login' href='/blog/users/login'><a>马上登录</a></Link>
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
