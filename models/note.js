const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	'postgres://yuya:postgres@localhost/media_platform',
	// {
	//     logging: false
	// }
);

const Note = sequelize.define(
	'Note',
	{
		id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
		},
		title: {
				type: Sequelize.CHAR
		},
		content: {
				type: Sequelize.TEXT
		},
		createdBy: {
				type: Sequelize.STRING
		},
	},
	{
		freezeTableName: true,
		timestamps: true
	}
);

Note.sync();
module.exports = Note;

