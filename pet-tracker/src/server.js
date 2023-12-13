const express = require('express');
const path = require('path');
const router = require('./routes')
const addModels = require('./db/middleware/addModels')

const app = express()
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1'


const publicDir = path.join(__dirname, '..', 'public');
const staticServer = express.static(publicDir);
app.use(staticServer);

app.use(express.json())
app.use(addModels)
app.use(router)


app.listen(port, () => {
    console.log(`Server is now running on http://${host}:${port}`)
})