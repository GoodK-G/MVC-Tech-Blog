const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//Create the user model.

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks:{
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        sequelize
    });

module.exports = User;
  