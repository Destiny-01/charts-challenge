import { sequelizeConfig } from '@express-server/config';
import { Sequelize, DataTypes, Model, Dialect } from 'sequelize';

interface UserAttributes {
  name: string;
  email: string;
  password: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const { HOST, USER, DATABASE, PASSWORD, dialect } = sequelizeConfig;
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: dialect as Dialect,
  port: 3306,
});

const User = sequelize.define<UserInstance>('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

export { sequelize, User };
