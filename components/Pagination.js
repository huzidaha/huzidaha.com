import { Component, PropTypes } from 'react'
import ReactPaginate from 'react-paginate'

export default class extends Component {
  static propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func
  }

  render () {
    const { totalItems, itemsPerPage, currentPage, onPageChange } = this.props
    const label = (name) => <span>{name}</span>
    return (
      <ReactPaginate
        forcePage={currentPage - 1}
        containerClassName='pagination'
        previousLabel={label('前一页')}
        nextLabel={label('后一页')}
        pageCount={Math.ceil(totalItems / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={onPageChange} />
    )
  }
}
