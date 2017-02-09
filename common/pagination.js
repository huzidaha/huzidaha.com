import _ from 'ramda'
import { compose2, pickArgN, mergeArgs } from './fp'

/**
 * 在不使用类和变量的情况下打造一个分页组件
 * 盲目追求 PointFree Style 会导致可读性变得很差
 */

const ceil = Math.ceil

export const createPagination = _.curry((total, itemsPerPage, currentPage) => (fn) => {
  return fn(total, itemsPerPage, _.clamp(1, intDiv(total, itemsPerPage), currentPage))
})

export const totalItemsCount = pickArgN(0)
export const itemsPerPage = pickArgN(1)
export const currentPage = pickArgN(2)

const intDiv = compose2(ceil, _.divide)
const incPage = _.compose(_.inc, currentPage)
const decPage = _.compose(_.dec, currentPage)

export const pageCount = _.converge(intDiv, [totalItemsCount, itemsPerPage])
export const jumpToPagePagination = mergeArgs(_.converge(createPagination, [totalItemsCount, itemsPerPage]))
export const nextPagePagination = _.converge(createPagination, [totalItemsCount, itemsPerPage, incPage])
export const prevPagePagination = _.converge(createPagination, [totalItemsCount, itemsPerPage, decPage])
