const s = (style) => style

s.primaryColor = (opacity = 1) => `rgba(237, 29, 31, ${opacity})`
s.seperator = '1px solid #f0f2f7'

export const fadePrimaryColor = `rgba(237, 29, 31, 0.6)`

export default s
