import { Component, PropTypes } from 'react'

export default class extends Component {
  static propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
    link: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    size: 40
  }

  render () {
    const img = <img src={this.props.src} style={{
      height: `${this.props.size}px`,
      width: `${this.props.size}px`,
      borderRadius: '3px',
      ...this.props.style
    }} />
    return this.props.link
      ? <a href={this.props.link} target='_blank'>{img}</a>
      : img
  }
}
