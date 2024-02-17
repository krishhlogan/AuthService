import dotenv from 'dotenv';
console.log('NODE_ENV:', process.env.NODE_ENV);

const envFound =
  process.env.NODE_ENV === 'test' ? dotenv.config({ path: '.env.test' }) : dotenv.config();
// const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  console.log(`  Couldn't find .env file: .env.${process.env.NODE_ENV}   ⚠️ `);
  //throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: 3000,
  keepAliveTimeout: parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10) || 65000,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
      },
      databaseURL: (process.env.MONGO_URL as string) || (process.env.MONGODB_URI as string),
      whitelistedDomains: process.env.WHITELISTED_DOMAINS || [''],
      agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
      }
}