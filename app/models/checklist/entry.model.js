module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define("entry", {
      name: {
        type: Sequelize.STRING
      },
      checked: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Entry;
  };