import { fork } from 'child_process';

const workers: { [key: number]: any } = {};

export const startWorker = (port: number) => {
  const worker = fork('./dist/server.js', [], {
    env: { ...process.env, PORT: String(port) },
  });
  workers[port] = worker;

  console.log(`Worker started on port ${port}`);

  worker.on('exit', (code) => {
    console.error(`Worker on port ${port} exited with code ${code}`);
    delete workers[port];
    console.log(`Active workers: ${Object.keys(workers).length}`);
  });

  return worker;
};

export const getWorkers = () => workers;
