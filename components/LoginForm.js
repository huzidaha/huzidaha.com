import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Button from './Button'
import Form from './Form'
import { login } from '../stores/users'
import { twoWayBinding, wrapWithAlertError } from '../common/utils'

const FormItem = Form.Item

@connect(null, (dispatch) => {
  return ({
    onClickLogin: ({ email, password }) => dispatch(login(email, password))
  })
})
export default class LoginForm extends Component {
  static propTypes = {
    onClickLogin: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  @wrapWithAlertError
  async handleSumit () {
    if (this.props.onClickLogin) {
      await this.props.onClickLogin(this.state)
    }
  }

  render () {
    const dataBinder = twoWayBinding(this)
    return (
      <Form>
        <FormItem title='邮箱'>
          <input placeholder='' {...dataBinder('email')} />
        </FormItem>
        <FormItem title='密码'>
          <input placeholder='' type='password' {...dataBinder('password')} />
        </FormItem>
        <FormItem type='buttons'>
          <Button title='登录' onClick={::this.handleSumit} />
          <Link className='signup' href='/blog/users/signup'><a>马上注册</a></Link>
        </FormItem>
        <style jsx>{`
          .signup {
            font-size: 13px;
          }
        `}</style>
      </Form>
    )
  }
}
