import Post from '../../models/post'
import Tag from '../../models/tag'

const init = async () => {
  const tag = Tag.findOne({})
  const contentPrototype = 'This is a very long content of this post'.repeat(80)
  const content = (i) => `${i} - ${contentPrototype}`
  const summaryPrototype = contentPrototype.slice(100)
  const summary = (i) => `${i} - Fuck you sumary of - ${summaryPrototype}`
  const title = (i) => `${i} - This is the fucking title`
  for (var i = 0; i < 1000; i++) {
    try {
      await Post.create({
        title: title(i),
        content: content(i),
        tag: tag._id,
        summary: summary(i)
      })
    } catch (e) {
      console.log(e, 'fuckTheWorld.')
    }
  }
}

init()
