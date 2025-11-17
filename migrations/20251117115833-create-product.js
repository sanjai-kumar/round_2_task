"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Categories",
                    key: "id"
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            },
            inStock: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Products");
    }
};