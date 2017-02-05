import test from 'ava'
import { funcArgs } from '../fp'
import _ from 'ramda'

test('测试将函数参数函数化', (t) => {
  const op = funcArgs((a, b, c) => a * b - c)
  const result = op(_.inc, _.dec, _.multiply(2))
  t.is(result(3), 2)
})
