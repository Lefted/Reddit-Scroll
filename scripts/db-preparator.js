/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({path: "../.env"});
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Link = sequelize.define(
	"link",
	{
		redditId: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		schema: "reddit",
		freezeTableName: true
	}
);

const User = sequelize.define(
	"user",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		schema: "reddit",
		freezeTableName: true
	}
);

async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

const run = async () => {
	await connectToDB();
	await Link.sync();
	await User.sync();
	await sequelize.close();
};

run();
