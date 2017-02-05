import _ from 'ramda'
// import { funcArgs } from './fp'
// import { log } from './fp'

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
   _.converge(_.divide, [totalItemsCount, itemsPerPage]),
   parseInt
)

const remainPageCount = _.ifElse(
  _.pipe(_.converge(_.modulo, [totalItemsCount, itemsPerPage]), _.equals(0)),
  _.always(0),
  _.always(1)
)

export const pageCount = _.converge(
  _.add, [dividePerPageByTotalItems, remainPageCount]
)

const incPage = _.pipe(currentPage, _.inc)
const decPage = _.pipe(currentPage, _.dec)

export const nextPage = _.ifElse(
  _.converge(_.gt, [incPage, pageCount]),
  currentPage, incPage
)

export const prevPage = _.ifElse(
  _.pipe(decPage, _.gte(1)),
  _.always(1), decPage
)

export const nextPagePagination = _.converge(createPagination, [
  totalItemsCount,
  itemsPerPage,
  nextPage
])

export const prevPagePagination = _.converge(createPagination, [
  totalItemsCount,
  itemsPerPage,
  prevPage
])

export const jumpToPagePagination = _.curry((pagination, page) => createPagination(
  totalItemsCount(pagination),
  itemsPerPage(pagination),
  _.clamp(1, pageCount(pagination), page)
))
