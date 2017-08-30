
import * as Sequelize from 'sequelize';
import connection from '../../services/connection';
import twitterSchema from '../twitter/schema';

export interface Person {
  id?: string;
  displayName: string;
  twitterHandle?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface PersonInstance extends Sequelize.Instance<Person> {
  dataValues: Person;
}

const peopleSchema = connection.db.define<PersonInstance, Person>('people', {
  displayName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  twitterHandle: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
  },
});

peopleSchema.hasMany(twitterSchema);

export default peopleSchema;
