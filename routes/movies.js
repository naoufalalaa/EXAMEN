var express = require('express');
var router = express.Router();
//var fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// /movies?page=xx
router.get('/:page?', async function(req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const take = req.query.take ? parseInt(req.query.take) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : (page-1)*take;
    const all = await prisma.movies.findMany()
    const movies = await prisma.movies.findMany({
        skip,
        take,
    });
    console.log(req.query.page)
    res.status(200).send({
        data: movies,
        pagination: {
            count: all.length, // Total des enregistrements
            page : page,
            take: take, // Nombre d'éléments sélectionnés
            skip: skip // offset à partir de l'élément avec lequel on commence
        }
    });
});


// router.get('/', async function(req, res, next) {
//     const movies = await prisma.movies.findMany({take: 10})
//   res.send(movies);
// });
 


module.exports = router;
