
module.exports = (app) => {
  app.get('/users', (req, res) => {
    return db.people.findAll({ include: [db.info] })
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
    return db.people.create({
      displayName: req.body.displayName,
      twitter: {},
      news: {},
      info: {},
    }, { include: [db.twitter, db.info, db.news] })
      .then(person => res.status(200).send(person))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });

  app.post('/users/:id', (req, res) => {
    return db.people.findOne({ where: { id: req.params.id }, include: [db.info, db.twitter, db.news] })
      .then(person => {
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
    return db.people.destroy({ where: { id: req.params.id } })
      .then(() => res.sendStatus(200))
      .catch((e) => {
        log.error(e);
        return res.sendStatus(500);
      });
  });
};
