import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get("PORT").default(3000).asPortNumber(),
  HOST: get("HOST").default('public').asString(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  MONGO_USERNAME: get("MONGO_USERNAME").required().asString(),
  MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
  // MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  // MAILER_EMAIL: get("MAILER_EMAIL").required().asEmailString(),
  // MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  // PRODUCTION: get("PRODUCTION").required().asBool(),
};
