const mongoose = require("mongoose");
const database = mongoose.connection;
mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  );
  database.once('connected', () => {
    console.log('[!] Database Connected 😁');
})

module.exports = mongoose