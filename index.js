require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const { swaggerUi, specs } = require('./utils/swagger')
app.use(express.json())
app.use('/docsapi', swaggerUi.serve, swaggerUi.setup(specs));
require('./utils/mongoose')

app.listen(port, () => {
  console.log(`[!] LISTENING ON PORT ${port} 🚀`)
})