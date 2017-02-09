import { Component, PropTypes } from 'react'

export default class extends Component {
  static propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    size: 40
  }

  render () {
    return (
      <img src={this.props.src} style={{
        height: `${this.props.size}px`,
        width: `${this.props.size}px`,
        border: '1px solid #CCCCCC',
        borderRadius: '3px',
        ...this.props.style
      }} />
    )
  }
}
