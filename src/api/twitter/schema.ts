
import * as Sequelize from 'sequelize';
import connection from '../../services/connection';

export interface TwitterRecord {
  id?: number;
  personId: number;
  tweet: string;
  followers: number;
}

export interface TwitterRecordInstance extends Sequelize.Instance<TwitterRecord> {
  dataValues: TwitterRecord;
}

const twitterSchema = connection.db.define<TwitterRecordInstance, TwitterRecord>('twitter', {
  tweet: Sequelize.TEXT,
  followers: Sequelize.INTEGER,
});

export default twitterSchema;
