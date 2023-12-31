var express = require('express');
var router = express.Router();


const films = [
  {
    id: 1,
    title: 'La ligne verte',
    duration: 189,
    budget: 60,
    link: 'https://www.imdb.com/title/tt0120689/',
  },
  {
    id: 2,
    title: 'El Camino',
    duration: 122,
    budget: 6,
    link: 'https://www.imdb.com/title/tt9243946/',
  }, 
  {
    id: 3,
    title: 'Scarface',
    duration: 170,
    budget: 25,
    link: 'https://www.imdb.com/title/tt0086250/',
  }, 
  {
    id: 4,
    title: 'Casino',
    duration: 178,
    budget: 52,
    link: 'https://www.imdb.com/title/tt0112641/',
  },
  {
    id: 5,
    title: 'Fight Club',
    duration: 139,
    budget: 63,
    link: 'https://www.imdb.com/title/tt0137523/',
  },
];

// Read all the films of the catalogue
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(films);
});

module.exports = router;
