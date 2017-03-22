export const DEV = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = DEV ? 'http://localhost:3000' : 'http://blog.huziketang.com'
