
const Twitter = require('twitter');
const Request = require('request');

const twitter = new Twitter(config.twitter);

function request(...args) {
  return new Promise((resolve, reject) => {
    Request(...args.concat((err, res, body) => {
      if (err) reject(err);
      else resolve(body);
    }));
  });
}

function search(query) {
  const person = { name: query };

  return request('https://kgsearch.googleapis.com/v1/entities:search', {
    qs: {
      query,
      types: 'Person',
      key: config.google.access_token,
      limit: 1,
      indent: true,
    },
  })
  .then((body) => {
    try {
      body = JSON.parse(body);
      if (body.itemListElement.length) {
        const result = body.itemListElement[0].result;
        person.name = result.name;
        person.occupation = result.description;
        if (result.image) person.avatar = result.image.contentUrl;
        if (result.detailedDescription) {
          person.description = result.detailedDescription.articleBody;
          person.wiki = result.detailedDescription.url;
        }
      }
    } catch (e) {
      log.error(e);
    }
  })
  .then(() => twitter.get('users/search', { q: person.name || query }))
  .then((result) => {
    return result.reduce((a, i) => a ? a : (i.verified ? i : a), null);
  })
  .then((result) => {
    if (result) {
      person.twitter = result.screen_name;
      if (!person.avatar) person.avatar = result.profile_image_url;
    }
  })
  .then(() => person);
}

module.exports = (app) => {
  app.get('/users', (req, res) => {
    return db.people.findAll({ include: [db.info], order: 'position' })
      .then(people => res.status(200).send(people))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });

  app.get('/users/top', (req, res) => {
    return res.sendStatus(501);
  });

  app.post('/users', (req, res) => {
    return search(req.body.displayName)
      .then(person => db.people.create({
        displayName: person.name,
        twitter: { handle: person.twitter },
        news: { queries: req.body.displayName },
        info: {
          image: person.avatar,
          wikiUrl: person.wiki,
          occupation: person.occupation,
          bio: person.description,
        },
      }, { include: [db.twitter, db.info, db.news] }))
      .then(person => res.status(200).send(person))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });

  app.post('/users/:id', (req, res) => {
    return db.people.findOne({ where: { id: req.params.id }, include: [db.info, db.twitter, db.news] })
      .then((person) => {
        return person.update(req.body)
          .then(() => person.twitter.update(req.body.twitter))
          .then(() => person.info.update(req.body.info))
          .then(() => person.news.update(req.body.news));
      })
      .then(person => res.status(200).send(person))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });

  app.get('/users/:id', (req, res) => {
    return db.people.findOne({ where: { id: req.params.id }, include: [db.info, db.twitter, db.news] })
      .then(person => res.status(200).send(person))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });

  app.delete('/users/:id', (req, res) => {
    return db.info.destroy({ where: { personId: req.params.id } })
      .then(() => db.twitter.destroy({ where: { id: req.params.id } }))
      .then(() => db.news.destroy({ where: { id: req.params.id } }))
      .then(() => db.people.destroy({ where: { id: req.params.id } }))
      .then(() => res.sendStatus(200))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });
};
