import { app } from './app'

const port = parseInt(process.env['PORT'] || '8080')
const hostname = process.env['HOSTNAME'] || 'localhost'

app.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`)
})