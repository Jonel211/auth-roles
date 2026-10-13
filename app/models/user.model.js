export default (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING, // Tipo de dato STRING para el nombre de usuario
            unique: true, // Asegura que el nombre de usuario sea único en la base de datos
        },
        email: {
            type: Sequelize.STRING, // Tipo de dato STRING para el correo electrónico
            unique: true, // Asegura que el correo electrónico sea único en la base de datos
        },
        password: {
            type: Sequelize.STRING, // Tipo de dato STRING para la contraseña
        },
    });
    
    return User;
}