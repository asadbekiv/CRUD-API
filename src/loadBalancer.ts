import http, { createServer } from 'http';

export const createLoadBalancer = (
  basePort: number,
  numWorkers: number,
  mainPort: number
) => {
  const loadBalancer = createServer((req, res) => {
    const targetPort = basePort + ((Math.random() * numWorkers) | 0);
    const options = {
      hostname: 'localhost',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      const statusCode = proxyRes.statusCode ?? 500;
      res.writeHead(statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });

    proxyReq.on('error', (err) => {
      console.error(`Proxy error: ${err.message}`);
      res.writeHead(500);
      res.end('Internal Server Error');
    });
  });

  loadBalancer.listen(mainPort, () => {
    console.log(`Load balancer is listening on port ${mainPort}`);
  });

  return loadBalancer;
};
