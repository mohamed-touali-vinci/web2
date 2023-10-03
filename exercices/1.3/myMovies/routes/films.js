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


// Read the film identified by an id 

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(films[indexOfFilmFound]);
});

/* Read all the films 
  GET /films?order=title : ascending order by title
  get /films?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const orderByTitle =
    req?.query?.order?.includes('title')
      ? req.query.order
      : undefined;
  let orderedFilms;
  console.log(`order by ${orderByTitle ?? 'not requested'}`);
  if(orderByTitle)
    orderedFilms = [...films].sort((a,b) => a.title.localeCompare(b.title));
  if(orderByTitle === '-title')
    orderedFilms = orderedFilms.reverse();

  console.log('GET /films');
  res.json(orderedFilms ?? films);
});


module.exports = router;
