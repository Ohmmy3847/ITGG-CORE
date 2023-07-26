require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const { swaggerUi, specs } = require('./utils/swagger')
require('./utils/mongoose')
app.use(cors())
app.use(express.json())
app.use('/docsapi', swaggerUi.serve, swaggerUi.setup(specs));
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`[!] LISTENING ON PORT ${port} 🚀`)
})