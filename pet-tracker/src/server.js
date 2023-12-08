const express = require('express');
const path = require('path');

const app = express()
const port = 5500


const publicDir = path.join(__dirname, '..', 'public');
const staticServer = express.static(publicDir);
app.use(staticServer);

app.use(express.json())


app.get('/', (req, res) => {
    res.send('wassgood gang')
})


app.listen(port, () => {
    console.log(`running good on ${port}`)
})