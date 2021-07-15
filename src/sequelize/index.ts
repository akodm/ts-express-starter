import { Sequelize } from 'sequelize';
import { UserStatic, userTable } from './models/user';

console.log("mysql database connecting..");

const { 
	DB = "database", 
	ROOT = "root", 
	PASS = "pass", 
	HOST = "localhost", 
	DB_PORT = "3306",
} = process.env;

let sequelize: Sequelize;

try {
	sequelize = new Sequelize(
    DB, 
    ROOT, 
    PASS, 
    {
      host : HOST,
			port: parseInt(DB_PORT, 10),
      dialect: 'mysql',
      define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
		  },
			// replication: {},
	  }
  );
	
	const modelDefiners: (
		(sequelize: Sequelize) => 
			| UserStatic
		)[] = [
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
} catch(err) {
	console.log("mysql database connect error:", err);
	process.exit(1);
}

export default sequelize;