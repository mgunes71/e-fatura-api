import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [
    // 'dist/entitity/user.entitiy.js',
    // 'dist/entitity/expense.entitiy.js',
    // 'dist/entitity/income.entitity.js',
  ],
  synchronize: true,
};

export default config;
