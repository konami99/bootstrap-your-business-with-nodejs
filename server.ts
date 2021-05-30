import os from 'os';
import cluster from 'cluster';
import app from './app';
import 'reflect-metadata';
// import DbConnection from './services/db/dbConnection';

const clusterWorkerSize = os.cpus().length;

const SERVER_PORT = process.env.PORT || 3000;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    console.log('Spawning master');
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on("exit", function(worker) {
      console.log("Worker", worker.id, " has exitted. Respawning worker.");
      cluster.fork();
    })
  } else {
    console.log('Spawning child process!');
    app.listen(SERVER_PORT, async () => {
      // await DbConnection.getConnection();
      console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
    });
  }
} else {
  app.listen(SERVER_PORT, async () => {
    // await DbConnection.getConnection();
    console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
  });
}

