import Joi from 'joi'

export default (value, schema) => {
  return new Promise((resolve, reject) => {
    Joi.validate(value, schema, (err, value) => {
      if (err) reject(err)
      else resolve(value)
    })
  })
}
