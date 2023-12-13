const express = require('express')
const router = express.Router()

async function handlePost(req, res) {
    try {
        if(!req.body.friendly) req.body.friendly = false
        const data = await req.Pet.create(req.body)
        res.send(data).status(200)
    }
    catch (err) {
        console.error(err)
        res.send(err).status(404)
    }
}   

async function handleGet(req, res) {
    try {
        const data = await req.Pet.getPets()
        res.send(data).status(200)
    }
    catch (err) {
        console.error(err)
        res.send(err).status(404)
    }
}

async function handleDelete(req, res) {
    try {
        const { id } = req.params
        const data = await req.Pet.deletePet(Number(id))

        res.send('deleted').status(200)
    }
    catch (err) {
        console.error(err)
        res.send(err).status(404)
    }
}

router.get('/getPets', handleGet)
router.post('/addPet', handlePost)
router.delete('/deletePet/:id', handleDelete)


module.exports = router