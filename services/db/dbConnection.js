"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class DbConnection {
    static async getConnection() {
        if (DbConnection.connection) {
            return DbConnection.connection;
        }
        DbConnection.connection = await typeorm_1.createConnection();
        return DbConnection.connection;
    }
    static async closeConnection() {
        if (DbConnection.connection)
            await DbConnection.connection.close();
    }
}
exports.default = DbConnection;
