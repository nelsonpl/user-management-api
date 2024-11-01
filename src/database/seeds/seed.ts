import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { InitialUserSeeder } from './initial-user.seed';
import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '.env') });

const requiredEnvVars = [
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '..', '..', '**', '*.entity{.ts,.js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};

async function seed() {
  try {
    console.log('Iniciando processo de seed...');

    const dataSource = new DataSource(options);

    await dataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida.');

    await runSeeders(dataSource, {
      seeds: [InitialUserSeeder],
    });
    console.log('Seed concluído com sucesso!');

    await dataSource.destroy();
    console.log('Conexão com o banco de dados encerrada.');
  } catch (error) {
    console.error('Erro durante o processo de seed:', error);
    process.exit(1);
  }
}

seed()
  .then(() => {
    console.log('Processo de seed finalizado.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro no processo de seed:', error);
    process.exit(1);
  });