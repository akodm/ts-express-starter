import { Sequelize } from 'sequelize';
import { userTable } from './models/user';

console.log("mysql database connecting..");

const { DB = "database", ROOT = "root", PASS = "pass", HOST = "localhost", DB_FORCE = "false", pm_id, NODE_ENV = "development" } = process.env;

let sequelize: Sequelize;

try {
	sequelize = new Sequelize(
    DB, 
    ROOT, 
    PASS, 
    {
      host : HOST,
      dialect: 'mysql',
      define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
		  }
	  }
  );
	
	const modelDefiners: any = [
		userTable
	];
	
	for (const modelDefiner of modelDefiners) {
		modelDefiner(sequelize);
	}
	
  // Models.
	// const { user } = sequelize.models;

  /**
   * Models Associate.
   */

	// user.hasMany(todo);
	// todo.belongsTo(user);

  // DB Force Init.
	let pmInit = false;
	if(NODE_ENV === "production") {
		if(pm_id === "0") {
			pmInit = true;
		} else {
			pmInit = false;
		}
	} else {
		pmInit = true;
	}

	const force = DB_FORCE === "true" ? true : false;
	
  // DB Sync.
	if(force && pmInit) {
		sequelize.sync({ force });
	} else {
		sequelize.sync();
	}

	console.log("mysql database connect success !");
} catch(err) {
	console.log("mysql database connect error:", err);
	process.exit(1);
}

export default sequelize;