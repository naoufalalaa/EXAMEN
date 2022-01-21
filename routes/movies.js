var express = require('express');
var router = express.Router();
//var fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res, next) {
    const take = req.query.take ? parseInt(req.query.take) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 10;
    const movies = await prisma.movies.findMany({
        skip,
        take: take,
    });

    const total = movies.length;

    res.status(200).send({
        data: movies,
        pagination: {
            count: total, // Total des enregistrements
            take: take, // Nombre d'éléments sélectionnés
            skip: skip // Décalage à partir duquel on prend les  données
        }
    });
//     const movies = await prisma.movies.findMany({take: 10})
//   res.send(movies);
});
 
// router.get('/', async function(req, res, next) {
//     const movies = await prisma.movies.findMany({take: 10})
//   res.send(movies);
// });
 


module.exports = router;
