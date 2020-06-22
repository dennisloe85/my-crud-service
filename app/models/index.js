const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DATABASE_URL,
  {
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tutorials ///////////////////////////////////

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

/***
 * Authentiication
 */

db.user      = require("../models/user.model.js")(sequelize, Sequelize);
db.role      = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

/***
 * Checklists
 */

db.list      = require("../models/checklist/list.model.js")(sequelize, Sequelize);
db.entry     = require("../models/checklist/entry.model.js")(sequelize, Sequelize);

db.list.hasMany(db.entry, { as: "entries", onDelete: 'cascade', hooks:true });
db.entry.belongsTo(db.list, { as: "list" });

// @todo: What about primary key?

module.exports = db;