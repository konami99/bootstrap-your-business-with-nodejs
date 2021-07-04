import { createConnection, Connection } from 'typeorm';

export default class DbConnection {
  private static connection: Connection;

  public static async getConnection(): Promise<Connection> {
    if (DbConnection.connection) {
      return DbConnection.connection;
    }
    DbConnection.connection = await createConnection();

    return DbConnection.connection;
  }

  public static async closeConnection(): Promise<void> {
    if (DbConnection.connection) await DbConnection.connection.close();
  }
}