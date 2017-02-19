import { Component, PropTypes } from 'react'

export default class extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.array
  }

  handleClickButton (event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render () {
    return (
      <div className='row center-xs wrapperDiv'>
        <div className='col-xs-12 col-sm-11 col-md-10 col-lg-9 row start-xs innerWrapper'>
          <div className='col-xs-12 col-sm-9 row'>
            <div className='col-xs-12 mainContent'>{this.props.children[0]}</div>
          </div>
          <div className='col-xs-12 col-sm-3 sidebarDiv'>{this.props.children[1]}</div>
        </div>
        <style jsx>{`
          .innerWrapper {
            max-width: 1000px;
          }
          .wrapperDiv {
            margin: 20px 0;
          }
          .mainContent {
            background-color: #FFFFFF;
            border: 1px solid #f0f2f7;
          }
          .sidebarDiv {
            padding-left: 5px;
          }
        `}
        </style>
      </div>
    )
  }
}
