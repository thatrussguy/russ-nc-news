const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "russ_nc_news"
    }
  },
  test: {
    connection: {
      database: "russ_nc_news_test"
    }
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
