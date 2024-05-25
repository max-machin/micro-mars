export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    name: process.env.MYSQL_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: '60m',
  },
  kafka: {
    broker: process.env.KAFKA_BROKER,
  },
});
