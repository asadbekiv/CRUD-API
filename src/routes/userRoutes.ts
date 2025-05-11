//

import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'node:url';
import {
  getAllUsersController,
  getUsersByIdController,
  createUsersController,
  deleteUsersController,
  updateUsersController,
} from '../controllers/userController';

import { errorHandler } from '../utils/errorHandler';

export const handleRequest = errorHandler(
  async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> => {
    const parseUrl = parse(req.url || '', true);

    

    const pathname = parseUrl.pathname || '';

    const method = req.method || '';
    const idMatch = pathname.match(/^\/api\/users\/([0-9a-fA-F-]+)$/);
    const userId = idMatch ? idMatch[1] : null;

    if (pathname === '/api/users' && method === 'GET') {
      getAllUsersController(req, res);
    } else if (
      userId &&
      pathname === `/api/users/${userId}` &&
      method === 'GET'
    ) {
      getUsersByIdController(req, res, userId);
    } else if (pathname === '/api/users' && method === 'POST') {
      createUsersController(req, res);
    } else if (
      userId &&
      pathname === `/api/users/${userId}` &&
      method === 'PUT'
    ) {
      updateUsersController(req, res, userId);
    } else if (
      userId &&
      pathname === `/api/users/${userId}` &&
      method === 'DELETE'
    ) {
      deleteUsersController(req, res, userId);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ status: 'fail', message: 'API endpoint not found' })
      );
    }
  }
);
