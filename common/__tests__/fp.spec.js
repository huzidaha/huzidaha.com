import test from 'ava'
import { funcArgs, extractPropsApplyFunc } from '../fp'
import _ from 'ramda'

test('测试将函数参数函数化', (t) => {
  const op = funcArgs((a, b, c) => a * b - c)
  const result = op(_.inc, _.dec, _.multiply(2))
  t.is(result(3), 2)
})

test('把对象props解出来传入函数当中', (t) => {
  const plusXy = extractPropsApplyFunc(['x', 'y'], (x, y) => x + y)
  t.is(plusXy({
    x: 1, y: 2
  }), 3)
})
