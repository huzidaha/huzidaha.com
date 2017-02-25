import { Component, PropTypes } from 'react'
import Link from 'next/link'
import { getStateFromSchemas, core } from './forms/core'
import { wrapWithAlertError } from '../../common/utils'

export default class extends Component {
  static propTypes = {
    model: PropTypes.string,
    query: PropTypes.object,
    apiClient: PropTypes.object,
    schemas: PropTypes.array.isRequired
  }

  get _isEditMode () {
    return this.props.query.mode === 'edit' && this.props.query.entryId
  }

  async componentWillMount () {
    this.defaultState = getStateFromSchemas(this.props.schemas)
    const { apiClient, query } = this.props
    this.state = {...this.defaultState}
    if (this._isEditMode && !apiClient.isServer) {
      const model = await apiClient.get(`/courses/${query.entryId}`)
      this.setState(model)
    }
  }

  @wrapWithAlertError
  async handleSaveOrCreate () {
    const { apiClient } = this.props
    if (this._isEditMode) {
      await apiClient.put(
        `/${this.props.model}/${this.state._id}`,
        {...this.state}
      )
    } else {
      await apiClient.post(
        `/${this.props.model}/`,
        {...this.state}
      )
      this.setState({...this.defaultState})
    }
    alert('OK')
  }

  render () {
    return (
      <div>
        {core.createFiledsFromSchema(this, this.props.schemas)}
        <button onClick={::this.handleSaveOrCreate}>
          {this._isEditMode ? '保存' : '创建'}
        </button>
      </div>
    )
  }
}
