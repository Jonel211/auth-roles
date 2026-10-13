export default (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER, // Tipo de dato INTEGER para el ID del rol
            primaryKey: true,        // Establece que este campo es la clave primaria de la tabla
            autoIncrement: true,     // Permite que el valor del ID se incremente automáticamente con cada nuevo registro
        },
        name: {
            type: Sequelize.STRING,
        },
    });

    return Role;
}