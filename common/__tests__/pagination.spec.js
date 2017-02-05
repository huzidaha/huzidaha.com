import test from 'ava'
import {
  createPagination,
  nextPage,
  prevPage,
  currentPage,
  pageCount,
  nextPagePagination,
  prevPagePagination,
  jumpToPagePagination
} from '../pagination'

test('测试分页组件功能的正确性', (t) => {
  let pagination = createPagination(100, 10, 1)
  t.is(nextPage(pagination), 2)
  t.is(prevPage(pagination), 1)
  // 下一页功能
  pagination = nextPagePagination(pagination)
  t.is(currentPage(pagination), 2)
  // 上一页功能
  pagination = prevPagePagination(pagination)
  pagination = prevPagePagination(pagination)
  t.is(currentPage(pagination), 1)
  t.is(pageCount(pagination), 10)
  pagination = createPagination(101, 10, 1)
  t.is(pageCount(pagination), 11)
  // 跳转页面
  pagination = jumpToPagePagination(pagination, 5)
  t.is(currentPage(pagination), 5)
  pagination = jumpToPagePagination(pagination, -1)
  t.is(currentPage(pagination), 1)
  pagination = jumpToPagePagination(pagination, 12)
  t.is(currentPage(pagination), 11)
})
