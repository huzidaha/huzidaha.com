import { Component, PropTypes } from 'react'

export default class extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
  }

  handleClickButton (event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render () {
    return (
      <div className='button' onClick={::this.handleClickButton}>
        {this.props.title}
        <style jsx>{`
          .button {
            width: 100%;
            text-align: center;
            background: red;
            color: white;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}
