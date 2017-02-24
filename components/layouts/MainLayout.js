import { Component, PropTypes } from 'react'

export default class extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any
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
            <div className='col-xs-12 mainContent'>{this.props.children[0] || this.props.children}</div>
          </div>
          {this.props.children[1]
            ? <div className='col-xs-12 col-sm-3 sidebarDiv'>{this.props.children[1]}</div>
            : null
          }
        </div>
        <style jsx>{`
          .innerWrapper {
            max-width: 1000px;
            width: 100%;
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
