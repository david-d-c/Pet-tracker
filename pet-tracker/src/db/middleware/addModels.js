const Pet = require('../models/Pet')

function addModels(req, res, next){
    req.Pet = Pet
    next()
}

module.exports = addModels