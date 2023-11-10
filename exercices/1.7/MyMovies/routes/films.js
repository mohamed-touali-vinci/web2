var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const catalogue = [
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

  const films = parse(jsonDbPath, catalogue);

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

  const films = parse(jsonDbPath, catalogue);

  if(orderByTitle)
    orderedFilms = [...films].sort((a,b) => a.title.localeCompare(b.title));
  if(orderByTitle === '-title')
    orderedFilms = orderedFilms.reverse();

  console.log('GET /films');
  res.json(orderedFilms ?? films);
});

// Create a film to be added to the films list.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;


  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  films.push(newFilm);

  res.json(newFilm);
});


// Delete a film from the list based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilms[0];

  res.json(itemRemoved);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /films');

  if ((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length > 0 || budget?.length > 0 || link?.length === 0 ) return res.sendStatus(400);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;

  res.json(updatedFilm);
});


module.exports = router;
