export default () => ({
    port: 3000,
    database: {
      name: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT
    },
    jwt:{
        secret: process.env.SECRET,
        salt: process.env.SALT
    }
  });