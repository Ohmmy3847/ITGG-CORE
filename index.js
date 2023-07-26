require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const { swaggerUi, specs } = require('./utils/swagger')
require('./utils/mongoose')
var allowlist = ['http://localhost:8888', 'https://itgg.iservkmitl.tech', 'https://itgg-core.iservkmitl.tech']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))
app.use(express.json())
app.use('/docsapi', swaggerUi.serve, swaggerUi.setup(specs));
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`[!] LISTENING ON PORT ${port} 🚀`)
})