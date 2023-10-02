var express = require('express');
var router = express.Router();


const films = [
  {
    id: 1,
    title: 'La ligne verte',
    duration: '3h9',
    budget: '60M $',
    link: 'https://www.imdb.com/title/tt0120689/',
  },
  {
    id: 2,
    title: 'El Camino',
    duration: '2h2',
    budget: '6M $',
    link: 'https://www.imdb.com/title/tt9243946/',
  }, 
  {
    id: 3,
    title: 'Scarface',
    duration: '2h50',
    budget: '25M $',
    link: 'https://www.imdb.com/title/tt0086250/',
  }, 
  {
    id: 4,
    title: 'Casino',
    duration: '2h58',
    budget: '52M $',
    link: 'https://www.imdb.com/title/tt0112641/',
  },
  {
    id: 5,
    title: 'Fight Club',
    duration: '2h19',
    budget: '63M $',
    link: 'https://www.imdb.com/title/tt0137523/',
  },
];

// Read all the films of the catalogue
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(films);
});

module.exports = router;
