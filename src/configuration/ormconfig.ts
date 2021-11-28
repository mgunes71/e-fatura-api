import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [
    // 'dist/entity/user.entitiy.js',
    // 'dist/entity/expense.entitiy.js',
    // 'dist/entity/income.entity.js',
  ],
  synchronize: true,
};

export default config;
