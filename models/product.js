module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });


Product.associate = (models) => {
    Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",  // <-- ADD THIS
        onDelete: "RESTRICT"
    });
};



    return Product;
};