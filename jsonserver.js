const env = require('@next/env')

const projectDir = process.cwd()
env.loadEnvConfig(projectDir)

const jsonServer = require('json-server')
const db = require('./mock/_db.js')()
const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(process.env.NEXT_PUBLIC_API_PORT, () => {
    console.log('JSON Server is running')
})