import DB from '../lib/db/base';
declare module 'egg' {
  interface Application {
    db: DB;
    mysql: any;
    jwt: any;
  }

  interface Context {
    db: DB;
  }
}