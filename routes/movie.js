var express = require('express');
var router = express.Router();
//var fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
router.get('/',(req,res)=>{
    res.send("NO movie")
})
// /movie/?id=xuaiudo
router.get('/:id', async function(req, res, next) {
    const id = req.params.id
    const movie = await prisma.movies.findUnique({
        where : {
            id 
        }
    });
    res.status(200).send(
        movie
    );
});


// router.get('/', async function(req, res, next) {
//     const movies = await prisma.movies.findMany({take: 10})
//   res.send(movies);
// });
 


module.exports = router;
