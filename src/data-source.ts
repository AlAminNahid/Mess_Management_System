import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/entities/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
  extra: {
    max: parseInt(process.env.DB_POOL_MAX ?? '10', 10),
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  },
};

export default new DataSource(dataSourceOptions);
