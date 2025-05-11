import os from 'os';
import dotenv from 'dotenv';
import { startWorker } from './workerManager';
import { createLoadBalancer } from './loadBalancer';

dotenv.config();

const PORT = Number(process.env.PORT_MULTI) || 4000;
const WORKER_BASE_PORT = 4001;
const NUMBER_WORKERS = process.env.NUM_WORKERS
  ? parseInt(process.env.NUM_WORKERS)
  : os.cpus().length - 1;

for (let i = 0; i < NUMBER_WORKERS; i++) {
  const workerPort = WORKER_BASE_PORT + i;
  startWorker(workerPort);
}

createLoadBalancer(WORKER_BASE_PORT, NUMBER_WORKERS, PORT);
