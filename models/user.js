const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	'postgres://yuya:postgres@localhost/media_platform',
);

const User = sequelize.define(
	'User',
	{
		id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
		},
		userName: {
      type: Sequelize.CHAR
		},
		password: {
      type: Sequelize.STRING
		},
	},
	{
		freezeTableName: true,
		timestamps: true
	}
);

User.sync();
module.exports = User;
