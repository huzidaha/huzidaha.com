import _ from 'lodash/fp'

export class IO {
  static of (value) {
    return new IO(value)
  }

  constructor (value) {
    this.fn = value
  }

  unsafePerformIO () {
    return this.fn()
  }

  map (f) {
    return IO.of(_.compose(f, this.fn))
  }
}
