import { Component, PropTypes } from 'react'
import Link from 'next/link'
import { wrapWithAlertError, removeItem } from '../../common/utils'

export default class extends Component {
  static propTypes = {
    model: PropTypes.string,
    apiClient: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { models: [] }
  }

  async componentDidMount () {
    const { apiClient } = this.props
    if (!apiClient.isServer) {
      const models = await apiClient.get(`/${this.props.model}`)
      this.setState({ models })
    }
  }

  @wrapWithAlertError
  async handleDeleteModel (model, index) {
    if (!confirm('确定要删除该项吗？')) return
    const { apiClient } = this.props
    await apiClient.delete(`/courses/${model._id}`)
    this.setState({
      models: removeItem(this.state.models, index)
    })
  }

  render () {
    return (
      <div>
        <button>
          <Link href={`/${this.props.model}/create`}><a>创建</a></Link>
        </button>
        <ul>
          {this.state.models.map((model, index) => {
            return (
              <li key={model._id}>
                {model.name}
                <button
                  onClick={this.handleDeleteModel.bind(this, model, index)}>
                  <a>删除</a>
                </button>
                <button>
                  <Link href={`/${this.props.model}/create?mode=edit&entryId=${model._id}`}>
                    <a>编辑</a>
                  </Link>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
