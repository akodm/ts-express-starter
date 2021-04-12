import { Sequelize, DataTypes, BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserModel extends Model<UserAttributes>, UserAttributes {};
export class User extends Model<UserModel, UserAttributes> {};
export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export const userTable = (sequelize: Sequelize): UserStatic => {
  return <UserStatic>sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }, {
    freezeTableName: true
  });
};