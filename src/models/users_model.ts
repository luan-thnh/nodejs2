import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../config/connect_db';
class UserModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public token?: string; // Add token field

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true, // Make token field nullable
    },
  },
  {
    tableName: 'users',
    sequelize: db,
    modelName: 'User',
  }
);

export default UserModel;
