import os from "node:os";
import cluster from "node:cluster";
import { log } from "./utils/log";
import { startServer } from "./server";

const runPrimaryProcess = () => {
    const processCount = os.availableParallelism();
    log(`Primary process running in: ${process.pid}`);
    log(`Forking server with ${processCount} process \n`);

    for (let index = 0; index < processCount; index++)cluster.fork();

    cluster.on('online', function (worker) {
        log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
        log(`Worker ${worker.process.pid} died with code: ${code} , and signal: ${signal}`);
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            log('Starting a new worker');
            cluster.fork();
        }
    });

}

const runWorkerProcess = async () => {
    startServer();
}


cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();