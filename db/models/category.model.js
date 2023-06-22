const { Model, DataTypes, Sequelize } = require('sequelize');


//este va hacer el nombre de la tabla
const CATEGORY_TABLE = 'category';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

class Category extends Model {
  static associate(models){
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:  CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE }
