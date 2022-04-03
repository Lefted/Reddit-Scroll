/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: "../.env" });
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Link = sequelize.define(
	"link",
	{
		redditId: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: "TIMESTAMP",
			defaultValue: Sequelize.literal("(now() at time zone 'utc')::timestamp")
		},
		updatedAt: {
			type: "TIMESTAMP",
			defaultValue: Sequelize.literal("(now() at time zone 'utc')::timestamp")
		}
	},
	{
		schema: "reddit",
		freezeTableName: true,
		timestamps: false,
		createdAt: false
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
		},
		createdAt: {
			type: "TIMESTAMP",
			defaultValue: Sequelize.literal("(now() at time zone 'utc')::timestamp")
		},
		updatedAt: {
			type: "TIMESTAMP",
			defaultValue: Sequelize.literal("(now() at time zone 'utc')::timestamp")
		}
	},
	{
		schema: "reddit",
		freezeTableName: true,
		timestamps: false,
		createdAt: false
	}
);

User.hasMany(Link);
Link.belongsTo(User);

async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

async function createUpdatedAtFunction() {
	await sequelize.query(
		`CREATE OR REPLACE FUNCTION reddit."update_modified_column"()
		RETURNS TRIGGER AS $$
		BEGIN
		   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
		      NEW."updatedAt" = (now() at time zone 'utc')::timestamp; 
		      RETURN NEW;
	 	  ELSE
		      RETURN OLD;
	 	  END IF;
		END;
		$$ language 'plpgsql';`
	);
}

/**
 *
 * @param {string} table
 */
async function registerUpdatedAtFunctionAsTriggerForTable(table) {
	await sequelize.query(
		`CREATE TRIGGER update_${table}_modification_time BEFORE UPDATE ON reddit."${table}" FOR EACH ROW EXECUTE PROCEDURE reddit."update_modified_column"();`
	);
}

const run = async () => {
	await connectToDB();
	await User.sync();
	await Link.sync();
	await createUpdatedAtFunction();
	await registerUpdatedAtFunctionAsTriggerForTable("user");
	await registerUpdatedAtFunctionAsTriggerForTable("link");

	await sequelize.close();
};

run();
