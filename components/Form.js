import { Component, PropTypes } from 'react'

class Form extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  render () {
    return (
      <div className='row form'>
        {this.props.children}
        <style jsx>{`
          .form {
            background-color: white;
          }
        `}</style>
      </div>
    )
  }
}

class FormItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    type: PropTypes.string
  }

  render () {
    return this.props.type !== 'buttons'
        ? <div className='col-xs-12 row wrapper'>
          <label className='col-xs-12 col-sm-6 row end-sm middle-xs'>{this.props.title}：</label>
          <div className='col-xs-12 col-sm-6'>{this.props.children}</div>
          <style jsx>{`
            label {
              font-size: 14px;
            }
            .wrapper {
              padding-top: 5px;
              padding-bottom: 5px;
            }
          `}</style>
        </div>
        : <div className='col-xs-12 row center-sm'>
          <div className='col-sm-1 col-xs-6'>{this.props.children}</div>
        </div>
  }
}

Form.Item = FormItem

export default Form
