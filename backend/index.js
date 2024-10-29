const express = require("express");
const { router } = require("./routes");
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())
// app.use(express.urlencoded())

app.use('/api/v1', router)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})