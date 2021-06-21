"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const app_1 = __importDefault(require("./app"));
require("reflect-metadata");
// import DbConnection from './services/db/dbConnection';
const clusterWorkerSize = os_1.default.cpus().length;
const SERVER_PORT = process.env.PORT || 3000;
if (clusterWorkerSize > 1) {
    if (cluster_1.default.isMaster) {
        console.log('Spawning master');
        for (let i = 0; i < clusterWorkerSize; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("exit", function (worker) {
            console.log("Worker", worker.id, " has exitted. Respawning worker.");
            cluster_1.default.fork();
        });
    }
    else {
        console.log('Spawning child process!');
        app_1.default.listen(SERVER_PORT, async () => {
            // await DbConnection.getConnection();
            console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
        });
    }
}
else {
    app_1.default.listen(SERVER_PORT, async () => {
        // await DbConnection.getConnection();
        console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
    });
}
