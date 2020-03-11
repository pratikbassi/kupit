let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    accountSid: process.env.accountSid,
    authToken: process.env.authToken,
    mailgunAPI: process.env.mailgunAPI,
    mailgunDomain: process.env.mailgunDomain
  };
}

module.exports = dbParams;
