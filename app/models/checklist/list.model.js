module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return List;
  };