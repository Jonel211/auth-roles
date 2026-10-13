export default {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    dialect: "mysql",
    pool: { // Para manejar la cantidad de conexiones a la base de datos
        max: 5,
        min: 0,
        acquire: 30000, // Tiempo máximo que una conexión puede estar inactiva antes de ser liberada
        idle: 10000
    }
}