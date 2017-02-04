import _ from 'ramda'

/**
 * 在不使用类和变量的情况下打造一个分页组件
 * 盲目追求 PointFree Style 会导致可读性变得很差
 */

export const createPagination = _.curry((total, itemsPerPage = 10, currentPage = 1) => (fn) => {
  return fn(total, itemsPerPage, currentPage)
})

export const totalItemsCount = (pagination) => {
  return pagination((total, itemsPerPage, currentPage) => total)
}

export const itemsPerPage = (pagination) => {
  return pagination((total, itemsPerPage, currentPage) => itemsPerPage)
}

export const currentPage = (pagination) => {
  return pagination((total, itemsPerPage, currentPage) => currentPage)
}

const dividePerPageByTotalItems = _.pipe(
   _.converage(_.divide, [totalItemsCount, itemsPerPage]),
   parseInt
)

const remainPageCount = _.ifElse(
  _.pipe(_.converage(_.modulo, [totalItemsCount, itemsPerPage]), _.equals(0)),
  _.always(0),
  _.always(1)
)

export const pageCount = _.converage(
  _.add, [dividePerPageByTotalItems, remainPageCount]
)

const incPage = _.pipe(currentPage, _.inc)
const decPage = _.pipe(currentPage, _.dec)

export const nextPage = _.ifElse(
  _.converage(_.gt, [incPage, currentPage]),
  currentPage, incPage
)

export const prevPage = _.ifElse(
  _.pipe(decPage, _.lt(1)),
  _.always(1), decPage
)
