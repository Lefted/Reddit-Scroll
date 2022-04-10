/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: "../.env" });
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Link = sequelize.define(
	"link",
	{
		redditIdHash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		redditIdSalt: {
			type: DataTypes.STRING,
			allowNull: false
		},
		redditIdInitializationVector: {
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

const User = sequelize.define(
	"user",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		passwordSalt: {
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
		},
		defaultCollection: {
			type: DataTypes.STRING
		}
	},
	{
		schema: "reddit",
		freezeTableName: true,
		timestamps: false,
		createdAt: false
	}
);

const Collection = sequelize.define(
	"collection",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		uuid: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
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

User.hasMany(Collection);
Collection.belongsTo(User);

Collection.hasMany(Link);
Link.belongsTo(Collection);

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
	await Collection.sync();
	await Link.sync();
	await createUpdatedAtFunction();
	await registerUpdatedAtFunctionAsTriggerForTable("user");
	await registerUpdatedAtFunctionAsTriggerForTable("link");
	await registerUpdatedAtFunctionAsTriggerForTable("collection");

	await sequelize.close();
};

run();
