const app = require('./app');
const socket = require('./socket')

const server = app.listen(8080, () => {
  console.log('App is running on http://localhost:8080')
})

socket(server)
