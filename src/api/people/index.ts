
import * as Router from 'koa-router';
import peopleController from './controller';
import twitterController from '../twitter/controller';

export class PeopleApi {
  public router: Router;

  constructor() {
    this.router = new Router();

    this.router
       .get('/',    peopleController.getPeople.bind(peopleController))
      .post('/',    peopleController.createPerson.bind(peopleController))
       .get('/:id', peopleController.getPerson.bind(peopleController))
       .put('/:id', peopleController.updatePerson.bind(peopleController))
    .delete('/:id', peopleController.destroyPerson.bind(peopleController))
       .get('/:id/twitter', twitterController.getRecords.bind(twitterController));
  }
}

export default new PeopleApi();
