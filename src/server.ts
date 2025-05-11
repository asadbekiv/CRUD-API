import { createServer } from 'http';
import { handleRequest } from './routes/userRoutes';
import 'dotenv/config';

const server = createServer((req, res) => {
  req.on('error', (err) => {
    console.error('Request error:', err);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Bad request' }));
  });

  res.on('error', (err) => {
    console.error('Response error:', err);
  });

  handleRequest(req, res);
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server failure:', err);
});

export { server };
